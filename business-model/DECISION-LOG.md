# DECISION-LOG

Toda decisão material: quem decidiu, quando, com que critério, e o que acontece em consequência.
Regra: **preferência não é fato.** Se não há dono, critério e consequência, não é decisão — é opinião.

| ID | Data | Decisão | Quem decide | Critério | Consequência | Status |
|---|---|---|---|---|---|---|
| **D-000** | **2026-07-13** | **Piso de R$ 5–6 mil por cliente novo, valendo "a partir de segunda-feira"; proibido fechar abaixo de R$ 5 mil por 6 meses; medir horas por cliente e receita por pessoa na Semana 1; renegociar a base na renovação com dado de horas na mão** | Conselho Expansion (6 cadeiras empresariais) | Ticket de R$ 2,5–3,5k não paga equipe competente; *"vendeu um serviço de R$ 6 mil por R$ 3 mil"* | Nenhuma. **Nada foi medido e a carteira inteira segue entre 26,7% e 60% do piso** | 🟡 **Causa esclarecida em 05/08:** Nicolas não lembra do parecer — estava em imersão. **Não foi rejeitado; nunca virou decisão consciente.** Reaberto para ratificação |
| D-001 | 2026-07-30 | Analisar custos **antes de impostos** nesta primeira etapa | Direção | Simplificar a primeira rodada | Toda visão de preço fica `ANTES DE IMPOSTOS` e **todo preço final fica `NÃO APROVADO`** até alíquota e regime serem validados | ✅ Vigente |
| D-002 | 2026-08-05 | **Nenhum preço final no GATE 0** | Análise (regra do Prompt-mestre §7) | Grau de confiança dos dados 2,5/10; 77,01% da folha sem denominador | Todos os produtos em `produtos-e-precos.csv` marcados `NÃO APROVADO` | ✅ Vigente |
| D-003 | 2026-08-05 | **Reordenar a sequência de gates**: 3 ações de 48h antes, depois GATE 1 e 2 **em paralelo** | Proposta da análise — **precisa de aceite da direção** | Toda a carteira vence em agosto; serializar GATE 1 e 2 custa 2 semanas que a empresa não tem | Se aceita, medição de tempo começa esta semana | ⏳ **Aguardando direção** |
| D-004 | 2026-08-05 | Tratar **R$ 1.700** como valor vigente da Social Media | Análise | Identidade aritmética exata: `9.350 − 2.500 = 6.850` e `1.700+650+1.500+500+2.500 = 6.850` | `CT1` resolvida; status de P01 sobe de `CONTRADITÓRIO` para `PROVISÓRIO` | ✅ Vigente, sujeita a confirmação |
| D-005 | 2026-08-05 | Adotar **21 dias úteis**, **4,333 semanas** e **30,44 dias corridos** por mês como base de conversão | Análise | Auditabilidade — qualquer pessoa reproduz | Toda demanda mensal deste acervo usa essas constantes | ✅ Vigente |

---

## Decisões **em aberto** que a análise não pode tomar

Registradas porque cada uma delas trava um gate. Nenhuma é técnica; todas são de autoridade.

| ID | Decisão pendente | Trava | Desde |
|---|---|---|---|
| A-001 | **Proposta Trinca (R$ 12.000, evento em 10/08)**: enviar, renegociar ou recusar sem custo calculado? | Risco econômico imediato | — |
| A-002 | **Vender ou não o produto de CRM/atendimento.** Enquete "VENDEMOS × OVERDELIVERY" do Kauã em 13/07/2026 teve **zero votos** e nunca foi decidida | GATE 4 (arquitetura de produtos) | 13/07/2026 |
| A-003 | **WhatsApp oficial (cobra por conversa) × não-oficial (menos seguro)** | Precede qualquer produto de atendimento — é o único custo variável real identificado | 17/07/2026 |
| A-004 | **Clientes fora do nicho de moda**: caixa que financia a transição ou âncora que impede o nicho? Hoje 4 dos 6 contratos são de outros nichos e Albanos sozinho é 51,67% da receita | GATE 4 e GATE 8 | 26/07/2026 |
| A-005 | **Escala da social media**: 50 clientes (tese do CEO) × 20–25 por profissional (proposto pelo gestor de tráfego em 09/06 e alinhado a benchmark) | GATE 2 e todo o modelo de capacidade | 09/06/2026 |
| A-006 | **Abrir CNPJ e definir regime.** Teto do MEI estourado; Fator R ≈ 0% empurra para o Anexo V (~15,58% × ~6,16%) | GATE 5 — nenhum preço final sem alíquota | 26/07/2026 |
| A-007 | **Pró-labore dos sócios.** Hoje R$ 0. Além de ser a remuneração deles, é a alavanca do Fator R | GATE 1 (visão econômica normalizada) e A-006 | — |
| A-008 | **Lucro-alvo: 30% (regra do Alfredo Soares) ou outro número?** Define o teto de folha e, com ele, o preço de tudo | GATE 5 | 05/08/2026 |
| A-009 | **Preço-alvo R$ 6.000/perfil com piso travado em R$ 5.000** — ponto onde conselho e Alfredo convergem | GATE 5 e 7 | 05/08/2026 |
| A-010 | **Houve desconto por antecipação (Ciés, Albanos)?** Se sim, é custo financeiro nunca contabilizado | GATE 1 | 05/08/2026 |
| A-011 | **Vender a camada de gestão** (cuidar dos fornecedores do cliente), além de serviço? | GATE 4 | 05/08/2026 |

| A-012 | **Migrar contratos para 12 meses na renovação.** Benchmark de mercado: 56 meses de duração média em fee recorrente; a Expansion opera com 1–3 meses. Vale mais que o preço | GATE 8 | 05/08/2026 |
| A-013 | **Arquitetura de 3 níveis** (Método / Operação / Performance) em vez de preço único | GATE 4 e 5 | 05/08/2026 |
| A-014 | **Piloto de remuneração variável em 1 cliente** (candidato: Ciés) sobre conversa atendida | GATE 5 | 05/08/2026 |
| A-015 | **Entrar ou não na operação de venda conversacional** — metade das vendas de moda no Brasil passa por WhatsApp e nenhuma agência opera esse canal | GATE 4 | 05/08/2026 |

| A-016 | **Albanos: renovação anual + estrutura ecossistema + lançamento destacado.** Reestruturar em vez de reajustar — pedir +150% no mesmo escopo perde o cliente | GATE 8 · **janela aberta agora** | 05/08/2026 |
| A-017 | **Quem opera o WhatsApp de um cliente?** Ninguém tem folga; o editor está a 168,9%. Sem resposta, o Eixo 2 é slide | GATE 4 | 05/08/2026 |
| A-018 | **Vender atendimento isolado, para quem não é cliente de conteúdo?** Mercado ~10× maior, motion de venda novo | GATE 4 | 05/08/2026 |

> **A-002 e A-005 estão abertas há mais de 50 dias.** Não decidir também é uma decisão — e nos dois casos ela vem sendo tomada por omissão, no pior sentido: o CRM é entregue de graça e a social media segue sem número de capacidade.
