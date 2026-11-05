'use client'

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

export function IptvCaseVisuals({ locale }: { locale: string }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* Visual 01: 24/7 TV Channel Wall & EPG Guide */}
      <div className="flex flex-col overflow-hidden border border-brand-line bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-brand-line bg-brand-paper/60 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="bg-brand-primary px-2 py-0.5 font-mono text-[10px] font-bold text-white">
              画面 01
            </span>
            <h4 className="text-xs font-bold text-brand-ink sm:text-sm">
              {l(
                locale,
                '24 小时体育电视频道墙与节目单（客户产品界面）',
                '24/7 Sports TV Channel Wall & Program Guide',
                '24 小時體育電視頻道牆與節目單（客戶產品介面）'
              )}
            </h4>
          </div>
          <span className="font-mono text-[11px] text-brand-muted">100+ Channels</span>
        </div>

        {/* Simulated OTT / Web TV Channel Wall */}
        <div className="flex aspect-[16/9] flex-col justify-between bg-[#0f131a] p-4 text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-primary" />
              <span className="font-bold tracking-wide">SPORTS TV GUIDE</span>
              <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-white/75">UK · US · CA · AU</span>
            </div>
            <div className="flex gap-1.5 text-[10px]">
              <span className="rounded bg-brand-primary px-2 py-0.5 font-bold">All Networks</span>
              <span className="rounded bg-white/10 px-2 py-0.5 text-white/70">Team Channels</span>
              <span className="rounded bg-white/10 px-2 py-0.5 text-white/70">Program Guide</span>
            </div>
          </div>

          <div className="my-auto grid grid-cols-4 gap-2.5 py-2">
            {SAMPLE_TV_CHANNELS.map((ch, idx) => (
              <div
                key={ch.id}
                className={`flex flex-col justify-between rounded border p-2.5 ${
                  idx === 0
                    ? 'border-brand-primary bg-white/10 ring-1 ring-brand-primary'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded bg-black/40 px-1.5 py-0.5 font-mono text-[9px] text-white/70">
                    {ch.country}
                  </span>
                  <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    24/7
                  </span>
                </div>
                <div className="my-2 flex h-9 items-center justify-center rounded bg-white p-1.5">
                  <img
                    src={`/iptv-logos/${ch.id}.png`}
                    alt={ch.name}
                    className="max-h-6 w-auto object-contain"
                  />
                </div>
                <div>
                  <p className="truncate text-[10px] font-bold text-white">{ch.name}</p>
                  <p className="truncate text-[9px] text-white/55">{ch.now}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-white/60">
            <span>正在播出：Sky Sports Main Event · 英超超级星期天</span>
            <span className="text-emerald-400">● 点击任意频道即刻换台播放</span>
          </div>
        </div>

        <p className="px-4 py-3 text-xs leading-5 text-brand-muted">
          {l(
            locale,
            '把 Sky Sports、ESPN、TNT Sports、NBA TV 等百余个海外主流体育台和球队台直接装进你的网站、App 或电视盒子里。',
            'Bring 100+ overseas sports networks (Sky Sports, ESPN, TNT Sports, NBA TV) and team channels into your app or OTT box.',
            '把 Sky Sports、ESPN、TNT Sports、NBA TV 等百餘個海外主流體育台和球隊台直接裝進你的網站、App 或電視盒子裡。'
          )}
        </p>
      </div>

      {/* Visual 02: 24/7 Channel Live Player Screen */}
      <div className="flex flex-col overflow-hidden border border-brand-line bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-brand-line bg-brand-paper/60 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="bg-brand-primary px-2 py-0.5 font-mono text-[10px] font-bold text-white">
              画面 02
            </span>
            <h4 className="text-xs font-bold text-brand-ink sm:text-sm">
              {l(
                locale,
                '频道全天候播放页：观众像看有线电视一样随时换台',
                'Continuous Channel Player: Instant Zapping Like Cable TV',
                '頻道全天候播放頁：觀眾像看有線電視一樣隨時換台'
              )}
            </h4>
          </div>
          <span className="font-mono text-[11px] text-emerald-600">● 24/7 ON AIR</span>
        </div>

        <div className="relative aspect-[16/9] overflow-hidden bg-black text-white">
          <img
            src="/match-player-preview.jpg"
            alt="24/7 Sports Channel Live"
            className="h-full w-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/65" />

          {/* Top Channel OSD Bar */}
          <div className="absolute left-3.5 right-3.5 top-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5 rounded bg-black/75 px-3 py-1.5 backdrop-blur-sm">
              <div className="flex h-6 w-12 items-center justify-center rounded bg-white p-1">
                <img src="/iptv-logos/sky-sports-main-event.png" alt="Sky Sports" className="max-h-4 w-auto object-contain" />
              </div>
              <div>
                <p className="text-xs font-bold">CH 01 · Sky Sports Main Event HD</p>
                <p className="text-[10px] text-white/70">LIVE · 24/7 Linear Broadcast</p>
              </div>
            </div>
            <span className="rounded bg-brand-primary px-2.5 py-1 font-mono text-[10px] font-bold">
              1080P · 稳定频道流
            </span>
          </div>

          {/* Bottom EPG Now / Next Overlay */}
          <div className="absolute bottom-3 left-3.5 right-3.5 rounded border border-white/15 bg-black/80 p-3 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
                  正在播出 NOW
                </span>
                <span className="ml-2 font-bold">Premier League Live: Arsenal vs Liverpool</span>
              </div>
              <span className="font-mono text-[11px] text-white/70">19:30 - 22:00</span>
            </div>
            <div className="mt-1.5 flex items-center justify-between border-t border-white/10 pt-1.5 text-[11px] text-white/65">
              <span>即将播出 NEXT：Monday Night Football Tactical Analysis</span>
              <span className="text-brand-light">切换其他体育台 →</span>
            </div>
          </div>
        </div>

        <p className="px-4 py-3 text-xs leading-5 text-brand-muted">
          {l(
            locale,
            '不仅有单场比赛，赛前预热、中场演播室解说与赛后复盘全天不间断播出，满足习惯挂机看电视的海外球迷。',
            'Beyond live matches, pre-game studio shows, halftime analysis, and post-match wrap-ups air 24/7 for overseas fans.',
            '不僅有單場比賽，賽前預熱、中場演播室解說與賽後復盤全天不間斷播出，滿足習慣掛機看電視的海外球迷。'
          )}
        </p>
      </div>
    </div>
  )
}

export function AssistantBotCaseVisuals({ locale }: { locale: string }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* Visual 01: Telegram / Lark Bot Chat Pulling Stream */}
      <div className="flex flex-col overflow-hidden border border-brand-line bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-brand-line bg-brand-paper/60 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="bg-brand-primary px-2 py-0.5 font-mono text-[10px] font-bold text-white">
              画面 01
            </span>
            <h4 className="text-xs font-bold text-brand-ink sm:text-sm">
              {l(
                locale,
                'Telegram / Lark 专属群：发 666 查赛程，发序号秒拿流',
                'Telegram / Lark Group: Send 666 for Schedule, Reply # for Links',
                'Telegram / Lark 專屬群：發 666 查賽程，發序號秒拿流'
              )}
            </h4>
          </div>
          <span className="font-mono text-[11px] text-brand-muted">0 代码取流</span>
        </div>

        <div className="flex aspect-[16/9] flex-col justify-between bg-[#0E1621] p-4 text-xs text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-bold text-white">🤖 赛事直播机器人专属群 (Telegram / Lark)</span>
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
              足篮赛程在线
            </span>
          </div>

          <div className="my-auto space-y-2.5 py-2">
            <div className="flex justify-end">
              <div className="rounded-lg rounded-br-none bg-[#2B5278] px-3 py-1.5 text-[11px]">
                <span className="font-mono font-bold">666</span>
                <span className="ml-2 text-[9px] text-white/60">主播阿杰 19:40</span>
              </div>
            </div>

            <div className="max-w-[92%] rounded-lg rounded-bl-none bg-[#182533] p-2.5 text-[11px] leading-5">
              <p className="font-bold text-emerald-400">🛰️ 卫星源 + 赛场原声（稳定主力 · 足球/篮球）</p>
              <p className="font-mono text-white/90">1. [英超] 20:30 阿森纳 VS 利物浦</p>
              <p className="font-mono text-white/90">2. [NBA] 21:00 马刺 VS 独行侠</p>
            </div>

            <div className="flex justify-end">
              <div className="rounded-lg rounded-br-none bg-[#2B5278] px-3 py-1.5 text-[11px]">
                <span className="font-mono font-bold">1</span>
                <span className="ml-2 text-[9px] text-white/60">主播阿杰 20:05</span>
              </div>
            </div>

            <div className="max-w-[92%] rounded-lg rounded-bl-none border border-brand-primary/40 bg-[#182533] p-2.5 text-[11px]">
              <p className="font-bold text-white">🏆 英超 · 阿森纳 vs 利物浦</p>
              <p className="mt-1 font-mono text-[10px] text-emerald-300">
                🛰️ 卫星源(稳定)：http://obs1.../9oAH0g
              </p>
              <p className="font-mono text-[10px] text-rose-300">
                🎙️ 赛场原声(无解说)：http://obs1.../Q4BAEH
              </p>
            </div>
          </div>
        </div>

        <p className="px-4 py-3 text-xs leading-5 text-brand-muted">
          {l(
            locale,
            '工作室不需要雇程序员写接口，主播在群里发数字就能拿到当晚足篮比赛的高清卫星源与无解说赛场原声。',
            'No developers needed — hosts simply send match numbers in the group to get stable Satellite and clean Raw stadium audio links.',
            '工作室不需要雇工程師寫介面，主播在群裡發數字就能拿到當晚足籃比賽的高清衛星源與無解說賽場原聲。'
          )}
        </p>
      </div>

      {/* Visual 02: OBS Studio Media Source Live Commentary */}
      <div className="flex flex-col overflow-hidden border border-brand-line bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-brand-line bg-brand-paper/60 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="bg-brand-primary px-2 py-0.5 font-mono text-[10px] font-bold text-white">
              画面 02
            </span>
            <h4 className="text-xs font-bold text-brand-ink sm:text-sm">
              {l(
                locale,
                'OBS Studio 媒体源：5–10 秒出画面，叠加主播麦克风开播',
                'OBS Studio Media Source: Layer Host Mic & Stream Live',
                'OBS Studio 媒體源：5–10 秒出畫面，疊加主播麥克風開播'
              )}
            </h4>
          </div>
          <span className="font-mono text-[11px] text-emerald-600">● OBS LIVE</span>
        </div>

        <div className="flex aspect-[16/9] flex-col justify-between bg-[#1e1f26] p-3 text-white">
          {/* OBS Top Preview Monitor */}
          <div className="relative flex-1 overflow-hidden border border-white/15 bg-black">
            <img
              src="/match-player-preview.jpg"
              alt="OBS Studio Preview"
              className="h-full w-full object-cover opacity-90"
            />
            <div className="absolute left-2.5 top-2 rounded bg-black/75 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
              OBS 媒体源 (Media Source) · 1920×1080 60fps
            </div>
            <div className="absolute bottom-2 right-2.5 rounded bg-brand-primary px-2.5 py-1 text-[10px] font-bold text-white shadow">
              🎙️ 主播阿杰解说音轨叠加中
            </div>
          </div>

          {/* OBS Bottom Docks (Sources + Audio Mixer + Controls) */}
          <div className="mt-2.5 grid grid-cols-3 gap-2 text-[10px]">
            <div className="rounded border border-white/10 bg-[#272932] p-2">
              <p className="font-bold text-white/70">来源 (Sources)</p>
              <p className="mt-1 truncate rounded bg-brand-primary/25 px-1.5 py-0.5 font-mono text-brand-light">
                🎬 媒体源: 赛场原声流
              </p>
              <p className="mt-0.5 truncate px-1.5 text-white/70">🖼️ 直播间比分挂件</p>
            </div>

            <div className="rounded border border-white/10 bg-[#272932] p-2">
              <p className="font-bold text-white/70">混音器 (Audio Mixer)</p>
              <div className="mt-1">
                <div className="flex justify-between text-[9px]">
                  <span>🎙️ 主播麦克风</span>
                  <span className="text-emerald-400">-3 dB</span>
                </div>
                <div className="mt-0.5 h-1.5 w-full rounded bg-black/40">
                  <div className="h-1.5 w-4/5 rounded bg-emerald-400" />
                </div>
              </div>
              <div className="mt-1.5">
                <div className="flex justify-between text-[9px]">
                  <span>🏟️ 赛场原声 (无解说)</span>
                  <span className="text-sky-400">-12 dB</span>
                </div>
                <div className="mt-0.5 h-1.5 w-full rounded bg-black/40">
                  <div className="h-1.5 w-1/2 rounded bg-sky-400" />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded border border-white/10 bg-[#272932] p-2">
              <span className="rounded bg-emerald-500/20 px-2 py-1 text-center font-bold text-emerald-300">
                ● 正在推流 (LIVE)
              </span>
              <span className="font-mono text-[9px] text-white/60">CPU: 4.2% · 60.0 fps</span>
            </div>
          </div>
        </div>

        <p className="px-4 py-3 text-xs leading-5 text-brand-muted">
          {l(
            locale,
            '把群里拿到的链接粘贴进 OBS「媒体源」，保留球场欢呼声并叠加主播自己的母语或方言解说，推流到各大平台。',
            'Paste the link into OBS as a Media Source, keep the stadium atmosphere, and layer your own commentary to stream anywhere.',
            '把群裡拿到的連結貼進 OBS「媒體源」，保留球場歡呼聲並疊加主播自己的母語或方言解說，推流到各大平台。'
          )}
        </p>
      </div>
    </div>
  )
}
