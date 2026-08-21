#!/usr/bin/env python3
"""Image Provider Adapter — de onde a imagem vem.

Interface substituível, com ordem de preferência declarada. Hoje esta conta
não tem gerador de imagem conectado, e o sistema diz isso em vez de fingir:
os dois provedores sempre disponíveis são o **manual** (o operador envia o
arquivo) e o **briefing** (nenhuma imagem, só o prompt pronto para levar a
outra ferramenta).

Regra que vale para qualquer provedor futuro: **prompt não é imagem**. Um
provedor que devolve texto e nenhum arquivo tem de reportar
`status='generation_failed'`. Chamar isso de geração concluída foi o defeito
que o operador mandou não repetir.

Credencial nunca é lida para dentro de um retorno, nem gravada em job, log ou
JSON. `disponiveis()` diz *se* a variável existe, jamais o valor.
"""
import os
import shutil
from pathlib import Path

from .raiz import capas as dir_capas, relativo


class ErroProvedor(RuntimeError):
    pass


class Provedor:
    """Contrato mínimo. Implementar `gera` e declarar `custo_por_imagem`."""

    nome = "abstrato"
    custo_por_imagem = 0.0
    gera_imagem = False

    def disponivel(self):
        return False

    def gera(self, pedido, destino):
        """Recebe `{prompt, negative_prompt, width, height, seed, n}`.

        Devolve `{arquivos: [Path], custo: float, avisos: [str]}`.
        Lista de arquivos vazia significa que NÃO houve geração.
        """
        raise NotImplementedError


class Manual(Provedor):
    """O operador traz o arquivo. Sempre disponível, custo zero.

    É o caminho honesto quando não há gerador: a imagem existe de verdade,
    veio de fora, e o sistema faz o resto — QA, corte, composição, registro.
    """

    nome = "manual"
    gera_imagem = True

    def disponivel(self):
        return True

    def gera(self, pedido, destino):
        origens = [Path(p) for p in (pedido.get("arquivos") or [])]
        if not origens:
            raise ErroProvedor(
                "provedor manual sem arquivo: informe `arquivos` com o caminho "
                "da imagem que você quer usar como fundo.")
        fora, avisos = [], []
        destino = Path(destino)
        destino.mkdir(parents=True, exist_ok=True)
        for i, o in enumerate(origens, 1):
            if not o.exists():
                raise ErroProvedor(f"arquivo não encontrado: {o}")
            if o.suffix.lower() not in (".png", ".jpg", ".jpeg", ".webp"):
                raise ErroProvedor(
                    f"{o.name}: formato não suportado. Use PNG, JPG ou WebP.")
            alvo = destino / f"bruto-{i:02d}{o.suffix.lower()}"
            shutil.copy2(o, alvo)
            fora.append(alvo)
        return {"arquivos": fora, "custo": 0.0, "avisos": avisos}


class Briefing(Provedor):
    """Nenhuma geração. Entrega o prompt pronto e diz que não gerou.

    Existe para o caso em que não há provedor: o trabalho de estratégia,
    conceito e prompt não se perde, mas ninguém confunde isso com uma capa.
    """

    nome = "briefing"
    gera_imagem = False

    def disponivel(self):
        return True

    def gera(self, pedido, destino):
        return {
            "arquivos": [],
            "custo": 0.0,
            "avisos": [
                "modo briefing: nenhum provedor de imagem configurado, então "
                "nenhuma imagem foi gerada. O prompt e o negative prompt estão "
                "prontos para uso em outra ferramenta; traga o arquivo de "
                "volta pelo provedor manual."],
        }


# Provedores por API entram aqui. A chave é o nome da variável de ambiente que
# guarda a credencial — o valor nunca sai deste dicionário.
POR_API = {
    # "replicate": "REPLICATE_API_TOKEN",
    # "openai":    "OPENAI_API_KEY",
}


def disponiveis():
    """O que dá para usar agora, sem revelar credencial nenhuma."""
    fora = [{"nome": Manual.nome, "gera_imagem": True, "custo": 0.0,
             "configurado": True},
            {"nome": Briefing.nome, "gera_imagem": False, "custo": 0.0,
             "configurado": True}]
    for nome, var in POR_API.items():
        fora.insert(0, {"nome": nome, "gera_imagem": True, "custo": None,
                        "configurado": bool(os.environ.get(var)),
                        "variavel": var})
    return fora


def escolhe(preferido=None):
    """Ordem de preferência do item 7.5, de cima para baixo."""
    if preferido == "manual":
        return Manual()
    if preferido == "briefing":
        return Briefing()
    for nome, var in POR_API.items():
        if (preferido in (None, nome)) and os.environ.get(var):
            raise ErroProvedor(
                f"provedor {nome} tem credencial em {var} mas o adaptador "
                "ainda não foi implementado. Implemente-o ou use "
                "`manual`/`briefing`.")
    if preferido:
        raise ErroProvedor(
            f"provedor {preferido!r} não está disponível. "
            f"Disponíveis: {', '.join(p['nome'] for p in disponiveis() if p['configurado'])}.")
    return Briefing()


def orcamento(provedor, variacoes, regeneracoes=0):
    """Custo antes de gastar. Sem isso não existe teto."""
    n = variacoes + regeneracoes
    unidade = provedor.custo_por_imagem
    return {"provedor": provedor.nome, "imagens": n,
            "custo_por_imagem": unidade, "custo_total": round(unidade * n, 4),
            "gera_imagem": provedor.gera_imagem}
