import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { STORAGE_KEY, localStorageAdapter } from './local';

const NOW = new Date('2026-10-04T12:00:00Z').getTime();

// Fake: o vitest roda em Node, onde não existe localStorage. Um Map com a
// mesma interface basta, e deixa o teste olhar direto o que foi gravado.
let store: Map<string, string>;

beforeEach(() => {
  store = new Map();
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
  });
  vi.useFakeTimers();
  vi.setSystemTime(NOW);
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

const seed = (save: object) => store.set(STORAGE_KEY, JSON.stringify(save));
const saved = () => JSON.parse(store.get(STORAGE_KEY)!);

describe('read', () => {
  test('sem save devolve null', () => {
    expect(localStorageAdapter.read()).toBeNull();
  });

  test('v2 migra para v3: relógio começa agora, progresso intacto', () => {
    seed({ version: 2, koroks: { hateno: { D01: true } }, regionCounts: { 'Hateno / Necluda': { koroks: 12 } } });
    const s = localStorageAdapter.read()!;
    expect(s.ts).toEqual({});
    expect(s.baselineTs).toBe(NOW);
    expect(s.lastPushedAt).toBe(0);
    expect(s.korokChecks).toEqual({ hateno: { D01: true } });
    expect(s.regionCounts).toEqual({ 'Hateno / Necluda': { koroks: 12 } });
  });

  test('v1 passa pelas duas migrações numa carga só', () => {
    seed({ mainQuests: { plateau: true }, beasts: { ruta: true } }); // v1 não tem `version`
    const s = localStorageAdapter.read()!;
    expect(s.mainQuests).toEqual({
      mq_follow_sheikah_slate: true, mq_isolated_plateau: true, mq_vah_ruta: true,
    });
    expect(s.baselineTs).toBe(NOW);
  });

  test('v3 é lido como está, sem tocar no relógio', () => {
    seed({ version: 3, ts: { 'korok:hateno:D01': 111 }, baselineTs: 100, lastPushedAt: 222 });
    const s = localStorageAdapter.read()!;
    expect(s.ts).toEqual({ 'korok:hateno:D01': 111 });
    expect(s.baselineTs).toBe(100);
    expect(s.lastPushedAt).toBe(222);
  });
});

describe('write', () => {
  test('grava version 3 e os campos novos', () => {
    seed({ version: 2 });
    localStorageAdapter.write(localStorageAdapter.read()!);
    expect(saved()).toMatchObject({ version: 3, ts: {}, baselineTs: NOW, lastPushedAt: 0 });
  });

  // O teste mais importante do arquivo: se a migração rodasse a cada load,
  // o baselineTs andaria junto com o relógio e todo item legado pareceria
  // recém-marcado para o sync.
  test('migração roda uma vez só: baselineTs não se move no load seguinte', () => {
    seed({ version: 2, koroks: { hateno: { D01: true } } });
    localStorageAdapter.write(localStorageAdapter.read()!); // 1ª carga + save, como o useProgress faz

    vi.setSystemTime(NOW + 60_000); // um minuto depois...
    expect(localStorageAdapter.read()!.baselineTs).toBe(NOW);
  });
});
