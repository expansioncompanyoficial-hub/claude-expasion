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
| D-006 | 2026-08-05 | **Lucro-alvo de 30%** | Nicolas | Regra do Alfredo Soares, validada contra os números da casa (`11` §9) | Teto de folha fixado em 31,42% (Anexo V) / 40,84% (Anexo III). Toda a escada de preço decorre disso | ✅ **DECIDIDO** |
| D-007 | 2026-08-05 | **Piso de R$ 5.000 para o P2 (Operação)** | Nicolas | Triangulação de 3 rotas — **e uma delas NÃO era independente** | Válido para lojas de R$ 140k+. **Não é piso universal:** é função do ratio, e o ratio é decisão de projeto | 🔶 **SOB CONTESTAÇÃO TÉCNICA** — ver `15` §3 e §4 |
| D-008 | 2026-08-05 | **Subir o ICP**, com duas faixas: R$ 25–50 mil e R$ 50 mil+ | Nicolas | Loja pequena não sustenta o preço | **A faixa inferior não tem produto que caiba nela a nenhum preço da tabela.** Corrigir para P0 em R$ 40–100k · P3 híbrido em R$ 60–150k · P2 em R$ 140k+ | 🔶 **SOB CONTESTAÇÃO** — ver `15` §2 e §3 |
| D-009 | 2026-08-05 | **Contratos de 6 ou 12 meses. Elimina o de 3 meses** | Nicolas | 3 meses não gera resultado; e é exatamente a janela onde ~43% do churn B2B acontece | Muda a estrutura de toda proposta | ✅ **DECIDIDO** |
| D-010 | 2026-08-05 | **Arquitetura de 3 produtos** (P1 Método · P2 Operação · P3 Performance) | Nicolas | Níveis de responsabilidade, não de volume | Substitui o preço único por escada | ✅ **DECIDIDO** |
| D-005 | 2026-08-05 | Adotar **21 dias úteis**, **4,333 semanas** e **30,44 dias corridos** por mês como base de conversão | Análise | Auditabilidade — qualquer pessoa reproduz | Toda demanda mensal deste acervo usa essas constantes | ✅ Vigente |

---

## Decisões **em aberto** que a análise não pode tomar

Registradas porque cada uma delas trava um gate. Nenhuma é técnica; todas são de autoridade.

| ID | Decisão pendente | Trava | Desde |
|---|---|---|---|
| A-001 | **Proposta Trinca (R$ 12.000, evento em 10/08)**: enviar, renegociar ou recusar sem custo calculado? | Risco econômico imediato | — |
| A-002 | ~~Vender ou não o CRM/atendimento?~~ **O DADO RESPONDE: VENDER.** 77,4% da base do varejo de moda está inativa · 60%+ da receita vem de recompra · 32% de conversão sobre quem responde · payback em 7–14 dias. Vira o produto **P0 Reativação** | GATE 4 | 13/07/2026 |
| A-003 | **WhatsApp oficial (cobra por conversa) × não-oficial (menos seguro)** | Precede qualquer produto de atendimento — é o único custo variável real identificado | 17/07/2026 |
| A-004 | ~~Clientes fora do nicho: caixa ou âncora?~~ **RESPONDIDA 05/08:** tese de cliente estratégico com sociedade futura no braço de marketing do grupo Albanos; moda entra em paralelo para validar o método. **Falta amarrar limite financeiro, prazo e critério de saída** — ver `07` | GATE 6 e 8 | 26/07/2026 |
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
| A-017 | ~~Quem opera o WhatsApp?~~ **RESPONDIDA 05/08:** ninguém hoje; exige contratar. Nicolas tem rede para social selling/SDR. **Restrição é caixa, não acesso** — financiada pela renegociação do Albanos (+R$ 7.000/mês) | GATE 4 | 05/08/2026 |
| A-018 | **Vender atendimento isolado, para quem não é cliente de conteúdo?** Mercado ~10× maior, motion de venda novo | GATE 4 | 05/08/2026 |
| A-019 | **Limite da tese de sociedade: RESPONDIDO 05/08** — 1 perfil cortesia = R$ 5.000/mês = R$ 60.000/ano. **Faltam prazo e critério de saída.** E a sociedade nunca foi conversada com a cliente — ver `09` §1.3 | GATE 6 e 8 | 05/08/2026 |
| A-021 | **Abrir a conversa de sociedade com o Albanos NA renovação**, em vez de subsidiar em silêncio. Risco zero, custo de uma conversa, testa a tese em 30 min em vez de 12 meses | **janela aberta agora** | 05/08/2026 |
| A-022 | **Contratar o operador do Eixo 2** (social selling/SDR), financiado pela renegociação do Albanos | GATE 4 | 05/08/2026 |
| A-020 | **Adotar o SLA de duas vias e o Placar Compartilhado** em todo contrato com tráfego | GATE 7 | 05/08/2026 |

| A-023 | **Criar o P0 — Reativação de base.** É o degrau que falta e o único que cabe onde a prospecção já está | GATE 4 | 05/08/2026 |
| A-024 | **Reestruturar o P3: fixo de R$ 3.000 + variável**, em vez de fixo de R$ 8.000. O variável deve derrubar o fixo, não somar a ele | GATE 5 | 05/08/2026 |
| A-025 | **Pedir DRE simplificada de 5–10 prospects** em call de diagnóstico. Resolve a maior lacuna de dado do setor e vira ativo comercial | GATE 1 | 05/08/2026 |
| A-026 | **Incluir "rua ou shopping" no roteiro de qualificação.** Ocupação de 8–12% na rua contra 15–22% em shopping move o teto de fee em ~50% | GATE 7 | 05/08/2026 |

> **A-002 e A-005 estão abertas há mais de 50 dias.** Não decidir também é uma decisão — e nos dois casos ela vem sendo tomada por omissão, no pior sentido: o CRM é entregue de graça e a social media segue sem número de capacidade.
