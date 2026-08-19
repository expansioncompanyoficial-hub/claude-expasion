# O que muda quando é agência, e não criador solo

O material da BrandsDecoded foi desenhado pra uma pessoa criando pra própria conta.
A Expansion tem vários clientes, um time e um cliente que já quase cancelou. Três
adaptações dão conta da diferença.

---

## 1. Ficha de cliente no lugar de briefing

O v4 pergunta 7 coisas a cada carrossel: marca, nicho, cor, estilo, tipo, CTA e slides.
Pela meta do POP — 3 posts por semana por cliente — isso vira dezenas de briefings
idênticos por mês, redigitando o que nunca muda.

A ficha em `CLIENTES/{CLIENTE}.md` responde uma vez. O que continua sendo perguntado a
cada peça é só o que **realmente** muda: o insumo, o tipo de carrossel e quantas imagens.

Campos marcados `[FALTA]` na ficha são perguntados juntos, uma vez, e gravados. Ficha
não se preenche com palpite — cor errada e CTA errado o cliente percebe na hora.

---

## 2. As paradas de aprovação são obrigatórias

Existem duas, e nenhuma é opcional:

**Parada 1 — texto, antes do visual.** Ajustar texto é barato; refazer HTML é caro.

**Parada 2 — cliente, antes de publicar.** Em 25/07 a Prime apagou um post que a
Expansion publicou, sem avisar no grupo. Publicação automática sem o aceite do cliente
repete esse problema em escala. O fluxo é:

```
carrossel pronto → aprovação interna → aprovação do cliente → publica → registra media_id
```

A automação entra **depois** do aceite, nunca antes. Quando a publicação automática
estiver ligada, é o aceite do cliente que dispara — não a geração da peça.

---

## 3. O registro serve a dois donos

A ficha do carrossel parece burocracia interna. Não é. O mesmo dado alimenta duas coisas:

| Uso | Quem consome | Quando aparece |
|---|---|---|
| Relatório semanal | O cliente | Toda segunda |
| Recalibração por nicho | A skill | Com volume acumulado |

O segundo é o ativo de longo prazo. **O primeiro é urgente.** Em 16/07 o registro da
operação é explícito: a Prime quase cancelou por ausência de relatório, não por qualidade
de conteúdo — e a direção pediu relatório semanal, de preferência toda segunda-feira.

Ou seja: a infraestrutura que existe pra fazer o sistema aprender é a mesma que produz
o relatório que quase custou o maior cliente da casa. Construir uma entrega as duas.

---

## 4. Quando a calibração do nicho nasce

`CALIBRACAO/{nicho}.md` não é escrito à mão nem chutado. Ele nasce de cruzar as fichas
de `CARROSSEIS/` com o desempenho coletado, e diz coisas do tipo:

> Em crédito imobiliário, no perfil da Prime, `dois-pontos` teve alcance mediano N%
> acima de `pergunta`, em X peças. `morte-fim` não foi testado o suficiente.

Três regras pra ele não virar superstição:

- **Nunca escrever uma linha de calibração sem número de peças por trás.** "Testado em 3
  peças" é uma frase honesta; "funciona melhor" sem contagem não é.
- **Padrão não testado é declarado não testado**, nunca omitido — omitir cria a impressão
  falsa de que foi avaliado e reprovado.
- **Versionar.** `credito-imobiliario-v1`, `-v2`. A ficha grava qual versão gerou a peça,
  então dá pra medir se a v2 melhorou de verdade ou se foi sorte.

Enquanto o arquivo não existir, a skill usa os padrões da BrandsDecoded e **diz que está
usando**. A honestidade sobre a origem do número é o que separa isso de repetir palpite
com cara de dado.

---

## 5. Régua de compliance por nicho

Alguns nichos têm limite de publicidade próprio, e a peça bonita que quebra a régua custa
mais caro que a peça sem graça. Crédito imobiliário é um deles: promessa de aprovação,
taxa garantida sem condição e "sem burocracia" são risco.

A ficha do cliente carrega essa régua no campo de regras editoriais. A skill aplica na
Etapa 5. Na dúvida sobre o que a norma exige, **marcar como ponto a validar com o cliente**
— nunca cravar enquadramento que não dá pra confirmar.
