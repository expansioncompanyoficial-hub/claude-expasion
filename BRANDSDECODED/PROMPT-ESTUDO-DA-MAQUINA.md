# Prompt para a extensão do Chrome estudar a Máquina de Carrosséis

Cole o bloco abaixo numa conversa da extensão do Claude no Chrome, **com a
plataforma já aberta e logada**. O relatório que ele devolver entra neste
repositório e alimenta a skill `carrossel-viral`.

---

```
Você está no Chrome, com a plataforma "Máquina de Carrosséis" da BrandsDecoded
aberta e logada (maquina.brandsdecoded.com.br). Eu tenho licença de uso dela.

Sua tarefa: **documentar essa plataforma** para que outro Claude, que não
consegue acessá-la, consiga construir uma ferramenta interna equivalente para a
minha agência. Ele já tem o método editorial (comprei o material); o que falta
é entender a EXPERIÊNCIA e o SISTEMA VISUAL do produto.

## Escopo

Documente **o que a interface mostra e o que ela produz**: telas, textos,
opções, e o resultado final. Fique no que está visível na tela.

Não vasculhe código-fonte, bundle de JavaScript, chamadas de API nem prompts
internos — não é isso que preciso e não quero.

## O que fazer

Rode **um carrossel do começo ao fim**, de verdade, e vá documentando cada
etapa. Use como tema: "o que muda para o corretor de imóveis quando o crédito
do cliente é bem estruturado". Se a plataforma pedir nicho, use "crédito
imobiliário".

Tire **screenshot de cada tela** e descreva o que ela pede e o que devolve.

## O relatório

Entregue um documento markdown com estas sete seções, nesta ordem. Seja
literal: transcreva os textos da interface entre aspas, em vez de resumir.

### 1. O fluxo, etapa por etapa
Numere as etapas na ordem real. Para cada uma:
- o que a tela pede
- o texto exato dos rótulos, botões e textos de ajuda
- o que é campo livre, o que é escolha de lista (liste as opções)
- o que é obrigatório e o que dá pra pular

### 2. O briefing
Todas as perguntas que ela faz antes de gerar, com as opções de cada uma.
Se houver presets (estilos visuais, paletas por nicho, tipos de carrossel),
liste todos com os nomes exatos.

### 3. As headlines
- quantas opções ela gera
- o formato de cada uma (tamanho, estrutura, tem subtítulo?)
- ela mostra algum rótulo ou classificação junto (gatilho, padrão, nota)?
- que controles existem pra ajustar (refazer, editar uma só, misturar)
- transcreva as 10 (ou N) headlines que ela gerou no seu teste

### 4. O sistema visual  ← a parte mais importante
Para o carrossel gerado, descreva:
- **quantos slides** e a função de cada um na sequência
- **cores**: hex de fundo, de texto e de acento. Se não der pra pegar o hex,
  descreva e tire print bem de perto
- **tipografia**: qual fonte no título, qual no corpo, pesos, e o tamanho
  relativo (o título é quantas vezes o corpo?)
- **layout de cada tipo de slide**: onde o texto fica na tela (topo, meio,
  base), quanto de margem, como o texto se alinha
- **elementos fixos**: tem barra no topo? rodapé com @? numeração de slide?
  barra de progresso? logo? marca d'água?
- **como o acento é usado**: em palavra solta? número? borda? fundo de bloco?
- **imagens**: onde entram, em que formato (fundo inteiro, caixa, redonda),
  o que acontece com o texto por cima

### 5. Os tipos de slide
Liste cada layout diferente que aparecer no carrossel — capa, texto corrido,
lista com marcador, número grande, tabela, citação, CTA — e descreva a
estrutura de cada um. Print de cada tipo.

### 6. A saída
- em que formatos ela exporta e em que tamanho em pixels
- vem legenda junto? hashtags? Transcreva o que veio no seu teste
- o que mais acompanha a entrega

### 7. O que me surpreendeu
Qualquer coisa que um concorrente não adivinharia olhando de fora: um detalhe
de usabilidade que economiza tempo, uma decisão de design incomum, uma opção
escondida, um jeito de iterar que não é óbvio.

## Formato de entrega

Markdown, em português. Texto da interface entre aspas e literal — a diferença
entre "gera 10 headlines" e o texto exato do rótulo é o que vai me permitir
reproduzir.

Junte todos os screenshots. Se a conversa ficar longa, vá salvando o relatório
em partes conforme avança, em vez de deixar tudo pro fim.

**Se o tempo ou o contexto apertarem, priorize nesta ordem:** seção 4 (sistema
visual), seção 5 (tipos de slide), seção 6 (saída). Essas três são as que eu
não consigo deduzir de fora.
```

---

## Depois

Traga de volta o markdown e os prints. Print colado no chat funciona; pasta do
Drive também — o conector lê. Com isso a skill `carrossel-viral` ganha o padrão
visual da plataforma sem depender de acesso a ela.
