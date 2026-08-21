#!/usr/bin/env python3
"""Memória de aprovação — o que foi gerado, escolhido, recusado e por quê.

Grava ao lado das peças, em `SERVICO/dados/capas/<job>/job.json`, pelo mesmo
motivo que o resto do serviço grava em disco: o Supabase está modelado
(`SERVICO/migracoes/001-inicial.sql`) mas não está autorizado nesta conta, e a
classe `Deposito` do serviço já existe como a costura para trocar. Quando o
banco entrar, este módulo vira duas queries — o formato do registro já é o das
tabelas.

O que a memória serve para responder, e por isso nada aqui é opcional:

  · qual padrão visual esta marca já usou nos últimos 30 dias
  · qual conceito foi aprovado e qual foi recusado, com motivo
  · qual prompt e qual seed produziram o fundo que entrou no ar

Sem o motivo da recusa, a regeneração repete o mesmo erro com outra cor.
"""
import json
import re
import uuid
from datetime import datetime, timezone
from pathlib import Path

from .esquema import ESTADOS
from .raiz import capas as dir_capas, relativo

# Transições permitidas. Um job não pula de `draft` para `approved`: cada
# passo tem de ter acontecido, e é a máquina de estados que garante isso.
TRANSICOES = {
    "draft": ("generating", "generation_failed", "rejected"),
    "generating": ("generated", "generation_failed"),
    "generated": ("qa_failed", "ready_for_review"),
    "qa_failed": ("generating", "adjustments_requested", "rejected"),
    "ready_for_review": ("selected", "adjustments_requested", "rejected"),
    "selected": ("approved", "adjustments_requested", "rejected"),
    "adjustments_requested": ("generating", "rejected"),
    "approved": (),
    "rejected": (),
    "generation_failed": ("generating", "rejected"),
}


class TransicaoInvalida(ValueError):
    pass


def agora():
    return datetime.now(timezone.utc).isoformat()


def novo_id(brand_id):
    limpo = re.sub(r"[^a-z0-9]+", "-", (brand_id or "x").lower()).strip("-")
    return f"{limpo}-{uuid.uuid4().hex[:10]}"


def pasta(job_id):
    d = dir_capas() / re.sub(r"[^a-zA-Z0-9_-]", "", job_id)
    d.mkdir(parents=True, exist_ok=True)
    return d


def grava(job):
    d = pasta(job["job_id"])
    (d / "job.json").write_text(
        json.dumps(job, ensure_ascii=False, indent=2), encoding="utf-8")
    return d / "job.json"


def le(job_id):
    p = pasta(job_id) / "job.json"
    if not p.exists():
        raise FileNotFoundError(f"job {job_id} não existe em {relativo(p)}")
    return json.loads(p.read_text(encoding="utf-8"))


def transiciona(job, novo, quem="sistema", motivo=""):
    atual = job.get("status", "draft")
    if novo not in ESTADOS:
        raise TransicaoInvalida(f"estado {novo!r} não existe.")
    if novo not in TRANSICOES.get(atual, ()):
        raise TransicaoInvalida(
            f"não dá para ir de {atual!r} para {novo!r}. "
            f"De {atual!r} só se vai para: "
            f"{', '.join(TRANSICOES.get(atual, ())) or 'lugar nenhum'}.")
    job["status"] = novo
    job.setdefault("historico", []).append(
        {"de": atual, "para": novo, "quem": quem, "motivo": motivo, "em": agora()})
    return job


def registra_feedback(job, variacao_id, decisao, motivo="", quem="operador",
                      eixo=""):
    """Aprovação, recusa e o eixo do defeito — é o que a regeneração lê."""
    if decisao not in ("aprovado", "recusado", "ajuste"):
        raise ValueError("decisão precisa ser aprovado, recusado ou ajuste.")
    if decisao != "aprovado" and not motivo.strip():
        raise ValueError(
            "recusa sem motivo não serve para nada: a próxima geração repete "
            "o mesmo erro. Diga o que está errado.")
    job.setdefault("feedback", []).append({
        "variacao": variacao_id, "decisao": decisao, "motivo": motivo.strip(),
        "eixo": eixo, "quem": quem, "em": agora()})
    return job


def marca_padrao_usado(perfil_capa, padrao_id, quando=None):
    """Alimenta o cooldown. Sem isso o mesmo padrão volta na semana seguinte."""
    if not padrao_id:
        return perfil_capa
    recentes = [r for r in (perfil_capa.get("recent_pattern_ids") or [])
                if not (isinstance(r, dict) and r.get("id") == padrao_id)]
    recentes.append({"id": padrao_id, "em": quando or agora()})
    perfil_capa["recent_pattern_ids"] = recentes[-40:]
    return perfil_capa
