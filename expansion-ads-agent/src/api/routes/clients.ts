import type { ApiContexto } from '../contexto.js';
import { HttpError, type Rota } from '../http.js';
import { verificarAcesso } from '../../meta/access.js';
import { listTemplates } from '../../campaigns/templates/index.js';
import { listarObjetivosComerciais } from '../../campaigns/commercial-objectives.js';

/** Visao da cliente sem nenhum segredo. O cadastro ja nao guarda token. */
function resumoCliente(registro: ReturnType<ApiContexto['agent']['clients']['load']>) {
  const c = registro.config;
  return {
    id: c.id,
    nome: c.nome,
    status: c.status,
    exemplo: registro.isExample,
    conta: c.meta.adAccountId,
    businessId: c.meta.businessId ?? null,
    pageId: c.meta.pageId,
    instagramId: c.meta.instagramId ?? null,
    pixelId: c.meta.pixelId ?? null,
    whatsapp: c.meta.whatsapp?.numero ?? null,
    dominio: c.dominio ?? null,
    urlsPermitidas: c.urlsPermitidas,
    moeda: c.moeda,
    fusoHorario: c.fusoHorario,
    limites: c.limites,
    objetivosPermitidos: c.objetivosPermitidos,
    modelosPermitidos: c.modelosPermitidos,
    metas: c.metas ?? null,
    observacoes: c.observacoes ?? null,
  };
}

export function rotasClients(api: ApiContexto): Rota[] {
  const { agent } = api;

  return [
    {
      metodo: 'GET',
      caminho: '/api/clients',
      papel: 'visualizador',
      handler: () => {
        const clientes = agent.clients.list().map((registro) => {
          const campanhas = agent.db.campaigns.findMany({ client_id: registro.config.id });
          const ativas = campanhas.filter((c) => c.state === 'ACTIVE').length;
          return {
            ...resumoCliente(registro),
            campanhas: { total: campanhas.length, ativas },
          };
        });
        return { status: 200, corpo: { ok: true, clientes } };
      },
    },
    {
      metodo: 'GET',
      caminho: '/api/clients/:id',
      papel: 'visualizador',
      handler: (req) => {
        const registro = agent.clients.load(req.params.id!);
        const campanhas = agent.db.campaigns.findMany(
          { client_id: registro.config.id },
          { orderBy: 'created_at DESC', limit: 50 },
        );
        return {
          status: 200,
          corpo: {
            ok: true,
            cliente: resumoCliente(registro),
            brand: registro.brand,
            offers: registro.offers,
            campanhas: campanhas.map((c) => ({
              id: c.id,
              nome: c.internal_name,
              estado: c.state,
              objetivo: c.objective,
              metaId: c.meta_campaign_id,
              criadaEm: c.created_at,
            })),
          },
        };
      },
    },
    {
      metodo: 'GET',
      caminho: '/api/clients/:id/assets',
      papel: 'visualizador',
      handler: async (req) => {
        const registro = agent.clients.load(req.params.id!);
        const acesso = await verificarAcesso(agent, registro.config.id);

        // Ativos conferidos na Meta. Sem credencial, nao inventamos estado:
        // devolvemos "desconhecido" e a tela mostra isso literalmente.
        const temCredencial = agent.config.meta.hasCredentials;
        const conta = temCredencial
          ? await agent.meta.getAdAccount(registro.config.meta.adAccountId).catch(() => null)
          : null;
        const pixels = temCredencial
          ? await agent.meta.listPixels(registro.config.meta.adAccountId).catch(() => [])
          : [];
        const instagram = temCredencial
          ? await agent.meta.listInstagramAccounts(registro.config.meta.pageId).catch(() => [])
          : [];

        return {
          status: 200,
          corpo: {
            ok: acesso.ok,
            credencialConfigurada: temCredencial,
            problemas: acesso.problemas,
            contaVisivel: acesso.contaVisivelPeloToken,
            ativos: {
              conta: conta
                ? {
                    id: conta.id,
                    nome: conta.name ?? null,
                    moeda: conta.currency ?? null,
                    fuso: conta.timezone_name ?? null,
                    status: conta.account_status ?? null,
                  }
                : null,
              pixels: pixels.map((p) => ({ id: p.id, nome: p.name ?? null })),
              instagram: instagram.map((i) => ({ id: i.id, usuario: i.username ?? null })),
            },
          },
        };
      },
    },
    {
      metodo: 'GET',
      caminho: '/api/templates',
      papel: 'visualizador',
      handler: () => ({
        status: 200,
        // Objetivo tecnico vem SEMPRE do backend. A tela nunca decide isso.
        corpo: {
          ok: true,
          objetivosComerciais: listarObjetivosComerciais(),
          modelos: listTemplates().map((t) => ({
            id: t.id,
            nome: t.nome,
            descricao: t.descricao,
            objective: t.objective,
            destinationType: t.destinationType,
            optimizationGoal: t.optimizationGoal,
            billingEvent: t.billingEvent,
            callToAction: t.callToAction,
            requisitosDoCliente: t.requisitosDoCliente,
          })),
        },
      }),
    },
    {
      metodo: 'GET',
      caminho: '/api/meta/status',
      papel: 'visualizador',
      handler: async () => {
        const acesso = await verificarAcesso(api.agent);
        return {
          status: 200,
          corpo: {
            ok: acesso.ok,
            dryRun: agent.config.dryRun,
            versaoApi: agent.config.meta.apiVersion,
            credencialConfigurada: acesso.tokenConfigurado,
            // `impressaoDigital` e nao `marcaDoToken`: o redator de logs apaga qualquer
            // chave que contenha "token", e este valor (EAA***ab (len=210)) existe
            // justamente para ser exibido — ja nasce sem revelar o segredo.
            impressaoDigital: acesso.tokenImpressaoDigital,
            contas: acesso.contasVisiveis ?? [],
            problemas: acesso.problemas,
          },
        };
      },
    },
    {
      metodo: 'GET',
      caminho: '/api/config',
      papel: 'admin',
      handler: () => {
        if (!agent.config) throw new HttpError(503, 'SEM_CONFIG', 'Configuracao indisponivel.');
        return {
          status: 200,
          corpo: {
            ok: true,
            ambiente: {
              dryRun: agent.config.dryRun,
              versaoApi: agent.config.meta.apiVersion,
              automacao: agent.config.automation,
              validadeAprovacaoHoras: agent.config.approval.ttlHours,
            },
            politicas: agent.policies,
            usuarios: api.users.listar(),
          },
        };
      },
    },
  ];
}
