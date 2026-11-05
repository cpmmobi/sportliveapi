'use client'

function l(locale: string, zh: string, en: string, tw?: string) {
  if (locale === 'zh') return zh
  if (locale === 'zh-TW') return tw || zh
  return en
}

function FieldTable({
  locale,
  rows,
}: {
  locale: string
  rows: { name: string; type: string; desc: React.ReactNode; accent?: boolean }[]
}) {
  return (
    <div className="mt-2 overflow-x-auto border border-brand-line">
      <table className="w-full text-left text-xs">
        <thead className="bg-brand-paper/70 text-[11px] text-brand-muted">
          <tr>
            <th className="w-40 border-b border-r border-brand-line px-3 py-2 font-mono">
              {l(locale, '字段名', 'Field', '欄位名')}
            </th>
            <th className="w-24 border-b border-r border-brand-line px-3 py-2 font-mono">
              {l(locale, '类型', 'Type', '類型')}
            </th>
            <th className="border-b border-brand-line px-3 py-2">
              {l(locale, '说明', 'Description', '說明')}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-line">
          {rows.map((row) => (
            <tr key={row.name}>
              <td
                className={`border-r border-brand-line px-3 py-2 font-mono font-bold ${
                  row.accent ? 'text-brand-primary' : 'text-brand-ink'
                }`}
              >
                {row.name}
              </td>
              <td className="border-r border-brand-line px-3 py-2 font-mono text-brand-muted">{row.type}</td>
              <td className="px-3 py-2 text-brand-ink">{row.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function StreamsSchemaPanel({
  locale,
  endpoint,
}: {
  locale: string
  endpoint: 'streams' | 'push-streams'
}) {
  const streams = endpoint === 'streams'

  return (
    <div className="space-y-6 p-4 sm:px-5">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
            {l(locale, '3.1 基础返回结构 (Root JSON)', '3.1 Root JSON', '3.1 基礎回傳結構 (Root JSON)')}
          </h4>
          <span className="font-mono text-[11px] text-brand-muted">Content-Type: application/json</span>
        </div>
        <FieldTable
          locale={locale}
          rows={[
            {
              name: 'errCode',
              type: 'Integer',
              desc: streams
                ? l(
                    locale,
                    '错误码。0 表示成功，-1 表示无权访问（auth 错误或过期），99 表示访问频次过大。',
                    '0 = success, -1 = unauthorized (bad or expired auth), 99 = rate limited.',
                    '錯誤碼。0 表示成功，-1 表示無權存取（auth 錯誤或過期），99 表示存取頻次過大。'
                  )
                : l(
                    locale,
                    '错误码。0 表示成功，-1 或 40000 表示无权访问或逻辑错误（推流服务需额外开通）。',
                    '0 = success. -1 or 40000 = unauthorized or a logic error. Push delivery must be enabled on the account.',
                    '錯誤碼。0 表示成功，-1 或 40000 表示無權存取或邏輯錯誤（推流服務需額外開通）。'
                  ),
            },
            {
              name: 'errMsg',
              type: 'String',
              desc: l(
                locale,
                '错误信息描述，成功时为 "success"。',
                'Message string. "success" when the call succeeds.',
                '錯誤訊息描述，成功時為 "success"。'
              ),
            },
            {
              name: 'data',
              type: 'Array',
              desc: streams
                ? l(locale, '赛事列表，字段见 3.2。', 'Match list. Fields are in 3.2.', '賽事列表，欄位見 3.2。')
                : l(locale, '推流赛事列表，字段见 3.2。', 'Push-match list. Fields are in 3.2.', '推流賽事列表，欄位見 3.2。'),
            },
            {
              name: 'page',
              type: 'Integer',
              desc: l(locale, '当前页码，例如 1。', 'Current page number, for example 1.', '目前頁碼，例如 1。'),
            },
            {
              name: 'hasMore',
              type: 'Boolean',
              desc: l(
                locale,
                '是否还有下一页。true 还有下一页，false 已是最后一页。是否翻页以本字段为准。',
                'true if another page exists. Use this field to decide whether to request the next page.',
                '是否還有下一頁。true 還有下一頁，false 已是最後一頁。是否翻頁以本欄位為準。'
              ),
            },
          ]}
        />
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
            {streams
              ? l(locale, '3.2 data[] 字段（Streams 直播链接）', '3.2 data[] Fields (Playback Links)', '3.2 data[] 欄位（Streams 直播連結）')
              : l(locale, '3.2 data[] 字段（Push Streams 推流）', '3.2 data[] Fields (RTMP Push)', '3.2 data[] 欄位（Push Streams 推流）')}
          </h4>
          <span className="text-[11px] text-brand-muted">
            {streams
              ? l(
                  locale,
                  '覆盖当前在播及未来 24 小时内赛事，不返回已结束赛事。',
                  'Live matches and fixtures in the next 24 hours. Finished matches are omitted.',
                  '覆蓋目前在播及未來 24 小時內賽事，不回傳已結束賽事。'
                )
              : l(
                  locale,
                  '推流接口的赛事信息较精简，重点是流媒体参数。',
                  'Push responses are slimmer and focus on stream parameters.',
                  '推流介面的賽事資訊較精簡，重點是串流參數。'
                )}
          </span>
        </div>
        <FieldTable
          locale={locale}
          rows={[
            {
              name: 'matchId',
              type: 'String',
              desc: l(locale, '比赛唯一 ID。', 'Unique match ID.', '比賽唯一 ID。'),
            },
            {
              name: 'type',
              type: 'Integer',
              desc: l(
                locale,
                '球类 ID，与请求参数 type 相同。',
                'Sport ID. Same value as the type query parameter.',
                '球類 ID，與請求參數 type 相同。'
              ),
            },
            ...(!streams
              ? [
                  {
                    name: 'sportName',
                    type: 'String',
                    desc: l(
                      locale,
                      '体育运动名称，例如足球、板球。',
                      'Sport name in Chinese, for example the label returned for soccer or cricket.',
                      '體育運動名稱，例如足球、板球。'
                    ),
                  },
                ]
              : []),
            {
              name: 'matchType',
              type: 'String',
              desc: l(
                locale,
                '赛事结构。格斗 (33)、赛车 (35)、摔跤 (38) 通常返回 "multi"，表示 event 型赛事，不是传统主客队对阵。',
                'Match shape. Combat (33), motorsport (35), and wrestling (38) usually return "multi": an event, not a home-vs-away fixture.',
                '賽事結構。格鬥 (33)、賽車 (35)、摔跤 (38) 通常回傳 "multi"，表示 event 型賽事，不是傳統主客隊對陣。'
              ),
            },
            {
              name: 'leagueName / leagueNameEn',
              type: 'String',
              desc: l(
                locale,
                '联赛中文名 / 英文名。英文界面请使用 leagueNameEn。',
                'League name in Chinese and English. Use leagueNameEn in English products.',
                '聯賽中文名 / 英文名。英文介面請使用 leagueNameEn。'
              ),
            },
            {
              name: 'home / homeEn',
              type: 'String',
              desc: l(
                locale,
                '主队中文名 / 英文名。仅常规对阵返回。33、35、38 这类 event 赛事通常不返回。英文界面请使用 homeEn。',
                'Home team in Chinese and English. Omitted for event sports 33, 35, and 38. Use homeEn in English products.',
                '主隊中文名 / 英文名。僅常規對陣回傳。33、35、38 這類 event 賽事通常不回傳。英文介面請使用 homeEn。'
              ),
            },
            {
              name: 'away / awayEn',
              type: 'String',
              desc: l(
                locale,
                '客队中文名 / 英文名。仅常规对阵返回。event 赛事通常不返回。英文界面请使用 awayEn。',
                'Away team in Chinese and English. Omitted for event sports. Use awayEn in English products.',
                '客隊中文名 / 英文名。僅常規對陣回傳。event 賽事通常不回傳。英文介面請使用 awayEn。'
              ),
            },
            {
              name: 'event / eventEn',
              type: 'String',
              accent: true,
              desc: l(
                locale,
                '赛事中英文名称，用于 33（格斗）、35（赛车）、38（摔跤）。例如 "AEW周三晚动力时刻" 或 "Dutch Grand Prix - Sprint Qualifying"。',
                'Event title for types 33, 35, and 38. Example: "AEW Dynamite" or "Dutch Grand Prix - Sprint Qualifying". Use eventEn in English products.',
                '賽事中英文名稱，用於 33（格鬥）、35（賽車）、38（摔跤）。例如 "AEW Dynamite" 或 "Dutch Grand Prix - Sprint Qualifying"。'
              ),
            },
            {
              name: 'date',
              type: 'Long',
              desc: l(
                locale,
                '开赛时间戳（秒），例如 1777048200。',
                'Kickoff as a Unix timestamp in seconds, for example 1777048200.',
                '開賽時間戳（秒），例如 1777048200。'
              ),
            },
            {
              name: 'dateStr',
              type: 'String',
              desc: l(
                locale,
                '开赛时间字符串，例如 "2026/02/25 09:00"。时区固定 UTC+8。',
                'Kickoff string, for example "2026/02/25 09:00". Timezone is fixed at UTC+8.',
                '開賽時間字串，例如 "2026/02/25 09:00"。時區固定 UTC+8。'
              ),
            },
            {
              name: 'screenshot',
              type: 'String',
              desc: l(
                locale,
                '实时截图，可作播放器封面。需要允许跨域。未开赛为空。',
                'Live screenshot for a player poster. Requires CORS. Empty before kickoff.',
                '即時截圖，可作播放器封面。需要允許跨域。未開賽為空。'
              ),
            },
            {
              name: 'isPlayed',
              type: 'Boolean',
              desc: streams
                ? l(
                    locale,
                    '这场比赛当前是否有可播源。',
                    'Whether this match currently has a playable feed.',
                    '這場比賽目前是否有可播源。'
                  )
                : l(
                    locale,
                    '这场比赛当前是否有源正在推流。',
                    'Whether a feed is currently being pushed for this match.',
                    '這場比賽目前是否有源正在推流。'
                  ),
            },
            ...(streams
              ? [
                  {
                    name: 'jc_id / bd_id',
                    type: 'String',
                    desc: l(
                      locale,
                      '竞彩编号 / 北单编号，仅供中国彩票场景关联。',
                      'China Sports Lottery and Beijing Single Game IDs. Used only for that market.',
                      '競彩編號 / 北單編號，僅供中國彩票場景關聯。'
                    ),
                  },
                  {
                    name: 'leagueLogo / homeLogo / awayLogo',
                    type: 'String',
                    desc: l(
                      locale,
                      '联赛、主队、客队图标。需要允许跨域。',
                      'League, home, and away logos. Requires CORS.',
                      '聯賽、主隊、客隊圖示。需要允許跨域。'
                    ),
                  },
                  {
                    name: 'homeScore / awayScore',
                    type: 'Integer',
                    desc: l(
                      locale,
                      '当前比分，只用于把流和比赛对上，不能代替专业比分源。',
                      'Current score, for matching a stream to a fixture only. Not a professional scores feed.',
                      '目前比分，只用於把流和比賽對上，不能代替專業比分源。'
                    ),
                  },
                  {
                    name: 'progress / progressEn',
                    type: 'String',
                    desc: l(
                      locale,
                      '比赛进程的中英文，例如 "Q4 02:42"。未开赛不返回。英文界面请使用 progressEn。',
                      'Match clock in Chinese and English, for example "Q4 02:42". Omitted before kickoff. Use progressEn in English products.',
                      '比賽進程的中英文，例如 "Q4 02:42"。未開賽不回傳。英文介面請使用 progressEn。'
                    ),
                  },
                ]
              : []),
            {
              name: 'liveList',
              type: 'Array',
              desc: streams
                ? l(locale, '直播线路列表，字段见 3.3。', 'Playback lines. Fields are in 3.3.', '直播線路列表，欄位見 3.3。')
                : l(locale, '推流线路列表，字段见 3.3。', 'Push lines. Fields are in 3.3.', '推流線路列表，欄位見 3.3。'),
            },
            {
              name: 'channels',
              type: 'Array',
              desc: l(
                locale,
                '未开通 IPTV 时不返回。开通后，这场比赛关联的电视频道和球队台放在这里，只有 id 和展示信息，没有播放地址。字段见 3.4。',
                'Omitted unless Global Sports Channels is enabled. Then this match’s TV and club channels are listed here, with ids and labels only — no playback URL. Fields are in 3.4.',
                '未開通 IPTV 時不回傳。開通後，這場比賽關聯的電視頻道和球隊台放在這裡，只有 id 和展示資訊，沒有播放地址。欄位見 3.4。'
              ),
            },
          ]}
        />
      </div>

      <div>
        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
          {streams
            ? l(locale, '3.3 liveList[] 字段（播放地址）', '3.3 liveList[] Fields (Playback URL)', '3.3 liveList[] 欄位（播放地址）')
            : l(locale, '3.3 liveList[] 字段（推流参数）', '3.3 liveList[] Fields (Push Params)', '3.3 liveList[] 欄位（推流參數）')}
        </h4>
        <FieldTable
          locale={locale}
          rows={[
            {
              name: 'name',
              type: 'String',
              desc: l(
                locale,
                '线路中文名，给中文界面做选项卡，例如 "聚合线路"、"国际高清"、"备用线路"。',
                'Chinese line label for Chinese UI tabs, such as the web, HD, and backup feeds. English products should display nameEn.',
                '線路中文名，給中文介面做選項卡，例如 "聚合線路"、"國際高清"、"備用線路"。'
              ),
            },
            {
              name: 'nameEn',
              type: 'String',
              desc: l(
                locale,
                '线路英文名，给英文界面做选项卡，例如 "Web Stream"、"Global HD"、"Backup Stream"。',
                'English line label. Use this in English products. Examples: "Web Stream", "Global HD", "Backup Stream".',
                '線路英文名，給英文介面做選項卡，例如 "Web Stream"、"Global HD"、"Backup Stream"。'
              ),
            },
            ...(streams
              ? [
                  {
                    name: 'url',
                    type: 'String',
                    accent: true,
                    desc: l(
                      locale,
                      '可直接交给播放器的直播地址。',
                      'Playback URL. Pass it straight to the player.',
                      '可直接交給播放器的直播地址。'
                    ),
                  },
                  {
                    name: 'type',
                    type: 'String',
                    accent: true,
                    desc: l(
                      locale,
                      '播放格式：m3u8、flv 或 rtmp。',
                      'Playback format: m3u8, flv, or rtmp.',
                      '播放格式：m3u8、flv 或 rtmp。'
                    ),
                  },
                ]
              : [
                  {
                    name: 'appName',
                    type: 'String',
                    accent: true,
                    desc: l(
                      locale,
                      '推流 Application 名，例如 "sla"。用你自己的播放域名拼接 appName 与 streamName。',
                      'Application name, for example "sla". Build the playback URL on your own domain with appName and streamName.',
                      '推流 Application 名，例如 "sla"。用你自己的播放域名拼接 appName 與 streamName。'
                    ),
                  },
                  {
                    name: 'streamName',
                    type: 'String',
                    accent: true,
                    desc: l(
                      locale,
                      '流名称，例如 "3-69e670afa46e0ea4e1f4e975-hd"。',
                      'Stream name, for example "3-69e670afa46e0ea4e1f4e975-hd".',
                      '流名稱，例如 "3-69e670afa46e0ea4e1f4e975-hd"。'
                    ),
                  },
                ]),
            {
              name: 'isPlayed',
              type: 'Boolean',
              desc: streams
                ? l(
                    locale,
                    '这条线路当前是否可播。',
                    'Whether this line is playable right now.',
                    '這條線路目前是否可播。'
                  )
                : l(
                    locale,
                    '这条线路当前是否在推流。该状态来自 SLA 侧，仅供参考，请以你自己的流媒体状态为准。',
                    'Whether this line is currently pushing. This flag comes from SLA and is advisory — trust your own media server.',
                    '這條線路目前是否在推流。該狀態來自 SLA 側，僅供參考，請以你自己的串流狀態為準。'
                  ),
            },
            {
              name: 'streamInfo',
              type: 'Object',
              desc: (
                <>
                  {l(
                    locale,
                    '视频参数。未开赛不返回。',
                    'Video parameters. Omitted before kickoff.',
                    '視訊參數。未開賽不回傳。'
                  )}
                  <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] text-brand-muted">
                    <li>
                      <code className="font-mono text-brand-ink">Width</code> (Int)
                      {l(locale, '：宽度，例如 1920', ': width, for example 1920', '：寬度，例如 1920')}
                    </li>
                    <li>
                      <code className="font-mono text-brand-ink">Height</code> (Int)
                      {l(locale, '：高度，例如 1080', ': height, for example 1080', '：高度，例如 1080')}
                    </li>
                    <li>
                      <code className="font-mono text-brand-ink">FrameRate</code> (Int)
                      {l(locale, '：帧率，例如 25 / 50 / 60', ': frame rate, for example 25 / 50 / 60', '：幀率，例如 25 / 50 / 60')}
                    </li>
                    <li>
                      <code className="font-mono text-brand-primary">PublishTime</code> (String)
                      {l(
                        locale,
                        '：上次推流时间，时区 UTC+8，例如 "2026/09/14 16:58:52"。稳定的流这个时间会离现在越来越远；反复重推则会不断刷新。',
                        ': last publish time, UTC+8, for example "2026/09/14 16:58:52". A stable feed’s timestamp stays old. A flapping feed keeps refreshing it.',
                        '：上次推流時間，時區 UTC+8，例如 "2026/09/14 16:58:52"。穩定的流這個時間會離現在越來越遠；反覆重推則會不斷重新整理。'
                      )}
                    </li>
                  </ul>
                </>
              ),
            },
          ]}
        />
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
            {l(
              locale,
              '3.4 channels[] 字段（仅开通 IPTV 时返回）',
              '3.4 channels[] Fields (IPTV customers only)',
              '3.4 channels[] 欄位（僅開通 IPTV 時回傳）'
            )}
          </h4>
          <span className="text-[11px] text-brand-muted">
            {l(
              locale,
              '用 id 向 IPTV 播放接口换地址，不要用 name 当主键。',
              'Exchange id for a playback URL. Do not use name as the key.',
              '用 id 向 IPTV 播放介面換地址，不要用 name 當主鍵。'
            )}
          </span>
        </div>
        <div className="mt-2 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <FieldTable
              locale={locale}
              rows={[
                {
                  name: 'id',
                  type: 'String',
                  desc: l(
                    locale,
                    '频道 id。所有客户相同，长期不变。换播放地址时原样传入。',
                    'Channel id. Stable and the same for every customer. Pass it through unchanged when signing a URL.',
                    '頻道 id。所有客戶相同，長期不變。換播放地址時原樣傳入。'
                  ),
                },
                {
                  name: 'name',
                  type: 'String',
                  desc: l(
                    locale,
                    '显示名，可能会调整，不能当主键。',
                    'Display name. It can change. Do not use it as a primary key.',
                    '顯示名，可能會調整，不能當主鍵。'
                  ),
                },
                {
                  name: 'kind',
                  type: 'String',
                  desc: l(
                    locale,
                    '"tv" 是电视频道，"team" 是球队台。',
                    '"tv" is a linear channel. "team" is a club channel.',
                    '"tv" 是電視頻道，"team" 是球隊台。'
                  ),
                },
                {
                  name: 'role',
                  type: 'String',
                  desc: l(
                    locale,
                    '仅 team 返回。取值 home、away 或 team，只用于展示，不参与换链。',
                    'Present on team channels only: home, away, or team. Display only — not used when signing a URL.',
                    '僅 team 回傳。取值 home、away 或 team，只用於展示，不參與換鏈。'
                  ),
                },
              ]}
            />
          </div>
          <div className="bg-[#111318] p-3.5 font-mono text-[11px] leading-5 text-emerald-300 lg:col-span-4">
            <p className="mb-1.5 text-[10px] uppercase tracking-wider text-white/60">
              {l(locale, 'channels 返回示例', 'channels example', 'channels 回傳示例')}
            </p>
            <pre className="overflow-x-auto whitespace-pre">{`"channels": [
  {
    "id": "espn-2",
    "name": "ESPN 2",
    "kind": "tv"
  },
  {
    "id": "wnba-dream",
    "name": "WNBA Dream",
    "kind": "team",
    "role": "home"
  }
]`}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}
