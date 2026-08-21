#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Aplica a régua de destaque nas peças da Expansion.

    python3 marcar.py estado.json saida.json

Este arquivo é o **exemplo trabalhado** da régua: as nove peças da Expansion,
marcadas à mão, com a garantia de que nenhuma palavra mudou — só entraram
marcadores. O script recusa a gravar se qualquer linha tiver texto diferente
do que está no estado.

A régua, e ela vale para qualquer cliente:

  capa      · UM trecho, sempre. O sujeito da tensão — o que faz a frase
              valer. Nunca a frase inteira, nunca dois.
  headline  · 0 ou 1. A virada da frase: o dado quando existe, senão o trecho
              que muda a leitura.
  corpo     · 1, no máximo 2. Prioridade do NÚMERO, da DATA e do PRAZO — é o
              que a pessoa lembra depois de fechar o carrossel. Sem dado no
              parágrafo, o trecho que carrega a consequência.
  adjetivo  · nunca. `*76,48% no mercado nacional*` fica; `*muito mais caro*`
              não — é opinião pintada de cor, e a peça perde autoridade.
  repetição · o mesmo dado não se marca duas vezes no mesmo slide. Se a
              headline marcou `*12 DE MAIO*`, o corpo marca o outro fato.
  fonte     · nunca. "Fonte: CNC, 2026" é rodapé, não argumento.
  CTA       · título limpo e, no corpo, só a palavra de comando. O último
              slide inteiro em laranja não destaca o CTA de nada — realce só
              existe contra alguma coisa.
"""
import json
import pathlib
import sys

# Uma lista por peça, na ordem em que elas estão no cliente. `None` deixa a
# peça como está.
PECAS = [
 # ── 1 · As duas datas do 13º ───────────────────────────────────────────────
 [
  "texto 1 - COMO SUA LOJA COMPETE COM UMA BLUSINHA QUE CHEGA COM *OUTRA TRIBUTAÇÃO*?",
  "texto 2 - A CLIENTE COMPARA OS PREÇOS. SÓ QUE AS DUAS PEÇAS PAGAM CONTAS DIFERENTES.",
  "texto 3 - UMA REGRA MUDOU O PREÇO DO IMPORTADO EM *12 DE MAIO*",
  "texto 4 - Desde 12/05/2026, compras de até *US$ 50* no Remessa Conforme têm *alíquota federal de importação zerada*. O ICMS continua sendo cobrado, mas aquela cobrança federal deixou de entrar na conta. Fonte: Receita Federal, 2026.",
  "texto 5 - ESSA REGRA TEM *DATA PARA SER DECIDIDA*",
  "texto 6 - A *MP 1.357/2026* tem prazo de deliberação até *08/09*. A comissão já foi instalada e tem uma nova reunião marcada para 1º/09. Por isso, setembro pode trazer outra mudança na regra que chega ao preço das compras internacionais. Fonte: Congresso Nacional, 2026.",
  "texto 7 - A DIFERENÇA DE TRIBUTAÇÃO APARECE *ANTES DA CLIENTE ENTRAR NA LOJA*",
  "texto 8 - A CNC comparou os 22 produtos mais importados e calculou uma carga média de *76,48% no mercado nacional*, contra *25% nas plataformas do Remessa Conforme*. São 51,48 pontos de diferença dentro desse recorte. Fonte: CNC, agosto de 2026.",
  "texto 9 - NA TELA, A CLIENTE ENXERGA *O PREÇO FINAL*",
  "texto 10 - Ela encontra uma blusinha no aplicativo e outra na loja, compara os valores e decide a partir do que aparece na tela. Só que a etiqueta local carrega *uma estrutura de custos diferente*. Por isso, tentar acompanhar qualquer preço importado pode *apertar uma margem que já era curta*.",
  "texto 11 - A LOJA LOCAL TEM VANTAGENS QUE *O PACOTE NÃO CONSEGUE ENTREGAR*",
  "texto 12 - A cliente consegue *provar a peça no corpo*, conferir o tamanho, trocar com rapidez e *levar a compra no mesmo dia*. Por isso, a disputa melhora quando a loja transforma essas vantagens em motivo de compra, em vez de responder à comparação baixando a etiqueta.",
  "texto 13 - O CONTEÚDO PRECISA EXPLICAR POR QUE *A EXPERIÊNCIA LOCAL TEM VALOR*",
  "texto 14 - Um provador mostrando o caimento, uma vendedora orientando o tamanho e uma troca resolvida rapidamente *dão contexto ao preço*. Quando a comunicação mostra essas diferenças antes da objeção aparecer, a cliente consegue comparar *mais do que duas etiquetas*.",
  "texto 15 - O *DIA 8 DE SETEMBRO* PRECISA ESTAR NO CALENDÁRIO DA LOJA",
  "texto 16 - A regra atual ainda está em discussão, então a comunicação precisa acompanhar o que for decidido até *08/09*. Aí a loja consegue ajustar o discurso com o fato novo, mas continua vendendo aquilo que controla: *a peça, o atendimento, a curadoria e a experiência*.",
  "texto 17 - IMPOSTO MUDA. A MARGEM DA LOJA CONTINUA PRECISANDO FECHAR",
  "texto 18 - Uma mudança tributária pode alterar o preço do importado, mas não paga uma decisão ruim de desconto dentro da loja. Comenta **DIAGNÓSTICO** para olhar a conta e o posicionamento da sua operação. E, antes de mexer em preço por causa de imposto, leve isso pro seu contador.",
 ],
 # ── 2 · O leilão dos anúncios na eleição ───────────────────────────────────
 [
  "texto 1 - O DINHEIRO DA ELEIÇÃO ENTROU NO *MESMO LEILÃO* DOS ANÚNCIOS DA SUA LOJA",
  "texto 2 - O INSTAGRAM FICOU MAIS DISPUTADO JUSTO ANTES DOS MESES MAIS IMPORTANTES DO VAREJO.",
  "texto 3 - A PROPAGANDA ELEITORAL NA INTERNET COMEÇOU EM *16 DE AGOSTO*",
  "texto 4 - Desde 16/08/2026, a propaganda eleitoral pode circular na internet, enquanto o impulsionamento segue até *1º/10*. Nesse período, as campanhas entram *no mesmo ambiente de anúncios usado pelas lojas* para disputar a atenção das clientes. Fonte: TSE, agosto de 2026.",
  "texto 5 - O GOOGLE MANTEVE A PROPAGANDA POLÍTICA *FORA DOS SEUS ANÚNCIOS*",
  "texto 6 - O Google manteve a proibição para anúncios políticos no YouTube, na Busca e na Rede de Display. Por isso, o documento aponta *uma concentração da mídia eleitoral paga em Facebook e Instagram*. Fontes: Poder360 e CNN Brasil, agosto de 2026.",
  "texto 7 - ANTES DESSE LEILÃO ESQUENTAR, O ANÚNCIO *JÁ TINHA FICADO MAIS CARO*",
  "texto 8 - Desde janeiro, a Meta passou a repassar PIS/Cofins de 9,25% e ISS de 2,9% sobre o investimento. A soma representa *12,15% sobre o valor bruto*, então a loja entrou no período eleitoral com *um custo que já havia aumentado*. Fonte: comunicado da Meta, 2026.",
  "texto 9 - O GERENCIADOR PODE DAR A IMPRESSÃO DE QUE *O INSTAGRAM PAROU*",
  "texto 10 - Quando o custo aparece maior, a reação comum é culpar a plataforma e cortar a verba. Só que o resultado mistura *o preço do anúncio, a disputa pela atenção e a qualidade da campanha*. Cortar tudo no susto impede a loja de entender *qual desses pontos pesou*.",
  "texto 11 - UM CRIATIVO FORTE É *O DESCONTO DISPONÍVEL DENTRO DO LEILÃO*",
  "texto 12 - Um anúncio que chama atenção e gera mais cliques *aproveita melhor o mesmo investimento*. Por isso, em um período disputado, *melhorar a oferta e a mensagem pesa mais* do que continuar colocando dinheiro em uma campanha que a cliente ignora.",
  "texto 13 - A BASE NO WHATSAPP *DIMINUI A DEPENDÊNCIA DO LEILÃO*",
  "texto 14 - Uma cliente que já está no WhatsApp pode receber uma oferta *sem a loja precisar comprar novamente aquele alcance* no Instagram. Por isso, lista, grupo e contatos próprios ganham peso justamente quando *disputar uma pessoa nova fica mais caro*.",
  "texto 15 - ACOMPANHE *QUANTO CUSTA COLOCAR UMA CLIENTE NO WHATSAPP*",
  "texto 16 - O preço do alcance ajuda a entender o leilão, mas não mostra sozinho se o anúncio trouxe uma oportunidade de venda. Por isso, a régua mais útil para a loja é acompanhar *quanto foi investido para gerar cada nova conversa no WhatsApp*.",
  "texto 17 - A ELEIÇÃO EXPÕE QUEM DEPENDE DEMAIS DE ATENÇÃO ALUGADA",
  "texto 18 - O período eleitoral passa, mas uma base própria continua disponível para campanhas, reativação e recompra. Uma loja que constrói essa base fica menos presa ao preço do próximo leilão. Comenta **DIAGNÓSTICO** para analisar quanto a operação ainda depende de anúncio para vender.",
 ],
 # ── 3 · A venda esquecida no Direct ────────────────────────────────────────
 [
  "texto 1 - A VENDA MAIS BARATA DA SUA LOJA PODE ESTAR *ESQUECIDA NO DIRECT*",
  "texto 2 - ELA JÁ PERGUNTOU PELA PEÇA. O PROBLEMA COMEÇA QUANDO NINGUÉM VOLTA À CONVERSA.",
  "texto 3 - A CLIENTE JÁ DEU *O PRIMEIRO SINAL DE COMPRA*",
  "texto 4 - Quando a cliente pergunta o preço, o tamanho ou a disponibilidade, *ela já demonstrou interesse naquela peça*. Só que muitas conversas terminam assim que a primeira dúvida é respondida, e *ninguém registra o que aconteceu para retomar depois*.",
  "texto 5 - O PREÇO RESPONDIDO PODE VIRAR *O FIM DA CONVERSA*",
  "texto 6 - A cliente pergunta quanto custa, recebe apenas o valor e some. A resposta resolveu a dúvida, mas *deixou todo o próximo passo nas mãos dela*. Por isso, a conversa funciona melhor quando *termina com uma pergunta que ajuda a avançar a compra*.",
  "texto 7 - O ESQUECIMENTO É *O CONCORRENTE QUE QUASE NINGUÉM MEDE*",
  "texto 8 - Sem um registro, a conversa desce no Direct enquanto outras mensagens chegam. Aí a dona ou a vendedora *depende da própria memória* para lembrar quem perguntou, qual era a peça e onde a conversa parou. Na rotina do balcão, *muita intenção de compra desaparece assim*.",
  "texto 9 - *NOME, PEÇA E TAMANHO* CRIAM UMA LISTA DE RETOMADA",
  "texto 10 - Registrar o nome da cliente, a peça e o tamanho *transforma uma mensagem solta em uma oportunidade que pode ser retomada*. Quando essas informações ficam organizadas, a loja consegue *voltar à conversa com contexto*, em vez de mandar uma mensagem genérica dias depois.",
  "texto 11 - A RETOMADA COMEÇA *ANTES DE A CONVERSA SUMIR NO DIRECT*",
  "texto 12 - A orientação do Tema 09 é retomar *em 24 horas e novamente em 7 dias*. O intervalo cria duas oportunidades de voltar ao assunto, mas a mensagem precisa *partir da peça e da dúvida original* para continuar parecendo uma conversa de atendimento.",
  "texto 13 - TODA RESPOSTA PRECISA DEIXAR *A PRÓXIMA AÇÃO FÁCIL*",
  "texto 14 - Se a cliente perguntou por uma calça, a resposta pode confirmar a disponibilidade e *já perguntar o tamanho*. Quando a dúvida é resolvida e a próxima etapa fica clara, *a conversa anda sem depender de a cliente inventar sozinha o que perguntar depois*.",
  "texto 15 - *TRÊS RESPOSTAS PRONTAS* EVITAM QUE O BALCÃO ENGULA O DIRECT",
  "texto 16 - As três perguntas que mais chegam à loja podem ter *respostas preparadas pela equipe*. Aí a dona ou a vendedora não precisa improvisar entre um atendimento e outro no balcão, e *o atendimento mantém um padrão mesmo nos horários mais corridos*.",
  "texto 17 - O DIRECT TAMBÉM É UMA BASE DE CLIENTES EM CONSTRUÇÃO",
  "texto 18 - Cada conversa registrada deixa de depender da memória de quem estava no balcão. Quando nome, peça e tamanho ficam organizados, o Direct começa a alimentar futuras retomadas e campanhas. Comenta **DIAGNÓSTICO** para identificar onde as conversas da sua loja estão parando antes da compra.",
 ],
 # ── 4 · Setembro é o mês da sua loja ───────────────────────────────────────
 [
  "texto 1 - SETEMBRO É O MÊS DA SUA LOJA. *OUTUBRO PODE SER TARDE DEMAIS*",
  "texto 2 - SETEMBRO ABRE A JANELA. OUTUBRO CHEGA COM MAIS RUÍDO E DECISÃO ADIADA.",
  "texto 3 - O CALENDÁRIO DE OUTUBRO *JÁ COMEÇA CHEIO*",
  "texto 4 - O horário eleitoral vai de 28/08 a 1º/10. O primeiro turno é *04/10*, o Dia das Crianças cai em *12/10* e o segundo turno em 25/10. Por isso, a pauta trata outubro como um mês de atenção mais fragmentada. Fonte: TSE, calendário eleitoral 2026.",
  "texto 5 - SETEMBRO É A JANELA PARA *LANÇAR A COLEÇÃO*",
  "texto 6 - A pauta recomenda usar setembro para o lançamento de primavera/verão, porque é *o último mês antes do ruído concentrado de outubro*. Quando a coleção entra antes, a loja ganha tempo para apresentar as peças, trabalhar o desejo e *formar uma base interessada*.",
  "texto 7 - OUTUBRO PEDE *BASE, RECOMPRA E CLIENTE ANTIGA*",
  "texto 8 - Em outubro, o foco passa para *quem já conhece a loja*. Aí entram a recompra, a cliente antiga e os eventos pequenos, porque a operação depende menos de disputar uma atenção ampla e consegue *trabalhar uma relação que já começou*.",
  "texto 9 - MODA INFANTIL TEM UMA DATA *QUE NÃO PODE ESPERAR*",
  "texto 10 - Para as lojas com moda infantil, o Dia das Crianças cai em *12/10*, entre os dois domingos eleitorais do mês. Por isso, a campanha precisa estar no ar *antes de 04/10*, segundo a pauta. Fonte: TSE, calendário eleitoral 2026.",
  "texto 11 - A BLACK FRIDAY COMEÇA *NO CALENDÁRIO DE OUTUBRO*",
  "texto 12 - A Black Friday de 2026 cai em *27/11*. O documento recomenda usar outubro para preparar a campanha com calma, porque deixar as peças, a oferta, o atendimento e a divulgação para novembro *transforma uma data previsível em uma corrida de última hora*.",
  "texto 13 - O CALENDÁRIO PRECISA VIR *ANTES DO MOVIMENTO DA LOJA*",
  "texto 14 - Esperar a loja encher para decidir o que comunicar *deixa a operação reagindo ao mês*. Quando as datas já estão mapeadas, a equipe consegue *preparar a coleção, a oferta e o atendimento antes do pico*, em vez de improvisar depois que a cliente apareceu.",
  "texto 15 - SETEMBRO, OUTUBRO E NOVEMBRO PRECISAM TER *FUNÇÕES DIFERENTES*",
  "texto 16 - Setembro concentra o lançamento. Outubro trabalha a base e prepara novembro, enquanto a Black Friday chega em *27/11*. Por isso, o calendário comercial funciona melhor quando *cada mês recebe uma função específica*, em vez de repetir a mesma campanha esperando o movimento aparecer.",
  "texto 17 - O MOVIMENTO DA LOJA COMEÇA ANTES DA CLIENTE ENTRAR",
  "texto 18 - Uma loja que define o calendário só depois de sentir o movimento entrega a decisão para o acaso. Quando a campanha nasce antes da data, a equipe consegue construir o mês e medir quais janelas realmente trouxeram resposta. Comenta **DIAGNÓSTICO** para organizar o calendário comercial da loja.",
 ],
 # ── 5 · A nota fiscal rejeitada ────────────────────────────────────────────
 [
  "texto 1 - A NOTA FISCAL JÁ ESTÁ SENDO REJEITADA. *SUA LOJA ENTRA NESSA EM JANEIRO*",
  "texto 2 - A MUDANÇA COMEÇOU EM AGOSTO PARA AS GRANDES. O SIMPLES ENTRA SEM ENSAIO.",
  "texto 3 - DESDE *3 DE AGOSTO* A NOTA PODE SER REJEITADA NA HORA",
  "texto 4 - A partir de 03/08/2026, empresas do Lucro Real e do Lucro Presumido não conseguem emitir NF-e sem preencher *os campos de IBS e CBS*. O sistema da Receita *rejeita o documento automaticamente*. Fonte: Exame, agosto de 2026.",
  "texto 5 - O SIMPLES NACIONAL E O MEI FICARAM PARA *JANEIRO DE 2027*",
  "texto 6 - A obrigatoriedade para quem está no Simples e para o MEI foi adiada para janeiro de 2027. Então a maior parte das lojas de roupa ainda emite nota do jeito antigo, mas *a data já está marcada*. Fonte: Exame, agosto de 2026.",
  "texto 7 - ADIAR A OBRIGAÇÃO SIGNIFICA *ESTREAR SEM PERÍODO DE TESTE*",
  "texto 8 - As empresas do regime normal estão errando, corrigindo e ajustando sistema durante 2026. Quem entra só em 2027 *pula essa fase de aprendizado e começa valendo*. Por isso o adiamento *ajuda no curto prazo e cobra no longo*.",
  "texto 9 - EM 2026 AS ALÍQUOTAS SÃO *DE TESTE, NÃO DE COBRANÇA*",
  "texto 10 - Neste ano a CBS aparece a *0,9%* e o IBS a *0,1%*, e quem cumpre as obrigações acessórias pode ficar dispensado do recolhimento. O número é pequeno de propósito: serve para o sistema aprender, não para arrecadar. Fonte: Lei Complementar 214/2025.",
  "texto 11 - UMA NOTA TRAVADA É *UMA VENDA QUE NÃO SAI DA LOJA*",
  "texto 12 - Quando a nota não é emitida, a peça não sai, a cliente espera no balcão e *o dinheiro não entra no caixa naquele dia*. Por isso o problema aparece *primeiro na operação, e só depois na contabilidade*.",
  "texto 13 - O CADASTRO DE PRODUTO É *ONDE O ERRO NASCE*",
  "texto 14 - Cada peça precisa ter *o NCM correto e a classificação tributária ligada a ele*. Uma loja com grade grande costuma ter cadastro incompleto, e é ali que a nota trava. Aí o trabalho de arrumar *vem antes da data, não depois*.",
  "texto 15 - *TRÊS PERGUNTAS* PARA LEVAR AO CONTADOR AINDA ESTE ANO",
  "texto 16 - Vale perguntar se o sistema da loja já emite com os campos novos, se *o cadastro de produtos está com NCM revisado*, e o que muda no preço final quando a transição avançar. São perguntas curtas que *evitam uma correria em dezembro*.",
  "texto 17 - QUEM SE PREPARA EM 2026 NÃO PARA A LOJA EM 2027",
  "texto 18 - A mudança na nota é uma data conhecida, e data conhecida se planeja. Uma loja que revisa cadastro e sistema com antecedência não corre risco de travar o faturamento na virada. Comenta **DIAGNÓSTICO** para revisar o calendário da sua operação. E leve as decisões fiscais ao seu contador.",
 ],
 # ── 6 · O varejo subiu, a moda caiu ────────────────────────────────────────
 [
  "texto 1 - O VAREJO SUBIU 0,5% EM JUNHO. *MODA CAIU 2,6% NO MESMO MÊS*",
  "texto 2 - NÃO FOI IMPRESSÃO SUA. O IBGE MEDIU E O SETOR ANDOU PARA TRÁS.",
  "texto 3 - O DADO SAIU E MOSTRA QUE *O PROBLEMA NÃO É SÓ DA SUA LOJA*",
  "texto 4 - Na Pesquisa Mensal de Comércio de junho de 2026, tecidos, vestuário e calçados *recuaram 2,6% em relação a maio*. No mesmo mês, o varejo restrito *avançou 0,5%*. Fonte: IBGE, PMC junho de 2026.",
  "texto 5 - *DOIS VAREJOS DIFERENTES* APARECERAM NO MESMO MÊS",
  "texto 6 - O varejo restrito, que concentra o consumo do dia a dia, subiu 0,5%. O varejo ampliado, que depende mais de crédito, *caiu 1,0%*. A diferença de *1,5 ponto* mostra dois comportamentos convivendo no mesmo mercado. Fonte: IBGE, 2026.",
  "texto 7 - ROUPA DISPUTA COM O QUE A CLIENTE *PRECISA COMPRAR TODO MÊS*",
  "texto 8 - Quando o orçamento aperta, mercado, farmácia e conta de casa continuam. *A peça de roupa costuma ser a decisão que a cliente consegue adiar*. Por isso o setor *sente antes e sente mais*.",
  "texto 9 - UM MÊS RUIM *NÃO É UM DIAGNÓSTICO*",
  "texto 10 - A PMC mede uma variação mensal, e mês fraco acontece em qualquer setor. O dado serve para *separar o que é movimento de mercado do que é problema da operação*, e não para justificar tudo.",
  "texto 11 - SE O SETOR CAIU E A SUA LOJA CAIU MAIS, *A CONTA É OUTRA*",
  "texto 12 - Vale comparar o seu mês com *o mesmo mês do ano passado* e com a variação do setor. Quando a queda da loja é maior que a do mercado, *o problema tem endereço interno* e pode ser trabalhado.",
  "texto 13 - EM MÊS FRACO, A CLIENTE QUE JÁ COMPROU *FICA MAIS BARATA*",
  "texto 14 - Disputar uma cliente nova custa mais quando o setor está retraído. Já quem comprou uma vez *conhece a peça, o atendimento e o tamanho*. Por isso a base própria *pesa mais justamente nos meses de queda*.",
  "texto 15 - MEDIR *TRÊS NÚMEROS SIMPLES* JÁ MUDA A CONVERSA",
  "texto 16 - *Quantas pessoas entraram, quantas compraram e qual foi o ticket médio*. Com esses três números a loja consegue enxergar *se faltou movimento, se faltou conversão ou se faltou valor por venda*.",
  "texto 17 - O DADO DO SETOR SERVE PARA DECIDIR, NÃO PARA SE CONFORMAR",
  "texto 18 - Saber que o setor recuou tira o peso da culpa individual, mas não substitui a leitura da própria operação. Uma loja que compara os dois números decide com mais critério. Comenta **DIAGNÓSTICO** para comparar o desempenho da sua loja com o do setor.",
 ],
 # ── 7 · As mulheres e a inadimplência ──────────────────────────────────────
 [
  "texto 1 - AS MULHERES JÁ SÃO *50,5% DOS NEGATIVADOS*. ELA É A SUA CLIENTE",
  "texto 2 - O PERFIL DA INADIMPLÊNCIA MUDOU. A VITRINE AINDA NÃO PERCEBEU.",
  "texto 3 - SÃO *81,7 MILHÕES DE BRASILEIROS* COM O NOME RESTRITO",
  "texto 4 - O Mapa da Inadimplência da Serasa registrou 81,7 milhões de inadimplentes em *fevereiro de 2026*, somando *mais de 332 milhões de dívidas*. Fonte: Serasa, março de 2026.",
  "texto 5 - AS MULHERES PASSARAM A SER *A MAIOR PARTE DESSE GRUPO*",
  "texto 6 - As mulheres representam *50,5% dos inadimplentes*, contra 49,5% dos homens. Para uma loja de roupa feminina, isso significa que *metade do público que ela quer atrair está com o orçamento comprometido*. Fonte: Serasa, 2026.",
  "texto 7 - A DÍVIDA MÉDIA É DE *R$ 6.598* POR PESSOA",
  "texto 8 - O valor médio devido por consumidor chega a R$ 6.598,13, já corrigido pela inflação. É um número que ajuda a entender *por que a mesma cliente que entra na loja hesita na hora de fechar*. Fonte: Serasa, 2026.",
  "texto 9 - A CLIENTE ACIMA DE 60 ANOS *GANHOU PESO NESSA CONTA*",
  "texto 10 - A participação do grupo com 60 anos ou mais *cresceu 7 pontos percentuais em dez anos*, enquanto a faixa de 18 a 25 *recuou 4 pontos*. O público que a loja costuma tratar como mais estável mudou de posição. Fonte: Serasa, 2026.",
  "texto 11 - NOME RESTRITO *NÃO SIGNIFICA CLIENTE PERDIDA*",
  "texto 12 - Uma pessoa negativada continua comprando, só que *escolhe melhor e evita compromisso longo*. Por isso a loja que oferece *Pix, débito e valores fracionados* consegue atender quem o crediário não alcança.",
  "texto 13 - A FORMA DE PAGAMENTO PODE SER *O QUE DESTRAVA A VENDA*",
  "texto 14 - Quando a cliente pergunta em quantas vezes, ela está dizendo *qual parcela cabe no mês dela*. Aí a conversa muda: em vez de defender o preço, o atendimento *encontra o formato de pagamento que fecha*.",
  "texto 15 - PEÇA-CHAVE VALE MAIS QUE *ARARA CHEIA* NESSE CENÁRIO",
  "texto 16 - Com orçamento apertado, a cliente compra menos peças e quer que *cada uma resolva mais combinações*. Por isso a curadoria e a orientação da vendedora *passam a valer tanto quanto a variedade da loja*.",
  "texto 17 - O ORÇAMENTO DA CLIENTE É INFORMAÇÃO COMERCIAL",
  "texto 18 - Entender o momento financeiro de quem entra na loja ajuda a definir preço, parcelamento e mix com mais critério. Comenta **DIAGNÓSTICO** para ajustar a oferta da sua loja ao bolso da sua cliente.",
 ],
 # ── 8 · O juro caiu e a cliente não sentiu ─────────────────────────────────
 [
  "texto 1 - O JURO CAIU PELA QUARTA VEZ SEGUIDA E *SUA CLIENTE AINDA NÃO SENTIU*",
  "texto 2 - A SELIC RECUOU DESDE MARÇO. O VAREJO A PRAZO CONTINUOU CAINDO.",
  "texto 3 - EM *5 DE AGOSTO* A SELIC FOI PARA 14% AO ANO",
  "texto 4 - O Copom reduziu a taxa de *14,25% para 14% ao ano* em 5 de agosto de 2026, por decisão unânime. Foi o *quarto corte seguido de 0,25 ponto* no ciclo iniciado em março. Fonte: Banco Central, agosto de 2026.",
  "texto 5 - O CICLO COMEÇOU EM 15% E JÁ ANDOU *UM PONTO INTEIRO*",
  "texto 6 - Em março de 2026 a taxa saiu de *15% para 14,75%*, e desde então recuou em cada reunião. Mesmo assim, o patamar continua alto o suficiente para *encarecer parcelamento, cheque especial e capital de giro*. Fonte: Banco Central, 2026.",
  "texto 7 - NO MESMO PERÍODO, O VAREJO AMPLIADO *RECUOU 1%*",
  "texto 8 - O varejo que depende de crédito *caiu 1,0% em junho*, enquanto o restrito subiu 0,5%. Ou seja, *o corte de juros ainda não apareceu no bolso de quem compra parcelado*. Fonte: IBGE, PMC junho de 2026.",
  "texto 9 - A TAXA BÁSICA *DEMORA A CHEGAR NA PARCELA*",
  "texto 10 - Entre a decisão do Copom e a taxa que o banco oferece à cliente existe *um caminho de meses*. Por isso a loja não deve montar campanha contando com *um alívio de crédito que ainda não chegou na ponta*.",
  "texto 11 - CAPITAL DE GIRO CARO *MUDA A DECISÃO DE COMPRA DA LOJA*",
  "texto 12 - Comprar coleção com dinheiro emprestado a juro alto *empurra o custo para dentro da margem*. Aí a loja precisa *girar a peça mais rápido* para que a operação continue fechando a conta.",
  "texto 13 - GIRO DE ESTOQUE PESA MAIS *QUANDO O DINHEIRO É CARO*",
  "texto 14 - Uma peça parada há *noventa dias* segurou um dinheiro que poderia ter comprado outra coleção. Em cenário de juro alto, *esse tempo parado custa mais* do que custaria com crédito barato.",
  "texto 15 - VALE ACOMPANHAR *QUANTOS DIAS CADA PEÇA FICA NA LOJA*",
  "texto 16 - Registrar quando a peça entrou e quando saiu revela *quais categorias giram e quais travam o caixa*. Esse número orienta a próxima compra melhor do que *a impressão de qual peça é bonita*.",
  "texto 17 - O JURO É NOTÍCIA. O GIRO É DECISÃO DA LOJA",
  "texto 18 - A loja não controla a Selic, mas controla o tempo que o dinheiro fica parado na arara. Comenta **DIAGNÓSTICO** para olhar o giro de estoque e o custo do dinheiro na sua operação. E leve qualquer decisão de crédito ao seu contador.",
 ],
 # ── 9 · Pix parcelado · EXPANSION TWITTER ──────────────────────────────────
 # No cartão a ênfase é só peso, sem cor. Por isso aqui se marca o número, que
 # é o que aguenta virar semibold e ainda ser lido como dado.
 [
  "texto 1 - SUA CLIENTE ESTÁ PARCELANDO NO PIX A *ATÉ 9% AO MÊS* SEM VOCÊ SABER",
  "texto 2 - E A LOJA RECEBE O VALOR CHEIO NA HORA, COMO EM QUALQUER PIX.",
  "texto 3 - O PIX PARCELADO VIROU *CRÉDITO PARA QUEM NÃO TEM CARTÃO*",
  "texto 4 - A modalidade permite que a cliente parcele a compra usando uma linha de crédito do banco dela, sem precisar de cartão. O produto foi desenhado para alcançar *cerca de 60 milhões de brasileiros sem cartão de crédito*. Fonte: Banco Central e dados de mercado, 2026.",
  "texto 5 - A LOJA RECEBE *À VISTA, EM SEGUNDOS*",
  "texto 6 - Quem parcela é a pagadora, não a recebedora. O banco *adianta o valor integral para a loja na hora* e cobra as parcelas da cliente depois. Por isso a loja *não assume o risco de inadimplência daquela venda*. Fonte: dados de mercado, julho de 2026.",
  "texto 7 - A TAXA COMERCIAL DO PIX É DE *CERCA DE 0,3%*",
  "texto 8 - Como referência de mercado, o Pix costuma custar em torno de *0,3% para o lojista*, contra aproximadamente *1,1% no débito* e valores mais altos no crédito parcelado. Confirme as condições com o seu banco. Fonte: dados de mercado, 2026.",
  "texto 9 - O CUSTO EXISTE, SÓ QUE FICA *DO OUTRO LADO DO BALCÃO*",
  "texto 10 - O custo efetivo total para a cliente costuma ficar *entre 5% e 9% ao mês*, definido por cada instituição. Então a loja precisa oferecer a opção *sem transformar isso em incentivo para a cliente se endividar*. Fonte: dados de mercado, julho de 2026.",
  "texto 11 - O PRAZO *VARIA CONFORME O BANCO DA CLIENTE*",
  "texto 12 - Algumas instituições parcelam em *até doze vezes*, outras chegam a dezoito ou vinte e quatro. Como a condição é do banco dela, o atendimento não controla o número de parcelas, mas *pode informar que a opção existe*.",
  "texto 13 - A VENDEDORA PRECISA *SABER EXPLICAR ESSA OPÇÃO*",
  "texto 14 - Quando a cliente diz que não tem cartão, *a conversa costuma parar ali*. Se a equipe souber oferecer o Pix parcelado como alternativa, *aquela venda volta para a mesa sem que a loja precise dar desconto*.",
  "texto 15 - INFORMAR A OPÇÃO É DIFERENTE DE *EMPURRAR PARCELAMENTO*",
  "texto 16 - O papel da loja é apresentar as formas de pagamento disponíveis e *deixar a cliente decidir com clareza*. Uma cliente que se endivida mal não volta, e *a recompra vale mais do que uma venda forçada*.",
  "texto 17 - MEIO DE PAGAMENTO TAMBÉM É ARGUMENTO DE VENDA",
  "texto 18 - Uma loja que conhece as formas de pagamento disponíveis perde menos vendas por falta de cartão. Comenta **DIAGNÓSTICO** para revisar as formas de pagamento e a margem da sua loja. E confirme taxas e condições com o seu banco e o seu contador.",
 ],
]


def nu(s):
    """O texto sem marcador — é o que tem de bater com o estado."""
    return s.replace('*', '')


def aplica(peca, marcado, rotulo):
    """Troca cada linha com conteúdo pela versão marcada, na ordem.

    As linhas em branco ficam onde estão: algumas peças têm um espaço entre
    cada bloco e outras não, e reordenar isso mudaria o texto.
    """
    linhas = peca['txt'].split('\n')
    fila = list(marcado)
    saida, trocadas = [], 0
    for i, linha in enumerate(linhas, 1):
        if not linha.strip():
            saida.append(linha)
            continue
        if not fila:
            raise SystemExit(f'{rotulo}: linha {i} sobrou, marquei menos do que tem')
        novo = fila.pop(0)
        # Compara sem marcador dos dois lados: assim o script pode rodar de
        # novo por cima de um estado que já foi marcado, e mesmo assim quebra
        # se alguém tiver reescrito o texto.
        if nu(linha).strip() != nu(novo).strip():
            raise SystemExit(
                f'{rotulo}: linha {i} mudou de conteúdo\n  no estado: {nu(linha)}\n  marcado:   {nu(novo)}')
        saida.append(novo)
        trocadas += 1
    if fila:
        raise SystemExit(f'{rotulo}: marquei {len(fila)} linha(s) a mais do que existe')
    peca['txt'] = '\n'.join(saida)
    return trocadas, sum(l.count('*') // 2 for l in marcado)


def main(entrada, saida):
    est = json.loads(pathlib.Path(entrada).read_text(encoding='utf-8'))
    exp = next(c for c in est['clientes'] if c['id'] == 'expansion')
    if len(exp['pecas']) != len(PECAS):
        raise SystemExit(f"{len(exp['pecas'])} peças no estado, {len(PECAS)} marcadas aqui")

    total = 0
    for i, (peca, marcado) in enumerate(zip(exp['pecas'], PECAS), 1):
        if marcado is None:
            continue
        rotulo = f"peça {i} ({peca.get('nome') or 'sem título'})"
        linhas, trechos = aplica(peca, marcado, rotulo)
        total += trechos
        print(f'  {rotulo}: {linhas} linhas · {trechos} trechos')

    pathlib.Path(saida).write_text(json.dumps(est, ensure_ascii=False), encoding='utf-8')
    print(f'{total} trechos marcados · texto conferido linha a linha, nenhuma palavra mudou')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
