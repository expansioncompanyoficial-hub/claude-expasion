# 26 — A MARGEM DA LOJISTA, LINHA POR LINHA

**De onde vem a meta do EX1** — e a correção de 35% para 32,4%.

| | |
|---|---|
| **Versão** | 1.0 |
| **Data** | 2026-08-10 |
| **Origem** | Nicolas, 10/08: *"como chegamos na estratégia do EX1… e qual o lucro do cliente em margem em cada venda de roupa"* |
| **Corrige** | `D-013`, `14` §, `16`, `19` §7, `22`, `25` |
| **Versão visual** | https://claude.ai/code/artifact/2ef02fde-1b1a-41a5-b625-5adc6f812f1e |

---

## 0 — CORREÇÃO: a margem de contribuição é 32,4%, não 35%

Este acervo vinha usando **35%** de margem de contribuição para a lojista. Refazendo
a conta com **todas** as linhas, o número correto é **32,4%**.

**O erro:** os 35% eram a margem bruta (45,4%) menos alguns custos variáveis — e
**faltava o imposto sobre a venda**, que numa loja no Simples Anexo I na faixa de
R$ 0,5 a 1,2 milhão/ano roda perto de 7%.

### O que muda

| | Antes (32,4%) | **Correto (32,4%)** |
|---|---|---|
| Venda nova para pagar o EX1 | R$ 5.143 | **R$ 5.556** |
| Venda nova · EX2 | R$ 10.000 | **R$ 10.802** |
| Venda nova · EX3 | R$ 15.714 | **R$ 16.975** |
| Venda nova · os três | R$ 30.857 | **R$ 33.333** |
| Caso Ciés — cobertura da mensalidade | 97% | **90%** |
| Regra de bolso `R$ 1 de fee → ? de venda` | R$ 2,86 | **R$ 3,09** |

> **E o que melhora:** a regra dos R$ 3 deixa de ser arredondamento e passa a ser
> **exata**. `1 ÷ 0,324 = 3,086`. Antes eu arredondava 2,86 para cima; agora o número
> real é 3,09.

**Nenhum preço da Expansion muda.** O que muda é a meta de venda que se promete ao
cliente — e ela ficou 8% mais exigente. `D-013` fica **REVISADA**.

---

## 1 — De cada R$ 100 vendidos, quanto fica com ela

```
Venda                                        100,0%
(−) Custo da mercadoria                      −54,6%   ← IBGE / PAC
= Margem bruta                                45,4%
(−) Imposto sobre a venda                     −7,0%   ← Simples Anexo I
(−) Meios de pagamento (cartão)               −3,5%
(−) Comissão de venda                         −2,0%
(−) Embalagem                                 −0,5%
= MARGEM DE CONTRIBUIÇÃO                      32,4%
```

**Fonte de cada linha:**

| Linha | Valor | Status | Fonte |
|---|---|---|---|
| Custo da mercadoria | 54,6% | `CONFIRMADO` | IBGE, Pesquisa Anual de Comércio — varejo de tecidos, vestuário e calçados |
| Imposto sobre a venda | 7,0% | `ESTIMADO` | Simples Nacional, Anexo I, faixa de RBT12 de R$ 0,5–1,2 M |
| Meios de pagamento | 3,5% | `ESTIMADO` | Média ponderada entre débito e crédito parcelado |
| Comissão de venda | 2,0% | `ESTIMADO` | Prática de varejo de moda |
| Embalagem | 0,5% | `ESTIMADO` | Ordem de grandeza |

> **Quatro das cinco linhas são estimativa.** Substituir pelo número real de cada
> loja assim que a auditoria der acesso ao dado dela — e é exatamente por isso que
> a auditoria do EX1 vale mais do que parece.

---

## 2 — Três margens diferentes, e o lojista mistura as três

| Se ela disser… | Ela quer dizer | Ordem de grandeza |
|---|---|---|
| *"margem"*, *"markup"* | **Margem bruta** — venda menos o custo da peça | ~45% |
| *"o que sobra da venda"* | **Margem de contribuição** — a que serve para calcular a meta | **32,4%** |
| *"meu lucro"* | **Margem líquida** — depois de aluguel, folha e tudo | 5 a 10% |

**Confundir as três é o erro clássico** — e é o que faz agência prometer meta que a
loja não alcança.

---

## 3 — O markup declarado não é o markup realizado

Lojista de moda costuma falar em **markup de 2,5 a 3×** — compra por R$ 40, vende por
R$ 110. Isso daria custo de mercadoria de 36 a 40%, bem melhor que os 54,6% do IBGE.

**A diferença é liquidação.** O markup de 2,5× é o preço de tabela do começo da
coleção. Depois vêm as remarcações, a queima de fim de estação, a peça encalhada que
sai a 50%. **Os 54,6% do IBGE são o custo realizado — já com tudo isso dentro.**

Traduzindo markup realizado em custo de mercadoria:

| Markup realizado | Custo da mercadoria | MC estimada |
|---|---|---|
| 1,8× | 55,6% | 31,4% |
| **1,83× — a média do IBGE** | **54,6%** | **32,4%** |
| 2,0× | 50,0% | 37,0% |
| 2,2× | 45,5% | 41,5% |

> **Frase para o Kauã na mesa:** *"você trabalha com markup de 2,5, certo? Mas depois
> da liquidação de fim de coleção, o realizado fica mais perto de 1,8. É com esse que
> a gente tem que fazer a conta — senão a meta sai errada e nós dois nos frustramos."*
>
> Quem sabe a diferença entre markup declarado e realizado está falando com o dono do
> negócio, não vendendo pacote.

---

## 4 — A margem varia, e a meta varia junto

| | Loja mais fraca | Média · IBGE | Loja mais forte |
|---|---|---|---|
| Custo da mercadoria | 60,0% | 54,6% | 48,0% |
| Imposto | 8,0% | 7,0% | 6,0% |
| Cartão | 4,0% | 3,5% | 3,0% |
| Comissão | 3,0% | 2,0% | 1,5% |
| Embalagem | 0,5% | 0,5% | 0,5% |
| **Margem de contribuição** | **24,5%** | **32,4%** | **41,0%** |
| **Venda nova para pagar o EX1** | **R$ 7.347** | **R$ 5.556** | **R$ 4.390** |

**Isto é ferramenta de qualificação, não curiosidade.** Duas perguntas na call —
*"por quanto você compra e por quanto você vende?"* e *"quanto sai na liquidação?"* —
dão o custo de mercadoria dela. **A meta sai calibrada para a loja dela em vez de um
número genérico.**

---

## 5 — Como se chegou na estratégia do EX1

A cadeia lógica inteira, em cinco elos:

1. **A base dormente existe e é grande.** No varejo de moda, ~77% da base de clientes
   está inativa. É o padrão do setor, não uma loja específica.
2. **Reativar custa menos que adquirir.** A pessoa já comprou, já confia, já tem o
   número salvo. Não há custo de mídia para alcançá-la.
3. **~8% respondem** a uma campanha bem segmentada e personalizada.
4. **1 em cada 3 respostas vira venda** — 32%. Contra menos de 2% de conversão do
   e-commerce de moda. É o dado de comércio conversacional.
5. **Multiplica pelo ticket médio dela.**

```
venda da campanha = dormentes × 8% de resposta × 32% de conversão × ticket médio
```

### Exemplo com números de auditoria real

| | |
|---|---|
| Clientes dormentes na base | 1.630 |
| × taxa de resposta 8% | 130 conversas |
| × taxa de conversão 32% | 42 vendas |
| × ticket médio R$ 200 | |
| **Venda gerada pela campanha** | **R$ 8.346** |
| × margem de contribuição 32,4% | |
| **O que fica no bolso dela** | **R$ 2.704** |
| − mensalidade do EX1 | − R$ 1.800 |
| **Ganho líquido dela, na 1ª campanha** | **R$ 904** |

---

## 6 — O argumento que faltava: a venda nova é mais lucrativa que a venda média

O lojista vai pensar: *"R$ 1.800 é metade do meu lucro do mês"*. **E ele tem razão** —
numa loja de R$ 60 mil, o lucro líquido fica em torno de R$ 3.800.

**Mas a venda que o EX1 gera não carrega custo fixo nenhum.** A loja já está aberta,
o aluguel já está pago, a vendedora já está lá. **Cada real novo deixa 32,4 centavos
de lucro, direto, sem dividir com nada.**

| Loja de R$ 60 mil/mês | Hoje | Com o EX1 |
|---|---|---|
| Faturamento | R$ 60.000 | R$ 68.346 |
| Margem de contribuição | R$ 19.440 | R$ 22.144 |
| Custos fixos *(aluguel, folha, luz — não mudam)* | R$ 15.600 | R$ 15.600 |
| Mensalidade Expansion | — | − R$ 1.800 |
| **Lucro dela** | **R$ 3.840** | **R$ 4.744** |

> **+23,5% de lucro, sem abrir a loja mais cedo e sem contratar ninguém.**
> É matematicamente verdadeiro porque a venda incremental não divide custo fixo com
> ninguém. **É o argumento mais forte do EX1, e não estava escrito até agora.**

---

## 7 — Não confundir: existem dois "R$ 5.000"

| | O que é | Natureza |
|---|---|---|
| **R$ 5.000** | O que a **Ciés vendeu** em menos de um dia reativando a base | **Fato observado** |
| **R$ 5.556** | A **venda nova necessária** para o EX1 se pagar — `1.800 ÷ 0,324` | **Meta calculada** |

Os dois se parecem **por coincidência**. Misturados na conversa, um comercial atento
pega — e a credibilidade da conta inteira cai junto.

**Como falar dos dois sem misturar:**

> *"A conta é: R$ 1.800 se paga com R$ 5.556 de venda nova, porque de cada real que
> entra sobram 32 centavos pra você. E não é teoria — a Ciés fez R$ 5.000 numa
> campanha, em menos de um dia. Chegou perto da meta do mês inteiro numa tarde. Não é
> garantia; é o que aconteceu."*

---

## 8 — A tabela corrigida

| Produto | Mensalidade | Venda nova | Loja de | = crescimento de |
|---|---|---|---|---|
| **EX1 · BASE** | R$ 1.800 | **R$ 5.556** | R$ 40–100 mil | 5,6% a 13,9% |
| EX2 · VENDA | R$ 3.500 | R$ 10.802 | R$ 100 mil+ | até 10,8% |
| EX3 · MARCA | R$ 5.500 | R$ 16.975 | R$ 140 mil+ | até 12,1% |
| Os três | R$ 10.800 | R$ 33.333 | R$ 250 mil+ | até 13,3% |

> **A trava continua e ficou mais afiada:** se o Kauã não acredita que a loja chega
> nesse número, **a venda não deve ser feita** — ela cancela no mês 4 e ainda fala mal.
> **Cada R$ 1 de mensalidade exige R$ 3,09 de venda nova.**
