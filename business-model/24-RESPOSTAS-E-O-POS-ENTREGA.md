# 24 — RESPOSTAS DIRETAS, E O PÓS-ENTREGA

**As sete perguntas respondidas uma a uma** — mais a repreensão que foi pedida.

| | |
|---|---|
| **Versão** | 1.0 |
| **Data** | 2026-08-08 |
| **Origem** | Nicolas, 08/08 — sete perguntas diretas + *"se for a fase você pode me repreender que eu vou seguir também"* |
| **Versão visual** | https://claude.ai/code/artifact/15543f52-4ef1-48d6-b33e-df5b7b65d0c9 |

---

## 0 — A repreensão pedida: o desenvolvedor em permuta

Foi pedido explicitamente. Aqui está, e é a coisa mais importante desta página.

> **Quem está construindo o Expansion OS está em permuta, com "possível sociedade"
> — e a possível sociedade não está escrita.**

O que está sendo construído **é o ativo da tese inteira**. O banco, o schema, os
cenários. Se não houver **cessão de propriedade intelectual assinada**, acontecem
três coisas, nesta ordem:

1. **A Expansion não é dona do que está construindo.** Sem cessão expressa, obra
   feita por terceiro não migra sozinha para o contratante só porque houve permuta.
2. **A negociação da sociedade acontece depois** — quando a coisa já vale, e quando
   o poder de barganha é dele, não seu.
3. **É o espelho WebLuxury outra vez, invertido.** Lá a Expansion era operadora
   substituível de um ativo alheio. Aqui a Expansion pode virar **dona nominal de um
   ativo que juridicamente é de outro.**

E o mais duro: **essa regra já está escrita por você mesmo, aplicada a outro.** O
parecer da Plataforma WebLuxury, de 13/07, sobre o sistema do Cleber:

```
Auditar sistema do Cleber
    Congelar 30 dias
    Cessão de IP ou nada
    7 em 10: custo afundado

3 contratos fundacionais
    Societário com IP e vesting
```

**"Cessão de IP ou nada."** Você exigiu isso do sistema do sócio de outra mesa e
não está exigindo do seu.

### O conserto, e é barato

| # | O que | Custo |
|---|---|---|
| 1 | **Cessão de IP por escrito**, cobrindo tudo que já foi feito e o que vier. Uma página | 1 conversa |
| 2 | **A permuta descrita**: o que ele entrega, o que recebe, e o que acontece se parar no meio | mesma página |
| 3 | **A "possível sociedade" com gatilho e faixa**, ainda que não fechada — *"se X acontecer, a conversa é entre Y% e Z%, com vesting de N meses"* | 1 conversa |

> **Não é desconfiança. É o contrário:** parceria sem papel é o que destrói parceria
> boa, porque a conversa difícil fica para o dia em que já existe dinheiro na mesa.
> **Fazer isso agora protege os dois.** Vira `A-039`, e é bloqueante para a
> recomendação de construir.

### E o ponto sobre velocidade: você está certo

O conselho de 13/07 avaliou "software próprio" **num contexto que não existe mais**:
sem OS, sem dev parceiro, sem a aceleração de construir em nuvem com IA. **A
proibição nº 2 foi escrita para impedir CAPEX às cegas — não para impedir uma
extensão de 34 a 48 horas num sistema que já roda.**

Com a cessão de IP assinada, **`A-037` deixa de ser a pergunta sem resposta óbvia.**
Não é o CEO quem constrói (não vira represa) e não é freela contratado a peso de
caixa (não vira CAPEX). **É o terceiro caminho, e ele é legítimo — desde que o papel
exista antes do código.**

---

## 1 — "PDV, ERP, loja virtual" — o que é cada um

Sem jargão:

| Termo | O que é | Exemplos no varejo pequeno |
|---|---|---|
| **PDV** — *ponto de venda* | O sistema do caixa. Registra o que foi vendido, por quanto, e para quem — se capturar o cliente | sistemas de frente de caixa, alguns integrados à maquininha |
| **ERP** | O sistema que roda a loja por trás: estoque, compras, nota fiscal, financeiro. Costuma incluir o PDV | Bling, Tiny, Omie |
| **Loja virtual** | O e-commerce | Nuvemshop, Shopify, Loja Integrada |

**Por que isso importa para o EX1, em uma frase:**

> **Se a loja tem qualquer um dos três, o dado de quem comprou já existe num sistema
> que consegue conversar com o seu — e a base se atualiza sozinha, para sempre.**
> Se não tem nenhum, o dado só existe na conversa do WhatsApp e na cabeça dela.

**Pergunta de qualificação para o SDR, em português de lojista:**
*"Você tem algum sistema onde registra as vendas — tipo Bling, Tiny, ou o sistema da
maquininha? Ou anota em caderno mesmo?"*

---

## 2 — Como o disparo funciona, de verdade

Três coisas acontecem, e nenhuma delas é alguém apertando "enviar".

### 2.1 · Quem manda a mensagem

**O número da loja.** Não um número da Expansion. Para a cliente final, quem está
falando é a loja onde ela comprou — o que é verdade, e é o que faz funcionar.

### 2.2 · O que faz sair

O canal (o fornecedor de WhatsApp) recebe uma ordem do Make: *"manda este texto para
este número"*. O Make montou o texto substituindo o nome e a última compra. **Cada
mensagem é diferente da anterior** — é isso que separa campanha de spam, e é o que
protege o número.

### 2.3 · O ritmo

**Lotes de 50 a 100 por hora.** Não porque a ferramenta não aguenta — porque o
WhatsApp lê rajada como comportamento de robô. Uma campanha para 600 pessoas leva
6 a 8 horas para sair, e isso é certo, não lento.

### 2.4 · O que acontece quando ela responde

A resposta cai no WhatsApp da loja, **como qualquer conversa**. A vendedora atende
normalmente. O sistema registra que houve resposta — e é isso que vira a linha do
placar. **Ninguém da Expansion entra na conversa.** Se for preciso entrar, isso é
o EX2, e é outro contrato.

---

## 3 — "Por conta ou por número" — o que significa

A ferramenta custa R$ 297/mês. A pergunta é **por quê**:

| Modelo | O que significa | Com 15 clientes |
|---|---|---|
| **Por conta** | Você paga R$ 297 pela sua conta e **conecta os números dos 15 clientes nela** | R$ 297/mês total = **R$ 19,80 por cliente** |
| **Por número** | Você paga R$ 297 **para cada número conectado** | **R$ 4.455/mês** = R$ 297 por cliente |

**São 15× de diferença.** No EX1 de R$ 1.800:

| | Custo/cliente | Lucro do EX1 |
|---|---|---|
| Por conta | R$ 19,80 | **46,1%** |
| **Por número** | **R$ 297** | **30,7%** — e **abaixo de 30% com qualquer custo de mensagem** |

**A pergunta exata para o fornecedor:** *"os R$ 297 são por conta ou por número
conectado? Se eu conectar 15 números de clientes diferentes, quanto pago no total?"*

> Se a resposta for "por número", **recote antes de assinar.** Existem provedores que
> cobram por conta. Recotar leva uma semana. `A-034`.

---

## 4 — "34 a 48 horas" — o que exatamente é construído

Não é "o sistema". O sistema existe. **É um módulo dentro dele:**

| O que | Horas | O que passa a acontecer |
|---|---|---|
| 4 tabelas + 2 views + RLS + gatilho append-only | 4–6 | O banco passa a guardar contato, campanha, interação e régua |
| **Importador de base** (CSV → `contato`, com deduplicação) | 4–6 | A base do cliente entra em minutos, sem digitação |
| Cenário Make · **régua diária** | 6–8 | Todo dia 9h sai sozinho |
| Cenário Make · **campanha** | 8–10 | Escolher segmento vira 1 clique; o disparo em lote é automático |
| Cenário Make · **placar semanal** | 4–6 | Toda segunda 8h cai no grupo |
| Integração com **1** PDV/ERP | 8–12 | A venda entra sozinha, para sempre |
| **Total** | **34–48 h** | |

O SQL das quatro tabelas **já está escrito**, nas convenções do OS:
`business-model/sql/0001-modulo-base-consumidor.sql`. **Não foi aplicado.**

---

## 5 — As cláusulas de dados, para levar ao advogado

Foi perguntado: *"quais são as cláusulas que eu preciso?"* — Este acervo **não dá
parecer jurídico**. O que segue é a **lista de controles** para o advogado
transformar em cláusula.

### Bloco A · Propriedade e devolução
1. **A base bruta de contatos é da loja.** A Expansion trata em nome dela.
2. **Devolução ao fim do contrato:** a loja recebe a base organizada, em formato
   aberto, em até 15 dias — melhor do que entrou.
3. **Eliminação:** o que a Expansion mantiver após a devolução, e por quanto tempo.

### Bloco B · O que sustenta a tese — **a mais importante**
4. **Uso agregado e anonimizado:** a Expansion pode usar dados agregados, **sem
   identificar pessoas**, para melhorar o serviço e produzir estudos e benchmarks
   de setor.
5. **Titularidade do derivado:** os benchmarks, modelos, estatísticas e insights
   produzidos a partir do agregado **são ativo exclusivo da Expansion**, e não
   contêm dado identificável de nenhuma loja.
6. **Confidencialidade cruzada:** nenhum dado identificável de uma loja aparece
   para outra. Nunca.

### Bloco C · Papéis e conformidade
7. **Papéis definidos:** a loja é a controladora, a Expansion é a operadora.
8. **Base legal da loja:** a loja declara ter base legal para tratar os dados dos
   clientes dela. A Expansion opera dentro dela.
9. **Opt-out:** toda mensagem tem saída fácil; quem sai nunca mais entra.
10. **Direitos do titular:** como um consumidor pede exclusão, e em quanto tempo.
11. **Incidente de segurança:** quem avisa quem, em quanto tempo.
12. **Subcontratados:** os fornecedores usados (canal, nuvem, automação) e a
    autorização para usá-los.

> **O bloco B é o que faz este projeto valer alguma coisa em 18 meses.** Sem ele, o
> dado acumula e não pode ser usado — e **não há conserto retroativo.** `A-031`.

---

## 6 — O pós-entrega: o que de fato cai na sua mão

> *"O problema é o pós-entrega, que aí cai na minha mão."*

É a pergunta certa. Vamos ao que sobra, linha por linha.

| Etapa | Quanto tempo | Cai em quem | Dá para zerar? |
|---|---|---|---|
| **A call de auditoria** | 60 min | Kauã ou você | **Já é a call que vocês fazem.** Ver §6.1 |
| Montar a base | — | ninguém | **Sim** — o importador |
| Entregar a auditoria | — | ninguém | **Sim** — a view gera a página |
| Régua, disparo, monitoramento | — | ninguém | **Sim** — Make |
| Placar semanal | — | ninguém | **Sim** — Make |
| Copy e arte da campanha | ~35 min | Débora | Não, e não deve |
| **Reunião mensal de resultado** | **45 min** | **você** | **Não deve — ver §6.2** |

### 6.1 · A auditoria não é custo novo: ela substitui o diagnóstico

O funil já é: **SDR vende a reunião → diagnóstico → oferta no fim da call.**

> **A auditoria da base É o diagnóstico.** Mesma call, mesmo tempo, mesma pessoa —
> só que em vez de perguntas genéricas, sai um número: *"você tem R$ 8.300 parados"*.

**Custo incremental de tempo: zero.** E a taxa de fechamento sobe, porque a oferta
deixa de ser opinião e passa a ser aritmética sobre o dado dele.

### 6.2 · A reunião mensal é o que retém — não automatize

Das três coisas que o EX1 entrega, **a que segura o cliente é a que chega toda
segunda sem falhar.** Isso está documentado na própria casa: *"a Prime quase
cancelou"* por relatório que não saía. **O placar automático resolve isso e custa
zero.**

Mas a reunião mensal faz outra coisa: é onde o cliente sente que **alguém está
pensando no negócio dele.** É a diferença entre fornecedor e assessoria — e é o que
justifica não trocar você por uma ferramenta de R$ 97.

**A regra, com gatilho:**

| Clientes de EX1 | Quem faz a reunião | Custo do seu mês |
|---|---|---|
| 1 a 10 | **Você** | até 7h30 |
| 11 em diante | **Débora ou um CS**, com você entrando só nos que estão em risco | ~2h |

> **Aos 10 clientes de EX1 você passa o bastão.** Não antes — porque é fazendo as
> dez primeiras que se escreve o roteiro da reunião. E não depois — porque aos 15
> vira 11h/mês e você virou executor de novo. **O gatilho é 10, e é objetivo.**

### 6.3 · O que sobra para você, no regime

**A call de venda que você já faz + 45 min/mês por cliente, até o décimo.**
Depois disso, **zero recorrente.**

---

## 7 — O piloto: Ciés e Clau Kids

Duas clientes já na base. **Elas não são o mesmo teste.**

| | **Ciés Brand** | **Clau Kids** |
|---|---|---|
| Faturamento da loja | baixo, voltou a operar recentemente | R$ 20–30 mil/mês |
| Paga hoje | R$ 1.333,33/mês | `NÃO INFORMADO` |
| Já rodou a metodologia? | **Sim — R$ 5.000 em menos de um dia** | Não |
| Serve para testar | **o produto inteiro.** Já tem histórico de campanha real | **a máquina**, não o preço |
| Está no ICP de EX1 (R$ 40–100k)? | a validar | **Não — está abaixo** |

**Recomendação:**

1. **Ciés é o piloto.** É a única com campanha medida — dá para comparar o antes e o
   depois no mesmo cliente, que é o teste mais forte que existe.
2. **Clau Kids é o segundo teste técnico**, para provar que o importador funciona com
   uma base diferente. **Não é teste de preço** — ela está abaixo da faixa.
3. **Não reprecificar nenhuma das duas durante o piloto.** Testa-se a máquina ou o
   preço, nunca os dois de uma vez — se der errado, não se sabe qual dos dois falhou.

---

## 8 — O que fica decidido e o que fica travado

| # | Item | Estado |
|---|---|---|
| 1 | **Cessão de IP com o desenvolvedor** | **`A-039` — BLOQUEANTE.** Antes de mais código |
| 2 | Cláusula de dados ao advogado — os 12 controles do §5 | `A-031` — antes do próximo contrato |
| 3 | Cotar "por conta ou por número" | `A-034` — decide a margem do EX1 |
| 4 | Aplicar `sql/0001` no staging com a base da Ciés | `A-038` |
| 5 | **Quem constrói: o dev parceiro** | `A-037` **respondida — condicionada ao item 1** |
| 6 | Passar a reunião mensal aos 10 clientes | `A-040` — gatilho objetivo |
| 7 | Vender o EX1 na segunda | **Não depende de nada acima** |

> **A ordem importa: o papel antes do código.** Uma conversa de trinta minutos com o
> desenvolvedor, esta semana, é o que separa construir um ativo de construir um
> problema.
