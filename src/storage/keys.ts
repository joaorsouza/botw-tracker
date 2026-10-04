import REGION_DATA from '../data/regions';

/**
 * Chaves de item no formato da PK do banco: `kind:scope:itemId`.
 *
 * É a "língua comum" entre o save local e o servidor: o carimbo de tempo de
 * cada item (`ts` no save v3) é indexado por ela, e o sync (PR 6b) a quebra
 * de volta em kind/scope/itemId para montar os deltas.
 *
 * O `:` é um separador seguro: `scope` é sempre `[a-z]*` e `itemId` segue
 * `[A-Za-z0-9_-]` (o mesmo CHECK do banco), então nenhum dos dois contém `:`.
 */

/** Mesmo vocabulário da coluna `kind` do banco. */
export type ItemKind = 'main' | 'dlc' | 'region' | 'korok' | 'chest' | 'korok_count';

/** `main`/`dlc` não têm região: scope vazio, como no banco. */
export function itemKey(kind: ItemKind, scope: string, itemId: string): string {
  return `${kind}:${scope}:${itemId}`;
}

/**
 * `region.key` (nome de exibição) → `region.id`. Só os contadores manuais de
 * korok (`regionCounts`) são chaveados por `key` — legado do primeiro commit,
 * mantido para não exigir migração do save. O banco só aceita `region.id`.
 */
const REGION_ID_BY_KEY: Record<string, string> =
  Object.fromEntries(REGION_DATA.map(r => [r.key, r.id]));

export function regionIdFromKey(regionKey: string): string {
  const id = REGION_ID_BY_KEY[regionKey];
  if (!id) throw new Error(`region.key desconhecida: "${regionKey}"`);
  return id;
}

/** Chave do contador manual de korok de uma região: `korok_count:hateno:koroks`. */
export function korokCountKey(regionKey: string): string {
  return itemKey('korok_count', regionIdFromKey(regionKey), 'koroks');
}
