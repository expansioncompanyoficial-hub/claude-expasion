#!/usr/bin/env python3
"""Visual QA — o que a máquina mede e o que ela não mede.

A separação é o ponto deste módulo, e é uma separação honesta:

  **QA técnico** (aqui, automático): dimensão, proporção, nitidez, contraste,
  ruído, limpeza da faixa da headline, indício de texto acidental, ponto
  focal. Tudo isso é medível em pixel e o resultado é confiável.

  **QA semântico** (aqui, apenas *declarado*): se a imagem representa a
  headline, se a metáfora comunica o problema, se existe leitura contrária,
  se está genérica, se há risco de cópia. Nada disso sai de estatística de
  pixel. O módulo devolve a lista de perguntas em aberto e marca
  `respondido: false` até que um olho — humano ou multimodal — responda.

Fingir que variância de Laplaciano mede qualidade estratégica seria a pior
mentira que este sistema poderia contar, porque ela passa despercebida.
"""
from PIL import ImageFilter, ImageStat

from .imagem import faixa_texto

PERGUNTAS_SEMANTICAS = (
    "a imagem representa o assunto da headline, e não outra leitura dela?",
    "a metáfora comunica o problema, ou é só bonita?",
    "existe interpretação contrária possível?",
    "parece genérica, do tipo que já se viu em qualquer banco de imagem?",
    "está coerente com esta cliente, ou poderia ser de qualquer marca?",
    "há mão, rosto ou objeto deformado?",
    "há risco de parecer cópia de uma referência conhecida?",
)


def _cinza(img):
    return img.convert("L")


def nitidez(img):
    """Variância da borda. Alto = nítido; baixo = borrado ou desfocado."""
    bordas = _cinza(img).filter(ImageFilter.FIND_EDGES)
    return round(ImageStat.Stat(bordas).stddev[0], 2)


def contraste(img):
    return round(ImageStat.Stat(_cinza(img)).stddev[0], 2)


def densidade_borda(img):
    """Fração de pixels com borda forte. Serve para 'quão ocupada é a área'."""
    bordas = _cinza(img).filter(ImageFilter.FIND_EDGES)
    hist = bordas.histogram()
    total = sum(hist) or 1
    return round(sum(hist[60:]) / total, 4)


def indicio_de_texto(img):
    """Indício, não veredicto.

    Texto tem uma assinatura: bordas fortes concentradas em linhas horizontais
    curtas e repetidas. Isto mede a razão entre a energia de borda de uma
    faixa e a da imagem toda — anomalia alta pede olho, não reprova sozinha.
    """
    faixa = densidade_borda(img)
    return faixa


def avalia(img, saida, posicao_texto="bottom"):
    """QA técnico de uma variação. Devolve notas, alertas e o veredicto."""
    alertas, notas = [], {}
    larg, alt = saida["width"], saida["height"]

    notas["dimensao_ok"] = (img.width, img.height) == (larg, alt)
    if not notas["dimensao_ok"]:
        alertas.append(
            f"dimensão {img.width}x{img.height} diferente de {larg}x{alt}.")

    proporcao = round(img.width / img.height, 4)
    notas["proporcao"] = proporcao
    if abs(proporcao - larg / alt) > 0.01:
        alertas.append(f"proporção {proporcao} fora do formato pedido.")

    notas["nitidez"] = nitidez(img)
    if notas["nitidez"] < 8:
        alertas.append(
            f"nitidez baixa ({notas['nitidez']}) — no feed isso lê como foto "
            "fora de foco.")

    notas["contraste"] = contraste(img)
    if notas["contraste"] < 25:
        alertas.append(
            f"contraste baixo ({notas['contraste']}) — a headline branca vai "
            "sumir por cima.")

    banda = faixa_texto(img, posicao_texto)
    notas["faixa_texto_ocupacao"] = densidade_borda(banda)
    if notas["faixa_texto_ocupacao"] > 0.22:
        alertas.append(
            f"faixa da headline ocupada demais ({notas['faixa_texto_ocupacao']}) "
            "— o texto vai cair em cima de detalhe e nenhum scrim salva.")

    notas["indicio_texto"] = indicio_de_texto(banda)
    if notas["indicio_texto"] > 0.30:
        alertas.append(
            "possível texto dentro da imagem na faixa da headline — confira a "
            "olho. Letra gerada não tem conserto na composição.")

    notas["ponto_focal_ok"] = densidade_borda(img) > 0.02
    if not notas["ponto_focal_ok"]:
        alertas.append(
            "imagem sem ponto focal detectável — fundo chapado não segura o "
            "dedo de ninguém.")

    return {
        "tecnico": {
            "notas": notas,
            "alertas": alertas,
            "aprovado": not any(
                a.startswith(("dimensão", "proporção", "nitidez", "contraste"))
                for a in alertas),
        },
        # Nunca preenchido por medição. É pergunta em aberto até alguém olhar.
        "semantico": {
            "respondido": False,
            "por": None,
            "perguntas": list(PERGUNTAS_SEMANTICAS),
            "nota": None,
            "observacoes": "",
        },
    }
