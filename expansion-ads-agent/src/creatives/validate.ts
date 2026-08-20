import type { GlobalPolicy } from '../policies/schema.js';
import type { PolicyFinding } from '../policies/engine.js';
import type { CreativeFile } from './files.js';

export interface CreativeReport {
  readonly arquivo: string;
  readonly kind: string;
  readonly bytes: number;
  readonly dimensoes: string;
  readonly hash: string;
  readonly ok: boolean;
  readonly problemas: string[];
}

export interface CreativeValidationResult {
  readonly relatorios: CreativeReport[];
  readonly findings: PolicyFinding[];
  readonly duplicados: Array<{ arquivo: string; hash: string; jaUsadoEm: string }>;
}

/**
 * Valida os criativos contra a politica global.
 *
 * O sistema NUNCA altera imagem ou video. Quando o arquivo nao cumpre os
 * requisitos, ele devolve um relatorio objetivo do problema e para.
 */
export function validarCriativos(
  arquivos: readonly CreativeFile[],
  policy: GlobalPolicy,
  hashesJaUsados: ReadonlyMap<string, string> = new Map(),
): CreativeValidationResult {
  const relatorios: CreativeReport[] = [];
  const findings: PolicyFinding[] = [];
  const duplicados: Array<{ arquivo: string; hash: string; jaUsadoEm: string }> = [];
  const vistosNesteLote = new Map<string, string>();
  const limites = policy.criativos;

  for (const arquivo of arquivos) {
    const problemas: string[] = [];

    const extensoesPermitidas =
      arquivo.kind === 'video' ? limites.extensoesVideoPermitidas : limites.extensoesImagemPermitidas;

    if (!extensoesPermitidas.includes(arquivo.extensao)) {
      problemas.push(
        `Extensao ${arquivo.extensao} nao permitida para ${arquivo.kind}. Permitidas: ${extensoesPermitidas.join(', ')}.`,
      );
    }

    const tamanhoMaximo =
      arquivo.kind === 'video' ? limites.tamanhoMaximoVideoBytes : limites.tamanhoMaximoImagemBytes;
    if (arquivo.bytes > tamanhoMaximo) {
      problemas.push(
        `Arquivo com ${formatarBytes(arquivo.bytes)} excede o maximo de ${formatarBytes(tamanhoMaximo)}.`,
      );
    }

    if (arquivo.bytes === 0) problemas.push('Arquivo vazio.');

    if (!arquivo.integro && arquivo.problemaDeIntegridade) {
      problemas.push(arquivo.problemaDeIntegridade);
    }

    if (arquivo.kind === 'image') {
      if (arquivo.largura === null || arquivo.altura === null) {
        problemas.push('Nao foi possivel ler as dimensoes da imagem.');
      } else {
        if (arquivo.largura < limites.larguraMinimaImagem) {
          problemas.push(
            `Largura ${arquivo.largura}px abaixo do minimo de ${limites.larguraMinimaImagem}px.`,
          );
        }
        if (arquivo.altura < limites.alturaMinimaImagem) {
          problemas.push(
            `Altura ${arquivo.altura}px abaixo do minimo de ${limites.alturaMinimaImagem}px.`,
          );
        }
      }
    }

    if (limites.exigirHashUnicoPorCliente) {
      const duplicadoNoLote = vistosNesteLote.get(arquivo.hash);
      if (duplicadoNoLote && duplicadoNoLote !== arquivo.arquivo) {
        problemas.push(`Conteudo identico a "${duplicadoNoLote}" neste mesmo briefing.`);
        duplicados.push({ arquivo: arquivo.arquivo, hash: arquivo.hash, jaUsadoEm: duplicadoNoLote });
      }
      vistosNesteLote.set(arquivo.hash, arquivo.arquivo);

      const jaUsado = hashesJaUsados.get(arquivo.hash);
      if (jaUsado) {
        duplicados.push({ arquivo: arquivo.arquivo, hash: arquivo.hash, jaUsadoEm: jaUsado });
      }
    }

    relatorios.push({
      arquivo: arquivo.arquivo,
      kind: arquivo.kind,
      bytes: arquivo.bytes,
      dimensoes:
        arquivo.largura && arquivo.altura ? `${arquivo.largura}x${arquivo.altura}` : 'desconhecidas',
      hash: arquivo.hash,
      ok: problemas.length === 0,
      problemas,
    });

    for (const problema of problemas) {
      findings.push({
        severidade: 'block',
        policy: 'global-policy',
        rule: 'criativo_invalido',
        mensagem: `${arquivo.arquivo}: ${problema}`,
        detalhes: { arquivo: arquivo.arquivo },
      });
    }
  }

  return { relatorios, findings, duplicados };
}

export function formatarBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
}
