import { existsSync, mkdirSync, readdirSync, writeFileSync, readFileSync } from 'node:fs';
import path from 'node:path';
import type { ApiContexto } from '../contexto.js';
import { HttpError, PADRAO_CORPO_MAX, type Rota } from '../http.js';
import { readCreativeFile, resolveCreativePath } from '../../creatives/files.js';
import { formatarBytes } from '../../creatives/validate.js';

const MAX_UPLOAD_BYTES = 220 * 1024 * 1024;

/** Nome de arquivo seguro: sem caminho, sem caractere que confunda o sistema. */
function nomeSeguro(bruto: string): string {
  const base = path.basename(bruto).normalize('NFC');
  const limpo = base.replace(/[^A-Za-z0-9._-]/g, '-').replace(/-+/g, '-');
  if (!limpo || limpo.startsWith('.')) {
    throw new HttpError(422, 'NOME_INVALIDO', 'Nome de arquivo invalido.', { arquivo: bruto });
  }
  return limpo.slice(0, 120);
}

/**
 * Leitor de multipart/form-data.
 *
 * Escrito a mao pelo mesmo motivo do roteador: uma dependencia a menos, e o
 * formato usado aqui e um so — um arquivo por requisicao, com campos simples.
 */
function lerMultipart(
  bytes: Buffer,
  contentType: string,
): {
  campos: Record<string, string>;
  arquivo: { nome: string; tipo: string; dados: Buffer } | null;
} {
  const casamento = /boundary=(?:"([^"]+)"|([^;]+))/i.exec(contentType);
  const boundary = casamento?.[1] ?? casamento?.[2];
  if (!boundary) {
    throw new HttpError(422, 'MULTIPART_INVALIDO', 'Requisicao multipart sem boundary.');
  }

  const separador = Buffer.from(`--${boundary.trim()}`);
  const campos: Record<string, string> = {};
  let arquivo: { nome: string; tipo: string; dados: Buffer } | null = null;

  let posicao = bytes.indexOf(separador);
  while (posicao !== -1) {
    const inicio = posicao + separador.length;
    if (bytes.slice(inicio, inicio + 2).toString() === '--') break;

    const proximo = bytes.indexOf(separador, inicio);
    if (proximo === -1) break;

    const parte = bytes.slice(inicio, proximo);
    const fimCabecalho = parte.indexOf('\r\n\r\n');
    if (fimCabecalho !== -1) {
      const cabecalho = parte.slice(0, fimCabecalho).toString('utf8');
      // -2 remove o \r\n que precede o proximo boundary.
      const corpo = parte.slice(fimCabecalho + 4, parte.length - 2);

      const nomeCampo = /name="([^"]+)"/i.exec(cabecalho)?.[1];
      const nomeArquivo = /filename="([^"]*)"/i.exec(cabecalho)?.[1];
      const tipo = /Content-Type:\s*([^\r\n]+)/i.exec(cabecalho)?.[1]?.trim();

      if (nomeArquivo) {
        arquivo = {
          nome: nomeArquivo,
          tipo: tipo ?? 'application/octet-stream',
          dados: corpo,
        };
      } else if (nomeCampo) {
        campos[nomeCampo] = corpo.toString('utf8');
      }
    }

    posicao = proximo;
  }

  return { campos, arquivo };
}

export function rotasCreatives(api: ApiContexto): Rota[] {
  const { agent } = api;

  const listarDaCliente = (clientId: string) => {
    const dir = path.join(agent.config.paths.creatives, clientId);
    if (!existsSync(dir)) return [];

    return readdirSync(dir, { withFileTypes: true })
      .filter((e) => e.isFile() && !e.name.startsWith('.'))
      .map((e) => {
        try {
          const arquivo = readCreativeFile(agent.config.paths.creatives, clientId, e.name);
          const usos = agent.db.creatives.findMany({
            client_id: clientId,
            file_hash: arquivo.hash,
          });
          return {
            arquivo: arquivo.arquivo,
            tipo: arquivo.kind,
            mime: arquivo.mimeType,
            bytes: arquivo.bytes,
            tamanhoLegivel: formatarBytes(arquivo.bytes),
            hash: arquivo.hash,
            largura: arquivo.largura,
            altura: arquivo.altura,
            proporcao:
              arquivo.largura && arquivo.altura
                ? Number((arquivo.largura / arquivo.altura).toFixed(3))
                : null,
            integro: arquivo.integro,
            problema: arquivo.problemaDeIntegridade,
            analise: api.advisor.creative({
              arquivo: arquivo.arquivo,
              largura: arquivo.largura,
              altura: arquivo.altura,
              tipo: arquivo.kind === 'video' ? 'video' : 'imagem',
              bytes: arquivo.bytes,
            }),
            usadoEm: usos.map((u) => u.campaign_id).filter((v): v is string => Boolean(v)),
          };
        } catch {
          return null;
        }
      })
      .filter((v): v is NonNullable<typeof v> => v !== null);
  };

  return [
    {
      metodo: 'GET',
      caminho: '/api/creatives',
      papel: 'visualizador',
      handler: (req) => {
        const cliente = req.query.get('cliente');
        if (!cliente) {
          throw new HttpError(422, 'CLIENTE_OBRIGATORIO', 'Informe a cliente na consulta.');
        }
        agent.clients.load(cliente);
        return { status: 200, corpo: { ok: true, criativos: listarDaCliente(cliente) } };
      },
    },
    {
      metodo: 'POST',
      caminho: '/api/creatives/upload',
      papel: 'operador',
      maxCorpoBytes: MAX_UPLOAD_BYTES,
      handler: (req) => {
        const contentType = String(req.headers['content-type'] ?? '');
        if (!contentType.startsWith('multipart/form-data')) {
          throw new HttpError(
            415,
            'TIPO_NAO_SUPORTADO',
            'Envie o arquivo como multipart/form-data.',
          );
        }

        const { campos, arquivo } = lerMultipart(req.bytes, contentType);
        const clientId = campos.cliente?.trim();
        if (!clientId) {
          throw new HttpError(422, 'CLIENTE_OBRIGATORIO', 'Informe a cliente no envio.');
        }
        if (!arquivo || arquivo.dados.length === 0) {
          throw new HttpError(422, 'ARQUIVO_AUSENTE', 'Nenhum arquivo recebido.');
        }

        const cliente = agent.clients.loadActive(clientId);
        const nome = nomeSeguro(arquivo.nome);
        const extensao = path.extname(nome).toLowerCase();
        const politica = agent.policies.global.criativos;
        const permitidas = [
          ...politica.extensoesImagemPermitidas,
          ...politica.extensoesVideoPermitidas,
        ];

        if (!permitidas.includes(extensao)) {
          throw new HttpError(
            422,
            'EXTENSAO_NAO_PERMITIDA',
            `Extensao ${extensao || '(sem extensao)'} nao e aceita.`,
            { permitidas },
          );
        }

        // resolveCreativePath impede path traversal para a pasta de outra cliente.
        const destino = resolveCreativePath(agent.config.paths.creatives, cliente.config.id, nome);
        mkdirSync(path.dirname(destino), { recursive: true });
        writeFileSync(destino, arquivo.dados);

        const lido = readCreativeFile(agent.config.paths.creatives, cliente.config.id, nome);
        const limite =
          lido.kind === 'video'
            ? politica.tamanhoMaximoVideoBytes
            : politica.tamanhoMaximoImagemBytes;

        if (lido.bytes > limite) {
          throw new HttpError(
            422,
            'ARQUIVO_GRANDE_DEMAIS',
            `O arquivo tem ${formatarBytes(lido.bytes)} e o limite e ${formatarBytes(limite)}.`,
            { arquivo: nome },
          );
        }

        agent.audit.record({
          actor: req.sessao!.email,
          actorKind: 'human',
          tool: 'api:creatives/upload',
          clientId: cliente.config.id,
          adAccountId: cliente.config.meta.adAccountId,
          params: { arquivo: nome, bytes: lido.bytes, hash: lido.hash },
          outcome: 'success',
          dryRun: agent.config.dryRun,
        });

        return {
          status: 201,
          corpo: {
            ok: true,
            criativo: {
              arquivo: lido.arquivo,
              tipo: lido.kind,
              bytes: lido.bytes,
              tamanhoLegivel: formatarBytes(lido.bytes),
              hash: lido.hash,
              largura: lido.largura,
              altura: lido.altura,
              integro: lido.integro,
              problema: lido.problemaDeIntegridade,
              analise: api.advisor.creative({
                arquivo: lido.arquivo,
                largura: lido.largura,
                altura: lido.altura,
                tipo: lido.kind === 'video' ? 'video' : 'imagem',
                bytes: lido.bytes,
              }),
            },
          },
        };
      },
    },
    {
      metodo: 'GET',
      caminho: '/api/creatives/:cliente/:arquivo/file',
      papel: 'visualizador',
      handler: (req) => {
        const cliente = agent.clients.load(req.params.cliente!);
        const caminho = resolveCreativePath(
          agent.config.paths.creatives,
          cliente.config.id,
          req.params.arquivo!,
        );
        if (!existsSync(caminho)) {
          throw new HttpError(404, 'CRIATIVO_NAO_ENCONTRADO', 'Criativo nao encontrado.');
        }
        const lido = readCreativeFile(
          agent.config.paths.creatives,
          cliente.config.id,
          req.params.arquivo!,
        );
        return {
          status: 200,
          corpo: readFileSync(caminho),
          headers: {
            'Content-Type': lido.mimeType,
            'Cache-Control': 'private, max-age=300',
            'Content-Disposition': `inline; filename="${lido.arquivo}"`,
          },
        };
      },
    },
  ];
}

export { PADRAO_CORPO_MAX };
