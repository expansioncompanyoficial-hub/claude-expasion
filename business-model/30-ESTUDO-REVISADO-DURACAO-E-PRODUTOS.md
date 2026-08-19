# 30 — ESTUDO REVISADO: DURAÇÃO DE CONTRATO E O FUTURO DO EX2/EX3

**Pesquisa de mercado com verificação adversarial** — 18 agentes, 5 frentes, 12
achados numéricos submetidos a refutação.

| | |
|---|---|
| **Versão** | 1.0 |
| **Data** | 2026-08-11 |
| **Origem** | Nicolas: *"qual é a duração desses produtos"* + *"o EX2 e EX3 — como a gente é muito bom em conteúdo, tem como explorar?"* |
| **Método** | 5 frentes paralelas → verificação adversarial dos achados numéricos → síntese |
| **Versão visual** | https://claude.ai/code/artifact/a2541419-dfa2-487c-9496-83c36492fe49 |

---

## 0 — RETRATAÇÃO Nº 2: os benchmarks de churn não existem

**A verificação adversarial destruiu a Frente 1 inteira.** Todos os números que este
acervo usava para sustentar prazo de contrato voltaram **REFUTADO** ou **NÃO
VERIFICÁVEL**:

| Número | Onde estava | Veredito |
|---|---|---|
| Duração média 56 / 36 / 30 / 24 meses por modelo | `13`, `14`, `A-012` | ❌ **REFUTADO** |
| Churn 18% fee · 42% projeto | `13` | ❌ **REFUTADO** |
| **43% do churn B2B nos primeiros 90 dias** | `13`, `D-009`, `19` | ❌ **NÃO VERIFICÁVEL** |
| Churn 25% em agência de 1–10 pessoas | `13` | ❌ NÃO VERIFICÁVEL |
| Retenção 92% × 78% | `13` | ❌ NÃO VERIFICÁVEL |

**Por que caíram:** a cadeia de fontes termina em **material de venda de fornecedor**
— Focus Digital é agência de SEO, Moxo vende onboarding, Predictable Profits vende
coaching para agências. Sem amostra declarada, com datas de campo contraditórias,
contradição aritmética interna e **citação circular fingindo corroboração
independente**. O "churn de projeto" é ainda erro de categoria: fim de escopo não é
cancelamento.

> **Não existe benchmark público confiável de churn ou duração de contrato de
> agência — nem brasileiro, nem americano.** Nada disso pode entrar em proposta, deck
> ou documento de decisão. **Já foi retirado de `13`, `14` e do `DECISION-LOG`.**

**A `D-009` — eliminar o contrato de 3 meses — continua certa, por outro critério.**
Ver §1.

### Condicionante de método, dita na frente

O proxy de egress bloqueou leitura direta em quase todos os domínios. **Nenhum número
deste relatório foi lido na página original** — todos vieram de trechos de buscador.
Onde a rodada adversarial reconstruiu a fonte, o resultado foi devastador.
**Confiança `ALTA` aqui significa "fonte nomeada com amostra declarada no trecho",
não "verificada por leitura direta".**

---

## 1 — DURAÇÃO POR PRODUTO: o eixo é ciclo de prova, não churn

Sem benchmark de churn, o critério defensável é outro: **quanto tempo cada produto
leva para provar valor** — e isso é ancorável no calendário brasileiro.

| | Ciclo de prova | Ancoragem |
|---|---|---|
| **EX1 BASE** | **30 a 45 dias** | A campanha produz venda rastreável no primeiro mês |
| EX2 (IA) | 60 a 90 dias | O valor só aparece com o processo da loja documentado |
| **EX3 MARCA** | **9 a 12 meses** | Exige uma sazonalidade inteira: duas trocas de coleção + as três datas âncora |

### A recomendação — `D-038`

| Produto | Duração | Por quê |
|---|---|---|
| **EX1 · BASE e LEVE** | **6 meses**, renovação automática com 30 dias de aviso | Prova em semanas. Travar 12 meses no produto de entrada só adiciona atrito onde a casa precisa de volume. Seis porque a régua precisa de **dois ciclos de recompra** para calibrar |
| **EX2 · CONTEÚDO** *(o produto novo, §3)* | **6 meses** | Prova rápida, sem exigir sazonalidade completa |
| **EX3 · MARCA** | **12 meses, inegociável, com início programado** | **Não porque contrato longo retém** — isso foi refutado. **Porque o produto não pode ser julgado em menos de um ciclo de moda.** Vender EX3 por 6 meses é vender um produto que o cliente vai avaliar com metade da evidência |

### O argumento que sobrevive sem benchmark nenhum

Para manter **15 clientes de EX1** ocupados:

| Duração | Vendas necessárias por ano |
|---|---|
| 3 meses | **60** |
| 6 meses | 30 |
| 12 meses | **15** |

**Isso é aritmética da própria casa, não benchmark de ninguém.** É o argumento certo
para eliminar o contrato de 3 meses.

### O achado novo: o EX3 tem data de entrada certa

Amplitude sazonal do varejo de moda: **dezembro roda +63,7% acima da média mensal e
fevereiro −30,0% abaixo** *(Serasa Experian, série 2000–2013 — `MEDIA`; anterior à
consolidação da Black Friday, **não citar como dado de 2026**)*.

> **Contrato de EX3 fechado entre agosto e setembro coloca o pico (out‑nov‑dez)
> dentro dos primeiros 120 dias. Fechado em janeiro, coloca fevereiro na janela de
> avaliação inicial.** Uma loja que contrata na baixa cancela em fevereiro por
> aritmética de caixa, não por insatisfação.

---

## 2 — VOCÊ ESTÁ ERRADO SOBRE O PRAZO DA IA. E CERTO EM DESCONFIAR DO EX2.

### O prazo: errado por ordens de grandeza

| Caminho | Tempo real |
|---|---|
| **Meta Business Agent**, nativo no app WhatsApp Business | **~5 minutos**, sem desenvolvedor *(`ALTA`)* |
| Agente em n8n com tutorial público | **30 minutos** *(`ALTA`)* |
| Plataforma no‑code + aprovação da API oficial | **1 a 7 dias** *(`ALTA`)* |

**Ressalva honesta:** todos esses prazos são **autodeclarados por quem vende**. Não há
medição independente de implantação real em loja (`NÃO INFORMADO`). Mas mesmo com
desconto generoso, a distância entre "5 minutos" e "demora demais" não se fecha.

O que você provavelmente imaginou foi o caminho **custom**: R$ 8.000–20.000 de projeto
+ R$ 200–800/mês *(`BAIXA`)*. Para loja de R$ 30–140 mil isso é economicamente
absurdo e não deve ser considerado.

**O que de fato leva tempo não é a ferramenta — é documentar o processo da loja:**
catálogo, tabela de medidas, política de troca, formas de pagamento, tom de voz.
Isso é trabalho de conteúdo e processo, e leva semanas.

### Mas o EX2 deve ser congelado — por três razões melhores que a sua

**(a) A camada foi commoditizada.** Agente de IA para WhatsApp no Brasil roda entre
**R$ 99 e R$ 1.400/mês** *(`MEDIA`)*. SocialHub R$ 99 · Digisac R$ 197 · Blip Go
R$ 299 · SleekFlow R$ 589. E **em 10/08/2026 — ontem — a Take Blip fechou com a Claro
Empresas** para distribuir o Blip Go a PMEs em planos de **R$ 179,90 a R$ 399,90**
*(Mobile Time / TELETIME — `ALTA`)*.

> **Quando a operadora de telefonia vende no balcão, a margem de assessoria em cima
> da ferramenta evaporou.** E o Meta Business Agent está dentro do app que o lojista
> já usa, a ~US$ 0,04–0,05 por resposta, desde 01/08/2026 *(`ALTA`)*.

**(b) A demanda não existe ainda.** Apenas **~3% das conversas do varejo
conversacional brasileiro foram inteiramente atendidas por IA em 2025**, sobre base de
51 milhões de conversas e ~600 marcas *(Chat Commerce Report 2026 / OmniChat —
`ALTA`)*. Cruzando com o Sebrae — **41% das MPEs já ligaram chatbot no WhatsApp**
(`ALTA`) — o retrato é: **muita gente ligou bot, quase ninguém tem bot que resolve.**

> **Ninguém está perdendo cliente por não ter IA. Vender EX2 hoje é vender educação de
> mercado — a venda mais cara e mais lenta que existe.**

**(c) O risco é datado e está a semanas.** A partir de **01/10/2026** a Meta passa a
cobrar mensagens de serviço — respostas livres dentro da janela de 24h *(`MEDIA`)*.
**O preço para o Brasil é `NÃO INFORMADO`** e as fontes divergem em até **4×**.
Some‑se o Gartner: mais de 40% dos projetos de IA agêntica cancelados até 2027
*(`ALTA`)*.

### Se houver apetite, o reposicionamento defensável

Não *"implantar IA"* — **consertar o bot ruim que já está lá.** É onde o dado aponta
espaço real: **41% têm chatbot, 3% de resolução efetiva.** E escopar para **pós‑venda
e triagem**, onde a resolução é alta *(58% num cliente OmniChat — `MEDIA`)*, **nunca
para venda consultiva de moda** — caimento, tamanho e combinação são o pior cenário
para IA, e a taxa em moda no Brasil é `NÃO INFORMADO`.

Se quiser presença: **white label como add‑on** — custo de R$ 290/agente *(`MEDIA`)*,
revendido a R$ 600–900 **dentro de outro produto**.

---

## 3 — CONTEÚDO SEM GRAVAÇÃO: existe mercado, mas o teto é ~R$ 3.500

### Quanto se cobra hoje

| Oferta | Preço | Fonte |
|---|---|---|
| 8 reels/mês, **só edição** (cliente grava) | **R$ 1.500 – 3.500** | FreelaSemCrise (`MEDIA`) |
| Escopo essencial 8–12 entregas, sem captação | **R$ 2.500 – 5.000** | Koko (`MEDIA` — uma agência, praça carioca) |
| Operação reels‑first **com** captação | **R$ 10.000 – 20.000+** | Koko (`MEDIA`) |
| Design por assinatura, demanda ilimitada | R$ 799 | Volupia (`MEDIA`) |
| Carrossel avulso | a partir de **R$ 20/peça** | Vintepila (`MEDIA`) |

### O dado que enquadra tudo

> **55% dos profissionais de mídias sociais no Brasil cobram até R$ 1.500/mês por
> cliente. Apenas 8% ultrapassam R$ 4.000.**
> *(Panorama mLabs, +4.000 respondentes, abr/2026 — `ALTA`)*

**O EX3 a R$ 5.500 está acima do percentil 92 do mercado brasileiro de social media.**
Um produto remoto da Expansion seria comparado com **esse** mercado, não com o EX3.

> **A captação presencial é o que autoriza a faixa de R$ 5.500.** Tirar a gravação não
> corta 10% do preço — **corta o produto de faixa.** O teto realista de um "EX3
> remoto" é **R$ 2.500 a R$ 3.500**.

**Ressalva:** a razão de 2× a 4× entre com e sem captação vem de **uma** agência
carioca mais uma tabela de freelancer. Não há pesquisa amostral brasileira sobre isso
(`NÃO INFORMADO`). **Pegar 3 a 5 orçamentos reais de concorrentes antes de decidir.**

### E uma economia contraintuitiva sobre a diária

O **custo direto** da diária é baixo — R$ 300 a R$ 1.000 de videomaker *(`MEDIA`)*.
**O problema do EX3 nunca foi o custo da diária: é o custo de oportunidade das 39 h e
a não‑escalabilidade do deslocamento.** Antes de matar a gravação, **testar
reduzi‑la**: uma diária a cada dois meses, ou **diária coletiva com 2–3 clientes na
mesma região no mesmo dia**.

### O produto novo — `D-039`

**EX2 · CONTEÚDO substitui o EX2 · VENDA no cardápio. Não é um quarto produto.**

| | Preço | Horas | Lucro | Receita/hora | Custo Meta |
|---|---|---|---|---|---|
| EX2 · VENDA *(IA — congelado)* | R$ 3.500 | 20 h | 37,1% | R$ 175 | alto e datado |
| **EX2 · CONTEÚDO** | **R$ 3.200** | **14,25 h** | **42,5%** | **R$ 225** | **zero** |

**Escopo:** 4 vídeos (cliente grava) + 7 publicações com **carrossel** + tráfego pago
embutido.
`Memória: 0,6142 × 3.200 − 14,25 × 42,55 = R$ 1.359,10 = 42,5%`

**Quatro condições, e todas vêm do dado:**

1. **Substitui o EX2, não soma.** Agências que **reduziram** o número de serviços
   cresceram 13% e registraram **30% de margem líquida contra 13% da média**
   *(Promethean Research 2026, n=119, metodologia declarada — `ALTA`)*. **Três
   produtos continuam três.**
2. **Contagem fixa de peças, nunca "demanda livre".** Serviço produtizado roda 50–65%
   de margem bruta contra 30–45% do customizado *(`MEDIA`, fonte americana)*.
3. **Carrossel, não estático.** Carrossel lidera engajamento (**0,55%** contra 0,48%
   do Reels), e o estático está morrendo (0,33%, **−17% ano contra ano**)
   *(Socialinsider, 35 mi de posts — `MEDIA`, internacional, usado só como razão; não
   há benchmark brasileiro de formato — `NÃO INFORMADO`)*. Para catálogo de coleção,
   look do dia, tabela de medidas e antes/depois, **o carrossel é tecnicamente
   superior — e isso se vende com dado.**
4. **Tráfego embutido, obrigatório.** Carrossel adensa quem já segue; **não gera
   descoberta.** Produto de conteúdo sem vídeo não traz cliente novo — e é cliente
   novo que o lojista compra.

### O alerta que precisa ser dito

O terreno de conteúdo é **o pior do cardápio em três dimensões simultâneas**:

- **Margem:** produção pura roda **38–42%** — a pior faixa. CRM/retenção roda
  **60–70%** *(fontes americanas — `MEDIA`, sem equivalente brasileiro)*.
- **Preço:** a mLabs nomeou o **"Paradoxo de 2026"** — nunca se produziu tanto
  conteúdo com IA, nunca se cobrou tanto resultado, **nunca se pagou tão pouco**
  *(`ALTA`, qualitativo; a magnitude da queda é `NÃO INFORMADO`)*.
- **Diferenciação:** **83% dos profissionais já usam IA no dia a dia** *(`ALTA`)* —
  usar IA para produzir conteúdo **é higiene, não vantagem**.

**Contraponto honesto, a seu favor:** agências de **Design cresceram 15% em 2025
contra 6% das de Marketing** *(`MEDIA`)*. **Há demanda.** Mas crescer 15% a 40% de
margem é pior que crescer 6% a 65%.

---

## 4 — `ALERTA-08`

> 🟡 **RESSALVA DE 19/08/2026 (`34` §7 e `A-056`).** As magnitudes de custo Meta usadas
> aqui — R$ 0,31–0,38 por mensagem de marketing, R$ 0,034–0,05 por utilidade, e os
> R$ 620–760 por campanha de 2.000 contatos — **caíram para `A VERIFICAR`.** O
> US$ 0,0625 de marketing foi **REFUTADO como número oficial** (cadeia de citação
> circular; existe rate card oficial em BRL desde 01/07/2026). **O mecanismo continua:**
> marketing custa muito mais que utilidade e **não tem desconto por volume**. As
> magnitudes só fecham com a fatura na mão.
>
> ⚠️ **E a arbitragem marketing → utilidade é violação de política da Meta** — ver
> `D-047`. Substituída por fluxos genuinamente transacionais e pela janela de 24 h.

: o custo Meta pode zerar o EX1

O achado mais urgente da pesquisa. **Agrava o `ALERTA-06`.**

Tabela Brasil *(`MEDIA` — **nenhum preço foi lido no rate card oficial da Meta**; o
domínio estava bloqueado. **Conferir antes de fechar contrato**)*:

| Categoria | Preço por mensagem |
|---|---|
| **Marketing** (promoção, oferta) | US$ 0,0625 ≈ **R$ 0,31 – 0,38** |
| **Utilidade** (aviso, lembrete, status) | US$ 0,0068 ≈ **R$ 0,034 – 0,05** |
| Serviço | grátis **até 30/09/2026** |

### O que isso faz com o EX1

| Cenário | Disparos | Custo Meta | Lucro do EX1 |
|---|---|---|---|
| **Campanha segmentada (600) + régua em utilidade (400)** | 1.000 | **R$ 221** | **34,9%** 🟢 |
| Campanha para a base inteira (2.000) em marketing | 2.000 | **R$ 690** | **8,9%** 🔴 |

> **Uma campanha de reativação para 2.000 clientes em template de marketing custa
> R$ 620–760 só de Meta — 35% a 42% de uma mensalidade de R$ 1.800.**
> **Sem cláusula de repasse, o EX1 opera com margem negativa em campanha grande.**

### As duas travas que resolvem — `D-040`

1. **Franquia de 600 disparos de marketing/mês inclusa. Excedente repassado ao
   custo.** A régua fica ilimitada, porque roda em utilidade.
2. **Arbitragem de categoria — e é competência real de assessoria:** reclassificar
   disparos de marketing para **utilidade** (aviso de pedido, lembrete, status)
   derruba o custo de **~R$ 0,31 para ~R$ 0,04 — 87% menos.** Isso vale mais para o
   cliente do que a IA, e quase ninguém no mercado sabe fazer.

---

## 5 — O QUE VALIDA O EX1, com dado brasileiro do nicho exato

> **77% dos cadastrados no varejo de moda brasileiro estão inativos há 12+ meses. A
> taxa média de compradores ativos é 22,6% — e mesmo o top 10 chega só a 35,1%.**
> *(Dito CRM, ~20 milhões de consumidores, 50 marcas — `ALTA`)*

**Abertura de reunião:** *"de cada 10 clientes no seu cadastro, quase 8 não compram há
mais de um ano — e você já pagou para adquirir todas elas."*

A aritmética fecha na frente do lojista: ~~ticket médio do vestuário **R$ 190** *(IEMI —
`ALTA`)*. Reativar 200 clientes inativas a 15% de conversão ≈ **R$ 5.700** — mais de
3× o preço do EX1.~~

> 🟡 **REBAIXADO EM 19/08/2026 (`34` §7, `A-060`).** O R$ 190 atribuído ao IEMI **não tem
> URL, ano de referência, nome de estudo nem recorte de canal** — é atribuição nua, não
> citação. **Cai de `ALTA` para `A CONFIRMAR`.** Uma busca sugeriu valor divergente
> (R$ 265), **mas com exatamente o mesmo defeito — não substitui.**
>
> **Use o ticket médio DA LOJA**, que sai da auditoria da base e é o único número que
> não depende de benchmark de ninguém. O cálculo dos R$ 5.700 fica **ilustrativo**, não
> projeção.

E **clientes já na base são 46,22% dos compradores mas geram 60,37% da receita**
*(Dito — `MEDIA`)*. **Isso reordena a venda: EX1 antes de EX3, não o contrário.**

### A brecha de mercado, com número

> **Apenas 14% das agências brasileiras apontam ROI como diferencial competitivo, e
> 51% admitem limitação em entregar resultado concreto** *(mLabs 2026 — `ALTA`)*.

**86% do mercado não consegue se diferenciar por resultado.** O EX1 é o único dos três
produtos com **venda atribuível desde o dia 1**.

E a língua está trocada: agências medem engajamento (63%), alcance (59%) e impressões
(53%); **clientes querem vendas, leads e tráfego** *(mLabs — `MEDIA`)*.

---

## 6 — A SEQUÊNCIA DOS PRÓXIMOS 90 DIAS

Hoje é 11/08. Os próximos 90 dias cobrem **a melhor janela comercial do ano do
nicho**: Dia das Crianças *(moda infantil R$ 4,97 bi — IEMI, `ALTA`)*, Black Friday
*(**não usar valor absoluto** — a CNC não projeta e as consultorias divergem 2,5×)* e
a montagem do Natal, que começa em outubro *(vestuário R$ 22,82 bi = 31,4% da data —
CNC, `ALTA`)*.

| # | Ação |
|---|---|
| **1** | **Vender EX1 em volume**, com o argumento dos 77%, ancorado em out‑nov‑dez. **6 meses**, renovação automática, **cláusula de repasse do custo Meta** |
| **2** | **Vender EX3 apenas para loja de R$ 140 mil+**, **12 meses**, **início programado** para pegar o pico nos primeiros 120 dias |
| **3** | **Congelar o EX2 · IA.** Substituir por **EX2 · CONTEÚDO** a R$ 3.200 quando houver folga |
| **4** | **Instrumentar medição própria:** churn por coorte de entrada, duração média, taxa de renovação no mês 6 e no 12. **É a única forma de ter número defensável — a pesquisa externa não entrega isso** |
| **5** | **Testar o prêmio de nicho:** 10 propostas a 6 meses contra 10 a 12 meses. É a única maneira de responder prazo × fechamento, que **não tem resposta pública em lugar nenhum** |

### O que NÃO fazer

1. **Não construir nem vender o EX2 · IA nos próximos 90 dias.** Não pelo prazo — por
   commoditização, demanda inexistente e risco de plataforma datado.
2. **Não criar produto avulso de carrossel/design.** Piso de R$ 20/peça, assinatura
   ilimitada a R$ 799, geradores por IA gratuitos, 7+ players na categoria.
   **Carrossel só sustenta valor embutido**, nunca vendido como item.
3. **Não abrir uma quarta linha de serviço.** Reduzir escopo é o que dobra a margem.
4. **Não vender EX3 para lead frio agora** — leva 9–12 meses para provar.
5. **Não usar nenhum número de churn da Frente 1** em material comercial.

---

## 7 — A ALAVANCA QUE NÃO CUSTA NADA CONSTRUIR

O EX3 a R$ 5.500 está **dentro** da faixa generalista brasileira (gestão de redes em
agência: R$ 1.000–5.000+; combo com tráfego acima de R$ 5.000 — `MEDIA`).

> **A casa já é nichada e cobra preço de generalista.**

Que o nicho paga mais é corroborado qualitativamente; **quanto é `NÃO INFORMADO`** — a
dispersão vai de +20% a 2–3× conforme o blog, o que denuncia estimativa editorial.
**O único dado duro sobre prêmio de nicho é patrimonial:**

> **Agências nichadas saem a 5,5–7,0× EBITDA contra mediana de 4,2–5,8×**
> *(Lightning Path Partners — `MEDIA`)*.
>
> **O retorno de cravar "lojista de moda feminina e infantil" é patrimonial antes de
> ser de caixa.**

E o nicho está desocupado: as agências brasileiras nichadas em moda miram **marca,
beleza e e‑commerce — não varejo físico de R$ 30–140 mil** *(`MEDIA`)*. O diretório
Semrush lista **apenas 2 agências no Brasil** em vestuário e acessórios *(`MEDIA`,
diretório pago — **sinal de vacância, não censo**)*.

---

## 8 — A MAIOR INCÓGNITA DO PRODUTO QUE ESTOU RECOMENDANDO

Todos os dados da Dito vêm de **marcas médias e grandes com CRM implantado**.

> **É provável que o ICP da Expansion — loja de R$ 30 a 140 mil — nem tenha base
> cadastrada de forma estruturada. O que muda a natureza do EX1: pode ser preciso
> CONSTRUIR a base antes de reativá‑la.**

**Verificar no diagnóstico dos próximos cinco clientes antes de qualquer promessa em
proposta.** Vira `A-047`, e é a pendência mais importante desta rodada.

---

## 9 — O QUE A PESQUISA NÃO CONSEGUIU RESPONDER

| Pergunta | Status |
|---|---|
| Duração ou churn de contrato de agência no Brasil | **NÃO INFORMADO** — nem ABRADi, nem ABRACOM, nem Operand publicam |
| Relação entre prazo exigido e taxa de fechamento | **NÃO INFORMADO em qualquer país.** Só teste A/B interno responde |
| Preço da mensagem de **serviço** no Brasil a partir de 01/10/2026 | **NÃO INFORMADO** — estimativas variam 4×. **É o número que falta com mais urgência** |
| Rate card oficial da Meta | **Não conferido na fonte primária** |
| Benchmark brasileiro de formato no Instagram | **NÃO INFORMADO** — todo dado carrossel × Reels é internacional |
| Quantas lojas de vestuário faturam R$ 30–140 mil/mês | **NÃO INFORMADO** — o mercado endereçável real não pôde ser dimensionado |
| Taxa de resolução de IA especificamente em moda no Brasil | **NÃO INFORMADO** |
| Curva mensal oficial do varejo de vestuário | **NÃO INFORMADO** — o melhor disponível é de 2000–2013 |
| Recompra e base inativa em loja de R$ 30–140 mil | **NÃO INFORMADO** — ver §8 |
| Quantas campanhas/ano uma loja pequena executa | **NÃO INFORMADO.** Há lastro para **8 eventos** (6 datas medidas + 2 trocas de coleção); as outras 4 do calendário de `29` §6 são campanhas de base |
