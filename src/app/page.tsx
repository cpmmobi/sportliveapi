import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

const SUPPORTED = ['en', 'zh', 'zh-TW'] as const

type Supported = typeof SUPPORTED[number]

function mapLangToSupported(lang: string): Supported | null {
  const l = lang.toLowerCase()
  if (l.startsWith('en')) return 'en'
  if (
    l === 'zh-tw' ||
    l === 'zh-hk' ||
    l === 'zh-mo' ||
    l.startsWith('zh-hant')
  ) return 'zh-TW'
  if (
    l === 'zh' ||
    l === 'zh-cn' ||
    l === 'zh-sg' ||
    l.startsWith('zh-hans')
  ) return 'zh'
  if (l.startsWith('zh')) return 'zh'
  return null
}

export default function RootRedirect() {
  // 基于 Accept-Language 做一次兜底重定向（与中间件语言协商一致）
  const h = headers()
  const al = h.get('accept-language') || ''

  let target: Supported = 'zh'
  if (al) {
    // 解析成按权重排序的语言标签
    const langs = al.split(',').map(s => s.trim())
    for (const item of langs) {
      const [tag] = item.split(';')
      const mapped = mapLangToSupported(tag)
      if (mapped) { target = mapped; break }
    }
  }

  redirect(`/${target}`)
}