#!/usr/bin/env python3
"""Pattern Selector — escolhe o padrão visual, com memória e cooldown.

A biblioteca de padrões (P01–P10, oportunidades O1–O5, análises de perfil)
vem de fora, do pacote de pesquisa, e mora em
`.claude/skills/carrossel-viral/referencias-capa/`. Este módulo **não inventa
padrão**: sem biblioteca ele diz que está sem biblioteca e deixa a escolha
com quem está criando, em vez de fabricar uma taxonomia que ninguém validou.

Duas regras que o pacote de origem não tinha e que existem aqui:

  **Nota alta não decide sozinha.** Escolher sempre o padrão de maior nota
  produz um feed onde todas as capas do mês são a mesma composição. A nota
  entra como um dos pesos, junto com repetição recente e risco de cópia.

  **Cooldown por padrão.** Um padrão usado nos últimos N dias sai da roda,
  mesmo sendo o melhor no papel. N vem da ficha (`pattern_cooldown_days`).
"""
import json
from datetime import datetime, timedelta, timezone

from .raiz import biblioteca, relativo

ARQUIVOS = {
    "padroes": "visual-patterns-matrix.json",
    "analises": "reference-analyses.json",
    "aprendizados": "learned-patterns.md",
    "conhecimento": "cover-generation-knowledge.json",
}


def estado_biblioteca():
    """O que existe da biblioteca, arquivo por arquivo. Nunca levanta erro."""
    base = biblioteca()
    fora = {"base": relativo(base), "presente": base.is_dir(), "arquivos": {}}
    for chave, nome in ARQUIVOS.items():
        p = base / nome
        fora["arquivos"][chave] = {"arquivo": nome, "existe": p.exists()}
    fora["completa"] = all(v["existe"] for v in fora["arquivos"].values())
    return fora


def carrega():
    """Carrega a matriz de padrões. Devolve lista vazia quando não há."""
    p = biblioteca() / ARQUIVOS["padroes"]
    if not p.exists():
        return []
    try:
        dado = json.loads(p.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        raise ValueError(f"{relativo(p)} não é JSON válido: {e}") from e
    padroes = dado.get("patterns", dado) if isinstance(dado, dict) else dado
    if not isinstance(padroes, list):
        raise ValueError(
            f"{relativo(p)}: esperava lista de padrões em `patterns`.")
    for i, x in enumerate(padroes):
        if not isinstance(x, dict) or "id" not in x:
            raise ValueError(f"{relativo(p)}: padrão {i} sem `id`.")
    return padroes


def em_cooldown(perfil_capa, agora=None):
    """Ids de padrão que não podem voltar ainda.

    `recent_pattern_ids` guarda pares id/data. Aceita também lista simples de
    ids — nesse caso todos contam como recentes, que é o comportamento seguro.
    """
    dias = perfil_capa.get("pattern_cooldown_days", 30)
    agora = agora or datetime.now(timezone.utc)
    corte = agora - timedelta(days=dias)
    presos = set()
    for item in perfil_capa.get("recent_pattern_ids") or []:
        if isinstance(item, str):
            presos.add(item)
            continue
        if not isinstance(item, dict):
            continue
        pid, quando = item.get("id"), item.get("em")
        if not pid:
            continue
        if not quando:
            presos.add(pid)
            continue
        try:
            usado = datetime.fromisoformat(str(quando).replace("Z", "+00:00"))
        except ValueError:
            presos.add(pid)
            continue
        if usado.tzinfo is None:
            usado = usado.replace(tzinfo=timezone.utc)
        if usado > corte:
            presos.add(pid)
    return presos


def elegiveis(perfil_capa, nicho="", agora=None):
    """Padrões disponíveis, já sem os que estão em cooldown."""
    todos = carrega()
    presos = em_cooldown(perfil_capa, agora)
    fora = []
    for p in todos:
        if p["id"] in presos:
            continue
        nichos = p.get("niches") or p.get("nichos")
        if nicho and isinstance(nichos, list) and nichos:
            if not any(n.lower() in nicho.lower() or nicho.lower() in n.lower()
                       for n in nichos):
                continue
        fora.append(p)
    return fora


def diagnostico(perfil_capa, nicho="", agora=None):
    """O que o operador precisa saber antes de escolher — sem escolher por ele."""
    est = estado_biblioteca()
    if not est["completa"]:
        faltam = [v["arquivo"] for v in est["arquivos"].values() if not v["existe"]]
        return {
            "biblioteca": est,
            "disponiveis": [],
            "em_cooldown": sorted(em_cooldown(perfil_capa, agora)),
            "limitacao": (
                "biblioteca de padrões ausente ou incompleta em "
                f"{est['base']} (falta: {', '.join(faltam)}). "
                "A escolha de padrão fica com quem está criando: o sistema não "
                "tem taxonomia validada para propor P01–P10 e não vai inventar "
                "uma."),
        }
    disponiveis = elegiveis(perfil_capa, nicho, agora)
    return {
        "biblioteca": est,
        "disponiveis": [p["id"] for p in disponiveis],
        "em_cooldown": sorted(em_cooldown(perfil_capa, agora)),
        "limitacao": None if disponiveis else (
            "todos os padrões compatíveis estão em cooldown — reduza "
            "`pattern_cooldown_days` na ficha ou aceite a repetição "
            "conscientemente."),
    }
