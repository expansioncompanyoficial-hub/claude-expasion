# CHANGELOG

Convenção do acervo (`CLAUDE.md` da raiz): rodadas de análise viram **arquivos novos**, não edições destrutivas. Este log registra o que mudou e por quê.

---

## v1.0 — 2026-08-05 — GATE 0: Integridade dos dados

**Criado.** Estrutura `business-model/` completa: 11 documentos e 6 CSVs.

### Achados que mudam o entendimento da empresa

| # | Achado | Onde |
|---|---|---|
| 0 | 🚨 **Existe uma decisão de preço de 13/07/2026 que nunca foi executada.** O conselho fixou piso de R$ 5–6 mil/cliente, proibiu fechar abaixo de R$ 5 mil e mandou medir horas na Semana 1. Nada foi feito. A carteira está entre 26,7% e 60% do piso | `01` §4.5 |
| 0b | **A margem é a folha.** Ao pagar a equipe na faixa que o próprio conselho recomendou (R$ 2.600), a carteira inteira empata em −R$ 116,67/mês. 4 das 6 funções são pagas abaixo do piso júnior de mercado | `03` §7 |
| 0c | **Receita por cabeça: R$ 1.935,42** contra piso de R$ 12.000 do conselho — **16,1% de atingimento**. A recorrência atual sustenta 1,29 pessoas nesse padrão | `07` |
| 1 | **77,01% da folha não tem direcionador de custo** — 4 das 6 funções não têm capacidade declarada | `03` §2 |
| 2 | A contradição **R$ 6.850 × R$ 9.350 está resolvida por identidade aritmética**: os R$ 6.850 excluíam o gestor de tráfego e já usavam Social Media a R$ 1.700 | `03` §1.2 |
| 3 | **O editor principal opera a 168,9% da capacidade no cenário mais otimista possível**, e a 413,8% no estressado | `03` §4.1 |
| 4 | **Dr. Fred tem MC negativa só na edição**: −20,0% (dia útil) a −73,9% (dia corrido), consumindo 140–203% do gargalo por R$ 1.750/mês | `03` §5, ALERTA-01 |
| 5 | **Toda a carteira informada vence em agosto de 2026.** Perder Ciés + Albanos leva o resultado a **−R$ 3.200/mês** | `03` §5, ALERTA-04 |
| 6 | **Concentração de 51,67% em um único cliente** (Albanos), com data de vencimento desconhecida | `03` §6 |
| 7 | Os **R$ 250 mil / R$ 60 mil** não sobrevivem a teste aritmético como receita reconhecida — exigiriam 1 evento a cada 2,56 dias | `01` §4.1 |
| 8 | Os **"45% de margem" reconciliam com 46,52%** de MC parcial pós-folha PJ — não é margem líquida | `01` §4.2 |
| 9 | **Fator R ≈ 0%** por operar 100% com PJ pode empurrar a empresa ao Anexo V: **9,42 p.p.** de diferença de alíquota, ~R$ 1.458/mês | `01` §5.2 |
| 10 | **Clau Kids é cliente ativo em 3 fontes e não aparece em nenhuma tabela de receita** | `01` §4.4, PC1 |
| 11 | O designer só cabe na capacidade se **≥73,5% das publicações forem vídeo** — o mix decide se há 1 ou 2 gargalos | `03` §4.2 |
| 12 | **A estrutura de custo é quase inteiramente fixa** — logo capacidade importa mais que ponto de equilíbrio | `03` §1.3 |

### Decisões registradas
`D-001` a `D-005` em `DECISION-LOG.md`. Sete decisões em aberto (`A-001` a `A-007`), duas delas paradas há mais de 50 dias.

### Objeção formal registrada
`D-003` — a sequência de gates do Prompt-mestre foi contestada. Ver `01` §7.

### O que **não** foi feito, e por quê
- **Nenhum preço proposto.** Grau de confiança dos dados: 2,5/10. Regra do Prompt-mestre §7 GATE 0.
- **Nenhum custo de estrutura calculado.** 16 ferramentas identificadas, zero valores.
- **Nenhum TDABC real.** Nada foi cronometrado; os custos unitários são rateios de mensalidade.
- **Nenhum arquivo do acervo existente foi alterado ou apagado.** Todo o trabalho vive em `business-model/`.

### Fontes lidas
`EXPANSION-360`, `OPERACAO-REAL`, `AUDITORIA-DRIVE`, `transcricoes-audios-whatsapp`, `FICHA-MISSAO-M002`, `README`, `CLAUDE.md`, prompt-mestre. Varredura dirigida em `CONSELHO-EXPANSION-*`, `PLATAFORMA-WEBLUXURY-*`, `POSICIONAMENTO-CONTEUDO-*`, `POP-SOCIAL-MEDIA`, `AEOS/`.

### Fontes indisponíveis
Extrato bancário · contratos assinados · notas fiscais · faturas de ferramentas · apontamento de horas · custos do OTI PRO. Google Drive bloqueado por política de egress neste ambiente.

---

## Rodada 08/08/2026 — Manual de entrega

**Entregue:** `18-ENTREGAVEIS-DESTRINCHADOS.md` + versão visual publicada
(https://claude.ai/code/artifact/4f3e74f8-2915-4aa3-8d17-764675ee98b0).

Os 15 entregáveis dos três produtos, destrinchados um a um: o que é, o passo a
passo de execução, quem faz, quanto tempo leva e o que o cliente recebe.

### Fatos novos incorporados (fonte: Nicolas, operação própria)

| # | Fato | Efeito |
|---|---|---|
| 1 | ~~Ciés reativou a base e vendeu +R$ 5.000 em menos de um dia~~ **❌ RETRATADO EM 10/08 — NÃO ACONTECEU.** `D-017` revogada por `D-034` | — |
| 2 | **O contato no grupo de WhatsApp "demandava muito tempo" e não está em nenhuma hora precificada** | `ALERTA-05` — 30 min/dia derruba o EX3 de **31,3% para 23,5%** de lucro. Piso correto sobe de R$ 5.281 para R$ 6.635. Vira `A-027` |
| 3 | **O designer não será renovado**; trabalho migra para IA + Canva, com automação de carrossel em construção | `D-016`. Folha R$ 9.350 → R$ 8.700; EX3 → 37,2h e 32,6% de lucro. **Mas a grade de conteúdo perde dono** → `A-028` |
| 4 | **A operação tem 6 pessoas nomeadas** — Débora (social media), Matheus Felipe (tráfego), Daniel, Bernardo e Adryel (edição), designer (saindo) | Permite alocar cada entregável a uma pessoa com nome |
| 5 | **O que se vendia era 2 vídeos + 1 carrossel/semana + tráfego + grupo** | Confirma que o "360" antigo é o EX3 com o grupo dentro — e explica por que a margem nunca fechava |

### Decisões registradas
`D-016`, `D-017`. Três decisões novas em aberto: `A-027` (grupo no preço ou no
SLA), `A-028` (dono da grade), `A-029` (validar os tempos).

### O que **não** mudou
Nenhum preço foi aprovado. Todos seguem `NÃO APROVADO` por `D-001` e `A-006`.
Os tempos de 6h / 20h / 39h continuam `ESTIMADO` — `A-029` é o que os fecha.

---

## Rodada 08/08/2026 (2) — Playbook comercial e infraestrutura

**Entregue:** `19-PLAYBOOK-COMERCIAL-KAUA.md` e `20-INFRAESTRUTURA-E-DADOS.md`,
mais a versão visual do playbook
(https://claude.ai/code/artifact/27ca8840-062e-4a53-aafd-7a16aeee37e1).

### Achados desta rodada

| # | Achado | Onde |
|---|---|---|
| 1 | **Cada R$ 100 de desconto tira R$ 61,42 do lucro** — a folha é fixa em reais e não cai junto. Para recompor R$ 100 é preciso vender R$ 163 | `19` §1 |
| 2 | **O EX3 tem 4% de folga; o EX1 tem 55%.** Daí a regra operacional: **o desconto sai do EX1, nunca do EX3** | `19` §2 |
| 3 | **Desconto permanente de 15% custa 5,4× mais que dar dois meses de EX1** (R$ 11.940 contra R$ 2.211 num contrato de 12 meses do pacote) | `19` §3 |
| 4 | **`ALERTA-06` — o custo de mensagem não está em nenhum preço.** É o único custo variável real do EX1 e cresce com a base do cliente. Acima de ~800 conversas/mês o produto fura os 30% | `20` §3 |
| 5 | **O EX1 comporta 13,3h no mês 1** — sobram 7,3h para extração da base antes de a folha estourar o teto. Acima disso, taxa de implantação | `19` §9 |
| 6 | **A cláusula de dados no contrato é o item urgente, não o CRM.** Sem previsão de uso agregado e anonimizado, o dado acumulado não pode alimentar plataforma nem IA — e não há conserto retroativo | `20` §5 |
| 7 | **A tese de plataforma própria tem dois ativos com prazos diferentes:** benchmark de setor existe com n=14 lojas (mês 1); modelo treinável exige ~50 lojas | `20` §7 |

### Mapa de objeções do EX1
Catorze objeções em cinco grupos, com tratamento. Duas mudam a conversa:
`B1` (medo de bloqueio do número) é legítima e exige resposta honesta sobre a
forma do disparo; `E1` (*"não tenho tempo de responder"*) **não é objeção — é a
venda do EX2 acontecendo**.

### Escada de extração da base
Cinco cenários, do ERP ao "não existe registro nenhum". O Nível 4 (só WhatsApp
Business) é o mais provável e o caminho passa pela agenda do celular, não pelo
aplicativo — `A-030` exige testar na prática antes de virar promessa comercial.

### Decisões registradas
`A-030` a `A-033`. A `A-033` responde à pergunta direta do Nicolas: **construir CRM
próprio, não agora** — alugar ferramenta, ser dono do padrão de dados, com quatro
gatilhos objetivos para reavaliar.

### O que **não** mudou
Nenhum preço aprovado. `A-003` (WhatsApp oficial × não-oficial), aberta desde
17/07, passa de "importante" a **bloqueante**: o entregável 1.2 do EX1 não existe
sem essa decisão.

---

## Rodada 08/08/2026 (3) — A tese

**Entregue:** `21-TESE-DA-EXPANSION.md` e a versão visual
(https://claude.ai/code/artifact/3caa70e1-714e-45e3-9522-4a6e6f5ffe4d).

Síntese das três esferas do grupo — 360, estudo de mercado, produto e precificação
— respondendo à pergunta do CEO sobre transformar a operação em plataforma.

### Achados desta rodada

| # | Achado | Onde |
|---|---|---|
| 1 | **O portão da plataforma já existe e tem número.** O conselho de 13/07 proibiu software próprio por 6 meses e fixou o gatilho: **MRR de assessoria ≥ R$ 60–80 mil** com SOP 90 dias sem exceção. A precificação deixa de ser projeto paralelo e vira o portão | `21` §1 · `D-020` |
| 2 | **O espelho WebLuxury.** O mapa mental de 13/07 registra a Expansion como *"operadora substituível"* cujos ativos pertencem a outro. **"Esses dados têm que ser nossos" é o CEO recusando essa posição pela segunda vez** | `21` §3 |
| 3 | **A empresa opera a 21% do próprio indicador.** Receita por pessoa de R$ 2.500 contra o piso de R$ 12 mil fixado pelo conselho. O modelo novo chega a 98% **sem contratar mais gente** | `21` §4 |
| 4 | **Só o EX1 chega ao portão.** Com as 204h de capacidade atual: só EX3 teto em R$ 28.700; só EX2, R$ 35.700; **só EX1, R$ 61.200**. O EX1 gera R$ 300 de receita por hora contra R$ 141 do EX3 | `21` §5 |
| 5 | **O produto que paga a conta é o mesmo que produz o ativo.** O EX1 é o de maior receita/hora e o único que entrega base de consumidores e evento rotulado. Não é coincidência — é o motivo de a tese fechar | `21` §6 |
| 6 | **São quatro camadas, não um "CRM".** Canal e orquestração são alugados; base e inteligência são próprias desde o dia 1. **A base própria é dias de trabalho, não meses** | `21` §7 · `D-019` |
| 7 | **A vantagem é `n`, não código.** Quem tem 200 lojas no padrão ganha de quem tem software melhor com 20. Os gatilhos de escala coincidem com o portão do conselho | `21` §8 |

### O ponto de chegada dimensionado
28 clientes (15 EX1 + 8 EX2 + 5 EX3) · MRR R$ 82.500 · 445 h/mês · folha 22,95% ·
**lucro 38,5%** · 5 executores em tempo integral + 2 sócios · receita por pessoa
R$ 11.786 · **~56.000 consumidores finais no dataset**.

### Decisões registradas
`D-018` (canal oficial prioritário com reserva — fecha `A-003`, aberta desde 17/07),
`D-019` (a base é ativo da Expansion), `D-020` (o portão do conselho).
Novas em aberto: `A-034` (a ferramenta de R$ 297 é por conta ou por número?) e
`A-035` (PJs de meio período para tempo integral).

### Lembrete agendado
Cláusula de dados no contrato — `A-031` — agendada para 10/08/2026.

---

## Rodada 08/08/2026 (4) — O runbook

**Entregue:** `22-EX1-NA-PRATICA.md`, o template
`templates/BASE-CLIENTE-TEMPLATE-v1.xlsx` e a versão visual
(https://claude.ai/code/artifact/b322015e-73e6-4cda-b94a-1c817425add5).

Responde à pergunta operacional: **como se entrega o EX1 sem CRM, começando
segunda-feira.**

### Achados desta rodada

| # | Achado | Onde |
|---|---|---|
| 1 | **O EX1 fecha 39,4% de lucro operado 100% na mão no mês 1**, e 45,3% nos meses seguintes. A ferramenta é ganho de margem, **não condição de viabilidade**. Ponto de ruptura em 13,3 h | `22` §1 |
| 2 | **Nada no EX1 é tempo real, e nada precisa ser.** O cockpit em tempo real é ambição de gestão do `360`, não requisito do produto. Confundir os dois é o que faz parecer impossível | `22` §2 |
| 3 | **A pilha mínima tem três camadas e no mês 1 duas são de graça.** Planilha no padrão + WhatsApp Business do próprio cliente + a Débora. CRM não aparece em nenhuma delas | `22` §3 |
| 4 | **A automação vale 1,5 h por cliente/mês** — com 15 clientes, 22,5 h/mês devolvidas. Construir custa 4–6 h, uma vez, e serve para todos | `22` §7 |
| 5 | **`ALERTA-07` — o tempo do sócio no EX1 não está em nenhuma folha.** 11 h/mês só de reunião com 15 clientes. Terceiro custo invisível encontrado no mesmo padrão | `22` §6 · `A-036` |

### Entregue como artefato usável
`templates/BASE-CLIENTE-TEMPLATE-v1.xlsx` — cinco abas (`CONTATOS`, `AUDITORIA`,
`CAMPANHAS`, `EVENTOS`, `PLACAR`) com os cálculos prontos. A aba `AUDITORIA`
calcula sozinha a partir de `CONTATOS` e é a página que fecha a venda. **Materializa
o padrão de dados de `20` §4 — deixa de ser documento e vira ferramenta.**

### Decisões registradas
`A-036`. Nenhum preço mudou.

---

## Rodada 08/08/2026 (5) — A operação sem operador, e uma correção

**Entregue:** `23-OPERACAO-SEM-OPERADOR.md`, `sql/0001-modulo-base-consumidor.sql`
(proposta, não aplicada) e a versão visual
(https://claude.ai/code/artifact/a5f2f8d6-06df-4040-b0cb-953a91ee96a0).

### CORREÇÃO — o Expansion OS já existe e este acervo não sabia

Leitura de infraestrutura em 08/08 encontrou **`expansion-os-prod`** (29/07,
18 tabelas, RLS em todas, `evento` append-only com UPDATE barrado por gatilho,
`modulo` com roadmap declarado, `pulso` com 453 linhas de telemetria) e
**`os-expansion-staging`** (05/08).

| O que este acervo afirmou | Correção |
|---|---|
| *"Construir leva um trimestre"* | **Errado neste contexto.** Com o OS pronto é um módulo de **34–48 h** |
| *"Não construir CRM agora"* (`A-033`) | **Revisada, não revogada** (`D-021`). Segue proibido freela de dev, aplicação para o cliente e customização por cliente. Não vale para estender o OS |
| A escada de fases de `21` §9 | **Corrigida.** Nicolas estava certo: *"começar construindo, não construir pra começar"* |

### Achados desta rodada

| # | Achado | Onde |
|---|---|---|
| 1 | **São dois fluxos, não um.** Régua = todo dia 9h, para o **consumidor final**, pelo número da loja. Placar = toda segunda 8h, para o **lojista**, no grupo. Zero pessoas nos dois | `23` §2 |
| 2 | **O lojista não preenche nada, nunca.** Três níveis de atualização — integração de PDV, marcação na conversa, ou só o dado de campanha. Ele participa 20 min, uma vez na vida | `23` §3 |
| 3 | **A Débora sai da operação: fica com ~35 min/cliente/mês** (copy e arte). Nem um disparo. Pôr disparo manual nela era erro deste acervo | `23` §4 |
| 4 | **O efeito grande não é margem, é capacidade.** A 1,33 h/cliente as 204 h deixam de ser o limite. **O novo teto é a reunião mensal do sócio: ~40 clientes = R$ 72 mil de MRR**, acima do portão do conselho com o time de hoje | `23` §4 |
| 5 | **O módulo que falta não é o "CRM" do roadmap.** O CRM do OS é o funil comercial da Expansion; o EX1 precisa do consumidor final da loja. Chamado **BASE** (`D-022`) | `23` §1 |
| 6 | **Regra de automação (`D-023`):** só se automatiza o que já rodou na mão uma vez. Ordem régua → placar → campanha — **automatiza-se o que erra barato primeiro** | `23` §7 |

### DIVERGÊNCIAS DO COMITÊ
Seis cadeiras, três contra e três a favor de construir agora. Convergem em: banco
próprio + ferramenta alugada + zero código de aplicação · cláusula antes do dado ·
nada de customização por cliente. `D-023` resolve a divergência real.

### Decisões registradas
`D-021`, `D-022`, `D-023`. Novas em aberto: `A-037` (quem constrói — se for o CEO, é
a represa de novo) e `A-038` (aplicar no staging com a base da Ciés).

### O que **não** foi feito
**Nenhuma migração aplicada.** A leitura de `expansion-os-prod` foi somente consulta.

---

## Rodada 08/08/2026 (6) — Respostas diretas e o pós-entrega

**Entregue:** `24-RESPOSTAS-E-O-POS-ENTREGA.md` e a versão visual
(https://claude.ai/code/artifact/15543f52-4ef1-48d6-b33e-df5b7b65d0c9).

### `A-039` — a repreensão pedida, e é bloqueante

O desenvolvedor que constrói o Expansion OS está **em permuta, com "possível
sociedade" não escrita**. Sem cessão de propriedade intelectual assinada, a
Expansion **não é dona do ativo da tese**. É o espelho WebLuxury invertido — e a
regra *"cessão de IP ou nada"* **já está escrita por Nicolas**, aplicada ao sistema
do Cleber, no parecer de 13/07. Conserto: uma página e uma conversa.

### Onde Nicolas estava certo

O conselho avaliou "software próprio" **num contexto que não existe mais** — sem OS,
sem dev parceiro, sem a aceleração de nuvem com IA. A proibição mirava CAPEX às
cegas, não uma extensão de 34–48 h num sistema que já roda. **`D-024` responde
`A-037`: quem constrói é o dev parceiro** — nem o CEO (represa) nem freela a peso de
caixa (CAPEX) — **condicionada a `A-039`**.

### Achados desta rodada

| # | Achado | Onde |
|---|---|---|
| 1 | **A auditoria da base substitui o diagnóstico no funil.** Mesma call, mesma pessoa, mesmo tempo — e sai número em vez de pergunta genérica. **Custo incremental do sócio: zero** (`D-025`) | `24` §6.1 |
| 2 | **O que sobra para o Nicolas no regime:** a call de venda que ele já faz + 45 min/mês por cliente **até o décimo**. Depois, zero recorrente | `24` §6.3 |
| 3 | **A reunião mensal é o que retém — não automatizar.** Mas o dono muda no 10º cliente (`A-040`): até 10 é o Nicolas, do 11º é Débora ou CS. **Aos 15 vira 11h/mês e o CEO virou executor de novo** | `24` §6.2 |
| 4 | **"Por conta × por número" são 15× de diferença.** Por conta: R$ 19,80/cliente e 46,1% de lucro. Por número: R$ 297/cliente e **30,7%** | `24` §3 |
| 5 | **Os 12 controles de dados** para o advogado, em três blocos. O bloco B (uso agregado + titularidade do derivado) é o que faz o projeto valer alguma coisa em 18 meses | `24` §5 |
| 6 | **Ciés e Clau Kids não são o mesmo teste** (`A-041`). A Ciés é o piloto (única com campanha medida); a Clau Kids está **abaixo do ICP** e testa a máquina, não o preço. **Nenhuma reprecificada durante o piloto** | `24` §7 |

### Também explicado sem jargão
PDV, ERP e loja virtual · como o disparo funciona passo a passo (quem manda, o que
faz sair, o ritmo de 50–100/h, o que acontece na resposta) · o que exatamente são as
34–48 horas.

### Decisões registradas
`D-024`, `D-025`. Novas em aberto: `A-039` (**bloqueante**), `A-040`, `A-041`.

---

## Rodada 10/08/2026 — A mesa de segunda

**Entregue:** `25-APRESENTACAO-KAUA-10-08.md` e a versão visual
(https://claude.ai/code/artifact/f684353c-a494-48f4-829e-1478bcad3582).

Consolidação de tudo que foi construído entre 05 e 08/08, no formato de apresentação
para o CFO/Diretor Comercial.

### O que a apresentação fixa

| # | Ponto | Onde |
|---|---|---|
| 1 | **O nicho é moda feminina E infantil** — 43% + infantil menina = 53% da produção de vestuário, e infantil/bebê cresceu +44,9% em 2021–2025. **É a mesma compradora**: um nicho, duas prateleiras | `25` §1 |
| 2 | **O mercado não é a restrição: são 28 clientes.** E vender 10 EX1 dobra o faturamento consumindo 29% da capacidade existente — sem contratar ninguém | `25` §2 |
| 3 | **O lucro está no produto mais barato.** R$ 300/hora do EX1 contra R$ 141 do EX3. **Inverte a lógica de agência** — não se vende o EX1 para "subir" o cliente depois | `25` §4 |
| 4 | **EX1 destrinchado no detalhe técnico** — os cortes da auditoria, os 4 gatilhos da régua com a condição de data, o ritmo de disparo e as 7 métricas do placar | `25` §5 |
| 5 | **Os cinco pendentes do 360 ditos abertamente** — grupo fora do preço, horas não cronometradas, EX2 sem operador, preços antes de imposto, grade sem dono | `25` §8 |
| 6 | **Cinco perguntas de volta para o Kauã** — preço, volume, motion, carteira e qual pendência trava a venda | `25` §9 |

### Nenhum número novo
Toda a aritmética vem de `16`, `18`, `19` e `21`. Esta rodada **organiza, não
recalcula.** Nenhum preço foi aprovado.

---

## Rodada 10/08/2026 (2) — CORREÇÃO da margem da lojista

**Entregue:** `26-A-MARGEM-DA-LOJISTA.md` e a versão visual
(https://claude.ai/code/artifact/2ef02fde-1b1a-41a5-b625-5adc6f812f1e).

### A correção

Este acervo vinha usando **35%** de margem de contribuição para a lojista. Refazendo
a cascata com todas as linhas, o número correto é **32,4%** — **faltava o imposto
sobre a venda** (~7%, Simples Anexo I).

```
Venda                       100,0%
(-) Custo da mercadoria     -54,6%   IBGE/PAC
= Margem bruta               45,4%
(-) Imposto sobre a venda    -7,0%   <- a linha que faltava
(-) Meios de pagamento       -3,5%
(-) Comissao de venda        -2,0%
(-) Embalagem                -0,5%
= MARGEM DE CONTRIBUICAO     32,4%
```

| | Antes | Correto |
|---|---|---|
| Venda nova para pagar o EX1 | R$ 5.143 | **R$ 5.556** |
| EX2 · EX3 · os três | R$ 10.000 · R$ 15.714 · R$ 30.857 | **R$ 10.802 · R$ 16.975 · R$ 33.333** |
| Caso Ciés — cobertura da mensalidade | 97% | **90%** |
| Regra `R$ 1 de fee → ? de venda` | R$ 2,86 | **R$ 3,09** |

**Nenhum preço da Expansion muda.** O que muda é a meta prometida ao cliente, que
ficou 8% mais exigente. **E a regra dos R$ 3 deixa de ser arredondamento e vira
exata.** `D-013` fica **REVISADA** por `D-026`.

### Achados novos da mesma rodada

| # | Achado | Onde |
|---|---|---|
| 1 | **O markup declarado não é o realizado.** Lojista fala em 2,5×; depois da liquidação o realizado fica em ~1,83×. Os 54,6% do IBGE já são o custo realizado | `26` §3 |
| 2 | **A MC varia de 24,5% a 41,0%** conforme a loja — e a meta do EX1 varia de R$ 7.347 a R$ 4.390. **Vira ferramenta de qualificação** (`D-027`): duas perguntas na call calibram a meta | `26` §4 |
| 3 | **A venda nova é mais lucrativa que a venda média** — ela não carrega custo fixo. Numa loja de R$ 60 mil, o EX1 sobe o lucro de R$ 3.840 para R$ 4.744: **+23,5% sem abrir mais cedo nem contratar ninguém.** É o argumento mais forte do EX1 e não estava escrito | `26` §6 |
| 4 | **Existem dois "R$ 5.000" e eles são coisas diferentes** — o fato observado (Ciés) e a meta calculada (R$ 5.556). Misturados na mesa, derrubam a credibilidade da conta inteira | `26` §7 |

### Propagação
Números corrigidos em `16`, `17`, `18`, `19`, `22`, `25` e na apresentação publicada.
`15` e `17` receberam banner de supersessão — a derivação antiga fica registrada,
porque o histórico é o valor.

### Decisões
`D-026`, `D-027`. `D-013` revisada.

---

## Rodada 10/08/2026 (2) — CORREÇÃO da margem da lojista

**Entregue:** `26-A-MARGEM-DA-LOJISTA.md` e a versão visual
(https://claude.ai/code/artifact/2ef02fde-1b1a-41a5-b625-5adc6f812f1e).

### A correção

Este acervo vinha usando **35%** de margem de contribuição para a lojista. Refazendo
a cascata com todas as linhas, o número correto é **32,4%** — **faltava o imposto
sobre a venda** (~7%, Simples Anexo I).

```
Venda                       100,0%
(-) Custo da mercadoria     -54,6%   IBGE/PAC
= Margem bruta               45,4%
(-) Imposto sobre a venda    -7,0%   <- a linha que faltava
(-) Meios de pagamento       -3,5%
(-) Comissao de venda        -2,0%
(-) Embalagem                -0,5%
= MARGEM DE CONTRIBUICAO     32,4%
```

| | Antes | Correto |
|---|---|---|
| Venda nova para pagar o EX1 | R$ 5.143 | **R$ 5.556** |
| EX2 · EX3 · os três | R$ 10.000 · R$ 15.714 · R$ 30.857 | **R$ 10.802 · R$ 16.975 · R$ 33.333** |
| Caso Ciés — cobertura da mensalidade | 97% | **90%** |
| Regra `R$ 1 de fee → ? de venda` | R$ 2,86 | **R$ 3,09** |

**Nenhum preço da Expansion muda.** O que muda é a meta prometida ao cliente, que
ficou 8% mais exigente. **E a regra dos R$ 3 deixa de ser arredondamento e vira
exata.** `D-013` fica **REVISADA** por `D-026`.

### Achados novos da mesma rodada

| # | Achado | Onde |
|---|---|---|
| 1 | **O markup declarado não é o realizado.** Lojista fala em 2,5×; depois da liquidação o realizado fica em ~1,83×. Os 54,6% do IBGE já são o custo realizado | `26` §3 |
| 2 | **A MC varia de 24,5% a 41,0%** conforme a loja — e a meta do EX1 varia de R$ 7.347 a R$ 4.390. **Vira ferramenta de qualificação** (`D-027`) | `26` §4 |
| 3 | **A venda nova é mais lucrativa que a venda média** — não carrega custo fixo. Numa loja de R$ 60 mil o EX1 sobe o lucro de R$ 3.840 para R$ 4.744: **+23,5% sem abrir mais cedo nem contratar ninguém.** É o argumento mais forte do EX1 e não estava escrito | `26` §6 |
| 4 | **Existem dois "R$ 5.000" e são coisas diferentes** — o fato observado (Ciés) e a meta calculada (R$ 5.556) | `26` §7 |

### Propagação
Números corrigidos em `16`, `17`, `18`, `19`, `22`, `25` e na apresentação publicada.
`15` e `17` receberam banner de supersessão — a derivação antiga fica registrada.

### Decisões
`D-026`, `D-027`. `D-013` revisada.

---

## Rodada 10/08/2026 (3) — As decisões da mesa

**Entregue:** `27-DECISOES-DA-MESA-10-08.md` e a versão visual
(https://claude.ai/code/artifact/c8f25651-b84c-468d-943c-2abc2e33e0f3).

As cinco perguntas de `25` §9 foram respondidas pela direção. Quatro respostas
viraram número; **duas viraram divergência registrada.**

### O que a mesa decidiu

| # | Decisão da mesa | O que a análise fez com ela |
|---|---|---|
| 1 | **"R$ 1.800 está barato"** | **Confirmado pelo dado** — a R$ 70 mil de faturamento a loja cresce só 7,9%. Vira `D-028`: **escada de preço por faixa** (R$ 1.800 / R$ 2.400 / R$ 2.900), lucro sobe para 50,8% e 52,6% |
| 2 | **Antecipação no EX1 por causa do caixa** | Diagnóstico aceito, remédio ajustado. `D-029`: **taxa de implantação de R$ 900 + trimestral antecipado SEM desconto** = **R$ 6.300 de caixa por cliente novo**. Antecipar com desconto repetiria o Albanos (295% a.a.) |
| 3 | **Script BANT confirmado** | `D-030`: **BANT-DA** — acrescenta **D** de dado e **A** de atendimento. Sem o D o SDR agenda reunião onde a auditoria não pode ser feita; sem o 2º A vende-se campanha para quem não responde |
| 4 | **Albanos mantém R$ 24 mil trimestral** | Sem objeção. Ressalvas de `13` §8 seguem para a próxima renovação |

### As duas divergências registradas

| | A mesa | A análise |
|---|---|---|
| **Dr. Fred** (`D-032`) | Subir de R$ 1.750 para R$ 2.500–3.000 | **Concordo em reajustar, discordo da alavanca.** O escopo de 2 vídeos/dia é ~80 h/mês — **piso de R$ 10.833**. A R$ 3.000 o prejuízo continua. **Preço E escopo juntos:** R$ 3.000 por 12 vídeos + 1 diária |
| **Ciés** (`D-031`) | Reajustar por causa do caixa | **Não reajustar — vender o EX1 por cima.** Ela é o case, é o piloto do módulo BASE e é o melhor pagador da casa. Reajuste de 30% daria +R$ 500/mês; **o EX1 dá +R$ 1.800/mês** e R$ 5.400 de caixa no ato |

### O efeito no caixa
**MRR de R$ 17.500 para R$ 20.550 — +17,4% mexendo em dois clientes, sem vender nada
novo.** Mais R$ 5.400 de caixa imediato se a Ciés fechar trimestral antecipado.

### Correção de dado — `D-033`
**A Ciés pagou R$ 5.000 pelo trimestre, não R$ 4.000.** Receita mensal de competência
sobe de R$ 1.333,33 para R$ 1.666,67. `clientes-e-contratos.csv` corrigido.

### Decisões
`D-028` a `D-033`. Novas em aberto: `A-042` (escada de preço), `A-043` (taxa de
implantação), `A-044` (volume de EX1 em 30 dias — pergunta 02, ainda sem resposta).

---

## Rodada 10/08/2026 (4) — RETRATAÇÃO e o 360

### ❌ RETRATAÇÃO — o caso Ciés não aconteceu

**Nicolas confirmou em 10/08 que a Ciés NÃO vendeu R$ 5.000 em menos de um dia.**
A afirmação foi retirada de **7 documentos** (`18`, `19`, `24`, `25`, `26`, `27`,
`DECISION-LOG`) e de **4 páginas publicadas** (apresentação, entregáveis, margem,
decisões da mesa — todas republicadas nas mesmas URLs).

| | |
|---|---|
| `D-017` | ❌ **REVOGADA** por `D-034`. **O EX1 volta a `hipótese de produto`** |
| `D-034` | O EX1 **não tem case próprio**. O Kauã **não pode** dizer *"foi assim com a Ciés"* |
| `D-035` | **Regra de governança nova** — ver abaixo |
| `A-045` | **Medir o que a Ciés de fato vende** a partir do contato semanal. Hoje `NÃO INFORMADO` |

**O que é verdade e pode ser dito:** a Ciés faz vendas a partir do contato semanal
que a Expansion gera, sem exigir encontro presencial. **Volume `NÃO INFORMADO`.**

**O que substitui o case na venda:** o mecanismo segue sustentado por dado de setor
(77% de base dormente · 8% de resposta · 32% de conversão), e `D-015` já resolvia a
ausência de prova — **a primeira campanha é por conta da casa**, R$ 255 de custo
direto contra um contrato de R$ 21.600.

### `D-035` — a falha de processo, registrada

O caso foi propagado para sete documentos e quatro páginas publicadas **sem nunca ter
sido verificado**. A regra da casa — *"todo número tem fonte, status e responsável"* —
foi cumprida na letra e furada no espírito: a fonte estava registrada, mas o status
foi tratado como `CONFIRMADO` quando era relato verbal.

> **Regra nova: fato relatado verbalmente entra como `A VERIFICAR`, nunca como
> `CONFIRMADO`.** Só vira fato com evidência — print, extrato, relatório da
> ferramenta. **Nenhum dado de operação própria entra em documento de venda sem prova
> anexada.**

### Entregue: `28-EXPANSION-360.md`
https://claude.ai/code/artifact/ba967714-2c9a-44fb-843b-98de796930eb

Consolidação de tudo entre 05 e 10/08 em nove seções: onde a empresa está · o nicho ·
os três produtos · a conta do cliente · o caminho até o portão · como se entrega · a
carteira cliente a cliente · **a coluna fato × hipótese × retratado** · e as nove
decisões abertas por prioridade.

---

## Rodada 10/08/2026 (5) — O catálogo

**Entregue:** `29-CATALOGO-DE-PRODUTOS.md` e a versão visual
(https://claude.ai/code/artifact/0f30655c-406b-4533-9f5f-e4f5994ac2ca).

Uma ficha por produto, em linguagem de ouvir: para quem é, qual dor resolve, o que se
entrega, e quanto sobra para a Expansion.

### Um ajuste na faixa do EX1 — `D-036`

Nicolas descreveu o EX1 como sendo para loja de **R$ 30 a 40 mil**. **A R$ 1.800 essa
loja precisaria crescer 18,5% num mês** — número que quase nenhuma loja entrega.

**Criado o EX1 LEVE:** R$ 1.200 · loja de R$ 30–40 mil · campanha a cada 2 meses ·
placar mensal · **sem reunião mensal** · 2,25 h/mês · **53,4% de lucro** e
**R$ 533/hora — a maior receita por hora da casa.**

> ⚠️ **E é exatamente por isso que ele preocupa.** A margem é a maior porque o LEVE
> **tirou a reunião mensal — o entregável que retém.** É porta de entrada com upgrade
> planejado, **não produto de carteira.** Vira `A-046`.

### As doze campanhas do ano — `D-037`

O EX1 passa a ser vendido como **calendário comercial de 12 campanhas**, não como
"uma campanha por mês". Cinco datas fortes concentram a oportunidade — Mães,
Crianças, Black Friday, Natal e Dia da Mulher; nos outros meses a campanha ataca a
base dormente, que não depende de data.

**É o argumento do contrato de 12 meses** (`D-009`), e é conteúdo estratégico que a
lojista não tem: *"a gente não vende post — a gente monta o seu calendário comercial
do ano e executa mês a mês na base que você já tem."*

### A conversa sobre o EX1, em números

| | EX1 | EX2 | EX3 |
|---|---|---|---|
| Receita por hora | **R$ 300** | R$ 175 | R$ 141 |
| Clientes que cabem nas 204 h | **34** | 10 | 5 |
| MRR dessa carteira | **R$ 61.200** | R$ 35.700 | R$ 28.700 |

**O EX1 é o único produto que sozinho leva a empresa ao portão do conselho com o time
que já existe.**

### Decisões
`D-036`, `D-037`. Nova em aberto: `A-046`.

---

## Rodada 11/08/2026 — Duração de contrato e a revisão do estudo de mercado

**Entregue:** `30-ESTUDO-REVISADO-DURACAO-E-PRODUTOS.md` e a versão visual
(https://claude.ai/code/artifact/a2541419-dfa2-487c-9496-83c36492fe49).

Pergunta do Nicolas: **qual é a duração de cada produto** — e uma dúvida sobre o EX2 e
o EX3, porque construir uma IA de atendimento "vai levar muito tempo" e a casa é boa é
em **conteúdo e carrossel**.

### 🚨 RETRATAÇÃO Nº 2 — os benchmarks de duração e churn caíram

A revisão do estudo de mercado passou por **verificação adversarial**. A frente
inteira de churn e duração de contrato foi **refutada ou declarada não verificável**:

| Número que estava no acervo | Onde estava | Veredito |
|---|---|---|
| Duração média de 56 / 36 / 30 / 24 meses | `13`, `14` | ❌ **Refutado** |
| Churn de 18% / 42% | `13`, `19` | ❌ **Refutado** |
| **43% do churn nos primeiros 90 dias** | `14`, `19` | ❌ **Refutado** |
| 25% de churn em agências pequenas | `13` | ❌ **Refutado** |
| Retenção de 92% × 78% | `13` | ❌ **Refutado** |

**Por quê:** a cadeia de fontes termina em material de venda de fornecedor, sem amostra
declarada, com datas de campo contraditórias, contradição aritmética interna e citação
circular. Banners de retratação em `13` e `14`; linhas riscadas; `A-012` reancorada.

> **`D-009` (eliminar contrato de 3 meses) continua correta** — mas agora ancorada em
> **ciclo de prova e esforço comercial**, que são internos e verificáveis, não em
> benchmark de mercado que não existe.

### A duração — `D-038`

| Produto | Contrato | Por quê |
|---|---|---|
| **EX1** (todas as faixas) | **6 meses** | Precisa de **2 campanhas** para provar (≈90 dias). 6 meses dá margem de erro |
| **EX2 · CONTEÚDO** | **6 meses** | Mesmo ciclo de prova |
| **EX3 · MARCA** | **12 meses** | Muda posicionamento de marca — não se mede em trimestre |

**A aritmética comercial que decide:** para manter 15 clientes, contrato de 3 meses
exige **60 vendas/ano**; de 6 meses, **30**; de 12 meses, **15**. Contrato curto não é
flexibilidade — é uma máquina de vender para repor.

### O veredito sobre a IA — `D-039`

**O Nicolas está errado no motivo e certo na conclusão.**

Errado no prazo: o Meta Business Agent é **nativo no app (~5 min)**; um agente em n8n,
30 minutos; no-code com API oficial, 1 a 7 dias. **Construir não é o gargalo.**

Certo em congelar, por três motivos melhores:

1. **Comoditização** — Take Blip × Claro Empresas, anunciado em **10/08/2026** (ontem),
   a **R$ 179,90–399,90/mês**. Vender IA de atendimento a R$ 3.500 contra isso exige um
   diferencial que a Expansion ainda não tem.
2. **A demanda não existe** — ~**3%** das conversas de varejo conversacional no Brasil
   são resolvidas fim a fim por IA, contra **41%** das MPEs que já têm chatbot.
3. **Risco de plataforma datado** — a Meta passa a cobrar mensagem de serviço em
   **01/10/2026**, com preço Brasil não publicado e fontes divergindo em 4×.

**No lugar: EX2 · CONTEÚDO — R$ 3.200 · 14,25 h/mês · 42,5% de lucro · R$ 225/hora.**
Margem melhor e horas menores que o EX2 · IA (37,1% e 20 h), no que a casa já faz.

### ⚠️ `ALERTA-08` — o custo da Meta pode zerar o EX1 — `D-040`

| Disparo para 2.000 contatos | Custo Meta | % do fee de R$ 1.800 | Lucro do EX1 |
|---|---|---|---|
| Tudo como **marketing** | R$ 620–760 | **35–42%** | **8,9%** ❌ |
| **600 marketing + 400 utilidade** | R$ 221 | 12,3% | **34,9%** ✅ |

A diferença entre as categorias é de **~87%** (R$ 0,31–0,38 contra R$ 0,034–0,05).
**A arbitragem de categoria é a alavanca de margem do EX1** — desenho de produto, não
detalhe operacional. Vira franquia de **600 disparos de marketing/mês**, excedente
repassado. Substitui a franquia de 500 conversas de `A-032`.

### O teto do EX3 sem captação presencial — `A-048`

**55% dos profissionais de social media no Brasil cobram até R$ 1.500/mês e só 8%
passam de R$ 4.000** (mLabs, 4.000+ respondentes). O EX3 a R$ 5.500 está **acima do
percentil 92** — e o que autoriza essa faixa é exatamente a **captação presencial**.
Tirando a captação, o teto realista é **R$ 2.500–3.500**.

### O que o EX1 ganhou

O melhor argumento de venda do acervo — brasileiro e do nicho exato:
**77% dos registros do varejo de moda estão inativos há 12+ meses**; a média de
compradores ativos é **22,6%** e mesmo o top 10 chega só a **35,1%** (Dito CRM,
~20 milhões de consumidores, 50 marcas). Ticket médio de **R$ 190** (IEMI).

E a brecha: **só 14% das agências brasileiras citam ROI como diferencial** e **51%
admitem limitação para entregar resultados concretos.**

### Decisões
`D-038`, `D-039`, `D-040`. Novas em aberto: `A-047` (a loja pode não ter base
cadastrada nenhuma) e `A-048` (teto do EX3 sem captação). `A-012` reancorada.

---

## Rodada 11/08/2026 (2) — A folha de estudo

**Entregue:** `31-OS-TRES-PRODUTOS-PARA-ESTUDAR.md` e a versão visual
(https://claude.ai/code/artifact/6b53bdb8-196e-4332-bae8-38edaa2ae2e9).

Pedido do Nicolas: *"organiza os 3 produtos e entregáveis que vou estudar com o Kauã"*.

**Consolida em uma peça só** o que estava espalhado por cinco documentos: `16` (os
pacotes), `18` (o manual de entrega), `19` (o playbook comercial), `29` (o catálogo) e
`30` (a revisão de mercado). Os cinco continuam válidos como memória de cálculo.

### Por que a consolidação era necessária agora

O cardápio tinha **desalinhado entre os documentos** depois da rodada de 11/08:

| Onde | Dizia | Deveria dizer |
|---|---|---|
| `16`, `18`, `29` | EX2 = IA de atendimento, R$ 3.500, 20 h | **EX2 · CONTEÚDO, R$ 3.200, 14,25 h** (`D-039`) |
| `16`, `18` | "os três" = R$ 10.800 · 65 h · 35,8% | **R$ 10.500 · 59,25 h · 37,4%** |
| `16` | contrato "6 ou 12 meses" | **6 · 6 · 12 por produto** (`D-038`) |

**O 360 novo ficou melhor que o antigo:** menos R$ 300 de preço, menos 6 horas de
trabalho e **1,6 ponto a mais de lucro**.

### O que a folha traz que não existia em lugar nenhum

1. **Uma anatomia idêntica nos três produtos** — *a dor → para quem → o que entrega →
   o que NÃO entrega → a conta* — para dar para estudar em paralelo, coluna por coluna.
2. **A seção "o que NÃO entrega" em todos os três.** Antes ela existia só no `16` e em
   formato de nota de rodapé. **É ela que protege a margem.**
3. **O escopo do EX2 · CONTEÚDO destrinchado pela primeira vez** — os 4 entregáveis com
   memória de horas: roteiros 2h · direção remota 1h · edição 4h · carrosséis 2,5h ·
   publicação 2,75h · tráfego 2h = **14,25 h**. Status `ESTIMADO`, como todo o resto.
4. **O argumento da diária do EX3, invertido:** ela não é custo, **é o que autoriza o
   preço.** Com 55% do mercado brasileiro cobrando até R$ 1.500 e só 8% passando de
   R$ 4.000, o EX3 a R$ 5.500 está acima do percentil 92 — e é a presença na loja que
   sustenta essa posição. *Ou tem gravação e vale R$ 5.500, ou não tem e vale R$ 3.200.*
5. **A folha de cola de 11 linhas**, para o Kauã levar no bolso.

### O que a folha diz que o Kauã ainda não pode dizer

A retratação da Ciés entrou na peça comercial, não só no acervo técnico: **a Expansion
não tem case próprio do EX1 com número.** A oferta da primeira campanha por conta da
casa é apresentada pelo que ela é — **o substituto honesto do case que ainda não
existe**, não generosidade.

### Decisões
Nenhuma nova. A folha consolida `D-036` a `D-040` e expõe as nove pendências
(`A-006`, `A-027`, `A-029`, `A-042`, `A-043`, `A-046`, `A-047`, `A-048`, `D-039`).
