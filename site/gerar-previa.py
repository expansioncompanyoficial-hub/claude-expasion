#!/usr/bin/env python3
"""Gera a previa publicavel a partir de site/index.html.
Artifact injeta doctype/head/body e bloqueia host externo, entao:
tira o involucro, tira o GTM, e embute os assets locais em base64."""
import base64, pathlib, re
root = pathlib.Path('/home/user/claude-expasion/site')
s = (root / 'index.html').read_text(encoding='utf-8')
s = re.sub(r'^<!DOCTYPE html>\s*<html[^>]*>\s*<head>\s*', '', s, flags=re.S)
s = re.sub(r'</head>\s*<body>\s*', '\n', s, count=1, flags=re.S)
s = re.sub(r'\s*</body>\s*</html>\s*$', '\n', s, flags=re.S)
s = re.sub(r'<!-- Google Tag Manager -->.*?<!-- End Google Tag Manager -->\s*', '', s, flags=re.S)
s = re.sub(r'<!-- Google Tag Manager \(noscript\) -->.*?<!-- End Google Tag Manager \(noscript\) -->\s*', '', s, flags=re.S)

def ph(txt, w, h):
    return ('data:image/svg+xml;utf8,'
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}">'
        f'<rect width="{w}" height="{h}" fill="%230D0D0D"/>'
        f'<rect x="12" y="12" width="{w-24}" height="{h-24}" fill="none" stroke="%232A2A2A" stroke-dasharray="11 9"/>'
        f'<text x="{w//2}" y="{h//2-6}" text-anchor="middle" fill="%23FF6B1A" font-family="monospace" font-size="24" letter-spacing="6">{txt}</text>'
        f'<text x="{w//2}" y="{h//2+30}" text-anchor="middle" fill="%235A5A5A" font-family="monospace" font-size="16" letter-spacing="3">{w} x {h}</text></svg>')

for m in sorted(set(re.findall(r'landing_page/([\w.-]+\.jpg)', s))):
    f = root / 'landing_page' / m
    if f.exists():
        b = base64.b64encode(f.read_bytes()).decode()
        s = s.replace(f'landing_page/{m}', f'data:image/jpeg;base64,{b}')
        print(f'  embutida  {m}')
    else:
        s = s.replace(f'landing_page/{m}', ph('AGUARDANDO ARQUIVO', 920, 500))
        print(f'  pendente  {m}')
assert 'landing_page/' not in s
out = pathlib.Path('/tmp/claude-0/-home-user-claude-expasion/f284ca98-2ac0-5920-9edd-f5788f60e071/scratchpad/lp-expansion.html')
out.write_text(s, encoding='utf-8')
print(f'{len(s)/1024/1024:.2f} MB')
