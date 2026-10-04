import { SAVE_VERSION, migrateMainQuests } from '../data/gameData';
import type { BoolMap, RegionCounts, RegionsState } from '../types';

/** Chave do save no localStorage. Nunca renomear — é o save de todo mundo. */
export const STORAGE_KEY = 'botw-progress';

/**
 * Estado persistido do tracker.
 *
 * Atenção aos nomes: no JSON os campos de korok e baú se chamam `koroks` e
 * `chests`, mas no estado do React são `korokChecks` e `chestChecks`. Essa
 * tradução acontece só aqui — o resto do app não precisa saber dela.
 */
export interface ProgressState {
  mainQuests: BoolMap;
  dlc: BoolMap;
  /** Contadores manuais de korok, chaveados por `region.key` (não por `region.id`). */
  regionCounts: RegionCounts;
  regions: RegionsState;
  korokChecks: RegionsState;
  chestChecks: RegionsState;
  /**
   * Epoch ms da última mudança de cada item (marcar E desmarcar), indexado
   * pela chave `kind:scope:itemId` de storage/keys.ts. É o que o sync usa
   * para resolver conflito item a item (newest-wins).
   */
  ts: Record<string, number>;
  /**
   * Quando este save ganhou relógio (migração para v3). Item marcado sem
   * entrada em `ts` é "legado": mudou em algum momento antes disso.
   * 0 = não havia save para migrar, então não existe item legado.
   */
  baselineTs: number;
  /** Último push bem-sucedido ao servidor (usado a partir do PR 6b). 0 = nunca. */
  lastPushedAt: number;
}

export const EMPTY_PROGRESS: ProgressState = {
  mainQuests: {},
  dlc: {},
  regionCounts: {},
  regions: {},
  korokChecks: {},
  chestChecks: {},
  ts: {},
  baselineTs: 0,
  lastPushedAt: 0,
};

export interface ProgressStorage {
  /** Devolve o save, ou null se não houver nenhum. Lança se o save estiver corrompido. */
  read(): ProgressState | null;
  /** Grava o save. Lança se o storage estiver cheio ou indisponível. */
  write(state: ProgressState): void;
}

export const localStorageAdapter: ProgressStorage = {
  read() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    // v1/v2 → v3: o save ainda não tinha relógio, então tudo que já está
    // marcado vira legado, anterior a agora. Roda uma vez só: o write que
    // segue a carga já grava v3 com o baselineTs fixado.
    const hasClock = (data.version ?? 1) >= 3;
    return {
      mainQuests: migrateMainQuests(data),
      dlc: data.dlc || {},
      regionCounts: data.regionCounts || {},
      regions: data.regions || {},
      korokChecks: data.koroks || {},
      chestChecks: data.chests || {},
      ts: hasClock ? data.ts || {} : {},
      baselineTs: hasClock ? data.baselineTs || 0 : Date.now(),
      lastPushedAt: hasClock ? data.lastPushedAt || 0 : 0,
    };
  },

  write(state) {
    // A ordem das chaves aqui define byte a byte o JSON gravado — manter igual.
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: SAVE_VERSION,
      mainQuests: state.mainQuests,
      dlc: state.dlc,
      regionCounts: state.regionCounts,
      regions: state.regions,
      koroks: state.korokChecks,
      chests: state.chestChecks,
      ts: state.ts,
      baselineTs: state.baselineTs,
      lastPushedAt: state.lastPushedAt,
    }));
  },
};
