/**
 * Health check.
 *
 * Ainda não toca no banco — serve pra provar duas coisas isoladamente:
 * que uma Vercel Function roda neste projeto, e que o `npm run typecheck`
 * cobre a pasta `api/`. A Vercel compila as funções com o TypeScript do
 * próprio projeto, mas não com as regras do tsconfig.server.json, então
 * `strict` e a ausência de DOM só são garantidas pelo nosso typecheck.
 *
 * Qualquer arquivo em `api/` vira uma rota automaticamente: o caminho do
 * arquivo é a URL, o nome da função exportada é o método HTTP.
 */
export function GET(): Response {
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'content-type': 'application/json' },
  });
}
