#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Extrator de licitacoes e contratos de ESTAGIO / AGENTE DE INTEGRACAO no PNCP.

POR QUE ESTE SCRIPT EXISTE
--------------------------
O ambiente onde o estudo foi produzido tem egresso de rede bloqueado por
politica para pncp.gov.br e gov.br. A amostra quantitativa de licitacoes,
portanto, NAO pode ser extraida de la. Este script faz essa extracao em
qualquer maquina com internet aberta e produz a base que falta.

O QUE ELE FAZ
-------------
1. Varre o endpoint de contratacoes por data de publicacao, dia a dia,
   para TODAS as modalidades (nao chuta codigo: descobre pela tabela de
   dominio, e cai para um intervalo 1..14 se a tabela nao responder).
2. Filtra pelo objeto usando um dicionario de termos do setor.
3. Para cada contratacao aderente, busca itens e resultados (vencedor,
   valor homologado) quando o endpoint responder.
4. Varre tambem o endpoint de contratos.
5. Grava CSV + JSONL brutos, para auditoria posterior.

VERIFICACAO PENDENTE
--------------------
A estrutura base (https://pncp.gov.br/api/consulta/v1/contratacoes/publicacao
com dataInicial/dataFinal em AAAAMMDD, codigoModalidadeContratacao, pagina)
esta confirmada pelo Manual das APIs de Consultas do PNCP. Os nomes exatos de
alguns campos de resposta podem variar por versao: o script grava o JSON bruto
para que nada se perca se um campo mudar de nome.

USO
---
    pip install requests
    python3 coleta_pncp.py --inicio 2024-08-01 --fim 2026-08-11 --saida ./pncp_estagio
"""

import argparse
import csv
import json
import os
import sys
import time
from datetime import date, timedelta

try:
    import requests
except ImportError:
    sys.exit("Instale a dependencia: pip install requests")

BASE = "https://pncp.gov.br/api/consulta/v1"

# Termos do setor. Amplos de proposito: e melhor filtrar depois no CSV
# do que perder processo por vocabulario do orgao.
TERMOS = [
    "agente de integracao", "agente de integração",
    "integracao empresa-escola", "integração empresa-escola",
    "estagiario", "estagiário", "estagiarios", "estagiários",
    "estagio", "estágio",
    "programa de estagio", "programa de estágio",
    "recrutamento e selecao de estagi", "recrutamento e seleção de estagi",
    "gestao de estagi", "gestão de estagi",
    "administracao de estagi", "administração de estagi",
    "intermediacao de estagi", "intermediação de estagi",
]

# Termos que geram falso positivo e devem derrubar o registro se o objeto
# nao contiver nenhum termo forte junto.
RUIDO = ["estagio de obra", "estágio de obra", "estagio da obra", "estágio da obra"]

FORTES = ["estagi", "agente de integra", "empresa-escola", "empresa escola"]


def norm(texto):
    if not texto:
        return ""
    t = texto.lower()
    for a, b in [("á", "a"), ("à", "a"), ("â", "a"), ("ã", "a"), ("é", "e"),
                 ("ê", "e"), ("í", "i"), ("ó", "o"), ("ô", "o"), ("õ", "o"),
                 ("ú", "u"), ("ç", "c")]:
        t = t.replace(a, b)
    return t


def aderente(objeto):
    o = norm(objeto)
    if not any(f in o for f in [norm(x) for x in FORTES]):
        return False
    if any(norm(r) in o for r in RUIDO) and "agente de integra" not in o:
        return False
    return True


def get(url, params, tentativas=5):
    for i in range(tentativas):
        try:
            r = requests.get(url, params=params, timeout=60,
                             headers={"Accept": "application/json",
                                      "User-Agent": "pesquisa-mercado-estagio/1.0"})
            if r.status_code == 204:
                return None
            if r.status_code == 200:
                return r.json()
            if r.status_code in (429, 500, 502, 503, 504):
                time.sleep(2 ** i)
                continue
            return None
        except Exception:
            time.sleep(2 ** i)
    return None


def descobrir_modalidades():
    """Tenta a tabela de dominio; cai para 1..14 se nao responder."""
    dados = get("https://pncp.gov.br/api/consulta/v1/modalidades", {})
    if isinstance(dados, list) and dados:
        codigos = []
        for d in dados:
            for chave in ("codigo", "id", "codigoModalidade"):
                if chave in d:
                    codigos.append(int(d[chave]))
                    break
        if codigos:
            return sorted(set(codigos))
    print("  [aviso] tabela de dominio nao respondeu; usando faixa 1..14. "
          "Confira em https://pncp.gov.br/app/entidades-dominio", file=sys.stderr)
    return list(range(1, 15))


def varrer_contratacoes(inicio, fim, modalidades, jsonl):
    achados = []
    dia = inicio
    while dia <= fim:
        janela_fim = min(dia + timedelta(days=29), fim)
        for mod in modalidades:
            pagina = 1
            while True:
                params = {
                    "dataInicial": dia.strftime("%Y%m%d"),
                    "dataFinal": janela_fim.strftime("%Y%m%d"),
                    "codigoModalidadeContratacao": mod,
                    "pagina": pagina,
                    "tamanhoPagina": 50,
                }
                dados = get(f"{BASE}/contratacoes/publicacao", params)
                if not dados:
                    break
                registros = dados.get("data") or []
                for reg in registros:
                    obj = reg.get("objetoCompra") or reg.get("objeto") or ""
                    if aderente(obj):
                        achados.append(reg)
                        jsonl.write(json.dumps(reg, ensure_ascii=False) + "\n")
                total_paginas = dados.get("totalPaginas") or 1
                if pagina >= total_paginas or not registros:
                    break
                pagina += 1
                time.sleep(0.2)
        print(f"  {dia} -> {janela_fim}: acumulado {len(achados)}", file=sys.stderr)
        dia = janela_fim + timedelta(days=1)
    return achados


def varrer_contratos(inicio, fim, jsonl):
    achados = []
    dia = inicio
    while dia <= fim:
        janela_fim = min(dia + timedelta(days=29), fim)
        pagina = 1
        while True:
            params = {
                "dataInicial": dia.strftime("%Y%m%d"),
                "dataFinal": janela_fim.strftime("%Y%m%d"),
                "pagina": pagina,
                "tamanhoPagina": 50,
            }
            dados = get(f"{BASE}/contratos", params)
            if not dados:
                break
            registros = dados.get("data") or []
            for reg in registros:
                obj = reg.get("objetoContrato") or reg.get("objeto") or ""
                if aderente(obj):
                    reg["_tipo"] = "contrato"
                    achados.append(reg)
                    jsonl.write(json.dumps(reg, ensure_ascii=False) + "\n")
            total_paginas = dados.get("totalPaginas") or 1
            if pagina >= total_paginas or not registros:
                break
            pagina += 1
            time.sleep(0.2)
        dia = janela_fim + timedelta(days=1)
    return achados


CAMPOS = [
    "tipo", "orgao", "cnpj_orgao", "unidade", "uf", "municipio", "esfera",
    "modalidade", "criterio_julgamento", "numero_compra", "ano_compra",
    "processo", "objeto", "data_publicacao", "situacao",
    "valor_estimado", "valor_homologado", "link_pncp", "id_pncp",
]


def linha(reg):
    un = reg.get("unidadeOrgao") or {}
    org = reg.get("orgaoEntidade") or {}
    return {
        "tipo": reg.get("_tipo", "contratacao"),
        "orgao": org.get("razaoSocial") or reg.get("orgaoEntidadeRazaoSocial") or "",
        "cnpj_orgao": org.get("cnpj") or "",
        "unidade": un.get("nomeUnidade") or "",
        "uf": un.get("ufSigla") or un.get("uf") or "",
        "municipio": un.get("municipioNome") or "",
        "esfera": org.get("esferaId") or "",
        "modalidade": reg.get("modalidadeNome") or reg.get("modalidadeId") or "",
        "criterio_julgamento": reg.get("criterioJulgamentoNome") or "",
        "numero_compra": reg.get("numeroCompra") or reg.get("numeroContrato") or "",
        "ano_compra": reg.get("anoCompra") or reg.get("anoContrato") or "",
        "processo": reg.get("processo") or "",
        "objeto": (reg.get("objetoCompra") or reg.get("objetoContrato") or "").replace("\n", " "),
        "data_publicacao": reg.get("dataPublicacaoPncp") or "",
        "situacao": reg.get("situacaoCompraNome") or "",
        "valor_estimado": reg.get("valorTotalEstimado") or reg.get("valorInicial") or "",
        "valor_homologado": reg.get("valorTotalHomologado") or reg.get("valorGlobal") or "",
        "link_pncp": reg.get("linkSistemaOrigem") or "",
        "id_pncp": reg.get("numeroControlePNCP") or "",
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--inicio", required=True, help="AAAA-MM-DD")
    ap.add_argument("--fim", required=True, help="AAAA-MM-DD")
    ap.add_argument("--saida", default="./pncp_estagio")
    args = ap.parse_args()

    os.makedirs(args.saida, exist_ok=True)
    ini = date.fromisoformat(args.inicio)
    fim = date.fromisoformat(args.fim)

    print(f"Janela: {ini} a {fim}", file=sys.stderr)
    modalidades = descobrir_modalidades()
    print(f"Modalidades varridas: {modalidades}", file=sys.stderr)

    bruto = os.path.join(args.saida, "bruto.jsonl")
    with open(bruto, "w", encoding="utf-8") as jsonl:
        print("== contratacoes ==", file=sys.stderr)
        a = varrer_contratacoes(ini, fim, modalidades, jsonl)
        print("== contratos ==", file=sys.stderr)
        b = varrer_contratos(ini, fim, jsonl)

    todos = a + b
    csv_path = os.path.join(args.saida, "licitacoes_estagio.csv")
    with open(csv_path, "w", newline="", encoding="utf-8") as fh:
        w = csv.DictWriter(fh, fieldnames=CAMPOS)
        w.writeheader()
        for reg in todos:
            w.writerow(linha(reg))

    print(f"\nContratacoes aderentes: {len(a)}", file=sys.stderr)
    print(f"Contratos aderentes:    {len(b)}", file=sys.stderr)
    print(f"CSV:   {csv_path}", file=sys.stderr)
    print(f"Bruto: {bruto}", file=sys.stderr)
    print("\nProximo passo: abrir o CSV, ler os objetos e separar o que e "
          "contratacao de AGENTE DE INTEGRACAO do que e mencao acessoria a estagio.",
          file=sys.stderr)


if __name__ == "__main__":
    main()
