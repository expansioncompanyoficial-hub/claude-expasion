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
  PRIME/              Prime Assessoria (crédito imobiliário)
  REINO-CONSORCIOS/   Consórcio e estruturação de crédito
AEOS/                 Sistema normativo de engenharia de produto (12 volumes)
  ORGANIFY/           Fichas das missões M001 e M002
BRANDSDECODED/        Acervo de produto da BrandsDecoded (prompts, skills, guias)
CARROSSEIS/           Registro das peças geradas (alimenta relatório e calibração)
CALIBRACAO/           Régua de padrões por nicho, medida
_audios/              Transcrições de áudios e reuniões
*.md                  Documentos de estratégia e operação (raiz)
.claude/
  settings.json       Permissões versionadas — sincroniza entre máquinas
  skills/             Skills do repo — carregam sozinhas, sem instalação
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
| `FICHA-CARROSSEL-<CLIENTE>.md` | Ficha operacional que a skill `carrossel-viral` lê |
| `identidade/` | Ativos de marca: paleta, referências de layout, logo |

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

## BRANDSDECODED — como usar

Acervo de produto de terceiro (BrandsDecoded), recebido em 2026-08-06. **Ponto de
entrada: `BRANDSDECODED/README.md`**, que mapeia tudo e registra as lacunas conhecidas.

Duas regras próprias desta pasta, que sobrepõem as convenções gerais abaixo:

- **`originais/` é imutável.** PDFs e ZIPs como chegaram — fonte da verdade para
  conferir qualquer transcrição.
- **Os `.md` de `CONTENT-MACHINE/prompts/` e de `SKILLS/` não são editáveis nem
  renomeáveis.** São arquivos de produto, em minúsculas, que a FAQ nomeia um a um e
  que precisam subir com o nome exato. Melhoria vira arquivo novo ao lado, nunca
  edição no original.

## Máquina de carrosséis — como usar

A skill `carrossel-viral` (em `.claude/skills/`) roda o método da BrandsDecoded adaptado
pra agência. **Não precisa instalar nada** — carrega sozinha quando o assunto é carrossel.

Pedir um carrossel é uma frase: *"carrossel pra Prime sobre [tema]"*. A skill lê
`CLIENTES/<CLIENTE>/FICHA-CARROSSEL-<CLIENTE>.md`, gera as headlines, monta o carrossel,
renderiza os PNGs e registra a peça em `CARROSSEIS/`.

São **três modos**, não um: `topo` (viral), `meio` (educativo) e `newsroom` (capa de
notícia). Cada um tem régua editorial própria — inclusive anti-slop, que se contradiz
entre eles. Ver `.claude/skills/carrossel-viral/references/modos.md`.

Duas regras que sustentam o sistema:

1. **Origem do dado declarada.** Os números da BrandsDecoded (+155% Brasil, +119%
   Fim/Morte) são da conta do Leonardo Varricchio, não do cliente. Enquanto não existir
   `CALIBRACAO/{nicho}.md`, a skill usa esses padrões **e avisa que são emprestados**.
2. **Registro não é opcional.** Sem a ficha em `CARROSSEIS/` não existe relatório semanal
   nem recalibração. Foi ausência de relatório que quase custou a Prime em 16/07.

## Geração de fundo de capa

`.claude/skills/carrossel-viral/scripts/capas/` é o módulo que entra **entre a
headline aprovada e a composição da capa**. Não é sistema separado: lê a mesma
ficha de cliente, grava ao lado das mesmas peças e devolve um arquivo que o
renderizador usa como `foto_fundo` do slide 1.

Três regras que sustentam o módulo:

1. **Fundo e capa final são entregas diferentes.** O fundo não tem headline,
   nem logo, nem texto. A capa final é fundo + texto, montada pelo
   renderizador que já existe, com a fonte e a régua da marca.
2. **A imagem se cria a partir do carrossel inteiro, não da headline.** Uma
   capa feita só com a manchete acerta a palavra e erra o assunto.
3. **QA técnico e QA semântico são coisas separadas.** Nitidez e contraste a
   máquina mede. Se a metáfora comunica o problema, não — e o sistema devolve
   isso como pergunta em aberto, nunca como nota calculada.

Manual: `docs/cover-generation.md`. Arquitetura: `docs/cover-generator-integration-map.md`.
Testes: `python3 -m unittest discover -s tests`.

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
