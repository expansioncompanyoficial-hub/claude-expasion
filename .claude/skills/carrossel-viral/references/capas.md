# Capas — gerar dez, escolher uma

A capa é o único slide que decide se o carrossel vai ser lido. Gerar uma só é
apostar; gerar dez e escolher é trabalhar.

```bash
python3 scripts/gerar_capas.py capas.json capas.html
python3 scripts/export_png.py capas.html capas/
```

Sai um PNG por headline, na mesma imagem e nos mesmos tokens — a comparação é só
de texto, que é o que se quer decidir.

---

## Os nove padrões

Do banco de 56 hooks outliers da BrandsDecoded
(`BRANDSDECODED/NEWSROOM/prompts/newsroom-banco-hooks.md`), onde estão os
exemplos com o número de likes de cada um.

| # | Padrão | Forma |
|---|---|---|
| 1 | **Morte / Fim** | `A morte de X` · `O fim de X` |
| 2 | **Geracional** | `Por que [geração] está [comportamento inesperado]?` |
| 3 | **Investigando** | `Investigando [fenômeno]` |
| 4 | **Elemento pop** | `Como [algo conhecido] [ação inesperada]` |
| 5 | **Tendência** | `Por que [X] está [tendência surpreendente]?` |
| 6 | **Contraste** | duas metades que se negam |
| 7 | **Nome/Marca** | `[marca] + [revelação inesperada]` |
| 8 | **Dois-pontos** | `[Afirmação]: [reviravolta]` |
| 9 | **Provocação existencial** | pergunta que a pessoa já se fez |

**A distribuição importa mais que a quantidade.** Dez headlines do mesmo padrão
são uma headline testada dez vezes. Cobrir pelo menos cinco padrões diferentes na
mesma rodada é o que transforma a escolha em informação.

> **Origem do dado:** os números de desempenho desse banco são da conta do
> Leonardo Varricchio, não dos nossos clientes. Servem como ponto de partida, e
> **têm que ser declarados como emprestados** até existir
> `CALIBRACAO/{nicho}.md` medido nas nossas peças.

---

## O que a capa da casa aguenta

Medido: a headline tem **864 × 439,2** e encolhe se passar disso.

| Caracteres | O que acontece |
|---|---|
| até 45 | fica em 111,5px, o tamanho cheio — impacto máximo |
| 45 a 70 | 3 a 4 linhas, ainda grande. **É a faixa de trabalho** |
| 70 a 85 | encolhe visivelmente |
| acima de 85 | pequena demais para o feed — reescrever, não confiar no auto-fit |

Duas regras de escrita que vêm do desenho:

**Caixa mista, frase inteira.** Fragmento em caixa alta é o registro da
BrandsDecoded, não o nosso.

**A ênfase divide a frase em duas leituras.** Marcar com `*` o trecho que carrega
a virada — é ele que a pessoa lê primeiro, antes de ler a frase toda. Marcar a
frase inteira é o mesmo que não marcar nada.

---

## A imagem é metade da capa

A metade de cima fica livre **de propósito**: é a imagem que faz alguém parar o
dedo, e o texto se apoia embaixo. Por isso:

- **A capa sempre leva foto.** Sem foto, o banho de cor é contorno, não solução.
- **Dosar o scrim** (`capa_scrim`): `leve` para foto escura, `medio` de padrão,
  `forte` para foto clara ou com muito detalhe no pé.
- A foto entra em **opacidade cheia**. Escurecer a imagem inteira resolve a
  legibilidade e mata o que atrai.

---

## Registrar o padrão escolhido

Ao fechar a peça, gravar na ficha em `CARROSSEIS/` **qual padrão a headline
usava** e quais foram descartados. É esse campo que, em alguns meses, responde
qual padrão funciona neste nicho — e sem ele a recalibração fica cega.
