# DATA-REQUEST — o que falta, de quem, e o que destrava

| | |
|---|---|
| **Versão** | 1.0 |
| **Data** | 2026-08-05 |
| **Status** | Rodada 1 aberta — aguardando direção |

Regra: **pergunto uma vez.** A resposta é registrada e não volto a perguntar sem apresentar a inconsistência encontrada.

---

## RODADA 1 — as 9 perguntas que travam tudo

Ordenadas por **impacto × urgência**, não por facilidade.

### 🔴 R1.1 — O parecer do conselho de **13/07/2026** foi lido? O que aconteceu com ele?

**Por que bloqueia:** o conselho decidiu, há 23 dias, **piso de R$ 5–6 mil por cliente novo**, **proibiu fechar abaixo de R$ 5 mil** por 6 meses e mandou **medir horas por cliente na Semana 1**. Nada disso foi feito, e a carteira inteira está entre 26,7% e 60% desse piso (`01` §4.5).

Este projeto pode estar reabrindo uma decisão já tomada. **Antes de refazer a análise, preciso saber por que a anterior não pegou** — senão a nova terá o mesmo destino, e a governança do GATE 9 será construída sobre um mecanismo que já falhou uma vez sem deixar registro.

**Preciso de:** ( ) não foi lido · ( ) lido e rejeitado — por quê? · ( ) aceito e não executado — o que travou? · ( ) parcialmente executado — o quê?
**E:** algum contrato foi fechado **depois de 13/07** abaixo de R$ 5 mil? (A Prime, "2 meses com agosto sendo o segundo", parece ter começado em julho.)

**Destrava:** o enquadramento de todo o projeto e o desenho da governança do GATE 9.

---

### 🔴 R1.2 — A proposta Trinca de R$ 12.000 é em **10/08**. Ela já foi enviada ao cliente?

**Por que bloqueia:** é a maior decisão econômica dos próximos 5 dias e não tem custo calculado. Se ainda não foi enviada, dá tempo de custear. Se já foi, a decisão passa a ser sobre honrar ou renegociar.

**Preciso de:** ( ) ainda não enviada · ( ) enviada, não respondida · ( ) fechada
**E:** quanto se paga por diária a cada um dos 8 profissionais? Quantos são da casa e quantos são freelancers?

**Destrava:** `ALERTA-03`, e o primeiro produto custeado da empresa (evento).

---

### 🔴 R1.3 — Quais contratos estão **vivos hoje**, 05/08/2026?

**Por que bloqueia:** todos os cinco contratos com vigência informada vencem em agosto ou já venceram. A data de corte dos dados é 30/07 e a carteira inteira está em janela de renovação **agora**. Todo o resto do projeto pressupõe saber sobre o que estamos falando.

| Cliente | Vigência informada | Vivo hoje? | Data real de término | Renovação em negociação? |
|---|---|---|---|---|
| Prime Assessoria | 2 meses, ago = 2º | | | |
| Dr. Fred | 1 mês | | | |
| Ciés Brand | ago = último | | | |
| Jane JQL Seguros | 1 mês | | | |
| Ecossistema Albanos | 3 meses | | **← data de início?** | |
| Reino Consórcios | `NÃO INFORMADO` | | | |
| **Clau Kids** | **ausente de toda tabela** | | | |

**Destrava:** GATE 1 inteiro, `ALERTA-04` e o `09-PLANO-DE-TRANSICAO`.

---

### 🔴 R1.4 — **Clau Kids paga?** Quanto, por qual escopo, desde quando?

**Por que bloqueia:** aparece como cliente ativo em três fontes (`EXPANSION-360`, `OPERACAO-REAL`, `AUDITORIA-DRIVE` — pasta `007 - CLAUKIDS`), tem tráfego rodando e bloqueio da Meta registrado em 21/07 — e **não aparece em nenhuma tabela de receita**. Ou é receita não contabilizada, ou é entrega não faturada. As duas hipóteses são graves e mudam o diagnóstico da carteira.

Mesma pergunta para o **Fórum TEIA**: é um dos 4 perfis do contrato Albanos ou é contrato próprio?

**Destrava:** a receita recorrente real, hoje subestimada por valor desconhecido.

---

### 🔴 R1.5 — "2 vídeos por dia" do Dr. Fred: **dia útil ou dia corrido?**

**Por que bloqueia:** a diferença é de **18,88 vídeos/mês**, ou **R$ 944/mês** de custo de edição, num contrato de R$ 1.750/mês. É a lacuna com maior impacto financeiro por palavra de todo o acervo. E define se a MC do contrato é −20,0% ou −73,9%.

**Preciso de:** ( ) dia útil · ( ) dia corrido · ( ) na prática é outro número — qual?
**E:** o contrato ainda está vigente?

**Destrava:** `ALERTA-01` e a ocupação real do gargalo.

---

### 🟠 R1.6 — Qual é o **mix de publicações** de Ciés, Jane e Albanos?

**Por que bloqueia:** são 78 publicações/mês cujo tipo é desconhecido. O mix decide **se a Expansion tem um gargalo ou dois**: o designer só cabe na capacidade declarada se ≥73,5% das publicações forem vídeo (`03` §4.2).

| Cliente | Publicações/mês | Reels/vídeo | Carrossel | Estático |
|---|---:|---|---|---|
| Ciés Brand | 13 | | | |
| Jane JQL Seguros | 13 | | | |
| Albanos (4 perfis) | 52 | | | |

**E:** um carrossel de 8 lâminas conta como 1 arte ou 8 artes para o designer?

**Destrava:** o cálculo de gargalo e o custo por entregável.

---

### 🟠 R1.7 — Qual a **capacidade contratada** de Bernardo, Daniel e Débora?

**Por que bloqueia:** **77,01% da folha não tem denominador.** Sem isso, nenhum custo por entregável existe, e portanto nenhum piso de preço existe.

| Pessoa | Custo/mês | O que o valor compra |
|---|---:|---|
| Bernardo (editor) | R$ 500 | ____ vídeos/mês |
| Daniel (filmmaker+editor) | R$ 2.500 | ____ diárias de captação + ____ vídeos/mês |
| Débora (social media) | R$ 1.700 | ____ perfis · ____ publicações/mês · roteiros? |
| Matheus (tráfego) | R$ 2.500 | ____ contas · relatório semanal incluso? |

> Se a resposta for *"não tem número, é por demanda"* — **isso já é a resposta**, e significa que a empresa comprou disponibilidade, não capacidade. Precisa estar registrado como tal.

**Destrava:** `03-CUSTOS-E-CAPACIDADE` sai de `PROVISÓRIO`; GATE 3 abre.

---

### 🟠 R1.8 — Quanto custam as **ferramentas e a estrutura**, por mês?

**Por que bloqueia:** 16 ferramentas identificadas, **zero valores**. Nota de confiança da dimensão: **0/10**.

Organify · CRM (WeSales ou Kommo — **qual?**) · Captions · CapCut Pro · ChatGPT/Claude · Canva · Hostinger · ManyChat · TurboScribe · ClickUp e Lovable (ainda cobrando?) · Google Workspace (ainda não contratado) · **escritório** · **deslocamento/gravação** · **equipamento**.

**Destrava:** custo completo do cliente e ponto de equilíbrio.

---

### 🟠 R1.9 — Os **R$ 250 mil** e os **R$ 60 mil/mês** incluíam **verba de anúncio dos clientes**?

**Por que bloqueia:** é a única leitura que reconcilia *"R$ 250 mil em 3 meses"* com *"temos 84 reais na conta"* sem que ninguém tenha mentido. Verba de mídia é **repasse**, não receita. Ver `01` §4.1.

**Preciso de:** ( ) sim, verba entrava na conta e era repassada · ( ) não, era o cliente que pagava direto à Meta · ( ) misto — quais clientes?
**E:** os R$ 250 mil eram **contratos assinados** ou **dinheiro recebido**?
**E:** os R$ 60 mil eram de **um mês** ou de um período maior?

**Destrava:** o GATE 1 inteiro — sem isso não existe baseline.

---

## RODADA 2 — já mapeada, **não perguntar ainda**

Registrada aqui para não se perder e para não sobrecarregar a direção agora.

**Financeiro:** extrato dos últimos 6 meses (os dois CPFs); inadimplência; regime tributário pretendido e **validação do Fator R com o contador** (`01` §5); passivo do estouro do teto do MEI.

**Operacional:** cronometragem de 5 vídeos, 5 artes, 1 lote de roteiros, 1 gravação; **medição de 2 semanas do tempo dos sócios** (item de maior prioridade do GATE 1); taxa de retrabalho; custo real do OTI PRO nota por nota.

**Comercial:** contratos assinados; política atual de desconto; quem aprova o quê; onboardings de Ciés e Clau Kids (prometidos em `EXPANSION-360` §14).

**Decisões da direção:** vender ou não o produto de CRM/atendimento (enquete de 13/07 nunca decidida); WhatsApp oficial × não-oficial (custo por conversa); manter clientes fora do nicho de moda como caixa de transição ou não.

---

## RODADA 2 — respondida em 05/08/2026

| Pergunta | Resposta |
|---|---|
| G1 — Ciés teve desconto/taxa? | **Não.** Pagou à vista, dinheiro cheio. O problema de antecipação é exclusivo do Albanos |
| G2 — Migrar para contrato anual? | **Sim.** Albanos é o caminho mais curto — renovação em montagem, lançamento na mesa, alta receptividade |
| G5 — Acesso aos números de venda? | **Sim**, de Clau Kids e Ciés |
| G3 — Piloto na Ciés? | não respondida diretamente |
| **G4 — Quem opera o WhatsApp?** | **NÃO RESPONDIDA — é a que decide se o produto existe** |

## Registro de respostas

| Pergunta | Respondida em | Resposta | Documento atualizado |
|---|---|---|---|
| R1.1 — parecer do conselho de 13/07 | 2026-08-05 | **Não lembra.** Estava em imersão; assume as rédeas agora. Não foi rejeitado — **nunca chegou a virar decisão consciente** | `01` §4.5, `10`, `DECISION-LOG` D-000 |
| R1.2 — proposta Trinca | 2026-08-05 | **Não aprovada.** Cliente pediu orçamento menor; **em negociação agora**; evento em 10/08 | `06` §Piso de evento |
| R1.3 — contratos vivos hoje | 2026-08-05 | Não tem o dado; pode levantar | Pendente — reclassificado como **não bloqueante para produto/preço**, bloqueante para renovação |
| R1.4 — Clau Kids e Fórum TEIA | | | |
| R1.5 — dia útil ou corrido | | | |
| R1.6 — mix de publicações | | | |
| R1.7 — capacidade contratada | | | |
| R1.8 — ferramentas e estrutura | | | |
| R1.9 — verba de anúncio na receita | | | |
