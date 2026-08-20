import type { PolicyFinding } from '../../policies/engine.js';
import { STANDARD_EVENTS } from '../../meta/constants.js';
import { checkDestinationUrl } from '../../security/allowlist.js';
import { montarCampanha, montarConjuntoBase, montarCriativos, validarCopies } from './base.js';
import type { BuildPlanInput, CampaignPlan, CampaignTemplate } from './types.js';

/**
 * Modelo 3 — Vendas no site.
 *
 * OUTCOME_SALES otimizando por OFFSITE_CONVERSIONS. O promoted_object precisa do
 * pixel/dataset e do evento padrao que conta como resultado.
 */
export const vendasSiteTemplate: CampaignTemplate = {
  id: 'vendas_site',
  nome: 'Vendas no site',
  descricao:
    'Trafego para a loja online otimizando por conversao no pixel. Exige pixel instalado e evento disparando.',
  objective: 'OUTCOME_SALES',
  destinationType: 'WEBSITE',
  optimizationGoal: 'OFFSITE_CONVERSIONS',
  billingEvent: 'IMPRESSIONS',
  callToAction: 'SHOP_NOW',
  requisitosDoCliente: [
    'meta.pixelId (ou datasetId) — origem de dados com o evento configurado',
    'urlsPermitidas / dominio — allowlist do destino',
  ],

  validar(input: BuildPlanInput): PolicyFinding[] {
    const { client, brief, policies } = input;
    const findings: PolicyFinding[] = [...validarCopies(brief, policies.global.copy)];

    if (brief.destino !== 'site') {
      findings.push({
        severidade: 'block',
        policy: 'template',
        rule: 'destino_incompativel',
        mensagem: `O modelo "vendas_site" exige destino=site, mas o briefing pede "${brief.destino}".`,
      });
    }

    const pixelCadastrado = client.config.meta.pixelId ?? client.config.meta.datasetId ?? null;
    if (!pixelCadastrado) {
      findings.push({
        severidade: 'block',
        policy: 'client-config',
        rule: 'pixel_nao_cadastrado',
        mensagem: 'Campanha de vendas exige pixel ou dataset cadastrado para a cliente.',
      });
    } else if (brief.pixelId && brief.pixelId !== pixelCadastrado) {
      findings.push({
        severidade: 'block',
        policy: 'client-config',
        rule: 'pixel_divergente',
        mensagem: 'O pixel do briefing nao e o pixel cadastrado para a cliente.',
        detalhes: { pixelCadastrado },
      });
    }

    if (brief.evento && !(STANDARD_EVENTS as readonly string[]).includes(brief.evento)) {
      findings.push({
        severidade: 'block',
        policy: 'template',
        rule: 'evento_invalido',
        mensagem: `Evento "${brief.evento}" nao e um evento padrao da Meta.`,
        detalhes: { eventosValidos: STANDARD_EVENTS },
      });
    }

    if (brief.url) {
      const check = checkDestinationUrl(client, brief.url, policies.global);
      if (!check.ok) {
        findings.push({
          severidade: 'block',
          policy: 'global-policy',
          rule: 'destino_nao_autorizado',
          mensagem: `URL de destino reprovada: ${check.problemas.join(' ')}`,
          detalhes: { url: brief.url, problemas: check.problemas },
        });
      }
    }

    return findings;
  },

  montarPlano(input: BuildPlanInput): CampaignPlan {
    const { client, brief } = input;
    const link = brief.url ?? '';
    const pixelId = client.config.meta.pixelId ?? client.config.meta.datasetId ?? '';

    const conjunto = montarConjuntoBase(brief, {
      optimization_goal: this.optimizationGoal,
      billing_event: this.billingEvent,
      destination_type: this.destinationType,
      promoted_object: { pixel_id: pixelId, custom_event_type: brief.evento ?? 'PURCHASE' },
    });

    const criativos = montarCriativos({
      client,
      brief,
      link,
      callToAction: { type: this.callToAction, value: { link } },
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
      destino: { tipo: 'site', valor: link },
      resumo: `Vendas no site para "${brief.produtoOferta}" — ${anuncios.length} anuncio(s), otimizando por ${brief.evento ?? 'PURCHASE'} no pixel ${pixelId}.`,
    };
  },
};
