# 32 — O QUE FAZER AGORA

**Você decidiu seguir. Então a primeira coisa não é vender — é a renovação.**

| | |
|---|---|
| **Versão** | 1.0 |
| **Data** | 2026-08-19 (quarta-feira) |
| **Origem** | Nicolas: *"decidimos seguir. O que você acha que preciso fazer agora?"* |
| **Versão visual** | https://claude.ai/code/artifact/e9960928-cbc7-4927-9c4c-2c11bcb67dbf |
| **Status das horas desta análise** | `ESTIMADO` — reconstruídas a partir do escopo declarado em `data/clientes-e-contratos.csv`. **Não foram cronometradas** (`A-029`) |

---

## 0 — O relógio que ninguém olhou

Antes de qualquer plano de venda, isto:

| Cliente | Vence | Faltam |
|---|---|---|
| **Prime Assessoria** | **31/08/2026** | **12 dias** |
| **Ciés Brand** | **31/08/2026** | **12 dias** |
| **Dr. Fred** | 05/08/2026 ou antes | **já venceu há 14 dias** |
| **Jane JQL** | 05/08/2026 ou antes | **já venceu há 14 dias** |
| **Albanos — 51,7% da receita** | `NÃO INFORMADO` | **não se sabe** |

**Dois contratos venceram há duas semanas e não há registro de renovação.** Dois vencem
em doze dias. E o maior cliente da casa, que sozinho é metade da receita, **não tem data
de término registrada em lugar nenhum.**

> **Perder Ciés + Albanos leva o resultado da empresa a −R$ 3.200/mês** (`03` ALERTA-04).
> Isso não é cenário de risco — é o calendário de agosto.

**É por isso que a resposta para "o que faço agora" não é prospectar.** O produto novo
existe para ser vendido, e o primeiro lugar onde ele se vende é **dentro de casa, nas
cinco renovações que estão vencendo.**

---

## 1 — A carteira, cliente por cliente: o que paga contra o que custa

Reconstruí as horas de cada contrato a partir do escopo declarado no CSV, ao custo-hora
carregado de R$ 42,55 e à fórmula `lucro = 0,6142 × preço − horas × 42,55`.

| Cliente | Paga | Horas/mês | Lucro | Piso do escopo | Paga % do piso |
|---|---:|---:|---:|---:|---:|
| **Prime** | R$ 3.000 | 43 h | **R$ 13 · 0,4%** | R$ 5.823 | 52% |
| Prime, contando o grupo (30 min/dia) | R$ 3.000 | 53 h | **−R$ 413 · −13,8%** | R$ 7.177 | 42% |
| **Ciés** | R$ 1.667 | 34 h | **−R$ 423 · −25,4%** | R$ 4.604 | 36% |
| **Jane JQL** | R$ 1.400 | 34 h | **−R$ 587 · −41,9%** | R$ 4.604 | 30% |
| **Dr. Fred** | R$ 1.750 | 113,5 h | **−R$ 3.755 · −214,5%** | R$ 15.369 | 11% |
| **Albanos** (4 perfis) | R$ 8.000 | 95–114 h | **R$ 63 a R$ 871 · 0,8% a 10,9%** | R$ 12.864–15.437 | 52–62% |

### O número que resume tudo

```
Horas que a carteira consome hoje ....... 319 a 338 h/mês
Capacidade de entrega direta ............ 204 h/mês
                                          ─────────────
                                          157% a 166%
```

**A casa está entregando 60% a mais do que cabe — e de graça.** Isso não é um problema
de preço. É um problema de escopo, e ele explica sozinho três coisas que já estavam
escritas no acervo e pareciam desconexas:

- por que **o editor principal está a 168,9% da capacidade** (`03` §4.1);
- por que **não existe hora nenhuma para o Kauã vender**;
- por que **a receita por pessoa é R$ 1.935** contra o piso de R$ 12.000 do conselho.

> **A renovação não é uma operação de preço. É uma operação de capacidade.**
> Sem ela, o Kauã vende e não tem quem entregue.

### O que cada renovação vira

| Cliente | Hoje | Vira | Preço | Horas devolvidas |
|---|---|---|---:|---:|
| **Ciés** | R$ 1.667 · 34 h | **EX1 · BASE** | R$ 1.800 | **−28 h** |
| **Prime** | R$ 3.000 · 43 h | **EX2 · CONTEÚDO** | R$ 3.200 | **−28,75 h** |
| **Jane JQL** | R$ 1.400 · 34 h | **EX2 · CONTEÚDO** ou saída | R$ 3.200 | **−19,75 h** |
| **Dr. Fred** | R$ 1.750 · 113,5 h | **EX2 · CONTEÚDO** ou saída | R$ 3.200 | **−99,25 h** |
| **Clau Kids** | `NÃO INFORMADO` | **EX1 LEVE** | R$ 1.200 | — |
| **Albanos** | R$ 8.000 · 95–114 h | mantém o preço, **renegocia o escopo** | R$ 8.000 | a apurar |

```
MRR hoje ............ R$ 15.817       Horas hoje ....... 319 a 338 h  (157–166%)
MRR migrado ......... R$ 20.600       Horas migradas ... 146 a 165 h  ( 72– 81%)
                      ─────────                          ───────────
                      +R$ 4.783                          sobram 39 a 58 h
```

**Trinta e nove a cinquenta e oito horas livres é espaço para 6 a 9 EX1 novos.**
É exatamente disso que o Kauã precisa para trabalhar — e hoje não existe.

### E a frase que faz cada uma dessas conversas funcionar

Nenhuma delas é um pedido de aumento. **Em quatro dos cinco casos o preço quase não
mexe** — o que muda é o escopo, para menos, com um entregável novo em troca:

> *"Vou mudar o que a gente faz para você. Sai volume, entra método: a grade fechada,
> a contagem definida e o placar toda segunda mostrando os dois lados. O valor fica
> praticamente igual. O que você ganha é saber o que está acontecendo — que é
> exatamente o que faltou até aqui."*

**Para a Prime isso é literal:** ela quase cancelou por ausência de relatório
(16/07/2026). **O placar semanal é a resposta à objeção que ela já fez.**

---

## 2 — Esta semana · quarta 19 a sexta 21

Cinco movimentos. **Nenhum deles é código, nenhum precisa de ferramenta nova.**

| # | Movimento | Quem | Quando | Por quê |
|---|---|---|---|---|
| **1** | **Descobrir a data de término do Albanos.** Uma mensagem. É metade da receita da casa e a data não existe em documento nenhum | Nicolas | **hoje** | Não dá para planejar setembro sem saber se 51,7% da receita continua |
| **2** | **Ligar para Prime e Ciés** e marcar a conversa de renovação para esta semana. Não mandar proposta — marcar conversa | Nicolas + Kauã | **hoje** | 12 dias. Renovação que chega no dia 30 é renovação perdida |
| **3** | **Confirmar se Dr. Fred e Jane JQL ainda estão ativos** e em que termos | Nicolas | **quinta** | Estão vencidos há 14 dias. Se seguem entregando sem contrato, é risco e é prejuízo |
| **4** | **Começar a cronometragem** (`A-029`). Débora, Adryel e Matheus apontam hora real por cliente, todo dia, numa planilha de três colunas: cliente · atividade · minutos | Débora, Adryel, Matheus | **começa quinta** | Leva 2 semanas de calendário. **É a premissa que sustenta a tabela inteira** — começa agora ou o resultado só chega em setembro |
| **5** | **Pedir duas cotações**: (a) a ferramenta de disparo — **por conta ou por número conectado?** (`A-034`); (b) o custo Meta por mensagem, separado em marketing e utilidade (`D-040`) | Nicolas | **sexta** | A primeira decide se o EX1 tem 47,2% ou 30,7% de lucro. A segunda decide se ele tem 34,9% ou 8,9% |

> **Os movimentos 1, 2 e 3 são telefone.** Somados, não passam de duas horas de trabalho
> — e são os únicos que têm data de validade.

---

## 3 — As três coisas que não têm volta

Estas não estão no caminho crítico da venda. Estão no caminho crítico de **você ser dono
do que está construindo.** Cada dia que passa piora, e nenhuma custa dinheiro.

### 3.1 · A cessão de IP com o desenvolvedor — `A-039` · **BLOQUEANTE**

Ele constrói o Expansion OS **em permuta**, com uma *"possível sociedade"* que nunca foi
escrita. **Sem cessão assinada, a Expansion não é dona do ativo em que a tese inteira se
apoia.**

É o espelho invertido do que você mesmo escreveu no parecer da WebLuxury: *"cessão de IP
ou nada"*. **Conserto: uma página e uma conversa.** Custo: zero. Prazo: hoje.

### 3.2 · A cláusula de dados — `A-031`

**Não tem conserto retroativo.** Todo contrato assinado sem ela é um cliente cujo dado
nunca poderá alimentar CRM próprio nem IA — e *"esses dados têm que ser nossos"* é a sua
frase, não minha.

Os 12 controles estão escritos em `24` §5, prontos para o advogado. **Duas perguntas que
ainda não foram respondidas:** já foi ao advogado? Existe contrato assinado sem a
cláusula?

### 3.3 · O CNPJ e o regime tributário — `A-006`

**Todo preço deste acervo é `NÃO APROVADO` até isso fechar.** O Fator R está em ~0% por
operar 100% com PJ, o que empurra a empresa para o Anexo V — **9,42 pontos de alíquota,
cerca de R$ 1.458/mês.** Você está prestes a vender com uma tabela que não passou por
imposto.

---

## 4 — Semana de 24 a 28 de agosto

| # | O quê | Quem |
|---|---|---|
| 6 | **Fechar as renovações da Prime e da Ciés** nos produtos novos, com contrato de 6 meses | Nicolas + Kauã |
| 7 | **Rodar o piloto do EX1 na Ciés** — auditoria da base, uma campanha, e **medir** (`A-045`). É o primeiro case real da casa | Débora |
| 8 | **Testar a extração de base num aparelho real** (`A-030`) antes de o Kauã prometer qualquer coisa | Matheus |
| 9 | **Montar a lista de prospecção por faixa de faturamento**, não por logo. Moda feminina e infantil, R$ 40 mil+ | Kauã |
| 10 | **Definir a meta do Kauã em 30 dias** (`A-044`) — quantos EX1 ele fecha. Sem número, não há como saber se contrata em setembro ou em novembro | Nicolas + Kauã |

---

## 5 — O placar do dia 30 · até 18 de setembro

Cinco números. Se estes cinco estiverem certos no dia 18/09, o trimestre está ganho.

| # | Indicador | Meta |
|---|---|---|
| 1 | **Renovações fechadas nos produtos novos** | **4 de 5** |
| 2 | **Horas da carteira** | de 319–338 h para **abaixo de 170 h** |
| 3 | **MRR** | de R$ 15.817 para **R$ 20.600+** |
| 4 | **Case próprio do EX1, com número medido** | **1** (a Ciés) |
| 5 | **EX1 novos vendidos pelo Kauã** | a definir com ele — mas **≠ zero** |

E os três documentos que precisam existir: **cessão de IP assinada · cláusula de dados
no modelo de contrato · CNPJ com regime definido.**

---

## 6 — O que NÃO fazer agora

Igualmente importante. Cada um destes parece produtivo e não é:

| ❌ | Por quê |
|---|---|
| **Construir o módulo BASE no Expansion OS** | 34–48 h que hoje não têm dono (`A-037`) — e se for você, é exatamente a represa que o conselho mandou drenar. **A planilha template já resolve os 5 primeiros clientes** |
| **Contratar para o EX2** | O EX2 · IA está congelado. O EX2 · CONTEÚDO cabe no time atual. **Não há vaga aberta neste plano** |
| **Reprecificar o Albanos** | `D-030` já decidiu manter o preço. Reajustar +150% no mesmo escopo perde o cliente (`A-016`). **O que se renegocia com ele é escopo, e só depois da cronometragem** |
| **Prospectar antes de liberar as horas** | A casa está a 157–166% da capacidade. **Vender agora é vender o que não se pode entregar** — e foi assim que a Prime quase cancelou |
| **Mexer no preço do EX3 por causa do grupo** | Testa-se o SLA primeiro (`A-027`). O preço de R$ 7.000 é o plano B, não o plano A |
| **Prometer resultado com base na Ciés** | **Não há case.** Enquanto não houver número medido, a oferta é *"a primeira campanha é por minha conta"* |

---

## 7 — O que eu preciso de você para continuar

Sem estas, o próximo passo é chute:

1. **A data de término do Albanos.**
2. **Dr. Fred e Jane JQL seguem ativos?** Em que termos?
3. **Quanto a Clau Kids paga hoje?** É o único cliente ativo sem receita registrada.
4. **A cláusula de dados já foi ao advogado?** Existe contrato assinado sem ela?
5. **Existe alguma coisa escrita com o desenvolvedor?** Qualquer coisa — mensagem, e-mail, acordo verbal com testemunha.
6. **A meta do Kauã em 30 dias.**

---

## 8 — Em uma frase

> **Você não precisa de clientes novos neste momento. Você precisa das mesmas seis
> contas, nos produtos certos, ocupando um terço das horas que ocupam hoje.**
>
> O MRR sobe R$ 4.783 sem prospectar ninguém, a carteira sai de 166% para 81% da
> capacidade, e aí — só aí — o Kauã tem 39 a 58 horas livres para vender dentro.
