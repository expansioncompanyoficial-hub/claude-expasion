# Mapa de integração — geração de fundo de capa

Auditoria do sistema atual, ponto exato onde a geração de capa entra, e o que
foi reaproveitado, criado e deixado em paz. Escrito antes da implementação e
atualizado com o que a implementação encontrou.

---

## 1. O que existe, de verdade

A primeira coisa que a auditoria devolveu contraria a premissa do pedido: **não
existe "o sistema" no sentido de aplicação.** Não há rotas, banco em uso,
componentes, filas, jobs, lint, typecheck nem build. Existe um repositório de
documentos com três peças de software dentro:

| Peça | O que é | Estado |
|---|---|---|
| `.claude/skills/carrossel-viral/scripts/render_carrossel.py` | Renderizador. Spec JSON → HTML 1080×1350 | Em uso |
| `.claude/skills/carrossel-viral/scripts/export_png.py` | HTML → PNG via Chromium, com verificação de fonte por medição | Em uso |
| `ESTUDIO/prototipo.src.html` | O Estúdio: aplicação de arquivo único, roda no navegador, guarda o estado dentro da própria página | Em uso |
| `SERVICO/app.py` | Serviço `http.server` da biblioteca padrão: render e portal de aprovação | Escrito, sobe, pouco usado |
| `SERVICO/migracoes/001-inicial.sql` | Esquema Postgres (8 tabelas) | **Modelado, nunca aplicado** |

Consequências diretas para esta integração, e nenhuma delas é opinião:

- **"Execute os testes atuais" não tinha o que executar.** `package.json` tem
  três dependências, todas de fonte. Não havia um teste no repositório. A
  suíte criada aqui (`tests/`) é a primeira.
- **"Use o banco atual" não tem banco.** O esquema existe no arquivo; o
  Supabase não está autorizado nesta conta. O serviço grava em disco por trás
  da classe `Deposito`, que é a costura para trocar. A memória de capa segue a
  mesma decisão e o mesmo formato — quando o banco entrar, vira duas queries.
- **"Use a arquitetura de jobs e filas" não existe.** O job de capa é um JSON
  com máquina de estados, no mesmo diretório das peças.
- **Não há lint nem typecheck configurados.** `python3 -m py_compile` e a
  suíte de testes são o que existe, e é o que roda.

## 2. Onde cada coisa acontece hoje

| Etapa | Onde | Entrada → saída |
|---|---|---|
| Cliente é selecionado | Estúdio, lista `CLIENTES` · `capas/marca.py` no lado Python | id → ficha resolvida |
| Identidade é carregada | `CLIENTES/<X>/FICHA-CARROSSEL-<X>.md` | markdown → tokens, fontes, CTA |
| Conteúdo é gerado | Skill `carrossel-viral`, fora do código | tema → 18 blocos |
| Headline é aprovada | Estúdio, etapa Carrossel | bloco 1 |
| Capa é renderizada | `render_carrossel.py` · `slide_capa` | spec → HTML |
| Imagem entra na capa | `spec.slides[0].foto_fundo` | caminho → `background-image` |
| PNG é exportado | `export_png.py` | HTML → `CARROSSEIS/<peça>/png/` |
| Histórico é salvo | `CARROSSEIS/<peça>/` + estado do Estúdio | — |

## 3. O fluxo novo, e onde ele encaixa

```
cliente e identidade  →  conteúdo completo  →  headline aprovada
        │
        ▼
  ╭──────────────── entra aqui ────────────────╮
  │ leitura do carrossel INTEIRO               │  estrategia.contexto
  │ três conceitos visuais distintos           │  estrategia.valida_conceitos
  │ padrão visual, com cooldown                │  padroes.diagnostico
  │ prompt técnico + negative prompt           │  prompt.compoe
  │ orçamento                                  │  provedor.orcamento
  │ geração (ou imagem manual, ou briefing)    │  provedor.escolhe
  │ corte ancorado no foco e na faixa do texto │  imagem.enquadra
  │ QA técnico automático + QA semântico aberto│  qa.avalia
  │ seleção, aprovação, registro               │  memoria + fluxo
  ╰────────────────────┬───────────────────────╯
                       ▼
     spec.slides[0].foto_fundo  ←  compoe.aplica
                       ▼
   composição da capa final (renderizador que já existe)
                       ▼
        demais slides  →  exportação  →  CARROSSEIS/
```

**O ponto de integração é uma linha:** `compoe.aplica` escreve
`spec.slides[0].foto_fundo`. Nada do renderizador mudou.

## 4. Arquivos

**Criados** — todos sob `.claude/skills/carrossel-viral/scripts/capas/`, que é
onde o renderizador já mora:

| Arquivo | Responsabilidade do pedido |
|---|---|
| `raiz.py` | descoberta de raiz, fim dos caminhos absolutos (5.1, 5.5) |
| `esquema.py` | schema de entrada e de saída, com os seis defeitos corrigidos (5.3, 5.4) |
| `marca.py` | Brand Resolver (7.1) |
| `estrategia.py` | Cover Strategist (7.2, 8, 9) |
| `padroes.py` | Pattern Selector, cooldown (7.3) |
| `prompt.py` | Prompt Composer (7.4) |
| `provedor.py` | Image Provider Adapter (7.5) |
| `imagem.py` | Image Processor (7.6) |
| `qa.py` | Visual QA, técnico e semântico separados (7.7) |
| `compoe.py` | ponte para o Cover Composer que já existia (7.8) |
| `memoria.py` | memória de aprovação e máquina de estados (14) |
| `fluxo.py` | orquestração, orçamento, tetos (17) |
| `tests/test_capas.py` | 61 testes (23) |

**Reaproveitado sem tocar:** `render_carrossel.py`, `export_png.py`,
`ESTUDIO/prototipo.src.html`, `SERVICO/app.py`, as fichas de cliente, o
esquema SQL.

**Não alterado de propósito:** o contrato de 18 blocos, a grade medida do
template 01, o pipeline de exportação. Mexer neles era risco sem ganho.

## 5. O que não deu para fazer, e por quê

| Item | Situação |
|---|---|
| Biblioteca P01–P10 / O1–O5 | **O ZIP `capas-os-COMPLETO.zip` não chegou no container.** `padroes.py` está escrito para carregá-la de `.claude/skills/carrossel-viral/referencias-capa/` e declara a ausência como limitação, em vez de inventar taxonomia |
| Análises de `@brandsdecoded__` e `@assessorialpha` | idem — vinham no ZIP |
| Correção do teste 32/33 do pacote | o teste está no ZIP. O equivalente na implementação nova (`provedor manual sem arquivo`) tem teste de regressão |
| Geração automática de imagem | nenhum provedor conectado nesta conta. Ver `docs/cover-generation.md` |
| Etapa "Direção visual da capa" no Estúdio | não implementada nesta rodada — a etapa mostraria um botão de gerar sem gerador atrás |
