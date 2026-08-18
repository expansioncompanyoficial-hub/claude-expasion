# Imagens no carrossel — onde entram e o que mostram

A grade do MOD 01 reserva **uma caixa de 864 × 442,2 com canto 13**, e ela ocupa
uma de três posições. Este documento é sobre *qual* slide recebe foto, *em que
posição* e *o que* a foto mostra — a medida em si está em
`BRANDSDECODED/MAQUINA/MEDIDAS-CANVA-2026-08-11.md`.

---

## A regra que vem do original

Nas nove páginas medidas, **seis têm foto e três não têm**. As três sem foto não
são descuido: são os slides de virada — a declaração forte (pág. 6) e o
fechamento (pág. 9). Ali o texto é o objeto, e imagem só dividiria a atenção.

| Posição | Páginas | Para que serve |
|---|---|---|
| `topo` | 2, 5 | A foto **abre** o assunto. Entra quando a headline depende de contexto visual pra fazer sentido |
| `meio` | 3, 7 | A foto **separa** a afirmação da explicação. É a mais confortável de ler, e a mais usada |
| `base` | 4, 8 | A foto **fecha** o argumento. Entra quando o texto convence sozinho e a imagem é a prova |
| sem foto | 6, 9 | Declaração e fechamento. **Deixar vazio é escolha, não falta** |

Ritmo que sai disso, e que é o padrão da casa:

```
capa · topo · meio · base · topo · — · meio · base · —
```

---

## O que a foto tem que fazer

Uma pergunta por foto: **o que esta imagem prova que o texto só afirma?**

Se a resposta for "nada, é ilustrativa", **o slide fica melhor sem ela**. Foto
genérica de banco de imagens custa credibilidade — a leitora reconhece na hora, e
o que estava sendo dito perde peso junto.

O que funciona, em ordem de força:

1. **Foto da operação real do cliente** — a loja, a equipe, o produto, o evento.
   Vale mais que qualquer banco de imagens, mesmo tecnicamente pior.
2. **Print de evidência** — a conversa, o painel, o número na tela. É a única
   imagem que literalmente prova.
3. **Cena que reconstrói o momento descrito** — a cliente provando, o balcão em
   dezembro. Aqui banco de imagens serve, desde que a cena seja específica.
4. **Imagem de conceito** — quase sempre é o sinal de que o slide não precisava
   de foto.

---

## A vaga

Enquanto a foto não existe, o renderizador **desenha o espaço dela** na medida
exata, com o briefing do que entra ali:

```json
{ "tipo": "texto", "foto_pos": "meio",
  "imagem_brief": "Balcão em dezembro: sacola de presente, embalagem pronta" }
```

Isso é deliberado. O slide já nasce desenhado em volta da foto, então trocar a
vaga pela imagem não mexe em mais nada — nem no tamanho do texto, nem no
alinhamento com os outros slides. O contrário (montar sem foto e encaixar depois)
obriga a refazer a peça.

**A peça não vai pro cliente com vaga aberta.** A vaga é estado de trabalho: ou a
foto entra, ou o `foto_pos` sai e o slide vira um dos "sem foto".

---

## Vetos por cliente

Antes de escolher imagem, ler a ficha do cliente. Alguns vetos já custaram
retrabalho:

- **Prime** — José Breno não entra em imagem (veto de 22/04).

Veto novo vai para `CLIENTES/<CLIENTE>/FICHA-CARROSSEL-<CLIENTE>.md`, nunca só
para a conversa.
