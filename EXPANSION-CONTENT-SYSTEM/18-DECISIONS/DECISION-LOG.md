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

### DEC-006 · Posicionamento 100% no nicho moda — clientes fora do nicho não entram na marca pública
- **Data:** 13/08/2026
- **Decisão:** O posicionamento da Expansion é construído integralmente para o nicho de moda/vestuário feminino. Os clientes fora do nicho (Prime, Fórum TEIA, Albanos ×2, Dr. Fred e demais) **não entram** na comunicação pública — nem como prova social, nem como estudo de caso, nem na arquitetura do perfil.
- **Contexto:** Definido pelo Nicolas em 13/08: *"pode seguir com o posicionamento sem envolver os outros clientes fora do nicho"*.
- **Consequências:** (1) **fecha DEC-PEND-02** para efeitos de marca: os clientes legados são caixa de transição, atendidos normalmente, mas invisíveis no posicionamento público; (2) a especialização radical (princípio nº 1 do playbook modelado) pode ser aplicada sem diluição — todo o perfil fala a língua da lojista de moda; (3) o banco de provas públicas nasce de Ciés Brand e Clau Kids (e futuros clientes do nicho), o que **aumenta a urgência da prova auditável**: são hoje 2 contas para sustentar toda a prova social da marca; (4) a gestão comercial da carteira legada segue como assunto interno, fora deste projeto.
- **Responsável:** Nicolas.
- **Status:** Ativa.

### DEC-005 · O posicionamento é da marca institucional Expansion — marca pessoal desvinculada
- **Data:** 13/08/2026
- **Decisão:** Este projeto posiciona a **Expansion Company como marca institucional**. O posicionamento não se vincula à marca pessoal do Nicolas.
- **Contexto:** Definido pelo Nicolas em 13/08: *"Vamos formar um posicionamento para a Expansion, não precisa vincular à marca pessoal porque tenho mais um sócio. Depois fazemos isso."*
- **Motivo:** A empresa tem dois sócios fundadores (Nicolas + Kauã); construir a marca da empresa sobre a persona de um só criaria dependência e desequilíbrio. O projeto de marca pessoal (sessão com Gabriel) segue existindo como trilha separada e futura.
- **Consequências:** (1) **fecha DEC-PEND-01**; (2) o rosto no conteúdo institucional pode incluir os dois sócios e o time, sem carregar a narrativa do ecossistema pessoal; (3) as **regras de copy** da sessão com Gabriel (gerúndio, autoafirmação, anti-guru, dor com especificidade) continuam transplantáveis como técnica — o que não se transplanta é a promessa narrativa pessoal ("ecossistema de multiplicação de talentos") nem o veto à palavra "marketing", que era específico daquele perfil; (4) founder-led content (briefing §13) será desenhado a serviço da marca Expansion, não o contrário.
- **Responsável:** Nicolas.
- **Status:** Ativa.

### DEC-004 · WebLuxury fora do escopo deste projeto
- **Data:** 13/08/2026
- **Decisão:** O cluster WebLuxury não entra no sistema de posicionamento e conteúdo da Expansion. Nada dos documentos `PLATAFORMA-WEBLUXURY-*` precisa ser considerado neste projeto.
- **Contexto:** Definido pelo Nicolas em 13/08: *"não precisa ver nada da WebLuxury"*.
- **Consequências:** (1) DEC-PEND-01 se reduz de três vetores para **dois**: marca institucional Expansion/moda × marca pessoal do Nicolas; (2) as travas contratuais do cluster WebLuxury deixam de ser restrições deste projeto; (3) o insight de mercado "o mercado tem quem poste e não tem quem grave" (H3-bis do Diagnostic), que nasceu naquele cluster, só permanece se se sustentar por mérito próprio como hipótese sobre o nicho moda — a validar na FASE 05, sem dependência da WebLuxury.
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

### ~~DEC-PEND-01 · Qual marca este projeto posiciona~~ → RESOLVIDA
- **Resolução:** 13/08/2026, pelo Nicolas — ver **DEC-005**. O projeto posiciona a marca institucional Expansion; a marca pessoal fica desvinculada e para depois. Das alternativas mapeadas, prevaleceu a (c) sequenciar, com elemento da (a): perfis com papéis separados.

### ~~DEC-PEND-02 · Radicalidade do nicho — os 4 clientes fora de moda~~ → RESOLVIDA
- **Resolução:** 13/08/2026, pelo Nicolas — ver **DEC-006**. Posicionamento 100% moda; clientes fora do nicho são caixa de transição e não aparecem na marca pública.

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
