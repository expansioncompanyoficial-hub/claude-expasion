# DIGITAL TWIN — ORGANIFY

> **Missão:** AEOS-M001 · **Alvo:** https://app.organifybr.com/ · **Sessão:** 27/07/2026
> **Conta observada:** Expansion Company (perfil `ROOT`)
> **Rito:** Vol. III — PROMETHEUS, Artigos 21 a 30
> **Estado do portão do Art. 30:** **REPROVADO — redesign proibido nesta data**
> **Confiança global do modelo:** **≈ 50%** (evidência parcial)

---

## 0. ESTADO DA MISSÃO EM UMA LINHA

O mapa **estrutural** do Organify está levantado com boa confiança (rotas, componentes, entidades, stack, integrações). O mapa **comportamental** — estados, erros, fluxos executados, fricção real — está praticamente vazio. Pelo Art. 30, isso proíbe iniciar qualquer proposta de redesign.

---

## 1. MÉTODO E LIMITAÇÕES (ler antes de confiar em qualquer número)

**Como foi observado.** Navegador com sessão autenticada da própria Expansion. Três instrumentos: leitura da árvore de acessibilidade, inspeção do DOM em JavaScript (somente leitura) e requisições `GET` às rotas a partir da própria página, medindo tempo e tamanho.

**Limitação nº 1 — a mais grave.** O mecanismo de clique automatizado desta sessão entrega o evento numa coordenada escalada em **1,70×** em relação ao CSS da página. Consequência: **nenhum clique real foi executado com sucesso** nesta sessão. Tudo que depende de interação — abrir modal, submeter formulário, provocar erro, ver loading, percorrer um fluxo — **não foi observado**.

**Limitação nº 2 — hipótese refutada, registrada de propósito.** Durante a sessão levantei a hipótese de que os botões de período do dashboard (`Hoje`, `Mês atual`, …) estavam quebrados: cliques não geravam requisição alguma. A hipótese chegou a ~85% de confiança e **foi refutada** por dois testes: (a) sensor de eventos instalado no próprio botão não capturou nem `mousedown`; (b) chamada direta do método no servidor (`setToday`) respondeu em 1.251ms e recalculou todos os KPIs corretamente. **O filtro funciona. O defeito era do meu instrumento.** Fica registrado como exemplo do Art. 22: sem o teste de refutação, um bug inexistente teria entrado no relatório.

**Limitação nº 3 — medição de tempo contaminada.** A primeira varredura mediu 2.596ms, 2.602ms, 2.685ms e 3.398ms para quatro rotas de configuração. Esses números foram produzidos sob **concorrência gerada por mim** (4 requisições simultâneas). A remedição sequencial derrubou `/configuracoes/times` de 3.398ms para **457–527ms**. Os números da tabela abaixo são os **sequenciais**; os paralelos foram descartados.

**Limitação nº 4 — artefato de extração.** Meu extrator de nomes de componente casou o padrão `"name":"…"` dentro do estado serializado e capturou valores de dados como se fossem componentes: `Adryel Da Silva`, `aSas`, `Expansion Company`, `Administrador`. **Não são componentes.** Estão excluídos do inventário.

**Nada abaixo veio de suposição.** O que não foi observado está marcado `Ø`.

---

## 2. CAMADA 1 — MAPA DE NAVEGAÇÃO

24 rotas alcançáveis pelo menu principal, extraídas do DOM (inclusive submenus fechados). Tempo = medição sequencial, 1 requisição por vez.

| ID | Rota | Área | ms (r1→r2) | HTML |
|---|---|---|---|---|
| TELA-001 | `/` | Dashboard | 992 → 782 | 179,2 KB |
| TELA-002 | `/clientes` | Clientes | 1018 → 823 | **342,7 KB** |
| TELA-003 | `/crm` | CRM | 718 → 698 | 271,3 KB |
| TELA-004 | `/gerador-de-leads` | Prospecção | Ø sequencial | 265,2 KB |
| TELA-005 | `/metas` | Metas | Ø sequencial | 138,7 KB |
| TELA-006 | `/agenda` | Agenda | Ø sequencial | 201,2 KB |
| TELA-007 | `/quadros` | Tarefas | Ø sequencial | 149,7 KB |
| TELA-008 | `/vivian-ia` | IA | Ø sequencial | 112,1 KB |
| TELA-009 | `/whatsapp/conversas` | WhatsApp | Ø sequencial | 253,6 KB |
| TELA-010 | `/financeiro/relatorio` | Financeiro (DRE) | Ø sequencial | 160,2 KB |
| TELA-011 | `/financeiro/lancamentos-futuros` | Financeiro | Ø sequencial | 243,5 KB |
| TELA-012 | `/financeiro/movimentacoes` | Financeiro | Ø sequencial | 254,2 KB |
| TELA-013 | `/financeiro/recorrencias` | Financeiro | Ø sequencial | 187,9 KB |
| TELA-014 | `/universidade` | Conteúdo | Ø sequencial | 238,6 KB |
| TELA-015 | `/minha-conta` | Conta | Ø sequencial | 111,5 KB |
| TELA-016 | `/configuracoes/agencia` | Config | Ø sequencial | 122,7 KB |
| TELA-017 | `/configuracoes/integracoes` | Config | Ø sequencial | 198,7 KB |
| TELA-018 | `/configuracoes/clientes/categorias` | Config | Ø sequencial | 140,6 KB |
| TELA-019 | `/configuracoes/clientes/origens` | Config | Ø sequencial | 146,1 KB |
| TELA-020 | `/configuracoes/financeiro/movimentacoes/categoria-de-entrada` | Config | Ø sequencial | 133,1 KB |
| TELA-021 | `/configuracoes/financeiro/movimentacoes/categoria-de-saida` | Config | Ø sequencial | 138,5 KB |
| TELA-022 | `/configuracoes/fornecedores` | Config | Ø sequencial | 146,8 KB |
| TELA-023 | `/configuracoes/usuarios` | Config | Ø sequencial | 190,0 KB |
| TELA-024 | `/configuracoes/times` | Config | 457 → 527 | 230,2 KB |

**TELA-025 · `/portal/<slug-da-agência>` — Portal do Cliente.** Superfície separada, observada apenas na tela de entrada. Para a Expansion: `/portal/expansion-company`. Peso: **14,2 KB** — um vigésimo quarto do peso de `/clientes`, o que indica um aplicativo próprio e enxuto, não o mesmo layout reaproveitado. Componente único na entrada: `pages.portal.login`. Campo único: `form.document`.

**Autenticação do portal (confiança 90%, observada sem interação):** a tela pede **exclusivamente CPF ou CNPJ** — *"Informe seu CPF ou CNPJ para acompanhar suas demandas"*. Não há campo de senha, código de acesso ou segundo fator, e o comportamento é idêntico com e sem cookie de sessão. Combinado com o slug da agência exposto na URL, o controle de acesso à área do cliente repousa sobre um dado que não é secreto: CNPJ é público por consulta à Receita Federal, e CPF circula em contrato, nota e cadastro.

**Não testado deliberadamente:** nenhuma tentativa de autenticação foi feita, nem com documento de cliente da própria Expansion. Confirmar a falha exigiria acessar dado de terceiro através da própria fraqueza. O formulário é evidência suficiente do desenho; a exploração não acrescentaria informação legítima.

**Não observado (Ø):** o interior do Portal do Cliente (o que o cliente enxerga depois de entrar), telas de login/recuperação de senha da área interna, rotas alcançáveis apenas por ação (detalhe de quadro, detalhe de conversa), qualquer rota exclusiva de perfis não-`ROOT`.

---

## 3. CAMADA 2 — MAPA DE COMPONENTES

Inventário por nome real de componente Livewire. Total de componentes distintos identificados: **89**.

**Dashboard (TELA-001) — 26 componentes numa única tela:**
`layout.navigation`, `layout.sidebar`, `dashboard-filter`, e 16 cartões de indicador (`summaries.active-clients`, `defaulting-clients`, `balance`, `gain`, `expected-revenue`, `expected-expense`, `recurring-revenue`, `revenue-average-client`, `cac`, `sales-projection`, `lead-conversion-rate`, `client-lifetime-average`, `fixed-cost`, `variable-cost`, `defaulting-revenue`, `churn-rate`), 5 gráficos (`charts.expense-x-revenue`, `leads`, `leads-source`, `revenue-average-client`, `clients-distribution`) e 2 tabelas (`clients.clients-defaulting-table`, `finance.releases.transactions.recent-transactions-table`).

**Padrão de composição observado em toda a aplicação:** cada tela de listagem embarca, no HTML da primeira resposta, o conjunto completo de modais de escrita — `-create`, `-edit`, `-delete` — mesmo que o usuário nunca os abra. Confirmado em clientes, metas, quadros, recorrências, movimentações, lançamentos futuros, fornecedores, usuários, times, categorias e origens.

**Reuso entre telas (confirmado):** `summaries.balance` aparece em TELA-001, TELA-010 e TELA-012. `summaries.expected-revenue` aparece em TELA-001, TELA-010 e TELA-011. `crm.leads.leads-create` aparece em TELA-003, TELA-004 e TELA-009. `clients.clients-edit` aparece em TELA-002 e TELA-009.

---

## 4. CAMADA 3 — MAPA DE ESTADOS

**Ø — NÃO OBSERVADO.** Nenhum estado foi provocado nesta sessão por causa da Limitação nº 1.

Estados que precisam ser provocados e registrados antes do portão do Art. 30: `loading` (por componente), `empty`, `success`, `erro de validação`, `erro de servidor`, `offline`, `sessão expirada`, `sem permissão`, `404`, `timeout`, `salvando`, `otimista/revertido`.

Único sinal indireto: os modais financeiros trazem o texto `Nenhuma opção encontrada` nos seletores de Categoria, Cliente e Fornecedor. Duas leituras possíveis — estado vazio legítimo, ou seletor que só carrega opções após abertura. **Confiança: 25%. Requer abertura manual do modal.**

---

## 5. CAMADA 4 — MAPA DE EVENTOS

Ações declaradas no HTML (`wire:click`). **Inventariadas por leitura, nenhuma executada.**

- **Filtro de período** (TELA-001 e TELA-010): `setToday`, `setYesterday`, `setThisWeek`, `setThisMonth`, `setLastMonth`, `setLast30Days`, `setLast90Days`. `setToday` é a única **verificada em execução** (1.251ms, recalculou os 16 cartões).
- **Ordenação:** `sortBy('name')`, `sortBy('created_at')`, `sortBy('paid_at')`, `sortBy('category')`, `sortBy('description')`, `sortBy('amount')`, `sortBy('source_client_id')`, `sortBy('pending_tasks_count')`.
- **Cadastro em etapas:** `goToStep(1..4)` e `nextStep` — formulário de cliente em 4 passos; lead em 3.
- **Alternâncias:** `$toggle('whatsapp')`, `$toggle('ai_enable')`, `$toggle('email_charge_enabled')`, `toggleTaskVisibilityRestriction`.
- **Classificação de lead:** `$set('qualification', 'cold'|'warm'|'hot')`.
- **Tipo de pessoa:** `$set('type_person', 'natural'|'legal')`.
- **Integração de cobrança:** `syncAsaas(<id>)` — **uma ação por linha da tabela de clientes**, 9 ocorrências observadas.
- **Destrutivas (jamais acionadas):** `confirmDelete(id, nome)`, `confirmDuplicate(id, nome)`, `deleteMeeting`, `deleteReminder`, `logout`.
- **Filtros de prospecção:** `toggleFilter('porteFilters'|'emailOwnershipFilter'|'cnae_ids_filter', valor)` — 51 opções de CNAE embutidas no HTML.

---

## 6. CAMADA 5 — MAPA DE FLUXOS

Fluxos **identificados** pela estrutura, **nenhum executado** (Ø):

Cadastro de cliente (4 etapas) · Cadastro de lead (3 etapas) · Movimentação de lead no Kanban · Perda de lead com motivo (`leads-loss-reason-modal`) · Lançamento de entrada/saída · Lançamento futuro → baixa (`amount_paid`, `paid_at`) · Recorrência (7 frequências: semanal a anual) · Cobrança via Asaas · Régua de cobrança · Conversa de WhatsApp por instância · Criação de meta · Quadro → tarefas · Agendamento com Google Calendar · Convite de usuário → definição de senha · Consulta à Vivian IA · Prospecção → importação para pipeline.

---

## 7. CAMADA 6 — MAPA DE DEPENDÊNCIAS

**Confirmado por evidência direta (95%):**

```
Navegador
   │  HTML server-side + Livewire
   ├── GET  /<rota>                    → 457–1018 ms, 111–343 KB
   ├── POST /livewire/update           → 605–1424 ms  (round-trip de toda interação)
   ├── /build/assets/app-*.js|css      (Vite)
   ├── /livewire/livewire.min.js
   ├── fonts.bunny.net       → Figtree 400/500/600
   └── fonts.googleapis.com   → Poppins 100–900 + itálicos
```

- **Backend:** PHP / **Laravel** · **Frontend:** Blade + **Livewire v3** + **Alpine.js** + **Tailwind** · **Build:** Vite · **Gráficos:** Chart.js
- **Não é SPA.** Não há API JSON pública em uso pela interface; **toda** interação é round-trip ao servidor por `POST /livewire/update`.
- `<meta robots="noindex, nofollow">`, `theme-color #0DE181`, `lang="pt-BR"`.
- **Integrações declaradas** (TELA-017): WhatsApp (multi-instância), OpenAI, **Asaas**, Google Calendar (TELA-015), Régua de cobrança, Assistente SDR, API de Leads, API de Tarefas de Quadro.

---

## 8. CAMADA 7 — MAPA DE NEGÓCIO

**Entidades e campos** (derivados dos nomes de campo do formulário — confiança 80%):

- **Cliente:** nome, documento, PF/PJ, e-mail, telefone, Instagram, empresa, valor de oportunidade, faturamento, endereço completo (CEP, estado, cidade, rua, número, complemento, bairro), observações, origem, categoria, recorrente, cobrança por e-mail, WhatsApp, IA habilitada.
- **Lead:** os campos comerciais acima + pipeline, coluna do pipeline, qualificação (frio/morno/quente), motivo de perda.
- **Meta:** nome, tipo (Faturamento · Margem de lucro · Nº de clientes recorrentes · Ticket médio), valor, data.
- **Movimentação:** valor, categoria, cliente/fornecedor, forma de pagamento, data de pagamento, descrição, custo, CAC, taxa, valor recebido.
- **Lançamento futuro:** vencimento, valor, valor pago, data de baixa.
- **Recorrência:** entrada/sáida, valor, categoria, fornecedor, frequência, início e fim.
- **Quadro / Tarefa / Reunião / Lembrete / Fornecedor / Usuário / Time.**

**Regras de negócio capturadas literalmente da interface (confiança 90%):**

1. *"Metas não podem ser editadas após o mês iniciar, apenas excluídas."*
2. *"Após o cadastro, o novo usuário receberá por e-mail (e WhatsApp, se o telefone for informado) um link para definir a própria senha no primeiro acesso. O link vale por 60 minutos."*
3. *"Restrição de visibilidade de tarefas: quando ativada, usuários veem apenas tarefas que criaram, são responsáveis ou membros."*

**Controle de acesso (TELA-024):** RBAC por time, matriz recurso × ação — Quadros, Agenda, Clientes, CRM, DRE, Financeiro cruzados com Criar, Remover, Editar, Listar, Visualizar. 3 times e 6 usuários cadastrados.

**Volume de dados da conta:** 9 clientes · 1 inadimplente · 7 movimentações · 1 lançamento futuro · 4 quadros · 6 fornecedores · 6 usuários · 3 times · 5 categorias de cliente · 6 origens · 2 categorias de entrada · 4 categorias de saída.

---

## 9. MATRIZ DE CONHECIMENTO

| Camada | Status | Confiança |
|---|---|---|
| 1 · Navegação | ✔ Confirmada (menu principal) | 90% |
| 2 · Componentes | ✔ Confirmada | 90% |
| 3 · Estados | Ø Não observada | 5% |
| 4 · Eventos | △ Declarados, 1 de ~40 executado | 45% |
| 5 · Fluxos | Ø Identificados, nenhum executado | 20% |
| 6 · Dependências | ✔ Confirmada | 95% |
| 7 · Negócio | △ Provável (inferida de campos e textos) | 70% |

---

## 10. ACHADOS PRELIMINARES

Cada achado com nível de confiança. **Nenhum é recomendação ainda** — recomendação exige o portão do Art. 30 aberto.

| # | Achado | Evidência | Confiança |
|---|---|---|---|
| A-01 | `/clientes` entrega **342,7 KB** de HTML e 1.310 nós de DOM para exibir **9 linhas** de cliente | medição direta | 90% |
| A-02 | Cada tela de listagem embarca todos os modais de escrita no HTML inicial, abertos ou não | inspeção de 11 telas | 85% |
| A-03 | O dashboard é composto por **26 componentes Livewire**, sendo 16 cartões de um número só | inspeção do DOM | 95% |
| A-04 | **Dois provedores de fonte** carregados juntos; Poppins vem com 18 variações (100–900 + itálicos) | `<link>` no `<head>` | 95% |
| A-05 | Logo servida em **852×269** e exibida em **114×36** — ~7,5× maior que o necessário, sem `srcset` | `naturalWidth` vs `width` | 95% |
| A-06 | Os 7 botões de período **não têm estado visual de seleção** — classes idênticas. O usuário não sabe qual período está aplicado | comparação de `class` | 80% |
| A-07 | O período padrão da conta estava **24/04→23/07** com "hoje" em **27/07**: os 4 dias mais recentes ficam fora da visão padrão | valores dos campos | 60% — pode ser preferência persistida |
| A-08 | `syncAsaas(id)` é acionado **linha a linha**, manualmente, por cliente | 9 ocorrências no HTML | 75% |
| A-09 | As 7 perguntas sugeridas da Vivian IA respondem exatamente o que os cartões do dashboard já mostram | texto das sugestões | 70% |
| A-10 | Toda interação custa um round-trip completo ao servidor (605–1424 ms medidos) | `POST /livewire/update` | 90% |
| A-11 | **O Portal do Cliente autentica apenas com CPF/CNPJ**, sem senha nem segundo fator, com o slug da agência exposto na URL | tela `/portal/expansion-company` | 90% |
| A-12 | O Portal é um aplicativo próprio e enxuto (14,2 KB) — não reaproveita o layout pesado da área interna | medição direta | 85% |

**Retratado:** "os botões de período estão quebrados" — **falso**, refutado por teste direto. Ver Limitação nº 2.

---

## 11. PORTÃO DO ARTIGO 30 — VEREDITO

| Critério de saída | Status |
|---|---|
| Inventário completo das telas acessíveis | ✔ (menu principal) · Ø Portal do Cliente |
| Fluxos principais documentados | **✗ nenhum executado** |
| Componentes identificados | ✔ |
| Estados relevantes mapeados | **✗ zero provocados** |
| Hipóteses classificadas por confiança | ✔ |
| Fricções priorizadas | **✗ exige interação real** |
| Regras de negócio identificadas ou marcadas | ▲ parcial (3 literais) |
| Dependências principais compreendidas | ✔ |
| Riscos conhecidos registrados | △ parcial |
| Objetivos de redesign definidos e mensuráveis | **✗ não definidos com o dono** |

**Veredito: 4 de 10 critérios reprovados. Redesign proibido.** Confiança global ≈50%, contra o mínimo de 80%.

---

## 12. O QUE DESTRAVA O PORTÃO

1. **Corrigir o instrumento de clique** ou executar a passagem interativa manualmente, com registro de tela.
2. **Provocar e registrar estados** — abrir cada modal, submeter formulário vazio, forçar erro de validação, cair a sessão, simular rede lenta.
3. **Executar os 16 fluxos** da Camada 5 de ponta a ponta, cronometrando passos e cliques.
4. **Abrir o Portal do Cliente** — superfície inteira ainda invisível, e é a que o *cliente da agência* vê.
5. **Definir com o dono do produto** o objetivo mensurável do redesign. Sem isso, o Art. 43 impede converter tarefa em missão.

> Nota de acesso: a conta usada é `ROOT`. Nada fora do ambiente da própria Expansion foi acessado, e dados de outras agências não foram consultados.
