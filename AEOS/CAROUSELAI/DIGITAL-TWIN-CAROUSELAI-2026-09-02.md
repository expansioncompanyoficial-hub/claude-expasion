<!-- Transcrito do Google Docs entregue pelo Nicolas em 02/09/2026.
     Limpeza aplicada: desescape de markdown e normalização de linhas em branco,
     ambos artefatos do export. Nenhuma palavra do conteúdo foi alterada.
     Original: docs.google.com/document/d/1_-xolrY3sP5ZNd9cvA3ZcINmOaTPoleeZ0GZw0t587A -->

# AEOS-M003 — Digital Twin do CarouselAI

**Alvo:** <https://www.twobaddesigners.com/pt> (produto "CarouselAI", da Two Bad Designers) **Data da coleta:** 02/09/2026, sessão única, ~2h **Conta usada:** Expansion / <expansioncompany.oficial@gmail.com> — **plano FREE** **Créditos:** 9 no início → **7 no fim** (2 gastos, ambos autorizados) **Instrumento:** Chrome do usuário, já logado, dirigido por automação de navegador + leitura direta do DOM e do bundle JS



Este documento é a única evidência. Quem o lê não tem acesso ao site nem à sessão. Ø = **não observado**. Camada sem observação fica vazia e marcada — nunca preenchida por dedução.



## 0 · Método

Ordem de execução, deliberada para não gastar crédito antes da hora:



1.  **Reconhecimento a custo zero** — percorrer todas as telas, transcrever a interface literalmente, ler o DOM, ler o bundle JS. Nenhum crédito.
2.  **Descoberta que mudou o orçamento** — a geração de **imagem** é 100% paga (o toggle abre o paywall). Logo, gerar um carrossel custa **1 crédito fixo**, só texto, independente de 3 ou 10 slides. Isso foi levado ao usuário antes de gastar.
3.  **Duas gerações autorizadas** (2 créditos):

      - **Geração A** — template Big Idea, agente Storytelling, 10 slides, PT-BR, GPT-4.
      - **Geração B** — template Problem Solver, agente Professional, 5 slides, PT-BR, GPT-4, **mesmo tópico**. Trocar template + agente + nº de slides ao mesmo tempo é o teste mais barato para a pergunta "a régua é medida ou molde único esticado?".
4.  **Medição**, não observação a olho: coordenadas e tipografia lidas do DOM no espaço de design real; formato e resolução de exportação lidos do cabeçalho PNG do próprio blob.
5.  **Exportação autorizada** — a primeira exportação gravou 10 PNGs reais no Downloads do usuário. As duas exportações seguintes foram feitas com o download **neutralizado por interceptação**, para medir sem sujar a pasta.



Tópico usado nas duas gerações (escolhido pelo usuário como "tema do próprio campo"): Por que a maioria das agencias digitais perde cliente no terceiro mes de contrato



**Limites respeitados:** nada publicado; nenhuma alteração de conta, plano ou pagamento; nenhum dado de terceiro acessado; a tela "Minha Conta" **não foi aberta de propósito** (ver §11).



## 1 · Limitações do instrumento — leia antes de qualquer número

Cinco delas quase viraram achado falso. Estão aqui na frente porque contaminam a leitura das tabelas abaixo.



|  |  |  |  |
| :-: | :-: | :-: | :-: |
| **\#** | **Limitação** | **Efeito** | **Estado** |
| L1 | **Colisão de camadas em viewport estreito.** A 980 px de largura, a pílula do stepper ("Templates — Gerar — Pronto\\!") cobre os botões *Vista slides* / *Vista grade*. elementFromPoint no centro do botão devolvia um DIV, não o BUTTON. | Dois cliques não chegaram ao alvo. Parecia botão morto. | **Corrigido** alargando a janela para 1214 px. Ver hipótese refutada R1. |
| L2 | **get\_page\_text** **lê** **\<main\>** **e ignora modais em overlay.** | Concluí que o modal de preços tinha fechado quando ele continuava aberto por cima; digitação de teste foi para o vazio. | **Corrigido** por screenshot. Ver R5. |
| L3 | **Ctrl+A** **dentro do** **\<textarea\>** **não seleciona tudo** (comportou-se como "início da linha"). | O texto novo foi inserido no cursor, deixando lixo colado no fim do tópico. | **Detectado e limpo** antes de gerar. |
| L4 | **O seletor da Camada 4 fornecido na missão casa com a MINIATURA, não com o canvas.** \[class\*=slide\],\[class\*=canvas\],\[class\*=carousel\] \> \* retorna um card de 75×94 px. | Todas as coordenadas saem em espaço escalado e inúteis. | **Contornado.** O app mantém **três cópias** do mesmo slide no DOM: miniatura (scale 0.074), canvas visível (scale ≈0.43) e **render de exportação (****scale 1****, 1080×1350)**. As medidas válidas vêm do render scale 1, usando offsetLeft/offsetTop (layout) em vez de getBoundingClientRect (escalado). O JSON bruto do script original **e** o do script corrigido estão no Anexo A. |
| L5 | **Filtro de "nós-folha de texto" quase produziu um falso achado.** No template Big Idea, dois parágrafos do corpo vêm num **único** nó com \\n\\n e white-space: pre-wrap. | Quase reportei "o segundo parágrafo é descartado". | **Falso.** Ver R4. |
| L6 | **Tempos medidos uma vez cada, sem repetição e sem controle de concorrência de rede.** Geração \~26–28 s; exportação \~3 s/slide. | Ordem de grandeza, não média. | Declarado. |
| L7 | **Tudo observado no plano FREE.** Toda trava descrita pode não existir em plano pago. | Nenhuma afirmação sobre plano pago é observação. | Declarado. |
| L8 | **Prints não puderam ser exportados como arquivos.** As capturas ficaram na sessão do navegador; save\_to\_disk não devolveu caminho acessível ao meu ambiente. Ao navegar para fora do editor, o estado do carrossel gerado se perdeu (não há histórico no FREE), então **as telas do editor não são mais recapturáveis sem gastar outro crédito**. | O anexo de prints está incompleto. Erro meu de procedimento: eu deveria ter exportado as capturas do editor antes de sair dele. | **Não corrigido.** Ver §11. |
| L9 | **Interceptei** **URL.createObjectURL** **na 2ª e 3ª exportação** para ler o cabeçalho PNG sem gravar arquivos. Isso altera o comportamento da página durante a medição. | O tamanho e a resolução vêm do blob real; o gravar-em-disco foi suprimido. A 1ª exportação (a autorizada) rodou sem interferência e gravou os 10 arquivos de verdade. | Declarado. |



## 2 · Matriz de conhecimento

Uma linha por camada. "Confiança" = confiança média das afirmações daquela camada.



|  |  |  |  |
| :-: | :-: | :-: | :-: |
| **Camada** | **Status** | **Confiança** | **O que sustenta** |
| 1 · Superfícies | **Observada, completa** | 95% | Todas as telas entre entrar e carrossel pronto percorridas, com URL real |
| 2 · Contrato de entrada | **Observada, completa** | 95% | Transcrição literal de todos os rótulos, placeholders, tooltips e limites; mínimos e máximos medidos por bissecção |
| 3 · Modelos e custo | **Observada (documental) / parcial (empírica)** | 90% doc · 55% emp | Tabela dos 6 modelos de imagem lida no produto; só o modelo de texto GPT-4 foi de fato executado |
| 4 · Régua visual | **Medida** | 95% | Dois templates medidos no espaço de design 1080×1350; exportação medida no cabeçalho PNG |
| 5 · Régua editorial | **Observada** | 85% | Dois carrosséis completos, 15 slides, contagem de caracteres e censo de cores |
| 6 · Editor | **Observada, com uma trava mal explicada** | 85% | Inventário completo de controles + pointer-events/disabled lidos no CSS computado |
| 7 · Saída | **Medida** | 95% | Formato, resolução, bit depth, tamanho por arquivo e ausência de ZIP medidos nos blobs reais |
| T1 · Estados e erros | **Parcial — 1 de 3** | 50% | "Texto curto" observado; "URL ilegível" e "crédito insuficiente" Ø |
| T2 · Negócio | **Observada** | 90% | Planos mensal e anual, créditos, limites e FAQ transcritos do produto e da landing |



## 3 · Camada 1 — Superfícies

Fluxo real, com URLs:



|  |  |  |  |
| :-: | :-: | :-: | :-: |
| **\#** | **Superfície** | **URL** | **Papel** |
| 1 | Landing de marketing | /pt | Promessa, preços, FAQ, modelos |
| 2 | **Bifurcação de entrada** | /pt/entry | Dois cartões: **Chat & AI** (EM BREVE, desabilitado) e **Templates & Design** (ativo) |
| 3 | Galeria de templates | /pt/selectTemplate | Passo **1 Templates**; busca + 8 filtros; 13 templates + card "EM BREVE" |
| 4 | Modal de preview do template | (modal) | 3 slides rotulados INTRO SLIDE / CONTENT SLIDE / CTA SLIDE + "Usar esse template" |
| 5 | Gerador | /pt/aiGenerator | Passo **2 Gerar** — o contrato de entrada |
| 6 | Editor | /pt/aiGenerator (mesma URL) | Passo **3 Pronto\\!** — rail de miniaturas + canvas + painel direito |
| 7 | Modal "Preview" | (modal) | Mockup de post do Instagram |
| 8 | Modal "Múltiplos Arquivos" | (modal) | Aviso de download múltiplo + "Baixar 10 Imagens" |
| 9 | Modal "Trocar Template" | (modal) | Troca de template pós-geração, com aviso |
| 10 | Paywall de planos | (modal) | Disparado pelo toggle de imagem e por "Ver Planos" |
| 11 | Galeria / histórico | (aba lateral) | **Bloqueada**: "Recurso Premium" |
| 12 | Menu da conta | (dropdown) | Minha Conta · Ajuda · Reiniciar Tutorial · Termos e Políticas · Sair · badge FREE |



**Barra lateral tem só duas entradas:** **Templates** **e** **Galeria****.** Não há projetos, pastas, marca, equipe ou configurações.



Texto literal da bifurcação /pt/entry:



**Chat & AI** EM BREVE — "Crie carrosséis a partir de uma simples conversa" · Chat conversacional com IA · Geração progressiva de slides · Detecção automática de URL · *Ver como funciona* **Templates & Design** — "Comece com um modelo profissional e edite" · Biblioteca de templates profissionais · Personalize com sua marca · Exportação em alta resolução · *Ver como funciona* Botão: **"Selecione uma opção para continuar"** → vira **"Continuar →"** ao selecionar



**Achado de superfície:** a landing promete "Três formas de criar" (tema, link, Shorts). A entrada real tem **um caminho vivo e um "em breve"**. As outras formas estão dentro do gerador, travadas (Camada 2).

### Catálogo de templates (13 + 1 placeholder)

Nome de interface → categoria → *slug interno* (extraído do nome do arquivo .webp do thumbnail):



|  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: |
| **\#** | **Nome** | **Categoria** | **Slug interno** | **Acesso** |
| 1 | Big Idea | Motivation | 2BD | livre |
| 2 | Quick List | Education | agressivo | livre |
| 3 | Key Pillars | Education | moderno | livre |
| 4 | News Brief | News | news | livre |
| 5 | Quick Learning | Education | simple | livre |
| 6 | Quick Insights | Motivation | tweet | livre |
| 7 | Quick Picks | Curiosities | brand\_News | **PREMIUM** |
| 8 | Strong Hook | Marketing | panda\_hook | **PREMIUM** |
| 9 | Problem Solver | Marketing | minimalist\_Intro | livre |
| 10 | Data Story | Education | viral\_hook | **PREMIUM** |
| 11 | Deep Dive | Education | report\_intro | **PREMIUM** |
| 12 | Story Flow | Lifestyle | hook | **PREMIUM** |
| 13 | New Drop | News | hook | **PREMIUM** |
| — | "EM BREVE — Mais templates / FIQUE DE OLHO" | — | — | placeholder |



7 livres, 6 premium. Filtros: Todos · Marketing · Educação · Curiosidades · Notícias · Motivação · Design · Lifestyle (o filtro *Design* não tem template correspondente na grade observada).



Thumbnails servidos em assets.twobaddesigners.com/templates/*.webp, **1080×1350** nativos.



## 4 · Camada 2 — Contrato de entrada

**A tela** **/pt/aiGenerator****, transcrita literalmente.**

### 4.1 Cabeçalho de configuração

|  |  |  |  |
| :-: | :-: | :-: | :-: |
| **Rótulo literal** | **Tipo** | **Padrão** | **Domínio medido** |
| Agente de IA ⓘ | dropdown | Storytelling | Storytelling · Casual · Educational · Professional (**4**) |
| Slides ⓘ | stepper − / + | 03 | **mín. 3, máx. 10** (medido clicando até travar) |
| Idioma de saída? | dropdown | Português (Brasil) | Português (Brasil) · English · Español · Français · Deutsch · Italiano · 日本語 · 한국어 · 中文 (**9**) |



Tooltips, literais:



**Agente de IA** — "*Inscreva-se totalmente grátis para desbloquear este recurso e obter um agente de IA sem custo." *(copy incoerente: a conta já está logada e o campo já funciona)*



**Slides** — "*Existem 2 slides por padrão, porque o primeiro é o **SLIDE DE INTRO** e o último slide será o **SLIDE DE CTA** lembre disso."



Consequência aritmética declarada pelo próprio produto: **slides de conteúdo = N − 2**, ou seja de **1 a 8**.

### 4.2 Origem do conteúdo — quatro abas, três travadas

[ TÓPICO ]   [ SHORTS 🔒 BETA ]   [ URL 🔒 ]   [ VÍDEO 🔒 ]



   ativa          travada          travada       travada



Clicar numa aba travada **não faz nada**: sem modal, sem toast, sem tooltip, sem upsell. Trava silenciosa.

### 4.3 Modelo de texto

Rótulo: Modelo de Texto (IA)



|  |  |  |
| :-: | :-: | :-: |
| **Opção** | **Custo exibido** | **Estado** |
| GPT-4 (rápido) | 1 | disponível (padrão) |
| GPT-5 (inteligente) | 2 🔒 | premium, desabilitado |
| Gemini (criativo) | — | Em breve |
| Claude (expert) | — | Em breve |

### 4.4 Campo de tópico

  - Rótulo: Tópico
  - Placeholder: **"Escreva sua ideia de texto para o carousel..."**
  - Sem maxlength.
  - **Mínimo medido: 10 caracteres.** Com 9 caracteres Gerar Carrossel fica desabilitado; com 10, habilita. Bissecção feita lendo button.disabled a cada tecla.

### 4.5 "Melhorar Prompt"

  - Habilita junto com o botão de gerar (mesmo limiar de 10 caracteres). **Não é premium.**
  - Tooltip: **"Nossa IA irá enriquecer sua ideia e criar um tópico muito mais persuasivo."**
  - **Custo medido: 0 crédito** (saldo permaneceu em 7 antes e depois).
  - Efeito medido: **46 caracteres → 1.300 caracteres**. Texto completo no Anexo D.

### 4.6 Assistência de Imagem

  - Rótulo: Assistência de Imagem ⓘ 🔒
  - Subtítulo: "Adiciona automaticamente imagens geradas pela IA."
  - Tooltip: **"Ao ativar esta opção, imagens geradas por IA serão criadas para cada slide. Isso aumentará o custo de créditos para gerar o carrossel. O total de créditos necessários variará de acordo com o número de slides selecionados."**
  - **Clicar no toggle não liga nada: abre o modal de planos.** No FREE, imagem gerada por IA é inacessível.

### 4.7 Botão de ação

Gerar Carrossel  -1 — o selo de custo permaneceu **-1** **com 3 slides e com 10 slides**. Custo de texto é fixo e independente da contagem.

### 4.8 O que o contrato de entrada **NÃO** tem

Ø **Campo de público-alvo.** Ø **Campo de tom** separado (o "Agente de IA" é o proxy, com 4 valores fixos). Ø **Campo de CTA.** Ø **Ficha de marca no momento da entrada** — não há cor, fonte, logo nem @ antes de gerar. Marca só aparece **depois**, no editor, e **varia por template** (§7). Ø **Upload de arquivo como fonte** (PDF, .docx, .txt): não existe aba para isso.



## 5 · Camada 3 — Modelos e custo

O produto tem **dois eixos de modelo**, que a landing mistura num número só ("6 Modelos de IA disponíveis").

### Eixo A — modelos de TEXTO (dentro do gerador)

|  |  |  |
| :-: | :-: | :-: |
| **Modelo** | **Custo** | **Estado** |
| GPT-4 (rápido) | 1 crédito | disponível |
| GPT-5 (inteligente) | 2 créditos | 🔒 premium |
| Gemini (criativo) | — | Em breve |
| Claude (expert) | — | Em breve |

### Eixo B — modelos de IMAGEM (tooltip "6 MODELOS DISPONÍVEIS", no card Pro do paywall)

|  |  |
| :-: | :-: |
| **Modelo** | **Custo** |
| Padrão | 1 crédito/img |
| HD | 3 créditos/img |
| Seedream 4 | 5 créditos/img |
| Flux Pro | 6 créditos/img |
| Nano Banana 2 | 8 créditos/img |
| *Em breve* | — |



**Inconsistência interna registrada:** a seção de modelos da landing mostra **4 nomeados + 2 "Em breve"** — *Padrão, Seedream 4, Flux Pro, Ultra — Nano Banana 2* — e **omite o HD**. O FAQ da mesma landing, porém, lista os cinco (Modo Padrão: 1 crédito. HD: 3 créditos. Seedream 4: 5 créditos. Flux Pro: 6 créditos. Ultra — Nano Banana 2: 8 créditos.), e o tooltip dentro do produto também. **Confiança 90%** de que a tabela correta é a de cinco + 1 em breve.

### Custos medidos na prática (plano FREE)

|  |  |
| :-: | :-: |
| **Ação** | **Custo medido** |
| Gerar carrossel, 3 slides | **1 crédito** |
| Gerar carrossel, 10 slides | **1 crédito** (selo -1, saldo 9 → 8) |
| Gerar carrossel, 5 slides | **1 crédito** (saldo 8 → 7) |
| Melhorar Prompt | **0** |
| Trocar Template pós-geração | **0** |
| Exportar carrossel (render + download) | **0** |
| Gerar imagem com IA | Ø — paywall |



## 6 · Camada 4 — A régua visual, MEDIDA

**Sistema de coordenadas de design: 1080 × 1350 px. Proporção 0.8000 exata (4:5).** Único formato observado. Não há seletor de proporção, nem 1:1, nem 1080×1920. Ø para qualquer outro formato.



**Exportação: PNG 2160 × 2700**, bit depth 8, color type 6 (RGBA) — lido no cabeçalho IHDR dos blobs reais. pixelRatio: 2 confirmado no bundle JS. Ou seja, **exporta em 2× o espaço de design**.

### 6.1 Template Big Idea (slug 2BD)

|  |  |
| :-: | :-: |
| **Métrica** | **Valor medido** |
| Margem lateral | **100 px** (esquerda e direita) |
| Largura útil | **880 px** (81,5 % de 1080) |
| Fundo | \<img\> object-fit: cover, object-position: 50% 50%, natural 1080×1350 |
| **Origem da imagem** | **picsum.photos/1080/1350** — serviço de *placeholder aleatório*. No FREE, o "visual" é ruído sem relação com o tema |
| Overlay | linear-gradient(rgba(0,0,0,0) 0%, rgb(0,0,0) 100%), início em **y = 430**, altura **920** (68 % inferior do slide) |
| Marca d'água | Powered by CarouselAi — **Besley 20 px / lh 30 px**, \#FFFFFF, alinhada à esquerda, x = 100, **y = 1258** (58 px do rodapé) |
| Paleta em uso | \#FFFFFF e \#000000 — só isso |
| Tokens editáveis | 3: Cor Primária \#FFFFFF, Cor de Contraste \#FFFFFF, background \#000000 |



Tipografia por papel de slide:



|  |  |  |  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| **Papel** | **Elemento** | **Família** | **Tamanho** | **Entrelinha** | **Peso** | **Tracking** | **Alinhamento** |
| **HOOK** | título | Montserrat | **72 px** | 108 px (**1,50**) | 400 | normal | center |
| **HOOK** | descrição | Montserrat | **44,59 px** | 66,885 px (**1,50**) | 400 | normal | center |
| **CONTEÚDO** | título | Montserrat | **50 px** | 75 px (**1,50**) | 400 | normal | left |
| **CONTEÚDO** | corpo | **Montserrat Alternates** | **40 px** | 60 px (**1,50**) | 400 | normal | left |
| **CTA** | título | Montserrat | **94 px** | 141 px (**1,50**) | **700** | normal | center |
| **CTA** | corpo | Montserrat Alternates | **40 px** | 60 px (**1,50**) | 400 | normal | center |
| todos | marca d'água | **Besley** | 20 px | 30 px (1,50) | 400 | normal | left |



**Três famílias tipográficas num só template:** Montserrat (títulos), Montserrat Alternates (corpo), Besley (marca d'água). Entrelinha **1,50 uniforme** em absolutamente tudo.



**A posição vertical é fluxo, não coordenada fixa.** O mesmo título de hook ficou em y = 448 quando ocupou 3 linhas (geração A) e em y = 582 quando ocupou 2 (geração B após troca de template). O bloco é ancorado pela base e cresce para cima.



O slide de CTA do Big Idea **não tem foto nem gradiente**: fundo preto chapado. Confirmado pelo peso do PNG (285 KB contra ~6 MB dos demais).

### 6.2 Template Problem Solver (slug minimalist_Intro)

|  |  |
| :-: | :-: |
| **Métrica** | **Valor medido** |
| Margem lateral | **68 px** |
| Largura útil | **944 px** (87,4 %) |
| Fundo | **sem imagem.** O painel *Imagem* responde literalmente: "Nenhuma imagem disponível neste slide." |
| Marca d'água | **ausente** |
| Tags | Tag \#1 em x=68 y=51 · Tag \#2 em x=954 y=51 |
| Tokens editáveis | **13** (ver §7.4) |



|  |  |  |  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| **Papel** | **Elemento** | **Família** | **Tamanho** | **Entrelinha** | **Peso** | **Alinhamento** | **Ancoragem** |
| **HOOK** | título | **Oxygen** | **106 px** | 112 px (**1,057**) | 400 | left | **y = 963** (base) |
| **HOOK** | descrição | — | — | — | — | — | **não renderizada** |
| **CONTEÚDO** (interno delivery) | título | Oxygen | **106 px** | 112 px (1,057) | 400 | left | y = 122 (topo) |
| **CONTEÚDO** | corpo, bloco 1 | Oxygen | **27 px** | 40 px (**1,48**) | 400 | left | y = 1115 |
| **CONTEÚDO** | corpo, bloco 2 | Oxygen | 27 px | 40 px | 400 | left | y = 1219 |
| **CTA** | título | Oxygen | 106 px | 112 px | 400 | left | y = 122 |
| **CTA** | corpo | Oxygen | 27 px | 40 px | 400 | left | y = 1259 |
| todos | tag | **Be Vietnam Pro** | **17,45 px** | 26,175 px (1,50) | **700** | left | y = 51 |



Cores: hook = branco sobre #000000; conteúdo e CTA = preto sobre #FFFFFF. **Inversão por papel de slide.**

### 6.3 O experimento controlado

Com o carrossel B já gerado, usei **"Trocar Template"** para levar **o mesmo texto** de Problem Solver para Big Idea. Custo: 0 crédito. Resultado lado a lado:



|  |  |  |
| :-: | :-: | :-: |
| **Dimensão** | **Problem Solver** | **Big Idea** |
| Margem lateral | 68 px | **100 px** |
| Largura útil | 944 px | **880 px** |
| Famílias | Oxygen + Be Vietnam Pro | **Montserrat + Montserrat Alternates + Besley** |
| Título do hook | 106 px / lh 1,057 / **left** / base | **72 px / lh 1,50 / center** / fluxo |
| Título de conteúdo | 106 px / left | **50 px / left** |
| Corpo | 27 px / lh 1,48 | **40 px / lh 1,50** |
| Título de CTA | 106 px / peso 400 | **94 px / peso 700 / center** |
| Marca d'água | ausente | **presente** |
| Descrição do hook | descartada | **renderizada (44,59 px)** |
| Tags | renderizadas | ausentes |
| Imagem de fundo | nenhuma, e impossível adicionar | placeholder aleatório do picsum |



**Conclusão medida: não é um molde único esticado.** São sistemas tipográficos independentes por template — família, margem, entrelinha, peso, alinhamento e ancoragem mudam todos juntos. Ver §12, pergunta 1, para a ressalva importante.



## 7 · Camada 5 — A régua editorial

### 7.1 Estrutura

Fixa e imposta pelo produto: **slide 1 = hook · miolo = conteúdo · último = CTA**. Declarada no tooltip e confirmada nas duas gerações. Nomes internos dos papéis, lidos no cabeçalho do painel: hook, delivery, cta.

### 7.2 Volume de texto medido

**Geração A — Big Idea, Storytelling, 10 slides:**



|  |  |  |  |
| :-: | :-: | :-: | :-: |
| **Slide** | **Papel** | **Título (caracteres)** | **Corpo (caracteres)** |
| 1 | hook | 25 | 137 |
| 2 | conteúdo | 26 | 168 |
| 3 | conteúdo | 20 | 158 |
| 4 | conteúdo | 22 | 150 |
| 5 | conteúdo | 24 | 141 |
| 6 | conteúdo | 31 | 148 |
| 7 | conteúdo | 19 | 158 |
| 8 | conteúdo | 26 | 143 |
| 9 | conteúdo | 36 | 155 |
| 10 | cta | 30 | 114 |



Faixa de conteúdo: **títulos 19–36 ch (média 25,5)**, **corpos 141–168 ch (média 152)**. Hook e CTA ficam dentro da mesma faixa de título; o corpo do CTA é o mais curto (114).



**Geração B — Problem Solver, Professional, 5 slides:** o corpo vem em **dois blocos independentes** por slide, de 90 a 124 caracteres cada — não um bloco de ~150. A régua editorial **muda com o template**, não só o visual.

### 7.3 Destaque de palavra

**Não acontece.** Censo de color em todos os elementos de texto dos 15 slides gerados: apenas rgb(255,255,255) e rgb(0,0,0). Zero ocorrências do token de destaque.



Isso é notável porque **o token existe**: o Problem Solver expõe Destaque da Capa, Destaque do Conteúdo e Destaque da Chamada, todos #ADADAD. O sistema tem o slot de destaque; **a geração não o usa**. Confiança 90%.

### 7.4 Ficha de marca — existe, mas é por template

|  |  |  |
| :-: | :-: | :-: |
|   | **Big Idea** | **Problem Solver** |
| @Handle | Ø ausente | **presente** (placeholder @ username) |
| Tag \#1 / Tag \#2 | Ø ausentes | **presentes**, com toggle ON e input vazio |
| Tokens de cor | **3** | **13** |



Tokens do Problem Solver, literais:



CAPA (HOOK)          Fundo da Capa      #000000



                     Texto da Capa      #FFFFFF



                     Destaque da Capa   #ADADAD



                     Texto do User Handle #FFFFFF



CONTEÚDO (DELIVERY)  Fundo do Conteúdo  #FFFFFF



                     Texto do Conteúdo  #000000



                     Destaque do Conteúdo #ADADAD



                     Texto do User Handle #000000



CHAMADA (CTA)        Fundo da Chamada   #FFFFFF



                     Texto da Chamada   #000000



                     Destaque da Chamada #ADADAD



                     Texto do User Handle #000000



GERAL / OUTRAS       transparent        #FFFFFF



Ø **Não há seletor de fonte** em nenhum dos dois templates. Ø **Não há upload de logo.** A marca disponível é: cores + @handle + duas tags — e só nos templates que os implementam.

### 7.5 Defeito observado: placeholders vazam para o arquivo final

No Problem Solver, os toggles Tag #1 e Tag #2 vêm **ligados** com os inputs **vazios**, e o renderizador imprime o rótulo literal — Tag #1 e Tag #2 — no canto superior de **todos os 5 slides**, inclusive no PNG exportado. Confiança 95%.

### 7.6 Defeito observado: conteúdo gerado é descartado em silêncio

Ainda no Problem Solver, a IA gerou a descrição do hook — *"Descubra o motivo pelo qual elas perdem clientes rapidamente."* — e ela aparece no painel de edição, mas **o template do hook não a renderiza**. Prova cruzada: ao trocar para Big Idea, essa mesma descrição apareceu no slide. Confiança 95%.

### 7.7 CTA

O texto do CTA é **gerado pela IA a partir do tópico**, não é copy fixa do template.



  - A: *"Transforme seu relacionamento\!"* + *"Invista no diálogo e na personalização. Assim, você pode evitar que o terceiro mês se torne o fim da sua parceria."*
  - B: *"Revise sua estratégia agora\!"* + *"Ajuste seu atendimento para manter seus clientes satisfeitos."*



O preview do Problem Solver mostrava um CTA fixo — *"GOSTOU DO CONTEÚDO? / Compartilhe este carrossel com alguém que quer aprender."* — que **não** apareceu no carrossel gerado. O template exibe copy de vitrine que o gerador substitui.

### 7.8 Legenda

Ø **Não existe.** Nenhum campo, botão ou string no DOM (busca por legenda|caption). O modal de Preview simula o post do Instagram **sem** área de legenda. O produto entrega imagens e nada de texto para o post.



## 8 · Camada 6 — O editor: o que muda, e o que trava

### 8.1 O que dá para mudar

|  |  |
| :-: | :-: |
| **Escopo** | **Controle** |
| Geral | Trocar Template; tokens de cor; @Handle e Tag \#1/\#2 (nos templates que têm) |
| Por slide | Trocar o **papel** do slide: chips Hook \| Conteúdo \| CTA — re-diagrama e **preserva o texto** |
| Por bloco de texto | Editar o texto; **tamanho (px)**; **entrelinha (%)**; **tracking (px)**; 4 alinhamentos; caixa (AB / ab / A̲); **B / I / U**; **cor**; 2 botões com ícone *layers* sem rótulo |
| Descrição | \+ Adicionar Item — múltiplos blocos, cada um com tipografia própria |
| Slides | **Deletar slide** (title="Deletar slide") |
| Vistas | Vista slides \| Vista grade |
| Saída | Preview · Exportar carrossel |



Verificação de que o painel realmente escreve no canvas: alterei o título do hook de **72 → 90 px** e a entrelinha computada saltou de 108 px para **135 px**. Isso também revela a semântica do controle: **a UI mostra "100 %" e o valor real é multiplicador 1,5.** O campo de entrelinha é uma porcentagem *de um 1,5 implícito*, não da altura da fonte.

### 8.2 O que trava — cada trava é uma decisão

|  |  |  |
| :-: | :-: | :-: |
| **Trava** | **Evidência** | **Leitura** |
| **Não dá para adicionar slide** | Nenhum botão de adicionar em lugar nenhum do DOM | Contagem de slides é decisão de geração; mudar exige regerar (**1 crédito**) |
| **Não dá para reordenar** | document.querySelectorAll('\[draggable="true"\]').length === 0 | A ordem narrativa é da IA. O usuário só pode **remover** |
| **Enquadramento de imagem totalmente desabilitado** | Posição X, Posição Y, Zoom, Rotação, flip H, flip V, Preencher, Conter e Resetar estão todos com **pointer-events: none** (vários também com disabled: true), enquanto opacity continua 1 | Controles **parecem ativos e não são**. Só Fazer upload e Gerar com IA 🔒 respondem |
| **Arrastar a imagem no canvas não faz nada** | cursor: auto; object-position imóvel em 50% 50% após arrasto | Não existe reposicionamento direto |
| **Templates sem slot de imagem não aceitam imagem** | Problem Solver: "Nenhuma imagem disponível neste slide." — sem upload, sem IA | Ter imagem é propriedade do template, não escolha do usuário |
| **Tags não editáveis por slide** | Só em Ajustes Gerais, e só nos templates que as têm | Ver defeito §7.5 |
| **Sem seletor de fonte** | Ausente nos dois templates | A família tipográfica é do template, ponto |
| **Estado não sobrevive a refresh** | Recarregar /pt/aiGenerator volta com Template: vazio e sem carrossel; a Galeria (histórico) é paga | No FREE, **fechar a aba destrói o trabalho** |

### 8.3 Enquadramento de imagem — como é, de fato

Quando disponível (template com slot + plano pago, presumido), a interface oferece:



[ Imagem ] [ Cor Sólida ] [ Gradiente ]                    ↺ Resetar



 ↔  Posição X   50 %            ↕  Posição Y   50 %



 🔒 Zoom       100 %            ↻  Rotação      0 °



 [ espelhar horizontal ]        [ espelhar vertical ]      (sem rótulo)



 [ Preencher ]                  [ Conter ]



 [ Fazer upload ]               [ Gerar com IA 🔒 ]



**Quatro campos numéricos.** Sem arrastar. Sem grade. Sem enquadramento por rosto ou por foco. Sem preview de recorte. É a solução mais conservadora possível.

### 8.4 "Trocar Template"

Modal com aviso literal:



**Atenção:** Mudar o template fará com que o design e as cores se adaptem ao novo formato. Você pode precisar reajustar textos longos ou imagens manualmente.



Comportamento medido: troca **instantânea**, **0 crédito**, **texto integralmente preservado**, e o novo template reaplica famílias, margens, cores, marca d'água e quais campos renderizar. Este é, de longe, o melhor mecanismo do editor.



## 9 · Camada 7 — A saída

### 9.1 Fluxo

Exportar carrossel → renderiza slide a slide (Gerando... 1/10 … 10/10, **~3 s por slide**, ~30 s para 10) → o botão vira **Salvar** → modal:



**Múltiplos Arquivos** Vamos baixar as 10 imagens. O seu navegador pode exibir um aviso pedindo permissão para o **download múltiplo**. Por favor, clique em **Permitir** caso apareça um alerta na tela, ou libere essa opção nas configurações do seu navegador (Downloads Automáticos). **[ Baixar 10 Imagens ]**

### 9.2 O que sai — medido no blob real

|  |  |
| :-: | :-: |
| **Propriedade** | **Valor** |
| Formato | **PNG** (image/png) |
| Resolução | **2160 × 2700 px** (2× o design; pixelRatio: 2 no bundle) |
| Bit depth / color type | 8 / 6 (RGBA) |
| Empacotamento | **Um arquivo por slide. SEM ZIP.** |
| Padrão de nome | \`${e}-${i+1}.png\` (a base e não foi determinada — Ø) |
| Peso, slides com foto | 6.033.847 a 6.061.391 bytes (**\~6,0 MB cada**) |
| Peso, slide de fundo chapado | **285.159 bytes** |
| Total de um carrossel de 10 | **\~54 MB** |
| Custo em crédito | **0** |
| PDF / MP4 / ZIP / legenda junto | Ø — não existem |

### 9.3 Marca d'água

Powered by CarouselAi aparece no Big Idea e **não aparece** no Problem Solver. **No plano FREE a marca d'água não é universal — é propriedade do template.** Confiança 90%. (Não testei os outros 11 templates: Ø.)

### 9.4 Preview

Mockup de post do Instagram: avatar, minha_marca, Patrocinado, ícones de curtir/comentar/enviar/salvar, **"4.821 curtidas"** fictício e pontos de paginação. **Sem legenda. Sem opção de LinkedIn.**

### 9.5 Telemetria encontrada no bundle

Nomes de evento: start_capture, export_slide_success, export_slide_error, start_share_or_download. O último sugere um caminho de *share* que não achei exposto na interface (Ø).



## 10 · Transversais

### 10.1 Estados e erros

|  |  |  |
| :-: | :-: | :-: |
| **Estado** | **Observado?** | **O que acontece** |
| **Texto curto** | **Sim** | Não há mensagem de erro. O botão Gerar Carrossel fica **desabilitado** abaixo de 10 caracteres. O produto **previne** em vez de errar |
| **URL ilegível** | Ø | Não observável: a aba URL está travada no plano FREE |
| **Crédito insuficiente** | Ø | Não observado — exigiria queimar os 7 créditos restantes. No bundle há copy genérica *"Ocorreu um erro ao processar sua solicitação."* e uma string começando com *"Você atingiu o li…"*, mas **não vi o estado renderizado** |
| **Aba travada** | Sim | Clique inerte: sem modal, sem toast, sem upsell |
| **Recurso premium** | Sim | O toggle de imagem abre o **paywall** em vez de ligar |
| **Progresso de geração** | Sim | Barra fica parada em **25 %** enquanto o cronômetro conta ("Escrevendo roteiro do carrossel - Tempo total estimado: 0:28"). O tempo estimado foi **0:28 para 10 slides e 0:26 para 5** — praticamente fixo, não proporcional |

### 10.2 Negócio

Plano da conta observada: **FREE**, 9 créditos iniciais.



|  |  |  |  |  |
| :-: | :-: | :-: | :-: | :-: |
| **Plano** | **Mensal** | **Anual (−20 %)** | **Créditos/mês** | **Carrosséis anunciados** |
| **Hobby** — "Para criadores" | R$ 30 | R$ 24,92/mês (R$ 299/ano) | 250 | "≈ até 40/mês" · "Até 480/ano" |
| **Pro** — "Mais escolhido" | R$ 79 | R$ 65,83/mês (R$ 790/ano) | 850 | "≈ até 140/mês" · "Até 1680/ano" |
| **Pro Max** — "Para gestores de marca" | R$ 210 | R$ 168/mês (R$ 2.016/ano) | 2.500 | "≈ até 415/mês" · "Até 4.980/ano" |



Tooltip sobre a contagem: *"A quantidade de carrosséis pode variar de acordo com o modelo de IA utilizado."*



Recursos por plano, literais:



  - **Hobby:** Geração de imagens com IA · Geração de texto com IA · Criação de carrosséis a partir de um link
  - **Pro:** Tudo do Hobby · Criação de carrosséis a partir de vídeos do YouTube Shorts · Acesso a todos os 6 modelos de IA · Suporte por e-mail
  - **Pro Max:** Tudo do Pro · Acesso antecipado a novos modelos · Suporte prioritário



Do FAQ: créditos mensais **não acumulam** entre ciclos; **pacotes avulsos não expiram**; YouTube Shorts só **a partir do Pro**; plugin de Figma incluso em todos os pagos; "Você sempre verá o custo exato antes de gerar".



Bloqueio de histórico, literal: *"****Recurso Premium*** *— A biblioteca de histórico salva todas as suas criações e edições passadas. Disponível apenas para usuários dos planos pagos."*



Números da landing: **"Mais de 12.000 carrosséis criados"** · "60s do link ao carrossel" · "40h economizadas por mês" · "6 Modelos de IA disponíveis". Comparativo de custo próprio: "O QUE VOCÊ PAGA HOJE — R$ 521/mês" vs "A partir de R$ 30/mês" · "ECONOMIZE R$ 496/MÊS".



## 11 · Achados, com evidência e confiança

Nenhum é recomendação. São observações com o grau de certeza que a evidência sustenta.



|  |  |  |  |
| :-: | :-: | :-: | :-: |
| **\#** | **Achado** | **Evidência** | **Confiança** |
| A1 | **No plano FREE, o produto é um gerador de texto com moldura. Imagem é 100 % paga.** | Toggle Assistência de Imagem abre paywall; fundos vêm de picsum.photos/1080/1350 (placeholder aleatório); painel de enquadramento com pointer-events: none | 95% |
| A2 | **A promessa central da landing — "Cole qualquer link" — não é executável no FREE.** As abas URL, SHORTS e VÍDEO estão travadas e o clique é inerte | Transcrição da tela + clique sem efeito | 95% |
| A3 | **Custo de texto é 1 crédito fixo, invariante ao nº de slides.** | Selo -1 com 3 e com 10 slides; saldo 9→8→7 em duas gerações | 98% |
| A4 | **Formato único: 4:5. Um só destino real (Instagram).** | 1080×1350 em todo lugar; Preview só simula Instagram; nenhum seletor de proporção | 90% |
| A5 | **Cada template é um sistema tipográfico próprio, não um molde esticado.** | Experimento controlado com o mesmo texto: margem 68→100 px, Oxygen→Montserrat, lh 1,057→1,50, 106→72 px | 92% |
| A6 | **Mas dentro de um template o corpo tem tamanho fixo por papel; não há ajuste ao volume de texto.** | Descrição de hook do Big Idea renderizou **44,59 px** tanto com 137 quanto com 61 caracteres | 90% |
| A7 | **Enquadramento de imagem é numérico e conservador — pior que arrastar-com-zoom, não melhor.** | 4 campos: Posição X %, Posição Y %, Zoom %, Rotação °. Sem arrasto, sem grade, sem foco | 95% |
| A8 | **Controles desabilitados sem qualquer sinal visual.** opacity: 1 com pointer-events: none | CSS computado de 9 controles do painel Imagem | 95% |
| A9 | **Placeholders de tag vazam para o PNG exportado.** Tag \#1 / Tag \#2 impressos em todos os slides do Problem Solver | Medição do DOM + render de exportação | 95% |
| A10 | **Conteúdo gerado é descartado em silêncio por alguns templates.** A descrição do hook do Problem Solver existe no painel e não é renderizada | Prova cruzada: reapareceu ao trocar para Big Idea | 95% |
| A11 | **A saída é 10 PNGs soltos de \~6 MB cada, sem ZIP, com aviso de "download múltiplo".** | Cabeçalho IHDR dos blobs + modal transcrito | 98% |
| A12 | **Não há legenda para o post.** Entrega imagem e para por aí | Busca no DOM; Preview sem área de legenda | 90% |
| A13 | **Marca d'água não é universal no FREE — depende do template.** | Presente no Big Idea, ausente no Problem Solver | 90% |
| A14 | **Melhorar Prompt** **é grátis e faz o trabalho de briefing que o formulário não pede.** 46 → 1.300 caracteres, com público, ângulo, estrutura slide a slide, exemplos, restrição e CTA | Saldo inalterado; texto completo no Anexo D | 95% |
| A15 | **Trocar Template** **preserva 100 % do texto e é grátis.** | Troca executada; 5 slides mantidos; 0 crédito | 95% |
| A16 | **No FREE o trabalho não sobrevive a um refresh.** Histórico é pago; recarregar a URL zera o estado | Galeria = "Recurso Premium"; reload volta com Template: vazio | 92% |
| A17 | **Não há adicionar nem reordenar slide — só deletar.** | Zero elementos draggable; nenhum botão de adicionar | 95% |
| A18 | **O token de destaque existe e a IA não o usa.** \#ADADAD definido para os três papéis; censo de cores dos 15 slides gerados só encontrou preto e branco | Medição de color em todos os nós de texto | 90% |
| A19 | **Barra de progresso é decorativa.** Fica em 25 % enquanto o cronômetro anda; a estimativa é \~fixa (0:28 para 10 slides, 0:26 para 5) | Duas gerações observadas | 85% |
| A20 | **Inconsistência entre landing e produto na tabela de modelos:** a landing omite o HD na vitrine e o inclui no FAQ | Comparação das duas seções + tooltip do produto | 90% |



## 12 · As cinco perguntas

**(1) A régua deles é medida ou template genérico esticado?** **Medida — por template.** O experimento controlado (mesmo texto, dois templates, via Trocar Template) mostrou que família, margem, largura útil, entrelinha, peso, alinhamento e ancoragem mudam **todos juntos e de forma coerente**: Problem Solver é 68 px de margem, Oxygen, 106 px com entrelinha 1,057 ancorado no rodapé; Big Idea é 100 px, Montserrat/Montserrat Alternates, 72 px com entrelinha 1,50 centralizado em fluxo. Isso é design de sistema, não escala automática. **Ressalva que vale tanto quanto o achado:** dentro de um template a régua é **fixa por papel de slide** — o corpo é 40 px no Big Idea e 27 px no Problem Solver **independente do volume de texto**; a única adaptação é o fluxo vertical. Eles resolveram a consistência abrindo mão da adaptação. Confiança 90%.



**(2) Resolvem enquadramento de imagem melhor que arrastar com zoom?** **Não. Resolvem pior.** Quatro campos numéricos (Posição X %, Posição Y %, Zoom %, Rotação °) mais espelhar e Preencher/Conter. Sem arrasto, sem grade, sem enquadramento assistido, sem preview de recorte. E no plano observado o painel inteiro está morto por CSS. Além disso, **ter imagem é decisão do template**: metade da amostra (Problem Solver) simplesmente responde "Nenhuma imagem disponível neste slide". Não há nada a copiar aqui. Confiança 95%.



**(3) Têm algo parecido com aprender com o uso, ou geram sempre do zero?** **Não vi nada de aprendizado.** Não há ficha de marca persistente, não há "usar isto como referência", não há memória entre gerações, e no FREE nem histórico existe. As duas gerações partiram do zero com o mesmo tópico. O que existe no plano pago é **arquivo** ("A biblioteca de histórico salva todas as suas criações e edições passadas") — e guardar não é aprender. Confiança 75% de que geram sempre do zero; o resto é Ø porque não pude observar o comportamento do plano pago.



**(4) O contrato de entrada pede algo que a gente não pede e que melhora o resultado?** **Pede menos, não mais.** O formulário tem quatro campos (agente, nº de slides, idioma, tópico) e **nenhum** de público, tom livre, CTA ou marca. Mas fizeram outra coisa, e essa vale copiar: **Melhorar Prompt****, grátis, transforma o tópico do usuário no briefing que o formulário deixou de pedir.** Meus 46 caracteres viraram 1.300 contendo público-alvo explícito, ângulo central, estrutura slide a slide em linha do tempo, exemplos concretos, uma restrição de compliance ("sem prometer resultados garantidos") e a instrução de CTA. **Em vez de perguntar o brief ao usuário, o produto escreve o brief e mostra para ele editar.** É a inversão mais interessante do produto inteiro. Confiança 95%. (Anexo D.)



**(5) Como fazem a capa?** Capa = **"slide de intro" obrigatório**, papel fixo, primeiro slide, imposto pelo tooltip e pela aritmética N−2. Não há gerador de gancho separado, não há limite de caracteres específico para capa, não há variação para escolher, não há teste A/B. O tratamento é **inteiramente do template**:



  - Big Idea: foto de fundo (no FREE, **placeholder aleatório do picsum**, sem relação com o tema) + gradiente preto do meio para baixo (y=430, altura 920) + título 72 px centralizado + descrição 44,59 px + marca d'água.
  - Problem Solver: preto chapado + título **106 px com entrelinha 1,057** ancorado no rodapé — e **a descrição gerada é descartada**.



Ou seja: eles não resolveram a capa; eles a delegaram ao template e deixaram a IA escrever um título de 25–38 caracteres. Confiança 85%.



## 13 · Hipóteses de partida — confirmadas e derrubadas

As seis que o usuário trouxe (~70 % de confiança, por busca, sem ter visto o produto):



|  |  |  |  |
| :-: | :-: | :-: | :-: |
| **Hipótese** | **Veredito** | **Evidência** | **Confiança** |
| "Cola URL/Short/texto e devolve carrossel editável" | **Parcialmente DERRUBADA** | Só TÓPICO funciona. URL, SHORTS e VÍDEO travados e inertes no FREE | 95% |
| "…para LinkedIn e Instagram" | **DERRUBADA** no observável | Formato único 4:5; Preview só simula Instagram; sem seletor de proporção ou destino | 90% |
| "Seis modelos de rápido a extraordinário" | **Parcialmente confirmada — o mapa é outro** | São **dois eixos**: imagem (5 nomeados + 1 em breve) e texto (2 vivos + 2 em breve). A landing funde os dois num número | 95% |
| "Imagem custa 1 a 8 créditos" | **CONFIRMADA (documental)** | 1 / 3 / 5 / 6 / 8 na tabela do produto. **Empiricamente** **Ø** — geração de imagem é paga | 90% doc · 0% emp |
| "Público de criadores e marketing" | **CONFIRMADA** | Rótulos dos planos: "Para criadores", "Para gestores de marca"; depoimentos de criadora, consultor de marketing e empreendedora | 85% |
| "/pt/entry é a entrada" | **CONFIRMADA** | É a bifurcação real do produto | 99% |



## 14 · Hipóteses MINHAS, refutadas de propósito

A M001 fechou com "os botões estão quebrados" a 85 % de confiança, e era o instrumento. Cinco repetições disso aqui:



**R1 — "Os botões de vista (slides/grade) estão quebrados." Cheguei a ~80 %. FALSO.** Dois cliques bem posicionados sobre um <button> de 36×36 não surtiram efeito. elementFromPoint no centro exato do botão devolvia um DIV: a **pílula do stepper cobre os botões a 980 px de viewport**. Alarguei a janela para 1214 px e os dois funcionaram na primeira tentativa. **Não é botão quebrado — é colisão de layout em tela estreita** (o que continua sendo um defeito de produto, mas de outra natureza e outra gravidade).



**R2 — "O painel de enquadramento de imagem está quebrado." Derrubada pela metade.** Campo numérico que não aceita digitação, + que não incrementa, Conter que não muda object-fit, arrasto sem efeito — parecia quebra. Inspeção do CSS computado: pointer-events: none em **todos** eles, vários com disabled: true. É **desabilitação deliberada**, não falha. O achado permanece (controle desabilitado sem sinal visual, A8), mas a causa mudou — e a diferença importa: "quebrado" vira bug para reportar, "desabilitado" vira decisão de monetização para copiar ou não.



**R3 — "A descrição da capa tem auto-fit por volume de texto." FALSO.** O 44,59 px — número quebrado, típico de cálculo — parecia ajuste automático. Duas amostras: **137 caracteres** (geração A) e **61 caracteres** (geração B após troca de template). Ambas renderizaram **44,59 px**. É constante do template. Se eu tivesse medido só um carrossel, teria publicado o oposto.



**R4 — "O segundo parágrafo do corpo some no Big Idea." FALSO, por um triz.** Meu extrator de nós-folha listou **um** bloco de corpo onde a tela mostrava **dois parágrafos**. Ia virar achado de "conteúdo perdido". Li o textContent inteiro: são os dois parágrafos num **único nó**, unidos por \n\n, com white-space: pre-wrap — 244 caracteres, 420 px de altura. O falso achado morreu por conferência de comprimento, não por sorte. **Registro a diferença estrutural real que sobrou:** o Big Idea **funde** os itens de descrição num nó; o Problem Solver os mantém como **blocos independentes com tipografia própria**.



**R5 — "O modal de preços fechou." FALSO.** get_page_text devolveu o conteúdo do gerador e eu tratei como prova de que o modal tinha fechado. A ferramenta lê <main> e **ignora overlays**. O modal estava aberto por cima; a digitação de teste seguinte foi para o vazio. Só o screenshot revelou.



## 15 · O que ficou faltando — Ø

|  |  |  |  |
| :-: | :-: | :-: | :-: |
| **\#** | **Não observado** | **Por quê** | **Como fechar** |
| Ø1 | **Geração de imagem por IA** — qualidade, tempo, coerência com o tema, e se os controles de enquadramento acordam com imagem própria | Paywall no FREE | Plano Hobby (R$ 30) por um ciclo |
| Ø2 | **Fluxo URL → carrossel** e **Shorts → carrossel** | Abas travadas | Plano Hobby (URL) e Pro (Shorts) |
| Ø3 | **Estado de crédito insuficiente** | Exigiria queimar os 7 créditos restantes | Deliberado. Queimar créditos em conta descartável |
| Ø4 | **Estado de URL ilegível** | Depende de Ø2 | — |
| Ø5 | **11 dos 13 templates** — régua visual, ficha de marca e presença de marca d'água | Cada medição confiável custa 1 crédito | 11 créditos, ou uso do Trocar Template (grátis) sobre um carrossel já gerado — **este é o caminho barato e eu não o explorei a fundo; foi um erro de sequenciamento meu** |
| Ø6 | **Efeito real dos 4 agentes de IA sobre o texto** | Só rodei Storytelling e Professional, e com templates diferentes — as variáveis estão confundidas | 2 créditos, mesmo template, só trocando o agente |
| Ø7 | **Efeito do** **Idioma de saída** e dos modelos de texto pagos | 1 crédito cada | — |
| Ø8 | **Base do nome de arquivo exportado** (o e em \`${e}-${i+1}.png\`) | Minificação do bundle | Ler o Downloads do usuário: os 10 PNGs da 1ª exportação estão lá |
| Ø9 | **Função dos 2 botões "layers"** no painel de tipografia | Sem rótulo, sem tooltip | Clicar e medir |
| Ø10 | **Tela "Minha Conta"** e limites de conta | **Deliberado** — a missão proibiu mexer em conta/plano/pagamento e preferi não abrir | Só se o usuário liberar |
| Ø11 | **Caminho de "share"** sugerido pelo evento start\_share\_or\_download | Não encontrei na interface | — |
| Ø12 | **Plugin de Figma** anunciado na landing | Fora do escopo desta sessão | — |
| Ø13 | **Prints das telas do editor** | **Erro meu de procedimento** (L8): navegei para fora do editor sem exportar as capturas, e sem histórico no FREE o estado se perdeu | 1 crédito para regerar e recapturar |



## Anexo A — JSON bruto da Camada 4

### A.1 Saída do script original da missão, **como veio** (com o seletor errando o alvo)

{



 "slide": { "w": 75, "h": 94 },



 "fundo": "rgba(0, 0, 0, 0)",



 "blocos": [



  { "txt": "O perigo do terceiro mês\!", "fonte": "Montserrat", "px": "72px", "peso": "400",



    "lh": "108px", "tracking": "normal", "cor": "rgb(255, 255, 255)", "align": "center",



    "x": 7, "y": 33, "larg": 65 },



  { "txt": "Depois de meses de dedicação, algo inesper", "fonte": "Montserrat", "px": "44.59px",



    "peso": "400", "lh": "66.885px", "tracking": "normal", "cor": "rgb(255, 255, 255)",



    "align": "center", "x": 7, "y": 58, "larg": 65 },



  { "txt": "Powered by CarouselAi", "fonte": "Besley", "px": "20px", "peso": "400",



    "lh": "30px", "tracking": "normal", "cor": "rgb(255, 255, 255)", "align": "left",



    "x": 7, "y": 93, "larg": 65 }



 ]



}



**Leia com L4 em mente.** slide.w = 75 denuncia o problema: o seletor casou com a **miniatura** do rail, não com o slide. Tipografia (px, lh, peso, cor) está correta — vem do CSS computado. **Coordenadas e larguras estão em espaço escalado e são inúteis.** fundo: rgba(0,0,0,0) também engana: o fundo real é um <img> filho, não background-color.

### A.2 Medição corrigida — render de exportação, scale 1, espaço 1080×1350

**Geração A ·** **Big Idea** **· slide 1 (hook):**



{



 "slide": { "w": 1080, "h": 1350, "ratio": "0.8000" },



 "fundo": "rgb(255, 255, 255)",



 "imgs": [ { "natW": 1080, "natH": 1350, "w": 1080, "h": 1350, "x": 0, "y": 0,



             "fit": "cover", "pos": "50% 50%", "op": "1",



             "origem": "picsum.photos/1080/1350" } ],



 "overlays": [



   { "bgImg": "linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)",



     "x": 0, "y": 430, "w": 1080, "h": 920 } ],



 "blocos": [



  { "txt": "O perigo do terceiro mês\!", "fonte": "Montserrat", "px": "72px", "peso": "400",



    "lh": "108px", "tracking": "normal", "cor": "rgb(255,255,255)", "align": "center",



    "x": 100, "y": 448, "larg": 880, "alt": 216 },



  { "txt": "Depois de meses de dedicação, algo inesperado acontece...", "fonte": "Montserrat",



    "px": "44.59px", "peso": "400", "lh": "66.885px", "cor": "rgb(255,255,255)",



    "align": "center", "x": 100, "y": 918, "larg": 880 },



  { "txt": "Powered by CarouselAi", "fonte": "Besley", "px": "20px", "peso": "400",



    "lh": "30px", "cor": "rgb(255,255,255)", "align": "left",



    "x": 100, "y": 1258, "larg": 880, "alt": 34 }



 ]



}



**Geração A ·** **Big Idea** **· slide 2 (conteúdo) e slide 10 (CTA)** — formato [txt, fonte, px, peso, lh, tracking, cor, align, x, y, larg]:



{



 "S2_conteudo": {



   "blocos": [



     ["Expectativas vs. Realidade","Montserrat","50px","400","75px","normal","rgb(255,255,255)","left",100,617,880],



     ["No início, tudo parece perfe","Montserrat Alternates","40px","400","60px","normal","rgb(255,255,255)","left",100,812,880],



     ["Powered by CarouselAi","Besley","20px","400","30px","normal","rgb(255,255,255)","left",100,1258,880]



   ],



   "grad": [["linear-gradient(rgba(0,0,0,0) 0%, rgb(0,0,0) 100%)", 430, 920]]



 },



 "S10_cta": {



   "blocos": [



     ["Transforme seu relacionament","Montserrat","94px","700","141px","normal","rgb(255,255,255)","center",100,424,880],



     ["Invista no diálogo e na pers","Montserrat Alternates","40px","400","60px","normal","rgb(255,255,255)","center",100,746,880],



     ["Powered by CarouselAi","Besley","20px","400","30px","normal","rgb(255,255,255)","left",100,1258,880]



   ],



   "grad": []



 }



}



**Geração B ·** **Problem Solver** **· slides 1, 2 e 5:**



{



 "S1_hook": [



  ["Tag #1","Be Vietnam Pro","17.45px","700","26.175px","normal","rgb(255,255,255)","left",68,51,54],



  ["Tag #2","Be Vietnam Pro","17.45px","700","26.175px","normal","rgb(255,255,255)","left",954,51,54],



  ["A maioria das agências digitai","Oxygen","106px","400","112px","normal","rgb(255,255,255)","left",68,963,944]



 ],



 "S2_delivery": [



  ["Tag #1","Be Vietnam Pro","17.45px","700","26.175px","normal","rgb(0,0,0)","left",68,51,54],



  ["Tag #2","Be Vietnam Pro","17.45px","700","26.175px","normal","rgb(0,0,0)","left",954,51,54],



  ["Expectativa vs. Realidade","Oxygen","106px","400","112px","normal","rgb(0,0,0)","left",68,122,944],



  ["Muitas agências prometem resul","Oxygen","27px","400","40px","normal","rgb(0,0,0)","left",68,1115,944],



  ["Clientes esperam um ROI tangív","Oxygen","27px","400","40px","normal","rgb(0,0,0)","left",68,1219,944]



 ],



 "S5_cta": [



  ["Tag #1","Be Vietnam Pro","17.45px","700","26.175px","left",68,51,54],



  ["Tag #2","Be Vietnam Pro","17.45px","700","26.175px","left",954,51,54],



  ["Revise sua estratégia agor","Oxygen","106px","400","112px","left",68,122,944],



  ["Ajuste seu atendimento par","Oxygen","27px","400","40px","left",68,1259,944]



 ],



 "fundo_S5": "rgb(255, 255, 255)"



}



**Mesmo texto de B renderizado em** **Big Idea** **(experimento controlado, via Trocar Template):**



{



 "S1": [["A maioria das agências d","Montserrat","72px","400","108px","center",100,582,880],



        ["Descubra o motivo pelo q","Montserrat","44.59px","400","66.885px","center",100,918,880],



        ["Powered by CarouselAi","Besley","20px","400","30px","left",100,1258,880]],



 "S2": [["Expectativa vs. Realidad","Montserrat","50px","400","75px","left",100,437,880],



        ["Muitas agências prometem","Montserrat Alternates","40px","400","60px","left",100,632,880],



        ["Powered by CarouselAi","Besley","20px","400","30px","left",100,1258,880]],



 "S5": [["Revise sua estratégia ag","Montserrat","94px","700","141px","center",100,454,880],



        ["Ajuste seu atendimento p","Montserrat Alternates","40px","400","60px","center",100,776,880],



        ["Powered by CarouselAi","Besley","20px","400","30px","left",100,1258,880]]



}

### A.3 Medição da exportação (cabeçalho PNG dos blobs reais)

[{"slide":1,"w":2160,"h":2700,"bit":8,"color":6,"bytes":6061391},



 {"slide":2,"w":2160,"h":2700,"bit":8,"color":6,"bytes":6044923},



 {"slide":3,"w":2160,"h":2700,"bit":8,"color":6,"bytes":6045468},



 {"slide":4,"w":2160,"h":2700,"bit":8,"color":6,"bytes":6043999},



 {"slide":5,"w":2160,"h":2700,"bit":8,"color":6,"bytes":6042182},



 {"slide":6,"w":2160,"h":2700,"bit":8,"color":6,"bytes":6043611},



 {"slide":7,"w":2160,"h":2700,"bit":8,"color":6,"bytes":6036747},



 {"slide":8,"w":2160,"h":2700,"bit":8,"color":6,"bytes":6033847},



 {"slide":9,"w":2160,"h":2700,"bit":8,"color":6,"bytes":6044455},



 {"slide":10,"w":2160,"h":2700,"bit":8,"color":6,"bytes":285159}]



## Anexo B — Texto integral do carrossel, Geração A

**Config:** template Big Idea · agente Storytelling · 10 slides · Português (Brasil) · GPT-4 (rápido) · Assistência de Imagem desligada · custo 1 crédito. **Tópico digitado:** Por que a maioria das agencias digitais perde cliente no terceiro mes de contrato



**SLIDE 1 — HOOK** Título: **O perigo do terceiro mês\!** Descrição: Depois de meses de dedicação, algo inesperado acontece. Vemos clientes se afastando no auge da parceria. O que pode estar por trás disso?



**SLIDE 2 — CONTEÚDO** Título: **Expectativas vs. Realidade** Corpo: No início, tudo parece perfeito. Promessas de crescimento, ideias brilhantes. Mas, ao chegar ao terceiro mês, a falta de resultados palpáveis começa a gerar frustração.



**SLIDE 3 — CONTEÚDO** Título: **Falta de Comunicação** Corpo: As reuniões que eram frequentes agora se tornam raras. Sem feedback constante, os clientes sentem-se esquecidos, como se o relacionamento estivesse esfriando.



**SLIDE 4 — CONTEÚDO** Título: **Mudanças de Estratégia** Corpo: Estratégias que funcionavam podem precisar de ajustes. Sem adaptação, a sensação é de estagnação. O que antes trazia resultados agora parece ineficaz.



**SLIDE 5 — CONTEÚDO** Título: **A Pressão dos Resultados** Corpo: Após meses de investimento, os clientes esperam ver resultados tangíveis. A pressão aumenta e o desespero pode levar a decisões precipitados. *(erro de concordância no original: "decisões precipitados")*



**SLIDE 6 — CONTEÚDO** Título: **Concorrência Apresenta Atrações** Corpo: Enquanto a agência luta para entregar, a concorrência faz propostas tentadoras. Descontos e promessas de resultados rápidos podem seduzir o cliente.



**SLIDE 7 — CONTEÚDO** Título: **Desconexão da Marca** Corpo: Com o tempo, a conexão emocional que o cliente tinha com a marca pode se dissipar. A falta de envolvimento nas campanhas deixa o cliente se sentindo distante.



**SLIDE 8 — CONTEÚDO** Título: **Resultados Não Mensuráveis** Corpo: Muitas agências falham em mostrar o impacto real das suas ações. Sem dados claros, os clientes têm dificuldades para justificar o investimento.



**SLIDE 9 — CONTEÚDO** Título: **Retenção é um Jogo de Relacionamento** Corpo: A retenção não é apenas sobre resultados; é sobre construir um relacionamento. Um toque humano e atenção às necessidades do cliente fazem toda a diferença.



**SLIDE 10 — CTA** Título: **Transforme seu relacionamento\!** Corpo: Invista no diálogo e na personalização. Assim, você pode evitar que o terceiro mês se torne o fim da sua parceria.



*Marca d'água em todos os 10 slides: "Powered by CarouselAi". Nenhuma palavra destacada em nenhum slide. Nenhuma legenda gerada.*



## Anexo C — Texto integral do carrossel, Geração B

**Config:** template Problem Solver · agente Professional · 5 slides · Português (Brasil) · GPT-4 (rápido) · custo 1 crédito. Mesmo tópico.



**SLIDE 1 — HOOK** Título: **A maioria das agências digitais falha\!** Descrição gerada: *Descubra o motivo pelo qual elas perdem clientes rapidamente.* — **presente no editor, NÃO renderizada no slide** (ver A10)



**SLIDE 2 — CONTEÚDO** (delivery) Título: **Expectativa vs. Realidade** Bloco 1: Muitas agências prometem resultados rápidos, mas a realidade é diferente. Após o segundo mês, a frustração começa a crescer. Bloco 2: Clientes esperam um ROI tangível, mas a falta de comunicação e análises claras pode gerar desconfiança e insatisfação.



**SLIDE 3 — CONTEÚDO** Título: **Falta de Transparência** Bloco 1: Agências que não compartilham relatórios regulares e dados de desempenho perdem a confiança dos clientes. Bloco 2: A transparência é crucial: clientes querem ver números e resultados claros para justificar seu investimento.



**SLIDE 4 — CONTEÚDO** Título: **Inadequação das Expectativas** Bloco 1: Muitas vezes, o que as agências oferecem não está alinhado com as expectativas do cliente. Bloco 2: Compreender as necessidades específicas e ajustar abordagens pode evitar a perda de contratos.



**SLIDE 5 — CTA** Título: **Revise sua estratégia agora\!** Corpo: Ajuste seu atendimento para manter seus clientes satisfeitos.



*Todos os 5 slides carregam* *Tag #1* *e* *Tag #2* *impressos nos cantos superiores. Sem marca d'água. Nenhuma palavra destacada. Nenhuma legenda.*



## Anexo D — O que o "Melhorar Prompt" produz (grátis, 0 crédito)

**Entrada (46 caracteres):**



reter cliente de agencia depois do terceiro mes



**Saída (1.300 caracteres):**



Crie um carrossel para donos de agências e gestores de contas sobre como reter clientes após o terceiro mês — o momento em que a novidade acaba e o cliente começa a avaliar resultados, processo e custo-benefício com mais rigor. O ângulo central deve ser: a renovação não é conquistada no fim do contrato, mas construída antes do terceiro mês com percepção contínua de valor. Direcione o conteúdo a agências de marketing, social media ou performance que entregam atividades, mas têm dificuldade para mostrar impacto e evitar pedidos de cancelamento. Estruture os slides como uma linha do tempo: sinais de risco no primeiro e segundo mês; o que apresentar na reunião do terceiro mês; como conectar entregas a objetivos do cliente; quais próximos passos propor para os 90 dias seguintes; e como registrar avanços, aprendizados e prioridades. Inclua exemplos concretos, como comparar o cenário inicial com indicadores atuais, destacar decisões tomadas com base nos dados e apresentar um plano trimestral com metas, responsáveis e critérios de sucesso — sem prometer resultados garantidos. Gere reconhecimento e urgência logo no início. Finalize convidando o leitor a salvar o carrossel para preparar a próxima reunião de renovação e comentar qual é o maior motivo de cancelamento enfrentado pela agência.



**Anatomia do que ele injeta, que o formulário não pediu:** público-alvo nomeado · ângulo central (a tese) · segmentação de nicho · estrutura slide a slide · tipo de exemplo · restrição de compliance · instrução de gancho · instrução de CTA com duas ações (salvar + comentar).



## Anexo E — Transcrições literais de interface

**Galeria bloqueada:**



**Recurso Premium** A biblioteca de histórico salva todas as suas criações e edições passadas. Disponível apenas para usuários dos planos pagos. **[ Ver Planos ]**



**Modal de exportação:**



**Múltiplos Arquivos** Vamos baixar as 10 imagens. O seu navegador pode exibir um aviso pedindo permissão para o **download múltiplo**. Por favor, clique em **Permitir** caso apareça um alerta na tela, ou libere essa opção nas configurações do seu navegador (Downloads Automáticos). **[ Baixar 10 Imagens ]**



**Modal de troca de template:**



**Atenção:** Mudar o template fará com que o design e as cores se adaptem ao novo formato. Você pode precisar reajustar textos longos ou imagens manualmente.



**Loading da geração:**



Escrevendo roteiro do carrossel - Tempo total estimado: 0:28   [barra em 25%]



**Rótulos dos papéis de slide no preview do template:**



INTRO SLIDE · CONTENT SLIDE · CTA SLIDE



**Cabeçalho do painel por slide:**



Slide #1 — hook · Slide #2 — delivery · Slide #2 — cta



**FAQ da landing, sobre créditos:**



1 crédito = 1 geração de texto, independente do número de slides. Imagens custam entre 1 e 8 créditos por imagem dependendo do modelo. Modo Padrão: 1 crédito. HD: 3 créditos. Seedream 4: 5 créditos. Flux Pro: 6 créditos. Ultra — Nano Banana 2: 8 créditos.





*Fim do dossiê AEOS-M003. Duas gerações, 2 créditos, 7 restantes. Nenhuma publicação, nenhuma alteração de cont