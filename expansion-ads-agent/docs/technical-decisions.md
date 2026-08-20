# Decisões técnicas — EXPANSION ADS AGENT

Registro do que foi decidido, por quê, e o que foi descartado. Cada decisão
tem data e o gatilho que a provocou.

---

## D1 — Versão da Graph API: v26.0, configurável

**Decisão.** `META_GRAPH_API_VERSION` no `.env`, padrão `v26.0`, validada
contra `^v\d+\.\d+$` no boot.

**Por quê.** v26.0 é a versão corrente da Graph/Marketing API (lançada em
29/07/2026). As mudanças que ela traz e que afetam este sistema:

- posicionamento *Instagram Explore Feed* passou a retornar erro;
- *Messenger Stories* é silenciosamente removido do payload;
- conjuntos em categoria especial exigem sinalização explícita de público
  Advantage+;
- 47 endpoints de Commerce Order Management foram bloqueados (não usamos).

Essas mudanças se estendem às demais versões suportadas em 27/10/2026.

**Consequência.** Nenhum posicionamento é fixado no código: os conjuntos são
criados sem `publisher_platforms`, deixando a Meta decidir. Isso evita
justamente a classe de erro que a v26.0 introduziu.

**Descartado.** Fixar a versão no código. A Meta descontinua versões a cada
~12 meses; a variável de ambiente permite subir de versão sem recompilar e
permite voltar atrás se uma versão nova quebrar algo.

> A documentação oficial da Meta (`developers.facebook.com`) está bloqueada
> pela política de egress deste ambiente. As confirmações de versão vieram de
> fontes secundárias. **Antes do primeiro teste real, confirme na documentação
> oficial** os campos usados em `src/campaigns/templates/`.

---

## D2 — Objetivos ODAX apenas, sem nomes legados

**Decisão.** `src/meta/constants.ts` lista somente `OUTCOME_*`.

**Por quê.** Os objetivos antigos (`MESSAGES`, `CONVERSIONS`, `LINK_CLICKS`,
`LEAD_GENERATION` como objetivo) foram substituídos pelo ODAX. Aceitar um nome
legado produziria erro na criação — e pior, produziria erro *só na hora de
criar*, depois de o operador já ter revisado tudo.

**Consequência.** `PolicyEngine.evaluateObjective` reprova nome legado na
validação, antes de qualquer chamada. Há teste para isso.

---

## D3 — Persistência: `node:sqlite`, atrás de uma porta

**Decisão.** Driver SQLite pelo módulo nativo do Node (>= 22.5), atrás da
interface `SqlDriver` (`src/database/driver.ts`).

**Por quê.** `better-sqlite3` exige compilação de módulo nativo — um ponto de
falha na instalação em máquina nova, exatamente onde não se quer atrito.
`node:sqlite` vem no runtime e tem zero dependências.

**Consequência.** Todos os repositórios falam com `SqlDriver`, nunca com
SQLite direto. Migrar para Postgres é escrever um driver novo; nenhum
repositório muda.

**Risco aceito.** `node:sqlite` ainda emite `ExperimentalWarning`. A API é
mínima (`exec`/`prepare`/`run`/`get`/`all`) e estável na prática. Se ela
mudar, o dano fica contido em um arquivo.

---

## D4 — Dry-run é o padrão, e é uma trava, não um modo de exibição

**Decisão.** `DRY_RUN=true` por padrão. Em dry-run, `MetaGateway`
**lança exceção** em qualquer escrita (`assertWriteAllowed`) em vez de apenas
não executá-la.

**Por quê.** Um modo de simulação que "esquece" de simular em um caminho é
pior que não ter modo nenhum. Falhar alto garante que um caminho de escrita
novo não passe despercebido pelo dry-run.

**Consequência.** Todo caminho de escrita passa pelo gateway. Teste garante
zero requisições de rede num dry-run completo.

---

## D5 — ID simulado nunca conta como objeto criado

**Decisão.** `isRealMetaId()` (`src/meta/simulator.ts`); IDs simulados levam
prefixo `dryrun_`.

**Por quê.** *Encontrado em teste.* A lógica de retomada perguntava
"esse objeto já tem ID da Meta?". Depois de um dry-run, os filhos ficavam com
IDs simulados gravados — e a execução seguinte os considerava criados. Duas
consequências: o dry-run passou a relatar 1 chamada em vez de 8, e uma criação
real depois de um dry-run teria ligado uma campanha real a IDs inexistentes.

**Consequência.** A pergunta agora é "esse objeto tem ID **real** da Meta?".
Aplicada em campanha, conjunto, criativo, anúncio e uploads.

---

## D6 — Sem `meta_raw_request`

**Decisão.** 30 ferramentas específicas. Nenhuma aceita caminho, método ou
corpo arbitrário.

**Por quê.** Uma ferramenta genérica anula todas as outras travas: com ela o
modelo poderia criar campanha ativa, mudar orçamento ou excluir objeto sem
passar por política nenhuma.

**Consequência.** Adicionar capacidade nova custa escrever uma ferramenta com
schema. É o custo que se quer ter. Há teste que reprova qualquer ferramenta
cujo nome contenha `raw`, `exec`, `eval` ou `proxy`.

---

## D7 — Ferramentas de leitura não aceitam conta de anúncios

**Decisão.** `meta_list_campaigns`, `meta_list_adsets`, `meta_list_ads` e
`meta_get_insights` derivam a conta do cadastro da cliente. As cinco que
precisam recebê-la (`meta_get_account_details`, os dois uploads,
`meta_create_creative`, `meta_create_ad_paused`) chamam
`assertAdAccountAllowed` antes de qualquer outra coisa.

**Por quê.** Parâmetro que não existe não pode ser preenchido errado. Onde o
parâmetro é inevitável, a trava é a primeira linha do handler.

---

## D8 — Aprovação: fingerprint, uso único, prazo

**Decisão.** Aprovar grava um registro com token `APV-...`, prazo de validade,
orçamento aprovado e um **fingerprint** do estado da campanha. Ativar exige
token válido, não vencido, não consumido, e fingerprint idêntico.

**Por quê.** Aprovar "a campanha" sem fixar *o que* foi aprovado permite a
troca silenciosa: aprova-se R$ 50/dia, muda-se para R$ 500/dia, ativa-se com a
mesma aprovação. O fingerprint cobre conta, objetivo, orçamento, datas,
destino, público, IDs da Meta e hashes dos criativos.

**Consequência.** Qualquer alteração depois da aprovação invalida a aprovação.
Cinco testes cobrem: ausente, vencida, reutilizada, alterada e criativos
trocados.

---

## D9 — Aprovar é comando de terminal, não ferramenta MCP

**Decisão.** `npm run campaign:approve` registra a aprovação. O MCP tem
`meta_request_campaign_approval` (pedir) e `meta_activate_approved_campaign`
(ativar com um código que já existe), mas **não** tem ferramenta de aprovar.

**Por quê.** Se o modelo pudesse aprovar, a aprovação humana seria decorativa.
O código não deve confiar que o modelo não vai se auto-aprovar; deve tornar
isso impossível.

---

## D10 — Exclusão não existe

**Decisão.** Não há caminho para `DELETE` nem para `status: DELETED`/`ARCHIVED`.
Falha parcial deixa tudo pausado e registrado.

**Por quê.** Rollback automático numa API de terceiros é como perder trabalho:
uma falha no anúncio 2 não deve destruir campanha, conjunto e anúncio 1 que já
existem. Pausado e registrado é recuperável; excluído não é.

**Consequência.** `EFFECTIVE_STATUSES` tem só `ACTIVE` e `PAUSED`. Teste
verifica que nenhum cenário emite `DELETE`.

---

## D11 — Redação de segredo em duas camadas

**Decisão.** Registro em memória dos segredos conhecidos (`security/secrets.ts`)
+ reconhecimento por padrão (`EAA…`, `access_token=`, `Bearer …`) e por nome de
chave (`token`, `secret`, `senha`, `authorization`…), aplicado em
`logging/redact.ts`.

**Por quê.** Só o registro não pega token de outra origem. Só o padrão não pega
um token com formato diferente. As duas camadas juntas cobrem os dois casos.

**Consequência.** Toda saída — log, trilha de auditoria, resposta MCP, registro
de chamada, arquivo de plano — passa por `redact()`. O token vai no cabeçalho
`Authorization`, nunca na query string.

---

## D12 — Erro só é reexecutado quando faz sentido

**Decisão.** Retry com backoff exponencial (teto 60s) apenas para: HTTP 5xx,
timeout, e códigos transitórios da Meta (1, 2, 341, 368). Rate limit (4, 17,
32, 613, 800xx) espera o tempo que a própria Meta informa em
`x-business-use-case-usage` ou `retry-after`.

**Por quê.** Repetir erro 190 (token inválido) ou 100 (parâmetro inválido) só
gasta cota e atrasa o diagnóstico.

**Corrigido durante os testes.** `RateLimitError` declarava `name` como getter
e o construtor de `AppError` fazia `this.name = ...` — o construtor lançava
`TypeError` e *todo* rate limit era reportado como "falha de rede". Achado pelo
teste de rate limit.

---

## D13 — Validação reprovada não gasta cota da API

**Decisão.** A consulta de duplicidade na Meta só acontece se não houver
nenhum bloqueio na validação.

**Por quê.** Se a campanha já está reprovada, nada será criado. Consultar a
Meta só enriquece um relatório que já falhou, gastando cota de rate limit.

---

## D14 — Repetir `campaign:create` é no-op, não erro

**Decisão.** Se a campanha já está em estado com objetos na Meta e tem ID real,
`criarCampanha` devolve o que existe, sem tocar na rede.

**Por quê.** *Encontrado em teste.* Antes, repetir o comando estourava
`Transicao de estado invalida: CREATED_PAUSED -> CREATING` — mensagem que não
ajuda ninguém, num caso que é justamente o que a idempotência deveria cobrir.

**Consequência.** A tabela de transições continua estrita; o caso "já feito" é
tratado antes de tentar transicionar.

---

## D15 — Métrica ausente é `null`, nunca `0`

**Decisão.** `normalizeInsightRow` devolve `null` para métrica que a Meta não
retornou e lista o nome em `indisponiveis`.

**Por quê.** A Ads Insights API omite o campo quando não houve o evento. Tratar
ausência como zero produz relatório com "0 compras" quando o correto é "não
temos esse dado" — e faria o motor de otimização recomendar pausa por um dado
que não existe.

**Consequência.** `exigirDadosCompletos` na política bloqueia automação quando
há métrica indisponível. Teste distingue zero real de ausência.

---

## D16 — Motor de otimização recomenda, nunca aplica

**Decisão.** `OptimizationEngine.avaliar()` devolve ação recomendada +
`bloqueadoPor` (guardas pendentes) + `automatizavel`. `exigirAprovacao: true`
na política garante que `bloqueadoPor` nunca fica vazio.

**Por quê.** O pedido é explícito: nada automático por padrão. Mas "desligado
por flag" é frágil — basta alguém ligar a flag. Com a guarda de aprovação
sempre presente, ligar as flags ainda não basta.

**Consequência.** Teste verifica que, mesmo com as três flags ligadas, uma
guarda pendente impede automação.

---

## D17 — Dependências mínimas

**Decisão.** Runtime: `@modelcontextprotocol/sdk`, `zod`, `dotenv`. Nada mais.

**Por quê.** HTTP, multipart, SQLite, hash, parsing de argumentos e leitura de
arquivo já existem no Node 22. Cada dependência a mais é superfície de ataque
e mais uma coisa para manter.

**Consequência.** `fetch`, `FormData`, `node:sqlite`, `node:crypto` e
`util.parseArgs` nativos.

---

## D18 — Diagnóstico de acesso: comando de terminal + erro como resposta

**Decisão.** `verificarAcesso()` em `src/meta/access.ts`, compartilhado pela
ferramenta MCP `meta_validate_access` e pelo comando
`npm run meta:validate-access`. Uma falha na consulta à Meta vira item em
`problemas`, não exceção.

**Por quê.** *Encontrado ao guiar a primeira integração real.* Depois de
colocar o token no `.env`, a única forma de saber se ele funcionava era subir o
MCP — duas coisas novas de uma vez, e quando falha não dá para saber qual das
duas quebrou. Um comando de terminal isola "a credencial está boa?" de "o MCP
está ligado?".

E numa ferramenta de diagnóstico, erro da Meta **é** a resposta: token
inválido, expirado ou sem permissão é exatamente o que ela existe para
relatar. Estourar exceção transformava o diagnóstico em mais um problema para
diagnosticar. Agora o código 190 vira "A Meta recusou a consulta com este
token" seguido do caminho de correção.

**Consequência.** Sem `--client`, o comando também lista as contas que o token
enxerga — é assim que se descobre o `adAccountId` para o cadastro, sem caçar ID
na interface do Gerenciador. Quatro testes cobrem: token ausente, token válido,
token inválido e token sem ativos.

---

## D19 — Descoberta de ativos pelo terminal

**Decisão.** `npm run meta:discover` lista Páginas, contas do Instagram
vinculadas e pixels de uma conta, no formato que `config.json` pede.

**Por quê.** *Encontrado ao guiar a primeira integração real.* Depois do token
validado, os IDs restantes só existiam nas ferramentas MCP
(`meta_list_pages`, `meta_list_instagram_accounts`,
`meta_list_pixels_or_datasets`). Isso obrigava a subir o MCP só para preencher
um arquivo de cadastro — ou a caçar ID na interface do Gerenciador, que foi
exatamente o tipo de fricção que custou caro nesta sessão.

**Consequência.** O caminho do zero até a primeira campanha não passa mais pela
interface da Meta em nenhum momento depois do token:
`meta:validate-access` → `meta:discover` → escreve `config.json` →
`campaign:dry-run`. O Instagram é consultado por Página, então a busca é
limitada às primeiras 25 Páginas e avisa quando trunca — sem cap silencioso.

---

## D20 — Descoberta de Páginas pelo Business Manager

**Decisão.** `meta:discover` consulta `me/accounts`, `me/businesses`,
`{business}/owned_pages` e `{business}/client_pages`, unindo por id e marcando
a origem de cada Página.

**Por quê.** *Encontrado ao conectar a primeira cliente real.* A conta de
anúncios da cliente aparecia, mas nenhuma Página dela — e sem `page_id` não
existe criativo, logo não existe anúncio. A causa era a implementação:
`me/accounts` só devolve Páginas onde a **pessoa** tem papel direto. Numa
agência, a Página da cliente chega pelo Business Manager, como ativo próprio
ou compartilhado pela cliente. Consultar só `me/accounts` torna a Página da
cliente invisível — o caso mais comum de todos numa operação de agência.

**Consequência.** Uma borda indisponível (permissão faltando em `owned_pages`,
por exemplo) não derruba a outra: cada uma é consultada em `try` isolado, e o
que falhou vira log de debug em vez de erro fatal. Dois testes cobrem: Página
encontrada só via `client_pages`, e uma borda com erro sem afetar a outra.

---

## D21 — Plataforma web sobre o backend existente

**Decisão.** Três adições, nada removido: camada HTTP (`src/api/`),
autenticação com papéis, e compositor de briefing. Todo o resto — validação,
políticas, criação, aprovação, insights, otimização — é reaproveitado sem
alteração.

**O compositor foi a decisão central.** Todo o caminho de escrita do backend
fala `briefPath`. O assistente produz dados estruturados. Havia duas saídas:
dar à interface a própria validação de briefing, ou serializar os dados no
mesmo markdown canônico e seguir pelo caminho existente. A primeira criaria
duas verdades que divergiriam na primeira mudança de regra. Escolhida a
segunda: `comporBriefingMarkdown` gera o arquivo, `parseBriefMarkdown` o lê, e
daí em diante o fluxo é idêntico ao da CLI. Efeito colateral desejado: todo
briefing feito pela interface vira arquivo em `briefs/`, inspecionável e
reexecutável pelo terminal.

**Sem framework HTTP.** O projeto já evita dependência em todo lugar
(`parseArgs` na CLI, `node:sqlite` no banco, `fetch` nativo na Meta). Um
roteador de ~180 linhas sobre `node:http` mantém essa linha; trazer Express
para servir 30 rotas seria a dependência mais pesada do repositório.

**Autenticação criada do zero** porque não existia: o backend nascera para um
operador só, via CLI e MCP stdio. Sessão em SQLite, senha com `scrypt`,
`users.json` fora do git, quatro papéis hierárquicos. Nenhum papel apaga nada
— a operação não existe no backend, então também não existe na interface.

## D22 — Erro de schema é 422, não 500

**Decisão.** `respostaDeErro` converte `ZodError` em `ValidationError` antes
de mapear para HTTP.

**Por quê.** *Encontrado pelos testes de integração da API.* Um corpo
malformado subia como exceção crua e virava 500 — culpando o servidor por um
erro de quem chamou, e sem dizer qual campo estava errado. Agora devolve 422
com a lista de campos e problemas.

## D23 — A redação de log apagava a marca do token

**Decisão.** O campo virou `impressaoDigital` em vez de `marcaDoToken`.

**Por quê.** *Encontrado pelos testes.* O redator apaga qualquer chave que
contenha "token" — proteção correta e deliberadamente grosseira. Só que o
valor (`EAA***ab (len=210)`) existe justamente para ser exibido: ele já nasce
sem revelar o segredo. A rede de segurança continua tão estrita quanto era; o
nome do campo é que parou de tropeçar nela. Renomear foi preferível a abrir
exceção na redação — exceção em rede de segurança é como ela deixa de proteger.

## D24 — O que a interface valida e o que o backend valida

**Decisão.** A interface valida para não deixar o operador andar até uma
parede. O backend valida porque é ele quem recusa.

**Por quê.** *Dois defeitos encontrados pelo teste E2E.* O primeiro: o campo de
WhatsApp exibia o número do cadastro por *fallback visual*, sem colocá-lo no
estado do formulário — resultado, campo visivelmente preenchido e erro dizendo
que faltava preencher. Corrigido semeando o estado, não a aparência. O
segundo: `meta` é obrigatório em `CAMPOS_OBRIGATORIOS`, mas o assistente
deixava chegar à etapa 10 sem ele; o backend recusava corretamente, só que
depois de dez etapas preenchidas.

A regra que ficou: quando o backend exige um campo, o assistente exige na etapa
onde ele aparece. A autoridade continua sendo o backend — uma requisição
forjada bate na mesma parede.

---

## D25 — Tudo pela plataforma: ativação e cadastro de cliente

**Decisão.** A ativação e o cadastro de cliente passaram a existir na
interface. O terminal deixa de ser obrigatório para operar.

**Por quê.** *Encontrado ao auditar quais rotas tinham cobertura de tela.* O
endpoint `POST /api/campaigns/:id/activate` existia desde o início, mas nenhuma
tela o usava: aprovar era possível na plataforma, ativar só por
`npm run campaign:activate`. Um fluxo partido no passo mais delicado.

O cadastro de cliente tinha o mesmo problema por outro caminho: exigia editar
`clients/<id>/config.json` à mão e caçar IDs na interface do Gerenciador — a
fricção que este sistema existe para eliminar. Agora `GET /api/meta/discover`
une `me/accounts`, `owned_pages` e `client_pages`, e o formulário grava o
arquivo com o mesmo `clientConfigSchema` que a CLI usa.

**A tela de ativação repete o que importa antes de habilitar o botão:** cliente,
conta, orçamento diário, orçamento total, número de anúncios e janela. Exige o
código da aprovação e uma confirmação explícita de que a campanha pode gerar
cobrança real. As travas continuam no backend — a tela só para de deixar o
operador chegar até elas sem contexto.

**O que continua fora da plataforma, de propósito:** o `META_ACCESS_TOKEN` vive
no `.env` do servidor e nunca é editável pela web; criar usuário é
`npm run user:create`, porque uma tela que cria o próprio acesso é uma tela que
pode ser usada para escalar privilégio.

## D26 — Sem credencial é estado, não erro

**Decisão.** `/api/meta/discover` devolve `200` com `disponivel: false` e o
motivo, em vez de `503`.

**Por quê.** *Encontrado na verificação visual: erro de console numa tela que
já tratava o caso.* Falta de token é situação esperada — a tela mostra o aviso
e degrada os seletores para campos de texto, para o cadastro seguir à mão. Um
`503` transformava isso em erro registrado no navegador. `/api/insights` já
usava o contrato de estado; agora a descoberta usa o mesmo.
