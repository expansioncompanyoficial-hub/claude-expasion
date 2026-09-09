import re, sys

def find_block(h, start):
    """Devolve (inicio_conteudo, fim_conteudo, fim_bloco) da div que abre em `start`."""
    i = h.index('>', start) + 1
    depth, j = 1, i
    while depth:
        m = re.compile(r'</?div\b', re.I).search(h, j)
        if not m: raise ValueError('div sem fecho')
        if m.group(0).lower() == '<div':
            depth += 1; j = m.end()
        else:
            depth -= 1
            fim_tag = h.index('>', m.end()) + 1
            if depth == 0: return i, m.start(), fim_tag
            j = fim_tag

def children(inner):
    """Divs de primeiro nível dentro de `inner`."""
    out, k = [], 0
    while True:
        m = re.compile(r'<div\b', re.I).search(inner, k)
        if not m: return out
        a, b, e = find_block(inner, m.start())
        out.append(inner[m.start():e]); k = e

def to_table(html, cls, cols, cellstyle='vertical-align:top; padding:0 6px 10px 0; border:none'):
    pat = re.compile(r'<div class="' + cls + r'"[^>]*>', re.I)
    while True:
        m = pat.search(html)
        if not m: return html
        a, b, e = find_block(html, m.start())
        kids = children(html[a:b])
        rows = ''
        for i in range(0, len(kids), cols):
            grp = kids[i:i + cols]
            w = 100 // cols
            rows += '<tr>' + ''.join(
                f'<td width="{w}%" style="{cellstyle}">{c}</td>' for c in grp
            ) + '</tr>'
        html = html[:m.start()] + \
            f'<table width="100%" style="border-collapse:collapse; width:100%; margin:14px 0; border:none"><tbody>{rows}</tbody></table>' + \
            html[e:]

def rows_to_table(html, container, row_cls, w1):
    """Linhas de 2 colunas (rótulo | texto) viram uma tabela só."""
    m = re.search(r'<div class="' + container + r'"[^>]*>', html)
    if not m: return html
    a, b, e = find_block(html, m.start())
    inner, rows = html[a:b], ''
    for kid in children(inner):
        cells = children(re.sub(r'^<div[^>]*>', '', kid)[:-6]) or []
        if len(cells) != 2:
            rows += f'<tr><td colspan="2" style="border:none; padding:6px 0">{kid}</td></tr>'; continue
        bg = re.search(r'class="' + row_cls + r' (\w+)"', kid)
        tint = {'marco': ' background:#fdf0e3;', 'critica': ' background:#fdeceb;'}.get(bg.group(1) if bg else '', '')
        rows += (f'<tr><td width="{w1}" style="vertical-align:top; padding:9px 8px 9px 6px;'
                 f' border:none;{tint}">{cells[0]}</td>'
                 f'<td style="vertical-align:top; padding:9px 6px; border:none;{tint}">{cells[1]}</td></tr>')
    return html[:m.start()] + f'<table width="100%" style="border-collapse:collapse; width:100%; margin:14px 0; border:none"><tbody>{rows}</tbody></table>' + html[e:]

h = open(sys.argv[1], encoding='utf-8').read()
h = to_table(h, 'numeros', 2)
h = to_table(h, 'quem', 2)
h = to_table(h, 'duelo', 2)
h = to_table(h, 'pilares', 1)
h = to_table(h, 'frentes', 1)
h = to_table(h, 'arco', 1)
h = rows_to_table(h, 'crono', 'lin', '86')
h = rows_to_table(h, 'canais', 'canal', '130')
h = rows_to_table(h, 'feito', '', '22')
h = rows_to_table(h, 'troca', '', '78')
open(sys.argv[2], 'w', encoding='utf-8').write(h)
print(sys.argv[2], 'ok —', h.count('<table'), 'tabelas')
