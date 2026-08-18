#!/usr/bin/env python3
"""
Renderiza um carrossel 1080x1350 a partir de um spec JSON.

    python3 render_carrossel.py spec.json saida.html

A régua tipográfica vem da medição dos carrosséis reais da Expansion no Canva
— ver BRANDSDECODED/MAQUINA/MEDIDAS-CANVA-2026-08-11.md. Não é estimativa:
cada número saiu da geometria e da formatação que o Canva guarda, em canvas
1080x1350, portanto escala 1:1 com o CSS aqui.

Duas melhorias deliberadas sobre o original: auto-fit da headline (no Canva o
texto longo é reajustado à mão) e contraste corrigido no CTA.

Famílias de fundo
  foto     imagem sangrada a 65% sobre preto + scrim — 3 dos 4 designs reais
  escuro   chapado
  destaque cor de marca
  claro    fundo claro
  capa     primeiro slide

Tipos de slide
  capa · texto · bullets · stat · declaracao · cta
"""
import base64
import json
import sys
from pathlib import Path

W, H = 1080, 1350
MARGEM, UTIL = 108, 864
BASE = H - MARGEM            # 1242 — onde o conteúdo termina
FOTO_H, FOTO_R = 442.2, 13
FOLGA = 24                   # respiro mínimo entre um bloco e o próximo

# Os quatro arquétipos de slide interno, com os `top` lidos elemento a elemento
# no Canva. O original é posicionado à mão, não fluído — reproduzir com flexbox
# centralizado aproxima e nunca bate. Aqui cada bloco vai no seu y medido.
#
#   topo  foto abre o slide          páginas 2 e 5
#   meio  foto separa título e corpo páginas 3 e 7
#   base  foto fecha embaixo         páginas 4 e 8
#   None  sem foto                   páginas 6 e 9
GRADE = {
    "topo": {"foto": 207.9, "h1": 717.0, "corpo": 1005.8},
    "meio": {"h1": 161.0, "foto": 453.9, "corpo": 951.1},
    "base": {"h1": 230.5, "corpo": 534.9, "foto": 799.8},
    None: {"h1": 298.9, "corpo": 641.9},
}


def limites(pos):
    """Altura máxima de cada bloco: até onde o próximo começa."""
    g = GRADE[pos]
    ordem = sorted(g.items(), key=lambda kv: kv[1])
    out = {}
    for i, (nome, y) in enumerate(ordem):
        if nome == "foto":
            out[nome] = FOTO_H
            continue
        fim = ordem[i + 1][1] - FOLGA if i + 1 < len(ordem) else BASE
        out[nome] = round(fim - y, 1)
    return out


def b64_font(path):
    return base64.b64encode(Path(path).read_bytes()).decode()


# Os arquivos do @fontsource são subconjuntos por faixa de caractere. O
# `latin-ext` traz SÓ os acentuados — sem o `latin` do lado não existe glifo
# para A-Z. Duas declarações com a mesma família e o mesmo peso só convivem se
# cada uma disser a faixa que cobre; sem isso a última apaga a primeira.
FAIXAS = {
    "latin": ("U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,"
              "U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,"
              "U+2193,U+2212,U+2215,U+FEFF,U+FFFD"),
    "latin-ext": ("U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,"
                  "U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,"
                  "U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF"),
}


def faixa_do_arquivo(path):
    nome = Path(path).name
    if "-latin-ext-" in nome:
        return FAIXAS["latin-ext"]
    if "-latin-" in nome:
        return FAIXAS["latin"]
    return None


def face(family, weight, path):
    faixa = faixa_do_arquivo(path)
    rng = f"unicode-range:{faixa};" if faixa else ""
    return (
        "@font-face{font-family:'%s';font-style:normal;font-weight:%s;"
        "font-display:block;%ssrc:url(data:font/woff2;base64,%s) format('woff2');}"
        % (family, weight, rng, b64_font(path))
    )


def confere_fontes(fontes):
    """Falha alto quando um par família+peso só tem o `latin-ext`.

    Este erro é silencioso por natureza: `document.fonts.ready` resolve, o
    preview parece certo, e o PNG sai numa fonte de sistema qualquer. Melhor
    quebrar aqui do que descobrir na peça entregue."""
    ext, lat = set(), set()
    for f in fontes:
        nome = Path(f["file"]).name
        chave = (f["family"], f["weight"])
        (ext if "-latin-ext-" in nome else lat).add(chave)
    faltando = sorted(ext - lat)
    if faltando:
        itens = " · ".join(f"{fam} {w}" for fam, w in faltando)
        raise SystemExit(
            f"Faltando o arquivo `latin` de: {itens}.\n"
            "O `latin-ext` sozinho não tem A-Z — o texto sairia numa fonte de "
            "sistema sem avisar. Acrescente o .woff2 `latin` de cada um."
        )


def b64_img(path):
    p = Path(path)
    ext = p.suffix.lstrip(".").lower().replace("jpg", "jpeg")
    return f"data:image/{ext};base64," + base64.b64encode(p.read_bytes()).decode()


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def rich(s):
    """*destaque* e **forte**.

    Os dois existem porque o Canva usa os dois, e são coisas diferentes:
    *destaque* troca a cor (para a cor de marca) e **forte** mantém a cor e
    sobe o peso. Marcação por conteúdo, não por índice de palavra — que é como
    a plataforma da BrandsDecoded grava, e por isso o realce dela anda de lugar
    quando o texto muda."""
    out = esc(s)
    while "**" in out:
        out = out.replace("**", "<b>", 1).replace("**", "</b>", 1)
    while "*" in out:
        out = out.replace("*", "<em>", 1).replace("*", "</em>", 1)
    return out


def barra(spec):
    """Barra superior de metadados: @handle · nome · copyright.
    Medida: y 49,7 · x 56,1 · 15,78px bold · tracking 0. Cada campo some se
    não vier no spec."""
    campos = [spec.get("handle", ""), spec.get("marca", ""), spec.get("copyright", "")]
    return '<div class="barra">' + "".join(
        f"<span>{esc(c)}</span>" for c in campos if c
    ) + "</div>"


def fundo_foto(s):
    """Foto sangrada + scrim. É o enquadramento dominante nos designs reais:
    a imagem cobre o slide a 65% sobre preto e um degradê de baixo pra cima
    garante a leitura do texto, que fica ancorado na base."""
    if not s.get("foto_fundo"):
        return ""
    op = s.get("foto_opacidade", 0.65)
    return (f'<div class="bg-foto" style="background-image:url({b64_img(s["foto_fundo"])});'
            f'opacity:{op}"></div><div class="bg-scrim"></div>')


def slide_html(spec, s, i, total):
    tipo = s.get("tipo", "texto")
    fundo = s.get("fundo") or ("capa" if tipo == "capa" else "escuro")
    if s.get("foto_fundo") and tipo != "capa":
        fundo = "foto"
    verificado = spec.get("verificado", True)

    if tipo == "capa":
        img = s.get("foto_fundo") or s.get("imagem")
        bg = (f'<div class="bg-foto" style="background-image:url({b64_img(img)});'
              f'opacity:{s.get("foto_opacidade", 0.66)}"></div>') if img \
            else '<div class="capa-banho"></div>'
        selo = '<span class="selo">✓</span>' if verificado else ""
        inicial = esc(spec.get("marca", "?")[:1].upper())
        sub = f'<div class="capa-sub">{rich(s["sub"])}</div>' if s.get("sub") else ""
        estilo = s.get("estilo") or spec.get("capa_estilo", "impacto")
        grad = '<div class="capa-grad"></div>' if img else ""
        corpo = f"""{bg}{grad}
        <div class="capa-area">
          <div class="chip"><span class="chip-dot">{inicial}</span>
            <span class="chip-handle">{esc(spec.get('handle',''))}</span>{selo}</div>
          <div class="capa-h1 capa-{estilo} fit">{rich(s['headline'])}</div>
          {sub}
        </div>"""
        return f'<div class="slide f-capa">{corpo}{barra(spec)}</div>'

    # `foto_pos` decide o arquétipo. Sem ele o slide é o "sem foto", que é o
    # que as páginas 6 e 9 fazem.
    pos = s.get("foto_pos")
    if pos not in GRADE:
        pos = None
    g, lim = GRADE[pos], limites(pos)

    def bloco(nome, html, extra=""):
        return (f'<div class="bloco" style="top:{g[nome]}px;'
                f'max-height:{lim[nome]}px;{extra}">{html}</div>')

    partes = []

    if s.get("tag"):
        partes.append(f'<div class="bloco tag" style="top:{g["h1"] - 46}px">'
                      f'{esc(s["tag"])}</div>')

    # Cabeça do slide
    if tipo == "stat":
        cabeca = f'<div class="stat">{rich(s["numero"])}</div>'
    elif s.get("h1"):
        cls = "h1 grande" if tipo in ("declaracao", "cta") else "h1"
        cabeca = f'<div class="{cls} fit">{rich(s["h1"])}</div>'
    else:
        cabeca = ""
    if cabeca:
        partes.append(bloco("h1", cabeca))

    # Corpo do slide
    miolo = ""
    if tipo == "stat":
        miolo = f'<div class="corpo">{rich(s["label"])}</div>'
    elif tipo == "bullets":
        miolo = '<div class="bullets">' + "".join(
            f'<div class="row"><span class="seta">→</span><span>{rich(b)}</span></div>'
            for b in s["itens"]) + "</div>"
    elif tipo == "cta":
        if s.get("ponte"):
            miolo += f'<div class="corpo">{rich(s["ponte"])}</div>'
        chamada = s.get("chamada")
        if not chamada and s.get("instrucao"):
            chamada = f'{s["instrucao"]} **{s["palavra"]}**.'
        if chamada:
            miolo += f'<div class="corpo chamada">{rich(chamada)}</div>'
    for par in s.get("paragrafos", []):
        miolo += f'<div class="corpo">{rich(par)}</div>'
    if s.get("fonte"):
        miolo += f'<div class="fonte">Fonte: <b>{esc(s["fonte"])}</b></div>'
    if miolo:
        partes.append(bloco("corpo", f'<div class="pilha fit-corpo">{miolo}</div>'))

    # Foto — e quando ela ainda não existe, o espaço dela fica reservado e
    # visível, com o briefing do que entra ali. Slide não se desenha em volta
    # de uma foto que ninguém pediu.
    if pos:
        if s.get("imagem"):
            dentro = f'<img src="{b64_img(s["imagem"])}" alt="">'
            classe = "foto"
        else:
            brief = s.get("imagem_brief", "Imagem a definir")
            dentro = (f'<span class="vaga-rot">Imagem · {esc(pos)}</span>'
                      f'<span class="vaga-brief">{esc(brief)}</span>'
                      f'<span class="vaga-dim">864 × 442 · canto 13</span>')
            classe = "foto vaga"
        partes.append(f'<div class="bloco {classe}" style="top:{g["foto"]}px">{dentro}</div>')

    avanco = '<div class="avanco">→</div>' if fundo == "destaque" and i + 1 < total else ""
    return (f'<div class="slide f-{fundo}">{fundo_foto(s)}'
            f'{"".join(partes)}{barra(spec)}{avanco}</div>')


def build(spec):
    t = spec["tokens"]
    confere_fontes(spec["fontes"])
    faces = "".join(face(f["family"], f["weight"], f["file"]) for f in spec["fontes"])
    slides = "".join(slide_html(spec, s, i, len(spec["slides"]))
                     for i, s in enumerate(spec["slides"]))
    claro = t.get("claro", "#F0F0F0")
    op_barra = t.get("barra_opacidade", 0.30)

    return f"""<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<title>{esc(spec['marca'])} — carrossel</title><style>
{faces}
*{{margin:0;padding:0;box-sizing:border-box}}
:root{{--escuro:{t['dark']};--destaque:{t['accent']};--claro:{claro};--texto:{t.get('texto','#FFFFFF')};
--head:'{t['fonte_head']}',sans-serif;--body:'{t['fonte_body']}',sans-serif;
--grad:{t.get('gradiente', 'linear-gradient(180deg,#fa7e01 0%,#ff6522 50%,#fa7e01 100%)')}}}

/* O degradê é do FUNDO do slide de destaque, não da escrita. A escrita em
   destaque é `--destaque` chapado — conferido na API e na renderização real de
   sete páginas. */
body{{background:#111;display:flex;flex-direction:column;align-items:center;gap:22px;padding:22px}}
.slide{{width:{W}px;height:{H}px;position:relative;overflow:hidden;flex:none}}

/* ── fundos ───────────────────────────────────────────────────────────── */
.f-capa,.f-foto{{background:#000}}
.f-escuro{{background:var(--escuro)}}
.f-destaque{{background:var(--grad)}}
.f-claro{{background:var(--claro)}}

/* foto sangrada — a imagem a 65% sobre preto, e o scrim subindo da base.
   Medido: a peça real empilha foto + degradê e ancora o texto embaixo. */
.bg-foto{{position:absolute;inset:0;background-size:cover;background-position:center}}
.bg-scrim{{position:absolute;inset:0;background:linear-gradient(to bottom,
transparent 26%,rgba(0,0,0,.72) 62%,rgba(0,0,0,.94) 84%,#000 100%)}}

/* ── barra superior · y 49,7 · x 56,1 · 15,78px bold · tracking 0 ─────── */
.barra{{position:absolute;top:49.7px;left:56.1px;right:56.1px;display:flex;
justify-content:space-between;z-index:20;font-family:var(--body);font-size:15.8px;
font-weight:700;line-height:1.4;letter-spacing:0;text-transform:uppercase;
opacity:{op_barra}}}
.f-escuro .barra,.f-capa .barra,.f-destaque .barra,.f-foto .barra{{color:#fff}}
.f-claro .barra{{color:#000}}
.f-destaque .barra{{color:#fff}}

/* ── grade · margem lateral 108, largura útil 864 ─────────────────────── */
.bloco{{position:absolute;left:{MARGEM}px;width:{UTIL}px;overflow:hidden;z-index:2}}
.pilha{{display:flex;flex-direction:column;gap:30px}}
.f-foto .content{{position:absolute;left:{MARGEM}px;right:{MARGEM}px;bottom:{MARGEM}px;
display:flex;flex-direction:column;justify-content:flex-end;gap:32px;z-index:2}}

.tag{{font-family:var(--body);font-size:17px;font-weight:600;letter-spacing:3px;
text-transform:uppercase;overflow:visible}}
.f-escuro .tag,.f-claro .tag,.f-foto .tag{{color:var(--destaque)}}
.f-destaque .tag{{color:rgba(255,255,255,.72)}}

/* ── título · 75,7px semibold · lh 1,06 · tracking −0,056 · à esquerda ───
   Faixa medida nas peças reais: 60,5 a 83,8. O auto-fit trabalha dentro dela. */
.h1{{font-family:var(--head);font-size:75.7px;font-weight:600;line-height:1.06;
letter-spacing:-.056em}}
.h1.grande{{font-size:83.8px}}
.f-escuro .h1,.f-foto .h1{{color:var(--texto)}}
.f-destaque .h1{{color:#fff}}
.f-claro .h1{{color:#000}}
.h1 em{{font-style:normal}}
.f-escuro .h1 em,.f-claro .h1 em,.f-foto .h1 em{{color:var(--destaque)}}
.f-destaque .h1 em{{color:#fff;font-weight:700}}
.h1 b{{font-weight:700}}

/* ── corpo · 45,4px · lh 0,96 · tracking −0,033 · à esquerda ────────────
   Entrelinha abaixo de 1 é escolha de estilo, não descuido: dá densidade.
   O texto é branco chapado — a ênfase é por cor ou por peso, nunca por
   opacidade, que é como eu tinha feito antes. */
.corpo{{font-family:var(--body);font-size:45.4px;font-weight:400;line-height:.96;
letter-spacing:-.033em;text-align:left}}
.f-claro .corpo{{font-size:36.6px}}
.f-escuro .corpo,.f-foto .corpo,.f-destaque .corpo{{color:#fff}}
.f-claro .corpo{{color:#000}}
.corpo b{{font-weight:700}}
.corpo em{{font-style:normal;font-weight:400;color:var(--destaque)}}
.f-destaque .corpo em{{color:#fff;font-weight:700}}

/* Chamada do slide final: o parágrafo inteiro na cor de destaque, e a palavra
   de comando em bold dentro dele. */
.corpo.chamada{{color:var(--destaque)}}
.corpo.chamada b{{font-weight:700}}
.f-destaque .corpo.chamada{{color:#fff;font-weight:600}}

.fonte{{font-family:var(--body);font-size:21px;padding-top:20px;letter-spacing:.3px}}
.f-escuro .fonte,.f-foto .fonte{{color:rgba(255,255,255,.55);border-top:1px solid rgba(255,255,255,.20)}}
.f-destaque .fonte{{color:rgba(0,0,0,.55);border-top:1px solid rgba(0,0,0,.20)}}
.f-claro .fonte{{color:rgba(0,0,0,.55);border-top:1px solid rgba(0,0,0,.16)}}
.fonte b{{font-weight:600}}

/* caixa de imagem · 864 × 488,4 · canto 13 */
.foto{{height:{FOTO_H}px;border-radius:{FOTO_R}px;overflow:hidden}}
.foto img{{width:100%;height:100%;object-fit:cover;display:block}}

/* Vaga de imagem — o espaço fica reservado na medida certa, com o briefing do
   que entra ali. O slide já nasce desenhado em volta da foto, e trocar a vaga
   pela imagem não mexe em mais nada. */
.foto.vaga{{display:flex;flex-direction:column;align-items:center;justify-content:center;
gap:14px;text-align:center;padding:0 64px;border:2px dashed var(--destaque);
background:rgba(255,255,255,.04)}}
.f-claro .foto.vaga{{background:rgba(0,0,0,.03)}}
.f-destaque .foto.vaga{{border-color:#fff;background:rgba(255,255,255,.10)}}
.vaga-rot{{font-family:var(--body);font-size:16px;font-weight:700;letter-spacing:.18em;
text-transform:uppercase;color:var(--destaque)}}
.vaga-brief{{font-family:var(--body);font-size:31px;line-height:1.14;letter-spacing:-.02em}}
.vaga-dim{{font-family:var(--body);font-size:15px;letter-spacing:.1em;opacity:.5}}
.f-escuro .vaga-brief,.f-foto .vaga-brief{{color:#fff}}
.f-claro .vaga-brief{{color:#000}}
.f-destaque .vaga-rot,.f-destaque .vaga-brief{{color:#fff}}

.stat{{font-family:var(--head);font-size:150px;font-weight:700;line-height:.92;
letter-spacing:-.06em;color:var(--destaque)}}
.f-destaque .stat{{color:#fff}}


.bullets{{display:flex;flex-direction:column;gap:22px}}
.row{{display:flex;gap:22px;align-items:flex-start;font-family:var(--body);
font-size:40px;line-height:1.02;letter-spacing:-.033em}}
.f-escuro .row,.f-foto .row,.f-destaque .row{{color:#fff}}
.f-claro .row{{color:#000}}
.row b{{font-weight:700}}
.row em{{font-style:normal;color:var(--destaque)}}
.seta{{flex:none;font-weight:600;color:var(--destaque)}}
.f-destaque .seta{{color:#000}}

.avanco{{position:absolute;right:108px;bottom:76px;width:78px;height:78px;border-radius:50%;
background:#fff;color:#000;display:flex;align-items:center;justify-content:center;
font-family:var(--body);font-size:36px;font-weight:600;z-index:20}}

/* ── capa ─────────────────────────────────────────────────────────────── */
/* Sem foto, a capa não fica preta chapada: recebe um banho radial na cor da
   marca, vindo de baixo — mesma direção do scrim das peças com imagem. */
.capa-banho{{position:absolute;inset:0;background:
radial-gradient(66% 26% at 50% 108%,#fff8 0%,transparent 64%),
radial-gradient(112% 40% at 50% 112%,var(--destaque) 0%,transparent 68%),
radial-gradient(154% 62% at 50% 122%,var(--destaque) 0%,transparent 60%),#000}}
/* Sem foto o bloco sobe: o banho fica sendo base, e a headline não cai em
   cima da própria luz — que é onde o laranja sobre laranja se perde. */
.slide:has(.capa-banho) .capa-area{{bottom:236px}}
.capa-grad{{position:absolute;inset:0;background:linear-gradient(to bottom,
rgba(0,0,0,.30) 0%,rgba(0,0,0,.12) 24%,rgba(0,0,0,.62) 58%,rgba(0,0,0,.92) 82%,#000 100%)}}
.capa-area{{position:absolute;left:108px;right:108px;bottom:150px;z-index:10;
display:flex;flex-direction:column;align-items:center;text-align:center;gap:30px}}

/* chip de perfil · círculo 48,7 · @ 31,8px medium · tracking −0,084 */
.chip{{display:flex;align-items:center;gap:14px}}
.chip-dot{{width:48.7px;height:48.7px;border-radius:50%;background:var(--destaque);
display:flex;align-items:center;justify-content:center;font-family:var(--head);
font-size:24px;font-weight:700;color:#fff}}
.chip-handle{{font-family:var(--body);font-size:31.8px;font-weight:500;line-height:1.4;
letter-spacing:-.084em;color:#fff}}
.selo{{width:27.8px;height:27.8px;border-radius:50%;background:#1d9bf0;color:#fff;
display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700}}

/* Duas capas, e a diferença é de gênero editorial:
   impacto  111,5px bold · lh 0,92 · tracking −0,087   → topo de funil, viral
   manchete  79,6px semibold · lh 1,06 · tracking −0,056 → newsroom e meio */
.capa-h1{{font-family:var(--head);color:#fff}}
.capa-impacto{{font-size:111.5px;font-weight:700;line-height:.92;letter-spacing:-.087em}}
.capa-manchete{{font-size:79.6px;font-weight:600;line-height:1.06;letter-spacing:-.056em}}
.capa-h1 em{{font-style:normal;color:var(--destaque)}}
.capa-h1 b{{font-weight:700}}

/* legenda da capa · 21,2px · lh 1,06 · tracking −0,056 */
.capa-sub{{font-family:var(--body);font-size:21.2px;font-weight:400;line-height:1.06;
letter-spacing:-.056em;color:#fff}}
.capa-sub em{{font-style:normal;color:var(--destaque)}}
</style></head><body>
{slides}
<script>
/* Auto-fit sobre a grade. Cada bloco tem um `top` medido e uma altura máxima
   — até onde o próximo começa. O texto encolhe dentro da própria fatia, sem
   empurrar o slide: é o que mantém os nove slides alinhados entre si. */
(function () {{
  function px(el) {{ return parseFloat(getComputedStyle(el).fontSize); }}
  function estoura(b) {{ return b.scrollHeight > b.clientHeight + 1; }}
  document.querySelectorAll('.slide').forEach(function (slide) {{
    slide.querySelectorAll('.bloco').forEach(function (b) {{
      var head = b.querySelector('.fit');
      if (head) {{
        var min = 52;
        while (estoura(b) && px(head) > min) head.style.fontSize = (px(head) - 2) + 'px';
      }}
      var corpos = b.querySelectorAll('.corpo, .row');
      var guarda = 0;
      while (corpos.length && estoura(b) && guarda++ < 60) {{
        corpos.forEach(function (c) {{ if (px(c) > 28) c.style.fontSize = (px(c) - 1) + 'px'; }});
      }}
    }});
    // capa continua com a régua própria: ela é centralizada e ancorada embaixo
    var capa = slide.querySelector('.capa-area');
    if (capa) {{
      var h = capa.querySelector('.fit');
      var piso = h && h.classList.contains('capa-impacto') ? 72 : 56;
      while (h && capa.scrollHeight > capa.clientHeight + 1 && px(h) > piso)
        h.style.fontSize = (px(h) - 3) + 'px';
    }}
  }});
  window.__fitPronto = true;
}})();
</script>
</body></html>"""


if __name__ == "__main__":
    spec = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    Path(sys.argv[2]).write_text(build(spec), encoding="utf-8")
    print(f"HTML: {sys.argv[2]}  ({len(spec['slides'])} slides)")
