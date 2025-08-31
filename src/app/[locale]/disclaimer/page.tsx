import React from 'react'
import MainLayout from '@/components/layout/main-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Metadata } from 'next'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale
  
  if (locale === 'en') {
    return {
      title: 'Disclaimer - SportLiveAPI',
      description: 'SportLiveAPI terms of service and disclaimer',
    }
  }
  
  return {
    title: '免责声明 - SportLiveAPI',
    description: 'SportLiveAPI服务条款和免责声明',
  }
}

export default function DisclaimerPage({ params }: { params: { locale: string } }) {
  const isEnglish = params.locale === 'en'
  
  if (isEnglish) {
    return (
      <MainLayout>
        <section className="space-section bg-brand-gray-50 min-h-screen">
          <div className="container-custom max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-responsive-h2 font-bold text-brand-gray-800 mb-4">
                Disclaimer
              </h1>
              <p className="text-body text-brand-gray-400">
                Last Updated: January 2025
              </p>
            </div>

            <div className="space-y-8">
              {/* Service Nature */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-h3 text-brand-primary">Service Nature</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none">
                  <p className="text-body text-brand-gray-400 leading-relaxed">
                    SportLiveAPI is a company specializing in 
                    <strong className="text-brand-gray-800">sports live streaming technical services</strong>
                    . We provide customers with stable and diversified global sports live streaming technical access services. Our services are limited to technical support and do not involve content production or copyright ownership.
                  </p>
                  <p className="text-body text-brand-gray-400 leading-relaxed mt-4">
                    <strong className="text-brand-error">Important Notice: </strong>
                    We do not provide any content with copyright issues and do not assume any legal responsibility for customer usage behavior.
                  </p>
                </CardContent>
              </Card>

              {/* Copyright Responsibility */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-h3 text-brand-primary">Copyright Responsibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-body text-brand-gray-400">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-brand-gray-800 mb-2">Client Responsibility</h4>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Ensure compliance with local laws and regulations when using our services</li>
                        <li>Obtain necessary copyright licenses and broadcasting rights</li>
                        <li>Bear full legal responsibility for content usage and distribution</li>
                        <li>Ensure technical usage complies with relevant service agreements</li>
                      </ul>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-brand-gray-800 mb-2">Our Position</h4>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Only provide technical services, not responsible for content legality</li>
                        <li>Do not participate in any copyright-related legal disputes</li>
                        <li>Reserve the right to suspend services for illegal usage</li>
                        <li>Cooperate with relevant authorities for legal compliance work</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Service Limitations */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-h3 text-brand-primary">Service Limitations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-brand-gray-800 mb-3">Technical Limitations</h4>
                      <ul className="list-disc list-inside space-y-2 text-body text-brand-gray-400">
                        <li>Network stability may be affected by third-party factors</li>
                        <li>Service quality may vary due to geographical location differences</li>
                        <li>Technical maintenance may cause temporary service interruptions</li>
                        <li>Some features may have compatibility limitations</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-brand-gray-800 mb-3">Disclaimer</h4>
                      <ul className="list-disc list-inside space-y-2 text-body text-brand-gray-400">
                        <li>Not responsible for technical issues beyond our control</li>
                        <li>Do not guarantee 100% service availability</li>
                        <li>Not liable for losses caused by improper customer usage</li>
                        <li>Reserve the right to adjust service content and pricing</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Compliance Usage */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-h3 text-brand-primary">Compliance Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-brand-gray-800 mb-3">We are committed to providing compliant technical services and recommend customers take the following measures:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-brand-gray-50 rounded-lg p-4">
                          <h5 className="font-medium text-brand-gray-800 mb-2">Copyright Compliance</h5>
                          <p className="text-small text-brand-gray-400">
                            Ensure all used content has proper authorization and complies with copyright laws
                          </p>
                        </div>
                        <div className="bg-brand-gray-50 rounded-lg p-4">
                          <h5 className="font-medium text-brand-gray-800 mb-2">Legal Compliance</h5>
                          <p className="text-small text-brand-gray-400">
                            Follow local laws and regulations, especially broadcasting and media-related laws
                          </p>
                        </div>
                        <div className="bg-brand-gray-50 rounded-lg p-4">
                          <h5 className="font-medium text-brand-gray-800 mb-2">Content Review</h5>
                          <p className="text-small text-brand-gray-400">
                            Establish content review mechanisms to ensure broadcast content compliance
                          </p>
                        </div>
                        <div className="bg-brand-gray-50 rounded-lg p-4">
                          <h5 className="font-medium text-brand-gray-800 mb-2">Service Agreement</h5>
                          <p className="text-small text-brand-gray-400">
                            Strictly follow our service agreement terms and usage guidelines
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact & Dispute Resolution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-h3 text-brand-primary">Contact & Dispute Resolution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-brand-gray-800 mb-3">Contact Us</h4>
                      <div className="space-y-2 text-body text-brand-gray-400">
                        <p>If you have any questions about this disclaimer or need legal consultation, please contact us through the following methods:</p>
                        <div className="bg-brand-gray-50 rounded-lg p-4">
                          <p><strong>Email: </strong> business@sportliveapi.com</p>
                          <p><strong>Working Hours: </strong> Monday to Friday 9:00-18:00 (UTC+8)</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-brand-gray-800 mb-3">Dispute Resolution</h4>
                      <div className="space-y-2 text-body text-brand-gray-400">
                        <p>For any disputes arising from service usage, we recommend resolving them through the following methods:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Friendly negotiation and communication</li>
                          <li>Third-party mediation</li>
                          <li>Industry arbitration institutions</li>
                          <li>Legal proceedings (as a last resort)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Statement Updates */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-h3 text-brand-primary">Statement Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-body text-brand-gray-400 leading-relaxed">
                    We reserve the right to update this disclaimer at any time. Updated content will be published on our official website and will take effect immediately upon publication. Continued use of our services after updates constitutes acceptance of the new disclaimer.
                  </p>
                  <div className="mt-4 p-4 bg-brand-primary/10 rounded-lg">
                    <p className="text-small text-brand-primary">
                      <strong>Recommendation: </strong> Please check this page regularly for the latest disclaimer content to ensure your usage complies with our latest terms.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </MainLayout>
    )
  }

  // Chinese/Traditional Chinese version
  return (
    <MainLayout>
      <section className="space-section bg-brand-gray-50 min-h-screen">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-responsive-h2 font-bold text-brand-gray-800 mb-4">
              免责声明
            </h1>
            <p className="text-body text-brand-gray-400">
              最后更新：2025年1月
            </p>
          </div>

          <div className="space-y-8">
            {/* 服务性质 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-h3 text-brand-primary">服务性质</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none">
                <p className="text-body text-brand-gray-400 leading-relaxed">
                  SportLiveAPI是一家专业从事
                  <strong className="text-brand-gray-800">体育直播流技术服务</strong>
                  的公司。我们为客户提供稳定、多元化的全球体育赛事直播流技术接入服务。我们的服务仅限于技术支持，不涉及内容制作或版权拥有。
                </p>
                <p className="text-body text-brand-gray-400 leading-relaxed mt-4">
                  <strong className="text-brand-error">重要声明：</strong>
                  我们不提供任何涉及版权问题的内容，不承担客户使用行为的任何法律责任。
                </p>
              </CardContent>
            </Card>

            {/* 版权责任 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-h3 text-brand-primary">版权责任</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-body text-brand-gray-400">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-brand-gray-800 mb-2">客户责任</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>确保使用我们服务时符合当地法律法规</li>
                      <li>获取必要的版权许可和播放权限</li>
                      <li>承担内容使用和传播的全部法律责任</li>
                      <li>确保技术使用符合相关服务协议</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-brand-gray-800 mb-2">我们的立场</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>仅提供技术服务，不对内容合法性负责</li>
                      <li>不参与任何版权相关的法律纠纷</li>
                      <li>保留对违法使用行为暂停服务的权利</li>
                      <li>积极配合相关部门进行合规工作</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 服务限制 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-h3 text-brand-primary">服务限制</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-brand-gray-800 mb-3">技术限制</h4>
                    <ul className="list-disc list-inside space-y-2 text-body text-brand-gray-400">
                      <li>网络稳定性可能受第三方因素影响</li>
                      <li>服务质量可能因地理位置差异而有所不同</li>
                      <li>技术维护可能导致临时服务中断</li>
                      <li>部分功能可能存在兼容性限制</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-brand-gray-800 mb-3">我们的免责</h4>
                    <ul className="list-disc list-inside space-y-2 text-body text-brand-gray-400">
                      <li>不对超出我们控制范围的技术问题负责</li>
                      <li>不保证100%的服务可用性</li>
                      <li>不承担客户不当使用造成的损失</li>
                      <li>保留调整服务内容和价格的权利</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 合规使用 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-h3 text-brand-primary">合规使用</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-brand-gray-800 mb-3">我们致力于提供合规的技术服务，建议客户采取以下措施：</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-brand-gray-50 rounded-lg p-4">
                        <h5 className="font-medium text-brand-gray-800 mb-2">版权合规</h5>
                        <p className="text-small text-brand-gray-400">
                          确保所使用的内容都有合法授权，符合版权法律要求
                        </p>
                      </div>
                      <div className="bg-brand-gray-50 rounded-lg p-4">
                        <h5 className="font-medium text-brand-gray-800 mb-2">法律合规</h5>
                        <p className="text-small text-brand-gray-400">
                          遵守当地法律法规，特别是广播和媒体相关法律
                        </p>
                      </div>
                      <div className="bg-brand-gray-50 rounded-lg p-4">
                        <h5 className="font-medium text-brand-gray-800 mb-2">内容审核</h5>
                        <p className="text-small text-brand-gray-400">
                          建立内容审核机制，确保播放内容的合规性
                        </p>
                      </div>
                      <div className="bg-brand-gray-50 rounded-lg p-4">
                        <h5 className="font-medium text-brand-gray-800 mb-2">服务协议</h5>
                        <p className="text-small text-brand-gray-400">
                          严格遵守我们的服务协议条款和使用指南
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 联系与争议解决 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-h3 text-brand-primary">联系与争议解决</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-brand-gray-800 mb-3">联系我们</h4>
                    <div className="space-y-2 text-body text-brand-gray-400">
                      <p>如果您对本免责声明有任何疑问或需要法律咨询，请通过以下方式联系我们：</p>
                      <div className="bg-brand-gray-50 rounded-lg p-4">
                        <p><strong>邮箱：</strong> business@sportliveapi.com</p>
                        <p><strong>工作时间：</strong> 周一至周五 9:00-18:00 (UTC+8)</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-brand-gray-800 mb-3">争议解决</h4>
                    <div className="space-y-2 text-body text-brand-gray-400">
                      <p>对于因服务使用产生的任何争议，我们建议通过以下方式解决：</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>友好协商沟通</li>
                        <li>第三方调解</li>
                        <li>行业仲裁机构</li>
                        <li>法律诉讼（最后手段）</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 声明更新 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-h3 text-brand-primary">声明更新</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-body text-brand-gray-400 leading-relaxed">
                  我们保留随时更新本免责声明的权利。更新内容将在我们的官方网站上发布，并在发布后立即生效。更新后继续使用我们的服务即表示接受新的免责声明。
                </p>
                <div className="mt-4 p-4 bg-brand-primary/10 rounded-lg">
                  <p className="text-small text-brand-primary">
                    <strong>建议：</strong> 请定期查看本页面以获取最新的免责声明内容，确保您的使用符合我们的最新条款。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}