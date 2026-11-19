import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'
import { quoteLetter, type QuoteLocale } from '@/lib/quote-letter'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_PDF_BYTES = 10 * 1024 * 1024

export function listSalesEmails() {
  const fromEnv = process.env.QUOTE_SALES_EMAILS
  const raw = fromEnv
    ? fromEnv.split(/[,;\s]+/)
    : JSON.parse(fs.readFileSync(path.join(process.cwd(), 'quotes', 'sales.json'), 'utf8'))
  const emails = (Array.isArray(raw) ? raw : []).map((item) => String(item).trim().toLowerCase())
  return Array.from(new Set(emails.filter((email) => EMAIL.test(email))))
}

function decodePdfBuffer(pdfBase64: string): Buffer | null {
  const marker = 'base64,'
  const raw = pdfBase64.includes(marker)
    ? pdfBase64.slice(pdfBase64.indexOf(marker) + marker.length)
    : pdfBase64
  const cleaned = raw.trim()
  if (!cleaned) return null
  const buffer = Buffer.from(cleaned, 'base64')
  if (buffer.length < 100 || buffer.length > MAX_PDF_BYTES) return null
  if (buffer.subarray(0, 5).toString('ascii') !== '%PDF-') return null
  return buffer
}

export async function sendQuoteMail(input: {
  from: string
  to: string
  locale: QuoteLocale
  pdfBase64: string
}) {
  const host = process.env.QUOTE_SMTP_HOST
  const user = process.env.QUOTE_SMTP_USER
  const pass = process.env.QUOTE_SMTP_PASS
  if (!host || !user || !pass) return { sent: false as const, error: 'missing_smtp' as const }
  if (input.from.toLowerCase() !== user.toLowerCase()) {
    return { sent: false as const, error: 'sender_mismatch' as const }
  }

  const pdfBuffer = decodePdfBuffer(input.pdfBase64)
  if (!pdfBuffer) return { sent: false as const, error: 'invalid_pdf' as const }

  const copy = quoteLetter(input.locale)
  const port = Number(process.env.QUOTE_SMTP_PORT || 465)
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    connectionTimeout: 8_000,
    greetingTimeout: 8_000,
    socketTimeout: 20_000,
  })
  const localName = user.split('@')[0] || 'SportLiveAPI'
  const display = localName.toLowerCase() === 'elon' ? 'Elon' : localName

  try {
    await transporter.sendMail({
      from: `${display} <${user}>`,
      to: input.to,
      replyTo: user,
      envelope: { from: user, to: input.to },
      subject: copy.subject,
      text: copy.text,
      html: copy.html,
      attachments: [
        {
          filename: copy.filename,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    })
    return { sent: true as const, docsUrl: copy.docsUrl, filename: copy.filename }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'send_failed'
    console.error('报价单发送失败:', message)
    return { sent: false as const, error: 'send_failed' as const }
  }
}
