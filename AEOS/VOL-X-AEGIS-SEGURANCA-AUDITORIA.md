# AEOS — VOLUME X
## SEGURANÇA, RED TEAM E AUDITORIA · Codinome AEGIS

> **Versão** 2.0 Genesis · **Artigos** 104 a 117 · **Atualizado em** 27/07/2026
> **Escopo:** Disciplina defensiva de segurança e o rito de destruição, reconstrução e aceitação de risco que antecede toda entrega.
> **Pré-requisito:** [Vol. II, Arts. 16 a 20](VOL-II-SENATE-GOVERNANCA.md) · [Vol. IV, Art. 37](VOL-IV-ATLAS-ARQUITETURA.md) · [Vol. V, Art. 55](VOL-V-ODIN-EXECUCAO.md)
> **Alimenta:** [Vol. XI](VOL-XI-PHOENIX-REINVENCAO.md) · [Vol. XII](VOL-XII-FORGE-MANUAL-DE-OPERACAO.md)

---

## PREÂMBULO

O Módulo 9 do briefing original estabelece que nada é entregue antes de tentar destruir. Este volume converte essa intenção em procedimento. Segurança e auditoria formam disciplina única: assumir que a solução falha, procurar onde, e só então decidir o que fazer com o encontrado.

O AEGIS opera sob três premissas. A primeira: ameaça é matéria de projeto, não de revisão final; modelagem feita depois do desenho é confissão de retrabalho. A segunda: ausência de achados nunca prova segurança, prova esforço insuficiente de destruição — rodada de Red Team sem achado é rodada inválida, salvo justificativa escrita de ausência no Rito Curto (Art. 114). A terceira: risco pode ser aceito, nunca em silêncio.

Este volume é integralmente defensivo: descreve classes de falha e os controles que as neutralizam. É proibido que produza técnica de exploração, carga de ataque ou passo de invasão. O Red Team do AEOS é protocolo de perguntas e revisão de desenho, jamais operação ofensiva contra terceiros.

O AEGIS também não emite parecer jurídico. Ao tratar de dados pessoais no contexto brasileiro, descreve obrigações operacionais que a engenharia precisa suportar e exige validação por profissional habilitado antes de qualquer afirmação de conformidade.

O sistema `app.organifybr.com` é apenas alvo futuro ainda não observado: nenhum artigo aqui pressupõe característica dele.

---

## ARTIGO 104 — MODELAGEM DE AMEAÇAS COMO ETAPA DE PROJETO

Nenhum módulo, fluxo ou integração sai do desenho sem modelagem de ameaças registrada: artefato de entrada da arquitetura, não anexo da auditoria. Perguntas obrigatórias, nesta ordem:

1. **Ativos.** O que este módulo guarda, move ou expõe que teria valor para alguém de fora?
2. **Agentes de ameaça.** Externo não autenticado; usuário legítimo além do papel; inquilino vizinho; parceiro integrado; pessoa interna com acesso amplo; automação comprometida.
3. **Superfícies.** Interface, API pública e interna, webhook, upload, importação, exportação, fila, tarefa agendada, painel administrativo.
4. **Pior caso.** O resultado mais grave se o controle falhar, em uma frase de negócio.
5. **Controle e detecção.** Qual controle impede? Qual registro prova que aconteceu?

**Gatilho:** superfície nova ou ativo que muda de classe obrigam refazer a modelagem.

---

## ARTIGO 105 — INVENTÁRIO DE ATIVOS E ESCALA DE GRAVIDADE

Todo projeto mantém inventário de ativos com classe declarada: público, interno, restrito, sensível. Dado pessoal, credencial, registro financeiro e conteúdo privado de cliente são sempre sensíveis. A classe do ativo determina a gravidade do achado que o alcance.

Escala de gravidade — convenção do framework, calibrável na abertura do projeto:

| Grau | Nome | Definição operacional |
|---|---|---|
| G4 | Crítica | Vazamento entre inquilinos, acesso a dado sensível sem autorização, credencial de produção comprometida |
| G3 | Alta | Escalada de privilégio no mesmo inquilino, perda de dado, falha de autenticação em fluxo principal |
| G2 | Média | Exposição de metadado, evento crítico não registrado, controle contornável com esforço |
| G1 | Baixa | Fragilidade sem caminho de exploração conhecido, defesa em profundidade ausente |
| G0 | Informativo | Higiene, sem impacto demonstrável |

**Regra de bloqueio:** G4 e G3 bloqueiam a entrega; G2 exige plano com prazo; G1 e G0 entram no catálogo. A régua pode ser endurecida; afrouxá-la exige decisão executiva registrada.

---

## ARTIGO 106 — IDENTIDADE, AUTENTICAÇÃO E SESSÃO

Identidade é a fundação dos demais controles e é definida antes de qualquer tela.

- Toda entidade que age tem identidade própria e rastreável: pessoa, serviço, automação, agente. Identidade compartilhada é proibida.
- Autenticação é verificada no servidor. Segundo fator é requisito para papéis com acesso a ativo sensível.
- Sessão tem prazo declarado, revogação imediata e invalidação obrigatória em troca de senha, mudança de papel e encerramento de vínculo.
- Falha de autenticação retorna resposta uniforme, sem revelar qual parte da credencial errou.
- Todo caminho alternativo de entrada — recuperação, convite, integração, personificação pelo suporte — é fluxo de autenticação completo, com registro próprio.

---

## ARTIGO 107 — AUTORIZAÇÃO É DECISÃO DE SERVIDOR

**Lei do volume.** A autorização é verificada no servidor, em toda requisição, sobre o recurso concreto acessado. Não há exceção de desempenho, protótipo ou urgência.

Interface escondida nunca é controle de acesso. Botão oculto, rota não listada, menu suprimido, campo desabilitado e identificador imprevisível são recursos de clareza, jamais de segurança. Proposta que dependa deles como defesa é achado G3 automático.

Perguntas obrigatórias por endpoint:

- Quem é o solicitante e qual papel carrega nesta requisição?
- Este registro pertence ao contexto dele?
- A verificação está no servidor ou foi delegada ao cliente?
- A regra vale igualmente para leitura, escrita, listagem, exportação e ação em lote?
- O padrão é negar quando a regra não se aplica com clareza?

---

## ARTIGO 108 — ISOLAMENTO ENTRE INQUILINOS

Em produtos multi-inquilino, vazamento entre clientes é o pior caso absoluto do AEOS: achado dessa natureza é G4 e interrompe a esteira de entrega.

- Todo acesso a dado filtra pelo identificador do inquilino, na camada mais próxima do armazenamento, nunca só na aplicação.
- Nenhum identificador de registro basta, sozinho, para recuperá-lo.
- Recursos compartilhados — cache, filas, arquivos, índices de busca, exportações, memória de agentes de IA — recebem o mesmo particionamento do banco.
- Toda funcionalidade nova responde por escrito: como se comporta quando dois inquilinos a usam ao mesmo tempo?
- Nenhuma entrega é aprovada sem verificação de que um contexto não alcança dado de outro.

---

## ARTIGO 109 — DADOS PESSOAIS: OBRIGAÇÕES OPERACIONAIS

O AEOS trata proteção de dados pessoais como requisito de engenharia, sem emitir parecer jurídico nem citar dispositivos legais. Afirmação de conformidade exige validação por profissional habilitado, registrada como evidência.

| Obrigação | O que o sistema precisa ter |
|---|---|
| Base legal declarada | Por finalidade de tratamento: fundamento adotado e quem o definiu |
| Minimização | Justificativa por campo pessoal; campo sem finalidade é removido |
| Retenção | Prazo por categoria de dado e rotina que executa o descarte |
| Titularidade | Localizar, exportar e corrigir todos os dados de uma pessoa |
| Exclusão | Eliminação que alcança cópias, backups, logs e caches, com prazo |
| Registro de tratamento | Documento vivo: finalidade, categorias, destinatários, transferências |
| Terceiros | Lista de operadores e do que cada um recebe |

**Gatilho:** campo pessoal novo exige finalidade, base legal e retenção antes da primeira gravação em produção.

---

## ARTIGO 110 — SEGREDOS E CREDENCIAIS

Segredo é qualquer valor que concede acesso: senha, chave de API, token, certificado, credencial de banco, chave de assinatura.

- Segredo nunca reside em código, repositório, configuração versionada, variável embutida no cliente, ticket, documentação ou prompt de agente.
- Todo segredo tem dono nomeado, cofre declarado, prazo de rotação e revogação testada.
- Ambientes não compartilham segredos: credencial de produção nunca aparece em desenvolvimento, teste ou demonstração.
- Acesso a segredo de produção é concedido por necessidade e registrado.
- **Gatilho de incidente:** exposição de segredo, mesmo suspeita, aciona rotação imediata antes de qualquer investigação de impacto.

---

## ARTIGO 111 — VALIDAÇÃO DE ENTRADA E CLASSES DE VULNERABILIDADE

Toda entrada é hostil até validação no servidor. Validação no cliente existe para experiência, nunca para defesa.

| Classe | Postura defensiva exigida |
|---|---|
| Injeção em consultas e comandos | Separar código de dado por construção; nunca concatenar entrada em instrução |
| Execução de conteúdo no navegador | Tratar a saída conforme o contexto de renderização; não confiar em conteúdo armazenado |
| Falha de acesso a objeto | Verificar propriedade do recurso a cada requisição (Art. 107) |
| Requisição forjada de origem externa | Exigir prova de intenção em ação que altera estado |
| Requisição do servidor a destino informado pelo usuário | Restringir destinos por lista permitida |
| Desserialização e importação de arquivo | Validar tipo, tamanho e estrutura; processar fora do contexto privilegiado |
| Enumeração e abuso de volume | Limitar taxa, uniformizar respostas, monitorar anomalia |
| Dependências de terceiros | Inventário, origem verificada, atualização acompanhada |

Cada classe é verificada por desenho, lendo fluxo e contrato — não apenas por ferramenta.

---

## ARTIGO 112 — REGISTRO DE AUDITORIA

Observabilidade (Vol. IV, Art. 36) responde "o sistema está saudável?"; o registro de auditoria responde "quem fez o quê, quando, sobre qual recurso". Artefatos distintos, ambos obrigatórios.

**Sempre registrado:** autenticação bem-sucedida e falha; troca e recuperação de credencial; criação, alteração e remoção de permissão e papel; personificação pelo suporte; acesso e exportação de dado sensível; alteração e exclusão de registro de negócio relevante; mudança de configuração de segurança; ação administrativa; falha de autorização; ação de agente automatizado.

**Nunca registrado:** senha, token, chave, número completo de documento ou cartão, conteúdo integral de dado sensível e campo pessoal dispensável.

**Formato mínimo:** momento, ator, papel, inquilino, ação, recurso alvo, origem, resultado, identificador de correlação.

**Retenção — convenção do framework:** 12 meses para auditoria, 90 dias para registro operacional; ajustável por obrigação contratual ou regulatória, com o prazo declarado por escrito. O registro é somente-acréscimo e apagá-lo exige aprovação executiva.

---

## ARTIGO 113 — RESPOSTA A INCIDENTE

Incidente é todo evento com suspeita fundamentada de acesso indevido, vazamento, indisponibilidade relevante ou perda de integridade. Cinco fases:

1. **Detecção.** Quem declara, por qual sinal, com qual gravidade inicial (Art. 105). Declarar cedo com grau errado é preferível a declarar tarde.
2. **Contenção.** Reduzir o dano antes de entender a causa: revogar credencial, isolar componente, suspender integração — preservando evidência antes de alterar o ambiente.
3. **Comunicação.** Dono nomeado, canal único, registro contínuo. Comunicação externa a clientes ou autoridades exige decisão do Conselho Executivo com validação jurídica prévia.
4. **Correção.** Causa raiz identificada, correção aplicada e verificada. Sem causa raiz há apenas contenção prolongada, e o incidente segue aberto.
5. **Lição aprendida.** Registro escrito em até 5 dias úteis do encerramento — convenção do framework — com linha do tempo, causa raiz, falha de detecção e mudança estrutural. Toda lição vira anti-padrão (Vol. VI, Art. 66).

---

## ARTIGO 114 — RITO DE AUDITORIA · RED TEAM

Nenhuma solução é entregue sem passar por este rito de auditoria — o que varia por rito de execução ([Vol. V, Art. 47](VOL-V-ODIN-EXECUCAO.md)) é a profundidade, nunca a existência. Não confundir com o Rito Completo, que é nome próprio de um dos três ritos. O Red Team é a primeira etapa e é perspectiva de análise, nunca pessoa simulada.

```
SOLUÇÃO PRONTA
      |
      v
 [1] RED TEAM ............. produz ACHADOS classificados G0..G4
      |
      v
 [2] BLUE TEAM ............ corrige, mitiga, aceita por escrito OU contesta
      |
      v
 [3] COMITÊ INDEPENDENTE .. verifica PROCESSO e EVIDÊNCIA
      |         `--(processo incompleto)--> retorna a [1]
      v
 [4] CONSELHO EXECUTIVO ... decide sobre RISCO RESIDUAL
      |
      v
   ENTREGA (Vol. V, Art. 56)
```

As perguntas canônicas do Art. 16 são obrigatórias e integrais: onde quebra, onde escala mal, onde há acoplamento, risco, complexidade desnecessária, desperdício, duplicação, dívida técnica, risco de segurança. Sobre elas o AEGIS acrescenta ataque por dimensão: **segurança** (Arts. 106 a 111); **dados** (perda, corrupção, retenção indevida); **escala** (carga e crescimento de inquilinos); **experiência** (fluxo em falha, estado ambíguo, ação irreversível sem confirmação); **operação** (dependência externa indisponível, ausência de rollback, ponto único de falha); **produto** (não entrega o valor prometido); **IA** (entrada tratada como instrução, saída não verificada assumida como verdade, agente com permissão maior que a tarefa).

**Cota por rito (Vol. V, Art. 47) — o rito varia a profundidade, nunca a existência do Red Team.** Ritos Padrão e Completo: cota de 8 tentativas de quebra e no mínimo 3 achados materiais. Rito Curto: forma reduzida — três perguntas obrigatórias (onde quebra, onde escala mal, onde abre risco), cota de 3 tentativas e no mínimo 1 achado ou justificativa escrita de ausência com dono nomeado. Não existe entrega "sem Red Team".

**REGISTRO DE ACHADO** — campos obrigatórios; achado incompleto é inválido:

`ID: RT-<n> · O que quebra · Como reproduzir · Impacto de negócio · Gravidade (G0–G4) · Correção proposta · Dono · Status (aberto / corrigido / mitigado / aceito / contestado)`

Categoria por vetor de ataque é campo auxiliar opcional. Rodada sem nenhum achado é inválida e obriga nova rodada com escopo ampliado; no Rito Curto, a justificativa escrita de ausência substitui a nova rodada.

---

## ARTIGO 115 — RITO DE AUDITORIA · BLUE TEAM

O Blue Team reconstrói (Vol. II, Art. 17). **Não lhe é permitido simplesmente discordar.** Todo achado termina em exatamente um de quatro desfechos:

1. **Corrigir** — alterar a solução e anexar evidência da correção.
2. **Mitigar** — aplicar controle que reduz o achado sem eliminá-lo, com o controle descrito e o risco residual registrado pelo Art. 117.
3. **Aceitar o risco por escrito** — seguindo integralmente o Art. 117.
4. **Contestar com demonstração** — provar que a premissa do achado é falsa, apresentando a evidência que a contradiz.

"Discordo", "é improvável", "ninguém faria isso" e "não é nosso escopo" não são desfechos. Achado sem um dos quatro mantém a entrega bloqueada, seja qual for a gravidade.

O Blue Team também responde ao Comitê de Qualidade (Vol. II, Art. 18) sobre a solução reconstruída: correção que degrada compreensibilidade ou sustentabilidade cria dívida nova.

---

## ARTIGO 116 — COMITÊ INDEPENDENTE E CONSELHO EXECUTIVO

**O Comitê Independente revisa o processo, não a solução.** Verifica, item a item: a modelagem de ameaças é anterior ao desenvolvimento; o Red Team cobriu as sete dimensões do Art. 114; todo achado tem um dos quatro desfechos do Art. 115; toda correção tem evidência anexada; toda mitigação tem risco residual registrado; todo risco aceito atende ao Art. 117; nenhum G4 ou G3 segue aberto. Faltando um item, devolve a etapa sem discutir mérito técnico.

**O Conselho Executivo decide sobre risco residual.** Recebe a lista fechada de riscos aceitos e responde: este conjunto é aceitável diante do valor da entrega e do prazo? Pode aprovar, aprovar com condição declarada, ou devolver ao Blue Team. Não pode aprovar risco que não esteja escrito, nem aprovar por omissão. O veto de Segurança segue o Vol. II, Art. 19, com uma exceção blindada: **veto fundado em achado G4 ou G3 não é derrubável pelo Conselho Executivo** — a matéria só avança por correção do achado ou pela remoção da funcionalidade que o gera.

---

## ARTIGO 117 — REGRA DE ACEITAÇÃO DE RISCO

Risco pode ser aceito. Risco aceito em silêncio é violação constitucional e reprova a entrega.

| Campo | Exigência |
|---|---|
| Descrição | O que pode acontecer, em linguagem de negócio |
| Gravidade | Grau G0–G4 declarado (Art. 105) |
| Justificativa | Por que aceitar é preferível a corrigir agora |
| Dono | Uma pessoa nomeada, nunca equipe ou papel genérico |
| Prazo | Data limite de validade da aceitação |
| Condição de reavaliação | Evento que reabre a decisão antes do prazo |
| Aprovador | Quem autorizou, no nível exigido |

**Nível de aprovação — convenção do framework:** G1 e G2 são aceitos pelo dono técnico do módulo; G3 exige Conselho Executivo; G4 não pode ser aceito, apenas corrigido ou removido da entrega junto com a funcionalidade que o gera.

Aceitação vencida sem reavaliação vira achado aberto e bloqueia a próxima entrega. O registro de riscos aceitos é público na organização e revisado a cada ciclo.

---

## PRINCÍPIOS DO VOLUME

**P-X-01 · Ameaça antes de tela.** Chegando depois do protótipo, a modelagem já falhou como instrumento.

**P-X-02 · Ausência de achado não é prova.** Rodada limpa indica esforço insuficiente. Amplie o escopo e repita.

**P-X-03 · Negar por padrão.** Regra de acesso que não se aplica com clareza ao caso resulta em negativa e em achado registrado.

**P-X-04 · Servidor decide, cliente exibe.** O cliente apenas reflete o que o servidor já autorizou.

**P-X-05 · Obscuridade não é controle.** Rota oculta e identificador imprevisível não contam como defesa em nenhuma pontuação.

**P-X-06 · Inquilino é fronteira sagrada.** Consulta sem filtro de inquilino é defeito estrutural, não descuido pontual.

**P-X-07 · O compartilhado é o mais perigoso.** Cache, fila, índice e memória de agente vazam mais que o banco, porque ninguém os revisa.

**P-X-08 · Campo sem finalidade não existe.** Dado pessoal sem finalidade declarada sai do formulário, não apenas do relatório.

**P-X-09 · Exclusão alcança cópias.** Backups, logs, caches e exportações fazem parte do escopo de exclusão.

**P-X-10 · Conformidade se prova.** Nenhum documento do AEOS declara conformidade legal sem validação registrada de profissional habilitado.

**P-X-11 · Segredo exposto é segredo morto.** Suspeita basta para rotacionar; investigar antes inverte a ordem das prioridades.

**P-X-12 · Entrada é hostil.** Inclusive a que vem de sistema parceiro, e até ser validada no servidor.

**P-X-13 · Código separado de dado.** Instrução nunca é montada por concatenação de entrada, em nenhuma linguagem ou motor de consulta.

**P-X-14 · Entrada de IA também é entrada.** Texto que chega ao modelo é dado, nunca instrução; o agente recebe a menor permissão possível.

**P-X-15 · Auditoria não é log de aplicação.** Formatos, retenções e responsáveis distintos; confundi-los é achado G2.

**P-X-16 · O registro nunca guarda o segredo.** Campo que o suporte não pode ver em tela não pode existir no registro.

**P-X-17 · Registro é somente-acréscimo.** Editá-lo exige aprovação executiva e vira, ele próprio, evento auditado.

**P-X-18 · Contenção antes de compreensão.** Reduzir dano precede entender a causa, preservando evidência antes de mexer no ambiente.

**P-X-19 · Correção sem causa raiz é contenção.** O incidente segue aberto enquanto a causa não for identificada.

**P-X-20 · Quatro desfechos, nunca discordância verbal.** Corrigir, mitigar com risco residual registrado, aceitar por escrito ou contestar com evidência; opinião não encerra achado.

**P-X-21 · O Comitê olha o rito.** Independência é checar evidência e etapa, jamais reabrir o mérito da solução.

**P-X-22 · Silêncio não aprova.** Ausência de manifestação equivale a reprovação.

**P-X-23 · Risco tem dono humano.** Risco atribuído a "o time" é risco não aceito, portanto entrega bloqueada.

**P-X-24 · Aceitação vence.** Prazo vencido sem reavaliação reabre o risco como achado bloqueante.

**P-X-25 · Postura sempre defensiva.** O AEOS descreve controles e classes de falha; nunca produz técnica de exploração.

---

## CHECKLIST DO VOLUME

- [ ] **CK-X-01** A modelagem de ameaças responde às cinco perguntas do Art. 104 e é anterior ao desenvolvimento.
- [ ] **CK-X-02** Cada endpoint que retorna dado de negócio tem autorização verificada no servidor sobre o recurso concreto.
- [ ] **CK-X-03** Há verificação escrita de que nenhum inquilino alcança dado de outro em banco, cache, filas, busca e exportações.
- [ ] **CK-X-04** Todo campo pessoal tem finalidade, base legal e prazo de retenção registrados.
- [ ] **CK-X-05** Nenhum segredo aparece em código, configuração versionada, documentação ou prompt; cada um tem dono e rotação.
- [ ] **CK-X-06** Os eventos do Art. 112 são registrados no formato mínimo e nenhum campo proibido aparece na amostragem.
- [ ] **CK-X-07** O procedimento de incidente tem dono nomeado, canal definido e as cinco fases descritas.
- [ ] **CK-X-08** O Red Team cobriu as sete dimensões do Art. 114 e cada achado usa o REGISTRO DE ACHADO completo.
- [ ] **CK-X-09** Todo achado tem um dos quatro desfechos do Art. 115, com evidência quando for correção e risco residual registrado quando for mitigação.
- [ ] **CK-X-10** Nenhum achado G4 ou G3 permanece aberto na data da entrega.
- [ ] **CK-X-11** Todo risco aceito preenche os sete campos do Art. 117 e foi aprovado no nível exigido.
- [ ] **CK-X-12** Comitê Independente e Conselho Executivo registraram, cada um, sua decisão.

---

## CRITÉRIOS DE AUDITORIA

| ID | Critério | Evidência exigida | Condição de reprovação |
|---|---|---|---|
| AUD-X-01 | Modelagem anterior ao desenvolvimento | Documento datado com ativos, agentes, superfícies, pior caso e controles | Ausente ou datado após o início do trabalho |
| AUD-X-02 | Autorização no servidor | Mapa de endpoints com a regra por rota | Rota que retorna dado de negócio sem regra documentada |
| AUD-X-03 | Interface não usada como controle | Registro da revisão de desenho | Defesa apoiada em elemento oculto ou identificador imprevisível |
| AUD-X-04 | Isolamento entre inquilinos | Relatório sobre banco, cache, filas, busca e exportações | Camada não verificada, ou verificação com falha |
| AUD-X-05 | Finalidade e retenção de dado pessoal | Tabela de campos com finalidade, base legal e prazo | Campo pessoal em produção sem os três atributos |
| AUD-X-06 | Conformidade validada por habilitado | Registro de validação jurídica com data e responsável | Afirmação de conformidade sem esse registro |
| AUD-X-07 | Higiene de segredos | Inventário com dono, cofre e prazo de rotação | Segredo em código, configuração versionada, documentação ou prompt |
| AUD-X-08 | Classes de vulnerabilidade revisadas | Matriz das oito classes com o controle apontado | Classe sem controle apontado |
| AUD-X-09 | Registro de auditoria conforme | Amostra cobrindo a lista e o formato do Art. 112 | Evento obrigatório ausente, ou presença de campo proibido |
| AUD-X-10 | Procedimento de incidente operante | Documento das cinco fases com dono e canal | Ausente, ou incidente encerrado sem lição aprendida escrita |
| AUD-X-11 | Cobertura e cota do Red Team | Relatório por dimensão com a cota do rito | Menos de sete dimensões; cota do rito não cumprida; rodada com zero achados sem justificativa escrita de ausência (admitida só no Rito Curto) |
| AUD-X-12 | Integridade do registro de achado | Lista de achados com os campos obrigatórios | Achado sem reprodução, impacto, gravidade ou dono |
| AUD-X-13 | Desfecho obrigatório por achado | Achados com um dos quatro desfechos e evidência | Achado sem um dos quatro desfechos; mitigação sem risco residual registrado; mera discordância |
| AUD-X-14 | Bloqueio por gravidade respeitado | Lista de achados abertos na entrega | Entrega liberada com G4 ou G3 aberto |
| AUD-X-15 | Aceitação de risco formal e no nível correto | Registro com os sete campos do Art. 117 | Risco sem dono ou prazo; G3 aceito sem Conselho Executivo; G4 aceito |
| AUD-X-16 | Independência do Comitê | Ata do Comitê Independente | Ata julga mérito técnico em vez de processo e evidência |
| AUD-X-17 | Decisão sobre risco residual | Registro do Conselho Executivo com aprovador e data | Decisão ausente, ou aprovação inferida de silêncio |
| AUD-X-18 | Postura defensiva do material | Texto integral dos artefatos de segurança | Instrução de ataque, carga de exploração ou passo a passo ofensivo |
