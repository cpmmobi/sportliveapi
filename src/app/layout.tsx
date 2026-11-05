import { headers } from 'next/headers'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { htmlLang } from '@/lib/seo'
import { cn } from '@/lib/utils'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = headers().get('x-site-locale') || 'zh'

  return (
    <html lang={htmlLang(locale)} suppressHydrationWarning className={cn(inter.variable)}>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.className)}>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-7GFBPM5LLB" />
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=AW-17429360235" />
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
            `,
          }}
        />
        {children}
      </body>
    </html>
  )
}
