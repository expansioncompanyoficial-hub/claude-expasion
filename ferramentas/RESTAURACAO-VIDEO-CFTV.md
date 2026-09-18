# Restauração de vídeo de CFTV

Documento vivo. Como tratar gravação de câmera de segurança com qualidade ruim,
o que dá para recuperar e o que não dá.

## A regra que decide tudo

"Aumentar o pixel mantendo a originalidade" são duas coisas que brigam entre si.

| | Restauração | Upscale generativo (IA) |
|---|---|---|
| O que faz | Limpa ruído, compressão, exposição | Desenha detalhe plausível que não foi gravado |
| Inventa? | Não | Sim — num upscale 4x, ~94% dos pixels são invenção |
| Serve para | Identificar, provar, investigar | Deixar apresentável |

Se o objetivo é **identificar** alguém ou algo, use só restauração. A IA entrega
uma placa nítida — possivelmente a placa errada. Já houve vídeo com realce por IA
declarado inadmissível em tribunal por isso.

## Ordem de operações

Nesta ordem, sempre:

1. Pegar o arquivo **original do DVR/NVR** — não a cópia do WhatsApp
2. Desentrelaçar (câmera analógica antiga)
3. Estabilizar
4. **Reduzir ruído temporal** — antes de qualquer ampliação
5. Corrigir exposição / gamma
6. Só então ampliar
7. Nitidez por último, com moderação

Ampliar antes de tirar ruído amplia o ruído junto.

## Os três limites que não se contornam

Verificar **antes** de prometer resultado:

1. **Bitrate.** Resolução alta com bitrate baixo não é vídeo de qualidade.
   Um 2304x1296 a 784 kbps (típico de WhatsApp) jogou fora a maior parte
   do detalhe. Ampliar não traz de volta.
2. **Tamanho do alvo em pixels.** Mede-se, não se estima:
   - Rosto com menos de ~40 px de largura: não há identificação possível
   - Placa com menos de ~80 px de largura: não há leitura possível
   - Abaixo disso, nenhuma ferramenta resolve — o dado não foi amostrado
3. **Distância da câmera.** Se o alvo está longe demais, o problema é óptico.
   A solução é outra câmera, não outro software.

## A técnica que recupera informação de verdade

**Soma temporal (frame stacking).** Se o alvo está **parado**, somar dezenas de
quadros do mesmo ponto cancela o ruído (aleatório) e acumula o sinal. Ganho real,
sem invenção. No ffmpeg é o filtro `tmix`. Só funciona para objeto estático —
num alvo em movimento, borra.

## Uso

```bash
# localizar a área de interesse
./restaura-video-cftv.sh --grade video.mp4

# restaurar + recortar e ampliar a área
./restaura-video-cftv.sh video.mp4 --zoom 1580,180,520,300

# pasta inteira
./restaura-video-cftv.sh --lote /caminho/dos/videos
```

Requer `ffmpeg` (`brew install ffmpeg`). Não usa IA, não sobe nada para nuvem
nenhuma, roda inteiro na máquina local — sem limite de tamanho de arquivo.

## Transporte de vídeo no Claude Code na web

- **Upload no chat:** limite de 30 MB por arquivo, nas duas direções
- **Google Drive:** o conector move conteúdo como base64 *dentro da conversa*.
  Um vídeo de 80 MB vira ~107 MB de texto — não cabe no contexto, nem para
  baixar nem para subir. **O Drive não serve de transporte para vídeo.**

Conclusão: arquivo grande ou original de DVR, roda o script no Mac.
