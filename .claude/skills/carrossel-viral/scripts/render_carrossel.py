#!/usr/bin/env python3
"""
Renderiza um carrossel 1080x1350 a partir de um spec JSON.

    python3 render_carrossel.py spec.json saida.html

O sistema visual segue o levantado da plataforma da BrandsDecoded — ver
BRANDSDECODED/MAQUINA/ESTUDO-DA-PLATAFORMA-2026-08-11.md — com duas
melhorias deliberadas sobre ela: auto-fit da headline (lá a headline longa
passa por cima do corpo sem aviso) e contraste corrigido no CTA.

Fundos: capa · claro · escuro · destaque
Tipos:  capa · texto · bullets · stat · declaracao · cta
"""
import base64
import json
import sys
from pathlib import Path

W, H = 1080, 1350


def b64_font(path):
    return base64.b64encode(Path(path).read_bytes()).decode()


def face(family, weight, path):
    return (
        "@font-face{font-family:'%s';font-style:normal;font-weight:%s;"
        "font-display:block;src:url(data:font/woff2;base64,%s) format('woff2');}"
        % (family, weight, b64_font(path))
    )


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def rich(s):
    """*destaque* e **forte**. Destaque é por palavra, marcado por conteúdo —
    na plataforma ele é gravado por índice, o que move o realce quando o
    texto muda. Divergência de propósito."""
    out = esc(s)
    while "**" in out:
        out = out.replace("**", "<b>", 1).replace("**", "</b>", 1)
    while "*" in out:
        out = out.replace("*", "<em>", 1).replace("*", "</em>", 1)
    return out


def barra(spec):
    """Barra superior de metadados: @handle · nome · copyright.
    Cada campo some se não vier no spec."""
    campos = [spec.get("handle", ""), spec.get("marca", ""), spec.get("copyright", "")]
    return '<div class="barra">' + "".join(
        f"<span>{esc(c)}</span>" for c in campos if c
    ) + "</div>"


def slide_html(spec, s, i, total):
    tipo = s.get("tipo", "texto")
    fundo = s.get("fundo") or ("capa" if tipo == "capa" else "escuro")
    verificado = spec.get("verificado", True)

    if tipo == "capa":
        bg = ""
        if s.get("imagem"):
            data = base64.b64encode(Path(s["imagem"]).read_bytes()).decode()
            ext = Path(s["imagem"]).suffix.lstrip(".").replace("jpg", "jpeg")
            bg = (f'<div class="capa-bg" style="background-image:url('
                  f'data:image/{ext};base64,{data})"></div>')
        selo = '<span class="selo">✓</span>' if verificado else ""
        inicial = esc(spec.get("marca", "?")[:1].upper())
        sub = f'<div class="capa-sub">{rich(s["sub"])}</div>' if s.get("sub") else ""
        corpo = f"""{bg}<div class="capa-grad"></div>
        <div class="capa-area">
          <div class="chip"><span class="chip-dot">{inicial}</span>
            <span class="chip-handle">{esc(spec.get('handle',''))}</span>{selo}</div>
          <div class="capa-h1 fit">{rich(s['headline'])}</div>
          {sub}
        </div>"""
        return (f'<div class="slide f-capa">{corpo}{barra(spec)}</div>')

    inner = f'<div class="tag">{esc(s["tag"])}</div>' if s.get("tag") else ""
    if s.get("h1"):
        cls = "h1 grande fit" if tipo == "declaracao" else "h1 fit"
        inner += f'<div class="{cls}">{rich(s["h1"])}</div>'

    if s.get("imagem"):
        data = base64.b64encode(Path(s["imagem"]).read_bytes()).decode()
        ext = Path(s["imagem"]).suffix.lstrip(".").replace("jpg", "jpeg")
        inner += (f'<div class="foto"><img src="data:image/{ext};base64,{data}" alt=""></div>')

    if tipo == "stat":
        inner += f'<div class="stat">{rich(s["numero"])}</div>'
        inner += f'<div class="stat-label">{rich(s["label"])}</div>'
    if tipo == "bullets":
        rows = "".join(
            f'<div class="row"><span class="seta">→</span><span>{rich(b)}</span></div>'
            for b in s["itens"])
        inner += f'<div class="bullets">{rows}</div>'
    if tipo == "cta":
        inner += f'<div class="cta-ponte">{rich(s["ponte"])}</div>'
        inner += (f'<div class="cta-box"><div class="cta-instr">{esc(s["instrucao"])}</div>'
                  f'<div class="cta-word">{esc(s["palavra"])}</div></div>')

    for p in s.get("paragrafos", []):
        inner += f'<div class="corpo">{rich(p)}</div>'
    if s.get("fonte"):
        inner += f'<div class="fonte">Fonte: <b>{esc(s["fonte"])}</b></div>'

    # Botão circular de avanço: só nos slides de destaque, como na plataforma.
    avanco = '<div class="avanco">→</div>' if fundo == "destaque" and i + 1 < total else ""

    return (f'<div class="slide f-{fundo}"><div class="content">{inner}</div>'
            f'{barra(spec)}{avanco}</div>')


def build(spec):
    t = spec["tokens"]
    faces = "".join(face(f["family"], f["weight"], f["file"]) for f in spec["fontes"])
    slides = "".join(slide_html(spec, s, i, len(spec["slides"]))
                     for i, s in enumerate(spec["slides"]))
    claro = t.get("claro", "#F0F0F0")

    return f"""<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<title>{esc(spec['marca'])} — carrossel</title><style>
{faces}
*{{margin:0;padding:0;box-sizing:border-box}}
:root{{--escuro:{t['dark']};--destaque:{t['accent']};--claro:{claro};--texto:{t.get('texto','#FFFFFF')};
--head:'{t['fonte_head']}',sans-serif;--body:'{t['fonte_body']}',sans-serif}}
body{{background:#111;display:flex;flex-direction:column;align-items:center;gap:22px;padding:22px}}
.slide{{width:{W}px;height:{H}px;position:relative;overflow:hidden;flex:none}}

/* fundos — o ritmo da plataforma: alternado destaque/escuro, claro nas pontas */
.f-capa{{background:#000}}
.f-escuro{{background:var(--escuro)}}
.f-destaque{{background:var(--destaque)}}
.f-claro{{background:var(--claro)}}

/* barra superior de metadados — some a numeração e a barra de progresso,
   que a plataforma não tem */
.barra{{position:absolute;top:0;left:0;right:0;padding:44px 60px 0;display:flex;
justify-content:space-between;z-index:20;font-family:var(--body);font-size:19px;
font-weight:500;letter-spacing:.4px}}
.f-escuro .barra,.f-capa .barra{{color:rgba(255,255,255,.55)}}
.f-destaque .barra{{color:rgba(255,255,255,.80)}}
.f-claro .barra{{color:rgba(0,0,0,.45)}}

.content{{position:absolute;top:132px;left:60px;right:60px;bottom:92px;display:flex;
flex-direction:column;justify-content:center;gap:34px;z-index:2}}

.tag{{font-family:var(--body);font-size:19px;font-weight:600;letter-spacing:3.2px;
text-transform:uppercase}}
.f-escuro .tag{{color:var(--destaque)}}
.f-destaque .tag{{color:rgba(0,0,0,.62)}}
.f-claro .tag{{color:var(--destaque)}}

/* razão 3,3x entre título e corpo · entrelinha do título abaixo de 1 */
.h1{{font-family:var(--head);font-size:112px;font-weight:800;line-height:.92;
letter-spacing:-.04em;text-transform:uppercase}}
.h1.grande{{font-size:136px;line-height:.90}}
.f-escuro .h1{{color:var(--texto)}}
.f-destaque .h1{{color:#000}}
.f-claro .h1{{color:var(--destaque)}}
.h1 em{{font-style:normal}}
.f-escuro .h1 em,.f-claro .h1 em{{color:var(--destaque)}}
.f-destaque .h1 em{{color:#fff}}

.corpo{{font-family:var(--body);font-size:41px;font-weight:400;line-height:1.17;
letter-spacing:-.8px;text-align:justify}}
.f-escuro .corpo{{color:rgba(255,255,255,.70)}}
.f-destaque .corpo{{color:#fff}}
.f-claro .corpo{{color:rgba(0,0,0,.78)}}
.corpo b{{font-weight:600}}
.f-escuro .corpo b{{color:#fff}}
.corpo em{{font-style:normal;font-weight:600;color:var(--destaque)}}
.f-destaque .corpo em{{color:#000}}

.fonte{{font-family:var(--body);font-size:21px;padding-top:20px;letter-spacing:.3px}}
.f-escuro .fonte{{color:rgba(255,255,255,.38);border-top:1px solid rgba(255,255,255,.16)}}
.f-destaque .fonte{{color:rgba(0,0,0,.55);border-top:1px solid rgba(0,0,0,.20)}}
.f-claro .fonte{{color:rgba(0,0,0,.45);border-top:1px solid rgba(0,0,0,.14)}}
.fonte b{{font-weight:600}}

.foto{{width:100%;height:420px;border-radius:22px;overflow:hidden;flex:none}}
.foto img{{width:100%;height:100%;object-fit:cover;display:block}}

.stat{{font-family:var(--head);font-size:184px;font-weight:800;line-height:.86;
letter-spacing:-.05em;color:var(--destaque)}}
.f-destaque .stat{{color:#000}}
.stat-label{{font-family:var(--body);font-size:34px;line-height:1.26;margin-top:-8px}}
.f-escuro .stat-label{{color:rgba(255,255,255,.58)}}
.f-claro .stat-label{{color:rgba(0,0,0,.58)}}

.bullets{{display:flex;flex-direction:column;gap:28px}}
.row{{display:flex;gap:22px;align-items:flex-start;font-family:var(--body);
font-size:37px;line-height:1.24}}
.f-escuro .row{{color:rgba(255,255,255,.74)}}
.f-destaque .row{{color:#fff}}
.f-claro .row{{color:rgba(0,0,0,.78)}}
.row b{{font-weight:600}}
.f-escuro .row b{{color:#fff}}
.seta{{flex:none;font-weight:600;color:var(--destaque)}}
.f-destaque .seta{{color:#000}}

/* CTA — a plataforma põe corpo laranja sobre cinza claro (~2:1).
   Aqui o corpo vai em texto legível e o laranja fica na palavra-chave. */
.cta-ponte{{font-family:var(--body);font-size:38px;line-height:1.32;letter-spacing:-.6px}}
.f-claro .cta-ponte{{color:rgba(0,0,0,.72)}}
.f-escuro .cta-ponte{{color:rgba(255,255,255,.72)}}
.cta-ponte b{{font-weight:600}}
.f-claro .cta-ponte b{{color:#000}}
.cta-box{{border-radius:22px;padding:40px 46px}}
.f-claro .cta-box{{background:#fff;border:3px solid var(--destaque)}}
.f-escuro .cta-box{{background:rgba(255,255,255,.05);border:3px solid var(--destaque)}}
.cta-instr{{font-family:var(--body);font-size:25px;margin-bottom:10px}}
.f-claro .cta-instr{{color:rgba(0,0,0,.55)}}
.f-escuro .cta-instr{{color:rgba(255,255,255,.55)}}
.cta-word{{font-family:var(--head);font-size:92px;font-weight:800;line-height:1;
letter-spacing:-.04em;color:var(--destaque)}}

/* botão circular de avanço — só nos slides de destaque */
.avanco{{position:absolute;right:60px;bottom:60px;width:78px;height:78px;border-radius:50%;
background:#fff;color:#000;display:flex;align-items:center;justify-content:center;
font-family:var(--body);font-size:36px;font-weight:600;z-index:20}}

/* capa */
.capa-bg{{position:absolute;inset:0;background-size:cover;background-position:center}}
.capa-grad{{position:absolute;inset:0;background:linear-gradient(to bottom,
rgba(0,0,0,.28) 0%,rgba(0,0,0,.10) 26%,rgba(0,0,0,.66) 58%,rgba(0,0,0,.94) 80%,rgba(0,0,0,1) 100%)}}
.capa-area{{position:absolute;left:60px;right:60px;bottom:120px;z-index:10;
display:flex;flex-direction:column;align-items:center;text-align:center;gap:30px}}
.chip{{display:flex;align-items:center;gap:13px;background:rgba(0,0,0,.45);
border:1.5px solid rgba(255,255,255,.16);border-radius:60px;padding:11px 26px 11px 12px}}
.chip-dot{{width:40px;height:40px;border-radius:50%;background:var(--destaque);
display:flex;align-items:center;justify-content:center;font-family:var(--head);
font-size:20px;font-weight:800;color:#fff}}
.chip-handle{{font-family:var(--body);font-size:23px;font-weight:500;color:#fff}}
.selo{{width:24px;height:24px;border-radius:50%;background:#1d9bf0;color:#fff;
display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700}}
.capa-h1{{font-family:var(--head);font-size:132px;font-weight:800;line-height:.94;
letter-spacing:-.04em;text-transform:uppercase;color:#fff}}
.capa-h1 em{{color:var(--destaque);font-style:normal}}
.capa-sub{{font-family:var(--body);font-size:31px;font-weight:400;line-height:1.26;
color:#E4E4E4;text-transform:uppercase;letter-spacing:.4px}}
</style></head><body>
{slides}
<script>
/* Auto-fit — a plataforma não tem: lá a headline longa passa por cima do corpo
   sem aviso. Aqui ela encolhe até caber, com piso, e o corpo cede depois. */
(function () {{
  function px(el) {{ return parseFloat(getComputedStyle(el).fontSize); }}
  function estoura(box) {{ return box.scrollHeight > box.clientHeight + 1; }}
  document.querySelectorAll('.slide').forEach(function (slide) {{
    var box = slide.querySelector('.content') || slide.querySelector('.capa-area');
    if (!box) return;
    var head = box.querySelector('.fit');
    if (head) {{
      var min = head.classList.contains('capa-h1') ? 62 : 54;
      while (estoura(box) && px(head) > min) head.style.fontSize = (px(head) - 3) + 'px';
    }}
    var corpos = box.querySelectorAll('.corpo, .row, .cta-ponte, .stat-label');
    var guarda = 0;
    while (estoura(box) && guarda++ < 40) {{
      corpos.forEach(function (c) {{ if (px(c) > 24) c.style.fontSize = (px(c) - 1) + 'px'; }});
      if (!corpos.length) break;
    }}
    slide.dataset.ajustado = head ? Math.round(px(head)) : '';
  }});
  window.__fitPronto = true;
}})();
</script>
</body></html>"""


if __name__ == "__main__":
    spec = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    Path(sys.argv[2]).write_text(build(spec), encoding="utf-8")
    print(f"HTML: {sys.argv[2]}  ({len(spec['slides'])} slides)")
