# Os cinco templates da casa

Um `template` no spec escolhe o layout. O que muda por cliente continua sendo só
cor, fonte e a palavra do CTA — a estrutura é a mesma para todo mundo.

| `template` | Nome | O que é |
|---|---|---|
| `expansion-01` | **EXPANSION 01 (MEIO FUNIL)** | 9 slides · caixa de imagem · o padrão |
| `expansion-02` | **EXPANSION 02** | foto sangrada · título à esquerda |
| `expansion-03` | **EXPANSION 03** | foto sangrada · serifa centralizada |
| `expansion-04` | **EXPANSION 04** | foto sangrada · título centralizado |
| `expansion-twitter` | **EXPANSION TWITTER** | cartão de post · fundo claro |

> **O que é medido e o que é modelado.** Só o EXPANSION 01 foi lido no Canva
> elemento a elemento — margem, `top` de cada bloco, tamanho, entrelinha,
> tracking. Os outros quatro são **modelados**: herdam a régua tipográfica e a
> grade do 01 e reproduzem as capas da plataforma da BrandsDecoded. Quando
> existir um design nosso de cada um no Canva, eles viram medida também.

---

## EXPANSION 01 — meio de funil

O detalhamento completo está em `template-01.md`: grade absoluta, quatro
arquétipos de foto, faixa de caracteres por fatia, régua da capa e CTA.

Serve para **quem já te segue**: listas, comparações, tutoriais. É o template que
aprofunda.

---

## EXPANSION 02 · 03 · 04 — a família sangrada

A foto cobre o slide inteiro e o texto se apoia na base. Três dos quatro designs
reais são assim, e é o enquadramento que mais aguenta texto curto: sem foto, um
título de duas linhas fica solto no meio do nada; com a foto ocupando tudo, ele
fecha a composição.

Servem para **topo de funil** — quem ainda não te conhece. Gancho curto,
provocação, frase de impacto. Alcance e descoberta.

| | Alinhamento | Família | Tamanho | Entrelinha |
|---|---|---|---|---|
| **02** | esquerda | sans (título) | 88,3 | 0,92 |
| **03** | centro | **serifa** | 84 | 1,02 |
| **04** | centro | sans (título) | 100 | 0,92 |

O que muda entre os três é só isso. O miolo é o mesmo, porque é o único que tem
medida real por trás.

**Quando usar qual:**

- **02** quando a foto tem um ponto de interesse à direita — o texto à esquerda
  não cobre o que importa.
- **03** quando o assunto é comportamento, cultura ou tendência. A serifa muda o
  registro: lê como reportagem, não como anúncio.
- **04** quando a frase é curta e o impacto vem do tamanho.

A serifa padrão é **Source Serif 4** em peso 600. É escolha nossa, não medição —
trocável por cliente em `tokens.fonte_serif`.

---

## EXPANSION TWITTER — cartão de post

Fundo claro, avatar, nome, @ e o texto corrido, com uma imagem no meio.

Empresta a credibilidade da rede: lê como algo que alguém publicou, não como peça
de agência. Por isso duas regras próprias que contrariam os outros templates:

1. **Nada de cor de marca no texto.** Ênfase só por peso. Cor aqui denuncia o
   anúncio e o formato perde o que ele tem de melhor.
2. **Sem headline gritada.** O texto é do tamanho de leitura, não de manchete.

Serve para citação, notícia e dado de terceiro — o formato assume que a
autoridade é de quem falou, não de quem publicou.

---

## No spec

```json
{ "template": "expansion-03",
  "tokens": { "fonte_serif": "Source Serif 4", ... },
  "slides": [ {"tipo":"capa","headline":"…","sub":"…","foto_fundo":"foto.jpg"} ] }
```

Na família sangrada, cada slide é `headline` + `sub` (ou `paragrafos`). No
EXPANSION TWITTER, `headline` + `imagem` + `paragrafos`.
