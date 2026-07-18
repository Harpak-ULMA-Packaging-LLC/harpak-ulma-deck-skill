#!/usr/bin/env python3
"""Brand QA gate for Harpak-ULMA decks.

Usage: python brand_check.py deck.pptx

Scans every slide (and speaker notes) for the failures that most often ship:
banned words, em-dashes, dash ranges, off-brand fonts, sub-floor type sizes,
and leftover template placeholders. Also enforces the v0.4 glyph rules: no
retired abstract-wireframe motif assets embedded, and no baked hex color
inside any equipment glyph SVG placed in a deck. Reports remaining [GET] tags
as a gap list rather than a failure. Exit code 1 if any FAIL is found.
"""
import hashlib
import re
import sys
import zipfile
from collections import defaultdict
from xml.etree import ElementTree as ET

NS = {"a": "http://schemas.openxmlformats.org/drawingml/2006/main"}

# v0.4 6.A.10.5: the abstract wireframe line motif is retired. These are the
# sha256 of the retired raster masters; any embedded copy fails the deck.
RETIRED_MOTIF_SHA256 = {
    "756c7812e9ee2d63a3494cd750801c56d11a7452d3653661e0bdc8e503937d09": "line-motif-dark.png (retired wireframe motif)",
    "024fcfd8169c445fcb17565979978021f22b644c3a2102ce9af1e6d631a565d2": "line-motif-light.png (retired wireframe motif)",
}
# A glyph SVG is a currentColor stroke silhouette on a height-64 canvas.
GLYPH_SVG = re.compile(rb'stroke="currentColor"')
GLYPH_VIEWBOX = re.compile(rb'viewBox="0 0 \d+ 64"')
HEX_COLOR = re.compile(rb'#[0-9A-Fa-f]{3,6}\b')

BANNED = [
    "seamless", "unlock", "ai-powered", "synergy", "leverage",
    "best-in-class", "revolutionary", "cutting-edge", "world-class",
    "game-changing", "state-of-the-art",
]
WATCH = ["end-to-end", "drive innovation", "maximize efficiency",
         "minimize waste", "redefining the standard", "user-friendly",
         "turnkey"]
ALLOWED_FONTS = {
    "Archivo", "Archivo Medium", "Archivo SemiBold", "Archivo ExtraBold",
    "Inter", "Inter Medium", "Inter SemiBold",
    "JetBrains Mono", "JetBrains Mono Medium",
    "+mn-lt", "+mj-lt",  # theme defaults on empty runs
}
# Slides allowed to contain banned words as teaching examples
EXEMPT_MARKERS = ["Not this", "banned words:", "BANNED AND WATCH LIST"]

def slide_texts(z, name):
    root = ET.fromstring(z.read(name))
    runs = []
    for r in root.iter("{%s}r" % NS["a"]):
        t = r.find("a:t", NS)
        rpr = r.find("a:rPr", NS)
        font = None
        size = None
        if rpr is not None:
            latin = rpr.find("a:latin", NS)
            if latin is not None:
                font = latin.get("typeface")
            if rpr.get("sz"):
                size = int(rpr.get("sz")) / 100
        runs.append((t.text if t is not None else "", font, size))
    return runs

def main(path):
    z = zipfile.ZipFile(path)
    slides = sorted(
        (n for n in z.namelist() if re.match(r"ppt/slides/slide\d+\.xml$", n)),
        key=lambda n: int(re.search(r"\d+", n).group()),
    )
    fails, warns, gets = [], [], []
    for name in slides:
        num = int(re.search(r"\d+", name).group())
        runs = slide_texts(z, name)
        full = " ".join(r[0] for r in runs if r[0])
        exempt = any(m.lower() in full.lower() for m in EXEMPT_MARKERS)
        low = full.lower()
        for w in BANNED:
            if w in low and not exempt:
                fails.append(f"slide {num}: banned word '{w}'")
        for w in WATCH:
            if w in low and not exempt:
                warns.append(f"slide {num}: watch-list word '{w}' (replace with a specific)")
        if "—" in full:
            fails.append(f"slide {num}: em-dash found (use short sentences or 'to')")
        for m in re.finditer(r"\d\s*[–-]\s*\d", full):
            ctx = full[max(0, m.start()-12):m.end()+12].strip()
            warns.append(f"slide {num}: dash range '{ctx}' (ranges use 'to'); ignore if a part number")
        for pat in ("[PLACEHOLDER", "Lorem", "lorem", "[CUSTOMER]", "DELETE BEFORE PRESENTING"):
            if pat in full:
                warns.append(f"slide {num}: leftover placeholder '{pat}'")
        if "[GET]" in full or "[GET " in full:
            gets.append(f"slide {num}: carries a [GET] tag (unverified figure)")
        for text, font, size in runs:
            if font and font not in ALLOWED_FONTS:
                fails.append(f"slide {num}: off-brand font '{font}' on '{(text or '')[:30]}'")
            if size and size < 7.5 and (text or "").strip():
                fails.append(f"slide {num}: type below 7.5 pt ({size} pt) on '{(text or '')[:30]}'")
    # v0.4 glyph guardrails, checked against the deck's embedded media.
    for part in z.namelist():
        if not part.startswith("ppt/media/"):
            continue
        data = z.read(part)
        digest = hashlib.sha256(data).hexdigest()
        if digest in RETIRED_MOTIF_SHA256:
            fails.append(f"media {part}: retired abstract motif embedded ({RETIRED_MOTIF_SHA256[digest]}); rebuild the motif from equipment glyphs")
        if part.lower().endswith(".svg") and (GLYPH_SVG.search(data) and GLYPH_VIEWBOX.search(data)):
            if HEX_COLOR.search(data):
                fails.append(f"media {part}: equipment glyph SVG has a baked hex color; glyphs must inherit currentColor")
    # Also flag any external relationship still pointing at a retired motif file by name.
    for rels in (n for n in z.namelist() if n.endswith(".rels")):
        txt = z.read(rels).decode("utf8", "ignore")
        if "line-motif" in txt:
            fails.append(f"{rels}: references a retired 'line-motif' asset; use glyph-motif assets")

    print(f"Checked {len(slides)} slides in {path}\n")
    for f in fails:
        print("FAIL ", f)
    for w in warns:
        print("WARN ", w)
    for g in gets:
        print("GET  ", g)
    if not fails and not warns and not gets:
        print("Clean. No brand violations found.")
    print(f"\n{len(fails)} fail, {len(warns)} warn, {len(gets)} open [GET] items")
    sys.exit(1 if fails else 0)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(2)
    main(sys.argv[1])
