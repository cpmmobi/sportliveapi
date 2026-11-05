const STREAMS_URL = 'https://api.sla.homes/lives/streams'
const MATCH_TTL_MS = 25_000
const MAX_PAGES = 6
// 当前密钥已开通的运动类型。未开通的 type 会返回 HTML，不在这里请求。
const SPORT_TYPES = [1, 3, 12, 13, 14, 16, 17, 18, 19, 33, 35, 36, 38]

export type PreviewLine = {
  name: string
  nameEn: string
  isPlayed: boolean
  screenshot: string | null
  width: number | null
  height: number | null
  frameRate: number | null
  publishTime: string
}

/** Event-style sports: combat / motorsport / wrestling — API returns event name, not home/away. */
export const EVENT_SPORT_TYPES = new Set([33, 35, 38])

export type PreviewMatch = {
  id: string
  type: number
  sport: string
  sportEn: string
  league: string
  leagueEn: string
  leagueLogo: string | null
  /** Event title for type 33/35/38 (e.g. AEW Dynamite). Empty for team sports. */
  event: string
  eventEn: string
  matchType: string
  home: string
  homeEn: string
  homeLogo: string | null
  away: string
  awayEn: string
  awayLogo: string | null
  homeScore: number | null
  awayScore: number | null
  progress: string
  date: number
  dateStr: string
  isPlayed: boolean
  screenshot: string | null
  lines: PreviewLine[]
}

export type StreamsPreview = {
  matches: PreviewMatch[]
  updatedAt: string
  error: string | null
}

type RawMatch = Record<string, unknown>
type RawResponse = {
  errCode?: number
  data?: RawMatch[]
  hasMore?: boolean
  pageSize?: number
}

let matchCache: { at: number; payload: StreamsPreview } | null = null

function imageUrl(value: unknown): string | null {
  if (typeof value !== 'string' || !value.startsWith('https://')) return null
  let url: URL
  try {
    url = new URL(value)
  } catch {
    return null
  }
  const path = url.pathname.toLowerCase()
  if (path.includes('m3u8') || path.endsWith('.flv') || path.endsWith('.ts') || value.toLowerCase().includes('rtmp')) return null
  if (!/\.(png|jpe?g|webp|gif)$/.test(path)) return null
  return value
}

function text(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function num(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function mapLine(raw: unknown): PreviewLine | null {
  if (!raw || typeof raw !== 'object') return null
  const line = raw as RawMatch
  const info = line.streamInfo && typeof line.streamInfo === 'object' ? (line.streamInfo as RawMatch) : {}
  return {
    name: text(line.name),
    nameEn: text(line.nameEn),
    isPlayed: Boolean(line.isPlayed),
    screenshot: imageUrl(line.screenshot),
    width: num(info.Width),
    height: num(info.Height),
    frameRate: num(info.FrameRate),
    publishTime: text(info.PublishTime),
  }
}

function mapMatch(raw: RawMatch): PreviewMatch | null {
  const id = text(raw.matchId)
  if (!id) return null
  const lines = Array.isArray(raw.liveList) ? raw.liveList.map(mapLine).filter((line): line is PreviewLine => Boolean(line)) : []
  const screenshot = imageUrl(raw.screenshot) || lines.find((line) => line.screenshot)?.screenshot || null
  const type = num(raw.type) ?? 0
  const matchType = text(raw.matchType)
  const home = text(raw.home)
  const homeEn = text(raw.homeEn)
  const away = text(raw.away)
  const awayEn = text(raw.awayEn)
  // Event sports (wrestling / combat / motorsport) expose event/eventEn; some payloads only fill home.
  let event = text(raw.event) || text(raw.eventName) || text(raw.matchName)
  let eventEn = text(raw.eventEn) || text(raw.eventNameEn) || text(raw.matchNameEn)
  if (EVENT_SPORT_TYPES.has(type) || matchType === 'multi') {
    if (!event && home && !away) event = home
    if (!eventEn && homeEn && !awayEn) eventEn = homeEn
  }
  return {
    id,
    type,
    sport: text(raw.sportName),
    sportEn: text(raw.sportNameEn),
    league: text(raw.leagueName),
    leagueEn: text(raw.leagueNameEn),
    leagueLogo: imageUrl(raw.leagueLogo),
    event,
    eventEn,
    matchType: matchType || (EVENT_SPORT_TYPES.has(type) ? 'multi' : ''),
    home,
    homeEn,
    homeLogo: imageUrl(raw.homeLogo),
    away,
    awayEn,
    awayLogo: imageUrl(raw.awayLogo),
    homeScore: num(raw.homeScore),
    awayScore: num(raw.awayScore),
    progress: text(raw.progress),
    date: num(raw.date) ?? 0,
    dateStr: text(raw.dateStr),
    isPlayed: Boolean(raw.isPlayed),
    screenshot,
    lines,
  }
}

async function fetchJson(url: string): Promise<RawResponse | null> {
  const response = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(12_000) })
  const body = await response.text()
  const trimmed = body.trim()
  if (!trimmed.startsWith('{')) return null
  try {
    return JSON.parse(trimmed) as RawResponse
  } catch {
    return null
  }
}

async function fetchType(auth: string, type: number): Promise<PreviewMatch[]> {
  const matches: PreviewMatch[] = []
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const payload = await fetchJson(
      `${STREAMS_URL}?auth=${encodeURIComponent(auth)}&type=${type}&isPlayed=1&page=${page}`
    )
    if (!payload || payload.errCode !== 0 || !Array.isArray(payload.data)) break
    const liveMatches = payload.data
      .map(mapMatch)
      .filter((match): match is PreviewMatch => Boolean(match && match.isPlayed && match.screenshot))
    matches.push(...liveMatches)
    const pageSize = payload.pageSize || 500
    if (payload.data.length < pageSize && !payload.hasMore) break
  }
  return matches
}

export async function getStreamsPreview(): Promise<StreamsPreview> {
  if (matchCache && Date.now() - matchCache.at < MATCH_TTL_MS) return matchCache.payload
  const auth = process.env.SLA_STREAMS_AUTH
  if (!auth) {
    return { matches: [], updatedAt: new Date().toISOString(), error: 'missing_auth' }
  }
  try {
    const groups = await Promise.all(SPORT_TYPES.map((type) => fetchType(auth, type)))
    const byId = new Map<string, PreviewMatch>()
    for (const match of groups.flat()) byId.set(match.id, match)
    const matches = [...byId.values()].sort((a, b) => {
      if (a.isPlayed !== b.isPlayed) return a.isPlayed ? -1 : 1
      return a.date - b.date
    })
    const payload: StreamsPreview = { matches, updatedAt: new Date().toISOString(), error: null }
    matchCache = { at: Date.now(), payload }
    return payload
  } catch {
    if (matchCache) return matchCache.payload
    return { matches: [], updatedAt: new Date().toISOString(), error: 'upstream' }
  }
}
