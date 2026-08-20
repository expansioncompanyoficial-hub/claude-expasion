import type { AgentContext } from '../context.js';
import type { ClientRecord } from '../clients/schema.js';
import { readCreativeFile, type CreativeFile } from '../creatives/files.js';
import { validarCriativos, type CreativeReport } from '../creatives/validate.js';
import { blocking, type PolicyFinding } from '../policies/engine.js';
import { checkDestinationUrl } from '../security/allowlist.js';
import { campaignIdempotencyKey, creativesHash } from '../security/idempotency.js';
import { AuthorizationError } from '../shared/errors.js';
import { stableHash } from '../shared/ids.js';
import { formatMoney } from '../shared/money.js';
import { todayIso } from '../shared/time.js';
import type { CampaignBrief } from './brief-schema.js';
import { getTemplate } from './templates/index.js';
import type { CampaignPlan } from './templates/types.js';

export interface DuplicateSuspicion {
  readonly origem: 'banco' | 'meta';
  readonly motivo: string;
  readonly referencia: string;
  readonly estado?: string;
}

export interface ValidationResult {
  readonly ok: boolean;
  readonly clientId: string;
  readonly adAccountId: string;
  readonly plano: CampaignPlan;
  readonly briefHash: string;
  readonly specHash: string;
  readonly creativesHash: string;
  readonly idempotencyKey: string;
  readonly findings: PolicyFinding[];
  readonly bloqueios: PolicyFinding[];
  readonly avisos: PolicyFinding[];
  readonly criativos: CreativeReport[];
  readonly arquivos: CreativeFile[];
  readonly duplicidades: DuplicateSuspicion[];
  readonly resumo: string[];
}

/**
 * Validacao completa e deterministica de uma campanha antes de qualquer criacao.
 * Nada aqui chama a Meta para escrever; a checagem de duplicidade na Meta e
 * feita a parte, em `checarDuplicidadeNaMeta`.
 */
export async function validarCampanha(
  ctx: AgentContext,
  client: ClientRecord,
  brief: CampaignBrief,
  briefHash: string,
  options: { consultarMeta?: boolean } = {},
): Promise<ValidationResult> {
  const findings: PolicyFinding[] = [];
  const adAccountId = client.config.meta.adAccountId;

  if (brief.cliente !== client.config.id) {
    throw new AuthorizationError(
      `O briefing e da cliente "${brief.cliente}", mas o cadastro carregado e "${client.config.id}".`,
      { briefingCliente: brief.cliente, cadastroCliente: client.config.id },
    );
  }

  // 1. Objetivo e modelo autorizados para o sistema e para a cliente.
  const template = getTemplate(brief.modelo);
  findings.push(...ctx.policyEngine.evaluateObjective(client, template.objective, brief.modelo));

  // 2. Regras especificas do modelo (destino, pixel, pagina, whatsapp, copies).
  findings.push(...template.validar({ client, brief, policies: ctx.policies }));

  // 3. Destino: allowlist de dominio quando o modelo aponta para site.
  if (brief.destino === 'site' && brief.url) {
    const check = checkDestinationUrl(client, brief.url, ctx.policies.global);
    if (!check.ok) {
      findings.push({
        severidade: 'block',
        policy: 'global-policy',
        rule: 'destino_nao_autorizado',
        mensagem: `Destino reprovado: ${check.problemas.join(' ')}`,
        detalhes: { url: brief.url },
      });
    }
  }

  // 4. Criativos: existencia, integridade, limites e duplicidade por hash.
  const arquivos: CreativeFile[] = [];
  const erroDeArquivo: PolicyFinding[] = [];
  for (const nome of brief.criativos) {
    try {
      arquivos.push(readCreativeFile(ctx.config.paths.creatives, client.config.id, nome));
    } catch (error) {
      erroDeArquivo.push({
        severidade: 'block',
        policy: 'global-policy',
        rule: 'criativo_ausente',
        mensagem: error instanceof Error ? error.message : String(error),
        detalhes: { arquivo: nome },
      });
    }
  }
  findings.push(...erroDeArquivo);

  const hashesJaUsados = new Map<string, string>();
  for (const row of ctx.db.creatives.findMany({ client_id: client.config.id })) {
    if (row.file_hash) hashesJaUsados.set(row.file_hash, row.file_path ?? row.id);
  }

  const resultadoCriativos = validarCriativos(arquivos, ctx.policies.global, hashesJaUsados);
  findings.push(...resultadoCriativos.findings);

  // 5. Plano completo (so montado se o modelo conseguir).
  const plano = template.montarPlano({ client, brief, policies: ctx.policies });

  // 6. Estrutura: quantidade de conjuntos e anuncios.
  const campanhasHoje = ctx.db.campaigns
    .findMany({ client_id: client.config.id })
    .filter((row) => row.created_at.slice(0, 10) === todayIso(ctx.clock)).length;

  findings.push(
    ...ctx.policyEngine.evaluateStructure({
      adsets: plano.conjuntos.length,
      adsPerAdset: plano.conjuntos.map(
        (conjunto) => plano.anuncios.filter((anuncio) => anuncio.adsetRef === conjunto.ref).length,
      ),
      totalAds: plano.anuncios.length,
      campanhasCriadasHoje: campanhasHoje,
    }),
  );

  // 7. Orcamento.
  const comprometido = ctx.db.campaigns
    .findMany({ client_id: client.config.id })
    .filter((row) => ['ACTIVE', 'ACTIVATING'].includes(row.state))
    .reduce((total, row) => total + (row.daily_budget_cents ?? 0), 0);

  findings.push(
    ...ctx.policyEngine.evaluateBudget(client, {
      currency: client.config.moeda,
      dailyBudgetCents: brief.orcamentoDiarioCents,
      lifetimeBudgetCents: brief.orcamentoTotalCents,
      startTime: brief.dataInicio,
      stopTime: brief.dataEncerramento,
      orcamentoDiarioJaComprometidoCents: comprometido,
    }),
  );

  // 8. Cliente de exemplo nunca cria de verdade.
  if (client.isExample && !ctx.meta.dryRun) {
    findings.push({
      severidade: 'block',
      policy: 'client-config',
      rule: 'cliente_de_exemplo',
      mensagem:
        'Esta cliente veio de config.example.json. Crie clients/<id>/config.json com os dados reais antes de criar campanha fora do dry-run.',
    });
  }

  // 9. Idempotencia e duplicidade no banco.
  const hashCriativos = creativesHash(
    arquivos.map((arquivo) => ({ arquivo: arquivo.arquivo, hash: arquivo.hash })),
  );
  const specHash = stableHash(plano);
  const idempotencyKey = campaignIdempotencyKey({
    clientId: client.config.id,
    adAccountId,
    internalName: plano.campanha.name,
    template: brief.modelo,
    dia: brief.dataInicio.slice(0, 10),
    briefHash,
    creativesHash: hashCriativos,
  });

  const duplicidades: DuplicateSuspicion[] = [];
  const existente = ctx.db.campaigns.findOne({ idempotency_key: idempotencyKey });
  if (existente) {
    duplicidades.push({
      origem: 'banco',
      motivo: 'Ja existe uma campanha com a mesma chave de idempotencia.',
      referencia: existente.id,
      estado: existente.state,
    });
  }

  const mesmoNome = ctx.db.campaigns.findMany({
    client_id: client.config.id,
    internal_name: plano.campanha.name,
  });
  for (const row of mesmoNome) {
    if (row.idempotency_key === idempotencyKey) continue;
    duplicidades.push({
      origem: 'banco',
      motivo: 'Ja existe campanha com o mesmo nome interno para esta cliente.',
      referencia: row.id,
      estado: row.state,
    });
  }

  // 10. Duplicidade na propria Meta (so quando ha credencial).
  // Se a validacao ja tem bloqueio, nada sera criado: nao gastamos cota da API
  // nem tocamos a rede so para enriquecer um relatorio que ja reprovou.
  const jaReprovou = findings.some((finding) => finding.severidade === 'block');
  if (options.consultarMeta !== false && ctx.meta.hasCredentials && !jaReprovou) {
    try {
      const naMeta = await ctx.meta.listCampaigns(adAccountId, { limit: 100 });
      for (const campanha of naMeta) {
        if (campanha.name?.trim().toLowerCase() === plano.campanha.name.trim().toLowerCase()) {
          duplicidades.push({
            origem: 'meta',
            motivo: 'Ja existe campanha com este nome na conta de anuncios.',
            referencia: campanha.id,
            estado: campanha.effective_status ?? campanha.status,
          });
        }
      }
    } catch (error) {
      findings.push({
        severidade: 'warn',
        policy: 'meta',
        rule: 'consulta_duplicidade_falhou',
        mensagem: `Nao foi possivel consultar campanhas existentes na Meta: ${
          error instanceof Error ? error.message : String(error)
        }`,
      });
    }
  }

  const bloqueios = blocking(findings);
  const avisos = findings.filter((finding) => finding.severidade === 'warn');

  return {
    ok: bloqueios.length === 0,
    clientId: client.config.id,
    adAccountId,
    plano,
    briefHash,
    specHash,
    creativesHash: hashCriativos,
    idempotencyKey,
    findings,
    bloqueios,
    avisos,
    criativos: resultadoCriativos.relatorios,
    arquivos,
    duplicidades,
    resumo: montarResumo(client, brief, plano),
  };
}

function montarResumo(client: ClientRecord, brief: CampaignBrief, plano: CampaignPlan): string[] {
  const moeda = client.config.moeda;
  const orcamento =
    brief.orcamentoDiarioCents !== null
      ? `${formatMoney(brief.orcamentoDiarioCents, moeda)}/dia`
      : `${formatMoney(brief.orcamentoTotalCents ?? 0, moeda)} no total`;

  return [
    `Cliente: ${client.config.nome} (${client.config.id})`,
    `Conta: ${client.config.meta.adAccountId}`,
    `Campanha: ${plano.campanha.name}`,
    `Modelo: ${plano.modelo} — objetivo ${plano.campanha.objective}`,
    `Otimizacao: ${plano.conjuntos[0]?.optimization_goal ?? '-'} · cobranca ${plano.conjuntos[0]?.billing_event ?? '-'}`,
    `Destino: ${plano.destino.tipo} -> ${plano.destino.valor}`,
    `Orcamento: ${orcamento}`,
    `Periodo: ${brief.dataInicio}${brief.dataEncerramento ? ` ate ${brief.dataEncerramento}` : ' (sem data de encerramento)'}`,
    `Publico: ${brief.idadeMinima}-${brief.idadeMaxima} anos · ${descreverGeo(brief)}`,
    `Estrutura: ${plano.conjuntos.length} conjunto(s), ${plano.criativos.length} criativo(s), ${plano.anuncios.length} anuncio(s)`,
    `Meta: ${brief.metaTipo} ${brief.metaValor}`,
    'Status inicial de todos os objetos: PAUSED',
  ];
}

function descreverGeo(brief: CampaignBrief): string {
  const partes: string[] = [];
  if (brief.geo.paises.length) partes.push(`paises ${brief.geo.paises.join(', ')}`);
  if (brief.geo.regioes.length) partes.push(`regioes ${brief.geo.regioes.join(', ')}`);
  if (brief.geo.cidades.length) {
    partes.push(`cidades ${brief.geo.cidades.map((cidade) => cidade.key).join(', ')}`);
  }
  return partes.join(' · ') || 'sem geo';
}
