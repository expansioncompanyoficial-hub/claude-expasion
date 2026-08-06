/* BrandsDecoded — Pitch / Apresentação / Proposta / Pesquisa, render parametrizado.
   Troque o THEME (identidade do cliente) e o DECK (slides) e OUT. Tokens default = NEUTRO (substituir pela marca do cliente).
   Tipos de slide: cover, divider, section, bullets, metrics, twocol, biblio, closing.
   Uso: npm install pptxgenjs && node build-proposta.js
*/
const pptxgen = require("pptxgenjs");

// ===== THEME (identidade) — troque por marca do cliente; default NEUTRO — sempre substituir pela marca do cliente (nunca assumir BrandsDecoded) =====
// Caminho 1 (brand kit) / 2 (descrição traduzida) / 3 (default). Ver references/identidade-e-deck.md
const THEME = {
  accent: "2B5CE6",    // cor de destaque
  bg:     "FFFFFF",    // fundo claro (conteúdo)
  dark:   "111827",    // fundo escuro (capa/divisor/fecho)
  ink:    "111827",    // texto sobre claro
  gray:   "6B7280",    // apoio
  grayL:  "9CA3AF",    // apoio claro
  line:   "E5E7EB",    // linhas
  subOnDark: "D1D5DB", // subtítulo sobre fundo escuro
  fontDisplay: "Instrument Sans",
  fontBody:    "Inter"
};
const ORANGE=THEME.accent, LIGHT=THEME.bg, DARK=THEME.dark, INK=THEME.ink, GRAY=THEME.gray, GRAY_L=THEME.grayL, LINE=THEME.line, WHITE="FFFFFF";
const DISPLAY=THEME.fontDisplay, BODY=THEME.fontBody;

// ===================== DADOS (exemplo ilustrativo: RotaVerde, pitch) =====================
const DECK = {
  out: "/sessions/sharp-wonderful-johnson/mnt/outputs/proposta-rotaverde.pptx",
  title: "RotaVerde — Pitch Deck",
  brand: "RotaVerde",  // marca exibida no rodape (do cliente). Vazio = so numero da pagina.
  slides: [
    { type:"cover", eyebrow:"Pitch Deck · Rodada Pré-Seed", title:"RotaVerde", italic:"a rota mais curta do last-mile.",
      sub:"Software de otimização de rotas para pequenas transportadoras de entrega no Brasil.", foot:"CONFIDENCIAL · 2026" },

    { type:"divider", num:"01", label:"Oportunidade" },

    { type:"section", eyebrow:"Problema", title:"Transportadora pequena perde dinheiro em cada rota mal planejada.",
      body:"O pequeno operador monta rota no olho ou em planilha. Resultado: quilômetro a mais, combustível desperdiçado e entrega atrasada. Quem tem 5 a 50 veículos não tem orçamento pro software dos grandes, e fica preso no improviso." },

    { type:"section", eyebrow:"Solução", title:"Otimização de rota em um clique, no preço do pequeno.",
      body:"A RotaVerde recebe a lista de entregas e devolve a rota ótima para cada veículo em segundos. Integra com o que o operador já usa, sem implantação cara. O que era planilha de 2 horas vira 2 minutos." },

    { type:"metrics", eyebrow:"Mercado · TAM / SAM / SOM", title:"Um mercado grande e ainda mal atendido na ponta pequena.",
      stats:[ {big:"R$ 9 bi", label:"TAM — software de logística no Brasil (F01)"},
              {big:"R$ 1,2 bi", label:"SAM — pequenas transportadoras (F02)"},
              {big:"R$ 60 mi", label:"SOM — estimativa, 5% do SAM em 3 anos"} ],
      note:"SOM é estimativa (5% do SAM, premissa de canal). Demais números: ver bibliografia." },

    { type:"divider", num:"02", label:"Tração" },

    { type:"metrics", eyebrow:"Tração", title:"Crescendo com receita real, não só promessa.",
      stats:[ {big:"R$ 48 mil", label:"MRR (exemplo ilustrativo)"},
              {big:"+22%", label:"crescimento médio mês a mês"},
              {big:"34", label:"transportadoras pagantes"} ],
      note:"Números ilustrativos do exemplo. Em uso real, só dados confirmados pelo cliente entram aqui." },

    { type:"twocol", eyebrow:"Modelo de negócio", title:"Assinatura por veículo, margem de software.",
      left:{ h:"Como cobramos", body:"Mensalidade por veículo ativo, sem implantação. Faixas por frota. Receita recorrente e previsível." },
      right:{ h:"Unit economics", body:"Ticket médio por conta cresce com a frota do cliente. Churn baixo: quem otimiza rota não volta pra planilha." } },

    { type:"bullets", eyebrow:"Concorrência · Moat", title:"Por que a RotaVerde vence na ponta pequena.",
      items:[ "Os grandes (TMS corporativo) são caros e complexos demais pro pequeno.",
              "Planilha e roteirização manual são o concorrente real, e perdem em tempo e custo.",
              "Moat: algoritmo afinado pro caos do endereço brasileiro + base de rotas que melhora a cada cliente." ] },

    { type:"bullets", eyebrow:"Time", title:"Quem toca, com prova de execução.",
      items:[ "CEO — 8 anos em operação logística, tocou frota de 200 veículos.",
              "CTO — ex-engenheiro de roteirização em marketplace de entrega.",
              "Já entregaram o MVP e as primeiras 34 contas sem capital externo." ] },

    { type:"section", eyebrow:"O Ask", title:"Captando R$ 1,5 mi para destravar o próximo marco.",
      body:"Uso dos recursos: time comercial (50%), produto e integrações (35%), aquisição (15%). Meta: 200 contas pagantes e R$ 300 mil de MRR em 18 meses." },

    { type:"biblio", eyebrow:"Bibliografia", title:"Fontes",
      sources:[ "F01 — [Fonte ilustrativa] Mercado de software de logística no Brasil, relatório setorial, 2025.",
                "F02 — [Fonte ilustrativa] Recorte de pequenas transportadoras, associação do setor, 2025.",
                "Nota: neste exemplo as fontes são ilustrativas. Em uso real, cada número leva fonte primária verificável." ] },

    { type:"closing", a:"A rota mais curta ", b:"entre o pequeno operador", c:" e a margem que ele deixa na estrada.", foot:"ROTAVERDE · CONFIDENCIAL" }
  ]
};

// ===================== ENGINE =====================
const pres = new pptxgen();
pres.defineLayout({name:"HD",width:10,height:5.625}); pres.layout="HD";
pres.author="BrandsDecoded"; pres.title=DECK.title;

const eyebrow=(s,t)=>s.addText((t||"").toUpperCase(),{x:0.6,y:0.45,w:8.8,h:0.3,fontFace:BODY,bold:true,fontSize:9,color:ORANGE,charSpacing:3,margin:0});
const title=(s,t,size=22)=>s.addText(t,{x:0.6,y:0.82,w:8.8,h:1.0,fontFace:DISPLAY,bold:true,fontSize:size,color:INK,margin:0,lineSpacingMultiple:0.98});
const sep=(s,y,x=0.6,w=8.8)=>s.addShape(pres.shapes.LINE,{x,y,w,h:0,line:{color:LINE,width:0.75}});
let pageN=0;
const footer=(s)=>{ pageN++; s.addText((DECK.brand||""),{x:0.6,y:5.25,w:4,h:0.3,fontFace:BODY,fontSize:8,color:GRAY,margin:0});
  s.addText(String(pageN).padStart(2,"0"),{x:8.9,y:5.25,w:0.5,h:0.3,fontFace:BODY,fontSize:8,color:GRAY,align:"right",margin:0}); };

function render(sl){
  const s=pres.addSlide();
  if(sl.type==="cover"){ s.background={color:DARK};
    eyebrow(s,sl.eyebrow);
    if(sl.foot) s.addText(sl.foot,{x:5.2,y:0.45,w:4.2,h:0.3,fontFace:BODY,fontSize:9,color:GRAY_L,align:"right",margin:0});
    s.addText([{text:sl.title,options:{color:LIGHT,breakLine:true}},{text:sl.italic||"",options:{color:ORANGE,italic:true}}],
      {x:0.55,y:1.7,w:9,h:2.3,fontFace:DISPLAY,bold:true,fontSize:50,lineSpacingMultiple:0.98,margin:0});
    if(sl.sub) s.addText(sl.sub,{x:0.6,y:4.5,w:7.6,h:0.6,fontFace:BODY,fontSize:11,color:THEME.subOnDark,margin:0,lineSpacingMultiple:1.05});
    return; }
  if(sl.type==="divider"){ s.background={color:DARK};
    s.addText(sl.num,{x:6.0,y:0.9,w:3.6,h:3.8,fontFace:DISPLAY,bold:true,fontSize:170,color:ORANGE,align:"right",valign:"middle",margin:0,wrap:false});
    s.addText("BLOCO "+sl.num,{x:0.62,y:1.95,w:5,h:0.3,fontFace:BODY,bold:true,fontSize:10,color:ORANGE,charSpacing:3,margin:0});
    s.addText(sl.label,{x:0.6,y:2.35,w:5.4,h:1.4,fontFace:DISPLAY,bold:true,fontSize:46,color:LIGHT,margin:0});
    return; }
  if(sl.type==="closing"){ s.background={color:DARK};
    s.addText([{text:sl.a,options:{color:LIGHT}},{text:sl.b,options:{color:ORANGE}},{text:sl.c,options:{color:LIGHT}}],
      {x:0.6,y:1.9,w:8.4,h:2.0,fontFace:DISPLAY,bold:true,fontSize:30,margin:0,lineSpacingMultiple:1.02});
    s.addText(sl.foot||"POWERED BY BRANDSDECODED®",{x:0.6,y:5.15,w:7,h:0.3,fontFace:BODY,bold:true,fontSize:8,color:ORANGE,charSpacing:2,margin:0});
    return; }
  s.background={color:LIGHT}; eyebrow(s,sl.eyebrow); title(s,sl.title,sl.size||22);
  if(sl.type==="section"){
    s.addText(sl.body,{x:0.6,y:2.15,w:8.5,h:2.4,fontFace:BODY,fontSize:14,color:INK,margin:0,lineSpacingMultiple:1.2}); }
  else if(sl.type==="bullets"){
    let y=2.05; sl.items.forEach((it,i)=>{ s.addText(String(i+1).padStart(2,"0"),{x:0.6,y:y,w:0.6,h:0.4,fontFace:DISPLAY,bold:true,fontSize:14,color:ORANGE,margin:0});
      s.addText(it,{x:1.25,y:y,w:8.1,h:0.9,fontFace:BODY,fontSize:12.5,color:INK,valign:"top",margin:0,lineSpacingMultiple:1.05}); y+=0.92; }); }
  else if(sl.type==="metrics"){
    const nn=sl.stats.length, gap=0.3, cw=(8.8-gap*(nn-1))/nn;
    sl.stats.forEach((st,i)=>{ const x=0.6+i*(cw+gap);
      s.addText(st.big,{x,y:2.1,w:cw,h:0.9,fontFace:DISPLAY,bold:true,fontSize:40,color:ORANGE,margin:0});
      s.addText(st.label,{x,y:3.05,w:cw,h:1.0,fontFace:BODY,fontSize:10.5,color:INK,margin:0,lineSpacingMultiple:1.1}); });
    if(sl.note) s.addText(sl.note,{x:0.6,y:4.5,w:8.8,h:0.5,fontFace:BODY,italic:true,fontSize:9,color:GRAY_L,margin:0}); }
  else if(sl.type==="twocol"){
    sep(s,2.0,0.6,4.1); sep(s,2.0,5.3,4.1);
    s.addText(sl.left.body,{x:0.6,y:2.5,w:4.0,h:2.2,fontFace:BODY,fontSize:12,color:INK,margin:0,lineSpacingMultiple:1.15});
    s.addText(sl.right.h,{x:5.3,y:2.1,w:4.1,h:0.35,fontFace:BODY,bold:true,fontSize:12.5,color:ORANGE,margin:0});
    s.addText(sl.right.body,{x:5.3,y:2.5,w:4.0,h:2.2,fontFace:BODY,fontSize:12,color:INK,margin:0,lineSpacingMultiple:1.15}); }
  else if(sl.type==="biblio"){
    let y=2.0; sl.sources.forEach((src)=>{ s.addText(src,{x:0.6,y:y,w:8.8,h:0.7,fontFace:BODY,fontSize:10,color:GRAY,margin:0,lineSpacingMultiple:1.05}); y+=0.62; }); }
  footer(s);
}

DECK.slides.forEach(render);
pres.writeFile({ fileName: DECK.out }).then(f => console.log("WROTE", f));
