# AUDITORIA DO GOOGLE DRIVE — EXPANSION COMPANY
**Data:** 26/07/2026 · **Conta:** expansioncompany.oficial@gmail.com
**Escopo:** Meu Drive (estrutura completa de pastas, ~250 arquivos soltos na raiz, amostragem de permissões, 45+ pastas compartilhadas comigo)
**Cruzamento:** 4.321 mensagens de WhatsApp (abr–jul/2026) + áudio-360 do CEO
**Status:** NENHUMA alteração executada. Relatório e plano apenas.

---

# 1. DIAGNÓSTICO GERAL

## NOTA GLOBAL: **2,7 / 10**

| Dimensão | Nota | Justificativa |
|---|---|---|
| **Organização** | 2/10 | Existe uma estrutura correta (`Expansion Company › Assessoria › Clientes › 00X - NOME`) — mas ela abriga talvez 20% do acervo. Os outros 80% estão soltos na raiz ou em pastas paralelas criadas por urgência. |
| **Escalabilidade** | 1/10 | 250 arquivos soltos na raiz com 3 meses de empresa. No ritmo atual, em 12 meses são ~1.000. A raiz do Drive não tem hierarquia — não escala por definição. |
| **Facilidade de busca** | 2/10 | 26 arquivos chamados `Processo_Filmmaker`. Buscar por nome retorna 26 resultados idênticos e nenhum indica qual é o vigente. A busca está tecnicamente funcional e praticamente inútil. |
| **Consistência** | 1/10 | Sete nomenclaturas de pasta coexistindo para o mesmo estágio: `Brutos`, `Utilizados`, `Editados`, `Materiais finalizados`, `Aprovados`, `Postados (Social Media)`, `Videos P/Edição`. Existe até uma pasta literalmente duplicada: `08/04 - Prime Alphaville (CashMe)` e `08 04 - Prime Alphaville (CashMe)`. |
| **Produtividade** | 2/10 | Documentado nos grupos: vídeos editados duas vezes, editor que não sabia quem era a Ciés, social media sem acesso a pastas, gestor de tráfego "perdido". |
| **Manutenção** | 1/10 | Não há dono, convenção escrita, rotina de limpeza ou política de arquivo. O sistema só piora. |
| **Padronização** | 2/10 | O padrão certo existe (numeração `00X` e POPs `(01)…(07)`) mas é ilhado e recente (24/07). |
| **Segurança** | **0,5/10** | Pastas com material de cliente configuradas como **"qualquer pessoa com o link pode EDITAR"**. Contratos assinados soltos na raiz. Acervo da empresa numa conta Gmail pessoal. Pastas críticas pertencentes a freelancers. |

## Veredicto em uma frase
**Isso não é um Drive desorganizado. É um Drive sem modelo de permissão, sem convenção e sem dono — e as três coisas se realimentam.**

---

# 2. PROBLEMAS ENCONTRADOS

## 🔴 CRÍTICOS

### C1. Pastas de cliente abertas para EDIÇÃO por qualquer pessoa com o link
Amostragem de permissões retornou `{"role":"writer","type":"anyone"}` em:
- `Brutos` da **Prime Assessoria Alphaville**
- `Processos › Social Media` (os POPs da empresa)
- `007 - CLAUKIDS`

**Não é "qualquer um pode ver". É qualquer um pode EDITAR E APAGAR.** Qualquer pessoa que já recebeu um link desses num grupo de WhatsApp — cliente, ex-cliente, ex-funcionário, ou quem eles encaminharam — mantém poder de escrita indefinidamente.

**Isso explica registros reais dos grupos:** *"Apagaram 1 da Ciés que coloquei"* (Adryel, 20/07) · *"Alguém apagou, ficou 2"* · *"Na verdade sumiu o quadrado"*.

### C2. O acervo da empresa vive numa conta Gmail pessoal
Tudo pertence a `expansioncompany.oficial@gmail.com`. Sem Google Workspace, sem Drive Compartilhado. Consequências: perda da conta = perda da empresa; sem Vault, sem retenção, sem auditoria, sem transferência de propriedade, sem recuperação administrativa.

### C3. Material de cliente pertencente a terceiros
Pastas com material dos clientes são **propriedade de contas pessoais de colaboradores e freelancers**: `dp.pereira144@gmail.com` (Daniel), `kaua.catini@gmail.com`, `luizh.azv.videomaker@gmail.com`, `feresrodrigo70@gmail.com`, `alexandraritacastro@gmail.com`. **Se essas pessoas saírem, o material sai junto.** Considerando que o principal editor declarou *"não trabalho só pra vocês"*, isso é exposição direta.

### C4. Contratos assinados soltos na raiz
`Contrato_Expansion_Albanos_Assessoria.pdf` e `Contrato_Expansion_Albanos_Assessoria_v2.pdf` estão jogados na raiz, sem pasta jurídica, sem controle de versão, sem restrição. Não há como saber qual é o vigente.

### C5. Permissão binária: ou público, ou o time não entra
As pastas que **não** estão públicas (`Clientes`, `002 - ALBANOs`, `008 - CIÉS`) estão como **owner-only**. O time não tem acesso estrutural — o acesso é implorado, arquivo por arquivo.

Rastro nos grupos: *"to esperando até hoje aceitarem minha solicitação"* · *"aceita o acesso das demandas"* · *"Solicita o acesso meu irmão"* · *"Verifica se vc tem acesso"* · *"eu não tenho essa pasta de São José. Como vou postar se não tenho a pasta"*.

## 🟠 ALTOS

### A1. 250 arquivos soltos na raiz — 63% são duplicatas
| Arquivo | Cópias |
|---|---|
| `Processo_Filmmaker` | **26** |
| `Processo_Editor_Video` | **19** |
| `Onboarding_BrunoGraute` | **16** — cliente **CANCELADO em 21/05** |
| `Rotina_Semanal_Templates` | **14** |
| `Onboarding_VitorGomes` | **13** — cliente **CORTADO em 15/06** |
| `Rotina_Semanal_EXPANSION` | **12** |
| `Acessos_RenatoHinnig` | **11** |
| `Onboarding_Renato` | **11** |
| `Onboarding_PrimeAlphaville` | **11** |
| `Checklist_Artes_Eventos` | **8** |
| `Acessos_LariCampos` | **7** |
| `Roteiros_Video_ITCE` · `Onboarding_DiCastro` · `Onboarding_LariCampos` | 4 cada |

**199 arquivos → 73 títulos únicos → 126 cópias redundantes.** Todas criadas em rajadas de segundos (timestamps 13:50:09, 13:50:20, 13:50:26…), o que indica automação/exportação em loop que ninguém desligou.

### A2. Sete nomenclaturas para o mesmo estágio de produção
`Brutos` · `Utilizados` · `Editados` · `Materiais finalizados` · `Aprovados` · `Postados (Social Media)` · `Videos P/Edição` — e nenhum documento define a diferença. O time discute isso semanalmente no WhatsApp.

### A3. Pasta literalmente duplicada
`08/04 - Prime Alphaville (CashMe)` **e** `08 04 - Prime Alphaville (CashMe)`, ambas contendo uma subpasta `Brutos`. Criadas com 9 dias de diferença.

### A4. Numeração de clientes com buracos
Existem `001 - JANE SAÚDE SEGUROS`, `002 - ALBANOs ECOSSISTEMA`, `003 - PRIME ASSESSORIA ALPHAVILLE`, `007 - CLAUKIDS`, `008 - CIÉS BRAND`, `009 - FREDERICO IZIDORIO`. **Faltam 004, 005 e 006** — provavelmente clientes que saíram, mas ninguém sabe. Numeração sequencial reaproveitável é uma armadilha.

### A5. Clientes ativos fora da estrutura de clientes
`REINO| CRIATIVOS`, `ALBANOS | MATERIAIS DESIGN`, `WebLuxury`, `Logo clientes` estão na **raiz**, não dentro de `Clientes`. O ecossistema Albanos tem material em pelo menos 3 lugares diferentes.

### A6. Eventos como pastas de primeiro nível
`PRIME DAY FLORIPA`, `COBERTURA PRIME DAY JOINVILLE`, `COBERTURA PRIME DAY JARAGUA`, `Joaquim PMD 23/06`, `Joaquim CCB-30/05`, `EDC ENCONTRO DE CASAIS - 26/06` — seis pastas de evento na raiz, todas da Prime ou de captação, nenhuma dentro do cliente.

### A7. Pastas com nome de pessoa sem dono definido
`Nicolas`, `Kauã`, `DANI`, `cássio` na raiz. Contém subpastas `25-07`, `foto`, `video` — ou seja, viraram depósito de gravação por data. Não é área pessoal nem projeto: é limbo.

## 🟡 MÉDIOS

- **M1.** Arquivos genéricos: `Documento sem título` ×2, `Formulário sem título` ×2.
- **M2.** Mídia bruta na raiz: `MVI_6501.MP4`, `C4327.MP4`, `C3567.MP4`, `IMG_1870.MOV` etc. — arquivos de câmera nunca movidos.
- **M3.** Versionamento improvisado: `_v2`, `_V2_Corrigido`, `(1)`, ` - copy`, `cópia`. Cinco convenções, nenhuma oficial.
- **M4.** Clientes que nunca existiram na estrutura: `Baruc Assessoria`, `Daniella Lima | @bilboqueitba`, `Mariane`, `Heitor Santos`, `Vitor Gomes` — todos com onboarding, nenhum com pasta.
- **M5.** Documentos pessoais do Nicolas misturados com a empresa: `DOSSIE-Nicolas-Nascimento-Consolidado.md`, `00-Posicionamento-Nicolas-Nascimento.md`, `00-CEREBRO-DE-MARCA`, `Briefing Video Posicionamento`.
- **M6.** `Musicas DOTTA`, `meus vídeos`, `videos cortes` — recursos sem categoria.
- **M7.** Profundidade irregular: alguns caminhos têm 2 níveis, outros 7 (`Clientes › 009 › Brutos › 23-07 › Vídeo`).

## 🔵 BAIXOS

- **B1.** Acentuação e caixa inconsistentes: `ALBANOs ECOSSISTEMA` (s minúsculo), `cássio` minúsculo, `Kauã` com acento, `CLAUKIDS` sem espaço.
- **B2.** Espaços à direita nos nomes: `"WebLuxury "`, `"REINO| CRIATIVOS"` (sem espaço antes da barra), `"Vídeo "`.
- **B3.** Formulários Google órfãos sem planilha vinculada identificável.

---

# 3. COMO DEVERIA SER — princípios de projeto

## Fundamento: 4 decisões estruturais antes de qualquer pasta

**1. Migrar para Google Workspace com Drive Compartilhado.**
Este é o único item verdadeiramente inegociável. Em Drive Compartilhado a **empresa é a dona dos arquivos**, não a pessoa. Freelancer sai, arquivo fica. Permissão é por pasta e por papel, não por link. Custo: ~R$30–70/usuário/mês. Comparado a perder o acervo de 6 clientes, é irrelevante.

**2. Separar as três naturezas de arquivo — elas têm ciclos de vida opostos.**

| Natureza | Exemplo | Ciclo | Onde vive |
|---|---|---|---|
| **Ativo de mídia** | brutos, editados, fotos | Volume alto, vida curta, morre em arquivo | `20 CLIENTES` |
| **Documento de operação** | onboarding, roteiro, acesso, contrato | Volume baixo, vida longa, versão única | `20 CLIENTES` + `40 EMPRESA` |
| **Conhecimento reutilizável** | POP, template, prompt, biblioteca | Vida permanente, versão única, muda devagar | `30 OPERAÇÃO` |

Hoje as três estão misturadas. É por isso que roteiro se perde no meio de MP4.

**3. Modelo híbrido PARA + Johnny Decimal.**
- **Johnny Decimal** nos níveis 1 e 2 (`10`, `20`, `30`…): dá endereço fixo e memorizável. `21` é sempre a Prime.
- **PARA** na lógica: Projetos (clientes ativos) · Áreas (operação contínua) · Recursos (biblioteca) · Arquivos (morto).
- **GTD** no fluxo: uma única `00 INBOX` para tudo que entra sem destino.
- **Nunca reaproveitar número.** Cliente que sai leva o número dele para o arquivo morto.

**4. Máximo 4 níveis de profundidade. Sempre.**
`ÁREA › CLIENTE › ESTÁGIO › DATA`. Nada mais fundo. Se precisou do 5º nível, o problema é de nomenclatura, não de pasta.

---

# 4. ESTRUTURA IDEAL

```
📁 EXPANSION [Drive Compartilhado]
│
├── 00 INBOX
│   └── (tudo que entra sem destino. Esvaziada na daily. Nada dorme aqui.)
│
├── 10 COMERCIAL
│   ├── 11 Propostas
│   ├── 12 Contratos ATIVOS         🔒 sócios
│   ├── 13 Contratos ENCERRADOS     🔒 sócios
│   ├── 14 Onboardings preenchidos
│   └── 15 Material de vendas       (LP, criativos Expansion, cases)
│
├── 20 CLIENTES
│   ├── 21 PRIME ASSESSORIA
│   │   ├── 21.1 Marca            (logo, fontes, cores, guideline)
│   │   ├── 21.2 Estratégia       (onboarding, público, funil, cronograma)
│   │   ├── 21.3 Brutos           ├── AAAA-MM-DD Descrição/
│   │   ├── 21.4 Produção         (em edição — pasta de trabalho, esvazia)
│   │   ├── 21.5 Aprovação        (o que está com o cliente)
│   │   ├── 21.6 Publicado        ├── 2026-07/
│   │   ├── 21.7 Tráfego          (criativos + relatórios)
│   │   └── 21.9 Relatórios       ← O QUE QUASE PERDEU A PRIME
│   ├── 22 ALBANOS ECOSSISTEMA
│   │   └── (mesma estrutura + subperfis: Clínica, Academy, Cris, Fórum TEIA)
│   ├── 23 CIÉS BRAND
│   ├── 24 CLAU KIDS
│   ├── 25 FREDERICO IZIDORIO
│   ├── 26 JANE SAÚDE SEGUROS
│   └── 2X … (próximo número livre, nunca reaproveitado)
│
├── 30 OPERAÇÃO
│   ├── 31 POPs                    (um doc por função, versão única)
│   │   ├── 31.1 Social Media
│   │   ├── 31.2 Editor de Vídeo
│   │   ├── 31.3 Filmmaker
│   │   ├── 31.4 Designer
│   │   ├── 31.5 Gestor de Tráfego
│   │   └── 31.6 CS / Relatórios
│   ├── 32 Templates               (onboarding, roteiro, relatório, proposta)
│   ├── 33 Prompts & IA            (biblioteca de prompts, Space, briefings)
│   ├── 34 Frameworks              (TACO, AIDA, Modelo p/ Tráfego)
│   ├── 35 Acessos & Credenciais   🔒 sócios — ver §11
│   └── 36 Treinamentos            (aulas gravadas, onboarding de time)
│
├── 40 EMPRESA
│   ├── 41 Financeiro              🔒 sócios
│   ├── 42 Jurídico & Societário   🔒 sócios
│   ├── 43 Pessoas                 🔒 sócios (contratos de time, entrevistas)
│   ├── 44 Estratégia & Conselho   🔒 sócios (Conselho Expansion, 360, planos)
│   └── 45 Marca Expansion         (logo, identidade, apresentações)
│
├── 50 BIBLIOTECA
│   ├── 51 Banco de imagens
│   ├── 52 Trilhas e áudio
│   ├── 53 Overlays e camadas
│   ├── 54 Referências e inspirações
│   └── 55 Logos de clientes
│
├── 60 EVENTOS
│   └── 2026-06-24 PRIME DAY FLORIPA/  (sempre AAAA-MM-DD + nome)
│
└── 90 ARQUIVO MORTO             🔒 leitura
    ├── 91 Clientes encerrados
    │   ├── 2026-05-21 BRUNO BATISTA/
    │   ├── 2026-06-15 VITOR GOMES/
    │   └── 2026-06 LARI CAMPOS/
    ├── 92 Projetos encerrados
    └── 99 Quarentena             (a triar — ver Fase 1)
```

## Propósito de cada área

| Área | Pergunta que ela responde | Quem escreve |
|---|---|---|
| **00 INBOX** | "Chegou algo e não sei onde vai" | Todos |
| **10 COMERCIAL** | "Como esse cliente entrou e o que foi vendido" | Kauã |
| **20 CLIENTES** | "Onde está o material do cliente X" | Todos |
| **30 OPERAÇÃO** | "Como se faz isso aqui" | Nicolas + dono do POP |
| **40 EMPRESA** | "Como a empresa está" | Sócios |
| **50 BIBLIOTECA** | "Preciso de um asset reutilizável" | Todos leem, poucos escrevem |
| **60 EVENTOS** | "O que gravamos naquele evento" | Filmmaker |
| **90 ARQUIVO** | "Isso não é mais vivo, mas não pode sumir" | Ninguém (só move) |

---

# 5. PLANO DE MIGRAÇÃO

## 5.1 CRIAR
`EXPANSION` (Drive Compartilhado) + toda a árvore acima, vazia. **Antes de mover qualquer coisa.**

## 5.2 MOVER

| Origem | Destino |
|---|---|
| `Expansion Company › Assessoria › Clientes › 00X - *` | `20 CLIENTES › 2X NOME` (renumerar sem buraco) |
| `REINO\| CRIATIVOS` | `20 CLIENTES › 2X REINO CONSÓRCIOS` |
| `ALBANOS \| MATERIAIS DESIGN` | `20 CLIENTES › 22 ALBANOS › 22.1 Marca` |
| `Logo clientes` | `50 BIBLIOTECA › 55 Logos de clientes` |
| `WebLuxury` | `20 CLIENTES` ou `90 ARQUIVO` — **decisão sua** |
| `PRIME DAY *`, `Joaquim *`, `EDC *` | `60 EVENTOS › AAAA-MM-DD NOME` |
| `Musicas DOTTA` | `50 BIBLIOTECA › 52 Trilhas e áudio` |
| `Materiais de apoio › Processos › Social Media › (01)…(07)` | `30 OPERAÇÃO › 31.1 Social Media` ✅ *já está certo, só mudar de lugar* |
| `CONSELHO EXPANSION` | `40 EMPRESA › 44 Estratégia & Conselho` |
| `Contrato_Expansion_Albanos_*` | `10 COMERCIAL › 12 Contratos ATIVOS` 🔒 |
| Docs pessoais do Nicolas (DOSSIE, CÉREBRO-DE-MARCA, Posicionamento) | **Fora do Drive da empresa** — Drive pessoal |
| `Nicolas`, `Kauã`, `DANI`, `cássio` | Triar: gravação → cliente/evento · pessoal → sai |
| Mídia bruta na raiz (`MVI_*`, `C*.MP4`, `IMG_*`) | `90 ARQUIVO › 99 Quarentena` |

## 5.3 APAGAR (com justificativa)

| Item | Quantidade | Justificativa |
|---|---|---|
| `Processo_Filmmaker` | 25 de 26 | Idênticos, criados em rajada de segundos. Manter **1** (o mais recente), mover para `31.3`. |
| `Processo_Editor_Video` | 18 de 19 | Idem → `31.2` |
| `Rotina_Semanal_Templates` | 13 de 14 | Idem → `32` |
| `Rotina_Semanal_EXPANSION` | 11 de 12 | Idem → `32` |
| `Checklist_Artes_Eventos` | 7 de 8 | Idem → `32` |
| `Onboarding_*` e `Acessos_*` duplicados | ~60 arquivos | Manter 1 por cliente. |
| `Documento sem título` / `Formulário sem título` | 4 | Vazios ou sem identificação. **Abrir antes de apagar.** |
| Pasta `08 04 - Prime Alphaville (CashMe)` | 1 | Duplicata literal — consolidar conteúdo na versão `08/04` e apagar a órfã. |

> ⚠️ **Regra de segurança:** nada vai direto para a lixeira. Tudo passa por `90 › 99 Quarentena` por **30 dias**. Só depois se apaga.

## 5.4 ARQUIVAR
Bruno Batista, Vitor Gomes, Lari Campos, Heitor Santos, Baruc, Daniella Lima, Mariane → `90 › 91 Clientes encerrados › AAAA-MM NOME/`.
Di Castro / BBM, Renato Hinnig / 2NDN, ITCE → **decisão sua**: ativos ou arquivo?

## 5.5 MANTER COMO ESTÁ
- A numeração `00X - CLIENTE` — o conceito está certo, só precisa migrar e fechar buracos.
- A estrutura `(01) Entrada Cliente … (07) Rotina Grupos` dos POPs de Social Media — **é o melhor pedaço do Drive hoje.** Serve de modelo para as outras funções.
- O Apps Script `Integração: Forms|Plan|Organify` — base para as automações da §10.

---

# 6. CONVENÇÃO DE NOMES

## Regras universais
1. **Data sempre `AAAA-MM-DD`.** Ordena sozinha. Nunca `26/07`, `26.07`, `2607`.
2. **Sem barra `/` em nome de arquivo ou pasta.** Quebra links e exportação.
3. **Sem acento e sem caractere especial** em nome de arquivo (pasta pode). Evita erro em automação e download.
4. **Separador: hífen com espaço ` - `** entre blocos; underline `_` dentro do bloco.
5. **Sem espaço no início ou fim.**
6. **Sem `(1)`, `cópia`, `copy`, `FINAL`, `FINAL2`, `definitivo`.**

## Padrões por tipo

| Tipo | Padrão | Exemplo |
|---|---|---|
| **Pasta de cliente** | `NN NOME DO CLIENTE` | `23 CIES BRAND` |
| **Pasta de estágio** | `NN.N Estagio` | `23.3 Brutos` |
| **Pasta de gravação** | `AAAA-MM-DD Descricao` | `2026-07-25 Gravacao Espaco` |
| **Pasta de evento** | `AAAA-MM-DD NOME` | `2026-06-24 PRIME DAY FLORIPA` |
| **Vídeo bruto** | `AAAA-MM-DD - CLIENTE - assunto - NN` | `2026-07-25 - CIES - provador - 03` |
| **Vídeo entregue** | `AAAA-MM-DD - CLIENTE - CANAL - assunto` | `2026-07-25 - CIES - REELS - moletom cinza` |
| **Criativo de tráfego** | `CLIENTE - TRF - NNN - angulo` | `PRIME - TRF - 056 - depoimento Laura` |
| **Documento operacional** | `CLIENTE - Tipo` | `CIES - Onboarding` · `PRIME - Acessos` |
| **POP** | `POP NN - Funcao` | `POP 02 - Editor de Video` |
| **Contrato** | `AAAA-MM-DD - Contrato - CLIENTE - vNN` | `2026-04-29 - Contrato - ALBANOS - v02` |
| **Relatório** | `CLIENTE - Relatorio - AAAA-MM-DD` | `PRIME - Relatorio - 2026-07-27` |
| **Roteiro** | `CLIENTE - Roteiro NN - AAAA-MM` | `CLAUKIDS - Roteiro 03 - 2026-07` |

## Versionamento — regra única
**Não versione por nome. Use o histórico do Google Docs.**
Exceção: contratos e entregas externas → sufixo `v01`, `v02` com **dois dígitos** (ordena certo). Nunca `FINAL`.

## O que fazer com a numeração de tráfego do Matheus
Ele propôs `NN - CLIENTE - DATA` em 14/07 e nunca foi implementado. **Adotar com ajuste:** `CLIENTE - TRF - NNN - angulo`. O número do anúncio precede a data porque é o identificador que ele usa no gerenciador da Meta.

---

# 7. ORGANIZAÇÃO POR PRIORIDADE

| Frequência | O que | Onde | Como acessar |
|---|---|---|---|
| **Diário** | Brutos, Produção, Aprovação, Publicado do cliente ativo | `20 CLIENTES › 2X › .3/.4/.5/.6` | Atalho no "Com estrela" + link fixo no card do Organify |
| **Diário** | INBOX | `00` | Página inicial do Drive |
| **Semanal** | Relatórios, Tráfego, Estratégia | `2X.7` e `2X.9` | Rotina de segunda-feira |
| **Semanal** | POPs e Templates | `30 › 31/32` | Consulta na daily |
| **Mensal** | Financeiro, Contratos, Pessoas | `40` 🔒 | Fechamento mensal |
| **Trimestral** | Biblioteca, Frameworks | `50`, `30 › 34` | Sob demanda |
| **Arquivo** | Clientes encerrados | `90 › 91` 🔒 leitura | Consulta rara |
| **Quarentena** | A triar / a apagar | `90 › 99` | Revisão em 30 dias |
| **Lixeira** | Duplicatas confirmadas | — | Após quarentena |

---

# 8. DUPLICIDADES — o que pode ser eliminado

| Grupo | Total | Manter | Apagar | Por quê |
|---|---|---|---|---|
| `Processo_Filmmaker` | 26 | 1 | 25 | Tamanhos idênticos, criados em rajada. Erro de automação. |
| `Processo_Editor_Video` | 19 | 1 | 18 | Idem |
| `Onboarding_BrunoGraute` | 16 | 1 → arquivo | 15 | Cliente cancelado 21/05. Manter 1 no arquivo morto por histórico. |
| `Rotina_Semanal_Templates` | 14 | 1 | 13 | Idem |
| `Onboarding_VitorGomes` | 13 | 1 → arquivo | 12 | Cliente cortado 15/06 |
| `Rotina_Semanal_EXPANSION` | 12 | 1 | 11 | Idem |
| `Acessos_RenatoHinnig` | 11 | 1 | 10 | ⚠️ Contém credenciais — ver §11 |
| `Onboarding_Renato` | 11 | 1 | 10 | Idem |
| `Onboarding_PrimeAlphaville` | 11 | 1 | 10 | Cliente ativo — verificar se algum tem edição posterior |
| `Checklist_Artes_Eventos` | 8 | 1 | 7 | Idem |
| `Acessos_LariCampos` | 7 | 1 → arquivo | 6 | ⚠️ Credenciais de cliente inativo — **revogar acessos** |
| Demais (`Space-prompt.md` ×3, `Acessos_DiCastro` ×3, `Roteiros_Video_ITCE` ×4, `Onboarding_DiCastro` ×4, `Onboarding_LariCampos` ×4, `Onboarding_ITCE` ×2, `Roteiros_Quinzenais_Prime` ×2, `Acessos_ITCE` ×2, `Roteiros_DiCastro_BBM` ×2) | ~29 | 9 | ~20 | Idem |

**Total a eliminar: ~150 arquivos** (~63% dos arquivos soltos na raiz).

**Método seguro:** ordenar cada grupo por `modifiedTime` decrescente → abrir os 2 mais recentes → confirmar que são idênticos → manter o mais recente → mover os demais para `90 › 99 Quarentena` → apagar em 30 dias.

> **Nunca apagar `Acessos_*` sem antes revogar os acessos.** O arquivo some, o acesso do ex-fornecedor continua.

---

# 9. ARQUIVOS CRÍTICOS

| Documento | Onde está hoje | Onde deveria estar | Proteção |
|---|---|---|---|
| Contratos Albanos (v1 e v2) | **Raiz, soltos** | `10 › 12 Contratos ATIVOS` | 🔒 só sócios · cópia offline |
| `Acessos_*` (todos os clientes) | Raiz, duplicados | **Fora do Drive** → gerenciador de senhas | 🔒 nunca em Docs |
| Onboardings de clientes ativos | Raiz, duplicados | `10 › 14` + link em `2X.2` | 🔒 time (leitura) |
| POPs `(01)…(07)` Social Media | `Processos › Social Media` **público-editável** | `30 › 31.1` | 🔒 leitura p/ time, escrita p/ dono do POP |
| `PROCESSOS EXPANSION` | Raiz | `30 › 31` | 🔒 idem |
| `CONSELHO EXPANSION` | Raiz | `40 › 44` | 🔒 sócios |
| `Painel Meta Ads`, `Leads Form` | Raiz | `2X.9 Relatórios` / `10 › 15` | 🔒 time |
| Apps Script `Forms\|Plan\|Organify` | Raiz | `30 › 33` | 🔒 sócios + Matheus |
| Marca Expansion (`TempLogo*`) | Raiz | `40 › 45` | 🔒 leitura |

---

# 10. AUTOMAÇÕES

## Prioridade 1 — resolvem dor documentada

**A1. Provisionamento de cliente (Apps Script)**
Um Form `Novo Cliente` → script cria a árvore `2X NOME` completa com as 8 subpastas, aplica permissões, gera o doc de Onboarding a partir do template, cria a linha no índice e devolve os links.
*Elimina:* pasta criada errado, subpasta faltando, "não tenho essa pasta".
*Esforço:* 1 dia. *Impacto:* alto e permanente.

**A2. Índice mestre automático (Apps Script + Sheets)**
Planilha que varre o Drive diariamente e lista: cliente, pasta, último arquivo, data, dono, permissão. Vira a busca real da empresa.
*Elimina:* "onde está o vídeo?" — a pergunta mais frequente dos 5 grupos.
*Esforço:* 1 dia.

**A3. Relatório semanal automático — a que quase custou a Prime**
O Matheus já construiu um endpoint Apps Script (`script.google.com/macros/...`) que devolve métricas de Expansion, Prime, Teia, Albanos e Clau Kids. Falta: agendar (gatilho de tempo, segunda 08h), renderizar em Slides a partir de template e entregar no grupo do cliente.
*Elimina:* *"a gente tá muitas semanas sem mandar nenhum relatório"*.
*Esforço:* 2 dias sobre o que já existe. **Maior ROI da lista.**

**A4. Auditoria de permissões (Apps Script)**
Varredura semanal listando tudo com `type: anyone`. E-mail com a lista. Opcionalmente revoga automático.
*Elimina:* risco C1.
*Esforço:* meio dia.

## Prioridade 2

**A5. Nomeação assistida na entrega** — form/script que recebe o vídeo do editor e renomeia no padrão automaticamente. Elimina a briga de nomenclatura na raiz.
**A6. Ponte Drive ↔ Organify** — o Organify tem só 5 GB e API aberta. O certo é: **mídia no Drive, tarefa no Organify, link automático entre os dois.** Um script que ao criar tarefa já gera a pasta e cola o link no card resolve a migração pela metade que partiu o time.
**A7. Arquivamento automático** — pasta de cliente sem modificação há 90 dias → alerta; 180 dias → move para `90 › 91`.
**A8. Detector de duplicata** — hash de nome + tamanho, relatório semanal.

## Prioridade 3
**A9.** Claude Code + MCP do Drive para consultas em linguagem natural ("me traz todos os roteiros da Ciés de julho").
**A10.** n8n/Make: WhatsApp do cliente → Drive → Organify, fechando o ciclo de material bruto.
**A11.** Transcrição automática de todo bruto (o transcritor local já está pronto) → legenda e roteiro reaproveitáveis.

---

# 11. SEGURANÇA

| Risco | Severidade | Situação | Ação |
|---|---|---|---|
| Pastas `anyone: writer` | **CRÍTICA** | Confirmado em 3 de 8 amostras | Varrer 100% e revogar **hoje** |
| Acervo em Gmail pessoal | **CRÍTICA** | Sem Workspace, sem Vault | Migrar para Workspace + Drive Compartilhado |
| Material de cliente pertencente a freelancer | **CRÍTICA** | 5+ contas externas donas de pastas | Transferir propriedade ou recriar em Drive Compartilhado |
| Credenciais em Google Docs (`Acessos_*`) | **ALTA** | ~40 arquivos, muitos duplicados | Migrar para 1Password/Bitwarden e apagar dos Docs |
| Senhas em texto puro no WhatsApp | **ALTA** | `kaua.catini@gmail.com` + senha; login FGA | Trocar todas as senhas expostas |
| Contratos sem restrição | **ALTA** | Raiz, sem pasta jurídica | `10 › 12` 🔒 |
| Sem backup independente | **ALTA** | Só o Drive | Backup externo mensal do que é irrecuperável |
| Sem 2FA obrigatório | **MÉDIA** | Um gestor já perdeu conta de anúncio por falta de 2FA | Exigir 2FA em todas as contas |
| Sem trilha de auditoria | **MÉDIA** | Impossível saber quem apagou | Resolvido pelo Drive Compartilhado |

---

# 12. PRODUTIVIDADE — onde o tempo vaza hoje

| Vazamento | Evidência | Custo estimado | Solução |
|---|---|---|---|
| Procurar arquivo | Dezenas de mensagens/semana nos 5 grupos | ~5h/semana do time | A2 (índice) + nomenclatura |
| Pedir e conceder acesso | *"aceita minha solicitação"*, *"solicita o acesso"* | ~2h/semana | Drive Compartilhado |
| Retrabalho por edição duplicada | *"segunda vez que editam vídeos já editados"* | ~4h/mês de editor | A2 + estágio único |
| Nicolas roteando tarefa manualmente | Ele é o roteador de quase tudo | **A maior perda da empresa** | A1 + A6 + POPs |
| Montar relatório à mão | Nunca acontece — por isso a Prime quase saiu | Risco de receita | **A3** |
| Renomear e reorganizar depois | Constante | ~3h/semana | A5 |

**O que deveria simplesmente desaparecer:** pastas com nome de pessoa; pastas de evento na raiz; `Utilizados` (é estado, não pasta — vira `.6 Publicado`); versionamento por nome; onboarding duplicado.

---

# 13. ESCALABILIDADE — teste de 20×

| Cenário | Hoje | 20× (120 clientes, ~5.000 arquivos/mês) |
|---|---|---|
| Raiz do Drive | 250 soltos | **5.000 soltos — colapso total** |
| Estrutura proposta | — | `20 CLIENTES` com 120 pastas numeradas, 4 níveis, busca por número. **Funciona.** |
| Permissão | Manual, por link | Por grupo e papel. **Funciona.** |
| Onboarding de cliente | Manual, 30 min, com erro | Automatizado, 30 s. **Funciona.** |
| Achar arquivo | Impossível | Índice + convenção. **Funciona.** |
| Armazenamento | 15 GB grátis | ⚠️ **Não funciona.** 120 clientes × vídeo = terabytes. Workspace Business Standard (2 TB/usuário, pooled) é o mínimo. |

**Único ponto que exige redesenho no 20×:** armazenamento de bruto. Aos ~40 clientes, mover brutos com mais de 90 dias para storage frio (Backblaze B2 ou Google Cloud Storage Coldline) e manter no Drive apenas o entregue. Custo ~10× menor por TB.

---

# 14. COMPARAÇÃO COM BOAS PRÁTICAS

| Prática | Quem usa | Expansion hoje | Gap |
|---|---|---|---|
| Drive Compartilhado / propriedade da empresa | Toda empresa com Workspace | ❌ Gmail pessoal | **Crítico** |
| Permissão por grupo, não por pessoa | Google, Atlassian | ❌ Por link | **Crítico** |
| Convenção de nome escrita e versionada | Estúdios, agências, engenharia | ❌ Nenhuma | **Crítico** |
| Fonte única de verdade por documento | Notion/Confluence de qualquer startup | ❌ 26 cópias do mesmo POP | **Crítico** |
| Onboarding de cliente automatizado | Consultorias (PwC, Deloitte) | ❌ Manual | Alto |
| Retenção e arquivamento definidos | Escritórios de advocacia | ❌ Nada morre | Alto |
| Ciclo de vida de asset de mídia | Produtoras | 🟡 Existe informalmente | Médio |
| Índice/catálogo pesquisável | Empresas de dados | ❌ | Alto |
| Revisão trimestral de permissão | Empresas com SOC2 | ❌ | Alto |
| Numeração estável de entidade | Johnny Decimal | 🟡 Parcial (`00X`, com buracos) | Médio |

**Onde a Expansion já está certa:** a estrutura `(01) Entrada Cliente … (07) Rotina Grupos` dos POPs de Social Media é boa prática de verdade — processo numerado, sequencial, por etapa da jornada. **É o único pedaço do Drive que um consultor não mudaria.** Replicar para as outras 5 funções.

---

# 15. PLANO DE EXECUÇÃO

## FASE 0 — CONTENÇÃO (hoje, 2h) 🚨

| # | Tarefa | Objetivo | Benefício | Risco | Tempo | Prior. |
|---|---|---|---|---|---|---|
| 0.1 | Varrer e revogar todo `anyone: writer` | Fechar a porta aberta | Impede perda e vazamento de material de cliente | Time perde acesso temporário — avisar antes | 45 min | 🔴 MÁXIMA |
| 0.2 | Mover contratos da raiz p/ pasta restrita | Proteger jurídico | Documento vinculante deixa de estar exposto | Nenhum | 10 min | 🔴 |
| 0.3 | Trocar senhas expostas no WhatsApp | Fechar credencial vazada | Evita sequestro de conta de anúncio | Reconfigurar 2FA | 30 min | 🔴 |
| 0.4 | Listar quem é dono de que pasta | Mapear exposição | Saber o que se perde se alguém sair | Nenhum | 30 min | 🔴 |

## FASE 1 — FUNDAÇÃO (semana 1, ~8h)

| # | Tarefa | Objetivo | Benefício | Risco | Tempo | Prior. |
|---|---|---|---|---|---|---|
| 1.1 | Contratar Google Workspace | Empresa vira dona | Elimina C2 e C3 de uma vez | Custo mensal | 1h | 🔴 |
| 1.2 | Criar Drive Compartilhado `EXPANSION` + árvore vazia | Destino pronto | Migração sem improviso | Nenhum | 2h | 🔴 |
| 1.3 | Definir grupos e permissões | Acesso por papel | Fim do "aceita minha solicitação" | Configuração errada | 1h | 🔴 |
| 1.4 | Escrever a convenção de nomes (1 página) e fixar nos grupos | Padrão explícito | Sem isso, tudo volta ao caos em 60 dias | Time ignorar | 2h | 🔴 |
| 1.5 | Criar `90 › 99 Quarentena` | Rede de segurança | Permite reverter tudo | Nenhum | 15 min | 🟠 |

## FASE 2 — MIGRAÇÃO (semanas 2–3, ~16h)

| # | Tarefa | Objetivo | Benefício | Risco | Tempo | Prior. |
|---|---|---|---|---|---|---|
| 2.1 | Migrar os 6 clientes ativos, **um por dia** | Estrutura viva | Time aprende usando | Link antigo quebra — manter espelho 30 dias | 6×1h | 🔴 |
| 2.2 | Deduplicar a raiz (~150 arquivos → quarentena) | Fim das 26 cópias | Busca volta a funcionar | Apagar versão boa — por isso quarentena | 4h | 🟠 |
| 2.3 | Consolidar POPs (1 por função) | Fonte única | Time para de seguir versão velha | Escolher a errada — comparar antes | 3h | 🟠 |
| 2.4 | Arquivar clientes encerrados | Limpar o vivo | Foco no que gera receita | Nenhum | 2h | 🟠 |
| 2.5 | Migrar eventos p/ `60` | Tirar da raiz | Raiz limpa | Nenhum | 1h | 🟡 |
| 2.6 | Migrar credenciais p/ gerenciador de senhas | Tirar senha do Docs | Reduz risco alto | Perder acesso na transição — testar 1 a 1 | 2h | 🟠 |

## FASE 3 — AUTOMAÇÃO (semanas 4–6, ~6 dias)

| # | Tarefa | Objetivo | Benefício | Risco | Tempo | Prior. |
|---|---|---|---|---|---|---|
| 3.1 | **A3 — Relatório semanal automático** | Retenção de cliente | **Ataca o que quase perdeu a Prime** | Dado errado no relatório — validar 2 semanas | 2 dias | 🔴 |
| 3.2 | A1 — Provisionamento de cliente | Onboarding sem erro | 30 min → 30 s | Script quebrar | 1 dia | 🟠 |
| 3.3 | A2 — Índice mestre | Busca real | Fim do "onde está" | Nenhum | 1 dia | 🟠 |
| 3.4 | A4 — Auditoria de permissões | Não reabrir a porta | Segurança contínua | Nenhum | 0,5 dia | 🟠 |
| 3.5 | A6 — Ponte Drive ↔ Organify | Unir os dois sistemas | **Fecha a migração pela metade** | API do Organify mudar | 1,5 dia | 🟠 |

## FASE 4 — MANUTENÇÃO (permanente)

| Ritual | Frequência | Dono | Duração |
|---|---|---|---|
| Esvaziar `00 INBOX` | Diário, na daily | Todos | 5 min |
| Conferir nomenclatura das entregas | Semanal | Débora | 15 min |
| Revisar permissões (relatório A4) | Semanal | Nicolas | 10 min |
| Arquivar cliente encerrado | Ao encerrar | Kauã | 15 min |
| Limpar quarentena | Mensal | Nicolas | 30 min |
| Auditoria de estrutura | Trimestral | Nicolas | 2h |

---

# RESUMO EXECUTIVO

## NOTA GERAL: **2,7 / 10**

## 10 PRINCIPAIS PROBLEMAS
1. 🔴 Pastas de cliente com **"qualquer pessoa com o link pode EDITAR"**
2. 🔴 Acervo da empresa numa conta **Gmail pessoal**, sem Workspace
3. 🔴 Material de cliente **pertencente a freelancers**
4. 🔴 **Contratos assinados soltos na raiz**
5. 🔴 Permissão binária: público ou o time não entra
6. 🟠 **250 arquivos soltos na raiz, 63% duplicados** (26× o mesmo POP)
7. 🟠 **Sete nomenclaturas** para o mesmo estágio de produção
8. 🟠 Clientes ativos **fora** da estrutura de clientes
9. 🟠 Numeração de cliente **com buracos** (004, 005, 006 sumiram)
10. 🟠 Credenciais de acesso guardadas em Google Docs duplicados

## 10 MAIORES OPORTUNIDADES
1. **Drive Compartilhado** — resolve 4 dos 5 problemas críticos numa tacada
2. **Relatório semanal automático** — o Matheus já construiu 70%; ataca o motivo do quase-cancelamento da Prime
3. **Provisionamento automático de cliente** — 30 min → 30 s, sem erro
4. **Índice mestre pesquisável** — mata a pergunta mais frequente da empresa
5. **Deduplicação** — 63% de redução instantânea, busca volta a funcionar
6. **Convenção de nomes de 1 página** — custo quase zero, efeito permanente
7. **Ponte Drive ↔ Organify** — costura o time que a migração pela metade partiu
8. **Replicar os POPs `(01)…(07)`** para as outras 5 funções
9. **Gerenciador de senhas** — tira credencial de Docs e de WhatsApp
10. **Storage frio para bruto antigo** — 10× mais barato, prepara o 20×

## COMO FICA DEPOIS
Um Drive Compartilhado com **8 áreas numeradas**, máximo 4 níveis, onde:
- Qualquer arquivo é achado em **menos de 10 segundos** por número ou nome padronizado
- Cliente novo tem estrutura completa criada em **30 segundos**, sem erro
- Nenhum arquivo pertence a uma pessoa física — **tudo é da empresa**
- Ninguém pede acesso: **o papel define o que se vê**
- Todo cliente recebe **relatório toda segunda-feira, automaticamente**
- O Nicolas **para de ser o roteador** de arquivos e volta a ser CEO

**Da estrutura atual, sobrevive uma coisa: os POPs `(01) Entrada Cliente … (07) Rotina Grupos`.** É o único pedaço que um consultor não mudaria — e vira o molde de todo o resto.
