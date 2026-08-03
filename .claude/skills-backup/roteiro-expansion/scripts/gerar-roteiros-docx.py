#!/usr/bin/env python3
"""
Gera documentos de roteiro no PADRÃO EXPANSION (.docx).

O padrão visual é o do arquivo de referência
`.claude/reference/PADRAO-ROTEIROS-ECOSSISTEMA.docx` — laranja #E67E22,
títulos de roteiro com barra lateral e fundo #FFF0E0, caixa do GANCHO em
#FFF8F0 e caixa do CTA em #FFF0E0.

O esqueleto do .docx (styles.xml, theme, settings, fontTable, numbering) é
reaproveitado do próprio arquivo de referência, então a fidelidade é exata:
só o `word/document.xml` é reescrito.

Uso:
    python3 gerar-roteiros-docx.py entrada.json saida.docx

Formato do JSON de entrada:
{
  "titulo":     "Clínica Albanos — Roteiros Virais",
  "subtitulo":  "@clinicaalbanos  •  Club Albanos  •  Famílias e Pacientes",
  "framework":  "Framework: TACO(H)  |  8 Roteiros  |  Foco: ...",
  "roteiros": [
    {
      "titulo": "ROTEIRO 1 — “Cada Criança Tem o Seu Ritmo”",
      "pilar":  "🎯 TACO(H)  |  Pilar: TÉCNICO — DESENVOLVIMENTO",
      "data":   "DATA SUGERIDA: 05/08 (Dia Nacional da Saúde)",   # opcional
      "blocos": [
        {"rotulo": "GANCHO",    "tempo": "0:00 – 0:05", "texto": "...", "destaque": "gancho"},
        {"rotulo": "CONTEXTO",  "tempo": "0:05 – 0:15", "texto": "..."},
        {"rotulo": "ARGUMENTO", "tempo": "0:15 – 0:40", "texto": "..."},
        {"rotulo": "CTA",       "tempo": "0:40 – 0:50", "texto": "...", "destaque": "cta"}
      ],
      "hashtags": "#ClinicaAlbanos #TEA ..."
    }
  ],
  "secoes": [                                   # opcional (ex.: TRÁFEGO PAGO)
    {"cabecalho": "TRÁFEGO PAGO — MODELO P/TRÁFEGO (2 criativos)", "roteiros": [...]}
  ]
}
"""
import json
import re
import shutil
import sys
import zipfile
from html import escape
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
REFERENCIA = RAIZ / ".claude" / "reference" / "PADRAO-ROTEIROS-ECOSSISTEMA.docx"

LARANJA, ESCURO, CINZA, CINZA_CLARO = "e67e22", "1a1a1a", "666666", "999999"
FUNDO_FORTE, FUNDO_SUAVE = "fff0e0", "fff8f0"

BORDA = (
    '<w:pBdr>'
    '<w:top w:color="auto" w:space="7" w:sz="0" w:val="none"/>'
    '<w:left w:color="{cor}" w:space="7" w:sz="{sz}" w:val="single"/>'
    '<w:bottom w:color="auto" w:space="7" w:sz="0" w:val="none"/>'
    '<w:right w:color="auto" w:space="7" w:sz="0" w:val="none"/>'
    '<w:between w:color="auto" w:space="7" w:sz="0" w:val="none"/>'
    '</w:pBdr>'
)


def _rpr(sz, cor=None, negrito=False, final=False):
    p = ""
    if negrito:
        p += '<w:b w:val="1"/><w:bCs w:val="1"/>'
    if cor:
        p += f'<w:color w:val="{cor}"/>'
    p += f'<w:sz w:val="{sz}"/><w:szCs w:val="{sz}"/>'
    if final:
        p += '<w:rtl w:val="0"/>'
    return f"<w:rPr>{p}</w:rPr>"


def _run(texto, sz, cor=None, negrito=False):
    return (
        "<w:r>" + _rpr(sz, cor, negrito, final=True)
        + f'<w:t xml:space="preserve">{escape(texto)}</w:t></w:r>'
    )


def _par(runs, *, estilo=None, borda=None, fundo=None,
         antes=200, depois=200, sz=20, cor=None, negrito=False):
    ppr = "<w:pPr>"
    if estilo:
        ppr += f'<w:pStyle w:val="{estilo}"/><w:keepNext w:val="0"/><w:keepLines w:val="0"/>'
    if borda:
        ppr += BORDA.format(cor=LARANJA, sz=borda)
    if fundo:
        ppr += f'<w:shd w:fill="{fundo}" w:val="clear"/>'
    esp = "<w:spacing"
    if depois is not None:
        esp += f' w:after="{depois}"'
    if antes is not None:
        esp += f' w:before="{antes}"'
    ppr += esp + ' w:lineRule="auto"/>' + _rpr(sz, cor, negrito) + "</w:pPr>"
    return "<w:p>" + ppr + "".join(runs) + "</w:p>"


# ── elementos do padrão ───────────────────────────────────────────────────────
def titulo_doc(t):
    return _par([_run(t, 44, ESCURO, True)], estilo="Heading1",
                antes=480, depois=None, sz=44, cor=ESCURO, negrito=True)


def subtitulo(t):
    return _par([_run(t, 20, LARANJA, True)], sz=20, cor=LARANJA, negrito=True)


def framework(t):
    return _par([_run(t, 18, CINZA)], antes=180, depois=180, sz=18, cor=CINZA)


def cabecalho_roteiro(t):
    return _par([_run(t, 28, ESCURO, True)], estilo="Heading2", borda=27,
                fundo=FUNDO_FORTE, antes=None, depois=80, sz=28,
                cor=ESCURO, negrito=True)


def cabecalho_secao(t):
    return _par([_run(t, 26, LARANJA, True)], borda=27, fundo=FUNDO_FORTE,
                sz=26, cor=LARANJA, negrito=True)


def linha_pilar(t):
    return _par([_run(t, 20, LARANJA)], sz=20, cor=LARANJA)


def linha_data(t):
    return _par([_run(t, 20, LARANJA, True)], sz=20, cor=LARANJA, negrito=True)


def rotulo(nome, tempo=None):
    runs = [_run(nome, 20, LARANJA, True)]
    if tempo:
        runs += [_run(" ", 20), _run(f"({tempo})", 18, CINZA_CLARO)]
    return _par(runs, sz=18, cor=CINZA_CLARO)


def corpo(t, destaque=None):
    fundo = {"gancho": FUNDO_SUAVE, "cta": FUNDO_FORTE}.get(destaque)
    if fundo:
        return _par([_run(t, 20)], borda=21, fundo=fundo,
                    antes=60, depois=60, sz=20)
    return _par([_run(t, 20)], sz=20)


def hashtags(t):
    return _par([_run(t, 18, CINZA_CLARO)], antes=180, depois=180,
                sz=18, cor=CINZA_CLARO)


def vazio():
    # a referência usa parágrafo vazio sem rPr — replicado à risca
    return '<w:p><w:pPr><w:spacing w:lineRule="auto"/></w:pPr></w:p>'


def montar_roteiro(r):
    partes = [cabecalho_roteiro(r["titulo"])]
    if r.get("data"):
        partes.append(linha_data(r["data"]))
    if r.get("pilar"):
        partes.append(linha_pilar(r["pilar"]))
    for b in r["blocos"]:
        partes.append(rotulo(b["rotulo"], b.get("tempo")))
        partes.append(corpo(b["texto"], b.get("destaque")))
    if r.get("hashtags"):
        partes.append(hashtags(r["hashtags"]))
    partes.append(vazio())
    return partes


def gerar(dados, saida, referencia=REFERENCIA):
    if not Path(referencia).exists():
        raise SystemExit(f"arquivo de referência não encontrado: {referencia}")

    with zipfile.ZipFile(referencia) as z:
        original = z.read("word/document.xml").decode("utf-8")
        itens = {n: z.read(n) for n in z.namelist()}

    abertura = original[: original.index("<w:body>") + len("<w:body>")]
    sectpr = re.search(r"<w:sectPr.*?</w:sectPr>", original, re.S).group(0)

    corpo_xml = [titulo_doc(dados["titulo"])]
    if dados.get("subtitulo"):
        corpo_xml.append(subtitulo(dados["subtitulo"]))
    corpo_xml.append(vazio())
    if dados.get("framework"):
        corpo_xml.append(framework(dados["framework"]))
    for r in dados.get("roteiros", []):
        corpo_xml += montar_roteiro(r)
    for s in dados.get("secoes", []):
        corpo_xml.append(cabecalho_secao(s["cabecalho"]))
        for r in s.get("roteiros", []):
            corpo_xml += montar_roteiro(r)

    doc = abertura + "".join(corpo_xml) + sectpr + "</w:body></w:document>"

    for tag in ("w:p", "w:r", "w:pPr", "w:rPr"):
        abre = len(re.findall(r"<" + tag + r"\b(?![^>]*/>)", doc))
        fecha = len(re.findall(r"</" + tag + r">", doc))
        if abre != fecha:
            raise SystemExit(f"XML desbalanceado em <{tag}>: {abre} × {fecha}")

    itens["word/document.xml"] = doc.encode("utf-8")
    with zipfile.ZipFile(saida, "w", zipfile.ZIP_DEFLATED) as z:
        for nome, blob in itens.items():
            z.writestr(nome, blob)
    return saida


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    entrada, saida = sys.argv[1], sys.argv[2]
    dados = json.loads(Path(entrada).read_text(encoding="utf-8"))
    gerar(dados, saida)
    n = len(dados.get("roteiros", [])) + sum(
        len(s.get("roteiros", [])) for s in dados.get("secoes", [])
    )
    print(f"{saida} — {n} roteiros no padrão Expansion")
