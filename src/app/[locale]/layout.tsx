import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from '@/lib/i18n'
import type { Metadata } from 'next'
import { BreadcrumbSchema } from '@/components/site/breadcrumb-schema'
import { HtmlLang } from '@/components/site/html-lang'
import { organizationGraph } from '@/lib/seo'

const SUPPORTED_LOCALES = ['en', 'zh-TW', 'zh'] as const

type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

interface LocaleLayoutProps {
  children: ReactNode
  params: {
    locale: string
  }
}

// 验证locale是否有效
function isValidLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale)
}

// 生成静态metadata
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale
  
  const isZh = locale === 'zh' || locale === 'zh-TW'
  
  const title = isZh ? 'SportLiveAPI - 体育比赛直播线路' : 'SportLiveAPI - Live lines for sports matches'
  const description = isZh 
    ? '赛事直播线路、全球体育频道、OBS直播流机器人。开赛前接比赛，换台看体育台，或把直播流发给主播。'
    : 'Live Match Lines, Global Sports Channels, and OBS Streamer Bot. Connect a match before kickoff, tune in to a sports channel, or send the line to a host.'
  
  const keywords = isZh 
    ? '体育直播流, 赛事直播线路, 直播链接, 推流, 全球体育频道, 体育直播API'
    : 'sports live streaming API, live match lines, playback links, push streaming, global sports TV'
    
  const ogDescription = isZh
    ? '赛事直播线路、全球体育频道、OBS直播流机器人。开赛前接比赛，换台看体育台，或把直播流发给主播。'
    : 'Live Match Lines, Global Sports Channels, and OBS Streamer Bot. Connect a match before kickoff, tune a sports channel, or send the line to a host.'
    
  const ogLocale = locale === 'zh-TW' ? 'zh_TW' : locale === 'zh' ? 'zh_CN' : 'en_US'
  
  return {
    title,
    description,
    keywords,
    authors: [{ name: 'SportLiveAPI' }],
    creator: 'SportLiveAPI',
    publisher: 'SportLiveAPI',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://sportliveapi.com'),
    openGraph: {
      title,
      description: ogDescription,
      siteName: 'SportLiveAPI',
      locale: ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  // 如果locale无效，返回404
  if (!isValidLocale(params.locale)) {
    notFound()
  }

  // 获取翻译消息
  const messages = await getMessages(params.locale)

  const graph = organizationGraph(params.locale)

  return (
    <NextIntlClientProvider locale={params.locale} messages={messages}>
      <HtmlLang locale={params.locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }} />
      <BreadcrumbSchema />
      {children}
    </NextIntlClientProvider>
  )
}

// 生成静态参数，只允许支持的语言
export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({
    locale,
  }))
}