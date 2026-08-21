#!/usr/bin/env python3
"""Descoberta da raiz do projeto e dos diretórios de trabalho.

Existe por um motivo específico: o pacote de origem trazia caminhos absolutos
da máquina de quem o escreveu — o diretório de trabalho de um Mac, escrito por
extenso dentro do código. Um caminho assim funciona em um computador e em
nenhum outro, e falha calado: o programa não acha o arquivo, segue com a lista
vazia e ninguém vê erro nenhum.

O teste `TestSemCaminhoAbsoluto` varre estes arquivos atrás de caminho de
outra máquina. Ele é literal de propósito — nem em comentário, porque
comentário vira código copiado.

Aqui a raiz é **descoberta**, não configurada. Sobe a partir deste arquivo até
achar a marca do repositório. Variável de ambiente pode sobrescrever, mas
nunca é necessária para rodar os testes.
"""
import os
from pathlib import Path

# Arquivos que só existem na raiz deste repositório. `.git` sozinho não serve:
# um worktree ou submódulo também tem `.git`, e aí a raiz sairia errada.
MARCAS = ("CLAUDE.md", ".claude")


def raiz(inicio=None):
    """Sobe a partir de `inicio` até achar a raiz do repositório."""
    forcada = os.environ.get("EXPANSION_RAIZ")
    if forcada:
        p = Path(forcada).expanduser().resolve()
        if not p.is_dir():
            raise RuntimeError(
                f"EXPANSION_RAIZ aponta para {p}, que não é um diretório.")
        return p

    atual = Path(inicio or __file__).resolve()
    for candidato in [atual, *atual.parents]:
        if candidato.is_dir() and all((candidato / m).exists() for m in MARCAS):
            return candidato
    raise RuntimeError(
        "não achei a raiz do repositório a partir de "
        f"{atual} — nenhum diretório acima tem {' e '.join(MARCAS)}. "
        "Rode de dentro do repositório ou defina EXPANSION_RAIZ.")


def clientes():
    return raiz() / "CLIENTES"


def carrosseis():
    return raiz() / "CARROSSEIS"


def capas():
    """Onde os fundos gerados e as capas compostas ficam.

    Fora do controle de versão de propósito: são binários grandes e voláteis,
    e o que precisa ser versionado é a peça final em `CARROSSEIS/`.
    """
    d = raiz() / "SERVICO" / "dados" / "capas"
    d.mkdir(parents=True, exist_ok=True)
    return d


def biblioteca():
    """A biblioteca de padrões visuais, quando ela existir.

    Devolve o caminho mesmo que não exista — quem chama decide o que fazer com
    a ausência. Ver `padroes.py`, que degrada em vez de quebrar.
    """
    return raiz() / ".claude" / "skills" / "carrossel-viral" / "referencias-capa"


def relativo(caminho):
    """Caminho relativo à raiz, para gravar em JSON sem vazar a máquina."""
    p = Path(caminho).resolve()
    try:
        return str(p.relative_to(raiz()))
    except ValueError:
        return str(p)
