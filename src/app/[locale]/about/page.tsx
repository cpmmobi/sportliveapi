import { getTranslations } from 'next-intl/server'
import AboutClientPage from './about-client'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'about' })

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

export default function AboutPage({ params: { locale } }: Props) {
  return <AboutClientPage params={{ locale }} />
}