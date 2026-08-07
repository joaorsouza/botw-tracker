import { useEffect, useMemo, useState } from 'react';
import { TOTALS } from '../data/gameData';
import {
  EMPTY_PROGRESS,
  localStorageAdapter,
  type ProgressState,
  type ProgressStorage,
} from '../storage/local';

export interface ProgressActions {
  toggleMainQuest(id: string): void;
  toggleDlc(id: string): void;
  toggleRegionItem(regionId: string, itemId: string): void;
  /** `value` vem cru do <input type="number">, por isso string. */
  setKoroks(regionKey: string, value: string): void;
  toggleKorok(regionId: string, korokId: string): void;
  toggleChest(regionId: string, chestId: string): void;
}

export function useProgress(storage: ProgressStorage = localStorageAdapter) {
  const [loaded, setLoaded] = useState(false);
  const [state, setState] = useState<ProgressState>(EMPTY_PROGRESS);
  const [error, setError] = useState<string | null>(null);

  // Carrega uma vez, na montagem. Save corrompido é ignorado em silêncio:
  // o app abre vazio em vez de quebrar.
  useEffect(() => {
    try {
      const saved = storage.read();
      if (saved) setState(saved);
    } catch {
      // ainda não há save válido, tudo bem
    }
    setLoaded(true);
  }, []);

  // Salva a cada mudança. O guard de `loaded` é o que impede o estado vazio
  // inicial de sobrescrever um save existente antes da carga terminar.
  useEffect(() => {
    if (!loaded) return;
    try {
      storage.write(state);
      setError(null);
    } catch (e) {
      setError('Não consegui salvar o progresso agora: ' + (e instanceof Error ? e.message : String(e)));
    }
  }, [state, loaded, storage]);

  const actions = useMemo<ProgressActions>(() => ({
    toggleMainQuest: id =>
      setState(prev => ({ ...prev, mainQuests: { ...prev.mainQuests, [id]: !prev.mainQuests[id] } })),

    toggleDlc: id =>
      setState(prev => ({ ...prev, dlc: { ...prev.dlc, [id]: !prev.dlc[id] } })),

    toggleRegionItem: (regionId, itemId) =>
      setState(prev => ({
        ...prev,
        regions: {
          ...prev.regions,
          [regionId]: { ...prev.regions[regionId], [itemId]: !prev.regions[regionId]?.[itemId] },
        },
      })),

    setKoroks: (regionKey, value) => {
      const num = Math.max(0, Math.min(TOTALS.koroks, parseInt(value) || 0));
      setState(prev => ({
        ...prev,
        regionCounts: {
          ...prev.regionCounts,
          [regionKey]: { ...prev.regionCounts[regionKey], koroks: num },
        },
      }));
    },

    toggleKorok: (regionId, korokId) =>
      setState(prev => ({
        ...prev,
        korokChecks: {
          ...prev.korokChecks,
          [regionId]: { ...prev.korokChecks[regionId], [korokId]: !prev.korokChecks[regionId]?.[korokId] },
        },
      })),

    toggleChest: (regionId, chestId) =>
      setState(prev => ({
        ...prev,
        chestChecks: {
          ...prev.chestChecks,
          [regionId]: { ...prev.chestChecks[regionId], [chestId]: !prev.chestChecks[regionId]?.[chestId] },
        },
      })),
  }), []);

  return { loaded, error, state, actions };
}
