# Os três modos

O material traz **três sistemas diferentes**, para três trabalhos diferentes. Confundir
produz peça morna: cultural demais pra converter, didática demais pra alcançar, ou lenta
demais pra pegar a notícia quente.

| | **TOPO** — viral | **MEIO** — educativo | **NEWSROOM** — notícia |
|---|---|---|---|
| Trabalho | Alcançar gente nova | Virar seguidor em lead | Pegar a onda antes de esfriar |
| Entrega | Carrossel 9 slides | Carrossel 5–9 slides | **Capa única** |
| Fonte | `CONTENT-MACHINE/prompts/system-prompt-maquina-carrosseis-v4.md` | `CONTENT-MACHINE/docs/PROMPT-CRIADOR-CARROSSEIS-MEIO-FUNIL.md` | `NEWSROOM/prompts/newsroom-system-prompt.md` |
| Insumo | Tendência, tese cultural | Dúvida, passo a passo, erro comum | Notícia dos últimos 7 dias |
| Capa | **10 headlines**, 2 formatos rígidos | **5 variações**, 6 formatos | **10 headlines**, 5 padrões |
| Pessoa | 3ª — reportagem | 2ª — explicando pra um colega | 3ª — manchete |
| Janela | Sem pressa | Sem pressa | **~2 horas** |
| Métrica | Alcance · compartilhamento | Salvamento · comentário · direct | Alcance · velocidade |

## Como escolher

Se o pedido já disser ("carrossel meio de funil pra Prime", "capa dessa notícia"), obedecer.

Se não disser, decidir pelo insumo e **avisar em uma linha** qual modo foi usado:

- **Notícia com data, dos últimos 7 dias** → Newsroom. Velocidade importa mais que profundidade.
- Tendência, comportamento, dado de mercado sem urgência → topo.
- Dúvida, processo, erro comum, comparação, passo a passo → meio.
- Ambíguo → perguntar, uma linha só.

A ficha do cliente pode fixar uma proporção editorial. Quando fixa, seguir.

---

## MODO TOPO — o que já está no fluxo principal

É o padrão do `SKILL.md`. Etapas 2 a 9 sem alteração.

---

## MODO MEIO — o que muda

### Capa: 5 variações, não 10

Os seis formatos, do prompt original:

1. **Número + promessa** — "5 FORMAS DE [RESULTADO] SEM [OBSTÁCULO]"
2. **Problema + solução** — "VOCÊ [PROBLEMA COMUM]. → Aqui está como resolver."
3. **Provocação** — "VOCÊ AINDA FAZ [COISA ULTRAPASSADA]? → Existe um jeito melhor."
4. **Passo a passo** — "COMO [FAZER ALGO] EM [TEMPO/PASSOS]"
5. **Lista prática** — "[NÚMERO] [COISAS] QUE [BENEFÍCIO]"
6. **Pergunta direta** — "POR QUE [PROBLEMA ACONTECE]? → A resposta é mais simples do que parece."

Formato: HEADLINE EM CAIXA ALTA + sub-headline com seta (→). Entregar 5, em formatos
**diferentes entre si** — cinco variações do mesmo formato não é escolha, é ilusão de escolha.

### Corpo

- **Slide 2** situa: por que isso importa, ou qual problema resolve. Não entrar direto
  na lista — a pessoa precisa se reconhecer antes.
- **Slides 3 a 7+** desenvolvem: um item, uma etapa ou um exemplo por slide. Headline
  curta + um parágrafo ou poucos bullets. **Uma ideia por slide, nunca duas.**
- **Penúltimo** resume em lista, se o carrossel tiver muitos itens. É o slide que faz
  salvar.
- **Último** é o CTA, conectado ao que foi ensinado.

### Entrega

Além dos PNGs: **legenda em 3 parágrafos** — gancho ou problema · o que o carrossel
ensina · CTA.

---

---

## MODO NEWSROOM — capa única de notícia

Sistema próprio, com system prompt e banco de hooks separados em `BRANDSDECODED/NEWSROOM/prompts/`.
O banco de hooks do Newsroom é **maior** que o do Content Machine — usar o do Newsroom neste modo.

Fluxo em 5 etapas, do `newsroom-system-prompt.md`:

1. **Nicho + recorte + @** — a ficha do cliente já responde. Não perguntar de novo.
2. **Busca** — 4 queries em paralelo, com o ano corrente. Janela **dura de 7 dias**;
   cada notícia precisa de DD/MM. Fonte Tier 1 (editorial do nicho) ou Tier 2 (imprensa
   geral). Descartar blog genérico, agregador e post de rede social. Apresentar 5 a 8
   manchetes verificadas com potencial classificado.
3. **10 headlines** — buscar o conteúdo da matéria escolhida (não só o título) e gerar
   nos 5 padrões: Morte/Fim · Geracional · Investigando · Nome/Marca · Dois-Pontos.
4. **Imagem** — vertical, ≥1080px, sujeito no terço superior, sem texto sobreposto.
5. **Render** — capa única 1080×1350, sem progress bar, sem seta. Headline 108px, caindo
   pra 96px e no mínimo 88px; se ainda não couber, encurtar **mantendo o padrão**.

**Honestidade na busca é bloqueante.** Se não vierem 5 notícias verificadas dentro dos
7 dias em fonte confiável, oferecer ampliar pra 14 dias ou mudar o ângulo — **nunca
completar a tabela com notícia velha ou matéria de data vaga** só pra ter 8 linhas.
Preferir 5 verificadas a 8 com 3 duvidosas.

### Por que isso importa pra crédito imobiliário

É o modo mais subestimado do pacote e provavelmente o de melhor encaixe pra Prime.
Crédito imobiliário tem notícia toda semana — Selic, regra de FGTS, Minha Casa Minha Vida,
linha nova da Caixa, teto de financiamento. Cada uma dessas é uma capa no mesmo dia,
com a Prime chegando antes do concorrente.

A contrapartida: notícia de crédito e juros **exige o dobro de cuidado** com a régua de
compliance da ficha do cliente. Manchete factual, sem promessa de taxa ou aprovação.

---

## A armadilha: as réguas anti-slop não são a mesma

Este é o ponto onde é fácil errar misturando os dois materiais.

O v4 **proíbe segunda pessoa** no corpo dos slides — "você precisa", "você deve" — porque
o modo topo é reportagem, não conselho. Mas o modo meio **usa segunda pessoa de propósito**,
inclusive na capa: "VOCÊ AINDA FAZ [COISA ULTRAPASSADA]?".

Não são contradição. São registros diferentes, e cada um só vale no seu modo:

| Regra | Topo | Meio | Newsroom |
|---|---|---|---|
| Segunda pessoa ("você") | Proibida | **É o registro** | Proibida |
| Lista / número na capa | Proibido — formato morto | **É um dos 6 formatos** | Proibido |
| Tom de conselho | Proibido | Esperado | Proibido |
| "Não é X, é Y" | Proibido | Proibido | Proibido |
| Adjetivo decorativo, abertura clichê, cacoete de IA | Proibido | Proibido | Proibido |
| Dado sem fonte | Proibido | Proibido | Proibido — e a fonte é nomeada |

**O que vale nos três:** o núcleo anti-slop — antíteses artificiais, "e isso muda tudo",
"no fim das contas", "vale destacar", "é importante ressaltar", frases de efeito vazias,
jargão corporativo, "descubra/saiba/conheça", "virou" como verbo principal, dado sem fonte.

Aplicar a régua **do modo da peça**, nunca as três somadas. Somar produz texto que não é
nem reportagem, nem conversa, nem manchete.

---

## Na ficha do carrossel

O campo `modo` (`topo` | `meio` | `newsroom`) é obrigatório. Sem ele, a recalibração vai
comparar peças que nunca deveriam ser comparadas — um educativo com 40 salvamentos, um
viral com 8 mil de alcance e uma capa de notícia publicada em 30 minutos não competem no
mesmo ranking.

Quando a calibração do nicho nascer, ela nasce **separada por modo**.
