export interface LeadIcebreaker {
  /** Chinese note for Elon: what to ask, and what not to do. */
  direction: string
  /** Message in the customer's site language. Empty when he should not reach out. */
  copyText: string
}

type Locale = 'zh' | 'zh-TW' | 'en'

const WESTERN = new Set(['EU_UK', 'NA', 'LATAM'])

const SPORT_ZH: Record<string, string> = {
  football: '足球',
  basketball: '篮球',
  cricket: '板球',
  tennis: '网球',
  baseball: '棒球',
  hockey: '冰球',
  american_football: '美式橄榄球',
  rugby: '英式橄榄球',
  esports: '电竞',
  combat_wrestling: '格斗',
  motorsport: '赛车',
  golf: '高尔夫',
  snooker: '斯诺克',
}

const SPORT_EN: Record<string, string> = {
  football: 'football',
  basketball: 'basketball',
  cricket: 'cricket',
  tennis: 'tennis',
  baseball: 'baseball',
  hockey: 'ice hockey',
  american_football: 'American football',
  rugby: 'rugby',
  esports: 'esports',
  combat_wrestling: 'combat sports',
  motorsport: 'motorsport',
  golf: 'golf',
  snooker: 'snooker',
}

export function buildLeadIcebreaker(input: {
  grade: 'A' | 'B' | 'C'
  useCase: string
  projectStage?: string
  sportsInterests?: string[]
  platform?: string
  targetCountries?: string
  locale?: string
}): LeadIcebreaker {
  const products = (input.useCase || '').split(',').map((item) => item.trim()).filter(Boolean)
  const hasLines = products.includes('website_app')
  const hasIptv = products.includes('iptv')
  const hasObs = products.includes('obs_streaming')
  const onlyObs = products.length === 1 && hasObs
  const sports = hasLines ? input.sportsInterests || [] : []
  const locale = normalizeLocale(input.locale)
  const site = (input.platform || '').trim()
  const westernOnly = isWesternOnly(input.targetCountries)
  const askChannels = input.grade === 'A' && westernOnly && hasLines && !hasIptv

  if (input.grade === 'C') {
    return {
      direction: '先不要主动联系，也不要发报价。客户如果回复了确认信，再问：这个网址是不是他自己的，以及最先上哪 1 到 3 个球类。',
      copyText: '',
    }
  }

  const direction = buildDirection({
    grade: input.grade,
    hasLines,
    hasIptv,
    hasObs,
    onlyObs,
    sportCount: sports.length,
    westernOnly,
  })

  const copyText =
    input.grade === 'A'
      ? buildACopy({ locale, hasLines, hasIptv, onlyObs, sports, site, askChannels })
      : buildBCopy({ locale, hasLines, hasIptv, hasObs, sports, site })

  return { direction, copyText }
}

function buildDirection(input: {
  grade: 'A' | 'B'
  hasLines: boolean
  hasIptv: boolean
  hasObs: boolean
  onlyObs: boolean
  sportCount: number
  westernOnly: boolean
}): string {
  const parts: string[] = []
  if (input.grade === 'B') {
    parts.push('不发报价单。先报起步价，只问两件事：网址是不是他自己的，范围怎么收窄。')
  } else if (input.onlyObs) {
    parts.push('破冰只问一件事：主播是自己解说再播到自己的直播间，还是要观众在网站或 App 里看比赛。足篮和人数不要再问。先不要报价，也先不要问进哪个群。')
  } else if (input.hasLines && input.hasIptv) {
    parts.push('先问这次先接线路还是先接频道。不要两套一起报价。')
  } else if (input.hasLines) {
    parts.push('确认网址是他正在用的产品。球类不要让他重选。')
  } else if (input.hasIptv) {
    parts.push('确认网址和观众所在地。不要展开球类菜单。')
  } else {
    parts.push('先确认网址是不是他的产品，再确认他这次要接哪一块。')
  }
  if (input.grade === 'A' && input.westernOnly && input.hasLines && !input.hasIptv) {
    parts.push('观众只在欧洲、北美或拉美。如果他只要英超、NBA 这类，问全球体育频道是否已经够用。')
  }
  if (input.grade === 'A' && input.sportCount > 0) {
    parts.push('报价草稿你看过再发，破冰先不要报总价。')
  }
  return parts.join('')
}

function buildACopy(input: {
  locale: Locale
  hasLines: boolean
  hasIptv: boolean
  onlyObs: boolean
  sports: string[]
  site: string
  askChannels: boolean
}): string {
  const sportsText = formatSports(input.sports, input.locale)
  if (input.locale === 'en') {
    if (input.onlyObs) {
      return `Hi, this is Elon from SportLiveAPI. Before I prepare a quote for ${input.site || 'your studio'}, which one is it: your hosts commentate the matches and stream them out, or viewers watch the matches on your website or app?`
    }
    if (input.hasLines && input.hasIptv) {
      return `Hi, this is Elon from SportLiveAPI. I saw ${input.site || 'your site'} and that you are looking at both live match lines${sportsText ? ` (${sportsText})` : ''} and global sports channels. Which one should we set up first?`
    }
    if (input.hasLines) {
      const channelQ = input.askChannels
        ? ' If you only need top competitions such as the Premier League and the NBA, would Global Sports Channels already cover it?'
        : ''
      return `Hi, this is Elon from SportLiveAPI. I saw you want live match lines${sportsText ? ` for ${sportsText}` : ''} on ${input.site || 'your site'}. Is this your live product?${channelQ}`
    }
    return `Hi, this is Elon from SportLiveAPI. I saw you want Global Sports Channels for ${input.site || 'your site'}. Is this your live product, and should we set the channels up for the regions you selected?`
  }

  const hello = input.locale === 'zh-TW' ? '你好，我是 SportLiveAPI 的 Elon。' : '你好，我是 SportLiveAPI 的 Elon。'
  if (input.onlyObs) {
    return input.locale === 'zh-TW'
      ? `${hello}給 ${input.site || '你的工作室'} 報價之前，先確認一件事：是主播自己解說再播出去，還是要觀眾在網站或 App 裡看比賽？`
      : `${hello}给 ${input.site || '你的工作室'} 报价之前，先确认一件事：是主播自己解说再播出去，还是要观众在网站或 App 里看比赛？`
  }
  if (input.hasLines && input.hasIptv) {
    return input.locale === 'zh-TW'
      ? `${hello}看到 ${input.site || '你的網站'} 同時在看賽事直播線路${sportsText ? `（${sportsText}）` : ''}和全球體育頻道。這次先接哪一塊？`
      : `${hello}看到 ${input.site || '你的网站'} 同时在看赛事直播线路${sportsText ? `（${sportsText}）` : ''}和全球体育频道。这次先接哪一块？`
  }
  if (input.hasLines) {
    const channelQ =
      input.locale === 'zh-TW'
        ? '如果只要英超、NBA 這類歐美頂級賽事，全球體育頻道是否已經夠用？'
        : '如果只要英超、NBA 这类欧美顶级赛事，全球体育频道是否已经够用？'
    const base =
      input.locale === 'zh-TW'
        ? `${hello}看到你要接入${sportsText ? `${sportsText}的` : ''}賽事直播線路，網站是 ${input.site || '你填的網址'}。這個網址是你現在的產品嗎？`
        : `${hello}看到你要接入${sportsText ? `${sportsText}的` : ''}赛事直播线路，网站是 ${input.site || '你填的网址'}。这个网址是你现在的产品吗？`
    return input.askChannels ? `${base}${channelQ}` : base
  }
  return input.locale === 'zh-TW'
    ? `${hello}看到你要接全球體育頻道，網站是 ${input.site || '你填的網址'}。這個網址是你現在的產品嗎？頻道按你選的觀眾所在地來配就可以嗎？`
    : `${hello}看到你要接全球体育频道，网站是 ${input.site || '你填的网址'}。这个网址是你现在的产品吗？频道按你选的观众所在地来配就可以吗？`
}

function buildBCopy(input: {
  locale: Locale
  hasLines: boolean
  hasIptv: boolean
  hasObs: boolean
  sports: string[]
  site: string
}): string {
  const site = input.site || (input.locale === 'en' ? 'the address you left' : '你填的网址')
  const price = startingPrice({ ...input, locale: input.locale })
  if (input.locale === 'en') {
    const second = input.hasLines
      ? 'Which 1 to 3 sports do you want to launch first?'
      : 'Do you want the full channel package, or match lines on your own schedule as well?'
    return `Hi, this is Elon from SportLiveAPI. ${price} Two questions before I prepare a quote: 1. Is ${site} your own site, or a product you want yours to resemble? 2. ${second}`
  }
  const second =
    input.locale === 'zh-TW'
      ? input.hasLines
        ? '最先要上的是哪 1 到 3 個球類？'
        : '你要的是整包頻道，還是之後也會按單場接進自己的賽程？'
      : input.hasLines
        ? '最先要上的是哪 1 到 3 个球类？'
        : '你要的是整包频道，还是之后也会按单场接进自己的赛程？'
  const ownSite =
    input.locale === 'zh-TW'
      ? `${site} 是你自己的網站，還是你想做成類似的產品？`
      : `${site} 是你自己的网站，还是你想做成类似的产品？`
  const hello = '你好，我是 SportLiveAPI 的 Elon。'
  const leadIn =
    input.locale === 'zh-TW' ? '先確認兩件事，我再報價：' : '先确认两件事后我再报价：'
  return `${hello}${price}${leadIn}1. ${ownSite} 2. ${second}`
}

function startingPrice(input: {
  locale: Locale
  hasLines: boolean
  hasIptv: boolean
  hasObs: boolean
  sports: string[]
}): string {
  const hasFootball = input.sports.includes('football')
  if (input.locale === 'en') {
    const bits: string[] = []
    if (input.hasLines) {
      bits.push(hasFootball ? 'Football match lines start at $1,500 per month.' : 'Match lines are priced by sport, and some sports start at $500 per month.')
    }
    if (input.hasIptv) bits.push('Global Sports Channels are $1,600 per month.')
    if (input.hasObs) bits.push('The OBS bot is $100 per person per month, with a minimum of 3 people.')
    return bits.join(' ')
  }
  const bits: string[] = []
  if (input.hasLines) {
    bits.push(
      input.locale === 'zh-TW'
        ? hasFootball
          ? '足球賽事線路每月 1,500 美元起。'
          : '賽事線路按球類計價，部分球類每月 500 美元起。'
        : hasFootball
          ? '足球赛事线路每月 1,500 美元起。'
          : '赛事线路按球类计价，部分球类每月 500 美元起。'
    )
  }
  if (input.hasIptv) {
    bits.push(input.locale === 'zh-TW' ? '全球體育頻道每月 1,600 美元。' : '全球体育频道每月 1,600 美元。')
  }
  if (input.hasObs) {
    bits.push(
      input.locale === 'zh-TW'
        ? 'OBS 機器人每人每月 100 美元，至少 3 人。'
        : 'OBS 机器人每人每月 100 美元，至少 3 人。'
    )
  }
  return bits.join('')
}

function formatSports(sports: string[], locale: Locale): string {
  const names = sports.slice(0, 3).map((sport) => sportName(sport, locale))
  if (names.length === 0) return ''
  if (locale === 'en') return names.join(', ')
  return names.join('、')
}

function sportName(sport: string, locale: Locale): string {
  if (sport.startsWith('other:')) return sport.slice(6)
  if (locale === 'en') return SPORT_EN[sport] || sport
  return SPORT_ZH[sport] || sport
}

function isWesternOnly(targetCountries?: string): boolean {
  const parts = (targetCountries || '').split(',').map((item) => item.trim()).filter(Boolean)
  return parts.length > 0 && parts.every((part) => WESTERN.has(part))
}

function normalizeLocale(locale?: string): Locale {
  if (locale === 'en') return 'en'
  if (locale === 'zh-TW') return 'zh-TW'
  return 'zh'
}
