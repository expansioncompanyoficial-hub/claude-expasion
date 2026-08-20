import { readFileSync } from 'node:fs';
import { ValidationError } from '../shared/errors.js';
import { stableHash } from '../shared/ids.js';
import { toMinorUnits } from '../shared/money.js';
import { parseBriefDate } from '../shared/time.js';
import {
  briefSchema,
  CAMPOS_OBRIGATORIOS,
  type CampaignBrief,
  type CopyVariant,
  type GeoTargeting,
} from './brief-schema.js';

export interface ParsedBriefDocument {
  readonly campos: Record<string, string>;
  readonly listas: Record<string, string[]>;
  readonly copies: CopyVariant[];
}

/**
 * Gramatica do briefing (estrita de proposito — nada e adivinhado):
 *
 *   ## Dados
 *   - chave: valor
 *
 *   ## Criativos / Diferenciais / Provas / Restricoes / Observacoes
 *   - item
 *
 *   ## Copies
 *   ### ref-da-copy
 *   - titulo: ...
 *   - descricao: ...
 *   - texto: ...
 *   - criativo: arquivo.jpg
 */
export function parseBriefMarkdown(markdown: string): ParsedBriefDocument {
  const campos: Record<string, string> = {};
  const listas: Record<string, string[]> = {};
  const copies: CopyVariant[] = [];

  let secao = '';
  let dentroDeComentario = false;
  let copyAtual: Partial<CopyVariant> & { ref?: string } = {};

  const encerrarCopy = (): void => {
    if (copyAtual.ref) {
      copies.push({
        ref: copyAtual.ref,
        titulo: copyAtual.titulo ?? '',
        descricao: copyAtual.descricao ?? '',
        texto: copyAtual.texto ?? '',
        criativo: copyAtual.criativo ?? '',
      });
    }
    copyAtual = {};
  };

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;

    // Comentario HTML pode abrir numa linha e fechar em outra. Tudo entre
    // <!-- e --> e ignorado, inclusive linhas que parecem campo do briefing.
    if (dentroDeComentario) {
      if (line.includes('-->')) dentroDeComentario = false;
      continue;
    }
    if (line.startsWith('<!--')) {
      if (!line.includes('-->')) dentroDeComentario = true;
      continue;
    }

    const heading2 = /^##\s+(.+)$/.exec(line);
    if (heading2) {
      encerrarCopy();
      secao = normalizeKey(heading2[1]!);
      if (secao !== 'dados' && secao !== 'copies') listas[secao] ??= [];
      continue;
    }

    const heading3 = /^###\s+(.+)$/.exec(line);
    if (heading3 && secao === 'copies') {
      encerrarCopy();
      copyAtual = { ref: heading3[1]!.trim() };
      continue;
    }

    const bullet = /^[-*]\s+(.*)$/.exec(line);
    if (!bullet) continue;
    const conteudo = bullet[1]!.trim();
    if (!conteudo) continue;

    const pair = /^([A-Za-zÀ-ÿ0-9_ ]+?):\s*(.*)$/.exec(conteudo);

    if (secao === 'dados' && pair) {
      campos[normalizeKey(pair[1]!)] = pair[2]!.trim();
      continue;
    }

    if (secao === 'copies' && pair && copyAtual.ref) {
      const chave = normalizeKey(pair[1]!);
      const valor = pair[2]!.trim();
      if (chave === 'titulo') copyAtual.titulo = valor;
      else if (chave === 'descricao') copyAtual.descricao = valor;
      else if (chave === 'texto') copyAtual.texto = valor;
      else if (chave === 'criativo') copyAtual.criativo = valor;
      continue;
    }

    if (secao && secao !== 'dados' && secao !== 'copies') {
      (listas[secao] ??= []).push(conteudo);
    }
  }

  encerrarCopy();
  return { campos, listas, copies };
}

function normalizeKey(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function splitList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(/[,;]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseMoneyToCents(value: string, currency: string, campo: string): number {
  const cleaned = value
    .replace(/[R$\s\u00A0]/gi, '')
    .replace(/\.(?=\d{3}(\D|$))/g, '')
    .replace(',', '.');
  const parsed = Number(cleaned);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new ValidationError(`Valor invalido em "${campo}": ${value}`, { campo, valor: value }, [
      'Use formato numerico. Exemplos: 50, 50.00, R$ 50,00.',
    ]);
  }
  return toMinorUnits(parsed, currency);
}

function parseGeo(value: string | undefined): GeoTargeting {
  const geo: GeoTargeting = { paises: [], regioes: [], cidades: [] };
  for (const item of splitList(value)) {
    const cidade = /^cidade:([^:]+)(?::(\d+)km)?$/i.exec(item);
    if (cidade) {
      geo.cidades.push({
        key: cidade[1]!.trim(),
        raioKm: cidade[2] ? Number(cidade[2]) : null,
      });
      continue;
    }
    const regiao = /^regiao:(.+)$/i.exec(item);
    if (regiao) {
      geo.regioes.push(regiao[1]!.trim());
      continue;
    }
    const pais = /^(?:pais:)?([A-Za-z]{2})$/.exec(item);
    if (pais) {
      geo.paises.push(pais[1]!.toUpperCase());
      continue;
    }
    throw new ValidationError(
      `Regiao nao reconhecida: "${item}".`,
      { valor: item },
      [
        'Formatos aceitos: "BR" (pais), "regiao:<key>", "cidade:<key>" ou "cidade:<key>:10km".',
        'As chaves de regiao e cidade vem da busca de segmentacao da Meta. Nao invente chaves.',
      ],
    );
  }
  return geo;
}

export interface BriefLoadResult {
  readonly brief: CampaignBrief;
  readonly briefHash: string;
  readonly sourcePath: string | null;
  readonly raw: ParsedBriefDocument;
}

/**
 * Converte o documento em briefing validado.
 * `moedaCliente` e necessaria para converter orcamento na menor unidade correta.
 */
export function buildBrief(
  document: ParsedBriefDocument,
  options: { moedaCliente: string; sourcePath?: string | null },
): BriefLoadResult {
  const { campos, listas, copies } = document;

  const faltando = CAMPOS_OBRIGATORIOS.filter((campo) => !campos[campo]?.trim());
  if (faltando.length > 0) {
    throw new ValidationError(
      `Briefing incompleto: ${faltando.length} campo(s) obrigatorio(s) ausente(s).`,
      { camposFaltando: faltando, arquivo: options.sourcePath ?? null },
      [
        'O sistema nao preenche campo faltante por conta propria.',
        `Preencha em "## Dados": ${faltando.join(', ')}.`,
      ],
    );
  }

  const faixa = /^(\d{2})\s*[-a]\s*(\d{2})$/.exec(campos.faixa_etaria!.trim());
  if (!faixa) {
    throw new ValidationError(
      `faixa_etaria invalida: "${campos.faixa_etaria}".`,
      { valor: campos.faixa_etaria },
      ['Use o formato "25-45".'],
    );
  }

  const metaRaw = campos.meta!.trim();
  const metaMatch = /^(CPL|CPA|ROAS|VENDAS|CONVERSAS)\s*[:=]?\s*(.+)$/i.exec(metaRaw);
  if (!metaMatch) {
    throw new ValidationError(
      `meta invalida: "${metaRaw}".`,
      { valor: metaRaw },
      ['Use "CPL: 25", "CPA: 80", "ROAS: 3", "VENDAS: 50" ou "CONVERSAS: 100".'],
    );
  }
  const metaTipo = metaMatch[1]!.toUpperCase() as 'CPL' | 'CPA' | 'ROAS' | 'VENDAS' | 'CONVERSAS';
  const metaValorTexto = metaMatch[2]!.trim();
  const metaValor = Number(metaValorTexto.replace(/[R$\s]/gi, '').replace(',', '.'));
  if (!Number.isFinite(metaValor) || metaValor <= 0) {
    throw new ValidationError(`Valor da meta invalido: "${metaValorTexto}".`, { valor: metaRaw });
  }

  const candidate = {
    cliente: campos.cliente!.trim(),
    nomeCampanha: campos.nome_campanha!.trim(),
    modelo: campos.modelo!.trim(),
    objetivoComercial: campos.objetivo_comercial!.trim(),
    produtoOferta: campos.produto_oferta!.trim(),
    publico: campos.publico!.trim(),
    geo: parseGeo(campos.regioes),
    idadeMinima: Number(faixa[1]),
    idadeMaxima: Number(faixa[2]),
    generos: splitList(campos.generos).map((g) => g.toLowerCase()),
    interesses: splitList(campos.interesses),
    orcamentoDiarioCents: campos.orcamento_diario
      ? parseMoneyToCents(campos.orcamento_diario, options.moedaCliente, 'orcamento_diario')
      : null,
    orcamentoTotalCents: campos.orcamento_total
      ? parseMoneyToCents(campos.orcamento_total, options.moedaCliente, 'orcamento_total')
      : null,
    dataInicio: parseBriefDate(campos.data_inicio!, 'start'),
    dataEncerramento: campos.data_encerramento
      ? parseBriefDate(campos.data_encerramento, 'end')
      : null,
    destino: campos.destino!.trim().toLowerCase(),
    url: campos.url?.trim() || null,
    whatsapp: campos.whatsapp?.trim() || null,
    mensagemWhatsapp: campos.mensagem_whatsapp?.trim() || null,
    formularioId: campos.formulario_id?.trim() || null,
    pixelId: campos.pixel_id?.trim() || null,
    evento: campos.evento?.trim().toUpperCase() || null,
    criativos: listas.criativos ?? [],
    copies,
    diferenciais: listas.diferenciais ?? [],
    provas: listas.provas ?? [],
    restricoes: listas.restricoes ?? [],
    observacoes: listas.observacoes ?? [],
    metaTipo,
    metaValor,
  };

  const result = briefSchema.safeParse(candidate);
  if (!result.success) {
    throw new ValidationError(
      'Briefing invalido.',
      {
        arquivo: options.sourcePath ?? null,
        problemas: result.error.issues.map((issue) => ({
          campo: issue.path.join('.') || '(raiz)',
          problema: issue.message,
        })),
      },
      result.error.issues.map((issue) => `${issue.path.join('.') || 'campo'}: ${issue.message}`),
    );
  }

  return {
    brief: result.data,
    briefHash: stableHash(result.data),
    sourcePath: options.sourcePath ?? null,
    raw: document,
  };
}

export function loadBriefFile(filePath: string, moedaCliente: string): BriefLoadResult {
  let markdown: string;
  try {
    markdown = readFileSync(filePath, 'utf8');
  } catch {
    throw new ValidationError(`Briefing nao encontrado: ${filePath}`, { arquivo: filePath }, [
      'Confira o caminho. Exemplo: briefs/campaign.example.md',
    ]);
  }
  return buildBrief(parseBriefMarkdown(markdown), { moedaCliente, sourcePath: filePath });
}

/** Le so o campo `cliente` — necessario antes de saber a moeda para o resto. */
export function peekClientId(filePath: string): string | null {
  try {
    const markdown = readFileSync(filePath, 'utf8');
    return parseBriefMarkdown(markdown).campos.cliente?.trim() ?? null;
  } catch {
    return null;
  }
}
