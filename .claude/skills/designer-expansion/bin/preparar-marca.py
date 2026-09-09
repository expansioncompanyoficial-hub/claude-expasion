#!/usr/bin/env python3
"""Prepara os derivados de uso dos arquivos oficiais da marca EXPANSION.

Os originais vindos do Drive são telas de 1920x1080 com a marca centralizada e
muito espaço transparente em volta. Colocados direto num layout, a marca fica
minúscula e desalinhada, porque o que se alinha é a caixa, não o desenho.

Este script NÃO redesenha, recolore, distorce nem recria nada. Ele só:

  1. recorta o excesso de transparência em volta (a forma e as cores do
     desenho continuam pixel a pixel idênticas ao arquivo oficial);
  2. separa o anel do bloco de texto no arquivo SÍMBOLO, que é um lockup
     vertical (anel em cima, "EXPANSION PRODUÇÕES" embaixo).

Originais ficam intocados em assets/marca-expansion/. Derivados vão para
assets/marca-expansion/derivados/.

    python3 .claude/skills/designer-expansion/bin/preparar-marca.py
"""

import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("erro: falta a Pillow. Rode: pip3 install pillow", file=sys.stderr)
    raise SystemExit(1)

RAIZ = Path(__file__).resolve().parents[4]
MARCA = RAIZ / "assets/marca-expansion"
DERIVADOS = MARCA / "derivados"

# Recortes simples de transparência: original -> derivado
RECORTES = {
    "expansion-letreiro-preto.png": "letreiro-preto.png",
    "expansion-letreiro-branco.png": "letreiro-branco.png",
}

# O lockup vertical, de onde sai o anel isolado.
LOCKUP = "expansion-simbolo.png"
ANEL = "simbolo-anel.png"


def recortar_transparencia(origem: Path, destino: Path) -> None:
    im = Image.open(origem).convert("RGBA")
    caixa = im.split()[3].getbbox()
    im.crop(caixa).save(destino)
    print(f"  {destino.name}: {im.size} -> {im.crop(caixa).size}")


def separar_anel(origem: Path, destino: Path) -> None:
    """Isola o anel do lockup vertical cortando na faixa vazia entre os blocos."""
    im = Image.open(origem).convert("RGBA")
    alpha = im.split()[3]
    caixa = alpha.getbbox()
    im = im.crop(caixa)
    alpha = im.split()[3]
    largura, altura = im.size

    # Linhas totalmente transparentes separam o anel do texto.
    vazias = [
        y for y in range(altura)
        if not any(alpha.getpixel((x, y)) > 8 for x in range(0, largura, 2))
    ]
    # A maior sequência contígua de linhas vazias é o respiro do lockup.
    faixas, atual = [], []
    for y in vazias:
        if atual and y == atual[-1] + 1:
            atual.append(y)
        else:
            if atual:
                faixas.append(atual)
            atual = [y]
    if atual:
        faixas.append(atual)
    if not faixas:
        print("  aviso: não achei separação entre anel e texto; pulando", file=sys.stderr)
        return

    maior = max(faixas, key=len)
    corte = maior[0]
    anel = im.crop((0, 0, largura, corte))
    anel = anel.crop(anel.split()[3].getbbox())
    anel.save(destino)
    print(f"  {destino.name}: anel isolado do lockup -> {anel.size} "
          f"(corte em y={corte} de {altura})")


def main() -> int:
    DERIVADOS.mkdir(parents=True, exist_ok=True)
    print("Derivados da marca EXPANSION (recorte apenas, sem alterar o desenho):")
    for origem, destino in RECORTES.items():
        caminho = MARCA / origem
        if not caminho.exists():
            print(f"  aviso: {origem} não encontrado", file=sys.stderr)
            continue
        recortar_transparencia(caminho, DERIVADOS / destino)

    lockup = MARCA / LOCKUP
    if lockup.exists():
        separar_anel(lockup, DERIVADOS / ANEL)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
