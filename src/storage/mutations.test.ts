import { describe, expect, test } from 'vitest';
import { EMPTY_PROGRESS } from './local';
import { setKoroks, toggleDlc, toggleKorok, toggleMainQuest } from './mutations';

// Sem relógio falso: `now` é argumento, então o teste escolhe a hora.
const T1 = 1_000;
const T2 = 2_000;

describe('toggles', () => {
  test('marcar inverte o valor e carimba a chave com now', () => {
    const s = toggleKorok(EMPTY_PROGRESS, 'hateno', 'D01', T1);
    expect(s.korokChecks).toEqual({ hateno: { D01: true } });
    expect(s.ts).toEqual({ 'korok:hateno:D01': T1 });
  });

  test('desmarcar grava false (não apaga) e recarimba com o now novo', () => {
    const marcado = toggleKorok(EMPTY_PROGRESS, 'hateno', 'D01', T1);
    const s = toggleKorok(marcado, 'hateno', 'D01', T2);
    expect(s.korokChecks).toEqual({ hateno: { D01: false } });
    expect(s.ts).toEqual({ 'korok:hateno:D01': T2 });
  });

  test('main e dlc usam scope vazio na chave', () => {
    expect(toggleMainQuest(EMPTY_PROGRESS, 'mq_vah_ruta', T1).ts).toEqual({ 'main::mq_vah_ruta': T1 });
    expect(toggleDlc(EMPTY_PROGRESS, 'trial', T1).ts).toEqual({ 'dlc::trial': T1 });
  });

  test('mexer num item preserva os outros itens e as outras regiões', () => {
    let s = toggleKorok(EMPTY_PROGRESS, 'hateno', 'D01', T1);
    s = toggleKorok(s, 'faron', 'F01', T1);
    s = toggleKorok(s, 'hateno', 'D02', T2);
    expect(s.korokChecks).toEqual({ hateno: { D01: true, D02: true }, faron: { F01: true } });
    expect(Object.keys(s.ts)).toHaveLength(3);
  });

  // React só re-renderiza se o objeto de estado for NOVO. Se a função
  // alterasse `prev` no lugar, a tela não atualizaria — e o bug seria sutil.
  test('não altera o estado anterior', () => {
    const prev = toggleKorok(EMPTY_PROGRESS, 'hateno', 'D01', T1);
    const snapshot = structuredClone(prev);
    const next = toggleKorok(prev, 'hateno', 'D01', T2);
    expect(prev).toEqual(snapshot);
    expect(next).not.toBe(prev);
  });
});

describe('setKoroks', () => {
  test('carimba com region.id, não com o nome de exibição', () => {
    const s = setKoroks(EMPTY_PROGRESS, 'Hateno / Necluda', '12', T1);
    expect(s.regionCounts).toEqual({ 'Hateno / Necluda': { koroks: 12 } });
    expect(s.ts).toEqual({ 'korok_count:hateno:koroks': T1 });
  });

  test.each([
    ['-5', 0],
    ['1000', 900],
    ['abc', 0],
    ['', 0],
  ])('entrada %j vira %i', (input, esperado) => {
    expect(setKoroks(EMPTY_PROGRESS, 'Hateno / Necluda', input, T1).regionCounts['Hateno / Necluda'].koroks)
      .toBe(esperado);
  });
});
