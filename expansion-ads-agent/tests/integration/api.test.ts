import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import type { AddressInfo } from 'node:net';
import { montarServidor, type ServidorMontado } from '../../src/api/server.js';
import { hashSenha } from '../../src/api/auth.js';
import { openDatabase } from '../../src/database/db.js';
import { sandboxDirs, testConfig } from '../helpers/context.js';

/**
 * Testes da camada HTTP.
 *
 * Nenhum toca a Meta: o transporte é o mock. As travas verificadas aqui são as
 * mesmas do backend — a API não pode afrouxar nenhuma delas.
 */

const SENHA = 'senha-de-teste-longa-123';

let servidor: ServidorMontado;
let base: string;
let sandbox: ReturnType<typeof sandboxDirs>;

const cookies: Record<string, string> = {};

async function chamar(
  caminho: string,
  opcoes: { metodo?: string; corpo?: unknown; papel?: string } = {},
): Promise<{ status: number; corpo: any }> {
  const resposta = await fetch(`${base}${caminho}`, {
    method: opcoes.metodo ?? 'GET',
    headers: {
      ...(opcoes.corpo !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(opcoes.papel && cookies[opcoes.papel] ? { Cookie: cookies[opcoes.papel]! } : {}),
    },
    ...(opcoes.corpo !== undefined ? { body: JSON.stringify(opcoes.corpo) } : {}),
  });
  const texto = await resposta.text();
  return { status: resposta.status, corpo: texto ? JSON.parse(texto) : null };
}

async function entrar(email: string, apelido: string): Promise<void> {
  const resposta = await fetch(`${base}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha: SENHA }),
  });
  const cookie = resposta.headers.get('set-cookie');
  if (cookie) cookies[apelido] = cookie.split(';')[0]!;
}

beforeAll(async () => {
  sandbox = sandboxDirs();

  const usuarios = [
    {
      id: 'u1',
      nome: 'Visual',
      email: 'visual@t.local',
      papel: 'visualizador',
      senhaHash: hashSenha(SENHA),
      ativo: true,
    },
    {
      id: 'u2',
      nome: 'Opera',
      email: 'opera@t.local',
      papel: 'operador',
      senhaHash: hashSenha(SENHA),
      ativo: true,
    },
    {
      id: 'u3',
      nome: 'Gere',
      email: 'gere@t.local',
      papel: 'gestor',
      senhaHash: hashSenha(SENHA),
      ativo: true,
    },
    {
      id: 'u4',
      nome: 'Admin',
      email: 'admin@t.local',
      papel: 'admin',
      senhaHash: hashSenha(SENHA),
      ativo: true,
    },
  ];
  writeFileSync(path.join(sandbox.root, 'users.json'), JSON.stringify(usuarios, null, 2));

  const config = testConfig({ ...sandbox.overrides });
  // A raiz do projeto define onde users.json é lido; aponta para o sandbox.
  Object.defineProperty(config.paths, 'root', { value: sandbox.root, writable: false });

  servidor = montarServidor({
    config,
    db: openDatabase({ driver: 'memory', path: ':memory:' }),
    estaticos: null,
  });
  await new Promise<void>((r) => servidor.server.listen(0, () => r()));
  base = `http://127.0.0.1:${(servidor.server.address() as AddressInfo).port}`;

  await entrar('visual@t.local', 'visualizador');
  await entrar('opera@t.local', 'operador');
  await entrar('gere@t.local', 'gestor');
  await entrar('admin@t.local', 'admin');
});

afterAll(() => {
  servidor.fechar();
});

describe('autenticação', () => {
  it('recusa rota protegida sem sessão', async () => {
    const r = await chamar('/api/clients');
    expect(r.status).toBe(401);
    expect(r.corpo.erro.codigo).toBe('SEM_SESSAO');
  });

  it('recusa credencial errada sem revelar se o e-mail existe', async () => {
    const r = await chamar('/api/auth/login', {
      metodo: 'POST',
      corpo: { email: 'opera@t.local', senha: 'errada' },
    });
    const inexistente = await chamar('/api/auth/login', {
      metodo: 'POST',
      corpo: { email: 'naoexiste@t.local', senha: 'errada' },
    });
    expect(r.status).toBe(401);
    expect(inexistente.status).toBe(401);
    expect(r.corpo.erro.mensagem).toBe(inexistente.corpo.erro.mensagem);
  });

  it('a sondagem de sessão é pública e devolve usuario null', async () => {
    const r = await chamar('/api/auth/me');
    expect(r.status).toBe(200);
    expect(r.corpo.usuario).toBeNull();
  });

  it('aceita sessão válida', async () => {
    const r = await chamar('/api/auth/me', { papel: 'operador' });
    expect(r.corpo.usuario.papel).toBe('operador');
  });
});

describe('papéis', () => {
  it('visualizador não cria campanha', async () => {
    const r = await chamar('/api/campaigns/dry-run', {
      metodo: 'POST',
      papel: 'visualizador',
      corpo: {},
    });
    expect(r.status).toBe(403);
    expect(r.corpo.erro.codigo).toBe('PAPEL_INSUFICIENTE');
  });

  it('operador não aprova', async () => {
    const r = await chamar('/api/campaigns/qualquer/approve', {
      metodo: 'POST',
      papel: 'operador',
      corpo: {},
    });
    expect(r.status).toBe(403);
  });

  it('operador não ativa', async () => {
    const r = await chamar('/api/campaigns/qualquer/activate', {
      metodo: 'POST',
      papel: 'operador',
      corpo: { codigo: 'APV-XXXXX', confirmacaoDeCobranca: true },
    });
    expect(r.status).toBe(403);
  });

  it('gestor não vê configuração de admin', async () => {
    const r = await chamar('/api/config', { papel: 'gestor' });
    expect(r.status).toBe(403);
  });

  it('admin vê configuração, sem nenhum segredo', async () => {
    const r = await chamar('/api/config', { papel: 'admin' });
    expect(r.status).toBe(200);
    const texto = JSON.stringify(r.corpo);
    expect(texto).not.toMatch(/scrypt\$/);
    expect(texto).not.toMatch(/senhaHash/);
  });

  it('auditoria exige gestor', async () => {
    expect((await chamar('/api/audit', { papel: 'operador' })).status).toBe(403);
    expect((await chamar('/api/audit', { papel: 'gestor' })).status).toBe(200);
  });
});

describe('travas de negócio', () => {
  it('não existe rota de chamada arbitraria à Graph API', () => {
    const rotas = servidor.api.router.listar().map((r) => r.caminho);
    expect(rotas.some((c) => /raw|graph|proxy|passthrough/i.test(c))).toBe(false);
  });

  it('nenhuma rota apaga campanha, conjunto ou anúncio', () => {
    const rotas = servidor.api.router.listar();
    expect(rotas.some((r) => r.metodo === 'DELETE')).toBe(false);
  });

  it('criação exige confirmação consciente', async () => {
    const r = await chamar('/api/campaigns', {
      metodo: 'POST',
      papel: 'operador',
      corpo: { form: {}, confirmacao: false },
    });
    expect(r.status).toBe(422);
  });

  it('DRY_RUN=true impede a plataforma de criar, ativar ou pausar', async () => {
    // O ambiente de teste roda com DRY_RUN=true. A plataforma precisa honrar
    // a mesma trava que a CLI honra: sem isto, a barra lateral exibia
    // "Dry-run ligado" enquanto o botão criava campanha de verdade.
    const criar = await chamar('/api/campaigns', {
      metodo: 'POST',
      papel: 'operador',
      corpo: { form: {}, confirmacao: true },
    });
    expect(criar.status).toBe(422);
    expect(criar.corpo.erro.codigo).toBe('DRY_RUN_LIGADO');

    const ativar = await chamar('/api/campaigns/x/activate', {
      metodo: 'POST',
      papel: 'gestor',
      corpo: { codigo: 'APV-AAAAA-BBBBB-CCCCC-DDDDD', confirmacaoDeCobranca: true },
    });
    expect(ativar.status).toBe(422);
    expect(ativar.corpo.erro.codigo).toBe('DRY_RUN_LIGADO');

    const pausar = await chamar('/api/campaigns/x/pause', {
      metodo: 'POST',
      papel: 'gestor',
      corpo: { motivo: 'teste de trava' },
    });
    expect(pausar.status).toBe(422);
    expect(pausar.corpo.erro.codigo).toBe('DRY_RUN_LIGADO');
  });

  it('o dry-run continua liberado com DRY_RUN=true', async () => {
    // Só a ESCRITA é barrada: validar e simular são o uso normal do modo.
    const r = await chamar('/api/campaigns/dry-run', {
      metodo: 'POST',
      papel: 'operador',
      corpo: {},
    });
    expect(r.corpo.erro?.codigo).not.toBe('DRY_RUN_LIGADO');
  });

  it('ativação exige código de aprovação e confirmação de cobrança', async () => {
    const semCodigo = await chamar('/api/campaigns/x/activate', {
      metodo: 'POST',
      papel: 'gestor',
      corpo: { confirmacaoDeCobranca: true },
    });
    const semConfirmacao = await chamar('/api/campaigns/x/activate', {
      metodo: 'POST',
      papel: 'gestor',
      corpo: { codigo: 'APV-AAAAA-BBBBB-CCCCC-DDDDD' },
    });
    expect(semCodigo.status).toBe(422);
    expect(semConfirmacao.status).toBe(422);
  });

  it('cliente inexistente devolve 404 com a lista de cadastradas', async () => {
    const r = await chamar('/api/clients/nao-existe', { papel: 'visualizador' });
    expect(r.status).toBe(404);
    expect(r.corpo.erro.detalhes.clientesDisponiveis).toBeDefined();
  });

  it('upload sem cliente é recusado', async () => {
    const resposta = await fetch(`${base}/api/creatives/upload`, {
      method: 'POST',
      headers: { Cookie: cookies.operador!, 'Content-Type': 'multipart/form-data; boundary=xyz' },
      body: '--xyz--',
    });
    expect(resposta.status).toBe(422);
  });

  it('objetivo técnico vem do backend, com os indisponíveis marcados', async () => {
    const r = await chamar('/api/templates', { papel: 'visualizador' });
    const disponiveis = r.corpo.objetivosComerciais.filter((o: any) => o.disponivel);
    const indisponiveis = r.corpo.objetivosComerciais.filter((o: any) => !o.disponivel);

    expect(disponiveis.length).toBeGreaterThan(0);
    expect(indisponiveis.length).toBeGreaterThan(0);
    // Todo indisponível explica o porquê, em vez de sumir da lista.
    for (const o of indisponiveis) expect(o.indisponivelPorque).toBeTruthy();
    // Todo disponível traz a tradução técnica vinda do modelo.
    for (const o of disponiveis) expect(o.tecnico.objective).toMatch(/^OUTCOME_/);
  });
});

describe('cadastro de cliente pela API', () => {
  it('exige admin', async () => {
    const r = await chamar('/api/clients', { metodo: 'POST', papel: 'gestor', corpo: {} });
    expect(r.status).toBe(403);
  });

  it('recusa cadastro invalido com o campo apontado', async () => {
    const r = await chamar('/api/clients', {
      metodo: 'POST',
      papel: 'admin',
      corpo: { id: 'X MAIUSCULO', nome: 'x' },
    });
    expect(r.status).toBe(422);
    expect(r.corpo.erro.detalhes.issues.length).toBeGreaterThan(0);
  });

  it('grava e recusa duplicata', async () => {
    const cadastro = {
      id: 'loja-teste-api',
      nome: 'Loja Teste',
      status: 'active',
      meta: {
        adAccountId: 'act_999888777666555',
        pageId: '123456789012',
        instagramId: null,
        pixelId: null,
        whatsapp: { numero: '+55 11 90000-0000', wabaId: null },
      },
      dominio: null,
      urlsPermitidas: [],
      moeda: 'BRL',
      fusoHorario: 'America/Sao_Paulo',
      limites: { diarioCents: 2000, mensalCents: 60000 },
      objetivosPermitidos: ['OUTCOME_LEADS'],
      modelosPermitidos: ['whatsapp_conversas'],
    };

    const primeiro = await chamar('/api/clients', {
      metodo: 'POST',
      papel: 'admin',
      corpo: cadastro,
    });
    expect(primeiro.status).toBe(201);
    expect(primeiro.corpo.cliente.conta).toBe('act_999888777666555');

    const segundo = await chamar('/api/clients', {
      metodo: 'POST',
      papel: 'admin',
      corpo: cadastro,
    });
    expect(segundo.status).toBe(409);
  });

  it('descoberta de ativos exige operador', async () => {
    expect((await chamar('/api/meta/discover', { papel: 'visualizador' })).status).toBe(403);
  });

  it('sem credencial, a descoberta devolve estado — não erro', async () => {
    // Falta de token é situação esperada, não falha: 503 faria o navegador
    // registrar erro de console para algo que a tela já trata.
    const r = await chamar('/api/meta/discover', { papel: 'operador' });
    expect(r.status).toBe(200);
    expect(r.corpo.disponivel).toBe(false);
    expect(r.corpo.motivo).toMatch(/META_ACCESS_TOKEN/);
    expect(r.corpo.contas).toEqual([]);
  });
});

describe('resposta nunca vaza segredo', () => {
  it('o token da Meta não aparece em nenhuma resposta', async () => {
    const caminhos = ['/api/meta/status', '/api/clients', '/api/overview', '/api/templates'];
    for (const caminho of caminhos) {
      const r = await chamar(caminho, { papel: 'admin' });
      const texto = JSON.stringify(r.corpo);
      expect(texto).not.toMatch(/\bEA[A-Za-z0-9_-]{20,}/);
      expect(texto).not.toMatch(/"accessToken"/);
    }
  });

  it('o status da Meta mostra só a marca do token', async () => {
    const r = await chamar('/api/meta/status', { papel: 'visualizador' });
    expect(r.corpo).toHaveProperty('impressaoDigital');
    expect(r.corpo.impressaoDigital).toMatch(/ausente|\*\*\*/);
  });
});

describe('erros', () => {
  it('rota inexistente devolve 404 em JSON', async () => {
    const r = await chamar('/api/nao-existe', { papel: 'admin' });
    expect(r.status).toBe(404);
    expect(r.corpo.erro.codigo).toBe('ROTA_NAO_ENCONTRADA');
  });

  it('JSON malformado devolve mensagem em português, não stack', async () => {
    const resposta = await fetch(`${base}/api/campaigns/dry-run`, {
      method: 'POST',
      headers: { Cookie: cookies.operador!, 'Content-Type': 'application/json' },
      body: '{ isso nao e json',
    });
    const corpo = (await resposta.json()) as { erro: { mensagem: string } };
    expect(resposta.status).toBe(422);
    expect(corpo.erro.mensagem).toMatch(/JSON valido/i);
    expect(JSON.stringify(corpo)).not.toMatch(/at Object\.|node:internal/);
  });
});
