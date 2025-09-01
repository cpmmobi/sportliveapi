import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'zh', 'zh-TW'],

  // Used when no locale matches
  defaultLocale: 'zh',

  // Always use locale prefix
  localePrefix: 'always'
})

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(zh|en|zh-TW)/:path*']
}