import { MetadataRoute } from 'next'
import { INDEXABLE_LOCALES, INDEXABLE_PATHS, SITE_ORIGIN } from '@/lib/seo'

const PRIORITY: Record<string, number> = {
  '': 1,
  '/products/streams': 0.9,
  '/products/iptv': 0.9,
  '/products/assistant': 0.9,
  '/products/push': 0.8,
  '/docs': 0.8,
  '/contact': 0.8,
  '/coverage': 0.7,
  '/customers': 0.7,
  '/faq': 0.7,
  '/about': 0.6,
}

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_LOCALES.flatMap((locale) =>
    INDEXABLE_PATHS.map((path) => ({
      url: `${SITE_ORIGIN}/${locale}${path}`,
      changeFrequency: path === '' || path === '/coverage' ? 'daily' : 'weekly',
      priority: PRIORITY[path] ?? 0.4,
    }))
  )
}
