/**
 * ============================================================
 *  CONFIGURAÇÃO CENTRAL DO SITE — EXPANSION PRODUÇÕES
 * ============================================================
 *  Todo o conteúdo editável vive neste arquivo: contatos,
 *  vídeos, projetos, depoimentos, perguntas e textos-chave.
 *  Nenhum componente precisa ser tocado para trocar conteúdo.
 *
 *  Itens marcados com [EDITAR] são placeholders aguardando
 *  o dado real.
 * ============================================================
 */

/** Fonte de vídeo aceita: YouTube, Vimeo, Google Drive ou arquivo próprio. */
export type VideoSource =
  | { type: 'youtube'; id: string }
  | { type: 'vimeo'; id: string }
  | { type: 'drive'; id: string }
  | { type: 'file'; url: string }

export type PortfolioTab = 'eventos' | 'marcas' | 'tempo-real' | 'bastidores' | 'aftermovies'

export interface PortfolioItem {
  title: string
  tab: PortfolioTab
  category: string
  year: string
  city: string
  description: string
  video: VideoSource | null
  /** Imagem de capa (opcional). Sem imagem, o site gera um poster cinematográfico. */
  thumbnail?: string
}

export const site = {
  brand: {
    name: 'Expansion Produções',
    shortName: 'EXPANSION',
    legalName: 'Expansion Produções',
    // [EDITAR] cidade-base da produtora
    city: 'Brasil',
    country: 'Brasil',
  },

  /** URL pública do site — usada em sitemap, OG e schema. [EDITAR] quando o domínio existir. */
  siteUrl: 'https://expansionproducoes.com.br',

  contact: {
    whatsapp: {
      // [EDITAR] número real com DDI+DDD, só dígitos. Ex.: '5531999998888'
      number: '5500000000000',
      display: '+55 (00) 00000-0000',
      defaultMessage:
        'Olá, equipe Expansion! Quero um orçamento para a cobertura audiovisual de um evento.',
    },
    email: 'expansioncompany.oficial@gmail.com',
    instagram: {
      // [EDITAR] handle real do Instagram
      handle: '@expansion.producoes',
      url: 'https://instagram.com/expansion.producoes',
    },
  },

  hero: {
    tag: 'PRODUÇÃO AUDIOVISUAL • EVENTOS • TEMPO REAL',
    headline: { line1: 'SEU EVENTO ACONTECE.', line2: 'O CONTEÚDO JÁ ESTÁ NO AR.' },
    subheadline:
      'Transformamos grandes momentos em conteúdos cinematográficos, com uma operação audiovisual preparada para captar, editar e entregar enquanto tudo ainda está acontecendo.',
    proof: '+100 EVENTOS ENTREGUES • COBERTURA EM TEMPO REAL • ATUAÇÃO NACIONAL',
    /**
     * [EDITAR] Vídeo de fundo do hero (mp4 leve, sem áudio, ~10s em loop, ideal < 4 MB).
     * Coloque o arquivo em site/public/media/hero.mp4 e troque para '/media/hero.mp4'.
     * Enquanto for null, o site usa um fundo cinematográfico animado em CSS.
     */
    backgroundVideo: null as string | null,
  },

  /** Marcas atendidas — logos em site/public/clients/. [EDITAR] com as logos reais. */
  clients: [
    { name: 'Marca 01', logo: null },
    { name: 'Marca 02', logo: null },
    { name: 'Marca 03', logo: null },
    { name: 'Marca 04', logo: null },
    { name: 'Marca 05', logo: null },
    { name: 'Marca 06', logo: null },
    { name: 'Marca 07', logo: null },
    { name: 'Marca 08', logo: null },
  ] as { name: string; logo: string | null }[],

  showreel: {
    kicker: 'SHOWREEL',
    headline: 'NÃO EXPLICAMOS APENAS. NÓS MOSTRAMOS.',
    /** Vídeo principal — hoje aponta para o aftermovie no Google Drive. [EDITAR] se preferir YouTube/Vimeo. */
    video: { type: 'drive', id: '12ChrG0uJqR_ENLGg_HqizS400Ktvkku7' } as VideoSource,
    videoTitle: 'Showreel Expansion Produções',
    dataPoints: ['CAPTAÇÃO', 'DIREÇÃO', 'EDIÇÃO', 'ENTREGA', 'TEMPO REAL'],
  },

  portfolio: {
    headline: 'TRABALHOS QUE CONTINUAM VIVOS DEPOIS QUE O EVENTO TERMINA.',
    tabs: [
      { id: 'eventos', label: 'Eventos' },
      { id: 'marcas', label: 'Marcas' },
      { id: 'tempo-real', label: 'Tempo Real' },
      { id: 'bastidores', label: 'Bastidores' },
      { id: 'aftermovies', label: 'Aftermovies' },
    ] as { id: PortfolioTab; label: string }[],
    items: [
      {
        title: 'Casais de Negócios',
        tab: 'eventos',
        category: 'Cobertura de evento',
        year: '2026',
        city: 'Brasil', // [EDITAR] cidade do evento
        description:
          'Cobertura completa de evento de negócios, do palco aos bastidores, com captação multicâmera.',
        video: { type: 'drive', id: '11LWd18KAJfSlT-CQ2oPE1LfMr77Wn9ED' },
      },
      {
        title: 'Aftermovie EDN — Dia 2',
        tab: 'aftermovies',
        category: 'Aftermovie',
        year: '2026',
        city: 'Brasil', // [EDITAR] cidade do evento
        description:
          'Aftermovie cinematográfico que condensa a energia do segundo dia do evento em poucos minutos.',
        video: { type: 'drive', id: '12ChrG0uJqR_ENLGg_HqizS400Ktvkku7' },
      },
      {
        title: 'Conteúdo no ar durante o evento',
        tab: 'tempo-real',
        category: 'Entrega em tempo real',
        year: '2026',
        city: 'Brasil', // [EDITAR] cidade do evento
        description:
          'Reel captado, editado e publicado enquanto o evento ainda acontecia — a especialidade da casa.',
        video: { type: 'drive', id: '129miHWecMVsF-OU-VKVqPpu-XvvyF83Q' },
      },
      // [EDITAR] projetos abaixo são placeholders aguardando vídeo real.
      {
        title: 'Projeto para marca',
        tab: 'marcas',
        category: 'Conteúdo para marca',
        year: '—',
        city: '—',
        description: 'Espaço reservado para um projeto de marca. Substitua no arquivo de configuração.',
        video: null,
      },
      {
        title: 'Bastidores da operação',
        tab: 'bastidores',
        category: 'Bastidores',
        year: '—',
        city: '—',
        description: 'Espaço reservado para um vídeo de bastidores. Substitua no arquivo de configuração.',
        video: null,
      },
    ] as PortfolioItem[],
  },

  testimonials: {
    kicker: 'DEPOIMENTOS',
    headline: 'QUEM VIVEU A PRODUÇÃO CONTA MELHOR.',
    /** Depoimentos em vídeo — hoje apontam para os arquivos no Google Drive. */
    videos: [
      {
        name: 'Dr. João', // [EDITAR] nome completo
        company: 'Empresa do cliente', // [EDITAR]
        role: 'Cliente Expansion', // [EDITAR] cargo
        projectType: 'Cobertura de evento',
        video: { type: 'drive', id: '1UNjB63hKO8O89FCG8VBNVBc7li_T1SGE' } as VideoSource,
        photo: null as string | null, // [EDITAR] foto em site/public/testimonials/
      },
      {
        name: 'Luiz Filho', // [EDITAR] nome completo
        company: 'Empresa do cliente', // [EDITAR]
        role: 'Cliente Expansion', // [EDITAR] cargo
        projectType: 'Cobertura de evento',
        video: { type: 'drive', id: '1Sm9cwCb5MhVjACosxlTOdlwgUGjbnDgV' } as VideoSource,
        photo: null as string | null,
      },
      {
        name: 'Cliente Expansion', // [EDITAR] nome do terceiro depoimento
        company: 'Empresa do cliente', // [EDITAR]
        role: 'Cliente Expansion', // [EDITAR]
        projectType: 'Cobertura de evento',
        video: { type: 'drive', id: '1wYO_S7ZT569CMR50t5W_7XJtD7zVKODD' } as VideoSource,
        photo: null as string | null,
      },
    ],
    /** [EDITAR] Depoimentos escritos reais (transcreva dos vídeos ou colete novos). */
    quotes: [
      {
        quote:
          '“Espaço reservado para um depoimento escrito real do cliente sobre a entrega da Expansion.”',
        name: 'Nome do cliente',
        role: 'Cargo',
        company: 'Empresa',
        photo: null as string | null,
        logo: null as string | null,
      },
      {
        quote:
          '“Espaço reservado para um depoimento escrito real do cliente sobre a operação em tempo real.”',
        name: 'Nome do cliente',
        role: 'Cargo',
        company: 'Empresa',
        photo: null,
        logo: null,
      },
      {
        quote:
          '“Espaço reservado para um depoimento escrito real do cliente sobre o resultado do conteúdo.”',
        name: 'Nome do cliente',
        role: 'Cargo',
        company: 'Empresa',
        photo: null,
        logo: null,
      },
    ],
    /** [EDITAR] Cases reais com resultados comprovados. Não publique números inventados. */
    results: [
      {
        client: 'Nome do evento ou cliente',
        challenge: 'Qual era o desafio do evento? (placeholder)',
        solution: 'Qual foi a solução audiovisual desenhada? (placeholder)',
        delivery: 'O que foi entregue e em quanto tempo? (placeholder)',
        result: 'Resultado comprovado com fonte real. (placeholder)',
      },
      {
        client: 'Nome do evento ou cliente',
        challenge: 'Qual era o desafio do evento? (placeholder)',
        solution: 'Qual foi a solução audiovisual desenhada? (placeholder)',
        delivery: 'O que foi entregue e em quanto tempo? (placeholder)',
        result: 'Resultado comprovado com fonte real. (placeholder)',
      },
    ],
  },

  stats: [
    { value: 100, prefix: '+', suffix: '', label: 'eventos entregues', numeric: true },
    { value: 'TEMPO REAL', label: 'nossa especialidade', numeric: false },
    { value: 'BRASIL', label: 'área de atuação', numeric: false },
    { value: 'END-TO-END', label: 'da captação à entrega', numeric: false },
  ] as (
    | { value: number; prefix: string; suffix: string; label: string; numeric: true }
    | { value: string; label: string; numeric: false }
  )[],

  differentials: [
    {
      title: 'Direção criativa',
      description:
        'Cada evento tem um conceito visual próprio. Definimos linguagem, ritmo e identidade antes da primeira gravação.',
      icon: 'director' as const,
    },
    {
      title: 'Captação profissional',
      description:
        'Equipe multicâmera, lentes cinematográficas e áudio dedicado para não perder nenhum momento decisivo.',
      icon: 'camera' as const,
    },
    {
      title: 'Edição em tempo real',
      description:
        'Ilha de edição montada dentro do evento. O conteúdo é cortado, tratado e aprovado no local.',
      icon: 'timeline' as const,
    },
    {
      title: 'Entrega multiplataforma',
      description:
        'Formatos prontos para Instagram, YouTube, telões e imprensa — publicados enquanto o público ainda vive o evento.',
      icon: 'broadcast' as const,
    },
  ],

  process: {
    headline: 'DA PAUTA AO PÚBLICO, SEM PERDER O MOMENTO.',
    support:
      'Da primeira conversa à publicação final, cada etapa é planejada para que sua marca consiga viver o evento e, ao mesmo tempo, dominar a atenção de quem está acompanhando de fora.',
    steps: [
      {
        title: 'Imersão',
        description: 'Entendemos o evento, o público e o que o conteúdo precisa provocar.',
      },
      {
        title: 'Planejamento',
        description: 'Roteiro de cobertura, equipe, equipamentos e cronograma de entregas.',
      },
      {
        title: 'Captação',
        description: 'Operação multicâmera no evento, com direção de cena e áudio dedicado.',
      },
      {
        title: 'Entrega',
        description: 'Edição em tempo real e publicação enquanto o evento ainda acontece.',
      },
    ],
  },

  cta: {
    headline: 'SEU PRÓXIMO EVENTO MERECE SER LEMBRADO ENQUANTO AINDA ESTÁ ACONTECENDO.',
    subheadline:
      'Conte o que você está planejando. Nossa equipe transforma a ideia em uma operação audiovisual completa.',
    projectTypes: [
      'Cobertura de evento',
      'Aftermovie',
      'Conteúdo em tempo real',
      'Conteúdo para marca',
      'Outro projeto',
    ],
    /**
     * [EDITAR] Endpoint de envio do formulário (API própria, Supabase, Formspree...).
     * Enquanto for null, o formulário envia a mensagem formatada direto pelo WhatsApp.
     */
    formEndpoint: null as string | null,
  },

  faq: [
    {
      question: 'Vocês atendem fora da cidade?',
      answer:
        'Sim. A operação da Expansion é preparada para viajar: atendemos eventos em todo o Brasil, com logística de equipe e equipamento inclusa no planejamento.',
    },
    {
      question: 'Como funciona a entrega em tempo real?',
      answer:
        'Montamos uma ilha de edição dentro do próprio evento. Enquanto uma parte da equipe capta, outra edita e finaliza — os conteúdos são aprovados e publicados enquanto o evento ainda está acontecendo.',
    },
    {
      question: 'Com quanto tempo de antecedência devo contratar?',
      answer:
        'O ideal é fechar com pelo menos algumas semanas de antecedência, para garantir agenda e um planejamento completo. Para datas próximas, fale com a equipe — sempre que houver agenda, encontramos um formato.',
    },
    {
      question: 'Vocês trabalham com eventos de quais tamanhos?',
      answer:
        'De encontros corporativos intimistas a eventos de grande porte com palco e público. A equipe e o número de câmeras são dimensionados para cada projeto.',
    },
    {
      question: 'Como solicito um orçamento?',
      answer:
        'Pelo formulário no fim da página ou direto pelo WhatsApp. Conte a data, a cidade e o formato do evento — respondemos com uma proposta sob medida.',
    },
  ],
} as const

/** Monta o link do WhatsApp com mensagem pré-preenchida. */
export function whatsappLink(message?: string): string {
  const text = encodeURIComponent(message ?? site.contact.whatsapp.defaultMessage)
  return `https://wa.me/${site.contact.whatsapp.number}?text=${text}`
}
