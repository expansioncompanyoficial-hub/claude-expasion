# 05 — ARQUITETURA DE PRODUTOS

| | |
|---|---|
| **Versão** | 1.0 |
| **Data** | 2026-08-05 |
| **Gate** | **GATE 4 — parcialmente aberto.** Estrutura definida; preços dependem da calibração (`04`) |
| **Status** | `PROVISÓRIO` — arquitetura proposta, preços em faixa |

---

## 0. Correção de nomenclatura — e por que ela é estratégica

Nas rodadas anteriores usei "agência de social media" ao descrever o **mercado**. Nicolas corrigiu em 05/08: **a Expansion é uma assessoria para loja de roupa, e social media é um dos serviços — não a definição do negócio.**

A correção está aceita e vale para todo o acervo daqui em diante. E ela não é semântica:

| Dado | Fonte |
|---|---|
| Em 2024, **37%** do mercado se definia como "Agência de Marketing ou Publicidade". Em 2025, caiu para **26%** | RD Station, Panorama de Agências 2026 (659 profissionais) |

**O mercado inteiro está fugindo do rótulo "agência" — 11 pontos em um ano.** Quem se define pelo *canal* que opera (social media, tráfego) vende execução. Quem se define pelo *problema* que resolve vende resultado. A distinção que Nicolas fez é a mesma que separa preço de esforço de preço de valor (`12` §B2).

> **Onde a palavra "agência de social media" continua correta neste acervo:** ao descrever os **concorrentes** que param no topo do funil. É deles que a brecha do `13` §4 fala — não da Expansion.

---

## 1. A arquitetura é uma MATRIZ, não uma escada

Nicolas propôs três níveis e os mapeou sobre o problema de atendimento. **O mapeamento dele é melhor que o meu enquadramento original** — mas revela que existem **dois eixos independentes**, não um:

```
                     EIXO 2 — CONVERSA  (onde a venda acontece)
                     N1 Método    N2 Cobertura    N3 Operação
                  ┌────────────┬──────────────┬──────────────┐
EIXO 1    Conteúdo│   entrada  │    núcleo    │   premium    │
CONTEÚDO          │            │              │              │
(atrai)   sem     │  produto   │   produto    │   produto    │
                  │  isolado   │  isolado ★   │  isolado ★   │
                  └────────────┴──────────────┴──────────────┘
                                    ★ = mercado 10× maior, motion de venda novo
```

**Por que dois eixos e não um:** conteúdo se precifica **por perfil** (Albanos tem 4); atendimento se precifica **por operação** (Albanos provavelmente tem 1 ou 2 WhatsApps). Forçar os dois na mesma unidade é o que travou a questão *"cliente ou perfil"* das rodadas anteriores. **A resposta é: depende do eixo.**

---

## 2. EIXO 1 — CONTEÚDO

O que a Expansion faz hoje. Unidade: **perfil**.

| Item | Definição |
|---|---|
| Escopo base | grade fixa de conteúdo por arquétipo de cliente, gravação, edição, publicação, tráfego, relatório semanal |
| Unidade | perfil de Instagram |
| Piso | **R$ 5.000/perfil** (conselho 13/07 + regra de margem de 30%) |
| Alvo | **R$ 6.000/perfil** |
| Estrutura para ecossistema | **base + adicional por perfil** — ver §5 |

**Pré-requisito inegociável: a grade de conteúdo.** Sem padrão por arquétipo, cada cliente é um projeto e o ratio fica travado em 1,00 conta por cabeça (`13` §1). A grade é o que transforma cliente em instância.

---

## 3. EIXO 2 — CONVERSA: os três níveis

### A proposta de Nicolas (05/08/2026)

| Nível | Proposta original |
|---|---|
| 1 | Ensina a metodologia e entrega scripts de resposta ao cliente |
| 2 | Uma IA analisa o atendimento dentro do CRM e devolve feedback ao cliente |
| 3 | A IA responde pelo cliente, com humano junto |

### ⚠️ O problema do Nível 2 como proposto

> **"Analisar e dar feedback" é responsabilidade sem controle — o pior lugar de um contrato.**

Se o atendimento do cliente não melhorar, quem é cobrado? A Expansion. E ela não atendeu ninguém. O cliente dirá, com razão: *"paguei para vocês analisarem e o resultado não mudou."*

Pior: **não é precificável por resultado.** Não se cobra variável sobre uma métrica que se diagnostica mas não se executa. Isso elimina justamente a alavanca do `12` §C1.

E há um precedente exato disso no acervo: a Prime *"quase cancelou"* por relatório ausente. Relatório é diagnóstico. **Diagnóstico sozinho não retém cliente — retém quando vem colado a uma ação.**

### A correção proposta: N2 vira cobertura de janela

Existe uma fatia do atendimento que a Expansion pode **controlar inteiramente, medir com limpeza e vender sem conflito**: o horário que a lojista não cobre.

| Dado de mercado | |
|---|---|
| *"Sem horário comercial, vendas migram para o WhatsApp"* | título do Chat Commerce Report 2026 |
| Conversão de agente de IA autônomo | **9% — igual ao atendimento humano** |
| Interações de pós-venda resolvidas 100% por IA | **58%** |

### A escada refinada

| Nível | Nome | Quem atende | Expansion entrega | Controle | Precificável por resultado? |
|---|---|---|---|---|---|
| **N1** | **MÉTODO** | cliente, 100% | playbook + scripts + **revisão semanal das conversas reais** + ajuste | nenhum sobre execução | ❌ |
| **N2** | **COBERTURA** | cliente no horário comercial · **IA da Expansion fora dele** | N1 + operação da janela morta + relatório de conversa perdida | **total dentro da janela** | ✅ sobre a janela |
| **N3** | **OPERAÇÃO** | **IA + humano da Expansion**, integral | N2 + atendimento integral + régua + SLA | total | ✅ integral |

**Três regras de projeto que saem daí:**

1. **A análise de atendimento não é um nível — é entregável de todos os três.** Ela sustenta a renovação em qualquer patamar.
2. **A promessa de cada nível é limitada ao que a Expansion controla.** N1 não promete conversão; promete método e revisão. N2 promete a janela. N3 promete o resultado.
3. **N1 precisa de obrigação recorrente da Expansion**, não só de biblioteca. Playbook entregue uma vez é infoproduto com nome de assinatura — exatamente o que o Alfredo alertou (`12`). A revisão semanal das conversas reais é o que o torna serviço.

### 🎯 O PLACAR COMPARTILHADO — o mecanismo que resolve o N2

Nicolas trouxe em 05/08 a intuição que fecha o desenho:

> *"Se a gente joga tráfego, lead bom pra essa pessoa e ela não sabe converter no atendimento porque está na correria da loja, meio que culpa a gente. A gente tinha que ter uma assertividade de enxergar que ele está no mesmo atendimento e conscientizar. Eu queria ver um modo de trazer essa consciência, pra ver que é de duas partes."*

**Isso é a solução, não uma preocupação.** O problema de "responsabilidade sem controle" não se resolve fugindo do N2 — resolve-se **tornando a responsabilidade do cliente visível e medida**. É o que a literatura de serviços chama de acordo de nível de serviço bidirecional, e quase nenhuma assessoria brasileira usa.

#### As duas colunas

| **O que a Expansion entrega** | **O que o cliente responde** |
|---|---|
| conversas geradas | **tempo de primeira resposta** (mediana) |
| custo por conversa | **taxa de resposta** (% de conversas respondidas) |
| criativos entregues no prazo | conversas **sem resposta em 24h** |
| posts publicados no prazo | tempo até fechamento |
| | **Compartilhado:** conversas → vendas |

Todas essas métricas **já existem** no WhatsApp e no CRM. Não precisam ser criadas — precisam ser contratadas.

#### A cláusula que muda tudo

```
SLA DE DUAS VIAS

  A Expansion se compromete a: gerar N conversas/mês, entregar criativo em
  até X dias, publicar no prazo, e reportar semanalmente.

  O cliente se compromete a: responder ao menos Y% das conversas em até
  Z minutos no horário acordado.

  Se o cliente ficar abaixo do seu compromisso por 2 semanas consecutivas,
  a meta de RESULTADO fica suspensa — e a Expansion não responde pelo número
  naquele período.
```

> **Sem essa cláusula, o N2 é uma armadilha. Com ela, o N2 é o produto mais defensável da casa** — porque cria uma conversa que nenhum concorrente está tendo com esse cliente.

#### Sobre o "aval" — a resposta de Nicolas está certa e incompleta

Ele respondeu que o relatório diário da IA no grupo seria o aval. **Está certo na direção, incompleto no mecanismo.** Relatório só é defesa se tiver as três coisas:

| | Sem isso, vira | Evidência na própria casa |
|---|---|---|
| **1. Cláusula contratual** | opinião do fornecedor | — |
| **2. Métrica acordada ANTES** | discussão sobre o que contava | — |
| **3. Consequência definida** | ruído que o cliente ignora | **A Prime quase cancelou por falta de relatório — mas relatório sozinho também não a teria segurado.** O que segura é o relatório que muda uma decisão |

**Relatório sem consequência é o mesmo diagnóstico sem ação que torna o N2 frágil.** O placar precisa terminar numa cláusula, não num print no grupo.

#### E o efeito comercial de segunda ordem

Um cliente que vê o próprio número de tempo de resposta toda semana **começa a querer melhorá-lo**. Quando ele não consegue — porque está na correria da loja, exatamente como Nicolas descreveu — **ele mesmo pede a solução.**

> **O placar do N2 é o melhor argumento de venda do N3 que existe.** Não é a Expansion dizendo "você atende mal". É o cliente vendo, no próprio dado, que perde venda por não conseguir responder — e perguntando quanto custa resolver.

### Custo variável — o único da casa

O WhatsApp oficial **cobra por conversa** (`F13`). Em N2 e N3, esse custo **escala com o sucesso**. Precisa estar no preço desde o primeiro contrato, com faixa de volume e gatilho de reajuste. Um mês viral sem teto vira uma fatura que o cliente não paga.

---

## 4. Faixas de preço — `ESTIMATIVA`, pendente de calibração

Derivadas por top-down (`11`, regra de lucro de 30%) e posicionadas contra a faixa brasileira (R$ 3–6k padrão, >R$ 6k premium).

| Produto | Ratio esperado | Faixa |
|---|---:|---|
| **Conteúdo** (por perfil) | 2–3 contas/cabeça | R$ 5.000 piso · R$ 6.000 alvo |
| **N1 Método** (isolado) | 12–18 contas/cabeça | R$ 1.200 – 2.000 |
| **N2 Cobertura** (isolado) | 6–8 contas/cabeça | R$ 2.500 – 4.000 + custo de conversa |
| **N3 Operação** (isolado) | 3–4 contas/cabeça | R$ 5.000 – 8.000 + variável + custo de conversa |
| **Conteúdo + N2** | — | R$ 8.000 – 10.000 |
| **Conteúdo + N3** | — | R$ 12.000+ com variável |

> ⚠️ **Os ratios são estimativa minha, não medição.** São a variável que decide se as faixas se sustentam — e é exatamente o que a tabela de calibração do `04` resolve. **Nenhum destes preços está aprovado.**
>
> **E o piso de R$ 5.000 não se aplica ao N1.** Ele é função do custo de entrega do produto de conteúdo. O N1 tem custo radicalmente menor e piso próprio — herdá-lo mataria o produto de maior margem potencial da casa.

---

## 5. 🎯 ALBANOS — a decisão comercial mais importante em aberto

Nicolas informou em 05/08: **a renovação está sendo montada, há um lançamento na mesa e a receptividade foi alta.** É o caminho mais curto para o primeiro contrato anual.

**Por que é a decisão que mais importa:** 51,67% da receita recorrente, e é onde a mudança de patamar tem chance real de acontecer.

### O erro a não cometer: reprecificar o escopo atual

```
Hoje:                    R$  8.000/mês  (4 perfis × R$ 2.000)
Piso de R$ 5.000/perfil: R$ 20.000/mês  →  +150%
```

**Pedir +150% no mesmo escopo é pedir para perder o cliente.** É reajuste linear, que o `09` proíbe.

### O caminho: reestruturar em vez de reajustar

O lançamento é **entregável novo, com valor próprio**. Ele reabre a conversa de preço sem que ela seja uma conversa de aumento.

```
Contrato novo = renovação ANUAL
              + estrutura ecossistema (base + adicional por perfil)
              + lançamento como projeto destacado
              + relatório semanal — o que quase custou a Prime
```

**Estrutura ecossistema, e por que ela é economicamente correta:** as 2 gravações/mês acontecem no mesmo dia e no mesmo local para os 4 perfis. Gravação, estratégia e atendimento são **compartilhados**; posts, design e tráfego são **por perfil**. Cobrar 4 × R$ 5.000 ignora isso e é economicamente indefensável — a Expansion perderia a negociação com razão.

```
PROPOSTA DE ESTRUTURA  (faixas, a calcular com a calibração)

  Base do ecossistema      cobre gravação, estratégia, atendimento, relatório
  + Adicional por perfil    cobre posts, design, tráfego da conta
  + Lançamento              projeto destacado, preço próprio
  = contrato de 12 meses
```

### O que NÃO fazer com o Albanos

**Não usar o Albanos como piloto do produto conversacional.** Três razões:

1. Não é do nicho de moda — pilotar ali dilui o foco que a empresa declarou.
2. É 51,67% da receita. Piloto se faz onde a perda é suportável.
3. A renovação já carrega mudança suficiente: anual + reestruturação + lançamento. Somar produto não construído é o "executor afobado" (`12` §A4).

> **O Albanos é a âncora de caixa que financia a transição. Não é o laboratório.**

### O piloto correto é a Ciés

| Critério | Ciés |
|---|---|
| Nicho de moda | ✅ |
| Problema documentado | ✅ *"35 conversas em 3 dias… ela não vai ter braço pra responder"* |
| Acesso aos números de venda | ✅ confirmado por Nicolas em 05/08 |
| Contrato vencendo de qualquer forma | ✅ agosto — a renegociação já vai acontecer |
| Risco se der errado | menor cliente da carteira: R$ 1.333/mês |

**Clau Kids é o segundo candidato** — mesmo nicho, números de venda disponíveis, tráfego já rodando.

---

## 6. O que ainda bloqueia o GATE 4

| # | Bloqueio | Onde se resolve |
|---|---|---|
| 1 | Ratios reais (contas por cabeça em cada nível) | calibração do `04` |
| 2 | **Quem opera o WhatsApp** — ninguém tem folga hoje | decisão da direção, `G4` |
| 3 | WhatsApp oficial × não-oficial | `A-003`, aberta desde 17/07 |
| 4 | Grade de conteúdo por arquétipo | pré-requisito do Eixo 1 |
| 5 | Custo por entregável | GATE 3 |

> **O item 2 é o que decide se esta arquitetura é um produto ou um slide.** O editor principal está a 168,9% da capacidade. Não existe pessoa ociosa na Expansion para operar atendimento de cliente.
