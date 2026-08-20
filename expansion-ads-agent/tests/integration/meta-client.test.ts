import { describe, expect, it, beforeEach } from 'vitest';
import { MetaClient } from '../../src/meta/client.js';
import { Logger } from '../../src/logging/logger.js';
import { MetaApiError, RateLimitError } from '../../src/shared/errors.js';
import { clearSecrets, registerSecret } from '../../src/security/secrets.js';
import { MockTransport } from '../helpers/meta-mock.js';
import { testConfig } from '../helpers/context.js';

const logger = new Logger({ level: 'silent', dir: null, stream: 'none' });

function client(transport: MockTransport, overrides: Record<string, string> = {}) {
  const config = testConfig({
    META_ACCESS_TOKEN: 'EAAtoken-de-teste-nao-real-1234567890',
    META_MAX_RETRIES: '3',
    META_RETRY_BASE_DELAY_MS: '1',
    ...overrides,
  });
  return new MetaClient({ config, logger, transport, sleep: async () => {} });
}

describe('cliente da Graph API', () => {
  beforeEach(() => clearSecrets());

  it('monta a URL com a versao configurada', async () => {
    const transport = new MockTransport([{ match: '/campaigns', body: { data: [] } }]);
    await client(transport).get('act_1/campaigns', { fields: 'id' });
    expect(transport.requests[0]!.url).toContain('/v26.0/act_1/campaigns');
  });

  it('respeita META_GRAPH_API_VERSION', async () => {
    const transport = new MockTransport([{ match: '/campaigns', body: { data: [] } }]);
    await client(transport, { META_GRAPH_API_VERSION: 'v25.0' }).get('act_1/campaigns');
    expect(transport.requests[0]!.url).toContain('/v25.0/');
  });

  it('envia o token no cabecalho, nunca na query string', async () => {
    const transport = new MockTransport([{ match: '/campaigns', body: { data: [] } }]);
    await client(transport).get('act_1/campaigns');
    const request = transport.requests[0]!;
    expect(request.url).not.toContain('access_token');
    expect(request.headers?.Authorization).toContain('Bearer ');
  });

  it('o registro de chamadas nunca contem o token', async () => {
    registerSecret('EAAtoken-de-teste-nao-real-1234567890');
    const transport = new MockTransport([{ match: '/campaigns', body: { data: [] } }]);
    const meta = client(transport);
    await meta.get('act_1/campaigns');
    expect(JSON.stringify(meta.callLog)).not.toContain('EAAtoken-de-teste-nao-real-1234567890');
  });

  it('faz retry com backoff em erro 500 e devolve o sucesso seguinte', async () => {
    const transport = new MockTransport([
      { match: '/campaigns', status: 500, body: { error: { message: 'boom', code: 2 } }, times: 2 },
      { match: '/campaigns', body: { id: '123' } },
    ]);
    const meta = client(transport);
    const resposta = await meta.post<{ id: string }>('act_1/campaigns', { name: 'x' });
    expect(resposta.id).toBe('123');
    expect(transport.requests).toHaveLength(3);
    expect(meta.callLog).toHaveLength(3);
  });

  it('trata rate limit (codigo 4) como erro reaproveitavel e respeita o tempo da Meta', async () => {
    const transport = new MockTransport([
      {
        match: '/campaigns',
        status: 400,
        body: { error: { message: 'limite', code: 4 } },
        headers: {
          'x-business-use-case-usage':
            '{"1":[{"call_count":100,"estimated_time_to_regain_access":5}]}',
        },
        times: 10,
      },
    ]);
    await expect(client(transport).get('act_1/campaigns')).rejects.toBeInstanceOf(RateLimitError);
  });

  it('calcula a espera do rate limit a partir do cabecalho da Meta', async () => {
    const transport = new MockTransport([
      {
        match: '/campaigns',
        status: 429,
        body: { error: { message: 'limite', code: 613 } },
        headers: { 'retry-after': '7' },
        times: 10,
      },
    ]);
    try {
      await client(transport, { META_MAX_RETRIES: '0' }).get('act_1/campaigns');
      expect.unreachable('deveria ter lancado');
    } catch (error) {
      expect((error as RateLimitError).retryAfterMs).toBe(7_000);
    }
  });

  it('nao repete erro definitivo: token invalido (codigo 190) falha na primeira', async () => {
    const transport = new MockTransport([
      {
        match: '/campaigns',
        status: 400,
        body: { error: { message: 'token invalido', code: 190 } },
        times: 10,
      },
    ]);
    await expect(client(transport).get('act_1/campaigns')).rejects.toBeInstanceOf(MetaApiError);
    expect(transport.requests).toHaveLength(1);
  });

  it('erro de permissao (codigo 200) explica quais escopos conferir', async () => {
    const transport = new MockTransport([
      {
        match: '/campaigns',
        status: 403,
        body: { error: { message: 'sem permissao', code: 200 } },
      },
    ]);
    try {
      await client(transport).get('act_1/campaigns');
      expect.unreachable('deveria ter lancado');
    } catch (error) {
      expect((error as MetaApiError).remediation.join(' ')).toContain('ads_management');
    }
  });

  it('preserva fbtrace_id e codigo da Meta para diagnostico', async () => {
    const transport = new MockTransport([
      {
        match: '/campaigns',
        status: 400,
        body: {
          error: {
            message: 'campo invalido',
            code: 100,
            error_subcode: 1487_390,
            fbtrace_id: 'Abc123Trace',
          },
        },
      },
    ]);
    try {
      await client(transport).post('act_1/campaigns', {});
      expect.unreachable('deveria ter lancado');
    } catch (error) {
      const erro = error as MetaApiError;
      expect(erro.metaCode).toBe(100);
      expect(erro.metaSubcode).toBe(1487_390);
      expect(erro.fbtraceId).toBe('Abc123Trace');
    }
  });

  it('usa error_user_msg quando a Meta manda mensagem para humano', async () => {
    const transport = new MockTransport([
      {
        match: '/adsets',
        status: 400,
        body: {
          error: {
            message: 'tecnico',
            error_user_title: 'Orcamento muito baixo',
            error_user_msg: 'O orcamento diario minimo para esta conta e R$ 6,00.',
            code: 100,
          },
        },
      },
    ]);
    await expect(client(transport).post('act_1/adsets', {})).rejects.toThrow(
      /Orcamento muito baixo/,
    );
  });

  it('desiste depois de esgotar as tentativas configuradas', async () => {
    const transport = new MockTransport([
      { match: '/campaigns', status: 500, body: { error: { message: 'boom', code: 2 } }, times: 10 },
    ]);
    await expect(client(transport, { META_MAX_RETRIES: '2' }).get('act_1/campaigns')).rejects.toThrow();
    expect(transport.requests).toHaveLength(3);
  });

  it('sem token configurado, recusa antes de tocar a rede', async () => {
    const config = testConfig({ META_ACCESS_TOKEN: undefined });
    const transport = new MockTransport();
    const meta = new MetaClient({ config, logger, transport, sleep: async () => {} });
    await expect(meta.get('act_1/campaigns')).rejects.toThrow(/META_ACCESS_TOKEN/);
    expect(transport.requests).toHaveLength(0);
  });

  it('recordSimulated marca a chamada como simulada e nao usa a rede', () => {
    const transport = new MockTransport();
    const meta = client(transport);
    meta.recordSimulated('POST', 'act_1/campaigns', { name: 'x' });
    expect(transport.requests).toHaveLength(0);
    expect(meta.callLog[0]!.simulado).toBe(true);
  });

  it('POST envia corpo urlencoded, nao query string', async () => {
    const transport = new MockTransport([{ match: '/campaigns', body: { id: '1' } }]);
    await client(transport).post('act_1/campaigns', { name: 'Campanha', status: 'PAUSED' });
    const request = transport.requests[0]!;
    expect(request.headers?.['Content-Type']).toBe('application/x-www-form-urlencoded');
    expect(transport.bodies()[0]).toMatchObject({ name: 'Campanha', status: 'PAUSED' });
  });
});
