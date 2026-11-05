import type { Metadata } from 'next'
import Link from 'next/link'
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
    '/about',
    l(
      locale,
      '关于我们 · SLA Limited (新加坡)',
      'About Us · SLA Limited (Singapore)',
      '關於我們 · SLA Limited (新加坡)'
    ),
    l(
      locale,
      'SportLive API 隶属于新加坡 SLA Limited，自 2018 年起专注全球体育赛事直播流技术交付。',
      'SportLive API is operated by SLA Limited (Singapore) — delivering live sports streaming infrastructure since 2018.',
      'SportLive API 隸屬於新加坡 SLA Limited，自 2018 年起專注全球體育賽事直播流技術交付。'
    )
  )
}

export default function AboutPage({ params }: { params: { locale: string } }) {
  const locale = params.locale

  const stats = [
    {
      value: '2018',
      label: l(locale, '持续交付赛事直播流', 'Continuous Delivery Since', '持續交付賽事直播流'),
    },
    {
      value: '23+',
      label: l(locale, '覆盖全球运动品类', 'Sports Categories Covered', '覆蓋全球運動品類'),
    },
    {
      value: '100+',
      label: l(locale, '24/7 欧美英亚体育频道', '24/7 Sports & Club Channels', '24/7 歐美英亞體育頻道'),
    },
    {
      value: '400+',
      label: l(locale, '日均稳定直播场次', 'Daily Live Fixtures', '日均穩定直播場次'),
    },
  ]

  const capabilities = [
    {
      no: '01',
      tag: 'api.sla.homes',
      title: l(locale, '单场赛事直播线路 API', 'Live Match Lines API', '單場賽事直播線路 API'),
      desc: l(
        locale,
        '面向比分站、体育社区与移动 App。提供现成 m3u8 / flv 播放链接（Streams）与 RTMP 推流（Push Streams）两种接入模式，单场配备国际高清、聚合线路与无解说赛场原声等多源冗余。',
        'For live-score sites and sports apps. Offers both ready-to-play m3u8/flv URLs (Streams) and RTMP push delivery (Push Streams) with multi-line redundancy per match.',
        '面向比分站、體育社群與行動 App。提供現成 m3u8 / flv 播放連結（Streams）與 RTMP 推流（Push Streams）兩種接入模式，單場配備國際高清、聚合線路與無解說賽場原聲等多源冗餘。'
      ),
      href: '/products/streams',
    },
    {
      no: '02',
      tag: 'iptv.sla.homes',
      title: l(locale, '全球体育频道 (100+ 体育台)', 'Global Sports Channels (100+ TV)', '全球體育頻道 (100+ 體育台)'),
      desc: l(
        locale,
        '面向海外 IPTV 导航站与 OTT 电视盒子。汇聚 Sky Sports、TNT Sports、ESPN、NBA TV 等 100+ 个 24/7 线性台与俱乐部球队台，配套 19 类运动节目单（Schedule）与 Bunny 防盗链签名接口。',
        'For IPTV portals and OTT set-top boxes. 100+ 24/7 linear sports networks and club channels with 19-sport EPG schedules and Bunny token signing.',
        '面向海外 IPTV 導航站與 OTT 電視盒子。匯聚 Sky Sports、TNT Sports、ESPN、NBA TV 等 100+ 個 24/7 線性台與俱樂部球隊台，配套 19 類運動節目單（Schedule）與 Bunny 防盜鏈簽名介面。'
      ),
      href: '/products/iptv',
    },
    {
      no: '03',
      tag: 'Telegram / Lark Bot',
      title: l(locale, 'OBS 直播流机器人', 'OBS Streamer Bot', 'OBS 直播流機器人'),
      desc: l(
        locale,
        '面向足球与篮球解说主播。无需雇佣程序员对接接口，在 Telegram 或 Lark 群内发送指令即可秒拿低延迟卫星源与无解说赛场原声地址，粘贴进 OBS 媒体源即刻开播。',
        'For football and basketball commentary hosts. Zero coding required — query low-latency satellite and raw stadium audio feeds inside Telegram or Lark for OBS Studio.',
        '面向足球與籃球解說主播。無需僱用工程師對接介面，在 Telegram 或 Lark 群內發送指令即可秒拿低延遲衛星源與無解說賽場原聲地址，貼進 OBS 媒體源即刻開播。'
      ),
      href: '/products/assistant',
    },
  ]

  const engineeringPillars = [
    {
      title: l(
        locale,
        '源自一线体育与数据产品的工程团队',
        'Engineers from Tier-1 Sports & Data Products',
        '源自一線體育與資料產品的工程團隊'
      ),
      body: l(
        locale,
        '核心研发与运维成员曾任职于 Onefootball、SportRadar 及直播吧等国内外头部体育产品，深谙比赛高峰期的瞬时高并发调度、跨洲际低延迟传输与赛程 ID 映射痛点。',
        'Our core engineering and ops leads previously built infrastructure at Onefootball, SportRadar, and Zhibo8 — experienced in peak matchday concurrency, cross-border low-latency routing, and fixture ID mapping.',
        '核心研發與運維成員曾任職於 Onefootball、SportRadar 及直播吧等國內外頭部體育產品，深諳比賽高峰期的瞬時高併發調度、跨洲際低延遲傳輸與賽程 ID 映射痛點。'
      ),
    },
    {
      title: l(
        locale,
        '多源采集冗余与 7×24 值守巡检',
        'Multi-Source Redundancy & 24/7 Live Ops',
        '多源採集冗餘與 7×24 值守巡檢'
      ),
      body: l(
        locale,
        '以新加坡为亚太与全球网络枢纽，结合欧美、东南亚边缘节点，在开赛前自动完成信号进流、分辨率帧率检测（streamInfo）与主备线路切换，确保热门赛事与次级联赛稳定播出。',
        'Anchored in Singapore with edge nodes across Europe, North America, and Southeast Asia, our automated pipeline ingests feeds before kickoff and monitors frame rate and uptime 24/7.',
        '以新加坡為亞太與全球網路樞紐，結合歐美、東南亞邊緣節點，在開賽前自動完成訊號進流、解析度幀率檢測（streamInfo）與主備線路切換，確保熱門賽事與次級聯賽穩定播出。'
      ),
    },
    {
      title: l(
        locale,
        '严密的防盗链体系与商户商业保密',
        'Strict Anti-Hotlink & Merchant Confidentiality',
        '嚴密的防盜鏈體系與商戶商業保密'
      ),
      body: l(
        locale,
        '支持 Referer 域名白名单、目标国家/地区白名单、短效签名与 Bunny 节点隔离；全面支持 USDT / USDC / BTC 加密结算，在 1 对 1 专属群内完成交付，严格保护客户商业隐私。',
        'Built-in Referer allowlists, geo-IP restrictions, and short-lived URL tokens. We support USDT/USDC/BTC settlement and private 1-on-1 onboarding to protect merchant confidentiality.',
        '支援 Referer 域名白名單、目標國家/地區白名單、短效簽名與 Bunny 節點隔離；全面支援 USDT / USDC / BTC 加密結算，在 1 對 1 專屬群內完成交付，嚴格保護客戶商業隱私。'
      ),
    },
  ]

  return (
    <MainLayout>
      <section className="border-b border-brand-line bg-brand-paper py-10 lg:py-14">
        <div className="container-custom">
          {/* Top Hero + Singapore Corporate Profile Card */}
          <div className="grid items-stretch gap-7 lg:grid-cols-12 lg:gap-8">
            <div className="flex flex-col justify-between border-2 border-brand-ink bg-white p-6 shadow-[6px_6px_0_0_#141414] sm:p-8 lg:col-span-7">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
                  <Mark />
                  <span>SLA LIMITED · SINGAPORE HEADQUARTERS</span>
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
                  {l(
                    locale,
                    '扎根新加坡，专注全球体育赛事直播流技术交付',
                    'Headquartered in Singapore, Built for Global Live Sports Delivery',
                    '扎根新加坡，專注全球體育賽事直播流技術交付'
                  )}
                </h1>
                <p className="mt-4 text-sm leading-7 text-brand-ink sm:text-base">
                  {l(
                    locale,
                    'SportLive API 隶属于新加坡 SLA Limited。自 2018 年以来，我们以新加坡为亚太与全球技术枢纽，一直只做一件事：为全球比分直播站、体育社区 App、海外 OTT/IPTV 平台以及体育解说主播提供高稳定、低延迟的赛事直播视频流技术服务。',
                    'SportLive API is operated by SLA Limited, based in Singapore. Since 2018, we have focused on one mission: delivering low-latency, high-uptime live sports video feeds to score sites, mobile apps, OTT/IPTV platforms, and commentary studios worldwide.',
                    'SportLive API 隸屬於新加坡 SLA Limited。自 2018 年以來，我們以新加坡為亞太與全球技術樞紐，一直只做一件事：為全球比分直播站、體育社群 App、海外 OTT/IPTV 平台以及體育解說主播提供高穩定、低延遲的賽事直播視訊流技術服務。'
                  )}
                </p>
              </div>

              {/* 4 Key Metrics */}
              <div className="mt-7 grid grid-cols-2 gap-3 border-t border-brand-line pt-6 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label} className="border border-brand-line bg-brand-paper/50 p-3">
                    <div className="font-mono text-2xl font-bold text-brand-primary">{s.value}</div>
                    <div className="mt-1 text-[11px] font-semibold leading-4 text-brand-muted">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Official Corporate Registration & Office Card */}
            <div className="flex flex-col justify-between border-2 border-brand-ink bg-brand-ink p-6 text-white shadow-[6px_6px_0_0_#FC0078] sm:p-8 lg:col-span-5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="bg-brand-primary px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                    CORPORATE PROFILE
                  </span>
                  <span className="font-mono text-xs text-white/60">SINGAPORE</span>
                </div>

                <h2 className="mt-4 text-xl font-bold text-white sm:text-2xl">
                  {l(locale, '公司主体与业务档案', 'Corporate Entity & Scope', '公司主體與業務檔案')}
                </h2>

                <dl className="mt-5 divide-y divide-white/15 border-y border-white/15 text-xs sm:text-sm">
                  <div className="py-3.5">
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                      {l(locale, '公司名称 / Legal Entity', 'Legal Entity', '公司名稱 / Legal Entity')}
                    </dt>
                    <dd className="mt-1 font-mono text-base font-bold text-white">SLA Limited</dd>
                  </div>

                  <div className="py-3.5">
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                      {l(locale, '品牌名称 / Operating Brand', 'Operating Brand', '品牌名稱 / Operating Brand')}
                    </dt>
                    <dd className="mt-1 font-semibold text-white">SportLive API (sportliveapi.com)</dd>
                  </div>

                  <div className="py-3.5">
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                      {l(locale, '总部所在地 / Headquarters', 'Headquarters', '總部所在地 / Headquarters')}
                    </dt>
                    <dd className="mt-1 font-mono text-sm font-semibold text-emerald-300">
                      {l(locale, '新加坡 (Singapore)', 'Singapore', '新加坡 (Singapore)')}
                    </dd>
                  </div>

                  <div className="py-3.5">
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                      {l(locale, '核心业务定位 / Core Scope', 'Core Scope', '核心業務定位 / Core Scope')}
                    </dt>
                    <dd className="mt-1 text-xs leading-5 text-white/80">
                      {l(
                        locale,
                        '纯流媒体传输、编码加速与接口对接技术服务（不含赛程库与内容版权代理）',
                        'Live sports stream encoding, CDN routing & API integration infrastructure',
                        '純串流傳輸、編碼加速與介面對接技術服務（不含賽程庫與內容版權代理）'
                      )}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 bg-brand-primary px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-brand-dark"
                >
                  <span>{l(locale, '联系商务与技术团队 →', 'Contact Our Team →', '聯繫商務與技術團隊 →')}</span>
                </Link>
                <Link
                  href={`/${locale}/docs`}
                  className="font-mono text-xs font-bold text-white/80 hover:text-brand-primary hover:underline"
                >
                  {l(locale, '查看 API 调试台 →', 'API Playground →', '查看 API 調試台 →')}
                </Link>
              </div>
            </div>
          </div>

          {/* Section 2: Three Core Technical Products */}
          <div className="mt-12">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
                  WHAT WE DELIVER
                </p>
                <h2 className="mt-1 text-2xl font-bold text-brand-ink">
                  {l(locale, '三大技术产品矩阵', 'Three Core Infrastructure Products', '三大技術產品矩陣')}
                </h2>
              </div>
              <Link
                href={`/${locale}/customers`}
                className="font-mono text-xs font-bold text-brand-primary hover:underline"
              >
                {l(locale, '查看 6 大客户接入案例 →', 'View 6 Customer Showcases →', '查看 6 大客戶接入案例 →')}
              </Link>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-3">
              {capabilities.map((cap) => (
                <div
                  key={cap.no}
                  className="flex flex-col justify-between border-2 border-brand-ink bg-white p-6 shadow-[4px_4px_0_0_#141414]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-6 w-7 -skew-x-[10deg] items-center justify-center bg-brand-primary font-mono text-xs font-bold text-white">
                        {cap.no}
                      </span>
                      <span className="bg-brand-paper px-2 py-0.5 font-mono text-[11px] font-bold text-brand-muted">
                        {cap.tag}
                      </span>
                    </div>
                    <h3 className="mt-3.5 text-lg font-bold text-brand-ink">{cap.title}</h3>
                    <p className="mt-2 text-xs leading-6 text-brand-muted sm:text-sm">{cap.desc}</p>
                  </div>

                  <div className="mt-5 border-t border-brand-line pt-3.5">
                    <Link
                      href={`/${locale}${cap.href}`}
                      className="font-mono text-xs font-bold text-brand-primary hover:underline"
                    >
                      {l(locale, '了解产品与接入细节 →', 'Explore Product Specs →', '了解產品與接入細節 →')}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Team Background & Engineering Standards */}
          <div className="mt-12">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
              TEAM & INFRASTRUCTURE
            </p>
            <h2 className="mt-1 text-2xl font-bold text-brand-ink">
              {l(locale, '团队背景与技术交付标准', 'Engineering Pedigree & Delivery Standards', '團隊背景與技術交付標準')}
            </h2>

            <div className="mt-5 grid gap-5 lg:grid-cols-3">
              {engineeringPillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="border border-brand-line border-t-4 border-t-brand-ink bg-white p-5 sm:p-6"
                >
                  <h3 className="text-base font-bold text-brand-ink">{pillar.title}</h3>
                  <p className="mt-2.5 text-xs leading-6 text-brand-muted sm:text-sm">{pillar.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CtaBand locale={locale} />
    </MainLayout>
  )
}
