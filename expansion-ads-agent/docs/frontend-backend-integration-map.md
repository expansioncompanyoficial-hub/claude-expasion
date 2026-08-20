# Mapa de integração — EXPANSION ADS

Como cada tela da plataforma se liga ao backend que já existia. Este documento
é o contrato: nenhuma tela inventa endpoint, e nenhum endpoint duplica regra
que já mora em `src/campaigns`, `src/approvals`, `src/policies` ou
`src/optimization`.

## Auditoria do que já existia

| Item | Achado |
|---|---|
| Linguagem | TypeScript (ESM, `module: NodeNext`), Node ≥ 22.5 |
| Framework | Nenhum. `node:util.parseArgs` na CLI, `node:sqlite` no banco, `fetch` nativo na Meta |
| Banco | SQLite via `node:sqlite`, atrás da porta `SqlDriver` (`src/database/driver.ts`) |
| Autenticação | **Não existia.** Operação era CLI local + MCP stdio, um operador só |
| HTTP | **Não existia.** Nenhum servidor web |
| Clientes | `clients/<id>/config.json`, validado por Zod, com allowlist de conta e domínio |
| Meta | `MetaClient` (transporte) + `MetaGateway` (superfície tipada) + `MetaSimulator` (dry-run) |
| Aprovação | `src/approvals/service.ts` — token, validade, uso único, fingerprint |
| Estados | 14 estados, transições travadas em `src/campaigns/state-machine.ts` |
| Upload | `MetaGateway.uploadImage` / `uploadVideo`, hash por arquivo, dedup por cliente |
| Insights | `src/reports/insights.ts` — campos por objetivo, normalização tolerante a ausência |
| Orçamento | `PolicyEngine` — piso, teto do cliente, teto absoluto, projeção mensal |
| Criação pausada | `executarCriacao` em `src/campaigns/creation.ts`, com retomada |
| Ferramentas MCP | 30, sem nenhuma chamada arbitrária à Graph API |

### O que faltava para uma plataforma web

Três coisas, e só três. Tudo o mais foi reaproveitado sem alteração.

1. **Camada HTTP.** O backend só falava CLI e MCP stdio. Criada em `src/api/`,
   sobre `node:http`, sem framework novo — mesma escolha de dependência mínima
   que o resto do projeto já fazia.
2. **Autenticação e papéis.** Não existiam. Criados em `src/api/auth.ts`:
   sessão em SQLite, senha com `scrypt`, quatro papéis.
3. **Compositor de briefing.** O caminho de escrita inteiro é `briefPath`. O
   assistente da interface produz dados estruturados, então
   `src/campaigns/brief-composer.ts` serializa esses dados no **mesmo markdown
   canônico** e grava em `briefs/`. A partir daí o fluxo é idêntico ao da CLI —
   uma só validação, um só caminho de criação.

O compositor foi a decisão central: sem ele, a interface teria a própria
validação de briefing, e as duas divergiriam na primeira mudança de regra.

## Papéis

| Papel | Pode |
|---|---|
| `visualizador` | Ler tudo. Nenhuma escrita |
| `operador` | + rascunho, upload, validação, dry-run, criar pausada, solicitar aprovação |
| `gestor` | + aprovar, reprovar, ativar, pausar, alterar orçamento dentro da política |
| `admin` | + gerenciar usuários e ver configuração do ambiente |

Nenhum papel pode excluir campanha, conjunto ou anúncio: a operação não existe
no backend, então também não existe na interface.

## Telas e endpoints

Legenda de erros: `401` sessão ausente/expirada · `403` papel insuficiente ou
conta não autorizada · `409` duplicidade/conflito de estado · `422` validação
ou violação de política · `502` erro vindo da Meta.

### Login
| | |
|---|---|
| Endpoint | `POST /api/auth/login` → `{ usuario, papel }` |
| Entrada | `{ email, senha }` |
| Estados | anônimo · autenticando · autenticado · credencial inválida |
| Erros | `401` credencial inválida · `429` tentativas demais |
| Permissão | pública |

Sessão em cookie `HttpOnly`, `SameSite=Strict`. O token da Meta nunca chega ao
navegador — ele vive no `.env` do servidor e só é usado pelo `MetaClient`.

### Visão geral
| | |
|---|---|
| Endpoints | `GET /api/overview?cliente&periodo` · `GET /api/audit?limite` |
| Saída | indicadores, séries de investimento e resultado, campanhas em atenção, aprovações pendentes, recomendações pendentes |
| Estados | carregando · vazio · com dados · sem credencial (métricas indisponíveis) |
| Erros | `502` Meta indisponível — a tela mostra o que é local e marca o que veio da Meta |
| Permissão | `visualizador` |

Métricas incompatíveis com o objetivo não são exibidas: a seleção vem de
`fieldsForObjective` e `metricaPrincipal`, no backend.

### Clientes
| | |
|---|---|
| Endpoints | `GET /api/clients` · `GET /api/clients/:id` · `GET /api/clients/:id/assets` |
| Saída | cadastro sem segredo, políticas de orçamento, ativos reais conferidos na Meta |
| Estados | carregando · sem clientes · cadastro de exemplo · ativo ausente na Meta |
| Erros | `404` cliente não cadastrada · `502` Meta indisponível |
| Permissão | `visualizador` |

`/assets` reusa `meta_validate_client_assets` pela mesma função de serviço.

### Nova campanha (assistente)
| Etapa | Endpoint | Observação |
|---|---|---|
| 1 Cliente | `GET /api/clients` + `GET /api/clients/:id/assets` | bloqueia avanço se faltar ativo obrigatório ao objetivo |
| 2 Objetivo | `GET /api/templates` | objetivo técnico vem do backend, nunca hardcoded na tela |
| 3 Estratégia | `POST /api/advisor/strategy` | `CampaignAdvisor` determinístico |
| 4 Destino | `POST /api/validate/destination` | allowlist de domínio e https |
| 5 Criativos | `POST /api/creatives/upload` · `GET /api/creatives?cliente` | arquivo vai para `creatives/<cliente>/`, hash calculado no servidor |
| 6 Copy | `POST /api/advisor/copy` | modelos por tipo de campanha; nunca aplica sem revisão |
| 7 Público | `POST /api/advisor/audience` | avisa restrito/amplo demais |
| 8 Posicionamento | derivado do criativo | proporção decide compatibilidade |
| 9 Orçamento | `POST /api/validate/budget` | `PolicyEngine.evaluateBudget` |
| 10 Revisão | `POST /api/campaigns/dry-run` | executa o dry-run real e devolve o plano |

Rascunho: `PUT /api/drafts/:id` a cada mudança, `GET /api/drafts/:id` ao voltar.

### Criação
| | |
|---|---|
| Endpoint | `POST /api/campaigns` com `Idempotency-Key` |
| Entrada | id do rascunho + confirmação consciente |
| Saída | IDs internos e da Meta, status por objeto, log passo a passo |
| Estados | validando · enviando criativos · criando campanha/conjuntos/criativos/anúncios · conferindo · criada pausada · falha parcial |
| Erros | `409` duplicidade suspeita · `422` política · `502` Meta |
| Permissão | `operador` |

Falha parcial não reenvia nada: a retomada de `executarCriacao` continua do
ponto exato, sem duplicar nem apagar.

### Aprovações
| | |
|---|---|
| Endpoints | `GET /api/approvals` · `POST /api/approvals/:campaignId/request` · `POST /api/approvals/:campaignId/approve` · `POST /api/approvals/:campaignId/reject` |
| Saída | solicitação com cliente, conta, orçamento, criativos, riscos, quem pediu |
| Erros | `403` papel insuficiente · `422` campanha alterada após aprovação |
| Permissão | `operador` solicita · `gestor` aprova |

### Cadastro de cliente
| | |
|---|---|
| Endpoints | `GET /api/meta/discover?conta=` · `POST /api/clients` |
| Entrada | cadastro completo, validado pelo mesmo `clientConfigSchema` do arquivo |
| Saída | `clients/<id>/config.json` gravado no servidor |
| Estados | com credencial (escolhe de listas reais) · sem credencial (campos livres, com o motivo) |
| Erros | `409` já existe · `422` cadastro inválido, com o campo apontado |
| Permissão | `admin` cria · `operador` descobre ativos |

A descoberta devolve **200 com `disponivel: false`** quando falta credencial —
mesmo contrato de `/api/insights`. Devolver 503 faria o navegador registrar erro
de console para uma situação esperada, que a tela já trata.

### Ativação
| | |
|---|---|
| Endpoint | `POST /api/campaigns/:id/activate` com `{ codigo }` |
| Erros | `422` aprovação vencida, já usada, orçamento diferente, campanha alterada, conta diferente, IDs ausentes |
| Permissão | `gestor` |

A tela exibe o aviso de cobrança real e repete cliente, conta, orçamento e
quantidade de anúncios antes de habilitar o botão.

### Campanhas
| | |
|---|---|
| Endpoints | `GET /api/campaigns?cliente&status&objetivo` · `GET /api/campaigns/:id` · `POST /api/campaigns/:id/pause` · `POST /api/campaigns/:id/refresh` |
| Permissão | leitura `visualizador` · pausa `gestor` |

`/refresh` reconsulta a Meta e grava o status real — é a fonte da coluna
"status na Meta", que nunca é inferida da nossa base.

### Criativos
| | |
|---|---|
| Endpoints | `GET /api/creatives?cliente` · `POST /api/creatives/upload` · `GET /api/creatives/:id/file` |
| Erros | `409` hash já existe para a cliente · `422` formato/tamanho/dimensão fora da política |
| Permissão | leitura `visualizador` · upload `operador` |

### Relatórios
| | |
|---|---|
| Endpoints | `GET /api/insights?cliente&periodo&nivel` · `GET /api/reports/daily?cliente` · `GET /api/reports/export.csv?...` |
| Estados | sem credencial · sem dados no período · dados parciais |
| Permissão | `visualizador` |

### Recomendações
| | |
|---|---|
| Endpoints | `GET /api/recommendations?cliente` · `POST /api/recommendations/generate` |
| Saída | ação, confiança, janela analisada, dados de suporte, o que bloqueia |
| Permissão | leitura `visualizador` · gerar `operador` |

Nenhuma recomendação executa alteração: `AUTO_*_ENABLED` continua `false` e o
`PolicyEngine` ainda precisaria aprovar.

### Auditoria
| | |
|---|---|
| Endpoint | `GET /api/audit?cliente&campanha&ferramenta&limite` |
| Saída | ator, horário, cliente, conta, ferramenta, parâmetros sem segredo, resultado, IDs, estado antes/depois |
| Permissão | `gestor` |

Somente leitura. Não existe endpoint de escrita ou exclusão em `action_logs`.

## Fronteira de segurança

O navegador nunca recebe token da Meta, app secret, token de usuário de sistema
nem segredo do MCP. Toda chamada à Graph API sai do servidor, pelo `MetaClient`
já existente, com a redação de logs de `src/logging/redact.ts` valendo igual.

O `PolicyEngine` roda **no servidor**. A interface mostra os limites e desabilita
o que violaria, mas isso é conveniência: quem recusa é o backend, e uma
requisição forjada bate na mesma parede.
