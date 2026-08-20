import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useCliente, useSessao } from '../lib/contexto';
import { dataHora, estadoDaCampanha, moeda } from '../lib/formato';
import { Aviso, Card, ErroBloco, Esqueleto, Indicador, Selo, Vazio } from '../componentes/basicos';
import type { Campanha } from '../lib/tipos';

export function Campanhas() {
  const { selecionada } = useCliente();
  const [filtroEstado, setFiltroEstado] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['campanhas', selecionada?.id, filtroEstado],
    queryFn: () =>
      api.get<{ campanhas: Campanha[] }>(
        `/api/campaigns?${selecionada ? `cliente=${selecionada.id}` : ''}${filtroEstado ? `&estado=${filtroEstado}` : ''}`,
      ),
  });

  const campanhas = data?.campanhas ?? [];

  return (
    <div className="pagina">
      <div className="pagina__cabecalho">
        <div className="pagina__titulo-bloco">
          <h1>Campanhas</h1>
          <p className="pagina__sub">
            {selecionada ? selecionada.nome : 'Todas as clientes'} · {campanhas.length} registrada(s)
          </p>
        </div>
        <div className="linha-flex">
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            style={{ width: 200 }}
            aria-label="Filtrar por estado"
          >
            <option value="">Todos os estados</option>
            <option value="VALIDATED">Validada</option>
            <option value="CREATED_PAUSED">Criada e pausada</option>
            <option value="WAITING_APPROVAL">Aguardando aprovação</option>
            <option value="APPROVED">Aprovada</option>
            <option value="ACTIVE">Ativa</option>
            <option value="PAUSED">Pausada</option>
            <option value="CREATION_FAILED">Falha na criação</option>
          </select>
          <Link to="/nova-campanha" className="botao botao--primario">
            + Nova campanha
          </Link>
        </div>
      </div>

      {error && <ErroBloco erro={error} />}

      <Card semCorpo>
        {isLoading ? (
          <div style={{ padding: 18 }}>
            <Esqueleto altura={150} />
          </div>
        ) : campanhas.length === 0 ? (
          <Vazio icone="≡" titulo="Nenhuma campanha">
            {filtroEstado
              ? 'Nenhuma campanha nesse estado.'
              : 'Monte a primeira campanha pelo assistente.'}
          </Vazio>
        ) : (
          <div className="tabela-envolucro">
            <table className="tabela">
              <thead>
                <tr>
                  <th>Campanha</th>
                  <th>Estado</th>
                  <th>Objetivo</th>
                  <th className="numero">Orçamento/dia</th>
                  <th>ID na Meta</th>
                  <th>Criada</th>
                </tr>
              </thead>
              <tbody>
                {campanhas.map((c) => {
                  const estado = estadoDaCampanha(c.estado);
                  return (
                    <tr key={c.id}>
                      <td>
                        <Link to={`/campanhas/${c.id}`} style={{ color: 'var(--texto)', fontWeight: 600 }}>
                          {c.nome}
                        </Link>
                        <div style={{ fontSize: '0.72rem', color: 'var(--texto-terciario)' }}>
                          {c.cliente} · {c.modelo}
                        </div>
                      </td>
                      <td>
                        <Selo tom={estado.tom}>{estado.texto}</Selo>
                        {c.dryRun && (
                          <span style={{ marginLeft: 6 }}>
                            <Selo tom="info">dry-run</Selo>
                          </span>
                        )}
                      </td>
                      <td style={{ fontSize: '0.78rem', color: 'var(--texto-secundario)' }}>
                        {c.objetivo}
                      </td>
                      <td className="numero">{moeda(c.orcamentoDiarioCents, c.moeda)}</td>
                      <td className="mono" style={{ fontSize: '0.72rem' }}>
                        {c.metaCampaignId ?? '—'}
                      </td>
                      <td style={{ fontSize: '0.76rem', color: 'var(--texto-secundario)' }}>
                        {dataHora(c.criadaEm)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

interface DetalheCampanha {
  campanha: Campanha;
  plano: unknown;
  conjuntos: Array<{
    id: string;
    nome: string;
    metaId: string | null;
    metaStatus: string | null;
    optimizationGoal: string;
    destino: string | null;
    orcamentoDiarioCents: number | null;
  }>;
  anuncios: Array<{ id: string; nome: string; metaId: string | null; metaStatus: string | null }>;
  criativos: Array<{
    id: string;
    arquivo: string | null;
    tipo: string;
    hash: string | null;
    metaCreativeId: string | null;
  }>;
  aprovacoes: Array<{
    id: string;
    status: string;
    por: string;
    em: string;
    expiraEm: string;
    orcamentoCents: number;
    consumidaEm: string | null;
    revogadaEm: string | null;
  }>;
  auditoria: Array<{
    id: string;
    ts: string;
    ator: string;
    ferramenta: string;
    resultado: string;
    estadoAntes: string | null;
    estadoDepois: string | null;
    dryRun: boolean;
  }>;
}

export function CampanhaDetalhe() {
  const { id } = useParams<{ id: string }>();
  const { podeGerir, podeOperar } = useSessao();
  const queryClient = useQueryClient();
  const [motivo, setMotivo] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['campanha', id],
    queryFn: () => api.get<DetalheCampanha>(`/api/campaigns/${id}`),
    enabled: Boolean(id),
  });

  const reconsultar = useMutation({
    mutationFn: () => api.post(`/api/campaigns/${id}/refresh`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['campanha', id] }),
  });

  const solicitar = useMutation({
    mutationFn: () => api.post(`/api/campaigns/${id}/request-approval`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['campanha', id] }),
  });

  const pausar = useMutation({
    mutationFn: () => api.post(`/api/campaigns/${id}/pause`, { motivo }),
    onSuccess: () => {
      setMotivo('');
      void queryClient.invalidateQueries({ queryKey: ['campanha', id] });
    },
  });

  if (error) return <div className="pagina"><ErroBloco erro={error} /></div>;
  if (isLoading || !data)
    return (
      <div className="pagina">
        <Esqueleto altura={200} />
      </div>
    );

  const c = data.campanha;
  const estado = estadoDaCampanha(c.estado);

  return (
    <div className="pagina">
      <div className="trilha">
        <Link to="/campanhas">Campanhas</Link>
        <span>/</span>
        <span>{c.nome}</span>
      </div>

      <div className="pagina__cabecalho">
        <div className="pagina__titulo-bloco">
          <h1>{c.nome}</h1>
          <p className="pagina__sub">
            {c.cliente} · {c.modelo} · {c.objetivo}
          </p>
        </div>
        <div className="linha-flex">
          <Selo tom={estado.tom} ponto>
            {estado.texto}
          </Selo>
          <button
            className="botao botao--pequeno"
            onClick={() => reconsultar.mutate()}
            disabled={reconsultar.isPending || !c.metaCampaignId}
          >
            {reconsultar.isPending ? 'Consultando…' : 'Consultar a Meta'}
          </button>
          {podeOperar && c.estado === 'CREATED_PAUSED' && (
            <button
              className="botao botao--primario botao--pequeno"
              onClick={() => solicitar.mutate()}
              disabled={solicitar.isPending}
            >
              Solicitar aprovação
            </button>
          )}
        </div>
      </div>

      {c.ultimoErro && (
        <div className="secao">
          <Aviso tipo="bloqueio" titulo="Último erro registrado">
            {c.ultimoErro}
          </Aviso>
        </div>
      )}

      {reconsultar.error && <div className="secao"><ErroBloco erro={reconsultar.error} /></div>}
      {solicitar.error && <div className="secao"><ErroBloco erro={solicitar.error} /></div>}

      <div className="secao">
        <div className="grade-indicadores">
          <Indicador
            rotulo="Orçamento diário"
            valor={moeda(c.orcamentoDiarioCents, c.moeda)}
            tom="destaque"
          />
          <Indicador rotulo="Conjuntos" valor={data.conjuntos.length} />
          <Indicador rotulo="Anúncios" valor={data.anuncios.length} />
          <Indicador rotulo="Criativos" valor={data.criativos.length} />
          <Indicador
            rotulo="Status na Meta"
            valor={c.metaStatus ?? '—'}
            nota={c.metaCampaignId ? `ID ${c.metaCampaignId}` : 'ainda não criada'}
          />
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 16,
        }}
      >
        <Card titulo="Estrutura">
          <div style={{ fontSize: '0.83rem' }}>
            <div style={{ fontWeight: 650, marginBottom: 8 }}>
              Campanha <span className="mono">{c.metaCampaignId ?? '(sem ID)'}</span>
            </div>
            {data.conjuntos.map((cj) => (
              <div key={cj.id} style={{ marginLeft: 14, marginBottom: 12 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ color: 'var(--texto-terciario)' }}>└</span>
                  <span style={{ fontWeight: 600 }}>{cj.nome}</span>
                  <Selo tom={cj.metaStatus === 'PAUSED' ? 'atencao' : 'neutro'}>
                    {cj.metaStatus ?? 'não criado'}
                  </Selo>
                </div>
                <div
                  style={{
                    marginLeft: 18,
                    fontSize: '0.74rem',
                    color: 'var(--texto-terciario)',
                  }}
                >
                  {cj.optimizationGoal} · {cj.destino ?? '—'} ·{' '}
                  {moeda(cj.orcamentoDiarioCents, c.moeda)}/dia
                </div>
                {data.anuncios.map((a) => (
                  <div
                    key={a.id}
                    style={{ marginLeft: 18, marginTop: 6, display: 'flex', gap: 8, alignItems: 'center' }}
                  >
                    <span style={{ color: 'var(--texto-terciario)' }}>└</span>
                    <span style={{ fontSize: '0.79rem' }}>{a.nome}</span>
                    <Selo tom={a.metaStatus === 'PAUSED' ? 'atencao' : 'neutro'}>
                      {a.metaStatus ?? 'não criado'}
                    </Selo>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>

        <Card titulo="Aprovações">
          {data.aprovacoes.length === 0 ? (
            <Vazio icone="✓" titulo="Nenhuma aprovação">
              Uma campanha só é ativada com aprovação registrada.
            </Vazio>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {data.aprovacoes.map((a) => (
                <div
                  key={a.id}
                  style={{
                    padding: 11,
                    background: 'var(--grafite-800)',
                    borderRadius: 'var(--raio-sm)',
                    fontSize: '0.8rem',
                  }}
                >
                  <div className="linha-flex" style={{ justifyContent: 'space-between' }}>
                    <Selo
                      tom={
                        a.revogadaEm
                          ? 'erro'
                          : a.consumidaEm
                            ? 'neutro'
                            : a.status === 'valida'
                              ? 'sucesso'
                              : 'atencao'
                      }
                    >
                      {a.revogadaEm ? 'revogada' : a.consumidaEm ? 'usada' : a.status}
                    </Selo>
                    <span style={{ color: 'var(--texto-terciario)' }}>
                      {moeda(a.orcamentoCents, c.moeda)}
                    </span>
                  </div>
                  <div style={{ marginTop: 6, color: 'var(--texto-secundario)' }}>{a.por}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--texto-terciario)' }}>
                    Aprovada {dataHora(a.em)} · expira {dataHora(a.expiraEm)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {podeGerir && ['ACTIVE', 'CREATED_PAUSED', 'APPROVED'].includes(c.estado) && (
        <div className="secao" style={{ marginTop: 16 }}>
          <Card titulo="Pausar campanha">
            <div className="linha-flex" style={{ alignItems: 'flex-end' }}>
              <div style={{ flex: 1, minWidth: 220 }}>
                <label className="campo__rotulo" htmlFor="motivo-pausa">
                  Motivo da pausa
                </label>
                <input
                  id="motivo-pausa"
                  type="text"
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  placeholder="Ex.: CPL acima da meta por três dias"
                />
              </div>
              <button
                className="botao botao--perigo"
                onClick={() => pausar.mutate()}
                disabled={motivo.trim().length < 3 || pausar.isPending}
              >
                {pausar.isPending ? 'Pausando…' : 'Pausar na Meta'}
              </button>
            </div>
            {pausar.error && (
              <div style={{ marginTop: 12 }}>
                <ErroBloco erro={pausar.error} />
              </div>
            )}
          </Card>
        </div>
      )}

      <div className="secao" style={{ marginTop: 16 }}>
        <Card titulo="Histórico de auditoria">
          {data.auditoria.length === 0 ? (
            <Vazio icone="⎘" titulo="Sem registros" />
          ) : (
            <div className="tabela-envolucro">
              <table className="tabela">
                <thead>
                  <tr>
                    <th>Quando</th>
                    <th>Quem</th>
                    <th>Ferramenta</th>
                    <th>Resultado</th>
                    <th>Transição</th>
                  </tr>
                </thead>
                <tbody>
                  {data.auditoria.map((l) => (
                    <tr key={l.id}>
                      <td style={{ whiteSpace: 'nowrap' }}>{dataHora(l.ts)}</td>
                      <td>{l.ator}</td>
                      <td className="mono" style={{ fontSize: '0.74rem' }}>
                        {l.ferramenta}
                      </td>
                      <td>
                        <Selo
                          tom={
                            l.resultado === 'error'
                              ? 'erro'
                              : l.resultado === 'blocked'
                                ? 'atencao'
                                : l.resultado === 'dry_run'
                                  ? 'info'
                                  : 'sucesso'
                          }
                        >
                          {l.resultado}
                        </Selo>
                      </td>
                      <td style={{ fontSize: '0.74rem', color: 'var(--texto-secundario)' }}>
                        {l.estadoAntes ?? '—'} → {l.estadoDepois ?? '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
