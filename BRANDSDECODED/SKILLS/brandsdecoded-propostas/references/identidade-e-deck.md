# Identidade visual flexível, voz e render

A peça é do cliente, pra um terceiro. Por isso a identidade é **sempre a marca do cliente**. **Não existe padrão BrandsDecoded como default** — a identidade da casa só entra se o cliente pedir de propósito. Isto NÃO é uma skill de "tudo creme e laranja".

## Voz da peça

- Sem AI-slop ("no mundo de hoje", "soluções inovadoras", "eleve seu negócio", "desbloqueie"). Sem em-dash como muleta, sem triplo paralelo decorativo.
- Concreto vence adjetivo: número real, prazo, nome. "Crescemos 4x em 6 meses" vence "crescimento acelerado".
- Aplicar o **tom escolhido no briefing** (sóbrio, ousado, técnico, próximo). O tom muda a escolha de palavras e a densidade, não a estrutura.
- Confiança sem arrogância; não prometer o que não dá pra provar.

## Identidade visual — os três caminhos do briefing

Tudo vira um objeto de tokens `THEME` que alimenta o render. O que muda é de onde os tokens vêm.

### Caminho 1 — Brand kit do cliente
O cliente mandou cores, fontes, logo. Montar o THEME com os hex e fontes dele:
- `accent` (cor de destaque), `bg` (fundo claro), `dark` (fundo escuro/capa), `ink` (texto), `gray` (apoio).
- `fontDisplay` e `fontBody` (se as fontes do cliente não existirem no ambiente de render, mapear via fontconfig pra um substituto parecido; o arquivo mantém os nomes corretos).
- Incluir o **logo** (capa e/ou rodapé). Pedir PNG/SVG.
- Respeitar regras da marca se ele as deu (onde usar a cor, o que evitar).

### Caminho 2 — Descrição da marca
O cliente descreveu ("azul-marinho e branco, sério e minimalista"). Traduzir a descrição em tokens concretos, **confirmar com ele** ("vou usar azul-marinho #14233A com branco, fonte sem serifa limpa, layout minimalista — fechado?") e só então montar. Não chutar e seguir; confirmar a tradução.

### Caminho 3 — Sem marca definida (NÃO é o padrão da casa)
Quando o cliente não tem identidade própria. **Não** assumir o visual BrandsDecoded. Propor uma **paleta neutra e profissional adequada ao tema**, mostrar (cores em hex + fontes) e confirmar antes de montar. O `THEME` default do script já vem num neutro profissional (azul/branco/grafite) como placeholder — ajustar ao tema do cliente.

Exemplo de THEME neutro (placeholder do script):
```
accent = 2B5CE6   // azul profissional (trocar conforme o tema)
bg     = FFFFFF   // branco
dark   = 111827   // grafite quase-preto (capa/divisor)
ink    = 111827
gray   = 6B7280 / 9CA3AF
fontDisplay = Instrument Sans   fontBody = Inter
```

A identidade da própria BrandsDecoded (off-white FAF8F4 / preto-quente 1A1410 / laranja-coral FF4500, Instrument Sans + Inter) só entra se o cliente pedir explicitamente "faz no padrão de vocês".

### Princípios de layout (valem em qualquer identidade)
- Formato 16:9 (deck) ou A4 (documento). Sanduíche: fundo escuro em capa/divisor/fecho, claro no conteúdo.
- Uma cor de destaque dominante; não competir com várias cores saturadas.
- Display grande no título, corpo legível; contraste forte de hierarquia. Corpo alinhado à esquerda.
- Acento usado como número/uma palavra/marcador — não como barra, faixa ou sublinhado de título (cheiro de template). Sem accent line sob título.
- Stat callout grande (número 40-72pt + label) pra destacar dado/tração.
- Densidade organizada, com respiro. Não encher o slide.

## Dados numéricos
Todo número de pesquisa carrega F[n] e aparece na **bibliografia**. Estimativa marcada como "estimativa". Sem fonte, não entra.

## Render

- **PPTX** — `scripts/build-proposta.js` (pptxgenjs). O script tem um objeto `THEME` no topo (tokens) e a lista de `slides`. Trocar o THEME aplica a identidade do cliente sem mexer no resto. Tipos de slide prontos: cover, divider, section, bullets, metrics, twocol, biblio, closing.
- **PDF** — exportar o PPTX (LibreOffice) OU, para proposta/pesquisa textual, gerar PDF A4 limpo (HTML→PDF) com os mesmos tokens.

Pipeline e validação:
```bash
npm install pptxgenjs
node build-proposta.js
python /mnt/skills/public/pptx/scripts/office/soffice.py --headless --convert-to pdf SAIDA.pptx
pdftoppm -jpeg -r 130 SAIDA.pdf slide
```
Inspecionar com olhar fresco (subagente): overflow, contraste, alinhamento, cada número com fonte, ortografia, emoji virando tofu, logo no lugar. Gerar só o(s) formato(s) pedido(s) no briefing.
