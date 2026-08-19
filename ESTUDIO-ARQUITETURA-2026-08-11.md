# Estúdio — arquitetura do back end

Desenho do sistema de carrosséis automáticos da Expansion, para validar internamente
antes de ir ao mercado. Protótipo da interface publicado em 11/08/2026.

O que já existe e roda hoje: a skill `carrossel-viral`, o renderizador
(`.claude/skills/carrossel-viral/scripts/`), a ficha de cliente em `CLIENTES/` e o registro
de peças em `CARROSSEIS/`. Este documento é sobre o que falta para isso virar produto.

---

## A decisão que define tudo

**A Máquina da BrandsDecoded é um renderizador. O cérebro editorial mora fora dela**, em
GPTs do ChatGPT. O operador escreve em um lugar, cola em outro, exporta em um terceiro.

O nosso já nasce com as duas pontas juntas — a skill gera o conteúdo *e* renderiza. Isso
não é detalhe de implementação, é **o produto**: quem usa não sai da ferramenta.

Consequência arquitetural direta: o gerador de conteúdo não é um serviço a construir. Ele
já existe como skill, e o back end serve a ele — guarda a marca, guarda a peça, renderiza,
aprova, publica e mede.

---

## Não construir tudo. Construir na ordem do risco.

O caminho errado é começar pelo app bonito. O caminho certo é: cada fase entrega valor
sozinha, e a seguinte só começa quando a anterior estiver rodando com cliente real.

| Fase | Entrega | Destrava |
|---|---|---|
| **0 — feita** | Skill + renderizador + ficha de cliente, dentro do repo | Já produz peça pronta |
| **1 — feita** | Render fora da sessão + esquema do banco | Vários operadores, sem depender de quem abriu o Claude |
| **2 — feita** | Portal de aprovação | Fim da aprovação por WhatsApp, que é frágil e sem rastro |
| **3** | Publicação automática pós-aceite | Tira o passo manual do social media |
| **4** | Coleta de desempenho | Relatório de segunda deixa de ser trabalho manual |
| **5** | Recalibração por nicho | O ativo que a BrandsDecoded não consegue vender |

**Estado em 19/08:** fases 1 e 2 construídas em `SERVICO/` — serviço de render,
portal de aprovação e o esquema em `SERVICO/migracoes/001-inicial.sql`. Testadas
ponta a ponta: peça criada por HTTP, nove PNGs em 1080×1350, portal aberto,
aprovação registrada com quem e quando.

Duas lacunas conhecidas e escritas em `SERVICO/README.md`: o link de aprovação
não valida quem clicou (o campo existe no esquema, falta ligar) e o aceite ainda
não dispara publicação — isso é a fase 3.

**A fase 2 é a mais urgente e a menos óbvia.** Não é a mais tecnológica — é a que resolve
o problema que quase custou a Prime em 16/07 (ausência de relatório) e o que gerou o
"não autorizei esse" em 24/07.

---

## Fase 1 — Dados

Supabase, que já está ativo na conta (`expansion-os-prod` e `os-expansion-staging`).
Construir em staging primeiro.

### Tabelas

```sql
-- Marca do cliente. Espelha CLIENTES/<X>/FICHA-CARROSSEL-<X>.md
clientes (
  id, nome, handle, nicho, unidade,
  token_fundo, token_destaque, token_claro,   -- os três tokens, e só três
  fonte_titulo, fonte_corpo, logo_url,
  cta_padrao, regras_editoriais jsonb,        -- compliance, vetos, tom
  publicos jsonb,                             -- corretor · empresário · cliente final
  criado_em, atualizado_em
)

-- Template é dado, não código. Novo template entra sem deploy.
templates (
  id, nome, etapa,                            -- topo | meio
  n_slides, ritmo jsonb,                      -- ['capa','claro','destaque',...]
  layout jsonb,                               -- tipografia, margens, elementos fixos
  ativo
)

-- A peça. `blocos` é o contrato de 18 textos.
carrosseis (
  id, cliente_id, template_id, modo,          -- topo | meio | newsroom
  titulo, publico, tema,
  blocos jsonb,                               -- ['texto 1','texto 2', ...]
  metadados jsonb,                            -- padrao_headline, gatilhos, eixo, funil
  calibracao_usada,                           -- brandsdecoded-default | credito-imobiliario-v1
  status,                                     -- rascunho|revisao|aprovado|publicado|recusado
  criado_por, criado_em
)

aprovacoes (
  id, carrossel_id, papel,                    -- interno | cliente
  quem, decisao, comentario, em               -- aprovado | refazer
)

publicacoes (
  id, carrossel_id, canal, media_id,          -- media_id é a chave de tudo
  publicado_em
)

desempenho (
  id, publicacao_id, coletado_em,
  alcance, salvamentos, compartilhamentos, comentarios, curtidas
)

calibracao (
  nicho, versao, modo, padrao,                -- morte-fim | geracional | dois-pontos ...
  n_pecas, metrica, valor, gerada_em
)
```

### Duas decisões de modelagem que importam

**`blocos` é jsonb, não tabela de slides.** O contrato de 18 textos é a interface entre o
agente e o renderizador — mantê-lo como um array simples permite trocar de template sem
migrar dado. Slide é uma *projeção* do bloco, calculada na renderização.

**`calibracao_usada` nunca é nulo.** É o campo que permite responder "a recalibração
melhorou alguma coisa?". Sem ele, a fase 5 fica sem grupo de controle.

---

## Fase 1 — Render fora da sessão

É a única parte que exige infraestrutura de verdade, porque **Playwright precisa de um
Chromium**. Vercel serverless não serve bem para isso.

| Opção | Custo | Quando escolher |
|---|---|---|
| Container pequeno (Cloud Run, Railway, Fly) | ~US$ 5–15/mês | **Recomendado.** Escala a zero, aceita Chromium |
| VPS | ~R$ 30/mês | Se já houver um |
| Vercel + `@sparticuz/chromium` | incluso | Só se o volume for baixo; cold start pesado |

O serviço é pequeno: recebe o spec JSON, devolve os PNGs. O código já existe —
`render_carrossel.py` e `export_png.py`, prontos e testados.

**Cuidado que já custou tempo:** fonte precisa ir embutida em base64. `<link>` do Google
Fonts não carrega de forma confiável em Chromium headless e o PNG sai com fallback —
idêntico no preview, errado no arquivo entregue.

---

## Fase 2 — Portal de aprovação

A Laura já aprovou testar: login por CPF/CNPJ, botão aprovar/refazer. É o item que
substitui a aprovação por WhatsApp.

Fluxo, e a ordem não é negociável:

```
peça gerada → revisão interna → link pro cliente → aceite → publica → grava media_id
```

O aceite do cliente é o que **dispara** a publicação. Nunca a geração.

Requisitos mínimos: link sem senha longa (CPF/CNPJ basta, é interno), preview dos slides
em moldura de Instagram, botão aprovar e botão refazer com campo de comentário, e
registro de quem aprovou e quando. O comentário do "refazer" volta pro agente como insumo
da próxima rodada.

---

## Fases 3 e 4 — Publicar e medir

Make, que já está conectado. O app `instagram-business` tem os módulos necessários:
`CreateCarouselPhoto` para publicar e `GetMediaInsights` para ler desempenho.

**Pré-requisito por cliente, e não tem contorno:** conta Instagram Business ou Creator,
vinculada a uma página do Facebook, com autorização explícita. Vira passo do onboarding.

Dois cenários:

1. **Publicar** — dispara no aceite, publica o carrossel, grava o `media_id`.
2. **Coletar** — a cada poucos dias, lê insights dos posts dos últimos 30 dias e grava.

> **Limite hoje:** a conta Make está no plano Free — 1.000 operações/mês e 2 cenários.
> Dois cenários é exatamente o que cabe. Aperta ao passar de uns poucos clientes.

**Atalho que resolve o começo frio:** antes de publicar qualquer peça nova, importar o
histórico da conta com `GetUserMedia` + `GetMediaInsights`. Cada cliente já tem centenas
de posts com desempenho guardado pela Meta. Isso dá o retrato inicial daquela audiência
sem esperar meses.

---

## Fase 5 — Recalibração

Cruza `carrosseis` com `desempenho` e escreve `calibracao` por nicho **e por modo** —
um educativo com 40 salvamentos e um viral com 8 mil de alcance não competem no mesmo
ranking.

Três regras para não virar superstição:

- Nenhuma linha sem contagem de peças por trás. "Testado em 3 peças" é honesto;
  "funciona melhor" sem número não é.
- Padrão não testado é declarado não testado, nunca omitido.
- Versionar. A peça grava qual versão a gerou, então dá pra medir se a v2 melhorou de
  verdade ou se foi sorte.

**Chamar pelo nome certo:** nos primeiros meses isso é estatística descritiva bem feita,
não aprendizado de máquina. O trabalho valioso agora é instrumentar — garantir que toda
peça seja registrada — para que em quatro meses o dado exista.

---

## O que o protótipo já resolve, e o que ele ainda não é

O protótipo publicado tem abas por cliente, brand kit editável ao vivo, os cinco templates
e preview dos slides. Ele roda inteiro no navegador, sem servidor.

O que falta pra virar produto:

| Falta | Fase |
|---|---|
| Persistir (hoje some ao recarregar) | 1 |
| Upload de logo e de fonte própria | 1 |
| Botão "gerar com IA" ligado à skill | 1 |
| Export real de PNG | 1 |
| Login e permissão por usuário | 2 |
| Portal do cliente | 2 |

---

## Uma escolha a fazer, e é comercial

O sistema pode ser **ferramenta interna** ou **produto**. A arquitetura acima serve aos
dois, mas a diferença aparece cedo:

- **Interna** — login simples, sem cobrança, sem isolamento entre contas. Semanas.
- **Produto** — multi-conta com isolamento, cobrança, onboarding sozinho, suporte. Meses.

A decisão declarada foi validar na própria base primeiro. **Então: interna.** Só não
tomar decisão que feche a porta — por isso `clientes` já tem id próprio e o template é
dado, não código. Virar multi-conta depois é acrescentar uma coluna de organização, não
reescrever.
