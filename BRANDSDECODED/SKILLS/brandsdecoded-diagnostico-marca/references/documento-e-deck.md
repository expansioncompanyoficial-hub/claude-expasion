# Documento final + Deck — estrutura e identidade visual

Duas entregas do mesmo conteúdo: o **.md narrado** (pra ler e usar) e o **deck PPTX** (pra apresentar, no visual da casa). O documento é a fonte; o deck é a vitrine.

---

## A. BD Strategic Positioning Document™ (.md)

Documento **longo, explicativo, narrado** — NÃO uma compilação das respostas do cliente. Cada seção tem texto interpretativo, desenvolvimento de raciocínio, exemplo e aplicação prática. É um manual estratégico profissional.

### As 11 seções (ordem fixa)

1. **X — Competência Dominante** — explicada e contextualizada. Por que esse X é forte, com a prova.
2. **Y — Grupo com Dor Intensa** — explicação + análise + padrões observáveis do grupo.
3. **Território Estratégico** — o cruzamento X/Y, o espaço mental que a marca ocupa.
4. **Nicho Validado** — pelos 3 caminhos (Afinidade / Dinheiro / Vantagem), com o porquê de fazer sentido.
5. **ICP — A Pessoa Exata** — descrição humana, real, detalhada, com a dor integrada.
6. **Dor Central** — a dor que trava, com impacto concreto.
7. **Big Idea — Tese Proprietária** — a tese + explicação + lógica + implicações.
8. **Narrativa — Variações Estratégicas** — a tese desdobrada em ângulos.
9. **Linguagem — Tom, Ritmo, Vocabulário** — palavras BD da marca, palavras que ela evita.
10. **As 5 Editorias** — cada uma com definição + desenvolvimento.
11. **15 Ideias Narrativas** — 3 por editoria (ideias, não posts prontos).

Fechar com **Resumo Estratégico** (síntese forte e usável), **Próximos Passos** (como virar ação) e **Hipóteses a validar** com o cliente.

Salvar em `.../outputs/diagnostico-[cliente].md`.

---

## B. Deck PPTX — spec de slides

O deck é **cheio**, não resumido: cada seção tem espaço, com divisores entre os três blocos. Alvo: ~18-22 slides.

Sequência:

1. **Capa** (dark) — "Diagnóstico de Posicionamento", nome do cliente grande, item italic laranja, intro, POWERED BY BRANDSDECODED®.
2. **Sumário** (light) — o método em 11 pontos / os três blocos.
3. **Divisor — ESTRATÉGIA** (dark) — nome grande à esquerda, número gigante laranja "01" à direita.
4. **X — Competência Dominante** (light) — tese do X + bloco "forte vs fraco" curto + a prova.
5. **Y — Grupo com Dor Intensa** (light).
6. **Território Estratégico** (light) — o cruzamento X/Y.
7. **Nicho — 3 caminhos** (light) — grid Afinidade / Dinheiro / Vantagem + nicho cravado.
8. **ICP — A pessoa exata** (light) — descrição humana, dor integrada.
9. **Dor Central** (light) — a dor + impacto concreto.
10. **Divisor — NARRATIVA** (dark) — número "02".
11. **Big Idea** (dark, peça central) — a tese gigante, uma palavra em laranja, lógica embaixo.
12. **Narrativa — variações** (light) — os ângulos da tese.
13. **Linguagem** (light) — palavras BD vs palavras proibidas, tom/ritmo.
14. **Divisor — EDITORIAS** (dark) — número "03".
15. **As 5 Editorias** (light) — grid com definição de cada uma.
16-18. **15 Ideias Narrativas** (light) — 3 por editoria, ~2 editorias por slide (Mercado+Cases / Cultura+Notícias / Produtos), numeradas.
19. **Resumo Estratégico** (light ou dark).
20. **Próximos Passos** (light).
21. **Fechamento** (dark) — frase de assinatura + POWERED BY BRANDSDECODED®.

Divisor de capítulo é o motif da casa: nome grande à esquerda + número gigante laranja à direita. Laranja só como acento cinético (número, UMA palavra, marcador) — **nunca** como barra, faixa, stripe ou sublinhado de título.

---

## C. Identidade visual (tokens canônicos da casa)

```
ORANGE  = FF4500   // laranja-coral, único acento saturado, cinético
LIGHT   = FAF8F4   // off-white neutro (NÃO creme amarelado) — slides de conteúdo
DARK    = 1A1410   // preto quente — capa, divisores, fechamento, Big Idea
GRAY    = 6B6B6B / 9A9A9A  // labels, captions, texto de apoio
```

Tipografia (papéis separados, não intercambiáveis):
- **Instrument Sans** — display (capa, nome de capítulo no divisor, números gigantes, frase-tese).
- **Inter** — todo o resto (corpo, títulos de conteúdo, labels, badges, footer).

Formato: **16:9 exato.** Texto sobre fundo claro = preto quente; sobre fundo escuro = off-white. Contraste sempre forte.

Convenções: sanduíche dark/light (escuro marca transição, claro carrega informação); numeração `01 02 03` como elemento visual; densidade alta porém organizada (não minimalista, não transbordando); alinhar corpo à esquerda (centro só em título/display).

Anti-padrões (nunca): laranja como barra/stripe/sublinhado; accent line embaixo de título; fundo creme amarelado; corpo em Instrument Sans ou display em Inter; mais de uma cor saturada; ícone decorativo.

---

## D. Build do deck

Usar `scripts/build-deck.js` (pptxgenjs), parametrizado com os dados do diagnóstico. Depois do build, validar visualmente:

```bash
# instalar pptxgenjs localmente se preciso: npm install pptxgenjs
node build-deck.js
python /mnt/skills/public/pptx/scripts/office/soffice.py --headless --convert-to pdf diagnostico-[cliente].pptx
pdftoppm -jpeg -r 130 diagnostico-[cliente].pdf slide
```

Inspecionar com olhar fresco (de preferência subagente): overflow, contraste, alinhamento, emoji virando tofu, divisores corretos. Corrigir e re-renderizar antes de entregar. As fontes Instrument Sans/Inter podem não existir no ambiente de render — mapear via fontconfig pra um sans limpo no preview; o `.pptx` mantém os nomes corretos pro cliente abrir no PowerPoint.
