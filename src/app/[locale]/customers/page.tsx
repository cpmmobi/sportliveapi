import type { Metadata } from 'next'
import MainLayout from '@/components/layout/main-layout'
import CasesPptDeck from '@/components/preview/cases-ppt-deck'
import { customersPage } from '@/content/site'
import { pageMeta } from '@/lib/meta'
import { tx } from '@/lib/locale'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return pageMeta(params.locale, '/customers', tx(params.locale, customersPage.title), tx(params.locale, customersPage.lede))
}

export default function CustomersPage({ params }: { params: { locale: string } }) {
  const locale = params.locale

  return (
    <MainLayout>
      <section className="bg-brand-paper pb-6 pt-10 lg:pb-8 lg:pt-14">
        <div className="container-custom">
          <h1 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">{tx(locale, customersPage.title)}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-muted">{tx(locale, customersPage.lede)}</p>
          <div className="mt-6">
            <CasesPptDeck locale={locale} />
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
