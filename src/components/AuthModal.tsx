import { useState } from 'react';
import { X } from 'lucide-react';
import { authClient } from '../auth/client';

interface Props {
  open: boolean;
  onClose: () => void;
}

/**
 * Mapeia códigos de erro do Better Auth para mensagens de tela em pt-BR.
 * Sempre pelo `code` (estável), nunca pela `message` (inglês, muda entre
 * versões). Código desconhecido cai na mensagem genérica.
 */
function friendlyError(code: string | undefined): string {
  switch (code) {
    case 'INVALID_EMAIL_OR_PASSWORD': return 'E-mail ou senha incorretos.';
    case 'USER_ALREADY_EXISTS':       return 'Já existe uma conta com esse e-mail. Tente entrar.';
    case 'PASSWORD_TOO_SHORT':        return 'A senha precisa de pelo menos 8 caracteres.';
    case 'INVALID_EMAIL':             return 'Esse e-mail não parece válido.';
    default: return 'Não deu certo agora. Tente de novo em instantes.';
  }
}

export default function AuthModal({ open, onClose }: Props) {
  const [mode, setMode] = useState<'entrar' | 'criar'>('entrar');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open || !authClient) return null;
  const auth = authClient;

  function switchMode(next: 'entrar' | 'criar') {
    setMode(next);
    setError(null);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const result =
      mode === 'criar'
        ? // `name` é obrigatório no Better Auth; sem mais um campo obrigatório
          // na tela, quem não preencher usa o próprio e-mail como nome.
          await auth.signUp.email({ name: name.trim() || email, email, password })
        : await auth.signIn.email({ email, password });
    setBusy(false);
    if (result.error) {
      setError(friendlyError(result.error.code));
      return;
    }
    // Sucesso só fecha: o header está inscrito via useSession() e se atualiza
    // sozinho. O modal não guarda nem repassa sessão nenhuma.
    onClose();
  }

  const inputCls =
    'w-full bg-stone-800 border border-stone-600 rounded px-3 py-2 text-sm text-stone-100 ' +
    'placeholder-stone-500 focus:outline-none focus:border-amber-500';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-stone-900 border border-stone-700 rounded-lg w-full max-w-sm p-5"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-amber-200 font-semibold">
            {mode === 'entrar' ? 'Entrar' : 'Criar conta'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="text-stone-400 hover:text-stone-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex gap-1 mb-4 bg-stone-800 rounded p-1 text-sm">
          <button
            onClick={() => switchMode('entrar')}
            className={`flex-1 py-1.5 rounded transition-colors ${
              mode === 'entrar' ? 'bg-stone-700 text-amber-200' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Entrar
          </button>
          <button
            onClick={() => switchMode('criar')}
            className={`flex-1 py-1.5 rounded transition-colors ${
              mode === 'criar' ? 'bg-stone-700 text-amber-200' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Criar conta
          </button>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-3">
          {mode === 'criar' && (
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Nome (opcional)"
              autoComplete="name"
              className={inputCls}
            />
          )}
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="E-mail"
            required
            autoComplete="email"
            className={inputCls}
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Senha"
            required
            minLength={8}
            autoComplete={mode === 'criar' ? 'new-password' : 'current-password'}
            className={inputCls}
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:hover:bg-amber-600 text-stone-950 font-semibold rounded py-2 text-sm transition-colors"
          >
            {busy ? 'Aguarde...' : mode === 'entrar' ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        <p className="text-xs text-stone-500 mt-4">
          Login é opcional. Sem ele, seu progresso continua salvo neste navegador.
        </p>
      </div>
    </div>
  );
}
