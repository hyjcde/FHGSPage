#!/bin/bash

# 检查Python版本并启动相应的HTTP服务器
if command -v python3 &>/dev/null; then
    echo "使用 Python 3 启动服务器..."
    python3 -m http.server 8000
elif command -v python &>/dev/null; then
    # 检查Python版本
    PYTHON_VERSION=$(python --version 2>&1)
    if [[ $PYTHON_VERSION == *"Python 3"* ]]; then
        echo "使用 Python 3 启动服务器..."
        python -m http.server 8000
    else
        echo "使用 Python 2 启动服务器..."
        python -m SimpleHTTPServer 8000
    fi
else
    echo "未找到Python。请安装Python或使用其他HTTP服务器来托管网站。"
    exit 1
fi

echo "服务器已启动，请在浏览器中访问 http://localhost:8000" 