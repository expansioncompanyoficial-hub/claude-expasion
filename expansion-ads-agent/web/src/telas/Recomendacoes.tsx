import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useCliente, useSessao } from '../lib/contexto';
import { Aviso, Card, ErroBloco, Esqueleto, Selo, Vazio } from '../componentes/basicos';

interface Recomendacao {
  objetoId: string;
  objetoTipo: string;
  acao: string;
  confianca: string;
  motivos: string[];
  bloqueadoPor: string[];
  automatizavel: boolean;
  sugestaoOrcamentoCents: number | null;
}

const TOM_ACAO: Record<string, string> = {
  MANTER: 'sucesso',
  PAUSAR: 'erro',
  REDUZIR: 'atencao',
  ESCALAR: 'laranja',
  NOVA_VARIACAO: 'info',
  REVISAR_CRIATIVO: 'atencao',
  REVISAR_PUBLICO: 'atencao',
};

export function Recomendacoes() {
  const { selecionada } = useCliente();
  const { podeOperar } = useSessao();

  const { data: salvas, isLoading } = useQuery({
    queryKey: ['recomendacoes', selecionada?.id],
    queryFn: () =>
      api.get<{ automacaoLigada: Record<string, boolean>; recomendacoes: unknown[] }>(
        `/api/recommendations?cliente=${selecionada!.id}`,
      ),
    enabled: Boolean(selecionada),
  });

  const gerar = useMutation({
    mutationFn: () =>
      api.post<{ recomendacoes: Recomendacao[] }>('/api/recommendations/generate', {
        cliente: selecionada!.id,
        periodo: 'last-7-days',
      }),
  });

  const auto = salvas?.automacaoLigada;
  const algumaAutomacao = auto ? Object.values(auto).some(Boolean) : false;

  return (
    <div className="pagina">
      <div className="pagina__cabecalho">
        <div className="pagina__titulo-bloco">
          <h1>Recomendações</h1>
          <p className="pagina__sub">
            O motor recomenda. Ele nunca aplica sozinho — nem quando a recomendação é óbvia.
          </p>
        </div>
        <button
          className="botao botao--primario"
          onClick={() => gerar.mutate()}
          disabled={!selecionada || !podeOperar || gerar.isPending}
        >
          {gerar.isPending ? 'Analisando…' : 'Analisar últimos 7 dias'}
        </button>
      </div>

      <div className="secao">
        <Aviso tipo={algumaAutomacao ? 'alerta' : 'info'} titulo="Ações automáticas">
          {algumaAutomacao ? (
            <>
              Alguma automação está ligada no servidor. Confira{' '}
              <code>AUTO_PAUSE_ENABLED</code>, <code>AUTO_SCALE_ENABLED</code> e{' '}
              <code>AUTO_REACTIVATE_ENABLED</code> no <code>.env</code>.
            </>
          ) : (
            <>
              Todas desligadas — pausar, escalar e reativar exigem decisão humana. Mesmo ligadas,
              cada ação ainda passaria pelo motor de políticas e por aprovação.
            </>
          )}
        </Aviso>
      </div>

      {gerar.error && <ErroBloco erro={gerar.error} />}

      {isLoading ? (
        <Card>
          <Esqueleto altura={130} />
        </Card>
      ) : gerar.data ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
          {gerar.data.recomendacoes.length === 0 ? (
            <Card>
              <Vazio icone="◈" titulo="Nada a recomendar">
                Não há campanha com dados suficientes na janela analisada.
              </Vazio>
            </Card>
          ) : (
            gerar.data.recomendacoes.map((r) => (
              <Card
                key={r.objetoId}
                titulo={
                  <span className="linha-flex">
                    <Selo tom={TOM_ACAO[r.acao] ?? 'neutro'}>{r.acao}</Selo>
                    <span className="mono" style={{ fontSize: '0.78rem' }}>
                      {r.objetoId}
                    </span>
                  </span>
                }
                acoes={<Selo tom="neutro">confiança {r.confianca}</Selo>}
              >
                <div className="secao__titulo">Por quê</div>
                <ul style={{ margin: '0 0 14px', paddingLeft: 18, fontSize: '0.85rem' }}>
                  {r.motivos.map((m, i) => (
                    <li key={i} style={{ marginBottom: 4 }}>
                      {m}
                    </li>
                  ))}
                </ul>

                {r.bloqueadoPor.length > 0 && (
                  <Aviso tipo="alerta" titulo="O que impede aplicar automaticamente">
                    <ul style={{ margin: '4px 0 0', paddingLeft: 18 }}>
                      {r.bloqueadoPor.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </Aviso>
                )}

                {!r.automatizavel && r.bloqueadoPor.length === 0 && (
                  <Aviso tipo="info">
                    Ação automática desligada por configuração. A recomendação fica registrada para
                    decisão humana.
                  </Aviso>
                )}
              </Card>
            ))
          )}
        </div>
      ) : (
        <Card>
          <Vazio icone="◈" titulo="Nenhuma análise ainda">
            Clique em “Analisar últimos 7 dias”. O motor usa dados reais da Meta — sem credencial ou
            sem entrega, ele diz que não há base, em vez de inventar recomendação.
          </Vazio>
        </Card>
      )}
    </div>
  );
}
