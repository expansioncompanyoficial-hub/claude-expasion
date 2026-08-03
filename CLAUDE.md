# CLAUDE.md

Contexto para o Claude Code trabalhar neste repositório.

## O que é isto

Pasta de trabalho do **Nicolas / Expansion**. Nasceu local num Mac
(`/Users/webluxuryescritorio/nicolas`), foi para o Google Drive
(pasta `NICOLAS - CLAUDE`) e agora vive aqui, no GitHub, para poder ser
usada a partir do Claude Code na web sem depender de uma máquina específica.

Não é um projeto de software: é um **acervo de documentos de estratégia,
governança e operação**, mais o AEOS, que é um sistema normativo de
engenharia de produto.

## Idioma

Tudo em **português do Brasil**. Documentos, commits e respostas.

## Estrutura

```
AEOS/                 Sistema normativo de engenharia de produto (12 volumes)
  ORGANIFY/           Fichas das missões M001 e M002
_audios/              Transcrições de áudios e reuniões
*.md                  Documentos de estratégia e operação (raiz)
.claude/
  settings.json       Permissões versionadas — sincroniza entre máquinas
  reference/          Originais preservados da migração
```

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
