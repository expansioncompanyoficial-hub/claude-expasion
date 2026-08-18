# Medidas reais dos carrosséis do Canva

Extraídas pelo conector do Canva de **quatro designs** da conta da Expansion.
Não são estimativa: vieram da geometria e da formatação de cada elemento, como
o Canva as guarda.

| Design | ID | Conta | Páginas |
|---|---|---|---|
| @expansionassessoria — carrossel MOD 01 | `DAHSNnmhwz0` | Expansion | 9 |
| @expansionassessoria — carrossel MOD 02 | `DAHSPen5hyU` | Expansion | 9 |
| MODELO DUPLICAR | `DAHIuSTnI0I` | Prime | 9 |
| @prime.alphaville — Carrosséis | `DAHRj0AlE3o` | Prime | 9 |

Todos 1080 × 1350, idêntico ao canvas do renderizador — **escala 1:1**, todo
valor abaixo vai direto pro CSS.

---

## A descoberta estrutural

Os quatro designs **compartilham os mesmos IDs de página** (`PBn4XdzSJF41spLn`,
`PBxvQ0fTvVvTMTPk`, `PBXybwtj0L5qrbv6`). Não são quatro sistemas: é **um sistema
duplicado quatro vezes**, com os tokens trocados por cliente. É literalmente o
que o nome "MODELO DUPLICAR" diz.

Isso valida a decisão de arquitetura de tratar template como *dado* e não como
código: o Nicolas já opera assim no Canva, na mão.

---

## Duas famílias de enquadramento

| | Foto sangrada | Caixa de imagem |
|---|---|---|
| Onde | MOD 02 · MODELO DUPLICAR · Prime | MOD 01 |
| A imagem | cobre o slide, **opacity ~0,65** sobre preto | caixa **864 × 488,4**, canto **13px** |
| Legibilidade | scrim subindo da base | não precisa |
| O texto | ancorado embaixo | fluindo abaixo da caixa |

**Três dos quatro designs são foto sangrada.** É o enquadramento dominante, e
era exatamente o que faltava no renderizador — que só sabia fazer caixa.

O scrim é um asset de imagem (`MAFvW5ALujQ`), o mesmo em todas as páginas de
todos os designs, girado −180° e posicionado a partir de y≈421. Em CSS equivale
a um degradê transparente→preto cobrindo dos 26% para baixo.

---

## A grade

| | Valor |
|---|---|
| Canvas | 1080 × 1350 |
| **Margem lateral** | **108px** → largura útil **864px** |
| Barra superior | `y 49,7` · `x 56,1` · largura 976 |
| Opacidade da barra | **0,30** Expansion · **0,81** Prime |

A margem de 108px é o número que mais destoava do que eu tinha (60px). É ela que
dá o ar da peça. Aparece exata (`108.00000`) em quatro páginas de três designs
diferentes — as variações de 85 a 117 são ajustes na mão, não a grade.

A barra tem três campos fixos: `@handle` à esquerda, nome da marca ao centro
(x 578,6) e `®COPYRIGHT 2026` à direita (x 849,6).

---

## Tipografia

Duas famílias, referenciadas no Canva como `YAFdJjbTu24` (título) e
`YAFdJvSyp_k` (corpo).

| Elemento | Tam. | Peso | Entrelinha | Tracking | Alinh. |
|---|---|---|---|---|---|
| **Capa · impacto** | **111,5** (88,3–111,5) | bold | **0,92** | **−0,087** | centro |
| **Capa · manchete** | **79,6** (75,7–79,6) | **semibold** | **1,06** | **−0,056** | centro ou esq. |
| **Interna · headline** | **75,7** (60,5–83,8) | **semibold** | **1,06** | **−0,056** | **esquerda** |
| **Corpo · sobre escuro** | **45,4** (45,4–50,8) | normal | **0,96** | **−0,033** | **esquerda** |
| Corpo · sobre claro | 36,6 | normal | 0,96 | −0,033 | esquerda |
| Legenda da capa | 21,2 (18,2–21,2) | normal | 1,06 | −0,056 | centro |
| Chip · @ | 31,8 (21,6–31,8) | medium | 1,4 | −0,084 | centro |
| Barra superior | 15,8 | bold | 1,4 | 0 | — |
| Assinatura/wordmark | 67,1 | semibold | 1,4 | −0,035 | esquerda |

Três números aparecem **idênticos em designs diferentes** — são o padrão do
template, não coincidência:

- `75.72524438770539` na headline interna, em três lugares
- `45.4185` no corpo, em três designs
- `15.780180867747` na barra, em todos

**Entrelinha do corpo é 0,96** — abaixo de 1, quase colada. Escolha de estilo
forte e deliberada, não descuido: dá densidade ao bloco.

**A headline interna é semibold, não black.** Em 75px, peso 600 lê com força e
não pesa o slide.

### As duas capas são dois gêneros editoriais

Não é variação estética. A capa **impacto** (bold, entrelinha 0,92, tracking
apertado) é a de topo de funil, feita pra parar o dedo. A capa **manchete**
(semibold, entrelinha 1,06) usa a tipografia da headline interna aumentada — e é
a que aparece nas peças de notícia da Prime. É a capa de newsroom.

---

## O ritmo das nove páginas

Lido nas miniaturas do MOD 01, página por página. Não é alternância mecânica:

| Pág. | Fundo | Composição |
|---|---|---|
| 1 | foto sangrada | chip · headline · legenda, ancorado embaixo |
| 2 | **claro** | foto no topo · headline · corpo |
| 3 | **destaque** | headline · foto no meio · corpo |
| 4 | claro | headline · corpo · foto embaixo |
| 5 | escuro | foto no topo · headline · corpo |
| 6 | escuro | headline grande · corpo. **Sem foto** |
| 7 | claro | headline · foto no meio · corpo |
| 8 | escuro | headline · corpo · foto embaixo |
| 9 | escuro | headline · corpo · chamada laranja |

Duas coisas que eu tinha errado e que mudam a peça inteira:

**A composição é ancorada no topo, nunca centralizada.** O conteúdo começa em
y≈208 quando a foto abre o slide e em y≈230 quando a headline abre, e desce. Com
texto curto sobra espaço embaixo — **e isso é o desenho**, não falta de conteúdo.
Centralizar, que era o que eu fazia, tira o ar da peça e desalinha os slides
entre si quando vistos em sequência no feed.

**A foto tem três posições, e as três aparecem.** Abrindo o slide, separando
headline de corpo, ou fechando embaixo. Não é sempre no meio.

---

## Cores

| | Expansion | Prime |
|---|---|---|
| Destaque | `#ff9901` | `#f94c00` |
| Fundo escuro | `#000000` | `#000000` |
| **Fundo do slide de destaque** | `linear-gradient(180deg,#fa7e01,#ff6522 50%,#fa7e01)` | — |

### O degradê é do fundo, não da escrita

Ponto que custou uma rodada. O degradê laranja existe, mas ele é o **fundo do
slide de destaque** — não o preenchimento da escrita destacada.

A escrita em destaque é `#ff9901` **chapado**, em todas as sete páginas
conferidas, tanto na API quanto na renderização real. Cheguei a preencher a
ênfase com o degradê; está errado e foi desfeito.

**No slide de destaque o texto é branco** — headline e corpo. Eu tinha passado
para preto por causa de contraste; o original é branco, e branco é o que fica.

> **Divergência a resolver com o cliente:** o manual de marca da Prime traz
> `#e14414`, e os carrosséis no Canva usam `#f94c00`. São cores diferentes. A
> ficha do cliente segue com `#e14414` (o manual) até alguém decidir qual vale.

---

## O destaque tem dois mecanismos, não um

O corpo é **branco chapado** — não existe opacidade em lugar nenhum. A ênfase se
faz de duas maneiras, e as duas convivem no mesmo parágrafo:

1. **Cor de destaque**, mantendo o peso → `*trecho*`
2. **Peso bold**, mantendo a cor → `**trecho**`

E é **por trecho, não por palavra**: o Canva guarda o texto em regiões de
formatação, e a divisão cai onde faz sentido na frase — às vezes no meio de uma
palavra (`"A reportagem parte de uma i" + "deia comum no mercado:"`, na Prime).

Isso confirma a escolha do renderizador de marcar por conteúdo e não por
posição, que é como a plataforma da BrandsDecoded grava — e por isso o realce
dela anda de lugar quando o texto muda.

---

## O que estava errado no renderizador

| | Antes | Real |
|---|---|---|
| Enquadramento | só caixa de imagem | **foto sangrada em 3 de 4 designs** |
| Composição | centralizada na vertical | **ancorada no topo** |
| Posição da foto | sempre no meio | **topo · meio · base** |
| Ênfase na escrita | — | `#ff9901` chapado (**não** degradê) |
| Texto sobre destaque | preto | **branco** |
| Headline sobre claro | laranja | **preta** |
| Margem lateral | 60 | **108** |
| Headline interna | 112 black | **75,7 semibold** |
| Entrelinha da headline | 0,92 | **1,06** |
| Corpo | 41 justificado, 70% de opacidade | **45,4 à esquerda, branco chapado** |
| Entrelinha do corpo | 1,17 | **0,96** |
| Capa | 132, um estilo só | **111,5 impacto · 79,6 manchete** |
| Legenda da capa | 31 | **21,2** |
| Tracking | −0,04 | **−0,056** interno · **−0,087** capa |
| Barra | opacity 0,55, padding 50/56 | **y 49,7 · x 56,1 · opacity por marca** |
| Altura da imagem | 420 | **488,4** |

Justificado com entrelinha 0,96 abre buracos horríveis entre palavras — só não
apareceu antes porque a entrelinha estava folgada.

---

## Pendência: os nomes das fontes

Os **nomes das famílias não vieram** na resposta da API. O Canva devolve um
`fontRef` interno — `YAFdJjbTu24` (título) e `YAFdJvSyp_k` (corpo) — e o brand
kit da conta está vazio, então não há de onde resolver o nome.

Pela renderização, são duas grotescas geométricas próximas de Montserrat/Inter.
**É leitura visual, não medição.** O renderizador segue com Montserrat + Poppins,
que dão o mesmo peso e a mesma cor de mancha.

Para fechar: abrir qualquer um dos quatro designs no Canva, clicar numa headline
e numa linha de corpo, e ler os dois nomes no seletor de fonte. São 30 segundos e
tiram a última aproximação do sistema.
