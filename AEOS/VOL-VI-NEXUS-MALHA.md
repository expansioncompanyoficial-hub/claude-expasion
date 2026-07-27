# AEOS — VOLUME VI
## MALHA DE AGENTES · Codinome NEXUS

> **Versao** 2.0 Genesis · **Artigos** 57–66 (inclui 66-A) · **Atualizado em** 27/07/2026
> **Escopo:** substitui o pipeline sequencial por uma malha paralela de perspectivas coordenada por memoria compartilhada, tornando o AEOS executavel em custo e tempo reais.
> **Pre-requisito:** [Vol. I](VOL-I-GENESIS-CONSTITUICAO.md), [Vol. II](VOL-II-SENATE-GOVERNANCA.md), [Vol. III](VOL-III-PROMETHEUS-DESCOBERTA.md).
> **Alimenta:** [Vol. V](VOL-V-ODIN-EXECUCAO.md), [Vol. IX](VOL-IX-DAEMON-IA.md), [Vol. X](VOL-X-AEGIS-SEGURANCA-AUDITORIA.md), [Vol. XI](VOL-XI-PHOENIX-REINVENCAO.md), [Vol. XII](VOL-XII-FORGE-MANUAL-DE-OPERACAO.md).

---

## PREAMBULO

O pipeline e o inimigo da velocidade. Numa cadeia A → B → C → D, o tempo total e a soma dos tempos, o custo e a soma dos contextos, e cada elo herda os erros do anterior sem poder contesta-los: quem fala primeiro define a moldura de todos. Pior, o pipeline produz **latencia organizacional** — o intervalo entre um fato existir e todas as perspectivas poderem agir sobre ele. Nesse intervalo, trabalho e produzido sobre premissas ja mortas.

O Volume II descreve *quem decide o que*. Este volume descreve *como isso roda sem que o custo exploda*. Conselhos e papeis continuam sendo perspectivas de analise e conjuntos de perguntas obrigatorias — nunca pessoas simuladas. A malha nao adiciona personagens: remove espera.

A regra estrutural e simples. Nenhuma perspectiva pergunta a outra. Toda perspectiva escreve na Memoria Global e le da Memoria Global. O Orquestrador nao e um sabio central: e roteador, detector de colisao e contador de custo.

```
        [UX]   [PRODUTO]   [ARQUITETURA]   [IA]   [SEGURANCA]
           \        \            |          /        /
 [DADOS] ---+--------+-----------+---------+--------+--- [PERFORMANCE]
                      \          |         /
[BACKEND] -------------[  ORQUESTRADOR  ]--------------- [FRONTEND]
                      /          |         \
  [INFRA] ---+--------+----------+---------+--------+--- [PESQUISA]
           /        /            |          \        \
      [DESIGN]  [NEGOCIO]    [GROWTH]   [QUALIDADE]

============ MEMORIA GLOBAL — fonte unica de verdade ============
 fatos | hipoteses | decisoes | riscos | dependencias | conflitos
```

As quinze perspectivas leem e escrevem no mesmo substrato. O Orquestrador so intervem em colisao declarada, decisao acima do nivel local e estouro de orcamento. Fora disso, nao deve existir no caminho critico.

---

## ARTIGO 57 — ELIMINACAO DA LATENCIA ORGANIZACIONAL

E proibido perguntar, esperar ou sincronizar manualmente. Toda informacao relevante e publicada na Memoria Global no momento em que passa a existir, nao no fim do trabalho de quem a descobriu.

**Gatilhos de propagacao obrigatoria.** Nestes casos a escrita interrompe a tarefa em curso:

| Evento | Prazo | Notificados |
|---|---|---|
| Fato que contradiz entrada existente | Imediato | Todas |
| Hipotese muda de faixa de confianca ([Vol. III, Art. 24](VOL-III-PROMETHEUS-DESCOBERTA.md)) | Imediato | Quem declarou dependencia |
| Regra de negocio descoberta ou invalidada | Imediato | Produto, Arquitetura, Seguranca |
| Componente, fluxo ou estado novo mapeado | Fim do bloco | UX, Design, Frontend |
| Restricao tecnica ou legal identificada | Imediato | Todas |

Se uma perspectiva descobre algo e so conta no relatorio final, houve violacao — mesmo que a descoberta esteja correta.

---

## ARTIGO 58 — MEMORIA GLOBAL

A Memoria Global e a **fonte unica de verdade do projeto**. Nenhuma perspectiva recria conhecimento existente nem decide com base em memoria propria nao publicada. E um conjunto de arquivos versionados, **append-only**: nada e apagado; correcao e nova entrada que marca a anterior como SUPERSEDIDA.

**Onde vive.** Dentro da propria missao, no subdiretorio `MEMORIA/` — de `MEMORIA/00-FATOS.md` a `MEMORIA/09-PROCESSO.md`; a estrutura de diretorios da missao e canonica no [Vol. XII, Art. 132](VOL-XII-FORGE-MANUAL-DE-OPERACAO.md). Os nomes da tabela abaixo sao relativos a esse subdiretorio; arquivos da missao que espelham a memoria declaram o espelhamento em vez de duplicar conteudo.

| Arquivo | Guarda | Escreve | Le |
|---|---|---|---|
| `00-FATOS.md` | Observacoes diretas | Todas | Todas |
| `01-HIPOTESES.md` | Inferencias com confianca | Todas | Todas |
| `02-DECISOES.md` | Registro de decisao ([Vol. V, Art. 54](VOL-V-ODIN-EXECUCAO.md)) | Orquestrador | Todas |
| `03-RISCOS.md` | Risco, impacto, dono | Seguranca, Qualidade | Todas |
| `04-DEPENDENCIAS.md` | Declaracoes do Art. 62 | Todas | Orquestrador |
| `05-OBJETIVOS.md` | Missao, restricoes, calibracoes | Produto, Negocio | Todas |
| `06-MODELO.md` | Digital Twin ([Vol. III, Art. 23](VOL-III-PROMETHEUS-DESCOBERTA.md)) | Arquitetura, UX | Todas |
| `07-CACHE.md` | Padroes reutilizaveis (Art. 60) | Orquestrador | Todas |
| `08-CONFLITOS.md` | Contradicoes abertas | Orquestrador | Todas |
| `09-PROCESSO.md` | Metricas do processo (Art. 65) | Orquestrador | Orquestrador |

**Formato canonico de entrada** (uma linha por fato, campos separados por barra vertical):

```
ID | data | perspectiva | classe | confianca | afirmacao | evidencia | estado
F-014 | 27/07/2026 | UX | ✔ | 95% | a listagem tem estado vazio | observacao direta | VIGENTE
H-031 | 27/07/2026 | PERF | △ | 60% | ha N+1 na listagem | 3 chamadas por linha | VIGENTE
```

`classe` usa a Matriz de Conhecimento ([Vol. III, Art. 25](VOL-III-PROMETHEUS-DESCOBERTA.md)): ✔ confirmada, △ provavel, ? hipotese, Ø nao observada, ⚠ contraditoria.

**Regra de resolucao de conflito.** Quando duas perspectivas escrevem fatos incompativeis sobre o mesmo objeto, aplique nesta ordem e pare no primeiro criterio que decidir:

1. Observacao direta vence inferencia, sempre ([Vol. III, Art. 22](VOL-III-PROMETHEUS-DESCOBERTA.md)).
2. Entre observacoes diretas, a mais recente vence — desde que a fonte seja de qualidade igual ou superior.
3. Entre fontes equivalentes e igualmente recentes, o objeto e reclassificado como ⚠ e registrado em `08-CONFLITOS.md`.
4. Enquanto houver conflito aberto, **fica proibido decidir sobre aquele objeto**; trabalho dependente e suspenso ou marcado como especulativo (Art. 59).
5. Conflito nao resolvido em um ciclo escala ao Roteador (Art. 63) e, se persistir, ao Protocolo de Divergencia ([Vol. II, Art. 20](VOL-II-SENATE-GOVERNANCA.md)).

Nunca sobrescreva: um fato apagado destroi a rastreabilidade da decisao que ele sustentou.

---

## ARTIGO 59 — EXECUCAO ESPECULATIVA

Perspectivas nao esperam a decisao final: preparam alternativas em paralelo. UX propoe tres jornadas enquanto Arquitetura avalia impacto, Performance estima custo, Seguranca levanta risco, Produto mede valor e IA avalia automacao. Quando a escolha e feita, a maior parte do trabalho ja existe.

**Gatilho.** Especule quando `custo de esperar > custo de descartar`. Operacionalmente, com cortes que sao convencao deste framework: especule se a probabilidade estimada de aproveitamento for maior ou igual a 30% **e** houver no maximo 4 alternativas plausiveis. Calibre por projeto: com orcamento apertado, suba o corte para 50%; quando a espera bloqueia muitas frentes, desca para 20%.

**Limites absolutos.** E proibido especular quando a preparacao implicar:

| Situacao | Motivo |
|---|---|
| Decisao irreversivel (migracao, exclusao) | Descarte nao restaura o estado anterior |
| Efeito colateral externo (envio, deploy, chamada paga) | O mundo nao faz rollback |
| Objeto com conflito ⚠ aberto | Base contraditoria multiplica retrabalho |
| Mais de 4 ramos plausiveis | Custo cresce mais rapido que o ganho |

Todo artefato especulativo nasce marcado `ESPECULATIVO` e so vira vigente apos a decisao correspondente entrar em `02-DECISOES.md`. Ramo descartado e registrado, nao apagado: e evidencia para o Art. 65.

---

## ARTIGO 60 — CACHE DE DECISOES

Problema recorrente nao e reanalisado do zero. Toda decisao validada vira entrada em `07-CACHE.md`, com cinco campos obrigatorios:

```
PROBLEMA CANONICO ...: nome estavel e generico
CONTEXTO DE APLICAB. : condicoes que precisam ser TODAS verdadeiras
SOLUCAO PADRAO ......: o que fazer, em termos de decisao, nao de codigo
QUANDO NAO USAR .....: contra-indicacoes explicitas
REVALIDAR EM ........: data limite de reexame
```

**Regra de acerto.** So reutilize se **todas** as condicoes de aplicabilidade forem verdadeiras no caso atual. Se uma falhar, nao e reuso: e adaptacao, e gera entrada derivada com referencia a origem. Prazo padrao de revalidacao: 180 dias — convencao do framework, encurtada para 90 em dominios com regulacao ativa ou dependencia de fornecedor externo.

**Problemas canonicos iniciais.** Autenticacao · permissoes e papeis · onboarding · tabelas e listagens · paginacao · busca · upload · notificacoes · formularios longos · estados vazios · tratamento de erro · importacao e exportacao.

Nenhum destes doze pode ser resolvido por opiniao caso a caso enquanto existir entrada vigente no catalogo. Divergir do catalogo e permitido; divergir sem registrar o motivo, nao.

---

## ARTIGO 61 — MINIMO CONTEXTO NECESSARIO

Contexto e concedido por necessidade declarada, nunca por conveniencia. Cada perspectiva recebe o pacote minimo que permite responder as suas perguntas obrigatorias — objetivo, fatos do escopo, restricoes aplicaveis, entradas de cache pertinentes e nada mais.

**Teste do item superfluo.** Se remover um item do pacote nao mudaria a resposta produzida, o item nao deveria estar la. Aplique o teste ao montar o pacote, nao depois.

Contexto excessivo nao e neutro: aumenta custo, dilui foco e faz perspectivas opinarem fora do seu dominio, gerando conflito artificial no Art. 62. Quem precisar de mais pede ao Orquestrador declarando **qual pergunta** nao consegue responder sem ele.

---

## ARTIGO 62 — DETECCAO PRECOCE DE CONFLITOS

Conflito descoberto na integracao ja custou o dobro. Vale o **Protocolo de Declaracao de Dependencia**: nenhuma perspectiva comeca antes de publicar em `04-DEPENDENCIAS.md`:

```
PERSPECTIVA : qual
LE          : objetos que vai consultar
ESCREVE     : objetos que vai criar ou alterar
ASSUME      : invariantes tratadas como verdadeiras (com ID do fato)
ENTREGA     : artefato esperado
ORCAMENTO   : limite de esforco antes de reportar
```

**Deteccao de colisao pelo Orquestrador, antes da integracao:**

| Tipo | Deteccao | Acao |
|---|---|---|
| Escrita concorrente | `ESCREVE(A) ∩ ESCREVE(B) ≠ ∅` | Serializar ou dividir o objeto |
| Premissa quebrada | `ASSUME(A)` esta em `ESCREVE(B)` | Notificar A antes de B concluir |
| Leitura suja | `LE(A)` contem objeto ⚠ | Suspender A ou marcar saida especulativa |
| Duplicacao | Mesmo artefato em duas entregas | Fundir escopo, liberar orcamento |
| Orfao | Lido por muitos, escrito por ninguem | Atribuir dono explicito |

A verificacao roda a cada nova declaracao — nunca apenas no inicio.

---

## ARTIGO 63 — ROTEADOR DE DECISOES

Nem toda decisao passa por todos. Rotear e o principal mecanismo de economia da malha. Pontue de 1 a 3 em tres eixos e some (convencao do framework):

`Escopo = Reversibilidade + Alcance + Custo do erro`

| Faixa | Nivel | Quem decide | Registro exigido |
|---|---|---|---|
| 3–4 | Local | Uma perspectiva | Linha em `02-DECISOES.md` |
| 5–6 | Multidisciplinar | Perspectivas afetadas | Registro resumido |
| 7–8 | Estrutural | Conselhos ([Vol. II, Art. 14](VOL-II-SENATE-GOVERNANCA.md)) | Registro completo + trade-offs |
| 9 | Estrategica | Conselho Executivo | Registro completo + plano de reversao |
| gatilho: irreversibilidade = 3 **OU** custo do erro = 3, independentemente da soma | Irreversivel / risco critico | Conselhos relevantes + Seguranca + Qualidade | Registro completo + plano de reversao |

A quinta classe nao e faixa de soma: e acionada pelo gatilho e prevalece sobre qualquer faixa que a soma produziria — substitui a antiga regra de elevacao para no minimo Estrutural. Duvida sobre a classe resolve-se sempre para cima.

---

## ARTIGO 64 — PRIORIZACAO DINAMICA

Backlog nao e estatico. Cada item carrega uma pontuacao reavaliada, nao um lugar na fila.

`Prioridade = (Valor×3 + Risco mitigado×2 + Desbloqueio×2 + Urgencia×1) / Esforco`

Os pesos 3/2/2/1 sao convencao deste framework. Calibre por fase: em descoberta, suba Desbloqueio; em endurecimento pre-entrega, suba Risco mitigado. Declare a calibracao em `05-OBJETIVOS.md` antes de usa-la.

**Gatilho de reavaliacao.** Reordene sempre que a Memoria Global receber: fato que contradiz premissa de um item; risco novo de impacto alto; conclusao que desbloqueia tres ou mais itens; estouro de orcamento em qualquer frente. Reordenacao sem gatilho fica proibida.

---

## ARTIGO 65 — OBSERVABILIDADE DA PROPRIA ANALISE

O AEOS mede o proprio processo em `09-PROCESSO.md`:

| Metrica | O que revela |
|---|---|
| Taxa de retrabalho | Quanto foi descartado por premissa errada |
| Profundidade de revisao | Voltas ate a decisao estabilizar |
| Latencia de propagacao | Tempo entre o fato existir e ser publicado |
| Acerto especulativo | Fracao do trabalho especulativo aproveitado |
| Reuso de cache | Decisoes resolvidas por catalogo |
| Densidade de conflito | Conflitos abertos por objeto do modelo |
| Contexto medio | Volume entregue por perspectiva |
| Cobertura de evidencia | Conclusoes com evidencia rastreavel |

**Proibicao de metrica como meta.** Estas metricas sao diagnosticas. E proibido transforma-las em objetivo, meta contratual ou criterio de aprovacao. Uma medida que vira meta deixa de medir.

**Gatilho de corrupcao.** Se qualquer metrica desta tabela melhorar enquanto a Matriz de Excelencia ([Vol. V, Art. 51](VOL-V-ODIN-EXECUCAO.md)) ficar igual ou pior, declare o processo corrompido, congele a metrica e registre a ocorrencia. Exemplos: elevar reuso de cache aplicando padrao fora de contexto; zerar densidade de conflito deixando de declarar dependencias; reduzir profundidade de revisao aprovando sem critica.

---

## ARTIGO 66 — APRENDIZADO ORGANIZACIONAL

Toda execucao termina com um ritual de fechamento que atualiza cinco artefatos: catalogo de padroes, catalogo de anti-padroes, decisoes reutilizaveis, checklists e heuristicas de estimativa.

**Regra de promocao.** Um padrao so entra no catalogo apos resultado verificado em duas execucoes independentes — convencao do framework, elevada para tres em dominios de alto risco. Um **anti-padrao entra na primeira ocorrencia de dano**: a assimetria e deliberada, porque repetir erro conhecido custa mais que descartar padrao promissor.

Se duas execucoes consecutivas apresentarem a mesma causa raiz de retrabalho, o catalogo falhou e deve ser revisado antes da proxima missao.

---

## ARTIGO 66-A — ORQUESTRACAO PRATICA

Traducao da malha para a operacao real dentro do Claude Code.

**Roda em paralelo:** investigacao de telas, fluxos e componentes distintos; benchmark de referencias independentes; critica por perspectivas diferentes sobre a mesma proposta; geracao de alternativas especulativas.

**Barreira de sincronizacao** e o ponto em que tudo para ate o ultimo resultado chegar. E cara por tres motivos: o custo e o do ramo mais lento, nao o da media; todo contexto fica retido ate a liberacao; falha em um ramo bloqueia os demais.

**Regra.** Use barreira **somente** quando a etapa seguinte precisa de TODOS os resultados anteriores ao mesmo tempo. Caso contrario, cada item segue seu proprio caminho ate o fim.

| Precisa de barreira | Nao precisa |
|---|---|
| Deduplicar antes de verificar | Investigar cada tela |
| Ranquear um conjunto completo | Registrar decisao de modulo isolado |
| Somar orcamento ou impacto agregado | Buscar referencia externa |
| Votacao, veto e auditoria final ([Vol. V, Art. 55](VOL-V-ODIN-EXECUCAO.md)) | Criticar sob uma perspectiva |
| Fechar o Digital Twin ([Vol. III, Art. 30](VOL-III-PROMETHEUS-DESCOBERTA.md)) | Mapear componentes distintos |

**Escrita concorrente.** Cada perspectiva escreve apenas entradas novas, com ID proprio e prefixo de origem. Nunca edite linha alheia. Isso elimina corrida de escrita sem bloqueio e e o que permite paralelismo largo sem coordenacao explicita.

---

## PRINCIPIOS DO VOLUME

- **P-VI-01 — Malha, nao cadeia.** Nenhuma perspectiva e pre-requisito de outra sem colisao declarada. Dependencia nao declarada e tratada como inexistente.
- **P-VI-02 — Perguntar e falha de projeto.** Se foi preciso perguntar a outra perspectiva, a informacao deveria estar na memoria. Corrija a memoria, nao a pergunta.
- **P-VI-03 — Memoria e verdade.** O que nao esta na Memoria Global nao existe para efeito de decisao, mesmo que alguem "saiba".
- **P-VI-04 — Append-only.** Correcao e nova entrada referenciando a anterior. Apagar destroi a rastreabilidade da decisao que o fato sustentou.
- **P-VI-05 — Observacao vence inferencia.** Em qualquer conflito, o fato observado prevalece sobre a inferencia mais elegante.
- **P-VI-06 — Conflito congela decisao.** Objeto ⚠ nao sustenta decisao; trabalho dependente vira especulativo ou para.
- **P-VI-07 — Confianca viaja junto.** Nenhuma afirmacao circula sem classe da Matriz de Conhecimento e percentual de confianca.
- **P-VI-08 — Especular so com descarte barato.** Se descartar custa mais que esperar, espere.
- **P-VI-09 — Nunca especule com efeito externo.** Preparacao que altera o mundo fora do projeto nao e especulacao, e execucao.
- **P-VI-10 — Especulativo e rotulado.** Artefato sem rotulo e tratado como vigente — origem mais comum de decisao contaminada.
- **P-VI-11 — Cache exige contexto integral.** Reuso sem todas as condicoes satisfeitas e adaptacao disfarcada e produz falso padrao.
- **P-VI-12 — Todo padrao tem validade.** Entrada de catalogo sem data de revalidacao e divida tecnica de conhecimento.
- **P-VI-13 — Divergir exige motivo escrito.** A liberdade de divergir do catalogo e preservada; a divergencia silenciosa, nao.
- **P-VI-14 — Contexto minimo.** Entregue o que muda a resposta. Item que nao muda a resposta e custo puro.
- **P-VI-15 — Pedido de contexto e nominal.** Quem pede mais contexto declara qual pergunta nao consegue responder sem ele.
- **P-VI-16 — Declare antes de comecar.** Trabalho iniciado sem declaracao de dependencia nao entra na integracao.
- **P-VI-17 — Colisao detectada por conjunto.** A deteccao e mecanica: intersecao entre conjuntos declarados, nao percepcao de quem coordena.
- **P-VI-18 — Orfao tem dono.** Objeto lido por varios e escrito por ninguem recebe dono explicito antes de qualquer decisao.
- **P-VI-19 — Rotear e economizar.** Levar decisao local ao conselho desperdica tanto quanto decidir estrutura sozinho.
- **P-VI-20 — Irreversibilidade ou custo maximo do erro aciona a quinta classe.** Irreversibilidade 3 ou custo do erro 3 leva a decisao a "Irreversivel / risco critico", independentemente da soma.
- **P-VI-21 — Duvida sobe.** Incerteza sobre a faixa de roteamento resolve-se sempre para o nivel superior.
- **P-VI-22 — Prioridade e funcao, nao fila.** Backlog guarda pontuacao e insumos, nunca posicao fixa.
- **P-VI-23 — Reordenar exige gatilho.** Reordenacao sem fato novo consome atencao sem produzir informacao.
- **P-VI-24 — Peso declarado.** Todo peso, corte ou limite deste volume e convencao arbitraria e deve ser recalibrado e registrado por projeto.
- **P-VI-25 — Metrica de processo nunca vira meta.** Otimizar a medida em vez do resultado corrompe o processo e invalida a execucao.
- **P-VI-26 — Barreira e ultimo recurso.** Sincronize so quando a etapa seguinte exige o conjunto completo; senao, deixe cada item seguir.
- **P-VI-27 — Anti-padrao entra na primeira dor.** Padrao exige repeticao para ser promovido; erro nao exige repeticao para ser catalogado.

---

## CHECKLIST DO VOLUME

- [ ] CK-VI-01 — Todos os arquivos da Memoria Global existem no subdiretorio `MEMORIA/` da missao, de `MEMORIA/00-FATOS.md` a `MEMORIA/09-PROCESSO.md`, e cada um tem dono de escrita declarado.
- [ ] CK-VI-02 — Toda entrada de `00-FATOS.md` e `01-HIPOTESES.md` traz ID, perspectiva, classe da Matriz de Conhecimento, confianca e evidencia.
- [ ] CK-VI-03 — Nenhuma linha da memoria foi apagada ou reescrita; correcoes aparecem como entradas SUPERSEDIDAS.
- [ ] CK-VI-04 — Todo objeto marcado ⚠ tem entrada correspondente em `08-CONFLITOS.md`.
- [ ] CK-VI-05 — Nenhuma decisao em `02-DECISOES.md` depende de objeto com conflito aberto.
- [ ] CK-VI-06 — Todo artefato produzido antes da decisao correspondente esta rotulado como `ESPECULATIVO`.
- [ ] CK-VI-07 — Nenhuma especulacao envolveu acao irreversivel ou efeito colateral externo.
- [ ] CK-VI-08 — Toda entrada de `07-CACHE.md` tem os cinco campos e data de revalidacao futura.
- [ ] CK-VI-09 — Cada perspectiva ativa publicou LE, ESCREVE, ASSUME, ENTREGA e ORCAMENTO antes de iniciar.
- [ ] CK-VI-10 — O Orquestrador registrou o resultado da verificacao de colisao a cada nova declaracao.
- [ ] CK-VI-11 — Toda decisao registrada indica a classe de roteamento aplicada — inclusive "Irreversivel / risco critico" quando o gatilho ocorre — e o registro exigido por ela.
- [ ] CK-VI-12 — Os pesos de priorizacao e os cortes de especulacao estao declarados em `05-OBJETIVOS.md`.
- [ ] CK-VI-13 — Cada barreira de sincronizacao tem justificativa escrita de por que a etapa seguinte exigia o conjunto completo.
- [ ] CK-VI-14 — O ritual de fechamento atualizou os cinco artefatos de aprendizado.

---

## CRITERIOS DE AUDITORIA

| ID | Criterio | Evidencia exigida | Condicao de reprovacao |
|---|---|---|---|
| AUD-VI-01 | Memoria instalada | `MEMORIA/00-FATOS.md` a `MEMORIA/09-PROCESSO.md` presentes no diretorio da missao | Um ou mais ausentes ou fora de `MEMORIA/` |
| AUD-VI-02 | Formato de entrada | Amostra de 20 entradas | Entrada sem ID, classe, confianca ou evidencia |
| AUD-VI-03 | Imutabilidade | Historico de versoes | Linha alterada ou removida sem entrada SUPERSEDIDA |
| AUD-VI-04 | Publicacao imediata | Data do fato x da entrada | Gatilho imediato publicado apos o fim da tarefa |
| AUD-VI-05 | Conflitos registrados | `08-CONFLITOS.md` | Objeto ⚠ sem entrada de conflito |
| AUD-VI-06 | Congelamento de decisao | Decisoes x conflitos | Decisao apoiada em objeto ⚠ aberto |
| AUD-VI-07 | Ordem de resolucao | Nota de resolucao | Inferencia prevalecendo sobre observacao direta |
| AUD-VI-08 | Rotulagem especulativa | Artefatos produzidos | Artefato pre-decisao sem rotulo `ESPECULATIVO` |
| AUD-VI-09 | Limite de especulacao | Lista de ramos | Ramo com efeito externo, irreversivel ou acima de 4 |
| AUD-VI-10 | Descarte registrado | Registro de ramos | Ramo descartado sem registro |
| AUD-VI-11 | Integridade do cache | `07-CACHE.md` | Entrada sem "quando NAO usar" ou sem revalidacao |
| AUD-VI-12 | Reuso legitimo | Contexto x caso | Reuso com uma condicao de aplicabilidade falsa |
| AUD-VI-13 | Divergencia justificada | Registro de decisao | Divergencia do catalogo sem motivo escrito |
| AUD-VI-14 | Contexto minimo | Pacotes por perspectiva | Item que nao altera a resposta produzida |
| AUD-VI-15 | Declaracao previa | `04-DEPENDENCIAS.md` datado | Trabalho iniciado antes da declaracao |
| AUD-VI-16 | Deteccao de colisao | Log do Orquestrador | Colisao descoberta apenas na integracao |
| AUD-VI-17 | Roteamento correto | Pontuacao dos tres eixos | Decisao com irreversibilidade 3 ou custo do erro 3 resolvida fora da classe "Irreversivel / risco critico", ou sem Seguranca, Qualidade, registro completo e plano de reversao |
| AUD-VI-18 | Priorizacao com gatilho | Historico de reordenacoes | Reordenacao sem fato novo na memoria |
| AUD-VI-19 | Pesos declarados | `05-OBJETIVOS.md` | Peso, corte ou limite usado sem declaracao |
| AUD-VI-20 | Metrica nao virou meta | `09-PROCESSO.md` x Art. 51 | Metrica melhora com Matriz de Excelencia igual ou pior |
| AUD-VI-21 | Barreira justificada | Justificativa por barreira | Barreira sem etapa que exija o conjunto completo |
| AUD-VI-22 | Fechamento executado | Cinco artefatos atualizados | Encerramento sem atualizar ao menos um dos cinco |
| AUD-VI-23 | Promocao de padrao | Historico de aplicacoes | Padrao promovido abaixo da convencao declarada |
