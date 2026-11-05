'use client'

export type IptvEndpointKey = 'iptv-channels' | 'iptv-play' | 'iptv-schedule'

export const IPTV_SCHEDULE_SPORT_TYPES = [
  { type: 1, sport: 'soccer', zh: '足球', en: 'Soccer', tw: '足球', stable: false },
  { type: 3, sport: 'cricket', zh: '板球', en: 'Cricket', tw: '板球', stable: true },
  { type: 12, sport: 'football', zh: '美式橄榄球', en: 'American Football', tw: '美式橄欖球', stable: false },
  { type: 13, sport: 'tennis', zh: '网球', en: 'Tennis', tw: '網球', stable: true },
  { type: 14, sport: 'billiards', zh: '桌球', en: 'Billiards / Snooker', tw: '桌球', stable: true },
  { type: 15, sport: 'golf', zh: '高尔夫', en: 'Golf', tw: '高爾夫', stable: true },
  { type: 16, sport: 'baseball', zh: '棒球', en: 'Baseball', tw: '棒球', stable: false },
  { type: 17, sport: 'hockey', zh: '冰球', en: 'Ice Hockey', tw: '冰球', stable: false },
  { type: 18, sport: 'basketball', zh: '篮球', en: 'Basketball', tw: '籃球', stable: false },
  { type: 19, sport: 'rugby-league', zh: '英式橄榄球', en: 'Rugby League', tw: '英式橄欖球', stable: true },
  { type: 33, sport: 'combat', zh: '格斗', en: 'Combat Sports', tw: '格鬥', stable: false },
  { type: 34, sport: 'motogp', zh: 'MotoGP', en: 'MotoGP', tw: 'MotoGP', stable: true },
  { type: 35, sport: 'f1', zh: 'F1', en: 'Formula 1', tw: 'F1', stable: false },
  { type: 38, sport: 'wrestling', zh: '摔跤', en: 'Wrestling', tw: '摔跤', stable: false },
  { type: 39, sport: 'motorsport', zh: '赛车', en: 'Motorsport', tw: '賽車', stable: true },
  { type: 40, sport: 'horse-racing', zh: '赛马', en: 'Horse Racing', tw: '賽馬', stable: true },
  { type: 41, sport: 'winter-sports', zh: '冬季运动', en: 'Winter Sports', tw: '冬季運動', stable: true },
  { type: 42, sport: 'athletics', zh: '田径', en: 'Athletics', tw: '田徑', stable: true },
  { type: 43, sport: 'cycling', zh: '自行车', en: 'Cycling', tw: '自行車', stable: true },
] as const

function l(locale: string, zh: string, en: string, tw?: string) {
  if (locale === 'zh') return zh
  if (locale === 'zh-TW') return tw || zh
  return en
}

export function IptvSchemaPanel({
  endpoint,
  locale,
}: {
  endpoint: IptvEndpointKey
  locale: string
}) {
  const thField = l(locale, '字段名', 'Field', '欄位名')
  const thType = l(locale, '类型', 'Type', '類型')
  const thDesc = l(locale, '说明', 'Description', '說明')

  if (endpoint === 'iptv-channels') {
    return (
      <div className="space-y-6 p-4 sm:px-5">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
              {l(
                locale,
                '1.1 基础返回结构与鉴权错误 (GET /v1/iptv/channels)',
                '1.1 Root Response & Auth Errors (GET /v1/iptv/channels)',
                '1.1 基礎回傳結構與鑑權錯誤 (GET /v1/iptv/channels)'
              )}
            </h4>
            <span className="text-[11px] text-brand-muted">
              {l(
                locale,
                '鉴权或域名不对返回 HTTP 401：',
                'Invalid auth or domain returns HTTP 401: ',
                '鑑權或域名不對回傳 HTTP 401：'
              )}
              <code>{`{"errCode": -1, "errMsg": "unauthorized"}`}</code>
            </span>
          </div>
          <div className="mt-2 overflow-x-auto border border-brand-line">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-paper/70 text-[11px] text-brand-muted">
                <tr>
                  <th className="w-36 border-b border-r border-brand-line px-3 py-2 font-mono">{thField}</th>
                  <th className="w-24 border-b border-r border-brand-line px-3 py-2 font-mono">{thType}</th>
                  <th className="border-b border-brand-line px-3 py-2">{thDesc}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-line">
                <tr>
                  <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-ink">errCode</td>
                  <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">Integer</td>
                  <td className="px-3 py-2 text-brand-ink">
                    {l(
                      locale,
                      '成功时为 0；鉴权或域名不对返回 -1（HTTP 401）',
                      '0 on success; -1 on invalid auth or domain (HTTP 401)',
                      '成功時為 0；鑑權或域名不對回傳 -1（HTTP 401）'
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-ink">errMsg</td>
                  <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">String</td>
                  <td className="px-3 py-2 text-brand-ink">
                    {l(
                      locale,
                      '成功时为 "success"；失败时为 "unauthorized"',
                      '"success" when ok; "unauthorized" on failure',
                      '成功時為 "success"；失敗時為 "unauthorized"'
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-ink">channels</td>
                  <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">Array</td>
                  <td className="px-3 py-2 text-brand-ink">
                    {l(
                      locale,
                      '线性电视频道数组（kind: "tv"）',
                      'Linear TV channels array (kind: "tv")',
                      '線性電視頻道陣列（kind: "tv"）'
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-ink">leagues</td>
                  <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">Array</td>
                  <td className="px-3 py-2 text-brand-ink">
                    {l(
                      locale,
                      '按联赛分组的球队台列表，内部 channels[] 为球队台（kind: "team"）',
                      'Team channels grouped by league; inner channels[] have kind: "team"',
                      '按聯賽分組的球隊台列表，內部 channels[] 為球隊台（kind: "team"）'
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
              {l(
                locale,
                '1.2 channels[] 与 leagues[].channels[] 频道字段',
                '1.2 Channel Object Fields (channels[] & leagues[].channels[])',
                '1.2 channels[] 與 leagues[].channels[] 頻道欄位'
              )}
            </h4>
            <div className="mt-2 overflow-x-auto border border-brand-line">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-paper/70 text-[11px] text-brand-muted">
                  <tr>
                    <th className="w-28 border-b border-r border-brand-line px-3 py-2 font-mono">{thField}</th>
                    <th className="w-20 border-b border-r border-brand-line px-3 py-2 font-mono">{thType}</th>
                    <th className="border-b border-brand-line px-3 py-2">{thDesc}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-line">
                  <tr>
                    <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-primary">id</td>
                    <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">String</td>
                    <td className="px-3 py-2 text-brand-ink">
                      {l(
                        locale,
                        '频道唯一 ID（如 "bbc-one"、"arsenal-tv"），用于调播放地址接口',
                        'Unique channel ID (e.g. "bbc-one", "arsenal-tv") passed to /v1/iptv/play',
                        '頻道唯一 ID（如 "bbc-one"、"arsenal-tv"），用於調播放地址介面'
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-ink">name</td>
                    <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">String</td>
                    <td className="px-3 py-2 text-brand-ink">
                      {l(locale, '频道显示名称（如 "BBC One"）', 'Display name (e.g. "BBC One")', '頻道顯示名稱（如 "BBC One"）')}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-ink">logo</td>
                    <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">String</td>
                    <td className="px-3 py-2 text-brand-ink">
                      {l(
                        locale,
                        '台标路径（如 "/logos/bbc-one.png"）。有值时拼到 https://iptv.sla.homes 后面即可，台标不需要鉴权；没有台标时不返回',
                        'Logo path (e.g. "/logos/bbc-one.png"). Prefix with https://iptv.sla.homes (no auth needed); omitted if unavailable',
                        '台標路徑（如 "/logos/bbc-one.png"）。有值時拼到 https://iptv.sla.homes 後面即可，台標不需要鑑權；沒有台標時不回傳'
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-ink">kind</td>
                    <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">String</td>
                    <td className="px-3 py-2 text-brand-ink">
                      {l(locale, '"tv"（线性台）或 "team"（球队台）', '"tv" (linear network) or "team" (club channel)', '"tv"（線性台）或 "team"（球隊台）')}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-ink">country</td>
                    <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">String</td>
                    <td className="px-3 py-2 text-brand-ink">
                      {l(
                        locale,
                        '国家或地区代码（ISO 3166-1 alpha-2，如 "GB"、"US"）',
                        'Country code (ISO 3166-1 alpha-2, e.g. "GB", "US")',
                        '國家或地區代碼（ISO 3166-1 alpha-2，如 "GB"、"US"）'
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
              {l(locale, '1.3 leagues[] 联赛分组对象字段', '1.3 League Group Fields (leagues[])', '1.3 leagues[] 聯賽分組物件欄位')}
            </h4>
            <div className="mt-2 overflow-x-auto border border-brand-line">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-paper/70 text-[11px] text-brand-muted">
                  <tr>
                    <th className="w-28 border-b border-r border-brand-line px-3 py-2 font-mono">{thField}</th>
                    <th className="w-20 border-b border-r border-brand-line px-3 py-2 font-mono">{thType}</th>
                    <th className="border-b border-brand-line px-3 py-2">{thDesc}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-line">
                  <tr>
                    <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-ink">id</td>
                    <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">String</td>
                    <td className="px-3 py-2 text-brand-ink">
                      {l(
                        locale,
                        '联赛 ID（如 "premier-league"）。注意：这不是频道 id，不能传给播放接口',
                        'League ID (e.g. "premier-league"). Note: Not a channel ID — do not pass to /play',
                        '聯賽 ID（如 "premier-league"）。注意：這不是頻道 id，不能傳給播放介面'
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-ink">name</td>
                    <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">String</td>
                    <td className="px-3 py-2 text-brand-ink">
                      {l(locale, '联赛显示名（如 "Premier League"）', 'League display name (e.g. "Premier League")', '聯賽顯示名（如 "Premier League"）')}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-ink">logo</td>
                    <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">String</td>
                    <td className="px-3 py-2 text-brand-ink">
                      {l(
                        locale,
                        '联赛图标路径（如 "/logos/premier-league.png"），拼到 https://iptv.sla.homes 后访问',
                        'League logo path (e.g. "/logos/premier-league.png"), prefix with https://iptv.sla.homes',
                        '聯賽圖示路徑（如 "/logos/premier-league.png"），拼到 https://iptv.sla.homes 後訪問'
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-ink">country</td>
                    <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">String</td>
                    <td className="px-3 py-2 text-brand-ink">
                      {l(locale, '联赛所属国家代码（如 "GB"）', 'Country code of the league (e.g. "GB")', '聯賽所屬國家代碼（如 "GB"）')}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-ink">channels</td>
                    <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">Array</td>
                    <td className="px-3 py-2 text-brand-ink">
                      {l(
                        locale,
                        '该联赛下的球队台数组（内部元素的 id 用于播放接口）',
                        'Team channels under this league (use each item’s id for /v1/iptv/play)',
                        '該聯賽下的球隊台陣列（內部元素的 id 用於播放介面）'
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (endpoint === 'iptv-play') {
    return (
      <div className="space-y-6 p-4 sm:px-5">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
              {l(locale, '2.1 返回字段说明 (GET /v1/iptv/play)', '2.1 Response Fields (GET /v1/iptv/play)', '2.1 回傳欄位說明 (GET /v1/iptv/play)')}
            </h4>
            <div className="mt-2 overflow-x-auto border border-brand-line">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-paper/70 text-[11px] text-brand-muted">
                  <tr>
                    <th className="w-32 border-b border-r border-brand-line px-3 py-2 font-mono">{thField}</th>
                    <th className="w-20 border-b border-r border-brand-line px-3 py-2 font-mono">{thType}</th>
                    <th className="border-b border-brand-line px-3 py-2">{thDesc}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-line">
                  <tr>
                    <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-ink">errCode / errMsg</td>
                    <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">Int / Str</td>
                    <td className="px-3 py-2 text-brand-ink">
                      {l(
                        locale,
                        '成功时为 0 与 "success"；失败时 errCode: -1',
                        '0 and "success" when ok; errCode: -1 on error',
                        '成功時為 0 與 "success"；失敗時 errCode: -1'
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-ink">id</td>
                    <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">String</td>
                    <td className="px-3 py-2 text-brand-ink">
                      {l(locale, '请求的频道 ID（如 "bbc-one"）', 'Requested channel ID (e.g. "bbc-one")', '請求的頻道 ID（如 "bbc-one"）')}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-ink">name</td>
                    <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">String</td>
                    <td className="px-3 py-2 text-brand-ink">
                      {l(locale, '频道显示名称（如 "BBC One"）', 'Channel display name (e.g. "BBC One")', '頻道顯示名稱（如 "BBC One"）')}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-ink">kind</td>
                    <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">String</td>
                    <td className="px-3 py-2 text-brand-ink">
                      <code>&quot;tv&quot;</code> {l(locale, '或', 'or', '或')} <code>&quot;team&quot;</code>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-ink">path</td>
                    <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">String</td>
                    <td className="px-3 py-2 text-brand-ink">
                      {l(locale, '带 Bunny 目录 Token 签名的相对路径', 'Relative path signed with Bunny directory token', '帶 Bunny 目錄 Token 簽名的相對路徑')}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-primary">url</td>
                    <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">String</td>
                    <td className="px-3 py-2 text-brand-ink">
                      {l(
                        locale,
                        '播放用完整地址。注意：url 里的 & 属于路径，不是查询参数。再套进别的链接时要把 & 编成 %26；不要在地址后面另加 ? 参数，否则签名失效',
                        'Full playable URL. Note: "&" inside url is part of the path, not a query string. Encode "&" as "%26" if nesting inside another URL, and do not append extra "?" query parameters or the signature will break.',
                        '播放用完整地址。注意：url 裡的 & 屬於路徑，不是查詢參數。再套進別的連結時要把 & 編成 %26；不要在地址後面另加 ? 參數，否則簽名失效'
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-ink">expires_at</td>
                    <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">Long</td>
                    <td className="px-3 py-2 text-brand-ink">
                      {l(locale, '过期时间的 Unix 秒（如 1790000000）', 'Expiration Unix timestamp in seconds (e.g. 1790000000)', '過期時間的 Unix 秒（如 1790000000）')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-5">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
              {l(locale, '2.2 错误码与 HTTP 状态对照表', '2.2 Error Codes & HTTP Status', '2.2 錯誤碼與 HTTP 狀態對照表')}
            </h4>
            <div className="mt-2 overflow-x-auto border border-brand-line">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-paper/70 text-[11px] text-brand-muted">
                  <tr>
                    <th className="border-b border-r border-brand-line px-3 py-2">{l(locale, '情况', 'Condition', '情況')}</th>
                    <th className="w-16 border-b border-r border-brand-line px-3 py-2 font-mono">HTTP</th>
                    <th className="border-b border-brand-line px-3 py-2 font-mono">errMsg</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-line">
                  <tr>
                    <td className="border-r border-brand-line px-3 py-2 text-brand-ink">
                      {l(locale, '鉴权或域名不对', 'Invalid auth or domain', '鑑權或域名不對')}
                    </td>
                    <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-amber-700">401</td>
                    <td className="px-3 py-2 font-mono text-brand-primary">unauthorized</td>
                  </tr>
                  <tr>
                    <td className="border-r border-brand-line px-3 py-2 text-brand-ink">
                      {l(locale, '没传 id', 'Missing id parameter', '沒傳 id')}
                    </td>
                    <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-amber-700">400</td>
                    <td className="px-3 py-2 font-mono text-brand-primary">missing id</td>
                  </tr>
                  <tr>
                    <td className="border-r border-brand-line px-3 py-2 text-brand-ink">
                      {l(locale, '没传 bunny_token', 'Missing bunny_token', '沒傳 bunny_token')}
                    </td>
                    <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-amber-700">400</td>
                    <td className="px-3 py-2 font-mono text-brand-primary">missing bunny token</td>
                  </tr>
                  <tr>
                    <td className="border-r border-brand-line px-3 py-2 text-brand-ink">
                      {l(locale, 'ttl 超出范围', 'ttl out of range', 'ttl 超出範圍')}
                    </td>
                    <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-amber-700">400</td>
                    <td className="px-3 py-2 font-mono text-brand-primary">ttl must be 60–2592000 seconds</td>
                  </tr>
                  <tr>
                    <td className="border-r border-brand-line px-3 py-2 text-brand-ink">
                      {l(locale, '频道不存在或该客户无权播放', 'Channel not found or not in plan', '頻道不存在或該客戶無權播放')}
                    </td>
                    <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-rose-700">404</td>
                    <td className="px-3 py-2 font-mono text-brand-primary">unknown channel</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // iptv-schedule
  return (
    <div className="space-y-6 p-4 sm:px-5">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
            {l(locale, '3.1 节目表返回字段说明 (GET /v1/iptv/schedule)', '3.1 Program Guide Response (GET /v1/iptv/schedule)', '3.1 節目表回傳欄位說明 (GET /v1/iptv/schedule)')}
          </h4>
          <p className="mt-1 text-xs text-brand-muted">
            {l(
              locale,
              '时区固定 Asia/Shanghai。已结束场次不返回；一场比赛只挂该客户能播的线性台（kind: "tv"），只有球队台的场次不会出现。',
              'Timezone is fixed to Asia/Shanghai. Finished events are omitted; each event only lists linear TV channels (kind: "tv") enabled for the customer.',
              '時區固定 Asia/Shanghai。已結束場次不回傳；一場比賽只掛該客戶能播的線性台（kind: "tv"），只有球隊台的場次不會出現。'
            )}
          </p>
          <div className="mt-2 overflow-x-auto border border-brand-line">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-paper/70 text-[11px] text-brand-muted">
                <tr>
                  <th className="w-40 border-b border-r border-brand-line px-3 py-2 font-mono">{thField}</th>
                  <th className="w-20 border-b border-r border-brand-line px-3 py-2 font-mono">{thType}</th>
                  <th className="border-b border-brand-line px-3 py-2">{thDesc}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-line">
                <tr>
                  <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-ink">fetched_at</td>
                  <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">String</td>
                  <td className="px-3 py-2 text-brand-ink">
                    {l(locale, '节目数据更新时间（UTC，如 "2026-11-05T01:00:00Z"）', 'Schedule data timestamp in UTC (e.g. "2026-11-05T01:00:00Z")', '節目資料更新時間（UTC，如 "2026-11-05T01:00:00Z"）')}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-ink">timezone</td>
                  <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">String</td>
                  <td className="px-3 py-2 text-brand-ink">
                    {l(locale, '固定为 "Asia/Shanghai"', 'Always "Asia/Shanghai"', '固定為 "Asia/Shanghai"')}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-ink">days[]</td>
                  <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">Array</td>
                  <td className="px-3 py-2 text-brand-ink">
                    {l(
                      locale,
                      '日期索引数组：{ date: "YYYY-MM-DD", count: 12, live: 2 }。不传 date 时只返回此索引；传 date 时仍一并带回',
                      'Date index array: { date: "YYYY-MM-DD", count: 12, live: 2 }. Returned alone when date is omitted, and also included when date is passed.',
                      '日期索引陣列：{ date: "YYYY-MM-DD", count: 12, live: 2 }。不傳 date 時只回傳此索引；傳 date 時仍一併帶回'
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-ink">date</td>
                  <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">String</td>
                  <td className="px-3 py-2 text-brand-ink">
                    {l(locale, '仅传入 date 参数时返回，表示当前查询日期', 'Returned when date is passed (YYYY-MM-DD)', '僅傳入 date 參數時回傳，表示目前查詢日期')}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-primary">groups[]</td>
                  <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">Array</td>
                  <td className="px-3 py-2 text-brand-ink">
                    {l(
                      locale,
                      '仅传入 date 时返回（当天无场次时为 []）。每个元素包含 league、league_id、sport、type 与 matches[]',
                      'Returned when date is passed ([] if no events). Each item contains league, league_id, sport, type, and matches[]',
                      '僅傳入 date 時回傳（當天無場次時為 []）。每個元素包含 league、league_id、sport、type 與 matches[]'
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-brand-line px-3 py-2 font-mono font-bold text-brand-ink">matches[]</td>
                  <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">Array</td>
                  <td className="px-3 py-2 text-brand-ink">
                    {l(
                      locale,
                      '单场节目：name、home、away、start_at (Unix秒)、end_at (Unix秒)、live (是否正在播出)、channels[]（用 channels[].id 调播放接口，logo 拼到 https://iptv.sla.homes 后访问）',
                      'Event object: name, home, away, start_at (Unix sec), end_at (Unix sec), live (boolean), and channels[] (pass channels[].id to /play; prefix logo with https://iptv.sla.homes)',
                      '單場節目：name、home、away、start_at (Unix秒)、end_at (Unix秒)、live (是否正在播出)、channels[]（用 channels[].id 調播放介面，logo 拼到 https://iptv.sla.homes 後訪問）'
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-3 border border-brand-line bg-brand-paper/40 p-3 text-xs text-brand-ink">
            <strong>{l(locale, '错误码（HTTP 400 / 401）：', 'Error Codes (HTTP 400 / 401):', '錯誤碼（HTTP 400 / 401）：')}</strong>
            <span className="ml-2">
              {l(
                locale,
                '鉴权/域名错误 → 401 unauthorized；date 格式不对 → 400 invalid date；type 无法识别 → 400 missing sport。',
                'Invalid auth/domain → 401 unauthorized; bad date format → 400 invalid date; unknown type → 400 missing sport.',
                '鑑權/域名錯誤 → 401 unauthorized；date 格式不對 → 400 invalid date；type 無法識別 → 400 missing sport。'
              )}
            </span>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="flex items-center justify-between">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
              {l(locale, '3.2 节目表 type 运动映射表（共 19 类）', '3.2 Sport Type Mapping (19 Categories)', '3.2 節目表 type 運動映射表（共 19 類）')}
            </h4>
            <span className="bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
              {l(locale, '绿色 = 稳定有节目数据', 'Green = Consistently Active', '綠色 = 穩定有節目資料')}
            </span>
          </div>
          <div className="mt-2 max-h-80 overflow-y-auto border border-brand-line">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-brand-paper text-[11px] text-brand-muted">
                <tr>
                  <th className="w-16 border-b border-r border-brand-line px-2.5 py-2 font-mono">type</th>
                  <th className="border-b border-r border-brand-line px-2.5 py-2 font-mono">sport</th>
                  <th className="border-b border-brand-line px-2.5 py-2">{l(locale, '运动', 'Category', '運動')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-line">
                {IPTV_SCHEDULE_SPORT_TYPES.map((item) => (
                  <tr key={item.type} className={item.stable ? 'bg-emerald-50/40' : ''}>
                    <td className="border-r border-brand-line px-2.5 py-1.5 font-mono font-bold text-brand-ink">
                      {item.type}
                    </td>
                    <td className="border-r border-brand-line px-2.5 py-1.5 font-mono text-brand-muted">
                      {item.sport}
                    </td>
                    <td className="px-2.5 py-1.5 text-brand-ink">
                      {l(locale, item.zh, item.en, item.tw)}
                      {item.stable && (
                        <span className="ml-1.5 rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                          {l(locale, '稳定常驻', 'Active', '穩定常駐')}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
