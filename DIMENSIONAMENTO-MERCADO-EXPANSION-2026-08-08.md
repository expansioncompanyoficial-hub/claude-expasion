# DIMENSIONAMENTO DE MERCADO — EXPANSION
## Quanto vale o nicho de moda feminina + infantil, e quanto dele cabe na Expansion

**Encomendado por:** Nicolas / Expansion
**Pergunta literal:** *"o mercado movimenta sessenta bilhões no ano. Como que eu calculo
qual é a fatia desse bolo que eu consigo pegar, e dessa fatia qual é a porcentagem que
eu tenho? Você me ensina isso também já fazendo."*

**Painel interativo:** https://claude.ai/code/artifact/3f2344e1-431e-47b1-b27c-d624abcfa9a2
Traz a calculadora de teto — mexa nos seis controles e veja o número mudar.

**Complementa:** `MERCADO-MODA-FEMININA-RADAR-2026-08-08.md` (tendências e calendário).

---

## 0. A RESPOSTA CURTA

| Pergunta | Resposta |
|---|---|
| Quanto o nicho movimenta em venda de roupa? | **R$ 181 bi/ano** (54% de R$ 336 bi) |
| Quanto disso pode virar receita sua? | **Zero.** Esse dinheiro é da lojista |
| Qual é o seu mercado de verdade? | **R$ 0,9 a 1,4 bi/ano**, centro em R$ 1,15 bi |
| Qual fatia você consegue pegar? | **0,04% hoje. 0,31% arrumando entrega e retenção. 0,78% no cenário máximo** |
| Quanto isso é em reais? | **R$ 40 mil/mês hoje · R$ 300 mil/mês no cenário 3 · R$ 750 mil/mês no 4** |
| O que limita? | **Não é o mercado. É capacidade de entrega e churn** |

---

## 1. O ERRO QUE A PERGUNTA CARREGA

A pergunta *"o mercado movimenta X, qual fatia eu pego?"* está errada, e vale entender
por quê antes de qualquer número.

O varejo de vestuário brasileiro movimentou **R$ 314,9 bilhões em 2025** (IEMI), com
6,4 bilhões de peças. Aplicando o seu recorte de 54%, o nicho de moda feminina adulta
mais infantil dá cerca de **R$ 181 bilhões**.

**Nenhum centavo desses R$ 181 bilhões está disponível para você.**

Esse dinheiro sai do bolso da consumidora e entra no caixa da lojista. Você não está
na cadeia dele. Calcular a sua fatia sobre esse número é o mesmo erro de um fornecedor
de sacola plástica calcular o próprio mercado sobre o faturamento dos supermercados.

O seu dinheiro sai de **outro caixa**: é despesa de marketing da lojista, não venda de
roupa. Um caixa muito menor, com regras próprias, e que só se calcula partindo de uma
unidade diferente.

> **A regra que resolve isso para sempre:
> comece sempre por quem assina o cheque para você, nunca pelo que o mercado movimenta.**
>
> Quem te paga é a dona da loja. Logo a sua unidade de conta é **loja**, não **peça de roupa**.

### Sobre os seus percentuais

Você citou 42% feminino adulto e 12% infantil, somando 53%. **A soma é 54%** — diferença
irrelevante para a conclusão, mas registro porque número em documento tem que fechar.

Não consegui confirmar o recorte em fonte pública: os relatórios do IEMI são pagos e o
domínio está bloqueado pela política de egress deste ambiente. O que é público e não
contradiz: produtos infantis representam cerca de **16% do setor têxtil**, e o Dia das
Crianças de 2025 movimentou **R$ 4,97 bi** em moda infantil.

**Mantive os seus 54%, e vale dizer que a resposta quase não depende disso.** Se o
recorte fosse 40% ou 70%, o seu teto continuaria sendo capacidade e churn. O tamanho do
mercado não é a variável que decide o seu faturamento — é a que menos decide.

---

## 2. CAMINHO 1 — DE CIMA PARA BAIXO

Cinco cortes. Cada um com fonte ou premissa declarada.

| # | Corte | Cálculo | Resultado |
|---|---|---|---|
| 1 | Varejo de vestuário Brasil | R$ 314,9 bi (2025) × 1,068 | **R$ 336,3 bi** |
| 2 | Seu recorte de nicho | × 54% | **R$ 181,6 bi** |
| 3 | Só loja independente | × 60% | **R$ 108,9 bi** |
| 4 | Vira gasto com marketing | × 2,5% | **R$ 2,72 bi** |
| 5 | Vira honorário, não verba de mídia | × 50% | **R$ 1,36 bi** |

**Premissas dos cortes 3 a 5** — são minhas, e estão aqui para poderem ser contestadas:

- **60% independente:** tira Renner, Riachuelo, C&A, Marisa, Zara, Pernambucanas, Shein
  e o volume de marketplace. Você não atende nenhuma dessas.
- **2,5% de gasto com marketing:** 56,1% das empresas brasileiras investem até 5% do
  faturamento em marketing digital; a recomendação de mercado é 3% a 5%. Usei abaixo do
  piso porque uma parcela grande da base gasta zero, e a média efetiva tem que refletir
  isso.
- **50% vira honorário:** a outra metade é verba que vai direto para a Meta. Em conta
  pequena o honorário domina (R$ 1.000 de verba para R$ 2.500–5.000 de fee), mas muita
  loja compra só o anúncio, sem serviço. Meio a meio é o meio-termo defensável.

**Do passo 1 ao passo 5 o número encolheu 247 vezes.** Essa distância é exatamente o
tamanho do erro que se comete começando pelos R$ 314,9 bi.

---

## 3. CAMINHO 2 — DE BAIXO PARA CIMA

Agora o contrário: conta negócios e multiplica pelo seu preço.

| # | Corte | Cálculo | Resultado |
|---|---|---|---|
| 1 | Lojas de vestuário com CNPJ ativo | CNAE 4781-4/00, jul/2026 | **1.013.880** |
| 2 | Feminino ou infantil | × 60% | **608.300** |
| 3 | Tem porte para pagar | × 10% | **60.830** |
| 4 | Contrataria assessoria | × 25% | **15.200** |
| 5 | × ticket anual | × R$ 5.000 × 12 | **R$ 912 mi** |

**Sobre o corte 3, que é o mais duro:** 84% dessas empresas são microempresa, e o teto
do MEI é **R$ 81 mil por ano** — R$ 6,75 mil por mês. Quem fatura isso não contrata
assessoria de R$ 5 mil mensais. A loja que cabe no seu funil fatura de R$ 50 mil para
cima por mês, e essa é uma minoria pequena da base.

**Sobre o ticket de R$ 5.000:** deduzido da sua própria meta — R$ 30 mil no mês com 6
clientes. Está dentro das faixas de mercado de 2026: social media para pequena empresa
roda em R$ 1.200–2.880/mês, gestão de tráfego para PME em R$ 2.500–6.000/mês sem verba.
Um pacote que junta conteúdo, tráfego e produção em R$ 5 mil é coerente.

### A conferência

- Top-down: **R$ 1,36 bi**
- Bottom-up: **R$ 0,91 bi**
- Diferença: **1,5×**

**Bateu.** A regra que uso: se os dois caminhos ficam a menos de 3× um do outro, o
modelo está de pé. Se a distância passa disso, tem premissa errada e não se decide nada
até achar qual. Trabalho com a faixa **R$ 0,9 a 1,4 bi/ano**, centro em **R$ 1,15 bi**.

### O que esse número revela sobre a concorrência

A Cerberus, que se declara o maior ecossistema de marketing para lojas de moda da
América Latina, tem 207 lojas. A R$ 3 mil de ticket médio, são **R$ 7,4 milhões por
ano — 0,6% do mercado.**

**Não existe líder neste mercado.** Existe R$ 1,15 bilhão pulverizado entre freelancers
e agências pequenas, onde o maior jogador conhecido tem menos de um centésimo. Ser "a
maior assessoria de moda do Brasil" não exige tomar mercado de ninguém. Exige existir
de forma organizada num espaço onde quase ninguém está organizado.

---

## 4. O TETO NÃO É O MERCADO. É A SUA CAPACIDADE.

Aqui o raciocínio de fatia de mercado para de funcionar, e é onde a maioria das
agências quebra a cara.

Uma fábrica de camiseta pode vender 10 mil peças ou 10 milhões — não faz diferença
estrutural. Assessoria não. **Cada cliente novo consome horas de gente.** O limite não
é quantas lojas existem no Brasil: é quantas você atende sem quebrar a entrega, e
quantas ficam depois de entrar.

São dois tetos, e **vale sempre o menor**:

```
TETO DE ENTREGA = profissionais de criação × clientes por profissional
TETO DE CHURN   = vendas novas por mês ÷ churn mensal

TETO REAL       = o MENOR dos dois
```

### O teto de churn é o que quase ninguém calcula

Ele diz que **uma carteira para de crescer sozinha.** A certa altura o número de
clientes que sai por mês iguala o número que entra, e a carteira congela. Não importa
quanto você venda depois disso.

Com 3 vendas por mês e 20% de churn: `3 ÷ 0,20 = 15 clientes`. Para sempre.

**Se você contratar três pessoas de criação, o teto continua 15.** Você terá pago três
salários para não crescer nada. É o erro mais caro que uma agência pequena comete, e
ele é puramente aritmético.

### O seu churn hoje

O `OPERACAO-REAL` registra **~17 perfis atendidos em 90 dias**, terminando com 6
ativos. Mesmo com premissas generosas, o churn implícito fica entre **15% e 30% ao
mês**. O benchmark de agências saudáveis é **abaixo de 5%** — acima de 6% já é sinal de
problema a tratar imediatamente.

Você não está um pouco acima do benchmark. Está de três a seis vezes acima.

---

## 5. QUATRO CENÁRIOS

Ticket de R$ 5.000 nos quatro. Muda só churn, vendas e time.

| Cenário | Churn | Vendas/mês | Criação | Teto | Receita/mês | Fatia |
|---|---|---|---|---|---|---|
| Hoje, nada muda | 20% | 3 | 1 | 8 | R$ 40 mil | 0,04% |
| Contrata sem arrumar o churn | 20% | 3 | 3 | **15** | R$ 75 mil | 0,08% |
| **Arruma entrega e retenção** | **6%** | **4** | **3** | **60** | **R$ 300 mil** | **0,31%** |
| "A maior do Brasil" | 4% | 6 | 7 | 150 | R$ 750 mil | 0,78% |

### A leitura que importa

**Linha 2.** Contratar dois profissionais sem mexer no churn leva o teto de 8 para 15 e
para. Cerca de R$ 10 mil de custo mensal a mais para ganhar R$ 35 mil de receita, com
margem pior e o mesmo problema de retenção.

**Linha 3.** Cair de 20% para 6% de churn, **sem vender um cliente a mais** que os
4/mês, multiplica a receita por 7,5. É a mesma empresa, com a entrega funcionando.

**Linha 4 esbarra no teto do Simples.** R$ 750 mil/mês são R$ 9 milhões/ano, quase o
dobro do limite de R$ 4,8 milhões. A partir de **R$ 400 mil/mês** você sai do Simples e
cai no IVA de 26,5%–28%, com clientes que — sendo 90,5% Simples — não creditam nada.
Está detalhado no radar de tendências. Aqui basta registrar: **o cenário 3 cabe no
Simples, o 4 não.**

---

## 6. CRONOGRAMA — 24 MESES NO CENÁRIO 3

Trajetória calculada por `n(t+1) = n(t) × (1 − churn) + vendas`, partindo de 6 clientes,
churn 6%, 4 vendas/mês. Contratações amarradas a **gatilho de carteira, não a data**:
contrata quando o número chega, nunca antes.

| Janela | Foco único | Gatilho de contratação | Carteira | Receita/mês |
|---|---|---|---|---|
| Mês 1–3 | Medir churn de verdade e escrever o POP de entrega | nenhuma | 6 → 16 | R$ 80 mil |
| Mês 4–6 | Relatório toda segunda, sem exceção | 2ª criação ao passar de 18 | 16 → 25 | R$ 125 mil |
| Mês 7–12 | Índice de Vazamento em toda a carteira; upsell de atendimento | 3ª criação ao passar de 40 | 25 → 38 | R$ 190 mil |
| Mês 13–18 | Painel do Nicho publicado; benchmark vira canal de entrada | 4ª criação ao passar de 60 | 38 → 47 | R$ 235 mil |
| Mês 19–24 | Modelar a saída do Simples antes de encostar em R$ 400 mil/mês | CS dedicado ao passar de 50 | 47 → 53 | R$ 265 mil |

### Por que a curva desacelera

Não é pessimismo, é a matemática do estado estacionário. Com o mesmo percentual de
churn, quanto maior a carteira mais gente sai em números absolutos: 6% de 50 clientes
são 3 saídas por mês; 6% de 10 são meia.

**A carteira freia sozinha à medida que cresce.** Só queda de churn ou aumento de
vendas empurram o teto para cima.

E uma consequência contraintuitiva: **churn menor dá teto maior, mas demora mais para
chegar lá.** O tempo para atingir 90% do estado estacionário é `ln(0,1) ÷ ln(1 − churn)`:

| Churn | Teto (4 vendas/mês) | Tempo até 90% do teto |
|---|---|---|
| 20% | 20 | 10 meses |
| 6% | 67 | 37 meses |
| 4% | 100 | 56 meses |

Chegar a 150 clientes com 4% de churn leva perto de cinco anos. **"A maior do Brasil" é
projeto de prazo longo, não de doze meses.** Quem te prometer isso em um ano está
vendendo curso.

---

## 7. O MÉTODO, PARA VOCÊ REPETIR SOZINHO

Sete passos. Serve para qualquer mercado, não só este.

### 1. Ache a unidade certa
Nunca comece por "quanto o mercado movimenta". Comece por **quem assina o cheque para
você**. Se é a dona da loja, a unidade é *loja*. Se fosse a consumidora, seria *pessoa*.
Errar aqui contamina todo o resto.

### 2. Conte as unidades e filtre em cascata
Do mais objetivo para o mais subjetivo: **segmento** (é do meu nicho?), **porte**
(consegue pagar?), **propensão** (compraria?). Cada filtro precisa de fonte ou premissa
escrita.
```
total × segmento × porte × propensão = clientes possíveis
```

### 3. Multiplique pelo seu preço, não pelo preço deles
Clientes possíveis × seu ticket anual = o bolo. Note que **é o seu preço que define o
tamanho do seu mercado**. Dobrar o ticket dobra o bolo — mas encolhe o filtro de porte,
porque menos lojas conseguem pagar. As duas coisas se movem juntas, sempre.

### 4. Faça o caminho contrário e confira
Refaça pelo topo. **Menos de 3× de diferença entre os dois, pode trabalhar.** Mais que
isso, tem premissa errada — ache antes de decidir qualquer coisa.

### 5. Pare de pensar em "fatia" e calcule capacidade
Em serviço, participação de mercado não é escolha estratégica: é consequência aritmética
de quanta gente você tem e de quanto tempo o cliente fica. **Fatia é resultado, nunca
meta.** Meta é número de clientes atendidos com qualidade.
```
teto = MENOR( profissionais × clientes por profissional , vendas ÷ churn )
```

### 6. Descubra qual dos dois tetos está te travando
Só um manda por vez, e **investir no que não está travando é dinheiro fora**. Teto de
churn menor: contratar não adianta, arrume a retenção. Teto de entrega menor: vender
mais não adianta, você só acelera o churn entregando mal.

### 7. Cheque se o cliente se paga
Teto alto não serve se cada cliente dá prejuízo. O LTV precisa ser ao menos **três
vezes** o custo de aquisição.
```
LTV = ticket × margem × (1 ÷ churn)
```
Com churn de 20% o cliente fica 5 meses e vale R$ 10 mil. Com 6%, fica 16,7 meses e vale
R$ 33 mil. **O mesmo cliente vale três vezes mais só por ficar mais tempo** — e é por
isso que retenção é a alavanca financeira mais barata que existe.

---

## 8. OS TRÊS NÚMEROS QUE FALTAM

Você mencionou que eu teria acesso à sua precificação. Não encontrei tabela de preços no
acervo — só os números agregados (R$ 250 mil em 3 meses, meta de R$ 30 mil em julho com
6 clientes, verba de R$ 1.000/mês na Ciés). Trabalhei com o que dava para deduzir.

| Dado que falta | Por que muda a conta | O que usei |
|---|---|---|
| **Tabela de preços real** | Define o ticket e, junto, o filtro de porte | R$ 5.000/mês, deduzido da meta |
| **Churn medido, não estimado** | Define o teto. Entre 20% e 6% a receita varia 7,5× | 20%/mês, inferido dos 17 nomes em 90 dias |
| **Custo real de entregar um cliente** | Sem ele não há margem, e teto sem margem não é lucro | 40% de margem de contribuição |

Com esses três, o modelo deixa de ser estimativa e vira orçamento. Os dois primeiros
você já tem, no extrato e no Organify. O terceiro pede uma hora com o Kauã.

---

## 9. FONTES

- Varejo de vestuário R$ 314,9 bi em 2025, 6,4 bi de peças, +6,8% nominal — IEMI, via
  https://www.jornaldebarueri.com.br/economia/326387-publicacao-aponta-dados-do-varejo-de-moda-infantil-em-2025/
  e https://www.terra.com.br/noticias/publicacao-aponta-dados-do-varejo-de-moda-infantil-em-2025,95fa55880953fe77a95da95114f550f06d80bywh.html
- Lojas com CNAE 4781-4/00 ativas em jul/2026 (1.013.880; 84% microempresa) —
  https://www.econodata.com.br/consulta-cnae/g4781400-comercio-varejista-de-artigos-do-vestuario-e-acessorios
- Moda infantil ~16% do setor têxtil; Dia das Crianças 2025 em R$ 4,97 bi —
  https://cafecominformacao.com.br/mercado-de-roupas-infantis-movimenta-r-50-bi-no-brasil/
  e https://centraldovarejo.com.br/varejo-de-moda-infantil-deve-ter-alta-de-6-7-com-dia-das-criancas/
- Investimento em marketing por porte (56,1% investem até 5%) —
  https://aintegrare.com.br/quanto-custa-marketing-digital
- Faixas de honorário: social media R$ 1.200–2.880/mês para pequena empresa; tráfego
  R$ 2.500–6.000/mês para PME sem verba —
  https://jamilefernandes.com.br/blog/quanto-cobrar-social-media
  e https://blog.wisedatamarketing.com/marketing-digital/custo-gestao-trafego-pago/
- Churn saudável abaixo de 5%/mês, acima de 6% é problema —
  https://namtab.io/blog/churn-rate-como-medir-interpretar-reduzir-em-agencias/
- Números internos: `OPERACAO-REAL-EXPANSION-2026-07-26.md` (seções 2, 11, A1) e
  `_audios/transcricao-360-expansion-2026-07-26-corrido.txt`
- Recorte de 42% feminino adulto e 12% infantil: fornecido pelo dono, origem IEMI.
  **Não verificado** — relatórios pagos e domínio `iemi.com.br` bloqueado pela política
  de egress deste ambiente.

---

*Documento produzido em 08/08/2026. Todas as premissas de corte estão explícitas nas
seções 2 e 3 justamente para poderem ser trocadas — troque uma e o modelo inteiro se
recalcula.*
