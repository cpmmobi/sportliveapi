import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const SUPPORTED_LOCALES = ['en', 'zh', 'zh-TW'] as const

type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

function mapLangToSupported(lang: string): SupportedLocale | null {
  const l = lang.toLowerCase()
  
  // 英文匹配
  if (l.startsWith('en')) return 'en'
  
  // 繁体中文匹配：台湾、香港、澳门或显式繁体标记
  if (
    l === 'zh-tw' || 
    l === 'zh-hk' || 
    l === 'zh-mo' || 
    l.startsWith('zh-hant') ||
    l.includes('taiwan') ||
    l.includes('hongkong') ||
    l.includes('macau')
  ) {
    return 'zh-TW'
  }
  
  // 简体中文匹配：大陆、新加坡或显式简体标记
  if (
    l === 'zh' || 
    l === 'zh-cn' || 
    l === 'zh-sg' ||
    l.startsWith('zh-hans') ||
    l.includes('china') ||
    l.includes('singapore')
  ) {
    return 'zh'
  }
  
  // 其他zh开头的语言，默认简体
  if (l.startsWith('zh')) return 'zh'
  
  return null
}

export default function RootRedirect() {
  const accept = headers().get('accept-language') || ''
  const langs = accept
    .split(',')
    .map((item) => item.trim().split(';')[0].toLowerCase())
    .filter(Boolean)

  let target: SupportedLocale | null = null
  
  // 遍历用户的语言偏好列表，找到第一个匹配的
  for (const lang of langs) {
    const mapped = mapLangToSupported(lang)
    if (mapped) {
      target = mapped
      break
    }
  }

  // 如果没有匹配的语言，默认使用英文
  if (!target) target = 'en'
  
  redirect(`/${target}`)
}