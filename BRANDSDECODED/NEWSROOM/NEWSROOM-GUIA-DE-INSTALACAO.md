# Newsroom — Guia de Instalação

> Transcrição fiel do PDF `../originais/newsroom-guia-instalacao.pdf`.
> **Versão 1.1 · maio de 2026** · BrandsDecoded
> Sistema de news-jacking que transforma notícia quente em capa de Instagram em minutos.
> Setup em 4 passos · tempo estimado: 8 min.

> **Atenção:** este guia descreve 4 arquivos do produto (`newsroom-system-prompt.md`,
> `newsroom-design.md`, `newsroom-anti-slop.md`, `newsroom-banco-hooks.md`) que
> **não vieram no material recebido**. Só o guia chegou.

---

## Sumário

| # | Seção |
|---|---|
| 01 | O que é o Newsroom |
| 02 | Pré-requisitos |
| 03 | Setup em 4 passos |
| 04 | Como usar (fluxo de 6 etapas) |
| 05 | Comandos de controle |
| 06 | Solução de problemas |
| 07 | Boas práticas |

**Antes de começar.** Esse guia leva 8 minutos pra ler do início ao fim. O setup do sistema é o passo mais importante — uma vez configurado, o Newsroom roda em qualquer conversa nova do projeto sem precisar reinstalar nada.

---

## SEÇÃO 01 — O QUE É O NEWSROOM

O Newsroom é um produto da BrandsDecoded que vive dentro do Claude.ai como um projeto privado. Não é uma extensão, plugin ou app à parte — é uma configuração que transforma o Claude num assistente especializado em news-jacking visual pra Instagram.

O fluxo é simples: você diz o nicho da sua marca, o sistema busca notícias quentes da semana, gera 10 opções de headline no padrão BrandsDecoded e renderiza uma capa pronta em 1080×1350 pra publicar antes do tema esfriar.

**O que ele entrega:** uma capa única (não carrossel) por sessão, em PNG nativo do Instagram, com tipografia, gradiente e composição já calibrados pelo design system da BrandsDecoded.

**O que ele não faz:** não escreve carrossel completo, não gera vídeo, não posta automaticamente no Instagram. A entrega é o arquivo PNG — você publica manualmente.

> **Posicionamento.** Quando uma notícia sobe no feed, você tem cerca de 2 horas pra publicar antes do tema esfriar. O Newsroom existe pra cobrir essa janela com qualidade editorial.

---

## SEÇÃO 02 — PRÉ-REQUISITOS

| Item | Detalhe |
|---|---|
| Conta Claude.ai | Plano Pro, Max ou Team. O plano Free não tem acesso a Projects — funcionalidade central pro Newsroom. |
| Acesso a Projects | Recurso disponível na barra lateral do Claude.ai. Cada projeto guarda instruções e arquivos isolados de outras conversas. |
| Web Search ativado | Já vem ligado por padrão nos planos pagos. O sistema usa pra buscar notícias quentes em tempo real. |
| Code Execution ativado | Necessário pra renderizar HTML e exportar PNG. Se estiver desligado, ativar em Settings → Features. |
| 4 arquivos do produto | Você recebe junto com esse guia: o system prompt e 3 arquivos da knowledge base. Detalhes no Passo 03. |

---

## SEÇÃO 03 — SETUP EM 4 PASSOS

Cada passo abaixo leva entre 1 e 3 minutos. Você só faz isso uma vez — depois é só abrir o projeto e iniciar conversas novas.

### 1 · CRIAR O PROJETO NO CLAUDE.AI

Acesse claude.ai e faça login. Na barra lateral esquerda, clique em **Projects** (ícone de pasta). Clique em **+ New Project** no canto superior direito. Configure assim:

- **Nome:** Newsroom
- **Descrição:** Sistema de news-jacking BrandsDecoded — gera capas de notícia para Instagram em minutos

Clique em **Create Project**. Você vai ver a tela do projeto vazia, pronta pra configurar.

### 2 · COLAR AS INSTRUÇÕES DO SISTEMA

Dentro do projeto recém-criado, encontre o painel **Project Instructions** (no Claude.ai aparece como "Set custom instructions" ou um botão de edição lateral).

Abra o arquivo `newsroom-system-prompt.md` que você recebeu junto com esse guia. Copie o conteúdo inteiro e cole no campo de instruções.

Salve. Esse é o cérebro do Newsroom — define o fluxo de 6 etapas, as regras anti-slop, os padrões de lift e o tom da resposta.

> **IMPORTANTE.** Não edite o conteúdo do system prompt na primeira instalação. Use o padrão. Customizações vêm depois, na seção 7 (Boas práticas).

### 3 · SUBIR OS 3 ARQUIVOS DA KNOWLEDGE BASE

Ainda dentro do projeto, encontre a área **Project Knowledge** (geralmente na lateral direita ou em uma aba dedicada). Clique em **Add Files** e suba os 3 arquivos abaixo, exatamente com esses nomes:

- **`newsroom-design.md`** — Sistema de design da capa única: tipografia, gradiente, hierarquia visual, escala da headline
- **`newsroom-anti-slop.md`** — Regras anti-AI slop específicas para headlines: palavras proibidas, construções a evitar, checklist de rejeição
- **`newsroom-banco-hooks.md`** — Banco de 56 headlines reais da BrandsDecoded com mais de 10 mil likes, referência ativa pra geração das 10 opções

Aguarde o upload finalizar. Quando os 3 arquivos aparecerem listados na knowledge base, o sistema está abastecido.

> **POR QUE ESSES 3 ARQUIVOS.** O system prompt é o cérebro. A knowledge base é a memória de longo prazo. Sem esses 3 arquivos, o sistema gera headlines genéricas, ignora padrões de lift e renderiza capas com defeitos visuais.

### 4 · INICIAR A PRIMEIRA CONVERSA

Dentro do projeto, clique em **Start new chat** (ou o botão equivalente de nova conversa). Digite só uma palavra: `oi` — ou qualquer mensagem inicial.

O Newsroom deve responder com a mensagem de boas-vindas pedindo nicho, recorte regional e @ do Instagram. Se isso aparecer, o sistema está rodando.

---

## PÓS-INSTALAÇÃO — COMO SABER SE FUNCIONOU

Depois do passo 4, faça um teste rápido pra confirmar que tudo está conectado. Se o sistema falhar em qualquer um dos 4 sinais abaixo, voltar à seção de instalação e revisar.

- **✓ SINAL 01** — A primeira mensagem chega no formato exato do system prompt, pedindo nicho, recorte e @ do Instagram.
- **✓ SINAL 02** — Quando você responde com nicho, o sistema busca notícias e apresenta uma tabela com 5 a 8 manchetes verificadas.
- **✓ SINAL 03** — Após escolher uma notícia, o sistema gera 10 headlines com gatilhos identificados — não fórmulas genéricas como "Descubra".
- **✓ SINAL 04** — Quando você sobe a imagem, o sistema gera o HTML da capa e o entrega como arquivo, sem narrar o processo.

> **SE ALGO FALHAR.** Os erros mais comuns no setup são: arquivo da knowledge base com nome errado, system prompt colado parcialmente ou Code Execution desativado nas configurações. Reveja os passos 2 e 3 antes de pedir suporte.

**Tempo total estimado**

| Passo | Tempo |
|---|---|
| 1 · Criar projeto | 1 minuto |
| 2 · Colar instruções | 1 minuto |
| 3 · Subir arquivos | 2 minutos |
| 4 · Primeira conversa | 1 minuto |
| **Total** | **5 a 8 minutos** |

---

## SEÇÃO 04 — FLUXO DE 6 ETAPAS

O Newsroom roda em 6 etapas. Você não precisa lembrar do nome de nenhuma — o sistema conduz sozinho, etapa por etapa. Esse fluxo abaixo é só pra você saber o que esperar.

1. **BOAS-VINDAS + NICHO** — Sistema abre pedindo nicho, recorte regional (Brasil, internacional ou os dois) e @ do Instagram. Você responde em uma mensagem.
2. **BUSCA DE NOTÍCIAS** — Sistema busca na web (últimos 7 dias, fontes editoriais Tier 1) e entrega tabela com 5 a 8 manchetes verificadas. Você escolhe uma pelo número.
3. **GERAÇÃO DE 10 HEADLINES** — Sistema lê o link da notícia escolhida e gera 10 opções aplicando padrões do banco BrandsDecoded (Morte/Fim, Geracional, Investigando, Dois-Pontos etc). Você escolhe uma pelo número.
4. **IMAGEM DA CAPA** — Sistema pede a imagem que vai na capa. Você sobe um JPG ou PNG (ideal: vertical, 1080px+, sujeito no terço superior).
5. **RENDER DA CAPA** — Sistema pergunta cor primária e fonte (ou "usar default") e entrega o HTML pronto. Você abre no navegador, confere, ajusta se quiser.
6. **EXPORT PNG (E LEGENDA OPCIONAL)** — Você digita `exportar` — sistema gera o PNG nativo 1080×1350. Se quiser legenda Instagram, digita `legenda`.

> **TEMPO MÉDIO DO FLUXO COMPLETO.** Entre 4 e 8 minutos da abertura à entrega do PNG, dependendo da velocidade da busca e do quanto você ajusta a headline. Mais rápido que abrir Photoshop.

---

## INPUTS IDEAIS

A qualidade da capa depende diretamente da qualidade do que você entrega ao sistema. Três pontos onde o input importa.

### ETAPA 1 · NICHO

Quanto mais específico, melhor a curadoria de notícias.

| Input fraco | Input forte |
|---|---|
| "marketing" | "marketing digital pra fragrância nicho" |
| "saúde" | "saúde mental no contexto de profissionais liberais" |
| "esporte" | "corrida de rua e treinamento amador" |

### ETAPA 4 · IMAGEM

O sistema funciona com qualquer imagem, mas algumas dão capas dramaticamente melhores:

- **Resolução mínima 1080px de largura** — abaixo disso, a capa fica pixelada no Instagram
- **Sujeito no terço superior** — porque a headline ocupa o terço inferior, sujeitos no centro ou na base brigam por espaço
- **Sem texto sobreposto** — texto da imagem original compete com a headline e polui a capa
- **Foto fotográfica, não print de tela** — print de matéria embaçado entrega capa amadora
- **Vertical ou quadrada de preferência** — horizontal funciona, mas perde área lateral no enquadramento

### ETAPA 5 · COR DA MARCA

Se você tem cor primária consolidada, manda em hex (ex: `#1E40AF`). Senão, use o padrão BrandsDecoded (`#F73600`) — funciona pra qualquer nicho.

> **DICA DE PRODUÇÃO.** Manter um banco pessoal de 10 a 15 imagens já editadas pra cada eixo do seu nicho acelera o fluxo. Quando a notícia sobe, você já tem foto pronta — só envia ao sistema sem precisar buscar do zero.

---

## SEÇÃO 05 — COMANDOS DE CONTROLE

Em qualquer ponto do fluxo, você pode usar esses comandos pra ajustar, refazer ou avançar. Digite o comando como mensagem normal — o sistema reconhece e age.

### Durante a busca de notícias

| Comando | O que faz |
|---|---|
| `buscar de novo` | Refaz a busca com queries diferentes. Use quando nenhuma das notícias listadas conversa com seu posicionamento. |
| `só polêmica` | Refina pra notícias com tensão de marca, controvérsia, escândalo. Funciona melhor em nichos com peso editorial alto. |
| `só lançamento` | Refina pra novidades — produtos, colabs, campanhas, eventos. |
| `só dados` | Refina pra notícias com dado concreto — pesquisa, estudo, número de mercado. |

### Durante a geração de headlines

| Comando | O que faz |
|---|---|
| `ajusta a 7` | Reescreve apenas a headline indicada (substitua "7" pelo número). Mantém as outras 9. |
| `a 4 mais provocativa` | Reescreve a headline 4 com mais tensão. Variações: "mais curta", "mais geracional", "mais dramática". |
| `mistura a 2 com a 9` | Combina elementos de duas headlines em uma nova. Útil quando você gosta do gatilho de uma e da estrutura de outra. |
| `refazer headlines` | Descarta as 10 e gera 10 novas com a mesma notícia. Use quando o ângulo geral não te convenceu. |

### Durante o render e export

| Comando | O que faz |
|---|---|
| `trocar imagem` | Solicita uma nova foto e regenera a capa. Headline e config visual permanecem. |
| `exportar` | Gera o PNG final 1080×1350 pronto pro Instagram. |
| `legenda` | Gera legenda pro post (gancho + contexto + ângulo + fonte + CTA + hashtags). |

### Geral

| Comando | O que faz |
|---|---|
| `reiniciar` | Volta à etapa 1. Use quando quiser começar do zero sem abrir conversa nova. |

---

## SEÇÃO 06 — SOLUÇÃO DE PROBLEMAS

**A busca não retorna notícias relevantes.** O sistema só lista notícias dos últimos 7 dias em fontes editoriais. Se o seu nicho é muito específico ou está numa semana fria, ele vai oferecer ampliar pra 14 dias. Aceite. Se mesmo assim não vier nada bom, ajuste o nicho pra um recorte mais amplo (ex: trocar "fragrâncias artesanais brasileiras" por "perfumaria nicho").

**As headlines saíram genéricas.** Acontece quando a notícia escolhida não tem ângulo forte (sem nome próprio, sem número, sem tensão). Use `refazer headlines` e, se persistir, volte e escolha outra notícia da lista. O sistema é só tão bom quanto a notícia base.

**A capa renderizou com a headline cortada.** Headlines muito longas (acima de 6 linhas em fonte mínima) são automaticamente reduzidas pelo sistema. Se ainda estourou, peça `encurtar a headline` ou escolha uma das 10 opções mais curtas.

**A imagem ficou com qualidade ruim.** A capa sai em 1080×1350 nativo. Se a imagem original era menor que 1080px de largura, o redimensionamento gera pixelação. Solução: subir uma imagem maior. Use `trocar imagem` sem refazer headline.

**O export PNG não chegou.** Em sessões longas, o ambiente de execução pode resetar. Se digitar "exportar" e o sistema não entregar, peça `regerar PNG`. Se persistir, abra conversa nova no projeto e refaça o fluxo (a knowledge base e o system prompt persistem).

**As respostas estão narrando processo (vou ajustar, validando, etc).** Significa que o system prompt foi colado parcialmente ou está desatualizado. Volte ao Passo 2 do setup, copie o conteúdo completo do arquivo `newsroom-system-prompt.md` e substitua nas instruções do projeto.

**A fonte não carregou no PNG final.** Aconteceu uma vez ou duas? Tente exportar de novo — geralmente é timing de carregamento. Se for recorrente, peça `regerar com fonte fallback`. O sistema usa fontes embutidas em base64, mas em raros casos o ambiente pode não processar a tempo.

**Quero mudar a cor primária no meio do fluxo.** Peça diretamente: `trocar cor pra #XXXXXX`. O sistema regenera o HTML mantendo headline, imagem e composição.

---

## SEÇÃO 07 — BOAS PRÁTICAS

Como extrair o máximo do sistema depois das primeiras semanas de uso.

### CADÊNCIA DE PUBLICAÇÃO

O Newsroom é uma ferramenta de news-jacking, não um substituto da estratégia editorial. O ideal é usar de 1 a 3 vezes por semana, em notícias quentes que conversam com seu posicionamento — não como conteúdo padrão diário.

Posts de news-jacking funcionam por contraste. Se você publica capa de notícia todo dia, perde o efeito de oportunidade.

### PERSONALIZAR A MEMÓRIA DO CLAUDE

O Claude.ai tem um sistema de memória que guarda preferências entre conversas. Pra que ele lembre seu @ do Instagram, sua cor primária e seu nicho sem você precisar repetir, peça em qualquer conversa do projeto:

> "Lembra que minha marca é [@handle], nicho [seu nicho], cor primária [#hex]"

O Claude vai salvar e usar essas preferências automaticamente nos próximos usos do Newsroom.

### CUSTOMIZAR O SYSTEM PROMPT (AVANÇADO)

Se depois de 30 dias usando o sistema você quiser ajustes específicos pro seu nicho — tipo trocar a paleta default, adicionar fontes de busca específicas, ou customizar o tom da legenda — você pode editar o system prompt diretamente no campo de instruções do projeto.

Recomendação: faça ajustes pequenos e teste. Não reescreva blocos grandes na primeira tentativa. As regras anti-slop e os padrões de lift são o que diferencia o Newsroom de qualquer outro gerador genérico — alterar essas seções tira o valor do sistema.

### QUANDO O PRODUTO NÃO É A FERRAMENTA CERTA

O Newsroom é específico pra capa única de notícia quente. Se sua demanda é:

- **Carrossel completo (9 slides)** — use o Content Machine, produto separado da BrandsDecoded
- **Conteúdo evergreen sem gancho de notícia** — Newsroom precisa de notícia recente como base
- **Vídeo, Reels ou Stories** — Newsroom só faz capa estática 1080×1350
- **Posts em massa (10+ por dia)** — Newsroom é qualidade-foco, não volume

---

> **A CAPA É O PRODUTO. A VELOCIDADE É TUDO.**
> Notícia sobe às 9h da manhã. Às 9h30 você tem capa publicada. Esse é o jogo do Newsroom.

_Suporte e atualizações: @brandsdecoded · brandsdecoded.com — v1.1, maio de 2026_
