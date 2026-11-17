# -*- coding: utf-8 -*-
"""生成 tabBar 图标（默认灰色 + 选中蓝色两种状态）"""
from PIL import Image, ImageDraw
import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets", "images")
os.makedirs(OUT, exist_ok=True)
GRAY = (153, 153, 153)
BLUE = (32, 78, 138)


def icon(path, kind, color):
    s = 81
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    c = color
    if kind == "home":
        d.polygon([(40, 12), (70, 38), (62, 38), (62, 68), (46, 68), (46, 48),
                   (34, 48), (34, 68), (18, 68), (18, 38), (10, 38)], fill=c)
    elif kind == "product":
        d.rounded_rectangle([16, 18, 65, 64], radius=5, outline=c, width=5)
        d.line([16, 32, 65, 32], fill=c, width=5)
        d.line([34, 18, 34, 64], fill=c, width=4)
    elif kind == "inquiry":
        d.rounded_rectangle([14, 12, 67, 60], radius=6, outline=c, width=5)
        d.polygon([(24, 58), (24, 72), (40, 58)], fill=c)
        d.line([26, 30, 56, 30], fill=c, width=4)
        d.line([26, 42, 48, 42], fill=c, width=4)
    elif kind == "about":
        d.ellipse([28, 12, 53, 37], outline=c, width=5)
        d.ellipse([14, 44, 67, 82], outline=c, width=5)
    img.save(path, "PNG")
    print("generated:", path)


for kind in ["home", "product", "inquiry", "about"]:
    icon(os.path.join(OUT, "tab-%s.png" % kind), kind, GRAY)
    icon(os.path.join(OUT, "tab-%s-on.png" % kind), kind, BLUE)
print("tab icons done")
