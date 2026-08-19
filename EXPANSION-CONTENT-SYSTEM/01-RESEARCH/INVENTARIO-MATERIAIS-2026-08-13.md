# INVENTÁRIO DE MATERIAIS — FASE 01
**Projeto:** Expansion Brand & Content Operating System
**Data:** 13/08/2026

Levantamento de tudo que existe no repositório e dos inputs externos recebidos, com classificação de relevância para o sistema de posicionamento e conteúdo. Regra do briefing §35: não começar do zero — este inventário diz o que já existe, o que se aproveita e o que falta.

---

## 1. INPUTS EXTERNOS DO BRIEFING

| Input | Previsto | Recebido | Arquivo |
|---|---|---|---|
| A — Concorrente direto | Perfil de Instagram de concorrente | ✅ 13/08 — **Relatório Cerberus** (assessoria nichada em **lojas de moda** — o nicho-alvo da Expansion; por isso classificado como concorrente direto) | `../02-COMPETITIVE-INTELLIGENCE/` |
| B — Benchmark 01 | Relatório de outra assessoria | ✅ 13/08 — **Relatório Alpha** (restaurantes; líder de categoria; já estudada internamente pela Expansion) | `../02-COMPETITIVE-INTELLIGENCE/` |
| C — Benchmark 02 | Segundo relatório | ❌ **Não recebido** | — |

**Nota de classificação [HIPÓTESE]:** o briefing previa o INPUT A como "perfil de Instagram" bruto; o que chegou foram dois relatórios prontos de engenharia reversa. A atribuição Cerberus=A (concorrente) e Alpha=B (benchmark) é interpretação minha pelo critério de nicho — a Cerberus disputa exatamente o nicho de moda decidido pela Expansion; a Alpha atua em gastronomia. **Confirmar com o Nicolas** (registrado como DEC-PEND-04 no Decision Log).

## 2. MATERIAL INTERNO — núcleo da Expansion (alta relevância)

| Arquivo | O que é | Uso neste projeto |
|---|---|---|
| `EXPANSION-360-2026-07-26.md` | Raio-X ditado pelo Nicolas: origem, sócios, time, serviços, carteira, números, dores, objetivo ("maior assessoria de marketing para loja de roupa do Brasil") | **Fonte primária de posicionamento.** Narrativa fundadora, promessa atual ("conteúdo que converte"), decisão de nicho, pedidos explícitos do CEO |
| `OPERACAO-REAL-EXPANSION-2026-07-26.md` | 4.321 mensagens de WhatsApp analisadas; corrige o 360 | **Fonte de verdade operacional.** Playbook Alpha já extraído (§4), achado Ciés/atendimento (§11), capacidade real de produção (§3, §6), risco de promessa vs entrega (§10) |
| `CONSELHO-EXPANSION-2026-07-13.md` | Deliberação de conselho simulado: gestão, ferramenta, presencial + parecer psicológico | **Restrições vinculantes**: ticket R$5–6k, founder fora da entrega, 6 indicadores, proibições de 6 meses. Perfil do founder (oral > escrita → sistema de produção de conteúdo por áudio) |
| `POSICIONAMENTO-CONTEUDO-NICOLAS-2026-07-17.md` | Sessão com Gabriel (Politize): posicionamento PESSOAL do Nicolas, regras de copy, roteiros aprovados, banco de 30+ temas | **Ativo transplantável** (regras de copy, método de gravação, banco de temas) — mas o posicionamento é o da marca pessoal (gestão/pessoas/ecossistema, sem "marketing"), **não** o da Expansion. Gera o conflito DEC-PEND-01 |
| `POP-SOCIAL-MEDIA-v0.1.md` | POP da função social media (v0.1, com pendências) | Base do futuro workflow operacional de conteúdo (briefing §26) |
| `_audios/transcricao-360-*.txt` · `transcricoes-audios-whatsapp-*.md` | Transcrições brutas | Evidência de suporte; já digeridas nos documentos acima |
| `AUDITORIA-DRIVE-EXPANSION-2026-07-26.md` | Auditoria da migração do Drive | Contexto de acervo; baixa relevância direta |

## 3. MATERIAL INTERNO — cluster WebLuxury (relevância lateral, mas com decisões vinculantes)

Sete arquivos `PLATAFORMA-WEBLUXURY-*`. Síntese do que afeta este projeto (varredura completa feita em 13/08):

- WebLuxury é **marca do Cleber** (27 anos, mercado de luxo); a plataforma é uma NewCo ainda não constituída. A Expansion é **fornecedora de mídia/produção** — e, na operação, aparece como *cliente* de fluxo esporádico. Conflito de interesse registrado em ata ("Nicolas é sócio da plataforma e dono da agência que fatura contra ela").
- Decisões que restringem a comunicação da Expansion no contexto WebLuxury: Expansion fatura desde a Fase 0 (nunca equity verbal); teto de margem intragrupo; não-solicitação de 24 meses (membros da rede não contratam a agência direto); ativos de conteúdo ficam na NewCo; o rosto da WebLuxury é o Cleber.
- **Insight transferível:** diagnóstico do conselho sobre o mercado de agências — *"o mercado tem quem poste e não tem quem grave"* (agências entregam calendário e legenda mas nunca entram na loja para gravar). A Expansion **tem filmakers e grava** — candidato a diferencial real na comunicação do nicho moda. [HIPÓTESE a validar como H3-bis]
- Terceiro vetor de marca: além de (a) Expansion/moda e (b) Nicolas/gestão-consultoria, existe (c) Expansion como operadora de conteúdo de luxo B2B. Ver DEC-PEND-01.

## 4. ATIVOS DE CONTA (skills sincronizadas — fora do repo)

| Skill | Relevância |
|---|---|
| `roteiro-expansion` | **Alta.** Padrão visual da casa já codificado: framework TACO(H) (GANCHO/CONTEXTO/ARGUMENTO/CTA cronometrados), paleta laranja #E67E22, regras editoriais por cliente (Albanos, Prime, Ciés, Clau Kids, Dr. Fred) |
| `feed-perfeito` | Média. Briefing de feed para agências nichadas (posts genéricos + depoimentos fixados + caixinhas) — mecânica aproveitável na arquitetura de feed (briefing §18) |
| `analise-onboarding`, `detalhamento-mql`, `pre-call-pesquisa-desktop` | Baixa direta; úteis na ponta comercial do flywheel |

## 5. AEOS

Sistema normativo de engenharia de produto (12 volumes). Aplicação aqui: disciplina de portões (não entregar redesenho antes do diagnóstico fechar — Art. 30 análogo), confiança por tipo de entrega (Art. 24) e papéis como perspectivas de análise com poder de veto (regra de origem). Este projeto adota o espírito: **diagnóstico fecha antes de estratégia; hipótese nunca vira verdade sem teste.**

## 6. O QUE NÃO EXISTE (lacunas)

1. **Auditoria do Instagram atual da Expansion** — handle, bio, seguidores, grade, destaques, métricas. É o "EXPANSION" da matriz comparativa e não há uma linha sobre ele em nenhum documento. **Lacuna nº 1 do projeto.**
2. **INPUT C** (Benchmark 02).
3. **Onboardings de Ciés e Clau Kids** — prometidos no `360` §14, nunca enviados.
4. Métricas de perfis de clientes (prova do que a Expansion já sabe fazer).
5. Identidade visual formal da Expansion (logo, tipografia, paleta oficial — o laranja da skill é a única referência codificada).
6. Números de operação para dimensionar cadência sustentável de produção do próprio perfil.
