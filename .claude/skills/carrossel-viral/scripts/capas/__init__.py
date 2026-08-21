"""Geração de fundo de capa — módulo interno da máquina de carrosséis.

Entra entre a headline aprovada e a composição da capa. Não é sistema
separado: lê a mesma ficha de cliente, grava ao lado das mesmas peças e
devolve um arquivo que o renderizador que já existe usa como `foto_fundo`.
"""
__all__ = ["esquema", "estrategia", "fluxo", "imagem", "marca", "memoria",
           "padroes", "prompt", "provedor", "qa", "raiz"]
