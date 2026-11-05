import {
  coveragePage,
  customersPage,
  docsPage,
  productBySlug,
  solutionBySlug,
  ui,
} from '@/content/site'
import { tx, type Copy } from '@/lib/locale'

export const SITE_ORIGIN = 'https://sportliveapi.com'

export const INDEXABLE_LOCALES = ['zh', 'en', 'zh-TW'] as const

/** Paths that should be crawled. No leading locale. */
export const INDEXABLE_PATHS = [
  '',
  '/products/streams',
  '/products/push',
  '/products/iptv',
  '/products/assistant',
  '/solutions/apps',
  '/solutions/platforms',
  '/solutions/channels',
  '/solutions/streamers',
  '/coverage',
  '/docs',
  '/customers',
  '/faq',
  '/about',
  '/contact',
  '/privacy',
  '/disclaimer',
] as const

const PAGE_LABELS: Record<string, Copy> = {
  '/coverage': coveragePage.title,
  '/docs': docsPage.title,
  '/customers': customersPage.title,
  '/faq': ui.faq,
  '/about': ui.about,
  '/contact': ui.contact,
  '/privacy': ui.privacy,
  '/disclaimer': ui.disclaimer,
}

export function htmlLang(locale: string) {
  if (locale === 'zh') return 'zh-CN'
  if (locale === 'zh-TW') return 'zh-TW'
  return 'en'
}

export function organizationGraph(locale: string) {
  const home = `${SITE_ORIGIN}/${locale}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_ORIGIN}/#organization`,
        name: 'SportLive API',
        legalName: 'SLA Limited',
        url: SITE_ORIGIN,
        logo: `${SITE_ORIGIN}/logo.svg`,
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'SG',
        },
        sameAs: [
          'https://x.com/sportliveapi',
          'https://www.facebook.com/sportliveapi',
          'https://www.tiktok.com/@sportliveapi',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_ORIGIN}/#website`,
        name: 'SportLiveAPI',
        url: home,
        inLanguage: htmlLang(locale),
        publisher: { '@id': `${SITE_ORIGIN}/#organization` },
      },
    ],
  }
}

export function breadcrumbJsonLd(locale: string, pathname: string) {
  const prefix = `/${locale}`
  let rest = pathname.startsWith(prefix) ? pathname.slice(prefix.length) : ''
  if (rest.length > 1 && rest.endsWith('/')) rest = rest.slice(0, -1)
  if (!rest) return null

  const homeName = tx(locale, { zh: '首页', en: 'Home', 'zh-TW': '首頁' })
  const crumbs: { name: string; path: string }[] = [{ name: homeName, path: prefix }]

  const productMatch = rest.match(/^\/products\/([^/]+)$/)
  const solutionMatch = rest.match(/^\/solutions\/([^/]+)$/)
  if (productMatch) {
    const product = productBySlug(productMatch[1])
    if (!product) return null
    crumbs.push({ name: tx(locale, product.name), path: `${prefix}${rest}` })
  } else if (solutionMatch) {
    const solution = solutionBySlug(solutionMatch[1])
    if (!solution) return null
    crumbs.push({ name: tx(locale, solution.name), path: `${prefix}${rest}` })
  } else {
    const label = PAGE_LABELS[rest]
    if (!label) return null
    crumbs.push({ name: tx(locale, label), path: `${prefix}${rest}` })
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${SITE_ORIGIN}${crumb.path}`,
    })),
  }
}
