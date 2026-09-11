---
name: transcrever-whatsapp
description: Transcreve e analisa os áudios de uma exportação do WhatsApp (ZIP ou pasta), casando cada mensagem de voz com remetente, data e hora lidos do arquivo da conversa, e prepara uma resposta pronta para enviar ao cliente. Use sempre que o usuário pedir para ouvir, transcrever ou entender áudios do WhatsApp, analisar uma exportação de conversa ou grupo, estudar mensagens de voz de um cliente, saber o que alguém falou nos áudios, ou preparar uma resposta com base neles — inclusive quando disser só "ouve o áudio dela", "dá um jeito de ouvir", "transcreve esses áudios" ou mandar um ZIP de conversa.
---

# Transcrever e responder áudios do WhatsApp

Pipeline em duas partes: o script faz o que é determinístico (achar, casar, decodificar,
fatiar, transcrever, registrar); você faz o que exige julgamento (ler o contexto, separar
fato de interpretação, escrever a resposta).

## 1. Rode o script

```bash
python3 .claude/skills/transcrever-whatsapp/scripts/transcribe_whatsapp.py \
  CAMINHO/DA/EXPORTACAO.zip --out _transcricoes/NOME-DO-CASO --model small --lang pt
```

Opções úteis: `--sender "Nome"` (só os áudios de uma pessoa) · `--since AAAA-MM-DD` ·
`--max-audios N` (os N mais recentes) · `--engine` para forçar um motor · `--no-cache`.

O script grava em `--out`: **`transcricao_integral.md`**, **`manifesto.json`** e uma cópia
da conversa. Há cache por SHA-256, então repetir a execução não retranscreve nada.

## 2. Se não houver áudio

O script devolve código 2 com a mensagem de erro. A causa quase sempre é exportação
**Sem mídia**. Pare e peça ao usuário: *WhatsApp → conversa → ⋮ → Exportar conversa →
**Anexar mídia***. O WhatsApp também **trunca** exportações grandes: se vierem menos
áudios do que os marcadores `áudio ocultado` do chat, diga quantos faltaram e de quando.

## 3. Motores (escada, nesta ordem)

O script tenta sozinho, mas conheça a ordem para diagnosticar:

1. **mlx_whisper** — só macOS Apple Silicon, o mais rápido lá.
2. **faster-whisper** — local, multiplataforma, int8 na CPU. Precisa dos pesos em cache.
3. **sherpa-onnx** — o mais portátil: `pip install sherpa-onnx` e o script **baixa o modelo
   Whisper multilíngue de um release do GitHub**, sem depender do Hugging Face.
4. **openai-whisper** — se já estiver instalado.

Ambientes com egress restrito costumam bloquear `huggingface.co`, `openaipublic` e
`alphacephei`, o que derruba faster-whisper e Vosk por falta de peso. Quando isso
acontecer, **use `--engine sherpa`**: os releases do GitHub costumam passar.

Decodificação é por **PyAV** (`pip install av`), que traz o próprio FFmpeg — não dependa
do `ffmpeg` do sistema, e nunca do FFmpeg mínimo que vem com navegadores headless, que
não demuxa Ogg/Opus. Modelos: `tiny` para rascunho, `small` como padrão, `medium` para
reprocessar trechos ruins.

## 4. Depois de transcrever

Leia `transcricao_integral.md` **e** a conversa em volta dos áudios: um áudio quase sempre
responde a uma mensagem anterior e é seguido por um texto que o resume.

Escreva na mesma pasta de saída, fora da skill:

**`analise_da_conversa.md`** — separando explicitamente: fatos declarados · pedidos
explícitos · preocupações · dúvidas · prazos citados · compromissos que a nossa equipe já
assumiu · decisões que dependem do usuário · riscos de responder rápido demais · o que
ficou incerto. Nunca transforme hipótese em fato; marque interpretação como interpretação.

**`resposta_para_cliente.md`** — mensagem pronta para colar no WhatsApp, em primeira
pessoa, português natural, blocos curtos. Responda **cada** pedido central, acolha sem
soar defensivo, organize os próximos passos com dono e data. Não mencione IA nem
transcrição. Não invente entrega, desconto, prazo ou promessa. Não assuma culpa por algo
não comprovado — mas também não fuja do que estiver documentado. Se alguma decisão
comercial depender do usuário, entregue **duas** versões: uma segura para enviar já, e
uma observação separada dizendo o que ele precisa decidir antes de prometer.

## 5. Qualidade

- Cada áudio aparece individualmente, com remetente, data, hora, duração e vínculo.
- Confira a duração total transcrita contra a encontrada; nenhum áudio some em silêncio.
- Não invente palavra para tapar buraco: use `[inaudível — MM:SS]` e
  `[termo incerto: "..." — MM:SS]`.
- Preserve nome próprio, empresa, valor, data, quantidade, prazo, produto, promessa,
  reclamação e decisão. Se um número importante sair duvidoso, recorte só aquele trecho e
  reprocesse com `--model medium`.
- Confira os nomes contra o arquivo da conversa: o modelo erra nome próprio com
  frequência, e troca nome de marca por palavra comum. Corrija pela lista de participantes
  do próprio chat e registre a correção.

## 6. Privacidade

Nada de cliente entra na pasta da skill: nem áudio, nem transcrição, nem nome, nem
conversa. Saída sempre fora — use `_transcricoes/` ou a pasta do caso. A skill guarda só
procedimento e script.
