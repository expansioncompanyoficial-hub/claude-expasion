#!/usr/bin/env python3
"""
Converte roteiros em markdown (formato do acervo) para o JSON que o
`gerar-roteiros-docx.py` consome.

Reconhece:
    # GUIA N — Nome (@handle) · complemento     → um documento por guia
    *linha de brief em itálico*                 → vira o subtítulo
    ## ROTEIRO N — "Título"                     → cabeçalho do roteiro
    🎯 TACO(H) | Pilar: ...                     → linha do pilar
    **DATA SUGERIDA: ...**                      → linha de data
    **GANCHO** (0:00 – 0:05)                    → rótulo + tempo
    *[direção de cena]*                         → anexado ao texto do bloco
    \\#Hash1 \\#Hash2                            → hashtags

Uso:
    python3 md-para-roteiros-json.py entrada.md saida-prefixo
"""
import json
import re
import sys
import unicodedata
from pathlib import Path

RE_GUIA = re.compile(r"^#\s+GUIA[^—]*—\s*(.+)$")
RE_ROTEIRO = re.compile(r"^##\s+(ROTEIRO\s+.+)$")
RE_PILAR = re.compile(r"^[🎯\W]*TACO\(H\)\s*\|\s*Pilar:.*$")
RE_LABEL = re.compile(
    r"^\*\*([A-ZÇÃÕÁÉÍÓÚÂÊÔÀ][A-ZÇÃÕÁÉÍÓÚÂÊÔÀ +/]*?)\*\*\s*\(([^)]+)\)\s*$"
)
RE_LABEL_SEM_TEMPO = re.compile(r"^\*\*([A-ZÇÃÕ][A-ZÇÃÕ +/]*?)\*\*\s*$")
RE_DATA = re.compile(r"^\*\*(DATA SUGERIDA[^*]*)\*\*\s*$")
RE_HASH = re.compile(r"^\\?#\w")
RE_CENA = re.compile(r"^\*\[(.+)\]\*\s*$")

DESTAQUE = {"GANCHO": "gancho", "CTA": "cta"}


def limpar(t):
    t = re.sub(r"\*\*(.+?)\*\*", r"\1", t)
    t = re.sub(r"\\#", "#", t)
    return t.strip()


def slug(t):
    t = unicodedata.normalize("NFKD", t).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")


def parse(md):
    guias, atual, roteiro, bloco = [], None, None, None

    def fechar_bloco():
        nonlocal bloco
        if bloco and roteiro is not None:
            bloco["texto"] = " ".join(bloco["texto"]).strip()
            if bloco["texto"]:
                roteiro["blocos"].append(bloco)
        bloco = None

    def fechar_roteiro():
        nonlocal roteiro
        fechar_bloco()
        if roteiro and atual is not None:
            atual["roteiros"].append(roteiro)
        roteiro = None

    for linha in md.split("\n"):
        s = linha.strip()
        if not s:
            continue

        m = RE_GUIA.match(s)
        if m:
            fechar_roteiro()
            if atual:
                guias.append(atual)
            nome = m.group(1).strip()
            atual = {"titulo": re.split(r"\s*[·(]", nome)[0].strip()
                     + " — Roteiros Virais",
                     "subtitulo": nome, "framework": "", "roteiros": []}
            continue

        m = RE_ROTEIRO.match(s)
        if m:
            fechar_roteiro()
            roteiro = {"titulo": limpar(m.group(1)), "pilar": "",
                       "blocos": [], "hashtags": ""}
            continue

        if roteiro is None:
            if atual and s.startswith("*") and s.endswith("*") and len(s) > 4:
                atual["framework"] = limpar(s.strip("*"))
            continue

        if RE_PILAR.search(s) and not roteiro["pilar"]:
            roteiro["pilar"] = limpar(s)
            continue

        m = RE_DATA.match(s)
        if m:
            roteiro["data"] = limpar(m.group(1))
            continue

        m = RE_LABEL.match(s) or RE_LABEL_SEM_TEMPO.match(s)
        if m:
            fechar_bloco()
            nome = m.group(1).strip()
            tempo = m.group(2).strip() if m.lastindex and m.lastindex > 1 else None
            bloco = {"rotulo": nome, "tempo": tempo, "texto": [],
                     "destaque": DESTAQUE.get(nome.split()[0])}
            continue

        if RE_HASH.match(s):
            fechar_bloco()
            roteiro["hashtags"] = limpar(s)
            continue

        m = RE_CENA.match(s)
        if m and bloco:
            bloco["texto"].append(f"[{m.group(1)}]")
            continue

        if bloco:
            bloco["texto"].append(limpar(s))

    fechar_roteiro()
    if atual:
        guias.append(atual)
    for g in guias:
        for r in g["roteiros"]:
            r["blocos"] = [b for b in r["blocos"] if b["texto"]]
            if not r.get("destaque"):
                r.pop("destaque", None)
    return guias


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    md = Path(sys.argv[1]).read_text(encoding="utf-8")
    prefixo = sys.argv[2]
    guias = parse(md)
    for g in guias:
        n = len(g["roteiros"])
        if not n:
            continue
        g["framework"] = (g.get("framework") or "")[:180]
        nome = f"{prefixo}-{slug(g['titulo'].split('—')[0])}.json"
        Path(nome).write_text(json.dumps(g, ensure_ascii=False, indent=1),
                              encoding="utf-8")
        print(f"{nome}: {n} roteiros")
