const withNextIntl = require('next-intl/plugin')('./src/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/sportliveapi' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/sportliveapi/' : '',
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
}

module.exports = withNextIntl(nextConfig)