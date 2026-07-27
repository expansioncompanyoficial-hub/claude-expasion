# AEOS — VOLUME VII
## PSICOLOGIA E COMPORTAMENTO · Codinome PSYCHE

> **Versao** 2.0 Genesis · **Artigos** 67 a 78 · **Atualizado em** 27/07/2026
> **Escopo:** Como o AEOS avalia e projeta comportamento humano — carga cognitiva, modelos mentais, escolha, friccao, atencao, habito, decisao, emocao, tempo, linguagem e acesso.
> **Pre-requisito:** [Vol. I, Art. 7](VOL-I-GENESIS-CONSTITUICAO.md) e [Vol. III, Arts. 26 e 27](VOL-III-PROMETHEUS-DESCOBERTA.md).
> **Alimenta:** [Vol. VIII](VOL-VIII-ORACLE-PRODUTO.md) (metricas de valor), [Vol. X](VOL-X-AEGIS-SEGURANCA-AUDITORIA.md) (Red Team e auditoria), [Vol. XII](VOL-XII-FORGE-MANUAL-DE-OPERACAO.md) (prompts de revisao de tela).

---

## PREAMBULO

Produtos digitais nao sao operados por sistemas, e sim por pessoas com memoria limitada, atencao disputada, pressa, cansaco, medo de errar e habitos formados em outros produtos. Ignorar isso e erro de engenharia, nao lacuna estetica.

Este volume estabelece o comportamento humano como dimensao mensuravel de projeto, sujeita as mesmas regras de evidencia do restante do AEOS. Nada aqui autoriza afirmar o que o usuario sente. Tudo aqui obriga a declarar a hipotese, o nivel de confianca conforme [Vol. III, Art. 24](VOL-III-PROMETHEUS-DESCOBERTA.md) e o metodo de validacao com usuarios reais do produto.

Todo conteudo deste volume e **heuristica de projeto**: regularidade amplamente reconhecida na pratica de design, util para gerar hipoteses e priorizar revisoes, jamais suficiente para encerrar uma discussao. E proibido invocar estudos, autores, experimentos ou percentuais para sustentar decisao aqui prevista. Onde houver numero, ele e **convencao arbitraria declarada do framework**: existe para forcar conversa objetiva, devera ser recalibrado por projeto e registrado conforme [Vol. V, Art. 54](VOL-V-ODIN-EXECUCAO.md).

Duas disciplinas ficam nomeadas aqui para evitar equivoco. **Behavior Design** — o desenho deliberado de gatilho, acao minima e recompensa — nao e proibido, e regulado: quem o realiza sao o Artigo 69 (arquitetura de escolha e padrao pre-selecionado) e o Artigo 73 (ciclo de habito, gatilho e recompensa variavel), ambos sob o veto do Artigo 71. **Neurociencia** entra no AEOS apenas como origem historica de algumas heuristicas de projeto, jamais como autoridade: nao ha medicao neural em projeto de produto, e invocar neurociencia ou vocabulario neural para sustentar decisao de design e proibido, pela mesma regra que proibe invocar estudos e percentuais.

Este volume nao redefine o Mapa da Friccao nem o Mapa da Carga Cognitiva: aqueles artefatos nascem na descoberta e aqui sao pontuados e priorizados.

Existe um limite inegociavel. Conhecimento sobre comportamento aumenta o poder de influenciar comportamento. O AEOS usa esse poder para reduzir esforco, erro e ansiedade de quem esta na tela. Usa-lo contra o interesse dessa pessoa e violacao constitucional, nao escolha de negocio — e o Artigo 71 e a clausula que executa a proibicao.

---

## ARTIGO 67 — CARGA COGNITIVA E MEMORIA DE TRABALHO

Trate a memoria de trabalho como recurso finito. Heuristica: o numero de itens novos retidos entre duas telas e pequeno — o AEOS adota **4 itens** como convencao, e exigencia acima disso devera ser suportada pela interface, nunca pela memoria.

Indice de Carga de Tela (ICT), obrigatorio por tela:

| Fator | Como contar | Peso |
|---|---|---|
| D — decisoes | escolhas que mudam o resultado | 3 |
| A — acoes visiveis | controles interativos na primeira dobra | 1 |
| M — itens de memoria | dados que o usuario traz de outra tela | 4 |
| L — blocos de leitura | textos que exigem interpretacao | 1 |

`ICT = 3D + A + 4M + L`. Convencao: **acima de 24 abre alerta**; **acima de 36 exige decomposicao da tela ou justificativa registrada**. Calibre para cima em telas de operador especialista, onde densidade e beneficio.

Gatilho: sempre que `M > 0`, exiba o dado em vez de exigir que ele seja lembrado, ou registre por que isso e impossivel.

---

## ARTIGO 68 — MODELOS MENTAIS E DISTANCIA DE MODELO

O usuario opera o modelo que imagina, nao o que foi implementado. A diferenca e a **Distancia de Modelo (DM)**, por conceito, de 0 a 4: 0 identicos; 1 nomes diferentes, comportamento igual; 2 comportamento parcialmente diferente; 3 exige entender uma abstracao interna; 4 contradiz a expectativa formada em produtos da mesma categoria.

Convencao: **DM ≥ 3 e defeito**, nao caracteristica. Corrija nesta ordem: mudar o sistema, mudar o nome, ensinar. Ensinar e sempre a alternativa mais cara.

Teste do nome cego: apresente o rotulo isolado a pessoas do publico-alvo e peca que descrevam o que acontecera ao aciona-lo. Convencao: menos de **7 acertos em 10** reprova o nome. Registre como evidencia ([Vol. III, Art. 22](VOL-III-PROMETHEUS-DESCOBERTA.md)).

Perguntas obrigatorias: que objeto o usuario acha que esta manipulando? O vocabulario da tela e dele ou do banco de dados?

---

## ARTIGO 69 — ARQUITETURA DE ESCOLHA E ECONOMIA COMPORTAMENTAL HONESTA

Ordem, agrupamento e padrao pre-selecionado alteram a decisao. Como e impossivel apresentar opcoes sem ordem, neutralidade nao existe — existe **intencao declarada**. Toda lista de opcoes devera declarar por escrito o criterio que a ordena.

1. Escolha com mais de **7 opcoes** (convencao) devera ser agrupada, filtrada ou revelada progressivamente.
2. Todo padrao pre-selecionado devera ser o que o AEOS defenderia publicamente como melhor para o usuario mediano, nunca o mais lucrativo.
3. Opcao pre-marcada e **proibida** quando gera cobranca, consentimento, compartilhamento de dado ou comunicacao.
4. Ancoragem por comparacao so e licita quando os itens comparados sao realmente adquiriveis.
5. Ordem por conveniencia comercial exige rotulo visivel de patrocinio ou destaque.

Perguntas de revisao: qual opcao vence por desenho e nao por merito? O que acontece com quem apenas aperta "continuar" sem ler, e esse resultado e defensavel em voz alta?

---

## ARTIGO 70 — ANALISE DE FRICCAO: PARASITA, ESTRUTURAL E DELIBERADA

Reduzir friccao nao e valor absoluto. Toda friccao do Mapa da Friccao ([Vol. III, Art. 26](VOL-III-PROMETHEUS-DESCOBERTA.md)) recebe uma classe:

| Classe | Definicao | Tratamento |
|---|---|---|
| F1 — Parasita | esforco sem valor e sem protecao | remover, sem debate |
| F2 — Estrutural | esforco inerente ao problema | minimizar, distribuir, adiar |
| F3 — Deliberada | esforco introduzido para proteger o usuario | preservar e justificar |

Escala de Irreversibilidade (IR), convencao: 0 reversivel em um clique; 1 reversivel com esforco; 2 reversivel apenas por suporte; 3 irreversivel.

Gatilho: **IR ≥ 2 exige F3** — confirmacao que descreve a consequencia em palavras concretas, jamais "tem certeza?". IR = 3 exige ainda digitacao do nome do objeto afetado. E proibido usar F3 para reter cliente ou desestimular cancelamento: nesse uso ela vira padrao escuro (Artigo 71).

---

## ARTIGO 71 — CLAUSULA ETICA: TESTE DE LICITUDE E VETO A PADROES ESCUROS

E proibido usar conhecimento psicologico para induzir o usuario a agir contra o proprio interesse. Esta clausula tem poder de veto equivalente ao de [Vol. II, Art. 19](VOL-II-SENATE-GOVERNANCA.md) e nao pode ser derrubada por meta comercial.

**Teste de Licitude (Teste da Vitrine).** A tecnica so e permitida se continuar funcionando quando o usuario souber exatamente que ela esta sendo usada e por que. Se depende de ele nao perceber, e manipulacao e esta vetada.

**Teste de Simetria.** O numero de passos para cancelar, excluir conta ou revogar consentimento **nao pode exceder** o numero de passos para contratar.

Vetados por padrao, sem discussao caso a caso: urgencia falsa; escassez inventada ou nao verificavel; custo escondido revelado no ultimo passo; cancelamento dificultado ou desviado para canal humano; consentimento obtido por cansaco ou repeticao; opcao pre-marcada em cobranca, dado ou comunicacao; confirmacao envergonhada; interface que disfarca anuncio de conteudo, ou acao destrutiva de acao neutra.

Excecao unica e estreita: friccao que protege o usuario de dano real, ainda que contrarie sua intencao imediata, desde que registrada como F3 e aprovada no Teste da Vitrine.

---

## ARTIGO 72 — DESIGN DE ATENCAO E ORCAMENTO DE INTERRUPCAO

Notificacao, badge, banner, modal e som sao saques na atencao; cada saque exige justificativa.

Toda interrupcao devera responder sim as tres perguntas: (a) exige acao ou decisao do usuario? (b) perde valor se for vista depois? (c) foi solicitada, direta ou indiretamente, por ele? Falhou em qualquer uma, torna-se registro passivo, nunca interrupcao.

Orcamento de Interrupcao, convencao: no maximo **3 interrupcoes ativas por usuario por dia** em produtos de trabalho e **1 modal bloqueante por sessao**. Ultrapassar exige aprovacao registrada e metrica de dano acompanhada em [Vol. VIII](VOL-VIII-ORACLE-PRODUTO.md).

Regra do indicador: badge numerico so existe quando ha item pendente de acao. Badge que conta novidade em vez de pendencia e vetado.

---

## ARTIGO 73 — FORMACAO DE HABITO E GATILHOS

Habito e consequencia de valor recorrente, nunca objetivo isolado: projeta-se reduzindo o custo de retorno, nunca aumentando o custo de saida.

Teste do Habito Honesto: se todos os gatilhos externos fossem desligados por um periodo, o usuario voltaria sozinho? Se nao, o produto nao tem habito — tem dependencia de estimulo, e o problema e de valor.

Mecanismo obrigatorio para qualquer ciclo proposto: declarar gatilho, acao minima, valor entregue **dentro do proprio ciclo** e custo de abandono. Ciclo com valor vazio esta proibido.

Instrumentacao exigida: separar retorno **espontaneo** de retorno **induzido por gatilho**, com definicao conforme [Vol. VIII](VOL-VIII-ORACLE-PRODUTO.md). Recompensa variavel so e permitida quando a variacao vem do trabalho real do usuario, nunca de sorteio embutido pela interface.

---

## ARTIGO 74 — CIENCIA DA DECISAO SOB INCERTEZA

O usuario decide com informacao incompleta. Interface que esconde consequencia transfere risco para quem tem menos contexto.

Artefato obrigatorio — **Cartao de Decisao**, exibido antes de toda acao com IR ≥ 1: o que muda; quem e afetado; quando passa a valer; se e reversivel e como; o que acontece se nada for feito.

Perguntas obrigatorias: existe pre-visualizacao, simulacao ou rascunho? Adiar e possivel e seguro? O custo do erro esta explicito em unidade que o usuario entende — dinheiro, tempo, pessoas afetadas?

Gatilho: decisao com consequencia financeira, contratual ou sobre dados de terceiros exige pre-visualizacao do resultado ou janela de reversao declarada. A ausencia das duas e reprovacao automatica.

---

## ARTIGO 75 — DESIGN EMOCIONAL: ANSIEDADE, CONFIANCA E CONTROLE

O estado emocional produzido pela tela e requisito, nao efeito colateral. Avalie quatro eixos por tela, de 0 a 3, com justificativa escrita:

| Eixo | Pergunta de avaliacao |
|---|---|
| Orientacao | sabe onde esta e como chegou? |
| Controle | pode parar, voltar, desfazer ou sair sem perder trabalho? |
| Confianca | o sistema informa o que fez, com que dado e onde ficou? |
| Seguranca percebida | o usuario consegue agir sem temer consequencia irreversivel? |

Convencao: os quatro eixos tem a mesma polaridade — nota maior e sempre melhor — e qualquer eixo com nota **0 ou 1 bloqueia a aprovacao da tela**. A exigencia no eixo Seguranca percebida cresce junto com a irreversibilidade da acao, nunca ao contrario: com IR ≤ 1 tolera-se nota 2, desde que haja desfazer, rascunho ou pre-visualizacao; com IR = 2 exige-se 3; com IR = 3 exige-se 3 e ainda a confirmacao descritiva do Artigo 74.

Regra do trabalho do usuario: nenhum dado digitado podera ser perdido por navegacao, erro de rede, expiracao de sessao ou fechamento acidental. Perda de trabalho e defeito critico, equiparado a falha de integridade.

---

## ARTIGO 76 — PERCEPCAO DE TEMPO E ESPERA

Tempo percebido difere de tempo medido. [Vol. I, Art. 8](VOL-I-GENESIS-CONSTITUICAO.md) reduz o tempo real; este artigo governa o que a interface faz com o restante.

| Faixa | Tratamento obrigatorio |
|---|---|
| ate 100 ms | nenhum indicador; parece instantaneo |
| 100 ms a 1 s | feedback de estado no proprio controle acionado |
| 1 s a 4 s | esqueleto de conteudo ou indicador determinado |
| acima de 4 s | etapa nomeada, progresso, estimativa e saida sem perder o trabalho |

As faixas sao convencao do framework, calibraveis pela rede real do publico. Todo controle reage em ate 100 ms, mesmo que o resultado demore. Progresso indeterminado e proibido acima de 10 segundos. Estado otimista so e permitido quando a falha for rara, detectavel, reversivel e comunicada com restauracao do estado anterior — sem isso, e mentira de interface.

---

## ARTIGO 77 — LINGUAGEM E NOMEACAO COMO INTERFACE

Texto e componente. Nome errado custa mais que pixel errado: propaga-se para suporte, documentacao, treinamento e banco.

1. Um conceito, um nome, em todo o produto. Sinonimo e defeito de consistencia.
2. O nome vem do vocabulario do usuario; vocabulario interno so aparece quando ele ja o utiliza.
3. Botao nomeia o resultado, nao o mecanismo: "Publicar agora", nunca "OK".
4. Mensagem de erro tem tres partes: o que aconteceu, por que aconteceu, o que fazer agora.
5. Estado vazio explica o que aparecera ali, por que esta vazio e qual a proxima acao.
6. Nenhum texto de interface culpa o usuario.

Artefato obrigatorio: **Glossario do Produto** versionado, com termo, definicao, sinonimos proibidos e onde aparece. Mudanca de nome com DM ≥ 2 entra no Registro de Decisoes.

---

## ARTIGO 78 — ACESSIBILIDADE E INCLUSAO COMO REQUISITO

Acessibilidade e requisito funcional e integra a definicao de pronto. Nenhuma entrega podera ser aprovada tratando acesso como melhoria futura ou enfeite de conformidade.

Minimos verificaveis por inspecao: operacao completa por teclado em ordem logica; foco visivel em todo elemento interativo; nenhuma informacao transmitida apenas por cor; contraste suficiente sob luz ambiente; alvo de toque confortavel no movel; rotulo programatico em todo controle, inclusive icone sem texto; texto redimensionavel sem quebra de layout; movimento reduzido respeitado; erro associado ao campo e anunciavel por leitor de tela.

Gatilho: componente sem foco visivel ou sem rotulo programatico e **defeito bloqueante**, tratado como bug e nao como pedido de melhoria.

Inclusao ultrapassa deficiencia permanente: contemple limitacao situacional — uma mao ocupada, sol na tela, ruido, conexao instavel — e repertorio digital baixo. Formatos de nome, endereco, telefone, moeda e data deverao aceitar a realidade do publico real, nunca um formato presumido.

---

## PRINCIPIOS DO VOLUME

**P-VII-01 — Heuristica nao e prova.** Todo enunciado psicologico gera hipotese, nunca conclusao. Registre confianca e metodo de validacao antes de converter em decisao.

**P-VII-02 — Numero e convencao declarada.** Todo limite deste volume e arbitrario por construcao. Recalibre por projeto e registre a calibragem.

**P-VII-03 — A memoria e do sistema.** Se o sistema pode lembrar, o usuario nao devera lembrar. Exigir memoria e transferir custo de engenharia para quem paga pelo produto.

**P-VII-04 — Uma tela, um objetivo.** Tela com dois objetivos primarios tem zero. Divida, ou eleja um e rebaixe explicitamente o restante.

**P-VII-05 — Decisao adiavel e decisao removivel.** Antes de melhorar uma decisao, tente adia-la para quando houver contexto, ou elimina-la com um padrao defensavel.

**P-VII-06 — Padrao pre-selecionado e recomendacao publica.** Se voce nao defenderia a recomendacao em voz alta diante do usuario, ela esta errada.

**P-VII-07 — Reconhecer custa menos que lembrar.** Prefira mostrar a evocar, e selecionar a digitar quando o conjunto for finito e conhecido.

**P-VII-08 — Consistencia vence originalidade.** Divergir de convencao estabelecida exige ganho demonstravel; sem ganho, e custo de aprendizagem gratuito.

**P-VII-09 — Friccao tem endereco.** Toda friccao recebe classe F1, F2 ou F3. Friccao sem classe nao entra em priorizacao.

**P-VII-10 — Proteja o irreversivel.** Quanto maior a irreversibilidade, maior a deliberacao exigida. Confirmacao generica nao protege ninguem.

**P-VII-11 — Simetria de saida.** Cancelar, excluir e revogar sao funcionalidades de primeira classe, com o mesmo investimento de contratar.

**P-VII-12 — Transparencia como teste.** Tecnica que perde efeito ao ser explicada esta proibida. Nenhuma meta de negocio reabre essa discussao.

**P-VII-13 — Atencao e saque, nao renda.** Cada interrupcao consome credito finito. Sem acao pendente nao ha interrupcao, ha registro.

**P-VII-14 — Pendencia, nao novidade.** Indicadores contam o que exige acao. Contar novidade e capturar atencao sem entregar valor.

**P-VII-15 — Habito se conquista com retorno barato.** Reduza o custo de voltar; aumentar o custo de sair e retencao forcada e sera vetada.

**P-VII-16 — Valor dentro do ciclo.** Todo ciclo recorrente entrega valor no proprio ciclo. Promessa de valor futuro nao sustenta gatilho presente.

**P-VII-17 — Consequencia antes da acao.** Nenhuma acao relevante sera pedida sem que o usuario possa estimar resultado, alcance e reversibilidade.

**P-VII-18 — Nao decidir e opcao valida.** Ofereca caminho seguro para adiar sem perda: rascunho, salvar e sair, revisar depois.

**P-VII-19 — Trabalho do usuario e dado critico.** Perda de conteudo digitado por navegacao, sessao ou rede e defeito critico, nao inconveniente.

**P-VII-20 — Controle produz confianca.** Poder parar, voltar e desfazer reduz ansiedade mais do que qualquer texto tranquilizador.

**P-VII-21 — Reacao imediata, resultado quando der.** O controle responde de imediato; o resultado pode demorar, desde que a espera seja nomeada e estimada.

**P-VII-22 — Otimismo exige rede de seguranca.** Estado otimista sem deteccao de falha, reversao e aviso e falsificacao de resultado.

**P-VII-23 — Nome e contrato.** Renomear conceito e mudar interface publica: exige registro, propagacao e varredura de sinonimos remanescentes.

**P-VII-24 — Erro orienta, nao acusa.** Mensagem sem proximo passo esta incompleta; texto que responsabiliza o usuario esta reprovado.

**P-VII-25 — Acesso e definicao de pronto.** Sem teclado, foco visivel e rotulo programatico, a entrega esta incompleta. Considere tambem limitacao situacional.

**P-VII-26 — O Red Team ataca a etica.** Toda entrega e inspecionada em busca de padrao escuro com a severidade aplicada a falhas de seguranca.

**P-VII-27 — Psicologia nao substitui valor.** Se a metrica so sobe sob pressao comportamental, o problema e o produto, e nenhum ajuste de interface o corrige.

---

## CHECKLIST DO VOLUME

- [ ] CK-VII-01 ICT calculado em todas as telas principais; excedentes com decomposicao ou justificativa registrada.
- [ ] CK-VII-02 Todo conceito central com DM avaliada; nenhum DM ≥ 3 sem plano de correcao.
- [ ] CK-VII-03 Criterio de ordenacao declarado por lista de opcoes; nenhuma pre-marcacao em cobranca, consentimento, dado ou comunicacao.
- [ ] CK-VII-04 Toda friccao do Mapa da Friccao classificada em F1, F2 ou F3.
- [ ] CK-VII-05 IR ≥ 2 com confirmacao que descreve a consequencia; IR = 3 com confirmacao digitada.
- [ ] CK-VII-06 Lista de padroes escuros do Artigo 71 verificada item a item e Teste de Simetria executado.
- [ ] CK-VII-07 Cada interrupcao responde sim as tres perguntas do Artigo 72; orcamento respeitado ou aprovado.
- [ ] CK-VII-08 Retorno espontaneo e retorno induzido instrumentados separadamente.
- [ ] CK-VII-09 Toda acao com IR ≥ 1 exibe Cartao de Decisao completo.
- [ ] CK-VII-10 Quatro notas emocionais atribuidas por tela — orientacao, controle, confianca e seguranca percebida, todas com nota maior igual a melhor; nenhuma tela aprovada com eixo em 0 ou 1.
- [ ] CK-VII-11 Faixas de resposta verificadas; nenhum progresso indeterminado acima de 10 segundos.
- [ ] CK-VII-12 Glossario do Produto versionado e sem sinonimo proibido na interface.
- [ ] CK-VII-13 Toda mensagem de erro com as tres partes obrigatorias e sem culpar o usuario.
- [ ] CK-VII-14 Minimos de acessibilidade do Artigo 78 inspecionados; defeitos classificados como bloqueantes.

---

## CRITERIOS DE AUDITORIA

| ID | Criterio | Evidencia exigida | Condicao de reprovacao |
|---|---|---|---|
| AUD-VII-01 | Carga cognitiva medida | Planilha de ICT por tela | Tela principal sem ICT calculado |
| AUD-VII-02 | Excesso de carga tratado | Plano de decomposicao ou justificativa | ICT acima de 36 aprovado sem registro |
| AUD-VII-03 | Memoria transferida | Telas com M maior que zero e tratamento dado | Exigencia de memoria sem dado exibido nem justificativa |
| AUD-VII-04 | Distancia de Modelo | Tabela conceito x DM x origem da expectativa | Conceito central sem DM atribuida |
| AUD-VII-05 | Nomes testados | Resultado do teste do nome cego | Rotulo critico abaixo de 7 acertos em 10 mantido sem plano |
| AUD-VII-06 | Escolha declarada | Criterio de ordenacao e inventario de pre-selecoes | Lista sem criterio, ou pre-marcacao em cobranca, consentimento, dado ou comunicacao |
| AUD-VII-07 | Friccao classificada | Mapa da Friccao com coluna de classe | Item de friccao sem classe |
| AUD-VII-08 | Protecao proporcional | Acoes com IR e tipo de confirmacao | IR maior ou igual a 2 com confirmacao generica ou ausente |
| AUD-VII-09 | Teste da Vitrine | Registro do teste por tecnica persuasiva | Tecnica que perde efeito se explicada permanece ativa |
| AUD-VII-10 | Simetria de saida | Contagem de passos para entrar e para sair | Sair exige mais passos que entrar |
| AUD-VII-11 | Padroes escuros | Varredura contra a lista do Artigo 71 | Qualquer item vetado presente na entrega |
| AUD-VII-12 | Orcamento de atencao | Inventario de interrupcoes e do que cada badge conta | Excede o orcamento sem aprovacao, ou badge conta novidade |
| AUD-VII-13 | Habito honesto | Gatilho, acao, valor no ciclo e custo de abandono | Ciclo sem valor entregue no proprio ciclo |
| AUD-VII-14 | Retorno instrumentado | Metricas de retorno espontaneo e induzido | Metrica agregada sem separacao das duas origens |
| AUD-VII-15 | Cartao de Decisao | Amostra dos cartoes das acoes com IR ≥ 1 | Acao com IR maior ou igual a 1 sem cartao completo |
| AUD-VII-16 | Reversao ou previsao | Pre-visualizacao ou janela de reversao documentada | Decisao financeira, contratual ou sobre dado de terceiro sem nenhuma das duas |
| AUD-VII-17 | Emocao avaliada | Matriz dos quatro eixos por tela (orientacao, controle, confianca, seguranca percebida) com justificativa | Tela aprovada com algum eixo em 0 ou 1, ou eixo pontuado com polaridade invertida |
| AUD-VII-18 | Trabalho preservado | Teste de perda por navegacao, sessao e queda de rede | Conteudo digitado perdido em qualquer dos tres cenarios |
| AUD-VII-19 | Faixas de espera | Medicao de resposta por acao | Reacao acima de 100 ms, ou indeterminado acima de 10 s |
| AUD-VII-20 | Otimismo seguro | Especificacao de deteccao, reversao e aviso | Estado otimista sem os tres mecanismos |
| AUD-VII-21 | Linguagem consistente | Glossario versionado e varredura de sinonimos | Dois nomes para o mesmo conceito na interface |
| AUD-VII-22 | Erros uteis | Amostra completa das mensagens de erro | Mensagem sem proximo passo ou que culpa o usuario |
| AUD-VII-23 | Acessibilidade minima | Inspecao dos minimos do Artigo 78 | Qualquer minimo obrigatorio nao atendido |
| AUD-VII-24 | Inclusao situacional | Cenarios de limitacao situacional testados | Formato unico presumido incompativel com o publico real |
