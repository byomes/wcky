#!/usr/bin/env python3
"""Generate public/images/og-meet.png — dark bg, circular headshot left, gold divider."""

from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).parent.parent
SRC_HEADSHOT = ROOT / "public/images/Bill-CR.png"
OUT = ROOT / "public/images/og-meet.png"

W, H = 1200, 630

BG = (15, 14, 13)
GOLD_BRIGHT = (218, 163, 59)   # top border
GOLD_MID    = (137, 104, 40)   # vertical divider
GOLD_DIM    = (86,  66,  29)   # bottom border

DIVIDER_X   = 570              # 2px wide: x=570,571
BORDER_PX   = 3                # top / bottom border thickness

# Headshot: center (279, 315), diameter 420
HS_CX, HS_CY = 279, 315
HS_D = 420
HS_X = HS_CX - HS_D // 2      # 69
HS_Y = HS_CY - HS_D // 2      # 105

img = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

# ── top gold border (left half only) ─────────────────────────────────────────
draw.rectangle([0, 0, DIVIDER_X + 1, BORDER_PX - 1], fill=GOLD_BRIGHT)

# ── bottom gold border (left half only) ──────────────────────────────────────
draw.rectangle([0, H - BORDER_PX, DIVIDER_X + 1, H - 1], fill=GOLD_DIM)

# ── vertical gold divider ─────────────────────────────────────────────────────
draw.rectangle([DIVIDER_X, 0, DIVIDER_X + 1, H - 1], fill=GOLD_MID)

# ── circular headshot ────────────────────────────────────────────────────────
headshot_src = Image.open(SRC_HEADSHOT).convert("RGBA")
headshot = headshot_src.resize((HS_D, HS_D), Image.LANCZOS)
img.paste(headshot, (HS_X, HS_Y), mask=headshot.split()[3])

img.save(OUT, "PNG")
print(f"Saved {OUT}")
