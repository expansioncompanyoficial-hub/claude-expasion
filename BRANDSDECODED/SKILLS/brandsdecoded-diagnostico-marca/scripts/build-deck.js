/* BrandsDecoded — BD Strategic Positioning Document, deck render.
   Parametrizado: troque o objeto D (dados do diagnóstico) e o OUT (caminho de saída).
   Tokens da casa travados. Uso:
     npm install pptxgenjs
     node build-deck.js
*/
const pptxgen = require("pptxgenjs");

// ===== TOKENS DA CASA =====
const ORANGE="FF4500", LIGHT="FAF8F4", DARK="1A1410", INK="1A1410", GRAY="6B6B6B", GRAY_L="9A9A9A", LINE="D8D2C5";
const DISPLAY="Instrument Sans", BODY="Inter";

// ===== DADOS DO DIAGNÓSTICO (exemplo: Dr. Marcos Silva) =====
const D = {
  cliente:"Dr. Marcos Silva",
  subtitulo:"Advogado trabalhista. Posicionamento pra atrair o trabalhador CLT no Instagram, sem o tom do 'advogado que promete fortuna'.",
  X:{ tese:"Defesa de rescisão pro CLT, lida por quem vinha do lado da empresa.",
      forte:"Não é 'advogado trabalhista'. É achar o erro no cálculo da rescisão de quem foi demitido, com a vantagem de ter operado do outro lado.",
      prova:"Veio de escritório grande que defende empresa. Conhece como a verba é calculada (e onde ela some) por dentro." },
  Y:{ tese:"CLT recém-demitido que desconfia que a rescisão veio errada.",
      detalhe:"Verba a menos, hora extra que nunca caiu no holerite, assédio engolido calado. Tem urgência (está sem renda) e tem o que recuperar." },
  territorio:"Defesa de rescisão pro trabalhador comum, em português, sem promessa de fortuna. O espaço vazio entre o picareta do cifrão e o institucional do juridiquês.",
  nicho:{ afinidade:"Trabalhador comum, não a empresa. É o lado pra quem o Marcos escolheu virar.",
          dinheiro:"Rescisão mal calculada e verbas atrasadas têm valor concreto a recuperar; honorário de êxito sustenta.",
          vantagem:"Veio do escritório que defende empresa: sabe o cálculo por dentro como ninguém do outro lado.",
          cravado:"CLT demitido e sacaneado na rescisão, com urgência de renda e medo de cair no advogado errado." },
  icp:{ nome:"Roberto, 41",
        descricao:"Operador de produção, 12 anos de CLT, demitido sem justa causa. Recebeu uma rescisão que 'parece baixa', fez hora extra que nunca foi paga, aguentou chefe gritando por anos.",
        tentou:"Perguntou pro RH e aceitou a resposta. Tem medo de advogado porque acha que vai ouvir promessa de dinheiro fácil ou um monte de termo que não entende." },
  dor:{ tese:"A rescisão mal calculada deixa pra trás dinheiro que é dele, no pior momento: sem renda.",
        impacto:"Não é 'sentir injustiça'. É R$ que faltou na conta no mês em que mais precisava, e que ele nem sabe medir." },
  bigIdea:{ pre:"Na rescisão, o que te protege não é a ", mid:"promessa de uma fortuna", pos:". É saber ", hl:"exatamente o que te devem.",
            logica:"Ele rema contra os dois lados poluídos do mercado: o RH que calcula a verba errada e o advogado que vive da desinformação. Troca a promessa de dinheiro pela clareza do direito." },
  narrativa:[
    "O inimigo do trabalhador não é só a empresa, é a desinformação.",
    "Quem promete fortuna na primeira conversa está vendendo, não defendendo.",
    "Saber o que te devem é o que te dá poder na mesa da rescisão.",
    "Veio do lado da empresa: sabe onde a verba some."
  ],
  linguagem:{ usa:["rescisão","verba","cálculo","direito","clareza","prazo","holerite"],
              evita:["fortuna","processo que enriquece","você tem direito a milhões","sucesso","sonho"] },
  editorias:{
    Mercado:["Reforma trabalhista 6 anos depois: o que mudou na sua rescisão.","Onda de demissão e o erro de cálculo que ninguém confere.","Por que a empresa erra a verba (e quase sempre pra menos)."],
    Cases:["Recebi uma rescisão pra revisar. Veja o que estava errado. (anonimizado)","O caso da hora extra que sumia há 3 anos do holerite.","Assédio que virou indenização: como foi reconhecido."],
    Cultura:["O medo de procurar advogado e por que ele existe.","Demitido e com vergonha: o tabu que faz o trabalhador aceitar menos.","'Deixa pra lá': a frase que custa caro na rescisão."],
    "Notícias":["Decisão do TST muda cálculo de X: minha leitura.","Lei nova de demissão em massa: o que ela protege (e o que não) no seu caso.","Mudança na regra de horas extras: o que o CLT precisa saber."],
    Produtos:["Como eu reviso uma rescisão em 3 passos.","As 5 verbas que eu confiro primeiro em todo cálculo.","Antes de assinar procuração com qualquer um, faça estas 3 perguntas."]
  },
  resumo:"Marcos ocupa o espaço que falta no mercado jurídico do feed: o advogado honesto que traduz a rescisão pro trabalhador comum e troca a promessa de fortuna pela clareza do direito.",
  passos:["Confirmar tom de voz com 2-3 áudios reais do Marcos.","Levantar provas e números (rescisões revisadas, casos anonimizados).","Definir canal e oferta de entrada (direct, análise inicial).","Revisar cada peça pela regra de publicidade da OAB (Provimento 205/2021)."]
};
const OUT = "/sessions/sharp-wonderful-johnson/mnt/outputs/diagnostico-marca-marcos-silva.pptx";

// ===== SETUP =====
const pres = new pptxgen();
pres.defineLayout({name:"HD",width:10,height:5.625}); pres.layout="HD";
pres.author="BrandsDecoded"; pres.title="BD Strategic Positioning — "+D.cliente;

// ===== HELPERS =====
const eyebrow=(s,t,c=ORANGE)=>s.addText(t.toUpperCase(),{x:0.6,y:0.45,w:8.8,h:0.3,fontFace:BODY,bold:true,fontSize:9,color:c,charSpacing:3,margin:0});
const footer=(s,nn)=>{s.addText([{text:"BrandsDecoded",options:{bold:true}},{text:"®"}],{x:0.6,y:5.25,w:4,h:0.3,fontFace:BODY,fontSize:8,color:GRAY,margin:0});
  s.addText(String(nn).padStart(2,"0"),{x:8.9,y:5.25,w:0.5,h:0.3,fontFace:BODY,fontSize:8,color:GRAY,align:"right",margin:0});};
const title=(s,t,size=24)=>s.addText(t,{x:0.6,y:0.82,w:8.8,h:0.95,fontFace:DISPLAY,bold:true,fontSize:size,color:INK,margin:0,lineSpacingMultiple:0.98});
const sep=(s,y,x=0.6,w=8.8)=>s.addShape(pres.shapes.LINE,{x,y,w,h:0,line:{color:LINE,width:0.75}});
let n=0; const pg=()=>++n;

// ===== 1. CAPA =====
let s=pres.addSlide(); s.background={color:DARK};
eyebrow(s,"Diagnóstico de Posicionamento · BD Strategic Positioning");
s.addText("BrandsDecoded® · 2026",{x:5.2,y:0.45,w:4.2,h:0.3,fontFace:BODY,fontSize:9,color:GRAY_L,align:"right",margin:0});
s.addText([{text:D.cliente,options:{color:LIGHT,breakLine:true}},{text:"posicionamento.",options:{color:ORANGE,italic:true}}],
  {x:0.55,y:1.7,w:9,h:2.3,fontFace:DISPLAY,bold:true,fontSize:50,lineSpacingMultiple:0.98,margin:0});
s.addText(D.subtitulo,{x:0.6,y:4.5,w:7.2,h:0.6,fontFace:BODY,fontSize:11,color:"CFC9C2",margin:0,lineSpacingMultiple:1.05});
s.addText("POWERED BY BRANDSDECODED®",{x:0.6,y:5.18,w:6,h:0.3,fontFace:BODY,bold:true,fontSize:8,color:ORANGE,charSpacing:2,margin:0});

// ===== 2. SUMÁRIO =====
s=pres.addSlide(); s.background={color:LIGHT}; eyebrow(s,"O método · do insumo ao território");
title(s,"Onze movimentos, três blocos.");
const sumBlocks=[["ESTRATÉGIA","X · Competência   ·   Y · Grupo com dor   ·   Território   ·   Nicho   ·   ICP   ·   Dor Central"],
  ["NARRATIVA","Big Idea (tese)   ·   Variações narrativas   ·   Linguagem"],
  ["EDITORIAS","Mercado · Cases · Cultura · Notícias · Produtos   ->   15 ideias narrativas"]];
let sy=1.95; sumBlocks.forEach((b,i)=>{ sep(s,sy);
  s.addText(String(i+1).padStart(2,"0"),{x:0.6,y:sy+0.12,w:0.8,h:0.5,fontFace:DISPLAY,bold:true,fontSize:22,color:ORANGE,margin:0});
  s.addText(b[0],{x:1.5,y:sy+0.14,w:7.9,h:0.35,fontFace:BODY,bold:true,fontSize:13,color:INK,charSpacing:2,margin:0});
  s.addText(b[1],{x:1.5,y:sy+0.5,w:7.9,h:0.4,fontFace:BODY,fontSize:10.5,color:GRAY,margin:0}); sy+=1.05; });
footer(s,pg()+1);

// ===== DIVISOR helper =====
const divider=(label,num)=>{ const sd=pres.addSlide(); sd.background={color:DARK};
  sd.addText(num,{x:6.0,y:0.9,w:3.6,h:3.8,fontFace:DISPLAY,bold:true,fontSize:170,color:ORANGE,align:"right",valign:"middle",margin:0,wrap:false});
  sd.addText("BLOCO "+num,{x:0.62,y:1.95,w:5,h:0.3,fontFace:BODY,bold:true,fontSize:10,color:ORANGE,charSpacing:3,margin:0});
  sd.addText(label,{x:0.6,y:2.35,w:5.4,h:1.4,fontFace:DISPLAY,bold:true,fontSize:46,color:LIGHT,margin:0});
  return sd; };

// ===== DIVISOR 01 ESTRATÉGIA =====
divider("Estratégia","01");

// ===== 3. X =====
s=pres.addSlide(); s.background={color:LIGHT}; eyebrow(s,"Estratégia · X — Competência Dominante");
title(s,D.X.tese,22);
s.addText("POR QUE É FORTE",{x:0.6,y:2.0,w:4,h:0.3,fontFace:BODY,bold:true,fontSize:9,color:ORANGE,charSpacing:2,margin:0});
s.addText(D.X.forte,{x:0.6,y:2.35,w:4.2,h:1.6,fontFace:BODY,fontSize:12,color:INK,margin:0,lineSpacingMultiple:1.1});
s.addShape(pres.shapes.RECTANGLE,{x:5.2,y:2.0,w:4.2,h:2.1,fill:{color:"FFFFFF"},line:{color:LINE,width:1}});
s.addText("A PROVA",{x:5.45,y:2.2,w:3.7,h:0.3,fontFace:BODY,bold:true,fontSize:9,color:ORANGE,charSpacing:2,margin:0});
s.addText(D.X.prova,{x:5.45,y:2.55,w:3.7,h:1.4,fontFace:BODY,fontSize:11.5,color:INK,margin:0,lineSpacingMultiple:1.1});
footer(s,pg()+1);

// ===== 4. Y =====
s=pres.addSlide(); s.background={color:LIGHT}; eyebrow(s,"Estratégia · Y — Grupo com Dor Intensa");
title(s,D.Y.tese,22);
s.addText(D.Y.detalhe,{x:0.6,y:2.1,w:8.4,h:1.4,fontFace:BODY,fontSize:14,color:INK,margin:0,lineSpacingMultiple:1.15});
footer(s,pg()+1);

// ===== 5. TERRITÓRIO =====
s=pres.addSlide(); s.background={color:LIGHT}; eyebrow(s,"Estratégia · Território Estratégico");
title(s,"O espaço mental que a marca ocupa.",22);
s.addText(D.territorio,{x:0.6,y:2.1,w:8.4,h:1.6,fontFace:BODY,fontSize:14,color:INK,margin:0,lineSpacingMultiple:1.18});
footer(s,pg()+1);

// ===== 6. NICHO 3 CAMINHOS =====
s=pres.addSlide(); s.background={color:LIGHT}; eyebrow(s,"Estratégia · Nicho — os 3 caminhos");
title(s,"Validado por afinidade, dinheiro e vantagem.",20);
const cam=[["Afinidade",D.nicho.afinidade],["Dinheiro",D.nicho.dinheiro],["Vantagem",D.nicho.vantagem]];
cam.forEach((c,i)=>{ const x=0.6+i*2.95; sep(s,1.85,x,2.75);
  s.addText(c[0],{x,y:1.95,w:2.7,h:0.3,fontFace:BODY,bold:true,fontSize:12.5,color:ORANGE,margin:0});
  s.addText(c[1],{x,y:2.35,w:2.7,h:1.6,fontFace:BODY,fontSize:10,color:INK,margin:0,lineSpacingMultiple:1.08});});
s.addShape(pres.shapes.RECTANGLE,{x:0.6,y:4.2,w:8.8,h:0.62,fill:{color:DARK}});
s.addText([{text:"Nicho cravado  ",options:{color:ORANGE,bold:true}},{text:D.nicho.cravado,options:{color:LIGHT}}],
  {x:0.85,y:4.2,w:8.3,h:0.62,fontFace:BODY,fontSize:11.5,valign:"middle",margin:0});
footer(s,pg()+1);

// ===== 7. ICP =====
s=pres.addSlide(); s.background={color:LIGHT}; eyebrow(s,"Estratégia · ICP — a pessoa exata");
title(s,D.icp.nome+" — não um público, uma pessoa.",20);
s.addText(D.icp.descricao,{x:0.6,y:2.0,w:8.4,h:1.2,fontFace:BODY,fontSize:13,color:INK,margin:0,lineSpacingMultiple:1.15});
s.addText("JÁ TENTOU E FALHOU",{x:0.6,y:3.4,w:5,h:0.3,fontFace:BODY,bold:true,fontSize:9,color:ORANGE,charSpacing:2,margin:0});
s.addText(D.icp.tentou,{x:0.6,y:3.75,w:8.4,h:1.0,fontFace:BODY,fontSize:12,color:GRAY,margin:0,lineSpacingMultiple:1.1});
footer(s,pg()+1);

// ===== 8. DOR =====
s=pres.addSlide(); s.background={color:LIGHT}; eyebrow(s,"Estratégia · Dor Central");
title(s,D.dor.tese,22);
s.addText([{text:"O impacto concreto  ",options:{bold:true,color:ORANGE}},{text:D.dor.impacto,options:{color:INK}}],
  {x:0.6,y:2.2,w:8.4,h:1.2,fontFace:BODY,fontSize:14,margin:0,lineSpacingMultiple:1.15});
footer(s,pg()+1);

// ===== DIVISOR 02 NARRATIVA =====
divider("Narrativa","02");

// ===== 9. BIG IDEA (centerpiece dark) =====
s=pres.addSlide(); s.background={color:DARK}; eyebrow(s,"Narrativa · Big Idea — a tese proprietária");
s.addText([{text:D.bigIdea.pre,options:{color:LIGHT}},{text:D.bigIdea.mid,options:{color:GRAY_L}},
  {text:D.bigIdea.pos,options:{color:LIGHT}},{text:D.bigIdea.hl,options:{color:ORANGE}}],
  {x:0.6,y:1.45,w:8.6,h:2.2,fontFace:DISPLAY,bold:true,fontSize:34,margin:0,lineSpacingMultiple:1.02});
s.addText(D.bigIdea.logica,{x:0.6,y:4.0,w:8.2,h:0.9,fontFace:BODY,fontSize:11.5,color:"CFC9C2",margin:0,lineSpacingMultiple:1.1});
footer(s,pg()+1);

// ===== 10. NARRATIVA variações =====
s=pres.addSlide(); s.background={color:LIGHT}; eyebrow(s,"Narrativa · Variações estratégicas");
title(s,"A tese se desdobrando em ângulos.",20);
let ny=1.9; D.narrativa.forEach((t,i)=>{ s.addText(String(i+1).padStart(2,"0"),{x:0.6,y:ny,w:0.6,h:0.4,fontFace:DISPLAY,bold:true,fontSize:14,color:ORANGE,margin:0});
  s.addText(t,{x:1.25,y:ny,w:8.1,h:0.5,fontFace:BODY,fontSize:12.5,color:INK,valign:"top",margin:0,lineSpacingMultiple:1.0}); ny+=0.72;});
footer(s,pg()+1);

// ===== 11. LINGUAGEM =====
s=pres.addSlide(); s.background={color:LIGHT}; eyebrow(s,"Narrativa · Linguagem — tom, ritmo, vocabulário");
title(s,"As palavras dessa marca, e as que ela evita.",20);
s.addText("USA",{x:0.6,y:2.0,w:4,h:0.3,fontFace:BODY,bold:true,fontSize:10,color:ORANGE,charSpacing:2,margin:0});
s.addText(D.linguagem.usa.join("  ·  "),{x:0.6,y:2.35,w:4.2,h:1.6,fontFace:BODY,fontSize:13,color:INK,margin:0,lineSpacingMultiple:1.2});
s.addText("EVITA",{x:5.2,y:2.0,w:4,h:0.3,fontFace:BODY,bold:true,fontSize:10,color:GRAY,charSpacing:2,margin:0});
s.addText(D.linguagem.evita.join("  ·  "),{x:5.2,y:2.35,w:4.2,h:1.6,fontFace:BODY,fontSize:13,color:GRAY_L,margin:0,lineSpacingMultiple:1.2,italic:true});
s.addText("Tom: consultivo, direto, provocador. Frases curtas, cortes secos. Honestidade que persuade, não promessa inflada.",{x:0.6,y:4.4,w:8.8,h:0.5,fontFace:BODY,fontSize:10.5,color:INK,margin:0});
footer(s,pg()+1);

// ===== DIVISOR 03 EDITORIAS =====
divider("Editorias","03");

// ===== 12. AS 5 EDITORIAS =====
s=pres.addSlide(); s.background={color:LIGHT}; eyebrow(s,"Editorias · Os 5 eixos narrativos");
title(s,"Cinco lentes pra repetir a tese sem repetir o post.",18);
const edDefs=[["Mercado","Interpretação da realidade do território."],["Cases","Histórias reais que provam a tese."],
  ["Cultura","Comportamento e zeitgeist que ligam à dor."],["Notícias","Eventos lidos pela lente proprietária."],["Produtos","Demonstração do método próprio."]];
let ey=1.85; edDefs.forEach((e,i)=>{ const col=i%2,row=Math.floor(i/2); const x=0.6+col*4.45,y=ey+row*1.0;
  s.addText((i+1)+".",{x,y,w:0.4,h:0.3,fontFace:DISPLAY,bold:true,fontSize:14,color:ORANGE,margin:0});
  s.addText(e[0],{x:x+0.45,y,w:3.9,h:0.3,fontFace:BODY,bold:true,fontSize:12.5,color:INK,margin:0});
  s.addText(e[1],{x:x+0.45,y:y+0.3,w:3.9,h:0.55,fontFace:BODY,fontSize:9.5,color:GRAY,margin:0,lineSpacingMultiple:1.04});});
footer(s,pg()+1);

// ===== 13-15. 15 IDEIAS NARRATIVAS (pares de editoria) =====
const edKeys=Object.keys(D.editorias);
const pairs=[[edKeys[0],edKeys[1]],[edKeys[2],edKeys[3]],[edKeys[4]]];
let ideaNum=0;
pairs.forEach((pair)=>{ s=pres.addSlide(); s.background={color:LIGHT}; eyebrow(s,"Editorias · 15 ideias narrativas");
  pair.forEach((k,ci)=>{ const x=pair.length===1?0.6:(0.6+ci*4.45); const w=pair.length===1?8.8:4.1;
    s.addText(k,{x,y:1.0,w,h:0.4,fontFace:DISPLAY,bold:true,fontSize:18,color:INK,margin:0});
    sep(s,1.5,x,w);
    let iy=1.65; D.editorias[k].forEach((idea)=>{ ideaNum++;
      s.addText(String(ideaNum).padStart(2,"0"),{x,y:iy,w:0.5,h:0.3,fontFace:DISPLAY,bold:true,fontSize:12,color:ORANGE,margin:0});
      s.addText(idea,{x:x+0.5,y:iy,w:w-0.5,h:0.85,fontFace:BODY,fontSize:10,color:INK,valign:"top",margin:0,lineSpacingMultiple:1.02}); iy+=0.95;});});
  footer(s,pg()+1);});

// ===== 16. RESUMO =====
s=pres.addSlide(); s.background={color:LIGHT}; eyebrow(s,"Resumo estratégico");
title(s,"Onde o Marcos joga.",22);
s.addText(D.resumo,{x:0.6,y:2.1,w:8.4,h:1.6,fontFace:BODY,fontSize:15,color:INK,margin:0,lineSpacingMultiple:1.18});
footer(s,pg()+1);

// ===== 17. PRÓXIMOS PASSOS =====
s=pres.addSlide(); s.background={color:LIGHT}; eyebrow(s,"Próximos passos · Hipóteses a validar");
title(s,"O que confirmar antes de operar.",20);
let py=1.85; D.passos.forEach((p,i)=>{ s.addText(String(i+1).padStart(2,"0"),{x:0.6,y:py,w:0.6,h:0.35,fontFace:DISPLAY,bold:true,fontSize:14,color:ORANGE,margin:0});
  s.addText(p,{x:1.25,y:py,w:8.1,h:0.6,fontFace:BODY,fontSize:12,color:INK,valign:"top",margin:0,lineSpacingMultiple:1.03}); py+=0.78;});
footer(s,pg()+1);

// ===== 18. FECHAMENTO =====
s=pres.addSlide(); s.background={color:DARK};
s.addText([{text:"Posicionamento ",options:{color:LIGHT}},{text:"é achar a verdade",options:{color:ORANGE}},
  {text:" que já existe no cliente e dar a ela uma forma que vende.",options:{color:LIGHT}}],
  {x:0.6,y:1.9,w:8.4,h:1.9,fontFace:DISPLAY,bold:true,fontSize:30,margin:0,lineSpacingMultiple:1.02});
s.addText("POWERED BY BRANDSDECODED®",{x:0.6,y:5.15,w:6,h:0.3,fontFace:BODY,bold:true,fontSize:8,color:ORANGE,charSpacing:2,margin:0});

pres.writeFile({ fileName: OUT }).then(f => console.log("WROTE", f));
