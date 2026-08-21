# Banco de dados

Neon (Postgres serverless), acessado pelas Vercel Functions em [`api/`](../api).

Este documento é o **porquê**: decisões de modelagem, alternativas descartadas e
as consequências de cada escolha. O **o quê** de cada tabela, coluna e constraint
mora nos comentários da própria migration — quando os dois divergirem, o SQL é a
verdade.

## Ambientes

| Branch Neon | Usada por | Connection string |
| --- | --- | --- |
| `dev` | desenvolvimento local e previews de PR | pooled (host com `-pooler`) |
| `production` | produção (branch `release`) | pooled (host com `-pooler`) |

Sempre a string *pooled*. O acesso é por HTTP e não TCP: as queries são one-shot
e o compute do Neon dorme após 5 min sem uso, então quase toda invocação é cold
start — HTTP faz ~3 round-trips contra ~8 do TCP, e não exige gerenciar ciclo de
vida de pool numa função que pode ser congelada a qualquer momento.

## Migrations

Não há ferramenta de migração, por decisão: com uma migration a cada vários
meses, a ferramenta seria mais peça para manter do que problema resolvido.
Aplicar é manual, pelo Neon Console → SQL Editor → selecionar a branch → Run.

A ordem é sempre: aplicar em `dev` → validar no preview do PR → aplicar em
`production` **antes** do release que depende dela. Migrations aditivas tornam
isso seguro: produção rodando o código antigo simplesmente ignora tabelas e
colunas novas.

| Arquivo | O que faz | `dev` | `production` |
| --- | --- | --- | --- |
| [`0001_progress.sql`](migrations/0001_progress.sql) | tabelas `progress_meta` e `progress_item` | aplicada em 2026-08-07 | **pendente** |

## Modelagem do progresso

Três tabelas participam, só duas são nossas:

- `neon_auth."user"` — vem pronta com o Neon Auth; usamos apenas o `id`.
- `progress_meta` — uma linha por usuário. Existe para responder "esta conta já
  sincronizou alguma vez?". Zero linhas em `progress_item` é ambíguo (conta nova
  ou save vazio sincronizado de propósito), e essa distinção decide se o primeiro
  login sobe o save local direto ou precisa perguntar algo antes.
- `progress_item` — uma linha por item marcado, por usuário. Guarda os seis
  tipos de coisa marcável de uma vez.

### Do save local para linhas

O save no `localStorage` é um JSON aninhado; no banco ele vira uma lista plana.
Cada folha da árvore vira uma linha, e o caminho até ela vira três colunas:

| Caminho no save local | `kind` | `scope` | `item_id` | valor em |
| --- | --- | --- | --- | --- |
| `mainQuests[id]` | `main` | `''` | id da quest | `checked` |
| `dlc[id]` | `dlc` | `''` | id do item | `checked` |
| `regions[regionId][itemId]` | `region` | `region.id` | id do item | `checked` |
| `koroks[regionId][korokId]` | `korok` | `region.id` | `C01` | `checked` |
| `chests[regionId][hash]` | `chest` | `region.id` | `350171171` | `checked` |
| `regionCounts[regionKey].koroks` | `korok_count` | `region.id` ⚠️ | `koroks` | `amount` |

⚠️ Os contadores manuais são chaveados por `region.key` (o nome de exibição,
`"Central Hyrule / Deep Akkala"`), mas `scope` é sempre `region.id`
(`central`). Quem traduz é o adaptador do cliente; `progress_item_scope_fmt_ck`
é a rede de segurança caso algum caminho esqueça.

O `korok_count` é o único kind que carrega valor em vez de estado — daí a coluna
`amount`, `NULL` em todos os outros.

### Por que uma tabela genérica e não seis

A pergunta que decide é: quais colunas seriam *diferentes* entre `korok_item` e
`chest_item`? Nenhuma — todas teriam `user_id`, `id`, `checked`, `updated_at`.
Seis tabelas custariam seis `SELECT`, seis upserts e uma migration nova a cada
categoria que o tracker ganhasse, pagando complexidade por uma distinção que não
existe no dado.

### Por que não um documento `jsonb` por usuário

Seria idêntico ao `localStorage`, e é exatamente aí que quebra: todo salvamento
vira sobrescrita total. O celular que ficou offline sobe o save antigo inteiro e
apaga o que o computador marcou. Com duas telas na mesma conta, o último a
escrever vence — e vence errado.

Linha por item permite gravar **só o delta** de um clique e resolver conflito
**item a item** comparando `updated_at`.

### O preço: isto é um EAV

O banco não sabe que `C01` é um korok que existe, nem que `katah_chuki` é um
santuário do Central — não dá para fazer foreign key para um dataset que mora em
TypeScript. Essa validação vive na aplicação. As constraints da migration são o
quanto dessa rigidez dá para empurrar para dentro do SQL, e é por isso que elas
são mais numerosas do que o normal.

### A chave primária

`PRIMARY KEY (user_id, kind, scope, item_id)` — a identidade de um checkbox. Não
há `id` serial. Ela faz três trabalhos: impede duplicata, é o alvo do
`ON CONFLICT` que torna cada salvamento um upsert, e — porque `user_id` lidera —
é também o índice que faz "tudo deste usuário" ser uma varredura contígua, sem
índice extra.

### Duas decisões que parecem detalhe

**`updated_at` não tem `DEFAULT now()`.** O carimbo é do cliente (o servidor só o
limita contra relógio adiantado). O instante que importa é quando a pessoa
marcou, não quando o servidor ficou sabendo: marcar offline e sincronizar duas
horas depois não pode fazer aquela marcação parecer a mais recente.

**Desmarcar grava `checked = false`, não apaga a linha.** Se apagasse, a ausência
seria indistinguível de "nunca marcou" e o outro dispositivo remarcaria o item na
próxima sincronização. A linha sobrevive para carregar o `updated_at` que prova
*quando* foi desmarcada.

## O que ainda não está modelado

- **`progress_meta` nunca recebe escrita** — ninguém insere nela ainda, então
  `everSynced` responde `false` para todo mundo. Quem vai popular é o `PUT`.
- **Só existe leitura** — o upsert com resolução por `updated_at` ainda não foi
  escrito.
- **Sem dispositivo, histórico ou auditoria** — a resolução de conflito é apenas
  "o `updated_at` mais recente vence", por item.

## Ao mudar o banco

Toda modelagem nova ou alteração de schema é documentada aqui, no mesmo PR que a
introduz: o porquê da decisão e as alternativas descartadas. A tabela de
migrations acima também é atualizada, incluindo o status em cada branch Neon.
