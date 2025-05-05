#!/bin/bash

# 确保Vercel输出目录存在
mkdir -p .vercel/output/static/images/paper

# 复制所有静态资源到Vercel输出目录
cp *.html .vercel/output/static/
cp *.js .vercel/output/static/
cp *.css .vercel/output/static/
cp -r images/paper/*.png .vercel/output/static/images/paper/

# 创建Vercel配置文件
cat > .vercel/output/config.json << EOL
{
  "version": 3,
  "routes": [
    {
      "handle": "filesystem"
    }
  ]
}
EOL

echo "Build completed successfully for Vercel deployment!" 