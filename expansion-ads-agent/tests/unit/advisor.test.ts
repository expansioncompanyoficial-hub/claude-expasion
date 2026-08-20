import { describe, expect, it } from 'vitest';
import { DeterministicAdvisor } from '../../src/advisor/deterministic.js';
import { PolicyEngine } from '../../src/policies/engine.js';
import { loadPolicies } from '../../src/policies/loader.js';
import { ClientRegistry } from '../../src/clients/registry.js';
import { PROJECT_ROOT } from '../../src/config/env.js';
import path from 'node:path';

const politicas = loadPolicies(path.join(PROJECT_ROOT, 'policies'), false);
const advisor = new DeterministicAdvisor(new PolicyEngine(politicas));
const cliente = new ClientRegistry(path.join(PROJECT_ROOT, 'clients')).load('example-client');

const BASE = {
  client: cliente,
  modelo: 'whatsapp_conversas',
  objetivo: 'Gerar conversas',
  destino: 'whatsapp',
  dailyBudgetCents: 5000,
  lifetimeBudgetCents: null,
  startTime: '2026-09-01T00:00:00Z',
  stopTime: '2026-09-30T00:00:00Z',
  criativos: 2,
  publicoDescrito: 'Mulheres de 25 a 45 anos que compram roupa casual no bairro',
  remarketing: false,
  temProva: true,
};

describe('gestor determinístico — estratégia', () => {
  it('aprova uma estrutura coerente', () => {
    const conselho = advisor.strategy(BASE);
    expect(conselho.veredito).toBe('pronta');
    expect(conselho.estrutura.conjuntos).toBeGreaterThanOrEqual(1);
    expect(conselho.metricaPrincipal).toMatch(/conversa/i);
  });

  it('bloqueia destino incoerente com o modelo', () => {
    const conselho = advisor.strategy({ ...BASE, destino: 'site' });
    expect(conselho.veredito).toBe('bloqueada');
    expect(conselho.achados.some((a) => a.severidade === 'bloqueio')).toBe(true);
  });

  it('alerta quando a verba não sustenta prospecção e remarketing juntos', () => {
    const conselho = advisor.strategy({ ...BASE, remarketing: true, dailyBudgetCents: 2500 });
    expect(conselho.achados.some((a) => /prospeccao e remarketing/i.test(a.titulo))).toBe(true);
  });

  it('alerta com verba abaixo do piso de aprendizado', () => {
    const conselho = advisor.strategy({ ...BASE, dailyBudgetCents: 800 });
    expect(conselho.achados.some((a) => /aprendizado/i.test(a.titulo))).toBe(true);
  });

  it('alerta com janela curta demais para julgar', () => {
    const conselho = advisor.strategy({
      ...BASE,
      stopTime: '2026-09-04T00:00:00Z',
    });
    expect(conselho.achados.some((a) => /janela/i.test(a.titulo))).toBe(true);
  });

  it('recomenda mais de um criativo quando só há um', () => {
    const conselho = advisor.strategy({ ...BASE, criativos: 1 });
    expect(conselho.achados.some((a) => /criativo so nao permite teste/i.test(a.titulo))).toBe(
      true,
    );
  });

  it('alerta quando há criativos demais dividindo a verba', () => {
    const conselho = advisor.strategy({ ...BASE, criativos: 8 });
    expect(conselho.achados.some((a) => /dividem a verba/i.test(a.titulo))).toBe(true);
  });

  it('marca cada achado com a origem da informação', () => {
    const conselho = advisor.strategy(BASE);
    for (const achado of conselho.achados) {
      expect(['dado_real', 'calculo', 'recomendacao', 'inferencia']).toContain(achado.origem);
    }
  });

  it('é determinístico: mesma entrada, mesma saída', () => {
    expect(JSON.stringify(advisor.strategy(BASE))).toBe(JSON.stringify(advisor.strategy(BASE)));
  });
});

describe('gestor determinístico — público', () => {
  it('bloqueia campanha sem região', () => {
    const conselho = advisor.audience({
      client: cliente,
      faixaEtaria: '25-45',
      generos: 'feminino',
      interesses: [],
      regioes: [],
      remarketing: false,
    });
    expect(conselho.achados.some((a) => a.severidade === 'bloqueio')).toBe(true);
  });

  it('alerta com faixa etária estreita demais', () => {
    const conselho = advisor.audience({
      client: cliente,
      faixaEtaria: '30-34',
      generos: 'feminino',
      interesses: [],
      regioes: ['BR'],
      remarketing: false,
    });
    expect(conselho.achados.some((a) => /estreita/i.test(a.titulo))).toBe(true);
  });

  it('alerta com interesses empilhados demais', () => {
    const conselho = advisor.audience({
      client: cliente,
      faixaEtaria: '25-45',
      generos: 'feminino',
      interesses: Array.from({ length: 12 }, (_, i) => `interesse ${i}`),
      regioes: ['BR'],
      remarketing: false,
    });
    expect(conselho.achados.some((a) => /empilhados/i.test(a.titulo))).toBe(true);
    // Corta em seis para o público não ficar difuso.
    expect(conselho.sugestao.interesses).toHaveLength(6);
  });
});

describe('gestor determinístico — criativo', () => {
  it('reconhece vertical como compatível com Stories e Reels', () => {
    const analise = advisor.creative({
      arquivo: 'v.mp4',
      largura: 1080,
      altura: 1920,
      tipo: 'video',
      bytes: 5_000_000,
    });
    expect(analise.compatibilidade.stories).toBe(true);
    expect(analise.compatibilidade.reels).toBe(true);
  });

  it('reconhece quadrado como bom no Feed e ruim em Stories', () => {
    const analise = advisor.creative({
      arquivo: 'q.png',
      largura: 1080,
      altura: 1080,
      tipo: 'imagem',
      bytes: 900_000,
    });
    expect(analise.compatibilidade.feed).toBe(true);
    expect(analise.compatibilidade.quadrado).toBe(true);
    expect(analise.compatibilidade.stories).toBe(false);
  });

  it('declara o que não avaliou em vez de simular análise visual', () => {
    const analise = advisor.creative({
      arquivo: 'v.mp4',
      largura: 1080,
      altura: 1920,
      tipo: 'video',
      bytes: 5_000_000,
    });
    expect(analise.naoAvaliado.length).toBeGreaterThan(0);
    expect(analise.naoAvaliado.join(' ')).toMatch(/gancho/i);
    // Nenhum achado afirma ter avaliado o conteúdo visual.
    expect(analise.achados.every((a) => !/gancho|legibilidade/i.test(a.titulo))).toBe(true);
  });

  it('avisa quando não conseguiu ler dimensões, sem inventar compatibilidade', () => {
    const analise = advisor.creative({
      arquivo: 'x.mp4',
      largura: null,
      altura: null,
      tipo: 'video',
      bytes: 1000,
    });
    expect(analise.achados.some((a) => a.origem === 'inferencia')).toBe(true);
    expect(analise.compatibilidade.feed).toBe(false);
    expect(analise.compatibilidade.stories).toBe(false);
  });
});

describe('gestor determinístico — copy', () => {
  it('monta sugestões a partir do briefing e declara que não usou modelo', () => {
    const conselho = advisor.copy({
      modelo: 'whatsapp_conversas',
      produto: 'Coleção primavera a partir de R$ 89,90',
      diferenciais: ['Troca grátis em 30 dias'],
      provas: ['Nota 4,8 no Google'],
      criativos: ['a.png', 'b.png'],
      nomeCliente: 'Loja Exemplo',
    });

    expect(conselho.geradoPorModelo).toBe(false);
    expect(conselho.sugestoes).toHaveLength(2);
    expect(conselho.sugestoes[0]?.texto).toContain('Coleção primavera');
    expect(conselho.sugestoes[0]?.origem).toBe('recomendacao');
  });

  it('recomenda preencher provas quando não há nenhuma', () => {
    const conselho = advisor.copy({
      modelo: 'whatsapp_conversas',
      produto: 'Coleção',
      diferenciais: [],
      provas: [],
      criativos: ['a.png'],
      nomeCliente: 'Loja',
    });
    expect(conselho.achados.some((a) => /prova/i.test(a.titulo))).toBe(true);
  });
});
