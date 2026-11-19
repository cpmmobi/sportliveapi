import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'
import {
  clearQuoteSession,
  quoteCredentialsMatch,
  quoteGateConfigured,
  quoteRequestAllowed,
  withQuoteSession,
} from '@/lib/quote-gate'

export const dynamic = 'force-dynamic'

function pageHeaders() {
  return {
    'Content-Type': 'text/html; charset=utf-8',
    'X-Robots-Tag': 'noindex, nofollow, noarchive',
    'Cache-Control': 'private, no-store',
    'Referrer-Policy': 'no-referrer',
  }
}

function loginPage(error: string) {
  const notice = error
    ? `<p class="error">${error}</p>`
    : '<p class="hint">仅供 SportLiveAPI 内部使用。</p>'
  return `<!DOCTYPE html>
<html lang="zh-Hans">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow, noarchive" />
  <title>报价后台 · SportLiveAPI</title>
  <style>
    body { margin:0; min-height:100vh; display:grid; place-items:center; background:#F3EEEF; color:#141414; font-family:Inter,"PingFang SC","Noto Sans SC",sans-serif; }
    form { width:min(420px, calc(100% - 32px)); background:#fff; border:2px solid #141414; box-shadow:8px 8px 0 0 #141414; }
    .bar { height:8px; background:#FC0078; }
    .pad { padding:28px; }
    p.brand { margin:0; color:#FC0078; font-size:12px; font-weight:700; letter-spacing:.14em; }
    h1 { margin:8px 0 0; font-size:28px; letter-spacing:-.03em; }
    .hint, .error { margin:12px 0 0; font-size:13px; line-height:1.6; }
    .hint { color:#5E5E5E; }
    .error { color:#FC0078; font-weight:700; }
    label { display:block; margin:18px 0 6px; font-size:12px; font-weight:700; }
    input { width:100%; box-sizing:border-box; border:2px solid #141414; padding:10px; font:inherit; }
    button { margin-top:18px; width:100%; border:2px solid #141414; background:#141414; color:#fff; padding:10px; font:inherit; font-weight:700; cursor:pointer; }
  </style>
</head>
<body>
  <form method="post" action="/private/quote">
    <div class="bar"></div>
    <div class="pad">
      <p class="brand">SPORTLIVE API</p>
      <h1>报价后台</h1>
      ${notice}
      <label for="account">账号</label>
      <input id="account" name="account" autocomplete="username" required />
      <label for="password">密码</label>
      <input id="password" name="password" type="password" autocomplete="current-password" required />
      <button type="submit">进入</button>
    </div>
  </form>
</body>
</html>`
}

function builderPage() {
  const file = path.join(process.cwd(), 'quotes', 'builder.html')
  const html = fs.readFileSync(file, 'utf8').replace(
    '<head>',
    `<head>
  <meta name="robots" content="noindex, nofollow, noarchive" />`
  )
  return html
}

export function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.has('logout')) {
    const response = new NextResponse(loginPage(''), { headers: pageHeaders() })
    return clearQuoteSession(response)
  }
  if (!quoteGateConfigured()) {
    return new NextResponse(loginPage('登录账号还没配置。'), { status: 503, headers: pageHeaders() })
  }
  if (!quoteRequestAllowed(request)) {
    return new NextResponse(loginPage(''), { headers: pageHeaders() })
  }
  return new NextResponse(builderPage(), { headers: pageHeaders() })
}

export async function POST(request: NextRequest) {
  if (!quoteGateConfigured()) {
    return new NextResponse(loginPage('登录账号还没配置。'), { status: 503, headers: pageHeaders() })
  }
  const form = await request.formData()
  const account = String(form.get('account') || '').trim()
  const password = String(form.get('password') || '')
  if (!quoteCredentialsMatch(account, password)) {
    return new NextResponse(loginPage('账号或密码不正确。'), { status: 401, headers: pageHeaders() })
  }
  const response = NextResponse.redirect(new URL('/private/quote', request.url), 303)
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive')
  response.headers.set('Cache-Control', 'private, no-store')
  return withQuoteSession(response, request, account)
}
