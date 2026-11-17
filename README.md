# 金丽星服装定制小程序（询价版）

深圳市金丽星服装有限公司 · 原生微信小程序 · 询价演示版本

一个可直接导入微信开发者工具运行的原生小程序，主营工装、冲锋衣、衬衫、马甲、团体定制。当前为**询价版本**，未接入微信支付。

---

## 一、功能一览

| 页面 | 主要功能 |
|---|---|
| 首页 | 品牌栏、轮播横幅、服务亮点、5 大分类入口、热门商品、定制流程、联系我们入口 |
| 产品 | 顶部分类筛选、商品列表、询价引导 |
| 商品详情 | 主图、名称、价格、起订量、可选规格、可选尺码、报价与工艺说明、电话咨询、提交询价 |
| 询价 | 联系人姓名、手机号、定制数量、款式选择、上传图案/Logo（最多 3 张）、补充说明、表单校验、提交结果 |
| 关于我们 | 公司简介、企业数据、经营范围、工厂实拍、联系方式（一键拨打/复制）、提交询价入口 |

> **重要说明（演示版）**：询价单数据保存在**用户手机本地**（`wx.setStorageSync`），商家无法远程接收。这是按照"本地存储演示版"需求实现的。正式商用请接入云端（见第六节）。

---

## 二、导入微信开发者工具（部署步骤）

### 1. 准备工作
- 下载并安装 [微信开发者工具（稳定版）](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- 准备一个微信小程序 AppID（在 [微信公众平台](https://mp.weixin.qq.com/) 注册小程序后获得）。没有 AppID 也可选择"测试号"体验。

### 2. 导入项目
1. 打开微信开发者工具，点击 **"+" / 导入项目**。
2. 目录选择本仓库根目录（即包含 `project.config.json` 的文件夹 `jinlixing-apparel-miniprogram`）。
3. 填写 AppID：
   - 有 AppID：填入你自己的小程序 AppID；
   - 没有：选择"测试号"。
4. 项目名称可自定义，点击 **"导入"**。
5. 工具会自动编译，模拟器即可看到效果。

### 3. 常见问题
- **图片不显示**：确认 `assets/images/` 目录下图片文件完整（本仓库已包含全部占位图）。
- **tabBar 图标不显示**：确认 `assets/images/tab-*.png` 8 个图标存在。
- **真机预览**：点击工具栏"预览"，用微信扫码即可在手机上运行（需 AppID）。
- **上传发布**：点击"上传"填写版本号，再到微信公众平台提交审核。当前为询价演示版，发布前请先按第六节接入云端。

---

## 三、目录结构

```
jinlixing-apparel-miniprogram/
├── app.js                      # 全局逻辑、公司联系方式配置（contact）
├── app.json                    # 全局配置：页面注册、tabBar、窗口样式
├── app.wxss                    # 全局样式、品牌色（CSS 变量）
├── project.config.json         # 项目配置（导入工具用，需填自己的 AppID）
├── sitemap.json                # 站点地图
├── pages/
│   ├── index/                  # 首页
│   ├── products/               # 产品列表
│   ├── detail/                 # 商品详情
│   ├── inquiry/                # 询价表单
│   ├── result/                 # 提交结果
│   └── about/                  # 关于我们
├── utils/
│   ├── data.js                 # ★ 商品/分类数据模型（改这里增删商品）
│   └── inquiry-store.js        # ★ 询价单本地存储层（接云端时改这里）
├── assets/images/              # 全部图片素材（占位图，可替换真实照片）
├── gen_assets.py               # 生成占位图的脚本（可删除，不影响运行）
└── gen_tabicons.py             # 生成 tabBar 图标的脚本（可删除）
```

---

## 四、如何修改（常见需求）

### 1. 修改公司名称、电话、地址
编辑 `app.js` 中的 `globalData.contact` 对象，改一次全站（关于我们页、电话咨询）生效。

### 2. 增删商品 / 修改价格规格
编辑 `utils/data.js`：
- `categories` 数组：分类入口；
- `products` 数组：商品信息（名称、价格、起订量 `moq`、规格 `specs`、尺码 `sizes`、报价说明 `details`、是否热门 `hot`）。

### 3. 修改款式下拉选项
编辑 `pages/inquiry/inquiry.js` 中的 `styleOptions` 数组。

### 4. 替换真实图片
把 `assets/images/` 下的占位图替换成同名真实图片即可（保持文件名不变，或同步修改 `utils/data.js` / 页面中引用的路径）。
- 横幅：`banner-1/2/3.png`（建议 900×380）
- 分类：`cat-*.png`
- 商品：`prod-*.png`
- 工厂：`factory-1/2/3.png`
- Logo：`logo.png`

### 5. 修改品牌配色
编辑 `app.wxss` 顶部的 CSS 变量（`--brand`、`--accent` 等），以及各页面 WXSS 中硬编码的品牌色（如 `#204e8a`、`#e8833a`）。

### 6. 清空演示中提交的询价数据
在开发者工具控制台，或代码中调用 `require('utils/inquiry-store.js').clear()`。

---

## 五、技术说明

- **框架**：微信原生小程序（WXML + WXSS + JS），无第三方框架、无 npm 依赖。
- **数据存储**：本地存储 `wx.storage`，图片通过 `wx.saveFile` 持久化。
- **图片上传**：`wx.chooseMedia` 选择 → `wx.previewImage` 预览 → `wx.saveFile` 持久化。
- **表单校验**：手机号正则、必填项、数量校验，错误逐字段提示。
- **无微信支付**：本项目不含任何支付能力。

---

## 六、正式商用：接入云端（后续可扩展）

当前询价数据只在用户本机。若要让商家真正收到询盘，推荐接入**微信云开发**：

1. 在微信开发者工具中开通"云开发"，获得环境 ID（env）。
2. 创建云数据库集合，例如 `inquiries`。
3. 修改 `utils/inquiry-store.js`：
   - `add()` 改为 `wx.cloud.database().collection('inquiries').add({ data: inquiry })`；
   - `list()` 改为数据库查询；
   - 图片改用 `wx.cloud.uploadFile` 上传到云存储，`fileID` 存入数据库。
4. 在 `app.js` 的 `onLaunch` 中调用 `wx.cloud.init({ env: '你的环境ID' })`。

由于数据流都封装在 `utils/inquiry-store.js`，页面代码（`pages/inquiry/inquiry.js`）无需改动，替换数据层即可平滑上云。

---

## 七、代码注释

所有源码文件均带有中文注释，说明每个模块/函数的用途与修改点，重点关注带 `★` 标记的文件。`gen_*.py` 仅用于生成本地占位图，可安全删除，不影响小程序运行。

---

© 深圳市金丽星服装有限公司
