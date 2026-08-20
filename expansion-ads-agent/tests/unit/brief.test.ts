import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { buildBrief, parseBriefMarkdown, peekClientId } from '../../src/campaigns/brief-parser.js';
import { PROJECT_ROOT } from '../../src/config/env.js';
import { ValidationError } from '../../src/shared/errors.js';
import { briefWhatsApp } from '../helpers/context.js';

const build = (markdown: string) =>
  buildBrief(parseBriefMarkdown(markdown), { moedaCliente: 'BRL', sourcePath: 'teste.md' });

describe('parser e validacao do briefing', () => {
  it('le o briefing de exemplo do repositorio', () => {
    const markdown = readFileSync(path.join(PROJECT_ROOT, 'briefs', 'campaign.example.md'), 'utf8');
    const { brief } = build(markdown);

    expect(brief.cliente).toBe('example-client');
    expect(brief.modelo).toBe('whatsapp_conversas');
    expect(brief.orcamentoDiarioCents).toBe(5_000);
    expect(brief.criativos.length).toBeGreaterThan(0);
    expect(brief.copies.length).toBeGreaterThan(0);
  });

  it('converte R$ 50,00 para 5000 centavos', () => {
    expect(build(briefWhatsApp({ orcamento_diario: 'R$ 50,00' })).brief.orcamentoDiarioCents).toBe(5_000);
  });

  it('converte valor com separador de milhar', () => {
    expect(build(briefWhatsApp({ orcamento_diario: 'R$ 1.250,50' })).brief.orcamentoDiarioCents).toBe(
      125_050,
    );
  });

  it.each([
    'cliente',
    'nome_campanha',
    'modelo',
    'objetivo_comercial',
    'publico',
    'data_inicio',
    'destino',
    'meta',
  ])('para e diz exatamente o que falta quando "%s" esta ausente', (campo) => {
    const markdown = briefWhatsApp({ [campo]: '' });
    try {
      build(markdown);
      expect.unreachable('deveria ter reprovado o briefing incompleto');
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      const detalhes = (error as ValidationError).details as { camposFaltando: string[] };
      expect(detalhes.camposFaltando).toContain(campo);
    }
  });

  it('nao inventa valor: campo ausente vira erro, nunca padrao silencioso', () => {
    const erro = (() => {
      try {
        build(briefWhatsApp({ publico: '' }));
        return null;
      } catch (error) {
        return error as ValidationError;
      }
    })();

    expect(erro).not.toBeNull();
    expect(erro!.remediation.join(' ')).toContain('nao preenche campo faltante');
  });

  it('exige orcamento diario OU total, e diz qual alternativa aceita', () => {
    try {
      build(briefWhatsApp({ orcamento_diario: '' }));
      expect.unreachable('deveria ter reprovado o briefing sem orcamento');
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      const detalhado = JSON.stringify((error as ValidationError).toJSON());
      expect(detalhado).toMatch(/orcamento_diario|orcamento_total/);
    }
  });

  it('aceita briefing com orcamento total no lugar do diario', () => {
    const { brief } = build(
      briefWhatsApp({ orcamento_diario: '', orcamento_total: 'R$ 1.500,00' }),
    );
    expect(brief.orcamentoTotalCents).toBe(150_000);
    expect(brief.orcamentoDiarioCents).toBeNull();
  });

  it('rejeita faixa etaria fora do formato', () => {
    expect(() => build(briefWhatsApp({ faixa_etaria: 'jovens' }))).toThrow(ValidationError);
  });

  it('rejeita meta sem tipo reconhecido', () => {
    expect(() => build(briefWhatsApp({ meta: 'ficar famoso' }))).toThrow(ValidationError);
  });

  it('aceita as metas oficiais', () => {
    for (const meta of ['CPL: 25', 'CPA: 80', 'ROAS: 3', 'VENDAS: 50', 'CONVERSAS: 100']) {
      expect(() => build(briefWhatsApp({ meta }))).not.toThrow();
    }
  });

  it('peekClientId encontra a cliente sem validar o resto', () => {
    const file = path.join(PROJECT_ROOT, 'briefs', 'campaign.example.md');
    expect(peekClientId(file)).toBe('example-client');
  });

  it('o hash do briefing muda quando o conteudo muda', () => {
    const a = build(briefWhatsApp()).briefHash;
    const b = build(briefWhatsApp({ orcamento_diario: 'R$ 60,00' })).briefHash;
    expect(a).not.toBe(b);
  });
});
