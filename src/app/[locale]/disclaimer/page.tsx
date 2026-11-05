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
    '/disclaimer',
    l(locale, '免责声明与服务条款', 'Disclaimer & Terms of Service', '免責聲明與服務條款'),
    l(
      locale,
      'SportLive API 免责声明：专注底层流媒体技术服务，不涉及内容版权业务，由客户自行承担版权合规与运营责任。',
      'SportLive API Disclaimer: Pure technical streaming infrastructure provider. We do not broker media rights; clients assume all copyright and regulatory responsibilities.',
      'SportLive API 免責聲明：專注底層串流技術服務，不涉及內容版權業務，由客戶自行承擔版權合規與營運責任。'
    )
  )
}

export default function DisclaimerPage({ params }: { params: { locale: string } }) {
  const locale = params.locale

  const pillars = [
    {
      tag: '01 · TECH INFRASTRUCTURE ONLY',
      title: l(locale, '纯技术传输服务商', 'Pure Technical Provider', '純技術傳輸服務商'),
      body: l(
        locale,
        '仅提供流媒体编码、传输路由、API 接口对接与群指令工具等底层技术支持，不制作、不存储、也不控制任何赛事视听内容。',
        'We provide stream encoding, routing, API integration, and chat-bot tools only. We do not produce, host, or control broadcast content.',
        '僅提供串流編碼、傳輸路由、API 介面對接與群指令工具等底層技術支援，不製作、不儲存、也不控制任何賽事視聽內容。'
      ),
    },
    {
      tag: '02 · NO MEDIA RIGHTS',
      title: l(locale, '不涉及任何版权授权业务', 'No Media Rights Brokered', '不涉及任何版權授權業務'),
      body: l(
        locale,
        '我们不拥有、不代理、也不分销任何体育赛事或电视频道的转播版权。技术服务费用仅对应技术对接与带宽节点成本，不含任何版权许可费。',
        'We do not own, broker, or sublicense any sports or TV broadcasting rights. Service fees cover technical infrastructure and bandwidth only.',
        '我們不擁有、不代理、也不分銷任何體育賽事或電視頻道的轉播版權。技術服務費用僅對應技術對接與頻寬節點成本，不含任何版權許可費。'
      ),
    },
    {
      tag: '03 · CLIENT LIABILITY',
      title: l(locale, '客户自担版权与合规风险', 'Client Assumes All Risk', '客戶自擔版權與合規風險'),
      body: l(
        locale,
        '客户接入并使用本服务，即默认由客户自行负责目标国家/地区的版权许可与监管合规，并独立承担由此产生的一切法律责任。',
        'By using our services, the client assumes full responsibility for local licensing, regulatory compliance, and any copyright-related liabilities.',
        '客戶接入並使用本服務，即預設由客戶自行負責目標國家/地區的版權許可與監管合規，並獨立承擔由此產生的一切法律責任。'
      ),
    },
  ]

  const clauses = [
    {
      no: '01',
      title: l(
        locale,
        '技术服务性质与非版权声明',
        'Nature of Technical Services & Non-Licensing Notice',
        '技術服務性質與非版權聲明'
      ),
      intro: l(
        locale,
        'SportLive API（含赛事直播线路 API、全球体育频道接口及 OBS 直播流机器人）定位于中立的流媒体传输与接口开发技术服务：',
        'SportLive API (including Live Match Lines API, Global Sports Channels API, and OBS Streamer Bot) operates strictly as a neutral streaming technology provider:',
        'SportLive API（含賽事直播線路 API、全球體育頻道介面及 OBS 直播流機器人）定位於中立的串流傳輸與介面開發技術服務：'
      ),
      bullets: [
        l(
          locale,
          '我们仅向合作商户提供视频流协议转换、CDN 边缘路由、Bunny 签名计算以及群聊自动化查询等技术工具，不参与客户网站、App、OTT 盒子或主播直播间的实际内容运营。',
          'We supply protocol conversion, CDN routing, Bunny token signing, and automated bot queries only. We do not participate in operating your website, app, OTT box, or commentary room.',
          '我們僅向合作商戶提供視訊流協議轉換、CDN 邊緣路由、Bunny 簽名計算以及群聊自動化查詢等技術工具，不參與客戶網站、App、OTT 盒子或主播直播間的實際內容營運。'
        ),
        l(
          locale,
          '本平台向客户收取的任何技术服务费、通道费或流量费，均属于纯粹的 IT 技术支持与网络传输对价，在任何情况下均不构成体育赛事转播权或视听节目版权的授权、转让或分销。',
          'All fees paid to SportLive API are strictly for IT infrastructure and network delivery. Under no circumstances do they constitute a grant, transfer, or sublicense of sports media rights.',
          '本平台向客戶收取的任何技術服務費、通道費或流量費，均屬於純粹的 IT 技術支援與網路傳輸對價，在任何情況下均不構成體育賽事轉播權或視聽節目版權的授權、轉讓或分銷。'
        ),
      ],
    },
    {
      no: '02',
      title: l(
        locale,
        '客户版权合规与独立责任承担',
        'Client Copyright Compliance & Sole Liability',
        '客戶版權合規與獨立責任承擔'
      ),
      intro: l(
        locale,
        '客户在申请测试、付费开通或调用我们的任何接口与流地址前，已充分知悉并同意以下责任划分：',
        'Before requesting a trial, subscribing, or calling any SportLive API endpoint or stream URL, the client acknowledges and agrees to the following:',
        '客戶在申請測試、付費開通或呼叫我們的任何介面與流地址前，已充分知悉並同意以下責任劃分：'
      ),
      bullets: [
        l(
          locale,
          '自行核实当地法规与版权要求：全球不同国家及司法管辖区对体育赛事转播与流媒体传播有不同法律规定。客户应自行评估并确保其在目标受众国家/地区的展示、转播或解说行为符合当地法律法规。',
          'Local Legal & Licensing Verification: Broadcasting and copyright laws vary by jurisdiction. The client is solely responsible for ensuring that their display, streaming, or commentary complies with the laws of their target countries.',
          '自行核實當地法規與版權要求：全球不同國家及司法管轄區對體育賽事轉播與串流傳播有不同法律規定。客戶應自行評估並確保其在目標受眾國家/地區的展示、轉播或解說行為符合當地法律法規。'
        ),
        l(
          locale,
          '独立承担全部版权与合规风险：因客户平台展示、播放、解说或二次分发流媒体内容而引发的任何第三方版权投诉、权利人索赔、行政处罚、域名封禁或民事/刑事诉讼，均由客户方独立应诉并承担全部赔偿与法律后果，SportLive API 不承担任何连带或补充责任。',
          'Sole Assumption of Risk: Any third-party copyright claims, takedown notices, regulatory fines, domain seizures, or legal disputes arising from the client’s broadcast or distribution are the sole responsibility of the client. SportLive API assumes zero joint or secondary liability.',
          '獨立承擔全部版權與合規風險：因客戶平台展示、播放、解說或二次分發串流內容而引發的任何第三方版權投訴、權利人索賠、行政處罰、域名封禁或民事/刑事訴訟，均由客戶方獨立應訴並承擔全部賠償與法律後果，SportLive API 不承擔任何連帶或補充責任。'
        ),
      ],
    },
    {
      no: '03',
      title: l(
        locale,
        '禁止滥用、防盗链与违规关停规则',
        'Acceptable Use, Anti-Hotlink & Suspension Rules',
        '禁止濫用、防盜鏈與違規關停規則'
      ),
      intro: l(
        locale,
        '为保障流媒体源站与分发网络稳定，所有合作商户与主播必须严格遵守以下技术使用边界：',
        'To protect upstream stability and network integrity, all clients and streamers must follow these technical boundaries:',
        '為保障串流源站與分發網路穩定，所有合作商戶與主播必須嚴格遵守以下技術使用邊界：'
      ),
      bullets: [
        l(
          locale,
          '严禁二次转售与越权盗链：单场播放链接、IPTV 签名地址及 OBS 机器人返回的直播流仅限签约客户在已报备的白名单域名、指定地区或授权主播席位内使用。严禁将接口或流地址外传、公开张贴或非法转推倒卖。',
          'No Unauthorized Resale or Leaking: Stream URLs, signed IPTV links, and OBS bot feeds are restricted to your whitelisted domains, approved regions, and subscribed concurrent seats. Sharing or reselling feeds outside your account is strictly prohibited.',
          '嚴禁二次轉售與越權盜鏈：單場播放連結、IPTV 簽名地址及 OBS 機器人回傳的直播流僅限簽約客戶在已報備的白名單域名、指定地區或授權主播席位內使用。嚴禁將介面或流地址外傳、公開張貼或非法轉推倒賣。'
        ),
        l(
          locale,
          '违规即时熔断：系统全天候监控鉴权调用频次与连接 IP 数量。若发现恶意爬虫抓取、群外泄露流地址、或利用本服务从事违反服务器所在地强制性法律的活动，我们有权在不事先通知的情况下立即封禁密钥、移除机器人并终止合作，且不予退还剩余费用。',
          'Immediate Termination on Abuse: Our system monitors API polling rates and concurrent IP connections 24/7. Scraping, leaking bot URLs outside your group, or violating mandatory laws will result in immediate key revocation and service termination without refund.',
          '違規即時熔斷：系統全天候監控鑑權呼叫頻次與連線 IP 數量。若發現惡意爬蟲抓取、群外洩露流地址、或利用本服務從事違反伺服器所在地強制性法律的活動，我們有權在不事先通知的情況下立即封禁金鑰、移除機器人並終止合作，且不予退還剩餘費用。'
        ),
      ],
    },
    {
      no: '04',
      title: l(
        locale,
        '技术可用性边界与不可抗力',
        'Service Availability & Force Majeure',
        '技術可用性邊界與不可抗力'
      ),
      intro: l(
        locale,
        '体育现场直播受卫星信号、赛场天气、国际海缆及跨国网络波动等多重外部因素影响：',
        'Live sports streaming is subject to satellite reception, stadium weather, submarine cables, and international network routing:',
        '體育現場直播受衛星訊號、賽場天氣、國際海纜及跨國網路波動等多重外部因素影響：'
      ),
      bullets: [
        l(
          locale,
          '我们通过多线路冗余（聚合线路、国际高清、赛场原声及备用源）尽力保障高可用性，但不对因比赛临时取消、卫星源中断、第三方云厂商故障或不可抗力导致的单场断流或画质波动承担间接经济赔偿责任。',
          'While we provide multi-line redundancy (Web, Global HD, Raw Audio, Backup) to maximize uptime, we do not guarantee 100% uninterrupted availability for every fixture and are not liable for indirect damages caused by upstream signal loss or third-party cloud outages.',
          '我們透過多線路冗餘（聚合線路、國際高清、賽場原聲及備用源）盡力保障高可用性，但不對因比賽臨時取消、衛星源中斷、第三方雲廠商故障或不可抗力導致的單場斷流或畫質波動承擔間接經濟賠償責任。'
        ),
        l(
          locale,
          '接口中附带的队名、比分与比赛进程仅用于未来 24 小时内的流媒体匹配参考，我们不对比分数据的实时性或准确性做任何担保。',
          'Team names, scores, and clock strings returned by our API are provided "as-is" for 24-hour stream matching only, without any warranty of accuracy.',
          '介面中附帶的隊名、比分與比賽進程僅用於未來 24 小時內的串流匹配參考，我們不對比分資料的即時性或準確性做任何擔保。'
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
              <span>SPORTLIVE API · LEGAL DISCLAIMER</span>
            </p>
            <span className="border border-brand-line bg-white px-2.5 py-1 font-mono text-[11px] font-semibold text-brand-muted">
              {l(locale, '生效版本：v2.6', 'Version: v2.6', '生效版本：v2.6')}
            </span>
          </div>

          <h1 className="mt-2.5 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            {l(locale, '免责声明与技术服务边界', 'Disclaimer & Technical Service Boundaries', '免責聲明與技術服務邊界')}
          </h1>
          <p className="mt-3 max-w-2xl text-xs leading-6 text-brand-muted sm:text-sm">
            {l(
              locale,
              '接入或使用 SportLive API 即表示你已阅读、理解并同意以下关于技术服务性质、版权责任归属与合规使用的全部条款。',
              'By integrating or using SportLive API, you acknowledge and agree to the following terms regarding our technical-only scope, copyright liability, and acceptable use.',
              '接入或使用 SportLive API 即表示你已閱讀、理解並同意以下關於技術服務性質、版權責任歸屬與合規使用的全部條款。'
            )}
          </p>

          {/* 3 Core Legal Pillars */}
          <div className="mt-7 grid gap-3.5 sm:grid-cols-3">
            {pillars.map((item) => (
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

          {/* Detailed Clauses */}
          <div className="mt-7 space-y-4">
            {clauses.map((clause) => (
              <article
                key={clause.no}
                className="border border-brand-line border-t-4 border-t-brand-ink bg-white p-5 sm:p-6"
              >
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-5 w-6 -skew-x-[10deg] items-center justify-center bg-brand-primary font-mono text-[11px] font-bold text-white">
                    {clause.no}
                  </span>
                  <h2 className="text-base font-bold text-brand-ink sm:text-lg">{clause.title}</h2>
                </div>

                <p className="mt-3 text-xs leading-6 text-brand-muted sm:text-sm">{clause.intro}</p>

                <ul className="mt-3 space-y-2 border-t border-brand-line pt-3">
                  {clause.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-xs leading-6 text-brand-ink sm:text-sm">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* Bottom Related Links Bar */}
          <div className="mt-6 flex flex-col justify-between gap-3 border-2 border-brand-ink bg-white p-5 sm:flex-row sm:items-center">
            <div className="text-xs leading-5 text-brand-muted">
              <strong className="text-brand-ink">
                {l(
                  locale,
                  '继续使用本网站或调用相关接口，即视为接受本免责声明。',
                  'Continued use of our website or APIs constitutes acceptance of this disclaimer.',
                  '繼續使用本網站或呼叫相關介面，即視為接受本免責聲明。'
                )}
              </strong>
            </div>
            <div className="flex shrink-0 items-center gap-4 font-mono text-xs font-bold text-brand-primary">
              <Link href={`/${locale}/privacy`} className="hover:underline">
                {l(locale, '隐私政策 →', 'Privacy Policy →', '隱私政策 →')}
              </Link>
              <Link href={`/${locale}/faq`} className="hover:underline">
                {l(locale, '常见问题 →', 'FAQ →', '常見問題 →')}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <CtaBand locale={locale} />
    </MainLayout>
  )
}
