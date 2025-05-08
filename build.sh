#!/bin/bash

# 清理旧的输出目录
rm -rf .vercel/output/static
echo "Cleaned old output directory"

# 确保Vercel输出目录存在
mkdir -p .vercel/output/static/images/paper
echo "Created output directory structure"

# 复制所有静态资源到Vercel输出目录
cp *.html .vercel/output/static/
cp *.js .vercel/output/static/
cp *.css .vercel/output/static/
cp -r images/paper/*.png .vercel/output/static/images/paper/
echo "Copied all static resources"

# 设置正确的文件权限
chmod -R 755 .vercel/output/static
chmod -R 644 .vercel/output/static/*.html .vercel/output/static/*.js .vercel/output/static/*.css .vercel/output/static/images/paper/*.png
echo "Set file permissions"

# 创建Vercel配置文件
cat > .vercel/output/config.json << EOL
{
  "version": 3,
  "routes": [
    { 
      "src": "/images/paper/.*",
      "headers": { "cache-control": "public, max-age=31536000, immutable" }
    },
    { "handle": "filesystem" }
  ]
}
EOL
echo "Created Vercel config file"

# 创建验证文件
echo "Deployment check file. If you can see this, the static files deployment is working." > .vercel/output/static/check.txt
echo "Images should be available at /images/paper/ directory." >> .vercel/output/static/check.txt
echo "Created verification file"

# 复制images目录到根目录，以支持相对路径
mkdir -p .vercel/output/static/
cp -r images .vercel/output/static/
echo "Copied images directory to root level"

echo "Build completed successfully for Vercel deployment!" 