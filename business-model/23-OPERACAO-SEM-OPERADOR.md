# 23 — A OPERAÇÃO SEM OPERADOR

**Como o EX1 roda sem consumir a Débora e sem o lojista preencher nada.**
E a correção de uma coisa que este acervo afirmou sem ter olhado.

| | |
|---|---|
| **Versão** | 1.0 |
| **Data** | 2026-08-08 |
| **Origem** | Nicolas, 08/08: *"depender dela pra fazer disparos é muito retrógrado mecânico… eu quero já começar construindo, não construir pra começar"* |
| **Migração proposta** | `business-model/sql/0001-modulo-base-consumidor.sql` — **não aplicada** |
| **Versão visual** | https://claude.ai/code/artifact/a5f2f8d6-06df-4040-b0cb-953a91ee96a0 |

---

## 0 — Correção: o Expansion OS já existe, e este acervo não sabia

Antes de qualquer recomendação nova, a correção. Ao olhar a infraestrutura para
responder, encontrei:

| Projeto | Criado | Estado |
|---|---|---|
| **`expansion-os-prod`** | **29/07/2026** | `ACTIVE_HEALTHY`, São Paulo. **18 tabelas, RLS ligada em todas** |
| `os-expansion-staging` | 05/08/2026 | `ACTIVE_HEALTHY` |

E não é rascunho. É engenharia disciplinada:

- `evento` é **append-only** — UPDATE barrado por gatilho, DELETE sem política de
  RLS, exclusão só por cascata (o caminho do direito do titular).
- `modulo` traz o roadmap declarado: **5 módulos construídos** (Clientes, Esteira,
  Pessoas, Relatórios, Vitrine) e **6 declarados como ainda não construídos** —
  `construido = false` como roadmap explícito, não como promessa esquecida.
- `pulso` com 453 linhas, `integracao` com cadência esperada, `alerta`,
  `notificacao` — **telemetria real, rodando.**
- Comentário em tabela explicando a decisão de projeto, não o óbvio.

**Isso é exatamente o cockpit do `EXPANSION-360` §10.2, construído.**

### O que muda no que este acervo afirmou

| O que `20` §6 e `A-033` disseram | O que está correto agora |
|---|---|
| *"Construir CRM próprio: NÃO agora"* | **Continua válido — para um CRM novo.** Mas a premissa embutida era "não existe nada". Existe |
| *"Construir leva um trimestre"* | **Errado neste contexto.** Com o OS pronto — migrações, RLS, convenções — o que o EX1 precisa é **um módulo, 34 a 48 h** |
| *"Alugue a ferramenta, seja dono do padrão"* | **Continua válido, e ele já fez.** O padrão de `20` §4 vira tabela, não planilha |
| A escada de fases de `21` §9 | **Corrigida.** Ela sugeria planilha agora e migração depois. Nicolas está certo: *"começar construindo, não construir pra começar"* |

> **`A-033` fica REVISADA, não revogada.** O que segue proibido pelo conselho de
> 13/07 é o que ele de fato mirava: **contratar freela de desenvolvimento, construir
> aplicação para o cliente usar, e fazer customização por cliente.** Estender um
> sistema interno que já roda, com quatro tabelas no padrão que ele mesmo já
> estabeleceu, não é a coisa que a proibição nº 2 impede.

### E a planilha de `22`?

**Continua servindo, e não é desperdício:** é o formato de importação e o plano B de
qualquer cliente Nível 3–5. Mas deixa de ser a camada de base. **A base é o
Postgres.**

---

## 1 — O módulo que falta não é o "CRM"

O roadmap do OS já declara um módulo **CRM — "Leads, pipeline e conversão"**. Esse é
o **funil comercial da Expansion**: lead, SDR, reunião, fechamento.

**O EX1 precisa de outra coisa:** o **consumidor final da loja**. São dados
diferentes, ciclos diferentes e donos jurídicos diferentes.

> **Misturar os dois é o erro que faz o dado não servir para nenhum dos dois.**
> Chame o novo de **BASE**, o mesmo nome do produto.

| | Módulo CRM (já no roadmap) | Módulo BASE (proposto) |
|---|---|---|
| Quem está lá dentro | Lojistas que podem virar cliente da Expansion | Consumidores que já compraram da loja |
| Dono do dado | Expansion | **A loja.** A Expansion opera em nome dela |
| Volume em 15 clientes | centenas | **~30.000** |
| Vira | previsão de receita | **o benchmark de setor e, depois, o modelo** |

### As quatro tabelas

`contato` · `campanha` · `interacao` · `regua` — mais duas views:
`contato_faixa` (ATIVO/MORNO/DORMENTE calculado) e **`auditoria_base`**, que é a
consulta que fecha a venda.

SQL completo em `business-model/sql/0001-modulo-base-consumidor.sql`. Seguindo as
convenções do OS: singular, português, comentário em toda tabela, RLS ligada, e
`interacao` **append-only com UPDATE barrado por gatilho**, igual à `evento`.

**Não foi aplicada.** Aplicar primeiro em `os-expansion-staging`.

---

## 2 — Os dois fluxos que estavam confundidos

A pergunta foi: *"ele lê a planilha toda manhã e avisa no grupo? Ou manda mensagem
pro consumidor do cliente?"* — **São dois fluxos diferentes, com públicos, horários
e propósitos diferentes.**

### Fluxo A · A RÉGUA — para o consumidor final

```
todo dia, 9h
  → Make consulta o Postgres
  → "quem cruzou 60 dias sem comprar? quem comprou há 7 dias? quem faz aniversário?"
  → normalmente 10 a 40 pessoas
  → dispara pelo canal, personalizado, PELO NÚMERO DA LOJA
  → grava um ENVIO em `interacao`
  → quando a pessoa responde, grava uma RESPOSTA
```

**O lojista não vê isso passar.** Ele vê o resultado. Nenhum humano da Expansion
toca em nada.

### Fluxo B · O PLACAR — para o lojista

```
toda segunda, 8h
  → Make consulta `interacao` da semana
  → calcula: enviadas, conversas, custo por conversa | tempo de 1a resposta dele,
    taxa de resposta dele, sem resposta em 24h | vendas atribuídas
  → monta a mensagem no formato fixo
  → manda no grupo `Expansion & <cliente>`
```

**Dois públicos, dois horários, zero pessoas.** Era isso que faltava dizer.

---

## 3 — O lojista não preenche nada. Nunca.

A objeção estava certa: *"quanto de tempo ele vai levar e quão chata vai ser pra ele
preencher"*. A resposta é que **ele não preenche.** A base não é digitada — é
**alimentada da fonte que já existe.**

| Nível | Como a base se atualiza | Esforço do lojista |
|---|---|---|
| **A** — loja com PDV, ERP ou loja virtual | **Integração.** A venda entra sozinha, por webhook | **Zero, para sempre** |
| **B** — loja sem sistema integrável | A venda é marcada **na própria conversa** do WhatsApp, no momento em que acontece | 2 toques, pela vendedora |
| **C** — loja sem nada | Só o dado da campanha alimenta. Menos rico, e a régua funciona igual | Zero |

**A única vez em que ele participa é a call de onboarding: 20 minutos, uma vez na
vida**, exportando o que ele já tem, na tela dele, com você junto.

> **E isso vira argumento comercial, não ressalva:** *"você não vai preencher
> planilha nenhuma — nem agora, nem nunca."* Contra qualquer concorrente que mande
> formulário, isso ganha a conversa sozinho.

---

## 4 — A Débora sai da operação

Ela é gargalo declarado — `capacidade-por-funcao.csv` linha `K04`, capacidade
`NÃO INFORMADA` e demanda de 91 publicações/mês. **Pôr disparo manual em cima dela
era erro deste acervo, e a objeção estava certa.**

| Tarefa | No runbook de `22` | Com o módulo BASE | Quem |
|---|---|---|---|
| Importação da base | 45 min a 4 h · Débora | **1× no onboarding, pelo importador** | comercial, na call |
| Régua | 30 min a 2 h/mês · Débora | **0** | ninguém |
| Escolher segmento | Débora | **0 — consulta salva** | ninguém |
| Escrever a copy | 40 min · Débora | **~15 min** — rascunho por IA, aprovação humana | Débora |
| Arte | 50 min · Débora | **~20 min** — 3 fotos do catálogo | Débora |
| Disparo em lotes | 30 min · Débora | **0** | ninguém |
| Monitorar 48 h | 45 min · Débora | **0 — cai em `interacao`** | ninguém |
| Placar semanal | 20 min × 4 · Débora | **0** | ninguém |
| Reunião de resultado | 45 min | 45 min | **Nicolas** |

> **A Débora fica com ~35 minutos por cliente por mês.** Copy e arte. Nada mais.
> Nem um disparo.

### O que isso faz com a economia e com a capacidade

`lucro = 0,6142 × 1.800 − horas × 42,55`

| Regime | Horas internas | Lucro antes de ferramenta |
|---|---|---|
| `22`, tudo na mão, mês 1 | 9,3 h | 39,4% |
| `22`, régua automatizada | 6,0 h | 47,2% |
| **Módulo BASE — Débora 35 min + Nicolas 45 min** | **1,33 h** | **58,3%** |

Com R$ 250/cliente/mês de ferramenta e canal, ainda fecha **44,4%**.

**O efeito grande não é a margem — é a capacidade.** A 1,33 h por cliente, as 204 h
da casa deixam de ser o limite do EX1. **O gargalo passa a ser comercial e passa a
ser a agenda do sócio:**

| Limite | Onde ele bate |
|---|---|
| Capacidade de entrega | deixa de ser o limite |
| **Reunião mensal do sócio, 45 min cada** | **~40 clientes = 30 h/mês. É o novo teto** |
| Onboarding, ~2 h por cliente novo | limita a velocidade de entrada, não o estoque |

**40 clientes de EX1 são R$ 72.000 de MRR — acima do portão do conselho, com o time
de hoje.** É esse o argumento que reconcilia construir agora com a proibição de
13/07: **o portão existe para impedir gasto à frente da receita, e este gasto é o
mecanismo da receita.** E o `ALERTA-07` deixa de ser detalhe: **a reunião mensal
vira o gargalo da empresa inteira.**

---

## 5 — O custo de construir, honesto

| Item | Horas |
|---|---|
| 4 tabelas + views + RLS + gatilho append-only | 4–6 |
| Importador de base (CSV → `contato`, com deduplicação) | 4–6 |
| Cenário Make · régua diária | 6–8 |
| Cenário Make · campanha (segmento → lote → log) | 8–10 |
| Cenário Make · placar semanal | 4–6 |
| Integração com **1** PDV/ERP | 8–12 |
| **Total** | **34–48 h** |

Cada PDV adicional: 4–8 h. **Escolher um só para começar** — o do cliente que
assinar primeiro.

**Custo recorrente:** Supabase (fixo da casa, não por cliente) · Make (por operação,
`A COTAR`) · canal (por conversa, `ALERTA-06`) · **manutenção**, que é a linha que
todo mundo esquece — integração quebra quando o fornecedor muda a API.

> **A regra que mantém isso dentro da proibição do conselho:** automação em
> ferramenta alugada, dado em banco próprio, **zero código de aplicação**. O teste é
> simples — *se você parar de pagar o Make amanhã, o que sobra?* Se a resposta for
> "os dados, exportáveis", é configuração. Se for "nada", virou software.

---

## 6 — DIVERGÊNCIAS DO COMITÊ

A pergunta foi explícita: *"analise com todos os que deram opiniões"*. Elas não
convergem, e a divergência é útil.

| Cadeira | Posição |
|---|---|
| **CFO / conselho de 13/07** | **Contra construir agora.** *"Comprar estrutura do tamanho da visão em vez do tamanho da empresa"* é como empresa de serviço quebra. Receita é cancelável; custo fixo é contrato |
| **Arquiteto de dados** | **A favor, com urgência.** Migração posterior custa mais que fazer certo agora, e **dado não capturado não volta**. Cada mês sem o módulo é um mês de ativo perdido |
| **COO / capacidade** | **A favor, com urgência.** A Débora é gargalo declarado. **15 clientes de EX1 não fecham na mão** — o modelo de `21` §5 depende disto existir |
| **TDABC / custeio** | **Alerta.** As 34–48 h não estão em nenhuma linha de custo, e **manutenção é recorrente, não só construção**. Se for o CEO quem constrói, é exatamente a represa que o conselho mandou drenar |
| **Risco** | **Alerta grave.** Disparo automático, sem olho humano, **no número da loja do cliente**. Um erro de segmento manda a oferta errada para 600 pessoas — e o número em risco não é o seu |
| **Jurídico (só aponta controle)** | **Bloqueante.** Sem a cláusula de `A-031`, o módulo acumula dado que não pode ser usado. **Construir antes da cláusula é construir um passivo** |

### Onde convergem — e é o suficiente para agir

1. **Banco próprio, ferramenta alugada, zero código de aplicação.** Unânime.
2. **A cláusula de contrato vem antes da primeira linha de dado.** Unânime.
3. **Nada de customização por cliente.** Um módulo que serve a todos, ou nada.

### A divergência real, e a regra que a resolve

O CFO quer zero agora; o COO quer tudo agora. **A regra que reconcilia:**

> **Só se automatiza o que já foi feito na mão pelo menos uma vez, com um cliente
> real.**

Isso protege os dois lados: nada é construído sobre suposição (a preocupação do
CFO), e nada fica manual mais que o necessário (a preocupação do COO). E resolve o
alerta de Risco: **quem já disparou na mão sabe o que a automação pode errar.**

---

## 7 — A sequência corrigida

Substitui `21` §9 no que diz respeito à camada de dados.

| Fase | O que se faz | Gatilho para sair |
|---|---|---|
| **0 · Cláusula** *(esta semana)* | Os três controles de `20` §5 no contrato. **Nada começa antes** | Contrato revisado |
| **1 · Tabelas** *(esta semana)* | Aplicar o módulo BASE **no staging**. Importar a base da Ciés, que já tem histórico real | `auditoria_base` devolvendo os números da Ciés |
| **2 · Uma campanha na mão** | O primeiro cliente novo roda tudo manual, com o dado já entrando no Postgres | 1 campanha completa, medida |
| **3 · Automatizar o que já rodou** | Régua, depois placar, depois campanha. **Nessa ordem** — do menor risco para o maior | Cada cenário rodando 2 semanas sem intervenção |
| **4 · Integrar o primeiro PDV** | O do cliente que assinar primeiro | Venda entrando sozinha |

**A ordem de automação importa e não é arbitrária:** a régua manda 10–40 mensagens
por dia — se errar, erra pequeno. A campanha manda 600 de uma vez. **Automatiza-se o
que erra barato primeiro.**

---

## 8 — O que fazer nas próximas 72 horas

| # | Ação | Quem | Trava |
|---|---|---|---|
| 1 | **Cláusula de dados ao advogado** | Nicolas | `A-031` — sem conserto retroativo |
| 2 | **Aplicar `0001` no staging** e importar a base da Ciés | tecnologia | Prova o módulo com dado real, risco zero |
| 3 | **Cotar `A-034`** — a ferramenta é por conta ou por número? | Kauã | Decide a margem do EX1 |
| 4 | **Decidir quem constrói as 34–48 h** | Nicolas | **Se for ele, é a represa de novo.** Ver `A-037` |
| 5 | **Vender o EX1 na segunda** | Kauã | Não depende de nada disto. `22` §1 continua de pé: **fecha 39,4% na mão** |

> **A linha 5 é a que importa.** Nada nesta página é pré-requisito para vender. O
> módulo BASE é o que faz o décimo quinto cliente caber — não o primeiro.
