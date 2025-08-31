import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => {
  // 如果locale不存在，使用默认值
  const currentLocale = locale || 'zh'
  
  // 直接导入消息文件，避免动态导入
  let messages
  try {
    if (currentLocale === 'en') {
      messages = (await import('@/messages/en.json')).default
    } else if (currentLocale === 'zh-TW') {
      messages = (await import('@/messages/zh-TW.json')).default
    } else {
      messages = (await import('@/messages/zh.json')).default
    }
  } catch (error) {
    console.error(`Failed to load messages for locale: ${currentLocale}`, error)
    // 回退到中文
    messages = (await import('@/messages/zh.json')).default
  }
  
  return {
    locale: currentLocale,
    messages
  }
})