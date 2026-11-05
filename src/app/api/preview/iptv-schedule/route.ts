import { NextRequest, NextResponse } from 'next/server'
import { fetchIptvSchedule } from '@/lib/iptv-schedule'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date') || undefined
  const payload = await fetchIptvSchedule(date)
  return NextResponse.json(payload, { headers: { 'Cache-Control': 'no-store' } })
}
