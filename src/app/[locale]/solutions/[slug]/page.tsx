import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import MainLayout from '@/components/layout/main-layout'
import { BulletList, CtaBand, PageHero } from '@/components/site/shell'
import { cases, productBySlug, products, solutionBySlug, solutions, ui } from '@/content/site'
import { pageMeta } from '@/lib/meta'
import { tx } from '@/lib/locale'

export function generateStaticParams() {
  return solutions.map((item) => ({ slug: item.slug }))
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const solution = solutionBySlug(params.slug)
  if (!solution) return {}
  return pageMeta(params.locale, `/solutions/${params.slug}`, tx(params.locale, solution.name), tx(params.locale, solution.lede))
}

export default function SolutionPage({ params }: { params: { locale: string; slug: string } }) {
  const solution = solutionBySlug(params.slug)
  if (!solution) notFound()
  const locale = params.locale
  const product = productBySlug(solution.product)!
  const others = products.filter((item) => item.slug !== product.slug)
  const related = cases.filter((item) => item.solution === solution.slug)

  return (
    <MainLayout>
      <PageHero
        locale={locale}
        eyebrow={ui.solutions}
        title={tx(locale, solution.name)}
        lede={tx(locale, solution.lede)}
        crumbs={[{ href: `/${locale}`, label: tx(locale, { zh: '首页', en: 'Home', 'zh-TW': '首頁' }) }]}
      />
      <section className="border-b border-brand-line">
        <div className="container-custom grid gap-8 py-14 lg:grid-cols-2">
          <div>
            <h2 className="text-sm font-medium text-brand-primary">{tx(locale, ui.forWhom)}</h2>
            <p className="mt-3 text-lg leading-relaxed">{tx(locale, solution.job)}</p>
          </div>
          <div className="border-t-4 border-brand-primary bg-brand-ink p-6 text-white shadow-md">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-primary">{tx(locale, ui.recommend)}</h2>
            <Link href={`/${locale}/products/${product.slug}`} className="mt-3 inline-flex items-center gap-2 text-2xl font-bold hover:text-brand-primary">
              <span>{tx(locale, product.name)}</span>
              <span aria-hidden>→</span>
            </Link>
            <p className="mt-3 text-sm leading-6 text-white/75">{tx(locale, solution.why)}</p>
          </div>
        </div>
      </section>
      <section className="border-b border-brand-line bg-brand-paper">
        <div className="container-custom grid gap-10 py-14 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-medium">{tx(locale, ui.prepare)}</h2>
            <div className="mt-4"><BulletList items={solution.bring.map((item) => tx(locale, item))} /></div>
          </div>
          <div>
            <h2 className="text-lg font-medium">{tx(locale, ui.pay)}</h2>
            <div className="mt-4"><BulletList items={solution.billing.map((item) => tx(locale, item))} /></div>
          </div>
        </div>
      </section>
      <section className="border-b border-brand-line">
        <div className="container-custom grid gap-10 py-14 lg:grid-cols-12">
          <h2 className="text-2xl font-semibold lg:col-span-4">{tx(locale, ui.steps)}</h2>
          <ol className="space-y-8 lg:col-span-8">
            {solution.steps.map((step, index) => (
              <li key={step.title.zh}>
                <p className="text-sm font-medium text-brand-primary">0{index + 1}</p>
                <h3 className="mt-1 font-medium">{tx(locale, step.title)}</h3>
                <p className="mt-2 text-sm leading-6 text-brand-muted">{tx(locale, step.body)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="border-b border-brand-line">
        <div className="container-custom py-10">
          <p className="text-xs font-medium text-brand-muted">{tx(locale, ui.also)}</p>
          <div className="mt-3 flex flex-wrap gap-4">
            {others.map((item) => (
              <Link key={item.slug} href={`/${locale}/products/${item.slug}`} className="text-sm text-brand-ink hover:text-brand-primary">
                {tx(locale, item.name)}
              </Link>
            ))}
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="border-b border-brand-line">
          <div className="container-custom py-14">
            <h2 className="text-2xl font-semibold">{tx(locale, ui.related)}</h2>
            {related.map((item) => (
              <article key={item.id} className="mt-6 max-w-3xl border border-brand-line p-6">
                <h3 className="font-medium">{tx(locale, item.title)}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-muted">{tx(locale, item.situation)}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      <CtaBand locale={locale} />
    </MainLayout>
  )
}
