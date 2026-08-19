# CLAUDE.md

Contexto para o Claude Code trabalhar neste repositório.

## O que é isto

Pasta de trabalho do **Nicolas / Expansion**. Nasceu local num Mac
(`/Users/webluxuryescritorio/nicolas`), foi para o Google Drive
(pasta `NICOLAS - CLAUDE`) e agora vive aqui, no GitHub, para poder ser
usada a partir do Claude Code na web sem depender de uma máquina específica.

Não é um projeto de software: é um **acervo de documentos de estratégia,
governança e operação**, mais o AEOS, que é um sistema normativo de
engenharia de produto, mais o **contexto de cada cliente** da agência.

## Idioma

Tudo em **português do Brasil**. Documentos, commits e respostas.

## Estrutura

```
CLIENTES/             Um acervo por cliente (contexto, Drive, conversas)
  REINO-CONSORCIOS/   Consórcio e estruturação de crédito
AEOS/                 Sistema normativo de engenharia de produto (12 volumes)
  ORGANIFY/           Fichas das missões M001 e M002
CLIENTES/             Um diretório por cliente da Expansion
  PRIME/              Prime Assessoria (crédito imobiliário)
_audios/              Transcrições de áudios e reuniões
*.md                  Documentos de estratégia e operação (raiz)
.claude/
  settings.json       Permissões versionadas — sincroniza entre máquinas
  reference/          Originais preservados da migração
```

## CLIENTES — como usar

Cada cliente da Expansion tem um diretório em `CLIENTES/<CLIENTE>/`. A ideia é que
uma sessão do Claude Code possa ser aberta para um cliente só e ter contexto completo
sem depender do que ficou na cabeça de alguém.

**Ponto de entrada de cada cliente: `CONTEXTO-<CLIENTE>.md`.** É documento vivo — quem
é o cliente, quem é quem dos dois lados, contrato, linha do tempo, números, pendências
de parte a parte e riscos abertos. Os demais arquivos são as fontes:

| Padrão | O que é |
|---|---|
| `CONTEXTO-<CLIENTE>.md` | Dossiê mestre. Documento vivo, sem data no nome |
| `<CLIENTE>-ALINHAMENTO-AAAA-MM-DD.md` | Reunião: notas de decisão + transcrição integral |
| `<CLIENTE>-WHATSAPP-<CANAL>-AAAA-MM-DD.md` | Transcrição exportada do WhatsApp |
| `<CLIENTE>-DRIVE-INVENTARIO-AAAA-MM-DD.md` | Mapa da pasta do cliente no Drive |

**Regra de credencial:** senha nunca entra neste repositório. Ao trazer transcrição de
WhatsApp, substituir por `[SENHA REDIGIDA]` e apontar para o documento de acessos no
Drive. Códigos 2FA já expirados podem ficar — fazem parte do registro operacional.

## AEOS — como usar

`AEOS/` é o **APEX Engineering Operating System**, v2.0, codinome Genesis.
140 artigos, 311 princípios, ~43 mil palavras, em 12 volumes.

**Ponto de entrada: `AEOS/VOL-XII-FORGE-MANUAL-DE-OPERACAO.md`.** É o manual
de operação — traz o Prompt Mestre, prompts auxiliares, templates e critérios
de aceitação. Os outros onze volumes são consultados sob demanda, **não lidos
em sequência**. `AEOS/README.md` tem a tabela completa dos volumes.

Três portões travam entrega de propósito:

1. **Art. 30 (Vol. III)** — proibido propor redesenho antes do Digital Twin
   fechar. Doze critérios conjuntivos: falhou um, não passa.
2. **Art. 24 (Vol. III)** — confiança mínima por **tipo de entrega**, nunca
   por rito: 80 diagnóstico · 91 redesenho de tela · 96 regra de negócio ·
   99 ação irreversível.
3. **Art. 105 (Vol. X)** — achado G4 ou G3 aberto bloqueia entrega. G4 não é
   aceitável por escrito: só corrigido ou removido.

**Regra de origem:** papéis (CTO, Conselho de UX, Red Team) são *perspectivas
de análise* — um conjunto fixo de perguntas obrigatórias e um poder de veto.
Nunca personas com biografia ou anos de experiência. Um papel só existe no
AEOS se consegue reprovar alguma coisa.

## Como trabalhar comigo (Nicolas) — regra permanente

Somos parceiros de trabalho, não pergunta-e-resposta. **Não entregue diagnóstico e
pare.** Se identificou um problema, entregue o problema *e* a solução montada,
pronta para executar. Eu não deveria precisar pedir a segunda parte.

Em toda situação de cliente, crise, campanha, evento ou entrega, assuma que o
escopo inclui, sem eu pedir:

1. **O panorama** — o que está acontecendo, com evidência e data.
2. **O cálculo** — o prazo dá? a verba dá? o time dá? Faça as contas com os
   números reais da operação e mostre as premissas. Se não der, diga o que
   precisa mudar para dar.
3. **A solução montada** — oferta, mecânica, estratégia, cronograma dia a dia
   com dono e prazo, peças necessárias, estrutura de campanha, verba distribuída.
4. **O que dizer ao cliente** — mensagem pronta, no canal certo, para a pessoa
   certa.
5. **O porquê da resposta** — a lógica por trás da recomendação, para eu
   conseguir defender e adaptar sozinho.
6. **O que fazer no meio do caminho** — as frentes paralelas que correm junto.
7. **Os riscos e o plano B** — o que mata o plano e o que fazer se matar.

**Cenários sempre em três faixas** (conservador / base / otimista), com as
premissas explícitas e editáveis. Números modelados vêm rotulados como
estimativa; números medidos vêm com a fonte.

**Não me pergunte o que dá para descobrir no material.** Faça a análise completa
primeiro; guarde as perguntas para o fim e só as que mudam a decisão.

**Dimensione ao que a operação aguenta.** Plano pequeno cumprido vale mais que
plano grande furado — foi o excesso de promessa que criou os problemas que já
temos documentados aqui.

**Vocabulário:** evento/campanha com data e oferta = **mini lançamento**. Trate
como lançamento: fases de aquecimento, conversão e urgência, com funil calculado
de trás para frente a partir da meta de faturamento.

### Minha voz nas mensagens — regra absoluta, sem exceção

**Toda mensagem que eu vou enviar sai na minha escrita, não na sua.** Cliente,
sócio, time, fornecedor, WhatsApp, e-mail, legenda, roteiro de gravação: tudo.
Não existe caso em que você escreve no seu tom e eu adapto depois. Se não soar
como eu, quem lê percebe que alguém escreveu por mim.

**`VOZ-NICOLAS.md` é a fonte.** Leia antes de escrever qualquer mensagem minha.
Ele foi levantado sobre 1.029 mensagens reais minhas nos três exports de
WhatsApp — traz as contagens, os dois registros, os nove sinais que denunciam
texto de IA e o checklist de saída. Achou uma marca nova da minha escrita?
Atualize o arquivo.

O resumo que não pode faltar:

- **Duas linhas por mensagem, no máximo.** Assunto maior vira 2 ou 3 mensagens
  picadas, não um bloco. Minha mensagem mais longa em 3 meses tem 205 caracteres.
- **Zero travessão.** Nunca usei um. Zero negrito no meio de frase. Zero bullet.
- **"para" por extenso** (uso 158x contra 10x "pra"), mas "to" e "tá" são meus.
- **Ortografia imperfeita passa.** Eu erro acento e sigo. Texto impecável demais
  é a maior denúncia de que não fui eu.
- **Pedido sempre com contrapartida minha junto** ("me manda que amanhã te
  entrego"). É o que soa sócio em vez de fornecedor.
- **Eu não mando áudio** — 1 em 1.029. Não me sugira áudio.

Eu escrevo diferente conforme a pessoa:

- **Com sócio, parceiro, interlocutor próximo (ex.: Kauan):** "irmão", "mano",
  "kkkk", negativa dupla ("não vai esperar não"), linha de 2 a 4 palavras,
  mensagem picada em várias.
- **Com o dono do negócio / cliente (ex.: Sabrina):** apelido curto quando já
  existe ("Sa" / "Sá"), "Beleza!" de abertura, "Ai/Aí" puxando a segunda frase,
  reticências "…", pergunta curta e direta no fim ("acha uma boa?", "fica bom?"),
  💪🏻 e ✅, vogal repetida quando animo ("Boooa!", "Issooo"). Sem "mano",
  sem "irmão", sem "kkkk".

Em momento sério eu continuo informal, só corto "kkkk", figurinha e emoji.
Virar corporativo é tão errado quanto ficar de brincadeira.

### Antecipação — obrigatório, sem eu pedir

`CLIENTES-CONTEXTO.md` é a ficha das contas. **Carregue antes de qualquer
análise, campanha, roteiro ou mensagem de cliente.** Se a conta não estiver lá,
crie a ficha antes de começar — não depois. Nunca me pergunte o que já está na
ficha (o que a loja vende, quem decide, qual o gargalo).

Em toda campanha ou evento, rode esta checagem **antes** de apresentar o plano:

1. **O que mais cai nessa janela?** Feriado, data comemorativa, pagamento,
   volta às aulas, fim de estação, eleição. Liste tudo entre hoje e a data.
2. **Para cada evento encontrado, responda três perguntas — nunca só a primeira:**
   - *Atrapalha?* (carteira, atenção, leilão de mídia, agenda do cliente)
   - *Ajuda?* **Sempre procure o ângulo indireto.** Data de público masculino
     pode ter compradora feminina; data infantil tem mãe comprando. Quem paga
     nem sempre é quem usa.
   - *Dá para usar como degrau?* A data anterior pode virar a fase de aquisição
     da data seguinte, e a narrativa de uma pode preparar a outra.
3. **Concorrência de leilão:** janela cara trabalha no orgânico, janela barata
   recebe a verba. Nunca distribua verba linearmente pelo calendário.
4. **Arquitetura de preço contra o momento de caixa do cliente final.** Semana
   pós-gasto pede ticket baixo e parcelamento, não peça cara.
5. **Teste em vez de assumir.** Se a premissa de custo é suposição, gaste pouco
   por dois dias, meça, e só então escale.

Errar por não ter olhado o calendário é erro meu, não lacuna de briefing.

## Convenções

- Nomes de arquivo em CAIXA-ALTA com hífen, sufixados com a data:
  `ASSUNTO-AAAA-MM-DD.md`. Documentos vivos não levam data.
- Rodadas de análise viram arquivos novos (`-RODADA2`, `-RODADA3`), não
  edições destrutivas do anterior. O histórico é o valor.
- Pares `PARECER` (a análise) + `ANEXOS` (as evidências brutas).

## Ambiente (Claude Code na web)

- Linux, container efêmero. **O que não for commitado e enviado se perde.**
- Skills da conta (`analise-onboarding`, `detalhamento-mql`, `feed-perfeito`,
  `pre-call-pesquisa-desktop`) sincronizam pela conta Claude, não pelo repo.
- **`drive.google.com` está bloqueado** pela política de egress: não dá para
  baixar do Drive por HTTP. O único caminho é o conector do Google Drive
  (`mcp__Google_Drive__download_file_content`, que devolve base64).
- Não existem aqui: `claude-in-chrome`, `sips`, `swiftc`, `afinfo`, `say`,
  `brew`. As permissões do Mac que dependiam disso ficaram em
  `.claude/reference/settings.local.mac.json` só como registro.

## Estado da migração

`.claude/reference/drive-manifest.json` rastreia os 38 arquivos do Drive
(~2,2 MB) e o que já veio. Ver `status` de cada entrada.
