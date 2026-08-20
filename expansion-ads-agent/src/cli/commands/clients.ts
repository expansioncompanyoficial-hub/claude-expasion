import { verificarAcesso } from '../../meta/access.js';
import type { AgentContext } from '../../context.js';
import { formatMoney } from '../../shared/money.js';
import { flagBool, flagOptional } from '../args.js';
import type { ParsedCli } from '../args.js';
import { aviso, EXIT, falha, item, json, linha, ok, titulo } from '../output.js';

export async function comandoClientList(ctx: AgentContext, cli: ParsedCli): Promise<number> {
  const clientes = ctx.clients.list();

  if (flagBool(cli, 'json')) {
    json(clientes.map((cliente) => ({ ...cliente.config, isExample: cliente.isExample })));
    return EXIT.OK;
  }

  titulo(`CLIENTES CADASTRADAS (${clientes.length})`);
  if (clientes.length === 0) {
    linha('  Nenhuma cliente em clients/. Crie clients/<id>/config.json.');
    linha('');
    return EXIT.OK;
  }

  for (const cliente of clientes) {
    const marca = cliente.isExample ? ' [EXEMPLO]' : '';
    linha(
      `  ${cliente.config.id.padEnd(20)} ${cliente.config.status.padEnd(9)} ${cliente.config.meta.adAccountId.padEnd(22)} ${cliente.config.nome}${marca}`,
    );
  }
  linha('');
  return EXIT.OK;
}

export async function comandoClientValidate(ctx: AgentContext, cli: ParsedCli): Promise<number> {
  const alvo = flagOptional(cli, 'client') ?? cli.posicionais[0] ?? null;
  const ids = alvo ? [alvo] : ctx.clients.listIds();

  if (ids.length === 0) {
    titulo('VALIDACAO DE CLIENTES');
    aviso('Nenhuma cliente cadastrada em clients/.');
    linha('');
    return EXIT.VALIDACAO;
  }

  let houveProblema = false;

  for (const id of ids) {
    titulo(`CLIENTE ${id}`);
    try {
      const cliente = ctx.clients.load(id);
      ok(`Cadastro valido (${cliente.isExample ? 'config.example.json' : 'config.json'})`);
      item(`Nome: ${cliente.config.nome}`);
      item(`Status: ${cliente.config.status}`);
      item(`Conta: ${cliente.config.meta.adAccountId}`);
      item(`Pagina: ${cliente.config.meta.pageId}`);
      item(`Instagram: ${cliente.config.meta.instagramId ?? '—'}`);
      item(`Pixel/dataset: ${cliente.config.meta.pixelId ?? cliente.config.meta.datasetId ?? '—'}`);
      item(`WhatsApp: ${cliente.config.meta.whatsapp?.numero ?? '—'}`);
      item(`Moeda / fuso: ${cliente.config.moeda} · ${cliente.config.fusoHorario}`);
      item(
        `Limites: ${formatMoney(cliente.config.limites.diarioCents, cliente.config.moeda)}/dia · ${formatMoney(cliente.config.limites.mensalCents, cliente.config.moeda)}/mes`,
      );
      item(`Objetivos: ${cliente.config.objetivosPermitidos.join(', ')}`);
      item(`Modelos: ${cliente.config.modelosPermitidos.join(', ')}`);
      item(`Dominio: ${cliente.config.dominio ?? '—'}`);
      item(`URLs permitidas: ${cliente.config.urlsPermitidas.length}`);

      if (cliente.isExample) {
        aviso(
          'Cadastro de exemplo: serve para dry-run e testes, mas nao cria nada de verdade na Meta.',
        );
      }
      if (cliente.config.status !== 'active') {
        aviso('Cliente inativa: toda operacao sera recusada.');
      }

      if (ctx.meta.hasCredentials) {
        const contas = await ctx.meta.listAdAccounts(200);
        const visivel = contas.some((conta) => conta.id === cliente.config.meta.adAccountId);
        if (visivel) ok('A conta cadastrada e visivel pelo token configurado.');
        else {
          falha('O token configurado NAO enxerga a conta cadastrada.');
          houveProblema = true;
        }
      } else {
        aviso('Sem META_ACCESS_TOKEN: nao da para conferir os ativos na Meta.');
      }
    } catch (error) {
      falha((error as Error).message);
      houveProblema = true;
    }
  }

  linha('');
  return houveProblema ? EXIT.VALIDACAO : EXIT.OK;
}

/**
 * `npm run meta:validate-access` — primeiro comando a rodar depois de colocar
 * o token no .env. Confere se a credencial funciona e o que ela enxerga,
 * sem depender do MCP estar conectado. Somente leitura.
 */
export async function comandoValidarAcesso(ctx: AgentContext, cli: ParsedCli): Promise<number> {
  const clientId = flagOptional(cli, 'client') ?? undefined;
  const resultado = await verificarAcesso(ctx, clientId);

  if (flagBool(cli, 'json')) {
    json(resultado);
    return resultado.ok ? EXIT.OK : EXIT.CONFIG;
  }

  titulo('ACESSO A META');
  item(`Versao da Graph API: ${resultado.ambiente.graphApiVersion}`);
  item(`Dry-run: ${resultado.ambiente.dryRun === true ? 'LIGADO (nada e criado)' : 'DESLIGADO'}`);
  item(`Token configurado: ${resultado.tokenConfigurado ? 'sim' : 'nao'}`);
  item(`Impressao digital do token: ${resultado.tokenImpressaoDigital}`);

  if (resultado.contasVisiveis) {
    linha('');
    titulo(`CONTAS QUE O TOKEN ENXERGA (${resultado.contasVisiveis.length})`);
    for (const conta of resultado.contasVisiveis) {
      linha(`  ${conta.id.padEnd(22)} ${(conta.moeda ?? '---').padEnd(5)} ${conta.nome ?? ''}`);
    }
  }

  if (resultado.cliente) {
    linha('');
    titulo('CLIENTE');
    item(`${resultado.cliente.id} — ${resultado.cliente.nome} (${resultado.cliente.status})`);
    item(`Conta cadastrada: ${resultado.cliente.conta}`);
    item(`Origem do cadastro: ${resultado.cliente.origemDoCadastro}`);
    if (resultado.contaVisivelPeloToken !== null) {
      item(`Conta visivel pelo token: ${resultado.contaVisivelPeloToken ? 'sim' : 'NAO'}`);
    }
  }

  linha('');
  if (resultado.problemas.length > 0) {
    for (const problema of resultado.problemas) aviso(problema);
    linha('');
    falha('Acesso incompleto. Resolva os pontos acima antes de seguir.');
    linha('');
    return EXIT.CONFIG;
  }

  ok('Acesso valido. O token enxerga o que precisa.');
  linha('');
  return EXIT.OK;
}

/** Quantas Paginas consultar por Instagram. Evita N+1 grande contra a Meta. */
const MAX_PAGINAS_DESCOBERTA = 25;

/**
 * `npm run meta:discover` — lista Paginas, Instagram e pixels que o token
 * enxerga, no formato exato que o cadastro da cliente pede.
 *
 * Existe para que ninguem precise procurar ID na interface do Gerenciador nem
 * subir o MCP so para preencher um config.json. Somente leitura.
 */
export async function comandoDescobrirAtivos(ctx: AgentContext, cli: ParsedCli): Promise<number> {
  if (!ctx.config.meta.hasCredentials) {
    falha('Sem META_ACCESS_TOKEN configurado — nao ha o que descobrir.');
    item('Rode `npm run meta:validate-access` para o diagnostico completo.');
    linha('');
    return EXIT.CONFIG;
  }

  const conta = flagOptional(cli, 'account');
  const paginas = await ctx.meta.listPages(MAX_PAGINAS_DESCOBERTA * 2);
  const alvo = paginas.slice(0, MAX_PAGINAS_DESCOBERTA);

  const comInstagram = await Promise.all(
    alvo.map(async (pagina) => ({
      pagina,
      instagram: await ctx.meta.listInstagramAccounts(pagina.id).catch(() => []),
    })),
  );

  const pixels = conta ? await ctx.meta.listPixels(conta).catch(() => []) : [];

  if (flagBool(cli, 'json')) {
    json({ paginas: comInstagram, pixels, contaConsultada: conta ?? null });
    return EXIT.OK;
  }

  titulo(`PAGINAS (${paginas.length})`);
  if (paginas.length === 0) {
    item('Nenhuma Pagina visivel por este token.');
  }
  for (const { pagina, instagram } of comInstagram) {
    linha(`  ${pagina.id.padEnd(18)} ${pagina.name ?? '(sem nome)'}`);
    for (const conta of instagram) {
      linha(`     └ instagram ${conta.id.padEnd(18)} @${conta.username ?? '?'}`);
    }
    if (instagram.length === 0) {
      linha('     └ instagram (nenhum vinculado)');
    }
  }
  if (paginas.length > alvo.length) {
    linha('');
    aviso(
      `Instagram consultado apenas nas primeiras ${MAX_PAGINAS_DESCOBERTA} Paginas de ${paginas.length}.`,
    );
  }

  linha('');
  if (!conta) {
    titulo('PIXELS');
    item('Passe --account act_<id> para listar os pixels de uma conta.');
  } else {
    titulo(`PIXELS DA CONTA ${conta} (${pixels.length})`);
    if (pixels.length === 0) {
      item('Nenhum pixel nesta conta, ou o token nao tem acesso a eles.');
    }
    for (const pixel of pixels) {
      const disparo = pixel.last_fired_time ? ` — ultimo disparo ${pixel.last_fired_time}` : '';
      linha(`  ${pixel.id.padEnd(18)} ${pixel.name ?? '(sem nome)'}${disparo}`);
    }
  }

  linha('');
  ok('Use estes IDs em clients/<id>/config.json.');
  linha('');
  return EXIT.OK;
}
