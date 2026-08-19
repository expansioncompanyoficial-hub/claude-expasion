# site/ — expansionassessoria.com

Cópia do `public_html` publicado em **https://expansionassessoria.com**,
recebida em 14/08/2026 como backup/referência. Arquivos datados de
**28/07/2026**.

Isto é **artefato de build**, não código-fonte: o CRM aqui é uma exportação
estática do Next.js (HTML + chunks minificados). O fonte do CRM não está
neste repositório — provavelmente vive no projeto `os-expansion` da conta
Vercel do time. Editar arquivos daqui não altera o site no ar.

## O que tem

```
index.html         Landing page — arquivo único, 360 KB.
                   Imagens embutidas em base64, CSS inline, sem build.
                   Título: "Expansion Assessoria — Venda com previsibilidade"
                   Seções: #metodo, #cta-final
                   Conversão: WhatsApp wa.me/5519987030886
                   Tag manager: GTM-NFBGGWD7
obrigado/          Página de agradecimento pós-formulário
img/               logo-expansion.png
crm/               "Expansion — CRM Comercial" — export estático Next.js
```

Rotas do CRM: `login`, `criar-conta`, `verificar-email`, `recuperar-senha`,
`redefinir-senha`, `onboarding`, `pipeline`, `prospeccao`, `metas`,
`faturamento`, `gerador`, `404`.

Backend do CRM: Supabase (`tefenzgtzfyeeogwkxup.supabase.co`).

## Sobre a chave do Supabase no bundle

Os chunks do CRM carregam `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, uma chave
`sb_publishable_…`. Chave publicável é feita para ficar exposta no navegador
— não é vazamento, e já estava pública no site no ar antes de vir para cá.

**Mas ela só é segura se o Row Level Security estiver ativo em todas as
tabelas do Supabase.** Sem RLS, qualquer pessoa com essa chave lê e escreve
o banco inteiro. Vale confirmar isso no painel do Supabase.

Nenhuma chave secreta (`sb_secret_`, `service_role`, JWT) foi encontrada
no pacote — foi verificado antes do commit, já que este repositório é
público.
