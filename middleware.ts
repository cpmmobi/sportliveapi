import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'

const LOCALES = ['en', 'zh-TW', 'zh'] as const
const RETIRED_LOCALES = new Set(['es', 'pt', 'fr', 'de', 'it', 'ru', 'ja', 'ko', 'tr', 'ar'])

const intlMiddleware = createMiddleware({
  locales: [...LOCALES],
  defaultLocale: 'zh',
  localePrefix: 'always',
  localeDetection: true,
})

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const segment = pathname.split('/')[1] || ''

  if (RETIRED_LOCALES.has(segment)) {
    const rest = pathname.split('/').slice(2).filter(Boolean).join('/')
    const url = request.nextUrl.clone()
    url.pathname = rest ? `/en/${rest}` : '/en'
    return NextResponse.redirect(url, 301)
  }

  const locale = LOCALES.includes(segment as (typeof LOCALES)[number]) ? segment : 'zh'
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-site-locale', locale)
  requestHeaders.set('x-site-path', pathname)

  const intlResponse = intlMiddleware(request)
  if (intlResponse.headers.get('location')) return intlResponse

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  const rewrite = intlResponse.headers.get('x-middleware-rewrite')
  if (rewrite) response.headers.set('x-middleware-rewrite', rewrite)
  intlResponse.headers.forEach((value, key) => {
    if (key === 'set-cookie' || key.startsWith('x-middleware-')) return
    response.headers.set(key, value)
  })
  const setCookies = typeof intlResponse.headers.getSetCookie === 'function' ? intlResponse.headers.getSetCookie() : []
  for (const cookie of setCookies) response.headers.append('set-cookie', cookie)
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
