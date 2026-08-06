# Módulo — Montagem do HTML

Carregado na **Etapa 4**, junto com `design.md` e `design-ritmo-visual.md`. Monta a página em HTML pronto pra usar — e já **arejada** (rodar o checklist de `design-ritmo-visual.md`; página não pode sair como parede de texto).

## Formato de saída (inegociável)

- **Arquivo único.** HTML com o CSS dentro de `<style>` e o JS dentro de `<script>` no fim. Portável, hospedável em qualquer lugar (servidor próprio, Vercel, Netlify), fácil de colar pixel de rastreamento.
- **Nada de React** pra página de venda isolada. Peso de build não se paga; HTML puro carrega mais rápido, e velocidade afeta conversão.
- **Tokens no topo** em `:root` (variáveis de CSS), pra o usuário trocar cor e fonte por campanha sem caçar no código.
- **JS isolado e comentado.** Cada interação (contador, sanfona do FAQ, carrossel de depoimento) vem em bloco próprio, comentado de forma que um leigo entenda *o que* faz sem precisar editar a lógica.

## Mobile-first de verdade

O CSS base é o do celular. As media queries `min-width` só adicionam o que muda em telas maiores — nunca o contrário. Botão de toque ≥ 44px, espaçamento generoso, texto legível sem zoom, imagens comprimidas, fluxo vertical. Testar a manchete em cada largura: se vazar, reduzir o clamp ou reescrever.

## Esqueleto do arquivo

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>[título da oferta]</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="[fontes]" rel="stylesheet">
  <style>
    :root{ /* TOKENS — trocar aqui pra mudar a campanha */ }
    /* base = mobile. media queries min-width adicionam o desktop. */
  </style>
  <!-- ====== COLE AQUI SEU PIXEL DE RASTREAMENTO (Meta, GA, GTM) ====== -->
</head>
<body>
  <!-- Seções na ordem do esqueleto aprovado na Etapa 2. -->
  <!-- Aplicar o ritmo visual: quebrar prosa, ícone em listas, slot de imagem, frase-destaque. -->
  <script>
    /* COMPONENTES — cada um isolado e comentado. */
  </script>
</body>
</html>
```

## Ícones (SVG inline — nunca emoji como ícone)

Set base, 24x24, `stroke:currentColor` (herda a cor do contexto). Colar o `<svg>` direto onde precisar. Emoji só pontual pra tom, nunca como ícone de lista.

```html
<!-- check -->      <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 13l4 4L19 7"/></svg>
<!-- x -->          <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
<!-- relógio -->    <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
<!-- dinheiro -->   <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3v18M8 7h6a2 2 0 010 4H9a2 2 0 000 4h7"/></svg>
<!-- alvo -->       <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></svg>
<!-- escudo -->     <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"/></svg>
<!-- raio -->       <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M13 2L4 14h6l-1 8 9-12h-6z"/></svg>
<!-- download -->   <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3v12m-4-4l4 4 4-4M5 21h14"/></svg>
<!-- lápis -->      <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 20h4L20 8l-4-4L4 16z"/></svg>
```
```css
.ic{width:22px;height:22px;flex:0 0 auto;vertical-align:middle}
```

## Componentes de quebra-visual (o que arejar a página)

**Lista com ícone** (troca um parágrafo de "faz X, Y, Z"):
```html
<ul class="ico-list">
  <li><svg class="ic" ...></svg><span><b>Cola a ideia.</b> Um link, um print ou uma frase.</span></li>
  <li><svg class="ic" ...></svg><span><b>Recebe pronto.</b> Os slides montados pelo método.</span></li>
</ul>
<style>
.ico-list{list-style:none;padding:0;margin:18px 0;display:grid;gap:14px}
.ico-list li{display:flex;gap:12px;align-items:flex-start;color:var(--ink-soft)}
.ico-list .ic{color:var(--brand);margin-top:2px}
.ico-list b{color:#fff}
</style>
```

**Frase-destaque (pull-quote)** — a linha matadora isolada:
```html
<p class="destaque">A diferença não é competência. É método.</p>
<style>
.destaque{font-family:var(--font-display);font-size:clamp(24px,6vw,38px);line-height:1.1;
  color:var(--brand);text-align:center;margin:36px auto;max-width:560px}
</style>
```

**Caixa-callout** — dado-âncora ou aviso que salta:
```html
<div class="callout"><svg class="ic" ...></svg><p><b>1.400 posts analisados</b> pra mapear o que faz um carrossel estourar.</p></div>
<style>
.callout{display:flex;gap:14px;align-items:center;background:var(--brand-soft);
  border:1px solid rgba(232,66,26,.3);border-radius:var(--radius);padding:18px 20px;margin:22px 0}
.callout .ic{color:var(--brand)}.callout p{margin:0;color:#fff}
</style>
```

**Grade de benefícios com ícone** (substitui parágrafos de benefício):
```html
<div class="bene-grid">
  <div class="bene"><svg class="ic" ...></svg><h3>Rápido</h3><p>Carrossel pronto em 8 minutos.</p></div>
  <div class="bene"><svg class="ic" ...></svg><h3>Sem design</h3><p>Sai pronto pra baixar em PNG.</p></div>
  <div class="bene"><svg class="ic" ...></svg><h3>Qualquer nicho</h3><p>Testado em 7 mercados.</p></div>
</div>
<style>
.bene-grid{display:grid;grid-template-columns:1fr;gap:14px;margin:20px 0}
.bene{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:20px}
.bene .ic{color:var(--brand);width:28px;height:28px}.bene h3{font-size:18px;margin:10px 0 6px}
.bene p{color:var(--ink-soft);font-size:15px;margin:0}
@media(min-width:768px){.bene-grid{grid-template-columns:repeat(3,1fr)}}
</style>
```

**Slot de imagem** (a skill não gera foto — marcar com direção de arte):
```html
<div class="img-slot" role="img" aria-label="[descreva a imagem]">
  <!-- SLOT IMAGEM: foto do autor, retrato vertical 4:5, fundo neutro.
       TROCAR por <img src="..." alt="..."> com a imagem real. -->
  📷 foto do autor (4:5)
</div>
<style>
.img-slot{aspect-ratio:4/5;background:linear-gradient(160deg,#1b1715,#241c19);
  border:1px dashed var(--line);border-radius:var(--radius);display:grid;place-items:center;
  color:var(--ink-soft);font-size:14px;text-align:center;padding:16px}
</style>
```

**Como funciona (3 colunas / framework visual):**
```html
<div class="passos-3">
  <div class="passo"><span class="n">1</span><b>Cola a ideia</b><p>Link, print ou frase.</p></div>
  <div class="passo"><span class="n">2</span><b>Claude monta</b><p>9 slides pelo método.</p></div>
  <div class="passo"><span class="n">3</span><b>Baixa e posta</b><p>PNG pronto.</p></div>
</div>
<style>
.passos-3{display:grid;grid-template-columns:1fr;gap:14px;margin:20px 0}
.passo{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:20px;text-align:center}
.passo .n{font-family:var(--font-display);font-size:26px;color:var(--brand);
  width:48px;height:48px;border-radius:50%;background:var(--brand-soft);display:grid;place-items:center;margin:0 auto 10px}
.passo b{display:block;margin-bottom:4px}.passo p{color:var(--ink-soft);font-size:14px;margin:0}
@media(min-width:768px){.passos-3{grid-template-columns:repeat(3,1fr)}}
</style>
```

**Antes / depois:**
```html
<div class="ad"><div class="antes"><b>Antes</b><p>2h no Canva, post amador.</p></div>
  <div class="depois"><b>Depois</b><p>8 min, carrossel que viraliza.</p></div></div>
<style>
.ad{display:grid;gap:12px;margin:20px 0}.ad div{border-radius:var(--radius);padding:18px}
.ad .antes{background:var(--surface);border:1px solid var(--line);color:var(--ink-soft)}
.ad .depois{background:var(--brand-soft);border:1px solid rgba(232,66,26,.3);color:#fff}
@media(min-width:768px){.ad{grid-template-columns:1fr 1fr}}
</style>
```

## Componentes interativos (JS pronto)

**Contador regressivo (com data real):**
```html
<div class="contador" data-fim="2025-12-31T23:59:59"><!-- TROCAR a data --></div>
<script>
/* CONTADOR — conta até a data em data-fim. Se a urgência não for real, remova. */
(function(){var el=document.querySelector('.contador');if(!el)return;
var fim=new Date(el.dataset.fim).getTime();
function t(){var d=fim-Date.now();if(d<0){el.textContent='Oferta encerrada';return;}
var h=Math.floor(d/3.6e6),m=Math.floor(d%3.6e6/6e4),s=Math.floor(d%6e4/1e3);
el.textContent=h+'h '+m+'m '+s+'s';}t();setInterval(t,1000);})();
</script>
```

**Sanfona de FAQ (acessível por teclado):**
```html
<script>
/* FAQ — clica na pergunta, abre a resposta. */
document.querySelectorAll('.faq-q').forEach(function(b){
  b.addEventListener('click',function(){
    var open=b.getAttribute('aria-expanded')==='true';
    b.setAttribute('aria-expanded',!open); b.nextElementSibling.hidden=open;
  });
});
</script>
```

**Chamada fixa no mobile:**
```css
.cta-fixo{position:fixed;left:12px;right:12px;bottom:12px;z-index:55;background:var(--cta);color:#fff;
  text-align:center;padding:16px;border-radius:var(--radius);font-weight:800;text-decoration:none}
@media (min-width:768px){.cta-fixo{display:none}}
```

O formulário/checkout aponta pro destino do briefing (Hotmart/Kiwify/Cakto, formulário, WhatsApp).

## Piso de acessibilidade

Contraste de corpo ≥ 4,5:1. Foco visível em botão e campo. `prefers-reduced-motion` respeitado em toda animação. HTML semântico (section, h1-h3, button, label). Ícone decorativo com `aria-hidden="true"`; slot de imagem com `aria-label` descritivo.

## Antes de entregar

Rodar o **checklist de `design-ritmo-visual.md`**: nenhuma seção com 4+ parágrafos seguidos, ícone nas listas, slot de imagem em hero/autoridade/demonstração, frase-destaque na dor e no fechamento, layout alternando.

## Entrega

1. Salvar o `.html` em `outputs/` e entregar via `present_files`.
2. Oferecer mostrar o preview renderizado.
3. Lembrar que serve pra subir direto num servidor e também de referência visual pro Lovable (Etapa 5).
