#!/bin/bash
# ============================================================
# 一键推送到 GitHub（方式一：GitHub 官方 CLI，自动建仓+推送）
# 前置：安装 GitHub CLI  https://cli.github.com/
# 用法：在 Git Bash 中运行  ./push-to-github.sh
# ============================================================
set -e
cd "$(dirname "$0")"

echo "============================================"
echo " 金丽星小程序 - 一键推送到 GitHub"
echo "============================================"

if ! command -v gh >/dev/null 2>&1; then
  echo "[错误] 未检测到 GitHub CLI (gh)，请先安装：https://cli.github.com/"
  exit 1
fi

echo "[1/4] 检查 GitHub 登录状态..."
if ! gh auth status >/dev/null 2>&1; then
  echo "尚未登录，开始浏览器登录..."
  gh auth login --web --git-protocol https --scopes "repo,workflow"
fi

echo "[2/4] 创建远程仓库（如已存在则仅设置远程地址）..."
if gh repo view jack2026beyond/jinlixing-apparel-miniprogram >/dev/null 2>&1; then
  git remote remove origin 2>/dev/null || true
  git remote add origin https://github.com/jack2026beyond/jinlixing-apparel-miniprogram.git
else
  gh repo create jinlixing-apparel-miniprogram --public \
    --description "深圳市金丽星服装有限公司 - 原生微信小程序（工装团体定制·询价版）" \
    --source=. --remote=origin
fi

echo "[3/4] 设置分支为 main..."
git branch -M main

echo "[4/4] 推送代码..."
git push -u origin main

echo ""
echo "============================================"
echo " 推送成功！"
echo " 仓库地址：https://github.com/jack2026beyond/jinlixing-apparel-miniprogram"
echo "============================================"
