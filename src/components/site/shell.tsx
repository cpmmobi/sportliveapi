import Link from 'next/link'
import { tx, type Copy } from '@/lib/locale'
import { home, ui } from '@/content/site'

export function Mark({ light = false }: { light?: boolean }) {
  return <span className={`inline-block h-3.5 w-2.5 -skew-x-[10deg] ${light ? 'bg-white' : 'bg-brand-primary'}`} aria-hidden />
}

export function SkewBadge({
  children,
  variant = 'pink',
}: {
  children: React.ReactNode
  variant?: 'pink' | 'ink' | 'white'
}) {
  const styles =
    variant === 'pink'
      ? 'bg-brand-primary text-white'
      : variant === 'ink'
        ? 'bg-brand-ink text-white border-l-2 border-brand-primary'
        : 'bg-white text-brand-primary'
  return (
    <span className={`inline-flex h-6 min-w-[1.85rem] -skew-x-[10deg] items-center justify-center px-2 text-xs font-bold ${styles}`}>
      <span className="skew-x-[10deg]">{children}</span>
    </span>
  )
}

export function PageHero({
  locale,
  eyebrow,
  title,
  lede,
  crumbs,
  children,
}: {
  locale: string
  eyebrow?: Copy
  title: string
  lede: string
  crumbs?: { href: string; label: string }[]
  children?: React.ReactNode
}) {
  return (
    <header
      className="relative overflow-hidden bg-brand-primary text-white"
      style={{
        backgroundImage: 'linear-gradient(115deg, #FC0078 0%, #E0006C 55%, #9E004D 100%)',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-10 hidden h-[130%] w-56 -skew-x-[10deg] bg-black/15 lg:block"
      />
      <div className="container-custom relative py-16 lg:py-22">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-white/80">
            {crumbs.map((crumb, index) => (
              <span key={crumb.href}>
                {index > 0 && <span className="px-1.5 text-white/50">/</span>}
                <Link href={crumb.href} className="hover:text-white">
                  {crumb.label}
                </Link>
              </span>
            ))}
            <span className="px-1.5 text-white/50">/</span>
            <span className="text-white">{title}</span>
          </nav>
        )}
        {eyebrow && (
          <p className="mb-5 inline-flex items-center gap-2.5 bg-black/20 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white">
            <span className="h-2 w-2 -skew-x-[10deg] bg-white" />
            {tx(locale, eyebrow)}
          </p>
        )}
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{lede}</p>
        {children}
      </div>
    </header>
  )
}

export function CtaBand({ locale }: { locale: string }) {
  return (
    <section
      className="relative overflow-hidden bg-brand-primary text-white"
      style={{
        backgroundImage: 'linear-gradient(115deg, #FC0078 0%, #DA0068 58%, #9E004D 100%)',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-10 hidden h-[140%] w-64 -skew-x-[10deg] bg-black/15 lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-44 -bottom-12 hidden h-64 w-28 -skew-x-[10deg] bg-white/10 lg:block"
      />
      <div className="container-custom relative flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/85">
            <Mark light />
            <span>SPORTLIVE API</span>
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{tx(locale, home.ctaTitle)}</h2>
          <p className="mt-3 text-base leading-relaxed text-white/90">{tx(locale, home.ctaBody)}</p>
        </div>
        <Link
          href={`/${locale}/contact`}
          className="inline-flex shrink-0 items-center justify-center gap-2 bg-white px-8 py-4 text-base font-semibold text-brand-primary shadow-[4px_4px_0_0_#141414] transition-transform hover:-translate-y-0.5 hover:bg-brand-tint"
        >
          <span>{tx(locale, ui.contact)}</span>
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  )
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-brand-ink">
          <span className="mt-2 h-2 w-1.5 shrink-0 -skew-x-[10deg] bg-brand-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
