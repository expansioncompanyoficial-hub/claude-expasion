#!/usr/bin/env python3
"""Gera o protótipo do Estúdio com as fontes embutidas em base64.

    python3 gerar.py prototipo.src.html estudio.html

Pré-requisito, na raiz do repositório:
    npm i @fontsource/montserrat @fontsource/poppins
"""
import base64, pathlib, sys

FD = pathlib.Path(__file__).resolve().parent.parent / "node_modules/@fontsource"

# Os arquivos do @fontsource são subconjuntos por faixa de caractere. O
# `latin-ext` traz SÓ os acentuados — sem o `latin` do lado não existe glifo
# para A-Z, e o texto sai numa fonte de sistema sem ninguém perceber. As duas
# declarações só convivem porque cada uma diz a faixa que cobre; sem
# `unicode-range` a última apaga a primeira.
FAIXAS = {
    "latin": ("U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,"
              "U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,"
              "U+2193,U+2212,U+2215,U+FEFF,U+FFFD"),
    "latin-ext": ("U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,"
                  "U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,"
                  "U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF"),
}

FAMILIAS = [("Montserrat", "montserrat", [600, 700]),
            ("Poppins", "poppins", [400, 500, 700]),
            ("Source Serif 4", "source-serif-4", [600])]


def faces():
    out = []
    for nome, slug, pesos in FAMILIAS:
        for peso in pesos:
            for sub, faixa in FAIXAS.items():
                arq = FD / slug / "files" / f"{slug}-{sub}-{peso}-normal.woff2"
                if not arq.exists():
                    raise SystemExit(f"Falta {arq}. Rode: npm i @fontsource/{slug}")
                b = base64.b64encode(arq.read_bytes()).decode()
                out.append(f"@font-face{{font-family:'{nome}';font-weight:{peso};"
                           f"font-style:normal;font-display:block;unicode-range:{faixa};"
                           f"src:url(data:font/woff2;base64,{b}) format('woff2')}}")
    return "\n".join(out)


fonte = pathlib.Path(sys.argv[1]).read_text(encoding="utf-8")
saida = pathlib.Path(sys.argv[2])

# Duas saídas do mesmo fonte:
#
#   `pagina`  o fragmento que a ferramenta de Artifact recebe — ela mesma
#             embrulha em <!doctype html>. Fontes já embutidas.
#   `molde`   o documento COMPLETO, com três buracos: as fontes, o estado e
#             ele próprio. É o que a página publica quando alguém clica em
#             Salvar, e por isso precisa começar em <!doctype html>.
#
# O molde guarda um buraco pra si mesmo (`__MOLDE64__`) porque a versão
# publicada tem de saber se republicar. Sem isso, salvar funcionaria uma vez.
molde = f"""<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
{fonte.replace('<script type="application/json" id="estado-salvo">null</script>',
               '<script type="application/json" id="estado-salvo">"__ESTADO__"</script>')}
<script type="text/plain" id="molde">__MOLDE64__</script>
</body></html>"""
molde64 = base64.b64encode(molde.encode("utf-8")).decode()

pagina = fonte.replace("/*__FACES__*/", faces(), 1)
pagina += f'\n<script type="text/plain" id="molde">{molde64}</script>\n'
saida.write_text(pagina, encoding="utf-8")
print(f"{saida}  ·  {saida.stat().st_size / 1024:.0f} KB"
      f"  ·  molde {len(molde64) / 1024:.0f} KB")
