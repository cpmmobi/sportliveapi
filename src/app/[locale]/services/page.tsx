'use client'

// 强制动态渲染
export const dynamic = 'force-dynamic'

import React from 'react'
import { useTranslations } from 'next-intl'
import MainLayout from '@/components/layout/main-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  Globe, 
  Zap, 
  Shield, 
  Clock, 
  Monitor, 
  Smartphone, 
  Code, 
  ArrowRight,
  Play,
  Link as LinkIcon,
  Database,
  CheckCircle
} from 'lucide-react'

// Service features with icons only - text comes from translations
const serviceFeatureIcons = [Globe, Zap, Shield, Clock]

// Technical specs count for iteration
const technicalSpecsCount = 4

// Integration steps count for iteration
const integrationStepsCount = 4

// Use case icons only - text comes from translations
const useCaseIcons = [Smartphone, Monitor, Database, Code]

export default function ServicesPage() {
  const t = useTranslations('services')
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="space-section bg-gradient-to-br from-brand-secondary to-brand-primary text-white">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-responsive-h2 font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-body-lg leading-relaxed mb-8">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" asChild>
                <Link href="/contact">
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="space-section bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-responsive-h3 font-bold text-brand-gray-800 mb-4">
              {t('features.title')}
            </h2>
            <p className="text-body text-brand-gray-400 max-w-2xl mx-auto">
              {t('features.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceFeatureIcons.map((IconComponent, index) => (
              <Card key={index} className="text-center group hover:shadow-card-hover transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-light rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-h4 font-semibold text-brand-gray-800 mb-3">
                    {t(`serviceFeatures.${index}.title`)}
                  </h3>
                  <p className="text-body text-brand-gray-400 mb-4">
                    {t(`serviceFeatures.${index}.description`)}
                  </p>
                  <ul className="text-small text-brand-gray-400 space-y-1">
                    {[0, 1, 2].map((detailIdx) => (
                      <li key={detailIdx} className="flex items-center justify-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-brand-success" />
                        <span>{t(`serviceFeatures.${index}.details.${detailIdx}`)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Three Service Types */}
      <section className="space-section bg-brand-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-responsive-h3 font-bold text-brand-gray-800 mb-4">
              {t('solutions.title')}
            </h2>
            <p className="text-body text-brand-gray-400 max-w-2xl mx-auto">
              {t('solutions.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* RTMP推流服务 */}
            <Card className="group hover:shadow-card-hover transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-primary to-brand-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <ArrowRight className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-h3">{t('solutions.rtmp.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-body text-brand-gray-400 text-center">
                  {t('solutions.rtmp.description')}
                </p>
                
                <div className="bg-brand-gray-800 rounded-lg p-4 font-mono text-small">
                  <div className="text-brand-light">rtmp://your-domain.com/live/stream</div>
                  <div className="text-brand-gray-400 mt-2">← 我们推送到此地址</div>
                  <div className="text-green-400 mt-3">GET /api/matches</div>
                  <div className="text-brand-gray-400 mt-1">→ 查询比赛和推流地址对应</div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-brand-gray-800">{t('solutions.rtmp.useCases.title')}</h4>
                  <ul className="space-y-2 text-small text-brand-gray-400">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-brand-success mt-0.5" />
                      <span>{t('solutions.rtmp.useCases.items.0')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-brand-success mt-0.5" />
                      <span>{t('solutions.rtmp.useCases.items.1')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-brand-success mt-0.5" />
                      <span>{t('solutions.rtmp.useCases.items.2')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-brand-success mt-0.5" />
                      <span>{t('solutions.rtmp.useCases.items.3')}</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-brand-gray-800">{t('solutions.rtmp.features.title')}</h4>
                  <ul className="space-y-1 text-small text-brand-gray-400">
                    <li>• {t('solutions.rtmp.features.items.0')}</li>
                    <li>• {t('solutions.rtmp.features.items.1')}</li>
                    <li>• {t('solutions.rtmp.features.items.2')}</li>
                    <li>• {t('solutions.rtmp.features.items.3')}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* 直播链接服务 */}
            <Card className="group hover:shadow-card-hover transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-accent to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <LinkIcon className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-h3">{t('solutions.streaming.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-body text-brand-gray-400 text-center">
                  {t('solutions.streaming.description')}
                </p>
                
                <div className="bg-brand-gray-800 rounded-lg p-4 font-mono text-small">
                  <div className="text-brand-light">https://stream.sportliveapi.com/</div>
                  <div className="text-brand-accent">live/12345.m3u8</div>
                  <div className="text-brand-gray-400 mt-2">← 直接播放链接</div>
                  <div className="text-green-400 mt-3">GET /api/matches</div>
                  <div className="text-brand-gray-400 mt-1">→ 查询比赛和直播链接对应</div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-brand-gray-800">{t('solutions.streaming.useCases.title')}</h4>
                  <ul className="space-y-2 text-small text-brand-gray-400">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-brand-success mt-0.5" />
                      <span>{t('solutions.streaming.useCases.items.0')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-brand-success mt-0.5" />
                      <span>{t('solutions.streaming.useCases.items.1')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-brand-success mt-0.5" />
                      <span>{t('solutions.streaming.useCases.items.2')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-brand-success mt-0.5" />
                      <span>{t('solutions.streaming.useCases.items.3')}</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-brand-gray-800">{t('streamingFormats.title')}</h4>
                  <ul className="space-y-1 text-small text-brand-gray-400">
                    <li>• {t('streamingFormats.items.0')}</li>
                    <li>• {t('streamingFormats.items.1')}</li>
                    <li>• {t('streamingFormats.items.2')}</li>
                    <li>• {t('streamingFormats.items.3')}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>


          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="space-section bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-responsive-h3 font-bold text-brand-gray-800 mb-4">
              {t('specs.title')}
            </h2>
            <p className="text-body text-brand-gray-400 max-w-2xl mx-auto">
              {t('specs.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: technicalSpecsCount }, (_, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-h4 text-center">{t(`technicalSpecs.${index}.category`)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[0, 1, 2, 3].map((itemIdx) => (
                      <li key={itemIdx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-brand-success" />
                        <span className="text-body text-brand-gray-400">{t(`technicalSpecs.${index}.items.${itemIdx}`)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="space-section bg-brand-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-responsive-h3 font-bold text-brand-gray-800 mb-4">
              {t('scenarios.title')}
            </h2>
            <p className="text-body text-brand-gray-400 max-w-2xl mx-auto">
              {t('scenarios.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCaseIcons.map((IconComponent, index) => (
              <Card key={index} className="group hover:shadow-card-hover transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-light rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-h4 font-semibold text-brand-gray-800 mb-3">
                        {t(`useCases.${index}.title`)}
                      </h3>
                      <p className="text-body text-brand-gray-400 mb-4">
                        {t(`useCases.${index}.description`)}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {[0, 1, 2, 3].map((featureIdx) => (
                          <div key={featureIdx} className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3 text-brand-success" />
                            <span className="text-small text-brand-gray-400">{t(`useCases.${index}.features.${featureIdx}`)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Process */}
      <section className="space-section bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-responsive-h3 font-bold text-brand-gray-800 mb-4">
              {t('integration.title')}
            </h2>
            <p className="text-body text-brand-gray-400 max-w-2xl mx-auto">
              {t('integration.description')}
            </p>
          </div>

          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-brand-gray-100 hidden lg:block"></div>
            <div className="absolute top-8 left-0 w-4/5 h-0.5 bg-brand-primary hidden lg:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: integrationStepsCount }, (_, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-light rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl relative z-10">
                    {index + 1}
                  </div>
                  <h3 className="text-h4 font-semibold text-brand-gray-800 mb-2">
                    {t(`integrationSteps.${index}.title`)}
                  </h3>
                  <p className="text-body text-brand-gray-400">
                    {t(`integrationSteps.${index}.description`)}
                  </p>
                  <div className="text-small text-brand-primary font-medium">
                    {t(`integrationSteps.${index}.duration`)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="space-section bg-gradient-to-r from-brand-secondary to-brand-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-responsive-h3 font-bold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto mb-8">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link href="/contact">
                {t('cta.contact')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/docs">
                {t('cta.documentation')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}