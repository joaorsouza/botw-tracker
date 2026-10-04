# BOTW Tracker — banco de dados + login com sync opcional

> **Sobre este documento.** É o plano original da feature, escrito em
> 2026-08-06 antes de qualquer código, preservado aqui como registro. O texto
> abaixo da tabela não foi reescrito: onde a implementação divergiu, vale o
> código e o [db/README.md](../db/README.md), que guarda as decisões de banco
> tomadas depois. Mantenha a tabela de status atualizada a cada PR da sequência.

| PR | Conteúdo | Status |
| --- | --- | --- |
| 0 | gitignore + working agreement | mergeado (#2) |
| 1 | refactor `useProgress` | mergeado (#3) |
| 2 | scaffold da API + type gate | mergeado (#4) |
| 3 | `GET /api/progress` | mergeado (#5) |
| 4 | login opcional no header | mergeado (#6), liberado na v1.2.0 em 2026-10-03 |
| 5 | `PUT /api/progress` | aberto (#7) |
| 6a | save v3 com timestamps por item | pendente |
| 6b | sync com a nuvem | pendente |
| 7 | retry, offline e hardening de sessão | pendente |
| 7b | proxy de auth na mesma origem | cancelado: o Safari/iOS manteve a sessão com cookie `SameSite=None; Partitioned` |

## Context

Hoje o tracker é uma SPA 100% estática: todo o estado vive em [App.tsx](../src/App.tsx) e é serializado inteiro no `localStorage` (`botw-progress`) a cada clique. Isso significa que **o progresso está preso a um navegador** — trocar de máquina, limpar o cache ou abrir no celular começa do zero, e não existe forma de continuar no PC o que foi marcado no celular.

O objetivo é adicionar **persistência em banco** e **login**, sem perder o que o app tem de bom: ele abre instantâneo, funciona offline e não exige conta. Por isso a arquitetura é **local-first** — o `localStorage` continua sendo a fonte da verdade do app, e o login é opcional: quem entra ganha sincronização entre dispositivos, quem não entra continua usando exatamente como hoje.

Resultado esperado: marcar um korok no celular e ver a marcação no PC, sem nunca degradar a experiência de quem usa deslogado.

---

---

## Modo de trabalho (vale para todos os PRs)

Combinado explícito para esta implementação — o objetivo é aprender a arquitetura, não só entregá-la:

1. **Explicar antes de fazer.** Antes de criar ou editar qualquer arquivo, rodar qualquer comando ou aplicar qualquer migração: descrever o que vai mudar e por quê, e **esperar OK explícito**. Inclusive no que parecer trivial.
2. **Um passo por vez.** Nada de agrupar várias mudanças num lote sem supervisão. Mostrar o conteúdo/diff de cada arquivo, aprovar, e só então ir para o próximo.
3. **Comandos destrutivos ou que saem para fora sempre pedem confirmação, toda vez** — `git push`, `gh workflow run`, `npm version`, SQL contra `production`, `vercel env`, qualquer `DROP`/`DELETE`.
4. **Assumir nada em silêncio.** Ambiguidade vira pergunta, não default escolhido por conta própria.

Isso vira uma seção nova no [CLAUDE.md](../CLAUDE.md) (PR 0), para valer também em conversas futuras.

**Ressalva honesta:** o `CLAUDE.md` é uma *instrução*, não uma trava. Ele deixa o comportamento consistente entre sessões, mas quem **garante** que nada roda sem sua aprovação é o modo de permissão do Claude Code (`/config` → Permission mode → `ask`, ou seguir em plan mode). O ideal é ter os dois: o `CLAUDE.md` define o *como conversar*, o modo de permissão define o *não pode passar daqui*.

---

## Decisões (fechadas)

| # | Questão | Decisão | Por quê |
|---|---|---|---|
| 1 | Banco | **Neon Postgres**, projeto novo | Conta já existente; relacional é o que sustenta merge por item |
| 2 | Login | **Neon Auth** (Managed Better Auth, Beta) | Usuário mora em `neon_auth."user"` no mesmo banco → FK real + `ON DELETE CASCADE` |
| 3 | Acesso ao banco | **BFF** em `api/` (Vercel Functions) | `DATABASE_URL` nunca no bundle; regra de acesso é TS legível, não policy SQL |
| 4 | Modelo | **Normalizado**, 1 linha por item, `updated_at` por linha | Upsert por delta (~100 B/clique vs 40 KB) e merge sem last-write-wins global |
| 5 | Estratégia | **Local-first + sync** | App nunca depende da rede; login é opcional |
| 6 | Cookie de terceiros no iOS | Planejar para o caso pior; **proxy same-origin como PR contingente** | Safari bloqueia cookie de terceiros; só se manifesta no teste real |
| 7 | Router | **Não adicionar** `react-router` | Neon Auth funciona em SPA Vite sem router; modal com estado local cobre tudo |
| 8 | ORM | **Não** (SQL puro em `db/migrations/`) | 2 tabelas, 2 queries — ORM é peso morto aqui |

**Correção importante em relação à conversa:** o "Neon Auth" antigo (Stack Auth + `neon_auth.users_sync`) é legado. O produto atual é **Managed Better Auth**, em Beta, com tabela `neon_auth."user"` e escrita **síncrona** — o que na verdade torna a FK mais segura (não existe mais janela de race entre criar usuário e gravar progresso). Vite + React SPA sem router é oficialmente suportado ([quickstart](https://neon.com/docs/auth/quick-start/react)).

---

## Arquitetura

```
┌─ navegador ────────────────────────────────┐
│  React SPA (Vite)                          │
│  ├── useProgress()  ──►  localStorage      │  fonte da verdade, síncrono, offline
│  └── useSync()      ──►  fila de deltas    │  opcional, só quando logado
└──────────┬─────────────────────┬───────────┘
           │ Bearer <JWT 15min>  │ cookie de sessão
           ▼                     ▼
┌─ api/ (Vercel Function) ─┐   ┌─ Neon Auth ──────────┐
│  verifica JWT (jose/JWKS)│   │  ep-xxx.neonauth...  │
│  where user_id = sub     │   └──────────┬───────────┘
│  DATABASE_URL server-only│              │ escrita síncrona
└──────────┬───────────────┘              ▼
           └──────────────────►  Neon Postgres
                                 ├── neon_auth."user"
                                 ├── progress_item   (FK → user.id)
                                 └── progress_meta   (FK → user.id)
```

Duas credenciais, papéis diferentes: o **cookie de sessão** (longo, `HttpOnly`, no domínio do Neon Auth) prova que o browser está logado; o **JWT** (15 min, em memória do JS, header `Authorization`) prova ao BFF quem é o usuário, verificável por assinatura sem consultar o banco.

---

## Entrega faseada

Cada PR é independentemente deployável e **nenhum pode quebrar o modo offline**. Fluxo: feature branch → PR → `main`; release via `gh workflow run release.yml`.

| PR | Commit (inglês, conventional) | Risco | Prova |
|---|---|---|---|
| 0 | `chore: ignore env files and document the working agreement` | nulo | `.env` nunca vaza + regra no CLAUDE.md |
| 1 | `refactor: extract progress state into useProgress hook` | baixo | **zero mudança de comportamento** |
| 2 | `chore(api): add serverless function scaffold and type gate` | baixo | função roda; `tsc` cobre `api/` |
| 3 | `feat(api): add progress read endpoint backed by Neon` | baixo | JWKS + SQL, **read-only** |
| 4 | `feat(auth): add optional login in the header` | médio | login pt-BR; ainda não sincroniza |
| 5 | `feat(api): add progress upsert endpoint` | médio | escrita + validação; cliente não usa |
| 6a | `feat(storage): add per-item timestamps (save v3)` | médio | migração local, **sem rede** |
| 6b | `feat(sync): sync progress with the cloud when logged in` | **alto** | o produto |
| 7 | `fix(sync): retry, offline handling and session hardening` | médio | robustez |
| 7b | `fix(auth): proxy auth through same origin` | — | **só se o teste no iPhone falhar** |

---

## PR 1 — o refactor (pré-requisito de tudo)

Hoje [App.tsx](../src/App.tsx) (168 linhas) concentra estado (13-20), load (22-38), save (40-48), mutators (50-77), derivados (81-100) e render. Extraímos os quatro primeiros.

**`src/storage/local.ts`** — único lugar do repo que conhece o formato do localStorage:

```ts
export const STORAGE_KEY = 'botw-progress';

export interface ProgressState {
  mainQuests: BoolMap;
  dlc: BoolMap;
  regionCounts: RegionCounts;   // chaveado por region.key (verruga preservada)
  regions: RegionsState;
  korokChecks: RegionsState;
  chestChecks: RegionsState;
}
export const EMPTY_PROGRESS: ProgressState = { /* ... */ };
```

`read()` replica **exatamente** [App.tsx:23-33](../src/App.tsx) (incluindo `migrateMainQuests(data)` de [gameData.ts:133-148](../src/data/gameData.ts) e os `|| {}`). O mapeamento torto `koroks`↔`korokChecks` / `chests`↔`chestChecks` fica encapsulado aqui e some do resto do código. `write()` replica [App.tsx:43](../src/App.tsx).

**`src/hooks/useProgress.ts`** — mesma semântica dos effects atuais, com **7 `useState` colapsados em 1 objeto**. Isso elimina a classe de bug que o [CLAUDE.md](../CLAUDE.md) alerta ("adicionar slice novo nos dois effects"): o save effect passa a depender de `[state, loaded]` em vez de 6 slices.

Mutators viram `toggleMainQuest(id)`, `toggleDlc(id)`, `toggleRegionItem(regionId, itemId)`, `setKoroks(regionKey, n)`, `toggleKorok(regionId, korokId)`, `toggleChest(regionId, hash)` — removendo o `Dispatch<SetStateAction>` que hoje vaza para o JSX em [App.tsx:50-51](../src/App.tsx).

`effectiveKoroks` ([App.tsx:81-84](../src/App.tsx)) e os totais (86-100) **ficam em App.tsx** — são derivados de UI, não persistência.

**Critério de aceite (não há testes no repo):** salvar o conteúdo de `localStorage['botw-progress']` antes; aplicar o PR; marcar e desmarcar um item de cada tipo; a string serializada tem que ser **byte-idêntica**. É o único critério que importa neste PR.

---

## Schema SQL

`db/migrations/0001_progress.sql`, aplicado **à mão** no SQL Editor do Neon.

### A verruga do `regionCounts`

`regionCounts` é chaveado por `region.key` — nome de exibição com espaço e barra (`'Central Hyrule / Deep Akkala'`) — enquanto todo o resto usa `region.id` (`central`). O [CLAUDE.md](../CLAUDE.md) proíbe renomear `key`.

**Decisão: traduzir `key → id` na fronteira do adaptador remoto**, com um mapa derivado de `REGION_DATA` em runtime (`src/sync/regionKeys.ts`). O localStorage fica byte-idêntico, o SQL fica limpo, e não há bump de `SAVE_VERSION` por causa disso. Se um dia você normalizar o localStorage também, o servidor não muda em nada — ele já fala `region.id`.

### DDL

```sql
BEGIN;

-- Responde "este usuário já sincronizou alguma vez?" — COUNT(*)=0 em
-- progress_item é ambíguo (pode ser um save vazio já sincronizado).
CREATE TABLE IF NOT EXISTS progress_meta (
  user_id      uuid PRIMARY KEY REFERENCES neon_auth."user"(id) ON DELETE CASCADE,
  save_version integer     NOT NULL,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS progress_item (
  user_id    uuid        NOT NULL REFERENCES neon_auth."user"(id) ON DELETE CASCADE,
  kind       text        NOT NULL,  -- main|dlc|region|korok|chest|korok_count
  scope      text        NOT NULL,  -- '' para main/dlc, senão region.id
  item_id    text        NOT NULL,  -- 'P01' | 'ze_kasho' | '350171171' | 'koroks'
  checked    boolean     NOT NULL DEFAULT false,
  amount     integer,               -- só para kind='korok_count'
  updated_at timestamptz NOT NULL,  -- carimbo do CLIENTE, clampado pelo servidor
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
  CONSTRAINT progress_item_scope_fmt_ck CHECK (scope   ~ '^[a-z]{0,20}$')
);

COMMIT;
```

**Uma tabela, não duas.** Os contadores manuais de korok são numéricos, não booleanos — tentador separar. Mas são **10 linhas por usuário**, e duas tabelas duplicariam a parte difícil (dois SELECTs no pull, dois upserts, duas regras de conflito, dois tipos de delta no cliente). `amount` nullable + CHECK por `kind` resolve; NULL no Postgres custa ~0.

**Índices: só a PK.** `PRIMARY KEY (user_id, kind, scope, item_id)` já serve `WHERE user_id = $1` por prefixo. Um índice em `updated_at` só serviria a pull incremental, que é non-goal.

**Sem RLS.** A BFF conecta com o role owner e deriva `user_id` do `sub` do JWT, nunca do corpo da request. A Data API não será habilitada.

### Regra de conflito

```sql
ON CONFLICT (user_id, kind, scope, item_id) DO UPDATE
  SET checked = EXCLUDED.checked, amount = EXCLUDED.amount,
      updated_at = EXCLUDED.updated_at
  WHERE EXCLUDED.updated_at > progress_item.updated_at
```

Três propriedades que valem declarar:

1. **Last-write-wins por linha, decidido no banco** — sem janela read-modify-write; duas abas convergem.
2. **É a rede de segurança contra clobber.** Mesmo com bug no cliente enviando estado vazio com carimbo velho, o servidor **não regride**. Esse é o argumento decisivo para pagar um `updated_at` por linha.
3. **Empate não atualiza** → reenvio é no-op → retry é seguro.

Consequência: quando o `WHERE` reprova, o servidor devolve o estado autoritativo e o cliente adota.

**A verruga nº 2 vira feature:** o app grava `false` em vez de apagar a chave. Isso é exatamente o que permite representar "desmarquei em T" — sem a linha `false`, um desmarcar seria indistinguível de "nunca toquei".

Volume: ~150 B/linha × 2.387 linhas = **~360 KB por conta 100%** → ~1.400 contas nos 0,5 GB do free tier.

---

## Endpoints (BFF)

Código compartilhado em **`server/` na raiz**, não em `api/_lib/` — tudo dentro de `api/` corre risco de virar rota deployada.

```
api/health.ts       GET  /api/health         (sem auth; acorda o compute Neon)
api/progress.ts     GET  /api/progress       (pull completo)
                    PUT  /api/progress       (upsert de deltas)
server/db.ts        neon() + SQL
server/auth.ts      requireUser() — jose + JWKS remoto
server/validate.ts  normalização e validação do lote
tsconfig.server.json
db/migrations/0001_progress.sql
```

Assinatura Web-standard (preset "other" da Vercel, sem `vercel.json`):

```ts
export async function GET(request: Request): Promise<Response> { /* ... */ }
```

### Autenticação

`Authorization: Bearer <authClient.token()>`. Verificação com **`jose`** (JWT é **EdDSA** — `jsonwebtoken` não suporta, não usar):

```ts
const base = process.env.NEON_AUTH_BASE_URL!;
const JWKS = createRemoteJWKSet(new URL(`${base}/.well-known/jwks.json`)); // escopo do módulo → cache
const issuer = new URL(base).origin;
const { payload } = await jwtVerify(token, JWKS, { issuer, audience: issuer });
const userId = payload.sub!;
```

`401 token_expired` é um código explícito — sinal para o cliente renovar o token e repetir **uma** vez.

### `GET /api/progress`

```jsonc
{ "saveVersion": 3,
  "serverTime": "2026-08-06T12:00:00.000Z",  // cliente detecta clock skew
  "everSynced": true,                        // existe linha em progress_meta
  "items": [ { "kind":"korok","scope":"hateno","itemId":"D01",
               "checked":true,"amount":null,"updatedAt":"..." } ] }
```

`Cache-Control: private, no-store`. Pior caso ~250 KB, ~20 KB com gzip.

### `PUT /api/progress`

Recebe 1..3000 deltas. Uma statement, um round-trip: `unnest()` dos arrays → CTE com o `INSERT ... ON CONFLICT` → `SELECT` final devolvendo o estado autoritativo de **todas** as chaves do lote (aplicadas ou rejeitadas). O cliente adota o que voltar.

### Validação — **não** validar contra o vocabulário de ids

Valida-se estrutura (`kind` no enum, `scope` ∈ os 10 `region.id` hard-coded, `itemId` batendo `/^[A-Za-z0-9_-]{1,64}$/`, `amount` 0..900) + **teto de 3000 linhas por usuário**. Não se valida "esse korok existe".

Motivos, em ordem de peso:

1. **Acoplamento de deploy.** [koroks.ts](../src/data/koroks.ts) e [chests.ts](../src/data/chests.ts) são GERADOS e serão regenerados. Uma allowlist criaria ordem obrigatória de deploy (regenerar → servidor → frontend).
2. **Um id desconhecido causa dano zero.** A FK e o `user_id` vindo do JWT impedem escrever na conta alheia; o cliente só *lê* ids que já conhece (itera `KOROKS_BY_REGION`, não as linhas do servidor). Id falso é lixo inerte.
3. **O risco real é volume, não id inválido** — e o teto de 3000 linhas ataca isso, pegando inclusive ids *válidos* repetidos em loop, que allowlist nenhuma pegaria.

**Clamp de timestamp futuro é obrigatório:** `updatedAt > now + 60s` é reescrito para `now`. Sem isso, um aparelho com relógio adiantado grava linhas que **nenhuma escrita futura consegue sobrepor** (a regra é `>`), corrompendo a conta de forma permanente e invisível. Custa 3 linhas e é o bug mais caro possível neste desenho.

---

## Fechar o buraco do type-check

**Problema:** [tsconfig.json](../tsconfig.json) tem `"include": ["src"]` e o build é `tsc && vite build`. Um `api/` novo **não seria type-checado** — nem local, nem no gate de release ([release.yml](../.github/workflows/release.yml)). Erros de backend iriam para produção em silêncio, e a Vercel também não type-checa `api/` (só empacota com esbuild).

**Solução** — `tsconfig.server.json` na raiz com `"include": ["api", "server"]`, `"types": ["node"]` e **sem `lib.dom`** (de propósito: código de servidor não deve conseguir referenciar `window` ou `localStorage` por acidente). E em `package.json`:

```jsonc
"typecheck": "tsc -p tsconfig.json && tsc -p tsconfig.server.json",
"build": "npm run typecheck && vite build"
```

Novo devDep `@types/node@^20` (casando com o `node-version: 20` do release.yml). **Efeito colateral positivo:** como a Vercel roda `npm run build`, todo preview de PR passa a ser gate de tipos do backend — sem tocar em nenhum workflow.

---

## Algoritmo de sync

### O remoto NÃO é "só outro storage"

Entregamos a interface `ProgressStorage` no PR 1, mas **o remoto deliberadamente não a implementa**:

- Local é **snapshot**: `write(estadoInteiro)`, síncrono, não falha por rede.
- Remoto é **delta**: `push(deltas[])`, assíncrono, falha, tem conflito, tem relógio.

Fingir que são a mesma coisa é exatamente como se produz o bug "load remoto falhou → effect de save escreveu estado vazio por cima da nuvem". Então: `useProgress()` fala **só** com o local; `useSync()` é um hook separado que observa deltas e aplica correções do servidor; `App.tsx` compõe os dois.

### Timestamps — o problema honesto

**O save de hoje não tem carimbo por item.** Só `version`. Então no primeiro login de quem já tem progresso local é literalmente impossível saber *quando* cada caixinha foi marcada.

**PR 6a — `SAVE_VERSION = 3`** ([gameData.ts:109](../src/data/gameData.ts)), adicionando ao payload:

```jsonc
"ts": { "korok:hateno:D01": 1786000012000 },  // chave = a mesma PK do banco
"baselineTs": 1786000000000,                  // instante da migração v2→v3
"lastPushedAt": 0
```

Migração v2→v3 ao lado de `migrateMainQuests` ([gameData.ts:133-148](../src/data/gameData.ts)), gated em `data.version` — nunca rodando em todo load. Item sem entrada em `ts` = "existia antes de eu saber medir tempo".

### O primeiro merge

**Todo item com carimbo → newest-wins puro, sempre.** Sem diálogo, sem exceção.

Itens **sem** carimbo (legado pré-v3) só aparecem no primeiro merge, e só o cenário "os dois lados têm dados" precisa de decisão. Aí sim, **um modal pt-BR, uma única vez**:

```
Você já tem progresso salvo neste navegador

Encontramos progresso aqui e na sua conta. O que fazer?

 (•) Juntar os dois (recomendado)
     Mantém tudo o que está marcado nos dois lados; nos contadores
     de korok, fica o número maior.
 ( ) Usar só o progresso da conta
 ( ) Usar só o progresso deste navegador

Isso é perguntado só uma vez.                    [ Continuar ]
```

O OR existe, mas é (a) só no primeiro merge, (b) só para itens sem carimbo, (c) só na direção "marcado vence", e (d) **escolhido explicitamente**. Depois disso, nunca mais (flag `mergeDone`).

`max()` nos contadores é a única regra defensável para um número sem carimbo — e como o contador manual só conta quando o checklist da região está vazio ([App.tsx:81-84](../src/App.tsx)), subestimar é a perda visível.

### As quatro regras invioláveis

```
              login
 'off' ────────────────► 'pulling'
  ▲                        │ GET /api/progress
  │ logout            ok ┌─┴─┐ falha
  │                      ▼   ▼
  │                'merging' 'error' ──(backoff)──► 'pulling'
  │                      │
  └───────────────── 'live' ◄──► 'pushing'
```

1. **`useProgress` nunca depende de `syncPhase`.** O save local continua gated só por `loaded`. A nuvem cair jamais afeta a escrita local.
2. **Nenhum delta sai fora de `'live'`.** Em `pulling`/`merging`/`error` os deltas acumulam, nunca são enviados nem descartados.
3. **Pull mal-sucedido nunca leva a push.** Não existe transição `'error' → 'live'`.
4. **Deltas nascem no mutator, nunca de um diff.** `toggleKorok('hateno','D01')` emite exatamente aquele delta. **Nunca** comparar estado atual contra snapshot — é esse diff que produz "estado vazio → 2.387 deltas de `false`" quando um load falha.

E o `WHERE EXCLUDED.updated_at >` no servidor é a rede final, mesmo com as quatro regras violadas por bug. Defesa em profundidade.

### Fila e flush

`pending` é um `Map` chaveado por `kind:scope:itemId` → **colapsa mutações repetidas**. Flush no que vier primeiro: 2 s de ociosidade, 50 deltas acumulados, `visibilitychange → hidden`, ou `pagehide` (com `fetch(..., {keepalive:true})` — `sendBeacon` não serve, não aceita header `Authorization`).

Isso resolve o [KorokCounter](../src/components/KorokCounter.tsx) de graça: digitar "148" gera 3 mutações que colapsam em 1 delta antes de qualquer request.

**Durabilidade sem fila persistida:** se a aba morrer, `pending` some — mas `ts` e `lastPushedAt` estão no localStorage. No próximo boot com sessão viva, o pull é seguido de um push de todos os itens com `ts[k] > lastPushedAt`. Auto-cura de crash sem uma segunda fila para dessincronizar.

Retry: backoff exponencial 1→30 s com jitter; `401` renova token e repete uma vez; `400/409/413` descarta o lote e reporta (repetir não adianta).

---

## UX de login (pt-BR)

**Sem `react-router`** e **sem `@neondatabase/auth-ui`** (o pacote exige Tailwind v4 ou traz um reset CSS que briga com o preflight do Tailwind 3.4.4 do projeto; e traduzir dezenas de chaves para um form de 2 campos não compensa). Form à mão, ~120 linhas, no visual stone/amber existente.

**Header** ([App.tsx:109-114](../src/App.tsx)) ganha um controle no canto direito: deslogado, botão fantasma `Entrar`; logado, inicial do e-mail + menu com `Sair`.

**`<SyncStatus />`** — pill discreto:

| Estado | Texto | Cor |
|---|---|---|
| deslogado | `Salvo neste navegador` | stone-500 |
| pulling/merging | `Carregando da nuvem...` | amber-300 |
| pushing | `Sincronizando...` | amber-300 |
| live | `Sincronizado · há 2 min` | emerald-400 |
| erro/offline | `Sem conexão — salvo aqui` (clicável) | red-400 |

O banner de erro existente ([App.tsx:132](../src/App.tsx)) fica **exclusivamente** para falha de localStorage, que é crítica. Falha de nuvem é não-crítica e mora no pill — misturar os dois faria ignorar o grave.

Rodapé do modal: `Login é opcional. Sem ele, seu progresso continua salvo neste navegador.`

---

## Env vars e segredos

**PR 0 — [.gitignore](../.gitignore) hoje tem 3 linhas e não ignora `.env`.** Corrigir antes de qualquer outra coisa:

```gitignore
node_modules
dist
.DS_Store
.env
.env.*
!.env.example
.vercel
```

| Variável | No bundle? | Onde |
|---|---|---|
| `VITE_NEON_AUTH_URL` | ✅ **sim, é pública** | Vercel (Prod/Preview/Dev) + `.env.local` |
| `DATABASE_URL` | ❌ server-only | Vercel (Prod/Preview/Dev) — string **pooled**, `?sslmode=require` |
| `NEON_AUTH_BASE_URL` | ❌ server-only | Vercel (Prod/Preview/Dev) |

`NEON_AUTH_BASE_URL` duplica um valor público **de propósito**: a função deriva issuer e JWKS dela, nunca de nada vindo na request — assim um atacante não aponta a validação para um JWKS que ele controla.

**Guarda-corpo em [vite.config.ts](../vite.config.ts)**: `loadEnv(mode, cwd, 'VITE_')` e `throw` se alguma chave bater `/DATABASE|SECRET|PASSWORD|TOKEN|_KEY/i`. Falha o build em vez de vazar segredo no bundle.

Commitar `.env.example` com comentários explicando qual metade é pública.

### Seção nova no CLAUDE.md (PR 0)

Escrita em inglês para casar com o resto do arquivo:

```markdown
## Working with Claude on this repo

- **Explain before acting.** Before creating or editing any file, running any
  command, or applying a migration: describe what will change and why, then wait
  for an explicit OK. This applies even to changes that look trivial.
- **One step at a time.** Never batch several file changes into a single
  unattended run. Show each file's content or diff, get approval, then move on.
- **Destructive or outward-facing commands always need confirmation, every
  time** — `git push`, `gh workflow run`, `npm version`, SQL against the
  `production` branch, `vercel env`, anything that drops or deletes.
- **State assumptions out loud.** Ambiguity becomes a question, never a silently
  chosen default.
- The goal here is understanding the architecture, not just shipping it — favour
  explaining the *why* over moving fast.
```

---

## Infra Neon

**Duas branches: `production` (default) e `dev`** (dev serve local + todos os previews). Branch por PR está descartada: `VITE_NEON_AUTH_URL` é baked no bundle em build time, então exigiria um step de CI setando env var por deployment; além disso o free tier tem teto de 10 branches e 100 CU-hours **compartilhadas** entre todas.

**Região:** não copiar a do `LiftingDiaryCourse` (`aws-sa-east-1`) sem verificar. A latência que domina é *função Vercel ↔ Postgres*. Checar Vercel → Settings → Functions → Region (default `iad1`) e criar o projeto Neon na região AWS correspondente.

**Driver:** `@neondatabase/serverless` (transporte HTTP), não `pg`. As queries são one-shot (nenhuma transação interativa); HTTP faz ~3 round-trips contra ~8 do TCP, e como o compute Neon dorme a cada 5 min teremos cold start quase sempre. Além disso, zero gestão de pool — que com `pg` é a maior superfície de bug em serverless.

**Trusted domains:**
- branch `dev`: `https://botw-tracker-*.vercel.app` (cobre o hash aleatório dos previews)
- branch `production`: **só o domínio exato**. Nunca wildcard — `https://*.vercel.app` transformaria qualquer app na Vercel em destino válido de redirect.
- **OAuth (Google) desligado em preview** — previews usam só e-mail+senha, que não passa por redirect, removendo o problema dos hostnames não-determinísticos.
- `localhost` já é pré-aprovado.

---

## Release e CI

**O modelo de branches não muda.** `api/` é deployado pelo **mesmo** deployment Vercel do SPA; `release` continua Production Branch; `main` e feature branches continuam gerando previews. **Nenhuma alteração em [release.yml](../.github/workflows/release.yml)** — o gate `npm run build` passa a cobrir o backend automaticamente por causa da mudança no `package.json`.

**Ordem de deploy da migração** (ela é manual):

1. Aplicar `0001_progress.sql` na branch `dev` → merge do PR → validar no preview
2. **Antes** de `gh workflow run release.yml`: aplicar o mesmo SQL em `production`
3. Rodar o release

O schema é puramente aditivo (2 tabelas novas), então aplicar cedo é seguro — produção sem o código novo simplesmente ignora as tabelas. Documentar isso no [CLAUDE.md](../CLAUDE.md) junto com a seção de Releases.

---

## Riscos

1. **Neon Auth é Beta** (`0.x`). Pinar versões **exatas** dos pacotes Neon, anotar no CLAUDE.md, nunca `npm update` sem testar login.
2. **Cookie de terceiros no iOS.** Local-first degrada para "não sincroniza neste navegador", não para "app quebrado". **Testar em iPhone real antes de fazer release do PR 6b.** Se falhar → PR 7b (proxy `api/auth/[...path].ts` reescrevendo o `Set-Cookie` para o seu domínio). Padrão conhecido de reverse proxy, mas não suportado oficialmente pela Neon — é plano B, não plano A.
3. **FK para schema gerenciado em Beta.** Depende do role da app ter `REFERENCES` em `neon_auth` e da Neon não fazer DROP/RECREATE em migração interna. Testar em `dev` primeiro; se falhar, remover `REFERENCES` e manter `user_id uuid NOT NULL` puro (perde o cascade → apagar conta vira código).
4. **`typescript ^7.0.2` + `@types/react ^19.2.18` sobre React 18.3.1** — mismatch **pré-existente** em [package.json](../package.json). O SDK do Neon é o primeiro código de terceiros a exercitar essa combinação. Orçar tempo; **não** tentar consertar o mismatch aqui.
5. **Free tier: 100 CU-hours/mês** compartilhadas entre as duas branches. O batching é controle de **custo** tanto quanto de performance. Monitorar em Console → Usage no primeiro mês.
6. **A função de merge é a primeira lógica do repo onde um bug silencioso perde progresso do usuário — e não há testes.** Recomendação (dentro do PR 6a): `vitest` cobrindo só `toDeltas`, `fromServerRows` e `resolve()`. ~8 casos, ~80 linhas. É o único ponto onde a ausência de testes deixa de ser aceitável.

---

## Non-goals explícitos

- ORM ou ferramenta de migração (Drizzle/Prisma/Kysely) — SQL puro, aplicado à mão
- `react-router` e `@neondatabase/auth-ui`
- Neon **Data API** e **RLS** — toda leitura/escrita passa pela BFF, única guardiã do `user_id`
- Branch Neon por PR
- Pull incremental (`?since=`) e o índice que ele exigiria
- Sync em tempo real / push multi-dispositivo — o modelo é pull-no-boot + push-por-delta
- Exportar/importar save, apagar conta, perfil público, compartilhar progresso
- MFA (ainda não suportado pelo Managed Better Auth)
- SMTP próprio no início — usar o compartilhado da Neon com **códigos** de verificação (links exigem SMTP próprio)
- Baús continuam fora do % geral — sincronizam, mas não mudam `overallPct` ([App.tsx:97-100](../src/App.tsx))
- Consertar o mismatch React 18 runtime / React 19 types

---

## Verificação

**PR 1 (o mais importante):** snapshot de `localStorage['botw-progress']` → aplicar → recarregar → marcar/desmarcar um item de cada tipo → a string tem que ser **byte-idêntica**. Mais `npm run typecheck` limpo.

**PR 2-3:** `npm run dev` + `vercel dev` (ou o preview do PR); `curl /api/health` → `{ok:true,db:'up'}`; `curl /api/progress` sem token → `401`; com token válido → `200` com `items: []`.

**PR 4:** criar conta no preview, sair, entrar de novo, recarregar a página — a sessão sobrevive. Testar em Chrome desktop **e no celular**.

**PR 5:** `PUT` com 1 delta → `GET` devolve. `PUT` com o mesmo delta e carimbo mais velho → **não** sobrescreve (a prova da regra de conflito). `PUT` com `updatedAt` em 2099 → gravado com `now`. `PUT` com `kind` inválido → `400`.

**PR 6b — o teste que importa:** marcar 5 koroks no PC logado; abrir no celular logado; os 5 aparecem. Marcar 3 no celular; voltar ao PC; recarregar; os 3 aparecem e os 5 continuam lá. Desmarcar 1 no celular e conferir que ele **fica** desmarcado no PC (é o caso que o blob não conseguiria).

**Offline:** DevTools → Network → Offline; marcar 10 itens; o pill vira `Sem conexão`; voltar online; o pill vira `Sincronizado`; recarregar em outro navegador e conferir os 10.

**O caso perigoso:** com a sessão ativa, bloquear `/api/progress` no DevTools (retornar 500), marcar itens, recarregar. O progresso local tem que continuar intacto **e** o servidor não pode ter sido zerado.

**Antes do release:** aplicar a migração em `production`, conferir trusted domains sem wildcard, e rodar o production checklist da Neon (SMTP, application name, desligar "Allow Localhost").
