'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { IPTV_SCHEDULE_SPORT_TYPES, IptvSchemaPanel, type IptvEndpointKey } from './iptv-schema-panel'
import { StreamsSchemaPanel } from './streams-schema-panel'

type ApiEndpointKey = 'streams' | 'push-streams' | IptvEndpointKey
type NavItemKey = ApiEndpointKey | 'guide-lines' | 'guide-best-practices'

const SPORT_TYPES = [
  { id: 1, zh: '足球', en: 'Soccer', 'zh-TW': '足球', eventType: false },
  { id: 18, zh: '篮球', en: 'Basketball', 'zh-TW': '籃球', eventType: false },
  { id: 3, zh: '板球', en: 'Cricket', 'zh-TW': '板球', eventType: false },
  { id: 13, zh: '网球', en: 'Tennis', 'zh-TW': '網球', eventType: false },
  { id: 16, zh: '棒球', en: 'Baseball', 'zh-TW': '棒球', eventType: false },
  { id: 17, zh: '冰球', en: 'Ice Hockey', 'zh-TW': '冰球', eventType: false },
  { id: 12, zh: '美式足球', en: 'American Football', 'zh-TW': '美式足球', eventType: false },
  { id: 19, zh: '英式橄榄球', en: 'Rugby', 'zh-TW': '英式橄欖球', eventType: false },
  { id: 36, zh: '澳式橄榄球', en: 'Australian Football', 'zh-TW': '澳式橄欖球', eventType: false },
  { id: 14, zh: '斯诺克', en: 'Snooker', 'zh-TW': '斯諾克', eventType: false },
  { id: 91, zh: '排球', en: 'Volleyball', 'zh-TW': '排球', eventType: false },
  { id: 92, zh: '乒乓球', en: 'Table Tennis', 'zh-TW': '乒乓球', eventType: false },
  { id: 94, zh: '羽毛球', en: 'Badminton', 'zh-TW': '羽毛球', eventType: false },
  { id: 151, zh: '电子竞技', en: 'E-sports', 'zh-TW': '電子競技', eventType: false },
  { id: 33, zh: '格斗 (Event)', en: 'Combat Sports (Event)', 'zh-TW': '格鬥 (Event)', eventType: true },
  { id: 35, zh: '赛车 (Event)', en: 'Motorsport (Event)', 'zh-TW': '賽車 (Event)', eventType: true },
  { id: 38, zh: '摔跤 (Event)', en: 'Wrestling (Event)', 'zh-TW': '摔跤 (Event)', eventType: true },
] as const

const ESPORTS_GAMES = [
  { id: '', zh: '不传 (返回全部电竞)', en: 'Omit (All E-sports)', 'zh-TW': '不傳 (回傳全部電競)' },
  { id: '1', zh: '1 · LOL（英雄联盟）', en: '1 · League of Legends (LOL)', 'zh-TW': '1 · LOL（英雄聯盟）' },
  { id: '2', zh: '2 · CS:GO', en: '2 · CS:GO', 'zh-TW': '2 · CS:GO' },
  { id: '3', zh: '3 · 王者荣耀', en: '3 · Honor of Kings', 'zh-TW': '3 · 王者榮耀' },
  { id: '4', zh: '4 · Dota 2', en: '4 · Dota 2', 'zh-TW': '4 · Dota 2' },
] as const

const LINE_SUFFIXES = [
  {
    suffix: { zh: '无后缀', en: '(none)', tw: '無後綴' },
    name: '聚合线路',
    nameEn: 'Web Stream',
    lead: { zh: '提前 ≥3 分钟', en: '≥3 min before kickoff', tw: '提前 ≥3 分鐘' },
    note: {
      zh: '覆盖最全的网络线路，综合稳定性与延迟均衡',
      en: 'Broadest competition coverage with balanced stability and latency',
      tw: '覆蓋最全的網路線路，綜合穩定性與延遲均衡',
    },
    custom: false,
  },
  {
    suffix: { zh: '-hd', en: '-hd', tw: '-hd' },
    name: '国际高清',
    nameEn: 'Global HD',
    lead: { zh: '1080P · 提前 ≥10 分钟', en: '1080p · ≥10 min before kickoff', tw: '1080P · 提前 ≥10 分鐘' },
    note: {
      zh: '覆盖欧美热门赛事（NBA / MLB / 欧冠 / 五大联赛等）',
      en: 'Covers major US & European events (NBA, MLB, UCL, Top 5 football leagues)',
      tw: '覆蓋歐美熱門賽事（NBA / MLB / 歐冠 / 五大聯賽等）',
    },
    custom: false,
  },
  {
    suffix: { zh: '-backup', en: '-backup', tw: '-backup' },
    name: '备用线路',
    nameEn: 'Backup Stream',
    lead: { zh: '时间不固定', en: 'Variable lead time', tw: '時間不固定' },
    note: {
      zh: '针对小联赛补充覆盖，与聚合线路互补',
      en: 'Supplemental coverage for secondary leagues alongside Web Stream',
      tw: '針對小聯賽補充覆蓋，與聚合線路互補',
    },
    custom: false,
  },
  {
    suffix: { zh: '-cnhd', en: '-cnhd', tw: '-cnhd' },
    name: '中文线路',
    nameEn: 'CN Channel',
    lead: { zh: '高清 · 提前 10 分钟', en: 'HD · 10 min before kickoff', tw: '高清 · 提前 10 分鐘' },
    note: {
      zh: '大陆咪咕体育等平台直播，针对中文区用户',
      en: 'Mandarin commentary feeds for Chinese-speaking audiences',
      tw: '大陸咪咕體育等平台直播，針對中文區使用者',
    },
    custom: true,
  },
  {
    suffix: { zh: '-twhd', en: '-twhd', tw: '-twhd' },
    name: '台湾频道',
    nameEn: 'TW Channel',
    lead: { zh: '720P · 提前 10 分钟', en: '720p · 10 min before kickoff', tw: '720P · 提前 10 分鐘' },
    note: {
      zh: '台湾 Elta / 纬来等直播赛事，针对繁中用户',
      en: 'Taiwanese sports networks (ELTA / Videoland) for Traditional Chinese users',
      tw: '台灣 Elta / 緯來等直播賽事，針對繁中使用者',
    },
    custom: true,
  },
  {
    suffix: { zh: '-hkhd', en: '-hkhd', tw: '-hkhd' },
    name: '香港频道',
    nameEn: 'HK Channel',
    lead: { zh: '高清 · 提前 10 分钟', en: 'HD · 10 min before kickoff', tw: '高清 · 提前 10 分鐘' },
    note: {
      zh: '香港 TVB 体育等频道流，针对港澳用户',
      en: 'Hong Kong sports broadcasts for HK/Macau audiences',
      tw: '香港 TVB 體育等頻道流，針對港澳使用者',
    },
    custom: true,
  },
  {
    suffix: { zh: '-fancode', en: '-fancode', tw: '-fancode' },
    name: '南亚高清',
    nameEn: 'Fancode Feed',
    lead: { zh: '高清 · 提前 10 分钟', en: 'HD · 10 min before kickoff', tw: '高清 · 提前 10 分鐘' },
    note: {
      zh: '主要覆盖板球，以及西甲、沙特联等部分足球联赛和 F1',
      en: 'Mainly covers Cricket (IPL, etc.), plus La Liga, Saudi Pro League, and F1',
      tw: '主要覆蓋板球，以及西甲、沙烏地聯等部分足球聯賽和 F1',
    },
    custom: true,
  },
] as const

type PlaygroundResult = {
  ok: boolean
  status: number
  durationMs: number
  requestUrl: string
  usingDefaultAuth?: boolean
  error?: string
  message?: string
  rawPreview?: string
  payload?: {
    errCode?: number
    errMsg?: string
    page?: number
    hasMore?: boolean
    data?: Record<string, unknown>[]
  }
}

function l(locale: string, zh: string, en: string, tw?: string) {
  if (locale === 'zh') return zh
  if (locale === 'zh-TW') return tw || zh
  return en
}

export default function ApiPlayground({ locale }: { locale: string }) {
  const [activeNav, setActiveNav] = useState<NavItemKey>('streams')
  const isGuideView = activeNav === 'guide-lines' || activeNav === 'guide-best-practices'
  const endpoint: ApiEndpointKey = isGuideView ? 'streams' : activeNav
  const isIptvEndpoint = endpoint === 'iptv-channels' || endpoint === 'iptv-play' || endpoint === 'iptv-schedule'

  // Single-match params
  const [type, setType] = useState<number>(1)
  const [isPlayed, setIsPlayed] = useState<string>('1')
  const [gameId, setGameId] = useState<string>('')
  const [page, setPage] = useState<string>('1')
  const [pageSize, setPageSize] = useState<string>('5')
  const [customAuth, setCustomAuth] = useState<string>('')

  // IPTV params (https://iptv.sla.homes)
  const [iptvDomain, setIptvDomain] = useState<string>('customer.b-cdn.net')
  const [iptvChannelId, setIptvChannelId] = useState<string>('bbc-one')
  const [iptvBunnyToken, setIptvBunnyToken] = useState<string>('BUNNY_TOKEN_DEMO')
  const [iptvTtl, setIptvTtl] = useState<string>('21600')
  const [iptvDate, setIptvDate] = useState<string>('')
  const [iptvSportType, setIptvSportType] = useState<string>('')

  const [reqTab, setReqTab] = useState<'params' | 'curl' | 'schema'>('params')
  const [loading, setLoading] = useState<boolean>(false)
  const [result, setResult] = useState<PlaygroundResult | null>(null)
  const [copied, setCopied] = useState<'url' | 'curl' | 'json' | null>(null)

  const baseEndpointUrl = useMemo(() => {
    switch (endpoint) {
      case 'streams':
        return 'https://api.sla.homes/lives/streams'
      case 'push-streams':
        return 'https://api.sla.homes/lives/push-streams'
      case 'iptv-channels':
        return 'https://iptv.sla.homes/v1/iptv/channels'
      case 'iptv-play':
        return 'https://iptv.sla.homes/v1/iptv/play'
      case 'iptv-schedule':
        return 'https://iptv.sla.homes/v1/iptv/schedule'
    }
  }, [endpoint])

  // Live preview URL shown in the Postman-style address bar
  const livePreviewUrl = useMemo(() => {
    const params = new URLSearchParams()
    params.set('auth', customAuth.trim() || '6aebe6...5d88')
    if (isIptvEndpoint) {
      params.set('domain', iptvDomain.trim() || 'customer.b-cdn.net')
      if (endpoint === 'iptv-play') {
        if (iptvChannelId.trim()) params.set('id', iptvChannelId.trim())
        if (iptvBunnyToken.trim()) params.set('bunny_token', iptvBunnyToken.trim())
        if (iptvTtl.trim()) params.set('ttl', iptvTtl.trim())
      } else if (endpoint === 'iptv-schedule') {
        if (iptvDate.trim()) params.set('date', iptvDate.trim())
        if (iptvSportType.trim()) params.set('type', iptvSportType.trim())
      }
      return `${baseEndpointUrl}?${params.toString()}`
    }
    params.set('type', String(type))
    if (isPlayed !== 'all') params.set('isPlayed', isPlayed)
    if (type === 151 && gameId) params.set('gameId', gameId)
    params.set('page', page || '1')
    params.set('pageSize', pageSize || '5')
    return `${baseEndpointUrl}?${params.toString()}`
  }, [
    baseEndpointUrl,
    customAuth,
    isIptvEndpoint,
    iptvDomain,
    endpoint,
    iptvChannelId,
    iptvBunnyToken,
    iptvTtl,
    iptvDate,
    iptvSportType,
    type,
    isPlayed,
    gameId,
    page,
    pageSize,
  ])

  const curlSnippet = useMemo(() => {
    const params = new URLSearchParams()
    params.set('auth', customAuth.trim() || 'YOUR_MERCHANT_AUTH_KEY')
    if (isIptvEndpoint) {
      params.set('domain', iptvDomain.trim() || 'customer.b-cdn.net')
      if (endpoint === 'iptv-play') {
        if (iptvChannelId.trim()) params.set('id', iptvChannelId.trim())
        if (iptvBunnyToken.trim()) params.set('bunny_token', iptvBunnyToken.trim())
        if (iptvTtl.trim()) params.set('ttl', iptvTtl.trim())
      } else if (endpoint === 'iptv-schedule') {
        if (iptvDate.trim()) params.set('date', iptvDate.trim())
        if (iptvSportType.trim()) params.set('type', iptvSportType.trim())
      }
      return `curl -X GET "${baseEndpointUrl}?${params.toString()}" \\\n  -H "Accept: application/json"`
    }
    params.set('type', String(type))
    if (isPlayed !== 'all') params.set('isPlayed', isPlayed)
    if (type === 151 && gameId) params.set('gameId', gameId)
    if (page && page !== '1') params.set('page', page)
    if (pageSize && pageSize !== '500') params.set('pageSize', pageSize)
    return `curl -X GET "${baseEndpointUrl}?${params.toString()}" \\\n  -H "Accept: application/json"`
  }, [
    baseEndpointUrl,
    customAuth,
    isIptvEndpoint,
    iptvDomain,
    endpoint,
    iptvChannelId,
    iptvBunnyToken,
    iptvTtl,
    iptvDate,
    iptvSportType,
    type,
    isPlayed,
    gameId,
    page,
    pageSize,
  ])

  const runQuery = useCallback(async () => {
    setLoading(true)
    try {
      const qs = new URLSearchParams()
      qs.set('endpoint', endpoint)
      if (customAuth.trim()) qs.set('auth', customAuth.trim())

      if (isIptvEndpoint) {
        qs.set('domain', iptvDomain.trim() || 'customer.b-cdn.net')
        if (endpoint === 'iptv-play') {
          qs.set('id', iptvChannelId.trim())
          qs.set('bunny_token', iptvBunnyToken.trim())
          if (iptvTtl.trim()) qs.set('ttl', iptvTtl.trim())
        } else if (endpoint === 'iptv-schedule') {
          if (iptvDate.trim()) qs.set('date', iptvDate.trim())
          if (iptvSportType.trim()) qs.set('type', iptvSportType.trim())
        }
      } else {
        qs.set('type', String(type))
        if (isPlayed !== 'all') qs.set('isPlayed', isPlayed)
        if (type === 151 && gameId) qs.set('gameId', gameId)
        qs.set('page', page || '1')
        qs.set('pageSize', pageSize || '5')
      }

      const res = await fetch(`/api/preview/playground?${qs.toString()}`, { cache: 'no-store' })
      const json = (await res.json()) as PlaygroundResult
      setResult(json)
    } catch (e) {
      setResult({
        ok: false,
        status: 500,
        durationMs: 0,
        requestUrl: baseEndpointUrl,
        error: 'network_error',
        message: e instanceof Error ? e.message : 'Network error',
      })
    } finally {
      setLoading(false)
    }
  }, [
    endpoint,
    customAuth,
    isIptvEndpoint,
    iptvDomain,
    iptvChannelId,
    iptvBunnyToken,
    iptvTtl,
    iptvDate,
    iptvSportType,
    type,
    isPlayed,
    gameId,
    page,
    pageSize,
    baseEndpointUrl,
  ])

  useEffect(() => {
    if (!isGuideView) {
      void runQuery()
    }
  }, [activeNav, endpoint, type, isPlayed, gameId, iptvDate, iptvSportType])

  const jsonFormatted = useMemo(() => {
    if (!result) return ''
    if (result.payload) return JSON.stringify(result.payload, null, 2)
    return JSON.stringify(result, null, 2)
  }, [result])

  const matchCount = Array.isArray(result?.payload?.data) ? result!.payload!.data!.length : 0

  return (
    <div className="overflow-hidden border-2 border-brand-ink bg-white shadow-[6px_6px_0_0_#141414]">
      {/* Console Top Window Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 bg-brand-ink px-4 py-2.5 text-white">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-primary" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="ml-2 font-mono text-xs font-bold tracking-wide text-white">
            SLA API CONSOLE · v2.6
          </span>
          <span className="hidden rounded bg-white/10 px-2 py-0.5 font-mono text-[11px] text-white/80 sm:inline-block">
            api.sla.homes
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {l(locale, '内置演示 Key 已就绪', 'Demo Auth Key Active', '內建演示 Key 已就緒')}
          </span>
          <Link
            href={`/${locale}/coverage`}
            className="hidden text-[11px] font-semibold text-white/75 hover:text-brand-primary sm:inline-block"
          >
            {l(locale, '可视化画面预览 →', 'Visual Live Preview →', '視覺化畫面預覽 →')}
          </Link>
        </div>
      </div>

      {/* Main Left-Right Split Layout */}
      <div className="grid lg:grid-cols-12">
        {/* LEFT SIDEBAR: Collections / Endpoints Tree */}
        <aside className="border-b border-brand-line bg-[#F6F6F7] lg:col-span-3 lg:border-b-0 lg:border-r">
          <div className="p-4">
            {/* Environment Box */}
            <div className="border border-brand-line bg-white p-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold uppercase tracking-wider text-brand-muted">
                  {l(locale, '当前环境', 'Environment', '目前環境')}
                </span>
                <span className="font-mono font-semibold text-brand-primary">Production</span>
              </div>
              <p className="mt-1 truncate font-mono text-xs font-bold text-brand-ink">
                {isIptvEndpoint ? 'https://iptv.sla.homes' : 'https://api.sla.homes'}
              </p>
              <p className="mt-1 text-[11px] text-brand-muted">
                {isIptvEndpoint
                  ? l(locale, '鉴权：auth + domain · Asia/Shanghai', 'Auth: auth + domain · Asia/Shanghai', '鑑權：auth + domain · Asia/Shanghai')
                  : l(locale, '建议轮询：30秒/次 · UTC+8', 'Polling: 30s · UTC+8', '建議輪詢：30秒/次 · UTC+8')}
              </p>
            </div>

            {/* Section 1: Single-Match APIs */}
            <div className="mt-5">
              <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-brand-muted">
                {l(locale, '单场赛事直播接口 (api.sla.homes)', 'Match Stream APIs', '單場賽事直播介面 (api.sla.homes)')}
              </p>

              <nav className="mt-2 space-y-1">
                <button
                  type="button"
                  onClick={() => setActiveNav('streams')}
                  className={`flex w-full items-start gap-2.5 border-l-4 px-3 py-2.5 text-left transition-colors ${
                    activeNav === 'streams'
                      ? 'border-l-brand-primary bg-white font-bold text-brand-ink shadow-sm'
                      : 'border-l-transparent text-brand-muted hover:bg-white/60 hover:text-brand-ink'
                  }`}
                >
                  <span className="mt-0.5 shrink-0 rounded bg-emerald-600 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">
                    GET
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-xs font-bold text-brand-ink">/lives/streams</p>
                    <p className="mt-0.5 truncate text-[11px] text-brand-muted">
                      {l(locale, '模式一：获取现成播放链接', 'Mode 1: Playback URLs', '模式一：取得現成播放連結')}
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveNav('push-streams')}
                  className={`flex w-full items-start gap-2.5 border-l-4 px-3 py-2.5 text-left transition-colors ${
                    activeNav === 'push-streams'
                      ? 'border-l-brand-primary bg-white font-bold text-brand-ink shadow-sm'
                      : 'border-l-transparent text-brand-muted hover:bg-white/60 hover:text-brand-ink'
                  }`}
                >
                  <span className="mt-0.5 shrink-0 rounded bg-emerald-600 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">
                    GET
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-xs font-bold text-brand-ink">/lives/push-streams</p>
                    <p className="mt-0.5 truncate text-[11px] text-brand-muted">
                      {l(locale, '模式二：RTMP 推流参数', 'Mode 2: RTMP Push Params', '模式二：RTMP 推流參數')}
                    </p>
                  </div>
                </button>
              </nav>
            </div>

            {/* Section 2: Global Sports Channels IPTV APIs */}
            <div className="mt-6">
              <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-brand-muted">
                {l(locale, '全球体育频道接口 (iptv.sla.homes)', 'Global Sports Channels (IPTV)', '全球體育頻道介面 (iptv.sla.homes)')}
              </p>

              <nav className="mt-2 space-y-1">
                <button
                  type="button"
                  onClick={() => setActiveNav('iptv-channels')}
                  className={`flex w-full items-start gap-2.5 border-l-4 px-3 py-2.5 text-left transition-colors ${
                    activeNav === 'iptv-channels'
                      ? 'border-l-brand-primary bg-white font-bold text-brand-ink shadow-sm'
                      : 'border-l-transparent text-brand-muted hover:bg-white/60 hover:text-brand-ink'
                  }`}
                >
                  <span className="mt-0.5 shrink-0 rounded bg-emerald-600 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">
                    GET
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-xs font-bold text-brand-ink">/v1/iptv/channels</p>
                    <p className="mt-0.5 truncate text-[11px] text-brand-muted">
                      {l(locale, '1. 频道列表（线性台 + 球队台）', '1. Channel Directory (TV & Team)', '1. 頻道列表（線性台 + 球隊台）')}
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveNav('iptv-play')}
                  className={`flex w-full items-start gap-2.5 border-l-4 px-3 py-2.5 text-left transition-colors ${
                    activeNav === 'iptv-play'
                      ? 'border-l-brand-primary bg-white font-bold text-brand-ink shadow-sm'
                      : 'border-l-transparent text-brand-muted hover:bg-white/60 hover:text-brand-ink'
                  }`}
                >
                  <span className="mt-0.5 shrink-0 rounded bg-emerald-600 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">
                    GET
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-xs font-bold text-brand-ink">/v1/iptv/play</p>
                    <p className="mt-0.5 truncate text-[11px] text-brand-muted">
                      {l(locale, '2. 生成播放地址（Bunny 签名）', '2. Sign Playback URL (Bunny)', '2. 產生播放地址（Bunny 簽名）')}
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveNav('iptv-schedule')}
                  className={`flex w-full items-start gap-2.5 border-l-4 px-3 py-2.5 text-left transition-colors ${
                    activeNav === 'iptv-schedule'
                      ? 'border-l-brand-primary bg-white font-bold text-brand-ink shadow-sm'
                      : 'border-l-transparent text-brand-muted hover:bg-white/60 hover:text-brand-ink'
                  }`}
                >
                  <span className="mt-0.5 shrink-0 rounded bg-emerald-600 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">
                    GET
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-xs font-bold text-brand-ink">/v1/iptv/schedule</p>
                    <p className="mt-0.5 truncate text-[11px] text-brand-muted">
                      {l(locale, '3. 节目表（日期索引 / 某一天）', '3. Program Guide (Days / Date)', '3. 節目表（日期索引 / 某一天）')}
                    </p>
                  </div>
                </button>
              </nav>
            </div>

            {/* Section 2: Reference & Specs */}
            <div className="mt-6">
              <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-brand-muted">
                {l(locale, '接入规范与字典 (v2.6)', 'Specs & Reference (v2.6)', '接入規範與字典 (v2.6)')}
              </p>

              <nav className="mt-2 space-y-1">
                <button
                  type="button"
                  onClick={() => setActiveNav('guide-lines')}
                  className={`flex w-full items-center gap-2.5 border-l-4 px-3 py-2 text-left text-xs transition-colors ${
                    activeNav === 'guide-lines'
                      ? 'border-l-brand-primary bg-white font-bold text-brand-ink shadow-sm'
                      : 'border-l-transparent text-brand-muted hover:bg-white/60 hover:text-brand-ink'
                  }`}
                >
                  <span className="shrink-0 rounded bg-brand-ink/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-brand-ink">
                    DOC
                  </span>
                  <span className="truncate">
                    {l(locale, '线路后缀与清晰度字典', 'Line Suffixes & Specs', '線路後綴與清晰度字典')}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveNav('guide-best-practices')}
                  className={`flex w-full items-center gap-2.5 border-l-4 px-3 py-2 text-left text-xs transition-colors ${
                    activeNav === 'guide-best-practices'
                      ? 'border-l-brand-primary bg-white font-bold text-brand-ink shadow-sm'
                      : 'border-l-transparent text-brand-muted hover:bg-white/60 hover:text-brand-ink'
                  }`}
                >
                  <span className="shrink-0 rounded bg-brand-ink/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-brand-ink">
                    DOC
                  </span>
                  <span className="truncate">
                    {l(locale, 'PublishTime 选线与防盗链', 'PublishTime & Anti-Hotlink', 'PublishTime 選線與防盜鏈')}
                  </span>
                </button>
              </nav>
            </div>

            {/* Quick Sport Type Cheat Sheet */}
            <div className="mt-6 border-t border-brand-line pt-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">
                  {isIptvEndpoint
                    ? l(locale, 'IPTV 节目表 19 类 type 速查', 'IPTV Schedule 19 Sport IDs', 'IPTV 節目表 19 類 type 速查')
                    : l(locale, '单场接口 17 类 type 速查', 'Match API 17 Sport IDs', '單場介面 17 類 type 速查')}
                </span>
                <span className="text-[10px] text-brand-muted">
                  {l(locale, '点击切换', 'Click to test', '點擊切換')}
                </span>
              </div>

              {isIptvEndpoint ? (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      if (activeNav !== 'iptv-schedule') setActiveNav('iptv-schedule')
                      setIptvSportType('')
                    }}
                    className={`px-2 py-1 font-mono text-[11px] transition-colors ${
                      activeNav === 'iptv-schedule' && !iptvSportType
                        ? 'bg-brand-primary font-bold text-white'
                        : 'border border-brand-line bg-white text-brand-ink hover:border-brand-primary'
                    }`}
                  >
                    {l(locale, '全部', 'All', '全部')}
                  </button>
                  {IPTV_SCHEDULE_SPORT_TYPES.map((s) => {
                    const selected = activeNav === 'iptv-schedule' && iptvSportType === String(s.type)
                    return (
                      <button
                        key={s.type}
                        type="button"
                        onClick={() => {
                          if (activeNav !== 'iptv-schedule') setActiveNav('iptv-schedule')
                          if (!iptvDate) {
                            const firstDay = Array.isArray((result?.payload as Record<string, unknown>)?.days)
                              ? ((result?.payload as Record<string, unknown>).days as { date?: string }[])[0]?.date
                              : ''
                            setIptvDate(firstDay || new Date().toISOString().slice(0, 10))
                          }
                          setIptvSportType(String(s.type))
                        }}
                        className={`px-2 py-1 font-mono text-[11px] transition-colors ${
                          selected
                            ? 'bg-brand-primary font-bold text-white'
                            : s.stable
                              ? 'border border-emerald-300 bg-emerald-50/50 text-brand-ink hover:border-brand-primary'
                              : 'border border-brand-line bg-white text-brand-ink hover:border-brand-primary'
                        }`}
                        title={`${s.sport}${s.stable ? l(locale, ' · 稳定有数据', ' · active', ' · 穩定有資料') : ''}`}
                      >
                        {s.type}:{l(locale, s.zh, s.en, s.tw)}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {SPORT_TYPES.map((s) => {
                    const selected = !isGuideView && type === s.id
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          if (isGuideView) setActiveNav('streams')
                          setType(s.id)
                        }}
                        className={`px-2 py-1 font-mono text-[11px] transition-colors ${
                          selected
                            ? 'bg-brand-primary font-bold text-white'
                            : 'border border-brand-line bg-white text-brand-ink hover:border-brand-primary'
                        }`}
                      >
                        {s.id}:{l(locale, s.zh, s.en, s['zh-TW']).replace(' (Event)', '')}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* RIGHT WORKSPACE: Postman-style Request & Response */}
        <div className="flex min-w-0 flex-col lg:col-span-9">
          {isGuideView ? (
            /* Reference Doc View */
            <div className="p-6 sm:p-8">
              {activeNav === 'guide-lines' ? (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-line pb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                        SLA INTEGRATION GUIDE v2.6
                      </span>
                      <h2 className="mt-1 text-xl font-bold text-brand-ink">
                        {l(locale, '线路类型（流名称后缀）与特性说明', 'Stream Line Suffixes & Coverage Characteristics', '線路類型（流名稱後綴）與特性說明')}
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveNav('streams')}
                      className="bg-brand-primary px-3.5 py-2 text-xs font-bold text-white hover:bg-brand-dark"
                    >
                      {l(locale, '返回接口调试 →', 'Back to API Tester →', '返回介面調試 →')}
                    </button>
                  </div>

                  <p className="mt-4 text-xs leading-6 text-brand-muted">
                    {l(
                      locale,
                      '在 liveList 返回数组中，不同线路通过流名称后缀区分清晰度、进流时间及赛事覆盖范围。其中 -cnhd、-twhd、-hkhd、-fancode 为定制线路，默认不开放，如需开通请联系客户经理：',
                      'In liveList, stream lines use suffixes to indicate resolution, lead time, and coverage. -cnhd, -twhd, -hkhd, and -fancode are custom feeds enabled on request:',
                      '在 liveList 回傳陣列中，不同線路透過流名稱後綴區分清晰度、進流時間及賽事覆蓋範圍。其中 -cnhd、-twhd、-hkhd、-fancode 為定制線路，預設不開放，如需開通請聯繫客戶經理：'
                    )}
                  </p>

                  <div className="mt-5 overflow-x-auto border border-brand-line">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-brand-paper text-brand-ink">
                        <tr>
                          <th className="border-b border-brand-line px-3 py-3 font-mono">
                            {l(locale, '后缀', 'Suffix', '後綴')}
                          </th>
                          <th className="border-b border-brand-line px-3 py-3">
                            {l(locale, '中文名 (name)', 'Line Name (name)', '中文名 (name)')}
                          </th>
                          <th className="border-b border-brand-line px-3 py-3">
                            {l(locale, '英文名 (nameEn)', 'English Name (nameEn)', '英文名 (nameEn)')}
                          </th>
                          <th className="border-b border-brand-line px-3 py-3">
                            {l(locale, '清晰度与进流时间', 'Resolution & Lead Time', '清晰度與進流時間')}
                          </th>
                          <th className="border-b border-brand-line px-3 py-3">
                            {l(locale, '赛事覆盖特性', 'Coverage & Characteristics', '賽事覆蓋特性')}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-line">
                        {LINE_SUFFIXES.map((row) => (
                          <tr key={row.nameEn}>
                            <td className="px-3 py-3 font-mono font-bold text-brand-primary">
                              {l(locale, row.suffix.zh, row.suffix.en, row.suffix.tw)}
                            </td>
                            <td className="px-3 py-3 font-semibold text-brand-ink">
                              {locale === 'en' ? row.nameEn : row.name}
                              {row.custom && (
                                <span className="ml-1.5 bg-brand-tint px-1.5 py-0.5 text-[10px] font-bold text-brand-primary">
                                  {l(locale, '定制', 'Custom', '定制')}
                                </span>
                              )}
                            </td>
                            <td className="px-3 py-3 font-mono text-brand-muted">{row.nameEn}</td>
                            <td className="px-3 py-3 text-brand-ink">
                              {l(locale, row.lead.zh, row.lead.en, row.lead.tw)}
                            </td>
                            <td className="px-3 py-3 text-brand-muted">
                              {l(locale, row.note.zh, row.note.en, row.note.tw)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-line pb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                        SLA INTEGRATION GUIDE v2.6
                      </span>
                      <h2 className="mt-1 text-xl font-bold text-brand-ink">
                        {l(locale, 'PublishTime 选线逻辑、防盗链与接入注意事项', 'PublishTime Ranking, Anti-Hotlink & Integration Rules', 'PublishTime 選線邏輯、防盜鏈與接入注意事項')}
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveNav('streams')}
                      className="bg-brand-primary px-3.5 py-2 text-xs font-bold text-white hover:bg-brand-dark"
                    >
                      {l(locale, '返回接口调试 →', 'Back to API Tester →', '返回介面調試 →')}
                    </button>
                  </div>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div className="border border-brand-line p-5">
                      <h3 className="text-sm font-bold text-brand-ink">
                        {l(
                          locale,
                          '1. 利用 streamInfo.PublishTime 自动优选稳定线路',
                          '1. Rank Stable Feeds with streamInfo.PublishTime',
                          '1. 利用 streamInfo.PublishTime 自動優選穩定線路'
                        )}
                      </h3>
                      <p className="mt-2 text-xs leading-6 text-brand-muted">
                        {l(
                          locale,
                          '建议遵循 30 秒 / 次 的频次调用接口，并带上 isPlayed=1 参数过滤实际可播源。streamInfo.PublishTime（UTC+8）表示该线路上一次推流时间：',
                          'Poll the endpoint every 30 seconds with isPlayed=1 to filter active feeds. streamInfo.PublishTime (UTC+8) indicates when the stream was last pushed:',
                          '建議遵循 30 秒 / 次 的頻次呼叫介面，並帶上 isPlayed=1 參數過濾實際可播源。streamInfo.PublishTime（UTC+8）表示該線路上一次推流時間：'
                        )}
                      </p>
                      <ul className="mt-2 list-disc space-y-1.5 pl-4 text-xs leading-5 text-brand-ink">
                        <li>
                          {l(
                            locale,
                            '流开始推送后若比较稳定，该时间距当前时刻会越来越久；',
                            'When a stream is stable, PublishTime remains older relative to the current time;',
                            '流開始推送後若比較穩定，該時間距目前時刻會越來越久；'
                          )}
                        </li>
                        <li>
                          {l(
                            locale,
                            '若某条流不稳定、频繁断流重推，该时间会不断刷新；',
                            'If a feed reconnects frequently, PublishTime refreshes repeatedly;',
                            '若某條流不穩定、頻繁斷流重推，該時間會不斷重新整理；'
                          )}
                        </li>
                        <li>
                          {l(
                            locale,
                            '建议结合 PublishTime 优先选择更久未刷新、分辨率更高的线路作为主线提供给观众。',
                            'Prioritize feeds with longer uninterrupted uptime (older PublishTime) and higher resolution as the default line.',
                            '建議結合 PublishTime 優先選擇更久未重新整理、解析度更高的線路作為主線提供給觀眾。'
                          )}
                        </li>
                      </ul>
                    </div>

                    <div className="border border-brand-line p-5">
                      <h3 className="text-sm font-bold text-brand-ink">
                        {l(
                          locale,
                          '2. 防盗链保护与数据边界必读',
                          '2. Anti-Hotlink Protection & Data Boundaries',
                          '2. 防盜鏈保護與資料邊界必讀'
                        )}
                      </h3>
                      <ul className="mt-2 list-disc space-y-1.5 pl-4 text-xs leading-5 text-brand-muted">
                        <li>
                          <strong className="text-brand-ink">
                            {l(locale, 'Streams 防盗链：', 'Streams Anti-Hotlink: ', 'Streams 防盜鏈：')}
                          </strong>
                          {l(
                            locale,
                            '需提供网站域名加白 Referer、限制目标国家/地区白名单，并采用短效鉴权有效期（通常建议 1 分钟内）。',
                            'Configure Referer domain allowlists, target country/region allowlists, and short-lived signed URLs (recommended ≤1 min).',
                            '需提供網站域名加白 Referer、限制目標國家/地區白名單，並採用短效鑑權有效期（通常建議 1 分鐘內）。'
                          )}
                        </li>
                        <li>
                          <strong className="text-brand-ink">
                            {l(locale, 'Push Streams 地址拼接：', 'Push Streams URL Building: ', 'Push Streams 地址拼接：')}
                          </strong>
                          {l(
                            locale,
                            '接口返回 appName 与 streamName，不直接返回播放 URL，需使用你自己的播放域名拼接并开启云端防盗链。',
                            'Returns appName and streamName instead of playback URLs — combine with your own playback domain and cloud hotlink protection.',
                            '介面回傳 appName 與 streamName，不直接回傳播放 URL，需使用你自己的播放域名拼接並開啟雲端防盜鏈。'
                          )}
                        </li>
                        <li>
                          <strong className="text-brand-ink">
                            {l(locale, '切勿当赛程库使用：', 'Not a Fixtures Database: ', '切勿當賽程庫使用：')}
                          </strong>
                          {l(
                            locale,
                            '接口仅返回当前在播及未来 24 小时内赛事，队名与比分仅用于关联比赛，请先采购成熟赛程 API 再做 Mapping。',
                            'Returns only live matches and fixtures within the next 24h. Team names and scores are for stream matching only — use a dedicated sports data provider for schedules.',
                            '介面僅回傳目前在播及未來 24 小時內賽事，隊名與比分僅用於關聯比賽，請先採購成熟賽程 API 再做 Mapping。'
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Endpoint Debugger Workspace */
            <div className="flex flex-col divide-y divide-brand-line">
              {/* A. Endpoint Title + Mode Summary Header */}
              <div className="bg-brand-paper/50 px-5 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="bg-brand-primary px-2 py-0.5 font-mono text-[11px] font-bold text-white">
                      {endpoint === 'streams' && l(locale, '模式一 · 直播链接模式', 'Mode 1 · Playback Links', '模式一 · 直播連結模式')}
                      {endpoint === 'push-streams' && l(locale, '模式二 · RTMP 推流模式', 'Mode 2 · RTMP Push', '模式二 · RTMP 推流模式')}
                      {endpoint === 'iptv-channels' && l(locale, '全球体育频道 · 1/3', 'Global Sports Channels · 1/3', '全球體育頻道 · 1/3')}
                      {endpoint === 'iptv-play' && l(locale, '全球体育频道 · 2/3', 'Global Sports Channels · 2/3', '全球體育頻道 · 2/3')}
                      {endpoint === 'iptv-schedule' && l(locale, '全球体育频道 · 3/3', 'Global Sports Channels · 3/3', '全球體育頻道 · 3/3')}
                    </span>
                    <h2 className="text-base font-bold text-brand-ink sm:text-lg">
                      {endpoint === 'streams' && l(locale, 'Streams 获取赛事直播链接接口', 'Streams API — Get Playable Match Links', 'Streams 取得賽事直播連結介面')}
                      {endpoint === 'push-streams' && l(locale, 'Push Streams 获取推流参数接口', 'Push Streams API — Get RTMP Stream Params', 'Push Streams 取得推流參數介面')}
                      {endpoint === 'iptv-channels' && l(locale, 'IPTV 频道列表接口（线性台 channels + 球队台 leagues）', 'IPTV Channel Directory API', 'IPTV 頻道列表介面（線性台 channels + 球隊台 leagues）')}
                      {endpoint === 'iptv-play' && l(locale, 'IPTV 播放地址生成接口（Bunny Token 签名）', 'IPTV Signed Playback URL API', 'IPTV 播放地址產生介面（Bunny Token 簽名）')}
                      {endpoint === 'iptv-schedule' && l(locale, 'IPTV 节目表接口（Asia/Shanghai · 日期索引与单日赛程）', 'IPTV Program Guide API', 'IPTV 節目表介面（Asia/Shanghai · 日期索引與單日賽程）')}
                    </h2>
                  </div>
                  <span className="font-mono text-xs text-brand-muted">
                    {endpoint === 'streams' && 'liveList[] → url (m3u8/flv) + streamInfo'}
                    {endpoint === 'push-streams' && 'liveList[] → appName + streamName + streamInfo'}
                    {endpoint === 'iptv-channels' &&
                      l(
                        locale,
                        'logo 拼到 https://iptv.sla.homes 后访问（无需鉴权）',
                        'Prefix logo with https://iptv.sla.homes (no auth required)',
                        'logo 拼到 https://iptv.sla.homes 後訪問（無需鑑權）'
                      )}
                    {endpoint === 'iptv-play' &&
                      l(
                        locale,
                        '返回 url + expires_at · 勿追加 ? 参数',
                        'Returns signed url + expires_at · Do not append ?',
                        '回傳 url + expires_at · 勿追加 ? 參數'
                      )}
                    {endpoint === 'iptv-schedule' &&
                      l(
                        locale,
                        '不传 date 返回日期索引 · 传 date 返回当场 groups[]',
                        'Omit date for days[] index · Pass date for groups[]',
                        '不傳 date 回傳日期索引 · 傳 date 回傳當場 groups[]'
                      )}
                  </span>
                </div>
              </div>

              {/* B. Postman-style URL Bar + Send Button */}
              <div className="p-4 sm:px-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
                  <div className="flex min-w-0 flex-1 items-center border border-brand-line bg-[#F8F8F9]">
                    <span className="shrink-0 border-r border-brand-line bg-emerald-600 px-3.5 py-2.5 font-mono text-xs font-bold text-white">
                      GET
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={livePreviewUrl}
                      className="min-w-0 flex-1 bg-transparent px-3 py-2 font-mono text-xs text-brand-ink focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(livePreviewUrl)
                        setCopied('url')
                        setTimeout(() => setCopied(null), 1500)
                      }}
                      className="shrink-0 border-l border-brand-line px-3 py-2 text-[11px] font-semibold text-brand-muted hover:bg-white hover:text-brand-ink"
                    >
                      {copied === 'url' ? '✓' : l(locale, '复制 URL', 'Copy URL', '複製 URL')}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={runQuery}
                    disabled={loading}
                    className="shrink-0 bg-brand-primary px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[3px_3px_0_0_#141414] transition-colors hover:bg-brand-dark disabled:opacity-60"
                  >
                    {loading
                      ? l(locale, '请求中...', 'Sending...', '請求中...')
                      : l(locale, '▶ Send 发送请求', '▶ Send Request', '▶ Send 發送請求')}
                  </button>
                </div>
              </div>

              {/* C. Request Tabs: Query Params | cURL | Response Schema */}
              <div>
                <div className="flex border-b border-brand-line bg-brand-paper/40 px-5">
                  <button
                    type="button"
                    onClick={() => setReqTab('params')}
                    className={`border-b-2 px-4 py-2.5 text-xs font-bold transition-colors ${
                      reqTab === 'params'
                        ? 'border-brand-primary bg-white text-brand-primary'
                        : 'border-transparent text-brand-muted hover:text-brand-ink'
                    }`}
                  >
                    Query Params <span className="ml-1 rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[10px] text-brand-primary">5</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setReqTab('curl')}
                    className={`border-b-2 px-4 py-2.5 text-xs font-bold transition-colors ${
                      reqTab === 'curl'
                        ? 'border-brand-primary bg-white text-brand-primary'
                        : 'border-transparent text-brand-muted hover:text-brand-ink'
                    }`}
                  >
                    cURL / Code
                  </button>
                  <button
                    type="button"
                    onClick={() => setReqTab('schema')}
                    className={`border-b-2 px-4 py-2.5 text-xs font-bold transition-colors ${
                      reqTab === 'schema'
                        ? 'border-brand-primary bg-white text-brand-primary'
                        : 'border-transparent text-brand-muted hover:text-brand-ink'
                    }`}
                  >
                    {l(locale, '返回字段说明 (Schema)', 'Response Schema', '回傳欄位說明 (Schema)')}
                  </button>
                </div>

                {/* Tab 1: Postman-style Query Params Table */}
                {reqTab === 'params' && (
                  <div className="overflow-x-auto p-4 sm:px-5">
                    <table className="w-full border border-brand-line text-left text-xs">
                      <thead className="bg-brand-paper/70 text-[11px] uppercase text-brand-muted">
                        <tr>
                          <th className="w-36 border-b border-r border-brand-line px-3 py-2 font-mono">
                            {l(locale, 'Key (参数名)', 'Key', 'Key (參數名)')}
                          </th>
                          <th className="w-72 border-b border-r border-brand-line px-3 py-2 font-mono">
                            {l(locale, 'Value (参数值)', 'Value', 'Value (參數值)')}
                          </th>
                          <th className="w-24 border-b border-r border-brand-line px-3 py-2">
                            {l(locale, '必填', 'Required', '必填')}
                          </th>
                          <th className="border-b border-brand-line px-3 py-2">
                            {l(locale, '说明 (v2.6 标准)', 'Description (v2.6 Spec)', '說明 (v2.6 標準)')}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-line">
                        {/* auth */}
                        <tr>
                          <td className="border-r border-brand-line px-3 py-2.5 font-mono font-bold text-brand-ink">
                            auth
                          </td>
                          <td className="border-r border-brand-line px-2 py-2">
                            <input
                              type="text"
                              value={customAuth}
                              onChange={(e) => setCustomAuth(e.target.value)}
                              placeholder={l(locale, '留空自动使用内置测试 Key', 'Built-in demo key (or paste yours)', '留空自動使用內建測試 Key')}
                              className="w-full border border-brand-line bg-brand-paper/40 px-2.5 py-1.5 font-mono text-xs text-brand-ink placeholder:text-brand-muted focus:border-brand-primary focus:bg-white focus:outline-none"
                            />
                          </td>
                          <td className="border-r border-brand-line px-3 py-2.5">
                            <span className="bg-brand-tint px-1.5 py-0.5 font-mono text-[10px] font-bold text-brand-primary">
                              {l(locale, 'String · 是', 'String · Yes', 'String · 是')}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 text-brand-muted">
                            {isIptvEndpoint
                              ? l(
                                  locale,
                                  '分配给该客户的鉴权。鉴权或域名不对返回 HTTP 401：{"errCode": -1, "errMsg": "unauthorized"}。',
                                  'Merchant auth token. Invalid auth or domain returns HTTP 401: {"errCode": -1, "errMsg": "unauthorized"}.',
                                  '分配給該客戶的鑑權。鑑權或域名不對回傳 HTTP 401：{"errCode": -1, "errMsg": "unauthorized"}。'
                                )
                              : l(
                                  locale,
                                  '商户 authorization key。当前已内置演示 Key，你也可以粘贴自己的正式 Key 联调。',
                                  'Merchant authorization key. Uses the built-in demo key by default, or paste your production key to test.',
                                  '商戶 authorization key。目前已內建演示 Key，你也可以貼上自己的正式 Key 聯調。'
                                )}
                          </td>
                        </tr>

                        {isIptvEndpoint ? (
                          <>
                            {/* domain (required for all 3 IPTV endpoints) */}
                            <tr>
                              <td className="border-r border-brand-line px-3 py-2.5 font-mono font-bold text-brand-ink">
                                domain
                              </td>
                              <td className="border-r border-brand-line px-2 py-2">
                                <input
                                  type="text"
                                  value={iptvDomain}
                                  onChange={(e) => setIptvDomain(e.target.value)}
                                  placeholder="customer.b-cdn.net"
                                  className="w-full border border-brand-line bg-white px-2.5 py-1.5 font-mono text-xs font-semibold text-brand-ink focus:border-brand-primary focus:outline-none"
                                />
                              </td>
                              <td className="border-r border-brand-line px-3 py-2.5">
                                <span className="bg-brand-tint px-1.5 py-0.5 font-mono text-[10px] font-bold text-brand-primary">
                                  {l(locale, 'String · 是', 'String · Yes', 'String · 是')}
                                </span>
                              </td>
                              <td className="px-3 py-2.5 text-brand-muted">
                                {l(
                                  locale,
                                  '该客户的播放域名，不要带 https://，例如 customer.b-cdn.net。',
                                  'Customer’s Bunny playback domain without https:// (e.g. customer.b-cdn.net).',
                                  '該客戶的播放域名，不要帶 https://，例如 customer.b-cdn.net。'
                                )}
                              </td>
                            </tr>

                            {/* iptv-play specific params */}
                            {endpoint === 'iptv-play' && (
                              <>
                                <tr>
                                  <td className="border-r border-brand-line px-3 py-2.5 font-mono font-bold text-brand-ink">
                                    id
                                  </td>
                                  <td className="border-r border-brand-line px-2 py-2">
                                    <input
                                      type="text"
                                      value={iptvChannelId}
                                      onChange={(e) => setIptvChannelId(e.target.value)}
                                      placeholder="bbc-one / sky-sports / arsenal-tv"
                                      className="w-full border border-brand-line bg-white px-2.5 py-1.5 font-mono text-xs font-semibold text-brand-ink focus:border-brand-primary focus:outline-none"
                                    />
                                  </td>
                                  <td className="border-r border-brand-line px-3 py-2.5">
                                    <span className="bg-brand-tint px-1.5 py-0.5 font-mono text-[10px] font-bold text-brand-primary">
                                      {l(locale, 'String · 是', 'String · Yes', 'String · 是')}
                                    </span>
                                  </td>
                                  <td className="px-3 py-2.5 text-brand-muted">
                                    {l(
                                      locale,
                                      '频道 ID（用频道列表或节目表里的 id，如 bbc-one、arsenal-tv）。清空可测试 400 missing id，填不存在的值可测试 404 unknown channel。',
                                      'Channel ID from /channels or /schedule (e.g. bbc-one, arsenal-tv). Clear to test 400 missing id, or enter an invalid ID to test 404 unknown channel.',
                                      '頻道 ID（用頻道列表或節目表裡的 id，如 bbc-one、arsenal-tv）。清空可測試 400 missing id，填不存在的值可測試 404 unknown channel。'
                                    )}
                                  </td>
                                </tr>

                                <tr>
                                  <td className="border-r border-brand-line px-3 py-2.5 font-mono font-bold text-brand-ink">
                                    bunny_token
                                  </td>
                                  <td className="border-r border-brand-line px-2 py-2">
                                    <input
                                      type="text"
                                      value={iptvBunnyToken}
                                      onChange={(e) => setIptvBunnyToken(e.target.value)}
                                      placeholder="Bunny Token Authentication Key"
                                      className="w-full border border-brand-line bg-white px-2.5 py-1.5 font-mono text-xs text-brand-ink focus:border-brand-primary focus:outline-none"
                                    />
                                  </td>
                                  <td className="border-r border-brand-line px-3 py-2.5">
                                    <span className="bg-brand-tint px-1.5 py-0.5 font-mono text-[10px] font-bold text-brand-primary">
                                      {l(locale, 'String · 是', 'String · Yes', 'String · 是')}
                                    </span>
                                  </td>
                                  <td className="px-3 py-2.5 text-brand-muted">
                                    {l(
                                      locale,
                                      '该客户 Bunny 播放域名的 Token Authentication 密钥。没传返回 HTTP 400 missing bunny token。',
                                      'Bunny Pull Zone Token Authentication key for your domain. Omitting returns HTTP 400 missing bunny token.',
                                      '該客戶 Bunny 播放域名的 Token Authentication 金鑰。沒傳回傳 HTTP 400 missing bunny token。'
                                    )}
                                  </td>
                                </tr>

                                <tr>
                                  <td className="border-r border-brand-line px-3 py-2.5 font-mono font-bold text-brand-ink">
                                    ttl
                                  </td>
                                  <td className="border-r border-brand-line px-2 py-2">
                                    <input
                                      type="number"
                                      min={60}
                                      max={2592000}
                                      value={iptvTtl}
                                      onChange={(e) => setIptvTtl(e.target.value)}
                                      placeholder={l(locale, '21600 (默认 6 小时)', '21600 (default 6h)', '21600 (預設 6 小時)')}
                                      className="w-full border border-brand-line bg-white px-2.5 py-1.5 font-mono text-xs text-brand-ink focus:border-brand-primary focus:outline-none"
                                    />
                                  </td>
                                  <td className="border-r border-brand-line px-3 py-2.5 font-mono text-[11px] text-brand-muted">
                                    {l(locale, 'Int · 否', 'Int · No', 'Int · 否')}
                                  </td>
                                  <td className="px-3 py-2.5 text-brand-muted">
                                    {l(
                                      locale,
                                      '可选，单位秒，范围 60 到 2592000（30 天），不传默认 6 小时（21600）。超出范围返回 400 ttl must be 60–2592000 seconds。',
                                      'Optional TTL in seconds (60 to 2592000, default 21600 / 6 hours). Out-of-range values return HTTP 400 ttl must be 60–2592000 seconds.',
                                      '可選，單位秒，範圍 60 到 2592000（30 天），不傳預設 6 小時（21600）。超出範圍回傳 400 ttl must be 60–2592000 seconds。'
                                    )}
                                  </td>
                                </tr>
                              </>
                            )}

                            {/* iptv-schedule specific params */}
                            {endpoint === 'iptv-schedule' && (
                              <>
                                <tr>
                                  <td className="border-r border-brand-line px-3 py-2.5 font-mono font-bold text-brand-ink">
                                    date
                                  </td>
                                  <td className="border-r border-brand-line px-2 py-2">
                                    <div className="flex items-center gap-1.5">
                                      <input
                                        type="text"
                                        value={iptvDate}
                                        onChange={(e) => setIptvDate(e.target.value)}
                                        placeholder={l(locale, '留空只查日期索引，或填 YYYY-MM-DD', 'Omit for date index, or YYYY-MM-DD', '留空只查日期索引，或填 YYYY-MM-DD')}
                                        className="flex-1 border border-brand-line bg-white px-2.5 py-1.5 font-mono text-xs text-brand-ink focus:border-brand-primary focus:outline-none"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const firstDay = Array.isArray((result?.payload as Record<string, unknown>)?.days)
                                            ? ((result?.payload as Record<string, unknown>).days as { date?: string }[])[0]?.date
                                            : ''
                                          setIptvDate(firstDay || new Date().toISOString().slice(0, 10))
                                        }}
                                        className="shrink-0 border border-brand-primary bg-brand-tint px-2 py-1.5 text-[11px] font-bold text-brand-primary hover:bg-brand-primary hover:text-white"
                                      >
                                        {l(locale, '填今日', 'Today', '填今日')}
                                      </button>
                                      {iptvDate && (
                                        <button
                                          type="button"
                                          onClick={() => setIptvDate('')}
                                          className="shrink-0 border border-brand-line bg-white px-2 py-1.5 text-[11px] text-brand-muted hover:text-brand-ink"
                                        >
                                          {l(locale, '清空', 'Clear', '清空')}
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                  <td className="border-r border-brand-line px-3 py-2.5 font-mono text-[11px] text-brand-muted">
                                    {l(locale, 'String · 否', 'String · No', 'String · 否')}
                                  </td>
                                  <td className="px-3 py-2.5 text-brand-muted">
                                    {l(
                                      locale,
                                      '时区固定 Asia/Shanghai。不传 date 只返回有节目的日期索引 days[]；传 date=YYYY-MM-DD 返回这一天的场次 groups[]，同时仍带回全部日期索引。格式不对返回 400 invalid date。',
                                      'Timezone is Asia/Shanghai. Omit date to return only the available days[] index; pass date=YYYY-MM-DD to return that day’s groups[] along with days[]. Invalid format returns 400 invalid date.',
                                      '時區固定 Asia/Shanghai。不傳 date 只回傳有節目的日期索引 days[]；傳 date=YYYY-MM-DD 回傳這一天的場次 groups[]，同時仍帶回全部日期索引。格式不對回傳 400 invalid date。'
                                    )}
                                  </td>
                                </tr>

                                <tr>
                                  <td className="border-r border-brand-line px-3 py-2.5 font-mono font-bold text-brand-ink">
                                    type
                                  </td>
                                  <td className="border-r border-brand-line px-2 py-2">
                                    <select
                                      value={iptvSportType}
                                      onChange={(e) => setIptvSportType(e.target.value)}
                                      className="w-full border border-brand-line bg-white px-2.5 py-1.5 font-mono text-xs font-semibold text-brand-ink focus:border-brand-primary focus:outline-none"
                                    >
                                      <option value="">
                                        {l(locale, '不传 — 返回当日全部运动', 'Omit — All sports for that date', '不傳 — 回傳當日全部運動')}
                                      </option>
                                      {IPTV_SCHEDULE_SPORT_TYPES.map((s) => (
                                        <option key={s.type} value={String(s.type)}>
                                          type={s.type} · {s.sport} ({l(locale, s.zh, s.en, s.tw)})
                                          {s.stable ? l(locale, ' ★稳定有数据', ' ★Active', ' ★穩定有資料') : ''}
                                        </option>
                                      ))}
                                    </select>
                                  </td>
                                  <td className="border-r border-brand-line px-3 py-2.5 font-mono text-[11px] text-brand-muted">
                                    {l(locale, 'Int · 否', 'Int · No', 'Int · 否')}
                                  </td>
                                  <td className="px-3 py-2.5 text-brand-muted">
                                    {l(
                                      locale,
                                      '可再加 type 只取一种运动（配合 date 使用）。稳定有节目数据的是板球、桌球、网球、英式橄榄球、高尔夫、MotoGP、赛车、赛马、冬季运动、田径、自行车。无法识别的 type 返回 400 missing sport。',
                                      'Optional sport filter (used with date). Consistently active categories: Cricket, Billiards, Tennis, Rugby League, Golf, MotoGP, Motorsport, Horse Racing, Winter Sports, Athletics, Cycling. Unknown type returns 400 missing sport.',
                                      '可再加 type 只取一種運動（配合 date 使用）。穩定有節目資料的是板球、桌球、網球、英式橄欖球、高爾夫、MotoGP、賽車、賽馬、冬季運動、田徑、自行車。無法識別的 type 回傳 400 missing sport。'
                                    )}
                                  </td>
                                </tr>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {/* type */}
                            <tr>
                              <td className="border-r border-brand-line px-3 py-2.5 font-mono font-bold text-brand-ink">
                                type
                              </td>
                              <td className="border-r border-brand-line px-2 py-2">
                                <select
                                  value={type}
                                  onChange={(e) => setType(Number(e.target.value))}
                                  className="w-full border border-brand-line bg-white px-2.5 py-1.5 font-mono text-xs font-semibold text-brand-ink focus:border-brand-primary focus:outline-none"
                                >
                                  {SPORT_TYPES.map((s) => (
                                    <option key={s.id} value={s.id}>
                                      {s.id} — {l(locale, s.zh, s.en, s['zh-TW'])}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td className="border-r border-brand-line px-3 py-2.5">
                                <span className="bg-brand-tint px-1.5 py-0.5 font-mono text-[10px] font-bold text-brand-primary">
                                  {l(locale, 'Int · 是', 'Int · Yes', 'Int · 是')}
                                </span>
                              </td>
                              <td className="px-3 py-2.5 text-brand-muted">
                                {l(locale, '体育赛事类型。', 'Sport category ID. ', '體育賽事類型。')}
                                {(type === 33 || type === 35 || type === 38) ? (
                                  <span className="ml-1 font-semibold text-brand-primary">
                                    {l(
                                      locale,
                                      '当前为 Event 型赛事（返回 matchType: "multi" 与 event/eventEn，不返回主客队）。',
                                      'Event-type sport (returns matchType: "multi" and event/eventEn instead of home/away teams).',
                                      '目前為 Event 型賽事（回傳 matchType: "multi" 與 event/eventEn，不回傳主客隊）。'
                                    )}
                                  </span>
                                ) : (
                                  l(
                                    locale,
                                    '切换下拉框将自动重新请求对应球类数据。',
                                    'Switching the dropdown automatically fetches live fixtures for that sport.',
                                    '切換下拉框將自動重新請求對應球類資料。'
                                  )
                                )}
                              </td>
                            </tr>

                            {/* isPlayed */}
                            <tr>
                              <td className="border-r border-brand-line px-3 py-2.5 font-mono font-bold text-brand-ink">
                                isPlayed
                              </td>
                              <td className="border-r border-brand-line px-2 py-2">
                                <select
                                  value={isPlayed}
                                  onChange={(e) => setIsPlayed(e.target.value)}
                                  className="w-full border border-brand-line bg-white px-2.5 py-1.5 font-mono text-xs font-semibold text-brand-ink focus:border-brand-primary focus:outline-none"
                                >
                                  <option value="1">
                                    {l(
                                      locale,
                                      '1 — 仅返回当前可播/在推赛事 (推荐)',
                                      '1 — Active live streams only (Recommended)',
                                      '1 — 僅回傳目前可播/在推賽事 (推薦)'
                                    )}
                                  </option>
                                  <option value="all">
                                    {l(
                                      locale,
                                      '不传 — 返回含未来 24h 未开赛赛程',
                                      'Omit — Include upcoming 24h fixtures',
                                      '不傳 — 回傳含未來 24h 未開賽賽程'
                                    )}
                                  </option>
                                </select>
                              </td>
                              <td className="border-r border-brand-line px-3 py-2.5 font-mono text-[11px] text-brand-muted">
                                {l(locale, 'Int · 否', 'Int · No', 'Int · 否')}
                              </td>
                              <td className="px-3 py-2.5 text-brand-muted">
                                {l(
                                  locale,
                                  '强烈建议生产环境传 isPlayed=1 过滤实际有效源，避免拉取大量未开赛空数据。',
                                  'Strongly recommended to pass isPlayed=1 in production to fetch only currently active streams.',
                                  '強烈建議生產環境傳 isPlayed=1 過濾實際有效源，避免拉取大量未開賽空資料。'
                                )}
                              </td>
                            </tr>

                            {/* gameId */}
                            <tr className={type === 151 ? 'bg-brand-tint/20' : 'opacity-60'}>
                              <td className="border-r border-brand-line px-3 py-2.5 font-mono font-bold text-brand-ink">
                                gameId
                              </td>
                              <td className="border-r border-brand-line px-2 py-2">
                                <select
                                  value={gameId}
                                  disabled={type !== 151}
                                  onChange={(e) => setGameId(e.target.value)}
                                  className="w-full border border-brand-line bg-white px-2.5 py-1.5 font-mono text-xs text-brand-ink disabled:cursor-not-allowed disabled:bg-brand-paper"
                                >
                                  {ESPORTS_GAMES.map((g) => (
                                    <option key={g.id} value={g.id}>
                                      {l(locale, g.zh, g.en, g['zh-TW'])}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td className="border-r border-brand-line px-3 py-2.5 font-mono text-[11px] text-brand-muted">
                                {l(locale, 'Int · 否', 'Int · No', 'Int · 否')}
                              </td>
                              <td className="px-3 py-2.5 text-brand-muted">
                                {l(
                                  locale,
                                  '电竞项目 ID（1: LOL, 2: CS:GO, 3: 王者荣耀, 4: Dota2）。仅当 type=151 时支持传参。',
                                  'Esports title ID (1: LOL, 2: CS:GO, 3: Honor of Kings, 4: Dota 2). Supported only when type=151.',
                                  '電競項目 ID（1: LOL, 2: CS:GO, 3: 王者榮耀, 4: Dota2）。僅當 type=151 時支援傳參。'
                                )}
                              </td>
                            </tr>

                            {/* page & pageSize */}
                            <tr>
                              <td className="border-r border-brand-line px-3 py-2.5 font-mono font-bold text-brand-ink">
                                page / pageSize
                              </td>
                              <td className="border-r border-brand-line px-2 py-2">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="number"
                                    min={1}
                                    max={50}
                                    value={page}
                                    onChange={(e) => setPage(e.target.value)}
                                    className="w-20 border border-brand-line bg-white px-2 py-1.5 font-mono text-xs text-brand-ink"
                                    title="page"
                                  />
                                  <span className="text-brand-muted">/</span>
                                  <select
                                    value={pageSize}
                                    onChange={(e) => setPageSize(e.target.value)}
                                    className="flex-1 border border-brand-line bg-white px-2 py-1.5 font-mono text-xs text-brand-ink"
                                  >
                                    <option value="5">
                                      {l(locale, 'pageSize = 5 (调试预览)', 'pageSize = 5 (Preview)', 'pageSize = 5 (調試預覽)')}
                                    </option>
                                    <option value="20">pageSize = 20</option>
                                    <option value="100">pageSize = 100</option>
                                    <option value="500">
                                      {l(locale, 'pageSize = 500 (默认)', 'pageSize = 500 (Default)', 'pageSize = 500 (預設)')}
                                    </option>
                                  </select>
                                </div>
                              </td>
                              <td className="border-r border-brand-line px-3 py-2.5 font-mono text-[11px] text-brand-muted">
                                {l(locale, 'Int · 否', 'Int · No', 'Int · 否')}
                              </td>
                              <td className="px-3 py-2.5 text-brand-muted">
                                {l(
                                  locale,
                                  '分页参数（默认 page=1, pageSize=500）。是否还有下一页请以返回中的 hasMore 字段为准。',
                                  'Pagination parameters (default page=1, pageSize=500). Check the returned hasMore boolean for additional pages.',
                                  '分頁參數（預設 page=1, pageSize=500）。是否還有下一頁請以回傳中的 hasMore 欄位為準。'
                                )}
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Tab 2: cURL */}
                {reqTab === 'curl' && (
                  <div className="p-4 sm:px-5">
                    <div className="flex items-center justify-between bg-brand-ink px-4 py-2 text-xs text-white">
                      <span className="font-mono text-[11px] text-white/70">Shell / cURL</span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText(curlSnippet)
                          setCopied('curl')
                          setTimeout(() => setCopied(null), 1500)
                        }}
                        className="font-mono text-[11px] font-bold text-brand-primary hover:underline"
                      >
                        {copied === 'curl' ? 'Copied ✓' : 'Copy cURL'}
                      </button>
                    </div>
                    <pre className="overflow-x-auto bg-[#111318] p-4 font-mono text-xs leading-6 text-emerald-300">
                      {curlSnippet}
                    </pre>
                  </div>
                )}

                {/* Tab 3: Response Schema (Full v2.6 Field Reference) */}
                {reqTab === 'schema' && isIptvEndpoint && (
                  <IptvSchemaPanel endpoint={endpoint} locale={locale} />
                )}
                {reqTab === 'schema' && !isIptvEndpoint && (
                  <StreamsSchemaPanel
                    locale={locale}
                    endpoint={endpoint === 'push-streams' ? 'push-streams' : 'streams'}
                  />
                )}
              </div>

              {/* D. Bottom Response Panel (Postman Response Console) */}
              <div className="flex flex-1 flex-col bg-[#111318] text-white">
                {/* Response Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#181B22] px-5 py-2.5 text-xs">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-white/80">
                      Response
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 font-mono text-[11px] font-bold ${
                        result?.ok && result.payload?.errCode === 0
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          result?.ok && result.payload?.errCode === 0 ? 'bg-emerald-400' : 'bg-amber-400'
                        }`}
                      />
                      Status:{' '}
                      {result
                        ? `${result.status} ${result.status === 200 ? 'OK' : result.status === 400 ? 'Bad Request' : result.status === 401 ? 'Unauthorized' : result.status === 404 ? 'Not Found' : 'Error'}`
                        : '—'}
                    </span>

                    {result?.payload?.errCode !== undefined && (
                      <span className="font-mono text-[11px] text-white/80">
                        errCode: <strong className="text-white">{result.payload.errCode}</strong> ({result.payload.errMsg || '—'})
                      </span>
                    )}

                    {result && (
                      <span className="font-mono text-[11px] text-white/60">
                        Time: <strong className="text-emerald-300">{result.durationMs} ms</strong> · Items:{' '}
                        <strong className="text-white">{matchCount}</strong>
                        {result.payload?.hasMore !== undefined ? ` · hasMore: ${String(result.payload.hasMore)}` : ''}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!jsonFormatted) return
                      navigator.clipboard?.writeText(jsonFormatted)
                      setCopied('json')
                      setTimeout(() => setCopied(null), 1500)
                    }}
                    className="rounded bg-white/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-white hover:bg-white/20"
                  >
                    {copied === 'json' ? 'Copied JSON ✓' : 'Copy Body'}
                  </button>
                </div>

                {/* Redaction tip when using demo key */}
                {result?.usingDefaultAuth && endpoint === 'streams' && (
                  <div className="border-b border-white/10 bg-brand-primary/15 px-5 py-1.5 text-[11px] text-white/90">
                    {l(
                      locale,
                      '💡 演示 Key 安全提示：赛事数据与 streamInfo 参数均为源站实时返回，仅将 liveList[].url 播放路径脱敏以防爬虫盗链。在上方 Query Params 填入你的正式 auth 即可返回完整未脱敏地址。',
                      '💡 Demo key note: fixtures and streamInfo are live; only liveList[].url paths are redacted against scraping. Paste your merchant auth above for full URLs.',
                      '💡 演示 Key 安全提示：賽事資料與 streamInfo 參數均為源站即時回傳，僅將 liveList[].url 播放路徑脫敏以防爬蟲盜鏈。在上方 Query Params 填入你的正式 auth 即可回傳完整未脫敏地址。'
                    )}
                  </div>
                )}

                {/* JSON Body Output */}
                <div className="relative flex-1 p-5 font-mono text-xs leading-5">
                  {loading ? (
                    <div className="flex h-72 items-center justify-center text-white/50">
                      {l(locale, '正在请求 api.sla.homes ...', 'Requesting api.sla.homes ...', '正在請求 api.sla.homes ...')}
                    </div>
                  ) : (
                    <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap break-words text-emerald-200/95">
                      {jsonFormatted || '// Click "Send" to inspect live response'}
                    </pre>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
