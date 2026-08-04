#!/usr/bin/env python3
"""
Gera deck de apresentação 16:9 em PDF, na filosofia `design/FILOSOFIA-ALFAIATARIA.md`.

Os slides são declarados na lista SLIDES do arquivo de conteúdo passado como
argumento (um .py que define SLIDES e META), para o layout ficar separado do texto.

Tipos de slide
    capa      escuro, título grande
    frase     escuro, uma afirmação só — é o pico do ritmo
    dado      escuro, um número enorme + legenda
    secao     claro, numeral + título + corpo livre em HTML
    fases     claro, a linha do tempo das seis fases
    fim       escuro, fechamento

Uso
    python3 scripts/gerar-deck-expansion.py conteudo.py SAIDA.pdf
"""
import base64
import importlib.util
import os
import pathlib
import subprocess
import sys
import tempfile

RAIZ = pathlib.Path(__file__).resolve().parent.parent
FONTES = RAIZ / "design" / "fontes"

TINTA = "#16110d"
PAPEL = "#ffffff"
CREME = "#f7f4ef"
LARANJA = "#e67e22"
LARANJA_ESC = "#b45f14"
GRAFITE = "#5c534b"
CINZA = "#8f857b"
FILETE = "#e3ddd5"
SUAVE = "#fdf6ee"

CHROME = [
    "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell",
    "/usr/bin/chromium",
]


def achar_chrome():
    for c in CHROME:
        if os.path.exists(c):
            return c
    for p in pathlib.Path("/opt/pw-browsers").rglob("chrome"):
        if p.is_file() and os.access(p, os.X_OK):
            return str(p)
    sys.exit("Chromium não encontrado.")


def face(nome, arq, peso="400", estilo="normal"):
    d = base64.b64encode((FONTES / arq).read_bytes()).decode()
    return (f"@font-face{{font-family:'{nome}';font-weight:{peso};font-style:{estilo};"
            f"src:url(data:font/ttf;base64,{d}) format('truetype');}}")


def fontes():
    return "".join([
        face("Gloock", "Gloock-Regular.ttf"),
        face("Instrument", "InstrumentSans-Regular.ttf"),
        face("Instrument", "InstrumentSans-Bold.ttf", "700"),
        face("Geist", "GeistMono-Regular.ttf"),
        face("Geist", "GeistMono-Bold.ttf", "700"),
    ])


CSS = f"""
@page {{ size: 254mm 142.875mm; margin: 0; }}
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
html, body {{ background: {PAPEL}; -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
body {{ font-family: 'Instrument', sans-serif; color: {TINTA}; }}

.s {{
  width: 254mm; height: 142.875mm; page-break-after: always; position: relative;
  overflow: hidden; padding: 14mm 20mm 22mm 26mm;
}}
.s:last-child {{ page-break-after: auto; }}
.escuro {{ background: {TINTA}; color: {CREME}; }}
.claro  {{ background: {PAPEL}; }}

/* alinhavo — motivo recorrente na lombada esquerda */
.linha {{
  position: absolute; left: 13mm; top: 0; bottom: 0; width: .3mm;
  background: repeating-linear-gradient(to bottom, {LARANJA} 0 4mm, transparent 4mm 7.5mm);
}}
.claro .linha {{ opacity: .55; }}
.escuro .linha {{ opacity: .85; }}

/* cabeçalho e rodapé de slide */
.eyebrow {{
  font-family: 'Geist', monospace; font-size: 6.6pt; letter-spacing: .3em;
  text-transform: uppercase; color: {LARANJA};
}}
.folio {{
  position: absolute; right: 20mm; bottom: 10mm;
  font-family: 'Geist', monospace; font-size: 6.6pt; letter-spacing: .18em; color: {CINZA};
}}
.marca {{
  position: absolute; left: 26mm; bottom: 10mm;
  font-family: 'Geist', monospace; font-size: 6.6pt; letter-spacing: .28em;
  text-transform: uppercase; color: {CINZA};
}}

/* ---- capa ---- */
.capa .topo {{
  display: flex; justify-content: space-between; align-items: baseline;
  font-family: 'Geist', monospace; font-size: 6.8pt; letter-spacing: .28em;
  text-transform: uppercase; color: {CINZA};
  border-bottom: .25mm solid rgba(247,244,239,.16); padding-bottom: 3.5mm;
}}
.capa .topo b {{ color: {CREME}; font-weight: 400; letter-spacing: .36em; }}
.capa h1 {{
  font-family: 'Gloock', serif; font-weight: 400; font-size: 54pt;
  line-height: .94; letter-spacing: -1pt; margin-top: 26mm; color: {CREME};
}}
.capa .fio {{
  width: 30mm; height: .9mm; background: {LARANJA}; margin: 9mm 0 5.5mm 0;
}}
.capa .sub {{ font-size: 11.5pt; color: #cbc2b8; max-width: 130mm; line-height: 1.5; }}

/* ---- frase ---- */
.frase .txt {{
  font-family: 'Gloock', serif; font-size: 33pt; line-height: 1.16;
  letter-spacing: -.3pt; max-width: 185mm; margin-top: 14mm; color: {CREME};
}}
.frase .txt b {{ color: {LARANJA}; font-weight: 400; }}
.frase .nota {{
  margin-top: 11mm; font-size: 10pt; color: #b3aaa0; max-width: 150mm; line-height: 1.6;
}}

/* ---- dado ---- */
.dado .num {{
  font-family: 'Gloock', serif; font-size: 96pt; line-height: 1;
  color: {LARANJA}; margin-top: 12mm; letter-spacing: -2pt;
}}
.dado .leg {{
  font-size: 13pt; color: {CREME}; margin-top: 7mm; max-width: 150mm; line-height: 1.5;
}}
.dado .nota {{ margin-top: 6mm; font-size: 9.5pt; color: #a79e94; max-width: 150mm; }}

/* ---- seção ---- */
.secao .num {{
  font-family: 'Geist', monospace; font-size: 7.4pt; font-weight: 700;
  letter-spacing: .24em; color: {LARANJA}; margin-bottom: 2.5mm;
}}
.secao h2 {{
  font-family: 'Gloock', serif; font-weight: 400; font-size: 25pt; line-height: 1.1;
  letter-spacing: .1pt; padding-top: 3.4mm; border-top: .38mm solid {TINTA};
}}
.secao .corpo {{ margin-top: 7mm; font-size: 9.6pt; line-height: 1.6; }}
.secao .corpo p {{ margin-bottom: 3mm; max-width: 178mm; }}
.secao .corpo strong {{ font-weight: 700; }}

.cols {{ display: flex; gap: 14mm; margin-top: 7mm; }}
.col {{ flex: 1; }}
.col .rot {{
  font-family: 'Geist', monospace; font-size: 6.8pt; font-weight: 700;
  letter-spacing: .2em; text-transform: uppercase; color: {LARANJA_ESC};
  padding-bottom: 2mm; border-bottom: .3mm solid {FILETE}; margin-bottom: 3.5mm;
}}
.col p {{ font-size: 9.4pt; line-height: 1.6; margin-bottom: 2.4mm; }}

table {{ width: 100%; border-collapse: collapse; font-size: 8.5pt; margin-top: 5mm; line-height: 1.45; }}
thead tr {{ border-top: .38mm solid {TINTA}; border-bottom: .22mm solid {TINTA}; }}
th {{
  font-family: 'Geist', monospace; font-weight: 700; font-size: 6.4pt;
  letter-spacing: .18em; text-transform: uppercase; color: {GRAFITE};
  text-align: left; padding: 2mm 4mm 1.8mm 0;
}}
td {{ padding: 2.1mm 4mm 2.1mm 0; border-bottom: .2mm solid {FILETE}; vertical-align: top; }}
td:first-child {{ white-space: nowrap; }}
td:first-child strong {{ font-family: 'Geist', monospace; font-size: 8.4pt; }}
tbody tr:last-child td {{ border-bottom: .3mm solid {TINTA}; }}
.destaque td {{ background: {SUAVE}; }}

.caixa {{
  background: {SUAVE}; border-left: .8mm solid {LARANJA};
  padding: 3.4mm 6mm; margin-top: 5mm; font-size: 9.2pt; line-height: 1.55;
}}

/* ---- linha do tempo das fases ---- */
.fases {{ display: flex; margin-top: 10mm; border-top: .38mm solid {TINTA}; }}
.fase {{ flex: 1; padding: 5mm 4mm 0 0; position: relative; }}
.fase::before {{
  content: ""; position: absolute; left: 0; top: -.9mm;
  width: 5mm; height: 1.5mm; background: {LARANJA};
}}
.fase .n {{
  font-family: 'Geist', monospace; font-size: 7pt; font-weight: 700;
  letter-spacing: .2em; color: {LARANJA}; margin-bottom: 2.5mm;
}}
.fase .t {{ font-family: 'Gloock', serif; font-size: 13pt; line-height: 1.15; margin-bottom: 2.5mm; }}
.fase .d {{
  font-family: 'Geist', monospace; font-size: 7.4pt; color: {GRAFITE};
  letter-spacing: .04em; margin-bottom: 3mm;
}}
.fase .x {{ font-size: 8.6pt; line-height: 1.5; color: {GRAFITE}; }}

/* ---- fim ---- */
.fim h2 {{
  font-family: 'Gloock', serif; font-size: 30pt; line-height: 1.12;
  margin-top: 16mm; color: {CREME};
}}
.fim ol {{ margin-top: 10mm; list-style: none; max-width: 165mm; }}
.fim li {{
  font-size: 11pt; padding: 3.4mm 0; color: #d8d0c7;
  border-bottom: .2mm solid rgba(247,244,239,.14);
}}
.fim li b {{ font-family: 'Geist', monospace; font-size: 8pt; color: {LARANJA};
  letter-spacing: .2em; margin-right: 5mm; }}
"""


def render(s, i, total, meta):
    t = s["tipo"]
    linha = '<div class="linha"></div>'
    folio = f'<div class="folio">{i:02d} / {total:02d}</div>'
    marca = f'<div class="marca">{meta["marca"]}</div>'

    if t == "capa":
        return f"""<div class="s escuro capa">{linha}
<div class="topo"><span><b>EXPANSION</b> &nbsp;×&nbsp; CIÉS BRAND</span><span>{meta['data']}</span></div>
<h1>{s['titulo']}</h1><div class="fio"></div><div class="sub">{s['sub']}</div></div>"""

    if t == "frase":
        nota = f'<div class="nota">{s["nota"]}</div>' if s.get("nota") else ""
        return f"""<div class="s escuro frase">{linha}
<div class="eyebrow">{s['rotulo']}</div><div class="txt">{s['texto']}</div>{nota}{marca}{folio}</div>"""

    if t == "dado":
        nota = f'<div class="nota">{s["nota"]}</div>' if s.get("nota") else ""
        return f"""<div class="s escuro dado">{linha}
<div class="eyebrow">{s['rotulo']}</div><div class="num">{s['numero']}</div>
<div class="leg">{s['legenda']}</div>{nota}{marca}{folio}</div>"""

    if t == "fases":
        blocos = "".join(
            f'<div class="fase"><div class="n">{f["n"]}</div><div class="t">{f["t"]}</div>'
            f'<div class="d">{f["d"]}</div><div class="x">{f["x"]}</div></div>'
            for f in s["itens"])
        return f"""<div class="s claro secao">{linha}
<div class="num">{s['num']}</div><h2>{s['titulo']}</h2>
<div class="fases">{blocos}</div>{marca}{folio}</div>"""

    if t == "fim":
        itens = "".join(f"<li><b>{n:02d}</b>{x}</li>" for n, x in enumerate(s["itens"], 1))
        return f"""<div class="s escuro fim">{linha}
<div class="eyebrow">{s['rotulo']}</div><h2>{s['titulo']}</h2><ol>{itens}</ol>{marca}{folio}</div>"""

    return f"""<div class="s claro secao">{linha}
<div class="num">{s['num']}</div><h2>{s['titulo']}</h2>
<div class="corpo">{s['corpo']}</div>{marca}{folio}</div>"""


def main():
    if len(sys.argv) < 3:
        sys.exit("uso: gerar-deck-expansion.py conteudo.py SAIDA.pdf")
    spec = importlib.util.spec_from_file_location("conteudo", sys.argv[1])
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)

    total = len(mod.SLIDES)
    corpo = "".join(render(s, i, total, mod.META) for i, s in enumerate(mod.SLIDES, 1))
    html = (f"<!doctype html><html lang='pt-BR'><head><meta charset='utf-8'>"
            f"<title>{mod.META['titulo']}</title><style>{fontes()}{CSS}</style></head>"
            f"<body>{corpo}</body></html>")

    with tempfile.TemporaryDirectory() as tmp:
        f = os.path.join(tmp, "deck.html")
        pathlib.Path(f).write_text(html, encoding="utf-8")
        subprocess.run(
            [achar_chrome(), "--headless", "--disable-gpu", "--no-sandbox",
             "--no-pdf-header-footer", f"--print-to-pdf={os.path.abspath(sys.argv[2])}",
             f"file://{f}"], check=True, capture_output=True, timeout=180)
    print(f"Deck gerado: {sys.argv[2]} — {total} slides")


if __name__ == "__main__":
    main()
