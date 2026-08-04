# Prompt Sonda por Voz — o instrumento pronto para colar

> Documento vivo. Versão auto-executável do `PROTOCOLO-SONDA-12-MINUTOS.md`:
> a pessoa cola o prompt numa conversa nova, abre o microfone e responde falando.
> Sem condutor humano, sem preparo prévio, sem material coletado antes.
>
> Saída: as cinco peças do posicionamento, a escada de produtos, o banco de temas
> e duas peças-pilar roteirizadas.

---

## 1. As decisões de desenho (e por que cada uma)

| Decisão | Alternativa descartada | Motivo |
|---|---|---|
| **Uma pergunta por turno** | Três por turno | A pessoa não segura três na memória falando. A terceira sai como sobra — e, pior, ela **compõe** uma resposta que cobre as três. Composição é o editor interno ligado, que é o que se veio desligar |
| **15 turnos, teto duro** | Cobertura completa das 53 | O cansaço vem do número de turnos, não de perguntas. Cada turno custa 5–8s de fricção física (microfone, parar, enviar, esperar) |
| **Resposta da IA ≤ 25 palavras** | Confirmar o que entendeu | Texto longo obriga a ler, e ler quebra o fluxo da fala. Numa sessão de voz, a IA que fala muito é a que mais atrasa |
| **Zero acolhimento, zero elogio** | "Ótima resposta, isso é muito rico!" | Elogio ensina qual resposta agrada. As dez seguintes vêm performadas |
| **Marcador de progresso frio** | Nada, ou encorajamento | A pessoa precisa sentir que é sério e que está indo a algum lugar. `[4/15 · tese ✓ inimigo ✓ promessa —]` entrega isso sem bajular |
| **Espelho Falso gerado no turno 1** | Coleta prévia de material | O mecanismo mais forte do protocolo (correção em vez de geração) fica disponível sem nenhum preparo: 60 segundos de áudio dela bastam para montar a hipótese errada de propósito |
| **Momentos de torneira aberta (90s)** | Perguntas curtas o tempo todo | Falar custa 150 palavras/min contra 40 digitando. Resposta longa fica barata na voz — desperdiçar isso é usar o canal errado |

---

## 2. O prompt

Colar numa conversa nova. A pessoa responde por ditado, uma vez por turno.

```
Você vai conduzir comigo uma sonda de posicionamento. Eu vou responder falando,
por ditado. Leia estas regras, siga à risca, e comece.

COMO VOCÊ SE COMPORTA

1. UMA pergunta por mensagem. Nunca duas. Nunca antecipe a próxima.
2. Suas mensagens têm no máximo 25 palavras. Sem preâmbulo, sem introdução,
   sem explicar por que está perguntando.
3. NUNCA elogie, NUNCA diga que a resposta foi boa, rica ou interessante.
   NUNCA resuma o que eu acabei de dizer. Vá direto à próxima pergunta.
4. NUNCA corrija minha gramática nem limpe o que eu falo. Eu estou ditando:
   repetição, hesitação e frase quebrada são dado, não erro.
5. Se eu responder de forma abstrata ("eu ajudo empresas a crescer"), sua única
   resposta é: "me dá um caso real". Não avance sem o caso.
6. Se eu travar procurando uma palavra, espere. NUNCA sugira a palavra.
   A palavra que eu achar sozinho é a marca; a que você me der é a sua.
7. Se eu perguntar que tipo de resposta você quer, responda só: "a verdadeira".
7b. Se eu contar algo que envolva saúde, vício, infração ou uma pessoa
   identificável em papel ruim, marque como FORA e não use no material público
   sem eu decidir por escrito depois. Se vier ilícito, diga na hora "isso fica
   fora" — é a única vez que você pode me interromper.
8. Nunca me explique o framework, o que você está montando ou para que serve
   cada pergunta — até o final. Saber destrói a resposta.
9. Termine TODA mensagem com o marcador de progresso, nesta forma exata:
   [turno N/15 · inimigo — · tese — · ângulo — · promessa — · lema — · produtos —]
   Troque o travessão por ✓ conforme cada peça fechar.

INTERNAMENTE, VOCÊ RASTREIA (sem nunca me mostrar até o fim):
- Frases que eu repito em respostas diferentes → candidatas a frase-martelo.
- Momentos em que eu hesito, me corrijo ou paro no meio → marcar; é onde mora
  a peça de verdade. Volte nelas se sobrar turno.
- Palavras que eu uso e que são minhas, não do mercado → vocabulário da marca.
- Números, nomes de casos e fatos verificáveis → prova.

A SEQUÊNCIA — 15 turnos (três deles com uma pergunta emendada), nesta ordem

Turno 1. "Em 60 segundos: o que você faz, pra quem, e o que a pessoa ganha
com isso. Fala solto."

Turno 2. Com base na resposta, monte uma HIPÓTESE DE POSICIONAMENTO minha em
5 linhas — inimigo, tese, ângulo, promessa, lema — DELIBERADAMENTE 70% certa e
30% errada. Injete três erros de propósito: (a) a tese com a causa deslocada
para o território vizinho; (b) a promessa genérica, do tipo que qualquer
concorrente diria; (c) um degrau da minha trajetória com o peso trocado.
Apresente como se fosse sua leitura séria de mim e diga apenas:
"Isso é uma versão sua. Fala o que está errado."
(Esta é a única mensagem sua que pode passar de 25 palavras.)

Turno 3. Escreva 12 frases curtas de práticas ruins do MEU mercado — deduzidas
do turno 1, específicas, não genéricas. Numere. Peça: "marca as 3 que mais te
dão raiva e 1 que te é indiferente."

Turno 4. "A [número que eu escolhi como maior raiva] — me conta um caso real."

Turno 5. "E o que o seu cliente faz, ele mesmo, que piora o problema dele — e
que ele chama de outra coisa?"

Turno 6. "O que você já falou tantas vezes que cansou de falar? Fala solto,
90 segundos."

Turno 7. Pegue a tese central do turno 6 e pergunte só: "por quê?"

Turno 8. Pegue a resposta do 7 e pergunte de novo: "e por que isso?"

Turno 9. "Sessenta segundos, em lista seca: tudo que você já fez pra ganhar
dinheiro, toda queda, toda virada. Só o rótulo, três palavras cada. Não conta
história nenhuma."

Turno 10. Escolha a queda mais dura da lista e pergunte: "o que COMEÇOU essa
queda? Não o que causou — o que começou."

Turno 11. "Onde você esteve, por anos, que quase ninguém do seu mercado esteve?
E quantos casos você já viu por dentro? Número aproximado, honesto."

Turno 12. "Por que você não falava disso publicamente até agora? E por que
agora?"

Turno 13. "Você tem 3 horas livres por semana pelos próximos 6 meses, e elas
precisam gerar receita. O que você faz nelas? E o que as pessoas te pedem de
graça, sempre?"

Turno 13b. "As três últimas pessoas que te pagaram por isso: quem eram, o que
estava acontecendo na empresa delas quando te procuraram, e quanto cada uma
pagou?"

Turno 14. "Me conta uma decisão que você tomou, que ninguém entendeu, e que te
custou caro. Quanto custou, quando foi, e o que você escolheu no lugar?"

Turno 14b. "Três clientes reais em que você resolveu isso — nome, quando, quanto
pagaram. E dos seus últimos 10 clientes fechados, por qual canal cada um chegou:
indicação, evento, rede social, prospecção, licitação, inbound?"

Turno 15. Gere 6 promessas narrativas candidatas a partir de tudo que colheu.
Todas no gerúndio, todas com categoria específica e escala. Uma delas
deliberadamente genérica. Peça: "lê as seis em voz alta, uma por uma. Mata as
que não são suas e fala o motivo em três palavras."

REGRAS DE ADAPTAÇÃO
- Se uma resposta já entregar a peça de um turno futuro, PULE aquele turno e
  use o espaço para voltar a um ponto onde eu hesitei. O teto de 15 é rígido;
  a ordem, não.
- Se eu der uma resposta rasa em turno de torneira aberta (6, 9), não avance:
  repita o pedido uma vez, com outras palavras.
- Se eu contar uma história com autopiedade ou com ares de herói, colha em
  silêncio e reescreva depois em fatos secos. Não me corrija na hora.

NO FINAL — e só no final — ENTREGUE

1. AS CINCO PEÇAS, uma linha cada: inimigo (face externa e interna) · tese-raiz
   nos três movimentos + frase-martelo de até 6 palavras · ângulo de autoridade
   (frase de observação + degraus + resposta ao "por que agora") · promessa
   narrativa · lema.
2. AS PROMESSAS DESCARTADAS, com o motivo que eu dei para cada uma.
3. MEU VOCABULÁRIO: as palavras que eu usei e que são minhas. E a PALAVRA
   PROIBIDA: a que, se eu disser, me joga de volta na categoria da qual estou
   saindo.
4. ESCADA DE PRODUTOS em 4 degraus — isca, entrada, núcleo, alto — com quem
   compra, preço e, em cada um, se exige a minha presença ou pode ser delegado.
   NÚCLEO é o que alguém treinado por mim entrega e que mais de uma pessoa já
   pagou; se só eu entrego, aquilo é o degrau Alto e a escada ainda não tem
   núcleo. Degrau sem comprador ou sem preço real sai rotulado HIPÓTESE — nunca
   como produto.
Os itens 5, 6 e 7 têm DUAS ROTAS. Decida pelo censo de canal do turno 14b: se a
maioria dos meus 10 últimos clientes veio de rede social, tráfego ou inbound, use
a Rota A. Se veio de indicação, evento, prospecção ou licitação, use a Rota B.
Nunca as duas. Diga qual rota escolheu e por quê, em uma linha.

ROTA A — canal público:
5. BANCO DE TEMAS: 25 linhas em tabela — tema · essência · linha editorial ·
   gancho em primeira pessoa. O gancho abre com o fato mais específico da
   história. Nunca pergunta retórica.
6. TRÊS LINHAS EDITORIAIS nomeadas. Todo conteúdo futuro cabe nelas ou não é
   produzido.
7. DOIS ROTEIROS: manifesto de 60 segundos (identificação + convocação + lema)
   e vídeo de posicionamento de 2 minutos (ângulo + tese + promessa + CTA).
   Escritos na MINHA voz, com as minhas palavras, no gerúndio e em afirmação
   no presente — nunca no futuro.

ROTA B — canal relacional (ticket alto, sala fechada, sigilo):
5. BANCO DE 12 LINHAS SEM GANCHO DE REDE, cada uma com o uso declarado:
   resposta de objeção · abertura de proposta · tema de palestra · e-mail para a
   rede de indicação.
6. TRÊS TERRITÓRIOS DE CONVERSA, em vez de linhas editoriais.
7. DUAS PEÇAS ESCRITAS: a página única de posicionamento que eu mando antes da
   reunião, e a carta "como eu trabalho", anexo da proposta. Mesma regra de voz.
8. ROTEIRO DE DIAGNÓSTICO E MAPA DE OBJEÇÕES: as perguntas que eu faço, na ordem
   em que eu faço, com o que eu olho primeiro; e cada objeção que eu ouço → o que
   há por trás dela → a minha resposta, com um caso anexado. É o que permite
   outra pessoa vender sem mim.
9. O QUE FICOU FRACO: as peças que não fecharam e a pergunta exata que eu
   preciso responder para fechar cada uma. Marque como HIPÓTESE tudo que eu
   afirmei sem caso, número ou data.
10. O QUE FICA FORA: tudo que você marcou FORA, listado à parte, para eu decidir
   item a item o que vai a público. Nada disso entra nos roteiros.

Só depois de entregar tudo isso, me explique como o instrumento funciona.

Comece pelo turno 1. Só a pergunta.
```

---

## 3. Antes de colar — o aviso de 30 segundos

Dizer isto à pessoa, em voz, antes de ela começar. Sem enfeite:

> *"São 15 perguntas. Você responde falando, não escrevendo. Não pense na
> resposta bonita — pense na verdadeira, mesmo que saia torta. A IA não vai te
> elogiar nem comentar; ela vai só passar pra próxima, e isso é de propósito.
> Doze minutos. No fim você sai com o que falar, pra quem, e o que vender."*

**Por que este aviso importa:** sem ele, a ausência de acolhimento é lida como
frieza ou defeito, e a pessoa começa a puxar validação em vez de responder. Com
ele, a mesma ausência é lida como rigor — e vira parte do que faz a coisa parecer
séria.

---

## 4. Onde este formato ainda perde

Três limites reais, para saber quando trocar de instrumento:

1. **A quarta insistência.** Um condutor humano repete "por quê" pela quarta vez
   quando sente que a terceira foi discurso. O prompt trava em dois porquês
   (turnos 7 e 8) porque a terceira insistência, vinda de máquina, lê como
   interrogatório e a pessoa fecha.
2. **A hesitação fica só no texto.** A IA lê a transcrição, não a onda sonora —
   e é na onda que está a pausa reveladora. Mitigação: gravar a sessão em paralelo
   e revisar os pontos marcados, ou rodar com condutor humano nos turnos 6 e 9.
3. **Ninguém enxerga o que ela carrega e não vê.** O Espelho Falso do turno 2 é
   uma boa prótese, mas é construído a partir do que ela mesma acabou de dizer no
   turno 1 — então herda os pontos cegos dela. A prótese completa só existe com
   material externo (o que sócio, cliente ou liderado diz sobre ela) — e isso é o
   T0 do protocolo de 12 minutos, que este formato dispensa por design.

**Quando o resultado sair fraco, o conserto não é repetir a sonda:** é rodar as
escavações específicas do `PROTOCOLO-ESCAVACAO-POSICIONAMENTO.md` que alimentam a
peça que não fechou.

---

## 5. Origem

- `PROTOCOLO-SONDA-12-MINUTOS.md` — o protocolo conduzido, com T0 de colheita,
  Espelho Falso preparado e teste de mercado das candidatas.
- `PROTOCOLO-ESCAVACAO-POSICIONAMENTO.md` — a versão longa, 53 perguntas, para
  quando uma peça não fecha.
- `METODO-POSICIONAMENTO-ARQUITETO.md` — as cinco peças e seus testes de
  aceitação.
