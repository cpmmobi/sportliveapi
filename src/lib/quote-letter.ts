export const QUOTE_LOCALES = ['zh', 'zh-TW', 'en'] as const
export type QuoteLocale = (typeof QUOTE_LOCALES)[number]

export function isQuoteLocale(value: unknown): value is QuoteLocale {
  return value === 'zh' || value === 'zh-TW' || value === 'en'
}

type MailCopy = { subject: string; text: string; html: string; docsUrl: string; filename: string }

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

function docsUrl(locale: QuoteLocale) {
  return `${SITE_URL}/${locale}/docs`
}

function attachmentName(locale: QuoteLocale) {
  if (locale === 'en') return 'SportLiveAPI-Quotation.pdf'
  if (locale === 'zh-TW') return 'SportLiveAPI-報價單.pdf'
  return 'SportLiveAPI-报价单.pdf'
}

function wrapHtml(locale: string, body: string) {
  const brand =
    locale === 'en'
      ? 'SportLiveAPI · Live Streaming Infrastructure'
      : locale === 'zh-TW'
        ? 'SportLiveAPI · 體育賽事直播流基礎設施'
        : 'SportLiveAPI · 体育赛事直播流基础设施'
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
  const label = locale === 'en' ? 'Account Manager' : locale === 'zh-TW' ? '客戶經理' : '客户经理'
  const telegramLabel = locale === 'en' ? 'Telegram:' : 'Telegram：'
  const emailLabel = locale === 'en' ? 'Email:' : locale === 'zh-TW' ? '郵箱：' : '邮箱：'
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:20px 0;border:2px solid #141414;background:#FFF1F7;">
  <tr>
    <td style="width:6px;background:#FC0078;"></td>
    <td style="padding:16px 18px;">
      <p style="margin:0 0 8px 0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#FC0078;font-weight:700;">${escapeHtml(label)}</p>
      <p style="margin:0;font-size:15px;font-weight:700;color:#141414;">Elon</p>
      <p style="margin:8px 0 0 0;font-size:14px;color:#141414;">${telegramLabel} <a href="${ELON_TG_URL}" style="color:#FC0078;font-weight:700;text-decoration:none;">@${ELON_TG}</a></p>
      <p style="margin:4px 0 0 0;font-size:14px;color:#141414;">${emailLabel} <a href="mailto:${ELON_EMAIL}" style="color:#FC0078;font-weight:700;text-decoration:none;">${ELON_EMAIL}</a></p>
    </td>
  </tr>
</table>`
}

export function quoteLetter(locale: QuoteLocale): MailCopy {
  const docs = docsUrl(locale)
  const file = attachmentName(locale)

  if (locale === 'en') {
    const text = `Dear Customer,

I am Elon, your account manager at SportLiveAPI. Thank you for reaching out. Based on your requirements, I have prepared your quotation and attached it to this email as a PDF.

If you or your technical team would like to review the feed format and integration steps in advance, our online API documentation is available here:
${docs}

If the scope and pricing work for you, simply reply to this email or message me on Telegram, and I will arrange your test access. Should you need any adjustments to the sports coverage or plan, please let me know as well.

With kind regards,
Elon
Telegram: @${ELON_TG}
Email: ${ELON_EMAIL}
`
    const html = wrapHtml(
      locale,
      `<p style="margin:0 0 16px 0;">Dear Customer,</p>
<p style="margin:0 0 16px 0;">I am Elon, your account manager at SportLiveAPI. Thank you for reaching out. Based on your requirements, I have prepared your quotation and attached it to this email as a PDF.</p>
<p style="margin:0 0 16px 0;">If you or your technical team would like to review the feed format and integration steps in advance, you can check our online API documentation:<br /><a href="${docs}" style="color:#FC0078;font-weight:700;text-decoration:none;">${escapeHtml(docs)}</a></p>
<p style="margin:0 0 16px 0;">If the scope and pricing work for you, simply reply to this email or message me on Telegram, and I will arrange your test access. Should you need any adjustments to the sports coverage or plan, please let me know as well.</p>
${contactBlockHtml(locale)}
<p style="margin:24px 0 0 0;">With kind regards,<br /><strong>Elon</strong></p>`
    )
    return { subject: 'Your Quotation · SportLiveAPI', text, html, docsUrl: docs, filename: file }
  }

  if (locale === 'zh-TW') {
    const text = `尊敬的客戶，您好：

我是 SportLiveAPI 的客戶經理 Elon。感謝您的諮詢，我已根據您的需求整理好報價單，隨信附於 PDF 附件中，請您查收。

若您或技術團隊希望提前了解賽事數據結構與串接流程，可先參閱我們的線上接口文檔：
${docs}

若報價方案符合您的預期，請直接回覆本郵件，或透過下方 Telegram 與我聯繫，我會為您安排測試權限；若球類範圍或合作方式需要調整，也歡迎隨時告訴我。

此致
敬禮

Elon
Telegram：@${ELON_TG}
郵箱：${ELON_EMAIL}
`
    const html = wrapHtml(
      locale,
      `<p style="margin:0 0 16px 0;">尊敬的客戶，您好：</p>
<p style="margin:0 0 16px 0;">我是 SportLiveAPI 的客戶經理 Elon。感謝您的諮詢，我已根據您的需求整理好報價單，隨信附於 PDF 附件中，請您查收。</p>
<p style="margin:0 0 16px 0;">若您或技術團隊希望提前了解賽事數據結構與串接流程，可先參閱我們的線上接口文檔：<br /><a href="${docs}" style="color:#FC0078;font-weight:700;text-decoration:none;">${escapeHtml(docs)}</a></p>
<p style="margin:0 0 16px 0;">若報價方案符合您的預期，請直接回覆本郵件，或透過下方 Telegram 與我聯繫，我會為您安排測試權限；若球類範圍或合作方式需要調整，也歡迎隨時告訴我。</p>
${contactBlockHtml(locale)}
<p style="margin:24px 0 0 0;">此致<br />敬禮</p>
<p style="margin:16px 0 0 0;"><strong>Elon</strong></p>`
    )
    return { subject: '您的報價方案 · SportLiveAPI', text, html, docsUrl: docs, filename: file }
  }

  const text = `尊敬的客户，您好：

我是 SportLiveAPI 的客户经理 Elon。感谢您的咨询，我已根据您的需求整理好报价单，随信附在 PDF 附件中，请您查收。

如果您或技术团队希望提前了解赛事数据结构与接入流程，可以先查阅我们的在线接口文档：
${docs}

若报价方案符合您的预期，请直接回复本邮件，或通过下方 Telegram 与我联系，我会为您安排测试权限；如果球类范围或合作方式需要调整，也欢迎随时告诉我。

此致
敬礼

Elon
Telegram：@${ELON_TG}
邮箱：${ELON_EMAIL}
`
  const html = wrapHtml(
    locale,
    `<p style="margin:0 0 16px 0;">尊敬的客户，您好：</p>
<p style="margin:0 0 16px 0;">我是 SportLiveAPI 的客户经理 Elon。感谢您的咨询，我已根据您的需求整理好报价单，随信附在 PDF 附件中，请您查收。</p>
<p style="margin:0 0 16px 0;">如果您或技术团队希望提前了解赛事数据结构与接入流程，可以先查阅我们的在线接口文档：<br /><a href="${docs}" style="color:#FC0078;font-weight:700;text-decoration:none;">${escapeHtml(docs)}</a></p>
<p style="margin:0 0 16px 0;">若报价方案符合您的预期，请直接回复本邮件，或通过下方 Telegram 与我联系，我会为您安排测试权限；如果球类范围或合作方式需要调整，也欢迎随时告诉我。</p>
${contactBlockHtml(locale)}
<p style="margin:24px 0 0 0;">此致<br />敬礼</p>
<p style="margin:16px 0 0 0;"><strong>Elon</strong></p>`
  )
  return { subject: '您的报价方案 · SportLiveAPI', text, html, docsUrl: docs, filename: file }
}

export function detailsLetter(locale: QuoteLocale): { subject: string; text: string; html: string } {
  if (locale === 'en') {
    const text = `Dear Customer,

I am Elon, your account manager at SportLiveAPI. Thank you for your enquiry. We are putting together an integration and pricing plan for your project.

So we can evaluate which of our products fits your business best, please reply to this email with your product URL. If it is not live yet, please share a reference website or describe the site style and format you plan to build.

Once I have this, I will match the right product plan and send over your formal quotation. You are also welcome to contact me directly on Telegram below so we can discuss the details further.

With kind regards,
Elon
Telegram: @${ELON_TG}
Email: ${ELON_EMAIL}
`
    const html = wrapHtml(
      locale,
      `<p style="margin:0 0 16px 0;">Dear Customer,</p>
<p style="margin:0 0 16px 0;">I am Elon, your account manager at SportLiveAPI. Thank you for your enquiry. We are putting together an integration and pricing plan for your project.</p>
<p style="margin:0 0 16px 0;">So we can evaluate which of our products fits your business best, please reply to this email with <strong>your product URL</strong>. If it is not live yet, please share a <strong>reference website or describe the site style and format you plan to build</strong>.</p>
<p style="margin:0 0 16px 0;">Once I have this, I will match the right product plan and send over your formal quotation. You are also welcome to contact me directly on Telegram below so we can discuss the details further.</p>
${contactBlockHtml(locale)}
<p style="margin:24px 0 0 0;">With kind regards,<br /><strong>Elon</strong></p>`
    )
    return { subject: 'Preparing Your Quotation · SportLiveAPI', text, html }
  }

  if (locale === 'zh-TW') {
    const text = `尊敬的客戶，您好：

我是 SportLiveAPI 的客戶經理 Elon。感謝您此前提交的諮詢，我們正在為您整理對應的接入與報價方案。

為了評估哪一款產品最契合您的業務，麻煩您回覆本郵件，提供一下您的產品連結；若項目尚未上線，也可以提供一個參考站點，或說明您預期想做成什麼樣的站點樣式。

收到後我會為您匹配合適的產品方案並發送正式報價單。您也可以直接透過下方 Telegram 與我聯繫，我們進一步溝通具體細節。

此致
敬禮

Elon
Telegram：@${ELON_TG}
郵箱：${ELON_EMAIL}
`
    const html = wrapHtml(
      locale,
      `<p style="margin:0 0 16px 0;">尊敬的客戶，您好：</p>
<p style="margin:0 0 16px 0;">我是 SportLiveAPI 的客戶經理 Elon。感謝您此前提交的諮詢，我們正在為您整理對應的接入與報價方案。</p>
<p style="margin:0 0 16px 0;">為了評估哪一款產品最契合您的業務，麻煩您回覆本郵件，提供一下<strong>您的產品連結</strong>；若項目尚未上線，也可以提供一個<strong>參考站點，或說明您預期想做成什麼樣的站點樣式</strong>。</p>
<p style="margin:0 0 16px 0;">收到後我會為您匹配合適的產品方案並發送正式報價單。您也可以直接透過下方 Telegram 與我聯繫，我們進一步溝通具體細節。</p>
${contactBlockHtml(locale)}
<p style="margin:24px 0 0 0;">此致<br />敬禮</p>
<p style="margin:16px 0 0 0;"><strong>Elon</strong></p>`
    )
    return { subject: '為您準備報價方案 · SportLiveAPI', text, html }
  }

  const text = `尊敬的客户，您好：

我是 SportLiveAPI 的客户经理 Elon。感谢您此前提交的咨询，我们正在为您整理对应的接入与报价方案。

为了评估哪一款产品最契合您的业务，麻烦您回复本邮件，提供一下您的产品链接；如果项目尚未上线，也可以发一个参考站点，或说明您预期想做成什么样的站点样式。

收到后我会为您匹配合适的产品方案并发送正式报价单。您也可以直接通过下方 Telegram 与我联系，我们进一步沟通具体细节。

此致
敬礼

Elon
Telegram：@${ELON_TG}
邮箱：${ELON_EMAIL}
`
  const html = wrapHtml(
    locale,
    `<p style="margin:0 0 16px 0;">尊敬的客户，您好：</p>
<p style="margin:0 0 16px 0;">我是 SportLiveAPI 的客户经理 Elon。感谢您此前提交的咨询，我们正在为您整理对应的接入与报价方案。</p>
<p style="margin:0 0 16px 0;">为了评估哪一款产品最契合您的业务，麻烦您回复本邮件，提供一下<strong>您的产品链接</strong>；如果项目尚未上线，也可以发一个<strong>参考站点，或说明您预期想做成什么样的站点样式</strong>。</p>
<p style="margin:0 0 16px 0;">收到后我会为您匹配合适的产品方案并发送正式报价单。您也可以直接通过下方 Telegram 与我联系，我们进一步沟通具体细节。</p>
${contactBlockHtml(locale)}
<p style="margin:24px 0 0 0;">此致<br />敬礼</p>
<p style="margin:16px 0 0 0;"><strong>Elon</strong></p>`
  )
  return { subject: '为您准备报价方案 · SportLiveAPI', text, html }
}
