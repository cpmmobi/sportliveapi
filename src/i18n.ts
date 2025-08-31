import { getRequestConfig } from 'next-intl/server'
import { getMessages } from '@/lib/i18n'

export default getRequestConfig(async ({ locale }) => {
  // 如果locale不存在，使用默认值
  const currentLocale = locale || 'zh'
  
  const messages = await getMessages(currentLocale)
  
  return {
    locale: currentLocale,
    messages
  }
})