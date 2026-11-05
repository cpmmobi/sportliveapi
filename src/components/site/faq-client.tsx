'use client'

import Link from 'next/link'
import { useState } from 'react'

function l(locale: string, zh: string, en: string, tw?: string) {
  if (locale === 'zh') return zh
  if (locale === 'zh-TW') return tw || zh
  return en
}

type GeneralFaqItem = {
  id: string
  no: string
  badge: { zh: string; en: string; tw: string }
  q: { zh: string; en: string; tw: string }
  a: { zh: string; en: string; tw: string }
  links?: {
    href: string
    label: { zh: string; en: string; tw: string }
  }[]
}

const GENERAL_FAQS: GeneralFaqItem[] = [
  {
    id: 'product-selection',
    no: '01',
    badge: { zh: '产品选型', en: 'Product Selection', tw: '產品選型' },
    q: {
      zh: '三款产品分别适用什么场景？可以组合开通吗？',
      en: 'How do I choose between the three products, and can they be combined?',
      tw: '三款產品分別適用什麼場景？可以組合開通嗎？',
    },
    a: {
      zh: '三款产品既可单独订阅，也可按业务形态组合开通：1）做比分直播站、体育社区或 App，选「赛事直播线路接口服务」，按单场比赛把画面接进你的赛程页（支持播放链接与 RTMP 推流二选一）；2）做海外 IPTV 网站、OTT 电视盒子或 24 小时电视墙，选「全球体育频道（100+ 体育台与球队台）」；3）足球/篮球主播在直播间配音解说，无需程序员，直接选「OBS 直播流机器人」。各产品的具体技术细节，可直接前往对应产品页底部查看专属问答。',
      en: 'You can subscribe to any product individually or combine them: (1) Live Match Lines API — for live-score sites and sports apps embedding single-match streams (choose playable URLs or RTMP push); (2) Global Sports Channels (100+ TV) — for IPTV portals and OTT set-top boxes carrying 24/7 linear sports networks and club TV; (3) OBS Streamer Bot — for football and basketball streamers pulling feeds in Telegram/Lark for OBS without developers. Product-specific technical FAQs are available at the bottom of each product page.',
      tw: '三款產品既可單獨訂閱，也可按業務形態組合開通：1）做比分直播站、體育社群或 App，選「賽事直播線路介面服務」，按單場比賽把畫面接進你的賽程頁；2）做海外 IPTV 網站、OTT 電視盒子或 24 小時電視牆，選「全球體育頻道（100+ 體育台與球隊台）」；3）足球/籃球主播在直播間配音解說，直接選「OBS 直播流機器人」。各產品的具體細節可前往對應產品頁底部查看。',
    },
    links: [
      {
        href: '/products/streams',
        label: { zh: '赛事直播线路 →', en: 'Live Match Lines →', tw: '賽事直播線路 →' },
      },
      {
        href: '/products/iptv',
        label: { zh: '全球体育频道 →', en: 'Global Sports Channels →', tw: '全球體育頻道 →' },
      },
      {
        href: '/products/assistant',
        label: { zh: 'OBS 直播流机器人 →', en: 'OBS Streamer Bot →', tw: 'OBS 直播流機器人 →' },
      },
    ],
  },
  {
    id: 'copyright-and-compliance',
    no: '02',
    badge: { zh: '版权与合规责任', en: 'Copyright & Compliance', tw: '版權與合規責任' },
    q: {
      zh: '你们提供赛事内容版权授权吗？版权相关的合规责任由谁承担？',
      en: 'Do you provide media broadcasting rights or licenses? Who is responsible for copyright compliance?',
      tw: '你們提供賽事內容版權授權嗎？版權相關的合規責任由誰承擔？',
    },
    a: {
      zh: '不提供。SportLive API 仅作为底层流媒体传输、编码加速与接口对接的纯技术服务商，不拥有、不代理、也不分销任何体育赛事的视听转播版权，不涉及任何内容版权授权业务。客户在接入并使用本技术服务时，默认由客户方自行确保在目标运营国家或地区具备相应的合规资质，并由客户独立承担因内容展示、传播或版权争议所产生的一切法律风险与相关责任。',
      en: 'No. SportLive API operates strictly as a technical infrastructure provider for stream encoding, routing, and API integration. We do not own, broker, or sublicense any sports broadcasting or media rights. By integrating and using our technical services, the customer acknowledges and agrees that they are solely responsible for local regulatory compliance and assume all legal risks and liabilities related to content distribution and copyright in their target jurisdictions.',
      tw: '不提供。SportLive API 僅作為底層串流傳輸、編碼加速與介面對接的純技術服務商，不擁有、不代理、也不分銷任何體育賽事的視聽轉播版權，不涉及任何內容版權授權業務。客戶在接入並使用本技術服務時，預設由客戶方自行確保在目標營運國家或地區具備相應的合規資質，並由客戶獨立承擔因內容展示、傳播或版權爭議所產生的一切法律風險與相關責任。',
    },
    links: [
      {
        href: '/disclaimer',
        label: { zh: '阅读完整免责声明 →', en: 'Read Full Disclaimer →', tw: '閱讀完整免責聲明 →' },
      },
    ],
  },
  {
    id: 'data-boundary',
    no: '03',
    badge: { zh: '数据边界', en: 'Data Scope', tw: '資料邊界' },
    q: {
      zh: '你们提供赛程库、历史战绩、赔率或专业比分数据 API 吗？',
      en: 'Do you provide a fixtures database, historical stats, odds, or official live-score APIs?',
      tw: '你們提供賽程庫、歷史戰績、賠率或專業比分資料 API 嗎？',
    },
    a: {
      zh: '不提供。我们只专注于「直播视频流」本身。线路接口中返回的队名、联赛名、当前比分与比赛进程仅覆盖当前在播及未来 24 小时内的场次，唯一作用是帮助你把视频流与自己的比赛 ID 做关联匹配（Mapping）。完整的联赛赛程库、球队资料与技术统计，请先向专业体育数据商采购。',
      en: 'No. We focus strictly on live video streams. Team names, league labels, scores, and clock strings returned by our API cover only live and upcoming 24-hour fixtures for the sole purpose of mapping our streams to your match IDs. Please source full season schedules and statistics from a dedicated sports data vendor.',
      tw: '不提供。我們只專注於「直播視訊流」本身。線路介面中回傳的隊名、聯賽名、目前比分與比賽進程僅覆蓋目前在播及未來 24 小時內的場次，唯一作用是幫助你把視訊流與自己的比賽 ID 做關聯匹配（Mapping）。完整的賽程庫與技術統計請先向專業體育資料商採購。',
    },
  },
  {
    id: 'pricing-model',
    no: '04',
    badge: { zh: '计费与报价', en: 'Pricing Model', tw: '計費與報價' },
    q: {
      zh: '为什么官网没有直接标明固定价格？费用具体怎么核算？',
      en: 'Why isn’t fixed pricing listed publicly, and how is my quote calculated?',
      tw: '為什麼官網沒有直接標明固定價格？費用具體怎麼核算？',
    },
    a: {
      zh: '因为不同客户的业务体量与所选配置差异很大：费用取决于你接入的产品类型（单场线路、100+ 全球体育频道、或 OBS 机器人）、需要开通的运动项目范围（如只开足篮、只开板球、或全球类）、分发模式（我方承担 CDN 流量的播放链接 vs 推流到你自有云）、是否需要多语种定制流，以及主播同时开播人数。提交需求后，我们会在 2–4 小时内为你出具透明、匹配的报价单。',
      en: 'Pricing depends on your exact setup: which product you choose, the sports categories you need (e.g. football & basketball only vs. all 23+ sports), delivery mode (SLA-hosted CDN playback links vs. RTMP push to your cloud), optional custom language feeds, or concurrent streamer seats. Submit your scenario and we will reply within 2–4 hours with a transparent quote.',
      tw: '因為不同客戶的業務體量與所選配置差異很大：費用取決於你接入的產品類型、需要開通的運動項目範圍、分發模式（我方承擔 CDN 流量的播放連結 vs 推流到你自有雲）、是否需要多語種定制流，以及主播同時開播人數。提交需求後，我們會在 2–4 小時內為你出具匹配的報價單。',
    },
  },
  {
    id: 'trial-and-onboarding',
    no: '05',
    badge: { zh: '测试与上线', en: 'Trial & Onboarding', tw: '測試與上線' },
    q: {
      zh: '合作前怎么测试效果？从留资到正式上线需要多久？',
      en: 'How can we test the service before subscribing, and how long does onboarding take?',
      tw: '合作前怎麼測試效果？從留資到正式上線需要多久？',
    },
    a: {
      zh: '分为两步：1）免申请自助预览：你现在就可以在官网「直播预览」实时查看在播场次与 100+ 频道节目单，并在「接口调试」用内置演示 Key 实时调取接口 JSON 数据；2）报价与专属测试：在留资页提交你的需求与真实联系方式，顾问在 2–4 小时内拉群沟通报价；双方确认方案后，即可配置目标国家防盗链白名单与 CDN 节点（或拉群开通 OBS 机器人），最快当天上线。',
      en: 'Two steps: (1) Instant Self-Serve Preview — inspect live fixtures and the 100+ channel EPG on our Live Preview page, or call real endpoints with the built-in demo key in the API Playground right now; (2) Quote & Onboarding — leave your contact details to receive a quote within 2–4 hours. Once confirmed, we configure your geo-allowlists and CDN routing (or activate your group bot) so you can go live the same day.',
      tw: '分為兩步：1）免申請自助預覽：你現在就可以在官網「直播預覽」即時查看在播場次與 100+ 頻道節目單，並在「介面調試」用內建演示 Key 即時調取介面 JSON 資料；2）報價與專屬測試：在留資頁提交需求與真實聯繫方式，顧問在 2–4 小時內拉群溝通報價；確認方案後最快當天上線。',
    },
    links: [
      {
        href: '/coverage',
        label: { zh: '查看直播预览 →', en: 'Live Preview →', tw: '查看直播預覽 →' },
      },
      {
        href: '/docs',
        label: { zh: '打开 API 在线调试 →', en: 'API Playground →', tw: '打開 API 線上調試 →' },
      },
    ],
  },
  {
    id: 'billing-and-privacy',
    no: '06',
    badge: { zh: '结算与隐私', en: 'Billing & Privacy', tw: '結算與隱私' },
    q: {
      zh: '支持哪些结算方式？如何保护商户隐私？个人看球观众可以买吗？',
      en: 'What payment methods are supported, how is privacy protected, and do you sell to individual viewers?',
      tw: '支援哪些結算方式？如何保護商戶隱私？個人看球觀眾可以買嗎？',
    },
    a: {
      zh: '1）加密结算与隐私保护：支持按月、季度或年度订阅，全面支持 USDT、USDC、BTC、ETH 等主流加密货币支付；无需繁琐的企业公对公资质审核，全程在 1 对 1 专属群对接，严格保密你的域名与业务信息。2）服务对象边界：我们仅面向体育平台（网站 / App / OTT 盒子）与体育解说主播提供技术服务，不向个人看球观众售卖账号。',
      en: '1) Crypto Billing & Privacy: We support monthly, quarterly, and annual plans payable in USDT, USDC, BTC, and ETH. Onboarding happens in a private 1-on-1 channel without invasive corporate paperwork, keeping your domains and business strictly confidential. 2) Service Scope: We provide technical services to sports platforms (sites, apps, OTT boxes) and sports commentary streamers only — we do not sell viewing accounts to retail consumers.',
      tw: '1）加密結算與隱私保護：支援按月、季度或年度訂閱，全面支援 USDT、USDC、BTC、ETH 等主流加密貨幣支付；全程在 1 對 1 專屬群對接，嚴格保密你的域名與業務資訊。2）服務對象邊界：我們僅面向體育平台與體育解說主播提供技術服務，不向個人看球觀眾售賣帳號。',
    },
    links: [
      {
        href: '/contact',
        label: { zh: '获取方案与报价 →', en: 'Get Plan & Quote →', tw: '取得方案與報價 →' },
      },
    ],
  },
]

export default function FaqClient({ locale }: { locale: string }) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'product-selection': true,
    'copyright-and-compliance': true,
  })

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const allOpen = GENERAL_FAQS.every((item) => openIds[item.id])
  const toggleAll = () => {
    const next: Record<string, boolean> = {}
    for (const item of GENERAL_FAQS) {
      next[item.id] = !allOpen
    }
    setOpenIds(next)
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: GENERAL_FAQS.map((item) => ({
      '@type': 'Question',
      name: l(locale, item.q.zh, item.q.en, item.q.tw),
      acceptedAnswer: {
        '@type': 'Answer',
        text: l(locale, item.a.zh, item.a.en, item.a.tw),
      },
    })),
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, '\\u003c') }} />
      {/* Top Bar */}
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-muted">
          {l(
            locale,
            '共 6 项合作前必读（选型 · 版权边界 · 计费 · 测试）',
            '6 PRE-INTEGRATION ESSENTIALS (SELECTION · COPYRIGHT · BILLING · TRIAL)',
            '共 6 項合作前必讀（選型 · 版權邊界 · 計費 · 測試）'
          )}
        </span>
        <button
          type="button"
          onClick={toggleAll}
          className="border border-brand-ink bg-white px-3.5 py-1.5 font-mono text-xs font-bold text-brand-ink hover:bg-brand-tint"
        >
          {allOpen
            ? l(locale, '收起全部', 'Collapse All', '收起全部')
            : l(locale, '展开全部', 'Expand All', '展開全部')}
        </button>
      </div>

      {/* Clean Single-Column 6-Card Accordion */}
      <div className="space-y-3.5">
        {GENERAL_FAQS.map((item) => {
          const isOpen = !!openIds[item.id]
          return (
            <article
              key={item.id}
              className={`border-2 transition-colors ${
                isOpen
                  ? 'border-brand-ink bg-white shadow-[5px_5px_0_0_#141414]'
                  : 'border-brand-line bg-white hover:border-brand-ink'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex h-5 w-6 -skew-x-[10deg] items-center justify-center bg-brand-ink font-mono text-[11px] font-bold text-white">
                      {item.no}
                    </span>
                    <span
                      className={`px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                        isOpen
                          ? 'bg-brand-primary text-white'
                          : 'bg-brand-paper text-brand-ink'
                      }`}
                    >
                      {l(locale, item.badge.zh, item.badge.en, item.badge.tw)}
                    </span>
                  </div>
                  <h2 className="text-base font-bold leading-snug text-brand-ink sm:text-lg">
                    {l(locale, item.q.zh, item.q.en, item.q.tw)}
                  </h2>
                </div>

                <span
                  className={`mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center border font-mono text-sm font-bold transition-colors ${
                    isOpen
                      ? 'border-brand-primary bg-brand-primary text-white'
                      : 'border-brand-line bg-brand-paper text-brand-ink'
                  }`}
                >
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-brand-line bg-brand-paper/30 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                  <p className="text-sm leading-7 text-brand-ink">
                    {l(locale, item.a.zh, item.a.en, item.a.tw)}
                  </p>

                  {item.links && item.links.length > 0 && (
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      {item.links.map((link) => (
                        <Link
                          key={link.href}
                          href={`/${locale}${link.href}`}
                          className="font-mono text-xs font-bold text-brand-primary hover:underline"
                        >
                          {l(locale, link.label.zh, link.label.en, link.label.tw)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}
