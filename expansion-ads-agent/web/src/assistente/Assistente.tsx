import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useCliente, useEstadoMeta, useSessao } from '../lib/contexto';
import { moeda, paraCents } from '../lib/formato';
import {
  AchadoItem,
  Aviso,
  Campo,
  Card,
  ErroBloco,
  Esqueleto,
  Indicador,
  Selo,
  Vazio,
} from '../componentes/basicos';
import { BarraProporcao } from '../componentes/Graficos';
import { AreaUpload, PreviasFormato } from './Upload';
import {
  ETAPAS,
  estadoInicial,
  lerRascunho,
  limparRascunho,
  paraFormularioApi,
  pendenciasDaEtapa,
  salvarRascunho,
  type CopyForm,
  type EstadoAssistente,
} from './estado';
import type { Achado, Cliente, ObjetivoComercial } from '../lib/tipos';

interface RespostaTemplates {
  objetivosComerciais: ObjetivoComercial[];
  modelos: Array<{ id: string; nome: string; requisitosDoCliente: string[] }>;
}

interface ConselhoEstrategia {
  estrutura: {
    conjuntos: number;
    anunciosPorConjunto: number;
    justificativa: string;
    distribuicaoVerba: string;
  };
  metricaPrincipal: string;
  metricasSecundarias: string[];
  oQueObservar: string[];
  achados: Achado[];
  veredito: 'pronta' | 'atencao' | 'bloqueada';
}

export function Assistente() {
  const { clientes, selecionada } = useCliente();
  const { podeOperar } = useSessao();
  const navegar = useNavigate();

  const [estado, setEstado] = useState<EstadoAssistente>(
    () => lerRascunho() ?? estadoInicial(selecionada?.id ?? ''),
  );

  useEffect(() => {
    salvarRascunho(estado);
  }, [estado]);

  const mudar = <K extends keyof EstadoAssistente>(campo: K, valor: EstadoAssistente[K]) =>
    setEstado((atual) => ({ ...atual, [campo]: valor }));

  const { data: templates } = useQuery({
    queryKey: ['templates'],
    queryFn: () => api.get<RespostaTemplates>('/api/templates'),
  });

  const cliente = clientes.find((c) => c.id === estado.cliente) ?? null;
  const pendencias = pendenciasDaEtapa(estado, estado.etapa);
  const podeAvancar = pendencias.length === 0;

  function irPara(etapa: number) {
    setEstado((atual) => ({ ...atual, etapa: Math.min(Math.max(etapa, 1), ETAPAS.length) }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!podeOperar) {
    return (
      <div className="pagina">
        <Card>
          <Vazio icone="✦" titulo="Acesso restrito">
            Criar campanha exige o papel <strong>operador</strong> ou superior.
          </Vazio>
        </Card>
      </div>
    );
  }

  return (
    <div className="pagina">
      <div className="pagina__cabecalho">
        <div className="pagina__titulo-bloco">
          <h1>Nova campanha</h1>
          <p className="pagina__sub">
            Etapa {estado.etapa} de {ETAPAS.length} · {ETAPAS[estado.etapa - 1]!.descricao}
          </p>
        </div>
        <button
          className="botao botao--fantasma botao--pequeno"
          onClick={() => {
            limparRascunho();
            setEstado(estadoInicial(selecionada?.id ?? ''));
          }}
        >
          Descartar rascunho
        </button>
      </div>

      <PassoAPasso etapa={estado.etapa} aoIr={irPara} />

      <div style={{ marginTop: 20 }}>
        {estado.etapa === 1 && <EtapaCliente clientes={clientes} estado={estado} mudar={mudar} />}
        {estado.etapa === 2 && (
          <EtapaObjetivo
            objetivos={templates?.objetivosComerciais ?? []}
            cliente={cliente}
            estado={estado}
            mudar={mudar}
          />
        )}
        {estado.etapa === 3 && <EtapaEstrategia estado={estado} mudar={mudar} />}
        {estado.etapa === 4 && <EtapaDestino estado={estado} cliente={cliente} mudar={mudar} />}
        {estado.etapa === 5 && <EtapaCriativos estado={estado} mudar={mudar} />}
        {estado.etapa === 6 && <EtapaCopy estado={estado} mudar={mudar} />}
        {estado.etapa === 7 && <EtapaPublico estado={estado} mudar={mudar} />}
        {estado.etapa === 8 && <EtapaPosicionamentos estado={estado} />}
        {estado.etapa === 9 && <EtapaOrcamento estado={estado} cliente={cliente} mudar={mudar} />}
        {estado.etapa === 10 && (
          <EtapaRevisao
            estado={estado}
            cliente={cliente}
            aoConcluir={(id) => navegar(`/campanhas/${id}`)}
          />
        )}
      </div>

      {pendencias.length > 0 && estado.etapa < 10 && (
        <div style={{ marginTop: 18 }}>
          <Aviso tipo="alerta" titulo="Falta preencher para avançar">
            <ul style={{ margin: '4px 0 0', paddingLeft: 18 }}>
              {pendencias.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </Aviso>
        </div>
      )}

      <div
        className="linha-flex"
        style={{ marginTop: 22, justifyContent: 'space-between', paddingBottom: 30 }}
      >
        <button
          className="botao"
          onClick={() => irPara(estado.etapa - 1)}
          disabled={estado.etapa === 1}
        >
          ← Voltar
        </button>
        <span style={{ fontSize: '0.76rem', color: 'var(--texto-terciario)' }}>
          Rascunho salvo automaticamente
        </span>
        {estado.etapa < ETAPAS.length && (
          <button
            className="botao botao--primario"
            onClick={() => irPara(estado.etapa + 1)}
            disabled={!podeAvancar}
          >
            Continuar →
          </button>
        )}
      </div>
    </div>
  );
}

function PassoAPasso({ etapa, aoIr }: { etapa: number; aoIr: (n: number) => void }) {
  return (
    <div style={{ display: 'flex', gap: 5, overflowX: 'auto', paddingBottom: 6 }}>
      {ETAPAS.map((e) => {
        const concluida = e.numero < etapa;
        const atual = e.numero === etapa;
        return (
          <button
            key={e.numero}
            onClick={() => aoIr(e.numero)}
            disabled={e.numero > etapa}
            title={e.descricao}
            style={{
              flex: '1 0 auto',
              minWidth: 92,
              padding: '9px 11px',
              border: `1px solid ${atual ? 'var(--laranja)' : 'var(--borda)'}`,
              background: atual
                ? 'var(--laranja-vidro)'
                : concluida
                  ? 'var(--grafite-800)'
                  : 'transparent',
              color: atual
                ? 'var(--laranja-claro)'
                : concluida
                  ? 'var(--texto)'
                  : 'var(--texto-terciario)',
              borderRadius: 'var(--raio-sm)',
              cursor: e.numero > etapa ? 'not-allowed' : 'pointer',
              textAlign: 'left',
              fontSize: '0.74rem',
              fontWeight: 600,
            }}
          >
            <div style={{ opacity: 0.7, fontSize: '0.66rem' }}>
              {concluida ? '✓' : e.numero} · Etapa
            </div>
            {e.titulo}
          </button>
        );
      })}
    </div>
  );
}

type Mudar = <K extends keyof EstadoAssistente>(campo: K, valor: EstadoAssistente[K]) => void;

/* ------------------------------------------------------------ 1. Cliente */

function EtapaCliente({
  clientes,
  estado,
  mudar,
}: {
  clientes: Cliente[];
  estado: EstadoAssistente;
  mudar: Mudar;
}) {
  const { data: ativos, isLoading } = useQuery({
    queryKey: ['cliente-ativos', estado.cliente],
    queryFn: () =>
      api.get<{
        credencialConfigurada: boolean;
        problemas: string[];
        contaVisivel: boolean | null;
      }>(`/api/clients/${estado.cliente}/assets`),
    enabled: Boolean(estado.cliente),
  });

  return (
    <Card titulo="Em qual conta esta campanha vai rodar?">
      <p style={{ color: 'var(--texto-secundario)', marginBottom: 16, fontSize: '0.85rem' }}>
        A campanha fica travada na conta cadastrada para a cliente. Nenhuma outra conta é aceita,
        nem por engano nem por requisição forjada.
      </p>

      <div className="escolhas">
        {clientes.map((c) => (
          <button
            key={c.id}
            className={`escolha${estado.cliente === c.id ? ' escolha--ativa' : ''}`}
            onClick={() => mudar('cliente', c.id)}
            disabled={c.status !== 'active'}
          >
            <div className="escolha__titulo">{c.nome}</div>
            <div className="escolha__desc mono">{c.conta}</div>
            <div className="linha-flex" style={{ gap: 5, marginTop: 3 }}>
              <Selo tom="neutro">{c.moeda}</Selo>
              <Selo tom="neutro">{moeda(c.limites.diarioCents, c.moeda)}/dia</Selo>
              {c.exemplo && <Selo tom="atencao">exemplo</Selo>}
            </div>
          </button>
        ))}
      </div>

      {estado.cliente && (
        <div style={{ marginTop: 18 }}>
          {isLoading ? (
            <Esqueleto altura={70} />
          ) : !ativos?.credencialConfigurada ? (
            <Aviso tipo="alerta" titulo="Ativos não conferidos na Meta">
              O servidor está sem credencial. O cadastro local é válido, mas não foi possível
              confirmar que conta, Página e pixel existem de fato.
            </Aviso>
          ) : ativos.problemas.length > 0 ? (
            <Aviso tipo="alerta" titulo="Pendências nos ativos">
              <ul style={{ margin: '4px 0 0', paddingLeft: 18 }}>
                {ativos.problemas.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </Aviso>
          ) : (
            <Aviso tipo="sucesso" titulo="Conta conferida na Meta">
              O token enxerga esta conta e ela responde.
            </Aviso>
          )}
        </div>
      )}
    </Card>
  );
}

/* ----------------------------------------------------------- 2. Objetivo */

function EtapaObjetivo({
  objetivos,
  cliente,
  estado,
  mudar,
}: {
  objetivos: ObjetivoComercial[];
  cliente: Cliente | null;
  estado: EstadoAssistente;
  mudar: Mudar;
}) {
  const escolhido = objetivos.find((o) => o.id === estado.objetivoComercial);

  return (
    <>
      <Card titulo="O que esta campanha precisa gerar para a cliente?">
        <p style={{ color: 'var(--texto-secundario)', marginBottom: 16, fontSize: '0.85rem' }}>
          Escolha pelo resultado comercial. A tradução para objetivo técnico, evento de otimização e
          tipo de destino é feita pelo backend — a tela não decide isso.
        </p>

        <div className="escolhas">
          {objetivos.map((o) => {
            const permitidoParaCliente =
              !cliente || !o.modelo || cliente.modelosPermitidos.includes(o.modelo);
            const bloqueado = !o.disponivel || !permitidoParaCliente;

            return (
              <button
                key={o.id}
                className={`escolha${estado.objetivoComercial === o.id ? ' escolha--ativa' : ''}`}
                disabled={bloqueado}
                onClick={() => {
                  mudar('objetivoComercial', o.id);
                  mudar('modelo', o.modelo ?? '');
                  const destinoPadrao =
                    o.modelo === 'whatsapp_conversas'
                      ? 'whatsapp'
                      : o.modelo === 'leads_formulario'
                        ? 'formulario'
                        : o.modelo === 'vendas_site'
                          ? 'site'
                          : '';
                  mudar('destino', destinoPadrao);
                }}
              >
                <div className="escolha__titulo">{o.rotulo}</div>
                <div className="escolha__desc">{o.descricao}</div>
                {!o.disponivel && (
                  <div style={{ marginTop: 5 }}>
                    <Selo tom="neutro">indisponível</Selo>
                  </div>
                )}
                {o.disponivel && !permitidoParaCliente && (
                  <div style={{ marginTop: 5 }}>
                    <Selo tom="atencao">não autorizado para esta cliente</Selo>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </Card>

      {escolhido && !escolhido.disponivel && escolhido.indisponivelPorque && (
        <div style={{ marginTop: 14 }}>
          <Aviso tipo="info" titulo="Por que este objetivo não está disponível">
            {escolhido.indisponivelPorque}
          </Aviso>
        </div>
      )}

      {escolhido?.tecnico && (
        <div style={{ marginTop: 14 }}>
          <Card titulo="Como isso vira campanha na Meta">
            <div className="grade-indicadores">
              <Indicador rotulo="Objetivo" valor={escolhido.tecnico.objective} tecnico />
              <Indicador rotulo="Destino" valor={escolhido.tecnico.destinationType} tecnico />
              <Indicador rotulo="Otimização" valor={escolhido.tecnico.optimizationGoal} tecnico />
              <Indicador rotulo="Cobrança" valor={escolhido.tecnico.billingEvent} tecnico />
              <Indicador rotulo="Botão" valor={escolhido.tecnico.callToAction} tecnico />
            </div>
            {escolhido.tecnico.requisitosDoCliente.length > 0 && (
              <div style={{ marginTop: 14 }}>
                <div className="secao__titulo">Este modelo exige do cadastro</div>
                <div className="linha-flex" style={{ gap: 6 }}>
                  {escolhido.tecnico.requisitosDoCliente.map((r) => (
                    <Selo key={r} tom="laranja">
                      {r}
                    </Selo>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </>
  );
}

/* --------------------------------------------------------- 3. Estratégia */

function EtapaEstrategia({ estado, mudar }: { estado: EstadoAssistente; mudar: Mudar }) {
  return (
    <>
      <Card titulo="A oferta">
        <Campo
          rotulo="Nome da campanha"
          obrigatorio
          ajuda="Como você vai reconhecer no Gerenciador."
        >
          <input
            type="text"
            value={estado.nomeCampanha}
            onChange={(e) => mudar('nomeCampanha', e.target.value)}
            placeholder="Ex.: Coleção Primavera 2026 — WhatsApp"
          />
        </Campo>

        <Campo
          rotulo="O que esta campanha precisa gerar"
          obrigatorio
          ajuda="Uma frase. Vai para o briefing e orienta a recomendação."
        >
          <input
            type="text"
            value={estado.objetivoDescricao}
            onChange={(e) => mudar('objetivoDescricao', e.target.value)}
            placeholder="Ex.: Gerar conversas qualificadas no WhatsApp para a coleção primavera"
          />
        </Campo>

        <Campo
          rotulo="Produto, coleção ou serviço"
          obrigatorio
          ajuda="Inclua faixa de preço se houver — entra nas sugestões de copy."
        >
          <textarea
            value={estado.produtoOferta}
            onChange={(e) => mudar('produtoOferta', e.target.value)}
            placeholder="Ex.: Coleção primavera — vestidos, blusas e saias a partir de R$ 89,90"
            rows={2}
          />
        </Campo>

        <Campo
          rotulo="Quem é o público"
          obrigatorio
          ajuda="Em palavras, não em segmentação técnica."
        >
          <textarea
            value={estado.publico}
            onChange={(e) => mudar('publico', e.target.value)}
            placeholder="Ex.: Mães de 25 a 45 anos que já compraram na loja física"
            rows={2}
          />
        </Campo>

        <div className="campo">
          <label className="campo__rotulo">
            <input
              type="checkbox"
              checked={estado.remarketing}
              onChange={(e) => mudar('remarketing', e.target.checked)}
              style={{ width: 'auto', marginRight: 8 }}
            />
            Esta campanha inclui remarketing
          </label>
          <div className="campo__ajuda">
            Marcar aqui faz o gestor avaliar se a verba sustenta prospecção e remarketing separados.
          </div>
        </div>
      </Card>

      <div style={{ marginTop: 14 }}>
        <Card titulo="Argumentos">
          <div className="grade-2">
            <Campo rotulo="Diferenciais" ajuda="Um por linha.">
              <textarea
                value={estado.diferenciais}
                onChange={(e) => mudar('diferenciais', e.target.value)}
                placeholder={'Troca grátis em 30 dias\n12 anos de loja física'}
                rows={4}
              />
            </Campo>
            <Campo rotulo="Provas" ajuda="Depoimento, nota, número de clientes. Um por linha.">
              <textarea
                value={estado.provas}
                onChange={(e) => mudar('provas', e.target.value)}
                placeholder="Nota 4,8 no Google com mais de 600 avaliações"
                rows={4}
              />
            </Campo>
          </div>
          <div className="grade-2">
            <Campo rotulo="Restrições" ajuda="O que a copy não pode dizer. Um por linha.">
              <textarea
                value={estado.restricoes}
                onChange={(e) => mudar('restricoes', e.target.value)}
                placeholder={'Não usar urgência falsa\nNão prometer efeito no corpo'}
                rows={3}
              />
            </Campo>
            <Campo rotulo="Observações" ajuda="Qualquer coisa que o gestor precise saber.">
              <textarea
                value={estado.observacoes}
                onChange={(e) => mudar('observacoes', e.target.value)}
                rows={3}
              />
            </Campo>
          </div>
        </Card>
      </div>
    </>
  );
}

/* ------------------------------------------------------------ 4. Destino */

const DESTINOS: Record<string, { id: string; rotulo: string; descricao: string }[]> = {
  whatsapp_conversas: [
    {
      id: 'whatsapp',
      rotulo: 'WhatsApp',
      descricao: 'A pessoa cai na conversa com uma mensagem já escrita.',
    },
  ],
  leads_formulario: [
    {
      id: 'formulario',
      rotulo: 'Formulário instantâneo',
      descricao: 'Preenchido dentro do Facebook ou Instagram, sem sair do app.',
    },
  ],
  vendas_site: [
    { id: 'site', rotulo: 'Site', descricao: 'Leva para a loja online, com medição por pixel.' },
  ],
};

function EtapaDestino({
  estado,
  cliente,
  mudar,
}: {
  estado: EstadoAssistente;
  cliente: Cliente | null;
  mudar: Mudar;
}) {
  const opcoes = DESTINOS[estado.modelo] ?? [];

  // Semeia o estado com o que está no cadastro, em vez de só EXIBIR o valor.
  // Mostrar um número que o formulário não guarda produzia o pior dos mundos:
  // campo visivelmente preenchido e erro dizendo que falta preencher.
  useEffect(() => {
    if (!cliente) return;
    if (!estado.whatsapp && cliente.whatsapp) mudar('whatsapp', cliente.whatsapp);
    if (!estado.pixelId && cliente.pixelId) mudar('pixelId', cliente.pixelId);
  }, [cliente, estado.whatsapp, estado.pixelId, mudar]);

  const validacao = useMutation({
    mutationFn: () =>
      api.post<{ ok: boolean; problemas: string[] }>('/api/validate/destination', {
        cliente: estado.cliente,
        url: estado.url,
      }),
  });

  return (
    <>
      <Card titulo="Para onde a pessoa vai">
        <p style={{ color: 'var(--texto-secundario)', marginBottom: 16, fontSize: '0.85rem' }}>
          Só aparecem destinos compatíveis com o modelo escolhido. Combinação incoerente é bloqueada
          no backend, então não faria sentido oferecer aqui.
        </p>

        <div className="escolhas">
          {opcoes.map((d) => (
            <button
              key={d.id}
              className={`escolha${estado.destino === d.id ? ' escolha--ativa' : ''}`}
              onClick={() => mudar('destino', d.id)}
            >
              <div className="escolha__titulo">{d.rotulo}</div>
              <div className="escolha__desc">{d.descricao}</div>
            </button>
          ))}
        </div>
      </Card>

      {estado.destino === 'whatsapp' && (
        <div style={{ marginTop: 14 }}>
          <Card titulo="WhatsApp">
            <Campo
              rotulo="Número que recebe as conversas"
              obrigatorio
              ajuda={
                cliente?.whatsapp
                  ? `Cadastrado para esta cliente: ${cliente.whatsapp}`
                  : 'Nenhum número cadastrado para esta cliente.'
              }
            >
              <input
                type="text"
                value={estado.whatsapp}
                onChange={(e) => mudar('whatsapp', e.target.value)}
                placeholder="+55 11 90000-0000"
              />
            </Campo>
            <Campo
              rotulo="Mensagem inicial"
              ajuda="O texto que já vem digitado quando a conversa abre. Ajuda a identificar de qual anúncio veio."
              contador={{ atual: estado.mensagemWhatsapp.length, maximo: 300 }}
            >
              <textarea
                value={estado.mensagemWhatsapp}
                onChange={(e) => mudar('mensagemWhatsapp', e.target.value)}
                placeholder="Oi! Vi o anúncio da coleção primavera e quero saber mais."
                rows={2}
              />
            </Campo>
          </Card>
        </div>
      )}

      {estado.destino === 'site' && (
        <div style={{ marginTop: 14 }}>
          <Card titulo="Site">
            <Campo
              rotulo="URL de destino"
              obrigatorio
              ajuda={
                cliente && cliente.urlsPermitidas.length > 0
                  ? `Autorizadas: ${cliente.urlsPermitidas.join(', ')}`
                  : 'Nenhuma URL autorizada no cadastro. O backend vai recusar até você adicionar.'
              }
            >
              <input
                type="text"
                value={estado.url}
                onChange={(e) => mudar('url', e.target.value)}
                placeholder="https://loja.com.br/colecao"
                onBlur={() => estado.url && validacao.mutate()}
              />
            </Campo>

            {validacao.data && !validacao.data.ok && (
              <Aviso tipo="bloqueio" titulo="Destino não autorizado">
                <ul style={{ margin: '4px 0 0', paddingLeft: 18 }}>
                  {validacao.data.problemas.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </Aviso>
            )}
            {validacao.data?.ok && (
              <Aviso tipo="sucesso">URL dentro da allowlist da cliente.</Aviso>
            )}

            <div className="grade-2" style={{ marginTop: 14 }}>
              <Campo
                rotulo="Pixel"
                ajuda={
                  cliente?.pixelId ? `Cadastrado: ${cliente.pixelId}` : 'Sem pixel no cadastro.'
                }
              >
                <input
                  type="text"
                  value={estado.pixelId}
                  onChange={(e) => mudar('pixelId', e.target.value)}
                />
              </Campo>
              <Campo rotulo="Evento de otimização">
                <select value={estado.evento} onChange={(e) => mudar('evento', e.target.value)}>
                  <option value="">Selecione…</option>
                  <option value="PURCHASE">Compra</option>
                  <option value="LEAD">Lead</option>
                  <option value="ADD_TO_CART">Adicionar ao carrinho</option>
                  <option value="INITIATED_CHECKOUT">Iniciar checkout</option>
                </select>
              </Campo>
            </div>
          </Card>
        </div>
      )}

      {estado.destino === 'formulario' && (
        <div style={{ marginTop: 14 }}>
          <Card titulo="Formulário instantâneo">
            <Aviso tipo="info" titulo="Formulário criado na Meta">
              O sistema não cria formulário. Monte-o no Gerenciador de Anúncios e informe o ID aqui.
            </Aviso>
            <div style={{ marginTop: 14 }}>
              <Campo rotulo="ID do formulário" obrigatorio>
                <input
                  type="text"
                  value={estado.formularioId}
                  onChange={(e) => mudar('formularioId', e.target.value)}
                  placeholder="600000000000006"
                />
              </Campo>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

/* ---------------------------------------------------------- 5. Criativos */

function EtapaCriativos({ estado, mudar }: { estado: EstadoAssistente; mudar: Mudar }) {
  return (
    <Card titulo="Criativos">
      <p style={{ color: 'var(--texto-secundario)', marginBottom: 16, fontSize: '0.85rem' }}>
        Os arquivos vão para a pasta da cliente no servidor e ganham um hash. O mesmo arquivo não é
        enviado duas vezes à Meta, e um criativo de uma cliente não entra na campanha de outra.
      </p>
      <AreaUpload
        cliente={estado.cliente}
        criativos={estado.criativos}
        aoMudar={(lista) => mudar('criativos', lista)}
      />
    </Card>
  );
}

/* --------------------------------------------------------------- 6. Copy */

function EtapaCopy({ estado, mudar }: { estado: EstadoAssistente; mudar: Mudar }) {
  const sugerir = useMutation({
    mutationFn: () =>
      api.post<{
        conselho: {
          sugestoes: Array<{
            ref: string;
            titulo: string;
            descricao: string;
            texto: string;
            modelo: string;
          }>;
          achados: Achado[];
          geradoPorModelo: boolean;
        };
      }>('/api/advisor/copy', {
        cliente: estado.cliente,
        modelo: estado.modelo,
        produto: estado.produtoOferta,
        diferenciais: estado.diferenciais.split('\n').filter(Boolean),
        provas: estado.provas.split('\n').filter(Boolean),
        criativos: estado.criativos.map((c) => c.arquivo),
      }),
  });

  function adicionarCopy() {
    const nova: CopyForm = {
      ref: `copy-${estado.copies.length + 1}`,
      titulo: '',
      descricao: '',
      texto: '',
      criativo: estado.criativos[0]?.arquivo ?? '',
    };
    mudar('copies', [...estado.copies, nova]);
  }

  function atualizarCopy(indice: number, campo: keyof CopyForm, valor: string) {
    mudar(
      'copies',
      estado.copies.map((c, i) => (i === indice ? { ...c, [campo]: valor } : c)),
    );
  }

  return (
    <>
      <Card
        titulo="Copy dos anúncios"
        acoes={
          <button
            className="botao botao--pequeno"
            onClick={() => sugerir.mutate()}
            disabled={sugerir.isPending || !estado.produtoOferta}
          >
            {sugerir.isPending ? 'Montando…' : 'Sugerir copies'}
          </button>
        }
      >
        {sugerir.data && (
          <div style={{ marginBottom: 18 }}>
            <Aviso
              tipo={sugerir.data.conselho.geradoPorModelo ? 'info' : 'recomendacao'}
              titulo={
                sugerir.data.conselho.geradoPorModelo
                  ? 'Sugestões geradas por modelo de linguagem'
                  : 'Sugestões montadas por modelo local'
              }
            >
              {sugerir.data.conselho.geradoPorModelo
                ? 'Revise antes de usar.'
                : 'São modelos preenchidos com o produto, o diferencial e a prova do próprio briefing — não texto gerado por IA. Nenhum é aplicado sozinho: escolha e revise.'}
            </Aviso>

            <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
              {sugerir.data.conselho.sugestoes.map((s) => (
                <div
                  key={s.ref}
                  style={{
                    padding: 13,
                    background: 'var(--grafite-800)',
                    borderRadius: 'var(--raio-sm)',
                    border: '1px solid var(--borda)',
                  }}
                >
                  <div className="linha-flex" style={{ justifyContent: 'space-between' }}>
                    <Selo tom="laranja">{s.modelo}</Selo>
                    <button
                      className="botao botao--pequeno"
                      onClick={() =>
                        mudar('copies', [
                          ...estado.copies,
                          {
                            ref: `copy-${estado.copies.length + 1}`,
                            titulo: s.titulo,
                            descricao: s.descricao,
                            texto: s.texto,
                            criativo:
                              estado.criativos[
                                estado.copies.length % Math.max(estado.criativos.length, 1)
                              ]?.arquivo ?? '',
                          },
                        ])
                      }
                    >
                      Usar como base
                    </button>
                  </div>
                  <div style={{ fontWeight: 650, marginTop: 8, fontSize: '0.85rem' }}>
                    {s.titulo}
                  </div>
                  <div
                    style={{ fontSize: '0.8rem', color: 'var(--texto-secundario)', marginTop: 4 }}
                  >
                    {s.texto}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {estado.copies.length === 0 ? (
          <Vazio icone="✎" titulo="Nenhuma copy ainda">
            Cada anúncio precisa de uma copy associada a um criativo.
          </Vazio>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {estado.copies.map((copy, i) => (
              <div
                key={i}
                style={{
                  padding: 15,
                  border: '1px solid var(--borda)',
                  borderRadius: 'var(--raio)',
                  background: 'var(--grafite-900)',
                }}
              >
                <div
                  className="linha-flex"
                  style={{ justifyContent: 'space-between', marginBottom: 12 }}
                >
                  <strong>Anúncio {i + 1}</strong>
                  <button
                    className="botao botao--pequeno botao--fantasma"
                    onClick={() =>
                      mudar(
                        'copies',
                        estado.copies.filter((_, idx) => idx !== i),
                      )
                    }
                  >
                    Remover
                  </button>
                </div>

                <Campo rotulo="Criativo" obrigatorio>
                  <select
                    value={copy.criativo}
                    onChange={(e) => atualizarCopy(i, 'criativo', e.target.value)}
                  >
                    <option value="">Selecione…</option>
                    {estado.criativos.map((c) => (
                      <option key={c.hash} value={c.arquivo}>
                        {c.arquivo}
                      </option>
                    ))}
                  </select>
                </Campo>

                <div className="grade-2">
                  <Campo
                    rotulo="Título"
                    obrigatorio
                    contador={{ atual: copy.titulo.length, maximo: 40 }}
                    ajuda="Até 40 caracteres aparecem sem corte na maioria dos posicionamentos."
                  >
                    <input
                      type="text"
                      value={copy.titulo}
                      onChange={(e) => atualizarCopy(i, 'titulo', e.target.value)}
                    />
                  </Campo>
                  <Campo
                    rotulo="Descrição"
                    obrigatorio
                    contador={{ atual: copy.descricao.length, maximo: 60 }}
                  >
                    <input
                      type="text"
                      value={copy.descricao}
                      onChange={(e) => atualizarCopy(i, 'descricao', e.target.value)}
                    />
                  </Campo>
                </div>

                <Campo
                  rotulo="Texto principal"
                  obrigatorio
                  contador={{ atual: copy.texto.length, maximo: 500 }}
                  ajuda="As duas primeiras linhas são o que aparece antes do “ver mais”."
                >
                  <textarea
                    value={copy.texto}
                    onChange={(e) => atualizarCopy(i, 'texto', e.target.value)}
                    rows={3}
                  />
                </Campo>

                {copy.criativo && (
                  <div style={{ marginTop: 12 }}>
                    <div className="secao__titulo">Prévia</div>
                    {(() => {
                      const criativo = estado.criativos.find((c) => c.arquivo === copy.criativo);
                      return criativo ? (
                        <PreviasFormato
                          cliente={estado.cliente}
                          criativo={criativo}
                          texto={copy.texto}
                          titulo={copy.titulo}
                        />
                      ) : null;
                    })()}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <button className="botao" style={{ marginTop: 14 }} onClick={adicionarCopy}>
          + Adicionar anúncio
        </button>
      </Card>
    </>
  );
}

/* ------------------------------------------------------------ 7. Público */

function EtapaPublico({ estado, mudar }: { estado: EstadoAssistente; mudar: Mudar }) {
  const conselho = useMutation({
    mutationFn: () =>
      api.post<{ conselho: { achados: Achado[] } }>('/api/advisor/audience', {
        cliente: estado.cliente,
        faixaEtaria: estado.faixaEtaria,
        generos: estado.generos,
        interesses: estado.interesses
          .split(',')
          .map((i) => i.trim())
          .filter(Boolean),
        regioes: estado.regioes
          .split(',')
          .map((r) => r.trim())
          .filter(Boolean),
        remarketing: estado.remarketing,
      }),
  });

  return (
    <>
      <Card
        titulo="Quem vai ver"
        acoes={
          <button
            className="botao botao--pequeno"
            onClick={() => conselho.mutate()}
            disabled={conselho.isPending}
          >
            {conselho.isPending ? 'Avaliando…' : 'Avaliar público'}
          </button>
        }
      >
        <Campo
          rotulo="Regiões"
          obrigatorio
          ajuda="Separe por vírgula. Use BR para o país inteiro, ou cidades específicas."
        >
          <input
            type="text"
            value={estado.regioes}
            onChange={(e) => mudar('regioes', e.target.value)}
            placeholder="BR ou São Paulo, Campinas"
          />
        </Campo>

        <div className="grade-2">
          <Campo rotulo="Faixa etária" obrigatorio ajuda="Formato 25-45.">
            <input
              type="text"
              value={estado.faixaEtaria}
              onChange={(e) => mudar('faixaEtaria', e.target.value)}
              placeholder="25-45"
            />
          </Campo>
          <Campo rotulo="Gênero">
            <select value={estado.generos} onChange={(e) => mudar('generos', e.target.value)}>
              <option value="todos">Todos</option>
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
            </select>
          </Campo>
        </div>

        <Campo
          rotulo="Interesses"
          ajuda="Separe por vírgula. Deixar vazio entrega público aberto — costuma funcionar bem com criativo forte."
        >
          <input
            type="text"
            value={estado.interesses}
            onChange={(e) => mudar('interesses', e.target.value)}
            placeholder="moda feminina, compras online"
          />
        </Campo>
      </Card>

      {conselho.data && (
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {conselho.data.conselho.achados.length === 0 ? (
            <Aviso tipo="sucesso" titulo="Nada a apontar">
              A segmentação não dispara nenhum alerta das regras de gestor.
            </Aviso>
          ) : (
            conselho.data.conselho.achados.map((a, i) => <AchadoItem achado={a} key={i} />)
          )}
        </div>
      )}
    </>
  );
}

/* ---------------------------------------------------- 8. Posicionamentos */

function EtapaPosicionamentos({ estado }: { estado: EstadoAssistente }) {
  const compat = useMemo(() => {
    const total = estado.criativos.length || 1;
    return {
      feed: estado.criativos.filter((c) => c.analise.compatibilidade.feed).length,
      stories: estado.criativos.filter((c) => c.analise.compatibilidade.stories).length,
      reels: estado.criativos.filter((c) => c.analise.compatibilidade.reels).length,
      total,
    };
  }, [estado.criativos]);

  return (
    <Card titulo="Onde o anúncio aparece">
      <Aviso tipo="info" titulo="Posicionamentos automáticos">
        O modelo usa posicionamentos automáticos: a Meta distribui a entrega onde o resultado sai
        mais barato. Habilitar posicionamento incompatível com a proporção do criativo só geraria
        corte — por isso a tela mostra a compatibilidade em vez de deixar você marcar caixinhas que
        pioram o anúncio.
      </Aviso>

      <div className="grade-indicadores" style={{ marginTop: 16 }}>
        <Indicador
          rotulo="Compatíveis com Feed"
          valor={`${compat.feed}/${compat.total}`}
          tom={compat.feed === compat.total ? 'sucesso' : 'atencao'}
        />
        <Indicador
          rotulo="Compatíveis com Stories"
          valor={`${compat.stories}/${compat.total}`}
          tom={compat.stories > 0 ? 'sucesso' : 'atencao'}
        />
        <Indicador
          rotulo="Compatíveis com Reels"
          valor={`${compat.reels}/${compat.total}`}
          tom={compat.reels > 0 ? 'sucesso' : 'atencao'}
        />
      </div>

      {compat.stories === 0 && estado.criativos.length > 0 && (
        <div style={{ marginTop: 14 }}>
          <Aviso tipo="alerta" titulo="Nenhum criativo vertical">
            Stories e Reels pedem 9:16. Sem um criativo vertical, a Meta preenche as bordas ou corta
            — e o corte costuma comer texto no topo e no rodapé. Vale subir uma versão vertical.
          </Aviso>
        </div>
      )}
    </Card>
  );
}

/* --------------------------------------------------------- 9. Orçamento */

function EtapaOrcamento({
  estado,
  cliente,
  mudar,
}: {
  estado: EstadoAssistente;
  cliente: Cliente | null;
  mudar: Mudar;
}) {
  const diarioCents = estado.orcamentoDiario ? paraCents(estado.orcamentoDiario) : null;
  const limite = cliente?.limites.diarioCents ?? 0;
  const percentualLimite = limite > 0 && diarioCents ? (diarioCents / limite) * 100 : 0;
  const acimaDoLimite = diarioCents !== null && limite > 0 && diarioCents > limite;

  const dias =
    estado.dataInicio && estado.dataEncerramento
      ? Math.max(
          1,
          Math.ceil(
            (new Date(estado.dataEncerramento).getTime() - new Date(estado.dataInicio).getTime()) /
              86_400_000,
          ),
        )
      : null;

  const conselho = useMutation({
    mutationFn: () =>
      api.post<{ conselho: ConselhoEstrategia }>('/api/advisor/strategy', {
        form: {
          cliente: estado.cliente,
          modelo: estado.modelo,
          objetivo_comercial: estado.objetivoDescricao,
          destino: estado.destino,
          orcamento_diario: estado.orcamentoDiario,
          orcamento_total: estado.orcamentoTotal,
          data_inicio: estado.dataInicio,
          data_encerramento: estado.dataEncerramento,
          publico: estado.publico,
          criativos: estado.criativos.map((c) => c.arquivo),
          provas: estado.provas.split('\n').filter(Boolean),
        },
        remarketing: estado.remarketing,
      }),
  });

  return (
    <>
      <Card
        titulo="Orçamento e período"
        acoes={
          <button
            className="botao botao--pequeno"
            onClick={() => conselho.mutate()}
            disabled={conselho.isPending || !estado.orcamentoDiario}
          >
            {conselho.isPending ? 'Analisando…' : 'Recomendação do gestor'}
          </button>
        }
      >
        <div className="grade-2">
          <Campo
            rotulo="Orçamento diário"
            ajuda={
              cliente
                ? `Teto desta cliente: ${moeda(cliente.limites.diarioCents, cliente.moeda)}/dia`
                : undefined
            }
          >
            <input
              type="text"
              value={estado.orcamentoDiario}
              onChange={(e) => mudar('orcamentoDiario', e.target.value)}
              placeholder="R$ 50,00"
            />
          </Campo>
          <Campo rotulo="Orçamento total" ajuda="Se preencher, exige data de encerramento.">
            <input
              type="text"
              value={estado.orcamentoTotal}
              onChange={(e) => mudar('orcamentoTotal', e.target.value)}
              placeholder="R$ 1.500,00"
            />
          </Campo>
        </div>

        <div className="grade-2">
          <Campo rotulo="Data de início" obrigatorio>
            <input
              type="date"
              value={estado.dataInicio}
              onChange={(e) => mudar('dataInicio', e.target.value)}
            />
          </Campo>
          <Campo rotulo="Data de encerramento">
            <input
              type="date"
              value={estado.dataEncerramento}
              onChange={(e) => mudar('dataEncerramento', e.target.value)}
            />
          </Campo>
        </div>

        <Campo
          rotulo="Meta de resultado"
          obrigatorio
          ajuda="Ex.: CPL: 25 · CPA: 80 · ROAS: 3. É o que o motor de recomendação usa para julgar a campanha depois."
        >
          <input
            type="text"
            value={estado.meta}
            onChange={(e) => mudar('meta', e.target.value)}
            placeholder="CPL: 25"
          />
        </Campo>

        {cliente && diarioCents !== null && (
          <div style={{ marginTop: 16 }}>
            <BarraProporcao
              valor={diarioCents}
              maximo={limite}
              rotulo={`${moeda(diarioCents, cliente.moeda)} de ${moeda(limite, cliente.moeda)} do teto diário`}
              tom={acimaDoLimite ? 'erro' : percentualLimite > 80 ? 'atencao' : 'laranja'}
            />
          </div>
        )}

        {acimaDoLimite && (
          <div style={{ marginTop: 14 }}>
            <Aviso tipo="bloqueio" titulo="Acima do teto da cliente">
              O backend vai recusar. Reduza o valor ou altere o limite no cadastro da cliente — que
              é uma decisão consciente, não um ajuste de tela.
            </Aviso>
          </div>
        )}

        {dias !== null && diarioCents !== null && cliente && (
          <div className="grade-indicadores" style={{ marginTop: 16 }}>
            <Indicador rotulo="Dias de veiculação" valor={dias} />
            <Indicador
              rotulo="Gasto estimado"
              valor={moeda(diarioCents * dias, cliente.moeda)}
              nota="diário × dias"
            />
            <Indicador
              rotulo="Uso do teto mensal"
              valor={`${Math.round(((diarioCents * 30) / cliente.limites.mensalCents) * 100)}%`}
              nota="projeção de 30 dias"
              tom={diarioCents * 30 > cliente.limites.mensalCents ? 'erro' : undefined}
            />
          </div>
        )}
      </Card>

      {conselho.data && (
        <div style={{ marginTop: 14 }}>
          <RecomendacaoGestor conselho={conselho.data.conselho} />
        </div>
      )}
    </>
  );
}

function RecomendacaoGestor({ conselho }: { conselho: ConselhoEstrategia }) {
  const tom =
    conselho.veredito === 'bloqueada'
      ? 'erro'
      : conselho.veredito === 'atencao'
        ? 'atencao'
        : 'sucesso';

  return (
    <Card
      titulo={
        <span className="linha-flex">
          Recomendação do gestor IA
          <Selo tom={tom}>
            {conselho.veredito === 'pronta'
              ? 'pronta para criar'
              : conselho.veredito === 'atencao'
                ? 'requer atenção'
                : 'bloqueada'}
          </Selo>
        </span>
      }
    >
      <div className="grade-indicadores">
        <Indicador rotulo="Conjuntos" valor={conselho.estrutura.conjuntos} />
        <Indicador rotulo="Anúncios por conjunto" valor={conselho.estrutura.anunciosPorConjunto} />
        <Indicador rotulo="Métrica principal" valor={conselho.metricaPrincipal} tecnico />
      </div>

      <p style={{ marginTop: 14, fontSize: '0.85rem', color: 'var(--texto-secundario)' }}>
        {conselho.estrutura.justificativa} {conselho.estrutura.distribuicaoVerba}
      </p>

      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {conselho.achados.map((a, i) => (
          <AchadoItem achado={a} key={i} />
        ))}
      </div>

      {conselho.oQueObservar.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div className="secao__titulo">O que observar depois de ativar</div>
          <ul
            style={{
              margin: 0,
              paddingLeft: 18,
              fontSize: '0.83rem',
              color: 'var(--texto-secundario)',
            }}
          >
            {conselho.oQueObservar.map((o, i) => (
              <li key={i} style={{ marginBottom: 4 }}>
                {o}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: 14, fontSize: '0.76rem', color: 'var(--texto-terciario)' }}>
        Recomendação, não garantia. Nenhuma previsão de resultado é feita aqui.
      </div>
    </Card>
  );
}

/* --------------------------------------------------------- 10. Revisão */

interface RespostaDryRun {
  campaignId: string;
  briefing: string;
  validacao: {
    bloqueios: Array<{ policy: string; rule: string; mensagem: string }>;
    avisos: Array<{ policy: string; rule: string; mensagem: string }>;
    duplicidades: unknown[];
    resumo: string[];
  };
  criacaoSimulada: { metaIds: Record<string, unknown> };
  chamadas: Array<{ metodo: string; path: string }>;
}

const PASSOS_CRIACAO = [
  'Validando conta',
  'Enviando criativos',
  'Criando campanha',
  'Criando conjuntos',
  'Criando criativos',
  'Criando anúncios',
  'Consultando objetos',
  'Confirmando status',
];

function EtapaRevisao({
  estado,
  cliente,
  aoConcluir,
}: {
  estado: EstadoAssistente;
  cliente: Cliente | null;
  aoConcluir: (campaignId: string) => void;
}) {
  const [confirmado, setConfirmado] = useState(false);
  const [passoAtual, setPassoAtual] = useState(-1);
  const { data: ambiente } = useEstadoMeta();
  // Com DRY_RUN ligado o servidor recusa criar. Melhor dizer isso antes do
  // clique do que deixar o operador montar tudo e levar um erro no fim.
  const dryRunLigado = ambiente?.dryRun === true;

  const dryRun = useMutation({
    mutationFn: () => api.post<RespostaDryRun>('/api/campaigns/dry-run', paraFormularioApi(estado)),
  });

  const criar = useMutation({
    mutationFn: async () => {
      // O progresso é visual: o backend executa os passos em sequência e a
      // barra acompanha o tempo esperado de cada um.
      setPassoAtual(0);
      const temporizador = setInterval(
        () => setPassoAtual((p) => (p < PASSOS_CRIACAO.length - 1 ? p + 1 : p)),
        700,
      );
      try {
        return await api.post<{ campaignId: string; confirmacao: unknown }>('/api/campaigns', {
          form: paraFormularioApi(estado),
          confirmacao: true,
          confirmarDuplicidade: false,
        });
      } finally {
        clearInterval(temporizador);
        setPassoAtual(-1);
      }
    },
    onSuccess: (resposta) => {
      limparRascunho();
      aoConcluir(resposta.campaignId);
    },
  });

  const bloqueios = dryRun.data?.validacao.bloqueios ?? [];
  const avisos = dryRun.data?.validacao.avisos ?? [];
  const validado = dryRun.isSuccess && bloqueios.length === 0;

  return (
    <>
      <Card titulo="Revisão">
        <div className="grade-indicadores">
          <Indicador
            rotulo="Cliente"
            valor={cliente?.nome ?? '—'}
            nota={cliente?.conta}
            tom="destaque"
          />
          <Indicador rotulo="Modelo" valor={estado.modelo} nota={estado.destino} tecnico />
          <Indicador
            rotulo="Orçamento diário"
            valor={estado.orcamentoDiario || '—'}
            nota={estado.dataInicio ? `a partir de ${estado.dataInicio}` : undefined}
          />
          <Indicador
            rotulo="Anúncios"
            valor={estado.copies.length}
            nota={`${estado.criativos.length} criativo(s)`}
          />
        </div>

        <div style={{ marginTop: 18 }}>
          <div className="secao__titulo">Campanha</div>
          <div style={{ fontSize: '0.87rem' }}>
            <strong>{estado.nomeCampanha}</strong>
            <div style={{ color: 'var(--texto-secundario)', marginTop: 4 }}>
              {estado.objetivoDescricao}
            </div>
            <div style={{ color: 'var(--texto-secundario)', marginTop: 4 }}>
              {estado.produtoOferta}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div className="secao__titulo">Público</div>
          <div className="linha-flex" style={{ gap: 6 }}>
            <Selo tom="neutro">{estado.regioes}</Selo>
            <Selo tom="neutro">{estado.faixaEtaria} anos</Selo>
            <Selo tom="neutro">{estado.generos}</Selo>
            {estado.interesses && <Selo tom="neutro">{estado.interesses}</Selo>}
          </div>
        </div>
      </Card>

      <div style={{ marginTop: 14 }}>
        <Card
          titulo="Validação e dry-run"
          acoes={
            <button
              className="botao botao--primario"
              onClick={() => dryRun.mutate()}
              disabled={dryRun.isPending}
            >
              {dryRun.isPending ? 'Executando…' : 'Executar dry-run'}
            </button>
          }
        >
          {!dryRun.isSuccess && !dryRun.isError && !dryRun.isPending && (
            <Vazio icone="◇" titulo="Ainda não validada">
              O dry-run roda todas as validações, monta a estrutura completa e simula os objetos da
              Meta — sem criar nada. É obrigatório antes de criar.
            </Vazio>
          )}

          {dryRun.error && <ErroBloco erro={dryRun.error} />}

          {dryRun.data && (
            <>
              {bloqueios.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {bloqueios.map((b, i) => (
                    <Aviso key={i} tipo="bloqueio" titulo={`${b.policy} · ${b.rule}`}>
                      {b.mensagem}
                    </Aviso>
                  ))}
                </div>
              ) : (
                <Aviso tipo="sucesso" titulo="Validação aprovada">
                  Nenhum bloqueio. A estrutura está pronta para ser criada — pausada.
                </Aviso>
              )}

              {avisos.length > 0 && (
                <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {avisos.map((a, i) => (
                    <Aviso key={i} tipo="alerta" titulo={`${a.policy} · ${a.rule}`}>
                      {a.mensagem}
                    </Aviso>
                  ))}
                </div>
              )}

              <div style={{ marginTop: 16 }}>
                <div className="secao__titulo">
                  Chamadas que seriam feitas à Meta ({dryRun.data.chamadas.length})
                </div>
                <div className="mono" style={{ fontSize: '0.74rem', lineHeight: 1.9 }}>
                  {dryRun.data.chamadas.map((c, i) => (
                    <div key={i}>
                      <span style={{ color: 'var(--laranja)' }}>{c.metodo}</span> {c.path}
                    </div>
                  ))}
                </div>
              </div>

              <details className="detalhe-tecnico" style={{ marginTop: 14 }}>
                <summary>IDs simulados e plano completo</summary>
                <pre>{JSON.stringify(dryRun.data.criacaoSimulada.metaIds, null, 2)}</pre>
              </details>

              <div style={{ marginTop: 12, fontSize: '0.78rem', color: 'var(--texto-terciario)' }}>
                Briefing gravado em <code>{dryRun.data.briefing}</code>
              </div>
            </>
          )}
        </Card>
      </div>

      {validado && dryRunLigado && (
        <div style={{ marginTop: 14 }}>
          <Card titulo="Criar campanha na Meta">
            <Aviso tipo="info" titulo="Dry-run ligado — nada será criado">
              O servidor está com <code>DRY_RUN=true</code>, então a plataforma não cria campanha
              real. O plano acima foi validado e está gravado; para criar de verdade, mude{' '}
              <code>DRY_RUN=false</code> no <code>.env</code> do servidor e reinicie com{' '}
              <code>npm run web</code>.
              <p style={{ marginTop: 8 }}>
                É uma decisão consciente, e de propósito: enquanto essa linha estiver ligada, nenhum
                clique nesta tela gasta dinheiro.
              </p>
            </Aviso>
          </Card>
        </div>
      )}

      {validado && !dryRunLigado && (
        <div style={{ marginTop: 14 }}>
          <Card titulo="Criar campanha na Meta">
            <Aviso tipo="alerta" titulo="Confirmação consciente">
              A campanha será criada na conta <strong>{cliente?.conta}</strong> da cliente{' '}
              <strong>{cliente?.nome}</strong>, com orçamento de{' '}
              <strong>{estado.orcamentoDiario || estado.orcamentoTotal}</strong> e{' '}
              <strong>{estado.copies.length} anúncio(s)</strong>.
              <p style={{ marginTop: 8 }}>
                Tudo nasce <strong>PAUSADO</strong>. Nada entra no ar e nada é cobrado até uma
                aprovação humana e uma ativação explícita.
              </p>
            </Aviso>

            <label
              style={{
                display: 'flex',
                gap: 9,
                alignItems: 'flex-start',
                marginTop: 15,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={confirmado}
                onChange={(e) => setConfirmado(e.target.checked)}
                style={{ width: 'auto', marginTop: 3 }}
              />
              <span>
                Confirmo a cliente, a conta e o orçamento acima, e entendo que a campanha será
                criada pausada.
              </span>
            </label>

            {criar.isPending && (
              <div style={{ marginTop: 16 }}>
                {PASSOS_CRIACAO.map((passo, i) => (
                  <div
                    key={passo}
                    style={{
                      display: 'flex',
                      gap: 9,
                      alignItems: 'center',
                      padding: '5px 0',
                      color:
                        i < passoAtual
                          ? 'var(--sucesso)'
                          : i === passoAtual
                            ? 'var(--laranja)'
                            : 'var(--texto-terciario)',
                      fontSize: '0.83rem',
                    }}
                  >
                    <span>{i < passoAtual ? '✓' : i === passoAtual ? '◆' : '○'}</span>
                    {passo}
                  </div>
                ))}
              </div>
            )}

            {criar.error && (
              <div style={{ marginTop: 14 }}>
                <ErroBloco erro={criar.error} />
              </div>
            )}

            <button
              className="botao botao--primario"
              style={{ marginTop: 16, width: '100%' }}
              disabled={!confirmado || criar.isPending}
              onClick={() => criar.mutate()}
            >
              {criar.isPending ? 'Criando…' : 'Criar campanha pausada na Meta'}
            </button>
          </Card>
        </div>
      )}
    </>
  );
}
