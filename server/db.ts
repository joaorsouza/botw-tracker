import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  // Falha no cold start com mensagem acionável, em vez de um erro obscuro
  // na primeira query. Aparece no log da função na Vercel.
  throw new Error(
    'DATABASE_URL não está definida. Configure em Vercel → Settings → ' +
    'Environment Variables com a string *pooled* da branch Neon do ambiente.'
  );
}

/**
 * Cliente SQL do Neon, sobre HTTP.
 *
 * HTTP e não TCP porque as queries daqui são one-shot (um SELECT no GET, uma
 * statement no PUT) e o compute do Neon dorme após 5 min sem uso — ou seja,
 * quase toda invocação é cold start. HTTP faz ~3 round-trips contra ~8 do
 * TCP, e não exige gerenciar ciclo de vida de pool, que é a maior fonte de
 * bug em ambiente serverless (a função pode ser congelada a qualquer momento).
 *
 * Usar sempre a connection string *pooled* — host com `-pooler` no meio.
 */
export const sql = neon(DATABASE_URL);
