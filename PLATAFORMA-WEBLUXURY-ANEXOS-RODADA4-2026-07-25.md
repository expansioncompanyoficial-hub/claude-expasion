# PLATAFORMA WEBLUXURY — ANEXOS DA RODADA 4
**Sessão de 25 de julho de 2026 · portal ou operadora**

Parecer consolidado: `PLATAFORMA-WEBLUXURY-PARECER-RODADA4-2026-07-25.md`

---

# PARTE I — DIGEST DE PESQUISA

> **Nota de método**: dado bruto, sem recomendação. Todos os números trazem fonte. Onde a fonte é secundária (agregador de FDD, blog de concorrente, portal), está marcado `[secundária]`. Onde não há número oficial, há faixa marcada `[estimativa]`. Divergências entre fontes foram mantidas explícitas, não conciliadas. Data de corte: 25/07/2026.

---

# BLOCO 1 — OPENTABLE

## 1.1 Modelo de cobrança atual (2026)

Cobra **os dois**: assinatura mensal + fee por capa (cover) servida.

| Plano | Assinatura/mês | Fee por capa via rede OpenTable | Fee por capa via site do restaurante |
|---|---|---|---|
| Basic | US$ 149 | US$ 1,50 | US$ 0,25/capa **ou** US$ 49/mês fixo |
| Core | US$ 299 | US$ 1,00 | incluído |
| Pro | US$ 499 | US$ 1,00 | incluído |

Outras linhas de cobrança:
- **Taxa de serviço de 2%** sobre transações (depósitos, experiências pré-pagas, multas de no-show) — implementada em **janeiro de 2026**. Fonte separada cita 2% também sobre pedidos de takeout nos planos Basic e Core.
- **Premium SMS**: US$ 19/mês (add-on no Core; incluso no Pro).
- **Contrato**: 12 meses com renovação automática; Basic tem janela de cancelamento de 30 dias e trial de 30 dias; Core e Pro não têm trial.
- Onboarding incluso; customização de planta baixa alonga a implantação.

Fontes: https://restaurant.eatapp.co/blog/opentable-pricing · https://tablelink.app/blog/opentable-fees-explained · https://tekpon.com/software/opentable/pricing/ `[secundárias — OpenTable não publica tabela oficial completa]`

**Aritmética do custo total** (a métrica que a crítica usa): restaurante com 1.500 capas de rede/mês paga **US$ 1.500 a US$ 2.250/mês só em cover fees**, antes da assinatura — o variável excede o fixo por larga margem. Fonte: https://restaurant.eatapp.co/blog/opentable-pricing

## 1.2 A solução do cold start — o ERB (Electronic Reservation Book)

Este é o núcleo factual do bloco.

- Fundação: **1998**, por Chuck Templeton, após a esposa gastar ~3 horas tentando conseguir uma reserva em San Francisco.
- **Barreira física real**: a maioria dos restaurantes na época **não tinha internet nem tomada elétrica no host stand** (a mesa de recepção). Não era um problema de software — era de infraestrutura.
- **A jogada**: a OpenTable instalava fisicamente o Electronic Reservation Book no host stand — **passando cabos por paredes e porões** do restaurante.
- **Preço cobrado vs. custo real**: **US$ 500 de taxa de instalação cobrada do restaurante**, sendo que a instalação **custava frequentemente US$ 5.000 para a OpenTable**. Ou seja, subsídio de ~10x por ponto instalado.
- **Mensalidade original**: **US$ 199/mês**.
- **Fee por reserva original**: **US$ 1,00** por reserva vinda da plataforma OpenTable e **US$ 0,25** por reserva vinda do site do próprio restaurante. (Nota: essa estrutura de duas camadas sobrevive intacta até 2026 — só o preço subiu.)
- **Queima de caixa na fase de conquista**: **US$ 1,5 milhão por mês**.
- **Resultado da rede** (efeito de rede indireto): de **1.600 restaurantes / 2 milhões de comensais em 2003** para **7.400 restaurantes / 25 milhões de comensais em 2007**.

Fonte: https://aiinstitute.hbs.edu/platform-digit/submission/open-but-not-free-opentables-monopoly-of-reservations/ (Harvard Business School — Digital Innovation and Transformation; URL antiga d3.harvard.edu redireciona para aiinstitute.hbs.edu)

**Mecânica que isso destrava** — o ponto que interessa à analogia: ao instalar o ERB, a OpenTable não pediu ao restaurante que *cedesse* inventário; ela **substituiu o livro de reservas de papel pelo sistema operacional do salão**. O inventário em tempo real virou subproduto de uma ferramenta que o restaurante usava para trabalhar, não uma concessão negociada. O ERB era ferramenta de gestão primeiro, canal de distribuição depois.

**Lock-in**: a mesma fonte da HBS registra que a taxa de US$ 500 de hardware "criou uma barreira significativa de troca de plataforma, travando os restaurantes no modelo de assinatura mensal da OpenTable" — e barreira de entrada para concorrentes.

## 1.3 Aquisição pela Priceline (2014)

- **Preço: US$ 103,00 por ação, em dinheiro (all-cash), valor total de US$ 2,6 bilhões.**
- **Anúncio: 13 de junho de 2014.**
- **Conclusão da oferta pública (tender offer): 24 de julho de 2014.**
- Escala da OpenTable na data: **mais de 31.000 restaurantes**, **mais de 15 milhões de comensais sentados por mês**.
- Racional declarado: extensão natural do Priceline para serviços de marketing de restaurantes + aceleração da expansão internacional da OpenTable.

Fontes: https://www.sec.gov/Archives/edgar/data/0001075531/000110465914045812/a14-15395_1ex99d1.htm (8-K Priceline) · https://www.prnewswire.com/news-releases/the-priceline-group-successfully-completes-opentable-tender-offer-268419882.html · https://techcrunch.com/2014/06/13/priceline-buying-opentable-for-2-6-billion/ · https://skift.com/2014/06/13/priceline-group-to-acquire-opentable-for-2-6-billion/

## 1.4 O que aconteceu depois — dois write-downs

| Data | Baixa contábil | Contexto |
|---|---|---|
| **Nov/2016 (Q3 2016)** | **US$ 941 milhões** de impairment sobre a OpenTable | ~36% do preço de compra baixado em ~2 anos. Fonte: https://skift.com/2016/11/07/priceline-takes-941-million-writedown-on-opentable/ `[headline verificada; corpo do artigo retornou HTTP 403 na coleta]` |
| **30/09/2020** | **US$ 573 milhões** de goodwill impairment na unidade **OpenTable + KAYAK** | Deixou o goodwill remanescente da unidade em **US$ 1,0 bilhão**. Causa declarada: redução relevante do fluxo de caixa projetado, recuperação até níveis de lucratividade de 2019 empurrada para prazo mais longo por causa da COVID-19, e **"perspectiva reduzida para oportunidades de monetização em serviços de reserva de restaurantes"**. Metodologia: fluxo de caixa descontado + múltiplos de comparáveis. Fonte: 10-K Booking Holdings — https://www.sec.gov/Archives/edgar/data/1075531/000107553122000008/bkng-20211231.htm |

**Escala atual (2025/2026)**: OpenTable declara atender **mais de 65.000 restaurantes** no mundo e preencher **1,9 bilhão de assentos por ano**. Fonte: https://www.bookingholdings.com/brands/opentable/

## 1.5 Críticas ao modelo e desintermediação

**Crítica histórica (a mais antiga e a mais dura, registrada pela HBS)**: donos de restaurante se sentiam **pressionados a participar sem evidência clara de que a OpenTable aumentava o total de reservas** em vez de apenas **canibalizar reservas que já viriam** — ou seja, pagar US$ 1,00–1,50 por capa por um cliente que ligaria de qualquer forma. Fonte: https://aiinstitute.hbs.edu/platform-digit/submission/open-but-not-free-opentables-monopoly-of-reservations/

**Custo por capa como item de despesa**: "as cover fees de rede podem silenciosamente somar mais que o aluguel, e a maioria dos operadores não percebe quanto está pagando até rodar os números". Fonte: https://bitebuddy.ai/blog/opentable-alternative `[secundária — publicação de concorrente, viés declarado]`

**Movimento competitivo e desintermediação (números)**:
- **Amex comprou o Tock por US$ 400 milhões em 2024** — consolidando **Resy e Tock sob o mesmo dono**.
- **DoorDash comprou a SevenRooms por US$ 1,2 bilhão em 2025**.
- **Market share da OpenTable nos EUA caiu de 51% para 46% entre 2022 e 2024** — mas ainda lidera em **13 dos 15 maiores mercados americanos**.
- **Contra-ataque**: em 2024 a OpenTable fechou **parceria com a Visa**, pagando a certos restaurantes para reservar mesas a portadores Visa Infinite — cópia direta do benefício Amex/Resy.
- **Fluxo reverso documentado**: entre 2023–2024 restaurantes de prestígio em Nova York (Estela, Altro Paradiso, Win Son) **voltaram do Resy para a OpenTable** — a migração não é unidirecional.
- **Google**: não opera reserva própria; conecta-se a um conjunto restrito de parceiros aprovados (Resy, Tock e outros) que executam o fluxo de booking. Ou seja, o Google desintermedeia a **descoberta**, não o **inventário**.

Fontes: https://www.bistrochat.com/foodforthought/en/posts/usa-restaurant-reservation-systems-market-data.html · https://restaurant.eatapp.co/blog/opentable-vs-resy · https://bitebuddy.ai/blog/opentable-alternative

---

# BLOCO 2 — REDES COM GESTOR/REPRESENTANTE REGIONAL EM CORRETAGEM DE ALTO VALOR

## 2.1 Comparativo de custo de abrir uma praça (imobiliária de luxo, dados de FDD)

| | **Christie's International Real Estate** | **Sotheby's International Realty** | **Engel & Völkers** |
|---|---|---|---|
| **Taxa inicial de franquia** | **US$ 35.000** (FDD 2026). Outras fontes reportam **US$ 43.000–50.000** — divergência não conciliada entre filings | **US$ 25.000** (1º escritório) · **US$ 12.500** (2º branch) · **US$ 7.500** (cada branch adicional) | **até US$ 35.000** |
| **Investimento inicial total (Item 7)** | **US$ 64.475 – 443.125** | **US$ 128.000 – 512.000** (start-up); **US$ 46.150 – 324.850** (conversão de imobiliária existente) | Faixas divergem por fonte: **US$ 93.050–433.230**, **US$ 177.000–424.000**, **US$ 91.690–288.592** |
| **Royalty** | **3% a 6% da receita bruta mensal** | **6% sobre gross commission income** | **6%** |
| **Fundo de marketing** | não divulgado no FDD extraído | **2%** (nacional + regional) | **2% ad royalty** sobre receita bruta mensal |
| **Prazo** | 10 anos | 10 anos | 10 anos + renovação por mais 10 |
| **Capital líquido exigido** | não divulgado | **US$ 250.000** líquidos + **US$ 1 milhão** de patrimônio | **US$ 200.000** líquidos |
| **Escala da rede** | +400 escritórios, ~10.000 agentes, ~50 países. Marca comprada pela @properties em 2021, sede em Chicago | — | — |

Fontes: https://vetmyfranchise.com/franchise/christies-international-real-estate-llc/financials · https://www.vettedbiz.com/franchises/christies-international-real-estate · https://sharpsheets.io/blog/sothebys-international-realty-franchise-fdd-profits-costs/ · https://thefranchisemall.com/franchises/details/18228-0-sothebys_international_realty.htm · https://www.franchisegator.com/franchises/engel-v-lkers/ · https://www.franchisegrade.com/franchises/engel-volkers `[todas secundárias — agregadores de FDD; FDD original deve ser requisitado ao franqueador]`

**Padrão que emerge dos três**: taxa de entrada baixa (US$ 25–50 mil, ~10% do investimento total), royalty alto e recorrente sobre **receita de comissão** (6% + 2% marketing = **8% do faturamento bruto de comissão**), prazo de 10 anos, e a maior parte do capital indo para **estrutura local, não para a marca**.

## 2.2 Master franchise vs. area developer — estrutura e remuneração

**Diferença estrutural**:
- **Master franchise**: o master vira **sub-franqueador** — recruta, vende, treina e dá suporte a sub-franqueados no território. Ele opera a rede.
- **Area developer**: compromete-se a **abrir e operar ele mesmo** N unidades num cronograma. Não sub-franqueia.

**Remuneração do gestor regional / master franqueado**:
- **Split de royalty padrão: de 50/50 a 75/25 a favor do master franqueado.**
- A fonte é explícita sobre onde isso quebra: "a estrutura de fee contínua num master franchise agreement é onde a maioria dos acordos ou constrói alinhamento de longo prazo ou o corrói lentamente" — **o alinhamento depende de o split refletir a responsabilidade real assumida**, não de o percentual ser generoso.

Fontes: https://www.fmsfranchise.com/master-franchise-guide-how-to-structure-price-and-scale/ · https://lopeslawllc.com/master-franchisor-vs-area-developer/ · https://franzy.com/blog/master-franchise-vs-area-developer/

## 2.3 O que dá errado nesses modelos (lista de falhas documentadas)

1. **Modelo econômico não modelado antes de assinar** — "ambas as partes frequentemente falham em modelar a lucratividade explicitamente antes da assinatura, o que leva a parceiros frustrados queimando caixa esperando a densidade do território se formar nos primeiros anos". **É o mesmo problema do cold start, transferido para o parceiro regional.**
2. **Falha no cronograma de desenvolvimento** — descumprir o development schedule pode causar **rescisão do contrato ou perda da exclusividade territorial**. Outros gatilhos de rescisão: quebra de padrões de marca, insolvência financeira, violação de não-concorrência.
3. **Perda de controle de marca** — o master precisa de autonomia para funcionar, o que faz o controle da marca e da reputação "escorregar"; **inconsistências de padrão são muito mais difíceis de corrigir quando o franqueador não tem relação direta com os sub-franqueados**.
4. **Disputa de split de royalty** — ver 2.2.
5. **Lacuna de infraestrutura** — "o trabalho mais difícil é construir a infraestrutura que torna o master franqueado capaz de funcionar como sub-franqueador". Vender a praça é fácil; capacitá-la é o custo escondido.

Fontes: https://www.fmsfranchise.com/master-franchise-guide-how-to-structure-price-and-scale/ · https://lopeslawllc.com/master-franchise-vs-area-development-deals/ · https://franchisespecialists.com/articles/master-franchisee/ · https://lusthausfranchiselaw.com/blog/negotiating-master-franchise-agreements/

## 2.4 Redes de brokers de yacht e aeronave (modelo alternativo: associação, não franquia)

**Yacht**:
- Comissão típica: **10% do preço de venda da embarcação**, dividida entre o **central agent (agente listador)** e o broker do comprador em regime de **co-brokerage**.
- **Não há regulação estatal** como na corretagem imobiliária residencial — o setor é **autorregulado por associações voluntárias**: **IYBA** (International Yacht Brokers Association, fundada em 1987) e **MYBA** (The Worldwide Yachting Association, fundada em 1984).
- A **MYBA publica seu próprio Central Agency Agreement padrão**, descrito como "razoavelmente justo, ainda que um tanto simplista". Existem **Joint Central Agency Agreements** com múltiplos agentes dividindo marketing e comissão.

Fontes: https://blog.yatco.com/yacht-broker-agent-fees-explained/ · https://iyba.org/ · https://www.theownersclub.org/handbook/buying/the-brokers-role · https://en.wikipedia.org/wiki/Yacht_broker

**Aeronave**:
- Comissão em **escala decrescente por valor**: de **~10% em aeronaves de menor valor** até **1%–4% em jatos multimilionários**. Faixa geral citada: **1% a 10%**. Detalhe: pistão monomotor ~6–10%; jato de vários milhões ~1–3%; jatos caros ~4%.
- Estruturas alternativas: **fee fixo** (comum em buyer's agent / acquisition agreements de jatos de alto valor, onde percentual "explodiria fora de proporção ao trabalho"), e **híbrido** — retainer pequeno adiantado + success fee menor no fechamento.
- Sinal de padrão profissional: filiação à **IADA** (International Aircraft Dealers Association).

Fontes: https://www.iabi.aero/blog/how-aircraft-brokers-make-money-commissions-explained · https://www.bjtonline.com/business-jet-news/hiring-an-aircraft-broker · https://www.premieraircraftbrokerage.com/post/understanding-aircraft-brokerage-fees

**Contraste estrutural relevante**: em yacht e aeronave **não existe modelo de franquia com taxa de entrada e royalty** — a rede é uma **associação com contrato padronizado (central agency) e regra de split de comissão**. O custo de "abrir praça" é a anuidade da associação, não US$ 100–500 mil de investimento inicial.

---

# BLOCO 3 — ESCROW E GARANTIA EM MARKETPLACES DE LUXO

## 3.1 Chrono24 (relógios)

**Escrow / Buyer Protection** (o serviço antes se chamava **Trusted Checkout**; hoje é "Chrono24 Buyer Protection"):
- **Custo para o comprador: gratuito.** "A Chrono24 fornece o Escrow Service gratuitamente"; a Buyer Protection gratuita inclui pagamento via Escrow Service.
- **Quem opera**: a própria **Chrono24**, em **conta escrow própria** ("Chrono24's escrow account"). A comissão do vendedor é **retida automaticamente no momento do payout a partir da conta escrow da Chrono24**. `[Não foi possível confirmar em fonte primária se a Chrono24 GmbH detém licença de instituição de pagamento própria ou opera via parceiro bancário — página institucional e FAQ retornaram HTTP 403 na coleta. Marcar como lacuna.]`
- **Mecânica**: comprador transfere o valor para a conta escrow da Chrono24 → vendedor envia o relógio → comprador inspeciona → só então a Chrono24 libera o payout ao vendedor.
- **Prazos de retenção**: **14 dias** após o recebimento se a compra foi de **dealer profissional**; **7 dias** se de **vendedor particular**.
- Direito de arrependimento: devolução ao dealer em **14 dias** do recebimento, sem justificativa. Envio segurado integralmente, inclusive internacional.

**Quem paga a conta**: o **vendedor**, via comissão.
- **Vendedor particular: 6,5%** de comissão, devida apenas após a venda concluída.
- **Dealer profissional: 2% a 8%** — percentual varia conforme o preço de venda. `[secundária — Relleb; Chrono24 não publica a tabela; há calculadora de receita no portal do vendedor]`
- **Assinatura de dealer (Professional Package, cobrança mensal)**: até 25 relógios **€199/mês** · até 50 **€369/mês** · até 100 **€629/mês** · até 500 **€1.549/mês** · até 1.000 **€2.199/mês**. Upscale automático se o estoque exceder o pacote em 10% por dois meses seguidos; downscale automático no caso inverso.
- **Programa "Certified by Chrono24"** (autenticação por relojoeiros internos + certificado digital de autenticidade): **US$ 249** adicionais, cobrindo envio segurado e certificação. Preço anterior citado: **€199 (~US$ 216)**.

Fontes: https://www.chrono24.com/about-us.htm · https://update.chrono24.com/new-price-structure/ · https://www.relleb.com/post/chrono24-fees · https://about.chrono24.com/en/press/chrono24-debuts-new-certified-program-providing-transparency-and-an-authenticity-guarantee-to-the-worlds-largest-selection-of-pre-owned-watches · https://nationaljeweler.com/articles/12801-chrono24-debuts-pre-owned-watch-authentication-program

## 3.2 1stDibs (design, arte, joia, mobiliário)

- **Modelo de dois eixos**: o vendedor **escolhe** entre plano com **assinatura mensal baixa + comissão por venda alta** ou **assinatura alta + comissão baixa**. As taxas exatas fazem parte do acordo individual do vendedor e **não são publicadas**.
- Faixa reportada: **15% de comissão + 3% de taxa de transação**, com variação reportada de **15% a 30%+** conforme valor do item e acordo do vendedor. `[secundária — 1stDibs não divulga tabela; página oficial de suporte retornou HTTP 403 na coleta]`
- **Buyer Protection**: cobertura para qualquer disputa em compras feitas **através do checkout do 1stDibs** (ou seja, a proteção é condicionada a transacionar dentro da plataforma — o mecanismo antidesintermediação). Para o programa Trade: frete com seguro integral + garantia exclusiva de devolução, **sem custo adicional**.

Fontes: https://support.1stdibs.com/hc/en-us/articles/17416136155291-What-Is-the-Monthly-Fee-for-1stDibs · https://www.1stdibs.com/info/trade/trade-price-guarantee/ · https://www.topbubbleindex.com/blog/ultimate-guide-selling-1stdibs/

## 3.3 The RealReal (consignação de luxo)

Não é escrow — é **consignação com take rate**. O RealReal toma posse física, autentica e vende; o consignante recebe percentual.

**Percentual que fica com o consignante (tiers de comissão)**:

| Categoria | Faixa de preço | % ao vendedor |
|---|---|---|
| Bolsas | acima de US$ 7.500 | até **80%** |
| Bolsas | US$ 1.500 – 4.999 | **70%** |
| Relógios | acima de US$ 7.500 | até **85%** |
| Relógios | US$ 5.000 – 7.499 | **80%** |
| Joia fina de marca | acima de US$ 750 | **70%** |
| Roupa/calçado/acessório | abaixo de US$ 100 | **20%** |
| Roupa/calçado/acessório | US$ 150 – 199 | **45%** |
| Roupa/calçado/acessório | acima de US$ 5.000 | **70%** |

**Bônus de fidelidade** (só para itens acima de US$ 200): Trendsetter (<US$ 1.499) 0% · Influencer (US$ 1.500–4.999) **+1%** · Tastemaker (US$ 5.000–9.999) **+2%** · VIP (US$ 10.000+) **+5%**.

**Taxas**: sem taxa adiantada de consignação · **Early Return Fee** US$ 20 (item padrão) ou US$ 100 (arte/volumoso) + frete, dentro da janela de 365 dias · **pagamento por cheque US$ 12,50**. Pagamento no dia 15 do mês seguinte à venda.

**Take rate médio da plataforma em 2025: 35% a 40%.**

Fontes: https://www.topbubbleindex.com/blog/the-realreal-fees/ · https://closo.co/blogs/blog/the-realreal-consignment-2

**Leitura estrutural dos três**: o *free escrow* do Chrono24 é subsidiado pela comissão do vendedor + assinatura do dealer (mesma estrutura de duas pernas da OpenTable: fixo + variável). O 1stDibs vincula a proteção ao checkout próprio. O RealReal elimina o problema de confiança tomando posse do bem — e cobra 60–65% mais caro por isso em take rate.

## 3.4 BRASIL — provedores de escrow/conta-garantia

### 3.4.1 Conta Notarial (Escrow Notarial) — a via com preço público e tabelado

Único mecanismo brasileiro de escrow com **tabela de custo publicada**.

**Base legal**:
- **Lei 14.711/2023** (Marco Legal das Garantias), sancionada em **30 de outubro de 2023** — autorizou tabeliães de notas a prestar serviço de administração de conta escrow vinculada a atos notariais ou instrumentos particulares.
- **Provimento CNJ nº 197, de 13 de junho de 2025** — regulamenta depósito, administração e movimentação de valores pelo tabelião, sob a denominação **"Escrow Notarial" / "Conta Notarial Vinculada"**.

**Quem opera**: **Banco Safra S.A.** em convênio com o **CNB-CF (Colégio Notarial do Brasil – Conselho Federal)**, convênio firmado em **2024**. O tabelião gerencia a transação; o banco custodia e transfere.

**Segregação patrimonial** (o ponto de segurança): os valores ficam **em nome do CNB**, não em nome das partes nem do tabelião.

**Tabela de custo — vigente a partir de 1º de abril de 2026**:

| Valor da operação | Custo |
|---|---|
| até R$ 99.999,99 | **mínimo R$ 500** |
| R$ 100.000 – 299.999,99 | **0,45%** |
| R$ 300.000 – 499.999,99 | **0,35%** |
| R$ 500.000+ | percentual decrescente |
| ≥ R$ 6.000.000 | **0,13%** |

**Rateio do valor cobrado**: **Cartório 59% · CNB-CF 1% · Safra 40%.**

**Prazo máximo de retenção**: **180 dias**, prorrogável por mais **30 dias** mediante justificativa, não excedendo o período inicial.

**Casos de uso previstos**: transferências de curto prazo em transações de **compra e venda de imóveis e veículos**.

Fontes: https://suporte.notariado.org.br/support/solutions/articles/43000735084-conta-notarial-escrow-account-esclarecimentos-gerais · https://cnbsp.org.br/2025/10/08/artigo-provimento-no-197-do-cnj-a-regulamentacao-da-escrow-notarial-por-olivar-vitale/ · https://mundonotarial.org/blog/?p=8598 · https://anoregrs.org.br/2025/08/04/anoreg-rs-repercute-provimento-do-cnj-que-institui-conta-notarial-em-todo-o-brasil-para-maior-seguranca-em-negocios-juridicos/ · https://www.migalhas.com.br/depeso/440569/conta-escrow-notarial-o-novo-instrumento-de-garantia-do-direito

**Crítica já publicada ao instrumento**: a ConJur publicou análise intitulada sobre "quatro problemas práticos da conta notarial" — o instrumento é reconhecido como avanço, mas com pontos a melhorar. Fonte: https://www.conjur.com.br/2025-jul-11/quatro-problemas-praticos-da-conta-notarial/

### 3.4.2 Conta escrow bancária / fintech (via instituições autorizadas pelo BC)

**Regra base**: no Brasil, o agente de escrow deve ser **instituição financeira autorizada pelo Banco Central** — bancos, SCDs e demais entidades habilitadas a custodiar recursos.

**Provedores identificados**:
- **Bancos tradicionais**: Itaú, Santander, Banco do Brasil (estruturas de custo variadas, não públicas).
- **QI Tech** — oferece conta escrow, emissão de debêntures/CCB, boletos, análise de crédito, tração de recebíveis; infraestrutura "as a service"; em processo de obtenção de DTVM.
- **Celcoin** — produto dedicado de conta escrow (escrow.celcoin.com.br); entrou em Credit as a Service após adquirir a Flow Finance; oferece CCB, conta escrow, gestão de carteira e cobrança, notas comerciais.
- **Grafeno** — foco em FIDCs, securitizadoras e médias empresas; CCB, notas comerciais e escrow em ecossistema 100% digital; superou **R$ 100 bilhões em transações**.
- **Vórtx** — atuante em serviços fiduciários e distribuição de valores mobiliários.

**Faixa de custo**: **os provedores não publicam preço.** A estrutura de cobrança padrão declarada é **taxa de abertura + taxa de manutenção (mensal) + taxa de liberação/movimentação**, variando conforme instituição, montante e duração da operação. "Bancos tradicionais e cartórios fixam cobranças específicas; fintechs podem oferecer taxas mais competitivas."

`[ESTIMATIVA / LACUNA — não há preço público. O único benchmark ancorado é a tabela notarial: 0,13% a 0,45% do valor da operação, piso R$ 500. Fintechs se posicionam abaixo de banco e cartório, mas sem número divulgado. Qualquer faixa além dessa exigiria cotação direta.]`

Fontes: https://pulse.celcoin.com.br/definicao-clara-o-que-e-uma-conta-escrow-e-como-funciona/ · https://escrow.celcoin.com.br/ · https://qitech.blog/conta-escrow/ · https://grafeno.digital/blog/conta-escrow-entenda-o-custo-e-os-beneficios-para-operacoes-seguras/ · https://finsidersbrasil.com.br/reportagem-exclusiva-fintechs/qi-tech-quer-ser-a-aws-do-credito-e-prepara-novas-aquisicoes/ · https://finsidersbrasil.com.br/reportagem-exclusiva-fintechs/grafeno-supera-r-100-bi-em-transacoes-reforca-c-level-e-mira-novos-mercados/ · https://www.vortx.com.br/quem-somos/grupo-vortx

### 3.4.3 Alternativa mais barata: split de pagamento com retenção (não é escrow formal)

Usado por marketplaces brasileiros; divide automaticamente o recebível entre partes por regra (percentual ou valor fixo) e **pode incluir retenção de taxas e comissões**.

**Provedores mais usados para split no Brasil**: **Pagar.me, Iugu e Zoop**. Também: Asaas.

**Único preço público encontrado — Iugu**: **Pix 0,99%** · **cartão 4,99%** · **boleto R$ 1,99**.

Fontes: https://www.iugu.com/split-pagamentos · https://www.socialhub.pro/blog/cobranca-whatsapp-iugu-pix-recebimento-split-marketplace-pme-2026/ · https://mindconsulting.com.br/2026/03/como-funciona-split-pagamento-marketplace/ · https://www.zoop.com.br/blog/pagamento/como-funciona-o-split-de-pagamentos · https://blog.asaas.com/split-de-pagamento/

---

# BLOCO 4 — PERMUTA E TRADE-IN EM IMÓVEIS DE ALTO PADRÃO NO BRASIL

## 4.1 O dado quantitativo central

**18% das transações de imóveis de luxo em São Paulo incluíram permuta em 2024**, com **expectativa de chegar a 22% em 2025**. Atribuído à **CBIC (Câmara Brasileira da Indústria da Construção)**.

Fonte: https://revistacapitaleconomico.com.br/mercado-imobiliario/estrategias-inovadoras-mercado-luxo/ `[secundária — a Revista Capital Econômico atribui o dado à CBIC; a publicação original da CBIC não foi localizada na coleta. Verificar antes de usar em material externo.]`

**Contexto macro que a mesma fonte fornece**:
- **Selic ~11% a.a.** citada como razão da restrição ao crédito imobiliário tradicional.
- **Queda de 4% nas vendas de imóveis de luxo em 2024** (atribuído à Abrainc).
- **Financiamento direto e permuta são apontados como os mecanismos que sustentaram o mercado** apesar da queda.
- Valorização m² São Paulo: **+6%** em 2024 · Litoral paulista **+7,5%** em 2024 com projeção **+10%** em 2025.
- Mercado de luxo São Paulo e região: **R$ 29 bilhões em 2024**, previsão **+9% em 2025**.
- Bairros onde a prática se concentra: **Jardins, Itaim Bibi, Alphaville** e litoral paulista — "locais onde o valor por m² é alto".

## 4.2 Tamanho do mercado de luxo BR (2025)

- **VGV lançado de residencial luxo e superluxo: R$ 37,1 bilhões em 2025 — alta de mais de 120%** sobre o ano anterior.
- **VGV vendido: R$ 34,3 bilhões — alta de quase 90%.**
- O mercado "mais que dobrou de tamanho em 2025".

Fonte: https://forbes.com.br/escolhas-do-editor/2025/12/o-novo-mapa-do-luxo-imobiliario-no-brasil-em-2025/

## 4.3 Base legal da permuta

- **Artigo 533 do Código Civil brasileiro.** Contratos de permuta seguem as **mesmas regras de compra e venda**, mudando apenas a forma de pagamento. Totalmente permitida e regulamentada.

Fontes: https://tecimob.com.br/blog/permuta-de-imoveis-tudo-que-voce-precisa-saber/ · https://sienge.com.br/blog/o-que-e-permuta-e-quais-os-principais-cuidados/ · https://www.migalhas.com.br/depeso/341384/a-permuta-de-imoveis-no-ambito-da-incorporacao-imobiliaria

## 4.4 Quem já opera permuta com **veículo** (não só imóvel)

Nomes identificados — todos de porte regional, **nenhum player nacional consolidado**:

| Construtora/Incorporadora | Praça | Observação |
|---|---|---|
| **D'Campos** | Florianópolis/SC | Foco em público investidor, projetos modernos de alto padrão. **Aceita permuta de imóveis e carros** |
| **CX8** | Florianópolis/SC | Aceita permuta de carro |
| **Femai** | Florianópolis/SC | Aceita permuta de carro |
| **Modulare Empreendimentos** | Florianópolis/SC | Aceita permuta de carro |

Fontes: https://myside.com.br/guia-imoveis/construtoras-permuta-florianopolis-sc · https://myside.com.br/guia-florianopolis/construtoras-permuta-florianopolis-sc · https://myside.com.br/guia-curitiba/construtoras-permuta-curitiba-pr

**Volume de oferta em portal** (proxy de liquidez do formato): **452 apartamentos anunciados como "aceita permuta" no estado de São Paulo** no Imovelweb. Fonte: https://www.imovelweb.com.br/apartamentos-venda-sao-paulo-q-aceita-permuta.html

**Demanda declarada**: pesquisa nacional de 2026 aponta que **39% dos compradores desejam processos mais simples e negociações mais flexíveis** na aquisição de imóveis. Fonte: https://tribunadoplanalto.com.br/permuta-de-imoveis-ganha-espaco-e-facilita-troca-por-imoveis-maiores-sem-precisar-vender-antes/

## 4.5 Margem / deságio praticado na permuta de veículo

**Não existe tabela pública de deságio de permuta carro→imóvel no Brasil.** `[LACUNA CONFIRMADA — buscas específicas não retornaram tabela de nenhuma incorporadora nem estudo setorial.]`

O que existe como **proxy** — mecânica de precificação de usado contra Tabela FIPE:

- A **Tabela FIPE é preço médio anunciado** por vendedores no mercado nacional e serve **apenas como parâmetro de negociação ou avaliação** — não é valor de transação.
- Referência jurisprudencial citada: possibilidade de venda por valor correspondente a **pelo menos 80% da avaliação FIPE** (ou seja, **deságio de até 20%** como piso de razoabilidade). `[secundária — busca em Jusbrasil, não é norma]`
- **Composição declarada do deságio**: o comprador (ou a revenda) desconta (a) polimento e preparação, (b) instalação de acessórios, (c) reparos mecânicos necessários, (d) **margem de lucro da revenda**. Ou seja, o deságio na permuta embute a margem de quem vai revender o bem, não só o risco.
- O valor real varia por **região, manutenção, cor, acessórios** e condição de oferta e demanda — a FIPE não analisa a condição do bem.

`[ESTIMATIVA: deságio de 15% a 25% sobre FIPE é a faixa consistente com (i) o piso de 80% da FIPE e (ii) os quatro componentes de custo/margem listados. Não há fonte que confirme essa faixa especificamente para permuta imobiliária — é inferência a partir da mecânica de revenda de usados.]`

Fontes: https://www.instacarro.com/blog/manual-do-vendedor/tabela-fipe · https://revendamais.com.br/blog/quando-devo-pagar-a-tabela-fipe-de-um-veiculo-usado/ · https://www.jusbrasil.com.br/jurisprudencia/busca?q=venda+de+ve%C3%ADculo+abaixo+do+valor+da+tabela+fipe

## 4.6 Comissão do corretor em permuta

Existe discussão setorial específica sobre **qual base de cálculo remunera o corretor numa permuta** (valor total do imóvel vs. torna em dinheiro) — sinal de que o formato ainda não tem convenção consolidada no mercado brasileiro. Fonte: https://praedium.com.br/blog/permuta-de-imoveis-conceito-e-comissao-imobiliaria/

---

# LACUNAS E RESSALVAS PARA O CONSELHO

1. **OpenTable não publica tabela oficial de preços** — todos os valores de 2026 vêm de agregadores e concorrentes. O US$ 941 milhões de 2016 foi confirmado apenas pelo título do artigo Skift (corpo bloqueado, HTTP 403); o US$ 573 milhões de 2020 está em 10-K auditado (fonte primária SEC).
2. **FDDs de Christie's, Sotheby's e E&V** vieram de agregadores, com **divergências não conciliadas** (Christie's: US$ 35 mil vs US$ 43–50 mil de taxa inicial; E&V: três faixas distintas de investimento total). FDD original deve ser requisitado ao franqueador.
3. **Comissão de dealer da Chrono24 (2%–8%)** e **comissão do 1stDibs (15%+3%)** são de fontes secundárias; nenhuma das duas plataformas publica tabela. Não foi possível confirmar se a Chrono24 GmbH opera a escrow sob licença de instituição de pagamento própria ou via parceiro bancário (páginas institucionais bloquearam a coleta).
4. **Escrow BR via fintech/banco não tem preço público.** O único custo tabelado e verificável é o da Conta Notarial (0,13%–0,45%, piso R$ 500, vigência 01/04/2026). Toda outra faixa exige cotação.
5. **O dado de 18%/22% de permuta em imóveis de luxo em SP** é atribuído à CBIC por veículo secundário; a publicação original da CBIC não foi localizada. **É o dado mais importante do Bloco 4 e o menos verificado.**
6. **Não há dado de deságio de permuta veicular em imóvel.** A faixa de 15–25% é inferência, não medição.
7. **Não foi encontrado nenhum operador nacional consolidado de permuta carro→imóvel de alto padrão no Brasil** — apenas construtoras regionais (concentração em Florianópolis/SC nos resultados).

---

# PARTE II — RESPOSTAS DAS CADEIRAS À PERGUNTA DO CLEBER


---

## Operador Veterano de Classificados & Marketplaces de Nicho — RESPOSTA: OPERADORA AGORA, PORTAL NUNCA

**Tese:** A WebLuxury é operadora de transação desde o dia 1 — mesa, laudo, adjudicação, dossiê, fee por evento, capital zero — e nunca é veículo de mídia: a vitrine é ferramenta de originação de lote, não linha de receita. "Portal agora, marketplace depois" é a virada que eu vi prometida por vinte anos e quase nunca acontecer, porque o dado de anúncio é censo de OFERTA e nunca de TRANSAÇÃO, porque a WebLuxury precisaria de 1.500 a 2.500 fechamentos (25 a 42 anos no ritmo do Gatilho B) para o dado valer alguma coisa, e porque o dia da virada é o dia em que a casa passa a competir com quem paga a conta. "Operadora", porém, é operadora de transação — nunca proprietária do bem: o item 4 continua fora.

## A resposta, sem rodeio

Cleber perguntou se a WebLuxury vira portal de anúncio vivendo de impulsionamento ou "vendedor de todos esses produtos". Minha resposta é **operadora desde o dia 1, portal nunca** — e preciso os dois termos, porque cada um tem duas leituras e uma de cada já foi vetada nesta mesa.

Operadora **de transação**: a casa opera mesa, laudo, adjudicação, dossiê e liquidação, e cobra por evento — R$ 800 a R$ 3.500 de fee, R$ 1,5–3,5 mil de laudo, R$ 2–5 mil de dossiê, capital empregado perto de zero. É o Balcão de Contrapartida aprovado em 25/07, e é o negócio.

Operadora **proprietária** — comprar o bem e revender — é o item 4 e continua fora. Não repito o argumento de caixa do CFO; acrescento o meu, de classificados: no dia em que a casa tem estoque próprio, todo membro passa a ler cada roteamento como concorrência. Você troca o lado da oferta por uma margem de revenda.

E "portal nunca" tem endereço exato: **nunca como negócio de mídia**. A vitrine existe, é obrigatória e é o único lugar de onde nasce o lote de contrapartida. Mas ela é ferramenta de originação, não linha de receita. Anúncio na WebLuxury não se vende; ele é a porta que gera o evento cobrável.

## (a) Quem tentou atravessar a rua — nos dois sentidos

Portal virando operadora: o caso de manual é a Zillow, que abriu compra de imóvel próprio e desligou a operação em 2021 com corte de cerca de um quarto do quadro e baixa de estoque na casa das centenas de milhões de dólares. A CarGurus comprou uma mesa de atacado de carros e acabou desmontando o ativo. A Vroom encerrou o e-commerce em 2024. *(Os três de memória de mercado, não do digest — confirmar antes de citar fora desta sala.)* O padrão é sempre o mesmo: o portal tem margem bruta de 70–90% e P&L de mídia; a operação transacional entra com 20–40% e balanço. Ninguém aguenta a diluição por tempo suficiente.

Operadora virando portal é mais raro e menos fatal, porque ela já tem o dado certo — mas custa audiência que ela não sabe comprar.

O caso que o Cleber trouxe merece ser lido inteiro, não pelo título. **A OpenTable nunca virou operadora de restaurante — ela virou o sistema operacional do host stand.** Instalou o livro de reservas eletrônico passando cabo por parede e porão, cobrando US$ 500 por uma instalação que lhe custava US$ 5.000, queimando US$ 1,5 milhão por mês, e levou de 1998 a 2007 para chegar a 7.400 casas. O inventário em tempo real veio de graça, como subproduto da ferramenta de trabalho — ninguém teve que *ceder* nada.

E o desfecho corrige a frase "faturaram muito, foi vendida por 2,6 bilhões": dos US$ 2,6 bi, **US$ 941 milhões foram baixados em 2016 e US$ 573 milhões em 2020 — US$ 1,514 bilhão, 58% do preço, em seis anos.** A justificativa contábil do segundo write-down, no 10-K, foi "perspectiva reduzida para oportunidades de monetização em serviços de reserva". Traduzindo: o portal chegou ao teto de monetizar o anúncio. O que sobrou de pé foi o **fee por transação** — com 1.500 capas/mês o restaurante paga US$ 1.500–2.250 de variável contra US$ 149–499 de assinatura. Três a quinze vezes mais na perna transacional. A OpenTable é a prova a favor de operadora, não a favor de portal.

## (b) A tese de dados: o que o anúncio revela e o que não revela

Ouvi essa promessa por vinte anos e a vi virar produto duas ou três vezes. Sejamos honestos sobre a matéria-prima.

**O que o dado de anúncio revela:** o que existe, o preço *pedido*, o tempo de vitrine, a curva de reprecificação, a concentração por marca e por praça. É um **censo de oferta**, e é bom para isso.

**O que ele não revela — nunca:** preço de fechamento, se o bem vendeu, para quem, por quê, qual permuta foi aceita, qual deságio real, qual era o orçamento de quem não comprou. Lead não é demanda; lead é curiosidade com telefone. E a busca é endógena: o cliente só pode buscar o que está listado, então o dado confirma o seu próprio catálogo. É a mesma armadilha do "L é endógeno" já registrada em ata.

**Quanto volume é preciso.** Para o dado virar motor, ele precisa de célula: categoria × faixa × praça. Duas categorias, cinco faixas e cinco UFs dão 50 células; 30 a 50 fechamentos por célula para qualquer inferência sobreviver a um trimestre ruim. São **1.500 a 2.500 transações fechadas** *(estimativa minha)*. O Gatilho B pede 30 deals acumulados — 50 a 83 vezes menos. No mesmo ritmo, 25 a 42 anos. A FIPE existe porque há milhões de veículos; não existe FIPE de Patek de R$ 1,5 milhão no Brasil por um motivo aritmético, não por falta de vontade.

**Por que a virada quase nunca acontece.** Primeiro, o dado coletado é o errado — você acumula preço pedido e impressão, e precisa de preço de fechamento. Segundo, no dia da virada você compete com quem paga sua conta. Terceiro, a empresa que vira portal contrata vendedor de mídia, e virar operadora exige demitir a própria equipe de receita. A única exceção grande do digest, a Chrono24, é monocategoria, dá escrow de graça e banca isso com 6,5% do vendedor, 2–8% do dealer, €199–2.199/mês de assinatura e **600 mil visitantes por dia**. Esse é o preço de entrada da rota "portal primeiro". Não temos.

## (c) "Pegar os dados deles e usar a favor"

Essa é a frase mais cara da transcrição, e eu a apagaria da ata da forma como está escrita — não por pudor, por consequência operacional.

Quando o lojista suspeita que a plataforma usa o dado dele para competir, a reação vem em três tempos, sempre nesta ordem: **(1) degrada o feed** — para de mandar a peça boa, sobe estoque encalhado, tira preço e coloca "consulte"; **(2) tira campo** — sem foto de detalhe, sem referência, sem série; **(3) se organiza** — conversa com os outros lojistas e depois com advogado. E quem percebe primeiro é sempre o melhor membro, porque é quem tem estoque que dói perder. Estimo que o decil superior de oferta responda por 60–80% dos leads da rede. Você perde exatamente esse decil.

O antídoto é contratual e custa R$ 0: cláusula de finalidade declarada dizendo que a casa **não usa dado transacional de membro para originar venda concorrente**; índice só agregado, anonimizado, defasado 90 dias e com no mínimo cinco fontes por célula — a mesma banda de comparáveis já aprovada; e relatório mensal devolvendo ao membro o dado dele. Dado devolvido é retenção. Dado apropriado é a frase que aparece grifada na petição inicial.

## (d) A malha de gestores regionais

Já vi montar, e vi quebrar. Funciona quando existe **royalty recorrente por unidade** para dividir — é o que sustenta os 6% + 2% das redes imobiliárias de luxo, com entrada de US$ 25–50 mil e investimento total de US$ 64 mil a 512 mil por praça. Nós não temos royalty: temos fee fixo de R$ 800–3.500 por adjudicação. Metade disso ao gestor dá R$ 400–1.750 por lote; à meta do piloto (2–3 liquidações por trimestre), a praça rende **R$ 1.200–5.250 por trimestre**. Ninguém atende o telefone por isso. Essa é a conta que mata a malha em 2026, antes de qualquer discussão de território.

Modos de falha, em ordem de frequência: **seleção adversa do representante** — o bom já tem negócio e recusa, sobra quem precisa de renda agora e supervende; **o gestor vira concorrente** — ele sai com a lista e os relacionamentos, que são o ativo inteiro; **lacuna de infraestrutura** — vender a praça é fácil, capacitá-la é o custo escondido; **dano de marca à distância**, que o digest registra como o problema mais difícil de corrigir quando não há relação direta.

E a arbitragem geográfica que o Cleber descreveu — o carro do Rio vendido no Pará — é real e é o melhor argumento comercial da chamada. Só que ela se resolve com **lista nacional e lead roteado**, não com uma pessoa em cada capital. Pôr gente no meio de uma arbitragem geográfica é instalar pedágio na única coisa que a plataforma faz de graça. Se um dia houver estrutura regional, o modelo é o de yacht e aeronave: **associação com anuidade e split de co-brokerage**, sem taxa de entrada e sem royalty.

## (e) O anúncio de R$ 7/dia

**O que prova:** que a marca WebLuxury puxa inbound a custo ridículo, e que a entrada cross-categoria está acontecendo no mercado sem plataforma nenhuma. Isso é sinal grátis e vale registro.

**O que não prova.** É n=2, uma semana, sem denominador — não sabemos impressões, mensagens nem CPL. R$ 210/mês e dois contatos dão R$ 105 por contato; com n=2 o intervalo de confiança cobre a rua inteira. Pior: os dois demonstram apetite por **entrar no mercado de relógio**, não por **absorver bem de contrapartida** — qualidades opostas. Loja de estética e corretor iniciante não têm caixa para pagar um Patek, não sabem precificar, não têm cadastro COAF e são o vetor mais provável de peça problemática. É a lei mais antiga do classificado: **quem responde primeiro ao anúncio é o menos qualificado**. O dealer sério não responde a anúncio; ele é ligado por alguém que ele conhece — e é exatamente por isso que a ficha de apetite foi orçada a R$ 150–600 no telefone.

O teste correto custa R$ 3–5 mil em 21 dias, com um formulário e uma pergunta de qualificação ("quantas peças em estoque hoje?"), mirando 30–60 respostas. Estimo 5–15% aproveitáveis: 2 a 9 nomes úteis, ou R$ 350–2.500 por nome. Se esse número ficar acima de R$ 600, o telefone ganha e a discussão de canal está encerrada com dado.

Registro o último ponto: "até médico está vendendo relógio" não é sinal de mercado, é **sinal de topo de ciclo**. Quando o entrante marginal de uma categoria é uma loja de estética, a oferta de anúncio está prestes a exceder a demanda e o preço do anúncio vai a zero. É o momento exato de cobrar pela transação, não pelo espaço.

## O que peço em ata

Impulsionamento segue morto (R$ 900–5.600/mês contra R$ 120–250 mil de construção). Nenhum indicador de portal — cadastrados, views, impressões — entra em relatório de sócio. A unidade de meta continua sendo anúncio vivo com permuta ligada e lote adjudicado. E cotar já o escrow notarial: 0,13–0,45% com piso de R$ 500 põe R$ 1.350 num lote de R$ 300 mil, cabendo dentro do fee de R$ 1.800. Confiança vendida com preço de tabela é produto de operadora. Impressão vendida é produto de portal, e portal aqui não tem audiência para vender.

**Números:**
- OpenTable: US$ 2,6 bi de compra (2014) menos US$ 941 mi de baixa (2016) menos US$ 573 mi (2020) = US$ 1,514 bi baixados — 58% do preço em 6 anos
- OpenTable ERB: instalação custava US$ 5.000 e era cobrada a US$ 500 — subsídio de 10x por ponto, com queima de US$ 1,5 mi/mês
- OpenTable levou de 1998 a 2007 para sair de zero a 7.400 restaurantes (1.600 em 2003)
- OpenTable hoje: 1.500 capas/mês a US$ 1,00–1,50 = US$ 1.500–2.250 de variável contra US$ 149–499 de assinatura — o fee de transação é 3 a 15x a mensalidade
- OpenTable perdeu share de 51% para 46% nos EUA entre 2022 e 2024 mesmo com 65.000 restaurantes — incumbência de portal não protege
- Chrono24: escrow gratuito ao comprador subsidiado por 6,5% do vendedor particular, 2–8% do dealer e €199–2.199/mês de assinatura, sobre 600 mil visitantes/dia
- The RealReal: take rate de 35–40% porque toma posse do bem — o preço de virar operadora proprietária
- Densidade de dado para virar marketplace: 2 categorias × 5 faixas × 5 UFs = 50 células × 30–50 fechamentos = 1.500 a 2.500 transações fechadas [estimativa]
- Gatilho B prevê 30 deals acumulados: 50 a 83 vezes menos que o mínimo estatístico — 25 a 42 anos no mesmo ritmo [estimativa]
- Fee de adjudicação aprovado R$ 800–3.500; split de 50% com gestor regional = R$ 400–1.750 por lote; a 2–3 liquidações/trimestre a praça rende R$ 1.200–5.250/trimestre [estimativa]
- Franquia imobiliária de luxo: entrada US$ 25–50 mil, royalty 6% + 2% de marketing, investimento total US$ 64 mil–512 mil, prazo de 10 anos — base de royalty que a WebLuxury não tem
- Yacht e aeronave não usam franquia: associação com anuidade e split de co-brokerage (10% em yacht; 1–10% em aeronave) — custo de praça é a anuidade, não US$ 100–500 mil
- Anúncio de R$ 7/dia = R$ 210/mês; 2 contatos em uma semana = R$ 105 por contato com n=2 e sem denominador declarado
- Teste correto do canal: R$ 3–5 mil em 21 dias, 30–60 respostas, 5–15% com CNPJ e estoque auditável = 2 a 9 nomes úteis = R$ 350–2.500/nome contra R$ 150–600 da ficha por telefone [estimativa]
- Impulsionamento: R$ 900–5.600/mês de receita contra R$ 120–250 mil de construção — payback de 24 a mais de 100 meses
- Escrow notarial (única tabela pública no Brasil): 0,13% a 0,45%, piso R$ 500 — R$ 1.350 num lote de R$ 300 mil, cabe dentro do fee de adjudicação de R$ 1.800
- Permuta em 18% das transações de imóvel de luxo em SP (2024), projeção de 22% em 2025 — dado atribuído à CBIC por fonte secundária, o mais importante e o menos verificado do digest


---

## Especialista em Mercado de Luxo & Marca — RESPOSTA: OPERADORA AGORA, PORTAL NUNCA

**Tese:** A WebLuxury não tem audiência para vender como portal nem caixa para comprar como comerciante: ela é operadora do RITO da transação — vende protocolo, laudo, discrição e liquidação, nunca vitrine nem estoque — e a tradução institucional de "o Cleber não erra" é um checklist publicado com taxa de reprovação divulgada, não um selo.

## Resposta direta ao Cleber

Nem uma coisa nem outra do jeito que você formulou. **Portal de anúncio, nunca** — inclusive porque o exemplo que você trouxe prova o contrário do que você leu nele. **Operadora, sim, desde já — mas operadora de RITO, não de ESTOQUE.** A casa opera o processo (lote, laudo, adjudicação, dossiê, liquidação) e jamais é dona do bem. Essa distinção é a diferença entre uma marca de 27 anos que vira instituição e uma que vira mais um revendedor com site.

A OpenTable não ganhou por ser portal de mesas. Ela ganhou instalando o Electronic Reservation Book no balcão do restaurante — **passando cabo por parede e porão, cobrando US$ 500 por uma instalação que lhe custava US$ 5.000**, queimando **US$ 1,5 milhão/mês**. O inventário em tempo real foi *subproduto* de uma ferramenta de trabalho, não uma concessão negociada. Foi de 1.600 para 7.400 restaurantes em quatro anos. E a parte que ninguém cita: a Priceline pagou **US$ 2,6 bilhões em 2014**, baixou **US$ 941 milhões em 2016** (36% do preço em dois anos) e mais **US$ 573 milhões em 2020**, com o 10-K declarando "perspectiva reduzida para oportunidades de monetização em serviços de reserva". Share caiu de 51% para 46% entre 2022 e 2024 enquanto a Amex comprou o Tock por US$ 400 milhões e o DoorDash comprou a SevenRooms por US$ 1,2 bilhão. **Portal de anúncio, mesmo quando se ganha, é comprável e desintermediável.** O que você quer é o ERB, não o site.

## (a) O que compra confiança aqui — na ordem em que se compra

Não é a lista que vocês citaram, e a ordem importa mais que os itens.

1. **Reputação nominal de quem abre a porta.** Hoje é 100% do ativo. Um anúncio a **R$ 7/dia** — R$ 210/mês, sub-escala de qualquer leilão de mídia — trouxe uma estética automotiva do Ceará e um corretor de Balneário Camboriú. Isso não foi performance: foi a marca sendo lida como aval. Ativo real, intransferível, e por isso é o problema do item (b).
2. **Procedência e cadeia de título.** O medo do dono de R$ 1,5 milhão não é preço, é vício de origem: relógio Frankenstein, gravame, joia sem nota. Preço já aprovado: laudo de terceiro credenciado, R$ 1.500–3.500, com apólice de RC.
3. **Liquidação garantida (escrow) — e aqui eu discordo frontalmente do Cleber.** O escrow do Chrono24 não é grátis, é embutido: **6,5% do vendedor particular, 2%–8% do dealer, mais €199–2.199/mês de assinatura**. Num relógio de R$ 500 mil, 6,5% são **R$ 32.500** — nove vezes o nosso fee de R$ 3.500. Eles podem dar de graça porque têm 600 mil visitantes/dia; nós não temos. O instrumento brasileiro que serve é o **escrow notarial** (Lei 14.711/2023 + Provimento CNJ 197/2025, operado por Banco Safra em convênio com o CNB, valores em nome do CNB — segregação patrimonial real): **0,45% de R$ 100–300 mil, 0,35% de R$ 300–500 mil, 0,13% acima de R$ 6 milhões, piso R$ 500, retenção máxima de 180 dias**. Faça a conta da permuta relógio de R$ 1,5 mi ↔ carro de R$ 400 mil: R$ 1.400 numa perna e ~R$ 3.750 na outra `[estimativa na faixa decrescente]` = R$ 5.150 contra um fee de R$ 5–8 mil. **Escrow incluso come de 64% a 103% da receita da casa naquela operação.** Portanto: escrow é item cobrado à parte, opcional, e é *bom* que seja cobrado — garantia que não tem preço não tem lastro.
4. **Discrição.** No Brasil isso não é elegância, é integridade física — roubo de relógio em recorde, Rolex em metade dos crimes do mundo. "Circula o bem, nunca a pessoa" já está no desenho; passa a ser **promessa pública de marca**, não regra interna.
5. **Curadoria estética.** Última e barata: normalização a R$ 15–40 por imagem, 200 imagens por R$ 3–8 mil. É higiene de marca, não diferencial.

## (b) O ERB da WebLuxury: como "o Cleber não erra" vira documento

O host stand do dealer brasileiro é o momento no WhatsApp em que o cliente diz "aceita meu carro?". Hoje isso não é registrado em lugar nenhum do país. **A nossa instalação de cabo é o Livro de Contrapartida**: uma tela, grátis, aberta pelo lojista naquele instante — bem ofertado, faixa, prazo, o que o dono aceita. Ele usa para trabalhar; a nossa base de roteamento é subproduto. Não é vitrine e não pede nada em troca.

Sobre a transferência da reputação, três pernas concretas e baratas:

- **O checklist do Cleber vira documento numerado e publicado**, com etapas nominadas e critérios objetivos. Custa 3–5 dias de trabalho.
- **Comitê de admissão de três nomes, ao menos um que não seja o Cleber, com ata escrita** — e **taxa de reprovação divulgada por trimestre** ("de 61 CNPJs avaliados, 19 reprovados — 31%"). Selo que ninguém reprova é recibo.
- **A pele em jogo é de terceiro**: quem responde pelo laudo é a apólice do credenciado, não a palavra do sócio. E `motivo_da_escolha` obrigatório em toda adjudicação — quando perguntarem "por que ele levou?", existe resposta escrita.

Instituição não é quem nunca erra; é quem tem procedimento escrito para o erro e o publica.

## (c) O que a loja de carro premium ganha — três itens, em ordem de força

1. **Originação de estoque, que é a dor nº 1 dela — não venda.** Loja premium não sofre para vender; sofre para *comprar bem*. Em regime maduro (400–600 anúncios permutáveis), a conta da mesa dá 18–99 lotes de carro/mês, cap de 8–12 destinatários sobre lista de 60: **3 a 16 convites/mês por dealer e 0,3 a 1,6 aquisições/mês**, com deságio estimado de **15%–25% sobre FIPE** (o piso de razoabilidade de 80% da FIPE está registrado). Custo: **R$ 0 de mensalidade e fee fixo de R$ 1.800 num ticket de R$ 100–400 mil — 0,45% a 1,8%**. Leilão cobra ~5% do arrematante `[estimativa de praxe]`: **somos 3 a 11 vezes mais baratos como canal de originação, e o bem não vem de sinistro.** Esse argumento fecha por telefone em seis minutos.
2. **A venda que ela hoje perde por não aceitar a troca.** Sua frase é a melhor da chamada: *"você não precisa aceitar a troca — a plataforma aceita"*. Âncora: **18% das transações de imóveis de luxo em SP tiveram permuta em 2024, indo a 22% em 2025** (CBIC via fonte secundária — **não usar em material externo sem verificar a publicação original**). Se no ativo mais ilíquido e burocrático já é um em cada cinco, em carro premium é mais, não menos.
3. **Arbitragem geográfica.** Verdadeira, e eu a coloco em terceiro contra a sua leitura: Webmotors e OLX já dão alcance nacional, e DIFAL, gravame estadual, transporte e vistoria comem o ganho. O que acrescentamos ali é comprador qualificado, não alcance.

**E o que não oferecer: mídia e "visibilidade".** A loja de carro premium tem Instagram melhor que o nosso. Vender audiência para quem já tem audiência é o jeito mais rápido de a primeira reunião virar a última.

## (d) O repasse — onde a marca de 27 anos morre

No instante em que a casa ganha no spread do bem, ela deixa de ser porteiro e vira contraparte. Três danos, todos irreversíveis: o **laudo perde credibilidade** (produto nº 2 da lista de confiança, morto por conflito aparente); o **absorvedor descobre que compete com a casa** — três telefonemas desses numa lista de 60 e o recrutamento acaba; e o **cliente final descobre que "ficaram com o meu"** — nesse mercado todo mundo se conhece. Captura-se o mesmo dinheiro sem risco pelo fee fixo já aprovado e pela segunda passagem do lote deserto com faixa relaxada. **Adição minha a esta ata: se algum dia existir a PJ compradora com capital próprio, ela não pode se chamar WebLuxury nem usar a marca.** Comerciante não é porteiro.

## (e) Encolher como portal ou não escalar como boutique

O portal aberto destrói o único ativo que temos — seletividade — para competir em audiência com quem tem cem vezes mais. JamesEdition sustenta 7.000 dealers com ~25 mil visitantes/dia: densidade profissional, audiência modesta. É esse o formato.

A boutique tem teto aritmético real: 54–140 horas de roteamento por 30 dias no piloto, ~3–7 horas por lote; um gestor de R$ 8–15 mil/mês entrega ~160 horas, logo **23 a 53 lotes/mês por gestor**. Duzentos lotes/mês exigem 4 a 9 gestores, R$ 32–135 mil/mês. **A saída é escalar por protocolo, não por portal — e não por franquia.** Rejeito o modelo imobiliário do digest (US$ 25–50 mil de entrada, 6% de royalty + 2% de marketing, US$ 128–512 mil de investimento inicial na Sotheby's, 10 anos, US$ 250 mil de patrimônio exigido): franquear economia não provada é exatamente a falha nº 1 documentada — parceiro queimando caixa esperando densidade que não vem. O modelo certo é o de **yacht e aeronave: associação com contrato de agência padronizado e regra de split**, custo de abrir praça igual a uma anuidade. Proposta para o ano 2: gestor regional como **agente credenciado, sem taxa de entrada, sem exclusividade territorial contratada, com split de 50/50 do fee de adjudicação** — abaixo dos 50/50–75/25 do master franchise porque a casa carrega lista, protocolo e marca. Zero capital da NewCo, zero passivo de cronograma de desenvolvimento.

## Números que sustentam este parecer

Constam do campo estruturado. O eixo: escrow embutido consome 64%–103% do fee; o Chrono24 cobra 9x o nosso preço para dá-lo "de graça"; e originação a 0,45%–1,8% contra 5% do leilão é a única frase que faz a loja de carro atender o segundo telefonema.

**Números:**
- OpenTable ERB: US$ 500 cobrados por instalação que custava US$ 5.000 (subsídio de 10x) e US$ 1,5 milhão/mês de queima; rede foi de 1.600 para 7.400 restaurantes entre 2003 e 2007
- Priceline pagou US$ 2,6 bilhões pela OpenTable em 2014; baixou US$ 941 milhões em 2016 (36% do preço em 2 anos) e mais US$ 573 milhões em 2020, com goodwill remanescente de US$ 1,0 bilhão
- Share da OpenTable nos EUA caiu de 51% para 46% entre 2022 e 2024, enquanto Amex comprou Tock por US$ 400 milhões (2024) e DoorDash comprou SevenRooms por US$ 1,2 bilhão (2025)
- Escrow 'grátis' do Chrono24 é pago por 6,5% do vendedor particular, 2%-8% do dealer e assinatura de €199 a €2.199/mês: num relógio de R$ 500 mil são R$ 32.500 contra R$ 3.500 do nosso fee fixo — 9,3 vezes mais caro
- Escrow notarial BR (Lei 14.711/2023 + Provimento CNJ 197/2025, Banco Safra + CNB, valores em nome do CNB): 0,45% de R$ 100-300 mil, 0,35% de R$ 300-500 mil, 0,13% acima de R$ 6 milhões, piso R$ 500, retenção máxima de 180 dias prorrogável por 30
- Permuta relógio R$ 1,5 mi ↔ carro R$ 400 mil: escrow notarial nas duas pernas custa ~R$ 5.150 (R$ 1.400 + ~R$ 3.750 estimado) contra fee da casa de R$ 5-8 mil — 64% a 103% da receita. Logo escrow é cobrado à parte, nunca incluso
- Loja de carro premium em regime maduro (400-600 anúncios permutáveis): 18-99 lotes de carro/mês, cap de 8-12 sobre lista de 60 = 3 a 16 convites/mês e 0,3 a 1,6 aquisições/mês por dealer
- Custo de originação via WebLuxury: R$ 0/mês + R$ 1.800 de fee em ticket de R$ 100-400 mil = 0,45% a 1,8%, contra ~5% de comissão do arrematante em leilão [estimativa de praxe] — 3 a 11 vezes mais barato
- Deságio estimado de 15%-25% sobre FIPE na absorção do bem de contrapartida, ancorado no piso de razoabilidade de 80% da FIPE [inferência, não medição]
- 18% das transações de imóveis de luxo em SP incluíram permuta em 2024, projeção de 22% em 2025 (CBIC via fonte secundária — NÃO usar em material externo sem verificar a publicação original)
- Teto aritmético da operadora boutique: 54-140 horas de roteamento por 30 dias, ~3-7 h/lote; gestor de R$ 8-15 mil/mês entrega ~160 h = 23 a 53 lotes/mês. 200 lotes/mês exigem 4 a 9 gestores, R$ 32-135 mil/mês
- Franquia imobiliária rejeitada como modelo de praça: taxa inicial US$ 25-50 mil, royalty 6% + 2% de marketing sobre comissão bruta, investimento inicial US$ 128-512 mil (Sotheby's), 10 anos, US$ 250 mil de patrimônio líquido exigido
- Modelo de praça aprovado (yacht/aeronave): agente credenciado com contrato de agência padrão, sem taxa de entrada, sem exclusividade territorial, split de 50/50 do fee de adjudicação — abaixo dos 50/50 a 75/25 do master franchise porque a casa carrega lista, protocolo e marca
- JamesEdition sustenta 7.000 dealers com ~25 mil visitantes únicos/dia: densidade profissional com audiência modesta é o formato viável; portal aberto compete em audiência contra quem tem 100x mais
- Anúncio a R$ 7/dia (R$ 210/mês, sub-escala de qualquer leilão de mídia) trouxe inbound de estética automotiva no CE e corretor em Balneário Camboriú — é a marca sendo lida como aval, não performance de mídia
- Curadoria estética custa R$ 15-40 por imagem normalizada, 200 imagens por R$ 3-8 mil: é higiene de marca, não diferencial, e por isso fica em quinto na ordem de compra de confiança
- Laudo de terceiro credenciado com apólice de RC: R$ 1.500-3.500 por bem — a pele em jogo é da apólice, não da palavra do sócio
- Custo de institucionalizar 'o Cleber não erra': 3-5 dias de trabalho para escrever o protocolo numerado, mais o parecer jurídico de R$ 8-15 mil já orçado — é o ativo mais barato do plano


---

## CTO / Produto — build-vs-buy — RESPOSTA: OUTRO DESENHO

**Tese:** Nem portal nem comerciante: a WebLuxury é operadora de roteamento de contrapartida sem posse do bem — a vitrine é instrumento de captura, não negócio de audiência, e o dado que habilita a virada a marketplace não é o anúncio, é o desfecho do lote.

## A pergunta do Cleber tem uma terceira resposta — e o OpenTable é a prova dela

Cleber perguntou se viramos portal que ganha impulsionamento ou vendedor de todos esses produtos. Do meu lugar, as duas respostas especificam softwares que esta empresa não tem dinheiro nem tempo para construir — e a referência que ele próprio trouxe explica por quê.

A OpenTable não foi portal nem restaurante. Ela instalou o Electronic Reservation Book no host stand, passando cabo por parede e porão, cobrou **US$ 500 por uma instalação que lhe custava US$ 5.000** e queimou **US$ 1,5 milhão por mês** na fase de conquista. O que esse subsídio comprou não foi audiência: foi **substituir o livro de papel pela ferramenta de trabalho do salão**. O inventário em tempo real virou subproduto de uma ferramenta que o restaurante usava para trabalhar — não uma concessão negociada. Depois disso a rede saiu de 1.600 para 7.400 restaurantes em quatro anos e a empresa foi vendida por US$ 2,6 bilhões. E mesmo assim a compradora baixou **US$ 941 milhões em 2016** e mais **US$ 573 milhões em 2020**, esta com causa declarada de "perspectiva reduzida para monetização em serviços de reserva". Portal de reserva com 65 mil restaurantes e 1,9 bilhão de assentos/ano não sustentou a tese de mídia. A nossa, com zero, não sustenta.

"O que eles não fizeram" tem resposta concreta: eles nunca resolveram o que acontece quando o cliente quer pagar com outra coisa. **O nosso ERB não é a vitrine — é o balcão de contrapartida**, a ferramenta que o lojista usa no minuto em que o cliente oferece um carro pelo relógio. Hoje esse minuto acontece em áudio de WhatsApp e não deixa rastro. Quem for dono desse minuto é dono do dado.

## (a) Os dois produtos, com preço e prazo

**Portal de anúncio (veículo de mídia).** Catálogo multicategoria, busca facetada, perfil público, ad server com pacing e teto, aferição auditável de impressão e clique, filtro de bot, deduplicação de lead, NF-e e conciliação, moderação, SEO técnico. Construção: **R$ 150–330 mil** (R$ 30–80 mil da vitrine já aprovada + R$ 120–250 mil da camada faturável já orçada), **4–7 meses**, R$ 8–20 mil/mês de infra e operação. Mas o custo do portal não é software — é audiência: o impulsionamento só deixa de ser rounding error a ~50 mil sessões qualificadas/mês, que custam **R$ 75–200 mil/mês de mídia**. Caixa até valer algo: **R$ 1,2–2,5 milhões em 18 meses [estimativa]**, contra receita de **R$ 900–5.600/mês**. Isso não é bifurcação estratégica; é um pedido de aporte que ninguém declarou ter.

**Operadora de roteamento (motor de viabilização).** Não é catálogo, é workflow: lote, ficha de apetite, convite capado, faixa indicativa, lance firme, adjudicação com motivo, condição resolutiva, dossiê. No ano 1 é **90% prateleira**: formulários (R$ 0–500/mês), base relacional com log de eventos (R$ 600–1.400/mês), automação n8n/Make (R$ 150–400/mês), WhatsApp Business API via BSP (R$ 300–1.500/mês + conversa), assinatura eletrônica (R$ 200–900/mês), drive com acesso por operação. **Total R$ 2–5 mil/mês, R$ 8–20 mil de implantação, 2–4 semanas.** Primeira receita no primeiro lote liquidado — fee de adjudicação R$ 800 a R$ 8.000 mais laudo e dossiê — **sem uma linha de código proprietário**. O motor em software (máquina de estados, lance selado, trilha de auditoria, VLG calculado) só depois do dia 90: **R$ 180–380 mil e 3–4 meses**, squad de três a R$ 45–70 mil/mês [estimativa BR 2026].

Resumo: uma via custa R$ 300 mil para descobrir se funciona; a outra custa R$ 15 mil.

## (b) A camada de IA: quatro coisas legítimas, cinco fantasias caras

**Legítimo, com prateleira, hoje.** (1) **Extração estruturada de anúncio** — foto e texto de WhatsApp devolvidos como JSON com marca, referência, ano, km, papéis, faixa. Custo **R$ 0,05–0,40 por anúncio** [estimativa]; 500 anúncios por R$ 25–200, economizando ~42 horas de digitação. (2) **Normalização e deduplicação de estoque por feed** — "Daytona 116500LN branco" e "Rolex Panda" são a mesma peça em três lojas; embedding mais regra, custo desprezível. (3) **Redação da ficha despersonalizada do lote** a partir do JSON, com o modelo recebendo **só o subconjunto liberado de campos** — nunca placa, chassi, série, matrícula, nome ou telefone. Isso é arquitetura de minimização, não prompt. (4) **Pré-flag de compliance**: divergência acima de X% contra a banda, praça incompatível, fracionamento somado em seis meses. Sinaliza; não decide. **Nenhuma decisão automatizada com efeito jurídico** (art. 20 LGPD), e comunicação COAF escrita por modelo é passivo, não produto.

**Fantasia.** *Matching por IA*: com 45–75 fichas e 12–20 lotes por trimestre, matching é um `WHERE` com quatro filtros — categoria, faixa, praça, bloqueios. Antes de **300–500 lotes com desfecho**, qualquer modelo aprendido é ruído com interface bonita. *Precificação por modelo*: banda de comparáveis é mediana sobre base, não geração; **preço de modelo em bem de R$ 500 mil entregue como número da casa é laudo sem lastro** — proibição nº 5 de 13/07 com roupa nova. A saída é sempre "banda com n, fonte e data". *Agente autônomo que dispara convite e negocia*: o primeiro erro custa uma relação de 27 anos. *Fine-tuning ou "IA proprietária"*: exige milhares de exemplos rotulados; teremos dezenas. *Autenticação de relógio por foto*: não existe produto confiável, e a responsabilidade é do laudo. Total da camada legítima: **R$ 300–1.500/mês de API e R$ 15–40 mil de construção**, depois do dia 90.

## (c) A tese de dados: portal captura o dado errado

Nicolas disse "registra tudo e você tem a demanda". Corrijo: **portal acumula anúncio e tráfego — commodity que a OLX tem em escala mil vezes maior. Portal não vira marketplace por acumular anúncio; vira por acumular desfecho.** Foi isso o ERB: ele capturava a reserva **sentada**, não a busca.

Eventos obrigatórios desde o dia 1, com carimbo, ator e origem: `anuncio.publicado` (com os oito campos de aceite: categorias, faixa por categoria, teto de permuta, volta mínima, praças, prazo, bloqueios); `anuncio.reprecificado` (preço anterior, novo, dias em vitrine — constrói a curva preço→tempo de venda); `anuncio.retirado` **com motivo enum**, inclusive `vendido_fora` com preço declarado; `oferta_permuta.recebida`; `lote.aberto` com reserva lacrada; **`lote.filtro_aplicado` gravando o tamanho do conjunto elegível ANTES do cap** — é a métrica-mãe do dia 90 e, se não for gravada no ato, não existe depois; `convite.enviado/aberto/respondido` com posição e critério de ordenação em snapshot; `faixa.indicativa.recebida`; `lance.firme.recebido` com modalidade e VLG; `lote.adjudicado` com **VLG do 1º e do 2º colocado** — o delta entre eles é o preço da densidade e a única prova numérica de que a rede vale dinheiro; `lote.deserto` com motivo; `liquidacao.*`; `desagio.apurado`; `ficha_apetite` versionada, porque apetite de 90 dias atrás é ficção; e `membro.nao_respondeu`, porque silêncio é dado.

**Custo de capturar: zero a R$ 3–8 mil de configuração.** O custo real é disciplina: nenhum lote abre sem número, nenhum convite sai sem registro prévio, nenhuma resposta em áudio deixa de virar campo. Retrofit não existe — memória não é fonte.

Isso também decide a divergência entre a "mesa obrigatória" do Cleber e o lance cego da mesa: **mesa produz conversa; lote produz campo.** Além do problema antitruste de sentar concorrentes numa sala operada pela casa, mesa não gera série histórica. Sem série, não há virada a marketplace — só um portal com anúncio velho.

## (d) A malha de gestores regionais exige que software? Quase nenhum

O digest é claro sobre onde essas redes quebram: modelo econômico não modelado antes de assinar, cronograma de desenvolvimento descumprido e lacuna de infraestrutura. **Nenhuma delas se resolve com código.** Split de royalty de 50/50 a 75/25 é contrato.

O que exige software: campo `id_praca` e `id_categoria` no membro, no lote e no convite, com permissão de leitura por escopo (config de prateleira, R$ 0); ledger de fee com regra de split (planilha até ~50 lotes/mês); placar do gestor (relatório). O que **não** se constrói e será pedido: app do gestor, portal do franqueado, dashboard em tempo real — **R$ 80–200 mil e 3 meses para servir cinco pessoas. Cinco pessoas usam planilha.**

O risco de produto é outro: se cada gestor tiver a lista dele, a densidade fragmenta por praça e voltamos aos 3,6 participantes. **Decisão de schema, agora: a lista de absorção é nacional e da casa; o gestor tem escopo de originação, nunca posse da lista.** E registro a discordância de fundo: 5 categorias × 8 capitais são 40 pessoas contra as 2 categorias aprovadas. A arbitragem geográfica que o Cleber descreveu — carro do Rio vendido no Pará — **não precisa de gestor no Pará; precisa da lista nacional e do telefone.** Os FDDs mostram US$ 64 mil a US$ 512 mil por praça aberta. É exatamente o dinheiro que o roteamento nos permite não gastar.

## (e) Os 90 dias: reafirmo, com uma revisão e um acréscimo

**Reafirmo: zero linha de código proprietário no trimestre.** R$ 60–140 mil manual contra R$ 180–400 mil de motor construído antes de saber se alguém responde.

**Revisão.** A vitrine de R$ 30–80 mil vira **R$ 25–45 mil, semanas 3–6**, e muda de natureza: não é catálogo com busca facetada multicategoria, é **página de anúncio com os oito campos de aceite e formulário de oferta de permuta**. Com 400–600 anúncios ninguém busca — precisa de URL, foto boa e o campo que nenhum concorrente do mundo tem. Vitrine de R$ 80 mil paga telas que ninguém abre. Em compensação **subo a ingestão de estoque por feed** para as semanas 4–8: R$ 6–15 mil e duas semanas compram os 400–600 anúncios que três meses de cadastro manual não compram.

**Acréscimo, e é minha divergência com o parecer da rodada 3: "uma planilha" não serve. Planilha grava estado, não evento — ela sobrescreve.** No dia 90, na pergunta sobre a mediana de elegíveis antes do cap, a planilha terá a última linha e nenhuma anterior. Substituo por base relacional de prateleira com tabela `eventos` append-only e automação carimbando toda transição: **R$ 3–8 mil e cinco dias**. É a diferença entre chegar ao dia 90 com uma decisão e chegar com outra discussão.

Acrescento ainda um quarto entregável ao teste de schema do sistema do Cleber: **existe tabela de evento com carimbo?** Se existir, o encanamento vale mais do que a mesa supôs. Se só houver estado, é CRUD — e CRUD se compra.

Não se constrói: app, chat, feed, impulsionamento, ad server, matching automático, IA, motor de lote em código, portal do gestor, escrow próprio.

**Números:**
- OpenTable ERB: US$ 500 cobrados por instalação que custava US$ 5.000 — subsídio de ~10x por ponto; US$ 1,5 milhão/mês de queima na fase de conquista; 1.600 → 7.400 restaurantes entre 2003 e 2007
- OpenTable vendida por US$ 2,6 bilhões (2014); write-downs de US$ 941 milhões (2016) e US$ 573 milhões (2020) — portal de reserva com 65 mil restaurantes não sustentou a tese de mídia
- Produto Portal (faturável): R$ 150–330 mil de construção (R$ 30–80 mil vitrine + R$ 120–250 mil camada de impulsionamento), 4–7 meses, R$ 8–20 mil/mês de infra [estimativa BR 2026]
- Portal — custo real é audiência: R$ 75–200 mil/mês de mídia para ~50 mil sessões qualificadas/mês; R$ 1,2–2,5 milhões em 18 meses contra receita de impulsionamento de R$ 900–5.600/mês [estimativa]
- Produto Operadora ano 1 (prateleira): R$ 2–5 mil/mês de ferramenta + R$ 8–20 mil de implantação, pronto em 2–4 semanas, primeira receita no primeiro lote liquidado, zero código proprietário
- Motor de lote em código proprietário (só após o dia 90): R$ 180–380 mil, 3–4 meses, squad de 3 a R$ 45–70 mil/mês [estimativa BR 2026]
- IA legítima: extração estruturada de anúncio a R$ 0,05–0,40 por anúncio (500 anúncios = R$ 25–200, ~42 horas de digitação economizadas); camada inteira R$ 300–1.500/mês de API + R$ 15–40 mil de construção [estimativa]
- IA fantasia: matching é WHERE de 4 filtros com 45–75 fichas e 12–20 lotes/trimestre; qualquer modelo aprendido exige 300–500 lotes com desfecho para deixar de ser ruído
- Captura de dados desde o dia 1: 16 eventos nomeados, custo marginal de R$ 3–8 mil de configuração; retrofit é impossível — memória não é fonte
- Dado que importa: VLG do 1º menos VLG do 2º colocado por lote — o delta é o preço da densidade e a única prova numérica de que a rede vale dinheiro
- Volume esperado de dado no ano 1: 50–80 lotes × ~40 campos de desfecho = 2.000–3.200 pontos — treina tabela de mediana, não modelo
- Malha regional: software próprio para gestor custaria R$ 80–200 mil e 3 meses para servir 5 pessoas; FDDs de luxo mostram US$ 64 mil a US$ 512 mil por praça aberta — dinheiro que o roteamento nacional dispensa
- Revisão dos 90 dias: vitrine cai de R$ 30–80 mil para R$ 25–45 mil (semanas 3–6) e vira página de anúncio com os 8 campos de aceite; ingestão por feed sobe de prioridade a R$ 6–15 mil e 2 semanas
- Acréscimo à ata: substituir a planilha por base relacional com tabela de eventos append-only — R$ 3–8 mil e 5 dias; planilha grava estado e sobrescreve, e no dia 90 não responde a métrica-mãe


---

## Estrategista de Marketplaces & Plataformas — RESPOSTA: OPERADORA AGORA, PORTAL NUNCA

**Tese:** A OpenTable que o Cleber cita nunca foi portal — instalou o livro de reservas do salão (US$ 500 cobrados sobre US$ 5.000 de custo) e o inventário veio como subproduto da ferramenta de trabalho; a camada portal foi justamente a que sofreu US$ 941 mi e US$ 573 mi de baixa contábil, e o Cleber já opera a operadora há 27 anos, de graça, sem software.

## O VEREDITO

Operadora agora, portal nunca. E "nunca" é literal quanto ao **modelo de receita**, não quanto à vitrine: a vitrine aprovada (R$ 30–80 mil) fica, mas deixa de ser produto e vira instrumento da operadora. O que morre é a WebLuxury ganhando dinheiro de visibilidade — impulsionamento, posição, prateleira. Isso não é uma fase que vem antes. É outro negócio, com outro comprador, outro custo e outro dono.

Fui vencido em 25/07 por querer cobrar R$ 197 do lado absorvedor. A mesa estava certa e registro a concessão. Nesta pergunta eu não recuo um centímetro.

## A ANALOGIA DO CLEBER JOGA CONTRA O CLEBER

Cleber puxou a OpenTable e disse que o diferencial está no que eles **não** fizeram. O problema é que a OpenTable também nunca fez o que ele propõe: ela não começou como portal.

Em 1998 o restaurante americano não tinha internet nem tomada no *host stand*. A OpenTable passou cabo por parede e porão e instalou o Electronic Reservation Book — cobrando **US$ 500 por uma instalação que lhe custava US$ 5.000**, subsídio de 10x por ponto, com queima de **US$ 1,5 milhão/mês**. O ERB não era canal de distribuição: era o livro de reservas do salão, e o restaurante o usava para trabalhar. **O inventário em tempo real — o dado que o Cleber quer — foi subproduto de uma ferramenta de operação, jamais de um cadastro de anúncio.** O site do comensal veio depois de o inventário existir.

E a camada portal foi exatamente a que não se sustentou. US$ 2,6 bilhões em 2014, sobre 31.000 restaurantes — **US$ 84 mil por restaurante**, múltiplo de relação operacional, não de pageview. Baixa de **US$ 941 milhões em nov/2016**: 36% do preço em dois anos. Segunda baixa de **US$ 573 milhões em 30/09/2020**, com o motivo escrito no 10-K auditado da Booking: "perspectiva reduzida para oportunidades de monetização em serviços de reserva". Depois disso o share caiu de 51% para 46% (2022–2024), a Amex pagou US$ 400 milhões pelo Tock e o DoorDash pagou **US$ 1,2 bilhão pelo SevenRooms** — três vezes mais, no ano seguinte, pela camada de operação e dado de cliente. O mercado precificou em dinheiro, em doze meses, a hierarquia desta pergunta.

Junte o Google: ele não opera reserva, conecta-se a parceiros aprovados. **Ele desintermedeia a descoberta, não o inventário.** Quem constrói portal constrói exatamente o ativo que o buscador confisca.

## (a) AUDIÊNCIA, GENTE E CAPITAL

**Portal.** Receita por sessão. A conta já está em ata: ~40 slots, 3–15 mil sessões/mês, R$ 900–5.600/mês, contra R$ 120–250 mil para construir a versão faturável. Para o impulsionamento deixar de ser troco são ~50 mil sessões qualificadas/mês, o que custa **R$ 75–200 mil/mês de mídia — 4 a 13 vezes o teto aprovado de R$ 15–20 mil**. Pela via assinatura, 200 pagantes custam R$ 1,0–1,65 milhão de CAC contra um universo COAF nacional de 12.761 CNPJs. O portal não é lento para esta empresa: é aritmeticamente fechado. Gente: redação, SEO, ad ops, vendedor de mídia. Capital: 18–36 meses antes do primeiro real que preste.

E existe o teste empírico, no nosso próprio arquivo. **JamesEdition é a resposta portal executada há anos** — multicategoria, luxo, assinatura pura, declara não cobrar comissão: 7.000 dealers sobre ~25 mil visitantes únicos/dia, e nunca virou marketplace. É o desfecho observado do "portal primeiro".

**Operadora.** Receita por evento: fee de adjudicação R$ 800–8.000, laudo R$ 1,5–3,5 mil, dossiê R$ 2–5 mil, operação conjugada R$ 12–25 mil. Estimo R$ 5.500–6.500 de fee líquido por permuta liquidada com dossiê. **Sete permutas/mês ≈ R$ 40 mil — a mesma meta de MRR dos sócios, com zero de CAC de mídia**, custeada por um gestor de rede (R$ 8–15 mil/mês) e R$ 15–45 mil não recorrentes das duas listas. Trimestre inteiro: R$ 60–140 mil. Vinte a trinta vezes menos capital para a mesma linha de receita.

O contra que eu mesmo faço, porque conselho que só concorda não serve: **isso não escala em software, escala em folha.** Trinta permutas/mês pedem quatro gestores — R$ 32–60 mil/mês de custo direto contra R$ 165–195 mil de receita. Margem bruta estimada de 65–70%, linear em gente. É empresa de serviços com casca de produto e será avaliada como tal. Quem quiser múltiplo de tecnologia terá de vender outra coisa, e essa outra coisa está no item (d).

## (b) VALUATION E DEFENSABILIDADE

"Portal escala e é raso, operadora não escala e é funda" está certo e é insuficiente, porque omite **quem compra**. Comprador de portal brasileiro de luxo: OLX/Adevinta, Webmotors, Mercado Livre — todos já têm audiência e comprariam por pouco, porque estariam pagando pelo ativo que produzem melhor e mais barato. Comprador de operadora: quem quer deal flow e preço de liquidação — banco de financiamento de bem de luxo, seguradora, ou plataforma internacional entrando no Brasil. Precedente já em ata: a **IADA credencia ~3% dos dealers e concentra mais de 60% das transações de jato usado**. Selo que concentra deal flow, não site que concentra tráfego.

Defensabilidade do portal para entrante em 2026: perto de zero — não há barreira que R$ 20 mil/mês construam contra Instagram, OLX e Webmotors. Defensabilidade da operadora: lista de apetite, não-circunvenção, ata do lote e base de preço de liquidação. Nada disso se copia com dinheiro; tudo se copia com tempo — estimo 18 a 30 meses de vantagem, e não mais.

## (c) "O CLEBER É A PLATAFORMA"

Ativo **e** gargalo, e não é meia resposta: ativo na função de roteamento, gargalo na função de escala. E há uma leitura que decide a pergunta dele: **o que o Cleber faz hoje, de graça e sem software, é a operadora.** Ele não vende visibilidade — ele viabiliza. A única parte deste negócio com receita comprovada em 27 anos é justamente a parte que o modelo portal jogaria fora.

O gargalo tem tamanho: 54–140 horas de roteamento em 30 dias no piloto, com ele acumulando porteiro, rosto de mídia e algoritmo de matching. Três funções integrais numa pessoa.

A extração é barata e tem nome — e é aqui que a OpenTable ensina de novo. **A Ficha de Apetite é o ERB desta empresa**: doze campos que o dealer preenche porque quer receber negócio, e cujo subproduto é o dado que hoje mora na cabeça do Cleber. R$ 150–600 e 1,5–3h por ficha; 150 fichas por R$ 22–90 mil. A OpenTable pagou US$ 5.000 por nó instalado; nós pagamos duas ordens de grandeza menos pelo mesmo efeito, e sem escrever uma linha de código.

## (d) "PORTAL PRIMEIRO, DADOS DEPOIS" — A MIRAGEM, EM TRÊS CONTAS

**Um: anúncio não gera o dado que importa.** Portal registra preço pedido; permuta vive de preço de liquidação. A FIPE é média de anúncio e serve, pela própria fonte, "apenas como parâmetro"; não há tabela pública de deságio de permuta no Brasil — a faixa de 15–25% que circula nesta ata é inferência, não medição. Logo: 600 anúncios vivos entregam 600 preços pedidos, dado que a OLX já tem em volume mil vezes maior. **Quarenta lotes adjudicados entregam quarenta preços de liquidação num país onde esse número não existe publicado.** Quarenta linhas valem mais que seiscentas quando as quarenta são as únicas do país.

**Dois: o volume que transformaria o dado em barreira é inalcançável pela via portal.** A OpenTable foi de 1.600 para 7.400 restaurantes entre 2003 e 2007 queimando US$ 1,5 milhão/mês — quatro anos, cerca de US$ 72 milhões, para o efeito de rede indireto pegar. Contra R$ 15–20 mil/mês aprovados aqui.

**Três, e é a que mata: o modelo portal proíbe a operadora que viria depois.** Portal vive de vender posição, e por isso precisa maximizar anunciantes e a competição entre eles. A operadora aprovada capa o roteamento em 8–12 destinatários. No dia em que 100 dealers pagam por visibilidade, capar em 12 é inexequível — e o único jeito de conciliar é vender prioridade no disparo, que esta mesa vetou por antitruste (art. 36, §3º, I). Portal primeiro não adia a operadora: **fecha a porta dela.**

## O QUE PEÇO EM ATA

1. **Trocar a métrica da vitrine.** "400–600 anúncios vivos" é meta de portal. A meta passa a ser **declarações de aceite completas (os oito campos)**; anúncio sem aceite não conta.
2. **Rebasear o tier de R$ 1.500–3.000 do mês 4:** vende-se **capacidade de lotes roteados/mês**, não capacidade de anúncios vivos. Prateleira é commodity que a OLX dá de graça; roteamento, não.
3. **Zero SEO, home editorial e ranking no ano 1.** A vitrine é pública ao comprador e é instrumento — não é destino e não recebe métrica de audiência.
4. **A mesa obrigatória do Cleber e o lance cego não conflitam** — são eixos diferentes. Mesa colaborativa **entre** categorias (relógio, carro, imóvel: não são concorrentes) é legal e é o desenho dele. Lance cego **dentro** da categoria (oito dealers de carro pelo mesmo carro: são concorrentes) é obrigatório. Sentar dois dealers da mesma categoria à mesma mesa para discutir preço é o art. 36, §3º, I com testemunhas.
5. **Quarta sessão pedindo o capital declarado.** A operadora custa R$ 60–140 mil por trimestre; o portal, R$ 1,0–1,65 milhão. A pergunta do Cleber tem uma resposta que ele pode pagar e outra que ele ainda não sabe se pode.

**Números:**
- OpenTable ERB: US$ 500 cobrados do restaurante contra US$ 5.000 de custo real de instalação — subsídio de 10x por ponto (1998–1999)
- Queima da OpenTable na fase de conquista: US$ 1,5 milhão/mês; rede de 1.600 restaurantes (2003) para 7.400 (2007) — ~4 anos e ~US$ 72 milhões estimados
- Venda à Priceline: US$ 2,6 bilhões (anúncio 13/06/2014, oferta concluída 24/07/2014) sobre 31.000 restaurantes = US$ 84 mil por restaurante
- Write-down de US$ 941 milhões (nov/2016) = 36% do preço de compra baixado em ~2 anos
- Write-down de US$ 573 milhões (30/09/2020), goodwill remanescente OpenTable+KAYAK de US$ 1,0 bilhão; motivo no 10-K: 'perspectiva reduzida para oportunidades de monetização em serviços de reserva'
- Share OpenTable EUA: 51% (2022) para 46% (2024); Amex/Tock US$ 400 milhões (2024); DoorDash/SevenRooms US$ 1,2 bilhão (2025) — 3x pela camada de operação
- JamesEdition: 7.000 dealers sobre ~25 mil visitantes únicos/dia, assinatura pura, sem comissão, sem marketplace — desfecho observado do 'portal primeiro'
- Portal WebLuxury: ~40 slots, 3–15 mil sessões/mês, R$ 900–5.600/mês de receita contra R$ 120–250 mil de construção
- Audiência necessária para impulsionamento pagar: ~50 mil sessões qualificadas/mês = R$ 75–200 mil/mês de mídia, contra teto aprovado de R$ 15–20 mil/mês (4x a 13x)
- Via assinatura: 200 pagantes = R$ 1,0–1,65 milhão de CAC; universo COAF nacional de 12.761 CNPJs (7.557 bens de luxo + 5.204 joias, 30/06/2025)
- Operadora por evento: fee de adjudicação R$ 800–8.000, laudo R$ 1,5–3,5 mil, dossiê R$ 2–5 mil, operação conjugada R$ 12–25 mil
- Estimativa de fee líquido por permuta liquidada com dossiê: R$ 5.500–6.500; 7 permutas/mês ≈ R$ 40 mil — mesma meta de MRR dos sócios com zero CAC de mídia
- Custo do trimestre manual da operadora: R$ 60–140 mil (gestor R$ 8–15 mil/mês + listas R$ 15–45 mil) — 20 a 30 vezes menos capital que a via portal
- Escala em folha: 30 permutas/mês = 4 gestores, R$ 32–60 mil/mês de custo direto contra R$ 165–195 mil de receita; margem bruta estimada 65–70%, linear em gente
- Ficha de Apetite como ERB: R$ 150–600 e 1,5–3h por ficha; 150 fichas por R$ 22–90 mil — duas ordens de grandeza abaixo dos US$ 5.000/nó da OpenTable
- Gargalo Cleber: 54–140 horas de roteamento em 30 dias no piloto, acumulando porteiro, rosto de mídia e matching
- IADA: ~3% dos dealers credenciados concentram mais de 60% das transações de jatos usados — selo que concentra deal flow, não tráfego
- Dado proprietário: 600 anúncios vivos = 600 preços pedidos (a OLX tem 1.000x mais); 40 lotes adjudicados = 40 preços de liquidação, inexistentes publicamente no Brasil
- Deságio de permuta veicular: faixa de 15–25% sobre FIPE é inferência declarada, não medição — não há tabela pública no país
- Vantagem competitiva estimada da operadora: 18 a 30 meses (copiável por tempo, não por dinheiro)


---

## CFO CONTRARIAN — RESPOSTA: OPERADORA AGORA, PORTAL NUNCA

**Tese:** Portal fatura sobre atenção comprada e só vira negócio depois de R$0,9–3,6 milhões e 36–60 meses; operadora fatura sobre evento e empata com 8 a 15 operações/mês contra R$50–90 mil de estrutura — a bifurcação não é de produto, é de quanto capital os sócios têm, e por isso ela não se decide antes da declaração que falta há quatro sessões.

## A RESPOSTA AO CLEBER, ANTES DA CONTA

Portal e operadora não são duas identidades: são duas fontes de receita com custos de aquisição que diferem por um fator de seis. Portal fatura sobre **atenção**, e atenção neste nicho só fica barata depois de 36 a 60 meses de marca e SEO — R$ 25–60 mil/mês nesse período, R$ 0,9 a 3,6 milhões até a receita existir (estimativa). Operadora fatura sobre **evento**, e o evento nasce da agenda telefônica do Cleber no dia 1, sem uma única visita ao site.

Minha posição: **operadora agora, portal nunca.** Com precisão contábil: a vitrine fica, orçada em R$ 30–80 mil como **custo** da operadora — catálogo é o insumo que produz o lead de permuta. O que morre é o portal como **linha de receita**. Impulsionamento, destaque pago, RPM: nunca.

O argumento mais forte contra a rota portal foi trazido pelo próprio Cleber. A OpenTable jamais ganhou dinheiro com impressão. Ganhou com **US$ 199/mês mais US$ 1,00 por capa servida** — assinatura mais fee por evento, que é literalmente o desenho que esta mesa aprovou em 25/07. Para chegar lá, instalou fisicamente um livro de reservas que lhe custava **US$ 5.000** e era vendido por **US$ 500** — subsídio de 10x por ponto — queimando **US$ 1,5 milhão por mês**. E o desfecho: a Priceline pagou **US$ 2,6 bilhões** em 2014 e baixou **US$ 941 milhões** em 2016 e **US$ 573 milhões** em 2020 — **US$ 1,51 bilhão, 58% do preço de compra, escrito fora do balanço.** A referência que sustenta a tese do portal é o caso documentado de destruição de capital pela tese do portal. O dinheiro estava no fee por transação servida, e a lição do ERB é outra: **a ferramenta antes do canal.** O equivalente do host stand aqui não é a vitrine — é o Balcão de Contrapartida.

## (A) A ROTA PORTAL — A CONTA QUE NINGUÉM FEZ

Receita por anunciante na rota portal é receita por lead entregue. Para justificar R$ 2.000/mês, o lojista precisa de 10 a 20 leads qualificados (R$ 100–200/lead, faixa de mercado, estimativa). Conversão sessão→lead em vertical de alto valor: 0,5% a 1,5%. Logo **700 a 4.000 sessões por anunciante por mês**. Com 30 anunciantes: **21 mil a 120 mil sessões/mês**. Com 100: **70 mil a 400 mil**.

Comprado, isso custa CPC de R$ 1,50–4,00: 70 mil sessões = **R$ 105–280 mil/mês de mídia** contra R$ 200 mil de MRR de 100 anunciantes. Margem bruta na casa do zero, com audiência **alugada** — ela vai a zero no mês em que a mídia para. Pela via da receita publicitária a conta é pior: R$ 500 mil/ano de impulsionamento a um RPM generoso de R$ 150 exige **280 mil sessões/mês**. A mesa já mediu a versão honesta: R$ 900 a R$ 5.600/mês de receita contra R$ 120–250 mil de construção. Payback de 24 a mais de 100 meses.

Custo de operar o portal no ano 1, estimativa: mídia média R$ 30 mil/mês (R$ 360 mil), vitrine R$ 30–80 mil, gestor R$ 96–180 mil, jurídico fundacional e PLD R$ 160–440 mil, ferramentas R$ 24 mil. **Total R$ 670 mil a R$ 1,08 milhão contra receita de R$ 380–560 mil.** Déficit de R$ 200 a 700 mil no primeiro ano, e a unidade econômica **não melhora com escala**, porque o custo da receita é mídia.

E a tese "portal → dados → marketplace" não fecha: 400–600 anúncios não são um dataset, são uma planilha. Dado com valor comercial começa em dezenas de milhares de eventos, o que exige a audiência que custa os R$ 2–4 milhões. A OpenTable nunca monetizou o dado; monetizou a capa.

## (B) A ROTA OPERADORA — 8 A 15 OPERAÇÕES POR MÊS

Receita líquida por operação viabilizada, pela tabela aprovada: fee de adjudicação R$ 1.800–3.500 na faixa central (R$ 5–8 mil acima de R$ 1 milhão), margem da casa no laudo R$ 500–1.200 por bem, dossiê da operação conjugada R$ 2.000–5.000. Mix estimado de 60% na faixa R$ 100–400 mil, 30% acima de R$ 400 mil, 10% acima de R$ 1 milhão: **R$ 6.400 por operação**. Adoto **R$ 6.000–7.000 líquidos**, e faço aqui um corte contra a própria mesa: os R$ 12–25 mil por operação conjugada da rodada 2 embutiam success fee sobre comissão de dois lados — a linha menos auditável e menos cobrável do plano. Tiro-a da projeção; ela volta como upside, nunca como base.

Estrutura núcleo da operadora, mensal: gestor de rede R$ 12–22 mil com encargos, compliance/PLD R$ 10–30 mil, jurídico e contábil R$ 5–10 mil, ferramentas R$ 2–4 mil, mídia de reputação R$ 15–20 mil, pró-labore mínimo R$ 0–15 mil. **Burn de R$ 50 a 90 mil/mês.** Ponto de equilíbrio: **8 a 15 operações liquidadas por mês.**

Esse é o número que faltava na mesa, e ele é desconfortável: o piloto de 90 dias mira **2 a 3 permutas liquidadas**. O equilíbrio é 4 a 6 vezes a ambição do piloto. Não é motivo para abandonar a rota — é a distância a percorrer, e ela é percorrível: se os 18% de permuta em imóveis de luxo em SP (dado CBIC via fonte secundária, o menos verificado do digest) forem direcionalmente certos, o comportamento é massivo, não nicho. Pela mesma via, capturar 0,5% a 1,5% de uma categoria numa praça paga a estrutura inteira. Na rota portal não existe percentual pequeno equivalente: ou há audiência, ou não há receita.

Duas correções operacionais de caixa, com preço. **Primeira: o fee só é cobrável se pré-aceito com número no Termo de Absorvedor e cobrado no ato do sinal, via Pix com split** — inadimplência de fee cobrado depois da adjudicação roda em 30–50%, e o Pix a **0,99% (Iugu)** custa R$ 35 sobre um fee de R$ 3.500. Isso é receita própria transitando, não dinheiro de terceiro: o veto ao escrow permanece intacto. **Segunda: a confiança não se constrói, se revende.** A Conta Notarial (Lei 14.711/2023, Provimento CNJ 197/2025, Safra + CNB) custa **0,35% na faixa de R$ 300–500 mil, piso R$ 500** — R$ 1.400 num bem de R$ 400 mil. O modelo Chrono24, que dá escrow "grátis" e cobra 6,5% do vendedor particular, custaria R$ 26 mil no mesmo bem. **O cartório é 18 vezes mais barato que a referência que os sócios querem copiar, e não exige uma linha de código.** A casa cobra R$ 300–800 de coordenação e não toca no dinheiro.

## (C) A MALHA DE GESTORES REGIONAIS — R$ 0 DE FOLHA OU NADA

Cinco gestores de categoria por capital, contratados, a R$ 8–15 mil mais encargos, dão **R$ 13,6 a 25,5 mil cada**, ou **R$ 68 a 127 mil por praça/mês**. Em oito capitais: **R$ 544 mil a R$ 1,02 milhão por mês — R$ 6,5 a 12,2 milhões por ano de folha.** Cada praça precisaria de **10 a 20 operações/mês** só para pagar a própria folha; oito praças pedem 80 a 160 operações/mês. É 30 a 60 vezes o piloto. Reprovado sem meio-termo.

Os benchmarks de franquia confirmam por outro caminho: Christie's, Sotheby's e E&V cobram entrada de US$ 25–50 mil (cerca de 10% do investimento) e royalty de 6% mais 2% de marketing sobre **comissão bruta**, e a maior parte do capital vai para a estrutura local, não para a marca. A falha nº 1 documentada nesses acordos é literalmente esta empresa projetada para a frente: "nenhuma das partes modela a lucratividade antes de assinar, e o parceiro queima caixa esperando a densidade do território" — o cold start transferido ao regional.

O desenho certo está em yacht e aeronave: **associação, não franquia.** IYBA, MYBA e IADA não têm taxa de entrada nem royalty — têm contrato padrão de agência central e regra de split. Traduzo: **o gestor regional é um CNPJ credenciado com mandato de originação na praça, remunerado por split de 40–60% sobre o fee gerado ali** (a faixa 50/50–75/25 do master franchise), e mais nada. Custo fixo por praça: **R$ 0**. Custo de ativação: R$ 3–8 mil (visita de credenciamento, contrato, deslocamento), **R$ 24–64 mil por oito praças** — contra R$ 6,5–12,2 milhões da versão assalariada. **Razão de 100 a 500 vezes.** O ponto de equilíbrio da praça deixa de existir; o que existe é limiar de engajamento: abaixo de 3–5 operações/mês o representante some em silêncio, que é a mesma indiferença diagnosticada em 13/07. Malha só depois de duas praças provadas — e um gestor assalariado precisaria de 8 a 24 operações/mês só para cobrir o próprio salário em termos de split. Ele não consegue. Não contrate.

## (D) O INVESTIDOR — NÃO É SÓCIO DE CAPITAL, É CONCORRENTE COM BALANÇO

A ideia do Cleber resolve o caixa e **realoca** o problema jurídico, não o elimina. Se a NewCo intermedeia o crédito, define o preço do dinheiro ou garante o investidor, continua sendo mútuo ou desconto de ativo — privativo de instituição autorizada, Lei 7.492/86, art. 16, reclusão de 1 a 4 anos, passivo pessoal dos sócios. Aprovo **uma** versão: **o investidor compra o bem em nome próprio, com CNPJ próprio, como absorvedor da lista** — é o substituto (a) da rodada 2 com mais capital. A casa cobra fee fixo e nunca toca no dinheiro. Fundo estruturado por gestora regulada custa R$ 80–200 mil e 12–18 meses; no volume do ano 1, morre por custo. Investidor emprestando à NewCo para ela comprar o bem é o item 4 vetado com embrulho de dívida: rejeitado.

Preço que esse capital pede, estimativa declarada: crédito privado contra colateral ilíquido no Brasil de 2026 roda em **2,5% a 4% ao mês, 35% a 60% ao ano**. Mas o investidor de permuta não cobra juro — cobra **deságio**. Vinte por cento sobre um bem de R$ 400 mil, revendido em 60 dias, são R$ 80 mil sobre R$ 320 mil empregados; descontando os que ficam parados, custódia, seguro e transporte, o retorno real fica em **30% a 60% ao ano**. É exatamente por isso que o deságio é o que é, e por que comprimi-lo de 25% para 8–15% com base própria de compradores vale R$ 195–255 mil numa operação de R$ 1,5 milhão.

Risco de reféns, com trava numérica: **nenhum provedor de capital pode ser adjudicatário em mais de 20% dos lotes por trimestre, nem originar mais de 30% da receita de fee.** É o mesmo teto de concentração já em ata para o MRR. Ele entra como um dos 8 a 12 do disparo, nunca com prioridade — vender prioridade já está vetado por antitruste, e a mesma regra protege a casa da captura. Sem direito de preferência, jamais. E se ele pedir equity junto com a linha: **dois contratos separados, preço de mercado num, valuation no outro.** Misturar é como se vende 20–30% da empresa por capital de giro que se alugava a 3% ao mês.

## (E) O CAPITAL NÃO DECLARADO — QUARTA SESSÃO

O que a lacuna já custou, item a item: gestor de rede não contratado há duas sessões (R$ 8–15 mil/mês), o que derruba o piloto para 6–8 lotes/mês e empurra a regra de decisão do dia 90 em um trimestre; parecer concorrencial de R$ 8–15 mil não contratado, o que **bloqueia o primeiro disparo e portanto o motor inteiro**; lista de absorção de R$ 15–45 mil não iniciada, sendo o gargalo declarado de calendário; vitrine de R$ 30–80 mil aprovada duas vezes e não gasta; teste de schema de R$ 5–10 mil parado; jurídico fundacional de R$ 40–80 mil pendente, o que significa que **qualquer negócio real feito hoje sob a marca é passivo pessoal sob a Lei 9.613**. E a cessão de PI, que custa **R$ 0** e está pendente há três sessões — a prova de que o bloqueio não é dinheiro.

A pergunta é aritmética e cabe em uma linha: **existem R$ 400 a 700 mil disponíveis por seis a nove meses?** Rota operadora: R$ 100–220 mil de largada mais R$ 50–90 mil/mês. Rota portal: R$ 2 a 4 milhões antes da primeira receita relevante. **A declaração de capital não é anterior à bifurcação — ela É a bifurcação.** Se a resposta for "menos de R$ 400 mil", a rota portal está eliminada por impossibilidade financeira e a pergunta do Cleber se responde sozinha.

Registro final, contra esta mesa e contra mim: quatro sessões produziram cinco desenhos e zero decisão executada. Parecer não executado vale zero. **Enquanto o capital não for declarado por escrito, o conselho deveria parar de emitir desenho novo e emitir uma linha só: nada disto é executável.** Deliberar sobre a quinta variação enquanto a precondição segue aberta é a mesa financiando o adiamento com o próprio prestígio.

## ONDE DISCORDO — INCLUSIVE DE MIM

Fui vencido na rodada 3 propondo anuidade simbólica de R$ 300–600 no anel de absorção. Aceito a derrota: a conta do fee de adjudicação fecha melhor do que a minha, e o teto de densidade criado pela mensalidade é real. Mas mantenho em ata a condição que torna a derrota segura — **fee com número pré-aceito e cobrado no sinal, por split de Pix**. Sem isso, o anel gratuito é gratuito de verdade, e a operadora fica sem a única receita que a sustenta.

**Números:**
- Portal: 70 mil a 400 mil sessões/mês para servir 100 anunciantes (0,5–1,5% de conversão sessão→lead) — R$ 105–280 mil/mês de mídia comprada a CPC R$ 1,50–4,00 [estimativa]
- Portal, ano 1: receita R$ 380–560 mil contra custo R$ 670 mil–1,08 milhão — déficit de R$ 200 a 700 mil, sem melhora com escala [estimativa]
- Audiência orgânica (a única que torna o portal viável): 36–60 meses a R$ 25–60 mil/mês = R$ 0,9 a 3,6 milhões antes da primeira receita relevante [estimativa]
- OpenTable: US$ 500 cobrados por instalação que custava US$ 5.000 (subsídio de 10x), queima de US$ 1,5 milhão/mês, receita em US$ 199/mês + US$ 1,00 por capa — nunca em impressão [fonte HBS]
- Priceline: US$ 2,6 bilhões pagos em 2014; write-downs de US$ 941 milhões (2016) + US$ 573 milhões (2020) = US$ 1,51 bilhão, 58% do preço de compra [Skift + 10-K SEC]
- Operadora: R$ 6.400 líquidos por operação viabilizada no mix estimado (60% na faixa R$ 100–400 mil, 30% acima de R$ 400 mil, 10% acima de R$ 1 milhão); adoto R$ 6.000–7.000 [estimativa]
- Burn da estrutura núcleo: R$ 50–90 mil/mês → ponto de equilíbrio de 8 a 15 operações liquidadas/mês, 4 a 6 vezes a meta do piloto de 90 dias (2–3 permutas) [estimativa]
- Malha assalariada: 5 gestores × R$ 13,6–25,5 mil com encargos = R$ 68–127 mil por praça/mês; 8 capitais = R$ 6,5 a 12,2 milhões/ano de folha; exige 10–20 operações/mês por praça só para a folha [estimativa]
- Malha por associação (modelo IYBA/MYBA/IADA): R$ 0 de folha, R$ 3–8 mil de ativação por praça, R$ 24–64 mil por 8 praças — razão de 100 a 500 vezes contra a versão assalariada [estimativa]
- Split do gestor regional: 40–60% do fee gerado na praça, ancorado na faixa 50/50 a 75/25 do master franchise; limiar de engajamento 3–5 operações/mês, abaixo disso ele some em silêncio [estimativa]
- Franquias de luxo imobiliário: entrada US$ 25–50 mil (~10% do investimento), royalty 6% + 2% de marketing sobre comissão bruta, prazo de 10 anos; falha nº 1 documentada é não modelar lucratividade antes de assinar [FDD via agregadores, secundária]
- Custo do capital do investidor: 2,5–4% ao mês / 35–60% ao ano em crédito privado contra colateral ilíquido; expresso como deságio de 15–25%, retorno real líquido 30–60% a.a. [estimativa]
- Trava anti-refém: nenhum provedor de capital adjudicatário em mais de 20% dos lotes/trimestre nem originando mais de 30% da receita de fee — espelho do teto de concentração de MRR já em ata
- Conta Notarial (Lei 14.711/2023 + Provimento CNJ 197/2025, Safra+CNB): 0,35% na faixa R$ 300–500 mil, piso R$ 500 — R$ 1.400 num bem de R$ 400 mil, contra R$ 26 mil da comissão de 6,5% do modelo Chrono24. 18 vezes mais barato, zero código
- Cobrança do fee no sinal via Pix com split (Iugu 0,99%): R$ 35 sobre fee de R$ 3.500, contra 30–50% de inadimplência estimada se cobrado após a adjudicação [estimativa]
- Custo já adiado por falta de declaração de capital: R$ 100–220 mil de largada (jurídico R$ 40–80 mil, listas R$ 15–45 mil, vitrine R$ 30–80 mil, parecer R$ 8–15 mil, schema R$ 5–10 mil) + R$ 50–90 mil/mês — e a cessão de PI, que custa R$ 0 e está parada há três sessões
- A pergunta que decide a bifurcação: existem R$ 400–700 mil por 6–9 meses (operadora) ou R$ 2–4 milhões (portal)? Abaixo de R$ 400 mil, a rota portal está eliminada por impossibilidade financeira
- Permuta em imóveis de luxo em SP: 18% das transações em 2024, projeção de 22% em 2025 [CBIC via fonte secundária — o dado menos verificado do digest, não usar em material externo sem checagem]


---

# PARTE III — ANÁLISES TEMÁTICAS


---

## A DEFINIÇÃO EM UMA FRASE E OS 90 DIAS: OPERADORA DE PERMUTA, DEZ TELAS MADURAS, R$ 165–360 MIL DE TRIMESTRE

**Tese submetida a refutação:** A WebLuxury é a operadora que leva o bem de contrapartida a 8–12 compradores em 72 horas e cobra fee fixo por adjudicação — nunca compra o bem, nunca vende visibilidade; e nos 90 dias se constrói lista, contrato, base de eventos e dez telas, não motor.

## 1. A definição — três frases, e a que eu recomendo

**Para o vendedor (o lojista que anuncia):**
> "A WebLuxury leva o bem que seu cliente oferece em troca a 8–12 compradores em 72h — você vende sem ficar com ele." *(22 palavras)*

**Para o cliente final:**
> "Você compra o relógio ou o carro que quer dando o que já tem como parte do pagamento, com laudo independente e prazo definido." *(24 palavras)*

**Para o investidor:**
> "Operadora de permuta cross-categoria no mercado de luxo brasileiro: roteia o bem de contrapartida a compradores credenciados e cobra fee fixo por adjudicação, sem estoque." *(25 palavras)*

**Recomendo a primeira como principal.** É a que o Cleber e o Nicolas vão repetir numa reunião — e é a única das três que fala com quem precisa entrar primeiro. As outras duas derivam dela.

**A correção que vai a ata, e ela é de linguagem, não de estilo.** A frase do Cleber — *"você não precisa aceitar a troca, a plataforma aceita"* — é a melhor da chamada e **não pode ser dita assim**. "A plataforma aceita" promete que a casa fica com o bem: é o item 4, vetado em duas sessões, e sob os arts. 14 e 30 do CDC vira obrigação vinculante de comprar. A versão dizível é **"você não precisa ficar com o bem"**. Muda três palavras e tira o passivo inteiro.

Três palavras proibidas no material: **"segurança"** (art. 14 do CDC sem escrow), **"garantido"** e **"verificado"** solto sem escopo negativo escrito.

## 2. O escopo dos 90 dias — lista única e ordenada

| # | O quê | Quando | Responsável | Custo |
|---|---|---|---|---|
| 1 | Capital declarado por escrito + cessão de PI do código | Semana 1 | Nicolas e Cleber | **R$ 0** |
| 2 | NewCo, cadastro COAF, política PLD, três contratos fundacionais | Semanas 1–4 | Fornecedor jurídico | R$ 40–80 mil |
| 3 | Parecer concorrencial **sobre a mecânica**, antes do 1º disparo | Semanas 1–3 | Fornecedor | R$ 8–15 mil |
| 4 | Gestor de rede contratado (3 meses no trimestre) | Semana 1 | Cleber | R$ 24–45 mil |
| 5 | Teste de schema do sistema do Cleber (+ pergunta: existe tabela de evento com carimbo?) | Semanas 1–3 | Fornecedor dev | R$ 5–10 mil |
| 6 | **Duas listas de absorção por telefone** — 90–150 fichas de apetite + Termo de Absorvedor | Semanas 2–7 | Gestor + Cleber | R$ 15–45 mil |
| 7 | Base relacional com tabela de eventos append-only | Semanas 2–3 | Fornecedor | R$ 3–8 mil |
| 8 | Vitrine reduzida: página de anúncio com os 8 campos de aceite + formulário de oferta de permuta | Semanas 3–6 | Fornecedor | R$ 25–45 mil |
| 9 | Ingestão de estoque por feed — meta 400–600 anúncios com permuta ligada | Semanas 4–8 | Fornecedor + Cleber | R$ 6–15 mil |
| 10 | Normalização de 200 imagens (R$ 15–40/imagem) | Semanas 4–8 | Fornecedor | R$ 3–8 mil |
| 11 | Teste de canal de recrutamento: 21 dias, formulário com pergunta qualificadora | Semanas 4–6 | Nicolas | R$ 3–5 mil |
| 12 | Cotação de escrow notarial (0,13–0,45%, piso R$ 500) e de split de Pix | Semana 5 | Nicolas | R$ 0 |
| 13 | Mídia de reputação, teto rebaixado a R$ 5–8 mil/mês | Semanas 1–13 | Nicolas | R$ 15–24 mil |
| 14 | PLD em operação (a partir do 1º lote) | Semanas 6–13 | Fornecedor | R$ 20–60 mil |
| 15 | **Balcão de Contrapartida no manual** — 12–20 lotes, 2–3 liquidados | Semanas 8–13 | Gestor de rede | custo no item 4 |

**Cortado do trimestre** (perdeu prioridade, não mérito): encontro presencial de fundadores (R$ 30–60 mil — o dinheiro é da lista de absorção); mesa de atacado quinzenal (consome a hora do gestor, receita zero orçada); diárias de produção (fica só a normalização de imagem); credenciamento cobrado (não se vende selo antes de existir taxa de reprovação para publicar).

## 3. A correção que faço à própria mesa

**O trimestre não custa R$ 60–140 mil. Custa R$ 165 a 360 mil.** Os R$ 60–140 mil da rodada 3 excluem o jurídico fundacional e o PLD, que a mesma ata chama de inegociáveis. Duas sessões pedindo capital declarado com um número que omite metade da conta é a mesa ajudando o adiamento. O número honesto é o de cima, e dele **R$ 60–140 mil são compliance que não produz um único lote**.

Discordo também do ponto de equilíbrio de 8–15 operações/mês: ele mede uma estrutura de R$ 50–90 mil/mês que **não deve existir neste trimestre**. A estrutura destes 90 dias roda a R$ 25–45 mil/mês e empata em **4 a 7 operações/mês**. Não se contrata a estrutura do ano 2 para testar a mecânica do ano 1.

## 4. O que os sócios devem PARAR de discutir por 90 dias

1. **Barco, aeronave, imóvel, joia e bolsa como categorias povoadas.** Barco produz 1,3–7,2 leads/mês. Entram como bem *ofertado*, roteados no telefone do gestor.
2. **Malha de gestores por capital.** Assalariada custa R$ 6,5–12,2 milhões/ano; por split, meio fee de R$ 800–3.500 dá R$ 1.200–5.250 por praça/trimestre e ninguém atende o telefone. Volta no ano 2, como associação credenciada, nunca franquia.
3. **Preço da mensalidade do mês 4.** Não se precifica capacidade antes de existir o relatório de lotes roteados que a justifica.
4. **Impulsionamento, selo vendido, feed, CRM e mensageria próprios.** Reprovados três vezes.
5. **IA e matching automático.** Antes de 300–500 lotes com desfecho, é `WHERE` com quatro filtros.
6. **Compra do bem / o investidor que banca.** Existe uma única forma viva: ele entra como **absorvedor com CNPJ próprio, comprando em nome próprio**, tetado em 20% dos lotes por trimestre.
7. **Valuation, exit e quem compra a empresa.**
8. **"Mesa obrigatória" vs. lance cego.** Encerro em uma linha: **mesa entre categorias diferentes é legal e é o desenho do Cleber; lance cego dentro da mesma categoria é obrigatório.** Sentar dois dealers de carro para discutir o preço do mesmo carro é o art. 36, §3º, I com testemunhas.

## 5. A aplicação — o que já pode ser construído e o que não pode

**Pode, porque a regra está escrita campo a campo e não muda com o teste:** cadastro de membro por CNPJ com escopo (anuncia / absorve); os oito campos de declaração de aceite; a prova mínima da oferta; a Ficha de Apetite; o cofre de identificadores (placa, chassi, série e matrícula **ficam na casa**; ao lote vai o atestado); e a tabela de eventos append-only.

**Não pode, porque a mecânica nunca rodou:** os pesos de ordenação dos destinatários (não existe histórico de resposta para ordenar); ondas 2 e 3 automáticas; cálculo automático do VLG (o 1,5% a.m. e a lista de custos não assumidos são parâmetros não testados); consignação com piso e modalidade condicionada; cesta N:1 e condição resolutiva — que no ano 1 são **contrato, não código**; placar de membro (exige 10 aberturas por membro, que não existirão); e qualquer cobrança, escrow, chat ou impulsionamento no app.

**As dez telas maduras:** 1) credenciamento do membro; 2) publicar anúncio com aceite; 3) página pública do anúncio; 4) formulário de oferta de permuta; 5) ficha de apetite; 6) fila de lotes do gestor; 7) ficha despersonalizada do lote (o que o destinatário vê); 8) formulário de faixa indicativa; 9) formulário de lance firme devolvido à casa; 10) tela de adjudicação com `motivo_da_escolha` obrigatório, mais o log de eventos por trás de todas.

Construa 1 a 5 e 10 agora. As telas 6 a 9 no papel primeiro: se os formulários manuais não forem preenchidos pelos dez primeiros lotes, o software não conserta.

## 6. O delta: operadora em vez de portal

Cinco linhas mudam de valor. **Unidade de meta:** anúncio vivo com permuta ligada e lote adjudicado — não cadastrado, sessão ou view. **Vitrine:** R$ 25–45 mil como instrumento, em lugar de R$ 120–250 mil de camada faturável; zero SEO, zero home editorial, zero ranking. **Receita:** por evento, com equilíbrio em 4–7 operações/mês, em lugar de 1.000–1.700 assinantes. **Mídia:** R$ 5–8 mil/mês reputacionais, em lugar dos R$ 75–200 mil/mês que 50 mil sessões qualificadas custam. **Dado:** 40 preços de liquidação valem mais que 600 preços pedidos, num país onde os primeiros não existem publicados.

O que se abre mão: R$ 900–5.600/mês de impulsionamento. O que se evita: no dia em que 100 dealers pagam por visibilidade, capar o disparo em 12 fica inexequível, e a única conciliação possível é vender prioridade — vetada por antitruste. **Portal primeiro não adia a operadora: fecha a porta dela.**

**Ações propostas:**
- Semana 1: declarar o capital por escrito (quanto, de quem, por quantos meses) e assinar a cessão de PI do código — custo R$ 0, pendente há três sessões, bloqueia todo o resto
- Semana 1: contratar o gestor de rede (R$ 8–15 mil/mês, mínimo 4 meses) — sem esse cargo o piloto cai para 6–8 lotes/mês e o Cleber vira o gargalo
- Semanas 1–4: NewCo, cadastro COAF, política PLD e os três contratos fundacionais (R$ 40–80 mil) antes de qualquer lote aberto
- Semanas 1–3: contratar o parecer concorrencial sobre a MECÂNICA do lance cego (R$ 8–15 mil) — bloqueia o primeiro disparo
- Semanas 1–3: teste de schema do sistema do Cleber (R$ 5–10 mil), incluindo a pergunta 'existe tabela de evento com carimbo?'
- Semanas 2–7: construir as duas listas de absorção por telefone — 90–150 fichas de apetite e Termos de Absorvedor assinados (R$ 15–45 mil). É o gargalo de calendário do trimestre
- Semanas 2–3: base relacional com tabela de eventos append-only (R$ 3–8 mil) — planilha sobrescreve e não responde à métrica-mãe do dia 90
- Semanas 3–6: vitrine reduzida a página de anúncio com os oito campos de aceite e formulário de oferta de permuta (R$ 25–45 mil, cortada dos R$ 30–80 mil aprovados)
- Semanas 4–8: ingestão de estoque por feed até 400–600 anúncios com permuta ligada (R$ 6–15 mil) e normalização de 200 imagens (R$ 3–8 mil)
- Semanas 8–13: rodar o Balcão de Contrapartida no manual — 12–20 lotes abertos, 4–6 com proposta firme, 2–3 permutas liquidadas, zero linha de código proprietário
- Construir agora apenas as telas 1–5 e o log de eventos; deixar faixa indicativa, lance firme e adjudicação em formulário de papel até o décimo lote
- Substituir a frase 'a plataforma aceita a troca' por 'você não precisa ficar com o bem' em todo material — e banir 'segurança', 'garantido' e 'verificado' sem escopo negativo escrito
- Parar por 90 dias: categorias além de relógio e carro premium, malha de gestores por capital, preço do mês 4, impulsionamento, selo vendido, IA, compra do bem e valuation
- Registrar em ata o custo honesto do trimestre — R$ 165 a 360 mil, dos quais R$ 60–140 mil são compliance que não produz um único lote


---

## Confiança como produto: o dono não compra autenticidade, compra que o bem dele não rode

**Tese submetida a refutação:** O que faz o dono preferir a WebLuxury ao corretor conhecido não é laudo nem selo — é a única coisa que o corretor estruturalmente não pode oferecer: circulação controlada e auditável do bem (8 a 12 destinatários, cegos, com registro emitido), somada à procedência do bem que ele vai RECEBER na troca; escrow entra como serviço de terceiro regulado que a casa coordena e nunca opera, e a tensão portal-vs-boutique se resolve por uma trava numérica — a admissão só cresce enquanto a taxa de reprovação publicada ficar em 20% ou mais.

## 1. O inventário da confiança — e a inversão que ninguém nomeou

Discordo da ordem que o Especialista de Luxo pôs em ata. Ele colocou a reputação nominal do Cleber em primeiro. Reputação do porteiro compra a **primeira ligação**; não é ela que faz um homem entregar um relógio de R$ 1,5 milhão a uma plataforma em vez de ao corretor com quem almoça há dez anos. E reputação é estoque que se gasta: cada operação consome um pouco e nenhuma repõe, até existir protocolo.

O dono não tem medo de autenticidade — a peça é dele, ele sabe que é verdadeira. Ele tem três medos, nesta ordem: **que o bem rode** (circule em vinte grupos de WhatsApp, "todo mundo já viu", e o preço desabe), **que o bem que ele vai receber na troca esteja podre**, e **que o dinheiro não apareça**. O corretor conhecido é péssimo no primeiro: o método dele é literalmente jogar a peça em quinze grupos. Estimo perda de **5% a 12% no preço de liquidação** de peça exposta a mais de 20 destinatários em 30 dias — estimativa minha, não medição, e a mesa deve tratá-la como hipótese testável no piloto.

Isso reposiciona o cap de 8–12 destinatários: ele foi aprovado por qualidade de preço e por antitruste, e é também **preservação de valor do ativo**. Vira produto com nome e papel: **Registro de Circulação Controlada** — uma folha, emitida ao dono, com data de abertura, número exato de destinatários, confirmação de que nenhum recebeu identificador registral nem identidade das partes, e a cláusula de não-circunvenção de 12 meses assinada por todos. Custo: **R$ 0**. Nenhum concorrente do país emite isso, e o corretor conhecido não pode emitir porque o modelo dele é o oposto.

A inversão que faltava: **na permuta, o dono do bem de luxo vira comprador de um bem que ele não sabe avaliar.** O relojoeiro que aceita um carro tem zero competência para julgar sinistro, gravame ou chassi remarcado. A confiança que ele compra não é sobre a peça dele — é sobre a **outra ponta**. Este é o produto, e é exatamente o que a mesa já orçou como laudo de terceiro credenciado.

| # | Mecanismo | Custo | Complexidade | Ano 1 |
|---|---|---|---|---|
| 1 | Circulação controlada + registro emitido | R$ 0 (contrato) | Baixa | **Sim** |
| 2 | Procedência do bem que ENTRA (laudo + gravame + roubados) | R$ 1.500–3.500 + R$ 15–60 de consultas | Média | **Sim, cobrado** |
| 3 | Liquidação por terceiro regulado (escrow) | 0,13%–0,45%, piso R$ 500 | Média | **Sim, opcional** |
| 4 | Curadoria de quem entra com reprovação publicada | R$ 1.200–2.500 único + R$ 600–1.200/ano | Média | **Sim** |
| 5 | Laudo do próprio bem | R$ 1.500–3.500 | Baixa | Sim, cobrado |
| 6 | Discrição operacional (nunca circula a pessoa) | R$ 0 | Baixa | **Sim** |
| 7 | Seguro de RC do credenciado | R$ 3–12 mil/ano (estimativa) | Média | Parcial |
| 8 | Garantia de recompra / piso da casa | Passivo aberto | Alta | **Não — nunca** |

## 2. Escrow: segurança de pagamento sem a casa tocar no dinheiro

Três camadas por faixa de volta em dinheiro (a permuta pura, sem volta, não precisa de escrow — precisa de condição resolutiva):

- **Até R$ 100 mil:** split com retenção via instituição de pagamento. Iugu publica **Pix 0,99%, cartão 4,99%, boleto R$ 1,99**. O fee da casa sai por split no ato do sinal; o valor do bem não transita pela WebLuxury.
- **R$ 100 mil a R$ 6 milhões, com carro na operação:** **Conta Notarial** (Lei 14.711/2023, Provimento CNJ 197/2025, Banco Safra em convênio com o CNB, valores em nome do CNB). **0,45% de R$ 100–300 mil, 0,35% de R$ 300–500 mil, 0,13% acima de R$ 6 milhões, piso R$ 500, retenção de 180 dias** — folgado para o desenho de sinal em D+2 e saldo em D+15.
- **Relógio e joia:** **correção ao parecer do CFO.** O rol de casos de uso do escrow notarial nomeia compra e venda de **imóveis e veículos**. Relógio e joia não estão nomeados, e o tabelião pode recusar. Ninguém promete cartório para relógio antes de duas cotações escritas — dois cartórios e uma instituição de pagamento (Celcoin, QI Tech, Grafeno), na semana 1, custo R$ 0.

**Quem paga:** quem paga a volta em dinheiro. **A casa cobra R$ 300–800 de coordenação documental** e não é parte, não é interveniente, não é beneficiária de liberação condicionada — ser beneficiária a transforma em garantidora.

O caminho do Chrono24 está fechado para nós: escrow "gratuito" bancado por **6,5% do vendedor particular, 2%–8% do dealer e €199–2.199/mês de assinatura**, sobre 600 mil visitantes/dia. Em bem de R$ 500 mil, 6,5% são R$ 32.500 contra R$ 3.500 do nosso fee.

**Texto permitido, literal:** *"O pagamento é liquidado em conta vinculada operada pelo [Tabelionato X / instituição autorizada pelo Banco Central]. A WebLuxury não recebe, não retém e não movimenta valores."*

**Texto proibido, literal:** "compra garantida", "transação protegida pela WebLuxury", "escrow WebLuxury", "seu dinheiro fica seguro conosco", "garantimos o negócio", "segurança de transacionar dentro do app". Art. 30 e art. 37 do CDC: informação precisa vincula, e promessa de garantia sem lastro é o art. 14 esperando data.

## 3. Loja de carro premium — três razões, com número

**1. Originação de estoque sem passado.** É a dor nº 1 dela: vender ela sabe, comprar bem é o gargalo. O carro de permuta vem de dono único, com manutenção, sem histórico de leilão — e carro com passagem por leilão registrada carrega **8% a 15% de desconto na revenda mais R$ 3–15 mil de recondicionamento** (estimativa). Nosso custo: **R$ 0/mês e fee fixo de R$ 1.800 num ticket de R$ 100–400 mil — 0,45% a 1,8%**, contra ~5% de comissão de arrematante em leilão. **Três a onze vezes mais barato.**

**2. O relógio parado no cofre dela.** Toda loja de carro premium já pegou um relógio ou uma joia como parte de pagamento e não soube liquidar. É o fluxo reverso, e é o que faz a reunião virar na primeira frase.

**3. A venda que trava por contrapartida fora da categoria.** Permuta carro-por-carro ela já faz. O que ela recusa é relógio, barco, imóvel. Âncora: **18% das transações de imóvel de luxo em SP tiveram permuta em 2024, projeção de 22% em 2025** — CBIC via fonte secundária, **proibido em material externo sem verificar a publicação original.**

> **Pitch de uma página (Cleber, na reunião)**
>
> "Você compra carro de leilão. Vem com passado, você paga recondicionamento e perde na revenda porque o histórico fica registrado.
>
> Eu tenho outro canal. Meu cliente compra um relógio de R$ 800 mil e quer dar o carro dele como parte do pagamento. Esse carro tem um dono, manutenção em dia e nunca foi leilão. Eu não mando esse carro para o mercado inteiro: mando para 8 a 12 lojas que declararam apetite para exatamente esse carro, cada uma dá o número dela sem ver o das outras, e o dono escolhe.
>
> Para entrar na lista você não paga nada, nunca. Preenche uma ficha de 12 campos dizendo o que compra, em que faixa e em que praça. Você recebe convite, responde ou declina em 72 horas.
>
> Se você levar o carro, paga R$ 1.800 de taxa fixa. Num carro de R$ 300 mil isso é 0,6%. No leilão você paga 5%, ou R$ 15 mil.
>
> Uma condição: enquanto o lote estiver aberto, você não fala com o dono. Quem fala é a casa. Isso protege você também — na semana em que for o seu bem, ele não vai rodar em vinte grupos.
>
> E o inverso: quando entrar um relógio na sua mesa, você me manda. Você não vai mais recusar venda por causa disso."

## 4. Institucionalizar "o Cleber não erra"

**Publica-se:** o protocolo de admissão numerado (3–5 dias de trabalho); a **taxa de reprovação trimestral** ("de 61 CNPJs avaliados, 19 reprovados — 31%"); o tempo mediano até a primeira faixa indicativa; e um **registro de incidentes com desfecho** — instituição não é quem não erra, é quem tem procedimento escrito para o erro.

**Não se publica** — e aqui corrijo o pedido do grupo: **histórico de negócios concluídos, no formato imaginado, é proibido.** Bem, valor, praça e data reconstroem patrimônio de UHNW, e no Brasil isso é risco físico, não só LGPD. Publica-se contagem e mediana de prazo, jamais o registro individual.

**A transferência, com calendário:** o Cleber sai de uma etapa por trimestre, nesta ordem — triagem documental, laudo, roteamento, adjudicação. **Da admissão ele não sai no ano 1.** Comitê de três nomes, ao menos um que não seja sócio, com ata escrita, e `motivo_da_escolha` obrigatório em toda adjudicação.

## 5. O repasse — quando fortalece, quando suja

**Fortalece** quando o bem sai pela porta da frente: lote aberto, cap registrado, adjudicação com motivo, fee fixo. É o que a rede existe para fazer.

**Suja** em três situações, e todas têm regra:

1. **A casa (ou o sócio como PF) no polo comprador.** Proibido. Se um dia existir PJ compradora com capital próprio, **ela não usa a marca WebLuxury** e entra como um dos 8–12, sem preferência.
2. **O bem reaparece na vitrine da marca com preço maior.** Regra: campo `origem = lote_webluxury` obrigatório, e **bem com essa origem não entra na vitrine sob a marca por 90 dias**. O dono original não pode abrir o site e ver o próprio carro 25% mais caro com o nosso logo em cima.
3. **Fee cobrado duas vezes pelo mesmo bem.** Regra: **fee de adjudicação uma vez por lote; segunda passagem do mesmo bem em 180 dias é gratuita.** Senão a casa passa a lucrar com bem que não gira e ganha incentivo em circular problema.

Rodapé fixo em toda página: *"A WebLuxury não compra, não vende e não é proprietária de nenhum bem anunciado."*

## 6. A tensão: onde fica o ponto

A marca não encolhe por ser aberta. Encolhe por ficar **indistinta** — quando ser membro deixa de significar alguma coisa. A assimetria já aprovada resolve o eixo errado do problema (fechado onde a marca assina, aberto onde ela não assina). O que falta é a trava.

**A regra dos 20%: a admissão de anunciantes sob a marca pode crescer sem teto enquanto a taxa de reprovação trimestral publicada ficar em 20% ou mais. No trimestre em que cair abaixo disso, a admissão congela até o trimestre seguinte.** Converte a briga boutique-vs-portal num número auditável: você só cresce tão rápido quanto consegue reprovar. Cem anunciantes com 30% de reprovação publicada é instituição; trinta com 2% é recibo.

O que escala não é a lista — é o **protocolo**. E protocolo escrito custa R$ 0 de licença e sobrevive ao Cleber sair da sala, que é a pergunta que a rodada de hoje estava fazendo.

**Ações propostas:**
- SEMANA 1 — Cotar por escrito, custo R$ 0: dois tabelionatos (conta notarial, Provimento CNJ 197/2025) e uma instituição de pagamento (Celcoin, QI Tech ou Grafeno). Pergunta específica ao cartório: aceita relógio e joia como objeto, ou o rol de imóveis e veículos é taxativo na prática? Nada de escrow se promete em texto antes das três respostas.
- SEMANA 1 — Escrever e colar no contrato de adesão e no rodapé do site as duas listas de texto: frases permitidas ('o pagamento é liquidado em conta vinculada operada por [terceiro]; a WebLuxury não recebe, não retém e não movimenta valores') e frases proibidas ('compra garantida', 'transação protegida pela WebLuxury', 'escrow WebLuxury', 'segurança de transacionar dentro do app'). Base: arts. 14, 30 e 37 do CDC.
- SEMANAS 1–2 — Criar o Registro de Circulação Controlada: uma folha emitida ao dono do bem com data de abertura do lote, número exato de destinatários, atestado de que nenhum recebeu identificador registral ou identidade das partes, e a não-circunvenção de 12 meses assinada. Custo R$ 0. É o único produto de confiança que o corretor conhecido não pode replicar.
- SEMANAS 1–2 — Escrever o protocolo de admissão numerado (3–5 dias de trabalho), instituir comitê de três nomes com pelo menos um não-sócio e ata escrita, e fixar em ata o calendário de saída do Cleber: uma etapa por trimestre — triagem documental, laudo, roteamento, adjudicação — permanecendo na admissão durante todo o ano 1.
- SEMANA 2 — Fixar em ata as três regras de repasse: (a) a casa e os sócios como PF nunca no polo comprador, e eventual PJ compradora futura não usa a marca; (b) campo origem=lote_webluxury obrigatório, com bloqueio de 90 dias para o bem voltar à vitrine sob a marca; (c) fee de adjudicação uma vez por lote, segunda passagem do mesmo bem em 180 dias isenta.
- SEMANA 2 — Aprovar a regra dos 20%: admissão de anunciantes sob a marca cresce sem teto enquanto a taxa de reprovação trimestral publicada ficar em 20% ou mais; abaixo disso, admissão congelada até o trimestre seguinte. Publicar a taxa, o tempo mediano até a primeira faixa indicativa e um registro de incidentes com desfecho — nunca o histórico individual de negócios (valor, bem, praça e data reconstroem patrimônio de UHNW).
- SEMANAS 2–7 — Usar o pitch de uma página como roteiro das ligações de recrutamento da lista de absorção de carro premium, na ordem: originação sem passado (0,45%–1,8% de fee contra ~5% de leilão), o relógio parado no cofre da loja, e a venda que trava por contrapartida fora da categoria. Não citar o dado CBIC de 18%/22% em material externo enquanto a publicação original não for localizada.
- PILOTO — Medir a hipótese da peça queimada: registrar, em cada lote, número de destinatários e VLG adjudicado, e comparar contra bens que circularam por fora antes de entrar. A perda estimada de 5%–12% para exposição acima de 20 destinatários é hipótese minha, não medição, e o piloto é a única chance barata de testá-la.


---

## A TESE DE DADOS E A CAMADA DE IA: O ANÚNCIO É CENSO DE OFERTA, O LIVRO DE LANCES É O ATIVO, E A IA É ENCANAMENTO

**Tese submetida a refutação:** Portal acumula preço pedido — commodity que a OLX tem em volume mil vezes maior e que juridicamente nem é nosso; o ativo que ninguém no Brasil tem é o livro de lances cegos de permuta cross-categoria, que só o lance cego produz (a mesa colaborativa do Cleber produz um número negociado e nenhuma dispersão), e a IA legítima aqui é extração, deduplicação e recuperação de comparáveis — R$ 400-1.500/mês —, nunca matching, nunca precificação, nunca laudo e nunca agente autônomo.

## 1. Os três dados, e o preço de cada um

**Dado de oferta.** É o que o portal captura: o que existe, o preço *pedido*, tempo de vitrine, curva de reprecificação. Com 400–600 anúncios vivos × ~40 campos são **16 a 24 mil pontos** [estimativa] de uma classe que a OLX tem em volume mil vezes maior. Custo de captura: quase zero, via ingestão por feed. Valor: quase zero — e há dois agravantes que a mesa não registrou. Primeiro, ele **apodrece**: preço pedido com 60 dias é ficção. Segundo, **ele nem é nosso** — o anunciante é o controlador do dado do próprio estoque; a casa é operadora. Vender ou publicar isso identificado exige base legal que não temos.

Correção à ata: "400–600 anúncios vivos" é uma boa meta **operacional** (L é endógeno) e uma péssima meta **de dado**. As duas foram sendo tratadas como uma só.

**Dado de demanda.** Normalmente é o caro: exige audiência, log de busca, e mesmo assim é endógeno — o cliente só busca o que está listado, então o dado confirma o próprio catálogo. Aqui está o achado desta cadeira: **a WebLuxury captura demanda declarada sem audiência nenhuma.** Dois instrumentos já aprovados fazem isso. Os **oito campos de aceite** declaram a demanda do anunciante (o que ele aceita como pagamento, até que teto, com que volta mínima). A **Ficha de Apetite de doze campos** declara a demanda do absorvedor (o que compra, em que faixa, em que praça, à vista até quanto). Somando: 90–150 fichas × 12 campos mais 400–600 anúncios × 8 campos = **4.300 a 6.600 declarações de demanda com CNPJ vinculado** [estimativa], por R$ 15–45 mil de telefone. Isso é qualitativamente superior a log de busca: é intenção assinada, não curiosidade com cookie.

Contrapartida honesta: **apetite perece**. Regra que peço em ata — ficha versionada com `data_de_coleta`, reconfirmação a cada 90 dias, e ficha não reconfirmada sai do disparo automático e entra na fila do gestor. Apetite de 90 dias atrás roteado como verdade é o jeito mais rápido de queimar a lista.

**Dado de transação.** O que fechou, por quanto, contra o quê. Ninguém no mercado brasileiro de luxo tem, e não por incompetência: não existe transação cross-categoria registrada em lugar nenhum. Só nasce dentro do lote.

## 2. O ativo não é o preço fechado — é o livro de lances

Aqui divirjo de quase todas as cadeiras, inclusive de quem já disse que "40 adjudicações valem mais que 600 anúncios". Valem — **mas só se carregarem o contrafactual.**

Uma adjudicação com apenas o número vencedor é **um ponto**. Um lote com 4 faixas indicativas e 2–3 lances firmes é **4 a 6 pontos com dispersão medida**: quanto o segundo colocado ofereceu, quanto o quarto, quantos declinaram e por qual motivo. Quarenta lotes com livro de lances = **160 a 240 observações de preço com distribuição conhecida**; quarenta mesas colaborativas = 40 números negociados e zero contrafactual.

**Isto é um argumento de dado a favor do lance cego e contra a mesa obrigatória do Cleber, e ele é independente do argumento antitruste.** A mesa produz acordo; o lote produz distribuição. Sem distribuição não há tabela de reserva, não há banda de comparáveis própria e não há virada a marketplace — há um portal com anúncio velho.

O que cada lote precisa gravar, além do já listado pelo CTO: `vlg_1`, `vlg_2`, `vlg_mediano`, `n_lances`, `n_elegiveis_antes_do_cap`, `motivo_do_declinio` (enum), `referencia_publica_no_ato` (FIPE/tabela do dia, congelada) e `desagio_apurado = 1 − vlg_adjudicado ÷ referencia`. E o **delta VLG₁−VLG₂ tem uso gerencial desde o lote 1**: abaixo de ~3% o cap de 8–12 está grande demais e estamos queimando atenção de dealer; acima de ~15% a lista está rala naquela célula. É o único termômetro objetivo de calibragem do motor [estimativa das faixas].

## 3. Quanto vale e em quanto tempo acumula

Sejam honestos sobre o volume do ano 1: 50–80 lotes abertos, 40–60% adjudicados, **20 a 48 linhas de transação com livro de lances** [estimativa a partir das metas do piloto]. Isso não é produto de dado para vender. É tabela de reserva.

**Dois limiares, dois produtos** — e discordo frontalmente do número de 1.500–2.500 fechamentos que circulou nesta mesa: ele é o limiar de um **índice público por UF**, não o da ferramenta que precisamos.

- **Tabela interna de reserva e de banda:** célula = categoria × 3 faixas de valor, nacional (o lote é roteado nacionalmente, então UF é filtro, não célula). São **6 células × 12 lotes = 72 adjudicações**. A 4–6 por mês em regime, **12 a 18 meses** a partir da primeira. Executável.
- **Índice publicável a terceiros:** 300–500 por célula. Não acontece no ano 1 nem no ano 2. Quem vender antes disso está vendendo opinião com cabeçalho.

**O valor real é interno e é de retenção, não de venda.** Reserva bem calibrada derruba lote deserto: se a deserção cair de 40% para 25% em 60 lotes/ano, são 9 adjudicações a mais, **R$ 16–31 mil/ano** de fee [estimativa]. Pequeno. O grande é outro: o **relatório mensal da célula** devolvido ao anunciante — "no seu segmento, o lance vencedor ficou em 82% da referência, n=11, últimos 90 dias" — é a justificativa da mensalidade de R$ 1.500–3.000 a partir do mês 4. Vinte e quatro a trinta membros = **R$ 430 mil a R$ 1,08 milhão/ano de MRR** cuja razão de existir é esse dado. **O dado não se vende: ele sustenta a mensalidade.** Compradores externos plausíveis (banco de financiamento de bem de luxo, seguradora, incorporadora que aceita permuta) existem, mas só depois do segundo limiar.

## 4. A camada de IA, capacidade por capacidade

| Capacidade | Prateleira hoje? | Custo | Ganho real | Veredito |
|---|---|---|---|---|
| Extração de ficha (foto + texto → JSON) | Sim, VLM | R$ 0,05–0,40/anúncio; 600 = R$ 30–240 | ~40h de digitação | **Entra mês 1** |
| Normalização e dedup de estoque por feed | Sim, embedding + regra | R$ 3–8 mil de setup | Sem isso o feed é inutilizável | **Entra mês 2** |
| Recuperação de comparáveis | Sim, como *busca*, nunca como *geração* | R$ 300–800/mês | Banda com n, fonte e data | **Entra pós-dia 90** |
| Triagem de compliance | Sim, mas regra primeiro | ~R$ 0 | Sinaliza fracionamento e divergência | **Sinaliza, nunca decide** |
| Rascunho de ficha do lote e de dossiê | Sim | incluso | Padroniza despersonalização | **Sim** |
| Matching de apetite × bem | — | — | — | **Fantasia** |
| Rascunho de laudo | — | — | — | **Vetado** |
| Motor autônomo | — | — | — | **Fantasia** |

Três justificativas, porque veredito sem mecanismo não vale nada:

**Matching não é IA, é `WHERE` com quatro filtros.** Com 60 fichas e 12–20 lotes por trimestre não há o que aprender. Pior: **um ranqueador aprendido é juridicamente indefensável aqui.** A ata determinou que a ordenação dos destinatários seja por critérios objetivos e publicados — é exatamente isso que separa distribuição de oportunidade (lícita) de alocação de resultado (art. 36, §3º, I). Modelo que não se explica em uma linha não sobrevive ao parecer concorrencial. A ordenação tem de ser **fórmula escrita**, não peso treinado.

**Precificação por modelo é a proibição nº 5 com roupa nova.** Número gerado por modelo, entregue como referência da casa sobre um bem de R$ 500 mil, é laudo sem lastro e sem apólice. O que o modelo pode fazer é *recuperar linhas* com fonte e data; quem calcula a mediana é código determinístico, e abaixo de n=5 não publica.

**Laudo-rascunho escrito pela casa contamina a independência do terceiro credenciado** — que é justamente o desenho que nos tira da cadeia de fornecimento. A linha é limpa: **a IA redige aquilo por que a casa responde; nunca aquilo que um terceiro assina.**

**"Motor que funciona sozinho"**: o sinal de recompensa chega 30–60 dias depois da ação, a 4–6 amostras por mês. Um laço de aprendizado com essa latência e esse volume leva anos por iteração — e o primeiro erro autônomo custa uma relação de 27 anos. E há o art. 20 da LGPD: nenhuma decisão automatizada com efeito jurídico (elegibilidade, exclusão do roteamento, flag de PLD) sem revisão humana registrada.

Sobre **resumo de mesa**: transcrever e resumir interação 1-a-1 do lote, sim. Transcrever reunião entre concorrentes da mesma categoria e guardar, **não** — isso não é produtividade, é produção de prova. Se a mesa entre categorias diferentes acontecer, o artefato é ata com pauta escrita e revisão humana, arquivada como peça de compliance.

Custo total da camada legítima: **R$ 400–1.500/mês de API e R$ 20–45 mil de construção**, quase tudo depois do dia 90 — exceto extração e dedup, que são pré-requisito da ingestão por feed.

## 5. "Usar os dados deles a favor" — a frase sai da ata

Não por pudor: por consequência. Ela é o tipo de frase que aparece grifada em petição inicial e em contranotificação de membro. E o dano operacional é anterior ao jurídico — membro que suspeita degrada o feed, tira campo e conversa com os pares, nessa ordem, e quem percebe primeiro é o que tem o melhor estoque.

**A linha é esta: o dado do membro volta para o membro identificado; sai para o mercado só agregado.** Regra de governança, cinco linhas, custo R$ 0, entra no contrato de adesão:

1. **Finalidade declarada e fechada.** Dado transacional de membro serve para (i) rotear o lote, (ii) devolver relatório ao próprio membro, (iii) compor índice agregado. Nada mais — e por escrito: a casa **não usa dado de membro para originar venda concorrente**.
2. **Régua de publicação.** Só agregado, anonimizado, defasado 90 dias, com **mínimo de cinco fontes distintas por célula**, sempre como faixa (P25–P75) com n declarado, nunca valor pontual, nunca por membro, nunca por praça abaixo de n=5.
3. **Nunca sai, em nenhuma forma:** preço pedido individual identificado, VLG de perdedor com identidade, apetite nominal de qualquer membro, base de clientes, e — o mais sensível — **o par bem-principal↔bem-de-contrapartida quando identificável**, porque esse par é o patrimônio de uma pessoa física, não um dado de mercado.
4. **Espelho mensal.** Todo membro recebe o dado dele mais o agregado da célula dele. Dado devolvido é retenção; dado apropriado é litígio.
5. **Trava estrutural, e é ela que torna as quatro anteriores críveis:** a casa não tem estoque, não pode ser adjudicatária e não origina comprador em concorrência com o membro. **O veto ao item 4 deixa de ser só decisão de capital e passa a ser a garantia de que a promessa de dado é executável.** Plataforma sem estoque próprio é a única que pode prometer isso sem mentir.

Nota de propriedade que muda a estratégia: o dado de **anúncio** é do membro; o dado do **lote** (convite, lance, adjudicação, fee) é da casa, porque a casa é parte da operação que o gera. Mais um motivo para o ativo ser o livro de lances e não a vitrine — é o único dos dois que é nosso.

## 6. LGPD, em duas frases operacionais

**Primeira:** CNPJ e descrição de bem não são dado pessoal, mas placa, chassi, número de série, matrícula, CPF, nome, telefone e endereço são — e o desenho já aprovado (identificador fica na casa, ao lote vai só o *atestado* de consulta) é o que impede reidentificação por consulta de R$ 15–60; a base legal do roteamento é execução de contrato com o membro (art. 7º, V) e legítimo interesse com RIPD escrito quanto ao cliente final, **jamais consentimento genérico para compartilhar com todos os vendedores, que é nulo pelo art. 8º, §4º**.

**Segunda:** a base de eventos de transação pode ser mantida sem prazo **desde que desidentificada** (dado anonimizado sai do escopo da lei, art. 12) — o expurgo de 24 meses vale para a camada identificada —, e nenhuma decisão com efeito jurídico sobre membro ou cliente (elegibilidade, exclusão do roteamento, flag de PLD, recusa de credenciamento) pode ser automatizada sem revisão humana registrada (art. 20), o que na prática significa que todo flag de IA nasce com um campo `revisado_por` e `data_da_revisao`.


**Ações propostas:**
- Trocar a meta de dado na ata: '400-600 anuncios vivos' permanece como meta operacional (L endogeno) e deixa de ser meta de dado; a meta de dado passa a ser 'lotes com livro de lances completo' - minimo 3 faixas indicativas e 2 lances firmes registrados por lote.
- Gravar por lote, desde o lote 1, os campos que produzem o ativo: vlg_1, vlg_2, vlg_mediano, n_lances, n_elegiveis_antes_do_cap, motivo_do_declinio (enum), referencia_publica_congelada_no_ato e desagio_apurado. Retrofit nao existe.
- Usar o delta VLG1-VLG2 como termometro gerencial semanal do cap: abaixo de ~3% o cap de 8-12 esta grande demais; acima de ~15% a lista da celula esta rala. Estimativa a ser calibrada com os 20 primeiros lotes.
- Versionar a Ficha de Apetite com data_de_coleta e reconfirmacao a cada 90 dias; ficha nao reconfirmada sai do disparo automatico e vai para a fila do gestor.
- Fixar os dois limiares de dado em ata, para nao se venderem promessas: tabela interna de reserva a 72 adjudicacoes (6 celulas x 12), alcancavel em 12-18 meses; indice publicavel a terceiros a 300-500 por celula, fora do ano 1 e do ano 2.
- Aprovar a camada de IA em duas ondas: extracao de ficha (R$ 0,05-0,40 por anuncio) e deduplicacao de feed (R$ 3-8 mil de setup) nos meses 1-2, por serem pre-requisito da ingestao por feed; recuperacao de comparaveis, triagem de compliance e rascunho de dossie so apos o dia 90. Teto da camada: R$ 400-1.500/mes de API e R$ 20-45 mil de construcao.
- Vetar por escrito quatro usos de IA: matching aprendido (a ordenacao de destinatarios tem de ser formula escrita e publicada, por exigencia antitruste), preco gerado por modelo entregue como referencia da casa, rascunho de laudo (contamina a independencia do terceiro credenciado) e qualquer agente autonomo com efeito juridico (art. 20 LGPD).
- Retirar da ata a frase 'pegar os dados deles e usar a favor' e substituir por 'devolver o dado ao membro e publicar apenas o indice agregado' - a formulacao atual e prova documental contra a casa.
- Inserir no contrato de adesao a regra de governanca de dados em cinco linhas: finalidade fechada, regua de publicacao (agregado, anonimizado, defasado 90 dias, minimo 5 fontes, faixa P25-P75 com n declarado), lista do que nunca sai (incluido o par bem-principal x bem-de-contrapartida), espelho mensal ao membro e trava estrutural de ausencia de estoque proprio. Custo R$ 0.
- Registrar em ata que o veto ao item 4 (compra do bem com capital proprio) passa a ter uma segunda justificativa, independente da de caixa: sem estoque proprio, a promessa de nao competir com o membro e verificavel; com estoque, ela e inexequivel e a rede se desfaz.
- Registrar a divergencia de dado contra a mesa obrigatoria do Cleber: lance cego produz distribuicao (4-6 pontos por lote, 160-240 observacoes em 40 lotes); mesa colaborativa produz um numero negociado e nenhum contrafactual. O argumento e independente do antitruste.
- Separar por escrito, no anexo LGPD, a titularidade dos dois dados: anuncio e do membro (a casa e operadora); lote, convite, lance, adjudicacao e fee sao da casa, que e parte na operacao. So o segundo e ativo vendavel.


---

## Mesa colaborativa e lance cego não competem: o lance monta o preço de cada perna, a mesa monta a operação — e a mesa só se abre entre adjudicatários

**Tese submetida a refutação:** As duas mecânicas operam em objetos diferentes — o lance cego dentro de uma perna (concorrentes disputando o mesmo bem, produz preço) e a mesa sobre a cesta (um adjudicatário por perna, mercados distintos, produz estrutura) —, de modo que a mesa só se convoca DEPOIS de fechados os lances de todas as pernas e só com quem já venceu: isso resolve o conflito de desenho e elimina o risco antitruste central, porque ninguém na sala disputa nada com ninguém.

## O conflito é de vocabulário, não de desenho

Passei vinte anos desmontando salas que pareciam legítimas e não eram, e a primeira coisa que faço é perguntar **quem, naquela sala, quer a mesma coisa que o outro**. Aplicada aqui, a pergunta dissolve a disputa da ata.

O lance cego opera **dentro de uma perna**: 8 a 12 dealers da mesma categoria disputando o mesmo bem. São concorrentes horizontais e o que se extrai deles é **preço**. A mesa do Cleber opera **sobre a cesta**: um representante por perna, cada um de um mercado distinto, e o que se extrai deles é **estrutura** — quem leva o quê, em que prazo, quanta volta em dinheiro, quem paga transferência, quem absorve resíduo. Um mecanismo descobre preço; o outro monta a operação. Não são alternativas: são etapas.

A resolução cabe em uma linha, e é a decisão que peço em ata: **a mesa é composta exclusivamente por adjudicatários, um por perna, e só se convoca depois de fechado o lance cego de todas as pernas.** Ninguém entra na sala disputando nada com ninguém. Isso resolve ao mesmo tempo o conflito de mecânica e o núcleo do problema concorrencial.

## O negócio precisa dos dois — e a conta mostra por quê

A promessa dos sócios é viabilizar, não leiloar. Concordo. Mas viabilidade é função de preço, e por isso o lance cego é o motor de viabilização, não o inimigo dele.

Exemplo com os números já aprovados. Relógio anunciado a **R$ 1,5 milhão**, teto de permuta de 70%: o anunciante aceita até **R$ 1,05 milhão em bem** e exige R$ 450 mil de volta. O cliente oferece um apartamento de referência R$ 800 mil e um carro de referência R$ 400 mil.

- **Um comprador por perna** (o conhecido do corretor), deságio de 28%: VLG de R$ 576 mil + R$ 288 mil = **R$ 864 mil**. Gap de viabilidade: **−R$ 186 mil (−17,7%)**. O negócio morre. É exatamente a trava que o Cleber descreve.
- **Lance cego com 8–12 por perna**, deságio comprimido a 14% (a ata já estima a compressão de 25–30% para 8–15%): VLG de R$ 688 mil + R$ 344 mil = **R$ 1,032 milhão**. Gap: **−R$ 18 mil (−1,7%)**.

O lance cego fechou R$ 168 mil dos R$ 186 mil. Os R$ 18 mil restantes nenhum leilão fecha — fecham-se com volta de R$ 468 mil em vez de R$ 450 mil, ou com o adjudicatário do carro subindo R$ 18 mil contra prazo menor. **É esse ajuste que é a mesa.** Mesa sem lance cego tenta pontear R$ 186 mil e não ponteia; lance cego sem mesa deixa R$ 18 mil matarem uma operação de R$ 1,5 milhão. `[deságios estimados; a faixa de 15–25% do digest é inferência declarada, não medição]`

## A regra de decisão — executável hoje

**Só lance cego, sem mesa** (a maioria dos lotes): cesta de um bem, uma categoria, sem volta em dinheiro relevante, prazo dentro da régua. Abre, roteia, adjudica, liquida.

**Mesa convocada** quando ocorrer ao menos um destes gatilhos, todos aferíveis pelo gestor em dois minutos:

1. cesta com **2 ou mais bens de categorias diferentes** (o caso literal do Cleber);
2. **gap de viabilidade entre −15% e 0%** após adjudicadas todas as pernas — abaixo de −15% não se convoca ninguém, declara-se deserto no mesmo dia; em 0% ou acima, liquida direto, mesa é reunião desnecessária;
3. **volta em dinheiro acima de R$ 100 mil** ou dependência de ponte financiada por parceiro regulado;
4. **valor total da operação acima de R$ 1 milhão**;
5. **divergência de prazo entre pernas superior a 15 dias**;
6. **segunda passagem de lote deserto** com faixa relaxada.

Registro a limitação honesta do ano 1: imóvel, barco e aeronave não têm lista roteada. Nessas pernas o gestor obtém **no mínimo dois lances firmes por telefone**, o deságio será pior, e o gap de viabilidade do trimestre será dominado por elas. Isso é medição, não defeito — é o que dirá se vale abrir a terceira lista.

## Antitruste: quando a categoria diferente salva, e quando não salva

**Salva**, cumulativamente e só assim:

1. **um participante por perna**, cada perna em mercado relevante distinto;
2. **nenhum par de participantes com categoria declarada em comum na Ficha de Apetite** — o teste é do CNPJ, nunca do bem. Isto não é preciosismo: a evidência de campo do próprio Cleber (estética automotiva do Ceará e corretor de Balneário entrando em relógio) diz que o dealer brasileiro está virando multicategoria. Corretor que também negocia relógio, sentado com relojoeiro, **é concorrente horizontal** por mais que o rótulo da perna diga "imóvel";
3. **todos já são adjudicatários** — nenhum candidato perdedor ou pendente na sala;
4. **pauta restrita à estrutura de UMA operação identificada**;
5. **ata escrita, assinada e arquivada**, condução da casa por script.

**Não salva** quando: houver dois do mesmo mercado relevante; houver candidato não vencedor; **a casa levar para a sala qualquer número de proposta não adjudicada** — esse é o risco verdadeiro, o hub-and-spoke, com a WebLuxury de hub em todo lote (art. 36, §3º, I, Lei 12.529/2011); a pauta escorregar de "esta operação" para "o mercado" (deságio-padrão, margem, clientes, território); ou **a mesa virar recorrente com a mesma composição**, que é associação de fato com outro nome. Daí uma correção a esta mesa: a **rodada quinzenal de matching** aprovada em 24/07 carrega risco maior que a mesa por lote, porque é recorrente e de composição estável. Ou recebe a mesma pauta, ata e lista negativa, ou volta a ser corretagem 1-a-1.

E o "**somos obrigados a sentar**": obrigação contratual de comparecer a mesa de lote que não se venceu é inexequível e é exatamente o fato do art. 36. O que se obriga é responder ao convite em 72h (já no Termo de Absorvedor) e comparecer **sob pena de perder a adjudicação**. A sanção substitui a obrigação e funciona melhor.

## Condução: quem, quanto tempo, o que fica

**Convoca:** o gestor de rede, sempre — em até 24h da última adjudicação, realizada em até 5 dias úteis. Nunca o anunciante, nunca um adjudicatário: quem convoca é dono da pauta, e a casa precisa ser dona da pauta para a ata valer como defesa.

**Conduz:** o gestor, por script, com papel estritamente procedimental — lê, pergunta, registra, encerra. Não propõe preço, não sugere subir ou baixar, não menciona terceiros. **Cleber não conduz mesa em que é parte**, e ele será anunciante com frequência.

**Participantes:** gestor, anunciante (1 pessoa), 1 adjudicatário por perna. Teto de 5 pessoas. **O cliente final nunca entra** — "um cliente, uma voz" vale aqui com força total. Advogado de participante assiste, não fala.

**Formato:** videochamada gravada com consentimento no primeiro minuto. Nunca grupo de WhatsApp. **45 a 60 minutos, cronometrada.**

**Pauta fixa, cinco itens:** (1) leitura do lote e das pernas adjudicadas com VLG e prazo; (2) declaração de condições por perna; (3) cálculo do gap de viabilidade ao vivo; (4) ajuste, permitido em **quatro variáveis apenas** — volta em dinheiro, prazo de liquidação, quem paga frete e transferência, absorção de resíduo pelo anunciante; (5) assinatura ou insucesso com motivo enum. A **lista negativa é lida em voz alta na abertura** e consta do cabeçalho da ata.

**Fica registrado:** ata de uma página assinada eletronicamente por todos ao final, gravação, e o **Termo de Operação Conjugada** por perna (adjudicatário, VLG, prazo, condição resolutiva, encargos). Arquivo por 5 anos, dentro do dossiê PLD.

**Remuneração:** cada adjudicatário paga o **fee fixo da própria perna** (tabela aprovada), cobrado no sinal via split de Pix. A mesa não é linha nova de receita — é a entrega do **dossiê da operação conjugada, R$ 2–5 mil, cobrado só na liquidação e rateado entre os adjudicatários na proporção do VLG**. Anunciante paga R$ 0 no ano 1, como já decidido. No exemplo acima: R$ 3.500 + R$ 1.800 de fee, mais ~R$ 3.500 de dossiê = **R$ 8.800 numa operação de R$ 1,5 milhão, 0,59%**. Ninguém paga para sentar — taxa de assento é pedágio sobre esperança e reinstala o teto de densidade. E o variável do gestor é **por lote liquidado, nunca por valor nem por deságio**: casa com interesse no preço perde a posição de terceiro neutro, que é o produto.

## O modo de falha e os antídotos

Conversa mole acontece quando ninguém chega com nada em jogo. Cinco travas:

1. **Ninguém entra sem lance firme já dado, vinculante por 5 dias úteis.** A mesa não é onde o preço nasce — é onde números já irrevogáveis são montados. Isso sozinho mata a maior parte da pescaria.
2. **Decisão obrigatória ao final dos 60 minutos:** fecha, fecha com ajuste declarado, ou vai a deserto. Segunda mesa no mesmo lote só uma vez, teto de 48h, e só contra pendência documental nomeada (laudo, gravame, certidão).
3. **Quórum com substituto anunciado:** ausência de adjudicatário no minuto marcado = perda automática da adjudicação, e a perna passa ao 2º melhor VLG, que já sabia estar em espera.
4. **Nada sai verbal.** Saída única é o Termo assinado na sala. Perna que não assina é declarada deserta ali, e o anunciante decide na hora: cancela em bloco ou absorve o resíduo por escrito.
5. **Placar:** no-show custa 90 dias fora do roteamento além da adjudicação perdida.

## Onde discordo das outras cadeiras

O Estrategista chamou mesa e lance de "eixos diferentes". Está certo e é insuficiente: **são etapas sequenciadas**, e o teste do assento é a categoria declarada do CNPJ, não a do bem — sem isso a mesa cross-categoria vira reunião de concorrentes em seis meses.

Ao CTO, que disse que "mesa produz conversa, lote produz campo": produz campo, sim, se tiver documento. Peço quatro eventos — `mesa.convocada`, `mesa.realizada`, `perna.ajustada` (variável e delta), `termo.assinado` / `mesa.sem_acordo` com motivo — e um indicador que hoje não existe no plano: **gap de viabilidade por lote, antes e depois do ajuste**. Em 40 operações ele responde a pergunta que decide a empresa: o negócio falha por **preço** (comprime-se com mais licitantes) ou por **estrutura** (comprime-se com mesa). São investimentos opostos, e sem essa medição escolhe-se no chute.

Última nota, a favor do Cleber contra o instinto desta mesa: a mesa **não adiciona risco** — ela formaliza uma conversa que já acontece hoje, por telefone, sem pauta e sem registro. Sala com pauta escrita, lista negativa lida e ata assinada é a melhor prova de inocência que existe. O que é indefensável não é sentar: é sentar sem papel.

**Ações propostas:**
- Registrar em ata a regra de composição: a mesa é convocada apenas entre ADJUDICATÁRIOS, um por perna, e somente após fechado o lance cego de todas as pernas da cesta — nenhum candidato pendente ou perdedor entra na sala, em nenhuma hipótese.
- Escrever a regra de decisão em uma página e entregá-la ao gestor de rede: só lance cego quando a cesta tem um bem de uma categoria; mesa quando houver 2+ bens de categorias diferentes, gap de viabilidade entre -15% e 0%, volta em dinheiro acima de R$ 100 mil, operação acima de R$ 1 milhão, divergência de prazo entre pernas acima de 15 dias, ou segunda passagem de lote deserto.
- Instituir o teste de assento por CNPJ: nenhum par de participantes pode ter categoria declarada em comum na Ficha de Apetite. Acrescentar à Ficha o campo de categorias declaradas como multisseleção fechada e conferi-lo antes de cada convocação.
- Substituir a 'obrigação de sentar' por sanção: comparecimento obrigatório apenas do adjudicatário, sob pena de perda automática da adjudicação, com a perna passando ao 2º melhor VLG previamente avisado da espera; no-show custa ainda 90 dias fora do roteamento.
- Redigir o Protocolo de Mesa (2 páginas): convocação pelo gestor em 24h, realização em 5 dias úteis, videochamada gravada com consentimento no primeiro minuto, teto de 5 pessoas, 45-60 minutos cronometrados, pauta fixa de 5 itens e lista negativa lida em voz alta na abertura e impressa no cabeçalho da ata.
- Fixar as quatro variáveis de ajuste permitidas na mesa — volta em dinheiro, prazo de liquidação, encargos de frete e transferência, absorção de resíduo pelo anunciante — e proibir expressamente qualquer discussão de deságio-padrão, margem, clientes, território ou operações futuras.
- Proibir por escrito que a casa leve à mesa qualquer número de proposta não adjudicada: os lances dos perdedores morrem na casa. É a trava contra o hub-and-spoke, com a WebLuxury de hub em todo lote.
- Criar o Termo de Operação Conjugada por perna (adjudicatário, VLG, prazo, condição resolutiva, encargos), assinado eletronicamente na própria sala; nada sai verbal, e perna que não assina é declarada deserta ali, com o anunciante decidindo na hora entre cancelar em bloco ou absorver o resíduo por escrito.
- Exigir lance firme vinculante por 5 dias úteis como condição de entrada na mesa, e decisão obrigatória ao final dos 60 minutos: fecha, fecha com ajuste declarado ou vai a deserto. Segunda mesa no mesmo lote só uma vez, em até 48h, e apenas contra pendência documental nomeada.
- Definir a remuneração: fee fixo de adjudicação por perna cobrado no sinal via split de Pix; a mesa entregue como dossiê da operação conjugada (R$ 2-5 mil), cobrado só na liquidação e rateado entre os adjudicatários na proporção do VLG; anunciante paga R$ 0 no ano 1; ninguém paga para sentar.
- Fixar que o variável do gestor de rede é por lote liquidado, nunca por valor da operação nem por deságio obtido — e que Cleber não conduz mesa em que seja parte, por ser anunciante recorrente.
- Instrumentar quatro eventos novos na base append-only — mesa.convocada, mesa.realizada, perna.ajustada (com variável e delta) e termo.assinado / mesa.sem_acordo com motivo enum — e criar o indicador 'gap de viabilidade por lote, antes e depois do ajuste', que dirá em 40 operações se o negócio falha por preço ou por estrutura.
- Incluir o Protocolo de Mesa no objeto do parecer concorrencial de R$ 8-15 mil já contratado na semana 1, ao lado da mecânica de lance cego — e submeter junto a rodada quinzenal de matching aprovada em 24/07, que por ser recorrente e de composição estável carrega risco maior que a mesa por lote.
- Arquivar ata assinada, gravação e Termos por 5 anos dentro do dossiê PLD, e manter o cliente final fora da mesa em todas as hipóteses, sob a regra 'um cliente, uma voz'.
- Nas pernas sem lista roteada no ano 1 (imóvel, barco, aeronave), exigir do gestor no mínimo dois lances firmes obtidos por telefone antes da mesa, e medir separadamente o deságio dessas pernas — é o dado que dirá se vale abrir a terceira lista de absorção.


---

## MALHA REGIONAL: ZERO PRAÇA NO ANO 1 — CORRETAGEM POR OPERAÇÃO, NUNCA REPRESENTAÇÃO NEM FRANQUIA

**Tese submetida a refutação:** A arbitragem geográfica é real mas é de tempo de giro, não de prêmio de preço — e o bem em que ela vale (relógio, joia) já roda nacional por telefone, enquanto o bem que exigiria filial (carro, barco) tem fricção que come o ganho; logo a malha só existe como membro-âncora local remunerado por corretagem por operação (CC art. 722), com captação distribuída e admissão do bem central e indelegável, e nenhuma praça antes de SP entregar 12 lotes adjudicados com 3 absorvedores de outra UF.

## O veredito, antes da conta

A malha de gestores por capital e por categoria está 18 a 24 meses adiantada, e os dois desenhos mais óbvios — assalariado e franquia — são, neste estágio, respectivamente insolvente e juridicamente impossível. O que serve agora não é uma malha: é **um contrato de corretagem por operação com um membro-âncora já existente na praça**, ativado uma praça por vez, sem folha, sem exclusividade e sem taxa cobrada dele. Falo da minha cadeira: o que decide esta pergunta não é o mapa do Brasil, é a natureza do vínculo e a titularidade da lista.

## 1. A arbitragem geográfica é de TEMPO, não de PREÇO — e por isso não precisa de filial

O Nicolas está certo no diagnóstico e a mesa precisa corrigir a unidade. Deslocar um bem de luxo do pool local raramente rende prêmio de preço; rende **giro**. Uso a taxa que esta mesa já adotou no VLG (1,5% a.m. de custo de carrego).

Relógio de R$ 500 mil parado 135 dias numa praça secundária contra 45 dias em circulação nacional: 90 dias economizados = **R$ 22,5 mil de carrego**, menos R$ 800–2.500 de frete segurado. Ganho líquido de ~R$ 20 mil, **4% do valor** [estimativa]. Nosso fee de R$ 3.500 captura 17% do valor criado — o preço aprovado é confortável, e a arbitragem sustenta a conversa comercial.

Carro premium de R$ 300 mil de SP para Belém: cegonha R$ 6–9 mil, vistoria e transferência R$ 2–4 mil, seguro em trânsito 0,3–0,8%. Fricção de **R$ 9–15 mil, 3% a 5% do valor**, contra 60–120 dias de carrego economizado (R$ 9–18 mil). **Ganho líquido entre R$ 0 e R$ 9 mil — metade dos casos dá zero.** Barco e aeronave são piores: o fechamento é registral (Capitania/Tribunal Marítimo, RAB), não logístico.

A conclusão inverte o pedido do Cleber. **A arbitragem vale muito no bem móvel sem registro — relógio, joia, bolsa — que é exatamente o bem que já circula nacionalmente por WhatsApp há uma década, sem filial nenhuma, e é a praça pessoal dele. E vale pouco no bem com registro e frete pesado, que é o único que justificaria alguém na cidade.** Deslocalizar inventário é função de **lista nacional**, não de endereço. O carro do Rio vendido no Pará precisa de um CNPJ paraense na lista de absorção e de um telefone em São Paulo — não de um gestor em Belém.

## 2. Os três desenhos, com preço e com o instrumento jurídico correto

**(a) CLT/PJ contratado por praça — reprovado por insolvência.** R$ 8–15 mil de salário com fator de carga de 1,7–1,8 (INSS patronal, RAT, terceiros, FGTS, 13º, férias, provisão rescisória) = **R$ 13,6–27 mil/mês por pessoa**, mais R$ 1–2,5 mil de deslocamento e ferramenta. Cinco categorias por praça: **R$ 73–147 mil/mês**. A R$ 6.000–6.500 líquidos por operação, **cada gestor precisa de 2,2 a 4,9 operações/mês só para pagar a si mesmo**; a praça inteira pede 11 a 25 operações/mês. O piloto nacional mira 2 a 3 liquidações **por trimestre**. É 15 a 40 vezes a ambição atual.

**(c) Franquia ou licença de praça com taxa — reprovado por impossibilidade documental, antes de qualquer preço.** Cobrar taxa para operar sob a marca é franquia empresarial de fato e cai na **Lei 13.966/2019**: Circular de Oferta entregue **10 dias** antes da assinatura ou de qualquer pagamento, contendo balanços dos **dois últimos exercícios**, relação de todos os franqueados e desligados dos últimos 24 meses, e a **situação da marca perante o INPI**. A NewCo não está constituída, não tem dois exercícios, não tem franqueado nenhum e a verificação INPI da marca está pendente há três sessões. COF ausente ou falha dá ao franqueado o direito de **anular o contrato e exigir a devolução de tudo que pagou, corrigido, mais perdas e danos**. Vender praça agora é criar passivo com recibo. Some-se a falha nº 1 do digest — franquear economia não modelada — e o fato, já registrado pelo Operador, de que não temos base de royalty: temos fee fixo, não comissão recorrente.

**(b) Remuneração por resultado — o único viável, com uma correção de instrumento que ninguém desta mesa fez.** O CFO propôs "CNPJ credenciado com mandato de originação e split de 40–60%". O desenho está certo e o **rótulo está errado, e o rótulo custa dinheiro**. Alguém que agencia propostas em nome da casa, em caráter não eventual, com zona definida, é **representante comercial (Lei 4.886/65)**: exclusividade de zona **presumida** salvo ajuste escrito em contrário (art. 31), aviso prévio de 30 dias ou 1/3 das comissões do trimestre (art. 34), e **indenização irrenunciável de 1/12 de tudo que foi pago ao longo do contrato** na rescisão sem justa causa tipificada (art. 27, "j"; art. 35). Com pessoalidade, habitualidade e meta, vira vínculo celetista.

O instrumento correto é **corretagem/mediação, CC arts. 722 a 729** — que exige, no próprio texto legal, ausência de mandato, de prestação de serviços e de qualquer relação de dependência, e remunera apenas o resultado obtido (art. 725). Traduzindo em cláusula: sem exclusividade territorial, sem meta, sem SLA de dedicação, sem e-mail da casa, sem subordinação, remuneração por lote adjudicado, contrato por operação renovado por adesão.

**Números do desenho (b).** Custo da praça: ativação R$ 3–8 mil (visita, credenciamento, contrato), auditoria por amostragem R$ 3–8 mil/ano, uma visita presencial anual R$ 2–4 mil. **R$ 8–20 mil no ano 1, zero folha.** Receita líquida da casa por lote originado ali: fee de R$ 1.800 menos 45% ao originador = R$ 990, mais margem de laudo (R$ 500–1.200) e dossiê quando houver — **R$ 1.500–2.500 líquidos por lote**. **Ponto de equilíbrio da praça: 4 a 13 lotes adjudicados no ano — cerca de um por mês.** É atingível, e é o único dos três desenhos que é.

**Mas há um limite que decide quem pode ser o gestor.** A 45% de um fee de R$ 1.800, ele ganha R$ 810 por lote. Para tirar R$ 5 mil/mês, precisa de **6,2 lotes/mês — 74 por ano numa única praça**. Não acontece no ano 1 nem no 2. Logo **o gestor regional não pode ser alguém que viva disso**: tem que ser um **membro-âncora que já vive de outra coisa na praça** e para quem o fee é renda marginal e o incentivo real é o próprio estoque. Zero folha, zero passivo trabalhista, zero franquia. Com uma trava que decorre disso e não é opcional: **quem origina o lote não pode ser adjudicatário dele** — pago pela originação, ele deixa de ser candidato, e isso vai ao contrato e ao formulário.

## 3. A ordem das praças — decidida por número medido, não por mapa

Base: **SP**. A segunda praça não é o Rio, e o argumento é do próprio digest: as construtoras que **aceitam permuta de carro** documentadas no Brasil estão concentradas em **Florianópolis/SC**, e o único inbound qualificado do anúncio de R$ 7/dia veio de **Balneário Camboriú**. Sinal de campo bate opinião de mapa.

Ordem proposta: **SP → SC (Balneário/Itajaí/Floripa) → RJ → PR → MG → GO → DF**. Duas ressalvas da minha cadeira: **GO** é praça de agro, com ciclo de safra e propensão a espécie — entra com a regra de somatório de R$ 30 mil em 6 meses ligada desde o primeiro lote; **DF** é a maior densidade de pessoa exposta politicamente do país e exige diligência reforçada em toda ponta, por isso fica por último apesar da liquidez. **Norte e Nordeste ficam fora do ano 1**: Manaus por bem importado sem DI (já é bloqueio nos oito campos) e o Norte pela cadeia de ouro e joia com origem mais contestada do país [avaliação minha; o digest não traz número].

E a ordem se corrige com dado, não com discussão: **a fila das praças é reordenada pela contagem de lotes desertos por UF com motivo "sem fit local" registrada nos primeiros 90 dias.** Se o dado disser Curitiba antes de SC, vai Curitiba.

## 4. Ele vai sair. Projete para a saída, não para a retenção

Originador produtivo de alto valor sai — estimo 30% a 50% em 24 meses. Não-concorrência pós-contratual exequível exige limite de tempo, território, atividade **e compensação financeira**; sem pagar, cai. Doze meses sobre alguém que tirava R$ 6 mil/mês custam **R$ 21,6–36 mil de pura despesa**. Não compre.

Compre o que é barato e exequível: **não-circunvenção de 12 meses sobre lote nominado**, que já está no desenho e não depende de indenização. E projete o resíduo. Quando ele sair, ficam com a casa: a **lista de apetite** (fichas assinadas **com a NewCo**, que é a controladora LGPD — cláusula obrigatória), a **tabela de eventos** por lote com preço de liquidação e o VLG do 1º e do 2º colocado, os **Termos de Absorvedor** assinados com a NewCo, os laudos e dossiês, e a marca. Some com ele o relacionamento — e só ele.

Três alavancas de retenção, todas baratas: **(i)** ele nunca é dono da lista — recebe convites roteados, com permissão por escopo, jamais a base; **(ii) fee residual de 10% a 15%** sobre lotes que ele originou, por 12 meses após a saída, **condicionado ao cumprimento da não-circunvenção** — algema de ouro que custa quase nada e transforma a saída em renda condicionada ao bom comportamento; **(iii)** escalada por volume, nunca por território: quem origina mais recebe mais convites, não mais exclusividade.

A regra dura: **o gestor nunca é a contraparte contratual do membro.** Se o Termo for assinado "com o Fulano", a carteira é do Fulano.

## 5. Compliance descentralizado: captação distribuída, admissão central e indelegável

Quem responde pelo bem captado no Pará é a **NewCo**, e não há desenho que mude isso. Três fundamentos: a obrigação de pessoa obrigada é da PJ que intermedeia e é **indelegável** (art. 9º, Lei 9.613/98); o preponente responde pelos atos de prepostos praticados em seu nome (CC arts. 932, III e 1.178) — credenciado usando a marca é preposto aparente; e perante o comprador vale a solidariedade da cadeia (CDC art. 7º, parágrafo único, e art. 25, §1º). Regresso contra PJ de um sócio sem patrimônio é papel: ninguém recupera R$ 400 mil ali.

A regra, em sete linhas executáveis:

1. **Nenhum bem entra em lote sem admissão do núcleo.** O gestor coleta; quem abre lote é o compliance central, sempre em SP. Um único ponto de decisão.
2. **Checklist registral bloqueante por categoria**, já aprovado em 13/07: carro (gravame, cautelar, CRLV, base de roubados); relógio e joia (nota, série, base de roubados, laudo de terceiro). Para joia captada em UF de garimpo, exigência adicional de cadeia documental do metal — Res. COAF 23/2012 e regime próprio de joalheria.
3. **Nenhum gestor recebe, guarda ou intermedeia dinheiro, em nenhuma hipótese.** Espécie ≥ R$ 30 mil, inclusive por somatório de 6 meses, é comunicação da casa — e o dado nasce no formulário, não na boca dele.
4. **Somatório de fracionamento calculado por praça**, no núcleo. Quem fraciona escolhe a praça com menos olhos; a detecção tem que ser central por desenho.
5. **Quatro gatilhos de escalada obrigatória**, que tiram a decisão do gestor: divergência de laudo acima de 20% da banda; bem em UF diferente da do proponente sem justificativa; proponente com menos de 12 meses de CNPJ; PEP em qualquer ponta. Escalado, o núcleo decide em 48h e registra.
6. **Auditoria por amostragem**: 1 em 5 lotes de gestor novo, 1 em 10 após 20 lotes limpos, R$ 1,5–4 mil por auditoria.
7. **Desligamento imediato por uma única omissão de checklist** — e isso só é exequível no contrato de corretagem; na representação comercial exige justa causa tipificada do art. 35. É mais um motivo para o instrumento da Seção 2.

E o ponto de LGPD que fecha a carteira: **o gestor é operador, não controlador** (art. 39). Instrução por escrito, vedação de base própria, acesso revogável, proibição de WhatsApp pessoal para dado de bem. Se ele operar como controlador, a base é dele — e aí a Seção 4 vira irrelevante.

## 6. O gatilho da primeira praça fora de SP

Cinco condições, todas medidas, todas simultâneas. Sem as cinco, não abre:

1. **Mediana de elegíveis após o filtro duro ≥ 8** em SP — a métrica-mãe do dia 90 já em ata. Abaixo disso o problema é lista, e praça nova não conserta lista.
2. **≥ 12 lotes adjudicados acumulados** em SP, **dos quais ≥ 3 com absorvedor de outra UF** — prova de que a arbitragem funciona **sem** gente na praça. Se funciona sem, a praça é opcional; se não funciona sem, ela não vai funcionar com.
3. **≥ 30% dos lotes desertos** com motivo registrado "sem fit local" — a única evidência legítima de demanda por praça nova.
4. **Fee líquido acumulado ≥ R$ 60 mil** no trimestre anterior. **A praça é paga pela receita da praça anterior, nunca por capital.**
5. **≥ 20 CNPJs absorvedores já na lista naquela UF**, captados por telefone de São Paulo, **antes** de qualquer pessoa credenciada. **A lista precede a pessoa, sempre.** Quem contrata para depois construir a lista contratou um custo fixo para descobrir se existe mercado.

Piso de calendário: nada disso antes do dia 90, e na prática não antes do mês 7.

## Onde discordo desta mesa

Do CFO, no rótulo e no preço: "split de 40–60% ao representante" descreve representação comercial, com indenização de 1/12 e exclusividade de zona presumida embutidas — o desenho dele funciona, mas precisa ser escrito como corretagem, e o percentual deve ser **45% teto**, não 60%, porque a casa carrega lista, protocolo, laudo e o passivo de PLD inteiro. Do Especialista, em um número: 50/50 é generoso demais para quem não carrega risco nenhum. E do Cleber, no ponto que importa: **monopolizar por presença é o caminho caro para o que a lista nacional entrega de graça** — e cinco categorias por praça multiplicam por cinco um passivo de compliance que já é indelegável.


**Ações propostas:**
- Substituir, em ata, a figura do 'gestor regional' por 'membro-âncora originador', remunerado por contrato de corretagem por operação (CC arts. 722-729) — sem exclusividade territorial, sem meta, sem SLA de dedicação, sem e-mail da casa. Vedar expressamente o formato de representação comercial (Lei 4.886/65), que carrega indenização irrenunciável de 1/12 e exclusividade de zona presumida.
- Encerrar a hipótese de franquia ou licença de praça com taxa no ano 1: sem NewCo constituída, sem dois exercícios de balanço, sem franqueado algum e com a marca ainda não verificada no INPI, é impossível produzir Circular de Oferta válida sob a Lei 13.966/2019 — e COF ausente dá ao franqueado direito a anular o contrato e reaver tudo que pagou, corrigido, mais perdas e danos.
- Escrever no contrato do originador e no formulário de lote a trava dura: quem origina o lote não pode ser adjudicatário dele. Custo R$ 0, e sem ela o membro-âncora vira o comprador preferencial da própria praça.
- Fixar o teto de repasse ao originador em 45% do fee de adjudicação (R$ 810 sobre um fee de R$ 1.800), mais R$ 300-500 por Ficha de Apetite concluída e validada — pagar por ficha entregue, não por promessa de praça, dentro dos R$ 150-600/ficha já orçados.
- Instituir o fee residual de 10-15% sobre lotes originados, por 12 meses após a saída do originador, condicionado ao cumprimento da não-circunvenção — e NÃO contratar não-concorrência pós-contratual, que só é exequível mediante compensação financeira (R$ 21,6-36 mil por 12 meses sobre quem tirava R$ 6 mil/mês).
- Cravar em ata que toda ficha, todo Termo de Absorvedor e toda base de dados são assinados e titularizados PELA NEWCO, com o originador na posição de operador LGPD (art. 39): instrução por escrito, vedação de base própria, acesso revogável, proibição de WhatsApp pessoal para dado de bem.
- Escrever a regra de compliance de captação distribuída em uma página: captação distribuída, admissão do bem central e indelegável em SP; checklist registral bloqueante por categoria; nenhum originador toca em dinheiro; somatório de fracionamento calculado por praça no núcleo; quatro gatilhos de escalada obrigatória (divergência de laudo acima de 20% da banda, bem em UF diferente da do proponente sem justificativa, proponente com menos de 12 meses de CNPJ, PEP em qualquer ponta), decididos pelo núcleo em 48h; auditoria por amostragem de 1 em 5 lotes de originador novo; desligamento imediato por uma única omissão de checklist.
- Adotar o gatilho das cinco condições simultâneas para abrir a primeira praça fora de SP: mediana de elegíveis maior ou igual a 8; 12 lotes adjudicados acumulados com pelo menos 3 absorvedores de outra UF; 30% dos lotes desertos com motivo 'sem fit local' registrado; R$ 60 mil de fee líquido no trimestre anterior; e 20 CNPJs absorvedores já na lista daquela UF, captados por telefone de SP antes de qualquer credenciamento.
- Passar a gravar, desde o primeiro lote, o campo 'UF do absorvedor' e o motivo enumerado do lote deserto — é a única evidência que reordena a fila de praças por dado (SC vs. RJ vs. PR) em vez de por opinião, e não existe retrofit.
- Registrar a ordem provisória das praças — SP (base), SC, RJ, PR, MG, GO, DF — com DF por último por densidade de PEP, GO com a regra de somatório de espécie ligada desde o primeiro lote, e Norte/Nordeste fora do ano 1 (Manaus por bem importado sem DI; Norte pela cadeia de ouro e joia).


---

# PARTE IV — VERIFICAÇÃO ADVERSARIAL

*Duas lentes por tese: comportamento real do mercado de luxo brasileiro, e números/caixa/execução. Instrução: na dúvida, refutar. **As dez refutações derrubaram ou corrigiram as cinco teses** — o parecer final incorpora as correções.*


### Refutação 1 — TESE REFUTADA

REFUTO A TESE NO NÚCLEO. Ela acerta uma inversão e erra o comprador, o entregável e a trava. Oito objeções, em ordem de dano.

**1. O produto principal é vendido a quem a casa está proibida de falar.** "O dono" da tese não é membro. No modelo aprovado, o bem de contrapartida pertence ao cliente PF do anunciante — e "um cliente, uma voz" é inegociável desde 13/07. O Registro de Circulação Controlada, "emitido ao dono", só chega até ele por dentro do membro; e o membro não tem o menor interesse em contar ao próprio cliente que o barco dele foi ofertado a onze concorrentes. O lojista vende "eu resolvi", não "eu leiloei seu bem". O artefato-carro-chefe não tem rota de entrega: ou passa por quem não vai entregá-lo, ou a casa rompe a própria regra fundacional. Um certificado que não alcança o medo que ele endereça não é produto.

**2. Controle de circulação é dor de lojista, não de dono.** Comportamento observado no mercado brasileiro: o dono espalha. Ele liga para três conhecidos justamente para descobrir preço, e a preferência revelada dele é mais olhos, não menos. Quem perde com bem queimado é quem tem margem no bem — o consignatário, o lojista, o próprio absorvedor no futuro. O analista escreveu um argumento de retenção do lado absorvedor e o vestiu de pitch de captação do lado do dono. A peça é boa; a posição está errada.

**3. "Auditável" não é auditável.** Quem verifica que disparamos para 9 e não para 30? Ninguém. É contagem autodeclarada em papel nosso. O analista abre desqualificando a reputação do Cleber e fecha pedindo ao dono que confie num documento que o Cleber assina. É a mesma confiança com mais papel. E "o corretor não pode emitir isso" é falso: contenção é grátis, qualquer corretor imprime uma carta dizendo que mostrou a peça para seis pessoas. O que ele não tem é base de apetite preenchida em outra categoria. **A trava não é a disciplina, é a lista.**

**4. Bem de luxo brasileiro não se despersonaliza.** Azimut 55, ano, horas, praça: em Angra são meia dúzia. Patek 5711 com caixa e papel, em SP, é identificado no primeiro WhatsApp. Os 8–12 destinatários se conhecem, se veem em feira e estão nos mesmos grupos. Lance cego entre gente que identifica o bem e os concorrentes em vinte minutos é cego só no formulário. E pior para a tese: num universo desse tamanho, 8–12 especialistas da categoria SÃO o mercado — não existe "resto do mercado" do qual proteger o ativo. A Chrono24 funciona sobre referência fungível; aqui o bem é único e o universo de compradores é a lista.

**5. A não-circunvenção não sobrevive ao primeiro conflito de dinheiro.** O absorvedor paga R$ 0 para estar na lista. Executar a cláusula significa processar um usuário gratuito por R$ 15 mil, num mercado de 40 a 60 nomes relevantes (estimativa), onde o custo reputacional de processar um lojista é maior que os R$ 15 mil. A casa não vai processar. No mês 6 todo mundo sabe disso, e a cegueira vira teatro — com um registro emitido documentando uma disciplina que ninguém faz cumprir.

**6. A trava dos 20% falha em três eixos e colide com um veto vigente.** (a) *Gerenciável pelo denominador:* quem controla a admissão controla o funil; para manter 20%, começa-se a "avaliar" candidatos que nunca se pretendeu admitir. A métrica premia fabricar reprovação e mede a qualidade do funil, não a altura da régua. (b) *Ruído:* com 24–30 anunciantes no ano 1, o trimestre tem 5 a 9 avaliações; uma única decisão move de 14% para 29%. Regra cujo gatilho vira com n=1 não governa nada. (c) *Colisão:* ela exige publicar reprovação. Em 13/07 esta mesa vetou expulsão pública porque contra loja consolidada é convite a ação por difamação. Publicar "19 reprovados de 61" numa praça onde todos sabem quem se candidatou reconstrói nomes por conversa de mercado — é o mesmo ato com planilha na frente, e o reprovado não assinou nada conosco. Acrescente o teste de dinheiro: mês 14, caixa curto, bom candidato na mesa, reprovação em 18%. Ou o número é fabricado, ou a regra é quebrada. Regra que o próprio operador calcula, publica e é punido por não é trava — é promessa de ano-novo.

**7. O escrow cobrado recria o selo que esta mesa vetou há doze dias.** Cobrar R$ 300–800 de "coordenação documental" é ser remunerado pela função de segurança. O art. 14 do CDC pergunta se o serviço que você prestou foi defeituoso, não se você era parte no contrato de custódia. A frase da rodada 3 se aplica inteira: reinventaram o laudo com dez vezes a responsabilidade e um décimo da receita. Operacionalmente: conta notarial pede partes ou procurações, qualificação do tabelião e agendamento — sinal em D+2 numa primeira operação entre um lojista no Pará e um dono em SP é otimista; estimo D+5 a D+10, e é o caixa do vencedor que fica travado. E a inversão que o próprio analista achou e não seguiu até o fim: a rota notarial existe para veículo e imóvel — o lado que já tem DETRAN, gravame e cautelar — e não existe para relógio e joia, que é onde mora o Frankenstein. O produto de segurança nasce onde o risco é menor.

**8. Sobre a ordem: discordo de "reputação é estoque que se gasta".** Neste mercado ela compõe enquanto lastreada em protocolo e só queima quando usada como garantia sem lastro. No ano 1 o produto É o Cleber; o protocolo é o que faz o ano 3 não ser o Cleber. O próprio analista concede isso na seção 4, quando mantém o Cleber na admissão o ano inteiro. Montar os dez primeiros lotes sobre um certificado que ninguém no país nunca viu, em vez de sobre "quem está conduzindo é o Cleber, e está escrito como ele conduz", é jogar fora o único ativo de aquisição que existe hoje.

**O QUE SOBREVIVE — e é o melhor da peça.** A inversão: na permuta, o dono do bem de luxo vira comprador de um bem que não sabe avaliar. O relojoeiro não tem competência para julgar sinistro, gravame ou chassi remarcado, e é aí que existe uma dor que o corretor conhecido de fato não resolve. Sobrevivem também a postura de escrow (terceiro regulado, casa nunca operadora), a lista de texto proibido, e — com força — a proibição de publicar histórico individual de negócios: bem, valor, praça e data reconstroem patrimônio de UHNW, e no Brasil isso é risco físico. Nesse ponto o analista está mais certo do que o pedido do grupo.

**Mas a economia da inversão ficou em aberto.** Os itens 2 e 5 da tabela dele dizem "Sim, cobrado" sem nomear o pagador. Do absorvedor não se cobra — é o lado gratuito, e ele manda o avaliador dele de graça. Do anunciante não se cobra no ano 1 — esta mesa já decidiu zero cobrança para abrir lote. Sem pagador nomeado, o único item que sobrevive da tese não tem receita.

**Ajuste exigido:** **AJUSTES QUE VÃO A ATA — sete, todos executáveis sem código.**

**1. Reposicionar o registro e trocar o adjetivo.** Deixa de ser vendido ao dono e passa a ser **Ata do Lote**, emitida ao ANUNCIANTE (o membro), que decide se e como a usa com o próprio cliente. Enquanto a contagem for autodeclarada, a palavra é "registrada", nunca "auditável". O upgrade que a torna auditável de verdade custa quase nada: **lista de destinatários lacrada com carimbo de tempo antes da abertura do lote, aberta apenas em disputa ou arbitragem**. Aí o número é verificável ex post por um terceiro, e não por um material de marketing.

**2. Vender circulação controlada ao lado que ela protege: o absorvedor.** A frase mais forte do pitch do analista já é essa — "na semana em que for o seu bem, ele não vai rodar em vinte grupos". Fica como argumento de retenção e de adesão ao Termo de Absorvedor. Sai do pitch de captação do dono, onde não tem comprador.

**3. Substituir a trava dos 20% por duas travas exógenas ao operador.** A admissão sob a marca cresce enquanto, no trimestre: **(a) mediana de elegíveis após o filtro duro por lote for ≥ 8** (a métrica-mãe do dia 90 já aprovada) e **(b) taxa de resposta em 72h for ≥ 60% dos convites disparados**. As duas saem do motor, as duas pioram quando a régua cai — membro ruim não responde e não tem fit — e nenhuma exige publicar reprovação. **Publica-se:** protocolo de admissão numerado, mediana de prazo até a primeira faixa indicativa, número agregado de **descredenciamentos** com motivo genérico, e registro de incidentes com desfecho. **Não se publica:** taxa de reprovação, porque o reprovado é identificável na praça e não assinou nada conosco — e histórico individual de negócios, em nenhuma forma.

**4. Escrow sem linha de receita própria.** Zero de "coordenação documental"; o custo entra no fee de adjudicação já aprovado. A casa entrega **lista de três habilitados** (dois cartórios e uma instituição de pagamento) e não escolhe por ninguém. O texto permitido do analista fica como está, literal. E nada sobre escrow entra em material antes de **duas cotações escritas na semana 1** e da verificação documental de tudo que ele citou — Lei 14.711/2023, Provimento CNJ 197/2025, o escalonamento de tarifa, o convênio Safra/CNB e a tabela da Iugu. A regra que ele mesmo aplicou ao número da CBIC vale para a seção de escrow dele: ninguém desta mesa conferiu a publicação original.

**5. Nomear o pagador do laudo do bem que ENTRA — e transformá-lo em teste.** Cobrado **do vencedor, a preço de custo, dentro do lote adjudicado**, com **opção de dispensa assinada** ("dispenso o laudo, faço minha própria vistoria"). Estimativa declarada: 50%–80% de dispensa em carro, onde o lojista tem avaliador próprio, e 10%–30% em relógio. **A taxa de dispensa é a métrica que julga a tese inteira:** se o lojista dispensa, procedência não é produto, é história — e o item cai no primeiro trimestre com evidência, que é a forma mais barata de estar errado.

**6. Matar o blackout de 90 dias e trocar por verdade dita antes.** O bloqueio protege o logo, não o dono: o carro vai para o Webmotors e para o Instagram do lojista no dia 1, e o dono vê do mesmo jeito. Mantém-se o campo `origem = lote_webluxury` para auditoria, e substitui-se o blackout por **uma linha na Ata do Lote, assinada antes da adjudicação: "o adquirente é lojista e revenderá com margem"**. Dono aceita margem que lhe contaram; não perdoa margem que descobriu.

**7. Corrigir a âncora do pitch ao lojista de carro.** Ele não nos compara ao leilão — compara à troca de balcão, que lhe custa R$ 0 e onde ele faz o preço. A primeira frase honesta é **originação**: "esse carro não ia bater na sua porta". Os 5% de comissão de arrematante ficam como argumento secundário; se virarem manchete, o primeiro lojista com calculadora responde "eu pego carro na troca todo dia e não pago R$ 1.800".

**E a ordem do pitch no ano 1, contra o que a tese propõe:** primeiro o Cleber conduzindo, depois o protocolo escrito que descreve como ele conduz, depois a Ata do Lote como artefato de retenção. Protocolo é o que sobrevive à saída do Cleber da sala — mas não é o que abre a primeira porta, e tratá-lo como argumento de aquisição custa os dez primeiros lotes, que são exatamente os que o piloto precisa para existir.


### Refutação 2 — TESE REFUTADA

REFUTO — e refuto pela metade que o próprio analista escreveu com mais convicção: a segunda oração da frase. A primeira metade ("operadora que leva o bem de contrapartida a 8–12 compradores, fee fixo por adjudicação, nunca compra o bem, nunca vende visibilidade") é a ata das rodadas 2 e 3 reescrita com melhor redação, e eu subscrevo. A segunda metade ("nos 90 dias se constrói lista, contrato, base de eventos e dez telas, NÃO motor") é falsa contra a própria tabela dele, colide com duas proibições vigentes e desloca R$ 30–140 mil e 8–14 semanas de fornecedor para dentro de um trimestre cujo capital não foi declarado em três sessões.

**1. A frase-síntese mente sobre a lista que ela mesma resume.** O item 15 da tabela dele é "Balcão de Contrapartida no manual — 12–20 lotes, 2–3 liquidados". Isso é o motor. Ele constrói o motor E as telas, e depois anuncia que não construiu o motor. A ata da rodada 3 (passo 7) determinou o inverso e com todas as letras: 90 dias de Balcão manual com "zero linha de código proprietário", contra R$ 180–400 mil para construir a mecânica antes de saber se alguém responde. A proibição nº 1 de 13/07 ("qualquer linha de código proprietário antes do Gatilho B") continua de pé e o Gatilho B não foi tocado. Ele reabre a proibição mais cara do dossiê sem uma linha de justificativa — o que esta mesa exige de quem reabre.

**2. As dez telas já existem, e custam R$ 0.** A rodada 3 especificou o Balcão como três formulários, uma planilha com uma aba por lote, pasta por lote com acesso por operação, WhatsApp 1-a-1. Confira contra a lista dele: ficha de apetite (formulário), fila de lotes (aba), ficha despersonalizada (aba), faixa indicativa (formulário), lance firme (formulário), adjudicação com `motivo_da_escolha` (coluna obrigatória), log append-only (aba com carimbo e trava de edição). São sete das dez telas dele, entregues em uma tarde, a custo zero, e — o que importa mais — alteráveis no meio do teste, que é exatamente o que um piloto precisa. O que ele orça como "base relacional com tabela de eventos append-only" (R$ 3–8 mil) e "vitrine reduzida com formulário de oferta" (R$ 25–45 mil) é software encomendado a fornecedor para rodar um processo que ainda não tem regra estável. E o preço dele está errado: seis telas com autenticação, dois escopos de membro (anuncia/absorve), upload, campos condicionais de aceite e trilha auditável não saem por R$ 28–53 mil com fornecedor de dev — minha estimativa é **R$ 60–140 mil e 8 a 14 semanas**, o que não cabe nas semanas 3–6 dele e empurra o único entregável de fachada para depois do dia 90. Sobra do item 8 apenas a vitrine em prateleira, que já estava aprovada a R$ 30–80 mil — e ele a rebaixa para R$ 25–45 mil, abaixo do piso aprovado, num negócio cuja tese de posicionamento é confiança e cujo acabamento de marca venceu a dissidência do CFO em 13/07.

**3. Ele auditou o numerador e não auditou o denominador.** A correção orçamentária dele está certa em direção (R$ 60–140 mil da rodada 3 realmente omitiam jurídico e PLD, chamados inegociáveis pela mesma ata) e eu a acolho. Mas o "ponto de equilíbrio em 4 a 7 operações/mês" não corrige coisa alguma: ele simplesmente dividiu uma estrutura menor pelo mesmo fee implícito de R$ 6.000/operação que estava por trás do 8–15 que ele acusa de errado. R$ 25–45 mil ÷ 4–7 embute **R$ 6.250 líquidos por operação**. A tabela aprovada na rodada 3 só paga isso acima de R$ 1 milhão. Refazendo com a composição que a própria ata estimou (carro 55%, relógio 15%): fee ponderado de R$ 2.000–2.700, mais margem da casa sobre laudo (R$ 300–1.200) e dossiê de operação conjugada em talvez 40% dos casos (R$ 800–2.000). **Receita líquida esperada por lote liquidado: R$ 3.000–4.500.** Breakeven da estrutura dele: R$ 25–45 mil ÷ R$ 3.000–4.500 = **6 a 15 operações/mês, centro em 9**. Ele reencontrou o número que veio derrubar. E a distância que isso abre da meta dele é o que a ata precisa registrar: 2–3 liquidações em 13 semanas são 0,7 a 1,0 operação/mês. **No dia 90 o negócio está a nove ou dez vezes do breakeven que ele declarou "melhor".** Um breakeven otimista dentro de um plano cujo capital nunca foi declarado é a mesma doença que ele acusou a mesa de ter — só que com o sinal invertido.

**4. Ele corrigiu a despesa e esqueceu a receita, e depois cortou a única entrada de caixa do trimestre.** Somando a receita dos 90 dias: 2–3 fees × R$ 3.000–4.500 = **R$ 6 a 13,5 mil contra R$ 165–405 mil de despesa** — cobertura de 2% a 8%, porque o lado que anuncia paga R$ 0 por 90 dias e o lado que absorve paga R$ 0 sempre. Esse número tinha que estar na frase, não o breakeven. E ele corta o credenciamento cobrado com o argumento de que "não se vende selo antes de existir taxa de reprovação para publicar" — mas o credenciamento aprovado na rodada 3 não é selo, é **cobrança do trabalho** de certidões, COAF, estoque auditável e visita, trabalho que ele mantém obrigatório na régua de entrada e vai fazer de graça em 24–30 CNPJs. São **R$ 29–75 mil** deixados na mesa, 20% a 45% do buraco que ele acabou de denunciar. E a taxa de reprovação existe no dia 1: reprova-se quem não tem CNPJ de cinco anos, certidão negativa ou cadastro COAF. Publica-se a régua e o contador; não é preciso histórico.

**5. Erros de conta na própria tabela.** Item 6, que ele mesmo chama de gargalo do trimestre: 90–150 fichas a R$ 150–600 por ficha concluída dá **R$ 13,5 a 90 mil**, não R$ 15–45 mil. O teto está subestimado em R$ 45 mil — erro herdado da rodada 3 que o auditor do orçamento não auditou. Corrigido, o trimestre dele vai a **R$ 165–405 mil**.

**6. Quem executa: um gestor por três meses não faz isso.** Contas dele: 90–150 fichas × 1,5–3h = 135 a 450 horas, comprimidas nas semanas 2–7 — **22 a 75 horas por semana** para uma pessoa que ainda tem que rodar o Balcão (76–196h nas semanas 8–13, pela estimativa de 54–140h/30 dias da rodada 3) e manter a lista viva. Total 211 a 646 horas contra ~400 horas líquidas de um FTE em 12 semanas. No teto estoura em 60%. Pior: ele corta o gestor de quatro meses (rodada 3) para três, encerrando o contrato **na semana 13** — o dia em que a regra de decisão é lida e o mês 4 começa a cobrar. Demite-se o único operador exatamente quando o teste produz o dado. E comercial sênior não assina contrato de três meses; assina, e na semana 9 está procurando emprego.

**7. A frase de venda contrabandeia o número que o teste existe para descobrir.** "8–12 compradores em 72 horas" é o cap do disparo, não uma capacidade comprovada. A métrica-mãe do dia 90 é justamente a mediana de elegíveis após o filtro duro, e a ata prevê que ela venha **abaixo de 8** — caso em que "o teste mediu a base e não o motor". Prometer 8–12 antes disso é vender capacidade não verificada sob o art. 30 do CDC, o mesmo pecado pelo qual esta mesa reprovou o selo de verificado duas vezes. A promessa autorizada é uma só: **"seu bem vai à mesa em 72 horas"**, sem número de destinatários — e a ata proíbe expressamente publicar número de cadastrados. Junto disso, "laudo independente" na frase ao cliente final antecipa para todo lote um custo (R$ 1,5–3,5 mil) que a regra 3.2 colocou só no lote adjudicado.

**8. Ele encerra a mesa do Cleber pelo eixo errado.** "Mesa entre categorias diferentes é legal" resolve o antitruste e ignora o que mata a empresa. Sentar o cara de imóvel, o de carro e o de relógio na mesma sala expõe a cesta inteira do cliente final — e a regra 3.3, da mesma ata, proíbe revelar o bem principal da ponta oposta justamente porque é isso que denuncia patrimônio; a proibição nº 7 de 13/07 proíbe circular dossiê patrimonial entre lojas; e a sanção citada pela própria mesa não é a multa de 2%, é a suspensão do banco de dados (art. 52, X). A linha dele legaliza contra a Lei 12.529 uma prática que a LGPD veta. Não se encerra essa divergência — que é com o dono da marca — em uma linha.

**9. Sequência: ele agenda o modo de morte que a ata nomeou.** Vitrine e formulário público de oferta de permuta no ar nas semanas 3–6; ingestão de 400–600 anúncios com permuta ligada nas semanas 4–8; lista de absorção pronta só na semana 7. Ou seja, a torneira de leads de permuta abre antes de existir absorvedor. A regra inegociável da rodada 3 é literal: nada é disparado antes de o gestor ter três nomes qualificados no papel, porque o modo de morte em público é o anunciante assistindo ao próprio bem receber zero resposta.

**10. Proibir discutir o preço do mês 4 por 90 dias é impossível.** Ele entra no contrato de adesão que se assina nas semanas 1–8. Ou o contrato traz o preço, ou não é contrato — é carta de intenção, e a mesa exigiu contrato pesado precisamente porque a mensalidade é zero.

O que sobrevive intacto e vai a ata como acerto dele: "nunca compra o bem" e "nunca vende visibilidade"; o fee fixo por adjudicação; a correção da frase do Cleber de **"a plataforma aceita"** para **"você não precisa ficar com o bem"** — três palavras que tiram o passivo dos arts. 14 e 30 do CDC e preservam a melhor frase de venda que este projeto produziu; as três palavras proibidas no material ("segurança", "garantido", "verificado" sem escopo negativo escrito); e a direção da correção orçamentária, que estava certa e cujo número ele ainda subestimou.

**Ajuste exigido:** **A frase que vai a ata, em duas partes.** Definição: *"A WebLuxury leva à mesa, em 72 horas, o bem que seu cliente oferece em troca — você vende sem ficar com ele."* Sem "8–12", que é regra interna de disparo e não promessa comercial até o dia 90 provar a mediana de elegíveis. Escopo do trimestre: *"nos 90 dias se constrói lista, contrato e vitrine — e roda-se o motor no manual, com formulário e planilha, sem uma linha de código."*

**Ajustes numerados ao plano dele:**

1. **Telas 4 a 10 saem do orçamento e voltam para formulário + planilha + pasta por lote, a R$ 0**, exatamente como a rodada 3 especificou. Fica de software apenas a vitrine em prateleira (telas 1–3), no piso já aprovado de **R$ 30–80 mil**, com acabamento de marca — não R$ 25–45 mil. Economia de R$ 30–140 mil e devolução de 8–14 semanas de fornecedor. O item 5 (teste de schema, R$ 5–10 mil) e o item 7 morrem juntos: teste-se o sistema do Cleber, não se encomende base nova.

2. **Orçamento corrigido do trimestre: R$ 175–390 mil**, com o item 6 refeito para R$ 13,5–90 mil (150 fichas × R$ 600 = R$ 90 mil, não R$ 45 mil). Receita esperada nos 90 dias: **R$ 6–13,5 mil**. Cobertura de 2% a 8%. É este par de números — não o breakeven — que os sócios têm que ver antes de declarar capital.

3. **Breakeven reescrito: 6 a 15 operações/mês, centro em 9**, sobre receita líquida esperada de R$ 3.000–4.500 por lote liquidado (fee ponderado R$ 2.000–2.700 + margem de laudo + dossiê em ~40% dos casos). Estimativa declarada. Registre-se junto a distância honesta: a meta do dia 90 (2–3 liquidações) é 0,7–1,0 operação/mês, ou seja, um décimo do breakeven — e isso é o esperado de um piloto, não um fracasso. O que não se admite é apresentar 4–7 como marco alcançável e com isso autorizar os sócios a subdimensionar o caixa.

4. **Credenciamento volta, cobrado no ato da adesão: R$ 1.200 no ano 1** (piso da faixa aprovada), × 24–30 CNPJs = **R$ 29–36 mil dentro do trimestre**. Não é selo, é a fatura do trabalho de diligência que se vai fazer de qualquer jeito. Publica-se a régua e o contador de reprovados desde o primeiro cadastro.

5. **Gestor de rede por 4 meses, não 3** (R$ 32–60 mil), **mais um telefonista/SDR dedicado nas semanas 2–7** (R$ 4–7 mil/mês, R$ 6–10,5 mil no período). Sem a segunda pessoa, 90–150 fichas em seis semanas exigem 22 a 75 horas semanais de quem também roda o Balcão. Alternativa se o caixa não pagar: 60 fichas por categoria em oito semanas, e isso vai a ata como redução de escopo, não como atraso.

6. **Trava de sequência, inegociável:** o campo "aceita permuta" só se liga por categoria depois de **45 fichas de apetite fechadas na categoria absorvedora correspondente**. Até lá a vitrine é vitrine e o formulário de oferta fica desligado. Corrige a colisão das semanas 3–6 com a lista que só fica pronta na semana 7.

7. **Lote fora das duas categorias absorvedoras (imóvel, barco, aeronave, moto, joia — ~30% da composição estimada) não entra no SLA de 72h.** Campo bloqueante no ato da oferta, marcado "roteamento manual, sem prazo". Sem isso, o SLA falha em quase um terço dos lotes e a promessa cai no art. 30 do CDC.

8. **A mesa do Cleber fica em pé, com regra de minimização:** vendedores de categorias diferentes só sentam juntos depois da adjudicação de cada perna, sobre a operação já formada, e nenhum participante vê a cesta completa nem o bem principal da ponta oposta antes disso. Antes da adjudicação, cada perna é lote independente com lance cego. O parecer da semana 1 passa a ter dois objetos, não um: concorrencial **e** LGPD sobre a mesa conjugada.

9. **Item 11 (teste de canal de recrutamento, R$ 3–5 mil) é cortado por duplicidade** com o item 13: o inbound de anunciante já está sendo testado a R$ 7/dia e trouxe dois contatos em uma semana. Absorvedor não se recruta por mídia — a ficha de apetite exige 1,5–3h de telefone de qualquer forma.

10. **Mídia volta ao teto aprovado de R$ 15–20 mil/mês** ou o rebaixamento para R$ 5–8 mil vai a ata como decisão consciente de não produzir biblioteca no trimestre. Rebaixar 60% do teto de mídia num negócio que vende confiança, e no mesmo documento cortar as diárias de produção, precisa ser escolha declarada, não linha de planilha.

11. **O preço do mês 4 sai da lista de assuntos proibidos** e entra no contrato de adesão: R$ 1.500–3.000 por capacidade de anúncios vivos, escrito no papel que a loja assina na semana 4, com gatilho de início no dia 91 e relatório mensal de lotes roteados como contrapartida contratual.


### Refutação 3 — TESE REFUTADA

REFUTO — não a taxonomia, que é boa, mas a tese central: **"o livro de lances cegos é o ativo" não sobrevive ao comportamento real deste mercado no ano 1, e a conta que sustenta a frase está inflada por um fator de 3 a 5.**

**1. O n está errado, e é o próprio analista quem entrega a prova.** Ele soma faixa indicativa e lance firme para chegar a "160–240 observações". Faixa indicativa não é observação de preço: é opção precificada contra risco de vistoria por um dealer que não tocou no bem, vindo de uma casa sem histórico, convidado por telefone há seis semanas. Estimo que a faixa de etapa 1 saia 10–20% abaixo do lance firme e 15–25% mais larga [estimativa] — é dispersão de cautela, não de avaliação. Só forma preço o lance firme pós-vistoria. Pelas metas do próprio piloto (4–6 lotes com proposta firme por trimestre, 2–3 lances firmes cada), o ano 1 entrega **30 a 96 lances firmes**, não 160–240 — e distribuídos em 6 células dá **5 a 16 por célula por ano**. O exemplo que ele escreve para vender a mensalidade, *"lance vencedor em 82% da referência, n=11, últimos 90 dias"*, está 4 a 8 vezes acima do volume que ele mesmo projetou. Esse número só se escreve juntando células ou contando faixa indicativa como lance — e contar faixa indicativa como "lance vencedor" no relatório do membro é enganar o cliente que paga R$ 3.000.

**2. O lance perdedor é o número que um dealer brasileiro mais protege — é o preço de compra dele.** O analista trata a coleta como dada. Não é. Loja consolidada negocia contrato com advogado (está na ata de 13/07), e o advogado vai riscar a cláusula que autoriza a casa a compor índice com o histórico de lances do cliente. Das duas, uma: ou o dealer recusa e não há livro, ou ele assina e passa a lançar defensivamente. E aí entra o efeito que a análise não modela: **catraca**. No momento em que o dealer entende que o lance dele calibra a tabela de reserva contra a qual os próximos lotes dele serão medidos, ele deprime o lance. A reserva calibrada nesse livro desce junto, o lote vai a deserto, e o anunciante perde uma venda porque o dado da própria casa disse que o preço era baixo. **Esse é o primeiro conflito de dinheiro, e o desenho como está o perde.** Instrumento de medição que os medidos sabem que serve para regular o preço deles deixa de medir.

**3. A trava estrutural nº 5 não existe, e é a falha mais grave da peça.** Ele escreve: "a casa não tem estoque, não pode ser adjudicatária e não origina comprador em concorrência com o membro". **O Cleber tem estoque.** É relojoeiro com 27 anos e carteira própria, na categoria que anuncia, e no desenho aprovado ele é porteiro, roteador e o maior comprador da sala ao mesmo tempo. A promessa de governança de dado está escrita como se a casa fosse uma pessoa jurídica neutra. Não é: é uma pessoa com vitrine. No primeiro Patek que entrar em lote e for adjudicado a CNPJ ligado a sócio, a praça inteira conclui em uma semana que o livro de lances é a mesa de compra do Cleber com outro nome — e nesse mercado a conclusão circula por telefone antes de circular por petição. A mesa já aplicou muralha chinesa à formação de preço em 24/07; faltou estendê-la ao livro de lances.

**4. A ficha de apetite não é "intenção assinada".** É a resposta que um dealer dá para encerrar uma ligação fria: custa zero, não obriga a nada e preserva opcionalidade. Preferência declarada em B2B é inflada por construção — o cara que declara "compro à vista até R$ 400 mil" compra R$ 400 mil quando é o 911 para o qual já tem cliente, e R$ 150 mil no resto. Chamar isso de "qualitativamente superior a log de busca" inverte o teste: log de busca é comportamento revelado com custo; a ficha é declaração sem custo. O dado que presta não é a ficha — é **ficha declarada × comportamento realizado**, o resíduo entre o que ele disse que queria e o convite que recusou. E esse resíduo só nasce dos mesmos 20–48 lotes. Ou seja: o ativo "barato" dele e o ativo "verdadeiro" dele desaguam no mesmo n minúsculo. A reconfirmação a cada 90 dias que ele pede é correta e insuficiente.

**5. "O dado sustenta a mensalidade" é uma obrigação de resultado que a casa não cumpre no ano 1.** A mesa aprovou tier por capacidade de anúncios vivos, R$ 1.500–3.000 a partir do mês 4, com relatório de lotes roteados e propostas recebidas. Ele reancora o preço no relatório de célula. No mês 4 esse relatório tem n=0 a 2. O dealer que paga R$ 3.000 por um relatório vazio cancela no segundo mês e conta para a praça — que é exatamente o mecanismo de morte silenciosa que esta mesa chamou de inimigo nº 1. Relatório de célula é feature de retenção; não é a razão de existir do preço. Sai da proposta de valor, fica na lista de entregáveis.

**6. Ele reabre uma decisão sem dizer que reabriu.** Em 13/07 ficou em ata: banda de comparáveis **calculada por terceiro**, agregada, anonimizada, defasada 90 dias, mínimo cinco fontes. Ele põe a casa calculando mediana com código determinístico e devolvendo ao membro. Ou a mesa revoga a regra explicitamente, ou o relatório volta para o terceiro. Minha posição: revoga-se para a tabela **interna** de reserva, que ninguém vê; mantém-se o terceiro para tudo que chega ao membro ou ao mercado.

**7. Onde ele está certo eu endureço, e onde está frouxo eu aperto.** Matching, precificação por modelo, laudo-rascunho e agente autônomo: vetados, e o motivo real não é técnico, é de praça — quem diz "o algoritmo te escolheu" ouve "quem é o algoritmo?", e a resposta precisa caber em uma linha lida pelo dealer, ou ele conclui que está sendo administrado. Mas duas linhas da tabela dele estão erradas na direção do risco: **(a) extração por VLM entrando "no mês 1"** — o modelo vai produzir com confiança "Daytona 116500LN, 2021" e esse campo entra na vitrine sob a marca; art. 30 do CDC, informação precisa vincula, e ninguém relê 600 fichas extraídas. É o selo sem lastro entrando pela porta dos fundos para economizar R$ 240; **(b) "triagem de compliance ~R$ 0"** — flag registrado é suspeita documentada, e não comunicar depois de flagar é pior do que não flagar; o custo não é de API, é da hora do analista qualificado e do rastro que um regulador lê de trás para frente. Falta também uma linha na tabela: **rascunho de dossiê** ele libera inteiro, e o dossiê é a peça pela qual a casa cumpre PLD próprio.

**8. Última, e é de estratégia: "a vitrine é commodity" não pode virar "a vitrine não importa".** L é endógeno — sem anúncio permutável não há lote, sem lote não há livro. A vitrine é péssima como dado e é o combustível do único ativo que ele quer. E o produto que este mercado efetivamente compra não é índice de preço: é *quem tem agora × quem quer agora* — a interseção dos dois conjuntos que ele separou e desvalorizou um a um. Serviço de roteamento, não dataset. Some-se um custo que ele escondeu dentro de "R$ 3–8 mil de setup": conectar estoque de 24–30 lojas cujo ERP é uma planilha de 11 colunas sem número de referência custa, estimo, **R$ 800–2.500 por loja, R$ 20–75 mil no total** [estimativa], mais manutenção — e é isso, não a API, que decide se os 400–600 anúncios existem até o mês 6.

**Ajuste exigido:** O que sobrevive, com ajuste. Doze itens para a ata:

**Sobre o livro de lances**
1. **Só lance firme pós-vistoria forma preço.** Faixa indicativa é gravada com flag `nao_precificante` e nunca entra em tabela de reserva nem em relatório de membro. Recontagem honesta do ano 1: 30–96 lances firmes, 5–16 por célula [estimativa].
2. **Anticatraca, em contrato:** a casa não usa histórico de lances de um membro para formar reserva de lote em que ele é convidado; a reserva continua lacrada pelo anunciante; a tabela de célula é insumo consultivo, nunca piso imposto pela casa. E a reserva é composta de duas fontes — lances firmes **e** referência pública congelada no ato —, nunca só de lances.
3. **`delta VLG₁−VLG₂` é métrica interna secreta.** Nunca vai a membro, nunca a relatório, em nenhuma forma agregada. E a leitura dele tem duas causas opostas: abaixo de 3% pode ser cap grande demais **ou** alinhamento entre convidados — e nesse segundo caso reduzir o cap piora. Regra: delta abaixo de 3% em duas células no mesmo trimestre abre revisão manual de conduta, não recalibragem automática do cap.
4. **Campo novo, custo zero, e é o ativo real:** `apetite_declarado_no_momento_do_convite` gravado junto de `motivo_do_declinio`. O desvio entre declarado e praticado por CNPJ, após 10 convites, é o único índice de credibilidade de dealer que existe neste país — é fórmula escrita, publicável, e entra legitimamente na ordenação objetiva do roteamento (ao lado de tempo de resposta, adjudicações honradas e recência).

**Sobre o sócio dentro do mercado**
5. **Muralha chinesa nominal sobre o Cleber e qualquer CNPJ ligado a sócio.** Entra como membro comum; nunca é convidado a lote cuja ficha viu como gestor; se a loja dele quiser lançar, o roteamento daquele lote passa ao gestor de rede e o sócio fica fora do livro de lances do lote, com a barreira registrada em log.
6. **Publicar trimestralmente aos membros:** `% de lotes adjudicados a CNPJ ligado a sócio`. Teto de conduta 10%. Acima disso, a plataforma é mesa de compra fantasiada e o mercado a lê assim antes de qualquer advogado.

**Sobre publicação e antitruste**
7. **Corte limpo:** tabela **interna** de reserva — casa calcula, código determinístico, ninguém de fora vê (a regra de "terceiro calcula" de 13/07 fica revogada só para este uso, e a revogação vai a ata). Tudo que chega ao membro ou ao mercado — terceiro credenciado, agregado, defasado 90 dias.
8. **Régua de publicação endurecida:** n ≥ 5 **grupos econômicos distintos** (não CNPJs — parte da base é ME cujo nome é a pessoa), nenhum CNPJ acima de 35% das observações da célula, sempre faixa P25–P75 com n declarado. Sem os três, a célula não publica.

**Sobre a mensalidade**
9. **O relatório de célula sai da proposta de valor e fica na lista de entregáveis.** A mensalidade de R$ 1.500–3.000 a partir do mês 4 se justifica por capacidade de anúncios vivos, lotes roteados e propostas recebidas — coisas que existem no mês 4. Relatório de dado entra no discurso quando a célula tiver n ≥ 12 lances firmes, não antes.

**Sobre a camada de IA**
10. **Extração por VLM nasce como rascunho.** Nenhum campo extraído publica sob a marca sem `confirmado_por` (login do membro) e `data_da_confirmacao`. O ato de confirmar é o que mantém a veracidade — e o direito de regresso — com o membro, em vez de migrar para a casa por conveniência de digitação.
11. **Triagem de compliance com enum fechado de 6–8 flags**, cada um com disposição escrita e SLA de 5 dias úteis para encerrar, `revisado_por` e `data_da_revisao` obrigatórios, e a hora do analista orçada dentro dos R$ 10–30 mil/mês de PLD já aprovados. Nada de "a IA sinaliza o que achar estranho".
12. **Dossiê: a IA redige a parte descritiva e logística e nunca as seções de `análise de risco` e `origem declarada dos bens e recursos`** — são as que serão lidas em fiscalização, e parágrafo gerado ali é análise fabricada.

**Duas correções acessórias**
13. Base de eventos de transação: **retenção de 5 anos por obrigação legal de guarda PLD (art. 7º, II, LGPD)**, não pela teoria de anonimização do art. 12. Quarenta permutas cross-categoria no Brasil inteiro não são anônimas em nenhum sentido real — a praça nomeia todas. A tese do art. 12 volta à mesa no segundo limiar (300–500 por célula), não antes.
14. Orçar a ingestão de estoque por feed como **R$ 800–2.500 por loja, R$ 20–75 mil no total** [estimativa], mais manutenção — e não como R$ 3–8 mil de setup. É esta linha, não a API, que decide se os 400–600 anúncios permutáveis existem no mês 6; e sem eles não há lote, não há livro de lances e não há ativo nenhum para discutir.

**Fica como está, sem ajuste:** matching, precificação por modelo, laudo-rascunho e agente autônomo — vetados; a frase "usar os dados deles a favor" fora da ata; o dado do membro volta ao membro identificado e sai ao mercado só agregado; nenhuma decisão com efeito jurídico sem revisão humana registrada.


### Refutação 4 — TESE REFUTADA

REFUTADA — a frase-identidade cai em três dos quatro pedaços, e o escopo de 90 dias contradiz a própria ata que ele diz estar executando. Sustento o que sobrevive na correção. Minha lente é uma só: o que o lojista brasileiro faz às terças-feiras, não o que ele assinaria num contrato.

**1. O relógio do mercado é de quatro horas. O concorrente não é a Chrono24, é o grupo de WhatsApp.** Quando o cliente põe o carro na mesa dentro da loja, a negociação está quente e morre de esfriamento. O que o lojista faz hoje, de graça: manda três fotos em dois grupos de permuta e tem número em 20–40 minutos, de gente que ele conhece e que paga. O desenho promete faixa indicativa em 24–72h e lance firme pós-vistoria em até 10 dias úteis — D+13 até existir preço que vincula. Nenhuma venda de luxo espera 13 dias por causa da contrapartida. O lojista corta 30–40% de cabeça, fecha hoje, e resolve o carro depois. Consequência que ninguém orçou: **a plataforma recebe apenas os lotes que o WhatsApp recusou** — o encalhe, o bem com pendência documental, o superprecificado. Seleção adversa não como risco, como desenho. Colocar "72 horas" na frase-mãe é vender lentidão como benefício.

**2. "Você vende sem ficar com ele" é falso dentro do mecanismo aprovado.** Sinal de 10–20% em D+2 libera o bem principal, saldo em D+15. Traduzindo para o balanço do lojista: ele entrega o relógio de R$ 500 mil contra R$ 50–100 mil e fica quinze dias segurando um carro que não quis, com 80–90% de risco de crédito de um dealer que ele não escolheu — escolheu um VLG numa planilha. A frase promete ausência de custódia; o contrato entrega custódia com prazo e sem garantia. Art. 30 do CDC transforma isso em obrigação e o primeiro calote transforma em processo. O valor que o mecanismo realmente cria é outro e é honesto: **saber o preço de saída antes de assinar a venda.** Preço, não custódia.

**3. O retrade é o comportamento padrão deste mercado e o desenho o autoriza sem teto.** A modalidade "condicionada, com abatimento vinculado a itens objetivos de vistoria" não tem limite escrito. Num lance cego, a forma de vencer é dar o maior número e cortar na vistoria: pastilha, pneu, retoque de pintura, "polimento de aro", elo faltando, caixa e papéis. O mecanismo, como está, **seleciona sistematicamente o proponente mais agressivo no retrade**, e o anunciante aprende em três lotes que "melhor VLG" é ficção. É aqui que a regra encontra o primeiro conflito de dinheiro, e ela não sobrevive: o anunciante já entregou o bem principal contra 10–20%.

**4. O produto é a apresentação, e apresentação não se repete.** Não-circunvenção é por lote e por 12 meses sobre aquele bem. O lote 1 apresenta o relojoeiro ao dealer de carro; os lotes 2 a 30 acontecem no telefone dos dois, legalmente. O absorvedor não paga mensalidade (correto), o anunciante paga R$ 0 por 90 dias, e o fee só nasce na adjudicação. O negócio tem receita por evento e nenhum motivo para o evento se repetir depois do primeiro sucesso. Neste mercado, dois CNPJs que fecharam uma permuta juntos viram par permanente em três meses. **Um casamenteiro que funciona torna-se desnecessário.** O que não vira par permanente é o cartório da operação — laudo, gravame, DIFAL, NF de entrada do bem recebido, minuta, dossiê COAF, condição resolutiva da cesta N:1. Isso os dois continuam não querendo fazer no lote 30.

**5. A despersonalização não funciona exatamente onde o fee é grande.** "Circula o bem, nunca a pessoa" é implementável para Cayenne 2022 e Submariner de catálogo. Não é para o Azimut em Angra, para o Daytona verde com caixa e papéis, para a Ferrari com três donos no país. Acima de R$ 1 milhão — onde o fee é R$ 5–8 mil — o trade identifica o dono pela ficha em uma ligação, e o cliente UHNW descobre que o bem dele circulou. Isso não gera multa: gera o telefonema do cliente para o dono da loja, e a loja sai. E na outra ponta a conta também não fecha: num carro de R$ 100 mil, o custo de instrução da casa (fee R$ 800 + laudo R$ 1,5–3,5 mil) é R$ 2,3–4,3 mil contra um spread de atacado de 2–6%, isto é, R$ 2–6 mil. **O laudo sozinho inviabiliza o piso da tabela.** A mecânica tem faixa operável e ela não está escrita.

**6. "Nunca vende visibilidade" é falso na própria ata.** O modelo aprovado cobra R$ 1.500–3.000/mês por capacidade de anúncios vivos a partir do mês 4. Slot é visibilidade vendida por quantidade. A negativa correta é **"não vende posição"** — não se vende ordenação, prioridade de roteamento nem destaque. Manter a versão larga na frase-identidade entrega ao primeiro membro pagante a contradição pronta ("por que a loja X tem 80 anúncios e eu 15?"), e contradição na frase-mãe é o mecanismo pelo qual o item vetado volta no mês 4 com nome novo.

**7. As "dez telas" reintroduzem no trimestre o software que a mesa declarou proibido.** Vitrine R$ 25–45 mil, ingestão de feed R$ 6–15 mil e normalização de imagem R$ 3–8 mil somam R$ 34–68 mil de portal num trimestre cuja regra é "três formulários, uma planilha, WhatsApp 1-a-1, zero linha de código proprietário". E o gasto não origina um lote: nos 90 dias o lead de permuta nasce **dentro da loja**, na negociação, não numa página pública com 3–15 mil sessões/mês. O campo `aceita_permuta_contra[]` tem valor de sinal para o cliente final, e o carregador mais barato dele em 90 dias é o post da própria loja e o catálogo de WhatsApp. Essa verba compra 60–100 fichas de apetite, que são o gargalo declarado do trimestre. Registro que esta é correção também ao item 6 do parecer da rodada 3, e a assumo contra a mesa.

**8. A aritmética do gestor não fecha com uma pessoa.** 90–150 fichas a 1,5–3h cada são 135–450 horas nas semanas 2–7 — seis semanas, 240 horas úteis de um cargo. O ponto médio (120 fichas × 2,25h = 270h) já estoura o calendário antes de o gestor rotear um único lote, e nas semanas 8–13 o roteamento consome mais 54–140h/mês. Ou são dois cargos, ou a lista termina na semana 11 e o Balcão roda 4 lotes em vez de 12–20. A correção de custo do analista (R$ 165–360 mil) está certa na direção e ainda subestima esta linha.

**9. A "mesa obrigatória" do Cleber precisa de um qualificador que ninguém escreveu.** "Mesa entre categorias diferentes é legal" é quase certo e incompleto. Três dealers de categorias diferentes sentados para viabilizar uma operação convergem, em quinze minutos, sobre uma coisa só: o deságio. Deságio combinado entre quem compra é preço combinado contra quem vende — e quem vende, aqui, é o cliente final. Sem regra, a mesa multicategoria é um cartel de deságio com secretária.

**10. "Portal primeiro fecha a porta da operadora" é a melhor frase do memo e o argumento mais fraco dele.** Não fecha: a Chrono24 vende visibilidade e nunca teve roteamento, e nada nela impedia. O que portal primeiro faz é trocar o cliente e, com isso, matar a fila de fichas por falta de atenção do único gestor. É argumento de foco e de caixa, e ele basta. Exagerado, dá ao Cleber o motivo para descartar o memo inteiro — e o Cleber tem evidência de campo na mão: R$ 7/dia de Instagram trouxe dois inbounds reais nesta semana, a única aquisição validada em três rodadas. Note-se que os dois inbounds (estética automotiva no Ceará, corretor em Balneário Camboriú) são candidatos a **absorvedor**, não a assinante. Chamar essa verba de "reputacional" é errar a função dela.

**11. O investidor como absorvedor com CNPJ próprio institucionaliza o que quer evitar.** Comprador de dentro, escolhendo os melhores lotes, com teto de 20% — e o `motivo_da_escolha`, que é a trilha antitruste, vira a prova documental do padrão. Em 90 dias os dealers falam, e o que eles dizem é "tem comprador da casa na fila".

**Ajuste exigido:** **O que sobrevive intacto:** "nunca compra o bem" (capital, Lei 7.492/86, responsabilidade de alienante); fee fixo por evento e nunca percentual sobre valor permutado; "não se constrói motor nos 90 dias"; a correção de custo do trimestre — a mesa estava omitindo jurídico fundacional e PLD e ele está certo em pôr na conta. Ponto de equilíbrio de 4–7 operações/mês para a estrutura deste trimestre: aceito, e revoga o de 8–15.

**A frase, reescrita.** Ao lojista: *"Em 72 horas, três propostas de preço pelo bem que seu cliente ofereceu — você fecha a venda sabendo por quanto ele sai."* (22 palavras.) Promete o que a métrica do dia 90 já mede (3+ faixas por lote), não o cap do disparo. O número "8–12" sai do material comercial: no campo ele lê como limitação, e o Cleber, que queria cem vendedores de barco, não repete uma frase que soa a racionamento. A frase do Cleber vai a ata assim: **"você não precisa aceitar a troca no escuro"** — não "a plataforma aceita" (promessa de compra, itens 4 vetados) e nem "você não precisa ficar com o bem" (falso por 15 dias de custódia com 10–20% de sinal). Palavras proibidas: as três dele — "segurança", "garantido", "verificado" solto — mais **"avaliamos"** dito pela casa (o laudo é de terceiro credenciado) e **"leilão"** no material comercial. Sobre esta última: estimativa minha, não veredito — o regime de leiloeiro oficial é matéria do parecerista; use "lance" e "propostas", que custa zero e tira o assunto da mesa.

**Os oito ajustes que vão à ata:**

1. **Relógio.** Faixa indicativa no mesmo dia útil, teto de 24h; lance firme em 72h com vídeo-vistoria; 10 dias úteis só quando houver deslocamento físico obrigatório (barco, aeronave). A métrica-mãe do dia 90 muda de "3 faixas em 72h" para **"3 faixas em 24h"** — se o mecanismo não bate isso, ele perde para o grupo de WhatsApp e o piloto está medindo o encalhe.

2. **Teto de retrade.** Abatimento pós-vistoria limitado a 3–5% do lance, sobre lista de itens declarada ex ante. Acima do teto, o lote reabre aos demais proponentes e quem retratou fica fora dos dois lotes seguintes. Indicador por membro: **delta entre lance e liquidação**, publicado no placar interno. Sem isto, todo lance vencedor é uma opção de compra dada de graça.

3. **Faixa operável escrita no regulamento (estimativa):** lote roteado entre R$ 150 mil e R$ 800 mil. Abaixo disso, roteamento sem laudo, fee de R$ 300–500, ou não se abre lote. Acima de R$ 800 mil, operação nominal com 3 nomes sob NDA e ficha entregue por telefone — nunca lote despersonalizado, porque a peça é identificável pelo trade e o dano é o cliente do membro.

4. **O que retém não é a apresentação, é a liquidação.** Não tente prender o par por contrato — não segura, e piora o parecer concorrencial. Prenda pelo serviço: o fee de adjudicação passa a ser vendido embalado com o pacote documental da operação (laudo de terceiro, atestados registrais, minuta de permuta, orientação de NF de entrada, checklist COAF, condição resolutiva da cesta). Preço único por lote adjudicado. É o único trabalho que os dois dealers continuam não querendo fazer no lote 30.

5. **Dois cargos, não um.** Telefonista de recrutamento (R$ 4–7 mil/mês, script e planilha) nas semanas 2–7, e gestor de lote (R$ 8–15 mil/mês) das semanas 4–13. R$ 48–90 mil no trimestre, não R$ 24–45 mil. Custo do trimestre revisto: **R$ 190–400 mil**, dos quais R$ 60–140 mil são compliance que não produz um lote.

6. **Cortar do trimestre a vitrine, a ingestão por feed e a normalização de imagem (R$ 34–68 mil)** e converter em 60–100 fichas de apetite e reserva jurídica. Inverte-se a lista de telas do analista: constroem-se agora **ficha de apetite, ficha despersonalizada do lote, tela de adjudicação com `motivo_da_escolha` e o log de eventos append-only**; faixa indicativa, lance firme e fila do gestor ficam em formulário de prateleira, que é literalmente o que a mesa aprovou; credenciamento é contrato em PDF; página pública de anúncio e formulário público de oferta saem do trimestre. Vitrine volta ao orçamento no dia 91, se a mediana de elegíveis ficar acima de 8.

7. **Regra da mesa multicategoria:** cada participante fala apenas do preço da própria categoria; o deságio nunca é pauta coletiva; ata escrita com quem falou o quê. Objeto do parecer concorrencial da semana 1, junto com o lance cego.

8. **Investidor só em um papel: comprador de última instância.** Nunca recebe a onda 1; entra quando o lote fecha com menos de 3 propostas ou vai a deserto; fórmula de piso publicada; não remunerado pela casa; participação declarada no regulamento e no contrato de absorvedor. Nesse papel ele deixa de ser concorrente dos membros e passa a ser a única coisa que torna a promessa de prazo crível — que é exatamente o que falta ao desenho.

**Mais um, de medição:** os R$ 5–8 mil/mês de mídia deixam de ser "reputação" e viram linha de recrutamento, fundidos com o teste de canal de 21 dias. KPI único: **custo por ficha de apetite concluída**, medido contra os R$ 150–600 do telefone. Se a mídia entregar ficha a R$ 200, o telefone deixa de ser o gargalo do trimestre e metade deste plano muda.


### Refutação 5 — TESE REFUTADA

REFUTADA PELA CONTA, PELO CALENDÁRIO E PELO DONO. O eixo direcional está certo — livro de lances vale mais que vitrine, e IA só para extração/recuperação. Mas todos os números que sustentam a tese estão inflados, mal atribuídos ou fora de prazo, e a camada proposta não tem dono no orçamento aprovado. Ponto a ponto.

**1. O número-âncora está inflado nove vezes, e pelo método que o próprio analista condena.** Ele desqualifica o dado de oferta contando campos ("400–600 anúncios × 40 campos = 16 a 24 mil pontos") e três parágrafos depois glorifica o dado de demanda contando campos do mesmo jeito ("4.300 a 6.600 declarações"). Campo não é declaração. A unidade é a ficha e o anúncio: 490 a 750. E o número verdadeiro é ainda menor. Os 3.200–4.800 "campos de aceite do anunciante" não são 400–600 declarações independentes: relojoaria com 80–300 peças em feed não configura política de permuta peça a peça — configura uma vez ("aceito carro de R$ 100 a 400 mil, SP/RJ, teto de 50%") e o valor se propaga pelo catálogo. Variância intra-CNPJ ≈ 0. O que existe de observação independente no ano 1 é **24 a 30 políticas de anunciante mais 90 a 150 fichas de apetite = 115 a 180 observações** [estimativa]. É uma agenda telefônica qualificada, e é excelente como agenda telefônica. Não é base de dados, não é ativo defensável, e não é a resposta à pergunta do Cleber sobre o que a plataforma é.

**2. O MRR de R$ 430 mil–1,08 milhão "cuja razão de existir é esse dado" é receita já lançada, recontada com outra causa — e a governança dele proíbe o produto que ele fatura.** Esses R$ 1.500–3.000 do mês 4 já estão no parecer de 25/07, e o que a ata pôs dentro deles foi "relatório mensal de lotes roteados e propostas recebidas": recibo de serviço, dado do próprio membro, existe com n=1 no lote 1. Ele trocou o recibo por um índice de célula e manteve o preço. Pior: o relatório que descreve — "no seu segmento o lance vencedor ficou em 82% da referência, n=11" — é proibido pela régua que ele mesmo escreve na seção 5 (mínimo de cinco fontes por célula, defasagem de 90 dias). No mês 4 o piloto tem 2 a 6 adjudicações somadas em 6 células: n por célula entre 0,3 e 1. Pela conta dele, a tabela de reserva exige 72 adjudicações e 12 a 18 meses. **Ele fatura no mês 4 um produto que a governança dele libera no mês 13.** Zero caixa incremental no ano 1.

**3. O único ganho que ele quantifica não paga o que ele gasta.** R$ 16–31 mil/ano de deserção evitada, condicionados por ele mesmo à tabela de reserva do mês 12–18. E a atribuição é generosa: a ata lista três causas de lote deserto (reserva fora de mercado, silêncio, lista rala); a tabela corrige uma. Um terço do efeito, no ano 2: **R$ 5 a 10 mil/ano** [estimativa], contra R$ 20–45 mil de construção no ano 1. Payback de 4 a 9 anos, pago com capital que a quarta sessão consecutiva continua sem declarar.

**4. As "160 a 240 observações" são 26 a 96, e metade do que ele conta não é preço.** Faixa indicativa não vinculante, dada sobre uma foto por quem não tocou o bem, é opinião — a dispersão ali é assimetria de informação, não sinal de valor. Preço é o lance firme pós-vistoria. Metas do piloto: 12–20 lotes abertos, 8–12 com três faixas, **4–6 com proposta firme** — 25% a 40% chegam à etapa 2. Ano 1 a 50–80 lotes: 13 a 32 lotes com lance firme × 2–3 lances = **26 a 96 observações de preço, em 6 células, no ano inteiro. Quatro a dezesseis por célula.** A régua de n≥5 dele deixa metade das células mudas no ano 1. Cai junto o termômetro: com 2 ou 3 lances, o delta VLG₁−VLG₂ tem variância amostral que não distingue 3% de 15%. Usá-lo "com uso gerencial desde o lote 1" para mexer no cap significa terminar o ano com seis amostras de cinco lotes, cada uma com mecanismo diferente, em vez de uma de trinta comparáveis entre si. **O livro de lances morre pela mão de quem quer lê-lo cedo demais.**

**5. Mês 1 e mês 2 não existem para isso, e não há quem execute.** Extração no mês 1 e dedup no mês 2 caem exatamente na janela que a ata reservou para telefone — semanas 2 a 7, listas de absorção, o gargalo declarado de calendário do trimestre. O orçamento do trimestre (R$ 60–140 mil) tem gestor de rede, parecer concorrencial, teste de schema, vitrine e listas. **Não tem uma linha de engenharia.** R$ 20–45 mil de construção mais R$ 3–8 mil de setup pressupõem dono técnico part-time a R$ 15–25 mil/mês [estimativa] que ninguém contratou e que o Gatilho B ainda não autoriza. E dos R$ 20–45 mil, a tabela dele itemiza R$ 3–8 mil: **vinte a quarenta e dois mil reais sem linha**, num caixa não declarado, é o primeiro item que eu recuso. Some-se que a extração resolve problema que a ata já eliminou — a ingestão é **por feed**, estruturada, saindo do ERP da loja. VLM sobre foto sobra para as 5–10 lojas sem ERP, 15–40 peças cada: 75–400 anúncios, R$ 30–160 de API, 10 a 25 horas de digitação evitadas. Meio dia de estagiário, não item de mês 1. E normalizar feed de 24–30 fornecedores **contratados** não é problema de embedding, é cláusula: o contrato exige CSV com doze campos nomeados, custo R$ 0. Solução técnica para problema contratual é o mesmo erro que a verificação adversarial da rodada 2 já derrubou quando a "regra de schema" virou regra de contrato.

**6. Duas linhas da tabela de IA não sobrevivem ao volume.** *Recuperação de comparáveis, R$ 300–800/mês:* a 50–80 lotes/ano são 4 a 7 consultas por mês. Ninguém constrói recuperação para sete consultas mensais — faz-se à mão em vinte minutos. E a fonte: o livro da casa tem n≈0 no dia 90, logo os comparáveis vêm de fora, e "fora" aqui é Chrono24 e Webmotors. A ata aprovou a Chrono24 como tabela de **consulta**; raspá-la para alimentar produto próprio é passivo contratual e reputacional por R$ 300–800/mês de economia. *Triagem de compliance "≈R$ 0":* não é R$ 0 e não tem o que triar. A 50–80 lotes/ano, casos verdadeiros de fracionamento devem ser 0 a 2 [estimativa]. Checklist de PLD em papel, 20 minutos por lote, 80 lotes: **27 horas no ano inteiro** — três dias de uma pessoa, cobrindo 100% da base. Automatizar cria vinte falsos positivos por ano, cada um exigindo o campo `revisado_por` que ele mesmo pede pelo art. 20, e gasta mais hora humana do que ler tudo. A volume zero, revisão integral é mais barata que triagem. E "rascunho de dossiê — sim, incluso" está solto demais: o dossiê sustenta a comunicação ao COAF, é vendido a R$ 2–5 mil, e obrigação de pessoa obrigada é pessoal e indelegável. Texto gerado dentro de arquivo de PLD é risco assimétrico por meia hora economizada.

**7. Onde ele acerta, e o acerto custa R$ 0.** O argumento de que o lance cego produz distribuição enquanto a mesa colaborativa do Cleber produz um número sem contrafactual é o melhor parágrafo da análise, é independente do argumento antitruste, e é o único que convence o Cleber — porque ele não decide por art. 36, decide por saber quanto o mercado paga. Vai à ata, com o número honesto: **40 lotes com livro de lances dão 26 a 96 lances firmes com dispersão medida; 40 mesas colaborativas dão 40 números negociados e zero contrafactual.** A regra de governança (dado do membro volta ao membro identificado; ao mercado só agregado, n≥5, defasado 90 dias; par bem-principal↔contrapartida nunca sai) está certa — e é cláusula de contrato, não projeto de dados. Os quatro vetos (matching, precificação, laudo, agente autônomo) estão certos. Mas a conclusão que ele não tira é a única que importa para o caixa: **o livro de lances não precisa de tecnologia nenhuma. São oito colunas na planilha que a ata já aprovou — uma aba por lote. Custo: uma tarde. Prazo: antes do lote 1.**

**Ajuste exigido:** O QUE SOBREVIVE, E COMO ENTRA — oito itens, custo somado no ano 1 próximo de zero:

1. **Oito colunas na planilha do Balcão, antes do lote 1, R$ 0:** `vlg_1`, `vlg_2`, `vlg_mediano`, `n_lances_firmes`, `n_elegiveis_antes_do_cap`, `motivo_do_declinio` (enum fechado), `referencia_publica_no_ato` (fonte, data, valor congelado), `desagio_apurado`. Mais `data_de_coleta` em toda ficha de apetite. Isto é a tese inteira, executável numa tarde por quem já preenche a planilha. Nenhum item abaixo custa mais que este.

2. **Cap congelado em 10 nos primeiros 30 lotes.** O delta VLG₁−VLG₂ é registrado e NÃO é acionado — a variância amostral a n=2–3 não distingue 3% de 15%. Releitura no lote 30, com gestor e parecer concorrencial na mesa. Mecanismo que muda enquanto se mede destrói a comparabilidade do livro que se quer construir.

3. **Reconfirmação de ficha não vira rotina de 90 dias.** Revalida-se no ato do convite ("ainda compra carro nessa faixa?"), custo marginal zero, porque o gestor já está ao telefone por causa do lote. A rotina autônoma custaria 27 a 90 horas por trimestre do único cargo contratado, e cada hora dela é uma hora subtraída da métrica-mãe do dia 90. Ficha sem contato há 180 dias sai do disparo automático e vai para a fila do gestor.

4. **Camada de IA no ano 1: nenhuma linha, com uma exceção — normalização de feed, e por contrato, não por modelo.** Anexo do contrato de adesão: CSV/JSON com doze campos nomeados. Custo R$ 0. Extração por VLM só se aparecer loja sem feed, orçada como meio dia de trabalho (R$ 30–160 de API), nunca como projeto de R$ 3–8 mil. Recuperação de comparáveis e triagem de PLD por IA: fora do ano 1, reavaliar acima de 300 lotes/ano.

5. **Sai da conta o R$ 430 mil–1,08 milhão como receita de dado.** A mensalidade do mês 4 paga roteamento e o relatório do próprio membro — n=1 basta, é o dado dele. O índice de célula não é prometido a ninguém, não entra em pitch, não entra em contrato e não é citado em reunião de recrutamento antes de 72 adjudicações registradas. Vender banda antes de n=5 é a proibição nº 5 com planilha.

6. **No contrato fundacional: licença de uso, não propriedade.** A casa fica autorizada a usar o registro do lote para (i) rotear, (ii) devolver relatório ao próprio membro, (iii) compor agregado anonimizado com n≥5 e defasagem de 90 dias. Cláusula de propriedade sobre o livro de lances entra na renovação do mês 4, depois de o membro ter recebido o primeiro relatório — nunca na adesão, onde a casa ainda não entregou lote nenhum e o advogado da loja consolidada vai riscar a cláusula mais cara da mesa.

7. **PLD: checklist humano em 100% dos lotes, 20 minutos cada — 27 horas no ano.** Nenhum flag automatizado no ano 1. Quando houver, nasce com `revisado_por` e `data_da_revisao` (art. 20 LGPD). O rascunho de dossiê é montagem determinística por template, campo a campo rastreável a documento carregado, assinada pelo gestor; nada gerado por modelo entra em peça que componha comunicação ao COAF.

8. **"Usar os dados deles a favor" sai da ata** — concordo integralmente e sem ressalva, pelo motivo dele (petição inicial) e por um anterior: membro que suspeita degrada o feed antes de reclamar, e quem degrada primeiro é o que tem o melhor estoque.

REGISTRO PARA A ATA, porque é o argumento que convence o Cleber e sobrevive intacto: o lance cego produz distribuição; a mesa colaborativa produz um acordo. Quarenta lotes com livro dão 26 a 96 lances firmes com dispersão; quarenta mesas dão quarenta números e zero contrafactual. É argumento de dado, independente do antitruste, e reforça a decisão já tomada na rodada 3.


### Refutação 6 — TESE REFUTADA

## REFUTAÇÃO — a sequência está certa, a tese não

Começo pelo que sobrevive, porque é pouco e é bom: **"a mesa só se convoca depois de fechados os lances de todas as pernas e só com quem já venceu" é a linha correta e eu assino.** Também assino o teste do CNPJ em vez do teste do bem, e o gap de viabilidade como indicador. O resto não passa. A tese afirma três coisas — que isso "resolve o conflito de desenho", que "elimina o risco antitruste central" e que o negócio "precisa dos dois" — e as três caem na conta, no caixa ou na escala do gestor. Refuto na ordem em que doem.

### 1. O gatilho contradiz a própria regra, e dispara em lote de UMA perna

O analista escreve que a maioria dos lotes roda "só lance cego, sem mesa" e em seguida publica seis gatilhos que disparam na maioria dos lotes que interessam.

Gatilho 3 — volta em dinheiro acima de R$ 100 mil. Volta = preço × (1 − teto de permuta), e o teto é campo fechado de 30/50/70/100%. Logo: com teto de 70% ele dispara em qualquer bem acima de R$ 333 mil; com teto de 50%, acima de R$ 200 mil. As duas categorias do ano 1 são relógio e carro premium, e o ticket que esta mesa já orçou é de R$ 300–500 mil. Gatilho 4 — operação acima de R$ 1 milhão — dispara sozinho no exemplo dele. Resultado: entre os lotes que chegam à adjudicação, a mesa é o caminho **padrão**, não a exceção. E lote adjudicado é o único universo onde a mesa existe: pela meta do próprio piloto (12–20 lotes abertos, 4–6 com proposta firme, 2–3 liquidadas), são **4 a 6 mesas por trimestre, das quais 3 a 5 disparam por gatilho**. "Exceção" é retórica.

Pior: só o gatilho 1 exige duas pernas de categorias diferentes. Os gatilhos 2 a 6 disparam em **lote de perna única** — e ali não há cesta, não há mercados distintos e não há a defesa que ele mesmo construiu. O que existe é a casa sentada, com script, cálculo de VLG e ata, entre um anunciante e um único adjudicatário, negociando preço numa operação em que ela cobra fee dos dois. Isso não é mesa cross-categoria: é a casa participando da formação de preço. Defeito de desenho, não de rótulo.

### 2. A mesa atrás do lance cego desfaz o lance cego — e o saldo é negativo

Este é o erro de mecanismo, e é o que derruba a tese central de que "são etapas, não alternativas". Ele trata os dois mecanismos como independentes e aditivos. Não são: **o segundo muda o equilíbrio do primeiro.**

Um licitante que sabe que existe uma sala depois, na qual pode ser chamado a melhorar, não dá o lance no valor — dá no valor menos a concessão esperada da sala. Chame de reserva de sala: 3 a 6 pontos percentuais de deságio guardados (estimativa declarada, e é o comportamento padrão de qualquer leilão com renegociação pós-adjudicação). Sobre os R$ 1,2 milhão de referência do exemplo dele, isso é **R$ 36 a 72 mil de deságio reaberto** — contra os R$ 18 mil que a mesa foi convocada para fechar. A mesa custa de 2 a 4 vezes o que produz, e o custo sai exatamente da compressão de R$ 168 mil que ele credita ao lance cego.

E a variável nº 1 da pauta dele não existe. "Fecha-se com volta de R$ 468 mil em vez de R$ 450 mil" — quem paga esses R$ 18 mil é o **cliente final**, e a regra dele, correta, é que o cliente final nunca entra na sala. Sobra o adjudicatário subir R$ 18 mil na frente dos outros, o que converte lance cego em pregão aberto com a casa presente, ou o anunciante absorver — que é desconto, não ajuste. Das quatro variáveis, duas (frete/transferência e resíduo) valem centenas ou poucos milhares e não movem um gap; uma (prazo) é preço disfarçado; e a que move de fato depende de quem não está na sala.

### 3. O exemplo que justifica a mesa é um exemplo de ano 2

A conta dele usa deságio de 14% nas **duas** pernas. Uma delas é um apartamento. O modelo aprovado tem lista roteada em duas categorias — relógio e carro premium — e imóvel, barco e aeronave entram apenas como bem ofertado, com dois telefonemas do gestor. Ele registra a limitação e depois monta o argumento ignorando-a.

Refazendo com a realidade do ano 1: imóvel com dois lances por telefone (deságio 28%, o número dele para comprador único) = R$ 576 mil; carro com lance cego a 14% = R$ 344 mil; total R$ 920 mil contra R$ 1,05 milhão exigido. **Gap de −R$ 130 mil, ou −12,4%** — dentro da faixa que ele mandou convocar mesa. Só que agora a sala precisa pontear R$ 130 mil, não R$ 18 mil. Se o anunciante absorver, ele come 8,7% do preço do relógio; a margem de relojoeiro em peça seminova de alto valor é de 8 a 15% (estimativa declarada), ou seja, **o ajuste consome de 58% a 108% da margem inteira da operação**. Se for o cliente, a volta sobe de R$ 450 para R$ 580 mil — 29% a mais em dinheiro, e ele vende o apartamento sozinho.

Conclusão dura: **a aritmética da mesa só fecha quando as duas pernas têm lista roteada, e no ano 1 exatamente uma tem.** No ano 1 a mesa é convocada para fracassar, e cada fracasso queima uma hora de cinco CNPJs e a credibilidade da casa junto aos 24–30 anunciantes que custaram R$ 15–45 mil de telefone para recrutar.

### 4. As travas custam mais do que a mesa cria

Trava 3: ausência no minuto marcado = perda automática da adjudicação, perna passa ao 2º melhor VLG. Com três lances, o spread entre 1º e 2º fica em 4 a 8% (estimativa declarada). Sobre a perna de R$ 688 mil, são **R$ 27 a 55 mil de VLG perdidos** — de 1,5 a 3 vezes o valor total que a mesa existe para criar. Um dealer preso no trânsito destrói a operação inteira, e a casa acabou de decidir sozinha, sobre o bem de um terceiro, aceitar R$ 27–55 mil a menos. Não é antídoto, é gatilho de destruição.

Trava 1 + janela de convocação não cabem no calendário. Lance vinculante por 5 dias úteis; convocação em 24h; mesa em até 5 dias úteis. Isso é folga zero: um remarcação e todos os lances na sala estão vencidos. E o laudo e as certidões do imóvel — condição resolutiva obrigatória, R$ 2–5 mil e 10 a 20 dias — não cabem em nenhum ponto dessa régua. Ou se assina no escuro sobre a perna imobiliária, ou não se assina na sala.

### 5. Caixa e execução: quem faz isso, e com que dinheiro

O custo direto da mesa é o menor dos problemas — e registro isso a favor dele: 6 a 10 horas de gestor por mesa (agendamento com remarcação, preparo, condução, ata, Termo por perna, arquivo PLD; estimativa declarada) a R$ 45–85/hora carregados dá R$ 270 a 850. Margem positiva. O problema é outro, em três frentes.

**Primeira, o número da ata está errado.** Os R$ 8.800 (0,59%) omitem os dois laudos obrigatórios — todo bem que cruza categoria exige laudo de terceiro credenciado, R$ 1,5–3,5 mil cada, e no imóvel é R$ 2–5 mil. A carga real na operação é de **R$ 11.800 a 15.800, 0,79% a 1,05%**. E, cobrando só na liquidação, o trimestre do piloto arrecada de dossiê R$ 6 a 15 mil contra R$ 60–140 mil de custo. A mesa não é linha de receita — ele diz isso e está certo —, então o 0,59% não deve entrar em ata como se dimensionasse alguma coisa.

**Segunda, a assinatura na sala não acontece.** "Advogado de participante assiste, não fala" e "saída única é o Termo assinado na sala" são incompatíveis com um CNPJ de 5 anos de praça assinando obrigação de R$ 500 mil em 60 minutos. A deliberação de 13/07 já registrou que o contrato de adesão **será negociado, não apenas assinado**. Ou o Termo de Operação Conjugada é anexo pré-negociado do Termo de Absorvedor, fechado nas semanas 2–7 junto com a lista (mais R$ 6–12 mil de jurídico, estimativa), ou a trava 4 cai e com ela a "decisão obrigatória em 60 minutos".

**Terceira, o gestor não tem autoridade e o Cleber tem.** Tirar o Cleber da condução é correto e é inexequível sem um terceiro: numa sala de R$ 1,5 milhão, cinco CNPJs não obedecem a um operador contratado que lê script. Ou entra o advogado da casa por hora (R$ 400–1.500 por mesa, estimativa), ou a sala volta a orbitar o sócio que é parte. E a aderência ao script, com um operador não-jurídico sob pressão de tempo, fica em 60–80% nas dez primeiras mesas — e é justamente a cauda de 20–40% que produz a gravação que machuca.

### 6. Colisões com decisões já tomadas

**O parecer concorrencial não cobre a mesa.** O objeto aprovado na semana 1 é a mecânica do leilão reverso: ordenação de destinatários, cap, lance cego, contabilidade de reciprocidade. A mesa não está lá. Operar mesa antes de o parecer alcançá-la viola a condição que esta mesa impôs a si mesma.

**A gravação de 5 anos colide com "circula o bem, nunca a pessoa".** Numa sala gravada, o anunciante dirá o bairro, o valor e o fato de que um cliente identificável está liquidando patrimônio. Retido cinco anos, isso é material de reidentificação sob a sanção que mata a empresa — suspensão do banco de dados, art. 52, X.

**"A mesa não adiciona risco" é falso.** Ela converte risco não medido em risco documentado, o que é melhor **condicionado ao script ser seguido todas as vezes**. Com um gestor, sem compliance officer, não será. Ata boa é a melhor prova de inocência; ata ruim, gravada, é a melhor prova do contrário — e o CADE lê a ata antes de ler a defesa.

**O gatilho de −15% mata o próprio piloto.** Declarar deserto no mesmo dia abaixo de −15% é matar por algoritmo, no trimestre em que a base opt-in de compradores ainda não existe e o deságio esperado é de 25–30%. Aplicada no piloto, a régua zera as metas de 4–6 propostas firmes e 2–3 liquidadas. Além disso põe a casa decidindo sobre o bem de terceiro: quem declara deserto é o anunciante, sempre. O gestor apresenta o gap; não sentencia.

**O teste do CNPJ é certo e inexequível como está.** A Ficha de Apetite declara o que o dealer quer absorver, não tudo o que vende. E a evidência do próprio Cleber, numa única semana, é estética automotiva do Ceará e corretor de Balneário entrando em relógio. Se 20 a 40% da lista de carro também declarar relógio (estimativa ancorada nesses dois casos e na frase dele, "hoje todo mundo está no mercado de relógio"), então 20 a 40% das mesas de duas pernas do ano 1 são proibidas pela regra dele e exigem substituição pelo 2º VLG — com o custo de R$ 27–55 mil por perna calculado acima.

**E o indicador não decide nada no dia 90.** "Em 40 operações ele responde a pergunta que decide a empresa": no ritmo do piloto (4–6 lotes adjudicados por trimestre) são 7 a 10 trimestres. Mesmo triplicando o ritmo no ano 2, é resposta de mês 15 a 24. A régua do dia 90 continua sendo a que já está em ata, nesta ordem: mediana de elegíveis após filtro duro ≥ 8, depois % de lotes com 3+ faixas indicativas.

### Veredito

A sequência que ele propôs — mesa só depois, só com vencedores — é a **correção** do desenho, não a tese. A tese, de que isso resolve o conflito e elimina o risco antitruste central, está refutada: o gatilho dispara em lote de perna única onde a defesa não existe; a mesa atrás do lance cego devolve de 2 a 4 vezes mais deságio do que recupera; a única variável que fecha gap depende de quem não está na sala; e no ano 1, com uma perna sem lista, o gap a pontear é de R$ 114–130 mil e consome de 58% a 108% da margem do anunciante. No ano 1 a mesa não é o segundo estágio de um motor: é uma reunião cara convocada para não fechar.

**Ajuste exigido:** ## O QUE VAI A ATA NO LUGAR

**1. Nada de mesa no ano 1 como rito. Fica "Ajuste de Cesta", e é assíncrono.** Fechados todos os lances, o gestor calcula o gap de viabilidade e entrega ao anunciante uma folha de uma página: pernas adjudicadas, VLG, prazos, gap em R$ e em %. O anunciante decide em 48h — liquida, pede ajuste ou declara deserto. É ele quem fala com o cliente sobre a volta em dinheiro ("um cliente, uma voz"). Custo: 40 minutos de gestor. Zero sala, zero gravação, zero ata assinada, zero exposição.

**2. Sala presencial/videochamada só sob quatro condições cumulativas, e no máximo 2 vezes no trimestre:** (a) 2 ou mais pernas de categorias distintas — nunca perna única; (b) todas as pernas já adjudicadas; (c) gap entre −8% e 0% **depois** do ajuste assíncrono ter falhado; (d) parecer concorrencial já emitido cobrindo a mesa. Fora disso, telefone 1-a-1.

**3. Preço congelado na sala.** As únicas variáveis ajustáveis são prazo de liquidação, frete, transferência e absorção de resíduo pelo anunciante. Nenhum adjudicatário melhora lance dentro da sala. Se o gap só fecha com preço, o lote volta a **segunda rodada cega de 48h** com os mesmos adjudicatários, devolvida à casa. Isso preserva o lance cego — que é o mecanismo que gera o dinheiro — em vez de destruí-lo.

**4. Trava de no-show corrigida.** Tolerância de 60 minutos e uma remarcação em 48h. Perda da adjudicação só na segunda falta. Substituição pelo 2º VLG **apenas com aceite escrito do anunciante** — o VLG é dinheiro dele, não da casa. Suspensão de 90 dias no roteamento fica.

**5. Lance vinculante sobe para 15 dias úteis em lote com 2+ pernas.** Sem isso, laudo e certidões — condição resolutiva obrigatória, R$ 2–5 mil e 10 a 20 dias no imóvel — vencem os lances antes da liquidação.

**6. Termo de Operação Conjugada pré-negociado.** Vira anexo do Termo de Absorvedor e do contrato do anunciante, fechado nas semanas 2–7 junto com a construção das listas. Orçar R$ 6–12 mil de jurídico incremental (estimativa). Nada se assina em sala que não tenha sido lido pelo advogado do participante antes.

**7. Escopo do parecer concorrencial ampliado na semana 1**, com custo incremental de R$ 2–4 mil (estimativa): incluir a sala de ajuste, o teste de sobreposição por CNPJ e a rodada quinzenal de matching. Enquanto o parecer não sair, a rodada quinzenal volta a ser corretagem 1-a-1, sem sala — concordo com o analista no diagnóstico e vou além na consequência.

**8. Gravação: só áudio, bem referido por código de lote, proibida menção a nome, bairro, endereço ou identificador registral; expurgo em 12 meses salvo litígio.** Retenção de 5 anos apenas da ata escrita, dentro do dossiê PLD.

**9. Gap de viabilidade entra na planilha desde o lote nº 1** — duas células, custo zero — com leitura de sinal e dispersão no dia 90 e veredito preço-vs-estrutura só no mês 15+. Ele não desloca a régua de decisão já aprovada (mediana de elegíveis ≥ 8, depois % de lotes com 3+ faixas).

**10. Variável do gestor por lote adjudicado com 3+ faixas indicativas, não por lote liquidado**, e limitada a 20% da remuneração. Pagar por liquidação empurra o roteamento para os fechadores rápidos e corrompe a ordenação por critérios objetivos — que é a defesa antitruste inteira.

**11. Número correto na ata:** carga da operação conjugada é de R$ 11.800 a 15.800 (fees + dois laudos + dossiê), 0,79% a 1,05% sobre R$ 1,5 milhão, e não R$ 8.800 / 0,59%. Nenhum laudo pode ser omitido da conta: ele é condição resolutiva, não item opcional.


### Refutação 7 — TESE REFUTADA

## REFUTAÇÃO — A MESA NÃO SE SALVA PELO SEQUENCIAMENTO, E A CONTA QUE A SUSTENTA É EMPRESTADA DE OUTRO MECANISMO

Vinte e três anos comprando e vendendo bem de alto valor no Brasil me ensinaram uma coisa que não está em nenhuma ata desta mesa: **negócio complexo não fecha em sala, fecha em corredor.** A tese do analista é elegante, o sequenciamento é uma boa observação, e ela está errada nos três testes que importam — o dealer faria, o cliente aceitaria, e a regra sobrevive à primeira briga de dinheiro. Refuto nos três, e refuto primeiro pela aritmética, porque é onde o argumento é mais frágil e ele não percebeu.

### 1. O número que carrega o argumento inteiro veio de outro lugar

O analista mostra o lance cego fechando R$ 168 mil de um gap de R$ 186 mil porque comprime o deságio de 28% para **14%**, e credita essa compressão à ata: "a ata já estima a compressão de 25–30% para 8–15%".

Não estima. O parecer de 25/07, seção 6, atribui essa compressão à **base opt-in de compradores** — *"é ela que depois comprime o deságio de 25–30% para 8–15%"*. É a base de demanda de varejo, não o número de licitantes atacadistas. O deságio de 8–15% é o que se obtém quando o bem vai para um **comprador final**; o deságio de 20–30% é o que se obtém quando o bem vai para um **dealer que precisa revender**. São dois compradores diferentes, com duas contas de margem diferentes, e nenhum leilão entre dealers converte um no outro. Dez dealers disputando um apartamento não pagam preço de varejo; pagam o teto do atacado, que é o mesmo teto com dez ou com dois — o leilão descobre **qual** dealer paga o teto, não move o teto.

E a própria ata fixa a expectativa do motor: a régua do dia 90 aprova a mecânica com *"deságio médio até 25%"*. Vinte e cinco por cento é a nota de aprovação da mesa, não 14%.

Refaço o exemplo dele com os números da própria mesa. Relógio R$ 1,5 mi, teto de permuta 70% → R$ 1,05 mi em bem. Cesta de referência R$ 800 mil (imóvel) + R$ 400 mil (carro):

- deságio 25% (nota de aprovação da ata): R$ 600 mil + R$ 300 mil = **R$ 900 mil. Gap: −R$ 150 mil (−14,3%).**
- deságio 20% (otimista para atacado): R$ 640 mil + R$ 320 mil = **R$ 960 mil. Gap: −R$ 90 mil (−8,6%).**

O gap que a mesa dele precisa pontear não é R$ 18 mil. É **R$ 90 a 150 mil** — e ele mesmo escreveu a sentença que mata a própria proposta: *"Mesa sem lance cego tenta pontear R$ 186 mil e não ponteia."* Com o deságio real, é exatamente essa a mesa que ele está convocando.

### 2. As quatro variáveis, precificadas: a mesa move R$ 45–60 mil, e quase tudo é transferência de custo

Ele autoriza ajuste em quatro variáveis. Coloco preço nelas, estimativa declarada, praça SP 2026:

- **quem paga transferência do imóvel** — ITBI 2–3% sobre R$ 800 mil = R$ 16–24 mil, mais escritura e registro R$ 12–16 mil. **R$ 28–40 mil.** É a maior alavanca da mesa e é um tributo devido pelo adquirente; deslocá-lo por contrato é possível, criar valor com ele não é.
- **frete e transferência do veículo** — DETRAN, despachante e transporte interestadual: **R$ 2–6 mil.** Irrelevante.
- **prazo de liquidação** — a 1,5% a.m., a taxa da própria ata, 30 dias sobre R$ 1 milhão: **R$ 15 mil.**
- **absorção de resíduo pelo anunciante** — ilimitada, e é a única que fecha qualquer coisa. Mas o anunciante absorver resíduo **não exige reunião nenhuma**: é uma decisão de uma pessoa só, que ele toma sozinho, no telefone, em trinta segundos.

Teto de ponte da mesa, excluída a absorção: **R$ 45–60 mil**, ou 3 a 4% da operação. O gatilho 2 do analista convoca mesa para gap de até **−15%**. Ele está convocando cinco pessoas para fracassar em 60 minutos cronometrados, com ata assinada do fracasso. A banda tem de ser −4% a 0%, e nessa banda o problema é tão pequeno que não justifica uma sala.

E note o que as três primeiras variáveis são: **transferência pura**. Ninguém cria valor movendo ITBI de lado. Alguém paga. O que nos leva ao erro central da tese.

### 3. "Ninguém disputa nada com ninguém" é falso — a sala é o único momento genuinamente soma-zero da operação

No lance cego os concorrentes disputam contra o **preço de reserva**, cegos, sem se ver, cada um contra a própria conta. Isso é rivalidade anônima e civilizada. Na mesa, os adjudicatários disputam **quem come o resíduo** — e aí sim, olho no olho, gravados, com ata. O lance cego é a parte pacífica; a mesa é a briga.

Comportamento real: o adjudicatário do carro, convidado a ceder R$ 18 mil (ou R$ 90 mil) na frente de um corretor que ele vai reencontrar no próximo lote, **não cede**. Não porque seja duro, mas porque concessão pública é precedente. No telefone ele cede — porque ninguém viu, e amanhã ele nega. Numa chamada gravada e arquivada por 5 anos dentro do dossiê PLD, cada centavo cedido é um documento que o outro lado invoca no lote seguinte. **A formalização não formaliza a concessão: ela a destrói.** O analista escreve que a mesa "formaliza uma conversa que já acontece hoje por telefone". Ela não formaliza a mesma conversa. Ela cria outra, com outra teoria dos jogos.

E quem cede, sistematicamente? O **anunciante** — o único com R$ 1,5 milhão em risco contra os R$ 90 mil dos outros. Ou seja: o custo estrutural da mesa recai inteiro sobre o lado que **paga a mensalidade** (R$ 1.500–3.000 a partir do mês 4) e que é a praça pessoal do Cleber. Três mesas em que o anunciante come o resíduo e ele para de ligar "aceita permuta" nas peças grandes — ou volta ao telefonema que sempre funcionou. O desenho cobra do lado que sustenta a receita.

### 4. A sanção pune a coisa errada

No-show custa a adjudicação e 90 dias fora do roteamento. Ótimo — e inútil. O dealer que calcula que a sala vai lhe custar R$ 90 mil **não falta**: ele comparece, cumpre tudo, e diz "meu lance é firme, não subo" por 60 minutos. A regra de decisão obrigatória ao final do relógio torna o estonteamento a estratégia dominante: basta segurar uma hora e o cronômetro trabalha por ele. Ele perde nada, a operação morre, e a ata registra que ele foi impecável.

Pior: o primeiro advogado competente que ler a pauta vai orientar o cliente a **não** comparecer a uma chamada gravada com dois concorrentes de mercado. O analista prevê "advogado assiste, não fala". Advogado que assiste é advogado que, no minuto seis, manda o cliente sair. Aí dispara a sanção, e a perna cai. **O rigor de compliance do desenho produz exatamente a ausência que ele pune, e transfere o prejuízo para a operação.**

### 5. A perna de imóvel, que é o exemplo carro-chefe do Cleber, não tem adjudicatário

Quem é o CNPJ brasileiro que compra um apartamento pronto de R$ 800 mil, com deságio de 14%, em 10 dias úteis, e coloca em estoque? Não existe como classe. Incorporadora faz permuta de **terreno**, não de unidade pronta. Fundo e comprador à vista de imóvel operam a −25% a −35% e levam 30 a 60 dias em matrícula, IPTU, condomínio, ações contra o vendedor e certidões. O analista reconhece que imóvel, barco e aeronave não têm lista roteada e propõe "dois lances firmes por telefone" — e então segue tratando o adjudicatário do imóvel como alguém que entra numa videochamada de 60 minutos com lance vinculante.

Consequência operacional que ninguém precificou: enquanto a perna imobiliária resolve, o **relógio de R$ 1,5 milhão fica fora de giro por 30 a 60 dias**. A ata de 25/07 já proibiu esse desenho por outro caminho ao exigir sinal de 10–20% em D+2 justamente para não deixar o bem principal parado. A mesa cross-categoria reinstala a parada.

### 6. O lance firme vinculante por 5 dias numa cesta aberta é uma opção escrita de graça — e o dealer a precifica

O analista exige lance firme antes da sala. Correto em princípio. Mas o dealer da perna A dá lance irrevogável sobre um bem que só existe se as pernas B e C fecharem, e ele **não vê B nem C**. Ele está vendendo uma opção de compra ao anunciante, sem prêmio, por 5 dias. Comportamento real: ele não recusa — ele **desconta o risco de cadeia**, 3 a 8 pontos de deságio a mais. Isto é, o desenho que existe para comprimir o deságio o **amplia**. O sequenciamento do analista, que ele apresenta como solução, é a causa desse custo: ele fecha todos os lances antes de saber se a operação existe.

### 7. O cliente: a sala reconstrói o patrimônio de uma pessoa identificável, e grava

"O cliente final nunca entra." Certo — e é isso que o condena. Cinco profissionais numa sala gravada discutem que **uma pessoa** tem um apartamento de R$ 800 mil, um carro de R$ 400 mil e está comprando um Patek de R$ 1,5 milhão. Não se ajusta a estrutura de uma operação conjugada sem descrever a cesta, e descrever a cesta é reconstruir o dono. O parecer de 25/07 é literal: *"Circula o bem, nunca a pessoa"*, e identifica a sanção que desliga a empresa — suspensão do banco de dados, art. 52, X, da LGPD, não a multa. A proibição nº 7 de 13/07 veda circular dossiê patrimonial entre lojas. **A mesa é o dispositivo que viola as duas verbalmente e depois arquiva a prova por cinco anos dentro do dossiê PLD, onde é plenamente produzível.**

E o cliente descobre. A identidade do ofertante vai ao vencedor por regra — o adjudicatário do apartamento passa a conhecê-lo. Duas semanas depois ele ouve "teve uma reunião sobre o seu apartamento". Cliente de alto patrimônio no Brasil não aceita ser objeto de pauta. Ele não reclama: ele some, e conta para três pares. Para uma marca de 27 anos, esse é o evento mais caro do catálogo, e no desenho proposto ele é o **modo normal de operação**, não o modo de falha.

### 8. Antitruste: o sequenciamento não toca o risco real, e o teste de CNPJ briga com o pitch da empresa

O analista acredita que o risco central era rivalidade pelo mesmo bem. Não era. O risco é **participantes de mercado numa sala convocada por parte interessada, tratando de preço, prazo e encargo**. Isso permanece intacto depois do sequenciamento. Some-se: o gestor que conduz tem variável **por lote liquidado** e a mesa só liquida se a sala disser sim. Papel "estritamente procedimental" com remuneração contingente ao resultado da reunião que ele convoca, pauta e grava não é neutralidade — é aparência de neutralidade, e a gravação captura a inclinação. Ele quer a ata como prova de inocência; ata só prova inocência se **todos os 60 minutos forem inocentes**. Em 40 operações, são cerca de 40 horas de conversa ao vivo entre gente que se conhece do mercado, com dinheiro na mesa. A probabilidade de nenhuma frase do tipo "nessa faixa eu costumo pagar X" aparecer tende a zero. A lista negativa dele existe justamente porque ele sabe quais assuntos vão surgir.

E há a contradição que ele viu pela metade. Ele acerta que o teste é a **categoria declarada do CNPJ**. Só que o pitch da empresa, na palavra do Cleber, é *"a partir de hoje você não é só vendedor de imóveis: você vende carro, barco, aeronave, qualquer produto"*, e a evidência de campo (estética automotiva do Ceará, corretor de Balneário) é de que já está acontecendo. **Se o pitch funcionar, todo membro será multicategoria e nenhuma mesa será componível.** O sucesso comercial destrói a legalidade do mecanismo em 12 a 18 meses. Pior: a Ficha de Apetite é **autodeclarada** e o membro tem incentivo direto a subdeclarar categoria para permanecer elegível a roteamento e a sala. Teste de conformidade cujo insumo é declaração do próprio testado, com ganho em mentir, não é teste.

### 9. O falso binário que sustenta a conclusão

Ele encerra com: *"o que é indefensável não é sentar: é sentar sem papel."* A escolha não é entre sala com papel e telefonema sem papel. É entre **sala com papel** e **telefonema com papel** — e a mesa já decidiu isto em 25/07: Balcão de Contrapartida no manual, *"WhatsApp 1-a-1 (nunca grupo)"*. O ajuste sequencial conduzido pelo gestor produz o mesmo registro, move as mesmas quatro variáveis, e nunca põe dois participantes de mercado ouvindo um ao outro. A simultaneidade só é necessária se as partes precisarem **ver** a concessão alheia — e ver a concessão alheia é precisamente a única coisa que não se pode permitir, comercial e juridicamente. O analista reabre uma decisão tomada e não registra que a está reabrindo.

### O que eu subscrevo dele, e é bastante

Três coisas entram em ata com meu voto, e a terceira é a melhor contribuição da rodada:

1. **Nenhuma conversa de ajuste antes de fechados todos os lances, e só com adjudicatário.** O princípio é correto. Aplico-o ao ajuste sequencial, não à sala.
2. **A rodada quinzenal de matching carrega risco maior que a mesa por lote.** Correto, e vou além dele: recorrente, composição estável e pauta aberta é associação de fato. Deixa de ser reunião e vira lote de chamadas 1-a-1 do gestor, com pauta por operação identificada.
3. **Gap de viabilidade por lote, antes e depois do ajuste, como indicador.** É o único número que responde se esta empresa falha por **preço** ou por **estrutura**, e as duas respostas pedem investimentos opostos. Entra no plano de medição sem uma vírgula alterada — com um acréscimo: medido **por perna e separado entre perna roteada (relógio, carro) e perna de telefone (imóvel, barco, aeronave)**, senão a média esconde que o gap inteiro nasce nas pernas sem lista.

**Voto: mesa colaborativa reprovada no ano 1, em qualquer formato de sala conjunta.** O conflito de mecânica se resolve, mas não como ele propôs: resolve-se mantendo o lance cego como motor único e substituindo a sala por ajuste sequencial documentado, com o resíduo alocado por contrato antes da abertura do lote, e não negociado depois dele.

**Ajuste exigido:** ## O QUE ENTRA NO LUGAR — EXECUTÁVEL NA SEMANA 1, SEM UMA LINHA DE CÓDIGO

**1. Campo 9 da Declaração de Aceite: banda de resíduo declarada ex ante.** Os oito campos aprovados em 25/07 ganham um nono, obrigatório quando `aceita_permuta = sim`: *"fecho automaticamente com resíduo de até X% do valor em bem, absorvido por (a) mim, (b) abatimento na volta em dinheiro, ou (c) prazo estendido em até N dias"*. Sugestão de default: 3%. Fechado o lance de todas as pernas, se o gap cair dentro da banda, o sistema fecha sozinho — sem reunião, sem conversa, sem ata de reunião nenhuma. O anunciante, que é quem tem R$ 1,5 milhão em jogo e quem sempre acaba cedendo, decide **antes** e sozinho, quando ainda tem poder de barganha, em vez de decidir depois, gravado, com três contrapartes olhando. Isto converte o problema inteiro da "mesa" em um campo de formulário. Custo: um dia de trabalho.

**2. Ajuste sequencial conduzido pelo gestor (shuttle), quando o gap ficar fora da banda.** Nunca em sala conjunta. Regras: teto de 48h corridas; ordem de abordagem fixa e publicada no regulamento (1º o anunciante, contra a própria banda; 2º a perna de maior VLG; 3º as demais em ordem decrescente); cada rodada por escrito, 1-a-1, com proposta única e prazo de 4h para aceite ou recusa; o gestor **jamais** informa a um participante o número, o nome ou a posição de outro — só o delta que se pede dele. Saída única: Termo de Operação Conjugada assinado por perna, ou deserto com motivo enum. Produz o mesmo registro, arquivável no mesmo dossiê PLD, sem colocar dois participantes de mercado no mesmo ambiente. **Cleber não conduz shuttle de lote em que é anunciante** — vale exatamente como o analista propôs para a sala.

**3. Recalibrar o gatilho pela capacidade real de ponte.** As quatro variáveis movem **R$ 45–60 mil numa operação de R$ 1,5 milhão, cerca de 3–4%** (estimativa: ITBI 2–3% + escritura/registro = R$ 28–40 mil na perna imóvel; DETRAN, despachante e frete = R$ 2–6 mil na perna veículo; prazo a 1,5% a.m. por 30 dias = R$ 15 mil). Logo: gap entre **−4% e 0%** → shuttle. Abaixo de −4% → deserto no mesmo dia, com devolutiva ao anunciante propondo revisão do teto de permuta ou da volta mínima e reabertura como lote novo. A banda de −15% do analista convoca gente para fracassar.

**4. Matar a opção gratuita no lance firme.** O lance firme de perna em cesta multi-perna passa a ser **condicionado**: vinculante por 5 dias úteis **e** automaticamente extinto se a operação não for adjudicada em todas as pernas dentro desse prazo, com obrigação recíproca do anunciante de adjudicar ou declarar deserto em 24h do último lance. Sem isso o dealer escreve uma opção de graça e cobra por ela no deságio — 3 a 8 pontos, estimativa —, o que anula o ganho que o lance cego deveria produzir.

**5. Perna de imóvel fora da cesta no ano 1 acima de R$ 300 mil**, salvo comprador com prova de fundos e prazo declarado. Não existe classe de CNPJ brasileiro que compre unidade residencial pronta a −14% em 10 dias úteis; a referência real é **−25% a −35% com 30 a 60 dias** de matrícula, IPTU, condomínio e certidões. Enquanto isso o bem principal fica fora de giro, contra o desenho de sinal em D+2 já aprovado. Regra prática: cesta com perna de imóvel só abre se o anunciante assinar ciência do prazo e do deságio de referência **antes** da abertura do lote. Barco e aeronave, idem — roteamento manual por telefone, dois lances firmes mínimos, e o número de referência declarado ao anunciante na largada.

**6. Rodada quinzenal de matching: deixa de ser reunião.** Vira lote de chamadas 1-a-1 do gestor, pauta por operação identificada, registro individual. Reunião recorrente com composição estável é o risco maior desta arquitetura, e nisso o analista está certo contra o parecer de 24/07.

**7. Indicador novo no plano de medição, aprovado sem alteração de mérito:** `gap_de_viabilidade` por lote, **antes e depois do ajuste**, segmentado por perna e separando perna roteada (relógio, carro premium) de perna de telefone (imóvel, barco, aeronave). Eventos mínimos: `lote.gap_calculado`, `shuttle.iniciado`, `perna.ajustada` (variável e delta), `termo.assinado` / `lote.sem_acordo` (motivo enum). Em 40 lotes este é o número que decide se a empresa investe em **mais licitantes** (falha de preço) ou em **capacidade de estruturação** (falha de estrutura).

**8. Se os sócios insistirem na sala conjunta, ela não entra no ano 1 e tem pré-condições cumulativas:** 40 lotes liquidados pelo shuttle; parecer concorrencial específico sobre o formato de sala, além do parecer sobre o roteamento já contratado na semana 1; variável do gestor **desligada** do lote em que ele conduz; consentimento expresso e informado do dono da cesta sobre a existência da reunião, colhido antes da abertura do lote; e cesta descrita na sala por perna, sem soma, sem preço do bem principal e sem qualquer elemento que permita reconstruir o patrimônio de uma pessoa. Se essas condições tornarem a sala inútil — e vão tornar —, isso é a resposta, não um obstáculo.


### Refutação 8 — TESE REFUTADA

REFUTAÇÃO — CADEIRA DE NÚMEROS, CAIXA E EXECUÇÃO

Voto pela refutação da tese como enunciada. Ela tem um achado real no meio (a inversão da confiança para o lado do bem que ENTRA), mas as quatro pernas da frase-tese — circulação controlada como produto emitido ao dono, registro de R$ 0, escrow coordenado no ano 1 e trava dos 20% — não sobrevivem à conta, ao caixa, ao headcount ou às decisões já fechadas. Vou pelo que quebra primeiro.

1. O PRODUTO É EMITIDO A UMA PESSOA QUE NÃO É CONTRAPARTE NOSSA — E O PITCH TROCA QUEM ADJUDICA

A tese fala em "folha emitida ao dono" e o script diz "o dono escolhe". O desenho aprovado na rodada 3, item 3.5, diz o contrário com todas as letras: quem adjudica em 24h, com `motivo_da_escolha` obrigatório, é o ANUNCIANTE. O dono do bem de contrapartida é, por construção (item 3.2), o comprador do relógio — cliente do lojista membro, não nosso. Passar a emitir documento a ele e a dar a ele o poder de adjudicar faz três coisas de uma vez: rompe "um cliente, uma voz", que é inegociável em ata desde 13/07; cria obrigação documental da casa perante uma PF que não assinou contrato, não tem KYC e não tem base legal colhida; e transfere o `motivo_da_escolha` — que existe como trilha antitruste — para alguém que não está sujeito a nenhuma regra nossa. A pergunta que abre a tese ("o que faz o dono preferir a WebLuxury ao corretor conhecido") é, além disso, a pergunta da PF vendedora com anúncio próprio, reprovada em ata para todas as fases do ano 1. Estamos desenhando o produto de uma persona que o modelo aprovado não atende.

2. A PROMESSA DOS 8–12 COLIDE COM AS ONDAS 2 E 3, E A COLISÃO VALE O PILOTO INTEIRO

O item 3.3 aprovado prevê onda 2 (+8, praça relaxada) sem 2 propostas em 24h e onda 3 (+8, faixa relaxada ±20%) em 48h. O teto real é 24, não 12. O script diz "mando para 8 a 12 lojas que declararam apetite para exatamente esse carro" — falso no instante em que a onda 2 dispara, porque onda 2 e 3 são por definição lojas cujo apetite declarado NÃO bate. Ou a tese mata as ondas, ou o Registro é uma folha que diz 24.

Matar as ondas custa isto, com a matemática da própria mesa (ρ = taxa de resposta com número): com cap 10 e ρ = 0,35, a probabilidade de um lote juntar 3+ faixas indicativas é 74% — passa o critério de 60% do dia 90. Com ρ = 0,20, que é um valor perfeitamente possível numa lista fria de 45–60 nomes sem histórico, a mesma probabilidade cai para 32% — abaixo do piso de 40%, ou seja, "o motor não é o produto". Com 24 destinatários e ρ = 0,20, sobe para 88%. As ondas são a apólice contra o cenário em que ρ é menor do que estimamos, e a tese propõe gastar essa apólice numa frase de marketing. Estimativa declarada, binomial simples, mas a ordem de grandeza é essa: a decisão de dia 90 do piloto pode virar em função dessa única escolha.

Ninguém viu ainda um efeito colateral das ondas, e registro: convite de onda 2/3 chega a dealer fora do apetite declarado. Se ele contar para o gatilho de "três não-respostas em 90 dias tiram do roteamento", nós expulsamos da lista gratuita exatamente quem se comportou de forma correta. Convite de onda 2/3 não pode contar no contador de silêncio.

3. "CUSTO R$ 0" É O ERRO QUE ESTA MESA JÁ CORRIGIU UMA VEZ

Na rodada 2 a mesa derrubou o teto de "menos de R$ 2 mil/mês" para os quatro objetos de prateleira com a frase certa: não são ferramentas, são o cargo de uma pessoa. A tese repete o erro, e nos dois itens que ela marca como "R$ 0 / complexidade baixa".

Contagem de horas recorrentes que a tese cria, contra o headcount aprovado (Cleber, Nicolas e um gestor de rede a R$ 8–15 mil/mês, que ainda não foi contratado): emissão e verificação do Registro em 12–20 lotes/mês, 20–40 min cada, 4–13 h/mês; comitê de três nomes com ata por admissão, 6–10 admissões/trimestre, 27–45 pessoa-horas/trimestre; publicação trimestral de taxa de reprovação, mediana de prazo e registro de incidentes, 8–16 h/trimestre com alguém capaz de defender o número em público; controle do campo `origem` e da isenção de 180 dias por bem, que numa planilha com uma aba por lote é busca manual entre abas, 2–4 h/mês; coordenação documental do escrow, 4–8 h por operação. Somo 20–45 h/mês recorrentes mais 35–60 h de itens únicos, em cima das 54–140 h/mês de roteamento que a mesa já disse exigirem contratação dedicada. Isso é meia pessoa a mais, R$ 4–8 mil/mês, numa empresa com déficit estimado de R$ 20–50 mil/mês e capital não declarado pela terceira sessão consecutiva. R$ 0 de licença não é R$ 0 de folha.

E há o problema jurídico do documento: uma folha assinada pela casa afirmando que nenhum destinatário recebeu identificador registral só é verdadeira se existir canal logado que prove. O canal aprovado para as semanas 8–13 é WhatsApp 1-a-1 e planilha, por decisão de custo. Uma atestação sobre um canal não auditável ou é software que a mesa proibiu antes do Gatilho B, ou é declaração que não se sustenta em contraditório. Foi exatamente por isso que a mesa matou o selo de verificado: "reinventaram o laudo com dez vezes a responsabilidade e um décimo da receita". O Registro emitido a um consumidor final, de graça, sem contrapartida obrigacional, é a pior posição de risco possível — art. 30 do CDC vincula, e não há sequer contrato negociado do outro lado para limitar o que se prometeu.

4. A COTAÇÃO DE PREÇO DO ESCROW NÃO É O GARGALO. O GARGALO É O ACEITE — E O RECORTE DERRUBA A PERNA PRINCIPAL, NÃO A LATERAL

A tese acerta ao separar coordenar de operar, e a lista de texto permitido/proibido é a melhor página do documento. Mas a conclusão operacional está errada em duas casas.

Primeira: a própria tese observa que o rol da conta notarial nomeia imóveis e veículos, e conclui que relógio e joia ficam de fora. O recorte é maior do que ela diz. Na operação canônica do ano 1 — relógio anunciado, carro em contrapartida, volta em dinheiro — o negócio que se liquida com dinheiro é a venda do RELÓGIO. A perna do carro é permuta. Ou seja, o recorte não atinge um caso de borda: atinge a perna monetária da categoria-motor. Escrow não é entregável do ano 1; é item de pesquisa. Não se promete a ninguém, em nenhuma reunião, antes de carta de aceite escrita de um prestador.

Segunda: "duas cotações escritas na semana 1, custo R$ 0" entrega tabela de preço, e preço não é a incógnita. A incógnita é se uma instituição de pagamento aceita onboarding de um intermediário de bens de luxo de alto valor com contraparte PF, sob PLD dela. Estimo que classifiquem como alto risco e respondam com recusa ou com reserva rolante, em 3 a 8 semanas de análise — não em uma semana e não com R$ 0 de esforço. E a semana 1 já está lotada com as duas assinaturas pendentes há duas sessões (capital declarado e cessão de PI), o parecer concorrencial e a contratação do gestor. Cotação de escrow deslocando essas duas assinaturas é troca ruim.

Terceira: a comparação com a Chrono24 (6,5% contra R$ 3.500) é retoricamente boa e comercialmente perigosa. Os 6,5% deles compram garantia de pagamento e 600 mil visitantes/dia. Os nossos R$ 3.500 não compram nem um nem outro — e o nosso rodapé obrigatório diz literalmente que não recebemos, não retemos e não movimentamos valores. Usar o preço do concorrente como argumento de valor quando não vendemos o produto dele é um pitch que perde na pergunta seguinte.

5. O PITCH À LOJA DE CARRO COMPARA A LINHA ERRADA — E AS DUAS RAZÕES DELE BRIGAM ENTRE SI

"R$ 1.800 é 0,6%; no leilão você paga 5%, ou R$ 15 mil. Três a onze vezes mais barato." O custo de aquisição do dealer não é a taxa: é o lance vencedor dele, que por construção é o maior de 8 a 12 lances cegos. E o objetivo declarado do nosso próprio mecanismo é comprimir o deságio de 25–30% para 8–15% em favor do anunciante. Num carro de referência R$ 300 mil, mover o deságio de 25% para 12% muda o preço em R$ 39.000. A taxa inteira é R$ 1.800 — 21,7 vezes menor que a variação que nós mesmos prometemos provocar na direção contrária ao comprador. A linha de taxa é ruído dentro da linha de preço, e o dealer que compra em leilão toda semana diz isso na primeira reunião. Pior: a comparação de taxa só é favorável enquanto o deságio ficar largo, isto é, enquanto o mecanismo estiver falhando no que promete ao vendedor. Não dá para vender os dois lados com a mesma planilha.

A razão que sobrevive é a razão 1 da própria tese, e ela responde a minha objeção: se carro com passagem por leilão carrega 8–15% de desconto na revenda mais R$ 3–15 mil de recondicionamento, o carro sem passado vale 8–15% a mais para o dealer — R$ 24.000 a R$ 45.000 num carro de R$ 300 mil. Isso significa que ele pode pagar acima do equivalente-leilão e ainda ganhar, o que é justamente o que permite o deságio comprimir sem quebrar a economia dele. O argumento é de qualidade de originação, não de preço da taxa. A tese tinha a peça certa na mão e liderou com a errada.

Some-se o empilhamento que o pitch omite: fee R$ 1.800 + laudo R$ 1.500–3.500 + eventual escrow ~R$ 675 + coordenação R$ 300–800 dá R$ 4.275–6.775 numa operação de R$ 300 mil, 1,4% a 2,3% entre as duas pontas, não 0,6%. Quem fecha na manchete de 0,6% e recebe a fatura de 2% não abre o segundo lote.

6. A TRAVA DOS 20% FALHA EM ESTATÍSTICA, EM INCENTIVO, EM ANTITRUSTE E EM CAIXA — NESSA ORDEM

Estatística: o lado que anuncia sob a marca tem 24–30 CNPJs no ano 1. Um trimestre verá algo como 6 a 10 candidaturas. Duas reprovações em oito é 25%; uma em oito é 12,5%. Uma única decisão de porteiro atravessa o limiar e congela a admissão. O intervalo de confiança de 2/8 é largo o bastante para tornar o número indefensável em público. Publicar razão com n≈8 como métrica institucional é publicar ruído com cara de governança — e qualquer dealer reprovado só precisa fazer a divisão em voz alta.

Incentivo: o denominador é candidatura, e nós controlamos o denominador. O jeito mais barato de publicar 31% de reprovação é abrir um formulário e deixar entrar lixo. A trava premia captação de candidato ruim — que é a porta do "OLX de rico" que a mesa vetou.

Antitruste, e este é o ponto grave: a trava é o anúncio público de que a rede recusará entrada por motivo alheio ao mérito do candidato. "Você foi reprovado porque a taxa do trimestre passado ficou baixa" é cota, não critério objetivo sobre o requerente — o oposto literal do inegociável "critérios de admissão objetivos e publicados", e o padrão de barreira de acesso do art. 36, §3º. Estamos prestes a pagar R$ 8–15 mil por parecer concorrencial sobre o mecanismo de roteamento; publicar simultaneamente uma política escrita de recusa por quota é entregar ao mesmo parecerista o problema que ele não foi contratado para resolver. Agrava o comitê de três com "ao menos um que não seja sócio": num mercado de 24–30 CNPJs em duas categorias, qualquer terceiro credível é fornecedor, concorrente ou advogado. Concorrente votando admissão de concorrente é a foto que a mesa mandou não tirar em 13/07.

Caixa: a trava pode obrigar a empresa a parar de admitir — isto é, parar de vender — num trimestre em que o pipeline finalmente ficou bom, enquanto queima R$ 20–50 mil/mês com runway não declarado há três sessões. Ninguém publica freio de crescimento antes de declarar quanto tem de pista.

E ela freia o lado errado. A tensão portal-vs-boutique vive na densidade do lado ABSORVEDOR — 45–75 CNPJs por categoria, gratuitos, abertos por decisão. A trava incide sobre o lado que anuncia, que já está travado em 24–30 por outro número. Não resolve nada operacional; é dispositivo de comunicação vestido de mecanismo.

7. DOIS ITENS MENORES, MAS QUE REABREM DECISÃO FECHADA

O embargo de 90 dias à vitrine para bem com `origem = lote_webluxury` impõe carrego ao vencedor: R$ 300 mil a 1,5% a.m. por três meses são R$ 13.500, com a taxa de carrego da própria fórmula do VLG. Ele vai listar o carro na Webmotors, e nós perdemos o anúncio vivo — que é a meta operacional que substituiu "número de assinantes" (400–600 até o mês 6). A regra briga com o indicador-mãe do semestre para proteger um dono que, no modelo aprovado, não tem conta na plataforma e não navega numa vitrine de 3–15 mil sessões/mês.

O seguro de RC do credenciado aparece na tabela como "Parcial" no ano 1. A mesa o declarou inegociável em 13/07 e reafirmou na rodada 3. Ou o credenciado tem apólice, e a prova dela é condição do credenciamento a custo R$ 0 para a casa, ou ele não emite laudo. "Parcial" é reabertura silenciosa de decisão fechada.

8. O QUE EU NÃO ACEITO NA ABERTURA DA TESE

A tese abre demovendo a reputação nominal do Cleber a "estoque que se gasta". A evidência de campo da própria rodada 3 diz o contrário: R$ 7/dia de anúncio, R$ 49 numa semana, dois inbounds qualificados. É da ordem de R$ 25 por conversa iniciada — e mesmo descartando o de fora do perfil e ficando com um, R$ 50 — contra R$ 150–600 por ficha concluída por telefone e R$ 1.100 de CAC por assinante nas contas desta mesa. n=2 e uma semana, então trato como sinal, não como medição. Ainda assim: é o insumo mais barato da empresa por uma ordem de grandeza, rodando dentro de um teto de R$ 15–20 mil/mês do qual estamos usando R$ 210. Reputação é o canal de aquisição; protocolo é o mecanismo de retenção. São linhas diferentes do resultado. Ordená-las em disputa por primeiro lugar é erro de categoria, e recomendar rebaixamento do canal mais barato é má alocação.

9. O QUE SOBREVIVE

A inversão. Que a confiança comprada não é sobre a peça do dono — é sobre a outra ponta, o bem que ele vai receber e não sabe avaliar. Isso é correto, é o melhor parágrafo do texto, e é o único ponto que muda o pitch de verdade. Só que ele não refuta laudo: ELE É O LAUDO, que a mesa já aprovou, já orçou em R$ 1.500–3.500 e já mandou cobrar. A tese começa dizendo "não é laudo nem selo" e termina, no item 2 da própria tabela, vendendo o laudo. Corrijo o enunciado, mantenho o conteúdo.

Sobrevivem também, sem retoque: a proibição de publicar histórico individual de negócios concluídos (a tese está certa e é mais dura que o pedido do grupo — bem, valor, praça e data reconstroem patrimônio de UHNW, e no Brasil isso é risco físico); a lista de texto permitido e texto proibido sobre escrow, que vale como regra de uma página para quem escreve copy; a proibição eterna de garantia de recompra ou piso da casa; o fee de adjudicação uma vez por lote com segunda passagem gratuita em 180 dias, que custa da ordem de R$ 1.000/mês em receita renunciada e compra um incentivo correto; e a discrição operacional, que já era decisão da mesa.

**Ajuste exigido:** AJUSTES QUE EU LEVO A VOTO (custo declarado, dono nomeado)

1. O Registro de Circulação Controlada deixa de ser folha emitida ao dono e vira CLÁUSULA no contrato do anunciante: "o bem de contrapartida não será apresentado a mais de N destinatários por onda, N declarado por lote". O anunciante é livre para mostrar a cláusula ao cliente dele. A casa promete ao membro; o membro tranquiliza o cliente. Isso preserva "um cliente, uma voz", mantém a responsabilidade dentro de contrato B2B negociado em vez de documento gratuito a consumidor, e aí sim custa R$ 0 de verdade. Dono: jurídico, na redação do contrato de adesão já em curso. Custo incremental: zero.

2. O número na cláusula é 8–12 na onda 1, até 24 com ondas 2 e 3, e isso vai escrito. Não se promete "8 a 12, jamais mais" em nenhum material. As ondas ficam vivas — a diferença entre 32% e 88% de lotes com 3+ faixas num cenário de ρ = 0,20 é o piloto inteiro.

3. Regra nova, R$ 0: convite de onda 2 ou 3 não conta no contador de três não-respostas em 90 dias. Só convite dentro do apetite declarado penaliza silêncio. Sem isso, expulsamos da lista gratuita quem agiu certo.

4. Quem adjudica continua sendo o anunciante, com `motivo_da_escolha` obrigatório. Corrigir o script do Cleber: onde está "o dono escolhe", passa a "quem vendeu escolhe, e ele te diz por quê". O dono nunca entra no processo da casa.

5. Trava dos 20%: rejeitada como gatilho de admissão, aprovada como divulgação. Publica-se a taxa de reprovação trimestral com o denominador exposto (ex.: "8 candidaturas, 2 reprovações") e sem transformá-la em regra de congelamento. Enquanto n trimestral for menor que 30, publica-se acumulado de 12 meses, não trimestre isolado. Critério de admissão permanece objetivo, sobre o requerente, publicado — nunca cota.

6. Comitê de admissão: sem concorrente na cadeira. Decisão da casa contra critério publicado; comitê apenas como instância de recurso, composto por advogado e/ou auditor externo, nunca por dealer das duas categorias. Custo estimado: R$ 0–1.500 por recurso efetivamente aberto, contra R$ 2–5 mil/mês de retainer que a versão da tese exigia.

7. Escrow sai do ano 1 como entregável e entra como pesquisa, semanas 6–10, dono nomeado. Objeto correto da pesquisa não é preço, é ACEITE: submeter onboarding real a duas instituições de pagamento e consultar dois cartórios sobre a perna monetária da venda de RELÓGIO — que é a perna que o recorte de imóveis/veículos provavelmente exclui, e é a categoria-motor. Prazo realista de resposta: 3 a 8 semanas. Nada é prometido a membro ou cliente antes de carta de aceite escrita. Sai da tabela a coluna "Sim, opcional" no ano 1.

8. Coordenação documental do escrow: ou se cobra R$ 1.200–2.500 (4–8 h de trabalho de compliance da pessoa mais escassa da empresa), ou não é linha de receita e vai embutida no fee. R$ 300–800 é preço abaixo do custo e cria expectativa de serviço que não temos gente para prestar.

9. Pitch à loja de carro premium, reordenado: abre com o relógio parado no cofre dela (fluxo reverso, R$ 0, é o que faz a reunião virar), segue com originação sem passado quantificada — "este carro vale 8 a 15% mais na sua revenda do que um de leilão, o que te permite pagar mais e ainda ganhar" — e a taxa entra por último, como informação, com o custo TOTAL declarado (fee + laudo + coordenação = 1,4% a 2,3% da operação entre as duas pontas), nunca como manchete. Sai a frase "três a onze vezes mais barato". Sai também a comparação com os 6,5% da Chrono24 de qualquer material externo. Sai a âncora dos 18%/22% de permuta imobiliária: fonte secundária não verificada, e sobre categoria que a mesa tirou do ano 1.

10. Embargo de 90 dias na vitrine: substituído. O vencedor pode relistar imediatamente; o que fica proibido é a casa EXIBIR qualquer campo de origem, e o campo `origem = lote_webluxury` fica interno, para auditoria e para a isenção de 180 dias. Se quisermos proteção real ao dono original, oferecemos a ele direito de preferência por 30 dias, que custa R$ 0 e não impõe R$ 13.500 de carrego ao membro nem nos custa anúncio vivo contra a meta de 400–600 do mês 6.

11. Seguro de RC do credenciado volta a inegociável: apólice vigente do próprio credenciado como condição documental do credenciamento, verificada na admissão. Custo para a casa: R$ 0.

12. Antes de qualquer um dos doze itens acima, as duas assinaturas da semana 1 que estão pendentes há três sessões: capital declarado por escrito (quanto, de quem, por quantos meses) e cessão de PI do código. Nenhuma regra publicada que possa travar receita — e a trava dos 20% era exatamente isso — se decide antes de saber o tamanho da pista.


### Refutação 9 — TESE REFUTADA

# REFUTAÇÃO — "A MALHA DE GESTORES REGIONAIS POR CAPITAL E POR CATEGORIA"

## Veredito

Aceito o diagnóstico e derrubo a prescrição. A parte de trás da tese — arbitragem é tempo de giro e não prêmio de preço; CLT por praça é insolvente; franquia é impossível sob a Lei 13.966/2019 sem dois exercícios e sem COF; a lista precede a pessoa — está correta e é o melhor trabalho da rodada. **A parte da frente — "a malha só existe como membro-âncora local remunerado por corretagem por operação" — não sobrevive ao comportamento real deste mercado.** Ela desenha um cargo que ninguém aceitável ocupa, paga uma quantia que ninguém desse porte olha, e o protege com uma trava que morre no primeiro conflito de dinheiro. O analista chegou perto do fim certo e virou à esquerda na última esquina: **a função que a praça exige é técnica, não comercial.**

## 1. Ele fez a conta certa no bem errado

Os R$ 22,5 mil de carrego economizado no relógio de R$ 500 mil estão aritmeticamente certos e comercialmente mortos — porque **esse ganho já está capturado**. O próprio analista escreve que o relógio "já circula nacionalmente por WhatsApp há uma década". Se já circula, os 90 dias de carrego não existem para serem economizados: a peça vai a duzentos dealers em 48 horas por custo zero. Vender arbitragem geográfica a um relojoeiro é vender a ele algo que ele tem de graça, e ele responde na primeira reunião: *"eu mando no grupo e vendo em uma semana"*. A conversa comercial que o analista quer sustentar com esse número é a única que este produto não pode ter.

O valor incremental da WebLuxury para o relojoeiro nunca foi geográfico. É **cross-categoria**: o carro que entra como pagamento e que ele não sabe absorver. E cross-categoria não pede praça — pede lista. O pitch correto é uma frase e não menciona mapa: *"eu não te trago o comprador que você já tem; eu absorvo o carro que trava a sua venda."*

Na outra ponta ele mesmo mostrou que o bem que justificaria endereço — carro, barco — devolve entre R$ 0 e R$ 9 mil líquidos. Ou seja: **onde a praça faria sentido, a conta não fecha; onde a conta fecha, a praça é redundante.** A tese se autodemole e o autor não puxou o gatilho.

## 2. O dealer faria isso? Não — e a vaga não tem ocupante possível

R$ 810 por lote. Pelos números desta própria mesa, comissão de varejo em bem de luxo roda em 6% e o spread de atacado em 2–6%. Um dealer consolidado que gira R$ 400 mil/mês de estoque tira R$ 24 mil de margem. **R$ 810 é 3,4% do mês dele** por: visitar o bem, fotografar, convencer o dono, coletar documento, responder auditoria por amostragem de 1 em 5, e aceitar desligamento imediato por uma única omissão de checklist. Nenhum advogado de loja com vinte anos de praça deixa o cliente assinar isso.

E o que ele carrega não é o R$ 810 de upside — é risco de nome. A responsabilidade PLD é indelegável da NewCo, correto; mas **a responsabilidade social é local e é dele**. Se entra um relógio Frankenstein ou um carro com origem contestada pela porta de Belém, quem responde ao COAF é a casa e quem responde à praça é o rosto que apresentou o vendedor. Ele arrisca a reputação que sustenta o negócio principal dele para ganhar 3% de um mês.

Daí o problema estrutural, que é seleção adversa **sobre o cargo**: quem tem praça boa o bastante para ser âncora não aceita; quem aceita não tem praça. Sobra o ex-vendedor de concessionária, o intermediário sem CNPJ maduro — exatamente o perfil que a régua de admissão desta mesa reprova desde 13/07. **Vaga sem ocupante viável não é uma vaga adiada 18 meses; é uma vaga que não existe.**

## 3. A trava que morre no primeiro conflito de dinheiro

O analista escreve, em dois parágrafos consecutivos, que o incentivo real do âncora "é o próprio estoque" e que "quem origina o lote não pode ser adjudicatário dele". As duas frases não coexistem. Ele descreve o motivo pelo qual a pessoa aceita o trabalho e em seguida proíbe exatamente esse motivo.

Testem contra dinheiro real. Chega em Belém um Patek de R$ 1,5 milhão com deságio típico de 25% — R$ 375 mil de valor embutido. A regra manda o âncora entregar isso a um concorrente de São Paulo e receber R$ 810. Isso não é uma regra: é um convite documentado ao contorno. E o contorno é trivial neste mercado, onde comprar por CNPJ de terceiro para esconder preço de aquisição é prática corrente: ele adjudica pelo CNPJ do cunhado, pelo segundo CNPJ dele, ou por um colega com split por fora. **Vocês não têm como auditar isso** — a auditoria por amostragem de R$ 1,5–4 mil confere checklist de documento, não titularidade econômica.

O resultado previsível é pior do que o vazamento: ele origina só o que não quer. O lote nasce filtrado pelo lado errado, e a casa passa a receber, de cada praça, exatamente o encalhe — a mesma seleção adversa que esta mesa já identificou no Pedido de Procura, agora movida para a origem, onde nenhum mecanismo de leilão consegue corrigi-la.

## 4. Três contradições internas que quebram o instrumento jurídico dele

**(a) Corretagem × poder disciplinar.** O art. 722 do Código Civil exige ausência de mandato, de prestação de serviços e de qualquer relação de dependência. A Seção 5 do próprio texto entrega manual de conduta, checklist obrigatório, quatro gatilhos de escalada compulsória, auditoria periódica e **desligamento imediato por uma única omissão**. Isso é poder disciplinar, e juiz do trabalho lê fato, não rótulo (primazia da realidade; CLT art. 9º). A blindagem construída na Seção 2 é destruída pela Seção 5 do mesmo documento.

**(b) Corretagem × operador de dados.** Não dá para sustentar simultaneamente "sem subordinação, sem prestação de serviços, sem dependência" (para escapar da Lei 4.886/65 e da CLT) e "trata dados exclusivamente segundo instrução escrita da controladora" (LGPD arts. 5º, VIII e 39, para reter a base). Operador é quem trata **em nome do controlador, seguindo instruções**. Corretor autônomo que decide quem procurar, com agenda própria, decide finalidade — é controlador independente. **Escolham: ou ele é autônomo e a base é dele, ou a base é da casa e ele é subordinado.** A Seção 4 inteira, que é a mais bem escrita do texto, está apoiada nesse pé que não existe.

**(c) O resíduo que ele quer reter não é o ativo.** A "lista de apetite" de 60 CNPJs por categoria não é ativo proprietário: o universo COAF nacional inteiro tem 12.761 CNPJs e o recorte por UF e categoria sai de busca pública em uma tarde. O ativo é a **taxa de resposta**, e taxa de resposta é relação pessoal. A retenção desenhada protege a planilha e entrega o que importa.

Some-se que o fee residual de 10–15% condicionado ao cumprimento da não-circunvenção é inverificável na prática: vocês nunca observam o negócio que não aconteceu na plataforma. Ficam com duas opções ruins — pagar às cegas, ou reter por suspeita e criar um litígio contra alguém que fala com a praça inteira. Numa marca de 27 anos, **ele danifica vocês mais barato do que vocês o danificam.**

## 5. O portão de cinco condições não abre — e portão que não abre não é portão, é veto disfarçado

Aritmética contra o plano desta mesa:

- **Condição 2 (12 lotes adjudicados em SP):** a meta do próprio trimestre-piloto é 12–20 lotes **abertos**, 4–6 com proposta firme e **2–3 liquidados**. Doze adjudicados é 2 a 3 vezes o teto do piloto.
- **Condição 4 (R$ 60 mil de fee líquido no trimestre):** a R$ 1.800 de fee na faixa de R$ 100–400 mil, mesmo retendo 100% em SP, 12 lotes dão R$ 21,6 mil. Para R$ 60 mil são ~33 lotes, ou 12 lotes todos acima de R$ 1 milhão. **As condições 2 e 4 se contradizem por um fator de 2 a 3.**
- **Condição 5 (≥20 absorvedores naquela UF):** a lista nacional aprovada é de 45–75 CNPJs por categoria. Exigir 20 numa UF fora de SP é exigir 27% a 44% da lista nacional inteira concentrada fora da base. Impossível por construção enquanto SP for a base.
- **Condição 2, segunda metade (3 absorvedores de outra UF):** a lista é nacional por desenho, recrutada por telefone em todas as UFs. A maioria dos vencedores será de outra UF por taxa-base. O teste não discrimina nada.

E o autogol: ele escreve *"se funciona sem [praça], a praça é opcional; se não funciona sem, ela não vai funcionar com"*. Por essa lógica, **nenhum resultado do teste autoriza abrir praça.** Se a conclusão honesta é "não no ano 1, e provavelmente nunca nesse formato", digam isso em uma linha em vez de cinco condições que ninguém vai conseguir medir e que serão renegociadas no primeiro dia em que o Cleber quiser abrir Balneário — e regra que se renegocia sob pressão de oportunidade não se ajusta, se abandona.

Sobre a ordem das praças: SC vem de **um** inbound de R$ 7/dia. O Ceará produziu outro inbound na mesma semana e foi descartado sem justificativa. Isso não é sinal de campo batendo opinião de mapa — é n=1 escolhido por conveniência narrativa. E a construtora de Floripa que aceita carro é **absorvedora**, recrutada por telefone de São Paulo. O sinal argumenta a favor de uma ligação, não de uma filial.

## 6. O cliente de alto patrimônio aceitaria?

O dono do bem principal nunca encontra o gestor — ele é cliente do anunciante contratado, e "um cliente, uma voz" impede o contrário. Quem o gestor tocaria é o dono do **bem de contrapartida**: o sujeito que está oferecendo o carro ou o barco para levar o relógio.

Esse homem aceita que um **vistoriador com credencial e laudo** olhe o bem dele — isso já acontece em toda venda de seminovo de alto valor e não constrange ninguém. Ele **não** aceita que um dealer concorrente da praça dele vá até a garagem: isso informa ao mercado local que ele está liquidando patrimônio, e discrição é metade do produto que ele está comprando. O texto acerta ao proibir circular identificador registral entre dez dealers e depois coloca um dealer local dentro da garagem — mesma exposição, com endereço.

## 7. O que sobrevive

Sobrevivem intactos: a unidade correta da arbitragem (tempo, não preço); a insolvência do desenho assalariado; a **impossibilidade documental da franquia** sob a Lei 13.966/2019 — este é o achado que vale a rodada, porque mata a ideia antes de ela custar dinheiro e não depende de nenhuma premissa comportamental; o risco de representação comercial (art. 27, "j", 31, 34 e 35); a admissão do bem central e indelegável; e a regra "a lista precede a pessoa", que deve ir a ata com essas palavras.

O que cai é o cargo, o preço do cargo, a trava que o protege e o portão que o adia.


**Ajuste exigido:** # O AJUSTE — MALHA DE VISTORIA, NÃO MALHA DE CORRETAGEM

**1. A função local é técnica.** O motor aprovado exige, na etapa 2, vídeo-vistoria guiada ou visita antes do lance firme. Quando o bem está em Belém e os três finalistas estão em SP, alguém precisa olhar o bem. Essa é a única função que exige presença — e ela vale mais dinheiro do que toda a estrutura de originação que o analista desenhou. Bem não vistoriado carrega prêmio de incerteza estimado em 5 a 12 pontos percentuais de deságio adicional; num carro de R$ 300 mil são R$ 15–36 mil, de 8 a 20 vezes o fee de adjudicação. **O analista precificou a função errada.**

**2. O que se credencia por praça é um vistoriador, não um corretor.** Um por categoria-âncora, escolhido entre quem já faz isso na cidade — vistoriador cautelar, despachante, relojoeiro com bancada. Remuneração por vistoria (estimativa: R$ 400–900 em carro, R$ 300–800 em autenticação de relógio, laudo completo mantendo os R$ 1.500–3.500 já aprovados), zero folha, zero fixo, zero split de fee. Custo de entrada: o credenciamento de R$ 1.200–2.500 já aprovado nesta mesa. **Ele nunca pode ser adjudicatário — e essa proibição, ao contrário da do analista, já é regra desde 13/07 ("avaliador não é parte no deal"), é auditável e não contraria o incentivo dele, porque ele não quer o bem: ele quer a próxima vistoria.** É a única versão da regra que sobrevive ao primeiro conflito de dinheiro, porque não existe conflito de dinheiro.

**3. O originador do lote é o anunciante, e ele custa R$ 0.** O lote de contrapartida nasce dentro da negociação de um membro já contratado, com SLA de 72h, mensalidade zero por 90 dias e contrato pesado assinado. Ele origina porque a venda dele depende disso. Não há "captação distribuída" a resolver: o analista inventou um terceiro para um trabalho que o interessado já faz de graça e faz melhor.

**4. Se a mesa insistir em um âncora comercial, mudem a moeda e invertam a trava.** Não paguem split de fee (R$ 810 não move ninguém desse porte) nem prioridade de fila (vetada por antitruste). Paguem em duas coisas que ele quer e que a lei permite: **isenção do fee de adjudicação nas aquisições próprias dele, com teto trimestral** — é desconto comercial, não turno de vitória — e **slots de vitrine** (R$ 1.500/15 anúncios, produto já aprovado). E parem de proibir que ele licite no lote que originou: proibição inauditável é norma morta. Substituam por transparência cara: ele licita cego como todo mundo, a reserva continua lacrada pelo dono, e a ficha de adjudicação mostra ao anunciante a marca `proponente originou este lote`, com motivo obrigatório. **Deixem que ele ganhe quando pagar mais; nunca deixem que ele ganhe em silêncio.**

**5. Fluxo de mão única, para fechar a contradição de LGPD.** O credenciado **insere** no formulário e **nunca recebe** a lista, nem parcial, nem por convite roteado. Sem acesso, ele não trata dado em nome de ninguém, a controladoria é da NewCo sem ficção, e a carteira não sai quando ele sair. O preço dessa escolha é honesto e vai a ata: quem não vê a lista não gerencia nada — logo o cargo perde o nome. **Não é "gestor regional". É credenciado de vistoria.** O título importa porque é ele que atrai o candidato errado.

**6. Troquem o portão de cinco condições por um gatilho que dispara e é barato.** Sai o pacote impossível; entra uma linha, medida num campo que a planilha de lotes já tem: **credencia-se vistoriador numa UF quando 3 lotes num trimestre forem desertos ou fecharem com deságio acima de 30% e o motivo registrado for ausência de vistoria local.** O que se abre não é praça: é um credenciamento de R$ 1.200–2.500, sem folha, sem contrato de exclusividade, reversível numa semana. Custo de errar: o preço de um laudo. Custo de errar no desenho do analista: um passivo trabalhista, uma base de dados que virou de outro e um nome de 27 anos emprestado a um desconhecido.

**7. Mantidos em ata, do texto refutado:** franquia ou licença de praça com taxa fica **proibida enquanto a NewCo não tiver dois exercícios encerrados, COF entregue com 10 dias de antecedência e registro INPI verificado** (Lei 13.966/2019) — e isso vale inclusive para qualquer arranjo que cobre do parceiro local a qualquer título, porque franquia se caracteriza por fato. Proibida também qualquer estrutura com zona definida, meta ou aviso prévio, que atrai a Lei 4.886/65. E a frase que vira regra: **a lista precede a pessoa; quem contrata gente para depois construir lista contratou custo fixo para descobrir se existe mercado.**



### Refutação 10 — TESE REFUTADA

REFUTADA. A tese está certa no diagnóstico e errada em tudo que decorre dele: o próprio analista prova que a praça é dispensável e depois desenha a praça. Refuto por nove contas.

**1. O erro de caixa que derruba a monetização inteira: quem captura a arbitragem não paga nada.** Ele escreve "nosso fee de R$ 3.500 captura 17% do valor criado". Não captura. O ganho de carrego — R$ 20 mil no relógio, R$ 0–9 mil no carro — acrua ao ANUNCIANTE, que teve o bem parado e passou a girar. E o desenho aprovado em 25/07 é explícito: **fee fixo de adjudicação pago por quem LEVA o bem**, e **zero cobrança do anunciante para abrir lote no ano 1**. Ou seja: a parte que embolsa a arbitragem paga R$ 0, e a parte que paga o fee (o absorvedor) não tem ganho de arbitragem nenhum — ele deu lance cego num preço que ele mesmo fixou. Consequência aritmética: **a arbitragem geográfica não gera um único real incremental de receita no ano 1.** Ela gera lotes. E lotes são exatamente o que a lista telefônica de SP já produz de graça. Ele construiu uma justificativa de estrutura em cima de um valor que a casa não fatura.

**2. As comportas dele não fecham entre si — por um fator de 4 a 8, e por 11 a 17 meses.** A comporta 4 exige "fee líquido acumulado ≥ R$ 60 mil no trimestre anterior". Mix aprovado do bem ofertado: carro 55%, faixa dominante R$ 100–400 mil, fee de R$ 1.800. Com margem de laudo, receita líquida por lote adjudicado ≈ R$ 2.300–3.000. R$ 60 mil ÷ isso = **20 a 26 lotes adjudicados em um trimestre** (33 se contar só fee). A meta aprovada do trimestre-piloto é **4 a 6 lotes com proposta firme e 2 a 3 liquidados**. São 4 a 8 vezes. Mesmo com crescimento composto de 30% ao trimestre — generoso para um negócio sem audiência — 4–6 vira 20–26 em cinco a sete trimestres: **mês 18 a 24, não "mês 7"**. O piso de calendário dele está errado por mais de um ano segundo as regras que ele mesmo escreveu. Ou ele afrouxa a comporta 4, e aí a praça deixa de ser paga pela receita da praça anterior e passa a ser paga por capital — violando o princípio que ele declarou inegociável duas linhas antes.

E a comporta-título — "12 lotes adjudicados com 3 absorvedores de outra UF" — é ruído estatístico. Três eventos em doze: o intervalo de confiança de uma proporção de 25% com n=12 vai de ~5% a ~57%. **Não se abre uma frente de operação num estado com base em três observações.**

**3. A praça tem contribuição centrada em zero e cauda ilimitada.** Pelos números dele: custo R$ 8–20 mil no ano 1; receita líquida R$ 1.500–2.500 por lote; 4 a 13 lotes. Extremo bom: 13 × 2.500 − 8.000 = **+R$ 24.500**. Extremo ruim: 4 × 1.500 − 20.000 = **−R$ 14.000**. Valor esperado próximo de zero. Ele apresenta "ponto de equilíbrio atingível" como se equilíbrio fosse tese; equilíbrio é a definição de não ganhar nada. E a assimetria está invertida: ganho travado em R$ 24 mil contra uma cauda de multa PLD de até R$ 20 milhões (art. 12, Lei 9.613/98), solidariedade de cadeia do CDC e — se o instrumento escorregar — indenização de 1/12 ou vínculo. **Não se adiciona contraparte jurídica e superfície de compliance por um esperado de R$ 5 a 10 mil ao ano.**

Some-se a atribuição inflada: ele credita à praça 100% da economia do lote, incluindo margem de laudo que ocorreria de qualquer jeito e fee que a lista de SP capturaria pelo telefone. **A incrementalidade nunca foi estimada.** Se o contrafactual de captação por SP for de meros 50%, a receita incremental cai pela metade e o ponto de equilíbrio dobra para 8–26 lotes/ano — faixa que ele mesmo declara inalcançável no ano 1 e no 2.

**4. O âncora não atende o telefone.** R$ 810 por lote (45% de R$ 1.800). Um dealer de carro premium na praça tira, numa venda de R$ 300 mil a 5–12% de margem, R$ 15 a 36 mil. **O nosso fee é 2% a 5% de uma venda dele.** Custo de oportunidade da hora de quem "já vive de outra coisa" é, por definição, mais alto — o desenho escolhe exatamente a pessoa com menos razão para responder. E ele desliga o único incentivo que restava: escreve "o incentivo real é o próprio estoque" e, no mesmo parágrafo, crava "quem origina o lote não pode ser adjudicatário dele". **Desligou o motor e perguntou por que o carro não anda.** O modo de falha resultante é o "silêncio" já catalogado em 3.7, e o antídoto de lá (tirar do roteamento por 60 dias) não morde alguém que nunca foi pago o bastante para responder.

**5. A Seção 2 e a Seção 5 do parecer dele não podem coexistir.** O CC art. 722 exige ausência de mandato, de prestação de serviço e de **qualquer relação de dependência**. A Seção 5 impõe ao mesmo sujeito: checklist bloqueante por categoria, proibição de tocar dinheiro, quatro gatilhos obrigatórios de escalada, auditoria por amostragem 1 em 5, instrução por escrito como operador LGPD e **desligamento imediato por uma única omissão**. Isso é procedimento imposto, fiscalizado e sancionado — o conjunto probatório clássico de subordinação. Pior: ele cita o art. 39 da LGPD, que manda o operador **seguir as instruções do controlador**, como prova de que não há relação de instrução. **Ou o protocolo vale e o sujeito é preposto (representação comercial com 1/12 irrenunciável e exclusividade de zona presumida, ou vínculo), ou é corretagem de verdade e o núcleo não pode impor protocolo — e aí cai a Seção 5, que é a única coisa que segurava o risco de PLD.** Não existe o meio-termo que a tese vende.

**6. O âncora reintroduz o bypass que o lance cego foi feito para eliminar.** O item 3.3 aprovado manda circular o bem e nunca a pessoa, guardar identificadores na casa e revelar identidade só ao vencedor — desenho feito para que ninguém veja os dois lados. O âncora local é, por construção, o único nó que vê dono, absorvedores e preço sem passar pela casa. Cláusula penal de 5–10% do VLG com piso de R$ 15 mil só é cobrável se houver detecção, e a casa não detecta fechamento por fora numa praça onde não tem ninguém — exceto pelo próprio âncora. **O desenho põe o guarda e o ladrão na mesma cadeira.**

**7. Colide com duas decisões vigentes, sem citá-las e sem pedir reabertura.** (a) Veredito do item 7, 24/07: **"Nenhuma despesa de expansão regional antes do Gatilho A"** (≥10 deals cofechados, ≥2 permutas bilaterais, 0 disputas sem solução, ≥15 lojas ativas). R$ 8–20 mil por praça de ativação, auditoria e visita anual é despesa de expansão regional. A tese substitui o Gatilho A por cinco comportas próprias, sem revogá-lo. (b) Parecer de 24/07, §3: **parecer tributário obrigatório (R$ 15–30 mil) antes de qualquer decisão que toque permuta**, porque a permuta é fato gerador de ICMS nas duas pontas e o regime de usados muda materialmente a conta. Uma malha interestadual é permuta cross-UF por definição. Ele orça cegonha, vistoria e transferência e **não orça DIFAL nem o parecer**. Os R$ 9–15 mil de fricção dele são piso, não faixa.

**8. A comporta 5 se auto-refuta, e a ordem das praças é n=1.** "≥ 20 CNPJs absorvedores já na lista naquela UF, captados por telefone de São Paulo, antes de qualquer pessoa credenciada." Se 20 CNPJs de uma UF são captáveis por telefone de SP, a distribuição daquela UF **já está resolvida sem praça** — e a pessoa credenciada entra depois do trabalho feito para levar 45% do fee. Ele escreveu "deslocalizar inventário é função de lista nacional, não de endereço" e "se funciona sem, a praça é opcional". Duas frases dele decretam a morte do item; a terceira o ressuscita sem explicar por quê. Quanto à ordem SP→SC→RJ→PR→MG→GO→DF: a amostra inteira é **dois inbounds** de um anúncio de R$ 7/dia — 1,4% do teto de mídia aprovado — e ele descarta metade da própria amostra (o contato do Ceará) por regra de mapa, exatamente o que acusa o Cleber de fazer.

**9. Caixa e gente: não cabe, e não há quem execute.** Quarta sessão com o capital não declarado. O trimestre inteiro está orçado em R$ 60–140 mil; o gestor de rede (R$ 8–15 mil/mês × 4 meses) — o único cargo que esta mesa declarou load-bearing — segue sem financiamento; o PLD de R$ 10–30 mil/mês idem. A Seção 5 atribui admissão indelegável, escalada em 48h e somatório de fracionamento por praça a um **"núcleo de compliance em SP" que não existe, não tem cargo, não tem orçamento e não tem nome**. Os executantes reais são Cleber (já acumulando porteiro, rosto e algoritmo de matching — três funções integrais numa pessoa, registrado em 24/07), Nicolas (que roda a Expansion) e dois participantes sem papel declarado. **Zero pessoas disponíveis para operar uma malha.** E a variante CLT que ele corretamente reprova ilustra a escala do descolamento: R$ 73–147 mil/mês por praça de cinco categorias contra os R$ 40 mil que esta mesa já declarou ser o **teto matemático** de MRR do gasto de mídia aprovado — uma praça custa 1,8 a 3,7 vezes o teto do plano inteiro.

**O que sobrevive da tese, e é pouco:** a morte da franquia por impossibilidade documental (Lei 13.966/2019 — COF 10 dias antes, dois exercícios, relação de franqueados, INPI pendente) e a insolvência do desenho assalariado. Ambas corretas, ambas em ata, e ambas apontam para a mesma conclusão que ele não tirou: **não fazer nada agora.**

**Ajuste exigido:** **AJUSTE — o que vai à ata no lugar da malha.**

**1. Zero praça, zero credenciado, zero contrato de corretagem regional no ano 1.** O item sai do roadmap, não entra em orçamento e não consome hora de sócio. Confirma-se a proibição vigente: nenhuma despesa de expansão regional antes do Gatilho A.

**2. A correção de unidade é aprovada — como argumento de venda, não como justificativa de estrutura.** "Arbitragem é tempo de giro, não prêmio de preço" vai para o script do telefone de recrutamento do lado absorvedor e para o pitch ao anunciante: *"seu relógio parado quatro meses vai à mesa nacional em 72 horas."* Custo: R$ 0. É a melhor contribuição da tese e não precisa de nenhuma estrutura para ser executada.

**3. Duas colunas na planilha, desde o lote nº 1, custo R$ 0:** `praça_de_origem` e `praça_do_absorvedor`. Mais a taxonomia fechada do campo de deserto, com a opção **"sem fit local"** entre os motivos obrigatórios. É este par de colunas — e não mais uma rodada de opinião — que decide o item. Sem elas, a rodada 8 discute isso de novo com mapa.

**4. Métrica que substitui a tese, medida ao dia 90 e ao dia 180: % de lotes adjudicados com absorvedor de UF diferente da do bem.** Três leituras, decididas por dado:
- **≥ 40%** — a arbitragem funciona pelo telefone de SP. A praça está provada **desnecessária** e o item morre por sucesso.
- **10% a 40%** — mantém-se telefone, amplia-se a lista de absorção nas UFs de maior deserto por "sem fit local", nada de pessoa.
- **< 10%** — a arbitragem não existe no fluxo real. O item morre por fracasso.
Em nenhuma das três leituras se abre praça. A pergunta só volta à mesa com **Gatilho A batido + ≥ 30 lotes adjudicados acumulados + parecer tributário de permuta cross-UF (R$ 15–30 mil) contratado e lido**.

**5. Se algum dia houver um âncora, ele não é gestor.** Sem território, sem exclusividade, sem uso da marca, sem credenciamento, sem contrato por praça, sem visita anual, sem auditoria dedicada, sem residual pós-saída. É **indicação avulsa**: fee fixo de indicação de R$ 500–1.000 por lote adjudicado que ele indicou — **nunca 45% do fee**, porque a casa carrega lista, protocolo, laudo e o passivo de PLD inteiro e o indicador não carrega risco nenhum. No instante em que a casa impuser a ele checklist auditado e desligamento por omissão, deixa de ser corretagem e vira preposto: escolha um, o meio-termo não existe.

**6. Duas travas que ficam de pé porque são gratuitas:** (i) **quem indica um lote não pode adjudicá-lo** — vai ao formulário e ao termo, uma linha; (ii) **toda ficha e todo Termo de Absorvedor são assinados com a NewCo**, nunca com pessoa nominada, e a NewCo é a controladora LGPD. Esta segunda vale independentemente do item e deve entrar já nos termos das listas que estão sendo construídas nas semanas 2–7.

**7. Não se contrata:** não-concorrência remunerada (R$ 21,6–36 mil de pura despesa, correto o analista); fee residual pós-saída (10–15% sobre 1 a 3 lotes de cauda = R$ 180–810 no total — não é algema de ouro, é gorjeta, e custa cláusula, rotina de pagamento e superfície de disputa); qualquer franquia ou licença de praça (Lei 13.966/2019 mata antes do preço, e COF ausente dá direito de anular o contrato e reaver tudo corrigido).

**8. Registro obrigatório em ata:** o capital segue não declarado pela **quarta** sessão consecutiva, e o gestor de rede (R$ 8–15 mil/mês, 4 meses) e o PLD (R$ 10–30 mil/mês) seguem sem fonte. Enquanto isso for verdade, qualquer discussão de malha regional é debate sobre como gastar dinheiro que ninguém disse existir — e o custo real dela não é o R$ 8–20 mil por praça, é a hora de sócio que ela desvia da única tarefa do trimestre: **as duas listas de absorção por telefone.**
