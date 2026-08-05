# 05 — ARQUITETURA DE PRODUTOS

| | |
|---|---|
| **Versão** | 0.1 — esqueleto |
| **Data** | 2026-08-05 |
| **Gate** | 🔒 **GATE 4** — bloqueado pelo GATE 3 |

---

## 🔒 O que destrava

`04-CATALOGO` concluído (custo e capacidade por entregável) + decisões `A-002` (vender CRM?) e `A-004` (clientes fora do nicho).

---

## O que já se sabe hoje

**Não existe produto na Expansion.** Existem seis escopos negociados um a um: seis clientes, seis combinações diferentes de gravação, publicação, vídeo e tráfego. Isso não é catálogo — é a ausência dele. E é a causa mecânica de `03` §2: sem produto padrão, não há volume padrão; sem volume padrão, não há custo unitário.

## Candidatos a produto — e a tensão que precisa ser resolvida antes

Inventário em `data/produtos-e-precos.csv` (X01–X07).

| Candidato | Ticket observado | Situação |
|---|---:|---|
| Operação de conteúdo recorrente | R$ 1.333 – 8.000/mês | Existe de fato, sem padrão |
| Gestão de tráfego | não separável | Em 4 de 6 contratos, **sem preço próprio** |
| Cobertura de evento | R$ 5.800 – 12.000 | Maior ticket, zero custo conhecido |
| Produção avulsa / add-ons | — | Não existe; excedente é doado |
| CRM / atendimento | R$ 0 | Especificado pelo CEO, tratado como "projeto" |
| Diagnóstico de entrada | — | Não existe; onboarding é custo não remunerado |
| Relatório / CS | R$ 0 | Passivo, não produto |

### A tensão de primeira ordem

| Evidência | Aponta para |
|---|---|
| Objetivo declarado: *"a maior assessoria de marketing para loja de roupa do Brasil"* | Recorrência de ticket baixo, alto volume, nicho fechado |
| OTI PRO: **R$ 5.800 financeiros em 2 dias**. Proposta Trinca: **R$ 12.000 em 1 dia** | Evento de ticket alto |
| Prime recorrente: **R$ 3.000/mês** | Um único evento vale **4 meses** de recorrência do mesmo cliente |

**Isto não se resolve com análise — é decisão de direção (`A-004`).** Mas duas coisas precisam estar na mesa quando ela for tomada:

1. O nicho de moda tem hoje **2 clientes** (`Ciés`, `Clau Kids`) contra 4 fora dele, e o maior cliente da casa — 51,67% da receita — é de **outro nicho**.
2. O playbook do concorrente estudado (Assessoria Alpha, `OPERACAO-REAL` §4) tem 6 elementos: nicho fechado, método nomeado, prova numérica, pele no jogo, SLA agressivo, franquia. **A Expansion não tem nenhum dos 6.**

## O que o `Product One-Page` vai exigir (GATE 4)

ICP e antiperfil · problema e resultado prometido · mecanismo de entrega · escopo base · **limites e exclusões** · cadência · responsabilidades das duas partes · dependências · SLA e aprovações · **capacidade consumida por função** · custo padrão e faixa · preço mínimo e alvo · margem esperada · add-ons · indicadores · critérios de renovação, upgrade, downgrade e encerramento.

> **Regra fixada agora:** um produto que não consegue declarar **quanto do gargalo consome** não é produto — é uma promessa. Foi assim que nasceram o Dr. Fred e o Jane.

## Duas exclusões de escopo obrigatórias no GATE 4

**Aprovação do cliente é dependência com SLA.** Débora, 08/07: *"tô esperando eles aprovarem a legenda pra poder soltar."* Sem prazo de aprovação no contrato, o gargalo vira o cliente e o custo fica com a Expansion.

**Cadência de criativo do tráfego é escopo, não cortesia.** A Meta exige criativo novo a cada 7–14 dias por conta (09/07). Isso é demanda **recorrente e obrigatória** sobre o mesmo editor que já está a 168,9%. Ou entra no escopo com quantidade, ou o tráfego degrada sozinho.
