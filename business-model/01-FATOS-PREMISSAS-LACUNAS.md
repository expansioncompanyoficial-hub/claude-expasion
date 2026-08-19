# 01 — FATOS, PREMISSAS E LACUNAS

| | |
|---|---|
| **Versão** | 1.0 |
| **Data** | 2026-08-05 |
| **Data de corte dos dados** | 2026-07-30 (conversas de 28–30/07/2026) |
| **Responsável** | Nicolas Nascimento · Kauã Catini |
| **Gate** | GATE 0 — Integridade dos dados |
| **Grau de confiança global dos dados** | **2,5 / 10** — ver §6 |

---

## 1. INVENTÁRIO DE FONTES

### 1.1 Lidas integralmente

| Fonte | Natureza | Data | Confiabilidade |
|---|---|---|---|
| `EXPANSION-360-2026-07-26.md` | Autodiagnóstico do CEO, ditado por áudio | 26/07/2026 | **Média** — narrativa, sem documento de apoio |
| `OPERACAO-REAL-EXPANSION-2026-07-26.md` | 4.321 mensagens de 5 grupos de WhatsApp, 24/04→26/07 | 26/07/2026 | **Alta** — evidência primária datada, com citação literal |
| `AUDITORIA-DRIVE-EXPANSION-2026-07-26.md` | Auditoria de ~250 arquivos + permissões | 26/07/2026 | **Alta** — verificação direta |
| `_audios/transcricoes-audios-whatsapp-2026-07-26.md` | 21 áudios transcritos | 26/07/2026 | **Alta** — fala literal datada |
| `CONSELHO-EXPANSION-2026-07-13.md` | **Parecer e deliberação de conselho empresarial de 6 cadeiras** | 13/07/2026 | **Alta** — decisão registrada com dono e prazo. Ver §4.5 |
| `CONSELHO-EXPANSION-ANEXOS-2026-07-13.md` | 17 pareceres individuais, com faixas salariais e de custo de mercado | 13/07/2026 | **Média-alta** — cifras são estimativas declaradas pelos conselheiros, não censo |
| `AEOS/ORGANIFY/FICHA-MISSAO-M002-OS-EXPANSION.md` | Ficha de missão do OS interno | 27/07/2026 | **Alta** |
| `README.md`, `CLAUDE.md` | Convenções do acervo | vivo | **Alta** |
| Prompt-mestre (contexto-semente §5) | Dados informados pela direção | 28–30/07/2026 | **Baixa a média** — a própria direção classifica como possivelmente desatualizado |

### 1.2 Lidas por varredura dirigida

`PLATAFORMA-WEBLUXURY-*` (referem-se a **outro negócio** — plataforma de luxo, NewCo separada; não entram no custeio da assessoria), `POSICIONAMENTO-CONTEUDO-NICOLAS-*`, `POP-SOCIAL-MEDIA-v0.1.md`, `AEOS/` (12 volumes), transcrição integral do áudio-360.

### 1.3 NÃO disponíveis — e é isto que trava o GATE 1

| Fonte ausente | Por que é bloqueante |
|---|---|
| **Extrato bancário / conciliação** | Sem isso não existe caixa, recebimento nem inadimplência. Só existe alegação. |
| **Contratos assinados** (estão soltos na raiz do Drive, sem controle de versão) | Vigência, reajuste, escopo e multa são desconhecidos. `AUDITORIA-DRIVE` §C4 |
| **Notas fiscais / faturamento por competência** | Impossível separar faturado de recebido, e competência de caixa. |
| **Faturas das ferramentas** | 16 ferramentas identificadas, **zero valores**. |
| **Apontamento de horas** | Não existe em nenhuma forma. É o insumo do TDABC. |
| **Custos do OTI PRO** (evento de 31/07–01/08) | Único evento executado com receita conhecida e custo desconhecido. |

> **Nota de escopo.** O Google Drive está bloqueado por política de egress neste ambiente (`CLAUDE.md`). Os documentos financeiros que porventura existam lá não puderam ser lidos. Isso não muda o diagnóstico: a `AUDITORIA-DRIVE` já mapeou o Drive inteiro em 26/07 e **não encontrou nenhuma planilha de custo, DRE ou controle de horas**.

---

## 2. O QUE ESTÁ CONFIRMADO

Fatos que resistem a checagem cruzada em duas ou mais fontes independentes:

| # | Fato | Evidência |
|---|---|---|
| F1 | Seis pessoas em regime PJ, custo mensal informado de **R$ 9.350** | Prompt-mestre §5.1 |
| F2 | O valor vigente da Social Media é **R$ 1.700** e o "custo operacional" de R$ 6.850 **excluía o gestor de tráfego** | Demonstrado por identidade aritmética — `03-CUSTOS-E-CAPACIDADE` §1.2 |
| F3 | **A estrutura de custo é quase inteiramente fixa.** Nenhuma das seis remunerações varia com volume | Prompt-mestre §5.1 |
| F4 | **77,01% da folha não tem direcionador de custo** | `03-CUSTOS-E-CAPACIDADE` §2 |
| F5 | O editor principal é **freelancer com carteira própria** e prioridade que a Expansion não controla | Adryel, 23/06/2026: *"não trabalho só pra vocês… Tenho meus clientes também"* |
| F6 | O relatório semanal **é prometido e não é entregue**, e isso quase custou o maior cliente | Nicolas, 16/07/2026: *"A Prime quase cancelou"*, *"muitas semanas sem mandar nenhum relatório"* |
| F7 | **Caixa apertado, documentado** | 19/06 cartão recusado · 19/07 *"temos 84 reais na conta"* · 11/06 gestor paga R$500 de verba do próprio bolso |
| F8 | **Sem CNPJ.** Os dois sócios operam como MEI e já estouraram o teto | `EXPANSION-360` §6 |
| F9 | **Sem pró-labore.** O trabalho dos sócios tem custo de caixa zero | `EXPANSION-360` §2 e §6 |
| F10 | A carteira **girou ~17 nomes em 90 dias**, não encolheu de 10 para 6 | `OPERACAO-REAL` §2 |
| F11 | Benchmark de capacidade **proposto pelo próprio executor**: 20–25 clientes por profissional | Matheus Felipi, 09/06/2026 |
| F12 | A Meta exige **criativo novo a cada 7–14 dias por conta** | Matheus, 09/07/2026 |
| F13 | O WhatsApp Business oficial **cobra por conversa** | Matheus, 17/07/2026 |
| F14 | Retrabalho por edição duplicada **ocorre e não é medido** | Débora, 25/06/2026: *"já é a segunda vez que vocês editam vídeos que já foram editados"* |
| F15 | Material de cliente pertence a **contas pessoais de freelancers**; pastas com `anyone: writer` | `AUDITORIA-DRIVE` §C1 e §C3 |
| F16 | Em **13/07/2026** um conselho empresarial deliberou **piso de R$ 5–6 mil por cliente novo** e **proibiu fechar abaixo de R$ 5 mil** por 6 meses | `CONSELHO-EXPANSION` §6 e §8.4 |
| F17 | O mesmo conselho fixou **receita por pessoa ≥ R$ 12 mil/mês** como indicador de piso e mandou **medir horas por cliente na Semana 1** | `CONSELHO-EXPANSION` §6 e §7.3 |
| F18 | A remuneração paga é **inferior ao piso júnior de mercado** citado pelo próprio conselho (R$ 1.800–2.500) em 4 das 6 funções | `CONSELHO-ANEXOS`; ver §4.5 |

---

## 3. O QUE É HIPÓTESE OU ESTIMATIVA

| # | Hipótese | Confiança | Como confirmar |
|---|---|---|---|
| H1 | Receita recorrente mensal normalizada = **R$ 15.483,33** (R$ 17.483,33 com Reino) | Média | Contratos + extrato |
| H2 | Os "45% de margem" são **margem de contribuição pós-folha PJ**, não margem líquida | Média-alta — ver §4.2 | Confirmar com Kauã a fórmula usada |
| H3 | Os "R$ 250 mil em 3 meses" e os "R$ 60 mil/mês" **não são receita reconhecida por competência** | Alta — ver §4.1 | Extrato + notas |
| H4 | Custo de R$ 50/vídeo e R$ 26/arte | Baixa — é rateio, não medição | Cronometrar |
| H5 | O gargalo real é **sócio**, não editor | Média | Medição de tempo de 2 semanas |
| H6 | A empresa cairia no **Anexo V** do Simples ao abrir CNPJ, por Fator R ≈ 0% | Média — ver §5 | **Validação obrigatória com contador** |
| H7 | A margem de contribuição atual **é essencialmente a diferença entre o que a equipe recebe e o que o mercado paga** — a preço de mercado júnior recomendado, a carteira empata em zero | Média-alta — ver §4.5 | Confirmar faixas com o mercado local e decidir política de remuneração |

---

## 4. CONTRADIÇÕES E PONTOS CEGOS

### 4.1 R$ 250.000 em 3 meses × R$ 84 na conta

A alegação de `R$ 250.000+ em menos de 3 meses` (`EXPANSION-360` §6) é testável contra a recorrência conhecida:

```
250.000 ÷ 3 meses                              = R$ 83.333,33 / mês
− receita recorrente normalizada               = R$ 15.483,33 / mês
                                                 ─────────────
resíduo que teria de vir de eventos            = R$ 67.850,00 / mês

nº de eventos do porte do OTI PRO (R$5.800 financeiros):
  67.850,00 ÷ 5.800,00                         = 11,70 eventos / mês
  em 90 dias                                   = 35,1 eventos
  intervalo médio entre eventos                = 1 evento a cada 2,56 dias
```

**35 eventos em 90 dias, com 6 PJs e 2 sócios, enquanto se entregam 78 publicações e 50–70 vídeos recorrentes por mês.** Isso não aconteceu — não há rastro de nada parecido nos 4.321 mensagens dos grupos.

Mesmo teste para os `R$ 60.000/mês` (citados em 28/07/2026):

```
60.000,00 − 15.483,33 = R$ 44.516,67 / mês em eventos
44.516,67 ÷ 5.800,00  = 7,67 eventos / mês = 1 a cada 3,97 dias
```

**Leituras alternativas, todas mais plausíveis que "receita reconhecida":**

| Leitura | Plausibilidade | Como testar |
|---|---|---|
| **(a) Valor total de contratos assinados** (booking/GMV), não receita do período | Alta | Somar valor de face de todos os contratos vs. competência |
| **(b) Inclui verba de anúncio dos clientes** que transita pela conta (*pass-through*) | Alta — a Ciés tem R$ 1.000/mês de verba, e o gestor movimenta verba de todas as contas | Separar verba de mídia da receita de serviço |
| **(c) Soma bruta dos dois MEIs + recebimentos de terceiros** | Média | Extrato dos dois CPFs |
| **(d) Número de memória, nunca auditado** | Média | — |

> **Não escolho um lado, como o Prompt-mestre exige. Mas registro:** se (b) for verdadeira, a "receita" da Expansion foi inflada por dinheiro que sempre foi do cliente e sempre foi para a Meta. É a explicação que reconcilia, sem contradição, *"R$250 mil em 3 meses"* com *"temos 84 reais na conta"*.

### 4.2 "45% de margem líquida" — o teste que quase fecha

```
MC parcial (receita − folha PJ), sem Reino:
  (15.483,33 − 9.350,00) ÷ 15.483,33 = 6.133,33 ÷ 15.483,33 = 39,61%

MC parcial, COM Reino a R$2.000:
  (17.483,33 − 9.350,00) ÷ 17.483,33 = 8.133,33 ÷ 17.483,33 = 46,52%
```

**46,52% ≈ 45%.** A hipótese mais econômica é que os "45%" são `(receita − folha PJ) ÷ receita` — uma margem de contribuição parcial que ignora **ferramentas, estrutura, deslocamento, freelancers de evento, retrabalho, equipamento, impostos e 100% do trabalho dos dois sócios**.

Teste de refutação: se os 45% fossem margem líquida real sobre R$ 15.483,33, sobrariam **R$ 6.967,50/mês** de lucro. A empresa tinha **R$ 84** na conta de anúncio em 19/07 e o gestor de tráfego pagou R$ 500 de verba do próprio bolso em 11/06. A leitura de "margem líquida" é incompatível com a evidência de caixa. A de "MC parcial" não é.

### 4.3 Contradições menores, registradas

| # | Tema | Versão A | Versão B | Resolução |
|---|---|---|---|---|
| CT1 | Social Media | R$ 1.700 | R$ 1.500 | **Resolvida:** R$ 1.700 (§1.2 do doc 03) |
| CT2 | Custo operacional | R$ 6.850 | R$ 9.350 | **Resolvida:** R$ 6.850 exclui tráfego |
| CT3 | CRM em uso | Kommo (Prompt-mestre §5.2) | WeSales (grupos, 07/07 e 17/07) | **Aberta** |
| CT4 | Tamanho da carteira | 6 clientes (`EXPANSION-360` §5) | ~17 perfis em 90 dias (`OPERACAO-REAL` §2) | **Aberta** — provável confusão entre cliente e perfil |
| CT5 | Escalabilidade da social media | "uns 50 clientes" (CEO) | 20–25 por profissional (gestor de tráfego, 09/06) | **Aberta** — decisão da direção |
| CT6 | Nome do cliente de moda infantil | "Cloud Kids" | "Clau Kids" | **Resolvida:** Clau Kids |

### 4.4 Pontos cegos — o que ninguém está olhando

| # | Ponto cego | Por que importa |
|---|---|---|
| PC1 | **Clau Kids é cliente ativo em 3 fontes e não aparece em nenhuma tabela de receita** | Ou é receita não contabilizada, ou é trabalho não faturado. As duas hipóteses são graves. |
| PC2 | **Fórum TEIA**: não se sabe se é um dos 4 perfis do contrato Albanos ou contrato próprio | Risco de dupla contagem de receita *ou* de entrega não faturada |
| PC3 | **Nenhum contrato tem custo de onboarding amortizado** — e há contratos de **1 mês** | Onboarding é custo integral num contrato que dura 30 dias |
| PC4 | **A permuta de R$ 500 do OTI PRO foi tratada como receita** | Permuta não paga PJ nem imposto. É receita não-caixa. |
| PC5 | **Depreciação de equipamento não existe em lugar nenhum** | Operação de filmagem sem reposição provisionada |
| PC6 | **Fator R e regime tributário** — ver §5 | Pode custar 9,42 p.p. de alíquota |
| PC7 | **A verba de tráfego da Ciés é "paga pela metade"** | Ou a Expansion está cobrindo a diferença, ou o cliente está inadimplente parcial. Nenhuma das duas está registrada. |

---

## 4.5 🚨 O ACHADO QUE REENQUADRA O PROJETO INTEIRO

**Este projeto não está começando do zero. Ele está reabrindo uma decisão que já foi tomada e não foi executada.**

Em **13/07/2026** — 23 dias antes desta análise — um conselho de 6 cadeiras empresariais entregou um parecer (`CONSELHO-EXPANSION-2026-07-13.md`) que já continha o diagnóstico de precificação, a decisão e o prazo:

| O que o conselho decidiu em 13/07 | Situação em 05/08 |
|---|---|
| *"**preço novo (R$ 5–6 mil) para todo cliente novo a partir de segunda-feira**"* (Semana 1) | Contratos informados variam de **R$ 1.333 a R$ 3.000** |
| **Proibição nº 4:** *"Fechar cliente novo abaixo de R$ 5 mil"* — por 6 meses | A carteira inteira está abaixo desse piso |
| *"começar a **medir horas por cliente e receita por pessoa**"* (Semana 1) | Nada foi medido — é a lacuna nº 1 deste GATE 0 |
| *"renegociação da base atual **na renovação, cliente a cliente, com o dado de horas na mão**"* (Mês 2) | Renovações vencendo **agora**, sem dado de horas |
| **Indicador de piso:** receita por pessoa ≥ **R$ 12 mil/cabeça/mês** | Ver cálculo abaixo |

E o diagnóstico do conselho, textual:

> *"Ele vendeu um serviço de **R$ 6 mil por R$ 3 mil**, e o time paga a diferença com a própria saúde. […] Formar melhor sem reprecificar é operar uma escola gratuita para concorrentes de ticket alto."*

### Os dois indicadores de piso do conselho, calculados com os dados de hoje

**Receita por cabeça** — contando os 4 perfis do Albanos como contas separadas, a carteira tem **8 perfis** e a operação tem **6 PJs + 2 sócios = 8 pessoas**:

```
receita por cabeça = 15.483,33 ÷ 8 pessoas          = R$ 1.935,42 / mês
piso do conselho                                     = R$ 12.000,00 / mês
atingimento                                                    16,1%

contando só os 6 PJs:  15.483,33 ÷ 6                = R$ 2.580,56  → 21,5%
```

Para atingir o piso de R$ 12 mil/cabeça com as 8 pessoas atuais, a receita teria de ser **R$ 96.000/mês** — **6,2 vezes** a atual. Dito ao contrário: **a receita recorrente de hoje sustenta 1,29 pessoas no padrão do próprio conselho.**

**Receita por perfil:**

```
receita média por perfil = 15.483,33 ÷ 8 perfis     = R$ 1.935,42 / mês
piso do conselho                                     = R$ 5.000,00 / mês
atingimento                                                    38,7%
```

> **O conselho estimou que a Expansion vendia um serviço de R$ 6 mil por R$ 3 mil — 50% abaixo. Os dados mostram pior: R$ 1.935 por perfil contra um piso de R$ 5.000, ou seja, 61% abaixo.** O ecossistema Albanos, o maior cliente da casa, sai a **R$ 2.000 por perfil** (`8.000 ÷ 4`).

### A visão econômica normalizada — onde a "margem" realmente está

O Prompt-mestre §6.6 exige reconhecer trabalho e ativos usados sem remuneração explícita. Aplicando as faixas salariais de mercado do **próprio conselho** (`CONSELHO-ANEXOS` §Remuneração):

```
Faixa júnior de mercado citada pelo conselho:         R$ 1.800 – 2.500 / mês
Faixa recomendada pelo conselho (teto, não piso):     R$ 2.600 – 2.800 / mês

Custo da equipe de 6 pessoas, ao PISO ABSOLUTO júnior:
  6 × 1.800,00                                      = R$ 10.800,00
  já é 15,5% MAIOR que os R$ 9.350 efetivamente pagos

Custo da equipe de 6, à faixa RECOMENDADA pelo conselho:
  6 × 2.600,00                                      = R$ 15.600,00
  receita recorrente                                = R$ 15.483,33
  margem de contribuição                            = −R$    116,67 / mês
```

> **Remunerando a equipe no valor que o próprio conselho da empresa recomendou, a carteira inteira empata em praticamente zero** — antes de ferramentas, estrutura, deslocamento, impostos e qualquer remuneração para os dois sócios.
>
> Isto responde ao teste adversarial do Prompt-mestre §8 — *"o pacote parece lucrativo apenas porque um profissional está sub-remunerado?"* — com aritmética: **a margem de contribuição de R$ 6.133/mês é quase exatamente a diferença entre o que a equipe recebe e o que o mercado paga.** A margem não vem do modelo. Vem da folha.

**Comparação direta com as faixas de mercado citadas em 13/07:**

| Função | Faixa de mercado (conselho) | Expansion paga | Diferença |
|---|---|---:|---|
| Social media / roteirista | R$ 4.500 – 5.500 | R$ 1.700 | **−62% a −69%** |
| Editor de vídeo | R$ 3.500 – 4.500 | R$ 1.500 e R$ 500 | **−57% a −89%** |
| Gestor de tráfego (½) | R$ 2.500 – 3.000 | R$ 2.500 (integral) | dentro da faixa de meio período |
| Atendimento / CS | R$ 5.000 – 6.000 | **R$ 0** — feito pelos sócios | **−100%** |
| Designer | (não citado) | R$ 650 | abaixo de qualquer faixa |

O designer a **R$ 650/mês** e o editor Bernardo a **R$ 500/mês** estão abaixo até do piso júnior de R$ 1.800 citado pelo conselho — respectivamente **64%** e **72%** abaixo.

### Consequência para este projeto

Três coisas mudam:

1. **O `05-ARQUITETURA-DE-PRODUTOS` não parte do zero.** O piso de R$ 5.000 já é uma decisão do conselho, com dono e data. Este projeto o **valida ou revoga com dado** — não o reinventa.
2. **A hipótese de trabalho para o preço-alvo deixa de ser desconhecida.** Passa a ser: *R$ 5.000/perfil é o piso; a análise precisa provar que ele é suficiente, não descobrir se existe.*
3. **Abre uma pergunta que só a direção responde:** o parecer de 13/07 foi lido e rejeitado, foi aceito e não executado, ou não chegou a ser lido? A resposta muda completamente o desenho da governança do GATE 9 — não adianta construir um novo sistema de decisão se o anterior foi ignorado sem registro.

---

## 5. O PONTO CEGO TRIBUTÁRIO — campos e cenários para o contador

> ⚠️ **Isto não é parecer contábil.** É a criação dos campos e cenários que o Prompt-mestre §1 determina, para **validação obrigatória** com o contador da empresa. Nenhum número desta seção pode ser usado para precificar antes dessa validação.

### 5.1 O teto do MEI já foi estourado só com a recorrência

```
Teto MEI (a confirmar para 2026)                 R$  81.000,00 / ano / MEI
Dois MEIs                                        R$ 162.000,00 / ano

Receita recorrente anualizada:
  15.483,33 × 12                                 R$ 185.800,00 / ano

Excesso sobre a capacidade dos dois MEIs somados:      114,7%
```

Estoura **sem contar um único evento**. O desenquadramento tem efeito retroativo e consequências que só o contador pode dimensionar — mas o passivo existe hoje, não no futuro.

### 5.2 O Fator R — a decisão de "todo mundo PJ" pode custar 9,42 pontos

O Simples Nacional enquadra serviços no **Anexo III** (alíquota inicial menor) quando o **Fator R ≥ 28%**, e no **Anexo V** quando é menor. O Fator R é:

```
Fator R = folha dos últimos 12 meses ÷ receita bruta dos últimos 12 meses
```

**Pagamento a PJ não entra na folha.** Só pró-labore, salários e encargos entram.

```
Situação atual: pró-labore R$0 + CLT R$0 + folha PJ irrelevante para o cálculo
  Fator R ≈ 0%  →  ANEXO V
```

Sobre uma RBT12 de R$ 185.800 (2ª faixa):

```
ANEXO V   — alíquota nominal 18,00%, dedução R$ 4.500
  (185.800 × 0,18 − 4.500) ÷ 185.800 = 28.944,00 ÷ 185.800 = 15,58%

ANEXO III — alíquota nominal 11,20%, dedução R$ 9.360
  (185.800 × 0,112 − 9.360) ÷ 185.800 = 11.449,60 ÷ 185.800 =  6,16%

DIFERENÇA                                                      9,42 p.p.
  em R$/ano: 185.800 × 0,0942                     = R$ 17.502,36
  em R$/mês:                                      = R$  1.458,53
```

Contra a MC parcial disponível de R$ 6.133,33/mês, isso é **23,78% de tudo que sobra**.

**Folha necessária para cruzar o Fator R:**

```
185.800 × 0,28 = R$ 52.024,00 / ano = R$ 4.335,33 / mês (pró-labore + encargos, os dois sócios)
```

> **O achado:** contratar toda a operação como PJ parece barato e pode ser a decisão mais cara da empresa. Pagar pró-labore de ~R$ 4.335/mês custaria caixa, mas devolveria ~R$ 1.459/mês em imposto **e** resolveria o problema de os sócios não terem remuneração. As duas dores têm a mesma alavanca. **Nenhuma fonte do acervo menciona Fator R.**

### 5.3 Reforma tributária — campo a criar, não a decidir agora

2026 é ano de transição (CBS/IBS em fase de teste). Optantes do Simples seguem no Simples, mas passam a poder optar por recolher IBS/CBS "por fora" para **gerar crédito ao cliente PJ**. Os clientes da Expansion são majoritariamente PJ (assessoria de crédito, clínica, lojas, corretora). Isso pode virar argumento comercial — ou custo. **Campo criado, cenário a modelar no GATE 5, decisão com o contador.**

---

## 6. GRAU DE CONFIANÇA DOS DADOS: 2,5 / 10

| Dimensão | Nota | Justificativa |
|---|---:|---|
| Receita | 3/10 | Valores de contrato informados, mas vigência incerta e 2 clientes ativos sem valor |
| Custo de pessoal | 5/10 | Valores confiáveis; contradição resolvida; **capacidade ausente em 4 de 6** |
| Custo de estrutura | **0/10** | 16 ferramentas identificadas, zero valores. Escritório, deslocamento e equipamento sem nenhum dado |
| Tempo e capacidade | 1/10 | Nada medido. Duas capacidades declaradas, nenhuma verificada |
| Caixa | 2/10 | Só evidência anedótica (R$ 84 na conta), sem extrato |
| Tributário | **0/10** | Sem CNPJ, sem regime definido, teto do MEI estourado, Fator R nunca considerado |
| Escopo contratado | 4/10 | Escopos conhecidos, mas com ambiguidades que valem centenas de reais/mês |
| Custo dos sócios | **0/10** | Não medido, não remunerado, não reconhecido |

**Média ponderada pelo impacto na decisão de preço: 2,5/10.**

> **Consequência direta:** conforme o Prompt-mestre §7 GATE 0 — *"Não avance para preços definitivos se os custos e tempos críticos estiverem ausentes"* — nenhum preço será proposto nesta rodada. Todos os produtos em `produtos-e-precos.csv` estão marcados `NÃO APROVADO`.

---

## 6.5 DIVERGÊNCIAS DO COMITÊ

Três tensões que a análise **não resolve** porque dependem de autoridade ou de dado que não existe. Ficam visíveis, como o Prompt-mestre §1 exige.

### DIV-01 — Recorrência de moda × eventos de ticket alto

**A lente de posicionamento e a de unit economics discordam frontalmente.**

| Posição | Argumento |
|---|---|
| **Posicionamento / oferta** | O objetivo declarado é *"a maior assessoria de marketing para loja de roupa do Brasil"*. Nicho fechado é o que dá método nomeado, prova numérica e preço premium — os 6 elementos do playbook da Alpha que a Expansion não tem |
| **Unit economics / capacidade** | Os números disponíveis apontam para o outro lado. Prime recorrente: R$ 3.000/mês. Proposta Trinca: **R$ 12.000 em um dia** — o mesmo cliente, 4 meses de recorrência num evento. OTI PRO: R$ 5.800 em 2 dias |

**Onde as duas concordam:** eventos hoje têm **zero custo direto conhecido**. A comparação de margem ainda não pode ser feita — só a de receita bruta por dia. A lente de risco acrescenta que evento é receita não recorrente, sem previsibilidade e com risco de execução concentrado em um dia.

**Não resolvo.** É a decisão `A-004`. Mas registro: hoje a empresa tem **2 clientes de moda contra 4 de outros nichos**, e o maior cliente da casa — 51,67% da receita — é de outro nicho. A tese de nicho está sendo financiada pelo que ela quer abandonar.

### DIV-02 — Corrigir preço primeiro ou medir primeiro

Esta divergência **já existia no conselho de 13/07** e foi registrada em ata lá. Ela reaparece aqui com os mesmos dois lados:

| Posição | Argumento |
|---|---|
| **Operador de agência** | Reprecificar já. Todo dia de contrato abaixo do custo é dinheiro perdido e time queimando. O piso de R$ 5 mil foi decidido há 23 dias e não foi executado — mais análise é mais adiamento |
| **CFO / controller** | Não se renegocia sem dado de horas. *"Quem tem 1–2 meses de folha em caixa não tem 2–3 meses de dor para dar."* Reajuste sem entender a causa perde cliente e não corrige o modelo |

**Síntese proposta (não é consenso, é uma terceira via):** a **renovação-ponte de 30 dias** do `09-PLANO-DE-TRANSICAO`. Custa um mês de margem errada e compra o tempo da medição sem perpetuar contrato longo no valor errado. **Com uma exceção:** o Dr. Fred, onde o problema é volume e não preço, e onde esperar 30 dias custa entre R$ 350 e R$ 1.294 de MC negativa mais 140–203% de ocupação do gargalo.

### DIV-03 — O que fazer com a sub-remuneração da equipe

| Posição | Argumento |
|---|---|
| **Pessoas / capacidade** | Pagar 57–89% abaixo do mercado é o que produz o giro de ~17 nomes em 90 dias e a dependência de um freelancer com carteira própria. Corrigir remuneração é pré-requisito de capacidade |
| **CFO** | A empresa não tem margem para corrigir. Na faixa recomendada pelo conselho, a carteira **empata em zero**. Corrigir folha antes de corrigir preço acelera a insolvência |

**Onde concordam — e isso é o essencial:** as duas lentes chegam à mesma conclusão por caminhos opostos. **O preço tem de subir antes, e a folha depois** — não porque a folha atual seja aceitável, mas porque é aritmeticamente impossível corrigi-la com a receita de hoje. Enquanto isso, a empresa opera sabendo que sua margem é a diferença entre o que paga e o que o mercado paga, e que essa diferença é sua maior fonte de risco operacional.

---

## 7. REORDENAÇÃO DA SEQUÊNCIA — objeção formal ao plano

O Prompt-mestre manda ir GATE 0 → 1 → 2 → … → 9. **Contesto a ordem, como o §2.1 me obriga a fazer quando a sequência estiver errada.**

Motivo: `ALERTA-04`. Toda a carteira informada vence em agosto de 2026, e hoje é **05/08/2026**. Um plano de precificação que leve 4–6 semanas para produzir preços chegará depois que os contratos já tiverem sido renovados no valor antigo — ou perdidos.

**Sequência proposta:**

| Ordem | Ação | Prazo |
|---|---|---|
| **0.a** | Custear a proposta Trinca (R$ 12.000, evento em **10/08**) | **48 horas** |
| **0.b** | Levantar quais contratos estão vivos hoje e suas datas reais de vencimento | **48 horas** |
| **0.c** | Congelar renovação da Ciés e do Albanos até haver piso operacional | imediato |
| 1 | GATE 1 e GATE 2 em paralelo (medição de tempo roda junto com reconstrução financeira) | 2 semanas |
| 2 | GATE 3 → 4 → 5 | 2 semanas |
| 3 | GATE 6 → 7 → 8 → 9 | 2 semanas |

A medição de tempo (GATE 2) **não precisa esperar** a reconstrução financeira (GATE 1) — são insumos independentes, e serializá-los custa duas semanas que a empresa não tem.

---

**Próxima ação automática:** consolidar as respostas do `DATA-REQUEST.md`, recalcular `03-CUSTOS-E-CAPACIDADE.md` e abrir o GATE 1.
