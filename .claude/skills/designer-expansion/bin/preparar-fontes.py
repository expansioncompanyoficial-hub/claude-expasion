#!/usr/bin/env python3
"""Gera assets/tipografia/open-sans.css com a fonte oficial embutida em base64.

Open Sans é a tipografia oficial da EXPANSION (ver assets/marca-expansion/
expansion-cores-e-escrita.png). Embutir a fonte no CSS garante que o PDF saia
idêntico em qualquer máquina, inclusive sem rede — o Chromium não precisa
buscar nada no fonts.gstatic.com na hora de renderizar.

Só precisa rodar de novo se o arquivo for perdido ou se a fonte mudar.

    python3 .claude/skills/designer-expansion/bin/preparar-fontes.py
"""

import base64
import re
import subprocess
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[4]
SAIDA = RAIZ / "assets/tipografia/open-sans.css"

CSS_URL = (
    "https://fonts.googleapis.com/css2"
    "?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
)
UA = (
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"
)
# Só latin e latin-ext: cobre português sem inchar o arquivo com cirílico e grego.
SUBSETS = ("latin", "latin-ext")


def baixar(url: str) -> bytes:
    resultado = subprocess.run(
        ["curl", "-sS", "--max-time", "60", "-A", UA, url],
        capture_output=True,
        check=True,
    )
    return resultado.stdout


def main() -> int:
    css = baixar(CSS_URL).decode("utf-8")

    # O CSS do Google vem em blocos comentados com o nome do subset:
    #   /* latin */
    #   @font-face { ... }
    blocos = re.findall(r"/\*\s*([\w-]+)\s*\*/\s*(@font-face\s*\{[^}]*\})", css)
    if not blocos:
        print("erro: não consegui ler os @font-face do Google Fonts", file=sys.stderr)
        return 1

    partes = [
        "/* Open Sans — tipografia oficial da EXPANSION, embutida em base64.",
        " * Gerado por .claude/skills/designer-expansion/bin/preparar-fontes.py",
        " * Fonte: Google Fonts (SIL Open Font License 1.1). Subsets: latin, latin-ext.",
        " * Não editar à mão. */",
        "",
    ]
    embutidos = 0
    for subset, bloco in blocos:
        if subset not in SUBSETS:
            continue
        url = re.search(r"url\((https://[^)]+)\)", bloco).group(1)
        dados = baixar(url)
        b64 = base64.b64encode(dados).decode("ascii")
        bloco = re.sub(
            r"url\(https://[^)]+\)",
            f"url(data:font/woff2;base64,{b64})",
            bloco,
        )
        partes.append(f"/* {subset} */")
        partes.append(bloco)
        partes.append("")
        embutidos += 1
        print(f"  embutido: {subset} ({len(dados) / 1024:.0f} KB)")

    if not embutidos:
        print("erro: nenhum subset latin encontrado", file=sys.stderr)
        return 1

    SAIDA.parent.mkdir(parents=True, exist_ok=True)
    SAIDA.write_text("\n".join(partes), encoding="utf-8")
    print(f"\n{SAIDA.relative_to(RAIZ)} — {SAIDA.stat().st_size / 1024:.0f} KB, "
          f"{embutidos} arquivos de fonte")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
