'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import MainLayout from '@/components/layout/main-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { MessageCircle, Settings, Code, CreditCard, Users } from 'lucide-react'
import Link from 'next/link'

// FAQ分类配置 - 使用翻译系统
const faqCategories = [
  {
    id: 'general',
    icon: MessageCircle,
  },
  {
    id: 'technical',
    icon: Code,
  },
  {
    id: 'pricing',
    icon: CreditCard,
  },
  {
    id: 'support',
    icon: Users,
  },
]

// 基于翻译文件的FAQ配置
const faqItemsConfig = [
  { id: 1, category: 'general', featured: true },
  { id: 2, category: 'general', featured: true },
  { id: 3, category: 'general', featured: true },
  { id: 4, category: 'technical', featured: true },
  { id: 5, category: 'technical', featured: false },
  { id: 6, category: 'technical', featured: false },
  { id: 7, category: 'pricing', featured: false },
  { id: 8, category: 'pricing', featured: true },
  { id: 9, category: 'pricing', featured: false },
  { id: 10, category: 'support', featured: false },
]

type Props = {
  params: { locale: string }
}

export default function FAQClientPage({ params: { locale } }: Props) {
  const t = useTranslations('faq')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // 基于翻译文件和配置生成FAQ项目
  const faqItems = faqItemsConfig.map(config => ({
    id: config.id,
    question: t(`items.${config.id}.question`),
    answer: t(`items.${config.id}.answer`),
    category: config.category,
    featured: config.featured
  }))

  // 过滤FAQ项目
  const filteredFAQs = faqItems.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesCategory
  })

  const featuredFAQs = filteredFAQs.filter(faq => faq.featured)

  return (
    <MainLayout>
      <div className="space-section bg-white">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-responsive-h1 font-bold text-brand-gray-800 mb-6">
              {t('title')}
            </h1>
            <p className="text-body-lg text-brand-gray-400 max-w-3xl mx-auto mb-8">
              {t('description')}
            </p>
          </div>

          {/* Categories */}
          <div className="mb-16">
            <h2 className="text-h2 font-bold text-brand-gray-800 mb-8 text-center">{t('categories.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedCategory === 'all' ? 'ring-2 ring-brand-primary bg-brand-primary/5' : ''
                }`}
                onClick={() => setSelectedCategory('all')}
              >
                <CardContent className="p-4 text-center">
                  <Settings className="h-8 w-8 mx-auto mb-2 text-brand-primary" />
                  <h3 className="font-semibold text-brand-gray-800 mb-1">{t('categories.all.name')}</h3>
                  <p className="text-small text-brand-gray-400">{t('categories.all.count')}</p>
                </CardContent>
              </Card>
              
              {faqCategories.map((category) => {
                const IconComponent = category.icon
                return (
                  <Card 
                    key={category.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedCategory === category.id ? 'ring-2 ring-brand-primary bg-brand-primary/5' : ''
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <IconComponent className="h-8 w-8 mx-auto mb-2 text-brand-primary" />
                      <h3 className="font-semibold text-brand-gray-800 mb-1">{t(`categories.${category.id}.name`)}</h3>
                      <p className="text-small text-brand-gray-400">{t(`categories.${category.id}.count`)}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Featured FAQs */}
          {featuredFAQs.length > 0 && selectedCategory === 'all' && (
            <div className="mb-16">
              <h2 className="text-h2 font-bold text-brand-gray-800 mb-8">{t('featured.title')}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {featuredFAQs.slice(0, 4).map((faq) => (
                  <Card key={faq.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                          Q
                        </div>
                        <h3 className="font-semibold text-brand-gray-800 flex-1">
                          {t(`items.${faq.id}.question`)}
                        </h3>
                      </div>
                      <div className="ml-9">
                        <p className="text-brand-gray-600 text-small line-clamp-3 mb-3">
                          {t(`items.${faq.id}.answer`).split('\n')[0]}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-brand-gray-100 text-brand-gray-600 px-2 py-1 rounded text-xs">
                            {t(`categories.${faq.category}.name`)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* FAQ List */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-h2 font-bold text-brand-gray-800">
                {selectedCategory === 'all' ? t('list.allQuestions') : 
                 t(`categories.${selectedCategory}.name`) || t('list.questionList')}
              </h2>
              <span className="text-brand-gray-400">
                {t('list.foundCount', { count: filteredFAQs.length })}
              </span>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {filteredFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id.toString()} className="border border-brand-gray-200 rounded-lg">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-brand-gray-50 rounded-lg">
                      <div className="flex items-start gap-3 text-left">
                        <div className="w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center text-xs font-bold mt-1 flex-shrink-0">
                          Q
                        </div>
                        <span className="font-semibold text-brand-gray-800">{t(`items.${faq.id}.question`)}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="ml-9 space-y-4">
                        <div className="prose prose-sm max-w-none text-brand-gray-600">
                          {t(`items.${faq.id}.answer`).split('\n').map((line, index) => {
                            if (line.startsWith('**') && line.endsWith('**')) {
                              return (
                                <h4 key={index} className="font-semibold text-brand-gray-800 mt-4 mb-2">
                                  {line.replace(/\*\*/g, '')}
                                </h4>
                              )
                            }
                            if (line.startsWith('```') || line.endsWith('```')) {
                              return null
                            }
                            if (line.trim().startsWith('{') || line.trim().startsWith('"') || line.trim() === '') {
                              return <pre key={index} className="bg-brand-gray-50 p-2 rounded text-xs font-mono">{line}</pre>
                            }
                            if (line.startsWith('- ') || line.startsWith('1. ') || line.match(/^\d+\./)) {
                              return <p key={index} className="mb-1">{line}</p>
                            }
                            return <p key={index} className="mb-2">{line}</p>
                          })}
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-brand-gray-100">
                          <span className="bg-brand-gray-100 text-brand-gray-600 px-2 py-1 rounded text-xs">
                            {t(`categories.${faq.category}.name`)}
                          </span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-brand-secondary to-brand-primary text-white">
              <CardContent className="p-8">
                <h3 className="text-h3 font-bold mb-4">{t('cta.title')}</h3>
                <p className="text-body-lg mb-6 opacity-90">
                  {t('cta.description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/contact">
                    <Button variant="secondary" size="lg">
                      {t('cta.button')}
                    </Button>
                  </Link>
                  <div className="flex items-center gap-4 text-small opacity-90">
                    <span>{t('cta.email')}</span>
                    <span>{t('cta.workingHours')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}