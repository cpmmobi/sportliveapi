import AboutClientPage from './about-client'
import { Metadata } from 'next'

// 强制动态渲染
export const dynamic = 'force-dynamic'

type Props = {
  params: { locale: string }
}

export function generateMetadata({ params: { locale } }: Props): Metadata {
  const titles = {
    'en': 'About Us - SportLiveAPI',
    'zh': '关于我们 - SportLiveAPI',
    'zh-TW': '關於我們 - SportLiveAPI'
  }
  
  const descriptions = {
    'en': 'Learn about SportLiveAPI team and our professional sports streaming technology services',
    'zh': '了解SportLiveAPI团队和我们的专业体育流媒体技术服务',
    'zh-TW': '了解SportLiveAPI團隊和我們的專業體育流媒體技術服務'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles['en'],
    description: descriptions[locale as keyof typeof descriptions] || descriptions['en'],
  }
}

export default function AboutPage({ params: { locale } }: Props) {
  return <AboutClientPage params={{ locale }} />
}