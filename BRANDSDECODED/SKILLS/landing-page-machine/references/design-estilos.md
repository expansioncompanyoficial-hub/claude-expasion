# Catálogo de Estilos — Direct Response BR

Estilos visuais curados pra página de venda, com o filtro único: **serve à conversão?** Cada estilo traz palavras-chave, quando usar / quando NÃO usar, se é focado em conversão, as variáveis de CSS principais e um checklist curto de implementação. No fim, a lista dos estilos a EVITAR em DR e por quê.

## Como usar

1. **O estilo serve à conversão, não ao contrário.** A pergunta nunca é "qual estilo é mais bonito" — é "qual estilo tira atrito entre o leitor e o botão". A maioria das páginas de venda da casa vive em dois ou três estilos: hero-centric, conversion-optimized e dark mode de alto contraste. O resto é tempero pra campanhas específicas.
2. **Alguns estilos brigam com conversão e estão proibidos em DR.** Eles existem, são lindos em outros contextos, mas em página de venda eles ou matam o contraste, ou deixam a página lenta no mobile, ou dão cara de template/IA. Estão marcados na seção "Evitar em DR".
3. **Pode misturar, com parcimônia.** Uma página de venda real costuma ser hero-centric + conversion-optimized + social-proof, com um toque de editorial no hero. O perigo é empilhar estilo demais e perder o foco no botão.
4. **Mobile-first e piso de craft valem pra todos.** Qualquer estilo escolhido tem que funcionar no celular e não pode parecer feito por IA. O estilo nunca é desculpa pra furar essas duas regras da casa.

---

## Estilos recomendados pra DR

### Hero-Centric Design

**Palavras-chave:** hero grande, manchete forte, CTA de alto contraste, promessa acima da dobra, visual dramático.
**Quando usar:** praticamente toda página de venda. É a espinha dorsal — manchete + promessa + botão ocupando a primeira tela.
**Quando NÃO usar:** quando a oferta exige explicação longa antes de qualquer promessa (raro em DR). Mesmo aí, dá pra ter um hero enxuto.
**Focado em conversão?** Sim — altíssimo. É o estilo mais convertedor que existe.
**Variáveis de CSS principais:**
```css
:root{
  --hero-min-height:100vh;
  --headline-size:clamp(2.5rem, 8vw, 5.5rem);
  --cta-padding:1rem 2rem;
  --overlay-opacity:0.5;            /* escurece imagem de fundo pra texto ler */
}
```
**Checklist:**
- [ ] Hero ocupa a primeira tela (ou perto), promessa visível sem rolar.
- [ ] Manchete acima da dobra, grande, em display.
- [ ] Um CTA de alto contraste, claramente o elemento mais chamativo.
- [ ] Imagem de fundo comprimida (WebP) e com overlay pra texto ler.
- [ ] Texto legível por cima do fundo no celular (testar no 360px).

### Conversion-Optimized

**Palavras-chave:** foco em formulário/botão, CTA único, alto contraste, urgência, prova social, sinais de confiança, valor claro.
**Quando usar:** sempre que o objetivo é uma ação direta (compra, cadastro, lead). É o estilo que organiza a página inteira em volta do botão.
**Quando NÃO usar:** página que precisa explicar muito recurso técnico antes de pedir a ação (aí vira showcase com CTA no fim).
**Focado em conversão?** Sim — é o estilo definido por conversão.
**Variáveis de CSS principais:**
```css
:root{
  --cta-color:var(--cta);          /* a cor mais contrastante da página */
  --form-max-width:600px;
  --input-height:48px;
  --focus-ring:3px solid var(--brand);
  --success:#22c55e;
  --error:#ef4444;
}
```
**Checklist:**
- [ ] Um CTA principal, repetido em pontos lógicos da página.
- [ ] Formulário curto (3-5 campos), input ≥ 48px de altura.
- [ ] Prova social acima da dobra (número, depoimento, selo).
- [ ] Estados de foco, sucesso e erro implementados no formulário.
- [ ] Sem links que puxam o leitor pra fora do objetivo (atenção 1:1).

### Minimal & Direct

**Palavras-chave:** pouco texto, muito espaço em branco, coluna única, mensagem direta, tipografia limpa, carregamento rápido.
**Quando usar:** captura/opt-in, serviço enxuto, oferta de uma frase, mentoria sem firula. Quando a força está na promessa, não na decoração.
**Quando NÃO usar:** oferta cheia de recursos e objeções pra quebrar (precisa de mais blocos).
**Focado em conversão?** Sim — alto, especialmente em opt-in.
**Variáveis de CSS principais:**
```css
:root{
  --content-max-width:680px;
  --spacing-large:4rem;
  --fs-body:18px;
  --line-height:1.6;
}
```
**Checklist:**
- [ ] Coluna única centralizada, largura de leitura ~680px.
- [ ] Espaço em branco generoso entre blocos.
- [ ] Um CTA só.
- [ ] Sem imagem decorativa que não trabalha pela venda.
- [ ] Página leve (< 500KB), carrega em menos de 2s.

### Social Proof-Focused

**Palavras-chave:** depoimentos em destaque, logos de clientes, prints de resultado, avaliações, números de sucesso, marcadores de credibilidade.
**Quando usar:** oferta cara, mentoria, high-ticket, qualquer coisa em que a confiança é o gargalo. Como camada dentro de uma página hero-centric.
**Quando NÃO usar:** produto sem nenhum cliente/resultado ainda (não invente prova — isso queima a marca e é risco de Procon).
**Focado em conversão?** Sim — alto.
**Variáveis de CSS principais:**
```css
:root{
  --avatar-size:64px;
  --logo-height:40px;
  --star-color:#fbbf24;
  --stat-size:clamp(3rem, 10vw, 7rem);
  --testimonial-bg:var(--card);
}
```
**Checklist:**
- [ ] Depoimentos com foto/print real (nunca stock genérico de banco de imagem).
- [ ] Números com contexto ("2.847 alunos", não só "milhares").
- [ ] Print de resultado legível no mobile.
- [ ] Avaliação/estrela acessível (não só ícone, com rótulo).
- [ ] Métrica com fonte/contexto quando o dado é forte.

### Trust & Authority

**Palavras-chave:** selos e garantias, credenciais, comparação antes/depois, métricas com fonte, selos de segurança/pagamento.
**Quando usar:** saúde, finanças, jurídico, oferta cara onde o risco percebido é alto. Reforça a decisão perto do CTA.
**Quando NÃO usar:** oferta casual, de entrada, onde excesso de selo parece desespero.
**Focado em conversão?** Sim — alto.
**Variáveis de CSS principais:**
```css
:root{
  --badge-height:48px;
  --trust-color:var(--primary);
  --security-green:#059669;
  --card-shadow:0 4px 6px rgba(0,0,0,.1);
}
```
**Checklist:**
- [ ] Selo de pagamento e garantia visíveis perto do botão de compra.
- [ ] Garantia escrita com clareza (prazo, condição).
- [ ] Métrica com fonte quando o número é forte.
- [ ] Credencial/autoridade do vendedor presente.
- [ ] Sombras discretas — sem exagero de profundidade.

### Bold Typography / Editorial Pôster

**Palavras-chave:** tipo-como-herói, manchete edge-to-edge, near-black, acento único forte (vermelhão/coral), CTA sublinhado, muito respiro vertical.
**Quando usar:** hero de campanha com identidade forte, marca pessoal, página editorial que ainda vende. Combina com o modo escuro da casa e com o coral.
**Quando NÃO usar:** página cheia de ícone e imagem, ou oferta utilitária que precisa de muitos blocos visuais.
**Focado em conversão?** Sim — alto, quando a manchete é boa.
**Variáveis de CSS principais:**
```css
:root{
  --bg:#0a0a0a;
  --fg:#fafafa;
  --accent:#ff3d00;                /* ou o coral da casa #e8421a */
  --headline:clamp(2.5rem, 9vw, 5rem);
  --radius:0;                      /* containers sem arredondar */
}
```
**Checklist:**
- [ ] Manchete pelo menos 4-5× o tamanho do corpo.
- [ ] Acento usado só pra interação/destaque, não espalhado.
- [ ] Containers com canto reto (0px) — coerência editorial.
- [ ] Grandes espaços verticais entre seções.
- [ ] Contraste altíssimo (texto quase-branco em quase-preto).

### Dark Mode (alto contraste / OLED)

**Palavras-chave:** fundo quase-preto, alto contraste, acento vibrante, energia, urgência, lançamento.
**Quando usar:** lançamento agressivo, oferta com prazo, infoproduto quente, qualquer campanha de pressão. É o modo padrão de DR da casa.
**Quando NÃO usar:** oferta que vende calma/confiança serena (saúde leve, bem-estar) — aí o claro/creme converte melhor.
**Focado em conversão?** Sim — em DR, muito. O fundo escuro faz o coral e o CTA saltarem.
**Variáveis de CSS principais:**
```css
:root{
  --bg:#0f0d0c;
  --ink:#ffffff;
  --ink-soft:rgba(255,255,255,.62);
  --brand:#e8421a;
  --cta:#16a34a;
}
```
**Checklist:**
- [ ] Fundo quase-preto (`#0f0d0c`/`#121212`), nunca branco.
- [ ] Texto de corpo branco/quase-branco, contraste ≥ 7:1.
- [ ] Acento vibrante (coral) e CTA de alto contraste (verde) saltando.
- [ ] Brilho/glow só sutil, sem exagero neon que dá cara de template.
- [ ] Camadas brancas translúcidas (`rgba(255,255,255,.04)`) pra profundidade, não sombras pesadas.

### Flat Design

**Palavras-chave:** 2D, sem sombra, sem gradiente, cores sólidas, formas simples, foco em tipografia, carrega rápido.
**Quando usar:** página enxuta, e-commerce, SaaS, oferta que prioriza velocidade e clareza. Base segura pra não errar.
**Quando NÃO usar:** quando a oferta pede sensação premium/luxo (flat puro pode parecer "barato").
**Focado em conversão?** Sim — alto, e excelente no mobile.
**Variáveis de CSS principais:**
```css
:root{
  --shadow:none;
  --radius:4px;
  --gradient:none;                 /* cor sólida sempre */
}
```
**Checklist:**
- [ ] Sem sombra e sem gradiente decorativo.
- [ ] 4-6 cores sólidas no máximo.
- [ ] Formas simples, ícones SVG limpos.
- [ ] Hierarquia feita por tamanho e peso de fonte, não por efeito.
- [ ] Carrega rápido (poucos assets).

### Bento Box Grid

**Palavras-chave:** cards modulares, grade assimétrica, tamanhos variados, estilo Apple, hierarquia limpa.
**Quando usar:** seção de benefícios/recursos de uma página de venda, vitrine de "o que você leva". Como bloco, não como página inteira.
**Quando NÃO usar:** como estrutura da página toda (perde o foco no CTA) ou pra texto denso.
**Focado em conversão?** Sim — alto, como seção de apoio.
**Variáveis de CSS principais:**
```css
:root{
  --grid-gap:16px;
  --card-radius:16px;
  --card-bg:var(--card);
  --hover-scale:1.02;
}
```
**Checklist:**
- [ ] Grade responsiva (4 → 2 → 1 coluna no mobile).
- [ ] Cards com tamanhos variados, não todos iguais (evita cara de template).
- [ ] Cantos arredondados consistentes.
- [ ] Conteúdo cabe no card sem vazar.
- [ ] Hover sutil (scale 1.02), sem efeito pesado.

### Neubrutalism (com parcimônia)

**Palavras-chave:** bordas pretas grossas, sombra dura deslocada (offset), cores saturadas, sem gradiente, tipografia pesada, Gen Z.
**Quando usar:** marca jovem, campanha que quer chamar atenção e destoar, infoproduto pra público mais novo. Usar como tempero, não como base.
**Quando NÃO usar:** luxo, finanças, saúde, qualquer coisa conservadora (parece brincadeira). Página inteira em neubrutalismo cansa.
**Focado em conversão?** Pode ser alto pra público certo — mas é arriscado, teste.
**Variáveis de CSS principais:**
```css
:root{
  --border-width:3px;
  --shadow-offset:4px;
  --shadow-color:#000;
  --radius:0;
}
```
**Checklist:**
- [ ] Bordas pretas grossas (2-4px) e sombra dura deslocada.
- [ ] Cores saturadas, sem gradiente.
- [ ] Tipografia pesada (700+).
- [ ] Contraste alto (passa em acessibilidade).
- [ ] Não aplicar na página toda — destaca um ou dois blocos.

### Vintage Analog / Retrô (nicho)

**Palavras-chave:** grão de filme, cores quentes e desbotadas, polaroid, calor analógico, nostalgia.
**Quando usar:** marca artesanal, produto de origem, cafeteria, nicho retrô/nostalgia. Tempero de hero, não a página inteira.
**Quando NÃO usar:** tech, SaaS, saúde, infantil, qualquer oferta que precise de cara moderna/limpa.
**Focado em conversão?** Médio-alto, só no nicho certo.
**Variáveis de CSS principais:**
```css
:root{
  --sepia:20%;
  --contrast:1.1;
  --saturation:0.8;
  --grain-opacity:0.10;            /* sutil; grão pesado pesa a página */
}
```
**Checklist:**
- [ ] Grão de filme sutil (opacidade baixa, via SVG, sem peso de imagem).
- [ ] Cores quentes e levemente desbotadas — sem matar o contraste do texto.
- [ ] Filtros leves (sem travar o mobile).
- [ ] Texto de corpo ainda passa 4,5:1 (o desbotado não pode comer a leitura).
- [ ] Não usar fora do nicho de nostalgia.

---

## Estilos a EVITAR em DR (e por quê)

Estes estilos são lindos no contexto deles, mas em página de venda eles atrapalham a conversão. Não use como padrão. Se a campanha pedir um toque deles, use micro-doses controladas e conscientes.

### Neumorphism — EVITAR

**Por quê:** contraste baixíssimo. O efeito embossado vive de sombras suaves sobre fundo monocromático, e isso reprova em acessibilidade (texto e botão somem no fundo). Em DR o botão tem que GRITAR; o neumorphism faz o botão sussurrar. É o oposto do que a página precisa.

### Glassmorphism como padrão — EVITAR

**Por quê:** card de vidro borrado como decoração padrão dá cara de template e cara de IA — é um dos tiques visuais que a casa proíbe. O `backdrop-filter: blur` também derruba a performance no mobile e o texto sobre vidro raramente bate 4,5:1. Um detalhe pontual de vidro pode existir, mas glassmorphism como linguagem da página inteira está fora.

### 3D & Hiperrealismo — EVITAR

**Por quê:** lento e ruim no mobile. Depende de WebGL/Three.js, modelos pesados e luz realista — performance ruim, carrega devagar, e a maior parte do tráfego de DR é celular. Página lenta perde venda antes do hero terminar de carregar. Não é acessível. Fica pra showcase de produto premium em desktop, nunca pra página de conversão.

### Brutalism puro (anti-design) — EVITAR

**Por quê:** o brutalismo cru (fonte default, sem transição, "feio de propósito") é marcado como baixa conversão. Ele afasta o público de DR brasileiro, que confia em página caprichada. Diferente do **neubrutalism** (que é controlado e pode funcionar pra público jovem), o brutalism puro está fora de DR.

### Gen Z Chaos / Maximalismo — EVITAR (salvo nicho viral)

**Por quê:** assets pesados, acessibilidade ruim, layout caótico. Pode converter em campanha viral de público muito jovem, mas em DR padrão ele cria atrito, polui o caminho até o botão e pesa o mobile. Só considere em campanha explicitamente "viral/zoeira" e ainda assim com cuidado.

### Storytelling-Driven pesado em animação — CUIDADO

**Por quê:** narrativa com scroll-reveal e parallax converte bem, mas a versão pesada (muita animação por seção, parallax em camadas) derruba o mobile e pode irritar. Use a estrutura narrativa, mas com animação leve, respeitando `prefers-reduced-motion`. A história vende; a animação pesada atrapalha.

### Regra geral dos tiques de IA (vale pra qualquer estilo)

Independente do estilo escolhido, estes detalhes denunciam a página como "feita por IA" e estão proibidos: texto com gradiente (`background-clip: text`), rótulo minúsculo em CAIXA ALTA com tracking largo em cima de cada seção, numerinho "01 / 02 / 03" de enfeite, borda lateral colorida grossa em card/alerta, grids de cards idênticos repetidos sem necessidade, e o bege amarelado morno como fundo padrão preguiçoso. O estilo nunca é desculpa pra esses tiques — o piso de craft vale sempre.
