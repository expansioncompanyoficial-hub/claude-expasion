# 34 — MANUAL: EXPORTAR, DISPARAR, ANUNCIAR

**O passo a passo real**, da loja que só tem WhatsApp até a campanha rodando e o anúncio
no ar. Pesquisa de 16 agentes com verificação adversarial, 19/08/2026.

| | |
|---|---|
| **Versão** | 1.0 |
| **Data** | 2026-08-19 |
| **Origem** | Nicolas: *"destrinche na prática como seria exportar os dados da base deles e acionarmos esses disparos em WhatsApp e a campanha de tráfego"* |
| **Versão visual** | https://claude.ai/code/artifact/055812d8-24cc-4fba-84aa-8f3748d36909 |
| **Método** | 5 frentes paralelas → verificação adversarial → síntese |
| **Par de produto** | `33` (o EX1 redesenhado) e `35` (a plataforma) |

---

## 0 — AVISO DE MÉTODO: leia antes de usar qualquer número daqui

A pesquisa rodou num ambiente com **bloqueio de saída de rede**. `developers.facebook.com`,
`business.whatsapp.com`, `gov.br`, `planalto.gov.br`, `iemi.com.br` e dezenas de outros
domínios devolveram erro. **Nenhum rate card oficial da Meta foi aberto. Nenhum PDF da
ANPD foi lido.**

Isso não invalida o manual — **invalida uma classe específica de uso:**

| Tipo de informação | Pode virar proposta ou cláusula? |
|---|---|
| Caminho de menu, sequência de passos, existência de recurso | ✅ **Sim** — corroborado em documentação de fabricante indexada |
| Regra estrutural: o que é cobrado, o que é grátis, o que é proibido, e **as datas** | ✅ **Sim** |
| **Qualquer valor em R$ ou US$ por mensagem** | ❌ **NÃO** — nenhum foi lido no rate card oficial |
| Taxa de conversão, leitura, resposta, match rate | ❌ **NÃO** — ver §7 |

> **Terceira vez que este acervo topa com isso.** A regra `D-035` continua valendo e agora
> se estende a número de fornecedor: **entra como `A VERIFICAR` até alguém abrir a fonte
> primária.** E neste caso a fonte primária mais forte não é documentação — **é a sua
> própria fatura.**

---

## 1 — O CAMINHO PONTA A PONTA, EM NOVE FASES

**As fases 1 e 4 dependem de terceiros e são as que mais atrasam. Comece por elas, não por
elas.**

| Fase | O quê | Tempo | Quem |
|---|---|---|---|
| **0** | **Diagnóstico** — taxa de identificação no PDV e onde o dinheiro entra | 1–2 h | Expansion + lojista |
| **1** | **Verificação de negócio no Meta Business Manager** | **dias a semanas** | Expansion conduz, lojista fornece CNPJ |
| **2** | **Exportação da base** | 2–6 h | Expansion |
| **3** | **Higienização e normalização** | 2–4 h | Expansion |
| **4** | **Camada jurídica** — LIA, aviso de privacidade, contrato | 4–8 h + prazo do advogado | Expansion redige, lojista assina |
| **5** | **Infraestrutura de disparo** — número dedicado, templates | 3–10 dias | Expansion |
| **6** | **Aquecimento e primeira onda** | 7–14 dias | Expansion |
| **7** | **Campanha completa em ondas** | 2–4 semanas | Expansion |
| **8** | **Meta Ads a partir da mesma base** | 1 dia + 7 dias intocado | Expansion |
| **9** | **Rotina mensal** | 20–30 min/mês | Expansion |

### FASE 0 — o diagnóstico que decide se dá para vender

Antes de mexer em dado nenhum, meça duas coisas:

1. **Taxa de identificação no PDV.** Rode o relatório de vendas dos últimos 90 dias e
   conte quantas vendas têm cliente identificado. **Abaixo de 30%, o problema não é
   exportação — é o processo de caixa.** Você vai gerar o relatório mais bonito do mundo
   e ele vem com 40 clientes e 900 vendas anônimas.
2. **Onde o dinheiro entra.** Muito Pix? **O extrato bancário é uma lista de nomes reais.**
   Quase tudo cartão? Esqueça a maquininha: ela não devolve identidade nenhuma.

> **Isto responde `A-047` com um teste objetivo.** Se a taxa de identificação for baixa, o
> produto muda: primeiro se vende **captação na origem** (treinar o caixa), depois
> reativação. **É outro escopo e outro preço.**

### FASE 1 — a que atrasa tudo, e por isso é a primeira

Sem portfólio verificado no Meta Business Manager: teto de **250 templates** (com
verificação, **6.000**), não sobe de degrau de envio e não ganha selo de conta oficial.
**Leva dias a semanas e não depende de você.**

---

## 2 — EXPORTAÇÃO: uma tabela por fonte

| # | Fonte | Tempo | Telefone? | Histórico? | Nome real? |
|---|---|---|---|---|---|
| 1 | **Agenda do celular** (Google Contatos / iCloud) | 15 min | ✅ | ❌ | ✅ se salvo |
| 2 | **ERP/PDV** (Bling, Tiny, Omie, Hiper, GestãoClick, Microvix) | 30 min–2 h | ✅ se digitado | ✅ | ✅ |
| 3 | **Extrato Pix** | 20 min | ❌ | ✅ data + valor | ✅ |
| 4 | **XMLs de NFC-e** | 1–3 h | ❌ | ✅ | raramente |
| 5 | **WhatsApp Business por etiqueta** (manual) | proporcional | ✅ | ❌ | ✅ |
| 6 | **Maquininha de cartão** | 15 min | ❌ | só faturamento | ❌ |
| 7 | **Instagram** | — | ❌ | ❌ | ❌ |

> **Quem tem pressa faz agenda + ERP hoje: resolve ~80% do caso de uma loja desse porte.**

### 2.1 · A descoberta que muda o roteiro de venda

**O WhatsApp Business não tem exportação nativa de contatos nem de etiquetas.** Não existe
botão. O que existe é exportar **uma conversa por vez** em `.txt`, e transcrever a etiqueta
na mão — cerca de 10 contatos a cada 1–2 minutos. **300 contatos ≈ 2 horas de mutirão.**

**Os "contatos" que o app mostra são a agenda do celular.** Por isso o caminho real é
exportar a agenda:

- **Android:** `contacts.google.com` → Exportar → CSV
- **iPhone:** `iCloud.com` → Contatos → selecionar tudo → Exportar vCard → converter para CSV

> **Isso confirma `A-030` e derruba uma promessa que o Kauã poderia fazer sem querer.**
> *"A gente puxa a sua base do WhatsApp"* é falso como automação. O que é verdade:
> *"a gente monta a sua base a partir da sua agenda e do seu sistema."*

### 2.2 · O extrato Pix é a fonte brasileira que ninguém usa

Cada Pix recebido traz **nome real do pagador, data e valor**. Não traz telefone — mas
**casa com a agenda pelo nome** e vira histórico de compra. Para loja que recebe muito por
Pix, é a fonte mais rica depois do ERP.

---

## 3 — HIGIENIZAÇÃO: as regras do telefone brasileiro

**Nunca deduplique antes de normalizar.** `(11) 98765-4321`, `11987654321` e
`+55 11 98765-4321` são a mesma pessoa e o Excel não sabe disso.

**Formato-alvo:** `55` + DDD + 9 dígitos, **só dígitos**, sem `+`, parênteses, espaço ou
hífen → `5511987654321`

| Passo | Regra |
|---|---|
| 1 | Tirar tudo que não é dígito |
| 2 | Tirar o `0` de operadora no começo |
| 3 | Se tiver 10 dígitos e o 3º for 6–9, **inserir o nono dígito** |
| 4 | Prefixar `55` se não tiver |
| 5 | **Só então** deduplicar por telefone |
| 6 | Marcar quem já pediu para sair — **antes de qualquer disparo** |

> ⚠️ **O erro nº 1 que zera o match rate no Meta Ads é telefone sem código do país.** Mesmo
> com base 100% brasileira, o `55` é obrigatório.
>
> ⚠️ **E o segundo: salvar o CSV errado.** A Meta exige **CSV UTF-8 delimitado por
> vírgula.** O Excel brasileiro salva com `;` e Windows-1252 por padrão — resultado: todas
> as colunas viram uma só e os acentos quebram.

---

## 4 — DISPARO

### 4.1 · 🔴 A ARBITRAGEM DE CATEGORIA É FALSA. E EU RECOMENDEI ELA.

**Em 11/08 eu registrei `D-040` dizendo que a arbitragem marketing → utilidade era "a
alavanca de margem do EX1". Está errado, e é pior que errado — é arriscado.**

| Por quê | |
|---|---|
| 1 | **A Meta classifica pelo CONTEÚDO, não pela declaração de quem envia**, e recategoriza automaticamente |
| 2 | **"Template misclassification" está listado pela própria Meta ao lado de álcool, apostas, drogas e conteúdo adulto** entre as violações que disparam escalada de punição. **Não é erro administrativo. É violação de política** |
| 3 | *"Volte a comprar"*, *"nova coleção"*, *"oferta"* são **marketing por definição**. Serão recategorizados ou reprovados — você paga marketing do mesmo jeito, agora com aviso de política no histórico |

**As três categorias reais:** MARKETING (única que permite venda direta) · UTILITY (só dá
continuidade a uma ação do próprio usuário) · AUTHENTICATION (só código OTP).
**SERVICE não é categoria de template** — é categoria de *preço*, para texto livre dentro
da janela.

### As duas alavancas LEGÍTIMAS que substituem a arbitragem

**ALAVANCA 1 — desenhar fluxos genuinamente transacionais.**
Confirmação de pedido, aviso de separação, código de rastreio, confirmação de retirada em
loja, lembrete de prova ou ajuste, pesquisa pós-compra. **Isso é utilidade de verdade,
passa na categorização e custa tarifa de utilidade.**

> **A competência da agência não é reclassificar mensagem promocional. É desenhar a
> operação da loja para gerar eventos transacionais reais.** Isso é entregável, e é
> vendável.

**ALAVANCA 2 — a janela de atendimento de 24h.** Desde 01/07/2025, template de
**utilidade dentro de janela aberta é gratuito**. Desde 01/11/2024, texto livre também.
**Vale mais provocar UMA resposta e trabalhar dentro da janela do que disparar três
templates de marketing.**

> ⚠️ **A alavanca 2 tem prazo de validade: 30/09/2026.** Ver §4.3.

### 4.2 · O que é cobrado hoje

| Regra | Desde |
|---|---|
| Cobrança **por mensagem entregue** — o modelo por conversa de 24h está *deprecated* | 01/07/2025 |
| **Só se paga quando o template é ENTREGUE.** Número inválido, sem WhatsApp ou barrado por limite não custa nada | vigente |
| Mensagem **não-template** (texto livre na janela) é **gratuita** | 01/11/2024 |
| Template de **utilidade dentro de janela aberta** é gratuito | 01/07/2025 |
| **Faixa de desconto por volume existe SÓ para utility e authentication. MARKETING NÃO TEM DESCONTO. NENHUM** | vigente |
| **Free Entry Point:** contato vindo de anúncio Click-to-WhatsApp abre janela de **72 h totalmente gratuita** | vigente |

> **A janela de 24h NUNCA foi grátis para marketing.** Quem acha que *"basta o cliente
> responder que fica de graça"* leva susto na fatura.

### 4.3 · ⚠️ A mudança de 01/10/2026 tem DUAS partes, e quase todo mundo só vê uma

**Parte 1:** mensagens de **serviço** (texto livre na janela) voltam a ser cobradas.

**Parte 2, a que ninguém está vendo:** **templates de UTILIDADE dentro de janela aberta,
hoje gratuitos, passam a ser cobrados.** *(MEDIA — não confirmado em página oficial.)*

**Quem montar fluxo de pós-venda e rastreio em cima dessa gratuidade vai ser surpreendido
pela segunda parte, não pela primeira.**

**Preço para o Brasil: NÃO INFORMADO.** A Meta se comprometeu a publicar as tarifas por
país **até 01/09/2026** — daqui a **13 dias**.

> **AÇÃO COM DATA: em 01/09/2026, voltar ao rate card e pegar a tarifa de serviço do
> Brasil. Não feche contrato nem projeção de orçamento antes disso.**

### 4.4 · E um achado que reforça o congelamento do EX2 · IA

Desde **01/08/2026**, o **Meta Business Agent** é cobrado **por token**, a US$ 2,00 por
milhão, com a própria documentação estimando 20–25 mil tokens por mensagem →
**US$ 0,04–0,05 por resposta de IA** *(MEDIA)*.

**Isso é 6 a 7 vezes o custo estimado de uma mensagem de serviço no Brasil.**

> **Trocar atendimento humano por IA nativa da Meta pode AUMENTAR o custo.** `D-039`
> (congelar o EX2 · IA) ganha um quarto motivo, e é de custo — o único que faltava.

### 4.5 · Preço: o que se sabe e o que não se sabe

| Item | O que circula | Status |
|---|---|---|
| **MARKETING Brasil** | US$ 0,0625 (~R$ 0,32–0,35) | 🔴 **REFUTADO como número oficial** |
| **UTILITY Brasil** | US$ 0,0068 (~R$ 0,035) | 🔴 **NÃO VERIFICÁVEL** |
| **AUTHENTICATION Brasil** | conflito de **5×** entre fontes | 🔴 não usar |
| **SERVICE Brasil** | R$ 0,00 até 30/09/2026 | ✅ a gratuidade é ALTA. **O preço depois: NÃO INFORMADO** |

**Por que o US$ 0,0625 caiu:** a Meta publica **rate card oficial em BRL desde
01/07/2026** — logo toda conversão de blog está errada por construção. E a cadeia de
fontes é circular: a página oficial **não contém valor numérico nenhum** (as tarifas vivem
em CSV/PDF), e o mesmo número aparece descrito como *por conversa*, *por mensagem
entregue* e *por mensagem não-template* — leituras que se contradizem.

> **A fonte primária mais forte não é documentação — é a fatura.** Meta Business Manager →
> Faturamento. **A fatura já vem com a categoria, o país e o câmbio aplicados de fato.**

**🔒 CLÁUSULA OBRIGATÓRIA:** nunca escreva preço fixo em reais no contrato. Escreva como
**repasse indexado ao rate card oficial da Meta vigente na data da entrega**, com reajuste
trimestral (1º de janeiro, abril, julho ou outubro — a Meta só pode mudar nessas datas,
com 30 dias de aviso) e a soma que todo orçamento esquece: **custo real = tarifa Meta +
markup do BSP + mensalidade da plataforma rateada.**

### 4.6 · Modelos de contratação — e a resposta para `A-034`

| Modelo | Como funciona | Quando |
|---|---|---|
| **Cloud API direto** | Sem markup. Você constrói fila, retry, webhook, painel | só com desenvolvedor dedicado |
| **Tech Provider** (ex.: 360dialog) | **Não tem linha de crédito com a Meta.** O cartão é seu, a Meta te fatura direto, o fornecedor cobra só o software. **É o modelo mais transparente** | **padrão recomendado para agência** |
| **Solution Partner** (Blip, Zenvia, Twilio) | Tem linha de crédito. A Meta cobra o BSP, o BSP cobra você **com margem** | mais simples, mais caro, menos transparente |

**Ponto de equilíbrio citado entre markup por mensagem e licença fixa: ~10.000
mensagens/mês** *(BAIXA)*.

### 4.7 · Aprovação de template

**Até 24 h oficialmente.** Triagem automática: a maioria sai em minutos. Revisão humana:
até 48 h. **Template reprovado não se conserta** — crie um novo com nome diferente.

**Reprovações mais comuns:** variável fora do padrão `{{1}}` · template que **começa ou
termina com variável** · variáveis não sequenciais · **densidade de variável alta demais**
(regra prática: ~3 palavras fixas por variável) · cabeçalho de mídia sem amostra · botão de
URL apontando para `wa.me`.

> **Cadastre 2 a 3 templates aprovados por objetivo ANTES de precisar deles.** Quando um
> for pausado por qualidade — e vai ser — você troca em segundos em vez de ficar 3 horas
> parado.

### 4.8 · Limites de envio — e o achado que muda o modelo da agência

**O limite é de DESTINATÁRIOS ÚNICOS**, não de mensagens, numa janela móvel de 24 h, e só
para quem está **fora** de uma janela de atendimento. Mandar 5 templates para o mesmo
contato consome **1**.

**Degraus atuais: 250 → 2.000 → 10.000 → 100.000 → ilimitado.**
*(A escada de 250 → 1.000 que circula na internet está desatualizada.)*

**MUDANÇA ESTRUTURAL DE 07/10/2025:** o limite deixou de ser **por número** e passou a ser
**por Business Portfolio**, compartilhado por todos os números.

> 🔑 **Isto tem duas caras, e as duas importam para a Expansion:**
>
> **A favor:** número novo adicionado a um portfólio que já está em 100.000 **herda o
> limite na hora.** Se os números dos clientes viverem no portfólio da Expansion, o
> aquecimento é feito **uma vez** e todo cliente novo nasce grande. **É um ativo
> operacional real.**
>
> **Contra:** **um cliente pode consumir o limite de todos.** E queda de qualidade de um
> número afeta o conjunto. **Isso precisa estar no contrato** e é a mesma decisão de
> `A-034` vista pelo lado do risco, não do preço.

**Como se sobe de degrau:** qualidade alta em todos os números **e** ter usado ao menos
**metade do limite nos últimos 7 dias**. Promoção em até 6 horas.
**Mandar 200 por dia nunca promove a conta.**

**Velocidade é coisa diferente de limite:** a Cloud API entrega 80 mensagens/segundo.
**Número em modo coexistência — app WhatsApp Business e API ao mesmo tempo — trava em 20/s,
quatro vezes menos.** Para disparo em massa, use **número dedicado só na API.**

### 4.9 · Quality rating — e o único diagnóstico que ninguém olha

Calculado sobre os **últimos 7 dias**, com base em **bloqueio (e o motivo escolhido)** e
**denúncia**. Estados: Connected → Flagged → Restricted.

**Uma vez em Flagged, o relógio é de 7 dias.** Recuperou até o 7º dia, volta com o degrau
intacto. Ficou os 7 dias inteiros, **cai um degrau.**

> **No WhatsApp Manager, passe o mouse sobre o rating: aparecem os motivos de bloqueio
> agregados.**
>
> | Motivo predominante | O problema é |
> |---|---|
> | *"Não me inscrevi"* | **opt-in** |
> | *"Não preciso mais"* | **frequência** |
> | *"Spam"* | **conteúdo** |
>
> **Cada um exige correção diferente. Tratar tudo como "baixar o volume" resolve um caso
> em três.**

**Pausa de template por qualidade:** 1ª vez **3 h** → 2ª **6 h** → 3ª **desativado
permanentemente**.

**Três erros de webhook para ler todo dia:** `131049` (limite por-usuário da Meta barrou —
esperar 24 h, **não retentar em loop**) · `132015` (template pausado — trocar) · `132016`
(template desativado — recriar do zero). **Nenhum dos três é cobrado.**

### 4.10 · Opt-in — e a armadilha de achar que cumprir a Meta é cumprir a lei

A Meta exige duas coisas, ambas obrigatórias: declarar **claramente** que a pessoa está
optando por receber, e declarar **claramente o nome do negócio**. O opt-in **não precisa
ser colhido dentro do WhatsApp** e **pode ser genérico**.

> ⚠️ **CUMPRIR A META NÃO É CUMPRIR A LGPD.** A Meta aceita opt-in genérico; a LGPD, na
> rota consentimento, **não** — consentimento para finalidade genérica é **NULO** (art. 8º,
> §4º). **A política da plataforma é mais permissiva que a lei brasileira.**

**Base comprada, lista raspada e número obtido de terceiro são violação direta** da
política da Meta, além de ilícito.

### 4.11 · 🔴 As ferramentas não oficiais — e a revisão de `D-018`

Z-API, Evolution, WPPConnect, Baileys **não são API**: são automação do WhatsApp Web via
QR Code, engenharia reversa do protocolo. Sem quality rating, sem templates, **sem
processo de apelação**.

**O risco real não é perder o número — é perder tudo.** O termo de uso permite ao WhatsApp
**proibir aquela pessoa física e aquela organização de todo uso futuro de produtos e
serviços Meta.** Isso alcança **Business Manager, pixel, contas de anúncio e Instagram
vinculados.**

> ⚠️ **`D-018` (18/08) decidiu "API oficial em prioridade, não-oficial configurada como
> reserva". Isso precisa ser revisto.**
>
> Se a aquisição do cliente depende de Meta Ads — e no EX1 GIRO depende, porque tem uma
> rodada de tráfego por mês —, **manter um canal não-oficial ligado é apostar o canal de
> aquisição inteiro para economizar centavos por mensagem.**
>
> **Recomendação: a reserva deixa de ser canal não-oficial e passa a ser fila com reenvio
> na própria oficial** — que já era a ressalva técnica registrada em `21` §7.1 e que agora
> tem fundamento de política, não só de engenharia.

---

## 5 — TRÁFEGO A PARTIR DA MESMA BASE

### 5.1 · A inversão que muda o desenho do produto

Com base pequena (500 a 2.000 pessoas) e só nome, telefone e data da última compra, **o
valor da base NÃO está em anunciar PARA ela.** Está, nesta ordem:

1. **EXCLUIR** essa gente do anúncio de prospecção, para não pagar por quem já é cliente
2. Servir de **SEMENTE** para o Público Semelhante
3. Só então retargeting pago — **que quase sempre é pior negócio do que mandar mensagem
   para quem já é cliente**

> **Você já tem o telefone dessa gente. Falar com ela custa R$ 0 no app WhatsApp Business.
> Anunciar para ela custa CPM.**

### 5.2 · O arquivo, do jeito que a Meta exige

| Regra | Detalhe |
|---|---|
| Formato | **CSV UTF-8 delimitado por vírgula** |
| Nome | **A Meta PROÍBE coluna única de "nome completo".** Tem que ser `fn` e `ln` separadas |
| Telefone | **Código do país obrigatório** → `5511987654321`. **Este é o erro nº 1 que zera o match rate** |
| Coluna `country` | sempre presente, tudo `BR` |
| Hash | **SHA-256 feito localmente no navegador.** A Meta não recebe telefone em texto puro |
| Data da última compra | **NÃO é identificador aceito.** Serve para **fatiar** a base antes de subir |

### 5.3 · Os números mínimos

| Recurso | Mínimo |
|---|---|
| Público Personalizado utilizável | **100 pessoas correspondidas** |
| Origem de Público Semelhante | **100 do mesmo país** (200 que converteram, para semelhante de conversão) |
| Estimativa de tamanho na interface | abaixo de 1.000 não aparece — **mas o público existe e funciona** |
| Percentual do Semelhante | **com semente pequena, comece em 1%.** Maior só dilui |

**Match rate: a Meta não publica taxa oficial, nem por país nem por identificador.**
Todos os benchmarks que circulam são não verificáveis.

> **O único match rate confiável é o seu.** Suba a lista, anote quantos casaram, divida.
> **Depois de 10 uploads, a Expansion tem o benchmark que o mercado brasileiro não tem** —
> e isso é exatamente o ativo de `35` §9.

### 5.4 · O ativo mais barato e mais ignorado: retargeting de Instagram

**Existe Público Personalizado a partir da conta do Instagram, sem site e sem pixel.**
Eventos: quem se envolveu com a conta, quem visitou o perfil, quem mandou mensagem, quem
salvou publicação. **Janela de até 365 dias, e o público se atualiza sozinho.**

> **Para uma loja de roupa com perfil ativo, esse público quase sempre é MAIOR e mais
> fresco que a base de compradores.** É o mais barato de montar e o mais ignorado — e é o
> que faz a rodada de tráfego do EX1 GIRO funcionar em loja com base pequena.

### 5.5 · Click-to-WhatsApp — e o que isso significa para a proposta

| Item | Detalhe |
|---|---|
| Pré-requisito | **Basta o app WhatsApp Business grátis com o número vinculado à Página. NÃO é obrigatório contratar a API** |
| Custo de conversa no app | **R$ 0.** Toda tabela de preço por mensagem vale para a API, não para o app |
| **Free Entry Point** | Contato vindo daqui abre janela de **72 h gratuita** se você responder em 24 h — **e ela sobrevive à mudança de outubro** |

> **Se você já compra mídia, priorize Click-to-WhatsApp em vez de disparo frio:** além de
> 72 h grátis, o contato chega com intenção e não bloqueia.
>
> **E a honestidade que protege a proposta:** quem vende API para loja de R$ 40–60 mil
> está vendendo custo desnecessário — **a menos que o objetivo seja disparo em massa para
> base própria, que é exatamente o EX1.** Saiba separar as duas coisas na hora de vender.

### 5.6 · Orçamento — e o imposto que ninguém vê

| Item | Valor |
|---|---|
| Mínimo oficial | **US$ 1/dia** por conjunto |
| Recomendação da Meta | pelo menos US$ 5, rodando mais de 6 dias |
| Fase de aprendizado | **~50 eventos de otimização por semana** para sair |
| **Imposto Brasil, desde 01/01/2026** | **PIS/COFINS 9,25% + ISS 2,9% ≈ +12,15%** acima do que aparece no Gerenciador — **e o Gerenciador não mostra** |

**Ponto de partida realista:** R$ 20 a R$ 30/dia em UM conjunto = R$ 600 a R$ 900/mês
**+ ~12,15% de imposto.**

> **Com R$ 25/dia otimizando para conversas de R$ 10, seriam necessários ~R$ 71/dia para
> sair do aprendizado. Assuma conscientemente que vai rodar em "aprendizado limitado" em
> vez de descobrir depois** — e diga isso à lojista antes, não no relatório.

**Faça a conta com o número DELA, não com benchmark:** se de cada 10 conversas ela vende 3,
ticket R$ 200 com 32,4% de margem, cada conversa vale ~R$ 19 de margem. **Pagar R$ 8 por
conversa é ótimo. Pagar R$ 25 é ruim.**

### 5.7 · A armadilha que faz a loja anunciar para si mesma o ano inteiro

**O público de lista NÃO se atualiza sozinho.** Quem comprou depois do upload não entra.
**Sem reupload mensal, você passa o ano anunciando para quem já é cliente.**

**Isso é a fase 9 do caminho — 20 a 30 minutos por mês.** E em campanha Advantage+, a
**exclusão é restrição rígida** (a IA não a ultrapassa), enquanto a inclusão é só sugestão.

---

## 6 — LGPD

### 6.1 · A rota realista é legítimo interesse — e ela é controversa

**A LGPD tem 10 bases legais e consentimento não é a regra.** Para base de clientes que já
compraram, a rota realista é **legítimo interesse** (art. 7º, IX + art. 10), e o art. 10, I
cita expressamente *"apoio e promoção de atividades do controlador"*.

> ⚠️ **MAS NÃO ESTÁ PACIFICADO.** Parte da doutrina sustenta que marketing exige
> consentimento; outra parte, que relacionamento comercial prévio já cria legítima
> expectativa. **Não há decisão da ANPD nem jurisprudência consolidada.**
>
> **A defesa não é "eu estava certo" — é "eu analisei, registrei e agi com diligência".**

**Não existe "soft opt-in" no Brasil.** O que existe é o legítimo interesse, que funciona
como um — **mas exige LIA documentada**, o que o soft opt-in europeu não exige.

### 6.2 · O LIA — o documento de 2 a 4 páginas que sustenta tudo

| Fase | Pergunta |
|---|---|
| **1 · Finalidade** | Qual é o interesse concreto? *"Reativar clientes inativos há X meses."* É lícito e específico? |
| **2 · Necessidade** | Existe caminho menos invasivo? Quais dados são o **mínimo**? **Se nome, telefone e data bastam, exclua o resto do arquivo** |
| **3 · Balanceamento** | O cliente **espera** receber isso? **Defina um corte de recência explícito — prática de mercado, 12 a 24 meses.** Liste as salvaguardas e **conclua com um veredito: passa ou não passa** |

**Revise a cada 6 meses ou sempre que mudar público, oferta, frequência ou canal. LIA
vencido é LIA que não existe.**

> **Isto muda um entregável do EX1.** O corte de recência do LIA e o corte de segmentação
> da campanha **têm que ser o mesmo número.** Segmento que não passa no balanceamento sai
> da campanha ou vira campanha de consentimento.

### 6.3 · Papéis — e a frase que derruba o contrato de quase toda agência

| Papel | Quem | Decide |
|---|---|---|
| **Controlador** | **A loja** | Finalidade e elementos essenciais |
| **Operador** | **A Expansion** | Só elementos não essenciais, seguindo instrução |

> ⚠️ **A qualificação decorre da ATUAÇÃO CONCRETA, não do rótulo do contrato.** Escrever
> *"a agência é mera operadora"* **não protege** se ela na prática define segmentação,
> enriquece a base, decide oferta ou reaproveita dados.
>
> **O contrato mentiroso não protege — só serve de prova contra quem o assinou.**

**No EX1, a Expansion define a segmentação e a oferta.** Isso puxa para **controladoria
conjunta**, não operação pura — e é exatamente o que `35` §8 levantou. **Assumir isso no
contrato é mais seguro do que negar.**

**Mais três coisas que quase ninguém sabe:**
- **A agência tem ROPA próprio** (art. 37). Não basta o do lojista
- **Responsabilidade solidária** quando o operador descumpre a lei ou foge da instrução — e aí é **equiparado a controlador** (art. 42, §1º, I)
- **O CDC impõe responsabilidade objetiva e solidária a toda a cadeia.** A loja não empurra 100% do problema para a agência perante o consumidor

### 6.4 · O contrato — e uma correção ao que eu escrevi antes

> ⚠️ **A LGPD NÃO tem artigo listando cláusulas obrigatórias de contrato
> controlador–operador. Isso é o art. 28 do GDPR europeu.** A LGPD tem o art. 39.
> **Quem diz "a LGPD exige as seguintes cláusulas" está traduzindo GDPR e chamando de lei
> brasileira.**
>
> **As 12 cláusulas de `24` §5 continuam sendo boa prática defensável — mas apresente-as
> como boa prática, não como imposição legal.** A diferença aparece na hora de negociar com
> o jurídico do outro lado.

**As que faltavam na minha lista e são as mais importantes para a Expansion:**

| # | Cláusula | Por quê |
|---|---|---|
| 5 | **Declaração de origem lícita pelo lojista**, com obrigação de entregar as evidências | **É o escudo nº 1 da agência** |
| 6 | **Vedação de uso próprio** — não usar para outros clientes, não enriquecer, não revender, **não treinar modelo** — salvo autorização específica e separada | **É a cláusula que `35` precisa inverter, com autorização escrita** |
| 8 | **Transferência internacional** (Meta/EUA, nuvem) com Cláusulas-Padrão Contratuais | **Quase nenhum contrato de agência trata disso** |
| 10 | **Incidentes:** 24 h para a agência avisar a loja; comunicar a ANPD é dever **da loja** | prazo de 3 dias úteis |
| 12 | **Lista de supressão única e canônica**, propagada em até 24 h | é o que faz o opt-out funcionar |
| 18 | **Conformidade com a política da Meta** e **alocação do risco de banimento do número** | decide quem paga se o número cair |

### 6.5 · Opt-out — as regras operacionais

- **Botão de resposta rápida** no template, não texto pedindo para digitar
- **Em TODA mensagem promocional**, não só na primeira
- **Automatize ANTES do primeiro disparo.** Qualquer resposta com **SAIR, PARAR, CANCELAR, DESCADASTRAR, REMOVER, STOP** marca opt-out **em tempo real, antes de qualquer humano ver**
- **Trate também como opt-out:** bloqueio do número e denúncia na Meta
- **Cessação imediata.** Não existe *"deixa terminar a campanha já agendada"*
- **Zero fricção.** Exigir ligação, e-mail ou formulário **derruba o legítimo interesse inteiro**

### 6.6 · Uso agregado — a sequência que `35` precisa seguir

**A agência operadora não pode, por conta própria, agregar bases de vários lojistas.**
Isso é tratamento fora da instrução: **converte a agência em controladora e aciona
responsabilidade solidária.** Exige **autorização escrita e específica de cada lojista.**

**E os erros de anonimização que derrubam quase todo mundo:**

| Erro | Realidade |
|---|---|
| *"Hasheamos os telefones, está anonimizado"* | **Hash é PSEUDONIMIZAÇÃO, não anonimização.** Continua sendo dado pessoal. O espaço de celular brasileiro é pequeno o bastante para força bruta |
| *"É só perfil, não é dado pessoal"* | **Perfil comportamental de pessoa identificada É dado pessoal** (art. 12, §2º). **Atinge diretamente segmentação por histórico de compra** |
| *"Anonimizo depois"* | **O ato de anonimizar é, ele próprio, tratamento.** Precisa de base legal |
| *"Está seguro aqui na agência"* | **O risco de reidentificação é contextual.** Dataset seguro dentro da loja pode deixar de ser anonimizado ao chegar na agência |

**A sequência correta:** autorização escrita de cada lojista → confirmar no aviso de
privacidade → **anonimizar DENTRO da loja, antes de exportar** → generalizar
quase-identificadores → **suprimir qualquer cruzamento com menos de 5 pessoas** →
documentar teste de reidentificação → **exportar só métricas agregadas, nunca linha por
cliente**.

> **E para treinar modelo: NÃO use conteúdo de conversa.** Texto livre de cliente carrega
> dado sensível espontâneo — doença, gravidez, religião — para o qual legítimo interesse
> **não serve**.

### 6.7 · Onde a multa realmente dói — e não é onde você pensa

| Órgão | Realidade |
|---|---|
| **ANPD — teto legal** | até 2% do faturamento, limitado a R$ 50 milhões por infração |
| **ANPD — realidade** | **a única multa pecuniária a empresa privada com decisão pública é R$ 14.400** (caso Telekall, julho/2023), reduzida a R$ 10.800. **Nenhuma sanção pública contra varejista ou agência por campanha em base própria** |
| ⚠️ **PROCON-SP — o risco financeiro real** | desde 2010: **348 multas por bloqueio de telemarketing, ~R$ 260 milhões.** Teto por processo: **R$ 9,1 milhões** |
| **Lei Estadual SP 17.334/2021** | **estendeu expressamente o "Não Me Ligue" a mensagens por aplicativo, inclusive WhatsApp.** Número cadastrado não pode receber a partir do 30º dia |

> **O risco não é a ANPD. É o Procon-SP.** E a lição do caso Telekall é direta: a defesa
> *"o dado estava público na internet"* **foi rejeitada** — dado público continua sendo
> dado pessoal e continua exigindo base legal.

**Alívio para empresa pequena:** a Resolução CD/ANPD nº 2/2022 dispensa encarregado,
simplifica registro e dobra prazos — **mas não dispensa base legal nem princípios.**

---

## 7 — O QUE NÃO É VERIFICÁVEL: não use em proposta

> **Regra absoluta: nada desta seção entra em proposta, cláusula, promessa de resultado ou
> projeção. Nem como "aproximadamente". Nem como "faixa de mercado".**

| Número | Status |
|---|---|
| **US$ 0,0625 por mensagem de marketing no Brasil** (~R$ 0,32–0,35) | 🔴 **REFUTADO** como número oficial — cadeia circular, e existe rate card em BRL desde 01/07/2026 |
| US$ 0,0068 / 0,0065 / 0,0051 (utility) | 🔴 **NÃO VERIFICÁVEL** — pode ser preço de revenda de BSP, com markup |
| Match rate 40–60% / 60–80% | 🔴 **NÃO VERIFICÁVEL** — a Meta não publica |
| Taxa de leitura 68% / 90–94% / 38% | 🔴 **NÃO VERIFICÁVEL** — e o recibo de leitura é desativável pelo usuário, o que quebra a métrica na origem |
| **Ticket médio R$ 190 (IEMI)** | 🟡 **A CONFIRMAR** — sem URL, sem ano, sem nome de estudo. **Rebaixado de ALTA.** Um valor divergente (R$ 265) apareceu, **mas com o mesmo defeito — não substitui** |
| CPM R$ 15–35 · CPC R$ 2,50–8 · CPL R$ 3–30 | 🟡 **BAIXA** — usar só como ordem de grandeza no 1º mês, e substituir pelo número real na 2ª semana |

---

## 8 — AS CORREÇÕES QUE ISTO FORÇA NO ACERVO

| Ref. | O que muda |
|---|---|
| **`D-040`** | 🔴 **REVOGADA na parte da arbitragem.** *"Arbitragem marketing → utilidade"* é **violação de política da Meta**, listada ao lado de álcool e apostas. **A franquia de disparo continua** — o que cai é o mecanismo de arbitragem. Substituída por `D-047` |
| **`D-018`** | 🔶 **REVISADA.** Canal não-oficial como reserva arrisca **Business Manager, pixel, contas de anúncio e Instagram** — não só o número. A reserva passa a ser **fila com reenvio na oficial** |
| **`ALERTA-08`** | 🟡 **Os números caem para `A VERIFICAR`.** O mecanismo (marketing custa muito mais que utilidade, e marketing **não tem desconto por volume**) é estrutural e continua. **As magnitudes — R$ 620–760, R$ 221, 8,9%, 34,9% — não estão verificadas** |
| **`33` e `35`** | 🟡 As tabelas de margem usam **R$ 150/mês de custo Meta** como premissa. **Essa premissa agora é `A VERIFICAR`** e só fecha com a fatura na mão |
| **`D-039`** | ✅ **Reforçada.** Meta Business Agent cobrado por token desde 01/08/2026, a US$ 0,04–0,05 por resposta — **6 a 7× uma mensagem de serviço.** Quarto motivo para congelar o EX2 · IA, e o primeiro de custo |
| **`A-034`** | ✅ **Ganha uma segunda dimensão.** Não é só preço: com limite por Business Portfolio, a escolha decide se o aquecimento é feito uma vez para todos **ou** se um cliente pode consumir o limite de todos |
| **`A-047`** | ✅ **Ganha teste objetivo:** taxa de identificação no PDV nos últimos 90 dias. **Abaixo de 30%, o produto muda** |
| **`24` §5** | 🔶 As 12 cláusulas continuam boas, mas **apresentar como boa prática, não como "a LGPD exige"** — isso é GDPR art. 28, não LGPD |

---

## 9 — AS DEZ ARMADILHAS QUE MAIS DERRUBAM UMA OPERAÇÃO DESSAS

1. **Deixar a verificação de negócio no Meta para o fim.** Ela leva semanas e não depende de você. **É o passo 1.**
2. **Telefone sem o `55`.** Zera o match rate no Meta Ads.
3. **CSV salvo pelo Excel brasileiro** — `;` e Windows-1252. Todas as colunas viram uma.
4. **Deduplicar antes de normalizar.** Perde metade da base sem perceber.
5. **Cadastrar campanha promocional como utilidade.** Violação de política, não economia.
6. **Disparar a base inteira na estreia.** Número novo tem limite de 250 destinatários em 24 h.
7. **Usar o número principal da loja para disparo em massa.** Modo coexistência trava em 20 msg/s e o risco cai sobre o número que atende cliente.
8. **Não ler o webhook.** `131049`, `132015` e `132016` fazem a campanha falhar em silêncio.
9. **Não reenviar o público de exclusão todo mês.** A loja passa o ano anunciando para quem já é cliente.
10. **Achar que cumprir a Meta é cumprir a LGPD.** Opt-in genérico serve para a Meta e é **nulo** para a lei.

---

## 10 — O QUE FAZER NESTA SEMANA

| # | Ação | Prazo |
|---|---|---|
| 1 | **Abrir o Meta Business Manager → Faturamento** e ler o preço real por categoria na fatura. **É a fonte primária mais forte que existe, e supera qualquer documentação** | hoje |
| 2 | **Baixar o rate card oficial em BRL** (CSV/PDF) do card vigente | hoje |
| 3 | **Perguntar ao fornecedor: por conta ou por número?** — e agora também: *"os números dos meus clientes ficam no meu Business Portfolio ou em portfólios separados?"* | sexta |
| 4 | **Iniciar a verificação de negócio no Meta** para a Expansion — leva semanas | sexta |
| 5 | **Rodar a Fase 0 nos próximos 5 diagnósticos:** taxa de identificação no PDV dos últimos 90 dias | próximas calls |
| 6 | **Marcar 01/09/2026 na agenda:** a Meta publica as tarifas de outubro | **01/09** |
| 7 | **Levar ao advogado:** LIA, papéis (controladoria conjunta), e a cláusula de uso agregado de `35` | esta semana |
