import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useEstadoMeta, useSessao } from '../lib/contexto';
import { Aviso, Card, ErroBloco, Esqueleto, Indicador, Selo, Vazio } from '../componentes/basicos';

export function Configuracoes() {
  const { ehAdmin, usuario } = useSessao();
  const { data: meta } = useEstadoMeta();

  const { data, isLoading, error } = useQuery({
    queryKey: ['config'],
    queryFn: () =>
      api.get<{
        ambiente: Record<string, unknown>;
        politicas: Record<string, unknown>;
        usuarios: Array<{ id: string; nome: string; email: string; papel: string; ativo: boolean }>;
      }>('/api/config'),
    enabled: ehAdmin,
  });

  return (
    <div className="pagina">
      <div className="pagina__cabecalho">
        <div className="pagina__titulo-bloco">
          <h1>Configurações</h1>
          <p className="pagina__sub">Ambiente, políticas e acessos. Nenhum segredo é exibido aqui.</p>
        </div>
      </div>

      <div className="secao">
        <div className="grade-indicadores">
          <Indicador
            rotulo="Modo de execução"
            valor={meta?.dryRun ? 'Dry-run' : 'Produção'}
            nota={meta?.dryRun ? 'Nada é criado na Meta' : 'Criação real habilitada'}
            tom={meta?.dryRun ? 'atencao' : 'erro'}
          />
          <Indicador rotulo="Graph API" valor={meta?.versaoApi ?? '—'} />
          <Indicador
            rotulo="Credencial da Meta"
            valor={meta?.credencialConfigurada ? 'Configurada' : 'Ausente'}
            nota={meta?.impressaoDigital}
            tom={meta?.credencialConfigurada ? 'sucesso' : 'atencao'}
          />
          <Indicador rotulo="Seu papel" valor={usuario?.papel ?? '—'} nota={usuario?.email} />
        </div>
      </div>

      <div className="secao">
        <Aviso tipo="info" titulo="Onde o token vive">
          O <code>META_ACCESS_TOKEN</code> fica no <code>.env</code> do servidor e é usado apenas
          pelo backend. Esta tela mostra só a marca dele ({meta?.impressaoDigital ?? '—'}) — o valor
          nunca é enviado ao navegador.
        </Aviso>
      </div>

      {!ehAdmin ? (
        <Card>
          <Vazio icone="⚙" titulo="Acesso restrito">
            Ver políticas e usuários exige o papel <strong>admin</strong>.
          </Vazio>
        </Card>
      ) : error ? (
        <ErroBloco erro={error} />
      ) : isLoading || !data ? (
        <Card>
          <Esqueleto altura={140} />
        </Card>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
            gap: 16,
          }}
        >
          <Card titulo={`Usuários (${data.usuarios.length})`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {data.usuarios.map((u) => (
                <div
                  key={u.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 10,
                    padding: '9px 11px',
                    background: 'var(--grafite-800)',
                    borderRadius: 'var(--raio-sm)',
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{u.nome}</div>
                    <div style={{ fontSize: '0.73rem', color: 'var(--texto-terciario)' }}>
                      {u.email}
                    </div>
                  </div>
                  <Selo tom={u.ativo ? 'laranja' : 'neutro'}>{u.papel}</Selo>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 13, fontSize: '0.76rem', color: 'var(--texto-terciario)' }}>
              Novos acessos são criados no servidor com <code>npm run user:create</code>. Senhas
              ficam com hash scrypt em <code>users.json</code>, fora do git.
            </div>
          </Card>

          <Card titulo="Políticas ativas">
            <details className="detalhe-tecnico" open>
              <summary>Ver JSON completo</summary>
              <pre>{JSON.stringify(data.politicas, null, 2)}</pre>
            </details>
          </Card>
        </div>
      )}
    </div>
  );
}
