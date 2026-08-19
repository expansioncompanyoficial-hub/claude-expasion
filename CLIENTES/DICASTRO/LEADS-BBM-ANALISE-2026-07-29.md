# DiCastro / BBM — análise da base de leads

**Data:** 29/07/2026
**Fonte:** planilha de integração do formulário Meta — `Formulário BBM - DiCastro`
**Recorte:** 19/05 a 26/06/2026 · **115 leads reais** (1 lead de teste descartado)

> **Nota sobre dados pessoais.** Este repositório está **público**. Nomes e
> telefones dos leads **não** estão aqui — só a análise agregada. A lista
> nominal dos 47 leads qualificados está na planilha original do Drive e pode
> ser gerada a qualquer momento. Se o repositório for tornado privado, dá para
> versionar a lista nominal também.

---

## 1. O número que importa

| Camada | Leads | % da base |
|---|---:|---:|
| Base total do formulário | **115** | 100% |
| **MQL** — faturamento ≥ R$ 50 mil/mês | **64** | 55,7% |
| **ICP** — MQL **e** com disponibilidade para viajar | **47** | 40,9% |
| ICP que também é sócio ou C-level | 45 | 39,1% |
| ICP que **já opera** importação/exportação | 14 | 12,2% |
| Faturamento acima de R$ 500 mil/mês | 25 | 21,7% |
| **Acima de R$ 500 mil/mês E disponível** | **18** | 15,7% |

**Quase 41% da base era perfil de compra.** Para uma oferta de ticket
R$ 16.380 que exige oito dias fora do país, isso é uma taxa de qualificação
alta — não uma base fria.

Esses 47 leads nunca foram trabalhados. Ver
[`DIAGNOSTICO-DICASTRO-2026-07-29.md`](DIAGNOSTICO-DICASTRO-2026-07-29.md) §2.

---

## 2. Faturamento × disponibilidade

Linhas = faturamento declarado. Colunas = resposta sobre viajar.
**O bloco destacado é o ICP.**

| Faturamento | Sim, total | Provavelmente | Data difícil | Não | Total |
|---|---:|---:|---:|---:|---:|
| Até R$ 50 mil | 24 | 13 | 7 | 7 | 51 |
| **R$ 50–150 mil** | **9** | **8** | 2 | 1 | 20 |
| **R$ 150–500 mil** | **9** | **3** | 4 | 3 | 19 |
| **Acima de R$ 500 mil** | **7** | **11** | 5 | 2 | 25 |
| **Total** | 49 | 35 | 18 | 13 | 115 |

Duas leituras:

- **44% da base fatura menos de R$ 50 mil/mês** — abaixo do piso declarado. O
  criativo atrai gente fora do perfil em volume relevante. Dá para apertar a
  segmentação e baixar o custo por *lead qualificado* mesmo que o CPL bruto suba.
- **Quem fatura mais hesita mais na data.** Na faixa acima de R$ 500 mil, a
  resposta dominante é *"provavelmente sim, preciso confirmar a agenda"* (11 de
  25) — não *"sim, disponibilidade total"*. Empresário grande tem agenda travada
  com meses de antecedência. **Uma missão de 8 dias precisa ser anunciada com
  antecedência muito maior, e esse é um argumento comercial, não uma objeção.**

---

## 3. Setor — a pergunta está mal desenhada

| Setor | Leads | % |
|---|---:|---:|
| **Outro setor** | **66** | **57%** |
| Agronegócio | 22 | 19% |
| Vinhos, bebidas e alimentos | 12 | 10% |
| Máquinas e equipamentos industriais | 9 | 8% |
| Combustíveis minerais e energia | 6 | 5% |

**57% da base não se encaixou em nenhuma das opções oferecidas.** As opções do
formulário foram copiadas dos setores prioritários da missão (fertilizantes,
maquinário agrícola, vinhos, combustíveis, máquinas industriais) — que é o que
os **Bálcãs** têm para oferecer, não o que o **empresário brasileiro** faz.

Efeito prático: a resposta mais frequente da base é a menos informativa, e o
comercial perde o dado mais útil para preparar a agenda B2B de cada
participante.

**Correção para a próxima edição:** manter os setores prioritários como opções,
mas acrescentar as verticais reais que o anúncio atrai e trocar "outro setor"
por **campo aberto de texto**. Custa nada e transforma 66 respostas mudas em 66
briefings.

Entre os 64 MQLs, o agro e as máquinas industriais são o núcleo real —
`agronegócio` aparece 13 vezes e `máquinas e equipamentos industriais` 8, sendo
que 6 dessas 8 faturam acima de R$ 500 mil/mês. **Máquinas industriais é o
segmento com maior densidade de dinheiro na base inteira.**

---

## 4. Maturidade em comércio exterior

| Experiência | Leads | % |
|---|---:|---:|
| Nunca operei, só avaliando | 49 | 43% |
| Nunca operei, mas tenho plano concreto | 31 | 27% |
| Já fiz operações pontuais | 19 | 17% |
| Já importo/exporto com recorrência | 16 | 14% |

**70% da base nunca operou comércio exterior.** Isso não é um defeito da
campanha — é a confirmação de que o roteiro certo é o *"você não precisa
entender dos Bálcãs, eu entendo"*. O público não está comprando logística;
está comprando alguém que remove o desconhecimento.

Mas tem uma consequência comercial: **esse público precisa de mais toques até
comprar.** Vender uma missão de R$ 16 mil para quem nunca importou nada exige
nutrição — e nutrição é exatamente o que nunca existiu neste projeto.

Dos 47 ICPs, apenas **14 já operam** comex. Esses 14 são o segmento de conversão
mais rápida e deveriam ser a primeira fila de qualquer retomada.

---

## 5. Objetivo declarado

| Objetivo | Total | Entre os ICP |
|---|---:|---:|
| Expandir operação para a Europa de forma estruturada | 34 | 10 |
| Encontrar fornecedores/parceiros para **importar** | 31 | 12 |
| **Captar investidores estrangeiros** | 27 | **14** |
| Encontrar compradores para **exportar** | 23 | 11 |

**Entre os leads qualificados, "captar investidores estrangeiros" é o objetivo
número 1** — mas é o argumento menos desenvolvido nos ~30 roteiros produzidos,
que falam quase sempre de importação e exportação.

Há uma oferta inteira aí que nunca foi comunicada: o empresário brasileiro que
quer **dinheiro estrangeiro entrando no negócio dele**, e não mercadoria saindo.

---

## 6. Performance por criativo e plataforma

| Anúncio | Leads | ICP | Taxa de ICP |
|---|---:|---:|---:|
| ADS 01 | 7 | 1 | 14% |
| ADS 02 | 91 | 36 | 40% |
| **ADS 03** | **13** | **9** | **69%** |
| ADS 05 | 4 | 1 | 25% |

| Plataforma | Leads | ICP | Taxa de ICP |
|---|---:|---:|---:|
| Instagram | 98 | 38 | 39% |
| **Facebook** | **17** | **9** | **53%** |

Dois achados de mídia que estavam disponíveis desde junho e não foram usados:

- **ADS 03 qualifica 69% do que traz, contra 40% do ADS 02** — mas recebeu
  apenas 13 leads (11% do volume) enquanto o ADS 02 levou 91 (79%). O CBO
  otimizou para volume de lead, não para lead certo. Realocar verba para o ADS
  03 tinha potencial de subir a qualificação da base inteira sem gastar mais.
- **Facebook qualifica melhor que Instagram** (53% × 39%), com 15% do volume.
  Faz sentido para público empresário de faixa etária mais alta, e contraria a
  intuição de que a conta era "conta de Instagram".

Toda a captação rodou em **uma única campanha, um único conjunto** (`CONJ001 -
FORMS - BRASIL`) — sem teste de segmentação, sem separação geográfica, sem
público frio × quente.

---

## 7. Volume por semana

| Semana | Leads |
|---|---:|
| 18/05 | 14 |
| 25/05 | 33 |
| 01/06 | 28 |
| **08/06** | **4** |
| 15/06 | 11 |
| 22/06 | 25 |
| **29/06 em diante** | **0 no formulário** |

O buraco de 08/06 coincide com a instabilidade do Meta relatada pelo gestor em
12/06 — explicação plausível e informada na época.

A parada seca depois de 26/06 é outra coisa: os relatórios de tráfego de **29/06
(38 leads)** e **06/07 (38 leads)** seguem reportando volume que **não aparece
nesta planilha**. Ou a integração quebrou por volta de 26/06, ou esses leads
entraram por outro caminho.

**Isso precisa ser checado antes de qualquer retomada** — pode haver ~76 leads
adicionais em algum lugar que ninguém abriu. Somados aos 115, chegam aos "mais
de 145" que o próprio cliente contabilizou em 08/07.

---

## 8. Recomendações

### Sobre os leads que já existem

1. **Ligar para os 47 ICPs.** A missão de julho já aconteceu — a oferta agora é
   a próxima edição, e agora existe prova social real. Priorizar nesta ordem:
   os **14 que já operam comex**, depois os **18 que faturam acima de R$ 500
   mil**, depois o resto.
2. **Rastrear os ~76 leads de 29/06 e 06/07** que não estão na planilha.
3. **Não descartar os 18 "data difícil"** — a data que eles recusaram nunca foi
   a data real da viagem.

### Sobre a próxima campanha

4. **Corrigir a pergunta de setor** — campo aberto no lugar de "outro setor".
5. **Corrigir a pergunta de data** e revisá-la sempre que a data mudar.
6. **Redistribuir verba para o padrão do ADS 03** e testar Facebook com peso
   maior que 15%.
7. **Criar um funil para "captar investidores estrangeiros"** — é o objetivo
   número 1 entre os qualificados e não tem um único roteiro dedicado.
8. **Anunciar a data com 90 dias de antecedência.** O público de R$ 500 mil+
   não trava agenda de 8 dias em cima da hora, e a resposta dominante dele no
   formulário prova isso.
