#!/usr/bin/env python3
"""
Gera roteiros no PADRÃO EXPANSION como HTML — para subir no Drive e virar
**Google Docs nativo** (o conector converte text/html → documento do Google,
preservando cor, fundo, borda e tamanho).

Mesma paleta e anatomia do `gerar-roteiros-docx.py`; muda só o formato de
saída. Use este para o Drive; use o .docx quando o cliente pedir Word.

Uso:
    python3 gerar-roteiros-html.py entrada.json saida.html

O JSON de entrada é o mesmo do gerador de .docx.
"""
import json
import sys
from html import escape
from pathlib import Path

LARANJA, ESCURO, CINZA, CINZA_CLARO = "#e67e22", "#1a1a1a", "#666666", "#999999"
FUNDO_FORTE, FUNDO_SUAVE = "#fff0e0", "#fff8f0"

E_TITULO = f"font-size:22pt;font-weight:700;color:{ESCURO};margin:24pt 0 0 0;"
E_SUB = f"font-size:10pt;font-weight:700;color:{LARANJA};margin:10pt 0;"
E_FRAMEWORK = f"font-size:9pt;color:{CINZA};margin:9pt 0;"
E_ROTEIRO = (
    f"font-size:14pt;font-weight:700;color:{ESCURO};background-color:{FUNDO_FORTE};"
    f"border-left:3pt solid {LARANJA};padding:6pt 0 6pt 7pt;margin:18pt 0 4pt 0;"
)
E_SECAO = (
    f"font-size:13pt;font-weight:700;color:{LARANJA};background-color:{FUNDO_FORTE};"
    f"border-left:3pt solid {LARANJA};padding:6pt 0 6pt 7pt;margin:22pt 0 10pt 0;"
)
E_DATA = f"font-size:10pt;font-weight:700;color:{LARANJA};margin:10pt 0;"
E_PILAR = f"font-size:10pt;color:{LARANJA};margin:10pt 0;"
E_ROTULO = "margin:10pt 0 3pt 0;"
E_ROTULO_NOME = f"font-size:10pt;font-weight:700;color:{LARANJA};"
E_ROTULO_TEMPO = f"font-size:9pt;color:{CINZA_CLARO};"
E_CORPO = "font-size:10pt;margin:3pt 0 10pt 0;"
E_HASH = f"font-size:9pt;color:{CINZA_CLARO};margin:9pt 0 0 0;"


def _caixa(fundo):
    return (
        f"font-size:10pt;background-color:{fundo};border-left:2pt solid {LARANJA};"
        "padding:6pt 0 6pt 7pt;margin:3pt 0 10pt 0;"
    )


CAIXA = {"gancho": _caixa(FUNDO_SUAVE), "cta": _caixa(FUNDO_FORTE)}


def _p(texto, estilo):
    return f'<p style="{estilo}">{escape(texto)}</p>'


def _roteiro(r):
    partes = [f'<h2 style="{E_ROTEIRO}">{escape(r["titulo"])}</h2>']
    if r.get("data"):
        partes.append(_p(r["data"], E_DATA))
    if r.get("pilar"):
        partes.append(_p(r["pilar"], E_PILAR))
    for b in r["blocos"]:
        rotulo = f'<span style="{E_ROTULO_NOME}">{escape(b["rotulo"])}</span>'
        if b.get("tempo"):
            rotulo += f' <span style="{E_ROTULO_TEMPO}">({escape(b["tempo"])})</span>'
        partes.append(f'<p style="{E_ROTULO}">{rotulo}</p>')
        partes.append(_p(b["texto"], CAIXA.get(b.get("destaque"), E_CORPO)))
    if r.get("hashtags"):
        partes.append(_p(r["hashtags"], E_HASH))
    return partes


def gerar(dados, saida):
    corpo = [f'<h1 style="{E_TITULO}">{escape(dados["titulo"])}</h1>']
    if dados.get("subtitulo"):
        corpo.append(_p(dados["subtitulo"], E_SUB))
    if dados.get("framework"):
        corpo.append(_p(dados["framework"], E_FRAMEWORK))
    for r in dados.get("roteiros", []):
        corpo += _roteiro(r)
    for s in dados.get("secoes", []):
        corpo.append(f'<h2 style="{E_SECAO}">{escape(s["cabecalho"])}</h2>')
        for r in s.get("roteiros", []):
            corpo += _roteiro(r)

    html = (
        '<!DOCTYPE html><html><head><meta charset="utf-8">'
        f"<title>{escape(dados['titulo'])}</title>"
        '<style>body{font-family:Arial,sans-serif;font-size:10pt;}</style>'
        "</head><body>" + "".join(corpo) + "</body></html>"
    )
    Path(saida).write_text(html, encoding="utf-8")
    return saida


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    dados = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    gerar(dados, sys.argv[2])
    n = len(dados.get("roteiros", [])) + sum(
        len(s.get("roteiros", [])) for s in dados.get("secoes", [])
    )
    print(f"{sys.argv[2]} — {n} roteiros (HTML p/ Google Docs)")
