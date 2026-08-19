#!/usr/bin/env python3
"""
Estúdio Expansion — serviço de render e portal de aprovação.

    python3 SERVICO/app.py [porta]

Duas coisas em um processo só, porque as duas precisam do mesmo Chromium e
subir dois containers para isso é desperdício:

    POST /pecas              cria a peça a partir do spec e devolve os PNGs
    GET  /pecas/{id}         estado da peça em JSON
    GET  /pecas/{id}/png/{n} um slide
    GET  /a/{token}          portal de aprovação do cliente
    POST /a/{token}          registra aprovar ou refazer

Sem dependência além do que o renderizador já usa. O `http.server` da
biblioteca padrão aguenta o volume desta operação com folga — trocar por um
framework é decisão de quando o volume justificar, não antes.

Armazenamento hoje é o disco (`SERVICO/dados/`). A troca por Supabase é
substituir a classe `Deposito` — o resto do serviço não sabe onde o dado mora.
"""
import base64
import json
import re
import secrets
import sys
import threading
from datetime import datetime, timedelta, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

RAIZ = Path(__file__).resolve().parent
sys.path.insert(0, str(RAIZ.parent / ".claude/skills/carrossel-viral/scripts"))
from render_carrossel import build  # noqa: E402

DADOS = RAIZ / "dados"
DADOS.mkdir(exist_ok=True)
CHROME = "/opt/pw-browsers/chromium"


def agora():
    return datetime.now(timezone.utc).isoformat()


# ── depósito ──────────────────────────────────────────────────────────────
class Deposito:
    """Disco, por enquanto. Trocar por Supabase é reimplementar estes métodos."""

    def caminho(self, peca_id):
        return DADOS / re.sub(r"[^a-zA-Z0-9_-]", "", peca_id)

    def grava(self, peca_id, estado):
        d = self.caminho(peca_id)
        d.mkdir(parents=True, exist_ok=True)
        (d / "estado.json").write_text(
            json.dumps(estado, ensure_ascii=False, indent=2), encoding="utf-8")

    def le(self, peca_id):
        f = self.caminho(peca_id) / "estado.json"
        return json.loads(f.read_text(encoding="utf-8")) if f.exists() else None

    def por_token(self, token):
        for d in DADOS.iterdir():
            e = self.le(d.name)
            if e and e.get("token") == token:
                return e
        return None


deposito = Deposito()


# ── render ────────────────────────────────────────────────────────────────
_navegador = None
_trava = threading.Lock()


def navegador():
    """Um Chromium vivo para o processo inteiro.

    Subir um por requisição custa ~1s cada e é o gargalo óbvio do serviço.
    Aqui ele sobe uma vez; a trava serializa o uso, que é o suficiente para o
    volume de uma agência e evita a classe inteira de bug de concorrência do
    Playwright."""
    global _navegador
    if _navegador is None:
        from playwright.sync_api import sync_playwright
        pw = sync_playwright().start()
        _navegador = pw.chromium.launch(
            executable_path=CHROME, args=["--force-device-scale-factor=1"])
    return _navegador


def renderiza(spec, destino):
    """spec -> PNGs no disco. Devolve a lista de arquivos."""
    html = destino / "carrossel.html"
    html.write_text(build(spec), encoding="utf-8")
    png = destino / "png"
    png.mkdir(exist_ok=True)

    with _trava:
        pagina = navegador().new_page(viewport={"width": 1240, "height": 1420})
        try:
            pagina.goto(html.as_uri(), wait_until="networkidle")
            # O auto-fit só roda depois das fontes; sem esperar por ele o PNG
            # sai no tamanho pré-ajuste.
            pagina.wait_for_function("() => window.__fitPronto === true", timeout=30000)
            slides = pagina.locator(".slide")
            saida = []
            for i in range(slides.count()):
                arq = png / f"slide_{i + 1:02d}.png"
                slides.nth(i).screenshot(path=str(arq))
                saida.append(arq.name)
            caixa = slides.nth(0).bounding_box()
            if round(caixa["width"]) != 1080 or round(caixa["height"]) != 1350:
                raise RuntimeError(
                    f"slide saiu {caixa['width']}x{caixa['height']}, não 1080x1350")
            return saida
        finally:
            pagina.close()


# ── portal de aprovação ───────────────────────────────────────────────────
PORTAL = """<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{titulo} — aprovação</title><style>
*{{margin:0;padding:0;box-sizing:border-box}}
body{{background:#0E1015;color:#E7EBF2;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
padding:26px 18px 80px;display:flex;flex-direction:column;align-items:center;gap:22px}}
header{{max-width:520px;width:100%}}
h1{{font-size:19px;font-weight:600;letter-spacing:-.01em}}
.sub{{color:#8E97A8;font-size:13.5px;margin-top:5px;line-height:1.5}}
.moldura{{width:100%;max-width:420px;background:#161A21;border:1px solid #262C37;
border-radius:14px;overflow:hidden}}
.topo-ig{{display:flex;align-items:center;gap:9px;padding:11px 13px;border-bottom:1px solid #262C37}}
.bolha{{width:30px;height:30px;border-radius:50%;background:{accent};display:flex;
align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#fff}}
.arroba{{font-size:13px;font-weight:600}}
.carrossel{{display:flex;overflow-x:auto;scroll-snap-type:x mandatory}}
.carrossel img{{width:100%;flex:none;scroll-snap-align:center;display:block}}
.pontos{{display:flex;gap:5px;justify-content:center;padding:11px}}
.ponto{{width:6px;height:6px;border-radius:50%;background:#38404E}}
.ponto.on{{background:{accent}}}
.legenda{{max-width:520px;width:100%;background:#161A21;border:1px solid #262C37;
border-radius:12px;padding:15px;font-size:13.5px;line-height:1.6;color:#C6CDD9;white-space:pre-wrap}}
.acoes{{max-width:520px;width:100%;display:flex;flex-direction:column;gap:11px}}
button{{font-family:inherit;font-size:14.5px;font-weight:600;padding:14px;border-radius:10px;
border:none;cursor:pointer}}
.ok{{background:{accent};color:#fff}}
.nao{{background:transparent;color:#E7EBF2;border:1px solid #38404E}}
textarea{{width:100%;background:#1D222B;border:1px solid #262C37;border-radius:10px;
padding:12px;color:#E7EBF2;font-family:inherit;font-size:13.5px;min-height:88px;resize:vertical}}
.oculto{{display:none}}
.aviso{{max-width:520px;width:100%;font-size:12.5px;color:#5F6878;line-height:1.55;text-align:center}}
.fim{{max-width:520px;width:100%;background:#161A21;border:1px solid #262C37;border-radius:12px;
padding:22px;text-align:center;font-size:15px;line-height:1.6}}
</style></head><body>
<header>
  <h1>{titulo}</h1>
  <div class="sub">{cliente} · {n} slides · enviado em {data}</div>
</header>

<div id="peca">
  <div class="moldura">
    <div class="topo-ig"><span class="bolha">{inicial}</span><span class="arroba">{handle}</span></div>
    <div class="carrossel" id="tira">{imagens}</div>
    <div class="pontos">{pontos}</div>
  </div>
</div>

<div class="legenda">{legenda}</div>

<div class="acoes" id="acoes">
  <button class="ok" id="b-ok">Aprovar e publicar</button>
  <button class="nao" id="b-nao">Pedir alteração</button>
  <div id="cx-nao" class="oculto">
    <textarea id="txt" placeholder="O que precisa mudar? Quanto mais específico, menos rodada."></textarea>
    <button class="nao" id="b-enviar" style="margin-top:9px;width:100%">Enviar pedido</button>
  </div>
</div>

<div class="fim oculto" id="fim"></div>
<div class="aviso">A aprovação é o que dispara a publicação. Nada vai ao ar antes dela.</div>

<script>
const tira = document.getElementById('tira'), pontos = [...document.querySelectorAll('.ponto')];
tira.addEventListener('scroll', () => {{
  const i = Math.round(tira.scrollLeft / tira.clientWidth);
  pontos.forEach((p, k) => p.classList.toggle('on', k === i));
}});
function fecha(msg) {{
  document.getElementById('acoes').classList.add('oculto');
  const f = document.getElementById('fim');
  f.textContent = msg; f.classList.remove('oculto');
}}
async function manda(decisao, comentario) {{
  const r = await fetch(location.pathname, {{
    method: 'POST', headers: {{'Content-Type': 'application/json'}},
    body: JSON.stringify({{decisao, comentario}})
  }});
  if (r.ok) fecha(decisao === 'aprovado'
    ? 'Aprovado. A peça entra na fila de publicação.'
    : 'Pedido registrado. Voltamos com a nova versão.');
  else fecha('Não consegui registrar. Chama a gente no WhatsApp.');
}}
document.getElementById('b-ok').onclick = () => manda('aprovado', null);
document.getElementById('b-nao').onclick = () =>
  document.getElementById('cx-nao').classList.remove('oculto');
document.getElementById('b-enviar').onclick = () =>
  manda('refazer', document.getElementById('txt').value.trim());
</script>
</body></html>"""


def html_portal(estado):
    spec = estado["spec"]
    imgs = "".join(
        f'<img src="/pecas/{estado["id"]}/png/{i + 1}" alt="Slide {i + 1}" loading="lazy">'
        for i in range(len(estado["slides"])))
    pontos = "".join(
        f'<span class="ponto{" on" if i == 0 else ""}"></span>'
        for i in range(len(estado["slides"])))
    esc = lambda s: (s or "").replace("&", "&amp;").replace("<", "&lt;")
    return PORTAL.format(
        titulo=esc(estado["titulo"]), cliente=esc(estado["cliente"]),
        n=len(estado["slides"]), data=estado["criado_em"][:10],
        handle=esc(spec.get("handle", "")),
        inicial=esc(spec.get("marca", "?")[:1].upper()),
        accent=spec["tokens"]["accent"], imagens=imgs, pontos=pontos,
        legenda=esc(estado.get("legenda", "")))


# ── rotas ─────────────────────────────────────────────────────────────────
class Alça(BaseHTTPRequestHandler):
    server_version = "EstudioExpansion/0.1"

    def log_message(self, formato, *args):
        print(f"{self.address_string()} {formato % args}", flush=True)

    def responde(self, codigo, corpo, tipo="application/json; charset=utf-8"):
        if isinstance(corpo, (dict, list)):
            corpo = json.dumps(corpo, ensure_ascii=False).encode()
        elif isinstance(corpo, str):
            corpo = corpo.encode()
        self.send_response(codigo)
        self.send_header("Content-Type", tipo)
        self.send_header("Content-Length", str(len(corpo)))
        self.end_headers()
        self.wfile.write(corpo)

    def corpo_json(self):
        n = int(self.headers.get("Content-Length", 0))
        return json.loads(self.rfile.read(n) or b"{}")

    # ── GET
    def do_GET(self):
        caminho = urlparse(self.path).path

        if caminho == "/saude":
            return self.responde(200, {"ok": True, "em": agora()})

        m = re.fullmatch(r"/pecas/([\w-]+)/png/(\d+)", caminho)
        if m:
            arq = deposito.caminho(m[1]) / "png" / f"slide_{int(m[2]):02d}.png"
            if not arq.exists():
                return self.responde(404, {"erro": "slide não encontrado"})
            return self.responde(200, arq.read_bytes(), "image/png")

        m = re.fullmatch(r"/pecas/([\w-]+)", caminho)
        if m:
            e = deposito.le(m[1])
            if not e:
                return self.responde(404, {"erro": "peça não encontrada"})
            return self.responde(200, {k: v for k, v in e.items() if k != "spec"})

        m = re.fullmatch(r"/a/([\w-]+)", caminho)
        if m:
            e = deposito.por_token(m[1])
            if not e:
                return self.responde(404, "Link inválido ou expirado.", "text/html; charset=utf-8")
            if e["expira_em"] < agora():
                return self.responde(410, "Link expirado. Peça um novo.", "text/html; charset=utf-8")
            return self.responde(200, html_portal(e), "text/html; charset=utf-8")

        return self.responde(404, {"erro": "rota desconhecida"})

    # ── POST
    def do_POST(self):
        caminho = urlparse(self.path).path

        if caminho == "/pecas":
            try:
                dados = self.corpo_json()
                spec = dados["spec"]
                peca_id = secrets.token_urlsafe(9)
                destino = deposito.caminho(peca_id)
                destino.mkdir(parents=True, exist_ok=True)
                slides = renderiza(spec, destino)
                estado = {
                    "id": peca_id,
                    "titulo": dados.get("titulo", "Carrossel"),
                    "cliente": dados.get("cliente", spec.get("marca", "")),
                    "template": spec.get("template", "expansion-01"),
                    "legenda": dados.get("legenda", ""),
                    "spec": spec,
                    "slides": slides,
                    "status": "revisao",
                    "token": secrets.token_urlsafe(16),
                    "expira_em": (datetime.now(timezone.utc) + timedelta(days=14)).isoformat(),
                    "aprovacoes": [],
                    "criado_em": agora(),
                }
                deposito.grava(peca_id, estado)
                return self.responde(201, {
                    "id": peca_id, "slides": slides, "status": "revisao",
                    "link_aprovacao": f"/a/{estado['token']}",
                })
            except Exception as e:  # noqa: BLE001
                return self.responde(400, {"erro": str(e)})

        m = re.fullmatch(r"/a/([\w-]+)", caminho)
        if m:
            e = deposito.por_token(m[1])
            if not e:
                return self.responde(404, {"erro": "link inválido"})
            if e["expira_em"] < agora():
                return self.responde(410, {"erro": "link expirado"})
            dados = self.corpo_json()
            decisao = dados.get("decisao")
            if decisao not in ("aprovado", "refazer"):
                return self.responde(400, {"erro": "decisão inválida"})
            e["aprovacoes"].append({
                "papel": "cliente", "quem": dados.get("quem", "cliente"),
                "decisao": decisao, "comentario": dados.get("comentario"),
                "em": agora(),
            })
            # O aceite do cliente é o que dispara a publicação. Nunca a geração.
            e["status"] = "aprovado" if decisao == "aprovado" else "recusado"
            deposito.grava(e["id"], e)
            return self.responde(200, {"status": e["status"]})

        return self.responde(404, {"erro": "rota desconhecida"})


if __name__ == "__main__":
    porta = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    print(f"Estúdio Expansion em http://0.0.0.0:{porta}", flush=True)
    ThreadingHTTPServer(("0.0.0.0", porta), Alça).serve_forever()
