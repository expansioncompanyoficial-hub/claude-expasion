# AEOS — APEX ENGINEERING OPERATING SYSTEM

> **Versão 2.0 · Codinome Genesis · 27/07/2026**
> Constituição de engenharia de produto. Não é um prompt: é o documento normativo que governa como pesquisar, modelar, projetar, criticar, validar e evoluir software.
> Autor do briefing: Nicolas — Expansion.

---

## COMO USAR

**Primeira vez, ou começando uma missão:** abra o **[Vol. XII — FORGE](VOL-XII-FORGE-MANUAL-DE-OPERACAO.md)**. É o manual de operação: traz o Prompt Mestre pronto para colar, 10 prompts auxiliares, 8 templates e os critérios de aceitação. Os outros onze volumes são consultados sob demanda, não lidos em sequência.

**Só quero entender a filosofia:** [Vol. I — GENESIS](VOL-I-GENESIS-CONSTITUICAO.md), artigos 1 a 12.

**Vou analisar um sistema existente:** [Vol. III — PROMETHEUS](VOL-III-PROMETHEUS-DESCOBERTA.md). Ele proíbe você de propor qualquer coisa antes de reconstruir o sistema, e o portão do Art. 30 é conjuntivo — falhou um critério, não passa.

**Vou reprojetar do zero:** [Vol. XI — PHOENIX](VOL-XI-PHOENIX-REINVENCAO.md), rito Zero Legado.

---

## OS DOZE VOLUMES

| Vol. | Nome | Codinome | Artigos | O que governa |
|---|---|---|---|---|
| I | [Constituição](VOL-I-GENESIS-CONSTITUICAO.md) | GENESIS | 1–12 | Missão, valores, hierarquia normativa, regras por domínio, critérios de excelência, cláusula de emenda |
| II | [Governança](VOL-II-SENATE-GOVERNANCA.md) | SENATE | 13–20 | Órgãos, votação técnica, veto, protocolo de divergência, custo de governança |
| III | [Descoberta e Digital Twin](VOL-III-PROMETHEUS-DESCOBERTA.md) | PROMETHEUS | 21–30 | Sete camadas do Twin, nível de confiança, fricção, carga cognitiva, portão de saída |
| IV | [Arquitetura](VOL-IV-ATLAS-ARQUITETURA.md) | ATLAS | 31–42 | Qualidade arquitetural, fronteiras, catálogo de estilos, resiliência, testes, ADR |
| V | [Execução](VOL-V-ODIN-EXECUCAO.md) | ODIN | 43–56 | Missão antes da tarefa, matrizes de complexidade/risco/impacto, ritos, pacote de entrega |
| VI | [Malha de agentes](VOL-VI-NEXUS-MALHA.md) | NEXUS | 57–66 | Memória global, execução especulativa, cache de decisões, roteador, aprendizado |
| VII | [Psicologia](VOL-VII-PSYCHE-PSICOLOGIA.md) | PSYCHE | 67–78 | Carga cognitiva, modelos mentais, fricção boa e ruim, cláusula ética anti-padrão-escuro |
| VIII | [Produto](VOL-VIII-ORACLE-PRODUTO.md) | ORACLE | 79–90 | JTBD, métrica norte, ativação, retenção, LTV, contrapesos, doutrina de remoção |
| IX | [Inteligência artificial](VOL-IX-DAEMON-IA.md) | DAEMON | 91–103 | Escada da automação, teste de eliminação, avaliação, alucinação, injeção de instrução |
| X | [Segurança e auditoria](VOL-X-AEGIS-SEGURANCA-AUDITORIA.md) | AEGIS | 104–117 | Modelagem de ameaças, LGPD, gravidade G0–G4, Red Team, Blue Team, aceitação de risco |
| XI | [Reinvenção](VOL-XI-PHOENIX-REINVENCAO.md) | PHOENIX | 118–130 | Zero Legado, dupla proposta, ponte de migração, autoevolução com critério de parada |
| XII | [Manual de operação](VOL-XII-FORGE-MANUAL-DE-OPERACAO.md) | FORGE | 131–140 | Instalação, ritos, sessão, handoff, prompt mestre, prompts auxiliares, templates |

**Fonte:** [`_FONTE-ORIGINAL.md`](_FONTE-ORIGINAL.md) guarda o briefing bruto e o texto canônico dos artigos 1 a 66.

**Números:** 140 artigos · 311 princípios · 157 checklists · 256 critérios de auditoria · ~43 mil palavras.

---

## OS TRÊS PORTÕES QUE TRAVAM DE PROPÓSITO

1. **Art. 30 (Vol. III)** — proíbe propor redesenho antes do Digital Twin fechar. Doze critérios, conjuntivos: onze de doze reprova.
2. **Art. 24 (Vol. III)** — confiança mínima por **tipo de entrega**, nunca por rito: 80 diagnóstico · 91 redesenho de tela ou componente · 96 regra de negócio, fluxo crítico ou permissão · 99 ação irreversível.
3. **Art. 105 (Vol. X)** — achado G4 ou G3 aberto bloqueia entrega. G4 não é aceitável por escrito: só corrigido ou removido.

## A REGRA DE ORIGEM

Papéis como CTO, Conselho de UX ou Red Team são **perspectivas de análise** — um conjunto fixo de perguntas obrigatórias e um poder de veto. Nunca personas com biografia ou anos de experiência. Um papel só existe no AEOS se consegue reprovar alguma coisa. Exigência do autor do briefing, e cláusula normativa do Vol. II.

---

## MISSÕES

| ID | Alvo | Estado | Pasta |
|---|---|---|---|
| M001 | app.organifybr.com — Digital Twin | encerrada como benchmark | [`ORGANIFY/`](ORGANIFY/DIGITAL-TWIN-ORGANIFY-2026-07-27.md) |
| M002 | OS interno da Expansion (Zero Legado) | aberta | [`ORGANIFY/`](ORGANIFY/FICHA-MISSAO-M002-OS-EXPANSION.md) |

---

## REGISTRO DE EMENDAS

### Emenda 001 — v1.0 → v2.0 · 27/07/2026

**Origem:** auditoria do próprio AEOS logo após a redação. Red Team documental encontrou 18 defeitos e o Comitê de Conformidade, 13 lacunas de cobertura. Os volumes I a XI eram internamente sólidos; o problema era a **costura entre eles** — nenhum volume havia sido reconciliado contra os números e artefatos que outro já tinha fixado, e o Vol. XII, sendo o último e o operacional, acumulava a maior parte das divergências.

**Classificação:** versão **maior**, porque alterou enunciado de artigo, hierarquia normativa e faixas de excelência — conforme a própria Cláusula de Emenda do Vol. I.

**O que mudou, em resumo:**

- **Bloqueante corrigido:** o manual citava "nove itens" do Art. 56 (que tem onze) e "dez critérios" do Art. 30 (que tem doze), em sete lugares. Referências cruzadas passaram à forma sem número.
- Rito Curto deixou de exigir 3 camadas do Twin e o portão integral ao mesmo tempo — combinação que tornava impossível qualquer missão curta sair da descoberta. As sete camadas valem para todos os ritos; o rito varia profundidade.
- Eliminada a expressão "Sem Red Team": no Rito Curto ele existe reduzido a três perguntas. Não há entrega sem Red Team.
- Desfechos de achado unificados em **quatro** (corrigido, mitigado, aceito, contestado). O Vol. X proibia por nome o "mitigado" que o Vol. II tornava obrigatório.
- Matriz de Excelência com fonte única no Vol. I, eliminando referência circular e três pares de pisos concorrentes. O piso do Vol. V aprovava o que o Vol. I proibia.
- Memória Global passou a viver em `MEMORIA/` dentro da missão, resolvendo a colisão `09-PROGRESSO.md` × `09-PROCESSO.md`.
- Veto de Segurança fundado em G4 ou G3 tornou-se **não derrubável** pelo Conselho Executivo.
- Escala de confiança do Art. 24 reescrita para produzir os degraus 91 e 96 — antes os portões eram inatingíveis pela própria escala.
- Eixo "Medo de errar" (Vol. VII) tinha polaridade invertida: bloqueava a tela ideal e aprovava a aterrorizante. Renomeado para Segurança percebida, com exigência que cresce junto com a irreversibilidade.
- **Lacunas fechadas:** Conselho de Administração (nível 0 — o dono humano, único nível não simulado), Chief Innovation Officer, Conselhos de Inovação e de Infraestrutura; Sagas, CI/CD, entrega progressiva, escala horizontal × vertical e um **artigo dedicado a estratégia de testes** (Art. 41-A), que não existia em nenhum dos 140 artigos; LTV, adoção e engajamento no Vol. VIII; neurociência e behavior design nomeados no Vol. VII.

**Verificação:** Comitê Independente conferiu mecanicamente as 18 decisões — 16 integralmente aplicadas, 2 parciais, corrigidas em seguida. Zero IDs duplicados em 724 identificadores, zero referências fora de faixa, zero links quebrados.

**Ironia registrada de propósito:** a primeira violação da Cláusula de Emenda foi cometida pelo próprio ato de emendar — os doze cabeçalhos continuaram marcados como 1.0 depois de mudanças que exigiam versão maior. Detectado pelo Comitê Independente, não pelo Blue Team.
