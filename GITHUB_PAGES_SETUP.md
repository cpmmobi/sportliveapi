# 🚀 GitHub Pages 部署指南

## 📋 自动部署已配置完成

您的项目已经配置好了GitHub Actions自动部署到GitHub Pages。每次推送到`main`分支时，都会自动触发部署流程。

## 🔧 启用GitHub Pages

### 1. 访问仓库设置
1. 打开GitHub仓库：https://github.com/cpmmobi/sportliveapi
2. 点击 **Settings** 选项卡
3. 在左侧菜单中找到 **Pages**

### 2. 配置Pages设置
1. **Source**: 选择 "Deploy from a branch"
2. **Branch**: 选择 `gh-pages` 分支
3. **Folder**: 选择 `/ (root)`
4. 点击 **Save** 保存设置

### 3. 等待部署完成
- GitHub Actions会自动运行部署流程
- 通常需要2-5分钟完成
- 可以在 **Actions** 选项卡查看部署状态

### 4. 访问网站
部署完成后，您的网站将在以下地址可用：
```
https://cpmmobi.github.io/sportliveapi/
```

## 📁 项目结构说明

### 部署配置文件
- `.github/workflows/deploy.yml` - GitHub Actions工作流
- `next.config.js` - Next.js静态导出配置
- `public/.nojekyll` - 确保GitHub Pages正确处理文件

### 自动化流程
1. **触发条件**: 推送到`main`分支
2. **构建过程**: 
   - 安装依赖 (`npm ci`)
   - 构建项目 (`npm run build`)
   - 导出静态文件 (`npm run export`)
3. **部署过程**: 自动推送到`gh-pages`分支

## 🔍 故障排除

### 常见问题
1. **部署失败**
   - 检查GitHub Actions日志
   - 确保所有依赖都在package.json中
   - 验证构建命令是否成功

2. **页面404错误**
   - 确认GitHub Pages设置正确
   - 检查`gh-pages`分支是否存在
   - 等待DNS传播（可能需要几分钟）

3. **样式或资源加载失败**
   - 检查`basePath`和`assetPrefix`配置
   - 确认所有资源路径是相对路径

### 调试步骤
1. 查看GitHub Actions运行日志
2. 检查`gh-pages`分支内容
3. 使用浏览器开发者工具检查网络请求

## 🌐 自定义域名（可选）

如果您有自定义域名，可以在GitHub Pages设置中配置：

1. 在Pages设置中添加自定义域名
2. 在DNS提供商处添加CNAME记录指向：`cpmmobi.github.io`
3. 等待DNS传播完成

## 📊 监控和分析

- 使用GitHub Insights查看访问统计
- 集成Google Analytics进行详细分析
- 监控GitHub Actions运行状态

---

**注意**: 首次部署可能需要几分钟时间。如果遇到问题，请检查GitHub Actions日志获取详细错误信息。