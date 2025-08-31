import ContactClientPage from './contact-client';
import { Metadata } from 'next';

type Props = {
  params: { locale: string };
};

export function generateMetadata({ params: { locale } }: Props): Metadata {
  const titles = {
    'en': 'Contact Us - SportLiveAPI',
    'zh': '联系我们 - SportLiveAPI',
    'zh-TW': '聯繫我們 - SportLiveAPI'
  };
  
  const descriptions = {
    'en': 'Contact SportLiveAPI team for professional sports streaming API services and technical support',
    'zh': '联系SportLiveAPI团队获取专业的体育流媒体API服务和技术支持',
    'zh-TW': '聯繫SportLiveAPI團隊獲取專業的體育流媒體API服務和技術支持'
  };

  return {
    title: titles[locale as keyof typeof titles] || titles['en'],
    description: descriptions[locale as keyof typeof descriptions] || descriptions['en'],
  };
}

export default function ContactPage() {
  return <ContactClientPage />;
}