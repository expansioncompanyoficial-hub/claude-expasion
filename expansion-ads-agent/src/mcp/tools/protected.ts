import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { AgentContext } from '../../context.js';
import {
  getCampaignOrThrow,
  solicitarAprovacao,
  verificarAprovacao,
} from '../../approvals/service.js';
import { ativarCampanha, pausarCampanha } from '../../campaigns/service.js';
import { ApprovalError, PolicyViolationError } from '../../shared/errors.js';
import { fingerprintSecret } from '../../security/secrets.js';
import { formatMoney } from '../../shared/money.js';
import { campaignIdField, registerTool } from '../helpers.js';

/**
 * Ferramentas protegidas.
 *
 * Aqui mora a separacao mais importante do sistema: o Claude pode PEDIR
 * aprovacao e pode PAUSAR, mas nao pode aprovar nem ativar por conta propria.
 * A aprovacao e sempre um ato humano, registrado pelo terminal.
 */
export function registerProtectedTools(server: McpServer, ctx: AgentContext): void {
  registerTool(server, ctx, {
    name: 'meta_request_campaign_approval',
    title: 'Solicitar aprovacao da campanha',
    description:
      'Move a campanha para WAITING_APPROVAL e devolve a previa exata que precisa ser aprovada, com IDs da Meta e impressao digital. Nao aprova nada.',
    category: 'protegida',
    readOnly: false,
    inputSchema: { campaignId: campaignIdField },
    async handler(args, context) {
      const pedido = solicitarAprovacao(context, args.campaignId);
      const row = getCampaignOrThrow(context, args.campaignId);

      return {
        campaignId: pedido.campaignId,
        estado: 'WAITING_APPROVAL',
        impressaoDigital: pedido.fingerprint,
        idsNaMeta: pedido.metaIds,
        resumoParaAprovacao: pedido.resumo,
        orcamento:
          row.daily_budget_cents !== null
            ? `${formatMoney(row.daily_budget_cents, row.currency)}/dia`
            : `${formatMoney(row.lifetime_budget_cents ?? 0, row.currency)} no total`,
        comoAprovar: `npm run campaign:approve -- --campaign-id ${pedido.campaignId} --by "<nome de quem aprova>"`,
        aviso:
          'A aprovacao e um ato humano e acontece no terminal. Este agente nao aprova a propria campanha.',
      };
    },
  });

  registerTool(server, ctx, {
    name: 'meta_check_campaign_approval',
    title: 'Conferir aprovacao',
    description:
      'Verifica se existe aprovacao valida para a campanha e lista exatamente o que impede a ativacao. Somente leitura.',
    category: 'protegida',
    readOnly: true,
    inputSchema: { campaignId: campaignIdField },
    async handler(args, context) {
      const check = verificarAprovacao(context, args.campaignId);
      return {
        podeAtivar: check.ok,
        problemas: check.problemas,
        aprovacao: check.aprovacao
          ? {
              id: check.aprovacao.id,
              status: check.aprovacao.status,
              aprovadoPor: check.aprovacao.approved_by,
              aprovadoEm: check.aprovacao.approved_at,
              venceEm: check.aprovacao.expires_at,
              orcamentoAprovadoCents: check.aprovacao.approved_budget_cents,
              codigo: fingerprintSecret(check.aprovacao.approval_token),
            }
          : null,
      };
    },
  });

  registerTool(server, ctx, {
    name: 'meta_activate_approved_campaign',
    title: 'Ativar campanha aprovada',
    description:
      'Ativa uma campanha que JA tem aprovacao valida registrada. Exige o codigo de aprovacao. Sem aprovacao valida, recusa e registra a tentativa.',
    category: 'protegida',
    readOnly: false,
    destructive: true,
    inputSchema: {
      campaignId: campaignIdField,
      codigoAprovacao: z
        .string()
        .trim()
        .min(8)
        .describe('Codigo APV-... entregue ao operador quando a aprovacao foi registrada no terminal.'),
    },
    async handler(args, context) {
      const resultado = await ativarCampanha(context, args.campaignId, args.codigoAprovacao);
      return {
        campaignId: resultado.campaignId,
        estado: 'ACTIVE',
        ativados: resultado.ativados,
        simulado: resultado.simulado,
        aprovacaoConsumida: resultado.aprovacao,
        aviso: 'A aprovacao foi consumida. Uma nova ativacao exige uma nova aprovacao.',
      };
    },
  });

  registerTool(server, ctx, {
    name: 'meta_pause_campaign',
    title: 'Pausar campanha',
    description:
      'Pausa a campanha na Meta. Sempre permitido — pausar e a acao segura. Revoga aprovacoes pendentes.',
    category: 'protegida',
    readOnly: false,
    inputSchema: {
      campaignId: campaignIdField,
      motivo: z.string().trim().min(3).describe('Por que a campanha esta sendo pausada.'),
    },
    async handler(args, context) {
      const resultado = await pausarCampanha(context, args.campaignId, args.motivo);
      return {
        campaignId: resultado.campaignId,
        estado: 'PAUSED',
        simulado: resultado.simulado,
        aviso: 'Aprovacoes que ainda estavam de pe foram revogadas. Reativar exige nova aprovacao.',
      };
    },
  });

  registerTool(server, ctx, {
    name: 'meta_update_budget_within_policy',
    title: 'Alterar orcamento dentro da politica',
    description:
      'Altera o orcamento diario de um conjunto respeitando limite percentual, espera minima, teto da cliente e aprovacao. Recusa qualquer alteracao fora da politica.',
    category: 'protegida',
    readOnly: false,
    destructive: true,
    inputSchema: {
      campaignId: campaignIdField,
      metaAdsetId: z.string().trim().min(1).describe('ID do conjunto na Meta.'),
      novoOrcamentoDiarioCents: z.number().int().positive(),
      codigoAprovacao: z
        .string()
        .trim()
        .min(8)
        .describe('Codigo de aprovacao valido — obrigatorio quando a politica exige aprovacao.'),
    },
    async handler(args, context) {
      const row = getCampaignOrThrow(context, args.campaignId);
      const client = context.clients.loadActive(row.client_id);
      const adset = context.db.adsets.findOne({ meta_adset_id: args.metaAdsetId });

      if (!adset || adset.campaign_id !== row.id) {
        throw new PolicyViolationError(
          'global-policy',
          'conjunto_fora_da_campanha',
          'O conjunto informado nao pertence a esta campanha no banco local.',
          { metaAdsetId: args.metaAdsetId, campaignId: row.id },
        );
      }

      const check = verificarAprovacao(context, row.id, args.codigoAprovacao);
      if (!check.ok) {
        throw new ApprovalError(
          'APROVACAO_INVALIDA',
          'Alteracao de orcamento bloqueada: aprovacao invalida.',
          { problemas: check.problemas },
          check.problemas,
        );
      }

      const desde = context.clock().getTime() - 86_400_000;
      const alteracoes24h = context.db.actionLogs
        .findMany({ campaign_id: row.id, tool: 'meta_update_budget_within_policy' })
        .filter((log) => new Date(log.ts).getTime() >= desde).length;

      const ultima = context.db.actionLogs
        .findMany({ campaign_id: row.id, tool: 'meta_update_budget_within_policy' }, { orderBy: 'ts DESC', limit: 1 })
        .at(0);

      const findings = context.policyEngine.evaluateBudgetChange(client, {
        currentDailyCents: adset.daily_budget_cents ?? 0,
        nextDailyCents: args.novoOrcamentoDiarioCents,
        ultimaAlteracaoIso: ultima?.ts ?? null,
        alteracoesNasUltimas24h: alteracoes24h,
        aprovado: true,
      });

      const bloqueios = findings.filter((finding) => finding.severidade === 'block');
      if (bloqueios.length > 0) {
        throw new PolicyViolationError(
          bloqueios[0]!.policy,
          bloqueios[0]!.rule,
          `Alteracao de orcamento reprovada: ${bloqueios[0]!.mensagem}`,
          { bloqueios },
          bloqueios.map((finding) => finding.mensagem),
        );
      }

      await context.meta.updateAdSetDailyBudget(args.metaAdsetId, args.novoOrcamentoDiarioCents);
      context.db.adsets.update(adset.id, {
        daily_budget_cents: args.novoOrcamentoDiarioCents,
        updated_at: context.clock().toISOString(),
      });

      return {
        metaAdsetId: args.metaAdsetId,
        orcamentoAnteriorCents: adset.daily_budget_cents,
        orcamentoNovoCents: args.novoOrcamentoDiarioCents,
        avisos: findings.filter((finding) => finding.severidade === 'warn'),
        simulado: context.meta.dryRun,
      };
    },
  });
}
