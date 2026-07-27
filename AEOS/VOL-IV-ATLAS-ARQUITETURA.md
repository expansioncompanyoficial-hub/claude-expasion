# AEOS — VOLUME IV
## ARQUITETURA · Codinome ATLAS

> **Versao** 2.0 Genesis · **Artigos** 31 a 42 (inclui 36-A, 38-A e 41-A) · **Atualizado em** 27/07/2026
> **Escopo:** Como decidir, registrar, medir e revisar a estrutura tecnica de um produto de modo que a capacidade de evoluir seja preservada.
> **Pre-requisito:** [Vol. I, Arts. 3, 4, 9](VOL-I-GENESIS-CONSTITUICAO.md) e [Vol. III, Arts. 23 a 30](VOL-III-PROMETHEUS-DESCOBERTA.md). Sem Digital Twin fechado, este volume nao se aplica.
> **Alimenta:** [Vol. V, Arts. 48 e 51](VOL-V-ODIN-EXECUCAO.md), [Vol. VI, Art. 60](VOL-VI-NEXUS-MALHA.md), [Vol. IX](VOL-IX-DAEMON-IA.md), [Vol. X](VOL-X-AEGIS-SEGURANCA-AUDITORIA.md).

---

## PREAMBULO

Arquitetura nao e escolher tecnologias. E preservar a capacidade de evolucao do produto. Linguagem, framework, banco e provedor sao consequencia, nunca ponto de partida. Quem comeca pela tecnologia responde antes de ter formulado a pergunta, e o AEOS proibe responder antes de descobrir.

O objetivo nao e construir software. E construir um organismo que possa crescer, adaptar-se e permanecer sustentavel por muitos anos. Um sistema que funciona hoje e nao pode ser alterado amanha ja falhou; apenas ainda nao chegou a fatura. Toda arquitetura sera avaliada por uma pergunta unica: quanto custa mudar de ideia depois de construida?

Se uma decisao facilitar o presente e comprometer o futuro, ela devera ser rejeitada, salvo quando o trade-off for documentado, justificado e aprovado pelo nivel competente. Registrar nao e formalidade: e o mecanismo que transforma preferencia em decisao auditavel. Decisao sem registro nao existe para efeitos do AEOS e sera tratada como divida tecnica de origem desconhecida.

Este volume opera sobre um pressuposto duro: o arquiteto nao conhece o futuro. Logo, nao projetara para um futuro imaginado, e sim para reduzir o custo de estar errado — fronteiras nitidas, contratos explicitos, mudancas reversiveis, comportamento observavel, complexidade contida. Toda estrutura adicional cobra preco permanente; nenhuma entra por moda ou curriculo. Nada aqui autoriza afirmar como um sistema real esta construido: sem observacao registrada conforme [Vol. III, Art. 25](VOL-III-PROMETHEUS-DESCOBERTA.md), toda afirmacao sobre o alvo permanece nao observada (Ø).

---

## ARTIGO 31 — ARQUITETURA COMO SISTEMA

Toda arquitetura sera avaliada em seis dimensoes simultaneas. Excelencia em uma com fraqueza nas demais nao e excelencia; e desequilibrio disfarcado.

| Dimensao | Pergunta obrigatoria | Evidencia exigida |
|---|---|---|
| Estrutural | Quais modulos existem e o que cada um proibe ao outro? | Mapa de modulos e contratos |
| Operacional | Como isso falha e como eu descubro? | Plano de instrumentacao e alarmes |
| Evolutiva | Qual mudanca provavel e mais cara hoje? | Lista de mudancas antecipadas |
| Humana | Quanto tempo ate um novo integrante alterar isto com seguranca? | ADRs e diagrama de contexto |
| Economica | Qual o custo por unidade de uso e como ele cresce? | Custo por cenario de carga |
| Estrategica | Qual objetivo de produto esta decisao serve? | Vinculo com a metrica alvo |

Gatilho: dimensao sem evidencia torna a arquitetura incompleta e impede submete-la a aprovacao.

---

## ARTIGO 32 — PRIMEIROS PRINCIPIOS

Nunca comece pela tecnologia; comece pelo problema. Cinco perguntas obrigatorias, respondidas por escrito antes de qualquer desenho: qual necessidade de negocio isto atende; qual resultado observavel para o usuario; quais restricoes sao reais e verificaveis; quais sao apenas legado herdado; quais pressupostos podem ser descartados sem perda de valor.

Toda restricao sera classificada como fisica, regulatoria, contratual, economica ou cultural. Restricao cultural ou de legado nao justifica sozinha uma decisao: exige registro em ADR como divida assumida. Gatilho: proposta cuja primeira frase contenha o nome de uma tecnologia e devolvida sem analise.

---

## ARTIGO 33 — MODELO DE QUALIDADE ARQUITETURAL

Toda alternativa sera pontuada de 0 a 10 em dez dimensoes, com pesos canonicos. Os pesos sao **convencao declarada do AEOS**, nao verdade universal, e devem ser recalibrados por projeto **antes** de qualquer pontuacao. Recalibrar peso depois de ver o resultado e proibido e caracteriza fraude de avaliacao.

Formula: `Nota = (Σ nota_i × peso_i) / Σ pesos`. Com os pesos canonicos, `Σ pesos = 94`.

**Exemplo.** Alternativa A (monolito modular com fronteiras de dominio) contra Alternativa B (fragmentacao imediata em servicos), em produto sem gatilho de escala independente.

| Dimensao (peso) | A | A×p | B | B×p |
|---|---|---|---|---|
| Escalabilidade (10) | 7 | 70 | 9 | 90 |
| Manutenibilidade (10) | 9 | 90 | 6 | 60 |
| Clareza (9) | 9 | 81 | 5 | 45 |
| Performance (9) | 8 | 72 | 7 | 63 |
| Seguranca (10) | 8 | 80 | 7 | 70 |
| Testabilidade (9) | 9 | 81 | 6 | 54 |
| Observabilidade (8) | 7 | 56 | 6 | 48 |
| Modularidade (10) | 8 | 80 | 9 | 90 |
| Resiliencia (9) | 6 | 54 | 7 | 63 |
| Evolucao futura (10) | 8 | 80 | 7 | 70 |
| **Total ponderado** | | **744** | | **653** |

A = 744 / 94 = **7,91**. B = 653 / 94 = **6,95**.

Leitura: com corte em **7,5** (convencao do AEOS, calibravel por projeto e registrada antes da pontuacao), A e aprovada e B reprovada. A vantagem de B em escalabilidade e real, mas paga com clareza, testabilidade e manutenibilidade — as dimensoes que preservam evolucao. Dimensao de peso 10 abaixo de 6 reprova independentemente da media; nota igual ou inferior a 5 exige mitigacao escrita, como Clareza em B.

---

## ARTIGO 34 — FRONTEIRAS ARQUITETURAIS

Nenhum modulo conhece detalhes internos de outro alem do contrato. Toda dependencia e explicita, toda comunicacao rastreavel, toda responsabilidade com dono declarado.

Regras verificaveis: nenhum modulo acessa tabela, arquivo ou estado interno de outro; toda travessia ocorre por contrato versionado; dependencia ciclica e defeito, nao estilo; contrato quebrado exige versao nova convivendo com a anterior por periodo de transicao declarado.

Gatilho de divisao: modulo que acumular mais de tres responsabilidades de negocio distintas, ou concentrar mais da metade das alteracoes em duas revisoes consecutivas, sera dividido. Os limites sao convencao do AEOS, recalibravel pelo tamanho da equipe.

---

## ARTIGO 35 — EVOLUCAO INCREMENTAL

Toda mudanca devera preservar o que funciona, permitir rollback, ser observavel em producao, ser documentada e minimizar raio de impacto. Reescritas grandes sao excecao e exigem aprovacao estrategica ([Vol. II, Art. 13](VOL-II-SENATE-GOVERNANCA.md)).

**Doutrina de mudanca segura.** Toda mudanca precisa ser reversivel, ou ter o custo da irreversibilidade documentado e aprovado antes da execucao. Nao existe terceira opcao.

| Mecanismo | Obrigatorio quando | Criterio de saida |
|---|---|---|
| Feature flag | Muda comportamento visivel ao usuario | Flag removida na revisao apos o rollout total |
| Canary | Caminho critico ou de dados | Metricas do canario iguais ou melhores que a base |
| Blue-green | Infraestrutura ou versao de runtime | Ambiente antigo mantido ate expirar o rollback |
| Esteira de CI/CD | Sempre; toda mudanca que chega a producao | Build reproduzivel, suite do Art. 41-A verde e implantacao sem passo manual |
| Plano de rollback | Sempre | Passo a passo testado, com tempo alvo |
| Expandir-contrair | Alteracao de esquema de dados | Leitura dupla removida apos backfill validado |

**Entrega progressiva** (*progressive delivery*) e o termo guarda-chuva de feature flag, canary e blue-green: expor a mudanca por estagios, com criterio numerico de avanco e de retorno declarado antes do primeiro estagio. As tres sao politica; a esteira de CI/CD e o mecanismo que as executa. Sem esteira — build, teste automatizado, artefato versionado e implantacao por gatilho — nenhuma delas existe de fato, e rollback vira improviso manual sob pressao.

Irreversiveis por natureza: exclusao definitiva de dados, comunicacao enviada a usuarios, cobranca financeira, quebra de contrato publico. Cada uma exige custo de irreversibilidade registrado e aprovacao nominal.

---

## ARTIGO 36 — OBSERVABILIDADE COMO REQUISITO

Nada e considerado pronto sem meios de observar seu comportamento. Se um problema nao puder ser detectado nem investigado com eficiencia, a arquitetura esta incompleta.

| Componente | Log estruturado | Metrica | Rastreamento | Alarme |
|---|---|---|---|---|
| Endpoint publico | Sim | Latencia, erro, volume | Sim | Erro e latencia |
| Job assincrono / fila | Sim | Fila, atraso, reprocesso | Sim | Atraso e fila morta |
| Integracao externa | Sim | Latencia, queda, custo | Sim | Indisponibilidade |
| Acesso a dados | Amostrado | Tempo de consulta, contencao | Sim | Consulta lenta |
| Interface do usuario | Evento de uso | Tempo ate interacao, erro | Correlacionavel | Pico de erro |
| Dinheiro ou permissao | Sim, imutavel | Divergencia, tentativa negada | Sim | Qualquer divergencia |

**Teste de suficiencia.** A instrumentacao so e aceita se responder, sem escrever codigo novo: *consigo reconstruir o que aconteceu com um usuario especifico, em uma requisicao especifica, em um instante especifico?* Se for preciso adicionar log e reproduzir o caso, a resposta e nao. Todo registro carrega identificador de correlacao propagado de ponta a ponta e jamais dado sensivel em claro.

---

## ARTIGO 36-A — DOUTRINA DE RESILIENCIA

Falha nao e evento excepcional; e regime normal de operacao. Cada mecanismo e opcional ate seu gatilho ser atendido, e obrigatorio depois disso.

| Mecanismo | Gatilho que o torna obrigatorio |
|---|---|
| Timeout explicito | Toda chamada de rede, sem excecao |
| Retry com recuo exponencial e tremor | Falha transitoria observada na dependencia |
| Idempotencia | Operacao repetivel por retry, fila ou usuario |
| Disjuntor | Dependencia externa cuja queda degrada o sistema |
| Degradacao graciosa | Funcionalidade nao essencial em caminho critico |
| Isolamento por comparticao | Consumidor capaz de esgotar recurso comum |
| Teste de caos | Duas ou mais dependencias criticas em producao |
| Recuperacao de desastre | Perda de dados com impacto legal ou financeiro |
| Multi-regiao | Disponibilidade contratada ou base dispersa |

Retry sem idempotencia e proibido: multiplica o dano em vez de corrigi-lo. Metas de tempo e de ponto de recuperacao devem ser numericas, declaradas e exercitadas; numero nao testado e ficcao.

---

## ARTIGO 37 — SEGURANCA COMO PADRAO

Seguranca nao e camada final. Perguntas obrigatorias em toda decisao: quais ativos protegemos; quais riscos existem; como o acesso e controlado; como eventos criticos sao auditados; como dado sensivel e tratado em transito, em repouso e em log; como um incidente e investigado depois de ocorrido.

Padroes nao negociaveis: negar por omissao; menor privilegio; autorizacao verificada no servidor a cada requisicao; segredo fora do codigo; trilha imutavel para acao privilegiada. Modelagem de ameacas em [Vol. X, Art. 104](VOL-X-AEGIS-SEGURANCA-AUDITORIA.md).

---

## ARTIGO 38 — REDUCAO DE COMPLEXIDADE

Complexidade so e aceitavel quando resolve problema que uma solucao mais simples nao resolve. Em equivalencia de valor, prevalece a de menor complexidade operacional ([Vol. I, Art. 4](VOL-I-GENESIS-CONSTITUICAO.md)).

Toda peca movel adicional — servico, fila, cache, banco, provedor, camada — entra como **debito de complexidade** e exige quatro campos: problema que resolve; alternativa mais simples descartada e por que; custo operacional recorrente; condicao de remocao. Peca sem condicao de remocao nao entra.

---

## ARTIGO 38-A — CATALOGO DE ESTILOS ARQUITETURAIS

Nenhum estilo entra por moda, curriculo ou familiaridade. Entra por gatilho atendido e registrado em ADR. O **Monolito Modular e o padrao de partida**: presume-se adotado ate que um gatilho justifique fragmentar.

| Estilo | Problema que resolve | Custo que cobra | Gatilho objetivo |
|---|---|---|---|
| Monolito Modular | Coesao com fronteiras internas | Disciplina para nao vazar fronteira | Padrao de partida; dispensa gatilho |
| DDD | Linguagem ambigua entre negocio e codigo | Modelagem e glossario vivo | Termo de negocio disputado entre areas |
| Clean / Camadas | Regra de negocio refem de framework | Indirecao e mais arquivos | Troca previsivel de framework, banco ou canal |
| Hexagonal | Nucleo dificil de testar sem infra | Portas e adaptadores a manter | Mais de uma entrada ou saida para a mesma regra |
| CQRS | Leitura e escrita com necessidades opostas | Dois modelos e sincronizacao | Leitura degradando escrita, ou o inverso |
| Event Sourcing | Auditoria do porque do estado | Versionamento e reconstrucao | Exigencia de reconstruir estado passado |
| Microservicos | Escala e implantacao independentes | Rede, contratos, operacao distribuida | Times autonomos com ciclos conflitantes e escala assimetrica |
| Serverless | Custo ocioso em carga intermitente | Limite de execucao, partida fria, dependencia do provedor | Uso esporadico ou pico imprevisivel |
| Edge | Latencia geografica | Ambiente restrito, depuracao dificil | Usuario distante da origem com latencia sensivel |
| Streaming | Reacao continua a alto volume | Ordenacao, reprocessamento, estado | Dado que perde valor em minutos |
| Filas | Desacoplar produtor e consumidor | Latencia eventual, ordem nao garantida | Trabalho longo bloqueando resposta |
| Sagas (transacao distribuida) | Consistencia de uma operacao que cruza servicos sem commit unico | Passo compensatorio para cada etapa, estado da saga, janela de inconsistencia visivel ao negocio | Operacao de negocio que altera dados sob dois ou mais donos, sem transacao unica possivel |
| Cache | Custo e latencia de leitura repetida | Invalidacao e risco de dado obsoleto | Leitura repetida com defasagem tolerada |

Precedencia: quando dois estilos resolverem o mesmo gatilho, prevalece o de menor custo operacional. Estilo adotado sem gatilho e defeito de arquitetura. Adotar Microservicos ou Filas sobre uma escrita que cruza donos de dado obriga Sagas com compensacao declarada por passo; distribuir a escrita e nao declarar a compensacao e defeito, nao simplificacao.

**Escala horizontal x vertical.** Vertical (no maior) e o padrao de partida: nao cobra preco de arquitetura, resolve ate o teto do maior no do provedor e mantem ponto unico de falha. Horizontal (mais instancias) entra quando um destes gatilhos for atendido: a carga projetada chega a menos de uma ordem de grandeza do teto vertical; a disponibilidade contratada nao tolera um unico no; ou o custo do no grande cresce mais rapido que o da soma de nos pequenos. Preco da horizontal, pago antes e nunca durante o incidente: estado fora do processo, sessao sem afinidade, distribuicao de carga, consistencia entre nos e dado particionado. Escalar horizontalmente componente com estado local e mudanca de arquitetura com ADR, nao ajuste de infraestrutura.

---

## ARTIGO 39 — PRONTIDAO PARA IA

Toda arquitetura devera considerar a incorporacao futura de agentes, automacoes e modelos de linguagem. Isso nao significa colocar IA em tudo; significa nao tomar decisoes que impossibilitem sua adocao quando fizer sentido.

Condicoes minimas: capacidades expostas por contratos chamaveis por programa, nao so por interface humana; dados de dominio recuperaveis com granularidade e permissao verificavel; eventos de negocio com semantica estavel; operacoes sensiveis idempotentes e reversiveis; limite de custo e de taxa por chamador ([Vol. IX](VOL-IX-DAEMON-IA.md)).

---

## ARTIGO 40 — MATRIZ DE TRADE-OFFS

Toda decisao relevante exige matriz com, no minimo, duas alternativas reais e a opcao de nao fazer nada. Colunas obrigatorias: alternativa; beneficios; custos; riscos; impacto de curto e de longo prazo; hipoteses com nivel de confianca ([Vol. III, Art. 24](VOL-III-PROMETHEUS-DESCOBERTA.md)); dependencias; criterio de escolha. Alternativa construida fraca de proposito invalida a matriz. O criterio de escolha e declarado antes da pontuacao do Art. 33.

---

## ARTIGO 41 — CRITERIOS DE REVISAO

Perguntas obrigatorias: continua compreensivel se o sistema crescer dez vezes; um novo integrante entenderia sem tutoria; alterar um modulo obriga a alterar quantos outros; a documentacao explica o porque e nao so o que; ha caminho para as capacidades previstas; algum debito de complexidade passou da condicao de remocao.

Gatilhos de revisao obrigatoria: crescimento de uma ordem de grandeza; nova classe de usuario ou de regulacao; terceira correcao consecutiva no mesmo modulo; ADR marcado como superado; incidente de severidade alta.

---

## ARTIGO 41-A — ESTRATEGIA DE TESTES

Teste nao e dimensao de nota, e disciplina de engenharia. Testabilidade (Art. 33) pontua a facilidade de testar; este artigo define o que sera testado, em que nivel, quando e ate onde. Arquitetura sem estrategia de testes declarada esta incompleta pelo Art. 31, dimensao Operacional.

| Nivel | O que prova | Proporcao alvo da suite | Gatilho que obriga o teste a existir |
|---|---|---|---|
| Unitario | Regra de negocio isolada, sem infraestrutura | 60% a 75% | Toda regra com ramificacao condicional ou calculo |
| Integracao | Modulo conversando com banco, fila, arquivo ou provedor | 15% a 30% | Toda travessia de fronteira do Art. 34 |
| Contrato | Produtor e consumidor concordam na fronteira | 5% a 15% | Todo contrato versionado entre modulos ou servicos |
| Ponta a ponta | Jornada critica do usuario funciona inteira | ate 10% | Toda jornada que move dinheiro, permissao ou dado irreversivel |

As faixas sao convencao do AEOS, recalibraveis por projeto e registradas em ADR **antes** da primeira medicao. Proporcao invertida — ponta a ponta majoritario — e defeito: suite lenta, instavel e incapaz de localizar o defeito que acusa.

**Gatilho universal.** Todo defeito corrigido nasce com um teste que falha antes da correcao e passa depois; sem esse teste a correcao nao entra. Regra de negocio, caminho de erro declarado e operacao irreversivel exigem teste sempre. Codigo gerado por IA nao dispensa nenhum deles ([Vol. IX](VOL-IX-DAEMON-IA.md)).

**Regressao.** A suite de regressao e o acumulo desses testes, executada integralmente na esteira de CI/CD (Art. 35) a cada mudanca, nunca por amostragem manual. Teste removido exige justificativa escrita no mesmo commit; teste instavel e defeito com dono e prazo, jamais desativacao silenciosa.

**Cobertura.** Cobertura mede linhas e ramos executados pela suite. Nao mede se ha assercao, se a assercao verifica o que importa, se o caso relevante foi imaginado, se o dado de teste e realista, nem se o sistema faz a coisa certa. Cobertura alta com assercao fraca e teatro. Serve como piso de triagem, nunca como prova de qualidade, e nenhuma decisao de liberacao se apoia so nela.

**Testado o suficiente**, por nivel de risco da mudanca ([Vol. V, Art. 46](VOL-V-ODIN-EXECUCAO.md)). Cada nivel acumula os anteriores.

| Risco | Minimo exigido |
|---|---|
| Baixo | Unitario do caminho feliz e de cada erro declarado |
| Moderado | + integracao em toda fronteira tocada |
| Alto | + contrato de toda fronteira alterada e regressao completa verde |
| Critico | + ponta a ponta da jornada afetada, teste de carga no alvo declarado e rollback exercitado |
| Existencial | + ensaio em ambiente equivalente ao de producao com dado mascarado, e aprovacao nominal antes da liberacao |

Mudanca sem o minimo do seu risco nao e liberada. Excecao exige aceitacao de risco por escrito no template de [Vol. X, Art. 117](VOL-X-AEGIS-SEGURANCA-AUDITORIA.md), com dono e prazo.

---

## ARTIGO 42 — DOCUMENTACAO COMO PARTE DA ARQUITETURA

Toda decisao relevante gera um **Registro de Decisao Arquitetural (ADR)**, numerado, imutavel apos aceito e superado apenas por outro ADR. Campos obrigatorios: identificador; data; status; contexto; problema; restricoes; alternativas; criterios e pesos; decisao; justificativa; consequencias; riscos com gatilho de reavaliacao; plano de reversao; responsavel.

```
ADR-014 — Fila para processamento de importacao      Status: aceito · 27/07/2026
Contexto      Importacao de arquivo executada na requisicao do usuario.
Problema      Requisicoes longas bloqueiam resposta e falham por timeout.
Restricoes    Equipe pequena; sem operacao 24h; custo operacional limitado.
Alternativas  (A) manter sincrono; (B) fila gerenciada; (C) servico dedicado.
Criterios     Pesos do Art. 33, calibrados e congelados antes da pontuacao.
Decisao       (B) fila gerenciada, consumidor idempotente por chave de importacao.
Justificativa Atende ao gatilho "trabalho longo bloqueando resposta" com o menor
              custo operacional entre as opcoes que o resolvem.
Consequencias Resultado assincrono; interface exibe progresso.
Riscos        Fila morta sem tratamento. Reavaliar se o atraso exceder o alvo.
Reversao      Desativar a flag de importacao assincrona e voltar ao sincrono.
Responsavel   Conselho de Arquitetura.
```

```
PROBLEMA → PRINCIPIOS (32) → ALTERNATIVAS → TRADE-OFFS (40) → PONTUACAO (33)
   reprovado ↺ alternativas | aprovado → ADR (42) → MUDANCA SEGURA (35)
   → TESTES (41-A) → OBSERVAR (36) → REVISAO (41) ↺
```

---

## PRINCIPIOS DO VOLUME

**P-IV-01 — Custo de mudar de ideia.** Avalie a arquitetura pelo custo de reverte-la, nao pelo de constru-ila.

**P-IV-02 — Tecnologia por ultimo.** Nome de tecnologia so entra depois que problema, restricoes e criterios de escolha estiverem escritos.

**P-IV-03 — Contrato antes de codigo.** Contrato de fronteira definido depois da implementacao vira espelho dela, nao regra sobre ela.

**P-IV-04 — Fronteira sem policiamento nao existe.** Toda fronteira exige verificacao automatizada; regra sustentada so por disciplina humana sera violada.

**P-IV-05 — Reversibilidade primeiro.** Entre solucoes de valor parecido prevalece a reversivel, ainda que inferior no papel.

**P-IV-06 — Irreversivel exige nome.** Acao irreversivel tem responsavel nominal registrado; aprovacao difusa nao aprova nada.

**P-IV-07 — Peca movel cobra aluguel.** Componente sem custo mensal estimado e sem condicao de remocao declarada nao entra.

**P-IV-08 — Gatilho, nao gosto.** Estilo entra por gatilho atendido; preferencia e experiencia previa nao sao gatilhos.

**P-IV-09 — Monolito modular por omissao.** Fragmentar e decisao a ser conquistada com evidencia, nunca presumida.

**P-IV-10 — Distribuir e importar a rede.** Quem distribui herda latencia, falha parcial e consistencia eventual; equipe que nao opera isso nao tem o estilo disponivel.

**P-IV-11 — Pesos antes das notas.** Calibragem de peso posterior as alternativas invalida a avaliacao inteira.

**P-IV-12 — Nota nao decide.** A pontuacao existe para obrigar justificativa, nunca para substitui-la.

**P-IV-13 — Comparacao honesta.** Cada alternativa aparece em sua melhor versao, e manter o estado atual e sempre uma linha pontuada.

**P-IV-14 — Observabilidade e requisito.** Instrumentar depois da entrega significa nao instrumentar.

**P-IV-15 — Correlacao ponta a ponta.** Sem identificador propagado, log e ruido ordenado por tempo.

**P-IV-16 — Alarme sem acao e poluicao.** Alarme sem procedimento de resposta e removido ou ganha procedimento escrito.

**P-IV-17 — Timeout universal.** Chamada de rede sem timeout explicito e defeito; o padrao da biblioteca nao e decisao de arquitetura.

**P-IV-18 — Retry exige idempotencia.** Sem chave de idempotencia, retry amplifica dano; a dupla e indivisivel.

**P-IV-19 — Degradar antes de cair.** Funcionalidade nao essencial precisa de caminho de degradacao declarado.

**P-IV-20 — Numero nao testado e ficcao.** Metas de recuperacao, disponibilidade e latencia so valem apos exercitadas.

**P-IV-21 — Autorizacao no servidor.** Permissao verificada na interface e conveniencia visual; a decisao de acesso ocorre no servidor.

**P-IV-22 — Dado sensivel nao entra em log.** O registro carrega identificador, nunca conteudo sensivel em claro.

**P-IV-23 — Prontidao para IA e contrato, nao modelo.** Exponha capacidades chamaveis por programa; a escolha de modelo e posterior e substituivel.

**P-IV-24 — ADR e memoria, nao burocracia.** Decisao sem registro sera reinterpretada; decisao revogada fica no historico com o motivo.

**P-IV-25 — Revisao por gatilho.** Arquitetura nao se revisa por calendario, e sim quando um gatilho do Art. 41 dispara.

**P-IV-26 — Teste e disciplina, nao nota.** Testabilidade pontua a arquitetura; a suite do Art. 41-A prova que ela funciona. Defeito sem teste que falhava antes nao esta corrigido, e cobertura nao substitui assercao.

---

## CHECKLIST DO VOLUME

- [ ] **CK-IV-01** As seis dimensoes do Art. 31 possuem evidencia escrita e localizavel.
- [ ] **CK-IV-02** As cinco perguntas do Art. 32 estao respondidas antes de mencionar tecnologia.
- [ ] **CK-IV-03** Pesos e nota minima do Art. 33 foram registrados antes da pontuacao.
- [ ] **CK-IV-04** Cada alternativa foi pontuada nas dez dimensoes, com media exibida.
- [ ] **CK-IV-05** A matriz traz duas alternativas reais mais a opcao de nao fazer nada.
- [ ] **CK-IV-06** Todo modulo declara seu contrato e nao ha dependencia ciclica.
- [ ] **CK-IV-07** Toda mudanca tem rollback escrito ou custo de irreversibilidade aprovado.
- [ ] **CK-IV-08** Cada componente atende ao minimo de observabilidade do Art. 36.
- [ ] **CK-IV-09** O teste de suficiencia do Art. 36 foi executado sobre uma requisicao concreta.
- [ ] **CK-IV-10** Toda chamada de rede tem timeout e toda operacao repetivel tem idempotencia.
- [ ] **CK-IV-11** Cada estilo adotado cita o gatilho do Art. 38-A que o justifica.
- [ ] **CK-IV-12** Cada debito de complexidade tem os quatro campos do Art. 38.
- [ ] **CK-IV-13** Todo ADR possui os quatorze campos do Art. 42, com reversao preenchida.
- [ ] **CK-IV-14** A mudanca atende ao minimo de testes do Art. 41-A para o seu nivel de risco, e todo defeito corrigido tem teste que falhava antes.

---

## CRITERIOS DE AUDITORIA

| ID | Criterio | Evidencia exigida | Condicao de reprovacao |
|---|---|---|---|
| AUD-IV-01 | Cobertura das seis dimensoes | Secao por dimensao com artefato | Dimensao sem evidencia |
| AUD-IV-02 | Problema antes de tecnologia | Primeiros principios datados | Tecnologia citada antes do problema |
| AUD-IV-03 | Restricoes classificadas | Lista tipada de restricoes | Legado como unica justificativa |
| AUD-IV-04 | Pesos congelados | Registro de pesos datado | Data posterior a primeira pontuacao |
| AUD-IV-05 | Pontuacao valida | Notas, produtos e soma | Media divergente do recalculo, ou aprovacao com peso 10 abaixo de 6 |
| AUD-IV-06 | Matriz honesta | Matriz do Art. 40 completa | Alternativa sem beneficios ou hipoteses, ou ausencia do "nao fazer nada" |
| AUD-IV-07 | Fronteiras verificadas | Regra automatizada de dependencia | Ciclo entre modulos ou acesso a interno alheio |
| AUD-IV-08 | Estilo por gatilho | ADR citando o gatilho do Art. 38-A | Estilo sem gatilho correspondente |
| AUD-IV-09 | Fragmentacao justificada | Evidencia de escala assimetrica | Microservicos sem essa evidencia |
| AUD-IV-10 | Reversibilidade | Rollback com tempo alvo | Mudanca sem plano e sem custo aprovado |
| AUD-IV-11 | Migracao de dados segura | Plano expandir-contrair | Esquema alterado sem etapa de transicao |
| AUD-IV-12 | Minimo de observabilidade | Mapeamento por componente | Componente abaixo do minimo do Art. 36 |
| AUD-IV-13 | Suficiencia investigativa | Reconstituicao de requisicao real | Exigiu instrumentacao nova |
| AUD-IV-14 | Higiene de log | Amostra de registros | Dado sensivel em claro ou sem correlacao |
| AUD-IV-15 | Resiliencia por gatilho | Tabela do Art. 36-A preenchida | Gatilho atendido sem o mecanismo |
| AUD-IV-16 | Idempotencia | Chave por operacao repetivel | Retry sobre operacao nao idempotente |
| AUD-IV-17 | Metas de recuperacao | Registro do ultimo exercicio | Meta declarada sem teste |
| AUD-IV-18 | Debito de complexidade | Ficha com os quatro campos | Componente sem condicao de remocao |
| AUD-IV-19 | Integridade e rastreio do ADR | ADR completo vinculado a mudanca | Campo ausente, ADR alterado apos aceito, ou mudanca estrutural sem ADR |
| AUD-IV-20 | Prontidao para IA | Avaliacao do Art. 39 | Capacidade critica so acessivel por interface humana |
| AUD-IV-21 | Gatilhos de revisao | Historico com gatilho citado | Gatilho do Art. 41 sem revisao registrada |
| AUD-IV-22 | Estrategia de testes por nivel | Suite classificada por nivel, com proporcao medida e faixas do Art. 41-A registradas em ADR | Proporcao fora das faixas (unitario abaixo de 60%, integracao fora de 15% a 30%, contrato abaixo de 5%, ponta a ponta acima de 10%) sem ADR de recalibragem previo, ou defeito corrigido sem teste que falhava antes |
| AUD-IV-23 | Suficiencia por risco e regressao | Nivel de risco do [Vol. V, Art. 46](VOL-V-ODIN-EXECUCAO.md) e testes executados na esteira | Minimo do nivel de risco nao atendido sem aceitacao de risco do Art. 117, ou regressao completa nao executada na esteira de CI/CD |
