import type { AgentContext } from '../../context.js';
import { getCampaignOrThrow, snapshotCampanha, verificarAprovacao } from '../../approvals/service.js';
import { checkDestinationUrl } from '../../security/allowlist.js';
import { STATE_LABELS, type CampaignState } from '../../campaigns/state-machine.js';
import { formatMoney } from '../../shared/money.js';
import { flagBool, flagString, type ParsedCli } from '../args.js';
import { aviso, EXIT, falha, item, json, linha, ok, titulo } from '../output.js';

export interface AuditFinding {
  readonly item: string;
  readonly resultado: 'ok' | 'aviso' | 'falha';
  readonly detalhe: string;
}

/**
 * Auditoria somente leitura.
 *
 * Confere conta, orcamento, publico, datas, links, criativos, objetivo,
 * quantidade de anuncios, politicas, duplicidade, IDs criados e status pausado.
 * Nao ativa nem modifica nada — nem tem como: so le do banco e da Meta.
 */
export async function auditarCampanha(
  ctx: AgentContext,
  campaignId: string,
): Promise<{ achados: AuditFinding[]; aprovado: boolean }> {
  const row = getCampaignOrThrow(ctx, campaignId);
  const client = ctx.clients.load(row.client_id);
  const snapshot = snapshotCampanha(ctx, row);
  const plano = JSON.parse(row.plan_json) as {
    campanha: { objective: string; status: string; name: string };
    conjuntos: Array<Record<string, unknown>>;
    anuncios: unknown[];
    destino: { tipo: string; valor: string };
  };

  const achados: AuditFinding[] = [];
  const registrar = (item0: string, resultado: AuditFinding['resultado'], detalhe: string): void => {
    achados.push({ item: item0, resultado, detalhe });
  };

  // 1. Conta correta
  if (row.ad_account_id === client.config.meta.adAccountId) {
    registrar('conta', 'ok', `Conta ${row.ad_account_id} confere com o cadastro da cliente.`);
  } else {
    registrar(
      'conta',
      'falha',
      `Campanha na conta ${row.ad_account_id}, mas a cliente esta cadastrada em ${client.config.meta.adAccountId}.`,
    );
  }

  // 2. Orcamento
  const orcamento = row.daily_budget_cents ?? row.lifetime_budget_cents ?? 0;
  const limite =
    row.daily_budget_cents !== null
      ? client.config.limites.diarioCents
      : client.config.limites.mensalCents;
  if (orcamento <= limite) {
    registrar(
      'orcamento',
      'ok',
      `${formatMoney(orcamento, row.currency)} dentro do limite de ${formatMoney(limite, row.currency)}.`,
    );
  } else {
    registrar(
      'orcamento',
      'falha',
      `${formatMoney(orcamento, row.currency)} acima do limite de ${formatMoney(limite, row.currency)}.`,
    );
  }

  // 3. Publico
  const targeting = plano.conjuntos[0]?.targeting as
    | { age_min?: number; age_max?: number; geo_locations?: Record<string, unknown> }
    | undefined;
  if (targeting?.age_min && targeting.age_max) {
    const geoDefinido = Object.keys(targeting.geo_locations ?? {}).length > 0;
    registrar(
      'publico',
      geoDefinido ? 'ok' : 'falha',
      `Idade ${targeting.age_min}-${targeting.age_max}; geo ${geoDefinido ? 'definido' : 'AUSENTE'}.`,
    );
  } else {
    registrar('publico', 'falha', 'Faixa etaria ausente no plano.');
  }

  // 4. Datas
  if (row.start_time) {
    const fim = row.stop_time ? new Date(row.stop_time) : null;
    const inicio = new Date(row.start_time);
    if (fim && fim <= inicio) {
      registrar('datas', 'falha', 'A data de encerramento nao e posterior a de inicio.');
    } else if (!fim) {
      registrar('datas', 'aviso', `Inicio ${row.start_time}, sem data de encerramento.`);
    } else {
      registrar('datas', 'ok', `De ${row.start_time} ate ${row.stop_time}.`);
    }
  } else {
    registrar('datas', 'falha', 'Data de inicio ausente.');
  }

  // 5. Links / destino
  if (plano.destino.tipo === 'site') {
    const check = checkDestinationUrl(client, plano.destino.valor, ctx.policies.global);
    registrar(
      'destino',
      check.ok ? 'ok' : 'falha',
      check.ok ? `URL autorizada: ${check.url}` : check.problemas.join(' '),
    );
  } else if (plano.destino.tipo === 'whatsapp') {
    const cadastrado = client.config.meta.whatsapp?.numero?.replace(/\D/g, '') ?? null;
    const noLink = /phone=(\d+)/.exec(plano.destino.valor)?.[1] ?? null;
    registrar(
      'destino',
      cadastrado && noLink === cadastrado ? 'ok' : 'falha',
      cadastrado
        ? `Numero no link: ${noLink} · cadastrado: ${cadastrado}`
        : 'Cliente sem WhatsApp cadastrado.',
    );
  } else {
    registrar('destino', 'ok', `Formulario ${plano.destino.valor}.`);
  }

  // 6. Criativos
  const criativos = ctx.db.creatives.findMany({ campaign_id: row.id });
  const semAtivo = criativos.filter(
    (criativo) => !criativo.meta_image_hash && !criativo.meta_video_id,
  );
  registrar(
    'criativos',
    criativos.length > 0 && semAtivo.length === 0 ? 'ok' : criativos.length === 0 ? 'aviso' : 'falha',
    `${criativos.length} criativo(s); ${semAtivo.length} sem ativo enviado.`,
  );

  // 7. Objetivo
  const objetivoPermitido =
    ctx.policies.global.objetivosPermitidos.includes(row.objective) &&
    client.config.objetivosPermitidos.includes(row.objective);
  registrar(
    'objetivo',
    objetivoPermitido ? 'ok' : 'falha',
    `${row.objective} ${objetivoPermitido ? 'autorizado' : 'NAO autorizado para a cliente'}.`,
  );

  // 8. Quantidade de anuncios
  const totalAnuncios = ctx.db.ads.count({ campaign_id: row.id });
  const maximo = ctx.policies.global.criacao.maxAnunciosPorCampanha;
  registrar(
    'quantidade_de_anuncios',
    totalAnuncios <= maximo ? 'ok' : 'falha',
    `${totalAnuncios} anuncio(s); maximo ${maximo}.`,
  );

  // 9. Politicas — violacoes registradas
  const violacoes = ctx.db.policyViolations.findMany({ campaign_id: row.id });
  registrar(
    'politicas',
    violacoes.length === 0 ? 'ok' : 'aviso',
    `${violacoes.length} violacao(oes) registrada(s) no historico desta campanha.`,
  );

  // 10. Duplicidade
  const mesmoNome = ctx.db.campaigns
    .findMany({ client_id: row.client_id, internal_name: row.internal_name })
    .filter((outra) => outra.id !== row.id);
  registrar(
    'duplicidade',
    mesmoNome.length === 0 ? 'ok' : 'aviso',
    mesmoNome.length === 0
      ? 'Nenhuma outra campanha com o mesmo nome interno.'
      : `${mesmoNome.length} campanha(s) com o mesmo nome: ${mesmoNome.map((outra) => outra.id).join(', ')}.`,
  );

  // 11. IDs criados
  const idsCompletos =
    Boolean(row.meta_campaign_id) &&
    snapshot.adsetMetaIds.length > 0 &&
    snapshot.creativeMetaIds.length > 0 &&
    snapshot.adMetaIds.length > 0;
  registrar(
    'ids_na_meta',
    idsCompletos ? 'ok' : 'aviso',
    `campanha=${row.meta_campaign_id ?? '—'} · conjuntos=${snapshot.adsetMetaIds.length} · criativos=${snapshot.creativeMetaIds.length} · anuncios=${snapshot.adMetaIds.length}`,
  );

  // 12. Status pausado
  if (ctx.meta.hasCredentials && row.meta_campaign_id) {
    const conjuntos = await ctx.meta.listAdSets(row.meta_campaign_id);
    const anuncios = await ctx.meta.listAds(row.meta_campaign_id);
    const campanha = await ctx.meta.getCampaign(row.meta_campaign_id);
    const tudoPausado =
      campanha?.status === 'PAUSED' &&
      conjuntos.every((conjunto) => conjunto.status === 'PAUSED') &&
      anuncios.every((anuncio) => anuncio.status === 'PAUSED');
    registrar(
      'status_pausado',
      tudoPausado || row.state === 'ACTIVE' ? 'ok' : 'falha',
      `Na Meta: campanha=${campanha?.status ?? '—'}, conjuntos e anuncios pausados=${tudoPausado}.`,
    );
  } else {
    registrar(
      'status_pausado',
      row.meta_status === 'PAUSED' || row.meta_status === null ? 'ok' : 'aviso',
      `Banco local diz ${row.meta_status ?? 'nada criado'} (sem credencial para conferir na Meta).`,
    );
  }

  // 13. Aprovacao
  const aprovacao = verificarAprovacao(ctx, row.id);
  registrar(
    'aprovacao',
    aprovacao.ok ? 'ok' : 'aviso',
    aprovacao.ok ? 'Existe aprovacao valida.' : aprovacao.problemas.join(' | '),
  );

  return { achados, aprovado: achados.every((achado) => achado.resultado !== 'falha') };
}

export async function comandoAuditar(ctx: AgentContext, cli: ParsedCli): Promise<number> {
  const campaignId = flagString(cli, 'campaign-id');
  const row = getCampaignOrThrow(ctx, campaignId);
  const { achados, aprovado } = await auditarCampanha(ctx, campaignId);

  if (flagBool(cli, 'json')) {
    json({ campaignId: row.id, aprovado, achados });
    return aprovado ? EXIT.OK : EXIT.POLITICA;
  }

  titulo(`AUDITORIA — ${row.internal_name}`);
  item(`Campanha: ${row.id}`);
  item(`Estado: ${row.state} (${STATE_LABELS[row.state as CampaignState]})`);
  linha('');

  for (const achado of achados) {
    const rotulo = `${achado.item.padEnd(24)} ${achado.detalhe}`;
    if (achado.resultado === 'ok') ok(rotulo);
    else if (achado.resultado === 'aviso') aviso(rotulo);
    else falha(rotulo);
  }

  linha('');
  if (aprovado) ok('Auditoria sem reprovacao.');
  else falha('Auditoria reprovou pelo menos um item. Corrija antes de ativar.');
  linha('');
  linha('  Esta auditoria e somente leitura: ela nao ativa nem modifica nada.');
  linha('');
  return aprovado ? EXIT.OK : EXIT.POLITICA;
}
