# Geração de fundo de capa — manual de operação

Como criar o fundo de uma capa, escolher, aprovar e levar para o carrossel.

> **Consolidação declarada.** O pedido listava `image-provider.md`,
> `brand-cover-configuration.md`, `visual-qa.md` e
> `operator-cover-workflow.md` como arquivos separados. Estão aqui, como
> seções — quatro documentos de meia página que se referenciam entre si
> envelhecem desencontrados, e este fluxo é curto o bastante para caber num
> lugar só. O mapa de arquitetura continua separado, em
> `cover-generator-integration-map.md`, porque tem outro leitor.

---

## O que é fundo e o que é capa final

São entregas diferentes e ficam guardadas separadas:

| | Fundo | Capa final |
|---|---|---|
| Tem headline | não | sim |
| Tem logo, chip, barra | não | sim |
| Quem produz | provedor de imagem, ou você | o renderizador que já existe |
| Onde fica | `SERVICO/dados/capas/<job>/` | `CARROSSEIS/<peça>/png/` |

**O gerador de imagem nunca escreve a headline.** Não é preferência: modelo de
imagem produz letra deformada, e letra dentro do fundo não tem conserto na
composição. `prompt.py` levanta erro se a frase aprovada vazar para dentro do
prompt, e `esquema.py` recusa `include_text: true`.

## Antes de começar: qual provedor existe

```bash
python3 - <<'PY'
import sys; sys.path.insert(0, '.claude/skills/carrossel-viral/scripts')
from capas.provedor import disponiveis
for p in disponiveis(): print(p)
PY
```

Hoje esta conta devolve dois, e nenhum gera imagem sozinho:

- **`manual`** — você traz o arquivo. O sistema faz o resto: corte ancorado,
  QA, derivadas, composição, registro. É o caminho recomendado enquanto não
  houver gerador.
- **`briefing`** — nenhuma imagem. Entrega conceito, prompt e negative prompt
  prontos para levar a outra ferramenta. O job termina em
  `generation_failed`, de propósito: prompt não é imagem.

Para ligar um provedor por API: implemente uma classe com a interface de
`provedor.Provedor`, registre em `POR_API` o **nome da variável** que guarda a
credencial, e pronto. O valor nunca é lido para dentro de retorno, job ou log.

## Cadastro visual do cliente

Vai na ficha que já existe, `CLIENTES/<X>/FICHA-CARROSSEL-<X>.md`, como bloco
JSON. Não há segundo cadastro de clientes.

````markdown
```json cover_generation
{
  "enabled": true,
  "visual_style": "",
  "photographic_style": "",
  "boldness": 8,
  "realism": 9,
  "preferred_text_position": "bottom",
  "allowed_elements": [],
  "forbidden_elements": [],
  "reference_profiles": [],
  "approved_cover_ids": [],
  "rejected_cover_ids": [],
  "recent_pattern_ids": [],
  "pattern_cooldown_days": 30
}
```
````

Campo vazio **não é preenchido sozinho.** `marca.resolve` devolve a lista
`faltando` e o job carrega isso como aviso. Preencher o estilo fotográfico da
Prime com o da Expansion transformaria toda marca em fundo preto com luz
âmbar — que é exatamente o que não pode acontecer.

## O fluxo, do começo ao fim

```python
from capas import fluxo, provedor

job, marca = fluxo.abre_job("expansion", texto_do_carrossel, {
    "content": {"emotion": "urgencia", "forbidden_elements": ["cifrão"]},
    "output": {"variations": 3, "text_position": "bottom"}}, leitura)

job = fluxo.prepara(job, marca, conceitos)      # valida os três e compõe prompts
print(fluxo.orcamento(job, provedor.escolhe("manual")))   # antes de gastar

job = fluxo.gera(job, marca, provedor.escolhe("manual"), arquivos)
job = fluxo.seleciona(job, job["recommended"])
job = fluxo.aprova(job, marca)

spec_novo = compoe.aplica(spec_do_carrossel, job)   # slides[0].foto_fundo
```

`abre_job` lê o **carrossel inteiro**, não a headline. É de propósito: uma
capa criada a partir da manchete isolada acerta a palavra e erra o assunto.
O exemplo que motivou a regra — "sua coleção tem prazo de validade" não é
comida vencida, é a janela curta para vender pelo preço cheio, e isso só está
escrito nos slides 2 a 8.

## Os três conceitos

`estrategia.valida_conceitos` recusa três conceitos que são o mesmo conceito.
A comparação é por metáfora e ponto focal; cor fica de fora de propósito,
porque é justamente o eixo que se troca para fingir variedade. Trocar cor,
ângulo ou objeto secundário não cria alternativa — cria a ilusão de escolha, e
aí o operador aprova a primeira porque as três são iguais.

## QA — o que a máquina mede e o que ela não mede

**Técnico, automático e confiável:** dimensão, proporção, nitidez, contraste,
ruído, ocupação da faixa da headline, indício de texto acidental, ponto focal.

**Semântico, em aberto:** se a imagem representa a headline, se a metáfora
comunica o problema, se há leitura contrária, se está genérica, se é coerente
com a cliente, se há deformação, se há risco de cópia. Sai do módulo com
`respondido: false` e sete perguntas. Nada disso se calcula a partir de pixel,
e fingir que variância de borda mede qualidade estratégica seria a pior
mentira deste sistema — porque passaria despercebida.

## Regeneração

Não repita o prompt. Classifique o eixo do defeito e mude só ele, preservando
o que foi aprovado:

> Problema: a poeira parece glitter.
> Preservar: arara, composição, espaço inferior.
> Alterar: cor, textura e comportamento da poeira.

Teto: três conceitos, uma geração por conceito, até duas regenerações
automáticas (`fluxo.TETO_REGENERACOES`). Depois disso, decisão humana.

## Quando a capa precisa ser refeita

Só quatro motivos, em `compoe.GATILHOS_REGERAR`: headline mudou, marca mudou,
conceito foi rejeitado, operador pediu. **Editar texto de slide interno não
regenera nada** — seria pagar geração de imagem por causa de vírgula.

## Onde os arquivos ficam

```
SERVICO/dados/capas/<job_id>/
  job.json              o registro inteiro: entrada, conceitos, prompts, QA,
                        estados, feedback
  C1/bruto-01.jpg       o arquivo como chegou
  C1-fundo.png          o fundo, cortado e ancorado, sem texto nenhum
  C1-fundo-mini.jpg     miniatura — é assim que o feed vai mostrar
  C1-fundo-previa.jpg   prévia
```

`SERVICO/dados/` é **estado local e não vai para o git**. O que sobrevive é a
peça final em `CARROSSEIS/`. Exporte antes de contar com o arquivo.

## Erros que você vai encontrar

| Mensagem | O que fazer |
|---|---|
| `informe headline ou theme` | o pedido veio sem assunto |
| `a headline do pedido não é a do carrossel` | alguém editou o texto depois de aprovar. Aprove de novo |
| `são o mesmo conceito` | mude a metáfora ou o ponto focal, não a cor |
| `a headline aprovada apareceu dentro do prompt` | descreva a cena, não a frase |
| `provedor manual sem arquivo` | informe `arquivos` no pedido |
| `não dá para ir de X para Y` | a máquina de estados não pula etapa |
| `recusa sem motivo não serve para nada` | diga o que está errado, senão a regeneração repete |
