import { z } from 'zod';

export const TEMPLATE_IDS = ['whatsapp_conversas', 'leads_formulario', 'vendas_site'] as const;
export type TemplateId = (typeof TEMPLATE_IDS)[number];

export const DESTINO_VALUES = ['whatsapp', 'site', 'formulario'] as const;
export type Destino = (typeof DESTINO_VALUES)[number];

/** Uma variacao de copy: titulo + descricao + texto principal + criativo associado. */
export const copySchema = z.object({
  ref: z.string().trim().min(1),
  titulo: z.string().trim().min(1, 'Titulo obrigatorio.'),
  descricao: z.string().trim().min(1, 'Descricao obrigatoria.'),
  texto: z.string().trim().min(1, 'Texto principal obrigatorio.'),
  criativo: z.string().trim().min(1, 'Cada copy precisa apontar para um arquivo de criativo.'),
});
export type CopyVariant = z.infer<typeof copySchema>;

export const geoSchema = z.object({
  paises: z.array(z.string().trim().regex(/^[A-Z]{2}$/)).default([]),
  regioes: z.array(z.string().trim().min(1)).default([]),
  cidades: z
    .array(
      z.object({
        key: z.string().trim().min(1),
        raioKm: z.number().positive().max(80).nullable().default(null),
      }),
    )
    .default([]),
});
export type GeoTargeting = z.infer<typeof geoSchema>;

export const briefSchema = z
  .object({
    cliente: z.string().trim().min(1),
    nomeCampanha: z.string().trim().min(3).max(180),
    modelo: z.enum(TEMPLATE_IDS),
    objetivoComercial: z.string().trim().min(5),
    produtoOferta: z.string().trim().min(3),
    publico: z.string().trim().min(3),
    geo: geoSchema,
    idadeMinima: z.number().int().min(13).max(65),
    idadeMaxima: z.number().int().min(13).max(65),
    generos: z.array(z.enum(['todos', 'feminino', 'masculino'])).default(['todos']),
    interesses: z.array(z.string().trim().min(1)).default([]),
    orcamentoDiarioCents: z.number().int().positive().nullable(),
    orcamentoTotalCents: z.number().int().positive().nullable(),
    dataInicio: z.string().trim().min(4),
    dataEncerramento: z.string().trim().min(4).nullable(),
    destino: z.enum(DESTINO_VALUES),
    url: z.string().trim().url().nullable(),
    whatsapp: z.string().trim().min(8).nullable(),
    mensagemWhatsapp: z.string().trim().nullable(),
    formularioId: z
      .string()
      .trim()
      .regex(/^\d+$/, 'formulario_id deve conter apenas digitos.')
      .nullable(),
    pixelId: z
      .string()
      .trim()
      .regex(/^\d+$/, 'pixel_id deve conter apenas digitos.')
      .nullable(),
    evento: z.string().trim().min(2).nullable(),
    criativos: z.array(z.string().trim().min(1)).min(1, 'Informe ao menos um criativo.'),
    copies: z.array(copySchema).min(1, 'Informe ao menos uma variacao de copy.'),
    diferenciais: z.array(z.string().trim()).default([]),
    provas: z.array(z.string().trim()).default([]),
    restricoes: z.array(z.string().trim()).default([]),
    observacoes: z.array(z.string().trim()).default([]),
    metaTipo: z.enum(['CPL', 'CPA', 'ROAS', 'VENDAS', 'CONVERSAS']),
    metaValor: z.number().positive(),
  })
  .superRefine((brief, ctx) => {
    if (brief.idadeMaxima < brief.idadeMinima) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['faixa_etaria'],
        message: 'A idade maxima nao pode ser menor que a minima.',
      });
    }

    const geoVazio =
      brief.geo.paises.length === 0 &&
      brief.geo.regioes.length === 0 &&
      brief.geo.cidades.length === 0;
    if (geoVazio) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['regioes'],
        message: 'Informe ao menos um pais, regiao ou cidade em "regioes".',
      });
    }

    if (brief.orcamentoDiarioCents === null && brief.orcamentoTotalCents === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['orcamento_diario'],
        message: 'Informe orcamento_diario ou orcamento_total.',
      });
    }

    if (brief.destino === 'whatsapp' && !brief.whatsapp) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['whatsapp'],
        message: 'destino=whatsapp exige o campo "whatsapp" com o numero.',
      });
    }

    if (brief.destino === 'site') {
      if (!brief.url) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['url'],
          message: 'destino=site exige "url" de destino.',
        });
      }
      if (!brief.pixelId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['pixel_id'],
          message: 'destino=site exige "pixel_id" para otimizar por conversao.',
        });
      }
      if (!brief.evento) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['evento'],
          message: 'destino=site exige "evento" (ex.: PURCHASE, LEAD).',
        });
      }
    }

    if (brief.destino === 'formulario' && !brief.formularioId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['formulario_id'],
        message: 'destino=formulario exige "formulario_id" (ID do formulario instantaneo na Meta).',
      });
    }

    const criativosDeclarados = new Set(brief.criativos);
    for (const copy of brief.copies) {
      if (!criativosDeclarados.has(copy.criativo)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['copies', copy.ref, 'criativo'],
          message: `A copy "${copy.ref}" aponta para "${copy.criativo}", que nao esta em "criativos".`,
        });
      }
    }
  });

export type CampaignBrief = z.infer<typeof briefSchema>;

/** Campos obrigatorios do arquivo de briefing, na grafia usada no markdown. */
export const CAMPOS_OBRIGATORIOS = [
  'cliente',
  'nome_campanha',
  'modelo',
  'objetivo_comercial',
  'produto_oferta',
  'publico',
  'regioes',
  'faixa_etaria',
  'data_inicio',
  'destino',
  'meta',
] as const;
