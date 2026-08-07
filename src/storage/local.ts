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
}

export const EMPTY_PROGRESS: ProgressState = {
  mainQuests: {},
  dlc: {},
  regionCounts: {},
  regions: {},
  korokChecks: {},
  chestChecks: {},
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
    return {
      mainQuests: migrateMainQuests(data),
      dlc: data.dlc || {},
      regionCounts: data.regionCounts || {},
      regions: data.regions || {},
      korokChecks: data.koroks || {},
      chestChecks: data.chests || {},
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
    }));
  },
};
