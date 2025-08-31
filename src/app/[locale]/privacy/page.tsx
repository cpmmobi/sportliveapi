import React from 'react'
import Link from 'next/link'
import MainLayout from '@/components/layout/main-layout'
import { useTranslations } from 'next-intl'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { getTranslations } = await import('next-intl/server')
  const t = await getTranslations({ locale: params.locale, namespace: 'privacy' })
  
  return {
    title: t('title') + ' - SportLiveAPI',
    description: t('description'),
  }
}

export default function PrivacyPage() {
  const t = useTranslations('privacy')
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="space-section bg-gradient-to-br from-brand-secondary to-brand-primary text-white">
        <div className="container-custom text-center">
          <h1 className="text-responsive-h2 font-bold mb-6">{t('title')}</h1>
          <p className="text-body-lg max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
          <p className="text-body text-white/80 mt-4">{t('lastUpdated')}</p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="space-section bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">
          
            {/* Introduction */}
            <section>
              <h2 className="text-h3 font-bold text-brand-gray-800 mb-6">{t('introduction.title')}</h2>
              <p className="text-body text-brand-gray-400 leading-relaxed">
                {t('introduction.content')}
              </p>
            </section>

            {/* Data Collection */}
            <section>
              <h2 className="text-h3 font-bold text-brand-gray-800 mb-6">{t('dataCollection.title')}</h2>
              <p className="text-body text-brand-gray-400 leading-relaxed mb-6">
                {t('dataCollection.description')}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-h4 font-semibold text-brand-gray-800 mb-3">{t('dataCollection.provided.title')}</h3>
                  <ul className="list-disc list-inside text-body text-brand-gray-400 space-y-2 ml-4">
                    <li>{t('dataCollection.provided.items.0')}</li>
                    <li>{t('dataCollection.provided.items.1')}</li>
                    <li>{t('dataCollection.provided.items.2')}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-h4 font-semibold text-brand-gray-800 mb-3">{t('dataCollection.automatic.title')}</h3>
                  <ul className="list-disc list-inside text-body text-brand-gray-400 space-y-2 ml-4">
                    <li>{t('dataCollection.automatic.items.0')}</li>
                    <li>{t('dataCollection.automatic.items.1')}</li>
                    <li>{t('dataCollection.automatic.items.2')}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Usage */}
            <section>
              <h2 className="text-h3 font-bold text-brand-gray-800 mb-6">{t('dataUsage.title')}</h2>
              <p className="text-body text-brand-gray-400 leading-relaxed mb-4">
                {t('dataUsage.description')}
              </p>
              <ul className="list-disc list-inside text-body text-brand-gray-400 space-y-2 ml-4">
                <li>{t('dataUsage.purposes.0')}</li>
                <li>{t('dataUsage.purposes.1')}</li>
                <li>{t('dataUsage.purposes.2')}</li>
                <li>{t('dataUsage.purposes.3')}</li>
                <li>{t('dataUsage.purposes.4')}</li>
                <li>{t('dataUsage.purposes.5')}</li>
              </ul>
            </section>

            {/* Data Sharing */}
            <section>
              <h2 className="text-h3 font-bold text-brand-gray-800 mb-6">{t('dataSharing.title')}</h2>
              <p className="text-body text-brand-gray-400 leading-relaxed mb-4">
                {t('dataSharing.description')}
              </p>
              <ul className="list-disc list-inside text-body text-brand-gray-400 space-y-2 ml-4">
                <li>{t('dataSharing.conditions.0')}</li>
                <li>{t('dataSharing.conditions.1')}</li>
                <li>{t('dataSharing.conditions.2')}</li>
                <li>{t('dataSharing.conditions.3')}</li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-h3 font-bold text-brand-gray-800 mb-6">{t('dataSecurity.title')}</h2>
              <p className="text-body text-brand-gray-400 leading-relaxed">
                {t('dataSecurity.description')}
              </p>
            </section>

            {/* User Rights */}
            <section>
              <h2 className="text-h3 font-bold text-brand-gray-800 mb-6">{t('userRights.title')}</h2>
              <p className="text-body text-brand-gray-400 leading-relaxed mb-4">
                {t('userRights.description')}
              </p>
              <ul className="list-disc list-inside text-body text-brand-gray-400 space-y-2 ml-4">
                <li>{t('userRights.rights.0')}</li>
                <li>{t('userRights.rights.1')}</li>
                <li>{t('userRights.rights.2')}</li>
                <li>{t('userRights.rights.3')}</li>
                <li>{t('userRights.rights.4')}</li>
                <li>{t('userRights.rights.5')}</li>
              </ul>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-h3 font-bold text-brand-gray-800 mb-6">{t('dataRetention.title')}</h2>
              <p className="text-body text-brand-gray-400 leading-relaxed">
                {t('dataRetention.description')}
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-h3 font-bold text-brand-gray-800 mb-6">{t('childrenPrivacy.title')}</h2>
              <p className="text-body text-brand-gray-400 leading-relaxed">
                {t('childrenPrivacy.description')}
              </p>
            </section>

            {/* International Transfer */}
            <section>
              <h2 className="text-h3 font-bold text-brand-gray-800 mb-6">{t('dataTransfer.title')}</h2>
              <p className="text-body text-brand-gray-400 leading-relaxed">
                {t('dataTransfer.description')}
              </p>
            </section>

            {/* Policy Updates */}
            <section>
              <h2 className="text-h3 font-bold text-brand-gray-800 mb-6">{t('policyUpdates.title')}</h2>
              <p className="text-body text-brand-gray-400 leading-relaxed">
                {t('policyUpdates.description')}
              </p>
            </section>

            {/* Contact Us */}
            <section>
              <h2 className="text-h3 font-bold text-brand-gray-800 mb-6">{t('contact.title')}</h2>
              <p className="text-body text-brand-gray-400 leading-relaxed mb-4">
                {t('contact.description')}
              </p>
              <div className="bg-brand-gray-50 rounded-lg p-6">
                <p className="text-body text-brand-gray-400">
                  <strong className="text-brand-gray-800">SportLiveAPI Team</strong><br />
                  {t('contact.email')}<br />
                  {t('contact.website')}: <Link href="/contact" className="text-brand-primary hover:text-brand-secondary underline">Contact Us Page</Link>
                </p>
              </div>
            </section>

          </div>
        </div>
      </section>
    </MainLayout>
  )
}