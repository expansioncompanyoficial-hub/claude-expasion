# CLIENTES

Um diretório por cliente da Expansion. Cada pasta é o contexto completo daquela
conta — quem é, o que pode e o que não pode, como a conta roda de fato — para
que qualquer sessão do Claude Code entre já sabendo com quem está falando.

| Cliente | Nicho | Desde |
|---|---|---|
| [`ALBANOS/`](ALBANOS/) | Autismo e neurodesenvolvimento — ecossistema de 4 empresas | 27/05/2026 |

## Estrutura de uma pasta de cliente

```
CLIENTES/<CLIENTE>/
├── README.md                        Cartão de visita: o que é, por onde começar,
│                                    estado da conta
├── <CLIENTE>-CONTEXTO.md            Documento VIVO. Sem data no nome — é atualizado
│                                    no lugar. O que o cliente é, os produtos, as
│                                    regras editoriais, o fluxo, o mapa do Drive
├── <CLIENTE>-OPERACAO-AAAA-MM-DD.md Fotografia de um momento. Como a conta roda
│                                    de fato, com evidência datada e achados
└── _whatsapp/
    └── <CLIENTE>-WHATSAPP-<de>-a-<até>.md
```

Vale a convenção da raiz do repositório: **documento vivo não leva data;
fotografia de momento leva**. Rodada nova de análise vira arquivo novo, não
edição destrutiva do anterior — o histórico é o valor.

## Regras

**Credencial não entra neste repositório.** Nem em transcrição, nem em documento
de contexto, nem "só para não perder". Senha que aparecer em export de WhatsApp
é redigida antes do commit. O documento de contexto pode dizer *onde* a
credencial vive; nunca *qual* é.

**A transcrição é preservada, não resumida.** O resumo mora no documento de
operação, com a data e a citação. O bruto fica no `_whatsapp/` porque, seis meses
depois, a frase exata que o cliente usou é a evidência.

**Mídia não vem no export do WhatsApp.** Áudio, vídeo, imagem, figurinha e
documento saem como marcador. Toda leitura de transcrição declara isso — parte
relevante da conversa costuma ser visual.
