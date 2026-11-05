import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import MainLayout from '@/components/layout/main-layout'
import { CtaBand, Mark } from '@/components/site/shell'
import { pageMeta } from '@/lib/meta'

function l(locale: string, zh: string, en: string, tw?: string) {
  if (locale === 'zh') return zh
  if (locale === 'zh-TW') return tw || zh
  return en
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale
  return pageMeta(
    locale,
    '/privacy',
    l(locale, '隐私政策', 'Privacy Policy', '隱私政策'),
    l(
      locale,
      'SportLive API 隐私政策与商户数据安全承诺：最小化信息收集、加密结算与严格的商业保密。',
      'SportLive API Privacy Policy and merchant data protection: minimal data collection, crypto billing privacy, and strict confidentiality.',
      'SportLive API 隱私政策與商戶資料安全承諾：最小化資訊收集、加密結算與嚴格的商業保密。'
    )
  )
}

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  const locale = params.locale

  const highlights = [
    {
      tag: '01 · MINIMAL DATA',
      title: l(locale, '最小化信息收集', 'Minimal Data Collection', '最小化資訊收集'),
      body: l(
        locale,
        '仅收集建联与配置防盗链所需的联系方式（Telegram / WhatsApp / 邮箱）及白名单域名，不强制索取繁琐的企业资质文件。',
        'We only collect the contact handle and allowlist domains required for onboarding — no invasive corporate paperwork.',
        '僅收集建聯與配置防盜鏈所需的聯繫方式（Telegram / WhatsApp / 信箱）及白名單域名，不強制索取繁瑣的企業資質文件。'
      ),
    },
    {
      tag: '02 · CRYPTO PRIVACY',
      title: l(locale, '加密结算与商业保密', 'Crypto Billing & Confidentiality', '加密結算與商業保密'),
      body: l(
        locale,
        '支持 USDT / USDC / BTC 等主流加密货币结算，全程 1 对 1 专属群对接，绝不向任何第三方披露客户名单、域名或业务规模。',
        'Supports USDT, USDC, and BTC settlement in private 1-on-1 channels. We never disclose client domains or traffic metrics.',
        '支援 USDT / USDC / BTC 等主流加密貨幣結算，全程 1 對 1 專屬群對接，絕不向任何第三方披露客戶名單、域名或業務規模。'
      ),
    },
    {
      tag: '03 · ZERO VIEWER TRACKING',
      title: l(locale, '不收集终端观众隐私', 'No End-Viewer Profiling', '不收集終端觀眾隱私'),
      body: l(
        locale,
        '流媒体分发与防盗链校验仅校验请求头（Referer / IP 区域 / 签名有效期），不追踪或画像你平台上的终端看球用户。',
        'Stream delivery and anti-hotlink checks validate Referer, geo-IP, and token TTL only — we never profile your end viewers.',
        '串流分發與防盜鏈校驗僅校驗請求頭（Referer / IP 區域 / 簽名有效期），不追蹤或畫像你平台上的終端看球使用者。'
      ),
    },
  ]

  const sections = [
    {
      no: '01',
      title: l(locale, '我们收集哪些信息', 'Information We Collect', '我們收集哪些資訊'),
      intro: l(
        locale,
        '为完成技术对接、配置 CDN 节点与防盗链白名单，我们仅在必要范围内收集以下两类信息：',
        'To complete API onboarding, configure CDN edge routing, and set up anti-hotlink allowlists, we collect only two categories of data:',
        '為完成技術對接、配置 CDN 節點與防盜鏈白名單，我們僅在必要範圍內收集以下兩類資訊：'
      ),
      bullets: [
        l(
          locale,
          '你主动提交的对接信息：在联系表单中填写的 Telegram / WhatsApp 账号、工作邮箱、意向产品、项目阶段、观众目标国家/地区以及用于配置 Referer 白名单的网站或 App 域名。',
          'Onboarding Information You Provide: Your Telegram/WhatsApp handle, work email, selected products, project stage, target audience countries/regions, and playback domains for Referer allowlisting.',
          '你主動提交的對接資訊：在聯繫表單中填寫的 Telegram / WhatsApp 帳號、工作信箱、意向產品、專案階段、觀眾目標國家/地區以及用於配置 Referer 白名單的網站或 App 域名。'
        ),
        l(
          locale,
          '基础访问与安全日志：访问官网或调用 API 时自动产生的请求 IP、浏览器语言、引荐来源（UTM）及接口调用状态码，仅用于防爬虫滥用、防盗链拦截与服务质量监控。',
          'Basic Access & Security Logs: Request IP, browser locale, UTM referral source, and API status codes used strictly for anti-scraping protection, rate limiting, and uptime monitoring.',
          '基礎訪問與安全日誌：訪問官網或呼叫 API 時自動產生的請求 IP、瀏覽器語言、引薦來源（UTM）及介面呼叫狀態碼，僅用於防爬蟲濫用、防盜鏈攔截與服務品質監控。'
        ),
      ],
    },
    {
      no: '02',
      title: l(locale, '我们如何使用这些信息', 'How We Use Information', '我們如何使用這些資訊'),
      intro: l(
        locale,
        '所收集的信息仅用于向你交付和保障流媒体技术服务，具体包括：',
        'Collected information is used exclusively to deliver and secure our streaming infrastructure services:',
        '所收集的資訊僅用於向你交付和保障串流技術服務，具體包括：'
      ),
      bullets: [
        l(
          locale,
          '由商务与技术顾问在 2–4 小时内通过 Telegram、WhatsApp 或邮件与你建联，拉立 1 对 1 专属对接群并提供报价单。',
          'Reaching out via Telegram, WhatsApp, or email within 2–4 hours to open your dedicated 1-on-1 support channel and provide a quote.',
          '由商務與技術顧問在 2–4 小時內透過 Telegram、WhatsApp 或郵件與你建聯，拉立 1 對 1 專屬對接群並提供報價單。'
        ),
        l(
          locale,
          '为你签发接口鉴权密钥（auth），配置播放域名白名单、国家/地区防盗链策略、Bunny 节点或 OBS 直播流机器人群权限。',
          'Issuing API authentication keys (auth) and configuring domain allowlists, geo-IP rules, Bunny pull zones, or OBS bot group permissions.',
          '為你簽發介面鑑權金鑰（auth），配置播放域名白名單、國家/地區防盜鏈策略、Bunny 節點或 OBS 直播流機器人群權限。'
        ),
        l(
          locale,
          '监控线路健康度、排查断流或跨域异常，以及识别异常高频抓取与盗链行为。',
          'Monitoring stream health, troubleshooting playback or CORS issues, and blocking unauthorized stream scraping or hotlinking.',
          '監控線路健康度、排查斷流或跨域異常，以及識別異常高頻抓取與盜鏈行為。'
        ),
      ],
    },
    {
      no: '03',
      title: l(locale, '信息保密与第三方共享边界', 'Confidentiality & Third-Party Sharing', '資訊保密與第三方共享邊界'),
      intro: l(
        locale,
        '我们深知体育行业客户对商业隐私的极高要求，因此严格执行以下保密原则：',
        'We understand the critical importance of commercial privacy in the sports industry and enforce strict confidentiality:',
        '我們深知體育行業客戶對商業隱私的極高要求，因此嚴格執行以下保密原則：'
      ),
      bullets: [
        l(
          locale,
          '绝不出售或出租：我们绝不会将你的联系方式、网站域名、API 调用量或合作关系出售、出租或披露给任何广告商、数据经纪商或无关第三方。',
          'Never Sold or Rented: We never sell, rent, or disclose your contact details, domains, API volume, or business relationship to advertisers or third parties.',
          '絕不出售或出租：我們絕不會將你的聯繫方式、網站域名、API 呼叫量或合作關係出售、出租或披露給任何廣告商、資料經紀商或無關第三方。'
        ),
        l(
          locale,
          '官网案例展示脱敏：官网展示的任何行业示意图均经过严格的像素级品牌、域名与水印擦除脱敏处理，未经许可绝不公开任何在服客户信息。',
          'Redacted Showcases: Any product showcases on our site have brand names, domains, and watermarks fully redacted. We never name active clients without consent.',
          '官網案例展示脫敏：官網展示的任何行業示意圖均經過嚴格的像素級品牌、域名與浮水印擦除脫敏處理，未經許可絕不公開任何在服客戶資訊。'
        ),
      ],
    },
    {
      no: '04',
      title: l(locale, '数据安全、留存与销毁', 'Data Security & Retention', '資料安全、留存與銷毀'),
      intro: l(
        locale,
        '我们通过传输加密、最小权限隔离与定期清理机制保障数据安全：',
        'We protect merchant data through encrypted transmission, least-privilege access, and routine log purging:',
        '我們透過傳輸加密、最小權限隔離與定期清理機制保障資料安全：'
      ),
      bullets: [
        l(
          locale,
          '全链路 HTTPS 传输与鉴权隔离：接口调用与后台管理均采用 HTTPS 加密，每个商户分配独立的 auth 密钥与防盗链签名。',
          'End-to-End HTTPS & Token Isolation: All API calls use HTTPS encryption with isolated merchant auth keys and short-lived playback signatures.',
          '全鏈路 HTTPS 傳輸與鑑權隔離：介面呼叫與後台管理均採用 HTTPS 加密，每個商戶分配獨立的 auth 金鑰與防盜鏈簽名。'
        ),
        l(
          locale,
          '随时申请注销与清理：合作终止后，你可以随时在专属对接群或通过邮件要求立即销毁你的域名配置、鉴权密钥与历史沟通记录。',
          'Right to Deletion: Upon ending a subscription, you may request immediate deletion of your domain configurations, API keys, and contact records at any time.',
          '隨時申請註銷與清理：合作終止後，你可以隨時在專屬對接群或透過郵件要求立即銷毀你的域名配置、鑑權金鑰與歷史溝通記錄。'
        ),
      ],
    },
  ]

  return (
    <MainLayout>
      <section className="border-b border-brand-line bg-brand-paper py-10 lg:py-14">
        <div className="container-custom">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
              <Mark />
              <span>SPORTLIVE API · PRIVACY & DATA PROTECTION</span>
            </p>
            <span className="border border-brand-line bg-white px-2.5 py-1 font-mono text-[11px] font-semibold text-brand-muted">
              {l(locale, '生效版本：v2.6', 'Version: v2.6', '生效版本：v2.6')}
            </span>
          </div>

          <h1 className="mt-2.5 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            {l(locale, '隐私政策与商户保密承诺', 'Privacy Policy & Merchant Confidentiality', '隱私政策與商戶保密承諾')}
          </h1>
          <p className="mt-3 max-w-2xl text-xs leading-6 text-brand-muted sm:text-sm">
            {l(
              locale,
              '本政策说明 SportLive API 如何以最小化原则收集、使用并严格保护合作商户的对接资料与商业隐私。',
              'How SportLive API collects, uses, and strictly protects merchant onboarding information and commercial confidentiality.',
              '本政策說明 SportLive API 如何以最小化原則收集、使用並嚴格保護合作商戶的對接資料與商業隱私。'
            )}
          </p>

          {/* 3 Core Privacy Commitments */}
          <div className="mt-7 grid gap-3.5 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.tag}
                className="border-2 border-brand-ink bg-white p-4 shadow-[4px_4px_0_0_#141414]"
              >
                <span className="bg-brand-primary px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-white">
                  {item.tag}
                </span>
                <h2 className="mt-2.5 text-sm font-bold text-brand-ink">{item.title}</h2>
                <p className="mt-1.5 text-xs leading-5 text-brand-muted">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Detailed Policy Clauses */}
          <div className="mt-7 space-y-4">
            {sections.map((sec) => (
              <article
                key={sec.no}
                className="border border-brand-line border-t-4 border-t-brand-ink bg-white p-5 sm:p-6"
              >
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-5 w-6 -skew-x-[10deg] items-center justify-center bg-brand-primary font-mono text-[11px] font-bold text-white">
                    {sec.no}
                  </span>
                  <h2 className="text-base font-bold text-brand-ink sm:text-lg">{sec.title}</h2>
                </div>

                <p className="mt-3 text-xs leading-6 text-brand-muted sm:text-sm">{sec.intro}</p>

                <ul className="mt-3 space-y-2 border-t border-brand-line pt-3">
                  {sec.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-xs leading-6 text-brand-ink sm:text-sm">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* Bottom Contact & Related Links Bar */}
          <div className="mt-6 flex flex-col justify-between gap-3 border-2 border-brand-ink bg-white p-5 sm:flex-row sm:items-center">
            <div className="text-xs leading-5 text-brand-muted">
              <strong className="text-brand-ink">
                {l(locale, '需要删除历史留资或咨询隐私问题？', 'Need to delete onboarding records or ask about privacy?', '需要刪除歷史留資或諮詢隱私問題？')}
              </strong>{' '}
              {l(
                locale,
                '请直接在专属对接群联系管理员，或前往联系页提交请求。',
                'Message your account manager in your 1-on-1 group or submit a request via our contact page.',
                '請直接在專屬對接群聯繫管理員，或前往聯繫頁提交請求。'
              )}
            </div>
            <div className="flex shrink-0 items-center gap-4 font-mono text-xs font-bold text-brand-primary">
              <Link href={`/${locale}/disclaimer`} className="hover:underline">
                {l(locale, '免责声明 →', 'Disclaimer →', '免責聲明 →')}
              </Link>
              <Link href={`/${locale}/contact`} className="hover:underline">
                {l(locale, '联系我们 →', 'Contact Us →', '聯繫我們 →')}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <CtaBand locale={locale} />
    </MainLayout>
  )
}
