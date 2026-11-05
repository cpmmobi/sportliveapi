// Google Analytics 工具函数

// 追踪页面浏览
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-7GFBPM5LLB', {
      page_title: title || document.title,
      page_location: url,
    })
  }
}

// 追踪事件
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// 追踪表单提交
export const trackFormSubmit = (formName: string, success: boolean = true) => {
  trackEvent('form_submit', 'engagement', formName, success ? 1 : 0)
  
  // Google Ads 转化事件追踪
  if (success && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-17429360235/YnXkCNidzP4aEOvc-_ZA',
      'value': 1.0,
      'currency': 'SGD'
    })
    console.log('🎯 Google Ads 转化事件已触发')
  }
}

// 追踪按钮点击
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent('click', 'engagement', `${buttonName}${location ? `_${location}` : ''}`)
}

// 追踪服务兴趣
export const trackServiceInterest = (serviceType: string, sportsCount: number) => {
  trackEvent('service_interest', 'business', serviceType, sportsCount)
}

// 追踪联系方式偏好
export const trackContactPreference = (contactMethod: string) => {
  const method = contactMethod.startsWith('@') ? 'telegram' : 'qq'
  trackEvent('contact_preference', 'business', method)
}

// 追踪页面停留时间
export const trackPageDwellTime = (pageName: string, duration: number) => {
  trackEvent('page_dwell_time', 'engagement', pageName, Math.round(duration / 1000))
}

// Google Ads 转化事件追踪 (独立函数)
export const trackGoogleAdsConversion = (value: number = 1.0, currency: string = 'SGD') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-17429360235/YnXkCNidzP4aEOvc-_ZA',
      'value': value,
      'currency': currency
    })
    console.log('🎯 Google Ads 转化事件已触发:', { value, currency })
  }
}