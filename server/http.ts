/** Resposta JSON. `no-store` porque tudo que passa por aqui é dado de usuário. */
export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'private, no-store',
    },
  });
}

export type ErrorCode =
  | 'unauthenticated'
  | 'token_expired'
  | 'invalid_payload'
  | 'payload_too_large'
  | 'row_limit'
  | 'internal';

/**
 * Erro no formato { error: { code, message } }. Mensagem em inglês porque é
 * log, não texto de tela — a UI decide o que mostrar a partir do `code`.
 */
export function error(code: ErrorCode, status: number, message?: string): Response {
  return json({ error: { code, message: message ?? code } }, status);
}
