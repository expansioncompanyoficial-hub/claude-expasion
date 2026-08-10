# 27 — DECISÕES DA MESA · 10/08/2026

**As respostas do Kauã e do Nicolas viraram número** — com duas discordâncias
registradas.

| | |
|---|---|
| **Versão** | 1.0 |
| **Data** | 2026-08-10 |
| **Origem** | Retorno de Nicolas às cinco perguntas de `25` §9 |
| **Versão visual** | https://claude.ai/code/artifact/c8f25651-b84c-468d-943c-2abc2e33e0f3 |

---

## 1 — PREÇO: "está barato" — e o dado concorda

**Resposta da mesa:** R$ 1.800 está barato, inclusive para loja de R$ 30–70 mil.

**O dado confirma parcialmente.** Aplicando a trava (`R$ 1.800 ÷ 0,324 = R$ 5.556`
de venda nova) em cada faixa:

| Faturamento | Venda nova | = crescimento | Leitura |
|---|---|---|---|
| R$ 30 mil | R$ 5.556 | **18,5%** | 🔴 **Fora da faixa** |
| R$ 40 mil | R$ 5.556 | 13,9% | 🟡 No limite — preço certo |
| R$ 50 mil | R$ 5.556 | 11,1% | 🟢 Confortável |
| R$ 70 mil | R$ 5.556 | **7,9%** | 🟢 **Barato** |
| R$ 100 mil | R$ 5.556 | **5,6%** | 🟢 **Muito barato** |

> **A leitura de mesa está certa e o dado explica por quê:** R$ 1.800 é o preço
> correto para o **piso** da faixa. Da metade para cima vira presente.
> **A correção não é subir o preço — é ter preço por faixa.**

### A escada proposta — `D-028`

| Faixa da loja | Preço | Crescimento exigido | Lucro | Receita/hora |
|---|---|---|---|---|
| **R$ 40–60 mil** | R$ 1.800 | 9,3% a 13,9% | 47,2% | R$ 300 |
| **R$ 60–90 mil** | **R$ 2.400** | 8,2% a 12,3% | **50,8%** | **R$ 400** |
| **R$ 90–130 mil** | **R$ 2.900** | 6,9% a 9,9% | **52,6%** | **R$ 483** |

**As 6 horas de entrega são as mesmas em todas.** O que muda é o tamanho da base e,
portanto, o tamanho do resultado. **Cobrar igual de uma loja de R$ 100 mil e de uma
de R$ 40 mil é cobrar pelo esforço, não pelo valor.**

**Memória de cálculo:** `lucro = 0,6142 × preço − 6 × 42,55`.
`R$ 2.400 → R$ 1.218,78 = 50,8%` · `R$ 2.900 → R$ 1.525,88 = 52,6%`.

> ⚠️ **ALERTA sobre a faixa de R$ 30 mil.** A R$ 1.800 ela precisa crescer **18,5%**
> num mês — número que quase nenhuma loja entrega. Ou entra num **EX1 reduzido**
> (campanha a cada 2 meses, sem reunião mensal) a ~R$ 1.200, ou não entra.
> **Vender ali é churn no mês 4.**

---

## 2 — CAIXA: o problema do mês 1 não é preço — `D-029`

**Levantado na mesa:** R$ 1.800 no primeiro mês pode travar a cobrança; talvez
antecipar seja melhor no EX1 por ser mais barato.

**Concordo com o diagnóstico e discordo do remédio.** Antecipar **com desconto** é
repetir o Albanos, onde antecipar R$ 16.000 por 1,5 mês custou **295% ao ano**.

### Duas alavancas, e a melhor não é o desconto

| Alavanca | O que é | Caixa no ato |
|---|---|---|
| **Taxa de implantação** | Cobre a auditoria e a montagem da base. **Isenta se o contrato for de 12 meses** — vira moeda de troca | **R$ 900** |
| **Trimestral antecipado** | **Sem desconto.** Máximo 3% se for decisivo | **R$ 5.400** |
| | **Caixa por cliente novo, no fechamento** | **R$ 6.300** |

> **A taxa de implantação resolve dois problemas de uma vez:** o caixa do mês 1 **e**
> as 4 a 7 horas de extração de base que hoje não estão em preço nenhum (`19` §9).
>
> **E como moeda de troca ela bate o desconto:** isentar R$ 900 custa R$ 900; dar 15%
> num contrato de 12 meses custa R$ 3.240.

---

## 3 — SDR: o BANT está certo, faltam duas letras — `D-030`

**Script atual, confirmado pela mesa:** B (budget) · A (autoridade) · N (necessidade)
· T (tempo).

**O BANT resolve se ele pode comprar. Não resolve se a entrega vai funcionar** — e
são exatamente essas duas perguntas que faltam.

| | A pergunta | O que decide |
|---|---|---|
| **B** | *"Qual o faturamento médio mensal da loja?"* | **Qual produto e qual preço da escada.** Não é "tem verba?" — é o faturamento |
| **A** | *"Além de você, quem participa dessa decisão?"* | Quem precisa estar na reunião |
| **N** | *"O que mais te incomoda: não vender pra quem já comprou, o atendimento, ou o conteúdo?"* | EX1, EX2 ou EX3 |
| **T** | *"Se fizer sentido, quando você começaria?"* | Urgência |
| **D** *(dado)* | **"Onde estão hoje os contatos de quem já comprou de você? Tem sistema, planilha, ou só no WhatsApp?"** | **O nível de extração (1–5) e o tempo de setup** — muda a margem do mês 1 e se cabe taxa de implantação |
| **A** *(atendimento)* | **"Quem responde o WhatsApp da loja hoje, e em quanto tempo?"** | **Se a campanha vai converter** — e se ele precisa do EX2 junto |

> **Sem o D, o SDR agenda uma reunião onde a auditoria não pode ser feita** — e a call
> de diagnóstico perde a única coisa que fecha a venda (`D-025`).
> **Sem o segundo A, vende-se campanha para quem não responde**, e a culpa do
> fracasso vem para a Expansion.

**Terceira pergunta, opcional, que calibra a meta na hora:** *"você compra a peça por
quanto e vende por quanto? E quanto sai na liquidação?"* — dá a margem real dela em
vez do número médio do setor (`D-027`).

---

## 4 — DR. FRED: `DIVERGÊNCIA` — o problema não é preço, é escopo

**Decisão da mesa:** subir de R$ 1.750 para R$ 2.500–3.000, abrindo em R$ 3.000.
**Certeza de ajuste** porque dá prejuízo.

**Concordo com o diagnóstico e com a decisão de reajustar. Discordo da alavanca.**

### O número antes da conversa

O escopo contratado é **2 vídeos por dia + 4 gravações/mês** — cerca de **42 vídeos**
e **4 diárias**, perto de **80 horas** de entrega mensal.

> **Pela regra de ouro (`D-014`): 80 h × R$ 135,41 = R$ 10.833 de piso.**
> **A R$ 3.000 o prejuízo continua — só fica menor.**

| Cenário | Preço | Escopo | Resultado |
|---|---|---|---|
| Hoje | R$ 1.750 | ~80 h | 🔴 **Prejuízo.** Consome 140–203% do editor |
| **Só subir o preço** | R$ 3.000 | ~80 h | 🔴 **Continua prejuízo.** Cabem 22 h, não 80 |
| **Subir E cortar o escopo** | R$ 3.000 | **22 h — 12 vídeos + 1 diária** | 🟢 **Fecha em 30%** |
| Manter o escopo atual | R$ 10.800 | 80 h | O preço honesto de 2 vídeos/dia |

**A oferta correta:** R$ 3.000 por **3 vídeos/semana + 1 gravação/mês** — que é o que
a maioria da carteira tem. Não R$ 3.000 por 42 vídeos.

### Como abrir

> *"Fred, eu levantei quanto tempo a sua conta consome e preciso te falar com
> transparência: dois vídeos por dia é o escopo de um contrato de dez mil. Eu tenho
> duas saídas pra te oferecer. Três mil por três vídeos por semana e uma gravação por
> mês — que é o que a maioria dos clientes tem. Ou a gente mantém o volume que você
> tem hoje, e aí o valor é outro. **O que eu não consigo mais é manter o volume no
> preço de hoje.**"*

> **Subir só o preço mantém o prejuízo e ainda gasta o capital político da conversa
> difícil.** A alavanca é dupla: **preço e escopo juntos.**

---

## 5 — CIÉS: `DIVERGÊNCIA` — não reajuste. Venda o EX1 por cima.

**Levantado na mesa:** reajustar a Ciés porque o caixa está baixo.

**A necessidade de caixa é real e legítima. Mas a Ciés é o pior cliente da carteira
para reajustar**, por três razões:

1. **Ela é onde o case vai nascer.** O EX1 **não tem prova própria** (`D-034`). A
   Ciés é a candidata mais rápida a produzir a primeira. **Reajustar agora arrisca
   perder exatamente o cliente onde o case seria feito.**
2. **Ela é o piloto do módulo BASE** (`A-041`). É a única com campanha medida —
   mexer no preço durante o teste contamina o teste.
3. **Ela já paga antecipado, trimestral, sem desconto.** É o melhor comportamento de
   pagamento da casa. **Reajuste pune exatamente quem paga bem.**

### A jogada certa é expansão, não reajuste — `D-031`

| Ciés | Hoje | Com o EX1 adicional |
|---|---|---|
| Conteúdo (trimestral antecipado) | R$ 1.667/mês | R$ 1.667/mês |
| EX1 · BASE | — | + R$ 1.800/mês |
| **Total** | R$ 1.667 | **R$ 3.467 — +108%** |
| **Caixa no ato, se trimestral antecipado** | — | **R$ 5.400** |

**Um reajuste de 30% daria +R$ 500/mês e gastaria a relação. O EX1 dá +R$ 1.800/mês e
fortalece** — e é a venda mais fácil da carteira, porque ela já viu o mecanismo
funcionar na própria loja.

### Como abrir

> *"Você já vende pelo contato que a gente gera toda semana, sem precisar de
> encontro. Eu montei um produto que faz isso virar rotina: uma campanha por mês na
> sua base, mais quatro mensagens automáticas rodando todo dia. **A primeira campanha
> é por minha conta** — você vê o número antes de decidir. Quer ver a conta?"*

---

## 6 — ALBANOS: mantém

**Decisão da mesa:** manter R$ 24.000 trimestral antecipado — 4 perfis, líquido de
~R$ 7.000/mês.

**Sem objeção neste momento.** As duas ressalvas de `13` §8 continuam em pé para a
**próxima** renovação: nunca repetir desconto por antecipação (custou 295% a.a.), e a
concentração de 51,7% da receita num cliente segue sendo o maior risco isolado da
casa.

---

## 7 — O efeito no caixa

| Movimento | MRR | Caixa imediato |
|---|---|---|
| **Dr. Fred** · R$ 1.750 → R$ 3.000 com escopo cortado | + R$ 1.250 | — |
| **Ciés** · EX1 adicional, trimestral antecipado | + R$ 1.800 | **R$ 5.400** |
| **Albanos** · mantém | — | — |
| **Total** | **+ R$ 3.050/mês** | **R$ 5.400** |

**MRR de R$ 17.500 para R$ 20.550 — +17,4% mexendo em dois clientes, sem vender nada
novo.** E cada EX1 novo daqui pra frente entra com **R$ 6.300 de caixa no ato**.

> **Correção de dado:** a Ciés pagou **R$ 5.000** pelo trimestre, não R$ 4.000 como
> estava registrado em `clientes-e-contratos.csv`. Corrigido.

---

## 8 — Os cinco pendentes do 360 (pergunta 05, adiada pela mesa)

1. **O grupo de WhatsApp não está no preço do EX3** — 30 min/dia derrubam o lucro de
   31,3% para 23,5%. Ou R$ 7.000 com o grupo dentro, ou SLA de 4 h úteis (`A-027`)
2. **As horas nunca foram cronometradas** — 6 h / 20 h / 39 h são estimativa (`A-029`)
3. **O EX2 não tem quem opere** — exige contratar operador de conversa (`A-022`)
4. **Nenhum preço passou por imposto** — sem CNPJ e regime (`A-006`)
5. **Quem é dono da grade de conteúdo** depois da saída do designer (`A-028`)

**Adiados por decisão da mesa. Nenhum trava a venda do EX1 esta semana.**

---

## 9 — Em aberto

| # | Item | Quem |
|---|---|---|
| `A-042` | **Aceite da escada de preço do EX1** (R$ 1.800 / R$ 2.400 / R$ 2.900) | Direção |
| `A-043` | **Aceite da taxa de implantação de R$ 900**, isenta em contrato de 12 meses | Direção |
| — | **Volume: quantos EX1 o Kauã fecha em 30 dias?** — pergunta 02, ainda sem resposta | Kauã |
| `A-031` | Cláusula de dados ao advogado | Nicolas |
| `A-039` | Cessão de IP com o desenvolvedor | Nicolas |
