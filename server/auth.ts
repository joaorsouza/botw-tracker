import { createRemoteJWKSet, jwtVerify } from 'jose';

const AUTH_BASE_URL = process.env.NEON_AUTH_BASE_URL;

if (!AUTH_BASE_URL) {
  throw new Error(
    'NEON_AUTH_BASE_URL não está definida. Configure em Vercel → Settings → ' +
    'Environment Variables com a Auth Base URL do projeto Neon.'
  );
}

/**
 * Conjunto de chaves públicas do Neon Auth.
 *
 * Criado no escopo do módulo de propósito: o `jose` cacheia as chaves
 * internamente, então em container quente não há fetch extra por requisição.
 */
const JWKS = createRemoteJWKSet(new URL(`${AUTH_BASE_URL}/.well-known/jwks.json`));

/**
 * Issuer/audience esperados. Derivados da variável de ambiente, NUNCA de algo
 * que venha na request — senão um atacante apontaria a validação para um JWKS
 * que ele controla e assinaria os próprios tokens.
 */
const ISSUER = new URL(AUTH_BASE_URL).origin;

export type AuthErrorCode = 'unauthenticated' | 'token_expired';

export class AuthError extends Error {
  constructor(readonly code: AuthErrorCode) {
    super(code);
    this.name = 'AuthError';
  }
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Extrai e valida o Bearer token da request, devolvendo o id do usuário —
 * o claim `sub`, que é o uuid de neon_auth."user".id.
 *
 * Lança AuthError; quem chama traduz para 401.
 */
export async function requireUser(request: Request): Promise<string> {
  const header = request.headers.get('authorization');
  if (!header?.startsWith('Bearer ')) throw new AuthError('unauthenticated');

  const token = header.slice('Bearer '.length).trim();
  if (!token) throw new AuthError('unauthenticated');

  let sub: string | undefined;
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: ISSUER,
      audience: ISSUER,
    });
    sub = payload.sub;
  } catch (e) {
    // Token expirado ganha código próprio: é o sinal para o cliente renovar
    // e repetir uma vez, em vez de tratar como "faça login de novo".
    const expired =
      typeof e === 'object' && e !== null && 'code' in e &&
      (e as { code?: unknown }).code === 'ERR_JWT_EXPIRED';
    throw new AuthError(expired ? 'token_expired' : 'unauthenticated');
  }

  // O `sub` vira parâmetro de SQL. A query é parametrizada, mas checar o
  // formato aqui evita que um token válido mal-formado vire um uuid inválido
  // estourando lá no banco.
  if (!sub || !UUID.test(sub)) throw new AuthError('unauthenticated');
  return sub;
}
