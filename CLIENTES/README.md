# CLIENTES

Um acervo por cliente da Expansion. Cada pasta reúne tudo o que é preciso saber
sobre aquele cliente — contexto de negócio, mapa do material no Drive, histórico
de conversas e as análises feitas ao longo do tempo.

O objetivo é que **qualquer sessão nova consiga trabalhar um cliente sem
precisar refazer o levantamento.**

## Clientes

| Cliente | Nicho | Contexto |
|---|---|---|
| [`REINO-CONSORCIOS/`](REINO-CONSORCIOS/) | Consórcio e estruturação de crédito | [Contexto](REINO-CONSORCIOS/CONTEXTO-REINO-CONSORCIOS.md) |

## Estrutura de cada pasta

```
NOME-DO-CLIENTE/
  CONTEXTO-NOME-DO-CLIENTE.md    Documento vivo — o ponto de entrada
  INVENTARIO-DRIVE-NOME.md       Mapa do Drive com os IDs dos arquivos
  LEITURA-*-AAAA-MM-DD.md        Análises datadas (não se editam, se empilham)
  PARECER-*-AAAA-MM-DD.md        Pareceres formais, quando houver
  _whatsapp/                     Transcrições dos grupos
  _audios/                       Transcrições de áudios e reuniões
```

Vale aqui a mesma convenção do resto do acervo (ver
[`../CLAUDE.md`](../CLAUDE.md)): nomes em CAIXA-ALTA com hífen, análises
sufixadas com a data, documentos vivos sem data. Rodada nova de análise vira
arquivo novo — o histórico é o valor.

## Como abrir um cliente novo

1. Criar a pasta com o nome do cliente.
2. Ler tudo no Drive pelo conector do Google Drive — `drive.google.com` está
   bloqueado por HTTP neste ambiente, não adianta tentar baixar direto.
3. Escrever o `INVENTARIO-DRIVE-*.md` com os IDs **antes** de qualquer análise.
   É o que evita garimpar de novo na próxima sessão.
4. Arquivar as conversas em `_whatsapp/`.
5. Só então escrever o `CONTEXTO-*.md`.

## 🔒 Credenciais

**Senha, token ou login de cliente não entra neste repositório** — nem em
transcrição, nem em documento, nem em exemplo. O repositório vive no GitHub.

Quando aparecer credencial numa fonte (é comum em grupo de WhatsApp), redigir
na hora e apontar para o documento de acessos no Drive. Se a credencial já
circulou em texto claro, vale avisar o cliente e trocar.
