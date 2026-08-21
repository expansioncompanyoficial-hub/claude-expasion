#!/usr/bin/env python3
"""Prompt Composer — conceito vira prompt técnico.

Em inglês por resultado, não por gosto: os modelos de imagem foram treinados
com legenda em inglês e respondem melhor a vocabulário de fotografia nessa
língua. O conceito continua sendo pensado e revisado em português.

A guarda central deste módulo: **a headline nunca entra no prompt**. Não é
questão de estilo — modelo de imagem escreve letra deformada, e letra
deformada dentro do fundo não tem conserto na composição. O texto entra
depois, na fonte da marca. A função `_sem_headline` levanta erro se a frase
aprovada vazar para dentro do prompt por descuido.
"""
import re
import unicodedata

# O que nunca pode aparecer no fundo. Vem do item 10 do pedido, e é a mesma
# lista que o QA técnico procura depois — as duas pontas têm de concordar.
NEGATIVO_BASE = (
    "text, letters, words, typography, caption, headline, subtitle, "
    "watermark, signature, logo, brand mark, username, handle, "
    "numbers, digits, price tag with legible text, "
    "distorted letters, gibberish text, "
    "extra fingers, deformed hands, deformed face, disfigured, "
    "lowres, blurry, jpeg artifacts, oversaturated, plastic skin, "
    "collage, split screen, border, frame, vignette overlay, "
    "stock photo watermark, getty, shutterstock"
)

POSICAO_NEGATIVA = {
    "bottom": "bottom third kept clean and uncluttered for later text overlay, "
              "subject and focal point in the upper two thirds",
    "top": "top third kept clean and uncluttered for later text overlay, "
           "subject and focal point in the lower two thirds",
    "center": "horizontal mid-band kept clean for later text overlay, "
              "focal interest at the top and bottom edges",
}


def _normal(t):
    t = unicodedata.normalize("NFKD", (t or "").lower())
    t = "".join(c for c in t if not unicodedata.combining(c))
    return re.sub(r"[^a-z0-9 ]+", " ", t)


def _sem_headline(prompt, headline):
    """Recusa prompt que carrega a frase aprovada dentro.

    Compara por sequência de palavras, não por igualdade: o risco real é
    alguém colar a headline no meio de uma frase descritiva.
    """
    if not headline:
        return
    # O mesmo filtro nos dois lados. Filtrar só a headline foi um erro que
    # deixou a guarda passar: a palavra curta some do alvo e continua no
    # prompt, e aí a janela nunca casa.
    curta = lambda s: [w for w in _normal(s).split() if len(w) > 2]
    alvo = curta(headline)
    if len(alvo) < 3:
        return
    corpo = curta(prompt)
    janela = len(alvo)
    for i in range(len(corpo) - janela + 1):
        if corpo[i:i + janela] == alvo:
            raise ValueError(
                "a headline aprovada apareceu dentro do prompt. O gerador "
                "escreveria a frase na imagem, com letra deformada e sem a "
                "fonte da marca. Descreva a CENA, não a frase.")


def compoe(conceito, marca, saida, contexto=None):
    """Devolve `{prompt, negative_prompt}` para um conceito."""
    ficha = marca.get("capa", {})
    posicao = saida.get("text_position", "bottom")
    realismo = saida.get("realism", 9)
    ousadia = saida.get("boldness", 8)

    estilo = ficha.get("photographic_style") or ""
    visual = ficha.get("visual_style") or ""
    proibidos = list(ficha.get("forbidden_elements") or [])
    proibidos += list((contexto or {}).get("forbidden_elements") or [])

    # A paleta entra como orientação, não como camisa de força: o fundo é
    # fotografia, e fotografia que obedece hex vira ilustração.
    paleta = ", ".join(
        v for v in (marca.get("paleta", {}).get("dark"),
                    marca.get("paleta", {}).get("accent")) if v)

    partes = [
        f"Editorial photograph. {conceito['cena']}.",
        f"Subject: {conceito.get('personagem') or conceito['ponto_focal']}.",
        f"Focal point: {conceito['ponto_focal']}.",
        f"Setting: {conceito.get('ambiente') or 'context that fits the subject'}.",
        f"Composition: {POSICAO_NEGATIVA.get(posicao, POSICAO_NEGATIVA['bottom'])}.",
        "Camera: full-frame, 50mm prime, shallow-to-medium depth of field, "
        "eye-level unless the scene demands otherwise.",
        f"Lighting: {conceito.get('luz') or 'single directional key light, deep shadows, no flat fill'}.",
    ]
    if paleta:
        partes.append(f"Colour: grounded palette leaning to {paleta}, "
                      "restrained — colour supports the subject, never leads it.")
    if estilo:
        partes.append(f"Photographic style: {estilo}.")
    if visual:
        partes.append(f"Brand visual language: {visual}.")
    partes.append(
        f"Realism {realismo}/10, boldness {ousadia}/10. "
        "Fine grain, natural texture, no beautification.")
    partes.append(
        f"Output {saida['width']}x{saida['height']}, {saida['format']} vertical. "
        "No text of any kind anywhere in the frame.")

    prompt = " ".join(partes)
    negativo = NEGATIVO_BASE
    if proibidos:
        negativo += ", " + ", ".join(sorted(set(proibidos)))

    _sem_headline(prompt, (contexto or {}).get("headline"))
    return {"prompt": prompt, "negative_prompt": negativo}
