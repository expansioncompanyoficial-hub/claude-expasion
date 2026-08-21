#!/usr/bin/env python3
"""Cover Composer — liga o fundo aprovado ao carrossel.

Este módulo não desenha nada. A capa final continua sendo montada pelo
renderizador que já existe (`render_carrossel.py`), com a fonte, a paleta, a
margem e a régua de contraste da marca. O que muda aqui é uma linha do spec:
o slide 1 passa a ter `foto_fundo` apontando para o fundo aprovado.

Essa separação é o ponto do pedido inteiro. **Fundo e capa final são entregas
diferentes:** o fundo não tem headline, nem logo, nem texto; a capa final tem
tudo isso por cima. Guardar os dois separados é o que permite trocar a
headline sem gerar imagem de novo — e é o que impede alguém de mandar para o
cliente o arquivo errado.
"""
import json
from pathlib import Path

from .raiz import raiz, relativo

# Quando a capa precisa ser refeita e quando não precisa. Editar texto interno
# não toca no fundo: seria pagar geração de imagem por causa de vírgula.
GATILHOS_REGERAR = ("headline", "marca", "conceito_rejeitado", "pedido_do_operador")


def aplica(spec, job, variacao_id=None):
    """Devolve o spec com o fundo aprovado no slide 1.

    Não altera o spec de entrada: peça publicada não muda por efeito colateral.
    """
    escolhida = variacao_id or job.get("selected") or job.get("recommended")
    if not escolhida:
        raise ValueError(
            "nenhuma variação selecionada. Escolha antes de compor — compor "
            "com a recomendada sem alguém olhar é decidir pelo operador.")
    v = next((x for x in job["variations"] if x["id"] == escolhida), None)
    if v is None:
        raise ValueError(f"variação {escolhida!r} não está no job.")

    arquivo = raiz() / v["file"]
    if not arquivo.exists():
        raise FileNotFoundError(
            f"o fundo {v['file']} não está mais no disco. "
            "Os fundos ficam em SERVICO/dados/, que é estado local: se a peça "
            "precisa sobreviver, exporte o PNG final para CARROSSEIS/.")

    novo = json.loads(json.dumps(spec))
    if not novo.get("slides"):
        raise ValueError("spec sem slides.")
    capa = novo["slides"][0]
    if capa.get("tipo") != "capa":
        raise ValueError(
            f"o primeiro slide é {capa.get('tipo')!r}, não `capa`. "
            "O fundo de capa não entra em slide interno.")

    capa["foto_fundo"] = str(arquivo)
    # A vaga deixa de existir: havia um brief ali justamente porque não havia
    # imagem. Manter os dois faria o renderizador desenhar a moldura tracejada
    # por cima da foto.
    capa.pop("imagem_brief", None)

    novo.setdefault("capa_geracao", {})
    novo["capa_geracao"] = {
        "cover_generation_id": job["job_id"],
        "cover_background_id": v["id"],
        "cover_background_file": v["file"],
        "cover_status": job["status"],
        "provider": job.get("provider"),
        "prompt": v.get("prompt"),
        "pattern": v.get("pattern"),
    }
    return novo


def precisa_regerar(motivo):
    """Só estes quatro motivos justificam gerar imagem de novo."""
    return motivo in GATILHOS_REGERAR
