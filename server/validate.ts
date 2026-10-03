/**
 * Validação e normalização do lote de deltas do PUT /api/progress.
 *
 * Valida ESTRUTURA, não vocabulário: `kind` no enum, `scope` nas 10 regiões,
 * `itemId` num formato seguro — mas NÃO "esse korok existe". Os datasets de
 * koroks/baús são gerados e serão regenerados; uma allowlist criaria ordem
 * obrigatória de deploy (dataset → servidor → frontend). Um id desconhecido é
 * lixo inerte: a FK + o user_id vindo do JWT impedem dano, e o cliente só lê
 * ids que já conhece. O risco real é volume — e isso o teto de linhas ataca.
 */

const KINDS = ['main', 'dlc', 'region', 'korok', 'chest', 'korok_count'] as const;
export type Kind = (typeof KINDS)[number];

/**
 * Os 10 region.id do app, repetidos aqui de propósito: o código de servidor
 * não importa de src/ (tsconfig.server não tem lib.dom, e um import cruzado
 * criaria acoplamento de deploy com o bundle). Mudam quando o mapa do jogo
 * muda, ou seja: nunca.
 */
const REGION_IDS = new Set([
  'plateau', 'hateno', 'faron', 'lanayru', 'eldin',
  'akkala', 'hebra', 'tabantha', 'gerudo', 'central',
]);

const ITEM_ID = /^[A-Za-z0-9_-]{1,64}$/;

/** Tamanho máximo de um lote. Também é o teto de linhas por usuário no banco. */
export const MAX_ROWS = 3000;

/** Quanto de "relógio adiantado" toleramos antes de clampar para `now`. */
const FUTURE_SKEW_MS = 60_000;

export interface Delta {
  kind: Kind;
  scope: string;          // '' para main/dlc, senão region.id
  itemId: string;
  checked: boolean;
  amount: number | null;  // só para korok_count
  updatedAtMs: number;    // epoch ms, já clampado
}

export class ValidationError extends Error {
  constructor(
    message: string,
    readonly code: 'invalid_payload' | 'payload_too_large' = 'invalid_payload',
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/**
 * Valida o corpo do PUT e devolve os deltas normalizados.
 *
 * Duas responsabilidades além da validação campo a campo:
 *
 * 1. CLAMP de timestamp futuro (updatedAt > now + 60s vira now). Sem isso, um
 *    aparelho com relógio adiantado grava linhas que nenhuma escrita futura
 *    sobrepõe — a regra de conflito é `>` estrito — corrompendo a conta de
 *    forma permanente e invisível.
 *
 * 2. DEDUP por chave (kind:scope:itemId), ficando o carimbo mais novo. Um
 *    INSERT ... ON CONFLICT numa statement só não pode afetar a mesma linha
 *    duas vezes ("cannot affect row a second time") — chave repetida no lote
 *    estouraria a query inteira.
 *
 * Lança ValidationError; quem chama traduz para 400.
 */
export function parseDeltas(body: unknown): { saveVersion: number; deltas: Delta[] } {
  if (!isRecord(body)) throw new ValidationError('body must be an object');

  const { saveVersion, items } = body;
  if (!Number.isInteger(saveVersion) || (saveVersion as number) < 1) {
    throw new ValidationError('saveVersion must be a positive integer');
  }
  if (!Array.isArray(items) || items.length === 0) {
    throw new ValidationError('items must be a non-empty array');
  }
  if (items.length > MAX_ROWS) {
    throw new ValidationError(
      `items must have at most ${MAX_ROWS} entries`,
      'payload_too_large',
    );
  }

  const now = Date.now();
  const byKey = new Map<string, Delta>();

  for (const [i, raw] of items.entries()) {
    if (!isRecord(raw)) throw new ValidationError(`items[${i}] must be an object`);
    const { kind, scope, itemId, checked, amount, updatedAt } = raw;

    if (!KINDS.includes(kind as Kind)) {
      throw new ValidationError(`items[${i}].kind is invalid`);
    }
    const isGlobal = kind === 'main' || kind === 'dlc';
    if (isGlobal ? scope !== '' : !REGION_IDS.has(scope as string)) {
      throw new ValidationError(`items[${i}].scope is invalid for kind ${kind}`);
    }
    if (typeof itemId !== 'string' || !ITEM_ID.test(itemId)) {
      throw new ValidationError(`items[${i}].itemId is invalid`);
    }
    if (typeof checked !== 'boolean') {
      throw new ValidationError(`items[${i}].checked must be a boolean`);
    }
    if (kind === 'korok_count') {
      if (!Number.isInteger(amount) || (amount as number) < 0 || (amount as number) > 900) {
        throw new ValidationError(`items[${i}].amount must be an integer 0..900`);
      }
      if (checked !== false) {
        throw new ValidationError(`items[${i}].checked must be false for korok_count`);
      }
    } else if (amount !== null && amount !== undefined) {
      throw new ValidationError(`items[${i}].amount is only valid for korok_count`);
    }
    const ts = typeof updatedAt === 'string' ? Date.parse(updatedAt) : NaN;
    if (Number.isNaN(ts)) {
      throw new ValidationError(`items[${i}].updatedAt must be an ISO timestamp`);
    }

    const delta: Delta = {
      kind: kind as Kind,
      scope: scope as string,
      itemId,
      checked,
      amount: kind === 'korok_count' ? (amount as number) : null,
      updatedAtMs: ts > now + FUTURE_SKEW_MS ? now : ts,
    };

    const key = `${delta.kind}:${delta.scope}:${delta.itemId}`;
    const prev = byKey.get(key);
    if (!prev || delta.updatedAtMs >= prev.updatedAtMs) byKey.set(key, delta);
  }

  return { saveVersion: saveVersion as number, deltas: [...byKey.values()] };
}
