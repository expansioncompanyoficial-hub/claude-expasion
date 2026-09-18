# PADRONIZAÇÃO DA ENTRADA DE MATERIAL — CLIENTES ATIVOS
**Data:** 18/09/2026 · **Conta:** expansioncompany.oficial@gmail.com
**Escopo:** `Expansion Company › Assessoria › Clientes` — 6 clientes ativos
**Objetivo:** deixar cada `Brutos` pronto para receber upload num padrão que a
automação do OS Expansion consiga ler (cliente · data · tipo) direto da pasta.

**Executado:** 13 renomeações · 43 itens criados (37 pastas + 6 documentos) ·
**1 arquivo movido** (o único autorizado). Nada foi apagado.

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
autorizada. Os outros 4 documentos daquela pasta ficaram onde estavam.

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

## 5.4 Nomes que quebram a automação

- **3 clientes sem prefixo numérico**: Pontual Uniformes, MAISON GALERIA,
  Estilo Menina. O maior número em uso é `014`, então os próximos livres são
  `015`, `016`, `017`.
- **Espaço no fim do nome da própria pasta do cliente**: `Pontual Uniformes `,
  `Estilo Menina `, `011 -  EXPANSION ` (este com dois espaços após o hífen).
- **Barra no nome**: `Editados/video organico 15/09` na Pontual;
  `Brutos/Gravação 16/09`, `Dia cliente 14/9/26`, `Mala viagem 2/9/26` e outras
  na ClauKids.
- Espaço no fim em pastas de `Brutos` da Jane, da Prime e da Maison.
- **ClauKids: 4 documentos com o título idêntico `Clau Kids Store`**, criados em
  01/09, 08/09, 15/09 e 18/09. Impossível saber qual é o vigente sem abrir.
- **Pontual**: dois docs `Pontual Uniformes` iguais em `Documentos/Roteiros`, e
  dois `PONTUAL × EXPANSION — Estratégia e Cronograma` em `Documentos/Onboarding`.

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
