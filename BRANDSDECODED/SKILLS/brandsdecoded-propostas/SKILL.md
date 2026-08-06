---
name: brandsdecoded-propostas
description: >-
  Monta apresentações e propostas para o cliente apresentar a terceiros, sempre começando por um BRIEFING que decide tudo. O briefing define: que peça é (pitch de captação, apresentação comercial, proposta de trabalho, ou pesquisa de mercado), objetivo e destinatário, tom de voz, número de slides, insumos do cliente, identidade visual (sempre a marca do cliente, nunca um padrão fixo) e formato de saída (PPTX, PDF ou ambos). Faz pesquisa de mercado real com fontes quando preciso. Usar sempre que pedirem para montar pitch deck, apresentação comercial, proposta de trabalho, deck de captação, proposta pra investidor/parceiro/cliente, ou pesquisa de mercado. Gatilhos: monta uma apresentação, faz um pitch deck, proposta comercial, proposta de trabalho, deck pro investidor, apresentação pro cliente, pesquisa de mercado, TAM SAM SOM. Antes de montar, sempre roda o briefing. NÃO faz diagnóstico de posicionamento, carrossel, banco de pautas, nem landing page.
---

# Apresentações e Propostas — BrandsDecoded

Monta a peça que o **cliente leva pra apresentar a um terceiro** (investidor, parceiro, prospect) — ou uma pesquisa de mercado. A regra número um: **a skill começa perguntando, não montando.** O briefing decide o tipo de peça, o tom, o tamanho, a identidade visual e o formato de saída. Montar antes do briefing é o erro que essa skill existe pra evitar.

## Etapa 1 — Briefing (porta de entrada obrigatória, bloqueante)

Rodar o briefing antes de qualquer coisa. Em conversa, perguntar em blocos curtos (ou usar perguntas de múltipla escolha quando a interface permitir), não despejar tudo de uma vez. Roteiro completo em `references/briefing.md`. O briefing precisa fechar, no mínimo:

1. **Que peça é** — pitch de captação · apresentação comercial · proposta de trabalho/serviço · pesquisa de mercado. Cada uma tem anatomia própria (`references/anatomias.md`).
2. **Objetivo + destinatário** — o que o cliente quer que o terceiro faça, e quem é esse terceiro.
3. **Tom de voz** — sóbrio/institucional, ousado, técnico, próximo. Default: claro e confiante, sem AI-slop.
4. **Número de slides / extensão** — sempre **perguntar** quantos o cliente quer (mais ou menos), oferecendo uma faixa sugerida por tipo como ponto de partida. A faixa é sugestão, não imposição.
5. **Insumos do cliente** — conteúdo, dados, textos, números reais, cases. O que ele já tem.
6. **Identidade visual** — vem **sempre da marca do cliente**: (a) ele manda o brand kit (cores, fontes, logo) ou (b) descreve a marca dele e a skill traduz em tokens e confirma. **Não existe padrão BrandsDecoded como default.** Se o cliente não tem marca definida, propor uma paleta neutra e profissional adequada ao tema e confirmar com ele antes de montar. Ver `references/identidade-e-deck.md`.
7. **Formato de saída** — PPTX, PDF, ou ambos. Escolha do cliente.

Se faltar o tipo, o destinatário ou a identidade, **não montar** — fechar o briefing primeiro. Identidade nunca é assumida: ou vem do cliente, ou é uma proposta neutra confirmada com ele.

## Régua de honestidade (bloqueante — número é o que mais queima credibilidade)

A peça vai pra mesa de um terceiro que pode checar. Por isso:

- **Não inventar nem chutar a marca.** Nome da empresa, produto, nicho — só o que o usuário deu. Nunca supor um nome ("é a Tal, uma sportswear?"); se não souber, pergunte. Palpite com cara de fato está proibido.
- **Não inventar dado de mercado.** Tamanho, crescimento, TAM/SAM/SOM, share — só com fonte real e rastreável (F01, F02…). Ver `references/pesquisa-mercado.md`.
- **Estimativa é marcada como estimativa**, com a conta à vista (ex.: SOM).
- **Não inventar tração/prova do cliente.** Faturamento, usuários, cases — só o que o cliente forneceu. Sem dado, o slide vira "onde estamos + plano", não número fabricado.
- **Sem fonte verificável, dizer que não há** — intervalo honesto com ressalva, nunca número preciso falso.

## Etapa 2 — Pesquisa (quando o tipo pedir)

Pitch e pesquisa de mercado quase sempre exigem dados de mercado; proposta de trabalho às vezes. Levantar tamanho de mercado, tendências e concorrência por pesquisa web, cada número com fonte. Método (TAM/SAM/SOM, top-down × bottom-up) e régua de fontes em `references/pesquisa-mercado.md`. Se o pedido for só a pesquisa de mercado, ela é o próprio entregável (formato relatório).

## Etapa 3 — Montar a narrativa

Preencher a anatomia do tipo escolhido (`references/anatomias.md`). Fio condutor é história: tensão → virada → prova → pedido. Princípios pros quatro tipos:

- **Uma ideia por slide.** Título é a conclusão, não o rótulo.
- **Prova no centro.** Tração/dados reais são o que mais convencem; liderar com a métrica mais forte.
- **Pedido/recomendação claro no fim.** Pitch pede o aporte; proposta pede o aceite; pesquisa entrega recomendações acionáveis.
- **Respeitar o nº de slides e o tom** definidos no briefing.

## Etapa 4 — Revisão (antes de renderizar)

- Todo número tem fonte ou está marcado como estimativa? Tração é real?
- Bate com o briefing: tipo, tom, nº de slides, identidade visual escolhida?
- Sem AI-slop nem promessa vazia. Pedido explícito presente.
- Ortografia conferida no material final.

## Etapa 5 — Render no formato e identidade escolhidos

Aplicar a identidade definida no briefing (a marca do cliente, ou a paleta neutra confirmada com ele) e gerar o(s) formato(s) pedido(s):

- **PPTX** — `scripts/build-proposta.js` (pptxgenjs), com o objeto `THEME` (tokens de cor/fonte) parametrizável e a lista de slides.
- **PDF** — exportar o PPTX (LibreOffice) ou, pra peça textual (proposta/pesquisa), gerar PDF A4 limpo (HTML→PDF) na mesma identidade.

Spec, tokens e como aplicar a marca do cliente em `references/identidade-e-deck.md`. Validação visual obrigatória após o build (render em imagem, olhar fresco — de preferência subagente; conferir ortografia e fontes dos números). Incluir bibliografia (F01…) quando houver dado de mercado.

## Etapa 6 — Entrega

Entregar o(s) formato(s) escolhido(s) via `present_files`, mais o dossiê/pesquisa em `.md` quando aplicável. Fechar com **fontes** e **lacunas** (dados que o cliente precisa confirmar).

## Limites

- Diagnóstico de marca/posicionamento → `brandsdecoded-diagnostico-marca`
- Carrossel → `brandsdecoded-carousel`; banco de pautas → `brandsdecoded-pautas`
- Landing page → `brandsdecoded-landing-page` / `landing-page-machine`

## Ordem de leitura dos references

1. `references/briefing.md` — Etapa 1 (sempre primeiro)
2. `references/pesqui