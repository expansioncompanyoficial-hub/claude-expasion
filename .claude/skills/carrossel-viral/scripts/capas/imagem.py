#!/usr/bin/env python3
"""Image Processor — valida, enquadra e deriva as versões da imagem.

O corte é o ponto delicado. Gerar em uma proporção e cortar pelo centro é o
caminho mais curto para perder o ponto focal e encher de assunto justamente a
faixa onde a headline vai entrar. Por isso a âncora é decidida ANTES:
`enquadra` recebe o foco (os mesmos nove pontos que o Estúdio já usa) e a
posição do texto, e corta preservando os dois.
"""
from pathlib import Path

from PIL import Image, ImageOps

FOCOS = {
    "0% 0%": (0.0, 0.0), "50% 0%": (0.5, 0.0), "100% 0%": (1.0, 0.0),
    "0% 50%": (0.0, 0.5), "50% 50%": (0.5, 0.5), "100% 50%": (1.0, 0.5),
    "0% 100%": (0.0, 1.0), "50% 100%": (0.5, 1.0), "100% 100%": (1.0, 1.0),
}
# A faixa da headline, em fração da altura. Vem da medição do template 01:
# o texto da capa apoia na base e ocupa 439,2 de 1350.
FAIXA_TEXTO = {"bottom": (0.67, 1.0), "top": (0.0, 0.33), "center": (0.38, 0.62)}
MIN_LADO = 640


class ImagemInvalida(ValueError):
    pass


def abre(caminho):
    caminho = Path(caminho)
    if not caminho.exists():
        raise ImagemInvalida(f"arquivo não encontrado: {caminho}")
    try:
        img = Image.open(caminho)
        img.verify()
        img = Image.open(caminho)
    except Exception as e:
        raise ImagemInvalida(
            f"{caminho.name} não é uma imagem legível: {e}") from e
    img = ImageOps.exif_transpose(img).convert("RGB")
    if min(img.size) < MIN_LADO:
        raise ImagemInvalida(
            f"{caminho.name}: {img.width}x{img.height} é pequeno demais. "
            f"O menor lado precisa ter ao menos {MIN_LADO}px — abaixo disso o "
            "upscale para 1080 aparece no feed.")
    return img


def enquadra(img, largura, altura, foco="50% 50%", posicao_texto="bottom"):
    """Corte ancorado, nunca cego.

    Quando a proporção de origem não bate com a de destino, o excedente sai do
    lado oposto ao foco — e, no eixo vertical, o corte protege a faixa da
    headline: se o texto vai embaixo, é a parte de cima que cede.
    """
    fx, fy = FOCOS.get(foco, (0.5, 0.5))
    alvo = largura / altura
    origem = img.width / img.height

    if abs(origem - alvo) < 1e-6:
        cortada = img
    elif origem > alvo:
        nova_larg = round(img.height * alvo)
        esq = round((img.width - nova_larg) * fx)
        cortada = img.crop((esq, 0, esq + nova_larg, img.height))
    else:
        nova_alt = round(img.width / alvo)
        sobra = img.height - nova_alt
        # No vertical o foco decide, mas a faixa do texto tem prioridade: com
        # texto embaixo o corte come o topo, para não empurrar o assunto para
        # dentro da área que vai ficar coberta.
        if posicao_texto == "bottom":
            topo = round(sobra * max(fy, 0.5))
        elif posicao_texto == "top":
            topo = round(sobra * min(fy, 0.5))
        else:
            topo = round(sobra * fy)
        cortada = img.crop((0, topo, img.width, topo + nova_alt))

    return cortada.resize((largura, altura), Image.LANCZOS)


def salva(img, caminho, qualidade=92):
    caminho = Path(caminho)
    caminho.parent.mkdir(parents=True, exist_ok=True)
    if caminho.suffix.lower() in (".jpg", ".jpeg"):
        img.save(caminho, "JPEG", quality=qualidade, subsampling=1, optimize=True)
    elif caminho.suffix.lower() == ".webp":
        img.save(caminho, "WEBP", quality=qualidade, method=6)
    else:
        img.save(caminho, "PNG", optimize=True)
    return caminho


def derivadas(img, destino, base):
    """Miniatura e prévia. A miniatura é o teste real: é assim que o feed mostra."""
    destino = Path(destino)
    destino.mkdir(parents=True, exist_ok=True)
    mini = img.copy()
    mini.thumbnail((216, 270), Image.LANCZOS)
    previa = img.copy()
    previa.thumbnail((540, 675), Image.LANCZOS)
    return {
        "miniatura": salva(mini, destino / f"{base}-mini.jpg", 84),
        "previa": salva(previa, destino / f"{base}-previa.jpg", 88),
    }


def faixa_texto(img, posicao="bottom"):
    """Recorta a faixa onde a headline vai entrar, para o QA olhar só ela."""
    a, b = FAIXA_TEXTO.get(posicao, FAIXA_TEXTO["bottom"])
    return img.crop((0, round(img.height * a), img.width, round(img.height * b)))
