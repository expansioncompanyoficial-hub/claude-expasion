import { mkdtempSync, writeFileSync, mkdirSync, cpSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createContext, type AgentContext, type CreateContextOptions } from '../../src/context.js';
import { loadConfig, PROJECT_ROOT, type AppConfig } from '../../src/config/env.js';
import { openDatabase } from '../../src/database/db.js';
import { clearSecrets } from '../../src/security/secrets.js';
import { resetPolicyCache } from '../../src/policies/loader.js';

export interface TestEnvOverrides {
  readonly [key: string]: string | undefined;
}

/** Config isolada: banco em memoria, logs desligados, dry-run explicito. */
export function testConfig(overrides: TestEnvOverrides = {}): AppConfig {
  clearSecrets();
  resetPolicyCache();
  return loadConfig({
    DRY_RUN: 'true',
    DB_DRIVER: 'memory',
    DB_PATH: ':memory:',
    LOG_LEVEL: 'silent',
    LOG_DIR: path.join(tmpdir(), 'expansion-ads-tests-logs'),
    OPERATOR_ID: 'teste',
    META_GRAPH_API_VERSION: 'v26.0',
    CLIENTS_DIR: path.join(PROJECT_ROOT, 'clients'),
    BRIEFS_DIR: path.join(PROJECT_ROOT, 'briefs'),
    CREATIVES_DIR: path.join(PROJECT_ROOT, 'creatives'),
    POLICIES_DIR: path.join(PROJECT_ROOT, 'policies'),
    REPORTS_DIR: mkdtempSync(path.join(tmpdir(), 'expansion-reports-')),
    ...overrides,
  } as NodeJS.ProcessEnv);
}

export function makeContext(
  overrides: TestEnvOverrides = {},
  options: Omit<CreateContextOptions, 'config' | 'db'> = {},
): AgentContext {
  const config = testConfig(overrides);
  return createContext({
    ...options,
    config,
    db: openDatabase({ driver: 'memory', path: ':memory:' }),
    logStream: 'none',
  });
}

/**
 * Copia clientes/criativos/politicas para um sandbox e devolve overrides.
 * Usado para testar cadastro invalido sem sujar o repositorio.
 */
export function sandboxDirs(): {
  root: string;
  clients: string;
  creatives: string;
  briefs: string;
  overrides: TestEnvOverrides;
} {
  const root = mkdtempSync(path.join(tmpdir(), 'expansion-sandbox-'));
  const clients = path.join(root, 'clients');
  const creatives = path.join(root, 'creatives');
  const briefs = path.join(root, 'briefs');
  mkdirSync(clients, { recursive: true });
  mkdirSync(creatives, { recursive: true });
  mkdirSync(briefs, { recursive: true });
  cpSync(path.join(PROJECT_ROOT, 'clients'), clients, { recursive: true });
  cpSync(path.join(PROJECT_ROOT, 'creatives'), creatives, { recursive: true });

  return {
    root,
    clients,
    creatives,
    briefs,
    overrides: { CLIENTS_DIR: clients, CREATIVES_DIR: creatives, BRIEFS_DIR: briefs },
  };
}

export function writeBrief(dir: string, name: string, content: string): string {
  const file = path.join(dir, name);
  writeFileSync(file, content, 'utf8');
  return file;
}

/** Briefing valido do modelo WhatsApp, com campos sobrescrevíveis. */
export function briefWhatsApp(fields: Record<string, string> = {}): string {
  const base: Record<string, string> = {
    cliente: 'example-client',
    nome_campanha: 'Campanha de Teste WhatsApp',
    modelo: 'whatsapp_conversas',
    objetivo_comercial: 'Gerar conversas no WhatsApp',
    produto_oferta: 'Colecao teste',
    publico: 'Mulheres 25-45 interessadas em moda',
    regioes: 'BR',
    faixa_etaria: '25-45',
    generos: 'feminino',
    orcamento_diario: 'R$ 50,00',
    data_inicio: '2026-09-01',
    data_encerramento: '2026-09-30',
    destino: 'whatsapp',
    whatsapp: '+55 11 90000-0000',
    mensagem_whatsapp: 'Oi! Quero saber mais.',
    meta: 'CPL: 25',
  };
  const merged = { ...base, ...fields };
  const linhas = Object.entries(merged)
    .filter(([, value]) => value !== '')
    .map(([key, value]) => `- ${key}: ${value}`)
    .join('\n');

  return `# Briefing de teste

## Dados

${linhas}

## Criativos

- vestido-primavera-quadrado.png
- blusa-linho-vertical.png

## Copies

### copy-1

- criativo: vestido-primavera-quadrado.png
- titulo: Titulo de teste
- descricao: Descricao de teste
- texto: Texto principal do anuncio de teste, com tamanho suficiente para passar.

### copy-2

- criativo: blusa-linho-vertical.png
- titulo: Outro titulo
- descricao: Outra descricao
- texto: Segundo texto principal do anuncio de teste, tambem com tamanho suficiente.
`;
}

/**
 * Cadastra uma cliente REAL (config.json) no sandbox.
 * Necessario para exercitar criacao fora do dry-run: o sistema recusa
 * criacao real com cliente de exemplo.
 */
export function realClient(clientsDir: string, id = 'cliente-real', creativesDir?: string): string {
  const dir = path.join(clientsDir, id);
  mkdirSync(dir, { recursive: true });
  if (creativesDir) {
    cpSync(path.join(creativesDir, 'example-client'), path.join(creativesDir, id), {
      recursive: true,
    });
  }
  writeFileSync(
    path.join(dir, 'config.json'),
    JSON.stringify(
      {
        id,
        nome: 'Cliente Real de Teste',
        status: 'active',
        meta: {
          adAccountId: 'act_100000000000001',
          businessId: '200000000000002',
          pageId: '300000000000003',
          instagramId: '400000000000004',
          pixelId: '500000000000005',
          datasetId: null,
          whatsapp: { numero: '+55 11 90000-0000', wabaId: null },
        },
        dominio: 'lojaexemplo.com.br',
        urlsPermitidas: ['https://lojaexemplo.com.br'],
        moeda: 'BRL',
        fusoHorario: 'America/Sao_Paulo',
        limites: { diarioCents: 20_000, mensalCents: 400_000 },
        objetivosPermitidos: ['OUTCOME_LEADS', 'OUTCOME_SALES', 'OUTCOME_TRAFFIC'],
        modelosPermitidos: ['whatsapp_conversas', 'leads_formulario', 'vendas_site'],
        metas: { cpaCents: 8_000, cplCents: 2_500, roas: 3 },
      },
      null,
      2,
    ),
    'utf8',
  );
  return id;
}

/** Relogio controlavel para testar validade de aprovacao. */
export function fakeClock(startIso: string): {
  clock: () => Date;
  advanceHours: (h: number) => void;
} {
  let current = new Date(startIso).getTime();
  return {
    clock: () => new Date(current),
    advanceHours: (h: number) => {
      current += h * 3_600_000;
    },
  };
}
