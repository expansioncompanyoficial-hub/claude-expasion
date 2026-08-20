import { ValidationError } from '../../shared/errors.js';
import type { TemplateId } from '../brief-schema.js';
import { leadsFormularioTemplate } from './leads-formulario.js';
import type { CampaignTemplate } from './types.js';
import { vendasSiteTemplate } from './vendas-site.js';
import { whatsappConversasTemplate } from './whatsapp-conversas.js';

const REGISTRY: Record<TemplateId, CampaignTemplate> = {
  whatsapp_conversas: whatsappConversasTemplate,
  leads_formulario: leadsFormularioTemplate,
  vendas_site: vendasSiteTemplate,
};

export function getTemplate(id: string): CampaignTemplate {
  const template = REGISTRY[id as TemplateId];
  if (!template) {
    throw new ValidationError(
      `Modelo de campanha desconhecido: "${id}".`,
      { modelosDisponiveis: Object.keys(REGISTRY) },
      [`Modelos implementados: ${Object.keys(REGISTRY).join(', ')}.`],
    );
  }
  return template;
}

export function listTemplates(): CampaignTemplate[] {
  return Object.values(REGISTRY);
}

export * from './types.js';
