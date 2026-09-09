# Formato canônico do contrato de assessoria — Expansion

**Data:** 2026-09-09 · **Origem:** leitura dos contratos reais no Google Drive, não do
projeto `CONTRATOS - Expansion Company` do Claude (inacessível a partir do Claude Code).

Este documento existe porque a pasta `Clientes › CONTRATOS` do Drive está **vazia** desde
14/07/2026 e os contratos assinados continuam soltos na raiz — o achado **C4** da
`AUDITORIA-DRIVE-EXPANSION-2026-07-26.md`, ainda aberto. O que segue foi extraído dos
PDFs assinados, não de um template.

---

## 1. O acervo real

| Arquivo | Nº do instrumento | Emissão | Criado no Drive (UTC) |
|---|---|---|---|
| `Contrato_Expansion_Albanos_Assessoria.pdf` | `EXP-2026-ALBN-AS-01` | 13/04/2026 | 29/04 16:57 |
| `Expansion AND Albanos Assessoria.pdf` | `EXP-2026-ALBN-AS-02` | 29/04/2026 | 29/04 21:03 |
| `Contrato_Expansion_Albanos_Assessoria_v2.pdf` | `EXP-2026-ALBN-AS-02` | 29/04/2026 | 29/04 21:59 |

Insumos pré-contrato (cliente Pontual Uniformes, setembro/2026):
`PONTUAL — Briefing de Assessoria` · `PONTUAL — Promessas e Escopo (base do contrato)` ·
`PONTUAL × EXPANSION — Estratégia e Cronograma`.

---

## 2. O achado que precede tudo: dois contratos com o mesmo número

**Dois PDFs distintos carregam `EXP-2026-ALBN-AS-02`**, mesma data de emissão, mesmas
partes e **conteúdo obrigacional diferente**. O de 21:03 não tem cláusula de bônus; o de
21:59 tem três bônus contratados. Se o cliente arquivou um e a Expansion o outro, existem
dois "AS-02" em circulação com obrigações diferentes.

Consequência direta na numeração: no arquivo de 21:03 a "cláusula 7" é DISPOSIÇÕES GERAIS;
no de 21:59 é OBRIGAÇÕES DA CONTRATANTE. Qualquer remissão interna ("nos termos da
cláusula 7") aponta para lugares diferentes conforme o molde.

**Base recomendada: o export de 21:59** — mais recente, superset obrigacional (contém tudo
do outro mais os bônus), com o limite de bônus escrito e com a cláusula de substituição.

**Antes de virar molde, resolver no mundo real:** descobrir qual PDF foi efetivamente
assinado e aposentar o outro.

### Ressalva probatória
Nenhum dos três tem prova de assinatura. Os três trazem blocos preenchidos e duas
testemunhas nominadas com CPF, mas **nenhum apresenta selo, hash ou log de plataforma de
assinatura** (Clicksign/D4Sign/ZapSign), nem data individual por signatário, nem
nome/CPF/cargo de quem assina por cada PJ. "Vigente" aqui é inferência documental, não
prova jurídica.

---

## 3. Esqueleto canônico

`REAL` = existe verbatim no AS-02 · `COND` = existe, mas só em certos contratos ·
`NOVA` = não existe em nenhum contrato da casa.

| # | Cláusula | Status |
|---|---|---|
| — | Cabeçalho: nº `EXP-{ano}-{cliente}-{serviço}-{NN}`, título, emissão, contrato substituído | REAL |
| — | Qualificação das partes: razão social — CNPJ — telefone + linha PERFIS ATENDIDOS | REAL |
| — | Complemento: endereço, e-mail, representante legal (nome/CPF/cargo) | **NOVA** |
| — | OBJETO: serviço, nº de perfis, posicionamento de cada um, objetivo, vigência | REAL |
| 1 | ESCOPO: (A) conteúdo e perfis · (B) BIO-OPTIMIZATION + TRÁFEGO PAGO | REAL |
| 2 | BÔNUS INCLUSOS — com o teto "uma única vez durante a vigência" | COND |
| 3 | VIGÊNCIA: início, término, duração. Sem renovação automática | REAL |
| 4 | VALOR: mensal, total, front, parcelas, formas de pagamento | REAL |
| 5 | CRONOGRAMA: onboarding, calendário editorial, relatório, reuniões | REAL |
| 6 | OBRIGAÇÕES DA CONTRATADA | REAL |
| 7 | OBRIGAÇÕES DA CONTRATANTE | REAL |
| 8 | VERBA DE MÍDIA — sai do cartão do cliente, piso, aumento só por escrito | **NOVA*** |
| 9 | TITULARIDADE E DEVOLUÇÃO DE ATIVOS — BM, pixel, públicos, base de leads | **NOVA** |
| 10 | LGPD E DADOS DE LEADS | **NOVA** |
| 11 | USO DE IMAGEM E VOZ DE TERCEIROS | **NOVA** |
| 12 | OBRIGAÇÃO DE MEIO E LIMITAÇÃO DE RESPONSABILIDADE | **NOVA** |
| 13 | MORA DA CONTRATANTE — consequência do descumprimento das 48h | **NOVA** |
| 14 | APROVAÇÃO E REVISÕES — limite de rodadas, aprovação tácita | **NOVA** |
| 15 | SERVIÇOS ADICIONAIS — mediante proposta específica e aditivo | **NOVA*** |
| 16 | DISPOSIÇÕES GERAIS (as seis abaixo, verbatim) | REAL |
| 16.7–16.14 | Rescisão pela Contratada · Suspensão por inadimplência · Confidencialidade bilateral · Força maior e risco de plataforma · Canal oficial de notificação · Renovação e reajuste · Não aliciamento · **Foro** | **NOVA** |
| — | Fecho: local e data, assinaturas em duas colunas, duas testemunhas | REAL |

\* A redação **já existe na casa**, no doc `PONTUAL × EXPANSION — Estratégia e Cronograma`
e no `PONTUAL — Promessas e Escopo`. Nunca migrou para o instrumento. Não é redação nova,
é transporte.

### Duas travas de geração
- **Numeração derivada, nunca literal.** A cláusula de bônus é condicional e desloca tudo
  que vem depois — foi exatamente isso que produziu dois "AS-02" com cláusula 7 diferente.
- **`posts/mês` é calculado**, não digitado: `perfis × posts semanais × 4`.
  Confere nos dois contratos reais (2×3×4 = 24 · 3×3×4 = 36).

---

## 4. Campos variáveis

**Calculados** (nunca digitados): total de posts/mês · data de término · valor total do
projeto · valor da 1ª parcela (mensal − front) · datas de vencimento (mesmo dia do mês da
assinatura) · nº de parcelas · ano do rodapé.

**Obrigatórios do cliente:** razão social · CNPJ · telefone · endereço**\*** ·
representante legal com CPF e cargo**\*** · e-mail**\*** · @handles dos perfis ·
quantidade de perfis · posicionamento de cada perfil · objetivo comercial · posts semanais
por perfil · stories diários · canais de distribuição · plataformas de mídia · destino do
lead · data de início · prazo em meses · valor mensal · comarca do foro**\***.

**Opcionais** (cada um dispara texto condicional): contrato substituído + delta ·
evento/campanha foco · itens de escopo específicos · lista de bônus · front já pago ·
posts semanais em regime de evento.

**\*** não consta em nenhum contrato atual.

### Regra dura
Os **CPFs das testemunhas e os @handles nascem vazios**. Se herdados do molde, a casa passa
a emitir contratos de outros clientes com CPF de terceiros impressos. O export de 21:59
ainda contamina o template com um CPF truncado (`345.560.318`, sem os dígitos
verificadores) — corrigir na fonte antes de virar molde.

**O gerador deve recusar a emissão com campo obrigatório vazio**, devolvendo a lista do que
falta. O caso Pontual mostra por quê: briefing pronto, escopo triado, cronograma já
entregue ao cliente — e o contrato travado porque *"o valor da mensalidade NÃO foi citado
na call"*.

---

## 5. Texto fixo da casa (verbatim)

As seis disposições gerais, idênticas nos três arquivos:

> **ALTERAÇÃO DE ESCOPO:** Qualquer ampliação ou alteração do escopo deverá ser acordada por escrito e poderá gerar ajuste no valor contratual.

> **CANCELAMENTO:** A rescisão antecipada pela Contratante implica a retenção dos valores já pagos e multa de 20% sobre o saldo restante do contrato.

> **PROPRIEDADE INTELECTUAL:** Estratégias, planejamentos, copies, funis e estruturas de tráfego desenvolvidos pela Contratada são de sua propriedade intelectual e não podem ser compartilhados com terceiros pela Contratante.

> **DIREITOS DE IMAGEM:** A Contratada poderá utilizar o material produzido para portfólio e divulgação, salvo disposição contrária por escrito.

> **INADIMPLÊNCIA:** Multa de 2% + juros de 1% ao mês sobre valores em atraso, sem prejuízo da suspensão dos serviços.

> **SUBSTITUIÇÃO DE CONTRATO:** Esta versão substitui integralmente o contrato EXP-2026-ALBN-AS-01, refletindo a ampliação do escopo (de 02 para 03 perfis) e o reajuste do valor mensal acordado entre as partes. *(condicional)*

O teto dos bônus — a única cláusula do acervo que limita a própria Expansion:

> Os bônus são entregues uma única vez durante a vigência do contrato, sem custo adicional.

**Armadilha:** o item *"Estratégia de captação via clínicas parceiras e cupom de desconto
via patrocinadores"* está no meio do bloco BIO-OPTIMIZATION, que no resto é boilerplate
puro — mas é específico da Albanos. Herdado como fixo, todo cliente futuro compra uma
estratégia de clínicas parceiras que ninguém vai executar.

**Duas frases mutuamente excludentes** no bloco de pagamento — só uma pode entrar:
- Com front: `O valor de R$ X foi recebido antecipadamente como front e está abatido da 1ª parcela.`
- Sem front: `Projeto fechado pago em N parcelas mensais e iguais.`

---

## 6. Dados fixos da Expansion

| Dado | Valor |
|---|---|
| Nome no contrato | EXPANSION PRODUÇÕES |
| CNPJ | 58.620.299/0001-67 |
| Telefone | (11) 97628-1859 |
| Local de assinatura | Alphaville/SP |
| Rodapé | EXPANSION PRODUÇÕES © {ano} |

**PENDENTES** — não constam em nenhum documento: razão social com tipo societário
(LTDA/ME/EIRELI) · endereço de sede · representante legal · e-mail oficial de notificação ·
dados bancários/chave PIX · inscrição municipal, CNAE, regime tributário · comarca de foro.

### Duas ressalvas antes de o template virar padrão

1. **O CNPJ pode não comportar o contrato.** `EXPANSION-360-2026-07-26.md:111` registra em
   26/07/2026: *"Ainda não abriram CNPJ. Nicolas e Kauã seguem MEI — e já estouraram o teto
   do MEI faz tempo."* Os contratos de abril já imprimem o CNPJ 58.620.299/0001-67 e
   faturam R$ 45.000 em 3 meses. Verificar de qual natureza é esse CNPJ e se suporta o
   ticket antes de o gerador emitir em cima dele.

2. **A testemunha 1 é sócio da própria Contratada.** `EXPANSION-360-2026-07-26.md:12`:
   *"Fundada por Nicolas Nascimento + Kauã Catini"*. "KAUÃ CATINI" é a TESTEMUNHA 1 dos
   três contratos. Testemunha interessada enfraquece exatamente a prova que a assinatura de
   testemunha existe para produzir.

---

## 7. Formatação

PDF de ~2 páginas, diagramado em ferramenta de design, não em processador de texto.
Cabeçalho com o nº do contrato repetido em cada página. Rodapé de marca.

- **Sem preâmbulo jurídico.** Vai direto a linhas em CAIXA-ALTA com travessão longo:
  `CONTRATADA: EXPANSION PRODUÇÕES — CNPJ: ... — Telefone: ...`
- **Numeração arábica simples** (1 a 8), título em caixa-alta na mesma linha. Sem
  numeração decimal de subitens.
- Dentro da cláusula 1, dois blocos-card em caixa-alta funcionando como cartões visuais.
- Bullets em frases nominais sem verbo de obrigação (*"3 postagens semanais por perfil"*) —
  **estilo de proposta comercial, não de contrato**.
- Disposições gerais: rótulo em CAIXA-ALTA + dois-pontos + texto corrido.
- Fecho: `Alphaville/SP, [data por extenso]`, assinaturas em duas colunas, duas testemunhas.

**Falta na diagramação:** numeração de páginas, rubrica por página, data individual por
signatário, qualificação de quem assina pela PJ. Se a casa passar a assinar por plataforma
digital, o log resolve os três primeiros sozinho.

**Guarda** (padrão já definido na auditoria): `AAAA-MM-DD - Contrato - CLIENTE - vNN`, dois
dígitos, nunca "FINAL" → `10 COMERCIAL › 12 Contratos ATIVOS`, restrito a sócios.

---

## 8. Os insumos que alimentam o contrato

A casa já tem um pipeline comercial→jurídico funcionando. Ele só não termina no contrato.

- **Briefing de Assessoria** → alimenta cabeçalho e OBJETO. A seção "OPORTUNIDADES FUTURAS
  (fora do escopo inicial)" alimenta a cláusula de serviços adicionais.
- **Promessas e Escopo** → o documento mais valioso do acervo. Ele se declara: *"Uso:
  insumo direto para redigir o contrato. Cada item marca se DEVE entrar no contrato ou
  não."* A seção 6 (DADOS QUE FALTAM) **é o formulário de campos variáveis já pronto**.
- **Estratégia e Cronograma** → onde moram as salvaguardas que nunca chegaram ao
  instrumento, escritas com as palavras da própria Expansion:

> a verba sai do cartão de vocês, cadastrado na conta de anúncios **de vocês** — não passa pela Expansion.

> nenhum aumento acontece sem vocês aprovarem antes, por escrito no grupo

> **Contrato assinado** — vai no grupo, assina digital, fica arquivado no seu Drive. Nada vai ao ar antes disso

> se algo atrasar, o cronograma anda junto

Essas quatro frases são, respectivamente: cláusula de verba, teto de gasto, condição
suspensiva de início e mora da Contratante. **Todas existem por escrito na casa e nenhuma
existe em contrato.**

---

## 9. O que bloqueia virar gerador

Achados de três revisões independentes (jurídica, operacional, fidelidade à fonte).

### Bloqueios jurídicos

1. **Direito de imagem.** `DIREITOS DE IMAGEM` é autorização em **opt-out**, sem prazo,
   território ou finalidade, sobre objeto indefinido — o contrato nunca define o que é
   "material produzido". O objeto do AS-02 declara por escrito atendimento a clínica de
   TEA, pacientes e famílias. Declaração da PJ não substitui autorização do titular
   (art. 20 CC; Súmula 403 STJ); menor exige responsável (ECA arts. 17–18).
2. **LGPD ausente.** Dado sensível de saúde (art. 11), criança e adolescente (art. 14 §1º),
   e upload de base de clientes para o Meta — que é compartilhamento com terceiro e
   transferência internacional (arts. 33–36). Zero linha hoje.
3. **PI incompleta.** A cláusula cobre "estratégias, planejamentos, copies, funis e
   estruturas de tráfego" e **cala sobre vídeos, artes e carrosséis**. O cliente que pagou
   R$ 45.000 não tem cessão nem licença sobre o que está publicado no perfil dele.
   Agravante: sem cessão escrita dos editores e freelas para a Expansion, qualquer cláusula
   de PI é promessa vazia — a casa não pode ceder o que não tem.
4. **Cláusula penal sobre base indefinida.** "Saldo restante" não é definido: inclui parcela
   vencida e não paga? É saldo de serviço não prestado? Base indeterminada é convite à
   redução judicial (art. 413 CC).
5. **Sem foro.** A lacuna mais grave e a única que custa uma linha para fechar.

### Bloqueios operacionais

6. **A inadimplência é vinte vezes mais barata que o cancelamento.** Cliente que cancela no
   mês 2 do AS-02 deve 20% de R$ 30.000 = **R$ 6.000**. Cliente que simplesmente para de
   pagar deve 2% de R$ 15.000 + 1% a.m. = **R$ 300 + R$ 150/mês**. Sair pela porta custa
   vinte vezes mais que sair pela janela — qualquer cliente racional escolhe sumir. Falta
   **vencimento antecipado**: sem ele a multa de 20% nunca é acionável contra quem não
   formaliza a rescisão.
7. **O escopo depende de insumo que o contrato não obriga o cliente a entregar.**
   4 stories × 3 perfis × 30 dias = **360 stories/mês** de bastidores. A contrapartida do
   cliente é um prazo de resposta (48h), não um volume. O cliente que não grava nada não
   descumpre nada; a Contratada é que fica devendo. Falta cláusula de insumos com volume
   mínimo e a trava: **não entregue até a data de corte, não é devido, não acumula e não
   gera crédito**.
8. **O onboarding corre da assinatura, não da liberação dos acessos.** O cliente assina e
   leva vinte dias para liberar a BM; no oitavo dia útil a Contratada já está inadimplente
   com serviço que não tem como executar. E o AS-02 vendeu 50% mais perfis mantendo os
   mesmos 7 dias úteis. Regra correta: **o cronograma escorrega, o vencimento não.**
9. **"Poderá gerar ajuste no valor" é faculdade, não direito** — e não há preço unitário em
   lugar nenhum do acervo. O dado existe e nunca virou regra: o perfil marginal entre AS-01
   e AS-02 foi precificado em **R$ 8.000/mês**.

---

## 10. Decisões que dependem do Nicolas

1. **Propriedade dos ativos.** O contrato diz que estratégias, copies e funis são **da
   Contratada**. O briefing da Pontual diz o oposto como diferencial de venda: *"nosso
   contrato deve prever propriedade dos ativos criados (contas, campanhas, artes, páginas
   ficam do cliente) — isso é diferencial e a Thais dá valor"*. Duas posições incompatíveis,
   ambas da casa. O template precisa da resposta antes de gerar o próximo contrato.
2. **Qual dos dois "AS-02" foi assinado.**
3. **Natureza do CNPJ** e se ele suporta o ticket.
4. **Trocar a testemunha 1**, se for o sócio.

---

## 11. Ressalvas de fidelidade

Uma revisão adversarial dedicada comparou a síntese contra a extração dos documentos. O que
sobreviveu à verificação está acima. O que **não** sobreviveu, registrado para não
reaparecer:

- A afirmação de que o boilerplate da Expansion seria uma "condensação" de uma minuta de
  terceiro (HL Marketing × RH Assessoria) colada dentro do doc `Albanos - ONBOARDING`.
  Há **texto compartilhado** entre os dois — mesmo percentual de multa, mesma base, mesma
  estrutura de PI — mas isso não estabelece derivação, e a cronologia aponta no sentido
  oposto: os contratos são de abril, o arquivo com a minuta é de junho. Fica registrado
  como coincidência textual a investigar, **não** como origem provada.
- A afirmação de que a minuta de terceiro teria "redação pronta" para as cláusulas NOVA.
  Ela tem, no máximo, para qualificação, foro, confidencialidade, força maior, vínculo
  empregatício e caráter personalíssimo. Para verba de mídia, titularidade de ativos, LGPD
  operacional, limitação de responsabilidade, mora, aprovação, renovação e não aliciamento
  ela tem **as mesmas lacunas** do contrato da Expansion.
- A descrição das obrigações e do cronograma como "verbatim e idênticas nos três arquivos".
  Os blocos divergem: o AS-01 diz *"acesso aos perfis"*, o AS-02 diz *"acesso aos 3
  perfis"*; a linha de bônus no cronograma existe em um só arquivo.

Um achado da revisão de fidelidade foi verificado e **descartado**: ela apontou o horário
21:59 como invenção. Ele consta do metadado `createdTime` do Drive
(`2026-04-29T21:59:25.133Z`) — a revisora não tinha esse campo à vista. Os três horários da
tabela da seção 1 são metadados reais, em UTC.

---

## 12. Aviso

Este documento mapeia estrutura e automação. **Não substitui revisão de advogado.** As
cláusulas marcadas NOVA são enunciados de intenção, não redação pronta — quase todas
nasceram aqui como título e consequência, e precisam de texto jurídico antes de entrar em
qualquer contrato assinado.
