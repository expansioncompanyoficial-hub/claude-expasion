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

    loaded = page.evaluate(
        """() => document.fonts.check('900 92px Montserrat')
                && document.fonts.check('400 35px Poppins')"""
    )
    if not loaded:
        page.wait_for_timeout(3000)
        page.evaluate("() => document.fonts.ready")
        loaded = page.evaluate("() => document.fonts.check('900 92px Montserrat')")

    slides = page.locator(".slide")
    n = slides.count()
    for i in range(n):
        s = slides.nth(i)
        s.scroll_into_view_if_needed()
        page.wait_for_timeout(180)
        s.screenshot(path=str(out / f"slide_{i + 1:02d}.png"))

    box = slides.nth(0).bounding_box()
    browser.close()

print(f"{n} PNGs em {out}/  ·  slide medido: {int(box['width'])}x{int(box['height'])}  ·  fontes carregadas: {loaded}  ·  auto-fit aplicado")
