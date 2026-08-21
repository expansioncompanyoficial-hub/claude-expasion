#!/usr/bin/env python3
"""Injeta um estado salvo numa build nova do Estúdio.

    python3 mesclar.py pagina.html estado.json saida.html

Toda vez que o Estúdio é reconstruído, o arquivo novo nasce com o estado
vazio — e a versão publicada tem o trabalho de quem usou. Publicar a build
crua por cima apagaria tudo. Este script faz o caminho contrário: pega o
estado vivo (extraído da página publicada) e o coloca dentro da build nova.

Migra também os ids de template que mudaram de nome. É o passo que ninguém
lembra: o estado guarda o id da peça, e sem migrar as peças antigas caem no
template padrão — o trabalho parece perdido sem nenhum erro aparecer.
"""
import json
import re
import sys
from pathlib import Path

# id antigo -> id novo. Cresce a cada renomeação.
MIGRA_TEMPLATE = {"brands1": "exp02", "brands2": "exp03", "brands3": "exp04"}

# Campos que peças antigas não têm e que o código novo espera.
PADROES_PECA = {"capas": [], "capa": None, "legenda": "", "scrim": "medio",
                "status": "rascunho", "ajustes": {}}

# Campos de ficha que clientes antigos não têm. Vai por id, e não por padrão
# geral, porque o degradê da capa é ativo de marca: quem não tem um pinta a
# ênfase com a própria cor de destaque. Um padrão global daria o laranja da
# Expansion para a Prime, a Ciés e todo mundo.
CAMPOS_CLIENTE = {
    "expansion": {"gradTexto": "linear-gradient(90deg,#ff9901 0%,#ff6c01 100%)"},
}


def migra(estado):
    trocas = []
    for cliente in estado.get("clientes", []):
        for campo, valor in CAMPOS_CLIENTE.get(cliente.get("id"), {}).items():
            if cliente.setdefault(campo, valor) == valor:
                trocas.append(f"{cliente['nome']}: {campo} = {valor}")
        for peca in cliente.get("pecas", []):
            antigo = peca.get("tpl")
            if antigo in MIGRA_TEMPLATE:
                peca["tpl"] = MIGRA_TEMPLATE[antigo]
                trocas.append(f"{cliente['nome']} · {peca['nome']}: {antigo} → {peca['tpl']}")
            for campo, valor in PADROES_PECA.items():
                peca.setdefault(campo, json.loads(json.dumps(valor)))
    return trocas


def extrai(html):
    """Devolve o JSON do estado de uma página publicada."""
    m = re.search(r'<script type="application/json" id="estado-salvo">(.*?)</script>',
                  html, re.S)
    return m.group(1) if m else None


def main(pagina, estado_json, saida):
    estado = json.loads(Path(estado_json).read_text(encoding="utf-8"))
    for linha in migra(estado):
        print("  " + linha)

    corpo = (json.dumps(estado, ensure_ascii=False)
             .replace("<", "\\u003c").replace("-->", "--\\u003e"))
    html = Path(pagina).read_text(encoding="utf-8")
    novo, n = re.subn(
        r'(<script type="application/json" id="estado-salvo">).*?(</script>)',
        lambda m: m.group(1) + corpo + m.group(2), html, count=1, flags=re.S)
    if n != 1:
        raise SystemExit("não encontrei a tag `estado-salvo` na página")

    Path(saida).write_text(novo, encoding="utf-8")
    clientes = len(estado.get("clientes", []))
    pecas = sum(len(c.get("pecas", [])) for c in estado.get("clientes", []))
    print(f"{saida}  ·  {len(novo) / 1024:.0f} KB  ·  {clientes} clientes, {pecas} peças")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], sys.argv[3])
