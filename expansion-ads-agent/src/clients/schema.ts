import { z } from 'zod';

/** `act_` + digitos. Formato obrigatorio da conta de anuncios na Marketing API. */
export const adAccountIdSchema = z
  .string()
  .trim()
  .regex(/^act_\d{6,}$/, 'A conta de anuncios deve ter o formato act_<digitos>.');

export const metaNumericIdSchema = z
  .string()
  .trim()
  .regex(/^\d{5,}$/, 'ID da Meta deve conter apenas digitos.');

const httpsUrlSchema = z
  .string()
  .trim()
  .url('URL invalida.')
  .refine((value) => value.startsWith('https://'), 'Somente URLs https sao aceitas.');

export const clientConfigSchema = z
  .object({
    id: z
      .string()
      .trim()
      .regex(/^[a-z0-9][a-z0-9-]{1,48}$/, 'id deve ser minusculo, com hifens, sem espacos.'),
    nome: z.string().trim().min(2),
    status: z.enum(['active', 'inactive']),
    meta: z.object({
      adAccountId: adAccountIdSchema,
      businessId: metaNumericIdSchema.nullable().optional(),
      pageId: metaNumericIdSchema,
      instagramId: metaNumericIdSchema.nullable().optional(),
      pixelId: metaNumericIdSchema.nullable().optional(),
      datasetId: metaNumericIdSchema.nullable().optional(),
      whatsapp: z
        .object({
          numero: z
            .string()
            .trim()
            .regex(/^\+?[0-9 ()-]{8,20}$/, 'Numero de WhatsApp em formato invalido.')
            .nullable()
            .optional(),
          wabaId: metaNumericIdSchema.nullable().optional(),
        })
        .nullable()
        .optional(),
    }),
    dominio: z
      .string()
      .trim()
      .regex(/^[a-z0-9.-]+\.[a-z]{2,}$/i, 'Dominio invalido.')
      .nullable()
      .optional(),
    urlsPermitidas: z.array(httpsUrlSchema).default([]),
    moeda: z
      .string()
      .trim()
      .regex(/^[A-Z]{3}$/, 'Moeda deve ser um codigo ISO-4217 de 3 letras.'),
    fusoHorario: z.string().trim().min(3),
    limites: z.object({
      diarioCents: z.number().int().positive(),
      mensalCents: z.number().int().positive(),
    }),
    objetivosPermitidos: z.array(z.string().trim().min(3)).min(1),
    modelosPermitidos: z.array(z.string().trim().min(3)).min(1),
    metas: z
      .object({
        cpaCents: z.number().int().positive().nullable().optional(),
        cplCents: z.number().int().positive().nullable().optional(),
        roas: z.number().positive().nullable().optional(),
      })
      .nullable()
      .optional(),
    observacoes: z.string().trim().optional(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (value.limites.mensalCents < value.limites.diarioCents) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['limites', 'mensalCents'],
        message: 'O limite mensal nao pode ser menor que o limite diario.',
      });
    }
  });

export type ClientConfig = z.infer<typeof clientConfigSchema>;

export interface ClientRecord {
  readonly config: ClientConfig;
  /** true quando a config veio de config.example.json (nao ha cliente real cadastrada). */
  readonly isExample: boolean;
  readonly configPath: string;
  readonly configHash: string;
  readonly brand: string | null;
  readonly offers: string | null;
}
