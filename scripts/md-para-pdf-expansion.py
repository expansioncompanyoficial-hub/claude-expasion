#!/usr/bin/env python3
"""
Converte um documento Markdown em PDF na identidade visual da Expansion.

Paleta da casa (a mesma do `roteiro-expansion`):
laranja #E67E22, escuro #1A1A1A, cinza #666666, faixas #FFF0E0 e #FFF8F0.

Uso:
    python3 scripts/md-para-pdf-expansion.py ENTRADA.md SAIDA.pdf \
        [--titulo "TÍTULO"] [--subtitulo "Subtítulo"] [--tag "Rótulo da capa"]

O primeiro `# ` e o primeiro `## ` do arquivo viram título e subtítulo da capa
quando as opções não são passadas, e são removidos do corpo.
"""
import argparse
import os
import pathlib
import re
import subprocess
import sys
import tempfile

import markdown

LARANJA = "#e67e22"
LARANJA_ESC = "#c8651a"
ESCURO = "#1a1a1a"
CINZA = "#666666"
CINZA_CLARO = "#8c8c8c"
FUNDO_FORTE = "#fff0e0"
FUNDO_SUAVE = "#fff8f0"
BORDA = "#e8e2dc"

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
    for raiz in ("/opt/pw-browsers",):
        for p in pathlib.Path(raiz).rglob("chrome"):
            if p.is_file() and os.access(p, os.X_OK):
                return str(p)
    sys.exit("Não encontrei um binário do Chromium para gerar o PDF.")


def separar_capa(texto):
    """Tira o título e o subtítulo do topo e devolve (titulo, subtitulo, corpo)."""
    linhas = texto.split("\n")
    titulo = subtitulo = None
    corte = 0
    for i, l in enumerate(linhas[:12]):
        if titulo is None and l.startswith("# "):
            titulo = l[2:].strip()
            corte = i + 1
        elif titulo is not None and subtitulo is None and l.startswith("## "):
            subtitulo = l[3:].strip()
            corte = i + 1
            break
    return titulo, subtitulo, "\n".join(linhas[corte:])


def numerar_secoes(html):
    """Troca '1. TÍTULO' dos <h2> por um selo redondo laranja com o número."""
    def sub(m):
        attrs, conteudo = m.group(1), m.group(2)
        n = re.match(r"^\s*(\d+)\.\s+(.*)$", conteudo, re.S)
        if not n:
            return m.group(0)
        return (
            f'<h2{attrs}><span class="selo">{n.group(1)}</span>'
            f'<span class="h2txt">{n.group(2)}</span></h2>'
        )
    return re.sub(r"<h2([^>]*)>(.*?)</h2>", sub, html, flags=re.S)


def separar_listas(md):
    """Garante linha em branco antes de um bloco de lista, senao o nl2br
    faz a lista virar paragrafo com tracos literais."""
    saida, anterior = [], ""
    for linha in md.split("\n"):
        eh_item = re.match(r"^\s{0,3}([-*+]|\d+\.)\s+\S", linha)
        anterior_eh_item = re.match(r"^\s{0,3}([-*+]|\d+\.)\s+\S", anterior)
        if eh_item and anterior.strip() and not anterior_eh_item:
            saida.append("")
        saida.append(linha)
        anterior = linha
    return "\n".join(saida)


def montar_html(titulo, subtitulo, tag, corpo_md, rodape, confid):
    corpo_md = separar_listas(corpo_md)
    corpo = markdown.markdown(
        corpo_md, extensions=["tables", "sane_lists", "attr_list", "nl2br"]
    )
    corpo = numerar_secoes(corpo)

    return f"""<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><title>{titulo}</title>
<style>
  @page {{ size: A4; margin: 17mm 15mm 20mm 15mm; }}
  @page :first {{ margin: 0; }}

  * {{ box-sizing: border-box; }}
  body {{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 9.7pt; line-height: 1.62; color: {ESCURO};
    margin: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }}

  /* ---------- CAPA ---------- */
  .capa {{
    height: 297mm; width: 210mm; page-break-after: always;
    background: {ESCURO}; color: #fff; position: relative;
    padding: 34mm 20mm 22mm 20mm; overflow: hidden;
  }}
  .capa::after {{
    content: ""; position: absolute; right: -60mm; top: -70mm;
    width: 190mm; height: 190mm; border-radius: 50%;
    background: {LARANJA}; opacity: .17;
  }}
  .capa::before {{
    content: ""; position: absolute; left: 0; top: 0;
    width: 7mm; height: 297mm; background: {LARANJA};
  }}
  .marca {{
    position: relative; z-index: 2; font-size: 12pt; font-weight: bold;
    letter-spacing: .42em; text-transform: uppercase; color: {LARANJA};
  }}
  .marca small {{
    display: block; margin-top: 3mm; font-size: 7.4pt; font-weight: normal;
    letter-spacing: .3em; color: #b9b2ab;
  }}
  .capa .tag {{
    position: relative; z-index: 2; display: inline-block; margin-top: 44mm;
    background: {LARANJA}; color: #fff; font-size: 8.2pt; font-weight: bold;
    letter-spacing: .2em; text-transform: uppercase; padding: 2.6mm 6mm;
  }}
  .capa h1 {{
    position: relative; z-index: 2; font-size: 37pt; line-height: 1.08;
    margin: 9mm 0 0 0; font-weight: bold; letter-spacing: -.5pt;
  }}
  .capa .sub {{
    position: relative; z-index: 2; font-size: 13pt; color: #d8d2cc;
    margin-top: 6mm; max-width: 135mm; line-height: 1.5;
  }}
  .capa .regua {{
    position: relative; z-index: 2; width: 34mm; height: 1.6mm;
    background: {LARANJA}; margin: 11mm 0 0 0;
  }}
  .capa .pe {{
    position: absolute; z-index: 2; left: 20mm; bottom: 20mm; right: 20mm;
    font-size: 8.6pt; color: #b9b2ab; border-top: .3mm solid #3a3733;
    padding-top: 4mm; display: flex; justify-content: space-between;
  }}

  /* ---------- CORPO ---------- */
  body > h1 {{
    font-size: 17pt; margin: 12mm 0 4mm 0; color: {ESCURO};
    padding: 0 0 3mm 5mm; border-left: 2mm solid {LARANJA};
    border-bottom: .3mm solid {BORDA}; page-break-after: avoid;
  }}
  h2 {{
    font-size: 14.5pt; margin: 11mm 0 4mm 0; color: {ESCURO};
    padding-bottom: 2.4mm; border-bottom: .55mm solid {LARANJA};
    page-break-after: avoid; display: flex; align-items: center; gap: 3.6mm;
  }}
  .selo {{
    background: {LARANJA}; color: #fff; width: 8.4mm; height: 8.4mm;
    min-width: 8.4mm; border-radius: 50%; display: inline-flex;
    align-items: center; justify-content: center;
    font-size: 10.5pt; font-weight: bold;
  }}
  .h2txt {{ flex: 1; }}
  h3 {{
    font-size: 11.2pt; margin: 7mm 0 2.6mm 0; color: {LARANJA_ESC};
    page-break-after: avoid;
  }}
  h4 {{ font-size: 10pt; margin: 5mm 0 2mm 0; color: {ESCURO}; }}
  p {{ margin: 0 0 3.1mm 0; }}
  strong {{ color: {ESCURO}; }}
  ul, ol {{ margin: 0 0 3.4mm 0; padding-left: 5.4mm; }}
  li {{ margin-bottom: 1.5mm; }}
  li::marker {{ color: {LARANJA}; }}
  hr {{ border: 0; border-top: .3mm solid {BORDA}; margin: 8mm 0; }}
  a {{ color: {LARANJA_ESC}; text-decoration: none; }}

  table {{
    width: 100%; border-collapse: collapse; margin: 3.4mm 0 5.4mm 0;
    font-size: 8.9pt; page-break-inside: avoid;
  }}
  th {{
    background: {ESCURO}; color: #fff; text-align: left;
    padding: 2.5mm 3mm; font-size: 8.4pt; letter-spacing: .04em;
  }}
  td {{ padding: 2.4mm 3mm; border-bottom: .25mm solid {BORDA}; vertical-align: top; }}
  td:first-child {{ white-space: nowrap; }}
  td:first-child:not(:only-child) {{ padding-right: 4.5mm; }}
  tbody tr:nth-child(even) td {{ background: {FUNDO_SUAVE}; }}

  blockquote {{
    background: {FUNDO_FORTE}; border-left: 1.5mm solid {LARANJA};
    margin: 4mm 0; padding: 3.6mm 5mm; page-break-inside: avoid;
  }}
  blockquote p {{ margin: 0 0 2mm 0; }}
  blockquote p:last-child {{ margin-bottom: 0; }}

  code {{
    background: {FUNDO_FORTE}; padding: .4mm 1.4mm;
    font-family: "Courier New", monospace; font-size: 8.8pt; color: {LARANJA_ESC};
  }}
  h2, h3, table, blockquote {{ page-break-inside: avoid; }}
</style></head>
<body>

<div class="capa">
  <div class="marca">EXPANSION<small>ASSESSORIA DE MARKETING</small></div>
  <div class="tag">{tag}</div>
  <h1>{titulo}</h1>
  <div class="regua"></div>
  <div class="sub">{subtitulo or ""}</div>
  <div class="pe"><span>{rodape}</span><span>{confid}</span></div>
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
    a = ap.parse_args()

    texto = pathlib.Path(a.entrada).read_text(encoding="utf-8")
    t, s, corpo = separar_capa(texto)
    titulo = a.titulo or t or pathlib.Path(a.entrada).stem
    subtitulo = a.subtitulo or s or ""

    # Tira a linha de metadados em negrito que costuma seguir o subtítulo,
    # já que ela reaparece no rodapé da capa.
    corpo = re.sub(r"^\s*\*\*[^\n]*\*\*\s*\n+---\s*\n", "", corpo, count=1)

    html = montar_html(titulo, subtitulo, a.tag, corpo, a.rodape, a.confid)

    with tempfile.TemporaryDirectory() as tmp:
        f = os.path.join(tmp, "doc.html")
        pathlib.Path(f).write_text(html, encoding="utf-8")
        saida = os.path.abspath(a.saida)
        subprocess.run(
            [
                achar_chrome(), "--headless", "--disable-gpu", "--no-sandbox",
                "--no-pdf-header-footer", f"--print-to-pdf={saida}", f"file://{f}",
            ],
            check=True, capture_output=True, timeout=180,
        )
    print(f"PDF gerado: {a.saida}")


if __name__ == "__main__":
    main()
