'use client'

import React from 'react'
import ServicesClientPage from './services-client'

type Props = {
  params: { locale: string }
}

export default function ServicesPage({ params: { locale } }: Props) {
  return <ServicesClientPage params={{ locale }} />
}