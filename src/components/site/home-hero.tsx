'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Mark } from '@/components/site/shell'

export type ProductSlide = {
  id: string
  audience: string
  name: string
  lede: string
  points: string[]
  links: { href: string; label: string }[]
  detailHref: string
}

export function ProductShowcase({
  eyebrow,
  title,
  lede,
  detailLabel,
  slides,
}: {
  eyebrow: string
  title: string
  lede: string
  detailLabel: string
  slides: ProductSlide[]
}) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const slide = slides[index]

  useEffect(() => {
    if (paused || slides.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, 6500)
    return () => window.clearInterval(timer)
  }, [paused, slides.length])

  return (
    <section
      id="products"
      className="relative overflow-hidden bg-brand-primary text-white"
      style={{
        backgroundImage: 'linear-gradient(120deg, #FC0078 0%, #DF006B 55%, #9E004D 100%)',
      }}
      aria-roledescription="carousel"
      aria-label={title}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 hidden h-full w-80 -skew-x-[10deg] bg-black/15 lg:block"
      />
      <div className="container-custom relative py-16 lg:py-24">
        <p className="inline-flex items-center gap-2 bg-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          <Mark light />
          {eyebrow}
        </p>
        <h2 className="mt-4 max-w-3xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-white/90">{lede}</p>

        <div className="mt-10 flex flex-wrap gap-3" role="tablist">
          {slides.map((item, itemIndex) => {
            const active = itemIndex === index
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`group relative px-5 py-3 text-left text-sm font-semibold transition-all ${
                  active
                    ? 'bg-white text-brand-primary shadow-[4px_4px_0_0_#141414]'
                    : 'border border-white/40 bg-black/15 text-white hover:border-white hover:bg-black/25'
                }`}
                onClick={() => setIndex(itemIndex)}
              >
                <span className="flex items-center gap-2 text-xs font-medium opacity-75">
                  <span
                    className={`inline-block h-2 w-2 -skew-x-[10deg] ${active ? 'bg-brand-primary' : 'bg-white/70'}`}
                  />
                  {item.audience}
                </span>
                <span className="mt-1 block text-base font-bold">{item.name}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-widest text-white/70">0{index + 1} · {slide.audience}</p>
            <h3 className="mt-2 max-w-xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">{slide.name}</h3>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/90">{slide.lede}</p>
          </div>
          <div className="lg:col-span-5">
            <div className="border-t-4 border-brand-ink bg-white p-6 text-brand-ink shadow-[0_24px_60px_-15px_rgba(0,0,0,0.35)] sm:p-7">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
                <Mark />
                {slide.name}
              </p>
              <ul className="mt-5 space-y-4">
                {slide.points.map((point) => (
                  <li key={point} className="border-l-2 border-brand-primary pl-4 text-base font-medium leading-6">
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-brand-line pt-5">
                {slide.links.filter((link) => link.href !== slide.detailHref).length > 0 ? (
                  <div className="mb-4 flex flex-wrap gap-4">
                    {slide.links
                      .filter((link) => link.href !== slide.detailHref)
                      .map((link) => (
                        <Link key={link.href} href={link.href} className="text-sm font-semibold text-brand-primary hover:underline">
                          {link.label} →
                        </Link>
                      ))}
                  </div>
                ) : null}
                <Link
                  href={slide.detailHref}
                  className="inline-flex items-center gap-2 bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-[3px_3px_0_0_#141414] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark"
                >
                  <span>{detailLabel}</span>
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
