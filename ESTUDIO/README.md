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


## Arquivar e excluir cliente

Cliente criado errado e cliente que parou de ser atendido são problemas diferentes, e o
Estúdio trata cada um do seu jeito. O botão `⋯` no canto do card abre a sequência:

1. **Arquivar** — o cliente sai da galeria ativa e desce para a faixa *Inativos*, com o
   card apagado. Nada é perdido: peças, marca e capas continuam lá. Voltar é o mesmo `⋯`,
   que agora pergunta *Reativar*.
2. **Excluir de vez** — só é oferecido depois de recusar o arquivamento, e apaga o
   cliente do estado.

A trava da exclusão depende do que existe dentro. `temTrabalho()` varre as peças atrás de
texto, capas, legenda ou imagem ajustada:

```javascript
function temTrabalho(x){
  return (x.pecas || []).some(p =>
    (p.txt || '').trim() || (p.capas || []).length || (p.legenda || '').trim() ||
    Object.values(p.ajustes || {}).some(a => a && a.img));
}
```

Cliente **vazio** sai com um `confirm`. Cliente **com conteúdo** exige digitar o nome
exato — nome diferente não apaga nada e o Estúdio avisa. É a diferença entre desfazer um
erro de digitação e destruir trabalho: a segunda precisa de atrito.

O `⋯` é um `<span role="button">` e não um `<button>`, porque o card inteiro já é um
botão e botão dentro de botão é HTML inválido — o navegador desmonta a estrutura e o
clique passa para o card. O `stopPropagation` no `⋯` é o que impede que abrir o menu
também abra o cliente.

## Template por slide

O template da **peça** é a base: é ele que define o ritmo e quantos slides
existem. Mas o desenho é decidido **slide a slide**. Uma peça pode abrir numa
capa sangrada e seguir na grade do meio de funil sem virar duas peças.

A seção *Template*, no painel da esquerda, abre com o escopo do clique:

```
[ slide 2 ]  [ carrossel todo ]
```

Em **slide N**, clicar num template troca só o slide aberto — grava
`ajustes[N].tpl`. Em **carrossel todo**, troca a peça inteira, que era o
comportamento antigo. O rótulo do escopo mostra o número do slide aberto, então
ele muda conforme se navega.

Três detalhes que decidem se isso é usável ou confuso:

1. **O slide fora do padrão se declara.** Uma faixa na cor da marca diz
   *"slide N fora do padrão da peça"* e traz um `voltar ao da peça`. A barra do
   palco também muda: `EXPANSION 01 · peça em EXPANSION 02`. Sem isso o
   carrossel fica misturado e ninguém lembra por quê.
2. **Escolher o mesmo template da peça apaga a exceção** em vez de gravar o
   mesmo valor. Senão o slide ficaria marcado como fora do padrão sendo
   idêntico a ele.
3. **Aplicar em todos avisa antes de apagar exceções.** Fazer isso calado seria
   pior: o clique pareceria não ter funcionado nos slides com desenho próprio,
   porque a exceção venceria o template novo.

No código, `render(i)` resolve o template por `tplDo(i)` e o sombreia
localmente — daqui para baixo `tpl` é o do slide, e o resto da função continua
lendo `tpl` como sempre leu. O segundo argumento, `render(0, t)`, existe só
para as miniaturas da lista, que desenham o slide 0 em **cada** template para
mostrar como ele é. A versão anterior trocava o global dentro do laço, e
qualquer erro no meio deixava a página inteira no template errado.

## As caixas de diálogo são da página, não do navegador

`prompt()`, `confirm()` e `alert()` **não existem dentro do artefato publicado**.
O iframe é sandbox sem `allow-modals`: a chamada volta `null` e nenhum erro
aparece. Renomear carrossel, arquivar e excluir cliente pareciam botões mortos
por isso — funcionavam em qualquer navegador aberto direto no arquivo, e só ali
não. Foi um bug que passou por dois testes automatizados justamente porque o
Chromium headless roda a página fora do sandbox.

Hoje o Estúdio usa `caixa()`, que devolve `Promise`, e três atalhos em cima
dela:

```javascript
await confirma('Excluir Expansion DE VEZ?', 'Isto não tem volta…', 'Excluir')
await pergunta('Nome do carrossel', p.nome)   // devolve string ou null
await avisa('Não excluí nada', 'O nome digitado não bate.')
```

Escape e clique fora cancelam; Enter confirma. Todo chamador virou `async` — é o
preço de não usar as nativas, e o preço de usá-las era o recurso não existir no
publicado.

## Baixar: um arquivo só, ou os PNGs separados

**`.zip` não é entregável pelo canal de download do artefato.** A lista de
extensões é fechada:

```
gif png jpg jpeg webp mp4 webm txt json md
+ (quando habilitadas) docx pptx epub csv ttf html svg pdf
```

O `save()` recusa com `rejected_extension`, e isso não aparece como erro no
console — vira uma promessa rejeitada com um código que, sem tratamento
próprio, some numa mensagem genérica. Foi assim que o botão "Baixar ZIP"
subiu quebrado: o teste usava um dublê que aceitava qualquer extensão.

**Lição que vale além deste caso:** dublê de capacidade que aceita tudo não
testa nada. O de hoje carrega as duas allowlists e o teto de 16 MiB, e roda nos
dois cenários — extensões estendidas ligadas e desligadas.

O botão *Baixar tudo num arquivo* tenta em ordem, e cada recusa por extensão
cai para o próximo em vez de falhar:

| | |
|---|---|
| **1 · ZIP** | escrito à mão em `zipDe()`, método `store`. Passa onde a extensão for aceita |
| **2 · Página** | um `.html` com os PNGs em base64 dentro. Aberto da pasta de downloads ele **não** está em sandbox, então ali o `<a download>` funciona e um botão salva os nove de uma vez |
| **3 · Mensagem** | nenhum passou: diz qual código cada um devolveu e manda usar os arquivos separados, que são PNG e sempre passam |

O ZIP é `store` e não deflate porque PNG já vem comprimido: a compressão
renderia quase nada e custaria o dobro de código. São ~50 linhas — tabela de
CRC32, cabeçalho local por arquivo, diretório central e registro de fim.

### Baixar as imagens, e a retomada

O caminho principal é o simples: **um arquivo por slide, em JPEG**, que é o que
se pediu e o que sempre passa — `jpg` está na lista base do canal. Um botão ao
lado baixa em PNG, para quem quer sem perda.

O problema não era o formato, era o **corte do navegador**: ele trava depois de
seis confirmações seguidas. A versão anterior parava ali e mandava usar outro
caminho, o que na prática significa recomeçar do zero.

Agora ele **guarda onde parou**. Cinco tentativas com espera crescente (2 s a
10 s) cobrem o caso de ser só ritmo; se for teto duro, `RETOMAR` grava o índice,
o cartão se repinta e o botão vira **"Continuar do slide 7"**. A segunda leva
termina o que faltava, e nenhum arquivo vem duas vezes.

**Medido contra o limite real.** O dublê do teste reproduz a allowlist e corta
em seis, como o navegador dele:

```
1ª leva : 6 arquivos · "O navegador bloqueou downloads seguidos.
          6 de 9 salvos, faltam 3. Toque de novo para continuar do slide 7."
botão   : "Continuar do slide 7"
2ª leva : 9 arquivos · "Pronto: 9 JPG na sua pasta de downloads."
```

Os nove conferidos no disco: nomes distintos, conteúdos distintos, todos
1080 × 1350, todos JPEG.

### O erro que escondia o erro

`paraAqui()` escrevia a mensagem e **depois** chamava `pintarAprovacao()`. O
repinte refaz o cartão, então a mensagem ia para um nó que deixava de existir:
o processo parava sem nenhuma explicação na tela. Repintar primeiro e escrever
depois resolve — e foi o teste automatizado que pegou, porque ele espera pela
mensagem que nunca chegava.

## O compactado que passa: `.docx`

O download recusa `.zip`. Mas aceita `docx`, e **um .docx é um pacote ZIP** — o
formato Open XML é um zip com XML dentro. Então o pedido "me dá em zip" tem
resposta: o arquivo baixa como `.docx`, e quem quer as imagens soltas renomeia
para `.zip` e descompacta. Quem não quer renomear abre direto: são os nove
slides, um por página.

**Não é zip renomeado.** Um zip com outro nome faz o Word e o Pages recusarem
abrir. `docxDe()` monta um documento válido: `[Content_Types].xml`, os
relacionamentos da raiz e do documento, e um `word/document.xml` que declara
cada imagem como `wp:inline` com as medidas em EMU (1 pol = 914 400).

Conferido em três camadas, porque cada uma pega uma falha diferente:

| | |
|---|---|
| `unzip -t` | o container é um ZIP íntegro |
| XML parse das 4 partes | nada malformado, e toda referência `r:embed` tem relacionamento e arquivo |
| `python-docx` abrindo | um leitor de Office de verdade vê 9 parágrafos, 9 imagens, A4, proporção 0,800 |

A ordem da cadeia é por proximidade do que se pediu: `zip` (se algum dia
passar), `docx` (zip de verdade, passa hoje), `html` (a página).

### O teto de 16 MB, e por que o pacote é JPEG

Quando as peças ganharam foto de verdade, o gargalo **mudou de lugar**. Medido
com nove slides fotográficos:

| | Tamanho | Resultado |
|---|---|---|
| ZIP em PNG | 13,5 MB | cabe no teto — barrado pela **extensão** |
| Página em PNG | 18,0 MB | extensão aceita — **estoura** o teto de 16 MB |

Os dois planos falhavam, cada um por um motivo diferente. O plano B tinha
funcionado antes só porque a peça de teste pesava 8 MB.

A saída foi encolher a carga: **o pacote sai em JPEG a 95%.** Medido slide a
slide contra o PNG, ocupa **20% do tamanho** com diferença média de **1 em
255** — invisível a olho, e com folga de sobra para a recompressão do
Instagram. O mesmo pacote caiu de 18 MB para 2,9 MB.

Dois detalhes do JPEG que custam pouco e evitam estrago:

- **`fillRect` branco antes do `drawImage`.** JPEG não tem canal alfa: sem
  pintar o fundo, qualquer transparência vira **preto**, não branco. Os slides
  são opacos hoje — o preço de esquecer é uma peça arruinada.
- **O tamanho é conferido antes de pedir a confirmação.** Descobrir que
  estourou depois de o operador clicar em salvar é o pior momento possível.

Os **arquivos separados continuam em PNG**, qualidade máxima: ali não existe
teto agregado, cada arquivo passa sozinho.

E a mensagem de recusa nomeia a porta que fechou — *extensão fora da lista*,
*extensão existe mas não habilitada nesta conta* e *acima do teto* são três
diagnósticos diferentes, com três saídas diferentes.

## Dez controles que não funcionavam

Auditoria de agosto/2026, cinco varreduras independentes sobre o fonte, cada
achado verificado por um segundo passe que tentava refutá-lo. Fica registrado
porque metade não dá para achar clicando — o botão responde, e o defeito está
no que ele grava.

| Controle | O que acontecia |
|---|---|
| `#btn-encolher` | `.grade.encolhido .encolher{display:none}` apagava o próprio botão. Encolher o trilho era mão única até dar F5 |
| Modal *Novo cliente* | logo e moldura escolhidos iam para `fLogo`/`fFundo` e o cliente nascia com `logo:null, logoFundo:'auto'` cravados. A vitrine mostrava o logo, o cliente saía sem |
| Setas `‹ ›` do palco | continuavam clicáveis na etapa *Capas*, onde o palco está escondido: mudavam `atual` no escuro e sobrescreviam o cabeçalho |
| `medeSlide()` | só procurava `.ft-h1`/`.ft-corpo`, classes do meio de funil. Capa e sangrados não tinham medição, então o aviso "encolhido para X" nunca aparecia neles |
| Padrão do corpo | escrito em dois lugares que discordavam: em slide claro o render desenhava 36,6 e o painel dizia 45. Saíam um aviso falso de "encolhido para 37px" e um salto no `+`, de 36,6 para 47,4 |
| Miniatura da peça | `montarPecas` trocava `tpl` e `blocos` e esquecia `peca` — toda mini saía com a imagem e os tamanhos da peça aberta. Nome de uma, pixels de outra |
| *Vagas de imagem preenchidas* | `ck(false, ...)` cravado. Pendência eterna no checklist, ao lado de um botão habilitado |
| Etapa *Desempenho* | travada por `status === 'publicado'`, valor que nada no arquivo escrevia. Botão permanentemente cinza e `pintarDesempenho()` como código morto |
| `#info-tpl` | `trocaEtapa` reescrevia com `tpl.nome` depois de `pintar()` já ter posto o rótulo por slide. O cabeçalho mentia em slide com template próprio |
| Sete handlers sem `marcaSujo()` | criar cliente, novo carrossel, *Exemplo*, upload de logo, moldura do logo, cores da marca e *Gerar link de aprovação*. Mudavam o estado calados: o `beforeunload` não avisava e o trabalho ia embora fechando a aba |

O padrão por trás dos sete últimos: **atribuir `elemento.value` por código não
dispara `oninput`**. Todo caminho que escreve no estado sem passar por digitação
precisa chamar `marcaSujo()` na mão.

## Enquadramento livre

A grade de nove pontos virou arraste contínuo. A vitrine do painel **é** o
controle: arrasta a imagem ali dentro e o slide acompanha ao vivo. Setas
ajustam 1 ponto, com Shift 5. O zoom vai de 100% a 400%, por barra ou pelos
`−`/`+`, e `Centralizar` volta tudo ao meio.

São dois valores por slide, e é o **par** que faz o modelo funcionar:

| | |
|---|---|
| `foco` | `object-position: X% Y%`, contínuo. Passeia dentro da sobra que o `cover` já criou |
| `zoom` | `transform: scale(z)`, com `transform-origin` **no mesmo ponto do foco** |

**Por que a origem tem de acompanhar o foco.** Escalar por z ≥ 1 em torno de um
ponto *dentro* do retângulo sempre devolve um retângulo que contém o original.
Logo, para qualquer foco e qualquer zoom ≥ 1, a caixa continua coberta — nenhuma
combinação abre canto vazio. Não depende do tamanho nem da proporção da foto, e
vale igual na tela e no PNG, porque é a mesma regra de CSS nos dois.

E é isso que também prende o ponto focal: como `object-position: X% Y%` alinha o
ponto X%,Y% da *imagem* com o ponto X%,Y% da *caixa*, escalar em torno desse
mesmo ponto da caixa deixa o assunto parado enquanto o resto se afasta.

**Medido, não deduzido.** 264 combinações — 4 proporções de foto (retrato
800×1400, paisagem 2400×600, quadrada, fininha 3000×300) × 11 focos × 6 zooms —
rasterizadas pelo mesmo caminho do export e conferidas pixel a pixel nos cantos
da caixa: **zero buracos**. E com um alvo de 24px na fonte, a 15% da altura: ele
fica em 15,0% da caixa com zoom 1, 1,5, 2,5 e 4.

Durante o arraste **não** se chama `pintar()` — ele redesenha as nove
miniaturas a cada quadro e o gesto engasga. Mexe-se só nos dois `<img>` à
vista, e o repinte inteiro vem no soltar.

## O selo da marca

Logo do cliente quando existe, inicial do nome quando não. A regra é uma só,
em `avatar(tam, fonte, autoFundo, contorno)`, usada pela capa e pelo cartão do
Twitter.

Estava escrita duas vezes, e **a versão do cartão do Twitter nem olhava para
`cli.logo`** — mostrava a letra mesmo com o logo na ficha. Seis dos nove
clientes têm logo cadastrado e nenhum aparecia ali.

Dois parâmetros existem porque a superfície muda o que funciona:

| | |
|---|---|
| `autoFundo` | com moldura `auto`: véu branco a 10% sobre a capa escura, cinza leve sobre o cartão branco |
| `contorno` | `box-shadow: inset` — e não `border`, que entraria na conta do tamanho e tiraria o selo da grade medida |

Sem contorno, um logo com moldura `claro` vira círculo branco sobre cartão
branco: o logo está lá e parece flutuando.

**A capa não mudou um pixel.** Conferido por comparação de imagem entre a build
anterior e a nova, em dois clientes — `ImageChops.difference` sem bbox. Isso
importa porque a aparência do chip da capa é decisão do Nicolas, não área de
limpeza minha.

E a conferência cobra: cliente sem logo vira achado `ruim` no *Concluir
carrossel*, dizendo em quais slides o selo cai na letra. É o que faz "todos com
o logo" ser padrão em vez de torcida.

## O diário de decisões

O estado salvo guarda como a peça **ficou**. Isso não ensina como ela ficou
assim: não diz que a headline escolhida foi a terceira de dez, que a foto subiu
18 pontos depois de entrar, que o corpo do slide 4 foi reescrito, que o título
precisou de −6px. **Sem esse rastro, ver cinquenta peças prontas ensina o mesmo
que ver uma.**

Por isso ele existe *antes* das peças, não depois. `peca.diario` guarda até 300
eventos:

| `q` | O que responde |
|---|---|
| `capa` | qual headline venceu, **entre quantas**, em que posição da lista, e quais foram recusadas |
| `texto` · `legenda` | só as linhas que mudaram, com antes e depois — o que foi reescrito do que a máquina propôs |
| `tam` | tamanho pedido à mão **e o que o auto-ajuste tinha proposto**: é onde a régua erra |
| `foco` · `zoom` · `centraliza` | o enquadramento líquido do gesto, não cada quadro |
| `pos` · `scrim` · `imagem` | onde a foto entra, quanto escurece, quando entra e sai |
| `tpl` | troca de template, por slide ou da peça |
| `status` | quando foi pro cliente e quando foi ao ar |

Eventos do mesmo campo e mesmo slide em menos de 4 s são **fundidos**: dez
toques no `+` são uma decisão, não dez. Sem isso o diário viraria log de
cliques. Sete decisões reais deram 773 bytes — o custo em estado é irrelevante
perto do que sai da mão.

O painel de Aprovação mostra a contagem e a distribuição por tipo, para o
registro não ser invisível.

**Achado de brinde:** o diário denunciou um bug na primeira execução. Escolher
a capa com o editor do carrossel à vista fazia o `guardaEditor()` do
`trocaEtapa` gravar o texto **antigo** por cima — a capa escolhida sumia sem
erro nenhum. Apareceu no diário como uma "reescrita" que ninguém tinha feito.

## Publicar do celular

No telefone, **baixar é o caminho errado** — e foi o que eu entreguei duas
vezes antes de descobrir. Três limites, todos reais:

1. `<a download>` num HTML aberto do gerenciador de arquivos **não dispara** em
   iOS nem em Android. O botão da página de fallback era inerte no celular.
2. O canal de download **corta depois de ~6 confirmações seguidas**. Nove
   arquivos separados não passam.
3. `.zip` **não é entregável em nenhuma configuração**: a allowlist é
   `gif png jpg jpeg webp mp4 webm txt json md` mais
   `docx pptx epub csv ttf html svg pdf` quando habilitada. Zip não está em
   nenhuma das duas — mas **`docx` está, e um .docx É um ZIP** (ver abaixo).

Então a etapa Aprovação abre com o cartão **Publicar do celular**, que não
baixa nada:

| | |
|---|---|
| **Um toque** | `navigator.share({files})` abre a folha nativa com as 9 juntas → *Salvar imagens* |
| **Plano B** | as 9 estão na tela: segurar → *Adicionar às Fotos* |
| **Legenda** | um toque copia; sem permissão de área de transferência, abre o texto já selecionado |

### O detalhe que decide se funciona

`navigator.share` exige gesto do usuário e **perde o gesto se houver `await`
antes dele**. Gerar nove slides leva segundos, então chamar `share` depois de
gerar falha sempre.

Por isso as imagens são geradas **sozinhas ao abrir a Aprovação**, antes de
qualquer clique, e ficam num cache amarrado à peça e ao texto. Quando o botão
acende, ele já tem os `File` na mão e o share sai limpo do próprio toque.

As imagens entram como `data:` e não `blob:` — o menu de segurar do iOS oferece
*Adicionar às Fotos* no data URL e nem sempre no blob.

### A grade que não encolhia

No celular a página vazava para 2052px e o navegador afastava tudo para caber.
Causa: `grid-template-columns:1fr`. O mínimo de uma faixa `1fr` é `auto`, ou
seja o **min-content** do que está dentro — bastava um bloco largo para a
coluna crescer. `minmax(0,1fr)` resolve.

Abaixo de 700px o Estúdio deixa de ser mesa de trabalho e vira tela de
publicar: `#cartao-cel` recebe `order:-1` e sobe para o topo da Aprovação.
