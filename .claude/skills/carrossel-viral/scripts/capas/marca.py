#!/usr/bin/env python3
"""Brand Resolver — transforma a ficha do cliente em regras utilizáveis.

A fonte da verdade continua sendo `CLIENTES/<X>/FICHA-CARROSSEL-<X>.md`. Não
existe segundo cadastro de clientes: o que falta para a geração de capa entra
como um bloco `cover_generation` na própria ficha, e o resto é lido das
tabelas que já estão lá.

A regra dura deste módulo: **não inventar marca**. Quando a ficha não diz qual
é o estilo fotográfico do cliente, o resolver devolve o campo vazio e o nome
dele em `faltando`. Preencher com o padrão da Expansion transformaria toda
marca em fundo preto com luz âmbar, que é exatamente o que o operador pediu
para não acontecer.
"""
import json
import re

from .raiz import clientes

# O que a geração de capa precisa e a ficha nem sempre tem. Cada ausência vira
# uma linha em `faltando` — o operador decide preencher ou seguir sem.
CAMPOS_CAPA = ("visual_style", "photographic_style", "allowed_elements",
               "forbidden_elements", "reference_profiles")

PADRAO_CAPA = {
    "enabled": True,
    "visual_style": "",
    "photographic_style": "",
    "boldness": 8,
    "realism": 9,
    "preferred_text_position": "bottom",
    "allowed_elements": [],
    "forbidden_elements": [],
    "reference_profiles": [],
    "approved_cover_ids": [],
    "rejected_cover_ids": [],
    "recent_pattern_ids": [],
    "pattern_cooldown_days": 30,
}


class MarcaDesconhecida(KeyError):
    pass


def _tabela(texto, secao):
    """Lê uma tabela markdown de duas ou três colunas sob um título."""
    m = re.search(rf"^##\s+{re.escape(secao)}\s*$(.*?)(?=^##\s|\Z)",
                  texto, re.M | re.S)
    if not m:
        return {}
    fora = {}
    for linha in m.group(1).splitlines():
        if not linha.strip().startswith("|"):
            continue
        celulas = [c.strip() for c in linha.strip().strip("|").split("|")]
        if len(celulas) < 2 or set("".join(celulas)) <= set("-: "):
            continue
        chave = celulas[0].strip("`* ").lower()
        valor = celulas[1].strip("`* ")
        if chave and valor:
            fora[chave] = valor
    return fora


def _bloco_json(texto, rotulo):
    m = re.search(rf"```json\s+{rotulo}\s*\n(.*?)```", texto, re.S)
    if not m:
        m = re.search(r"```json\s*\n(\{.*?\"" + rotulo + r"\".*?\})\s*```",
                      texto, re.S)
        if not m:
            return None
    try:
        dado = json.loads(m.group(1))
    except json.JSONDecodeError as e:
        raise ValueError(
            f"o bloco `{rotulo}` da ficha não é JSON válido: {e}") from e
    return dado.get(rotulo, dado)


def ids():
    """Clientes que têm ficha de carrossel."""
    base = clientes()
    if not base.is_dir():
        return []
    fora = []
    for d in sorted(base.iterdir()):
        if d.is_dir() and (d / f"FICHA-CARROSSEL-{d.name}.md").exists():
            fora.append(d.name.lower())
    return fora


def resolve(brand_id):
    """Devolve a marca em forma utilizável, mais o que falta nela."""
    if not isinstance(brand_id, str) or not brand_id.strip():
        raise MarcaDesconhecida("brand_id vazio.")
    nome = brand_id.strip().upper()
    ficha = clientes() / nome / f"FICHA-CARROSSEL-{nome}.md"
    if not ficha.exists():
        disponiveis = ", ".join(ids()) or "nenhum"
        raise MarcaDesconhecida(
            f"não existe ficha para {brand_id!r} em CLIENTES/{nome}/. "
            f"Clientes com ficha: {disponiveis}.")

    texto = ficha.read_text(encoding="utf-8")
    identidade = _tabela(texto, "Identidade")
    paleta = _tabela(texto, "Paleta")

    cta = ""
    m = re.search(r"^##\s+CTA[^\n]*\n+\*\*`([^`]+)`\*\*", texto, re.M)
    if m:
        cta = m.group(1).strip()

    capa = dict(PADRAO_CAPA)
    do_arquivo = _bloco_json(texto, "cover_generation")
    if isinstance(do_arquivo, dict):
        capa.update({k: v for k, v in do_arquivo.items() if k in PADRAO_CAPA})

    faltando = []
    for campo in CAMPOS_CAPA:
        valor = capa.get(campo)
        if not valor:
            faltando.append(f"cover_generation.{campo}")
    if not paleta.get("accent"):
        faltando.append("Paleta.accent")
    if not identidade.get("público") and not identidade.get("publico"):
        faltando.append("Identidade.Público")
    if not cta:
        faltando.append("CTA")

    return {
        "brand_id": brand_id.strip().lower(),
        "nome": nome.title(),
        "ficha": ficha,
        "handle": identidade.get("perfil", ""),
        "marca": identidade.get("marca na barra", ""),
        "nicho": identidade.get("nicho", ""),
        "publico": identidade.get("público") or identidade.get("publico") or "",
        "cta": cta,
        "paleta": {
            "dark": paleta.get("dark", ""),
            "accent": paleta.get("accent", ""),
            "claro": paleta.get("claro", ""),
            "gradiente": paleta.get("gradiente", ""),
            "gradiente_texto": paleta.get("gradiente_texto", ""),
        },
        "fontes": {"titulo": "Montserrat", "corpo": "Poppins"},
        "capa": capa,
        "boldness": capa.get("boldness", 8),
        "realism": capa.get("realism", 9),
        # A lista existe para ser mostrada ao operador, não para ser preenchida
        # sozinha. Identidade inventada vira padrão da casa em duas semanas.
        "faltando": faltando,
    }
