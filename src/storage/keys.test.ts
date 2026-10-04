import { describe, expect, test } from 'vitest';
import REGION_DATA from '../data/regions';
import { itemKey, korokCountKey, regionIdFromKey } from './keys';

describe('itemKey', () => {
  test('main/dlc usam scope vazio', () => {
    expect(itemKey('main', '', 'mq_vah_ruta')).toBe('main::mq_vah_ruta');
    expect(itemKey('dlc', '', 'trial')).toBe('dlc::trial');
  });

  test('itens de região usam region.id como scope', () => {
    expect(itemKey('korok', 'hateno', 'D01')).toBe('korok:hateno:D01');
    expect(itemKey('chest', 'hateno', '350171171')).toBe('chest:hateno:350171171');
  });
});

describe('korokCountKey', () => {
  test('traduz region.key para region.id', () => {
    expect(korokCountKey('Hateno / Necluda')).toBe('korok_count:hateno:koroks');
  });

  test('key desconhecida lança em vez de gerar chave errada', () => {
    expect(() => regionIdFromKey('Hyrule Inexistente')).toThrow();
  });

  // Rede de segurança contra o dia em que alguém mexer nos dados das regiões:
  // toda região precisa traduzir para um scope que o banco aceita.
  test.each(REGION_DATA.map(r => [r.key, r.id]))('%s → %s', (key, id) => {
    expect(regionIdFromKey(key)).toBe(id);
    expect(id).toMatch(/^[a-z]{1,20}$/); // mesmo CHECK de progress_item_scope_fmt_ck
  });
});
