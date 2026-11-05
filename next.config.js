const withNextIntl = require('next-intl/plugin')('./src/i18n.ts')

const RETIRED_LOCALES = ['es', 'pt', 'fr', 'de', 'it', 'ru', 'ja', 'ko', 'tr', 'ar']

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  async redirects() {
    return RETIRED_LOCALES.flatMap((locale) => [
      {
        source: `/${locale}`,
        destination: '/en',
        permanent: true,
      },
      {
        source: `/${locale}/:path*`,
        destination: '/en/:path*',
        permanent: true,
      },
    ])
  },
}

module.exports = withNextIntl(nextConfig)