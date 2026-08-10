# 25 — APRESENTAÇÃO PARA O KAUÃ · 10/08/2026

**A mesa de segunda-feira.** O nicho, o mercado, os três produtos, o EX1 no detalhe
técnico, a prova e as cinco perguntas.

| | |
|---|---|
| **Versão** | 1.0 |
| **Data** | 2026-08-10 |
| **Para** | Kauã Catini — CFO e Diretor Comercial |
| **Versão visual** | https://claude.ai/code/artifact/f684353c-a494-48f4-829e-1478bcad3582 |
| **Status dos preços** | `NÃO APROVADO` até CNPJ e regime (A-006) |

---

## 1 — O nicho fechado: moda feminina **e infantil**

| Dado | Valor | Fonte |
|---|---|---|
| Participação do **feminino** na produção de vestuário do Brasil | **43%** — o maior segmento sozinho | IEMI |
| Somando **infantil menina** | **53%** — mais de metade do mercado | IEMI |
| Crescimento de **infantil e bebê**, 2021–2025 | **+44,9%** — quase o dobro do feminino | IEMI |

**A razão comercial que o dado não mostra: é a mesma compradora.** A mulher que
compra para si é a mesma que compra para a filha. Mesmo WhatsApp, mesma base, mesmo
gatilho de recompra, mesma campanha de data comercial. **Um nicho, duas prateleiras.**

E a Expansion já tem cliente nos dois lados — Ciés (feminino) e Clau Kids (infantil).

---

## 2 — O mercado não é a restrição

**28 clientes** levam a empresa de R$ 17,5 mil para R$ 82,5 mil de MRR. Num nicho que
é mais de metade do vestuário brasileiro.

| Cenário | Clientes | Receita/mês | Receita/ano | Lucro/mês |
|---|---|---|---|---|
| Hoje | 6 | R$ 17.500 | R$ 210 mil | ≈ 0% |
| **+ 10 clientes de EX1** | 16 | R$ 35.500 | R$ 426 mil | **+ R$ 8.500** |
| Carteira desenhada | 28 | R$ 82.500 | R$ 990 mil | **R$ 31.738** |

> **Vender 10 EX1 dobra o faturamento da empresa e consome 29% da capacidade que já
> existe.** `10 × 6 h = 60 h` contra 204 h de capacidade de entrega. **Não precisa
> contratar ninguém para as dez primeiras.**

---

## 3 — Os três produtos

| | EX1 · BASE | EX2 · VENDA | EX3 · MARCA |
|---|---|---|---|
| O que resolve | Vender de novo para quem já comprou | Atender fora do horário | Conteúdo, tráfego e marca |
| **Preço** | **R$ 1.800** | **R$ 3.500** | **R$ 5.500** |
| Horas/mês | 6 h | 20 h | 39 h |
| Lucro | **47,2%** | 37,1% | 31,3% |
| Lucro em reais | R$ 850 | R$ 1.299 | R$ 1.719 |
| Piso — nunca abaixo | R$ 813 | R$ 2.708 | R$ 5.281 |
| **Desconto máximo** | **54,9%** | **22,6%** | **4,0%** |
| Para loja de | R$ 40–100 mil | R$ 100 mil+ | R$ 140 mil+ |
| Venda nova que exige | R$ 5.143 | R$ 10.000 | R$ 15.714 |

**Eles não formam escada** — cada um resolve um problema diferente e podem ser
vendidos juntos ou separados.

---

## 4 — O lucro está no produto mais barato

| Produto | Receita por hora de entrega |
|---|---|
| **EX1** | **R$ 300** |
| EX2 | R$ 175 |
| EX3 | R$ 141 |

**O EX1 produz 2,1× mais receita por hora que o EX3.** Com a capacidade de hoje, uma
carteira só de EX3 teto em R$ 28.700; uma carteira só de EX1 chega a R$ 61.200 —
mais que o dobro, com as mesmas pessoas.

> **O produto de entrada é o de maior margem.** Isso inverte a lógica de agência:
> não se vende o EX1 para "subir" o cliente depois. Vende-se porque é o melhor
> negócio da casa.

E ele é o único que **não depende de gravação, deslocamento nem diária** — não
estoura a agenda do editor, não ocupa o filmaker, não exige designer.

---

## 5 — EX1 destrinchado, no detalhe técnico

### 01 · Auditoria da base — `SETUP` · 45 min, uma vez

Transforma *"acho que tenho uns contatos"* num número que ela nunca viu. **É o
entregável que fecha a venda** — e agora acontece **dentro da própria call de
diagnóstico** (`D-025`), não depois.

```
ENTRADA   export do sistema, PDV, planilha ou agenda do celular
CAMPOS    nome · telefone · 1a compra · ultima compra · n de compras · valor total
CORTES    ATIVO <= 90 dias  ·  MORNO 90-365  ·  DORMENTE > 365
SAIDA     total · ativos · mornos · dormentes · ticket medio · frequencia
A CONTA   dinheiro parado = (mornos + dormentes) x 8% x 32% x ticket medio
```

**O que o cliente ouve:** *"você tem 2.140 clientes, 1.630 não compram há mais de um
ano, isso é R$ 8.300 de venda parada."*

### 02 · Régua de retorno, 4 gatilhos — `AUTOMÁTICO` · todo dia 9h

```
TODO DIA 9h, o sistema pergunta ao banco:
  1  ultima compra = hoje - 60 dias   -> "sentimos sua falta, chegou colecao nova"
  2  ultima compra = hoje - 7 dias    -> "deu certo o tamanho? o que combina"
  3  aniversario = hoje               -> oferta com validade de 7 dias
  4  conversa sem resposta ha 48h     -> retomada

VOLUME      10 a 40 pessoas por dia — nao milhares
QUEM MANDA  o numero da propria loja, com o nome dentro da mensagem
NINGUEM DA EXPANSION TOCA EM NADA
```

**É o que faz o produto ser assinatura e não campanha avulsa** — venda entrando nos
dias em que ninguém fez nada.

### 03 · Campanha segmentada — `MENSAL` · 2h45 · Débora

```
SEGMENTO  MORNO (90-365 dias) e quase sempre o certo
COPY      nome + referencia a ultima compra + prazo curto + UMA pergunta + 4 linhas
ARTE      2 ou 3 fotos reais de produto. Peca elaborada converte menos
DISPARO   lotes de 50 a 100 por hora, 10h-12h ou 18h-20h
          600 pessoas levam 6 a 8 horas para sair — e isso e certo, nao lento
POR QUE   rajada e lida como robo. O numero da loja dele e o ativo mais caro
```

### 04 · Placar Compartilhado — `SEMANAL` · toda segunda 8h, automático

```
LADO EXPANSION   mensagens enviadas · conversas geradas · custo por conversa
LADO LOJA        tempo de 1a resposta · taxa de resposta · sem resposta em 24h
COMPARTILHADO    vendas atribuidas
```

**É a peça que impede o cliente de nos culpar por algo que é dele** — e a falta de
relatório é a causa nº 1 de cancelamento de agência (e quase custou a Prime).
**Mesmo formato toda semana: é a previsibilidade que retém, não a velocidade.**

### 05 · Reunião de resultado — `MENSAL` · 45 min · pauta fixa

```
1  o mes em tres numeros: venda gerada · meta de R$ 5.143 · onde ficou
2  o que funcionou e o que morreu na campanha
3  o segmento e a oferta do mes seguinte, decididos ali
4  uma pergunta sobre o estoque — e o que vira a proxima campanha
```

**É o único entregável que continua humano de propósito.** É onde o cliente sente que
alguém está pensando no negócio dele — e é o que separa assessoria de fornecedor.
Passa para a Débora ou um CS a partir do 11º cliente (`A-040`).

---

## 6 — A prova

**A Ciés reativou a base com essa metodologia e vendeu mais de R$ 5.000 em menos de
um dia.** Não é benchmark de relatório — é a operação da casa.

| A conta pelo lado da lojista | Valor |
|---|---|
| Venda gerada em 1 dia | R$ 5.000 |
| Lucro de contribuição dela (35%) | R$ 1.750 |
| Mensalidade do EX1 | R$ 1.800 |
| **Uma campanha, num dia, cobriu** | **97% do mês** |

> **Como contar:** uma campanha paga a mensalidade; a régua, rodando os outros 29
> dias, é o lucro dela. **Sempre como caso — *"foi assim com a Ciés"* — nunca como
> promessa.** Um caso é prova de mecanismo, não é taxa.

---

## 7 — Três números para o Kauã decorar

| | |
|---|---|
| **R$ 61** | sai do lucro a cada R$ 100 de desconto. A folha é fixa em reais e não cai junto |
| **4%** | é toda a folga do EX3. O EX1 tem 55%. **O desconto sai do EX1, nunca do EX3** |
| **5,4×** | é quanto 15% de desconto permanente custa a mais que dar dois meses de EX1 |

**Moedas de troca:** 12 meses em vez de 6 (até 5%) · case + depoimento em vídeo (5%,
primeiro mês só) · indicação que fecha (1 mensalidade, paga quando assina) · tirar um
entregável (o abatimento é `horas × R$ 135`, nem um real a mais).

**Linhas vermelhas:** nunca desconto no EX3 · nunca desconto sem contrapartida
escrita · nunca "360" abaixo de R$ 10.800 · nunca prometer valor de venda · nunca
fechar sem saber onde está a base do cliente.

Detalhe completo em `19-PLAYBOOK-COMERCIAL-KAUA.md`.

---

## 8 — O 360, e os cinco pendentes

**Os três juntos:** R$ 10.800/mês · 65 h · **35,8% de lucro** · para loja de R$ 250 mil+.

O que se vendia antes como "360" era 2 vídeos + 1 carrossel/semana + tráfego, mais
grupo e acompanhamento. **Isso é o EX3.** O 360 de verdade é a soma dos três.

### O que está pendente — e é honesto dizer na mesa

| # | Pendência | Efeito |
|---|---|---|
| 1 | **O grupo de WhatsApp não está no preço do EX3** (`A-027`) | 30 min/dia derrubam o lucro de 31,3% para **23,5%**. Ou EX3 a R$ 7.000 com o grupo dentro, ou o grupo vira SLA de 4 h úteis |
| 2 | **As horas nunca foram cronometradas** (`A-029`) | 6 h / 20 h / 39 h são estimativa. **É a premissa que sustenta a tabela inteira** |
| 3 | **O EX2 não tem quem opere** (`A-022`) | Exige contratar um operador de conversa |
| 4 | **Nenhum preço passou por imposto** (`A-006`) | Tudo aqui é preço antes de imposto |
| 5 | **Quem é dono da grade de conteúdo** (`A-028`) | Sem dono, o retrabalho volta e come o ganho da saída do designer |

---

## 9 — As cinco perguntas para o Kauã

| # | Pergunta | Por que importa |
|---|---|---|
| **01 · PREÇO** | Olhando a tabela e a experiência de mesa: **R$ 1.800 no EX1 está caro, certo ou barato** para loja de R$ 40–100 mil? | Se estiver barato, sobe — a folga está lá (54,9%) |
| **02 · VOLUME** | **Quantos EX1 você fecha em 30 dias** com a lista de prospecção atual? | Define se contrata em setembro ou em novembro |
| **03 · MOTION** | A auditoria passa a ser feita **dentro da call de diagnóstico**. Isso muda o script do SDR? O que ele precisa perguntar antes? | A pergunta chave é *"onde estão os contatos de quem já comprou de você?"* |
| **04 · CARTEIRA** | A carteira inteira vence em agosto. **Quais renovamos no preço novo e quais deixamos ir?** | Sair da conversa com nome e valor de cada um |
| **05 · O QUE FALTA** | Dos cinco pendentes do §8, **qual trava a venda?** | Esse resolve nesta semana; os outros ficam para o mês |
