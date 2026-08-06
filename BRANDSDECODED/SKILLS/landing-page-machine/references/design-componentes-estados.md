# Design de componentes e estados de interação

Contrato de estados aplicado aos elementos que uma página de venda de fato TEM. Não é um sistema de design genérico: é a lista do que toca o dedo numa landing de direct response e do que cada toque tem que devolver. A regra-mãe da casa continua valendo: conversão ganha do "bonito", mas existe um piso de craft. Botão que não responde ao toque, campo que não diz o que errou, sanfona que abre sem aviso — isso reprova no piso, mesmo numa página que converte. Estado mal feito é o cheiro de IA mais barato que existe.

Princípio operacional: **todo elemento interativo é um contrato, não um visual.** Botão não é uma cor — é o conjunto dos 9 estados abaixo. Entregar só o default é entregar um componente quebrado. Desenhe os estados como conjunto, nunca isolados.

---

## 0. Os elementos que a página tem (e que precisam de contrato)

| Elemento | Tipo (o que faz) | Estados que importam |
|---|---|---|
| **Botão de CTA** (comprar, garantir, começar) | dispara ação | os 9 — é o elemento mais crítico da página |
| **Campo de formulário** (e-mail, nome, WhatsApp) | entrada de dado | default, focus, error, success, disabled, loading |
| **Link** (âncora pra seção, política, "ver detalhes") | navega | default, hover, focus-visible — só isso, nunca vira botão |
| **Sanfona de FAQ** (`<details>`/accordion) | abre/fecha conteúdo | default, hover, focus-visible, active, selected/aberto |
| **Barra de urgência / contador** (timer, estoque, progresso) | mostra status | default, loading (carregando valor), o estado de "esgotado" |

Regra de ouro pra leigo: se clicar **faz** algo (compra, envia, marca) é botão e leva o contrato inteiro. Se clicar **leva** pra algum lugar (rola a página, abre outra aba) é link e leva só estilo de texto — cor no hover, cor no active, anel no `focus-visible`. Não transforme link em botão (sem fundo, sem borda, sem bloco de padding, sem `transform: scale`).

---

## 1. Os 9 estados, com CSS concreto por estado

A volume escala com a intenção: **hover reconhece, active confirma, focus orienta.** Hover é sutil, active é mais firme, focus é o mais alto.

### 1.1 Default (repouso)
O default é a affordance. Se não parece clicável no repouso, nenhum estado posterior salva.
- Botão de CTA: forma + preenchimento + label verbal claro ("Quero garantir minha vaga", não "Enviar"). Contraste label/fundo ≥ 4.5:1. Padding generoso o suficiente pra bater o alvo de toque de 44px sem depender do tamanho natural do texto.
- Campo: borda visível (≥ 3:1 contra o fundo), label visível por cima, placeholder só como exemplo de formato.

```css
.cta {
  background: var(--cor-acento);
  color: var(--cor-acento-texto);
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 16px 28px;
  min-height: 48px;            /* alvo de toque */
  font-weight: 700;
  cursor: pointer;
  transition: background-color 150ms ease-out, box-shadow 150ms ease-out, transform 120ms ease-out;
}
.campo {
  border: 1.5px solid var(--cor-borda);   /* ≥ 3:1 contra o fundo */
  border-radius: 8px;
  padding: 14px 16px;
  min-height: 48px;
  background: var(--cor-superficie);
  color: var(--cor-texto);
}
```

### 1.2 Hover (ponteiro em cima — não existe no toque)
Acionado quando o ponteiro passa por cima. Confirma a interatividade antes do clique. Escolha **uma ou duas** técnicas, nunca três. Pareie uma técnica de cor (escurecer/aclarar preenchimento, tint) com uma espacial (elevação, nudge de ícone). Transição 100–150ms, `ease-out`. Cursor vira `pointer`.
- Não mude o significado no hover (texto/ícone diferente esconde info de quem usa toque e teclado).
- Não use hover como única affordance — em celular não existe.

```css
.cta:hover {
  background: var(--cor-acento-escuro);     /* escurece 1 passo */
  box-shadow: 0 4px 12px rgb(0 0 0 / .15);  /* lift suave */
}
.campo:hover { border-color: var(--cor-borda-forte); }
```

### 1.3 Active / pressed (sendo pressionado)
Dispara no mouse-down / toque / Enter-Space com foco. É a prova de que o input registrou. Tem que parecer **mais firme** que o hover: se o hover levanta, o active afunda; se o hover clareia, o active escurece mais. Transição mais rápida, 80–120ms. Não pode empurrar o botão pra fora da célula do layout.

```css
.cta:active {
  background: var(--cor-acento-mais-escuro);  /* afunda mais 1 passo */
  transform: translateY(1px);                 /* tecla física */
  box-shadow: none;                            /* desfaz o lift do hover */
}
```

### 1.4 Focus-visible (foco de teclado) — o estado mais importante pra acessibilidade
Aparece quando o elemento recebe foco por teclado. Para quem navega por teclado, o foco **é** o cursor. Use `:focus-visible` (não `:focus` pelado) pra que o clique de mouse não deixe o anel, mas o Tab deixe. Anel de 2–3px, offset ≥ 2px, contraste ≥ 3:1 contra o botão **e** contra o fundo da página. O anel deve ser **instantâneo** (0ms) — nunca anime a entrada do foco. Nunca `outline: none` sem substituto: é a violação de acessibilidade número um.

```css
.cta:focus-visible,
.campo:focus-visible,
a:focus-visible,
.faq-trigger:focus-visible {
  outline: 3px solid var(--cor-foco);
  outline-offset: 2px;
}
/* o foco precisa sobreviver por cima de hover e active */
```

### 1.5 Disabled (existe, mas não está disponível agora)
Parece indisponível, não invisível. Fundo apagado (mesmo tom a ~40–60% de opacidade), label mais fraco, `cursor: not-allowed`. **Sempre pareie com um motivo** — texto inline, tooltip no foco, ou mensagem de validação ao lado ("Preencha o e-mail pra continuar"). Em elemento não nativo, `aria-disabled="true"`; em `<button>`/`<input>`, o atributo nativo `disabled`. Numa landing, **não desabilite o CTA principal silenciosamente** — se o formulário está incompleto, leve o clique pro campo que falta em vez de cinzar o botão sem explicação. Botão cinza sem motivo = o usuário clica, clica e desiste.

```css
.cta:disabled, .cta[aria-disabled="true"] {
  background: var(--cor-acento);
  opacity: .5;
  cursor: not-allowed;
  box-shadow: none;
}
```

### 1.6 Loading (foi pressionado; o sistema está trabalhando)
Comunica que o input registrou e **impede o reenvio**. Desabilita o botão pela duração da requisição (`aria-busy="true"`). Troca/acompanha o label por spinner (< 1s esperado) ou barra de progresso (> 1s). Mantém **a mesma largura** do default — não reflua o layout no clique. Restaura o estado padrão imediatamente no sucesso/erro — nunca deixe o spinner rodando pra sempre. Não mostre loading pra ação que resolve em < 100ms (o flash é pior que a ausência). Esse é o estado que evita pedido/cobrança duplicada — o motivo mais comum de cobrança em dobro é re-clique durante o loading.

```css
.cta[aria-busy="true"] { pointer-events: none; opacity: .8; }
.cta[aria-busy="true"] .label { visibility: hidden; }
.cta[aria-busy="true"]::after {
  content: ""; position: absolute; inset: 0; margin: auto;
  width: 20px; height: 20px; border-radius: 50%;
  border: 2px solid currentColor; border-top-color: transparent;
  animation: girar .7s linear infinite;
}
@keyframes girar { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .cta[aria-busy="true"]::after { animation: none; }
  .cta[aria-busy="true"] .label { visibility: visible; }  /* vira "Enviando…" estático */
}
```

### 1.7 Success / concluído (a ação completou)
É o pico emocional natural da interação. Verde ou acento de marca + ícone de check + label no passado ("Pronto", "Enviado", "Garantido"). Visível por 1.5–3s, depois volta ao default **ou** vira a próxima ação lógica ("Ver detalhes do acesso"). Entrada com `ease-out` 150–250ms. Anuncie pra leitor de tela com `aria-live="polite"`. Não use label genérico "Sucesso" — verbo no passado convence mais. Não comemore demais (confete, som) em ação de rotina.

```css
.cta.is-success {
  background: var(--cor-sucesso);
  color: #fff;
}
.campo.is-success { border-color: var(--cor-sucesso); }
```

### 1.8 Error (a ação falhou)
O caminho de recuperação importa mais que o visual. Vermelho (fundo/borda/ícone) **+ texto inline** dizendo o que deu errado **e o que fazer**. Reset pra estado clicável pra permitir nova tentativa — nunca prenda o usuário no erro. Cópia específica e sem culpar: "Não conseguimos confirmar o cartão — confira os dados e tente de novo", não "Erro 4032". Anuncie com `role="alert"` quando bloqueia o progresso. **Cor sozinha nunca basta** — pareie com ícone e texto (quem é daltônico não percebe a mudança). Se a explicação passa de ~3 palavras, coloque ao lado do botão/campo, não dentro.

```css
.campo.is-error { border-color: var(--cor-erro); }
.campo-erro-texto { color: var(--cor-erro); font-size: .875rem; margin-top: 6px; }
```

### 1.9 Selected / toggled (persiste até desligar)
O padrão certo pra sanfona de FAQ aberta, chip de plano escolhido, toggle de "ver mais". Diferente dos outros estados, **persiste** até o usuário desligar. Use estilo preenchido/invertido que difere claramente do default — não confie em mudança sutil de matiz. Reflita no `aria-pressed="true"` (toggle) ou `aria-expanded="true"` (sanfona). Pareie a mudança visual com mudança de ícone quando o significado não é óbvio (seta pra baixo → seta pra cima). Nunca confie só na cor.

```css
.faq-trigger[aria-expanded="true"] {
  background: var(--cor-superficie-2);
  font-weight: 700;
}
.faq-trigger[aria-expanded="true"] .seta { transform: rotate(180deg); }
```

---

## 2. Design de formulário (o ponto onde a venda escapa)

Formulário é o gargalo da conversão. Cada atrito desnecessário é um lead perdido. Regras:

- **Label sempre visível.** Placeholder não é label — ele some quando o usuário digita e a pessoa esquece o que aquele campo pedia. Use `<label>` real, associado ao input (`for`/`id`). `aria-label` é fallback, não substituto.
- **Validação inline no blur, não a cada tecla.** Validar a cada caractere mostra "inválido" antes da pessoa terminar de digitar — isso irrita. Valide quando o campo perde o foco (exceção: força de senha). Não acople mensagem de erro a campo que o usuário ainda nem visitou.
- **Texto de ajuda perto do campo.** Formato esperado como placeholder de exemplo ("ex: nome@email.com") ou microcopy abaixo do campo. Conecte com `aria-describedby`.
- **Erro perto do campo, não num resumo no topo.** A mensagem vai **abaixo** do campo que falhou, ligada por `aria-describedby`, com ícone + texto (não só borda vermelha). O olho tem que achar o campo e o conserto no mesmo lugar (Lei da Proximidade).
- **Aceite formato sujo (Postel).** Telefone com ou sem espaço/parêntese, e-mail com maiúscula, tudo normalizado depois no silêncio. Não rejeite input que difere só em espaço, caixa ou pontuação. O usuário não deve formatar o que a máquina formata.
- **"Sem cartão de crédito" quando aplicável.** Em captura de lead, teste grátis ou isca, declare isso explícito perto do botão — é redutor de fricção de conversão comprovado. Microcopy abaixo do CTA: "Sem cartão de crédito. Cancele quando quiser." Só use se for verdade.
- **Menos campos = mais conversão.** Peça só o que a oferta exige agora. Cada campo extra é atrito. Não peça telefone se e-mail resolve.
- **Carregue o contexto entre passos.** Em fluxo de mais de uma tela, nunca faça o usuário redigitar. Não auto-limpe o formulário num erro de validação.

```html
<label for="email">Seu melhor e-mail</label>
<input id="email" name="email" type="email" inputmode="email"
       autocomplete="email" required
       aria-describedby="email-ajuda email-erro" />
<p id="email-ajuda" class="campo-ajuda">A gente manda o acesso aqui.</p>
<p id="email-erro" class="campo-erro-texto" role="alert" hidden>
  Esse e-mail parece incompleto — confere o @ e o domínio.
</p>
```

---

## 3. Motion (movimento com propósito)

- **Curvas `ease-out` exponenciais.** `ease-out-quart`, `ease-out-quint`, `ease-out-expo`. Sem bounce, sem elastic — bounce em página de venda parece brinquedo, derruba a confiança.
- **Duração 150–300ms** para transições de estado e revelações curtas; transições de estado de botão ficam no piso (100–200ms). Abaixo de 100ms o usuário perde o feedback; acima de 300ms a interface arrasta.
- **O que NÃO animar: propriedades de layout.** Nunca anime `width`, `height`, `top`, `left`, `margin`, `padding` — isso causa reflow, treme e engasga. Anime só `transform` e `opacity` (e, com cuidado, `box-shadow`, `filter`, `clip-path`). Texto de corpo nunca anima — tem que estar legível em repouso.
- **`prefers-reduced-motion` é obrigatório, não opcional.** Toda animação precisa de uma alternativa em `@media (prefers-reduced-motion: reduce)`: tipicamente um crossfade ou transição instantânea. Spinner vira label estático "Enviando…". Sem isso, reprova no piso.
- **Micro-interação com propósito.** Cada animação tem que ganhar o lugar: nudge da seta no CTA reforça o "siga em frente"; o lift confirma "isto é clicável"; o check do sucesso fecha o ciclo. Animar por animar é tique de IA. O delator não é o movimento — é o reflexo uniforme (a mesma entrada idêntica em toda seção). Cada revelação deve caber no que revela.
- **Revelação ao rolar nunca esconde conteúdo.** A animação realça um default já visível; ela não pode condicionar a visibilidade a uma classe (em aba de fundo ou renderizador headless a transição não dispara e a seção sai em branco). Conteúdo crítico de venda visível por padrão; o motion é tempero.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 4. Posicionamento de overlay / dropdown (a armadilha do clipping)

O bug número um de overlay em código gerado: dropdown com `position: absolute` dentro de um container com `overflow: hidden` ou `overflow: auto` é **cortado**. Numa landing isso aparece em menu de FAQ, popover de "ver mais", seletor de variação, modal de checkout. Conserto, em ordem de preferência:

1. **Popover nativo + Anchor.** O atributo `popover` joga o elemento na *top layer*, que fica acima de tudo independente de z-index ou overflow. Sem portal, sem briga de z-index, com light-dismiss (clicar fora fecha) e acessível por padrão.

```html
<button popovertarget="menu">Ver detalhes</button>
<div id="menu" popover>…</div>
```

2. **`<dialog>` nativo** para modais (checkout, captura). `dialog.showModal()` abre com foco preso, fecha no Escape, e fica na top layer. Use `inert` no `<main>` por trás se precisar.

3. **`position: fixed`** com coordenadas calculadas do `getBoundingClientRect()` do gatilho — escapa de qualquer clipping de overflow do ancestral. Cheque a borda da viewport: se estoura embaixo, vira pra cima; se estoura à direita, alinha pela direita.

4. **CSS Anchor Positioning** (`anchor-name` + `position-anchor` + `@position-try`) onde houver suporte (Chrome/Edge 125+); com fallback `position: fixed` pra Firefox/Safari.

Construa uma escala de z-index semântica (dropdown → sticky → backdrop → modal → toast → tooltip). Nunca valores arbitrários como 999 ou 9999.

Conteúdo em hover/focus (tooltip, popover): tem que ser **dismissível** (Escape fecha), **hoverável** (o ponteiro pode entrar nele sem ele sumir) e **persistente** (fica até o gatilho perder foco). Não use `mouseout` pra sumir na hora.

---

## 5. Checklist por componente antes de declarar pronto

- [ ] CTA: os 9 estados existem? Default lê como clicável sem hover? Loading impede re-clique? Erro permite retry?
- [ ] Campo: label visível, validação no blur, erro abaixo com ícone+texto, `aria-describedby` ligado?
- [ ] Link: estilo de texto (cor no hover/active + `focus-visible`), nunca tratamento de botão? Link inline com `underline`, link de nav/rodapé sem?
- [ ] Sanfona: `aria-expanded` reflete o estado, seta gira, `focus-visible` no gatilho?
- [ ] Foco: tira o mouse, navega tudo no Tab+Enter, vê onde está em cada passo?
- [ ] `prefers-reduced-motion`: toda animação tem alternativa?
- [ ] Overlay: nada cortado por `overflow: hidden`?
- [ ] Alvo de toque ≥ 44px e ≥ 8px de espaço entre alvos adjacentes?
