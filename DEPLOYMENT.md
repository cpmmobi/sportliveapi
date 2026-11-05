# 🚀 SportStreamHD Vercel部署指南

## 📋 部署步骤

### 1. 准备工作
- GitHub账号
- Vercel账号（免费）
- 钉钉机器人密钥

### 2. 推送代码到GitHub
```bash
# 初始化Git仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "feat: SportStreamHD website ready for deployment"

# 添加远程仓库（替换为您的GitHub仓库地址）
git remote add origin https://github.com/YOUR_USERNAME/sportstreamhd.git

# 推送到GitHub
git push -u origin main
```

### 3. Vercel部署
1. **登录Vercel**：访问 https://vercel.com 并登录
2. **导入项目**：点击 "New Project" → "Import Git Repository"
3. **选择仓库**：选择您的sportstreamhd仓库
4. **配置设置**：
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
   - Install Command: `npm install`

### 4. 环境变量配置
在Vercel项目设置中添加以下环境变量：

```
DINGTALK_ACCESS_TOKEN=f7cf0fd1267222a98e223611734a46cc9a705ac8ff8eb9773dcf392aa4fdc0e8
DINGTALK_SECRET=SEC404cce92c7864fb490766877ce0125226b054a9e2512b3089251088c15857b57
```

### 5. 域名配置（可选）
- 在Vercel项目设置中的Domains选项卡
- 添加自定义域名：sportstreamhd.com
- 配置DNS记录指向Vercel

### 6. 部署完成
- Vercel会自动构建并部署
- 获得部署URL：https://sportstreamhd.vercel.app
- 每次推送到main分支都会自动重新部署

## 🔧 技术特性

### Serverless Functions
- `/api/contact` - 钉钉机器人集成
- 自动缩放，按需付费
- 全球CDN加速

### 性能优化
- 静态页面预渲染
- 图片优化
- CSS/JS压缩
- Gzip压缩

### 监控分析
- Google Analytics集成
- Vercel Analytics（可选）
- 实时性能监控

## 📊 部署后验证

### 功能测试清单
- [ ] 首页加载正常
- [ ] 联系表单提交成功
- [ ] 钉钉机器人接收消息
- [ ] Google Analytics追踪正常
- [ ] 所有页面响应式正常
- [ ] SEO meta标签正确

### 性能检查
- Lighthouse评分 > 90
- 首屏加载时间 < 3秒
- API响应时间 < 1秒

## 🛠 故障排除

### 常见问题
1. **构建失败**：检查Node.js版本和依赖
2. **API错误**：验证环境变量设置
3. **钉钉不通知**：检查密钥和网络权限
4. **样式异常**：清除浏览器缓存

### 调试方法
- 查看Vercel部署日志
- 使用浏览器开发者工具
- 检查Network面板API调用

## 🔄 更新部署

```bash
# 修改代码后
git add .
git commit -m "feat: update feature"
git push origin main
# Vercel自动重新部署
```

## 📞 技术支持
如有部署问题，请联系：customer@sportstreamhd.com