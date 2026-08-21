-- 0001 — tabelas de progresso.
--
-- Como aplicar (não há ferramenta de migração; é manual, por decisão):
--   1. Neon Console → projeto botw-tracker → SQL Editor
--   2. Selecionar a branch `dev` → colar → Run
--   3. Validar no preview do PR
--   4. Antes do release: repetir na branch `production`
--
-- Puramente aditivo: produção rodando o código antigo simplesmente ignora
-- estas tabelas, então aplicar cedo é seguro.
--
-- Status: aplicado em `dev` (br-wild-recipe-acmv44vz) em 2026-08-07.

BEGIN;

-- Responde "este usuário já sincronizou alguma vez?".
-- COUNT(*) = 0 em progress_item é ambíguo: pode ser conta nova, ou um save
-- vazio já sincronizado. A distinção decide se o primeiro login sobe o save
-- local direto ou precisa perguntar algo ao usuário.
CREATE TABLE IF NOT EXISTS progress_meta (
  user_id      uuid PRIMARY KEY REFERENCES neon_auth."user"(id) ON DELETE CASCADE,
  save_version integer     NOT NULL,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- Uma linha por item marcado, por usuário. Não é um documento por usuário:
-- é a granularidade por item que permite salvar só o delta de um clique e
-- resolver conflito entre dispositivos item a item, via `updated_at`.
CREATE TABLE IF NOT EXISTS progress_item (
  user_id    uuid        NOT NULL REFERENCES neon_auth."user"(id) ON DELETE CASCADE,

  -- 'main' | 'dlc'                               -> scope = ''
  -- 'region' | 'korok' | 'chest' | 'korok_count' -> scope = region.id
  kind       text        NOT NULL,
  scope      text        NOT NULL,

  -- id de checklist ('ze_kasho'), id de korok ('P01'), hash de baú
  -- ('350171171'), ou a constante 'koroks' quando kind='korok_count'
  item_id    text        NOT NULL,

  checked    boolean     NOT NULL DEFAULT false,
  amount     integer,               -- só para kind='korok_count'

  -- Carimbo do CLIENTE (clampado pelo servidor contra relógio adiantado).
  -- Sem DEFAULT now() de propósito: a hora que importa é a de quando o
  -- usuário marcou, não a de quando o servidor recebeu — marcar offline e
  -- sincronizar duas horas depois não pode fazer a marcação parecer recente.
  updated_at timestamptz NOT NULL,

  PRIMARY KEY (user_id, kind, scope, item_id),

  CONSTRAINT progress_item_kind_ck CHECK (
    kind IN ('main','dlc','region','korok','chest','korok_count')),

  CONSTRAINT progress_item_scope_ck CHECK (
    (kind IN ('main','dlc') AND scope = '')
    OR (kind NOT IN ('main','dlc') AND scope <> '')),

  CONSTRAINT progress_item_value_ck CHECK (
    (kind =  'korok_count' AND amount IS NOT NULL
        AND amount BETWEEN 0 AND 900 AND checked = false)
    OR (kind <> 'korok_count' AND amount IS NULL)),

  CONSTRAINT progress_item_id_ck        CHECK (item_id ~ '^[A-Za-z0-9_-]{1,64}$'),

  -- Garante que `scope` é sempre um region.id ('central'), nunca um
  -- region.key ('Central Hyrule / Deep Akkala'). A tradução acontece no
  -- adaptador do cliente; isto é a rede caso eu esqueça em algum caminho.
  CONSTRAINT progress_item_scope_fmt_ck CHECK (scope   ~ '^[a-z]{0,20}$')
);

COMMIT;
