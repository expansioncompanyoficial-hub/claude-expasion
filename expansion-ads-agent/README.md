# EXPANSION ADS AGENT

Agente para criar, publicar, acompanhar e otimizar campanhas na **Meta Ads**
pela Marketing API, operado pelo Claude Code através de um servidor MCP próprio.

Sem CRM, sem navegador, sem automação de cliques, sem extensão, sem painel
externo. O Claude conversa com um servidor MCP local; o servidor conversa com a
Meta.

## A regra que organiza tudo

> **O Claude decide o quê. O código decide o que é permitido.**

O Claude interpreta briefing, monta estratégia, escreve copy e recomenda.
O código cuida de autenticação, validação, orçamento, permissão, chamadas à
Meta, duplicidade, aprovação, auditoria e limites.

Nenhuma decisão do modelo passa por cima de uma trava do código. As travas são
determinísticas e ficam no backend do MCP — o hook `PreToolUse` é só a segunda
camada.

### O que o sistema nunca faz

Alterar forma de pagamento · adicionar ou remover usuários · mexer em permissão
de Business Manager · transferir ativos · **excluir campanha, conjunto ou
anúncio** · usar conta não cadastrada · passar do orçamento autorizado ·
publicar sem validação · **ativar campanha sem aprovação humana válida** ·
gravar token em arquivo versionado.

---

## Índice

1. [Requisitos](#requisitos) · 2. [Instalação](#instalação) ·
3. [App na Meta](#criar-o-aplicativo-na-meta) · 4. [Variáveis](#variáveis-de-ambiente) ·
5. [Cadastrar cliente](#cadastrar-uma-cliente) · 6. [Briefing](#escrever-o-briefing) ·
7. [Criativos](#adicionar-criativos) · 8. [MCP no Claude Code](#ligar-o-mcp-ao-claude-code) ·
9. [Fluxo completo](#o-fluxo-completo) · 10. [Relatórios](#relatórios-e-métricas) ·
11. [Otimização](#otimização) · 12. [Comandos](#comandos) ·
13. [Problemas](#solução-de-problemas) · 14. [Credenciais](#rotacionar-credenciais) ·
15. [Novos modelos](#adicionar-um-modelo-de-campanha)

---

## Requisitos

| Item | Versão |
|---|---|
| Node.js | **>= 22.5** (usa `node:sqlite` nativo) |
| Conta | Business Manager com conta de anúncios ativa |
| Acesso | Usuário de sistema com permissão na conta e na Página |

Sem banco externo, sem Docker, sem serviço em nuvem.

## Instalação

```bash
cd expansion-ads-agent
npm install
npm run build
cp .env.example .env     # preencha localmente; o .env não é versionado
```

Verifique:

```bash
npm run lint && npm test && npm run campaign:dry-run -- --brief briefs/campaign.example.md
```

O dry-run funciona **sem nenhuma credencial**.

---

## Criar o aplicativo na Meta

1. Em **developers.facebook.com** → *Meus Apps* → *Criar app* → tipo **Empresa**.
2. Adicione o produto **Marketing API**.
3. Vincule o app ao seu **Business Manager** (*Configurações → Básico → Verificação da empresa*).
4. No **Business Manager** → *Configurações do negócio* → *Usuários do sistema*:
   - crie um usuário de sistema com papel **Admin**;
   - **Adicionar ativos** → conta de anúncios (*Gerenciar campanhas*) e Página (*Gerenciar Página*);
   - **Gerar token** selecionando o app e as permissões abaixo.

### Permissões necessárias

| Permissão | Para quê |
|---|---|
| `ads_management` | criar e alterar campanhas, conjuntos, criativos e anúncios |
| `ads_read` | ler campanhas e métricas (Insights) |
| `business_management` | enxergar os ativos do Business Manager |
| `pages_show_list` | listar as Páginas disponíveis |
| `pages_read_engagement` | usar a Página como identidade do anúncio |
| `instagram_basic` | usar o Instagram vinculado como identidade |
| `whatsapp_business_management` | apenas para campanhas de WhatsApp |

Prefira **token de usuário de sistema**: não expira junto com a sessão de uma
pessoa e continua válido se alguém sair da empresa.

> Enquanto o app estiver em *Desenvolvimento*, ele só opera em contas de
> anúncios ligadas ao mesmo Business Manager. Para o MVP, isso basta.

---

## Variáveis de ambiente

Tudo no `.env` (veja `.env.example`). As que importam:

| Variável | Padrão | O que faz |
|---|---|---|
| `META_ACCESS_TOKEN` | — | Token do usuário de sistema. **Só aqui.** |
| `META_GRAPH_API_VERSION` | `v26.0` | Versão da Graph API. Formato `vNN.N`. |
| `DRY_RUN` | `true` | `true` = nada sai do processo. |
| `META_APP_SECRET` | — | Necessário se usar `appsecret_proof`. |
| `META_REQUIRE_APPSECRET_PROOF` | `false` | Assina cada chamada. Recomendado em produção. |
| `META_REQUEST_TIMEOUT_MS` | `30000` | Timeout por requisição. |
| `META_MAX_RETRIES` | `4` | Tentativas em erro transitório. |
| `APPROVAL_TTL_HOURS` | `24` | Validade padrão da aprovação. |
| `OPERATOR_ID` | `operador-local` | Vai para a auditoria. |
| `HEADLESS_ENABLED` | `false` | Execução programática. |
| `AUTO_PAUSE_ENABLED` | `false` | Pausa automática. |
| `AUTO_SCALE_ENABLED` | `false` | Escala automática. |
| `AUTO_REACTIVATE_ENABLED` | `false` | Reativação automática. |

As quatro últimas nascem desligadas de propósito.

---

## Cadastrar uma cliente

Uma cliente existe quando existe `clients/<id>/config.json`.

```bash
mkdir -p clients/minha-cliente creatives/minha-cliente
cp clients/example-client/config.example.json clients/minha-cliente/config.json
```

Edite o arquivo:

```jsonc
{
  "id": "minha-cliente",              // igual ao nome da pasta
  "nome": "Loja da Cliente",
  "status": "active",                 // "inactive" bloqueia toda operação
  "meta": {
    "adAccountId": "act_1234567890",  // ÚNICA conta permitida
    "businessId": "1234567890",
    "pageId": "1234567890",
    "instagramId": "1234567890",
    "pixelId": "1234567890",
    "datasetId": null,
    "whatsapp": { "numero": "+55 11 90000-0000", "wabaId": null }
  },
  "dominio": "lojadacliente.com.br",
  "urlsPermitidas": ["https://lojadacliente.com.br"],
  "moeda": "BRL",
  "fusoHorario": "America/Sao_Paulo",
  "limites": { "diarioCents": 20000, "mensalCents": 400000 },
  "objetivosPermitidos": ["OUTCOME_LEADS", "OUTCOME_SALES"],
  "modelosPermitidos": ["whatsapp_conversas", "vendas_site"],
  "metas": { "cpaCents": 8000, "cplCents": 2500, "roas": 3 }
}
```

`limites` está em **centavos**: `20000` = R$ 200,00/dia.

Opcionais, lidos pelo Claude para escrever copy: `brand.md` (tom de voz,
proibições) e `offers.md` (produtos, preços, provas).

```bash
npm run client:validate -- --client minha-cliente
```

> A pasta `example-client` traz apenas `config.example.json`. Ela serve para
> dry-run e testes; **criação real com ela é recusada**.

---

## Escrever o briefing

Um arquivo Markdown em `briefs/`. A seção `## Dados` tem gramática estrita:
uma linha por campo, no formato `- chave: valor`.

```markdown
## Dados

- cliente: minha-cliente
- nome_campanha: Coleção Primavera — WhatsApp
- modelo: whatsapp_conversas
- objetivo_comercial: Gerar conversas qualificadas no WhatsApp
- produto_oferta: Coleção primavera a partir de R$ 89,90
- publico: Mulheres que compram roupa casual para o dia a dia
- regioes: BR
- faixa_etaria: 25-45
- generos: feminino
- interesses: moda feminina, compras online
- orcamento_diario: R$ 50,00
- data_inicio: 2026-09-01
- data_encerramento: 2026-09-30
- destino: whatsapp
- whatsapp: +55 11 90000-0000
- mensagem_whatsapp: Oi! Vi o anúncio e quero saber mais.
- meta: CPL: 25

## Criativos

- vestido-primavera.png
- blusa-linho.png

## Copies

### copy-vestido

- criativo: vestido-primavera.png
- titulo: Coleção primavera a partir de R$ 89,90
- descricao: Troca grátis em 30 dias
- texto: Chegou a coleção primavera. Chama no WhatsApp que a gente ajuda a escolher.
```

Campos por modelo: `vendas_site` usa `url`, `pixel_id` e `evento`;
`leads_formulario` usa `formulario_id`.
`meta` aceita `CPL:`, `CPA:`, `ROAS:`, `VENDAS:` ou `CONVERSAS:`.

**Se faltar campo obrigatório, o sistema para e diz exatamente o que falta.**
Ele nunca preenche por conta própria.

---

## Adicionar criativos

Coloque os arquivos em `creatives/<cliente>/` e cite o nome no briefing.

| Regra | Valor |
|---|---|
| Imagem | `.jpg`, `.jpeg`, `.png` · até 30 MB · mínimo 600×600 |
| Vídeo | `.mp4`, `.mov` · até 1 GB |

O sistema calcula hash SHA-256 de cada arquivo — o mesmo arquivo não sobe duas
vezes, e ele avisa se o criativo já foi usado antes pela mesma cliente.

**Ele nunca altera imagem ou vídeo.** Se o arquivo não cumpre o requisito, você
recebe o relatório do problema e o fluxo para.

---

## Ligar o MCP ao Claude Code

O `.mcp.json` na raiz já declara o servidor:

```json
{
  "mcpServers": {
    "meta-ads": {
      "command": "node",
      "args": ["dist/mcp/server.js"],
      "env": { "NODE_NO_WARNINGS": "1" }
    }
  }
}
```

Abra o Claude Code **dentro de `expansion-ads-agent/`** e aprove o servidor.
Confira com `/mcp` — devem aparecer 30 ferramentas `meta_*`.

Rodando o servidor à mão: `npm run mcp:start` (build) ou `npm run mcp:dev`
(direto do TypeScript). Ele fala JSON-RPC pelo stdout; **todo log vai para
stderr**.

### Usar `/subir-campanha`

```
/subir-campanha briefs/colecao-primavera.md
```

A skill (`.claude/skills/subir-campanha/SKILL.md`) conduz: ler briefing →
carregar cliente → validar → consultar ativos na Meta → estratégia → copies →
dry-run → confirmar → criar pausado → conferir na Meta → pedir aprovação →
ativar → relatório.

Há também o agente **auditor** (`.claude/agents/auditor.md`), somente leitura:
confere conta, orçamento, público, datas, links, criativos, objetivo,
quantidade de anúncios, políticas, duplicidade, IDs e status pausado. Ele não
ativa nem modifica nada.

---

## O fluxo completo

```
DRAFT → VALIDATING → VALIDATED → CREATING → CREATED_PAUSED
      → WAITING_APPROVAL → APPROVED → ACTIVATING → ACTIVE → PAUSED → COMPLETED

falhas: VALIDATION_FAILED · CREATION_FAILED · ACTIVATION_FAILED
```

Transição fora dessa tabela é recusada — inclusive atalhos que "fariam
sentido", como pular `WAITING_APPROVAL`.

### 1. Dry-run (não cria nada)

```bash
npm run campaign:dry-run -- --brief briefs/colecao-primavera.md
```

Valida tudo, monta a estrutura completa, simula os objetos da Meta, mostra as
chamadas que *seriam* feitas e salva o plano em `reports/planos/`.

### 2. Criar pausado (cria de verdade)

```bash
npm run campaign:create -- --brief briefs/colecao-primavera.md --confirmar
```

`--confirmar` é o que tira aquele comando do dry-run. É uma decisão explícita
do operador no terminal — o modelo não tem como fornecê-la.

Cria na ordem oficial da Meta — campanha → conjunto → upload dos ativos →
criativo → anúncio — e depois **consulta a Meta** para confirmar o que existe.
Tudo nasce `PAUSED`.

Falha no meio: nada é excluído, os IDs criados ficam gravados, e rodar de novo
retoma exatamente de onde parou.

### 3. Conferir

```bash
npm run campaign:status -- --campaign-id cmp_2026-09-01_a1b2c3d4
npm run campaign:audit  -- --campaign-id cmp_2026-09-01_a1b2c3d4
```

### 4. Aprovar (humano, no terminal)

```bash
npm run campaign:approve -- --campaign-id cmp_2026-09-01_a1b2c3d4 --by "Nicolas"
```

Devolve um código `APV-XXXXX-XXXXX-XXXXX-XXXXX`. A aprovação registra quem
aprovou, quando, validade, orçamento aprovado, resumo, IDs da Meta e um
**fingerprint** do estado da campanha.

### 5. Ativar

```bash
npm run campaign:activate -- --campaign-id cmp_2026-09-01_a1b2c3d4 --code APV-... --confirmar
```

A ativação é recusada se a aprovação estiver **vencida**, **já usada**,
**revogada**, se o **orçamento** mudou, se a **campanha mudou** depois de
aprovada (fingerprint), se os **criativos** mudaram, se a conta for outra ou se
faltar ID confirmado na Meta.

### 6. Pausar

```bash
npm run campaign:pause -- --campaign-id cmp_2026-09-01_a1b2c3d4 --motivo "CPL acima da meta" --confirmar
```

Pausar revoga as aprovações pendentes: reativar exige aprovação nova.

---

## Relatórios e métricas

```bash
npm run insights     -- --client minha-cliente --period today
npm run insights     -- --client minha-cliente --period last-7-days
npm run report:daily -- --client minha-cliente
```

Períodos: `today`, `yesterday`, `last-3-days`, `last-7-days`, `last-14-days`,
`last-28-days`, `last-30-days`, `this-month`, `last-month`, `maximum`
(e os equivalentes em português).

Métricas: investimento, alcance, impressões, frequência, CPM, cliques, CTR,
CPC, conversas, leads, compras, CPL, CPA, receita, ROAS, status e anúncios com
erro ou sem entrega.

**Métrica que a Meta não devolveu aparece como "indisponível", nunca como
zero.** Os campos pedidos variam conforme o objetivo. Relatórios vão para
`reports/`.

---

## Otimização

```bash
npm run optimize:recommend -- --client minha-cliente --period last-7-days
```

Recomenda: **manter**, **pausar**, **reduzir**, **escalar**, **criar nova
variação**, **revisar criativo**, **revisar público** — e lista as guardas que
impedem aplicar aquilo automaticamente.

Guardas em `policies/optimization-policy.json`: investimento mínimo, resultados
mínimos, janela de análise, limite percentual de alteração, espera entre
mudanças, máximo de alterações diárias, teto de orçamento, aprovação exigida e
disponibilidade dos dados.

`exigirAprovacao: true` garante que **nenhuma recomendação é automatizável**,
mesmo com as flags `AUTO_*` ligadas.

---

## Comandos

| Comando | O que faz |
|---|---|
| `npm run db:init` | cria o banco local |

## EXPANSION ADS — a plataforma visual

Central de Inteligência e Gestão de Tráfego. Interface web sobre o mesmo
backend da CLI e do MCP: as três portas falam com os mesmos serviços e
respeitam as mesmas travas.

### Subir

```bash
npm run web:build     # instala e compila o frontend (uma vez, ou após git pull)
npm run web           # sobe a plataforma em http://localhost:4000
```

Antes do primeiro acesso, crie um usuário. A senha entra por variável de
ambiente, nunca por argumento — argumento fica no histórico do shell:

```bash
EXPANSION_USER_PASSWORD='sua-senha-longa' npm run user:create   --email voce@agencia.com --nome "Seu Nome" --papel admin
```

Papéis, do menor para o maior: `visualizador` (só lê) · `operador` (rascunho,
upload, dry-run, criar pausada) · `gestor` (aprovar, ativar, pausar) · `admin`
(usuários e configuração). Nenhum papel exclui nada — a operação não existe no
backend, então também não existe na interface.

### O caminho na tela

Selecionar cliente → Nova campanha → objetivo comercial → estratégia → destino
→ criativos → copy → público → posicionamentos → orçamento → revisão →
dry-run → criar pausada → aprovar → ativar.

A pergunta da etapa 2 é **"o que esta campanha precisa gerar para a cliente?"**,
não "qual optimization_goal você quer". A tradução para a estrutura da Meta vem
do backend: se um modelo mudar de objetivo técnico, a interface acompanha sem
alteração. Objetivo sem modelo implementado aparece como indisponível, com o
motivo — nunca como opção que falha depois.

### O que a plataforma não faz

- **Não cria campanha ativa.** Não existe caminho no código que faça isso.
- **Não ativa sem aprovação.** O código de aprovação vale uma vez, expira, e é
  recusado se a campanha mudou depois de assinada.
- **Não inventa métrica.** Sem credencial ou sem entrega, o número aparece como
  `—` com o motivo, nunca como zero.
- **Não manda token para o navegador.** O `META_ACCESS_TOKEN` fica no `.env` do
  servidor. A tela mostra só a marca dele (`EAA***ab (len=210)`).
- **Não analisa criativo por visão computacional.** Proporção, formato e
  tamanho são lidos do arquivo; gancho, legibilidade e clareza da oferta são
  declarados como *não avaliados* em vez de simulados.

### Gestor IA

Camada determinística: mesma entrada, mesma recomendação. Avalia estrutura,
verba, público e compatibilidade de criativo com regras de gestor de tráfego,
sobre dados reais do cadastro e do briefing.

Toda saída é carimbada com a origem — **dado real**, **cálculo**,
**recomendação** ou **inferência** —, para o operador saber, sem esforço, o que
é número da Meta e o que é palpite. Um adaptador de modelo de linguagem pode
ser plugado em `src/advisor/` sem que nenhuma tela mude.

### Verificação visual

```bash
node scripts/verificacao-visual.mjs <pasta-de-saida>   # telas + overflow em 7 larguras
node scripts/fluxo-e2e.mjs <pasta-de-saida>            # fluxo completo até o dry-run
```

Ambos exigem o servidor no ar. Nenhum toca a Meta.


| `npm run web` | sobe a plataforma EXPANSION ADS |
| `npm run web:build` | compila o frontend |
| `npm run user:create` | cadastra um acesso à plataforma |
| `npm run user:list` | lista os acessos |
| `npm run meta:validate-access` | confere se o token funciona e o que ele enxerga |
| `npm run meta:discover` | lista Páginas, Instagram e pixels para preencher o cadastro |
| `npm run client:list` | lista clientes cadastradas |
| `npm run client:validate` | valida o cadastro de uma cliente |
| `npm run campaign:validate` | valida um briefing sem simular |
| `npm run campaign:dry-run` | simulação completa, sem tocar a Meta |
| `npm run campaign:create` | cria a estrutura PAUSADA (`--confirmar`) |
| `npm run campaign:status` | estado interno + estado na Meta |
| `npm run campaign:audit` | auditoria somente leitura |
| `npm run campaign:approve` | registra aprovação humana |
| `npm run campaign:activate` | ativa com aprovação válida (`--code`, `--confirmar`) |
| `npm run campaign:pause` | pausa e revoga aprovações |
| `npm run insights` | métricas por período |
| `npm run report:daily` | relatório diário em `reports/` |
| `npm run optimize:recommend` | recomendações |
| `npm run mcp:start` | servidor MCP |
| `npm run build` · `lint` · `test` | build, lint e testes |

### Argumentos comuns

`--brief <arquivo>` · `--client <id>` · `--campaign-id <id>` · `--code <APV-...>` ·
`--by <nome>` · `--motivo <texto>` · `--period <periodo>` · `--json` ·
`--confirmar` (sai do dry-run) · `--confirmar-duplicidade`

`npm run cli -- help` lista tudo.

### Códigos de saída

| Código | Significado |
|---|---|
| `0` | sucesso |
| `1` | erro interno |
| `2` | validação, estado inválido ou não encontrado |
| `3` | bloqueio de política |
| `4` | conta ou cliente não autorizada |
| `5` | problema de aprovação |
| `6` | duplicidade detectada |
| `7` | erro da Meta (inclui rate limit) |
| `8` | configuração inválida |

São estáveis: script pode depender deles.

---

## Solução de problemas

| Sintoma | Causa provável | O que fazer |
|---|---|---|
| `META_ACCESS_TOKEN nao esta configurado` | sem `.env` | copie `.env.example` e preencha |
| Código **190** | token inválido ou expirado | gere token novo do usuário de sistema |
| Código **200** | sem permissão | confira escopos e o acesso do usuário de sistema à conta e à Página |
| Código **100** | parâmetro inválido nesta versão | confira o campo citado e `META_GRAPH_API_VERSION` |
| Código **4 / 17 / 613** | rate limit | o sistema já espera o tempo informado pela Meta; reduza a frequência |
| `Conta de anuncios nao autorizada` | conta ≠ cadastro | corrija `clients/<id>/config.json` |
| `Destino nao autorizado` | URL fora da allowlist | adicione em `urlsPermitidas` (https, sem encurtador) |
| `Briefing incompleto` | campo obrigatório ausente | a mensagem lista exatamente o que falta |
| `Possivel duplicidade detectada` | campanha equivalente já existe | confira; se for intencional, `--confirmar-duplicidade` |
| `Ativacao bloqueada` | aprovação ausente, vencida, usada ou campanha alterada | a mensagem diz qual dos casos |
| `Escrita bloqueada em dry-run` | `DRY_RUN=true` | use `DRY_RUN=false` conscientemente |
| Nada acontece na Meta | dry-run ligado | é o padrão, e é proposital |

Logs em `logs/agent-AAAA-MM-DD.log` (JSON por linha, sem segredos).
Trilha completa na tabela `action_logs` do banco.

---

## Rotacionar credenciais

1. Business Manager → *Usuários do sistema* → **Gerar novo token**.
2. Atualize `META_ACCESS_TOKEN` no `.env`.
3. Confirme com `npm run meta:validate-access` (ou a ferramenta
   `meta_validate_access` no Claude Code).
4. Revogue o token antigo no Business Manager.

O token nunca é gravado em disco pelo sistema, nunca aparece em log, nunca vai
em query string (viaja no cabeçalho `Authorization`) e nunca é devolvido por
ferramenta MCP — no máximo uma marca do tipo `EAA***bc (len=210)`.

Suspeita de vazamento: revogue primeiro, investigue depois.

---

## Adicionar um modelo de campanha

Modelos vivem em `src/campaigns/templates/`. Os três atuais —
`whatsapp_conversas`, `leads_formulario`, `vendas_site` — compartilham a lógica
central em `base.ts`.

1. Confirme na **documentação oficial atual da Meta** quais objetivo,
   `destination_type`, `optimization_goal`, `billing_event` e `promoted_object`
   são válidos para o que você quer.
2. Crie `src/campaigns/templates/meu-modelo.ts` implementando `CampaignTemplate`.
3. Registre em `templates/index.ts`.
4. Adicione o nome em `policies/global-policy.json` → `modelosPermitidos`
   e no `modelosPermitidos` da cliente.
5. Escreva o teste.

Não duplique a lógica central: campos comuns, orçamento, agendamento,
segmentação e status pausado já estão em `base.ts`.

---

## Estrutura

```
expansion-ads-agent/
├── CLAUDE.md               regras operacionais para o Claude
├── .mcp.json               declaração do servidor MCP
├── clients/<id>/           cadastro, marca e ofertas por cliente
├── briefs/                 briefings
├── creatives/<id>/         imagens e vídeos
├── policies/               global · budget · approval · optimization
├── src/
│   ├── mcp/                servidor e as 30 ferramentas
│   ├── meta/               cliente Graph, gateway, simulador, erros
│   ├── campaigns/          briefing, templates, máquina de estados, criação
│   ├── creatives/          leitura, hash e validação de arquivos
│   ├── approvals/          aprovação, token e fingerprint
│   ├── policies/           motor determinístico de políticas
│   ├── optimization/       motor de recomendação
│   ├── reports/            insights e renderização
│   ├── database/           driver, schema e repositórios
│   ├── security/           allowlist, idempotência, segredos
│   ├── logging/            log estruturado, redação, auditoria
│   ├── cli/                comandos de terminal
│   └── jobs/               execução headless (desligada por padrão)
├── .claude/                skill, agentes, hook PreToolUse
├── tests/                  unitários e de integração (mocks da Meta)
├── docs/                   decisões técnicas
├── logs/  reports/  data/  saída local (não versionada)
```

## Documentos relacionados

- [`CLAUDE.md`](CLAUDE.md) — como o Claude deve operar aqui
- [`docs/technical-decisions.md`](docs/technical-decisions.md) — decisões e o porquê
- [`.claude/skills/subir-campanha/SKILL.md`](.claude/skills/subir-campanha/SKILL.md) — o passo a passo

## Testes

```bash
npm test
```

173 testes, todos com a Meta mockada. **Nenhum teste toca a rede** — o `fetch`
global é substituído por uma trava que falha o teste na hora.
