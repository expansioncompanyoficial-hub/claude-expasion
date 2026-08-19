# Biblioteca de Paletas — Direct Response BR

Biblioteca curada de paletas prontas pra colar como variáveis de CSS numa landing page de venda. Cada paleta traz o conjunto completo de tokens em hex, mais uma nota dizendo pra que tipo de oferta e que clima ela serve. O objetivo é o operador leigo escolher pela linha "melhor pra / mood" e sair montando, sem ficar caçando cor no olho.

## Como usar

1. **Escolha pelo tipo de oferta e pelo mood, não pela cor que você acha bonita.** Procure na coluna "melhor pra / mood" a linha que descreve a sua campanha (infoproduto, mentoria, e-commerce de luxo, lançamento agressivo, etc.). A página de venda existe pra converter; a paleta serve à oferta, não ao seu gosto.
2. **Cole os tokens no `:root`.** Cada paleta é um conjunto fechado: fundo, texto, primária, sobre-primária, acento/CTA, card, muted, borda, destrutiva. Os nomes batem com os tokens que o resto da skill usa.
3. **Confira o contraste sempre.** Texto de corpo precisa de no mínimo **4,5:1** contra o fundo (regra WCAG AA). Cinza claro "pra ficar elegante" é a causa número um de página que cansa de ler — puxe o texto pro lado do branco (em fundo escuro) ou do quase-preto (em fundo claro). Para texto grande de manchete, 3:1 já passa, mas em DR a manchete costuma ser branca ou coral sólido em fundo escuro, então isso raramente é problema.
4. **O coral da casa é sempre uma opção.** Em qualquer paleta, você pode trocar o acento/CTA pelo coral `#e8421a` (ou um vizinho da família coral/laranja-queimado) se a campanha for da casa ou se quiser herdar a identidade. As três paletas da casa já vêm prontas no fim da tabela.
5. **Um CTA, uma cor.** O botão de ação tem que ser a cor de maior contraste e maior saturação da página, e ela não aparece em mais nada decorativo. Se a paleta tem acento laranja mas você quer o CTA verde de alto contraste, troque só o token de CTA — está liberado quando aumenta conversão.

### Legenda dos tokens

- **fundo** (`--bg`): cor de fundo da página.
- **texto** (`--ink` / foreground): cor do corpo de texto sobre o fundo.
- **primária** (`--primary`): cor de marca, usada em manchete, links de apoio, ícones de destaque.
- **sobre-primária** (`--on-primary`): cor do texto que vai *em cima* da primária (ex.: texto dentro de um bloco com fundo da cor primária).
- **acento/CTA** (`--cta`): a cor do botão de ação. A mais contrastante da página.
- **card** (`--card`): fundo de cartões, caixas de depoimento, blocos de oferta.
- **muted** (`--muted`): texto secundário, legendas, microcopy — sempre conferindo que ainda passa 4,5:1 se for texto de leitura real.
- **borda** (`--border`): linhas finas, divisórias, contorno de input.
- **destrutiva** (`--destructive`): erro de formulário, aviso de "vagas esgotando", risco. Quase sempre um vermelho.

---

## Tabela — paletas por tipo de oferta

> Notas rápidas sobre modo: paletas com fundo escuro (`#0f...`, `#020...`, `#000...`) carregam urgência e energia de lançamento. Paletas com fundo claro/creme servem ao editorial e ao refinamento. Em DR brasileiro, o escuro converte muito por pressão; o claro converte por confiança e sofisticação.

| # | fundo | texto | primária | sobre-prim. | acento/CTA | card | muted | borda | destrutiva | Melhor pra / mood |
|---|-------|-------|----------|-------------|------------|------|-------|-------|------------|-------------------|
| 1 | `#F8FAFC` | `#1E293B` | `#2563EB` | `#FFFFFF` | `#EA580C` | `#FFFFFF` | `#64748B` | `#E2E8F0` | `#DC2626` | **Software/SaaS geral** — azul confiança + laranja no CTA. Clima limpo, técnico, "ferramenta séria". |
| 2 | `#F5F3FF` | `#1E1B4B` | `#6366F1` | `#FFFFFF` | `#059669` | `#FFFFFF` | `#64748B` | `#E0E7FF` | `#DC2626` | **Micro-SaaS / app de assinatura** — índigo + verde no CTA. Moderno, indie, "produto digital novo". |
| 3 | `#ECFDF5` | `#064E3B` | `#059669` | `#FFFFFF` | `#EA580C` | `#FFFFFF` | `#64748B` | `#A7F3D0` | `#DC2626` | **E-commerce geral** — verde de aprovação + laranja de urgência. Clima de "compra fácil, frete liberado". |
| 4 | `#FAFAF9` | `#0C0A09` | `#1C1917` | `#FFFFFF` | `#A16207` | `#FFFFFF` | `#64748B` | `#D6D3D1` | `#DC2626` | **E-commerce de luxo (claro)** — quase-preto + dourado. Premium discreto, joia, alta-costura. |
| 5 | `#0C0A09` | `#FAFAF9` | `#C9A962` | `#0C0A09` | `#C9A962` | `#1C1917` | `#A8A29E` | `#292524` | `#EF4444` | **E-commerce de luxo (escuro)** — preto + dourado por cima. Vitrine de produto caro, exclusividade. |
| 6 | `#0F172A` | `#F8FAFC` | `#1E40AF` | `#FFFFFF` | `#22C55E` | `#0E1223` | `#94A3B8` | `#334155` | `#EF4444` | **Finanças / investimento** — navy escuro + verde de lucro. Trading, renda variável, "número subindo". |
| 7 | `#F8FAFC` | `#0F172A` | `#1E3A5F` | `#FFFFFF` | `#059669` | `#FFFFFF` | `#64748B` | `#E4E7EB` | `#DC2626` | **Finanças (claro/conservador)** — navy + verde "pago". Educação financeira, consórcio, plano de previdência. |
| 8 | `#0F172A` | `#F8FAFC` | `#F59E0B` | `#0F172A` | `#8B5CF6` | `#222735` | `#94A3B8` | `#334155` | `#EF4444` | **Cripto / fintech agressiva** — ouro de confiança + roxo tech sobre escuro. Lançamento de cripto, robô de trade. |
| 9 | `#0D9488` `→` claro `#F0FDFA` | `#134E4A` | `#0D9488` | `#FFFFFF` | `#EA580C` | `#FFFFFF` | `#64748B` | `#5EEAD4` | `#DC2626` | **Curso online / e-learning** — teal de progresso + laranja de conquista. Curso técnico, formação, certificação. |
| 10 | `#EEF2FF` | `#1E1B4B` | `#4F46E5` | `#FFFFFF` | `#EA580C` | `#FFFFFF` | `#64748B` | `#C7D2FE` | `#DC2626` | **Educação / app educacional** — índigo animado + laranja energético. Idiomas, vestibular, concurso. |
| 11 | `#FAF5FF` | `#0F172A` | `#7C3AED` | `#FFFFFF` | `#059669` | `#FFFFFF` | `#64748B` | `#EFE7FC` | `#DC2626` | **Mentoria / high-ticket (claro)** — roxo de autoridade + verde de ação. Mentoria, masterclass, grupo fechado. |
| 12 | `#0F0F23` | `#F8FAFC` | `#7C3AED` | `#FFFFFF` | `#22C55E` | `#1E1D35` | `#94A3B8` | `#312E81` | `#EF4444` | **Mentoria premium (escuro)** — roxo profundo + verde no CTA. Imersão cara, círculo exclusivo, "elite". |
| 13 | `#FFFBEB` | `#0F172A` | `#D97706` | `#FFFFFF` | `#059669` | `#FFFFFF` | `#64748B` | `#FAEEE1` | `#DC2626` | **Infoproduto quente / quick win** — âmbar de streak + verde. Método rápido, hack, "em 7 dias". |
| 14 | `#FFF7ED` | `#0F172A` | `#EA580C` | `#FFFFFF` | `#16A34A` | `#FFFFFF` | `#64748B` | `#FCEAE1` | `#DC2626` | **Infoproduto de massa (laranja)** — laranja apetitoso + verde. Receita, emagrecimento, renda extra. |
| 15 | `#FAF5FF` | `#0F172A` | `#7C3AED` | `#FFFFFF` | `#059669` | `#FFFFFF` | `#64748B` | `#EFE7FC` | `#DC2626` | **Saúde / bem-estar** — lavanda calma + verde de saúde. Terapia, sono, ansiedade, autocuidado. |
| 16 | `#ECFEFF` | `#164E63` | `#0891B2` | `#FFFFFF` | `#16A34A` | `#FFFFFF` | `#64748B` | `#A5F3FC` | `#DC2626` | **Saúde clínica / médico** — ciano clínico + verde de saúde. Clínica, profissional de saúde, tratamento. |
| 17 | `#1F2937` | `#F8FAFC` | `#F97316` | `#0F172A` | `#22C55E` | `#313742` | `#94A3B8` | `#374151` | `#EF4444` | **Fitness / academia** — laranja de energia + verde de sucesso sobre escuro. Treino, hipertrofia, desafio. |
| 18 | `#0F172A` | `#FFFFFF` | `#EA580C` | `#FFFFFF` | `#22C55E` | `#201C27` | `#94A3B8` | `#262d3a` | `#EF4444` | **Fitness agressivo (escuro)** — laranja em fundo quase-preto + verde no CTA. Projeto verão, "transformação". |
| 19 | `#EFF6FF` | `#1E3A8A` | `#1E40AF` | `#FFFFFF` | `#EA580C` | `#FFFFFF` | `#64748B` | `#BFDBFE` | `#DC2626` | **Serviço local / autônomo** — azul profissional + laranja de urgência. Encanador, dentista, advogado, agência. |
| 20 | `#F8FAFC` | `#020617` | `#0F172A` | `#FFFFFF` | `#0369A1` | `#FFFFFF` | `#64748B` | `#E2E8F0` | `#DC2626` | **Serviço de autoridade / B2B** — navy sóbrio + azul de CTA. Consultoria, jurídico, contabilidade. |
| 21 | `#FAF5FF` | `#4C1D95` | `#7C3AED` | `#FFFFFF` | `#A16207` | `#FFFFFF` | `#64748B` | `#EDE9FE` | `#DC2626` | **Espiritualidade / autoconhecimento** — roxo místico + dourado morno. Tarô, terapia espiritual, propósito. |
| 22 | `#1E1B4B` | `#F8FAFC` | `#7C3AED` | `#FFFFFF` | `#F59E0B` | `#27273B` | `#A78BFA` | `#4338CA` | `#EF4444` | **Espiritualidade (escuro/ritual)** — índigo profundo + dourado. Imersão, ritual, "despertar". |
| 23 | `#FDF2F8` | `#831843` | `#EC4899` | `#FFFFFF` | `#8B5CF6` | `#FFFFFF` | `#64748B` | `#FBCFE8` | `#DC2626` | **Beleza / estética / spa** — rosa suave + lavanda. Procedimento estético, skincare, salão. |
| 24 | `#FDF2F8` | `#0F172A` | `#BE185D` | `#FFFFFF` | `#D97706` | `#FFFFFF` | `#64748B` | `#FBF1F5` | `#DC2626` | **Moda / e-commerce feminino** — rosa fashion + dourado. Loja de roupa, acessório, cápsula. |
| 25 | `#FEF2F2` | `#450A0A` | `#DC2626` | `#FFFFFF` | `#A16207` | `#FFFFFF` | `#64748B` | `#FECACA` | `#DC2626` | **Comida / restaurante / delivery** — vermelho apetite + dourado. Cardápio, franquia de alimentação, evento. |
| 26 | `#FFFBEB` | `#0F172A` | `#92400E` | `#FFFFFF` | `#D97706` | `#FFFFFF` | `#64748B` | `#F8F3F0` | `#DC2626` | **Artesanal / produto físico premium** — marrom + âmbar de mel. Cafeteria, produto craft, marca de origem. |
| 27 | `#FFFFFF` | `#171717` | `#171717` | `#FFFFFF` | `#A16207` | `#FAFAFA` | `#64748B` | `#E5E5E5` | `#DC2626` | **Arquitetura / decoração / imóvel** — preto mínimo + dourado. Imobiliária de alto padrão, projeto, interiores. |
| 28 | `#F0FDFA` | `#134E4A` | `#0F766E` | `#FFFFFF` | `#0369A1` | `#FFFFFF` | `#64748B` | `#99F6E4` | `#DC2626` | **Imóveis / financiamento** — teal de confiança + azul. Lançamento imobiliário, consórcio, "casa própria". |
| 29 | `#F0F9FF` | `#0C4A6E` | `#0369A1` | `#FFFFFF` | `#A16207` | `#FFFFFF` | `#64748B` | `#BAE6FD` | `#DC2626` | **Certificação / credencial** — azul de confiança + ouro de conquista. Certificado, formação reconhecida, selo. |
| 30 | `#18181B` | `#FAFAFA` | `#FAFAFA` | `#18181B` | `#EC4899` | `#27272A` | `#A1A1AA` | `#3F3F46` | `#EF4444` | **Criador / portfólio que vende** — preto editorial + rosa de destaque. Influencer, agência criativa, marca pessoal. |
| 31 | `#020617` | `#F8FAFC` | `#22C55E` | `#0F172A` | `#22C55E` | `#0E1223` | `#94A3B8` | `#1A1E2F` | `#EF4444` | **Tech / bootcamp / dev** — terminal escuro + verde de "rodou". Curso de programação, dado, IA, automação. |
| 32 | `#FEF2F2` | `#450A0A` | `#DC2626` | `#FFFFFF` | `#1E40AF` | `#FFFFFF` | `#64748B` | `#FECACA` | `#DC2626` | **Notícia / "breaking" / oferta-relâmpago** — vermelho de alerta + azul. Página de urgência pura, "última chamada". |
| 33 | `#0A0E27` | `#E0E7FF` | `#0080FF` | `#FFFFFF` | `#39FF14` | `#121633` | `#94A3B8` | `#1E293B` | `#EF4444` | **Lançamento futurista / IA / gadget** — azul elétrico + verde neon sobre midnight. Produto novo, hype, "o futuro chegou". |
| 34 | `#0F172A` | `#F8FAFC` | `#DC2626` | `#FFFFFF` | `#FBBF24` | `#192134` | `#94A3B8` | `#1f1829` | `#EF4444` | **Evento / live / desafio com prazo** — vermelho de placar + dourado. Semana, live, masterclass com data. |
| 35 | `#FFFBEB` | `#0F172A` | `#78716C` | `#FFFFFF` | `#D97706` | `#FFFFFF` | `#64748B` | `#EEEDED` | `#DC2626` | **Editorial morno / produto de leitura** — tinta quente + âmbar. Newsletter paga, clube de livro, escrita. |
| 36 | `#F5F5F0` | `#0F172A` | `#6B7280` | `#FFFFFF` | `#0891B2` | `#FFFFFF` | `#64748B` | `#EDEEEF` | `#DC2626` | **Yoga / meditação / calma** — sálvia neutra + teal sereno. Prática suave, retiro, respiração. |
| 37 | `#F0FDF4` | `#14532D` | `#15803D` | `#FFFFFF` | `#A16207` | `#FFFFFF` | `#64748B` | `#BBF7D0` | `#DC2626` | **Natural / sustentável / agro** — verde terra + ouro de colheita. Produto natural, suplemento, agro. |
| 38 | `#FFF1F2` | `#0F172A` | `#E11D48` | `#FFFFFF` | `#EA580C` | `#FFFFFF` | `#64748B` | `#FECDD3` | `#DC2626` | **Relacionamento / paixão / nicho feminino** — rosa romântico + laranja morno. Reconquista, autoestima, encontro. |

---

## Paletas da casa (BrandsDecoded)

São o ponto de partida quando a campanha é da casa ou quando você quer herdar a identidade. O coral protagonista (`#e8421a`, com liberdade na família coral/laranja-queimado) é constante nas três.

### Casa 1 — Lançamento escuro + coral (padrão de urgência)

O default de lançamento agressivo. Fundo quase-preto, coral nas manchetes e destaques, verde de alto contraste no botão. É o swipe de referência da casa.

| fundo | texto | primária | sobre-prim. | acento/CTA | card | muted | borda | destrutiva |
|-------|-------|----------|-------------|------------|------|-------|-------|------------|
| `#0f0d0c` | `#ffffff` | `#e8421a` | `#ffffff` | `#16a34a` | `rgba(255,255,255,.04)` | `rgba(255,255,255,.62)` | `rgba(255,255,255,.10)` | `#ef4444` |

```css
:root{
  --bg:#0f0d0c;
  --ink:#ffffff;
  --ink-soft:rgba(255,255,255,.62);   /* muted */
  --brand:#e8421a;                     /* coral protagonista */
  --on-brand:#ffffff;
  --cta:#16a34a;                       /* botão alto contraste */
  --card:rgba(255,255,255,.04);
  --border:rgba(255,255,255,.10);
  --destructive:#ef4444;
}
```

**Melhor pra / mood:** lançamento agressivo, urgência real, oferta com prazo, infoproduto quente. Energia, pressão, "agora ou nunca". Confira que o coral nunca vira cor de botão aqui — o botão é o verde, o coral é a manchete.

### Casa 2 — Lançamento escuro + coral no CTA (variante mono-coral)

Quando você quer o coral também como botão, sem o verde. Mais coeso visualmente, um pouco menos gritante que a versão com verde. Útil quando a marca tem que dominar a página.

| fundo | texto | primária | sobre-prim. | acento/CTA | card | muted | borda | destrutiva |
|-------|-------|----------|-------------|------------|------|-------|-------|------------|
| `#0f0d0c` | `#ffffff` | `#e8421a` | `#ffffff` | `#e8421a` | `rgba(255,255,255,.04)` | `rgba(255,255,255,.62)` | `rgba(255,255,255,.10)` | `#ef4444` |

```css
:root{
  --bg:#0f0d0c;
  --ink:#ffffff;
  --ink-soft:rgba(255,255,255,.62);
  --brand:#e8421a;
  --on-brand:#ffffff;
  --cta:#e8421a;                       /* coral também no botão */
  --card:rgba(255,255,255,.04);
  --border:rgba(255,255,255,.10);
  --destructive:#ef4444;
}
```

**Melhor pra / mood:** marca pessoal forte, página em que o coral É a identidade, oferta sóbria mas com energia. Se o teste mostrar que o botão coral perde pro verde, volte pra Casa 1.

### Casa 3 — Creme editorial + coral (refinamento)

A variação clara e sofisticada da casa. Fundo creme deliberado (não o bege amarelado preguiçoso que a IA cospe), coral por cima nas manchetes e no botão, texto quase-preto. Serve quando a campanha pede refinamento em vez de pressão.

| fundo | texto | primária | sobre-prim. | acento/CTA | card | muted | borda | destrutiva |
|-------|-------|----------|-------------|------------|------|-------|-------|------------|
| `#f4ede4` | `#1a1614` | `#e8421a` | `#ffffff` | `#e8421a` | `#ffffff` | `#6b5f56` | `#e0d6c9` | `#dc2626` |

```css
:root{
  --bg:#f4ede4;                        /* creme deliberado */
  --ink:#1a1614;
  --ink-soft:#6b5f56;                  /* muted — confira 4.5:1 se for leitura */
  --brand:#e8421a;
  --on-brand:#ffffff;
  --cta:#e8421a;
  --card:#ffffff;
  --border:#e0d6c9;
  --destructive:#dc2626;
}
```

**Melhor pra / mood:** infoproduto editorial, mentoria sofisticada, marca de autoridade que não quer cara de "lançamento gritado". Combina muito com título serifado (Instrument Serif). Atenção: o muted `#6b5f56` sobre o creme passa folgado pra leitura; se clarear mais, quebra o 4,5:1.

---

## Como montar uma paleta de DR do zero

Quando nenhuma linha da tabela encaixa, monte a sua seguindo esta ordem. São poucas decisões, e elas resolvem 90% dos casos.

1. **Decida o modo primeiro: escuro ou claro.**
   - **Escuro** (fundo `#0f...` a `#020...`) quando a campanha vive de **urgência, energia, lançamento, prazo**. O fundo escuro dá peso e faz o coral/CTA saltar. É o padrão que mais converte em tráfego pago de infoproduto quente.
   - **Claro/creme** quando a campanha vive de **confiança, sofisticação, autoridade, calma**. Saúde, finanças conservadoras, luxo, editorial.

2. **Escolha a primária (cor de marca) pelo nicho.** Ela carrega o clima: azul/navy = confiança e dinheiro; verde = saúde, aprovação, natureza; roxo = autoridade, mentoria, espiritualidade; vermelho/laranja = apetite, urgência, energia; preto/dourado = luxo. Se for campanha da casa, a primária é o coral `#e8421a`.

3. **Defina UMA cor de CTA que destaca de tudo.** Esta é a regra que mais move a agulha. O botão tem que ser a cor de **maior contraste e maior saturação** da página, e não pode se repetir em nada decorativo. Truque clássico: se a marca é azul, o CTA é laranja; se a marca é laranja/coral, o CTA é verde. Verde de alto contraste (`#16a34a`, `#22C55E`) é o CTA universal de DR brasileiro porque grita "avançar/comprar" sem brigar com quase nenhuma marca. Está liberado sempre que aumenta conversão.

4. **Trave o contraste de leitura em 4,5:1.** Texto de corpo sobre o fundo: branco (ou quase, `#FAFAFA`/`#E0E0E0`) em fundo escuro; quase-preto (`#0F172A`/`#171717`) em fundo claro. Nunca cinza-médio em fundo claro pra "ficar elegante" — isso só cansa o leitor e derruba a leitura. O muted (texto secundário) pode ser mais suave, mas se for texto que a pessoa precisa ler de fato, ele também tem que passar 4,5:1.

5. **Reserve o vermelho destrutivo só pra alerta real.** Erro de formulário, "vagas acabando", aviso. Se o vermelho aparece em tudo, ele para de significar urgência. Mantenha-o separado da cor de CTA (a menos que a oferta inteira seja "alerta", como página de oferta-relâmpago).

6. **Regra dos 60-30-10 adaptada pra DR.** Fundo + texto dominam (60-70%), a primária da marca aparece em manchetes e destaques (20-30%), o CTA ocupa pouquíssimo espaço (≤10%) mas com o máximo de contraste. Quanto mais escassa a cor do botão, mais ele puxa o olho.
