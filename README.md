# FHGS: Feature-Homogenized Gaussian Splatting

这是 FHGS（Feature-Homogenized Gaussian Splatting）论文的项目网站源代码。

## 网站内容

这个网站展示了 FHGS 的研究成果，包括：

- 论文摘要
- 方法介绍
- 实验结果展示
- 代码和数据集链接

## 本地运行

要在本地运行这个网站，可以使用以下方法：

1. 克隆仓库：
   ```
   git clone https://github.com/yourusername/FHGSPage.git
   cd FHGSPage
   ```

2. 使用任何 HTTP 服务器托管网站，例如 Python 的内置服务器：
   ```
   # 如果你有 Python 3
   python3 -m http.server
   
   # 如果你有 Python 2
   python -m SimpleHTTPServer
   ```

3. 在浏览器中访问 `http://localhost:8000`

4. 或者使用提供的启动脚本：
   ```
   ./start_server.sh
   ```

## Vercel部署

本项目已配置为可以直接部署到Vercel。按照以下步骤进行部署：

1. 在[Vercel](https://vercel.com/)上创建账户

2. 安装Vercel CLI（可选）：
   ```
   npm install -g vercel
   ```

3. 使用Vercel CLI部署（可选）：
   ```
   vercel login
   vercel
   ```

4. 或者直接通过GitHub集成部署：
   - 将代码推送到GitHub仓库
   - 在Vercel控制台中导入该仓库
   - Vercel会自动识别项目类型并部署

5. 设置自定义域名（可选）：
   - 在Vercel控制台中找到项目
   - 选择"Settings" > "Domains"
   - 添加您的自定义域名

## 网站结构

- `index.html` - 主页面
- `style.css` - 样式表
- `script.js` - JavaScript 交互脚本
- `images/` - 图片目录
- `vercel.json` - Vercel部署配置

## 使用自定义图片

要替换网站上的图片，请将你的图片文件放入 `images/` 目录，并确保在 HTML 中更新图片引用。

## 网站基于

本网站设计参考了 [2DGS 项目网站](https://surfsplatting.github.io/)。 