import { createHash, createHmac, timingSafeEqual } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

export const QUOTE_SESSION_COOKIE = 'sla_quote_session'
const SESSION_MS = 30 * 24 * 60 * 60 * 1000

function sameText(left: string, right: string) {
  const a = createHash('sha256').update(left).digest()
  const b = createHash('sha256').update(right).digest()
  return timingSafeEqual(a, b)
}

export function quoteGateConfigured() {
  return Boolean(process.env.QUOTE_GATE_USER && process.env.QUOTE_GATE_PASS && process.env.QUOTE_GATE_SECRET)
}

export function quoteCredentialsMatch(account: string, password: string) {
  const user = process.env.QUOTE_GATE_USER || ''
  const pass = process.env.QUOTE_GATE_PASS || ''
  if (!user || !pass) return false
  return sameText(account, user) && sameText(password, pass)
}

export function quoteSessionToken(account: string) {
  const secret = process.env.QUOTE_GATE_SECRET || ''
  const body = Buffer.from(JSON.stringify({ u: account, exp: Date.now() + SESSION_MS })).toString('base64url')
  const mac = createHmac('sha256', secret).update(body).digest('base64url')
  return `${body}.${mac}`
}

export function quoteSessionValid(token: string | undefined) {
  const secret = process.env.QUOTE_GATE_SECRET || ''
  const user = process.env.QUOTE_GATE_USER || ''
  if (!token || !secret || !user) return false
  const [body, mac] = token.split('.')
  if (!body || !mac) return false
  const expected = createHmac('sha256', secret).update(body).digest('base64url')
  const left = Buffer.from(mac)
  const right = Buffer.from(expected)
  if (left.length !== right.length || !timingSafeEqual(left, right)) return false
  try {
    const data = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as { u?: string; exp?: number }
    return data.u === user && typeof data.exp === 'number' && data.exp > Date.now()
  } catch {
    return false
  }
}

export function quoteRequestAllowed(request: NextRequest) {
  return quoteSessionValid(request.cookies.get(QUOTE_SESSION_COOKIE)?.value)
}

export function quoteCookieSecure(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-proto')
  if (forwarded) return forwarded.split(',')[0].trim() === 'https'
  return request.nextUrl.protocol === 'https:'
}

export function withQuoteSession(response: NextResponse, request: NextRequest, account: string) {
  response.cookies.set(QUOTE_SESSION_COOKIE, quoteSessionToken(account), {
    httpOnly: true,
    sameSite: 'lax',
    secure: quoteCookieSecure(request),
    path: '/',
    maxAge: SESSION_MS / 1000,
  })
  return response
}

export function clearQuoteSession(response: NextResponse) {
  response.cookies.set(QUOTE_SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return response
}
