import type { ClientRecord } from '../clients/schema.js';
import type { PolicyEngine } from '../policies/engine.js';
import { formatMoney } from '../shared/money.js';
import { daysBetween } from '../shared/time.js';
import type {
  Achado,
  AudienceAdvice,
  CampaignAdvisor,
  CopyAdvice,
  CopySuggestion,
  CreativeAdvice,
  StrategyAdvice,
} from './types.js';

/**
 * Gestor IA — implementacao deterministica.
 *
 * Nao chama modelo de linguagem. Aplica regras de gestor de trafego sobre
 * dados reais do cadastro, do briefing e dos metadados de criativo. Toda saida
 * e reproduzivel: mesma entrada, mesma recomendacao.
 *
 * O que exigiria visao computacional (gancho nos primeiros segundos, clareza da
 * oferta, legibilidade) e DECLARADO como nao avaliado, nunca simulado.
 */

export interface StrategyInput {
  readonly client: ClientRecord;
  readonly modelo: string;
  readonly objetivo: string;
  readonly destino: string;
  readonly dailyBudgetCents: number | null;
  readonly lifetimeBudgetCents: number | null;
  readonly startTime: string | null;
  readonly stopTime: string | null;
  readonly criativos: number;
  readonly publicoDescrito: string;
  readonly remarketing: boolean;
  readonly temProva: boolean;
}

/** Piso pratico por conjunto/dia para a Meta sair da fase de aprendizado. */
const MINIMO_POR_CONJUNTO_CENTS = 2000;

const METRICA_POR_MODELO: Record<
  string,
  { principal: string; secundarias: string[]; observar: string[] }
> = {
  whatsapp_conversas: {
    principal: 'Custo por conversa iniciada',
    secundarias: ['CTR', 'CPM', 'Frequencia', 'Cliques no link'],
    observar: [
      'Conversa iniciada nao e lead qualificado: acompanhe quantas viram atendimento.',
      'Frequencia acima de 3 com CTR caindo indica desgaste do criativo.',
    ],
  },
  leads_formulario: {
    principal: 'Custo por lead (CPL)',
    secundarias: ['Taxa de conclusao do formulario', 'CTR', 'CPM'],
    observar: [
      'Formulario curto traz lead barato e frio; longo traz caro e quente.',
      'Compare CPL com o ticket medio antes de julgar caro.',
    ],
  },
  vendas_site: {
    principal: 'ROAS',
    secundarias: ['CPA', 'Taxa de conversao', 'CTR', 'Visualizacoes da pagina'],
    observar: [
      'Sem pixel disparando corretamente, nenhum numero de conversao e confiavel.',
      'Cheque se o evento de compra dispara uma vez por pedido.',
    ],
  },
};

export class DeterministicAdvisor implements CampaignAdvisor {
  readonly nome = 'gestor-deterministico';
  readonly usaModelo = false;

  constructor(private readonly policies: PolicyEngine) {}

  // ------------------------------------------------------------- estrategia

  strategy(input: StrategyInput): StrategyAdvice {
    const achados: Achado[] = [];
    const moeda = input.client.config.moeda;
    const diario =
      input.dailyBudgetCents ??
      (input.lifetimeBudgetCents && input.startTime && input.stopTime
        ? Math.round(
            input.lifetimeBudgetCents /
              Math.max(1, Math.ceil(daysBetween(input.startTime, input.stopTime))),
          )
        : null);

    // Quantos conjuntos a verba sustenta sem pulverizar.
    const conjuntosSustentaveis = diario
      ? Math.max(1, Math.floor(diario / MINIMO_POR_CONJUNTO_CENTS))
      : 1;
    const conjuntos = Math.min(input.remarketing ? 2 : 1, conjuntosSustentaveis);

    if (diario !== null) {
      achados.push({
        origem: 'calculo',
        severidade: 'info',
        titulo: `Orcamento diario de ${formatMoney(diario, moeda)}`,
        detalhe: `Sustenta ${conjuntosSustentaveis} conjunto(s) com pelo menos ${formatMoney(MINIMO_POR_CONJUNTO_CENTS, moeda)}/dia cada.`,
        suporte: { diarioCents: diario, minimoPorConjuntoCents: MINIMO_POR_CONJUNTO_CENTS },
      });

      if (diario < MINIMO_POR_CONJUNTO_CENTS) {
        achados.push({
          origem: 'recomendacao',
          severidade: 'alerta',
          titulo: 'Verba baixa para sair do aprendizado',
          detalhe: `Abaixo de ${formatMoney(MINIMO_POR_CONJUNTO_CENTS, moeda)}/dia a Meta demora a estabilizar a entrega. Um conjunto so, um criativo so.`,
        });
      }

      if (input.remarketing && conjuntosSustentaveis < 2) {
        achados.push({
          origem: 'recomendacao',
          severidade: 'alerta',
          titulo: 'Verba nao sustenta prospeccao e remarketing juntos',
          detalhe:
            'Separar em dois conjuntos com essa verba pulveriza os dois. Comece so com prospeccao e abra remarketing quando houver publico acumulado.',
        });
      }
    } else {
      achados.push({
        origem: 'inferencia',
        severidade: 'alerta',
        titulo: 'Sem orcamento diario definido',
        detalhe: 'Nao da para dimensionar estrutura sem saber a verba diaria.',
      });
    }

    // Criativos por conjunto.
    const anunciosPorConjunto = Math.min(Math.max(input.criativos, 1), 3);
    if (input.criativos === 1) {
      achados.push({
        origem: 'recomendacao',
        severidade: 'recomendacao',
        titulo: 'Um criativo so nao permite teste',
        detalhe:
          'Com dois ou tres criativos a Meta encontra o que performa. Com um, voce descobre que nao funcionou sem saber o motivo.',
      });
    }
    if (input.criativos > 4) {
      achados.push({
        origem: 'recomendacao',
        severidade: 'alerta',
        titulo: `${input.criativos} criativos dividem a verba demais`,
        detalhe:
          'Acima de tres ou quatro por conjunto, nenhum acumula dados suficientes para decidir.',
      });
    }

    // Janela.
    if (input.startTime && input.stopTime) {
      const dias = Math.ceil(daysBetween(input.startTime, input.stopTime));
      if (dias < 7) {
        achados.push({
          origem: 'recomendacao',
          severidade: 'alerta',
          titulo: `Janela de ${dias} dia(s) e curta`,
          detalhe:
            'A fase de aprendizado costuma consumir os primeiros dias. Abaixo de sete, voce julga a campanha antes de ela estabilizar.',
          suporte: { dias },
        });
      }
    }

    // Coerencia destino x modelo.
    const destinoEsperado: Record<string, string> = {
      whatsapp_conversas: 'whatsapp',
      leads_formulario: 'formulario',
      vendas_site: 'site',
    };
    const esperado = destinoEsperado[input.modelo];
    if (esperado && input.destino !== esperado) {
      achados.push({
        origem: 'recomendacao',
        severidade: 'bloqueio',
        titulo: 'Destino incoerente com o modelo',
        detalhe: `O modelo ${input.modelo} entrega em "${esperado}", mas o destino escolhido foi "${input.destino}".`,
      });
    }

    if (!input.temProva) {
      achados.push({
        origem: 'recomendacao',
        severidade: 'recomendacao',
        titulo: 'Sem prova social no briefing',
        detalhe:
          'Depoimento, nota de avaliacao ou numero de clientes reduz o custo por resultado em oferta de ticket baixo. Vale preencher.',
      });
    }

    if (input.publicoDescrito.trim().length < 20) {
      achados.push({
        origem: 'inferencia',
        severidade: 'alerta',
        titulo: 'Publico descrito de forma vaga',
        detalhe: 'Descricao curta demais para avaliar coerencia entre oferta e segmentacao.',
      });
    }

    const metricas = METRICA_POR_MODELO[input.modelo] ?? {
      principal: 'Custo por resultado',
      secundarias: ['CTR', 'CPM'],
      observar: [],
    };

    const temBloqueio = achados.some((a) => a.severidade === 'bloqueio');
    const temAlerta = achados.some((a) => a.severidade === 'alerta');

    return {
      estrutura: {
        conjuntos,
        anunciosPorConjunto,
        justificativa:
          diario !== null
            ? `${conjuntos} conjunto(s) x ${anunciosPorConjunto} anuncio(s), com ${formatMoney(Math.floor(diario / Math.max(1, conjuntos)), moeda)}/dia por conjunto.`
            : 'Defina o orcamento diario para dimensionar a estrutura.',
        distribuicaoVerba:
          diario !== null && conjuntos > 1
            ? `Divida ${formatMoney(diario, moeda)} igualmente entre os conjuntos e ajuste depois de sete dias.`
            : 'Verba concentrada num conjunto so.',
      },
      metricaPrincipal: metricas.principal,
      metricasSecundarias: metricas.secundarias,
      oQueObservar: metricas.observar,
      achados,
      veredito: temBloqueio ? 'bloqueada' : temAlerta ? 'atencao' : 'pronta',
    };
  }

  // ---------------------------------------------------------------- publico

  audience(input: {
    client: ClientRecord;
    faixaEtaria: string;
    generos: string;
    interesses: readonly string[];
    regioes: readonly string[];
    remarketing: boolean;
  }): AudienceAdvice {
    const achados: Achado[] = [];
    const faixa = /^(\d{2})\s*[-a]\s*(\d{2})$/.exec(input.faixaEtaria.trim());
    const min = faixa ? Number(faixa[1]) : null;
    const max = faixa ? Number(faixa[2]) : null;

    if (min !== null && max !== null) {
      const amplitude = max - min;
      if (amplitude <= 5) {
        achados.push({
          origem: 'recomendacao',
          severidade: 'alerta',
          titulo: `Faixa etaria de ${amplitude} anos e estreita`,
          detalhe:
            'Faixa curta encarece o CPM sem ganho de qualidade na maioria dos casos de varejo.',
          suporte: { min, max },
        });
      }
      if (amplitude >= 40) {
        achados.push({
          origem: 'recomendacao',
          severidade: 'recomendacao',
          titulo: `Faixa etaria de ${amplitude} anos e muito ampla`,
          detalhe:
            'Vale separar em conjuntos por faixa se a verba sustentar, para ler o que responde melhor.',
        });
      }
    }

    if (input.interesses.length > 8) {
      achados.push({
        origem: 'recomendacao',
        severidade: 'alerta',
        titulo: `${input.interesses.length} interesses empilhados`,
        detalhe:
          'Muitos interesses juntos viram um publico difuso que nao ensina nada sobre quem converte.',
      });
    }

    if (input.interesses.length === 0 && !input.remarketing) {
      achados.push({
        origem: 'recomendacao',
        severidade: 'info',
        titulo: 'Publico aberto',
        detalhe:
          'Sem interesses, a Meta usa o proprio algoritmo para achar o publico. Costuma funcionar bem com criativo forte e verba constante.',
      });
    }

    if (input.regioes.length === 0) {
      achados.push({
        origem: 'recomendacao',
        severidade: 'bloqueio',
        titulo: 'Nenhuma regiao definida',
        detalhe:
          'Campanha sem regiao entrega no pais inteiro — raramente e o que se quer numa loja.',
      });
    }

    return {
      achados,
      sugestao: {
        faixaEtaria: input.faixaEtaria,
        generos: input.generos,
        interesses: input.interesses.slice(0, 6),
        justificativa:
          'Mantem a segmentacao do briefing, limitando interesses a seis para o publico nao ficar difuso.',
      },
    };
  }

  // ------------------------------------------------------------------- copy

  copy(input: {
    modelo: string;
    produto: string;
    diferenciais: readonly string[];
    provas: readonly string[];
    criativos: readonly string[];
    nomeCliente: string;
  }): CopyAdvice {
    const diferencial = input.diferenciais[0] ?? '';
    const prova = input.provas[0] ?? '';
    const sugestoes: CopySuggestion[] = [];

    const cta =
      input.modelo === 'whatsapp_conversas'
        ? 'Chama no WhatsApp que a gente te ajuda a escolher.'
        : input.modelo === 'leads_formulario'
          ? 'Preencha o formulario e a gente entra em contato.'
          : 'Aproveite no site.';

    const modelos = [
      {
        nome: 'lancamento_colecao',
        titulo: input.produto.slice(0, 40),
        descricao: diferencial.slice(0, 60) || 'Novidade na loja',
        texto: `Chegou ${input.produto} na ${input.nomeCliente}.${diferencial ? ` ${diferencial}.` : ''}${prova ? ` ${prova}.` : ''} ${cta}`,
      },
      {
        nome: 'prova_social',
        titulo: prova ? prova.slice(0, 40) : `${input.nomeCliente} — o que dizem`,
        descricao: diferencial.slice(0, 60) || 'Quem comprou, voltou',
        texto: `${prova ? `${prova}. ` : ''}${input.produto}.${diferencial ? ` ${diferencial}.` : ''} ${cta}`,
      },
      {
        nome: 'objecao_tamanho',
        titulo: 'Ficou na duvida do tamanho?',
        descricao: diferencial.slice(0, 60) || 'A gente te ajuda a escolher',
        texto: `${input.produto}. Se ficar na duvida do tamanho ou do caimento, fala com a gente antes de fechar.${diferencial ? ` ${diferencial}.` : ''} ${cta}`,
      },
    ];

    input.criativos.slice(0, 3).forEach((criativo, indice) => {
      const modelo = modelos[indice % modelos.length]!;
      sugestoes.push({
        ref: `copy-${indice + 1}`,
        titulo: modelo.titulo,
        descricao: modelo.descricao,
        texto: modelo.texto,
        modelo: modelo.nome,
        origem: 'recomendacao',
      });
    });

    const achados: Achado[] = [
      {
        origem: 'recomendacao',
        severidade: 'info',
        titulo: 'Sugestoes montadas a partir do briefing',
        detalhe:
          'Sao modelos preenchidos com produto, diferencial e prova do proprio briefing — nao texto gerado por modelo de linguagem. Revise antes de usar.',
      },
    ];

    if (!prova) {
      achados.push({
        origem: 'recomendacao',
        severidade: 'recomendacao',
        titulo: 'Sem prova para usar na copy',
        detalhe: 'Preencha "Provas" no briefing e as sugestoes ficam mais fortes.',
      });
    }

    return { sugestoes, achados, geradoPorModelo: false };
  }

  // -------------------------------------------------------------- criativo

  creative(input: {
    arquivo: string;
    largura: number | null;
    altura: number | null;
    tipo: 'imagem' | 'video';
    bytes: number;
  }): CreativeAdvice {
    const achados: Achado[] = [];
    const { largura, altura } = input;
    const proporcao = largura && altura ? largura / altura : null;

    const compatibilidade = {
      feed: proporcao !== null ? proporcao >= 0.7 && proporcao <= 1.92 : false,
      quadrado: proporcao !== null ? Math.abs(proporcao - 1) < 0.06 : false,
      stories: proporcao !== null ? proporcao <= 0.58 : false,
      reels: proporcao !== null ? proporcao <= 0.58 : false,
    };

    if (proporcao === null) {
      achados.push({
        origem: 'inferencia',
        severidade: 'alerta',
        titulo: 'Dimensoes nao lidas',
        detalhe:
          'Sem largura e altura nao da para dizer em quais posicionamentos o criativo cabe sem corte.',
      });
    } else {
      const rotulo = proporcao > 1.05 ? 'horizontal' : proporcao < 0.95 ? 'vertical' : 'quadrado';
      achados.push({
        origem: 'dado_real',
        severidade: 'info',
        titulo: `${largura}x${altura} (${rotulo}, ${proporcao.toFixed(2)}:1)`,
        detalhe: 'Dimensao lida do arquivo enviado.',
        suporte: { largura, altura, proporcao: Number(proporcao.toFixed(3)) },
      });

      if (!compatibilidade.stories) {
        achados.push({
          origem: 'calculo',
          severidade: 'recomendacao',
          titulo: 'Nao ideal para Stories e Reels',
          detalhe:
            'Stories e Reels pedem 9:16. Neste formato a Meta preenche as bordas ou corta — o que costuma cortar texto no topo e no rodape.',
        });
      }
      if (!compatibilidade.feed) {
        achados.push({
          origem: 'calculo',
          severidade: 'alerta',
          titulo: 'Fora da faixa aceita no Feed',
          detalhe: 'O Feed aceita de 4:5 a 1.91:1. Fora disso o corte e garantido.',
        });
      }
    }

    return {
      arquivo: input.arquivo,
      achados,
      compatibilidade,
      naoAvaliado: [
        'Gancho nos primeiros segundos',
        'Clareza da oferta na imagem',
        'Legibilidade do texto sobre o video',
        'Presenca de legenda',
        'Exposicao do produto',
        'CTA visivel no criativo',
      ],
    };
  }
}
