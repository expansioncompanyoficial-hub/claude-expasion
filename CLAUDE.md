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

## CLIENTES — como usar

Cada cliente da agência tem uma pasta em `CLIENTES/`. **Antes de produzir
qualquer coisa para um cliente, ler o `<CLIENTE>-CONTEXTO.md` dele** — é o
documento vivo com produtos, público e as regras editoriais que a conta não
aceita quebrar. `CLIENTES/README.md` traz a estrutura padrão da pasta.

**Credencial não entra neste repositório.** Nem em transcrição de WhatsApp, nem
em documento de contexto. Senha que aparecer em export é redigida antes do
commit; o documento pode dizer *onde* a credencial vive, nunca *qual* é.

## Roteiros — padrão obrigatório

**Todo roteiro produzido sai no padrão da empresa**, entregue como Google Docs
na pasta do cliente no Drive. Nunca em markdown solto.

Use a skill **`roteiro-expansion`** — ela traz a anatomia, a paleta, os scripts
geradores e o fluxo de entrega. `PADRAO-ROTEIROS-EXPANSION.md` guarda a
especificação escrita, para consulta.

O padrão é a forma; as regras editoriais de cada cliente
(no `<CLIENTE>-CONTEXTO.md`) continuam mandando no conteúdo.

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
