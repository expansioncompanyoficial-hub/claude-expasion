import { describe, expect, it } from 'vitest';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { buildServer } from '../../src/mcp/server.js';
import { MockTransport } from '../helpers/meta-mock.js';
import { sandboxDirs, testConfig } from '../helpers/context.js';
import { openDatabase } from '../../src/database/db.js';

async function conectar(envOverrides: Record<string, string | undefined> = {}) {
  const sandbox = sandboxDirs();
  const metaTransport = new MockTransport();
  const { server, ctx } = buildServer({
    config: testConfig({ ...sandbox.overrides, ...envOverrides }),
    db: openDatabase({ driver: 'memory', path: ':memory:' }),
    transport: metaTransport,
    logStream: 'none',
  });

  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const client = new Client({ name: 'teste', version: '1.0.0' });
  await Promise.all([client.connect(clientTransport), server.connect(serverTransport)]);

  return { client, ctx, metaTransport, close: async () => { await client.close(); ctx.close(); } };
}

describe('servidor MCP meta-ads', () => {
  it('sobe e lista as ferramentas', async () => {
    const s = await conectar();
    const { tools } = await s.client.listTools();
    expect(tools.length).toBeGreaterThanOrEqual(30);
    await s.close();
  });

  it('expoe todas as ferramentas exigidas no escopo', async () => {
    const s = await conectar();
    const nomes = (await s.client.listTools()).tools.map((t) => t.name);

    const exigidas = [
      'meta_list_ad_accounts',
      'meta_get_account_details',
      'meta_list_pages',
      'meta_list_instagram_accounts',
      'meta_list_pixels_or_datasets',
      'meta_list_campaigns',
      'meta_list_adsets',
      'meta_list_ads',
      'meta_get_campaign_preview',
      'meta_get_insights',
      'meta_check_campaign_status',
      'meta_validate_access',
      'meta_validate_client_assets',
      'meta_validate_campaign_spec',
      'meta_validate_budget',
      'meta_check_duplicate_campaign',
      'meta_validate_destination',
      'meta_validate_creative_files',
      'meta_upload_image',
      'meta_upload_video',
      'meta_create_campaign_paused',
      'meta_create_adset_paused',
      'meta_create_creative',
      'meta_create_ad_paused',
      'meta_request_campaign_approval',
      'meta_activate_approved_campaign',
      'meta_pause_campaign',
      'meta_update_budget_within_policy',
    ];

    for (const nome of exigidas) expect(nomes).toContain(nome);
    await s.close();
  });

  it('NAO expoe nenhuma ferramenta de chamada arbitraria a Graph API', async () => {
    const s = await conectar();
    const nomes = (await s.client.listTools()).tools.map((t) => t.name);

    for (const proibida of ['meta_raw_request', 'meta_request', 'graph_request', 'meta_call']) {
      expect(nomes).not.toContain(proibida);
    }
    for (const nome of nomes) {
      expect(nome).toMatch(/^meta_[a-z_]+$/);
      expect(nome).not.toMatch(/raw|arbitrary|exec|eval|proxy/);
    }
    await s.close();
  });

  it('toda ferramenta tem schema de entrada declarado', async () => {
    const s = await conectar();
    for (const tool of (await s.client.listTools()).tools) {
      expect(tool.inputSchema).toBeDefined();
      expect(tool.description ?? '').not.toBe('');
    }
    await s.close();
  });

  it('meta_validate_access nao vaza o token, so a marca dele', async () => {
    const s = await conectar({ META_ACCESS_TOKEN: 'EAAtoken-secreto-de-teste-1234567890' });
    const resposta = await s.client.callTool({ name: 'meta_validate_access', arguments: {} });
    const texto = JSON.stringify(resposta);

    expect(texto).not.toContain('EAAtoken-secreto-de-teste-1234567890');
    expect(texto).toMatch(/len=|REDIGIDO|\*\*\*/);
    await s.close();
  });

  it('bloqueia conta de anuncios diferente da cadastrada para a cliente', async () => {
    const s = await conectar();
    const resposta = (await s.client.callTool({
      name: 'meta_get_account_details',
      arguments: { clientId: 'example-client', adAccountId: 'act_999999999999999' },
    })) as { isError?: boolean; content: Array<{ text: string }> };

    expect(resposta.isError).toBe(true);
    expect(resposta.content[0]!.text).toMatch(/nao autorizada|NOT_AUTHORIZED/i);
    await s.close();
  });

  it('toda ferramenta que aceita conta valida a conta contra o cadastro da cliente', async () => {
    const s = await conectar();
    const CONTA_ALHEIA = 'act_999999999999999';
    const casos: Array<{ nome: string; args: Record<string, unknown> }> = [
      {
        nome: 'meta_get_account_details',
        args: { clientId: 'example-client', adAccountId: CONTA_ALHEIA },
      },
      {
        nome: 'meta_upload_image',
        args: {
          clientId: 'example-client',
          adAccountId: CONTA_ALHEIA,
          arquivo: 'vestido-primavera-quadrado.png',
        },
      },
      {
        nome: 'meta_upload_video',
        args: { clientId: 'example-client', adAccountId: CONTA_ALHEIA, arquivo: 'video.mp4' },
      },
      {
        nome: 'meta_create_creative',
        args: {
          clientId: 'example-client',
          adAccountId: CONTA_ALHEIA,
          nome: 'Criativo de teste',
          imageHash: 'hash-qualquer',
          titulo: 'Titulo',
          descricao: 'Descricao',
          texto: 'Texto do anuncio',
          link: 'https://lojaexemplo.com.br',
          callToAction: 'SHOP_NOW',
        },
      },
      {
        nome: 'meta_create_ad_paused',
        args: {
          clientId: 'example-client',
          adAccountId: CONTA_ALHEIA,
          nome: 'Anuncio de teste',
          metaAdsetId: '120210000000000002',
          metaCreativeId: '120210000000000003',
        },
      },
    ];

    for (const caso of casos) {
      const resposta = (await s.client.callTool({
        name: caso.nome,
        arguments: caso.args,
      })) as { isError?: boolean; content: Array<{ text: string }> };

      expect(resposta.isError, `${caso.nome} deveria recusar conta nao autorizada`).toBe(true);
      expect(resposta.content[0]!.text, caso.nome).toMatch(/nao autorizada|NOT_AUTHORIZED/i);
    }
    await s.close();
  });

  it('a ferramenta de listar campanhas nem aceita conta: usa sempre a da cliente', async () => {
    const s = await conectar();
    const tool = (await s.client.listTools()).tools.find((t) => t.name === 'meta_list_campaigns')!;
    expect(Object.keys(tool.inputSchema.properties ?? {})).not.toContain('adAccountId');
    await s.close();
  });

  it('bloqueia orcamento acima do limite pela ferramenta de validacao', async () => {
    const s = await conectar();
    const resposta = (await s.client.callTool({
      name: 'meta_validate_budget',
      arguments: {
        clientId: 'example-client',
        adAccountId: 'act_100000000000001',
        orcamentoDiarioCents: 5_000_000,
      },
    })) as { content: Array<{ text: string }>; isError?: boolean };

    expect(JSON.stringify(resposta)).toMatch(/limite|acima/i);
    await s.close();
  });

  it('bloqueia destino fora da allowlist pela ferramenta de validacao', async () => {
    const s = await conectar();
    const resposta = await s.client.callTool({
      name: 'meta_validate_destination',
      arguments: { clientId: 'example-client', tipo: 'site', valor: 'https://site-invasor.com/promo' },
    });
    expect(JSON.stringify(resposta)).toMatch(/allowlist/i);
    await s.close();
  });

  it('recusa parametro fora do schema', async () => {
    const s = await conectar();
    const resposta = (await s.client.callTool({
      name: 'meta_get_account_details',
      arguments: { clientId: 'example-client', adAccountId: 'conta-invalida' },
    })) as { isError?: boolean };
    expect(resposta.isError).toBe(true);
    await s.close();
  });

  it('em dry-run, criar campanha nao faz nenhuma chamada de rede', async () => {
    const s = await conectar();
    await s.client
      .callTool({
        name: 'meta_create_campaign_paused',
        arguments: {
          clientId: 'example-client',
          adAccountId: 'act_100000000000001',
          nome: 'Campanha via MCP',
          objetivo: 'OUTCOME_LEADS',
          orcamentoDiarioCents: 5_000,
          dataInicio: '2026-10-01',
        },
      })
      .catch(() => undefined);

    expect(s.metaTransport.requests).toHaveLength(0);
    await s.close();
  });

  it('as ferramentas de leitura sao marcadas como readOnly', async () => {
    const s = await conectar();
    const tools = (await s.client.listTools()).tools;
    const leitura = tools.filter((t) => t.name.startsWith('meta_list') || t.name.startsWith('meta_get'));

    expect(leitura.length).toBeGreaterThan(0);
    for (const tool of leitura) {
      expect(tool.annotations?.readOnlyHint).toBe(true);
    }
    await s.close();
  });

  it('nenhuma ferramenta exclui nada: so as que gastam dinheiro sao sinalizadas', async () => {
    const s = await conectar();
    const tools = (await s.client.listTools()).tools;

    const destrutivas = tools.filter((t) => t.annotations?.destructiveHint).map((t) => t.name);
    expect(destrutivas.sort()).toEqual([
      'meta_activate_approved_campaign',
      'meta_update_budget_within_policy',
    ]);

    for (const tool of tools) {
      expect(tool.name).not.toMatch(/delete|remove|excluir|archive|apagar/i);
      expect(`${tool.description}`).not.toMatch(/\bexclui\b|\bdeleta\b/i);
    }
    await s.close();
  });
});
