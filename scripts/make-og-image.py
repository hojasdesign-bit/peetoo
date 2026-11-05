#!/usr/bin/env python3
"""Genera public/og-image.png (1200x630) para las tarjetas al compartir peetoo.

La imagen es un PNG binario y NO se sube al repo (push-files solo acepta
texto): va solo en el despliegue. Este script la recrea desde cero con el
lenguaje del sitio (fondo oscuro + elipse violeta, Space Grotesk).
Uso:  python3 scripts/make-og-image.py   (desde ~/workspace/peetoo-app)
"""
import pathlib
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent

HTML = """<!doctype html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #101010; overflow: hidden;
    font-family: 'Space Grotesk', sans-serif; color: #fff; position: relative; }
  .glow { position: absolute; width: 900px; height: 900px; right: -260px; top: -420px;
    background: radial-gradient(circle, rgba(70, 8, 227, 0.55) 0%, rgba(70, 8, 227, 0) 65%); }
  .glow2 { position: absolute; width: 600px; height: 600px; left: -220px; bottom: -380px;
    background: radial-gradient(circle, rgba(70, 8, 227, 0.28) 0%, rgba(70, 8, 227, 0) 65%); }
  .content { position: relative; height: 100%; padding: 84px 96px;
    display: flex; flex-direction: column; justify-content: center; }
  .kicker { display: flex; align-items: center; gap: 12px;
    font-size: 28px; font-weight: 500; letter-spacing: 6px; text-transform: uppercase; color: #b9a5f5; }
  .kicker .dot { width: 14px; height: 14px; border-radius: 50%; background: #4608e3; }
  h1 { font-size: 168px; font-weight: 700; line-height: 1; letter-spacing: -4px; margin: 28px 0 24px; }
  h1 span { color: #7a3cff; }
  .tag { font-size: 40px; font-weight: 500; color: #e8e8e8; }
  .sub { font-size: 28px; color: #9a9a9a; margin-top: 16px; }
</style></head>
<body>
  <div class="glow"></div><div class="glow2"></div>
  <div class="content">
    <div class="kicker"><span class="dot"></span>App P2P</div>
    <h1>peetoo<span>.</span></h1>
    <div class="tag">Compra y vende stablecoins entre personas</div>
    <div class="sub">USDT &middot; USDC &middot; EURC &middot; PYUSD &middot; Divisas</div>
  </div>
</body></html>"""

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1200, "height": 630}, device_scale_factor=2)
    pg.set_content(HTML)
    pg.wait_for_timeout(1200)
    pg.evaluate("() => document.fonts.ready")
    pg.wait_for_timeout(500)
    tmp = "/tmp/og-image-2x.png"
    pg.screenshot(path=tmp)
    pg.close()
    b.close()

im = Image.open(tmp).convert("RGB")
im = im.resize((1200, 630), Image.LANCZOS)
out = ROOT / "public" / "og-image.png"
im.save(out, optimize=True)
print(f"og-image.png: {out} {im.size} {out.stat().st_size // 1024} KB")
