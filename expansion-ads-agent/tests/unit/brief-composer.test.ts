import { describe, expect, it } from 'vitest';
import {
  briefFormSchema,
  comporBriefingMarkdown,
  nomeDeArquivo,
  validarFormulario,
} from '../../src/campaigns/brief-composer.js';
import { parseBriefMarkdown } from '../../src/campaigns/brief-parser.js';

const FORM = briefFormSchema.parse({
  cliente: 'example-client',
  nome_campanha: 'Coleção Primavera — WhatsApp',
  modelo: 'whatsapp_conversas',
  objetivo_comercial: 'Gerar conversas qualificadas no WhatsApp',
  produto_oferta: 'Coleção primavera a partir de R$ 89,90',
  publico: 'Mulheres que compram roupa casual',
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
  criativos: ['vestido-primavera-quadrado.png'],
  copies: [
    {
      ref: 'copy-1',
      titulo: 'Coleção primavera',
      descricao: 'Troca grátis em 30 dias',
      texto: 'Chegou a coleção primavera. Chama no WhatsApp.',
      criativo: 'vestido-primavera-quadrado.png',
    },
  ],
  diferenciais: ['Troca grátis em 30 dias'],
  provas: ['Nota 4,8 no Google'],
  restricoes: [],
  observacoes: [],
});

describe('compositor de briefing', () => {
  it('gera markdown que o parser canônico entende', () => {
    const markdown = comporBriefingMarkdown(FORM);
    const documento = parseBriefMarkdown(markdown);

    expect(documento.campos.cliente).toBe('example-client');
    expect(documento.campos.modelo).toBe('whatsapp_conversas');
    expect(documento.campos.orcamento_diario).toBe('R$ 50,00');
    expect(documento.listas.criativos).toEqual(['vestido-primavera-quadrado.png']);
    expect(documento.copies).toHaveLength(1);
    expect(documento.copies[0]?.criativo).toBe('vestido-primavera-quadrado.png');
  });

  it('valida pelo mesmo caminho da CLI, sem gravar arquivo', () => {
    const resultado = validarFormulario(FORM, 'BRL');
    expect(resultado.brief.modelo).toBe('whatsapp_conversas');
    // R$ 50,00 -> 5000 centavos. A conversão é a mesma do arquivo em disco.
    expect(resultado.brief.orcamentoDiarioCents).toBe(5000);
    expect(resultado.sourcePath).toBeNull();
  });

  it('recusa formulário incompleto com a mesma mensagem do briefing em arquivo', () => {
    const incompleto = { ...FORM, produto_oferta: '' } as typeof FORM;
    expect(() => validarFormulario(incompleto, 'BRL')).toThrowError(/incompleto|obrigatorio/i);
  });

  it('achata quebras de linha para não romper a gramática "- chave: valor"', () => {
    const comQuebra = { ...FORM, produto_oferta: 'Linha um\nLinha dois' };
    const markdown = comporBriefingMarkdown(comQuebra);
    const documento = parseBriefMarkdown(markdown);
    expect(documento.campos.produto_oferta).toBe('Linha um Linha dois');
  });

  it('o hash do briefing é estável para a mesma entrada', () => {
    const a = validarFormulario(FORM, 'BRL').briefHash;
    const b = validarFormulario({ ...FORM }, 'BRL').briefHash;
    expect(a).toBe(b);
  });

  it('muda o hash quando o orçamento muda — a aprovação depende disso', () => {
    const a = validarFormulario(FORM, 'BRL').briefHash;
    const b = validarFormulario({ ...FORM, orcamento_diario: 'R$ 80,00' }, 'BRL').briefHash;
    expect(a).not.toBe(b);
  });

  it('gera nome de arquivo sem acento, espaço ou travessia de caminho', () => {
    const nome = nomeDeArquivo(
      { ...FORM, nome_campanha: '../../etc/Coleção Primavera!' },
      new Date('2026-09-01T12:00:00Z'),
    );
    expect(nome).not.toContain('/');
    expect(nome).not.toContain('..');
    expect(nome).toMatch(/^example-client-[a-z0-9-]+-2026-09-01\.md$/);
  });

  it('omite campos vazios em vez de escrever linha em branco', () => {
    const semUrl = comporBriefingMarkdown(FORM);
    expect(semUrl).not.toContain('- url:');
    expect(semUrl).not.toContain('- pixel_id:');
  });
});
