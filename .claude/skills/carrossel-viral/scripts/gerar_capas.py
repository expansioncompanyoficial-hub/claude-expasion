#!/usr/bin/env python3
"""
Gera N capas de um mesmo tema, para escolher a que vai pro feed.

    python3 gerar_capas.py capas.json saida.html

A capa é o único slide que decide se o carrossel vai ser lido. Gerar uma só é
apostar; gerar dez e escolher é trabalhar. Este script rende as dez lado a lado,
na mesma imagem e nos mesmos tokens, para a comparação ser só de texto.

O spec é o mesmo do renderizador, trocando `slides` por `headlines`:

    {
      "marca": "EXPANSION", "handle": "@assessoriaexpansion",
      "tokens": {...}, "fontes": [...],
      "imagem": "foto.jpg",          // a mesma para todas
      "capa_scrim": "medio",
      "capa_estilo": "impacto",
      "headlines": [
        {"texto": "A *morte* da vitrine de dezembro", "padrao": "morte-fim"},
        "Uma string também vale, sem padrão declarado"
      ]
    }

`padrao` é opcional e serve para a ficha: é o campo que, meses adiante, responde
qual padrão de hook funciona neste nicho. Sem ele a recalibração fica cega.
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from render_carrossel import build  # noqa: E402


def normaliza(h):
    if isinstance(h, str):
        return {"texto": h, "padrao": None}
    return {"texto": h["texto"], "padrao": h.get("padrao")}


def main(entrada, saida):
    spec = json.loads(Path(entrada).read_text(encoding="utf-8"))
    heads = [normaliza(h) for h in spec.pop("headlines")]
    if not heads:
        raise SystemExit("Nenhuma headline no spec.")

    imagem = spec.pop("imagem", None)
    spec["slides"] = [
        {
            "tipo": "capa",
            "headline": h["texto"],
            **({"foto_fundo": imagem} if imagem else {}),
        }
        for h in heads
    ]
    Path(saida).write_text(build(spec), encoding="utf-8")

    largura = max(len(h["texto"]) for h in heads)
    print(f"HTML: {saida}  ({len(heads)} capas)")
    for i, h in enumerate(heads, 1):
        pad = h["padrao"] or "—"
        print(f"  {i:>2}. [{pad:>14}] {len(h['texto']):>3} car.  {h['texto']}")
    if largura > 70:
        print("\nAviso: headline acima de 70 caracteres encolhe para caber nos "
              "439px da capa. Acima de ~85 ela fica pequena demais para o feed.")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
