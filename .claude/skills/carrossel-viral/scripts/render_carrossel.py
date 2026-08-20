#!/usr/bin/env python3
"""
Renderiza um carrossel 1080x1350 a partir de um spec JSON.

    python3 render_carrossel.py spec.json saida.html

A régua tipográfica vem da medição dos carrosséis reais da Expansion no Canva
— ver BRANDSDECODED/MAQUINA/MEDIDAS-CANVA-2026-08-11.md. Não é estimativa:
cada número saiu da geometria e da formatação que o Canva guarda, em canvas
1080x1350, portanto escala 1:1 com o CSS aqui.

Duas melhorias deliberadas sobre o original: auto-fit da headline (no Canva o
texto longo é reajustado à mão) e contraste corrigido no CTA.

Famílias de fundo
  foto     imagem sangrada a 65% sobre preto + scrim — 3 dos 4 designs reais
  escuro   chapado
  destaque cor de marca
  claro    fundo claro
  capa     primeiro slide

Tipos de slide
  capa · texto · bullets · stat · declaracao · cta
"""
import base64
import json
import sys
from pathlib import Path

W, H = 1080, 1350
MARGEM, UTIL = 108, 864
BASE = H - MARGEM            # 1242 — onde o conteúdo termina
FOTO_H, FOTO_R = 442.2, 13
FOLGA = 24                   # respiro mínimo entre um bloco e o próximo

# Os quatro arquétipos de slide interno, com os `top` lidos elemento a elemento
# no Canva. O original é posicionado à mão, não fluído — reproduzir com flexbox
# centralizado aproxima e nunca bate. Aqui cada bloco vai no seu y medido.
#
#   topo  foto abre o slide          páginas 2 e 5
#   meio  foto separa título e corpo páginas 3 e 7
#   base  foto fecha embaixo         páginas 4 e 8
#   None  sem foto                   páginas 6 e 9
GRADE = {
    "topo": {"foto": 207.9, "h1": 717.0, "corpo": 1005.8},
    "meio": {"h1": 161.0, "foto": 453.9, "corpo": 951.1},
    "base": {"h1": 230.5, "corpo": 534.9, "foto": 799.8},
    None: {"h1": 298.9, "corpo": 641.9},
}


# Os cinco templates da casa. Só o EXPANSION 01 foi medido no Canva elemento a
# elemento; os outros quatro são modelados a partir da régua dele mais as
# capas da plataforma da BrandsDecoded. O que muda entre eles é a **capa** —
# alinhamento, família e tamanho do título. O miolo é o mesmo em todos, porque
# é o único que tem medida real por trás.
TEMPLATES = {
    "expansion-01": {
        "nome": "EXPANSION 01 (MEIO FUNIL)", "familia": "grade",
        "sobre": "9 slides · caixa de imagem · o padrão da casa",
    },
    "expansion-02": {
        "nome": "EXPANSION 02", "familia": "sangrada", "align": "left",
        "fonte": "var(--head)", "peso": 700, "tam": 88.3, "lh": .92, "tr": "-.087em",
        "sobre": "foto sangrada · título à esquerda",
    },
    "expansion-03": {
        "nome": "EXPANSION 03", "familia": "sangrada", "align": "center",
        "fonte": "var(--serif)", "peso": 600, "tam": 84, "lh": 1.02, "tr": "-.02em",
        "sobre": "foto sangrada · serifa centralizada",
    },
    "expansion-04": {
        "nome": "EXPANSION 04", "familia": "sangrada", "align": "center",
        "fonte": "var(--head)", "peso": 700, "tam": 100, "lh": .92, "tr": "-.087em",
        "sobre": "foto sangrada · título centralizado",
    },
    "expansion-twitter": {
        "nome": "EXPANSION TWITTER", "familia": "cartao",
        "sobre": "cartão de post · fundo claro",
    },
}


def limites(pos):
    """Altura máxima de cada bloco: até onde o próximo começa."""
    g = GRADE[pos]
    ordem = sorted(g.items(), key=lambda kv: kv[1])
    out = {}
    for i, (nome, y) in enumerate(ordem):
        if nome == "foto":
            out[nome] = FOTO_H
            continue
        fim = ordem[i + 1][1] - FOLGA if i + 1 < len(ordem) else BASE
        out[nome] = round(fim - y, 1)
    return out


def b64_font(path):
    return base64.b64encode(Path(path).read_bytes()).decode()


# Os arquivos do @fontsource são subconjuntos por faixa de caractere. O
# `latin-ext` traz SÓ os acentuados — sem o `latin` do lado não existe glifo
# para A-Z. Duas declarações com a mesma família e o mesmo peso só convivem se
# cada uma disser a faixa que cobre; sem isso a última apaga a primeira.
FAIXAS = {
    "latin": ("U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,"
              "U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,"
              "U+2193,U+2212,U+2215,U+FEFF,U+FFFD"),
    "latin-ext": ("U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,"
                  "U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,"
                  "U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF"),
}


def faixa_do_arquivo(path):
    nome = Path(path).name
    if "-latin-ext-" in nome:
        return FAIXAS["latin-ext"]
    if "-latin-" in nome:
        return FAIXAS["latin"]
    return None


def face(family, weight, path):
    faixa = faixa_do_arquivo(path)
    rng = f"unicode-range:{faixa};" if faixa else ""
    return (
        "@font-face{font-family:'%s';font-style:normal;font-weight:%s;"
        "font-display:block;%ssrc:url(data:font/woff2;base64,%s) format('woff2');}"
        % (family, weight, rng, b64_font(path))
    )


def confere_fontes(fontes):
    """Falha alto quando um par família+peso só tem o `latin-ext`.

    Este erro é silencioso por natureza: `document.fonts.ready` resolve, o
    preview parece certo, e o PNG sai numa fonte de sistema qualquer. Melhor
    quebrar aqui do que descobrir na peça entregue."""
    ext, lat = set(), set()
    for f in fontes:
        nome = Path(f["file"]).name
        chave = (f["family"], f["weight"])
        (ext if "-latin-ext-" in nome else lat).add(chave)
    faltando = sorted(ext - lat)
    if faltando:
        itens = " · ".join(f"{fam} {w}" for fam, w in faltando)
        raise SystemExit(
            f"Faltando o arquivo `latin` de: {itens}.\n"
            "O `latin-ext` sozinho não tem A-Z — o texto sairia numa fonte de "
            "sistema sem avisar. Acrescente o .woff2 `latin` de cada um."
        )


def b64_img(path):
    p = Path(path)
    ext = p.suffix.lstrip(".").lower().replace("jpg", "jpeg")
    return f"data:image/{ext};base64," + base64.b64encode(p.read_bytes()).decode()


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def rich(s):
    """*destaque* e **forte**.

    Os dois existem porque o Canva usa os dois, e são coisas diferentes:
    *destaque* troca a cor (para a cor de marca) e **forte** mantém a cor e
    sobe o peso. Marcação por conteúdo, não por índice de palavra — que é como
    a plataforma da BrandsDecoded grava, e por isso o realce dela anda de lugar
    quando o texto muda."""
    out = esc(s)
    while "**" in out:
        out = out.replace("**", "<b>", 1).replace("**", "</b>", 1)
    while "*" in out:
        out = out.replace("*", "<em>", 1).replace("*", "</em>", 1)
    return out


def barra(spec):
    """Barra superior de metadados: @handle · nome · copyright.
    Medida: y 49,7 · x 56,1 · 15,78px bold · tracking 0. Cada campo some se
    não vier no spec."""
    campos = [spec.get("handle", ""), spec.get("marca", ""), spec.get("copyright", "")]
    return '<div class="barra">' + "".join(
        f"<span>{esc(c)}</span>" for c in campos if c
    ) + "</div>"


def fundo_foto(s):
    """Foto sangrada + scrim. É o enquadramento dominante nos designs reais:
    a imagem cobre o slide a 65% sobre preto e um degradê de baixo pra cima
    garante a leitura do texto, que fica ancorado na base."""
    if not s.get("foto_fundo"):
        return ""
    op = s.get("foto_opacidade", 0.65)
    return (f'<div class="bg-foto" style="background-image:url({b64_img(s["foto_fundo"])});'
            f'opacity:{op}"></div><div class="bg-scrim"></div>')


def slide_html(spec, s, i, total):
    tpl = TEMPLATES.get(spec.get("template", "expansion-01"), TEMPLATES["expansion-01"])
    if tpl["familia"] == "sangrada":
        return slide_sangrado(spec, s, i, tpl)
    if tpl["familia"] == "cartao":
        return slide_cartao(spec, s, i)
    tipo = s.get("tipo", "texto")
    fundo = s.get("fundo") or ("capa" if tipo == "capa" else "escuro")
    if s.get("foto_fundo") and tipo != "capa":
        fundo = "foto"
    verificado = spec.get("verificado", True)

    if tipo == "capa":
        # Geometria da página 1, elemento a elemento: o chip em y 748,3 e a
        # headline em y 800,5 ocupando 439,2 — ou seja, encostada na margem de
        # baixo. É o que dá o impacto: o texto não flutua no meio do slide, ele
        # se apoia na base e deixa a imagem respirar em cima.
        img = s.get("foto_fundo") or s.get("imagem")
        if img:
            bg = (f'<div class="bg-foto capa-foto" style="background-image:url({b64_img(img)});'
                  f'background-position:{s.get("foco", "50% 50%")}"></div>')
        else:
            bg = '<div class="capa-banho"></div>'
        selo = '<span class="selo">✓</span>' if verificado else ""
        inicial = esc(spec.get("marca", "?")[:1].upper())
        estilo = s.get("estilo") or spec.get("capa_estilo", "impacto")

        # A legenda é opcional e, por padrão, não existe: a página 1 não tem.
        # Uma linha a mais embaixo divide a atenção e tira força da headline.
        sub_html = (f'<div class="capa-sub">{rich(s["sub"])}</div>'
                    if s.get("sub") else "")

        dose = s.get("scrim") or spec.get("capa_scrim", "medio")
        corpo = f"""{bg}<div class="capa-grad grad-{dose}"></div>""" + f"""
        <div class="chip">
          <span class="chip-dot">{inicial}</span>
          <span class="chip-col">
            <span class="chip-nome">{esc(spec.get('marca',''))}{selo}</span>
            <span class="chip-handle">{esc(spec.get('handle',''))}</span>
          </span>
        </div>
        <div class="capa-h1 capa-{estilo} fit">{rich(s['headline'])}</div>
        {sub_html}"""
        return f'<div class="slide f-capa">{corpo}{barra(spec)}</div>'

    # `foto_pos` decide o arquétipo. Sem ele o slide é o "sem foto", que é o
    # que as páginas 6 e 9 fazem.
    pos = s.get("foto_pos")
    # `fundo` não é uma quarta posição da caixa: é a imagem ocupando o slide
    # inteiro. Usa a mesma grade do "sem foto" — nos dois casos não há caixa
    # disputando espaço com o texto — e o texto vai a branco, porque a cor do
    # slide sumiu debaixo da foto.
    de_fundo = pos == "fundo"
    if de_fundo:
        fundo = "fundo"
    if pos not in GRADE:
        pos = None
    g, lim = GRADE[pos], limites(pos)

    def bloco(nome, html):
        # O teto vai em `data-teto`, não em `max-height`: com entrelinha abaixo
        # de 1 o `scrollHeight` estoura por alguns pixels de glifo mesmo quando
        # o texto cabe, e medir por ali fazia o auto-fit encolher até o piso —
        # ou cortar a última palavra ao meio.
        return (f'<div class="bloco" data-teto="{lim[nome]}" style="top:{g[nome]}px">'
                f'<div class="dentro">{html}</div></div>')

    partes = []

    if s.get("tag"):
        partes.append(f'<div class="tag" style="top:{g["h1"] - 46}px">'
                      f'{esc(s["tag"])}</div>')

    # Cabeça do slide
    if tipo == "stat":
        cabeca = f'<div class="stat">{rich(s["numero"])}</div>'
    elif s.get("h1"):
        cls = "h1 grande" if tipo in ("declaracao", "cta") else "h1"
        cabeca = f'<div class="{cls} fit">{rich(s["h1"])}</div>'
    else:
        cabeca = ""
    if cabeca:
        partes.append(bloco("h1", cabeca))

    # Corpo do slide
    miolo = ""
    if tipo == "stat":
        miolo = f'<div class="corpo">{rich(s["label"])}</div>'
    elif tipo == "bullets":
        miolo = '<div class="bullets">' + "".join(
            f'<div class="row"><span class="seta">→</span><span>{rich(b)}</span></div>'
            for b in s["itens"]) + "</div>"
    elif tipo == "cta":
        if s.get("ponte"):
            miolo += f'<div class="corpo">{rich(s["ponte"])}</div>'
        chamada = s.get("chamada")
        if not chamada and s.get("instrucao"):
            chamada = f'{s["instrucao"]} **{s["palavra"]}**.'
        if chamada:
            miolo += f'<div class="corpo chamada">{rich(chamada)}</div>'
    for par in s.get("paragrafos", []):
        miolo += f'<div class="corpo">{rich(par)}</div>'
    if s.get("fonte"):
        miolo += f'<div class="fonte">Fonte: <b>{esc(s["fonte"])}</b></div>'
    if miolo:
        partes.append(bloco("corpo", f'<div class="pilha">{miolo}</div>'))

    # Foto — e quando ela ainda não existe, o espaço dela fica reservado e
    # visível, com o briefing do que entra ali. Slide não se desenha em volta
    # de uma foto que ninguém pediu.
    if pos:
        if s.get("imagem"):
            # A caixa é 864 × 442 e a foto quase nunca tem essa proporção: algo
            # é cortado. `foco` diz o que fica — sem isso o corte é sempre pelo
            # centro, e o assunto da foto costuma não estar lá.
            foco = s.get("foco", "50% 50%")
            dentro = (f'<img src="{b64_img(s["imagem"])}" alt="" '
                      f'style="object-position:{foco}">')
            classe = "foto"
        else:
            brief = s.get("imagem_brief", "Imagem a definir")
            dentro = (f'<span class="vaga-rot">Imagem · {esc(pos)}</span>'
                      f'<span class="vaga-brief">{esc(brief)}</span>'
                      f'<span class="vaga-dim">864 × 442 · canto 13</span>')
            classe = "foto vaga"
        partes.append(f'<div class="{classe}" style="top:{g["foto"]}px">{dentro}</div>')

    if de_fundo and s.get("imagem"):
        dose = s.get("scrim") or spec.get("capa_scrim", "medio")
        atras = (f'<div class="bg-foto capa-foto" style="background-image:url('
                 f'{b64_img(s["imagem"])});background-position:'
                 f'{s.get("foco", "50% 50%")}"></div>'
                 f'<div class="fundo-scrim dose-{dose}"></div>')
    else:
        atras = fundo_foto(s)

    return (f'<div class="slide f-{fundo}">{atras}'
            f'{"".join(partes)}{barra(spec)}</div>')


def chip_html(spec):
    selo = '<span class="selo">✓</span>' if spec.get("verificado", True) else ""
    inicial = esc(spec.get("marca", "?")[:1].upper())
    return (f'<div class="chip-linha"><span class="chip-dot">{inicial}</span>'
            f'<span class="chip-col"><span class="chip-nome">{esc(spec.get("marca",""))}'
            f'{selo}</span><span class="chip-handle">{esc(spec.get("handle",""))}'
            f'</span></span></div>')


def slide_sangrado(spec, s, i, tpl):
    """EXPANSION 02, 03 e 04 — a foto cobre o slide e o texto se apoia na base.

    Três dos quatro designs reais são assim, e é o enquadramento que mais
    aguenta texto curto: sem foto, um título de duas linhas fica solto no meio
    do nada; com a foto ocupando tudo, ele fecha a composição."""
    img = s.get("foto_fundo") or s.get("imagem")
    if img:
        bg = f'<div class="bg-foto capa-foto" style="background-image:url({b64_img(img)})"></div>'
    else:
        vaga = esc(s.get("imagem_brief", "Imagem a definir"))
        bg = ('<div class="capa-banho"></div>'
              f'<div class="vaga-sangrada"><span class="vaga-rot">Imagem de fundo</span>'
              f'<span class="vaga-brief">{vaga}</span></div>')
    dose = s.get("scrim") or spec.get("capa_scrim", "medio")
    chip = chip_html(spec) if i == 0 else ""
    head = s.get("headline") or s.get("h1") or ""
    apoio = s.get("sub") or " ".join(s.get("paragrafos", []))
    sub_html = f'<div class="sang-sub">{rich(apoio)}</div>' if apoio else ""
    return (f'<div class="slide f-capa tpl-sangrada">{bg}'
            f'<div class="capa-grad grad-{dose}"></div>'
            f'<div class="sang-area">{chip}'
            f'<div class="sang-h1 fit">{rich(head)}</div>{sub_html}</div>'
            f'{barra(spec)}</div>')


def slide_cartao(spec, s, i):
    """EXPANSION TWITTER — o post citado, em cartão de fundo claro.

    O formato empresta a credibilidade da rede: lê como algo que alguém
    publicou, não como peça de agência. Por isso o cabeçalho vem primeiro e o
    texto sem ênfase de cor — cor de marca aqui denuncia o anúncio."""
    selo = '<span class="selo-tw">✓</span>' if spec.get("verificado", True) else ""
    inicial = esc(spec.get("marca", "?")[:1].upper())
    head = s.get("headline") or s.get("h1") or ""
    pars = s.get("paragrafos", [])
    if s.get("sub"):
        pars = pars + [s["sub"]]

    meio = ""
    if s.get("imagem"):
        meio = f'<div class="tw-foto"><img src="{b64_img(s["imagem"])}" alt=""></div>'
    elif s.get("foto_pos") or s.get("imagem_brief"):
        meio = ('<div class="tw-foto vaga"><span class="vaga-rot">Imagem</span>'
                f'<span class="vaga-brief">{esc(s.get("imagem_brief","Imagem a definir"))}'
                '</span></div>')

    corpo = f'<div class="tw-texto">{rich(head)}</div>' if head else ""
    corpo += meio
    for par in pars:
        corpo += f'<div class="tw-texto">{rich(par)}</div>'

    return (f'<div class="slide f-claro tpl-cartao">'
            f'<div class="tw-cabeca"><span class="tw-avatar">{inicial}</span>'
            f'<span class="tw-ident"><span class="tw-nome">{esc(spec.get("marca",""))}{selo}</span>'
            f'<span class="tw-handle">{esc(spec.get("handle",""))}</span></span></div>'
            f'<div class="tw-corpo">{corpo}</div>{barra(spec)}</div>')


def build(spec):
    t = spec["tokens"]
    confere_fontes(spec["fontes"])
    faces = "".join(face(f["family"], f["weight"], f["file"]) for f in spec["fontes"])
    slides = "".join(slide_html(spec, s, i, len(spec["slides"]))
                     for i, s in enumerate(spec["slides"]))
    claro = t.get("claro", "#F0F0F0")
    op_barra = t.get("barra_opacidade", 0.30)
    tpl = TEMPLATES.get(spec.get("template", "expansion-01"), TEMPLATES["expansion-01"])
    sang = {"fonte": "var(--head)", "peso": 700, "tam": 88.3, "lh": .92,
            "tr": "-.087em", "align": "left"}
    sang.update({k: v for k, v in tpl.items() if k in sang})

    return f"""<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<title>{esc(spec['marca'])} — carrossel</title><style>
{faces}
*{{margin:0;padding:0;box-sizing:border-box}}
:root{{--escuro:{t['dark']};--destaque:{t['accent']};--claro:{claro};--texto:{t.get('texto','#FFFFFF')};
--head:'{t['fonte_head']}',sans-serif;--body:'{t['fonte_body']}',sans-serif;
--serif:'{t.get('fonte_serif', 'Source Serif 4')}',Georgia,serif;
--grad:{t.get('gradiente', 'linear-gradient(180deg,#fa7e01 0%,#ff6522 50%,#fa7e01 100%)')}}}

/* O degradê é do FUNDO do slide de destaque, não da escrita. A escrita em
   destaque é `--destaque` chapado — conferido na API e na renderização real de
   sete páginas. */
body{{background:#111;display:flex;flex-direction:column;align-items:center;gap:22px;padding:22px}}
.slide{{width:{W}px;height:{H}px;position:relative;overflow:hidden;flex:none}}

/* ── fundos ───────────────────────────────────────────────────────────── */
.f-capa,.f-foto,.f-fundo{{background:#000}}

/* Slide interno com a imagem de fundo. O véu aqui é parelho, não um degradê
   que sobe do pé: nesta grade o texto fica no terço superior, e um degradê de
   baixo deixaria a headline sobre a parte clara da foto. */
.fundo-scrim{{position:absolute;inset:0}}
.dose-leve{{background:linear-gradient(180deg,rgba(0,0,0,.56) 0%,rgba(0,0,0,.34) 58%,rgba(0,0,0,.62) 100%)}}
.dose-medio{{background:linear-gradient(180deg,rgba(0,0,0,.74) 0%,rgba(0,0,0,.56) 58%,rgba(0,0,0,.78) 100%)}}
.dose-forte{{background:linear-gradient(180deg,rgba(0,0,0,.88) 0%,rgba(0,0,0,.76) 58%,rgba(0,0,0,.90) 100%)}}
.f-escuro{{background:var(--escuro)}}
.f-destaque{{background:var(--grad)}}
.f-claro{{background:var(--claro)}}

/* foto sangrada — a imagem a 65% sobre preto, e o scrim subindo da base.
   Medido: a peça real empilha foto + degradê e ancora o texto embaixo. */
.bg-foto{{position:absolute;inset:0;background-size:cover;background-position:center}}
.bg-scrim{{position:absolute;inset:0;background:linear-gradient(to bottom,
transparent 26%,rgba(0,0,0,.72) 62%,rgba(0,0,0,.94) 84%,#000 100%)}}

/* ── barra superior · y 49,7 · x 56,1 · 15,78px bold · tracking 0 ─────── */
.barra{{position:absolute;top:49.7px;left:56.1px;right:56.1px;display:flex;
justify-content:space-between;z-index:20;font-family:var(--body);font-size:15.8px;
font-weight:700;line-height:1.4;letter-spacing:0;text-transform:uppercase;
opacity:{op_barra}}}
.f-escuro .barra,.f-capa .barra,.f-destaque .barra,.f-foto .barra,
.f-fundo .barra{{color:#fff}}
.f-claro .barra{{color:#000}}
.f-destaque .barra{{color:#fff}}

/* ── grade · margem lateral 108, largura útil 864 ─────────────────────── */
.bloco{{position:absolute;left:{MARGEM}px;width:{UTIL}px;z-index:2}}
.pilha{{display:flex;flex-direction:column;gap:30px}}
.foto,.tag{{position:absolute;left:{MARGEM}px;width:{UTIL}px;z-index:2}}
.f-foto .content{{position:absolute;left:{MARGEM}px;right:{MARGEM}px;bottom:{MARGEM}px;
display:flex;flex-direction:column;justify-content:flex-end;gap:32px;z-index:2}}

.tag{{font-family:var(--body);font-size:17px;font-weight:600;letter-spacing:3px;
text-transform:uppercase;overflow:visible}}
.f-escuro .tag,.f-claro .tag,.f-foto .tag,.f-fundo .tag{{color:var(--destaque)}}
.f-destaque .tag{{color:rgba(255,255,255,.72)}}

/* ── título · 75,7px semibold · lh 1,06 · tracking −0,056 · à esquerda ───
   Faixa medida nas peças reais: 60,5 a 83,8. O auto-fit trabalha dentro dela. */
.h1{{font-family:var(--head);font-size:75.7px;font-weight:600;line-height:1.06;
letter-spacing:-.056em}}
.h1.grande{{font-size:83.8px}}
.f-escuro .h1,.f-foto .h1,.f-fundo .h1{{color:var(--texto)}}
.f-destaque .h1{{color:#fff}}
.f-claro .h1{{color:#000}}
.h1 em{{font-style:normal}}
.f-escuro .h1 em,.f-claro .h1 em,.f-foto .h1 em,.f-fundo .h1 em{{color:var(--destaque)}}
.f-destaque .h1 em{{color:#fff;font-weight:700}}
.h1 b{{font-weight:700}}

/* ── corpo · 45,4px · lh 0,96 · tracking −0,033 · à esquerda ────────────
   Entrelinha abaixo de 1 é escolha de estilo, não descuido: dá densidade.
   O texto é branco chapado — a ênfase é por cor ou por peso, nunca por
   opacidade, que é como eu tinha feito antes. */
.corpo{{font-family:var(--body);font-size:45.4px;font-weight:400;line-height:.96;
letter-spacing:-.033em;text-align:left}}
.f-claro .corpo{{font-size:36.6px}}
.f-escuro .corpo,.f-foto .corpo,.f-destaque .corpo,.f-fundo .corpo{{color:#fff}}
.f-claro .corpo{{color:#000}}
.corpo b{{font-weight:700}}
.corpo em{{font-style:normal;font-weight:400;color:var(--destaque)}}
.f-destaque .corpo em{{color:#fff;font-weight:700}}

/* Chamada do slide final: o parágrafo inteiro na cor de destaque, e a palavra
   de comando em bold dentro dele. */
.corpo.chamada{{color:var(--destaque)}}
.corpo.chamada b{{font-weight:700}}
.f-destaque .corpo.chamada{{color:#fff;font-weight:600}}

.fonte{{font-family:var(--body);font-size:21px;padding-top:20px;letter-spacing:.3px}}
.f-escuro .fonte,.f-foto .fonte{{color:rgba(255,255,255,.55);border-top:1px solid rgba(255,255,255,.20)}}
.f-destaque .fonte{{color:rgba(0,0,0,.55);border-top:1px solid rgba(0,0,0,.20)}}
.f-claro .fonte{{color:rgba(0,0,0,.55);border-top:1px solid rgba(0,0,0,.16)}}
.fonte b{{font-weight:600}}

/* caixa de imagem · 864 × 488,4 · canto 13 */
.foto{{height:{FOTO_H}px;border-radius:{FOTO_R}px;overflow:hidden}}
.foto img{{width:100%;height:100%;object-fit:cover;display:block}}

/* Vaga de imagem — o espaço fica reservado na medida certa, com o briefing do
   que entra ali. O slide já nasce desenhado em volta da foto, e trocar a vaga
   pela imagem não mexe em mais nada. */
.foto.vaga{{display:flex;flex-direction:column;align-items:center;justify-content:center;
gap:14px;text-align:center;padding:0 64px;border:2px dashed var(--destaque);
background:rgba(255,255,255,.04)}}
.f-claro .foto.vaga{{background:rgba(0,0,0,.03)}}
.f-destaque .foto.vaga{{border-color:#fff;background:rgba(255,255,255,.10)}}
.vaga-rot{{font-family:var(--body);font-size:16px;font-weight:700;letter-spacing:.18em;
text-transform:uppercase;color:var(--destaque)}}
.vaga-brief{{font-family:var(--body);font-size:31px;line-height:1.14;letter-spacing:-.02em}}
.vaga-dim{{font-family:var(--body);font-size:15px;letter-spacing:.1em;opacity:.5}}
.f-escuro .vaga-brief,.f-foto .vaga-brief{{color:#fff}}
.f-claro .vaga-brief{{color:#000}}
.f-destaque .vaga-rot,.f-destaque .vaga-brief{{color:#fff}}

.stat{{font-family:var(--head);font-size:150px;font-weight:700;line-height:.92;
letter-spacing:-.06em;color:var(--destaque)}}
.f-destaque .stat{{color:#fff}}


.bullets{{display:flex;flex-direction:column;gap:22px}}
.row{{display:flex;gap:22px;align-items:flex-start;font-family:var(--body);
font-size:40px;line-height:1.02;letter-spacing:-.033em}}
.f-escuro .row,.f-foto .row,.f-destaque .row,.f-fundo .row{{color:#fff}}
.f-claro .row{{color:#000}}
.row b{{font-weight:700}}
.row em{{font-style:normal;color:var(--destaque)}}
.seta{{flex:none;font-weight:600;color:var(--destaque)}}
.f-destaque .seta{{color:#000}}

/* ── capa · geometria da página 1 ──────────────────────────────────────
   foto cobre o slide em opacidade cheia — quem escurece são os dois scrims,
   um longo a partir de y 160 e outro reforçando a base a partir de y 1111.
   É isso que deixa a imagem legível atrás sem apagá-la. */
.capa-foto{{opacity:1}}
.capa-grad{{position:absolute;inset:0}}

/* Dosagem do scrim. A régua: **a metade de cima da capa tem que continuar
   sendo imagem**, e o texto só precisa de fundo escuro de y 700 para baixo.
   Escurecer o slide inteiro resolve a legibilidade e mata a foto — e a foto é
   o que faz alguém parar no feed.

   leve   foto já escura, ou de pouco detalhe no pé
   medio  medida da página 1 — o padrão
   forte  foto clara, contrastada ou com muita informação embaixo */
.grad-leve{{background:linear-gradient(to bottom,
rgba(0,0,0,.10) 0%,rgba(0,0,0,.02) 24%,rgba(0,0,0,.26) 50%,rgba(0,0,0,.64) 68%,
rgba(0,0,0,.88) 86%,rgba(0,0,0,.96) 100%)}}
.grad-medio{{background:linear-gradient(to bottom,
rgba(0,0,0,.18) 0%,rgba(0,0,0,.06) 18%,rgba(0,0,0,.42) 46%,rgba(0,0,0,.80) 66%,
rgba(0,0,0,.95) 84%,#000 100%)}}
.grad-forte{{background:linear-gradient(to bottom,
rgba(0,0,0,.30) 0%,rgba(0,0,0,.16) 16%,rgba(0,0,0,.58) 42%,rgba(0,0,0,.90) 62%,
#000 80%,#000 100%)}}

.slide:has(.capa-banho) .capa-h1{{bottom:130px}}

/* chip · y 748,3 · avatar 46,2 · nome 21,4 medium · @ 10,6 a 49% */
.chip{{position:absolute;top:748.3px;left:0;right:0;z-index:10;
display:flex;align-items:center;justify-content:center;gap:11px}}
.chip-dot{{width:46.2px;height:46.2px;border-radius:50%;background:var(--destaque);
display:flex;align-items:center;justify-content:center;font-family:var(--head);
font-size:23px;font-weight:700;color:#fff;flex:none}}
.chip-col{{display:flex;flex-direction:column}}
.chip-nome{{display:flex;align-items:center;gap:7px;font-family:var(--body);
font-size:21.4px;font-weight:500;line-height:1.4;letter-spacing:-.084em;color:#fff}}
.chip-handle{{font-family:var(--body);font-size:10.6px;font-weight:500;line-height:1.4;
letter-spacing:-.084em;color:#fff;opacity:.49}}
.selo{{width:16px;height:16px;border-radius:50%;background:#1d9bf0;color:#fff;
display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;
flex:none}}

/* headline · y 800,5 · left 108 · 864 de largura · até 439,2 de altura.
   Duas capas, e a diferença é de gênero editorial:
   impacto  111,5 bold · lh 0,92 · tracking −0,087   → topo de funil, viral
   manchete  79,6 semibold · lh 1,06 · tracking −0,056 → newsroom */
.capa-h1{{position:absolute;bottom:110.3px;left:{MARGEM}px;width:{UTIL}px;
z-index:10;font-family:var(--head);color:#fff;text-align:center}}
.capa-impacto{{font-size:111.5px;font-weight:700;line-height:.92;letter-spacing:-.087em}}
.capa-manchete{{font-size:79.6px;font-weight:600;line-height:1.06;letter-spacing:-.056em}}
.capa-h1 em{{font-style:normal;color:var(--destaque)}}
.capa-h1 b{{font-weight:700}}

/* Legenda: existe, mas não entra por padrão. A página 1 não tem, e uma linha
   a mais embaixo divide a atenção e tira força da headline. */
.capa-sub{{position:absolute;top:1262px;left:{MARGEM}px;width:{UTIL}px;z-index:10;
font-family:var(--body);font-size:21.2px;font-weight:400;line-height:1.06;
letter-spacing:-.056em;color:#fff;text-align:center;opacity:.72}}
.capa-sub em{{font-style:normal;color:var(--destaque)}}

/* ── EXPANSION 02 · 03 · 04 — foto sangrada ────────────────────────────
   O texto se apoia na base e a foto ocupa tudo. O que muda entre os três é
   só a capa: alinhamento, família e tamanho do título. */
.sang-area{{position:absolute;left:{MARGEM}px;right:{MARGEM}px;bottom:104px;z-index:10;
display:flex;flex-direction:column;gap:26px;align-items:{'center' if sang['align'] == 'center' else 'flex-start'};
text-align:{sang['align']}}}
.sang-h1{{font-family:{sang['fonte']};font-weight:{sang['peso']};font-size:{sang['tam']}px;
line-height:{sang['lh']};letter-spacing:{sang['tr']};color:#fff;max-width:100%}}
.sang-h1 em{{font-style:normal;color:var(--destaque)}}
.sang-h1 b{{font-weight:700}}
.sang-sub{{font-family:var(--body);font-size:31px;font-weight:400;line-height:1.18;
letter-spacing:-.02em;color:#fff;opacity:.86;max-width:92%}}
.sang-sub em{{font-style:normal;color:var(--destaque);opacity:1}}
.chip-linha{{display:flex;align-items:center;gap:11px;margin-bottom:4px}}

.vaga-sangrada{{position:absolute;inset:{MARGEM}px {MARGEM}px 620px;z-index:5;
border:2px dashed var(--destaque);border-radius:{FOTO_R}px;display:flex;
flex-direction:column;align-items:center;justify-content:center;gap:12px;
text-align:center;padding:0 60px}}

/* ── EXPANSION TWITTER — cartão de post ────────────────────────────────
   Empresta a credibilidade da rede: lê como algo que alguém publicou, não
   como peça de agência. Por isso nada de cor de marca no texto. */
.tpl-cartao{{background:#fff}}
.tw-cabeca{{position:absolute;top:186px;left:{MARGEM}px;display:flex;align-items:center;
gap:20px;z-index:2}}
.tw-avatar{{width:82px;height:82px;border-radius:50%;background:var(--destaque);
display:flex;align-items:center;justify-content:center;font-family:var(--head);
font-size:38px;font-weight:700;color:#fff;flex:none}}
.tw-ident{{display:flex;flex-direction:column;gap:2px}}
.tw-nome{{display:flex;align-items:center;gap:9px;font-family:var(--body);font-size:34px;
font-weight:600;color:#0F1419;letter-spacing:-.02em}}
.tw-handle{{font-family:var(--body);font-size:28px;color:#536471;letter-spacing:-.02em}}
.selo-tw{{width:26px;height:26px;border-radius:50%;background:#1d9bf0;color:#fff;
display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700}}
.tw-corpo{{position:absolute;top:318px;left:{MARGEM}px;right:{MARGEM}px;bottom:{MARGEM}px;
display:flex;flex-direction:column;gap:30px;z-index:2}}
.tw-texto{{font-family:var(--body);font-size:41px;font-weight:500;line-height:1.24;
letter-spacing:-.022em;color:#0F1419}}
.tw-texto em{{font-style:normal;font-weight:600;color:#0F1419}}
.tw-texto b{{font-weight:700}}
.tw-foto{{height:{FOTO_H}px;border-radius:{FOTO_R}px;overflow:hidden;flex:none}}
.tw-foto img{{width:100%;height:100%;object-fit:cover;display:block}}
.tw-foto.vaga{{display:flex;flex-direction:column;align-items:center;justify-content:center;
gap:12px;text-align:center;padding:0 60px;border:2px dashed var(--destaque);
background:rgba(0,0,0,.03)}}
.tpl-cartao .vaga-brief{{color:#0F1419}}
.tpl-cartao .barra{{color:#0F1419}}
</style></head><body>
{slides}
<script>
/* Auto-fit sobre a grade. Cada bloco tem um `top` medido e uma altura máxima
   — até onde o próximo começa. O texto encolhe dentro da própria fatia, sem
   empurrar o slide: é o que mantém os nove slides alinhados entre si. */
/* Depois de `document.fonts.ready`, não antes. Rodando cedo o auto-fit mede o
   texto na fonte de sistema, para de encolher achando que coube, e quando a
   fonte real entra o bloco estoura — foi assim que uma palavra saiu cortada ao
   meio numa peça pronta. */
document.fonts.ready.then(function () {{
  function px(el) {{ return parseFloat(getComputedStyle(el).fontSize); }}
  // Altura real do texto = linhas x entrelinha, e `offsetHeight` dá isso exato.
  // `scrollHeight` inclui o transbordo do glifo e mente quando lh < 1.
  function passa(el, teto) {{ return el.offsetHeight > teto + 1; }}

  document.querySelectorAll('.slide').forEach(function (slide) {{
    slide.querySelectorAll('.bloco').forEach(function (b) {{
      var teto = parseFloat(b.dataset.teto);
      var dentro = b.firstElementChild;
      var head = dentro.querySelector('.fit');
      if (head) {{
        while (passa(dentro, teto) && px(head) > 34)
          head.style.fontSize = (px(head) - 1) + 'px';
      }}
      var corpos = dentro.querySelectorAll('.corpo, .row');
      var guarda = 0;
      while (corpos.length && passa(dentro, teto) && guarda++ < 90) {{
        corpos.forEach(function (c) {{ if (px(c) > 22) c.style.fontSize = (px(c) - 1) + 'px'; }});
      }}
    }});
    // EXPANSION 02/03/04: o bloco de baixo não pode passar de 620px, senão
    // sobe por cima da foto e some o motivo de ela estar ali.
    var sang = slide.querySelector('.sang-area');
    if (sang) {{
      var sh = sang.querySelector('.sang-h1');
      while (sh && sang.offsetHeight > 620 && px(sh) > 46)
        sh.style.fontSize = (px(sh) - 1) + 'px';
    }}
    // A capa tem 439,2 de altura útil e cresce da base para cima.
    var capa = slide.querySelector('.capa-h1');
    if (capa) {{
      var piso = capa.classList.contains('capa-impacto') ? 62 : 48;
      while (passa(capa, 439.2) && px(capa) > piso)
        capa.style.fontSize = (px(capa) - 1) + 'px';
    }}
  }});
  window.__fitPronto = true;
}});
</script>
</body></html>"""


if __name__ == "__main__":
    spec = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    Path(sys.argv[2]).write_text(build(spec), encoding="utf-8")
    print(f"HTML: {sys.argv[2]}  ({len(spec['slides'])} slides)")
