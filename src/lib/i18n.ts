import { notFound } from 'next/navigation'

const SUPPORTED_LOCALES = ['en', 'zh', 'zh-TW'] as const

type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

// 验证locale是否有效
export function isValidLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale)
}

// 动态导入翻译文件
export async function getMessages(locale: string) {
  if (!isValidLocale(locale)) {
    notFound()
  }

  try {
    const messages = await import(`@/messages/${locale}.json`)
    return messages.default
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error)
    // If loading fails, throw an error instead of falling back
    throw error;
  }
}

// 获取嵌套对象的值
export function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : path
  }, obj)
}

// 创建翻译函数
export function createTranslator(messages: any) {
  return function t(key: string, fallback?: string): string {
    const value = getNestedValue(messages, key)
    return typeof value === 'string' ? value : fallback || key
  }
}

// 支持的语言列表
export { SUPPORTED_LOCALES }
export type { SupportedLocale }