import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import path from 'node:path';
import type { AgentContext } from '../../context.js';
import { assertAdAccountAllowed, checkDestinationUrl } from '../../security/allowlist.js';
import { readCreativeFile } from '../../creatives/files.js';
import { validarCriativos } from '../../creatives/validate.js';
import { validarBriefing } from '../../campaigns/service.js';
import { campaignIdempotencyKey, creativesHash } from '../../security/idempotency.js';
import { loadBriefFile } from '../../campaigns/brief-parser.js';
import { getTemplate, listTemplates } from '../../campaigns/templates/index.js';
import { verificarAcesso } from '../../meta/access.js';
import { adAccountField, clientIdField, registerTool } from '../helpers.js';

function resolverBriefing(ctx: AgentContext, caminho: string): string {
  return path.isAbsolute(caminho) ? caminho : path.resolve(ctx.config.paths.root, caminho);
}

export function registerValidationTools(server: McpServer, ctx: AgentContext): void {
  registerTool(server, ctx, {
    name: 'meta_validate_access',
    title: 'Validar acesso e ambiente',
    description:
      'Confere ambiente, versao da Graph API, presenca de credencial (sem revela-la) e se o token enxerga a conta cadastrada. Somente leitura.',
    category: 'validacao',
    readOnly: true,
    inputSchema: { clientId: clientIdField.optional() },
    async handler(args, context) {
      return verificarAcesso(context, args.clientId);
    },
  });

  registerTool(server, ctx, {
    name: 'meta_validate_client_assets',
    title: 'Validar ativos da cliente',
    description:
      'Confere se conta, Pagina, Instagram e pixel cadastrados existem de fato e estao acessiveis pelo token. Somente leitura.',
    category: 'validacao',
    readOnly: true,
    inputSchema: { clientId: clientIdField },
    async handler(args, context) {
      const client = context.clients.loadActive(args.clientId);
      const problemas: string[] = [];
      const checagens: Record<string, unknown> = {};

      if (!context.meta.hasCredentials) {
        return {
          ok: false,
          cliente: client.config.id,
          problemas: [
            'Sem credencial: nao da para confirmar os ativos na Meta. O cadastro local foi validado, mas nao a existencia real.',
          ],
          cadastro: client.config.meta,
        };
      }

      const contas = await context.meta.listAdAccounts(200);
      const conta = contas.find((item) => item.id === client.config.meta.adAccountId);
      checagens.conta = conta ?? null;
      if (!conta) {
        problemas.push(`Conta ${client.config.meta.adAccountId} nao encontrada pelo token.`);
      } else {
        if (conta.currency && conta.currency !== client.config.moeda) {
          problemas.push(
            `Moeda divergente: cadastro diz ${client.config.moeda}, a conta na Meta usa ${conta.currency}.`,
          );
        }
        if (conta.account_status !== undefined && conta.account_status !== 1) {
          problemas.push(
            `A conta nao esta ativa na Meta (account_status=${conta.account_status}).`,
          );
        }
      }

      const paginas = await context.meta.listPages(200);
      const pagina = paginas.find((item) => item.id === client.config.meta.pageId);
      checagens.pagina = pagina ?? null;
      if (!pagina) {
        problemas.push(`Pagina ${client.config.meta.pageId} nao encontrada pelo token.`);
      }

      if (client.config.meta.instagramId) {
        const contasIg = await context.meta.listInstagramAccounts(client.config.meta.pageId);
        const encontrada = contasIg.some((item) => item.id === client.config.meta.instagramId);
        checagens.instagram = { cadastrado: client.config.meta.instagramId, encontrada, contasIg };
        if (!encontrada) {
          problemas.push(
            `Instagram ${client.config.meta.instagramId} nao esta vinculado a Pagina cadastrada.`,
          );
        }
      }

      const pixelCadastrado = client.config.meta.pixelId ?? client.config.meta.datasetId;
      if (pixelCadastrado) {
        const pixels = await context.meta.listPixels(client.config.meta.adAccountId);
        const pixel = pixels.find((item) => item.id === pixelCadastrado);
        checagens.pixel = pixel ?? null;
        if (!pixel) {
          problemas.push(`Pixel/dataset ${pixelCadastrado} nao encontrado na conta.`);
        } else if (!pixel.last_fired_time) {
          problemas.push('O pixel cadastrado nunca registrou evento. Confira a instalacao.');
        }
      }

      return { ok: problemas.length === 0, cliente: client.config.id, checagens, problemas };
    },
  });

  registerTool(server, ctx, {
    name: 'meta_validate_campaign_spec',
    title: 'Validar briefing e plano da campanha',
    description:
      'Validacao completa de um briefing: campos obrigatorios, objetivo, modelo, publico, orcamento, destino, criativos e duplicidade. Nao cria nada.',
    category: 'validacao',
    readOnly: true,
    inputSchema: {
      briefingPath: z
        .string()
        .trim()
        .min(1)
        .describe('Caminho do briefing, relativo a raiz do projeto. Ex.: briefs/campanha.md'),
      consultarMeta: z
        .boolean()
        .default(true)
        .describe('Se true, consulta a Meta para checar campanha duplicada com o mesmo nome.'),
    },
    async handler(args, context) {
      const caminho = resolverBriefing(context, args.briefingPath);
      const { contexto, resultado } = await validarBriefing(context, caminho, {
        consultarMeta: args.consultarMeta,
      });

      return {
        ok: resultado.ok,
        cliente: resultado.clientId,
        conta: resultado.adAccountId,
        modelo: contexto.brief.modelo,
        resumo: resultado.resumo,
        bloqueios: resultado.bloqueios,
        avisos: resultado.avisos,
        criativos: resultado.criativos,
        duplicidades: resultado.duplicidades,
        chaveIdempotencia: resultado.idempotencyKey,
        plano: resultado.plano,
      };
    },
  });

  registerTool(server, ctx, {
    name: 'meta_validate_budget',
    title: 'Validar orcamento',
    description:
      'Testa um orcamento contra os limites da cliente e a politica de orcamento, sem criar nada. Valores em centavos.',
    category: 'validacao',
    readOnly: true,
    inputSchema: {
      clientId: clientIdField,
      orcamentoDiarioCents: z.number().int().positive().nullable().default(null),
      orcamentoTotalCents: z.number().int().positive().nullable().default(null),
      dataInicio: z.string().trim().nullable().default(null),
      dataEncerramento: z.string().trim().nullable().default(null),
    },
    async handler(args, context) {
      const client = context.clients.loadActive(args.clientId);
      const comprometido = context.db.campaigns
        .findMany({ client_id: client.config.id })
        .filter((row) => ['ACTIVE', 'ACTIVATING'].includes(row.state))
        .reduce((total, row) => total + (row.daily_budget_cents ?? 0), 0);

      const findings = context.policyEngine.evaluateBudget(client, {
        currency: client.config.moeda,
        dailyBudgetCents: args.orcamentoDiarioCents,
        lifetimeBudgetCents: args.orcamentoTotalCents,
        startTime: args.dataInicio,
        stopTime: args.dataEncerramento,
        orcamentoDiarioJaComprometidoCents: comprometido,
      });

      const bloqueios = findings.filter((finding) => finding.severidade === 'block');
      return {
        ok: bloqueios.length === 0,
        moeda: client.config.moeda,
        limiteDiarioCents: client.config.limites.diarioCents,
        limiteMensalCents: client.config.limites.mensalCents,
        jaComprometidoDiarioCents: comprometido,
        bloqueios,
        avisos: findings.filter((finding) => finding.severidade === 'warn'),
      };
    },
  });

  registerTool(server, ctx, {
    name: 'meta_check_duplicate_campaign',
    title: 'Checar campanha duplicada',
    description:
      'Consulta banco local e a propria Meta para detectar campanha equivalente antes de criar. Somente leitura.',
    category: 'validacao',
    readOnly: true,
    inputSchema: {
      briefingPath: z.string().trim().min(1).describe('Caminho do briefing a checar.'),
    },
    async handler(args, context) {
      const caminho = resolverBriefing(context, args.briefingPath);
      const clienteId = loadBriefFile(caminho, 'BRL').brief.cliente;
      const client = context.clients.loadActive(clienteId);
      const carregado = loadBriefFile(caminho, client.config.moeda);
      const template = getTemplate(carregado.brief.modelo);
      const plano = template.montarPlano({
        client,
        brief: carregado.brief,
        policies: context.policies,
      });

      const arquivos = carregado.brief.criativos.map((nome) => {
        const arquivo = readCreativeFile(context.config.paths.creatives, client.config.id, nome);
        return { arquivo: arquivo.arquivo, hash: arquivo.hash };
      });

      const chave = campaignIdempotencyKey({
        clientId: client.config.id,
        adAccountId: client.config.meta.adAccountId,
        internalName: plano.campanha.name,
        template: carregado.brief.modelo,
        dia: carregado.brief.dataInicio.slice(0, 10),
        briefHash: carregado.briefHash,
        creativesHash: creativesHash(arquivos),
      });

      const noBanco = context.db.campaigns.findOne({ idempotency_key: chave });
      const mesmoNome = context.db.campaigns.findMany({
        client_id: client.config.id,
        internal_name: plano.campanha.name,
      });

      const naMeta = context.meta.hasCredentials
        ? (await context.meta.listCampaigns(client.config.meta.adAccountId, { limit: 100 })).filter(
            (campanha) =>
              campanha.name?.trim().toLowerCase() === plano.campanha.name.trim().toLowerCase(),
          )
        : [];

      const duplicado = Boolean(noBanco) || mesmoNome.length > 0 || naMeta.length > 0;
      return {
        duplicado,
        chaveIdempotencia: chave,
        noBanco: noBanco ? { id: noBanco.id, estado: noBanco.state } : null,
        mesmoNomeNoBanco: mesmoNome.map((row) => ({ id: row.id, estado: row.state })),
        mesmoNomeNaMeta: naMeta.map((campanha) => ({
          id: campanha.id,
          status: campanha.effective_status ?? campanha.status ?? null,
        })),
        recomendacao: duplicado
          ? 'Pare e confirme com o operador antes de criar. Pode ser reexecucao do mesmo comando.'
          : 'Nenhuma duplicidade encontrada.',
      };
    },
  });

  registerTool(server, ctx, {
    name: 'meta_validate_destination',
    title: 'Validar destino',
    description:
      'Confere se um destino (URL do site, numero de WhatsApp ou formulario) esta autorizado para a cliente.',
    category: 'validacao',
    readOnly: true,
    inputSchema: {
      clientId: clientIdField,
      tipo: z.enum(['site', 'whatsapp', 'formulario']),
      valor: z.string().trim().min(1).describe('URL, numero de WhatsApp ou ID do formulario.'),
    },
    async handler(args, context) {
      const client = context.clients.loadActive(args.clientId);

      if (args.tipo === 'site') {
        const check = checkDestinationUrl(client, args.valor, context.policies.global);
        return {
          ok: check.ok,
          tipo: args.tipo,
          urlNormalizada: check.url,
          problemas: check.problemas,
          allowlist: {
            dominio: client.config.dominio ?? null,
            urlsPermitidas: client.config.urlsPermitidas,
          },
        };
      }

      if (args.tipo === 'whatsapp') {
        const cadastrado = client.config.meta.whatsapp?.numero ?? null;
        const digitosInformados = args.valor.replace(/\D/g, '');
        const digitosCadastrados = cadastrado?.replace(/\D/g, '') ?? null;
        const problemas: string[] = [];
        if (!cadastrado) problemas.push('A cliente nao tem numero de WhatsApp cadastrado.');
        else if (digitosInformados !== digitosCadastrados) {
          problemas.push('O numero informado nao e o numero cadastrado para a cliente.');
        }
        return {
          ok: problemas.length === 0,
          tipo: args.tipo,
          numeroCadastrado: cadastrado,
          problemas,
        };
      }

      const problemas = /^\d+$/.test(args.valor)
        ? []
        : ['O ID do formulario instantaneo deve conter apenas digitos.'];
      return {
        ok: problemas.length === 0,
        tipo: args.tipo,
        problemas,
        observacao:
          'O sistema nao cria formulario instantaneo. O formulario precisa existir na Pagina da cliente.',
      };
    },
  });

  registerTool(server, ctx, {
    name: 'meta_validate_creative_files',
    title: 'Validar arquivos de criativo',
    description:
      'Le os arquivos em creatives/<cliente>/, confere extensao, tamanho, integridade, dimensoes e duplicidade por hash. Nunca altera arquivo.',
    category: 'validacao',
    readOnly: true,
    inputSchema: {
      clientId: clientIdField,
      arquivos: z
        .array(z.string().trim().min(1))
        .min(1)
        .describe('Nomes dos arquivos dentro de creatives/<cliente>/.'),
    },
    async handler(args, context) {
      const client = context.clients.loadActive(args.clientId);
      const lidos = [];
      const erros: Array<{ arquivo: string; problema: string }> = [];

      for (const nome of args.arquivos) {
        try {
          lidos.push(readCreativeFile(context.config.paths.creatives, client.config.id, nome));
        } catch (error) {
          erros.push({ arquivo: nome, problema: (error as Error).message });
        }
      }

      const hashesJaUsados = new Map<string, string>();
      for (const row of context.db.creatives.findMany({ client_id: client.config.id })) {
        if (row.file_hash) hashesJaUsados.set(row.file_hash, row.file_path ?? row.id);
      }

      const resultado = validarCriativos(lidos, context.policies.global, hashesJaUsados);
      return {
        ok: erros.length === 0 && resultado.relatorios.every((relatorio) => relatorio.ok),
        relatorios: resultado.relatorios,
        naoEncontrados: erros,
        duplicados: resultado.duplicados,
        limites: context.policies.global.criativos,
      };
    },
  });

  registerTool(server, ctx, {
    name: 'meta_list_campaign_templates',
    title: 'Listar modelos de campanha',
    description:
      'Lista os modelos de campanha implementados, com objetivo, destino, objetivo de otimizacao e requisitos. Somente leitura.',
    category: 'leitura',
    readOnly: true,
    inputSchema: {},
    async handler(_args, context) {
      return {
        modelos: listTemplates().map((template) => ({
          id: template.id,
          nome: template.nome,
          descricao: template.descricao,
          objetivo: template.objective,
          destino: template.destinationType,
          objetivoDeOtimizacao: template.optimizationGoal,
          eventoDeCobranca: template.billingEvent,
          botao: template.callToAction,
          requisitosDoCliente: template.requisitosDoCliente,
        })),
        versaoGraphApi: context.config.meta.apiVersion,
      };
    },
  });
}

export { assertAdAccountAllowed, adAccountField };
