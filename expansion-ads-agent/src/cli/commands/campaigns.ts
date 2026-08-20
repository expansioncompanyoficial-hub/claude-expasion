import path from 'node:path';
import {
  ativarCampanha,
  confirmarNaMeta,
  criarCampanha,
  executarDryRun,
  pausarCampanha,
  validarBriefing,
} from '../../campaigns/service.js';
import {
  getCampaignOrThrow,
  registrarAprovacao,
  solicitarAprovacao,
  verificarAprovacao,
} from '../../approvals/service.js';
import { STATE_LABELS, type CampaignState } from '../../campaigns/state-machine.js';
import type { AgentContext } from '../../context.js';
import { formatMoney } from '../../shared/money.js';
import { flagBool, flagOptional, flagString, type ParsedCli } from '../args.js';
import { aviso, EXIT, falha, item, json, linha, ok, titulo } from '../output.js';

function resolverBriefing(ctx: AgentContext, cli: ParsedCli): string {
  const alvo = flagOptional(cli, 'brief') ?? cli.posicionais[0] ?? null;
  if (!alvo) {
    return path.join(ctx.config.paths.briefs, 'campaign.example.md');
  }
  return path.isAbsolute(alvo) ? alvo : path.resolve(ctx.config.paths.root, alvo);
}

export async function comandoValidar(ctx: AgentContext, cli: ParsedCli): Promise<number> {
  const briefing = resolverBriefing(ctx, cli);
  titulo('VALIDACAO DE CAMPANHA');
  linha(`  Briefing: ${path.relative(ctx.config.paths.root, briefing)}`);

  const { resultado } = await validarBriefing(ctx, briefing, {
    consultarMeta: !flagBool(cli, 'sem-meta'),
  });

  if (flagBool(cli, 'json')) {
    json(resultado);
    return resultado.ok ? EXIT.OK : EXIT.POLITICA;
  }

  titulo('RESUMO');
  for (const linhaResumo of resultado.resumo) item(linhaResumo);

  titulo('CRIATIVOS');
  for (const criativo of resultado.criativos) {
    const rotulo = `${criativo.arquivo} — ${criativo.kind}, ${criativo.dimensoes}, ${(criativo.bytes / 1024).toFixed(0)} KB`;
    if (criativo.ok) ok(rotulo);
    else {
      falha(rotulo);
      for (const problema of criativo.problemas) linha(`      ${problema}`);
    }
  }

  if (resultado.duplicidades.length > 0) {
    titulo('POSSIVEL DUPLICIDADE');
    for (const dup of resultado.duplicidades) {
      aviso(`${dup.origem}: ${dup.motivo} (${dup.referencia}${dup.estado ? `, ${dup.estado}` : ''})`);
    }
  }

  if (resultado.avisos.length > 0) {
    titulo('AVISOS');
    for (const item0 of resultado.avisos) aviso(`[${item0.rule}] ${item0.mensagem}`);
  }

  if (resultado.bloqueios.length > 0) {
    titulo('BLOQUEIOS');
    for (const bloqueio of resultado.bloqueios) {
      falha(`[${bloqueio.policy}/${bloqueio.rule}] ${bloqueio.mensagem}`);
    }
    linha('');
    linha('  Nada sera criado enquanto houver bloqueio.');
    linha('');
    return EXIT.POLITICA;
  }

  titulo('RESULTADO');
  ok('Validacao aprovada. Nenhum objeto foi criado.');
  linha(`  Chave de idempotencia: ${resultado.idempotencyKey}`);
  linha('');
  return EXIT.OK;
}

export async function comandoDryRun(ctx: AgentContext, cli: ParsedCli): Promise<number> {
  const briefing = resolverBriefing(ctx, cli);

  titulo('DRY-RUN — NADA SERA ENVIADO PARA A META');
  linha(`  Briefing: ${path.relative(ctx.config.paths.root, briefing)}`);
  linha(`  Graph API: ${ctx.config.meta.apiVersion}`);
  linha(`  Credencial configurada: ${ctx.config.meta.hasCredentials ? 'sim' : 'nao'}`);

  const resultado = await executarDryRun(ctx, briefing);

  if (flagBool(cli, 'json')) {
    json(resultado);
    return EXIT.OK;
  }

  titulo('RESUMO DA CAMPANHA');
  for (const linhaResumo of resultado.validacao.resumo) item(linhaResumo);

  titulo('ESTRUTURA SIMULADA');
  const plano = resultado.validacao.plano;
  item(`Campanha: ${plano.campanha.name} [${plano.campanha.objective}] status=${plano.campanha.status}`);
  for (const conjunto of plano.conjuntos) {
    const orcamento =
      conjunto.daily_budget !== undefined
        ? `${formatMoney(conjunto.daily_budget, plano.currency)}/dia`
        : `${formatMoney(conjunto.lifetime_budget ?? 0, plano.currency)} total`;
    item(
      `  Conjunto ${conjunto.ref}: ${conjunto.optimization_goal} · ${conjunto.destination_type} · ${orcamento} · status=${conjunto.status}`,
    );
  }
  for (const anuncio of plano.anuncios) {
    item(`    Anuncio ${anuncio.ref} -> criativo ${anuncio.creativeRef} · status=${anuncio.status}`);
  }

  titulo('COPIES');
  for (const criativo of plano.criativos) {
    linha(`  [${criativo.ref}] ${criativo.arquivo}`);
    linha(`    Titulo:    ${criativo.copy.titulo}`);
    linha(`    Descricao: ${criativo.copy.descricao}`);
    linha(`    Texto:     ${criativo.copy.texto}`);
    linha('');
  }

  titulo('IDS SIMULADOS');
  linha(`  campanha:  ${resultado.criacaoSimulada.metaIds.campanha}`);
  for (const [ref, id] of Object.entries(resultado.criacaoSimulada.metaIds.conjuntos)) {
    linha(`  conjunto ${ref}: ${id}`);
  }
  for (const [ref, id] of Object.entries(resultado.criacaoSimulada.metaIds.criativos)) {
    linha(`  criativo ${ref}: ${id}`);
  }
  for (const [ref, id] of Object.entries(resultado.criacaoSimulada.metaIds.anuncios)) {
    linha(`  anuncio ${ref}: ${id}`);
  }

  titulo(`CHAMADAS QUE SERIAM FEITAS (${resultado.chamadas.length})`);
  for (const chamada of resultado.chamadas as Array<{ method: string; path: string }>) {
    item(`${chamada.method} /${ctx.config.meta.apiVersion}/${chamada.path}`);
  }

  if (resultado.validacao.avisos.length > 0) {
    titulo('AVISOS');
    for (const item0 of resultado.validacao.avisos) aviso(item0.mensagem);
  }

  titulo('RESULTADO');
  ok('Dry-run concluido. Nenhum objeto foi criado na Meta.');
  linha(`  Campanha interna: ${resultado.campaignId}`);
  linha(`  Plano salvo em: ${path.relative(ctx.config.paths.root, resultado.arquivoPlano)}`);
  linha('');
  return EXIT.OK;
}

export async function comandoCriar(ctx: AgentContext, cli: ParsedCli): Promise<number> {
  const briefing = resolverBriefing(ctx, cli);

  if (ctx.meta.dryRun) {
    titulo('CRIACAO BLOQUEADA — DRY_RUN ESTA LIGADO');
    linha('  O sistema esta em dry-run e nao cria nada na Meta.');
    linha('');
    linha('  Para criar de verdade:');
    item('confirme o dry-run: npm run campaign:dry-run');
    item('ajuste DRY_RUN=false no .env (ou rode com --confirmar)');
    item('rode de novo: npm run campaign:create -- --brief <arquivo> --confirmar');
    linha('');
    return EXIT.POLITICA;
  }

  titulo('CRIACAO REAL — TUDO SERA CRIADO PAUSADO');
  linha(`  Briefing: ${path.relative(ctx.config.paths.root, briefing)}`);

  const resultado = await criarCampanha(ctx, briefing, {
    confirmarDuplicidade: flagBool(cli, 'confirmar-duplicidade'),
  });

  titulo('PASSOS');
  for (const passo of resultado.criacao.passos) {
    const rotulo = `${passo.etapa}${passo.ref ? ` (${passo.ref})` : ''}: ${passo.acao}${passo.metaId ? ` -> ${passo.metaId}` : ''}`;
    if (passo.acao === 'falhou') falha(`${rotulo} — ${passo.erro}`);
    else ok(rotulo);
  }

  if (!resultado.criacao.sucesso) {
    titulo('FALHA PARCIAL');
    falha(`Etapa: ${resultado.criacao.falha?.etapa}`);
    linha('');
    linha('  Nada foi apagado. Os objetos ja criados continuam pausados na Meta.');
    linha('  Corrija a causa e rode o mesmo comando de novo — a retomada e automatica.');
    linha('');
    return EXIT.META;
  }

  const confirmacao = await confirmarNaMeta(ctx, resultado.campaignId);
  titulo('CONFIRMACAO NA META');
  if (confirmacao.divergencias.length === 0) {
    ok(`Tudo pausado: ${confirmacao.tudoPausado ? 'sim' : 'nao'}`);
  } else {
    for (const divergencia of confirmacao.divergencias) aviso(divergencia);
  }

  titulo('PROXIMO PASSO');
  linha(`  npm run campaign:approve -- --campaign-id ${resultado.campaignId} --by "seu nome"`);
  linha('');
  return EXIT.OK;
}

export async function comandoStatus(ctx: AgentContext, cli: ParsedCli): Promise<number> {
  const campaignId = flagOptional(cli, 'campaign-id') ?? cli.posicionais[0] ?? null;

  if (!campaignId) {
    titulo('CAMPANHAS NO BANCO LOCAL');
    const linhas = ctx.db.campaigns.findMany({}, { orderBy: 'created_at DESC', limit: 50 });
    if (linhas.length === 0) {
      linha('  Nenhuma campanha registrada ainda.');
      linha('');
      return EXIT.OK;
    }
    for (const row of linhas) {
      linha(
        `  ${row.id}  ${row.state.padEnd(18)} ${row.client_id.padEnd(18)} ${row.internal_name}`,
      );
    }
    linha('');
    return EXIT.OK;
  }

  const row = getCampaignOrThrow(ctx, campaignId);
  const check = verificarAprovacao(ctx, row.id);

  titulo(`CAMPANHA ${row.id}`);
  item(`Nome: ${row.internal_name}`);
  item(`Cliente: ${row.client_id} · conta ${row.ad_account_id}`);
  item(`Estado: ${row.state} (${STATE_LABELS[row.state as CampaignState]})`);
  item(`Status na Meta: ${row.meta_status ?? '—'}`);
  item(`ID na Meta: ${row.meta_campaign_id ?? '—'}`);
  item(
    `Orcamento: ${
      row.daily_budget_cents !== null
        ? `${formatMoney(row.daily_budget_cents, row.currency)}/dia`
        : `${formatMoney(row.lifetime_budget_cents ?? 0, row.currency)} total`
    }`,
  );
  item(`Dry-run: ${row.dry_run === 1 ? 'sim' : 'nao'}`);
  item(`Conjuntos: ${ctx.db.adsets.count({ campaign_id: row.id })}`);
  item(`Criativos: ${ctx.db.creatives.count({ campaign_id: row.id })}`);
  item(`Anuncios: ${ctx.db.ads.count({ campaign_id: row.id })}`);

  titulo('APROVACAO');
  if (check.ok) ok('Existe aprovacao valida. A ativacao esta liberada.');
  else for (const problema of check.problemas) falha(problema);

  if (row.last_error) {
    titulo('ULTIMO ERRO');
    json(JSON.parse(row.last_error));
  }

  linha('');
  return EXIT.OK;
}

export async function comandoAprovar(ctx: AgentContext, cli: ParsedCli): Promise<number> {
  const campaignId = flagString(cli, 'campaign-id');
  const aprovador = flagOptional(cli, 'by') ?? ctx.config.operatorId;
  const row = getCampaignOrThrow(ctx, campaignId);

  // CREATED_PAUSED e PAUSED precisam entrar em WAITING_APPROVAL antes de aprovar.
  // Se ja estiver aguardando, seguimos direto — pedir de novo seria transicao invalida.
  const resumo =
    row.state === 'WAITING_APPROVAL'
      ? resumoDaCampanha(ctx, row.id)
      : solicitarAprovacao(ctx, row.id).resumo;

  titulo('O QUE ESTA SENDO APROVADO');
  for (const linhaResumo of resumo) item(linhaResumo);

  const aprovacao = registrarAprovacao(ctx, {
    campaignId: row.id,
    approvedBy: aprovador,
    ttlHours: Number(flagOptional(cli, 'ttl-horas') ?? ctx.config.approval.ttlHours),
  });

  ctx.audit.record({
    actor: aprovador,
    actorKind: 'human',
    tool: 'campaign:approve',
    clientId: row.client_id,
    adAccountId: row.ad_account_id,
    campaignId: row.id,
    params: { aprovadoPor: aprovador, validadeAte: aprovacao.expires_at },
    outcome: 'success',
    stateBefore: 'WAITING_APPROVAL',
    stateAfter: 'APPROVED',
    dryRun: ctx.meta.dryRun,
  });

  titulo('APROVACAO REGISTRADA');
  ok(`Aprovada por: ${aprovacao.approved_by}`);
  item(`Codigo de aprovacao: ${aprovacao.approval_token}`);
  item(`Vale ate: ${aprovacao.expires_at}`);
  item(`Orcamento aprovado: ${formatMoney(aprovacao.approved_budget_cents, row.currency)}`);
  linha('');
  linha('  Guarde o codigo: ele e de uso unico e sera exigido na ativacao.');
  linha('');
  linha(`  npm run campaign:activate -- --campaign-id ${row.id} --code ${aprovacao.approval_token}`);
  linha('');
  return EXIT.OK;
}

function resumoDaCampanha(ctx: AgentContext, campaignId: string): string[] {
  const row = getCampaignOrThrow(ctx, campaignId);
  return [
    `Campanha interna: ${row.id}`,
    `Cliente: ${row.client_id} · conta ${row.ad_account_id}`,
    `Nome: ${row.internal_name}`,
    `Modelo: ${row.template} · objetivo ${row.objective}`,
    `Orcamento: ${
      row.daily_budget_cents !== null
        ? `${formatMoney(row.daily_budget_cents, row.currency)}/dia`
        : `${formatMoney(row.lifetime_budget_cents ?? 0, row.currency)} total`
    }`,
    `IDs na Meta: campanha ${row.meta_campaign_id ?? '—'}`,
  ];
}

export async function comandoAtivar(ctx: AgentContext, cli: ParsedCli): Promise<number> {
  const campaignId = flagString(cli, 'campaign-id');
  const codigo = flagOptional(cli, 'code');

  titulo('ATIVACAO');
  linha(`  Campanha: ${campaignId}`);

  const resultado = await ativarCampanha(ctx, campaignId, codigo ?? undefined);

  ok('Campanha ativada.');
  item(`Anuncios ativados: ${resultado.ativados.anuncios}`);
  item(`Conjuntos ativados: ${resultado.ativados.conjuntos}`);
  item(`Simulado (dry-run): ${resultado.simulado ? 'sim' : 'nao'}`);
  linha('');
  return EXIT.OK;
}

export async function comandoPausar(ctx: AgentContext, cli: ParsedCli): Promise<number> {
  const campaignId = flagString(cli, 'campaign-id');
  const motivo = flagOptional(cli, 'motivo') ?? 'pausa solicitada pelo operador';

  const resultado = await pausarCampanha(ctx, campaignId, motivo);

  titulo('PAUSA');
  ok(`Campanha ${resultado.campaignId} pausada.`);
  item(`Motivo: ${motivo}`);
  item(`Simulado (dry-run): ${resultado.simulado ? 'sim' : 'nao'}`);
  linha('');
  return EXIT.OK;
}
