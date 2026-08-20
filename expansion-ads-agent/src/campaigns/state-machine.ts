import { StateTransitionError } from '../shared/errors.js';

export const CAMPAIGN_STATES = [
  'DRAFT',
  'VALIDATING',
  'VALIDATED',
  'VALIDATION_FAILED',
  'CREATING',
  'CREATED_PAUSED',
  'CREATION_FAILED',
  'WAITING_APPROVAL',
  'APPROVED',
  'ACTIVATING',
  'ACTIVATION_FAILED',
  'ACTIVE',
  'PAUSED',
  'COMPLETED',
] as const;

export type CampaignState = (typeof CAMPAIGN_STATES)[number];

/**
 * Transicoes permitidas. Qualquer caminho fora desta tabela e recusado — inclusive
 * atalhos que "fariam sentido", como pular WAITING_APPROVAL.
 */
const TRANSITIONS: Record<CampaignState, readonly CampaignState[]> = {
  DRAFT: ['VALIDATING'],
  VALIDATING: ['VALIDATED', 'VALIDATION_FAILED'],
  VALIDATION_FAILED: ['VALIDATING', 'DRAFT'],
  VALIDATED: ['CREATING', 'VALIDATING'],
  CREATING: ['CREATED_PAUSED', 'CREATION_FAILED'],
  CREATION_FAILED: ['CREATING'],
  CREATED_PAUSED: ['WAITING_APPROVAL', 'COMPLETED'],
  WAITING_APPROVAL: ['APPROVED', 'CREATED_PAUSED'],
  APPROVED: ['ACTIVATING', 'CREATED_PAUSED'],
  ACTIVATING: ['ACTIVE', 'ACTIVATION_FAILED'],
  ACTIVATION_FAILED: ['ACTIVATING', 'CREATED_PAUSED'],
  ACTIVE: ['PAUSED', 'COMPLETED'],
  PAUSED: ['WAITING_APPROVAL', 'COMPLETED'],
  COMPLETED: [],
};

/** Estados em que a campanha ja existe na Meta (com IDs reais ou simulados). */
export const STATES_WITH_META_OBJECTS: readonly CampaignState[] = [
  'CREATED_PAUSED',
  'WAITING_APPROVAL',
  'APPROVED',
  'ACTIVATING',
  'ACTIVATION_FAILED',
  'ACTIVE',
  'PAUSED',
  'COMPLETED',
];

export function isCampaignState(value: string): value is CampaignState {
  return (CAMPAIGN_STATES as readonly string[]).includes(value);
}

export function allowedTransitions(from: CampaignState): readonly CampaignState[] {
  return TRANSITIONS[from];
}

export function canTransition(from: CampaignState, to: CampaignState): boolean {
  return TRANSITIONS[from].includes(to);
}

export function assertTransition(from: CampaignState, to: CampaignState): void {
  if (!canTransition(from, to)) {
    throw new StateTransitionError(from, to, TRANSITIONS[from]);
  }
}

/** Descricao legivel do estado, usada no CLI e nas respostas MCP. */
export const STATE_LABELS: Record<CampaignState, string> = {
  DRAFT: 'rascunho',
  VALIDATING: 'validando',
  VALIDATED: 'validada (nada criado ainda)',
  VALIDATION_FAILED: 'reprovada na validacao',
  CREATING: 'criando objetos na Meta',
  CREATED_PAUSED: 'criada e pausada na Meta',
  CREATION_FAILED: 'falha parcial na criacao',
  WAITING_APPROVAL: 'aguardando aprovacao humana',
  APPROVED: 'aprovada (ainda pausada)',
  ACTIVATING: 'ativando',
  ACTIVATION_FAILED: 'falha na ativacao',
  ACTIVE: 'ativa',
  PAUSED: 'pausada',
  COMPLETED: 'encerrada',
};
