# Landing page — Expansion Produções

Landing page cinematográfica da produtora, construída com **Vite + React +
TypeScript**, CSS próprio (design system "Orange Signal") e zero dependência
pesada de runtime.

## Como executar

```bash
cd site
npm install
npm run dev        # desenvolvimento em http://localhost:5173
npm run build      # build de produção em site/dist
npm run preview    # serve o build em http://localhost:4173
```

O build gera arquivos estáticos em `site/dist` — pode ser publicado em
Vercel, Netlify, Cloudflare Pages ou qualquer hospedagem estática.

## Onde editar o conteúdo

**Tudo que é texto, contato, vídeo, depoimento e FAQ vive em um único
arquivo: [`src/config/site.ts`](src/config/site.ts).** Os pontos que
aguardam dado real estão marcados com `[EDITAR]`:

| O quê | Onde |
| --- | --- |
| WhatsApp (número real) | `contact.whatsapp.number` e `.display` |
| Instagram (handle real) | `contact.instagram` |
| Domínio do site | `siteUrl` + `index.html` (canonical/OG) + `public/robots.txt` + `public/sitemap.xml` |
| Cidade-base | `brand.city` |
| Vídeo de fundo do hero | `hero.backgroundVideo` (coloque um mp4 leve em `public/media/hero.mp4`) |
| Logos das marcas atendidas | `clients[]` (arquivos em `public/clients/`) |
| Projetos do portfólio | `portfolio.items[]` |
| Depoimentos (nomes, empresas, fotos) | `testimonials.videos[]`, `.quotes[]`, `.results[]` |
| Endpoint do formulário | `cta.formEndpoint` (enquanto `null`, o envio abre o WhatsApp com o briefing formatado) |

## Vídeos

Os vídeos apontam para os arquivos do Google Drive enviados pela equipe
(showreel/aftermovie, evento, tempo real e 3 depoimentos), abertos em modal
via player do Drive. **Para o player funcionar para visitantes, cada
arquivo precisa estar compartilhado como "Qualquer pessoa com o link".**

Para trocar por YouTube/Vimeo/arquivo próprio, basta mudar o campo `video`
no config: `{ type: 'youtube', id: '...' }`, `{ type: 'vimeo', id: '...' }`
ou `{ type: 'file', url: '/media/video.mp4' }`.

## Materiais que ainda faltam

- Número real de WhatsApp e handle do Instagram;
- Logos das marcas/eventos atendidos (para a faixa de autoridade);
- Nomes completos, cargos, empresas e fotos dos 3 depoimentos em vídeo;
- Depoimentos escritos reais e cases com resultados comprováveis;
- Vídeo de fundo do hero (mp4 sem áudio, ~10 s, ideal < 4 MB);
- Thumbnails reais dos projetos (opcional — sem elas o site gera posters);
- Domínio definitivo.
