'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { RedactedSlideStage } from './redacted-case-showcase'

function l(locale: string, zh: string, en: string, tw?: string) {
  if (locale === 'en') return en
  if (locale === 'zh-TW') return tw || zh
  return zh
}

const SAMPLE_TV_CHANNELS = [
  { id: 'sky-sports-main-event', name: 'Sky Sports Main Event', country: 'UK', now: 'Premier League Live' },
  { id: 'tnt-sports-1', name: 'TNT Sports 1', country: 'UK', now: 'UEFA Champions League' },
  { id: 'espn', name: 'ESPN HD', country: 'US', now: 'NBA Primetime' },
  { id: 'fox-sports-1', name: 'FOX Sports 1', country: 'US', now: 'MLB Postseason' },
  { id: 'nba-tv', name: 'NBA TV', country: 'US', now: 'NBA GameTime Live' },
  { id: 'sky-sports-f1', name: 'Sky Sports F1', country: 'UK', now: 'Formula 1 Grand Prix' },
  { id: 'tsn-1', name: 'TSN 1', country: 'CA', now: 'NHL Hockey Night' },
  { id: 'astro-cricket', name: 'Astro Cricket', country: 'MY', now: 'ICC Test Cricket' },
]

type SlideDef = {
  no: string
  tabTitle: { zh: string; en: string; tw: string }
  whoYouAre: { zh: string; en: string; tw: string }
  productName: { zh: string; en: string; tw: string }
  productHref: string
  title: { zh: string; en: string; tw: string }
  beforeAfter: {
    before: { zh: string; en: string; tw: string }
    after: { zh: string; en: string; tw: string }
  }
  gains: { zh: string; en: string; tw: string }[]
  stageType: 'scores-shot' | 'player-shot' | 'mobile-app' | 'iptv-wall' | 'iptv-player' | 'obs-studio'
}

const SLIDES: SlideDef[] = [
  {
    no: '01',
    tabTitle: { zh: '即时比分网站', en: 'Live Scores Site', tw: '即時比分網站' },
    whoYouAre: {
      zh: '你正在做：足球 / 篮球即时比分网、赛程数据站',
      en: 'You run: A Football / Basketball Live Scores or Stats Site',
      tw: '你正在做：足球 / 籃球即時比分網、賽程資料站',
    },
    productName: { zh: '赛事直播线路', en: 'Live Match Lines', tw: '賽事直播線路' },
    productHref: '/products/streams',
    title: {
      zh: '不改原有赛程页，把纯比分站直接升级成赛事直播站',
      en: 'Turn Your Score Table into a Live Streaming Portal — Zero UI Rebuild',
      tw: '不改原有賽程頁，把純比分站直接升級成賽事直播站',
    },
    beforeAfter: {
      before: {
        zh: '只有文字比分，球迷看完比分就关网页去别处找直播',
        en: 'Text scores only — fans leave your site to find streams elsewhere',
        tw: '只有文字比分，球迷看完比分就關網頁去別處找直播',
      },
      after: {
        zh: '比赛开场自动亮起红色播放按钮，直接升级为视频直播门户',
        en: 'Active matches light up with red play buttons right on your fixture list',
        tw: '比賽開場自動亮起紅色播放按鈕，直接升級為視訊直播門戶',
      },
    },
    gains: [
      {
        zh: '不改你现有的赛程列表界面，自动挂载对应比赛信号',
        en: 'Keep your existing fixture table UI; streams attach automatically',
        tw: '不改你現有的賽程列表介面，自動掛載對應比賽訊號',
      },
      {
        zh: '覆盖足篮网板等 23+ 运动，热门与次级联赛全天有流',
        en: '23+ sports covered all day across major and secondary leagues',
        tw: '覆蓋足籃網板等 23+ 運動，熱門與次級聯賽全天有流',
      },
    ],
    stageType: 'scores-shot',
  },
  {
    no: '02',
    tabTitle: { zh: '赛事互动直播间', en: 'Match Broadcast Room', tw: '賽事互動直播間' },
    whoYouAre: {
      zh: '你正在做：带聊天室、球迷社区或专家方案的体育站',
      en: 'You run: A Sports Portal with Fan Chat or Match Rooms',
      tw: '你正在做：帶聊天室、球迷社群或專家方案的體育站',
    },
    productName: { zh: '赛事直播线路', en: 'Live Match Lines', tw: '賽事直播線路' },
    productHref: '/products/streams',
    title: {
      zh: '1080P 赛事画面内嵌播放，把球迷留在你的直播间边看边聊',
      en: 'Keep Fans Inside Your Match Room with Embedded 1080p Live Video',
      tw: '1080P 賽事畫面內嵌播放，把球迷留在你的直播間邊看邊聊',
    },
    beforeAfter: {
      before: {
        zh: '比赛页只有动画直播，留不住核心看球用户',
        en: 'Match trackers only — hard to retain live viewers',
        tw: '比賽頁只有動畫直播，留不住核心看球使用者',
      },
      after: {
        zh: '1080P 画面内嵌播放，单次停留时长提升至数十分钟',
        en: 'In-page 1080p video keeps fans chatting for the full match',
        tw: '1080P 畫面內嵌播放，單次停留時長提升至數十分鐘',
      },
    },
    gains: [
      {
        zh: '单场提供国际高清、聚合与无解说原声，支持观众一键切线',
        en: 'Multi-line per match (1080p HD, Web, Raw Audio) for instant switching',
        tw: '單場提供國際高清、聚合與無解說原聲，支援觀眾一鍵切線',
      },
      {
        zh: '播放器上方可自由叠加你自己的品牌水印与跑马灯横幅',
        en: 'Layer your own brand watermark and scrolling banners over the video',
        tw: '播放器上方可自由疊加你自己的品牌水印與跑馬燈橫幅',
      },
    ],
    stageType: 'player-shot',
  },
  {
    no: '03',
    tabTitle: { zh: '手机端体育 App', en: 'Mobile Sports App', tw: '手機端體育 App' },
    whoYouAre: {
      zh: '你正在做：面向东南亚 / 海外市场的 iOS、Android 或 H5 体育 App',
      en: 'You run: An iOS, Android, or H5 Sports App for Overseas Markets',
      tw: '你正在做：面向東南亞 / 海外市場的 iOS、Android 或 H5 體育 App',
    },
    productName: { zh: '赛事直播线路', en: 'Live Match Lines', tw: '賽事直播線路' },
    productHref: '/products/streams',
    title: {
      zh: '点开即播高清赛事，边看球边刷阵容数据与聊天室',
      en: 'Instant Mobile HD Playback Alongside Live Stats & Fan Chat',
      tw: '點開即播高清賽事，邊看球邊刷陣容資料與聊天室',
    },
    beforeAfter: {
      before: {
        zh: 'App 只有赛前资讯和比分推送，比赛日活跃度难变现',
        en: 'Pre-match news and push alerts only',
        tw: 'App 只有賽前資訊和比分推送，比賽日活躍度難變現',
      },
      after: {
        zh: '点开红色播放按钮秒播高清流，可选配多语种定制解说',
        en: 'Tap the red play button for mobile HD playback & localized audio',
        tw: '點開紅色播放按鈕秒播高清流，可選配多語種定制解說',
      },
    },
    gains: [
      {
        zh: '兼容 iOS、Android 原生播放器与手机网页，即点即播',
        en: 'Works seamlessly in native iOS/Android players and mobile web',
        tw: '相容 iOS、Android 原生播放器與手機網頁，即點即播',
      },
      {
        zh: '支持按实际运营球类勾选开通（如只开足球+篮球，或板球）',
        en: 'Subscribe only to the sports you operate to control costs',
        tw: '支援按實際營運球類勾選開通（如只開足球+籃球，或板球）',
      },
    ],
    stageType: 'mobile-app',
  },
  {
    no: '04',
    tabTitle: { zh: '海外体育频道站', en: 'Sports TV Directory', tw: '海外體育頻道站' },
    whoYouAre: {
      zh: '你正在做：面向欧美 / 亚太观众的体育电视台导航网',
      en: 'You run: A Sports TV Channel Portal for UK, US, or APAC Viewers',
      tw: '你正在做：面向歐美 / 亞太觀眾的體育電視台導航網',
    },
    productName: { zh: '全球体育频道', en: 'Global Sports Channels', tw: '全球體育頻道' },
    productHref: '/products/iptv',
    title: {
      zh: '一键接入 100+ 欧美主流体育台与豪门俱乐部频道',
      en: '100+ Flagship Sports Networks & Club Channels in One Integration',
      tw: '一鍵接入 100+ 歐美主流體育台與豪門俱樂部頻道',
    },
    beforeAfter: {
      before: {
        zh: '海外观众找不到熟悉的本地体育电视网（如 Sky / ESPN）',
        en: 'Overseas fans can’t find familiar networks like Sky or ESPN',
        tw: '海外觀眾找不到熟悉的本地體育電視網（如 Sky / ESPN）',
      },
      after: {
        zh: '百余个英美加澳新马体育台与每日节目单直接呈现',
        en: '100+ UK/US/CA/AU sports networks + daily EPG ready to watch',
        tw: '百餘個英美加澳新馬體育台與每日節目單直接呈現',
      },
    },
    gains: [
      {
        zh: '含 Sky Sports、ESPN、TNT Sports、NBA TV 及各大联赛球队台',
        en: 'Includes Sky Sports, ESPN, TNT Sports, NBA TV & team channels',
        tw: '含 Sky Sports、ESPN、TNT Sports、NBA TV 及各大聯賽球隊台',
      },
      {
        zh: '自带高清台标与每日节目表，观众可按节目单直接点进对应频道',
        en: 'Includes official logos and daily program guide for 1-click tune-in',
        tw: '自帶高清台標與每日節目表，觀眾可按節目單直接點進對應頻道',
      },
    ],
    stageType: 'iptv-wall',
  },
  {
    no: '05',
    tabTitle: { zh: 'OTT 电视盒子', en: 'OTT Box & Smart TV', tw: 'OTT 電視盒子' },
    whoYouAre: {
      zh: '你正在做：海外华人 / 英文区 OTT 电视盒子、智能电视直播应用',
      en: 'You run: An OTT Set-Top Box or Smart TV Live App',
      tw: '你正在做：海外華人 / 英文區 OTT 電視盒子、智慧電視直播應用',
    },
    productName: { zh: '全球体育频道', en: 'Global Sports Channels', tw: '全球體育頻道' },
    productHref: '/products/iptv',
    title: {
      zh: '24/7 全天候稳定播出，还原有线电视大屏换台体验',
      en: '24/7 Uninterrupted Linear TV Built for Big-Screen Channel Surfing',
      tw: '24/7 全天候穩定播出，還原有線電視大屏換台體驗',
    },
    beforeAfter: {
      before: {
        zh: '单场链接比赛结束就断流黑屏，不适合电视端整晚挂机',
        en: 'Single-match links go dark after the final whistle',
        tw: '單場連結比賽結束就斷流黑屏，不適合電視端整晚掛機',
      },
      after: {
        zh: '正赛、演播室预热与赛后复盘 24 小时全天不间断播出',
        en: '24/7 linear channels air live games, studio shows & replays',
        tw: '正賽、演播室預熱與賽後復盤 24 小時全天不間斷播出',
      },
    },
    gains: [
      {
        zh: '高稳定度线性频道信号，专为电视大屏长时间连续观看设计',
        en: 'High-stability linear feeds built for long-session TV viewing',
        tw: '高穩定度線性頻道訊號，專為電視大屏長時間連續觀看設計',
      },
      {
        zh: '同步返回当前播出与下节预告，还原纯正有线电视换台体验',
        en: 'Now / Next program metadata for an authentic cable TV feel',
        tw: '同步回傳目前播出與下節預告，還原純正有線電視換台體驗',
      },
    ],
    stageType: 'iptv-player',
  },
  {
    no: '06',
    tabTitle: { zh: '足篮主播工作室', en: 'Streamer Studio', tw: '足籃主播工作室' },
    whoYouAre: {
      zh: '你正在做：足球 / 篮球主播解说团队、短视频与直播间二创工作室',
      en: 'You run: A Football & Basketball Live Commentary Studio',
      tw: '你正在做：足球 / 籃球主播解說團隊、短視訊與直播間二創工作室',
    },
    productName: { zh: 'OBS 直播流机器人', en: 'OBS Streamer Bot', tw: 'OBS 直播流機器人' },
    productHref: '/products/assistant',
    title: {
      zh: '零代码对接：群内发指令秒拿清流，贴进 OBS 即刻开播',
      en: 'Zero-Code Setup: Pull Clean Feeds in Chat & Go Live in OBS',
      tw: '零程式碼對接：群內發指令秒拿清流，貼進 OBS 即刻開播',
    },
    beforeAfter: {
      before: {
        zh: '团队没技术对接接口，主播到处找盗播源既模糊又容易断',
        en: 'No devs for APIs; hosts rely on unstable, low-res scraped streams',
        tw: '團隊沒技術對接介面，主播到處找盜播源既模糊又容易斷',
      },
      after: {
        zh: 'Telegram / Lark 群发数字秒拿高清卫星源与无解说原声',
        en: 'Reply with match # in Telegram/Lark for 1080p Satellite & Raw audio',
        tw: 'Telegram / Lark 群發數字秒拿高清衛星源與無解說原聲',
      },
    },
    gains: [
      {
        zh: '目前专注足球与篮球，提供低延迟「卫星源」与无解说「赛场原声」',
        en: 'Focused on football & basketball with Satellite HD and clean Raw audio',
        tw: '目前專注足球與籃球，提供低延遲「衛星源」與無解說「賽場原聲」',
      },
      {
        zh: '粘贴进 OBS「媒体源」5–10 秒出画面，主播直接叠加麦克风开播',
        en: 'Loads in OBS Media Source in 5–10s — layer your mic and go live',
        tw: '貼進 OBS「媒體源」5–10 秒出畫面，主播直接疊加麥克風開播',
      },
    ],
    stageType: 'obs-studio',
  },
]

export default function CasesPptDeck({ locale }: { locale: string }) {
  const [index, setIndex] = useState(0)
  const slide = SLIDES[index]
  const total = SLIDES.length

  const prev = () => setIndex((i) => (i - 1 + total) % total)
  const next = () => setIndex((i) => (i + 1) % total)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + total) % total)
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % total)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [total])

  return (
    <div className="space-y-4">
      {/* 1. Single Clean Customer Role Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-2 border-brand-ink bg-white px-3.5 py-2.5 shadow-[4px_4px_0_0_#141414] lg:flex-nowrap">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 hidden text-xs font-bold text-brand-muted xl:inline">
            {l(locale, '选择你的产品类型：', 'Product Type:', '選擇你的產品類型：')}
          </span>
          {SLIDES.map((s, idx) => {
            const active = idx === index
            return (
              <button
                key={s.no}
                type="button"
                onClick={() => setIndex(idx)}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold transition-all ${
                  active
                    ? 'bg-brand-primary text-white shadow-[2px_2px_0_0_#141414]'
                    : 'bg-brand-paper text-brand-ink hover:bg-brand-tint hover:text-brand-primary'
                }`}
              >
                <span className="font-mono text-[11px] opacity-80">{s.no}</span>
                <span>{l(locale, s.tabTitle.zh, s.tabTitle.en, s.tabTitle.tw)}</span>
              </button>
            )
          })}
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={prev}
            className="border border-brand-ink bg-white px-2.5 py-1 font-mono text-xs font-bold text-brand-ink hover:bg-brand-ink hover:text-white"
            title="←"
          >
            ←
          </button>
          <span className="px-1.5 font-mono text-xs font-bold text-brand-ink">
            {slide.no} / 0{total}
          </span>
          <button
            type="button"
            onClick={next}
            className="bg-brand-ink px-2.5 py-1 font-mono text-xs font-bold text-white hover:bg-brand-primary"
            title="→"
          >
            →
          </button>
        </div>
      </div>

      {/* 2. Keynote / PPT Main Stage — Uniform Height Without Clipping */}
      <div className="relative overflow-hidden border-2 border-brand-ink bg-[#12141c] text-white shadow-[8px_8px_0_0_#FC0078]">
        {/* Progress Strip */}
        <div className="h-1 w-full bg-white/10">
          <div
            className="h-full bg-brand-primary transition-all duration-300"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>

        <div className="grid items-center gap-8 p-6 sm:p-9 lg:min-h-[32.5rem] lg:grid-cols-12">
          {/* Left Column (5 cols): Instant Self-Identification + Before/After + 2 Key Gains */}
          <div className="flex flex-col justify-between space-y-4 lg:col-span-5">
            <div>
              {/* Target Customer Badge — Instant Recognition */}
              <div className="inline-flex items-center gap-2 border border-brand-primary/50 bg-brand-primary/15 px-3 py-1 text-xs font-bold text-brand-light">
                <span className="h-2 w-2 rounded-full bg-brand-primary" />
                <span>{l(locale, slide.whoYouAre.zh, slide.whoYouAre.en, slide.whoYouAre.tw)}</span>
              </div>

              <h2 className="mt-3 text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl xl:text-[1.65rem]">
                {l(locale, slide.title.zh, slide.title.en, slide.title.tw)}
              </h2>
            </div>

            {/* Before vs After Contrast Box */}
            <div className="overflow-hidden rounded-lg border border-white/15 bg-white/[0.03] text-xs">
              <div className="border-b border-white/10 px-3.5 py-2.5 text-white/60">
                <span className="mr-2 rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white/70">
                  BEFORE
                </span>
                {l(locale, slide.beforeAfter.before.zh, slide.beforeAfter.before.en, slide.beforeAfter.before.tw)}
              </div>
              <div className="bg-emerald-500/10 px-3.5 py-2.5 font-semibold text-emerald-300">
                <span className="mr-2 rounded bg-emerald-500 px-1.5 py-0.5 font-mono text-[10px] font-bold text-black">
                  AFTER
                </span>
                {l(locale, slide.beforeAfter.after.zh, slide.beforeAfter.after.en, slide.beforeAfter.after.tw)}
              </div>
            </div>

            {/* 2 Punchy Core Capabilities */}
            <div className="space-y-2">
              {slide.gains.map((g, gIdx) => (
                <div key={gIdx} className="flex items-start gap-2.5 text-xs font-medium leading-5 text-white/90 sm:text-sm">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-primary text-[10px] font-bold text-white">
                    ✓
                  </span>
                  <span>{l(locale, g.zh, g.en, g.tw)}</span>
                </div>
              ))}
            </div>

            {/* Action Bar — Both buttons side-by-side & never clipped */}
            <div className="flex flex-wrap items-center gap-2.5 border-t border-white/10 pt-4">
              <Link
                href={`/${locale}/contact`}
                className="bg-brand-primary px-4 py-2 text-xs font-bold text-white shadow-[3px_3px_0_0_#ffffff] transition-colors hover:bg-brand-dark"
              >
                {l(locale, '我是这类客户，获取报价与测试 →', 'Get Quote & Trial →', '我是這類客戶，取得報價與測試 →')}
              </Link>
              <Link
                href={`/${locale}${slide.productHref}`}
                className="border border-white/25 px-3.5 py-2 text-xs font-bold text-white/85 hover:border-white hover:bg-white/10"
              >
                {l(locale, slide.productName.zh, slide.productName.en, slide.productName.tw)} →
              </Link>
            </div>
          </div>

          {/* Right Column (7 cols): Uniform Fixed-Height Visual Stage (h-[22rem] sm:h-[25rem] + caption) */}
          <div className="lg:col-span-7">
            {slide.stageType === 'scores-shot' && (
              <RedactedSlideStage
                kind="scores"
                locale={locale}
                caption={l(
                  locale,
                  '▲ 客户实拍图（已脱敏）：即时比分列表自动点亮红色「▶ 播放」按钮',
                  '▲ Redacted Customer Screenshot: Live Fixtures with Automatic Red Play Buttons',
                  '▲ 客戶實拍圖（已脫敏）：即時比分列表自動點亮紅色「▶ 播放」按鈕'
                )}
              />
            )}

            {slide.stageType === 'player-shot' && (
              <RedactedSlideStage
                kind="player"
                locale={locale}
                caption={l(
                  locale,
                  '▲ 客户实拍图（已脱敏）：单场比赛内嵌 1080P 播放器、多线路切换与球迷聊天室',
                  '▲ Redacted Customer Screenshot: In-Page 1080p Match Player, Multi-Line Switcher & Fan Chat',
                  '▲ 客戶實拍圖（已脫敏）：單場比賽內嵌 1080P 播放器、多線路切換與球迷聊天室'
                )}
              />
            )}

            {slide.stageType === 'mobile-app' && (
              <div className="flex h-full flex-col justify-between">
                <div className="grid h-[22rem] items-center gap-4 overflow-hidden rounded-lg border border-white/15 bg-[#0b0d12] p-4 shadow-2xl sm:h-[25rem] sm:grid-cols-2">
                  {/* Phone 1: Mobile Live Score List */}
                  <div className="mx-auto flex h-full w-full max-w-[16.5rem] flex-col justify-between overflow-hidden rounded-2xl border-2 border-white/20 bg-[#141824] shadow-lg">
                    <div className="flex items-center justify-between bg-[#1c2233] px-3.5 py-2 text-[11px]">
                      <span className="font-bold text-white">SPORTS APP · {l(locale, '比分', 'SCORES', '比分')}</span>
                      <span className="rounded bg-rose-600 px-1.5 py-0.5 text-[9px] font-bold">▶ LIVE 18</span>
                    </div>
                    <div className="flex-1 space-y-2 overflow-hidden p-2.5 text-[11px]">
                      {[
                        { lg: l(locale, '英超 · 第12轮', 'Premier League · R12'), t: "67'", h: l(locale, '阿森纳', 'Arsenal'), a: l(locale, '利物浦', 'Liverpool'), s: '2 - 1' },
                        { lg: l(locale, 'NBA · 常规赛', 'NBA · Regular'), t: 'Q4 02:15', h: l(locale, '马刺', 'Spurs'), a: l(locale, '独行侠', 'Mavericks'), s: '112 - 111' },
                        { lg: l(locale, '欧冠 · 小组赛', 'UCL · Group'), t: "34'", h: l(locale, '皇家马德里', 'Real Madrid'), a: l(locale, 'AC米兰', 'AC Milan'), s: '1 - 1' },
                      ].map((m, i) => (
                        <div key={i} className="rounded-lg border border-white/10 bg-white/[0.04] p-2">
                          <div className="flex items-center justify-between text-[10px] text-white/60">
                            <span>{m.lg}</span>
                            <span className="font-bold text-emerald-400">● {m.t}</span>
                          </div>
                          <div className="mt-1 flex items-center justify-between font-bold text-white">
                            <span>{m.h}</span>
                            <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-white">
                              {m.s}
                            </span>
                            <span>{m.a}</span>
                          </div>
                          <div className="mt-1.5 flex items-center justify-between border-t border-white/10 pt-1 text-[10px]">
                            <span className="text-white/50">1080P · Raw Audio</span>
                            <span className="inline-flex items-center gap-1 rounded bg-rose-600 px-2 py-0.5 font-bold text-white">
                              ▶ {l(locale, '看直播', 'LIVE', '看直播')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Phone 2: Mobile Match Player View */}
                  <div className="mx-auto flex h-full w-full max-w-[16.5rem] flex-col justify-between overflow-hidden rounded-2xl border-2 border-brand-primary/60 bg-[#141824] shadow-lg">
                    <div className="relative h-36 shrink-0 bg-black">
                      <img
                        src="/match-player-preview.jpg"
                        alt="Mobile Match Player"
                        className="h-full w-full object-cover opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />
                      <div className="absolute left-2.5 right-2.5 top-2 flex items-center justify-between text-[10px]">
                        <span className="rounded bg-rose-600 px-1.5 py-0.5 font-bold">▶ LIVE 1080P</span>
                        <span className="rounded bg-black/60 px-1.5 py-0.5 font-mono">2 - 1</span>
                      </div>
                      <div className="absolute bottom-2 left-2.5 right-2.5 flex gap-1 text-[9px]">
                        <span className="rounded bg-rose-600 px-2 py-0.5 font-bold">▶ Global HD</span>
                        <span className="rounded bg-black/70 px-2 py-0.5 text-white/80">Web</span>
                        <span className="rounded bg-black/70 px-2 py-0.5 text-white/80">Raw Audio</span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-2.5 text-[11px]">
                      <div>
                        <div className="flex border-b border-white/10 pb-1.5 font-bold">
                          <span className="border-b-2 border-brand-primary pb-1 text-brand-light">
                            {l(locale, '聊天室 (1,420)', 'Live Chat (1,420)', '聊天室 (1,420)')}
                          </span>
                          <span className="ml-3 text-white/50">{l(locale, '阵容', 'Lineups', '陣容')}</span>
                          <span className="ml-3 text-white/50">{l(locale, '统计', 'Stats', '統計')}</span>
                        </div>
                        <div className="mt-2 space-y-1.5 text-[10px] text-white/80">
                          <p><span className="text-sky-400">Fan #12:</span> {l(locale, '国际高清这条线真清楚，一点不卡', 'Global HD 1080p is crystal clear!')}</p>
                          <p><span className="text-emerald-400">Fan #48:</span> {l(locale, '萨卡这球漂亮！', 'What a finish by Saka!')}</p>
                          <p><span className="text-amber-300">Fan #89:</span> {l(locale, '切到赛场原声听球场欢呼太爽了', 'Raw stadium audio feels like being there')}</p>
                        </div>
                      </div>
                      <div className="rounded-full bg-white/10 px-3 py-1 text-[10px] text-white/50">
                        {l(locale, '发弹幕参与本场讨论...', 'Send a message to the match room...')}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-2.5 text-center text-xs text-white/60">
                  {l(
                    locale,
                    '▲ 移动端体育 App：左屏赛程点亮红色播放按钮 → 右屏上半屏看 1080P 直播、下半屏聊球看数据',
                    '▲ Mobile Sports App: Red Play Buttons on Fixtures → Split-Screen 1080p Player & Fan Chat',
                    '▲ 行動端體育 App：左屏賽程點亮紅色播放按鈕 → 右屏上半屏看 1080P 直播、下半屏聊球看資料'
                  )}
                </p>
              </div>
            )}

            {slide.stageType === 'iptv-wall' && (
              <div className="flex h-full flex-col justify-between">
                <div className="flex h-[22rem] flex-col justify-between overflow-hidden rounded-lg border border-white/15 bg-[#0b0d12] p-5 shadow-2xl sm:h-[25rem]">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-brand-primary" />
                      <span className="font-bold tracking-wide">GLOBAL SPORTS TV DIRECTORY</span>
                      <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-white/75">
                        UK · US · CA · AU · NZ · MY
                      </span>
                    </div>
                    <div className="flex gap-1.5 text-[10px]">
                      <span className="rounded bg-brand-primary px-2.5 py-0.5 font-bold">Linear TV</span>
                      <span className="rounded bg-white/10 px-2.5 py-0.5 text-white/75">Team Channels</span>
                      <span className="rounded bg-white/10 px-2.5 py-0.5 text-white/75">Daily EPG</span>
                    </div>
                  </div>

                  <div className="my-auto grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {SAMPLE_TV_CHANNELS.map((ch, idx) => (
                      <div
                        key={ch.id}
                        className={`flex flex-col justify-between rounded-lg border p-3 ${
                          idx === 0
                            ? 'border-brand-primary bg-white/10 ring-1 ring-brand-primary'
                            : 'border-white/10 bg-white/[0.04]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="rounded bg-black/50 px-1.5 py-0.5 font-mono text-[10px] text-white/70">
                            {ch.country}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded bg-rose-600 px-1.5 py-0.5 text-[9px] font-bold text-white">
                            ▶ LIVE
                          </span>
                        </div>
                        <div className="my-2.5 flex h-11 items-center justify-center rounded bg-white p-2">
                          <img
                            src={`/iptv-logos/${ch.id}.png`}
                            alt={ch.name}
                            className="max-h-7 w-auto object-contain"
                          />
                        </div>
                        <div>
                          <p className="truncate text-xs font-bold text-white">{ch.name}</p>
                          <p className="mt-0.5 truncate text-[10px] text-white/60">{ch.now}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="mt-2.5 text-center text-xs text-white/60">
                  {l(
                    locale,
                    '▲ 客户频道导航墙界面：直接展示 Sky Sports、ESPN、TNT Sports、NBA TV 等百余个电视台与实时节目',
                    '▲ Customer Channel Wall: 100+ Linear Sports Networks & Official Team Channels',
                    '▲ 客戶頻道導航牆介面：直接展示 Sky Sports、ESPN、TNT Sports、NBA TV 等百餘個電視台與即時節目'
                  )}
                </p>
              </div>
            )}

            {slide.stageType === 'iptv-player' && (
              <div className="flex h-full flex-col justify-between">
                <div className="relative h-[22rem] overflow-hidden rounded-lg border border-white/15 bg-black shadow-2xl sm:h-[25rem]">
                  <img
                    src="/match-player-preview.jpg"
                    alt="24/7 Sports TV Broadcast"
                    className="h-full w-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/65" />

                  <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 rounded-lg bg-black/75 px-3.5 py-2 backdrop-blur-sm">
                      <div className="flex h-7 w-14 items-center justify-center rounded bg-white p-1">
                        <img
                          src="/iptv-logos/sky-sports-main-event.png"
                          alt="Sky Sports"
                          className="max-h-5 w-auto object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold sm:text-sm">CH 01 · Sky Sports Main Event HD</p>
                        <p className="text-[10px] text-emerald-400">● 24/7 Linear Broadcast · UK</p>
                      </div>
                    </div>
                    <span className="rounded bg-rose-600 px-3 py-1 font-mono text-xs font-bold">
                      ▶ 1080P · 24/7 LIVE
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/15 bg-black/80 p-3.5 backdrop-blur-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                      <div>
                        <span className="rounded bg-rose-600 px-2 py-0.5 text-[11px] font-bold text-white">
                          ▶ ON AIR NOW
                        </span>
                        <span className="ml-2.5 font-bold">Premier League Live: Arsenal vs Liverpool</span>
                      </div>
                      <span className="font-mono text-xs text-white/70">19:30 - 22:00</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2 text-xs text-white/65">
                      <span>UP NEXT：Monday Night Football Post-Match Studio</span>
                      <span className="font-bold text-brand-light">
                        {l(locale, '遥控器 / 列表一键换台 →', 'Instant Channel Switch →', '遙控器 / 列表一鍵換台 →')}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-2.5 text-center text-xs text-white/60">
                  {l(
                    locale,
                    '▲ 客户大屏与电视端播放页：带台标与当前/下节节目预告，24 小时不间断播出',
                    '▲ 24/7 Linear TV Player with Now/Next Program Guide Overlay',
                    '▲ 客戶大屏與電視端播放頁：帶台標與目前/下節節目預告，24 小時不間斷播出'
                  )}
                </p>
              </div>
            )}

            {slide.stageType === 'obs-studio' && (
              <div className="flex h-full flex-col justify-between">
                <div className="grid h-[22rem] gap-4 overflow-hidden rounded-lg border border-white/15 bg-[#0b0d12] p-4 shadow-2xl sm:h-[25rem] sm:grid-cols-12">
                  {/* Left: Telegram/Lark Group Chat (5 cols) */}
                  <div className="flex h-full flex-col justify-between rounded-lg border border-white/10 bg-[#0E1621] p-3.5 text-xs sm:col-span-5">
                    <div className="border-b border-white/10 pb-2">
                      <p className="font-bold text-white">🤖 Telegram / Lark Bot Group</p>
                      <p className="text-[10px] text-emerald-400">● Football & Basketball Fixtures</p>
                    </div>

                    <div className="my-auto space-y-2 text-[11px]">
                      <div className="flex justify-end">
                        <span className="rounded bg-[#2B5278] px-2.5 py-1 font-mono font-bold">666</span>
                      </div>
                      <div className="rounded bg-[#182533] p-2 text-[10px] leading-4 text-white/90">
                        <p className="font-bold text-emerald-400">🛰️ Satellite + Raw Audio</p>
                        <p>1. [EPL] Arsenal vs Liverpool</p>
                        <p>2. [NBA] Spurs vs Mavericks</p>
                      </div>
                      <div className="flex justify-end">
                        <span className="rounded bg-[#2B5278] px-2.5 py-1 font-mono font-bold">1</span>
                      </div>
                      <div className="rounded border border-brand-primary/40 bg-[#182533] p-2 font-mono text-[10px]">
                        <p className="font-sans font-bold text-white">🏆 EPL · Arsenal vs Liverpool</p>
                        <p className="mt-1 text-emerald-300">🛰️ Satellite: http://obs1.../9oAH</p>
                        <p className="text-rose-300">🎙️ Raw Audio: http://obs1.../Q4BA</p>
                      </div>
                    </div>

                    <p className="text-[10px] text-white/50">
                      {l(locale, '1. 群内发序号拿到专属流地址', '1. Reply match # for OBS stream URLs')}
                    </p>
                  </div>

                  {/* Right: OBS Studio Broadcast Window (7 cols) */}
                  <div className="flex h-full flex-col justify-between rounded-lg border border-white/10 bg-[#1e1f26] p-3.5 sm:col-span-7">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-white">🎥 OBS Studio · Streamer Desk</span>
                      <span className="rounded bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white">
                        ▶ LIVE 60fps
                      </span>
                    </div>

                    <div className="relative my-2 flex-1 overflow-hidden rounded border border-white/15 bg-black">
                      <img
                        src="/match-player-preview.jpg"
                        alt="OBS Preview"
                        className="h-full w-full object-cover opacity-90"
                      />
                      <div className="absolute left-2 top-2 rounded bg-black/75 px-2 py-0.5 font-mono text-[9px] text-emerald-400">
                        OBS Media Source · 1920×1080
                      </div>
                      <div className="absolute bottom-2 right-2 rounded bg-rose-600 px-2 py-0.5 text-[10px] font-bold">
                        🎙️ Host Mic Commentary Active
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div className="rounded bg-[#272932] p-2">
                        <p className="text-white/60">Sources</p>
                        <p className="mt-0.5 truncate font-bold text-brand-light">🎬 Media Source: Raw Feed</p>
                      </div>
                      <div className="rounded bg-[#272932] p-2">
                        <p className="text-white/60">Audio Mixer</p>
                        <p className="mt-0.5 truncate font-bold text-emerald-400">🎙️ Host Mic + 🏟️ Stadium</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-2.5 text-center text-xs text-white/60">
                  {l(
                    locale,
                    '▲ 主播工作室开播流程：左图 Telegram/Lark 群发数字拿流 → 右图粘贴到 OBS 媒体源配音开播',
                    '▲ Streamer Studio Workflow: Pull Link in Telegram/Lark → Add as OBS Media Source & Call the Game',
                    '▲ 主播工作室開播流程：左圖 Telegram/Lark 群發數字拿流 → 右圖貼到 OBS 媒體源配音開播'
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
