import { describe, expect, it, beforeEach } from 'vitest';
import { containsSecret, redact, REDACTED } from '../../src/logging/redact.js';
import { clearSecrets, fingerprintSecret, registerSecret } from '../../src/security/secrets.js';
import { Logger } from '../../src/logging/logger.js';

describe('redacao de segredos nos logs', () => {
  beforeEach(() => clearSecrets());

  it('apaga token registrado em qualquer posicao do texto', () => {
    registerSecret('EAAG1234567890abcdefghijklmnop');
    const saida = redact('falhou com token EAAG1234567890abcdefghijklmnop no meio');
    expect(saida).not.toContain('EAAG1234567890abcdefghijklmnop');
    expect(saida).toContain(REDACTED);
  });

  it('apaga token no formato da Meta mesmo sem estar registrado', () => {
    const saida = redact('Authorization falhou: EAABwzLixnjYBO1ZBxyzABCDEFGH123456');
    expect(saida).not.toContain('EAABwzLixnjYBO1ZBxyzABCDEFGH123456');
  });

  it('apaga access_token e appsecret_proof de query string', () => {
    const saida = redact(
      'https://graph.facebook.com/v26.0/act_1/campaigns?access_token=abc123xyz&appsecret_proof=deadbeef99',
    );
    expect(saida).not.toContain('abc123xyz');
    expect(saida).not.toContain('deadbeef99');
    expect(saida).toContain('access_token=');
  });

  it('apaga valores de chaves sensiveis em objetos aninhados', () => {
    const saida = redact({
      nivel1: { access_token: 'segredo-real', senha: '123456', nome: 'Loja Exemplo' },
      lista: [{ appsecret_proof: 'xyz' }],
    }) as Record<string, any>;

    expect(saida.nivel1.access_token).toBe(REDACTED);
    expect(saida.nivel1.senha).toBe(REDACTED);
    expect(saida.nivel1.nome).toBe('Loja Exemplo');
    expect(saida.lista[0].appsecret_proof).toBe(REDACTED);
  });

  it('nao vaza token pelo logger, nem na saida nem no contexto', () => {
    registerSecret('EAAtoken-super-secreto-1234567890');
    const linhas: string[] = [];
    const originalWrite = process.stderr.write.bind(process.stderr);
    (process.stderr as any).write = (chunk: string): boolean => {
      linhas.push(String(chunk));
      return true;
    };

    try {
      new Logger({ level: 'info', dir: null, stream: 'stderr' }).info(
        'chamando a Meta com EAAtoken-super-secreto-1234567890',
        { access_token: 'EAAtoken-super-secreto-1234567890', conta: 'act_1' },
      );
    } finally {
      (process.stderr as any).write = originalWrite;
    }

    const tudo = linhas.join('');
    expect(tudo).not.toContain('EAAtoken-super-secreto-1234567890');
    expect(tudo).toContain('act_1');
  });

  it('fingerprintSecret mostra o suficiente para reconhecer, nunca o token', () => {
    const marca = fingerprintSecret('EAAG1234567890abcdef');
    expect(marca).not.toContain('1234567890abc');
    expect(marca).toContain('len=20');
  });

  it('containsSecret detecta texto com segredo', () => {
    expect(containsSecret('access_token=abc12345')).toBe(true);
    expect(containsSecret('nada demais aqui')).toBe(false);
  });
});
