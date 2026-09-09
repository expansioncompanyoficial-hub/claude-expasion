# Marca EXPANSION — arquivos oficiais

Trazidos do Google Drive, da pasta **EXPANSION - IDENTIDADE GERAL / LOGO**, pelo
conector do Drive (`drive.google.com` é bloqueado por HTTP neste ambiente — ver
`CLAUDE.md`). Estão versionados aqui para que qualquer máquina monte material
sem depender do Drive.

## Originais — não editar

| Arquivo | Origem no Drive | ID |
|---|---|---|
| `expansion-cores-e-escrita.png` | CORES E ESCRITA | `1vyMgz91O0q3AMxsA1WUiu-mhhBFVaOrH` |
| `expansion-letreiro-preto.png` | EXPANSION LETREIRO - PRETO | `1gZAI1PgPD3Lnoe22bxNY2v3KPxXH9d01` |
| `expansion-letreiro-branco.png` | LETREIRO EXPANSION - BRANCO | `1F76awLB8sVPcupGiXAUnecF7M9aflUGB` |
| `expansion-simbolo.png` | SÍMBOLO EXPANSION | `1G1YIzDwb2aH23DIeRNsYKdGeyMh8z1PE` |

Pasta LOGO: `1HTbbDkDuqFGh-sRevfMzz_6T83KnI15n` ·
Pasta IDENTIDADE GERAL: `1Y3H3sOfWD8VSqdO26WCvqqc0k-wfPaKs`

Existe no Drive um quinto arquivo, **EXPANSION - PRODUÇÕES**
(`1RJ_SkNJh9Q3u2eYHGKK2LoEQOOFcnYhv`), byte a byte do mesmo tamanho do SÍMBOLO —
aparentemente o mesmo arquivo duplicado. Não foi trazido.

## O que a identidade define

Do arquivo **CORES E ESCRITA**, que é a peça oficial de identidade visual:

| | |
|---|---|
| Preto | `#000000` |
| Laranja | `#F3A33B` |
| Branco | `#FFFFFF` |
| Tipografia | Open Sans Bold, em maiúsculas |
| Aplicações | Camisetas · Bandeira · Papelaria · Redes sociais |

O símbolo é um conjunto de anéis concêntricos com abertura, em gradiente laranja
que vai de `#9D350B` a `#E29535`. No letreiro, ele substitui o **O** de
EXPANSION.

## Derivados — `derivados/`

Gerados por `.claude/skills/designer-expansion/bin/preparar-marca.py`. O script
**não redesenha, não recolore, não distorce e não recria** nada:

| Arquivo | O que foi feito | Tamanho |
|---|---|---|
| `letreiro-preto.png` | Recorte da transparência em volta | 1374×194 |
| `letreiro-branco.png` | Recorte da transparência em volta | 1137×158 |
| `simbolo-anel.png` | Anel separado do bloco de texto do lockup vertical | 391×389 |

Os originais vêm em telas de 1920×1080 com a marca centralizada. Colocados
direto num layout, o que se alinha é a caixa, não o desenho — por isso os
recortes.

**`simbolo-anel.png` pede validação.** O arquivo SÍMBOLO EXPANSION é um lockup
vertical: anel em cima, “EXPANSION PRODUÇÕES” embaixo. O derivado isola o anel,
sem tocar em forma nem em cor. Como o texto do lockup é da **Produções** e os
materiais de assessoria não são dela, o anel isolado é usado apenas como marca
discreta de cabeçalho e rodapé — nunca como assinatura. Se o uso do símbolo
isolado não for aprovado, basta remover as referências a ele nos templates.

## Regras de uso

- Nunca alterar, redesenhar, distorcer ou recriar a logo
- Nunca unir ou sobrepor com a marca de um cliente
- Respiro em volta de pelo menos metade da altura do letreiro
- Letreiro branco em fundo escuro; letreiro preto em fundo claro
- Símbolo só em tamanho discreto, em cabeçalho e rodapé
- Assinatura “Estratégia e desenvolvimento: EXPANSION” apenas na capa,
  contracapa, rodapé ou créditos

O verificador de layout (`bin/gerar-pdf.mjs`) reprova o material quando uma
imagem aparece fora da proporção do arquivo original — é o que impede a logo
esticada de passar despercebida.

## Para trazer um arquivo novo do Drive

O conector devolve o conteúdo em base64. Arquivo grande estoura o limite de
resposta e o próprio Claude Code salva o resultado num `.txt` — daí é só
decodificar:

```python
import json, base64
d = json.load(open("<caminho do .txt que a ferramenta salvou>"))
open("assets/marca-expansion/<nome>.png", "wb").write(base64.b64decode(d["content"]))
```
