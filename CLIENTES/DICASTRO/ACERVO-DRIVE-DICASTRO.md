# DiCastro — mapa do acervo no Drive

Pasta raiz: **`004 - DI CASTRO`**, na estrutura de clientes do Drive da Expansion.

Levantamento de **29/07/2026**. Vale como retrato do dia: quem mexer no Drive
depois disso deixa este mapa desatualizado.

> **IDs e links do Drive omitidos de propósito.** Este repositório está
> **público**, e vários itens abaixo estão compartilhados como "qualquer pessoa
> com o link" — inclusive a planilha com nome e telefone de 115 leads. Publicar
> os IDs aqui seria publicar as chaves. A navegação é por nome; se o repositório
> virar privado, os IDs podem ser acrescentados.

---

## Documentos na raiz

| Documento | O que é | Situação |
|---|---|---|
| `Onboarding_DiCastro` | Ficha de onboarding — empresa, modelo, público, dores, histórico. **É o documento mais importante da conta.** | Completo. Existe em **4 cópias** duplicadas no Drive |
| `Acessos_DiCastro` | Credenciais do Instagram | ⚠️ **Senha em texto puro. Existe em 4 cópias.** Ver diagnóstico §6 |
| `Roteiro Semanal - DiCastro` | 3 roteiros de junho (Bálcãs, objeção do desconhecimento, mercado azul) | Entregue **com o template `[NOME]` por preencher** |

## Subpastas

```
004 - DI CASTRO/
├── Brutos/                        material gravado pelo cliente
│   ├── Dicastro 02-07/
│   ├── Dicastro 25.05/
│   ├── Utilizados/
│   │   ├── Dicastro 02-07/
│   │   └── Dicastro 24.05/
│   ├── IMG_6156.MOV               (194 MB)
│   └── C0700 / C0701 / C0703.MP4  (~520–650 MB cada — captação profissional)
│
├── Editados/
│   ├── BBM/  →  DICASTRO - ORGANICO.mov
│   ├── Editados carrossel/
│   ├── Postados (Social Media)/   21 vídeos finalizados
│   └── Briefing Designer - DICASTRO   ⚠️ contaminado (ver abaixo)
│
├── Roteiros/
│   ├── Roteiros_DiCastro_BBM          roteiros #13 a #19
│   └── Roteiros Virais DiCastro BBM.docx   roteiros #20 a #27
│
└── Eventos/
    └── BBM/
        ├── Checklist_Artes_Eventos     modelo padrão, 11 entregáveis
        ├── 01 - ARTE OFICIAL DO EVENTO ✅  BBMARTE.png + STORYS/
        ├── 02 - CONTAGEM REGRESSIVA    ❌ vazia
        ├── 03 - CARROSSEL APRESENTAÇÃO ❌ vazia
        ├── 04 - DESTAQUES DO INSTAGRAM ❌ vazia
        ├── 05 - LANDING PAGE           ❌ vazia
        ├── 06 - CARROSSEL DEPOIMENTOS  ❌ vazia
        ├── 07 - CARROSSEL PÓS EVENTO   ❌ vazia
        ├── 08 - PRÓXIMA DATA           ❌ vazia
        ├── 09 - ARTE DO TELÃO          ❌ vazia  ← pedida com spec técnica, nunca entregue
        ├── 10 - PALESTRANTES           ❌ só FOTOS PARTICIPANTES/ (vazia)
        └── 11 - SLIDES                 ❌ vazia
```

---

## Fora da pasta do cliente

| Onde | O que | Por que importa |
|---|---|---|
| Drive raiz (`Meu Drive`) | `Dicastro - EXPANSION` | Documento **pré-venda**: valores, ticket, nichos, objetivo. Nasceu em 15/04, antes do fechamento |
| Compartilhado por `kaioalves14` | `ROTEIROS - Di Castro` | 5 roteiros de **tráfego pago** escritos pelo gestor. Estrutura diferente e melhor calibrada para anúncio |
| Compartilhado por `alexandraritacastro` | `Vídeos Di Castro` | Material enviado pela esposa do cliente |
| Compartilhado por `kaua.catini` | `DICASTRO 11/05` | Captação de 11/05 |
| Planilha | Integração do formulário Meta — 115 leads | **O ativo comercial que ninguém abriu.** Ver `LEADS-BBM-ANALISE-2026-07-29.md` |
| Pastas de imagem | `Imagens DiCastro`, `Inspirações` | Enviadas pelo cliente em abril |

---

## Problemas do acervo

### 1. `Briefing Designer - DICASTRO` está contaminado

O documento abre com o escopo correto da BBM — destaques com data, arte
principal, palestrantes, contagem regressiva, paleta laranja/azul/dourado — e
depois emenda o briefing completo do **2NDN Florianópolis / Renato Hinnig**,
outro cliente: apresentação do evento, tickets de R$ 497 e R$ 1.497, carrossel
de 7 slides, palestrantes.

Pior detalhe: o campo *"Pasta com Imagens do Cliente"* aponta para
**`FOTOS - Renato Hinning`**.

Um designer que abrisse esse briefing receberia o cliente errado. **Precisa ser
partido em dois documentos.**

### 2. Três lotes de roteiros existem só no WhatsApp

Nenhum destes está no Drive — busca por título no Drive inteiro retorna zero:

- `Roteiros_Quinzenais_DiCastro_BBM.docx` (roteiros #1 a #12) — 24/04 e 29/04
- `Roteiros Virais DiCastro Novos.docx` — 19/05
- `Roteiros Virais DiCastro Final.docx` — 25/05

O que sobreviveu está consolidado em
[`ROTEIROS-DICASTRO-BBM.md`](ROTEIROS-DICASTRO-BBM.md).

### 3. Duplicatas

`Onboarding_DiCastro` ×4, `Acessos_DiCastro` ×4, `Roteiros_DiCastro_BBM` ×2 —
espalhados entre a pasta do cliente e a raiz do Drive. Já mapeado na
`AUDITORIA-DRIVE-EXPANSION-2026-07-26.md` §5.3, com a regra de mandar para
quarentena por 30 dias antes de apagar.

Enquanto houver quatro cópias do documento de acessos, trocar a senha em uma só
não resolve nada.

### 4. Nomes com barra

`Dicastro 02/07` como nome de pasta quebra link e exportação — exatamente o que
a convenção de nomes da auditoria (§6) proíbe. No mapa acima aparece como
`Dicastro 02-07`.
