# Módulo — Sistema de Design (hub)

Carregado na **Etapa 4**, junto com `render-html.md`. Este arquivo é o **hub** da camada de design: a filosofia, o sistema de tokens, e o mapa dos sub-módulos. O detalhe profundo vive nos arquivos irmãos — ler o que a tarefa pedir:

- `design-paletas.md` — biblioteca de ~41 paletas por tipo de oferta (hex completos) + as paletas da casa.
- `design-tipografia.md` — ~29 pares de fonte com import pronto, escala, legibilidade.
- `design-estilos.md` — catálogo de estilos com flag de conversão + estilos a evitar em DR.
- `design-componentes-estados.md` — os 9 estados de botão/campo, formulário, motion, overlay.
- `design-ritmo-visual.md` — anti-parede-de-texto: quebra a densidade com ícones, slots de imagem, frases-destaque e frameworks visuais. Também roda no atalho "deixa mais leve".
- `design-anti-slop.md` — proibidos visuais, teste de cara de IA, acessibilidade, leis de UX.

## A regra de ouro: conversão ganha, craft é o piso

Quando "design bonito" brigar com "isso converte", **conversão ganha** — com craft suficiente pra não parecer golpe. A diferença entre **recurso de conversão** (liberado, mesmo contrariando estética) e **tique de IA** (proibido) está detalhada em `design-anti-slop.md`. Em resumo: número grande no hero, urgência real, prova empilhada e stack de valor são liberados; gradiente em texto, glass decorativo e "eyebrow" em toda seção são proibidos.

## Sistema de tokens (sempre como variáveis de CSS no topo)

O usuário é leigo e troca campanha sem caçar no código. Tudo nomeado em `:root`:

```css
:root{
  --bg: #0f0d0c;            /* fundo */
  --surface: rgba(255,255,255,.04);
  --ink: #ffffff;          /* texto principal */
  --ink-soft: rgba(255,255,255,.62);
  --brand: #e8421a;        /* cor protagonista — destaques, detalhes */
  --cta: #16a34a;          /* botão de ação, alto contraste */
  --font-display: 'Anton', sans-serif;
  --font-body: 'Inter', sans-serif;
  --radius: 14px;
  --maxw: 680px;           /* largura de leitura */
  --step: 8px;             /* base do ritmo de espaçamento (grade de 8) */
}
```

Escolher os valores a partir de `design-paletas.md` e `design-tipografia.md` conforme a oferta e o modo. Trocar só os tokens muda a campanha inteira.

## Modo (escolhido por campanha)

- **Escuro** (fundo quase-preto, ex.: `#0f0d0c`): base recorrente de DR. Urgência, energia, lançamento.
- **Claro/creme:** variação editorial/sofisticada, com o coral por cima. Refinamento em vez de pressão.

A cor **protagonista** (coral, âncora `#e8421a`, pode variar na família coral/laranja-queimado) é constante nos dois modos.

## Estratégia de cor (decidir antes de escolher tons)

- **Contida:** neutros + 1 acento (≤10%).
- **Comprometida:** uma cor saturada carrega 30-60% da superfície. Padrão de página com identidade forte.
- **Imersiva:** a superfície é a cor (heros de campanha).

Conferir contraste sempre (regra completa em `design-anti-slop.md`): corpo ≥ 4,5:1. Cinza claro "pra ficar elegante" é a causa nº 1 de página que cansa de ler.

## Fluxo da Etapa 4

1. Escolher **modo** + **paleta** (`design-paletas.md`) e **par de fonte** (`design-tipografia.md`) servindo à oferta.
2. Escolher o **estilo** (`design-estilos.md`) — confirmando que ele soma na conversão, não atrapalha.
3. Definir tokens em `:root`.
4. Montar respeitando hierarquia (promessa → prova → apoio → chamada), estados (`design-componentes-estados.md`), o **ritmo visual** (`design-ritmo-visual.md` — nada de parede de texto: ícones, slots de imagem, frases-destaque, frameworks) e o piso anti-slop + acessibilidade (`design-anti-slop.md`).
5. Renderizar com `render-html.md`. Mobile-first sempre. Rodar o checklist de ritmo visual antes de entregar.
