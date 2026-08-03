# PADRÃO DE ROTEIROS — EXPANSION

**Documento vivo.** Este é o *design de roteiros da empresa*: todo roteiro
produzido pela Expansion — para qualquer cliente — sai neste padrão, sem
exceção. Definido pelo Nicolas em 03/08/2026.

**Arquivo de referência (a fonte da verdade):**
[`.claude/reference/PADRAO-ROTEIROS-ECOSSISTEMA.docx`](.claude/reference/PADRAO-ROTEIROS-ECOSSISTEMA.docx)

Em caso de dúvida sobre aparência, abre esse arquivo. A especificação abaixo foi
extraída dele, não escrita de memória.

---

## 1. Como produzir (o caminho, não o texto)

O padrão **não é copiado à mão**: os scripts emitem o formato pronto.
A entrega é **Google Docs nativo na pasta do cliente no Drive**.

```bash
# 1. (opcional) roteiros em markdown  →  JSON estruturado
python3 .claude/scripts/md-para-roteiros-json.py ROTEIROS-X.md saida

# 2. JSON  →  HTML no padrão
python3 .claude/scripts/gerar-roteiros-html.py saida-perfil.json ROTEIROS-PERFIL.html

# 3. HTML  →  Google Docs, na pasta do cliente
#    conector Google Drive · create_file
#    contentMimeType: text/html
#    textContent: <conteúdo do .html>
```

O Drive converte HTML → Google Docs preservando cor, fundo e barra lateral.

> ⚠️ **Não subir `.docx` para o Drive.** Ele entra como **anexo**, não como
> documento, e não abre direto — testado e confirmado em 03/08. O `.docx` só
> serve quando o cliente pedir Word explicitamente; aí use
> `gerar-roteiros-docx.py` (que reaproveita o esqueleto do arquivo de
> referência, fidelidade exata) e suba com `disableConversionToGoogleType: true`
> — sem essa flag o conector responde `Invalid conversion requested`.

**Um documento por perfil.** Não empilhar perfis diferentes no mesmo arquivo.

## 2. Paleta

| Cor | Hex | Onde |
|---|---|---|
| Laranja da marca | `#E67E22` | Subtítulo, linha do pilar, rótulos de bloco, barra lateral |
| Texto escuro | `#1A1A1A` | Título do documento e título do roteiro |
| Cinza médio | `#666666` | Linha do framework |
| Cinza claro | `#999999` | Tempos dos blocos e hashtags |
| Fundo forte | `#FFF0E0` | Faixa do título do roteiro e caixa do CTA |
| Fundo suave | `#FFF8F0` | Caixa do GANCHO |

## 3. Anatomia (na ordem exata)

| # | Elemento | Formatação |
|---|---|---|
| 1 | **Título do documento** | Heading 1 · 22 pt · negrito · `#1A1A1A` · espaço antes 480 |
| 2 | **Subtítulo** — `@perfil • Produto • Público` | 10 pt · negrito · `#E67E22` |
| 3 | *(parágrafo vazio)* | — |
| 4 | **Linha do framework** | 9 pt · `#666666` |
| 5 | **Título do roteiro** — `ROTEIRO N — "Título"` | Heading 2 · 14 pt · negrito · `#1A1A1A` · fundo `#FFF0E0` · **barra esquerda `#E67E22` sz 27** |
| 6 | **Data sugerida** *(quando houver)* | 10 pt · negrito · `#E67E22` |
| 7 | **Linha do pilar** — `🎯 TACO(H) \| Pilar: …` | 10 pt · `#E67E22` |
| 8 | **Rótulo do bloco** — `GANCHO (0:00 – 0:05)` | nome: 10 pt negrito `#E67E22` · tempo: 9 pt `#999999` |
| 9 | **Caixa do GANCHO** | 10 pt · fundo `#FFF8F0` · **barra esquerda `#E67E22` sz 21** |
| 10 | **Corpo** (CONTEXTO, ARGUMENTO) | 10 pt · sem fundo |
| 11 | **Caixa do CTA** | 10 pt · fundo `#FFF0E0` · **barra esquerda `#E67E22` sz 21** |
| 12 | **Hashtags** | 9 pt · `#999999` |
| 13 | *(parágrafo vazio entre roteiros)* | — |

**Só GANCHO e CTA ganham caixa.** Contexto e argumento são texto corrido — é o
contraste que faz o roteiro ser legível na hora da gravação.

**Seção de tráfego pago** (opcional): cabeçalho próprio 13 pt negrito `#E67E22`
com fundo `#FFF0E0`, e os blocos passam a ser
GANCHO / DESENVOLVIMENTO / CTA / DESCRIÇÃO.

## 4. O conteúdo dos blocos

Falas entre aspas — é texto para ser **falado**, não lido. Direção de cena entre
colchetes. Tempos padrão: `0:00 – 0:05` · `0:05 – 0:15` · `0:15 – 0:40` ·
`0:40 – 0:50`. Institucionais podem ir até `0:60`.

## 5. O que continua valendo

O padrão visual **não substitui** as regras editoriais de cada cliente — elas
vêm do `<CLIENTE>-CONTEXTO.md` (na Albanos: as 12 regras da §4, framework
TACO(H), separação de perfis). Padrão é a forma; o contexto do cliente é o
limite do conteúdo.

## 6. Histórico

- **03/08/2026** — padrão definido a partir de `Roteiros — Ecossistema Albanos`.
  Um modelo anterior (`MOD_ ROTEIRO SEMANAL.docx`, baseado em tabelas e no
  laranja `#E69138`) foi descartado pelo Nicolas: **não é o padrão da casa**.

## 7. Skill

O padrão está empacotado na skill de conta **`roteiro-expansion`** — invocada
automaticamente quando o pedido é de roteiro, ou pelo nome. Ela carrega a
anatomia, a paleta e os três scripts geradores.

Cópia versionada em `.claude/skills-backup/roteiro-expansion/` (a skill em si
sincroniza pela conta Claude, não pelo repositório — o backup existe para o caso
de precisar reinstalar).
