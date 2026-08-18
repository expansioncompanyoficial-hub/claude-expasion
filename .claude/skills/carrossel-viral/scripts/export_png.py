#!/usr/bin/env python3
"""
Exporta cada .slide de um HTML como PNG 1080x1350 nativo.

    python3 export_png.py carrossel.html pasta_saida/

Captura no ELEMENTO, nunca no viewport — é isso que garante 1080x1350
exatos, sem clip nem resize. E espera document.fonts.ready de verdade,
porque timeout sozinho deixa o PNG sair com fonte de fallback.
"""
import os
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

# O Chromium do ambiente costuma ter build diferente do que o pacote pip espera.
# Apontar direto evita o "playwright install", que é proibido aqui.
CHROME = next(
    (c for c in ("/opt/pw-browsers/chromium",
                 "/opt/pw-browsers/chromium-1194/chrome-linux/chrome")
     if os.path.exists(c)),
    None,
)

html = Path(sys.argv[1]).resolve()
out = Path(sys.argv[2] if len(sys.argv) > 2 else "slides")
out.mkdir(parents=True, exist_ok=True)

with sync_playwright() as p:
    launch = {"args": ["--force-device-scale-factor=1"]}
    if CHROME:
        launch["executable_path"] = CHROME
    browser = p.chromium.launch(**launch)
    page = browser.new_page(viewport={"width": 1240, "height": 1420})
    page.goto(f"file://{html}", wait_until="networkidle")
    page.evaluate("() => document.fonts.ready")
    page.wait_for_timeout(1200)
    # o auto-fit roda depois das fontes; sem esperar por ele o PNG sai com
    # o tamanho pré-ajuste
    page.wait_for_function("() => window.__fitPronto === true", timeout=20000)

    # `document.fonts.check` mente para o que importa aqui: ele responde sobre a
    # família, não sobre o texto que vai ser desenhado. Com um subconjunto que
    # não tem A-Z ele devolve True e o PNG sai numa fonte de sistema. Então a
    # conferência é por medida: desenha a mesma frase com a fonte pedida e com
    # uma pilha de fallback puro. Se a largura bater, a fonte não está valendo.
    fontes = page.evaluate(
        """() => {
            const alvos = [...document.querySelectorAll('.capa-h1,.h1,.corpo')];
            const vistos = new Map();
            for (const el of alvos) {
              const c = getComputedStyle(el);
              const fam = c.fontFamily.split(',')[0].replace(/['"]/g, '').trim();
              const chave = fam + '/' + c.fontWeight;
              if (vistos.has(chave)) continue;
              const p = document.createElement('span');
              p.textContent = 'Handgloves 123 ABCDEFGH';
              p.style.cssText = 'position:absolute;visibility:hidden;white-space:pre;'
                + 'font-size:100px;font-weight:' + c.fontWeight;
              document.body.appendChild(p);
              p.style.fontFamily = "'" + fam + "', __sem_fonte__, monospace";
              const comFonte = p.getBoundingClientRect().width;
              p.style.fontFamily = '__sem_fonte__, monospace';
              const semFonte = p.getBoundingClientRect().width;
              p.remove();
              vistos.set(chave, Math.abs(comFonte - semFonte) > 0.5);
            }
            return [...vistos.entries()].map(([k, ok]) => k + (ok ? '' : ' NAO APLICADA'));
        }"""
    )
    falhas = [f for f in fontes if 'NAO APLICADA' in f]
    loaded = not falhas

    slides = page.locator(".slide")
    n = slides.count()
    for i in range(n):
        s = slides.nth(i)
        s.scroll_into_view_if_needed()
        page.wait_for_timeout(180)
        s.screenshot(path=str(out / f"slide_{i + 1:02d}.png"))

    box = slides.nth(0).bounding_box()
    browser.close()

print(f"{n} PNGs em {out}/  ·  slide medido: {int(box['width'])}x{int(box['height'])}"
      f"  ·  fontes: {' · '.join(fontes)}  ·  auto-fit aplicado")
if falhas:
    raise SystemExit(
        "\nA fonte não foi aplicada em: " + " · ".join(falhas) + "\n"
        "Os PNGs saíram numa fonte de sistema. Causa quase sempre a mesma: o "
        ".woff2 `latin-ext` foi embutido sem o `latin` do lado, e aí não existe "
        "glifo para A-Z. Acrescente os dois no spec e rode de novo."
    )
