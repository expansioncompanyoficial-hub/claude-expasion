#!/bin/bash
set -e
SRC="$1"; OUT="$2"
TMP="$(mktemp -d)"
{
  echo '<!doctype html><html lang="pt-BR" data-theme="light"><head><meta charset="utf-8">'
  echo '<style>
    @page { size: A4; margin: 13mm 11mm; }
    html, body { background: #fffdfa !important; }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    body { padding: 0 !important; font-size: 11.2pt !important; }
    .wrap { max-width: 100% !important; }
    header.hero { break-inside: avoid; margin-top: 0 !important; }
    h2 { break-after: avoid; margin-top: 26px !important; }
    section { break-inside: auto; }
    .num, .frente, .conta, .frase, .alerta, .pilar, .mes, .quem .col,
    .duelo .col, .lin, .feito div, .troca .item, .canal, table { break-inside: avoid; }
    thead { display: table-header-group; }
    footer { break-inside: avoid; }
    a { color: inherit; }
  </style></head><body>'
  cat "$SRC"
  echo '</body></html>'
} > "$TMP/print.html"
/opt/pw-browsers/chromium-1194/chrome-linux/chrome \
  --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --virtual-time-budget=12000 \
  --print-to-pdf-no-header --no-pdf-header-footer \
  --print-to-pdf="$OUT" "file://$TMP/print.html" 2>&1 | grep -vi 'warn\|devtools\|font\|dbus\|GPU\|Fontconfig' || true
rm -rf "$TMP"
ls -lh "$OUT"
