import React from 'react'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import ServicesClientPage from './services-client'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'services' })
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

export default function ServicesPage({ params }: Props) {
  return <ServicesClientPage params={params} />
}