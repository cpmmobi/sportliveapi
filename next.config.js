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
  // 禁用所有静态优化
  staticPageGenerationTimeout: 0,
  poweredByHeader: false,
  compress: false
}

module.exports = withNextIntl(nextConfig)