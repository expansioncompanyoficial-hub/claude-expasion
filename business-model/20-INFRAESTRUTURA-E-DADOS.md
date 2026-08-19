# 20 — INFRAESTRUTURA E DADOS

**Em que a régua automática roda, e o que fazer com a tese de CRM próprio.**

| | |
|---|---|
| **Versão** | 1.0 |
| **Data** | 2026-08-08 |
| **Origem** | Pergunta de Nicolas, 08/08: *"eu preciso ter esse CRM já, é algo de urgente?"* |
| **Status** | `ESTIMADO` — os custos de mensagem são estimativa, ver §3 |

---

## 1 — A resposta curta

**Não. O CRM não é urgente. O padrão de dados é.**

A tese que o Nicolas descreveu — uma plataforma própria que acumula os dados de
todos os clientes e dos consumidores desses clientes, alimentando uma IA que
melhora a cada loja — **é uma tese boa e é um ativo real.** Efeito de rede de
dados: cada loja nova torna o produto melhor para todas as outras, e isso é
exatamente o tipo de vantagem que não se copia com dinheiro.

Mas há uma confusão de camadas embutida nela, e ela custa caro:

> **O ativo não é o software. É o dado.** O software é alugável hoje por uma
> fração do custo de construir. O dado, se não for capturado num formato único
> desde o cliente nº 1, **não é recuperável depois.**

Construir CRM é 6 a 18 meses, um time de tecnologia e manutenção permanente. Hoje
a Expansion tem a carteira inteira vencendo em agosto e uma folha que não fecha.
Construir agora compete com a única coisa que importa nas próximas seis semanas:
fechar contratos no preço novo.

**Alugue a ferramenta. Seja dono do padrão.**

E aqui está a armadilha específica, que é o motivo deste documento existir: se ele
alugar uma ferramenta **sem** padrão de dados, em doze meses ele terá quatorze
silos bagunçados, cada cliente num formato — e nada para treinar. Terá pago o
custo de acumular sem ganhar o ativo.

---

## 2 — O que a régua roda em cima esta semana

O entregável 1.2 do EX1 (régua automática) **não existe sem ferramenta.** São três
camadas, e elas podem vir de fornecedores diferentes:

| Camada | O que faz | Situação |
|---|---|---|
| **Canal** | conecta ao WhatsApp e entrega a mensagem | **É a decisão A-003, aberta desde 17/07** — ver §2.1 |
| **Orquestração** | dispara no gatilho certo, na hora certa | **Provavelmente já existe:** a conta tem Make conectado. Make ou n8n resolvem a régua inteira sem código |
| **Base** | guarda contato, histórico e status | Pode começar em planilha estruturada — **desde que no padrão do §4** |

**Recomendação:** alugar canal, usar Make para a orquestração, e manter a base no
padrão do §4 desde o primeiro cliente. Zero desenvolvimento. Semana 1.

### 2.1 · A bifurcação que trava tudo — oficial × não-oficial

| | **Oficial** (Meta Cloud API via provedor) | **Não-oficial** |
|---|---|---|
| Custo | **por conversa** | mensalidade fixa, sem custo por mensagem |
| Bloqueio do número | não acontece por uso permitido | **acontece, e é o risco do negócio** |
| Aprovação de texto | template precisa ser aprovado | livre |
| Opt-in | obrigatório | não exigido pela ferramenta |

> **Recomendação: oficial, e a razão é comercial, não técnica.** O número em risco
> **é o da loja do cliente** — o mesmo número onde ela atende, vende e tem todo o
> histórico. Se ele cai, ela não perde uma campanha: perde o negócio dela. Não é um
> risco que a Expansion possa assumir em nome de terceiro, e não é recuperável com
> pedido de desculpas.
>
> O custo por conversa é passável ao cliente (§3). O número banido, não.

**Decisão: A-003, que precisa ser fechada antes de vender o EX1.**

---

## 3 — ALERTA-06 · O custo de mensagem não está em nenhum preço

O EX1 é o primeiro produto da casa com **custo variável real**. Todos os outros
custos são fixos ou proporcionais à receita. Este não: cresce com o tamanho da
base do cliente, que é exatamente o que a Expansion está tentando aumentar.

**Quanto o EX1 aguenta:** para manter 30% de lucro, o custo de mensagem tem que
ficar abaixo de **R$ 310/mês**.
`Lucro sem mensagem = 0,6142 × 1.800 − 255,30 = R$ 850,26. Alvo de 30% = R$ 540.`

### Sensibilidade — lucro do EX1 conforme volume e preço por conversa

| Conversas/mês | R$ 0,20 | R$ 0,40 | R$ 0,60 |
|---|---|---|---|
| 300 | 43,9% | 40,6% | 37,2% |
| **500** | 41,7% | **36,1%** | 30,6% |
| 800 | 38,3% | **29,5%** | 20,6% |
| 1.200 | 33,9% | 20,6% | **7,2%** |

> **A partir de ~800 conversas por mês o EX1 fura os 30% em qualquer preço acima de
> R$ 0,20 por conversa.** E 800 conversas não é um número alto: uma campanha para
> 600 dormentes mais a régua rodando já chega lá.

`ESTIMATIVA` — as faixas de R$ 0,20 a R$ 0,60 são ordem de grandeza para conversa
de marketing no Brasil, **não são cotação**. A cotação real é parte de A-003 e tem
que entrar antes de qualquer preço ser aprovado.

### A solução, e ela já existe no acervo

Mesmo princípio da verba de mídia (`18` §3.5): **o que é consumo do cliente é pago
pelo cliente.**

> **Franquia de 500 conversas/mês inclusa no EX1. O excedente é repassado ao custo.**

Mantém o lucro em 36,1% no pior caso da franquia, protege a margem quando a base é
grande, e — o efeito mais importante — **torna o produto escalável para lojas
maiores**, que hoje seriam as piores para a margem justamente por terem mais
clientes.

Na proposta isso não é uma ressalva, é um argumento: *"a franquia cobre a operação
normal; se a sua base for grande a ponto de estourar, é porque você tem mais
dinheiro parado do que a média — e aí a gente conversa sobre o EX2."*

---

## 4 — O padrão de dados — o ativo que começa segunda-feira

Custa uma tarde. Vale a tese inteira. **Toda base de cliente entra neste formato,
independente da ferramenta que estiver rodando.**

### `lojas`
`loja_id · nome · nicho · faixa_faturamento · cidade · rua_ou_shopping · produto ·
data_inicio · ticket_medio_loja`

### `contatos`
`contato_id · loja_id · data_1a_compra · data_ult_compra · n_compras · valor_total ·
ticket_medio · categoria_ult_produto · origem · status_regua · optout`

> **`contato_id` é o hash do telefone, nunca o telefone.** A ferramenta operacional
> precisa do número para enviar — ela que fique com ele. A base analítica, a que
> acumula e a que um dia treina modelo, guarda só o hash e o comportamento.
> **Esta única escolha de projeto é o que torna a tese defensável** — jurídica e
> eticamente — em vez de um passivo.

### `campanhas`
`campanha_id · loja_id · data · segmento · n_enviados · n_respostas · n_vendas ·
valor_total · tipo_oferta · texto_copy`

### `eventos`
`evento_id · contato_id · data · tipo (envio/resposta/venda/optout) · campanha_id ·
valor_venda`

---

## 5 — A cláusula que precisa estar no contrato do cliente nº 1

**Este é o item genuinamente urgente do documento.**

Na LGPD, quando a Expansion opera a base de uma loja **em nome dela**, a loja é a
controladora e a Expansion é a operadora. Isso cobre executar a campanha. **Não
cobre usar aquele dado para construir um produto próprio** — finalidade diferente
exige base legal e previsão contratual próprias.

**Consequência prática:** dezoito meses de dado acumulado sem essa previsão são
dezoito meses que **não podem ser usados** para o CRM e para a IA. E não há como
consertar depois — reabrir catorze contratos para pedir permissão retroativa é uma
conversa que a maioria dos clientes responde com "não".

Três controles a levar ao advogado — **este acervo não dá parecer jurídico, aponta
o controle:**

1. **Propriedade:** a base é da loja, sempre. Ao fim do contrato ela leva a base
   organizada — melhor do que entrou. Isso, além de correto, é argumento de venda
   (objeção D2 do `19`).
2. **Uso agregado:** previsão expressa de que dados **agregados e sem identificar
   pessoas** podem ser usados para melhoria do serviço e produção de benchmarks.
   É a cláusula que sustenta toda a tese de IA.
3. **Encadeamento:** a loja precisa ter base legal para o tratamento que ela própria
   faz dos clientes dela, e a Expansion opera dentro dela. Opt-out em toda mensagem.

**Vira A-031, e é a única do documento que trava vender EX1 com consciência limpa.**

---

## 6 — Quando construir o CRM

Não por vontade — por gatilho. Construir antes destes é queimar caixa que a
operação precisa; depois deles, é deixar dinheiro na mesa.

| Gatilho | Por quê |
|---|---|
| **20+ clientes ativos no EX1** | Abaixo disso o custo de construir não se dilui |
| **Custo de ferramenta > R$ 150/cliente/mês** | Ponto em que alugar fica mais caro que ter |
| **Uma limitação que a ferramenta alugada não resolve** | Se ainda não apareceu, a ferramenta serve |
| **O padrão do §4 rodando há 6+ meses** | Construir sem saber o formato certo é construir duas vezes |

---

## 7 — Sobre a tese de IA, com honestidade

A parte da tese que se sustenta e a parte que precisa de tempo são diferentes, e
misturar as duas é o que faz projeto assim morrer no meio.

**O que existe no mês 1 — e vale dinheiro imediatamente:** com 14 lojas no padrão
do §4, a Expansion passa a ter **taxa de resposta, taxa de conversão e ticket por
segmento em lojas de moda reais**. Nenhuma agência do país publica isso. Vira
argumento de venda (*"a média das lojas que eu atendo responde X%"*), vira critério
de qualificação, e vira o número que a auditoria usa em vez de estimativa de
mercado. **Isso é ativo com n=14.**

**O que precisa de escala:** um modelo que aprende a prever quem compra e o que
oferecer precisa de volume de eventos, não de lojas. Com 14 lojas × ~2.000 contatos
são ~28 mil contatos e talvez 600 respostas por mês — suficiente para regra de
segmento, insuficiente para modelo. Isso muda perto de **50 lojas**, onde os
eventos passam de dois mil por mês.

> **Os dois gatilhos coincidem** — 20 a 50 clientes é onde tanto o CRM próprio
> quanto o modelo começam a se pagar. Até lá, o trabalho é acumular no formato
> certo, com a cláusula certa. **Isso custa uma tarde de trabalho e zero real.**

---

## 8 — O que fazer nesta semana

| # | Ação | Custo | Trava |
|---|---|---|---|
| 1 | **Fechar A-003** — cotar 2 provedores oficiais e decidir | 2 h | Sem isso, o entregável 1.2 do EX1 não existe |
| 2 | **Cotar o preço por conversa** e substituir a estimativa do §3 | 1 h | Sem isso o EX1 é vendido sem seu único custo variável |
| 3 | **Congelar o padrão de dados do §4** | 1 tarde | É o ativo inteiro. Depois é tarde |
| 4 | **Levar os três controles do §5 ao advogado** | 1 conversa | Sem isso, o dado acumulado não é usável |
| 5 | **Testar a extração do Nível 4** num aparelho real (`19` §9) | 1 h | O SDR está prestes a prometer algo não testado |
| 6 | **Montar a régua no Make** para um cliente piloto | 4–6 h | Prova que o entregável 1.2 roda antes de ser vendido |
