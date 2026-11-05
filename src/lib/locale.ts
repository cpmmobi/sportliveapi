export const locales = ['zh', 'en', 'zh-TW'] as const

export const siteLocales = [
  { code: 'en', label: 'English' },
  { code: 'zh-TW', label: '中文繁體' },
  { code: 'zh', label: '中文简体' },
] as const

export type SiteLocaleCode = (typeof siteLocales)[number]['code']

export type Locale = (typeof locales)[number]

export function resolveLocale(input: string): Locale {
  if (input === 'zh') return 'zh'
  if (input === 'zh-TW') return 'zh-TW'
  return 'en'
}

export type Copy = Record<Locale, string>

export type CopyLines = Record<Locale, string[]>

export function tx(locale: string, copy: Copy): string {
  return copy[resolveLocale(locale)]
}

export function txLines(locale: string, lines: CopyLines): string[] {
  return lines[resolveLocale(locale)]
}
