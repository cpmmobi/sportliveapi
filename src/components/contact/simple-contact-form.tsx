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

// 简化的表单验证Schema - 保护客户隐私，只收集必要信息
const formSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  contactMethod: z.string()
    .min(1, '请输入Telegram或QQ联系方式')
    .refine((value) => {
      // Telegram格式：@开头的用户名
      const telegramPattern = /^@[a-zA-Z0-9_]{5,32}$/
      // QQ格式：5-11位数字
      const qqPattern = /^[1-9][0-9]{4,10}$/
      return telegramPattern.test(value) || qqPattern.test(value)
    }, {
      message: 'Telegram格式：@username（5-32位字符），QQ格式：5-11位数字'
    }),
  sportsInterests: z.array(z.string()).min(1, '请至少选择一种体育项目'),
  integrationType: z.string().min(1, '请选择接入方式'),
  requirements: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

const sportsOptions = [
  { value: 'football', label: '⚽ 足球' },
  { value: 'basketball', label: '🏀 篮球' },
  { value: 'baseball', label: '⚾ 棒球' },
  { value: 'tennis', label: '🎾 网球' },
  { value: 'esports', label: '🎮 电竞' },
  { value: 'pingpong', label: '🏓 乒乓球' },
  { value: 'badminton', label: '🏸 羽毛球' },
  { value: 'volleyball', label: '🏐 排球' },
  { value: 'cricket', label: '🏏 板球' },
  { value: 'snooker', label: '🎱 斯诺克' },
  { value: 'racing', label: '🏎️ 赛车' },
  { value: 'hockey', label: '🏒 冰球' },
]

const integrationOptions = [
  { value: 'rtmp', label: 'RTMP推流接入' },
  { value: 'playback', label: '直播链接接入' },
  { value: 'api', label: 'API接口集成' },
  { value: 'consultation', label: '先咨询了解' },
]

export default function SimpleContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      contactMethod: '',
      sportsInterests: [],
      integrationType: '',
      requirements: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      console.log('提交表单数据:', data)
      
      // 追踪表单提交开始
      trackServiceInterest(data.integrationType, data.sportsInterests.length)
      trackContactPreference(data.contactMethod)
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      
      if (result.success) {
        setIsSubmitted(true)
        console.log('✅ 表单提交成功:', result.message)
        
        // 追踪表单提交成功
        trackFormSubmit('contact_form', true)
      } else {
        console.error('❌ 表单提交失败:', result.error)
        
        // 追踪表单提交失败
        trackFormSubmit('contact_form', false)
        alert(result.error || '提交失败，请稍后重试')
      }
    } catch (error) {
      console.error('💥 提交表单时出错:', error)
      
      // 追踪表单提交错误
      trackFormSubmit('contact_form', false)
      alert('网络错误，请检查网络连接后重试')
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
              提交成功！
            </h2>
            <p className="text-body text-brand-gray-400 mb-8">
              感谢您的咨询，我们的专业团队将在24小时内与您联系，为您提供定制化的解决方案和报价。
            </p>
            <div className="bg-brand-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-brand-gray-800 mb-2">接下来会发生什么？</h3>
              <ul className="text-left text-body text-brand-gray-400 space-y-2">
                <li>• 我们的技术顾问将联系您了解详细需求</li>
                <li>• 为您制定专属的技术方案和报价</li>
                <li>• 安排技术演示和试用</li>
                <li>• 提供完整的集成支持</li>
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
            获取试用和报价
          </CardTitle>
          
          {/* 隐私保护说明 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <div className="flex items-start space-x-3">
              <div className="text-blue-600 text-xl">🔒</div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">隐私保护承诺</h4>
                <p className="text-small text-blue-600">
                  我们重视您的隐私，仅收集必要的联系信息。您的信息将被严格保密，仅用于提供技术服务。
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
                <FormLabel htmlFor="email">邮箱地址 *</FormLabel>
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
                <FormLabel htmlFor="contactMethod">Telegram 或 QQ *</FormLabel>
                <Input
                  id="contactMethod"
                  {...form.register('contactMethod')}
                  placeholder="@username 或 12345678"
                />
                <FormDescription>
                  Telegram格式：@username（如@alice_dev），QQ格式：数字号码（如12345678）
                </FormDescription>
                {form.formState.errors.contactMethod && (
                  <FormMessage>{form.formState.errors.contactMethod.message}</FormMessage>
                )}
              </FormField>
            </div>

            {/* 业务需求 */}
            <div className="space-y-4">
              <FormField>
                <FormLabel>感兴趣的体育项目 *</FormLabel>
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
                <FormLabel>服务需求 *</FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {integrationOptions.map((option) => (
                    <label
                      key={option.value}
                      className={cn(
                        "flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors",
                        form.watch('integrationType') === option.value
                          ? "bg-brand-primary/10 border-brand-primary"
                          : "bg-white border-brand-gray-200 hover:border-brand-gray-300"
                      )}
                    >
                      <input
                        type="radio"
                        value={option.value}
                        {...form.register('integrationType')}
                        className="sr-only"
                      />
                      <span className="text-small font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
                {form.formState.errors.integrationType && (
                  <FormMessage>{form.formState.errors.integrationType.message}</FormMessage>
                )}
              </FormField>

              <FormField>
                <FormLabel htmlFor="requirements">详细需求说明（可选）</FormLabel>
                <textarea
                  id="requirements"
                  {...form.register('requirements')}
                  placeholder="请描述您的具体需求、预期流量、技术栈等..."
                  className="w-full p-3 border border-brand-gray-200 rounded-lg resize-none h-24 text-small"
                />
              </FormField>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? '提交中...' : '获取试用和报价'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}