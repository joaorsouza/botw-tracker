import { AuthError, requireUser } from '../server/auth';
import { sql } from '../server/db';
import { error, json } from '../server/http';
import {
  Delta, MAX_ROWS, parseDeltas, ValidationError,
} from '../server/validate';

/** Linha crua de progress_item, como o Postgres devolve (snake_case). */
interface Row {
  kind: string;
  scope: string;
  item_id: string;
  checked: boolean;
  amount: number | null;
  updated_at: unknown;
}

/** O driver pode devolver timestamptz como Date ou como string. */
function toIso(value: unknown): string {
  return value instanceof Date ? value.toISOString() : String(value);
}

/**
 * GET /api/progress — devolve o progresso inteiro do usuário autenticado.
 *
 * Sem paginação de propósito: mesmo uma conta 100% completa são ~2.400 linhas
 * (~250 KB, ~20 KB com gzip), buscadas uma vez por sessão. Busca incremental
 * exigiria um índice extra encarecendo toda escrita, para resolver um problema
 * que ainda não existe.
 */
export async function GET(request: Request): Promise<Response> {
  let userId: string;
  try {
    userId = await requireUser(request);
  } catch (e) {
    if (e instanceof AuthError) return error(e.code, 401);
    throw e;
  }

  try {
    // Uma transação = um round-trip HTTP até o Neon, em vez de dois. Dentro
    // de sql.transaction() os templates NÃO são await-ados: eles descrevem a
    // query, e o driver as envia juntas.
    const [rows, metaRows] = (await sql.transaction([
      sql`SELECT kind, scope, item_id, checked, amount, updated_at
            FROM progress_item
           WHERE user_id = ${userId}`,
      sql`SELECT 1 FROM progress_meta WHERE user_id = ${userId}`,
    ])) as [Row[], unknown[]];

    return json({
      serverTime: new Date().toISOString(),
      // items: [] é ambíguo sozinho — pode ser conta nova ou conta zerada de
      // propósito. Isto é o que o primeiro login usa para decidir se sobe o
      // save local direto ou se precisa perguntar algo ao usuário.
      everSynced: metaRows.length > 0,
      items: rows.map(r => ({
        kind: r.kind,
        scope: r.scope,
        itemId: r.item_id,
        checked: r.checked,
        amount: r.amount,
        updatedAt: toIso(r.updated_at),
      })),
    });
  } catch (e) {
    // Nunca ecoar erro do Postgres: pode conter nome de tabela, coluna ou
    // trecho de query. O requestId liga a resposta genérica ao log real.
    const requestId = crypto.randomUUID();
    console.error(`[${requestId}] GET /api/progress failed:`, e);
    return error('internal', 500, `internal error (requestId: ${requestId})`);
  }
}

/**
 * PUT /api/progress — aplica um lote de deltas e devolve o estado autoritativo.
 *
 * Toda a lógica de conflito mora no banco (WHERE EXCLUDED.updated_at > ...):
 * sem janela read-modify-write, duas abas convergem, e reenvio com carimbo
 * igual é no-op — retry é seguro por construção.
 */
export async function PUT(request: Request): Promise<Response> {
  let userId: string;
  try {
    userId = await requireUser(request);
  } catch (e) {
    if (e instanceof AuthError) return error(e.code, 401);
    throw e;
  }

  let saveVersion: number, deltas: Delta[];
  try {
    const body: unknown = await request.json()
      .catch(() => { throw new ValidationError('body must be valid JSON'); });
    ({ saveVersion, deltas } = parseDeltas(body));
  } catch (e) {
    if (e instanceof ValidationError) {
      return error(e.code, e.code === 'payload_too_large' ? 413 : 400, e.message);
    }
    throw e;
  }

  // unnest() quer arrays por coluna, não array de structs — é o que permite
  // aplicar o lote inteiro (1..3000 deltas) numa única statement.
  const kinds = deltas.map(d => d.kind);
  const scopes = deltas.map(d => d.scope);
  const itemIds = deltas.map(d => d.itemId);
  const checkeds = deltas.map(d => d.checked);
  const amounts = deltas.map(d => d.amount);
  const stamps = deltas.map(d => new Date(d.updatedAtMs).toISOString());

  try {
    const [capRows, stateRows] = (await sql.transaction([
      // Quantas linhas o usuário teria DEPOIS do lote (existentes + chaves
      // inéditas). Mesmo snapshot da statement de baixo, então este total e o
      // do guard lá dentro são consistentes entre si.
      sql`SELECT (SELECT count(*)::int FROM progress_item WHERE user_id = ${userId})
               + (SELECT count(*)::int
                    FROM unnest(${kinds}::text[], ${scopes}::text[], ${itemIds}::text[])
                      AS i(kind, scope, item_id)
                   WHERE NOT EXISTS (
                     SELECT 1 FROM progress_item p
                      WHERE p.user_id = ${userId} AND p.kind = i.kind
                        AND p.scope = i.scope AND p.item_id = i.item_id))
              AS total`,
      // Uma CTE com DML não é visível para o resto da própria statement (tudo
      // lê o snapshot do início). Por isso o estado autoritativo é montado em
      // duas metades: RETURNING das linhas aplicadas + leitura do snapshot
      // para as rejeitadas pela regra de conflito — rejeitou = o servidor
      // tinha algo mais novo, e é esse algo que o cliente deve adotar.
      sql`WITH input AS (
            SELECT * FROM unnest(
              ${kinds}::text[], ${scopes}::text[], ${itemIds}::text[],
              ${checkeds}::boolean[], ${amounts}::integer[], ${stamps}::timestamptz[]
            ) AS t(kind, scope, item_id, checked, amount, updated_at)
          ),
          capacity AS (
            SELECT (SELECT count(*) FROM progress_item WHERE user_id = ${userId})
                 + (SELECT count(*) FROM input i WHERE NOT EXISTS (
                      SELECT 1 FROM progress_item p
                       WHERE p.user_id = ${userId} AND p.kind = i.kind
                         AND p.scope = i.scope AND p.item_id = i.item_id))
                AS total
          ),
          applied AS (
            INSERT INTO progress_item
                        (user_id, kind, scope, item_id, checked, amount, updated_at)
            SELECT ${userId}, kind, scope, item_id, checked, amount, updated_at
              FROM input
             WHERE (SELECT total FROM capacity) <= ${MAX_ROWS}
            ON CONFLICT (user_id, kind, scope, item_id) DO UPDATE
               SET checked = EXCLUDED.checked,
                   amount = EXCLUDED.amount,
                   updated_at = EXCLUDED.updated_at
             WHERE EXCLUDED.updated_at > progress_item.updated_at
            RETURNING kind, scope, item_id, checked, amount, updated_at
          ),
          meta AS (
            -- CTE com DML executa mesmo sem ser referenciada: é aqui que o
            -- progress_meta (o "já sincronizou alguma vez?" do GET) nasce ou
            -- atualiza, na mesma transação, sem round-trip extra.
            INSERT INTO progress_meta (user_id, save_version)
            SELECT ${userId}, ${saveVersion}
             WHERE (SELECT total FROM capacity) <= ${MAX_ROWS}
            ON CONFLICT (user_id) DO UPDATE
               SET save_version = EXCLUDED.save_version, updated_at = now()
          )
          SELECT kind, scope, item_id, checked, amount, updated_at FROM applied
          UNION ALL
          SELECT p.kind, p.scope, p.item_id, p.checked, p.amount, p.updated_at
            FROM progress_item p
            JOIN input i ON i.kind = p.kind AND i.scope = p.scope
                        AND i.item_id = p.item_id
           WHERE p.user_id = ${userId}
             AND NOT EXISTS (
               SELECT 1 FROM applied a
                WHERE a.kind = p.kind AND a.scope = p.scope
                  AND a.item_id = p.item_id)`,
    ])) as [Array<{ total: number }>, Row[]];

    if (capRows[0].total > MAX_ROWS) {
      return error('row_limit', 413, `account would exceed ${MAX_ROWS} rows`);
    }

    return json({
      serverTime: new Date().toISOString(),
      items: stateRows.map(r => ({
        kind: r.kind,
        scope: r.scope,
        itemId: r.item_id,
        checked: r.checked,
        amount: r.amount,
        updatedAt: toIso(r.updated_at),
      })),
    });
  } catch (e) {
    const requestId = crypto.randomUUID();
    console.error(`[${requestId}] PUT /api/progress failed:`, e);
    return error('internal', 500, `internal error (requestId: ${requestId})`);
  }
}
