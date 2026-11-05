import Link from 'next/link'
import type { Metadata } from 'next'
import MainLayout from '@/components/layout/main-layout'
import { ProductShowcase } from '@/components/site/home-hero'
import { CtaBand, Mark } from '@/components/site/shell'
import { coveragePage, home, homeOffers, ui } from '@/content/site'
import { pageMeta } from '@/lib/meta'
import { tx, txLines } from '@/lib/locale'

const homeTitle = {
  zh: 'SportLiveAPI - 体育赛事直播线路与全球体育频道',
  en: 'SportLiveAPI - Live Sports Lines, TV Channels and OBS Feeds',
  'zh-TW': 'SportLiveAPI - 體育賽事直播線路與全球體育頻道',
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale === 'zh' || params.locale === 'zh-TW' ? params.locale : 'en'
  return {
    ...pageMeta(params.locale, '', tx(params.locale, home.title), tx(params.locale, home.lede)),
    title: { absolute: homeTitle[locale] },
  }
}

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale
  const slides = homeOffers.map((offer) => ({
    id: offer.id,
    audience: tx(locale, offer.audience),
    name: tx(locale, offer.name),
    lede: tx(locale, offer.lede),
    points: offer.points.map((point) => tx(locale, point)),
    links: offer.links.map((link) => ({ href: `/${locale}${link.href}`, label: tx(locale, link.label) })),
    detailHref: `/${locale}${offer.detailHref}`,
  }))

  return (
    <MainLayout>
      <header className="relative overflow-hidden bg-[#0E1117] text-white">
        {/* Stadium broadcast match background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/match-player-preview.jpg')",
          }}
        />
        {/* Brand + broadcast gradient overlay for crisp text readability & stadium depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(100deg, rgba(14, 17, 23, 0.88) 0%, rgba(14, 17, 23, 0.62) 44%, rgba(252, 0, 120, 0.16) 76%, rgba(14, 17, 23, 0.22) 100%)',
          }}
        />
        {/* Subtle pitch line & broadcast viewfinder grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="container-custom relative grid items-center gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <div className="inline-flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 bg-[#E11D48] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                <span>LIVE FEED · 1080P</span>
              </span>
              <p className="inline-flex items-center gap-2 bg-black/45 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white ring-1 ring-white/20 backdrop-blur-sm">
                <span className="h-2 w-2 -skew-x-[10deg] bg-brand-primary" />
                <span>{tx(locale, home.heroKicker)}</span>
              </p>
            </div>
            <h1 className="mt-6 max-w-xl text-balance text-4xl font-bold tracking-tight drop-shadow-sm sm:text-5xl lg:text-6xl lg:leading-[1.12]">
              {txLines(locale, home.titleLines).map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">{tx(locale, home.lede)}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 bg-brand-primary px-7 py-3.5 text-base font-semibold text-white shadow-[4px_4px_0_0_#141414] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark"
              >
                <span>{tx(locale, ui.contact)}</span>
                <span aria-hidden>→</span>
              </Link>
              <a
                href="#products"
                className="inline-flex items-center border border-white/50 bg-black/35 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm hover:border-white hover:bg-black/55"
              >
                {tx(locale, home.more)}
              </a>
            </div>
          </div>
          <aside className="border-t-4 border-brand-ink bg-white p-6 text-brand-ink shadow-[0_24px_60px_-15px_rgba(0,0,0,0.35)] sm:p-7 lg:col-span-5">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-primary">
              <Mark />
              {tx(locale, home.heroBoardTitle)}
            </p>
            <ol className="mt-4 divide-y divide-brand-line border-y border-brand-line">
              {home.heroPaths.map((path, index) => (
                <li key={path.href}>
                  <Link
                    href={`/${locale}${path.href}`}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 py-4 transition-colors hover:bg-brand-tint/50"
                  >
                    <span className="inline-flex h-6 w-7 -skew-x-[10deg] items-center justify-center bg-brand-primary text-xs font-bold text-white">
                      0{index + 1}
                    </span>
                    <span>
                      <span className="block text-base font-semibold text-brand-ink group-hover:text-brand-primary">
                        {tx(locale, path.name)}
                      </span>
                      <span className="mt-0.5 block text-sm leading-6 text-brand-muted">{tx(locale, path.detail)}</span>
                    </span>
                    <span
                      aria-hidden
                      className="pr-1 text-lg text-brand-muted transition-transform group-hover:translate-x-1 group-hover:text-brand-primary"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs leading-5 text-brand-muted">{tx(locale, home.heroBoardNote)}</p>
          </aside>
        </div>
      </header>

      <section className="border-b border-brand-line">
        <div className="container-custom py-16 lg:py-20">
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
            <Mark />
            <span>WHY SPORTLIVE API</span>
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">{tx(locale, home.whyTitle)}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-muted">{tx(locale, home.whyLede)}</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {home.reasons.map((reason, index) => (
              <article
                key={reason.title.zh}
                className="border border-brand-line border-t-4 border-t-brand-ink bg-white p-6 transition-shadow hover:border-t-brand-primary hover:shadow-md sm:p-7"
              >
                <span className="inline-flex h-6 w-8 -skew-x-[10deg] items-center justify-center bg-brand-primary text-xs font-bold text-white">
                  <span className="skew-x-[10deg]">0{index + 1}</span>
                </span>
                <h3 className="mt-4 text-xl font-bold tracking-tight">{tx(locale, reason.title)}</h3>
                <p className="mt-2.5 text-sm leading-6 text-brand-muted">{tx(locale, reason.body)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProductShowcase
        eyebrow={tx(locale, home.offersEyebrow)}
        title={tx(locale, home.offersTitle)}
        lede={tx(locale, home.offersLede)}
        detailLabel={tx(locale, home.offersDetail)}
        slides={slides}
      />

      <section className="border-b border-brand-line bg-white">
        <div className="container-custom py-16 lg:py-20">
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
            <Mark />
            <span>ONBOARDING</span>
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{tx(locale, home.flowTitle)}</h2>
          <ol className="mt-10 grid list-none gap-6 md:grid-cols-2 lg:grid-cols-4">
            {home.flow.map((step, index) => (
              <li
                key={step.title.zh}
                className="relative border border-brand-line border-t-4 border-t-brand-primary bg-brand-paper/40 p-6"
              >
                <span className="inline-flex h-6 w-8 -skew-x-[10deg] items-center justify-center bg-brand-ink text-xs font-bold text-white">
                  <span className="skew-x-[10deg]">0{index + 1}</span>
                </span>
                <h3 className="mt-4 text-xl font-bold">{tx(locale, step.title)}</h3>
                <p className="mt-2 text-sm leading-6 text-brand-muted">{tx(locale, step.body)}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex w-full items-center justify-center gap-2 bg-brand-primary px-10 py-4 text-base font-semibold text-white shadow-[4px_4px_0_0_#141414] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark sm:w-auto sm:min-w-[15rem]"
            >
              <span>{tx(locale, ui.contact)}</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden border-y-4 border-brand-primary bg-brand-ink bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/world-map.jpg')" }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-ink/60 via-brand-ink/30 to-brand-ink/15" />
        <div className="container-custom relative py-16 lg:py-22">
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
            <Mark />
            <span>GLOBAL SCALE</span>
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{tx(locale, home.statsTitle)}</h2>
          <dl className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-5">
            {home.stats.map((stat) => (
              <div
                key={stat.label.zh}
                className="border-l-4 border-brand-primary bg-brand-ink/70 px-5 py-4 backdrop-blur-[2px]"
              >
                <dt className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{tx(locale, stat.value)}</dt>
                <dd className="mt-1.5 text-sm leading-6 text-white/75">{tx(locale, stat.label)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-b border-brand-line bg-white">
        <div className="container-custom py-16">
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
            <Mark />
            <span>LEAGUES &amp; TOURS</span>
          </p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{tx(locale, home.coverageTitle)}</h2>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {coveragePage.leagues.map((league) => (
              <li
                key={league.zh}
                className="-skew-x-[6deg] border-l-2 border-brand-primary bg-brand-ink px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-brand-primary"
              >
                <span className="inline-block skew-x-[6deg]">{tx(locale, league)}</span>
              </li>
            ))}
          </ul>
          <Link
            href={`/${locale}/coverage`}
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline"
          >
            <span>{tx(locale, home.coverageLink)}</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <CtaBand locale={locale} />
    </MainLayout>
  )
}
