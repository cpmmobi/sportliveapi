import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const SCHEDULE_URL = 'https://matchpass.tv/api/iptv/schedule'

export type IptvDaySummary = {
  date: string
  count: number
  live: number
}

export type IptvScheduleChannel = {
  id: string
  name: string
  logo: string
}

export type IptvScheduleMatch = {
  name: string
  home: string
  away: string
  startAt: number
  endAt: number
  live: boolean
  channels: IptvScheduleChannel[]
}

export type IptvScheduleGroup = {
  league: string
  sport: string
  matches: IptvScheduleMatch[]
}

export type IptvSchedulePayload = {
  date: string
  days: IptvDaySummary[]
  groups: IptvScheduleGroup[]
}

const cache = new Map<string, { at: number; payload: IptvSchedulePayload }>()
const TTL_MS = 60_000

async function fetchIptvSchedule(date?: string): Promise<IptvSchedulePayload> {
  const key = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : 'default'
  const hit = cache.get(key)
  if (hit && Date.now() - hit.at < TTL_MS) return hit.payload

  try {
    const firstUrl = key === 'default' ? SCHEDULE_URL : `${SCHEDULE_URL}?date=${encodeURIComponent(key)}`
    const firstRes = await fetch(firstUrl, { cache: 'no-store', signal: AbortSignal.timeout(10_000) })
    const firstJson = (await firstRes.json()) as Record<string, unknown>

    const days: IptvDaySummary[] = Array.isArray(firstJson.days)
      ? firstJson.days
          .map((d: Record<string, unknown>) => ({
            date: typeof d.date === 'string' ? d.date : '',
            count: typeof d.count === 'number' ? d.count : 0,
            live: typeof d.live === 'number' ? d.live : 0,
          }))
          .slice(0, 5)
      : []

    let targetDate = typeof firstJson.date === 'string' ? firstJson.date : days[0]?.date || ''
    let rawGroups = Array.isArray(firstJson.groups) ? firstJson.groups : null

    if (!rawGroups && targetDate) {
      const dayRes = await fetch(`${SCHEDULE_URL}?date=${encodeURIComponent(targetDate)}`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(10_000),
      })
      const dayJson = (await dayRes.json()) as Record<string, unknown>
      rawGroups = Array.isArray(dayJson.groups) ? dayJson.groups : []
    }

    const groups: IptvScheduleGroup[] = (rawGroups || []).map((g: Record<string, unknown>) => ({
      league: typeof g.league === 'string' ? g.league : '',
      sport: typeof g.sport === 'string' ? g.sport : '',
      matches: Array.isArray(g.matches)
        ? g.matches.map((m: Record<string, unknown>) => ({
            name: typeof m.name === 'string' ? m.name : '',
            home: typeof m.home === 'string' ? m.home : '',
            away: typeof m.away === 'string' ? m.away : '',
            startAt: typeof m.start_at === 'number' ? m.start_at : 0,
            endAt: typeof m.end_at === 'number' ? m.end_at : 0,
            live: Boolean(m.live),
            channels: Array.isArray(m.channels)
              ? m.channels.map((c: Record<string, unknown>) => {
                  const id = typeof c.id === 'string' ? c.id : ''
                  return {
                    id,
                    name: typeof c.name === 'string' ? c.name : id,
                    logo: id ? `/iptv-logos/${id}.png` : '',
                  }
                })
              : [],
          }))
        : [],
    }))

    const payload: IptvSchedulePayload = {
      date: targetDate,
      days,
      groups,
    }
    cache.set(key, { at: Date.now(), payload })
    if (targetDate) cache.set(targetDate, { at: Date.now(), payload })
    return payload
  } catch {
    if (hit) return hit.payload
    return { date: '', days: [], groups: [] }
  }
}

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date') || undefined
  const payload = await fetchIptvSchedule(date)
  return NextResponse.json(payload, { headers: { 'Cache-Control': 'no-store' } })
}
