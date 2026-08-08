# CONCATENAÇÃO — MERCADO × PRODUTOS × CAPACIDADE
## Teto de faturamento de 2026, lucro por produto e ICP de tráfego por faixa

**Encomendado por:** Nicolas / Expansion
**Pergunta:** *"qual é o teto de faturamento que eu posso chegar ainda esse ano com esses
produtos? O lucro que eu vou ter, e qual o ICP do tráfego que eu tenho que atrair pra
vender cada tipo de produto, conforme o estudo de mercado."*

**Painel:** https://claude.ai/code/artifact/9e18dece-4a3d-4942-b3bb-02c23bcbdcfe

**Cruza três fontes:**
- `MERCADO-MODA-FEMININA-RADAR-2026-08-08.md` — calendário e janela eleitoral
- `DIMENSIONAMENTO-MERCADO-EXPANSION-2026-08-08.md` — 608 mil lojas, mercado de R$ 1,15 bi
- `business-model/14-PLANO-DE-PRODUTOS-E-PRECOS.md` (branch `claude/new-session-nx502g`) —
  arquitetura de produtos, razões de atendimento, célula-alvo

---

## 0. RESPOSTA CURTA

| Pergunta | Resposta |
|---|---|
| Teto de faturamento em 2026 | **R$ 118 mil** somados ago–dez · saindo a **R$ 34 mil/mês** em dezembro |
| Teto se corrigir o preço do X2 | **~R$ 152 mil** no período · sem vender um cliente a mais |
| Lucro do X1 (R$ 1.800) | **+R$ 896/cliente/mês · 49,8%** — bate com os seus 47% |
| Lucro do X2 (R$ 3.500) | **−R$ 762/cliente/mês** a salário de mercado |
| Lucro do X3 (R$ 5.500) | **−R$ 2.434/cliente/mês** a salário de mercado |
| O que trava o crescimento | **Um designer.** Comporta 4 perfis; o editor comporta 14 e o tráfego 22 |
| ICP do X1 | loja que fatura **R$ 18–36 mil/mês** · ~50 mil lojas no Brasil |
| ICP do X2 | loja que fatura **R$ 35–70 mil/mês** · ~28 mil lojas |
| ICP do X3 | loja que fatura **R$ 55–110 mil/mês** · ~15 mil lojas |

---

## 1. A DIVERGÊNCIA DE PREÇO QUE PRECISA SER RESOLVIDA

Você me passou **1.800 / 3.500 / 5.500**. O `14-PLANO-DE-PRODUTOS-E-PRECOS.md`, de
05/08, chegou em outros números:

| Produto | Você falou | Piso do plano | Alvo do plano | Diferença |
|---|---:|---:|---:|---|
| X1 · Método | R$ 1.800 | R$ 1.500 | R$ 2.500 | +R$ 300 acima do piso |
| **X2 · Operação** | **R$ 3.500** | **R$ 5.000** | R$ 6.000 | **−R$ 1.500 abaixo** |
| **X3 · Performance** | **R$ 5.500** | **R$ 8.000** | R$ 10.000 | **−R$ 2.500 abaixo** |

O plano não chutou esses pisos. Três métodos independentes convergiram na faixa de
R$ 5.000–6.000 para o nível "eu faço para você": o Conselho de 13/07, a regra de lucro
de 30% aplicada aos seus números, e a faixa padrão do mercado brasileiro.

**Trabalhei com os seus números** — são a decisão mais recente. O resto deste documento
mostra o que eles produzem.

---

## 2. O LUCRO DE CADA PRODUTO

### Como montei o custo

```
custo de entrega por cliente = Σ ( custo do profissional ÷ perfis que ele carrega )
demais despesas = 33,58% da receita
    impostos 15,58% · ferramentas e estrutura 8% · comercial 10%
```

Razões de atendimento do plano (§6): social media carrega 6 perfis no X2 e 15 no X1;
editor carrega 4,6; designer carrega 3,9; tráfego carrega 22; operador de conversa do
X3 carrega 1,5. Custo carregado por profissional a preço de mercado: **R$ 4.500**.

### O resultado

| | X1 · R$ 1.800 | X2 · R$ 3.500 | X3 · R$ 5.500 |
|---|---:|---:|---:|
| Custo de entrega | R$ 300 | R$ 3.087 | R$ 6.087 |
| Demais despesas (33,58%) | R$ 604 | R$ 1.175 | R$ 1.847 |
| **Sobra por cliente/mês** | **+R$ 896** | **−R$ 762** | **−R$ 2.434** |
| Margem | **49,8%** | −21,8% | −44,3% |

**O X1 bate com os 47% que você mediu.** Isso valida o modelo inteiro — se o método
acerta o produto que você conhece, os outros dois merecem crédito.

**O X2 consome 88% do preço só em mão de obra direta.** O X3 passa de 111%: o operador
de conversa, sozinho, custa R$ 3.000 por cliente porque carrega apenas 1,5.

Nos preços do plano: X2 a R$ 5.000 vira **+R$ 234**; a R$ 6.000, **+R$ 898**.
É por isso que o piso estava onde estava.

### A ressalva que muda o sinal

Isso é a **salário de mercado**. Pagando júnior a R$ 3.000 carregados, o custo do X2 cai
para R$ 2.058 e ele vira **+R$ 267** por cliente — positivo, mas magro.

É literalmente o que o CFO do conselho escreveu em 13/07:

> *"O modelo só fecha contratando gente barata e júnior. Gente barata e júnior não dá
> conta. Não dá conta, sai — ou o trabalho volta pro founder. **O giro do time é o preço
> do ticket.** Nenhum EOS, nenhum escritório, nenhuma ferramenta conserta aritmética."*

**Você não escolhe entre margem e salário. Escolhe entre margem e rotatividade.**

---

## 3. O TETO DE 2026 — E O GARGALO QUE O DEFINE

### Capacidade instalada hoje

| Função | Perfis por pessoa | Time atual | Capacidade |
|---|---:|---:|---:|
| Editor | 4,6 | 3 | 13,8 |
| **Designer** | **3,9** | **1** | **3,9** |
| Social media | 6 (X2) ou 15 (X1) | 1 | 6,0 |
| Tráfego | 22 | 1 | 22,0 |

> **O editor comporta 14 clientes. O tráfego comporta 22. O designer comporta 4.**
>
> Há um designer, ganhando **R$ 650/mês** — 64% abaixo do piso júnior de mercado.
> Todo o crescimento de 2026 passa por essa cadeira. E como **o X1 não consome designer
> nenhum**, ele é a única coisa vendável hoje sem esbarrar nela.

### Os cenários

| Configuração | X2/X3 | X1 | Clientes | Receita/mês | Lucro/mês |
|---|---:|---:|---:|---:|---:|
| Time de hoje | 4 | 5 | 9 | R$ 23.000 | **+R$ 1,4 mil** |
| +1 designer, usando a capacidade nova | 6 | 0 | 6 | R$ 21.000 | **−R$ 4,6 mil** |
| +1 designer +1 social media | 8 | 10 | 18 | R$ 46.000 | +R$ 2,9 mil |
| **Mesmo time, X2 a R$ 6.000** | 8 | 10 | 18 | **R$ 66.000** | **+R$ 16,1 mil** |

**A linha 2 é contraintuitiva e importante.** Contratar um designer e usar a capacidade
nova *piora* o lucro. O designer só destrava X2, cada X2 dá prejuízo, e para entregá-los
a social media abandona as vagas de X1, que são as lucrativas. Você trocaria cinco
clientes que dão dinheiro por dois que tiram. Enquanto o X2 estiver a R$ 3.500, a
decisão racional é **não usar a capacidade que você acabou de comprar** — que é a
definição de contratar cedo demais.

**As duas últimas linhas têm o mesmo time e os mesmos 18 clientes.** A única diferença é
o X2 sair de R$ 3.500 para R$ 6.000. O lucro vai de R$ 2,9 mil para R$ 16,1 mil.
Contratar duas pessoas dá R$ 23 mil de receita; corrigir um preço dá R$ 13 mil de lucro
— e é de graça.

---

## 4. ONDE O CALENDÁRIO ENTRA

Restam 4,7 meses de 2026, mas **não 4,7 meses de venda**. De 16/08 a 25/10 o leilão do
Meta está tomado pela eleição, e dezembro não fecha contrato B2B. A janela real é
**esta semana, novembro e a primeira quinzena de dezembro** — cerca de 2,5 meses.

Cenário realista: designer contratado em setembro, preços como estão, churn de 12%.

| Mês | Clientes | Receita |
|---|---:|---:|
| Agosto | 7 | R$ 18 mil |
| Setembro | 7 | R$ 19 mil |
| Outubro | 7 | R$ 19 mil |
| Novembro | 10 | R$ 28 mil |
| Dezembro | 12 | **R$ 34 mil** |
| **Soma ago–dez** | | **R$ 118 mil** |

**Saída de 2026: R$ 34 mil/mês.** É o dobro dos R$ 16 mil de julho — e menos da metade
do teto de R$ 66 mil que o preço corrigido destrava com o mesmo time.

**Corrigindo o X2 para R$ 6.000 nos contratos novos:** cerca de **R$ 152 mil** no
período, sem vender um cliente a mais nem contratar além do designer.

---

## 5. O ICP DE TRÁFEGO, POR PRODUTO

Régua do plano: marketing consome 5% a 10% do faturamento de um varejo. Invertendo, o
preço revela o faturamento mínimo da loja. Cruzado com as 608 mil lojas de moda feminina
e infantil do dimensionamento.

| Produto | A loja precisa faturar | Porte | Lojas no Brasil | Sinal para segmentar |
|---|---|---|---:|---|
| X1 · R$ 1.800 | R$ 18–36 mil/mês | ME saindo do MEI | ~50 mil | 1 loja física, Instagram de 3–15 mil, vende por direct, sem site |
| X2 · R$ 3.500 | R$ 35–70 mil/mês | ME consolidada | ~28 mil | 2+ pontos ou loja + e-commerce, já roda anúncio, tem quem responda o WhatsApp |
| X3 · R$ 5.500 | R$ 55–110 mil/mês | EPP | ~15 mil | equipe de vendas própria, verba acima de R$ 3 mil, marca com nome no polo |

### A conclusão desconfortável, agora com o número do mercado

A Ciés paga **R$ 1.333/mês** e tem verba de R$ 1.000 **paga pela metade**. Uma loja assim
fatura bem abaixo de R$ 35 mil/mês. **Ela não é ICP do X2 — é ICP do X1.** O mesmo
provavelmente vale para a Clau Kids.

Não é um problema de entrega com essas duas contas. É **produto errado vendido para o
porte errado**, e isso explica boa parte do atrito documentado desde junho.

### Como achar essas lojas no Meta

Segmentação por faturamento não existe no gerenciador. A estratégia é **atrair largo e
qualificar no formulário**.

| Camada | O que usar | Por quê |
|---|---|---|
| **Geografia** | Polos de moda: Goiânia, Brás e Bom Retiro, Fortaleza, Blumenau e Brusque, Caruaru e Toritama, Divinópolis, Cianorte, Nova Friburgo | densidade de loja real por km² |
| **Interesse** | Softwares de gestão de loja, maquininhas, feiras do setor, fornecedores de atacado — **não** "moda" | quem segue fornecedor é lojista; quem segue moda é consumidora |
| **Qualificação** | Pergunta de faturamento no formulário, com as três faixas acima | único filtro de porte que funciona de fato |
| **Roteamento** | Skill `detalhamento-mql` classifica o CSV do Meta por faixa e devolve o produto certo por lead | **você já tem construída — está parada** |

**Ajuste de calendário.** Rodar aquisição fria entre 16/08 e 25/10 é pagar CPM eleitoral
para achar lojista. Nesta janela o certo é **captar lista com o X1 como isca** — barato,
sem designer, cabe na capacidade de hoje — e usar novembro, com o leilão normalizado,
para subir a base de X1 para X2.

---

## 6. ORDEM DE EXECUÇÃO, POR RETORNO

| # | Ação | Custo | Vale | Quando |
|---|---|---:|---|---|
| 1 | **Travar X2 em R$ 6.000 e X3 em R$ 8.000** nos contratos novos | R$ 0 | +R$ 13 mil/mês | esta semana |
| 2 | Captar lista com X1 antes de 16/08 | verba atual | janela de 8 dias | até 15/08 |
| 3 | Reclassificar Ciés e Clau Kids de X2 para X1 | R$ 0 | para de sangrar | na renovação |
| 4 | Contratar o 2º designer | ~R$ 4 mil/mês | +4 perfis de X2 | setembro |
| 5 | Contratar a 2ª social media | ~R$ 3,9 mil/mês | +10 vagas de X1 | outubro |
| 6 | Ligar a skill `detalhamento-mql` no roteamento por faixa | R$ 0 | produto certo por lead | setembro |
| 7 | Cronometrar horas por produto (tabelas do `04`) | R$ 0 | troca estimativa por medição | esta semana |

**A número 1 é a de maior retorno e custa zero.** As contratações vêm depois porque, aos
preços de hoje, contratar para entregar X2 aumenta o prejuízo. **Primeiro o preço, depois
a capacidade** — na ordem inversa você financia o próprio buraco.

---

## 7. O QUE AINDA É ESTIMATIVA

| Lacuna | Efeito se eu estiver errado |
|---|---|
| Razões de atendimento nunca cronometradas | Se o ratio real do X2 for 1,5 e não 2–3, o prejuízo por cliente é **maior** que R$ 762 |
| Custo carregado de R$ 4.500 é o meio das faixas do conselho, não a folha real | Muda o sinal do X2 (a júnior fica positivo) |
| Faturamento real dos clientes é desconhecido | O ICP é derivado de regra de bolso, não dos números deles |
| Alíquota de 15,58% não validada pelo contador | Move a linha de "demais despesas" em todos os produtos |

As duas tabelas de calibração do `04-CATALOGO-DE-ATIVIDADES-E-ENTREGAVEIS.md` resolvem
as duas primeiras **em uma conversa de 15 minutos**. Até lá, este documento é hipótese
bem fundamentada — não plano custeado.

---

*Produzido em 08/08/2026. O tráfego e o ICP operacional seguem em sessão separada,
conforme decidido: esta fica como estudo de mercado vivo.*
