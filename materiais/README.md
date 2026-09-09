# Materiais

Materiais de cliente produzidos com o sistema visual da EXPANSION. Uma pasta por
material.

```
materiais/
  CLIENTE-TIPO-DE-MATERIAL/
    material.html                      fonte, é o que se edita
    logo-cliente-branco.png            marca do cliente, se houver
    CLIENTE-MATERIAL-AAAA-MM-DD.pdf    o que vai para o cliente
    CLIENTE-MATERIAL-AAAA-MM-DD.html   arquivo único, versão editável
    previa/                            PNG por página (não versionado)
```

Nome da pasta e do PDF em caixa-alta com hífen, PDF sufixado com a data, como o
resto do acervo. Revisão vira arquivo novo (`-RODADA2`), não edição destrutiva —
o histórico é o valor.

## Como produzir

Ver `.claude/skills/designer-expansion/SKILL.md`. Em resumo:

```bash
cp .claude/skills/designer-expansion/templates/documento-a4.html \
   materiais/CLIENTE-TIPO/material.html

node .claude/skills/designer-expansion/bin/gerar-pdf.mjs \
  materiais/CLIENTE-TIPO/material.html \
  -o materiais/CLIENTE-TIPO/CLIENTE-TIPO-2026-01-31.pdf --html --previa
```

## O que já existe

| Pasta | O que é |
|---|---|
| `EXPANSION-SISTEMA-VISUAL/` | Manual do próprio sistema visual, montado com ele. Serve de referência de como uma peça fica pronta. |
