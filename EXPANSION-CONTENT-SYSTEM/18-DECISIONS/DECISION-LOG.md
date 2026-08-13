# DECISION LOG — Expansion Brand & Content OS
**Documento vivo.** Toda decisão relevante do projeto entra aqui com data, contexto, evidências, alternativas, motivo, responsável e status. Decisões pendentes usam prefixo `DEC-PEND` e viram `DEC-NNN` quando resolvidas. Nada de escolha silenciosa: conflito identificado é conflito registrado.

---

## DECISÕES TOMADAS

### DEC-001 · Classificação dos inputs recebidos
- **Data:** 13/08/2026
- **Decisão:** Tratar o Relatório Cerberus como INPUT A (concorrente direto) e o Relatório Alpha como INPUT B (Benchmark 01), provisoriamente.
- **Contexto:** O briefing previa 3 inputs; chegaram 2, ambos em formato de relatório de inteligência competitiva.
- **Motivo:** A Cerberus atua exatamente no nicho-alvo decidido pela Expansion (lojas de moda — `EXPANSION-360` §11); a Alpha atua em gastronomia e já era referência estudada internamente.
- **Evidências:** `EXPANSION-360-2026-07-26.md` §5, §11; `OPERACAO-REAL-EXPANSION-2026-07-26.md` §4.
- **Alternativas:** Tratar ambos como benchmarks e aguardar um INPUT A bruto (perfil de Instagram).
- **Responsável:** Claude (provisório) — **confirmação do Nicolas pendente em DEC-PEND-04.**
- **Status:** Ativa, revisável.

### DEC-003 · Modelar somente Cerberus e Alpha — não haverá INPUT C
- **Data:** 13/08/2026
- **Decisão:** O escopo de modelagem fica fechado nos dois relatórios recebidos (Cerberus e Alpha). Não haverá Benchmark 02.
- **Contexto:** O briefing original previa 3 inputs; o Nicolas definiu em 13/08: *"vamos modelar somente esses dois, a Cerberus e a Alpha"*.
- **Consequências:** (1) fecha DEC-PEND-04; (2) a coluna "Benchmark 02" da matriz comparativa deixa de existir — o PARECER de 13/08 permanece como está por ser documento datado (convenção do repo: sem edição destrutiva), e a `MODELAGEM-CERBERUS-ALPHA-2026-08-13.md` passa a ser a referência vigente; (3) a distinção INPUT A × INPUT B perde importância prática — os dois players são modelados por inteiro; a Cerberus mantém o rótulo de concorrente direto pela sobreposição de nicho (moda).
- **Responsável:** Nicolas.
- **Status:** Ativa.

### DEC-002 · Estrutura mínima de arquivos
- **Data:** 13/08/2026
- **Decisão:** Criar apenas as pastas com conteúdo real nesta fase (`01-RESEARCH`, `02-COMPETITIVE-INTELLIGENCE`, `18-DECISIONS` + diagnóstico na raiz), seguindo a numeração do briefing §29. As demais pastas nascem quando a fase correspondente produzir conteúdo.
- **Motivo:** Briefing §29: "não crie arquivos apenas por criar". Pastas vazias são promessa, não sistema.
- **Responsável:** Claude.
- **Status:** Ativa.

---

## DECISÕES PENDENTES (travam fases seguintes)

### DEC-PEND-01 · Qual marca este projeto posiciona — o conflito dos três vetores
- **O conflito:** existem três direções de marca simultâneas e não conciliadas:
  1. **Expansion institucional / nicho moda** — "a maior assessoria de marketing para loja de roupa do Brasil" (`EXPANSION-360` §11);
  2. **Marca pessoal do Nicolas** — "o maior ecossistema empresarial de multiplicação de talentos e gestão do Brasil", com "marketing" **vetado** da promessa e foco comercial em consultoria (`POSICIONAMENTO-CONTEUDO-NICOLAS` §1, §6);
  3. **Expansion como operadora de conteúdo de luxo B2B** para a rede WebLuxury (cluster `PLATAFORMA-WEBLUXURY-*`), com travas contratuais próprias.
- **Por que trava:** founder-led content (briefing §13) é impossível de desenhar sem saber qual narrativa o rosto do Nicolas carrega no perfil da Expansion — a pessoal fala de gestão/pessoas e *não pode falar "marketing"*; a institucional vende exatamente marketing para lojistas. Sem resolver, cada conteúdo do founder puxa a marca para um lado.
- **Alternativas mapeadas:** (a) perfis separados com papéis definidos (Expansion = marca-mãe nichada; Nicolas = autoridade pessoal que empresta credibilidade pontual); (b) fundir narrativas ("o ecossistema" como guarda-chuva); (c) sequenciar (Expansion agora, pessoal depois).
- **Decisor:** Nicolas.
- **Status:** ⏳ Aberta — **bloqueia FASE 05 (Posicionamento) e §13 (Founder-led).**

### DEC-PEND-02 · Radicalidade do nicho — os 4 clientes fora de moda
- **O conflito:** dos 6 clientes ativos, 4 (Prime, Fórum TEIA, Albanos ×2) estão fora do nicho moda. O próprio `360` §14 registra a decisão em aberto: caixa que financia a transição ou âncora que impede o nicho?
- **Por que trava:** define se o perfil público pode ser 100% "língua de lojista de moda" (princípio da especialização radical) ou precisa acomodar prova social de outros nichos.
- **Decisor:** Nicolas + Kauã.
- **Status:** ⏳ Aberta — **bloqueia FASE 05 e a arquitetura do feed (§18).**

### DEC-PEND-03 · Identidade visual — o problema do laranja
- **O conflito:** a paleta da casa codificada na skill `roteiro-expansion` é laranja (#E67E22). O concorrente direto (Cerberus) tem identidade **laranja/preto saturada** como ativo central de marca no mesmo nicho — e o relatório aponta essa estética agressiva como *fraqueza* dela junto ao público feminino (Gap 01).
- **Por que trava:** manter o laranja aproxima a Expansion visualmente do concorrente e do posicionamento "pit bull de tráfego" que queremos contra-atacar; trocar tem custo de consistência com material já produzido.
- **Alternativas mapeadas:** (a) manter laranja com linguagem visual radicalmente diferente (sofisticação, fotografia, tipografia editorial de moda); (b) evoluir a paleta; (c) paleta por contexto (institucional × conteúdo).
- **Decisor:** Nicolas.
- **Status:** ⏳ Aberta — **bloqueia FASE 08 (Creative System / §17 Visual).**

### ~~DEC-PEND-04 · INPUT C e confirmação da classificação~~ → RESOLVIDA
- **Resolução:** 13/08/2026, pelo Nicolas — ver **DEC-003**. Não haverá INPUT C; modelagem fechada em Cerberus e Alpha.

### DEC-PEND-05 · O produto do território "atendimento" (VENDEMOS × OVERDELIVERY)
- **O conflito:** o whitespace mais promissor identificado (H2 — conteúdo → conversa → venda → recompra) depende de a Expansion estruturar a oferta de CRM/atendimento que ela mesma identificou. A enquete interna "VENDEMOS × OVERDELIVERY" (13/07) teve zero votos e nunca foi decidida (`OPERACAO-REAL` §11).
- **Por que trava:** posicionar publicamente um território que a operação não entrega repetiria o erro da promessa-milagre dos concorrentes.
- **Decisor:** Nicolas + Kauã.
- **Status:** ⏳ Aberta — **bloqueia a promessa pública do território H2** (a construção interna pode começar antes).
