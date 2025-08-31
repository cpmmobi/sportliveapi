'use client'

import React from 'react'
import MainLayout from '@/components/layout/main-layout'
import SimpleContactForm from '@/components/contact/simple-contact-form'
import { Card, CardContent } from '@/components/ui/card'
import { useTranslations } from 'next-intl'

export default function ContactClientPage() {
  const t = useTranslations('contact')

  return (
    <MainLayout>
      <section className="space-section bg-brand-gray-50 min-h-screen">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-responsive-h2 font-bold text-brand-gray-800 mb-4">
              {t('title')}
            </h1>
            <p className="text-body-lg text-brand-gray-400 max-w-3xl mx-auto mb-8">
              {t('description')}
            </p>

            {/* Service Promise */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">🚀</div>
                  <h3 className="font-semibold text-brand-gray-800 mb-2">{t('promises.quickTrial.title')}</h3>
                  <p className="text-small text-brand-gray-400">{t('promises.quickTrial.description')}</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">🎯</div>
                  <h3 className="font-semibold text-brand-gray-800 mb-2">{t('promises.freeDemo.title')}</h3>
                  <p className="text-small text-brand-gray-400">{t('promises.freeDemo.description')}</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">💡</div>
                  <h3 className="font-semibold text-brand-gray-800 mb-2">{t('promises.professionalQuote.title')}</h3>
                  <p className="text-small text-brand-gray-400">{t('promises.professionalQuote.description')}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Form */}
          <SimpleContactForm />

          {/* Additional Info */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-h3 font-semibold text-brand-gray-800 mb-4">
                  {t('whyChooseUs.title')}
                </h3>
                <ul className="space-y-3 text-body text-brand-gray-400">
                  <li className="flex items-start space-x-3">
                    <span className="text-brand-success">✓</span>
                    <span>{t('whyChooseUs.reasons.0.title')}</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-brand-success">✓</span>
                    <span>{t('whyChooseUs.reasons.1.title')}</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-brand-success">✓</span>
                    <span>{t('whyChooseUs.reasons.2.title')}</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-brand-success">✓</span>
                    <span>{t('whyChooseUs.reasons.3.title')}</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-brand-success">✓</span>
                    <span>{t('whyChooseUs.reasons.4.title')}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-h3 font-semibold text-brand-gray-800 mb-4">
                  {t('serviceProcess.title')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center text-small font-medium">1</div>
                    <div>
                      <h4 className="font-semibold text-brand-gray-800">{t('serviceProcess.steps.0.title')}</h4>
                      <p className="text-small text-brand-gray-400">{t('serviceProcess.steps.0.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center text-small font-medium">2</div>
                    <div>
                      <h4 className="font-semibold text-brand-gray-800">{t('serviceProcess.steps.1.title')}</h4>
                      <p className="text-small text-brand-gray-400">{t('serviceProcess.steps.1.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center text-small font-medium">3</div>
                    <div>
                      <h4 className="font-semibold text-brand-gray-800">{t('serviceProcess.steps.2.title')}</h4>
                      <p className="text-small text-brand-gray-400">{t('serviceProcess.steps.2.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center text-small font-medium">4</div>
                    <div>
                      <h4 className="font-semibold text-brand-gray-800">{t('serviceProcess.steps.3.title')}</h4>
                      <p className="text-small text-brand-gray-400">{t('serviceProcess.steps.3.description')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Alternative */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-brand-secondary to-brand-primary rounded-xl p-8 text-white">
              <h3 className="text-h3 font-semibold mb-4">
                {t('urgentContact.title')}
              </h3>
              <p className="text-body-lg mb-6">
                {t('urgentContact.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center space-x-2">
                  <span>📧</span>
                  <span>{t('urgentContact.email')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🕒</span>
                  <span>{t('urgentContact.workingHours')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}