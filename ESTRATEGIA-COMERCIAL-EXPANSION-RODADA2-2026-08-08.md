# ESTRATÉGIA COMERCIAL — EXPANSION COMPANY · RODADA 2
## Como o lead chega, o que se vende para quem, e em que ordem

**Data:** 08/08/2026 · **Dono:** Nicolas Nascimento
**Substitui as Partes II e III de** `ESTRATEGIA-COMERCIAL-EXPANSION-2026-08-08.md` (rodada 1, escrita sem acesso ao material do projeto)

**Versão web deste documento:** https://claude.ai/code/artifact/e95bb8ba-7168-4554-a309-3a2ada96aa0d

---

## NOTA DE ESCOPO — o que li e o que estou acrescentando

Li o projeto **EXPANSION COMPANY** inteiro, os três blocos:

| Bloco | Onde estava | O que tem |
|---|---|---|
| **360 SOBRE A EXPANSION** | `EXPANSION-360` · `OPERACAO-REAL` · `21-TESE-DA-EXPANSION` · Raio-X 360 | A empresa, a operação real reconstruída de 4.321 mensagens, a tese das três esferas |
| **Produtos & Precificação** | `business-model/` — 24 documentos + 6 CSVs, branch `claude/new-session-nx502g` | EX1 · EX2 · EX3, custeio, margens, pacotes, playbook do Kauã, manual de entrega |
| **Estudo de mercado** | branch `claude/moda-feminina-tendencias-br-agas87` — 5 documentos | Dimensionamento, radar de tendências, preço × mercado × ICP, calendário forçado |

**A rodada 1 deste documento está superada na parte de produtos e preços.** Eu tinha desenhado uma escada de quatro degraus e pisos de R$ 4.800–6.000 sem ver a sua tabela. Os produtos reais são outros, o custeio é melhor que o meu, e a arquitetura EX1/EX2/EX3 é mais inteligente do que a que eu propus. **O diagnóstico da rodada 1 continua válido** — a aritmética do ticket, o churn de conversão, a concentração, o bloqueio fiscal, os dois funis. A arquitetura, não.

### O que este documento acrescenta

O acervo responde **o que vender** (`16`), **por quanto** (`14`,`15`,`17`), **como negociar** (`19`), **como entregar** (`18`, `22`) e **onde está o mercado** (dimensionamento, radar).

**Nenhum documento responde como o lead chega até o Kauã.** Não existe lista, não existe canal, não existe cadência, não existe roteamento de lead para produto, e o calendário de mercado nunca virou calendário comercial. É esse o buraco, e é ele que este documento fecha — junto com **seis contradições** entre os três blocos que precisam de decisão sua antes de qualquer venda.

**Confiança (Art. 24):** diagnóstico e desenho comercial em ~87. Números de preço **não são meus** — são os seus, e seguem `NÃO APROVADO` até CNPJ e regime definidos (A-006).

---
---

# PARTE I — O QUADRO, EM UMA PÁGINA

## 1. Onde a Expansion está hoje, em números do próprio acervo

| | |
|---|---|
| MRR conhecido | **R$ 17.483** (8 perfis) |
| Folha | **R$ 9.350** → R$ 8.700 sem o designer · **60,4% da receita** |
| Lucro | **~0%** |
| Pró-labore dos sócios | **R$ 0** |
| Concentração do grupo Albanos | **51,7%** |
| Churn implícito | **15% a 30%/mês** (benchmark saudável: <5%) |
| Vencimento da carteira | **agosto de 2026 — praticamente toda** |
| Preços aprovados | **nenhum** |
| Grau de confiança dos dados | **2,5/10** (`00-README`) |

## 2. Os produtos, e o que cada número quer dizer

| | **EX1 · BASE** | **EX2 · VENDA** | **EX3 · MARCA** | **360** |
|---|---|---|---|---|
| Preço | R$ 1.800 | R$ 3.500 | R$ 5.500 | R$ 10.800 |
| Horas/mês | 6 | 20 | 39 | 65 |
| Piso (h × R$ 135,41) | R$ 813 | R$ 2.708 | R$ 5.281 | R$ 8.803 |
| Folga sobre o piso | **+122%** | +29% | **+4%** | +18,5% |
| Margem | **47,2%** | 37,1% | 31,3% | 35,8% |
| **Lucro por hora** | **R$ 142** | R$ 65 | **R$ 44** | R$ 60 |
| Universo de lojas | **6.480** | 2.700 | 1.620 | 540 |
| Consome editor/designer? | **Não** | Não | **Sim, muito** | Sim |

> **Três leituras que decidem a estratégia comercial inteira:**
>
> **1.** Uma hora no EX1 gera **3,2× o lucro** da mesma hora no EX3. Três EX1 e um EX3 faturam quase igual (R$ 5.400 × R$ 5.500) — e o EX1 dá **48% mais lucro em metade das horas**.
>
> **2.** O EX1 tem o **maior universo** (6.480 lojas), o **maior lucro por hora** e **não toca no seu gargalo de produção**. As três coisas apontam para o mesmo lugar.
>
> **3.** O EX3 tem **4% de folga**. Com o grupo de WhatsApp dentro do escopo — que já acontece hoje, de graça — ele entrega **23,5%** e o piso correto vira R$ 6.635. É o único produto que quebra se a estimativa de horas errar por pouco.

## 3. O mercado, e o que ele não é

**O mercado de moda feminina + infantil movimenta R$ 181 bi/ano. Nada disso é seu** — é dinheiro que sai da consumidora e entra no caixa da lojista.

O seu mercado é o que **os seus produtos, nos seus preços**, podem faturar: **~6.500 lojas, ~R$ 360 milhões/ano.**

| Faixa da loja | Lojas fem+inf | Produto |
|---|---:|---|
| R$ 30–40 mil/mês | 2.520 | abaixo do ICP |
| **R$ 40–100 mil/mês** | **3.780** | **EX1** |
| R$ 100–140 mil/mês | 1.080 | EX1 + EX2 |
| R$ 140–250 mil/mês | 1.080 | EX3 |
| R$ 250 mil+/mês | 540 | 360 |

E o achado que reorganiza tudo:

> **6.500 lojas não são um mercado. São uma lista.**
>
> Dá para nomear cada uma, saber o polo, saber quem é a dona, saber se ela anuncia e quanto tempo ela demora para responder no WhatsApp. Isso é pequeno demais para anúncio de massa e grande demais para você atender sozinho — **é o tamanho exato de mercado que se toma por lista nominal, não por segmentação de interesse.**
>
> Para chegar ao teto do Simples (R$ 400 mil/mês) você precisa de **144 dessas 6.500 — 2,2%.** O mercado nunca foi o problema.

## 4. O calendário que manda em tudo

| Data | Evento | Consequência comercial |
|---|---|---|
| **15/08** | Última mídia barata | **7 dias.** Depois disso, prospecção fria por leilão fica proibitiva |
| **16/08 – 25/10** | Propaganda eleitoral (71 dias) | CPM foi de R$ 5,03 → R$ 96,71 em 15 dias em 2022. **Mídia paga sai do jogo** |
| **01/09** | Meta publica a tarifa BR de mensagem | Recalcular custo de atendimento de cada cliente |
| **01/10** | **WhatsApp passa a cobrar mensagem de serviço** | **A virada do EX2.** A dor sai do abstrato e vira fatura |
| **04/10 · 25/10** | Eleições | Fim da inflação de CPM em 26/10 |
| **27/11 · 25/12** | Black Friday · Natal | Caixa da lojista comprometido |
| **01/01/2027** | CBS 8,8% + split payment | Prepara-se em novembro |
| **09/02/2027** | Carnaval, 8 dias mais cedo | Contrato de 6 meses fechado hoje **vence em fevereiro** — o pior mês do varejo |

> **A janela comercial real de 2026 tem três partes, e só uma delas usa mídia:**
> **(a) 08–15/08** — 7 dias de mídia barata · **(b) 16/08–25/10** — 71 dias em que só outbound por lista funciona · **(c) 26/10–15/12** — 7 semanas de mídia normalizada com sazonalidade a favor.

---
---

# PARTE II — A EMERGÊNCIA QUE VEM ANTES DA PROSPECÇÃO

## 5. Toda a carteira vence agora. Isso é a estratégia comercial de agosto.

Está escrito no `00-README`, linha 5, e não aparece em nenhum plano de venda:

> *"Toda a carteira informada vence em agosto de 2026. Perder Ciés + Albanos leva o resultado a **−R$ 3.200/mês**."*

**Hoje é 08 de agosto.**

| Cliente | R$/mês hoje | Vencimento | Situação |
|---|---:|---|---|
| Ecossistema Albanos (4 perfis) | 8.000,00 | 3 meses antecipados, caixa **já recebido** | Meses 2 e 3 são **custo integral com caixa zero** |
| Prime Alphaville | 3.000,00 | 31/08 (2º mês) | *"quase cancelou"* em 16/07 por falta de relatório |
| Reino Consórcios | ~2.000,00 | não informado | Status de cliente sequer confirmado |
| Dr. Fred | 1.750,00 | ~05/08 | Consome **140–203% do editor sozinho**. Dá prejuízo só na edição |
| Jane JQL Seguros | 1.400,00 | ~05/08 | Menor ticket **com gravação presencial + tráfego** dentro |
| Ciés Brand | 1.333,33 | 31/08 (último) | 3 meses antecipados, caixa já recebido |
| Clau Kids | não informado | não informado | Loja fatura **R$ 20–30 mil/mês** |

### A conta que ninguém fez: a carteira atual vale quase o dobro do que cobra

| Cliente | Hoje | Produto certo | Valor |
|---|---:|---|---:|
| Albanos — 4 perfis | 8.000 | EX3 + 3 perfis adicionais (R$ 3.500 cada) | 16.000 → **negociar 12.000** com escopo fechado |
| Prime | 3.000 | EX3 | **5.500** |
| Dr. Fred | 1.750 | EX3 (ou encerrar) | **5.500** |
| Jane JQL | 1.400 | EX3 (ou encerrar) | **5.500** |
| Ciés | 1.333 | EX1 | **1.800** |
| Clau Kids | ? | EX1 | **1.800** |
| Reino | 2.000 | EX1 | **1.800** |

> **A carteira atual, reprecificada nos seus próprios produtos, vale R$ 28.400 a R$ 33.900 por mês. Hoje ela vale R$ 17.483.**
>
> A diferença — **R$ 11.000 a R$ 16.400 por mês** — não exige um cliente novo, não exige mídia, não exige contratar ninguém. **Exige sete conversas de renovação nas próximas três semanas.**
>
> É de longe a ação de maior retorno disponível, e ela tem prazo: os contratos vencem em agosto.

**E o custo de não fazer:** se Ciés + Albanos saírem, o MRR cai para ~R$ 8.150 e o resultado vai a **−R$ 3.200/mês**. Não existe prospecção que reponha isso a tempo.

### A ordem das sete conversas

| # | Quem | Quando | O que levar |
|---|---|---|---|
| 1 | **Albanos** (51,7% da receita) | esta semana | Relatório dos 3 meses + proposta de escopo fechado. **Nunca mais antecipação com desconto** — a última custou 295% ao ano |
| 2 | **Prime** | esta semana | Relatório semanal rodando **antes** da conversa. Foi a ausência dele que quase custou o cliente |
| 3 | **Ciés** | esta semana | O número dela: **R$ 5.000 em menos de um dia**. É a conversa mais fácil da lista |
| 4 | **Dr. Fred** | até 15/08 | Reprecificar para EX3 ou encerrar. Mantê-lo como está é subsidiar prejuízo com o editor que já está a 169% |
| 5 | **Jane JQL** | até 15/08 | Idem |
| 6 | **Clau Kids** | até 22/08 | EX1, com a campanha de reativação rodada antes |
| 7 | **Reino** | até 22/08 | Primeiro classificar: é cliente ativo? É recorrente ou projeto? |

**Regra para as sete:** ninguém renova sem relatório semanal na mão. O relatório não é entrega — é o instrumento que torna a renovação possível. Foi a ausência dele, não a qualidade do conteúdo, que quase custou a Prime.

---
---

# PARTE III — AS SEIS CONTRADIÇÕES QUE PRECISAM DE DECISÃO

Li os três blocos inteiros. Eles não concordam entre si em seis pontos, e cada um muda a estratégia comercial. Nenhum é erro de ninguém — são rodadas de análise diferentes que nunca foram reconciliadas.

## C1 — O ICP tem duas versões, e elas diferem por 2,5×

| Documento | EX1 | EX2 | EX3 |
|---|---|---|---|
| `16-PACOTES` e `PRECO-MERCADO-ICP` | loja R$ 40–100k | R$ 100k+ | R$ 140k+ |
| `CONCATENACAO` | loja **R$ 18–36k** | R$ 35–70k | R$ 55–110k |

A diferença vem da régua: a primeira usa *"cada R$ 1 de fee exige R$ 2,86 de venda nova"*; a segunda usa *"marketing = 5–10% do faturamento"*. **A segunda régua inclui a verba de mídia; a primeira, não.** Comparar honorário puro contra uma régua que inclui mídia infla o ICP para baixo.

**Recomendo a versão conservadora** (R$ 40–100k para o EX1). Ela é a que sobrevive à objeção na mesa, e é a que sustenta a trava do §7 do playbook.

**Mas ela tem uma consequência que precisa ser dita em voz alta.**

## C2 — Seus dois clientes de moda estão abaixo do ICP dos seus próprios produtos

- **Clau Kids fatura R$ 20–30 mil/mês** (confirmado por você em 05/08).
- **Ciés:** *"faturamento baixo, voltaram a operar recentemente"* — paga R$ 1.333/mês com verba de R$ 1.000 paga pela metade.

Pelo ICP conservador, **nenhuma das duas é cliente do EX1.** Elas estão na faixa "ainda não é cliente — nutrir".

**E aqui está o problema, ou a maior oportunidade do acervo:** o caso que sustenta a promessa comercial do EX1 — *"a Ciés reativou a base e vendeu mais de R$ 5.000 em menos de um dia"* — **aconteceu numa loja que, pelo seu próprio critério, não deveria ser cliente.**

Duas leituras possíveis, e elas levam a lugares opostos:

| Se… | Então… |
|---|---|
| Foi caso isolado | O ICP conservador está certo, e você tem duas contas legado a nutrir |
| **O EX1 funciona em loja de R$ 20–40k** | O universo salta de **6.480 para ~50.000 lojas** — e abre espaço para um **EX1 leve a R$ 1.200** (piso R$ 813, margem ainda ~32%) para uma faixa que ninguém atende |

> **Esta é a hipótese mais valiosa não testada do acervo inteiro.** O teste custa uma campanha: rodar a reativação da Clau Kids (R$ 20–30k/mês) e medir. Se der resultado proporcional ao da Ciés, o seu mercado é **7,7× maior** do que o dimensionamento diz.
>
> `16-PACOTES` §11 já colocou isso como tarefa nº 1 para quinta-feira. **Continua sendo a tarefa nº 1 — e agora com uma consequência estratégica muito maior do que "validar a taxa de resposta".**

## C3 — O EX2 fecha ou dá prejuízo? A resposta depende de um número que ninguém definiu

| Documento | Veredito do EX2 a R$ 3.500 |
|---|---|
| `16-PACOTES` / `18-ENTREGAVEIS` | **+37,1% de lucro** |
| `CONCATENACAO` | **−R$ 762/cliente · −21,8%** |

A diferença inteira está em **quantos clientes um operador de conversa carrega**:

- `CONCATENACAO` usou **1,5 cliente por operador** → custo de R$ 3.000/cliente → prejuízo.
- A conta de horas do `18` diz que o EX2 consome **20 h/mês por cliente**. A 130 horas produtivas, o mesmo operador carrega **6,5 clientes** → custo de ~R$ 460–690/cliente → lucro.

**São 4,3× de diferença, e ninguém reconciliou.** Fisicamente, 6,5 é plausível: a supervisão da janela morta é *supervisão de IA*, não atendimento humano um a um — seis clientes às 21h cabem numa pessoa das 19h às 23h. Mas isso nunca foi testado.

**Decisão necessária antes de vender o primeiro EX2:** rodar a janela morta de dois clientes com a mesma pessoa por duas semanas e cronometrar. Se der 6, o EX2 é o segundo melhor produto da casa. Se der 2, ele precisa custar R$ 6.000.

**E há um custo que não está em preço nenhum:** a partir de **01/10** o WhatsApp cobra por mensagem de serviço. `19` §10 registra que isso pode derrubar o EX1 de 47,2% para ~29%. **A tarifa brasileira sai em 01/09. Nenhum contrato de EX1 ou EX2 deve ser assinado sem cláusula de repasse desse custo.**

## C4 — O gargalo tem três respostas, e todas estavam certas na sua época

| Documento | Gargalo |
|---|---|
| `capacidade-por-funcao.csv` | **Editor** — 168,9% no cenário mais otimista, 413,8% no estressado |
| `CONCATENACAO` | **Designer** — comporta 4 perfis |
| `PRECO-MERCADO-ICP` | Nenhum dos dois — carrossel automatizado, arte no Canva com a Débora |
| `DIMENSIONAMENTO` | **Churn** — teto de 15 clientes com 3 vendas/mês |

**A reconciliação:** o gargalo **muda de lugar com o mix**. Editor e designer são gargalos do EX3. O EX1 não consome nenhum dos dois — consome social media e tráfego. Se o mix vira 60% EX1, o gargalo migra para a **Débora**, cuja capacidade é `NÃO INFORMADA` no seu próprio CSV.

E o gargalo de curto prazo não é nenhum deles: **é churn.** Com 20%/mês e 3 vendas/mês, o teto é 15 clientes — **para sempre**, independente de quantas pessoas você contrate.

> **Consequência comercial direta:** existe folga real para vender **EX1** hoje, e não existe folga nenhuma para vender **EX3**. A meta comercial de 2026 deve ser contada em **EX1 vendidos**.

## C5 — A meta de 144 clientes não conversa com o churn

`PRECO-MERCADO-ICP` mostra 144 clientes = R$ 400 mil/mês = 2,2% do mercado, e conclui *"o mercado nunca foi o problema"*. Verdade. Mas `DIMENSIONAMENTO` mostra a outra metade da conta:

| Churn | Teto (4 vendas/mês) | Tempo até 90% do teto |
|---|---|---|
| 20% (hoje) | 20 clientes | 10 meses |
| 6% | 67 clientes | **37 meses** |
| 4% | 100 clientes | **56 meses** |

**144 clientes com churn de 6% exigem ~8,6 vendas/mês só para repor as saídas** — e levam perto de cinco anos. *"A maior assessoria de moda do Brasil"* é projeto de prazo longo, e está tudo bem que seja. **O que não pode é planejar 2026 com a régua de 2031.**

## C6 — A janela de mídia de 8 dias não é executável, e a alternativa é melhor

A Jogada 1 do radar manda comprar audiência antes de 16/08. Mas em 19/07 havia **R$ 84 na conta de anúncio**, e o gestor de tráfego pagou R$ 500 da verba de uma cliente do próprio bolso em 11/06.

**Para os clientes, a jogada vale e é urgente** — é a verba deles, e realocar não custa nada.

**Para a Expansion, não há verba para comprar audiência própria.** E isso é uma boa notícia disfarçada: o canal certo para os 71 dias de eleição **não usa leilão nenhum**. É lista fria e outbound — que é exatamente o que o seu mercado de 6.500 lojas pede.

---
---

# PARTE IV — A MÁQUINA COMERCIAL

É a parte que não existe no acervo. Aqui está.

## 6. A lista: como transformar 6.480 lojas em nomes

Sem lista, todo o resto é improviso. A lista é o ativo comercial nº 1 da Expansion, ela é construível em duas semanas, e custa quase nada.

### Camada 1 — as fontes (nesta ordem)

| # | Fonte | O que dá | Custo |
|---|---|---|---|
| 1 | **Meta Ads Library** (pública) | Lojas de moda que **já anunciam** — tem verba e tem dor. Filtro por país + palavra + página | R$ 0 |
| 2 | **Econodata / CNAE 4781-4/00** filtrado por porte EPP | CNPJ, razão social, cidade, porte — a base do dimensionamento | baixo |
| 3 | **Google Maps por polo** | Goiânia · Brás e Bom Retiro · Fortaleza · Blumenau e Brusque · Caruaru e Toritama · Divinópolis · Cianorte · Nova Friburgo · + Alphaville/Barueri e Grande SP (seu raio de gravação) | R$ 0 |
| 4 | **Instagram** — quem segue fornecedor de atacado, software de gestão, maquininha, feira do setor | Lojista de verdade. **Quem segue "moda" é consumidora; quem segue fornecedor é lojista** | R$ 0 |

### Camada 2 — o enriquecimento que vira munição

Para cada loja da lista, quatro campos. **A skill `pre-call-pesquisa-desktop` já faz os quatro e está parada.**

| Campo | Como obter | Para que serve |
|---|---|---|
| Anuncia hoje? | Ads Library | Tem verba e já acredita no canal |
| Saúde do Google Meu Negócio | Health check da skill | Abre a conversa com um problema visível |
| Tamanho e movimento do Instagram | Perfil | Estimar porte |
| **Tempo de resposta no WhatsApp** | **Cliente oculto — mensagem real, hora anotada** | **É o pitch inteiro. Ver §8** |

### Camada 3 — a priorização

```
score = anuncia (×3)  ×  demora a responder (×3)  ×  porte na faixa (×2)  ×  polo no raio (×1)
```

Trabalhe as 200 primeiras. **Duzentas lojas é o que uma pessoa consegue tocar bem em um trimestre** — e 200 sobre 6.480 é 3% do mercado, mais do que os 2,2% que levam ao teto do Simples.

---

## 7. Os canais, na ordem de retorno real

| # | Canal | Retorno | Depende de leilão? | Quando |
|---|---|---|---|---|
| **1** | **Renovação e reprecificação da carteira** | **+R$ 11–16 mil/mês** | Não | **Agora — 3 semanas** |
| **2** | **Outbound por lista** (§6) | O motor de 2026 | **Não** | **Semana 2 em diante, sem parar** |
| **3** | **Indicação estruturada** | Alto, custo zero | Não | Semana 3 |
| **4** | **Eventos e produtora** | Médio, subaproveitado | Não | Próxima cobertura |
| **5** | Mídia paga própria | Médio | **Sim** | **Só a partir de 26/10** |
| **6** | Conteúdo (perfil pessoal) | Alto, lento | Não | 2027 |

### Canal 3 — indicação, o que você já usa sem saber

Toda a carteira veio de rede: Fogaça, Darlan, ecossistema Marçal. **É o seu canal comprovado, e ele opera 100% no acaso.** Estruturar custa uma tarde:

- Pedido formal em marco definido: **no dia 90 do contrato, junto do relatório trimestral**
- Recompensa declarada: **1 mensalidade quando a indicação assina** — nunca antes (`19` §4)
- Um material de uma página que o cliente consiga encaminhar sem escrever nada

### Canal 4 — eventos, o ativo que está sendo desperdiçado

Você cobre eventos: Fórum TEIA, EDN, Prime Day, OTI PRO, palestras. **Cada cobertura é uma sala cheia de empresários, e você sai de lá só com o cachê.** Nenhuma oferta pós-evento, nenhuma captura de lista, nenhum funil.

O conserto é trivial e vale para o **próximo** evento: uma oferta de campanha de reativação para os participantes, entregue no encerramento, com o material do evento como gancho.

**E um alerta que vem do seu próprio CSV:** existe uma proposta de evento de **R$ 12.000 para 10/08** (Prime/Trinca) com **custo direto desconhecido**. É o maior ticket da casa sem custeio. Custear antes de confirmar não é burocracia — é a diferença entre lucro e prejuízo no seu maior contrato de projeto.

---

## 8. O pitch, por produto

### EX1 — a arma que nenhum concorrente pode copiar

**Abertura (o cliente oculto, do §6 camada 2):**

> *"Antes dessa conversa eu mandei uma mensagem no WhatsApp da sua loja. Terça, 14h07, perguntando sobre uma peça. Você respondeu no dia seguinte às 9h20 — 19 horas depois.*
>
> *Não vim te vender conteúdo. Vim te fazer uma pergunta: quantas pessoas já compraram de você e estão paradas no seu WhatsApp hoje?"*

**Desenvolvimento:**

> *"Em média, 77% da base de uma loja não compra há mais de um ano. Se você tem 2.000 contatos, são 1.540 pessoas que já confiaram em você uma vez e sumiram.*
>
> *Eu faço a primeira campanha por minha conta. Se não gerar venda, você não paga o setup nem o primeiro mês."*

**Por que você pode oferecer isso e o concorrente não:**

| | |
|---|---:|
| Custo direto de uma campanha | **R$ 255** (6h, mídia zero) |
| LTV a 12 meses | R$ 21.600 |
| **A aposta** | **85× o risco** |

Nenhuma agência que vende conteúdo consegue oferecer risco reverso, porque a primeira entrega dela custa milhares. **Você arrisca R$ 255. Ela arriscaria R$ 5.000.**

E o efeito de segunda ordem vale mais que a venda: rodando a campanha você descobre o tamanho real da base, o ticket, a taxa de resposta e **se a lojista responde**. É **diagnóstico pago** — e depois dele você sabe exatamente qual produto vender e por quanto.

### EX2 — o pitch está na comparação, e ele ganha data em 01/10

> *"Uma vendedora te custa entre R$ 3.260 e R$ 4.410 por mês, carregada, e trabalha das 9h às 18h. Eu custo R$ 3.500 e cubro das 19h às 9h, mais domingo e feriado — o turno que ninguém cobre e onde a sua cliente está no celular."*

**E a partir de setembro, o argumento que muda tudo:**

> *"A partir de 1º de outubro o WhatsApp passa a cobrar por cada mensagem de serviço que você responde. Hoje você perde venda por não responder. Em outubro você vai receber uma fatura por responder mal."*

**Dor com fatura vende.** Quem chegar com a solução pronta em **setembro** vende. Quem chegar em dezembro está vendendo remédio para uma dor que o cliente já aprendeu a conviver.

### EX3 — sai do funil de aquisição

1.620 lojas não sustentam máquina de prospecção própria. **O EX3 é upsell de quem já é EX1 e já viu o placar**, e é âncora de marca. Nunca ponta de lança.

---

## 9. Roteamento: qual produto para qual lead

Três perguntas de qualificação, nesta ordem, **antes de falar preço** (`16` §8):

**1. "Quanto a loja fatura por mês?"**

| Faturamento | Oferecer | Universo |
|---|---|---:|
| até R$ 40k | **nutrir** — ou testar o EX1 leve (ver C2) | 2.520 |
| R$ 40–100k | **EX1** | 3.780 |
| R$ 100–140k | EX1 + EX2 | 1.080 |
| R$ 140–250k | EX3 | 1.080 |
| R$ 250k+ | 360 | 540 |

**2. "É loja de rua ou de shopping?"** — ocupação é 8–12% da receita na rua contra 15–22% em shopping. **Uma loja de R$ 75 mil em shopping pode ter lucro econômico zero**, e aí nenhum pacote cabe.

**3. "Quantos contatos você tem no WhatsApp?"** — abaixo de 800, o EX1 não tem matéria-prima.

**A skill `detalhamento-mql` faz o roteamento automático do CSV do Meta por faixa de faturamento. Está construída e parada.** Ligá-la custa zero.

### A trava inegociável

**Cada R$ 1 de mensalidade exige R$ 2,86 de venda nova**, porque a loja trabalha com ~35% de margem de contribuição.

| Produto | Mensalidade | Venda nova necessária | = crescimento de |
|---|---:|---:|---|
| EX1 | R$ 1.800 | R$ 5.143 | 5% a 13% |
| EX2 | R$ 3.500 | R$ 10.000 | até 10% |
| EX3 | R$ 5.500 | R$ 15.714 | até 11% |
| 360 | R$ 10.800 | R$ 30.857 | até 12% |

> **Se o Kauã não acredita que a loja chega nesse número, a venda não deve ser feita.** Ela cancela no mês 4, não paga o último, e vira detrator num mercado de 6.500 lojas onde todo mundo se conhece. Num mercado desse tamanho, **um detrator custa mais que um cliente vale**.

---

## 10. A trava de capacidade — a regra que impede repetir 2026

O histórico é inequívoco: com 9 contas ativas em julho houve 6 dias sem postar, uma semana sem postar na Prime, *"MUITO TEMPO"* sem postar no Dr. Fred, e o maior cliente quase cancelando. **O teto operacional real de contas tipo EX3 é 8–10, não 30.**

Mas o EX1 muda a conta, porque **não consome editor nem designer**:

| Produto | Consome | Folga hoje |
|---|---|---|
| EX3 | editor (169% ocupado) + designer + filmmaker + social + tráfego | **zero** |
| EX2 | operador de conversa (a contratar) | **zero — a cadeira não existe** |
| **EX1** | **social media + tráfego (24–30% ocupado)** | **~12 a 15 contas** |

> **Regra de trava, para escrever e afixar:**
>
> **1.** Nenhum EX3 novo enquanto o editor estiver acima de 100%.
> **2.** Nenhum EX2 vendido antes do teste de razão do operador (C3) e da tarifa da Meta (01/09).
> **3.** EX1 tem folga para **12 a 15 contas** — é onde o comercial vende.
> **4.** Zero slot livre = comercial não abre vaga nova, **independente de pipeline**.

Vender acima da capacidade não é crescimento. É contratar churn com antecedência — e o churn de 20% já é o teto que trava a empresa em 15 clientes.

---
---

# PARTE V — O CALENDÁRIO COMERCIAL

## 11. De 08/08 a 15/12

### Semana 1 — 08 a 15/08 · a semana da mídia barata e das renovações

| # | Ação | Dono | Por quê |
|---|---|---|---|
| 1 | **Realocar toda a verba de prospecção fria dos clientes para captação de lista** | Matheus | 7 dias antes do CPM eleitoral. Vale dinheiro real e só custa decidir |
| 2 | **Rodar a campanha de reativação da Clau Kids** | Débora + Matheus | Testa o EX1 abaixo do ICP (C2). É a tarefa de maior consequência estratégica |
| 3 | **Conversas 1, 2 e 3** (Albanos, Prime, Ciés) | Nicolas + Kauã | 62% da receita vence agora |
| 4 | **Custear a proposta de evento de R$ 12.000** antes de confirmar | Kauã | Maior ticket da casa sem custo conhecido |
| 5 | **Relatório semanal instalado** — toda segunda, todos, mesmo formato | Matheus | Sem ele não há renovação, nem case, nem preço |
| 6 | Cronometrar as horas reais: 6 / 20 / 39 | Débora, Adryel, Matheus | É a única coisa que derruba todo o plano de preços |

### Semanas 2–3 — 16 a 29/08 · construir a lista, fechar as renovações

- Lista de 200 lojas montada e enriquecida (§6)
- Conversas 4 a 7 (Dr. Fred, Jane, Clau, Reino) resolvidas
- Cliente oculto rodado nas 50 primeiras da lista
- Primeiras 20 abordagens com o pitch do §8
- **Mídia paga própria: desligada até 26/10**

### Setembro — a janela do EX2

- **01/09:** tarifa brasileira de mensagem publicada → recalcular EX1 e EX2, incluir cláusula de repasse
- Teste de razão do operador de conversa (C3) — duas contas, duas semanas, cronometradas
- Oferta do EX2 pronta e escrita **até 30/09**
- Outbound rodando: 50 abordagens/semana
- Meta: **2 EX1 novos**

### Outubro — vender o EX2 com a fatura na mão

- **01/10:** a cobrança começa. É o dia em que o pitch do EX2 deixa de ser argumento e vira conta
- Abordagem específica para a base: *"você vai começar a pagar por mensagem"*
- **26/10:** mídia paga volta. Retomar prospecção fria a tempo de aquecer para a Black Friday
- Meta: **2 EX1 + 1 EX2**

### Novembro e dezembro — a última janela do ano

- Black Friday (27/11) como gancho de campanha para toda a carteira EX1
- **Contratos de 12 meses, não de 6** — um contrato de 6 meses fechado agora vence em **fevereiro**, o pior mês do varejo, com a loja sem caixa e sem paciência. E o EX1 é **mais valioso** em janeiro e fevereiro, quando não entra ninguém na loja. Isso vende o 12 meses sozinho
- *"Prontidão 2027"* (CBS + split payment em 01/01) como entrada comercial em novembro
- Meta: **4 EX1 + 1 EX2**

### Onde isso chega

| | MRR |
|---|---:|
| Hoje | R$ 17.483 |
| Carteira renovada e reprecificada | **R$ 28.400 – 33.900** |
| + 8 EX1 novos até 15/12 | **+ R$ 14.400** |
| **Saída de 2026** | **R$ 42.800 – 48.300/mês** |

Contra os R$ 34 mil/mês que o `CONCATENACAO` projetava sem a reprecificação da carteira. **A diferença inteira está nas sete conversas de agosto** — não em vender mais.

---

## 12. O placar comercial

Semanal, cinco linhas, na mesma segunda em que sai o relatório de cliente:

| # | Indicador | Meta |
|---|---|---|
| 1 | **EX1 vendidos no mês** | 2/mês · ver §5 do `PRECO-MERCADO-ICP` — **nunca medir faturamento**, faturamento premia o EX3 |
| 2 | Lojas na lista com cliente oculto rodado | +50/semana até 200 |
| 3 | Abordagens → reuniões → propostas → fechados | conversão por etapa |
| 4 | **Concentração do maior grupo** (Albanos = 1 cliente) | **abaixo de 30%.** Acima disso, custo fixo congelado |
| 5 | **Slots de entrega livres** | zero slot = comercial fechado |

E o de trás, mensal: **churn medido, não estimado.** Entre 20% e 6% a receita de regime varia **7,5×**. É a alavanca financeira mais barata que existe, e hoje ninguém sabe o número real.

---
---

# PARTE VI — O QUE VOCÊ AINDA NÃO ESTÁ VENDO

Você pediu isso explicitamente. Onze pontos, em ordem de custo — sem repetir o que os seus documentos já dizem bem.

**1. A maior venda de agosto não é para um cliente novo. É para os sete que você já tem.** R$ 11–16 mil por mês estão parados em contratos vencendo, e o plano comercial do acervo inteiro fala de prospecção. (§5)

**2. O caso que vende o EX1 aconteceu fora do ICP do EX1.** Se isso se repetir na Clau Kids, o seu mercado é 7,7× maior do que o dimensionamento diz — e existe um produto a R$ 1.200 que ninguém no Brasil oferece. É a hipótese mais valiosa e mais barata de testar do acervo. (C2)

**3. O EX2 pode dar 37% ou −22% de lucro, e a diferença é um número que ninguém mediu.** Quantos clientes um operador de conversa carrega. Duas semanas de teste resolvem. Vender EX2 antes disso é apostar às cegas num produto de R$ 3.500. (C3)

**4. A partir de 01/10 o custo de mensagem entra na conta e não está em preço nenhum.** Pode derrubar o EX1 de 47,2% para ~29%. A tarifa sai em 01/09. **Nenhum contrato deve ser assinado sem cláusula de repasse.**

**5. O grupo de WhatsApp é trabalho invisível que já está sendo entregue de graça.** 30 min/dia derrubam o EX3 de 31,3% para 23,5%, e o piso correto vira R$ 6.635. Quem responde o grupo às 23h hoje é você — e isso não está em folha nenhuma. Ou vira SLA, ou vira preço.

**6. A antecipação do Albanos custou 295% ao ano.** R$ 16.000 antecipados por 1,5 mês custaram R$ 3.000 entre desconto e taxa. Isso não é desconto comercial — é empréstimo caríssimo disfarçado. E os meses 2 e 3 do contrato têm **custo integral com caixa zero**, o que explica o aperto de agosto antes de qualquer outra coisa.

**7. Um grupo controla 51,7% da receita.** Não 40%, como eu estimei na rodada 1 — 51,7%, e está no seu CSV. Dois telefonemas ruins e a empresa perde metade da receita numa semana. Enquanto isso, **nenhum custo fixo novo pode ser assinado.**

**8. Seu gargalo migra quando o mix muda, e o novo gargalo é a única pessoa cuja capacidade nunca foi medida.** Editor e designer são gargalos do EX3. Com 60% EX1, o gargalo vira a Débora — e o campo dela no seu CSV diz `NÃO INFORMADO`. (C4)

**9. Você tem quatro skills prontas que cobrem o funil comercial inteiro — qualificação, pesquisa de lead, cliente oculto, análise de onboarding — e opera no improviso.** O problema nunca foi falta de ferramenta. É que nada tem dono nomeado. O conselho de 13/07 já tinha diagnosticado isso para a entrega; vale igual para o comercial.

**10. Seu posicionamento pessoal não vende a sua empresa.** A promessa é *"o maior ecossistema de multiplicação de talentos e gestão do Brasil"*, o público é *"dono de empresa cansado de fórmula mágica"*, o foco declarado é **consultoria**, e o Gabriel **proibiu a palavra "marketing"**. Isso não atrai lojista de moda. São dois funis, e o dos 30 reacts é o motor de 2027 — não o de agosto. (Rodada 1, §12)

**11. Num mercado de 6.500 lojas, um cliente mal vendido custa mais do que um cliente bem vendido rende.** Todo mundo se conhece, os polos são pequenos, as donas conversam. A trava de qualificação do §9 não é conservadorismo — é proteção de reputação num mercado onde reputação é o único ativo que não se compra.

---

## 13. As seis decisões que só você toma

| # | Decisão | Bloqueia | Prazo |
|---|---|---|---|
| 1 | **Abrir o CNPJ e definir o regime** (A-006) | **Todo preço segue `NÃO APROVADO`.** E cliente grande exige NF | imediato |
| 2 | **EX3: sobe para R$ 6.600 ou o grupo vira SLA?** (A-027) | O Kauã está vendendo a 31,3% um produto que entrega 23,5% | esta semana |
| 3 | **ICP conservador ou largo?** (C1/C2) | Define a lista, o pitch e se Ciés e Clau são clientes ou não | após o teste da Clau |
| 4 | **Vender EX2 antes ou depois do teste de razão?** (C3) | Se for antes, é aposta em produto de R$ 3.500 | até 30/09 |
| 5 | **Dr. Fred e Jane: reprecificar ou encerrar?** | Consomem editor que já está a 169% e dão prejuízo | até 15/08 |
| 6 | **Quem é o dono da lista e do outbound?** | Sem dono nomeado, o canal 2 não existe — e ele é o motor de 2026 | esta semana |

---

## 14. Se você fizer só três coisas nos próximos sete dias

1. **As três conversas de renovação** — Albanos, Prime, Ciés. É R$ 11–16 mil/mês em jogo e o prazo é agosto.
2. **A campanha de reativação da Clau Kids.** Custa 6 horas e pode multiplicar o seu mercado por 7,7.
3. **O relatório semanal, toda segunda, sem exceção.** É o que torna as renovações possíveis, o que produz o case que fecha o próximo cliente, e o que quase custou a Prime por não existir.

Nenhuma das três precisa de dinheiro, de contratação ou de ferramenta nova.

---

*Produzido em 08/08/2026 sobre o projeto EXPANSION COMPANY completo: `business-model/` (24 documentos + 6 CSVs, branch `claude/new-session-nx502g`), estudo de mercado (5 documentos, branch `claude/moda-feminina-tendencias-br-agas87`), o 360 e a operação real. Preços e margens são dos documentos originais e seguem `NÃO APROVADO`. As contradições da Parte III são leitura minha do conjunto e estão abertas a correção — cada uma cita a fonte dos dois lados.*
