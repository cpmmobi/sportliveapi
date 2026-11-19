'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Check } from 'lucide-react'
import { trackFormSubmit, trackServiceInterest, trackContactPreference } from '@/lib/analytics'
import { getUserSourceInfo } from '@/lib/user-source-tracker'
import { isPublicWebsiteUrl } from '@/lib/public-website-url'

function l(locale: string, zh: string, en: string, tw?: string) {
  if (locale === 'zh') return zh
  if (locale === 'zh-TW') return tw || zh
  return en
}

type MessengerChannel = 'telegram' | 'whatsapp' | 'none'
type ProjectStageKey = 'live_traffic' | 'ready_soon' | 'in_development' | 'evaluating'

const FAKE_HANDLES = new Set([
  'test',
  'testing',
  'tester',
  'admin',
  'root',
  'user',
  'username',
  'yourname',
  'telegram',
  'whatsapp',
  'none',
  'null',
  'undefined',
  'asdf',
  'asdfgh',
  'qwerty',
  'qwertyuiop',
  'zxcvbn',
  'demo',
  'sample',
  'example',
  'abcde',
  'abcdef',
  '12345',
  '123456',
  '1234567',
  '12345678',
  '123456789',
  '1234567890',
])

function validateTelegramHandle(raw: string): { valid: boolean; normalized: string } {
  const cleaned = raw
    .trim()
    .replace(/^https?:\/\/(www\.)?(t\.me|telegram\.me)\//i, '')
    .replace(/^@/, '')
    .trim()

  if (!/^[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(cleaned) || cleaned.endsWith('_') || cleaned.includes('__')) {
    return { valid: false, normalized: '' }
  }

  const lower = cleaned.toLowerCase()
  if (FAKE_HANDLES.has(lower)) {
    return { valid: false, normalized: '' }
  }
  if (/^(.)\1{4,}$/.test(lower) || /^(..)\1{2,}$/.test(lower)) {
    return { valid: false, normalized: '' }
  }
  if (lower.includes('123456') || lower.includes('abcdef') || lower.includes('qwerty')) {
    return { valid: false, normalized: '' }
  }

  return { valid: true, normalized: `@${cleaned}` }
}

function validateWhatsAppNumber(raw: string): { valid: boolean; normalized: string } {
  const trimmed = raw.trim()
  if (!/^\+?[\d\s\-()]{8,22}$/.test(trimmed)) {
    return { valid: false, normalized: '' }
  }
  const digits = trimmed.replace(/\D/g, '')
  if (digits.length < 8 || digits.length > 15 || digits.startsWith('0')) {
    return { valid: false, normalized: '' }
  }
  if (/^(\d)\1{6,}$/.test(digits)) {
    return { valid: false, normalized: '' }
  }
  if (
    '0123456789012345'.includes(digits) ||
    '9876543210987654'.includes(digits) ||
    digits.includes('1234567') ||
    digits.includes('7654321')
  ) {
    return { valid: false, normalized: '' }
  }

  return { valid: true, normalized: `+${digits}` }
}

export default function SimpleContactForm({
  locale: propLocale,
  onProductsChange,
}: {
  locale?: string
  onProductsChange?: (products: string[]) => void
}) {
  const pathname = usePathname()
  const locale = propLocale || pathname.split('/')[1] || 'en'

  // Form state: nothing pre-selected by default so users must actively choose
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [projectStage, setProjectStage] = useState<ProjectStageKey | ''>('')
  const [targetCountries, setTargetCountries] = useState<string[]>([])
  const [customCountryInput, setCustomCountryInput] = useState('')
  const [messenger, setMessenger] = useState<MessengerChannel>('telegram')
  const [handleInput, setHandleInput] = useState('')
  const [email, setEmail] = useState('')
  const [sportsInterests, setSportsInterests] = useState<string[]>([])
  const [customSports, setCustomSports] = useState<string[]>([])
  const [customSportInput, setCustomSportInput] = useState('')
  const [showOtherSport, setShowOtherSport] = useState(false)
  const [streamerConcurrency, setStreamerConcurrency] = useState<string>('')
  const [platformInfo, setPlatformInfo] = useState('')
  const [requirements, setRequirements] = useState('')

  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const productOptions = [
    {
      value: 'website_app',
      tag: 'Streams / Push API',
      title: l(
        locale,
        '赛事直播线路接口服务',
        'Live Match Lines API',
        '賽事直播線路介面服務'
      ),
      desc: l(
        locale,
        '把单场赛事放进网站或 App。支持播放链接与 RTMP 推流二选一（建联后再定即可）。',
        'Live match feeds for sites & apps. Choose playable URLs or RTMP push during onboarding.',
        '把單場賽事放進網站或 App。支援播放連結與 RTMP 推流二選一（建聯後再定即可）。'
      ),
    },
    {
      value: 'iptv',
      tag: '100+ Channels',
      title: l(
        locale,
        '全球体育频道（100+ 体育台）',
        'Global Sports Channels (100+ TV)',
        '全球體育頻道（100+ 體育台）'
      ),
      desc: l(
        locale,
        '24/7 全天候欧美英亚体育频道与联赛球队台，含节目表（Schedule）与签名接口。',
        '100+ 24/7 sports networks & club channels with EPG schedule and URL signing.',
        '24/7 全天候歐美英亞體育頻道與聯賽球隊台，含節目表（Schedule）與簽名介面。'
      ),
    },
    {
      value: 'obs_streaming',
      tag: l(locale, '仅限足篮球', 'Football & Basketball', '僅限足籃球'),
      title: l(
        locale,
        'OBS 直播流机器人',
        'OBS Streamer Bot',
        'OBS 直播流機器人'
      ),
      desc: l(
        locale,
        'Telegram / Lark 群内发指令秒拿低延迟流贴进 OBS 开播（目前仅支持足球和篮球）。',
        'Query low-latency feeds in Telegram/Lark for OBS (Football & Basketball only).',
        'Telegram / Lark 群內發指令秒拿低延遲流貼進 OBS 開播（目前僅支援足球和籃球）。'
      ),
    },
  ]

  const streamerConcurrencyOptions = [
    {
      value: '1',
      title: l(locale, '1 人同时播', '1 Concurrent', '1 人同時播'),
    },
    {
      value: '2-5',
      title: l(locale, '2–5 人同时播', '2–5 Concurrent', '2–5 人同時播'),
    },
    {
      value: '6-15',
      title: l(locale, '6–15 人同时播', '6–15 Concurrent', '6–15 人同時播'),
    },
    {
      value: '15+',
      title: l(locale, '15 人以上同时播', '15+ Concurrent', '15 人以上同時播'),
    },
  ]

  const projectStageOptions: { value: ProjectStageKey; title: string }[] = [
    {
      value: 'live_traffic',
      title: l(locale, '已上线运营（有现成流量）', 'Live in Production', '已上線營運（有現成流量）'),
    },
    {
      value: 'ready_soon',
      title: l(locale, '开发收尾（2–4 周内上线）', 'Launching in 2–4 Weeks', '開發收尾（2–4 週內上線）'),
    },
    {
      value: 'in_development',
      title: l(locale, '研发中（1–3 个月内上线）', 'In Dev (1–3 Months)', '研發中（1–3 個月內上線）'),
    },
    {
      value: 'evaluating',
      title: l(locale, '立项筹备期（提前调研）', 'Early Planning', '立項籌備期（提前調研）'),
    },
  ]

  const regionPills = [
    { value: 'SEA', label: l(locale, '东南亚 (VN/TH/ID/MY/PH)', 'Southeast Asia (VN/TH/ID/MY)', '東南亞 (VN/TH/ID/MY/PH)') },
    { value: 'CN', label: l(locale, '中国大陆', 'Mainland China', '中國大陸') },
    { value: 'HMT', label: l(locale, '港澳台（繁中）', 'Hong Kong / Macau / Taiwan', '港澳台（繁中）') },
    { value: 'JP_KR', label: l(locale, '日韩', 'Japan / Korea', '日韓') },
    { value: 'RU', label: l(locale, '俄罗斯', 'Russia', '俄羅斯') },
    { value: 'EU_UK', label: l(locale, '欧洲 / 英国', 'Europe & UK', '歐洲 / 英國') },
    { value: 'NA', label: l(locale, '北美 (US / CA)', 'North America (US / CA)', '北美 (US / CA)') },
    { value: 'LATAM', label: l(locale, '拉美 (BR / MX / AR)', 'Latin America (BR / MX / AR)', '拉美 (BR / MX / AR)') },
    { value: 'SA_ME', label: l(locale, '南亚 / 中东 (IN / AE / SA)', 'South Asia & MENA (IN / AE)', '南亞 / 中東 (IN / AE / SA)') },
    { value: 'AU_NZ', label: l(locale, '澳新 / 非洲', 'ANZ & Africa', '澳新 / 非洲') },
  ]

  const sportsList = [
    { value: 'football', label: l(locale, '⚽ 足球', '⚽ Football / Soccer', '⚽ 足球') },
    { value: 'basketball', label: l(locale, '🏀 篮球', '🏀 Basketball', '🏀 籃球') },
    { value: 'cricket', label: l(locale, '🏏 板球', '🏏 Cricket', '🏏 板球') },
    { value: 'tennis', label: l(locale, '🎾 网球', '🎾 Tennis', '🎾 網球') },
    { value: 'baseball', label: l(locale, '⚾ 棒球', '⚾ Baseball', '⚾ 棒球') },
    { value: 'hockey', label: l(locale, '🏒 冰球', '🏒 Ice Hockey', '🏒 冰球') },
    { value: 'american_football', label: l(locale, '🏈 美式橄榄球', '🏈 American Football', '🏈 美式橄欖球') },
    { value: 'rugby', label: l(locale, '🏉 英式橄榄球', '🏉 Rugby', '🏉 英式橄欖球') },
    { value: 'esports', label: l(locale, '🎮 电竞 (LOL/CS/Dota2)', '🎮 Esports (LOL/CS/Dota2)', '🎮 電競 (LOL/CS/Dota2)') },
    { value: 'combat_wrestling', label: l(locale, '🥊 格斗 / 摔跤', '🥊 Combat / Wrestling', '🥊 格鬥 / 摔跤') },
    { value: 'motorsport', label: l(locale, '🏎️ 赛车 / F1', '🏎️ Motorsport / F1', '🏎️ 賽車 / F1') },
    { value: 'snooker', label: l(locale, '🎱 斯诺克 / 桌球', '🎱 Snooker / Billiards', '🎱 斯諾克 / 桌球') },
    { value: 'golf', label: l(locale, '⛳ 高尔夫', '⛳ Golf', '⛳ 高爾夫') },
  ]

  const iptvDefaultSchedules = [
    l(locale, '⚽ 足球 (Soccer)', '⚽ Soccer', '⚽ 足球 (Soccer)'),
    l(locale, '🏀 篮球 (Basketball)', '🏀 Basketball', '🏀 籃球 (Basketball)'),
    l(locale, '🏏 板球 (Cricket ★常驻)', '🏏 Cricket ★Active', '🏏 板球 (Cricket ★常駐)'),
    l(locale, '🎾 网球 (Tennis ★常驻)', '🎾 Tennis ★Active', '🎾 網球 (Tennis ★常駐)'),
    l(locale, '🎱 桌球/斯诺克 (Billiards ★常驻)', '🎱 Billiards / Snooker ★Active', '🎱 桌球/斯諾克 (Billiards ★常駐)'),
    l(locale, '⛳ 高尔夫 (Golf ★常驻)', '⛳ Golf ★Active', '⛳ 高爾夫 (Golf ★常駐)'),
    l(locale, '🏉 英式橄榄球 (Rugby ★常驻)', '🏉 Rugby League ★Active', '🏉 英式橄欖球 (Rugby ★常駐)'),
    l(locale, '🏈 美式橄榄球 (NFL)', '🏈 American Football', '🏈 美式橄欖球 (NFL)'),
    l(locale, '⚾ 棒球 (Baseball)', '⚾ Baseball', '⚾ 棒球 (Baseball)'),
    l(locale, '🏒 冰球 (Hockey)', '🏒 Ice Hockey', '🏒 冰球 (Hockey)'),
    l(locale, '🏎️ 赛车 / F1 / MotoGP (★常驻)', '🏎️ Motorsport / F1 / MotoGP ★Active', '🏎️ 賽車 / F1 / MotoGP (★常駐)'),
    l(locale, '🏇 赛马 (Horse Racing ★常驻)', '🏇 Horse Racing ★Active', '🏇 賽馬 (Horse Racing ★常駐)'),
    l(locale, '🥊 格斗 / 摔跤 (Combat / Wrestling)', '🥊 Combat / Wrestling', '🥊 格鬥 / 摔跤 (Combat / Wrestling)'),
    l(locale, '🎿 冬季运动 / 田径 / 自行车 (★常驻)', '🎿 Winter / Athletics / Cycling ★Active', '🎿 冬季運動 / 田徑 / 自行車 (★常駐)'),
  ]

  const toggleProduct = (val: string) => {
    setErrorMsg(null)
    setSelectedProducts((prev) => {
      const exists = prev.includes(val)
      const next = exists ? prev.filter((item) => item !== val) : [...prev, val]
      onProductsChange?.(next)
      return next
    })
  }

  const toggleRegion = (val: string) => {
    setErrorMsg(null)
    setTargetCountries((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    )
  }

  const toggleSport = (val: string) => {
    setErrorMsg(null)
    setSportsInterests((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    )
  }

  const addCustomSport = () => {
    const name = customSportInput.trim()
    if (!name) return
    if (customSports.some((item) => item.toLowerCase() === name.toLowerCase())) {
      setCustomSportInput('')
      return
    }
    setErrorMsg(null)
    setCustomSports((prev) => [...prev, name])
    setCustomSportInput('')
  }

  const hasMatchLines = selectedProducts.includes('website_app')
  const hasIptv = selectedProducts.includes('iptv')
  const hasObsSelected = selectedProducts.includes('obs_streaming')
  const onlyIptvSelected = selectedProducts.length === 1 && selectedProducts[0] === 'iptv'
  const onlyObsSelected = selectedProducts.length === 1 && selectedProducts[0] === 'obs_streaming'
  // Target country & Project stage are only required when Match Lines or Global Sports Channels is selected (NOT required for OBS Bot)
  const requiresPlatformFields = hasMatchLines || hasIptv
  const requiresTargetCountry = requiresPlatformFields

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (selectedProducts.length === 0) {
      setErrorMsg(
        l(locale, '请至少选择一项你感兴趣的产品服务', 'Please select at least one product service', '請至少選擇一項你感興趣的產品服務')
      )
      return
    }

    if (hasObsSelected && !streamerConcurrency) {
      setErrorMsg(
        l(locale, '请选择主播最大同时播流人数', 'Please select max concurrent streamers', '請選擇主播最大同時播流人數')
      )
      return
    }

    if (requiresPlatformFields && !projectStage) {
      setErrorMsg(
        l(locale, '请选择你当前的项目阶段', 'Please select your current project stage', '請選擇你目前的專案階段')
      )
      return
    }

    const combinedCountries = [
      ...targetCountries,
      ...(customCountryInput.trim() ? [customCountryInput.trim()] : []),
    ]
    if (requiresTargetCountry && combinedCountries.length === 0) {
      setErrorMsg(
        l(
          locale,
          '请选择观众主要所在地',
          'Please select where your viewers are',
          '請選擇觀眾主要所在地'
        )
      )
      return
    }

    if (hasMatchLines && sportsInterests.length + customSports.length === 0) {
      setErrorMsg(
        l(locale, '请选择需要接入的球类', 'Please choose the sports you need', '請選擇需要接入的球類')
      )
      return
    }

    const trimmedPlatform = platformInfo.trim()
    if (!trimmedPlatform) {
      setErrorMsg(
        onlyObsSelected
          ? l(locale, '请填写工作室名称', 'Enter your studio name', '請填寫工作室名稱')
          : l(
              locale,
              '请填写你的网站地址，方便我们了解产品形态',
              'Enter your website address so we can understand your product.',
              '請填寫你的網站地址，方便我們了解產品形態'
            )
      )
      return
    }
    if (!onlyObsSelected && !isPublicWebsiteUrl(trimmedPlatform)) {
      setErrorMsg(
        l(
          locale,
          '请填写可以打开的网站地址。localhost 和内网地址无法用来了解产品',
          'Enter a website address we can open. localhost and private addresses cannot be used to review the product.',
          '請填寫可以打開的網站地址。localhost 和內網地址無法用來了解產品'
        )
      )
      return
    }

    // Strict authenticity check on Telegram or WhatsApp (or Email-only fallback)
    let formattedContact = ''
    if (messenger === 'telegram') {
      const check = validateTelegramHandle(handleInput)
      if (!check.valid) {
        setErrorMsg(
          l(
            locale,
            '错误的联系方式：请输入真实的 Telegram 用户名（如 @sportlive_alex，5–32 位字母/数字/下划线）',
            'Invalid contact: Please enter a valid Telegram username (e.g. @alex_sports).',
            '錯誤的聯繫方式：請輸入真實的 Telegram 使用者名稱（如 @sportlive_alex，5–32 位字母/數字/底線）'
          )
        )
        return
      }
      formattedContact = `Telegram: ${check.normalized}`
    } else if (messenger === 'whatsapp') {
      const check = validateWhatsAppNumber(handleInput)
      if (!check.valid) {
        setErrorMsg(
          l(
            locale,
            '错误的联系方式：请输入带国际区号的真实 WhatsApp 手机号（如 +852 91234567 或 +44 7911123456）',
            'Invalid contact: Please enter a valid WhatsApp number with country code (e.g. +44 7911 123456).',
            '錯誤的聯繫方式：請輸入帶國際區號的真實 WhatsApp 手機號（如 +852 91234567 或 +44 7911123456）'
          )
        )
        return
      }
      formattedContact = `WhatsApp: ${check.normalized}`
    } else {
      formattedContact = 'Email Only (No Telegram / WhatsApp)'
    }

    const trimmedEmail = email.trim().toLowerCase()
    // TLD must be 2–12 letters only (rejects .c000, .123, etc.)
    const emailMatch = trimmedEmail.match(/^([a-z0-9._%+-]+)@([a-z0-9.-]+\.([a-z]{2,12}))$/)
    const fakeDomains = new Set([
      'gmasl.com',
      'gmial.com',
      'gamil.com',
      'gnail.com',
      'hotmial.com',
      'outlok.com',
      'yaho.com',
      'mailinator.com',
      '10minutemail.com',
      'tempmail.com',
      'yopmail.com',
      'test.com',
      'example.com',
    ])
    if (!emailMatch || fakeDomains.has(emailMatch[2])) {
      setErrorMsg(
        l(
          locale,
          '错误的邮箱地址：请输入格式正确且真实可收件的邮箱（如 name@company.com，请勿填假后缀或拼写错误的域名）',
          'Invalid email address: Please enter a real, deliverable email address (check domain spelling).',
          '錯誤的信箱地址：請輸入格式正確且真實可收件的信箱（如 name@company.com，請勿填假後綴或拼寫錯誤的域名）'
        )
      )
      return
    }

    setIsSubmitting(true)
    try {
      const userSource = getUserSourceInfo()
      const useCaseStr = selectedProducts.join(',')
      const finalSports = hasMatchLines
        ? [
            ...sportsInterests,
            ...customSports.map((name) => `other:${name}`),
          ]
        : hasObsSelected
          ? ['football', 'basketball']
          : []

      trackServiceInterest(useCaseStr, finalSports.length)
      trackContactPreference(formattedContact)

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          contactMethod: formattedContact,
          sportsInterests: finalSports,
          useCase: useCaseStr,
          projectStage: requiresPlatformFields ? projectStage : undefined,
          targetCountries: requiresTargetCountry ? combinedCountries.join(', ') : undefined,
          streamerType: hasObsSelected ? streamerConcurrency : undefined,
          platformInfo: platformInfo.trim() || undefined,
          requirements: requirements.trim() || undefined,
          userSource,
        }),
      })

      const result = await response.json()
      if (result.success) {
        setIsSubmitted(true)
        trackFormSubmit('contact_form', true)
      } else {
        trackFormSubmit('contact_form', false)
        setErrorMsg(
          result.error ||
            l(locale, '错误的联系方式或提交失败，请检查后重试', 'Invalid contact details or submission failed.', '錯誤的聯繫方式或提交失敗，請檢查後重試')
        )
      }
    } catch {
      trackFormSubmit('contact_form', false)
      setErrorMsg(
        l(locale, '网络异常，请稍后重试', 'Network error. Please try again.', '網路異常，請稍後重試')
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="border-2 border-brand-ink bg-white p-8 shadow-[6px_6px_0_0_#141414] sm:p-10">
        <div className="inline-flex h-12 w-12 items-center justify-center bg-brand-primary text-white">
          <Check className="h-6 w-6" />
        </div>
        <p className="mt-5 font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
          REQUEST RECEIVED · BUSINESS HOURS SGT
        </p>
        <h2 className="mt-1 text-2xl font-bold text-brand-ink sm:text-3xl">
          {l(locale, '需求已收到，我们将通过 Telegram / WhatsApp 与你建联', 'Request Received — We Will Message You Shortly', '需求已收到，我們將透過 Telegram / WhatsApp 與你建聯')}
        </h2>
        <p className="mt-3 text-sm leading-6 text-brand-muted">
          {l(
            locale,
            '我们会在新加坡时间（UTC+8）工作时段 10:30–20:30 内，第一时间通过你留下的 Telegram、WhatsApp 或邮箱联系你，并提供报价与测试安排。',
            'We will contact you at the first opportunity during business hours, 10:30–20:30 Singapore time (UTC+8), via the Telegram, WhatsApp, or email you left, with a quote and test arrangement.',
            '我們會在新加坡時間（UTC+8）工作時段 10:30–20:30 內，第一時間透過你留下的 Telegram、WhatsApp 或信箱聯繫你，並提供報價與測試安排。'
          )}
        </p>
        <div className="mt-6 border border-brand-line bg-brand-paper p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-brand-ink">
            {l(locale, '接下来会发生什么', 'What Happens Next', '接下來會發生什麼')}
          </h3>
          <ul className="mt-3 space-y-2 text-xs leading-5 text-brand-muted">
            {onlyObsSelected ? (
              <>
                <li>
                  • {l(locale, '按你选择的播流人数规模提供对应套餐报价', 'Share pricing matched to your concurrent streamer tier', '按你選擇的播流人數規模提供對應套餐報價')}
                </li>
                <li>
                  • {l(locale, '将机器人拉入你的 Telegram / Lark 群并开通查流权限，主播即可发指令开播', 'Add the bot to your Telegram or Lark group and activate live feed commands for OBS', '將機器人拉入你的 Telegram / Lark 群並開通查流權限，主播即可發指令開播')}
                </li>
              </>
            ) : (
              <>
                <li>
                  • {l(locale, '拉 1 对 1 专属群，沟通接入方式（播放链接或 RTMP 推流）与套餐报价', 'Open a dedicated 1-on-1 group to confirm delivery mode and pricing tiers', '拉 1 對 1 專屬群，溝通接入方式（播放連結或 RTMP 推流）與套餐報價')}
                </li>
                <li>
                  • {l(locale, '按你填写的观众所在地配置防盗链白名单与 CDN 加速节点，发放正式或测试 Key', 'Configure geo-allowlists and CDN routing for your viewers and issue your API key', '按你填寫的觀眾所在地配置防盜鏈白名單與 CDN 加速節點，發放正式或測試 Key')}
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="border-2 border-brand-ink bg-white shadow-[6px_6px_0_0_#141414]">
      {/* Top Console Bar */}
      <div className="flex items-center justify-between border-b border-brand-line bg-brand-ink px-6 py-3 text-white">
        <span className="font-mono text-xs font-bold uppercase tracking-wider">
          {l(locale, '对接需求登记表', 'B2B INQUIRY FORM', '對接需求登記表')}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-7">
        {/* STEP 1: Product Selection (3 Core Products) */}
        <div>
          <label className="block text-sm font-bold text-brand-ink">
            1. {l(locale, '你对哪块产品服务感兴趣？（可多选）', 'Which product services are you interested in? (Select all that apply)', '你對哪塊產品服務感興趣？（可多選）')}{' '}
            <span className="text-brand-primary">*</span>
          </label>

          <div className="mt-2.5 grid gap-3 sm:grid-cols-3">
            {productOptions.map((item) => {
              const active = selectedProducts.includes(item.value)
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => toggleProduct(item.value)}
                  className={`flex flex-col justify-between border p-3.5 text-left transition-colors ${
                    active
                      ? 'border-brand-primary bg-brand-tint/35 ring-1 ring-brand-primary'
                      : 'border-brand-line bg-white hover:border-brand-ink'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`font-mono text-[10px] font-bold uppercase px-1.5 py-0.5 ${
                          active ? 'bg-brand-primary text-white' : 'bg-brand-paper text-brand-muted'
                        }`}
                      >
                        {item.tag}
                      </span>
                      <span
                        className={`inline-flex h-4 w-4 items-center justify-center border text-[10px] font-bold ${
                          active
                            ? 'border-brand-primary bg-brand-primary text-white'
                            : 'border-brand-line bg-white text-transparent'
                        }`}
                      >
                        ✓
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-bold leading-5 text-brand-ink">{item.title}</p>
                  </div>
                  <p className="mt-1.5 text-xs leading-5 text-brand-muted">{item.desc}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Conditional: Max concurrent streamers when OBS Bot is selected */}
        {hasObsSelected && (
          <div className="border border-brand-line bg-brand-paper/60 p-4">
            <label className="block text-sm font-bold text-brand-ink">
              {l(
                locale,
                '主播最大同时播流人数',
                'Max Concurrent Streamers',
                '主播最大同時播流人數'
              )}{' '}
              <span className="text-brand-primary">*</span>
            </label>
            <div className="mt-2.5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {streamerConcurrencyOptions.map((opt) => {
                const active = streamerConcurrency === opt.value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setStreamerConcurrency(opt.value)}
                    className={`flex items-center justify-between border px-3 py-2.5 text-left transition-colors ${
                      active
                        ? 'border-brand-primary bg-white ring-1 ring-brand-primary'
                        : 'border-brand-line bg-white hover:border-brand-ink'
                    }`}
                  >
                    <span className="text-xs font-bold text-brand-ink">{opt.title}</span>
                    <span
                      className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border text-[9px] font-bold ${
                        active
                          ? 'border-brand-primary bg-brand-primary text-white'
                          : 'border-brand-line bg-white text-transparent'
                      }`}
                    >
                      •
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Current Project Stage (Only shown when Match Lines or IPTV is selected) */}
        {requiresPlatformFields && (
          <div>
            <label className="block text-sm font-bold text-brand-ink">
              2. {l(locale, '当前项目阶段', 'Current Project Stage', '目前專案階段')}{' '}
              <span className="text-brand-primary">*</span>
            </label>
            <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {projectStageOptions.map((stage) => {
                const active = projectStage === stage.value
                return (
                  <button
                    key={stage.value}
                    type="button"
                    onClick={() => {
                      setErrorMsg(null)
                      setProjectStage(stage.value)
                    }}
                    className={`flex items-center justify-between border px-3 py-2.5 text-left transition-colors ${
                      active
                        ? 'border-brand-primary bg-brand-tint/35 ring-1 ring-brand-primary'
                        : 'border-brand-line bg-white hover:border-brand-ink'
                    }`}
                  >
                    <span className="text-xs font-bold text-brand-ink">{stage.title}</span>
                    <span
                      className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border text-[9px] font-bold ${
                        active
                          ? 'border-brand-primary bg-brand-primary text-white'
                          : 'border-brand-line bg-white text-transparent'
                      }`}
                    >
                      •
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Target Countries / Regions (Required when Match Lines or IPTV is selected) */}
        {requiresTargetCountry && (
          <div className="border border-brand-line bg-brand-paper/40 p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <label className="text-sm font-bold text-brand-ink">
                3. {l(locale, '目标观众主要所在地（可多选）', 'Where most viewers are (multiple)', '目標觀眾主要所在地（可多選）')}{' '}
                <span className="text-brand-primary">*</span>
              </label>
              <span className="text-[11px] text-brand-muted">
                {l(
                  locale,
                  '用于判断线路和频道怎么配',
                  'Used to recommend lines or channels',
                  '用於判斷線路和頻道怎麼配'
                )}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {regionPills.map((region) => {
                const active = targetCountries.includes(region.value)
                return (
                  <button
                    key={region.value}
                    type="button"
                    onClick={() => toggleRegion(region.value)}
                    className={`border px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                      active
                        ? 'border-brand-primary bg-brand-primary text-white'
                        : 'border-brand-line bg-white text-brand-ink hover:border-brand-primary'
                    }`}
                  >
                    {region.label}
                  </button>
                )
              })}
            </div>

            <input
              type="text"
              value={customCountryInput}
              onChange={(e) => {
                setErrorMsg(null)
                setCustomCountryInput(e.target.value)
              }}
              placeholder={l(
                locale,
                '或直接补充具体国家/地区名称（如：越南、巴西、英国、印度等）',
                'Or specify exact countries (e.g. Vietnam, Brazil, UK, India...)',
                '或直接補充具體國家/地區名稱（如：越南、巴西、英國、印度等）'
              )}
              className="mt-2 w-full border border-brand-line bg-white px-3 py-2 text-xs text-brand-ink placeholder:text-brand-muted focus:border-brand-primary focus:outline-none"
            />
          </div>
        )}

        {hasMatchLines && !hasIptv && targetCountries.length > 0 && !customCountryInput.trim() && targetCountries.every((code) => ['EU_UK', 'NA', 'LATAM'].includes(code)) && (
          <div className="border-2 border-brand-ink bg-brand-tint p-4">
            <p className="text-sm leading-6 text-brand-ink">
              {l(
                locale,
                '你的观众主要在欧洲、北美或拉美。如果只需要英超、NBA 这类欧美顶级联赛，全球体育频道（100+ 频道）可能已经够用。需要其他联赛，或按单场接到自己的赛程里，继续选择赛事直播线路即可。',
                'Your viewers are mainly in Europe, North America, or Latin America. If you only need top European and US competitions such as the Premier League and the NBA, Global Sports Channels may already be enough. Keep Live Match Lines if you need other competitions, or a line for each fixture on your own schedule.',
                '你的觀眾主要在歐洲、北美或拉美。如果只需要英超、NBA 這類歐美頂級聯賽，全球體育頻道（100+ 頻道）可能已經夠用。需要其他聯賽，或按單場接到自己的賽程裡，繼續選擇賽事直播線路即可。'
              )}
            </p>
            <button
              type="button"
              onClick={() => toggleProduct('iptv')}
              className="mt-3 bg-brand-ink px-3 py-2 text-xs font-bold text-white"
            >
              {l(locale, '加入全球体育频道', 'Add Global Sports Channels', '加入全球體育頻道')}
            </button>
          </div>
        )}

        {/* STEP 4: Instant Messenger (Telegram / WhatsApp / Neither) + Work Email */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-bold text-brand-ink">
              {requiresPlatformFields ? '4.' : '2.'}{' '}
              {l(locale, '即时通讯方式', 'Instant Messenger', '即時通訊方式')}{' '}
              <span className="text-brand-primary">*</span>
            </label>
            <div className="mt-2 flex border border-brand-line bg-brand-paper p-0.5 text-xs">
              <button
                type="button"
                onClick={() => {
                  setErrorMsg(null)
                  setMessenger('telegram')
                }}
                className={`flex-1 py-1.5 font-mono text-xs font-bold transition-colors ${
                  messenger === 'telegram' ? 'bg-brand-ink text-white' : 'text-brand-muted hover:text-brand-ink'
                }`}
              >
                Telegram
              </button>
              <button
                type="button"
                onClick={() => {
                  setErrorMsg(null)
                  setMessenger('whatsapp')
                }}
                className={`flex-1 py-1.5 font-mono text-xs font-bold transition-colors ${
                  messenger === 'whatsapp' ? 'bg-brand-ink text-white' : 'text-brand-muted hover:text-brand-ink'
                }`}
              >
                WhatsApp
              </button>
              <button
                type="button"
                onClick={() => {
                  setErrorMsg(null)
                  setMessenger('none')
                }}
                className={`flex-1 py-1.5 text-xs font-bold transition-colors ${
                  messenger === 'none' ? 'bg-brand-ink text-white' : 'text-brand-muted hover:text-brand-ink'
                }`}
              >
                {l(locale, '以上都没有', 'Neither', '以上都沒有')}
              </button>
            </div>
            {messenger === 'none' ? (
              <div className="mt-2 border border-brand-primary/40 bg-brand-tint/40 px-3.5 py-2.5 text-xs leading-5 text-brand-ink">
                {l(
                  locale,
                  '我们将通过邮件与你联系，请在右侧留好正确的邮箱地址，并注意查收邮件（含垃圾邮件箱）。',
                  'We will contact you via email. Please make sure your email address on the right is accurate and check your inbox.',
                  '我們將透過郵件與你聯繫，請在右側留好正確的信箱地址，並注意查收郵件（含垃圾郵件匣）。'
                )}
              </div>
            ) : (
              <input
                type="text"
                value={handleInput}
                onChange={(e) => {
                  setErrorMsg(null)
                  setHandleInput(e.target.value)
                }}
                placeholder={
                  messenger === 'telegram'
                    ? l(locale, '例如 @sportlive_alex', 'e.g. @alex_sports', '例如 @sportlive_alex')
                    : l(locale, '带国际区号，如 +852 9123 4567 或 +44 7911 123456', 'With country code, e.g. +44 7911 123456', '帶國際區號，如 +852 9123 4567 或 +44 7911 123456')
                }
                className="mt-2 w-full border border-brand-line bg-white px-3.5 py-2.5 font-mono text-xs text-brand-ink placeholder:text-brand-muted focus:border-brand-primary focus:outline-none"
              />
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-sm font-bold text-brand-ink">
              {requiresPlatformFields ? '5.' : '3.'}{' '}
              {l(locale, '工作邮箱', 'Work Email', '工作信箱')}{' '}
              <span className="text-brand-primary">*</span>
            </label>
            <div className="mt-1 text-[11px] leading-4 text-brand-muted">
              {l(
                locale,
                '用于发送对接销售的联系方式以及后续报价信息',
                'Used to send the salesperson’s contact details and later quotes',
                '用於發送對接銷售的聯繫方式以及後續報價資訊'
              )}
            </div>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => {
                setErrorMsg(null)
                setEmail(e.target.value)
              }}
              placeholder="name@company.com"
              className="mt-2 w-full border border-brand-line bg-white px-3.5 py-2.5 font-mono text-xs text-brand-ink placeholder:text-brand-muted focus:border-brand-primary focus:outline-none"
            />
          </div>
        </div>

        {hasMatchLines && (
          <div>
            <label className="block text-sm font-bold text-brand-ink">
              6. {l(locale, '需要接入的球类', 'Sports to connect', '需要接入的球類')}
              <span className="ml-1 text-brand-primary">*</span>
            </label>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {sportsList.map((sport) => {
                const active = sportsInterests.includes(sport.value)
                return (
                  <button
                    key={sport.value}
                    type="button"
                    onClick={() => toggleSport(sport.value)}
                    className={`border px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                      active
                        ? 'border-brand-primary bg-brand-primary text-white'
                        : 'border-brand-line bg-white text-brand-ink hover:border-brand-primary'
                    }`}
                  >
                    {sport.label}
                  </button>
                )
              })}
              <button
                type="button"
                onClick={() => {
                  setErrorMsg(null)
                  setShowOtherSport((open) => !open)
                }}
                className={`border px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                  showOtherSport || customSports.length > 0
                    ? 'border-brand-primary bg-brand-primary text-white'
                    : 'border-brand-line bg-white text-brand-ink hover:border-brand-primary'
                }`}
              >
                {l(locale, '其他', 'Other', '其他')}
              </button>
            </div>
            {(showOtherSport || customSports.length > 0) && (
              <div className="mt-3">
                {customSports.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {customSports.map((name) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => setCustomSports((prev) => prev.filter((item) => item !== name))}
                        className="border border-brand-primary bg-brand-primary px-2.5 py-1.5 text-xs font-semibold text-white"
                      >
                        {name} ×
                      </button>
                    ))}
                  </div>
                )}
                {showOtherSport && (
                  <input
                    type="text"
                    value={customSportInput}
                    onChange={(e) => setCustomSportInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addCustomSport()
                      }
                    }}
                    placeholder={l(locale, '填写球类名称，按回车确认', 'Type a sport, then press Enter', '填寫球類名稱，按回車確認')}
                    className="w-full border border-brand-line bg-white px-3 py-2 text-xs text-brand-ink placeholder:text-brand-muted focus:border-brand-primary focus:outline-none"
                  />
                )}
              </div>
            )}
          </div>
        )}

        {onlyIptvSelected && (
          <div className="border border-brand-line bg-brand-paper/60 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-brand-ink">
                {l(
                  locale,
                  '默认全量开通以下 19 类运动节目表（Schedule）：',
                  'All 19 sport schedules included by default:',
                  '預設全量開通以下 19 類運動節目表（Schedule）：'
                )}
              </span>
              <span className="bg-emerald-100 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-800">
                {l(locale, '默认全含', 'Included', '預設全含')}
              </span>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {iptvDefaultSchedules.map((label) => (
                <span
                  key={label}
                  className="border border-brand-line bg-white px-2 py-1 text-[11px] font-medium text-brand-ink"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-brand-ink">
            {l(
              locale,
              onlyObsSelected ? '工作室名称' : '你的网站地址',
              onlyObsSelected ? 'Studio name' : 'Your website address',
              onlyObsSelected ? '工作室名稱' : '你的網站地址'
            )}
            <span className="ml-1 text-brand-primary">*</span>
          </label>
          <p className="mt-1 text-[11px] leading-4 text-brand-muted">
            {l(
              locale,
              onlyObsSelected
                ? '仅用于开通服务时在内部区分客户'
                : projectStage === 'in_development' || projectStage === 'evaluating'
                  ? '用来了解你的产品形态，判断适合哪项服务，方便后面沟通。还没有自己的网站时，填写你想做成类似的产品网址。'
                  : '用来了解你的产品形态，判断适合哪项服务，方便后面沟通。',
              onlyObsSelected
                ? 'Used only internally to tell customers apart when the service is activated'
                : projectStage === 'in_development' || projectStage === 'evaluating'
                  ? 'So we can see what you are building, match the right service, and talk more efficiently. If you do not have a site yet, enter the URL of a product you want it to resemble.'
                  : 'So we can see your product, match the right service, and talk more efficiently.',
              onlyObsSelected
                ? '僅用於開通服務時在內部區分客戶'
                : projectStage === 'in_development' || projectStage === 'evaluating'
                  ? '用來了解你的產品形態，判斷適合哪項服務，方便後面溝通。還沒有自己的網站時，填寫你想做成類似的產品網址。'
                  : '用來了解你的產品形態，判斷適合哪項服務，方便後面溝通。'
            )}
          </p>
          <input
            type="text"
            value={platformInfo}
            onChange={(e) => setPlatformInfo(e.target.value)}
            placeholder={l(
              locale,
              onlyObsSelected ? '例如：星耀体育工作室' : 'https://yoursite.com',
              onlyObsSelected ? 'e.g. Northstar Studio' : 'https://yoursite.com',
              onlyObsSelected ? '例如：星耀體育工作室' : 'https://yoursite.com'
            )}
            className="mt-1.5 w-full border border-brand-line bg-white px-3 py-2 text-xs text-brand-ink placeholder:text-brand-muted focus:border-brand-primary focus:outline-none"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-brand-ink">
              {l(locale, '补充说明（选填）', 'Additional Notes (Optional)', '補充說明（選填）')}
            </label>
            <input
              type="text"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder={l(
                locale,
                '您还有什么特别需要说明的，请填写',
                'If there is anything else you want to explain, please write it here',
                '您還有什麼特別需要說明的，請填寫'
              )}
              className="mt-1.5 w-full border border-brand-line bg-white px-3 py-2 text-xs text-brand-ink placeholder:text-brand-muted focus:border-brand-primary focus:outline-none"
            />
          </div>
        </div>

        {errorMsg && (
          <div className="border border-[#E11D48] bg-[#E11D48]/10 px-4 py-2.5 text-xs font-semibold text-[#E11D48]">
            {errorMsg}
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-brand-line pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] leading-4 text-brand-muted">
            {l(
              locale,
              '🔒 信息仅用于商务拉群、配置 CDN/防盗链与发放测试权限，绝不外泄。',
              '🔒 Used strictly for onboarding, CDN/allowlist setup, and trial provisioning.',
              '🔒 資訊僅用於商務拉群、配置 CDN/防盜鏈與發放測試權限，絕不外洩。'
            )}
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="shrink-0 bg-brand-primary px-7 py-3 text-sm font-bold text-white shadow-[4px_4px_0_0_#141414] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark disabled:opacity-60"
          >
            {isSubmitting
              ? l(locale, '正在提交...', 'Submitting...', '正在提交...')
              : l(locale, '提交并获取方案与报价 →', 'Get Plan, Quote & Trial →', '提交並取得方案與報價 →')}
          </button>
        </div>
      </form>
    </div>
  )
}
