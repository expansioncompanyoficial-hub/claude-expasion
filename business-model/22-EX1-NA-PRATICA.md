# 22 — EX1 NA PRÁTICA

**O runbook operacional.** Que ferramenta, quem opera, quanto tempo leva e o que
acontece em cada dia — do contrato assinado ao fechamento do mês.

| | |
|---|---|
| **Versão** | 1.0 |
| **Data** | 2026-08-08 |
| **Origem** | Pergunta de Nicolas, 08/08: *"como que eu vou aplicar isso pro meu sócio sem as ferramentas básicas que você me apresenta?"* |
| **Template** | `business-model/templates/BASE-CLIENTE-TEMPLATE-v1.xlsx` |
| **Versão visual** | https://claude.ai/code/artifact/b322015e-73e6-4cda-b94a-1c817425add5 |

---

## 1 — A resposta: o EX1 não depende de ferramenta

> **O EX1 fecha 30% de lucro operado 100% na mão.** A ferramenta é ganho de margem,
> não condição de viabilidade.

Isso muda a ordem das coisas: **vende-se segunda, entrega-se na mão, e a automação
entra no mês 2** — construída em cima do que já se aprendeu fazendo.

| Como se opera | Horas/mês | Lucro | Leitura |
|---|---|---|---|
| Mês 1, tudo na mão (inclui auditoria e setup) | 9,3 h | **39,4%** | Acima do alvo já no primeiro mês |
| Mês 2+, ainda na mão | 6,8 h | 45,3% | O setup não se repete |
| **Mês 2+, com a régua automatizada** | **6,0 h** | **47,2%** | O regime da tabela |
| Ponto de ruptura | 13,3 h | 30,0% | Só se estoura com base Nível 5 sem taxa de implantação |

**Memória de cálculo:** `lucro = 0,6142 × preço − horas × R$ 42,55`.
Mês 1 manual = 15 min abertura + 60 min auditoria + 45 min montagem + 30 min entrega
+ 2h45 campanha + 2h régua manual + 1h20 placar + 45 min reunião = **9,3 h**.
`0,6142 × 1.800 − 9,33 × 42,55 = R$ 708,56 = 39,4%`.

**A automação vale 1,5 h por cliente por mês.** Com 15 clientes de EX1 isso são
**22,5 h/mês** devolvidas — quase R$ 1.000 de capacidade. Bom investimento, e
investimento de mês 2.

---

## 2 — Nada aqui é tempo real, e nada precisa ser

O *cockpit em tempo real* é do `EXPANSION-360` §10.2 e é uma ambição de **gestão da
Expansion**. O EX1 é outra coisa: um produto que roda em **ritmo**, não em tempo real.
Confundir os dois é o que faz parecer impossível.

| O quê | Frequência | Por quê |
|---|---|---|
| Auditoria da base | 1× no setup | É retrato, não monitor |
| Régua automática | 1× por dia, de manhã | O gatilho é data. Ninguém percebe diferença entre "agora" e "às 9h" |
| Campanha | 1× por mês | Mais que isso queima a base |
| Placar | 1× por semana, segunda | Previsibilidade vale mais que velocidade — ele passa a esperar |
| Reunião de resultado | 1× por mês | Decide o segmento do mês seguinte |

> **O único "tempo real" que importa no EX1 é a resposta dele às conversas que a
> campanha gerou — e isso é responsabilidade da loja, não sua.** Quando ele não dá
> conta, a resposta não é software: é o EX2.

---

## 3 — A pilha mínima

| Camada | Mês 1 | Mês 2 em diante | Custo |
|---|---|---|---|
| **Base** — onde o dado mora | Planilha no padrão único, uma cópia por cliente | A mesma planilha | **R$ 0** |
| **Canal** — o que entrega a mensagem | O WhatsApp Business do próprio cliente. Disparo em lote, na mão | Ferramenta de disparo com API oficial (`D-018`) | R$ 0 → `A-034` |
| **Orquestração** — quem dispara o gatilho | Não existe. É a Débora olhando a coluna `DIAS_SEM_COMPRAR` 1×/semana | Make, lendo a planilha e disparando pelo canal | R$ 0 → plano inicial |

**Repare no que não está nessa tabela: CRM.** Ele não aparece porque não é necessário
— nem no mês 1, nem no mês 12. O que o CRM faria é o que a planilha no padrão faz,
com a diferença de que **a planilha é sua e o CRM é de outro** (`D-019`).

> **`A-034` decide se a ferramenta cabe:** ela cobra **por conta ou por número
> conectado**? Por conta, é irrelevante. **Por número, R$ 297 derruba o EX1 de 47,2%
> para 30,7%** — e abaixo de 30% com qualquer custo de mensagem. Se for por número,
> **recote antes de assinar.** Recotar leva uma semana; construir leva um trimestre.

---

## 4 — O template, aba por aba

`business-model/templates/BASE-CLIENTE-TEMPLATE-v1.xlsx` — uma cópia por cliente,
nome `BASE-<CLIENTE>-AAAA-MM`. Sobe para o Drive e abre no Google Sheets, ou usa em
Excel. **Só uma aba se preenche na mão.**

| Aba | O que é |
|---|---|
| `CONTATOS` | **A base. A única aba digitada.** Nome, telefone, 1ª e última compra, nº de compras, valor, categoria, origem. Ticket médio, dias sem comprar e faixa (`ATIVO`/`MORNO`/`DORMENTE`) calculam sozinhos |
| `AUDITORIA` | **Calcula sozinha, e é a página que fecha a venda.** Total, dormentes, ticket médio, e a venda potencial estimada da primeira campanha |
| `CAMPANHAS` | Uma linha por campanha. Taxa de resposta e conversão calculam sozinhas. **É esta aba que, somada nos 15 clientes, vira o benchmark de setor** |
| `EVENTOS` | O log: `ENVIO` · `RESPOSTA` · `VENDA` · `OPTOUT`. Quatro tipos, só esses |
| `PLACAR` | Uma linha por semana, dividida em lado Expansion e lado loja |

**As regras que não se quebram:**

- Telefone com DDD, só números: `11987654321`. Sem +55, sem parênteses, sem traço.
- Datas em `AAAA-MM-DD`. Sempre.
- Valores só número. Sem `R$`, sem ponto de milhar.
- **Quem pediu para sair recebe `S` em `OPTOUT` e nunca mais entra em campanha.**
- **Não mudar nome de coluna, não inserir coluna no meio.** Se cada cliente tiver um
  formato diferente, em doze meses não existe ativo — existem quinze planilhas.

---

## 5 — Os primeiros 30 dias

### D+0 · Assinatura — 15 min · Nicolas

- Contrato assinado **com a cláusula de dados** (`A-031`). Sem ela nada disso vira ativo
- Pasta do cliente no Drive + cópia do template
- Grupo `Expansion & <cliente>`
- **Call de auditoria agendada para até 3 dias**, 60 min, com tela compartilhada

### D+1 a 3 · A call de auditoria — 60 min · Nicolas

É a única hora do contrato em que os dois precisam estar juntos. Objetivo único:
**sair da call com o arquivo na mão.**

- Descobrir o nível da base (1 a 5 — ver `19` §9)
- **Exportar ali, na tela dele.** Não pedir para mandar depois — é assim que o
  contrato atrasa duas semanas
- Se for só WhatsApp: exportar a agenda do celular e cruzar com as etiquetas

> *"Vamos fazer juntos agora, em vinte minutos, e você nunca mais precisa se
> preocupar com isso."*

### D+3 a 5 · Montagem — 45 min a 4 h · Débora

- Colar em `CONTATOS`, padronizar telefone e data
- Deduplicar por telefone e somar as compras do mesmo número
- **Na dúvida se é cliente ou fornecedor: não entra**
- Abrir `AUDITORIA` — os números já estão prontos

### D+5 · Entrega da auditoria — 30 min · Nicolas

O momento de maior valor percebido do contrato inteiro. Uma página, três números.

> *"Você tem 2.140 clientes. 1.630 não compram há mais de um ano. Isso é R$ 8.300 de
> venda parada — e a gente vai atrás dela na semana que vem."*

### D+6 a 8 · Primeira campanha — 2h45 · Débora · por conta da casa (`D-015`)

- Segmento `MORNO` (90–365 dias)
- Copy com nome, referência à última compra, prazo curto, **uma pergunta no fim**, 4 linhas
- 2 ou 3 fotos reais de produto
- **Disparo em lotes de 50 a 100 por hora**, 10h–12h ou 18h–20h
- Lançar cada resposta e venda em `EVENTOS` por 48 h

### D+8 · Placar — 20 min · Débora · toda segunda, para sempre

Uma linha em `PLACAR` e um print no grupo. Mesmo formato toda semana.

### D+8 a 30 · A régua na mão — ~30 min/semana · Débora

Ordenar `CONTATOS` por `DIAS_SEM_COMPRAR` e mandar três listas curtas: quem cruzou
60 dias · quem comprou há 7 dias · quem faz aniversário na semana.

São dezenas de pessoas por semana, não milhares. **E é fazendo na mão que se
descobre exatamente o que automatizar.**

### D+30 · Reunião de resultado — 45 min · Nicolas · pauta fixa

- O mês em três números: venda gerada · meta de R$ 5.143 · onde ficou
- O que funcionou e o que morreu
- **O segmento e a oferta do mês seguinte, decididos ali**
- Uma pergunta sobre o estoque

---

## 6 — Quem faz o quê

| Tarefa | Quem | Tempo | Quando |
|---|---|---|---|
| Abertura de conta | Nicolas | 15 min | uma vez |
| Call de auditoria | Nicolas → **Débora a partir do 3º cliente** | 60 min | uma vez |
| Montagem da base | Débora | 45 min a 4 h | uma vez |
| Entrega da auditoria | Nicolas | 30 min | uma vez |
| **Campanha** | Débora | **2h45** | mensal |
| Régua | Débora | 30 min a 2 h | mensal |
| Placar | Débora | 20 min × 4 | semanal |
| Reunião de resultado | Nicolas | 45 min | mensal |

**O gestor de tráfego não entra no EX1 puro.** Só aparece se o cliente também tiver
tráfego — e aí é outra linha de contrato, com outro preço.

> **ALERTA-07 — a linha que precisa de vigilância é a do sócio.** No desenho acima o
> Nicolas gasta 1h30 por cliente no mês 1 e 45 min nos meses seguintes. **Com 15
> clientes de EX1 isso são 11 h/mês só de reunião, e não estão em nenhuma folha.**
> É o mesmo padrão do `ALERTA-05` (grupo de WhatsApp) e da hipótese `K06` do CSV de
> capacidade. Mitigação: **a call de auditoria passa para a Débora a partir do 3º
> cliente**, e a reunião de resultado entra na medição de `A-029`.

---

## 7 — O que a automação assume no mês 2

| O Make assume | Continua sendo gente |
|---|---|
| Ler a planilha toda manhã e achar quem cruzou 60 dias, comprou há 7, faz aniversário | **A call de auditoria.** É venda, não processo |
| Disparar pelo canal, com o nome da pessoa dentro da mensagem | **A copy e a arte da campanha.** É onde está o resultado |
| Escrever em `EVENTOS` cada envio e cada resposta | **Escolher o segmento do mês.** Sai da reunião com o cliente |
| Montar o placar de segunda e mandar no grupo | **Ler o que voltou.** Automação dispara; não interpreta |

**Construir isso é de 4 a 6 horas, uma vez**, e serve para todos os clientes — o
cenário é o mesmo, muda só a planilha de origem. Devolve 1,5 h por cliente por mês.

---

## 8 — Os quatro jeitos de furar isso

| # | O erro | O sinal | A regra |
|---|---|---|---|
| 1 | **Sair da call sem o arquivo** | *"Depois eu te mando"* | Exporta-se na call, na tela dele. Sempre |
| 2 | **Cada cliente num formato** | Alguém "melhorou" o template | Coluna não muda de nome. É o que separa ativo de 15 planilhas |
| 3 | **Disparar tudo de uma vez** | Pressa para entregar resultado | 50 a 100 por hora. **O número da loja dele é o ativo mais caro da operação** |
| 4 | **Assinar sem a cláusula de dados** | *"Depois a gente ajusta"* | **Não existe ajuste depois.** Contrato sem cláusula é dado que não vira ativo, para sempre |

---

## 9 — O que dizer para o Kauã em uma frase

> *"O EX1 roda numa planilha e no WhatsApp que o cliente já tem. Não depende de
> ferramenta nenhuma para começar — fecha 39% de lucro no primeiro mês feito
> inteiramente na mão. A automação entra no mês 2 e sobe para 47%. Pode vender
> segunda."*
