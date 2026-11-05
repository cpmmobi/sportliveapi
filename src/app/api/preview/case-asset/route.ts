import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

const ASSET_MAP: Record<
  string,
  { publicFile: string; cursorAsset: string; contentType: string }
> = {
  scores: {
    publicFile: path.join(process.cwd(), 'public', 'cases', 'case-scores-source.png'),
    cursorAsset:
      '/Users/roy/.cursor/projects/Users-roy-AI-sportliveapi/assets/image-d2cfc3fb-d741-45f6-b160-63bcc2522fff.png',
    contentType: 'image/png',
  },
  player: {
    publicFile: path.join(process.cwd(), 'public', 'cases', 'case-player-source.jpg'),
    cursorAsset:
      '/Users/roy/.cursor/projects/Users-roy-AI-sportliveapi/assets/image-7174ea16-2c92-456d-873b-4d63c1cce607.jpg',
    contentType: 'image/jpeg',
  },
  'en-scores': {
    publicFile: path.join(process.cwd(), 'public', 'cases', 'case-en-scores-source.jpg'),
    cursorAsset:
      '/Users/roy/.cursor/projects/Users-roy-AI-sportliveapi/assets/image-948fd261-f46e-4f90-89c0-aaa8c2c4e848.jpg',
    contentType: 'image/jpeg',
  },
  'en-player': {
    publicFile: path.join(process.cwd(), 'public', 'cases', 'case-en-player-source.jpg'),
    cursorAsset:
      '/Users/roy/.cursor/projects/Users-roy-AI-sportliveapi/assets/image-b77082c0-411e-4a80-a55f-43a89f19bab9.jpg',
    contentType: 'image/jpeg',
  },
}

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name') || 'scores'
  const item = ASSET_MAP[name]
  if (!item) {
    return new NextResponse('Not found', { status: 404 })
  }

  try {
    let buffer: Buffer | null = null
    if (fs.existsSync(item.publicFile)) {
      buffer = fs.readFileSync(item.publicFile)
    } else if (fs.existsSync(item.cursorAsset)) {
      buffer = fs.readFileSync(item.cursorAsset)
      try {
        fs.mkdirSync(path.dirname(item.publicFile), { recursive: true })
        fs.writeFileSync(item.publicFile, buffer)
      } catch {
        // ignore write error on read-only fs
      }
    }

    if (!buffer) {
      return new NextResponse('Asset not found', { status: 404 })
    }

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': item.contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch {
    return new NextResponse('Failed to read asset', { status: 500 })
  }
}
