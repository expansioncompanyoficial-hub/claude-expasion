# AEOS — VOLUME XII
## MANUAL DE OPERAÇÃO · Codinome FORGE

> **Versão** 2.0 Genesis · **Artigos** 131–140 · **Atualizado em** 27/07/2026
> **Escopo:** Instalar, ativar, conduzir, interromper, retomar e encerrar uma missão AEOS, com prompts, templates e critérios de aceitação prontos para uso.
> **Pré-requisito:** [Vol. I](VOL-I-GENESIS-CONSTITUICAO.md), [Vol. III](VOL-III-PROMETHEUS-DESCOBERTA.md) e [Vol. V](VOL-V-ODIN-EXECUCAO.md) lidos integralmente.
> **Alimenta:** toda missão AEOS — este é o ponto de entrada operacional dos onze volumes anteriores.

---

## PREÂMBULO

Os onze volumes anteriores descrevem como pensar. Este descreve como usar. Sem ele, o AEOS permanece teoria.

Ordem de leitura no primeiro uso: Volume I inteiro (é curto e é a lei); Volume III inteiro (impede o erro mais comum, propor antes de compreender); Volume V até o Artigo 56 (é o formato da entrega); então este volume, e execute. Os demais são consulta sob demanda.

Na primeira missão, não escolha um sistema grande: escolha um recorte — um fluxo, uma tela, um módulo. O produto dessa execução não é o redesenho; são os limiares calibrados e o diagnóstico de onde a operação não consegue produzir a evidência exigida.

Todo limite numérico deste volume é **convenção declarada do framework**, não medição empírica. Cada projeto registra na Ficha os valores adotados e o motivo; número herdado sem revisão vira risco documentado.

O AEOS é indiferente à ferramenta: serve qualquer ambiente que leia arquivos, escreva artefatos e sustente sessão longa. O registro em arquivo não é opcional — memória de conversa não é artefato.

---

## ARTIGO 131 — INSTALAÇÃO E ATIVAÇÃO

O AEOS é ativado por presença de arquivos, não por promessa verbal. Instalação válida exige, na raiz do projeto: `AEOS/` com os doze volumes e a fonte original; `MISSOES/` vazio; e instrução permanente do agente apontando para ambos.

Ativação: (1) copiar os volumes; (2) criar `MISSOES/<slug>/`; (3) preencher a Ficha até o último campo obrigatório; (4) declarar rito e limiares; (5) colar o Prompt Mestre preenchido.

**Gatilho de recusa:** com campo obrigatório vazio ou suposto na Ficha, o agente recusa o início e devolve as perguntas pendentes. Iniciar com campo suposto viola [Vol. III, Art. 21](VOL-III-PROMETHEUS-DESCOBERTA.md).

---

## ARTIGO 132 — ESTRUTURA DE ARQUIVOS DE UMA MISSÃO

Toda missão cria a mesma estrutura. Nomes fixos permitem que qualquer sessão futura saiba onde procurar sem explicação.

```
MISSOES/<slug>/
  00-FICHA-DE-MISSAO.md   contrato; imutável após aprovação
  01-TWIN/                Digital Twin (Art. 23), as 7 camadas: navegacao,
                          componentes, estados, eventos, fluxos,
                          dependencias, regras — espelha MEMORIA/06-MODELO.md
  02-HIPOTESES.md         confiança e status por hipótese — espelha
                          MEMORIA/01-HIPOTESES.md
  03-FRICCAO-E-CARGA.md   mapas dos Arts. 26 e 27
  04-ADR/                 uma decisão arquitetural por arquivo — espelha
                          MEMORIA/02-DECISOES.md
  05-PARECERES/           um parecer por conselho consultado
  06-RED-TEAM.md          achados; 07-BLUE-TEAM.md respostas
  08-RISCOS-ACEITOS.md    visão formal (Vol. X, Art. 117) de MEMORIA/03-RISCOS.md
  10-ENTREGA/             pacote do Vol. V, Art. 56
  LOG-PROGRESSO.md        log operacional append-only da missão
  MEMORIA/                Memória Global (Vol. VI, Art. 58), append-only:
                          00-FATOS.md · 01-HIPOTESES.md · 02-DECISOES.md ·
                          03-RISCOS.md · 04-DEPENDENCIAS.md · 05-OBJETIVOS.md ·
                          06-MODELO.md · 07-CACHE.md · 08-CONFLITOS.md ·
                          09-PROCESSO.md
```

**Regra de espelhamento:** a Memória Global é a fonte única; o arquivo da missão que a espelha declara o espelhamento e cita a entrada de origem (`F-###`, `H-###`, `D-###`, `R-###`) em vez de duplicar conteúdo. `LOG-PROGRESSO.md` é o log da missão e não se confunde com `MEMORIA/09-PROCESSO.md`, que guarda métricas de processo (Vol. VI, Art. 65).

**Regra:** nada é sobrescrito em silêncio. Correção de fato observado gera nova linha em `LOG-PROGRESSO.md` citando o arquivo e o que mudou, e nova entrada na memória marcando a anterior como SUPERSEDIDA.

---

## ARTIGO 133 — OS TRÊS RITOS DE EXECUÇÃO

Três profundidades. O rito é declarado antes de começar e só pode ser elevado; rebaixar exige risco aceito registrado. **O rito varia a profundidade — quantas entradas por camada e quanta evidência por entrada —, nunca a quantidade de camadas do Twin nem o corte de confiança.**

| Dimensão | Rito Curto | Rito Padrão | Rito Completo |
|---|---|---|---|
| Alvo | uma tela ou fluxo | um módulo ou produto pequeno | plataforma ou reinvenção |
| Twin exigido | as 7 camadas | as 7 camadas | as 7 camadas |
| Profundidade do Twin | entradas do recorte, 1 evidência por entrada | todas as entradas do módulo, 2 evidências nas camadas de regra e dependência | cobertura exaustiva, evidência reproduzida por entrada |
| Confiança mínima para propor | não varia por rito: cortes por tipo de entrega do [Vol. III, Art. 24](VOL-III-PROMETHEUS-DESCOBERTA.md) | idem | idem |
| Conselhos | 2 (UX + Arquitetura) | 5 | todos os aplicáveis |
| Red Team | 1 rodada reduzida: 3 perguntas obrigatórias, cota de 3 tentativas, mínimo 1 achado ou justificativa escrita de ausência | 1 rodada plena (cota de 8 tentativas / 3 achados materiais) + Blue Team | 2 rodadas plenas + Comitê |
| Zero Legado (Art. 53) | opcional | obrigatório | obrigatório, com dupla proposta |
| ADRs mínimos | 1 | 3 | por decisão estrutural |

Regra de escolha, nesta ordem: tocou autenticação, cobrança, dados pessoais ou permissões, é no mínimo Padrão; é irreversível em produção sem rollback, é Completo; cabe em uma tela e é reversível, é Curto.

**Cortes de confiança — [Vol. III, Art. 24](VOL-III-PROMETHEUS-DESCOBERTA.md), por tipo de entrega e iguais nos três ritos:** 80 libera diagnóstico, mapa de fricção e relatório de observação; 91 é o mínimo para propor redesenho de tela ou de componente; 96 para regra de negócio, fluxo crítico ou permissão; 99 para ação irreversível. Acesso limitado à evidência derruba a confiança alcançada, nunca o corte exigido: sem atingi-lo, a entrega desce de tipo (vira diagnóstico) em vez de propor.

---

## ARTIGO 134 — PROTOCOLO DE SESSÃO

Contexto é orçamento, conforme [Vol. VI, Art. 61](VOL-VI-NEXUS-MALHA.md).

**Sempre:** Ficha; volume da etapa corrente; `02-HIPOTESES.md`; últimas vinte linhas de `LOG-PROGRESSO.md`.

**Nunca por padrão:** volumes de etapas futuras; o Twin inteiro; pareceres fechados; transcrições brutas.

**Sob demanda:** o arquivo do Twin que a etapa toca; o ADR em revisão.

**Gatilho de descarga:** ao notar que está reescrevendo informação já existente, o agente para, cita o arquivo e continua dali — recriar conhecimento viola [Vol. VI, Art. 58](VOL-VI-NEXUS-MALHA.md).

---

## ARTIGO 135 — REGRA DE HANDOFF

Nenhuma sessão termina sem handoff escrito, mesmo que a próxima seja em cinco minutos com o mesmo operador.

O handoff é bloco anexado a `LOG-PROGRESSO.md` com sete campos: etapa concluída; etapa corrente; próximo passo único e literal; arquivos alterados; hipóteses cuja confiança mudou e por quê; bloqueios que dependem de humano; pergunta aberta mais cara.

**Validade:** quem não participou retoma lendo só a Ficha e o último handoff. Se precisar perguntar "e agora?", o handoff é inválido e é reescrito antes de encerrar.

---

## ARTIGO 136 — REGISTRO DE PROGRESSO

`LOG-PROGRESSO.md` é append-only: cada entrada traz data, etapa, ação, artefato e delta de confiança. Entradas não são editadas, são corrigidas por nova entrada.

Formato: `2026-07-27 · DESCOBERTA · mapeada tela de listagem · 01-TWIN/componentes.md · H-04 de 40% para 60% (evidência: paginação observada)`.

Toda alteração de confiança exige a evidência entre parênteses; sem ela, a alteração é inválida e o valor anterior prevalece.

---

## ARTIGO 137 — DEFINIÇÃO DE PRONTO

"Pronto" não é "a solução foi escrita". Etapa pronta é etapa com portão satisfeito:

| Etapa | Portão de saída |
|---|---|
| Descoberta | todos os critérios do [Vol. III, Art. 30](VOL-III-PROMETHEUS-DESCOBERTA.md), sem exceção |
| Arquitetura | média ponderada do [Vol. IV, Art. 33](VOL-IV-ATLAS-ARQUITETURA.md) ≥ mínimo da Ficha |
| Proposta | dupla proposta (incremental + Zero Legado) com critério de escolha |
| Crítica | Red Team executado; todo achado em um dos quatro desfechos — corrigido, mitigado, aceito ou contestado ([Vol. X, Art. 115](VOL-X-AEGIS-SEGURANCA-AUDITORIA.md)) |
| Entrega | todos os itens do [Vol. V, Art. 56](VOL-V-ODIN-EXECUCAO.md) em `10-ENTREGA/` |

Etapa sem portão satisfeito não avança, mesmo com prazo vencido — prazo vencido é tratado pelo Artigo 139.

---

## ARTIGO 138 — RITO DE ENCERRAMENTO

Cinco passos, nesta ordem: (1) verificar os Critérios de Aceitação da Entrega; (2) produzir o Sumário Executivo; (3) listar itens adiados com motivo; (4) registrar as métricas que julgarão a decisão após a implementação; (5) extrair o aprendizado para o catálogo de padrões, conforme [Vol. VI, Art. 66](VOL-VI-NEXUS-MALHA.md).

**Proibido encerrar** com hipótese não validada sustentando recomendação: ou a hipótese é validada, ou a recomendação vira sugestão marcada como especulativa.

---

## ARTIGO 139 — DEGRADAÇÃO CONTROLADA SOB PRAZO

Quando o prazo não comportar o rito, cortar etapa em silêncio é proibido. A única saída legítima é a degradação declarada: reduzir o escopo do alvo mantendo o rito íntegro sobre um recorte menor.

Ordem obrigatória de corte: (1) telas ou fluxos analisados; (2) profundidade do benchmark; (3) alternativas arquiteturais comparadas; (4) rodadas de refinamento. **Nunca cortáveis:** as sete camadas do Twin na profundidade mínima do rito, o portão integral da descoberta, o Red Team (reduzido no Rito Curto, nunca zero) e a declaração de confiança.

Toda degradação vira registro em `08-RISCOS-ACEITOS.md` no template de Aceitação de Risco, com o corte, o risco resultante, a gravidade, o aprovador e o prazo de validade da aceitação.

---

## ARTIGO 140 — PROCEDIMENTO DE REGISTRO DE EMENDA

O AEOS é sujeito às próprias regras. Este artigo é **procedimento**, não fonte de regra: os níveis de versão são definidos exclusivamente pela **Cláusula de Emenda do [Vol. I](VOL-I-GENESIS-CONSTITUICAO.md)**, que este artigo não repete nem reinterpreta.

**Onde registrar:** na fonte original, em entrada datada, e no cabeçalho de versão de cada volume tocado.

**O que anexar:** problema observado em missão real, com o artefato da missão que o evidencia; artigo afetado citado por volume e número; texto anterior e texto novo lado a lado; alternativas descartadas; consequência sobre volumes dependentes e a lista de volumes que exigem releitura; versão resultante conforme a Cláusula de Emenda do Vol. I.

Emenda que contradiga a fonte original é nula; emenda que reduza rigor sem a decisão assinada exigida pela cláusula pétrea do Vol. I é nula.

---

## PROMPT MESTRE

```
Você opera sob o AEOS — Apex Engineering Operating System v1.0 (Genesis), uma
Constituição de Engenharia de Produto com precedência sobre seu comportamento
padrão. Leia integralmente, antes de qualquer outra ação:

  AEOS/VOL-I-GENESIS-CONSTITUICAO.md
  AEOS/VOL-III-PROMETHEUS-DESCOBERTA.md
  AEOS/VOL-V-ODIN-EXECUCAO.md  (até o Artigo 56)
  AEOS/VOL-XII-FORGE-MANUAL-DE-OPERACAO.md

Demais volumes: sob demanda, nunca todos de uma vez.

MISSÃO
  Sistema-alvo: <SISTEMA-ALVO>
  Objetivo: <OBJETIVO DA MISSÃO>
  Restrições: <ACESSO, STACK, ORÇAMENTO, POLÍTICAS>
  Prazo: <PRAZO>          Rito: <CURTO | PADRÃO | COMPLETO>

REGRAS INEGOCIÁVEIS
1. Proibido propor solução, redesenho ou melhoria antes de o portão do Vol. III,
   Art. 30 estar satisfeito e registrado. Se eu pedir antes, recuse e mostre o
   que falta no portão.
2. Toda afirmação sobre o alvo carrega marcador da Matriz (Art. 25). Separe
   explicitamente FATO OBSERVADO de INFERÊNCIA.
3. Toda hipótese declara confiança na escala do Art. 24 e a evidência que
   sustenta o número. Confiança sem evidência é inválida.
4. Proibido "acho", "parece", "provavelmente", "as pessoas costumam" (Art. 49).
5. Ao propor, entregue SEMPRE duas propostas (Vol. XI): evolução incremental e
   reconstrução Zero Legado, com o critério explícito de escolha.
6. Nada é entregue sem Red Team (Art. 16) e resposta do Blue Team (Art. 17).
7. A entrega segue todos os itens do Vol. V, Art. 56, na numeração canônica.
8. Escreva os artefatos em MISSOES/<slug>/ conforme o Art. 132.
9. Não invente estatísticas, benchmarks, estudos ou detalhes internos de
   empresas; ao citar referências, descreva só o princípio observável.
10. Encerre toda sessão com o handoff do Art. 135 em LOG-PROGRESSO.md.

PRIMEIRA AÇÃO
Não analise ainda. Devolva: (a) a Ficha preenchida até onde os fatos permitem,
com todo campo não observado marcado NÃO OBSERVADO; (b) as perguntas que eu
preciso responder antes da descoberta; (c) o plano de descoberta com as sete
camadas do Twin e a profundidade que o rito exige em cada uma.
```

---

## PROMPTS AUXILIARES

**(a) Descoberta e Digital Twin** — ao iniciar a descoberta.
```
Execute a descoberta do Vol. III. Construa o Twin nas SETE camadas, um arquivo
por camada em 01-TWIN/, na profundidade que o rito exige, com símbolo da Matriz
em cada item. Ao final avalie o portão do Art. 30 critério a critério e diga o
que impede a saída. Não proponha nada.
```

**(b) Engenharia reversa de uma tela** — com uma tela em mãos.
```
Alvo: <TELA>. Desmonte conforme o Módulo 4 da fonte: componentes, estados,
eventos, transições, erros, vazios, carregamentos, feedbacks. Separe observado de
inferido e liste o que só código ou rede responderiam.
```

**(c) Auditoria de arquitetura** — com arquitetura descrita ou observada.
```
Aplique o Vol. IV. Pontue todas as dimensões do Art. 33 com peso e justificativa
por nota, calcule a média ponderada e compare com o mínimo da Ficha. Aplique o
Art. 41 e gere um ADR por decisão estrutural questionada.
```

**(d) Revisão de UX e carga cognitiva** — após o Twin de componentes e estados.
```
Aplique os Arts. 26 e 27. Por tela: decisões exigidas, elementos concorrentes,
objetivo principal e secundários, hierarquia. Priorize fricções por impacto e
diga que evidência falta para confirmar cada uma.
```

**(e) Caça de eliminação por IA** — antes de projetar qualquer automação.
```
Para cada fluxo do Twin, responda a pergunta do Módulo 8: como a IA ELIMINARIA
este processo, não o melhoraria? Separe em eliminável hoje, eliminável com dados
inexistentes hoje, e não eliminável com o motivo.
```

**(f) Red Team** — com a solução pronta, antes da entrega.
```
Assuma a perspectiva do Art. 16 — não é pessoa, é conjunto de perguntas. Destrua
a proposta: onde quebra, escala mal, acopla, duplica, cria dívida, abre risco,
onde a complexidade não se paga. Um achado por bloco, no template de Achado do
Red Team deste volume, com GRAVIDADE na escala G0–G4 do Vol. X, Art. 105 e cenário
concreto de falha. Cumpra a cota do rito (Art. 133); no Rito Curto, as três
perguntas obrigatórias — onde quebra, onde escala mal, onde abre risco — com
cota de 3 tentativas e mínimo de 1 achado ou justificativa escrita de ausência.
"Sem achados" sem justificativa escrita não encerra a rodada.
```

**(g) Blue Team** — imediatamente após o Red Team.
```
Responda a cada achado com uma de quatro saídas: corrigido (como), mitigado
(residual), aceito (quem aceita) ou contestado (evidência). Nenhum achado fica
sem status.
```

**(h) Zero Legado** — antes de fechar a proposta, nos ritos Padrão e Completo.
```
Aplique o Art. 53. Ignorando a implementação atual: se este problema surgisse
hoje, sem legado, como seria resolvido? Compare reconstrução e evolução
incremental em benefícios, custos, riscos e prazo, e declare o critério de
escolha.
```

**(i) Rodada de autoevolução** — quando a solução existe e o prazo permite outra volta.
```
Execute o ciclo da fonte: analisar, questionar, destruir, reconstruir, criticar,
melhorar, achar gargalos, otimizar, auditar, gerar nova versão. Registre o que
mudou e por quê. Pare quando a rodada não alterar decisão relevante e declare
convergência.
```

**(j) Pacote de entrega** — com todos os portões satisfeitos.
```
Monte 10-ENTREGA/ conforme o Vol. V, Art. 56. Depois avalie os Critérios de
Aceitação da Entrega do Vol. XII e declare, item a item, se a missão pode ser
encerrada. Se algum falhar, não encerre.
```

---

## TEMPLATES

**Ficha de Missão** — `00-FICHA-DE-MISSAO.md`
```
MISSÃO: <slug>     DATA:        RITO: <curto|padrão|completo>     PRAZO:
SISTEMA-ALVO:                   OBJETIVO (uma frase verificável):
DECISÃO QUE ESTA MISSÃO HABILITA:
ACESSO: [ ] produto no ar [ ] código [ ] dados [ ] usuários [ ] stakeholders
RESTRIÇÕES REAIS:               RESTRIÇÕES SUPOSTAS (a validar):
LIMIARES: calibração dos cortes do Art. 24 (por tipo de entrega) · média
arquitetural __/10 · MOTIVO (obrigatório para cada calibração):
FORA DE ESCOPO:                 APROVADO POR:
```

**Entrada do Digital Twin** — tela e componente
```
ID: T-<n>/C-<n>   NOME:        ROTA:        OBJETIVO ÚNICO:
COMPONENTES:      ESTADOS:     EVENTOS:     TRANSIÇÕES DE SAÍDA:
REGRAS VISÍVEIS:
MARCADOR: ✔ confirmada | △ provável | ? hipótese | Ø não observada | ⚠ contraditória
COMO FOI OBSERVADO:           O QUE NÃO FOI POSSÍVEL OBSERVAR:
```

**Registro de Hipótese** — `02-HIPOTESES.md`
```
ID: H-<n>   ENUNCIADO (falsificável):     OBSERVAÇÃO DE ORIGEM:
EVIDÊNCIA ATUAL:            CONFIANÇA: __% (escala Art. 24)
O QUE CONFIRMARIA:          O QUE REFUTARIA:      IMPACTO SE FALSA:
STATUS: aberta | validada | refutada | abandonada
```

**ADR — Decisão Arquitetural** — `04-ADR/ADR-<n>.md`
```
ADR-<n>: <título>  DATA:  STATUS: proposta | aceita | substituída por ADR-<n>
CONTEXTO:          PROBLEMA:        RESTRIÇÕES:
ALTERNATIVAS (mínimo 2): benefícios | custos | riscos | prazo
CRITÉRIOS E PESOS: DECISÃO:         JUSTIFICATIVA:
CONSEQUÊNCIAS ACEITAS:  PLANO DE REVERSÃO:  COMO SABEREMOS QUE ERROU:
```

**Parecer de Conselho** — `05-PARECERES/<conselho>.md`
```
CONSELHO:     OBJETO:     DATA:
PERGUNTAS OBRIGATÓRIAS: uma resposta por pergunta do volume aplicável
VEREDITO: aprovado | aprovado com condições | reprovado | veto
CONDIÇÕES:    JUSTIFICATIVA TÉCNICA (obrigatória se veto):
TRADE-OFFS ACEITOS:     TRADE-OFFS RECUSADOS:
```

**Achado do Red Team** — `06-RED-TEAM.md` (campos canônicos; gravidade pelo Vol. X, Art. 105)
```
ID: RT-<n>
O QUE QUEBRA:
COMO REPRODUZIR (entrada → estado → resultado errado):
IMPACTO DE NEGÓCIO:
GRAVIDADE: G0 | G1 | G2 | G3 | G4
CORREÇÃO PROPOSTA:
DONO:
STATUS: aberto | corrigido | mitigado | aceito | contestado
CATEGORIA (auxiliar, opcional — vetor de ataque): quebra | escala | acoplamento |
  segurança | complexidade | dívida
```

**Aceitação de Risco** — `08-RISCOS-ACEITOS.md` (os sete campos do Vol. X, Art. 117)
```
ID: RA-<n>  RISCO:          ORIGEM: RT-<n> | degradação Art. 139 | outra
GRAVIDADE: G0 | G1 | G2 | G3 | G4   (Vol. X, Art. 105; G4 não é aceitável)
PROBABILIDADE:              IMPACTO SE OCORRER:
POR QUE ACEITO:             MITIGAÇÃO PARCIAL (controle + risco residual):
DONO (pessoa nomeada):      GATILHO DE REVISÃO:
PRAZO DE VALIDADE DA ACEITAÇÃO: __/__/____   DATA:
APROVADOR (nível do Art. 117: G1–G2 dono técnico do módulo; G3 Conselho
Executivo; G4 não se aceita, corrige-se ou remove-se a funcionalidade):
```
Aceitação vencida sem reavaliação vira achado aberto e bloqueia a próxima entrega.

**Sumário Executivo** — `10-ENTREGA/00-SUMARIO.md` (os sete blocos do Vol. V, Art. 56, nesta ordem)
```
1. O QUE FOI PEDIDO ....... a tarefa crua, como chegou
2. QUAL ERA A MISSÃO ...... os sete campos da Ficha, em três linhas
3. O QUE FOI FEITO ........ a solução, sem jargão
   CONFIANÇA GLOBAL: __% (evidência) · FATO OBSERVADO × INFERÊNCIA, separados
4. POR QUE ASSIM .......... alternativa vencedora e as descartadas, com critério
5. O QUE NÃO FOI FEITO .... fora de escopo e itens adiados, com motivo
6. O QUE PODE DAR ERRADO .. riscos remanescentes com gravidade, hipóteses não
   validadas e plano de reversão · FATO OBSERVADO × INFERÊNCIA, separados
7. COMO SABEREMOS ......... métricas, prazo de leitura e quem lê
```
Confiança global e a separação fato/inferência são campos **dentro** dos blocos 3 e 6, nunca blocos concorrentes.

---

## CRITÉRIOS DE ACEITAÇÃO DA ENTREGA

Encerrar exige todos verdadeiros:

1. Ficha sem campo obrigatório vazio ou suposto.
2. Twin com as sete camadas, na profundidade do rito, e marcador da Matriz em cada item.
3. Portão do Art. 30 satisfeito em todos os seus critérios, com data.
4. Toda hipótese com status final e confiança justificada.
5. Nenhuma recomendação apoiada em hipótese aberta.
6. Dupla proposta com critério de escolha declarado.
7. Red Team executado; todo achado com um dos quatro desfechos; nenhum achado G4 ou G3 aberto, conforme [Vol. X, Art. 105](VOL-X-AEGIS-SEGURANCA-AUDITORIA.md).
8. Todo risco aceito com gravidade, dono, aprovador no nível do Art. 117, gatilho de revisão e prazo de validade vigente.
9. Pacote do Art. 56 completo em `10-ENTREGA/`, com todos os itens da numeração canônica.
10. Fato e inferência separados no Sumário Executivo.
11. Todo número rastreável a observação ou declarado convenção.
12. Handoff final legível por quem não participou.

---

## APLICAÇÃO INICIAL — app.organifybr.com

**Nada foi observado deste sistema.** Nenhuma tela, fluxo, endpoint, componente, regra ou usuário foi visto ou medido. A ficha abaixo é deliberadamente incompleta; preencher campo NÃO OBSERVADO sem observação direta viola o [Vol. III, Art. 21](VOL-III-PROMETHEUS-DESCOBERTA.md) e invalida a missão.

```
MISSÃO: organify-descoberta-01    DATA: <a definir>   RITO: <a definir>
SISTEMA-ALVO: https://app.organifybr.com/  (alvo futuro, NÃO OBSERVADO)
OBJETIVO / DECISÃO A HABILITAR: NÃO DEFINIDOS
USUÁRIOS / O QUE O PRODUTO FAZ: NÃO OBSERVADO
TELAS, FLUXOS, COMPONENTES, ESTADOS: NÃO OBSERVADO (Ø em todas as camadas)
ARQUITETURA, STACK, BANCO, APIs: NÃO OBSERVADO
REGRAS DE NEGÓCIO E PERMISSÕES: NÃO OBSERVADO
MODELO COMERCIAL E MÉTRICAS: NÃO OBSERVADO
```

Perguntas obrigatórias antes da primeira execução: há autorização formal e em que profundidade; o acesso é só ao produto no ar ou também a código, dados e logs; que conta e papel de usuário serão usados; que decisão de negócio a análise habilita; qual o prazo e, portanto, o rito; há áreas proibidas por contrato ou dados pessoais; quem valida as regras inferidas.

Sem essas respostas, a missão fica em pré-abertura e nenhum artefato pode ser produzido.

---

## PERGUNTAS FREQUENTES OPERACIONAIS

**Projeto pequeno demais.** Use o Rito Curto. Nunca dispensados: separar fato de inferência e declarar confiança — não custa tempo, custa disciplina.

**Só tenho o produto no ar, não o código.** Situação normal em engenharia reversa. Marque a camada de dependências como Ø — a camada continua existindo, com lacuna declarada — e reduza na Ficha a confiança máxima alcançável. Sem código, a missão raramente ultrapassa 80 na escala do Art. 24, e 80 libera diagnóstico, não redesenho: a entrega desce de tipo e isso vai escrito.

**O cliente já decidiu a solução.** A missão vira validação: trate a solução como hipótese H-01 com confiança zero, execute a descoberta e devolva evidência a favor e contra. Não comece implementando.

**Quanto custa o Rito Completo?** Não há número honesto: depende do alvo e do acesso à evidência. Fixe o orçamento de esforço antes e, ao esgotá-lo, aplique o Art. 139 reduzindo escopo, nunca rito.

**Framework e prazo em conflito.** Corte na ordem do Art. 139 e registre em `08-RISCOS-ACEITOS.md`. Rito quebrado sem registro destrói a rastreabilidade e não tem correção posterior.

**Posso pular o Red Team se a mudança é trivial?** Não. No Rito Curto ele é reduzido a três perguntas — onde quebra, onde escala mal, onde abre risco —, com cota de 3 tentativas e mínimo de 1 achado ou justificativa escrita de ausência; nunca a zero. "Trivial" é inferência.

**A sessão estourou o contexto.** Escreva o handoff, encerre e reabra com Ficha, volume da etapa, hipóteses e handoff. Perder contexto não é problema com o estado em arquivo.

**Como sei que está funcionando?** Propostas são recusadas por falta de evidência; confiança muda com motivo escrito; decisões antigas reaparecem nos ADR; a segunda missão é mais rápida.

---

## PRINCÍPIOS DO VOLUME

**P-XII-01 · Arquivo é a verdade.** O que não está em arquivo não existe para a auditoria.

**P-XII-02 · Ativação por evidência.** O AEOS está ativo quando os arquivos existem e são citados, não quando alguém diz segui-lo.

**P-XII-03 · Rito declarado antes.** Escolher a profundidade depois de ver o resultado é escolher o resultado.

**P-XII-04 · Rito sobe, não desce.** Elevar é livre; rebaixar exige risco aceito e responsável nomeado.

**P-XII-05 · Escopo é a variável de ajuste.** Sob pressão, encolha o alvo, nunca o método.

**P-XII-06 · Nomes fixos.** Previsibilidade da estrutura vale mais que preferência do operador.

**P-XII-07 · Append-only.** Correção é linha nova; reescrever histórico apaga a cadeia de evidência.

**P-XII-08 · Confiança sem evidência é nula.** Todo percentual carrega, na mesma linha, o que o sustenta.

**P-XII-09 · Um próximo passo.** O handoff aponta uma ação seguinte, executável sem interpretação.

**P-XII-10 · Contexto é orçamento.** Carregar tudo não é rigor; é dispersão.

**P-XII-11 · Releia em vez de reescrever.** Ao detectar conhecimento duplicado, cite o arquivo existente.

**P-XII-12 · Portão antes de prazo.** Prazo vencido aciona degradação declarada, nunca portão flexibilizado.

**P-XII-13 · A pergunta cara é registrada.** A dúvida mais custosa vai no handoff, não na memória do operador.

**P-XII-14 · Recusa é comportamento esperado.** Recusar início por ficha incompleta é execução correta, não obstrução.

**P-XII-15 · Suposição marcada é aceitável; disfarçada, não.** O erro não é supor, é supor sem marcar.

**P-XII-16 · Convenção declarada.** Todo número é convenção recalibrável por projeto, com motivo escrito.

**P-XII-17 · Dupla proposta é obrigação.** Incremental e Zero Legado sempre juntas, com critério explícito de escolha.

**P-XII-18 · Achado sem desfecho é achado aberto.** Silêncio sobre achado do Red Team equivale a mantê-lo aberto, e achado aberto bloqueia a entrega como G4 ou G3.

**P-XII-19 · Risco aceito tem dono, gatilho e prazo.** Sem responsável, evento de reabertura e prazo de validade, não houve aceitação.

**P-XII-20 · Métrica antes do elogio.** A entrega define como saberemos, depois, que a decisão foi errada.

**P-XII-21 · Primeira missão é calibração.** Seu produto são os limiares ajustados, não o redesenho.

**P-XII-22 · Aprendizado extraído ou missão incompleta.** Encerrar sem alimentar o catálogo desperdiça o custo já pago.

**P-XII-23 · O manual obedece à Constituição.** Em conflito com o Vol. I ou com a fonte original, este volume cede.

**P-XII-24 · Emenda nasce de missão real.** Só falha observada gera emenda; elegância teórica não.

**P-XII-25 · Alvo não observado é Ø.** Campo de sistema não visitado não recebe conteúdo, nem provisório.

**P-XII-26 · Sessão termina com handoff.** Não há encerramento válido sem handoff, qualquer que seja a duração.

---

## CHECKLIST DO VOLUME

- [ ] CK-XII-01 `AEOS/` com os doze volumes e a fonte original.
- [ ] CK-XII-02 Ficha sem campo obrigatório vazio.
- [ ] CK-XII-03 Rito e limiares declarados antes da primeira análise.
- [ ] CK-XII-04 Pastas do Art. 132 com os nomes canônicos.
- [ ] CK-XII-05 Twin com as sete camadas e marcador da Matriz em todo item.
- [ ] CK-XII-06 Cada hipótese com confiança e evidência.
- [ ] CK-XII-07 `LOG-PROGRESSO.md` append-only, com evidência em todo delta.
- [ ] CK-XII-08 Portão do Art. 30 avaliado antes de qualquer proposta.
- [ ] CK-XII-09 Duas propostas com critério de escolha.
- [ ] CK-XII-10 Todo achado do Red Team com status; nenhum achado G4 ou G3 aberto (Vol. X, Art. 105).
- [ ] CK-XII-11 Todo risco aceito com gravidade, dono, aprovador, gatilho e prazo de validade.
- [ ] CK-XII-12 `10-ENTREGA/` com todos os itens do Art. 56.
- [ ] CK-XII-13 Sumário separa fato observado de inferência.
- [ ] CK-XII-14 Última sessão encerrada com handoff de sete campos.
- [ ] CK-XII-15 Nenhum campo não observado preenchido por suposição.

---

## CRITÉRIOS DE AUDITORIA

| ID | Critério | Evidência exigida | Condição de reprovação |
|---|---|---|---|
| AUD-XII-01 | Instalação | `AEOS/` e `MISSOES/<slug>/` presentes | Falta um dos dois |
| AUD-XII-02 | Ficha completa | Campos obrigatórios preenchidos | Campo obrigatório vazio |
| AUD-XII-03 | Rito declarado antes | Data do campo RITO | Posterior ao primeiro artefato de análise |
| AUD-XII-04 | Limiares calibrados | Percentual e nota mínima com motivo | Valor sem motivo |
| AUD-XII-05 | Estrutura canônica | Árvore do Art. 132, com `MEMORIA/` e `LOG-PROGRESSO.md` | Arquivo renomeado, etapa sem diretório ou `MEMORIA/` ausente |
| AUD-XII-06 | Twin completo | As sete camadas preenchidas na profundidade do rito | Camada ausente, só com título, ou profundidade abaixo da exigida |
| AUD-XII-07 | Marcação da Matriz | Símbolo em cada item | Item sem marcador |
| AUD-XII-08 | Confiança rastreável | Evidência na linha de progresso | Delta sem evidência |
| AUD-XII-09 | Portão de descoberta | Avaliação de todos os critérios do Art. 30, um a um | Portão não avaliado ou qualquer critério do Art. 30 falhando |
| AUD-XII-10 | Sem solução precoce | Datas dos arquivos de proposta | Proposta anterior ao portão |
| AUD-XII-11 | Dupla proposta | Duas alternativas e o critério | Uma só alternativa |
| AUD-XII-12 | Achados fechados | `06-RED-TEAM.md` com gravidade G0–G4 e um dos quatro desfechos em todo achado | Vazio sem justificativa escrita de ausência, achado sem desfecho, ou achado G4 ou G3 aberto (Vol. X, Art. 105) |
| AUD-XII-13 | Risco aceito completo | GRAVIDADE, DONO, APROVADOR no nível do Art. 117, GATILHO e PRAZO DE VALIDADE preenchidos | Qualquer um em branco, prazo vencido sem reavaliação, ou G4 aceito |
| AUD-XII-14 | Degradação registrada | Linha citando o Art. 139 | Corte sem registro |
| AUD-XII-15 | Handoff por sessão | Bloco de sete campos | Sessão sem handoff ou campo faltando |
| AUD-XII-16 | Pacote de entrega | Todos os itens do Art. 56, na numeração canônica | Item ausente ou sumário fora dos sete blocos e da ordem canônica |
| AUD-XII-17 | Fato separado de inferência | Seções distintas no Sumário | Afirmação sem classificação |
| AUD-XII-18 | Hipótese que sustenta entrega | Status final nas hipóteses citadas | Recomendação sobre hipótese aberta |
| AUD-XII-19 | Sem número inventado | Origem declarada por número | Número sem origem |
| AUD-XII-20 | Alvo não observado | Campos NÃO OBSERVADO ou Ø | Campo factual sem observação |
| AUD-XII-21 | Aprendizado extraído | Padrões e anti-padrões no encerramento | Encerramento sem entrada no catálogo |
| AUD-XII-22 | Emenda válida | Problema real, artigo citado, impacto | Sem missão de origem ou contra a fonte |
