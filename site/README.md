# site/ — páginas para hospedar no domínio da Expansion

Pasta pronta para subir em qualquer host estático. **Nada aqui depende de build.**

```
site/
  robots.txt                          bloqueia /cies/ nos buscadores
  cies/relatorio-24-08/index.html     relatório semanal de 24/08
```

## O que já está resolvido

- **Documento completo.** `<!doctype>`, `<head>`, viewport e charset. A versão do
  artifact não tem isso porque o runtime do Claude embrulha sozinho; para
  domínio próprio precisa do documento inteiro.
- **`noindex, nofollow, noarchive`** na página e `Disallow` no `robots.txt`.
  Relatório de cliente não pode cair em busca do Google.
- **`referrer: no-referrer`**, para o link não vazar quando alguém clica para fora.
- **Sem dependência externa**, fora as fontes do Google Fonts.
- **Favicon embutido** em SVG data URI.

## Como publicar, por host

**Vercel** — arraste a pasta `site/` em vercel.com/new, ou:
```
npx vercel deploy site --prod
```
Depois aponte o domínio em Settings › Domains.

**Netlify** — arraste `site/` em app.netlify.com/drop e configure o domínio.

**GitHub Pages** — Settings › Pages › Source: branch e pasta `/site`.
⚠️ Este repositório é **público**. Ver o aviso abaixo antes.

**Hospedagem tradicional (cPanel, Hostinger, Locaweb)** — sobe a pasta `cies/`
e o `robots.txt` para o `public_html` por FTP.

**Wix, WordPress ou Webflow** — não dá para subir HTML solto do jeito certo.
Nesses casos o caminho é hospedar em subdomínio separado
(`relatorios.seudominio.com.br`) apontando para Vercel ou Netlify.

## Aviso de privacidade

Este relatório tem **faturamento, estoque, ticket, base de contatos e avaliação
interna do cliente**. Publicar em URL pública significa que qualquer pessoa com
o link lê tudo.

O `noindex` impede que apareça em busca, **mas não protege o link**. Se for para
circular só com a Sabrina e o Kauan, o mínimo é uma URL difícil de adivinhar; o
correto é proteção por senha, que Vercel e Netlify oferecem no plano pago.

## Convenção para os próximos

Um diretório por relatório, com a data no nome:

```
site/cies/relatorio-31-08/index.html
site/cies/relatorio-07-09/index.html
```

Assim cada segunda-feira tem link fixo e o histórico não se perde.
