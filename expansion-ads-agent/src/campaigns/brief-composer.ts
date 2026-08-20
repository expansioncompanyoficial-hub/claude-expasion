import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import { ValidationError } from '../shared/errors.js';
import { parseBriefMarkdown, buildBrief, type BriefLoadResult } from './brief-parser.js';

/**
 * Compositor de briefing.
 *
 * O assistente da plataforma produz dados estruturados; todo o caminho de
 * validacao e criacao do backend fala `briefPath`. Em vez de criar uma segunda
 * validacao para a interface — que divergiria da CLI na primeira mudanca de
 * regra —, os dados sao serializados no MESMO markdown canonico e seguem pelo
 * caminho existente, sem alteracao.
 *
 * Efeito colateral desejado: todo briefing feito pela interface vira arquivo em
 * `briefs/`, inspecionavel, versionavel e reexecutavel pela CLI.
 */

export const copySchema = z.object({
  ref: z.string().trim().min(1),
  titulo: z.string().trim().min(1),
  descricao: z.string().trim().min(1),
  texto: z.string().trim().min(1),
  criativo: z.string().trim().min(1),
});

export const briefFormSchema = z.object({
  cliente: z.string().trim().min(1),
  nome_campanha: z.string().trim().min(1),
  modelo: z.string().trim().min(1),
  objetivo_comercial: z.string().trim().min(1),
  produto_oferta: z.string().trim().min(1),
  publico: z.string().trim().min(1),
  regioes: z.string().trim().min(1),
  faixa_etaria: z
    .string()
    .trim()
    .regex(/^\d{2}\s*[-a]\s*\d{2}$/),
  generos: z.string().trim().min(1),
  interesses: z.string().trim().optional(),
  orcamento_diario: z.string().trim().optional(),
  orcamento_total: z.string().trim().optional(),
  data_inicio: z.string().trim().min(1),
  data_encerramento: z.string().trim().optional(),
  destino: z.string().trim().min(1),
  whatsapp: z.string().trim().optional(),
  mensagem_whatsapp: z.string().trim().optional(),
  url: z.string().trim().optional(),
  pixel_id: z.string().trim().optional(),
  evento: z.string().trim().optional(),
  formulario_id: z.string().trim().optional(),
  meta: z.string().trim().optional(),
  criativos: z.array(z.string().trim().min(1)).min(1),
  copies: z.array(copySchema).min(1),
  diferenciais: z.array(z.string().trim()).default([]),
  provas: z.array(z.string().trim()).default([]),
  restricoes: z.array(z.string().trim()).default([]),
  observacoes: z.array(z.string().trim()).default([]),
});

export type BriefForm = z.infer<typeof briefFormSchema>;

/** Ordem dos campos no markdown. Estavel para o hash do briefing ser estavel. */
const ORDEM_CAMPOS: ReadonlyArray<keyof BriefForm> = [
  'cliente',
  'nome_campanha',
  'modelo',
  'objetivo_comercial',
  'produto_oferta',
  'publico',
  'regioes',
  'faixa_etaria',
  'generos',
  'interesses',
  'orcamento_diario',
  'orcamento_total',
  'data_inicio',
  'data_encerramento',
  'destino',
  'whatsapp',
  'mensagem_whatsapp',
  'url',
  'pixel_id',
  'evento',
  'formulario_id',
  'meta',
];

function secaoLista(titulo: string, itens: readonly string[]): string {
  const limpos = itens.map((i) => i.trim()).filter(Boolean);
  if (limpos.length === 0) return '';
  return `\n## ${titulo}\n\n${limpos.map((i) => `- ${i}`).join('\n')}\n`;
}

/** Serializa o formulario no markdown canonico que `parseBriefMarkdown` le. */
export function comporBriefingMarkdown(form: BriefForm): string {
  const linhas: string[] = [`# Briefing — ${form.nome_campanha}`, '', '## Dados', ''];

  for (const campo of ORDEM_CAMPOS) {
    const valor = form[campo];
    if (typeof valor !== 'string' || valor.trim() === '') continue;
    // Valor multilinha quebraria a gramatica "- chave: valor".
    linhas.push(`- ${campo}: ${valor.replace(/\s*\n\s*/g, ' ').trim()}`);
  }

  linhas.push('');
  linhas.push('## Criativos');
  linhas.push('');
  for (const arquivo of form.criativos) linhas.push(`- ${arquivo}`);

  linhas.push('');
  linhas.push('## Copies');
  for (const copy of form.copies) {
    linhas.push('');
    linhas.push(`### ${copy.ref}`);
    linhas.push('');
    linhas.push(`- titulo: ${copy.titulo.replace(/\s*\n\s*/g, ' ').trim()}`);
    linhas.push(`- descricao: ${copy.descricao.replace(/\s*\n\s*/g, ' ').trim()}`);
    linhas.push(`- texto: ${copy.texto.replace(/\s*\n\s*/g, ' ').trim()}`);
    linhas.push(`- criativo: ${copy.criativo}`);
  }

  let markdown = `${linhas.join('\n')}\n`;
  markdown += secaoLista('Diferenciais', form.diferenciais);
  markdown += secaoLista('Provas', form.provas);
  markdown += secaoLista('Restricoes', form.restricoes);
  markdown += secaoLista('Observacoes', form.observacoes);

  return markdown;
}

/** Valida o formulario pelo caminho canonico, sem gravar arquivo. */
export function validarFormulario(form: BriefForm, moedaCliente: string): BriefLoadResult {
  const markdown = comporBriefingMarkdown(form);
  return buildBrief(parseBriefMarkdown(markdown), { moedaCliente, sourcePath: null });
}

/** Nome de arquivo previsivel e sem surpresa de sistema de arquivos. */
export function nomeDeArquivo(form: BriefForm, agora: Date): string {
  const base = form.nome_campanha
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  const dia = agora.toISOString().slice(0, 10);
  return `${form.cliente}-${base || 'campanha'}-${dia}.md`;
}

/**
 * Grava o briefing em `briefs/` e devolve o caminho.
 * A partir daqui o fluxo e identico ao da CLI.
 */
export function gravarBriefing(
  form: BriefForm,
  briefsDir: string,
  agora: Date,
): { caminho: string; markdown: string } {
  const markdown = comporBriefingMarkdown(form);
  const nome = nomeDeArquivo(form, agora);
  const caminho = path.join(briefsDir, nome);

  const resolvido = path.resolve(caminho);
  if (!resolvido.startsWith(path.resolve(briefsDir) + path.sep)) {
    throw new ValidationError('Caminho de briefing invalido.', { nome });
  }

  mkdirSync(briefsDir, { recursive: true });
  writeFileSync(resolvido, markdown, 'utf8');
  return { caminho: resolvido, markdown };
}
