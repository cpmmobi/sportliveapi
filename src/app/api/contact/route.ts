import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { UserSourceInfo, formatIPAddress } from '@/lib/user-source-tracker'

// 简化表单数据结构
interface SimpleContactFormData {
  email: string
  contactMethod: string
  sportsInterests: string[]
  useCase: string
  streamerType?: string
  platformInfo?: string
  requirements?: string
  userSource?: UserSourceInfo  // 添加用户来源信息
}

// 多步骤表单数据结构  
interface MultiStepFormData {
  formType: 'multi_step'
  // 第一步：基本信息
  companyName: string
  contactName: string
  position: string
  email: string
  phone: string
  // 第二步：业务需求
  sportsInterests: string[]
  useCase: string
  targetAudience: string
  concurrentViewers: string
  existingProductUrl?: string
  // 第三步：技术信息
  techStack: string
  needApi: boolean
  launchTimeline: string
  specialRequirements?: string
  // 第四步：商务需求
  budgetRange: string
  cooperationModel: string
  otherRequirements?: string
  userSource?: UserSourceInfo  // 添加用户来源信息
}

type ContactFormData = SimpleContactFormData | MultiStepFormData



// 飞书机器人配置
const FEISHU_WEBHOOK_URL = process.env.FEISHU_WEBHOOK_URL || ''
const FEISHU_SECRET = process.env.FEISHU_SECRET || ''

// 获取客户端IP地址
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const remoteAddress = request.headers.get('x-vercel-forwarded-for')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  if (remoteAddress) {
    return remoteAddress
  }
  
  return 'unknown'
}

// 获取地理位置信息（简化版，基于IP的国家/地区识别）
function getLocationFromIP(ip: string): string {
  return formatIPAddress(ip)
}

// 格式化语言信息
function formatLanguageInfo(primaryLanguage: string, allLanguages: string[]): string {
  // 语言代码到友好名称的映射
  const languageNames: Record<string, string> = {
    'zh-CN': '简体中文',
    'zh-TW': '繁体中文',
    'zh-HK': '香港中文',
    'en-US': '美式英语',
    'en-GB': '英式英语',
    'en': '英语',
    'ja': '日语',
    'ko': '韩语',
    'es': '西班牙语',
    'fr': '法语',
    'de': '德语',
    'it': '意大利语',
    'pt': '葡萄牙语',
    'ru': '俄语',
    'ar': '阿拉伯语',
    'th': '泰语',
    'vi': '越南语',
    'id': '印尼语',
    'ms': '马来语',
    'hi': '印地语'
  }
  
  // 获取主要语言的友好名称
  const primaryName = languageNames[primaryLanguage] || primaryLanguage
  
  // 如果有多种语言，显示主要语言加数量
  if (allLanguages && allLanguages.length > 1) {
    const otherCount = allLanguages.length - 1
    return `${primaryName} (+${otherCount}种)`
  }
  
  return primaryName
}

// 格式化引荐网站信息
function formatReferrerInfo(referrerUrl: string): string {
  try {
    const url = new URL(referrerUrl)
    const domain = url.hostname
    const path = url.pathname
    const search = url.search
    
    // 知名网站的友好名称映射
    const siteNames: Record<string, string> = {
      // 搜索引擎
      'www.google.com': 'Google搜索',
      'www.google.com.hk': 'Google香港',
      'www.baidu.com': '百度搜索',
      'www.bing.com': '必应搜索',
      'www.sogou.com': '搜狗搜索',
      'www.so.com': '360搜索',
      
      // 社交媒体
      'www.facebook.com': 'Facebook',
      'twitter.com': 'Twitter',
      'www.linkedin.com': 'LinkedIn',
      'weibo.com': '新浪微博',
      'www.zhihu.com': '知乎',
      
      // 技术社区
      'github.com': 'GitHub',
      'stackoverflow.com': 'Stack Overflow',
      'www.reddit.com': 'Reddit',
      'medium.com': 'Medium',
      'dev.to': 'DEV Community',
      
      // 新闻媒体
      'www.36kr.com': '36氪',
      'www.ithome.com': 'IT之家',
      'techcrunch.com': 'TechCrunch',
      
      // 论坛社区
      'v2ex.com': 'V2EX',
      'www.v2ex.com': 'V2EX',
      'segmentfault.com': 'SegmentFault',
      
      // 其他
      'www.producthunt.com': 'Product Hunt'
    }
    
    // 获取友好名称
    const siteName = siteNames[domain] || domain
    
    // 如果是搜索引擎，尝试提取搜索词
    if (domain.includes('google.') || domain.includes('baidu.') || domain.includes('bing.')) {
      const searchParams = new URLSearchParams(search)
      const query = searchParams.get('q') || searchParams.get('wd') || searchParams.get('query')
      if (query) {
        return `${siteName} (搜索: "${decodeURIComponent(query)}")`
      }
    }
    
    // 如果有特殊路径，显示路径信息
    if (path && path !== '/' && path.length > 1) {
      // 截断过长的路径
      const shortPath = path.length > 50 ? path.substring(0, 47) + '...' : path
      return `${siteName}${shortPath}`
    }
    
    return siteName
    
  } catch (error) {
    console.warn('⚠️ 无法解析引荐URL:', error)
    return referrerUrl
  }
}

// 格式化用户来源信息
function formatUserSourceInfo(userSource: UserSourceInfo, clientIP: string): string {
  if (!userSource) return `📍 **位置:** ${getLocationFromIP(clientIP)}`
  
  const parts = []
  
  // 来源渠道
  if (userSource.source && userSource.source !== 'unknown') {
    if (userSource.medium === 'cpc') {
      parts.push(`💰 **付费广告** - ${userSource.source}`)
    } else if (userSource.medium === 'organic') {
      parts.push(`🔍 **自然搜索** - ${userSource.source}`)
    } else if (userSource.source === 'direct') {
      parts.push(`🎯 **直接访问**`)
    } else if (userSource.source === 'social') {
      parts.push(`📱 **社交媒体引荐**`)
    } else if (userSource.source === 'tech_community') {
      parts.push(`💻 **技术社区引荐**`)
    } else if (userSource.source === 'news_media') {
      parts.push(`📰 **新闻媒体引荐**`)
    } else if (userSource.source === 'forum') {
      parts.push(`💬 **论坛社区引荐**`)
    } else if (userSource.source === 'referral') {
      parts.push(`🔗 **网站引荐**`)
    } else {
      parts.push(`🔗 **网站引荐** - ${userSource.source}`)
    }
  } else {
    parts.push(`🎯 **直接访问**`)
  }
  
  // 关键词信息
  if (userSource.keyword) {
    if (userSource.keywordSource === 'paid') {
      parts.push(`🎯 **付费关键词:** ${userSource.keyword}`)
    } else {
      parts.push(`🔍 **搜索关键词:** ${userSource.keyword}`)
    }
  }
  
  // 广告系列信息
  if (userSource.campaign) {
    parts.push(`📢 **广告系列:** ${userSource.campaign}`)
  }
  
  // 设备信息
  const deviceEmoji = userSource.device.device === 'mobile' ? '📱' : 
                     userSource.device.device === 'tablet' ? '💻' : '🖥️'
  parts.push(`${deviceEmoji} **设备:** ${userSource.device.device} - ${userSource.device.browser}/${userSource.device.os}`)
  
  // 语言信息
  if (userSource.device.language && userSource.device.language !== 'unknown') {
    const languageDisplay = formatLanguageInfo(userSource.device.language, userSource.device.languages)
    parts.push(`🌐 **语言:** ${languageDisplay}`)
  }
  
  // 地理位置
  parts.push(`📍 **位置:** ${getLocationFromIP(clientIP)}`)
  
  // Referrer信息（详细显示引荐网站）
  if (userSource.referrer && userSource.referrer !== userSource.landingPage && userSource.source !== 'direct') {
    try {
      const referrerUrl = new URL(userSource.referrer)
      const referrerDomain = referrerUrl.hostname
      
      // 根据来源类型显示不同的信息
      if (userSource.source === 'referral' || userSource.medium === 'referral') {
        // 网站引荐 - 显示完整信息
        const referrerDisplay = formatReferrerInfo(userSource.referrer)
        parts.push(`🔗 **引荐网站:** ${referrerDisplay}`)
      } else if (userSource.medium === 'organic') {
        // 自然搜索 - 显示搜索引擎
        parts.push(`🔍 **搜索引擎:** ${referrerDomain}`)
      } else {
        // 其他情况 - 显示域名
        parts.push(`🔗 **来源页面:** ${referrerDomain}`)
      }
    } catch {
      // 忽略无效的referrer
    }
  }
  
  // 着陆页信息（有价值时显示）
  if (userSource.landingPage && userSource.landingPage.includes('?')) {
    try {
      const url = new URL(userSource.landingPage)
      const params = url.searchParams
      if (params.get('utm_source') || params.get('gclid')) {
        parts.push(`🔗 **着陆页:** ${url.pathname}${url.search}`)
      }
    } catch {
      // 忽略无效的URL
    }
  }
  
  return parts.join('  \n')
}





// 生成飞书机器人签名
function generateFeishuSign(timestamp: number, secret: string): string {
  // 根据飞书官方文档: 签名字符串为 timestamp + "\n" + secret
  const stringToSign = `${timestamp}\n${secret}`
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(stringToSign, 'utf8')
  return hmac.digest('base64')
}

// 发送消息到飞书群
async function sendToFeishu(formData: ContactFormData, clientIP: string) {
  // 构建体育项目显示文本
  const sportsMap: Record<string, string> = {
    'football': '⚽ 足球',
    'basketball': '🏀 篮球',
    'baseball': '⚾ 棒球',
    'tennis': '🎾 网球',
    'esports': '🎮 电竞',
    'pingpong': '🏓 乒乓球',
    'badminton': '🏸 羽毛球',
    'volleyball': '🏐 排球',
    'cricket': '🏏 板球',
    'snooker': '🎱 斯诺克',
    'racing': '🏎️ 赛车',
    'hockey': '🏒 冰球'
  }
  
  const sportsText = formData.sportsInterests
    .map(sport => sportsMap[sport] || sport)
    .join(', ')

  // 服务类型映射
  const serviceTypeMap: Record<string, string> = {
    'website_app': '🌐 网站/APP接入赛事直播',
    'obs_streaming': '📺 仅网络主播在OBS直播使用',
    'both_scenarios': '🔄 以上两种场景都有'
  }
  const serviceText = serviceTypeMap[formData.useCase] || formData.useCase

  let message
  
  // 检查是否为多步骤表单
  if ('formType' in formData && formData.formType === 'multi_step') {
    // 多步骤表单的详细消息格式
    const viewerRangeMap: Record<string, string> = {
      '1-1000': '1-1,000人',
      '1000-10000': '1,000-10,000人', 
      '10000-100000': '10,000-100,000人',
      '100000+': '100,000人以上'
    }
    
    const budgetRangeMap: Record<string, string> = {
      '1000-5000': '$1,000-$5,000/月',
      '5000-15000': '$5,000-$15,000/月',
      '15000-50000': '$15,000-$50,000/月',
      '50000+': '$50,000以上/月'
    }
    
    const cooperationMap: Record<string, string> = {
      'monthly': '按月订阅',
      'quarterly': '按季度订阅', 
      'yearly': '按年订阅',
      'custom': '定制化合作'
    }

    // 构建紧凑的消息内容，优化排版
    const messageContent = `🎯 高价值客户咨询 - SportLiveAPI
📋 基本信息
🏢 公司名称: ${formData.companyName}
👤 联系人: ${formData.contactName} (${formData.position})
📧 邮箱地址: ${formData.email}
📱 联系电话: ${formData.phone}
💼 业务需求
⚽ 感兴趣的体育项目: ${sportsText}
🔧 服务需求: ${serviceText}
👥 目标用户群体: ${formData.targetAudience}
👀 并发观看人数: ${viewerRangeMap[formData.concurrentViewers] || formData.concurrentViewers}${formData.existingProductUrl ? `\n🌐 现有产品链接: ${formData.existingProductUrl}` : ''}
⚙️ 技术信息
💻 技术栈: ${formData.techStack}
🔌 需要API接口: ${formData.needApi ? '✅ 是' : '❌ 否'}
📅 预计上线时间: ${formData.launchTimeline}${formData.specialRequirements ? `\n📝 特殊需求: ${formData.specialRequirements}` : ''}
💰 商务信息
💳 预算范围: ${budgetRangeMap[formData.budgetRange] || formData.budgetRange}
🤝 合作模式: ${cooperationMap[formData.cooperationModel] || formData.cooperationModel}${formData.otherRequirements ? `\n📋 其他需求: ${formData.otherRequirements}` : ''}
📊 用户来源分析
${formData.userSource ? formatUserSourceInfo(formData.userSource, clientIP) : '📍 位置: ' + getLocationFromIP(clientIP)}
⏰ 咨询时间: ${new Date().toLocaleString('zh-CN', { 
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })}
🚨 高价值客户！请优先处理，建议在2小时内与客户取得联系！
💡 提醒：详细的需求信息，适合进行深度商务沟通`

    message = {
      msg_type: 'text',
      content: {
        text: messageContent
      }
    }
  } else {
    // 简化表单的消息格式
    const simpleData = formData as SimpleContactFormData
    
    // 判断联系方式类型
    const isQQ = /^\d+$/.test(simpleData.contactMethod)
    const isTelegram = simpleData.contactMethod.startsWith('@')
    let contactIcon = '📱'
    if (isQQ) contactIcon = '🐧'
    if (isTelegram) contactIcon = '✈️'

    // 构建紧凑的消息内容，优化排版
    const messageContent = `🎯 新客户咨询 - SportLiveAPI
📧 邮箱地址: ${simpleData.email}
${contactIcon} 联系方式: ${simpleData.contactMethod}
⚽ 感兴趣的体育项目: ${sportsText}
🎯 使用场景: ${serviceText}${simpleData.streamerType ? `\n👥 主播规模: ${simpleData.streamerType === 'team' ? '主播团体' : '个体主播'}` : ''}${simpleData.platformInfo ? `\n🌐 平台信息: ${simpleData.platformInfo}` : ''}
📝 详细需求说明: ${simpleData.requirements || '暂无详细说明'}
📊 用户来源分析
${simpleData.userSource ? formatUserSourceInfo(simpleData.userSource, clientIP) : '📍 位置: ' + getLocationFromIP(clientIP)}
⏰ 咨询时间: ${new Date().toLocaleString('zh-CN', { 
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })}
🚀 请及时跟进客户需求，建议在4小时内与客户取得联系！
💡 提醒：可直接回复邮箱或通过联系方式快速沟通`

    message = {
      msg_type: 'text',
      content: {
        text: messageContent
      }
    }
  }

  try {
    console.log('🔗 飞书机器人请求URL:', FEISHU_WEBHOOK_URL.replace(/hook\/[^?]*/, 'hook/***'))
    console.log('🔍 飞书机器人无签名验证模式')
    
    // 直接发送请求，不使用签名验证
    const response = await fetch(FEISHU_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message),
    })

    const result = await response.json()
    
    if (result.code === 0) {
      console.log('✅ 飞书消息发送成功')
      return { success: true, message: '飞书通知发送成功' }
    } else {
      console.error('❌ 飞书消息发送失败:', result)
      return { success: false, error: result.msg || '发送失败' }
    }
  } catch (error) {
    console.error('🔥 发送飞书消息时出错:', error)
    return { success: false, error: '网络错误' }
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json()
    const clientIP = getClientIP(request)
    
    // 调试：打印用户来源信息
    console.log('🔍 收到的用户来源信息:', formData.userSource)
    console.log('🌐 客户端IP:', clientIP)

    // 检查表单类型并进行相应验证
    if ('formType' in formData && formData.formType === 'multi_step') {
      // 多步骤表单验证
      const multiStepData = formData as MultiStepFormData
      
      // 验证必填字段
      if (!multiStepData.companyName || !multiStepData.contactName || !multiStepData.position || 
          !multiStepData.email || !multiStepData.phone || !multiStepData.sportsInterests?.length || 
          !multiStepData.useCase || !multiStepData.targetAudience || !multiStepData.concurrentViewers ||
          !multiStepData.techStack || !multiStepData.launchTimeline || !multiStepData.budgetRange || 
          !multiStepData.cooperationModel) {
        return NextResponse.json(
          { 
            success: false,
            error: '请填写所有必填字段' 
          },
          { status: 400 }
        )
      }

      // 邮箱格式验证
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(multiStepData.email)) {
        return NextResponse.json(
          { 
            success: false,
            error: '请输入有效的邮箱地址' 
          },
          { status: 400 }
        )
      }

      console.log('📝 收到高价值客户咨询:', {
        company: multiStepData.companyName,
        contact: multiStepData.contactName,
        email: multiStepData.email,
        phone: multiStepData.phone,
        sportsCount: multiStepData.sportsInterests.length,
        serviceType: multiStepData.useCase,
        budget: multiStepData.budgetRange
      })
    } else {
      // 简化表单验证
      const simpleData = formData as SimpleContactFormData
      
      // 验证必填字段
      if (!simpleData.email || !simpleData.contactMethod || !simpleData.sportsInterests?.length || !simpleData.useCase) {
        return NextResponse.json(
          { 
            success: false,
            error: '请填写所有必填字段' 
          },
          { status: 400 }
        )
      }

      // 邮箱格式验证
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(simpleData.email)) {
        return NextResponse.json(
          { 
            success: false,
            error: '请输入有效的邮箱地址' 
          },
          { status: 400 }
        )
      }

      // 联系方式格式验证
      const telegramPattern = /^@[a-zA-Z0-9_]{5,32}$/
      const qqPattern = /^[1-9][0-9]{4,10}$/
      if (!telegramPattern.test(simpleData.contactMethod) && !qqPattern.test(simpleData.contactMethod)) {
        return NextResponse.json(
          { 
            success: false,
            error: 'Telegram格式：@username（5-32位字符），QQ格式：5-11位数字' 
          },
          { status: 400 }
        )
      }

      console.log('📝 收到新的客户咨询:', {
        email: simpleData.email,
        contactMethod: simpleData.contactMethod,
        sportsCount: simpleData.sportsInterests.length,
        serviceType: simpleData.useCase
      })
    }

    // 发送到飞书
    const feishuResult = await sendToFeishu(formData, clientIP)

    // 记录推送结果
    console.log('📤 推送结果:', {
      feishu: feishuResult.success ? '✅ 成功' : '❌ 失败'
    })

    // 飞书推送成功，返回成功给用户
    if (feishuResult.success) {
      return NextResponse.json({ 
        success: true, 
        message: '咨询提交成功！我们的专业团队将在4小时内与您联系，为您提供定制化的解决方案和报价。'
      })
    } else {
      // 即使飞书发送失败，也返回成功给用户，避免影响用户体验
      // 但在服务端记录错误日志
      console.error('⚠️ 飞书消息发送失败，但仍返回成功给用户:', {
        feishu: feishuResult.error
      })
      return NextResponse.json({ 
        success: true, 
        message: '咨询提交成功！我们的专业团队将在4小时内与您联系，为您提供定制化的解决方案和报价。'
      })
    }
  } catch (error) {
    console.error('💥 处理表单提交时出错:', error)
    return NextResponse.json(
      { 
        success: false,
        error: '服务器暂时繁忙，请稍后重试或直接邮件联系：business@sportliveapi.com' 
      },
      { status: 500 }
    )
  }
}

// 处理CORS预检请求
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}