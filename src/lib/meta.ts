import type { Metadata } from 'next'

export function pageMeta(locale: string, path: string, title: string, description: string): Metadata {
  const canonical = `/${locale}${path}`
  return {
    title: `${title} · SportLiveAPI`,
    description,
    alternates: {
      canonical,
      languages: {
        'zh-CN': `/zh${path}`,
        en: `/en${path}`,
        'zh-TW': `/zh-TW${path}`,
        'x-default': `/zh${path}`,
      },
    },
    openGraph: {
      title: `${title} · SportLiveAPI`,
      description,
      url: canonical,
      siteName: 'SportLiveAPI',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} · SportLiveAPI`,
      description,
    },
  }
}
