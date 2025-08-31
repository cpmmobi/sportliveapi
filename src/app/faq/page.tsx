'use client'

import React, { useState } from 'react'
import MainLayout from '@/components/layout/main-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { MessageCircle, Settings, Code, CreditCard, Users } from 'lucide-react'
import Link from 'next/link'

// 模拟FAQ数据 - 实际项目中这将从CMS获取
const faqCategories = [
  {
    id: 'general',
    name: '服务概览',
    description: '了解我们的核心服务内容与技术特色',
    icon: MessageCircle,
    itemCount: 3,
  },
  {
    id: 'technical',
    name: '技术集成',
    description: 'API接口、RTMP推流等技术集成相关问题',
    icon: Code,
    itemCount: 3,
  },
  {
    id: 'pricing',
    name: '商务合作',
    description: '服务定价、付费方式、商务条款等相关问题',
    icon: CreditCard,
    itemCount: 2,
  },
  {
    id: 'support',
    name: '技术支持',
    description: '技术支持、问题处理、联系渠道',
    icon: Users,
    itemCount: 1,
  },
]

const faqItems = [
  // 基础服务
  {
    id: 1,
    question: '你们提供哪些类型的体育流媒体技术服务？',
    answer: '我们提供两种主要的企业级技术服务模式：\n\n1. **RTMP推流解决方案**：客户提供推流服务器地址，我们向指定节点推送高质量流媒体内容，配套提供RESTful API接口查询赛事与流媒体资源的映射关系。\n\n2. **流媒体链接解决方案**：我们提供即开即用的播放链接（HLS/DASH格式），可直接集成至客户播放器，同样提供完整的API接口查询赛事信息。\n\n我们覆盖12大体育类别：足球⚽、篮球🏀、棒球⚾、网球🎾、电竞🎮、乒乓球🏓、羽毛球🏸、排球🏐、板球🏏、斯诺克🎱、赛车🏎️、冰球🏒。',
    category: 'general',
    tags: ['服务类型', '体育项目', 'RTMP', '直播链接'],
    featured: true,
    createdAt: '2025-01-15',
    updatedAt: '2025-01-15',
  },
  {
    id: 2,
    question: '你们的技术服务覆盖哪些地区？',
    answer: '我们的技术服务实现全球化部署，通过分布式流媒体基础设施，覆盖全球主要地区的体育赛事。目前国际赛事资源覆盖率达到89.5%，包括：\n\n- **欧洲**：英超、西甲、德甲、意甲、法甲等顶级联赛\n- **亚洲**：中超、J联赛、K联赛等区域联赛\n- **美洲**：NBA、NFL、MLB、MLS等主流联赛\n- **其他地区**：澳超、南美解放者杯等国际赛事\n\n我们的技术团队提供7×24小时服务监控，确保全球客户都能获得稳定高效的技术支撑。',
    category: 'general',
    tags: ['覆盖地区', '全球服务', '联赛'],
    featured: true,
    createdAt: '2025-01-15',
     updatedAt: '2025-01-15',
  },
  {
    id: 3,
    question: '你们提供版权授权吗？',
    answer: '**我们仅提供技术流媒体服务，不涉及版权授权。**\n\n我们的角色是技术服务商，专注于提供稳定、高质量的视频流技术解决方案。关于体育赛事的版权授权，客户需要：\n\n1. 自行获得相关体育赛事的播放权限\n2. 确保在其使用地区拥有合法的播放授权\n3. 承担内容播放的法律责任\n\n我们建议客户在使用我们的服务前，先确认已获得相应的版权授权，以避免任何法律风险。',
    category: 'general',
    tags: ['版权', '法律责任', '授权'],
    featured: true,
    createdAt: '2025-01-15',
     updatedAt: '2025-01-15',
  },

  // 技术集成
  {
    id: 4,
    question: '如何开始技术集成？',
    answer: '我们的技术集成流程高效专业，通常包含4个关键步骤：\n\n**1. 业务需求分析（1天）**\n- 深入了解客户业务场景与技术架构需求\n- 确定技术服务模式（RTMP推流 或 流媒体链接）\n- 制定定制化技术方案\n\n**2. 技术演示验证（即时）**\n- 提供专业测试环境和演示账号\n- 展示API接口能力和服务质量\n- 解答技术集成疑问\n\n**3. 商务方案确认（1-2天）**\n- 根据需求提供定制化商务方案\n- 提供详细的技术服务条款\n- 确认合作实施细节\n\n**4. 生产环境部署（1-2天）**\n- 提供正式API密钥和完整文档\n- 协助完成技术集成与测试\n- 确保生产环境稳定运行\n\n[立即开始技术对接](/contact)',
    category: 'technical',
    tags: ['集成流程', '技术对接', '试用'],
    featured: true,
    createdAt: '2025-01-15',
      updatedAt: '2025-01-15',
  },
  {
    id: 5,
    question: '如何获得API接口文档？',
    answer: '我们为企业客户提供完整的API技术文档：\n\n**获取流程：**\n1. 填写技术咨询表单，提供企业联系信息\n2. 我们的技术支持团队会在4小时内响应\n3. 根据客户技术需求提供对应的接口文档\n4. 安排专业技术演示与答疑\n\n**文档内容涵盖：**\n- 完整的RESTful API接口规范\n- 请求参数与响应数据格式\n- 代码示例与集成最佳实践\n- 错误处理与异常机制\n- 认证授权与安全规范\n\n**专业技术支持：**\n- 资深技术团队解答集成问题\n- 提供专业测试环境与演示\n- 全程协助完成技术集成\n\n[获取技术文档](/contact)',
    category: 'technical',
    tags: ['API文档', '技术支持', '联系方式'],
    featured: false,
    createdAt: '2025-01-15',
     updatedAt: '2025-01-15',
  },
  {
    id: 6,
    question: 'RTMP推流解决方案的技术实现流程？',
    answer: 'RTMP推流解决方案的完整技术实现流程：\n\n**技术准备阶段：**\n1. 客户提供RTMP推流服务器地址与配置\n2. 我们配置推流参数、认证密钥与编码设置\n3. 进行网络连通性与推流质量测试\n\n**实时推流过程：**\n1. 我们的分布式系统获取体育赛事流媒体源\n2. 通过RTMP协议实时推送至客户指定服务器\n3. 客户可立即进行CDN分发与终端播放\n\n**监控与运维保障：**\n- 7×24小时自动化监控推流状态\n- 智能断线重连与故障切换机制\n- 实时推流质量监控与异常报警\n- 提供详细推流日志与性能统计\n\n**技术规格参数：**\n- 支持1080p/60fps高清推流\n- 端到端延迟控制在3-8秒\n- 支持多路并发推流架构\n- 兼容主流CDN与云服务商',
    category: 'technical',
    tags: ['RTMP', '推流流程', '技术参数'],
    featured: false,
    createdAt: '2025-01-15',
     updatedAt: '2025-01-15',
  },

  // 价格计费
  {
    id: 7,
    question: '技术服务如何计费？',
    answer: '我们采用灵活的企业级订阅计费模式：\n\n**订阅周期选择：**\n- 月度订阅：灵活按需\n- 季度订阅：享受8.5折优惠\n- 年度订阅：享受7.5折优惠\n\n**计费核心要素：**\n1. **并发流媒体数量**：同时活跃的流媒体连接数\n2. **体育赛事类别**：不同体育项目技术复杂度差异\n3. **技术服务模式**：RTMP推流与流媒体链接差异化定价\n4. **技术支持等级**：标准技术支持或企业级VIP支持\n\n**支付方式：**\n- 支持BTC、ETH、USDT、USDC等主流数字货币\n- 保障企业商业隐私，交易安全可靠\n\n**透明化定价：**\n- 无任何隐藏费用\n- 支持弹性扩容\n- 提供详细技术使用报告\n\n[获取企业定制报价](/contact)',
    category: 'pricing',
    tags: ['计费方式', '订阅', '加密货币'],
    featured: false,
    createdAt: '2025-01-15',
     updatedAt: '2025-01-15',
  },
  {
    id: 8,
    question: '是否提供企业技术试用？',
    answer: '是的，我们为企业客户提供专业技术试用服务：\n\n**试用服务内容：**\n- 3天企业级技术试用\n- 最多3个并发流媒体连接\n- 完整API接口访问权限\n- 专业技术支持与咨询\n\n**试用申请流程：**\n1. 填写企业技术试用申请表单\n2. 我们在24小时内开通专用试用环境\n3. 提供测试API密钥与完整技术文档\n4. 安排专业技术演示与一对一支持\n\n**试用服务限制：**\n- 仅限企业新客户申请\n- 每个企业限申请一次\n- 试用期间仅限技术测试用途\n\n**正式合作优惠：**\n试用期结束后签署正式合作协议，可享受首月8折企业优惠。\n\n[立即申请企业试用](/contact)',
    category: 'pricing',
    tags: ['免费试用', '试用流程', '新客户'],
    featured: true,
    createdAt: '2025-01-15',
     updatedAt: '2025-01-15',
  },

  // 客户支持
  {
    id: 10,
    question: '如何联系技术支持团队？',
    answer: '我们提供专业的企业级技术支持服务：\n\n**商务技术咨询：**\n- 邮箱：business@sportliveapi.com\n- 工作时间：周一至周五 9:00-18:00 (GMT+8)\n- 响应时间：4小时内专业回复\n\n**企业客户专享服务：**\n- Telegram技术群聊全年在线服务\n- 专属技术客户经理一对一支持\n- 资深技术支持团队实时响应\n- 7×24小时技术服务保障\n\n**技术支持服务范围：**\n- API接口集成技术指导\n- 系统故障问题快速处理\n- 流媒体技术使用培训\n- 企业定制化技术解决方案\n\n**联系服务流程：**\n1. 发送技术咨询邮件至business@sportliveapi.com\n2. 或填写在线技术咨询表单\n3. 我们将在4小时内提供专业回复\n4. 企业客户将被邀请加入专属Telegram技术群聊\n\n[立即联系技术团队](/contact)',
    category: 'support',
    tags: ['客户支持', '联系方式', 'Telegram群聊'],
    featured: false,
    createdAt: '2025-01-15',
     updatedAt: '2025-01-15',
  },
]

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

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
              常见问题
            </h1>
            <p className="text-body-lg text-brand-gray-400 max-w-3xl mx-auto mb-8">
              快速找到您需要的答案。我们整理了客户最关心的问题，涵盖服务介绍、技术集成、价格计费等各个方面。
              如果您没有找到答案，请随时联系我们的客户支持团队。
            </p>


          </div>

          {/* Categories */}
          <div className="mb-16">
            <h2 className="text-h2 font-bold text-brand-gray-800 mb-8 text-center">问题分类</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedCategory === 'all' ? 'ring-2 ring-brand-primary bg-brand-primary/5' : ''
                }`}
                onClick={() => setSelectedCategory('all')}
              >
                <CardContent className="p-4 text-center">
                  <Settings className="h-8 w-8 mx-auto mb-2 text-brand-primary" />
                  <h3 className="font-semibold text-brand-gray-800 mb-1">全部问题</h3>
                  <p className="text-small text-brand-gray-400">9个问题</p>
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
                      <h3 className="font-semibold text-brand-gray-800 mb-1">{category.name}</h3>
                      <p className="text-small text-brand-gray-400">{category.itemCount}个问题</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Featured FAQs */}
          {featuredFAQs.length > 0 && selectedCategory === 'all' && (
            <div className="mb-16">
              <h2 className="text-h2 font-bold text-brand-gray-800 mb-8">热门问题</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {featuredFAQs.slice(0, 4).map((faq) => (
                  <Card key={faq.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                          Q
                        </div>
                        <h3 className="font-semibold text-brand-gray-800 flex-1">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="ml-9">
                        <p className="text-brand-gray-600 text-small line-clamp-3 mb-3">
                          {faq.answer.split('\n')[0]}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {faq.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="bg-brand-gray-100 text-brand-gray-600 px-2 py-1 rounded text-xs">
                              {tag}
                            </span>
                          ))}
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
                {selectedCategory === 'all' ? '全部问题' : 
                 faqCategories.find(cat => cat.id === selectedCategory)?.name || '问题列表'}
              </h2>
              <span className="text-brand-gray-400">
                找到 {filteredFAQs.length} 个问题
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
                        <span className="font-semibold text-brand-gray-800">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="ml-9 space-y-4">
                        <div className="prose prose-sm max-w-none text-brand-gray-600">
                          {faq.answer.split('\n').map((line, index) => {
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
                          {faq.tags.map((tag) => (
                            <span key={tag} className="bg-brand-gray-100 text-brand-gray-600 px-2 py-1 rounded text-xs">
                              {tag}
                            </span>
                          ))}
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
                <h3 className="text-h3 font-bold mb-4">没有找到您要的答案？</h3>
                <p className="text-body-lg mb-6 opacity-90">
                  我们的专业团队随时为您提供支持，欢迎联系我们获取更详细的解答
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/contact">
                    <Button variant="secondary" size="lg">
                      联系客户支持
                    </Button>
                  </Link>
                  <div className="flex items-center gap-4 text-small opacity-90">
                    <span>📧 business@sportliveapi.com</span>
                    <span>🕒 工作时间：9:00-18:00 (GMT+8)</span>
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