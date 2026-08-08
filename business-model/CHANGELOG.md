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
| 1 | **Ciés reativou a base e vendeu +R$ 5.000 em menos de um dia** | EX1 sai de hipótese para produto validado (`D-017`). Uma campanha cobre 97% da mensalidade pelo lucro de contribuição da lojista |
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
