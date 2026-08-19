#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
prepara_publico.py — separa moda feminina/infantil e gera o arquivo de upload do Meta.

USO
  python3 prepara_publico.py saida.csv

GERA
  icp_feminino_infantil.csv  — a lista de trabalho, com a classificacao e o motivo
  meta_custom_audience.csv   — so phone/email, no formato que o Meta aceita
  amostra_conferencia.csv    — 100 registros sorteados PARA VOCE CONFERIR NA MAO

ATENCAO
  A classificacao por nome fantasia e HEURISTICA. Vai errar para os dois lados.
  Confira a amostra antes de subir qualquer coisa como publico. Se a taxa de acerto
  ficar abaixo de 70%, ajuste as listas de palavras abaixo em vez de seguir em frente.
"""
import csv, re, sys, hashlib

FEMININO = ["moda fem","feminin","boutique","modas","fashion","closet","chic","glam",
            "bella","bela","dona","mulher","lingerie","intima","vestido","atelie",
            "ateliê","styl","look","trend","charme","elegan","diva","donna","femme"]
INFANTIL = ["kids","infantil","baby","bebe","bebê","crianc","criança","teen","junior",
            "júnior","pimpolho","petit","mini","nenem","neném","fofur"]
EXCLUI   = ["masculin","men","homem","barbear","militar","uniform","epi ","seguranca",
            "segurança","surf","pesca","calcad","calçad","sapat","tenis","tênis",
            "otica","ótica","joalher","relojoar","cama mesa","enxoval"]

def norm(s):
    s = (s or "").lower()
    s = re.sub(r"[^a-zà-ú0-9 ]", " ", s)
    return re.sub(r"\s+", " ", s).strip()

def classifica(fantasia, razao):
    t = norm(fantasia) + " " + norm(razao)
    for p in EXCLUI:
        if p in t:
            return "excluido", "palavra de exclusao: " + p.strip()
    for p in INFANTIL:
        if p in t:
            return "infantil", "palavra: " + p.strip()
    for p in FEMININO:
        if p in t:
            return "feminino", "palavra: " + p.strip()
    return "indefinido", "nenhuma palavra bateu"

def sha(v):
    v = (v or "").strip().lower()
    return hashlib.sha256(v.encode()).hexdigest() if v else ""

def main(entrada):
    linhas = list(csv.DictReader(open(entrada, encoding="utf-8")))
    for r in linhas:
        r["classe"], r["motivo"] = classifica(r.get("nome_fantasia"), r.get("razao_social"))

    alvo = [r for r in linhas if r["classe"] in ("feminino", "infantil")]

    campos = list(linhas[0].keys()) if linhas else []
    with open("icp_feminino_infantil.csv", "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=campos); w.writeheader(); w.writerows(alvo)

    # Meta aceita telefone e email em texto puro (ele aplica o hash) ou ja em SHA-256.
    # Aqui vai o hash pronto — nao sai dado pessoal em claro do seu computador.
    com_contato = 0
    with open("meta_custom_audience.csv", "w", encoding="utf-8", newline="") as f:
        w = csv.writer(f); w.writerow(["phone", "email"])
        for r in alvo:
            fone, mail = r.get("telefone", ""), r.get("email", "")
            if fone or mail:
                w.writerow([sha(fone), sha(mail)]); com_contato += 1

    passo = max(1, len(alvo) // 100)
    with open("amostra_conferencia.csv", "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=campos + ["confere_sim_nao"]); w.writeheader()
        for r in alvo[::passo][:100]:
            r2 = dict(r); r2["confere_sim_nao"] = ""; w.writerow(r2)

    tot = len(linhas)
    print("total na entrada .......... %d" % tot)
    for c in ("feminino", "infantil", "excluido", "indefinido"):
        n = sum(1 for r in linhas if r["classe"] == c)
        print("  %-11s ........... %5d  (%4.1f%%)" % (c, n, 100.0*n/tot if tot else 0))
    print("\nlista de trabalho ......... %d  -> icp_feminino_infantil.csv" % len(alvo))
    print("com telefone ou email ..... %d  (%4.1f%%)  -> meta_custom_audience.csv"
          % (com_contato, 100.0*com_contato/len(alvo) if alvo else 0))
    print("\n>>> ABRA amostra_conferencia.csv E CONFIRA OS 100 NA MAO ANTES DE SUBIR. <<<")
    print(">>> Acerto abaixo de 70%% = ajuste as palavras e rode de novo.        <<<")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("uso: python3 prepara_publico.py <saida_do_extrai_icp.csv>")
    main(sys.argv[1])
