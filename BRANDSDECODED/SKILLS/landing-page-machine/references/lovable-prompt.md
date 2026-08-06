# Módulo — Prompt para o Lovable

Carregado na **Etapa 5**, ou quando o usuário pedir pra montar no Lovable.

## Por que um prompt, e não o HTML

O Lovable não hospeda um HTML colado como um servidor estático. Ele **reconstrói a página em React/Tailwind a partir de um prompt**. Então o caminho certo é gerar um prompt que descreve a página inteira, com a copy já dentro. O HTML que a skill gerou serve de **referência visual** (o usuário pode anexar print no Lovable pra aumentar a fidelidade), mas é o prompt que faz o Lovable cuspir a versão nativa e editável.

## Idioma do prompt

As **instruções de construção** podem ir em inglês — o Lovable rende melhor assim. Mas **a copy fica em PT-BR, exatamente como foi aprovada**, e o prompt precisa mandar o Lovable **não traduzir e não reescrever** uma vírgula da copy. Se a diferença de qualidade for irrelevante numa página simples, pode mandar tudo em português; na dúvida, instrução em inglês + copy em PT-BR fixa.

## Estrutura do prompt (montar nesta ordem)

1. **Objetivo:** "Build a single, high-converting mobile-first landing page. Do not add routing, auth, or a backend. One page only."
2. **Público e meta:** quem cai na página e qual a única ação (comprar / deixar contato / agendar).
3. **Tokens de design:** cores em hex (fundo, texto, marca/coral, botão), modo (escuro/creme), par tipográfico, cantos/raio. "Mobile-first. Verify text contrast ≥ 4.5:1."
4. **Estrutura seção a seção**, na ordem do esqueleto aprovado, com **a copy exata de cada dobra colada dentro** (entre aspas ou em bloco). Cada seção descreve o layout (ex.: "hero: manchete grande, submanchete, botão verde, selos abaixo").
5. **Comportamento da chamada:** texto do botão, alto contraste, fixa no mobile, e pra onde aponta (link do checkout/formulário).
6. **Travas, em inglês e em destaque:**
   - "Keep ALL copy exactly as written, in Brazilian Portuguese. Do NOT translate or rephrase."
   - "Do NOT invent testimonials, numbers, logos, or content. Use only what is provided."
   - "No gradient text, no glassmorphism, no generic SaaS hero. Match the tokens above."
   - "Mobile-first, fast, single file feel."

## Formato de entrega

Entregar como **um bloco único pronto pra colar** no Lovable. Sem texto antes nem depois do bloco, pra o usuário só copiar.

Depois do bloco, em uma linha fora dele, lembrar o usuário: ele pode **anexar o print do HTML** como referência visual no Lovable, e que o checkout/domínio ele conecta lá dentro depois que a página estiver montada.

## Modelo de abertura do prompt

```
Build a single, high-converting, mobile-first landing page (one page, no routing/auth/backend).

GOAL: [ação única]. AUDIENCE: [avatar em 1 linha].

DESIGN TOKENS:
- background [hex], text [hex], brand/accent [hex], CTA button [hex]
- mode: [dark/cream], display font [X], body font [Inter]
- rounded corners [Npx], mobile-first, contrast >= 4.5:1

SECTIONS (in this exact order, keep all copy verbatim in Brazilian Portuguese):

1) HERO
   Headline: "[copy]"
   Subhead: "[copy]"
   CTA button: "[copy]"  -> links to [destino]
2) [próxima dobra] ...
...

RULES:
- Keep ALL copy exactly as written. Do NOT translate or rephrase.
- Do NOT invent any content, testimonials, numbers or logos.
- No gradient text, no glassmorphism, no generic SaaS template look.
- Mobile-first, fast, clean.
```
