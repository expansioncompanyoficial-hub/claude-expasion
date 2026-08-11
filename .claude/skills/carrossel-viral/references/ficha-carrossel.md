# Ficha do carrossel — o registro que alimenta tudo depois

Toda peça gerada vira um arquivo em `CARROSSEIS/`. O nome segue
`{AAAA-MM-DD}-{CLIENTE}-{slug-curto}.md`.

O bloco YAML no topo é o que a máquina lê; o corpo é o que gente lê. Os dois importam:
o YAML vira linha no Supabase na Fase 2, o corpo é o que permite conferir uma peça
antiga sem abrir o HTML.

## Por que cada campo existe

Os campos não são inventário — cada um é uma **hipótese sobre o que faz um carrossel
performar**. Se um campo não pode explicar diferença de desempenho, não entra.

| Campo | A hipótese que ele testa |
|---|---|
| `modo` | Separa o que não pode ser comparado — viral, educativo e capa de notícia jogam jogos diferentes |
| `padrao_headline` | O padrão de hook muda o alcance |
| `gatilhos` | Combinações emocionais performam diferente |
| `tipo` | Tendência rende diferente de Case |
| `eixo` / `funil` | Cultura alcança mais que Produto |
| `n_slides` | Carrossel curto retém melhor que longo |
| `n_imagens` | Foto na capa muda a parada de scroll |
| `n_palavras_headline` | Headline longa cabe ou some no feed |
| `dia_semana` / `hora` | Janela de publicação |
| `calibracao` | Qual régua gerou essa peça — permite comparar antes/depois |

## Modelo

```markdown
---
id: 2026-08-11-PRIME-taxa-que-ninguem-explica
cliente: PRIME
nicho: credito-imobiliario
data_geracao: 2026-08-11
modo: topo                    # topo | meio | newsroom  — OBRIGATÓRIO
insumo_tipo: materia          # materia | ideia | transcricao | link | print
tipo: tese-contraintuitiva    # tendencia | tese-contraintuitiva | case | previsao
eixo: mercado                 # mercado | cases | noticias | cultura | produto
funil: topo                   # topo | meio | fundo
padrao_headline: dois-pontos  # morte-fim | geracional | investigando | referencia-pop
                              # | dois-pontos | contraste | pergunta | provocacao
gatilhos: [curiosidade, indignacao]
headline_capa: "O texto exato da capa"
n_palavras_headline: 16
n_slides: 9
n_imagens: 3
estilo_visual: moderno        # classico | moderno | minimalista | bold | outro
cta: "Comenta SIMULA"
calibracao: brandsdecoded-default   # ou: credito-imobiliario-v1
# --- preenchido na publicação ---
media_id: null
publicado_em: null
dia_semana: null
hora: null
---

## Headline escolhida

Opção N de 10.

## As outras 9

Mesmo que não tenham sido escolhidas, ficam registradas — a headline recusada é
metade do experimento. Sem ela não dá pra saber se a escolhida foi boa ou só a
menos ruim.

| # | Headline | Gatilho | Escolhida |
|---|---|---|---|

## Espinha dorsal

Hook · Mecanismo · Prova · Aplicação · Direção, em uma linha cada.

## Fontes usadas

As fontes verificáveis que sustentam os dados da peça. Se não houve dado, escrever
"sem dado factual" — nunca deixar em branco.

## Observações

O que foi ajustado a pedido do cliente, o que quase não passou na validação editorial,
qualquer coisa que explique a peça daqui a três meses.
```

## Regras

- **Uma ficha por carrossel gerado**, mesmo que ele nunca seja publicado. Peça recusada
  é dado: mostra o que o cliente rejeita.
- **`calibracao` nunca fica vazio.** Ou é `brandsdecoded-default`, ou é o nome do arquivo
  de calibração do nicho. É o que permite medir se a recalibração melhorou alguma coisa.
- **Não inventar valor de campo.** Se não dá pra classificar o padrão da headline com
  honestidade, escrever `outro` e explicar nas observações.
- **`media_id` é a chave de tudo.** Sem ele, a peça nunca encontra o próprio desempenho.
  Preencher assim que publicar.
