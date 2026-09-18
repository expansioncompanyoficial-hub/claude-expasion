#!/bin/bash
# Restauração de vídeo de CFTV — Expansion
# Limpa compressão, ruído e subexposição de gravações de câmera de segurança.
# NÃO usa IA generativa: não inventa pixel nenhum. O que aparecer, estava lá.
#
# Uso:
#   ./restaura-video-cftv.sh video.mp4
#   ./restaura-video-cftv.sh video.mp4 --zoom 1580,180,520,300
#   ./restaura-video-cftv.sh --grade video.mp4
#   ./restaura-video-cftv.sh --lote /caminho/da/pasta
#
# Opções:
#   --grade    gera um contact sheet numerado para você localizar a área de interesse
#   --zoom X,Y,L,A   recorta em X,Y com Largura x Altura e amplia 3x
#   --lote     processa todos os vídeos de uma pasta
#   --forte    denoise mais agressivo (vídeo muito ruidoso; perde textura fina)

set -euo pipefail

# --- cadeias de filtro -------------------------------------------------------
DEN="deblock=filter=weak:block=4,atadenoise=s=9,hqdn3d=4:3:6:4"
DEN_FORTE="deblock=filter=strong:block=4,atadenoise=s=15,hqdn3d=8:6:12:8"
CUR="curves=all='0/0 0.25/0.44 0.5/0.64 0.75/0.86 1/1'"
SHP="unsharp=5:5:0.7:5:5:0.0"

# --- dependência -------------------------------------------------------------
if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg não encontrado. Instale com:  brew install ffmpeg"
  exit 1
fi

MODO="simples"; ZOOM=""; FORTE=0; ALVO=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --grade) MODO="grade"; shift ;;
    --lote)  MODO="lote"; shift ;;
    --forte) FORTE=1; shift ;;
    --zoom)  ZOOM="$2"; shift 2 ;;
    *)       ALVO="$1"; shift ;;
  esac
done

[[ $FORTE -eq 1 ]] && DEN="$DEN_FORTE"
[[ -z "$ALVO" ]] && { echo "Informe um arquivo ou pasta. Veja o cabeçalho do script."; exit 1; }

# --- contact sheet: localizar a área de interesse ----------------------------
if [[ "$MODO" == "grade" ]]; then
  BASE="${ALVO%.*}"
  L=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$ALVO")
  A=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$ALVO")
  N=$(ffprobe -v error -select_streams v:0 -count_frames -show_entries stream=nb_read_frames -of csv=p=0 "$ALVO" 2>/dev/null || echo 300)
  PULO=$(( N / 12 )); [[ $PULO -lt 1 ]] && PULO=1
  echo ">> resolução ${L}x${A} — gerando grade de 12 quadros"
  ffmpeg -v error -i "$ALVO" \
    -vf "select='not(mod(n\,${PULO}))',drawtext=text='%{n}':x=10:y=10:fontsize=48:fontcolor=yellow:box=1:boxcolor=black@0.6,scale=640:-1,tile=4x3" \
    -frames:v 1 -q:v 2 "${BASE}-GRADE.jpg" -y
  echo ">> ${BASE}-GRADE.jpg"
  echo ">> Meça no visualizador a região que interessa e rode de novo com:"
  echo "   --zoom X,Y,LARGURA,ALTURA   (coordenadas na resolução ${L}x${A})"
  exit 0
fi

# --- processamento de um arquivo --------------------------------------------
processa() {
  local ENTRADA="$1"
  local BASE="${ENTRADA%.*}"
  echo ">> restaurando: $(basename "$ENTRADA")"

  ffmpeg -v error -stats -i "$ENTRADA" \
    -vf "${DEN},${CUR},${SHP}" \
    -c:v libx264 -crf 18 -preset medium -pix_fmt yuv420p -c:a copy \
    "${BASE}-RESTAURADO.mp4" -y

  if [[ -n "$ZOOM" ]]; then
    IFS=',' read -r X Y L A <<< "$ZOOM"
    echo ">> recorte ampliado 3x em ${X},${Y} (${L}x${A})"
    ffmpeg -v error -stats -i "$ENTRADA" \
      -vf "crop=${L}:${A}:${X}:${Y},${DEN},${CUR},scale=$((L*3)):$((A*3)):flags=lanczos,${SHP}" \
      -c:v libx264 -crf 16 -preset medium -pix_fmt yuv420p -an \
      "${BASE}-ZOOM.mp4" -y

    # soma temporal: só funciona se o objeto estiver PARADO na cena
    echo ">> stack temporal (90 quadros somados) — válido só para objeto estático"
    ffmpeg -v error -i "$ENTRADA" \
      -vf "crop=${L}:${A}:${X}:${Y},deblock=filter=weak:block=4,tmix=frames=90,scale=$((L*4)):$((A*4)):flags=lanczos,${CUR},unsharp=5:5:1.2:5:5:0.0" \
      -update 1 -q:v 2 "${BASE}-STACK.jpg" -y
  fi
  echo ">> pronto: ${BASE}-RESTAURADO.mp4"
}

if [[ "$MODO" == "lote" ]]; then
  find "$ALVO" -maxdepth 1 -type f \( -iname '*.mp4' -o -iname '*.avi' -o -iname '*.mov' -o -iname '*.mkv' -o -iname '*.dav' \) \
    ! -iname '*-RESTAURADO.mp4' ! -iname '*-ZOOM.mp4' -print0 |
  while IFS= read -r -d '' f; do processa "$f"; done
else
  processa "$ALVO"
fi
echo ">> concluído."
