# PADRONIZAÇÃO DA ENTRADA DE MATERIAL — CLIENTES ATIVOS
**Data:** 18/09/2026 · **Conta:** expansioncompany.oficial@gmail.com
**Escopo:** `Expansion Company › Assessoria › Clientes` — 6 clientes ativos
**Objetivo:** deixar cada `Brutos` pronto para receber upload num padrão que a
automação do OS Expansion consiga ler (cliente · data · tipo) direto da pasta.

**Executado em duas rodadas:** 39 renomeações · 43 itens criados (37 pastas +
6 documentos) · 5 arquivos movidos. Nada foi apagado.

---

# 1. ESTRUTURA-ALVO

```
Nº NOME DO CLIENTE/
├── Documentos/
│   ├── Contrato/          contrato assinado + aditivos
│   └── Onboarding/        base da estratégia e dos roteiros
├── Brutos/
│   ├── ROTEIROS 2026-09/
│   │   ├── Roteiros 2026-09      (doc de referência)
│   │   ├── Orgânico/  › Roteiro 01, Roteiro 02, …
│   │   └── Tráfego/   › Tráfego 01, Tráfego 02, …
│   └── AVULSOS 2026-09/
│       └── 2026-09-18 Tema do que gravou/
├── Editados/
├── Banco de Imagens/
└── 00 - Interno/
```

**Regra de nome** (a automação lê a PASTA, não o arquivo): mês sempre `AAAA-MM`,
data sempre `AAAA-MM-DD`, numeração com dois dígitos, nunca barra `/` no nome,
nunca espaço no começo ou no fim.

---

# 2. ESTADO ANTES

| Cliente | Documentos | Brutos | Editados | Banco de Imagens | 00 - Interno |
|---|---|---|---|---|---|
| 001 - JANE SAÚDE SEGUROS | ✅ | ✅ | `Editados (Organico & tráfego)` | ❌ | ❌ |
| 003 - PRIME ASSESSORIA ALPHAVILLE | ❌ | ✅ | `Materiais finalizados` | `Banco de imagens` | ❌ |
| 007 - CLAUKIDS | ❌ | ✅ | ✅ | `Banco Imagens ` | ❌ |
| Pontual Uniformes | ✅ | ✅ | ✅ | ✅ | `00 - INTERNO (Onboarding)` |
| MAISON GALERIA | ✅ | ✅ | ✅ | ✅ | ❌ |
| Estilo Menina | ✅ | `Brutos ` | ✅ | `Banco de Materiais` | ❌ |

**Nenhum dos 6 tinha pasta de mês em `Brutos`.** Dois achados que definiram o plano:

- **A Pontual já tinha inventado o padrão** — `Roteiros SET/09 (GERAL) › Orgânico /
  Tráfego pago › Roteiro 01…08 / Tráfego 01…04`. Estrutura certa, rótulo de mês
  errado, e uma **barra literal no nome da pasta**.
- **A Maison usa outro modelo** — organiza por data de gravação (`2026-09-17`) e
  chama de `Criativo N` o que o padrão chama de `Tráfego N`.

Fora do escopo: `011 -  EXPANSION ` (material da própria agência, decidido deixar
fora da automação), `Clientes inativos` (18 pastas) e a pasta `CONTRATOS`, criada
em 14/07 e **vazia desde então**, solta no mesmo nível dos clientes.

---

# 3. O QUE FOI FEITO

## 3.1 Renomeações (13) — nenhum arquivo mudou de lugar

| Cliente | De | Para |
|---|---|---|
| Jane | `Editados (Organico & tráfego)` | `Editados` |
| Jane | `Documentos/Contrato Jane` | `Contrato` |
| Jane | `Documentos/Briefing` | `Onboarding` |
| Prime | `Materiais finalizados` | `Editados` |
| Prime | `Banco de imagens` | `Banco de Imagens` |
| ClauKids | `Banco Imagens ` | `Banco de Imagens` |
| Pontual | `00 - INTERNO (Onboarding)` | `00 - Interno` |
| Pontual | `Brutos/Roteiros SET/09 (GERAL)` | `ROTEIROS 2026-09` |
| Pontual | `Orgânico ` | `Orgânico` |
| Pontual | `Tráfego pago` | `Tráfego` |
| Pontual | `Roteiro 02 ` | `Roteiro 02` |
| Estilo Menina | `Brutos ` | `Brutos` |
| Estilo Menina | `Banco de Materiais` | `Banco de Imagens` |

## 3.2 Criações (43)

| Cliente | Criado |
|---|---|
| Jane | `Banco de Imagens`, `00 - Interno`, `ROTEIROS 2026-09` (+doc, Orgânico, Tráfego), `AVULSOS 2026-09` |
| Prime | `Documentos` (+Contrato, Onboarding), `00 - Interno`, `ROTEIROS 2026-09` (+doc, Orgânico, Tráfego), `AVULSOS 2026-09` |
| ClauKids | `Documentos` (+Contrato, Onboarding), `00 - Interno`, `ROTEIROS 2026-09` (+doc, Orgânico, Tráfego), `AVULSOS 2026-09` |
| Pontual | `Documentos/Contrato`, `AVULSOS 2026-09`, doc `Roteiros 2026-09` |
| Maison | `Documentos/Onboarding`, `00 - Interno`, `ROTEIROS 2026-09` (+doc, Orgânico, Tráfego), `AVULSOS 2026-09` |
| Estilo Menina | `Documentos/Contrato`, `Documentos/Onboarding`, `00 - Interno`, `ROTEIROS 2026-09` (+doc, Orgânico, Tráfego), `AVULSOS 2026-09` |

Os 6 documentos `Roteiros 2026-09` já nascem com as seções ORGÂNICO/TRÁFEGO e as
regras de nome escritas dentro, para quem grava consultar na hora de subir.

## 3.3 Movimentação (1)

`PONTUAL — Contrato EXP-2026-PONT-AS-01 (para assinatura)` saiu de
`00 - Interno` e foi para `Documentos/Contrato`. Foi a única movimentação
da primeira rodada. Os outros 4 documentos daquela pasta ficaram onde estavam.

## 3.4 Segunda rodada — nomes e onboarding

### Prefixo numérico nas três pastas sem número

Numeração atribuída por ordem de entrada do cliente. O maior número em uso
era `014`, então a sequência continua de `015`.

| De | Para | Entrou em |
|---|---|---|
| `Estilo Menina ` | `015 - ESTILO MENINA` | 03/09 |
| `Pontual Uniformes ` | `016 - PONTUAL UNIFORMES` | 04/09 |
| `MAISON GALERIA` | `017 - MAISON GALERIA` | 14/09 |
| `011 -  EXPANSION ` | `011 - EXPANSION` | — (pasta da própria casa) |

### Espaço sobrando no fim do nome (6)

`PRIME SÃO JOSÉ ` · `ORGANIFY DEMANDA ` · `ROTEIROS - Prime Sao José dos
Campos ` (Prime) · `Roteiros ` (ClauKids) · `(29.07) Campanha de Vacinação
AgroTools ` e `30.07 - Gravação EVENTO ` (Jane).

### Barra no nome — 16 pastas

Todas as 14 pastas com `/` em `Brutos` da ClauKids passaram para o padrão
`AAAA-MM-DD Tema`, mantendo o assunto: `Gravação 16/09` → `2026-09-16
Gravação`, `Mala viagem 2/9/26` → `2026-09-02 Mala viagem`, `Tráfego 3. 18/7`
→ `2026-07-18 Tráfego 03`, e assim por diante. **São pastas criadas pela
própria cliente** (`thegirlclaudinha@gmail.com`) — ela vai ver os nomes
mudarem. Na Pontual: `Editados/video organico 15/09` → `2026-09-15 vídeo
orgânico` e `Editados/tráfego 01` → `Tráfego 01`.

Barra no nome quebra caminho em automação, quebra o sync do Drive para
desktop e quebra qualquer regra que leia o caminho. Era o achado mais grave
de nomenclatura.

### Documentos de onboarding para dentro de `Documentos/Onboarding` (4)

`Onboarding_PrimeAlphaville` · `Onboarding - ClauKids` · `Onboarding -
ClauKids (Atualizado - call 10-07)` · `Onboarding - Estilo Menina`.

Movidos só estes: são os únicos cuja pasta de destino é inequívoca. Roteiros,
acessos, inspirações e demais documentos soltos continuam onde estavam.

---

# 4. CONFERÊNCIA

Mapeamento e conferência independentes: 18 agentes na varredura inicial (457
chamadas ao Drive), 6 na conferência final (127 chamadas). Cada mapa foi
reconferido por um segundo agente que relistou tudo do zero.

**Resultado:** os 6 clientes retornaram `estruturaCompleta = true` e
`nadaSePerdeu = true`. Nenhuma pasta antiga sumiu, nenhuma renomeação esvaziou
nada, nenhuma pasta foi duplicada pela padronização, e os 6 documentos de
referência estão preenchidos.

**Na varredura inicial nenhum ID divergiu** entre os dois agentes de cada cliente.
As correções da conferência foram sobre contagens em pastas fundas — a maior
delas: a pasta `01 — Fotos` da Jane tem no mínimo 106 fotos, não 100, e
`Brutos/30.07 - Gravação EVENTO /00 - Editados/Fotos editadas` guarda mais de
cem JPGs finalizados dentro de `Brutos`.

---

# 5. O QUE PRECISA DE DECISÃO HUMANA

## 5.1 Bloqueadores comerciais

1. **Prime Alphaville e ClauKids estão ativos sem contrato nenhum no Drive.**
   Varredura completa das duas árvores: nenhum PDF, nenhum arquivo com
   "contrato", "aditivo", "proposta" ou "assinado" no nome. A regra da casa é que
   o contrato seja anexado **antes** de o cliente virar ativo. As pastas
   `Documentos/Contrato` já existem, vazias, esperando.
2. **O contrato da Pontual é a via `(para assinatura)`** — a via assinada não
   está em lugar nenhum da pasta do cliente.

## 5.2 Migração de conteúdo — não foi feita de propósito

A estrutura nova está montada, mas **o material histórico continua onde estava**.
Mover exige confirmação sua, caso a caso:

| Cliente | O que continua fora da estrutura nova |
|---|---|
| Maison | Todo o bruto real está em `2026-09-16` e `2026-09-17` (13 pastas de peça) |
| Estilo Menina | 5 pastas `Roteiro NN - Tráfego` soltas na raiz de `Brutos` |
| ClauKids | 18 Google Docs soltos na raiz do cliente, incluindo 2 de onboarding |
| Prime | `Onboarding_PrimeAlphaville` e `Acessos_PrimeAlphaville` soltos na raiz |
| Estilo Menina | 8 Google Docs soltos em `Documentos`, incluindo `Onboarding - Estilo Menina` |

## 5.3 Pastas de função ambígua

- **Jane — `Materiais (vídeos & fotos)`**: 5ª pasta de nível 1, com 1 vídeo
  finalizado. Não dava para afirmar que é `Banco de Imagens` nem `Editados`, então
  criei `Banco de Imagens` vazia ao lado. Hoje convivem três pastas de material.
- **Prime — `Material de tráfego`** e **`Roteiros`** no nível 1, fora do padrão.
- **ClauKids — `Roteiros `** e **`TRAFÉGO PAGO`**: as duas vazias desde julho.
- **Pontual — `CAMADAS`** dentro de `ROTEIROS 2026-09`, e `Documentos` com
  `Roteiros`, `Base de Clientes` e `Tráfego Estratégia` além do padrão.

## 5.4 Nomes — resolvido na segunda rodada, menos o que segue

Prefixo numérico, espaços sobrando no nível 1 e **todas** as barras foram
corrigidos (ver 3.4). Continuam abertos:

- **ClauKids: 4 documentos com o título idêntico `Clau Kids Store`**, criados em
  01/09, 08/09, 15/09 e 18/09. Impossível saber qual é o vigente sem abrir.
- **Pontual**: dois docs `Pontual Uniformes` iguais em `Documentos/Roteiros`, e
  dois `PONTUAL × EXPANSION — Estratégia e Cronograma` em `Documentos/Onboarding`.
- Espaço no fim em pastas fundas de `Brutos` da Maison (`Roteiro 3 - trinta
  peças, três combinações `, entre outras) e em `Banco de Imagens/Takes &
  Fotos (Geral)`.
- **Maison**: numeração de um dígito (`Roteiro 6`) onde o padrão pede dois.
- **ClauKids**: `Gravação 29.07.2026` e `Oi` (vazias, a segunda criada pela
  cliente) e `TRAFÉGO PAGO` (vazia, com o acento no lugar errado).

## 5.5 Estruturais

- **`PRIME SÃO JOSÉ `** está aninhada dentro da Prime Alphaville, com material de
  outra unidade. Vira cliente próprio ou continua aninhada?
- **`CONTRATOS`** vazia no nível dos clientes: a automação que varrer `Clientes`
  vai lê-la como se fosse um cliente.
- **Pontual**: em `Orgânico` existem Roteiro 01 a 05, 07 e 08 — **não existe o 06**.
- **Maison**: o time usa `Criativo N` e um dígito só (`Roteiro 6`). O padrão pede
  `Tráfego NN` com dois dígitos.

---

# 6. TAXONOMIA ABANDONADA

`AUDITORIA-DRIVE-EXPANSION-2026-07-26.md` propôs outra árvore
(`20 CLIENTES › 2X NOME › 21.3 Brutos`, `10 COMERCIAL › 12 Contratos ATIVOS`),
que nunca foi implementada. A estrutura deste documento a substitui. Fica o
registro para não se tentar seguir as duas.

---

# 7. TERCEIRA RODADA — VERIFICAÇÃO (execução autônoma)

Rodada pedida em modo autônomo, com a regra "só criar, nunca mover, renomear
ou apagar".

**Resultado: zero pastas criadas.** A verificação ao vivo dos 6 clientes
mostrou a estrutura-alvo já completa, com a grafia exata — as duas rodadas
anteriores já tinham entregue tudo. Criar qualquer item teria gerado pasta
duplicada, que é o oposto do objetivo.

Conferido ao vivo, por consulta direta ao Drive:

| Verificação | Resultado |
|---|---|
| 5 pastas de nível 1 nos 6 clientes | 30/30 presentes |
| `Documentos/Contrato` e `Documentos/Onboarding` | 12/12 presentes |
| `Brutos/ROTEIROS 2026-09` e `Brutos/AVULSOS 2026-09` | 12/12 presentes |
| `Orgânico` e `Tráfego` dentro de cada mês | 12/12 presentes |

**Nada foi movido, renomeado ou apagado nesta rodada.**

## Entregue: o mapa como Google Doc

`MAPA DO DRIVE — Clientes — 2026-09-18`, salvo dentro da pasta `Clientes`
(ID `1aTelw5o3McpxeUnAFApyXLWr2yGtVI6HAXm-r8Yidqs`). Traz o padrão como
manual da casa, os IDs de cada cliente — pasta, `Brutos`, `Documentos`,
`ROTEIROS 2026-09` e `AVULSOS 2026-09`, que é o que a automação do
OS Expansion precisa para casar por ID e não por nome — e a seção
"PRECISA DE MÃO HUMANA".

## Uma divergência que o documento registra

A regra desta rodada pedia, para estrutura divergente, criar a pasta padrão
**vazia ao lado**. Isso vale para a Maison, e foi o que aconteceu. **Não vale
para a Pontual:** o `ROTEIROS 2026-09` dela não é pasta nova — é a antiga
`Roteiros SET/09 (GERAL)` renomeada na primeira rodada, e já tem material
dentro. Criar uma segunda pasta com o mesmo nome no mesmo `Brutos` seria
duplicata, então não foi criada. O `CAMADAS` que mora lá dentro segue
pendente de migração manual.
