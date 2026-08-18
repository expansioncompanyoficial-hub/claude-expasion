#!/usr/bin/env python3
"""Gera o protótipo do Estúdio com as fontes embutidas em base64."""
import base64, pathlib, sys

FD = pathlib.Path("/tmp/claude-0/-home-user-claude-expasion/76b841c2-6643-5b25-b73c-4065a9c5f2fe/scratchpad/build/node_modules/@fontsource")
FACES = [
    ("Montserrat", 800, FD / "montserrat/files/montserrat-latin-ext-800-normal.woff2"),
    ("Poppins", 400, FD / "poppins/files/poppins-latin-ext-400-normal.woff2"),
    ("Poppins", 600, FD / "poppins/files/poppins-latin-ext-600-normal.woff2"),
]

def faces():
    out = []
    for fam, w, p in FACES:
        b = base64.b64encode(p.read_bytes()).decode()
        out.append(f"@font-face{{font-family:'{fam}';font-weight:{w};font-style:normal;"
                   f"font-display:block;src:url(data:font/woff2;base64,{b}) format('woff2')}}")
    return "\n".join(out)

corpo = pathlib.Path(sys.argv[1]).read_text(encoding="utf-8")
saida = pathlib.Path(sys.argv[2])
saida.write_text(corpo.replace("/*__FACES__*/", faces()), encoding="utf-8")
kb = saida.stat().st_size / 1024
print(f"{saida}  ·  {kb:.0f} KB")
