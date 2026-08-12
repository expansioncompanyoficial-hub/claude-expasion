#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Converte o relatorio em pagina publicavel, sem tocar no conteudo."""
import re, html, markdown

SRC = "/home/user/claude-expasion/PESQUISA-MERCADO-ESTAGIOS-LICITACOES-2026-08-11.md"
OUT = "/tmp/claude-0/-home-user-claude-expasion/6dcc46f7-e5ce-5d50-a2a3-dba63eb180d1/scratchpad/relatorio.html"

md = open(SRC, encoding="utf-8").read()

# --- sumario a partir dos H1 ---
h1s = re.findall(r"^# (.+)$", md, re.M)
def slug(t):
    t = re.sub(r"[*`>]", "", t).strip()
    s = re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")
    return s[:60]

# o titulo e o subtitulo ja estao no cabecalho da pagina: nao repetir no corpo
md_body = re.sub(r"^# MERCADO BRASILEIRO.*?\n## .*?\n", "", md, count=1, flags=re.S)
h1s.pop(0)
body = markdown.markdown(md_body, extensions=["tables", "fenced_code", "sane_lists", "attr_list"])

# ancoras nos H1
def anchor(m):
    txt = re.sub("<[^>]+>", "", m.group(1))
    return f'<h1 id="{slug(txt)}">{m.group(1)}</h1>'
body = re.sub(r"<h1>(.*?)</h1>", anchor, body, flags=re.S)

# tabelas rolam sozinhas
body = body.replace("<table>", '<div class="tw"><table>').replace("</table>", "</tabl" + "e></div>")

# rotulos de evidencia viram chips
TIERS = {
    "FATO": "t-fato", "DADO_DECLARADO": "t-decl", "ESTIMATIVA": "t-est",
    "INFERÊNCIA": "t-inf", "INFERENCIA": "t-inf", "HIPÓTESE": "t-hip",
    "HIPOTESE": "t-hip", "OPINIÃO": "t-opi",
}
def chips(txt):
    for k, cls in TIERS.items():
        txt = re.sub(rf"(?<![\w-]){k}(?![\w-])", f'<span class="tier {cls}">{k}</span>', txt)
    return txt
# so dentro de celulas de tabela, para nao poluir a prosa
body = re.sub(r"<td>(.*?)</td>", lambda m: "<td>" + chips(m.group(1)) + "</td>", body, flags=re.S)

toc = "\n".join(
    f'<li><a href="#{slug(t)}">{html.escape(re.sub(r"[*`]", "", t))}</a></li>' for t in h1s
)

CSS = """
:root{
  --paper:#f7f8f8; --raised:#ffffff; --ink:#14201f; --ink-2:#3d4b49; --ink-3:#5f6d6b;
  --rule:#dfe4e3; --rule-2:#eceff0;
  --accent:#0d6b5f; --accent-soft:#e3efec; --accent-ink:#0a5449;
  --amber:#8a5d06; --amber-soft:#f6eddb;
  --slate:#4f5b66; --slate-soft:#e9edf0;
  --violet:#5b4a7a; --violet-soft:#eceaf3;
  --alert:#9a3123; --alert-soft:#f7e7e4;
  --shadow:0 1px 2px rgba(20,32,31,.05),0 8px 24px -12px rgba(20,32,31,.14);
}
@media (prefers-color-scheme: dark){
  :root:not([data-theme="light"]){
    --paper:#101615; --raised:#171f1e; --ink:#e8edec; --ink-2:#b6c2c0; --ink-3:#8b9997;
    --rule:#2a3634; --rule-2:#202b2a;
    --accent:#5cbfae; --accent-soft:#16302c; --accent-ink:#7fd3c4;
    --amber:#d9a44a; --amber-soft:#2e2717;
    --slate:#9fb0bd; --slate-soft:#1e262c;
    --violet:#a99ac9; --violet-soft:#231f2e;
    --alert:#e08574; --alert-soft:#2f1c19;
    --shadow:0 1px 2px rgba(0,0,0,.4),0 8px 24px -12px rgba(0,0,0,.6);
  }
}
:root[data-theme="dark"]{
  --paper:#101615; --raised:#171f1e; --ink:#e8edec; --ink-2:#b6c2c0; --ink-3:#8b9997;
  --rule:#2a3634; --rule-2:#202b2a;
  --accent:#5cbfae; --accent-soft:#16302c; --accent-ink:#7fd3c4;
  --amber:#d9a44a; --amber-soft:#2e2717;
  --slate:#9fb0bd; --slate-soft:#1e262c;
  --violet:#a99ac9; --violet-soft:#231f2e;
  --alert:#e08574; --alert-soft:#2f1c19;
  --shadow:0 1px 2px rgba(0,0,0,.4),0 8px 24px -12px rgba(0,0,0,.6);
}
*{box-sizing:border-box}
body{
  background:var(--paper); color:var(--ink);
  font-family:Georgia,"Iowan Old Style","Source Serif 4",serif;
  font-size:17px; line-height:1.66; margin:0;
  -webkit-text-size-adjust:100%;
}
.wrap{max-width:1080px;margin:0 auto;padding:0 clamp(16px,4vw,40px) 96px}
.masthead{
  border-bottom:2px solid var(--ink); margin-bottom:40px; padding:clamp(32px,6vw,64px) 0 20px;
}
.eyebrow{
  font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
  font-size:11.5px; letter-spacing:.16em; text-transform:uppercase;
  color:var(--accent-ink); font-weight:650; margin:0 0 14px;
}
.masthead h1.doc{
  font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
  font-weight:760; letter-spacing:-.028em; line-height:1.06;
  font-size:clamp(30px,5.2vw,52px); margin:0 0 16px; text-wrap:balance; color:var(--ink);
}
.standfirst{font-size:clamp(17px,2vw,20px);color:var(--ink-2);margin:0;max-width:62ch}
.meta{
  display:flex;flex-wrap:wrap;gap:8px 26px;margin-top:24px;
  font-family:ui-sans-serif,system-ui,sans-serif;font-size:12.5px;color:var(--ink-3);
}
.meta b{color:var(--ink-2);font-weight:600}

nav.toc{
  background:var(--raised);border:1px solid var(--rule);border-radius:3px;
  padding:20px 24px;margin:0 0 48px;box-shadow:var(--shadow);
}
nav.toc summary{
  font-family:ui-sans-serif,system-ui,sans-serif;font-weight:650;font-size:13px;
  letter-spacing:.08em;text-transform:uppercase;color:var(--ink-2);cursor:pointer;
}
nav.toc ol{
  margin:18px 0 0;padding:0;list-style:none;
  columns:2;column-gap:36px;
  font-family:ui-sans-serif,system-ui,sans-serif;font-size:14px;
}
nav.toc li{margin:0 0 9px;break-inside:avoid}
nav.toc a{color:var(--ink-2);text-decoration:none;border-bottom:1px solid transparent}
nav.toc a:hover{color:var(--accent-ink);border-bottom-color:var(--accent)}
@media(max-width:640px){nav.toc ol{columns:1}}

main :is(h1,h2,h3,h4){
  font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
  text-wrap:balance;color:var(--ink);
}
main h1{
  font-size:clamp(24px,3.4vw,33px);font-weight:740;letter-spacing:-.022em;line-height:1.15;
  margin:76px 0 22px;padding-top:22px;border-top:2px solid var(--ink);scroll-margin-top:20px;
}
main h1:first-child{margin-top:0}
main h2{font-size:clamp(19px,2.4vw,23px);font-weight:700;letter-spacing:-.015em;margin:48px 0 14px}
main h3{font-size:17px;font-weight:680;margin:34px 0 10px;color:var(--ink-2)}
main h4{font-size:15px;font-weight:660;margin:26px 0 8px;color:var(--ink-3)}
main p{margin:0 0 17px;max-width:74ch}
main ul,main ol{max-width:74ch;padding-left:22px;margin:0 0 17px}
main li{margin:0 0 7px}
main a{color:var(--accent-ink);text-decoration:underline;text-underline-offset:2px;
  text-decoration-thickness:1px;word-break:break-word}
main a:hover{background:var(--accent-soft)}
strong{font-weight:700;color:var(--ink)}
hr{border:0;border-top:1px solid var(--rule);margin:44px 0}

blockquote{
  margin:24px 0;padding:16px 22px;background:var(--accent-soft);
  border-left:3px solid var(--accent);border-radius:0 3px 3px 0;
}
blockquote p{margin:0 0 10px;max-width:70ch}
blockquote p:last-child{margin:0}

.tw{overflow-x:auto;margin:24px 0;border:1px solid var(--rule);border-radius:3px;background:var(--raised)}
table{border-collapse:collapse;width:100%;font-size:14px;
  font-family:ui-sans-serif,system-ui,sans-serif;font-variant-numeric:tabular-nums}
thead th{
  background:var(--rule-2);color:var(--ink-2);text-align:left;font-weight:660;
  font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;
  padding:11px 14px;border-bottom:1px solid var(--rule);white-space:nowrap;
}
td{padding:11px 14px;border-bottom:1px solid var(--rule-2);vertical-align:top;color:var(--ink-2)}
tbody tr:last-child td{border-bottom:0}
tbody tr:hover td{background:var(--rule-2)}
td strong{color:var(--ink)}

.tier{
  display:inline-block;font-family:ui-sans-serif,system-ui,sans-serif;
  font-size:10.5px;font-weight:700;letter-spacing:.05em;
  padding:2px 7px;border-radius:2px;white-space:nowrap;
}
.t-fato{background:var(--accent-soft);color:var(--accent-ink);box-shadow:inset 0 0 0 1px var(--accent)}
.t-decl{background:var(--amber-soft);color:var(--amber);box-shadow:inset 0 0 0 1px var(--amber)}
.t-est,.t-inf{background:var(--slate-soft);color:var(--slate);box-shadow:inset 0 0 0 1px var(--slate)}
.t-hip,.t-opi{background:var(--violet-soft);color:var(--violet);box-shadow:inset 0 0 0 1px var(--violet)}

code{
  font-family:ui-monospace,"SF Mono",Menlo,Consolas,monospace;font-size:.87em;
  background:var(--rule-2);padding:1px 5px;border-radius:2px;color:var(--ink)
}
pre{
  background:var(--raised);border:1px solid var(--rule);border-left:3px solid var(--slate);
  border-radius:3px;padding:16px 18px;overflow-x:auto;margin:24px 0;
}
pre code{background:none;padding:0;font-size:13px;line-height:1.6}

footer{
  margin-top:80px;padding-top:24px;border-top:1px solid var(--rule);
  font-family:ui-sans-serif,system-ui,sans-serif;font-size:12.5px;color:var(--ink-3);
}
::selection{background:var(--accent-soft);color:var(--accent-ink)}
a:focus-visible,summary:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
"""

page = f"""<title>Estágios: mercado, licitações e economia real</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>{CSS}</style>
<div class="wrap">
<header class="masthead">
  <p class="eyebrow">Pesquisa de mercado &middot; Expansion Company</p>
  <h1 class="doc">Mercado brasileiro de estágios e as licitações de agente de integração</h1>
  <p class="standfirst">Um diagnóstico que testa — em vez de aceitar — a afirmação de que
  está difícil preencher vagas de estágio, e separa o valor dos contratos públicos daquilo
  que de fato vira receita.</p>
  <div class="meta">
    <span><b>Data de corte</b> 11 de agosto de 2026</span>
    <span><b>Frentes</b> 19 independentes + 4 auditorias</span>
    <span><b>Buscas</b> 323</span>
    <span><b>Achados</b> 425 classificados</span>
    <span><b>Processos localizados</b> 27</span>
  </div>
</header>
<nav class="toc"><details open><summary>Conteúdo</summary><ol>{toc}</ol></details></nav>
<main>{body}</main>
<footer>Documento vivo, versionado em <code>PESQUISA-MERCADO-ESTAGIOS-LICITACOES-2026-08-11.md</code>.
Cada afirmação quantitativa carrega fonte, ano e grau de confiança. Onde o dado não foi
localizado, o relatório diz isso em vez de estimar.</footer>
</div>"""

open(OUT, "w", encoding="utf-8").write(page)
print(f"gerado: {OUT}  ({len(page):,} bytes)")
print(f"H1 no sumario: {len(h1s)}")
print(f"tabelas: {body.count('<table>')}")
chip = chr(34) + "tier"
print("chips de evidencia:", body.count("class=" + chip))
