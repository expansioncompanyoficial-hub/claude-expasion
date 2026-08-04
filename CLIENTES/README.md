# CLIENTES

Um contexto por cliente da Expansion. **Documento vivo.**

A ideia: cada cliente ganha um grupo de WhatsApp, uma pasta no Drive e uma sessão do
Claude. Esta pasta é onde tudo isso vira memória — para que qualquer sessão nova
comece sabendo quem é o cliente, o que ele quer, o que já foi prometido e o que está
travado.

## Clientes

| Cliente | Nicho | Entrada | Documentos |
|---|---|---|---|
| **Jane Queiroz · JQL Seguros** | Seguros · plano de saúde empresarial | 24/07/2026 | [dossiê](JANE-JQL-SEGUROS/DOSSIE-JANE-JQL-SEGUROS.md) · [estratégia](JANE-JQL-SEGUROS/ESTRATEGIA-PERFIL-JANE.md) · [banco de conteúdo](JANE-JQL-SEGUROS/BANCO-DE-CONTEUDO-JANE.md) |

## Estrutura de cada cliente

```
NOME-CLIENTE/
├── DOSSIE-NOME-CLIENTE.md          documento vivo — o contexto consolidado
├── BANCO-DE-CONTEUDO-NOME.md       documento vivo — pauta bruta para roteiro
├── ESTRATEGIA-PERFIL-NOME.md       documento vivo — identidade, grade, KPI, produção
├── ANEXOS-ONBOARDING-AAAA-MM-DD.md evidência crua: call + doc de onboarding
└── ANEXOS-WHATSAPP-AAAA-MM-DD.md   evidência crua: transcrição dos grupos
```

**Dossiê, estratégia e banco de conteúdo são vivos** — atualiza no lugar, sem data no nome.
**Anexos são congelados** — levam a data e não se editam. Export novo de WhatsApp
vira arquivo novo, nunca sobrescreve o anterior. O histórico é o valor.

## Como montar um cliente novo

1. **Puxar as fontes** — call de onboarding (Fathom), pasta do Drive, export dos
   grupos de WhatsApp (privado *e* grupo).
2. **Ler tudo na íntegra.** Resumo automático de reunião perde o que importa: a call
   da Jane tinha, fora do resumo, o gatilho de cancelamento literal, os seis cases de
   concierge e a evidência de que o tráfego dela estava trazendo o público errado.
3. **Escrever o dossiê** na estrutura acima.
4. **Separar o banco de conteúdo** do dossiê — quem usa é a social media, toda semana.
5. **Registrar as pendências com dono e data.** É a seção que envelhece e é a que
   mais vale.

## Transcrever os áudios do WhatsApp

**Exportar sempre "com mídia".** O export sem mídia descarta os áudios, e é neles que
mora a instrução operacional: no caso da Jane, o pedido de Collab, o elogio mais forte
do ciclo e uma pauta nova só existiam em áudio.

Nesta sessão, `huggingface.co` e `openaipublic.azureedge.net` estão bloqueados pela
política de egress, então o caminho normal do Whisper não roda. **PyPI e GitHub
releases passam** — dá para montar assim:

```bash
pip3 install sherpa-onnx faster-whisper
curl -L -o m.tar.bz2 https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-whisper-medium.tar.bz2
tar xjf m.tar.bz2
```

```python
from faster_whisper.audio import decode_audio   # PyAV traz o ffmpeg no wheel
import sherpa_onnx
rec = sherpa_onnx.OfflineRecognizer.from_whisper(
    encoder="sherpa-onnx-whisper-medium/medium-encoder.int8.onnx",
    decoder="sherpa-onnx-whisper-medium/medium-decoder.int8.onnx",
    tokens="sherpa-onnx-whisper-medium/medium-tokens.txt",
    language="pt", task="transcribe")
s = rec.create_stream(); s.accept_waveform(16000, decode_audio(f, sampling_rate=16000))
rec.decode_stream(s); print(s.result.text)
```

Whisper só enxerga janelas de 30 s — áudio maior tem que ser fatiado (28 s com 2 s de
sobreposição funciona). `medium` acerta bem mais nome próprio que `small`; ainda assim,
**normalizar nomes de empresa e pessoa à mão** e marcar `[inaudível]` onde não der.

O modelo tem ~1,8 GB. **Baixar sempre para fora do repositório.**

## Regras não negociáveis

🔐 **Credencial nunca entra no repositório.** Senha, token, chave de API ou login que
apareça em transcrição vira `[SENHA REMOVIDA]`, e o fato de ter vazado vira pendência
no dossiê. Acesso a rede social se pede por **convite no Meta Business Suite**, não
por login e senha.

🔒 **Cliente do cliente é dado de terceiro.** Nome, valor de sinistro e informação de
saúde só entram em conteúdo público com autorização escrita. Cada dossiê tem uma
seção "conteúdo sensível — não publicar"; ela existe para ser lida antes de roteirizar.

📌 **Fala da cliente vai entre aspas, com data.** O que ela disse não se parafraseia —
é o critério de aceite. Paráfrase é onde a essência se perde, e essência é exatamente
o que essas clientes estão comprando.
