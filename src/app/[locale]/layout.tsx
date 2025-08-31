import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from '@/lib/i18n'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const SUPPORTED_LOCALES = ['en', 'zh', 'zh-TW'] as const

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

// 生成动态metadata
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale
  const messages = await getMessages(locale)
  
  const isZh = locale === 'zh' || locale === 'zh-TW'
  
  const title = isZh ? 'SportLiveAPI - 专业体育视频直播流媒体服务商' : 'SportLiveAPI - Professional Sports Live Streaming API Service'
  const description = isZh 
    ? '为体育类产品开发者提供稳定、多元化的全球体育赛事直播流技术接入服务。支持RTMP推流、直播链接、API接口等多种服务形式，覆盖足球、篮球、赛车、冰球等12种体育项目。'
    : 'Providing stable and diversified global sports live streaming API services for sports product developers. Supporting RTMP streaming, live links, API interfaces and other service forms, covering 12 sports including football, basketball, racing, and ice hockey.'
  
  const keywords = isZh 
    ? '体育直播流API, RTMP推流服务, 体育视频接口, B端体育直播解决方案'
    : 'Sports Live Streaming API, RTMP Streaming Service, Sports Video Interface, B2B Sports Live Solution'
    
  const ogDescription = isZh
    ? '10年专业服务经验，来自直播吧、onefootball、SportRadar的资深团队。12项体育全覆盖，89.5%全球联赛覆盖度。'
    : '10 years of professional service experience, senior team from Zhibo8, Onefootball, SportRadar. 12 sports full coverage, 89.5% global league coverage.'
    
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
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'zh-CN': '/zh',
        'en-US': '/en',
        'zh-TW': '/zh-TW',
      },
    },
    openGraph: {
      title,
      description: ogDescription,
      url: `https://sportliveapi.com/${locale}`,
      siteName: 'SportLiveAPI',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: isZh ? 'SportLiveAPI - 专业体育直播流服务商' : 'SportLiveAPI - Professional Sports Live Streaming Service',
        },
      ],
      locale: ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
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

  // 设置html lang属性
  const htmlLang = params.locale === 'zh-TW' ? 'zh-TW' : params.locale === 'zh' ? 'zh-CN' : 'en-US'
  
  return (
    <html lang={htmlLang} className={cn(inter.variable)}>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className
      )}>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

// 生成静态参数，只允许支持的语言
export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({
    locale,
  }))
}