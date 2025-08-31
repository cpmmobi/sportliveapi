'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

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

export default function LanguageDetector() {
  const router = useRouter()
  const pathname = usePathname()
  
  useEffect(() => {
    // 只在根路径 /en 时进行语言检测
    if (pathname !== '/en') return
    
    // 检查是否已经有语言偏好存储
    const storedLocale = localStorage.getItem('preferred-locale')
    if (storedLocale && SUPPORTED_LOCALES.includes(storedLocale as SupportedLocale)) {
      if (storedLocale !== 'en') {
        router.replace(`/${storedLocale}`)
        return
      }
    }
    
    // 检测浏览器语言偏好
    const browserLangs = navigator.languages || [navigator.language]
    let target: SupportedLocale | null = null
    
    // 遍历用户的语言偏好列表，找到第一个匹配的
    for (const lang of browserLangs) {
      const mapped = mapLangToSupported(lang)
      if (mapped) {
        target = mapped
        break
      }
    }
    
    // 如果检测到的语言不是英文，则重定向
    if (target && target !== 'en') {
      localStorage.setItem('preferred-locale', target)
      router.replace(`/${target}`)
    } else {
      // 存储英文偏好
      localStorage.setItem('preferred-locale', 'en')
    }
  }, [pathname, router])
  
  return null
}