---
name: subir-campanha
description: Conduz a subida completa de uma campanha na Meta Ads a partir de um briefing — leitura, validacao, estrategia, copies, dry-run, criacao pausada, confirmacao, aprovacao e relatorio. Use quando o operador pedir para subir campanha, criar campanha, publicar anuncio, rodar trafego, ou passar um arquivo de briefing.
---

# Subir campanha

Roteiro obrigatorio. Cada passo tem um portao: nao avance sem cumprir.

Uso: `/subir-campanha briefs/nome-do-briefing.md`

Se nenhum arquivo for informado, pergunte qual briefing usar. Nao escolha por
conta propria e nao use o `campaign.example.md` como se fosse real.

---

## 1. Leitura do briefing

Leia o arquivo. Nao preencha nada que esteja faltando.

Portao: se algum campo obrigatorio estiver ausente, **pare aqui**, liste
exatamente o que falta e devolva para o operador.

## 2. Carregamento da cliente

Descubra o `cliente` do briefing e leia:

- `clients/<id>/config.json` — conta, Pagina, Instagram, pixel, WhatsApp, limites
- `clients/<id>/brand.md` — tom de voz e o que nunca dizer
- `clients/<id>/offers.md` — ofertas ativas e restricoes

Rode `meta_validate_access` e `meta_validate_client_assets`.

Portao: cliente inativa, cadastro de exemplo ou ativo faltando = pare.

## 3. Validacao

Rode nesta ordem:

1. `meta_validate_creative_files`
2. `meta_validate_destination`
3. `meta_validate_budget`

Portao: qualquer bloqueio = pare e relate.

## 4. Consulta dos ativos reais

`meta_list_pages`, `meta_list_instagram_accounts`, `meta_list_pixels_or_datasets`.

Confirme que o que esta no cadastro existe de verdade na conta. Divergencia
entre cadastro e realidade e problema — nao ajuste o cadastro por conta propria,
avise.

## 5. Estrategia

Com o briefing, a marca e as ofertas na mao, monte:

- qual modelo (`whatsapp_conversas`, `leads_formulario`, `vendas_site`)
- por que esse modelo serve ao objetivo comercial declarado
- estrutura: quantos conjuntos, quantos anuncios
- publico: idade, genero, geo, interesses
- o que voce vai observar nos primeiros dias

Apresente em texto curto. Nao invente numero de mercado nem benchmark.

## 6. Copies

Escreva as variacoes de copy. Uma por criativo, no minimo.

Regras:

- respeite `brand.md`: tom, o que nunca dizer, uso de emoji
- so afirme o que o briefing, `offers.md` ou `brand.md` sustentam
- titulo curto (ate ~40 caracteres funciona melhor no feed)
- nada de urgencia falsa, promessa de resultado ou superlativo vazio
- se o briefing tem `restricoes`, elas mandam

Escreva as copies na secao `## Copies` do arquivo de briefing, no formato:

```markdown
### copy-nome

- titulo: ...
- descricao: ...
- texto: ...
- criativo: arquivo.png
```

Depois rode `meta_validate_campaign_spec` para validar o conjunto inteiro.

## 7. Dry-run

Rode `npm run campaign:dry-run -- --brief <arquivo>`.

Apresente ao operador:

- resumo (cliente, conta, orcamento, periodo, publico)
- estrutura completa com status `PAUSED`
- copies finais
- chamadas que seriam feitas
- avisos e possiveis duplicidades

Portao: **espere confirmacao explicita do operador.** Nao siga porque o dry-run
passou. Dry-run passar so significa que o plano e valido, nao que foi aprovado.

## 8. Checagem de duplicidade

`meta_check_duplicate_campaign`.

Portao: se houver suspeita, pare e pergunte. Reexecucao de comando e a causa
mais comum — confirmar sem checar cria campanha duplicada gastando dinheiro.

## 9. Criacao pausada

`meta_create_campaign_paused` com o caminho do briefing.

A ferramenta faz a ordem oficial sozinha: campanha -> conjunto -> upload ->
criativo -> anuncio, tudo `PAUSED`.

Se falhar no meio: **nao apague nada e nao recrie do zero.** Relate a etapa que
falhou e rode a mesma ferramenta de novo — a retomada e automatica e reaproveita
o que ja existe.

## 10. Confirmacao na Meta

`meta_check_campaign_status`.

Portao: confirme que campanha, conjuntos e anuncios existem e estao `PAUSED`.
Divergencia de contagem = relate e pare. Nunca diga "criado" sem ter lido de
volta da Meta.

## 11. Solicitacao de aprovacao

`meta_request_campaign_approval`.

Apresente a previa completa com os IDs reais e diga ao operador:

```bash
npm run campaign:approve -- --campaign-id <id> --by "<nome de quem aprova>"
```

Portao: **voce nao aprova.** A aprovacao e um ato humano no terminal. Se o
operador pedir para voce "aprovar", explique que o codigo nao permite.

## 12. Ativacao

Somente depois de o operador devolver o codigo `APV-...`:

`meta_activate_approved_campaign` com `codigoAprovacao`.

O codigo e de uso unico. Se a campanha mudou depois da aprovacao, a ativacao e
recusada — e esta certo.

## 13. Relatorio final

Entregue:

- IDs na Meta (campanha, conjuntos, criativos, anuncios)
- estrutura final e status
- copies publicadas e com qual criativo cada uma foi
- orcamento aprovado e periodo
- o que acompanhar e quando (`npm run insights -- --client <id> --period today`)
- o que ainda depende de alguem

---

## Nunca

- Criar sem dry-run aprovado pelo operador.
- Ativar sem codigo de aprovacao valido.
- Usar conta diferente da cadastrada para a cliente.
- Inventar campo faltante, chave de segmentacao ou ID.
- Chamar a Graph API por fora do MCP.
- Imprimir token ou conteudo do `.env`.
