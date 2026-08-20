import type { ClientRecord } from '../../clients/schema.js';
import type { PolicyFinding } from '../../policies/engine.js';
import type { CampaignBrief } from '../brief-schema.js';
import type { PlanAdSet, PlanCampaign, PlanCreative } from './types.js';

/**
 * Nucleo compartilhado por todos os modelos de campanha.
 * Objetivo, destino e criativo mudam por modelo; nome, publico, orcamento,
 * agenda e limites de copy sao identicos e vivem aqui.
 */

const GENDER_CODES: Record<string, number[]> = {
  todos: [],
  masculino: [1],
  feminino: [2],
};

export function normalizarNome(brief: CampaignBrief, sufixo?: string): string {
  const base = brief.nomeCampanha.trim().replace(/\s+/g, ' ');
  return sufixo ? `${base} — ${sufixo}` : base;
}

export function montarCampanha(
  brief: CampaignBrief,
  objective: PlanCampaign['objective'],
): PlanCampaign {
  return {
    name: normalizarNome(brief),
    objective,
    status: 'PAUSED',
    buying_type: 'AUCTION',
    // NONE nao e enviado como valor: categoria especial ausente = lista vazia.
    special_ad_categories: [],
  };
}

export function montarSegmentacao(brief: CampaignBrief): Record<string, unknown> {
  const geoLocations: Record<string, unknown> = {};
  if (brief.geo.paises.length > 0) geoLocations.countries = brief.geo.paises;
  if (brief.geo.regioes.length > 0) {
    geoLocations.regions = brief.geo.regioes.map((key) => ({ key }));
  }
  if (brief.geo.cidades.length > 0) {
    geoLocations.cities = brief.geo.cidades.map((cidade) => ({
      key: cidade.key,
      ...(cidade.raioKm ? { radius: cidade.raioKm, distance_unit: 'kilometer' } : {}),
    }));
  }

  const generos = brief.generos
    .flatMap((genero) => GENDER_CODES[genero] ?? [])
    .filter((value, index, array) => array.indexOf(value) === index);

  const targeting: Record<string, unknown> = {
    geo_locations: geoLocations,
    age_min: brief.idadeMinima,
    age_max: brief.idadeMaxima,
    // Desde a v26 a flag precisa ser explicita; nao deixamos a Meta assumir.
    targeting_automation: { advantage_audience: brief.interesses.length > 0 ? 0 : 1 },
  };

  if (generos.length > 0) targeting.genders = generos;

  if (brief.interesses.length > 0) {
    // Interesses declarados no briefing entram como termos livres para o
    // operador resolver as chaves na busca de segmentacao da Meta antes de criar.
    targeting.flexible_spec = [{ interests_por_nome: brief.interesses }];
  }

  return targeting;
}

export function montarOrcamentoEAgenda(brief: CampaignBrief): {
  daily_budget?: number;
  lifetime_budget?: number;
  start_time: string;
  end_time?: string;
} {
  const agenda: { start_time: string; end_time?: string } = { start_time: brief.dataInicio };
  if (brief.dataEncerramento) agenda.end_time = brief.dataEncerramento;

  if (brief.orcamentoTotalCents !== null) {
    return { lifetime_budget: brief.orcamentoTotalCents, ...agenda };
  }
  return { daily_budget: brief.orcamentoDiarioCents ?? 0, ...agenda };
}

export function montarConjuntoBase(
  brief: CampaignBrief,
  extras: Pick<
    PlanAdSet,
    'optimization_goal' | 'billing_event' | 'destination_type' | 'promoted_object'
  >,
): PlanAdSet {
  return {
    ref: 'conjunto-1',
    name: normalizarNome(brief, 'Conjunto 1'),
    status: 'PAUSED',
    bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
    targeting: montarSegmentacao(brief),
    ...montarOrcamentoEAgenda(brief),
    ...extras,
  };
}

export interface LinkDataInput {
  readonly link: string;
  readonly callToAction: Record<string, unknown>;
  readonly client: ClientRecord;
  readonly brief: CampaignBrief;
}

/**
 * Monta um criativo por copy do briefing. O `image_hash`/`video_id` fica de fora
 * aqui: e preenchido depois do upload, na fase de criacao.
 */
export function montarCriativos(input: LinkDataInput): PlanCreative[] {
  const { brief, client, link, callToAction } = input;

  return brief.copies.map((copy, index) => {
    const kind = detectarTipo(copy.criativo);
    const linkData: Record<string, unknown> = {
      message: copy.texto,
      name: copy.titulo,
      description: copy.descricao,
      link,
      call_to_action: callToAction,
    };

    const objectStorySpec: Record<string, unknown> = {
      page_id: client.config.meta.pageId,
      ...(kind === 'video' ? { video_data: linkData } : { link_data: linkData }),
    };

    if (client.config.meta.instagramId) {
      objectStorySpec.instagram_user_id = client.config.meta.instagramId;
    }

    return {
      ref: copy.ref || `copy-${index + 1}`,
      name: normalizarNome(brief, `Criativo ${index + 1}`),
      arquivo: copy.criativo,
      kind,
      copy: { titulo: copy.titulo, descricao: copy.descricao, texto: copy.texto },
      object_story_spec: objectStorySpec,
    };
  });
}

export function detectarTipo(arquivo: string): 'image' | 'video' {
  return /\.(mp4|mov|m4v|avi)$/i.test(arquivo) ? 'video' : 'image';
}

/** Validacoes de copy que valem para qualquer modelo. */
export function validarCopies(
  brief: CampaignBrief,
  limites: {
    maxCaracteresTitulo: number;
    maxCaracteresDescricao: number;
    maxCaracteresTextoPrincipal: number;
    titulosRecomendadosMaxCaracteres: number;
  },
): PolicyFinding[] {
  const findings: PolicyFinding[] = [];

  for (const copy of brief.copies) {
    if (copy.titulo.length > limites.maxCaracteresTitulo) {
      findings.push({
        severidade: 'block',
        policy: 'global-policy',
        rule: 'titulo_longo',
        mensagem: `Copy "${copy.ref}": titulo com ${copy.titulo.length} caracteres (maximo ${limites.maxCaracteresTitulo}).`,
      });
    } else if (copy.titulo.length > limites.titulosRecomendadosMaxCaracteres) {
      findings.push({
        severidade: 'warn',
        policy: 'global-policy',
        rule: 'titulo_acima_do_recomendado',
        mensagem: `Copy "${copy.ref}": titulo com ${copy.titulo.length} caracteres pode ser cortado no feed (recomendado ate ${limites.titulosRecomendadosMaxCaracteres}).`,
      });
    }

    if (copy.descricao.length > limites.maxCaracteresDescricao) {
      findings.push({
        severidade: 'block',
        policy: 'global-policy',
        rule: 'descricao_longa',
        mensagem: `Copy "${copy.ref}": descricao com ${copy.descricao.length} caracteres (maximo ${limites.maxCaracteresDescricao}).`,
      });
    }

    if (copy.texto.length > limites.maxCaracteresTextoPrincipal) {
      findings.push({
        severidade: 'block',
        policy: 'global-policy',
        rule: 'texto_longo',
        mensagem: `Copy "${copy.ref}": texto principal com ${copy.texto.length} caracteres (maximo ${limites.maxCaracteresTextoPrincipal}).`,
      });
    }
  }

  return findings;
}
