# 35 — A PLATAFORMA COMO ENTREGÁVEL

**Validação da ideia:** todo cliente de EX1 tem a base extraída para o CRM próprio da
Expansion, usa a plataforma como parte do pacote, e alimenta o ativo da casa.

| | |
|---|---|
| **Versão** | 1.0 |
| **Data** | 2026-08-19 |
| **Origem** | Nicolas: *"todo cliente que entrar de mil e oitocentos, a gente precisa extrair a base dele… jogar direto pro nosso CRM… ele vai estar alimentando o nosso próprio aplicativo"* |
| **Versão visual** | https://claude.ai/code/artifact/1db23fd2-8718-4358-8cf9-23115867fa14 |
| **Status** | `PROPOSTA` — e **bloqueada por `A-039`** |
| **Nota sobre LGPD** | A seção 8 é **preliminar**. Há pesquisa jurídica em curso; o que estiver lá é a pergunta a levar ao advogado, não a resposta |

---

## 0 — O veredito, em três linhas

| | |
|---|---|
| ✅ **A direção está certa** | E é mais certa do que você argumentou. Você tem a coisa mais difícil de um software: **distribuição garantida antes do produto existir** |
| 🔧 **Três mecânicas eu mudo** | *"de graça"* · o preço de R$ 2.200 · e a premissa de que a lojista vai usar |
| 🛑 **Duas coisas travam a partida** | A **cessão de IP** e a **cláusula de dados**. Nenhuma das duas tem conserto retroativo, e as duas ficaram mais graves com esta ideia, não menos |

---

## 1 — Por que a direção está certa

Três razões, e a segunda é melhor que o argumento que você deu.

### 1.1 · Você está fazendo na ordem certa, e quase ninguém faz

Todo mundo constrói o software e depois procura quem use. **Você tem 15 a 18 usuários
contratados antes da primeira tela existir** — e eles pagam mensalidade por outro motivo,
então o software não precisa se sustentar sozinho no dia 1.

Distribuição é a parte cara de um produto de software. **Você já pagou por ela**, e
pagou vendendo assessoria.

### 1.2 · O efeito que você não citou: isso é retenção, não é dado

O argumento que você deu foi o do dado acumulado. O argumento mais forte é outro:
**um cliente cuja base de clientes mora no seu sistema não cancela com a mesma
facilidade.**

Hoje o EX1 não tem nenhuma trava de saída — a lojista sai e leva a planilha. Com a base
dentro da plataforma, sair custa trabalho a ela. **Isso vale mais, e vale antes, do que
qualquer dado agregado.** É a resposta direta ao contrato de 6 meses e à renovação.

### 1.3 · Converte um custo em ativo — mas só numa condição

Hoje a Expansion aluga ferramenta. Alugar é despesa que sai todo mês e não deixa nada.
Construir é investimento que fica. **Isso só é verdade se a ferramenta alugada for cara
— e ainda não se sabe se ela é.** É a seção 2.

---

## 2 — A dobradiça: `A-034` decide se essa plataforma vale R$ 3,5 mil ou R$ 53 mil por ano

Aberta desde 08/08 e ainda sem resposta. **A pergunta é uma só:** *os R$ 297/mês da
ferramenta são por conta ou por número conectado?*

| Se a ferramenta for | Custo com 15 clientes | Ganho da plataforma própria | Por ano |
|---|---:|---:|---:|
| **Por conta** | R$ 297/mês total | **+0,8 p.p.** de lucro | **R$ 3.564** |
| **Por número** | R$ 4.455/mês | **+12,4 p.p.** de lucro | **R$ 53.460** |

**No EX1 GIRO de R$ 2.400, com 12,75 h:**

| | Alugando | Plataforma própria |
|---|---:|---:|
| Ferramenta por conta | 31,7% | 32,6% |
| **Ferramenta por número** | **20,2%** | **32,6%** |

> **Se a ferramenta for cobrada por número, construir a plataforma paga um salário por
> ano e o produto nem fecha os 30% sem ela.** Se for por conta, o ganho econômico é
> quase nada — e a justificativa passa a ser inteiramente retenção e ativo, que continua
> valendo, mas é outra conversa.
>
> **Uma ligação resolve.** É a mesma ligação da sexta-feira no plano de `32`.

### E uma correção importante, porque acho que há uma confusão aqui

**A plataforma própria NÃO elimina o custo de mensagem da Meta.** Ela substitui a
*ferramenta de orquestração* — quem manda a ordem de disparo. **O canal continua sendo o
WhatsApp da Meta, e a Meta cobra por mensagem de qualquer jeito.**

O `ALERTA-08` continua de pé com CRM próprio: campanha de marketing para 2.000 contatos
custa R$ 620–760 de Meta, e a franquia de 600 disparos (`D-040`) continua sendo condição
de existência do produto.

---

## 3 — Mecânica que eu mudo, nº 1: não é "de graça"

Você escreveu: *"meio que a gente fala que ele está recebendo de graça né, um bônus ali."*

**É a mesma armadilha do `33` §5.2, e eu vou repetir porque agora ela custa mais caro.**

| O que "de graça" faz | Consequência |
|---|---|
| Cria obrigação sem receita | Suporte, uptime, bug, pedido de funcionalidade — tudo é custo real com preço zero |
| Define o preço de referência em **zero** | No dia em que você quiser vender o CRM avulso, os seus próprios clientes são a prova de que ele não vale nada |
| Vira moeda de negociação contra você | *"Corta o CRM e me dá desconto"* — e você não pode, porque é ali que a base dele mora |

**A palavra certa é "inclusa":**

> *"A plataforma está inclusa na sua mensalidade. É onde a sua base vive, é onde você vê
> o placar, e enquanto você for cliente ela é sua."*

**Valor percebido idêntico. Precedente de preço, nenhum.** E abre a porta natural para o
dia em que ela virar linha de receita: *"para quem não é cliente de assessoria, a
plataforma custa X."*

---

## 4 — Mecânica que eu mudo, nº 2: R$ 2.200 anda para o lado errado

Você disse *"com a plataforma sai, sei lá, dois mil e duzentos"*. Mas o `33` fechou em
**R$ 2.400 sem plataforma nenhuma** — e a plataforma **adiciona** horas de suporte, não
tira.

| Suporte por cliente/mês | Horas totais | R$ 2.200 | R$ 2.400 | R$ 2.600 |
|---|---:|---:|---:|---:|
| sem suporte | 12,00 h | 31,4% | 33,9% | 36,0% |
| 30 min | 12,50 h | 30,4% | 33,0% | 35,2% |
| **45 min** | **12,75 h** | **29,9%** ⚠️ | **32,6%** ✅ | 34,8% |
| 1 hora | 13,00 h | 29,5% ❌ | 32,1% | 34,4% |
| 1h30 | 13,50 h | 28,5% ❌ | 31,2% | 33,6% |
| 2 horas | 14,00 h | 27,5% ❌ | 30,3% | 32,7% |

> **A R$ 2.200 o produto fura os 30% com uma hora de suporte por cliente.** A R$ 2.400
> ele aguenta até duas horas. **A diferença de R$ 200 é a margem de erro inteira.**

**Recomendação: R$ 2.400 continua, com a plataforma inclusa.** A plataforma não é motivo
para baixar preço — é motivo para o preço se sustentar quando o concorrente cobrar menos.

---

## 5 — Mecânica que eu mudo, nº 3: "ele vai usar" contradiz a promessa do produto

Esta é a mais séria das três, porque bate de frente com uma decisão que já está no
acervo.

**O `23` diz, e está certo: *"o lojista não preenche nada"*.** Foi a resposta ao seu
próprio incômodo de que a Débora não podia ficar disparando na mão e a lojista não podia
ficar abrindo planilha. **Dar um login para ela é pedir para ela trabalhar** — que é
exatamente o que o produto promete que ela não vai precisar fazer.

E o mercado já respondeu isso: **41% das MPEs brasileiras já têm chatbot, e só ~3% das
conversas de varejo conversacional são resolvidas fim a fim por IA.** O mercado
**compra ferramenta e não usa.** A hipótese *"como ele não tem nada ainda, vai ser muito
bom, ele vai usar"* é exatamente a hipótese que esse dado derruba.

### A saída, e ela é melhor do que as duas pontas

**Fase 1: a plataforma é um painel de LEITURA.** Ela não preenche nada — ela **vê**:

| O que ela vê | Por que isso a faz abrir |
|---|---|
| **O placar da semana**, ao vivo | É o entregável que ela mais gosta, e hoje chega por print no grupo |
| **A base auditada** — quantos ativos, mornos, dormentes | É o número que fechou a venda. Ver ele mudar é viciante |
| **A campanha do mês** — quem recebeu, quantos responderam | Prova de trabalho, sem ela ter que perguntar |
| **O histórico de cada cliente dela** | O único momento em que ela vai querer digitar algo |

**Quem alimenta o dado é a Expansion, não ela.** O dado entra pela operação — a
auditoria, o disparo, a resposta —, não pelo teclado da lojista.

**Fase 2: ela ganha escrita só onde ela pedir.** Regra dura: **nenhuma funcionalidade de
escrita entra sem 3 clientes diferentes terem pedido a mesma coisa.** Isso impede que a
plataforma vire um projeto sem fim.

> **O ganho é o mesmo e o risco é zero:** você recebe o dado, cria o hábito de ela abrir
> a plataforma toda segunda, e não quebra a promessa central do produto.

---

## 6 — `ALERTA-10` · O suporte não está em nenhuma hora

Terceira vez que esse padrão aparece neste acervo — depois do grupo de WhatsApp
(`ALERTA-05`) e do tempo do sócio (`ALERTA-07`). **Vale a pena reconhecer o padrão: toda
vez que a Expansion coloca um canal humano no escopo sem contar a hora, o produto sai do
alvo.**

Uma lojista com login vai: esquecer a senha, não entender uma tela, achar um erro, pedir
um relatório novo, e mandar áudio às 22h perguntando por que um número está diferente.

| | |
|---|---|
| **Estimativa** | 30 a 60 min por cliente por mês — `ESTIMADO`, sem base |
| **Com 15 clientes** | **7,5 a 15 h/mês** — quase meia pessoa |
| **Quem absorve hoje** | Ninguém. Não está em folha nem em preço |
| **Mitigação** | Painel só-leitura na fase 1 (menos superfície para quebrar) · SLA escrito de 1 dia útil · um vídeo de 3 minutos no onboarding · e **a mesma cronometragem de `A-029` mede isto também** |

---

## 7 — 🛑 O que trava: a cessão de IP deixou de ser importante e virou existencial

`A-039` está aberta desde **08/08 — onze dias**. Até hoje ela era uma boa prática. **Com
esta ideia ela vira condição de partida, e por três motivos novos:**

1. **Você passa a vender acesso a um ativo que não é comprovadamente seu.** Enquanto era
   uso interno, o risco era da Expansion. Agora entra no contrato do cliente — e você
   promete a ele uma plataforma que juridicamente pode não ser sua para prometer.
2. **A base dos clientes passa a morar lá dentro.** Se a relação com o desenvolvedor
   azedar, não é só código que fica do outro lado: **é a base de 15 lojistas.** Isso não
   é disputa societária, é incidente com cliente.
3. **É o ativo que você diz que quer vender depois.** *"Quando a gente pensar em vender
   só o CRM por fora"* — não se vende o que não se é dono. Qualquer comprador ou
   investidor pede a cadeia de titularidade na primeira hora de diligência.

> **E o mais incômodo:** a regra *"cessão de IP ou nada"* **é sua**, escrita por você no
> parecer da WebLuxury sobre o sistema do Cleber. Você aplicou a regra quando estava do
> outro lado da mesa.
>
> **Conserto: uma página e uma conversa. Custo: zero. Prazo: antes da próxima linha de
> código que toque dado de cliente.**

---

## 8 — 🛑 O que trava: o seu papel na LGPD muda de natureza

> ⚠️ **Seção preliminar.** Há pesquisa jurídica em curso e ela pode refinar isto. O que
> está aqui é **a pergunta para o advogado**, não a resposta.

Hoje a Expansion é **operadora**: dispara em nome da loja, com a base da loja, para a
finalidade da loja. A responsabilidade principal é do lojista.

**No momento em que a base passa a morar num sistema da Expansion, e a Expansion pretende
usar o conjunto para construir um produto que vai vender**, ela deixa de ser só operadora
e passa a ser **controladora para essa nova finalidade.** Isso exige:

| # | O que muda | Por quê |
|---|---|---|
| 1 | **Base legal própria** para a finalidade nova | "Melhorar o serviço" não cobre "construir e vender um produto". São finalidades diferentes e cada uma precisa da sua |
| 2 | **A cláusula tem que estar assinada ANTES do primeiro registro entrar** | **Não há conserto retroativo.** Dado que entrou sem previsão contratual não pode ser reaproveitado depois |
| 3 | **Anonimização de verdade, se o uso for agregado** | Se você guarda telefone e histórico de compra, **não é anonimizado — é pseudonimizado**, e continua sendo dado pessoal com todas as obrigações. Isso muda o que você pode fazer com o conjunto |
| 4 | **Encadeamento com o titular final** | A consumidora da loja nunca falou com a Expansion. A cadeia de base legal precisa chegar até ela |

**`A-031` está aberta desde 08/08 junto com a cessão de IP.** As 12 cláusulas já estão
escritas em `24` §5, prontas para o advogado. **Faltam duas respostas suas:** já foi ao
advogado? Existe contrato assinado sem a cláusula?

---

## 9 — A escala real do dado, e a boa notícia que vem junto

Você disse: *"esse CRM está tão bem alimentado que ele vai valer muito"*. Deixa eu ser
honesto sobre a magnitude, porque isso muda o que você deve esperar e quando.

| Carteira | Registros | Comparado à Dito CRM (~20 milhões de consumidores) |
|---|---:|---:|
| 5 lojas | 10.000 | 0,05% |
| **15 lojas** | **30.000** | **0,15%** |
| 30 lojas | 60.000 | 0,30% |
| 50 lojas | 100.000 | 0,50% |

**Como volume de dado, 30 mil registros não é um ativo negociável.** Quem compra dado
compra escala, e a escala está a duas ordens de grandeza daqui.

### Mas existe um ativo que chega muito antes, e vale muito mais para você agora

**O benchmark próprio.**

Com **5 lojas rodando por 6 meses são 30 campanhas medidas**: taxa de entrega, de
resposta, de conversão, ticket da venda reativada, e o que funciona em cada faixa da
base. **No nicho exato de moda feminina e infantil.**

E aí está a parte que importa: **hoje a Expansion tem ZERO caso próprio com número.** O
EX1 é vendido com dado de terceiro e com a oferta da primeira campanha por conta da casa
justamente porque não há prova.

> **O primeiro ativo da plataforma não é o dado — é a resposta para *"vocês têm case?"*.**
> E ele chega em **6 meses**, não em 3 anos. É `A-045`, que está aberta e sem dono.

---

## 10 — O portão que você mesmo aceitou

O conselho de **13/07** proibiu software próprio por 6 meses e condicionou a retomada a
**MRR de assessoria ≥ R$ 60–80 mil.**

| | |
|---|---|
| MRR hoje | **R$ 15.817** |
| Portão | R$ 60.000 |
| **Atingimento** | **26,4%** |
| Falta | R$ 44.183 — cerca de **18 clientes de EX1 GIRO** |

### 🔺 E aqui eu errei há dez minutos, então corrijo agora

Escrevi que a fase 1 caberia dentro de `D-021`. **Fui conferir o texto da decisão e não
cabe.** `D-021` diz, com estas palavras:

> *"Continua proibido: contratar freela de desenvolvimento, **construir aplicação para o
> cliente usar**, customizar por cliente."*

**Um painel com login para a lojista abrir é, literalmente, aplicação para o cliente
usar.** Não é zona cinzenta, e tentar enquadrar como "só leitura" seria advogar contra a
minha própria regra.

O que `D-021` **liberou** foi outra coisa: estender o `expansion-os-prod` com **módulo
interno** — banco, padrão de dados, automação que a Expansion opera. **Isso continua
liberado, e é onde 80% do valor está** (o ativo é a base no padrão certo, não a tela).

| | Situação em `D-021` |
|---|---|
| Guardar a base no OS, no padrão de dados | ✅ **Liberado** — é módulo interno |
| Disparar e medir a partir do OS | ✅ **Liberado** — é operação da Expansion |
| **Painel com login para a lojista** | ❌ **Proibido** — é aplicação para o cliente usar |
| **Vender o CRM avulso** | ❌ **Proibido** — e é o que o portão de R$ 60 mil barra |

> **Minha leitura corrigida:** a parte que constrói o ativo — a base no padrão, dentro do
> OS — **você pode fazer amanhã, sem pedir nada a ninguém.** A parte da tela com login
> **precisa de aceite explícito do conselho**, não da direção sozinha (`D-020`: *só o
> conselho revoga*).
>
> **E isso é boa notícia, não má:** dá para começar a acumular o ativo **agora**, e levar
> ao conselho um pedido pequeno e concreto — *"quero abrir um painel de leitura para 5
> clientes"* — em vez de um pedido vago de "fazer software".

---

## 11 — O desenho que eu recomendo

| Fase | Quando | O que | Condição de entrada |
|---|---|---|---|
| **0 · Papel** | **antes de tudo** | Cessão de IP assinada · cláusula de dados no modelo de contrato | **Bloqueante. Nada começa sem** |
| **1a · Módulo interno** | **agora** | A base no padrão de dados dentro do `expansion-os-prod`. **Sem tela, sem login.** É onde está o ativo | Fase 0 fechada. **Já liberado por `D-021`** |
| **1b · Painel** | clientes 1 a 5 | Só leitura: placar ao vivo, base auditada, campanha do mês, histórico. **Ela não preenche nada** | Fase 1a rodando **+ aceite do conselho** — `D-021` proíbe aplicação para o cliente usar |
| **2 · Escrita sob demanda** | clientes 6 a 15 | Funcionalidade de escrita entra **só com 3 clientes pedindo a mesma coisa** | Suporte medido e dentro de 45 min/cliente |
| **3 · Benchmark** | 6 meses de fase 1 | O relatório do que funciona no nicho — **o primeiro case próprio da casa** | 5 clientes × 6 campanhas |
| **4 · Produto avulso** | **só depois do portão** | Multi-inquilino, autoatendimento, cobrança, SLA | **MRR ≥ R$ 60 mil e decisão do conselho** |

**E o que a plataforma precisa fazer na fase 1, em ordem de importância:**

1. **Guardar a base no padrão de `20` §4** — é o ativo, e é o que sobrevive a qualquer
   troca de ferramenta
2. **Mostrar o placar** — é o que faz ela abrir
3. **Disparar** — só depois que 1 e 2 estiverem rodando. **Disparo é o que menos importa,
   porque é o que qualquer ferramenta faz**

---

## 12 — O que eu preciso de você

1. **Existe alguma coisa escrita com o desenvolvedor?** Qualquer coisa. É a pergunta mais
   importante deste documento.
2. **A cláusula de dados já foi ao advogado?** E existe contrato assinado sem ela?
3. **A ferramenta é cobrada por conta ou por número?** Decide se a plataforma vale
   R$ 3.564 ou R$ 53.460 por ano.
4. **Aceita R$ 2.400 com a plataforma inclusa** — em vez de R$ 2.200 com ela "de graça"?
5. **Aceita a fase 1 como painel só-leitura**, sem a lojista preencher nada?
6. **Quem atende o suporte da plataforma?** Se a resposta for "eu", isso é a represa do
   conselho outra vez.

---

## 13 — Em uma frase

> **A ideia está certa, chega na hora certa, e é a primeira vez neste acervo que a tese
> de plataforma tem um caminho concreto em vez de ser ambição.**
>
> **Só que ela transforma duas pendências de papel em pendências existenciais.** Enquanto
> não houver cessão de IP assinada e cláusula de dados no contrato, cada cliente novo que
> entrar com a base extraída **aumenta o tamanho do problema em vez de construir o
> ativo.**
>
> São duas conversas e duas páginas. **Faça as duas esta semana e a fase 1 pode começar
> no cliente nº 1.**
