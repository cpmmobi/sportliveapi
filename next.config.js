const withNextIntl = require('next-intl/plugin')('./src/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  // 禁用静态导出以避免预渲染问题
  output: undefined,
  trailingSlash: false,
  // 配置动态路由
  generateBuildId: async () => {
    return 'build-' + Date.now()
  }
}

module.exports = withNextIntl(nextConfig)