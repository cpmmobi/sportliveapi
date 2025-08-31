'use client'

import React from 'react'
import MainLayout from '@/components/layout/main-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

type Props = {
  params: { locale: string }
}

export default function AboutClientPage({ params: { locale } }: Props) {
  const t = useTranslations('about')
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="space-section bg-gradient-to-br from-brand-secondary to-brand-primary text-white">
        <div className="container-custom text-center">
          <h1 className="text-responsive-h2 font-bold mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-body-lg max-w-3xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
        </div>
      </section>

      {/* Team Experience */}
      <section className="space-section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-responsive-h3 font-bold text-brand-gray-800 mb-6">
                {t('experience.title')}
              </h2>
              <div className="space-y-4 text-body text-brand-gray-400">
                <p>
                  {t('experience.description1')}
                </p>
                <p>
                  {t('experience.description2')}
                </p>
                <p>
                  {t('experience.description3')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-brand-primary mb-2">2014</div>
                  <div className="text-body text-brand-gray-400">{t('experience.stats.founded')}</div>
                </CardContent>
              </Card>
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-brand-primary mb-2">10+</div>
                    <div className="text-small text-brand-gray-400">{t('experience.stats.years')}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-brand-primary mb-2">50+</div>
                    <div className="text-small text-brand-gray-400">{t('experience.stats.members')}</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Background */}
      <section className="space-section bg-brand-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-responsive-h3 font-bold text-brand-gray-800 mb-4">
              {t('team.title')}
            </h2>
            <p className="text-body text-brand-gray-400 max-w-2xl mx-auto">
              {t('team.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center group hover:shadow-card-hover transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-200">
                  OF
                </div>
                <h3 className="text-h4 font-semibold text-brand-gray-800 mb-3">Onefootball</h3>
                <p className="text-body text-brand-gray-400 mb-4">
                  {t('team.companies.onefootball.description')}
                </p>
                <div className="text-small text-brand-primary">{t('team.companies.onefootball.expertise')}</div>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-card-hover transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-200">
                  {t('team.companies.zhibo8.icon')}
                </div>
                <h3 className="text-h4 font-semibold text-brand-gray-800 mb-3">{t('team.companies.zhibo8.name')}</h3>
                <p className="text-body text-brand-gray-400 mb-4">
                  {t('team.companies.zhibo8.description')}
                </p>
                <div className="text-small text-brand-primary">{t('team.companies.zhibo8.expertise')}</div>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-card-hover transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6 text-white text-xl font-bold group-hover:scale-110 transition-transform duration-200">
                  SR
                </div>
                <h3 className="text-h4 font-semibold text-brand-gray-800 mb-3">SportRadar</h3>
                <p className="text-body text-brand-gray-400 mb-4">
                  {t('team.companies.sportradar.description')}
                </p>
                <div className="text-small text-brand-primary">{t('team.companies.sportradar.expertise')}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Promise */}
      <section className="space-section bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-responsive-h3 font-bold text-brand-gray-800 mb-4">
              {t('promise.title')}
            </h2>
            <p className="text-body text-brand-gray-400 max-w-2xl mx-auto">
              {t('promise.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-h4 font-semibold text-brand-gray-800 mb-3">{t('promise.features.enterprise.title')}</h3>
              <p className="text-body text-brand-gray-400">
                {t('promise.features.enterprise.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-h4 font-semibold text-brand-gray-800 mb-3">{t('promise.features.response.title')}</h3>
              <p className="text-body text-brand-gray-400">
                {t('promise.features.response.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-h4 font-semibold text-brand-gray-800 mb-3">{t('promise.features.technical.title')}</h3>
              <p className="text-body text-brand-gray-400">
                {t('promise.features.technical.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-h4 font-semibold text-brand-gray-800 mb-3">{t('promise.features.global.title')}</h3>
              <p className="text-body text-brand-gray-400">
                {t('promise.features.global.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Expertise */}
      <section className="space-section bg-brand-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-responsive-h3 font-bold text-brand-gray-800 mb-6">
                {t('technical.title')}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-small">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-gray-800 mb-2">{t('technical.features.streaming.title')}</h4>
                    <p className="text-body text-brand-gray-400">
                      {t('technical.features.streaming.description')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-small">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-gray-800 mb-2">{t('technical.features.network.title')}</h4>
                    <p className="text-body text-brand-gray-400">
                      {t('technical.features.network.description')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-small">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-gray-800 mb-2">{t('technical.features.api.title')}</h4>
                    <p className="text-body text-brand-gray-400">
                      {t('technical.features.api.description')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-small">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-gray-800 mb-2">{t('technical.features.monitoring.title')}</h4>
                    <p className="text-body text-brand-gray-400">
                      {t('technical.features.monitoring.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Card className="bg-gradient-to-br from-brand-primary to-brand-light text-white">
                <CardContent className="p-8">
                  <h3 className="text-h3 font-bold mb-6">{t('technical.stats.title')}</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">89.5%</div>
                      <div className="text-white/80">{t('technical.stats.coverage')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">&lt;2s</div>
                      <div className="text-white/80">{t('technical.stats.latency')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">4K</div>
                      <div className="text-white/80">{t('technical.stats.quality')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">{t('technical.stats.team_value')}</div>
                      <div className="text-white/80">{t('technical.stats.team')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="space-section bg-white">
        <div className="container-custom text-center">
          <h2 className="text-responsive-h3 font-bold text-brand-gray-800 mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-body-lg text-brand-gray-400 max-w-2xl mx-auto mb-8">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg" asChild>
              <Link href={`/${locale}/contact`}>
                {t('cta.button')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}