# Prompt para a extensão do Chrome medir os carrosséis do Canva

> **Não precisa mais ser usado — 18/08/2026.** O Nicolas autorizou o conector do
> Canva e a medição saiu direto pela API, com precisão maior do que a leitura de
> painel que este prompt pedia. O resultado está em
> `MAQUINA/MEDIDAS-CANVA-2026-08-11.md`.
>
> Fica no repositório como registro do caminho alternativo, que continua válido
> se algum dia o conector cair: a extensão roda na máquina do Nicolas e enxerga
> o que a sessão não enxerga.

Escrito quando o conector do Canva não estava autorizado e `canva.link` era bloqueado
pelo proxy de egress — mesmo caso da plataforma da BrandsDecoded.

Cole o bloco abaixo numa conversa da extensão, **com os designs do Canva abertos**.

---

```
Você está no Chrome, com designs de carrossel meus abertos no Canva. Estes:

https://canva.link/b1nrt2tr5qv9d9c
https://canva.link/yj8p4x7zuitfwjw
https://canva.link/uk099sviwvbbogp
https://canva.link/p0rsun31ias3qll

Sua tarefa: **medir** esses designs para que outro Claude, que não consegue acessá-los,
reproduza a tipografia, o espaçamento e o enquadramento num renderizador de HTML.

## O que preciso, e por que preciso ser exato

O renderizador desenha em canvas de 1080 × 1350 px. Toda medida que você me der em px
vai direto pro CSS. Então: **número exato, não aproximação.** Clique no elemento e leia o
valor no painel do Canva, em vez de estimar por olho.

Se o design não for 1080 × 1350, me diga qual é — eu converto a escala.

## Para CADA design, e para CADA tipo de slide dentro dele

### 1. Identificação
- Nome do design e dimensão do canvas em px
- Quantos slides/páginas tem
- Que tipo de slide é cada um (capa, texto, lista, número, citação, CTA)

### 2. Tipografia — o mais importante
Para cada elemento de texto (headline, subhead, corpo, rótulo, número, CTA):

| O quê | Onde ler no Canva |
|---|---|
| Nome exato da fonte | dropdown de fonte |
| Peso / estilo | ao lado do nome (Bold, Black, Medium…) |
| Tamanho em px | campo de tamanho |
| Espaçamento entre letras | painel "Espaçamento" → Letra |
| Entrelinha | painel "Espaçamento" → Linha |
| Alinhamento | esquerda / centro / direita / justificado |
| Caixa | normal ou CAIXA ALTA |
| Cor em hex | seletor de cor |

### 3. Espaçamento e enquadramento
- **Margem de cada lado** — distância da borda do canvas até o texto, nos quatro lados
- **Distância entre blocos** — headline → corpo, corpo → próximo elemento
- **Onde o bloco de texto fica** — colado no topo, no meio, na base?
- **Largura da caixa de texto** — ocupa a largura toda ou tem recuo?

O jeito prático: clique no elemento, veja a posição X/Y e a largura/altura que o Canva
mostra. Esses quatro números resolvem tudo.

### 4. Imagem
- Ocupa a tela inteira, ou é uma caixa dentro do slide?
- Se for caixa: posição, tamanho, e se tem canto arredondado (quantos px)
- Tem escurecimento/gradiente por cima? Qual a intensidade?
- O texto fica sobre a imagem ou fora dela?

### 5. Elementos fixos
Aparecem em todos os slides? Liste cada um com posição e tamanho: logo, @, número de
página, linha, borda, marca d'água, botão.

### 6. Destaque
Como uma palavra ganha ênfase — cor diferente, fundo de marca-texto, negrito, sublinhado,
caixa? Qual a cor exata?

## Formato de entrega

Uma **tabela de medidas por elemento**, mais screenshot de cada tipo de slide. Assim:

| Design | Slide | Elemento | Fonte | Peso | Tam. | Tracking | Entrelinha | Alinh. | Cor | X | Y | L | A |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| … | capa | headline | … | … | …px | …px | … | … | #… | … | … | … | … |

Se algum valor não estiver visível no painel, escreva "não exposto" em vez de estimar.
Prefiro um campo vazio a um número inventado — número errado aqui vira layout errado lá.

## Fontes

No fim, liste **todas as famílias** usadas nos quatro designs, com os pesos. Preciso saber
se são fontes do Canva, do Google Fonts, ou arquivo próprio que subi — isso decide se
consigo embutir no renderizador.
```

---

## Depois

Traga a tabela e os screenshots. Com eles eu ajusto o Template 1 Meio de Funil às medidas
reais e propago a mesma régua tipográfica para os outros quatro.
