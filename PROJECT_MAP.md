# PROJECT_MAP — ecossistema digital EXPANSION

Mapa de navegação para alterações. Consulte este arquivo antes de abrir código.

**Estado em 14/08/2026: só a Landing Page está editável neste workspace.**
O pacote recebido traz a LP em código-fonte e o CRM apenas como build
compilado. Detalhe na seção CRM.

---

## LANDING PAGE — expansionassessoria.com

| | |
|---|---|
| **stack** | HTML + CSS + JS puros. Sem framework, sem build, sem dependências |
| **pasta** | `site/` |
| **entrypoint** | `site/index.html` — arquivo único, 365 KB |
| **execução** | `cd site && python3 -m http.server 8099` → http://localhost:8099 |
| **build** | não existe. O arquivo servido é o arquivo editado |
| **deploy** | upload do `public_html` para a hospedagem |

### Anatomia do `index.html`

365 KB no disco, mas **89 KB de código real** — 276 KB são duas imagens
embutidas em base64. Ao editar, ignore os blocos `data:image/...;base64,`.

- **CSS**: um único `<style>`, 2.511 linhas, no `<head>`
- **JS**: dois `<script>` no fim do body — 342 B (bootstrap) e 12,5 KB (lógica)

### Seções, na ordem do DOM

| Seletor | O que é |
|---|---|
| `nav#nav` | topo fixo |
| `section.hero` | dobra inicial |
| `section.cases` | provas / resultados |
| `section.team-section` | time |
| `section.method#metodo` | o método (âncora `#metodo`) |
| `section.services-section` | serviços — cards via `showService()` |
| `section.faq` | perguntas frequentes |
| `section.final-cta#cta-final` | CTA de fechamento (âncora `#cta-final`) |
| `footer` | rodapé |

### Design system (tokens em `:root`)

```
--orange #FF6B1A   --orange-light #FF8A4D   --orange-dark #E55A0F
--orange-glow rgba(255,107,26,.18)
--black #050505    --black-2 #0A0A0A
--gray-1 #111111   --gray-2 #1A1A1A   --gray-3 #2A2A2A   --gray-4 #3A3A3A
--text #EAEAEA     --text-muted #888888   --text-dim #5A5A5A   --white #FFF
--container 1240px --easing cubic-bezier(0.16, 1, 0.3, 1)
```

Tema escuro, acento laranja. **Atenção:** o laranja da LP é `#FF6B1A` — não
é o `#E67E22` usado nos roteiros e documentos internos. São paletas distintas.

**Tipografia** (Google Fonts, sem `@font-face` local):
`Bebas Neue` títulos · `Manrope` 300–700 corpo · `JetBrains Mono` dados

**Breakpoints:** 968/980px (desktop→tablet), 768px, 640px. Mobile-last —
o CSS base é desktop e os `@media (max-width)` reduzem.

### Formulário de diagnóstico — o coração da conversão

`<form id="diagForm" novalidate>` — validação 100% em JS, o browser não valida.

Campos: `nome` `email` `telefone` `empresa` `cnpj` `faturamento`
`investimento` (ids `f-nome`, `f-email`, … `f-investimento`).

Fluxo no submit:
1. `POST` direto para `https://tefenzgtzfyeeogwkxup.supabase.co/rest/v1/leads`
   (`CRM_URL`, header `apikey`)
2. `dataLayer.push({event:'form_submit', form_name:'diagnostico'})`
3. redireciona para `/obrigado/`

**Fallback offline:** se o POST falha, o lead entra em
`localStorage['expansion_leads_pending']` e `retryPendingLeads()` reenvia na
próxima visita. Mexeu no formulário, teste também esse caminho — ele é fácil
de quebrar sem perceber.

### Integrações

| | |
|---|---|
| Supabase | `POST /rest/v1/leads` — grava o lead |
| GTM | `GTM-NFBGGWD7` |
| WhatsApp | `wa.me/5519987030886` — CTAs e fallback de erro do form |
| Google Fonts | `fonts.googleapis.com` / `fonts.gstatic.com` |

### `/obrigado/`

`site/obrigado/index.html`, 6 KB. Mesma paleta e fontes. Sem integrações —
só confirma o recebimento. Sem evento de conversão próprio: o `form_submit`
é disparado na LP, antes do redirect.

### Assets

`site/img/logo-expansion.png` · as duas imagens grandes estão inline no HTML.

---

## CRM — crm.expansionassessoria.com

| | |
|---|---|
| **stack** | Next.js (App Router, bundler Turbopack) + Supabase |
| **pasta** | `site/crm/` — **build compilado, não fonte** |
| **execução** | não é executável a partir daqui |
| **build** | não é possível a partir daqui |

### Por que não dá para editar

`site/crm/` é a saída de `next build` (export estático). Contém 17 HTML
gerados, 27 chunks JS minificados por Turbopack e 91 `.txt` de payload RSC.
Não há **nenhum** `.tsx`, `.ts`, `.jsx`, `package.json`, `next.config` ou
`tsconfig` — verificado por busca global.

Editar um chunk minificado não é desenvolvimento: a próxima build sobrescreve
tudo, e o nome dos arquivos muda a cada build.

### Onde o fonte realmente está

Repositório **`expansioncompanyoficial-hub/os-expansion`**, branch `main`,
com deploy contínuo na Vercel (time EXPANSION COMPANY, projeto
`os-expansion`, `prj_ZaaC9NEBcVd8YyiiTnA6UbwxJVVg`). Dependabot ativo.

Esta sessão **não tem acesso** a esse repositório — ver a nota no fim.

### Rotas observadas no build

`login` · `criar-conta` · `verificar-email` · `recuperar-senha` ·
`redefinir-senha` · `onboarding` · `pipeline` · `prospeccao` · `metas` ·
`faturamento` · `gerador` · `_not-found` · `404`

Domínio de negócio identificado nos chunks (constantes compiladas):
`ADERENCIA_LABEL` (alta/média/baixa aderência), `FILTROS_PADRAO`
(segmento "Loja de roupas"), `DEFAULT_THRESHOLDS`
(`verdeMaxDias:4`, `amareloMaxDias:10`, `prazoApertadoDias:2`) — semáforo de
prazo do pipeline. Ícones: `lucide`.

> Isto é leitura de build, não do fonte. Serve para orientar a busca quando
> o repositório for anexado — não como especificação.

---

## ARQUITETURA

```
claude-expasion/
├── PROJECT_MAP.md          este arquivo
├── CLAUDE.md               contexto do repositório
├── site/                   public_html de produção (28/07/2026)
│   ├── index.html          ★ LANDING PAGE — fonte editável
│   ├── obrigado/index.html
│   ├── img/
│   └── crm/                ✗ build do CRM — somente leitura
│       ├── _next/static/   chunks minificados + css + woff2
│       └── <rotas>/        HTML gerado + payloads .txt
├── AEOS/                   sistema normativo de engenharia
└── *.md                    acervo de estratégia e operação
```

---

## DEPENDÊNCIAS CRÍTICAS

**LP:** nenhuma no build. Em runtime: Google Fonts, GTM, Supabase REST.
Zero npm, zero `node_modules` — é a razão de a LP ser tão simples de manter.

**CRM:** Next.js, React, Supabase JS client, lucide-icons — inferidos do
bundle. Versões só com o repositório em mãos.

---

## RELAÇÃO ENTRE OS SISTEMAS

| Recurso | Compartilhado? |
|---|---|
| **Banco Supabase** | **Sim** — `tefenzgtzfyeeogwkxup.supabase.co`, o mesmo nos dois |
| **Domínio** | Sim — CRM em subdomínio `crm.` |
| **Tabela `leads`** | **Sim** — a LP escreve, o CRM lê |
| Paleta / identidade | Parcial — mesma família visual, tokens declarados de forma independente |
| Autenticação | Não — a LP não tem login |
| Componentes / código | Não — bases totalmente separadas |
| Analytics | Não — GTM só na LP |
| Infraestrutura | Não — LP em hospedagem estática, CRM na Vercel |

**O acoplamento real é um só, e é forte:** a LP faz `POST` na tabela `leads`
do mesmo Supabase que alimenta o CRM. Mudar o schema de `leads` quebra a
captação do site; mudar os campos do formulário entrega lead incompleto ao
time comercial. **Toda alteração em `leads` é `GLOBAL:`, nunca `LP:` nem
`CRM:`.**

---

## SEGURANÇA — a verificar no painel do Supabase

A LP faz `POST` em `/rest/v1/leads` com a chave publicável exposta no
navegador. Isso é normal e correto **desde que** a tabela `leads` tenha RLS
ativo com política de `INSERT` anônimo e **sem** `SELECT` anônimo.

Sem isso, a chave que está no código da página permite a qualquer pessoa
**ler a base inteira de leads** — nome, e-mail, telefone, CNPJ e faturamento
de todo mundo que já preencheu o formulário. Vale confirmar antes de
qualquer outra coisa.

Nenhuma chave secreta (`sb_secret_`, `service_role`) aparece no pacote.
