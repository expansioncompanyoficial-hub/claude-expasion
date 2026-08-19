# 360 COMERCIAL — EXPANSION
## Carteira, participação de mercado, segmentação de tráfego e o que resta de 2026

**Data:** 19/08/2026 · **133 dias até o fim do ano**
**Painel:** https://claude.ai/code/artifact/c0f119ca-90ad-4d5b-b88b-3e9116084674
**Base:** `DOSSIE-MERCADO-ECOSSISTEMA-EXPANSION-2026-08-08.md` + `business-model/` (branch `claude/new-session-nx502g`)

---

## ⚠️ CORREÇÃO DE DATA

Os documentos anteriores desta sessão foram escritos com data de **08/08**. **Hoje é 19/08.**

**Consequência prática:** a recomendação de "captar lista antes de 16/08, restam 8 dias"
**expirou**. A propaganda eleitoral na internet começou em 16/08 e vocês já estão dentro
do período de CPM inflado, que vai até **25/10 — daqui a 67 dias**. Todas as projeções
abaixo foram refeitas a partir de hoje.

---

## 1. QUANTOS CLIENTES E QUANTOS LEADS

### A carteira

| Indicador | Valor | Fonte |
|---|---|---|
| Clientes ativos | **6** | `EXPANSION-360` §5 |
| Perfis atendidos em 90 dias | ~17 (carteira girou, não encolheu) | `OPERACAO-REAL` §2 |
| **MRR recorrente normalizado** | **R$ 15.483,33/mês** (R$ 17.483,33 com Reino) | `business-model/01` H1 |
| Faixa de contrato | R$ 1.333 a R$ 3.000 | `business-model/01` §5 |
| Clientes de moda | **2** — Ciés e Clau Kids | `OPERACAO-REAL` §2 |

### Os leads

| Indicador | Valor | Fonte |
|---|---|---|
| **Leads no CRM em 07/07** | **4 — sendo 3 desqualificados** | `OPERACAO-REAL` §7 |
| Leads qualificados | **1** | idem |
| Estado do CRM | **pausado em 06/07 por não pagamento** | Kauã: *"pausa a campanha pq o CRM não está funcionando que não pagou ele"* |
| Canal de aquisição recorrente | **não existe** | `EXPANSION-360`: *"Não têm canal de aquisição que cai lead todo dia"* |

> **Não existe base de leads para reportar.** O que existe é uma carteira de seis contas
> trazidas por rede de relacionamento — todas abaixo do piso de R$ 5 mil que o próprio
> conselho fixou em 13/07 e que nunca foi aplicado.

### O que o comercial tem hoje

| Ativo | Estado | Consequência |
|---|---|---|
| Lista de prospecção | ❌ não existe | Prospecção depende de indicação |
| CRM operante | ❌ pausado por inadimplência | Lead que entra não é rastreado |
| Público semente para lookalike | ❌ não existe | Impossível rodar o público de melhor custo do Meta |
| Piso de preço travado | ❌ decidido, nunca aplicado | Carteira inteira abaixo de R$ 5 mil |
| **Produto validado com prova** | ✅ EX1 — R$ 5.000 em um dia na Ciés | **Existe o que vender. Falta a quem** |

---

## 2. QUE FATIA DO MERCADO VOCÊS TÊM

| Recorte | Expansion | Mercado | Participação |
|---|---|---|---|
| Lojas de moda atendidas | 2 | 6.480 no ICP | **0,031%** |
| Receita de moda por ano | ~R$ 36 mil | R$ 360 mi | **0,010%** |
| Carteira inteira vs. mercado de moda | R$ 186 mil/ano | R$ 360 mi | **0,052%** |
| **Meta: teto do Simples** | 144 clientes | 6.480 | **2,2%** |

**Como ler isso.** Três centésimos de um por cento não é fracasso — é ponto de partida.
Não há nada a defender, só a conquistar. E o maior concorrente conhecido tem ~0,6%.
**Um mercado onde o líder tem menos de um por cento não tem líder: tem uma vaga aberta.**

---

## 3. O QUE SEGMENTAR NO TRÁFEGO

### O princípio: não segmente por interesse. Suba a lista.

Segmentar por interesse "moda" traz **consumidora**, não lojista. E o público de melhor
custo do Meta — **lookalike de 1% sobre compradores reais, com CPL de 30% a 50% menor** —
exige uma lista-semente que hoje não existe.

**Mas ela é construível, e quase de graça.** A Receita Federal publica mensalmente a base
completa de CNPJ com: razão social, nome fantasia, CNAE, **porte**, endereço, cidade,
situação cadastral, capital social. **E porte é exatamente o filtro que define o ICP.**

### Os seis passos

**1. Extrair da base pública** — custo zero
```
CNAE 4781-4/00 · porte = EPP · situação = ativa   →  ~15.000 CNPJs
+ filtro de nome fantasia (feminino/infantil)     →  ~9.000 lojas
+ recorte por faixa de porte                      →  6.480 no ICP do EX1
```

**2. Enriquecer com telefone e e-mail.** O que a base pública **não** traz: e-mail,
telefone, site, nome do decisor, faturamento real. Plataformas: **Speedio, Econodata,
Data Stone, CNPJ Base, DeepLeads, LeadCNPJ**. Custo de centenas a poucos milhares pela
lista inteira — ordens de grandeza abaixo de descobrir as mesmas 6.500 no leilão do Meta.

**3. Subir como Custom Audience** no Meta, e gerar **Lookalike de 1%** a partir dela. É o
público de menor CPL disponível, porque a Meta procura comportamento de compra, não de
navegação.

**4. Camada geográfica sobre os polos:** Goiânia, Brás e Bom Retiro, Fortaleza, Blumenau
e Brusque, Caruaru e Toritama, Divinópolis, Cianorte, Nova Friburgo. Densidade de loja
real por km².

**5. Interesse só como reforço, e nunca "moda".** Use os que só o lojista tem: softwares
de gestão de loja, maquininhas, feiras do setor, fornecedores de atacado, marketplaces de
seller. **Quem segue fornecedor é lojista; quem segue moda é consumidora.**

**6. Qualificar no formulário, sempre.** Faturamento não é segmentável no gerenciador. A
pergunta no formulário é o único filtro de porte que funciona — e a skill
`detalhamento-mql`, já construída e parada, classifica o CSV do Meta por faixa e devolve o
produto certo por lead.

### O criativo por faixa

| Produto | A dor dela | O criativo | Prova |
|---|---|---|---|
| **EX1 · R$ 1.800**<br>loja R$ 40–100 mil/mês | "Tenho contatos e não faço nada com eles" | **O número parado.** *"Você tem 2.140 clientes. 1.630 não compram há mais de um ano. São R$ 8.300 de venda parada no seu celular."* | Ciés: R$ 5.000 em menos de um dia |
| **EX2 · R$ 3.500**<br>loja R$ 100 mil+/mês | "Perco venda de madrugada e no domingo" | **A comparação com a vendedora.** *"Uma vendedora custa R$ 3.260 a R$ 4.410 carregada e trabalha das 9h às 18h. A gente custa o mesmo e trabalha das 19h às 9h, domingo e feriado."* | Custo CLT verificável |
| **EX3 · R$ 5.500**<br>loja R$ 140 mil+/mês | "Meu Instagram não parece de marca" | **Antes e depois de grade.** Portfólio visual — é o único dos três em que o criativo bonito é o argumento | Perfis atendidos |

### O timing manda esperar — e usar a espera

Vocês estão dentro da janela eleitoral desde 16/08. Faltam 67 dias até o segundo turno.
Queimar verba em prospecção fria agora é pagar CPM de campanha política para achar
lojista.

**O certo é usar setembro e outubro para construir e enriquecer a lista — que custa quase
nada e não depende de leilão — e ligar a máquina em 26/10, com o público pronto e a Black
Friday a 32 dias.**

---

## 4. O QUE AINDA DÁ EM 2026

**133 dias restantes, dos quais ~50 servem para vender:** a janela útil é **26/10 a
15/12**. Setembro e outubro são de construção; depois de 15/12 não se fecha contrato B2B
no Brasil.

| Mês | Vendas de EX1 | Realista · MRR | Com a lista pronta · MRR |
|---|---|---|---|
| Agosto (hoje) | — | R$ 15.483 | R$ 15.483 |
| Setembro | 1 · 2 | R$ 17.283 | R$ 19.083 |
| Outubro | 1 · 2 | R$ 19.083 | R$ 22.683 |
| Novembro | 4 · 6 | R$ 26.283 | R$ 33.483 |
| **Dezembro** | 3 · 5 | **R$ 31.683** | **R$ 42.483** |
| **Faturado set–dez** | 9 · 15 | **R$ 94,3 mil** | **R$ 117,7 mil** |

| | Realista | Com a lista |
|---|---|---|
| **Saída de 2026 (MRR de dezembro)** | R$ 31,7 mil/mês — 2,0× o de hoje | **R$ 42,5 mil/mês — 2,7×** |
| Horas consumidas | 54 h/mês | **90 h/mês** — cabe folgado no time atual |

**A conclusão que importa.** Os dois cenários usam o mesmo time, o mesmo preço e verba
parecida. A diferença de **R$ 23 mil no período e R$ 10,8 mil de MRR na saída** vem
inteiramente de ter a lista pronta em 26/10.

**Capacidade não é o limite** — 15 EX1 são 90 horas/mês, que cabem no time de hoje.
**O limite é que houve 1 lead qualificado em julho.** Chegar a 15 vendas exige um funil
que hoje não existe como sistema.

---

## 5. O 360 DO MERCADO — FOLHA DE INTELIGÊNCIA

### Mercado do cliente
| Indicador | Valor | Fonte · data |
|---|---|---|
| Varejo de vestuário Brasil | R$ 314,9 bi | IEMI · 2025 |
| Peças vendidas na temporada | +0,65% | IEMI/ABIT · O-I 2026 |
| Faturamento da temporada | +4,2% | IEMI/ABIT · O-I 2026 |
| Ticket médio e-commerce moda | R$ 271 | 2026 |
| Devolução em moda online | 25–40% | 2026 |

### Universo de lojas
| Indicador | Valor | Fonte |
|---|---|---|
| CNAE 4781-4 ativas | 1.013.880 | Receita Federal · jul/26 |
| EPPs no varejo de vestuário | ~15.000 | Sebrae |
| Lojas fem+inf no ICP do EX1 | 6.480 | estimativa própria |
| Franquias de moda · faturamento | R$ 30,8 bi | ABF · 2025 |

### Consumidora
| Indicador | Valor | Fonte |
|---|---|---|
| Endividamento das famílias | 82% (recorde) | CNC · jul/26 |
| Inadimplentes | 29,8% | CNC · jul/26 |
| Renda liberada pela isenção do IR | R$ 26,2 bi | 2026 |
| Selic | 14% | 2026 |

### Canais
| Indicador | Valor | Fonte |
|---|---|---|
| TikTok Shop · crescimento em 12 meses | 102× | TikTok · mai/26 |
| Live commerce Brasil | R$ 7 bi | projeção 2026 |
| Conversão em live | 10–30% (vs. 1,5%) | 2026 |
| WhatsApp em vendas de marcas de moda | ~50% | 2026 |
| Shein · receita BR de lojistas nacionais | 55% | 2026 |

### Custo de operar
| Indicador | Valor | Quando |
|---|---|---|
| Aumento do Meta Ads no Brasil | +12,15% | desde 01/01/26 |
| CPM em pico eleitoral (ref. 2022) | 19× | R$ 5,03 → R$ 96,71 |
| Mensagem de serviço no WhatsApp | passa a ser paga | 01/10/26 |
| Queda de conversão após 5 min sem resposta | −80% | — |

### Mercado da Expansion
| Indicador | Valor |
|---|---|
| SAM · produtos EX no ICP | R$ 360 mi/ano |
| Participação atual | 0,031% |
| Maior concorrente conhecido | ~0,6% (Cerberus, 207 lojas) |
| Mercado de marketing digital BR | R$ 45 bi/ano, fragmentado |

### Custo de mão de obra (referência para o pitch do EX2)
| Indicador | Valor |
|---|---|
| Vendedora CLT carregada | R$ 3.260–4.410 |
| SDR | R$ 3.500–7.000 + R$ 300–500 de ferramentas |
| Plataforma de atendimento WhatsApp | R$ 99–500/mês |

### Risco
| Indicador | Valor |
|---|---|
| Multas da ANPD por WhatsApp | R$ 18 mi já aplicadas |
| Teto de sanção LGPD | 2% do faturamento · R$ 50 mi · suspensão da base |
| Varejo e marketing no radar da ANPD | 2026–2027 |

---

## 6. OS 67 DIAS ATÉ 25/10

| # | Ação | Custo | Quem | Vale |
|---|---|---|---|---|
| **1** | **Extrair a lista das ~15 mil EPPs do CNAE 4781 da base pública da Receita** | **R$ 0** | Matheus | a semente do lookalike |
| 2 | Enriquecer com telefone e e-mail em plataforma B2B | centenas a poucos milhares | Matheus | público personalizado pronto |
| 3 | Religar o CRM e travar cadastro de todo lead | mensalidade | Kauã | para de perder lead |
| 4 | Ligar a skill `detalhamento-mql` no roteamento por faixa | R$ 0 | Nicolas | produto certo por lead |
| 5 | Produzir os três criativos por faixa, com o número da Ciés como prova | tempo de edição | Débora + editores | pronto para 26/10 |
| 6 | Fechar a camada de LGPD do EX1 — contrato de operador, opt-in, API Oficial | 1 sessão jurídica | Nicolas | destrava escalar |
| **7** | **26/10 — ligar a máquina**, com público e criativo prontos e Black Friday a 32 dias | verba de mídia | Matheus | a janela do ano |

**Nenhuma das seis primeiras depende de verba de mídia, de contratação ou de aprovação de
cliente.** São executáveis dentro da casa, nos 67 dias em que o leilão está caro de
qualquer jeito.

---

## 7. O QUE É ESTIMATIVA

| Item | Ressalva |
|---|---|
| Quebra das 15 mil EPPs por faixa de faturamento | **Premissa mais frágil de todo o dimensionamento.** O Sebrae publica o total, não a distribuição interna |
| Filtro de nome fantasia para separar feminino/infantil | Heurística, não classificação oficial — **vai errar para os dois lados e precisa de amostragem manual antes de virar público de mídia** |
| Projeções de 2026 | Assumem churn de ~1 cliente/mês e **nenhuma venda de EX2 ou EX3** — deliberadamente conservador, porque o EX1 é o único que não depende de contratar ninguém |
| Receita de moda de ~R$ 36 mil/ano | Derivada dos contratos conhecidos de Ciés e Clau Kids; a Clau Kids não aparece em nenhuma tabela de receita (`business-model/01` PC1) |

---

*19/08/2026. Rodada seguinte é arquivo novo, conforme a convenção do acervo.*
