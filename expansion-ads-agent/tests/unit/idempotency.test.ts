import { describe, expect, it } from 'vitest';
import {
  campaignIdempotencyKey,
  childIdempotencyKey,
  creativesHash,
} from '../../src/security/idempotency.js';
import { isRealMetaId } from '../../src/meta/simulator.js';

const base = {
  clientId: 'example-client',
  adAccountId: 'act_100000000000001',
  internalName: 'Campanha X',
  template: 'whatsapp_conversas',
  dia: '2026-09-01',
  briefHash: 'hash-do-briefing',
  creativesHash: 'hash-dos-criativos',
};

describe('chave de idempotencia da campanha', () => {
  it('e estavel para a mesma entrada', () => {
    expect(campaignIdempotencyKey(base)).toBe(campaignIdempotencyKey({ ...base }));
  });

  it.each([
    ['cliente', { clientId: 'outra-cliente' }],
    ['conta', { adAccountId: 'act_999999999999999' }],
    ['nome interno', { internalName: 'Campanha Y' }],
    ['tipo de campanha', { template: 'vendas_site' }],
    ['dia', { dia: '2026-09-02' }],
    ['hash do briefing', { briefHash: 'outro-hash' }],
    ['hash dos criativos', { creativesHash: 'outro-hash' }],
  ])('muda quando muda %s', (_label, patch) => {
    expect(campaignIdempotencyKey({ ...base, ...patch })).not.toBe(campaignIdempotencyKey(base));
  });

  it('chave filha depende do pai, do tipo, da ref e do payload', () => {
    const pai = campaignIdempotencyKey(base);
    const a = childIdempotencyKey(pai, 'adset', 'conjunto-1', { x: 1 });
    expect(a).toBe(childIdempotencyKey(pai, 'adset', 'conjunto-1', { x: 1 }));
    expect(a).not.toBe(childIdempotencyKey(pai, 'adset', 'conjunto-2', { x: 1 }));
    expect(a).not.toBe(childIdempotencyKey(pai, 'ad', 'conjunto-1', { x: 1 }));
    expect(a).not.toBe(childIdempotencyKey(pai, 'adset', 'conjunto-1', { x: 2 }));
  });

  it('hash dos criativos independe da ordem dos arquivos', () => {
    const a = creativesHash([
      { arquivo: 'a.png', hash: 'h1' },
      { arquivo: 'b.png', hash: 'h2' },
    ]);
    const b = creativesHash([
      { arquivo: 'b.png', hash: 'h2' },
      { arquivo: 'a.png', hash: 'h1' },
    ]);
    expect(a).toBe(b);
  });

  it('muda quando o conteudo de um criativo muda', () => {
    const a = creativesHash([{ arquivo: 'a.png', hash: 'h1' }]);
    const b = creativesHash([{ arquivo: 'a.png', hash: 'h2' }]);
    expect(a).not.toBe(b);
  });
});

describe('ID simulado nunca conta como objeto real', () => {
  it('rejeita IDs do dry-run', () => {
    expect(isRealMetaId('dryrun_campaign_abc123')).toBe(false);
    expect(isRealMetaId('dryrun0011223344')).toBe(false);
  });

  it('rejeita vazio e nulo', () => {
    expect(isRealMetaId(null)).toBe(false);
    expect(isRealMetaId(undefined)).toBe(false);
    expect(isRealMetaId('')).toBe(false);
  });

  it('aceita ID numerico real da Meta', () => {
    expect(isRealMetaId('120210000000000123')).toBe(true);
  });
});
