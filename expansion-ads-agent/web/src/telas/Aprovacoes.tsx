import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useSessao } from '../lib/contexto';
import { dataHora, moeda } from '../lib/formato';
import { Aviso, Card, ErroBloco, Esqueleto, Vazio } from '../componentes/basicos';
import type { Campanha } from '../lib/tipos';

export function Aprovacoes() {
  const { podeGerir } = useSessao();
  const queryClient = useQueryClient();
  const [aberta, setAberta] = useState<string | null>(null);
  const [codigoEmitido, setCodigoEmitido] = useState<Record<string, string>>({});

  const { data, isLoading, error } = useQuery({
    queryKey: ['aprovacoes'],
    queryFn: () => api.get<{ campanhas: Campanha[] }>('/api/campaigns?estado=WAITING_APPROVAL'),
  });

  const aprovar = useMutation({
    mutationFn: (id: string) =>
      api.post<{ aprovacao: { codigo: string; expiraEm: string } }>(`/api/campaigns/${id}/approve`),
    onSuccess: (resposta, id) => {
      setCodigoEmitido((atual) => ({ ...atual, [id]: resposta.aprovacao.codigo }));
      void queryClient.invalidateQueries();
    },
  });

  const campanhas = data?.campanhas ?? [];

  return (
    <div className="pagina">
      <div className="pagina__cabecalho">
        <div className="pagina__titulo-bloco">
          <h1>Aprovações</h1>
          <p className="pagina__sub">
            Nenhuma campanha é ativada sem aprovação válida registrada. A assinatura é de uma pessoa.
          </p>
        </div>
      </div>

      {!podeGerir && (
        <div className="secao">
          <Aviso tipo="info" titulo="Somente leitura">
            Aprovar exige o papel <strong>gestor</strong> ou <strong>admin</strong>. Você pode
            acompanhar a fila, mas não assinar.
          </Aviso>
        </div>
      )}

      {error && <ErroBloco erro={error} />}

      {isLoading ? (
        <Card>
          <Esqueleto altura={130} />
        </Card>
      ) : campanhas.length === 0 ? (
        <Card>
          <Vazio icone="✓" titulo="Nada aguardando aprovação">
            Quando uma campanha for criada e pausada, ela aparece aqui para revisão.
          </Vazio>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {campanhas.map((c) => (
            <Card
              key={c.id}
              titulo={c.nome}
              acoes={
                <>
                  <Link to={`/campanhas/${c.id}`} className="botao botao--pequeno botao--fantasma">
                    Ver detalhes
                  </Link>
                  <button
                    className="botao botao--pequeno"
                    onClick={() => setAberta(aberta === c.id ? null : c.id)}
                  >
                    {aberta === c.id ? 'Fechar' : 'Revisar'}
                  </button>
                </>
              }
            >
              <div className="grade-indicadores">
                <div className="indicador">
                  <div className="indicador__rotulo">Cliente</div>
                  <div className="indicador__valor" style={{ fontSize: '1rem' }}>
                    {c.cliente}
                  </div>
                </div>
                <div className="indicador indicador--destaque">
                  <div className="indicador__rotulo">Orçamento diário</div>
                  <div className="indicador__valor" style={{ fontSize: '1.2rem' }}>
                    {moeda(c.orcamentoDiarioCents, c.moeda)}
                  </div>
                </div>
                <div className="indicador">
                  <div className="indicador__rotulo">Conta</div>
                  <div className="indicador__valor mono" style={{ fontSize: '0.85rem' }}>
                    {c.metaCampaignId ?? '—'}
                  </div>
                </div>
                <div className="indicador">
                  <div className="indicador__rotulo">Criada</div>
                  <div className="indicador__valor" style={{ fontSize: '0.9rem' }}>
                    {dataHora(c.criadaEm)}
                  </div>
                </div>
              </div>

              {aberta === c.id && (
                <div style={{ marginTop: 16 }}>
                  {codigoEmitido[c.id] ? (
                    <Aviso tipo="sucesso" titulo="Aprovação registrada">
                      Código de aprovação:{' '}
                      <strong className="mono" style={{ fontSize: '0.95rem' }}>
                        {codigoEmitido[c.id]}
                      </strong>
                      <p style={{ marginTop: 8 }}>
                        Guarde este código. A ativação exige ele, e ele vale uma única vez.
                      </p>
                      <Link
                        to={`/campanhas/${c.id}`}
                        className="botao botao--primario botao--pequeno"
                        style={{ marginTop: 10 }}
                      >
                        Ir para ativação
                      </Link>
                    </Aviso>
                  ) : (
                    <>
                      <Aviso tipo="alerta" titulo="Confira antes de assinar">
                        Ao aprovar, você autoriza esta campanha, nesta conta, com este orçamento. A
                        aprovação é registrada com seu nome, expira e vale uma única vez. Se algo
                        mudar na campanha depois, a ativação é recusada.
                      </Aviso>
                      <div className="linha-flex" style={{ marginTop: 14 }}>
                        <button
                          className="botao botao--primario"
                          onClick={() => aprovar.mutate(c.id)}
                          disabled={!podeGerir || aprovar.isPending}
                        >
                          {aprovar.isPending ? 'Registrando…' : 'Aprovar campanha'}
                        </button>
                        <span style={{ fontSize: '0.78rem', color: 'var(--texto-terciario)' }}>
                          Aprovar não ativa. A ativação é um passo separado.
                        </span>
                      </div>
                      {aprovar.error && (
                        <div style={{ marginTop: 12 }}>
                          <ErroBloco erro={aprovar.error} />
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
