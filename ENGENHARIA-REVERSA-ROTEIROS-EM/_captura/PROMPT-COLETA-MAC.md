# PROMPT DE COLETA — rodar no Mac, não na web

Este é o passo que destrava tudo. A análise está pronta para rodar; falta a base.

---

## Opção preferida: Remote Control (o Mac vira a mão, a web continua sendo a cabeça)

Não existe "aprovação" que a sessão da nuvem envie para o Chrome — a extensão
Claude in Chrome pareia com um Claude Code rodando **na mesma máquina** que o
navegador. O aperto de mão começa sempre no Mac.

O `remote-control` resolve isso pela via correta: a sessão roda no Mac (com o
Chrome logado e os MCPs locais) e fica visível em claude.ai/code, de onde a
sessão de análise consegue enviar a tarefa direto para ela.

```bash
cd <pasta-do-repo>        # clonar antes, se ainda não existir no Mac
git checkout claude/elias-maman-roteiros-reversa-yyo9sd
claude remote-control
```

O processo fica de pé no terminal e imprime a URL da sessão. Deixar aberto
durante toda a coleta. Requisitos: extensão **Claude in Chrome** instalada e
Chrome **logado no Instagram**.

Feito isso, avisar na sessão de análise — ela envia o prompt abaixo sozinha.

---

## Opção manual: colar o prompt na mão

## Por que no Mac

A sessão da web roda em container na nuvem, com egress bloqueado: `instagram.com`
responde 403 no gateway, e o Chrome que interessa (o seu, logado) está na sua
máquina. As ferramentas `chrome__navigate` / `chrome__computer` existem no Mac —
estão registradas em `.claude/reference/settings.local.mac.json`. Lá elas funcionam.

## Como rodar

1. No Mac, abrir o Chrome **logado no Instagram**.
2. Abrir o Claude Code na pasta do repositório.
3. Colar o prompt abaixo.

---

## PROMPT (copiar daqui para baixo)

```
Trabalhe no repositório claude-expasion, branch claude/elias-maman-roteiros-reversa-yyo9sd.

Leia primeiro ENGENHARIA-REVERSA-ROTEIROS-EM/01_BASE_DE_EVIDENCIAS.md — ele define
o que precisa ser coletado e por quê. Sua tarefa é SÓ COLETAR. Não analise, não
interprete, não tire conclusões. Quem analisa é a sessão seguinte.

Pelo meu Chrome (já logado), abra https://www.instagram.com/elias.maman/ e colete:

- EM01 a EM40: os 40 Reels de MAIOR número de visualizações do perfil.
- EM41 a EM55: 15 Reels de desempenho MEDIANO ou BAIXO, do mesmo período dos 40
  acima. Este é o grupo de controle e não é opcional — sem ele não dá para separar
  "o que funciona" de "o que ele sempre faz".

Para cada vídeo:
1. Preencha a linha no CSV ENGENHARIA-REVERSA-ROTEIROS-EM/_captura/INVENTARIO-EM.csv
2. Crie ENGENHARIA-REVERSA-ROTEIROS-EM/_captura/transcricoes/EMxx.md seguindo
   exatamente o MODELO-TRANSCRICAO.md da mesma pasta.

A transcrição é o item crítico. Precisa ser LITERAL e com timestamp a cada ~5s.
Mantenha repetições, hesitações e frases cortadas — são dado, não ruído.
Se a transcrição automática do Instagram estiver disponível, use como base e
CORRIJA ouvindo o áudio. Transcrição automática erra justamente nas ênfases.

Regras invioláveis:
- Não invente métrica, fala ou data. Campo que não conseguir ver, deixe vazio.
- Compartilhamentos e salvamentos são privados: deixe sempre vazios.
- Não resuma o que foi dito. Transcreva.

Vá salvando a cada 5 vídeos e commitando — não acumule 55 na memória.
Ao terminar, atualize a seção 5 do 01_BASE_DE_EVIDENCIAS.md com quantos foram
coletados e o que faltou, e faça push da branch.
```

---

## Alternativa sem Claude no Mac

Se preferir que a social media colete na mão, o pacote é o mesmo: CSV + um `.md`
por vídeo no modelo. Fonte de transcrição rápida: **TurboScribe** — já está na
rotina da casa (POP Social Media, §1.4). Baixar o Reel, jogar na ferramenta,
colar o texto no modelo, corrigir as ênfases ouvindo.

Ordem de prioridade, se o tempo apertar: **transcrição > métricas > legenda >
sinais de edição**. Com transcrição + views eu já entrego as seções 5, 6 e 7.
Sem transcrição, não entrego nenhuma.
