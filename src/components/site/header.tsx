'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Globe } from 'lucide-react'
import { siteLocales, tx } from '@/lib/locale'
import { productMenu, ui } from '@/content/site'

export default function Header() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'zh'
  const [open, setOpen] = useState<null | 'products' | 'lang' | 'mobile'>(null)
  const langRef = useRef<HTMLDivElement>(null)

  const [querySuffix, setQuerySuffix] = useState('')

  useEffect(() => {
    setOpen(null)
  }, [pathname])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setQuerySuffix(window.location.search + window.location.hash)
    }
  }, [pathname, open])

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (open === 'lang' && langRef.current && !langRef.current.contains(event.target as Node)) {
        setOpen(null)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open])

  const rest = pathname.split('/').slice(2).join('/')
  const link = (code: string) => `/${code}${rest ? `/${rest}` : ''}${querySuffix}`
  const currentLang = siteLocales.find((item) => item.code === locale) || siteLocales[siteLocales.length - 1]

  const itemClass = (active: boolean) =>
    `block px-2 py-2 text-sm font-medium transition-colors ${active ? 'text-brand-primary' : 'text-brand-ink hover:text-brand-primary'}`

  return (
    <header className="sticky top-0 z-50 border-b-2 border-brand-ink/10 bg-white/95 backdrop-blur">
      <div className="container-custom flex h-16 items-center gap-4">
        <Link href={`/${locale}`} className="shrink-0" aria-label="SportLive API">
          <img src="/logo.svg" alt="SportLive API" className="h-9 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setOpen('products')}
            onMouseLeave={() => setOpen(null)}
          >
            <button
              className={itemClass(pathname.includes('/products'))}
              aria-expanded={open === 'products'}
              onClick={() => setOpen(open === 'products' ? null : 'products')}
            >
              <span className="inline-flex items-center gap-1">
                {tx(locale, ui.products)}
                <ChevronDown className="h-3.5 w-3.5" />
              </span>
            </button>
            <div
              className={`absolute left-0 top-full min-w-[22rem] border border-brand-line border-t-2 border-t-brand-primary bg-white p-2 shadow-lg ${
                open === 'products' ? '' : 'invisible pointer-events-none'
              }`}
            >
              {productMenu.map((item) => (
                <Link key={item.slug} href={`/${locale}/products/${item.slug}`} className="group block px-3.5 py-3 hover:bg-brand-tint/60">
                  <span className="block text-sm font-semibold text-brand-ink group-hover:text-brand-primary">{tx(locale, item.name)}</span>
                  <span className="mt-1 block whitespace-nowrap text-xs leading-5 text-brand-muted">{tx(locale, item.blurb)}</span>
                </Link>
              ))}
            </div>
          </div>

          {[
            ['coverage', ui.coverage],
            ['docs', ui.docs],
            ['customers', ui.customers],
            ['faq', ui.faq],
          ].map(([path, label]) => (
            <Link
              key={path as string}
              href={`/${locale}/${path}`}
              className={itemClass(pathname.includes(`/${path}`))}
            >
              {tx(locale, label as typeof ui.customers)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-4 lg:flex">
          <div ref={langRef} className="relative">
            <button
              type="button"
              aria-expanded={open === 'lang'}
              onClick={() => setOpen(open === 'lang' ? null : 'lang')}
              className="inline-flex items-center gap-1.5 border border-brand-line bg-white px-3 py-1.5 text-xs font-medium text-brand-ink transition-colors hover:border-brand-primary hover:text-brand-primary"
            >
              <Globe className="h-3.5 w-3.5 text-brand-primary" />
              <span>{currentLang.label}</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open === 'lang' ? 'rotate-180' : ''}`} />
            </button>
            {open === 'lang' && (
              <div className="absolute right-0 top-full mt-1 max-h-80 w-44 overflow-auto border border-brand-line border-t-2 border-t-brand-primary bg-white py-1.5 shadow-lg">
                {siteLocales.map((item) => {
                  const active = item.code === locale
                  return (
                    <Link
                      key={item.code}
                      href={link(item.code)}
                      onClick={() => setOpen(null)}
                      className={`flex items-center justify-between px-3.5 py-2 text-xs transition-colors ${
                        active
                          ? 'bg-brand-tint font-semibold text-brand-primary'
                          : 'text-brand-ink hover:bg-brand-tint/50 hover:text-brand-primary'
                      }`}
                    >
                      <span>{item.label}</span>
                      {active ? <span className="h-1.5 w-1.5 -skew-x-[10deg] bg-brand-primary" /> : null}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
          <Link
            href={`/${locale}/contact`}
            className="bg-brand-primary px-4 py-2 text-sm font-semibold text-white shadow-[3px_3px_0_0_#141414] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark"
          >
            {tx(locale, ui.contact)}
          </Link>
        </div>

        <button className="ml-auto lg:hidden" aria-label="Menu" onClick={() => setOpen(open === 'mobile' ? null : 'mobile')}>
          {open === 'mobile' ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open === 'mobile' && (
        <div className="max-h-[80vh] overflow-auto border-t border-brand-line bg-white lg:hidden">
          <div className="container-custom space-y-6 py-6">
            <div>
              <p className="text-xs font-medium text-brand-muted">{tx(locale, ui.products)}</p>
              <div className="mt-2">
                {productMenu.map((item) => (
                  <Link key={item.slug} href={`/${locale}/products/${item.slug}`} className="block py-2 text-sm">
                    {tx(locale, item.name)}
                  </Link>
                ))}
              </div>
            </div>
            {[
              ['coverage', ui.coverage],
              ['docs', ui.docs],
              ['faq', ui.faq],
              ['customers', ui.customers],
              ['about', ui.about],
            ].map(([path, label]) => (
              <Link key={path as string} href={`/${locale}/${path}`} className="block text-sm">
                {tx(locale, label as typeof ui.customers)}
              </Link>
            ))}
            <div>
              <p className="mb-2 text-xs font-medium text-brand-muted">Language</p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {siteLocales.map((item) => (
                  <Link
                    key={item.code}
                    href={link(item.code)}
                    className={`border px-2.5 py-1.5 text-center ${
                      item.code === locale
                        ? 'border-brand-primary bg-brand-tint font-semibold text-brand-primary'
                        : 'border-brand-line text-brand-ink'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link href={`/${locale}/contact`} className="inline-flex bg-brand-primary px-4 py-2 text-sm font-semibold text-white">
              {tx(locale, ui.contact)}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
