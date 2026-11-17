@echo off
chcp 65001 >nul
REM ============================================================
REM 一键推送到 GitHub（推荐方式：使用 GitHub 官方 CLI）
REM 使用方法：
REM   1. 先安装 GitHub CLI：https://cli.github.com/ 下载 Windows 安装包并安装
REM   2. 双击本文件运行；首次会提示在浏览器登录 GitHub，按提示完成
REM   3. 脚本会自动创建仓库并把全部代码推送上去
REM ============================================================

echo ============================================
echo  金丽星小程序 - 一键推送到 GitHub
echo ============================================
echo.

cd /d "%~dp0"

where gh >nul 2>nul
if errorlevel 1 (
    echo [错误] 未检测到 GitHub CLI (gh)。
    echo 请先安装：https://cli.github.com/
    echo 安装后重新双击本文件。
    echo.
    pause
    exit /b 1
)

echo [1/4] 检查 GitHub 登录状态...
gh auth status
if errorlevel 1 (
    echo.
    echo 尚未登录，现在开始登录（会在浏览器打开授权页面）...
    gh auth login --web --git-protocol https --scopes "repo,workflow"
    if errorlevel 1 (
        echo [错误] 登录失败。
        pause
        exit /b 1
    )
)

echo.
echo [2/4] 创建远程仓库（如已存在会跳过）...
gh repo view jack2026beyond/jinlixing-apparel-miniprogram >nul 2>nul
if errorlevel 1 (
    gh repo create jinlixing-apparel-miniprogram --public --description "深圳市金丽星服装有限公司 - 原生微信小程序（工装团体定制·询价版）" --source=. --remote=origin
) else (
    echo 仓库已存在，仅设置远程地址...
    git remote remove origin 2>nul
    git remote add origin https://github.com/jack2026beyond/jinlixing-apparel-miniprogram.git
)

echo.
echo [3/4] 确保分支名为 main...
git branch -M main

echo.
echo [4/4] 推送代码...
git push -u origin main
if errorlevel 1 (
    echo [错误] 推送失败，请查看上方错误信息。
    pause
    exit /b 1
)

echo.
echo ============================================
echo  推送成功！
echo  仓库地址：https://github.com/jack2026beyond/jinlixing-apparel-miniprogram
echo ============================================
pause
