import { describe, expect, it } from 'vitest';
import {
  allowedTransitions,
  assertTransition,
  canTransition,
  CAMPAIGN_STATES,
} from '../../src/campaigns/state-machine.js';
import { StateTransitionError } from '../../src/shared/errors.js';

describe('maquina de estados da campanha', () => {
  it('contem os estados do fluxo e os tres de falha', () => {
    for (const estado of [
      'DRAFT',
      'VALIDATING',
      'VALIDATED',
      'CREATING',
      'CREATED_PAUSED',
      'WAITING_APPROVAL',
      'APPROVED',
      'ACTIVATING',
      'ACTIVE',
      'PAUSED',
      'COMPLETED',
      'VALIDATION_FAILED',
      'CREATION_FAILED',
      'ACTIVATION_FAILED',
    ]) {
      expect(CAMPAIGN_STATES).toContain(estado);
    }
  });

  it('permite o caminho feliz completo', () => {
    const caminho = [
      'DRAFT',
      'VALIDATING',
      'VALIDATED',
      'CREATING',
      'CREATED_PAUSED',
      'WAITING_APPROVAL',
      'APPROVED',
      'ACTIVATING',
      'ACTIVE',
    ] as const;

    for (let i = 0; i < caminho.length - 1; i += 1) {
      expect(canTransition(caminho[i]!, caminho[i + 1]!)).toBe(true);
    }
  });

  it('bloqueia pular a aprovacao: CREATED_PAUSED nao vai direto para ACTIVE', () => {
    expect(canTransition('CREATED_PAUSED', 'ACTIVE')).toBe(false);
    expect(() => assertTransition('CREATED_PAUSED', 'ACTIVE')).toThrow(StateTransitionError);
  });

  it('bloqueia ativar a partir de DRAFT ou VALIDATED', () => {
    expect(canTransition('DRAFT', 'ACTIVE')).toBe(false);
    expect(canTransition('VALIDATED', 'ACTIVE')).toBe(false);
  });

  it('COMPLETED e terminal', () => {
    expect(allowedTransitions('COMPLETED')).toHaveLength(0);
  });

  it('o erro de transicao diz o que era permitido', () => {
    try {
      assertTransition('DRAFT', 'ACTIVE');
      expect.unreachable('deveria ter lancado');
    } catch (error) {
      expect(error).toBeInstanceOf(StateTransitionError);
      expect((error as StateTransitionError).details.allowed).toEqual(allowedTransitions('DRAFT'));
    }
  });
});
