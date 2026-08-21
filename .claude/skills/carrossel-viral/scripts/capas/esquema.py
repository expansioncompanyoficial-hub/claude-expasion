#!/usr/bin/env python3
"""Contrato de entrada e de saída da geração de fundo de capa.

Validação escrita à mão, sem `jsonschema`: o projeto não tem dependência
Python nenhuma e não é hora de ganhar uma. O que se perde em generalidade se
ganha em mensagem de erro — aqui o erro diz o campo, o que veio e o que era
esperado, em português, porque quem lê é o operador e não o autor da lib.

O schema do pacote de origem tinha seis defeitos que quebram em produção e
que estão corrigidos aqui. Cada um está comentado no ponto onde importa,
porque a correção sem o motivo volta na próxima refatoração.
"""

EMOCOES = ("urgencia", "medo", "curiosidade", "alivio", "orgulho",
           "indignacao", "esperanca", "surpresa")
OBJETIVOS = ("alcance", "salvamento", "compartilhamento", "comentario", "clique")
POSICOES = ("bottom", "top", "center")
FORMATOS = {"4:5": (1080, 1350), "1:1": (1080, 1080), "9:16": (1080, 1920)}


class EntradaInvalida(ValueError):
    """Erro de validação com a lista completa, não só o primeiro problema."""

    def __init__(self, problemas):
        self.problemas = problemas
        super().__init__("\n".join("· " + p for p in problemas))


def _tipo(valor, *tipos):
    # bool é subclasse de int em Python: sem esta guarda, `true` passa por
    # número e `boldness: true` viraria 1 silenciosamente.
    if isinstance(valor, bool) and bool not in tipos:
        return False
    return isinstance(valor, tipos)


def _numero_em(problemas, campo, valor, minimo, maximo):
    if not _tipo(valor, int, float):
        problemas.append(
            f"{campo}: esperava número entre {minimo} e {maximo}, veio "
            f"{type(valor).__name__} ({valor!r}). "
            "Se a intenção era herdar da ficha do cliente, omita o campo.")
        return None
    if not minimo <= valor <= maximo:
        problemas.append(f"{campo}: {valor} está fora da faixa {minimo}–{maximo}.")
        return None
    return valor


def _lista_de_texto(problemas, campo, valor):
    if valor is None:
        return []
    if isinstance(valor, str):
        # DEFEITO CORRIGIDO: `forbidden_elements` vinha com string como padrão.
        # Uma string é iterável, então o código a jusante iterava letra por
        # letra e proibia "t", "e", "x"... sem nunca dar erro.
        problemas.append(
            f"{campo}: esperava lista, veio texto ({valor!r}). "
            f'Escreva ["{valor}"] mesmo quando for um item só.')
        return []
    if not isinstance(valor, list) or not all(isinstance(x, str) for x in valor):
        problemas.append(f"{campo}: esperava lista de textos.")
        return []
    return [x.strip() for x in valor if x.strip()]


def _sem_extras(problemas, campo, dado, conhecidos):
    extras = sorted(set(dado) - set(conhecidos))
    if extras:
        problemas.append(
            f"{campo}: campo(s) desconhecido(s) {', '.join(extras)}. "
            f"Aceitos: {', '.join(sorted(conhecidos))}.")


CONTENT = ("headline", "theme", "audience", "emotion", "objective",
           "required_elements", "forbidden_elements", "references", "notes")
OUTPUT = ("width", "height", "format", "text_position", "variations",
          "include_text", "boldness", "realism", "seed")


def valida_entrada(bruto, perfil=None):
    """Valida e normaliza o pedido de geração.

    `perfil` é a ficha do cliente já resolvida (ver `marca.py`). É dela que
    saem `boldness` e `realism` quando o pedido não os traz — resolver ANTES
    de validar é o que permite exigir número em vez de aceitar `"alto"`.
    """
    problemas = []
    perfil = perfil or {}
    if not isinstance(bruto, dict):
        raise EntradaInvalida(["o pedido precisa ser um objeto JSON."])
    _sem_extras(problemas, "raiz", bruto, ("brand_id", "content", "output"))

    marca = bruto.get("brand_id")
    if not (isinstance(marca, str) and marca.strip()):
        problemas.append("brand_id: obrigatório, é o id do cliente na ficha.")

    conteudo = bruto.get("content")
    if not isinstance(conteudo, dict):
        problemas.append("content: obrigatório, e precisa ser um objeto.")
        conteudo = {}
    else:
        _sem_extras(problemas, "content", conteudo, CONTENT)

    # DEFEITO CORRIGIDO: `headline` e `theme` eram validados na raiz, fora de
    # `content`. Um pedido bem-formado era recusado e um pedido sem headline
    # nenhuma passava. Aqui os dois moram em `content` e pelo menos um é
    # obrigatório — sem assunto não existe conceito visual a criar.
    headline = (conteudo.get("headline") or "").strip() if isinstance(
        conteudo.get("headline"), str) else ""
    tema = (conteudo.get("theme") or "").strip() if isinstance(
        conteudo.get("theme"), str) else ""
    if not headline and not tema:
        problemas.append(
            "content: informe `headline` ou `theme` — pelo menos um dos dois. "
            "Sem assunto não há o que interpretar.")

    emocao = conteudo.get("emotion")
    # DEFEITO CORRIGIDO: o padrão era um valor que não estava no próprio enum,
    # então todo pedido que omitisse o campo nascia inválido.
    if emocao is None:
        emocao = None
    elif emocao not in EMOCOES:
        problemas.append(
            f"content.emotion: {emocao!r} não está na lista. "
            f"Aceitos: {', '.join(EMOCOES)}.")
        emocao = None

    objetivo = conteudo.get("objective") or "alcance"
    if objetivo not in OBJETIVOS:
        problemas.append(
            f"content.objective: {objetivo!r} não está na lista. "
            f"Aceitos: {', '.join(OBJETIVOS)}.")

    saida = bruto.get("output") or {}
    if not isinstance(saida, dict):
        problemas.append("output: precisa ser um objeto.")
        saida = {}
    else:
        _sem_extras(problemas, "output", saida, OUTPUT)

    formato = saida.get("format") or "4:5"
    if formato not in FORMATOS:
        problemas.append(
            f"output.format: {formato!r} não é suportado. "
            f"Aceitos: {', '.join(FORMATOS)}.")
        formato = "4:5"
    larg, alt = FORMATOS[formato]
    largura = saida.get("width", larg)
    altura = saida.get("height", alt)
    if (largura, altura) != (larg, alt):
        problemas.append(
            f"output: {largura}x{altura} não corresponde ao formato {formato} "
            f"({larg}x{alt}). Gerar numa proporção e cortar cego perde o ponto "
            "focal — mude o formato ou deixe as medidas de fora.")

    posicao = saida.get("text_position") or "bottom"
    if posicao not in POSICOES:
        problemas.append(
            f"output.text_position: {posicao!r} não está na lista. "
            f"Aceitos: {', '.join(POSICOES)}.")
        posicao = "bottom"

    variacoes = saida.get("variations", 3)
    if not _tipo(variacoes, int) or not 1 <= variacoes <= 5:
        problemas.append(
            f"output.variations: esperava inteiro de 1 a 5, veio {variacoes!r}. "
            "Acima de 5 o custo cresce sem o olho conseguir comparar.")
        variacoes = 3

    # DEFEITO CORRIGIDO: `include_text` era configurável. Não é decisão do
    # pedido — o gerador de imagem NUNCA escreve a headline. O texto entra na
    # composição, com a fonte e a régua da marca. Deixar isso aberto produz
    # fundo com letra deformada dentro, que não tem conserto depois.
    if saida.get("include_text") not in (None, False):
        problemas.append(
            "output.include_text: só pode ser false. A headline é aplicada na "
            "composição, nunca dentro da imagem gerada.")

    # DEFEITO CORRIGIDO: `boldness` e `realism` aceitavam texto. Agora exigem
    # número, e a herança da ficha acontece antes — não como valor mágico.
    ousadia = saida.get("boldness", perfil.get("boldness", 8))
    realismo = saida.get("realism", perfil.get("realism", 9))
    ousadia = _numero_em(problemas, "output.boldness", ousadia, 0, 10)
    realismo = _numero_em(problemas, "output.realism", realismo, 0, 10)

    semente = saida.get("seed")
    if semente is not None and not _tipo(semente, int):
        problemas.append("output.seed: esperava inteiro ou ausência.")

    # As listas são validadas ANTES do `raise`: se ficassem no dicionário de
    # retorno, um `forbidden_elements` em formato errado nunca chegaria a
    # reclamar — a exceção já teria subido ou o campo já teria passado.
    obrigatorios = _lista_de_texto(
        problemas, "content.required_elements", conteudo.get("required_elements"))
    proibidos = _lista_de_texto(
        problemas, "content.forbidden_elements", conteudo.get("forbidden_elements"))
    referencias = _lista_de_texto(
        problemas, "content.references", conteudo.get("references"))

    if problemas:
        raise EntradaInvalida(problemas)

    return {
        "brand_id": marca.strip(),
        "content": {
            "headline": headline,
            "theme": tema,
            "audience": (conteudo.get("audience") or perfil.get("publico") or "").strip(),
            "emotion": emocao,
            "objective": objetivo,
            "required_elements": obrigatorios,
            "forbidden_elements": proibidos,
            "references": referencias,
            "notes": (conteudo.get("notes") or "").strip(),
        },
        "output": {
            "width": larg, "height": alt, "format": formato,
            "text_position": posicao, "variations": variacoes,
            "include_text": False,
            "boldness": ousadia, "realism": realismo, "seed": semente,
        },
    }


# ── saída ─────────────────────────────────────────────────────────────────
ESTADOS = ("draft", "generating", "generated", "qa_failed", "ready_for_review",
           "selected", "approved", "adjustments_requested", "rejected",
           "generation_failed")

OBRIGATORIOS_JOB = ("job_id", "status", "brand_id", "provider", "variations",
                    "recommended", "warnings", "limitations", "qa")
OBRIGATORIOS_VAR = ("id", "concept", "file", "width", "height", "prompt",
                    "negative_prompt", "qa")


def valida_saida(saida):
    """Recusa resposta incompleta. Saída vazia nunca é sucesso."""
    problemas = []
    if not isinstance(saida, dict):
        raise EntradaInvalida(["a resposta precisa ser um objeto."])

    faltando = [c for c in OBRIGATORIOS_JOB if c not in saida]
    if faltando:
        problemas.append(f"resposta sem: {', '.join(faltando)}.")

    estado = saida.get("status")
    if estado not in ESTADOS:
        problemas.append(
            f"status: {estado!r} não é um estado conhecido. "
            f"Aceitos: {', '.join(ESTADOS)}.")

    variacoes = saida.get("variations")
    if not isinstance(variacoes, list):
        problemas.append("variations: esperava lista.")
        variacoes = []
    # Uma geração que diz `generated` e devolve lista vazia é um sucesso
    # mentiroso — foi esse o caso que motivou a regra.
    elif not variacoes and estado in ("generated", "ready_for_review",
                                      "selected", "approved"):
        problemas.append(
            f"variations: lista vazia com status {estado!r}. "
            "Sem imagem não existe geração concluída — use "
            "`generation_failed` ou `draft`.")

    for i, v in enumerate(variacoes):
        if not isinstance(v, dict):
            problemas.append(f"variations[{i}]: esperava objeto.")
            continue
        falta = [c for c in OBRIGATORIOS_VAR if c not in v]
        if falta:
            problemas.append(f"variations[{i}] sem: {', '.join(falta)}.")
        if v.get("width") and v.get("height"):
            if (v["width"], v["height"]) not in FORMATOS.values():
                problemas.append(
                    f"variations[{i}]: {v['width']}x{v['height']} não é um "
                    "formato suportado.")

    rec = saida.get("recommended")
    ids = {v.get("id") for v in variacoes if isinstance(v, dict)}
    if rec is not None and rec not in ids:
        problemas.append(
            f"recommended: {rec!r} não está entre as variações ({', '.join(sorted(map(str, ids))) or 'nenhuma'}).")

    for campo in ("warnings", "limitations"):
        if campo in saida and not isinstance(saida[campo], list):
            problemas.append(f"{campo}: esperava lista (pode ser vazia).")

    if problemas:
        raise EntradaInvalida(problemas)
    return saida
