# Fontes por cliente

Sugestão de par tipográfico para cada cliente da carteira, a partir da identidade visual
de cada um. Todas disponíveis em `@fontsource` — que é como o renderizador embute fonte em
base64, então dá pra usar hoje sem depender de licença ou download manual.

---

## A restrição que o sistema impõe

O renderizador desenha a headline em **112–136px, caixa alta, tracking −0,04em e
entrelinha ~0,92**. Isso é exigente e descarta boa parte das fontes bonitas:

1. **Precisa ter peso 800 ou mais.** Em 112px caixa alta, peso 600 some.
2. **Caixa alta precisa ser uniforme.** Fonte desenhada para caixa baixa costuma ter
   maiúsculas irregulares que aparecem nesse tamanho.
3. **Diacrítico precisa caber.** Já aconteceu: com entrelinha 0,80, o til de "NÃO" encostou
   na linha de cima em Montserrat. Toda fonte candidata tem que ser testada com
   **ÃÕÉÇ em caixa alta**, não só com o alfabeto inglês.

A terceira é a que mais elimina candidata, e é a que ninguém lembra de testar.

---

## As sugestões

### Prime Assessoria — crédito imobiliário

| Papel | Fonte | Peso |
|---|---|---|
| Headline | **Montserrat** | 800 |
| Corpo | **Poppins** | 400 / 600 |

**Não mexer.** É o manual de marca oficial da Prime, conferido em
`CLIENTES/PRIME/identidade/manual-de-marca.jpeg`. Já está rodando.

---

### Clínica Albanos — autismo

| Papel | Fonte | Peso |
|---|---|---|
| Headline | **Nunito** | 800 |
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
| Headline | **Fraunces** | 700 / 900 |
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
| Headline | **Quicksand** | 700 |
| Corpo | **Nunito** | 400 / 600 |

A armadilha do nicho: **moda infantil vende para a mãe, não para a criança.** Tipografia de
desenho animado afasta quem paga.

Quicksand é arredondada e leve, com ar de lúdico adulto — funciona em embalagem de marca
infantil premium. Nunito acompanha o arredondamento no corpo sem competir.

Ressalva honesta: Quicksand só vai até o peso 700. Nas headlines de 112px caixa alta ela
fica mais leve que as outras — pode ser exatamente o tom certo para a marca, ou pode ficar
fraca demais no feed. **Vale um teste lado a lado antes de fechar.**

---

### Dr. Fred — saúde

| Papel | Fonte | Peso |
|---|---|---|
| Headline | **Archivo** | 800 |
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
  {"family":"Nunito","weight":800,"file":".../nunito-latin-ext-800-normal.woff2"},
  {"family":"Inter","weight":400,"file":".../inter-latin-ext-400-normal.woff2"},
  {"family":"Inter","weight":600,"file":".../inter-latin-ext-600-normal.woff2"}
]
```

Instalar: `npm i @fontsource/nunito @fontsource/inter`

**Usar sempre a variante `latin-ext`.** É ela que traz ã, õ, ç e os acentos. A variante
`latin` sozinha renderiza o acento como caixa vazia, e o erro só aparece no PNG final.

---

## O que ainda falta

Estas são sugestões de partida, feitas a partir do nicho e da paleta de cada cliente.
**Nenhuma foi validada contra material real dos clientes** — só a da Prime, que veio do
manual de marca.

Quando os designs do Canva forem medidos (ver `../BRANDSDECODED/PROMPT-ESTUDO-DO-CANVA.md`),
a régua tipográfica real entra no lugar do palpite, e estas sugestões viram só o ponto de
partida para os clientes que ainda não têm manual.
