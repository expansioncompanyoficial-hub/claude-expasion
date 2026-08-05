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

> **Resultado preliminar:** o piso de R$ 5.000/perfil **viabiliza a folha a preço de mercado**, mas **não** atinge o indicador de receita por cabeça que o mesmo conselho fixou. **`ESTIMATIVA` — não usar como preço.**

### Por que os dois números não fecham — e onde está a alavanca real

Os dois números do conselho **são consistentes entre si**. O que não fecha é a razão contas-por-pessoa da Expansion.

O modelo de célula do próprio conselho (`CONSELHO-ANEXOS` §1): **3,5 pessoas** (1 atendimento/CS + 1 social/roteirista + 1 editor + ½ tráfego) atendendo **9–10 clientes**.

```
Célula do conselho:  9,5 contas ÷ 3,5 pessoas   = 2,71 contas por cabeça
Expansion hoje:      8 perfis  ÷ 8 pessoas      = 1,00 conta por cabeça
                                                   ─────────────────────
Produtividade relativa                                        36,9%

Receita por cabeça na célula, a R$ 5.000/conta:
  9,5 × 5.000 ÷ 3,5                              = R$ 13.571  ✓ acima do piso
Receita por cabeça na célula, a R$ 3.000/conta:
  9,5 × 3.000 ÷ 3,5                              = R$  8.143  ✗ abaixo
```

> **A conta que decide tudo é esta:** `receita por cabeça = preço por conta × contas por cabeça`.
>
> A Expansion está errada nos **dois** fatores ao mesmo tempo — preço 61% abaixo do piso **e** ratio 63% abaixo do modelo. Não é um problema de precificação com um problema de operação ao lado. **É um produto multiplicado.** Subir só o preço, mantendo 1 conta por cabeça, exigiria R$ 12.000 por perfil para bater o indicador. Subir só o ratio, mantendo R$ 1.935, exigiria 6,2 contas por cabeça.
>
> **Consequência de projeto de produto:** o que faz o ratio subir não é vender mais — é **padronizar**. Escopo idêntico entre contas é o que permite a mesma pessoa carregar 3 em vez de 1. Por isso a arquitetura de produtos (GATE 4) precede a tabela de preços, e não o contrário.

---

## 🔥 PISO DE NEGOCIAÇÃO — evento Trinca/Clau, 10/08/2026

**Status em 05/08:** proposta de R$ 12.000 **não aprovada**; cliente pediu orçamento menor; **negociação aberta**; evento em 5 dias.

Não há custo levantado, então o que se entrega aqui é uma **regra de decisão**, não um preço. Ela funciona com um único número que só Nicolas tem: **quanto se paga de diária**.

### A regra

```
preço_mínimo = custo_direto_total ÷ [1 − (%imposto + %margem_alvo)]

com imposto estimado de 15,58% (Anexo V, a validar) e margem-alvo de 25%:
  divisor = 1 − 0,4058 = 0,5942
  preço_mínimo = custo_direto × 1,683
```

**Cobre 1,68 vez o custo direto. Abaixo disso, o evento consome caixa em vez de gerar.**

### A tabela — encontre sua linha

Custo direto = `8 diárias` + `pós-produção estimada em R$ 2.000` (15 vídeos × R$ 50 = R$ 750 · aftermovie documental ≈ R$ 800 · tratamento de 50+ fotos ≈ R$ 450).

| Diária média paga | Custo direto | **Piso — não descer daqui** | Preço-alvo (margem 35%) |
|---:|---:|---:|---:|
| R$ 250 | R$ 4.000 | **R$ 6.732** | R$ 8.094 |
| R$ 300 | R$ 4.400 | **R$ 7.405** | R$ 8.903 |
| R$ 400 | R$ 5.200 | **R$ 8.752** | R$ 10.522 |
| R$ 500 | R$ 6.000 | **R$ 10.098** | R$ 12.141 |

*Piso = custo ÷ 0,5942 (imposto 15,58% + margem 25%). Preço-alvo = custo ÷ 0,4942 (imposto 15,58% + margem 35%).*

`ESTIMATIVA` — a linha de pós-produção é derivada, não medida. Se o aftermovie documental passar de 16 h de edição, o piso sobe.

### Como conceder sem destruir a margem

O desconto pedido pelo cliente precisa vir com contrapartida (`08`). Em ordem de preferência:

| Concessão | Efeito no custo | Quanto libera |
|---|---|---|
| Reduzir de 8 para 6 profissionais | −2 diárias | R$ 500 a R$ 1.000 de custo |
| Cortar o aftermovie documental para aftermovie simples | −6 a 10 h de edição | ~R$ 500 |
| Reduzir de 50 para 30 fotos | −tratamento | ~R$ 180 |
| Entregar em 7 dias em vez de tempo real | tira o custo de cobertura ao vivo | a medir |
| **Baixar o preço mantendo o escopo** | **zero** | **proibido** |

> **A frase para a mesa:** *"Consigo chegar nesse valor — ajustando o time de 8 para 6 e o aftermovie para a versão simples. O que você prefere manter?"* Isso devolve a escolha ao cliente e preserva o piso. Desconto sem contrapartida cria precedente que se paga em todos os eventos seguintes.

**Referência de sanidade:** o OTI PRO entregou 2 dias, equipe, tempo real e **2** aftermovies por R$ 5.800 financeiros. A Trinca é 1 dia com 8 pessoas, 1 aftermovie documental, 50 fotos e 15 vídeos. Se a Trinca fechar abaixo de ~R$ 7.000, ela terá sido vendida mais barata que o OTI PRO por dia de operação — sem que ninguém saiba se o OTI PRO deu lucro.

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
