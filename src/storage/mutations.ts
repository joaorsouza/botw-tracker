import { TOTALS } from '../data/gameData';
import type { BoolMap, RegionsState } from '../types';
import { itemKey, korokCountKey } from './keys';
import type { ProgressState } from './local';

/**
 * Mudanças de progresso como funções puras: recebem o estado e devolvem um
 * estado NOVO, sem tocar no anterior (o React depende disso para perceber a
 * mudança). Sem React e sem relógio — `now` vem de fora —, então são testáveis
 * em Node puro e reaproveitáveis pelo sync (PR 6b).
 *
 * Toda mudança carimba `ts[chave] = now` junto com o valor: o delta nasce aqui,
 * nunca de um diff entre estados (regra 4 do docs/plano-sync.md). Desmarcar
 * também carimba — é isso que permite ao sync saber que um "desmarcado" é mais
 * novo que um "marcado".
 */

const flip = (map: BoolMap = {}, id: string): BoolMap => ({ ...map, [id]: !map[id] });

const flipIn = (state: RegionsState, regionId: string, itemId: string): RegionsState =>
  ({ ...state, [regionId]: flip(state[regionId], itemId) });

const stamp = (prev: ProgressState, key: string, now: number) => ({ ...prev.ts, [key]: now });

export function toggleMainQuest(prev: ProgressState, id: string, now: number): ProgressState {
  return { ...prev, mainQuests: flip(prev.mainQuests, id), ts: stamp(prev, itemKey('main', '', id), now) };
}

export function toggleDlc(prev: ProgressState, id: string, now: number): ProgressState {
  return { ...prev, dlc: flip(prev.dlc, id), ts: stamp(prev, itemKey('dlc', '', id), now) };
}

export function toggleRegionItem(prev: ProgressState, regionId: string, itemId: string, now: number): ProgressState {
  return {
    ...prev,
    regions: flipIn(prev.regions, regionId, itemId),
    ts: stamp(prev, itemKey('region', regionId, itemId), now),
  };
}

/** `value` vem cru do <input type="number">: lixo vira 0, e o valor fica em 0..900. */
export function setKoroks(prev: ProgressState, regionKey: string, value: string, now: number): ProgressState {
  const num = Math.max(0, Math.min(TOTALS.koroks, parseInt(value) || 0));
  return {
    ...prev,
    regionCounts: { ...prev.regionCounts, [regionKey]: { ...prev.regionCounts[regionKey], koroks: num } },
    ts: stamp(prev, korokCountKey(regionKey), now),
  };
}

export function toggleKorok(prev: ProgressState, regionId: string, korokId: string, now: number): ProgressState {
  return {
    ...prev,
    korokChecks: flipIn(prev.korokChecks, regionId, korokId),
    ts: stamp(prev, itemKey('korok', regionId, korokId), now),
  };
}

export function toggleChest(prev: ProgressState, regionId: string, chestId: string, now: number): ProgressState {
  return {
    ...prev,
    chestChecks: flipIn(prev.chestChecks, regionId, chestId),
    ts: stamp(prev, itemKey('chest', regionId, chestId), now),
  };
}
