# CLIENTES

Um dossiê por cliente da Expansion. Cada pasta reúne **tudo que a Expansion sabe
sobre aquela conta**: quem é, o que foi combinado, quem são as pessoas, quais os
acessos, o que já aconteceu e o que está em risco.

A ideia é simples: abrir a pasta do cliente deve bastar para trabalhar nele — sem
depender de rolar o WhatsApp nem de caçar arquivo no Drive.

## Carteira

| Cliente | Nicho | Status | Dossiê |
|---|---|---|---|
| **CIÉS Brand** | Moda feminina — confecção própria | Ativo | [`CIES-BRAND/`](CIES-BRAND/) |

## Como montar o dossiê de um cliente novo

Cada pasta segue o mesmo esqueleto. Nem todo cliente terá todos os arquivos no
primeiro dia — o que importa é que, quando existirem, tenham estes nomes.

```
CLIENTES/NOME-DO-CLIENTE/
├── README.md                          índice do dossiê
├── XXX-DOSSIE.md                      documento VIVO: cadastro, pessoas, acessos,
│                                      produto, preço, metas, ritmo, resultados
├── XXX-ONBOARDING-AAAA-MM-DD.md       o que o cliente disse na call de onboarding
├── XXX-LINHA-DO-TEMPO-AAAA-MM-DD.md   cronologia factual, só fato e citação
├── XXX-PARECER-<tema>-AAAA-MM-DD.md   análise: gargalos, riscos, recomendações
├── XXX-MAPA-DRIVE.md                  documento VIVO: estrutura e IDs da pasta do Drive
└── _whatsapp/
    └── XXX-WHATSAPP-<inicio>-a-<fim>.txt   exportação do grupo
```

### Regras

- **Documento vivo não leva data no nome** (`DOSSIE`, `MAPA-DRIVE`). É atualizado
  no lugar.
- **Documento datado é imutável.** Rodada nova de análise vira arquivo novo
  (`-RODADA2`), nunca edição destrutiva do anterior. O histórico é o valor.
- **Separar fato de leitura.** Linha do tempo só carrega fato e citação com data.
  Interpretação, diagnóstico e recomendação moram no parecer.
- **Marcar o que não foi apurado.** Áudio e imagem não vêm na exportação do
  WhatsApp; toda conclusão apoiada num trecho ausente precisa estar sinalizada
  como inferência. Todo parecer termina com uma seção de lacunas.
- **Nunca versionar credencial.** Senha, código 2FA e token saem do arquivo antes
  do commit, substituídos por `[REMOVIDO NO ARQUIVAMENTO]`, e a troca da senha
  vira recomendação no parecer.

### Fluxo para abrir um cliente

1. Exportar o grupo do WhatsApp e colocar o `.txt` em `_whatsapp/` (com as
   credenciais removidas).
2. Ler a pasta do cliente no Drive e registrar a estrutura em `XXX-MAPA-DRIVE.md`.
3. Transcrever o doc de onboarding, se existir.
4. Montar a linha do tempo a partir da conversa.
5. Só então escrever o parecer — e o dossiê vivo por último, porque ele consolida
   o resto.
