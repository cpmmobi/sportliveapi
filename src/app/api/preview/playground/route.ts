import { NextRequest, NextResponse } from 'next/server'
import iptvCatalog from '@/content/iptv-channels.json'

export const dynamic = 'force-dynamic'

const ENDPOINTS: Record<string, string> = {
  streams: 'https://api.sla.homes/lives/streams',
  'push-streams': 'https://api.sla.homes/lives/push-streams',
  'iptv-channels': 'https://iptv.sla.homes/v1/iptv/channels',
  'iptv-play': 'https://iptv.sla.homes/v1/iptv/play',
  'iptv-schedule': 'https://iptv.sla.homes/v1/iptv/schedule',
}

// 默认演示密钥（由服务端代填，前端只展示脱敏占位，避免泄露真实流地址与密钥）
const DEFAULT_PLAYGROUND_AUTH = process.env.SLA_PLAYGROUND_AUTH || '6aebe6515c0020a997225d88'
const DEFAULT_IPTV_DOMAIN = 'customer.b-cdn.net'

const ALLOWED_STREAM_TYPES = new Set([1, 3, 12, 13, 14, 16, 17, 18, 19, 33, 35, 36, 38, 91, 92, 94, 151])
const ALLOWED_GAMES = new Set([1, 2, 3, 4])

// IPTV 节目表支持的 19 种运动 type -> sport 标识映射
const IPTV_SCHEDULE_TYPES: Record<number, string> = {
  1: 'soccer',
  3: 'cricket',
  12: 'football',
  13: 'tennis',
  14: 'billiards',
  15: 'golf',
  16: 'baseball',
  17: 'hockey',
  18: 'basketball',
  19: 'rugby-league',
  33: 'combat',
  34: 'motogp',
  35: 'f1',
  38: 'wrestling',
  39: 'motorsport',
  40: 'horse-racing',
  41: 'winter-sports',
  42: 'athletics',
  43: 'cycling',
}

const SPORT_TO_IPTV_TYPE: Record<string, number> = Object.fromEntries(
  Object.entries(IPTV_SCHEDULE_TYPES).map(([k, v]) => [v, Number(k)])
)

function redactStreamUrl(value: unknown): unknown {
  if (typeof value !== 'string' || !value) return value
  try {
    const u = new URL(value)
    const ext = u.pathname.endsWith('.flv') ? '.flv' : u.pathname.endsWith('.m3u8') ? '.m3u8' : ''
    return `${u.protocol}//${u.host}/live/[REDACTED_IN_PLAYGROUND]${ext}`
  } catch {
    if (value.startsWith('rtmp://')) {
      return 'rtmp://[REDACTED_IN_PLAYGROUND]'
    }
    return '[REDACTED_IN_PLAYGROUND]'
  }
}

function sanitizePayload(payload: unknown, maskUrls: boolean): unknown {
  if (!maskUrls || !payload || typeof payload !== 'object') return payload
  const root = payload as Record<string, unknown>
  if (!Array.isArray(root.data)) return payload
  return {
    ...root,
    data: root.data.map((item) => {
      if (!item || typeof item !== 'object') return item
      const match = item as Record<string, unknown>
      if (!Array.isArray(match.liveList)) return match
      return {
        ...match,
        liveList: match.liveList.map((line) => {
          if (!line || typeof line !== 'object') return line
          const l = line as Record<string, unknown>
          if (!('url' in l)) return l
          return {
            ...l,
            url: redactStreamUrl(l.url),
          }
        }),
      }
    }),
  }
}

// 构建 IPTV 频道列表演示数据（基于真实频道目录）
function buildDemoIptvChannels() {
  const flatChannels = iptvCatalog.groups.flatMap((group) =>
    group.channels.map((ch) => ({
      id: ch.id,
      name: ch.name,
      logo: `/logos/${ch.id}.png`,
      kind: 'tv' as const,
      country: ch.country,
    }))
  )

  return {
    errCode: 0,
    errMsg: 'success',
    channels: flatChannels,
    leagues: [
      {
        id: 'premier-league',
        name: 'Premier League',
        logo: '/logos/premier-league.png',
        country: 'GB',
        channels: [
          {
            id: 'arsenal-tv',
            name: 'Arsenal TV',
            logo: '/logos/arsenal-tv.png',
            kind: 'team',
            country: 'GB',
          },
          {
            id: 'chelsea-tv',
            name: 'Chelsea TV',
            logo: '/logos/chelsea-tv.png',
            kind: 'team',
            country: 'GB',
          },
        ],
      },
      {
        id: 'wnba',
        name: 'WNBA',
        logo: '/logos/wnba.png',
        country: 'US',
        channels: [
          {
            id: 'wnba-dream',
            name: 'WNBA Dream',
            logo: '/logos/wnba-dream.png',
            kind: 'team',
            country: 'US',
          },
          {
            id: 'wnba-liberty',
            name: 'WNBA Liberty',
            logo: '/logos/wnba-liberty.png',
            kind: 'team',
            country: 'US',
          },
        ],
      },
    ],
  }
}

async function handleIptvPlayground(req: NextRequest, endpointKey: string, baseUrl: string) {
  const { searchParams } = req.nextUrl
  const customAuth = (searchParams.get('auth') || '').trim()
  const domain = (searchParams.get('domain') || DEFAULT_IPTV_DOMAIN).trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, '')

  const usingDefaultDemo =
    (!customAuth || customAuth === 'DEMO_KEY' || customAuth === DEFAULT_PLAYGROUND_AUTH) &&
    (!domain || domain === DEFAULT_IPTV_DOMAIN)

  const auth = customAuth && customAuth !== 'DEMO_KEY' ? customAuth : DEFAULT_PLAYGROUND_AUTH
  const maskedAuth = `${DEFAULT_PLAYGROUND_AUTH.slice(0, 6)}...${DEFAULT_PLAYGROUND_AUTH.slice(-4)}`

  const startedAt = Date.now()

  // 如果客户填入了真实的自有 domain，则直接请求上游 https://iptv.sla.homes
  if (!usingDefaultDemo) {
    const upstreamParams = new URLSearchParams()
    upstreamParams.set('auth', auth)
    upstreamParams.set('domain', domain)

    if (endpointKey === 'iptv-play') {
      const id = searchParams.get('id') || ''
      const bunnyToken = searchParams.get('bunny_token') || ''
      const ttl = searchParams.get('ttl') || ''
      if (id) upstreamParams.set('id', id)
      if (bunnyToken) upstreamParams.set('bunny_token', bunnyToken)
      if (ttl) upstreamParams.set('ttl', ttl)
    } else if (endpointKey === 'iptv-schedule') {
      const date = searchParams.get('date') || ''
      const type = searchParams.get('type') || ''
      if (date) upstreamParams.set('date', date)
      if (type) upstreamParams.set('type', type)
    }

    const upstreamUrl = `${baseUrl}?${upstreamParams.toString()}`
    try {
      const res = await fetch(upstreamUrl, { cache: 'no-store', signal: AbortSignal.timeout(10_000) })
      const durationMs = Date.now() - startedAt
      const text = await res.text()
      const parsed = JSON.parse(text)
      return NextResponse.json(
        {
          ok: res.ok && parsed.errCode === 0,
          status: res.status,
          durationMs,
          requestUrl: upstreamUrl,
          usingDefaultAuth: false,
          payload: parsed,
        },
        { status: 200, headers: { 'Cache-Control': 'no-store' } }
      )
    } catch (err) {
      const durationMs = Date.now() - startedAt
      return NextResponse.json(
        {
          ok: false,
          status: 504,
          durationMs,
          requestUrl: upstreamUrl,
          error: 'upstream_timeout',
          message: err instanceof Error ? err.message : 'Request failed',
        },
        { status: 200, headers: { 'Cache-Control': 'no-store' } }
      )
    }
  }

  // 默认演示模式：严格遵循 iptv.sla.homes 规范返回真实结构与参数校验
  if (endpointKey === 'iptv-channels') {
    const displayUrl = `${baseUrl}?auth=${maskedAuth}&domain=${domain}`
    const payload = buildDemoIptvChannels()
    return NextResponse.json(
      {
        ok: true,
        status: 200,
        durationMs: Date.now() - startedAt + 18,
        requestUrl: displayUrl,
        usingDefaultAuth: true,
        payload,
      },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    )
  }

  if (endpointKey === 'iptv-play') {
    const id = (searchParams.get('id') || '').trim()
    const bunnyToken = (searchParams.get('bunny_token') || '').trim()
    const ttlRaw = (searchParams.get('ttl') || '').trim()

    const displayParams = new URLSearchParams()
    displayParams.set('auth', maskedAuth)
    displayParams.set('domain', domain)
    if (id) displayParams.set('id', id)
    if (bunnyToken) displayParams.set('bunny_token', bunnyToken)
    if (ttlRaw) displayParams.set('ttl', ttlRaw)
    const displayUrl = `${baseUrl}?${displayParams.toString()}`

    if (!id) {
      return NextResponse.json({
        ok: false,
        status: 400,
        durationMs: 12,
        requestUrl: displayUrl,
        usingDefaultAuth: true,
        payload: { errCode: -1, errMsg: 'missing id' },
      })
    }

    if (!bunnyToken) {
      return NextResponse.json({
        ok: false,
        status: 400,
        durationMs: 12,
        requestUrl: displayUrl,
        usingDefaultAuth: true,
        payload: { errCode: -1, errMsg: 'missing bunny token' },
      })
    }

    let ttl = 21600
    if (ttlRaw) {
      const parsedTtl = Number(ttlRaw)
      if (!Number.isInteger(parsedTtl) || parsedTtl < 60 || parsedTtl > 2592000) {
        return NextResponse.json({
          ok: false,
          status: 400,
          durationMs: 14,
          requestUrl: displayUrl,
          usingDefaultAuth: true,
          payload: { errCode: -1, errMsg: 'ttl must be 60–2592000 seconds' },
        })
      }
      ttl = parsedTtl
    }

    const demoCatalog = buildDemoIptvChannels()
    const tvFound = demoCatalog.channels.find((c) => c.id === id)
    const teamFound = demoCatalog.leagues.flatMap((l) => l.channels).find((c) => c.id === id)
    const found = tvFound || teamFound

    if (!found) {
      return NextResponse.json({
        ok: false,
        status: 404,
        durationMs: 16,
        requestUrl: displayUrl,
        usingDefaultAuth: true,
        payload: { errCode: -1, errMsg: 'unknown channel' },
      })
    }

    const expiresAt = Math.floor(Date.now() / 1000) + ttl
    const signedPath = `/bcdn_token=HS256-DEMO_SIGNATURE&token_path=%2Fhls%2F${encodeURIComponent(id)}%2F&expires=${expiresAt}/hls/${id}/index.m3u8`

    return NextResponse.json({
      ok: true,
      status: 200,
      durationMs: 24,
      requestUrl: displayUrl,
      usingDefaultAuth: true,
      payload: {
        errCode: 0,
        errMsg: 'success',
        id: found.id,
        name: found.name,
        kind: found.kind,
        path: signedPath,
        url: `https://${domain}${signedPath}`,
        expires_at: expiresAt,
      },
    })
  }

  // iptv-schedule
  const dateParam = (searchParams.get('date') || '').trim()
  const typeParam = (searchParams.get('type') || '').trim()

  const displayParams = new URLSearchParams()
  displayParams.set('auth', maskedAuth)
  displayParams.set('domain', domain)
  if (dateParam) displayParams.set('date', dateParam)
  if (typeParam) displayParams.set('type', typeParam)
  const displayUrl = `${baseUrl}?${displayParams.toString()}`

  if (dateParam && !/^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
    return NextResponse.json({
      ok: false,
      status: 400,
      durationMs: 15,
      requestUrl: displayUrl,
      usingDefaultAuth: true,
      payload: { errCode: -1, errMsg: 'invalid date' },
    })
  }

  let filterSportSlug: string | null = null
  if (typeParam) {
    const typeNum = Number(typeParam)
    if (!Number.isInteger(typeNum) || !IPTV_SCHEDULE_TYPES[typeNum]) {
      return NextResponse.json({
        ok: false,
        status: 400,
        durationMs: 15,
        requestUrl: displayUrl,
        usingDefaultAuth: true,
        payload: { errCode: -1, errMsg: 'missing sport' },
      })
    }
    filterSportSlug = IPTV_SCHEDULE_TYPES[typeNum]
  }

  try {
    const upstreamScheduleUrl = dateParam
      ? `https://matchpass.tv/api/iptv/schedule?date=${encodeURIComponent(dateParam)}`
      : 'https://matchpass.tv/api/iptv/schedule'
    const res = await fetch(upstreamScheduleUrl, { cache: 'no-store', signal: AbortSignal.timeout(10_000) })
    const raw = (await res.json()) as Record<string, unknown>
    const durationMs = Date.now() - startedAt

    const days = Array.isArray(raw.days)
      ? raw.days.map((d: Record<string, unknown>) => ({
          date: typeof d.date === 'string' ? d.date : '',
          count: typeof d.count === 'number' ? d.count : 0,
          live: typeof d.live === 'number' ? d.live : 0,
        }))
      : []

    if (!dateParam) {
      return NextResponse.json({
        ok: true,
        status: 200,
        durationMs,
        requestUrl: displayUrl,
        usingDefaultAuth: true,
        payload: {
          errCode: 0,
          errMsg: 'success',
          fetched_at: typeof raw.fetched_at === 'string' ? raw.fetched_at : new Date().toISOString(),
          timezone: 'Asia/Shanghai',
          days,
        },
      })
    }

    const rawGroups = Array.isArray(raw.groups) ? raw.groups : []
    const groups = rawGroups
      .map((g: Record<string, unknown>) => {
        const sportSlug = typeof g.sport === 'string' ? g.sport : ''
        const mappedType = typeof g.type === 'number' ? g.type : SPORT_TO_IPTV_TYPE[sportSlug] || 0
        return {
          league: typeof g.league === 'string' ? g.league : '',
          league_id: typeof g.league_id === 'string' ? g.league_id : '',
          sport: sportSlug,
          type: mappedType,
          matches: Array.isArray(g.matches)
            ? g.matches.map((m: Record<string, unknown>) => ({
                name: typeof m.name === 'string' ? m.name : '',
                home: typeof m.home === 'string' ? m.home : '',
                away: typeof m.away === 'string' ? m.away : '',
                start_at: typeof m.start_at === 'number' ? m.start_at : 0,
                end_at: typeof m.end_at === 'number' ? m.end_at : 0,
                live: Boolean(m.live),
                channels: Array.isArray(m.channels)
                  ? m.channels.map((c: Record<string, unknown>) => {
                      const cid = typeof c.id === 'string' ? c.id : ''
                      return {
                        id: cid,
                        name: typeof c.name === 'string' ? c.name : cid,
                        logo: cid ? `/logos/${cid}.png` : undefined,
                        kind: 'tv',
                      }
                    })
                  : [],
              }))
            : [],
        }
      })
      .filter((g) => !filterSportSlug || g.sport === filterSportSlug || String(g.type) === typeParam)

    return NextResponse.json({
      ok: true,
      status: 200,
      durationMs,
      requestUrl: displayUrl,
      usingDefaultAuth: true,
      payload: {
        errCode: 0,
        errMsg: 'success',
        fetched_at: typeof raw.fetched_at === 'string' ? raw.fetched_at : new Date().toISOString(),
        timezone: 'Asia/Shanghai',
        date: dateParam,
        days,
        groups,
      },
    })
  } catch (err) {
    return NextResponse.json({
      ok: false,
      status: 504,
      durationMs: Date.now() - startedAt,
      requestUrl: displayUrl,
      error: 'upstream_timeout',
      message: err instanceof Error ? err.message : 'Schedule request failed',
    })
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const endpointKey = searchParams.get('endpoint') || 'streams'
  const baseUrl = ENDPOINTS[endpointKey]

  if (!baseUrl) {
    return NextResponse.json(
      { ok: false, error: 'invalid_endpoint', message: 'Unsupported endpoint.' },
      { status: 400 }
    )
  }

  if (endpointKey.startsWith('iptv-')) {
    return handleIptvPlayground(req, endpointKey, baseUrl)
  }

  const typeRaw = Number(searchParams.get('type') || '1')
  const type = ALLOWED_STREAM_TYPES.has(typeRaw) ? typeRaw : 1

  const customAuth = (searchParams.get('auth') || '').trim()
  const usingDefaultAuth = !customAuth || customAuth === 'DEMO_KEY' || customAuth === DEFAULT_PLAYGROUND_AUTH
  const auth = customAuth && customAuth !== 'DEMO_KEY' ? customAuth : DEFAULT_PLAYGROUND_AUTH

  const isPlayed = searchParams.get('isPlayed')
  const gameIdRaw = searchParams.get('gameId')
  const pageRaw = Number(searchParams.get('page') || '1')
  const pageSizeRaw = Number(searchParams.get('pageSize') || '10')

  const page = Number.isFinite(pageRaw) && pageRaw >= 1 ? Math.min(pageRaw, 50) : 1
  const pageSize = Number.isFinite(pageSizeRaw) && pageSizeRaw >= 1 ? Math.min(pageSizeRaw, 500) : 10

  const upstreamParams = new URLSearchParams()
  upstreamParams.set('auth', auth)
  upstreamParams.set('type', String(type))
  if (isPlayed === '1' || isPlayed === '0') {
    upstreamParams.set('isPlayed', isPlayed)
  }
  if (type === 151 && gameIdRaw) {
    const gameId = Number(gameIdRaw)
    if (ALLOWED_GAMES.has(gameId)) {
      upstreamParams.set('gameId', String(gameId))
    }
  }
  upstreamParams.set('page', String(page))
  upstreamParams.set('pageSize', String(pageSize))

  const upstreamUrl = `${baseUrl}?${upstreamParams.toString()}`

  const displayParams = new URLSearchParams(upstreamParams)
  if (usingDefaultAuth) {
    displayParams.set('auth', `${DEFAULT_PLAYGROUND_AUTH.slice(0, 6)}...${DEFAULT_PLAYGROUND_AUTH.slice(-4)}`)
  }
  const displayUrl = `${baseUrl}?${displayParams.toString()}`

  const startedAt = Date.now()
  try {
    const response = await fetch(upstreamUrl, {
      cache: 'no-store',
      signal: AbortSignal.timeout(12_000),
    })
    const durationMs = Date.now() - startedAt
    const rawText = await response.text()
    const trimmed = rawText.trim()

    if (!trimmed.startsWith('{')) {
      return NextResponse.json(
        {
          ok: false,
          status: response.status,
          durationMs,
          requestUrl: displayUrl,
          error: 'non_json_response',
          message:
            'Upstream returned non-JSON content (this sport type or push permission may not be enabled for the current key).',
          rawPreview: trimmed.slice(0, 240),
        },
        { status: 200, headers: { 'Cache-Control': 'no-store' } }
      )
    }

    const parsed = JSON.parse(trimmed)
    const data = sanitizePayload(parsed, usingDefaultAuth)

    return NextResponse.json(
      {
        ok: true,
        status: response.status,
        durationMs,
        requestUrl: displayUrl,
        usingDefaultAuth,
        payload: data,
      },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    )
  } catch (err) {
    const durationMs = Date.now() - startedAt
    return NextResponse.json(
      {
        ok: false,
        status: 504,
        durationMs,
        requestUrl: displayUrl,
        error: 'upstream_timeout',
        message: err instanceof Error ? err.message : 'Request failed',
      },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    )
  }
}
