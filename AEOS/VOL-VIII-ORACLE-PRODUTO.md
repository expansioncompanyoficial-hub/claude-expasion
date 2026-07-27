# AEOS — VOLUME VIII
## PRODUTO E VALOR · Codinome ORACLE

> **Versao** 2.0 Genesis · **Artigos** 79 a 90 · **Atualizado em** 27/07/2026
> **Escopo:** converter analise de telas em analise de valor entregue, medido por metricas instrumentadas, contrapesadas e auditaveis.
> **Pre-requisito:** [Vol. I, Art. 4 e 11](VOL-I-GENESIS-CONSTITUICAO.md), [Vol. III, Art. 22, 24 e 26](VOL-III-PROMETHEUS-DESCOBERTA.md), [Vol. II, Art. 14](VOL-II-SENATE-GOVERNANCA.md).
> **Alimenta:** [Vol. IX](VOL-IX-DAEMON-IA.md) (o que a IA deve eliminar), [Vol. V, Art. 47 e 56](VOL-V-ODIN-EXECUCAO.md) (impacto e entrega), [Vol. XI](VOL-XI-PHOENIX-REINVENCAO.md) (reinvencao).

## PREAMBULO

Ate aqui o AEOS olhou o sistema como estrutura: telas, componentes, estados, fronteiras, dependencias. Este volume troca a unidade de observacao. A partir do Artigo 79, a pergunta deixa de ser "o que existe nesta tela" e passa a ser "que progresso um ser humano conseguiu fazer por causa disto, e como isso foi medido".

A troca nao e retorica. Um sistema pode ter arquitetura correta, performance adequada e seguranca defensavel e ainda assim nao entregar valor algum — porque entrega funcionalidade, e funcionalidade nao e valor. Valor e progresso obtido pelo usuario em uma tarefa que ele ja tentava executar antes do produto existir. Tudo o mais e custo: de construcao, de manutencao, de atencao e de carga cognitiva.

Quatro compromissos regem o volume. Nenhuma decisao de produto podera ser sustentada por preferencia, por pedido isolado de cliente ou por comparacao com concorrente. Toda metrica citada em artefato do AEOS existira como ficha formal — definicao, evento que a instrumenta, comportamento perverso que ela induz se virar meta, e contrapeso que impede essa corrupcao; metrica sem contrapeso e proibida. Nenhum numero de mercado sera assumido: faixas aqui sao convencoes internas provisorias, substituidas pelos dados reais do produto. E o que nao sera feito e tao normativo quanto o que sera — recusa exige registro, e remover e decisao de produto com rito proprio, nao faxina tecnica.

O sistema-alvo futuro do AEOS ainda nao foi observado; nenhum artigo aqui descreve seu funil, suas metricas ou seus usuarios.

---

## ARTIGO 79 — FUNCIONALIDADE NAO E VALOR

Funcionalidade e o que o produto faz; valor e o progresso que o usuario obtem. Podem crescer em direcoes opostas: cada funcionalidade adicionada consome atencao, aumenta carga cognitiva e amplia a superficie de manutencao.

Toda funcionalidade, proposta ou existente, e classificada abaixo antes de qualquer estimativa de esforco.

| Categoria | Definicao | Destino |
|---|---|---|
| Portadora de valor | Executa ou encurta a tarefa central do usuario | Manter e otimizar |
| Habilitadora | Nao entrega valor sozinha, mas viabiliza uma portadora | Manter enquanto a portadora existir |
| Compensatoria | Existe para corrigir uma falha de projeto de outra parte | Candidata a remocao pela causa raiz |
| Residual | Nao serve tarefa alguma verificavel | Aposentadoria (Art. 90) |

Gatilho: toda funcionalidade classificada como Compensatoria ou Residual entra automaticamente na fila de eliminacao definida em [Vol. I, Art. 11](VOL-I-GENESIS-CONSTITUICAO.md), e devera ser submetida ao exame de eliminacao por IA de [Vol. IX](VOL-IX-DAEMON-IA.md) antes de qualquer proposta de melhoria incremental.

---

## ARTIGO 80 — JOBS TO BE DONE COMO INSTRUMENTO DE INVESTIGACAO

JTBD e instrumento de investigacao. Um job e a tarefa que o usuario contrata o produto para executar, descrita sem mencionar o produto.

**Formato canonico do enunciado de tarefa adotado pelo AEOS:**

```
Quando <situacao/gatilho concreto>,
eu quero <progresso desejado, verbo de resultado>,
para que <ganho final>,
sem <custo/risco que o usuario recusa pagar>.
```

A clausula "sem" e obrigatoria: expoe a restricao que a maioria das solucoes viola e onde nasce a friccao mapeada em [Vol. III, Art. 26](VOL-III-PROMETHEUS-DESCOBERTA.md).

Perguntas obrigatorias de validacao: (1) Qual era a solucao anterior, mesmo improvisada? (2) O que provocou a troca? (3) Com que frequencia a situacao ocorre? (4) O que o usuario faz depois de concluir? (5) Quem mais e afetado pelo resultado? Job cujo enunciado cite tela, botao ou funcionalidade e invalido e devera ser reescrito.

---

## ARTIGO 81 — PROPOSTA DE VALOR E A HIPOTESE QUE A SUSTENTA

Toda proposta de valor e hipotese ate ser medida, e sera escrita como tal, com nivel de confianca segundo [Vol. III, Art. 24](VOL-III-PROMETHEUS-DESCOBERTA.md).

**Artefato obrigatorio — Ficha de Proposta de Valor:** job atendido; segmento; alternativa atual do usuario; ganho em unidade mensuravel (tempo, erro evitado, dinheiro, decisao possibilitada); a crenca que precisa ser verdadeira para o ganho existir; o sinal que a confirmaria; o sinal que a refutaria; confianca atual.

Regra de invalidacao: proposta sem sinal de refutacao nao entra em roadmap. Se nenhuma observacao possivel derruba a hipotese, ela nao e hipotese — e opiniao, proibida por [Vol. V, Art. 49](VOL-V-ODIN-EXECUCAO.md).

---

## ARTIGO 82 — ANATOMIA DE UMA METRICA E A LEI DO CONTRAPESO

Nenhuma metrica podera ser citada, exibida em painel ou usada como meta sem a ficha abaixo.

**Ficha de Metrica (cinco campos obrigatorios):** (1) definicao exata, com janela temporal e populacao; (2) instrumentacao — evento, atributos e ponto do codigo que o emite; (3) corrupcao — o comportamento perverso que ela induz se virar meta; (4) contrapeso — a metrica que sobe quando a corrupcao ocorre; (5) dono e cadencia de leitura.

| Metrica | Corrupcao provavel | Contrapeso obrigatorio |
|---|---|---|
| Taxa de ativacao | Rebaixar a definicao de ativacao ate qualquer clique contar | Retencao da coorte ativada |
| Tempo de sessao | Tornar o fluxo mais lento e confuso de proposito | Tempo ate concluir a tarefa |
| Volume de funcionalidades entregues | Entregar muito e usado por ninguem | Percentual de funcionalidades com uso recorrente |
| Conversao para pago | Prometer o que o produto nao entrega | Cancelamento e reembolso na coorte convertida |

---

## ARTIGO 83 — METRICA NORTE E ARVORE DE METRICAS DE APOIO

A metrica norte sobe apenas quando o usuario obteve valor real, e e medida em unidades de trabalho concluido. Nao e receita: receita pode subir com valor caindo.

Criterios de aceitacao: (a) representa progresso do usuario, nao esforco do time; (b) e instrumentavel por evento unico; (c) o time a influencia em ate um ciclo de trabalho; (d) tem contrapeso declarado; (e) resiste ao teste de corrupcao: se dobrasse artificialmente, o usuario estaria melhor?

```
                   METRICA NORTE
                        |
   +--------------+-----+------+--------------+
   |              |            |              |
 ALCANCE      FREQUENCIA   PROFUNDIDADE    QUALIDADE
 (quantos)    (quantas     (quanto do      (taxa de
              vezes)       job cobre)      sucesso)
   |              |            |              |
 metricas de apoio, cada uma com ficha e contrapeso proprios
```

**Modelo de Engajamento — nome canonico dos quatro eixos:** alcance, frequencia, profundidade e qualidade constituem o modelo de ENGAJAMENTO do AEOS; onde o briefing ou qualquer artefato disser "engajamento", le-se este conjunto de quatro eixos, nunca curtida, visualizacao, tempo de tela ou numero unico. Engajamento e leitura de como o valor acontece — jamais metrica norte, jamais meta isolada: sua corrupcao e multiplicar as interacoes exigidas para concluir o job; seu contrapeso obrigatorio e o eixo QUALIDADE lido junto ao tempo ate concluir a tarefa.

Convencao do framework: uma metrica norte por produto e no maximo quatro metricas de apoio por nivel. O limite e arbitrario e existe para impedir dispersao; calibre-o pelo numero de equipes autonomas, nunca pelo de funcionalidades.

---

## ARTIGO 84 — O FUNIL DE VIDA DO USUARIO COMO SISTEMA

Aquisicao, ativacao, adocao, retencao, receita e indicacao nao sao etapas independentes; sao um sistema com realimentacao. Otimizar uma etapa isolada costuma degradar outra.

```
 AQUISICAO -> ATIVACAO -> ADOCAO -> RETENCAO -> RECEITA -> INDICACAO
     ^                                 |                       |
     +---------------------------------+-----------------------+
        realimentacao: retencao e indicacao reduzem custo de aquisicao
```

**Definicao rigorosa de ativacao:** o momento observavel em que o usuario obteve valor real pela primeira vez. Um candidato a evento de ativacao so e aceito se passar nos tres testes: (1) e evento unico e instrumentado, nao combinacao vaga de uso; (2) a coorte que o executa retem de forma consistentemente superior a que nao o executa; (3) o usuario reconheceria aquele instante como "funcionou".

Proibicoes: cadastro, confirmacao de e-mail, conclusao de tour e visualizacao de tela nunca contam como ativacao. Gatilho: se a taxa de ativacao subir sem que a retencao da coorte suba, a definicao foi corrompida e devera ser reescrita antes de qualquer nova otimizacao.

**Definicao rigorosa de adocao (etapa distinta, jamais fundida com ativacao):** ativacao mede o primeiro valor obtido no produto, uma unica vez por usuario; adocao mede a incorporacao de uma funcionalidade especifica a rotina — percentual da coorte *elegivel e exposta* que a usa de forma recorrente dentro da janela do job (Art. 86), medido por funcionalidade e nunca no agregado do produto. Instrumentacao: evento de uso da funcionalidade + marcador de elegibilidade + marcador de exposicao, sem os quais o numero mede descoberta, nao adocao. Corrupcao: forcar a adocao por interrupcao — modal, tour, bloqueio de fluxo ou destaque compulsorio. Contrapeso obrigatorio: taxa de sucesso na tarefa dentro da funcionalidade adotada. **Regra de eliminacao:** funcionalidade que, apos exposicao e prazo declarados, nao alcanca adocao recorrente em coorte alguma e classificada como Residual pelo Art. 79, entra na fila de eliminacao de [Vol. I, Art. 11](VOL-I-GENESIS-CONSTITUICAO.md) e so sai dela pelo rito de aposentadoria do Art. 90 — melhoria incremental sobre funcionalidade nao adotada e proibida.

**Valor do cliente ao longo do tempo (LTV):** margem liquida acumulada por cliente ao longo da relacao, lida por coorte de entrada e por curva, nunca como media unica da base. Instrumentacao: eventos de receita reconhecida por conta somados ao custo variavel de servir, ambos ligados ao identificador da coorte; sem custo de servir instrumentado o numero e receita bruta acumulada e sera nomeado assim, jamais LTV. Corrupcao: virando meta, induz aprisionamento — fidelizacao compulsoria, cancelamento dificultado, aumento de preco sobre base cativa e venda para segmento que nao tem o job. Contrapeso obrigatorio: cancelamento voluntario da coorte na primeira janela livre de fidelizacao, lido junto ao custo de saida (passos ate cancelar); se o LTV sobe enquanto esse par piora, o ganho e aprisionamento e nao valor, e a meta e invalidada pelo Art. 87. LTV nunca sera metrica norte (Art. 83): e receita derivada de valor, nao unidade de trabalho concluido.

---

## ARTIGO 85 — TEMPO ATE O PRIMEIRO VALOR

Tempo ate o primeiro valor (TPV) e a mediana do intervalo entre o primeiro acesso e o evento de ativacao, por coorte. E metrica de projeto: cada etapa obrigatoria antes do valor e uma decisao de engenharia que pode ser eliminada, adiada ou preenchida automaticamente.

Protocolo de reducao, nesta ordem: (1) remover a etapa; (2) adia-la para depois do primeiro valor; (3) preenche-la com dado que o sistema ja possui; (4) delega-la a IA conforme [Vol. IX](VOL-IX-DAEMON-IA.md); (5) so entao acelera-la. Otimizar a velocidade de uma etapa que poderia ter sido removida e falha de metodo.

Convencao do framework: sem historico proprio, adote como alvo provisorio a metade da mediana da primeira coorte medida e recalibre a cada coorte. O numero e arbitrario e serve para forcar um alvo declarado. Contrapeso do TPV: taxa de sucesso na tarefa — cortar etapa necessaria reduz o TPV e derruba o sucesso.

---

## ARTIGO 86 — RETENCAO COMO UNICO JUIZ HONESTO

Aquisicao mede promessa. Conversao mede persuasao. Somente a retencao mede valor, porque exige que o usuario volte por decisao propria ja conhecendo o produto.

A retencao sera lida por coorte e por curva, nunca como numero unico. A pergunta de aprovacao e uma: a curva estabiliza em patamar acima de zero? Curva em decaimento continuo indica ausencia de valor, e nenhuma melhoria de aquisicao, preco ou interface podera ser aprovada enquanto isso for verdade.

A janela de leitura acompanha a frequencia natural do job do Artigo 80: job diario le-se em dias, job mensal em meses. Janela mais curta que a frequencia do job produz conclusao falsa. Contrapeso: intensidade de uso por usuario retido — retencao alta com uso decrescente antecipa abandono.

---

## ARTIGO 87 — ANTI-METRICAS E METRICAS DE VAIDADE

Metrica de vaidade sobe com o tempo quase independentemente do valor entregue e nunca desce. Cadastros acumulados, total historico de acessos, contagem de funcionalidades e volume de conteudo publicado sao vaidade por construcao.

Teste de vaidade: (1) Ela pode cair? (2) Se dobrar amanha, alguma decisao muda? (3) Existe acao do time que a suba sem que nenhum usuario conclua uma tarefa? Se as respostas forem nao, nao e sim, a metrica e de vaidade.

E proibido definir meta, priorizar roadmap ou declarar sucesso com base em metrica que nao represente valor entregue. Vaidade pode ser observada como sinal de contexto, nunca perseguida. Toda meta vem acompanhada de sua anti-metrica — o indicador que, se subir junto, invalida o ganho.

---

## ARTIGO 88 — O PEDIDO E O PROBLEMA

O usuario e autoridade absoluta sobre o problema que tem e nenhuma sobre a solucao. Pedido de funcionalidade e dado bruto sobre dor, nunca especificacao.

**Protocolo de tratamento de pedido, obrigatorio e sequencial:**

1. Registrar o pedido literal, sem traducao, com autor, data e contexto.
2. Extrair a situacao concreta que existia quando o pedido nasceu.
3. Reconstruir o job no formato do Artigo 80.
4. Identificar a solucao improvisada usada hoje.
5. Verificar se o produto ja resolve o job e falhou em descoberta — problema de interface, nao de escopo.
6. Agrupar com outros pedidos do mesmo job; a unidade de priorizacao e o job, jamais o pedido.
7. Responder ao autor com o job entendido e o destino da decisao.

Gatilho: pedido que nao sobreviver a reconstrucao do job e arquivado com motivo escrito. Pedido com peso comercial elevado reprovado no passo 3 escala para o Conselho de Produto de [Vol. II, Art. 14](VOL-II-SENATE-GOVERNANCA.md) com o trade-off explicitado — nunca resolvido em silencio pela execucao.

---

## ARTIGO 89 — PRIORIZACAO, O REGISTRO DO NAO E O ROADMAP COMO APOSTAS

Priorizacao sem criterio explicito e preferencia disfarcada. Todo item concorrente e pontuado de 0 a 10 nas dimensoes abaixo; a soma ponderada ordena a fila.

| Dimensao | Peso | Pergunta |
|---|---|---|
| Impacto no job central | 10 | Encurta ou executa a tarefa principal? |
| Forca da evidencia | 9 | Qual o nivel de confianca (Vol. III, Art. 24)? |
| Frequencia do job | 8 | Com que frequencia a situacao ocorre? |
| Alavanca no funil | 8 | Move ativacao, adocao, TPV ou retencao? |
| Custo de nao fazer | 7 | O que se degrada se ficar como esta? |
| Esforco (invertido) | 6 | Quanto custa construir e manter? |
| Risco | 5 | O que pode quebrar ou expor? |

Os pesos sao convencao do framework e devem ser recalibrados por projeto antes da primeira pontuacao, com justificativa registrada. Alterar peso durante a priorizacao para favorecer um item e proibido.

**Registro do Nao:** todo item recusado entra em livro permanente com item, job associado, motivo, evidencia usada e a condicao objetiva que reabriria a decisao. Recusa sem condicao de reabertura e invalida.

**Roadmap como sequencia de apostas:** cada item declara, antes de comecar, a hipotese, a metrica de julgamento, o criterio de sucesso, o criterio de abandono e a data de leitura. Item sem criterio de abandono nao entra no roadmap. Atingido esse criterio, o item e encerrado — reinterpretar o resultado a posteriori e proibido.

---

## ARTIGO 90 — DESCOBERTA CONTINUA, MENOR EXPERIMENTO E RITO DE APOSENTADORIA

Descoberta nao e fase inicial; e atividade permanente, paralela a execucao. Toda hipotese e validada pelo menor experimento capaz de mudar a decisao.

**Escada do menor experimento**, do mais barato ao mais caro; subir um degrau exige justificar por que o anterior nao decide: (1) dado ja instrumentado; (2) observacao de uso real; (3) entrevista sobre a situacao concreta; (4) prototipo sem codigo de producao; (5) implementacao restrita a um subconjunto de usuarios; (6) construcao completa. Experimento sem criterio de decisao escrito antes da coleta e proibido — so produz confirmacao do que ja se acreditava.

**Rito de aposentadoria**, obrigatorio para toda remocao: (1) medir uso real por coorte e por job; (2) declarar a categoria do Artigo 79 que a condena; (3) identificar quem depende dela e qual job fica descoberto; (4) definir substituicao ou migracao do dado; (5) comunicar com antecedencia proporcional a frequencia do job; (6) remover interface, codigo, eventos e documentacao no mesmo ciclo; (7) registrar data e criterio, para que ela nao retorne sem evidencia nova.

Remocao aprovada e nao executada no codigo e no dominio conta como divida, nao como entrega.

---

## PRINCIPIOS DO VOLUME

**P-VIII-01 — Valor e progresso, nao entrega.** Nenhum artefato declara sucesso citando o que foi construido; sucesso se descreve pelo progresso do usuario.
**P-VIII-02 — Toda metrica tem contrapeso.** Metrica sem contrapeso e removida do artefato, nao corrigida depois.
**P-VIII-03 — O job antecede a solucao.** Nenhuma proposta e avaliada antes do job escrito no formato canonico.
**P-VIII-04 — Hipotese precisa poder morrer.** Sem observacao capaz de refuta-la, nao entra em roadmap.
**P-VIII-05 — Ativacao e evento, nao sensacao.** Ativacao sem evento unico instrumentado nao existe para o AEOS.
**P-VIII-06 — Cadastro nunca e ativacao.** Etapa administrativa jamais conta como valor entregue.
**P-VIII-07 — Retencao manda.** Em conflito entre aquisicao e retencao, prevalece a retencao.
**P-VIII-08 — Coorte sempre.** Metrica agregada sem coorte e indicativa, nunca conclusiva.
**P-VIII-09 — Janela igual a frequencia do job.** Ler resultado em janela menor que o job e erro metodologico.
**P-VIII-10 — Remover antes de acelerar.** Otimizar etapa eliminavel e falha de metodo, nao ganho.
**P-VIII-11 — O pedido nao e o escopo.** Pedido entra como evidencia de dor e sai como job agrupado.
**P-VIII-12 — Peso comercial e explicitado.** Item que avanca por razao comercial e registrado como tal.
**P-VIII-13 — O nao tambem e decisao.** Recusa sem registro e sem condicao de reabertura e nula.
**P-VIII-14 — Aposta declara sua morte.** Item de roadmap sem criterio de abandono nao inicia.
**P-VIII-15 — Peso nao muda no meio.** Pesos sao fixados antes da pontuacao e revistos so no ciclo seguinte.
**P-VIII-16 — Vaidade nao vira meta.** Metrica que so sobe pode ser observada; jamais perseguida.
**P-VIII-17 — Toda meta traz sua anti-metrica.** Meta sem indicador de invalidacao e incompleta.
**P-VIII-18 — Sem evento, e estimativa.** Metrica cujo emissor nao esta identificado e tratada como hipotese.
**P-VIII-19 — Convencao declarada.** Todo limite numerico e nomeado como arbitrario e recalibrado com dado proprio; faixa externa nao observada nao sustenta decisao.
**P-VIII-20 — Compensatoria acusa causa raiz.** Funcionalidade que corrige falha alheia aponta o defeito real; corrija a origem.
**P-VIII-21 — Menor experimento primeiro.** Subir degrau exige justificar por que o anterior nao decide.
**P-VIII-22 — Criterio antes do dado.** Definir criterio apos ver o resultado invalida o experimento.
**P-VIII-23 — Uso recorrente e o teste.** Sem uso recorrente em coorte alguma, a funcionalidade e candidata a aposentadoria.
**P-VIII-24 — Remocao e entrega.** O ciclo que remove codigo, evento, interface e documentacao conta como valor produzido.
**P-VIII-25 — Elimine antes de automatizar.** Automatizar o desnecessario e preservar o desnecessario.
**P-VIII-26 — Um norte por produto.** Multiplas metricas norte indicam ausencia de foco, nao maturidade.
**P-VIII-27 — Adocao decide sobrevivencia.** Funcionalidade sem adocao recorrente em coorte alguma e Residual e segue para a fila de eliminacao do Vol. I, Art. 11.
**P-VIII-28 — LTV sem custo de servir e receita acumulada.** LTV e lido por coorte e so vale acompanhado do cancelamento voluntario; LTV que sobe por aprisionamento e vaidade.
**P-VIII-29 — Engajamento sao os quatro eixos.** Alcance, frequencia, profundidade e qualidade; curtida, visualizacao e tempo de tela nao sao engajamento.

## CHECKLIST DO VOLUME

- [ ] CK-VIII-01 — Toda funcionalidade analisada tem categoria do Artigo 79 atribuida.
- [ ] CK-VIII-02 — Cada job esta no formato canonico, com a clausula "sem".
- [ ] CK-VIII-03 — Ha Ficha de Proposta de Valor com sinal de confirmacao e de refutacao.
- [ ] CK-VIII-04 — Toda metrica citada tem os cinco campos da ficha do Artigo 82.
- [ ] CK-VIII-05 — Ha uma unica metrica norte, com teste de corrupcao respondido.
- [ ] CK-VIII-06 — O evento de ativacao esta nomeado e passou nos tres testes do Artigo 84.
- [ ] CK-VIII-07 — O TPV tem mediana por coorte, alvo declarado e contrapeso de sucesso.
- [ ] CK-VIII-08 — A retencao aparece como curva por coorte, na janela do job.
- [ ] CK-VIII-09 — Nenhuma meta se apoia em metrica reprovada no teste de vaidade.
- [ ] CK-VIII-10 — Os pedidos de cliente passaram pelos sete passos do Artigo 88.
- [ ] CK-VIII-11 — A fila de prioridade mostra pontuacao por dimensao e pesos usados.
- [ ] CK-VIII-12 — O Registro do Nao traz motivo, evidencia e condicao de reabertura.
- [ ] CK-VIII-13 — Cada aposta do roadmap declara sucesso, abandono e data de leitura.
- [ ] CK-VIII-14 — Cada experimento tem criterio escrito antes da coleta e degrau justificado.
- [ ] CK-VIII-15 — Cada remocao tem os sete passos do rito de aposentadoria registrados.
- [ ] CK-VIII-16 — Cada funcionalidade tem adocao por coorte elegivel e exposta, com contrapeso de sucesso na tarefa.
- [ ] CK-VIII-17 — O LTV, se citado, esta por coorte, com custo de servir instrumentado e cancelamento voluntario ao lado.
- [ ] CK-VIII-18 — O engajamento reportado esta decomposto nos quatro eixos do Artigo 83.

## CRITERIOS DE AUDITORIA

| ID | Criterio | Evidencia exigida | Condicao de reprovacao |
|---|---|---|---|
| AUD-VIII-01 | Funcionalidade x valor | Classificacao do Art. 79 preenchida | Funcionalidade sem categoria atribuida |
| AUD-VIII-02 | Job valido | Enunciados canonicos, com clausula "sem" | Enunciado cita tela/botao/funcionalidade, ou omite o "sem" |
| AUD-VIII-03 | Hipotese refutavel | Sinal de refutacao por proposta | Proposta de valor sem sinal de refutacao |
| AUD-VIII-04 | Ficha de metrica | Cinco campos por metrica | Metrica sem campo de corrupcao ou de contrapeso |
| AUD-VIII-05 | Instrumentacao real | Evento e ponto emissor nomeados | Metrica sem evento nomeado apresentada como fato |
| AUD-VIII-06 | Norte unica e testada | Norte, apoios e teste de corrupcao | Duas nortes, ou teste de corrupcao ausente |
| AUD-VIII-07 | Ativacao instrumentada | Evento unico + retencao comparada entre coortes | Ativacao definida por cadastro, tour, e-mail ou visualizacao |
| AUD-VIII-08 | Coerencia ativacao-retencao | Serie das duas metricas | Ativacao sobe, retencao nao acompanha e a definicao nao e revista |
| AUD-VIII-09 | TPV medido | Mediana por coorte e alvo declarado | TPV citado sem coorte ou sem alvo |
| AUD-VIII-10 | Ordem do protocolo de TPV | Etapas avaliadas registradas | Etapa acelerada sem avaliar remocao ou adiamento antes |
| AUD-VIII-11 | Retencao por curva e janela | Curva por coorte + frequencia do job | Retencao como numero unico, ou janela menor que o job |
| AUD-VIII-12 | Ausencia de vaidade | Teste de vaidade por meta | Meta em metrica acumulativa que nao pode cair |
| AUD-VIII-13 | Anti-metrica declarada | Par meta/anti-metrica | Meta sem anti-metrica correspondente |
| AUD-VIII-14 | Protocolo de pedido | Pedido literal + job reconstruido | Pedido virou backlog sem os passos 2 e 3 |
| AUD-VIII-15 | Escalonamento comercial | Ata do Conselho de Produto | Item comercial aprovado sem job validado e sem registro |
| AUD-VIII-16 | Priorizacao explicita | Matriz pontuada com pesos | Fila sem pontuacao, ou peso alterado no meio do ciclo |
| AUD-VIII-17 | Registro do Nao | Livro do Nao atualizado | Recusa sem motivo ou sem condicao de reabertura |
| AUD-VIII-18 | Aposta com criterio de morte | Ficha do item de roadmap | Item iniciado sem criterio de abandono e data de leitura |
| AUD-VIII-19 | Integridade do experimento | Criterio datado antes da coleta | Criterio escrito ou alterado apos o resultado |
| AUD-VIII-20 | Degrau justificado | Justificativa na escada | Construcao completa para hipotese decidivel por dado existente |
| AUD-VIII-21 | Rito de aposentadoria | Sete passos registrados | Remocao sem uso medido ou sem caminho de migracao |
| AUD-VIII-22 | Remocao concluida | Diferenca de codigo, eventos e docs | Remocao aprovada ainda presente na interface no ciclo seguinte |
| AUD-VIII-23 | Convencoes declaradas | Marcacao de cada limite numerico | Numero apresentado como padrao de mercado ou benchmark externo |
| AUD-VIII-24 | Amarracao com a eliminacao | Referencia a Vol. I, Art. 11 e Vol. IX nos itens Compensatorios e Residuais | Melhoria incremental sobre item que nunca passou pelo exame de eliminacao |
| AUD-VIII-25 | Adocao medida | Adocao por coorte elegivel e exposta, na janela do job | Funcionalidade em producao sem adocao medida, ou sem adocao recorrente e ainda fora da fila do Vol. I, Art. 11 |
| AUD-VIII-26 | LTV integro | LTV por coorte + custo de servir instrumentado + contrapeso de cancelamento | LTV como media unica da base, sem custo de servir, ou sem cancelamento voluntario ao lado |
| AUD-VIII-27 | Engajamento decomposto | Os quatro eixos do Art. 83, cada um com ficha do Art. 82 | Engajamento como numero unico, ou apoiado em curtida, visualizacao ou tempo de tela |
