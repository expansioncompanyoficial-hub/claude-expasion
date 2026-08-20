import type { ClientRecord } from '../../clients/schema.js';
import type { PolicyFinding } from '../../policies/engine.js';
import type { PolicyBundle } from '../../policies/schema.js';
import type {
  BillingEvent,
  CallToActionType,
  CampaignObjective,
  DestinationType,
  OptimizationGoal,
} from '../../meta/constants.js';
import type { CampaignBrief, TemplateId } from '../brief-schema.js';

export interface PlanCampaign {
  readonly name: string;
  readonly objective: CampaignObjective;
  readonly status: 'PAUSED';
  readonly buying_type: 'AUCTION';
  readonly special_ad_categories: string[];
}

export interface PlanAdSet {
  readonly ref: string;
  readonly name: string;
  readonly status: 'PAUSED';
  readonly optimization_goal: OptimizationGoal;
  readonly billing_event: BillingEvent;
  readonly destination_type: DestinationType;
  readonly bid_strategy: 'LOWEST_COST_WITHOUT_CAP';
  readonly daily_budget?: number;
  readonly lifetime_budget?: number;
  readonly start_time: string;
  readonly end_time?: string;
  readonly targeting: Record<string, unknown>;
  readonly promoted_object: Record<string, unknown>;
}

export interface PlanCreative {
  readonly ref: string;
  readonly name: string;
  readonly arquivo: string;
  readonly kind: 'image' | 'video';
  readonly copy: { titulo: string; descricao: string; texto: string };
  /** Preenchido na criacao com image_hash / video_id. */
  readonly object_story_spec: Record<string, unknown>;
}

export interface PlanAd {
  readonly ref: string;
  readonly name: string;
  readonly adsetRef: string;
  readonly creativeRef: string;
  readonly status: 'PAUSED';
}

export interface CampaignPlan {
  readonly modelo: TemplateId;
  readonly clientId: string;
  readonly adAccountId: string;
  readonly currency: string;
  readonly campanha: PlanCampaign;
  readonly conjuntos: PlanAdSet[];
  readonly criativos: PlanCreative[];
  readonly anuncios: PlanAd[];
  readonly destino: { tipo: string; valor: string };
  readonly resumo: string;
}

export interface BuildPlanInput {
  readonly client: ClientRecord;
  readonly brief: CampaignBrief;
  readonly policies: PolicyBundle;
}

export interface CampaignTemplate {
  readonly id: TemplateId;
  readonly nome: string;
  readonly descricao: string;
  readonly objective: CampaignObjective;
  readonly destinationType: DestinationType;
  readonly optimizationGoal: OptimizationGoal;
  readonly billingEvent: BillingEvent;
  readonly callToAction: CallToActionType;
  /** O que o modelo exige do cadastro da cliente, alem do briefing. */
  readonly requisitosDoCliente: readonly string[];
  validar(input: BuildPlanInput): PolicyFinding[];
  montarPlano(input: BuildPlanInput): CampaignPlan;
}
