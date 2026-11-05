'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormLabel, FormMessage, FormDescription } from '@/components/ui/form'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trackFormSubmit, trackServiceInterest, trackContactPreference } from '@/lib/analytics'
import { getUserSourceInfo } from '@/lib/user-source-tracker'

// 表单验证Schema
const formSchema = z.object({
  // 第一步：基本信息
  companyName: z.string().min(1, '请输入公司名称'),
  contactName: z.string().min(1, '请输入联系人姓名'),
  position: z.string().min(1, '请输入职位'),
  email: z.string().email('请输入有效的邮箱地址'),
  phone: z.string().min(1, '请输入电话号码'),
  
  // 第二步：业务需求
  sportsInterests: z.array(z.string()).min(1, '请至少选择一种体育项目'),
  integrationType: z.string().min(1, '请选择接入方式'),
  targetAudience: z.string().min(1, '请描述目标用户群体'),
  concurrentViewers: z.string().min(1, '请选择并发观看人数范围'),
  existingProductUrl: z.string().optional(),
  
  // 第三步：技术信息
  techStack: z.string().min(1, '请输入技术栈类型'),
  needApi: z.boolean(),
  launchTimeline: z.string().min(1, '请选择预计上线时间'),
  specialRequirements: z.string().optional(),
  
  // 第四步：商务需求
  budgetRange: z.string().min(1, '请选择预算范围'),
  cooperationModel: z.string().min(1, '请选择合作模式'),
  otherRequirements: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

const steps = [
  { id: 1, title: '基本信息', description: '公司和联系人信息' },
  { id: 2, title: '业务需求', description: '您的业务需求和目标' },
  { id: 3, title: '技术信息', description: '技术栈和集成需求' },
  { id: 4, title: '商务需求', description: '预算和合作方式' },
]

const sportsOptions = [
  '足球', '篮球', '棒球', '网球', '电竞', 
  '乒乓球', '羽毛球', '排球', '板球', '斯诺克'
]

const integrationTypes = [
  { value: 'rtmp', label: 'RTMP推流' },
  { value: 'stream', label: '直播链接' },
  { value: 'both', label: '两者皆有' },
]

const viewerRanges = [
  { value: '1-1000', label: '1-1,000人' },
  { value: '1000-10000', label: '1,000-10,000人' },
  { value: '10000-100000', label: '10,000-100,000人' },
  { value: '100000+', label: '100,000人以上' },
]

const budgetRanges = [
  { value: '1000-5000', label: '$1,000-$5,000/月' },
  { value: '5000-15000', label: '$5,000-$15,000/月' },
  { value: '15000-50000', label: '$15,000-$50,000/月' },
  { value: '50000+', label: '$50,000以上/月' },
]

const cooperationModels = [
  { value: 'monthly', label: '按月订阅' },
  { value: 'quarterly', label: '按季度订阅' },
  { value: 'yearly', label: '按年订阅' },
  { value: 'custom', label: '定制化合作' },
]

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sportsInterests: [],
      needApi: false,
    },
  })

  const { watch, setValue, trigger } = form

  const handleNext = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep)
    const isValid = await trigger(fieldsToValidate)
    
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 1:
        return ['companyName', 'contactName', 'position', 'email', 'phone'] as (keyof FormData)[]
      case 2:
        return ['sportsInterests', 'integrationType', 'targetAudience', 'concurrentViewers'] as (keyof FormData)[]
      case 3:
        return ['techStack', 'needApi', 'launchTimeline', 'specialRequirements'] as (keyof FormData)[]
      case 4:
        return ['budgetRange', 'cooperationModel'] as (keyof FormData)[]
      default:
        return []
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      console.log('提交表单数据:', data)
      
      // 获取用户来源信息
      const userSource = getUserSourceInfo()
      console.log('🔍 多步骤表单用户来源信息:', userSource)
      
      // 调试语言信息
      console.log('🌐 浏览器语言信息:')
      console.log('  主要语言:', navigator.language)
      console.log('  所有语言:', navigator.languages)
      
      // 追踪表单提交开始
      trackServiceInterest(data.integrationType, data.sportsInterests.length)
      
      // 这里调用实际的API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          formType: 'multi_step',  // 标识这是多步骤表单
          userSource
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        setIsSubmitted(true)
        console.log('✅ 表单提交成功:', result.message)
        
        // 追踪表单提交成功
        trackFormSubmit('multi_step_form', true)
      } else {
        console.error('❌ 表单提交失败:', result.error)
        
        // 追踪表单提交失败
        trackFormSubmit('multi_step_form', false)
        alert(result.error || '提交失败，请稍后重试')
      }
    } catch (error) {
      console.error('💥 提交表单时出错:', error)
      
      // 追踪表单提交错误
      trackFormSubmit('multi_step_form', false)
      alert('网络错误，请检查网络连接后重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSportsToggle = (sport: string) => {
    const current = watch('sportsInterests') || []
    const updated = current.includes(sport)
      ? current.filter(s => s !== sport)
      : [...current, sport]
    setValue('sportsInterests', updated)
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-brand-success rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-h2 font-bold text-brand-gray-800 mb-4">
            提交成功！
          </h2>
          <p className="text-body text-brand-gray-400 mb-8">
            感谢您的咨询，我们的专业团队将在24小时内与您联系，为您提供定制化的解决方案。
          </p>
          <div className="bg-brand-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-brand-gray-800 mb-2">接下来会发生什么？</h3>
            <ul className="text-left text-body text-brand-gray-400 space-y-2">
              <li>• 我们的技术顾问将分析您的需求</li>
              <li>• 为您制定专属的技术方案</li>
              <li>• 提供详细的报价和服务说明</li>
              <li>• 安排技术演示和对接</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-small font-medium transition-all duration-200",
                currentStep >= step.id
                  ? "bg-brand-primary text-white"
                  : "bg-brand-gray-100 text-brand-gray-400"
              )}>
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.id
                )}
              </div>
              <div className="ml-3 hidden sm:block">
                <div className={cn(
                  "text-body font-medium",
                  currentStep >= step.id ? "text-brand-primary" : "text-brand-gray-400"
                )}>
                  {step.title}
                </div>
                <div className="text-small text-brand-gray-400">
                  {step.description}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "flex-1 h-px mx-4 transition-all duration-200",
                  currentStep > step.id ? "bg-brand-primary" : "bg-brand-gray-100"
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h3">
            {steps[currentStep - 1].title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: 基本信息 */}
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField>
                    <FormLabel htmlFor="companyName">公司名称 *</FormLabel>
                    <Input
                      id="companyName"
                      {...form.register('companyName')}
                      placeholder="请输入公司名称"
                    />
                    {form.formState.errors.companyName && (
                      <FormMessage>{form.formState.errors.companyName.message}</FormMessage>
                    )}
                  </FormField>

                  <FormField>
                    <FormLabel htmlFor="contactName">联系人姓名 *</FormLabel>
                    <Input
                      id="contactName"
                      {...form.register('contactName')}
                      placeholder="请输入联系人姓名"
                    />
                    {form.formState.errors.contactName && (
                      <FormMessage>{form.formState.errors.contactName.message}</FormMessage>
                    )}
                  </FormField>

                  <FormField>
                    <FormLabel htmlFor="position">职位 *</FormLabel>
                    <Input
                      id="position"
                      {...form.register('position')}
                      placeholder="请输入职位"
                    />
                    {form.formState.errors.position && (
                      <FormMessage>{form.formState.errors.position.message}</FormMessage>
                    )}
                  </FormField>

                  <FormField>
                    <FormLabel htmlFor="email">邮箱 *</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      {...form.register('email')}
                      placeholder="请输入邮箱地址"
                    />
                    {form.formState.errors.email && (
                      <FormMessage>{form.formState.errors.email.message}</FormMessage>
                    )}
                  </FormField>

                  <FormField className="md:col-span-2">
                    <FormLabel htmlFor="phone">电话 *</FormLabel>
                    <Input
                      id="phone"
                      {...form.register('phone')}
                      placeholder="请输入电话号码"
                    />
                    {form.formState.errors.phone && (
                      <FormMessage>{form.formState.errors.phone.message}</FormMessage>
                    )}
                  </FormField>
                </div>
              )}

              {/* Step 2: 业务需求 */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <FormField>
                    <FormLabel>感兴趣的体育项目 *</FormLabel>
                    <FormDescription>请选择您需要的体育项目（可多选）</FormDescription>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-2">
                      {sportsOptions.map((sport) => (
                        <button
                          key={sport}
                          type="button"
                          onClick={() => handleSportsToggle(sport)}
                          className={cn(
                            "p-3 rounded-lg border text-small font-medium transition-all duration-200",
                            watch('sportsInterests')?.includes(sport)
                              ? "bg-brand-primary text-white border-brand-primary"
                              : "bg-white text-brand-gray-400 border-brand-gray-100 hover:border-brand-primary"
                          )}
                        >
                          {sport}
                        </button>
                      ))}
                    </div>
                    {form.formState.errors.sportsInterests && (
                      <FormMessage>{form.formState.errors.sportsInterests.message}</FormMessage>
                    )}
                  </FormField>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField>
                      <FormLabel>预期接入方式 *</FormLabel>
                      <div className="space-y-2 mt-2">
                        {integrationTypes.map((type) => (
                          <label key={type.value} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              {...form.register('integrationType')}
                              value={type.value}
                              className="w-4 h-4 text-brand-primary"
                            />
                            <span className="text-body">{type.label}</span>
                          </label>
                        ))}
                      </div>
                      {form.formState.errors.integrationType && (
                        <FormMessage>{form.formState.errors.integrationType.message}</FormMessage>
                      )}
                    </FormField>

                    <FormField>
                      <FormLabel>预计并发观看人数 *</FormLabel>
                      <div className="space-y-2 mt-2">
                        {viewerRanges.map((range) => (
                          <label key={range.value} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              {...form.register('concurrentViewers')}
                              value={range.value}
                              className="w-4 h-4 text-brand-primary"
                            />
                            <span className="text-body">{range.label}</span>
                          </label>
                        ))}
                      </div>
                      {form.formState.errors.concurrentViewers && (
                        <FormMessage>{form.formState.errors.concurrentViewers.message}</FormMessage>
                      )}
                    </FormField>
                  </div>

                  <FormField>
                    <FormLabel htmlFor="targetAudience">目标用户群体描述 *</FormLabel>
                    <textarea
                      id="targetAudience"
                      {...form.register('targetAudience')}
                      placeholder="请描述您的目标用户群体，例如：体育爱好者、专业分析师等"
                      className="input min-h-[100px] resize-none"
                    />
                    {form.formState.errors.targetAudience && (
                      <FormMessage>{form.formState.errors.targetAudience.message}</FormMessage>
                    )}
                  </FormField>

                  <FormField>
                    <FormLabel htmlFor="existingProductUrl">现有产品/网站链接</FormLabel>
                    <Input
                      id="existingProductUrl"
                      {...form.register('existingProductUrl')}
                      placeholder="请输入您现有产品或网站的链接（可选）"
                    />
                  </FormField>
                </div>
              )}

              {/* Step 3: 技术信息 */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField>
                      <FormLabel htmlFor="techStack">技术栈类型 *</FormLabel>
                      <Input
                        id="techStack"
                        {...form.register('techStack')}
                        placeholder="例如：React, Vue, iOS, Android, Unity等"
                      />
                      {form.formState.errors.techStack && (
                        <FormMessage>{form.formState.errors.techStack.message}</FormMessage>
                      )}
                    </FormField>

                    <FormField>
                      <FormLabel htmlFor="launchTimeline">预计上线时间 *</FormLabel>
                      <select
                        id="launchTimeline"
                        {...form.register('launchTimeline')}
                        className="input"
                      >
                        <option value="">请选择预计上线时间</option>
                        <option value="1month">1个月内</option>
                        <option value="3months">3个月内</option>
                        <option value="6months">6个月内</option>
                        <option value="1year">1年内</option>
                        <option value="flexible">时间灵活</option>
                      </select>
                      {form.formState.errors.launchTimeline && (
                        <FormMessage>{form.formState.errors.launchTimeline.message}</FormMessage>
                      )}
                    </FormField>
                  </div>

                  <FormField>
                    <FormLabel className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...form.register('needApi')}
                        className="w-4 h-4 text-brand-primary"
                      />
                      <span>需要API接口</span>
                    </FormLabel>
                    <FormDescription>
                      如果您需要通过API获取比赛列表和流地址，请勾选此项
                    </FormDescription>
                  </FormField>

                  <FormField>
                    <FormLabel htmlFor="specialRequirements">特殊技术需求</FormLabel>
                    <textarea
                      id="specialRequirements"
                      {...form.register('specialRequirements')}
                      placeholder="请描述任何特殊的技术需求或要求（可选）"
                      className="input min-h-[100px] resize-none"
                    />
                  </FormField>
                </div>
              )}

              {/* Step 4: 商务需求 */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField>
                      <FormLabel>项目预算范围 *</FormLabel>
                      <div className="space-y-2 mt-2">
                        {budgetRanges.map((range) => (
                          <label key={range.value} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              {...form.register('budgetRange')}
                              value={range.value}
                              className="w-4 h-4 text-brand-primary"
                            />
                            <span className="text-body">{range.label}</span>
                          </label>
                        ))}
                      </div>
                      {form.formState.errors.budgetRange && (
                        <FormMessage>{form.formState.errors.budgetRange.message}</FormMessage>
                      )}
                    </FormField>

                    <FormField>
                      <FormLabel>希望的合作模式 *</FormLabel>
                      <div className="space-y-2 mt-2">
                        {cooperationModels.map((model) => (
                          <label key={model.value} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              {...form.register('cooperationModel')}
                              value={model.value}
                              className="w-4 h-4 text-brand-primary"
                            />
                            <span className="text-body">{model.label}</span>
                          </label>
                        ))}
                      </div>
                      {form.formState.errors.cooperationModel && (
                        <FormMessage>{form.formState.errors.cooperationModel.message}</FormMessage>
                      )}
                    </FormField>
                  </div>

                  <FormField>
                    <FormLabel htmlFor="otherRequirements">其他需求说明</FormLabel>
                    <textarea
                      id="otherRequirements"
                      {...form.register('otherRequirements')}
                      placeholder="请说明任何其他需求或特殊要求（可选）"
                      className="input min-h-[100px] resize-none"
                    />
                  </FormField>

                  {/* 支付方式说明 */}
                  <div className="bg-brand-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-brand-gray-800 mb-3">支付方式说明</h4>
                    <div className="space-y-2 text-body text-brand-gray-400">
                      <div className="flex items-center space-x-2">
                        <span className="text-brand-success">✓</span>
                        <span>接受加密货币支付（BTC、ETH、USDT、USDC等）</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-brand-success">✓</span>
                        <span>支持按月/季度/年度订阅</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-brand-success">✓</span>
                        <span>加密货币支付保护您的商业隐私</span>
                      </div>
                      <p className="text-small mt-3">
                        具体付费流程将在商务沟通中确定
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>上一步</span>
                </Button>

                {currentStep < steps.length ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center space-x-2"
                  >
                    <span>下一步</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>提交中...</span>
                      </>
                    ) : (
                      <>
                        <span>提交申请</span>
                        <Check className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}