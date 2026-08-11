# CLIENTES — fichas de marca

Uma ficha por cliente. É o que faz a skill `carrossel-viral` parar de perguntar as mesmas
7 coisas a cada peça.

## Como funciona

Ao pedir um carrossel, a skill lê `CLIENTES/{CLIENTE}.md` e já sai com marca, @, nicho,
cor, estilo, CTA e régua editorial. O que continua sendo perguntado é só o que muda de
peça pra peça: o insumo, o tipo de carrossel e quantas imagens.

Se o cliente não tiver ficha, a skill roda o briefing completo uma vez e grava a ficha
aqui no fim.

## Campos em falta

Campo que ainda não foi confirmado com o cliente fica marcado **`[FALTA]`**. A skill
pergunta todos de uma vez, numa mensagem só, e atualiza o arquivo.

**Ficha não se preenche com palpite.** Cor errada e CTA errado o cliente percebe na
primeira peça. Sugestão de paleta, quando existir, fica nomeada como sugestão — nunca
ocupa o campo como se fosse a marca real.

## O que entra na régua editorial

Além do anti-slop que já vem do material da BrandsDecoded, cada ficha carrega o que
**aquela** marca não diz:

- **Compliance do nicho** — profissão regulada (OAB, CFM, CRO, CFC) ou espaço com régua
  de publicidade própria, como crédito e saúde. Na dúvida, marcar como ponto a validar
  com o cliente, nunca cravar.
- **Tom** — o registro que a marca usa e o que ela recusa.
- **Proibições próprias** — palavra, promessa ou comparação que aquele cliente já vetou.

## Fichas

| Cliente | Nicho | Estado |
|---|---|---|
| [PRIME](PRIME.md) | Crédito imobiliário (Alphaville) | Piloto · identidade completa · 2 pontos a conferir |

Ativos de marca (paleta, referências de layout, logo) ficam em `{cliente}-identidade/`
ao lado da ficha.
