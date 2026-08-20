import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useCliente } from '../lib/contexto';
import { dataHora, moeda, numero, percentual } from '../lib/formato';
import {
  Aviso,
  Card,
  ErroBloco,
  EsqueletoIndicadores,
  Indicador,
  Selo,
  Vazio,
} from '../componentes/basicos';
import { GraficoBarras } from '../componentes/Graficos';

const PERIODOS = [
  { id: 'today', rotulo: 'Hoje' },
  { id: 'yesterday', rotulo: 'Ontem' },
  { id: 'last-7-days', rotulo: '7 dias' },
  { id: 'last-30-days', rotulo: '30 dias' },
  { id: 'this-month', rotulo: 'Mês atual' },
];

interface RespostaVisao {
  ok: boolean;
  periodo: string;
  credencialConfigurada: boolean;
  dryRun: boolean;
  campanhas: {
    total: number;
    porEstado: Record<string, number>;
    ativas: number;
    pausadas: number;
    comErro: number;
  };
  aguardandoAprovacao: Array<{
    id: string;
    nome: string;
    cliente: string;
    orcamentoCents: number | null;
    moeda: string;
  }>;
  emAtencao: Array<{ id: string; nome: string; cliente: string; estado: string; erro: string | null }>;
  porCliente: Array<{
    cliente: string;
    nome: string;
    moeda: string;
    disponivel: boolean;
    motivo: string | null;
    metricas: Record<string, number | null> | null;
  }>;
  recomendacoes: Array<{ id: string; cliente: string; acao: string; confianca: string }>;
  ultimasAcoes: Array<{
    id: string;
    ts: string;
    ator: string;
    ferramenta: string;
    cliente: string | null;
    resultado: string;
    dryRun: boolean;
  }>;
}

export function VisaoGeral() {
  const { selecionada } = useCliente();
  const [periodo, setPeriodo] = useState('last-7-days');

  const { data, isLoading, error } = useQuery({
    queryKey: ['visao-geral', selecionada?.id, periodo],
    queryFn: () =>
      api.get<RespostaVisao>(
        `/api/overview?periodo=${periodo}${selecionada ? `&cliente=${selecionada.id}` : ''}`,
      ),
  });

  if (error) {
    return (
      <div className="pagina">
        <ErroBloco erro={error} />
      </div>
    );
  }

  const semCredencial = data && !data.credencialConfigurada;
  const metricasCliente = data?.porCliente.find((c) => c.cliente === selecionada?.id);
  const m = metricasCliente?.metricas ?? null;
  // O motivo completo já aparece no aviso do topo. Repetir a mesma frase em
  // seis cartões vira ruído — aqui basta a marca curta.
  const indisponivel = metricasCliente?.disponivel === false;
  const notaCurta = indisponivel
    ? data?.credencialConfigurada
      ? 'Meta não respondeu'
      : 'sem credencial'
    : null;

  return (
    <div className="pagina">
      <div className="pagina__cabecalho">
        <div className="pagina__titulo-bloco">
          <h1>Visão geral</h1>
          <p className="pagina__sub">
            {selecionada ? selecionada.nome : 'Todas as clientes'} · dados do período selecionado
          </p>
        </div>
        <div className="linha-flex">
          {PERIODOS.map((p) => (
            <button
              key={p.id}
              className={`botao botao--pequeno${periodo === p.id ? ' botao--primario' : ' botao--fantasma'}`}
              onClick={() => setPeriodo(p.id)}
            >
              {p.rotulo}
            </button>
          ))}
        </div>
      </div>

      {data?.dryRun && (
        <div className="secao">
          <Aviso tipo="info" titulo="Dry-run ligado">
            Nada é criado na Meta enquanto <code>DRY_RUN=true</code>. As campanhas ficam registradas
            aqui como planejamento validado.
          </Aviso>
        </div>
      )}

      {semCredencial && (
        <div className="secao">
          <Aviso tipo="alerta" titulo="Métricas da Meta indisponíveis">
            O servidor está sem <code>META_ACCESS_TOKEN</code>. Os números de campanha continuam
            disponíveis, mas investimento, alcance e resultados vêm da Meta e não podem ser
            mostrados. Nada é estimado no lugar.
          </Aviso>
        </div>
      )}

      <div className="secao">
        <div className="secao__titulo">Operação</div>
        {isLoading ? (
          <EsqueletoIndicadores quantidade={5} />
        ) : (
          <div className="grade-indicadores">
            <Indicador
              rotulo="Campanhas ativas"
              valor={numero(data?.campanhas.ativas)}
              tom={data && data.campanhas.ativas > 0 ? 'sucesso' : undefined}
            />
            <Indicador rotulo="Pausadas" valor={numero(data?.campanhas.pausadas)} />
            <Indicador
              rotulo="Aguardando aprovação"
              valor={numero(data?.aguardandoAprovacao.length)}
              tom={data && data.aguardandoAprovacao.length > 0 ? 'atencao' : undefined}
            />
            <Indicador
              rotulo="Com erro"
              valor={numero(data?.campanhas.comErro)}
              tom={data && data.campanhas.comErro > 0 ? 'erro' : undefined}
            />
            <Indicador rotulo="Total registrado" valor={numero(data?.campanhas.total)} />
          </div>
        )}
      </div>

      <div className="secao">
        <div className="secao__titulo">
          Desempenho {selecionada ? `— ${selecionada.nome}` : ''}
        </div>
        {isLoading ? (
          <EsqueletoIndicadores quantidade={6} />
        ) : (
          <div className="grade-indicadores">
            <Indicador
              rotulo="Investimento"
              tom="destaque"
              valor={moeda(m?.investimentoCents ?? null, selecionada?.moeda)}
              {...(notaCurta ? { indisponivel: notaCurta } : {})}
            />
            <Indicador
              rotulo="Alcance"
              valor={numero(m?.alcance ?? null)}
              {...(notaCurta ? { indisponivel: notaCurta } : {})}
            />
            <Indicador
              rotulo="Impressões"
              valor={numero(m?.impressoes ?? null)}
              {...(notaCurta ? { indisponivel: notaCurta } : {})}
            />
            <Indicador
              rotulo="Frequência"
              valor={numero(m?.frequencia ?? null, 2)}
              {...(notaCurta ? { indisponivel: notaCurta } : {})}
            />
            <Indicador
              rotulo="CTR"
              valor={percentual(m?.ctr ?? null)}
              {...(notaCurta ? { indisponivel: notaCurta } : {})}
            />
            <Indicador
              rotulo="CPM"
              valor={moeda(m?.cpmCents ?? null, selecionada?.moeda)}
              {...(notaCurta ? { indisponivel: notaCurta } : {})}
            />
          </div>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
          gap: 16,
        }}
      >
        <Card titulo="Investimento por cliente">
          {data && data.porCliente.some((c) => c.disponivel) ? (
            <GraficoBarras
              dados={data.porCliente.map((c) => ({
                rotulo: c.nome.slice(0, 12),
                valor: (c.metricas?.investimentoCents ?? 0) / 100,
              }))}
              formatar={(v) => moeda(v * 100)}
            />
          ) : (
            <Vazio icone="◐" titulo="Sem dados de investimento">
              {data?.credencialConfigurada
                ? 'Nenhuma campanha entregou no período selecionado.'
                : 'Configure META_ACCESS_TOKEN no servidor para ver investimento real.'}
            </Vazio>
          )}
        </Card>

        <Card
          titulo="Aprovações pendentes"
          acoes={
            <Link to="/aprovacoes" className="botao botao--pequeno botao--fantasma">
              Ver todas
            </Link>
          }
        >
          {data && data.aguardandoAprovacao.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {data.aguardandoAprovacao.slice(0, 5).map((c) => (
                <Link
                  key={c.id}
                  to={`/campanhas/${c.id}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 10,
                    padding: '9px 11px',
                    background: 'var(--grafite-800)',
                    borderRadius: 'var(--raio-sm)',
                    color: 'var(--texto)',
                  }}
                >
                  <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {c.nome}
                  </span>
                  <Selo tom="atencao">{moeda(c.orcamentoCents, c.moeda)}/dia</Selo>
                </Link>
              ))}
            </div>
          ) : (
            <Vazio icone="✓" titulo="Nada aguardando" >
              Nenhuma campanha esperando aprovação.
            </Vazio>
          )}
        </Card>

        <Card titulo="Campanhas que exigem atenção">
          {data && data.emAtencao.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {data.emAtencao.slice(0, 5).map((c) => (
                <Link
                  key={c.id}
                  to={`/campanhas/${c.id}`}
                  style={{
                    padding: '9px 11px',
                    background: 'var(--erro-vidro)',
                    border: '1px solid rgba(255,77,79,0.24)',
                    borderRadius: 'var(--raio-sm)',
                    color: 'var(--texto)',
                    display: 'block',
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{c.nome}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--texto-secundario)' }}>
                    {c.estado}
                    {c.erro ? ` · ${c.erro.slice(0, 70)}` : ''}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <Vazio icone="✓" titulo="Nenhum erro">
              Nenhuma campanha em estado de falha.
            </Vazio>
          )}
        </Card>

        <Card
          titulo="Últimas ações da plataforma"
          acoes={
            <Link to="/auditoria" className="botao botao--pequeno botao--fantasma">
              Auditoria
            </Link>
          }
        >
          {data && data.ultimasAcoes.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {data.ultimasAcoes.slice(0, 7).map((a) => (
                <div
                  key={a.id}
                  style={{
                    display: 'flex',
                    gap: 9,
                    alignItems: 'center',
                    fontSize: '0.8rem',
                    paddingBottom: 7,
                    borderBottom: '1px solid var(--borda-suave)',
                  }}
                >
                  <Selo
                    tom={
                      a.resultado === 'error'
                        ? 'erro'
                        : a.resultado === 'blocked'
                          ? 'atencao'
                          : a.resultado === 'dry_run'
                            ? 'info'
                            : 'sucesso'
                    }
                  >
                    {a.resultado}
                  </Selo>
                  <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {a.ferramenta}
                  </span>
                  <span style={{ color: 'var(--texto-terciario)', whiteSpace: 'nowrap' }}>
                    {dataHora(a.ts, selecionada?.fusoHorario)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <Vazio icone="⎘" titulo="Nenhuma ação ainda">
              As ações aparecem aqui assim que a primeira campanha for validada.
            </Vazio>
          )}
        </Card>
      </div>
    </div>
  );
}
