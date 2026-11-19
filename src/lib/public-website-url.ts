/** A public http(s) website. App names, localhost, and loopback addresses are rejected. */
export function isPublicWebsiteUrl(raw: string): boolean {
  const original = raw.trim()
  if (!original) return false
  if (/local\s*host/i.test(original)) return false

  const withScheme = /^https?:\/\//i.test(original) ? original : `https://${original}`
  let url: URL
  try {
    url = new URL(withScheme)
  } catch {
    return false
  }

  if (url.username || url.password) return false
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return false

  const host = url.hostname.replace(/\.$/, '').toLowerCase()
  if (!host || host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local')) return false
  if (host === '127.0.0.1' || host === '0.0.0.0' || host === '::1' || host === '[::1]') return false
  if (!/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,24}$/i.test(host)) return false
  return true
}
