# Padrão de documentos da Expansion

Como a casa monta os documentos de cliente. Levantado em 09/09/2026 a partir
dos modelos e dos clientes vivos no Drive, depois de eu errar o padrão uma vez.

## Onde ficam

Drive → pasta de clientes (`1QpwEAr9-3tWdW3MbOjEcAZSJxtzL0bbG`). Cada cliente
tem sua pasta, numerada: `001 - JANE SAÚDE SEGUROS`, `003 - PRIME ASSESSORIA
ALPHAVILLE`, `006 - REINO CONSÓRCIO`, `007 - CLAUKIDS`, `011 - EXPANSION`.

Dentro de cada cliente: `Brutos`, `Editados`, `Banco de Imagens`,
`Material de tráfego`, `00 - INTERNO (Onboarding)`.

**Os modelos vivem na raiz da pasta de clientes:**

| Modelo | ID |
|---|---|
| `MOD - BRIEFING DE CLIENTE` | `1Z4xAzKB81xhXsyoH-ZtViZtpIyCkBBGyuyRMLOx_6kU` |
| `MOD - ROTEIRO SEMANAL` | `1U6uWEVNxXW-4jwisHvg2JjoidgtpzfDfYLWz6SgYBtg` |
| `ROTEIRO SEMANAL - MODELO` | `17qqy-C4W03FSpfH8QcPk7W1P3viDQjXbkgnilRh5WhU` |

**Antes de criar qualquer documento de cliente, abrir o modelo.** Foi o passo
que eu pulei — modelei pelo Prime em vez do modelo, e saiu fora do padrão.

## Nomes de arquivo

- Briefing: `<CLIENTE> — Briefing de Assessoria` (não "Onboarding")
- Acessos: `Acessos_<Cliente>` ou `Acessos - <Cliente>`
- Roteiros: **só o nome do perfil** — `Clau Kids Store`, `Prime Alphaville`,
  `Pontual Uniformes`. Sem data, sem prefixo, sem sufixo. É esse nome que vira
  o rótulo da guia no Google Docs

## A referência de qualidade: Clau Kids

`Clau Kids Store` (`1CKgtLBYYNTf6XBBSRh-VzFKUizGLPH-0rNKdB2-ierc`) é o padrão
a bater. O que faz esse documento funcionar:

**Desenvolvimento é narrativa corrida, não frases soltas.** Um parágrafo que a
pessoa fala inteiro. Frase por linha soa robótico na boca de quem grava.

**A história é real e específica.** "Uma mãe entrou aqui pedindo um vestido
vermelho. Eu disse não" — com o detalhe da festa da Minnie e da decoração
vermelha. Detalhe concreto convence; adjetivo não. Quando a história do cliente
não existe ainda, **abrir espaço marcado para ele contar**, nunca inventar.

**Todo roteiro tem `COMO GRAVAR`.** Quem grava, qual plano, onde a luz bate,
se o áudio vai separado, quantas tomadas. É o que faz um cliente que grava
sozinho conseguir executar.

**Criativo de tráfego leva `DESCRIÇÃO DO ANÚNCIO`** (o texto pronto para colar)
**e a mensagem pré-preenchida do WhatsApp** — que é onde a qualificação começa.

**O pilar explica o porquê.** Não é só "HYPE": é "HYPE — ESCASSEZ REAL POR
NUMERAÇÃO • O criativo que mais gera conversa, e o único que ela grava sozinha".

**Direção de cena entre colchetes**, dentro do bloco, junto da fala.

## Paleta

| Uso | Hex |
|---|---|
| Laranja da marca — subtítulo, rótulos, faixas | `#E67E22` |
| Título | `#1A1A1A` |
| Linha do framework | `#666666` |
| Tempos e hashtags | `#999999` |
| Faixa de seção e caixa do CTA | `#FFF0E0` |
| Caixa do gancho | `#FFF8F0` |
| Caixa de direção de gravação | `#F7F7F7` com borda `#999999` |

## Como publicar

HTML → `create_file` com `contentMimeType: "text/html"` na pasta do cliente. O
Drive converte para Google Docs nativo preservando cor, fundo e borda.

**Passo manual obrigatório, uma vez por documento:** no Google Docs,
`Formatar → Mudar para o formato sem páginas → OK`. Não existe API para isso.
Sem esse passo o documento fica cortado por quebra de página no celular.

**Nunca subir `.docx`** — entra como anexo e não abre direto.

## Antes de entregar

- [ ] O modelo `MOD -` foi aberto antes de escrever
- [ ] O documento equivalente já não existe (conferir `00 - INTERNO`)
- [ ] Nenhuma regra editorial do cliente foi quebrada
- [ ] Documento nomeado só com o nome do perfil, quando for roteiro
- [ ] Formato sem páginas aplicado
- [ ] A pasta está compartilhada com o cliente antes de mandar link
