# NICOLAS — CLAUDE

Acervo de trabalho da **Expansion**, sincronizado entre máquinas via GitHub.

Antes vivia local num Mac e era copiado à mão para o Google Drive. Agora vive
aqui, e o Claude Code na web trabalha direto sobre o repositório — sem depender
de nenhuma máquina em particular.

## Conteúdo

| Pasta / arquivo | O que é |
|---|---|
| [`CLIENTES/`](CLIENTES/) | Um acervo por cliente — contexto de negócio, mapa do Drive, conversas e análises |
| [`AEOS/`](AEOS/) | APEX Engineering Operating System — constituição de engenharia de produto, 12 volumes, 140 artigos |
| [`AEOS/ORGANIFY/`](AEOS/ORGANIFY/) | Missões M001 (Digital Twin do app.organifybr.com) e M002 (OS interno da Expansion) |
| `PLATAFORMA-WEBLUXURY-*` | Análise da plataforma WebLuxury — pareceres, anexos e rodadas de revisão |
| `CONSELHO-EXPANSION-*` | Conselho da Expansion e anexos |
| `EXPANSION-360`, `OPERACAO-REAL`, `AUDITORIA-DRIVE` | Diagnóstico e operação real da agência |
| `CASO-GESTOR-TRAFEGO-*` | Parecer + anexos sobre o vínculo com o gestor de tráfego e os alinhamentos de agosto/2026 |
| `POLITICA-PAGAMENTO-EXPANSION-*` | Análise e decisão sobre a data de pagamento do time |
| `POSICIONAMENTO-CONTEUDO-NICOLAS-*` | Posicionamento e estratégia de conteúdo |
| `POSICIONAMENTO-INSTAGRAM-EXPANSION-*` | Posição do perfil da empresa no Instagram, bio 3L e mapa do mercado |
| `POP-SOCIAL-MEDIA-v0.1.md` | POP de social media |
| [`business-model/`](business-model/) | Estruturação, custeio e precificação da Expansion — fonte única da verdade econômica |
| [`_audios/`](_audios/) | Transcrições de áudios e reuniões |

## Por onde começar

Para trabalhar numa conta de cliente, abra o `CONTEXTO` dela em
[`CLIENTES/`](CLIENTES/) — ex.:
[`CLIENTES/ALBANOS/ALBANOS-CONTEXTO.md`](CLIENTES/ALBANOS/ALBANOS-CONTEXTO.md).

Para usar o AEOS numa missão nova, abra
[`AEOS/VOL-XII-FORGE-MANUAL-DE-OPERACAO.md`](AEOS/VOL-XII-FORGE-MANUAL-DE-OPERACAO.md).
É o manual de operação; os outros volumes são consultados sob demanda.

Para entender as convenções do acervo e como o Claude deve trabalhar aqui,
veja [`CLAUDE.md`](CLAUDE.md).

## Acessar de outro dispositivo

Tudo o que está aqui vive em dois lugares, e eles servem a coisas diferentes.

### O repositório — o acervo e o código

Branch **`main`** consolida as 33 branches de sessão. É onde estão o sistema de
carrosséis, o Estúdio, o serviço de render e as fichas de cliente.

```
github.com/expansioncompanyoficial-hub/claude-expasion   ·   branch main
```

Abrindo o Claude Code na web em outro aparelho, é essa a branch a escolher.

### O Estúdio — a ferramenta

```
claude.ai/code/artifact/55d29291-2b1b-4003-94b8-db2da32c45da
```

Abre em qualquer aparelho logado na mesma conta. **O estado mora dentro da
página**: clientes, peças, capas geradas, capa escolhida, legenda e a palavra do
CTA. O botão *Salvar* publica uma nova versão com o que mudou — quem abrir depois
pega de onde parou.

Não é salvamento automático de propósito: publicar recarrega toda view aberta, e
salvar a cada tecla deixaria a página recarregando no meio da digitação. O rótulo
ao lado do botão avisa quando há mudança pendente.

### O que está onde

| | Onde |
|---|---|
| Régua visual medida no Canva | `BRANDSDECODED/MAQUINA/MEDIDAS-CANVA-*.md` |
| Os cinco templates | `.claude/skills/carrossel-viral/references/templates.md` |
| Como se escreve uma peça | `.claude/skills/carrossel-viral/references/template-01.md` |
| Capas e padrões de hook | `.claude/skills/carrossel-viral/references/capas.md` |
| Renderizador e exportador | `.claude/skills/carrossel-viral/scripts/` |
| Serviço de render e portal | `SERVICO/` |
| Peças produzidas | `CARROSSEIS/` |
| Protótipo do Estúdio | `ESTUDIO/` |
