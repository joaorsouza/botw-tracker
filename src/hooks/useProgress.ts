import { useEffect, useMemo, useState } from 'react';
import {
  EMPTY_PROGRESS,
  localStorageAdapter,
  type ProgressState,
  type ProgressStorage,
} from '../storage/local';
import * as mutate from '../storage/mutations';

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

  // A lógica de cada mudança vive em storage/mutations.ts (funções puras e
  // testadas); aqui só entra o relógio e o setState.
  const actions = useMemo<ProgressActions>(() => ({
    toggleMainQuest: id => setState(prev => mutate.toggleMainQuest(prev, id, Date.now())),
    toggleDlc: id => setState(prev => mutate.toggleDlc(prev, id, Date.now())),
    toggleRegionItem: (regionId, itemId) =>
      setState(prev => mutate.toggleRegionItem(prev, regionId, itemId, Date.now())),
    setKoroks: (regionKey, value) => setState(prev => mutate.setKoroks(prev, regionKey, value, Date.now())),
    toggleKorok: (regionId, korokId) => setState(prev => mutate.toggleKorok(prev, regionId, korokId, Date.now())),
    toggleChest: (regionId, chestId) => setState(prev => mutate.toggleChest(prev, regionId, chestId, Date.now())),
  }), []);

  return { loaded, error, state, actions };
}
