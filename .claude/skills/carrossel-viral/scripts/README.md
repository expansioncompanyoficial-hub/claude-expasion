# Scripts do renderizador

Dois passos, um spec JSON no meio. Genéricos — servem qualquer cliente.

```bash
python3 render_carrossel.py spec.json carrossel.html
python3 export_png.py carrossel.html slides/
```

## O spec

```jsonc
{
  "marca": "Prime Assessoria",
  "handle": "@prime.alphaville",
  "monograma": "P",              // opcional
  "tokens": {
    "dark": "#191818",           // fundo dominante
    "accent": "#e14414",         // só acento: número, palavra-chave, barra, CTA
    "gray": "#9d9d9c",
    "fonte_head": "Montserrat",
    "fonte_body": "Poppins",
    "capa_size": 96              // px da headline de capa
  },
  "fontes": [                     // .woff2 de @fontsource, embutidos em base64
    {"family": "Montserrat", "weight": 900, "file": "…/montserrat-latin-ext-900-normal.woff2"}
  ],
  "slides": [ /* ver tipos abaixo */ ]
}
```

Pegar as fontes: `npm i @fontsource/montserrat @fontsource/poppins` e usar a
variante **`latin-ext`** — é ela que traz ã, õ, ç e acento.

## Tipos de slide

| `tipo` | Campos |
|---|---|
| `capa` | `headline`, `sub`, `imagem` (opcional) |
| `texto` | `tag`, `h1`, `paragrafos[]`, `fonte` |
| `stat` | `tag`, `numero`, `label`, `paragrafos[]`, `fonte` |
| `bullets` | `tag`, `itens[]` |
| `destaque` | `tag`, `texto` — renderiza no slide de acento |
| `cta` | `tag`, `ponte`, `instrucao`, `palavra` |

Marcação no texto: `*accent*` e `**forte**`.

## Duas regras que quebram silenciosamente

**Fontes em base64, nunca `<link>` do Google Fonts.** O Chromium headless não carrega
webfont externa de forma confiável e o PNG sai com fallback — igual ao preview no browser
só na aparência, diferente no arquivo entregue.

**`slide.screenshot()` no elemento, nunca `page.screenshot()` no viewport.** É o que
garante 1080×1350 exatos, sem clip nem resize. O exportador confirma a medida e o
carregamento das fontes na saída.

## Chromium

O `playwright install` não roda neste ambiente. O exportador aponta direto para o
Chromium já instalado (`/opt/pw-browsers/chromium`).
