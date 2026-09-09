import re, sys

def inline_only(cell):
    """Docs perde formatacao em bloco dentro de <td>. Deixa so tags inline."""
    c = cell
    c = re.sub(r'<h3[^>]*>(.*?)</h3>', r'<b>\1</b><br>', c, flags=re.S|re.I)
    c = re.sub(r'<li[^>]*>(.*?)</li>', r'• \1<br>', c, flags=re.S|re.I)
    c = re.sub(r'</?(ul|ol)[^>]*>', '', c, flags=re.I)
    c = re.sub(r'</(p|div)>\s*(?=<(p|div)\b)', '<br>', c, flags=re.I)   # separa blocos irmaos
    c = re.sub(r'</?(div|p|section|header|footer)[^>]*>', '', c, flags=re.I)
    c = re.sub(r'(<br>\s*)+$', '', c)
    return c

def flatten_cells(h):
    out, pos = [], 0
    for m in re.finditer(r'(<t[dh]\b[^>]*>)(.*?)(</t[dh]>)', h, flags=re.S|re.I):
        out.append(h[pos:m.start()]); out.append(m.group(1) + inline_only(m.group(2)) + m.group(3))
        pos = m.end()
    out.append(h[pos:])
    return ''.join(out)

def emoji_entities(h):
    return ''.join(f'&#{ord(ch)};' if ord(ch) > 0xFFFF else ch for ch in h)

h = open(sys.argv[1], encoding='utf-8').read()
h = emoji_entities(flatten_cells(h))
open(sys.argv[2], 'w', encoding='utf-8').write(h)
print(sys.argv[2], len(h)//1024, 'KB — blocos em celula:', len(re.findall(r'<td[^>]*>[^<]*<(div|p|h3|ul)', h)))
