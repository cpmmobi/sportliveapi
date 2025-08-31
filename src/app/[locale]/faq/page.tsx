'use client'

import FAQClientPage from './faq-client'

type Props = {
  params: { locale: string }
}

export default function FAQPage({ params: { locale } }: Props) {
  return <FAQClientPage params={{ locale }} />
}