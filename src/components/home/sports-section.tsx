'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { useTranslations } from 'next-intl'

const sportsIcons = [
  '⚽', '🏀', '⚾', '🎾', '🎮', '🏓', '🏸', '🏐', '🏏', '🎱', '🏎️', '🏒'
]

export default function SportsSection() {
  const t = useTranslations()
  
  return (
    <section className="space-section bg-brand-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-responsive-h2 font-bold text-brand-gray-800 mb-4">
            {t('sports.title')}
          </h2>
          <p className="text-body-lg text-brand-gray-400 max-w-3xl mx-auto">
            {t('sports.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sportsIcons.map((icon, index) => (
            <Card key={index} className="group hover:shadow-card-hover transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {icon}
                </div>
                <h3 className="text-h4 font-semibold text-brand-gray-800 mb-2">
                  {t(`sports.categories.${index}.name`)}
                </h3>
                <p className="text-body text-brand-gray-400 mb-4">
                  {t(`sports.categories.${index}.description`)}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {Array.from({ length: parseInt(t(`sports.categories.${index}.leaguesCount`)) || 3 }).map((_, leagueIndex) => (
                    <span
                      key={leagueIndex}
                      className="px-2 py-1 bg-brand-primary/10 text-brand-primary text-small rounded-full"
                    >
                      {t(`sports.categories.${index}.leagues.${leagueIndex}`)}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technical Services */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-responsive-h3 font-bold text-brand-gray-800 mb-4">
              {t('sports.technicalServices.title')}
            </h3>
            <p className="text-body text-brand-gray-400">
              {t('sports.technicalServices.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="text-center group hover:border-brand-primary/20 transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-light rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <h4 className="text-h4 font-semibold text-brand-gray-800 mb-4">
                  {t('sports.technicalServices.rtmp.title')}
                </h4>
                <p className="text-body text-brand-gray-400 mb-6">
                  {t('sports.technicalServices.rtmp.description')}
                </p>
                <div className="bg-brand-gray-50 rounded-lg p-4 font-mono text-small text-left">
                  <div className="text-brand-primary">rtmp://your-domain.com/live/</div>
                  <div className="text-brand-gray-400 mt-1">{t('sports.technicalServices.rtmp.pushComment')}</div>
                  <div className="text-brand-primary mt-2">GET /api/matches</div>
                  <div className="text-brand-gray-400 mt-1">{t('sports.technicalServices.rtmp.apiComment')}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center group hover:border-brand-primary/20 transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-accent to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <h4 className="text-h4 font-semibold text-brand-gray-800 mb-4">
                  {t('sports.technicalServices.streaming.title')}
                </h4>
                <p className="text-body text-brand-gray-400 mb-6">
                  {t('sports.technicalServices.streaming.description')}
                </p>
                <div className="bg-brand-gray-50 rounded-lg p-4 font-mono text-small text-left">
                  <div className="text-brand-primary">https://stream.sportliveapi.com/</div>
                  <div className="text-brand-gray-400 mt-1">live/12345.m3u8</div>
                  <div className="text-brand-primary mt-2">GET /api/matches</div>
                  <div className="text-brand-gray-400 mt-1">{t('sports.technicalServices.streaming.apiComment')}</div>
                </div>
              </CardContent>
            </Card>


          </div>
        </div>
      </div>
    </section>
  )
}