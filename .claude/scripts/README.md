# Scripts de publicação

Pipeline para transformar um HTML de artifact (versão-cliente) em PDF e em
documento nativo do Google Drive.

## PDF

```
.claude/scripts/mkpdf.sh ARQUIVO.html "Nome do PDF.pdf"
```

Usa o Chromium do Playwright (`/opt/pw-browsers/chromium-1194/chrome-linux/chrome`).
Envolve o arquivo num documento completo com `@page` A4, força o tema claro
(`data-theme="light"`), liga `print-color-adjust: exact` e evita quebra dentro
dos cartões. As fontes do Google Fonts **não** carregam aqui (o proxy bloqueia
`fonts.gstatic.com`): cai em DejaVu Sans / Liberation Serif, o que é aceitável.

**O PDF não sobe pelo conector do Drive.** Sai com ~200 KB, e o `create_file`
exige o binário inline em base64 (~280 KB), o que estoura o limite de resposta.
PDF é para mandar direto ao cliente pelo WhatsApp; para o Drive, ver abaixo.

## Documento nativo do Drive

```
python3 gridfix.py  ARQUIVO.html  g-saida.html    # grades CSS viram <table>
python3 mkdrive.py  g-saida.html  d-saida.html "Título"   # resolve var(--x) e inlina o CSS
python3 flatten.py  d-saida.html  final.html      # achata as células e vira emoji em entidade
```

Depois, `mcp__Google_Drive__create_file` com `contentMimeType: text/html` e o
conteúdo em `textContent` — o Drive converte para Google Docs.

**Por que os três passos.** O importador de HTML do Google Docs:

1. **ignora `display:grid` e `display:flex`** — sem o `gridfix`, as grades
   chegam empilhadas e o documento desmonta;
2. **quebra bloco dentro de célula** — `<div>`, `<p>`, `<h3>` e `<ul>` dentro de
   `<td>` viram texto literal (`### **Título**`, `&#10;`). O `flatten` deixa só
   tag inline (`<b>`, `<i>`, `<br>`, `<span>`);
3. **não resolve variável CSS** — `var(--accent)` chega sem cor, daí o
   `mkdrive` substituir pelas do bloco `:root` do tema claro.

**Ao conferir com `read_file_content`:** o leitor devolve markdown e
**superescapa dentro de célula** — negrito real aparece como `\*\*texto\*\*` e
`~` como `\\\~`, e o `<br>` some. É artefato de leitura, não do documento.
Para conferir de verdade, abrir o Doc.
