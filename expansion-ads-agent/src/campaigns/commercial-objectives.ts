import { listTemplates } from './templates/index.js';

/**
 * Objetivo comercial -> modelo tecnico.
 *
 * A pergunta que o operador responde e "o que esta campanha precisa gerar?",
 * nao "qual optimization_goal voce quer". A traducao para a estrutura da Meta
 * mora aqui, no backend, e nunca no frontend: se um modelo mudar de objetivo
 * tecnico, a interface acompanha sem alteracao.
 *
 * Objetivo sem modelo implementado aparece como INDISPONIVEL, com o motivo.
 * Nunca como opcao que falha depois.
 */
export interface ObjetivoComercial {
  readonly id: string;
  readonly rotulo: string;
  readonly descricao: string;
  /** Id do modelo tecnico, ou null quando ainda nao ha implementacao. */
  readonly modelo: string | null;
  readonly indisponivelPorque?: string;
}

const CATALOGO: readonly ObjetivoComercial[] = [
  {
    id: 'mensagens_whatsapp',
    rotulo: 'Receber mensagens no WhatsApp',
    descricao:
      'A pessoa clica no anuncio e cai direto na conversa do WhatsApp, com uma mensagem ja escrita. Melhor caminho para loja que vende no atendimento.',
    modelo: 'whatsapp_conversas',
  },
  {
    id: 'captar_leads',
    rotulo: 'Captar leads',
    descricao:
      'A pessoa preenche um formulario dentro do proprio Facebook ou Instagram, sem sair do aplicativo. Bom para lista de contatos e agendamento.',
    modelo: 'leads_formulario',
  },
  {
    id: 'vender_site',
    rotulo: 'Vender pelo site',
    descricao:
      'A pessoa vai para a loja online e a compra e medida pelo pixel. Exige pixel instalado e evento de compra funcionando.',
    modelo: 'vendas_site',
  },
  {
    id: 'mensagens_instagram',
    rotulo: 'Receber mensagens no Instagram',
    descricao: 'A pessoa cai no Direct do Instagram.',
    modelo: null,
    indisponivelPorque:
      'Modelo ainda nao implementado. A estrutura de modelos aceita, mas nenhum foi escrito para Instagram Direct.',
  },
  {
    id: 'trafego_site',
    rotulo: 'Levar pessoas para o site',
    descricao: 'Otimiza por clique e visita, sem medir venda.',
    modelo: null,
    indisponivelPorque: 'Modelo ainda nao implementado. Para venda medida, use "Vender pelo site".',
  },
  {
    id: 'reconhecimento',
    rotulo: 'Gerar reconhecimento',
    descricao: 'Alcance e lembranca de marca, sem meta de resposta direta.',
    modelo: null,
    indisponivelPorque: 'Modelo ainda nao implementado.',
  },
  {
    id: 'remarketing',
    rotulo: 'Reativar pessoas interessadas',
    descricao: 'Fala com quem ja interagiu com a marca.',
    modelo: null,
    indisponivelPorque:
      'Publicos personalizados ainda nao sao montados pelo sistema. Da para fazer remarketing usando um modelo disponivel com publico ja criado na Meta.',
  },
  {
    id: 'loja_fisica',
    rotulo: 'Promover loja fisica',
    descricao: 'Leva gente ate o endereco.',
    modelo: null,
    indisponivelPorque: 'Modelo ainda nao implementado.',
  },
];

export interface ObjetivoComercialResolvido extends ObjetivoComercial {
  readonly disponivel: boolean;
  /** Detalhe tecnico do modelo, quando existe. Vem do proprio modelo. */
  readonly tecnico: {
    readonly objective: string;
    readonly destinationType: string;
    readonly optimizationGoal: string;
    readonly billingEvent: string;
    readonly callToAction: string;
    readonly requisitosDoCliente: readonly string[];
  } | null;
}

export function listarObjetivosComerciais(): ObjetivoComercialResolvido[] {
  const modelos = new Map(listTemplates().map((t) => [t.id as string, t]));

  return CATALOGO.map((objetivo) => {
    const modelo = objetivo.modelo ? modelos.get(objetivo.modelo) : undefined;
    return {
      ...objetivo,
      disponivel: Boolean(modelo),
      tecnico: modelo
        ? {
            objective: modelo.objective,
            destinationType: modelo.destinationType,
            optimizationGoal: modelo.optimizationGoal,
            billingEvent: modelo.billingEvent,
            callToAction: modelo.callToAction,
            requisitosDoCliente: modelo.requisitosDoCliente,
          }
        : null,
    };
  });
}

export function modeloParaObjetivo(objetivoId: string): string | null {
  return CATALOGO.find((o) => o.id === objetivoId)?.modelo ?? null;
}
