# ESTÚDIO — protótipo da interface

Protótipo do app de carrosséis da Expansion. Dois níveis: uma galeria de clientes e, dentro
de cada um, o estúdio com os carrosséis dele, o brand kit e os cinco templates.

## A navegação

```
CLIENTES                    →   DENTRO DO CLIENTE
galeria de cards                ‹ Clientes / Prime Alphaville
+ novo cliente                  ├── carrosséis do cliente (chips) + novo
                                ├── marca: 3 cores, fontes, assinatura
                                ├── template: 5 opções
                                ├── palco: slide grande + tiras
                                └── conteúdo: editor + contadores
```

Um cliente é uma sessão: guarda a marca e as peças. Entrar nele abre tudo numa tela só —
não precisa navegar de novo pra trocar de carrossel, de template ou de cor.

É o mesmo modelo da plataforma da BrandsDecoded (projetos na entrada, studio dentro), que
faz sentido porque separa *configurar a marca* de *produzir peça*.

Publicado como artifact em 11/08/2026. Arquitetura do back end em
`../ESTUDIO-ARQUITETURA-2026-08-11.md`.

## Como regerar

O fonte fica em `prototipo.src.html` com um marcador `/*__FACES__*/`. O gerador embute as
fontes em base64 nesse ponto:

```bash
python3 gerar.py prototipo.src.html /tmp/estudio.html
```

Fontes em base64 e não `<link>` do Google Fonts: a CSP do artifact bloqueia CDN de fonte,
e o Chromium headless também não carrega webfont externa de forma confiável.

## Os cinco templates

Quatro modelados nos da BrandsDecoded (ver `../BRANDSDECODED/MAQUINA/`), um já em produção
na skill:

| Template | Etapa | Cara |
|---|---|---|
| Meio de Funil | meio · 9 slides | Ritmo alternado destaque/escuro, claro nas pontas |
| Brands 1 | topo | Foto full-bleed escurecida, headline na base, @ acima |
| Brands 2 | topo | Foto full-bleed, headline em serifa centralizada |
| Brands 3 | topo | Foto em meia tela, headline na coluna da direita |
| Twitter | topo | Cartão de post, fundo claro, avatar e selo |

## Limites conhecidos

Roda inteiro no navegador — não persiste, não faz upload, não exporta PNG e não chama a
skill. É protótipo de interface, não o produto. O que falta está tabelado no documento de
arquitetura.

As fotos são gradientes derivados das cores do cliente, no lugar de imagem real.
