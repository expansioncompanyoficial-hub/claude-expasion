# 02 — DICIONÁRIO DE DADOS

| | |
|---|---|
| **Versão** | 1.0 |
| **Data** | 2026-08-05 |
| **Responsável** | Análise · validação por Kauã Catini (CFO) |
| **Status** | `CONFIRMADO` como convenção — vale a partir de agora para todo o acervo |

> Existe porque o Prompt-mestre §2.2 proíbe usar "margem", "lucro", "custo" e "faturamento" sem período, base e fórmula. Enquanto duas pessoas na Expansion usarem "margem" com sentidos diferentes, nenhum número da empresa é discutível.

---

## 1. Receita — cinco coisas diferentes que hoje são chamadas de uma

| Termo | Definição | Exemplo na Expansion |
|---|---|---|
| **Receita contratada** *(booking)* | Valor de face do contrato, no ato da assinatura | Albanos: **R$ 24.000** |
| **Receita mensal por competência** | Receita contratada ÷ meses de vigência, reconhecida no mês em que o serviço é prestado | Albanos: **R$ 8.000/mês** |
| **Receita faturada** | O que foi emitido em nota no mês | `NÃO INFORMADO` — não há CNPJ |
| **Recebimento** *(caixa)* | Dinheiro que entrou na conta no mês | Ciés: **R$ 4.000 numa vez**, e R$ 0 nos dois meses seguintes |
| **Receita de repasse** *(pass-through)* | Dinheiro do cliente que transita pela empresa e não é dela | Verba de anúncio — Ciés, R$ 1.000/mês |

> **A regra que resolve o caso Ciés:** R$ 4.000 antecipados por 3 meses = **R$ 1.333,33/mês de competência** e **R$ 0 de caixa** no 2º e 3º mês. Em agosto, a Ciés é 100% custo e 0% entrada. Confundir os dois é o que faz uma empresa achar que teve um bom mês.
>
> **A regra que provavelmente explica os R$ 250 mil:** verba de mídia **não é receita**. Ver `01` §4.1, leitura (b).

**Receita líquida gerencial** = receita por competência − impostos sobre a receita − repasses. É a base de toda margem deste acervo.

---

## 2. Custo — quatro camadas que não podem se misturar

| Camada | Definição | Hoje na Expansion |
|---|---|---|
| **Custo variável direto** | Varia com o volume entregue | **Praticamente inexistente.** Só o WhatsApp oficial (por conversa) e deslocamento |
| **Custo direto fixo** | Ligado à entrega, mas não varia com volume | Os **R$ 9.350** de folha PJ |
| **Custo indireto / estrutura** | Existe independentemente do cliente | Ferramentas, escritório, equipamento — **todos `NÃO INFORMADO`** |
| **Custo econômico não desembolsado** | Trabalho ou ativo usado sem remuneração explícita | Tempo de Nicolas e Kauã — **R$ 0 de caixa, valor econômico alto** |

> **Consequência de a estrutura ser quase toda fixa:** o ponto de equilíbrio importa menos que a **capacidade**. Cliente novo é margem quase pura até estourar o gargalo; ao estourar, o custo sobe **em degrau**, não em rampa. Uma empresa assim não quebra por margem apertada — quebra por vender o que não consegue entregar.

**Custo-hora produtiva** — a fórmula do TDABC, ainda **não calculável** para nenhuma função:

```
horas_disponiveis_mes    = jornada realista − pausas − reuniões internas
                           − administração − treinamento − ausências previsíveis
horas_produtivas_praticas = horas_disponiveis_mes × taxa_de_capacidade_pratica
custo_hora_produtiva      = custo_mensal_da_função ÷ horas_produtivas_praticas
```

**Taxa de capacidade prática:** fração da jornada convertível em trabalho faturável. Referência de mercado para serviços criativos: **70–85%**. A Expansion **nunca mediu**. Usar 100% é o erro clássico que faz todo produto parecer lucrativo.

---

## 3. Margem — e a distinção que o Prompt-mestre exige duas vezes

| Termo | Fórmula | O que decide |
|---|---|---|
| **Margem de contribuição (R$)** | `receita líquida gerencial − custos e despesas variáveis atribuíveis` | Aceitar ou recusar um negócio no curto prazo |
| **Margem de contribuição (%)** | `MC R$ ÷ receita líquida gerencial` | Comparar produtos entre si |
| **Resultado operacional do cliente** | `receita − custo completo do cliente` | Manter, reenquadrar ou encerrar |
| **Margem operacional do cliente (%)** | `resultado operacional ÷ receita` | Classificar a carteira |
| **MC parcial pós-folha** ⚠️ | `(receita − folha PJ) ÷ receita` | **Nada.** É um número intermediário, útil só para diagnóstico |

> ⚠️ **A `MC parcial pós-folha` está no dicionário para ser reconhecida, não usada.** É quase certamente o que os "45% de margem" significam (`01` §4.2). Ela ignora ferramentas, estrutura, deslocamento, impostos, retrabalho e 100% do trabalho dos sócios. **Chamar isso de lucro é o erro que trouxe a empresa até aqui.**

### Margem × markup

```
markup = (preço − custo) ÷ custo
margem = (preço − custo) ÷ preço
```

Custo R$ 100, preço R$ 150 → **markup 50%**, **margem 33,3%**. Não são intercambiáveis, e a diferença cresce com o percentual.

**Conversão correta de custo em preço**, quando a intenção é margem sobre receita:

```
preco_alvo = custo_base_relevante ÷ [1 − (%impostos + %comissão + %meios_de_pagamento
                                          + %risco + %margem_operacional_alvo)]
```

Usar `custo × (1 + margem_desejada)` produz markup, **não** margem — e sempre subestima o preço.

---

## 4. Capacidade

| Termo | Definição |
|---|---|
| **Capacidade declarada** | O que a pessoa ou o contrato diz que entrega. Ex.: 30 vídeos/mês |
| **Capacidade produtiva prática** | Capacidade declarada × taxa de capacidade prática, descontado retrabalho |
| **Capacidade vendável** | Capacidade prática × (1 − buffer). **Nunca 100% de ocupação** |
| **Recurso gargalo** | A função com maior ocupação. Define o teto de vendas da empresa inteira |
| **Ocupação do gargalo** | `horas demandadas no gargalo ÷ horas produtivas práticas do gargalo` |
| **Receita por hora do gargalo** | O indicador que ordena produtos por atratividade real |

> **Buffer.** Vender 100% da capacidade é vender o mês perfeito. Referência para operação com urgência e retrabalho como a da Expansion: **buffer de 20–30%**. Ou seja, capacidade vendável ≈ 70–80% da prática.

---

## 5. Escopo e entregável

| Termo | Definição |
|---|---|
| **Unidade vendável** | Item mensurável, com nome, limite e custo. Ex.: "vídeo curto até 60s, 1 rodada de revisão" |
| **Entregável** | Conjunto de atividades que produz uma unidade vendável **pronta para o cliente** — inclui revisar, aprovar, publicar e reportar |
| **Escopo contratado** | O que está escrito |
| **Escopo real** | O que efetivamente é entregue. A diferença é **trabalho invisível** |
| **Excedente** | O que passa do contratado. Sem tabela de excedente, é doação |
| **Retrabalho** | Refazer o que já estava pronto. Custo real, hoje não medido |
| **Termo subjetivo** | "Gestão completa", "conteúdo ilimitado", "suporte". **Proibidos** em escopo — não têm custo calculável |

---

## 6. Preço — as quatro referências obrigatórias

| Referência | Definição | Quem aprova |
|---|---|---|
| **PISO DE CAIXA** | Cobre só as saídas incrementais. Ignora estrutura e sócios | Sócios, caso a caso, com validade |
| **PISO OPERACIONAL** | Cobre o custo completo. Sem lucro econômico adequado | Trava de sistema |
| **PREÇO-ALVO** | Cobre custo, risco, capacidade e margem desejada | Padrão do comercial |
| **PREÇO DE VALOR** | Considera impacto e disposição a pagar. **Nunca abaixo do piso** | Sócios |

> **Preço de concorrente não é prova de viabilidade.** Mercado define teto percebido; **custo, capacidade e risco definem o piso**. Um concorrente pode estar vendendo abaixo do custo dele — como a Expansion provavelmente esteve.

---

## 7. Status de dado

| Status | Significa | Pode virar preço? |
|---|---|---|
| `CONFIRMADO` | Documento ou evidência primária, com dono e data | Sim |
| `PROVISÓRIO` | Informado por alguém, ainda não verificado | Só com faixa e sensibilidade |
| `ESTIMADO` | Derivado ou inferido. Exige faixa, premissa e sensibilidade | Só em cenário, nunca em proposta |
| `CONTRADITÓRIO` | Duas fontes divergem. **Nunca usar sem resolver** | Não |
| `NÃO INFORMADO` | Não existe. **Nunca preencher com zero** | Não |

> **Zero e `NÃO INFORMADO` são coisas opostas.** Preencher lacuna com zero é o mecanismo exato pelo qual um contrato deficitário passa por lucrativo.

---

## 8. Convenção dos arquivos `data/*.csv`

- Separador `,` · codificação UTF-8 · números com **ponto** decimal e sem separador de milhar
- Valores em **BRL**, nominais, sem correção
- Texto com vírgula vai entre aspas duplas
- Colunas obrigatórias em toda tabela: `status`, `fonte`, `impacto_da_incerteza`, `proxima_acao`
- `NAO INFORMADO` (sem acento, caixa alta) é o literal de ausência
- **Nenhuma fórmula dentro do CSV.** Toda memória de cálculo vive no `.md` correspondente
