# ESTÚDIO — protótipo da interface

Protótipo do app de carrosséis da Expansion. Dois níveis: uma galeria de clientes e, dentro
de cada um, o estúdio com os carrosséis dele, o brand kit e os cinco templates.

## A navegação

```
CLIENTES                    →   DENTRO DO CLIENTE
galeria de cards                ‹ Clientes / Prime Alphaville
+ novo cliente                  ├── carrosséis do cliente (chips) + novo
                                ├── marca: 3 cores, fontes, assinatura
                                ├── template: 5 opções
                                ├── palco: slide grande + tiras
                                └── conteúdo: editor + contadores
```

Um cliente é uma sessão: guarda a marca e as peças. Entrar nele abre tudo numa tela só —
não precisa navegar de novo pra trocar de carrossel, de template ou de cor.

É o mesmo modelo da plataforma da BrandsDecoded (projetos na entrada, studio dentro), que
faz sentido porque separa *configurar a marca* de *produzir peça*.

Publicado como artifact em 11/08/2026. Arquitetura do back end em
`../ESTUDIO-ARQUITETURA-2026-08-11.md`.

## Como regerar

O fonte fica em `prototipo.src.html` com um marcador `/*__FACES__*/`. O gerador embute as
fontes em base64 nesse ponto:

```bash
python3 gerar.py prototipo.src.html /tmp/estudio.html
```

Fontes em base64 e não `<link>` do Google Fonts: a CSP do artifact bloqueia CDN de fonte,
e o Chromium headless também não carrega webfont externa de forma confiável.

## Os cinco templates

Quatro modelados nos da BrandsDecoded (ver `../BRANDSDECODED/MAQUINA/`), um já em produção
na skill:

| Template | Etapa | Cara |
|---|---|---|
| Meio de Funil | meio · 9 slides | Ritmo alternado destaque/escuro, claro nas pontas |
| Brands 1 | topo | Foto full-bleed escurecida, headline na base, @ acima |
| Brands 2 | topo | Foto full-bleed, headline em serifa centralizada |
| Brands 3 | topo | Foto em meia tela, headline na coluna da direita |
| Twitter | topo | Cartão de post, fundo claro, avatar e selo |

## Limites conhecidos

Roda inteiro no navegador — não persiste, não faz upload, não exporta PNG e não chama a
skill. É protótipo de interface, não o produto. O que falta está tabelado no documento de
arquitetura.

As fotos são gradientes derivados das cores do cliente, no lugar de imagem real.

## O trilho de etapas

A tela do cliente tem um trilho retrátil à esquerda com seis etapas:

```
Marca · Capas · Carrossel · Legenda · Aprovação · Desempenho
```

**Elas não são ferramentas paralelas que se comunicam — são estágios da mesma
peça.** Foi a escolha de desenho, e ela muda o comportamento em três pontos:

1. **A capa escolhida vira o slide 1.** Clicar em "usar esta capa" escreve a
   headline no bloco `texto 1` e leva pro Carrossel. Sem isso, escolher a capa
   seria só marcar um favorito.
2. **A etapa mostra estado, não só nome.** "6 geradas", "18/18 blocos",
   "aguardando cliente". É o que responde "onde essa peça está" sem abrir nada.
3. **Etapa sem pré-requisito fica travada, e diz por quê.** Legenda antes de
   escrever o carrossel, aprovação antes da legenda, desempenho antes de
   publicar. Travar sem explicar é o que faz a pessoa clicar duas vezes.

O trilho encolhe para 58px e vira só ícone. E a coluna do editor some nas etapas
que não escrevem — não faz sentido reservar 336px de espaço morto.

## Salvar e abrir de outro dispositivo

O Estúdio publicado guarda o estado **dentro da própria página**: clientes,
peças, capas geradas, capa escolhida, legenda e a palavra do CTA. Quem abrir a
mesma URL em outro aparelho pega de onde parou — não é cache do navegador, é o
conteúdo da página.

O botão **Salvar** publica uma nova versão do artefato pela capacidade
`artifact`. Fora do claude.ai a capacidade não existe: o botão some e o rótulo
diz "sem sincronização aqui", em vez de fingir que salvou.

**Por que botão e não salvamento automático:** publicar recarrega toda view
aberta. Salvar a cada tecla deixaria a página recarregando no meio da digitação.
Então o gesto é explícito, e o rótulo avisa quando há mudança pendente.

### Como a página se reescreve

`gerar.py` emite duas coisas do mesmo fonte:

| | |
|---|---|
| `pagina` | o fragmento que a ferramenta de Artifact recebe — fontes já embutidas |
| `molde` | o documento completo, em base64, com três buracos: as fontes, o estado e ele próprio |

Ao salvar, a página decodifica o molde, injeta as fontes que já estão vivas no
DOM, o estado atual e uma cópia do próprio molde, e publica. As fontes existem
uma vez só no arquivo — embuti-las duas vezes dobraria o tamanho à toa. O molde
guarda uma cópia de si porque, sem isso, salvar funcionaria uma vez só.

### A armadilha, que custou três tentativas

Esse código é **parte da página que ele reescreve**. Qualquer marcador que
apareça nele como texto — inclusive dentro de um comentário — é encontrado antes
da tag de verdade, e o `replace` corta o próprio script ao meio. As duas
primeiras versões falharam exatamente assim: uma acertou o literal
`__MOLDE64__` na função, a outra acertou uma tag escrita por extenso num
comentário.

Hoje as tags são montadas em pedaços, a partir do nome e do id, e `gerar.py`
confere que nenhuma tag alvo aparece literal no corpo do script.

Testado em três gerações seguidas: editar, publicar, reabrir, publicar de novo.
O estado sobrevive e o arquivo não cresce.

## Ajuste por slide

Na etapa Carrossel, o painel da esquerda mostra o slide aberto:

| | |
|---|---|
| **Enviar imagem** | entra reduzida a 1000px de largura, JPEG 0,82 |
| **Enquadramento** | grade de nove pontos — o que sobrevive ao corte 864 × 442 |
| **Onde a imagem entra** | topo · meio · base · **fundo** · sem, por slide |
| **Escurecimento do fundo** | leve · médio · forte, quando a imagem é o fundo |
| **Título / Corpo** | tamanho em px, com − e + |

O tamanho pedido à mão é o **ponto de partida, não a palavra final**: o
auto-ajuste ainda encolhe se não couber, e o painel avisa em âmbar
*"encolhido para Xpx pra caber"*. Dá para aumentar o texto sem conseguir quebrar
o slide.

Por isso o `−` anda a partir do **tamanho que está na tela**, não do que foi
pedido. Um título pedido em 84 que o auto-ajuste desenhou em 66 não muda de
aparência nos nove primeiros cliques do `−` — some de 84 até 66 e só então
encolhe. Clicar cinco vezes sem nada acontecer parece defeito. Hoje o passo
parte do menor entre os dois, e o primeiro clique já mexe no slide.

### Por que o texto sobrepunha a imagem

O Estúdio posicionava os blocos no `top` medido mas **sem teto nenhum** — o
renderizador em Python já tinha o auto-ajuste, o Estúdio não. Os dois tinham
divergido.

Medido numa peça real de nove slides: quatro quebravam. Dois passavam da margem
de baixo (58px e 113px) e dois tinham a headline entrando na caixa de imagem
(17px e 28px).

Hoje cada bloco declara `data-teto` — até onde o próximo começa — e o texto
encolhe dentro da própria fatia.

### `fundo` — a imagem ocupando o slide

Escolhendo `fundo`, a imagem cobre o slide inteiro e o texto vai por cima, em
branco. Vale em qualquer slide, e é o padrão dos templates EXPANSION 02, 03 e 04,
onde a foto sangrada É o desenho.

O escurecimento é dosado à parte, porque errar aqui custa dos dois lados: de
menos e o texto some na foto, demais e a foto vira um fundo escuro qualquer — e
a foto é justamente o que faz alguém parar o dedo.

O véu de um slide interno é **parelho**; o da capa **sobe do pé**. São grades
diferentes: na capa o texto se apoia na base e a metade de cima fica sendo
imagem; num slide interno o texto está no terço superior, e um degradê de baixo
deixaria a headline sobre a parte clara da foto.

O upload existe em todos os templates, no que cada um precisa: fundo nos
sangrados, caixa no EXPANSION TWITTER, e as duas coisas no EXPANSION 01.

### Cuidado ao mudar id de template

Quando os cinco templates viraram `EXPANSION 01..04`, os ids mudaram
(`brands1` → `exp02` e assim por diante). O estado salvo guarda o id da peça: sem
migrar, as peças antigas caem no template padrão e o trabalho **parece** perdido.
Toda renomeação de id precisa de migração no estado.

## Renomear a peça

Cada peça na lista tem um `✎`. Sem isso a lista vira sete *"Sem título"* e a
única maneira de achar a certa é abrir uma por uma — o problema aparece na
terceira peça, não na primeira.

## Conferir e concluir

O botão **Concluir carrossel** roda a peça inteira antes de fechar: renderiza os
nove slides num medidor fora da tela, deixa o auto-ajuste correr e mede bloco a
bloco. Devolve um laudo em duas colunas — o que ele **corrigiu** e o que só ele
pode **avisar**.

Ele corrige sozinho o que é mecânico:

- tamanho pedido à mão que o auto-ajuste teve de derrubar abaixo do piso
  (52px no título, 30px no corpo) volta ao padrão do template
- `foco` de imagem fora dos nove pontos volta para o centro

E **só avisa** o que é editorial, porque a decisão é de quem escreve:

- bloco que não coube nem no menor tamanho — é texto demais, não fonte de menos
- slide que pede foto e está sem
- capa fora da faixa de caracteres do padrão
- CTA sem a palavra fixa do cliente

A separação é o ponto: se ele reescrevesse o texto para caber, a peça sairia
diferente do que foi aprovado e ninguém veria.

## O degradê da capa

A frase de impacto da capa marcada com `*trecho*` sai preenchida pelo degradê
da marca, quando a marca tem um. Vale **só na capa** — no corpo dos slides
internos a ênfase continua chapada, que é o que está medido no Canva.

O degradê é **por cliente**, no campo `gradTexto` da ficha, e não tem padrão
global. Hoje só a Expansion tem
(`linear-gradient(90deg,#ff9901 0%,#ff6c01 100%)`); todo o resto pinta a ênfase
da capa com o próprio `accent`. Um degradê laranja por cima da cor da Prime ou
da Ciés não é o padrão do template — é identidade inventada.

## O destaque nas frases

`*trecho*` troca a cor, `**trecho**` sobe o peso. Os dois valem em todo slide —
capa, headline e corpo — e a marcação é **por conteúdo, nunca por posição**: o
realce anda junto com a frase quando o texto muda.

A régua está em `.claude/skills/carrossel-viral/references/template-01.md`, e em
uma linha é esta: **capa 1 trecho, corpo até 2, e o que se marca é o número, a
data ou o prazo** — nunca o adjetivo, nunca a fonte.

A cor sai do fundo, não do gosto: degradê na capa, `accent` sobre escuro e sobre
claro, **branco em bold no slide de destaque** (o fundo dele já é a cor da
marca) e só peso, sem cor, no EXPANSION TWITTER, que empresta a credibilidade
da rede.

No **último slide** a chamada é texto normal e só a palavra do CTA fica na cor,
em bold — ela vem da ficha (`cta`), então pega mesmo sem marcador. O título
desse slide fica limpo. A linha inteira em laranja, que é o que o Canva faz,
deixava a página laranja demais e o CTA sem destaque contra nada.

**Concluir carrossel** cobra isso: aponta a capa sem destaque e lista os slides
internos que ficaram sem nenhum trecho marcado.

## Baixar os PNGs

Na etapa **Aprovação**, o cartão *Baixar os PNGs* entrega os nove slides em
**arquivos separados**, 1080 × 1350, na ordem de publicação. Sem ZIP: é assim
que o Instagram pede na hora de subir o carrossel, e é assim que dá para
conferir slide a slide antes.

O navegador pede confirmação **a cada arquivo** — nove downloads, nove
confirmações. Não é escolha: a capacidade `downloads` abre uma caixa por
arquivo, e a única forma de ter uma confirmação só seria empacotar tudo num
ZIP. Recusar uma para o processo ali, e o cartão diz quantos já foram.

### Como o PNG é feito dentro da página

O sandbox do artefato deixa **inertes** link de download e save por script.
Quem entrega o arquivo é a capacidade `downloads`; quem faz o pixel é a
própria página:

1. o slide é renderizado no medidor fora da tela, em 1080 × 1350;
2. vai para dentro de um `<foreignObject>` com **todo o CSS da página junto** —
   inclusive as `@font-face` embutidas, senão o texto sai numa fonte de sistema
   e ninguém percebe;
3. o SVG entra num `<img>` por **`data:` URL** e é desenhado num canvas.

O `data:` não é detalhe: com `blob:` o canvas fica contaminado e o `toBlob`
recusa a exportar. Foi o primeiro erro da implementação.

