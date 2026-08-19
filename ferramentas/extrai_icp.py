#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
extrai_icp.py — extrai lojas de vestuario porte EPP da base publica de CNPJ da Receita.

USO
  1) Baixe de https://arquivos.receitafederal.gov.br/dados/cnpj/dados_abertos_cnpj/<AAAA-MM>/
     todos os Empresas*.zip e Estabelecimentos*.zip e descompacte numa pasta.
  2) python3 extrai_icp.py /caminho/da/pasta saida.csv
  3) CONFIRA a amostra que o script imprime antes de confiar no resultado.

O layout dos arquivos esta em https://www.gov.br/receitafederal/dados/cnpj-metadados.pdf
Se a Receita mudar a ordem das colunas, ajuste os indices no bloco COLUNAS abaixo —
o script imprime uma amostra rotulada justamente para voce flagrar isso na hora.
"""
import csv, glob, os, sys

# ---------------- COLUNAS (indice 0-based) — confira contra o PDF de metadados
EMP_CNPJ_BASICO   = 0
EMP_RAZAO_SOCIAL  = 1
EMP_PORTE         = 5      # 00 nao informado · 01 ME · 03 EPP · 05 DEMAIS

EST_CNPJ_BASICO   = 0
EST_CNPJ_ORDEM    = 1
EST_CNPJ_DV       = 2
EST_NOME_FANTASIA = 4
EST_SITUACAO      = 5      # 01 nula · 02 ATIVA · 03 suspensa · 04 inapta · 08 baixada
EST_DATA_INICIO   = 10
EST_CNAE          = 11
EST_BAIRRO        = 17
EST_CEP           = 18
EST_UF            = 19
EST_MUNICIPIO     = 20
EST_DDD1          = 21
EST_TEL1          = 22
EST_EMAIL         = 27
EST_NCOLS         = 30

# ---------------- FILTROS
CNAE_ALVO   = {"4781400"}   # comercio varejista de artigos do vestuario e acessorios
PORTE_ALVO  = {"03"}        # EPP
SITUACAO_OK = {"02"}        # ativa

ENC = "latin-1"
DELIM = ";"

def limpa(v):
    return (v or "").strip().strip('"').strip()

def carrega_epps(pasta):
    """Passo 1 — le os arquivos de EMPRESAS e guarda os cnpj_basico com porte EPP."""
    arquivos = sorted(glob.glob(os.path.join(pasta, "*EMPRECSV*"))) or \
               sorted(glob.glob(os.path.join(pasta, "*Empresas*")))
    if not arquivos:
        sys.exit("ERRO: nenhum arquivo de EMPRESAS encontrado em " + pasta)
    epps, razao = set(), {}
    amostra = []
    for caminho in arquivos:
        print("  lendo", os.path.basename(caminho))
        with open(caminho, encoding=ENC, errors="replace", newline="") as f:
            for linha in csv.reader(f, delimiter=DELIM, quotechar='"'):
                if len(linha) <= EMP_PORTE:
                    continue
                if len(amostra) < 2:
                    amostra.append(linha)
                if limpa(linha[EMP_PORTE]) in PORTE_ALVO:
                    b = limpa(linha[EMP_CNPJ_BASICO])
                    epps.add(b)
                    razao[b] = limpa(linha[EMP_RAZAO_SOCIAL])
    print("\n  AMOSTRA DE EMPRESAS — confira se os rotulos batem:")
    for l in amostra:
        print("    cnpj_basico=%r | razao_social=%r | porte=%r"
              % (l[EMP_CNPJ_BASICO], l[EMP_RAZAO_SOCIAL][:40], l[EMP_PORTE]))
    return epps, razao

def extrai(pasta, saida):
    print("Passo 1/2 — carregando empresas porte EPP")
    epps, razao = carrega_epps(pasta)
    print("  -> %d CNPJs basicos com porte EPP\n" % len(epps))

    arquivos = sorted(glob.glob(os.path.join(pasta, "*ESTABELE*"))) or \
               sorted(glob.glob(os.path.join(pasta, "*Estabelecimentos*")))
    if not arquivos:
        sys.exit("ERRO: nenhum arquivo de ESTABELECIMENTOS encontrado em " + pasta)

    print("Passo 2/2 — filtrando estabelecimentos")
    n_lidas = n_cnae = n_ok = 0
    amostra = []
    with open(saida, "w", encoding="utf-8", newline="") as fo:
        w = csv.writer(fo)
        w.writerow(["cnpj", "razao_social", "nome_fantasia", "municipio", "uf",
                    "bairro", "cep", "telefone", "email", "data_inicio"])
        for caminho in arquivos:
            print("  lendo", os.path.basename(caminho))
            with open(caminho, encoding=ENC, errors="replace", newline="") as f:
                for linha in csv.reader(f, delimiter=DELIM, quotechar='"'):
                    n_lidas += 1
                    if len(linha) < EST_NCOLS:
                        continue
                    if limpa(linha[EST_CNAE]) not in CNAE_ALVO:
                        continue
                    n_cnae += 1
                    if limpa(linha[EST_SITUACAO]) not in SITUACAO_OK:
                        continue
                    base = limpa(linha[EST_CNPJ_BASICO])
                    if base not in epps:
                        continue
                    ddd, tel = limpa(linha[EST_DDD1]), limpa(linha[EST_TEL1])
                    fone = ("55" + ddd + tel) if (ddd and tel) else ""
                    cnpj = base + limpa(linha[EST_CNPJ_ORDEM]) + limpa(linha[EST_CNPJ_DV])
                    reg = [cnpj, razao.get(base, ""), limpa(linha[EST_NOME_FANTASIA]),
                           limpa(linha[EST_MUNICIPIO]), limpa(linha[EST_UF]),
                           limpa(linha[EST_BAIRRO]), limpa(linha[EST_CEP]),
                           fone, limpa(linha[EST_EMAIL]).lower(),
                           limpa(linha[EST_DATA_INICIO])]
                    if len(amostra) < 3:
                        amostra.append(reg)
                    w.writerow(reg)
                    n_ok += 1

    print("\n  linhas lidas ............ %d" % n_lidas)
    print("  com o CNAE alvo ......... %d" % n_cnae)
    print("  ativas E porte EPP ...... %d   <- a lista" % n_ok)
    print("\n  AMOSTRA DA SAIDA — confira antes de usar:")
    for r in amostra:
        print("    %s | %s | %s/%s | fone=%s | email=%s" % (r[0], r[2][:28], r[3], r[4], r[7], r[8]))
    print("\nPronto: %s" % saida)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit("uso: python3 extrai_icp.py <pasta_dos_csv> <saida.csv>")
    extrai(sys.argv[1], sys.argv[2])
