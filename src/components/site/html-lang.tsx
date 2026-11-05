'use client'

import { useEffect } from 'react'
import { htmlLang } from '@/lib/seo'

export function HtmlLang({ locale }: { locale: string }) {
  const lang = htmlLang(locale)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang=${JSON.stringify(lang)}`,
      }}
    />
  )
}
