import type { PolicyFinding } from '../../policies/engine.js';
import { montarCampanha, montarConjuntoBase, montarCriativos, validarCopies } from './base.js';
import type { BuildPlanInput, CampaignPlan, CampaignTemplate } from './types.js';

/**
 * Modelo 2 — Geracao de leads com formulario instantaneo.
 *
 * destination_type ON_AD mantem o usuario dentro da Meta: o formulario abre no
 * proprio anuncio. O promoted_object leva a Pagina dona do formulario.
 */
export const leadsFormularioTemplate: CampaignTemplate = {
  id: 'leads_formulario',
  nome: 'Geracao de leads (formulario instantaneo)',
  descricao:
    'Formulario nativo da Meta dentro do anuncio. Util quando o time comercial trabalha por lista e nao por conversa.',
  objective: 'OUTCOME_LEADS',
  destinationType: 'ON_AD',
  optimizationGoal: 'LEAD_GENERATION',
  billingEvent: 'IMPRESSIONS',
  callToAction: 'SIGN_UP',
  requisitosDoCliente: [
    'meta.pageId — Pagina dona do formulario instantaneo',
    'briefing.formulario_id — ID do formulario ja criado na Meta',
  ],

  validar(input: BuildPlanInput): PolicyFinding[] {
    const { client, brief, policies } = input;
    const findings: PolicyFinding[] = [...validarCopies(brief, policies.global.copy)];

    if (brief.destino !== 'formulario') {
      findings.push({
        severidade: 'block',
        policy: 'template',
        rule: 'destino_incompativel',
        mensagem: `O modelo "leads_formulario" exige destino=formulario, mas o briefing pede "${brief.destino}".`,
      });
    }

    if (!brief.formularioId) {
      findings.push({
        severidade: 'block',
        policy: 'template',
        rule: 'formulario_ausente',
        mensagem:
          'Informe "formulario_id" no briefing. O sistema nao cria formulario instantaneo — ele precisa existir na Meta.',
      });
    }

    if (!client.config.meta.pageId) {
      findings.push({
        severidade: 'block',
        policy: 'client-config',
        rule: 'pagina_nao_cadastrada',
        mensagem: 'Campanha de leads exige a Pagina do Facebook cadastrada (meta.pageId).',
      });
    }

    return findings;
  },

  montarPlano(input: BuildPlanInput): CampaignPlan {
    const { client, brief } = input;
    const pageId = client.config.meta.pageId;
    const link = `https://www.facebook.com/${pageId}`;

    const conjunto = montarConjuntoBase(brief, {
      optimization_goal: this.optimizationGoal,
      billing_event: this.billingEvent,
      destination_type: this.destinationType,
      promoted_object: { page_id: pageId },
    });

    const criativos = montarCriativos({
      client,
      brief,
      link,
      callToAction: {
        type: this.callToAction,
        value: { lead_gen_form_id: brief.formularioId },
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
      destino: { tipo: 'formulario', valor: brief.formularioId ?? '' },
      resumo: `Geracao de leads por formulario instantaneo para "${brief.produtoOferta}" — ${anuncios.length} anuncio(s), otimizando por LEAD_GENERATION.`,
    };
  },
};
