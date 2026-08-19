# Scripts do renderizador

Dois passos, um spec JSON no meio. Genéricos — servem qualquer cliente.

Três scripts: `render_carrossel.py` monta o HTML, `export_png.py` captura os
PNGs, e `gerar_capas.py` rende N capas do mesmo tema para escolher a que vai pro
feed (ver `../references/capas.md`).

```bash
python3 render_carrossel.py spec.json carrossel.html
python3 export_png.py carrossel.html slides/
```

A régua tipográfica vem da medição dos carrosséis reais da Expansion no Canva —
`BRANDSDECODED/MAQUINA/MEDIDAS-CANVA-2026-08-11.md`. Canvas 1080 × 1350, escala
1:1 com o CSS.

## O spec

```jsonc
{
  "marca": "EXPANSION",
  "handle": "@assessoriaexpansion",
  "copyright": "2026 ®",
  "verificado": true,             // selo azul no chip da capa
  "capa_estilo": "impacto",       // impacto | manchete — ver abaixo
  "tokens": {
    "dark": "#000000",            // fundo dominante
    "accent": "#ff9901",          // acento: ênfase, número, CTA
    "claro": "#F0EEEC",           // fundo dos slides claros
    "texto": "#FFFFFF",
    "barra_opacidade": 0.30,      // 0,30 Expansion · 0,81 Prime (medido)
    "fonte_head": "Montserrat",
    "fonte_body": "Poppins"
  },
  "fontes": [                     // .woff2 de @fontsource, embutidos em base64
    {"family": "Montserrat", "weight": 600, "file": "…/montserrat-latin-600-normal.woff2"},
    {"family": "Montserrat", "weight": 600, "file": "…/montserrat-latin-ext-600-normal.woff2"},
    {"family": "Montserrat", "weight": 700, "file": "…/montserrat-latin-700-normal.woff2"},
    {"family": "Montserrat", "weight": 700, "file": "…/montserrat-latin-ext-700-normal.woff2"},
    {"family": "Poppins",    "weight": 400, "file": "…/poppins-latin-400-normal.woff2"},
    {"family": "Poppins",    "weight": 400, "file": "…/poppins-latin-ext-400-normal.woff2"}
    // … e assim para cada peso: sempre o par latin + latin-ext
  ],
  "slides": [ /* ver tipos abaixo */ ]
}
```

**Os cinco pesos são obrigatórios**, não sugestão: o layout usa 600 e 700 no
título e 400, 500 e 700 no corpo. Faltando um, o Chromium sintetiza um falso
negrito e o PNG sai diferente do preview.

Pegar as fontes: `npm i @fontsource/montserrat @fontsource/poppins`.

### Sempre os dois subconjuntos, `latin` **e** `latin-ext`

Este é o erro mais caro do renderizador, e ele custou dias sem ninguém notar.

Os arquivos do `@fontsource` são **subconjuntos por faixa de caractere**. O
`latin-ext` traz só ã, õ, ç e companhia — **ele não tem A-Z**. Embutido sozinho,
o navegador não acha glifo para o texto e cai numa fonte de sistema. E cai em
silêncio: `document.fonts.ready` resolve, `document.fonts.check` devolve `true`,
o preview parece plausível, e o PNG entregue está na fonte errada.

Duas travas hoje impedem que isso volte:

1. O renderizador **recusa rodar** quando um par família+peso tem `latin-ext` sem
   o `latin` correspondente.
2. O exportador **mede** a largura do texto com a fonte pedida e com uma pilha de
   fallback puro. Largura igual = fonte não aplicada, e ele falha dizendo qual.

O renderizador escreve o `unicode-range` de cada subconjunto sozinho, deduzido do
nome do arquivo. Duas declarações da mesma família e do mesmo peso só convivem
por causa disso — sem `unicode-range`, a última apaga a primeira.

## Tipos de slide

| `tipo` | Campos |
|---|---|
| `capa` | `headline`, `sub`, `foto_fundo`, `estilo` (sobrepõe `capa_estilo`) |
| `texto` | `tag`, `h1`, `paragrafos[]`, `imagem`, `foto_pos`, `imagem_brief`, `fonte` |
| `stat` | `tag`, `numero`, `label`, `paragrafos[]`, `fonte` |
| `bullets` | `tag`, `h1`, `itens[]` |
| `declaracao` | `h1` — headline grande, sem corpo |
| `cta` | `ponte`, `instrucao`, `palavra` |

## Fundos

`fundo` aceita `escuro` · `claro` · `destaque`. Se o slide tiver `foto_fundo`,
vira automaticamente a família **foto sangrada**.

| | O que faz |
|---|---|
| `foto_fundo` | imagem cobre o slide a 65% sobre preto, scrim subindo da base, texto ancorado embaixo |
| `imagem` | caixa de 864 × 488,4 com canto 13px, no fluxo do conteúdo |

São dois enquadramentos diferentes, e três dos quatro designs reais usam o
primeiro. `foto_opacidade` ajusta o 0,65 quando a foto vem clara demais.

## A grade dos slides internos

O original é **posicionado à mão, não fluído**. Reproduzir com flexbox aproxima e
nunca bate. Cada bloco vai no `top` medido, e são quatro arquétipos:

| `foto_pos` | Ordem | `top` de cada bloco | Páginas |
|---|---|---|---|
| `topo` | foto · título · corpo | 207,9 · 717,0 · 1005,8 | 2 e 5 |
| `meio` | título · foto · corpo | 161,0 · 453,9 · 951,1 | 3 e 7 |
| `base` | título · corpo · foto | 230,5 · 534,9 · 799,8 | 4 e 8 |
| ausente | título · corpo | 298,9 · 641,9 | 6 e 9 |

Todos com `left: 108` e largura `864`. A caixa de imagem é sempre **864 × 442,2,
canto 13**.

Cada bloco tem uma altura máxima — até onde o próximo começa — e o auto-fit
encolhe o texto **dentro da própria fatia**, sem empurrar o slide. É isso que
mantém os nove slides alinhados entre si quando alguém desliza o feed.

Sem `foto_pos` o slide é "sem foto", que é o que as páginas 6 e 9 fazem: a
declaração forte e o fechamento. Sobra espaço embaixo, e isso é o desenho.

## Vaga de imagem

Sem `imagem`, o `foto_pos` **reserva e desenha o espaço** na medida certa, com o
briefing em `imagem_brief`. O slide já nasce desenhado em volta da foto, então
trocar a vaga pela imagem não mexe em mais nada.

Qual slide recebe foto, em que posição e o que ela mostra:
`../references/imagens.md`.

## Quanto texto cabe em cada fatia

Cada bloco tem um teto, e o texto tem que **preencher a fatia** — página escrita
pela metade é o sinal mais fácil de peça malfeita.

| Arquétipo | Headline | Corpo |
|---|---|---|
| `topo` | até 3 linhas · ~70 car. | ~5 linhas · **230 a 260 car.** |
| `meio` | até 3 linhas · ~70 car. | ~6 linhas · **280 a 310 car.** |
| `base` | até 3 linhas · ~70 car. | ~5 linhas · **230 a 260 car.** |
| sem foto | até 4 linhas · ~95 car. | até 13 linhas · **420 a 520 car.** |

O slide sem foto é o que mais engana: ele tem o dobro do espaço, e é justamente
onde o argumento longo deve morar. Escrever 100 caracteres ali deixa dois terços
da página vazios.

**Não existe slide só de número neste template.** Um `50%` gigante com duas
linhas de legenda ocupa um terço da página e quebra o alinhamento com os
vizinhos. Número entra dentro do corpo, na frase.

## Capa: impacto ou manchete

Não é escolha estética, é gênero editorial.

| | Tipografia | Quando |
|---|---|---|
| `impacto` | 111,5px bold, entrelinha 0,92, tracking −0,087 | topo de funil, viral |
| `manchete` | 79,6px semibold, entrelinha 1,06, tracking −0,056 | newsroom, meio de funil |

A headline da capa é **ancorada na base** (termina em y 1239,7) e cresce para
cima, com 439,2px de altura útil. Não flutua no meio do slide: apoia no pé e
deixa a metade de cima livre para a imagem. O chip fica logo acima, em y 748,3.

**A capa não leva legenda.** O campo `sub` existe, mas a página 1 do original não
tem — e uma linha a mais embaixo divide a atenção e tira força da manchete.

Capa sem foto recebe um banho radial na cor da marca. É recurso de contorno —
nos quatro designs reais a capa sempre tem imagem, em **opacidade cheia**: quem
escurece são os scrims, não a imagem.

## Ênfase no texto

Dois mecanismos, e o Canva usa os dois no mesmo parágrafo:

| Marcação | Efeito |
|---|---|
| `*trecho*` | troca a cor para a cor de destaque, **chapada** |
| `**trecho**` | mantém a cor e sobe o peso |

O degradê da marca (`tokens.gradiente`) é o **fundo do slide de destaque**, não o
preenchimento da escrita. Já tentei o contrário: está errado, e o Canva mostra
`#ff9901` chapado em todas as páginas.

Marcação **por conteúdo**, não por índice de palavra — que é como a plataforma
da BrandsDecoded grava, e por isso o realce dela anda de lugar quando o texto
muda.

## Três regras que quebram silenciosamente

**Fontes em base64, nunca `<link>` do Google Fonts.** O Chromium headless não
carrega webfont externa de forma confiável e o PNG sai com fallback — igual ao
preview no browser só na aparência, diferente no arquivo entregue. E sempre o
par `latin` + `latin-ext`, pelo motivo da seção acima.

**`slide.screenshot()` no elemento, nunca `page.screenshot()` no viewport.** É o
que garante 1080 × 1350 exatos, sem clip nem resize. O exportador confirma a
medida e o carregamento das fontes na saída.

**O corpo é chapado, a ênfase é por cor ou peso.** Nunca por opacidade. Nenhum
texto nos designs reais tem opacidade — quando eu tinha isso, a peça saía
apagada em relação ao original sem ninguém saber apontar por quê.

## Chromium

O `playwright install` não roda neste ambiente. O exportador aponta direto para o
Chromium já instalado (`/opt/pw-browsers/chromium`).
