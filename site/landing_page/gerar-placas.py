#!/usr/bin/env python3
# Ordem Incandescente — cinco placas 1200x1200
# Preto #050505, laranja #FF6B1A. Duas cores, nada mais.
import math, os, pathlib

S = 1200          # lado da placa
M = 132           # margem intocavel
C = S / 2
GX0, GX1 = 424, S - 116      # campo do tracado
MX = (GX0 + GX1) / 2         # eixo do campo
GW = GX1 - GX0
BLACK = '#050505'
ORANGE = '#FF6B1A'
ASH = '#4A4A4A'   # o cinza do que ja queimou
ASH2 = '#262626'
FONT = '/root/.claude/skills/synced/canvas-design/canvas-fonts/JetBrainsMono-Regular.ttf'

def frame(serial):
    """Moldura de referencia: tiques de medicao. Vive nas bordas, pode ser cortada."""
    p = []
    n = 48
    for i in range(n + 1):
        t = i / n
        x = M + t * (S - 2 * M)
        long = (i % 6 == 0)
        h = 14 if long else 7
        col = ASH if long else ASH2
        p.append(f'<line x1="{x:.2f}" y1="{M}" x2="{x:.2f}" y2="{M-h}" stroke="{col}" stroke-width="1.1"/>')
        p.append(f'<line x1="{x:.2f}" y1="{S-M}" x2="{x:.2f}" y2="{S-M+h}" stroke="{col}" stroke-width="1.1"/>')
        y = M + t * (S - 2 * M)
        p.append(f'<line x1="{M}" y1="{y:.2f}" x2="{M-h}" y2="{y:.2f}" stroke="{col}" stroke-width="1.1"/>')
        p.append(f'<line x1="{S-M}" y1="{y:.2f}" x2="{S-M+h}" y2="{y:.2f}" stroke="{col}" stroke-width="1.1"/>')
    # cantos: quatro angulos finos, nunca um retangulo fechado
    a = 34
    for (cx, cy, dx, dy) in ((M,M,1,1), (S-M,M,-1,1), (M,S-M,1,-1), (S-M,S-M,-1,-1)):
        p.append(f'<path d="M {cx+dx*a} {cy} L {cx} {cy} L {cx} {cy+dy*a}" fill="none" stroke="{ASH}" stroke-width="1.4"/>')
    return '\n'.join(p)

def caption(label, serial, note):
    """Legenda de laboratorio. Fica na faixa central — sobrevive ao corte do mobile."""
    return f'''
<line x1="{M}" y1="{C-96}" x2="{M}" y2="{C+96}" stroke="{ORANGE}" stroke-width="1.4"/>
<text x="{M+26}" y="{C-52}" font-family="JB" font-size="20" letter-spacing="7.5" fill="{ORANGE}">{label}</text>
<text x="{M+26}" y="{C-16}" font-family="JB" font-size="13" letter-spacing="3.4" fill="#5A5A5A">{note}</text>
<text x="{M+26}" y="{C+22}" font-family="JB" font-size="13" letter-spacing="4.6" fill="#3A3A3A">{serial}</text>
'''

# ---------------------------------------------------------------- 01 ESTRATEGIA
def placa_01():
    """Convergencia. Cento e sessenta vetores dispersos que uma unica origem ordena."""
    p, N = [], 160
    ox, oy = MX - 6, C + 156          # origem deslocada: centro de gravidade != centro geometrico
    r0, r1 = 86, 348
    for i in range(N):
        a = math.radians(-90) + (i / (N - 1) - .5) * math.radians(154)
        w = 1.5 if i % 8 == 0 else 0.85
        col = ASH if i % 8 == 0 else ASH2
        p.append(f'<line x1="{ox+math.cos(a)*r0:.2f}" y1="{oy+math.sin(a)*r0:.2f}" '
                 f'x2="{ox+math.cos(a)*r1:.2f}" y2="{oy+math.sin(a)*r1:.2f}" stroke="{col}" stroke-width="{w}"/>')
    # tres arcos: a estrutura que so aparece a distancia
    for k, rr in enumerate((142, 218, 294)):
        sw = (.9, 1.3, 1.9)[k]
        a0, a1 = math.radians(-167), math.radians(-13)
        x0, y0 = ox + math.cos(a0) * rr, oy + math.sin(a0) * rr
        x1, y1 = ox + math.cos(a1) * rr, oy + math.sin(a1) * rr
        p.append(f'<path d="M {x0:.2f} {y0:.2f} A {rr} {rr} 0 0 1 {x1:.2f} {y1:.2f}" '
                 f'fill="none" stroke="{ORANGE}" stroke-width="{sw}" opacity="{0.30+k*0.35:.2f}"/>')
    # a quebra: um unico vetor acende e atravessa
    a = math.radians(-90) + 0.196
    p.append(f'<line x1="{ox+math.cos(a)*r0:.2f}" y1="{oy+math.sin(a)*r0:.2f}" '
             f'x2="{ox+math.cos(a)*(r1+34):.2f}" y2="{oy+math.sin(a)*(r1+34):.2f}" stroke="{ORANGE}" stroke-width="2.1"/>')
    p.append(f'<circle cx="{ox}" cy="{oy}" r="5" fill="{ORANGE}"/>')
    p.append(f'<circle cx="{ox}" cy="{oy}" r="17" fill="none" stroke="{ORANGE}" stroke-width="1.1" opacity=".45"/>')
    return '\n'.join(p), 'ESTRATEGIA', 'PL—01 / CONVERGENCIA', '01 — 05'

# ------------------------------------------------------------------ 02 CONTEUDO
def placa_02():
    """Cadencia. Nenhum traco significa nada. Juntos, significam ritmo."""
    p, cols, rows = [], 23, 21
    gw, gh = GW, 452
    x0, y0 = GX0, C - gh / 2
    for cx in range(cols):
        for cy in range(rows):
            x = x0 + cx * (gw / (cols - 1))
            phase = math.sin(cx * .46) * math.cos(cy * .38 + cx * .13)
            h = 7 + abs(phase) * 19
            y = y0 + cy * (gh / (rows - 1))
            op = .34 + abs(phase) * .56
            p.append(f'<line x1="{x:.2f}" y1="{y-h/2:.2f}" x2="{x:.2f}" y2="{y+h/2:.2f}" '
                     f'stroke="{ASH}" stroke-width="1.8" opacity="{op:.2f}"/>')
    # a quebra: uma coluna inteira entra em brasa
    kc = 15
    x = x0 + kc * (gw / (cols - 1))
    for cy in range(rows):
        phase = math.sin(kc * .46) * math.cos(cy * .38 + kc * .13)
        h = 8 + abs(phase) * 26
        y = y0 + cy * (gh / (rows - 1))
        p.append(f'<line x1="{x:.2f}" y1="{y-h/2:.2f}" x2="{x:.2f}" y2="{y+h/2:.2f}" '
                 f'stroke="{ORANGE}" stroke-width="2.3" opacity="{.45+abs(phase)*.55:.2f}"/>')
    p.append(f'<line x1="{x:.2f}" y1="{y0-46:.2f}" x2="{x:.2f}" y2="{y0+gh+46:.2f}" stroke="{ORANGE}" stroke-width="1" opacity=".38"/>')
    return '\n'.join(p), 'CONTEUDO', 'PL—02 / CADENCIA', '02 — 05'

# ------------------------------------------------------------------- 03 TRAFEGO
def placa_03():
    """Fluxo. Um campo de direcoes que um unico no reorganiza."""
    p = []
    nx, ny, seg = 24, 22, 17
    gw, gh = GW, 462
    x0, y0 = GX0, C - gh / 2
    ax, ay = GX1 - 104, C - 18      # o no
    for ix in range(nx):
        for iy in range(ny):
            x = x0 + ix * (gw / (nx - 1))
            y = y0 + iy * (gh / (ny - 1))
            d = math.hypot(ax - x, ay - y)
            a = math.atan2(ay - y, ax - x)
            pull = min(1.0, 168 / max(d, 1))
            a = a * pull + (-0.30) * (1 - pull)   # longe: corrente base; perto: atracao
            L = seg * (.55 + .45 * pull)
            op = .30 + pull * .55
            p.append(f'<line x1="{x-math.cos(a)*L/2:.2f}" y1="{y-math.sin(a)*L/2:.2f}" '
                     f'x2="{x+math.cos(a)*L/2:.2f}" y2="{y+math.sin(a)*L/2:.2f}" '
                     f'stroke="{ASH}" stroke-width="1.9" opacity="{op:.2f}" stroke-linecap="round"/>')
    # tres orbitas e o no aceso
    for k, rr in enumerate((38, 70, 108)):
        p.append(f'<circle cx="{ax}" cy="{ay}" r="{rr}" fill="none" stroke="{ORANGE}" '
                 f'stroke-width="{1.6-k*0.35:.2f}" opacity="{.62-k*.17:.2f}"/>')
    p.append(f'<circle cx="{ax}" cy="{ay}" r="7" fill="{ORANGE}"/>')
    # a quebra: uma trajetoria unica chega antes das outras
    p.append(f'<path d="M {GX0+10} {C+176} Q {MX-58} {C+118} {ax-40:.2f} {ay+20:.2f}" '
             f'fill="none" stroke="{ORANGE}" stroke-width="2" opacity=".9"/>')
    return '\n'.join(p), 'TRAFEGO PAGO', 'PL—03 / FLUXO', '03 — 05'

# ----------------------------------------------------------------------- 04 CRM
def placa_04():
    """Esteira. Cinco estagios, e o que sobrevive a cada um deles."""
    p = []
    stages = (17, 13, 9, 6, 3)
    bw, bh, gap, vgap = 92, 14, 34, 9
    total = len(stages) * bw + (len(stages) - 1) * gap
    x0 = MX - total / 2
    for si, n in enumerate(stages):
        x = x0 + si * (bw + gap)
        colh = n * bh + (n - 1) * vgap
        y0 = C - 12 - colh / 2
        p.append(f'<line x1="{x+bw/2:.2f}" y1="{C-34-170:.2f}" x2="{x+bw/2:.2f}" y2="{C-34+170:.2f}" '
                 f'stroke="{ASH2}" stroke-width="1"/>')
        for i in range(n):
            y = y0 + i * (bh + vgap)
            op = .34 + (1 - i / max(n - 1, 1)) * .46
            p.append(f'<rect x="{x:.2f}" y="{y:.2f}" width="{bw}" height="{bh}" fill="{ASH}" opacity="{op:.2f}"/>')
        p.append(f'<line x1="{x:.2f}" y1="{C-34+188:.2f}" x2="{x+bw:.2f}" y2="{C-34+188:.2f}" stroke="{ASH}" stroke-width="1.3"/>')
        p.append(f'<text x="{x+bw/2:.2f}" y="{C-34+214:.2f}" text-anchor="middle" font-family="JB" '
                 f'font-size="13" letter-spacing="2" fill="#3A3A3A">{n:02d}</text>')
    # a quebra: um registro desce um degrau por estagio e chega aceso no fim
    pts = []
    for si, n in enumerate(stages):
        x = x0 + si * (bw + gap)
        colh = n * bh + (n - 1) * vgap
        idx = min(si, n - 1)
        y = C - 12 - colh / 2 + idx * (bh + vgap)
        pts.append((x, y))
        acesa = (si == len(stages) - 1)
        p.append(f'<rect x="{x:.2f}" y="{y:.2f}" width="{bw}" height="{bh}" fill="{ORANGE}" '
                 f'opacity="{1.0 if acesa else .34 + si * .15:.2f}"/>')
    for si in range(len(pts) - 1):
        (xa, ya), (xb, yb) = pts[si], pts[si + 1]
        p.append(f'<path d="M {xa+bw+6:.2f} {ya+bh/2:.2f} L {xb-6:.2f} {yb+bh/2:.2f}" '
                 f'fill="none" stroke="{ORANGE}" stroke-width="1.3" opacity="{.34+si*.16:.2f}"/>')
    xl, yl = pts[-1]
    p.append(f'<circle cx="{xl+bw+30:.2f}" cy="{yl+bh/2:.2f}" r="5.5" fill="{ORANGE}"/>')
    p.append(f'<circle cx="{xl+bw+30:.2f}" cy="{yl+bh/2:.2f}" r="18" fill="none" stroke="{ORANGE}" stroke-width="1.1" opacity=".45"/>')
    return '\n'.join(p), 'CRM', 'PL—04 / ESTEIRA', '04 — 05'

# --------------------------------------------------------------------- 05 DADOS
def placa_05():
    """Acumulo. Cada ponto e um dia. A curva so existe depois de muitos deles."""
    p = []
    gw, gh = GW, 424
    x0, y0 = GX0, C - gh / 2
    for i in range(9):   # pauta
        y = y0 + i * (gh / 8)
        p.append(f'<line x1="{x0}" y1="{y:.2f}" x2="{x0+gw}" y2="{y:.2f}" stroke="{ASH2}" stroke-width="1"/>')
    for i in range(13):
        x = x0 + i * (gw / 12)
        p.append(f'<line x1="{x:.2f}" y1="{y0}" x2="{x:.2f}" y2="{y0+gh}" stroke="{ASH2}" stroke-width="1"/>')
    def curva(t):        # crescimento composto, nao linear
        return 1 - math.pow(1 - t, 2.35)
    N = 300
    for i in range(N):   # a nuvem: o dado bruto, disperso
        t = i / (N - 1)
        base = curva(t)
        j = math.sin(i * 12.9898) * 43758.5453
        j = j - math.floor(j)
        k = math.sin(i * 78.233) * 12345.6789
        k = k - math.floor(k)
        spread = .19 * (1 - t * .45)
        v = min(max(base + (j - .5) * spread, 0), 1)
        x = x0 + (t * .96 + k * .012) * gw
        y = y0 + gh - v * gh
        p.append(f'<circle cx="{x:.2f}" cy="{y:.2f}" r="3.1" fill="{ASH}" opacity="{.34+ (1-abs(j-.5)*2)*.46:.2f}"/>')
    d = []               # a tendencia: o que a insistencia revela
    for i in range(121):
        t = i / 120
        d.append(f'{x0+t*.96*gw:.2f} {y0+gh-curva(t)*gh:.2f}')
    p.append(f'<path d="M {" L ".join(d)}" fill="none" stroke="{ORANGE}" stroke-width="2.1"/>')
    tx, ty = x0 + .96 * gw, y0 + gh - curva(1) * gh
    p.append(f'<circle cx="{tx:.2f}" cy="{ty:.2f}" r="6.5" fill="{ORANGE}"/>')
    p.append(f'<circle cx="{tx:.2f}" cy="{ty:.2f}" r="20" fill="none" stroke="{ORANGE}" stroke-width="1.1" opacity=".45"/>')
    p.append(f'<line x1="{x0}" y1="{y0+gh:.2f}" x2="{x0+gw}" y2="{y0+gh:.2f}" stroke="{ASH}" stroke-width="1.4"/>')
    return '\n'.join(p), 'DADOS', 'PL—05 / ACUMULO', '05 — 05'

PLACAS = [placa_01, placa_02, placa_03, placa_04, placa_05]
out = pathlib.Path('/tmp/claude-0/-home-user-claude-expasion/f284ca98-2ac0-5920-9edd-f5788f60e071/scratchpad/placas')
out.mkdir(exist_ok=True)

for i, fn in enumerate(PLACAS, 1):
    body, label, note, serial = fn()
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{S}" height="{S}" viewBox="0 0 {S} {S}">
<rect width="{S}" height="{S}" fill="{BLACK}"/>
{frame(serial)}
{body}
{caption(label, serial, note)}
</svg>'''
    html = f'''<!DOCTYPE html><html><head><meta charset="utf-8"><style>
@font-face {{ font-family:"JB"; src:url("file://{FONT}") format("truetype"); }}
html,body {{ margin:0; padding:0; background:{BLACK}; }}
svg {{ display:block; }}
</style></head><body>{svg}</body></html>'''
    (out / f'CARD_{i}.html').write_text(html, encoding='utf-8')
    print(f'CARD_{i}  {label:<14} {note}')
