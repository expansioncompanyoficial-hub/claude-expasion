#!/usr/bin/env python3
"""Prepara as fotos da secao do time para 920x500 (2x da caixa de 460x250).
Corta aqui, no export, e nao no navegador: assim o enquadramento e uma
decisao, nao um acidente do object-fit."""
from PIL import Image, ImageOps
import pathlib, sys

W, H = 920, 500
SRC = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else 'origem')
DST = pathlib.Path(__file__).parent

def enquadrar(src, dst, foco=0.5):
    """foco = onde fica o centro vertical do corte (0 topo, 1 base)."""
    im = ImageOps.exif_transpose(Image.open(src)).convert('RGB')
    escala = max(W / im.width, H / im.height)
    nw, nh = round(im.width * escala), round(im.height * escala)
    im = im.resize((nw, nh), Image.LANCZOS)
    x = (nw - W) // 2
    y = min(max(round(nh * foco - H / 2), 0), nh - H)
    im = im.crop((x, y, x + W, y + H))
    im.save(dst, 'JPEG', quality=88, optimize=True, progressive=True)
    return im.size, dst.stat().st_size

TRABALHOS = [
    ('foto_time_920x500.jpg', 'expansion-equipe-02.jpg',     0.50),
    ('IMG_9206.jpeg',         'expansion-escritorio-01.jpg', 0.46),
]
for origem, destino, foco in TRABALHOS:
    tam, b = enquadrar(SRC / origem, DST / destino, foco)
    print(f'{destino:<32} {tam[0]}x{tam[1]}  {b/1024:.0f} KB')
