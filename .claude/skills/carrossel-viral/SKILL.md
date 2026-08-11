---
name: carrossel-viral
description: >-
  Cria carrossel viral para Instagram de um cliente da Expansion, do insumo ao PNG pronto pra publicar. Recebe um tema, matéria, link, transcrição ou ideia solta; pesquisa âncoras verificáveis quando precisa; gera 10 headlines no padrão BrandsDecoded; monta a espinha dorsal, o texto de cada slide, o HTML 1080×1350 e os PNGs; e fecha com a legenda do Instagram. Puxa marca, nicho, cor, estilo e CTA da ficha do cliente em CLIENTES/ — não repete briefing. Usa a calibração de padrões do nicho quando ela existe e diz quando está usando os números emprestados da BrandsDecoded. Registra toda peça gerada em CARROSSEIS/ pra alimentar o relatório semanal e a recalibração. Usar sempre que pedirem carrossel, post estático, "carrossel pro [cliente]", transformar matéria/notícia/ideia em carrossel, refazer headline de um carrossel, ou gerar a legenda de um carrossel. Gatilhos: cria um carrossel, monta carrossel, carrossel pra Prime, transforma essa matéria em carrossel, refazer headlines, exportar os PNGs. NÃO faz roteiro de vídeo (usar roteiro-expansion), nem landing page, nem proposta comercial.
---

# Carrossel Viral — Expansion

Motor de carrossel da casa. O método é o da BrandsDecoded, guardado em `BRANDSDECODED/`;
o que esta skill acrescenta é o que faz ele servir a uma agência com vários clientes:
**ficha de cliente no lugar de briefing repetido**, **calibração por nicho no lugar de
número emprestado**, e **registro de toda peça** pra o relatório semanal e a recalibração.

Os arquivos de `BRANDSDECODED/` são **imutáveis**. Ler, nunca editar.

---

## Regra de origem do dado (a mais importante daqui)

O material da BrandsDecoded traz uma tabela de padrões — "Brasil +155%", "Fim/Morte +119%",
"marketing tem 7,1% de hit rate". Esses números saíram dos posts do Leonardo Varricchio,
na conta dele, para a audiência dele. **Não são fato sobre o cliente da vez.**

Por isso, toda vez que esta skill escolher um padrão de headline, ela sabe de onde veio a régua:

| Origem | Quando vale | Como tratar |
|---|---|---|
| `CALIBRACAO/{nicho}.md` | Existe arquivo para o nicho do cliente | **Medido.** Manda. Sobrepõe a BrandsDecoded. |
| Padrões da BrandsDecoded | Não existe calibração do nicho ainda | **Emprestado.** Usa, mas é hipótese. |

Quando a calibração do nicho não existir, avisar em **uma linha**, no fim da entrega das
headlines — nunca no meio do fluxo, nunca como bastidor:

> _Padrões ainda emprestados da BrandsDecoded — a Prime tem N carrosséis registrados; a calibração própria entra com volume._

Nunca apresentar número emprestado como se fosse do cliente. Nunca inventar número nenhum.

---

## Etapa 0 — Quem é o cliente

Identificar o cliente pela conversa e **ler `CLIENTES/{CLIENTE}.md`**. Essa ficha responde
as 7 perguntas de briefing do material de uma vez: marca, @, nicho, cor, estilo, CTA e
regras editoriais próprias.

- **Ficha existe** → seguir direto para a Etapa 1. Não perguntar nada que já esteja nela.
- **Ficha não existe** → rodar o briefing de 7 perguntas do
  `BRANDSDECODED/CONTENT-MACHINE/prompts/system-prompt-maquina-carrosseis-v4.md`
  (Bloco 3), e **gravar a ficha em `CLIENTES/` no fim** pra nunca mais perguntar.
- **Cliente não informado** → perguntar só isso, em uma linha.

Se a ficha tiver campos marcados `[FALTA]`, perguntar **apenas esses**, juntos, numa
mensagem só — e atualizar a ficha com a resposta.

---

## Etapa 1 — Insumo e modo

Aceitar o que vier: tema, matéria, link, print, transcrição, áudio transcrito ou ideia solta.

**Escolher o modo** — são três, e cada um tem fluxo próprio. Ler `references/modos.md`.

| Modo | Quando | Entrega |
|---|---|---|
| **topo** | Tendência, tese cultural, comportamento | Carrossel viral, 10 headlines |
| **meio** | Dúvida, passo a passo, erro comum | Carrossel educativo, 5 capas |
| **newsroom** | Notícia com data, últimos 7 dias | **Capa única**, em minutos |

Se o pedido nomear o modo, obedecer. Se não, decidir pelo insumo e **dizer em uma linha**
qual foi usado. Ambíguo → perguntar, uma linha só.

As etapas 2 a 9 abaixo descrevem o **modo topo**. Para meio e newsroom, `references/modos.md`
diz o que muda — o resto do fluxo (validação editorial, aprovação, render, ficha) é igual.

**Pesquisar na web quando** o insumo for uma ideia/tese sem lastro, ou uma notícia que
precisa de contexto. Buscar de 3 a 6 âncoras verificáveis — dado, data, nome, número de
mercado. Se a sustentação vier fraca, **suavizar a tese** em vez de inflar.

Não citar URL nem nome de fonte na triagem. As fontes entram na legenda (Etapa 8).

---

## Etapa 2 — Triagem (interna, nunca mostrada)

Extrair, conforme o Bloco 4 / Etapa 1 do v4:

| Campo | O que extrair |
|---|---|
| Transformação | O que mudou, com costura e consequência |
| Fricção central | A tensão real — conflito, não só tema |
| Ângulo narrativo dominante | A leitura mais forte pro carrossel |
| Evidências | A), B), C) com base observável |

Classificar internamente **eixo** (Mercado · Cases · Notícias · Cultura · Produto) e
**funil** (Topo · Meio · Fundo). Isso vai pra ficha do carrossel na Etapa 9.

---

## Etapa 3 — 10 headlines

Ler, nesta ordem:

1. `CALIBRACAO/{nicho}.md` — se existir. É a régua que manda.
2. `BRANDSDECODED/CONTENT-MACHINE/prompts/brandsdecoded-banco-de-headlines.md` — os 56 hooks por padrão.
3. `BRANDSDECODED/CONTENT-MACHINE/prompts/brandsdecoded-filtro-editorial.md` — o que é proibido.
4. Bloco 5 do v4 — a engine (padrões de lift, gatilhos, checklist de rejeição).

Gerar **exatamente 10**, no formato rígido do v4: opções 1–5 em Investigação Cultural
(reenquadramento + dois-pontos + hook), opções 6–10 em Narrativa Magnética (3 frases com
ponto). Rodar cada uma pelo checklist de rejeição antes de mostrar — headline reprovada é
**reescrita, nunca removida**. O total entregue é sempre 10.

Apresentar na tabela do v4 (`# · Headline · Gatilho`), com as duas linhas de cabeçalho
(Triagem / Eixo · Funil) e o fecho padrão. Se a calibração do nicho não existir, acrescentar
a linha de origem do dado.

**Comandos aceitos:** `ajusta a N` · `a N mais [adjetivo]` · `mistura a N com a M` ·
`refazer headlines`. Iterar quantas vezes o usuário quiser.

---

## Etapa 4 — Espinha dorsal

Montar Hook · Mecanismo · Prova (A/B/C) · Aplicação · Direção, conforme o v4.
Fechar pedindo aprovação da estrutura antes de escrever o texto.

---

## Etapa 5 — Validação editorial (interna)

Antes de mostrar qualquer texto, passar todos os blocos pelos **7 parâmetros** do
`BRANDSDECODED/CONTENT-MACHINE/prompts/brandsdecoded-manual-de-qualidade.md`.
Nota mínima 8/10 em cada. Um parâmetro abaixo de 8 reprova e exige reescrita.

Rodar também o `brandsdecoded-filtro-editorial.md` inteiro e os 5 testes finais
(Folha · substituição · promessa · artigo · binário).

**Somar a isso a régua editorial da ficha do cliente** — o que aquela marca não diz.

---

## Etapa 6 — Aprovação do texto (bloqueante)

Apresentar o texto final de cada slide no formato do v4 e **parar**. Só avançar com
"aprovado" explícito.

Esta parada não é negociável. Cliente que apaga post publicado sem avisar custa mais
caro do que uma rodada de revisão.

---

## Etapa 7 — Imagens e render

Sugerir onde imagem fortalece (slides com menos de 60% de preenchimento textual → `.img-box`;
slides dark com texto médio → fundo com overlay). **Toda imagem enviada tem que ser usada.**

Render conforme `BRANDSDECODED/CONTENT-MACHINE/prompts/brandsdecoded-design-system.md` e
`brandsdecoded-principios-design.md`, aplicando cor, fonte e estilo da ficha do cliente.

Regras que mais quebram, então conferir sempre:
- Fontes **embutidas em base64** via `@font-face`. Nunca `<link>` do Google Fonts.
- `slide.screenshot()` no elemento `.slide`, nunca `page.screenshot()` no viewport.
- `document.fonts.ready` antes de capturar.
- Contraste mínimo 4.5:1. Sem seta de swipe.

Entregar o HTML pro usuário conferir no navegador antes de exportar PNG.

---

## Etapa 8 — Legenda

Gancho (≤125 caracteres) · contexto · análise · **fontes** · CTA da ficha · 5 a 12 hashtags.

---

## Etapa 9 — Ficha do carrossel (obrigatória)

Gravar `CARROSSEIS/{AAAA-MM-DD}-{CLIENTE}-{slug}.md` no formato de
`references/ficha-carrossel.md`.

**Sem esse registro não existe relatório semanal nem recalibração.** É o passo que parece
burocracia e é o que faz o sistema compor valor. Nunca pular, nunca pedir permissão pra fazer.

Ao publicar, voltar na ficha e preencher `media_id` e `publicado_em` — é a chave que liga a
peça ao desempenho que a Meta devolve.

---

## Bastidor invisível

O usuário vê o resultado de cada etapa, nunca o processo. Não escrever "vou consultar",
"analisando", "carregando a skill", "etapa 3", "pipeline", "eixo narrativo", "funil".

A única exceção é a linha de origem do dado na Etapa 3 — essa é informação que o operador
precisa pra saber o quanto confiar na régua.

---

## Referências desta skill

| Arquivo | Quando ler |
|---|---|
| `references/modos.md` | Sempre na Etapa 1 — decide topo · meio · newsroom |
| `references/fluxo-agencia.md` | Dúvida sobre ficha de cliente, aprovação ou publicação |
| `references/ficha-carrossel.md` | Sempre na Etapa 9 |

## Limites

Roteiro de vídeo → `roteiro-expansion`. Landing page → `landing-page-machine`.
Proposta/deck → `brandsdecoded-propostas`. Posicionamento → `brandsdecoded-diagnostico-marca`.
