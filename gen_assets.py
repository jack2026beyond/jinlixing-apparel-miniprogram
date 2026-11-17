# -*- coding: utf-8 -*-
"""
图片素材生成脚本（仅用于生成本地占位图，方便演示；正式上线时请替换为真实商品/工厂照片）
运行方式：python gen_assets.py
生成内容：轮播横幅、分类入口、热门商品、工厂实拍、 Logo
输出目录：assets/images/
"""
from PIL import Image, ImageDraw, ImageFont
import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets", "images")
os.makedirs(OUT, exist_ok=True)

FONT = "/c/Windows/Fonts/msyh.ttc"
FONT_BD = "/c/Windows/Fonts/msyhbd.ttc"


def font(size, bold=False):
    return ImageFont.truetype(FONT_BD if bold else FONT, size)


def lerp(a, b, t):
    return int(a + (b - a) * t)


def gradient(w, h, c1, c2, vertical=True):
    """线性渐变背景"""
    img = Image.new("RGB", (w, h))
    px = img.load()
    for i in range(h if vertical else w):
        t = i / (h - 1 if vertical else w - 1)
        r = lerp(c1[0], c2[0], t)
        g = lerp(c1[1], c2[1], t)
        b = lerp(c1[2], c2[2], t)
        for j in range(w if vertical else h):
            if vertical:
                px[j, i] = (r, g, b)
            else:
                px[i, j] = (r, g, b)
    return img


def center_text(draw, box, text, fnt, fill):
    x0, y0, x1, y1 = box
    bbox = draw.textbbox((0, 0), text, font=fnt)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = x0 + (x1 - x0 - tw) / 2
    y = y0 + (y1 - y0 - th) / 2 - bbox[1]
    draw.text((x, y), text, font=fnt, fill=fill)


def save(img, name):
    img.save(os.path.join(OUT, name), "PNG")
    print("generated:", name)


# ---------------- 品牌配色 ----------------
NAVY = (23, 42, 79)
BLUE = (32, 78, 138)
STEEL = (44, 96, 148)
ORANGE = (232, 131, 58)
LIGHT = (245, 248, 252)
WHITE = (255, 255, 255)
GRAY = (110, 122, 140)


# ---------------- 轮播横幅 ----------------
def banner(name, c1, c2, tag, title, sub):
    w, h = 900, 380
    img = gradient(w, h, c1, c2, vertical=False)
    d = ImageDraw.Draw(img, "RGBA")
    # 装饰圆形
    d.ellipse([w - 280, -120, w + 60, 220], fill=(255, 255, 255, 22))
    d.ellipse([w - 180, 120, w + 120, 420], fill=(255, 255, 255, 16))
    d.rounded_rectangle([60, 70, 250, 118], radius=24, fill=(255, 255, 255, 40))
    d.text((80, 79), tag, font=font(26, True), fill=WHITE)
    d.text((62, 150), title, font=font(66, True), fill=WHITE)
    d.text((66, 245), sub, font=font(30), fill=(235, 242, 250))
    d.rounded_rectangle([66, 305, 250, 355], radius=25, fill=ORANGE)
    center_text(d, (66, 305, 250, 355), "立即咨询 >", font(26, True), WHITE)
    save(img, name)


banner("banner-1.png", NAVY, BLUE, "专业团体定制", "品质工装 · 团队形象", "量身打造 · 免费设计 · 全国发货")
banner("banner-2.png", (26, 62, 92), STEEL, "多品类覆盖", "冲锋衣 · 衬衫 · 马甲", "一站式采购 · 来图来样定制")
banner("banner-3.png", (30, 52, 96), (46, 88, 150), "厂家直供", "来图定制 · 快速打样", "小单可做 · 交期保障 · 售后无忧")


# ---------------- 服装简笔图标 ----------------
def draw_shirt(d, cx, cy, s, color, outline=(255, 255, 255)):
    """画一件上衣轮廓"""
    pts = [
        (cx - 0.30 * s, cy - 0.45 * s),
        (cx - 0.62 * s, cy - 0.28 * s),
        (cx - 0.48 * s, cy - 0.05 * s),
        (cx - 0.36 * s, cy - 0.12 * s),
        (cx - 0.36 * s, cy + 0.55 * s),
        (cx + 0.36 * s, cy + 0.55 * s),
        (cx + 0.36 * s, cy - 0.12 * s),
        (cx + 0.48 * s, cy - 0.05 * s),
        (cx + 0.62 * s, cy - 0.28 * s),
        (cx + 0.30 * s, cy - 0.45 * s),
        (cx + 0.12 * s, cy - 0.36 * s),
        (cx - 0.12 * s, cy - 0.36 * s),
    ]
    d.polygon(pts, fill=color)
    d.line(pts + [pts[0]], fill=outline, width=max(2, int(s * 0.02)), joint="curve")
    # 领口
    d.arc([cx - 0.14 * s, cy - 0.5 * s, cx + 0.14 * s, cy - 0.24 * s], 0, 180, fill=outline, width=max(2, int(s * 0.02)))


def draw_vest(d, cx, cy, s, color, outline=(255, 255, 255)):
    pts = [
        (cx - 0.26 * s, cy - 0.48 * s),
        (cx - 0.50 * s, cy - 0.34 * s),
        (cx - 0.40 * s, cy - 0.05 * s),
        (cx - 0.32 * s, cy - 0.12 * s),
        (cx - 0.32 * s, cy + 0.55 * s),
        (cx + 0.32 * s, cy + 0.55 * s),
        (cx + 0.32 * s, cy - 0.12 * s),
        (cx + 0.40 * s, cy - 0.05 * s),
        (cx + 0.50 * s, cy - 0.34 * s),
        (cx + 0.26 * s, cy - 0.48 * s),
    ]
    d.polygon(pts, fill=color)
    d.line(pts + [pts[0]], fill=outline, width=max(2, int(s * 0.02)), joint="curve")


# ---------------- 分类入口图 ----------------
def cat(name, c1, c2, label, kind="shirt", color=(255, 255, 255)):
    w = h = 240
    img = gradient(w, h, c1, c2)
    d = ImageDraw.Draw(img, "RGBA")
    d.ellipse([-40, -40, 150, 150], fill=(255, 255, 255, 18))
    if kind == "vest":
        draw_vest(d, 120, 100, 110, color)
    else:
        draw_shirt(d, 120, 105, 120, color)
    d.rounded_rectangle([0, h - 64, w, h], fill=(0, 0, 0, 40))
    center_text(d, (0, h - 64, w, h), label, font(30, True), WHITE)
    save(img, name)


cat("cat-workwear.png", NAVY, BLUE, "工装")
cat("cat-jacket.png", (33, 60, 92), STEEL, "冲锋衣")
cat("cat-shirt.png", (52, 92, 120), (96, 140, 160), "衬衫")
cat("cat-vest.png", (36, 70, 88), (70, 110, 120), "马甲", "vest")
cat("cat-custom.png", ORANGE, (200, 96, 40), "定制打样")


# ---------------- 热门商品图 ----------------
def product(name, c1, c2, label, sub, kind="shirt"):
    w = h = 480
    img = gradient(w, h, c1, c2)
    d = ImageDraw.Draw(img, "RGBA")
    d.ellipse([w - 200, -80, w + 80, 200], fill=(255, 255, 255, 16))
    d.ellipse([-90, h - 200, 120, h + 40], fill=(255, 255, 255, 12))
    garment = (238, 244, 250) if kind != "custom" else (255, 240, 220)
    if kind == "vest":
        draw_vest(d, 240, 215, 300, garment)
    else:
        draw_shirt(d, 240, 220, 320, garment)
    d.rectangle([0, h - 120, w, h], fill=(0, 0, 0, 55))
    d.text((28, h - 108), label, font=font(38, True), fill=WHITE)
    d.text((30, h - 56), sub, font=font(24), fill=(225, 235, 245))
    save(img, name)


product("prod-workwear.png", NAVY, BLUE, "经典工装套装", "耐磨面料 · 多口袋设计", "shirt")
product("prod-jacket.png", (28, 58, 92), STEEL, "三合一冲锋衣", "防风防水 · 可拆卸内胆", "shirt")
product("prod-shirt.png", (60, 100, 128), (110, 150, 170), "商务免烫衬衫", "挺括有型 · 可绣LOGO", "shirt")
product("prod-vest.png", (34, 68, 86), (72, 112, 122), "多功能工装马甲", "多口袋 · 反光条设计", "vest")
product("prod-custom.png", (196, 92, 40), ORANGE, "企业团体定制", "来图来样 · 免费打样", "custom")
product("prod-polo.png", (40, 78, 100), (86, 130, 146), "定制POLO衫", "透气舒适 · 团队首选", "shirt")


# ---------------- 工厂实拍（示意插画） ----------------
def factory(name, c1, c2, label, caption):
    w, h = 720, 460
    img = gradient(w, h, c1, c2)
    d = ImageDraw.Draw(img, "RGBA")
    # 地面
    d.rectangle([0, int(h * 0.62), w, h], fill=(255, 255, 255, 18))
    # 窗户
    for i in range(4):
        x = 60 + i * 160
        d.rectangle([x, 60, x + 110, 210], fill=(200, 228, 245, 55), outline=(255, 255, 255, 60), width=3)
        d.line([x + 55, 60, x + 55, 210], fill=(255, 255, 255, 50), width=2)
    # 缝纫机/工作台示意
    for i in range(3):
        x = 90 + i * 210
        d.rounded_rectangle([x, 300, x + 160, 330], radius=8, fill=(255, 255, 255, 70))
        d.rectangle([x + 20, 330, x + 28, 400], fill=(255, 255, 255, 50))
        d.rectangle([x + 132, 330, x + 140, 400], fill=(255, 255, 255, 50))
        d.rectangle([x + 60, 250, x + 110, 300], fill=(255, 255, 255, 60))
    d.rectangle([0, h - 92, w, h], fill=(0, 0, 0, 55))
    d.text((28, h - 84), label, font=font(36, True), fill=WHITE)
    d.text((30, h - 38), caption, font=font(22), fill=(225, 235, 245))
    save(img, name)


factory("factory-1.png", (30, 52, 84), (48, 82, 120), "生产车间", "整洁有序的现代化生产线")
factory("factory-2.png", (36, 64, 96), (60, 100, 138), "裁剪工艺", "精准裁剪 · 严控每道工序")
factory("factory-3.png", (28, 58, 78), (56, 96, 110), "成衣质检", "每件成衣都经过严格检验")


# ---------------- Logo ----------------
def logo():
    w = h = 240
    img = gradient(w, h, NAVY, BLUE)
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([16, 16, w - 16, h - 16], radius=30, outline=ORANGE, width=6)
    center_text(d, (0, 40, w, 130), "金丽星", font(58, True), WHITE)
    center_text(d, (0, 140, w, 190), "JINLIXING", font(26, True), ORANGE)
    center_text(d, (0, 186, w, 220), "服装定制", font(20), (220, 230, 242))
    save(img, "logo.png")


logo()
print("ALL DONE ->", OUT)
