# Medidas reais dos carrosséis do Canva

Extraídas pelo conector do Canva do design **"@expansionassessoria - carrossel MOD 01"**
(`DAHSNnmhwz0`, 9 páginas, 1080 × 1350). Não são estimativa: vieram da geometria e da
formatação de cada elemento, como o Canva as guarda.

Canvas idêntico ao do renderizador, então **escala 1:1** — todo valor abaixo vai direto
pro CSS.

---

## A grade

| | Valor |
|---|---|
| Canvas | 1080 × 1350 |
| **Margem lateral** | **108px** de cada lado → largura útil **864px** |
| Barra superior | `top 49.7` · `left 56.1` · largura 976 · **opacity 0.30** |
| Caixa de imagem | largura **864** · altura **488.4** · canto **13px** |

A margem de 108px é o número que mais destoava do que eu tinha (60px). É ela que dá o ar
da peça.

---

## Tipografia

Duas famílias, referenciadas no Canva como `YAFdJjbTu24` (título) e `YAFdJvSyp_k` (corpo).

| Elemento | Tam. | Peso | Entrelinha | Tracking | Alinhamento |
|---|---|---|---|---|---|
| **Capa · headline** | **111.5** | bold | **0.92** | **−0.087em** | centro |
| Capa · chip nome | 21.4 | medium | 1.4 | −0.084 | centro |
| Capa · chip @ | 10.6 | medium | 1.4 | −0.084 | centro · opacity 0.49 |
| **Interno · headline** | **66.35** | **semibold** | **1.06** | **−0.056em** | **esquerda** |
| Interno · headline grande | 71.9 – 83.8 | bold | 1.06 | −0.056 | esquerda |
| **Corpo · fundo claro** | **36.6** | normal | **0.96** | **−0.033em** | **esquerda** |
| Corpo · fundo escuro/laranja | 42.2 – 43.8 | normal | 0.96 | −0.033 | esquerda |
| Barra superior | 15.8 | bold | 1.4 | 0 | — |

**Entrelinha do corpo é 0,96** — abaixo de 1, quase colada. É escolha de estilo forte e
deliberada, não descuido: dá densidade ao bloco de texto.

**A headline interna é semibold, não black.** Em 66px, peso 600 ainda lê com força e não
pesa o slide.

---

## Cores

| | Valor |
|---|---|
| Destaque | `#ff9901` |
| Fundo escuro | `#000000` |
| Fundo claro | `#ffffff` |
| Gradiente laranja | `linear-gradient(180deg, #fa7e01 0%, #ff6522 50%, #fa7e01 100%)` |

Estas são as cores da **Expansion**, porque o design é da conta dela. Para cada cliente,
os tokens do próprio substituem — as medidas é que são universais.

---

## O destaque é por trecho, não por palavra

Diferente da plataforma da BrandsDecoded (que marca por índice de palavra), aqui o Canva
guarda o texto em **regiões de formatação**: um mesmo bloco tem partes em `#ffffff` e
partes em `#ff9901`, e a divisão cai onde faz sentido na frase.

Exemplo real da capa:

> A **[branco]** · Shein não é sua concorrente. **[laranja]** · É a loja que responde
> **[branco]** · em 5 minutos. **[laranja]**

Isso confirma a escolha do nosso renderizador — marcar por conteúdo (`*trecho*`) e não por
posição.

---

## O que estava errado no renderizador

| | Antes | Real |
|---|---|---|
| Margem lateral | 60px | **108px** |
| Headline interna | 112px black | **66.35px semibold** |
| Entrelinha da headline | 0.92 | **1.06** |
| Corpo | 41px **justificado** | **36.6–43.8px à esquerda** |
| Entrelinha do corpo | 1.17 | **0.96** |
| Capa | 132px | **111.5px** |
| Tracking | −0.04em | **−0.056em** interno · **−0.087em** capa |
| Barra superior | opacity 0.55 | **opacity 0.30** |
| Altura da imagem | 420px | **488.4px** |

A headline interna estava **quase o dobro** do tamanho real, e o corpo justificado quando o
original é alinhado à esquerda. Justificado com entrelinha 0,96 abre buracos horríveis
entre palavras — só não apareceu antes porque a entrelinha estava folgada.

---

## Pendência

Os **nomes das famílias não vieram** na resposta da API — o Canva devolve um `fontRef`
interno (`YAFdJjbTu24`, `YAFdJvSyp_k`) e o brand kit da conta está vazio.

Pela renderização, título e corpo são duas grotescas geométricas próximas, do tipo
Montserrat/Inter. **É leitura visual, não medição** — confirmar abrindo o seletor de fonte
no Canva e lendo o nome. Enquanto isso o renderizador segue com Montserrat + Poppins, que
dão o mesmo peso e a mesma cor de mancha.
