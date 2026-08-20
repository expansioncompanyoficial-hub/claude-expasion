import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useCliente } from '../lib/contexto';
import { moeda, numero, percentual } from '../lib/formato';
import { Aviso, Card, ErroBloco, Esqueleto, Indicador, Vazio } from '../componentes/basicos';
import type { Metricas } from '../lib/tipos';

const PERIODOS = [
  { id: 'today', rotulo: 'Hoje' },
  { id: 'last-7-days', rotulo: '7 dias' },
  { id: 'last-30-days', rotulo: '30 dias' },
  { id: 'this-month', rotulo: 'Mês atual' },
];

export function Relatorios() {
  const { selecionada } = useCliente();
  const [periodo, setPeriodo] = useState('last-7-days');
  const [nivel, setNivel] = useState<'campaign' | 'adset' | 'ad'>('campaign');

  const { data, isLoading, error } = useQuery({
    queryKey: ['insights', selecionada?.id, periodo, nivel],
    queryFn: () =>
      api.get<{ disponivel: boolean; motivo: string | null; linhas: Metricas[] }>(
        `/api/insights?cliente=${selecionada!.id}&periodo=${periodo}&nivel=${nivel}`,
      ),
    enabled: Boolean(selecionada),
  });

  const linhas = data?.linhas ?? [];

  function exportarCsv() {
    const colunas = [
      'objeto',
      'nome',
      'investimento',
      'impressoes',
      'alcance',
      'cliques',
      'ctr',
      'cpm',
      'resultados',
    ];
    const corpo = linhas.map((l) =>
      [
        l.objetoId,
        `"${(l.nome ?? '').replace(/"/g, '""')}"`,
        ((l.investimentoCents ?? 0) / 100).toFixed(2),
        l.impressoes ?? '',
        l.alcance ?? '',
        l.cliques ?? '',
        l.ctr ?? '',
        ((l.cpmCents ?? 0) / 100).toFixed(2),
        l.conversas ?? l.leads ?? l.compras ?? '',
      ].join(','),
    );
    const csv = [colunas.join(','), ...corpo].join('\n');
    const blob = new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio-${selecionada?.id}-${periodo}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  const total = linhas.reduce(
    (acc, l) => ({
      investimento: acc.investimento + (l.investimentoCents ?? 0),
      impressoes: acc.impressoes + (l.impressoes ?? 0),
      cliques: acc.cliques + (l.cliques ?? 0),
      resultados: acc.resultados + (l.conversas ?? l.leads ?? l.compras ?? 0),
    }),
    { investimento: 0, impressoes: 0, cliques: 0, resultados: 0 },
  );

  return (
    <div className="pagina">
      <div className="pagina__cabecalho">
        <div className="pagina__titulo-bloco">
          <h1>Relatórios</h1>
          <p className="pagina__sub">
            {selecionada?.nome ?? 'Selecione uma cliente'} · dados da Ads Insights API
          </p>
        </div>
        <div className="linha-flex">
          <select value={nivel} onChange={(e) => setNivel(e.target.value as 'campaign')} style={{ width: 150 }}>
            <option value="campaign">Por campanha</option>
            <option value="adset">Por conjunto</option>
            <option value="ad">Por anúncio</option>
          </select>
          {PERIODOS.map((p) => (
            <button
              key={p.id}
              className={`botao botao--pequeno${periodo === p.id ? ' botao--primario' : ' botao--fantasma'}`}
              onClick={() => setPeriodo(p.id)}
            >
              {p.rotulo}
            </button>
          ))}
          <button
            className="botao botao--pequeno"
            onClick={exportarCsv}
            disabled={linhas.length === 0}
          >
            Exportar CSV
          </button>
        </div>
      </div>

      {error && <ErroBloco erro={error} />}

      {data && !data.disponivel && (
        <div className="secao">
          <Aviso tipo="alerta" titulo="Métricas indisponíveis">
            {data.motivo}
          </Aviso>
        </div>
      )}

      {isLoading ? (
        <Card>
          <Esqueleto altura={160} />
        </Card>
      ) : linhas.length === 0 ? (
        <Card>
          <Vazio icone="◐" titulo="Sem dados no período">
            Nenhuma entrega registrada. Uma campanha só gera métrica depois de ativa e entregando.
          </Vazio>
        </Card>
      ) : (
        <>
          <div className="secao">
            <div className="grade-indicadores">
              <Indicador
                rotulo="Investimento"
                valor={moeda(total.investimento, selecionada?.moeda)}
                tom="destaque"
              />
              <Indicador rotulo="Impressões" valor={numero(total.impressoes)} />
              <Indicador rotulo="Cliques" valor={numero(total.cliques)} />
              <Indicador rotulo="Resultados" valor={numero(total.resultados)} />
              <Indicador
                rotulo="Custo por resultado"
                valor={
                  total.resultados > 0
                    ? moeda(Math.round(total.investimento / total.resultados), selecionada?.moeda)
                    : '—'
                }
                {...(total.resultados === 0 ? { indisponivel: 'Nenhum resultado no período' } : {})}
              />
            </div>
          </div>

          <Card semCorpo>
            <div className="tabela-envolucro">
              <table className="tabela">
                <thead>
                  <tr>
                    <th>Objeto</th>
                    <th className="numero">Investimento</th>
                    <th className="numero">Impressões</th>
                    <th className="numero">Alcance</th>
                    <th className="numero">CTR</th>
                    <th className="numero">CPM</th>
                    <th className="numero">Resultados</th>
                  </tr>
                </thead>
                <tbody>
                  {linhas.map((l) => (
                    <tr key={l.objetoId}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{l.nome ?? l.objetoId}</div>
                        <div className="mono" style={{ fontSize: '0.7rem' }}>
                          {l.objetoId}
                        </div>
                      </td>
                      <td className="numero">{moeda(l.investimentoCents, selecionada?.moeda)}</td>
                      <td className="numero">{numero(l.impressoes)}</td>
                      <td className="numero">{numero(l.alcance)}</td>
                      <td className="numero">{percentual(l.ctr)}</td>
                      <td className="numero">{moeda(l.cpmCents, selecionada?.moeda)}</td>
                      <td className="numero">
                        {numero(l.conversas ?? l.leads ?? l.compras ?? null)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
