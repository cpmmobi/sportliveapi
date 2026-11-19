import nodemailer from 'nodemailer'

type MailCopy = { subject: string; text: string; html: string }

const ELON_TG = 'sla_elon'
const ELON_TG_URL = 'https://t.me/sla_elon'
const ELON_EMAIL = 'elon@sportliveapi.com'
const SITE_URL = 'https://sportliveapi.com'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function wrapHtml(locale: string, body: string) {
  const brand =
    locale === 'en' ? 'SportLiveAPI · Live Streaming Infrastructure' : 'SportLiveAPI · 体育赛事直播流基础设施'
  return `<!DOCTYPE html>
<html lang="${locale === 'en' ? 'en' : locale === 'zh-TW' ? 'zh-Hant' : 'zh-Hans'}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>SportLiveAPI</title>
</head>
<body style="margin:0;padding:0;background:#F3EEEF;color:#141414;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F3EEEF;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:2px solid #141414;">
          <tr>
            <td style="height:6px;background:#FC0078;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px 28px;">
              <p style="margin:0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#FC0078;font-weight:700;">SPORTLIVE API</p>
              <p style="margin:8px 0 0 0;font-size:13px;color:#6B6B6B;">${escapeHtml(brand)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 28px 28px;font-size:15px;line-height:1.7;color:#141414;">
              ${body}
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px;border-top:2px solid #141414;background:#FFF1F7;font-size:12px;line-height:1.6;color:#6B6B6B;">
              <strong style="color:#141414;">SportLiveAPI</strong><br />
              <a href="${SITE_URL}" style="color:#FC0078;text-decoration:none;">${SITE_URL.replace('https://', '')}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function contactBlockHtml(locale: string) {
  if (locale === 'en') {
    return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:20px 0;border:2px solid #141414;background:#FFF1F7;">
  <tr>
    <td style="width:6px;background:#FC0078;"></td>
    <td style="padding:16px 18px;">
      <p style="margin:0 0 8px 0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#FC0078;font-weight:700;">Your Account Manager</p>
      <p style="margin:0;font-size:15px;font-weight:700;color:#141414;">Elon</p>
      <p style="margin:8px 0 0 0;font-size:14px;color:#141414;">Telegram: <a href="${ELON_TG_URL}" style="color:#FC0078;font-weight:700;text-decoration:none;">@${ELON_TG}</a></p>
      <p style="margin:4px 0 0 0;font-size:14px;color:#141414;">Email: <a href="mailto:${ELON_EMAIL}" style="color:#FC0078;font-weight:700;text-decoration:none;">${ELON_EMAIL}</a></p>
    </td>
  </tr>
</table>`
  }
  if (locale === 'zh-TW') {
    return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:20px 0;border:2px solid #141414;background:#FFF1F7;">
  <tr>
    <td style="width:6px;background:#FC0078;"></td>
    <td style="padding:16px 18px;">
      <p style="margin:0 0 8px 0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#FC0078;font-weight:700;">專屬商務對接</p>
      <p style="margin:0;font-size:15px;font-weight:700;color:#141414;">Elon</p>
      <p style="margin:8px 0 0 0;font-size:14px;color:#141414;">Telegram：<a href="${ELON_TG_URL}" style="color:#FC0078;font-weight:700;text-decoration:none;">@${ELON_TG}</a></p>
      <p style="margin:4px 0 0 0;font-size:14px;color:#141414;">郵箱：<a href="mailto:${ELON_EMAIL}" style="color:#FC0078;font-weight:700;text-decoration:none;">${ELON_EMAIL}</a></p>
    </td>
  </tr>
</table>`
  }
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:20px 0;border:2px solid #141414;background:#FFF1F7;">
  <tr>
    <td style="width:6px;background:#FC0078;"></td>
    <td style="padding:16px 18px;">
      <p style="margin:0 0 8px 0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#FC0078;font-weight:700;">专属商务对接</p>
      <p style="margin:0;font-size:15px;font-weight:700;color:#141414;">Elon</p>
      <p style="margin:8px 0 0 0;font-size:14px;color:#141414;">Telegram：<a href="${ELON_TG_URL}" style="color:#FC0078;font-weight:700;text-decoration:none;">@${ELON_TG}</a></p>
      <p style="margin:4px 0 0 0;font-size:14px;color:#141414;">邮箱：<a href="mailto:${ELON_EMAIL}" style="color:#FC0078;font-weight:700;text-decoration:none;">${ELON_EMAIL}</a></p>
    </td>
  </tr>
</table>`
}

type ContactChannel = 'telegram' | 'whatsapp' | 'email'

function channelFrom(contactMethod?: string): ContactChannel {
  const value = (contactMethod || '').trim().toLowerCase()
  if (value.startsWith('telegram')) return 'telegram'
  if (value.startsWith('whatsapp')) return 'whatsapp'
  return 'email'
}

function reachCopy(locale: string, channel: ContactChannel): { text: string; fallback: string } {
  if (locale === 'en') {
    if (channel === 'telegram') {
      return {
        text: 'Our account manager, Elon, will contact you at the first opportunity during business hours, 10:30–20:30 Singapore time (UTC+8), on the Telegram account you left. Please check message requests from people you have not saved, and allow others to find you by username so a direct message can get through.',
        fallback: 'If you prefer email, or do not receive the Telegram message, simply reply to this email. We are happy to continue the conversation here.',
      }
    }
    if (channel === 'whatsapp') {
      return {
        text: 'Our account manager, Elon, will contact you at the first opportunity during business hours, 10:30–20:30 Singapore time (UTC+8), on the WhatsApp number you left. Please watch that number for a new message, and allow messages from unsaved numbers so ours can get through.',
        fallback: 'If you prefer email, or do not receive the WhatsApp message, simply reply to this email. We are happy to continue the conversation here.',
      }
    }
    return {
      text: 'You asked us to follow up by email. Our account manager, Elon, will continue with you in this mailbox. You are also welcome to add him on Telegram if that is more convenient.',
      fallback: 'Please reply to this email whenever you are ready. We are happy to continue the conversation here.',
    }
  }
  if (locale === 'zh-TW') {
    if (channel === 'telegram') {
      return {
        text: '我們的商務負責人 Elon 將在新加坡時間（UTC+8）工作時段 10:30–20:30 內，第一時間透過您留下的 Telegram 與您聯繫。請留意 Telegram 的陌生人訊息請求，並允許他人透過用戶名搜尋到您、直接發起私聊，以免我們的訊息無法送達。',
        fallback: '若您更希望以郵件溝通，或未能收到 Telegram 訊息，直接回覆本郵件即可。我們同樣樂於在郵件中為您服務。',
      }
    }
    if (channel === 'whatsapp') {
      return {
        text: '我們的商務負責人 Elon 將在新加坡時間（UTC+8）工作時段 10:30–20:30 內，第一時間透過您留下的 WhatsApp 與您聯繫。請留意該號碼的新訊息，並允許陌生號碼向您發送訊息，以免我們的訊息無法送達。',
        fallback: '若您更希望以郵件溝通，或未能收到 WhatsApp 訊息，直接回覆本郵件即可。我們同樣樂於在郵件中為您服務。',
      }
    }
    return {
      text: '您選擇透過郵件與我們聯繫。我們的商務負責人 Elon 將直接在本郵箱與您對接。若您方便，也可以主動添加 Elon 的 Telegram，溝通會更快。',
      fallback: '請直接回覆本郵件，我們會在郵件中繼續為您服務。',
    }
  }
  if (channel === 'telegram') {
    return {
      text: '我们的商务负责人 Elon 将在新加坡时间（UTC+8）工作时段 10:30–20:30 内，第一时间通过您留下的 Telegram 与您联系。请留意 Telegram 的陌生人消息请求，并允许他人通过用户名搜索到您、直接发起私聊，以免我们的消息无法送达。',
      fallback: '若您更希望以邮件沟通，或未能收到 Telegram 消息，直接回复本邮件即可。我们同样乐于在邮件中为您服务。',
    }
  }
  if (channel === 'whatsapp') {
    return {
      text: '我们的商务负责人 Elon 将在新加坡时间（UTC+8）工作时段 10:30–20:30 内，第一时间通过您留下的 WhatsApp 与您联系。请留意该号码的新消息，并允许陌生号码向您发送消息，以免我们的消息无法送达。',
      fallback: '若您更希望以邮件沟通，或未能收到 WhatsApp 消息，直接回复本邮件即可。我们同样乐于在邮件中为您服务。',
    }
  }
  return {
    text: '您选择通过邮件与我们联系。我们的商务负责人 Elon 将直接在本邮箱与您对接。若您方便，也可以主动添加 Elon 的 Telegram，沟通会更快。',
    fallback: '请直接回复本邮件，我们会在邮件中继续为您服务。',
  }
}

function copyFor(locale: string, channel: ContactChannel): MailCopy {
  const reach = reachCopy(locale, channel)
  if (locale === 'en') {
    const text = `Dear Customer,

Thank you for contacting SportLiveAPI. We have received your enquiry and are preparing a tailored follow-up for you.

${reach.text}

You are also welcome to contact Elon directly:
Telegram: @${ELON_TG}
Email: ${ELON_EMAIL}

${reach.fallback}

With kind regards,
SportLiveAPI Support
`
    const html = wrapHtml(
      locale,
      `<p style="margin:0 0 16px 0;">Dear Customer,</p>
<p style="margin:0 0 16px 0;">Thank you for contacting SportLiveAPI. We have received your enquiry and are preparing a tailored follow-up for you.</p>
<p style="margin:0 0 16px 0;">${escapeHtml(reach.text)}</p>
${contactBlockHtml(locale)}
<p style="margin:0 0 16px 0;">${escapeHtml(reach.fallback)}</p>
<p style="margin:24px 0 0 0;">With kind regards,<br /><strong>SportLiveAPI Support</strong></p>`
    )
    return { subject: 'We have received your enquiry · SportLiveAPI', text, html }
  }

  if (locale === 'zh-TW') {
    const text = `尊敬的客戶，您好：

感謝您聯繫 SportLiveAPI。我們已收到您的諮詢，並正在為您準備後續對接。

${reach.text}

您也可以主動聯繫 Elon：
Telegram：@${ELON_TG}
郵箱：${ELON_EMAIL}

${reach.fallback}

此致
敬禮

SportLiveAPI 客戶支援
`
    const html = wrapHtml(
      locale,
      `<p style="margin:0 0 16px 0;">尊敬的客戶，您好：</p>
<p style="margin:0 0 16px 0;">感謝您聯繫 SportLiveAPI。我們已收到您的諮詢，並正在為您準備後續對接。</p>
<p style="margin:0 0 16px 0;">${escapeHtml(reach.text)}</p>
${contactBlockHtml(locale)}
<p style="margin:0 0 16px 0;">${escapeHtml(reach.fallback)}</p>
<p style="margin:24px 0 0 0;">此致<br />敬禮</p>
<p style="margin:16px 0 0 0;"><strong>SportLiveAPI 客戶支援</strong></p>`
    )
    return { subject: '已收到您的諮詢 · SportLiveAPI', text, html }
  }

  const text = `尊敬的客户，您好：

感谢您联系 SportLiveAPI。我们已收到您的咨询，并正在为您准备后续对接。

${reach.text}

您也可以主动联系 Elon：
Telegram：@${ELON_TG}
邮箱：${ELON_EMAIL}

${reach.fallback}

此致
敬礼

SportLiveAPI 客户支持
`
  const html = wrapHtml(
    locale,
    `<p style="margin:0 0 16px 0;">尊敬的客户，您好：</p>
<p style="margin:0 0 16px 0;">感谢您联系 SportLiveAPI。我们已收到您的咨询，并正在为您准备后续对接。</p>
<p style="margin:0 0 16px 0;">${escapeHtml(reach.text)}</p>
${contactBlockHtml(locale)}
<p style="margin:0 0 16px 0;">${escapeHtml(reach.fallback)}</p>
<p style="margin:24px 0 0 0;">此致<br />敬礼</p>
<p style="margin:16px 0 0 0;"><strong>SportLiveAPI 客户支持</strong></p>`
  )
  return { subject: '已收到您的咨询 · SportLiveAPI', text, html }
}

export async function sendLeadConfirmation(input: {
  to: string
  locale?: string
  contactMethod?: string
}): Promise<{ sent: boolean; error?: string }> {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  if (!host || !user || !pass) {
    console.warn('SMTP 未配置，跳过确认信')
    return { sent: false, error: 'missing_smtp' }
  }

  const port = Number(process.env.SMTP_PORT || 465)
  const locale = input.locale === 'en' || input.locale === 'zh-TW' ? input.locale : 'zh'
  const copy = copyFor(locale, channelFrom(input.contactMethod))
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    connectionTimeout: 8_000,
    greetingTimeout: 8_000,
    socketTimeout: 12_000,
  })

  try {
    await transporter.sendMail({
      from: `SportLiveAPI Support <${user}>`,
      to: input.to,
      replyTo: process.env.SMTP_REPLY_TO || ELON_EMAIL,
      envelope: { from: user, to: input.to },
      subject: copy.subject,
      text: copy.text,
      html: copy.html,
    })
    return { sent: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'send_failed'
    console.error('确认信发送失败:', message)
    return { sent: false, error: message }
  }
}
