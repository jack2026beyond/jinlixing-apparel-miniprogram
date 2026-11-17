# 推送到 GitHub 操作指南

代码已全部开发完成并在本地提交好（61 个文件，1 个 commit）。由于当前 WorkBuddy 环境连接的 GitHub 是 Copilot 只读集成，没有建仓/推送权限，因此需要你在本地执行一步推送。下面提供 **3 种方式**，任选其一，从最简单到最灵活。

---

## 方式一：一键脚本（推荐，最简单）

### 前置：安装 GitHub CLI（一次性）
1. 打开 https://cli.github.com/
2. 下载 Windows 安装包（`.exe`），双击安装，一路默认即可。
3. 安装完成后**重启 WorkBuddy**（或确保终端能识别 `gh` 命令）。

### 执行推送
1. 打开文件夹 `jinlixing-apparel-miniprogram`。
2. **双击 `push-to-github.bat`**（Windows）或在 Git Bash 中运行 `./push-to-github.sh`。
3. 首次运行会提示在浏览器登录 GitHub —— 按提示完成授权（勾选默认权限即可）。
4. 脚本会自动：创建仓库 → 设置远程 → 推送全部代码。

✅ 完成后输出：
```
推送成功！
仓库地址：https://github.com/jack2026beyond/jinlixing-apparel-miniprogram
```

> 若提示"仓库已存在"，脚本会跳过创建、直接推送，不会产生冲突。

---

## 方式二：Personal Access Token（PAT）—— 无需安装软件

### 第 1 步：生成 Token
1. 打开 https://github.com/settings/tokens
2. 点击 **Generate new token** → **Generate new token (classic)**
3. 设置：
   - Note：随便填，如 `miniprogram-push`
   - Expiration：选 `90 days`
   - 勾选权限：**`repo`**（完整仓库权限，展开后全选）
4. 点击 **Generate token**，**复制生成的 token**（只显示一次，形如 `ghp_xxxx`）。

### 第 2 步：在 GitHub 网页建一个空仓库
1. 打开 https://github.com/new
2. Repository name：`jinlixing-apparel-miniprogram`
3. 选 **Public**
4. ⚠️ **不要勾选** README / .gitignore / license（保持空白）
5. 点击 **Create repository**

### 第 3 步：执行推送
在 `jinlixing-apparel-miniprogram` 文件夹中，打开 Git Bash，执行（把 `你的TOKEN` 换成刚才复制的）：

```bash
git remote add origin https://jack2026beyond:你的TOKEN@github.com/jack2026beyond/jinlixing-apparel-miniprogram.git
git branch -M main
git push -u origin main
```

推送成功后，建议立即删除远程 token 记录：
```bash
git remote set-url origin https://github.com/jack2026beyond/jinlixing-apparel-miniprogram.git
```
并到 https://github.com/settings/tokens 删除该 token（安全起见）。

---

## 方式三：Windows 凭据管理器（Git Credential Manager）

如果你的 Git 配置了 Windows 凭据管理器（`credential.helper=manager`，本机已配置），且曾登录过 GitHub：

1. 在 GitHub 网页按"方式二第 2 步"建好空仓库。
2. 在 `jinlixing-apparel-miniprogram` 文件夹打开 Git Bash：
```bash
git remote add origin https://github.com/jack2026beyond/jinlixing-apparel-miniprogram.git
git branch -M main
git push -u origin main
```
3. 弹出 GitHub 登录窗口时，用浏览器完成登录即可。

---

## 推送完成后

- 仓库地址：https://github.com/jack2026beyond/jinlixing-apparel-miniprogram
- 如需撤销远程推送：`git push origin --delete main`（谨慎操作）

## 为什么不能在 WorkBuddy 里直接推送？

当前会话连接的 GitHub 是 **GitHub Copilot 的只读集成**：
- 创建仓库返回 `403 Resource not accessible by integration`（无建仓权限）
- 重新授权后 token 失效（`unauthorized: token authentication failed`），且本轮无法再次重连

因此改为由你在本地用**自己的 GitHub 账号**推送。代码已 100% 准备就绪，只差这一步远程授权。所有页面、图片、注释、README 均已包含在待推送内容中。
