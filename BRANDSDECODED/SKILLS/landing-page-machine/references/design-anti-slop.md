# Design anti-slop — o piso de craft de uma landing de venda

Princípio da casa: **conversão ganha do "bonito", mas existe um piso.** A página pode quebrar manual de estética em nome da venda, mas não pode parecer feita por IA. Se alguém olha a página e diz "isso é IA" sem hesitar, reprovou — não importa o quanto converta no teste A/B, porque "cara de IA" derruba a confiança e a confiança é o que faz comprar. Este arquivo é a linha entre dispositivo de conversão legítimo e tique de IA preguiçoso.

A régua tem dois lados que precisam conversar: o lado **impeccable** (proibidos visuais, teste de cara de IA, acessibilidade) e o lado **conversão** (os dispositivos que a página de venda PRECISA ter mesmo contrariando o manual de bom gosto). A seção (d) reconcilia os dois — é a parte mais importante pra quem opera.

---

## (a) Catálogo de proibidos visuais

Cada proibido vem com **por que é proibido** e **o conserto**. São match-and-refuse: se você está prestes a escrever, reescreva o elemento com estrutura diferente.

**1. Texto com gradiente.** `background-clip: text` + fundo em gradiente.
- *Por quê:* decorativo, nunca carrega significado. É o adesivo de "fiz no Figma em 2022". Some na leitura e mata o contraste do título.
- *Conserto:* cor sólida única. Ênfase por peso ou tamanho, não por arco-íris no texto.

**2. Glassmorphism como padrão.** Cards de vidro/blur usados como decoração default.
- *Por quê:* vira muleta visual; quando todo card é fosco, nenhum tem hierarquia, e o blur derruba a legibilidade do texto por cima.
- *Conserto:* raro e proposital, ou nada. Use superfície sólida com contraste real.

**3. Clichê do hero-métrica.** Número grande, label pequeno, estatísticas de apoio, acento em gradiente — o template de SaaS.
- *Por quê:* é a cara mais batida de página gerada; o leitor reconhece o molde antes de ler o conteúdo.
- *Conserto:* (atenção — em venda existe exceção, ver seção (d)). Se não for um número de prova real e ancorado, não monte o altar de métrica decorativa.

**4. Grids de cards idênticos.** Cards do mesmo tamanho com ícone + título + texto, repetidos sem fim.
- *Por quê:* card é a resposta preguiçosa; grid idêntico repetido é o reflexo uniforme que delata gerador. Card aninhado é sempre errado.
- *Conserto:* use card só quando é de fato a melhor affordance. Varie ritmo e tamanho. Flex pra 1D, grid pra 2D — não jogue tudo em grid quando `flex-wrap` resolve.

**5. "Eyebrow" minúsculo em CAIXA ALTA com tracking em toda seção.** O kicker de 2023 ("SOBRE", "PROCESSO", "DEPOIMENTOS" acima de cada título).
- *Por quê:* aparece em 55–95% das gerações independente do brief — a definição de delator. Um kicker nomeado como sistema de marca deliberado é voz; eyebrow em toda seção é gramática de IA.
- *Conserto:* outra cadência. Deixe o próprio título abrir a seção, ou escolha um ritmo de abertura que seja seu.

**6. Numerinho "01 / 02 / 03" como enfeite.** Marcadores numerados acima de toda seção.
- *Por quê:* é o eyebrow um nível mais fundo — você puxa por reflexo "porque landing faz isso". Scaffolding automático.
- *Conserto:* número só ganha lugar quando a seção É uma sequência de verdade (um passo a passo real, um fluxo ordenado, uma linha do tempo) e a ordem carrega informação que o leitor precisa. Uma sequência numerada deliberada numa página é voz; numerinho em toda seção é IA.

**7. Borda lateral colorida grossa.** `border-left`/`border-right` maior que 1px como acento em card, item de lista, callout ou alerta.
- *Por quê:* nunca é intencional — é o default de "preciso destacar isso e não sei como". Delator clássico.
- *Conserto:* borda completa, tint de fundo, número/ícone à frente, ou nada.

**8. Texto que vaza do container.** Palavra longa no título + `clamp()` grande + grid estreito = título estourando no tablet/mobile.
- *Por quê:* a viewport é parte do design; texto vazando grita "ninguém testou em celular" — e a casa é mobile-first.
- *Conserto:* teste a cópia do título em cada breakpoint. Se vaza, reduza o `clamp()` máximo ou reescreva. Use `text-wrap: balance` em h1–h3.

**9. Fundo creme / bege / areia como default preguiçoso.** A faixa quente-neutra (OKLCH L 0.84–0.97, C < 0.06, hue 40–100) que lê como creme/papel/pergaminho independente do nome.
- *Por quê:* é o default saturado de IA de 2026. Nomes de token como `--paper`, `--cream`, `--sand`, `--bone`, `--linen`, `--ivory` já são delatores em si. Traduzir "quente/acolhedor/tradicional" num quase-branco amarelado é o movimento de IA.
- *Conserto:* (a) uma cor de marca saturada no corpo, (b) um off-white verdadeiro em chroma 0 (ou puxado pra própria matiz da marca, não pra "calor" genérico), ou (c) um neutro tonal médio mais escuro que é claramente da marca. "Calor" vem do acento + tipografia + imagem, não do fundo.

**Proibidos de marca que também valem em landing:** monospace como atalho preguiçoso de "técnico"; ícones grandes de canto arredondado acima de todo título; CAIXA ALTA no corpo do texto (reserve pra labels curtos); paletas tímidas e layouts médios (seguro = invisível); zero imagem num brief que pede imagem (bloco de cor onde devia ter foto é pior que foto de banco mediana).

---

## (b) Teste de "cara de IA" — primeira e segunda ordem

Rode em duas altitudes; a segunda pega o que a primeira deixa passar.

- **Primeira ordem:** se alguém consegue adivinhar o tema + paleta só pela categoria do produto, é o primeiro reflexo de dados de treino. ("Curso de emagrecimento → verde-saúde e foto de balança", "mentoria financeira → azul-marinho e dourado".) Refaça a frase de cena e a estratégia de cor até a resposta não ser óbvia pelo domínio.
- **Segunda ordem:** se alguém consegue adivinhar a família estética por categoria + anti-referência ("curso de IA que NÃO é creme-SaaS → vira editorial-tipográfico", "fintech que NÃO é navy-e-dourado → vira terminal-dark-mode"), é a armadilha um nível mais fundo. O primeiro reflexo foi evitado; o segundo não. Refaça até as duas respostas não serem óbvias.

Teste-irmão: descreva em uma frase o que você vai construir do jeito que um concorrente descreveria o dele. Se a frase serve pra landing modal da categoria, recomece.

---

## (c) Lanes estéticas saturadas a evitar

Antes de fechar as escolhas, nomeie a referência. Famílias estéticas que inundaram as superfícies de marca — se o brief cai numa delas sem um motivo de registro que a EXIJA (uma revista literal, um terminal literal, uma sinalização industrial literal), é o reflexo de segunda ordem:

- **Editorial-tipográfico.** Serifa display (em geral itálica) + labels pequenos em mono + separadores em régua + monocromático contido. Influência Klim, afetação de capa de revista. A impressão digital: três colunas separadas por régua, título itálico em Fraunces/Recoleta/Newsreader, metadado em caixa baixa com tracking, sem imagem. Por 2026 toda marca Stripe-adjacente caiu aqui.
- **Lista de fontes reflexo-reject** (defaults de treino, evite em escolha greenfield): Fraunces, Newsreader, Lora, Crimson, Playfair Display, Cormorant, Syne, IBM Plex (Sans/Mono/Serif), Space Mono, Space Grotesk, Inter, DM Sans, DM Serif, Outfit, Plus Jakarta Sans, Instrument Sans/Serif.
- Brutalista-utilitário e acid-maximalism entram na lista quando saturarem.

Ressalva: quando a marca já tem fonte/lane como parte da identidade, preservar identidade ganha. A lista vale pra decisões novas, não pra repaginar o que já está no ar.

---

## (d) RECONCILIAÇÃO com "conversão ganha" — o que está LIBERADO

Esta é a seção que separa a Landing Page Machine de um manual de estética genérico. Direct response tem dispositivos que a conversão exige e que **contrariam** o manual de bom gosto do impeccable. Eles estão **liberados** — desde que sejam **reais** e fiquem do lado do recurso, não do tique. A linha sempre é a mesma: **conversão verdadeira liberada, enfeite que imita conversão proibido.**

| Dispositivo de conversão | Liberado porque | Vira tique de IA quando |
|---|---|---|
| **Número grande no hero** (preço, desconto, resultado) | é a prova/oferta que decide a compra; o olho tem que bater nele primeiro (Von Restorff). O ban do "hero-métrica" é contra o *enfeite* de métrica, não contra um número que É a oferta. | é estatística decorativa sem fonte, sem significado de venda — só "150+ clientes" genérico pra encher. Aí é altar de SaaS. |
| **Barra de urgência / contador real** | escassez verdadeira (turma fecha, lote acaba, bônus expira) acelera a decisão de quem já estava quase. | o timer reseta no F5, o "estoque" é fixo no código, a "última vaga" volta amanhã. Escassez falsa é dark pattern — proibido por ética e quase sempre por lei. |
| **Prova empilhada** (depoimentos, logos, prints, selos em sequência) | repetição de prova social é o que constrói confiança; uma única prova "elegante" converte menos que uma pilha honesta. | os prints são inventados, os logos são de clientes que não existem, os depoimentos são genéricos. Prova falsa reprova no piso e na lei. |
| **Stack de valor com preço riscado** ("De R$997 por R$297") | ancoragem honesta de valor é venda legítima quando o preço cheio é real e já foi praticado. | o "de R$997" é fictício, nunca foi cobrado. Aí é a âncora falsa que o manual de viés proíbe — e o Procon também. |
| **Depoimento em destaque** (card grande, foto, aspas, resultado) | o pico de prova merece isolamento visual; quebrar o padrão pra destacar UM depoimento forte é Von Restorff a favor da venda. | vira grid de seis depoimentos idênticos do mesmo tamanho (cai no proibido #4). Destaque é UM, não a fileira inteira. |
| **CTA repetido ao longo da página** | em scroll longo, o usuário decide em momentos diferentes; repetir o CTA captura cada um (Posição Serial + reduzir fricção de Fitts). | os CTAs competem entre si com textos diferentes e pesos diferentes, confundindo qual é a ação. Repita o MESMO CTA, mesma cor, mesmo texto. |

**A linha, em uma frase:** o dispositivo está liberado quando o que ele comunica é **verdade** (o número é real, a escassez é real, a prova é real, o preço cheio foi praticado). Vira tique de IA — ou pior, dark pattern — quando ele **imita** conversão sem o lastro. O impeccable bane o enfeite; a casa libera o recurso. Nunca confunda os dois.

Regra de viés sobre tudo isso: nada de continuidade forçada, confirmshaming, escassez fictícia, "compare at" falso, ou opt-in pré-marcado. Se o usuário, ao entender o truque depois, fosse processar você em vez de agradecer — é dark pattern, não conversão.

---

## (e) Piso de acessibilidade — inegociável

Acessibilidade vence qualquer conflito visual. Quando uma regra de acessibilidade colide com a estética ou a conversão, redesenhe o visual, não a regra.

- **Contraste de texto:** corpo ≥ **4.5:1**; texto grande (≥ 24px regular, ou ≥ 18.5px bold) ≥ **3:1**. Placeholder conta como texto real — também precisa de 4.5:1. A falha mais comum: cinza claro sobre quase-branco amarelado "pra ficar elegante". Calcule, não chute — `4.499:1` reprova. Quando uma cor de marca falha como texto, escureça **a própria cor** (mesma matiz, mais escura), não troque por cinza.
- **Contraste não-textual:** borda de campo/botão, anel de foco, ícone com significado ≥ **3:1** contra o adjacente.
- **Cor nunca é o único canal:** erro = borda vermelha **+ ícone + texto**; obrigatório = asterisco **+ "(obrigatório)"**; selecionado = cor **+ check + `aria-selected`**. Daltônico não enxerga vermelho/verde sozinhos.
- **Foco visível:** `:focus-visible`, anel ≥ 2px, offset ≥ 2px, contraste ≥ 3:1 contra o componente E o fundo, **instantâneo** (0ms). Nunca `outline: none` sem substituto.
- **Navegação por teclado:** tudo alcançável por Tab/Shift+Tab; botão ativa em Espaço e Enter, link em Enter; ordem de tab segue a leitura visual; sem `tabindex > 0`; sem armadilha de foco.
- **Alvo de toque ≥ 44px** (piso absoluto WCAG 2.2 é 24px, mas a casa exige 44px) com ≥ 8px de espaço entre alvos adjacentes. Padding conta — link de 14px sem padding é alvo inacessível.
- **`prefers-reduced-motion: reduce`** em toda animação, transição e parallax — alternativa estática obrigatória. Nada de piscar mais de 3x/s (risco de convulsão).
- **Espaçamento de texto:** a página tem que sobreviver ao usuário forçar line-height 1.5×, espaço de parágrafo 2×, letter-spacing 0.12×, word-spacing 0.16×. Use unidades relativas (`rem`/`em`); nunca `height` fixo em container de texto; nunca `overflow: hidden` sem testar.
- **HTML semântico, ARIA como suplemento:** `<button>` pra ação, `<a>` pra navegação (nunca troque); um `<h1>` por página, sem pular níveis; `<nav>`/`<main>`/`<header>`/`<footer>`/`<section>` reais; `<label>` ligado a cada `<input>`. ARIA preenche o que o HTML nativo não cobre — não substitui o elemento certo. Não use `<div role="button">` quando `<button>` resolve.
- **Texto que escala:** `rem` no corpo (nunca `px`); página utilizável a 200% de zoom; nunca desabilite o pinch-to-zoom (`maximum-scale=1.0` é violação). Funciona a 320px de largura sem scroll horizontal — mobile-first.

---

## (f) Leis de UX aplicadas à página de venda

Subconjunto das 30 leis, escolhido pelo que decide venda. Cada uma em 1–2 linhas, aplicada.

- **Fitts (alvo perto e grande):** CTA com alvo ≥ 44px, ≥ 8px de folga; na mobile, dentro do arco do polegar (CTA fixo no rodapé funciona). Quanto mais longe/menor o botão, mais lento o clique — e menos cliques.
- **Hick (menos opções, decisão mais rápida):** UM CTA primário por dobra, no máximo um secundário. Cada destino clicável a mais atrasa a decisão de comprar.
- **Miller (memória ~7 itens):** quebre listas de benefícios e o formulário em grupos de 5–9. Não jogue 12 bullets seguidos; agrupe.
- **Proximidade (perto = relacionado):** label colado no input, erro colado no campo, preço colado no botão. Espaço entre grupos diferentes ~2× o espaço interno.
- **Von Restorff / Isolamento (o que quebra o padrão é lembrado):** o CTA TEM que destoar — cor + peso + posição diferentes de tudo ao redor. Se tudo se destaca, nada se destaca: no máximo 2 itens enfatizados por zona.
- **Posição Serial (primeiro e último são lembrados):** abra com a promessa mais forte, feche com o CTA mais forte. Nunca enterre o CTA principal no meio de um scroll longo.
- **Goal-Gradient (acelera perto da meta):** em checkout/formulário multi-passo, mostre progresso ("Passo 1 de 3 — 33%"). A barra de progresso visível puxa a pessoa pro fim.
- **Peak-End (lembra do pico e do fim):** poliça o momento de prova (pico) e a tela de confirmação (fim). Nunca termine num "OK" genérico nem deixe um erro ser a última coisa que a pessoa vê.
- **Zeigarnik (laço aberto puxa pra fechar):** "Falta só confirmar o e-mail", carrinho salvo, "1 de 3 passos concluídos". Tarefa inacabada incomoda — use a favor, sem mentira de urgência.
- **Jakob (não reinvente o padrão):** carrinho no topo à direita, "Comprar"/"Entrar" com os nomes de sempre, link inline sublinhado. O usuário gasta o tempo dele em OUTRAS páginas e espera que a sua se comporte como elas.
- **Aesthetic-Usability (bonito parece confiável):** craft coerente (uma escala de tipo, um sistema de espaço, uma paleta) compra confiança e paciência — é o piso de craft virando arma de conversão. Mas beleza não tapa arquitetura quebrada.
- **Choice Overload (uma oferta):** uma oferta principal por página. Se há planos, no máximo 3–4 com UM marcado "Recomendado". Persona-picker ou 12 opções na dobra mata a conversão.
- **Carga Cognitiva (corte o que não serve à venda):** para cada elemento pergunte "o que isso me rende em direção à compra?". Se a resposta é "nada", remova. Cópia redundante, animação decorativa, campo desnecessário — tudo é carga extraneous.
