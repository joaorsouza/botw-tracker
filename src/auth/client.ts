import { createAuthClient } from '@neondatabase/auth';
import { BetterAuthReactAdapter } from '@neondatabase/auth/react/adapters';

/**
 * URL pública do Neon Auth (ver .env.example). Pode faltar — em fork local,
 * preview mal configurado etc. Login é opcional por arquitetura: sem a URL o
 * app funciona 100% offline, só não mostra o botão de entrar. Por isso NADA
 * aqui pode lançar no import — um throw aqui derrubaria o app inteiro.
 */
const AUTH_URL: string | undefined = import.meta.env.VITE_NEON_AUTH_URL;

/** null = login indisponível neste build; a UI esconde o controle. */
export const authClient = AUTH_URL
  ? createAuthClient(AUTH_URL, { adapter: BetterAuthReactAdapter() })
  : null;
