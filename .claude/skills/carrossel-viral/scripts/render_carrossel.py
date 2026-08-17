#!/usr/bin/env python3
"""
Renderiza um carrossel 1080x1350 a partir de um spec JSON.

    python3 render_carrossel.py spec.json saida.html

O spec traz os tokens da marca e a lista de slides. As fontes entram
embutidas em base64 — nunca <link> do Google Fonts, porque o Playwright
headless não carrega webfont externa de forma confiável e o PNG sai
com fallback.

Tipos de slide: capa · texto · bullets · stat · destaque · cta
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
    return (s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))


def rich(s):
    """Marcação leve: *accent* e **forte**. Escapa o resto."""
    out = esc(s)
    while "**" in out:
        out = out.replace("**", "<b>", 1).replace("**", "</b>", 1)
    while "*" in out:
        out = out.replace("*", "<em>", 1).replace("*", "</em>", 1)
    return out


def chrome(spec, i, total):
    """Barra de marca no topo e progresso no rodapé — iguais em todo slide."""
    pct = round((i + 1) / total * 100, 2)
    return f"""
    <div class="accent-bar"></div>
    <div class="brand-bar">
      <span>{esc(spec['marca'])}</span><span>{esc(spec['handle'])}</span>
    </div>
    <div class="prog">
      <div class="prog-track"><div class="prog-fill" style="width:{pct}%"></div></div>
      <span class="prog-num">{i + 1}/{total}</span>
    </div>"""


def slide_html(spec, s, i, total):
    kind = s.get("tipo", "texto")
    body = ""

    if kind == "capa":
        bg = ""
        if s.get("imagem"):
            data = base64.b64encode(Path(s["imagem"]).read_bytes()).decode()
            ext = Path(s["imagem"]).suffix.lstrip(".").replace("jpg", "jpeg")
            bg = f'<div class="capa-bg" style="background-image:url(data:image/{ext};base64,{data})"></div><div class="capa-grad"></div>'
        body = f"""{bg}
        <div class="capa-area">
          <div class="capa-badge"><span class="badge-dot">P</span><span class="badge-handle">{esc(spec['handle'])}</span></div>
          <div class="capa-h1">{rich(s['headline'])}</div>
          {f'<div class="capa-sub">{rich(s["sub"])}</div>' if s.get("sub") else ""}
        </div>"""
        return f'<div class="slide slide-capa">{bg and "" or ""}{body}{chrome(spec, i, total)}</div>'

    inner = f'<div class="tag">{esc(s["tag"])}</div>' if s.get("tag") else ""
    if s.get("h1"):
        inner += f'<div class="h1">{rich(s["h1"])}</div>'

    if kind == "stat":
        inner += f'<div class="stat">{rich(s["numero"])}</div>'
        inner += f'<div class="stat-label">{rich(s["label"])}</div>'
    if kind == "bullets":
        rows = "".join(f'<div class="row"><span class="arrow">→</span><span>{rich(b)}</span></div>' for b in s["itens"])
        inner += f'<div class="bullets">{rows}</div>'
    if kind == "destaque":
        inner += f'<div class="destaque">{rich(s["texto"])}</div>'
    if kind == "cta":
        inner += f'<div class="cta-ponte">{rich(s["ponte"])}</div>'
        inner += f'<div class="cta-box"><div class="cta-instr">{esc(s["instrucao"])}</div><div class="cta-word">{esc(s["palavra"])}</div></div>'

    for p in s.get("paragrafos", []):
        inner += f'<div class="body">{rich(p)}</div>'
    if s.get("fonte"):
        inner += f'<div class="fonte">Fonte: <b>{esc(s["fonte"])}</b></div>'

    cls = "slide-accent" if kind == "destaque" else "slide-dark"
    mark = '<div class="mark"></div>' if spec.get("halo", True) else ""
    return f'<div class="slide {cls}">{mark}<div class="content">{inner}</div>{chrome(spec, i, total)}</div>'


def build(spec):
    t = spec["tokens"]
    faces = "".join(face(f["family"], f["weight"], f["file"]) for f in spec["fontes"])
    slides = "".join(slide_html(spec, s, i, len(spec["slides"])) for i, s in enumerate(spec["slides"]))

    return f"""<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<title>{esc(spec['marca'])} — carrossel</title><style>
{faces}
*{{margin:0;padding:0;box-sizing:border-box}}
:root{{--dark:{t['dark']};--accent:{t['accent']};--gray:{t['gray']};
--head:'{t['fonte_head']}',sans-serif;--body:'{t['fonte_body']}',sans-serif}}
body{{background:#0b0b0b;display:flex;flex-direction:column;align-items:center;gap:22px;padding:22px}}
.slide{{width:{W}px;height:{H}px;position:relative;overflow:hidden;background:var(--dark);flex:none}}
.slide-accent{{background:linear-gradient(158deg,#8f2a0c 0%,{t['accent']} 52%,#f46a35 100%)}}
.slide-capa{{background:#000}}
.capa-bg{{position:absolute;inset:0;background-size:cover;background-position:center}}
.capa-grad{{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,.30) 0%,rgba(0,0,0,.10) 26%,rgba(0,0,0,.62) 56%,rgba(0,0,0,.93) 78%,rgba(0,0,0,.99) 100%)}}
.accent-bar{{position:absolute;top:0;left:0;right:0;height:7px;z-index:30;background:var(--accent)}}
.slide-accent .accent-bar{{background:rgba(255,255,255,.22)}}
.brand-bar{{position:absolute;top:7px;left:0;right:0;padding:34px 56px 0;display:flex;justify-content:space-between;
z-index:20;font-family:var(--body);font-size:15px;font-weight:600;letter-spacing:2.4px;text-transform:uppercase;color:rgba(255,255,255,.42)}}
.prog{{position:absolute;bottom:0;left:0;right:0;padding:0 56px 34px;z-index:20;display:flex;align-items:center;gap:16px;font-family:var(--body)}}
.prog-track{{flex:1;height:3px;border-radius:2px;background:rgba(255,255,255,.12);overflow:hidden}}
.prog-fill{{height:100%;background:var(--accent)}}
.slide-accent .prog-fill{{background:#fff}}
.prog-num{{font-size:15px;font-weight:600;color:rgba(255,255,255,.30);font-variant-numeric:tabular-nums}}
.content{{position:absolute;top:120px;left:56px;right:56px;bottom:96px;display:flex;flex-direction:column;justify-content:flex-end;gap:26px}}
.tag{{font-family:var(--body);font-size:15px;font-weight:600;letter-spacing:3.4px;text-transform:uppercase;color:var(--accent)}}
.slide-accent .tag{{color:rgba(255,255,255,.72)}}
.h1{{font-family:var(--head);font-size:74px;font-weight:800;line-height:1.02;letter-spacing:-1.6px;color:#fff}}
.h1 em{{color:var(--accent);font-style:normal}}
.slide-accent .h1 em{{color:#fff}}
.body{{font-family:var(--body);font-size:35px;font-weight:400;line-height:1.5;color:rgba(255,255,255,.66)}}
.body b{{color:#fff;font-weight:600}}
.body em{{color:var(--accent);font-style:normal;font-weight:600}}
.slide-accent .body{{color:rgba(255,255,255,.86)}}
.slide-accent .body em{{color:#fff}}
.fonte{{font-family:var(--body);font-size:20px;font-weight:400;color:rgba(255,255,255,.34);
border-top:1px solid rgba(255,255,255,.14);padding-top:18px;letter-spacing:.4px}}
.fonte b{{color:rgba(255,255,255,.60);font-weight:600}}
.stat{{font-family:var(--head);font-size:172px;font-weight:900;line-height:.9;letter-spacing:-6px;color:var(--accent)}}
.stat-label{{font-family:var(--body);font-size:31px;font-weight:400;line-height:1.4;color:rgba(255,255,255,.55);margin-top:-6px}}
.bullets{{display:flex;flex-direction:column;gap:26px}}
.row{{display:flex;gap:20px;align-items:flex-start;font-family:var(--body);font-size:33px;line-height:1.38;color:rgba(255,255,255,.72)}}
.row b{{color:#fff;font-weight:600}}
.arrow{{color:var(--accent);flex:none;font-weight:600}}
.slide-accent .row{{color:rgba(255,255,255,.88)}}
.slide-accent .arrow{{color:#fff}}
.destaque{{font-family:var(--head);font-size:60px;font-weight:800;line-height:1.1;letter-spacing:-1.2px;color:#fff}}
.destaque{{color:rgba(255,255,255,.80)}}
.destaque em{{color:#fff;font-style:normal}}
.mark{{position:absolute;inset:0;pointer-events:none;z-index:0;
background:radial-gradient(58% 42% at 76% 24%, rgba(225,68,20,.20) 0%, rgba(225,68,20,.07) 42%, rgba(225,68,20,0) 72%)}}
.slide-accent .mark{{background:radial-gradient(60% 44% at 74% 22%, rgba(255,255,255,.14) 0%, rgba(255,255,255,0) 70%)}}
.content{{z-index:2}}
.capa-area{{position:absolute;left:0;right:0;bottom:132px;padding:0 56px;z-index:10}}
.capa-badge{{display:flex;align-items:center;gap:14px;background:rgba(0,0,0,.42);border:1.5px solid rgba(255,255,255,.14);
border-radius:60px;padding:11px 26px 11px 12px;width:fit-content;margin-bottom:30px}}
.badge-dot{{width:38px;height:38px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;
font-family:var(--head);font-size:19px;font-weight:900;color:#fff}}
.badge-handle{{font-family:var(--body);font-size:22px;font-weight:600;color:#fff}}
.capa-h1{{font-family:var(--head);font-size:{t.get('capa_size', 92)}px;font-weight:900;line-height:.97;letter-spacing:-2.6px;text-transform:uppercase;color:#fff}}
.capa-h1 em{{color:var(--accent);font-style:normal}}
.cta-ponte{{font-family:var(--body);font-size:34px;font-weight:400;line-height:1.48;color:rgba(255,255,255,.62)}}
.cta-ponte b{{color:#fff;font-weight:600}}
.cta-box{{border:2px solid rgba(225,68,20,.42);border-radius:20px;padding:38px 44px;background:rgba(225,68,20,.07)}}
.cta-instr{{font-family:var(--body);font-size:23px;font-weight:400;color:rgba(255,255,255,.52);margin-bottom:10px}}
.cta-word{{font-family:var(--head);font-size:86px;font-weight:900;line-height:1;letter-spacing:-2px;color:var(--accent)}}
.capa-sub{{font-family:var(--body);font-size:30px;font-weight:400;line-height:1.42;color:rgba(255,255,255,.68);margin-top:26px;max-width:88%}}
</style></head><body>
{slides}
</body></html>"""


if __name__ == "__main__":
    spec = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    Path(sys.argv[2]).write_text(build(spec), encoding="utf-8")
    print(f"HTML: {sys.argv[2]}  ({len(spec['slides'])} slides)")
