'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { addUTMToLink } from '@/lib/utm-persistence'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  const pathname = usePathname()
  const currentLocale = pathname.split('/')[1] || 'zh'

  const navigation = {
    main: [
      { name: t('navigation.services'), href: `/${currentLocale}/services` },
      { name: t('navigation.about'), href: `/${currentLocale}/about` },
    ],
    resources: [
      { name: t('navigation.faq'), href: `/${currentLocale}/faq` },
      { name: t('navigation.disclaimer'), href: `/${currentLocale}/disclaimer` },
      { name: t('navigation.privacy'), href: `/${currentLocale}/privacy` },
    ],
    support: [
      { name: t('navigation.contact'), href: `/${currentLocale}/contact` },
    ],
  }

  const sports = [
    t('sports.items.football'), t('sports.items.basketball'), t('sports.items.baseball'), t('sports.items.tennis'),
    t('sports.items.esports'), t('sports.items.pingpong'), t('sports.items.badminton'), t('sports.items.volleyball'),
    t('sports.items.cricket'), t('sports.items.snooker'), t('sports.items.racing'), t('sports.items.hockey')
  ]

  return (
    <footer className="bg-brand-secondary text-white">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link href={`/${currentLocale}`} className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-light flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-bold">
                  Sport<span className="text-brand-light">LiveAPI</span>
                </span>
              </Link>
              <p className="text-white/80 text-body mb-6">
                {t('company.description')}
              </p>
              <Button variant="accent" asChild>
                <Link href={addUTMToLink(`/${currentLocale}/contact`)}>{t('company.cta')}</Link>
              </Button>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="text-h4 font-semibold mb-4">{t('sections.core_services')}</h3>
              <ul className="space-y-3">
                {navigation.main.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-white/80 hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-h4 font-semibold mb-4">{t('sections.resources')}</h3>
              <ul className="space-y-3">
                {navigation.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-white/80 hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-h4 font-semibold mb-4">{t('sections.support')}</h3>
              <ul className="space-y-3">
                {navigation.support.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-white/80 hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sports Coverage */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <h3 className="text-h4 font-semibold mb-4">{t('sports.title')}</h3>
            <div className="flex flex-wrap gap-3">
              {sports.map((sport, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/10 rounded-full text-small text-white/90"
                >
                  {sport}
                </span>
              ))}
            </div>
          </div>

          {/* Technical Services */}
          <div className="mt-8 pt-8 border-t border-white/20">
            <h3 className="text-h4 font-semibold mb-4">{t('technical_services.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">{t('technical_services.rtmp.title')}</h4>
                <p className="text-white/80 text-small">{t('technical_services.rtmp.description')}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">{t('technical_services.streaming.title')}</h4>
                <p className="text-white/80 text-small">{t('technical_services.streaming.description')}</p>
              </div>

            </div>
          </div>

          {/* Professional Team */}
          <div className="mt-8 pt-8 border-t border-white/20">
            <div className="bg-gradient-to-r from-brand-primary/20 to-brand-light/20 rounded-xl p-6">
              <h3 className="text-h3 font-semibold mb-3">{t('team.title')}</h3>
              <p className="text-white/90">
                {t('team.description')}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/80 text-small">
              {t('bottom.copyright')}
            </div>
            <div className="flex items-center space-x-6 text-small">
              <span className="text-white/80">
                {t('bottom.payment')}
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-brand-success rounded-full animate-pulse"></div>
                <span className="text-white/80">{t('bottom.status')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}