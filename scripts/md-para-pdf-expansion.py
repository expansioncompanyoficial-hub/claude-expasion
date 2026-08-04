#!/usr/bin/env python3
"""
Converte Markdown em PDF na identidade da Expansion, sob a filosofia
`design/FILOSOFIA-ALFAIATARIA.md`: o documento se comporta como um molde de
costura — filete fino, peça numerada, pique de margem, muito ar.

Tipografia
    Gloock          serifa de alto contraste — a voz (títulos)
    Instrument Sans grotesco neutro — a informação (corpo)
    Geist Mono      monoespaçado — o registro (etiquetas, números, fólios)

Paleta
    tinta #16110d · papel #faf8f4 · laranja da casa #e67e22

Uso
    python3 scripts/md-para-pdf-expansion.py ENTRADA.md SAIDA.pdf \
        --titulo "TÍTULO" --subtitulo "..." --tag "..." \
        --rodape "..." --confid "..." [--peca "01"]
"""
import argparse
import base64
import os
import pathlib
import re
import subprocess
import sys
import tempfile

import markdown

RAIZ = pathlib.Path(__file__).resolve().parent.parent
FONTES = RAIZ / "design" / "fontes"

TINTA = "#16110d"
PAPEL = "#ffffff"
PAPEL_CAPA = "#f7f4ef"   # off-white quente, so na capa escura
LARANJA = "#e67e22"
LARANJA_ESC = "#b45f14"
GRAFITE = "#5c534b"
CINZA = "#8f857b"
FILETE = "#e3ddd5"
TINTA_SUAVE = "#fdf6ee"

CHROME_CANDIDATOS = [
    "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell",
    "/usr/bin/chromium",
    "/usr/bin/google-chrome",
]


def achar_chrome():
    for c in CHROME_CANDIDATOS:
        if os.path.exists(c):
            return c
    for p in pathlib.Path("/opt/pw-browsers").rglob("chrome"):
        if p.is_file() and os.access(p, os.X_OK):
            return str(p)
    sys.exit("Não encontrei um binário do Chromium para gerar o PDF.")


def face(nome, arquivo, peso="400", estilo="normal"):
    dados = base64.b64encode((FONTES / arquivo).read_bytes()).decode()
    return (
        f"@font-face{{font-family:'{nome}';font-weight:{peso};font-style:{estilo};"
        f"src:url(data:font/ttf;base64,{dados}) format('truetype');}}"
    )


def fontes_embutidas():
    return "".join([
        face("Gloock", "Gloock-Regular.ttf"),
        face("Instrument", "InstrumentSans-Regular.ttf"),
        face("Instrument", "InstrumentSans-Bold.ttf", "700"),
        face("Instrument", "InstrumentSans-Italic.ttf", "400", "italic"),
        face("Geist", "GeistMono-Regular.ttf"),
        face("Geist", "GeistMono-Bold.ttf", "700"),
    ])


def separar_capa(texto):
    linhas = texto.split("\n")
    titulo = subtitulo = None
    corte = 0
    for i, l in enumerate(linhas[:12]):
        if titulo is None and l.startswith("# "):
            titulo, corte = l[2:].strip(), i + 1
        elif titulo is not None and subtitulo is None and l.startswith("## "):
            subtitulo, corte = l[3:].strip(), i + 1
            break
    return titulo, subtitulo, "\n".join(linhas[corte:])


def separar_listas(md):
    """Linha em branco antes de bloco de lista — sem isso o nl2br transforma
    a lista em parágrafo com traços literais."""
    padrao = r"^\s{0,3}([-*+]|\d+\.)\s+\S"
    saida, anterior = [], ""
    for linha in md.split("\n"):
        if re.match(padrao, linha) and anterior.strip() and not re.match(padrao, anterior):
            saida.append("")
        saida.append(linha)
        anterior = linha
    return "\n".join(saida)


def marcar_secoes(html):
    """Numeral solto na margem + filete, para <h1> e <h2> que comecem por 'N.'."""
    def sub(m):
        tag, attrs, conteudo = m.group(1), m.group(2), m.group(3)
        n = re.match(r"^\s*(\d+[A-Za-z-]*)\.\s+(.*)$", conteudo, re.S)
        if not n:
            return (f"<{tag}{attrs} class='sec sem-num'>"
                    f"<span class='ttl'>{conteudo}</span></{tag}>")
        marca = n.group(1)
        if marca.isdigit():
            marca = marca.zfill(2)
        return (
            f"<{tag}{attrs} class='sec'>"
            f"<span class='num'>{marca}</span>"
            f"<span class='ttl'>{n.group(2)}</span></{tag}>"
        )
    return re.sub(r"<(h1|h2)([^>]*)>(.*?)</\1>", sub, html, flags=re.S)


def montar_html(titulo, subtitulo, tag, corpo_md, rodape, confid, peca):
    corpo = markdown.markdown(
        separar_listas(corpo_md),
        extensions=["tables", "sane_lists", "attr_list", "nl2br"],
    )
    corpo = marcar_secoes(corpo)
    corpo = re.sub(r"<hr\s*/?>\s*(?=<h[12] class='sec)", "", corpo)
    piques = "<i></i>" * 26

    return f"""<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><title>{titulo}</title><style>
{fontes_embutidas()}

@page {{ size: A4; margin: 21mm 18mm 19mm 30mm; }}
@page :first {{ margin: 0; }}

* {{ box-sizing: border-box; }}
html {{ background: {PAPEL}; -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
body {{
  font-family: 'Instrument', sans-serif; font-size: 9.1pt; line-height: 1.72;
  color: {TINTA}; background: transparent; margin: 0;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
  font-feature-settings: "kern" 1, "liga" 1;
}}

/* ================= CAPA ================= */
.capa {{
  width: 210mm; height: 297mm; page-break-after: always; position: relative;
  background: {TINTA}; color: {PAPEL_CAPA}; padding: 26mm 22mm 22mm 30mm;
  overflow: hidden;
}}
.capa .alinhavo {{
  position: absolute; left: 18mm; top: 0; bottom: 0; width: .35mm;
  background: repeating-linear-gradient(to bottom,
    {LARANJA} 0 5mm, transparent 5mm 9mm);
  opacity: .85;
}}
.capa .piques {{ position: absolute; left: 10.6mm; top: 30mm;
  height: 218mm; overflow: hidden; }}
.capa .piques i {{
  display: block; width: 4.4mm; height: .3mm; background: {PAPEL_CAPA};
  opacity: .24; margin-bottom: 8.6mm;
}}
.capa .piques i:nth-child(4n+1) {{ width: 7.2mm; opacity: .48; }}

.capa .topo {{
  display: flex; justify-content: space-between; align-items: baseline;
  font-family: 'Geist', monospace; font-size: 7.2pt; letter-spacing: .26em;
  text-transform: uppercase; color: {CINZA};
  border-bottom: .25mm solid rgba(247,244,239,.18); padding-bottom: 4mm;
}}
.capa .topo b {{ color: {PAPEL_CAPA}; font-weight: 400; letter-spacing: .34em; }}

.capa .bloco {{ margin-top: 60mm; }}
.capa .etiqueta {{
  font-family: 'Geist', monospace; font-size: 7pt; letter-spacing: .3em;
  text-transform: uppercase; color: {LARANJA}; margin-bottom: 9mm;
}}
.capa h1 {{
  font-family: 'Gloock', serif; font-weight: 400;
  font-size: 60pt; line-height: .95; letter-spacing: -1.2pt;
  margin: 0; color: {PAPEL_CAPA};
}}
.capa .fio {{
  width: 100%; height: .28mm; background: rgba(247,244,239,.2);
  margin: 13mm 0 6mm 0; position: relative;
}}
.capa .fio::before {{
  content: ""; position: absolute; left: 0; top: -.3mm;
  width: 26mm; height: .9mm; background: {LARANJA};
}}
.capa .sub {{
  font-size: 11.4pt; line-height: 1.56; color: #cbc2b8; max-width: 116mm;
}}
.capa .pe {{
  position: absolute; left: 30mm; right: 22mm; bottom: 22mm;
  display: flex; justify-content: space-between; align-items: flex-end;
  font-family: 'Geist', monospace; font-size: 7.2pt; letter-spacing: .16em;
  color: {CINZA}; border-top: .25mm solid rgba(247,244,239,.18); padding-top: 5mm;
}}
.capa .pe .peca {{ font-size: 21pt; letter-spacing: 0; color: {LARANJA}; line-height: 1; }}

/* ================= SEÇÕES ================= */
h1.sec, h2.sec {{
  margin: 15mm 0 6mm 0; page-break-after: avoid;
  padding-top: 3.8mm; border-top: .38mm solid {TINTA};
}}
.sec .num {{
  display: block; font-family: 'Geist', monospace; font-size: 8pt;
  font-weight: 700; color: {LARANJA}; letter-spacing: .22em;
  margin-bottom: 2.6mm;
}}
.sec .ttl {{
  font-family: 'Gloock', serif; font-weight: 400; letter-spacing: .18pt;
  font-size: 19pt; line-height: 1.18; display: block; color: {TINTA};
}}
h2.sec .ttl {{ font-size: 16.5pt; }}
.sec.sem-num {{ border-top-color: {FILETE}; }}

h3 {{
  font-family: 'Geist', monospace; font-size: 7.7pt; font-weight: 700;
  letter-spacing: .2em; text-transform: uppercase; color: {LARANJA_ESC};
  margin: 9mm 0 3mm 0; page-break-after: avoid;
}}
h4 {{
  font-size: 9.4pt; font-weight: 700; margin: 5.4mm 0 1.6mm 0; color: {TINTA};
}}

p {{ margin: 0 0 3.4mm 0; orphans: 2; widows: 2; }}
ul, ol {{ margin: 0 0 3.8mm 0; padding-left: 5mm; }}
li {{ margin-bottom: 1.7mm; padding-left: .6mm; }}
li::marker {{ color: {LARANJA}; font-size: .82em; }}
a {{ color: {LARANJA_ESC}; text-decoration: none; }}

hr {{
  border: 0; height: .25mm; background: {FILETE};
  margin: 10mm 0; position: relative;
}}
hr::after {{
  content: ""; position: absolute; left: 0; top: -.15mm;
  width: 9mm; height: .55mm; background: {LARANJA}; opacity: .75;
}}

/* ============ TABELAS — só hairline, nenhum bloco pesado ============ */
table {{
  width: 100%; border-collapse: collapse; margin: 4mm 0 6.5mm 0;
  font-size: 8.15pt; line-height: 1.5; page-break-inside: avoid;
}}
thead tr {{ border-top: .38mm solid {TINTA}; border-bottom: .22mm solid {TINTA}; }}
th {{
  font-family: 'Geist', monospace; font-weight: 700; font-size: 6.7pt;
  letter-spacing: .18em; text-transform: uppercase; color: {GRAFITE};
  text-align: left; padding: 2.4mm 3.4mm 2.2mm 0; background: transparent;
}}
td {{
  padding: 2.5mm 3.4mm 2.5mm 0; border-bottom: .2mm solid {FILETE};
  vertical-align: top;
}}
td:first-child {{ white-space: nowrap; padding-right: 5mm; }}
th:last-child, td:last-child {{ padding-right: 0; }}
tbody tr:last-child td {{ border-bottom: .3mm solid {TINTA}; }}
td:first-child strong {{
  font-family: 'Geist', monospace; font-size: 7.5pt; letter-spacing: .02em;
}}

/* ================= DESTAQUE ================= */
blockquote {{
  margin: 5mm 0; padding: 4.4mm 6mm 4.4mm 6.4mm; font-size: 8.9pt;
  background: {TINTA_SUAVE}; border-left: .8mm solid {LARANJA};
  page-break-inside: avoid;
}}
blockquote p {{ margin: 0 0 2.2mm 0; }}
blockquote p:last-child {{ margin-bottom: 0; }}

code {{
  font-family: 'Geist', monospace; font-size: 8pt;
  background: {TINTA_SUAVE}; color: {LARANJA_ESC}; padding: .3mm 1.3mm;
}}

h1, h2, h3, h4, table, blockquote {{ page-break-inside: avoid; }}
</style></head>
<body>

<div class="capa">
  <div class="alinhavo"></div>
  <div class="piques">{piques}</div>
  <div class="topo"><span><b>EXPANSION</b> &nbsp;ASSESSORIA DE MARKETING</span><span>{confid}</span></div>
  <div class="bloco">
    <div class="etiqueta">{tag}</div>
    <h1>{titulo}</h1>
    <div class="fio"></div>
    <div class="sub">{subtitulo or ""}</div>
  </div>
  <div class="pe"><span>{rodape}</span><span class="peca">{peca}</span></div>
</div>

{corpo}

</body></html>"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("entrada")
    ap.add_argument("saida")
    ap.add_argument("--titulo")
    ap.add_argument("--subtitulo")
    ap.add_argument("--tag", default="Estratégia")
    ap.add_argument("--rodape", default="Expansion Assessoria")
    ap.add_argument("--confid", default="")
    ap.add_argument("--peca", default="", help="numeral da peça, no pé da capa")
    a = ap.parse_args()

    texto = pathlib.Path(a.entrada).read_text(encoding="utf-8")
    t, s, corpo = separar_capa(texto)
    titulo = a.titulo or t or pathlib.Path(a.entrada).stem
    subtitulo = a.subtitulo or s or ""
    corpo = re.sub(r"^\s*\*\*[^\n]*\*\*\s*\n+---\s*\n", "", corpo, count=1)

    html = montar_html(titulo, subtitulo, a.tag, corpo, a.rodape, a.confid, a.peca)

    with tempfile.TemporaryDirectory() as tmp:
        f = os.path.join(tmp, "doc.html")
        pathlib.Path(f).write_text(html, encoding="utf-8")
        subprocess.run(
            [achar_chrome(), "--headless", "--disable-gpu", "--no-sandbox",
             "--no-pdf-header-footer", f"--print-to-pdf={os.path.abspath(a.saida)}",
             f"file://{f}"],
            check=True, capture_output=True, timeout=180,
        )
    print(f"PDF gerado: {a.saida}")


if __name__ == "__main__":
    main()
