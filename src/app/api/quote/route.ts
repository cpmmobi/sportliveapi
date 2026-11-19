import { NextRequest, NextResponse } from 'next/server'
import { isQuoteLocale } from '@/lib/quote-letter'
import { quoteRequestAllowed } from '@/lib/quote-gate'
import { listSalesEmails, sendQuoteMail } from '@/lib/quote-mail'

const PREVIEW_ORIGINS = new Set(['http://127.0.0.1:8765', 'http://localhost:8765'])

function quoteAccessAllowed(request: NextRequest) {
  if (process.env.NODE_ENV === 'development') return true
  return quoteRequestAllowed(request)
}

function deny(request: NextRequest) {
  return withCors(
    request,
    NextResponse.json({ sent: false, error: 'unauthorized' }, { status: 401, headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' } })
  )
}

function withCors(request: NextRequest, response: NextResponse) {
  const origin = request.headers.get('origin') || ''
  if (PREVIEW_ORIGINS.has(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Vary', 'Origin')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  }
  return response
}

export function OPTIONS(request: NextRequest) {
  return withCors(request, new NextResponse(null, { status: 204 }))
}

export function GET(request: NextRequest) {
  if (!quoteAccessAllowed(request)) return deny(request)
  return withCors(request, NextResponse.json({ sales: listSalesEmails() }))
}

export async function POST(request: NextRequest) {
  if (!quoteAccessAllowed(request)) return deny(request)
  const sales = listSalesEmails()
  let body: { from?: string; to?: string; locale?: unknown; pdfBase64?: string }
  try {
    body = await request.json()
  } catch {
    return withCors(request, NextResponse.json({ sent: false, error: 'invalid' }, { status: 400 }))
  }

  const from = String(body.from || '').trim().toLowerCase()
  const to = String(body.to || '').trim().toLowerCase()
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)
  if (!sales.includes(from) || !emailOk) {
    return withCors(request, NextResponse.json({ sent: false, error: 'invalid' }, { status: 400 }))
  }
  if (!isQuoteLocale(body.locale)) {
    return withCors(request, NextResponse.json({ sent: false, error: 'invalid_locale' }, { status: 400 }))
  }

  const pdfBase64 = String(body.pdfBase64 || '')
  if (pdfBase64.length < 200 || pdfBase64.length > 14_000_000) {
    return withCors(request, NextResponse.json({ sent: false, error: 'invalid_pdf' }, { status: 400 }))
  }

  const result = await sendQuoteMail({ from, to, locale: body.locale, pdfBase64 })
  return withCors(request, NextResponse.json(result, { status: result.sent ? 200 : 502 }))
}
