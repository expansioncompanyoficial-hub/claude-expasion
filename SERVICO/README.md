# Serviço — render e aprovação

Fase 1 e fase 2 da arquitetura (`../ESTUDIO-ARQUITETURA-2026-08-11.md`), num
processo só: as duas precisam do mesmo Chromium, e subir dois containers para
isso é desperdício.

```bash
python3 SERVICO/app.py 8080
```

Sem dependência além do que o renderizador já usa. O `http.server` da biblioteca
padrão aguenta o volume desta operação com folga — trocar por um framework é
decisão de quando o volume justificar, não antes.

## Rotas

| | |
|---|---|
| `POST /pecas` | `{spec, titulo, cliente, legenda}` → renderiza e devolve `{id, slides, link_aprovacao}` |
| `GET /pecas/{id}` | estado da peça |
| `GET /pecas/{id}/png/{n}` | um slide |
| `GET /a/{token}` | portal do cliente |
| `POST /a/{token}` | `{decisao, comentario}` — `aprovado` ou `refazer` |
| `GET /saude` | ping |

## O portal

Moldura de Instagram com os slides deslizáveis, a legenda, e dois botões. O
"pedir alteração" abre um campo de comentário, e **o comentário volta pro agente
como insumo da próxima rodada** — é o que faz a segunda versão custar menos que a
primeira.

Fluxo, e a ordem não é negociável:

```
peça gerada → revisão interna → link pro cliente → aceite → publica → grava media_id
```

**O aceite do cliente é o que dispara a publicação. Nunca a geração.**

É a fase que resolve o problema que quase custou a Prime em 16/07 — ausência de
relatório — e o "não autorizei esse" de 24/07. Aprovação por WhatsApp não deixa
rastro; esta deixa quem aprovou e quando.

## Duas coisas que este serviço ainda não faz

**Não valida quem clicou.** O link tem token de 16 bytes e expira em 14 dias, o
que impede link adivinhado, mas não impede link repassado. O esquema já tem o
campo `documento` em `convites_aprovacao` para o segundo fator por CPF/CNPJ —
falta ligar. Para uso interno com cliente conhecido está de bom tamanho; antes de
virar produto, não está.

**Não publica.** Gravar o aceite e disparar o Make são coisas diferentes, e a
segunda é a fase 3. Hoje o aceite muda o status para `aprovado` e para por aí.

## Armazenamento

Disco, em `SERVICO/dados/`, uma pasta por peça. A troca por Supabase é
reimplementar a classe `Deposito` — o resto do serviço não sabe onde o dado mora.
O esquema já está escrito em `migracoes/001-inicial.sql`.

## Um Chromium para o processo inteiro

Subir um navegador por requisição custa cerca de um segundo cada e é o gargalo
óbvio. Aqui ele sobe uma vez e uma trava serializa o uso — suficiente para o
volume de uma agência, e evita a classe inteira de bug de concorrência do
Playwright.

## Deploy

`Dockerfile` pronto, sobre a imagem oficial do Playwright. Container pequeno em
Cloud Run, Railway ou Fly resolve: escala a zero e aceita Chromium, que é o que
Vercel serverless não faz bem.

**Cuidado que já custou tempo:** fonte vai embutida em base64 e os arquivos
`.woff2` entram na imagem, sempre em par `latin` + `latin-ext`. O `latin-ext`
sozinho não tem A-Z, e o PNG sai numa fonte de sistema sem erro nenhum no log.
