#!/usr/bin/env python3
"""Cover Strategist — lê o carrossel inteiro e guarda os conceitos visuais.

Duas coisas que este módulo faz e uma que ele não faz.

Faz: **obriga a leitura do conteúdo completo**, não só da headline. Uma capa
criada a partir da manchete isolada acerta a palavra e erra o assunto — o
exemplo do operador é exato: "SUA COLEÇÃO TEM PRAZO DE VALIDADE" não é comida
vencida nem etiqueta de composição, é a janela curta para vender pelo preço
cheio. O argumento está nos slides 2 a 8, não na capa.

Faz: **recusa três conceitos que são o mesmo conceito**. Trocar a cor, o
ângulo ou o objeto secundário não produz alternativa — produz a ilusão de
escolha, e o operador aprova a primeira porque as três são iguais.

Não faz: interpretar sozinho. A leitura semântica e a metáfora são escritas
por quem está criando (o agente ou a pessoa). O módulo guarda, valida e
recusa; não fabrica sentido.
"""
import re
import unicodedata

# Os treze eixos que o operador pediu. Faltando um, a leitura não fecha — e
# leitura incompleta é o que produz imagem bonita e semanticamente errada.
EIXOS = ("assunto", "problema", "consequencia", "conflito", "emocao",
         "personagem", "objeto", "acao", "ambiente", "metafora",
         "ponto_focal", "area_texto", "risco_clichê")

CAMPOS_CONCEITO = ("id", "nome", "explicacao", "metafora", "cena",
                   "ponto_focal", "area_headline", "emocao", "risco",
                   "compatibilidade", "nota")

# `padrao` fica de fora da lista acima e é exigido à parte, porque só faz
# sentido quando existe biblioteca de onde escolher. Exigir um id de padrão
# sem a matriz carregada obrigaria a inventar um — que é exatamente o que este
# sistema não faz.

VAZIAS = {
    "de", "da", "do", "das", "dos", "e", "o", "a", "os", "as", "um", "uma",
    "em", "no", "na", "nos", "nas", "com", "por", "para", "que", "se", "ao",
    "à", "the", "of", "on", "in", "and", "with", "a", "an",
}


def _normal(texto):
    t = unicodedata.normalize("NFKD", (texto or "").lower())
    t = "".join(c for c in t if not unicodedata.combining(c))
    return re.findall(r"[a-z0-9]{3,}", t)


def _nucleo(texto):
    """As palavras que carregam o sentido de uma frase curta."""
    return {p for p in _normal(texto) if p not in VAZIAS}


def blocos_do_texto(txt):
    """Converte o contrato de 18 textos em pares de headline e corpo."""
    linhas = [l for l in (txt or "").split("\n") if l.strip()]
    limpas = []
    for l in linhas:
        m = re.match(r"^\s*texto\s+\d+\s*-\s*(.*)$", l, re.I)
        limpas.append((m.group(1) if m else l).strip())
    return [{"h": limpas[i] if i < len(limpas) else "",
             "c": limpas[i + 1] if i + 1 < len(limpas) else ""}
            for i in range(0, len(limpas), 2)]


def contexto(txt, marca, objetivo="alcance"):
    """O material completo que o estrategista precisa ler antes de criar."""
    pares = blocos_do_texto(txt)
    if not pares:
        raise ValueError(
            "conteúdo vazio: a capa não se cria a partir da headline isolada. "
            "Passe o carrossel inteiro — é nos slides 2 a 8 que está o "
            "argumento que define o que a imagem precisa dizer.")
    sem_marca = re.compile(r"\*+")
    def nu(s):
        return sem_marca.sub("", s or "").strip()
    return {
        "headline": nu(pares[0]["h"]),
        "subheadline": nu(pares[0]["c"]),
        "argumento": [{"titulo": nu(p["h"]), "corpo": nu(p["c"])}
                      for p in pares[1:-1]],
        "conclusao": nu(pares[-1]["h"]) if len(pares) > 1 else "",
        "cta": nu(pares[-1]["c"]) if len(pares) > 1 else "",
        "n_slides": len(pares),
        "publico": marca.get("publico", ""),
        "nicho": marca.get("nicho", ""),
        "marca": marca.get("nome", ""),
        "objetivo": objetivo,
    }


def valida_leitura(leitura):
    """A leitura semântica precisa cobrir os treze eixos."""
    if not isinstance(leitura, dict):
        raise ValueError("a leitura precisa ser um objeto.")
    faltam = [e for e in EIXOS if not str(leitura.get(e, "")).strip()]
    if faltam:
        raise ValueError(
            "leitura incompleta, falta: " + ", ".join(faltam) + ". "
            "Cada eixo em branco é uma decisão que o gerador de imagem vai "
            "tomar sozinho, e ele decide mal.")
    return leitura


def _assinatura(c):
    """O que define a identidade visual de um conceito.

    Cor não entra de propósito: é justamente o eixo que se troca para fingir
    variedade.
    """
    return _nucleo(c.get("metafora", "")) | _nucleo(c.get("ponto_focal", ""))


def valida_conceitos(conceitos, minimo=3, exige_padrao=False):
    """Exige N conceitos completos e realmente diferentes entre si."""
    if not isinstance(conceitos, list) or len(conceitos) < minimo:
        raise ValueError(
            f"esperava {minimo} conceitos, veio {len(conceitos) if isinstance(conceitos, list) else 0}. "
            "Três é o mínimo para haver escolha; abaixo disso o operador "
            "aprova o único que existe.")
    problemas, vistos = [], []
    for i, c in enumerate(conceitos):
        if not isinstance(c, dict):
            problemas.append(f"conceito {i}: esperava objeto.")
            continue
        falta = [k for k in CAMPOS_CONCEITO if not str(c.get(k, "")).strip()]
        if exige_padrao and not str(c.get("padrao", "")).strip():
            falta.append("padrao")
        if falta:
            problemas.append(f"conceito {c.get('id', i)}: sem {', '.join(falta)}.")
        assinatura = _assinatura(c)
        if not assinatura:
            problemas.append(
                f"conceito {c.get('id', i)}: metáfora e ponto focal vazios — "
                "não dá para saber se é diferente dos outros.")
        for j, anterior in vistos:
            comum = assinatura & anterior
            uniao = assinatura | anterior
            if uniao and len(comum) / len(uniao) >= 0.6:
                problemas.append(
                    f"conceitos {conceitos[j].get('id', j)} e {c.get('id', i)} "
                    f"são o mesmo conceito: dividem {', '.join(sorted(comum))}. "
                    "Trocar cor, ângulo ou objeto secundário não cria "
                    "alternativa — mude a metáfora ou o ponto focal.")
        vistos.append((i, assinatura))
    if problemas:
        raise ValueError("\n".join("· " + p for p in problemas))
    return conceitos
