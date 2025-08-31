import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Script from 'next/script'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <head>
        {/* Google Analytics - 外部脚本 */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-7GFBPM5LLB"
        />
        {/* Google Ads 转化跟踪 - 外部脚本 */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-17429360235"
        />
        {/* Google Analytics - 初始化脚本 */}
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7GFBPM5LLB', {
                page_title: document.title,
                page_location: window.location.href,
              });
              gtag('config', 'AW-17429360235');
              console.log('🔍 Google Analytics 已初始化: G-7GFBPM5LLB');
              console.log('🎯 Google Ads 转化跟踪已初始化: AW-17429360235');
            `,
          }}
        />
      </head>
      {children}
    </>
  )
}