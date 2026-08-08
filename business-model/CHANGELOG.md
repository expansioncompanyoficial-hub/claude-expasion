# CHANGELOG

Convenção do acervo (`CLAUDE.md` da raiz): rodadas de análise viram **arquivos novos**, não edições destrutivas. Este log registra o que mudou e por quê.

---

## v1.0 — 2026-08-05 — GATE 0: Integridade dos dados

**Criado.** Estrutura `business-model/` completa: 11 documentos e 6 CSVs.

### Achados que mudam o entendimento da empresa

| # | Achado | Onde |
|---|---|---|
| 0 | 🚨 **Existe uma decisão de preço de 13/07/2026 que nunca foi executada.** O conselho fixou piso de R$ 5–6 mil/cliente, proibiu fechar abaixo de R$ 5 mil e mandou medir horas na Semana 1. Nada foi feito. A carteira está entre 26,7% e 60% do piso | `01` §4.5 |
| 0b | **A margem é a folha.** Ao pagar a equipe na faixa que o próprio conselho recomendou (R$ 2.600), a carteira inteira empata em −R$ 116,67/mês. 4 das 6 funções são pagas abaixo do piso júnior de mercado | `03` §7 |
| 0c | **Receita por cabeça: R$ 1.935,42** contra piso de R$ 12.000 do conselho — **16,1% de atingimento**. A recorrência atual sustenta 1,29 pessoas nesse padrão | `07` |
| 1 | **77,01% da folha não tem direcionador de custo** — 4 das 6 funções não têm capacidade declarada | `03` §2 |
| 2 | A contradição **R$ 6.850 × R$ 9.350 está resolvida por identidade aritmética**: os R$ 6.850 excluíam o gestor de tráfego e já usavam Social Media a R$ 1.700 | `03` §1.2 |
| 3 | **O editor principal opera a 168,9% da capacidade no cenário mais otimista possível**, e a 413,8% no estressado | `03` §4.1 |
| 4 | **Dr. Fred tem MC negativa só na edição**: −20,0% (dia útil) a −73,9% (dia corrido), consumindo 140–203% do gargalo por R$ 1.750/mês | `03` §5, ALERTA-01 |
| 5 | **Toda a carteira informada vence em agosto de 2026.** Perder Ciés + Albanos leva o resultado a **−R$ 3.200/mês** | `03` §5, ALERTA-04 |
| 6 | **Concentração de 51,67% em um único cliente** (Albanos), com data de vencimento desconhecida | `03` §6 |
| 7 | Os **R$ 250 mil / R$ 60 mil** não sobrevivem a teste aritmético como receita reconhecida — exigiriam 1 evento a cada 2,56 dias | `01` §4.1 |
| 8 | Os **"45% de margem" reconciliam com 46,52%** de MC parcial pós-folha PJ — não é margem líquida | `01` §4.2 |
| 9 | **Fator R ≈ 0%** por operar 100% com PJ pode empurrar a empresa ao Anexo V: **9,42 p.p.** de diferença de alíquota, ~R$ 1.458/mês | `01` §5.2 |
| 10 | **Clau Kids é cliente ativo em 3 fontes e não aparece em nenhuma tabela de receita** | `01` §4.4, PC1 |
| 11 | O designer só cabe na capacidade se **≥73,5% das publicações forem vídeo** — o mix decide se há 1 ou 2 gargalos | `03` §4.2 |
| 12 | **A estrutura de custo é quase inteiramente fixa** — logo capacidade importa mais que ponto de equilíbrio | `03` §1.3 |

### Decisões registradas
`D-001` a `D-005` em `DECISION-LOG.md`. Sete decisões em aberto (`A-001` a `A-007`), duas delas paradas há mais de 50 dias.

### Objeção formal registrada
`D-003` — a sequência de gates do Prompt-mestre foi contestada. Ver `01` §7.

### O que **não** foi feito, e por quê
- **Nenhum preço proposto.** Grau de confiança dos dados: 2,5/10. Regra do Prompt-mestre §7 GATE 0.
- **Nenhum custo de estrutura calculado.** 16 ferramentas identificadas, zero valores.
- **Nenhum TDABC real.** Nada foi cronometrado; os custos unitários são rateios de mensalidade.
- **Nenhum arquivo do acervo existente foi alterado ou apagado.** Todo o trabalho vive em `business-model/`.

### Fontes lidas
`EXPANSION-360`, `OPERACAO-REAL`, `AUDITORIA-DRIVE`, `transcricoes-audios-whatsapp`, `FICHA-MISSAO-M002`, `README`, `CLAUDE.md`, prompt-mestre. Varredura dirigida em `CONSELHO-EXPANSION-*`, `PLATAFORMA-WEBLUXURY-*`, `POSICIONAMENTO-CONTEUDO-*`, `POP-SOCIAL-MEDIA`, `AEOS/`.

### Fontes indisponíveis
Extrato bancário · contratos assinados · notas fiscais · faturas de ferramentas · apontamento de horas · custos do OTI PRO. Google Drive bloqueado por política de egress neste ambiente.

---

## Rodada 08/08/2026 — Manual de entrega

**Entregue:** `18-ENTREGAVEIS-DESTRINCHADOS.md` + versão visual publicada
(https://claude.ai/code/artifact/4f3e74f8-2915-4aa3-8d17-764675ee98b0).

Os 15 entregáveis dos três produtos, destrinchados um a um: o que é, o passo a
passo de execução, quem faz, quanto tempo leva e o que o cliente recebe.

### Fatos novos incorporados (fonte: Nicolas, operação própria)

| # | Fato | Efeito |
|---|---|---|
| 1 | **Ciés reativou a base e vendeu +R$ 5.000 em menos de um dia** | EX1 sai de hipótese para produto validado (`D-017`). Uma campanha cobre 97% da mensalidade pelo lucro de contribuição da lojista |
| 2 | **O contato no grupo de WhatsApp "demandava muito tempo" e não está em nenhuma hora precificada** | `ALERTA-05` — 30 min/dia derruba o EX3 de **31,3% para 23,5%** de lucro. Piso correto sobe de R$ 5.281 para R$ 6.635. Vira `A-027` |
| 3 | **O designer não será renovado**; trabalho migra para IA + Canva, com automação de carrossel em construção | `D-016`. Folha R$ 9.350 → R$ 8.700; EX3 → 37,2h e 32,6% de lucro. **Mas a grade de conteúdo perde dono** → `A-028` |
| 4 | **A operação tem 6 pessoas nomeadas** — Débora (social media), Matheus Felipe (tráfego), Daniel, Bernardo e Adryel (edição), designer (saindo) | Permite alocar cada entregável a uma pessoa com nome |
| 5 | **O que se vendia era 2 vídeos + 1 carrossel/semana + tráfego + grupo** | Confirma que o "360" antigo é o EX3 com o grupo dentro — e explica por que a margem nunca fechava |

### Decisões registradas
`D-016`, `D-017`. Três decisões novas em aberto: `A-027` (grupo no preço ou no
SLA), `A-028` (dono da grade), `A-029` (validar os tempos).

### O que **não** mudou
Nenhum preço foi aprovado. Todos seguem `NÃO APROVADO` por `D-001` e `A-006`.
Os tempos de 6h / 20h / 39h continuam `ESTIMADO` — `A-029` é o que os fecha.
