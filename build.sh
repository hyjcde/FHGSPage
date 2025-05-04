#!/bin/bash

# 确保构建目录存在
mkdir -p ./public/images/paper

# 复制所有静态资源
cp *.html ./public/
cp *.js ./public/
cp *.css ./public/
cp -r images/paper/*.png ./public/images/paper/

echo "Build completed successfully!" 