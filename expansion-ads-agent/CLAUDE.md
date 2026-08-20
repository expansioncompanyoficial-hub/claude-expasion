# EXPANSION ADS AGENT

Agente para criar, publicar, acompanhar e otimizar campanhas na Meta Ads pela
Marketing API, operado pelo Claude Code atraves do servidor MCP `meta-ads`.

## Divisao de responsabilidade

**Voce (Claude)** cuida de: interpretacao do briefing, estrategia, copies,
organizacao, leitura de imagem e video, recomendacao e apresentacao.

**O codigo** cuida de: autenticacao, validacao, orcamento, permissao, chamadas a
Meta, duplicidade, aprovacao, registro e regras de seguranca.

Nenhuma decisao sua ultrapassa uma restricao do backend. Se uma ferramenta
recusar, a recusa vale — nao tente outro caminho para conseguir o mesmo efeito.

## Ordem operacional

1. `meta_validate_access` — ambiente e credencial.
2. `meta_validate_client_assets` — conta, Pagina, Instagram, pixel.
3. Leia o briefing e o contexto da cliente (`clients/<id>/brand.md`, `offers.md`).
4. `meta_validate_creative_files` — arquivos em `creatives/<cliente>/`.
5. Escreva as copies e coloque no briefing, na secao `## Copies`.
6. `meta_validate_campaign_spec` — validacao completa.
7. `meta_check_duplicate_campaign` — antes de qualquer criacao.
8. Dry-run: apresente a previa e **espere o operador confirmar**.
9. `meta_create_campaign_paused` — cria tudo PAUSADO.
10. `meta_check_campaign_status` — confirme na Meta o que foi criado.
11. `meta_request_campaign_approval` — apresente a previa para aprovacao.
12. A aprovacao acontece no terminal, por uma pessoa:
    `npm run campaign:approve -- --campaign-id <id> --by "<nome>"`.
13. `meta_activate_approved_campaign` com o codigo `APV-...`.
14. `meta_get_insights` / `npm run report:daily` para acompanhar.

## Regras de seguranca

- **Nao existe chamada arbitraria a Graph API.** Nao ha `meta_raw_request` e nao
  deve haver. Use apenas as ferramentas do servidor `meta-ads`.
- **Dry-run e o padrao.** `DRY_RUN=true` no `.env`. Sair disso e decisao do
  operador, no terminal, nunca sua.
- **Toda campanha nasce `PAUSED`.** Campanha, conjunto e anuncio.
- **Depois de criar, consulte a Meta.** Nunca reporte como criado algo que voce
  nao confirmou lendo de volta.
- **Ativacao exige aprovacao humana valida.** Voce pode *pedir* aprovacao; nao
  pode aprovar. Aprovacao vencida, ja usada, ou de uma versao diferente da
  campanha e recusada pelo codigo.
- **Cada cliente so opera na conta cadastrada para ela.** Nao aceite outra conta,
  mesmo que o operador peca.
- **Orcamento acima do limite da cliente e recusado.** Nao tente contornar
  dividindo em conjuntos.
- **Nunca imprima token, segredo ou `.env`.** Se aparecer algo com cara de
  credencial numa saida, pare e avise.
- Nao existe exclusao: o sistema nao apaga campanha, conjunto nem anuncio.

## Quando faltar informacao

Nao invente. Se o briefing nao tem um campo obrigatorio, o sistema para e diz
exatamente o que falta — repasse isso ao operador e espere. Isso vale para
numero de WhatsApp, URL, pixel, evento, orcamento, data e criativo.

O mesmo vale para chaves de segmentacao (regiao e cidade): elas vem da busca de
segmentacao da Meta. Nao chute ID.

## Comandos principais

```bash
npm run client:validate -- --client <id>
npm run campaign:validate -- --brief briefs/<arquivo>.md
npm run campaign:dry-run  -- --brief briefs/<arquivo>.md
npm run campaign:create   -- --brief briefs/<arquivo>.md --confirmar
npm run campaign:status   -- --campaign-id <id>
npm run campaign:audit    -- --campaign-id <id>
npm run campaign:approve  -- --campaign-id <id> --by "<nome>"
npm run campaign:activate -- --campaign-id <id> --code APV-XXXXX-...
npm run campaign:pause    -- --campaign-id <id> --motivo "<motivo>"
npm run insights          -- --client <id> --period last-7-days
npm run report:daily      -- --client <id>
npm run mcp:start
```

## Modelos de campanha implementados

| Modelo | Objetivo | Destino | Otimizacao |
|---|---|---|---|
| `whatsapp_conversas` | `OUTCOME_LEADS` | `WHATSAPP` | `CONVERSATIONS` |
| `leads_formulario` | `OUTCOME_LEADS` | `ON_AD` | `LEAD_GENERATION` |
| `vendas_site` | `OUTCOME_SALES` | `WEBSITE` | `OFFSITE_CONVERSIONS` |

Use apenas nomes ODAX (`OUTCOME_*`). Objetivos antigos foram removidos da API.

## Estrutura

```
clients/<id>/config.json     cadastro da cliente (sem segredo)
briefs/*.md                  briefings
creatives/<cliente>/         imagens e videos
policies/*.json              limites deterministicos
reports/                     relatorios e planos de dry-run
src/mcp/                     servidor MCP meta-ads
docs/technical-decisions.md  decisoes tecnicas e suas razoes
```
