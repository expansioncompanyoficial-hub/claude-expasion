# EXPANSION 01 (MEIO FUNIL) — o padrão da casa

`template: "expansion-01"`

Este é o formato de todo carrossel de meio de funil da Expansion e dos clientes,
e é o único medido no Canva elemento a elemento. Os outros quatro
(`references/templates.md`) são modelados a partir da régua dele. **O que é padrão
é a estrutura e o modelo de escrita; o que muda por cliente são as cores, as
fontes e a palavra do CTA.**

Medido nas nove páginas de `@expansionassessoria - carrossel MOD 01`
(`DAHSNnmhwz0`) pelo conector do Canva. Os números estão em
`BRANDSDECODED/MAQUINA/MEDIDAS-CANVA-2026-08-11.md`; aqui está a regra de uso.

---

## O que é fixo

| | Valor |
|---|---|
| Canvas | 1080 × 1350 |
| Margem lateral | 108 · largura útil 864 |
| Barra superior | y 49,7 · x 56,1 · 15,8 bold · `@handle` · marca · `®COPYRIGHT ano` |
| Caixa de imagem | 864 × 442,2 · canto 13 |
| Slides | 9 |

## O que muda por cliente

Só isto, e sai tudo da ficha em `CLIENTES/<CLIENTE>/`:

- `dark`, `accent`, `claro` — os três tokens de cor
- `gradiente` — o degradê do fundo do slide de destaque
- `gradiente_texto` — o degradê que preenche a ênfase da capa
- `fonte_head`, `fonte_body`
- `handle`, `marca`, `copyright`
- **a palavra do CTA**

---

## A estrutura dos 9 slides

| # | Fundo | Foto | Papel editorial |
|---|---|---|---|
| 1 | capa | sangrada | a manchete |
| 2 | claro | topo | o fato que ancora tudo |
| 3 | destaque | meio | a virada de leitura |
| 4 | claro | base | o contraste concreto |
| 5 | escuro | topo | a consequência prática |
| 6 | escuro | — | **o argumento longo** |
| 7 | claro | meio | o que fazer |
| 8 | escuro | base | a objeção respondida |
| 9 | escuro | — | fechamento + CTA |

Os slides 6 e 9 não têm foto **de propósito**: são a declaração e o fechamento,
onde o texto é o objeto.

### Onde cada bloco começa

| `foto_pos` | Ordem | `top` |
|---|---|---|
| `topo` | foto · título · corpo | 207,9 · 717,0 · 1005,8 |
| `meio` | título · foto · corpo | 161,0 · 453,9 · 951,1 |
| `base` | título · corpo · foto | 230,5 · 534,9 · 799,8 |
| sem foto | título · corpo | 298,9 · 641,9 |

Posição absoluta, não fluxo. É isso que mantém os nove slides alinhados entre si
quando alguém desliza o feed.

---

## O modelo de escrita

**Headline** — 75,7px semibold, caixa mista, **frase inteira**, 40 a 70
caracteres. Não é fragmento em caixa alta: isso é o registro da BrandsDecoded, e
não é o nosso.

**Corpo** — 45,4px sobre fundo escuro, 36,6 sobre claro. Entrelinha 0,96, à
esquerda, branco ou preto chapado.

**A página tem que ficar escrita.** Metade vazia é o sinal mais fácil de peça
malfeita:

| Arquétipo | Corpo |
|---|---|
| `topo` · `base` | 230 a 260 caracteres |
| `meio` | 280 a 310 |
| sem foto | **420 a 520** |

O slide sem foto engana: tem o dobro do espaço, e é onde o argumento longo deve
morar.

**Ênfase** — dois mecanismos, e os dois convivem no mesmo parágrafo:

| Marcação | Efeito |
|---|---|
| `*trecho*` | cor de destaque, **chapada** |
| `**trecho**` | mantém a cor, sobe o peso |

Marcação por conteúdo, nunca por posição.

**A ênfase da capa é diferente da ênfase do corpo.** No corpo dos slides
internos o `*trecho*` é `accent` chapado — é o que o Canva tem, medido em sete
páginas. Na capa, e só nela, o `*trecho*` é preenchido pelo `gradiente_texto`
(`linear-gradient(90deg,#ff9901 0%,#ff6c01 100%)` na Expansion). Não é medição:
é decisão do Nicolas, com o valor lido no seletor do Canva. A capa aguenta o
degradê porque é uma frase só em corpo grande; num parágrafo de 45px ele vira
sujeira.

**Não existe slide só de número.** Um `50%` gigante com duas linhas de legenda
ocupa um terço da página e quebra o alinhamento com os vizinhos. Número entra
dentro da frase.

---

## A capa

Chip em y 748,3 (nome 21,4 · @ 10,6 a 49%). Headline **ancorada na base**,
terminando em y 1239,7 e crescendo para cima, com 439,2 de altura útil. 111,5px
bold, entrelinha 0,92, tracking −0,087, centralizada.

**Sem legenda.** A página 1 não tem, e uma linha a mais embaixo divide a atenção.

**A capa sempre tem imagem de fundo**, em opacidade cheia — quem escurece é o
scrim, e só de onde o texto começa.

### Dosar o scrim

A régua: **a metade de cima da capa tem que continuar sendo imagem.** Escurecer o
slide inteiro resolve a legibilidade e mata a foto — e a foto é o que faz alguém
parar no feed.

| `capa_scrim` | Quando |
|---|---|
| `leve` | foto já escura, ou sem detalhe no pé |
| `medio` | **padrão** — é a medida da página 1 |
| `forte` | foto clara, contrastada, ou com muita informação embaixo |

Testado contra uma imagem de pior caso (cena clara, alto contraste, detalhe fino
no terço de baixo): `medio` segura o texto sem apagar a foto; `leve` já fica no
limite e só serve para foto escura.

---

## O CTA

**Sempre o mesmo formato**, em todo cliente e toda peça:

> Para [ganho concreto e específico], comenta **PALAVRA**.

O parágrafo inteiro vai na cor de destaque e a palavra de comando em bold. Não é
caixa, não é botão, não é etiqueta — é o último parágrafo do slide 9, logo abaixo
da headline de fechamento.

A palavra sai da ficha do cliente e **não muda de peça para peça**: é ela que a
pessoa comenta, e é por ela que o disparo automático reconhece o lead.

| Cliente | Palavra |
|---|---|
| Expansion | `DIAGNÓSTICO` |
| Prime | ver `CLIENTES/PRIME/FICHA-CARROSSEL-PRIME.md` |

Antes do CTA vem uma ponte: um parágrafo que fecha o argumento da peça. O CTA
sozinho, sem ponte, lê como anúncio.
