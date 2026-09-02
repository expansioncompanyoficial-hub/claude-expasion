# Sistema de carrosséis da Expansion — especificação para integração

**Para:** o time que está construindo o sistema da Expansion.
**De:** o que já existe e roda hoje, neste repositório.
**Data:** 01/09/2026.

Este documento descreve **o que existe e funciona**, não o que se pretende. Onde
algo não existe, está escrito que não existe — a seção *Lacunas* é tão
importante quanto as outras.

**Convenção de referência:** cito **arquivo e nome de função**, nunca número de
linha. Este documento foi levantado por sete análises paralelas do código e cada
afirmação passou por uma verificação adversarial contra o fonte; das 47
afirmações derrubadas, a maioria era número de linha desatualizado. Linha
apodrece, nome de função não.

---

## 1. Panorama

Duas metades que produzem a mesma peça por caminhos diferentes:

| | |
|---|---|
| **Estúdio** | `ESTUDIO/prototipo.src.html` — app de página única. Interface de produção: cliente → peça → slides. Renderiza no navegador e exporta PNG/JPEG |
| **Skill** | `.claude/skills/carrossel-viral/` — geração assistida: recebe tema, devolve headlines, texto dos 18 blocos, HTML e PNGs via `scripts/render_carrossel.py` |

**As duas renderizam a mesma peça e nem sempre concordam.** Divergências
conhecidas estão na seção 11. Se o novo sistema for a terceira implementação,
ele herda esse problema — a recomendação da seção 12 é não ser a terceira.

O produto final é sempre o mesmo: **9 slides de 1080 × 1350 px**, na ordem de
publicação, mais a legenda do Instagram.

---

## 2. Modelo de dados

É o contrato mais importante. Três níveis: estado → cliente → peça.

### 2.1 Estado

```json
{ "versao": 1, "salvo_em": "2026-09-01T19:00:00.000Z", "clientes": [ ... ] }
```

`versao` é **escrito e nunca lido**. Não existe versionamento de esquema, nem
checagem de compatibilidade, nem caminho de downgrade. Se o novo sistema
precisar de versionamento — e vai precisar — ele começa do zero aí.

### 2.2 Cliente

```js
{
  id: 'expansion',                 // 6 chars base36 de Math.random(), sem checagem de colisão
  nome, handle, marca, direito, nicho,
  cta: 'DIAGNÓSTICO',              // OPCIONAL — palavra pintada no último slide
  escuro: '#000000',               // fundo dominante
  accent: '#FF9901',               // cor da ênfase e do CTA
  claro:  '#F0EEEC',
  head: 'Montserrat', body: 'Poppins',   // rótulo informativo; NÃO trocam a fonte
  logo: null,                      // null | data:URL completo, sem redução
  logoFundo: 'auto',               // 'auto' | 'claro' | 'escuro'
  grad:      '...',                // OPCIONAL — fundo do slide de destaque
  gradTexto: '...',                // OPCIONAL — degradê da ênfase na capa
  arquivado: true,                 // OPCIONAL — só existe quando true
  pecas: [ ... ]
}
```

**Campos opcionais são deletados, não zerados.** `zoom` só existe quando > 1;
`arquivado` some com `delete` em vez de virar `false`. Um consumidor que
distinga `undefined` de `false` lê o estado errado.

`head` e `body` **não trocam fonte nenhuma** — alimentam só um rótulo no painel.
As fontes reais estão fixas no CSS: Montserrat, Poppins, Source Serif 4.

### 2.3 Peça

```js
{
  id, nome,
  tpl: 'meio',        // 'meio' | 'exp02' | 'exp03' | 'exp04' | 'twitter'
  txt: 'texto 1 - ...\ntexto 2 - ...',   // string única, 18 linhas
  capas: ['...'],     // headlines geradas, COM marcação
  capa: null,         // uma das strings de `capas`, COM marcação
  legenda: '',
  scrim: 'medio',     // 'leve' | 'medio' | 'forte' — padrão da peça
  status: 'rascunho', // 'rascunho' → 'revisao' → 'publicado'
  ajustes: {},        // criado sob demanda, chave = índice do slide
  diario: []          // criado sob demanda
}
```

**O `txt` é a fonte da verdade.** `capa`, `capas` e `legenda` são satélites.
Escolher uma capa não marca um favorito: **reescreve a linha `texto 1`**. Quem
sincronizar `capa` sem sincronizar `txt` publica outra coisa.

**A capa entra no `texto 1` COM os asteriscos.** Tirar a marcação no caminho faz
a capa chegar em branco chapado e o degradê da marca sumir — e nada fica
vermelho, porque o texto está correto, só perdeu o realce. Esse defeito já
aconteceu aqui.

Formato do texto: linhas `texto N - conteúdo`. `parse()` devolve um array plano
de 18 blocos; `par(i)` reagrupa em `{h, c}` por slide. Ímpar = headline, par =
corpo.

### 2.4 `ajustes[i]` — exceções por slide

```js
{
  foco: '50% 50%',   // sempre presente; 'X% Y%', 1 casa, 0..100
  img:  'data:image/jpeg;base64,...',  // OPCIONAL — JPEG reduzido a 1000px, q 0,82
  zoom: 1.75,        // OPCIONAL — só quando > 1; 1,00 a 4,00
  pos:  'topo',      // OPCIONAL — 'topo'|'meio'|'base'|'fundo'|'nada'
  scrim:'forte',     // OPCIONAL
  tpl:  'exp03',     // OPCIONAL — template só deste slide
  h1: 84, corpo: 38  // OPCIONAL — tamanho PEDIDO, 18..180, passo 2
}
```

É **objeto com chaves numéricas**, não array. Depois do round-trip por JSON as
chaves viram string. Funciona no JS por coerção; em outra linguagem, trate como
string.

**`h1` e `corpo` são o pedido, não o desenhado.** O auto-ajuste ainda encolhe, e
o Estúdio **não grava o valor desenhado**. Renderizar `h1` literalmente estoura
o slide.

---

## 3. A régua de layout

### 3.1 O que é medido no Canva

Só o **EXPANSION 01**. Vale reproduzir exatamente:

| | |
|---|---|
| Canvas | 1080 × 1350 px |
| Margem lateral · largura útil | 108 px · 864 px |
| Caixa de imagem | 864 × 442,2 px, canto 13 px |
| Barra superior | y 49,7 · x 56,1 · 15,8 px bold · lh 1,4 · uppercase |
| Capa: chip · headline | chip em y 748,3 · headline `bottom:110,3` · 111,5 px bold · lh 0,92 · tracking −0,087em · centro |
| Headline interna | 75,7 px · 600 · lh 1,06 · tracking −0,056em · esquerda |
| Corpo | 45,4 px · lh 0,96 · tracking −0,033em — **exceto** slide claro sem foto de fundo → 36,6 px |

`GRADE` — o `top` de cada bloco conforme onde a foto entra:

```
topo  { foto 207,9 · h1 717,0 · corpo 1005,8 }
meio  { h1 161,0 · foto 453,9 · corpo 951,1 }
base  { h1 230,5 · corpo 534,9 · foto 799,8 }
nada  { h1 298,9 · corpo 641,9 }
```

Blocos são posicionados por `top` absoluto, **não em fluxo**. `tetos()` deriva a
altura máxima de cada bloco a partir do `top` do vizinho, com `BASE_Y = 1242` e
`FOLGA = 24`.

### 3.2 O que é modelo, não medição

**EXPANSION 03, 04 e TWITTER não têm medição do Canva.** São derivados da régua
do 01. Trate os números deles como provisórios.

**EXPANSION 02 foi corrigido pelo uso, não pelo Canva.** O modelo original dizia
88,3 px de título; em 11 ajustes à mão a mediana pedida foi 61, e medindo sem
nenhum tamanho pedido o auto-ajuste desenhava nos 88 cheios — ou seja, não era o
auto-ajuste, era o padrão. Hoje: **título 64 px, corpo 26 px**.

### 3.3 Auto-ajuste

`fitBlocos` encolhe título até o piso de **34 px** e corpo até **22 px**, dentro
do teto do próprio bloco. `fitCapa` encolhe a capa até **62 px** com altura
máxima de 440 px, e a área sangrada até 620 px de altura.

A conferência reprova abaixo de **PISO_H1 = 52** e **PISO_CORPO = 30**: aí não é
mais questão de caber, é ilegível no feed.

> **Armadilha que custou duas vezes:** número de layout escrito em dois lugares
> **sempre** volta a divergir. O padrão do corpo estava no render e no painel;
> os dois discordavam e saía um aviso falso de "encolhido para 37px". Consertei
> roteando tudo por `padraoCorpo()` — mas só no ramo do meio de funil. Dois
> meses depois, a família sangrada ainda tinha o `31` cravado no HTML, então a
> calibração que baixou o corpo para 26 mudava só o rótulo e o slide seguia
> desenhando 31. **Um lugar só, sem exceção.**

---

## 4. Régua editorial: ênfase e cor

### 4.1 A marcação

`*trecho*` troca a **cor**. `**trecho**` mantém a cor e sobe o **peso**. Os dois
convivem no mesmo parágrafo. A regra de dois asteriscos é aplicada **primeiro**,
senão a de um asterisco come metade do par.

### 4.2 A cor sai do fundo, não do gosto

| Superfície | Ênfase |
|---|---|
| capa | degradê da marca (`gradTexto`) se houver; senão `accent` chapado |
| corpo dos sangrados (02/03/04) | `accent` chapado |
| slide de destaque (fundo `accent`) | **branco em bold** — accent sobre accent some |
| escuro · claro · foto de fundo | `accent` chapado |
| EXPANSION TWITTER | **só peso, sem cor** — tweet não tem cor de marca no texto |

**`gradTexto` é ativo de marca e não tem padrão global.** Aplicar o laranja da
Expansion por cima da cor de outra marca é invenção, não padrão.

### 4.3 A dosagem, medida sobre 10 peças reais

| Papel | Trechos |
|---|---|
| capa | **exatamente 1** — 10 de 10 peças |
| headline interna | 0 ou 1 — nunca 2 (0 em 10 casos, 1 em 70, de 80) |
| corpo | 1 ou 2 — nunca 3 (0 em 11, 1 em 18, 2 em 61, de 90) |
| fonte ("Fonte: CNC, 2026") | nunca |
| título do último slide | nunca |

O que se marca: **número, data, prazo** — o que fica na cabeça depois que a
pessoa fecha o carrossel. Nunca o adjetivo. `*76,48% no mercado nacional*` fica;
`*muito mais caro*` não. E o mesmo dado não se marca duas vezes no mesmo slide.

### 4.4 O último slide

A chamada é **texto normal**, com só a palavra de comando em cor e bold. O
parágrafo inteiro em laranja não destaca o CTA de nada — realce só existe contra
alguma coisa. A palavra vem da **ficha** (`cta`), não do texto: pega mesmo que
quem escreveu tenha esquecido de marcar.

### 4.5 Densidade do corpo

| Arquétipo | Caracteres |
|---|---|
| topo · base | 230 a 260 |
| meio | 280 a 310 |
| sem foto | 420 a 520 |

Headline de capa: faixa de trabalho **45 a 70 caracteres**; acima de 70 avisa,
acima de 85 reprova. (O piso de 45 é orientação editorial — no código só os
limiares de 70 e 85 são verificados.)

---

## 5. Imagem: enquadramento

Dois valores por slide, e é o **par** que faz funcionar:

```
foco  → object-position: X% Y%   (contínuo, 0..100)
zoom  → transform: scale(z) com transform-origin NO MESMO PONTO do foco
```

**O invariante:** escalar por z ≥ 1 em torno de um ponto *dentro* do retângulo
sempre devolve um retângulo que contém o original. Logo, para qualquer foco e
qualquer zoom ≥ 1, a caixa continua coberta — **nenhuma combinação abre canto
vazio**. Não depende do tamanho nem da proporção da foto.

E é o mesmo mecanismo que prende o ponto focal: como `object-position: X% Y%`
alinha o ponto X%,Y% da *imagem* com o ponto X%,Y% da *caixa*, escalar em torno
desse mesmo ponto deixa o assunto parado.

**Verificado, não deduzido:** 264 combinações (4 proporções de foto × 11 focos ×
6 zooms) rasterizadas pelo caminho real de exportação e conferidas pixel a pixel
nos cantos — zero buracos. Com um alvo de 24 px a 15% da altura da fonte, ele
fica em 15,0% da caixa nos zooms 1 · 1,5 · 2,5 · 4.

Escurecimento (`scrim`) tem **duas famílias**, porque o texto cai em lugares
diferentes: na capa o véu sobe do pé (a metade de cima continua sendo imagem);
num slide interno o véu é parelho.

---

## 6. Renderização e exportação

O PNG é feito **dentro da própria página**: o slide é serializado num
`<svg><foreignObject>`, com **todo o CSS da página inline** (incluindo as
`@font-face`), e rasterizado num canvas de 1080 × 1350.

Duas armadilhas que já custaram rodadas inteiras:

1. **`blob:` contamina o canvas** e o `toBlob` passa a recusar. Tem de ser
   `data:image/svg+xml;charset=utf-8,` + `encodeURIComponent`.
2. **Dentro do `foreignObject` não existe folha de estilo herdada.** Sem as
   `@font-face` embutidas junto, o texto sai em fonte de sistema — erro
   silencioso.

Formatos: **PNG** (sem perda) e **JPEG a 95%**. Medido slide a slide: o JPEG
ocupa **20% do tamanho** com diferença média de **1 em 255**. JPEG não tem canal
alfa — sem `fillRect` branco antes do `drawImage`, transparência vira **preto**.

### Os limites da plataforma (relevantes se o novo sistema também for web)

| | |
|---|---|
| Extensões aceitas no download | `gif png jpg jpeg webp mp4 webm txt json md` + `docx pptx epub csv ttf html svg pdf` quando habilitadas |
| **`.zip` não é entregável** | não está em nenhuma das listas, em nenhuma configuração |
| Teto | **16 MB por arquivo** |
| Corte | ~**6 confirmações seguidas** — 9 arquivos separados não passam de uma vez |

Contornos em uso: o pacote de arquivo único sai como **`.docx`**, que é um
pacote ZIP por dentro (renomeia para `.zip` e descompacta); e o download slide a
slide **guarda onde parou** e continua na segunda leva.

---

## 7. Diário de decisões — o que torna a automação possível

**Esta é a parte que o novo sistema mais precisa herdar.**

O estado salvo guarda **como a peça ficou**. Isso não ensina *como ela ficou
assim*: não diz que a headline escolhida foi a terceira de dez, que a foto subiu
18 pontos depois de entrar, que o título precisou de −6 px. **Sem esse rastro,
ver cinquenta peças prontas ensina o mesmo que ver uma.**

```js
{ q: 'tam', em: '2026-09-01T19:00:00.000Z', s: 3,
  campo: 'h1', de: 88, para: 61, padrao: 88 }
```

| `q` | O que responde |
|---|---|
| `capa` | qual headline venceu, **entre quantas**, em que posição, e quais foram **recusadas** |
| `texto` · `legenda` | só as linhas que mudaram, com antes e depois |
| `tam` | tamanho pedido **e o que a máquina tinha proposto** — é onde a régua erra |
| `foco` · `zoom` · `centraliza` | o líquido do gesto, não cada quadro |
| `pos` · `scrim` · `imagem` | onde a foto entra, quanto escurece, quando entra e sai |
| `tpl` | troca de template, por slide ou da peça |
| `status` | quando foi ao cliente e quando foi ao ar |

Três decisões de desenho que fazem o dado ser confiável:

1. **Fusão de 4 s.** Eventos do mesmo campo e slide em menos de 4 000 ms viram
   um. Dez toques no `+` são uma decisão, não dez. Sem isso vira log de cliques.
2. **Fusão que zera some.** Ir e voltar não é decisão.
3. **Teto de 300 eventos por peça**, e no máximo 20 linhas por evento de texto.

Custo: 7 decisões reais = **773 bytes**. É irrelevante perto do que ensina.

### Calibração

`leCalibracao()` lê o diário de todas as peças do cliente e devolve onde a régua
e a mão discordam. Duas regras que a tornam honesta:

- **Só fala com base:** mínimo de **4 ajustes** no mesmo papel. Apresentar ruído
  como conclusão é pior que ficar calado.
- **Reconstrói o template de cada slide na linha do tempo.** A peça troca de
  template no meio; classificar pelo template *atual* dá conclusão errada com
  cara de dado. A primeira versão desta análise errou exatamente assim.
- **Mediana, não média.** Um ajuste extremo não move a régua.

Exemplo real, sobre 132 decisões:

```
capa · título          112 → 85px  (-27, n=8)
EXPANSION 02 · título   88 → 61px  (-27, n=11)
EXPANSION 02 · corpo    31 → 25px   (-6, n=9)
```

---

## 8. Entrada: ficha do cliente

`CLIENTES/<CLIENTE>/FICHA-CARROSSEL-<CLIENTE>.md` é o que a skill lê para não
repedir briefing: marca, nicho, paleta, fontes, assinatura, palavra do CTA, e os
campos de geração de capa. O resolvedor **nunca inventa identidade**: campo
ausente volta vazio e entra numa lista `faltando`.

Três modos, com régua editorial própria — inclusive anti-slop, que **se
contradiz entre eles**: `topo` (viral), `meio` (educativo), `newsroom` (capa de
notícia).

**Regra de origem do dado:** os números de referência (+155% Brasil, +119%
Fim/Morte) são da conta do Leonardo Varricchio, **não do cliente**. Enquanto não
existir `CALIBRACAO/<nicho>.md`, a skill usa esses padrões **e avisa que são
emprestados**. Herde essa honestidade.

---

## 9. Pipeline de fundo de capa

`.claude/skills/carrossel-viral/scripts/capas/` — 13 módulos, 61 testes verdes.
Entra **entre a headline aprovada e a composição da capa**. Devolve um arquivo
que o renderizador usa como fundo do slide 1.

Três regras que sustentam o módulo:

1. **Fundo e capa final são entregas diferentes.** O fundo não tem headline, nem
   logo, nem texto.
2. **A imagem se cria a partir do carrossel inteiro, não da headline.** Uma capa
   feita só com a manchete acerta a palavra e erra o assunto.
3. **QA técnico e QA semântico são coisas separadas.** Nitidez e contraste a
   máquina mede; se a metáfora comunica o problema, não — e o sistema devolve
   isso como **pergunta em aberto**, nunca como nota calculada.

O prompt de geração é barrado se a headline aprovada vazar para dentro dele —
imagem com texto é o erro clássico do gerador.

---

## 10. Portões de qualidade

`conferir()` separa o que dá para arrumar sozinho do que é decisão editorial:
tamanho pedido que não cabe é devolvido ao padrão automaticamente; texto longo
demais é apontado com o número do slide e fica para a pessoa.

Trava por etapa (`estado()`): legenda exige carrossel escrito; aprovação exige
legenda; desempenho exige `status === 'publicado'`. **Travar sem dizer por quê é
o que faz gente clicar duas vezes** — toda trava carrega o motivo.

O aceite do cliente é o que dispara a publicação. **Nunca a geração.**

---

## 11. Divergências conhecidas entre as duas metades

Levantadas na verificação. Se o novo sistema for a terceira implementação,
herda todas:

1. **`foco` é ignorado no renderizador Python.** `fundo_foto()` e
   `slide_sangrado()` não emitem `background-position`. O enquadramento feito no
   Estúdio **se perde** se a peça for renderizada pelo Python.
2. **O degradê de texto vaza para slides internos no Python.** Na família
   sangrada todo slide cai em `slide_sangrado()`, contra o invariante de que o
   degradê só entra na capa.
3. **A regra do CTA não vale no EXPANSION TWITTER** em nenhum dos dois
   renderizadores, embora a régua editorial diga que vale em qualquer template.
4. **Nomenclatura divergente:** a ficha e a skill usam `gradiente_texto`; o
   Estúdio usa `gradTexto`.
5. **Tipos de slide que só existem no Python** (`bullets`, `stat`, `declaracao`,
   `tag`) não existem no Estúdio.

---

## 12. Lacunas — o que NÃO existe

Ordenadas pelo que mais importa para quem vai integrar:

1. **Não existe backend, API, banco nem endpoint.** O estado inteiro é um JSON
   dentro do HTML, e sincronizar significa republicar a página. Não há como um
   sistema externo ler ou escrever sem reimplementar o formato.
2. **Não existe esquema formal, validação nem tipos** — nem JSON Schema, nem
   TypeScript, nem dataclass. O contrato da seção 2 foi lido do código.
3. **Não existe versionamento de esquema.** `versao` é escrito e nunca lido.
4. **Não existe migração automática ao carregar.** As migrações moram em
   `mesclar.py` e só rodam quando alguém as executa à mão. Renomear um id de
   template sem migrar faz as peças caírem no template padrão **sem erro
   nenhum** — o trabalho parece perdido.
5. **Ids são 6 caracteres de `Math.random()` sem checagem de colisão.**
6. **Não existe relação entre a peça do Estúdio e a ficha em `CARROSSEIS/`.**
7. **Não existe nenhuma métrica de desempenho no modelo.** A etapa Desempenho é
   uma tela travada. O diário ensina o **gosto**; não ensina **o que funcionou**.
8. **Não existe teste automatizado do Estúdio.** `tests/` cobre só o pipeline de
   capa (61 testes). Régua, auto-ajuste e render são verificados por scripts de
   navegador escritos caso a caso.
9. **Não existe medição do Canva** para EXPANSION 03, 04 e TWITTER.
10. **Não existe a capa newsroom no Estúdio**, embora a medição registre dois
    gêneros de capa (impacto 111,5 bold e manchete 79,6 serifa).

---

## 13. Recomendações para a integração

**1. Não seja a terceira implementação da régua.** Já existem duas que
divergem. Extraia a régua para um **artefato de dados** (JSON) que os três
consumam, ou eleja um renderizador e faça os outros chamarem esse.

**2. Comece pelo modelo de dados da seção 2, e dê a ele o que falta:** esquema
declarado, validação, versão que é lida, ids estáveis e migração no
carregamento. São as cinco lacunas mais caras.

**3. Herde o diário antes de herdar o resto.** É o que torna a automação
possível, e é barato. Um sistema que só guarda o resultado terá o mesmo problema
que este teve: cinquenta peças prontas ensinam o mesmo que uma.

**4. Herde os invariantes, não só os números.** Os números mudam com calibração;
os invariantes são o que impede a peça de sair errada — a marcação que sobrevive
à aprovação da capa, o par foco/zoom que não abre buraco, a cor que sai do fundo,
o número de layout num lugar só.

**5. Cuidado com o que "é medido".** Só o EXPANSION 01 é medido no Canva. Tudo
o mais é modelo ou calibração pelo uso, e o documento diz qual é qual. Tratar
modelo como medição foi o erro que fez o EXPANSION 02 nascer 30% grande.

**6. Feche o laço do desempenho.** Sem salvamentos e alcance voltando do
Instagram, o sistema aprende a imitar quem opera, não a acertar melhor que ele.
