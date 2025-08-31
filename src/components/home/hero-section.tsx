'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Globe, Zap, Shield } from 'lucide-react'
import { trackButtonClick } from '@/lib/analytics'
import { useTranslations } from 'next-intl'

export default function HeroSection() {
  const pathname = usePathname()
  const currentLocale = pathname.split('/')[1] || 'zh'
  const t = useTranslations()

  const features = [
    {
      icon: Globe,
      title: t('features.global_coverage.title'),
      description: t('features.global_coverage.description')
    },
    {
      icon: Zap,
      title: t('features.fast_transmission.title'),
      description: t('features.fast_transmission.description')
    },
    {
      icon: Shield,
      title: t('features.quality_assurance.title'),
      description: t('features.quality_assurance.description')
    }
  ]
  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-brand-secondary via-brand-primary to-brand-light overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      <div className="absolute inset-0 bg-dots"></div>
      
      {/* Content */}
      <div className="container-custom relative z-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Main Content */}
          <div className="text-white space-y-6 animate-fade-in">
            <div className="space-y-3">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-small font-medium">
                <span className="w-2 h-2 bg-brand-success rounded-full mr-2 animate-pulse"></span>
                {t('hero.badge')}
              </div>
              
              <h1 className="text-responsive-hero font-bold leading-tight">
                {t('hero.title')}
                <span className="block text-brand-light">{t('hero.subtitle')}</span>
              </h1>
              
              <p className="text-body-lg text-white/90 max-w-xl">
                {t('hero.description')}
                <span className="block mt-2 font-medium">{t('hero.disclaimer')}</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="accent" size="lg" asChild className="group">
                <Link 
                  href={`/${currentLocale}/contact`}
                  onClick={() => trackButtonClick(t('hero.cta_primary'), 'hero')}
                >
                  {t('hero.cta_primary')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              

            </div>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-4 animate-slide-up">
            {/* API Demo */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
              <h3 className="text-h4 font-semibold text-white mb-4">{t('hero.api_demo_title')}</h3>
              <div className="bg-black/30 rounded-lg p-4 font-mono text-small">
                <div className="text-brand-light">GET /api/matches</div>
                <div className="text-white/60 mt-2">
                  {`{
  "matches": [
    {
      "match_id": "12345",
      "sport": "football",
      "league": "Premier League",
      "status": "live",
      "stream_urls": {
        "rtmp": "rtmp://stream.sportliveapi.com/...",
              "hls": "https://stream.sportliveapi.com/..."
      }
    }
  ]
}`}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 group hover:bg-white/20 transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <feature.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{feature.title}</h4>
                      <p className="text-small text-white/80">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}