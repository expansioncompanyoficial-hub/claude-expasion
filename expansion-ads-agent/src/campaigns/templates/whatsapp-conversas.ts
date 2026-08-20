import type { PolicyFinding } from '../../policies/engine.js';
import { checkDestinationUrl } from '../../security/allowlist.js';
import {
  montarCampanha,
  montarConjuntoBase,
  montarCriativos,
  validarCopies,
} from './base.js';
import type { BuildPlanInput, CampaignPlan, CampaignTemplate } from './types.js';

/** Numero em digitos, sem `+`, espacos ou pontuacao — formato do link wa.me/api. */
function digitos(numero: string): string {
  return numero.replace(/\D/g, '');
}

export function montarLinkWhatsapp(numero: string, mensagem: string | null): string {
  const url = new URL('https://api.whatsapp.com/send');
  url.searchParams.set('phone', digitos(numero));
  if (mensagem) url.searchParams.set('text', mensagem);
  return url.toString();
}

/**
 * Modelo 1 — Conversas no WhatsApp (Click to WhatsApp).
 *
 * Objetivo OUTCOME_LEADS com destination_type WHATSAPP admite exatamente um
 * objetivo de otimizacao: CONVERSATIONS. O promoted_object leva a Pagina, que e
 * quem carrega o numero do WhatsApp conectado.
 */
export const whatsappConversasTemplate: CampaignTemplate = {
  id: 'whatsapp_conversas',
  nome: 'Conversas no WhatsApp',
  descricao:
    'Anuncio que abre a conversa no WhatsApp da loja. Melhor modelo para loja de roupas que fecha venda no atendimento.',
  objective: 'OUTCOME_LEADS',
  destinationType: 'WHATSAPP',
  optimizationGoal: 'CONVERSATIONS',
  billingEvent: 'IMPRESSIONS',
  callToAction: 'WHATSAPP_MESSAGE',
  requisitosDoCliente: [
    'meta.pageId — Pagina do Facebook com o WhatsApp conectado',
    'meta.whatsapp.numero — numero usado no link do anuncio',
  ],

  validar(input: BuildPlanInput): PolicyFinding[] {
    const { client, brief, policies } = input;
    const findings: PolicyFinding[] = [...validarCopies(brief, policies.global.copy)];

    if (brief.destino !== 'whatsapp') {
      findings.push({
        severidade: 'block',
        policy: 'template',
        rule: 'destino_incompativel',
        mensagem: `O modelo "whatsapp_conversas" exige destino=whatsapp, mas o briefing pede "${brief.destino}".`,
      });
    }

    const numeroBriefing = brief.whatsapp ? digitos(brief.whatsapp) : null;
    const numeroCadastro = client.config.meta.whatsapp?.numero
      ? digitos(client.config.meta.whatsapp.numero)
      : null;

    if (!numeroCadastro) {
      findings.push({
        severidade: 'block',
        policy: 'client-config',
        rule: 'whatsapp_nao_cadastrado',
        mensagem: `A cliente "${client.config.id}" nao tem numero de WhatsApp cadastrado em meta.whatsapp.numero.`,
      });
    } else if (numeroBriefing && numeroBriefing !== numeroCadastro) {
      findings.push({
        severidade: 'block',
        policy: 'client-config',
        rule: 'whatsapp_divergente',
        mensagem:
          'O numero de WhatsApp do briefing nao e o numero cadastrado para a cliente. Nenhuma campanha aponta para numero fora do cadastro.',
        detalhes: { numeroCadastrado: numeroCadastro },
      });
    }

    if (!client.config.meta.pageId) {
      findings.push({
        severidade: 'block',
        policy: 'client-config',
        rule: 'pagina_nao_cadastrada',
        mensagem: 'Campanha de WhatsApp exige a Pagina do Facebook cadastrada (meta.pageId).',
      });
    }

    return findings;
  },

  montarPlano(input: BuildPlanInput): CampaignPlan {
    const { client, brief } = input;
    const numero = client.config.meta.whatsapp?.numero ?? brief.whatsapp ?? '';
    const link = montarLinkWhatsapp(numero, brief.mensagemWhatsapp);

    const conjunto = montarConjuntoBase(brief, {
      optimization_goal: this.optimizationGoal,
      billing_event: this.billingEvent,
      destination_type: this.destinationType,
      promoted_object: { page_id: client.config.meta.pageId },
    });

    const criativos = montarCriativos({
      client,
      brief,
      link,
      callToAction: {
        type: this.callToAction,
        value: { app_destination: 'WHATSAPP', link },
      },
    });

    const anuncios = criativos.map((criativo, index) => ({
      ref: `anuncio-${index + 1}`,
      name: `${brief.nomeCampanha} — Anuncio ${index + 1} (${criativo.ref})`,
      adsetRef: conjunto.ref,
      creativeRef: criativo.ref,
      status: 'PAUSED' as const,
    }));

    return {
      modelo: this.id,
      clientId: client.config.id,
      adAccountId: client.config.meta.adAccountId,
      currency: client.config.moeda,
      campanha: montarCampanha(brief, this.objective),
      conjuntos: [conjunto],
      criativos,
      anuncios,
      destino: { tipo: 'whatsapp', valor: link },
      resumo: `Conversas no WhatsApp para "${brief.produtoOferta}" — ${anuncios.length} anuncio(s) em 1 conjunto, otimizando por CONVERSATIONS.`,
    };
  },
};

/** Exportado so para o validador de destino reaproveitar a checagem de URL. */
export { checkDestinationUrl };
