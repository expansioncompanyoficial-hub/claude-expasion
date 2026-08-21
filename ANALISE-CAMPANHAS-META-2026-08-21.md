# ANÁLISE DE CAMPANHAS META — TODO O HISTÓRICO

**Data:** 2026-08-21
**Fonte:** Meta Ads MCP (`ads_get_ad_entities`), nível campanha, `date_preset=maximum`
**Dados brutos:** `ANALISE-CAMPANHAS-META-2026-08-21.json`

---

## 1. Escopo e limites desta coleta

Quatro contas foram lidas. **Uma foi excluída**: a `1059582889165858`
(Clau'kidstory) volta do MCP com `is_ads_mcp_enabled: false` — a Meta ainda não
liberou o Ads MCP para ela, e o contrato da ferramenta proíbe usar a conta ou
qualquer objeto abaixo dela. Justamente a cliente que configuramos na
plataforma é a única que este canal não enxerga.

O que **não** está nesta análise, e por quê:

| Não avaliado | Motivo |
|---|---|
| ROAS e receita | Não solicitei `purchase_roas` / `action_values`; a conclusão sobre viabilidade de CPA depende do ticket, que não está aqui |
| Qualidade de criativo | Exigiria ver imagem e vídeo — nenhum modelo de texto conclui isso a partir de métrica |
| Público e segmentação | Coleta foi em nível de campanha; público vive no conjunto de anúncios |
| Recorte temporal | `maximum` agrega tudo; não separa sazonalidade nem antes/depois de mudanças |

Sobre "resultado indisponível": quando a API devolve `Not available`, significa
que **nenhum evento foi atribuído àquela campanha no período**. Não dá para
distinguir, só por este dado, entre "o evento não aconteceu" e "aconteceu e não
foi medido". Nos dois casos o efeito prático é o mesmo: **a otimização rodou sem
sinal de retorno.**

---

## 2. Panorama

| Conta | Campanhas | Investido | Impressões | Cliques | CTR | CPC | CPM |
|---|---:|---:|---:|---:|---:|---:|---:|
| The Expanders - CA01 | 8 | R$ 2.974,48 | 35.712 | 986 | 2,76% | R$ 3,02 | R$ 83,29 |
| Kauã Catini | 22 | R$ 2.541,08 | 198.724 | 6.059 | 3,05% | R$ 0,42 | R$ 12,79 |
| TEIA 2025 - Fórum | 50 | R$ 24.236,46 | 1.815.248 | 33.137 | 1,83% | R$ 0,73 | R$ 13,35 |
| Kauã Catini (Read-Only, INR) | 2 | — | — | — | — | — | — |
| **Total (BRL)** | **82** | **R$ 29.752,02** | **2.049.684** | **40.182** | **1,96%** | **R$ 0,74** | **R$ 14,51** |

A conta em INR tem duas campanhas ativas ("Traffic Campaign", "Sales Campaign")
e **nenhuma métrica** em `maximum` — nunca veicularam.

---

## 3. Achados, do mais caro para o menos caro

### A1 · R$ 2.440,72 gastos em MQL sem um único MQL atribuído

**Conta:** The Expanders - CA01 · **Origem:** dado real

As duas campanhas `LOJA DE ROUPA - MQL` otimizam para a conversão personalizada
`offsite_conversion.custom.1853838955311144`. A API devolve `Not available` para
as duas. Isso é **82% de tudo que a conta já gastou**.

| Campanha | Status | Gasto | CTR | CPC | CPM | MQL |
|---|---|---:|---:|---:|---:|---:|
| LOJA DE ROUPA - MQL - MF 06/07 | **ATIVA** | R$ 2.096,16 | 2,60% | R$ 4,43 | R$ 115,02 | — |
| LOJA DE ROUPA - MQL - MF 01/06 | pausada | R$ 344,56 | 4,77% | R$ 1,64 | R$ 78,22 | — |

Dois problemas empilhados, e o segundo é o pior:

1. A campanha **ativa é pior que a pausada em todos os eixos** — CTR quase
   metade, CPC 2,7× maior, CPM 47% maior — e gastou 6× mais.
2. Se a conversão personalizada não está disparando, o algoritmo **nunca teve
   sinal para otimizar**. Os R$ 2.096 da campanha ativa foram entregues no
   escuro.

**Ação (nesta ordem):** abrir o Gerenciador de Eventos e verificar se a
conversão personalizada `1853838955311144` registrou eventos nos últimos 30
dias. Se não registrou, **pausar a campanha ativa hoje** — não é otimização de
verba, é parar de pagar por um sinal que não existe. Só depois discutir criativo.

### A2 · R$ 8.134,64 no total foram investidos em campanhas de conversão sem resultado atribuído

**Todas as contas** · **Origem:** cálculo sobre dado real

27% de tudo que foi investido está em 14 campanhas cujo evento-objetivo voltou
`Not available`. Além das duas do A1:

| Campanha | Conta | Gasto | Objetivo |
|---|---|---:|---|
| [VENDAS] [LOTE ZERO] [BLOCO 2] [EVENTO PRINCIPAL] | TEIA | R$ 1.038,59 | Compras |
| [VENDAS] [LOTE ZERO] [WORKSHOP 1] [FONO E ABA] | TEIA | R$ 915,49 | Compras |
| [VENDAS] [LOTE ZERO] [WORKSHOP 2] [MUSICOTERAPIA] | TEIA | R$ 904,80 | Compras |
| [VENDAS] [LOTE ZERO] [WORKSHOP 4] [FISIO E PSICOMOTRICIDADE] | TEIA | R$ 865,85 | Compras |
| [SO] [VENDAS] [LOTE1] [WORKSHOP 5] [NEUROMODULAÇÃO] | TEIA | R$ 557,38 | Compras |
| [SO] [WORKSHOP DE EDUCAÇÃO INCLUSIVA] | TEIA | R$ 490,35 | Compras |
| [SO] [VENDA] [FÓRUM TEIA] [02-04] | TEIA | R$ 472,19 | Compras |
| [LEAD] [MQL] — Cópia | TEIA | R$ 115,22 | Leads |
| ENGAJAMENTO - 23/04/2026 - CAPTAÇÃO DE LEADS | Expanders | R$ 125,25 | Leads (misto) |
| 26/05 - LEADS - MF | Expanders | R$ 99,39 | Leads |
| VENDAS - SITE - 17/04/2026 | TEIA | R$ 65,91 | Compras |
| SITE LEAD | Kauã | R$ 43,50 | Leads |

A campanha **SITE LEAD está ativa agora** na conta Kauã Catini, com o mesmo
padrão: R$ 43,50 gastos, nenhum lead de pixel atribuído.

**Ação:** este é um problema de medição, não de mídia. Auditar pixel e eventos
antes de aumentar qualquer verba — sem isso, toda decisão de otimização daqui
para frente é chute.

### A3 · Uma campanha custa 5,3× menos por conversa que a outra, e é a que quase não recebe verba

**Conta:** Kauã Catini · **Origem:** dado real + cálculo

| Campanha | Status | Gasto | Conversas | Custo/conversa | CTR | Frequência |
|---|---|---:|---:|---:|---:|---:|
| VAGAS DE EMPREGO | ATIVA | R$ 74,53 | 50 | **R$ 1,49** | 2,64% | 3,36 |
| Esperança | pausada | R$ 33,29 | 15 | R$ 2,22 | 1,99% | 1,68 |
| ad 01 kauã — Cópia | pausada | R$ 97,72 | 20 | R$ 4,89 | 2,80% | 1,69 |
| ad 01 kauã | pausada | R$ 552,16 | 82 | R$ 6,73 | 2,53% | 2,45 |
| PESQUEIRA | ATIVA | R$ 1.290,08 | 163 | R$ 7,91 | 1,54% | 3,30 |

PESQUEIRA concentra 62% de tudo que a conta investiu em conversas (R$ 2.076,74)
e entrega a conversa mais cara da lista. VAGAS DE EMPREGO entrega a mais barata
com 1/17 dessa verba.

**Ressalva honesta:** 50 conversas é amostra pequena, e a frequência de VAGAS já
está em 3,36 sobre um alcance de 3.789 — público estreito. O CPA quase
certamente sobe ao escalar. Isso não invalida o achado, define o método.

**Ação:** subir a verba de VAGAS DE EMPREGO em passos de +20% ao dia e comparar
o custo por conversa a cada passo. Se ele passar de ~R$ 4,00, parou de valer a
migração. Em paralelo, PESQUEIRA precisa de público novo — frequência 3,30 com
CTR 1,54% é sinal de audiência saturada.

### A4 · R$ 5.076 da TEIA foram para visita de perfil no Instagram

**Conta:** TEIA 2025 - Fórum · **Origem:** cálculo sobre dado real

Vinte impulsionamentos de post otimizados para `LINK_CLICKS` entregaram **12.889
visitas ao perfil por R$ 0,39 cada**. É 21% da conta. Os dois maiores:

- "A inclusão não é só colocar a..." — R$ 1.018,46 · 2.123 visitas · R$ 0,48
- "Ajudar crianças é mais fácil..." — R$ 923,43 · 2.590 visitas · R$ 0,36

Visita de perfil não é resultado de negócio. Não há, nestes dados, nenhuma
ligação medida entre essas 12.889 visitas e um lead ou uma venda.

**Ação:** ou se estabelece a ponte (público de retargeting a partir de quem
visitou, com campanha de conversão em cima), ou essa verba migra para as
campanhas que têm evento medido. Do jeito que está, é alcance pago sem destino.

### A5 · O melhor custo por resultado de negócio da TEIA está pausado

**Conta:** TEIA 2025 - Fórum · **Origem:** dado real

| Campanha | Status | Gasto | Resultado | Custo unitário |
|---|---|---:|---|---:|
| [LEAD] [MQL] | pausada | R$ 1.839,09 | 158 leads | **R$ 11,64** |
| [SO] [MSG] [10-03] [IG] | pausada | R$ 515,62 | 231 conversas | **R$ 2,23** |
| Tráfego - Lote Zero - Out/2025 | pausada | R$ 1.870,50 | 2.003 visualizações de página | R$ 0,93 |

`[LEAD] [MQL]` é a campanha mais eficiente do acervo em resultado de negócio
mensurável: 2.049 cliques, CTR 2,71%, CPC R$ 0,90, 158 leads a R$ 11,64.
`[SO] [MSG]` tem o melhor CTR de toda a conta (4,98%) e conversa a R$ 2,23.

Enquanto isso, as campanhas de venda direta custaram **R$ 500,56 por compra** em
média (R$ 14.516,37 para 29 compras).

**Ação:** se houver verba para reativar uma coisa só na TEIA, é `[LEAD] [MQL]`.

### A6 · Os blocos de venda da TEIA variam 3,2× em eficiência entre si

**Conta:** TEIA 2025 - Fórum · **Origem:** cálculo sobre dado real

| Bloco | Investido | Compras | Custo/compra |
|---|---:|---:|---:|
| [SO] WORKSHOPS (abr/2026) | R$ 3.396,73 | 14 | **R$ 242,62** |
| [SO] VENDAS LOTE 1 (jan/2026) | R$ 3.332,35 | 5 | R$ 666,47 |
| VENDAS LOTE ZERO (out–dez/2025) | R$ 7.721,38 | 10 | R$ 772,14 |

A tendência é boa: o bloco mais recente é 3,2× mais eficiente que o mais antigo.
Dentro dele, o campeão é `[SO] [WORKSHOP DE TERAPIA OCUPACIONAL]` com R$ 120,91
por compra — 4 compras com R$ 483,62. O pior é
`[SO] [WORKSHOP NEUROMODULAÇÃO NO TEA]`, R$ 484,16 para 1 compra.

**Não dá para dizer daqui se R$ 242 por compra é lucro ou prejuízo** — depende
do ticket do workshop, que não está nestes dados. Essa é a próxima informação a
levantar antes de qualquer decisão de escala.

---

## 4. Resumo executivo

Três frases:

1. **R$ 8.134 dos R$ 29.752 investidos (27%) foram para campanhas de conversão
   que não registraram nenhum resultado atribuído** — e uma delas, com R$ 2.096,
   está rodando neste momento. É o problema mais caro e o mais fácil de estancar.
2. **O dinheiro está distribuído ao contrário da eficiência**: PESQUEIRA leva 62%
   da conta Kauã com a conversa mais cara; VAGAS DE EMPREGO entrega 5,3× melhor
   com 6% da verba; a melhor campanha da TEIA está pausada.
3. **A TEIA está aprendendo**: custo por compra caiu 3,2× entre out/2025 e
   abr/2026. A base para escalar existe — falta o dado de ticket para saber se
   R$ 242 por compra fecha a conta.

---

## 5. Origem de cada afirmação

Seguindo a regra do AEOS (Art. 24, Vol. III — confiança por tipo de entrega,
nunca por rito), este documento é um **diagnóstico**, não um redesenho. Nenhuma
alteração foi feita em nenhuma conta.

- **Dado real:** todos os números das tabelas vêm da API da Meta, sem
  intermediação, e estão no JSON anexo.
- **Cálculo:** totais, médias, CTR/CPC/CPM agregados e razões entre campanhas.
- **Recomendação:** as seções "Ação". São propostas, não execuções.
- **Inferência:** as leituras de causa ("público saturado", "otimização sem
  sinal") são hipóteses consistentes com os dados, não fatos verificados.
