---
name: roteiro-expansion
description: >
  Cria roteiros de vídeo no padrão visual da Expansion e entrega como Google Docs
  nativo no Drive, na pasta do cliente. Aplica o framework TACO(H) com blocos
  GANCHO/CONTEXTO/ARGUMENTO/CTA cronometrados, a paleta laranja da casa
  (#E67E22), caixas destacadas no gancho e no CTA, e as regras editoriais do
  cliente. Use sempre que o usuário pedir para criar roteiro, gerar roteiros,
  roteiro semanal, roteiro de vídeo, roteiro para Instagram/Reels, conteúdo para
  gravação, criativo para tráfego pago, chamada de evento, ou mencionar
  "roteiros virais", "padrão de roteiro", "TACO(H)", ou pedir roteiro para
  qualquer cliente da agência (Albanos, Prime, Ciés, Clau Kids, Dr. Fred).
---

# Roteiro no padrão Expansion

Todo roteiro produzido pela Expansion sai neste formato, para qualquer cliente.
Padrão definido pelo Nicolas em 03/08/2026.

## Antes de escrever: leia o contexto do cliente

**Obrigatório.** No repositório de trabalho, abra
`CLIENTES/<CLIENTE>/<CLIENTE>-CONTEXTO.md` e leia a seção de **regras
editoriais** antes de escrever a primeira linha. São regras que a conta não
aceita quebrar — um termo errado derruba o conteúdo na aprovação, e já derrubou.

Se não houver documento de contexto para esse cliente, pergunte ao usuário:
público, oferta, CTA desejado e o que a conta não aceita.

Também conferir os roteiros **já existentes** do cliente para não duplicar
gancho nem ângulo.

## Anatomia obrigatória

Cada roteiro tem, nesta ordem:

```
ROTEIRO N — "Título curto e forte"
DATA SUGERIDA: ...                    (só quando for data comemorativa)
🎯 TACO(H)  |  Pilar: <PILAR> — <TEMA>
GANCHO     (0:00 – 0:05)   → caixa destacada
CONTEXTO   (0:05 – 0:15)   → texto corrido
ARGUMENTO  (0:15 – 0:40)   → texto corrido
CTA        (0:40 – 0:50)   → caixa destacada
#Hashtags  (5 a 8, do perfil)
```

- Falas **entre aspas** — é texto para ser falado, não lido. Frases curtas,
  ritmo de fala.
- Direção de cena entre colchetes, quando houver: `[Profissional em frente à câmera]`.
- Gancho forte nos 3 primeiros segundos, sem clickbait vazio.
- CTA de **um passo só**.
- Institucionais podem ir até `0:60`. Criativos de tráfego usam
  GANCHO / DESENVOLVIMENTO / CTA / DESCRIÇÃO.
- Numeração contínua por perfil (continua do último roteiro existente).

**Pilares TACO(H):** T = Técnico · A = Autoridade · C = Conexão ·
O = Objeção · H = Hype.

## Paleta (não alterar)

| Uso | Hex |
|---|---|
| Laranja da marca — subtítulo, rótulos, barras | `#E67E22` |
| Título do documento e do roteiro | `#1A1A1A` |
| Linha do framework | `#666666` |
| Tempos e hashtags | `#999999` |
| Faixa do título do roteiro e caixa do CTA | `#FFF0E0` |
| Caixa do GANCHO | `#FFF8F0` |

Só **GANCHO e CTA** ganham caixa. É o contraste que faz o roteiro ser legível
na hora da gravação.

## Como entregar

Três passos. Não montar o visual à mão — os scripts já emitem o padrão.

**1. Escreva os roteiros em JSON** (`roteiros.json`):

```json
{
  "titulo": "Fórum TEIA — Roteiros Virais",
  "subtitulo": "@forumteia  •  Evento  •  Profissionais e Terapeutas",
  "framework": "Framework: TACO(H)  |  8 Roteiros  |  Foco: ...",
  "roteiros": [{
    "titulo": "ROTEIRO 1 — \"Título\"",
    "pilar": "🎯 TACO(H)  |  Pilar: HYPE — CHAMADA",
    "data": "DATA SUGERIDA: 05/08 (Dia Nacional da Saúde)",
    "blocos": [
      {"rotulo":"GANCHO","tempo":"0:00 – 0:05","texto":"\"...\"","destaque":"gancho"},
      {"rotulo":"CONTEXTO","tempo":"0:05 – 0:15","texto":"\"...\""},
      {"rotulo":"ARGUMENTO","tempo":"0:15 – 0:40","texto":"\"...\""},
      {"rotulo":"CTA","tempo":"0:40 – 0:50","texto":"\"...\"","destaque":"cta"}
    ],
    "hashtags": "#Tag1 #Tag2"
  }]
}
```

Campo `secoes` (opcional) para blocos com cabeçalho próprio, como tráfego pago:
`{"cabecalho": "TRÁFEGO PAGO — 2 criativos", "roteiros": [...]}`.

**2. Gere o HTML:**

```bash
python3 scripts/gerar-roteiros-html.py roteiros.json saida.html
```

**3. Suba como Google Docs nativo**, com o conector do Google Drive:

```
create_file
  title: "<NOME DO PERFIL>"          ← só o nome do perfil, nada mais
  parentId: <pasta do cliente no Drive>
  contentMimeType: "text/html"
  textContent: <conteúdo do saida.html>
```

O Drive converte HTML → Google Docs preservando cor, fundo e barra lateral.

> 📛 **O documento nasce com o nome do perfil, e só ele.** `Clínica Albanos`,
> `Albanos Academy`, `Fórum TEIA`, `Cristiane Albano`. Sem data no título, sem
> prefixo "Roteiros —", sem sufixo.

**4. Dois ajustes manuais no Google Docs** — o conector expõe só a API do
Drive, não a do Docs, então **nenhum dos dois dá para automatizar**. São
segundos cada, feitos uma vez por documento assim que ele sobe:

| Ajuste | Onde |
|---|---|
| **Renomear a guia** com o nome do perfil | Painel de guias à esquerda → ⋮ na guia → **Renomear**. Ela nasce como "Guia 1" — o nome do arquivo **não** vira o nome da guia. |
| **Formato sem páginas** | **Formatar → Mudar para o formato sem páginas → OK** |

⚠️ **Avise o usuário dos dois em toda entrega**, listando os documentos
criados. Não prometa que subiram prontos: eles não sobem.

Se a sessão tiver o **conector do Chrome** (app desktop), aí sim dá para fazer
os dois automaticamente, dirigindo a interface do Google Docs.

> ⚠️ **Não subir `.docx` para o Drive.** Ele entra como anexo, não como
> documento, e não abre direto. O `.docx` só serve quando o cliente pedir Word
> explicitamente — nesse caso use `scripts/gerar-roteiros-docx.py`, que
> reaproveita `reference/PADRAO-ROTEIROS-ECOSSISTEMA.docx`, e suba com
> `disableConversionToGoogleType: true`.

**Um documento por perfil.** Nunca empilhar perfis diferentes no mesmo arquivo.

## Já tem os roteiros em markdown?

Se o conteúdo já existe em markdown no formato do acervo (`## ROTEIRO N — …`
com `**GANCHO** (0:00 – 0:05)`), converta em vez de reescrever:

```bash
python3 scripts/md-para-roteiros-json.py entrada.md prefixo
```

Gera um JSON por guia (`# GUIA N — Nome (@handle)`).

## Antes de entregar, confira

- [ ] Nenhuma regra editorial do cliente foi quebrada
- [ ] Nenhum gancho ou ângulo repete roteiro existente
- [ ] Todo roteiro tem os quatro blocos com tempos
- [ ] Toda fala está entre aspas e soa natural falada
- [ ] Hashtags coerentes com o perfil (5 a 8)
- [ ] Um documento por perfil, na pasta certa do Drive
- [ ] **Documento nomeado só com o nome do perfil**
- [ ] **Usuário avisado do passo "formato sem páginas"**
- [ ] Datas comemorativas com folga para aprovação e programação

## Depois de entregar

Todo roteiro passa pela aprovação do cliente — **vídeo e legenda,
separadamente**. Avise no fechamento quem grava e qual o prazo das datas
comemorativas. Se a conta exige antecedência para agendar gravação (na Albanos
são 2 dias), lembre disso.
