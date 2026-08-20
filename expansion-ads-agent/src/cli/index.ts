#!/usr/bin/env node
import { createContext, type AgentContext } from '../context.js';
import { getConfig } from '../config/env.js';
import { parseCli, flagBool, type ParsedCli } from './args.js';
import { EXIT, linha, reportarErro, titulo } from './output.js';
import {
  comandoClientList,
  comandoClientValidate,
  comandoDescobrirAtivos,
  comandoValidarAcesso,
} from './commands/clients.js';
import { comandoCriarUsuario, comandoListarUsuarios } from './commands/users.js';
import { comandoWeb } from './commands/web.js';
import {
  comandoAprovar,
  comandoAtivar,
  comandoCriar,
  comandoDryRun,
  comandoPausar,
  comandoStatus,
  comandoValidar,
} from './commands/campaigns.js';
import { comandoInsights, comandoRelatorioDiario } from './commands/insights.js';
import { comandoRecomendar } from './commands/optimize.js';
import { comandoAuditar } from './commands/audit.js';

type Comando = (ctx: AgentContext, cli: ParsedCli) => Promise<number>;

const COMANDOS: Record<string, { descricao: string; executar: Comando; escrita?: boolean }> = {
  'db:init': {
    descricao: 'Cria o banco local e aplica as migracoes.',
    executar: async (ctx) => {
      titulo('BANCO LOCAL');
      linha(`  ${ctx.config.db.path}`);
      linha('  Migracoes aplicadas.');
      linha('');
      return EXIT.OK;
    },
  },
  web: { descricao: 'Sobe a plataforma EXPANSION ADS.', executar: comandoWeb },
  'user:create': { descricao: 'Cadastra um usuario da plataforma.', executar: comandoCriarUsuario },
  'user:list': { descricao: 'Lista os usuarios da plataforma.', executar: comandoListarUsuarios },
  'meta:validate-access': {
    descricao: 'Confere se o token da Meta funciona e o que ele enxerga.',
    executar: comandoValidarAcesso,
  },
  'meta:discover': {
    descricao: 'Lista Paginas, Instagram e pixels visiveis pelo token.',
    executar: comandoDescobrirAtivos,
  },
  'client:list': { descricao: 'Lista as clientes cadastradas.', executar: comandoClientList },
  'client:validate': {
    descricao: 'Valida o cadastro de uma cliente (ou de todas).',
    executar: comandoClientValidate,
  },
  'campaign:validate': {
    descricao: 'Valida um briefing sem criar nada.',
    executar: comandoValidar,
  },
  'campaign:dry-run': {
    descricao: 'Simula a campanha inteira e salva o planejamento.',
    executar: comandoDryRun,
  },
  'campaign:create': {
    descricao: 'Cria a campanha na Meta com tudo PAUSADO.',
    executar: comandoCriar,
    escrita: true,
  },
  'campaign:status': {
    descricao: 'Mostra o estado de uma campanha (ou lista todas).',
    executar: comandoStatus,
  },
  'campaign:approve': {
    descricao: 'Registra a aprovacao humana e emite o codigo de ativacao.',
    executar: comandoAprovar,
  },
  'campaign:activate': {
    descricao: 'Ativa uma campanha que ja tem aprovacao valida.',
    executar: comandoAtivar,
    escrita: true,
  },
  'campaign:pause': {
    descricao: 'Pausa a campanha na Meta.',
    executar: comandoPausar,
    escrita: true,
  },
  'campaign:audit': {
    descricao: 'Auditoria somente leitura de uma campanha.',
    executar: comandoAuditar,
  },
  insights: { descricao: 'Consulta desempenho na Ads Insights API.', executar: comandoInsights },
  'report:daily': {
    descricao: 'Gera relatorio em markdown dentro de reports/.',
    executar: comandoRelatorioDiario,
  },
  'optimize:recommend': {
    descricao: 'Gera recomendacoes de otimizacao (nao aplica nada).',
    executar: comandoRecomendar,
  },
};

function ajuda(): number {
  titulo('EXPANSION ADS AGENT — CLI');
  linha('');
  linha('  Uso: npm run <comando> -- [argumentos]');
  linha('');
  for (const [nome, comando] of Object.entries(COMANDOS)) {
    linha(`  ${nome.padEnd(22)} ${comando.descricao}`);
  }
  linha('');
  linha('  Argumentos comuns:');
  linha('    --brief <arquivo>          briefing a usar (padrao: briefs/campaign.example.md)');
  linha('    --client <id>              cliente cadastrada');
  linha('    --campaign-id <id>         campanha interna (cmp_...) ou ID da Meta');
  linha('    --code <APV-...>           codigo de aprovacao (ativacao)');
  linha('    --by <nome>                quem esta aprovando');
  linha('    --period <periodo>         today, yesterday, last-7-days, last-30-days...');
  linha('    --json                     saida em JSON');
  linha('    --confirmar                assume o risco de sair do dry-run');
  linha('    --confirmar-duplicidade    segue mesmo com suspeita de duplicidade');
  linha('');
  return EXIT.OK;
}

export async function run(argv: readonly string[]): Promise<number> {
  let cli: ParsedCli;
  try {
    cli = parseCli(argv);
  } catch (error) {
    return reportarErro(error);
  }

  if (cli.comando === 'help' || flagBool(cli, 'help')) return ajuda();

  const comando = COMANDOS[cli.comando];
  if (!comando) {
    titulo(`COMANDO DESCONHECIDO: ${cli.comando}`);
    linha('');
    ajuda();
    return EXIT.VALIDACAO;
  }

  let ctx: AgentContext | null = null;
  try {
    const config = getConfig();
    // Sair do dry-run e uma decisao explicita do operador, nunca do modelo.
    const dryRunOverride = comando.escrita && flagBool(cli, 'confirmar') ? false : undefined;

    ctx = createContext({
      config,
      logStream: 'none',
      actorKind: 'cli',
      ...(dryRunOverride !== undefined ? { dryRunOverride } : {}),
    });

    return await comando.executar(ctx, cli);
  } catch (error) {
    return reportarErro(error);
  } finally {
    ctx?.close();
  }
}

const executadoDiretamente =
  process.argv[1] !== undefined &&
  import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/').replace(/\.ts$/, '.ts'));

if (executadoDiretamente || process.env.EXPANSION_CLI_AUTOSTART === '1') {
  run(process.argv.slice(2))
    .then((codigo) => process.exit(codigo))
    .catch((error) => {
      process.exit(reportarErro(error));
    });
}
