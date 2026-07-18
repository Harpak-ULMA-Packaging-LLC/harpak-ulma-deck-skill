#!/usr/bin/env python3
"""Regenerate the deck's colored raster assets from the committed masters.

The repo commits only the masters, to stay a small, reviewable source tree:
  - assets/icons/<name>-ink.png   : one monochrome master per icon
  - assets/glyphs/glyph-*.svg      : eight currentColor equipment glyph masters
  - assets/motif/scrim-*.png       : the two photo scrims

This script derives everything the deck build needs from those masters:
  - the six other icon colors (white, n600, red, red700, green, blue)
  - the glyph PNGs (ink for light surfaces, neutral for dark)
  - the recomposed glyph line-motif strips (dark and light)

Run it once after cloning, before building or rebuilding a deck:
    python scripts/render_assets.py
Opening the shipped template.pptx needs none of this: its images are embedded.

Dependencies: Pillow (icons, motif), cairosvg (glyphs).
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
ICONS = os.path.join(ROOT, "assets", "icons")
GLYPHS = os.path.join(ROOT, "assets", "glyphs")
GLYPH_PNG = os.path.join(ROOT, "assets", "glyph-png")
MOTIF = os.path.join(ROOT, "assets", "motif")

ICON_COLORS = {
    "white": (255, 255, 255), "n600": (91, 95, 100), "red": (220, 34, 10),
    "red700": (153, 21, 6), "green": (17, 83, 45), "blue": (35, 89, 128),
}
GLYPH_COLORS = {"ink": "#030303", "neutral": "#9BA1A7"}
GLYPH_ORDER = ["weigher", "thermoformer", "tray-sealer", "robot", "case-packer", "palletizer"]


def render_icons():
    from PIL import Image
    masters = [f for f in os.listdir(ICONS) if f.endswith("-ink.png")]
    made = 0
    for m in masters:
        name = m[:-len("-ink.png")]
        base = Image.open(os.path.join(ICONS, m)).convert("RGBA")
        alpha = base.getchannel("A")
        for suffix, rgb in ICON_COLORS.items():
            out = Image.new("RGBA", base.size, rgb + (0,))
            solid = Image.new("RGBA", base.size, rgb + (255,))
            out = Image.composite(solid, out, alpha)
            out.save(os.path.join(ICONS, f"{name}-{suffix}.png"))
            made += 1
    return len(masters), made


def render_glyphs():
    import cairosvg
    os.makedirs(GLYPH_PNG, exist_ok=True)
    made = 0
    for f in sorted(os.listdir(GLYPHS)):
        if not f.endswith(".svg"):
            continue
        name = f[len("glyph-"):-len(".svg")]
        src = open(os.path.join(GLYPHS, f)).read()
        if re.search(r"#[0-9A-Fa-f]{3,6}", src):
            raise SystemExit(f"ERROR: baked hex in glyph master {f}; glyphs must be currentColor")
        m = re.search(r'viewBox="0 0 (\d+) (\d+)"', src)
        w, h = int(m.group(1)), int(m.group(2))
        for cname, col in GLYPH_COLORS.items():
            svg = src.replace("<svg ", f'<svg color="{col}" ', 1)
            cairosvg.svg2png(bytestring=svg.encode(), write_to=os.path.join(GLYPH_PNG, f"{name}-{cname}.png"),
                             output_width=w * 3, output_height=h * 3)
            made += 1
    return made


def render_motif():
    from PIL import Image
    SCALE = 4
    CANVAS_H, BASELINE, GAP = 64 * SCALE, 60 * SCALE, 20 * SCALE
    ring_path = os.path.join(ROOT, "assets", "logos", "aura-ring.png")

    def strip(colname):
        glyphs = [(g, Image.open(os.path.join(GLYPH_PNG, f"{g}-{colname}.png")).convert("RGBA")) for g in GLYPH_ORDER]
        ring = Image.open(ring_path).convert("RGBA")
        ring.thumbnail((int(46 * SCALE), int(46 * SCALE)))
        total_w = sum(im.size[0] for _, im in glyphs) + GAP * len(glyphs) + ring.size[0] + GAP
        s = Image.new("RGBA", (total_w, CANVAS_H), (0, 0, 0, 0))
        x = 0
        for _, im in glyphs:
            s.paste(im, (x, 0), im)
            x += im.size[0] + GAP
        ry = (BASELINE - int(14 * SCALE)) - ring.size[1]
        s.paste(ring, (x, ry), ring)
        bbox = s.getbbox()
        return s.crop((0, 0, bbox[2], CANVAS_H))

    strip("neutral").save(os.path.join(MOTIF, "glyph-motif-dark.png"))
    strip("ink").save(os.path.join(MOTIF, "glyph-motif-light.png"))
    return 2


if __name__ == "__main__":
    n_masters, n_icons = render_icons()
    n_glyphs = render_glyphs()
    n_motif = render_motif()
    print(f"icons: {n_icons} colored variants from {n_masters} masters")
    print(f"glyphs: {n_glyphs} PNGs from {len(GLYPH_ORDER) + 2} SVG masters")
    print(f"motif: {n_motif} strips composed")
    print("done. colored icons, glyph PNGs, and motif strips regenerated.")
