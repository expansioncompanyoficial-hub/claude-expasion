# Estilo Menina — Anexos da Estratégia (Rodada 2)

Par de `ESTRATEGIA-ESTILO-MENINA-PARECER-2026-09-08.md`. Premissas, scripts
prontos, roteiro de live e briefings de criativo.

---

## A. Premissas da modelagem de funil

Todas as projeções usam a cadeia completa, sem pular etapa:

```
verba ÷ CPM × 1000 = impressões
       × CTR de LINK = cliques
       × 75% (clique→visita) = visitas reais
       × CVR (visita→compra) = pedidos
       × R$ 169,03 = faturamento
       ÷ verba = ROAS
```

**A etapa que quase toda projeção esquece:** 15–35% dos cliques pagos nunca
viram visita (carregamento da Tray em 4G no interior, toque acidental em Reels,
navegador in-app). Pular essa etapa sozinha infla o ROAS projetado em +33%.

**Métrica declarada:** CTR de **link** (cliques no link ÷ impressões), não CTR
(todos) — que costuma ser 2–3× maior e é o número usado para embelezar relatório.

| Público | CPM (pess/base/otim) | CTR link | CPC base | Custo/visita |
|---------|----------------------|----------|----------|--------------|
| Frio regional (DDD 14) | R$ 40 / 28 / 20 | 0,9% / 1,3% / 1,8% | R$ 2,15 | R$ 2,87 |
| Frio nacional | R$ 26 / 18 / 13 | 0,7% / 1,1% / 1,6% | R$ 1,64 | R$ 2,19 |
| Remarketing | R$ 70 / 45 / 32 | 1,6% / 2,5% / 3,5% | R$ 1,80 | R$ 2,40 |

**Por que o CPM regional é mais caro que o nacional:** com inventário local
limitado, o leilão compra as mesmas pessoas repetidas vezes. Prêmio de
segmentação estreita: +35% a +60% sobre o nacional equivalente.

**Por que CPM barato é armadilha:** o nacional tem o CPM mais baixo dos três e o
pior retorno final. Compra impressão de gente sem afinidade com a marca, sem
frete grátis regional e sem motoboy — o custo migra para a etapa de conversão.

**CVR visita→compra assumida:** 0,7% (base) para frio regional; 2,5% para
remarketing. Referência: mediana de e-commerce de moda no Brasil é 1,0–1,5%
somando todas as fontes; loja pequena com pixel frio no mês 1 opera entre 0,3% e
1,0%.

**Cenários correlacionados de propósito:** criativo fraco piora o CTR e piora o
ranking de qualidade do leilão ao mesmo tempo, encarecendo o CPM. Por isso não se
mistura CPM otimista com CTR pessimista.

**Sazonalidade embutida:** +10% a +15% de pressão de leilão em setembro/outubro;
+30% a +50% na 3ª e 4ª semanas de novembro (Black Friday em 27/11, sexta).

**Ticket:** R$ 169,03 (Bling, 213 pedidos em 12 meses). Preço médio da peça de
novidade: R$ 88,35 → **1,91 peças por pedido**. Atenção: esse fator só vale para
pedidos de ticket R$ 169; para mini-lançamentos de peças de R$ 59,90–89,90 usar
faturamento ÷ R$ 88,35, senão o consumo de prateleira é subestimado em até 45%.

**Atribuição — o erro anda nas duas direções.** O Bling registra 213 pedidos em
12 meses e a Tray 137: ~76 vendas (36%) o pixel nunca vê. Isso **subestima** o
impacto do anúncio em +10% a +30% (não os 36% cheios: a maior parte das vendas
manuais vem da base e do grupo, que já existiam antes de qualquer anúncio).
Mas a janela de 7 dias após clique **superestima**, creditando ao anúncio compras
que aconteceriam de qualquer forma — risco agudo aqui, com 20 VIP recorrentes e
40 clientes em janela de recompra. Método honesto de separar: **cupom por canal.**

## B. Restrições técnicas de plataforma

- **Público personalizado por lista:** 132 contatos → ~80–95 correspondências
  (taxa de match de 60–72% em lista pequena). Fica no limiar do mínimo exigido
  para veiculação. **Consequência: o remarketing de setembro não pode depender
  da lista.** Em conta nova, o recurso pode ainda levar semanas para liberar.
- **Lookalike:** a base é pequena demais para gerar semelhança forte. A fonte
  virá de pixel e engajamento do Instagram, não da lista.
- **Público de pixel:** a R$ 40/dia entram ~14 pessoas/dia no público de
  visitantes. Em 21 dias: ~235–300 pessoas. Abaixo do que a Meta recomenda para
  abrir um conjunto de remarketing dedicado — por isso a métrica de setembro no
  meio do funil é **crescimento de público, não venda**.
- **Fase de aprendizado:** nenhum conjunto sai dela otimizando por Compra nessa
  verba. A R$ 40/dia a verba semanal é R$ 280 → R$ 5,60 por compra para atingir
  50 conversões/semana → ROAS 30. Impossível. **Otimizar por evento
  intermediário**, confirmando o evento no gerenciador antes de subir.
- **Estrutura:** R$ 40/dia = 1 campanha, 1 conjunto. R$ 80/dia = 2 conjuntos.
  R$ 120/dia = 2 conjuntos (teto); um 3º só acima de ~R$ 200/dia. Fragmentar
  verba abaixo disso impede qualquer linha de aprender.
- **Live:** não há produto que injete audiência paga numa live do Instagram em
  tempo real; a documentação de "anúncio de vídeo ao vivo" da Meta é sobre live
  do **Facebook**. Confiança alta, mas é afirmação de ausência — **confirmar no
  gerenciador antes de dizer à cliente com essas palavras.**
- **WhatsApp como destino:** defensável apenas em campanha de recuperação para
  público quente e pequeno, com volume controlado. Nunca como destino padrão —
  é o trauma declarado dela (200–300 mensagens ingeríveis).

## C. Scripts de reativação — prontos para copiar

Regra geral: **nunca lista de transmissão com texto igual.** Toda mensagem
carrega nome, mês da última compra e peça comprada. Não é preciosismo: texto
idêntico em massa é o que o WhatsApp detecta como spam, e o número é o principal
ativo comercial dela.

### C.1 VIP recorrentes (18) — enviar em ÁUDIO de 20–30s, qua 09/09

> Oi [NOME], tudo bem?? É a Lu, da Estilo Menina 💛
>
> Tô te chamando antes de todo mundo porque chegaram as peças novas e você é uma
> das clientes que compra comigo desde [MÊS/ANO] — aí achei justo você ver
> primeiro, antes de subir no site.
>
> São pouquinhas peças de cada numeração, umas com três unidades só. Eu separei o
> [NUMERAÇÃO QUE ELA COMPROU] aqui pensando na sua menina.
>
> Quer que eu te mande as fotos? Se você gostar eu seguro pra você até amanhã,
> sem compromisso nenhum, viu 😊

**Oferta é acesso e reserva, nunca desconto** — é o segmento de melhor margem e
o que menos precisa de preço para decidir.

### C.2 Recompra 91–180 dias (29) — texto, qui 10 e sex 11/09

> Oi [NOME], tudo bem? É a Lu da Estilo Menina!
>
> Lembrei de você porque em [MÊS DA ÚLTIMA COMPRA] você levou [PEÇA] no
> [NUMERAÇÃO] aqui comigo — e nessa idade elas mudam de número numa velocidade,
> né 😅
>
> Chegaram peças novas essa semana, mas antes de te encher de foto eu queria te
> perguntar uma coisa: ela ainda tá no [NUMERAÇÃO] ou já subiu?
>
> Me fala que eu anoto aqui e te mando só o que tem no tamanho dela. Detesto
> mandar foto de coisa que não serve 🙈

**Sem oferta na primeira mensagem** — é uma pergunta de serviço. Este segmento já
ia comprar; abrir com desconto queima margem de graça.

### C.3 Cadastro sem compra (6 recentes) — ter 16/09

> Oi [NOME], tudo bem? Aqui é a Lu, da Estilo Menina.
>
> Vi que você se cadastrou lá no site e acabou não finalizando, e eu queria te
> perguntar de verdade: faltou alguma coisa? Foi o frete, a numeração ou a forma
> de pagamento?
>
> Pergunto porque se foi o frete, aqui em Marília e Vera Cruz eu mesma entrego de
> motoboy, sem custo nenhum. E se foi o preço, eu tenho peça a partir de
> R$ 59,90 que é a queridinha aqui.
>
> Pode falar sem cerimônia, viu? Não vou ficar te insistindo, é só pra eu
> entender e melhorar 😊

### C.4 Perdidas 180d+ (21) — 22 e 23/09

Tom de reencontro, não de campanha. Sem imagem na primeira mensagem. Oferta:
chamariz de R$ 59,90 + frete grátis regional ou motoboy. Premissa: a objeção de
quem sumiu há 6+ meses raramente é o produto — é preço, frete ou esquecimento.

### C.5 Regras anti-queima (não negociáveis)

1. Máximo **2 toques por pessoa/mês** (inicial + um follow-up). Sem resposta ao
   follow-up, a pessoa sai da fila até o mês seguinte.
2. Máximo **3 mensagens/semana no grupo VIP**, nunca mais de 1 por dia. O ritual
   atual (véspera → link 11h → redes 17h) já usa 2.
3. Máximo **2 e-mails/mês** para os 86 opt-in, nunca no mesmo dia de uma
   mensagem 1:1 para a mesma pessoa.
4. Máximo **20 mensagens iniciais por dia**.
5. Nunca adicionar ao grupo sem um "sim" escrito.
6. Nunca oferta para quem comprou nos últimos 15 dias.
7. **Nunca dar publicamente oferta melhor que a do grupo VIP** — destrói a única
   razão de o grupo existir.
8. Nunca urgência falsa. A escassez desta loja é real e verificável.

## D. Roteiro da live — quinta, 12h, 40 minutos

| Bloco | Tempo | O que acontece | Por quê |
|-------|-------|----------------|---------|
| 0 · Pré-live | −15 min | Story "entro em 15 minutos" + aviso no grupo VIP. Link fixado na bio. Carrinho de cada SKU testado. Peças na bancada **na ordem de entrada** | Sem teste de carrinho, um erro de checkout mata a live inteira |
| 1 · Abertura | 00:00–03:00 | Nome, cidade, e a oferta **inteira dita no minuto 1**: "mostro 4 peças, link no comentário fixado, quem fechar ao vivo leva o par de laço de brinde, cupom vale até 23h59" | Quem entra depois não volta para descobrir a oferta |
| 2 · Prova antes de vender | 03:00–06:00 | Mostra um pedido embalado do dia ou lê o print de uma cliente. Sem produto novo | Ela mesma diz que live "dá segurança para cliente nova" [32:27] |
| 3 · Peça 1 (a mais forte) | 06:00–13:00 | Veste no manequim, mede com fita, diz as numerações que **têm** e as que acabaram com número real, diz o preço, abre a tela do site | Peça sem preço dito em voz alta não conta como peça mostrada |
| 4 · Pausa de conversão | 13:00–15:00 | **Só** lendo comentários e respondendo numeração, chamando cada pessoa pelo nome | É o bloco que mais converte e o que quase todo mundo pula |
| 5 · Peças 2 e 3 | 15:00–27:00 | 6 min cada, mesma estrutura, com micro-pausa entre elas | Ritmo constante |
| 6 · Composição / combo | 27:00–32:00 | Monta 2 looks com as peças já mostradas. Desconto do combo incide sobre a **segunda** peça | É aqui que o ticket sobe |
| 7 · Repetição da oferta | 32:00–36:00 | Repete cupom, brinde, hora de expiração e as três réguas de prazo por região | Metade da audiência entrou depois do minuto 10 |
| 8 · Fechamento | 36:00–40:00 | "O que sobrou fica no site até 23h59." Agradece **nominalmente** quem comprou, lendo do painel da Tray. Avisa a próxima live | Agradecer por nome é a prova social mais barata que existe |

**Oferta sem empilhar desconto.** 10% do Pix + 10% da live = 19% composto, que
sobre um ticket de R$ 169 com margem bruta de ~50% derruba o lucro em 38%.
Proibido. A oferta é construída com valor percebido alto e custo marginal baixo:
brinde por decisão ao vivo (par de laço — SKU nº 1 do ano em unidades, custo de
atacado ~R$ 5, valor percebido ~R$ 19,90) + cupom de **valor fixo** criado na
Tray com travas de pedido mínimo, validade em horas, uso único e
não-cumulatividade. A Tray segura tudo sozinha; ela não controla nada à mão.

**Replay:** baixar a transmissão no mesmo dia. Sexta ela corta no CapCut em 3–5
trechos de 15–40s, nesta ordem de valor: (1) o momento de escassez real ("sobrou
um no 4 anos"); (2) o close do tecido/costura; (3) a montagem do combo; (4) a
resposta a uma dúvida de numeração.

**Metas da Live 1 (piloto, 01/10):** ≥ 40 espectadores, ≥ 3 pedidos.
**Live 2 (08/10, Dia das Crianças):** 50 / 95 / 170 espectadores → **2,5 / 7,6 /
18,7 pedidos** (taxas de 5% / 8% / 11%) = R$ 450 / R$ 1.368 / R$ 3.366.
*(Números corrigidos pela auditoria: a versão anterior publicava R$ 1.800 no
cenário-base, o que implicava conversão de 10,5% contra os 8% declarados.)*

## E. Briefings de criativo — os que viram anúncio

| ID | Gancho (3s) | O que aparece | Duração | CTA | Campanha |
|----|-------------|---------------|---------|-----|----------|
| A1 | "Chegou novidade que não está nem no site ainda…" | Malha canelada, manequim + close de tecido | 20s | "Link na bio" | Mini-lançamento 1 (12/09) |
| A2 | "Desse aqui só existem 3 por numeração." | Salopete, manequim, numerações ditas com número real | 25s | "Corre no site" | Mini-lançamento 2 (26/09) |
| A3 | "2 peças, 4 looks — conta aí quantos você montou 👀" | Conjunto Sofia, montagem das combinações | 30s | "Ver no site" | Aquisição regional |
| A4 | "Pediu de manhã, saiu pra entrega à tarde." | Pedido sendo embalado + motoboy saindo | 15s, cru | "Aqui na região é assim" | Remarketing / prova |
| A5 | "O presente que ela vai QUERER usar." | Mosaico das peças coloridas | 30s | "Dia das Crianças" | Campanha da data (30/09) |
| A6 | "Sobrou 1 no 4 anos." | Corte da live, escassez real | 15s | "Últimas unidades" | Pós-live |

Regras de anúncio: 9:16, produto na tela nos 3 primeiros segundos, legenda
grande (a maioria assiste sem som), sem música licenciada. Frete grátis regional
e motoboy ditos **dentro** do criativo — são os dois argumentos que só ela tem.

## F. Roteiro da conversa de repactuação (09/09)

Ordem importa. Não abrir pelo número.

1. **Abrir pelo que já foi feito** — "estudamos seus 12 meses no Bling, sua base
   inteira, cliente por cliente, e o seu site."
2. **Mostrar os números dela** — ticket R$ 169 (acima do que se imaginava), 57%
   da base na região, 79% de quem se cadastra no site compra, recorde de R$ 7 mil
   feito com campanha + vídeo dela.
3. **A descoberta que muda o plano** — "a gente contou a sua prateleira antes de
   pedir mais verba. Você tem ~31 peças de giro rápido. R$ 10 mil são 113 peças.
   Não falta anúncio: faltam peças."
4. **Só então a correção** — "por isso a gente errou para mais na conta do
   tráfego, e prefiro te dizer isso hoje, dia 8, do que dia 30."
5. **A meta recomposta** — R$ 4.500 a 5.500 em setembro, que é 50% a 83% acima da
   sua média histórica.
6. **A meta de R$ 10 mil não morreu, mudou de mês** — novembro, com aniversário
   de 1 ano do site + Black Friday + estoque reposto.
7. **O pedido** — pagar o fornecedor até 22/09. É a decisão que trava outubro.

**Objeções previsíveis:**
- *"Vocês estão voltando atrás?"* → "Estamos corrigindo antes de acontecer, e não
  depois. A meta de R$ 10 mil nunca foi de anúncio — e ela continua de pé, com
  data e mecanismo."
- *"Se o anúncio traz R$ 0,55 para cada R$ 1, por que gastar?"* → "Porque em
  setembro ele não é caixa, é construção: ele cria o público que em outubro custa
  R$ 96 por venda contra R$ 410 hoje. Seu caixa de setembro vem das suas
  clientes antigas, que não custam nada."
- *"E o que eu pago para vocês, então?"* → a lista do que a Expansion entrega e
  que não é clique: fila de mensagens pronta, cadastro na Tray, configuração de
  pixel, roteiro de live, playbook do grupo, leitura semanal com dado.

## G. Fontes

- Fathom, reunião de onboarding 03/09/2026 (159 falas) — minutagens no formato [MM:SS]
- Dashboard Bling 12 meses (print de 03/09)
- Export de contatos Bling (03/09) — 129 contatos reais
- Export de clientes Tray (04/09) — 132 clientes reais, com total de pedidos e última compra
- API da Meta (`ads_get_ad_accounts`, 08/09) — verificação do ID de portfólio
- Documento de anotações do Nicolas (Google Docs)
