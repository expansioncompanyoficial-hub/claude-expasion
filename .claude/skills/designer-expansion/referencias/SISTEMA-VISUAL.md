# Sistema visual — referência

Detalhamento do que está implementado em `templates/expansion.css`. Consulte na
hora de montar; não decore.

## Cores

### Oficiais

| Cor | Hex | Papel |
|---|---|---|
| Preto | `#000000` | Autoridade. Capa, abertura, cabeçalho de tabela, fechamento. |
| Laranja | `#F3A33B` | Acento. Marca o que importa — nunca o material inteiro. |
| Branco | `#FFFFFF` | Respiro e leitura. É o que faz as outras duas funcionarem. |

Fonte: `assets/marca-expansion/expansion-cores-e-escrita.png`, o arquivo de
identidade da marca. Os valores foram conferidos também pixel a pixel.

### Derivadas do próprio material oficial

| Token | Hex | Origem |
|---|---|---|
| `--cinza-painel` | `#D9D9D9` | Fundo do painel de cores na peça de identidade |
| `--laranja-profundo` | `#9D350B` | Extremo escuro do gradiente do símbolo |
| `--laranja-medio` | `#C2622A` | Meio do gradiente do símbolo |

`--laranja-profundo` existe por um motivo prático: laranja sobre branco não tem
contraste para texto. Quando o texto **precisa** ser laranja sobre fundo claro,
usa-se o profundo (7,1:1), não o laranja da marca.

### Neutros funcionais

`--grafite #111` · `--carvao #1C1C1C` · `--fumaca #2E2E2E` ·
`--cinza-linha #E4E4E4` · `--cinza-fundo #F5F5F5` · `--cinza-texto #6B6B6B` ·
`--cinza-claro #9B9B9B`

São estrutura, não identidade: linha de tabela, fundo alternado, texto
secundário. Não são cor de marca e não aparecem em elemento de destaque.

### Cor do cliente

```css
:root {
  --cliente-primaria: #XXXXXX;   /* da logo oficial dele */
  --cliente-contraste: #FFFFFF;  /* texto legível sobre a primária */
}
```

Sem cor confirmada, **não declare nada**: os tokens caem no preto da EXPANSION e
o material sai na identidade da casa. Cor de marca estimada por captura de tela
é erro que o cliente enxerga na hora.

A cor do cliente entra como **apoio e personalização** — etiqueta de
responsabilidade, borda de card, detalhe de seção. A estrutura continua
EXPANSION.

### Contraste — a regra que mais se quebra

| Combinação | Contraste | Uso |
|---|---|---|
| Branco sobre preto | 21:1 | Livre |
| Laranja sobre preto | 10:1 | Livre |
| Preto sobre laranja | 10:1 | Livre — texto sobre laranja é **sempre** preto |
| Laranja profundo sobre branco | 7,1:1 | Texto pequeno em fundo claro |
| Cinza de texto sobre branco | 5,3:1 | Texto secundário em fundo claro |
| **Laranja sobre branco** | **2,1:1** | **Nunca em texto.** Só régua, borda, ícone |

## Tipografia

Open Sans, embutida em `assets/tipografia/open-sans.css` (base64, subsets latin
e latin-ext). O PDF sai igual em qualquer máquina, com ou sem rede.

| Papel | Peso | Caixa |
|---|---|---|
| Título de capa, título de página | 800 | Alta |
| Título de seção, de card, de passo | 800 | Alta |
| Subtítulo, rótulo, `.lead` | 600–700 | Normal |
| Texto corrido | 400 | Normal |
| Olho, etiqueta, assinatura | 700–800 | Alta, com `letter-spacing` |

Corpo do texto: 10,5pt no A4, 18px no slide. Não diminua para fazer caber.

## Malha

**A4** — margem 18 mm, rodapé a 10 mm da borda, `padding-bottom` 22 mm para não
encostar nele.
**16:9** — margem 64 px, rodapé a 24 px.

Grades de 2, 3 ou 4 colunas (`.grade-2`, `.grade-3`, `.grade-4`) e uma
assimétrica (`.grade-lateral`, 1fr/2fr). Escolha pela quantidade de itens, não
pelo espaço sobrando.

## O modelo de página

Cada `.pagina` (A4) ou `.slide` (16:9) é uma **caixa fechada de tamanho fixo**.
Nada flui de uma para a outra: quem distribui o conteúdo é quem monta.

Em troca disso não existe quebra surpresa, título órfão nem viúva — e o
verificador consegue medir estouro, que é o defeito mais comum e mais caro.

Sobrou conteúdo? Abre outra página. Nunca reduza a fonte.

### Página que respira certo

O vazio no pé da página parece descuido. Use `.empilha` + `.cresce` para
ancorar o fecho no rodapé:

```html
<div class="empilha" style="padding-top:8mm">
  <!-- conteúdo -->
  <div class="cresce"></div>
  <div class="destaque">…</div>   <!-- ancorado embaixo -->
</div>
```

### Sangria

O que sai pela borda de propósito (anéis, faixa, foto de fundo) vai dentro de
`.sangria`. Fica recortado, por baixo do conteúdo, e não conta como estouro.

```html
<div class="sangria"><div class="aneis aneis--capa"></div></div>
```

`.aneis` é o eco do símbolo da marca como ornamento de fundo — **só em fundo
escuro**, porque os anéis são recortados com discos pretos. É ornamento
estrutural, nunca assinatura: não ocupa lugar de logo.

## Componentes

| Classe | Para quê |
|---|---|
| `.olho` | Rótulo curto acima do título |
| `.titulo` / `.titulo-capa` | Título de página / de capa |
| `.subtitulo` / `.lead` | Linha de apoio / parágrafo de abertura |
| `.secao-cabecalho` + `.secao-num` | Abertura de seção numerada |
| `.card` (`--laranja`, `--cliente`) | Pilar, etapa, frente, responsabilidade |
| `.tabela` (`.linha-destaque`, `.num`) | Comparação, cronograma, lista com colunas |
| `.linha-tempo` | Cronograma vertical com período e entrega |
| `.trilho` | Cronograma horizontal curto, para slide |
| `.passos` | Passo a passo numerado automaticamente |
| `.kpi` (`--laranja`) | Número que sustenta uma decisão |
| `.destaque` | Callout preto com barra laranja |
| `.pendente` | Informação não confirmada — carimba sozinho o aviso |
| `.etiqueta--*` | Responsabilidade e status |
| `.faixa-marcas` | Zona onde as duas marcas convivem |
| `.regua-laranja` | Marcação curta de abertura |

### Etiquetas

| Classe | Significado |
|---|---|
| `.etiqueta--expansion` | A EXPANSION executa |
| `.etiqueta--cliente` | Depende do cliente (usa a cor dele) |
| `.etiqueta--aprovacao` | Parado até aprovar |
| `.etiqueta--concluido` | Entregue |
| `.etiqueta--pendente` | Falta informação |

Todo cronograma leva legenda das etiquetas usadas.

## O que o verificador mede

`gerar-pdf.mjs` reprova o material quando encontra:

- conteúdo estourando a caixa da página, na vertical ou na horizontal
- elemento em fluxo passando da margem útil
- imagem que não carregou
- **imagem deformada** — proporção aplicada diferente da proporção do arquivo
  em mais de 1%; é a checagem que impede logo esticada

Cabeçalho, rodapé e `.sangria` ficam de fora da conta, porque saem da margem de
propósito.

O que ele **não** mede: composição, hierarquia, ritmo, se o texto está bom. Isso
é olho — por isso `--previa`.
