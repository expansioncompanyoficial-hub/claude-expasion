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

## Entrega no Google Drive dos clientes

**Regra permanente:** sempre que o Nicolas **aprovar** um documento produzido aqui,
subir a versão final no **Google Drive do cliente**, pelo conector do Drive
(`mcp__Google_Drive__create_file`). O repositório é o histórico de trabalho; o Drive
do cliente é onde a equipe e o cliente consultam. Não subir rascunho — só o aprovado.

### Estrutura padrão de pasta de cliente

Raiz dos clientes: `1QpwEAr9-3tWdW3MbOjEcAZSJxtzL0bbG`

```
[Cliente]/
  Documentos/          Onboarding, Acessos, estratégias e pareceres
  Banco de Materiais/  Logos & iD Visual da Marca
  Brutos/              material bruto de gravação
  Editados/            material finalizado
  Roteiros/            roteiros de gravação
```

### Convenção de nome dos documentos

`Onboarding - [Cliente]` · `Acessos - [Cliente]` · `Roteiros - [Cliente] ([contexto])`
— sem data no título, seguindo o padrão que já existe em ClauKids e Prime.

Modelos da casa, para seguir o formato:
- `MOD - BRIEFING DE CLIENTE` (`1Z4xAzKB81xhXsyoH-ZtViZtpIyCkBBGyuyRMLOx_6kU`)
- `MOD - ROTEIRO SEMANAL` (`1U6uWEVNxXW-4jwisHvg2JjoidgtpzfDfYLWz6SgYBtg`)
- Referência preenchida: `Onboarding - ClauKids` (`1xLQI8w7X7CdIiDA1LkP0p_VXsxwQcl7_yE-m1x7V8kI`)

O documento de onboarding segue as 12 seções do padrão: sobre a marca · cliente ideal ·
público-alvo · produto e diferencial · branding · comunicação (tom e o que NÃO fazer) ·
ticket e números · alvo de faturamento e objetivo com a Expansion · estrutura e pontos
de atenção · histórico com agências · **o que faria o cliente não se sentir satisfeito** ·
dados da call e pendências.

### Credenciais — nunca em documento do Drive

O documento `Acessos - [Cliente]` registra **como** se acessa cada plataforma (forma de
acesso, IDs de portfólio, usuário, status, observações operacionais e histórico), e
**não** os valores de senha. Senha fica em gerenciador de senhas.

Motivo: documento de Drive é compartilhável com um clique e não tem log de leitura;
várias dessas contas guardam dados pessoais de clientes finais (LGPD). Preferir sempre
**acesso de parceiro** (Meta) ou **usuário adicional** (Tray, Bling) a login
compartilhado — e **nunca pedir senha por WhatsApp**.

### Clientes mapeados

| Cliente | Pasta raiz | Documentos |
|---------|-----------|------------|
| Estilo Menina | `1AbsUZrgW0SOBgBY7sBj5SUNF16VoPAgb` | `1cajJ4JJmfcJy7WERED-o6gugndQJF9nh` |
| ClauKids | `13KU2Bsl3rUGW-PPvY21FaCM8ggAJavIV` | (documentos na raiz) |
| Prime Alphaville | `11K9wd_c_HwC0syaJVF3foz0qsqUT3jO9` | (documentos na raiz) |

## Estado da migração

`.claude/reference/drive-manifest.json` rastreia os 38 arquivos do Drive
(~2,2 MB) e o que já veio. Ver `status` de cada entrada.
