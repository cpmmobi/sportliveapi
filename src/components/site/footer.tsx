'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { tx } from '@/lib/locale'
import { productMenu, ui } from '@/content/site'

function l(locale: string, zh: string, en: string, tw?: string) {
  if (locale === 'zh') return zh
  if (locale === 'zh-TW') return tw || zh
  return en
}

const SOCIAL_LINKS = [
  {
    name: 'X (Twitter)',
    href: 'https://x.com/sportliveapi',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/sportliveapi',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@sportliveapi',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'zh'

  return (
    <footer className="border-t-4 border-brand-primary bg-brand-ink text-white">
      <div className="container-custom py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Column 1: Brand + Singapore Entity + Official Socials (5 cols) */}
          <div className="lg:col-span-5">
            <Link href={`/${locale}`} className="inline-block">
              <img src="/logo.svg" alt="SportLive API" className="h-9 w-auto" />
            </Link>
            <p className="mt-4 max-w-md text-xs leading-6 text-white/75 sm:text-sm">
              {l(
                locale,
                '由新加坡 SLA Limited 运营的全球体育赛事直播流技术基础设施。提供单场赛事直播线路 API、100+ 全球体育频道与 OBS 直播流机器人。',
                'Global sports streaming infrastructure operated by SLA Limited (Singapore). Delivering Live Match Lines API, 100+ Global Sports Channels, and OBS Streamer Bot.',
                '由新加坡 SLA Limited 營運的全球體育賽事直播流技術基礎設施。提供單場賽事直播線路 API、100+ 全球體育頻道與 OBS 直播流機器人。'
              )}
            </p>

            {/* Official Social Media Links */}
            <div className="mt-5">
              <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-white/50">
                {l(
                  locale,
                  '关注官方社媒 · 每日赛程与产品动态',
                  'FOLLOW OFFICIAL SOCIALS · DAILY UPDATES',
                  '關注官方社媒 · 每日賽程與產品動態'
                )}
              </p>
              <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="inline-flex items-center gap-2 border border-white/20 bg-white/[0.05] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:border-brand-primary hover:bg-brand-primary hover:text-white"
                  >
                    {social.icon}
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Core Products (3 cols) */}
          <div className="lg:col-span-3">
            <p className="flex items-center gap-2 text-sm font-bold text-white">
              <span className="inline-block h-3 w-1.5 -skew-x-[10deg] bg-brand-primary" />
              {tx(locale, ui.products)}
            </p>
            <ul className="mt-4 space-y-2.5">
              {productMenu.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/${locale}/products/${item.slug}`}
                    className="block text-sm text-white/75 transition-colors hover:text-brand-primary"
                  >
                    {tx(locale, item.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Developer & Resources (2 cols) */}
          <div className="lg:col-span-2">
            <p className="flex items-center gap-2 text-sm font-bold text-white">
              <span className="inline-block h-3 w-1.5 -skew-x-[10deg] bg-brand-primary" />
              {l(locale, '开发者与案例', 'Developers', '開發者與案例')}
            </p>
            <ul className="mt-4 space-y-2.5">
              {[
                ['coverage', ui.coverage],
                ['docs', ui.docs],
                ['customers', ui.customers],
                ['faq', ui.faq],
              ].map(([path, label]) => (
                <li key={path as string}>
                  <Link
                    href={`/${locale}/${path}`}
                    className="text-sm text-white/75 transition-colors hover:text-brand-primary"
                  >
                    {tx(locale, label as typeof ui.coverage)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company & Compliance (2 cols) */}
          <div className="lg:col-span-2">
            <p className="flex items-center gap-2 text-sm font-bold text-white">
              <span className="inline-block h-3 w-1.5 -skew-x-[10deg] bg-brand-primary" />
              {l(locale, '公司与条款', 'Company & Legal', '公司與條款')}
            </p>
            <ul className="mt-4 space-y-2.5">
              {[
                ['about', ui.about],
                ['contact', ui.contact],
                ['privacy', ui.privacy],
                ['disclaimer', ui.disclaimer],
              ].map(([path, label]) => (
                <li key={path as string}>
                  <Link
                    href={`/${locale}/${path}`}
                    className="text-sm text-white/75 transition-colors hover:text-brand-primary"
                  >
                    {tx(locale, label as typeof ui.coverage)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-white/10 bg-black/30">
        <div className="container-custom flex flex-col justify-between gap-2 py-4 text-xs text-white/55 sm:flex-row sm:items-center">
          <div>
            © {new Date().getFullYear()} <strong className="font-semibold text-white/80">SLA Limited</strong> (Singapore) · SportLive API. All rights reserved.
          </div>
          <div className="font-mono text-[11px] text-white/50">
            {l(
              locale,
              '支持结算：USDT · USDC · BTC · ETH',
              'Billing: USDT · USDC · BTC · ETH',
              '支援結算：USDT · USDC · BTC · ETH'
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
