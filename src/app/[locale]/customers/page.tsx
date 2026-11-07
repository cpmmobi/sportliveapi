import type { Metadata } from 'next'
import Link from 'next/link'
import {
  AlertCircle,
  ArrowRight,
  ArrowRightLeft,
  CheckCircle2,
  Code2,
  Database,
  Heart,
  Mic,
  MonitorPlay,
  Radio,
  Shield,
  Sparkles,
  Tv,
  Zap,
} from 'lucide-react'
import MainLayout from '@/components/layout/main-layout'
import CasesPptDeck from '@/components/preview/cases-ppt-deck'
import { Mark } from '@/components/site/shell'
import { customersPage } from '@/content/site'
import { pageMeta } from '@/lib/meta'
import { tx } from '@/lib/locale'

const FIT_ICONS = [MonitorPlay, Radio, Tv, Mic, ArrowRightLeft] as const
const WAIT_ICONS = [Code2, Shield, Sparkles, Database] as const

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

      <section className="border-t border-brand-line bg-white py-14 lg:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex -skew-x-[10deg] items-center gap-2 border-2 border-brand-ink bg-brand-paper px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-primary shadow-[2px_2px_0_0_#141414]">
              <Mark />
              <span className="skew-x-[10deg]">{tx(locale, customersPage.fitEyebrow)}</span>
            </span>
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              {tx(locale, customersPage.fitTitle)}
            </h2>
            <p className="mt-3 text-sm leading-6 text-brand-muted sm:text-base">
              {tx(locale, customersPage.fitLede)}
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-stretch">
            {/* Left Card: Strong Fit (SportLiveAPI Magenta + Hard Ink Frame) */}
            <article className="flex flex-col border-2 border-brand-ink bg-white shadow-[5px_5px_0_0_#FC0078]">
              <div className="flex items-center justify-between gap-4 border-b-2 border-brand-ink bg-brand-primary px-6 py-5 text-white sm:px-7">
                <div className="flex items-center gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 -skew-x-[10deg] items-center justify-center border border-white/40 bg-brand-ink text-white shadow-[2px_2px_0_0_rgba(20,20,20,0.45)]">
                    <CheckCircle2 className="h-5 w-5 skew-x-[10deg]" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold leading-snug">{tx(locale, customersPage.fitHeading)}</h3>
                    <p className="mt-0.5 text-xs text-white/90">{tx(locale, customersPage.fitSubheading)}</p>
                  </div>
                </div>
                <span className="hidden shrink-0 -skew-x-[10deg] border border-white/50 bg-brand-ink px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider text-white sm:inline-flex">
                  <span className="skew-x-[10deg]">{tx(locale, customersPage.fitBadge)}</span>
                </span>
              </div>

              <div className="flex-1 divide-y divide-brand-line px-6 py-2 sm:px-7">
                {customersPage.fitCards.map((item, idx) => {
                  const Icon = FIT_ICONS[idx] || MonitorPlay
                  return (
                    <div key={item.title.zh} className="flex items-start gap-4 py-5">
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 -skew-x-[10deg] items-center justify-center border border-brand-primary/35 bg-brand-tint text-brand-primary">
                        <Icon className="h-5 w-5 skew-x-[10deg]" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-brand-primary">
                            0{idx + 1}
                          </span>
                          <h4 className="text-base font-bold text-brand-ink">{tx(locale, item.title)}</h4>
                        </div>
                        <p className="mt-1.5 text-sm leading-6 text-brand-muted">{tx(locale, item.body)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </article>

            {/* Right Card: Hold Off (SportLiveAPI Dark Ink + Paper Tone) */}
            <article className="flex flex-col border-2 border-brand-ink bg-white shadow-[5px_5px_0_0_#141414]">
              <div className="flex items-center gap-3.5 border-b-2 border-brand-ink bg-brand-ink px-6 py-5 text-white sm:px-7">
                <span className="flex h-10 w-10 shrink-0 -skew-x-[10deg] items-center justify-center border border-white/25 bg-white/10 text-white">
                  <AlertCircle className="h-5 w-5 skew-x-[10deg]" />
                </span>
                <div>
                  <h3 className="text-lg font-bold leading-snug">{tx(locale, customersPage.waitHeading)}</h3>
                  <p className="mt-0.5 text-xs text-white/75">{tx(locale, customersPage.waitSubheading)}</p>
                </div>
              </div>

              <div className="divide-y divide-brand-line px-6 py-2 sm:px-7">
                {customersPage.waitCards.map((item, idx) => {
                  const Icon = WAIT_ICONS[idx] || Code2
                  return (
                    <div key={item.title.zh} className="flex items-start gap-4 py-5">
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 -skew-x-[10deg] items-center justify-center border border-brand-line bg-brand-paper text-brand-muted">
                        <Icon className="h-5 w-5 skew-x-[10deg]" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-brand-muted">
                            0{idx + 1}
                          </span>
                          <h4 className="text-base font-bold text-brand-ink">{tx(locale, item.title)}</h4>
                        </div>
                        <p className="mt-1.5 text-sm leading-6 text-brand-muted">{tx(locale, item.body)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-auto px-6 pb-6 pt-2 sm:px-7">
                <div className="flex items-start gap-3 border border-brand-primary/30 border-l-4 border-l-brand-primary bg-brand-tint p-4 text-sm leading-6 text-brand-ink">
                  <Heart className="mt-1 h-4 w-4 shrink-0 text-brand-primary" />
                  <p>
                    {tx(locale, customersPage.fitNoteLead)}
                    <strong className="font-bold text-brand-primary">{tx(locale, customersPage.fitNoteStrong)}</strong>
                    {tx(locale, customersPage.fitNoteTail)}
                  </p>
                </div>
              </div>
            </article>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link
              href={`/${locale}/contact`}
              className="group flex items-center justify-between gap-4 border-2 border-brand-ink bg-white px-5 py-4 shadow-[3px_3px_0_0_#FC0078] transition-all hover:-translate-y-0.5 hover:bg-brand-tint/40"
            >
              <div className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 shrink-0 -skew-x-[10deg] items-center justify-center bg-brand-primary text-white">
                  <Zap className="h-5 w-5 skew-x-[10deg]" />
                </span>
                <div>
                  <p className="text-xs font-medium text-brand-muted">{tx(locale, customersPage.fitReady)}</p>
                  <p className="mt-0.5 text-sm font-bold text-brand-primary">{tx(locale, customersPage.fitReadyAction)}</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-brand-primary transition-transform group-hover:translate-x-0.5" />
            </Link>

            <div className="flex items-center gap-3.5 border-2 border-brand-line bg-brand-paper px-5 py-4">
              <span className="flex h-10 w-10 shrink-0 -skew-x-[10deg] items-center justify-center border border-brand-line bg-white text-brand-muted">
                <Shield className="h-5 w-5 skew-x-[10deg]" />
              </span>
              <div>
                <p className="text-xs font-medium text-brand-muted">{tx(locale, customersPage.fitPersonal)}</p>
                <p className="mt-0.5 text-sm font-bold text-brand-ink">{tx(locale, customersPage.fitPersonalAction)}</p>
              </div>
            </div>

            <Link
              href={`/${locale}/contact`}
              className="group flex items-center justify-between gap-4 border-2 border-brand-ink bg-white px-5 py-4 shadow-[3px_3px_0_0_#141414] transition-all hover:-translate-y-0.5 hover:border-brand-primary"
            >
              <div className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 shrink-0 -skew-x-[10deg] items-center justify-center bg-brand-ink text-white group-hover:bg-brand-primary">
                  <Heart className="h-5 w-5 skew-x-[10deg]" />
                </span>
                <div>
                  <p className="text-xs font-medium text-brand-muted">{tx(locale, customersPage.fitEarly)}</p>
                  <p className="mt-0.5 text-sm font-bold text-brand-ink group-hover:text-brand-primary">{tx(locale, customersPage.fitEarlyAction)}</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-brand-ink transition-transform group-hover:translate-x-0.5 group-hover:text-brand-primary" />
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
