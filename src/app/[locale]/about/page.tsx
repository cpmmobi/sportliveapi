'use client'

import AboutClientPage from './about-client'

type Props = {
  params: { locale: string }
}

export default function AboutPage({ params: { locale } }: Props) {
  return <AboutClientPage params={{ locale }} />
}