import { describe, expect, it } from 'vitest';
import path from 'node:path';
import {
  assertAdAccountAllowed,
  assertDestinationUrl,
  checkDestinationUrl,
} from '../../src/security/allowlist.js';
import { ClientRegistry } from '../../src/clients/registry.js';
import { loadPolicies } from '../../src/policies/loader.js';
import { PROJECT_ROOT } from '../../src/config/env.js';
import {
  AuthorizationError,
  PolicyViolationError,
  NotFoundError,
} from '../../src/shared/errors.js';

const registry = new ClientRegistry(path.join(PROJECT_ROOT, 'clients'));
const client = registry.load('example-client');
const policy = loadPolicies(path.join(PROJECT_ROOT, 'policies'), false).global;

describe('allowlist de conta de anuncios', () => {
  it('aceita a conta cadastrada para a cliente', () => {
    expect(assertAdAccountAllowed(client, 'act_100000000000001')).toBe('act_100000000000001');
  });

  it('bloqueia qualquer outra conta', () => {
    expect(() => assertAdAccountAllowed(client, 'act_999999999999999')).toThrow(AuthorizationError);
  });

  it('a mensagem de bloqueio diz qual conta era a autorizada', () => {
    try {
      assertAdAccountAllowed(client, 'act_999999999999999');
      expect.unreachable('deveria ter bloqueado');
    } catch (error) {
      const detalhes = (error as AuthorizationError).details;
      expect(detalhes.contaAutorizada).toBe('act_100000000000001');
      expect(detalhes.contaSolicitada).toBe('act_999999999999999');
    }
  });

  it('cliente inexistente nao carrega', () => {
    expect(() => registry.load('cliente-que-nao-existe')).toThrow(NotFoundError);
  });
});

describe('allowlist de destino', () => {
  it('aceita URL do dominio da cliente', () => {
    expect(checkDestinationUrl(client, 'https://lojaexemplo.com.br/produto/1', policy).ok).toBe(
      true,
    );
  });

  it('aceita subdominio do dominio cadastrado', () => {
    expect(checkDestinationUrl(client, 'https://loja.lojaexemplo.com.br/x', policy).ok).toBe(true);
  });

  it('bloqueia dominio fora da allowlist', () => {
    const check = checkDestinationUrl(client, 'https://site-invasor.com/promo', policy);
    expect(check.ok).toBe(false);
    expect(check.problemas.join(' ')).toContain('nao esta na allowlist');
  });

  it('bloqueia http sem TLS', () => {
    const check = checkDestinationUrl(client, 'http://lojaexemplo.com.br', policy);
    expect(check.ok).toBe(false);
    expect(check.problemas.join(' ')).toContain('https');
  });

  it('bloqueia encurtador', () => {
    const check = checkDestinationUrl(client, 'https://bit.ly/xyz', policy);
    expect(check.ok).toBe(false);
    expect(check.problemas.join(' ')).toContain('Encurtador');
  });

  it('bloqueia URL malformada', () => {
    expect(checkDestinationUrl(client, 'nao-e-url', policy).ok).toBe(false);
  });

  it('assertDestinationUrl lanca PolicyViolationError em destino nao autorizado', () => {
    expect(() => assertDestinationUrl(client, 'https://outro-dominio.com', policy)).toThrow(
      PolicyViolationError,
    );
  });
});
