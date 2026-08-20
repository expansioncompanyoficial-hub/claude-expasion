import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useSessao } from '../lib/contexto';
import { moeda, paraCents } from '../lib/formato';
import { Aviso, Campo, Card, ErroBloco, Esqueleto, Selo, Vazio } from '../componentes/basicos';

interface Descoberta {
  disponivel: boolean;
  motivo: string | null;
  negocios: Array<{ id: string; nome: string | null }>;
  contas: Array<{ id: string; nome: string | null; moeda: string | null; fuso: string | null }>;
  paginas: Array<{
    id: string;
    nome: string | null;
    origem: string | null;
    instagram: Array<{ id: string; usuario: string | null }>;
  }>;
  pixels: Array<{ id: string; nome: string | null }>;
}

const MODELOS = [
  { id: 'whatsapp_conversas', rotulo: 'Conversas no WhatsApp' },
  { id: 'leads_formulario', rotulo: 'Leads por formulário' },
  { id: 'vendas_site', rotulo: 'Vendas no site' },
];

/**
 * Cadastro de cliente pela plataforma.
 *
 * Antes disso, criar cliente era editar `clients/<id>/config.json` à mão e
 * caçar IDs no Gerenciador. Aqui os ativos vêm da própria Meta e a validação é
 * a mesma do arquivo — o backend usa o mesmo `clientConfigSchema`.
 */
export function NovoCliente() {
  const { ehAdmin } = useSessao();
  const navegar = useNavigate();
  const queryClient = useQueryClient();

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [conta, setConta] = useState('');
  const [pageId, setPageId] = useState('');
  const [instagramId, setInstagramId] = useState('');
  const [pixelId, setPixelId] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [dominio, setDominio] = useState('');
  const [urls, setUrls] = useState('');
  const [diario, setDiario] = useState('R$ 20,00');
  const [mensal, setMensal] = useState('R$ 600,00');
  const [modelos, setModelos] = useState<string[]>(['whatsapp_conversas']);

  const descoberta = useQuery({
    queryKey: ['descoberta', conta],
    queryFn: () => api.get<Descoberta>(`/api/meta/discover${conta ? `?conta=${conta}` : ''}`),
    enabled: ehAdmin,
    retry: false,
  });

  // Sem credencial no servidor, não há lista para escolher: os campos viram
  // texto livre em vez de um seletor vazio que trava o cadastro.
  const semLista = descoberta.isError || descoberta.data?.disponivel === false;
  const contaEscolhida = descoberta.data?.contas.find((c) => c.id === conta) ?? null;
  const paginaEscolhida = descoberta.data?.paginas.find((p) => p.id === pageId) ?? null;

  const diarioCents = paraCents(diario) ?? 0;
  const mensalCents = paraCents(mensal) ?? 0;
  // 30 dias no teto diário não pode passar do teto mensal — senão qualquer
  // campanha no limite diário é reprovada pelo motor de políticas.
  const inconsistente = diarioCents > 0 && mensalCents > 0 && diarioCents * 30 > mensalCents;

  const criar = useMutation({
    mutationFn: () =>
      api.post<{ cliente: { id: string } }>('/api/clients', {
        id: id.trim(),
        nome: nome.trim(),
        status: 'active',
        meta: {
          adAccountId: conta,
          businessId: descoberta.data?.negocios[0]?.id ?? null,
          pageId,
          instagramId: instagramId || null,
          pixelId: pixelId || null,
          datasetId: null,
          whatsapp: whatsapp.trim() ? { numero: whatsapp.trim(), wabaId: null } : null,
        },
        dominio: dominio.trim() || null,
        urlsPermitidas: urls
          .split('\n')
          .map((u) => u.trim())
          .filter(Boolean),
        moeda: contaEscolhida?.moeda ?? 'BRL',
        fusoHorario: contaEscolhida?.fuso ?? 'America/Sao_Paulo',
        limites: { diarioCents, mensalCents },
        objetivosPermitidos: ['OUTCOME_LEADS'],
        modelosPermitidos: modelos,
        metas: { cpaCents: null, cplCents: null, roas: null },
      }),
    onSuccess: async (resposta) => {
      await queryClient.invalidateQueries({ queryKey: ['clientes'] });
      navegar(`/clientes/${resposta.cliente.id}`);
    },
  });

  if (!ehAdmin) {
    return (
      <div className="pagina">
        <Card>
          <Vazio icone="◍" titulo="Acesso restrito">
            Cadastrar cliente exige o papel <strong>admin</strong>.
          </Vazio>
        </Card>
      </div>
    );
  }

  const pronto =
    /^[a-z0-9][a-z0-9-]{1,48}$/.test(id.trim()) &&
    nome.trim().length > 1 &&
    conta &&
    pageId &&
    diarioCents > 0 &&
    mensalCents >= diarioCents &&
    modelos.length > 0;

  return (
    <div className="pagina">
      <div className="pagina__cabecalho">
        <div className="pagina__titulo-bloco">
          <h1>Cadastrar cliente</h1>
          <p className="pagina__sub">
            Os ativos vêm da própria Meta. O arquivo <code>clients/&lt;id&gt;/config.json</code> é
            gravado no servidor com a mesma validação da CLI.
          </p>
        </div>
      </div>

      {(descoberta.isError || descoberta.data?.disponivel === false) && (
        <div className="secao">
          <Aviso tipo="alerta" titulo="Ativos não consultados na Meta">
            {descoberta.data?.motivo ??
              'O token não respondeu. Você ainda pode preencher os IDs à mão, mas eles não serão conferidos agora.'}
          </Aviso>
        </div>
      )}

      <div className="grade-2" style={{ alignItems: 'start' }}>
        <Card titulo="Identificação">
          <Campo
            rotulo="Identificador interno"
            obrigatorio
            ajuda="Minúsculo, com hífens. Vira o nome da pasta: clients/<id>/"
          >
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
              placeholder="clau-kidstory"
            />
          </Campo>

          <Campo rotulo="Nome da cliente" obrigatorio>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Clau'kidstory"
            />
          </Campo>

          <Campo rotulo="WhatsApp" ajuda="Número que recebe as conversas, com DDD.">
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+55 11 90000-0000"
            />
          </Campo>

          <Campo rotulo="Domínio" ajuda="Sem https. Usado na allowlist de destino.">
            <input
              type="text"
              value={dominio}
              onChange={(e) => setDominio(e.target.value)}
              placeholder="claukidstory.com.br"
            />
          </Campo>

          <Campo
            rotulo="URLs autorizadas"
            ajuda="Uma por linha, com https. Anúncio para fora desta lista é recusado."
          >
            <textarea
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              placeholder="https://claukidstory.com.br/colecao"
              rows={3}
            />
          </Campo>
        </Card>

        <Card titulo="Ativos na Meta">
          {descoberta.isLoading ? (
            <Esqueleto altura={150} />
          ) : (
            <>
              <Campo
                rotulo="Conta de anúncios"
                obrigatorio
                ajuda={semLista ? 'Formato act_<dígitos>.' : undefined}
              >
                {semLista ? (
                  <input
                    type="text"
                    value={conta}
                    onChange={(e) => setConta(e.target.value.trim())}
                    placeholder="act_1059582889165858"
                  />
                ) : (
                  <select value={conta} onChange={(e) => setConta(e.target.value)}>
                    <option value="">Selecione…</option>
                    {descoberta.data?.contas.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nome ?? c.id} · {c.moeda ?? '—'}
                      </option>
                    ))}
                  </select>
                )}
              </Campo>

              {contaEscolhida && (
                <div className="linha-flex" style={{ gap: 6, marginTop: -8, marginBottom: 14 }}>
                  <Selo tom="neutro">{contaEscolhida.moeda ?? 'moeda desconhecida'}</Selo>
                  <Selo tom="neutro">{contaEscolhida.fuso ?? 'fuso desconhecido'}</Selo>
                </div>
              )}

              <Campo
                rotulo="Página"
                obrigatorio
                ajuda="Todo anúncio sai de uma Página. Sem ela, não há campanha."
              >
                {semLista ? (
                  <input
                    type="text"
                    value={pageId}
                    onChange={(e) => setPageId(e.target.value.trim())}
                    placeholder="109191104238004"
                  />
                ) : (
                  <select
                    value={pageId}
                    onChange={(e) => {
                      setPageId(e.target.value);
                      setInstagramId('');
                    }}
                  >
                    <option value="">Selecione…</option>
                    {descoberta.data?.paginas.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nome ?? p.id}
                        {p.origem === 'client_pages' ? ' (compartilhada pela cliente)' : ''}
                      </option>
                    ))}
                  </select>
                )}
              </Campo>

              <Campo rotulo="Instagram" ajuda="Opcional. Vinculado à Página escolhida.">
                {semLista ? (
                  <input
                    type="text"
                    value={instagramId}
                    onChange={(e) => setInstagramId(e.target.value.trim())}
                    placeholder="17841476101987744"
                  />
                ) : (
                  <select
                    value={instagramId}
                    onChange={(e) => setInstagramId(e.target.value)}
                    disabled={!paginaEscolhida || paginaEscolhida.instagram.length === 0}
                  >
                    <option value="">
                      {paginaEscolhida && paginaEscolhida.instagram.length === 0
                        ? 'Nenhum vinculado a esta Página'
                        : 'Selecione…'}
                    </option>
                    {paginaEscolhida?.instagram.map((i) => (
                      <option key={i.id} value={i.id}>
                        @{i.usuario ?? i.id}
                      </option>
                    ))}
                  </select>
                )}
              </Campo>

              <Campo
                rotulo="Pixel"
                ajuda="Opcional. Necessário só para o modelo de vendas no site."
              >
                <select
                  value={pixelId}
                  onChange={(e) => setPixelId(e.target.value)}
                  disabled={!conta || (descoberta.data?.pixels.length ?? 0) === 0}
                >
                  <option value="">
                    {conta && (descoberta.data?.pixels.length ?? 0) === 0
                      ? 'Nenhum pixel nesta conta'
                      : 'Selecione…'}
                  </option>
                  {descoberta.data?.pixels.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome ?? p.id}
                    </option>
                  ))}
                </select>
              </Campo>
            </>
          )}
        </Card>
      </div>

      <div style={{ marginTop: 16 }}>
        <Card titulo="Limites de orçamento">
          <Aviso tipo="alerta" titulo="Estes valores são travas, não metas">
            O sistema recusa qualquer campanha acima deles, e recusa aumento que os ultrapasse.
            Coloque o valor que você não quer ver ultrapassado nem por engano.
          </Aviso>

          <div className="grade-2" style={{ marginTop: 15 }}>
            <Campo rotulo="Teto diário" obrigatorio>
              <input type="text" value={diario} onChange={(e) => setDiario(e.target.value)} />
            </Campo>
            <Campo rotulo="Teto mensal" obrigatorio>
              <input type="text" value={mensal} onChange={(e) => setMensal(e.target.value)} />
            </Campo>
          </div>

          {inconsistente && (
            <Aviso tipo="bloqueio" titulo="Os dois tetos se contradizem">
              {moeda(diarioCents)} por dia dá {moeda(diarioCents * 30)} em 30 dias, acima do teto
              mensal de {moeda(mensalCents)}. Qualquer campanha no limite diário seria reprovada.
              Suba o mensal para pelo menos {moeda(diarioCents * 30)} ou baixe o diário.
            </Aviso>
          )}

          <div style={{ marginTop: 18 }}>
            <div className="secao__titulo">Modelos de campanha permitidos</div>
            <div className="linha-flex" style={{ gap: 8 }}>
              {MODELOS.map((m) => (
                <label
                  key={m.id}
                  style={{
                    display: 'flex',
                    gap: 7,
                    alignItems: 'center',
                    padding: '7px 11px',
                    background: modelos.includes(m.id)
                      ? 'var(--laranja-vidro)'
                      : 'var(--grafite-800)',
                    border: `1px solid ${modelos.includes(m.id) ? 'var(--laranja-borda)' : 'var(--borda)'}`,
                    borderRadius: 'var(--raio-sm)',
                    cursor: 'pointer',
                    fontSize: '0.83rem',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={modelos.includes(m.id)}
                    onChange={(e) =>
                      setModelos((atual) =>
                        e.target.checked ? [...atual, m.id] : atual.filter((x) => x !== m.id),
                      )
                    }
                    style={{ width: 'auto' }}
                  />
                  {m.rotulo}
                </label>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {criar.error && (
        <div style={{ marginTop: 16 }}>
          <ErroBloco erro={criar.error} />
        </div>
      )}

      <div className="linha-flex" style={{ marginTop: 20, paddingBottom: 30 }}>
        <button
          className="botao botao--primario"
          disabled={!pronto || inconsistente || criar.isPending}
          onClick={() => criar.mutate()}
        >
          {criar.isPending ? 'Gravando…' : 'Cadastrar cliente'}
        </button>
        <span style={{ fontSize: '0.78rem', color: 'var(--texto-terciario)' }}>
          Grava <code>clients/{id || '<id>'}/config.json</code> no servidor.
        </span>
      </div>
    </div>
  );
}
