# PADRÃO DE ROTEIROS — EXPANSION

**Documento vivo.** Este é o *design de roteiros da empresa*: todo roteiro
produzido pela Expansion — para qualquer cliente — sai neste padrão, sem
exceção. Definido pelo Nicolas em 03/08/2026.

**Referência visual canônica (Google Doc):**
[ROTEIROS NOVOS 03-08](https://docs.google.com/document/d/10J8lOt-ys19yzTb3Ti1A3lE43Wz5vMF0YwA0rCrnNLM/edit)
· ID `10J8lOt-ys19yzTb3Ti1A3lE43Wz5vMF0YwA0rCrnNLM` · pasta ALBANOS ECOSSISTEMA.
Em caso de dúvida sobre aparência, é esse doc que manda.

---

## 1. Estrutura do documento

```
# Título do documento            ← contexto da entrega (data, volume, origem)
  bloco de abertura              ← origem dos temas, checagem de duplicata,
                                   nota da revisão editorial, tabela-resumo
# GUIA N — Perfil (@handle)      ← um H1 por perfil/guia, na ordem do doc padrão
  *linha de brief em itálico*    ← público, tom e CTA do perfil
## ROTEIRO N — "Título"          ← um H2 por roteiro
...
## Notas para o time             ← fecho: aprovação, quem grava, prazos
```

## 2. Anatomia de um roteiro (obrigatória, nesta ordem)

```
## ROTEIRO N — "Título curto e forte"

🎯 TACO(H) | Pilar: <PILAR> — <TEMA>
   (com DATA SUGERIDA no título quando for data comemorativa)

**GANCHO** (0:00 – 0:05)
**CONTEXTO** (0:05 – 0:15)
**ARGUMENTO** (0:15 – 0:40)
**CTA** (0:40 – 0:50)

#Hashtags (5 a 8, do perfil)
```

- Falas sempre entre aspas — é texto pra ser **falado**, não lido.
- Direção de cena/produção em *itálico entre colchetes* antes da fala,
  quando houver: `*[Profissional em frente à câmera]*`.
- Blocos podem fundir quando o formato pede (ex.: `**CONTEXTO + ARGUMENTO**`
  em listas dinâmicas). Os tempos sempre aparecem.
- Institucionais podem estender até 0:60; os demais fecham em ~0:50.
- Numeração contínua dentro de cada guia (continua do último existente).

## 3. Tipografia e cor (extraídas do doc de referência)

| Elemento | Estilo no Docs | Especificação |
|---|---|---|
| Título do documento | Title | 26 pt |
| Guia/perfil (`# GUIA N`) | Heading 1 | 20 pt · espaço 400/120 |
| Roteiro (`## ROTEIRO N`) | Heading 2 | 16 pt **negrito** · espaço 360/120 |
| Subseção eventual | Heading 3 | 14 pt negrito `#434343` |
| Corpo (falas, blocos) | Normal | **Arial 11 pt** |
| Rótulos GANCHO/CONTEXTO/… | Normal | negrito no rótulo, tempos entre parênteses |
| Direção de cena | Normal | itálico |
| Links | — | azul `#1155CC` sublinhado |
| Nomes de arquivo/código | — | Roboto Mono verde `#188038` (chip de código) |

## 4. Como entregar

1. Escrever o roteiro em **markdown com esta hierarquia exata** de headings.
2. Subir no Drive via conector (`create_file`, `contentMimeType: text/markdown`,
   na pasta do cliente) — a conversão do Docs reproduz o padrão acima
   automaticamente. Foi assim que o doc de referência nasceu.
3. O arquivo `.md` fica versionado na pasta do cliente no repositório
   (`CLIENTES/<CLIENTE>/ROTEIROS-<ASSUNTO>-AAAA-MM-DD.md`).
4. Inserção no doc padrão do cliente (guia por guia, mantendo cores): sessão
   com o conector do Chrome (app desktop) ou colagem manual com Ctrl+Shift+V.

## 5. O que continua valendo junto com o padrão

O padrão visual **não substitui** as regras editoriais de cada cliente — elas
vêm do `<CLIENTE>-CONTEXTO.md` (na Albanos: as 12 regras da §4, framework
TACO(H), separação de perfis). Padrão é a forma; o contexto do cliente é o
limite do conteúdo.
