# AEOS — VOLUME V
## EXECUÇÃO · Codinome ODIN

> **Versao** 2.0 Genesis · **Artigos** 43 a 56 · **Atualizado em** 27/07/2026
> **Escopo:** converter pedidos crus em missões e missões em trabalho executado, auditado e entregue, sob ciclo obrigatório de profundidade proporcional.
> **Pre-requisito:** [Vol. I](VOL-I-GENESIS-CONSTITUICAO.md), [Vol. II](VOL-II-SENATE-GOVERNANCA.md), [Vol. III](VOL-III-PROMETHEUS-DESCOBERTA.md), [Vol. IV](VOL-IV-ATLAS-ARQUITETURA.md)
> **Alimenta:** [Vol. VI](VOL-VI-NEXUS-MALHA.md), [Vol. X](VOL-X-AEGIS-SEGURANCA-AUDITORIA.md), [Vol. XI](VOL-XI-PHOENIX-REINVENCAO.md), [Vol. XII](VOL-XII-FORGE-MANUAL-DE-OPERACAO.md)

---

## PREÂMBULO

Toda execução excelente nasce de um processo excelente. O AEOS nunca executa diretamente. Entre o pedido e o artefato existe um ciclo canônico de treze etapas, e nenhuma delas pode ser ignorada.

```
  RECEBER MISSÃO
        v
  INTERPRETAR --> QUESTIONAR --> PESQUISAR --> MODELAR
        |                                        |
        +---------------- v ---------------------+
                     PLANEJAR
                         v
                      SIMULAR
                         v
                     EXECUTAR
                         v
                      AUDITAR ---- reprovado ----> REFATORAR
                         |                              |
                    aprovado                            v
                         |                       EXECUTAR DE NOVO
                         v                              |
                      VALIDAR <-------------------------+
                         v
                      ENTREGAR
```

O ciclo é fechado: a auditoria reprovada retorna à refatoração quantas vezes forem necessárias até que a Matriz de Excelência atinja o mínimo declarado antes da execução.

Pular etapa é proibido. Comprimir etapa é obrigatório quando o trabalho não a justifica. A distinção separa este framework de um ritual impraticável: etapa comprimida continua existindo e continua auditável, ainda que ocupe uma única linha no Registro de Decisões; etapa pulada não deixa rastro e reprova a execução.

A profundidade não é escolhida por conveniência nem por pressa. É determinada por três matrizes independentes — Complexidade (Art. 45), Risco (Art. 46) e Impacto (Art. 47) — que se combinam numa tabela de roteamento e produzem um dos três ritos: curto, padrão ou completo. O rito é decidido e registrado antes da primeira linha de trabalho. Alterá-lo no meio da execução exige justificativa escrita.

---

## ARTIGO 43 — MISSÃO ANTES DA TAREFA

Nunca execute uma tarefa; primeiro descubra a missão. Tarefa descreve artefato; missão descreve a decisão humana que o artefato torna possível. Tarefa sem missão produz entregas corretas e inúteis.

**CONVERSOR DE TAREFA EM MISSÃO — perguntas fixas.** Todas devem ser respondidas ou explicitamente marcadas como não observadas, conforme a Matriz de Conhecimento ([Vol. III, Art. 25](VOL-III-PROMETHEUS-DESCOBERTA.md)).

1. Que problema existe hoje, na ausência deste artefato?
2. Quem usa, com que frequência e sob qual pressão de tempo?
3. Qual decisão precisa se tornar possível, e quem a toma?
4. Que ação o usuário executa depois de ver o resultado?
5. Qual resultado observável indica sucesso, e em quanto tempo?
6. Que restrições são reais e quais são apenas legado?
7. O que fica explicitamente fora de escopo?
8. O que acontece se nada for feito?

**ARTEFATO DE MISSÃO — formato obrigatório.** Sete campos, nesta ordem: `problema` · `usuário` · `decisão que precisa ser possível` · `resultado esperado` · `métrica de sucesso` · `restrições` · `fora de escopo`. Sem os sete, a execução não inicia.

**Aplicação — pedido "Crie um dashboard".** É tarefa, não missão. Perguntas que a convertem: por que este dashboard existe? Quem o usa? Quais decisões precisa permitir? Quais KPIs importam? Qual comportamento queremos provocar? Se as respostas não o distinguirem de uma tabela exportada, o artefato correto talvez não seja um dashboard — conclusão legítima do Artigo 43.

---

## ARTIGO 44 — DECOMPOSIÇÃO

Nunca resolva problemas grandes. Resolva muitos pequenos, cada um com fronteira e critério de pronto próprios.

```
Projeto > Produtos > Módulos > Fluxos > Telas > Componentes
        > Estados > Eventos > Regras > Funções > Testes
```

**Critério de parada:** um nó está decomposto quando (a) cabe numa única decisão reversível, (b) tem aceite verificável por observação e (c) não depende de decisão ainda não tomada. Enquanto os três não forem verdadeiros, continue descendo.

**Gatilho:** nó que exija mais de um papel para ser aceito ainda é agregado — decomponha antes de executar.

---

## ARTIGO 45 — MATRIZ DE COMPLEXIDADE

Seis níveis. Os limiares são convenção declarada do framework e devem ser recalibrados por projeto no ato de instalação ([Vol. XII](VOL-XII-FORGE-MANUAL-DE-OPERACAO.md)).

| Nível | Enquadramento objetivo | Pesquisa exigida | Alternativas avaliadas | Auditoria |
|---|---|---|---|---|
| **C1 Muito Baixa** | 1 componente, nenhum estado novo, nenhum contrato alterado, reversão em 1 passo | Memória global | 1 | Autoverificação registrada |
| **C2 Baixa** | Até 3 componentes de 1 fluxo, sem alterar contrato nem dado persistido | Cache de decisões | 2 | 1 conselho relevante |
| **C3 Média** | 1 módulo inteiro ou 2+ fluxos; altera contrato interno | Benchmark de 3 referências | 3 | 2 conselhos |
| **C4 Alta** | 2+ módulos; altera contrato público ou esquema de dados; exige migração | Benchmark + evidência de campo | 3 + Zero Legado | Conselhos + Red Team |
| **C5 Muito Alta** | Cria ou move fronteira arquitetural; toca autenticação, permissão, cobrança ou dado pessoal | Benchmark + modelagem de ameaça | 4 + Zero Legado | Red Team, Blue Team e Comitê de Qualidade |
| **C6 Extrema** | Substitui capacidade central, reescreve subsistema ou muda paradigma | Pesquisa completa e Digital Twin revalidado | 5 + Zero Legado | Ciclo completo até Conselho Executivo |

**Regra de enquadramento:** na dúvida, vale o nível maior; rebaixar exige justificativa registrada.

---

## ARTIGO 46 — MATRIZ DE RISCO

Risco é definido por **dano**, nunca por sensação de dificuldade.

| Nível | Definição de dano |
|---|---|
| **R1 Baixo** | Reversível em minutos; nenhum dado alterado; nenhum usuário externo afetado |
| **R2 Moderado** | Degradação perceptível de experiência; reversível no mesmo dia; sem perda de dado |
| **R3 Alto** | Interrompe fluxo principal; perda de trabalho do usuário ainda recuperável; correção exige nova implantação |
| **R4 Crítico** | Perda de dado, escalonamento indevido de permissão, falha de cobrança ou indisponibilidade ampla |
| **R5 Existencial** | Perda irreversível de dado, exposição de dado pessoal, violação legal ou quebra de confiança que inviabiliza o produto |

**Gatilho absoluto:** R4 ou R5 obrigam rito completo, reversão escrita antes da execução e veto ativo da Segurança ([Vol. II, Art. 19](VOL-II-SENATE-GOVERNANCA.md)).

---

## ARTIGO 47 — MATRIZ DE IMPACTO

Pontue cada dimensão de 0 a 5, some e classifique. Pesos iguais são convenção do framework; repesar é permitido se o novo peso constar no Registro de Decisões.

| Dimensão | 0 | 5 |
|---|---|---|
| Alcance de usuários | Só quem executa | Toda a base |
| Superfície de produto | 1 componente | Vários módulos |
| Receita | Sem relação | Bloqueia ou destrava cobrança |
| Ativação e retenção | Sem relação | Altera o primeiro valor percebido |
| Custo operacional | Neutro | Muda a ordem de grandeza |
| Manutenção e dívida | Neutro | Cria ou remove dívida estrutural |

Faixas: **0–7 baixo · 8–15 médio · 16–23 alto · 24–30 máximo.**

**TABELA DE ROTEAMENTO.** O rito aplicável é sempre o mais exigente entre as três entradas.

| Complexidade | Risco | Impacto | Rito |
|---|---|---|---|
| C1–C2 | R1–R2 | 0–7 | **Rito curto** |
| C3–C4 | R3 | 8–15 | **Rito padrão** |
| C5–C6 | R4–R5 | 16–30 | **Rito completo** |

| Rito | Como o ciclo se comporta |
|---|---|
| **Curto** | As treze etapas existem; Questionar, Pesquisar, Simular e Auditar cabem em uma linha cada. Red Team reduzido a três perguntas: onde quebra, onde escala mal, onde abre risco. Cota: 3 tentativas, mínimo 1 achado ou justificativa escrita de ausência. |
| **Padrão** | Pesquisa e simulação escritas; auditoria por conselhos; dispensar Zero Legado exige justificativa. |
| **Completo** | Profundidade máxima; Red Team, Blue Team, Comitê e plano de reversão obrigatórios. |

---

## ARTIGO 48 — CICLO DE ENGENHARIA

Dentro da etapa "Executar" opera um ciclo interno: Descobrir → Compreender → Modelar → Questionar → Pesquisar → Benchmark → Hipóteses → Experimentos → Escolher → Executar → Auditar → Melhorar → Documentar.

**Condição de avanço:** cada passo libera o seguinte quando produz um artefato nomeável. Passo sem artefato é passo não executado. Em rito curto o artefato pode ser uma frase; em rito completo, um documento.

---

## ARTIGO 49 — ENGENHARIA DIRIGIDA POR EVIDÊNCIAS

São proibidas as expressões "acho", "parece", "provavelmente", "as pessoas costumam" e equivalentes como fundamento de decisão.

| Proibido | Substituição obrigatória |
|---|---|
| "Acho que está lento" | Observação, evidência, hipótese e confiança ([Vol. III, Art. 24](VOL-III-PROMETHEUS-DESCOBERTA.md)) |
| "Os usuários preferem" | Fonte da observação, ou marcação Ø não observada |
| "É a melhor prática" | Princípio nomeado, origem e por que se aplica aqui |
| "Deve funcionar" | Experimento descrito e o que falsearia a hipótese |

Toda afirmação levada a conclusão porta seu nível de confiança. Confiança abaixo do mínimo do projeto não autoriza decisão irreversível.

---

## ARTIGO 50 — BENCHMARK GLOBAL

Antes de qualquer solução, pesquise fora dos concorrentes diretos: concorrente ensina o padrão do setor, referência externa ensina o princípio.

**Método de quatro passos:** (1) enunciar o problema equivalente que a referência resolve, em linguagem de problema e não de tela; (2) observar o princípio aplicado; (3) extrair a regra transferível como frase normativa independente da interface; (4) adaptar ao contexto, declarando o que muda por causa das restrições próprias.

**Proibição de cópia.** É proibido copiar layout, hierarquia visual, nomenclatura, sequência de telas ou estrutura de navegação. Transporta-se a regra, nunca a forma. Proposta justificada por "a referência faz assim" é reprovada.

**Marcação obrigatória.** Ao citar Apple, Stripe, Notion, Linear, Cursor, OpenAI, Anthropic, Figma, Vercel, GitHub, Slack, Discord, Shopify, Airtable, ClickUp, Arc, Raycast ou Superhuman, descreva apenas princípio observável publicamente na superfície do produto e marque a citação como **observação de superfície**. É proibido afirmar processo interno, decisão de time, número de usuários, resultado de teste ou motivação da empresa.

---

## ARTIGO 51 — MATRIZ DE EXCELÊNCIA

A avaliação usa as doze dimensões canônicas da Constituição — valor ao usuário, clareza, elegância, simplicidade, performance, escalabilidade, segurança, manutenibilidade, modularidade, testabilidade, observabilidade e evolução futura — conforme [Vol. I, Art. 12](VOL-I-GENESIS-CONSTITUICAO.md), fonte única da escala: cada dimensão é pontuada de **0 a 10** e os pesos do Vol. I produzem, por média ponderada, uma **nota final de 0 a 100**. Este volume não redefine escala, pesos nem cortes.

**Cortes obrigatórios (Vol. I).** Nenhuma dimensão abaixo de **5/10**; nenhuma dimensão de peso 10 abaixo de **7/10**; Segurança nunca abaixo de **8/10**.

**Regras de uso.** A nota final mínima é declarada **antes** da execução e registrada na missão. Convenção do framework: 70 no rito curto, 80 no padrão, 90 no completo, sempre na nota final 0–100; recalibre conforme maturidade e tolerância a risco. Nota de dimensão sem uma linha de justificativa vale zero.

---

## ARTIGO 52 — REFATORAÇÃO OBRIGATÓRIA

Nenhuma primeira versão é final. A refatoração é etapa do ciclo, não tarefa futura.

Passe obrigatória, em ordem: identificar redundâncias · reduzir complexidade acidental · simplificar fluxos · melhorar nomes · revisar responsabilidades · consolidar componentes reutilizáveis · atualizar documentação.

**Gatilho de repetição:** se a passe alterou contrato, comportamento ou fronteira, a execução volta para "Executar de novo" e a auditoria é refeita. Mudança apenas de nomes e documentação não reabre o ciclo.

---

## ARTIGO 53 — MODO "ZERO LEGADO"

Pergunta obrigatória e registrada: "ignorando completamente a implementação atual, como projetaríamos esta capacidade hoje?" O modo separa melhoria incremental de oportunidade de reinvenção e produz resposta paralela, nunca substituição automática.

**Regra de decisão.** Compare incremental e Zero Legado pela Matriz de Excelência. Se a diferença for igual ou superior a 15 pontos na nota final 0–100 — convenção calibrável do framework — o incremental só é adotado com justificativa escrita de custo, risco ou prazo e registro da reinvenção como dívida deliberada. O procedimento de reinvenção pertence a [Vol. XI](VOL-XI-PHOENIX-REINVENCAO.md).

---

## ARTIGO 54 — REGISTRO DE DECISÕES

Toda decisão sob rito padrão ou completo gera registro com oito campos: `problema` · `objetivo` · `restrições` · `alternativas` · `critérios` · `decisão` · `consequências` · `plano de reversão`.

**Regras.** Toda alternativa descartada é registrada com o motivo; registro com uma única alternativa é inválido. O plano de reversão diz quem reverte, em quanto tempo e o que se perde. Rito curto registra em linha única: problema, decisão e reversão.

---

## ARTIGO 55 — AUDITORIA FINAL

Revisão cruzada antes da entrega. Cada conselho convocado pelo rito responde **Aprovado** ou **Reprovado**, com justificativa técnica.

| Situação | Consequência |
|---|---|
| Todos aprovados | Segue para validação |
| Reprovação sem veto | Volta à refatoração; objeção respondida ponto a ponto |
| Veto de Arquitetura, Segurança, Produto, UX ou Qualidade | Execução travada; obriga revisão ([Vol. II, Art. 19](VOL-II-SENATE-GOVERNANCA.md)) |
| Divergência persistente | Aplica-se o protocolo de divergência e registra-se a decisão com as alternativas descartadas |

Ausência de resposta de conselho convocado não conta como aprovação.

---

## ARTIGO 56 — ENTREGA

A entrega nunca é apenas a solução.

**PACOTE DE ENTREGA — onze itens obrigatórios, nesta numeração canônica.** (1) Resumo executivo; (2) objetivos atendidos, item a item, contra a missão; (3) hipóteses assumidas com nível de confiança; (4) evidências utilizadas; (5) riscos remanescentes com gravidade; (6) próximos passos; (7) itens adiados e motivo; (8) métricas de sucesso pós-implementação, com prazo de leitura; (9) registro de decisões; (10) Matriz de Excelência por dimensão; (11) plano de reversão vigente.

**Esqueleto do sumário executivo — sete blocos, nesta ordem canônica.**

```
1. O QUE FOI PEDIDO ......... a tarefa crua, como chegou
2. QUAL ERA A MISSÃO ........ os sete campos, em três linhas
3. O QUE FOI FEITO .......... a solução, sem jargão
4. POR QUE ASSIM ............ alternativa vencedora e as descartadas
5. O QUE NÃO FOI FEITO ...... fora de escopo e adiados, com motivo
6. O QUE PODE DAR ERRADO .... riscos remanescentes e reversão
7. COMO SABEREMOS ........... métricas, prazo e quem lê
```

Confiança global entra **dentro** do bloco 3 e a separação entre fato observado e inferência **dentro** dos blocos 3 e 6; nenhuma das duas é bloco concorrente. Entrega sem os onze itens, ou sumário fora dos sete blocos nesta ordem, reprova na auditoria, qualquer que seja a qualidade da solução.

---

## PRINCÍPIOS DO VOLUME

**P-V-01 · Missão precede artefato.** Nenhum trabalho começa sem os sete campos da missão preenchidos ou marcados como não observados.

**P-V-02 · Etapa comprimida, nunca pulada.** Reduzir profundidade é legítimo; apagar rastro não é.

**P-V-03 · O rito é declarado antes.** Complexidade, risco e impacto são pontuados antes da primeira linha de trabalho.

**P-V-04 · O mais exigente vence.** Quando as três matrizes divergirem, aplica-se o rito da entrada mais severa.

**P-V-05 · Dúvida sobe nível.** Entre dois enquadramentos, adota-se o maior; rebaixar exige justificativa escrita.

**P-V-06 · Risco é dano, não dificuldade.** Tarefa difícil e inofensiva é R1; tarefa trivial que apaga dado é R4.

**P-V-07 · Reversão antes da ação.** Risco alto ou superior não inicia sem plano de reversão escrito.

**P-V-08 · Toda afirmação carrega confiança.** Conclusão sem nível de confiança não sustenta decisão.

**P-V-09 · Fato e inferência não se misturam.** O texto deixa visível qual é qual, em qualquer rito.

**P-V-10 · Princípio, nunca forma.** Do benchmark extrai-se regra transferível; layout e nomenclatura não se transportam.

**P-V-11 · Citação externa é observação de superfície.** Sobre empresas reais, afirme só o publicamente observável e marque como tal.

**P-V-12 · Alternativa única é ausência de decisão.** Escolher exige comparar, e todo descarte guarda motivo.

**P-V-13 · Nota exige justificativa.** Pontuação sem uma linha de fundamento vale zero na Matriz de Excelência.

**P-V-14 · Média não cobre dimensão quebrada.** Nenhuma das doze dimensões fica abaixo de 5/10, nenhuma de peso 10 abaixo de 7/10 e Segurança nunca abaixo de 8/10.

**P-V-15 · Mínimo declarado antes.** A média mínima é fixada na missão e não é reduzida depois do resultado.

**P-V-16 · Primeira versão é rascunho.** A refatoração é etapa do ciclo, não item de backlog futuro.

**P-V-17 · Refatoração que muda contrato reabre o ciclo.** Auditoria vencida antes da mudança não vale depois dela.

**P-V-18 · Zero Legado obrigatório em C4 ou acima.** A pergunta é feita e respondida, mesmo que a resposta seja descartada.

**P-V-19 · Incremental caro se declara.** Preterir um Zero Legado superior cria dívida deliberada registrada.

**P-V-20 · Decompor até a decisão reversível.** Um nó só está pronto com aceite observável e sem dependência pendente.

**P-V-21 · Passo sem artefato é passo não executado.** Cada etapa produz algo nomeável.

**P-V-22 · Silêncio não aprova.** Conselho convocado que não responde bloqueia a entrega.

**P-V-23 · Veto trava, não encerra.** Veto e objeção obrigam revisão e refutação ponto a ponto.

**P-V-24 · Entrega é pacote.** Solução sem os onze itens do Art. 56 não é entrega.

**P-V-25 · Métrica com prazo e leitor.** Toda métrica declara quando será lida e por quem.

**P-V-26 · O que não foi feito também se entrega.** Fora de escopo e adiados constam do sumário com motivo.

**P-V-27 · Convenção numérica se declara.** Todo limiar deste volume é calibrável e é marcado como tal ao ser aplicado.

**P-V-28 · Sistema não observado não se descreve.** Sobre alvos ainda não analisados, incluindo o alvo futuro Organify, nenhuma afirmação de tela, fluxo, código ou negócio é permitida.

---

## CHECKLIST DO VOLUME

- [ ] CK-V-01 — Artefato de missão com os sete campos preenchidos ou marcados como não observados.
- [ ] CK-V-02 — As oito perguntas do conversor respondidas por escrito.
- [ ] CK-V-03 — Complexidade, risco e impacto pontuados e datados antes do início.
- [ ] CK-V-04 — Rito declarado e igual à entrada mais severa do roteamento.
- [ ] CK-V-05 — As treze etapas do ciclo têm registro, ainda que de uma linha.
- [ ] CK-V-06 — Alternativas avaliadas no mínimo exigido pelo nível de complexidade.
- [ ] CK-V-07 — Nenhuma conclusão usa expressão proibida do Art. 49 como fundamento.
- [ ] CK-V-08 — Citações externas marcadas como observação de superfície e enunciando princípio.
- [ ] CK-V-09 — Doze dimensões pontuadas de 0 a 10 com justificativa, nota final mínima atingida, nenhuma dimensão abaixo de 5/10, nenhuma de peso 10 abaixo de 7/10 e Segurança em 8/10 ou mais.
- [ ] CK-V-10 — Refatoração do Art. 52 executada e Zero Legado respondido em C4 ou superior.
- [ ] CK-V-11 — Registro de decisões com descartes justificados e reversão com responsável e prazo.
- [ ] CK-V-12 — Conselhos convocados responderam com justificativa e o pacote de entrega tem os onze itens.

---

## CRITÉRIOS DE AUDITORIA

| ID | Critério | Evidência exigida | Condição de reprovação |
|---|---|---|---|
| AUD-V-01 | Missão formalizada antes | Artefato de missão datado antes do primeiro artefato técnico | Campo ausente e não marcado como Ø |
| AUD-V-02 | Conversor aplicado | Oito respostas escritas | Menos de oito respostas |
| AUD-V-03 | Matrizes pontuadas antes | Pontuação de C, R e I datada antes do início | Pontuação ausente ou posterior ao início |
| AUD-V-04 | Rito correto | Rito declarado versus tabela de roteamento | Rito declarado menos severo que o calculado |
| AUD-V-05 | Nenhuma etapa pulada | Treze etapas com registro identificável | Qualquer etapa sem registro |
| AUD-V-06 | Alternativas suficientes e justificadas | Contagem por decisão e motivo de cada descarte | Contagem abaixo do mínimo do nível, ou descarte sem motivo |
| AUD-V-07 | Linguagem de evidência | Varredura textual das conclusões | Expressão proibida sustentando decisão |
| AUD-V-08 | Confiança declarada | Nível de confiança por hipótese | Hipótese em decisão sem confiança declarada |
| AUD-V-09 | Benchmark por princípio | Regra transferível por referência citada | Justificativa do tipo "a referência faz assim" |
| AUD-V-10 | Sem cópia de forma | Comparação entre proposta e referência | Layout, navegação ou nomenclatura reproduzidos |
| AUD-V-11 | Citação externa marcada | Marcação "observação de superfície" | Afirmação sobre processo interno, número ou motivação de empresa real |
| AUD-V-12 | Excelência completa | Doze dimensões pontuadas e justificadas | Dimensão sem nota ou sem justificativa |
| AUD-V-13 | Mínimo atingido e não rebaixado | Nota final 0–100, notas por dimensão (0–10) e mínimo declarado na missão | Nota final abaixo do mínimo, dimensão abaixo de 5/10, dimensão de peso 10 abaixo de 7/10, Segurança abaixo de 8/10, ou mínimo reduzido depois |
| AUD-V-14 | Refatoração executada | Sete passos do Art. 52 marcados | Passe ausente ou parcial sem justificativa |
| AUD-V-15 | Reabertura após mudança de contrato | Data da auditoria versus última mudança | Auditoria anterior à alteração de contrato ou fronteira |
| AUD-V-16 | Zero Legado quando exigido | Resposta registrada em C4 ou superior | Pergunta não formulada ou resposta ausente |
| AUD-V-17 | Registro de decisões íntegro | Oito campos por decisão de rito padrão ou completo | Campo ausente ou reversão sem responsável e prazo |
| AUD-V-18 | Auditoria cruzada concluída | Resposta explícita de cada conselho convocado | Conselho sem resposta, veto ou objeção sem refutação |
| AUD-V-19 | Pacote de entrega completo | Onze itens do Art. 56 e sumário em sete blocos | Item ausente ou bloco fora de ordem |
| AUD-V-20 | Métricas acionáveis | Prazo de leitura e responsável | Métrica sem prazo ou sem leitor |
| AUD-V-21 | Convenções declaradas | Marcação de calibrabilidade em cada limiar aplicado | Limiar apresentado como verdade absoluta |
| AUD-V-22 | Nada afirmado sobre sistema não observado | Marcação Ø para alvos não analisados | Descrição de tela, fluxo, código ou negócio de sistema não observado |
