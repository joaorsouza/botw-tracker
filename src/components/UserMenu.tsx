import { useState } from 'react';
import type { authClient } from '../auth/client';

interface Props {
  /**
   * O client de auth, já garantidamente não-nulo: o App só monta este
   * componente dentro de `{authClient && ...}`, e o narrowing desse guard é
   * o que o compilador exige para aceitar a prop — a garantia é verificada,
   * não prometida.
   */
  auth: NonNullable<typeof authClient>;
  onLoginClick: () => void;
}

/**
 * Controle de conta no header: botão "Entrar" quando deslogado, inicial do
 * e-mail + menu com "Sair" quando logado.
 */
export default function UserMenu({ auth, onLoginClick }: Props) {
  const session = auth.useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  // Primeiro instante: o SDK ainda está conferindo o cookie de sessão.
  // Renderizar "Entrar" aqui faria o botão piscar pra quem já está logado.
  if (session.isPending) return null;

  if (!session.data) {
    return (
      <button
        onClick={onLoginClick}
        className="text-sm text-stone-400 hover:text-amber-200 border border-stone-700 hover:border-amber-700 rounded px-3 py-1 transition-colors"
      >
        Entrar
      </button>
    );
  }

  const { email, name } = session.data.user;

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(o => !o)}
        title={email}
        aria-label="Menu da conta"
        className="w-8 h-8 rounded-full bg-amber-700 hover:bg-amber-600 text-amber-100 font-semibold text-sm transition-colors"
      >
        {(name || email)[0].toUpperCase()}
      </button>
      {menuOpen && (
        <div className="absolute right-0 mt-2 z-40 bg-stone-900 border border-stone-700 rounded-lg shadow-lg min-w-48 py-1 text-left">
          <p className="px-3 py-2 text-xs text-stone-400 border-b border-stone-800 truncate">
            {email}
          </p>
          <button
            onClick={() => {
              void auth.signOut(); // useSession percebe e o header volta a "Entrar"
              setMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm text-stone-200 hover:bg-stone-800 transition-colors"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
