import { useState, type FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, FalhaApi } from '../lib/api';
import { useSessao } from '../lib/contexto';
import { Aviso } from '../componentes/basicos';

export function Login() {
  const { entrar } = useSessao();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const { data: estado } = useQuery({
    queryKey: ['auth-status'],
    queryFn: () => api.get<{ semUsuarios: boolean }>('/api/auth/status'),
  });

  async function enviar(evento: FormEvent) {
    evento.preventDefault();
    setErro(null);
    setEnviando(true);
    try {
      await entrar(email, senha);
    } catch (falha) {
      setErro(falha instanceof FalhaApi ? falha.erro.mensagem : 'Não foi possível entrar.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 20,
        background:
          'radial-gradient(1100px 560px at 50% -10%, rgba(255,106,19,0.10) 0%, transparent 62%), var(--preto)',
      }}
    >
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 26 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: 'linear-gradient(140deg, var(--laranja) 0%, var(--laranja-escuro) 100%)',
              display: 'grid',
              placeItems: 'center',
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#fff',
              margin: '0 auto 14px',
            }}
          >
            E
          </div>
          <h1 style={{ fontSize: '1.35rem', letterSpacing: '0.1em' }}>EXPANSION ADS</h1>
          <p style={{ color: 'var(--texto-terciario)', fontSize: '0.8rem', marginTop: 4 }}>
            Central de Inteligência e Gestão de Tráfego
          </p>
        </div>

        <div className="card">
          <div className="card__corpo">
            {estado?.semUsuarios ? (
              <Aviso tipo="alerta" titulo="Nenhum usuário cadastrado">
                Crie o primeiro acesso no servidor:
                <pre
                  style={{
                    marginTop: 8,
                    fontSize: '0.72rem',
                    background: 'var(--preto)',
                    padding: 10,
                    borderRadius: 8,
                    overflowX: 'auto',
                  }}
                >
                  EXPANSION_USER_PASSWORD=&apos;sua-senha&apos; npm run user:create \{'\n'}
                  {'  '}--email voce@agencia.com --nome &quot;Seu Nome&quot;
                </pre>
              </Aviso>
            ) : (
              <form onSubmit={enviar}>
                <div className="campo">
                  <label className="campo__rotulo" htmlFor="email">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
                <div className="campo">
                  <label className="campo__rotulo" htmlFor="senha">
                    Senha
                  </label>
                  <input
                    id="senha"
                    type="password"
                    autoComplete="current-password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                </div>

                {erro && (
                  <div style={{ marginBottom: 14 }}>
                    <Aviso tipo="bloqueio">{erro}</Aviso>
                  </div>
                )}

                <button
                  type="submit"
                  className="botao botao--primario"
                  style={{ width: '100%' }}
                  disabled={enviando}
                >
                  {enviando ? 'Entrando…' : 'Entrar'}
                </button>
              </form>
            )}
          </div>
        </div>

        <p
          style={{
            textAlign: 'center',
            marginTop: 16,
            fontSize: '0.72rem',
            color: 'var(--texto-terciario)',
            lineHeight: 1.6,
          }}
        >
          O token da Meta fica no servidor e nunca chega ao navegador.
        </p>
      </div>
    </div>
  );
}
