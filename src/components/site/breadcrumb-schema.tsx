'use client'

import { usePathname } from 'next/navigation'
import { breadcrumbJsonLd } from '@/lib/seo'

export function BreadcrumbSchema() {
  const pathname = usePathname()
  if (!pathname) return null
  const locale = pathname.split('/')[1] || 'zh'
  const data = breadcrumbJsonLd(locale, pathname)
  if (!data) return null
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
