import type { Metadata } from 'next'
import MainLayout from '@/components/layout/main-layout'
import ApiPlayground from '@/components/preview/api-playground'
import { CtaBand } from '@/components/site/shell'
import { docsPage } from '@/content/site'
import { pageMeta } from '@/lib/meta'
import { tx } from '@/lib/locale'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return pageMeta(params.locale, '/docs', tx(params.locale, docsPage.title), tx(params.locale, docsPage.lede))
}

export default function DocsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale
  return (
    <MainLayout>
      <section className="border-b border-brand-line bg-brand-paper py-8 lg:py-10">
        <div className="container-custom">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                SLA DEVELOPER CONSOLE · v2.6
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">
                {tx(locale, docsPage.title)}
              </h1>
            </div>
            <p className="max-w-xl text-xs leading-5 text-brand-muted">
              {tx(locale, docsPage.lede)}
            </p>
          </div>

          <ApiPlayground locale={locale} />
        </div>
      </section>
      <CtaBand locale={locale} />
    </MainLayout>
  )
}
