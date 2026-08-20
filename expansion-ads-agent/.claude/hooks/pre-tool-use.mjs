#!/usr/bin/env node
/**
 * Hook PreToolUse — SEGUNDA camada de protecao.
 *
 * A protecao principal e o backend do MCP: ele valida conta, orcamento,
 * aprovacao e politica antes de qualquer chamada. Este hook existe para pegar o
 * que nem deveria chegar la — comando de shell falando direto com a Graph API,
 * leitura do .env, tentativa de ativar campanha por fora do fluxo.
 *
 * Contrato: le JSON do stdin, escreve JSON no stdout.
 * Para bloquear: { hookSpecificOutput: { hookEventName: 'PreToolUse',
 *                  permissionDecision: 'deny', permissionDecisionReason: '...' } }
 */

const CHUNKS = [];
process.stdin.on('data', (chunk) => CHUNKS.push(chunk));
process.stdin.on('end', () => {
  let payload;
  try {
    payload = JSON.parse(Buffer.concat(CHUNKS).toString('utf8') || '{}');
  } catch {
    // Entrada ilegivel: nao e papel do hook derrubar a sessao.
    process.exit(0);
  }

  const toolName = String(payload.tool_name ?? '');
  const input = payload.tool_input ?? {};
  const motivo = avaliar(toolName, input);

  if (motivo) {
    process.stdout.write(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'deny',
          permissionDecisionReason: motivo,
        },
      }),
    );
  }
  process.exit(0);
});

function avaliar(toolName, input) {
  if (toolName === 'Bash') return avaliarBash(String(input.command ?? ''));
  if (toolName === 'Read' || toolName === 'Edit' || toolName === 'Write') {
    return avaliarArquivo(String(input.file_path ?? ''));
  }
  if (toolName.startsWith('mcp__meta-ads__')) return avaliarMcp(toolName, input);
  return null;
}

function avaliarBash(comando) {
  const normalizado = comando.toLowerCase();

  // 1. Falar direto com a Graph API por fora do MCP anula todas as travas.
  if (/(curl|wget|http|https|xh|httpie)/.test(normalizado) && /graph\.(facebook|instagram)\.com/.test(normalizado)) {
    return [
      'Bloqueado: chamada direta a Graph API por linha de comando.',
      'Use as ferramentas do servidor MCP meta-ads — elas validam conta, orcamento e aprovacao.',
    ].join(' ');
  }

  // 2. Imprimir o .env vaza token para o transcript.
  if (/\b(cat|less|more|head|tail|bat|strings|xxd|od)\b[^|;]*\.env\b/.test(normalizado)) {
    return 'Bloqueado: leitura do .env. O arquivo contem o token da Meta e nao pode aparecer na conversa.';
  }
  if (/\b(env|printenv)\b/.test(normalizado) && /meta_|token|secret/.test(normalizado)) {
    return 'Bloqueado: comando que imprimiria variaveis de ambiente com segredo.';
  }

  // 3. Ativar campanha fora do fluxo de aprovacao.
  if (/campaign:activate/.test(normalizado) && !/--code\s+apv-/i.test(comando)) {
    return [
      'Bloqueado: campaign:activate sem --code APV-...',
      'A ativacao exige o codigo de uma aprovacao valida, emitido por campaign:approve.',
    ].join(' ');
  }

  // 4. Apagar objeto na Meta nunca e permitido.
  if (/(delete|remove).*\b(campaign|adset|ad)\b/.test(normalizado) && /graph\.facebook/.test(normalizado)) {
    return 'Bloqueado: exclusao de objeto na Meta. O sistema nunca exclui — apenas pausa.';
  }

  // 5. Desligar o dry-run por variavel de ambiente inline, sem passar pelo operador.
  if (/dry_run\s*=\s*(false|0|no)/.test(normalizado)) {
    return [
      'Bloqueado: desligar DRY_RUN por linha de comando.',
      'Sair do dry-run e decisao do operador, editando o .env ou passando --confirmar conscientemente.',
    ].join(' ');
  }

  return null;
}

function avaliarArquivo(caminho) {
  const normalizado = caminho.toLowerCase();
  if (/(^|\/)\.env($|\.)/.test(normalizado)) {
    return 'Bloqueado: o .env contem o token da Meta e nao deve ser lido nem editado pelo agente.';
  }
  if (/\.(pem|key|p12|pfx)$/.test(normalizado)) {
    return 'Bloqueado: arquivo de credencial.';
  }
  return null;
}

function avaliarMcp(toolName, input) {
  // Ativacao sempre precisa do codigo de aprovacao.
  if (toolName.endsWith('meta_activate_approved_campaign')) {
    const codigo = String(input.codigoAprovacao ?? '');
    if (!/^APV-/.test(codigo)) {
      return [
        'Bloqueado: ativacao sem codigo de aprovacao valido.',
        'Peca ao operador para rodar campaign:approve e forneca o codigo APV-...',
      ].join(' ');
    }
  }

  // Alteracao de orcamento tambem exige aprovacao.
  if (toolName.endsWith('meta_update_budget_within_policy')) {
    const codigo = String(input.codigoAprovacao ?? '');
    if (!/^APV-/.test(codigo)) {
      return 'Bloqueado: alteracao de orcamento sem codigo de aprovacao valido.';
    }
  }

  // Um valor com cara de token nunca deve viajar como parametro de ferramenta.
  const serializado = JSON.stringify(input ?? {});
  if (/\bEA[A-Za-z0-9_-]{20,}\b/.test(serializado)) {
    return 'Bloqueado: parametro contem algo com formato de token de acesso da Meta. O token vive apenas no .env.';
  }

  return null;
}
