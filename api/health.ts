/**
 * Health check.
 *
 * Ainda não toca no banco — serve pra provar duas coisas isoladamente:
 * que uma Vercel Function roda neste projeto, e que o `npm run typecheck`
 * cobre a pasta `api/` (a Vercel não type-checa, só empacota com esbuild).
 *
 * Qualquer arquivo em `api/` vira uma rota automaticamente: o caminho do
 * arquivo é a URL, o nome da função exportada é o método HTTP.
 */
export function GET(): Response {
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'content-type': 'application/json' },
  });
}
