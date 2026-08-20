import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { formatMoney } from '../shared/money.js';
import type { ObjectInsights } from './insights.js';

export interface ReportInput {
  readonly titulo: string;
  readonly cliente: string;
  readonly conta: string;
  readonly periodo: string;
  readonly moeda: string;
  readonly geradoEm: string;
  readonly linhas: readonly ObjectInsights[];
  readonly anunciosComProblema?: ReadonlyArray<{
    id: string;
    nome: string | null;
    status: string | null;
    problema: string;
  }>;
  readonly observacoes?: readonly string[];
}

function num(value: number | null, casas = 2): string {
  return value === null ? '—' : value.toFixed(casas);
}

function inteiro(value: number | null): string {
  return value === null ? '—' : Math.round(value).toLocaleString('pt-BR');
}

function dinheiro(value: number | null, moeda: string): string {
  if (value === null) return '—';
  return formatMoney(Math.round(value * 100), moeda);
}

/**
 * Relatorio em markdown. Metrica ausente aparece como "—", nunca como zero:
 * a diferenca entre "nao houve" e "a Meta nao devolveu" muda a decisao.
 */
export function renderReport(input: ReportInput): string {
  const linhas: string[] = [];

  linhas.push(`# ${input.titulo}`, '');
  linhas.push(`- Cliente: **${input.cliente}**`);
  linhas.push(`- Conta: \`${input.conta}\``);
  linhas.push(`- Periodo: **${input.periodo}**`);
  linhas.push(`- Gerado em: ${input.geradoEm}`);
  linhas.push('');

  if (input.linhas.length === 0) {
    linhas.push('> Nenhum dado de desempenho retornado pela Meta para este periodo.');
    linhas.push('>');
    linhas.push(
      '> Isso acontece quando a campanha nunca entregou, quando o periodo nao tem veiculacao ou quando ainda nao ha credencial configurada.',
    );
    linhas.push('');
  } else {
    const totalInvestido = input.linhas.reduce((soma, linha) => soma + (linha.investimento ?? 0), 0);
    linhas.push('## Resumo', '');
    linhas.push(`- Investimento total: **${dinheiro(totalInvestido, input.moeda)}**`);
    linhas.push(`- Objetos analisados: ${input.linhas.length}`);
    linhas.push('');

    linhas.push('## Desempenho', '');
    linhas.push(
      '| Objeto | Investimento | Alcance | Impressoes | Freq. | CPM | Cliques | CTR | CPC | Conversas | Leads | Compras | CPL | CPA | Receita | ROAS |',
    );
    linhas.push(
      '| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |',
    );

    for (const linha of input.linhas) {
      linhas.push(
        [
          `${linha.nome ?? linha.objetoId}`,
          dinheiro(linha.investimento, input.moeda),
          inteiro(linha.alcance),
          inteiro(linha.impressoes),
          num(linha.frequencia),
          dinheiro(linha.cpm, input.moeda),
          inteiro(linha.cliques),
          linha.ctr === null ? '—' : `${num(linha.ctr)}%`,
          dinheiro(linha.cpc, input.moeda),
          inteiro(linha.conversas),
          inteiro(linha.leads),
          inteiro(linha.compras),
          dinheiro(linha.cpl, input.moeda),
          dinheiro(linha.cpa, input.moeda),
          dinheiro(linha.receita, input.moeda),
          num(linha.roas),
        ].join(' | '),
      );
    }
    linhas.push('');

    const indisponiveis = [...new Set(input.linhas.flatMap((linha) => linha.indisponiveis))];
    if (indisponiveis.length > 0) {
      linhas.push('## Metricas nao disponiveis neste periodo', '');
      linhas.push(
        `A Meta nao retornou: ${indisponiveis.join(', ')}. Ausencia de metrica nao equivale a resultado zero.`,
      );
      linhas.push('');
    }
  }

  if (input.anunciosComProblema && input.anunciosComProblema.length > 0) {
    linhas.push('## Anuncios com erro ou sem entrega', '');
    linhas.push('| Anuncio | Status | Problema |');
    linhas.push('| --- | --- | --- |');
    for (const anuncio of input.anunciosComProblema) {
      linhas.push(`| ${anuncio.nome ?? anuncio.id} | ${anuncio.status ?? '—'} | ${anuncio.problema} |`);
    }
    linhas.push('');
  }

  if (input.observacoes && input.observacoes.length > 0) {
    linhas.push('## Observacoes', '');
    for (const observacao of input.observacoes) linhas.push(`- ${observacao}`);
    linhas.push('');
  }

  return linhas.join('\n');
}

export function saveReport(
  reportsDir: string,
  nomeArquivo: string,
  conteudo: string,
): string {
  mkdirSync(reportsDir, { recursive: true });
  const destino = path.join(reportsDir, nomeArquivo);
  writeFileSync(destino, conteudo.endsWith('\n') ? conteudo : `${conteudo}\n`, 'utf8');
  return destino;
}
