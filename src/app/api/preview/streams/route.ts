import { NextResponse } from 'next/server'
import { getStreamsPreview } from '@/lib/streams-preview'

export const dynamic = 'force-dynamic'

export async function GET() {
  const preview = await getStreamsPreview()
  return NextResponse.json(preview, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
