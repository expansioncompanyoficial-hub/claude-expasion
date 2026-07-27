# AEOS — VOLUME IX
## INTELIGÊNCIA ARTIFICIAL · Codinome DAEMON

> **Versão** 2.0 Genesis · **Artigos** 91–103 · **Atualizado em** 27/07/2026
> **Escopo:** quando, como e sob quais garantias a IA entra num produto, com a meta de eliminar processos.
> **Pré-requisito:** [Vol. I, Art. 6 e 11](VOL-I-GENESIS-CONSTITUICAO.md), [Vol. III, Art. 24](VOL-III-PROMETHEUS-DESCOBERTA.md), [Vol. IV, Art. 39](VOL-IV-ATLAS-ARQUITETURA.md).
> **Alimenta:** [Vol. V, Art. 51](VOL-V-ODIN-EXECUCAO.md), [Vol. VIII](VOL-VIII-ORACLE-PRODUTO.md), [Vol. X](VOL-X-AEGIS-SEGURANCA-AUDITORIA.md), [Vol. XI](VOL-XI-PHOENIX-REINVENCAO.md).

---

## PREÂMBULO

A pergunta deste volume não é "onde colocamos IA?", e sim **"como a IA faria este processo deixar de existir?"** Melhorar um processo desnecessário é sofisticar o desperdício. Um formulário de doze campos com preenchimento automático continua sendo um formulário de doze campos; a vitória seria nunca tê-lo mostrado.

Este volume trata sistemas probabilísticos como componentes de engenharia. Um componente probabilístico tem contrato, custo por operação, latência, taxa de erro, modo de falha, superfície de ataque e caminho de degradação. Se qualquer desses itens não estiver escrito, o recurso não existe: existe uma demonstração.

Três compromissos estruturam o que segue. **Primeiro:** suba a escada da automação até o degrau mais alto que a confiança verificada permitir, e não além. **Segundo:** nenhuma saída usada em decisão circula sem estar verificada ou marcada como não verificada. **Terceiro:** conteúdo lido pelo sistema é dado, nunca ordem.

O volume é agnóstico a fornecedor, modelo e versão: nomes, janelas de contexto e preços mudam em semanas e transformariam uma constituição em folheto vencido. Permanecem capacidades e restrições — um sistema probabilístico generaliza bem, erra de forma plausível, custa por operação e não garante exatidão. Toda regra abaixo deriva dessas quatro propriedades. Os limites numéricos aqui declarados são **convenções arbitrárias do framework**: cada projeto deve recalibrá-los e registrar a calibração no Registro de Decisões ([Vol. V, Art. 54](VOL-V-ODIN-EXECUCAO.md)).

---

## ARTIGO 91 — A ESCADA DA AUTOMAÇÃO

Todo processo candidato à IA é classificado em um dos seis degraus. Suba o máximo que a confiança permitir.

```
A5  ELIMINAR      · a etapa deixa de existir; o usuário nunca soube dela
A4  EXECUTAR SÓ   · age sem perguntar; reversão em um toque
A3  EXECUTAR COM  · propõe a ação completa; usuário confirma
A2  PRÉ-PREENCHER · entrega o trabalho feito; usuário edita
A1  SUGERIR       · aponta opções; usuário escolhe
A0  ASSISTIR      · responde quando chamado; usuário faz tudo
```

**Regra de subida.** O degrau máximo depende de duas variáveis: **acerto verificado** (Art. 97) e **custo do erro**. Convenção do framework: A3 exige acerto a partir de 90%; A4, a partir de 95% **e** reversão em um passo; A5 exige que a saída seja irrelevante para o usuário.

| Custo do erro | A2 | A3 | A4 | A5 |
|---|---|---|---|---|
| Reversível em 1 passo | livre | livre | permitido | permitido |
| Caro de reverter | livre | permitido | só com plano de reversão | proibido |
| Irreversível (dinheiro, envio, exclusão) | livre | teto obrigatório | proibido | proibido |

**Gatilho de rebaixamento.** Acerto abaixo do limiar em duas janelas consecutivas de medição desce o recurso um degrau e abre revisão. Descer é rotina, não incidente.

---

## ARTIGO 92 — O TESTE DE ELIMINAÇÃO

Nenhum recurso de IA é aprovado sem este artefato escrito.

**Perguntas obrigatórias:**
1. Se este processo deixasse de existir amanhã, o que aconteceria?
2. Quem sentiria falta — do processo ou do resultado dele?
3. O que precisaria ser verdade para que ninguém sentisse falta?
4. Esses pré-requisitos são obtíveis com dados ou regras que já temos?
5. Ele existe para o usuário, para legado técnico ou para conforto interno?
6. Com que frequência roda e qual resultado final produz?

**Regra de decisão.** Respostas 3 e 4 obtíveis tornam o processo candidato a **A5**, e investir em degraus intermediários passa a exigir justificativa registrada. Processo que existe só por limitação técnica antiga ou conforto interno é **dívida de produto**, não candidato a IA.

**Formato do artefato.** Bloco de até quinze linhas: nome, frequência, resultado final, respostas 1 a 6, degrau-alvo, pré-requisitos faltantes. Sem ele, o Conselho de IA não pauta o recurso.

---

## ARTIGO 93 — QUANDO NÃO USAR IA

Qualquer uma das quatro condições abaixo veta o componente probabilístico — não o recurso.

| Condição | Teste objetivo | Alternativa obrigatória |
|---|---|---|
| Determinístico | Regra, tabela ou consulta sempre produz a resposta correta | Regra, com IA no máximo na entrada |
| Custo maior que valor | Custo por operação supera o valor gerado | Redesenhar o fluxo ou eliminá-lo |
| Exatidão absoluta | Um erro já é inaceitável (valor, identidade, permissão, obrigação legal) | Determinismo, com IA só sugerindo |
| Não verificável | Nem regra, nem fonte, nem usuário sabem se a saída está certa | Não construir |

**Regra da não verificabilidade.** Sem verificabilidade não há avaliação; sem avaliação não há regressão detectável; o recurso apodrece em silêncio.

---

## ARTIGO 94 — ARQUITETURA DO RECURSO DE IA

Todo recurso declara sua fronteira: o modelo ocupa a faixa de ambiguidade; antes e depois, determinismo.

```
[entrada]→[normalização det.]→[montagem de contexto]→( MODELO )
                                                          ↓
   [validação de esquema det.]→[verificação de fatos]→[política de ação det.]
                                                          ↓
                                        [efeito]  ou  [proposta ao usuário]
```

**Regras de fronteira.** (a) O modelo nunca decide permissão, valor monetário ou identidade. (b) Toda saída atravessa validação de formato antes de qualquer uso; fora do esquema é falha, não conteúdo. (c) Efeitos externos — envio, cobrança, exclusão, escrita em terceiros — são executados por código determinístico com parâmetros já validados. (d) Reduzir a superfície probabilística é reduzir a superfície de erro.

---

## ARTIGO 95 — CONTEXTO, RECUPERAÇÃO E MEMóRIA

**Contexto mínimo suficiente.** Cada chamada recebe o menor conjunto de informação que sustenta a tarefa — extensão do [Vol. VI, Art. 61](VOL-VI-NEXUS-MALHA.md). Excedente aumenta custo, latência e diluição da instrução.

**Recuperação.** Todo trecho carrega origem e data; sem origem rastreável, não entra. A recuperação é avaliada à parte: se o trecho certo não é recuperado, o erro é de busca, e trocar de modelo não corrige.

**Memória.** Três camadas: **sessão** (descartada ao fim), **preferência** (persistida, visível e editável pelo usuário), **fato do domínio** (persistido, com dono e fonte). É proibido persistir como preferência inferência que o usuário não possa ver e apagar.

**Gatilho:** contexto grande e imutável repetido vira artefato reutilizável; se o contexto cresce mais rápido que a qualidade da resposta, corte contexto antes de trocar modelo.

---

## ARTIGO 96 — FERRAMENTAS E AGENTES

Agente é laço: o modelo escolhe ação, observa resultado e decide de novo. Caro por construção, só se justifica sob três condições **simultâneas**: (1) o número de passos não é conhecido de antemão; (2) cada passo depende do anterior; (3) existe critério objetivo de parada. Faltando uma, use fluxo fixo com chamadas pontuais — mais barato, previsível e testável.

**Contenção obrigatória:** teto de iterações; orçamento de custo e tempo por execução; conjunto mínimo de ferramentas (nenhuma "por precaução"); ferramenta com efeito externo em A3 ou sob confirmação; registro de cada passo; aborto que devolve o controle com o estado parcial preservado.

**Gatilho de veto:** agente sem critério de parada objetivo é reprovado, seja qual for sua qualidade.

---

## ARTIGO 97 — AVALIAÇÃO ANTES DE PRODUÇÃO

Nenhum recurso de IA vai para produção sem três artefatos.

1. **Conjunto de casos.** Entrada e saída esperada, cobrindo: caminho comum, caso ambíguo, caso adversarial, entrada vazia, outro idioma, entrada longa demais e caso cuja resposta correta é "não sei". Convenção do framework: mínimo de 30 casos, ao menos 20% deles de recusa.
2. **Critério de aceitação.** Número declarado antes da execução, com definição escrita de "acerto" e corte por classe de erro.
3. **Medição de regressão.** O conjunto é reexecutado a cada mudança de prompt, contexto, recuperação, ferramenta ou fornecedor — todas são mudança de comportamento.

**Regra de erro assimétrico.** Classifique cada erro em cosmético, corrigível pelo usuário, silencioso (parece certo e está errado) e perigoso (dispara efeito externo indevido). Silencioso e perigoso têm tolerância zero por padrão; exceção exige registro com justificativa.

---

## ARTIGO 98 — ALUCINAÇÃO E VERIFICAÇÃO

Sistema probabilístico erra de forma **plausível**: o risco central é a aparência de acerto, não a frequência.

**Regra da marcação.** Toda saída usada em decisão pertence a uma de três classes, visível no artefato e na interface. Os marcadores abaixo são próprios deste volume e não se confundem com os símbolos da Matriz de Conhecimento ([Vol. III, Art. 25](VOL-III-PROMETHEUS-DESCOBERTA.md)), que continua sendo a única dona daqueles símbolos:

| Classe | Definição | Uso permitido |
|---|---|---|
| `[V]` Verificada | Confrontada com fonte, regra ou cálculo | Decisão; exibição como fato |
| `[D]` Derivada | Coerente com o contexto, sem confronto externo | Decisão com confirmação humana |
| `[NV]` Não verificada | Sem fonte confrontável | Rascunho; proibida em decisão |

**Regras complementares.** (a) Número, data, nome próprio, valor e citação vindos do modelo são não verificados até confronto com fonte. (b) Havendo fonte, ela é alcançável no ponto de uso. (c) "Não sei" é resposta válida e premiada no conjunto de avaliação.

---

## ARTIGO 99 — INTERFACE DE SISTEMAS PROBABILÍSTICOS

Uma interface probabilística não pode fingir certeza que não tem.

**Quatro obrigações de projeto:**
- **Mostrar incerteza sem ruído.** A incerteza aparece como estado do conteúdo (rascunho, sugerido, verificado). Percentual só é exibido quando muda a ação possível do usuário.
- **Correção barata.** Toda saída é editável no lugar, sem sair do fluxo. Se editar custa mais que refazer, o recurso é negativo.
- **Reversão barata.** Toda ação em A4 tem desfazer visível por janela declarada. Sem desfazer, o degrau cai para A3.
- **Confirmação como segurança.** É o mecanismo mais barato existente: transfere a verificação para quem tem contexto ao custo de uma interação. Use-a onde a verificação automática for cara ou impossível; no inofensivo, ela treina o usuário a confirmar sem ler.

**Gatilho:** confirmação aceita sem leitura perdeu a função; substitua por reversão fácil ou reduza a frequência da pergunta.

---

## ARTIGO 100 — CUSTO E LATÊNCIA COMO REQUISITO

Custo e latência são requisitos escritos antes da implementação, não descobertas de fatura.

**Artefato obrigatório — Orçamento por Operação:** custo máximo por operação; latência-alvo percebida; latência máxima tolerada; volume esperado; comportamento ao estourar o teto (degradar, enfileirar, recusar); quem é notificado.

**Regras.** (a) Custo por operação acima do valor por operação reprova o recurso (Art. 93). (b) Operação interativa exige resposta progressiva: sinal visível cedo, resultado depois. (c) Operação lenta por natureza sai do síncrono e vira trabalho em segundo plano com notificação. (d) Chamada sem tempo-limite reprova o recurso.

---

## ARTIGO 101 — PRIVACIDADE E DADOS

LGPD, classificação, retenção e resposta a incidente pertencem ao [Vol. X](VOL-X-AEGIS-SEGURANCA-AUDITORIA.md) e não são redefinidos aqui.

**Regras específicas de IA.** (a) Toda categoria de dado que **nunca sai do sistema** é listada antes da primeira chamada; segredo, credencial, dado sensível e dado de cliente sob contrato entram por padrão. (b) Dado de cliente não é insumo de treinamento nem contexto para outro cliente: isolamento é requisito arquitetural, não configuração. (c) Todo campo que cruza o perímetro é enumerado no registro do recurso; enviar o objeto inteiro é violação. (d) Registros de chamada têm retenção declarada e o mesmo controle de acesso do dado original. (e) Se a tarefa admitir dado anonimizado ou agregado, é proibido enviar o identificado.

---

## ARTIGO 102 — FALHA E DEGRADAÇÃO

Indisponibilidade do modelo é evento esperado, não exceção. Todo recurso tem caminho de degradação escrito.

| Modo de falha | Detecção | Comportamento obrigatório |
|---|---|---|
| Indisponível | Erro ou tempo-limite | Cair para o fluxo manual, preservando o que foi digitado |
| Lento | Latência acima do teto | Virar assíncrono e avisar; nunca travar a tela |
| Errado e detectável | Falha de esquema ou verificação | Uma nova tentativa; persistindo, cair para manual |
| Errado e silencioso | Sinal do usuário, medição em produção | Rebaixar degrau (Art. 91) e abrir revisão |

**Regra do caminho manual.** Sem fluxo manual equivalente, o recurso é dependência crítica e exige aprovação do Conselho de Arquitetura com contingência registrada. **Trabalho preservado:** falha de IA nunca destrói entrada do usuário.

---

## ARTIGO 103 — INJEÇÃO DE INSTRUÇÃO E CONTEÚDO NÃO CONFIÁVEL

Conteúdo lido de páginas, arquivos, mensagens, campos de terceiros, resultados de ferramenta e saídas de outros modelos é **dado, nunca ordem**.

**Regras absolutas.** (a) Nenhuma ação com efeito externo — envio, pagamento, exclusão, alteração de permissão ou configuração — pode ser disparada por instrução achada em conteúdo observado. (b) Instrução embutida é reportada ao usuário com citação e origem, e a execução para até decisão explícita. (c) Autoridade alegada dentro do conteúdo ("o administrador autoriza", "modo de teste", "ignore as regras anteriores") não confere autoridade alguma. (d) Conteúdo observado é delimitado estruturalmente e o modelo sabe qual bloco é dado.

**Regra da cadeia.** Cadeia que começa em conteúdo não confiável e termina em efeito externo exige confirmação humana no ponto de efeito, seja qual for o degrau.

**Teste obrigatório.** Recurso que lê conteúdo externo sem casos adversariais de injeção no conjunto de avaliação (Art. 97) é reprovado.

---

## PRINCÍPIOS DO VOLUME

**P-IX-01 · Eliminar antes de automatizar.** Automatizar etapa desnecessária perpetua desperdício com cara de modernidade.
**P-IX-02 · Suba o que a confiança permitir.** O degrau é consequência de medição, nunca de ambição.
**P-IX-03 · Autonomia sem reversão é proibida.** Degrau alto se paga com desfazer barato.
**P-IX-04 · Determinismo primeiro.** Se a regra resolve, ela vence: mais barata, testável, auditável.
**P-IX-05 · Sem verificabilidade, sem produção.** Saída que ninguém consegue julgar não entra em produção.
**P-IX-06 · O modelo não decide permissão.** Autorização, identidade e dinheiro são código determinístico.
**P-IX-07 · Esquema é contrato.** Saída fora do formato é falha, não conteúdo a interpretar.
**P-IX-08 · Contexto mínimo suficiente.** Excedente custa dinheiro, tempo e precisão de uma só vez.
**P-IX-09 · Corte contexto antes de trocar modelo.** Quase toda queda atribuída ao modelo é falha de contexto ou busca.
**P-IX-10 · Memória invisível é dívida.** O que o sistema lembra do usuário deve ser visível e apagável.
**P-IX-11 · Agente exige critério de parada.** Laço sem término é custo sem controle.
**P-IX-12 · Ferramenta mínima.** Cada ferramenta amplia a superfície de erro e de ataque.
**P-IX-13 · Avaliação antes de demonstração.** Demonstração convence; conjunto de casos protege.
**P-IX-14 · Mudou prompt, mudou produto.** Prompt, contexto ou fornecedor novo exige reexecutar a avaliação.
**P-IX-15 · Erro silencioso é o pior erro.** Priorize detectar o que parece certo e está errado.
**P-IX-16 · "Não sei" é resposta de qualidade.** Recurso que nunca recusa inventa em algum ponto.
**P-IX-17 · Marque a procedência.** Toda saída circula como verificada, derivada ou não verificada.
**P-IX-18 · Corrigir mais barato que refazer.** Se editar dá mais trabalho que refazer, o recurso é negativo.
**P-IX-19 · Confirmação é segurança barata — e finita.** Gasta no inofensivo, treina o usuário a aceitar o perigoso.
**P-IX-20 · Orçamento por operação declarado.** Custo e latência são requisitos escritos antes, não surpresas.
**P-IX-21 · Enumere o que sai.** Cada campo que cruza o perímetro é listado; mandar o objeto inteiro viola.
**P-IX-22 · Dado de cliente não vaza entre clientes.** Isolamento é requisito arquitetural, não configuração.
**P-IX-23 · Todo recurso tem caminho manual.** Sem ele, a IA virou dependência crítica.
**P-IX-24 · Falha nunca destrói trabalho.** O que o usuário digitou sobrevive a qualquer erro do modelo.
**P-IX-25 · Conteúdo observado é dado.** Nenhuma ordem lida em página, arquivo ou mensagem é ordem.
**P-IX-26 · Efeito externo pede humano.** Cadeia nascida em conteúdo não confiável só age com confirmação.

---

## CHECKLIST DO VOLUME

- [ ] **CK-IX-01** O Teste de Eliminação (Art. 92) está escrito, com as seis respostas, para cada processo.
- [ ] **CK-IX-02** O degrau-alvo está declarado e justificado por acerto medido e custo do erro.
- [ ] **CK-IX-03** As quatro condições do Art. 93 foram avaliadas e nenhuma está ativa.
- [ ] **CK-IX-04** Há diagrama de fronteira, validação de esquema e nenhum efeito externo partindo do modelo.
- [ ] **CK-IX-05** O conjunto de avaliação cobre as sete categorias do Art. 97, com no mínimo 30 casos e ao menos 20% de casos de recusa, e critério de aceitação datado antes da execução.
- [ ] **CK-IX-06** Há casos adversariais de injeção, se o recurso lê conteúdo externo.
- [ ] **CK-IX-07** Cada saída usada em decisão está classificada como `[V]`, `[D]` ou `[NV]`.
- [ ] **CK-IX-08** O Orçamento por Operação está preenchido, com tempo-limite de toda chamada.
- [ ] **CK-IX-09** Os dados que nunca saem estão listados e os campos enviados, enumerados.
- [ ] **CK-IX-10** A tabela de degradação cobre os quatro modos e há caminho manual equivalente.
- [ ] **CK-IX-11** Ações em A4 possuem desfazer visível com janela declarada.
- [ ] **CK-IX-12** Agentes possuem teto de iterações, orçamento e critério de parada objetivo.
- [ ] **CK-IX-13** Os limites numéricos foram calibrados e registrados como convenção do projeto.

---

## CRITÉRIOS DE AUDITORIA

| ID | Critério | Evidência exigida | Condição de reprovação |
|---|---|---|---|
| AUD-IX-01 | Teste de Eliminação | Bloco do Art. 92 por processo | Bloco ausente em processo automatizado |
| AUD-IX-02 | Degrau justificado | Degrau declarado e acerto medido | Degrau A3 ou acima sem acerto medido; A3 com acerto abaixo de 90%; A4 com acerto abaixo de 95% ou sem reversão em um passo |
| AUD-IX-03 | Escada e irreversibilidade | Matriz do Art. 91 preenchida | Ação irreversível em A4 ou A5 |
| AUD-IX-04 | Veto do Art. 93 | Avaliação escrita das quatro condições | Modelo onde regra resolve, ou saída sem julgamento |
| AUD-IX-05 | Fronteira arquitetural | Diagrama do Art. 94 e validação | Efeito externo pelo modelo, ou saída sem validação |
| AUD-IX-06 | Autoridade determinística | Mapa de decisões de permissão e valor | Permissão, identidade ou valor decidido pelo modelo |
| AUD-IX-07 | Contexto e recuperação | Especificação do contexto; origem dos trechos | Contexto não usado, ou trecho sem origem |
| AUD-IX-08 | Memória visível | Tela de preferências memorizadas | Inferência persistida invisível ao usuário |
| AUD-IX-09 | Contenção de agente | Condições do Art. 96, teto e orçamento | Agente sem parada objetiva ou sem teto |
| AUD-IX-10 | Conjunto e aceitação | Casos com saída esperada; critério datado antes | Menos de 30 casos, menos de 20% de casos de recusa, ou critério de aceitação datado após a execução |
| AUD-IX-11 | Regressão | Histórico de execuções por versão | Mudança de prompt ou fornecedor sem reexecução |
| AUD-IX-12 | Classificação de erro | Tabela de erros por classe | Erro silencioso ou perigoso sem tolerância declarada |
| AUD-IX-13 | Marcação de procedência | Artefato e interface com `[V]` `[D]` `[NV]` | Saída não verificada em decisão sem marcação |
| AUD-IX-14 | Reversão em A4 | Demonstração do desfazer | Ação autônoma sem desfazer na janela declarada |
| AUD-IX-15 | Orçamento por operação | Artefato do Art. 100 preenchido | Falta custo máximo ou tempo-limite |
| AUD-IX-16 | Perímetro e isolamento | Lista de campos enviados e retidos | Dado proibido enviado, ou dado de um cliente no contexto de outro |
| AUD-IX-17 | Degradação | Tabela do Art. 102 e teste de falha | Modo sem comportamento definido, ou perda de entrada |
| AUD-IX-18 | Resistência a injeção | Casos adversariais executados | Efeito externo vindo de conteúdo observado |
| AUD-IX-19 | Calibração declarada | Registro de Decisões com os limites | Números do volume usados sem calibração |
