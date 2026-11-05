import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import MainLayout from '@/components/layout/main-layout'
import { BulletList, CtaBand, Mark, PageHero } from '@/components/site/shell'
import { assistantBotData, cases, coveragePage, iptvChannelData, lines, productBySlug, products, sports, streamsDeliveryModes, ui } from '@/content/site'
import { pageMeta } from '@/lib/meta'
import { tx } from '@/lib/locale'

export function generateStaticParams() {
  return products.map((item) => ({ slug: item.slug }))
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const product = productBySlug(params.slug)
  if (!product) return {}
  return pageMeta(params.locale, `/products/${params.slug}`, tx(params.locale, product.name), tx(params.locale, product.lede))
}

export default function ProductPage({ params }: { params: { locale: string; slug: string } }) {
  const product = productBySlug(params.slug)
  if (!product) notFound()
  const locale = params.locale
  const related = cases.filter((item) => item.product === product.slug || (product.slug === 'streams' && item.product === 'push'))
  const isStreams = product.slug === 'streams'
  const isIptv = product.slug === 'iptv'
  const isAssistant = product.slug === 'assistant'

  return (
    <MainLayout>
      <PageHero
        locale={locale}
        eyebrow={ui.products}
        title={tx(locale, product.name)}
        lede={tx(locale, product.lede)}
        crumbs={[{ href: `/${locale}`, label: tx(locale, { zh: '首页', en: 'Home', 'zh-TW': '首頁' }) }]}
      >
        {isStreams && (
          <div className="mt-8 border-t border-white/20 pt-6">
            <p className="text-xs font-bold uppercase tracking-wider text-white/80">
              {tx(locale, {
                zh: '支持运动品类（可按需单选或组合开通）',
                en: 'Supported Sports Categories (Subscribe individually or in bundles)',
                'zh-TW': '支援運動品類（可按需單選或組合開通）',
              })}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sports.map((sport) => (
                <span
                  key={sport.name.en}
                  className="inline-flex -skew-x-[10deg] items-center border border-white/25 bg-black/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
                >
                  <span className="skew-x-[10deg]">{tx(locale, sport.name)}</span>
                </span>
              ))}
              <span className="inline-flex -skew-x-[10deg] items-center border border-dashed border-white/35 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                <span className="skew-x-[10deg]">
                  {tx(locale, { zh: '更多品类拓展中...', en: 'More sports in progress...', 'zh-TW': '更多品類拓展中...' })}
                </span>
              </span>
            </div>
          </div>
        )}

        {isIptv && (
          <div className="mt-8 border-t border-white/20 pt-6">
            <p className="text-xs font-bold uppercase tracking-wider text-white/80">
              {tx(locale, {
                zh: '节目表覆盖的运动品类',
                en: 'Sports Covered in the Program Guide',
                'zh-TW': '節目表覆蓋的運動品類',
              })}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {iptvChannelData.scheduleSports.map((sport) => (
                <span
                  key={sport.en}
                  className="inline-flex -skew-x-[10deg] items-center border border-white/25 bg-black/20 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-sm"
                >
                  <span className="skew-x-[10deg]">{tx(locale, sport)}</span>
                </span>
              ))}
            </div>
          </div>
        )}

      </PageHero>

      <section className="border-b border-brand-line bg-white">
        <div className="container-custom py-14 lg:py-16">
          <div className={isStreams || isIptv || isAssistant ? 'grid items-center gap-10 lg:grid-cols-12' : ''}>
            <div className={isStreams || isIptv || isAssistant ? 'lg:col-span-5' : ''}>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
                <Mark />
                <span>{tx(locale, isAssistant ? { zh: '主播端怎么用', en: 'How Streamers Use It', 'zh-TW': '主播端怎麼用' } : ui.scene)}</span>
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                {tx(locale, {
                  zh: isStreams
                    ? '嵌入你现有的赛程与比赛页'
                    : isIptv
                      ? '24 小时连续播出的体育台与频道目录'
                      : '群内回复 666 与序号，放进 OBS 媒体源即开播',
                  en: isStreams
                    ? 'Embedded right inside your match page'
                    : isIptv
                      ? '24/7 linear sports networks & channel guide'
                      : 'Reply 666 & match number in group, drop into OBS Media Source',
                  'zh-TW': isStreams
                    ? '嵌入你現有的賽程與比賽頁'
                    : isIptv
                      ? '24 小時連續播出的體育台與頻道目錄'
                      : '群內回覆 666 與序號，放進 OBS 媒體源即開播',
                })}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-brand-muted">{tx(locale, product.scene)}</p>
              {isStreams && (
                <ul className="mt-6 space-y-2.5 text-xs leading-5 text-brand-ink">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-1.5 -skew-x-[10deg] bg-brand-primary" />
                    <span>
                      {tx(locale, {
                        zh: '顶部线路选项卡：直接读取接口返回的 liveList 供观众一键换线',
                        en: 'Line switcher tabs: rendered directly from liveList in the API response',
                        'zh-TW': '頂部線路選項卡：直接讀取介面回傳的 liveList 供觀眾一鍵換線',
                      })}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-1.5 -skew-x-[10deg] bg-brand-primary" />
                    <span>
                      {tx(locale, {
                        zh: '右上角品牌水印与底部跑马灯：前端透明图层覆盖，0 云端转码成本',
                        en: 'Corner watermark & bottom ticker: frontend overlay with zero cloud transcoding cost',
                        'zh-TW': '右上角品牌浮水印與底部跑馬燈：前端透明圖層覆蓋，0 雲端轉碼成本',
                      })}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-1.5 -skew-x-[10deg] bg-brand-primary" />
                    <span>
                      {tx(locale, {
                        zh: '下方比分与技术统计：继续使用你自己的数据商，通过赛事 ID 对齐',
                        en: 'Scoreboard & match stats: powered by your existing data provider, linked via match ID',
                        'zh-TW': '下方比分與技術統計：繼續使用你自己的資料商，透過賽事 ID 對齊',
                      })}
                    </span>
                  </li>
                </ul>
              )}
              {isIptv && (
                <ul className="mt-6 space-y-2.5 text-xs leading-5 text-brand-ink">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-1.5 -skew-x-[10deg] bg-brand-primary" />
                    <span>
                      {tx(locale, {
                        zh: '左侧频道目录：按台名与国家切换 ESPN、Sky Sports、NBA TV 等体育台',
                        en: 'Left-side channel guide: switch among ESPN, Sky Sports, NBA TV, and more by name and country',
                        'zh-TW': '左側頻道目錄：按台名與國家切換 ESPN、Sky Sports、NBA TV 等體育台',
                      })}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-1.5 -skew-x-[10deg] bg-brand-primary" />
                    <span>
                      {tx(locale, {
                        zh: '右侧连续播放：观众停在一个台上就能长时间收看正在播出的比赛与节目',
                        en: 'Right-side continuous playback: viewers stay on one channel for long-session viewing',
                        'zh-TW': '右側連續播放：觀眾停在一個台上就能長時間收看正在播出的比賽與節目',
                      })}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-1.5 -skew-x-[10deg] bg-brand-primary" />
                    <span>
                      {tx(locale, {
                        zh: '节目表点播：从未来节目安排直接点进对应频道开始观看',
                        en: 'Program guide tune-in: click an upcoming program and jump straight into that channel',
                        'zh-TW': '節目表點播：從未來節目安排直接點進對應頻道開始觀看',
                      })}
                    </span>
                  </li>
                </ul>
              )}
              {isAssistant && (
                <ul className="mt-6 space-y-2.5 text-xs leading-5 text-brand-ink">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-1.5 -skew-x-[10deg] bg-brand-primary" />
                    <span>
                      {tx(locale, {
                        zh: '目前仅支持足球与篮球赛程取流，暂不提供其他球类',
                        en: 'Football and basketball fixtures only for now — other sports are not available',
                        'zh-TW': '目前僅支援足球與籃球賽程取流，暫不提供其他球類',
                      })}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-1.5 -skew-x-[10deg] bg-brand-primary" />
                    <span>
                      {tx(locale, {
                        zh: '标准支持 Telegram 与 Lark 专属机器人群；后续可按需拓展其他海外即时通讯应用',
                        en: 'Telegram and Lark bot groups by default; other overseas chat apps can be added later',
                        'zh-TW': '標準支援 Telegram 與 Lark 專屬機器人群；後續可按需拓展其他海外即時通訊應用',
                      })}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-1.5 -skew-x-[10deg] bg-brand-primary" />
                    <span>
                      {tx(locale, {
                        zh: '发送 666 刷新赛程；回复序号拿稳定线路（卫星源 / 赛场原声）与覆盖灾备流',
                        en: 'Send 666 to refresh fixtures; reply match number for stable lines (Satellite / Raw Feed) plus coverage backups',
                        'zh-TW': '發送 666 重新整理賽程；回覆序號拿穩定線路（衛星源 / 賽場原聲）與覆蓋災備流',
                      })}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-1.5 -skew-x-[10deg] bg-brand-primary" />
                    <span>
                      {tx(locale, {
                        zh: '在 OBS Studio 添加为「媒体源」约 5–10 秒出画面，主播自己配音推流（请勿用浏览器直接打开）',
                        en: 'Add as an OBS "Media Source" — video appears in 5–10s for live commentary (do not open in browsers)',
                        'zh-TW': '在 OBS Studio 添加為「媒體源」約 5–10 秒出畫面，主播自己配音推流（請勿用瀏覽器直接打開）',
                      })}
                    </span>
                  </li>
                </ul>
              )}
            </div>

            {isStreams && (
              <div className="lg:col-span-7">
                <div className="overflow-hidden border-2 border-brand-ink bg-brand-ink text-white shadow-[6px_6px_0_0_#FC0078]">
                  {/* Mock Browser / App Top Bar */}
                  <div className="flex items-center justify-between border-b border-white/10 bg-black/50 px-4 py-2.5 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-brand-primary" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                      <span className="ml-2 font-mono text-[11px] text-white/60">https://your-sports-app.com/match/epl-10492</span>
                    </div>
                    <span className="bg-brand-primary/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-brand-light">
                      matchId: epl-10492
                    </span>
                  </div>

                  {/* Mock Match Scoreboard Header (Customer's Data Provider) */}
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#1B1B1F] px-4 py-3">
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <span className="bg-white/10 px-2 py-0.5 text-[11px] text-white/80">
                        {tx(locale, { zh: '英超 · 第 12 轮', en: 'Premier League · R12', 'zh-TW': '英超 · 第 12 輪' })}
                      </span>
                      <span className="inline-flex items-center gap-1 text-brand-primary">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-primary" />
                        <span>67&apos; 2H</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-bold">
                      <span>Arsenal</span>
                      <span className="bg-black px-2.5 py-0.5 font-mono text-base text-brand-primary">2 : 1</span>
                      <span>Chelsea</span>
                    </div>
                    <span className="hidden text-[11px] text-white/50 sm:inline">
                      {tx(locale, { zh: '你的自有比分数据', en: 'Your Score Data', 'zh-TW': '你的自有比分資料' })}
                    </span>
                  </div>

                  {/* Stream Line Switcher Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#141417] px-4 py-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="mr-1 text-[11px] text-white/50">
                        {tx(locale, { zh: '切换线路：', en: 'Stream Line:', 'zh-TW': '切換線路：' })}
                      </span>
                      <span className="-skew-x-[8deg] bg-brand-primary px-2.5 py-1 text-xs font-bold text-white">
                        <span className="inline-block skew-x-[8deg]">
                          {tx(locale, { zh: '国际高清 1080P', en: 'Global HD 1080p', 'zh-TW': '國際高清 1080P' })}
                        </span>
                      </span>
                      <span className="-skew-x-[8deg] border border-white/20 bg-white/5 px-2.5 py-1 text-xs text-white/80">
                        <span className="inline-block skew-x-[8deg]">
                          {tx(locale, { zh: '聚合线路', en: 'Web Stream', 'zh-TW': '聚合線路' })}
                        </span>
                      </span>
                      <span className="-skew-x-[8deg] border border-white/20 bg-white/5 px-2.5 py-1 text-xs text-white/80">
                        <span className="inline-block skew-x-[8deg]">
                          {tx(locale, { zh: '赛场原声', en: 'Raw Feed', 'zh-TW': '賽場原聲' })}
                        </span>
                      </span>
                      <span className="-skew-x-[8deg] border border-white/20 bg-white/5 px-2.5 py-1 text-xs text-white/80">
                        <span className="inline-block skew-x-[8deg]">
                          {tx(locale, { zh: '中文线路', en: 'CN Channel', 'zh-TW': '中文線路' })}
                        </span>
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-emerald-400">● 1920×1080 · 60fps</span>
                  </div>

                  {/* Video Player Viewport */}
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <img
                      src="/match-player-preview.jpg"
                      alt="Live Match Player Preview"
                      className="h-full w-full object-cover"
                    />
                    {/* Top-Left LIVE badge */}
                    <div className="absolute left-3 top-3 flex items-center gap-1.5 bg-black/70 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                      <span className="h-2 w-2 rounded-full bg-brand-primary" />
                      <span>LIVE · m3u8 / flv</span>
                    </div>
                    {/* Top-Right Frontend Watermark Overlay Demo */}
                    <div className="absolute right-3 top-3 border border-dashed border-white/60 bg-black/55 px-2.5 py-1 text-[11px] font-bold tracking-wider text-white/90 backdrop-blur-sm">
                      YOUR BRAND LOGO ({tx(locale, { zh: '前端图层水印', en: 'Frontend Overlay', 'zh-TW': '前端圖層浮水印' })})
                    </div>
                    {/* Bottom Scrolling Ticker Overlay Demo */}
                    <div className="absolute inset-x-0 bottom-9 flex items-center justify-between bg-brand-primary/90 px-3 py-1 text-[11px] font-semibold text-white">
                      <span>
                        {tx(locale, {
                          zh: '📢 跑马灯广告图层示例（前端 Div 悬浮覆盖，0 云端转码成本，支持动态修改与点击跳转）',
                          en: '📢 Frontend ticker overlay demo (Zero cloud transcoding cost, supports dynamic text & clickable links)',
                          'zh-TW': '📢 跑馬燈廣告圖層示例（前端 Div 懸浮覆蓋，0 雲端轉碼成本，支援動態修改與點擊跳轉）',
                        })}
                      </span>
                    </div>
                    {/* Player Control Bar */}
                    <div className="absolute inset-x-0 bottom-0 flex h-9 items-center justify-between bg-gradient-to-t from-black/90 to-black/60 px-4 text-xs text-white/85">
                      <div className="flex items-center gap-3">
                        <span>❚❚</span>
                        <span className="text-[11px] text-white/70">01:07:24 / LIVE</span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px]">
                        <span className="bg-white/15 px-1.5 py-0.5 font-mono">1080P</span>
                        <span>🔊</span>
                        <span>⛶</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isIptv && (
              <div className="lg:col-span-7">
                <div className="overflow-hidden border-2 border-brand-ink bg-[#0B0B0D] text-white shadow-[6px_6px_0_0_#FC0078]">
                  {/* App Header */}
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#111114] px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-5 w-5 items-center justify-center bg-brand-primary text-[10px] font-bold">▶</span>
                      <span className="text-sm font-bold tracking-wide">YOUR TV APP</span>
                    </div>
                    <span className="text-[10px] font-semibold text-white/45">24/7 LIVE</span>
                  </div>

                  {/* Left channel list + right player */}
                  <div className="grid grid-cols-[9.5rem_1fr] sm:grid-cols-[11.5rem_1fr]">
                    {/* Channel List Sidebar */}
                    <aside className="max-h-[22rem] overflow-hidden border-r border-white/10 bg-[#0F0F12]">
                      <div className="border-b border-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white/45">
                        {tx(locale, { zh: '频道列表', en: 'Channels', 'zh-TW': '頻道列表' })}
                      </div>
                      <ul className="divide-y divide-white/5 text-xs">
                        {[
                          { name: 'CNBC', country: 'US' },
                          { name: 'CW', country: 'US' },
                          { name: 'Channel 5', country: 'GB' },
                          { name: 'DAZN 1', country: 'GB' },
                          { name: 'ESPN', country: 'US', active: true },
                          { name: 'ESPN 2', country: 'US' },
                          { name: 'ESPN Deportes', country: 'US' },
                          { name: 'ESPNU', country: 'US' },
                          { name: 'ESPNews', country: 'US' },
                          { name: 'Eurosport 1', country: 'GB' },
                          { name: 'Fox Cricket', country: 'AU' },
                          { name: 'NBA TV', country: 'US' },
                        ].map((ch) => (
                          <li
                            key={`${ch.name}-${ch.country}`}
                            className={`flex items-center gap-2.5 px-3 py-2.5 ${
                              ch.active ? 'bg-white/10' : 'hover:bg-white/5'
                            }`}
                          >
                            <span
                              className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${
                                ch.active ? 'bg-brand-primary text-white' : 'bg-white/10 text-white/70'
                              }`}
                            >
                              {ch.name.slice(0, 1)}
                            </span>
                            <span className="min-w-0">
                              <span className={`block truncate font-semibold ${ch.active ? 'text-white' : 'text-white/85'}`}>
                                {ch.name}
                              </span>
                              <span className="block text-[10px] text-white/40">{ch.country}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </aside>

                    {/* Player Column */}
                    <div className="flex min-w-0 flex-col bg-black">
                      {/* Now Playing Banner */}
                      <div className="flex items-center gap-2 border-b border-white/10 bg-[#15151A] px-3 py-2.5 sm:px-4">
                        <span className="inline-flex items-center gap-1.5 bg-brand-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                          LIVE
                        </span>
                        <p className="truncate text-xs font-semibold sm:text-sm">
                          Mississippi St vs Texas NCAAF
                        </p>
                      </div>

                      {/* Video Viewport */}
                      <div className="relative aspect-video w-full overflow-hidden bg-black">
                        <img
                          src="/match-player-preview.jpg"
                          alt="Global Sports Channel live preview"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute left-3 top-3 bg-black/70 px-2 py-1 text-[10px] font-bold backdrop-blur-sm">
                          ESPN · US
                        </div>
                        <div className="absolute inset-x-0 bottom-0 flex h-9 items-center justify-between bg-gradient-to-t from-black/95 to-black/50 px-3 text-xs text-white/85">
                          <div className="flex items-center gap-2">
                            <span className="font-bold">ESPN</span>
                            <span className="text-[10px] text-white/50">US</span>
                          </div>
                          <div className="flex items-center gap-3 text-[11px]">
                            <span>🔊</span>
                            <span className="hidden h-1 w-14 rounded-full bg-white/25 sm:inline-block">
                              <span className="block h-1 w-2/3 rounded-full bg-white" />
                            </span>
                            <span>⛶</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isAssistant && (
              <div className="lg:col-span-7">
                <div className="overflow-hidden border-2 border-brand-ink bg-[#0E1621] text-white shadow-[6px_6px_0_0_#FC0078]">
                  {/* Telegram / Lark Group Header */}
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#17212B] px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">
                        SLA
                      </span>
                      <div>
                        <p className="text-xs font-bold sm:text-sm">
                          {tx(locale, {
                            zh: 'SLA 专属赛事直播机器人群（Telegram / Lark）',
                            en: 'SLA Dedicated Stream Bot Group (Telegram / Lark)',
                            'zh-TW': 'SLA 專屬賽事直播機器人群（Telegram / Lark）',
                          })}
                        </p>
                        <p className="text-[11px] text-white/60">
                          {tx(locale, {
                            zh: '📌 置顶：回复 666 → 获取今日/近期比赛列表 · 回复比赛序号 → 获取该场直播链接',
                            en: '📌 Pinned: Reply 666 → Get fixture list · Reply match # → Get live stream URLs',
                            'zh-TW': '📌 置頂：回覆 666 → 取得今日/近期比賽列表 · 回覆比賽序號 → 取得該場直播連結',
                          })}
                        </p>
                      </div>
                    </div>
                    <span className="hidden rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 sm:inline-block">
                      BOT ONLINE
                    </span>
                  </div>

                  {/* Chat Transcript Area */}
                  <div className="space-y-3.5 p-4 text-xs leading-5">
                    {/* User sends 666 */}
                    <div className="flex justify-end">
                      <div className="rounded-lg rounded-br-none bg-[#2B5278] px-3.5 py-2 text-white shadow">
                        <span className="font-mono text-sm font-bold">666</span>
                        <span className="ml-2 text-[10px] text-white/60">16:15 ✓✓</span>
                      </div>
                    </div>

                    {/* Bot replies schedule list */}
                    <div className="max-w-[94%] rounded-lg rounded-bl-none border border-white/10 bg-[#182533] p-3.5 shadow">
                      <p className="font-bold text-emerald-400">直播源机器人-SportliveAPI.com</p>
                      <p className="mt-1 font-semibold text-white">
                        🛰️ 卫星源｜赛前20分钟可播｜高清1080P｜质量可靠｜
                      </p>
                      <div className="mt-1 space-y-0.5 font-mono text-[11px] text-white/85">
                        <p>1. 15:00 WCBA杯 陕西女篮 🆚 厦门女篮</p>
                        <p className="rounded bg-brand-primary/25 px-1.5 py-0.5 font-bold text-white">
                          2. 15:45 亚冠二级 墨尔本胜利 🆚 万隆
                        </p>
                        <p>8. 18:00 亚精英赛 浦项铁人 🆚 大阪钢巴</p>
                        <p>21. 01:45 欧冠 费内巴切 🆚 利物浦</p>
                        <p>22. 01:45 欧冠 雅典AEK 🆚 皇家马德里</p>
                      </div>
                      <p className="mt-2 font-semibold text-sky-300">
                        🌐 网络源｜一般开赛可播｜联赛覆盖面全｜
                      </p>
                      <div className="mt-1 space-y-0.5 font-mono text-[11px] text-white/80">
                        <p>33. 16:00 俄杯 叶尼塞 🆚 下诺夫哥罗德</p>
                        <p>35. 18:00 韩篮甲 首尔SK骑士 🆚 大邱飞马</p>
                      </div>
                      <p className="mt-2 border-t border-white/10 pt-1.5 text-[11px] text-white/60">
                        💡 比赛列表基于预设白名单生成。若某联赛未出现，回复 <code className="text-brand-primary font-bold">add</code> 即可自助添加。
                      </p>
                    </div>

                    {/* User sends 2 */}
                    <div className="flex justify-end">
                      <div className="rounded-lg rounded-br-none bg-[#2B5278] px-3.5 py-2 text-white shadow">
                        <span className="font-mono text-sm font-bold">2</span>
                        <span className="ml-2 text-[10px] text-white/60">16:15 ✓✓</span>
                      </div>
                    </div>

                    {/* Bot replies match links */}
                    <div className="max-w-[94%] rounded-lg rounded-bl-none border border-brand-primary/40 bg-[#182533] p-3.5 shadow">
                      <p className="font-bold text-emerald-400">直播源机器人-SportliveAPI.com</p>
                      <p className="mt-1 font-bold text-white">
                        🏆 亚冠二级 · 🆚 墨尔本胜利 vs 万隆 · ⏰ 11/04 15:45
                      </p>
                      <div className="mt-2 space-y-1 font-mono text-[11px]">
                        <p>
                          <span className="text-emerald-300">🛰️ 卫星源（稳定）：</span>
                          <span className="text-amber-300">http://obs1.qdhytm.com/9oAH0g</span>
                        </p>
                        <p>
                          <span className="text-rose-300">🎙️ 赛场原声（稳定）：</span>
                          <span className="text-amber-300">http://obs1.qdhytm.com/Q4BAEH</span>
                        </p>
                        <p>
                          <span className="text-sky-300">网络源（灾备）：</span>
                          <span className="text-amber-300">http://obs1.qdhytm.com/mRhn2</span>
                        </p>
                        <p>
                          <span className="text-violet-300">南亚高清（灾备）：</span>
                          <span className="text-amber-300">http://obs1.qdhytm.com/q8CnQ</span>
                        </p>
                      </div>
                      <p className="mt-2 text-[11px] text-white/65">
                        👉 稳定主力：卫星源 / 赛场原声 · 其余为覆盖与灾备
                      </p>
                      <p className="mt-1.5 border-t border-white/10 pt-1.5 text-[11px] text-amber-200/90">
                        ⚠️ 提示：链接有监控，仅限在 OBS 添加为「媒体源」播放，请勿分享他人或用于转推。
                      </p>
                    </div>
                  </div>

                  {/* Bottom OBS Media Source Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-[#131B24] px-4 py-2.5 text-[11px]">
                    <span className="font-semibold text-white">
                      🎬 {tx(locale, {
                        zh: 'OBS 操作：来源 (+) → 新建「媒体源」→ 取消勾选本地文件 → 粘贴链接（5–10 秒出画面）',
                        en: 'In OBS: Sources (+) → Media Source → Uncheck Local File → Paste URL (video in 5–10s)',
                        'zh-TW': 'OBS 操作：來源 (+) → 新建「媒體源」→ 取消勾選本地檔案 → 貼上連結（5–10 秒出畫面）',
                      })}
                    </span>
                    <span className="bg-brand-primary px-2 py-0.5 font-bold text-white">1080P HD</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {isStreams && (
        <section className="border-b border-brand-line bg-brand-paper">
          <div className="container-custom py-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
                  <Mark />
                  <span>STREAM LINE TYPES</span>
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{tx(locale, coveragePage.linesTitle)}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-brand-muted">
                  {tx(locale, {
                    zh: '链接模式下聚合、国际高清、赛场原声三条默认开放；推流模式下聚合与国际高清默认开放。其余定制线路按需向客户经理申请开通。',
                    en: 'In Playback Links mode, Web Stream, Global HD, and Raw Feed are enabled by default; in Push mode, Web Stream and Global HD are enabled by default. Other custom lines are enabled on request.',
                    'zh-TW': '連結模式下聚合、國際高清、賽場原聲三條預設開放；推流模式下聚合與國際高清預設開放。其餘定制線路按需向客戶經理申請開通。',
                  })}
                </p>
              </div>
              <Link
                href={`/${locale}/coverage`}
                className="inline-flex shrink-0 items-center gap-2 bg-brand-primary px-5 py-3 text-sm font-semibold text-white shadow-[3px_3px_0_0_#141414] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark"
              >
                <span>{tx(locale, { zh: '查看各球类直播画面预览', en: 'Preview live match screenshots', 'zh-TW': '查看各球類直播畫面預覽' })}</span>
                <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="mt-8 overflow-x-auto border border-brand-line border-t-4 border-t-brand-primary bg-white">
              <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-brand-line bg-brand-ink text-xs font-semibold uppercase tracking-wider text-white">
                    <th className="px-4 py-3.5">{tx(locale, coveragePage.lineName)}</th>
                    <th className="px-4 py-3.5">{tx(locale, coveragePage.quality)}</th>
                    <th className="px-4 py-3.5">{tx(locale, coveragePage.cover)}</th>
                    <th className="whitespace-nowrap px-4 py-3.5">
                      {tx(locale, { zh: '是否默认（链接模式）', en: 'Default (Links Mode)', 'zh-TW': '是否預設（連結模式）' })}
                    </th>
                    <th className="whitespace-nowrap px-4 py-3.5">
                      {tx(locale, { zh: '是否默认（推流模式）', en: 'Default (Push Mode)', 'zh-TW': '是否預設（推流模式）' })}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-line">
                  {lines.map((line) => {
                    const defaultLabel = tx(locale, { zh: '默认开放', en: 'Included', 'zh-TW': '預設開放' })
                    const customLabel = tx(locale, { zh: '定制 · 需申请', en: 'Custom · Request', 'zh-TW': '定制 · 需申請' })
                    const iptvLabel = tx(locale, { zh: '需开通全球体育频道 →', en: 'Requires Global Sports Channels →', 'zh-TW': '需開通全球體育頻道 →' })
                    return (
                      <tr key={line.nameEn} className="hover:bg-brand-tint/30">
                        <td className="whitespace-nowrap px-4 py-3.5 font-semibold text-brand-ink">
                          {tx(locale, line.name)}
                        </td>
                        <td className="px-4 py-3.5 text-brand-ink">{tx(locale, line.quality)}</td>
                        <td className="px-4 py-3.5 text-brand-muted">{tx(locale, line.coverage)}</td>
                        <td className="whitespace-nowrap px-4 py-3.5">
                          {line.requiresIptv ? (
                            <Link
                              href={`/${locale}/products/iptv`}
                              className="inline-block -skew-x-[8deg] border border-brand-primary bg-white px-2.5 py-0.5 text-xs font-semibold text-brand-primary hover:bg-brand-primary hover:text-white"
                            >
                              <span className="inline-block skew-x-[8deg]">{iptvLabel}</span>
                            </Link>
                          ) : (
                            <span
                              className={`inline-block -skew-x-[8deg] px-2.5 py-0.5 text-xs font-semibold ${
                                line.linkDefault ? 'bg-brand-tint text-brand-primary' : 'bg-brand-ink text-white'
                              }`}
                            >
                              <span className="inline-block skew-x-[8deg]">{line.linkDefault ? defaultLabel : customLabel}</span>
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5">
                          {line.requiresIptv ? (
                            <Link
                              href={`/${locale}/products/iptv`}
                              className="inline-block -skew-x-[8deg] border border-brand-primary bg-white px-2.5 py-0.5 text-xs font-semibold text-brand-primary hover:bg-brand-primary hover:text-white"
                            >
                              <span className="inline-block skew-x-[8deg]">{iptvLabel}</span>
                            </Link>
                          ) : (
                            <span
                              className={`inline-block -skew-x-[8deg] px-2.5 py-0.5 text-xs font-semibold ${
                                line.pushDefault ? 'bg-brand-tint text-brand-primary' : 'bg-brand-ink text-white'
                              }`}
                            >
                              <span className="inline-block skew-x-[8deg]">{line.pushDefault ? defaultLabel : customLabel}</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-col justify-between gap-4 border-l-4 border-brand-primary bg-white px-5 py-4 text-sm sm:flex-row sm:items-center">
              <p className="text-brand-ink">
                <span className="font-bold text-brand-primary">
                  {tx(locale, { zh: '计价说明：', en: 'Pricing note: ', 'zh-TW': '計價說明：' })}
                </span>
                {tx(locale, {
                  zh: '订阅费用与接入的运动品类数量及定制线路直接挂钩——勾选的球类越多、定制线路越多，价格越高。建议按实际运营的球类按需选购。',
                  en: 'Subscription pricing scales directly with the number of sports categories and custom lines you enable — the more sports and custom feeds you pick, the higher the quote. We recommend subscribing only to the sports you actively operate.',
                  'zh-TW': '訂閱費用與接入的運動品類數量及定制線路直接掛鉤——勾選的球類越多、定制線路越多，價格越高。建議按實際營運的球類按需選購。',
                })}
              </p>
              <Link href={`/${locale}/contact`} className="shrink-0 font-semibold text-brand-primary hover:underline">
                {tx(locale, { zh: '按球类获取报价 →', en: 'Get a quote by sport →', 'zh-TW': '按球類取得報價 →' })}
              </Link>
            </div>
          </div>
        </section>
      )}

      {isStreams && (
        <section id="delivery-modes" className="border-b border-brand-line bg-white">
          <div className="container-custom py-16 lg:py-20">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
              <Mark />
              <span>{tx(locale, streamsDeliveryModes.eyebrow)}</span>
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{tx(locale, streamsDeliveryModes.title)}</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-brand-muted">{tx(locale, streamsDeliveryModes.lede)}</p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {streamsDeliveryModes.modes.map((mode, idx) => (
                <article
                  key={mode.id}
                  id={mode.id}
                  className={`flex flex-col justify-between border border-brand-line p-6 shadow-sm sm:p-8 ${
                    idx === 0
                      ? 'border-t-4 border-t-brand-primary bg-brand-tint/25'
                      : 'border-t-4 border-t-brand-ink bg-brand-paper/55'
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`inline-flex h-6 -skew-x-[10deg] items-center px-3 text-xs font-bold text-white ${
                          idx === 0 ? 'bg-brand-primary' : 'bg-brand-ink'
                        }`}
                      >
                        <span className="skew-x-[10deg]">{tx(locale, mode.badge)}</span>
                      </span>
                      <code className="bg-brand-paper px-2.5 py-1 text-xs font-medium text-brand-ink">{mode.endpoint}</code>
                    </div>
                    <h3 className="mt-4 text-2xl font-bold tracking-tight">{tx(locale, mode.name)}</h3>

                    {/* Visual Flow Diagram for Non-Technical Readers */}
                    {idx === 0 ? (
                      <div className="mt-5 border border-brand-primary/30 bg-white p-4 shadow-sm">
                        <div className="mb-3 flex items-center justify-between text-[11px] font-bold text-brand-primary">
                          <span>
                            {tx(locale, {
                              zh: '💡 省心直连：无需自建流媒体服务器',
                              en: '💡 Plug & Play: No streaming server needed',
                              'zh-TW': '💡 省心直連：無需自建串流媒體伺服器',
                            })}
                          </span>
                          <span className="bg-brand-primary/15 px-2 py-0.5 text-[10px] text-brand-primary">
                            {tx(locale, { zh: '我们托管 CDN', en: 'SLA-Hosted CDN', 'zh-TW': '我們託管 CDN' })}
                          </span>
                        </div>

                        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1.5 text-center">
                          {/* Step 1: SLA */}
                          <div className="flex flex-col items-center border border-brand-primary/40 bg-brand-tint/30 px-2 py-3">
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">
                              SLA
                            </span>
                            <span className="mt-1.5 text-xs font-bold text-brand-ink">
                              {tx(locale, { zh: '我们（云端 CDN）', en: 'SLA Cloud CDN', 'zh-TW': '我們（雲端 CDN）' })}
                            </span>
                            <span className="mt-0.5 text-[10px] text-brand-muted">
                              {tx(locale, { zh: '承担视频分发', en: 'Streams video', 'zh-TW': '承擔影片分發' })}
                            </span>
                          </div>

                          {/* Arrow 1 */}
                          <div className="flex flex-col items-center px-0.5">
                            <span className="text-[10px] font-semibold text-brand-ink">
                              {tx(locale, { zh: '给现成网址', en: 'Play URL', 'zh-TW': '給現成網址' })}
                            </span>
                            <div className="my-1 flex items-center text-brand-primary">
                              <span className="h-0.5 w-5 bg-brand-primary sm:w-8" />
                              <span className="-ml-1 text-xs leading-none">▸</span>
                            </div>
                            <span className="text-[9px] text-brand-muted">m3u8 / flv</span>
                          </div>

                          {/* Step 2: Customer */}
                          <div className="flex flex-col items-center border border-brand-line bg-brand-paper/35 px-2 py-3">
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-ink text-xs font-bold text-white">
                              APP
                            </span>
                            <span className="mt-1.5 text-xs font-bold text-brand-ink">
                              {tx(locale, { zh: '你的网站 / App', en: 'Your Site / App', 'zh-TW': '你的網站 / App' })}
                            </span>
                            <span className="mt-0.5 text-[10px] text-emerald-700 font-semibold">
                              {tx(locale, { zh: '仅放播放器', en: 'Player only', 'zh-TW': '僅放播放器' })}
                            </span>
                          </div>

                          {/* Arrow 2 */}
                          <div className="flex flex-col items-center px-0.5">
                            <span className="text-[10px] font-bold text-brand-primary">
                              {tx(locale, { zh: '直接拉流看', en: 'Direct play', 'zh-TW': '直接拉流看' })}
                            </span>
                            <div className="my-1 flex items-center text-brand-primary">
                              <span className="h-0.5 w-5 bg-brand-primary sm:w-8" />
                              <span className="-ml-1 text-xs leading-none">▸</span>
                            </div>
                            <span className="text-[9px] font-semibold text-brand-primary">
                              {tx(locale, { zh: '走我们流量', en: 'Our bandwidth', 'zh-TW': '走我們流量' })}
                            </span>
                          </div>

                          {/* Step 3: Viewers */}
                          <div className="flex flex-col items-center border border-brand-line bg-brand-paper/35 px-2 py-3">
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-ink shadow-sm">
                              👥
                            </span>
                            <span className="mt-1.5 text-xs font-bold text-brand-ink">
                              {tx(locale, { zh: '终端观众', en: 'End Viewers', 'zh-TW': '終端觀眾' })}
                            </span>
                            <span className="mt-0.5 text-[10px] text-brand-muted">
                              {tx(locale, { zh: '打开即看', en: 'Watch live', 'zh-TW': '打開即看' })}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between border-t border-brand-primary/20 pt-2.5 text-[11px]">
                          <span className="font-semibold text-brand-ink">
                            {tx(locale, { zh: '💰 费用怎么付：', en: '💰 How you pay:', 'zh-TW': '💰 費用怎麼付：' })}
                          </span>
                          <span className="font-bold text-brand-primary">
                            {tx(locale, {
                              zh: '线路订阅费 + 观众流量费（均付给我们）',
                              en: 'Subscription + Viewer Traffic (both paid to SLA)',
                              'zh-TW': '線路訂閱費 + 觀眾流量費（均付給我們）',
                            })}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-5 border border-brand-line bg-white p-4 shadow-sm">
                        <div className="mb-3 flex items-center justify-between text-[11px] font-bold text-brand-ink">
                          <span>
                            {tx(locale, {
                              zh: '🏢 自主分发：视频推入你自己的云账号',
                              en: '🏢 Self-Hosted: Video pushed to your cloud',
                              'zh-TW': '🏢 自主分發：影片推入你自己的雲帳號',
                            })}
                          </span>
                          <span className="bg-brand-ink px-2 py-0.5 text-[10px] text-white">
                            {tx(locale, { zh: '你自备云 CDN', en: 'Your Own CDN', 'zh-TW': '你自備雲 CDN' })}
                          </span>
                        </div>

                        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1.5 text-center">
                          {/* Step 1: SLA */}
                          <div className="flex flex-col items-center border border-brand-line bg-brand-paper/35 px-2 py-3">
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">
                              SLA
                            </span>
                            <span className="mt-1.5 text-xs font-bold text-brand-ink">
                              {tx(locale, { zh: '我们（源站）', en: 'SLA Origin', 'zh-TW': '我們（源站）' })}
                            </span>
                            <span className="mt-0.5 text-[10px] text-brand-muted">
                              {tx(locale, { zh: '只推一路源流', en: '1 ingest stream', 'zh-TW': '只推一路源流' })}
                            </span>
                          </div>

                          {/* Arrow 1 */}
                          <div className="flex flex-col items-center px-0.5">
                            <span className="text-[10px] font-semibold text-brand-ink">
                              {tx(locale, { zh: 'RTMP 推流', en: 'RTMP Push', 'zh-TW': 'RTMP 推流' })}
                            </span>
                            <div className="my-1 flex items-center text-brand-ink">
                              <span className="h-0.5 w-5 bg-brand-ink sm:w-8" />
                              <span className="-ml-1 text-xs leading-none">▸</span>
                            </div>
                            <span className="text-[9px] text-emerald-700 font-semibold">
                              {tx(locale, { zh: '不计观众流量', en: 'No viewer fee', 'zh-TW': '不計觀眾流量' })}
                            </span>
                          </div>

                          {/* Step 2: Customer Cloud */}
                          <div className="flex flex-col items-center border-2 border-brand-ink bg-brand-paper/50 px-2 py-3">
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-ink text-xs font-bold text-white">
                              CDN
                            </span>
                            <span className="mt-1.5 text-xs font-bold text-brand-ink">
                              {tx(locale, { zh: '你的云厂商', en: 'Your Cloud CDN', 'zh-TW': '你的雲廠商' })}
                            </span>
                            <span className="mt-0.5 text-[10px] font-semibold text-brand-primary">
                              {tx(locale, { zh: '阿里云 / 腾讯云等', en: 'Alibaba / Tencent / etc.', 'zh-TW': '阿里雲 / 騰訊雲等' })}
                            </span>
                          </div>

                          {/* Arrow 2 */}
                          <div className="flex flex-col items-center px-0.5">
                            <span className="text-[10px] font-bold text-brand-ink">
                              {tx(locale, { zh: '由你分发', en: 'You distribute', 'zh-TW': '由你分發' })}
                            </span>
                            <div className="my-1 flex items-center text-brand-ink">
                              <span className="h-0.5 w-5 bg-brand-ink sm:w-8" />
                              <span className="-ml-1 text-xs leading-none">▸</span>
                            </div>
                            <span className="text-[9px] font-semibold text-brand-ink">
                              {tx(locale, { zh: '走你的云流量', en: 'Your bandwidth', 'zh-TW': '走你的雲流量' })}
                            </span>
                          </div>

                          {/* Step 3: Viewers */}
                          <div className="flex flex-col items-center border border-brand-line bg-brand-paper/35 px-2 py-3">
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-ink shadow-sm">
                              👥
                            </span>
                            <span className="mt-1.5 text-xs font-bold text-brand-ink">
                              {tx(locale, { zh: '终端观众', en: 'End Viewers', 'zh-TW': '終端觀眾' })}
                            </span>
                            <span className="mt-0.5 text-[10px] text-brand-muted">
                              {tx(locale, { zh: '打开即看', en: 'Watch live', 'zh-TW': '打開即看' })}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between border-t border-brand-line pt-2.5 text-[11px]">
                          <span className="font-semibold text-brand-ink">
                            {tx(locale, { zh: '💰 费用怎么付：', en: '💰 How you pay:', 'zh-TW': '💰 費用怎麼付：' })}
                          </span>
                          <span className="font-bold text-brand-ink">
                            {tx(locale, {
                              zh: '只付我们线路订阅费（流量费付给你自己的云厂商）',
                              en: 'Subscription to SLA only (traffic paid to your cloud)',
                              'zh-TW': '只付我們線路訂閱費（流量費付給你自己的雲廠商）',
                            })}
                          </span>
                        </div>
                      </div>
                    )}

                    <p className="mt-4 text-sm leading-6 text-brand-ink">{tx(locale, mode.summary)}</p>
                  </div>
                  <div className="mt-6 space-y-3 border-t border-brand-line pt-4 text-xs leading-5">
                    <p>
                      <span className="font-bold text-brand-primary">
                        {tx(locale, { zh: '流量计费：', en: 'Traffic billing: ', 'zh-TW': '流量計費：' })}
                      </span>
                      <span className="text-brand-muted">{tx(locale, mode.billing)}</span>
                    </p>
                    <p>
                      <span className="font-bold text-brand-ink">
                        {tx(locale, { zh: '适用团队：', en: 'Recommended for: ', 'zh-TW': '適用團隊：' })}
                      </span>
                      <span className="text-brand-muted">{tx(locale, mode.fit)}</span>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {isIptv && (
        <section className="border-b border-brand-line bg-brand-paper">
          <div className="container-custom py-16 lg:py-20">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
                  <Mark />
                  <span>CHANNEL COVERAGE</span>
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                  {tx(locale, { zh: '频道覆盖', en: 'Channel Coverage', 'zh-TW': '頻道覆蓋' })}
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-brand-muted">
                  {tx(locale, {
                    zh: '目前覆盖 100+ 线性体育与综合频道，涵盖英国、美国、加拿大、新西兰、澳大利亚等地。以下为部分代表性频道：',
                    en: '100+ linear sports and broadcast channels across the UK, US, Canada, New Zealand, Australia, and more. A sample of representative channels:',
                    'zh-TW': '目前覆蓋 100+ 線性體育與綜合頻道，涵蓋英國、美國、加拿大、紐西蘭、澳洲等地。以下為部分代表性頻道：',
                  })}
                </p>
              </div>
              <Link
                href={`/${locale}/coverage?tab=channels`}
                className="inline-flex shrink-0 items-center gap-2 border border-brand-ink bg-white px-5 py-3 text-sm font-semibold text-brand-ink shadow-[3px_3px_0_0_#141414] transition-transform hover:-translate-y-0.5 hover:border-brand-primary hover:text-brand-primary"
              >
                <span>{tx(locale, { zh: '查看更多频道', en: 'See more channels', 'zh-TW': '查看更多頻道' })}</span>
                <span aria-hidden>→</span>
              </Link>
            </div>

            <ul className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9">
              {iptvChannelData.featuredChannels.map((ch) => (
                <li
                  key={ch.id}
                  className="group flex flex-col items-center gap-2 border border-brand-line bg-white px-2 py-3 transition-colors hover:border-brand-primary hover:bg-brand-tint/30"
                  title={ch.name}
                >
                  <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-brand-line sm:h-[4.5rem] sm:w-[4.5rem]">
                    <img
                      src={ch.logo}
                      alt={ch.name}
                      className="h-full w-full scale-[1.22] object-cover"
                      loading="lazy"
                    />
                  </span>
                  <span className="w-full truncate text-center text-[11px] font-semibold leading-4 text-brand-ink">
                    {ch.name}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col justify-between gap-4 border-l-4 border-brand-primary bg-white px-5 py-4 text-sm sm:flex-row sm:items-center">
              <p className="text-brand-ink">
                <span className="font-bold text-brand-primary">
                  {tx(locale, { zh: '开通说明：', en: 'Activation note: ', 'zh-TW': '開通說明：' })}
                </span>
                {tx(locale, iptvChannelData.coverageNote)}
              </p>
              <Link href={`/${locale}/coverage?tab=channels`} className="shrink-0 font-semibold text-brand-primary hover:underline">
                {tx(locale, { zh: '去直播预览查看全部 →', en: 'Browse all in Live Preview →', 'zh-TW': '去直播預覽查看全部 →' })}
              </Link>
            </div>
          </div>
        </section>
      )}

      {isIptv && (
        <section className="border-b border-brand-line bg-white">
          <div className="container-custom py-16 lg:py-20">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
              <Mark />
              <span>CHANNELS & PROGRAM GUIDE</span>
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {tx(locale, {
                zh: '频道目录与未来一个月节目表',
                en: 'Channel Directory & 30-Day Program Guide',
                'zh-TW': '頻道目錄與未來一個月節目表',
              })}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-brand-muted">
              {tx(locale, {
                zh: '观众可以像看电视一样浏览已开通频道，也可以先看未来约一个月的播出安排，点进某场赛事直接收看——不必自己整理赛程。',
                en: 'Viewers can browse enabled channels like live TV, or open the ~30-day program guide and tap straight into a broadcast — no need to assemble schedules yourself.',
                'zh-TW': '觀眾可以像看電視一樣瀏覽已開通頻道，也可以先看未來約一個月的播出安排，點進某場賽事直接收看——不必自己整理賽程。',
              })}
            </p>

            <div className="mt-8 border border-brand-primary/30 bg-brand-tint/25 p-5 sm:p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-brand-primary">
                <span>
                  {tx(locale, {
                    zh: '播放链路：Bunny CDN 上的 HLS 播放链接',
                    en: 'Playback path: an HLS link on your Bunny CDN',
                    'zh-TW': '播放鏈路：Bunny CDN 上的 HLS 播放連結',
                  })}
                </span>
                <span className="bg-brand-primary px-2.5 py-0.5 text-[11px] text-white">
                  {tx(locale, {
                    zh: '你的 Bunny 域名 · 流量直接付给 Bunny',
                    en: 'Your Bunny domain · billed by Bunny',
                    'zh-TW': '你的 Bunny 域名 · 流量直接付給 Bunny',
                  })}
                </span>
              </div>

              <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center text-center">
                <div className="flex flex-col items-center border border-brand-line bg-white p-4 shadow-sm">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-ink text-[10px] font-bold text-white">
                    SLA
                  </span>
                  <span className="mt-2 text-sm font-bold text-brand-ink">
                    {tx(locale, { zh: '频道源', en: 'Channel origin', 'zh-TW': '頻道源' })}
                  </span>
                  <span className="mt-1 text-xs text-brand-muted">
                    {tx(locale, {
                      zh: '24 小时线性频道信号',
                      en: '24-hour linear channel feeds',
                      'zh-TW': '24 小時線性頻道訊號',
                    })}
                  </span>
                </div>

                <div className="hidden flex-col items-center md:flex">
                  <span className="text-[10px] font-semibold text-brand-primary">
                    {tx(locale, { zh: '回源到你的 CDN', en: 'Pull into your CDN', 'zh-TW': '回源到你的 CDN' })}
                  </span>
                  <div className="my-1 flex items-center text-brand-primary">
                    <span className="h-0.5 w-8 bg-brand-primary" />
                    <span className="-ml-1 text-xs leading-none">▸</span>
                  </div>
                  <span className="text-[10px] text-brand-muted">HLS</span>
                </div>

                <div className="flex flex-col items-center border-2 border-brand-primary bg-white p-4 shadow-sm">
                  <span className="inline-flex h-7 items-center justify-center rounded-full bg-brand-primary px-2.5 text-[10px] font-bold text-white">
                    CDN
                  </span>
                  <span className="mt-2 text-sm font-bold text-brand-ink">
                    {tx(locale, { zh: '你的 Bunny 播放域名', en: 'Your Bunny playback domain', 'zh-TW': '你的 Bunny 播放域名' })}
                  </span>
                  <span className="mt-1 text-xs font-semibold text-brand-primary">
                    {tx(locale, {
                      zh: '观众拿到的就是这条 HLS 播放链接',
                      en: 'This domain is the playback link',
                      'zh-TW': '觀眾拿到的就是這條 HLS 播放連結',
                    })}
                  </span>
                </div>

                <div className="hidden flex-col items-center md:flex">
                  <span className="text-[10px] font-semibold text-brand-ink">
                    {tx(locale, { zh: '打开即看', en: 'Open and watch', 'zh-TW': '打開即看' })}
                  </span>
                  <div className="my-1 flex items-center text-brand-ink">
                    <span className="h-0.5 w-8 bg-brand-ink" />
                    <span className="-ml-1 text-xs leading-none">▸</span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700">
                    {tx(locale, { zh: '走 Bunny 流量', en: 'Bunny bandwidth', 'zh-TW': '走 Bunny 流量' })}
                  </span>
                </div>

                <div className="flex flex-col items-center border border-brand-line bg-white p-4 shadow-sm">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-paper text-xs font-bold text-brand-ink">
                    👥
                  </span>
                  <span className="mt-2 text-sm font-bold text-brand-ink">
                    {tx(locale, { zh: '海外观众', en: 'International viewers', 'zh-TW': '海外觀眾' })}
                  </span>
                  <span className="mt-1 text-xs text-brand-muted">
                    {tx(locale, {
                      zh: '网页 / App 播放器直接播这条链接',
                      en: 'Web / App player plays this link',
                      'zh-TW': '網頁 / App 播放器直接播這條連結',
                    })}
                  </span>
                </div>
              </div>

              <p className="mt-4 border-t border-brand-primary/20 pt-3 text-sm font-semibold leading-6 text-brand-ink">
                {tx(locale, {
                  zh: '播放链接在你自己的 Bunny 域名上，CDN 和播放流量都归 Bunny。',
                  en: 'The playback link lives on your Bunny domain — CDN and viewer traffic stay with Bunny.',
                  'zh-TW': '播放連結在你自己的 Bunny 域名上，CDN 和播放流量都歸 Bunny。',
                })}
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {(
                [
                  {
                    n: '01',
                    title: { zh: '频道目录', en: 'Channel Directory', 'zh-TW': '頻道目錄' },
                    body: {
                      zh: '列出你已开通的频道与台标，观众随时切换、停在台上连续收看。',
                      en: 'Lists the channels you enable, with logos. Viewers switch freely and stay tuned for continuous viewing.',
                      'zh-TW': '列出你已開通的頻道與台標，觀眾隨時切換、停在台上連續收看。',
                    },
                  },
                  {
                    n: '02',
                    title: { zh: '未来一个月节目表', en: '30-Day Program Guide', 'zh-TW': '未來一個月節目表' },
                    body: {
                      zh: '按天查看即将播出的赛事与节目，覆盖足球、NBA、NFL、棒球等主流项目。',
                      en: 'Browse upcoming broadcasts by day across football, NBA, NFL, baseball, and more.',
                      'zh-TW': '按天查看即將播出的賽事與節目，覆蓋足球、NBA、NFL、棒球等主流項目。',
                    },
                  },
                  {
                    n: '03',
                    title: { zh: '从节目表点播收看', en: 'Tune in from the guide', 'zh-TW': '從節目表點播收看' },
                    body: {
                      zh: '每场节目对应播出频道，观众从节目表点进去即可开始看，只展示你已开通范围内的场次。',
                      en: 'Each listing maps to its airing channel. Viewers tap in to watch — only events on your enabled channels appear.',
                      'zh-TW': '每場節目對應播出頻道，觀眾從節目表點進去即可開始看，只展示你已開通範圍內的場次。',
                    },
                  },
                ] as const
              ).map((item) => (
                <article key={item.n} className="border border-brand-line border-t-4 border-t-brand-primary bg-brand-paper/40 p-5 sm:p-6">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">
                    {item.n}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-brand-ink">{tx(locale, item.title)}</h3>
                  <p className="mt-2 text-sm leading-6 text-brand-muted">{tx(locale, item.body)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {isAssistant && (
        <section className="border-b border-brand-line bg-brand-paper">
          <div className="container-custom py-16 lg:py-20">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
              <Mark />
              <span>SIGNAL TIERS & BOT RULES</span>
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              {tx(locale, {
                zh: '稳定线路、灾备覆盖与群内取流规则',
                en: 'Stable Feeds, Backup Coverage & Bot Rules',
                'zh-TW': '穩定線路、災備覆蓋與群內取流規則',
              })}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-brand-muted">
              {tx(locale, {
                zh: '稳定可播的主力是卫星源与赛场原声；网络源、南亚高清与第三方链接主要用于扩大覆盖、突发灾备。群内发送 666 后仍按卫星源 / 网络源分块列赛程，回复序号即可拿到该场可用线路：',
                en: 'Stable primary feeds are Satellite and Raw stadium audio. Web, South Asia HD, and third-party links mainly expand coverage and act as failover. After 666, fixtures are still listed under Satellite / Web blocks; reply with a match number to get the available lines:',
                'zh-TW': '穩定可播的主力是衛星源與賽場原聲；網路源、南亞高清與第三方連結主要用於擴大覆蓋、突發災備。群內發送 666 後仍按衛星源 / 網路源分塊列賽程，回覆序號即可拿到該場可用線路：',
              })}
            </p>

            {/* Stable vs backup comparison */}
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <article className="border border-brand-line border-t-4 border-t-brand-primary bg-white p-6 shadow-sm sm:p-7">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex h-6 -skew-x-[10deg] items-center bg-brand-primary px-3 text-xs font-bold text-white">
                    <span className="skew-x-[10deg]">
                      {tx(locale, { zh: '稳定主力线路', en: 'Stable Primary Feeds', 'zh-TW': '穩定主力線路' })}
                    </span>
                  </span>
                  <span className="text-xs font-semibold text-brand-primary">
                    {tx(locale, { zh: '卫星源 · 赛场原声', en: 'Satellite · Raw Feed', 'zh-TW': '衛星源 · 賽場原聲' })}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-brand-ink">
                  {tx(locale, {
                    zh: '高清可靠 · 适合主播日常解说配音',
                    en: 'Reliable HD · Built for Day-to-Day Commentary',
                    'zh-TW': '高清可靠 · 適合主播日常解說配音',
                  })}
                </h3>
                <p className="mt-2.5 text-sm leading-6 text-brand-muted">
                  {tx(locale, {
                    zh: '🛰️ 卫星源：1080P、低延迟，适合热门赛事重点解说（赛前 20–30 分钟可播）。🎙️ 赛场原声：球场原音、无解说，方便主播自己配音。这两类是稳定可播的主力线路。',
                    en: 'Satellite: 1080p low-latency for marquee matches (active 20–30 minutes before kickoff). Raw Feed: stadium audio without commentary for hosts to dub over. These two are the stable primary lines.',
                    'zh-TW': '🛰️ 衛星源：1080P、低延遲，適合熱門賽事重點解說（賽前 20–30 分鐘可播）。🎙️ 賽場原聲：球場原音、無解說，方便主播自己配音。這兩類是穩定可播的主力線路。',
                  })}
                </p>
              </article>

              <article className="border border-brand-line border-t-4 border-t-brand-ink bg-white p-6 shadow-sm sm:p-7">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex h-6 -skew-x-[10deg] items-center bg-brand-ink px-3 text-xs font-bold text-white">
                    <span className="skew-x-[10deg]">
                      {tx(locale, { zh: '覆盖与灾备线路', en: 'Coverage & Failover Backups', 'zh-TW': '覆蓋與災備線路' })}
                    </span>
                  </span>
                  <span className="text-xs font-semibold text-brand-muted">
                    {tx(locale, { zh: '网络源 · 南亚高清 · 第三方', en: 'Web · South Asia HD · Third-party', 'zh-TW': '網路源 · 南亞高清 · 第三方' })}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-brand-ink">
                  {tx(locale, {
                    zh: '扩大联赛覆盖 · 突发断流时兜底',
                    en: 'Broader League Coverage · Failover When Needed',
                    'zh-TW': '擴大聯賽覆蓋 · 突發斷流時兜底',
                  })}
                </h3>
                <p className="mt-2.5 text-sm leading-6 text-brand-muted">
                  {tx(locale, {
                    zh: '网络源、南亚高清及第三方备用流主要用于保障更多联赛的覆盖面，并在主力线路异常时临时兜底。它们不是日常解说的首选依赖，而是覆盖与灾备补充。',
                    en: 'Web, South Asia HD, and third-party links mainly expand league coverage and serve as temporary failover if a primary line fails. They are coverage backups, not the first choice for day-to-day commentary.',
                    'zh-TW': '網路源、南亞高清及第三方備用流主要用於保障更多聯賽的覆蓋面，並在主力線路異常時臨時兜底。它們不是日常解說的首選依賴，而是覆蓋與災備補充。',
                  })}
                </p>
              </article>
            </div>

            {/* 6 Key Bot Usage Rules */}
            <div className="mt-6 border border-brand-line bg-white p-6 shadow-sm sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-line pb-4">
                <h3 className="text-lg font-bold text-brand-ink">
                  {tx(locale, {
                    zh: '⚠️ 赛事直播机器人 · 6 项重要使用规则',
                    en: '⚠️ Six Essential Usage Rules for the Streamer Bot',
                    'zh-TW': '⚠️ 賽事直播機器人 · 6 項重要使用規則',
                  })}
                </h3>
                <span className="text-xs font-semibold text-brand-primary">
                  {tx(locale, {
                    zh: '请严格遵守以保障直播资源稳定',
                    en: 'Follow strictly to keep stream resources stable',
                    'zh-TW': '請嚴格遵守以保障直播資源穩定',
                  })}
                </span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(
                  [
                    {
                      n: '1️⃣',
                      title: { zh: '播放方式（仅限 OBS 媒体源）', en: 'OBS Media Source Only', 'zh-TW': '播放方式（僅限 OBS 媒體源）' },
                      body: {
                        zh: '链接需在 OBS 内添加为「媒体源」播放（约 5–10 秒出画面），请勿在浏览器中直接打开。',
                        en: 'Add the link in OBS as a "Media Source" (video appears in 5–10s). Do not open it directly in a browser.',
                        'zh-TW': '連結需在 OBS 內添加為「媒體源」播放（約 5–10 秒出畫面），請勿在瀏覽器中直接打開。',
                      },
                    },
                    {
                      n: '2️⃣',
                      title: { zh: '连接 IP 数与 VPN 限制', en: 'Max IP Limit & No Multi-VPN', 'zh-TW': '連線 IP 數與 VPN 限制' },
                      body: {
                        zh: '每个链接设有最大连接 IP 数限制（按套餐设定）。请勿超额多人共用，或频繁切换多个 VPN 使用同一链接。',
                        en: 'Each link has a max IP limit per your plan. Do not share beyond your quota or switch across multiple VPNs.',
                        'zh-TW': '每個連結設有最大連線 IP 數限制（按套餐設定）。請勿超額多人共用，或頻繁切換多個 VPN 使用同一連結。',
                      },
                    },
                    {
                      n: '3️⃣',
                      title: { zh: '严禁转推与外传', en: 'No Restreaming or Sharing', 'zh-TW': '嚴禁轉推與外傳' },
                      body: {
                        zh: '禁止拉流转推、对外分享、传播至群外或其他平台。链接有实时监控，违规将退群并终止服务。',
                        en: 'Restreaming raw feeds or sharing links outside the group is prohibited. Monitored in real time.',
                        'zh-TW': '禁止拉流轉推、對外分享、傳播至群外或其他平台。連結有即時監控，違規將退群並終止服務。',
                      },
                    },
                    {
                      n: '4️⃣',
                      title: { zh: '使用名额扩容', en: 'Upgrading Streamer Seats', 'zh-TW': '使用名額擴容' },
                      body: {
                        zh: '如需更多主播同时使用同一条比赛链接（增加单链接最大 IP 数），可随时联系管理员调整套餐。',
                        en: 'Need more hosts on the same match link? Contact the admin anytime to upgrade your concurrent IP seats.',
                        'zh-TW': '如需更多主播同時使用同一條比賽連結（增加單連結最大 IP 數），可隨時聯繫管理員調整套餐。',
                      },
                    },
                    {
                      n: '5️⃣',
                      title: { zh: '赛程时间窗口', en: 'Schedule Lookahead Window', 'zh-TW': '賽程時間窗口' },
                      body: {
                        zh: '卫星源展示未来 12 小时赛程，网络源展示未来 3 小时赛程；随时在群内发送 666 即可刷新最新列表。',
                        en: 'Satellite shows the next 12h of fixtures; Web shows the next 3h. Send 666 anytime to refresh.',
                        'zh-TW': '衛星源展示未來 12 小時賽程，網路源展示未來 3 小時賽程；隨時在群內發送 666 即可重新整理最新列表。',
                      },
                    },
                    {
                      n: '6️⃣',
                      title: { zh: '仅足篮 + 联赛白名单', en: 'Football/Basketball + Allowlist', 'zh-TW': '僅足籃 + 聯賽白名單' },
                      body: {
                        zh: '目前仅支持足球与篮球。列表基于预设白名单；若关注的足篮联赛未出现，可群内回复 add 或联系管理员加入。',
                        en: 'Football and basketball only. Lists follow a preset allowlist; missing a league? Reply "add" or ask the admin to whitelist it.',
                        'zh-TW': '目前僅支援足球與籃球。列表基於預設白名單；若關注的足籃聯賽未出現，可群內回覆 add 或聯繫管理員加入。',
                      },
                    },
                  ] as const
                ).map((rule) => (
                  <div key={rule.n} className="border border-brand-line bg-brand-paper/40 p-4">
                    <div className="flex items-center gap-2 font-bold text-brand-ink">
                      <span>{rule.n}</span>
                      <span className="text-sm">{tx(locale, rule.title)}</span>
                    </div>
                    <p className="mt-1.5 text-xs leading-5 text-brand-muted">{tx(locale, rule.body)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-brand-line bg-brand-ink text-white">
        <div className="container-custom py-16 lg:py-20">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
            <Mark />
            <span>{tx(locale, { zh: '核心特性', en: 'Key Capabilities', 'zh-TW': '核心特性' })}</span>
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {tx(locale, {
              zh: isStreams
                ? '围绕赛事直播落地的四项工程能力'
                : isIptv
                  ? '专为海外 24 小时频道分发设计的四项特性'
                  : '专为体育解说工作室设计的四项特性',
              en: isStreams
                ? 'Four engineering capabilities built for live sports'
                : isIptv
                  ? 'Four capabilities built for 24/7 international channel delivery'
                  : 'Four capabilities built for sports commentary studios',
              'zh-TW': isStreams
                ? '圍繞賽事直播落地的四項工程能力'
                : isIptv
                  ? '專為海外 24 小時頻道分發設計的四項特性'
                  : '專為體育解說工作室設計的四項特性',
            })}
          </h2>
          <div className={`mt-8 grid gap-5 ${product.moments.length === 4 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
            {product.moments.map((moment, idx) => (
              <article
                key={moment.title.zh}
                className="border border-white/15 border-t-4 border-t-brand-primary bg-white/[0.06] p-6 backdrop-blur-sm transition-colors hover:bg-white/[0.1]"
              >
                <span className="inline-flex h-5 w-7 -skew-x-[10deg] items-center justify-center bg-brand-primary text-xs font-bold text-white">
                  <span className="skew-x-[10deg]">0{idx + 1}</span>
                </span>
                <h3 className="mt-3 text-lg font-bold text-white">{tx(locale, moment.title)}</h3>
                <p className="mt-2.5 text-sm leading-6 text-white/75">{tx(locale, moment.body)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-brand-line bg-white">
        {isStreams ? (
          <div className="container-custom py-16 lg:py-20">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
              <Mark />
              <span>INTEGRATION FLOW</span>
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{tx(locale, ui.steps)}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-brand-muted">
              {tx(locale, streamsDeliveryModes.integrationLede)}
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {streamsDeliveryModes.integrationFlows.map((flow, flowIdx) => (
                <article
                  key={flow.id}
                  className={`flex flex-col border border-brand-line p-6 shadow-sm sm:p-8 ${
                    flowIdx === 0
                      ? 'border-t-4 border-t-brand-primary bg-brand-tint/20'
                      : 'border-t-4 border-t-brand-ink bg-brand-paper/55'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`inline-flex h-6 -skew-x-[10deg] items-center px-3 text-xs font-bold text-white ${
                        flowIdx === 0 ? 'bg-brand-primary' : 'bg-brand-ink'
                      }`}
                    >
                      <span className="skew-x-[10deg]">{tx(locale, flow.badge)}</span>
                    </span>
                    <code className="border border-brand-line bg-white px-2.5 py-1 text-xs font-medium text-brand-ink">
                      {flow.endpoint}
                    </code>
                  </div>
                  <h3 className="mt-4 text-xl font-bold tracking-tight sm:text-2xl">{tx(locale, flow.title)}</h3>
                  <p className="mt-1.5 text-xs font-medium text-brand-muted">{tx(locale, flow.subtitle)}</p>

                  <ol className="mt-6 space-y-6 border-t border-brand-line pt-6">
                    {flow.steps.map((step, index) => (
                      <li key={step.title.zh} className="grid grid-cols-[auto_1fr] gap-3.5">
                        <span
                          className={`inline-flex h-6 w-8 shrink-0 -skew-x-[10deg] items-center justify-center text-xs font-bold text-white ${
                            flowIdx === 0 ? 'bg-brand-primary' : 'bg-brand-ink'
                          }`}
                        >
                          <span className="skew-x-[10deg]">0{index + 1}</span>
                        </span>
                        <div>
                          <h4 className="text-base font-bold text-brand-ink">{tx(locale, step.title)}</h4>
                          <p className="mt-1.5 text-sm leading-6 text-brand-muted">{tx(locale, step.body)}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="container-custom grid gap-10 py-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
                <Mark />
                <span>INTEGRATION FLOW</span>
              </p>
              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{tx(locale, ui.steps)}</h2>
              {isIptv && (
                <p className="mt-3 text-sm leading-6 text-brand-muted">
                  {tx(locale, {
                    zh: '使用你自己的 Bunny 播放域名与同一把商户 auth，4 步完成全球体育频道接入：',
                    en: 'Complete 4 steps using your own Bunny playback domain and merchant auth key:',
                    'zh-TW': '使用你自己的 Bunny 播放域名與同一把商戶 auth，4 步完成全球體育頻道接入：',
                  })}
                </p>
              )}
            </div>
            <ol className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
              {product.steps.map((step, index) => (
                <li
                  key={step.title.zh}
                  className="border border-brand-line border-t-4 border-t-brand-primary bg-brand-paper/40 p-6 shadow-sm"
                >
                  <span className="inline-flex h-6 w-8 -skew-x-[10deg] items-center justify-center bg-brand-ink text-xs font-bold text-white">
                    <span className="skew-x-[10deg]">0{index + 1}</span>
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-brand-ink">{tx(locale, step.title)}</h3>
                  <p className="mt-2 text-sm leading-6 text-brand-muted">{tx(locale, step.body)}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </section>

      <section className="border-b border-brand-line bg-brand-paper">
        {isStreams || isIptv || isAssistant ? (
          <div className="container-custom py-16 lg:py-20">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
              <Mark />
              <span>FAQ</span>
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              {tx(locale, { zh: '常见问题', en: 'Frequently Asked Questions', 'zh-TW': '常見問題' })}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-brand-muted">
              {tx(locale, {
                zh: isStreams
                  ? '整理自客户在接入赛事直播线路前最常咨询的业务与技术问题：'
                  : isIptv
                    ? '整理自客户在接入全球体育频道前最常咨询的频道范围、CDN 分发与接口问题：'
                    : '整理自解说工作室与主播团队在使用 OBS 直播流机器人时最常咨询的问题：',
                en: isStreams
                  ? 'Answers to the most common business and technical questions teams ask before integrating Live Match Lines:'
                  : isIptv
                    ? 'Answers to common questions about channel scope, CDN delivery, and server-side APIs for Global Sports Channels:'
                    : 'Answers to common questions from commentary studios and hosts using OBS Streamer Bot:',
                'zh-TW': isStreams
                  ? '整理自客戶在接入賽事直播線路前最常諮詢的業務與技術問題：'
                  : isIptv
                    ? '整理自客戶在接入全球體育頻道前最常諮詢的頻道範圍、CDN 分發與介面問題：'
                    : '整理自解說工作室與主播團隊在使用 OBS 直播流機器人時最常諮詢的問題：',
              })}
            </p>

            <div className="mt-8 space-y-3">
              {(isStreams
                ? streamsDeliveryModes.faqs
                : isIptv
                  ? iptvChannelData.faqs
                  : assistantBotData.faqs
              ).map((item, idx) => (
                <details
                  key={item.q.zh}
                  className="group border border-brand-line border-l-4 border-l-brand-primary bg-white shadow-sm transition-colors open:bg-white"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-left [&::-webkit-details-marker]:hidden">
                    <div className="flex items-center gap-3.5">
                      <span className="inline-flex h-5 w-7 shrink-0 -skew-x-[10deg] items-center justify-center bg-brand-ink text-[11px] font-bold text-white group-open:bg-brand-primary">
                        <span className="skew-x-[10deg]">Q{idx + 1}</span>
                      </span>
                      <h3 className="text-base font-bold leading-6 text-brand-ink group-hover:text-brand-primary">
                        {tx(locale, item.q)}
                      </h3>
                    </div>
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center border border-brand-line bg-brand-paper text-sm font-bold text-brand-ink transition-transform duration-200 group-open:rotate-45 group-open:border-brand-primary group-open:bg-brand-primary group-open:text-white">
                      +
                    </span>
                  </summary>

                  <div className="border-t border-brand-line px-6 py-5 text-sm leading-6 text-brand-muted">
                    <p>{tx(locale, item.a)}</p>

                    {'showTrafficTable' in item && item.showTrafficTable === true ? (
                      <div className="mt-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-brand-ink">
                          {tx(locale, streamsDeliveryModes.trafficTableTitle)}
                        </p>
                        <div className="mt-2.5 overflow-x-auto border border-brand-line bg-brand-paper/40">
                          <table className="w-full min-w-[38rem] border-collapse text-left text-xs">
                            <thead>
                              <tr className="border-b border-brand-line bg-brand-ink text-white">
                                <th className="whitespace-nowrap px-4 py-2.5 font-semibold">
                                  {tx(locale, { zh: '加速大区', en: 'Region', 'zh-TW': '加速大區' })}
                                </th>
                                <th className="whitespace-nowrap px-4 py-2.5 font-semibold">
                                  {tx(locale, {
                                    zh: '标准直播单价 (USD / GB)',
                                    en: 'Standard Streaming Rate (USD / GB)',
                                    'zh-TW': '標準直播單價 (USD / GB)',
                                  })}
                                </th>
                                <th className="px-4 py-2.5 font-semibold">
                                  {tx(locale, {
                                    zh: '覆盖国家与地区',
                                    en: 'Countries & Regions Covered',
                                    'zh-TW': '覆蓋國家與地區',
                                  })}
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-line bg-white">
                              {streamsDeliveryModes.trafficRegions.map((region) => (
                                <tr key={region.key} className="hover:bg-brand-tint/40">
                                  <td className="whitespace-nowrap px-4 py-2.5 font-semibold text-brand-ink">
                                    {tx(locale, region.label)}
                                  </td>
                                  <td className="whitespace-nowrap px-4 py-2.5 font-mono text-sm font-bold text-brand-primary">
                                    {region.rate}
                                  </td>
                                  <td className="px-4 py-2.5 text-brand-muted">{tx(locale, region.scope)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ) : (
          <div className="container-custom grid gap-8 py-16 md:grid-cols-3">
            <div className="border border-brand-line border-t-4 border-t-brand-primary bg-white p-6">
              <h2 className="text-lg font-bold">{tx(locale, ui.gets)}</h2>
              <div className="mt-4"><BulletList items={product.gets.map((item) => tx(locale, item))} /></div>
            </div>
            <div className="border border-brand-line border-t-4 border-t-brand-ink bg-white p-6">
              <h2 className="text-lg font-bold">{tx(locale, ui.pay)}</h2>
              <div className="mt-4"><BulletList items={product.pay.map((item) => tx(locale, item))} /></div>
            </div>
            <div className="border border-brand-line border-t-4 border-t-brand-ink bg-white p-6">
              <h2 className="text-lg font-bold">{tx(locale, ui.prepare)}</h2>
              <div className="mt-4"><BulletList items={product.prepare.map((item) => tx(locale, item))} /></div>
            </div>
          </div>
        )}
      </section>

      <section className="border-b border-brand-line bg-white">
        <div className="container-custom grid gap-8 py-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
              <Mark />
              <span>BOUNDARIES</span>
            </p>
            <h2 className="mt-2 text-2xl font-bold">{tx(locale, ui.limits)}</h2>
          </div>
          <div className="lg:col-span-8"><BulletList items={product.limits.map((item) => tx(locale, item))} /></div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-b border-brand-line bg-brand-paper">
          <div className="container-custom py-14">
            <h2 className="text-2xl font-bold">{tx(locale, ui.related)}</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {related.map((item) => (
                <article key={item.id} className="border-l-4 border-brand-primary bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold">{tx(locale, item.title)}</h3>
                  <p className="mt-3 text-sm leading-6">{tx(locale, item.situation)}</p>
                  <p className="mt-3 text-sm leading-6 text-brand-muted">{tx(locale, item.choice)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand locale={locale} />
    </MainLayout>
  )
}
