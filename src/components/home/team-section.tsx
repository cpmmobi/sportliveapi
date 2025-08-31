'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Users, Clock, Globe, Award } from 'lucide-react'
import { useTranslations } from 'next-intl'

const achievementIcons = [Clock, Users, Globe, Award]
const companyCount = 3

export default function TeamSection() {
  const t = useTranslations()
  
  return (
    <section className="space-section bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-responsive-h2 font-bold text-brand-gray-800 mb-6">
                {t('team.title')}
              </h2>
              <div className="prose prose-lg text-brand-gray-400">
                <p className="text-body-lg leading-relaxed">
                  {t.rich('team.description1', {
                    strong: (chunks) => <strong className="text-brand-primary">{chunks}</strong>
                  })}
                </p>
                <p className="text-body-lg leading-relaxed mt-4">
                  {t.rich('team.description2', {
                    strong: (chunks) => <strong className="text-brand-primary">{chunks}</strong>
                  })}
                </p>
              </div>
            </div>

            {/* Company Experience */}
            <div className="space-y-4">
              <h3 className="text-h3 font-semibold text-brand-gray-800">
                {t('team.companiesTitle')}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {Array.from({ length: companyCount }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-brand-gray-50 rounded-lg border-l-4 border-brand-primary"
                  >
                    <div>
                      <h4 className="font-semibold text-brand-gray-800">{t(`team.companies.${index}.name`)}</h4>
                      <p className="text-body text-brand-gray-400">{t(`team.companies.${index}.description`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="default" size="lg" asChild>
                <Link href="/contact">
                  {t('team.consultButton')}
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/about">
                  {t('team.learnMoreButton')}
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Achievements */}
          <div className="space-y-6">
            {achievementIcons.map((IconComponent, index) => (
              <Card key={index} className="group hover:shadow-card-hover transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-light rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-h4 font-semibold text-brand-gray-800 mb-2">
                        {t(`team.achievements.${index}.title`)}
                      </h4>
                      <p className="text-body text-brand-gray-400 mb-1">
                        {t(`team.achievements.${index}.description`)}
                      </p>
                      <p className="text-small text-brand-primary font-medium">
                        {t(`team.achievements.${index}.detail`)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 pt-16 border-t border-brand-gray-100">
          <div className="text-center mb-12">
            <h3 className="text-responsive-h3 font-bold text-brand-gray-800 mb-4">
              {t('team.whyChooseUs.title')}
            </h3>
            <p className="text-body text-brand-gray-400">
              {t('team.whyChooseUs.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-primary mb-2">{t('team.stats.0.number')}</div>
              <div className="text-body text-brand-gray-400">{t('team.stats.0.label')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-primary mb-2">{t('team.stats.1.number')}</div>
              <div className="text-body text-brand-gray-400">{t('team.stats.1.label')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-primary mb-2">{t('team.stats.2.number')}</div>
              <div className="text-body text-brand-gray-400">{t('team.stats.2.label')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-primary mb-2">{t('team.stats.3.number')}</div>
              <div className="text-body text-brand-gray-400">{t('team.stats.3.label')}</div>
            </div>
          </div>
        </div>

        {/* Service Commitment */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-brand-secondary to-brand-primary text-white">
            <CardContent className="p-8 lg:p-12 text-center">
              <h3 className="text-responsive-h3 font-bold mb-4">
                {t('team.serviceCommitment.title')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                <div>
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="font-semibold mb-1">{t('team.serviceCommitment.items.0.title')}</div>
                  <div className="text-white/80 text-small">{t('team.serviceCommitment.items.0.description')}</div>
                </div>
                <div>
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="font-semibold mb-1">{t('team.serviceCommitment.items.1.title')}</div>
                  <div className="text-white/80 text-small">{t('team.serviceCommitment.items.1.description')}</div>
                </div>
                <div>
                  <div className="text-2xl mb-2">🔧</div>
                  <div className="font-semibold mb-1">{t('team.serviceCommitment.items.2.title')}</div>
                  <div className="text-white/80 text-small">{t('team.serviceCommitment.items.2.description')}</div>
                </div>
                <div>
                  <div className="text-2xl mb-2">🌍</div>
                  <div className="font-semibold mb-1">{t('team.serviceCommitment.items.3.title')}</div>
                  <div className="text-white/80 text-small">{t('team.serviceCommitment.items.3.description')}</div>
                </div>
              </div>
              <Button variant="accent" size="lg" asChild>
                <Link href="/contact">
                  {t('team.experienceButton')}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}