'use client'

import { useEffect } from 'react'

interface GoogleAnalyticsProps {
  GA_MEASUREMENT_ID: string
  GOOGLE_ADS_ID?: string
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID, GOOGLE_ADS_ID }: GoogleAnalyticsProps) {
  useEffect(() => {
    // 检查是否在浏览器环境
    if (typeof window === 'undefined') return

    // 如果gtag已经存在，不重复初始化
    if (typeof window.gtag === 'function') return

    // 创建dataLayer
    window.dataLayer = window.dataLayer || []
    
    // 定义gtag函数
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    
    // 挂载到window对象
    window.gtag = gtag

    // 初始化
    gtag('js', new Date())
    
    // 配置Google Analytics (GA4)
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    })

    console.log('🔍 Google Analytics 已初始化:', GA_MEASUREMENT_ID)

    // 配置Google Ads转化跟踪
    if (GOOGLE_ADS_ID) {
      gtag('config', GOOGLE_ADS_ID)
      console.log('🎯 Google Ads 转化跟踪已初始化:', GOOGLE_ADS_ID)
    }
  }, [GA_MEASUREMENT_ID, GOOGLE_ADS_ID])

  return null
}

// 扩展window对象类型
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}