# ANEXOS — CRISE CIÉS BRAND
## Evidências brutas do parecer `CRISE-CIES-BRAND-PARECER-2026-08-03.md`

---

## A1. FONTES E LOG DE EXTRAÇÃO

| Fonte | Arquivo | Conteúdo |
|---|---|---|
| ZIP 1 | `WhatsApp_Chat__Kauan_Queiroz.zip` | `_chat.txt` (1.014 linhas, 939 mensagens, 24/05 → 03/08 18:29) + 1 áudio `.opus` + 7 `.vcf` |
| ZIP 2 | `WhatsApp_Chat__CIE_S_brand_and_EXPANSION___.zip` | `_chat.txt` do grupo (2.461 linhas, até 03/08 18:36) + 2 áudios `.opus` da Sabrina |
| PDF | `Contrato_CIES_BRAND_assinado_assinado.pdf` | 2 páginas, texto extraído + páginas renderizadas + estrutura interna auditada |
| Repo | `OPERACAO-REAL-EXPANSION-2026-07-26.md`, `CONSELHO-EXPANSION-2026-07-13.md` | Corroboração interna independente |

**Método:** extração em pasta separada no scratchpad; originais preservados intactos; texto do PDF via pdfminer; páginas renderizadas a 160/300 dpi e inspecionadas visualmente; estrutura interna do PDF auditada byte a byte (campos `Signature1`/`Signature2`, `/ByteRange`, metadados); áudios convertidos para WAV 16 kHz e transcritos com Whisper small (sherpa-onnx), idioma pt.

**Os exports foram gerados SEM mídia.** 141 áudios do privado (76 Nicolas / 65 Kauan), 25 imagens, 8 documentos e 1 vídeo estão referenciados mas ausentes. Só 3 áudios vieram nos ZIPs (o de 03/08 18:21 do Nicolas e os 2 da Sabrina de 18:36) — todos transcritos.

---

## A2. AUDITORIA INTEGRAL DO CONTRATO

**Arquivo:** `Contrato_CIES_BRAND_assinado_assinado.pdf` · 235 KB · 2 páginas
**Metadados:** Creator `Chromium` · Producer `Skia/PDF m141` · criado `17/06/2026 21:47:46 UTC` (= 18:47 BRT) · sem modificação posterior

### A2.1 Qualificação das partes (transcrição literal)

> **CONTRATADA:** CIES BRAND — Sabrina de Souza Garbin de Freitas (MEI) — CNPJ: 49.070.414/0001-86 — Rua Manoel Vitor Diniz, nº 100, Jardim Bom Retiro (Nova Veneza), Sumaré/SP, CEP 13181-660 — Telefone: (19) 99678-2167
>
> **CONTRATANTE:** EXPANSION ASSESSORIA — CNPJ: 61.204.868/0001-62 — Telefone: (19) 98703-0886

⚠️ **As partes estão invertidas.** Quem presta o serviço (Expansion) figura como tomadora; quem toma (Ciés) figura como prestadora.

### A2.2 Cláusulas com efeito invertido (transcrição literal)

**Cláusula 5 — OBRIGAÇÕES DA CONTRATADA** *(no texto, obrigações da Ciés)*:
- "Disponibilizar equipe completa (social media, videomaker, gestor de tráfego, designer e estrategista) para a execução do escopo."
- "Cumprir o calendário editorial e os prazos de entrega acordados."
- "Manter sigilo sobre informações estratégicas e dados da Contratante."
- "Entregar relatórios mensais de performance."
- "Conduzir as reuniões de planejamento e o acompanhamento dos resultados."

**Cláusula 6 — OBRIGAÇÕES DA CONTRATANTE** *(no texto, obrigações da Expansion)*:
- "Efetuar os pagamentos nas datas acordadas."
- "Fornecer materiais, informações e aprovações em até 48h úteis."
- "Disponibilizar acesso aos perfis, contas de anúncios e ferramentas necessárias à execução."
- "Custear separadamente a verba de mídia paga (tráfego)."
- "Participar das reuniões de planejamento e acompanhamento."

**CANCELAMENTO:** "A rescisão poderá ocorrer por qualquer das partes mediante aviso prévio, por escrito, de 30 (trinta) dias. No plano trimestral, a rescisão antecipada **pela Contratante** implica a retenção dos valores já pagos e multa de 20% sobre o saldo restante do contrato." *(no texto, a penalidade recai sobre a Expansion)*

**PROPRIEDADE INTELECTUAL:** "Estratégias, planejamentos, copies, funis e estruturas de campanha desenvolvidos **pela Contratada** são de sua propriedade intelectual..." *(no texto, da Ciés)*

**DIREITOS DE IMAGEM:** "**A Contratada** poderá utilizar o material produzido para portfólio e divulgação..." *(no texto, a Ciés)*

### A2.3 Valores e vigência

- Vigência: "Início: 26/05/2026 · Término: 26/07/2026 · Duração: **2 meses**"
- Plano Mensal: **R$ 2.000,00/mês** · Plano Trimestral: **R$ 4.000,00** ("economia de R$ 2.000,00")
- "Plano selecionado: ☐ Mensal ☐ Trimestral" — **nenhuma caixa marcada**
- Valor pago pelo cliente: **R$ 6.000** (ver A3, mensagens de 26/05 e 23/06) — não corresponde a nenhum plano impresso

### A2.4 Assinaturas

Estrutura interna do PDF: exatamente **2 campos** (`Signature1`, `Signature2`), com carimbo visual gov.br:

| Linha | Nome impresso | Assinado? | Carimbo |
|---|---|---|---|
| CIES BRAND / Contratada — Sabrina de Souza Garbin de Freitas, CPF 460.444.278-97 | — | ❌ **NÃO** | — |
| EXPANSION ASSESSORIA / Contratante — Representante: Kauã Felício Catini | Kauã | ✅ | "KAUA FELICIO CATINI — 17/06/2026 19:07:26 -0300" |
| TESTEMUNHA 1 — Kauan Rodrigues Queiróz, CPF 498.818.458-74 | — | ❌ **NÃO** | — |
| TESTEMUNHA 2 — Nicolas do Nascimento, **CNPJ 58.620.299/0001-67** | Nicolas | ✅ | "NICOLAS DO NASCIMENTO — 17/06/2026 18:57:34 -0300" |

Local: "Alphaville/SP, 17 de j[unho]". Sem selo ICP-Brasil (0 ocorrências de `ITI`/`ICP-Brasil` no binário); carimbos gov.br apenas como imagem + dicionários `/Sig` padrão.

### A2.5 Divergência de CNPJ

- CNPJ da "Expansion Assessoria" no contrato: `61.204.868/0001-62`
- Chave PIX enviada nos dois pagamentos (26/05 10:48 e 01/06 13:19): `61.204.696/0001-62`, sob o nome "Kaua Catini"

---

## A3. EVIDÊNCIAS-CHAVE DO CHAT PRIVADO (Nicolas ↔ Kauan)

Transcrição literal, com linha do arquivo `_chat.txt` entre colchetes.

### Fechamento e pagamento

- [72] `25/05 23:48` Kauan: "Tamo junto! Por mim eu fecho a parceria ein agora falta a Sabrina topar também mas ela curtiu muito"
- [73] `26/05 00:13` Nicolas: "Fechado meu irmão! Amanhã já encaminho para o time o que foi os entregáveis e te envio a proposta com tudo listado 💪🏻🇧🇷"
- [94] `26/05 10:36` Nicolas: envia `Pacotes_Entrega_Pagamento.pdf • 1 página` (documento omitido no export)
- [99-101] `26/05 10:39` Nicolas: "Confere, foi o que falamos ontem. Aí alinha com a Sabrina. Acredita que o plano que vocês vão querer até as 13h00? Me atualiza que já passo para o time aí já agendamos o onboarding para hoje ainda."
- [102] `26/05 10:41` Kauan: **"Era o pacote completo 3 meses 6k no pix"**
- [103-104] `26/05 10:42` Kauan: "Consigo fazer o pagamento no dia 01/06?" / "Iniciamos o contrato do dia 1 em diante"
- [112] `26/05 10:48` Nicolas: "61.204.696/0001-62"
- [117-119] `26/05 10:53` Kauan: "A Sabrina está dentro questões contratuais vai ficar comigo, tudo relacionado ao financeiro comigo" / "e mkt e estratégia com" / "ela"
- [124] `26/05 10:57` Kauan: envia `comprovante_picpay_pix_26-05-2026-10-56-55 AM.pdf`
- [138-139] `26/05 11:09` Kauan: "Quanto ao restante do acerto (5K) tenho que falar com meu assessor... mas dia primeiro é certeza que estará feito!"
- [248-252] `01/06 13:16-13:21` Kauan pede o pix; Nicolas repete `61.204.696/0001-62` / "Kaua Catini"; Kauan envia imagem; "Feito!"

### Cobranças do cliente

- [253-254] `01/06 13:22` Kauan: "Depois se puderam mandar um **cronograma de entregáveis e ações dessa semana**, será top para a gente se programar" / "Tanto ações de vcs quanto ações nossas!"
- [366-367] `10/06 17:29` Kauan: "Fala mestre, bão?? Ai depois **nos manda o contrato para assinarmos** / Para podermos seguir com os cronogramas"
- [395-400] `12/06 13:29` Nicolas: "Ooou! Vou mandar na segunda pode ser? Esqueci de falar" — Kauan: "Pode sim! ... So mesmo para acompanharmos os entregáveis e ir seguindo o cronograma mesmo"

### Contrato

- [410-413] `17/06 17:39` Nicolas: "Vou enviar ai o contrato / Vou assinar já com o kaua te envio para assinar / **Coloca a sabrina como testemunha?** / Me envia seu nome completo documento & endereço"
- [423-425] `17/06 17:57` Nicolas: "Nao / Me envia aqui, ou peço para ela? / Te coloco de testemunha"
- [435-436] `17/06 19:10` Nicolas: "Enviei o contrato para sabrina / Ela assinando ja te envio para assinatura"
- [497] `23/06 08:36` Kauan: **"Viu acho que o contrato que mandou para a Sabrina esta errado"**
- [502-507] `23/06 13:47-13:50` Nicolas: "O que está de errado? Vou revisar aqui…" — Kauan: "**O tempo de vigência e os valores** / Seriam **3 meses e 6mil reais pagos** / Como paguei 6 eu ganho um mês a mais eh isso? No caso 4 meses? Ja que o plano trimestral eh 4K"
- [508-509] `23/06 13:58` Nicolas responde por áudio (indisponível). Kauan: "Blz"
- [579-580] `30/06 19:21` Nicolas envia `Contrato_CIES_BRAND (1).pdf • 2 páginas`: "Revisa antes de eu assinar com o Kaua irmão"
- [583] `30/06 19:42` Kauan devolve `Contrato_CIES_BRAND_(1)_assinado_assinado.pdf • 2 páginas`
- [585] `30/06 19:54` Nicolas: "Beleza vamos assinar e te enviamos" — **sem evidência posterior de envio**

### Cronograma e gestão pelo cliente

- [542-546] `30/06 11:44` Kauan: "Quanto ao cronograma manda para mim primeiro antes de soltar no grupo... Aí quando eu aprovar manda lá pra ela ver... Só esperando fechar o dia para começar a fazer uma **apresentação de resultados para vcs**!"
- [565-566] `30/06 16:04` Kauan: "Perai a autonomia que eu digo é para decisões no que diz respeito ao cronograma / **Tem muita coisa parada! kkkk**"
- [568-574] `30/06 17:41` Kauan: "Então Overview — 1 Documentação de ajuste Meta, envio arquivo para análise 30/06 - 08/07 (prazo para análise) / 2 Cronograma mês de Julho para aprovação Kauan 30/06 - 01/07 (Devolução Sabrina) / 3 Apresentação Reunião (Fechamento financeiro, operacional e MKT) 03/07"
- [581-582] `30/06 19:31` Nicolas: "**Um rascunho** do cronograma: https://docs.google.com/document/d/1GqSukg..."

### Atrito com o gestor de tráfego (03/07)

- [599-600] `12:03` Nicolas: "Meu gestor de trafego mandou mensagem aqui sobre a conversa que voces estao tendo no privado. O que aconteceu? / **Ele ta bem insatisfeito**, queria entender seu lado"
- [609-614] `12:15-12:23` Kauan: "Mano seu gestor **nem me responde mais**... ele não tem controle para resolver entre nós / Podemos resolver nós 3 em ligação? / Acho que foi a palavra 'mestre' que ele achou que foi em tom de ironia / Mas eh do meu cotidiano aqui na empresa quando reconheço alguém superior a mim"

### 16/07 — admissão, quase-churn e oferta de mais ticket

- [710-714] `20:59` Nicolas: "Irmão! **Perdão por todo esse alvoroço aí… Foi uma desatenção grande, muito retrabalho. Não aceito a Sabrina editar** saca isso, falei com o Dani aqui alinhei com ele. Mas desculpa mesmo, **não é nosso padrão, foi realmente uma desatenção minha**."
- [716] `21:35` Kauan: "Bom erros acontecem! Normal! Acredito no potencial de vocês..."
- [717] `21:38` Kauan: "**Confesso que eu e a Sabrina estamos nos questionando se vai dar para continuar com o trabalho com vcs** mas eh pq talvez o alinhamento não esteja fluindo da melhor forma! A Sabrina eh bem exigente quanto a imagem dela, até brigamos por conta disso..."
- [719] `21:49` Kauan: "Então esse mês corremos atrás do cronograma **o cronograma não foi cumprido** eu mesmo já nem to olhando pra ele e garantindo que as coisas apenas saiam kkk"
- [720] `21:51` Kauan: "...acho que só tá faltando colocarmos mais prazos nas coisas! Se acertarmos isso nosso **último mês** de investimento pode ser proveitoso!"
- [721-727] `21:52-21:56` Kauan: governança financeira implantada, "3,2 K de fat" em 15 dias, pai da Sabrina financia e cobrava
- [736-738] `21:58` Kauan: "**não tenho nenhum problema dando certo a gente aumentar o ticket que pagamos pra vcs / Eu ficaria feliz em pagar mais por mais resultado** / E seu meninos mais motivados também"
- [743] `21:58` Nicolas: "Eu vejo o potencial da empresa demais, e **assumi a causa de vocês. Não faço isso com nenhum cliente**."

### 17/07 — reincidência e mistura de papéis

- [795] `13:32` Kauan: "Certo eu tenho **quase certeza que o CRM tava dentro do pacote**"
- [856-859] `17:57` Kauan: "**Atividades da Sabrina hoje: 1- Edição do filtro do vídeo 2 - Capas nos vídeos**"
- [878-884] `18:00` Nicolas: "**Quero te tirar da CLT kkk / Jaja vou criar algo para você entrar**" — Kauan: "Eu quero sair kkkk"

### 03/08 — a ruptura (bloco integral)

- [969-971] `11:59-12:01` Kauan: "Fala mestre bom dia tudo bem? / Depois ajuda a gente a pensar no **evento do dia 8** para trazer as clientes **que vc disse que ia ajudar** / Ahhh e minha tia deu certo? Que aí provisiono a entrada dos 500,00 aqui nos meu controles"
- [972-974] `14:53` Nicolas: "Sim! / Fala comigo / Excelente dia"
- [979] `14:55` Kauan: "Como vc ta hoje de noite **eu fechei a apresentação de resultado** e gostaria de marcar uma mini reunião para apresentar"
- [980-984] `18:18-18:20` Kauan: "Evento / **Men acho que deu ruim o evento** / A Sabrina não tá gostando dessas coisas em cima da hora / **Não temos nada ainda, a promessa era ter alguma coisa semana passada e nada até agora** / **Vc me deu o prazo das 18:00 e nada também**"
- [985-990] `18:21` Nicolas: "Mano to na pegada, vou te enviar / Esse é um **bônus**, que to acelerando aqui para entregar também. CRM estamos fazendo também tá bem pegado. **Só paga você ter um 360 mesmo…**."
- [991] `18:21:49` Nicolas: áudio — transcrição: *"do que vocês construíram de evento, [alguma] estratégia, não tem nada ainda, só o que eu risquei lá o vídeo, só me passa isso, porque se tiver alguma estratégia, consigo linkar aqui"*
- [992-998] `18:22-18:24` Kauan: "**De estratégia eu não tenho nada / Vc ia trazer a proposta / Confiei** / Mas eh triste acho que vamos perder esse timing / Era pra ter soltado coisas semana passada para falar do evento / Vamos ter pouco prazo para divulgar / E nem temos proposta de estratégia"
- [999-1003] `18:24` Nicolas: "Não vamos não, **calma**. Dá para fazer uma estrategia forte, so queria esse 360. Vou te mandar / **É mais imples do que parece, pode ficar de boa** / Serio mesmo"
- [1004-1006] `18:24-18:25` Kauan: "Espero que seja / **Estamos insatisfeitos** / A Sabrina me pontua muita coisa e **eu filtro muito também**"
- [1007] `18:25` Nicolas: "Me passa para eu entender"
- [1008-1015] `18:26-18:29` Kauan: "Ela acha que está faltando **cuidado de botar o prazo cumprir e entregar**, além de vcs se prontificarem a acompanhar o negócio / **O único que vejo esse cuidado eh o Matheus** / Que inclusive fez até uma reunião / Fora que **o que ela pede não tá sendo entregue!** Ela olha o Instagram de vcs… vê qualidade e a loja ela não vê esse mesmo cuidado com qualidade / A começar do **problema com os filtros** aí falamos de um **insta clean** também não teve jeito **as estratégias não estão sendo apresentadas** / Até eu imaginava melhor **mais profissional** / **Sei que vc tem muitos clientes mas essa eh a nossa reclamação**"

**Fim do export: 18:29:29. Sem resposta da Expansion no material.**

---

## A4. EVIDÊNCIAS-CHAVE DO GRUPO (CIÉS brand and EXPANSION)

- `30/07 18:44` Nicolas: "@Daniel Pereira - Edita a colorização para testar se aprendeu a tratar, **qualquer coisa manda aqui para a @Sabrina Garbin tratar novamente**." — cliente mantida no fluxo de produção por instrução do próprio Nicolas, 14 dias após "Não aceito a Sabrina editar"
- `30/07 19:25` Matheus: "Pessoal, em 5 minutos iniciamos nossa call!!" — a reunião elogiada pelo Kauan
- `30/07 20:01` Sabrina: "Aprovado 🙏🏻"
- `31/07 08:57` Kauan: "...apresentação bem direta e objetiva... **Excelente trabalho do Matheus**, e seguimos por mais!"
- `31/07 11:31` Matheus: envia **`Relatório CIES BRAND - Meta Ads Julho 2026.pdf • 6 páginas`** — único relatório formal do ciclo, da frente de tráfego
- `31/07 16:58` Matheus envia PIX de **R$ 228** para anúncios; Sabrina paga às 17:00 — verba de mídia fluindo por recargas avulsas pequenas
- `31/07 17:08-17:15` Kauan pede legenda à Débora; Matheus resolve sozinho: "Consegui subir o anúncio aqui!!"
- `03/08 08:36` Kauan: áudio no grupo marcando @Nicolas (conteúdo indisponível) — sem resposta visível até 18:36
- `03/08 10:20` Matheus: métricas 31/07→02/08: "Orçamento utilizado: R$200,30 / alcance: 7.927 / Cliques: 108 / **Conversas iniciadas: 52 / Custo por conversa: R$3,85**... Houveram vendas nesta semana?"
- `03/08 10:34` Kauan: "Excelente Matheus! Top!... Lembrando que a análise da conversão fecha na terça (amanha)"
- `03/08 18:36:29` **Sabrina: 2 áudios** (transcrição integral no §1-B do parecer): evento de 08/08 inviável — *"não funciona evento assim de última hora... pelo menos duas semanas"* — **adiado para o sábado seguinte (15/08)**; *"se vocês conseguirem dar uma priorizada nisso... a gente precisa verificar isso quanto antes"*

---

## A5. MÉTRICAS DO CHAT PRIVADO

**Totais:** 939 mensagens em 50 dias com atividade · Kauan 493 (52,5%) · Nicolas 446 (47,5%)
**Mídia:** 141 áudios (Nicolas 76 / Kauan 65) · 30 figurinhas · 25 imagens · 8 documentos · 1 vídeo · 16 ligações de voz + 2 de vídeo
**Conteúdo de negócio:** 94 mensagens (10,0%) — Kauan 66 / Nicolas 28 (**2,4:1**)
**Tempo de resposta (trocas <24h):** Nicolas mediana 2,1 min, p90 173 min · Kauan mediana 0,8 min, p90 39 min

**Cordialidade do Kauan por período:**

| Período | n | Riso | Emoji | "!" | Tratamento afetivo |
|---|---:|---:|---:|---:|---:|
| 24/05–15/06 | 199 | 8,0% | 2,0% | 22,6% | 6,0% |
| 16/06–15/07 | 135 | 12,6% | 0,7% | 6,7% | 10,4% |
| 16/07–31/07 | 129 | 8,5% | 0,0% | 24,8% | 3,1% |
| **03/08** | **30** | **0,0%** | **0,0%** | 10,0% | 3,3% |

Único dia sem nenhuma risada do Kauan em 50 dias de conversa: **03/08**.

**Picos de volume:** 26/05 (98 — fechamento) · 17/07 (104 — pós-crise 1) · 25/05 (64) · 05/06 (55) · 30/06 (50) · 16/07 (44) · 03/08 (40)

---

## A6. INDICADORES DA RELAÇÃO PESSOAL (contexto, não julgamento)

- 25/05: encontro na loja; 25/05 23:45 Nicolas: "Bem vindo ao nosso Lifestyle kakakaka"
- 05/06: Nicolas dorme na casa do Kauan ("Acha de boa dormir no seu quarto?")
- 19-20/06: Nicolas pede a Júlia (da casa do Kauan) em namoro, com ajuda da mãe do Kauan
- 29/06: academia juntos; 09/07: futevôlei e fut da igreja juntos; 06/07: "pega a play da nossa quinta"
- 12/07: Nicolas oferece drone pessoal (R$ 3.500) no chat do cliente
- 17/07: "Quero te tirar da CLT kkk / Jaja vou criar algo para você entrar"
- 16/07: Kauan menciona call com "possível business partner da expansion"
- 24/07: Nicolas em call com Júlia pede ao Kauan para comprar Bis branco e entregar no quarto dela
- 31/07: Kauan convida Nicolas para o aniversário da mãe ("seu lugar está reservado")
- 17/06 + 03/08: comissão de R$ 500 pela indicação da tia — confirmada "Sim!" em 03/08 14:53, não paga até o fim do export

---

## A7. ARQUIVOS REFERENCIADOS E INDISPONÍVEIS (ver §5.D do parecer)

| Data | Arquivo | Relevância |
|---|---|---|
| 26/05 10:36 | `Pacotes_Entrega_Pagamento.pdf` | **Crítica** — escopo comercial original |
| 26/05 10:57 | `comprovante_picpay_pix_26-05-2026-10-56-55 AM.pdf` | Alta — valor do 1º pagamento |
| 01/06 13:21 | imagem (comprovante 2º pagamento) | Alta |
| 17/06 17:49 | `documento_1781712296852.pdf` | Baixa |
| 17/06 18:13 | `CCMEI-49070414000186.pdf` | Média — CNPJ correto da Ciés |
| 30/06 19:21 | `Contrato_CIES_BRAND (1).pdf` | **Crítica** — versão revisada |
| 30/06 19:42 | `Contrato_CIES_BRAND_(1)_assinado_assinado.pdf` | **Crítica** — versão devolvida assinada |
| 31/07 11:31 | `Relatório CIES BRAND - Meta Ads Julho 2026.pdf` | Alta — único relatório formal do ciclo |
| — | 141 áudios do privado | **Crítica** — promessas verbais |
| — | 18 ligações de voz/vídeo | Alta |

---

*Anexos gerados em 03/08/2026. Originais preservados sem alteração.*
