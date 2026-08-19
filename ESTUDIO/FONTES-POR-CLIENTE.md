# Fontes por cliente

Sugestão de par tipográfico para cada cliente da carteira, a partir da identidade visual
de cada um. Todas disponíveis em `@fontsource` — que é como o renderizador embute fonte em
base64, então dá pra usar hoje sem depender de licença ou download manual.

---

## A restrição que o sistema impõe

**Corrigido em 18/08.** A versão anterior desta seção partia do layout errado —
descrevia a headline como 112–136px em caixa alta, que é o desenho da
BrandsDecoded, não o da Expansion. Medido no Canva, o nosso é outro:

| | Valor real |
|---|---|
| Headline interna | **75,7px semibold** (peso 600), caixa mista |
| Capa impacto | 111,5px bold (peso 700), caixa mista |
| Corpo | 45,4px, entrelinha 0,96 |

Três consequências, e a segunda muda as recomendações:

1. **Peso 800 deixou de ser requisito.** Em 75px semibold, a fonte precisa ler
   bem em 600 e 700 — não precisa ter black. Isso reabre boa parte do catálogo
   que a régua antiga descartava.
2. **Caixa mista, não caixa alta.** Some a exigência de maiúsculas uniformes, e
   entra outra: a fonte precisa ter **caixa baixa boa em corpo grande**, com
   altura-x generosa. É outro critério, e mais fácil de satisfazer.
3. **Diacrítico continua sendo o filtro.** Entrelinha 0,96 no corpo é apertada, e
   1,06 na headline não é folgada. Toda candidata tem que ser testada com
   **ã õ é ç** em duas linhas seguidas, não só com o alfabeto inglês. Já
   aconteceu de o til encostar na linha de cima.

A terceira é a que mais elimina candidata, e é a que ninguém lembra de testar.

## As sugestões

### Prime Assessoria — crédito imobiliário

| Papel | Fonte | Peso |
|---|---|---|
| Headline | **Montserrat** | 600 / 700 |
| Corpo | **Poppins** | 400 / 600 |

**Não mexer.** É o manual de marca oficial da Prime, conferido em
`CLIENTES/PRIME/identidade/manual-de-marca.jpeg`. Já está rodando.

---

### Clínica Albanos — autismo

| Papel | Fonte | Peso |
|---|---|---|
| Headline | **Nunito** | 600 / 700 |
| Corpo | **Inter** | 400 / 600 |

Quem lê conteúdo sobre autismo costuma ser pai ou mãe, cansado e ansioso, muitas vezes no
celular à noite. Aqui **legibilidade vale mais que personalidade**.

Nunito é geométrica de terminais arredondados: acolhe sem infantilizar — a diferença entre
"clínica que entende de criança" e "desenho animado". Inter é a sans mais legível em corpo
pequeno que existe hoje, e foi desenhada exatamente para tela.

Evitar: qualquer serifa de alto contraste (cansa), e qualquer fonte "divertida" com traço
irregular (lê como pouco sério num assunto clínico).

---

### Ciés Brand — moda feminina

| Papel | Fonte | Peso |
|---|---|---|
| Headline | **Fraunces** | 600 / 700 |
| Corpo | **DM Sans** | 400 / 500 |

Moda pede serifa com atitude editorial. **Fraunces** tem eixo variável e um desenho com
personalidade — resolve sem cair em Playfair Display, que virou padrão de tanto uso e hoje
lê como template.

DM Sans no corpo é deliberadamente neutra: deixa a serifa ser a voz.

**Alternativa mais clássica**, se a marca for mais sóbria que ousada:
Cormorant Garamond (600) + Work Sans (400).

---

### Clau Kids — moda infantil

| Papel | Fonte | Peso |
|---|---|---|
| Headline | **Quicksand** | 600 / 700 |
| Corpo | **Nunito** | 400 / 600 |

A armadilha do nicho: **moda infantil vende para a mãe, não para a criança.** Tipografia de
desenho animado afasta quem paga.

Quicksand é arredondada e leve, com ar de lúdico adulto — funciona em embalagem de marca
infantil premium. Nunito acompanha o arredondamento no corpo sem competir.

A ressalva que estava aqui — "Quicksand só vai até 700, fica fraca em 112px caixa
alta" — **caiu com a correção da régua.** Em 75px semibold, 700 é exatamente o
peso que o layout pede. Quicksand deixou de ser a escolha arriscada da lista.

---

### Dr. Fred — saúde

| Papel | Fonte | Peso |
|---|---|---|
| Headline | **Archivo** | 600 / 700 |
| Corpo | **Inter** | 400 / 600 |

Saúde precisa de autoridade sem frieza. Archivo é uma grotesca sólida, de origem editorial,
que aguenta caixa alta grande sem virar bloco pesado. Inter no corpo mantém a leitura
confortável em texto técnico.

**Alternativa** para um tom mais científico e menos comercial:
Source Serif 4 (700) no título + Inter no corpo.

---

## Como trocar

No spec do carrossel, os dois campos e os arquivos:

```json
"tokens": { "fonte_head": "Nunito", "fonte_body": "Inter" },
"fontes": [
  {"family":"Nunito","weight":600,"file":".../nunito-latin-ext-600-normal.woff2"},
  {"family":"Nunito","weight":700,"file":".../nunito-latin-ext-700-normal.woff2"},
  {"family":"Inter","weight":400,"file":".../inter-latin-ext-400-normal.woff2"},
  {"family":"Inter","weight":600,"file":".../inter-latin-ext-600-normal.woff2"}
]
```

Instalar: `npm i @fontsource/nunito @fontsource/inter`

**Usar sempre as duas variantes, `latin` e `latin-ext`** — cada peso entra duas
vezes na lista. São subconjuntos complementares: `latin` tem A-Z, `latin-ext` tem
ã, õ, ç e os acentos. Qualquer um sozinho quebra, e quebra em silêncio.

Foi exatamente o que aconteceu aqui até 18/08: só o `latin-ext` estava embutido,
não havia glifo para A-Z, e todas as peças saíram numa fonte de sistema sem
ninguém perceber. Hoje o renderizador recusa rodar nessa condição e o exportador
mede a largura do texto para conferir que a fonte pedida realmente valeu.

---

## O que ainda falta

Estas são sugestões de partida, feitas a partir do nicho e da paleta de cada cliente.
**Nenhuma foi validada contra material real dos clientes** — só a da Prime, que veio do
manual de marca.

A régua tipográfica **já foi medida** (ver
`../BRANDSDECODED/MAQUINA/MEDIDAS-CANVA-2026-08-11.md`) e substituiu o palpite —
é por isso que a seção de restrições acima mudou. O que continua em aberto são os
**nomes das duas fontes que a Expansion usa no Canva**: a API devolve só um ID
interno, e o brand kit da conta está vazio. Enquanto isso o renderizador roda com
Montserrat + Poppins, que dão a mesma cor de mancha.
