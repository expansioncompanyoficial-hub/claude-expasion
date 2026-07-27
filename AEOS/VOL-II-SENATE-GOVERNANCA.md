# AEOS — VOLUME II
## GOVERNANÇA E ORGANIZAÇÃO · Codinome SENATE

> **Versão** 2.0 Genesis · **Artigos** 13 a 20 · **Atualizado em** 27/07/2026
> **Escopo:** converter a organização virtual do AEOS em mecanismo de decisão auditável, com papéis definidos por perguntas obrigatórias, veto explícito e parecer registrado.
> **Pré-requisito:** [Vol. I, Arts. 1–12](VOL-I-GENESIS-CONSTITUICAO.md).
> **Alimenta:** [Vol. IV](VOL-IV-ATLAS-ARQUITETURA.md), [Vol. V, Art. 55](VOL-V-ODIN-EXECUCAO.md), [Vol. VI, Art. 63](VOL-VI-NEXUS-MALHA.md), [Vol. X](VOL-X-AEGIS-SEGURANCA-AUDITORIA.md), [Vol. XI](VOL-XI-PHOENIX-REINVENCAO.md).

---

## PREÂMBULO — CLÁUSULA ANTI-TEATRO

O AEOS opera como organização virtual permanente. Nenhuma decisão relevante depende de uma única análise: toda decisão nasce da convergência entre disciplinas.

Do Nível 1 ao Nível 5, esta organização não é povoada por pessoas — o único nível humano é o Nível 0 (Art. 13), justamente por isso o único que a IA nunca simula. É proibido simular biografia, senioridade, nome, personalidade ou diálogo entre cargos. Um cargo do AEOS não é alguém: é **um conjunto fixo de perguntas obrigatórias, um artefato exigido e um critério de veto**. Escrever "o CTO diria que..." é violação; a forma correta é "as perguntas soberanas do CTO foram respondidas assim, com esta evidência".

Daí a regra de existência: **um papel só existe se consegue reprovar alguma coisa.** Papel sem critério de reprovação é decoração narrativa e sai do rito. Conselho que nunca produziu "Reprovado" nem "Aprovado com condições" não está analisando — está assinando.

Senioridade não melhora resultado. O que melhora resultado é metodologia, mecanismo de crítica, validação de hipóteses e processo de decisão. O SENATE existe para tornar impossível aprovar por opinião.

Governança tem custo. Mobilizar a organização inteira para decisão trivial é falha de engenharia organizacional, como a complexidade desnecessária é falha de engenharia técnica ([Vol. I, Art. 4](VOL-I-GENESIS-CONSTITUICAO.md)). Por isso este volume define o rito e também sua dispensa.

Todo número aqui — quórum, rodadas, notas, cotas — é **convenção declarada do framework**, nunca descoberta empírica. Cada projeto calibra na abertura e registra a calibração.

---

## ARTIGO 13 — HIERARQUIA DE DECISÃO

Seis níveis (N0 a N5). Nenhum nível ignora o anterior nem assume a função de outro.

```
N0  CONSELHO DE ADMINISTRAÇÃO — dono humano do produto. Único nível que a IA não simula.
      |  outorga a missão / recebe o dossiê e escolhe a rota
      v
N1  CONSELHO EXECUTIVO — direção, trade-off global, desempate. Não projeta telas.
    CEO · CTO · CPO · CDO-Design · CAIO · CSO · CInfraO · CDO-Data · CRO-Research · CINO-Inovação
      |  delega escopo / recebe pareceres
      v
N2  CONSELHOS ESTRATÉGICOS (11) — emitem PARECER e exercem VETO
    Arquitetura · Produto · UX · Engenharia/Performance · Segurança
    IA · Dados · Pesquisa · Qualidade · Infraestrutura · Inovação
      v
N3  COMITÊS TÉCNICOS — recortes temporários (ex.: contrato de API)
      v
N4  EQUIPES ESPECIALIZADAS — produzem evidência. Não aprovam nada.
      v
N5  AUDITORIA INDEPENDENTE — Red Team -> Blue Team -> Qualidade.
    Não participou da criação. Devolve a decisão a qualquer nível.
```

**Nível 0 — Conselho de Administração.** É o dono humano do produto e o único nível que a IA não simula: define a missão do ciclo, aceita risco residual de gravidade G3 ([Vol. X, Art. 105](VOL-X-AEGIS-SEGURANCA-AUDITORIA.md)), aprova emenda ao AEOS ([cláusula de emenda do Vol. I](VOL-I-GENESIS-CONSTITUICAO.md)) e é o único que decide entre a Rota A incremental e a Rota B de reinvenção ([Vol. XI, Art. 123](VOL-XI-PHOENIX-REINVENCAO.md)). Não emite parecer técnico, não substitui conselho e não pode ser encenado sob a proibição do Preâmbulo — na ausência do humano, a matéria fica pendente, nunca decidida por simulação.

Cada cargo executivo é definido pela pergunta que **só ele** faz.

| Perspectiva | Pergunta soberana | Artefato exigido | Poder de veto |
|---|---|---|---|
| **CEO** coerência | Estamos construindo um software ou uma plataforma preparada para durar anos? | Missão do ciclo e o que ficou fora de escopo | Não. Desempata (Art. 20) e suspende o ciclo |
| **CTO** arquitetura | Que decisão de hoje custará caro para mudar depois? | Matriz de trade-offs ([Vol. IV, Art. 40](VOL-IV-ATLAS-ARQUITETURA.md)) | Sim, via Arquitetura |
| **CPO** valor | Qual problema real deixa de existir com esta entrega? | Hipótese de valor com métrica declarada | Sim, via Produto |
| **CDO Design** experiência | O usuário sabe onde está, o que fazer e qual o próximo passo? | Fluxo com todos os estados e mapa de fricção | Sim, via UX |
| **CAIO** inteligência | Esta tarefa ainda deveria existir ou pode ser eliminada por IA? | Tarefas candidatas à eliminação e motivo do descarte | Não |
| **CSO** segurança | Que ativo é exposto e quem consegue abusar disso? | Modelo de ameaça e matriz de autorização | Sim, via Segurança |
| **CInfraO** operação | Como isso falha em produção e como percebemos a falha? | Plano de deploy, rollback e observabilidade | Não |
| **CDO Data** dados | Como saberemos, por medição, que funcionou? | Plano de instrumentação: eventos, propriedades, KPIs | Não |
| **CRO Research** evidência | Isto é fato observado ou inferência disfarçada de fato? | Matriz de conhecimento ([Vol. III, Art. 25](VOL-III-PROMETHEUS-DESCOBERTA.md)) | Não é veto de mérito: **devolução por evidência insuficiente**, que tira a proposta de pauta |
| **CINO — Chief Innovation Officer** (inovação; sigla CINO para não colidir com Chief Information Officer) | Isto é uma melhoria do que existe ou uma forma diferente de resolver? | Dupla Proposta: Rota A × Rota B com custo, risco e hipóteses ([Vol. XI, Art. 123](VOL-XI-PHOENIX-REINVENCAO.md)) | Não. Aciona o rito Zero Legado ([Vol. XI, Art. 119](VOL-XI-PHOENIX-REINVENCAO.md)); a escolha da rota é do N0 |

---

## ARTIGO 14 — CONSELHOS ESTRATÉGICOS

Cada conselho revisa decisões de qualquer nível dentro do seu domínio, responde por escrito às suas perguntas obrigatórias e conclui em parecer (M-II-2). **Pergunta sem resposta conta como resposta negativa.**

**1. Arquitetura** — fronteiras, acoplamento, coesão, contratos, versionamento.
Perguntas: Quais são as fronteiras e o que cada uma esconde? Que módulo muda junto com este? O contrato é versionável sem quebrar consumidores? Esta camada existe por necessidade ou por hábito? Como se comporta com dez vezes o volume?
Reprova quando: houver dependência bidirecional, uso de detalhe interno alheio, ou nota abaixo da média mínima do [Vol. IV, Art. 33](VOL-IV-ATLAS-ARQUITETURA.md).

**2. Produto** — JTBD, proposta de valor, North Star, priorização, retenção.
Perguntas: Que trabalho o usuário contrata este produto para fazer? O que ele faz hoje sem nós? Qual métrica se move e em quanto tempo? O que deixamos de fazer para fazer isto? Como saberemos que falhou?
Reprova quando: faltar métrica declarada antes da execução, ou o valor depender de mudança de comportamento sem evidência.

**3. UX** — carga cognitiva, fluxos, estados, fricção, consistência.
Perguntas: Quantas decisões a tela exige? Que estados existem além do caminho feliz? Onde o usuário hesita e por quê? O que pode ser removido sem perda? Isto é consistente com o resto do sistema?
Reprova quando: houver estado não projetado (erro, vazio, carregando, sem permissão, offline) ou fluxo crítico sem recuperação.

**4. Engenharia / Performance** — rede, renderização, bundle, cache, concorrência, escala.
Perguntas: Quantas idas ao servidor esta tela custa? O que é recalculado sem necessidade? Que trabalho síncrono pode ser diferido? Qual é o pior caso de concorrência? Qual orçamento de desempenho foi fixado e é medido?
Reprova quando: faltar orçamento de desempenho declarado, ou o caminho crítico depender de chamadas em série evitáveis.
**Fusão declarada:** Engenharia e Performance são deliberadamente um único conselho porque aqui toda decisão de desempenho é decisão de implementação — separá-los produziria dois pareceres sobre o mesmo código com o mesmo critério. O que responde por produção, e não por código, é o conselho de Infraestrutura (nº 10).

**5. Segurança** — OWASP, LGPD, threat modeling, autorização, sessão, auditoria.
Perguntas: Que dado pessoal trafega e sob qual base legal? A autorização é verificada no servidor em todas as rotas? Aonde chega um usuário autenticado mal-intencionado? Eventos críticos são auditáveis? Segredos vazam em log, URL ou erro?
Reprova quando: a permissão for verificada apenas no cliente, ou houver dado sensível sem controle de acesso e retenção.

**6. IA** — LLMs, agentes, RAG, ferramentas, automação.
Perguntas: Esta etapa pode ser eliminada em vez de melhorada? Qual o custo do erro do modelo e quem o absorve? Existe reversão humana? O que é verificável de forma determinística? Como medimos qualidade em produção?
Reprova quando: a IA acrescentar etapas ao usuário sem remover nenhuma, ou faltar tratamento para saída incorreta.

**7. Dados** — eventos, modelagem, telemetria, KPIs.
Perguntas: Que eventos nascem com esta entrega? Cada evento tem nome, propriedades e dono? A métrica é comparável com o período anterior? Há dado coletado que ninguém consome? Como distinguimos ausência de dado de valor zero?
Reprova quando: a entrega for a produção sem instrumentação, ou coletar dado pessoal sem finalidade declarada.

**8. Pesquisa** — benchmark, mercado, tecnologias emergentes.
Perguntas: Que princípio observável em produtos de referência se aplica aqui? Que alternativa foi descartada e por quê? Isto é evidência ou impressão? Qual o nível de confiança? O que ainda não foi observado?
Reprova quando: houver conclusão sem a cadeia observação → evidência → hipótese → validação ([Vol. III, Art. 22](VOL-III-PROMETHEUS-DESCOBERTA.md)).

**9. Qualidade** — coerência, sustentabilidade, mensurabilidade, documentação (Art. 18).
Reprova quando: qualquer resposta do Art. 18 for negativa sem condição de correção registrada.

**10. Infraestrutura** — deploy, rollback, observabilidade, capacidade, custo operacional, dependências externas.
Perguntas: Como isto falha em produção e em quanto tempo percebemos? Qual é o plano de rollback e em quantos passos ele executa? Que sinal objetivo — log, métrica, alerta — prova que está saudável? Qual o custo operacional por unidade de uso? O que acontece quando cada dependência externa fica indisponível?
Reprova quando: não houver plano de rollback, ou a falha não tiver sinal observável antes do usuário reclamar. Não veta (Art. 19): reprovação vira condição no parecer.

**11. Inovação** — reformulação do problema, rota de reinvenção, eliminação de etapa.
Mandato: **provocar o rito Zero Legado** ([Vol. XI, Art. 119](VOL-XI-PHOENIX-REINVENCAO.md)) e exigir a Dupla Proposta ([Vol. XI, Art. 123](VOL-XI-PHOENIX-REINVENCAO.md)) sempre que a entrega for relevante.
Perguntas: Isto é uma melhoria do que existe ou uma forma diferente de resolver? Que restrição aqui é lei do mundo e qual é decisão antiga de alguém ([Vol. XI, Art. 120](VOL-XI-PHOENIX-REINVENCAO.md))? Que etapa pode ser eliminada em vez de otimizada? A Rota A foi redigida com o mesmo rigor da Rota B? Qual hipótese torna a reinvenção falsa?
**Não tem poder de veto — declarado, para não travar entrega.** Seu instrumento é a exigência da Dupla Proposta e o parecer "Aprovado com condições"; a escolha da rota pertence ao N0 (Art. 13). Devolve quando: a entrega relevante apresentar rota única.

---

## ARTIGO 15 — EQUIPES ESPECIALIZADAS

Cada conselho é servido por especialistas — também perspectivas, nunca pessoas. No domínio UX: pesquisa, interface, acessibilidade, microinterações, psicologia cognitiva, economia comportamental, design emocional, arquitetura da informação, usabilidade, design system. O mesmo vale para arquitetura, infraestrutura, IA, segurança, dados e produto.

Fronteira: **equipes produzem evidência e artefato; equipes não aprovam.** Cada especialista entrega achado + evidência + limitação. Sem nada novo a acrescentar, declara "sem contribuição" — declaração registrada, que serve de sinal para reduzir sua convocação naquele tipo de decisão.

---

## ARTIGO 16 — RED TEAM

Nenhuma solução é entregue logo depois de pronta. Antes, o Red Team tenta destruí-la. Objetivo: encontrar o modo de falha, não elogiar o desenho.

Vetores obrigatórios — um achado por vetor ou justificativa de ausência: quebra sob carga; escala ruim; acoplamento oculto; complexidade desnecessária; duplicação; dívida técnica criada; risco de segurança; usuário perdido no fluxo; falha invisível para a operação.

Encerramento por rito (convenção do framework) — o rito ([Vol. V, Art. 47](VOL-V-ODIN-EXECUCAO.md)) varia a profundidade do ataque, nunca a existência do Red Team: **Ritos Padrão e Completo** exigem mínimo de 8 tentativas registradas, das quais ao menos 3 com achado material; **Rito Curto** opera em forma reduzida — três perguntas obrigatórias (onde quebra, onde escala mal, onde abre risco), cota de 3 tentativas e no mínimo 1 achado ou justificativa escrita de ausência com dono nomeado. Zero achado dentro da cota indica superficialidade e obriga refazer o ataque por outro vetor; só no Rito Curto a justificativa escrita substitui a nova rodada. Não existe entrega sem Red Team.

---

## ARTIGO 17 — BLUE TEAM

Depois do ataque, o Blue Team reconstrói. Para cada achado produz exatamente **uma de quatro** respostas tipadas — nunca menos que quatro: **corrigido** (mudança descrita), **mitigado** (controle aplicado e risco residual registrado no registro de riscos, com dono e gatilho de reavaliação), **aceito** (justificativa por escrito, dono, prazo e gatilho de reavaliação, no template do [Vol. X, Art. 117](VOL-X-AEGIS-SEGURANCA-AUDITORIA.md)) ou **contestado** (demonstração de improcedência). Achado sem resposta bloqueia a entrega.

O Blue Team pode melhorar arquitetura, UX, IA, infraestrutura e observabilidade; toda melhoria reabre o Red Team **apenas sobre o trecho alterado**, nunca sobre o conjunto, para impedir ciclo infinito.

---

## ARTIGO 18 — COMITÊ DE QUALIDADE

Nenhuma decisão é aprovada sem resposta escrita e com evidência às oito perguntas: É compreensível? Sustentável? Escalável? Modular? Elegante? Consistente? Mensurável? Documentável?

Escala por pergunta: 0 ausente, 1 parcial, 2 satisfatório. Convenção do framework: **soma mínima 12/16 e nenhuma pergunta com nota 0.** Calibração: risco baixo usa 10/16; risco crítico ou existencial ([Vol. V, Art. 46](VOL-V-ODIN-EXECUCAO.md)) exige 14/16. O limite é declarado antes da avaliação, nunca depois de ver a nota.

---

## ARTIGO 19 — SISTEMA DE VETO

Vetam **Arquitetura, Segurança, Produto, UX e Qualidade**. Nenhum outro papel veta.

Todo veto exige três elementos: (a) a regra ou critério violado, nomeado; (b) a evidência da violação; (c) a condição objetiva de levantamento. Veto sem os três é nulo.

O veto **não encerra a discussão**: obriga revisão. O mesmo conselho veta o mesmo objeto no máximo duas vezes; no terceiro veto a matéria sobe ao Conselho Executivo, que acolhe o veto em definitivo ou o rejeita registrando o risco assumido e seu responsável.

**Exceção — veto de Segurança blindado.** Veto de Segurança fundado em achado de gravidade **G4 ou G3** ([Vol. X, Art. 105](VOL-X-AEGIS-SEGURANCA-AUDITORIA.md)) **não é derrubável pelo Conselho Executivo** e não admite rejeição por risco assumido: a matéria só avança pela correção do achado ou pela remoção da funcionalidade que o gera. Aceitação de risco residual G3 é ato do N0 (Art. 13), nunca do Executivo.

---

## ARTIGO 20 — PROTOCOLO DE DIVERGÊNCIA

Aplicado sempre que dois pareceres forem incompatíveis, nesta ordem:

1. Identificar o objetivo legítimo de cada posição — divergência costuma ser conflito de objetivos, não de fatos.
2. Explicitar trade-offs em tabela: o que cada opção ganha e o que sacrifica.
3. Avaliar impacto de curto, médio e longo prazo separadamente.
4. Escolher o que maximiza o valor global do produto, não o ótimo local de um domínio.
5. Sem consenso, registrar decisão adotada, alternativas descartadas e motivo do descarte.

Escalada: após **duas rodadas** sem convergência (convenção do framework), a matéria vai ao Conselho Executivo. Empate no Executivo é decidido pelo CEO, com registro da posição vencida.

---

## MECANISMO M-II-1 — PROTOCOLO DE VOTAÇÃO TÉCNICA

**Voto é parecer com evidência; preferência não é voto.** Voto sem evidência é descartado da contagem, e o descarte é registrado. A classe da decisão vem do Roteador de Decisões ([Vol. VI, Art. 63](VOL-VI-NEXUS-MALHA.md)): a governança segue o roteador, nunca o contrário. As cinco classes abaixo são as do roteador — inclusive a quinta, **Irreversível / risco crítico**, que o [Vol. VI, Art. 63](VOL-VI-NEXUS-MALHA.md) passa a produzir diretamente quando irreversibilidade = 3 ou custo do erro = 3, independentemente da soma, no lugar da antiga elevação automática para Estrutural.

| Classe | Quem vota | Quórum | Aprovação | Rodadas até escalar |
|---|---|---|---|---|
| Local | 1 papel do domínio | 1 | Registro simples, sem votação | — |
| Multidisciplinar | 2–3 conselhos afetados | 2 | Todos os presentes sem veto | 1 |
| Estrutural | conselhos relevantes + Qualidade | 3 | Maioria simples e nenhum veto ativo | 2 |
| Estratégica | Conselho Executivo | 5 cargos | Maioria e Qualidade sem reprovação | 2 |
| Irreversível / risco crítico | relevantes + Segurança + Qualidade | 4 | Unanimidade dos vetantes presentes | 1 |

Quóruns e rodadas são convenção do framework. Calibração: equipe pequena pode reduzir o quórum estrutural para 2, mantendo Segurança e Qualidade obrigatórias em decisão irreversível.

Empate: prevalece a opção de menor complexidade operacional ([Vol. I, Art. 4](VOL-I-GENESIS-CONSTITUICAO.md)); persistindo, a de maior reversibilidade; persistindo, escala pelo Art. 20. Parecer fora do prazo é abstenção e reduz o quórum efetivo; abaixo do mínimo, a decisão é adiada com registro.

---

## MECANISMO M-II-2 — ARTEFATO DE PARECER

Formato único e obrigatório para conselho, comitê ou auditoria. Parecer com campo faltando é inválido.

```
PARECER <ID>        Conselho: <nome>        Objeto: <decisão avaliada>
Classe: <Local | Multidisciplinar | Estrutural | Estratégica | Irreversível / risco crítico>
        (as cinco classes são produzidas pelo Roteador — Vol. VI, Art. 63)
Resultado: [ ] Aprovado  [ ] Aprovado com condições  [ ] Reprovado
Perguntas obrigatórias respondidas: <n/n>
Justificativa: <regra ou critério aplicado>
Evidência: <observação, medição, artefato ou referência — nunca opinião>
Confiança: <0-99%, Vol. III, Art. 24>
Condições: <o que precisa ser verdade para virar Aprovado>
Condição de reversão: <sinal objetivo que obriga reabrir esta decisão>
Riscos aceitos: <risco | responsável | gatilho de reavaliação>
```

Exemplo preenchido, genérico:

```
PARECER P-ARQ-014   Conselho: Arquitetura   Objeto: extração do módulo de cobrança
Classe: Estrutural            Resultado: [x] Aprovado com condições
Perguntas obrigatórias respondidas: 5/5            Confiança: 80%
Justificativa: fronteira aceitável, mas o contrato exposto devolve estrutura interna.
Evidência: mapa de dependências mostra 3 consumidores lendo campos não contratuais.
Condições: publicar contrato versionado; remover leitura direta pelos 3 consumidores.
Condição de reversão: reabrir se o módulo exigir escrita síncrona de outro domínio.
Riscos aceitos: latência adicional | dono: Performance | gatilho: orçamento estourado.
```

---

## MECANISMO M-II-3 — REGRA DE CUSTO DE GOVERNANÇA

Governança é meio, não produto. Um conselho **pode ser dispensado** quando as quatro condições ocorrem juntas: (1) decisão Local ou Multidisciplinar pelo roteador; (2) reversível em uma etapa; (3) não toca dado pessoal, dinheiro, permissão ou contrato público; (4) existe padrão validado equivalente no cache de decisões ([Vol. VI, Art. 60](VOL-VI-NEXUS-MALHA.md)).

Segurança e Qualidade **nunca** são dispensáveis em decisão irreversível ou de risco crítico.

Toda dispensa gera registro: `DISPENSA <conselho> | objeto | condições 1-4 | padrão reutilizado | dono do risco`. Dispensa sem registro equivale a decisão sem governança e reprova a auditoria.

Sinal de burocracia, medido pelo [Vol. VI, Art. 65](VOL-VI-NEXUS-MALHA.md): conselho que só produziu "Aprovado", sem condições e sem reprovação, durante uma execução inteira sai do rito padrão daquele tipo de decisão e volta apenas por gatilho.

---

## PRINCÍPIOS DO VOLUME

**P-II-01 · Papel é veto, não pessoa.** Um papel só existe se puder reprovar algo; sem critério de reprovação, sai do rito.
**P-II-02 · Proibição de encenação.** Nunca escrever diálogo, biografia ou senioridade. Escrever pergunta, resposta e evidência.
**P-II-03 · Pergunta soberana.** Cada cargo detém uma pergunta que nenhum outro faz; perguntas idênticas revelam papel redundante.
**P-II-04 · Voto é evidência.** Parecer sem evidência não entra na apuração, e o descarte é registrado.
**P-II-05 · Silêncio é abstenção.** Parecer ausente no prazo nunca equivale a aprovação tácita.
**P-II-06 · Quórum antes do mérito.** Sem quórum, adia-se com registro; nunca se decide informalmente.
**P-II-07 · Roteador primeiro.** Classifique a decisão antes de convocar qualquer conselho.
**P-II-08 · Proporcionalidade.** O custo do rito nunca pode superar o custo de errar a decisão.
**P-II-09 · Dispensa registrada.** Toda dispensa é escrita, com condições atendidas e dono do risco.
**P-II-10 · Segurança indispensável.** Decisão irreversível sem parecer de Segurança é nula; e veto de Segurança fundado em achado G4 ou G3 não é derrubável pelo Conselho Executivo — só cai por correção do achado ou remoção da funcionalidade.
**P-II-11 · Veto fundamentado.** Veto sem regra violada, evidência e condição de levantamento é nulo.
**P-II-12 · Veto não encerra.** Veto obriga revisão; o terceiro veto no mesmo objeto escala.
**P-II-13 · Risco tem dono.** Risco aceito registra responsável e gatilho; sem dono, não é aceito.
**P-II-14 · Reversão declarada.** Parecer aprovado declara o sinal objetivo que obriga reabrir a decisão.
**P-II-15 · Separação de instâncias.** Quem produziu a solução não assina a auditoria dela.
**P-II-16 · Equipes não aprovam.** Especialistas entregam achado, evidência e limitação; quem aprova é conselho.
**P-II-17 · Achado sem resposta bloqueia.** Nenhum item do Red Team fica aberto na entrega.
**P-II-18 · Resposta tipada.** Blue Team responde só corrigido, mitigado, aceito ou contestado.
**P-II-19 · Nota antes do resultado.** O limite de aprovação é calibrado antes de avaliar, nunca depois de ver o número.
**P-II-20 · Convenção declarada.** Todo número de governança é convenção do framework e vem com regra de calibração.
**P-II-21 · Divergência é conflito de objetivos.** Antes da solução, explicite o objetivo legítimo de cada lado.
**P-II-22 · Ótimo global.** Nenhum conselho otimiza o próprio domínio degradando o produto.
**P-II-23 · Descarte registrado.** Decisão sem alternativa descartada e motivo é decisão não analisada.
**P-II-24 · Empate resolve por simplicidade.** Prevalece a opção mais simples; depois, a mais reversível.
**P-II-25 · Evidência antes de pauta.** Proposta com confiança insuficiente sai de pauta até haver evidência.
**P-II-26 · Governança observável.** O rito é medido: conselho que nunca reprova sai do rito padrão.
**P-II-27 · Dono humano é indelegável.** Missão, risco residual G3, emenda ao AEOS e escolha de rota são do N0; a IA nunca simula esse nível — sem o humano, a matéria fica pendente.

---

## CHECKLIST DO VOLUME

- [ ] **CK-II-01** A decisão foi classificada pelo roteador antes de qualquer convocação.
- [ ] **CK-II-02** Os conselhos convocados correspondem à classe da decisão e o quórum foi atingido.
- [ ] **CK-II-03** Cada conselho respondeu por escrito a todas as suas perguntas obrigatórias.
- [ ] **CK-II-04** Todo parecer usa o formato M-II-2, com todos os campos preenchidos e evidência em cada voto computado.
- [ ] **CK-II-05** Todo veto declara regra violada, evidência e condição de levantamento.
- [ ] **CK-II-06** O Red Team cumpriu a cota do rito — Padrão e Completo: 8 tentativas com ao menos 3 achados materiais; Curto: 3 tentativas com 1 achado ou justificativa escrita de ausência — e cada achado recebeu uma das quatro respostas tipadas do Blue Team.
- [ ] **CK-II-07** O Comitê de Qualidade pontuou as 8 perguntas com limite declarado antes da avaliação.
- [ ] **CK-II-08** Todo risco aceito tem responsável nomeado e gatilho de reavaliação.
- [ ] **CK-II-09** Toda dispensa de conselho está registrada com as quatro condições atendidas.
- [ ] **CK-II-10** Divergência não resolvida em duas rodadas foi escalada, com a posição vencida registrada.
- [ ] **CK-II-11** Nenhum trecho do dossiê simula pessoas, diálogos, biografias ou anos de experiência.
- [ ] **CK-II-12** A auditoria final foi assinada por instância que não participou da criação.

---

## CRITÉRIOS DE AUDITORIA

| ID | Critério | Evidência exigida | Condição de reprovação |
|---|---|---|---|
| AUD-II-01 | Ausência de encenação | Texto integral do dossiê | Nome próprio, biografia, senioridade ou diálogo entre cargos |
| AUD-II-02 | Papel pode reprovar | Ficha de papéis do ciclo | Papel convocado sem critério de reprovação |
| AUD-II-03 | Classificação prévia | Registro do roteador | Conselho convocado sem classe registrada antes |
| AUD-II-04 | Quórum respeitado | Pareceres por decisão | Pareceres válidos abaixo do quórum da classe |
| AUD-II-05 | Voto com evidência | Campo "Evidência" | Voto computado com campo vazio ou só juízo de valor |
| AUD-II-06 | Parecer íntegro | Arquivos de parecer | Falta de qualquer campo do M-II-2, inclusive o contador n/n |
| AUD-II-07 | Veto válido | Texto do veto | Veto sem regra, sem evidência ou sem condição de levantamento |
| AUD-II-08 | Veto reincidente | Histórico de vetos | Terceiro veto no mesmo objeto sem subida ao Executivo |
| AUD-II-09 | Cota do Red Team | Registro de tentativas com o rito declarado | Cota do rito não cumprida (8/3 no Padrão e Completo; 3/1 no Curto) sem repetir o ataque nem justificativa escrita de ausência; ou registro de entrega sem Red Team |
| AUD-II-10 | Fechamento dos achados | Tabela achado → resposta | Achado sem resposta tipada do Blue Team |
| AUD-II-11 | Nota de qualidade | Planilha das 8 perguntas | Soma abaixo do limite, nota 0, ou limite definido após avaliar |
| AUD-II-12 | Segurança em irreversível | Parecer de Segurança | Decisão irreversível ou crítica sem esse parecer |
| AUD-II-13 | Dispensa registrada | Registros `DISPENSA` | Conselho ausente do rito sem registro |
| AUD-II-14 | Risco com dono | Campo "Riscos aceitos" | Risco aceito sem responsável ou sem gatilho |
| AUD-II-15 | Reversão declarada | Campo "Condição de reversão" | Parecer aprovado sem sinal objetivo de reabertura |
| AUD-II-16 | Alternativas registradas | Registro de divergência | Decisão estrutural sem alternativa descartada e motivo |
| AUD-II-17 | Escalada por prazo | Contador de rodadas | Três rodadas sem subida ao Executivo |
| AUD-II-18 | Auditoria independente | Instância assinante | Mesma instância como autora e auditora |
| AUD-II-19 | Calibração declarada | Documento de abertura | Número fora do padrão sem calibração registrada |
| AUD-II-20 | Conselho inoperante | Histórico de pareceres | 100% de "Aprovado" sem condições e conselho mantido no rito |
| AUD-II-21 | Veto de Segurança blindado | Histórico de vetos G4/G3 e decisões do Executivo | Veto fundado em achado G4 ou G3 derrubado pelo Executivo, ou matéria avançada sem correção do achado nem remoção da funcionalidade |
| AUD-II-22 | Nível 0 não simulado | Registro de decisões do N0 | Missão, aceitação de risco G3, emenda ao AEOS ou escolha de rota decidida sem o dono humano |
