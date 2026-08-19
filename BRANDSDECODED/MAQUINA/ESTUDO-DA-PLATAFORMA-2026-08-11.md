# Estudo da Máquina de Carrosséis — plataforma BrandsDecoded

Levantamento feito em 11/08/2026 pela extensão do Claude no Chrome, percorrendo
`maquina.brandsdecoded.com.br` (v1.1.0) logado, do zero até a exportação. Esta sessão do
Claude Code não alcança o domínio — o proxy de egress recusa no CONNECT — então a
documentação veio de fora e é a fonte da verdade sobre a plataforma aqui dentro.

Carrossel de teste: tema de crédito imobiliário para corretor · projeto `expansion.assessoria`
· Brand Kit EXPANSION · **Template 1 Meio de Funil**.

Escopo respeitado: só o que a interface mostra. Nada de código-fonte, bundle, API ou
prompt interno.

---

## O achado que muda tudo

**A Máquina não gera texto nem headline. É um renderizador com templates e brand kit.**

O cérebro editorial mora fora, em dois GPTs do ChatGPT, linkados de dentro do Studio:

| Botão no Studio | Destino |
|---|---|
| Abrir Content Machine | ChatGPT — GPT "Máquina de Carrosséis 7.0 — Meio" |
| Melhorar Headline | ChatGPT — GPT "Headlines Virais — Content Machine 5.5" |

Zero geração acontece dentro do produto. A plataforma resolve **marca + layout + export**;
o ChatGPT resolve **o que dizer**.

**Consequência direta pra Expansion:** a skill `carrossel-viral` já faz as duas pontas —
gera o conteúdo *e* renderiza. O que falta não é capacidade, é o **padrão visual** deles.
É isso que este documento entrega.

---

## O contrato de entrada — e a peça que faltava

O campo de conteúdo aceita **um formato de texto simples**, e é isso que liga o agente ao
renderizador:

```
texto 1 - O que muda quando o crédito é bem estruturado
texto 2 - Não é vender mais imóvel. É parar de perder negócio no fim.
texto 3 - O crédito define o teto
...
texto 18 - Quer a análise de crédito dos seus clientes? Chama no direct.
```

**Ímpar vira headline, par vira texto de apoio. Dois blocos por slide. 18 no total.**

| Blocos | Slide |
|---|---|
| 1 / 2 | 01 Capa (headline / subheadline) |
| 3 / 4 | 02 |
| 5 / 6 | 03 |
| 7 / 8 | 04 |
| 9 / 10 | 05 |
| 11 / 12 | 06 |
| 13 / 14 | 07 |
| 15 / 16 | 08 |
| 17 / 18 | 09 CTA |

> **Isto fecha um circuito.** O `CONTENT-MACHINE-OPERACAO-CLAUDE.md` que já está guardado
> em `../CONTENT-MACHINE/docs/` produz **exatamente 18 textos**, com essa nomenclatura, em
> bloco ```md — e eu não sabia por quê. Agora sei: aquele prompt é o **alimentador desta
> plataforma**. Os dois arquivos são metades do mesmo produto.

O placeholder da caixa mente: mostra `- Texto linha 1`, mas o parser exige `texto N -`.
Erro só descoberto errando.

---

## O sistema visual

### Tela

| | Valor |
|---|---|
| Canvas lógico | **1080 × 1350 px** |
| Buffer real | **2160 × 2700 px** (DPR 2×) |
| Proporção padrão | 4:5 |
| Alternativa | 9:16 — *"aumenta o fundo acima/abaixo sem mexer no conteúdo"* (letterbox, não relayout) |

Cada slide é um `<canvas>`, não DOM nem SVG. As medidas abaixo estão em px sobre
1080 × 1350 — **escala 1:1 para o nosso renderizador**.

### Cores — três tokens, e só

O Brand Kit inteiro é isto:

| Token | Descrição na UI | Valor no kit EXPANSION |
|---|---|---|
| FUNDO | "fundo dos slides" | `#000000` |
| TEXTOS | "cor dos textos" | `#FFFFFF` |
| DESTAQUE | "títulos e detalhes" | `#FF9900` |

Toda a variedade visual dos nove slides sai de recombinar esses três valores. É a decisão
de design mais inteligente do produto: onboarding de marca em trinta segundos e
impossibilidade de ficar feio.

**O Brand Kit não é retroativo.** Aviso literal da plataforma: *"mudanças no Brand Kit
aplicam APENAS em carrosséis criados depois de salvar."* Cada carrossel carrega uma cópia
congelada — é molde de instanciação, não tema vivo.

### Tipografia

| Papel | Fonte |
|---|---|
| Título | HelveticaNowDisplay-Bold |
| Corpo | HelveticaNowDisplay-Medium |

Medidas lidas do painel TEXTO:

| Elemento | Tam. | Tracking | Entrelinha | Alinhamento |
|---|---|---|---|---|
| Capa · headline | **132** | −5.3px | **0.80** | centro |
| Capa · subheadline | **31** | 0 | **1.26** | centro |
| Slide interno · headline | **136** | −5.4px | **0.84** | esquerda |
| Slide interno · corpo | **41** | −0.8px | **1.17** | **justificado** |

Relações que importam:

- **Título ≈ 3,3× o corpo** (136/41 no interno; 4,3× na capa)
- Tracking do título é proporcional: **≈ −0,04em** — o campo recalcula sozinho
- Entrelinha do título **abaixo de 1** (0.80–0.84): bloco compacto, empilhado
- Corpo interno vai **justificado**; capa vai centralizada

### Ritmo dos nove slides

| # | Fundo | Função |
|---|---|---|
| 01 | imagem + gradiente | Capa — gancho e subgancho |
| 02 | `#F0F0F0` | Abertura — único slide com título laranja sobre claro |
| 03 | `#FF9900` | Argumento |
| 04 | `#000000` | Argumento |
| 05 | `#FF9900` | Argumento |
| 06 | `#000000` | Declaração — título no destaque, é a virada |
| 07 | `#FF9900` | Argumento |
| 08 | `#000000` | Declaração |
| 09 | `#F0F0F0` | CTA |

Alternância **laranja / preto**, com claro nas pontas.

### Elementos fixos

**Barra superior**, nos nove slides, três metadados em uma linha:

```
@handle          nome-2          copyright
(esquerda)    (centro-direita)   (direita)
```

Vêm dos CAMPOS GLOBAIS, cada um com ícone de olho pra ligar/desligar. **A cor adapta ao
fundo**: preta nos slides claros, branca nos laranja e pretos.

**Assinatura da capa** — chip centralizado acima da headline: avatar circular + @ + selo
azul de verificado (acessório ligável, com token de cor próprio).

**Botão circular de avanço** — círculo branco com seta → no canto inferior direito,
**só nos slides laranja** (03, 05, 07).

**Não existem:** numeração de slide, barra de progresso, rodapé com @, marca d'água. O
botão de CTA vem desligado por padrão.

### O destaque é por palavra

O mecanismo mais bem resolvido do produto. **Não é borda, nem fundo de bloco, nem número
grande — é palavra solta.** O painel quebra a frase em chips de palavra e você clica na que
quer destacar. Cada palavra ganha cor própria, ou marca-texto de fundo, e pode até ter
fonte e tamanho diferentes. Hex sugerido pela paleta: `#E8421A`.

> **Pegadinha:** o destaque é gravado **por índice de palavra**, não pelo texto. Trocar a
> headline mantém o laranja na mesma *posição*, agora em outra palavra. Nosso renderizador
> marca por conteúdo (`*palavra*`), o que é mais previsível — divergência deliberada.

### Imagens

Slots por slide, formatos PNG/JPG/WebP/MP4, 8 slots. Slides 06 e 08 são puramente
tipográficos, sem slot. Sem imagem, renderiza placeholder cinza. Na capa, o gradiente é o
que faz a foto virar preto sólido embaixo.

---

## Os cinco tipos de slide

| Tipo | Slides | Estrutura |
|---|---|---|
| **A — Capa** | 01 | Imagem full-bleed + gradiente. Chip de assinatura centralizado, headline centralizada 132px branca, subheadline 31px em `#E4E4E4`. Texto colado no rodapé. |
| **B — Claro com imagem** | 02 | Fundo `#F0F0F0`. Headline à esquerda em laranja, imagem com cantos arredondados no meio, corpo justificado em preto. |
| **C — Bloco laranja** | 03, 05, 07 | Fundo `#FF9900`. Imagem no topo, headline **preta** em caixa alta, corpo **branco** à esquerda, botão circular → no canto. |
| **D — Bloco preto** | 04, 06, 08 | Fundo `#000`. D1 (04) tem imagem no rodapé. D2 (06, 08) é declaração pura, headline gigante — laranja no 06, branca no 08. |
| **E — CTA** | 09 | Fundo `#F0F0F0`. Headline e corpo **ambos** em `#FF9900`, imagem no rodapé. |

**Não existem** no template: lista numerada, tabela, número grande isolado, citação. Lista
se faz escrevendo lista dentro do corpo.

Os templates de **topo de funil** trazem outros dois: foto full-bleed com headline
serifada, e cartão simulando post do X/Twitter.

---

## A restrição editorial que ninguém documenta

**Não há auto-fit.** As caixas de headline e de corpo são absolutas e de tamanho fixo. Sem
shrink-to-fit, sem reflow. **Headline longa passa por cima do texto de apoio**, sem aviso.

Medido em três versões do mesmo carrossel:

| Tamanho da headline | Resultado |
|---|---|
| ~70 caracteres | invade o corpo em **6 dos 9** slides |
| ~45 caracteres | invade em **4** |
| ~24 caracteres | encaixa |

> **Alvo prático: 20 a 26 caracteres, 2 a 3 palavras fortes, nos slides internos.**
> A capa aguenta ~45 porque é centralizada e tem mais área livre.

Os textos padrão do template confirmam o padrão: *"VOCÊ DEVERIA PUBLICAR MAIS."*,
*"O ERRO DA MAIORIA."*, *"PENSE EM QUEM NÃO TE CONHECE."*

Isso força disciplina editorial — headline curta performa — mas entrega peça quebrada se o
operador não souber.

Limites de campo: hook **250** caracteres, subhook **200**.

---

## Saída

| Opção | O que é |
|---|---|
| Exportar tudo | todos os slides como imagem |
| Exportar slide N | só o selecionado |
| Exportar .zip | pacote |
| PDF (LinkedIn) | documento de carrossel |
| Exportar Vídeo (MP4) | vídeo |

| Proporção | Saída |
|---|---|
| **4:5** (padrão) | 1080 × 1350 lógicos · buffer 2160 × 2700 |
| 9:16 | 1080 × 1920, só estende o fundo |

**Não vem legenda nem hashtag.** Não há campo, gerador ou área de caption em lugar nenhum.
Sai do Content Machine no ChatGPT, não da plataforma. Nada acompanha os arquivos — sem
README, sem metadados.

---

## O que copiar, o que melhorar

### Copiar

1. **Três tokens de marca.** FUNDO / TEXTOS / DESTAQUE resolvem tudo. Nossa ficha de
   cliente já tem exatamente isso.
2. **O ritmo alternado** laranja/preto com claro nas pontas.
3. **Destaque por palavra** como única decoração — sem bordas, sem badges, sem blocos.
4. **A razão tipográfica de 3,3×** entre título e corpo, com entrelinha do título abaixo de 1.
5. **O preview em moldura de Instagram**, com avatar, selo e "1.234 curtidas". Custa pouco
   e muda a percepção da entrega.
6. **A disciplina de headline curta** — 20 a 26 caracteres no interno.

### Melhorar

1. **Auto-fit.** Eles não têm; headline longa quebra a peça em silêncio. Nosso renderizador
   ajusta o tamanho até caber. Avaliação de quem estudou: *"Se você fizer auto-fit, seu
   renderizador fica melhor que o deles."*
2. **Contraste do CTA.** No slide 09, corpo `#FF9900` sobre `#F0F0F0` dá ≈ 2,0:1 — some no
   feed. É justamente o slide que precisa converter.
3. **Destaque por conteúdo, não por índice.** Trocar a headline não deve mover o realce.
4. **Legenda junto da peça.** Eles não entregam; a nossa skill já entrega.

---

## Outros achados

**PAUTAS → VIRAIS** é um produto à parte dentro da plataforma: 11 tendências de Reels com
score, dificuldade e filtro por 20 profissões — inclusive "Corretor de Imóveis". **Não tem
ligação com o fluxo de carrossel.** Parece módulo em construção.

**Onboarding com contador 3/5**, cujo item final é *"Criar o terceiro carrossel — É a partir
daqui que vira rotina"*. Não é checklist de setup, é checklist de formação de hábito.

**Picker com 1.918 fontes** e upload de fonte própria (até 10), escondidos atrás de um
dropdown discreto.

**Acabamento de versão jovem:** typo do usuário sem validação no campo, notação de cor
inconsistente no mesmo painel (`white`, `rgba()`, `#hex`), placeholder desalinhado do parser.

---

_Fonte: relatório da extensão do Claude no Chrome, 11/08/2026, sobre a v1.1.0 da plataforma._
