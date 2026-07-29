# CLIENTES

Um contexto por cliente da Expansion. **Documento vivo.**

A ideia: cada cliente ganha um grupo de WhatsApp, uma pasta no Drive e uma sessão do
Claude. Esta pasta é onde tudo isso vira memória — para que qualquer sessão nova
comece sabendo quem é o cliente, o que ele quer, o que já foi prometido e o que está
travado.

## Clientes

| Cliente | Nicho | Entrada | Dossiê |
|---|---|---|---|
| **Jane Queiroz · JQL Seguros** | Seguros · plano de saúde empresarial | 24/07/2026 | [`JANE-JQL-SEGUROS/`](JANE-JQL-SEGUROS/DOSSIE-JANE-JQL-SEGUROS.md) |

## Estrutura de cada cliente

```
NOME-CLIENTE/
├── DOSSIE-NOME-CLIENTE.md          documento vivo — o contexto consolidado
├── BANCO-DE-CONTEUDO-NOME.md       documento vivo — pauta bruta para roteiro
├── ANEXOS-ONBOARDING-AAAA-MM-DD.md evidência crua: call + doc de onboarding
└── ANEXOS-WHATSAPP-AAAA-MM-DD.md   evidência crua: transcrição dos grupos
```

**Dossiê e banco de conteúdo são vivos** — atualiza no lugar, sem data no nome.
**Anexos são congelados** — levam a data e não se editam. Export novo de WhatsApp
vira arquivo novo, nunca sobrescreve o anterior. O histórico é o valor.

## Como montar um cliente novo

1. **Puxar as fontes** — call de onboarding (Fathom), pasta do Drive, export dos
   grupos de WhatsApp (privado *e* grupo).
2. **Ler tudo na íntegra.** Resumo automático de reunião perde o que importa: a call
   da Jane tinha, fora do resumo, o gatilho de cancelamento literal, os seis cases de
   concierge e a evidência de que o tráfego dela estava trazendo o público errado.
3. **Escrever o dossiê** na estrutura acima.
4. **Separar o banco de conteúdo** do dossiê — quem usa é a social media, toda semana.
5. **Registrar as pendências com dono e data.** É a seção que envelhece e é a que
   mais vale.

## Regras não negociáveis

🔐 **Credencial nunca entra no repositório.** Senha, token, chave de API ou login que
apareça em transcrição vira `[SENHA REMOVIDA]`, e o fato de ter vazado vira pendência
no dossiê. Acesso a rede social se pede por **convite no Meta Business Suite**, não
por login e senha.

🔒 **Cliente do cliente é dado de terceiro.** Nome, valor de sinistro e informação de
saúde só entram em conteúdo público com autorização escrita. Cada dossiê tem uma
seção "conteúdo sensível — não publicar"; ela existe para ser lida antes de roteirizar.

📌 **Fala da cliente vai entre aspas, com data.** O que ela disse não se parafraseia —
é o critério de aceite. Paráfrase é onde a essência se perde, e essência é exatamente
o que essas clientes estão comprando.
