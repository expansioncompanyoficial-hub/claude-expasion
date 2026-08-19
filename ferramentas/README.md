# ferramentas/

Scripts para construir a lista do ICP a partir da base pública de CNPJ da Receita Federal.

**Documento que explica o porquê:** https://claude.ai/code/artifact/d7e86fba-1e6a-43a9-b82d-0c7b89cf6205

## Uso

```bash
# 1. Baixe de arquivos.receitafederal.gov.br/dados/cnpj/dados_abertos_cnpj/<AAAA-MM>/
#    todos os Empresas*.zip e Estabelecimentos*.zip e descompacte numa pasta.

python3 extrai_icp.py /pasta/dos/csv saida.csv
python3 prepara_publico.py saida.csv
```

## O que cada um faz

**`extrai_icp.py`** — filtra `CNAE 4781-4/00` + `porte EPP` + `situação ativa`.
Devolve CNPJ, razão social, nome fantasia, município, UF, bairro, CEP, telefone com DDI
e e-mail. Imprime uma amostra rotulada para você conferir se as colunas bateram.

**`prepara_publico.py`** — classifica em feminino / infantil / excluído / indefinido por
palavra no nome, e gera:

| Arquivo | O que é |
|---|---|
| `icp_feminino_infantil.csv` | a lista de trabalho, com classe e motivo |
| `meta_custom_audience.csv` | telefone e e-mail em SHA-256, pronto para o Meta |
| `amostra_conferencia.csv` | 100 registros sorteados **para conferir na mão** |

## Avisos

- **A classificação por nome é heurística e vai errar.** Confira os 100 da amostra antes
  de subir qualquer coisa como público. Acerto abaixo de 70% = ajuste as listas de
  palavras no topo do `prepara_publico.py` e rode de novo.
- **O layout das colunas** está declarado no topo do `extrai_icp.py`. Confira contra
  `gov.br/receitafederal/dados/cnpj-metadados.pdf` antes do primeiro uso — se a Receita
  mudar a ordem, a amostra rotulada que o script imprime denuncia na hora.
- **Testados com dados sintéticos**, não contra a base real: os domínios da Receita e do
  gov.br estavam bloqueados no ambiente onde foram escritos.
- **LGPD:** dado de CNPJ é de pessoa jurídica e está fora da LGPD; telefone e e-mail de
  contato podem ser de pessoa natural. Base legal para prospecção B2B: legítimo interesse.
  O filtro de porte EPP exclui MEI, o que reduz bastante a exposição.
