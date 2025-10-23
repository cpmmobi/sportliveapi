'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FormField, FormLabel, FormMessage, FormDescription } from '@/components/ui/form'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trackFormSubmit, trackServiceInterest, trackContactPreference } from '@/lib/analytics'
import { getUserSourceInfo } from '@/lib/user-source-tracker'
import { useTranslations } from 'next-intl'

// 简化的表单验证Schema - 保护客户隐私，只收集必要信息
const createFormSchema = (t: any) => z.object({
  email: z.string().email(t('validation.emailInvalid')),
  contactMethod: z.string()
    .min(1, t('validation.contactMethodRequired'))
    .refine((value) => {
      // Telegram格式：@开头的用户名
      const telegramPattern = /^@[a-zA-Z0-9_]{4,31}$/
      // QQ格式：5-11位数字
      const qqPattern = /^[1-9][0-9]{4,10}$/
      return telegramPattern.test(value) || qqPattern.test(value)
    }, {
      message: 'Telegram格式：@username（5-32位字符），QQ格式：5-11位数字'
    }),
  sportsInterests: z.array(z.string()).min(1, t('validation.sportsRequired')),
  useCase: z.string().min(1, t('validation.useCaseRequired')),
  streamerType: z.string().optional(), // 主播规模
  platformInfo: z.string().optional(), // 平台信息
  requirements: z.string().optional() // 详细需求
})

type FormData = z.infer<ReturnType<typeof createFormSchema>>

export default function SimpleContactForm() {
  const t = useTranslations('contact');
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const formSchema = createFormSchema(t)
  
  const sportsOptions = [
    { value: 'football', label: t('sports.football') },
    { value: 'basketball', label: t('sports.basketball') },
    { value: 'baseball', label: t('sports.baseball') },
    { value: 'tennis', label: t('sports.tennis') },
    { value: 'esports', label: t('sports.esports') },
    { value: 'pingpong', label: t('sports.pingpong') },
    { value: 'badminton', label: t('sports.badminton') },
    { value: 'volleyball', label: t('sports.volleyball') },
    { value: 'cricket', label: t('sports.cricket') },
    { value: 'snooker', label: t('sports.snooker') },
    { value: 'racing', label: t('sports.racing') },
    { value: 'hockey', label: t('sports.hockey') },
  ]

  const integrationOptions = [
    { value: 'website_app', label: t('useCase.websiteApp') },
    { value: 'obs_streaming', label: t('useCase.obsStreaming') },
    { value: 'both_scenarios', label: t('useCase.bothScenarios') },
  ]

  const streamerTypeOptions = [
    { value: 'team', label: t('streamerType.team') },
    { value: 'individual', label: t('streamerType.individual') },
  ]
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      contactMethod: '',
      sportsInterests: [],
      useCase: '',
      streamerType: '',
      platformInfo: '',
      requirements: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      console.log('Form submission data:', data)
      
      // 获取用户来源信息
      const userSource = getUserSourceInfo()
      console.log('User source info:', userSource)
      console.log('Current URL:', window.location.href)
      console.log('Referrer:', document.referrer)
      
      // 调试URL参数解析
      const urlParams = new URLSearchParams(window.location.search);
      console.log('UTM parameters:')
      console.log('  utm_source:', urlParams.get('utm_source'))
      console.log('  utm_medium:', urlParams.get('utm_medium'))
      console.log('  utm_campaign:', urlParams.get('utm_campaign'))
      console.log('  utm_term:', urlParams.get('utm_term'))
      
      // 调试语言信息
      console.log('Browser language info:')
      console.log('  Primary language:', navigator.language)
      console.log('  All languages:', navigator.languages)
      
      // 调试引荐信息
      if (document.referrer) {
        console.log('Referrer info:')
        console.log('  Full URL:', document.referrer)
        try {
          const referrerUrl = new URL(document.referrer)
          console.log('  Domain:', referrerUrl.hostname)
          console.log('  Path:', referrerUrl.pathname)
          console.log('  Parameters:', referrerUrl.search)
        } catch (e) {
          console.log('  Parse failed:', e)
        }
      }
      
      // 追踪表单提交开始
      trackServiceInterest(data.useCase, data.sportsInterests.length)
      trackContactPreference(data.contactMethod)
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          userSource
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        setIsSubmitted(true)
        console.log('Form submitted successfully:', result.message)
        
        // 追踪表单提交成功
        trackFormSubmit('contact_form', true)
      } else {
        console.error('Form submission failed:', result.error)
        
        // 追踪表单提交失败
        trackFormSubmit('contact_form', false)
        alert(result.error || t('messages.submitError'))
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      
      // 追踪表单提交错误
      trackFormSubmit('contact_form', false)
      alert(t('messages.submitError'))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-brand-success rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-h2 font-bold text-brand-gray-800 mb-4">
              {t('success')}
            </h2>
            <p className="text-body text-brand-gray-400 mb-8">
              {t('successMessage')}
            </p>
            <div className="bg-brand-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-brand-gray-800 mb-2">{t('nextSteps.title')}</h3>
              <ul className="text-left text-body text-brand-gray-400 space-y-2">
                <li>• {t('nextSteps.step1')}</li>
                <li>• {t('nextSteps.step2')}</li>
                <li>• {t('nextSteps.step3')}</li>
                <li>• {t('nextSteps.step4')}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-h3 text-center">
            {t('title')}
          </CardTitle>
          
          {/* 隐私保护说明 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <div className="flex items-start space-x-3">
              <div className="text-blue-600 text-xl">🔒</div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">{t('privacy.title')}</h4>
                <p className="text-small text-blue-600">
                  {t('privacy.description')}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* 联系信息 */}
            <div className="space-y-4">
              <FormField>
                <FormLabel htmlFor="email">{t('name')} *</FormLabel>
                <Input
                  id="email"
                  type="email"
                  {...form.register('email')}
                  placeholder="your@company.com"
                />
                {form.formState.errors.email && (
                  <FormMessage>{form.formState.errors.email.message}</FormMessage>
                )}
              </FormField>

              <FormField>
                <FormLabel htmlFor="contactMethod">{t('contactMethod')} *</FormLabel>
                <Input
                  id="contactMethod"
                  {...form.register('contactMethod')}
                  placeholder="@username 或 12345678"
                />
                <FormDescription>
                  {t('contactMethodDescription')}
                </FormDescription>
                {form.formState.errors.contactMethod && (
                  <FormMessage>{form.formState.errors.contactMethod.message}</FormMessage>
                )}
              </FormField>
            </div>

            {/* 业务需求 */}
            <div className="space-y-4">
              <FormField>
                <FormLabel>{t('sportsInterests.label')} *</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {sportsOptions.map((sport) => (
                    <label
                      key={sport.value}
                      className={cn(
                        "flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors",
                        form.watch('sportsInterests')?.includes(sport.value)
                          ? "bg-brand-primary/10 border-brand-primary"
                          : "bg-white border-brand-gray-200 hover:border-brand-gray-300"
                      )}
                    >
                      <input
                        type="checkbox"
                        value={sport.value}
                        {...form.register('sportsInterests')}
                        className="sr-only"
                      />
                      <span className="text-small font-medium">{sport.label}</span>
                    </label>
                  ))}
                </div>
                {form.formState.errors.sportsInterests && (
                  <FormMessage>{form.formState.errors.sportsInterests.message}</FormMessage>
                )}
              </FormField>

              <FormField>
                <FormLabel>{t('useCase.label')} *</FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {integrationOptions.map((option) => (
                    <label
                      key={option.value}
                      className={cn(
                        "flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors",
                        form.watch('useCase') === option.value
                          ? "bg-brand-primary/10 border-brand-primary"
                          : "bg-white border-brand-gray-200 hover:border-brand-gray-300"
                      )}
                    >
                      <input
                        type="radio"
                        value={option.value}
                        {...form.register('useCase')}
                        className="sr-only"
                      />
                      <span className="text-small font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
                {form.formState.errors.useCase && (
                  <FormMessage>{form.formState.errors.useCase.message}</FormMessage>
                )}
              </FormField>

              {/* 关联问题1：主播规模（仅当选择"仅网络主播在OBS直播使用"时显示） */}
              {form.watch('useCase') === 'obs_streaming' && (
                <FormField>
                  <FormLabel>{t('streamerType.label')} *</FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    {streamerTypeOptions.map((option) => (
                      <label
                        key={option.value}
                        className={cn(
                          "flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors",
                          form.watch('streamerType') === option.value
                            ? "bg-brand-primary/10 border-brand-primary"
                            : "bg-white border-brand-gray-200 hover:border-brand-gray-300"
                        )}
                      >
                        <input
                          type="radio"
                          value={option.value}
                          {...form.register('streamerType')}
                          className="sr-only"
                        />
                        <span className="text-small font-medium">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {/* 主播类型提示 */}
                  {(form.watch('streamerType') === 'individual' || form.watch('streamerType') === 'team') && (
                    <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-small">
                        {t('individualWarning')}
                      </p>
                    </div>
                  )}
                </FormField>
              )}

              {/* 关联问题2：平台信息（当选择"网站/APP接入赛事直播"或"以上两种场景都有"时显示） */}
              {(form.watch('useCase') === 'website_app' || form.watch('useCase') === 'both_scenarios') && (
                <FormField>
                  <FormLabel>{t('platformInfo.label')}</FormLabel>
                  <Input
                    {...form.register('platformInfo')}
                    placeholder={t('platformInfoPlaceholder')}
                    className="mt-2"
                  />
                </FormField>
              )}

              <FormField>
                <FormLabel htmlFor="requirements">{t('requirements.label')}</FormLabel>
                <textarea
                    id="requirements"
                    {...form.register('requirements')}
                    placeholder={t('requirementsPlaceholder')}
                    className="w-full p-3 border border-brand-gray-200 rounded-lg resize-none h-24 text-small"
                  />
              </FormField>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('submitting') : t('submit')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}