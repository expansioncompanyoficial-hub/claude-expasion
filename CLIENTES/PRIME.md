# Prime Assessoria de Crédito Imobiliário — Alphaville

Cliente-piloto do carrossel automático. Maior cliente da casa.

---

## Identidade

| Campo | Valor |
|---|---|
| Marca | Prime Assessoria de Crédito Imobiliário — unidade **Alphaville** |
| Nicho | Crédito imobiliário |
| Assinatura da marca | PRIME · ASSESSORIA IMOBILIÁRIA |
| Contatos | Laura Guimarães · José Breno |
| Outras unidades | São José dos Campos · São Bernardo (fora do piloto) |
| @ que publica (piloto) | `@prime.alphaville` — a **unidade** |
| @ da matriz | `@primeassessoria_imobiliaria` — dona do formato InfoPrime |
| Estilo visual | **Minimalista** |
| CTA padrão | "Siga a Prime" ou "Comente PRIME" |
| Slides padrão | 9 |

**Resolvido:** são duas contas reais. `@primeassessoria_imobiliaria` é a **matriz**, de onde
vem o formato InfoPrime. `@prime.alphaville` é a **unidade** e é a conta do piloto — é ela
que autoriza o acesso e de quem vem o histórico a importar.

Consequência editorial: o InfoPrime é um formato da matriz. Rodar na unidade exige combinar
com o cliente se a Alphaville replica, adapta com recorte regional, ou se o piloto usa outro
formato. **Ponto a validar antes da primeira edição.**

---

## Paleta — manual de marca oficial

Fonte: `prime-identidade/manual-de-marca.jpeg`. Estes são os valores da marca, não sugestão.

| Cor | Hex | RGB | CMYK | Pantone |
|---|---|---|---|---|
| Preto Escuro | `#191818` | 25, 24, 24 | 0, 4, 4, 90 | Black 6 C |
| Laranja Avermelhado | `#e14414` | 225, 68, 20 | 0, 70, 91, 12 | 1665 C |
| Cinza Azulado | `#9d9d9c` | 157, 157, 156 | 0, 0, 1, 38 | 4276 C |

**Fontes:** Montserrat (headline) · Poppins (corpo).

### Adaptação obrigatória ao design system da BrandsDecoded

O template do material é **Alternado Claro/Escuro**. A Prime **não é alternada — é escura**.
A peça de referência é preta do topo ao rodapé, com o laranja entrando só como acento.

Para esta marca, sobrepor o template padrão:

- **Fundo dominante:** `#191818` em praticamente todos os slides
- **Laranja `#e14414`** apenas em: números, palavra-chave da headline, eyebrow de seção,
  barra lateral de bloco e botão de CTA. **Nunca como fundo de bloco de texto.**
- **Cinza `#9d9d9c`** para rótulos, fonte citada e texto de apoio
- Slide claro, se usado, é exceção pontual — não metade do carrossel

---

## O público é o CORRETOR, não o comprador

Esta é a informação que mais muda o conteúdo, e ela está explícita na peça de referência:
a seção se chama **"O QUE MUDA PARA O CORRETOR"**.

A Prime é B2B2C. Ela não fala com quem vai comprar o imóvel — fala com o **corretor e a
imobiliária** que levam o cliente para a Prime estruturar o crédito. A dor endereçada é a
do corretor: perder venda, ou vender imóvel menor, porque o crédito do cliente não foi bem
estruturado.

O encadeamento que a peça de referência usa:

> cliente bem estruturado → compra imóvel melhor → ticket maior → **comissão maior**

Qualquer carrossel que fale com o comprador final está falando com a audiência errada.

### A tese da casa (já cravada pelo cliente)

> **"Não é só sobre conseguir crédito, é sobre extrair o máximo dele."**

Vale registrar uma tensão real: essa frase usa a construção "não é X, é Y", que o filtro
anti-slop da BrandsDecoded proíbe. **A tese do cliente ganha da régua do fornecedor.** A
proibição continua valendo para o texto que a gente escreve — não para a tese que a marca
já sustenta.

---

## O formato InfoPrime — já existe e funciona

Referência: `prime-identidade/infoprime-edicao-01-referencia.png` (Edição #01).

É um **raio-x semanal do mercado**, numerado por edição, construído em cima de notícia com
fonte nomeada. Na prática é o modo **newsroom** com a estrutura editorial da Prime por cima.
A estrutura, na ordem:

| Bloco | Conteúdo | Tratamento |
|---|---|---|
| Cabeçalho | PRIME · ASSESSORIA IMOBILIÁRIA · `INFOPRIME · EDIÇÃO #NN` | Badge laranja |
| Chapéu | `MERCADO · CRÉDITO IMOBILIÁRIO` | Caixa alta, laranja, letterspacing largo |
| Headline | Duas partes: primeira em branco, segunda em laranja | Montserrat bold, ~2–3 linhas |
| **A NOTÍCIA** | O fato, com **números em laranja** e a fonte nomeada embaixo | Barra lateral laranja |
| **A LEITURA DA PRIME** | A interpretação proprietária — o que o dado significa | Barra lateral laranja |
| **O QUE MUDA PARA O CORRETOR** | 3 a 4 bullets com seta `→` | Barra lateral laranja |
| **O INSIGHT** | A tese, em box destacado | Box com borda |
| Rodapé | `INFOPRIME · SEU RAIO-X SEMANAL DO MERCADO` + CTA | Botão laranja |

**Fonte sempre nomeada.** A edição #01 cita "Boletim ABECIP · março 2026". Isso é regra da
marca, não estilo — e conversa direto com a régua de honestidade do material.

> **[CONFERIR] Formato de saída.** A referência tem 2080×3840 px — proporção 1:1,85, mais
> alta que o 4:5 do feed do Instagram. Ou ela é peça de WhatsApp/PDF, ou é fatiada em
> slides de carrossel. Preciso saber qual antes de renderizar: muda o número de slides e
> onde o texto quebra.

---

## Régua editorial

### Compliance — crédito imobiliário

Assessoria de crédito opera num espaço com régua de publicidade própria. Estas construções
são risco e não entram sem validação do cliente:

- Promessa de **aprovação** ("financiamento aprovado", "aprovação garantida")
- **Taxa** anunciada sem condição, prazo ou faixa ("a menor taxa do mercado")
- **"Sem burocracia"**, "sem análise de crédito", "sem comprovação de renda"
- Comparação nominal com banco ou concorrente
- Número de aprovação, volume ou prazo sem fonte que o cliente confirme

Isto não é parecer jurídico. É guarda operacional: na dúvida, **marcar como ponto a
validar com o cliente antes de publicar** — nunca cravar o que não dá pra confirmar.

Nota: falar com corretor (profissional) dá mais margem técnica que falar com comprador
final — mas a peça é pública, e quem lê pode ser o comprador. A régua vale igual.

### Tom

Sóbrio, analítico, factual. A referência não usa nenhum recurso de guru: sem urgência
fabricada, sem "o banco não quer que você saiba", sem emoji, sem exclamação.

Vale a segunda pessoa quando o modo pedir (meio de funil), porque o interlocutor é um
profissional específico — o corretor. No modo topo e no newsroom, terceira pessoa.

---

## Mistura editorial

| Modo | Papel na Prime | Frequência |
|---|---|---|
| **Newsroom / InfoPrime** | Selic, FGTS, Minha Casa Minha Vida, boletim ABECIP, linha nova da Caixa. É o formato que o cliente já validou. | Semanal, + extras quando a notícia for grande |
| **Meio** — educativo | "Como funciona a portabilidade", "5 coisas que travam a aprovação do seu cliente". Fala com o corretor. Gera salvamento e direct. | 1–2 por semana |
| **Topo** — viral | Comportamento do mercado, geração que não compra imóvel, aluguel × financiamento. Traz corretor novo. | 1 por semana |

A aposta forte é o **InfoPrime**: já tem formato aprovado, cadência semanal declarada
("seu raio-x semanal") e se apoia em notícia — que é justamente o que o modo newsroom
automatiza.

---

## Histórico que importa pro fluxo

**16/07 — a Prime quase cancelou por ausência de relatório**, não por qualidade de
conteúdo. A direção pediu relatório semanal, de preferência toda segunda. Por isso o
registro de cada peça em `CARROSSEIS/` não é opcional aqui: é o insumo do relatório que
segura a conta.

**25/07 — a Prime apagou um post publicado pela Expansion**, sem avisar no grupo. Por isso
a publicação automática só dispara **depois** do aceite do cliente. Nunca antes.

---

## Arquivos de identidade

| Arquivo | O que é |
|---|---|
| `prime-identidade/manual-de-marca.jpeg` | Paleta oficial com hex, RGB, CMYK e Pantone + fontes |
| `prime-identidade/infoprime-edicao-01-referencia.png` | A peça de referência, com toda a estrutura editorial |

Ainda no Drive do cliente, a buscar quando for renderizar:
`logo.pdf` (ID `1QFn78ZPKBgq0PLtkl-pBjbvYT4DYPLte`) e
`Foto de Perfil 2024.jpeg` (ID `1mFQzfvE-slmn9QaKZRVntLuoOQpQCbzP`).

---

## Estado do piloto

| Etapa | Situação |
|---|---|
| Identidade visual | **Completa** — paleta, fontes e referência de layout |
| Público e tese | **Definidos** — corretor, não comprador |
| Ficha de cliente | 2 pontos a conferir: qual @ publica, e o formato de saída |
| Acesso ao Instagram Business | Nicolas confirmou que consegue · a executar |
| Histórico importado | Não |
| Calibração do nicho | Não existe — usando padrões emprestados |
| Publicação automática | A ligar, com disparo pelo aceite do cliente |
