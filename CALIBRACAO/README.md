# CALIBRACAO — a régua de padrões por nicho

Um arquivo por nicho: `{nicho}.md`. Quando existe, a skill `carrossel-viral` usa ele
no lugar dos padrões da BrandsDecoded.

## O problema que isso resolve

O material da BrandsDecoded traz números de performance — "Brasil +155%",
"Fim/Morte +119%", "marketing tem 7,1% de hit rate". Eles vieram dos posts do Leonardo
Varricchio, na conta dele, para a audiência dele. Para um cliente de crédito imobiliário
ou de odontologia, **são hipótese, não fato**.

Estes arquivos são a versão medida: mesma ideia, calculada com o desempenho real dos
posts que a Expansion publicou naquele nicho.

## Como um arquivo destes nasce

Cruzando as fichas de `CARROSSEIS/` com o desempenho coletado. Nunca escrito à mão,
nunca chutado.

## Regras

- **Nenhuma linha sem contagem de peças por trás.** "Testado em 3 peças" é honesto;
  "funciona melhor" sem número não é.
- **Padrão não testado é declarado não testado**, nunca omitido — omitir faz parecer
  que foi avaliado e reprovado.
- **Versionar** (`-v1`, `-v2`). A ficha de cada carrossel grava qual versão gerou a
  peça, então dá pra medir se a recalibração melhorou de verdade.

## Estado

| Nicho | Calibração | Peças registradas |
|---|---|---|
| Crédito imobiliário | Não existe — usando padrões emprestados | 0 |
