import { getTranslations } from 'next-intl/server'
import FAQClientPage from './faq-client'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'faq' })

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

export default function FAQPage({ params: { locale } }: Props) {
  return <FAQClientPage params={{ locale }} />
}