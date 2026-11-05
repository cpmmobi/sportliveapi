'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { EVENT_SPORT_TYPES, type PreviewLine, type PreviewMatch, type StreamsPreview } from '@/lib/streams-preview'

// 完整 17 个运动品类（即使当前时段无正在直播场次，也固定展示分类按钮）
const ALL_SPORT_TABS = [
  { key: '1', zh: '足球', en: 'Football', 'zh-TW': '足球' },
  { key: '3', zh: '板球', en: 'Cricket', 'zh-TW': '板球' },
  { key: '12', zh: '美式足球', en: 'American Football', 'zh-TW': '美式足球' },
  { key: 'rugby', zh: '英式橄榄球', en: 'Rugby League', 'zh-TW': '英式橄欖球' },
  { key: 'afl', zh: '澳式橄榄球', en: 'Australian Football', 'zh-TW': '澳式橄欖球' },
  { key: '13', zh: '网球', en: 'Tennis', 'zh-TW': '網球' },
  { key: '14', zh: '斯诺克', en: 'Snooker', 'zh-TW': '斯諾克' },
  { key: '16', zh: '棒球', en: 'Baseball', 'zh-TW': '棒球' },
  { key: '17', zh: '冰球', en: 'Ice Hockey', 'zh-TW': '冰球' },
  { key: '18', zh: '篮球', en: 'Basketball', 'zh-TW': '籃球' },
  { key: '19', zh: '排球', en: 'Volleyball', 'zh-TW': '排球' },
  { key: 'tt', zh: '乒乓球', en: 'Table Tennis', 'zh-TW': '乒乓球' },
  { key: 'badminton', zh: '羽毛球', en: 'Badminton', 'zh-TW': '羽毛球' },
  { key: 'esports', zh: '电竞', en: 'Esports', 'zh-TW': '電競' },
  { key: '35', zh: '赛车', en: 'Motorsport', 'zh-TW': '賽車' },
  { key: '33', zh: '格斗', en: 'Combat Sports', 'zh-TW': '格鬥' },
  { key: '38', zh: '摔跤', en: 'Wrestling', 'zh-TW': '摔跤' },
] as const

const COPY = {
  zh: {
    allLive: '全部直播中',
    liveMatches: '当前正在直播场次',
    activeLines: '在推高清信号路数',
    liveSports: '当前在播球类',
    refreshHint: '每 30 秒自动同步 · 点击刷新',
    refreshing: '同步中...',
    spotlightTitle: '正在直播 · 实时画面抓拍（点击放大验看画质）',
    spotlightHint: '源站实时抓拍，未经后期修饰',
    searchPlaceholder: '在当前直播场次中搜索联赛、主客队或赛事名称...',
    allLeagues: '全部联赛',
    multiOnly: '仅看多线路场次 (≥2条)',
    time: '开赛时间 (UTC+8)',
    league: '赛事 / 联赛',
    matchup: '对阵 / 赛事名称',
    line: '线路',
    playable: '状态',
    shot: '实时画面',
    specs: '信号参数 / 推流时间',
    action: '测试',
    yes: '直播中',
    enlarge: '放大',
    close: '关闭',
    emptySport: '该球类当前时段暂无正在直播的比赛（欧美/亚太赛事开赛后会自动进流并展示画面）。',
    emptySwitchAll: '查看当前正在直播的其他球类 →',
    error: '赛程暂时没有拉到，请稍后再看。',
    missing: '预览服务还没有配置密钥。',
    guardTitle: '防盗链说明：',
    guardBody: '仅展示当前正在直播且已生成实时画面的场次，隐藏 m3u8 / flv 播放地址以防爬虫盗链。',
    guardCta: '联系客户经理开通带播放器的专属测试页 →',
    applyTrial: '测试真流',
    modalCta: '画质满意？申请开通带播放的专属测试页 →',
    liveBadge: '直播中',
    linesUnit: '条线路',
    capturedAt: '更新于 ',
  },
  en: {
    allLive: 'All Live',
    liveMatches: 'Matches Live Now',
    activeLines: 'Active Lines on Air',
    liveSports: 'Sports on Air Now',
    refreshHint: 'Synced every 30s · Refresh',
    refreshing: 'Syncing...',
    spotlightTitle: 'On Air Now · Real-Time Frame Captures (Click to Enlarge)',
    spotlightHint: 'Captured directly from live origin feeds',
    searchPlaceholder: 'Search league, teams, or event name in live matches...',
    allLeagues: 'All leagues',
    multiOnly: 'Multi-line matches only (≥2)',
    time: 'Kickoff (UTC+8)',
    league: 'Competition',
    matchup: 'Fixture / Event',
    line: 'Line',
    playable: 'Status',
    shot: 'Live Frame',
    specs: 'Stream Specs / Publish Time',
    action: 'Trial',
    yes: 'Live',
    enlarge: 'Zoom',
    close: 'Close',
    emptySport: 'No matches are live in this sport right now. Feeds and screenshots appear automatically once matches kick off.',
    emptySwitchAll: 'View live matches in other sports →',
    error: 'The schedule could not be loaded. Try again shortly.',
    missing: 'The preview service is not configured.',
    guardTitle: 'Anti-hotlink notice: ',
    guardBody: 'Shows only matches currently on air with real-time frame captures; m3u8 / flv URLs are withheld to prevent scraping.',
    guardCta: 'Request a private test page with live playback →',
    applyTrial: 'Test stream',
    modalCta: 'Like the picture quality? Request a playable test page →',
    liveBadge: 'LIVE',
    linesUnit: 'lines',
    capturedAt: 'Updated ',
  },
  'zh-TW': {
    allLive: '全部直播中',
    liveMatches: '目前正在直播場次',
    activeLines: '在推高清訊號路數',
    liveSports: '目前在播球類',
    refreshHint: '每 30 秒自動同步 · 點擊重新整理',
    refreshing: '同步中...',
    spotlightTitle: '正在直播 · 即時畫面抓拍（點擊放大驗看畫質）',
    spotlightHint: '源站即時抓拍，未經後期修飾',
    searchPlaceholder: '在目前直播場次中搜尋聯賽、主客隊或賽事名稱...',
    allLeagues: '全部聯賽',
    multiOnly: '僅看多線路場次 (≥2條)',
    time: '開賽時間 (UTC+8)',
    league: '賽事 / 聯賽',
    matchup: '對陣 / 賽事名稱',
    line: '線路',
    playable: '狀態',
    shot: '即時畫面',
    specs: '訊號參數 / 推流時間',
    action: '測試',
    yes: '直播中',
    enlarge: '放大',
    close: '關閉',
    emptySport: '該球類目前時段暫無正在直播的比賽（歐美/亞太賽事開賽後會自動進流並展示畫面）。',
    emptySwitchAll: '查看目前正在直播的其他球類 →',
    error: '賽程暫時沒有拉到，請稍後再看。',
    missing: '預覽服務還沒有設定金鑰。',
    guardTitle: '防盜鏈說明：',
    guardBody: '僅展示目前正在直播且已產生即時畫面的場次，隱藏 m3u8 / flv 播放地址以防爬蟲盜鏈。',
    guardCta: '聯繫客戶經理開通帶播放器的專屬測試頁 →',
    applyTrial: '測試真流',
    modalCta: '畫質滿意？申請開通帶播放的專屬測試頁 →',
    liveBadge: '直播中',
    linesUnit: '條線路',
    capturedAt: '更新於 ',
  },
} as const

function copyFor(locale: string) {
  if (locale === 'en') return COPY.en
  if (locale === 'zh-TW') return COPY['zh-TW']
  return COPY.zh
}

function pick(locale: string, zh: string, en: string) {
  return locale === 'en' && en ? en : zh
}

/** Wrestling / combat / motorsport use event titles instead of home vs away. */
function isEventMatch(match: PreviewMatch) {
  return EVENT_SPORT_TYPES.has(match.type) || match.matchType === 'multi' || Boolean(match.event || match.eventEn)
}

function matchTitle(locale: string, match: PreviewMatch) {
  const event = pick(locale, match.event, match.eventEn)
  if (isEventMatch(match) && event) return event
  const home = pick(locale, match.home, match.homeEn)
  const away = pick(locale, match.away, match.awayEn)
  const fixture = [home, away].filter(Boolean).join(' vs ')
  if (fixture) return fixture
  return event || pick(locale, match.league, match.leagueEn)
}

function tabLabel(locale: string, tab: (typeof ALL_SPORT_TABS)[number]) {
  if (locale === 'en') return tab.en
  if (locale === 'zh-TW') return tab['zh-TW']
  return tab.zh
}

function shortDate(dateStr: string) {
  return dateStr.replace(/^\d{4}\//, '')
}

function shortPublish(pub: string) {
  const parts = pub.trim().split(/\s+/)
  return parts.length > 1 ? parts[1] : pub
}

type LineItem = {
  key: string
  line: PreviewLine | null
  screenshot: string
}

// Only return playable lines that have a screenshot (or fallback to match screenshot)
function liveLinesFor(match: PreviewMatch): LineItem[] {
  const active = match.lines.filter((line) => line.isPlayed && (line.screenshot || match.screenshot))
  if (active.length === 0 && match.screenshot) {
    return [{ key: match.id, line: match.lines[0] ?? null, screenshot: match.screenshot }]
  }
  return active.map((line, index) => ({
    key: `${match.id}-${index}`,
    line,
    screenshot: (line.screenshot || match.screenshot) as string,
  }))
}

function lineTone(name: string) {
  if (/卫星|衛星|satellite/i.test(name)) return 'bg-emerald-50 text-emerald-700 ring-emerald-300'
  if (/原声|原聲|raw/i.test(name)) return 'bg-rose-50 text-rose-600 ring-rose-300'
  if (/南亚|南亞|fancode/i.test(name)) return 'bg-violet-50 text-violet-700 ring-violet-300'
  if (/高清|hd/i.test(name)) return 'bg-sky-50 text-sky-700 ring-sky-300'
  if (/中文|国语|國語|cn/i.test(name)) return 'bg-amber-50 text-amber-800 ring-amber-300'
  return 'bg-blue-50 text-blue-700 ring-blue-300'
}

type ZoomPayload = {
  src: string
  title: string
  meta: string
}

export function StreamsPreviewBoard({ locale, initial }: { locale: string; initial: StreamsPreview }) {
  const t = copyFor(locale)
  const [data, setData] = useState(initial)
  const [sport, setSport] = useState<string>('all')
  const [leagueFilter, setLeagueFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [multiOnly, setMultiOnly] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [zoom, setZoom] = useState<ZoomPayload | null>(null)

  async function refreshNow() {
    setSyncing(true)
    try {
      const response = await fetch('/api/preview/streams', { cache: 'no-store' })
      if (!response.ok) return
      const next = (await response.json()) as StreamsPreview
      setData(next)
    } catch {
      // keep last good snapshot
    } finally {
      setSyncing(false)
    }
  }

  useEffect(() => {
    let cancelled = false
    const timer = window.setInterval(async () => {
      try {
        const response = await fetch('/api/preview/streams', { cache: 'no-store' })
        if (!response.ok) return
        const next = (await response.json()) as StreamsPreview
        if (!cancelled) setData(next)
      } catch {
        // ignore transient error
      }
    }, 30_000)
    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (!zoom) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setZoom(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoom])

  // Keep only live matches that have a real screenshot
  const liveMatches = useMemo(
    () => data.matches.filter((match) => match.isPlayed && Boolean(match.screenshot)),
    [data.matches]
  )

  // Live counts per sport type
  const liveCountBySport = useMemo(() => {
    const counts = new Map<string, number>()
    for (const match of liveMatches) {
      const key = String(match.type)
      counts.set(key, (counts.get(key) || 0) + 1)
    }
    return counts
  }, [liveMatches])

  const stats = useMemo(() => {
    let activeLines = 0
    for (const match of liveMatches) {
      activeLines += liveLinesFor(match).length
    }
    return {
      liveMatches: liveMatches.length,
      activeLines,
      liveSports: liveCountBySport.size,
    }
  }, [liveMatches, liveCountBySport])

  // Top leagues in current selection
  const topLeagues = useMemo(() => {
    const counts = new Map<string, number>()
    for (const match of liveMatches) {
      if (sport !== 'all' && String(match.type) !== sport) continue
      const lg = pick(locale, match.league, match.leagueEn)
      if (!lg) continue
      counts.set(lg, (counts.get(lg) || 0) + 1)
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8)
  }, [liveMatches, sport, locale])

  const filteredMatches = useMemo(() => {
    const q = query.trim().toLowerCase()
    return liveMatches
      .filter((match) => sport === 'all' || String(match.type) === sport)
      .filter((match) => {
        if (multiOnly && liveLinesFor(match).length < 2) return false
        const lg = pick(locale, match.league, match.leagueEn)
        if (leagueFilter !== 'all' && lg !== leagueFilter) return false
        if (!q) return true
        const hay = `${match.league} ${match.leagueEn} ${match.event} ${match.eventEn} ${match.home} ${match.homeEn} ${match.away} ${match.awayEn}`.toLowerCase()
        return hay.includes(q)
      })
      .sort((a, b) => a.date - b.date)
  }, [liveMatches, sport, multiOnly, leagueFilter, query, locale])

  return (
    <div>
      {/* 1. Real-time live stats bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="border border-brand-line border-l-4 border-l-brand-primary bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {t.liveMatches}
          </div>
          <p className="mt-1.5 text-2xl font-bold tabular-nums text-brand-primary sm:text-3xl">{stats.liveMatches}</p>
        </div>

        <div className="border border-brand-line border-l-4 border-l-brand-ink bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-brand-muted">{t.activeLines}</p>
          <p className="mt-1.5 text-2xl font-bold tabular-nums text-brand-ink sm:text-3xl">{stats.activeLines}</p>
        </div>

        <div className="border border-brand-line border-l-4 border-l-brand-ink bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-brand-muted">{t.liveSports}</p>
          <p className="mt-1.5 text-2xl font-bold tabular-nums text-brand-ink sm:text-3xl">{stats.liveSports}</p>
        </div>
      </div>

      {data.error === 'missing_auth' && <p className="mt-3 text-sm font-semibold text-brand-primary">{t.missing}</p>}
      {data.error === 'upstream' && <p className="mt-3 text-sm font-semibold text-brand-primary">{t.error}</p>}

      {/* 2. All 17 sport category tabs (always visible even when 0 live) */}
      <div className="mt-6 flex flex-wrap gap-1.5 border-b border-brand-line pb-3">
        <button
          type="button"
          onClick={() => {
            setSport('all')
            setLeagueFilter('all')
          }}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-colors sm:text-sm ${
            sport === 'all'
              ? 'bg-brand-primary text-white shadow-[2px_2px_0_0_#141414]'
              : 'border border-brand-line bg-white text-brand-ink hover:border-brand-primary hover:text-brand-primary'
          }`}
        >
          <span>{t.allLive}</span>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
              sport === 'all' ? 'bg-white text-brand-primary' : 'bg-emerald-50 text-emerald-700'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {stats.liveMatches}
          </span>
        </button>

        {ALL_SPORT_TABS.map((tab) => {
          const active = sport === tab.key
          const liveCount = liveCountBySport.get(tab.key) || 0
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setSport(tab.key)
                setLeagueFilter('all')
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-colors sm:text-sm ${
                active
                  ? 'bg-brand-primary text-white shadow-[2px_2px_0_0_#141414]'
                  : liveCount > 0
                    ? 'border border-brand-line bg-white text-brand-ink hover:border-brand-primary hover:text-brand-primary'
                    : 'border border-brand-line bg-white/70 text-brand-muted hover:border-brand-ink hover:text-brand-ink'
              }`}
            >
              <span>{tabLabel(locale, tab)}</span>
              {liveCount > 0 ? (
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    active ? 'bg-white text-brand-primary' : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {liveCount}
                </span>
              ) : (
                <span className={`text-[11px] font-normal ${active ? 'text-white/80' : 'text-brand-muted/70'}`}>
                  (0)
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* 3. Search & quick league filter */}
      <div className="mt-4 flex flex-col gap-3 border border-brand-line bg-white p-3.5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="relative max-w-md flex-1">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full border border-brand-line bg-brand-paper/40 px-3 py-1.5 text-sm text-brand-ink placeholder:text-brand-muted focus:border-brand-primary focus:bg-white focus:outline-none"
            />
          </div>

          <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-medium text-brand-ink sm:text-sm">
            <input
              type="checkbox"
              checked={multiOnly}
              onChange={(event) => setMultiOnly(event.target.checked)}
              className="h-4 w-4 accent-brand-primary"
            />
            {t.multiOnly}
          </label>
        </div>

        {topLeagues.length > 1 && (
          <div className="flex flex-wrap items-center gap-1.5 border-t border-brand-line pt-2.5 text-xs">
            <button
              type="button"
              onClick={() => setLeagueFilter('all')}
              className={`px-2.5 py-1 font-semibold ${
                leagueFilter === 'all'
                  ? 'bg-brand-ink text-white'
                  : 'bg-brand-paper text-brand-muted hover:text-brand-ink'
              }`}
            >
              {t.allLeagues}
            </button>
            {topLeagues.map(([lg, count]) => (
              <button
                key={lg}
                type="button"
                onClick={() => setLeagueFilter(lg === leagueFilter ? 'all' : lg)}
                className={`px-2.5 py-1 font-medium ${
                  leagueFilter === lg
                    ? 'bg-brand-primary text-white'
                    : 'bg-brand-paper text-brand-ink hover:text-brand-primary'
                }`}
              >
                {lg} <span className="opacity-70">({count})</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 4. Compact live-only table */}
      <div className="mt-4 overflow-x-auto border border-brand-line bg-white shadow-sm">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-brand-paper text-xs font-bold text-brand-muted">
            <tr>
              <th className="whitespace-nowrap border-b border-brand-line px-3 py-3">{t.time}</th>
              <th className="whitespace-nowrap border-b border-brand-line px-3 py-3">{t.league}</th>
              <th className="border-b border-brand-line px-3 py-3">{t.matchup}</th>
              <th className="whitespace-nowrap border-b border-brand-line px-3 py-3">{t.line}</th>
              <th className="whitespace-nowrap border-b border-brand-line px-3 py-3">{t.playable}</th>
              <th className="whitespace-nowrap border-b border-brand-line px-3 py-3">{t.shot}</th>
              <th className="whitespace-nowrap border-b border-brand-line px-3 py-3">{t.specs}</th>
              <th className="whitespace-nowrap border-b border-brand-line px-3 py-3 text-right">{t.action}</th>
            </tr>
          </thead>
          <tbody>
            {filteredMatches.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center">
                  <p className="text-sm text-brand-muted">{t.emptySport}</p>
                  {sport !== 'all' && stats.liveMatches > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setSport('all')
                        setLeagueFilter('all')
                      }}
                      className="mt-3 inline-flex items-center bg-brand-primary px-4 py-1.5 text-xs font-bold text-white hover:bg-brand-dark"
                    >
                      {t.emptySwitchAll}
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              filteredMatches.flatMap((match, matchIdx) => {
                const items = liveLinesFor(match)
                const span = items.length
                const sportLabel = pick(locale, match.sport, match.sportEn)
                const leagueLabel = pick(locale, match.league, match.leagueEn)
                const home = pick(locale, match.home, match.homeEn)
                const away = pick(locale, match.away, match.awayEn)
                const title = matchTitle(locale, match)
                const showFixture = !isEventMatch(match) && Boolean(home && away)
                const hasScore = showFixture && match.homeScore !== null && match.awayScore !== null
                const zebra = matchIdx % 2 === 1 ? 'bg-brand-paper/25' : 'bg-white'

                return items.map((item, lineIdx) => {
                  const lineName = item.line ? pick(locale, item.line.name, item.line.nameEn) : ''
                  const resolution =
                    item.line?.width && item.line.height ? `${item.line.width}×${item.line.height}` : ''
                  const fps = item.line?.frameRate ? `${item.line.frameRate}fps` : ''
                  const specBadge = [resolution, fps].filter(Boolean).join(' · ')
                  const pubShort = item.line?.publishTime ? shortPublish(item.line.publishTime) : ''
                  const meta = [
                    leagueLabel,
                    lineName,
                    specBadge,
                    item.line?.publishTime ? `${t.capturedAt}${item.line.publishTime}` : '',
                  ]
                    .filter(Boolean)
                    .join('  |  ')

                  return (
                    <tr
                      key={item.key}
                      className={`border-b border-brand-line last:border-b-0 hover:bg-brand-tint/25 ${zebra}`}
                    >
                      {lineIdx === 0 && (
                        <>
                          <td
                            rowSpan={span}
                            className="whitespace-nowrap border-r border-brand-line/60 px-3 py-3 align-middle text-xs font-medium tabular-nums text-brand-ink"
                          >
                            {shortDate(match.dateStr)}
                          </td>

                          <td
                            rowSpan={span}
                            className="max-w-[11rem] border-r border-brand-line/60 px-3 py-3 align-middle"
                            title={`${sportLabel} · ${leagueLabel}`}
                          >
                            <span className="block text-[11px] font-medium text-brand-muted">{sportLabel}</span>
                            <span className="mt-0.5 block truncate text-xs font-bold text-brand-ink">
                              {leagueLabel}
                            </span>
                          </td>

                          <td
                            rowSpan={span}
                            className="min-w-[13rem] max-w-[20rem] border-r border-brand-line/60 px-3 py-3 align-middle"
                            title={title}
                          >
                            {showFixture ? (
                              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm">
                                <span className="font-semibold text-brand-ink">{home}</span>
                                {hasScore ? (
                                  <span className="rounded bg-brand-tint px-1.5 py-0.5 text-xs font-bold tabular-nums text-brand-primary">
                                    {match.homeScore} : {match.awayScore}
                                  </span>
                                ) : (
                                  <span className="text-xs font-normal text-brand-muted">vs</span>
                                )}
                                <span className="font-semibold text-brand-ink">{away}</span>
                              </div>
                            ) : (
                              <span className="text-xs font-semibold text-brand-ink sm:text-sm">{title}</span>
                            )}
                          </td>
                        </>
                      )}

                      <td className="whitespace-nowrap px-3 py-2.5">
                        {lineName ? (
                          <span
                            className={`inline-flex rounded-md px-2.5 py-0.5 text-xs font-semibold ring-1 ${lineTone(
                              lineName
                            )}`}
                          >
                            {lineName}
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>

                      <td className="whitespace-nowrap px-3 py-2.5 text-xs">
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {t.yes}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-3 py-2.5">
                        <button
                          type="button"
                          title={t.enlarge}
                          onClick={() => setZoom({ src: item.screenshot, title, meta })}
                          className="group relative block h-12 w-24 overflow-hidden rounded border border-brand-line bg-brand-ink shadow-sm"
                        >
                          <img
                            src={item.screenshot}
                            alt={title || t.shot}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                          <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-[10px] font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
                            {t.enlarge}
                          </span>
                        </button>
                      </td>

                      <td className="whitespace-nowrap px-3 py-2.5 text-xs tabular-nums">
                        {specBadge || pubShort ? (
                          <div>
                            {specBadge && <span className="block font-semibold text-brand-ink">{specBadge}</span>}
                            {pubShort && (
                              <span className="block text-[11px] text-brand-muted">
                                {t.capturedAt}
                                {pubShort}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-brand-muted">—</span>
                        )}
                      </td>

                      <td className="whitespace-nowrap px-3 py-2.5 text-right text-xs">
                        <Link
                          href={`/${locale}/contact`}
                          className="inline-flex items-center rounded border border-brand-primary/30 bg-brand-tint/40 px-2.5 py-1 font-semibold text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
                        >
                          {t.applyTrial}
                        </Link>
                      </td>
                    </tr>
                  )
                })
              })
            )}
          </tbody>
        </table>
      </div>

      {/* 5. Lightbox modal with conversion hook */}
      {zoom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setZoom(null)}
        >
          <figure
            className="w-full max-w-5xl border border-white/20 bg-[#0F0F12] p-3 shadow-2xl sm:p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 pb-3 text-white">
              <div>
                <p className="text-sm font-bold sm:text-base">{zoom.title}</p>
                {zoom.meta && <p className="mt-0.5 text-xs text-white/70">{zoom.meta}</p>}
              </div>
              <button
                type="button"
                onClick={() => setZoom(null)}
                className="border border-white/30 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10"
              >
                {t.close} ✕
              </button>
            </div>

            <div className="overflow-hidden bg-black">
              <img src={zoom.src} alt={zoom.title} className="max-h-[72vh] w-full object-contain" />
            </div>

            <figcaption className="mt-3 flex flex-col justify-between gap-3 border-t border-white/15 pt-3 text-xs sm:flex-row sm:items-center">
              <span className="text-white/75">{t.guardBody}</span>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex shrink-0 items-center gap-1.5 bg-brand-primary px-4 py-2 text-xs font-bold text-white hover:bg-brand-dark"
              >
                <span>{t.modalCta}</span>
              </Link>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  )
}
