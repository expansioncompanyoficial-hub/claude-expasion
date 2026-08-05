# 06 — MOTOR DE PRECIFICAÇÃO

| | |
|---|---|
| **Versão** | 0.1 — esqueleto e fórmulas |
| **Data** | 2026-08-05 |
| **Gate** | 🔒 **GATE 5** — bloqueado |
| **Preços aprovados** | **Nenhum** (`D-002`) |

---

## 🔒 O que destrava

GATE 3 (custo por entregável) + GATE 4 (produtos) + **`A-006`: regime tributário validado com o contador**. Sem alíquota efetiva, nenhum preço final pode ser aprovado — regra `D-001`.

---

## A fórmula, fixada desde já

```
preco_alvo = custo_base_relevante
           ÷ [1 − (%impostos + %comissão + %meios_de_pagamento + %risco + %margem_operacional_alvo)]
```

**Nunca** `custo × (1 + margem)`. Isso produz markup, não margem — e sempre subestima o preço. Ver `02` §3.

**Regra antidupla contagem:** um mesmo custo não pode aparecer como custo direto **e** dentro do rateio de estrutura **e** dentro do percentual de risco. Cada real entra uma vez só, e o documento diz onde.

### Exemplo com os números que já existem — e por que ele ainda não vale

Se o custo direto de um vídeo fosse R$ 50 e a alíquota efetiva fosse 15,58% (Anexo V estimado, `01` §5.2), para uma margem operacional-alvo de 25% e risco de 5%:

```
preco = 50 ÷ [1 − (0,1558 + 0,25 + 0,05)] = 50 ÷ 0,5442 = R$ 91,88
```

> **Este número é ilustrativo e não deve ser usado.** Os R$ 50 são rateio de mensalidade, não custo de tempo; não incluem roteiro, revisão, publicação, atendimento nem retrabalho; e a alíquota não foi validada. Está aqui só para mostrar a mecânica — e para deixar visível que **impostos e margem juntos quase dobram o preço em relação ao custo direto**. Quem precifica com "custo + 30%" não chega nem perto.

---

## A hipótese de trabalho já existe — e é uma decisão, não um chute

O conselho de 13/07/2026 fixou **R$ 5–6 mil por cliente novo** como piso, e proibiu fechar abaixo de R$ 5 mil por 6 meses (`CONSELHO-EXPANSION` §6 e §8.4).

Isso muda o enunciado do GATE 5. A pergunta **não** é *"qual deveria ser o preço?"* — é:

> **R$ 5.000 por perfil é suficiente? Provar ou revogar, com dado.**

Teste preliminar do piso, com o que já se sabe:

```
Receita a R$ 5.000 × 8 perfis                     = R$ 40.000,00 / mês
Folha a preço de mercado júnior recomendado
  (6 × R$ 2.600)                                  = R$ 15.600,00 / mês
                                                    ─────────────
MC antes de estrutura, impostos e sócios          = R$ 24.400,00   (61,0%)

Menos imposto estimado no Anexo V (15,58%)        = −R$  6.232,00
                                                    ─────────────
Disponível p/ estrutura, ferramentas, sócios      = R$ 18.168,00 / mês

Receita por cabeça (8 pessoas): 40.000 ÷ 8        = R$  5.000,00 / mês
Piso do conselho                                  = R$ 12.000,00 / mês  ← ainda 41,7%
```

> **Resultado preliminar que precisa ser dito:** o piso de R$ 5.000/perfil **viabiliza a folha a preço de mercado**, mas **não** atinge o próprio indicador de receita por cabeça que o mesmo conselho fixou. Os dois números do conselho são internamente inconsistentes com a estrutura de 8 pessoas para 8 perfis.
>
> Isso não invalida o piso — indica que **ou o piso é maior, ou a razão perfis-por-pessoa precisa subir**. É exatamente a pergunta de capacidade do GATE 2, e é onde a tese do CEO de escalar a social media e o benchmark de 20–25 contas por profissional voltam a importar. **`ESTIMATIVA` — não usar como preço.**

## As quatro referências obrigatórias por produto

| Referência | Cobre | Quem aprova |
|---|---|---|
| `PISO DE CAIXA` | só saídas incrementais | Sócios, caso a caso, com validade e justificativa |
| `PISO OPERACIONAL` | custo completo, sem lucro adequado | **Trava de sistema** — comercial não passa |
| `PREÇO-ALVO` | custo + risco + capacidade + margem | Padrão do comercial |
| `PREÇO DE VALOR` | impacto e disposição a pagar | Sócios, nunca abaixo do piso |

---

## Cenários e sensibilidade (GATE 5)

Três cenários — `CONSERVADOR`, `BASE`, `ESTRESSADO` — com sensibilidade obrigatória em: tempo de execução · volume de ajustes · ocupação e capacidade · custo de terceiros · atraso de aprovação do cliente · deslocamento · churn e contrato curto · imposto futuro · desconto e prazo de pagamento.

**Teste mínimo de sobrevivência de qualquer preço:**
- sobrevive se o tempo real for **20% maior**?
- sobrevive ao imposto efetivo **e** à comissão?
- sobrevive a **duas rodadas extras** de revisão?
- ele parece lucrativo só porque alguém está sub-remunerado ou porque um sócio trabalha de graça?

> O `ALERTA-01` (Dr. Fred) é o que acontece quando esses quatro testes não são feitos.

---

## Regras de preço a criar

Contrato mensal, trimestral, semestral e anual · setup/onboarding · escopo personalizado · **urgência** · captação extra · diária e meia diária · viagem, alimentação, hospedagem e quilometragem · edição/revisão extra · **cobertura noturna e fim de semana** · publicação em tempo real · direitos, brutos e armazenamento · pausa contratual · cancelamento e remarcação · inadimplência · **permuta** · indicação, comissão e parceiro comercial.

**Duas dessas já têm evidência de que estão custando dinheiro hoje:**

- **Permuta.** O OTI PRO teve R$ 500 em permuta tratados como parte do valor comercial. Permuta não paga PJ, não paga imposto e não entra no caixa. Precisa de regra própria e de limite percentual.
- **Urgência.** Não existe adicional. A operação inteira roda em urgência (mensagens às 01h34) e isso não aparece em nenhum preço.

---

## Margens por categoria — a decidir, não a arbitrar

O Prompt-mestre §7 GATE 5 proíbe aplicar uma margem única a tudo. Cada categoria precisa de justificativa econômica própria — recorrente com capacidade dedicada, evento com risco de execução concentrado, e avulso com custo de setup desproporcional não podem ter a mesma margem.
