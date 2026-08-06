# Módulo — Ritmo Visual (anti-parede-de-texto)

Carregado na **Etapa 4**, junto com `design.md` e `render-html.md`. É também o módulo que roda no atalho **"deixa mais leve / repagina o visual"**. A função é uma só: **página de venda não se lê, se escaneia.** Bloco de texto seguido cansa e o leitor sai. Toda seção precisa de pontos de respiro visual.

## A regra de ouro: regra dos 2-3 parágrafos

**Nunca mais de 2-3 parágrafos de prosa seguidos sem um quebra-visual.** Se uma dobra tem 4 parágrafos, ela está errada de formato — quebra. Na dúvida, menos texto: corta adjetivo, vira bullet, promove a frase forte a destaque.

## O cardápio de quebra-visual (o que usar pra furar a densidade)

- **Sub-título / frase solta (mini-headline):** uma linha curta entre parágrafos que resume o trecho. Dá pro olho um ponto de parada.
- **Frase-destaque (pull-quote):** a linha matadora em tamanho grande, na cor da marca, isolada. Ex.: a frase "A diferença não é competência." vira um bloco grande sozinho.
- **Lista com ícone:** transformar "ele faz X, Y e Z" em 3 itens, cada um com um ícone. Lê em 2 segundos.
- **Grade de benefícios com ícone:** 2-3 colunas, um ícone + título curto + uma linha. Substitui um parágrafo de benefício.
- **Caixa-callout / destaque:** dado-âncora, promessa ou aviso dentro de uma caixa que salta do fundo.
- **Slot de imagem:** foto do autor, mockup do produto, print de resultado, screenshot. (A skill não gera a foto — ver regra de imagem abaixo.)
- **Framework visual:** passo-a-passo numerado com ícone, antes → depois, "como funciona" em 3 colunas, comparativo em cards. Transforma explicação em diagrama.

## Mapeamento por dobra (que quebra cada uma pede)

- **Hero:** slot de imagem/mockup (ao lado no desktop, abaixo no mobile) + selos com ícone. A manchete já é visual; não encher de texto.
- **Agitação da dor:** o ponto que mais vira parede. Quebrar a narrativa com uma **frase-destaque** + uma **lista-com-ícone** dos erros ("você trava na hora de escrever", "perde 2h no Canva", "paga agência e não vem"). No máximo 2 parágrafos corridos.
- **Autoridade / história:** **slot de foto do autor** + os números em destaque (caixa ou grade). Não 3 parágrafos.
- **Solução / mecanismo:** **framework visual** — 3 passos com ícone, ou um diagrama "ideia bruta → método → carrossel pronto".
- **Benefícios:** **grade com ícone**, um por benefício. Nunca parágrafo.
- **Demonstração:** **slot de imagem/mockup** + os passos numerados.
- **Stack de valor:** cards (já bom) — somar um **ícone por produto**.
- **Prova social:** cards com **avatar/print** (slot) e o número do resultado em destaque.
- **Comparativo, oferta, garantia, FAQ:** já são estruturados — manter, só garantir ícone no ✓/✕ e na garantia.

## Alternância de layout (o que mata o cansaço)

Não repetir o mesmo formato em seções seguidas. O cansaço vem da repetição, não só do texto. Uma boa sequência alterna: **centralizado → cards → 2 colunas → trilho horizontal → caixa destacada**. Se duas seções seguidas têm o mesmo desenho, mudar uma.

## Ícones

Usar **SVG inline** (o set está no `render-html.md`), nunca emoji como sistema de ícone — emoji-como-ícone é tique de IA. Emoji pontual só pra tom (1-2 na página inteira, ex.: 🔥 na barra de urgência), nunca como ícone de lista.

## Imagens (a skill não gera foto)

Inserir um **slot marcado com direção de arte**: um espaço com borda/placeholder e um comentário dizendo *o que* vai ali, a proporção e o porquê. Exemplo: `<!-- SLOT IMAGEM: foto do autor, retrato vertical 4:5, fundo neutro -->`. O usuário (ou o Lovable) pluga a imagem real depois. Slots obrigatórios em **hero, autoridade e demonstração**; recomendados em prova social.

## O atalho "deixa mais leve / repagina o visual"

Quando o usuário pedir ("deixa mais leve", "repagina o visual", "quebra esse texto", "tá maçante"), rodar **só este passe** sobre o HTML atual: **mantém a copy e a estrutura**, só adiciona/ajusta os quebra-visuais (ícones, slots, frases-destaque, listas, grades, alternância de layout). Não reescreve a copy nem mexe na oferta. Entregar o HTML atualizado via `present_files`.

## Checklist do passe (rodar antes de entregar o HTML, e no atalho)

- [ ] Nenhuma seção com 4+ parágrafos de prosa seguidos.
- [ ] Cada dobra tem pelo menos 1 elemento visual (ícone, imagem, destaque, framework).
- [ ] Listas e passos têm ícone (SVG, não emoji).
- [ ] Slot de imagem presente em hero, autoridade e demonstração.
- [ ] Pelo menos a dor e o fechamento têm uma frase-destaque.
- [ ] O layout alterna entre seções (nada de 3 seções iguais em sequência).
- [ ] Densidade na dúvida: cortou texto, virou bullet, promoveu a frase forte.
