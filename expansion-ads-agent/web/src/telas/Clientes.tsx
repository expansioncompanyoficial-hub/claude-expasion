import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useCliente, useSessao } from '../lib/contexto';
import { dataCurta, moeda } from '../lib/formato';
import { Aviso, Card, ErroBloco, Esqueleto, Indicador, Selo, Vazio } from '../componentes/basicos';
import { BarraProporcao } from '../componentes/Graficos';
import type { Cliente } from '../lib/tipos';

export function Clientes() {
  const { clientes, carregando } = useCliente();
  const { ehAdmin } = useSessao();

  return (
    <div className="pagina">
      <div className="pagina__cabecalho">
        <div className="pagina__titulo-bloco">
          <h1>Clientes</h1>
          <p className="pagina__sub">
            Somente contas cadastradas operam. Cada cliente está travada na própria conta de anúncios.
          </p>
        </div>
        {ehAdmin && (
          <Link to="/clientes/novo" className="botao botao--primario">
            + Cadastrar cliente
          </Link>
        )}
      </div>

      {carregando ? (
        <Card>
          <Esqueleto altura={140} />
        </Card>
      ) : clientes.length === 0 ? (
        <Card>
          <Vazio
            icone="◍"
            titulo="Nenhuma cliente cadastrada"
            acao={
              ehAdmin ? (
                <Link to="/clientes/novo" className="botao botao--primario">
                  Cadastrar a primeira
                </Link>
              ) : undefined
            }
          >
            O cadastro busca conta, Página, Instagram e pixel direto da Meta — você escolhe de uma
            lista em vez de procurar ID na interface do Gerenciador.
          </Vazio>
        </Card>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 14,
          }}
        >
          {clientes.map((c) => (
            <CartaoCliente key={c.id} cliente={c} />
          ))}
        </div>
      )}
    </div>
  );
}

function CartaoCliente({ cliente }: { cliente: Cliente }) {
  const iniciais = cliente.nome
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

  return (
    <Link to={`/clientes/${cliente.id}`} style={{ color: 'inherit' }}>
      <div className="card" style={{ height: '100%' }}>
        <div className="card__corpo">
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 11,
                background: 'linear-gradient(140deg, var(--grafite-600), var(--grafite-700))',
                border: '1px solid var(--borda)',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 700,
                fontSize: '0.9rem',
                color: 'var(--laranja)',
                flexShrink: 0,
              }}
            >
              {iniciais}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 650, fontSize: '0.95rem' }}>{cliente.nome}</div>
              <div className="mono" style={{ fontSize: '0.72rem' }}>
                {cliente.conta}
              </div>
            </div>
            <Selo tom={cliente.status === 'active' ? 'sucesso' : 'neutro'} ponto>
              {cliente.status === 'active' ? 'Ativa' : 'Inativa'}
            </Selo>
          </div>

          {cliente.exemplo && (
            <div style={{ marginTop: 11 }}>
              <span className="faixa-demo">Demonstração</span>
            </div>
          )}

          <div style={{ marginTop: 14 }}>
            <BarraProporcao
              valor={0}
              maximo={cliente.limites.diarioCents}
              rotulo={`Limite diário · ${moeda(cliente.limites.diarioCents, cliente.moeda)}`}
            />
          </div>

          <div
            style={{
              marginTop: 13,
              display: 'flex',
              gap: 14,
              fontSize: '0.76rem',
              color: 'var(--texto-secundario)',
            }}
          >
            <span>
              <strong style={{ color: 'var(--texto)' }}>{cliente.campanhas?.ativas ?? 0}</strong>{' '}
              ativas
            </span>
            <span>
              <strong style={{ color: 'var(--texto)' }}>{cliente.campanhas?.total ?? 0}</strong>{' '}
              no total
            </span>
            <span>{cliente.moeda}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface Detalhe {
  cliente: Cliente;
  brand: string | null;
  offers: string | null;
  campanhas: Array<{
    id: string;
    nome: string;
    estado: string;
    objetivo: string;
    metaId: string | null;
    criadaEm: string;
  }>;
}

interface Ativos {
  ok: boolean;
  credencialConfigurada: boolean;
  problemas: string[];
  contaVisivel: boolean | null;
  ativos: {
    conta: { id: string; nome: string | null; moeda: string | null; fuso: string | null } | null;
    pixels: Array<{ id: string; nome: string | null }>;
    instagram: Array<{ id: string; usuario: string | null }>;
  };
}

export function ClienteDetalhe() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['cliente', id],
    queryFn: () => api.get<Detalhe>(`/api/clients/${id}`),
    enabled: Boolean(id),
  });

  const { data: ativos, isLoading: carregandoAtivos } = useQuery({
    queryKey: ['cliente-ativos', id],
    queryFn: () => api.get<Ativos>(`/api/clients/${id}/assets`),
    enabled: Boolean(id),
  });

  if (error) return <div className="pagina"><ErroBloco erro={error} /></div>;
  if (isLoading || !data)
    return (
      <div className="pagina">
        <Esqueleto altura={190} />
      </div>
    );

  const c = data.cliente;

  return (
    <div className="pagina">
      <div className="trilha">
        <Link to="/clientes">Clientes</Link>
        <span>/</span>
        <span>{c.nome}</span>
      </div>

      <div className="pagina__cabecalho">
        <div className="pagina__titulo-bloco">
          <h1>{c.nome}</h1>
          <p className="pagina__sub mono">{c.conta}</p>
        </div>
        <Selo tom={c.status === 'active' ? 'sucesso' : 'neutro'} ponto>
          {c.status === 'active' ? 'Ativa' : 'Inativa'}
        </Selo>
      </div>

      {c.exemplo && (
        <div className="secao">
          <Aviso tipo="alerta" titulo="Cadastro de exemplo">
            Esta cliente veio de <code>config.example.json</code>. Serve para dry-run e testes, mas o
            sistema recusa criação real com ela. Crie <code>clients/{c.id}/config.json</code>.
          </Aviso>
        </div>
      )}

      <div className="secao">
        <div className="secao__titulo">Políticas de orçamento</div>
        <div className="grade-indicadores">
          <Indicador
            rotulo="Limite diário"
            valor={moeda(c.limites.diarioCents, c.moeda)}
            nota="Teto por campanha e por dia"
            tom="destaque"
          />
          <Indicador
            rotulo="Limite mensal"
            valor={moeda(c.limites.mensalCents, c.moeda)}
            nota="Projeção de 30 dias não pode passar"
          />
          <Indicador rotulo="Moeda" valor={c.moeda} nota={c.fusoHorario} />
          <Indicador
            rotulo="Modelos permitidos"
            valor={c.modelosPermitidos.length}
            nota={c.modelosPermitidos.join(', ')}
          />
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 16,
        }}
      >
        <Card titulo="Ativos da Meta">
          {carregandoAtivos ? (
            <Esqueleto altura={120} />
          ) : !ativos?.credencialConfigurada ? (
            <Aviso tipo="alerta" titulo="Sem credencial no servidor">
              Os ativos cadastrados não puderam ser conferidos na Meta. O que está abaixo é o
              cadastro local, não uma confirmação.
            </Aviso>
          ) : ativos.problemas.length > 0 ? (
            <Aviso tipo="alerta" titulo="Ativos com pendência">
              <ul style={{ margin: '4px 0 0', paddingLeft: 18 }}>
                {ativos.problemas.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </Aviso>
          ) : (
            <Aviso tipo="sucesso" titulo="Ativos conferidos na Meta">
              A conta cadastrada é visível pelo token e responde.
            </Aviso>
          )}

          <dl style={{ margin: '15px 0 0', display: 'grid', gap: 10 }}>
            <LinhaAtivo rotulo="Business Manager" valor={c.businessId} />
            <LinhaAtivo rotulo="Conta de anúncios" valor={c.conta} />
            <LinhaAtivo
              rotulo="Página"
              valor={c.pageId}
              nota={ativos?.ativos.conta?.nome ?? undefined}
            />
            <LinhaAtivo
              rotulo="Instagram"
              valor={c.instagramId}
              nota={ativos?.ativos.instagram[0]?.usuario ? `@${ativos.ativos.instagram[0].usuario}` : undefined}
            />
            <LinhaAtivo
              rotulo="Pixel / dataset"
              valor={c.pixelId}
              nota={ativos?.ativos.pixels.length ? `${ativos.ativos.pixels.length} na conta` : undefined}
            />
            <LinhaAtivo rotulo="WhatsApp" valor={c.whatsapp} />
            <LinhaAtivo rotulo="Domínio" valor={c.dominio} />
          </dl>

          {c.urlsPermitidas.length > 0 && (
            <div style={{ marginTop: 14 }}>
              <div className="secao__titulo">URLs autorizadas</div>
              {c.urlsPermitidas.map((u) => (
                <div key={u} className="mono" style={{ fontSize: '0.74rem' }}>
                  {u}
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card titulo={`Campanhas (${data.campanhas.length})`}>
          {data.campanhas.length === 0 ? (
            <Vazio icone="≡" titulo="Nenhuma campanha ainda">
              Use “Nova campanha” para montar a primeira.
            </Vazio>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {data.campanhas.slice(0, 10).map((camp) => (
                <Link
                  key={camp.id}
                  to={`/campanhas/${camp.id}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 10,
                    padding: '9px 11px',
                    background: 'var(--grafite-800)',
                    borderRadius: 'var(--raio-sm)',
                    color: 'var(--texto)',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {camp.nome}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--texto-terciario)' }}>
                      {dataCurta(camp.criadaEm)}
                    </div>
                  </div>
                  <Selo tom="neutro">{camp.estado}</Selo>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>

      {(data.brand || data.offers) && (
        <div className="secao" style={{ marginTop: 16 }}>
          <Card titulo="Contexto da marca">
            <pre
              style={{
                whiteSpace: 'pre-wrap',
                fontFamily: 'inherit',
                fontSize: '0.83rem',
                color: 'var(--texto-secundario)',
                margin: 0,
                lineHeight: 1.65,
              }}
            >
              {[data.brand, data.offers].filter(Boolean).join('\n\n———\n\n')}
            </pre>
          </Card>
        </div>
      )}
    </div>
  );
}

function LinhaAtivo({
  rotulo,
  valor,
  nota,
}: {
  rotulo: string;
  valor: string | null;
  nota?: string;
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: '0.82rem' }}>
      <dt style={{ color: 'var(--texto-terciario)' }}>{rotulo}</dt>
      <dd style={{ margin: 0, textAlign: 'right', minWidth: 0 }}>
        {valor ? (
          <span className="mono" style={{ color: 'var(--texto)' }}>
            {valor}
          </span>
        ) : (
          <span style={{ color: 'var(--texto-terciario)' }}>não cadastrado</span>
        )}
        {nota && (
          <div style={{ fontSize: '0.7rem', color: 'var(--texto-terciario)' }}>{nota}</div>
        )}
      </dd>
    </div>
  );
}
