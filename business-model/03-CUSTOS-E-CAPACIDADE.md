# 03 — CUSTOS E CAPACIDADE

| | |
|---|---|
| **Versão** | 1.0 |
| **Data** | 2026-08-05 |
| **Data de corte dos dados** | 2026-07-30 |
| **Responsável pela informação** | Nicolas Nascimento (dados da equipe) · Kauã Catini (dados financeiros) |
| **Status global** | `PROVISÓRIO` — nenhum tempo foi medido; todos os custos unitários são derivados por divisão |
| **Método** | TDABC + absorção gerencial (Prompt-mestre §6) |

> **Aviso de método, obrigatório.** Nenhum número deste documento é um custo de tempo. Todos são **rateios de mensalidade por capacidade declarada**. TDABC exige tempo padrão medido, e a Expansion não mediu nenhum. Até que a medição do GATE 1 aconteça, tudo aqui é uma **aproximação superior otimista**: assume 100% de aproveitamento da capacidade declarada e zero retrabalho — duas premissas que a evidência já contradiz.

---

## 1. Custo mensal da equipe — e a contradição de R$ 6.850 × R$ 9.350

### 1.1 A soma

```
Social Media (Débora)          R$ 1.700,00
Designer (Vinicius Garcia)     R$   650,00
Editor 1 (Adryel Silva)        R$ 1.500,00
Editor 2 (Bernardo)            R$   500,00
Filmmaker/Editor (Daniel)      R$ 2.500,00
Gestor de tráfego (Matheus)    R$ 2.500,00
                               ───────────
TOTAL                          R$ 9.350,00 / mês
```

### 1.2 A contradição está resolvida por identidade aritmética

O acervo registra um "custo operacional" anterior de **R$ 6.850**, "aparentemente sem incluir tráfego". Isso é testável:

```
Hipótese A — R$6.850 = total sem o gestor de tráfego
  9.350,00 − 2.500,00 = 6.850,00                    ✓ EXATO

Hipótese B — R$6.850 usa Social Media a R$1.500 (dado antigo)
  1.500 + 650 + 1.500 + 500 + 2.500 = 6.650,00      ✗ diverge R$200
```

**Conclusão (confiança alta):** o R$ 6.850 é a soma de **cinco** funções, com Social Media já a **R$ 1.700**, e exclui o gestor de tráfego. Uma única identidade exata resolve **duas** perguntas de uma vez:

1. O valor vigente da Social Media é **R$ 1.700**, não R$ 1.500 — o status `CONTRADITÓRIO` cai para `PROVISÓRIO`.
2. O gestor de tráfego (R$ 2.500, **26,7% da folha**) estava **fora** da conta de custo que a direção usava para pensar preço.

> **Interpretação.** Toda decisão de preço tomada com base nos R$ 6.850 subestimou a folha em **36,5%** (`2.500 ÷ 6.850`). E tráfego é vendido em **4 dos 6 contratos** informados. Ou seja: o custo foi omitido justamente onde a receita foi prometida.

*Confirmar com a direção — mas a aritmética não deixa muita margem.*

### 1.3 A estrutura de custo é quase toda fixa

Nenhum dos seis valores varia com volume entregue. São mensalidades. **A Expansion não tem custo variável de produção identificado** — o que significa que:

- todo cliente adicional é margem de contribuição quase pura **até estourar a capacidade**;
- ao estourar, o custo salta em degrau (contratar mais alguém), não em rampa;
- portanto **o ponto de equilíbrio não é o número relevante. A capacidade é.**

O único custo genuinamente variável identificado em todo o acervo é a cobrança por conversa do WhatsApp Business API (`F13`) — e ele pertence a um produto que ainda não foi decidido se existe.

---

## 2. 77% do custo de pessoal não tem denominador

Custo unitário só existe onde há capacidade declarada:

| Função | Custo/mês | Capacidade declarada | Custo unitário derivado |
|---|---:|---|---:|
| Editor (Adryel) | R$ 1.500,00 | 30 vídeos/mês | **R$ 50,00 / vídeo** |
| Designer (Vinicius) | R$ 650,00 | 25 artes/mês | **R$ 26,00 / arte** |
| Editor (Bernardo) | R$ 500,00 | — | `NÃO CALCULÁVEL` |
| Filmmaker (Daniel) | R$ 2.500,00 | — | `NÃO CALCULÁVEL` |
| Tráfego (Matheus) | R$ 2.500,00 | — | `NÃO CALCULÁVEL` |
| Social Media (Débora) | R$ 1.700,00 | — | `NÃO CALCULÁVEL` |

```
custo com direcionador    = 1.500 + 650                     = R$ 2.150,00
custo sem direcionador    = 500 + 2.500 + 2.500 + 1.700     = R$ 7.200,00

parcela sem denominador   = 7.200 ÷ 9.350                    = 77,01%
```

> **Este é o achado central do GATE 0.** Não é que os preços estejam errados — é que **77% do custo de pessoal é matematicamente impossível de atribuir a um entregável**. Nenhum preço derivado dessa base pode ser defendido, em nenhuma direção. Precificar agora seria trocar uma intuição por uma falsa precisão.

E mesmo os dois custos unitários que existem são frágeis: R$ 50/vídeo só vale se **30 vídeos realmente forem entregues**. A 15 vídeos/mês, o custo real é R$ 100/vídeo. O denominador é uma declaração, não uma medição.

---

## 3. Demanda contratada de entregáveis

**Premissas de conversão** (declaradas para serem auditáveis):

| Premissa | Valor | Base |
|---|---:|---|
| Semanas por mês | 4,333 | 52 ÷ 12 |
| Dias úteis por mês | 21,0 | 252 ÷ 12 |
| Dias corridos por mês | 30,44 | 365,25 ÷ 12 |

**Demanda por contrato** (só os 5 contratos com escopo informado — Reino e Clau Kids ficam de fora por falta de dado):

| Cliente | Gravações/mês | Vídeos/mês | Carrosséis/mês | Publicações de mix indefinido/mês |
|---|---:|---:|---:|---:|
| Prime Assessoria | 2 | 8,67 | 4,33 | — |
| Dr. Fred | 4 | **42,00** (dia útil) / **60,88** (dia corrido) | — | — |
| Ciés Brand | 1 | — | — | 13,00 |
| Jane JQL Seguros | 1 | — | — | 13,00 |
| Ecossistema Albanos (4 perfis) | 2 | — | — | 52,00 |
| **TOTAL** | **10** | **50,67 a 69,55** | **4,33** | **78,00** |

> **A ambiguidade de "2 vídeos por dia" vale R$ 940/mês de custo de edição.** Dia útil → 42 vídeos. Dia corrido → 60,88. Diferença: 18,88 vídeos × R$ 50 = **R$ 944/mês** num contrato de R$ 1.750. É a lacuna com maior impacto financeiro por caractere de texto de todo o acervo.

As **78 publicações de mix indefinido** são a segunda maior lacuna: não se sabe quantas são vídeo (custo R$ 50) e quantas são arte (custo R$ 26). O mix decide qual função é o gargalo.

---

## 4. Ocupação e gargalo

### 4.1 Editor principal — estoura em qualquer cenário

```
ocupação_do_gargalo_% = horas (ou unidades) demandadas ÷ capacidade produtiva prática

PISO      (dia útil, ZERO vídeo vindo de Ciés/Jane/Albanos):
  8,67 + 42,00 = 50,67 vídeos ÷ 30 = 168,9%

BASE      (dia útil, 50% das 78 publicações em vídeo):
  50,67 + 39,00 = 89,67 vídeos ÷ 30 = 298,9%

ESTRESSADO (dia corrido, 70% das 78 publicações em vídeo):
  69,55 + 54,60 = 124,15 vídeos ÷ 30 = 413,8%
```

> **O cenário PISO é deliberadamente impossível de melhorar.** Ele assume a leitura mais barata do Dr. Fred *e* que nenhuma das 78 publicações de Ciés, Jane e Albanos é vídeo — o que contradiz a promessa central da empresa ("conteúdo que converte", reels). Mesmo assim: **168,9%**.

Duas consequências:

1. **O déficit não é opcional, é estrutural.** Entre 20,67 e 94,15 vídeos/mês são absorvidos por Bernardo (R$ 500, capacidade `NÃO INFORMADA`) e Daniel (R$ 2.500, capacidade `NÃO INFORMADA`). Ou seja: **entre 41% e 76% da produção de vídeo roda sobre capacidade que ninguém mediu.**
2. **A capacidade do gargalo não é exigível.** Adryel declarou em 23/06/2026: *"Irmão, você sabe que eu não trabalho só pra vocês. Me manda a prioridade de agora que eu faço agora. Tenho meus clientes também."* Os 30 vídeos são um teto teórico de alguém cuja fila a Expansion não controla.

E há um agravante de segunda ordem: o gestor de tráfego registrou em 09/07/2026 que a Meta exige **criativo novo a cada 7–14 dias por conta**. Isso significa que a mesma restrição — o editor freelancer — estrangula simultaneamente a entrega de conteúdo **e** a performance do tráfego. Não são dois problemas. É um.

### 4.2 Designer — o mix decide

```
BASE       (50% das 78 em arte):  39,00 + 4,33 = 43,33 ÷ 25 = 173,3%
ESTRESSADO (70% das 78 em arte):  54,60 + 4,33 = 58,93 ÷ 25 = 235,7%
PISO       (100% das 78 em vídeo): 0,00 + 4,33 =  4,33 ÷ 25 =  17,3%
```

**Ponto de indiferença** — a fração de vídeo (`v`) no mix que faz o designer bater exatamente 100%:

```
25 = 4,33 + 78 × (1 − v)
78 × (1 − v) = 20,67
1 − v = 0,2650
v = 73,5%
```

> **O designer só cabe na capacidade declarada se ≥ 73,5% de todas as publicações de Ciés, Jane e Albanos forem vídeo.** Para uma loja de moda infantil, uma clínica de autismo e uma corretora de seguros, isso é improvável — mas é uma **pergunta para a direção**, não uma afirmação. É a variável que decide se a Expansion tem um gargalo ou dois.

### 4.3 O gargalo que não está na tabela

`K06` — os sócios. Não há capacidade declarada, não há demanda medida, e a evidência aponta para ocupação acima de 100%: Nicolas é o roteador de quase toda tarefa (`OPERACAO-REAL` §14), com mensagens registradas às 01h34, 00h58 e 23h49.

**Se o gargalo real for sócio, todos os cálculos acima estão medindo o recurso errado.** É a hipótese mais provável e a menos medida da empresa, e é por isso que a medição de tempo dos sócios é o item de maior prioridade do GATE 1.

---

## 5. Alertas de viabilidade calculados

### 🚨 ALERTA-01 — Dr. Fred: margem negativa só na edição

```
Receita mensal                                    R$ 1.750,00

Cenário DIA ÚTIL   (21 dias × 2 vídeos = 42,00 vídeos):
  custo de edição = 42,00 × R$ 50,00           =  R$ 2.100,00
  margem de contribuição                        = −R$   350,00
  MC%                                           =     −20,0%

Cenário DIA CORRIDO (30,44 dias × 2 = 60,88 vídeos):
  custo de edição = 60,88 × R$ 50,00           =  R$ 3.044,00
  margem de contribuição                        = −R$ 1.294,00
  MC%                                           =     −73,9%
```

**Ainda não estão nesse cálculo:** 4 gravações/mês (filmmaker + deslocamento), roteiro, social media, publicação, atendimento, ferramentas, retrabalho, impostos e 100% do tempo dos sócios.

Ocupação que este único contrato impõe ao editor principal: **140,0%** (dia útil) a **202,9%** (dia corrido).

> **Um contrato de R$ 1.750/mês consome sozinho de 1,4 a 2,0 vezes toda a capacidade declarada do editor principal, e dá prejuízo antes de qualquer outro custo.** Não é um contrato com margem apertada. É um contrato que a operação não consegue entregar e que perde dinheiro ao tentar.

### 🚨 ALERTA-02 — Jane JQL Seguros: teste de custo máximo admissível

Aqui a honestidade manda inverter a conta. Não há dado para custear — então calcula-se **quanto custo cabe**:

```
Receita mensal                                  R$ 1.400,00
Escopo: 1 gravação presencial + 13 publicações/mês + tráfego

Custo máximo para MC = 0 (empate absoluto):     R$ 1.400,00
Custo máximo para MC = 40%:                     R$   840,00
```

Dentro de R$ 840 precisam caber: **uma diária de filmmaker com deslocamento**, 13 publicações produzidas e postadas, **gestão de campanha de tráfego** e o atendimento. Só as 13 publicações, se metade for vídeo, já custam `6,5 × 50 + 6,5 × 26 = R$ 494,00` — **58,8% do orçamento**, restando R$ 346 para gravação, deslocamento, tráfego e atendimento.

**Diagnóstico:** `INCONCLUSIVO, TENDENDO A DESTRUTIVO`. Não afirmo prejuízo sem o custo da diária de captação — mas o espaço é implausivelmente estreito.

### 🚨 ALERTA-03 — Proposta Prime/Trinca de R$ 12.000 para **10/08/2026**

Data de referência deste documento: **05/08/2026**. O evento é **em 5 dias** e não existe custo calculado.

```
Receita proposta                                          R$ 12.000,00
Equipe prevista: 8 profissionais
Entregáveis: aftermovie documental + 50+ fotos + 15+ vídeos + tempo real

Custo direto máximo para margem operacional de 30%:
  12.000 × (1 − 0,30)                                  =  R$  8.400,00
Custo direto máximo para margem de 30% JÁ COM IMPOSTO estimado de 15,58%:
  12.000 × (1 − 0,30 − 0,1558)                         =  R$  6.530,40
```

Só os 15 vídeos, ao custo unitário derivado, consomem `15 × 50 = R$ 750`. Sobram R$ 5.780 para **8 diárias**, aftermovie documental, tratamento de 50+ fotos, cobertura em tempo real e deslocamento. A R$ 700/diária, as 8 diárias sozinhas custariam R$ 5.600 — restando **R$ 180** para toda a pós-produção.

> **Não estou dizendo que a proposta dá prejuízo — estou dizendo que ninguém sabe, e que a conta está apertada o suficiente para que "não saber" seja inaceitável a 5 dias do evento.** Ver `DECISÕES BLOQUEADORAS`, item 1.

### 🚨 ALERTA-04 — A carteira inteira vence em agosto

| Cliente | Vigência informada | Situação em 05/08/2026 |
|---|---|---|
| Prime Assessoria | 2 meses; agosto é o segundo | **vence este mês** |
| Ciés Brand | agosto seria o último mês | **vence este mês** |
| Dr. Fred | 1 mês | **provavelmente já venceu** |
| Jane JQL Seguros | 1 mês | **provavelmente já venceu** |
| Ecossistema Albanos | 3 meses | **data de início desconhecida** |

Cenário de perda de Ciés + Albanos:

```
Receita recorrente atual (sem Reino)             R$ 15.483,33
  − Ciés Brand                                   −R$  1.333,33
  − Ecossistema Albanos                          −R$  8.000,00
                                                 ─────────────
Receita remanescente                             R$  6.150,00
Folha PJ fixa                                    R$  9.350,00
                                                 ─────────────
RESULTADO                                        −R$  3.200,00 / mês
Cobertura da folha                                      65,8%
```

E isso **antes** de ferramentas, estrutura, deslocamento, impostos e qualquer remuneração de sócio.

> **A Expansion está a dois vencimentos de contrato de ficar estruturalmente deficitária.** Esse é o motivo pelo qual a primeira pergunta deste projeto não pode ser "quanto custa um vídeo". Tem que ser "quais contratos ainda estão vivos hoje".

---

## 6. Concentração de receita

```
Ecossistema Albanos:  8.000,00 ÷ 15.483,33 = 51,67%
Prime Assessoria:     3.000,00 ÷ 15.483,33 = 19,38%
Dois maiores juntos:                          71,05%
```

Um cliente é **mais da metade** da receita recorrente, com contrato de 3 meses e data de vencimento desconhecida. Em qualquer política de risco, isso sozinho justificaria travar novas vendas com desconto até a renovação estar resolvida.

---

## 7. Visão econômica normalizada — a margem é a folha

O Prompt-mestre §6.6 exige uma visão que reconheça trabalho usado sem remuneração explícita. Aplicando as faixas de mercado citadas pelo **próprio conselho da empresa** em 13/07/2026 (`CONSELHO-ANEXOS`):

```
                              Expansion paga    Faixa júnior de mercado (conselho)
Social Media                     R$ 1.700,00     R$ 4.500 – 5.500 (social/roteirista)
Designer                         R$   650,00     abaixo de qualquer faixa citada
Editor (Adryel)                  R$ 1.500,00     R$ 3.500 – 4.500
Editor (Bernardo)                R$   500,00     R$ 3.500 – 4.500
Filmmaker/Editor (Daniel)        R$ 2.500,00     —
Gestor de tráfego (Matheus)      R$ 2.500,00     R$ 2.500 – 3.000 (meio período)
Atendimento / CS                 R$     0,00     R$ 5.000 – 6.000  ← feito pelos sócios
```

Cenário normalizado, usando o piso júnior genérico do conselho (R$ 1.800) e a faixa que ele recomendou (R$ 2.600):

```
6 pessoas × R$ 1.800 (piso absoluto)   = R$ 10.800,00
  já 15,5% acima dos R$ 9.350 pagos
  MC = 15.483,33 − 10.800,00           = R$  4.683,33   (30,25%)

6 pessoas × R$ 2.600 (recomendado)     = R$ 15.600,00
  MC = 15.483,33 − 15.600,00           = −R$    116,67   (−0,75%)
```

> **Remunerando a equipe no valor que o próprio conselho recomendou, a carteira inteira empata em zero** — antes de ferramentas, estrutura, deslocamento, impostos e os dois sócios.
>
> Responde ao teste adversarial do Prompt-mestre §8 — *"o pacote parece lucrativo apenas porque um profissional está sub-remunerado?"* — com aritmética: **sim. A MC de R$ 6.133/mês é, em ordem de grandeza, a diferença entre o que a equipe recebe e o que o mercado paga.**

Isso tem consequência de segunda ordem direta sobre a capacidade: uma equipe paga entre 57% e 89% abaixo do mercado **não é retida**, e o acervo já registra o mecanismo — o editor principal declarou ter carteira própria, o gestor de tráfego divide um notebook com a esposa e não tem verba para ir ao escritório. **Capacidade comprada abaixo do mercado é capacidade que sai.** A rotatividade de ~17 nomes em 90 dias (`OPERACAO-REAL` §2) não é um problema de gestão separado do problema de preço. É o mesmo problema.

---

## 8. O que falta para este documento sair de `PROVISÓRIO`

| # | Falta | Bloqueia |
|---|---|---|
| 1 | Tempo padrão medido de 5 vídeos, 5 artes, 1 lote de roteiros, 1 gravação | Todo o TDABC |
| 2 | Capacidade de Bernardo, Daniel, Débora | Cálculo de capacidade total e gargalo real |
| 3 | Medição de 2 semanas do tempo dos sócios | Custo econômico normalizado e gargalo oculto |
| 4 | Mix vídeo × arte × carrossel por contrato | Saber se há 1 ou 2 gargalos |
| 5 | Custo de ferramentas, estrutura, deslocamento e equipamento | Custo completo do cliente |
| 6 | Taxa de retrabalho | Fator de correção de todas as estimativas acima |

---

**Próxima ação automática:** assim que os itens 1, 2 e 4 chegarem, este documento é recalculado e o `06-MOTOR-DE-PRECIFICACAO.md` deixa de estar bloqueado.
