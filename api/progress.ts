import { AuthError, requireUser } from '../server/auth';
import { sql } from '../server/db';
import { error, json } from '../server/http';

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
