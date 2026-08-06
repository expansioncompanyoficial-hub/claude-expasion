# BrandsDecoded — acervo de material

Material de produto da **BrandsDecoded** recebido em 2026-08-06. Não é código: é um
conjunto de **system prompts, skills e guias** para criação de conteúdo (carrossel,
capa de notícia), posicionamento de marca, apresentações, landing pages e copy de disparo.

O acervo tem duas camadas:

- **`originais/`** — os arquivos exatamente como chegaram (PDF e ZIP). Fonte da verdade.
- **Tudo o mais** — os `.md` extraídos dos ZIPs (verbatim) e os PDFs convertidos para
  markdown legível (transcrição fiel: ligaduras corrigidas, tabelas e listas remontadas,
  nenhum conteúdo acrescentado).

---

## Mapa

```
BRANDSDECODED/
├── CONTENT-MACHINE/        carrossel de Instagram (o produto principal)
│   ├── prompts/            os 7 .md do produto — nomes preservados, verbatim
│   └── docs/               prompts alternativos + FAQ + boas práticas
├── NEWSROOM/               news-jacking: capa única de notícia
├── SKILLS/                 as 4 skills do Kit, verbatim
├── docs/                   visão geral do Kit de Skills
└── originais/              PDFs e ZIPs como recebidos
```

---

## CONTENT-MACHINE — carrossel

O produto é um **Projeto do Claude.ai**: um system prompt nas *Instruções* + 6 arquivos
nos *Knowledge Files*. Essa divisão importa e está documentada na FAQ (pergunta 5).

### `prompts/` — os 7 arquivos do produto

Nomes em minúsculas e **preservados exatamente**: a FAQ os nomeia um a um, e o produto
depende deles para funcionar. Não renomear.

| Arquivo | Papel | Onde vai |
|---|---|---|
| `system-prompt-maquina-carrosseis-v4.md` | O cérebro. Fluxo de 6 etapas, briefing de 7 perguntas, engine de headlines, design system, regras globais. | **Instruções** do projeto |
| `brandsdecoded-design-system.md` | Especificação visual completa: CSS de cada tipo de slide (capa, dark, light, gradient, CTA), img-box, preview do Instagram. | Knowledge Files |
| `brandsdecoded-principios-design.md` | Princípios de design: hierarquia de 3 níveis, ritmo dark/light, escala tipográfica, geração de paleta, anti-patterns visuais. | Knowledge Files |
| `brandsdecoded-banco-de-headlines.md` | Os 56 hooks outliers (+10k likes) organizados por padrão dominante. | Knowledge Files |
| `brandsdecoded-filtro-editorial.md` | Anti-AI-slop: construções, headlines, aberturas, fechamentos, jargões e vocabulário proibidos. | Knowledge Files |
| `brandsdecoded-manual-de-qualidade.md` | Manual de treinamento editorial: estrutura de 18 blocos, os 7 parâmetros de qualidade (nota mínima 8/10), os 5 testes finais. | Knowledge Files |
| `brandsdecoded-referencias.md` | Dois carrosséis completos de referência, da triagem à copy dos slides. | Knowledge Files |

### `docs/` — o resto

| Arquivo | O que é |
|---|---|
| `CONTENT-MACHINE-OPERACAO-CLAUDE.md` | **System prompt alternativo.** Entrega os 18 textos em bloco ```md, sem render HTML. Mais restritivo que o v4 (proíbe travessão, exige contagem de palavras por bloco). |
| `HEADLINE-GENERATOR-OPERACAO-CLAUDE.md` | **System prompt independente.** Só headlines: cria (10 variações) ou diagnostica um hook existente. Hook de 14–18 palavras, sub-hook de 8–12. |
| `PROMPT-CRIADOR-CARROSSEIS-MEIO-FUNIL.md` | Prompt simples de carrossel **educativo** (meio de funil). Sem design system, sem HTML. Entrega texto + legenda. |
| `FAQ-CONTENT-MACHINE.md` | 25 perguntas: instalação, fluxo, design, export, uso avançado. |
| `GUIA-BOAS-PRATICAS-CONTENT-MACHINE.md` | Briefing, escolha de headline, ajustes, imagens, 10 prompts prontos, calendário editorial, checklist de publicação. |

**Os três system prompts são alternativos entre si**, não complementares. O v4 (em `prompts/`)
é o completo — briefing, headlines, aprovação de texto, render HTML e export PNG.

---

## NEWSROOM — capa de notícia

`NEWSROOM-GUIA-DE-INSTALACAO.md` — v1.1, maio de 2026. Sistema de news-jacking: notícia
quente → 10 headlines → capa 1080×1350 em PNG. Fluxo de 6 etapas, comandos de controle,
solução de problemas.

> **Lacuna conhecida:** o guia é o único arquivo do Newsroom que chegou. Os 4 arquivos
> do produto que ele manda instalar — `newsroom-system-prompt.md`, `newsroom-design.md`,
> `newsroom-anti-slop.md`, `newsroom-banco-hooks.md` — **não vieram**. Sem eles o
> Newsroom não roda.

---

## SKILLS — o Kit de 4 skills

Skills de Claude no formato padrão (`SKILL.md` + `references/` + `scripts/`), verbatim
como saíram dos ZIPs. Visão geral do Kit em `docs/COMECE-POR-AQUI-VISAO-GERAL.md`.

| Skill | O que faz | Saída |
|---|---|---|
| `brandsdecoded-diagnostico-marca` | Posicionamento pelo método BlueprintPRO: X → Y → Território → Nicho → ICP → Dor → Big Idea → Narrativa → Linguagem → 5 Editorias → 15 ideias. | documento `.md` + deck PPTX |
| `brandsdecoded-propostas` | Pitch de captação, apresentação comercial, proposta de trabalho ou pesquisa de mercado. Briefing bloqueante; identidade sempre do cliente. | PPTX e/ou PDF |
| `landing-page-machine` | Landing page de venda de ponta a ponta: copy PT-BR sem cheiro de IA, HTML mobile-first de arquivo único, prompt do Lovable. | copy + HTML + prompt |
| `lead-copy` | Copy de disparo pra base, formatada pro canal (e-mail, WhatsApp, stories). 7 objetivos, 3 modos de voz, 6 lentes de storytelling. | a copy pronta pra colar |

> **Defeito na origem:** dois `SKILL.md` chegaram **truncados no meio de uma frase** —
> `brandsdecoded-diagnostico-marca` (corta na Etapa 3, em "``...em `refer``") e
> `brandsdecoded-propostas` (corta na ordem de leitura, em "``2. `references/pesqui``").
> Os ZIPs estão íntegros (`unzip -t` passa), então o truncamento veio da origem, não do
> transporte. Em ambos falta só o fecho — a "Ordem de leitura dos references" — e todos
> os arquivos de `references/` que eles citam **estão completos**. As skills funcionam;
> vale pedir os `SKILL.md` inteiros a quem enviou.

---

## Fios que atravessam o material

Três coisas se repetem em quase todos os arquivos e valem como leitura do método:

1. **Anti-AI-slop é a espinha dorsal.** Proibição sistemática de "não é X, é Y", "e isso
   muda tudo", "no fim das contas", paralelismos forçados, jargão corporativo, omissão de
   artigos. O padrão de comparação declarado é sempre o mesmo: *um repórter da Folha
   escreveria assim?*
2. **Briefing antes de produzir.** Todas as skills e prompts começam perguntando. Várias
   marcam essa etapa como bloqueante.
3. **Honestidade sobre dado.** Nada de número, fonte, prova ou depoimento inventado —
   ou tem fonte rastreável, ou vira placeholder, ou é marcado como hipótese/estimativa.

---

## Duplicatas descartadas

O envio trouxe repetições, verificadas por md5 antes de descartar:

- `NewsroomGuiadeInstalacao.pdf` — 2 cópias idênticas
- `00__Comece_por_aqui__Visao_Geral.pdf` — 4 cópias idênticas (duas nomeadas `_2`)

Guardada uma de cada em `originais/`.
