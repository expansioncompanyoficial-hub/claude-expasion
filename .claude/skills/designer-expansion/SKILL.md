---
name: designer-expansion
description: >-
  Cria materiais de cliente da EXPANSION com identidade própria e entrega em PDF
  pronto para envio — apresentações 16:9, documentos A4, propostas comerciais,
  planejamentos, cronogramas de conteúdo, calendários editoriais, estratégias,
  planos de ação, processos operacionais, passo a passos, roteiros de vídeo e
  gravação, relatórios, manuais de execução, materiais de onboarding, documentos
  de alinhamento e guias para equipe. Combina a marca da EXPANSION com a do
  cliente, monta o conteúdo em ordem lógica, confere o layout por medição e
  gera PDF e HTML editável. Use sempre que pedirem para criar, montar, desenhar,
  diagramar ou "deixar apresentável" um material para cliente da EXPANSION.
---

# Designer da EXPANSION

Direção de criação e design editorial para materiais de cliente. O trabalho tem
duas metades que valem igual: **o conteúdo organizado** e **o desenho que o
apresenta**. Material bonito com conteúdo desorganizado não passa; conteúdo bom
em página feia também não.

O resultado tem que transmitir estratégia, organização e autoridade — e não
pode parecer template genérico nem resposta de chatbot diagramada.

## O que já está resolvido

Não redecida nada disto a cada material:

| | |
|---|---|
| Paleta | Preto `#000000` · Laranja `#F3A33B` · Branco `#FFFFFF` |
| Tipografia | Open Sans (embutida no CSS, 300–800, com itálico) |
| Marca | `assets/marca-expansion/derivados/` — letreiro branco, letreiro preto, símbolo |
| Formatos | A4 (210×297 mm) e 16:9 (1280×720) |
| Componentes | cards, tabelas, linha do tempo, trilho, passos, KPI, etiquetas, destaque, pendência |

Tudo vem dos arquivos oficiais da identidade. A origem e as regras de uso estão
em `assets/marca-expansion/README.md`. O detalhamento visual está em
`referencias/SISTEMA-VISUAL.md`.

## Antes de montar: o briefing

Precisa de sete coisas. Falta essencial vira **pergunta curta**; o resto vira
decisão profissional, tomada e mostrada.

1. **Cliente** — nome exato, como ele escreve
2. **Segmento e público** — quem recebe o material e o que já sabe
3. **Objetivo** — o que precisa acontecer depois que a pessoa ler
4. **Tipo de material** — proposta, cronograma, estratégia, roteiro…
5. **Formato** — A4 ou 16:9
6. **Conteúdo** — o que já existe, aprovado
7. **Prazo ou período** do projeto

E os arquivos da marca do cliente: **logo em PNG com fundo transparente** (de
preferência uma versão para fundo claro e outra para escuro) e as **cores
oficiais**. Sem isso, o material sai na identidade EXPANSION pura — o que é
melhor do que cor estimada por captura de tela.

Pergunte só o indispensável. Não trave a entrega por detalhe que uma decisão
segura resolve.

## O que nunca se inventa

Número, resultado, prazo, preço, condição comercial, depoimento, case,
característica do cliente, serviço não contratado. **Sem confirmação, o campo
vai para dentro de `.pendente`** — e a pendência é repetida no fim da entrega.

Pode: corrigir ortografia, melhorar títulos, encurtar texto, reorganizar,
remover repetição, criar hierarquia, virar tabela, ajustar tom.
Não pode: alterar fato, prometer resultado, criar preço, inserir entrega.

## As duas marcas

O material é do cliente; a EXPANSION assina a estratégia.

- Marca do cliente em posição de destaque, peso visual igual ou maior
- EXPANSION como responsável — assinatura “Estratégia e desenvolvimento:
  EXPANSION” **só** na capa, contracapa, rodapé ou créditos
- Nunca unir, sobrepor, recolorir, esticar ou recriar qualquer uma das duas
- Nunca transformar a página em disputa entre as marcas

## Como montar

```bash
# 1. pasta do material
mkdir -p materiais/CLIENTE-TIPO-DE-MATERIAL

# 2. esqueleto (A4 ou 16:9)
cp .claude/skills/designer-expansion/templates/documento-a4.html \
   materiais/CLIENTE-TIPO-DE-MATERIAL/material.html

# 3. logo do cliente na mesma pasta, referenciada por caminho relativo

# 4. preencher, e então gerar
node .claude/skills/designer-expansion/bin/gerar-pdf.mjs \
  materiais/CLIENTE-TIPO-DE-MATERIAL/material.html \
  -o materiais/CLIENTE-TIPO-DE-MATERIAL/CLIENTE-MATERIAL-AAAA-MM-DD.pdf \
  --html --previa
```

`--previa` salva um PNG por página. **Olhe as prévias antes de entregar** — a
medição pega estouro e deformação, não pega composição feia.

O renderizador reprova e não gera o PDF quando encontra: conteúdo estourando a
página, elemento fora da margem, imagem que não carregou ou **logo fora da
proporção do arquivo original**. Corrija a causa; `--forcar` existe para
emergência, não para rotina.

## Ordem de montagem

1. Ler tudo que foi enviado
2. Definir a mensagem central — uma frase
3. Ordenar o conteúdo pela lógica de quem lê, não pela ordem em que chegou
4. Distribuir: **uma ideia por página** (A4) ou por tela (16:9)
5. Escolher os componentes: comparação vira tabela, sequência vira linha do
   tempo ou passos, categorias viram cards, número que decide vira KPI
6. Cortar repetição, frase vaga e texto genérico
7. Montar, gerar, olhar as prévias, corrigir
8. Rodar a `referencias/CHECKLIST-DE-ENTREGA.md`

Cada tipo de material tem uma estrutura de conteúdo esperada — cronograma,
estratégia, passo a passo e roteiro estão em
`referencias/ESTRUTURAS-DE-CONTEUDO.md`. Leia a seção do tipo que vai montar
antes de decidir as páginas.

## O que entregar

1. O PDF
2. O HTML de arquivo único (`--html`), que é a versão editável
3. Um resumo curto do que foi criado
4. **A lista do que ainda precisa ser validado**
5. Uma orientação de como apresentar ou usar o material

## Erros que estragam material bom

- Página cheia até a borda — vira apostila
- Texto miúdo para fazer caber; se não coube, é outra página
- Parágrafo longo onde cabia tabela
- Laranja como cor de texto sobre branco (contraste 2,1:1 — não se lê)
- Ícones de estilos diferentes na mesma peça, emoji em material profissional
- Gradiente, sombra pesada, 3D, ornamento sem função
- Logo grande repetida em toda página
- Imagem genérica de banco sem relação com o cliente
- Slide com texto de documento: slide é apoio de fala
