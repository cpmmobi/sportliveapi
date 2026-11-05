import type { Copy, CopyLines } from '@/lib/locale'
import iptvChannelsCatalog from '@/content/iptv-channels.json'

const zh = (zhText: string, en: string, tw: string): Copy => ({
  zh: zhText,
  en,
  'zh-TW': tw,
})

const zhLines = (zhText: string[], en: string[], tw: string[]): CopyLines => ({
  zh: zhText,
  en,
  'zh-TW': tw,
})

export const ui = {
  products: zh('产品服务', 'Products & Services', '產品服務'),
  solutions: zh('解决方案', 'Solutions', '解決方案'),
  customers: zh('客户案例', 'Customers', '客戶案例'),
  coverage: zh('直播预览', 'Live Preview', '直播預覽'),
  docs: zh('接口文档', 'API Docs', '介面文件'),
  faq: zh('常见问题', 'FAQ', '常見問題'),
  about: zh('关于我们', 'About', '關於我們'),
  contact: zh('获取报价', 'Get a quote', '取得報價'),
  privacy: zh('隐私政策', 'Privacy', '隱私政策'),
  disclaimer: zh('免责声明', 'Disclaimer', '免責聲明'),
  read: zh('查看', 'View', '查看'),
  gets: zh('你拿到什么', 'What you get', '你拿到什麼'),
  pay: zh('费用怎么算', 'How billing works', '費用怎麼算'),
  prepare: zh('你需要自备', 'What you bring', '你需要自備'),
  limits: zh('边界', 'Boundaries', '邊界'),
  steps: zh('怎么接', 'How it connects', '怎麼接'),
  related: zh('相关案例', 'Related scenarios', '相關案例'),
  forWhom: zh('适合谁', 'Who it is for', '適合誰'),
  recommend: zh('推荐产品', 'Recommended product', '推薦產品'),
  also: zh('其他产品', 'Other products', '其他產品'),
  scene: zh('观众会看到什么', 'What viewers get', '觀眾會看到什麼'),
}

export type ProductSlug = 'streams' | 'push' | 'iptv' | 'assistant'
export type SolutionSlug = 'apps' | 'platforms' | 'channels' | 'streamers'

export type Block = {
  title: Copy
  body: Copy
}

export type Product = {
  slug: ProductSlug
  name: Copy
  blurb: Copy
  lede: Copy
  scene: Copy
  moments: Block[]
  steps: Block[]
  gets: Copy[]
  pay: Copy[]
  prepare: Copy[]
  limits: Copy[]
  solution: SolutionSlug
}

export type Solution = {
  slug: SolutionSlug
  name: Copy
  blurb: Copy
  lede: Copy
  job: Copy
  why: Copy
  product: ProductSlug
  bring: Copy[]
  billing: Copy[]
  steps: Block[]
}

export const products: Product[] = [
  {
    slug: 'streams',
    name: zh('赛事直播线路', 'Live Match Lines', '賽事直播線路'),
    blurb: zh('按单场把比赛直播接入网站、App 或云服务', 'Connect live matches to your site, app, or cloud', '按單場把比賽直播接入網站、App 或雲端服務'),
    lede: zh(
      '把全球正在直播和未来 24 小时的体育赛事接入你的赛程页。支持直接返回 m3u8 / flv / rtmp 播放链接，也支持将原始流实时 RTMP 推送到你自己的云服务器。',
      'Connect live matches and the next 24 hours of fixtures directly to your match pages. Choose ready-to-play m3u8 / flv / rtmp URLs delivered from our cloud, or real-time RTMP push into your own streaming servers.',
      '把全球正在直播和未來 24 小時的體育賽事接入你的賽程頁。支援直接回傳 m3u8 / flv / rtmp 播放連結，也支援將原始流即時 RTMP 推送到你自己的雲端伺服器。'
    ),
    scene: zh(
      '观众留在你的网站或 App 里，点进那场英超、欧冠、NBA 或板球赛，赛前就能看到画面并自由切换国际高清、聚合或本地语言定制线路。赛程和比分继续用你现有的数据商，我们通过赛事 ID 把直播流精准挂到对应比赛上。',
      'Viewers stay inside your site or app, open a Premier League, Champions League, NBA, or cricket fixture, see the picture before kickoff, and switch between Global HD, Web Stream, or localized custom lines. Keep fixtures and scores with your current data vendor — we map the live lines directly to your match IDs.',
      '觀眾留在你的網站或 App 裡，點進那場英超、歐冠、NBA 或板球賽，賽前就能看到畫面並自由切換國際高清、聚合或本地語言定制線路。賽程和比分繼續用你現有的資料商，我們透過賽事 ID 把直播流精準掛到對應比賽上。'
    ),
    moments: [
      {
        title: zh('单场多条线路，按 PublishTime 选稳线', 'Multiple lines per match, ranked by uptime', '單場多條線路，按 PublishTime 選穩線'),
        body: zh(
          '热门赛事同时返回国际高清（1080P，赛前 10 分钟以上进流）与聚合线路（赛前 3 分钟以上进流），并可叠加各语种定制线路。接口附带分辨率、帧率与上一次推流时间 PublishTime，前端可优先展示长时间稳定推流的线路。',
          'Major fixtures return Global HD (1080p, up 10+ minutes before kickoff) and Web Stream (3+ minutes before kickoff) at once, plus optional localized lines. Each line includes resolution, frame rate, and PublishTime so your player can default to the steadiest feed.',
          '熱門賽事同時回傳國際高清（1080P，賽前 10 分鐘以上進流）與聚合線路（賽前 3 分鐘以上進流），並可疊加各語種定制線路。介面附帶解析度、幀率與上一次推流時間 PublishTime，前端可優先展示長時間穩定推流的線路。'
        ),
      },
      {
        title: zh('主流数据商现成映射 + AI 自动匹配', 'Pre-mapped data vendors + AI auto-mapping', '主流資料商現成映射 + AI 自動匹配'),
        body: zh(
          '已与多家主流体育数据商完成匹配，接口可直接附带第三方赛事 ID。若你使用自有或其他数据商，只需提供未来 24 小时至 3 天的赛程接口（含开赛时间、主客队、联赛、唯一 ID），我们的 AI 系统会自动定时匹配并返回你方赛事 ID。',
          'Already mapped to several major sports data providers, returning their match IDs directly. If you run your own schedule system or another vendor, provide a 24h–3d schedule feed (start time, teams, league, unique ID) and our AI matcher will attach your match ID automatically.',
          '已與多家主流體育資料商完成匹配，介面可直接附帶第三方賽事 ID。若你使用自有或其他資料商，只需提供未來 24 小時至 3 天的賽程介面（含開賽時間、主客隊、聯賽、唯一 ID），我們的 AI 系統會自動定時匹配並回傳你方賽事 ID。'
        ),
      },
      {
        title: zh('前端图层叠加水印，0 云端转码费', 'Frontend watermark overlay, zero transcoding bill', '前端圖層疊加浮水印，0 雲端轉碼費'),
        body: zh(
          '不建议在云端转码压制水印（阿里云国际版 2 小时 1080P 转码约 $1.19/场，日播百场即数百美金）。直接在 Web / App 播放器上层覆盖透明图层（Div / View），0 转码成本即可实现动态水印、跑马灯与可点击广告。',
          'Avoid cloud transcoding just to burn in a logo (around $1.19 per 2-hour 1080p match on Alibaba Cloud, adding up to hundreds of dollars a day). Place a transparent div/view over Video.js or your native player for dynamic watermarks, tickers, and clickable ads at zero transcoding cost.',
          '不建議在雲端轉碼壓制浮水印（阿里雲國際版 2 小時 1080P 轉碼約 $1.19/場，日播百場即數百美金）。直接在 Web / App 播放器上層覆蓋透明圖層（Div / View），0 轉碼成本即可實現動態浮水印、跑馬燈與可點擊廣告。'
        ),
      },
      {
        title: zh('三层防盗链保护，守住下行流量', 'Three-layer anti-leech protection', '三層防盜鏈保護，守住下行流量'),
        body: zh(
          '盗链会直接消耗你的下行播放流量。直播链接模式支持配置网站 Referer 白名单、目标投放国家/地区白名单，以及 1 分钟内短时有效的签名播放链接，防止爬虫抓取后伪造请求大规模盗播。',
          'Hotlinking drains your downstream traffic budget. Playback Links mode enforces your domain Referer allowlist, target country/region allowlist, and short-lived signed URLs (typically under 1 minute) so scraped links cannot be replayed.',
          '盜鏈會直接消耗你的下行播放流量。直播連結模式支援設定網站 Referer 白名單、目標投放國家/地區白名單，以及 1 分鐘內短時有效的簽名播放連結，防止爬蟲抓取後偽造請求大規模盜播。'
        ),
      },
    ],
    steps: [
      {
        title: zh('自助调试接口，留资料拿报价与专属测试页', 'Test the API, then get a quote and private test page', '自助調試介面，留資料拿報價與專屬測試頁'),
        body: zh(
          '先在官网看文档并用测试 Key 调通接口结构。确认能接后提交需求拿报价；认可报价后，客户经理为你开通专属测试页，直接查看当前在播比赛的画质与覆盖度。',
          'Inspect the schema with our on-site test key first. Submit your requirements for a quote, and once accepted, your account manager opens a private test page showing live matches on air and upcoming fixtures.',
          '先在官網看文件並用測試 Key 調通介面結構。確認能接後提交需求拿報價；認可報價後，客戶經理為你開通專屬測試頁，直接查看目前在播比賽的畫質與覆蓋度。'
        ),
      },
      {
        title: zh('选定接入模式：直播链接 或 RTMP 推流', 'Choose delivery mode: Playback Links or RTMP Push', '選定接入模式：直播連結 或 RTMP 推流'),
        body: zh(
          '测试期间定下由谁分发给观众。无自建 CDN 选「直播链接模式」，直接拿 m3u8 / flv 播放并向我们预充流量包；已有成熟云直播与 CDN 选「推流模式」，我们把流实时推入你的 RTMP 服务器，你用自有域名拼接播放地址。',
          'Decide during the trial who delivers video to end viewers. Without your own CDN, pick Playback Links (m3u8/flv) and prepay traffic packages with us. With your own CDN, pick Push Delivery: we push RTMP into your cloud and you build playback URLs on your own domain.',
          '測試期間定下由誰分發給觀眾。無自建 CDN 選「直播連結模式」，直接拿 m3u8 / flv 播放並向我們預充流量包；已有成熟雲直播與 CDN 選「推流模式」，我們把流即時推入你的 RTMP 伺服器，你用自有域名拼接播放地址。'
        ),
      },
      {
        title: zh('30 秒轮询拉取，配合 isPlayed=1 动态更新', 'Poll every 30s with isPlayed=1', '30 秒輪詢拉取，配合 isPlayed=1 動態更新'),
        body: zh(
          '按 30 秒/次调用接口并在本地缓存更新。请求时带上 isPlayed=1 只拉取当前实际可播/在推的有效赛事，配合实时比赛截图 screenshot、分辨率和 PublishTime 为观众展示封面与主备线路。',
          'Poll the endpoint every 30 seconds and cache locally. Pass isPlayed=1 to fetch only matches with active streams, using the real-time screenshot field for cover previews and PublishTime to rank backup lines.',
          '按 30 秒/次呼叫介面並在本地快取更新。請求時帶上 isPlayed=1 只拉取目前實際可播/在推的有效賽事，配合即時比賽截圖 screenshot、解析度和 PublishTime 為觀眾展示封面與主備線路。'
        ),
      },
      {
        title: zh('付费开通生产配置：独立域名、推流与赛事匹配', 'Go live: dedicated domain, push setup, and mapping', '付費開通生產設定：獨立域名、推流與賽事匹配'),
        body: zh(
          '正式付费后开通生产权限：直播链接客户分配独立播放域名与流量统计后台；推流客户配置 RTMP 推流地址与密钥；需要赛事匹配的客户接入赛程接口完成自动对齐。',
          'Production configurations open after payment: a dedicated measurable playback domain and traffic console for Playback Links, RTMP ingest configuration for Push Delivery, and automated match ID mapping against your schedule API.',
          '正式付費後開通生產權限：直播連結客戶分配獨立播放域名與流量統計後台；推流客戶設定 RTMP 推流地址與金鑰；需要賽事匹配的客戶接入賽程介面完成自動對齊。'
        ),
      },
    ],
    gets: [
      zh('覆盖 23+ 运动，返回当前在播及未来 24 小时内的赛事线路', '23+ sports categories, returning live matches and fixtures within the next 24 hours', '覆蓋 23+ 運動，回傳目前在播及未來 24 小時內的賽事線路'),
      zh('单场多条线路（国际高清 1080P / 聚合）及赛场原声、中文、台湾、韩国、南亚定制线路', 'Multiple lines per match (Global HD 1080p, Web Stream) plus Raw Feed, CN, TW, Korea, and Fancode custom feeds', '單場多條線路（國際高清 1080P / 聚合）及賽場原聲、中文、台灣、韓國、南亞定制線路'),
      zh('实时比赛画面截图（screenshot）、视频流宽高、帧率与 PublishTime 推流时间', 'Real-time match screenshot, stream width/height, frame rate, and PublishTime timestamp', '即時比賽畫面截圖（screenshot）、視訊流寬高、幀率與 PublishTime 推流時間'),
      zh('支持附加主流数据商赛事 ID，或通过 AI 自动匹配你方自有赛程 ID', 'Pre-mapped third-party match IDs or AI-matched IDs from your own schedule API', '支援附加主流資料商賽事 ID，或透過 AI 自動匹配你方自有賽程 ID'),
      zh('付费后提供专户专用播放域名与流量查询后台（直播链接模式），或直推你方云端（推流模式）', 'Dedicated playback domain + traffic console (Playback Links), or direct RTMP ingest into your cloud (Push Delivery)', '付費後提供專戶專用播放域名與流量查詢後台（直播連結模式），或直推你方雲端（推流模式）'),
    ],
    pay: [
      zh('按球类数量与定制线路阶梯计价：接入的运动品类越多、开通的定制线路越多，订阅价格越高；只勾选实际运营的球类最划算', 'Tiered by sports count and custom lines: the more sports categories and custom feeds you enable, the higher the subscription — selecting only the sports you operate keeps costs down', '按球類數量與定制線路階梯計價：接入的運動品類越多、開通的定制線路越多，訂閱價格越高；只勾選實際營運的球類最划算'),
      zh('下行播放流量费（水费逻辑）：观众看比赛消耗的流量不包含在基础订阅费中，由底层云厂商按量计费', 'Downstream viewer traffic ("water bill"): billed by actual watch volume, separate from the base subscription', '下行播放流量費（水費邏輯）：觀眾看比賽消耗的流量不包含在基礎訂閱費中，由底層雲廠商按量計費'),
      zh('选直播链接模式：流量消耗在我们云端，按阿里云国际标准价格向我们预充流量包，耗尽会断流', 'Playback Links mode: traffic lands on our cloud; prepay traffic packages at Alibaba Cloud International rates', '選直播連結模式：流量消耗在我們雲端，按阿里雲國際標準價格向我們預充流量包，耗盡會斷流'),
      zh('选 RTMP 推流模式：流量消耗在你自己的云账号上，直接付给你的云服务商，我们不代收一分钱流量费', 'RTMP Push mode: traffic lands on your own cloud account; pay your cloud vendor directly with zero markup from us', '選 RTMP 推流模式：流量消耗在你自己的雲帳號上，直接付給你的雲服務商，我們不代收一分錢流量費'),
    ],
    prepare: [
      zh('自有或第三方赛程/比分数据源（线路接口自带的队名和比分仅用于辨认比赛，不可替代数据商）', 'Your own schedule/score data feed (team names and scores on the line API are only for identifying matches)', '自有或第三方賽程/比分資料源（線路介面自帶的隊名和比分僅用於辨認比賽，不可替代資料商）'),
      zh('直播链接模式：提供网站域名（加 Referer 白名单）与目标投放国家/地区；如需大陆加速需提供已 ICP 备案域名', 'Playback Links mode: your domain for Referer allowlisting and target regions; an ICP-filed domain if mainland China acceleration is required', '直播連結模式：提供網站域名（加 Referer 白名單）與目標投放國家/地區；如需大陸加速需提供已 ICP 備案域名'),
      zh('RTMP 推流模式：提供接收流的 RTMP 推流地址与鉴权密钥，并在自有播放域名上配好 HTTPS、CORS 跨域与防盗链', 'RTMP Push mode: your RTMP ingest URL and auth key, plus HTTPS, CORS headers, and anti-leech rules on your playback domain', 'RTMP 推流模式：提供接收流的 RTMP 推流地址與鑑權金鑰，並在自有播放域名上配好 HTTPS、CORS 跨域與防盜鏈'),
      zh('如需 AI 赛事匹配：提供未来 24 小时至 3 天的赛程接口（含开赛时间、主队名、客队名、联赛名、唯一赛事 ID）', 'For AI match mapping: a schedule API returning 24h–3d of fixtures with start time, home/away names, league, and unique match ID', '如需 AI 賽事匹配：提供未來 24 小時至 3 天的賽程介面（含開賽時間、主隊名、客隊名、聯賽名、唯一賽事 ID）'),
    ],
    limits: [
      zh('只返回当前在播及未来 24 小时内的赛事，不返回已结束赛事，也不提供历史赛果或球员统计 API', 'Returns only live matches and fixtures within the next 24 hours; no finished matches, historical results, or player stats', '只回傳目前在播及未來 24 小時內的賽事，不回傳已結束賽事，也不提供歷史賽果或球員統計 API'),
      zh('默认提供赛事所在地官方转播原声（如泰超为泰语、日职联为日语、英超/NBA 默认英文）；小语种二路解说需自配主播，赛场原声/中文/台湾/韩国/南亚线路需另行申请定制', 'Default audio is the original broadcast commentary (e.g., Thai for Thai League, Japanese for J.League, English for EPL/NBA); custom lines (Raw Feed, CN, TW, Korea, Fancode) require separate activation', '預設提供賽事所在地官方轉播原聲（如泰超為泰語、日職聯為日語、英超/NBA 預設英文）；小語種二路解說需自配主播，賽場原聲/中文/台灣/韓國/南亞線路需另行申請定制'),
      zh('格斗（type=33）、赛车（type=35）、摔跤（type=38）属于 Event 型赛事（matchType: "multi"），返回 event / eventEn 赛事名称，不返回主客队字段', 'Combat sports (33), Motorsport (35), and Wrestling (38) are event-type sports (matchType: "multi") and return event/eventEn instead of home/away teams', '格鬥（type=33）、賽車（type=35）、摔跤（type=38）屬於 Event 型賽事（matchType: "multi"），回傳 event / eventEn 賽事名稱，不回傳主客隊欄位'),
      zh('电竞（type=151）目前支持英雄联盟（gameId=1）、CS:GO（2）、王者荣耀（3）和 Dota 2（4）', 'Esports (type=151) currently covers League of Legends (gameId=1), CS:GO (2), Honor of Kings (3), and Dota 2 (4)', '電競（type=151）目前支援英雄聯盟（gameId=1）、CS:GO（2）、王者榮耀（3）和 Dota 2（4）'),
    ],
    solution: 'apps',
  },
  {
    slug: 'push',
    name: zh('RTMP 推流', 'RTMP push', 'RTMP 推流'),
    blurb: zh('赛事直播线路的另一种接法：推进你自己的云', 'The other way into Live Match Lines: push into your own cloud', '賽事直播線路的另一種接法：推進你自己的雲'),
    lede: zh(
      '观众还是看你的播放域名，流量也还在你的阿里云、腾讯云或 AWS 账单上。我们只把这场比赛推进你已经在用的 RTMP。',
      'Viewers stay on your playback domain, and the traffic stays on your Alibaba Cloud, Tencent Cloud, or AWS bill. We only push the match into the RTMP endpoint you already use.',
      '觀眾還是看你的播放域名，流量也還在你的阿里雲、騰訊雲或 AWS 帳單上。我們只把這場比賽推進你已經在用的 RTMP。'
    ),
    scene: zh(
      '如果你已经为播放买了流量包、做好了防盗链，再买一套由我们分发给观众的直播链接，同一批观众会付两次流量。推流就是为了避开这件事。',
      'If you already buy traffic and run hotlink protection, taking our playback links means the same viewers are paid for twice. Push delivery exists so that does not happen.',
      '如果你已經為播放買了流量包、做好了防盜鏈，再買一套由我們分發給觀眾的直播連結，同一批觀眾會付兩次流量。推流就是為了避開這件事。'
    ),
    moments: [
      {
        title: zh('播放域名不用换', 'Keep your playback domain', '播放域名不用換'),
        body: zh('观众看到的还是你的域名和你的播放器。我们不出现在播放地址里。', 'Viewers still see your domain and your player. We do not appear in the playback URL.', '觀眾看到的還是你的域名和你的播放器。我們不出現在播放地址裡。'),
      },
      {
        title: zh('在你的控制台里验收', 'Check it in your own console', '在你的控制台裡驗收'),
        body: zh('流推进去之后，你在自己的流管理里看到这场在线。播放地址用你熟悉的规则，加上我们返回的应用名和流名拼出来。', 'Once the push is up, the match shows as live in your own stream console. Build the playback URL with your usual rule, plus the app name and stream name we return.', '流推進去之後，你在自己的流管理裡看到這場在線。播放地址用你熟悉的規則，加上我們返回的應用名和流名拼出來。'),
      },
      {
        title: zh('流量不经过我们转售', 'Traffic is not resold by us', '流量不經過我們轉售'),
        body: zh('只按运动范围与定制线路收线路订阅费。观众看了多久，直接体现在你自己的云账单上。高峰赛事前在你的账号里把流量准备够。', 'You only pay the line subscription for your sports scope and custom lines. Watch time shows up on your own cloud invoice. Top up that account before a heavy slate.', '只按運動範圍與定制線路收線路訂閱費。觀眾看了多久，直接體現在你自己的雲帳單上。高峰賽事前在你的帳號裡把流量準備夠。'),
      },
    ],
    steps: [
      {
        title: zh('先确认你的云能收这场流', 'Confirm your cloud can take the match', '先確認你的雲能收這場流'),
        body: zh(
          '付费后把 RTMP 地址和密钥交给我们。地址或密钥要改，提前说一声，否则这场会断在你的控制台里。',
          'After you subscribe, send the RTMP URL and key. Tell us before either changes, or the match drops out of your console.',
          '付費後把 RTMP 地址和金鑰交給我們。地址或金鑰要改，提前說一聲，否則這場會斷在你的控制台裡。'
        ),
      },
      {
        title: zh('在你的流管理里看到这场在线', 'See the match live in your console', '在你的流管理裡看到這場在線'),
        body: zh(
          '接口返回的是应用名和流名，不是一条给观众的播放地址。你用自己的规则把它们拼进现有播放域名。',
          'The API returns an app name and a stream name, not a viewer URL. You join them to the playback domain you already use.',
          '介面返回的是應用名和流名，不是一條給觀眾的播放地址。你用自己的規則把它們拼進現有播放域名。'
        ),
      },
      {
        title: zh('观众继续打开你的域名', 'Viewers keep opening your domain', '觀眾繼續打開你的域名'),
        body: zh(
          '防盗链、HTTPS 和大陆加速都留在你现在的链路上。我们不出现在播放地址里，流量账单也还是你的云厂商。',
          'Hotlink protection, HTTPS, and mainland acceleration stay on the path you already run. We do not appear in the playback URL, and the traffic invoice stays with your cloud provider.',
          '防盜鏈、HTTPS 和大陸加速都留在你現在的鏈路上。我們不出現在播放地址裡，流量帳單也還是你的雲廠商。'
        ),
      },
    ],
    gets: [
      zh('和直播链接相同的运动项目与线路类型', 'The same sports and line types as playback links', '和直播連結相同的運動項目與線路類型'),
      zh('流进你已有的阿里云、腾讯云、AWS 或自建 RTMP', 'Delivery into Alibaba Cloud, Tencent Cloud, AWS, or your own RTMP server', '流進你已有的阿里雲、騰訊雲、AWS 或自建 RTMP'),
      zh('播放域名和流量成本由你掌握', 'You keep the playback domain and the traffic bill', '播放域名和流量成本由你掌握'),
    ],
    pay: [
      zh('线路订阅按运动范围与是否含定制线路报价', 'Line subscription quoted by sports scope and custom lines', '線路訂閱按運動範圍與是否含定制線路報價'),
      zh('我们不代收下行流量费', 'We do not resell delivery traffic', '我們不代收下行流量費'),
      zh('高峰前要在你的云上准备足够流量', 'Buy enough traffic on your own cloud before peak fixtures', '高峰前要在你的雲上準備足夠流量'),
    ],
    prepare: [
      zh('可接收的 RTMP 地址和密钥', 'A working RTMP ingest URL and key', '可接收的 RTMP 地址和金鑰'),
      zh('播放域名、证书和防盗链', 'A playback domain, a certificate, and hotlink protection', '播放域名、憑證和防盜鏈'),
      zh('面向大陆观众时，自行完成备案和加速', 'Your own ICP filing and acceleration if you serve mainland China', '面向大陸觀眾時，自行完成備案和加速'),
    ],
    limits: [
      zh('账户未开通推流时，接口返回无权限', 'The API returns no permission until push delivery is enabled', '帳戶未開通推流時，介面返回無權限'),
      zh('接口里的在播状态来自我们一侧，和你的服务器可能有时差。以你的流管理为准', 'The on-air flag is observed on our side and can lag your server. Trust your own stream console', '介面裡的在播狀態來自我們一側，和你的伺服器可能有時差。以你的流管理為準'),
      zh('全球体育频道的播放地址不在这个接口里', 'Global Sports TV playback URLs are not returned here', '全球體育頻道的播放地址不在這個介面裡'),
    ],
    solution: 'platforms',
  },
  {
    slug: 'iptv',
    name: zh('全球体育频道', 'Global Sports Channels', '全球體育頻道'),
    blurb: zh('接入 ESPN、Sky 等百余个 24 小时体育台', '100+ 24/7 sports networks like ESPN and Sky', '接入 ESPN、Sky 等百餘個 24 小時體育台'),
    lede: zh(
      '面向海外观众的 24 小时线性体育与综合频道服务。观众停在一个台上连续收看，而不是只看某一场比赛的单场直播。播放使用 HLS，由你自己的 Bunny 播放域名分发。',
      '24-hour linear sports and broadcast channels for international audiences. Viewers stay on a channel for continuous viewing rather than watching a single match fixture. Delivered in HLS via your own Bunny playback domain.',
      '面向海外觀眾的 24 小時線性體育與綜合頻道服務。觀眾停在一個台上連續收看，而不是只看某一場比賽的單場直播。播放使用 HLS，由你自己的 Bunny 播放域名分發。'
    ),
    scene: zh(
      '全球体育频道提供英国、美国、加拿大、新西兰等地的线性体育台，以及 BBC、ITV、ABC、CBS、NBC、FOX 等综合台。观众打开频道目录或从节目表点进正在播出的频道，就能停在台上连续收看，信号适合长时间观看。',
      'Global Sports Channels carries linear sports networks across the UK, US, Canada, and New Zealand alongside major broadcast networks like BBC, ITV, ABC, CBS, NBC, and FOX. Viewers open the channel guide or click into a live program from the schedule, then stay on that channel for continuous long-session viewing.',
      '全球體育頻道提供英國、美國、加拿大、紐西蘭等地的線性體育台，以及 BBC、ITV、ABC、CBS、NBC、FOX 等綜合台。觀眾打開頻道目錄或從節目表點進正在播出的頻道，就能停在台上連續收看，訊號適合長時間觀看。'
    ),
    moments: [
      {
        title: zh('标准 HLS 格式，全端直接接入', 'Standard HLS for Web & Apps', '標準 HLS 格式，全端直接接入'),
        body: zh(
          '播放格式为标准 HLS（.m3u8），网页端播放器、移动端 App 以及各类电视盒子客户端都可以直接接入播放。',
          'Streams are delivered in standard HLS (.m3u8), ready for web players, mobile apps, and TV box clients out of the box.',
          '播放格式為標準 HLS（.m3u8），網頁端播放器、行動端 App 以及各類電視盒子用戶端都可以直接接入播放。'
        ),
      },
      {
        title: zh('自有 Bunny 域名分发，流量自主可控', 'Your Own Bunny Domain & CDN', '自有 Bunny 域名分發，流量自主可控'),
        body: zh(
          '每个客户使用自己的 Bunny 播放域名，播放流量走客户自己的 CDN。开通时提供可登录的 Bunny 账号，由我们在该账号里完成播放域名配置。',
          'Each customer uses their own Bunny playback domain and pays their own CDN bandwidth. Provide a Bunny login at onboarding and we configure the playback domain inside your account.',
          '每個客戶使用自己的 Bunny 播放域名，播放流量走客戶自己的 CDN。開通時提供可登入的 Bunny 帳號，由我們在該帳號裡完成播放域名設定。'
        ),
      },
      {
        title: zh('服务端现签时效链接，防转走盗播', 'On-the-Fly Signed URLs with Expiry', '服務端現簽時效連結，防轉走盜播'),
        body: zh(
          '播放链接带有有效期，观众打开频道时由你的服务端实时换取签名地址，用来限制链接被转走之后继续播放；商户密钥与签名密钥全程不进观众页面。',
          'Playback URLs carry an expiration timestamp and are signed by your server when a viewer tunes in, preventing shared links from being replayed elsewhere.',
          '播放連結帶有有效期，觀眾打開頻道時由你的服務端即時換取簽名地址，用來限制連結被轉走之後繼續播放；商戶金鑰與簽名金鑰全程不進觀眾頁面。'
        ),
      },
      {
        title: zh('与单场赛事直播线路自动联动', 'Linked with Live Match Lines', '與單場賽事直播線路自動聯動'),
        body: zh(
          '频道按客户开通。当你同时接入「赛事直播线路」时，Streams 或 Push Streams 接口里对上的比赛，会自动带回这场比赛对应的电视频道 id。',
          'Channels are provisioned per customer. When paired with Live Match Lines, matched fixtures in Streams or Push Streams automatically return the corresponding channel IDs.',
          '頻道按客戶開通。當你同時接入「賽事直播線路」時，Streams 或 Push Streams 介面裡對上的比賽，會自動帶回這場比賽對應的電視頻道 id。'
        ),
      },
    ],
    steps: [
      {
        title: zh('配置自有 Bunny 播放域名', 'Configure Your Bunny Playback Domain', '設定自有 Bunny 播放域名'),
        body: zh(
          '向客户经理确认具体频道范围与报价。开通时提供可登录的 Bunny 账号，由我们在该账号内为你完成 Pull Zone 与播放域名配置。',
          'Confirm your channel package and quote with your account manager. Provide a Bunny login at activation and we configure the Pull Zone and playback domain in your account.',
          '向客戶經理確認具體頻道範圍與報價。開通時提供可登入的 Bunny 帳號，由我們在該帳號內為你完成 Pull Zone 與播放域名設定。'
        ),
      },
      {
        title: zh('调用频道列表接口，构建频道目录与台标', 'Fetch Channel Directory & Logos', '呼叫頻道列表介面，建構頻道目錄與台標'),
        body: zh(
          '服务端调用频道列表接口获取已开通的电视频道（含名称、台标路径和国家）。将返回的台标路径直接拼在你自己的 Bunny 播放域名后（如 https://播放域名/logos/espn.png）即可渲染频道墙。',
          'Call the Channel List endpoint from your server to fetch enabled channels (name, logo path, country). Prefix the logo path with your Bunny playback domain (e.g., https://your-domain/logos/espn.png).',
          '服務端呼叫頻道列表介面取得已開通的電視頻道（含名稱、台標路徑和國家）。將回傳的台標路徑直接拼在你自己的 Bunny 播放域名後（如 https://播放域名/logos/espn.png）即可渲染頻道牆。'
        ),
      },
      {
        title: zh('接入未来一个月节目表，支持从节目单点播', 'Integrate the 30-Day Program Guide', '接入未來一個月節目表，支援從節目單點播'),
        body: zh(
          '调用节目表接口展示未来约一个月的播出安排。每场节目均附带对应的播出电视频道 id，观众从节目表点进某场赛事即可直接调起对应频道。',
          'Use the Program Guide endpoint to display upcoming broadcasts for roughly the next month. Each program entry includes its broadcast channel ID so viewers can click straight into the channel.',
          '呼叫節目表介面展示未來約一個月的播出安排。每場節目均附帶對應的播出電視頻道 id，觀眾從節目表點進某場賽事即可直接調起對應頻道。'
        ),
      },
      {
        title: zh('观众打开频道时服务端现签 HLS 播放地址', 'Sign HLS Playback URLs on Tune-In', '觀眾打開頻道時服務端現簽 HLS 播放地址'),
        body: zh(
          '当观众点击某个频道时，由你的服务端用频道 id 调用播放链接接口，实时换取一条带有效期的 HLS 地址交给前端播放器；链接过期后用同一个 id 再次换链即可。',
          'When a viewer opens a channel, your server exchanges the channel ID for a time-limited HLS URL and hands it to the player. Exchange the same ID again once expired.',
          '當觀眾點擊某個頻道時，由你的服務端用頻道 id 呼叫播放連結介面，即時換取一條帶有效期的 HLS 地址交給前端播放器；連結過期後用同一個 id 再次換鏈即可。'
        ),
      },
    ],
    gets: [
      zh('英国、美国、加拿大、新西兰、澳大利亚、马来西亚等地的线性体育台与综合台', 'Linear sports and broadcast networks across the UK, US, Canada, NZ, Australia, and Malaysia', '英國、美國、加拿大、紐西蘭、澳洲、馬來西亞等地的線性體育台與綜合台'),
      zh('三个核心服务端接口：频道列表、未来一个月节目表、播放链接现签', 'Three server-side APIs: Channel List, 1-Month Program Guide, and Playback URL Signing', '三個核心服務端介面：頻道列表、未來一個月節目表、播放連結現簽'),
      zh('与赛事直播线路共用开通时的同一把商户 auth 密钥', 'Shares the same merchant auth key as Live Match Lines', '與賽事直播線路共用開通時的同一把商戶 auth 金鑰'),
    ],
    pay: [
      zh('按客户确认的具体频道范围单独计价，向客户经理获取报价', 'Quoted according to your selected channel scope; confirm with your account manager', '按客戶確認的具體頻道範圍單獨計價，向客戶經理取得報價'),
      zh('下行播放流量走你自己的 Bunny CDN 账号，直接向 Bunny 结算', 'Downstream viewer traffic runs on your own Bunny CDN account, billed directly by Bunny', '下行播放流量走你自己的 Bunny CDN 帳號，直接向 Bunny 結算'),
    ],
    prepare: [
      zh('可登录的 Bunny 账号（由我们在该账号里完成播放域名配置）', 'A Bunny account login (we configure the playback domain inside your account)', '可登入的 Bunny 帳號（由我們在該帳號裡完成播放域名設定）'),
      zh('服务端接口调用环境（商户密钥和签名密钥不可暴露在观众页面）', 'Server-side environment for API calls (merchant and signing keys must stay off client pages)', '服務端介面呼叫環境（商戶金鑰和簽名金鑰不可暴露在觀眾頁面）'),
    ],
    limits: [
      zh('目前覆盖英国、美国、加拿大、新西兰、澳大利亚、马来西亚等地的线性电视频道。没有定制需求时默认开通全部频道；如需额外频道，可与我们确认是否有资源可以添加', 'Linear TV channels across the UK, US, Canada, New Zealand, Australia, and Malaysia. The full list is enabled by default; extra channels can be checked with us', '目前覆蓋英國、美國、加拿大、紐西蘭、澳洲、馬來西亞等地的線性電視頻道。沒有定制需求時預設開通全部頻道；如需額外頻道，可與我們確認是否有資源可以添加'),
      zh('源站在美国。以 CDN 拉流对接，支持在欧美有良好节点的服务商，如 Bunny、Gcore、Cloudflare。频道 24 小时不间断播出，不使用 RTMP 推流', 'Origin is in the United States. Integration is CDN pull, on providers with solid EU and US nodes such as Bunny, Gcore, and Cloudflare. Channels run 24 hours, so RTMP push is not used', '源站在美國。以 CDN 拉流對接，支援在歐美有良好節點的服務商，如 Bunny、Gcore、Cloudflare。頻道 24 小時不間斷播出，不使用 RTMP 推流'),
      zh('节目表是播出安排，不包含实时比分、历史赛果和积分榜', 'The program guide shows broadcast schedules only and does not include live scores, historical results, or standings', '節目表是播出安排，不包含即時比分、歷史賽果和積分榜'),
    ],
    solution: 'channels',
  },
  {
    slug: 'assistant',
    name: zh('OBS直播流机器人', 'OBS Streamer Bot', 'OBS直播流機器人'),
    blurb: zh('目前仅支持足球与篮球；Telegram / Lark 群内自助取流，放进 OBS 即可开播', 'Football & basketball only for now; pull links in Telegram / Lark and go live in OBS', '目前僅支援足球與籃球；Telegram / Lark 群內自助取流，放進 OBS 即可開播'),
    lede: zh(
      '专为足球、篮球解说团队与主播工作室设计，无需任何接口开发。目前仅支持足球与篮球赛程取流，暂不提供其他球类。付费后拉入与机器人的专属群（支持 Telegram 与 Lark；后续可按客户需求拓展其他海外聊天软件）：群内回复 666 获取赛程，回复序号拿到专属直播链接，在 OBS 内添加为「媒体源」即可开播。',
      'Built for football and basketball commentary desks with zero API development. Currently supports football and basketball fixtures only — other sports are not available. After payment, we create a dedicated bot group on Telegram or Lark (other overseas chat apps can be added later on request): reply 666 for the schedule, reply the match number for the live link, and add it as an OBS Media Source to go live.',
      '專為足球、籃球解說團隊與主播工作室設計，無需任何介面開發。目前僅支援足球與籃球賽程取流，暫不提供其他球類。付費後拉入與機器人的專屬群（支援 Telegram 與 Lark；後續可按客戶需求拓展其他海外聊天軟體）：群內回覆 666 取得賽程，回覆序號拿到專屬直播連結，在 OBS 內添加為「媒體源」即可開播。'
    ),
    scene: zh(
      '主播不需要懂技术，也不用等研发排期。机器人目前仅覆盖足球与篮球联赛（不含网球、棒球、冰球等其他球类）。开赛前在群里发 666 刷新赛程，回复对应场次序号（赛前 20–30 分钟生效），机器人立即返回该场的稳定信号（卫星源、赛场原声）以及用于覆盖保障的灾备流。复制链接到 OBS 添加为「媒体源」，约 5–10 秒即出高清画面，主播直接叠加自己的麦克风解说推往各大直播间。',
      'Streamers need zero coding or engineering support. The bot currently covers football and basketball leagues only (no tennis, baseball, ice hockey, or other sports). Send 666 in the group to refresh fixtures, reply with the match number (active 20–30 minutes before kickoff), and the bot returns the stable feeds (Satellite and Raw stadium audio) plus backup lines for coverage. Paste the link into OBS as a Media Source — picture appears in 5–10 seconds so the host can add commentary and stream to their channel.',
      '主播不需要懂技術，也不用等研發排期。機器人目前僅覆蓋足球與籃球聯賽（不含網球、棒球、冰球等其他球類）。開賽前在群裡發 666 重新整理賽程，回覆對應場次序號（賽前 20–30 分鐘生效），機器人立即回傳該場的穩定訊號（衛星源、賽場原聲）以及用於覆蓋保障的災備流。複製連結到 OBS 添加為「媒體源」，約 5–10 秒即出高清畫面，主播直接疊加自己的麥克風解說推往各大直播間。'
    ),
    moments: [
      {
        title: zh('Telegram / Lark 专属群，零代码即开即用', 'Dedicated Telegram & Lark Groups, Zero Code', 'Telegram / Lark 專屬群，零程式碼即開即用'),
        body: zh(
          '付费后直接拉专属机器人群，现成支持 Telegram 与 Lark。若客户有其他海外聊天软件需求，后续也可按需拓展。工作室成员在群内发数字即可取流，彻底省去接口研发成本。',
          'We set up a dedicated bot group immediately after payment, natively supporting Telegram and Lark. Other overseas chat apps can be added later on request. Hosts pull streams by sending numbers in chat — zero API work.',
          '付費後直接拉專屬機器人群，現成支援 Telegram 與 Lark。若客戶有其他海外聊天軟體需求，後續也可按需拓展。工作室成員在群內發數字即可取流，徹底省去介面研發成本。'
        ),
      },
      {
        title: zh('稳定信号 + 灾备覆盖，同场多线可选', 'Stable Feeds + Backup Coverage, Multi-Line per Match', '穩定訊號 + 災備覆蓋，同場多線可選'),
        body: zh(
          '稳定流以「🛰️ 卫星源」和「🎙️ 赛场原声（无解说原音）」为主，画质可靠、适合主播配音。网络源、南亚高清及第三方备用流主要用于扩大联赛覆盖与突发灾备，不作为主力依赖。',
          'Stable delivery centers on Satellite Feeds and Raw stadium audio (no commentary). Web, South Asia HD, and third-party links mainly expand league coverage and act as failover backups — not the primary choice.',
          '穩定流以「🛰️ 衛星源」和「🎙️ 賽場原聲（無解說原音）」為主，畫質可靠、適合主播配音。網路源、南亞高清及第三方備用流主要用於擴大聯賽覆蓋與突發災備，不作為主力依賴。'
        ),
      },
      {
        title: zh('目前仅支持足球与篮球联赛白名单', 'Football & Basketball Allowlist Only', '目前僅支援足球與籃球聯賽白名單'),
        body: zh(
          '机器人目前只开放足球与篮球赛程，其他球类暂不支持。列表基于预设联赛白名单生成，避免冷门场次刷屏；若你关注的足篮联赛未出现，可在群内回复 add 或联系管理员核实资源后加入白名单。',
          'The bot currently lists football and basketball only — other sports are not supported. Fixtures follow a preset league allowlist to keep chat clean; if a football or basketball league you cover is missing, reply "add" or ask the admin to verify and whitelist it.',
          '機器人目前只開放足球與籃球賽程，其他球類暫不支援。列表基於預設聯賽白名單產生，避免冷門場次刷屏；若你關注的足籃聯賽未出現，可在群內回覆 add 或聯繫管理員核實資源後加入白名單。'
        ),
      },
      {
        title: zh('独立套餐并发 IP 保护，保障解说期间不断流', 'Dedicated IP Concurrency & Anti-Abuse Protection', '獨立套餐併發 IP 保護，保障解說期間不斷流'),
        body: zh(
          '每条直播链接按当前套餐设定最大连接 IP 数限制，并配实时监控，防止群外泄露或被他人盗用转推打满带宽，确保主播在 OBS 推流解说期间画面稳定。',
          'Each stream link enforces a maximum concurrent IP limit based on your plan with real-time monitoring, preventing outside leaks or unauthorized restreaming so your hosts stay rock-solid on air.',
          '每條直播連結按目前套餐設定最大連線 IP 數限制，並配即時監控，防止群外洩露或被他人盜用轉推打滿頻寬，確保主播在 OBS 推流解說期間畫面穩定。'
        ),
      },
    ],
    steps: [
      {
        title: zh('确认套餐名额，拉入 Telegram 或 Lark 专属群', 'Confirm Plan & Join Your Telegram / Lark Bot Group', '確認套餐名額，拉入 Telegram 或 Lark 專屬群'),
        body: zh(
          '根据工作室同时开播的主播人数（单链接最大连接 IP 数）确认套餐。付费后为你创建专属群并拉入赛事直播机器人（标准支持 Telegram 与 Lark；后续可按需拓展其他海外即时通讯应用）。',
          'Select a plan based on how many hosts stream concurrently (max IPs per link). After payment, we create your dedicated Telegram or Lark group with the bot. Other overseas chat apps can be added later if needed.',
          '根據工作室同時開播的主播人數（單連結最大連線 IP 數）確認套餐。付費後為你建立專屬群並拉入賽事直播機器人（標準支援 Telegram 與 Lark；後續可按需拓展其他海外即時通訊應用）。'
        ),
      },
      {
        title: zh('群内回复 666，获取今日 / 近期比赛列表', 'Reply 666 in Group to Fetch Upcoming Fixtures', '群內回覆 666，取得今日 / 近期比賽列表'),
        body: zh(
          '随时在群内发送 666 刷新赛程。机器人会分类列出「卫星源（未来 12 小时）」与「网络源（未来 3 小时）」的序号、时间、联赛与对阵；缺联赛可回复 add 或找管理员加入白名单。',
          'Send 666 anytime to refresh the schedule. The bot lists numbered fixtures under Satellite Feeds (next 12h) and Web Feeds (next 3h). Missing a league? Reply "add" or ask the admin to whitelist it.',
          '隨時在群內發送 666 重新整理賽程。機器人會分類列出「衛星源（未來 12 小時）」與「網路源（未來 3 小時）」的序號、時間、聯賽與對陣；缺聯賽可回覆 add 或找管理員加入白名單。'
        ),
      },
      {
        title: zh('赛前 20–30 分钟回复比赛序号，领取直播链接', 'Reply Match Number 20–30 Mins Before Kickoff', '賽前 20–30 分鐘回覆比賽序號，領取直播連結'),
        body: zh(
          '在赛前 30 分钟内（卫星源建议赛前 20 分钟内查询）回复对应比赛的数字序号（如回复 2），机器人即刻返回该场的稳定线路（卫星源、赛场原声）以及覆盖用的灾备线路。',
          'Within 20–30 minutes before kickoff, reply with the fixture number (e.g., "2"). The bot immediately replies with the stable lines (Satellite, Raw Feed) and coverage backup URLs for that match.',
          '在賽前 30 分鐘內（衛星源建議賽前 20 分鐘內查詢）回覆對應比賽的數字序號（如回覆 2），機器人即刻回傳該場的穩定線路（衛星源、賽場原聲）以及覆蓋用的災備線路。'
        ),
      },
      {
        title: zh('在 OBS 添加为「媒体源」，5–10 秒出画面开播', 'Add as OBS "Media Source" & Go Live in 5–10s', '在 OBS 添加為「媒體源」，5–10 秒出畫面開播'),
        body: zh(
          '复制链接，在 OBS 来源中新建「媒体源（Media Source）」，取消勾选本地文件并粘贴链接。约 5–10 秒加载出画面后，即可叠加主播解说音轨与直播间包装推流开播（切勿用浏览器直接打开）。',
          'Copy the URL, add a new "Media Source" in OBS, uncheck Local File, and paste the URL. Video loads in 5–10 seconds — layer your mic commentary and overlays to start streaming (do not open the link in a browser).',
          '複製連結，在 OBS 來源中新建「媒體源（Media Source）」，取消勾選本地檔案並貼上連結。約 5–10 秒載入出畫面後，即可疊加主播解說音軌與直播間包裝推流開播（切勿用瀏覽器直接打開）。'
        ),
      },
    ],
    gets: [
      zh('目前仅支持足球与篮球赛程取流（不含其他球类）', 'Football and basketball fixtures only for now (no other sports)', '目前僅支援足球與籃球賽程取流（不含其他球類）'),
      zh('Telegram 或 Lark 专属机器人群（后续可按需拓展其他海外即时通讯应用）', 'Dedicated Telegram or Lark bot group (other overseas chat apps can be added later)', 'Telegram 或 Lark 專屬機器人群（後續可按需拓展其他海外即時通訊應用）'),
      zh('群内回复 666 获取卫星源（未来 12h）与网络源（未来 3h）赛程列表', 'Reply 666 for Satellite (next 12h) and Web (next 3h) fixture lists', '群內回覆 666 取得衛星源（未來 12h）與網路源（未來 3h）賽程列表'),
      zh('回复序号获取同场线路：稳定线路（卫星源 / 赛场原声）+ 覆盖灾备线路', 'Reply match number for stable lines (Satellite / Raw Feed) plus coverage backups', '回覆序號取得同場線路：穩定線路（衛星源 / 賽場原聲）+ 覆蓋災備線路'),
      zh('足篮联赛白名单过滤，支持群内回复 add 或联系管理员添加关注联赛', 'Football/basketball league allowlist with self-service "add" or admin expansion', '足籃聯賽白名單過濾，支援群內回覆 add 或聯繫管理員添加關注聯賽'),
    ],
    pay: [
      zh('按工作室套餐与单链接最大连接 IP 数（同时使用名额）计价', 'Priced by studio tier and maximum concurrent IPs per link (active streamer seats)', '按工作室套餐與單連結最大連線 IP 數（同時使用名額）計價'),
      zh('如需增加单条链接同时观看/推流的主播人数，可随时联系管理员升级套餐', 'Need more streamers on the same match link? Contact the admin anytime to upgrade IP seats', '如需增加單條連結同時觀看/推流的主播人數，可隨時聯繫管理員升級套餐'),
    ],
    prepare: [
      zh('Telegram 账号或 Lark 账号（用于进专属机器人群）', 'A Telegram or Lark account to join your dedicated bot group', 'Telegram 帳號或 Lark 帳號（用於進專屬機器人群）'),
      zh('电脑端安装 OBS Studio（在来源中添加为「媒体源」播放，勿用浏览器打开）', 'OBS Studio on desktop (add links as a "Media Source" — do not open in browsers)', '電腦端安裝 OBS Studio（在來源中添加為「媒體源」播放，勿用瀏覽器打開）'),
    ],
    limits: [
      zh('目前仅支持足球与篮球；网球、棒球、冰球、电竞等其他球类暂不开放取流', 'Football and basketball only for now; tennis, baseball, ice hockey, esports, and other sports are not available', '目前僅支援足球與籃球；網球、棒球、冰球、電競等其他球類暫不開放取流'),
      zh('链接仅限在 OBS 内添加为「媒体源」播放（约 5–10 秒出画面），请勿在浏览器中直接打开', 'Links must be played inside OBS as a "Media Source" (loads in 5–10s); do not open directly in a web browser', '連結僅限在 OBS 內添加為「媒體源」播放（約 5–10 秒出畫面），請勿在瀏覽器中直接打開'),
      zh('每条链接设有最大连接 IP 数限制；请勿多人超额共用或频繁切换多个 VPN 节点访问同一链接，以免触发风控导致无法播放', 'Each link enforces a max concurrent IP limit; do not share beyond your seat quota or switch across multiple VPNs on the same link', '每條連結設有最大連線 IP 數限制；請勿多人超額共用或頻繁切換多個 VPN 節點訪問同一連結，以免觸發風控導致無法播放'),
      zh('严禁拉流转推、对外分享或传播至群外及其他平台；所有链接均带实时监控，违规将导致系统自动拦截、机器人退群并终止服务', 'Restreaming raw feeds, sharing outside the group, or leaking links is strictly prohibited; links are monitored and violations trigger automatic termination', '嚴禁拉流轉推、對外分享或傳播至群外及其他平台；所有連結均帶即時監控，違規將導致系統自動攔截、機器人退群並終止服務'),
      zh('本产品供主播在 OBS 中解说二创推流；若需让终端观众在你的网站或 App 内直接点播观看，请选用「赛事直播线路」接口产品', 'Designed for hosts producing commentary in OBS; if end viewers watch directly inside your website or app, use Live Match Lines API instead', '本產品供主播在 OBS 中解說二創推流；若需讓終端觀眾在你的網站或 App 內直接點播觀看，請選用「賽事直播線路」介面產品'),
    ],
    solution: 'streamers',
  },
]

export const solutions: Solution[] = [
  {
    slug: 'apps',
    name: zh('体育网站与 App', 'Sports sites and apps', '體育網站與 App'),
    blurb: zh('站内播单场比赛，没有自建 CDN', 'Play single matches, no CDN of your own', '站內播單場比賽，沒有自建 CDN'),
    lede: zh(
      '你已经有网站或 App，观众要点进某一场比赛观看。你没有自己的流媒体分发网络。',
      'You already have a site or app. Viewers open a specific match. You do not run a delivery network.',
      '你已經有網站或 App，觀眾要點進某一場比賽觀看。你沒有自己的串流分發網路。'
    ),
    job: zh(
      '观众点开今晚的英超或欧冠，在你现在的比赛页里换线路，而不是跳去别的网站。',
      'A viewer opens tonight’s Premier League or Champions League match and switches lines on your existing match page, instead of leaving for another site.',
      '觀眾點開今晚的英超或歐冠，在你現在的比賽頁裡換線路，而不是跳去別的網站。'
    ),
    why: zh(
      '用直播链接。国际高清通常赛前 10 分钟以上就有 1080P，聚合线路覆盖更多联赛。流量向我们预充，你不用先建 CDN。',
      'Use playback links. Global HD is usually 1080p more than 10 minutes before kickoff, and Web Stream covers more leagues. Traffic is prepaid to us, so you do not build a CDN first.',
      '用直播連結。國際高清通常賽前 10 分鐘以上就有 1080P，聚合線路覆蓋更多聯賽。流量向我們預充，你不用先建 CDN。'
    ),
    product: 'streams',
    bring: [
      zh('赛程和赛果数据，来自你已采购的供应商或自建系统', 'Fixtures and results from a provider you already use, or from your own system', '賽程和賽果資料，來自你已採購的供應商或自建系統'),
      zh('如果数据商在我们的匹配范围内，可以在接口里直接带回你的赛事 ID', 'If your data provider is one we already map, the API can return your match ID', '如果資料商在我們的匹配範圍內，可以在介面裡直接帶回你的賽事 ID'),
    ],
    billing: [
      zh('线路订阅按运动范围与定制线路报价', 'Line subscription quoted by sports scope and custom lines', '線路訂閱按運動範圍與定制線路報價'),
      zh('播放流量按包预充，价格对齐阿里云国际', 'Prepaid delivery traffic, priced from Alibaba Cloud International', '播放流量按包預充，價格對齊阿里雲國際'),
    ],
    steps: [
      {
        title: zh('先看价格', 'Read the price first', '先看價格'),
        body: zh('价格和接入说明都在页面上。看过再进入测试。', 'The price and the integration notes are on the site. Read them, then start a trial.', '價格和接入說明都在頁面上。看過再進入測試。'),
      },
      {
        title: zh('看专属测试页', 'Review a private test page', '看專屬測試頁'),
        body: zh('测试页列出正在播出、以及接下来可能有线的比赛。', 'The test page lists matches on air and matches that may get a line.', '測試頁列出正在播出、以及接下來可能有線的比賽。'),
      },
      {
        title: zh('付费后开播放域名', 'Get a playback domain after payment', '付費後開播放域名'),
        body: zh('我们创建可统计流量的播放域名。赛事匹配也在付费后配置。', 'We create a playback domain with traffic reporting. Match mapping is configured after payment.', '我們建立可統計流量的播放域名。賽事匹配也在付費後設定。'),
      },
    ],
  },
  {
    slug: 'platforms',
    name: zh('自建分发的平台', 'Platforms with their own CDN', '自建分發的平台'),
    blurb: zh('用自己的播放域名和流量', 'Your domain, your traffic bill', '用自己的播放域名和流量'),
    lede: zh(
      '你已经有流媒体集群或云直播，希望播放域名、防盗链和流量成本都留在自己这边。',
      'You already operate a streaming stack or cloud live service, and you want the domain, hotlink rules, and traffic cost to stay with you.',
      '你已經有串流叢集或雲直播，希望播放域名、防盜鏈和流量成本都留在自己這邊。'
    ),
    job: zh(
      'NBA 和五大联赛继续在你现在的播放器里播。观众看不到我们的域名，流量也不要再付一次给我们。',
      'The NBA and the top leagues keep playing in your current player. Viewers never see our domain, and you do not pay us a second time for the same traffic.',
      'NBA 和五大聯賽繼續在你現在的播放器裡播。觀眾看不到我們的域名，流量也不要再付一次給我們。'
    ),
    why: zh(
      '用推流。我们把比赛送进你的 RTMP。你已经买好的流量包和防盗链继续有效。',
      'Use push delivery. We send the match into your RTMP endpoint. The traffic package and hotlink rules you already bought stay in force.',
      '用推流。我們把比賽送進你的 RTMP。你已經買好的流量包和防盜鏈繼續有效。'
    ),
    product: 'push',
    bring: [
      zh('RTMP 推流地址和密钥', 'An RTMP ingest URL and key', 'RTMP 推流地址和金鑰'),
      zh('自己的播放域名和防盗链', 'Your playback domain and hotlink protection', '自己的播放域名和防盜鏈'),
    ],
    billing: [
      zh('线路订阅按运动范围与定制线路报价', 'Line subscription quoted by sports scope and custom lines', '線路訂閱按運動範圍與定制線路報價'),
      zh('观众流量直接付给你的云厂商', 'Viewer traffic is paid to your cloud provider', '觀眾流量直接付給你的雲廠商'),
    ],
    steps: [
      {
        title: zh('确认推流地址可用', 'Confirm the ingest address', '確認推流地址可用'),
        body: zh('测试期可以把地址发到对接群，先确认格式是否符合要求。正式配置在付费后。', 'During the trial you can send the address for a format check. The live configuration starts after payment.', '測試期可以把地址發到對接群，先確認格式是否符合要求。正式設定在付費後。'),
      },
      {
        title: zh('我们开始推流', 'We start pushing', '我們開始推流'),
        body: zh('你在自己的流管理里看到在线流，再用 appName 和 streamName 拼接播放地址。', 'You see the live stream in your own console, then build the playback URL from appName and streamName.', '你在自己的流管理裡看到線上流，再用 appName 和 streamName 拼接播放地址。'),
      },
      {
        title: zh('在你的域名上防盗链', 'Protect your domain', '在你的域名上防盜鏈'),
        body: zh('盗链消耗的是你的流量。Referer、地区和 URL 鉴权要开在播放域名上。', 'Stolen links spend your traffic. Turn on Referer, geo, and URL auth on the playback domain.', '盜鏈消耗的是你的流量。Referer、地區和 URL 鑑權要開在播放域名上。'),
      },
    ],
  },
  {
    slug: 'channels',
    name: zh('频道型产品', 'Channel products', '頻道型產品'),
    blurb: zh('观众停在一个台上，而不是一场比赛', 'Viewers stay on a channel', '觀眾停在一個台上，而不是一場比賽'),
    lede: zh(
      '产品形态是 24 小时体育台：用户打开 ESPN、Sky Sports 或某支球队的台，而不是从赛程里点进一场比赛。',
      'The product is a 24-hour sports network. Someone opens ESPN, Sky Sports, or a team channel instead of picking a fixture from a schedule.',
      '產品形態是 24 小時體育台：使用者打開 ESPN、Sky Sports 或某支球隊的台，而不是從賽程裡點進一場比賽。'
    ),
    job: zh(
      '观众整晚停在 Sky Sports 或 ESPN 上。你要做的是节目单和换台，不是把一场英超嵌进赛程页。',
      'Viewers stay on Sky Sports or ESPN for the evening. You build a guide and a channel change, not a Premier League fixture page.',
      '觀眾整晚停在 Sky Sports 或 ESPN 上。你要做的是節目單和換台，不是把一場英超嵌進賽程頁。'
    ),
    why: zh(
      '选全球体育频道。播放走你自己的 Bunny。单场比赛如果也要，再加直播链接或推流。',
      'Use Global Sports Channels. Playback runs on your Bunny account. Add playback links or push if you also need single matches.',
      '選全球體育頻道。播放走你自己的 Bunny。單場比賽如果也要，再加直播連結或推流。'
    ),
    product: 'iptv',
    bring: [
      zh('可登录的 Bunny 账号、播放域名和安全密钥', 'A Bunny login, playback domain, and token key', '可登入的 Bunny 帳號、播放域名和安全金鑰'),
      zh('要做的是频道节目单，不是单场赛程页', 'A channel guide, not a single-match fixture page', '要做的是頻道節目單，不是單場賽程頁'),
    ],
    billing: [
      zh('全球体育频道另付费', 'Global Sports Channels is an extra charge', '全球體育頻道另付費'),
      zh('单场线路若需要，订阅另计', 'Single-match lines, if needed, are a separate subscription', '單場線路若需要，訂閱另計'),
    ],
    steps: [
      {
        title: zh('确认要的是频道', 'Confirm you need channels', '確認要的是頻道'),
        body: zh('如果观众只看某一场，用直播链接或推流即可，不必开通全球体育频道。', 'If viewers only watch a single match, use playback links or push. Global Sports Channels is unnecessary.', '如果觀眾只看某一場，用直播連結或推流即可，不必開通全球體育頻道。'),
      },
      {
        title: zh('开通后拉目录', 'Pull the guide after activation', '開通後拉目錄'),
        body: zh('节目单以频道列表接口为准，不要写死台名。', 'Build the guide from the channel API. Do not hard-code station names.', '節目單以頻道列表介面為準，不要寫死台名。'),
      },
      {
        title: zh('换台时现签地址', 'Sign the URL at tune-in', '換台時現簽地址'),
        body: zh('由服务端换链。过期后用同一个频道 id 再换一次。', 'Your server signs the URL. When it expires, exchange the same channel id again.', '由服務端換鏈。過期後用同一個頻道 id 再換一次。'),
      },
    ],
  },
  {
    slug: 'streamers',
    name: zh('体育主播与解说团队', 'Streamers and commentary teams', '體育主播與解說團隊'),
    blurb: zh('OBS 开播，不对接 API', 'Go live in OBS, no API project', 'OBS 開播，不對接 API'),
    lede: zh(
      '主播要的是一场比赛的画面，用来在自己的直播间里解说。团队里没有人要接接口。',
      'The streamer needs the picture of a match for their own broadcast. Nobody on the team is going to integrate an API.',
      '主播要的是一場比賽的畫面，用來在自己的直播間裡解說。團隊裡沒有人要接介面。'
    ),
    job: zh(
      '今晚英超或 NBA 开赛前，主播在 Telegram 里收到地址，放进 OBS 就开始说。本地解说是主播自己的。',
      'Before tonight’s Premier League or NBA tip, the host gets the URL in Telegram, drops it into OBS, and starts the call. Local commentary is theirs.',
      '今晚英超或 NBA 開賽前，主播在 Telegram 裡收到地址，放進 OBS 就開始說。本地解說是主播自己的。'
    ),
    why: zh(
      '选 OBS直播流机器人。开赛前它在 Telegram 里把这场直播流发给主播，放进 OBS 就能解说。这和网站接入是两条产品。',
      'Use OBS Streamer Bot. Before kickoff it sends the match to the host on Telegram, ready to drop into OBS. It is a different product from a website integration.',
      '選 OBS直播流機器人。開賽前它在 Telegram 裡把這場直播流發給主播，放進 OBS 就能解說。這和網站接入是兩條產品。'
    ),
    product: 'assistant',
    bring: [
      zh('Telegram', 'Telegram', 'Telegram'),
      zh('OBS 或同类软件，以及主播自己的直播间', 'OBS or similar, plus the streamer’s own channel', 'OBS 或同類軟體，以及主播自己的直播間'),
    ],
    billing: [
      zh('按主播场景单独计价', 'Priced for the streamer use case', '按主播場景單獨計價'),
    ],
    steps: [
      {
        title: zh('说明要解说的运动', 'Tell us which sports you call', '說明要解說的運動'),
        body: zh('不同运动的进流时间和线路不一样，测试前先在页面上确认覆盖和价格。', 'Lead time and line types differ by sport. Check coverage and the price on the site before a trial.', '不同運動的進流時間和線路不一樣，測試前先在頁面上確認覆蓋和價格。'),
      },
      {
        title: zh('开通机器人', 'Enable the bot', '開通機器人'),
        body: zh('主播在 Telegram 接收直播流。', 'Streamers receive lines in Telegram.', '主播在 Telegram 接收直播流。'),
      },
      {
        title: zh('OBS 开播', 'Go live in OBS', 'OBS 開播'),
        body: zh('本地语言解说由主播自己完成。我们提供的是转播原声画面。', 'The streamer adds local commentary. We supply the original broadcast picture and sound.', '本地語言解說由主播自己完成。我們提供的是轉播原聲畫面。'),
      },
    ],
  },
]

export type CaseStudy = {
  id: string
  product: ProductSlug
  solution: SolutionSlug
  badge: Copy
  modeLabel: Copy
  title: Copy
  subtitle: Copy
  tags: Copy[]
  metrics: { value: Copy; label: Copy }[]
  dataFlow: Copy[]
  trafficOwner: Copy
  securitySetup: Copy
  situation: Copy
  choice: Copy
  outcome: Copy
}

export const cases: CaseStudy[] = [
  {
    id: 'sea-football-app',
    product: 'streams',
    solution: 'apps',
    badge: zh('案例 01 · 即时比分与体育直播网 / App', 'Case 01 · Live Scores & Sports Streaming Site / App', '案例 01 · 即時比分與體育直播網 / App'),
    modeLabel: zh('赛事直播线路', 'Live Match Lines', '賽事直播線路'),
    title: zh('体育即时比分与赛事直播网站 / App', 'Sports Live Scores & Match Streaming Site / App', '體育即時比分與賽事直播網站 / App'),
    subtitle: zh(
      '客户原本就有足球、篮球等即时比分与赛程列表，希望让球迷点进比赛就能直接看高清直播、边看边聊',
      'Customers who already run a live-score site or app and want fans to click into any match to watch HD video and chat',
      '客戶原本就有足球、籃球等即時比分與賽程列表，希望讓球迷點進比賽就能直接看高清直播、邊看邊聊'
    ),
    tags: [
      zh('即时比分网站 / App', 'Live Scores Site / App', '即時比分網站 / App'),
      zh('比赛详情页内嵌播放器', 'In-Page Match Player', '比賽詳情頁內嵌播放器'),
      zh('多线路自由切换', 'Multi-Line Switching', '多線路自由切換'),
    ],
    metrics: [],
    dataFlow: [],
    trafficOwner: zh('', '', ''),
    securitySetup: zh('', '', ''),
    situation: zh(
      '赛程列表自动点亮「直播」图标，把枯燥的文字比分升级为图文+视频直播站',
      'Turn plain score tables into live video hubs with automatic stream badges on active matches',
      '賽程列表自動點亮「直播」圖示，把枯燥的文字比分升級為圖文+視訊直播站'
    ),
    choice: zh(
      '单场比赛提供国际高清 1080P、聚合与赛场原声多条线路，观众在站内自由切换不卡顿',
      'Provide 1080p Global HD, Web, and Raw audio feeds per match so viewers switch lines seamlessly',
      '單場比賽提供國際高清 1080P、聚合與賽場原聲多條線路，觀眾在站內自由切換不卡頓'
    ),
    outcome: zh(
      '球迷留在你的比赛间边看高清画面边发弹幕互动，不再跳去其他网站找球看',
      'Keep fans inside your match room watching HD video and chatting live instead of leaving for other sites',
      '球迷留在你的比賽間邊看高清畫面邊發彈幕互動，不再跳去其他網站找球看'
    ),
  },
  {
    id: 'overseas-guide',
    product: 'iptv',
    solution: 'channels',
    badge: zh('案例 02 · 海外 24 小时体育电视与 OTT 产品', 'Case 02 · Overseas 24/7 Sports TV & OTT Product', '案例 02 · 海外 24 小時體育電視與 OTT 產品'),
    modeLabel: zh('全球体育频道', 'Global Sports Channels', '全球體育頻道'),
    title: zh('海外 24 小时体育电视频道页 / 电视盒子', '24/7 Sports TV Channel Guide & OTT Box', '海外 24 小時體育電視頻道頁 / 電視盒子'),
    subtitle: zh(
      '面向欧美与亚太用户的体育频道产品，观众习惯按电视台（如 Sky Sports、ESPN）或电视节目单整晚挂机收看',
      'Built for overseas viewers who prefer tuning in to Sky Sports, ESPN, or TNT Sports all evening like cable TV',
      '面向歐美與亞太使用者的體育頻道產品，觀眾習慣按電視台（如 Sky Sports、ESPN）或電視節目單整晚掛機收看'
    ),
    tags: [
      zh('100+ 欧美亚太主流体育台', '100+ Overseas Sports Networks', '100+ 歐美亞太主流體育台'),
      zh('联赛专属球队台', 'League Team Channels', '聯賽專屬球隊台'),
      zh('全天候节目单导航', '24/7 TV Program Guide', '全天候節目單導航'),
    ],
    metrics: [],
    dataFlow: [],
    trafficOwner: zh('', '', ''),
    securitySetup: zh('', '', ''),
    situation: zh(
      '一次接入英、美、加、澳、新、马等 100+ 主流体育电视台与俱乐部球队台',
      'Add 100+ linear sports networks and club team channels across the UK, US, Canada, and APAC',
      '一次接入英、美、加、澳、新、馬等 100+ 主流體育電視台與俱樂部球隊台'
    ),
    choice: zh(
      '自带每日电视节目单（EPG），观众既能按台号换台，也能按今日播出节目点进对应频道',
      'Includes a daily TV program guide so viewers can browse by channel or jump in from upcoming shows',
      '自帶每日電視節目單（EPG），觀眾既能按台號換台，也能按今日播出節目點進對應頻道'
    ),
    outcome: zh(
      '24 小时全天候不断流播出（含正赛、演播室预热与赛后复盘），打造有线电视级观看体验',
      '24/7 continuous broadcast including live games, studio pre-shows, and post-match analysis',
      '24 小時全天候不斷流播出（含正賽、演播室預熱與賽後復盤），打造有線電視級觀看體驗'
    ),
  },
  {
    id: 'commentary-desk',
    product: 'assistant',
    solution: 'streamers',
    badge: zh('案例 03 · 足球与篮球主播解说工作室', 'Case 03 · Football & Basketball Commentary Studio', '案例 03 · 足球與籃球主播解說工作室'),
    modeLabel: zh('OBS 直播流机器人', 'OBS Streamer Bot', 'OBS 直播流機器人'),
    title: zh('足球与篮球主播解说二创工作室', 'Football & Basketball Streamer Studio', '足球與籃球主播解說二創工作室'),
    subtitle: zh(
      '团队专注足篮赛事二路配音解说，没有程序员开发网站，需要主播开赛前自己拿流放进 OBS 开播',
      'Commentary desks calling football and basketball on OBS with zero developers to build an API',
      '團隊專注足籃賽事二路配音解說，沒有工程師開發網站，需要主播開賽前自己拿流放進 OBS 開播'
    ),
    tags: [
      zh('专注足球与篮球', 'Football & Basketball', '專注足球與籃球'),
      zh('Telegram / Lark 群自助取流', 'Telegram / Lark Bot Group', 'Telegram / Lark 群自助取流'),
      zh('OBS 媒体源即插即播', 'OBS Media Source Ready', 'OBS 媒體源即插即播'),
    ],
    metrics: [],
    dataFlow: [],
    trafficOwner: zh('', '', ''),
    securitySetup: zh('', '', ''),
    situation: zh(
      '零代码成本，拉入 Telegram 或 Lark 专属群即可全团队自助取流，无需雇研发对接接口',
      'Zero coding required — join a dedicated Telegram or Lark group and pull match links via chat commands',
      '零程式碼成本，拉入 Telegram 或 Lark 專屬群即可全團隊自助取流，無需雇研發對接介面'
    ),
    choice: zh(
      '提供高清低延迟「卫星源」与无解说「赛场原声」，主播保留球场欢呼声直接叠加自己的麦克风配音',
      'Delivers low-latency Satellite feeds and clean stadium-audio Raw Feeds ideal for voiceover commentary',
      '提供高清低延遲「衛星源」與無解說「賽場原聲」，主播保留球場歡呼聲直接疊加自己的麥克風配音'
    ),
    outcome: zh(
      '粘贴进 OBS「媒体源」5–10 秒即出高清画面，支持多名主播按套餐名额同时稳定开播',
      'Loads in OBS Media Source within 5–10 seconds, supporting multiple studio hosts streaming concurrently',
      '貼進 OBS「媒體源」5–10 秒即出高清畫面，支援多名主播按套餐名額同時穩定開播'
    ),
  },
]

export const sports: { name: Copy; note: Copy }[] = [
  { name: zh('足球', 'Football', '足球'), note: zh('英超、西甲、意甲、德甲、法甲、欧冠、解放者杯等', 'Premier League, La Liga, Serie A, Bundesliga, Ligue 1, UCL, Copa Libertadores', '英超、西甲、義甲、德甲、法甲、歐冠、解放者盃等') },
  { name: zh('板球', 'Cricket', '板球'), note: zh('IPL、T20 国际赛、板球测试赛等', 'IPL, T20 Internationals, Test Cricket, and more', 'IPL、T20 國際賽、板球測試賽等') },
  { name: zh('美式足球', 'American Football', '美式足球'), note: zh('NFL、NCAAF', 'NFL, NCAAF', 'NFL、NCAAF') },
  { name: zh('英式橄榄球', 'Rugby League', '英式橄欖球'), note: zh('主流职业联赛与国际赛', 'Major professional leagues and internationals', '主流職業聯賽與國際賽') },
  { name: zh('澳式橄榄球', 'Australian Football', '澳式橄欖球'), note: zh('AFL', 'AFL', 'AFL') },
  { name: zh('网球', 'Tennis', '網球'), note: zh('四大满贯、ATP、WTA 巡回赛', 'Grand Slams, ATP, and WTA tours', '四大滿貫、ATP、WTA 巡迴賽') },
  { name: zh('斯诺克', 'Snooker', '斯諾克'), note: zh('世锦赛、大师赛、英锦赛等巡回赛', 'World Championship, Masters, UK Championship', '世錦賽、大師賽、英錦賽等巡迴賽') },
  { name: zh('棒球', 'Baseball', '棒球'), note: zh('MLB、NPB、KBO 等', 'MLB, NPB, KBO', 'MLB、NPB、KBO 等') },
  { name: zh('冰球', 'Ice Hockey', '冰球'), note: zh('NHL 及各国职业冰球联赛', 'NHL and national leagues', 'NHL 及各國職業冰球聯賽') },
  { name: zh('篮球', 'Basketball', '籃球'), note: zh('NBA、WNBA、CBA、欧洲篮球联赛等', 'NBA, WNBA, CBA, EuroLeague', 'NBA、WNBA、CBA、歐洲籃球聯賽等') },
  { name: zh('排球', 'Volleyball', '排球'), note: zh('国家队赛事与各国俱乐部联赛', 'National team events and club leagues', '國家隊賽事與各國俱樂部聯賽') },
  { name: zh('乒乓球', 'Table Tennis', '乒乓球'), note: zh('WTT 及国际巡回赛', 'WTT and international tour events', 'WTT 及國際巡迴賽') },
  { name: zh('羽毛球', 'Badminton', '羽毛球'), note: zh('世界羽联超级系列赛与团体赛', 'BWF Super Series and team events', '世界羽聯超級系列賽與團體賽') },
  { name: zh('电竞', 'Esports', '電競'), note: zh('英雄联盟、CS:GO、王者荣耀、Dota 2', 'League of Legends, CS:GO, Honor of Kings, Dota 2', '英雄聯盟、CS:GO、王者榮耀、Dota 2') },
  { name: zh('F1', 'Motorsport', 'F1'), note: zh('F1、MotoGP、世界超摩等（按分站赛名返回）', 'F1, MotoGP, World SBK (returned as event sessions)', 'F1、MotoGP、世界超摩等（按分站賽名回傳）') },
  { name: zh('格斗', 'Combat Sports', '格鬥'), note: zh('UFC 等综合格斗与拳击（按整场赛事名返回）', 'UFC, MMA, and boxing (returned as event names)', 'UFC 等綜合格鬥與拳擊（按整場賽事名回傳）') },
  { name: zh('摔跤', 'Wrestling', '摔跤'), note: zh('WWE 等职业摔跤赛事（按整场赛事名返回）', 'Pro wrestling events (returned as event names)', 'WWE 等職業摔跤賽事（按整場賽事名回傳）') },
]

export const lines: {
  suffix: string
  name: Copy
  nameEn: string
  quality: Copy
  coverage: Copy
  linkDefault: boolean
  pushDefault: boolean
  requiresIptv?: boolean
}[] = [
  {
    suffix: '无后缀',
    name: zh('聚合线路', 'Web Stream', '聚合線路'),
    nameEn: 'Web Stream',
    quality: zh('清晰度不固定 · 提前 3 分钟以上进流', 'Quality varies · Up 3+ min before kickoff', '清晰度不固定 · 提前 3 分鐘以上進流'),
    coverage: zh('覆盖最全的网络线路，综合稳定性与延迟表现均衡', 'Broadest coverage across competitions, with balanced stability and latency', '覆蓋最全的網路線路，綜合穩定性與延遲表現均衡'),
    linkDefault: true,
    pushDefault: true,
  },
  {
    suffix: '-hd',
    name: zh('国际高清', 'Global HD', '國際高清'),
    nameEn: 'Global HD',
    quality: zh('1080P · 提前 10 分钟以上进流', '1080p · Up 10+ min before kickoff', '1080P · 提前 10 分鐘以上進流'),
    coverage: zh('覆盖欧美热门赛事（五大联赛、欧冠、NBA、MLB 等）', 'Covers major European and US events (top 5 football leagues, UCL, NBA, MLB)', '覆蓋歐美熱門賽事（五大聯賽、歐冠、NBA、MLB 等）'),
    linkDefault: true,
    pushDefault: true,
  },
  {
    suffix: '-raw',
    name: zh('赛场原声', 'Raw Feed', '賽場原聲'),
    nameEn: 'Raw Feed',
    quality: zh('高清 · 提前 20 分钟进流', 'HD · Up 20 min before kickoff', '高清 · 提前 20 分鐘進流'),
    coverage: zh('覆盖 NBA、CBA、亚冠、五大联赛等热门赛事，一般为球场原音无解说', 'Covers NBA, CBA, AFC Champions League, and top 5 European football leagues; clean stadium audio without commentary', '覆蓋 NBA、CBA、亞冠、五大聯賽等熱門賽事，一般為球場原音無解說'),
    linkDefault: true,
    pushDefault: false,
  },
  {
    suffix: '-cnhd',
    name: zh('中文线路', 'CN Channel', '中文線路'),
    nameEn: 'CN Channel',
    quality: zh('高清 · 提前 10 分钟进流', 'HD · Up 10 min before kickoff', '高清 · 提前 10 分鐘進流'),
    coverage: zh('大陆转播媒体直播信号，面向中文区观众', 'Mainland China broadcast media feeds for Chinese-speaking viewers', '大陸轉播媒體直播訊號，面向中文區觀眾'),
    linkDefault: false,
    pushDefault: false,
  },
  {
    suffix: '-twhd',
    name: zh('台湾频道', 'TW Channel', '台灣頻道'),
    nameEn: 'TW Channel',
    quality: zh('720P · 提前 10 分钟进流', '720p · Up 10 min before kickoff', '720P · 提前 10 分鐘進流'),
    coverage: zh('台湾爱尔达 Elta / 纬来体育等直播赛事，面向繁体中文观众', 'Taiwan broadcasts (Elta, Videoland Sports) for Traditional Chinese viewers', '台灣愛爾達 Elta / 緯來體育等直播賽事，面向繁體中文觀眾'),
    linkDefault: false,
    pushDefault: false,
  },
  {
    suffix: '-krsd',
    name: zh('韩国线路', 'Korea Feed', '韓國線路'),
    nameEn: 'Korea Feed',
    quality: zh('清晰度不固定 · 通常开赛前后进流', 'Quality varies · Usually around kickoff', '清晰度不固定 · 通常開賽前後進流'),
    coverage: zh('韩国本地体育频道转播信号，面向韩语市场观众', 'Korean sports broadcast feeds for Korean-speaking viewers', '韓國本地體育頻道轉播訊號，面向韓語市場觀眾'),
    linkDefault: false,
    pushDefault: false,
  },
  {
    suffix: '-fancode',
    name: zh('南亚高清', 'Fancode Feed', '南亞高清'),
    nameEn: 'Fancode Feed',
    quality: zh('高清 · 提前 10 分钟进流', 'HD · Up 10 min before kickoff', '高清 · 提前 10 分鐘進流'),
    coverage: zh('主要覆盖板球（IPL 等），以及西甲、沙特联等部分足球联赛和 F1', 'Mainly cricket (IPL, etc.), plus selected football leagues (La Liga, Saudi Pro League) and F1', '主要覆蓋板球（IPL 等），以及西甲、沙特聯等部分足球聯賽和 F1'),
    linkDefault: false,
    pushDefault: false,
  },
  {
    suffix: 'channels',
    name: zh('IPTV 线路', 'IPTV Feeds', 'IPTV 線路'),
    nameEn: 'IPTV Feeds',
    quality: zh('高清 · 24 小时有流 · 信号极稳定', 'HD · 24/7 on air · Ultra-steady signal', '高清 · 24 小時有流 · 訊號極穩定'),
    coverage: zh('覆盖欧美主流联赛；仅在同时开通「全球体育频道」服务后开放', 'Covers major European and US leagues; enabled only when subscribed to Global Sports Channels', '覆蓋歐美主流聯賽；僅在同時開通「全球體育頻道」服務後開放'),
    linkDefault: false,
    pushDefault: false,
    requiresIptv: true,
  },
]

export const streamsDeliveryModes = {
  eyebrow: zh('两种接入模式 · 二选一', 'Two delivery modes · Pick one', '兩種接入模式 · 二選一'),
  title: zh('直播链接模式 vs RTMP 推流模式', 'Playback Links Mode vs RTMP Push Mode', '直播連結模式 vs RTMP 推流模式'),
  lede: zh(
    '两种模式覆盖的球类、赛事与线路完全相同，对接前只需二选一。核心区别在于「最终由谁把视频流分发给终端观众」，从而决定了下行播放流量（水费）落在哪一方的云服务器上。',
    'Both modes carry the exact same sports, matches, and stream lines — you only choose one before integrating. The sole difference is who distributes the video stream to end viewers, which determines whose cloud account pays for downstream viewer traffic.',
    '兩種模式覆蓋的球類、賽事與線路完全相同，對接前只需二選一。核心區別在於「最終由誰把視訊流分發給終端觀眾」，從而決定了下行播放流量（水費）落在哪一方的雲端伺服器上。'
  ),
  analogyTitle: zh(
    '下行播放流量怎么算？底层托管在阿里云国际版，按阿里云标准直播单价（USD/GB）计费',
    'How downstream traffic is billed: Hosted on Alibaba Cloud International, billed at standard USD/GB rates',
    '下行播放流量怎麼算？底層託管在阿里雲國際版，按阿里雲標準直播單價（USD/GB）計費'
  ),
  analogyBody: zh(
    '你向 SLA 支付的「订阅服务费」，相当于接通自来水管的资格与制水成本（我们负责采集全球上游高清信号源、解码、推流与全天候运维）。观众看直播消耗的「下行播放流量」就像水龙头流出的水费——看的人越多、时间越长，消耗的流量越多。在「直播链接模式」下，我们的直播流底层托管在阿里云国际版（Alibaba Cloud ApsaraVideo Live），下行流量费按照阿里云标准直播流量单价（美元/GB）向我们预充结算：',
    'Your SLA subscription fee covers signal acquisition, decoding, publishing, and 24/7 operations. Downstream viewer traffic is like the water bill — the more viewers and watch time, the more GB consumed. In Playback Links mode, streams are hosted on Alibaba Cloud International (ApsaraVideo Live), and downstream traffic is prepaid at Alibaba Cloud Standard Streaming traffic rates (USD/GB):',
    '你向 SLA 支付的「訂閱服務費」，相當於接通自來水管的資格與製水成本（我們負責採集全球上游高清訊號源、解碼、推流與全天候運維）。觀眾看直播消耗的「下行播放流量」就像水龍頭流出的水費——看的人越多、時間越長，消耗的流量越多。在「直播連結模式」下，我們的直播流底層託管在阿里雲國際版（Alibaba Cloud ApsaraVideo Live），下行流量費按照阿里雲標準直播流量單價（美元/GB）向我們預充結算：'
  ),
  trafficTableTitle: zh(
    '阿里云国际版 · 标准直播下行流量价格表（单位：USD / GB）',
    'Alibaba Cloud International · Standard Streaming Downstream Traffic Pricing (Unit: USD / GB)',
    '阿里雲國際版 · 標準直播下行流量價格表（單位：USD / GB）'
  ),
  trafficRegions: [
    { key: 'cn', label: zh('中国大陆 (CN)', 'Mainland China (CN)', '中國大陸 (CN)'), rate: '$0.042 / GB', scope: zh('中国大陆境内', 'Mainland China', '中國大陸境內') },
    { key: 'na', label: zh('北美 (NA)', 'North America (NA)', '北美 (NA)'), rate: '$0.070 / GB', scope: zh('美国、加拿大', 'United States, Canada', '美國、加拿大') },
    { key: 'eu', label: zh('欧洲 (EU)', 'Europe (EU)', '歐洲 (EU)'), rate: '$0.070 / GB', scope: zh('英国、法国、德国、西班牙、意大利、荷兰、瑞典、乌克兰', 'UK, France, Germany, Spain, Italy, Netherlands, Sweden, Ukraine', '英國、法國、德國、西班牙、義大利、荷蘭、瑞典、烏克蘭') },
    { key: 'ap1', label: zh('亚太 1 区 (AP1)', 'Asia Pacific 1 (AP1)', '亞太 1 區 (AP1)'), rate: '$0.081 / GB', scope: zh('中国香港、中国澳门、中国台湾、日本，及除越南/印尼外的东南亚国家', 'HK, Macao, Taiwan, Japan, and SE Asia excl. Vietnam & Indonesia', '中國香港、中國澳門、中國台灣、日本，及除越南/印尼外的東南亞國家') },
    { key: 'ap2', label: zh('亚太 2 区 (AP2)', 'Asia Pacific 2 (AP2)', '亞太 2 區 (AP2)'), rate: '$0.108 / GB', scope: zh('印度尼西亚、韩国、越南', 'Indonesia, South Korea, Vietnam', '印度尼西亞、韓國、越南') },
    { key: 'ap3', label: zh('亚太 3 区 (AP3)', 'Asia Pacific 3 (AP3)', '亞太 3 區 (AP3)'), rate: '$0.096 / GB', scope: zh('澳大利亚、新西兰', 'Australia, New Zealand', '澳洲、紐西蘭') },
    { key: 'sau', label: zh('沙特阿拉伯 (SAU)', 'Saudi Arabia (SAU)', '沙烏地阿拉伯 (SAU)'), rate: '$0.097 / GB', scope: zh('沙特阿拉伯', 'Saudi Arabia', '沙烏地阿拉伯') },
    { key: 'meaa', label: zh('中东与非洲 (MEAA)', 'Middle East & Africa (MEAA)', '中東與非洲 (MEAA)'), rate: '$0.200 / GB', scope: zh('阿联酋、阿曼、科威特、南非', 'UAE, Oman, Kuwait, South Africa', '阿聯酋、阿曼、科威特、南非') },
    { key: 'sa', label: zh('南美 (SA)', 'South America (SA)', '南美 (SA)'), rate: '$0.200 / GB', scope: zh('巴西等南美地区', 'Brazil & South America', '巴西等南美地區') },
  ],
  modes: [
    {
      id: 'playback',
      badge: zh('模式一 · 托管分发', 'Mode 01 · Hosted Delivery', '模式一 · 託管分發'),
      name: zh('Streams 接口（直播链接模式）', 'Streams API (Playback Links Mode)', 'Streams 介面（直播連結模式）'),
      endpoint: 'GET https://api.sla.homes/lives/streams',
      flow: zh('我们（信号源） → SLA 云服务器 → 终端观众', 'SLA Signal Source → SLA Cloud Servers → End Viewers', '我們（訊號源） → SLA 雲端伺服器 → 終端觀眾'),
      summary: zh(
        '接口直接返回现成可播的 m3u8 / flv / rtmp 链接，观众的视频数据从我们的云服务器直接下发。付费后为你分配专户专用的独立播放域名与流量统计后台。',
        'The API returns ready-to-play m3u8 / flv / rtmp URLs and viewers stream directly from SLA’s cloud. Paid accounts receive an exclusive playback domain and a traffic usage console.',
        '介面直接回傳現成可播的 m3u8 / flv / rtmp 連結，觀眾的視訊資料從我們的雲端伺服器直接下發。付費後為你分配專戶專用的獨立播放域名與流量統計後台。'
      ),
      billing: zh(
        '观众观看产生的下行流量消耗在 SLA 云端，参考阿里云国际标准价格向我们预充流量包。',
        'Viewer traffic is consumed on SLA’s cloud. Prepay traffic packages with us at standard Alibaba Cloud International rates.',
        '觀眾觀看產生的下行流量消耗在 SLA 雲端，參考阿里雲國際標準價格向我們預充流量包。'
      ),
      fit: zh(
        '适合希望快速上线、无自建流媒体分发网络、希望把 CDN 与防盗链运维交由我们托管的团队。',
        'Best for teams that want fast time-to-launch without building their own CDN stack.',
        '適合希望快速上線、無自建串流媒體分發網路、希望把 CDN 與防盜鏈運維交由我們託管的團隊。'
      ),
    },
    {
      id: 'push',
      badge: zh('模式二 · 自有云推流', 'Mode 02 · Push to Your Cloud', '模式二 · 自有雲推流'),
      name: zh('Push Streams 接口（RTMP 推流模式）', 'Push Streams API (RTMP Push Mode)', 'Push Streams 介面（RTMP 推流模式）'),
      endpoint: 'GET https://api.sla.homes/lives/push-streams',
      flow: zh('我们（信号源） → 你的云服务器（RTMP） → 终端观众', 'SLA Signal Source → Your Cloud (RTMP Ingest) → End Viewers', '我們（訊號源） → 你的雲端伺服器（RTMP） → 終端觀眾'),
      summary: zh(
        '我们将比赛原始直播流实时推送到你指定的 RTMP 服务器（如阿里云、腾讯云等主流云厂商）。接口返回 appName 与 streamName，你结合自有播放域名拼接出最终播放地址。',
        'We push the raw live feed in real time to your RTMP ingest server (such as Alibaba Cloud or Tencent Cloud). The API returns appName and streamName so you build playback URLs on your own domain.',
        '我們將比賽原始直播流即時推送到你指定的 RTMP 伺服器（如阿里雲、騰訊雲等主流雲廠商）。介面回傳 appName 與 streamName，你結合自有播放域名拼接出最終播放地址。'
      ),
      billing: zh(
        '下行播放流量消耗在你自己的云服务上，直接向你的云厂商结算，SLA 不收取任何流量代收费。',
        'Downstream traffic is consumed on your own cloud account. Pay your cloud provider directly — SLA charges zero traffic fee.',
        '下行播放流量消耗在你自己的雲端服務上，直接向你的雲廠商結算，SLA 不收取任何流量代收費。'
      ),
      fit: zh(
        '适合已有成熟自建 CDN、希望完全自主掌控播放域名、防盗链策略与流量账单的大型平台。',
        'Best for platforms with an existing CDN that want full control over playback domains, security policies, and cloud bills.',
        '適合已有成熟自建 CDN、希望完全自主掌控播放域名、防盜鏈策略與流量帳單的大型平台。'
      ),
    },
  ],
  integrationLede: zh(
    '按你选择的接入模式，只需 4 步即可完成直播流上线：',
    'Complete 4 steps for your chosen delivery mode to go live:',
    '按你選擇的接入模式，只需 4 步即可完成直播流上線：'
  ),
  integrationFlows: [
    {
      id: 'links-flow',
      badge: zh('模式一 · 托管分发', 'Mode 01 · Hosted Delivery', '模式一 · 託管分發'),
      title: zh('直播链接模式', 'Playback Links Mode', '直播連結模式'),
      subtitle: zh(
        '我们托管 CDN 与播放域名，你直接调接口拿现成播放地址',
        'We host the CDN and playback domain; you pull ready-to-play URLs',
        '我們託管 CDN 與播放域名，你直接調介面拿現成播放地址'
      ),
      endpoint: 'GET /lives/streams',
      steps: [
        {
          title: zh('分配专属域名与防盗链配置', 'Dedicated Domain & Anti-Hotlink Setup', '分配專屬域名與防盜鏈設定'),
          body: zh(
            '开通专户专用播放域名与流量后台。提交你的网站域名与投放地区，由我们为你配置 Referer 白名单、区域白名单及短效签名保护。',
            'Receive an exclusive playback domain and traffic dashboard. Share your site domain and target regions so we can configure Referer/geo allowlists and short-lived signed URLs.',
            '開通專戶專用播放域名與流量後台。提交你的網站域名與投放地區，由我們為你設定 Referer 白名單、區域白名單及短效簽名保護。'
          ),
        },
        {
          title: zh('对接赛事数据匹配（Mapping）', 'Match Data Mapping', '對接賽事資料匹配（Mapping）'),
          body: zh(
            '使用主流体育数据商可直接返回对应赛事 ID；自有赛程体系只需提供未来赛程接口，由我们的 AI 自动完成赛事对齐。',
            'Major sports data providers return pre-mapped match IDs directly; for custom schedules, provide your fixture feed for automated AI matching.',
            '使用主流體育資料商可直接回傳對應賽事 ID；自有賽程體系只需提供未來賽程介面，由我們的 AI 自動完成賽事對齊。'
          ),
        },
        {
          title: zh('定时拉取现成播放链接', 'Fetch Ready-to-Play Stream URLs', '定時拉取現成播放連結'),
          body: zh(
            '按 30 秒间隔轮询接口拉取在播赛事，直接从返回列表中读取 m3u8 / flv 播放地址与实时画面截图，下发给前端播放器。',
            'Poll the endpoint every 30s for active matches and pass the returned m3u8 / flv playback URLs and live screenshots straight to your player.',
            '按 30 秒間隔輪詢介面拉取在播賽事，直接從回傳列表中讀取 m3u8 / flv 播放地址與即時畫面截圖，下發給前端播放器。'
          ),
        },
        {
          title: zh('多线路切换与优先级排序', 'Multi-Line Switching & Priority Ranking', '多線路切換與優先級排序'),
          body: zh(
            '单场比赛支持返回高清主线、原声及多语种定制线路。结合推流持续时长与分辨率排出默认主线，其余作为播放器备用线路供观众切换。',
            'Matches return multiple feeds (HD, Raw, and custom regional lines). Rank the primary line by stream uptime and resolution, and expose the rest as backup tabs.',
            '單場比賽支援回傳高清主線、原聲及多語種定制線路。結合推流持續時長與解析度排出預設主線，其餘作為播放器備用線路供觀眾切換。'
          ),
        },
      ],
    },
    {
      id: 'push-flow',
      badge: zh('模式二 · 自有云分发', 'Mode 02 · Your Own Cloud', '模式二 · 自有雲分發'),
      title: zh('RTMP 推流模式', 'RTMP Push Mode', 'RTMP 推流模式'),
      subtitle: zh(
        '我们把源流实时推入你的云服务器，由你通过自有域名分发',
        'We push live feeds into your cloud server; you distribute via your own domain',
        '我們把源流即時推入你的雲端伺服器，由你透過自有域名分發'
      ),
      endpoint: 'GET /lives/push-streams',
      steps: [
        {
          title: zh('配置 RTMP 接收地址与自有云防盗链', 'RTMP Ingest & Cloud Security Setup', '設定 RTMP 接收地址與自有雲防盜鏈'),
          body: zh(
            '向我们提供你云厂商的 RTMP 推流地址与密钥完成推流绑定；同时在你自己的播放域名上开启 HTTPS、跨域（CORS）与云端防盗链策略。',
            'Provide your cloud RTMP ingest URL and key for stream binding, and enable HTTPS, CORS, and anti-hotlink rules on your own playback domain.',
            '向我們提供你雲廠商的 RTMP 推流地址與金鑰完成推流綁定；同時在你自己的播放域名上開啟 HTTPS、跨域（CORS）與雲端防盜鏈策略。'
          ),
        },
        {
          title: zh('对接赛事数据匹配（Mapping）', 'Match Data Mapping', '對接賽事資料匹配（Mapping）'),
          body: zh(
            '与链接模式相同：主流体育数据商直接返回对应赛事 ID；自有赛程体系提供未来赛程接口，由 AI 自动完成赛事对齐。',
            'Same as Playback Links: pre-mapped match IDs for major data providers, or automated AI matching against your own fixture API.',
            '與連結模式相同：主流體育資料商直接回傳對應賽事 ID；自有賽程體系提供未來賽程介面，由 AI 自動完成賽事對齊。'
          ),
        },
        {
          title: zh('定时拉取推流参数并拼接播放地址', 'Poll Stream Params & Build Playback URLs', '定時拉取推流參數並拼接播放地址'),
          body: zh(
            '按 30 秒间隔轮询接口获取在推赛事的流名称参数，结合你自己的播放域名与云厂商鉴权规则，拼接生成最终的播放链接。',
            'Poll every 30s to fetch active stream name parameters, then combine them with your playback domain and cloud signing rules to build viewer URLs.',
            '按 30 秒間隔輪詢介面獲取在推賽事的流名稱參數，結合你自己的播放域名與雲廠商鑑權規則，拼接產生最終的播放連結。'
          ),
        },
        {
          title: zh('多线路配置与在线优先级排序', 'Multi-Line Setup & Priority Ranking', '多線路設定與在線優先級排序'),
          body: zh(
            '同一场比赛支持推送多路高清与定制线路。结合你自有云端的实时流状态、推流稳定时长与分辨率排出默认主线与备用切换线路。',
            'Multiple HD and custom feeds can be pushed per match. Combine your cloud’s live ingest status, stream uptime, and resolution to rank primary and backup lines.',
            '同一場比賽支援推送多路高清與定制線路。結合你自有雲端的即時流狀態、推流穩定時長與解析度排出預設主線與備用切換線路。'
          ),
        },
      ],
    },
  ],
  faqs: [
    {
      q: zh('直播链接模式的下行播放流量费用怎么算？', 'How is downstream playback traffic billed in Playback Links mode?', '直播連結模式的下行播放流量費用怎麼算？'),
      a: zh(
        '你向 SLA 支付的「订阅服务费」，相当于接通自来水管的资格与制水成本（我们负责采集全球上游高清信号源、解码、推流与全天候运维）。观众看直播消耗的「下行播放流量」就像水龙头流出的水费——看的人越多、时间越长，消耗的流量越多。在「直播链接模式」下，我们的直播流底层托管在阿里云国际版（Alibaba Cloud ApsaraVideo Live），下行流量费按照阿里云标准直播流量单价（美元/GB）向我们预充结算（若选 RTMP 推流模式，流量消耗在你自己的云账号上，我们不收任何流量费）：',
        'Your SLA subscription fee covers signal acquisition, decoding, publishing, and 24/7 operations. Downstream viewer traffic is like the water bill — the more viewers and watch time, the more GB consumed. In Playback Links mode, streams are hosted on Alibaba Cloud International (ApsaraVideo Live), and downstream traffic is prepaid at Alibaba Cloud Standard Streaming traffic rates (USD/GB). (If you choose RTMP Push mode, traffic lands on your own cloud account and we charge zero traffic fee):',
        '你向 SLA 支付的「訂閱服務費」，相當於接通自來水管的資格與製水成本（我們負責採集全球上游高清訊號源、解碼、推流與全天候運維）。觀眾看直播消耗的「下行播放流量」就像水龍頭流出的水費——看的人越多、時間越長，消耗的流量越多。在「直播連結模式」下，我們的直播流底層託管在阿里雲國際版（Alibaba Cloud ApsaraVideo Live），下行流量費按照阿里雲標準直播流量單價（美元/GB）向我們預充結算（若選 RTMP 推流模式，流量消耗在你自己的雲帳號上，我們不收任何流量費）：'
      ),
      showTrafficTable: true,
    },
    {
      q: zh('RTMP 推流模式下建议选用哪个云厂商？还是自己买服务器自建？', 'Which cloud provider should we use for RTMP Push mode, or should we self-host on our own servers?', 'RTMP 推流模式下建議選用哪個雲廠商？還是自己買伺服器自建？'),
      a: zh(
        '强烈建议使用成熟云厂商的「视频直播 + CDN」服务，不建议单台服务器自建（开赛瞬间并发极高，单机极易打满带宽且缺少全球节点与防盗链）。在云厂商选择上：① 若你的观众播放并发量没那么大，强烈推荐「阿里云（国际版 / 中国大陆版）」——除了与我们源站同云链路最稳之外，最核心的原因是：即使某场比赛没有一个观众观看，阿里云默认也不收取推流占用的上行流量费；而其他云厂商在并发推流路数较多时会自动计费，每天仅推流就会产生几十到上百美金的成本。② 若你的下行播放流量非常大（播放流量与推流流量比例大于 10:1），那么腾讯云等其他主流云厂商也都可以作为选择。③ 另外，AWS 的流媒体收费在所有云厂商中最贵，除非你拥有非常大的大客户折扣，否则不推荐使用 AWS。',
        'We strongly recommend using a managed cloud live streaming + CDN service rather than self-hosting on a single server (kickoff concurrency spikes easily saturate bare-metal bandwidth). When choosing a cloud provider: (1) If your concurrent viewer volume is moderate, we strongly recommend Alibaba Cloud (International or Mainland China edition) — beyond having the most stable same-cloud backbone from our origin, Alibaba Cloud does not charge for upstream ingest traffic even when a match has zero viewers, whereas other clouds charge when concurrent pushed streams are high (costing tens to hundreds of dollars per day just for ingest). (2) If your downstream playback traffic is very large (playback-to-ingest ratio > 10:1), other major clouds like Tencent Cloud are also good choices. (3) Note that AWS is the most expensive option among all providers; unless you have a massive enterprise discount, we do not recommend AWS.',
        '強烈建議使用成熟雲廠商的「視訊直播 + CDN」服務，不建議單台伺服器自建（開賽瞬間併發極高，單機極易打滿頻寬且缺少全球節點與防盜鏈）。在雲廠商選擇上：① 若你的觀眾播放併發量沒那麼大，強烈推薦「阿里雲（國際版 / 中國大陸版）」——除了與我們源站同雲鏈路最穩之外，最核心的原因是：即使某場比賽沒有一個觀眾觀看，阿里雲預設也不收取推流佔用的上行流量費；而其他雲廠商在併發推流路數較多時會自動計費，每天僅推流就會產生幾十到上百美金的成本。② 若你的下行播放流量非常大（播放流量與推流流量比例大於 10:1），那麼騰訊雲等其他主流雲廠商也都可以作為選擇。③ 另外，AWS 的串流媒體收費在所有雲廠商中最貴，除非你擁有非常大的大客戶折扣，否則不推薦使用 AWS。'
      ),
    },
    {
      q: zh('默认画质太高清了，针对弱网观众或为了节省播放流量，是否提供低码率/低画质的直播流？', 'Our viewers are on weak networks or we want to save bandwidth — do you provide lower-bitrate / SD streams?', '預設畫質太高清了，針對弱網觀眾或為了節省播放流量，是否提供低碼率/低畫質的直播流？'),
      a: zh(
        '不少面向海外弱网地区或希望降低下行播放流量的客户会有这类诉求。在「直播链接模式」下我们不直接提供降码率转码流，因为每天实时并发数百路高清流，若全量动用昂贵的云端 GPU 进行实时转码，会产生极高的转码成本。但你可以通过「RTMP 推流模式」高性价比地实现：主流云厂商（如阿里云、腾讯云、火山引擎等）的视频直播服务均支持按转码时长计费的「自定义转码模板」。我们可以配合你的业务需求，只筛选核心重要场次推流到你的云账号，过滤掉无人观看的小联赛，再由你在云端配置标清/流畅转码模板——这样既能让弱网观众流畅观看、节省下行流量，又能把转码费用花在刀刃上。',
        'Many teams serving weak-network regions or optimizing downstream bandwidth ask for lower-bitrate streams. We do not offer transcoded SD streams in Playback Links mode because transcoding hundreds of concurrent HD feeds in real time requires expensive cloud GPUs. However, you can achieve this cost-effectively via RTMP Push mode: major cloud vendors (Alibaba Cloud, Tencent Cloud, BytePlus/Volcengine, etc.) let you configure custom transcoding templates billed by duration. Based on your business needs, we can filter and push only key marquee matches into your cloud account while skipping minor leagues — allowing you to generate lower-resolution streams on your cloud and spend transcoding budget only where it matters.',
        '不少面向海外弱網地區或希望降低下行播放流量的客戶會有這類訴求。在「直播連結模式」下我們不直接提供降碼率轉碼流，因為每天即時併發數百路高清流，若全量動用昂貴的雲端 GPU 進行即時轉碼，會產生極高的轉碼成本。但你可以透過「RTMP 推流模式」高性價比地實現：主流雲廠商（如阿里雲、騰訊雲、火山引擎等）的視訊直播服務均支援按轉碼時長計費的「自訂轉碼範本」。我們可以配合你的業務需求，只篩選核心重要場次推流到你的雲帳號，過濾掉無人觀看的小聯賽，再由你在雲端設定標清/流暢轉碼範本——這樣既能讓弱網觀眾流暢觀看、節省下行流量，又能把轉碼費用花在刀刃上。'
      ),
    },
    {
      q: zh('提供的直播流是什么语言解说？有越南语、印尼语等小语种解说吗？', 'What commentary languages are included? Do you have Vietnamese or Indonesian commentary?', '提供的直播流是什麼語言解說？有越南語、印尼語等小語種解說嗎？'),
      a: zh(
        '我们的底层逻辑是「官方原声直播」：各赛事采集自当地官方转播信号（例如泰超是泰语、日职联是日语、越南本地赛事是越南语）；英超、欧冠、NBA 等国际热门赛事默认提供英文原声解说。如需无解说的赛场纯享（-raw）或中文、台湾、韩国、南亚等线路可联系客户经理定制；市面上带越南语/印尼语解说的国际赛事，通常由平台自己的本地主播配合我们的「赛场原声线路」做二次配音解说。',
        'Our baseline is original broadcast audio: local leagues carry their local broadcaster’s language (e.g., Thai for Thai League, Japanese for J.League), while major international events (EPL, UCL, NBA) default to English commentary. Clean stadium-audio feeds (-raw) and CN/TW/KR/South Asia feeds can be enabled on request. Platforms offering Vietnamese or Indonesian commentary on European football typically have their own local hosts dubbing over our Raw Feed.',
        '我們的底層邏輯是「官方原聲直播」：各賽事採集自當地官方轉播訊號（例如泰超是泰語、日職聯是日語、越南本地賽事是越南語）；英超、歐冠、NBA 等國際熱門賽事預設提供英文原聲解說。如需無解說的賽場純享（-raw）或中文、台灣、韓國、南亞等線路可聯繫客戶經理定制；市面上帶越南語/印尼語解說的國際賽事，通常由平台自己的本地主播配合我們的「賽場原聲線路」做二次配音解說。'
      ),
    },
    {
      q: zh('如何在直播画面中添加我们自己的品牌水印或跑马灯广告？', 'How do we add our own brand watermark or scrolling banner ads to the video?', '如何在直播畫面中添加我們自己的品牌水印或跑馬燈廣告？'),
      a: zh(
        '强烈推荐采用「播放器前端图层覆盖」方案：让前端工程师直接在 Web 或 App 播放器组件（如 Video.js、DPlayer）上方叠加一层透明 UI 图层（Div/View）。不仅 0 云端转码成本，还能随时动态修改跑马灯文案、挂载可点击跳转的广告链接。不建议使用云厂商的服务端转码压制水印（单场 2 小时 1080P 转码费约 $1.19，每天数百场比赛会产生高昂的云端 GPU 账单）。',
        'We strongly recommend a front-end player overlay: place a transparent UI layer (Div/View) directly above your Web or App video player (e.g., Video.js, DPlayer). It costs $0 in cloud transcoding and lets you update scrolling text or clickable ad banners dynamically. Avoid server-side cloud transcoding for watermarks (~$1.19 per 2-hour 1080p match, which adds up to hundreds of dollars daily across hundreds of fixtures).',
        '強烈推薦採用「播放器前端圖層覆蓋」方案：讓前端工程師直接在 Web 或 App 播放器元件（如 Video.js、DPlayer）上方疊加一層透明 UI 圖層（Div/View）。不僅 0 雲端轉碼成本，還能隨時動態修改跑馬燈文案、掛載可點擊跳轉的廣告連結。不建議使用雲廠商的伺服器端轉碼壓制水印（單場 2 小時 1080P 轉碼費約 $1.19，每天數百場比賽會產生高昂的雲端 GPU 帳單）。'
      ),
    },
    {
      q: zh('你们提供独立的赛程、历史赛果或即时比分 API 吗？', 'Do you provide a standalone schedule, historical results, or live score API?', '你們提供獨立的賽程、歷史賽果或即時比分 API 嗎？'),
      a: zh(
        '不提供。我们的定位是专业的体育直播线路服务商。线路接口中附带的主客队名、队徽、比分与比赛状态字段，仅用于帮你辨认「这条流对应哪场比赛」，且只返回当前在播及未来 24 小时内的赛事。你的网站或 App 应先采购成熟的体育数据商（或自建赛程库）搭建赛事列表，再与我们的直播线路做关联匹配；如尚无数据商，我们也可根据对接经验为你推荐合适的供应商。',
        'No. We specialize exclusively in live match streaming lines. Team names, logos, and score fields in our API are only for identifying which match a stream belongs to, and only cover live matches plus the next 24 hours. You should use a dedicated sports data provider for schedules and live scores, then map our lines to your fixtures.',
        '不提供。我們的定位是專業的體育直播線路服務商。線路介面中附帶的主客隊名、隊徽、比分與比賽狀態欄位，僅用於幫你辨認「這條流對應哪場比賽」，且只回傳目前在播及未來 24 小時內的賽事。你的網站或 App 應先採購成熟的體育資料商（或自建賽程庫）搭建賽事列表，再與我們的直播線路做關聯匹配；如尚無資料商，我們也可根據對接經驗為你推薦合適的供應商。'
      ),
    },
    {
      q: zh('你们的直播流怎么和我们现有的比赛 ID 自动关联（Mapping）？', 'How are your live streams mapped to our existing match IDs?', '你們的直播流怎麼和我們現有的比賽 ID 自動關聯（Mapping）？'),
      a: zh(
        '分两种情况：① 如果你使用的是市面上主流的几家体育数据商 API，告知客户经理后，我们可直接在接口返回中附加该数据商的赛事 ID；② 如果你使用其他数据商或自建赛程体系，只需向我们提供一个返回未来 24 小时～3 天赛程的接口（包含开赛时间、主客队名、联赛名称、唯一赛事 ID），我们的 AI 匹配系统会提前定时对齐，并在直播接口中直接回传你平台的赛事 ID。',
        'Two ways: (1) If you use a major sports data provider, tell your account manager and we will return their match IDs directly in our API. (2) If you use another vendor or an in-house schedule, provide an API returning the next 24h–3d of fixtures (start time, home/away teams, league, unique ID) and our AI matcher will automatically attach your match ID.',
        '分兩種情況：① 如果你使用的是市面上主流的幾家體育資料商 API，告知客戶經理後，我們可直接在介面回傳中附加該資料商的賽事 ID；② 如果你使用其他資料商或自建賽程體系，只需向我們提供一個回傳未來 24 小時～3 天賽程的介面（包含開賽時間、主客隊名、聯賽名稱、唯一賽事 ID），我們的 AI 匹配系統會提前定時對齊，並在直播介面中直接回傳你平台的賽事 ID。'
      ),
    },
    {
      q: zh('测试流程是怎样的？可以先看画面效果再决定吗？', 'How does the trial work? Can we evaluate live picture quality first?', '測試流程是怎樣的？可以先看畫面效果再決定嗎？'),
      a: zh(
        '我们采用全客户统一的透明一口价。你可以先在官网浏览接口文档并获取报价；认可报价区间后，客户经理会为你开通「专属测试网页」，无需写代码即可直接观看当前正在直播的各球类真实画质与赛程覆盖度。测试期内同步确认选择「直播链接模式」还是「RTMP 推流模式」，正式付费后即可开通独立播放域名、RTMP 推流与 AI 赛事匹配。',
        'We use transparent flat-rate pricing across all customers. Review the docs on our site and request a quote first; once the quote fits your budget, your account manager opens a private web test page where you can inspect live matches on air and upcoming coverage without writing code. Production domains, RTMP pushing, and AI mapping are activated upon payment.',
        '我們採用全客戶統一的透明一口價。你可以先在官網瀏覽介面文件並獲取報價；認可報價區間後，客戶經理會為你開通「專屬測試網頁」，無需寫程式碼即可直接觀看目前正在直播的各球類真實畫質與賽程覆蓋度。測試期內同步確認選擇「直播連結模式」還是「RTMP 推流模式」，正式付費後即可開通獨立播放域名、RTMP 推流與 AI 賽事匹配。'
      ),
    },
    {
      q: zh('线路表里的「IPTV 线路」是什么？和常规比赛线路有什么区别？', 'What are "IPTV Feeds" in the line table, and how do they differ from regular match lines?', '線路表裡的「IPTV 線路」是什麼？和常規比賽線路有什麼區別？'),
      a: zh(
        '常规线路（如国际高清、主流聚合）是按单场比赛在开赛前才进流的信号；而 IPTV 线路来自 Sky Sports、ESPN、TNT、NBA TV 等海外 24 小时体育电视频道与球队台，画质高清且全天不断流、信号极度稳定。该线路属于跨产品联动权益——当你同时订阅了我们的「全球体育频道（IPTV）」产品后，单场比赛接口中对上的比赛就会自动多出 channels 电视台中继列表。',
        'Regular match lines (Global HD, Web Stream) go live shortly before kickoff for a single fixture. IPTV Feeds come from 24/7 international sports networks and team channels (Sky Sports, ESPN, TNT, NBA TV), offering rock-solid HD stability around the clock. When you also subscribe to our Global Sports Channels (IPTV) product, matched fixtures in the match API automatically include a channels array.',
        '常規線路（如國際高清、主流聚合）是按單場比賽在開賽前才進流的訊號；而 IPTV 線路來自 Sky Sports、ESPN、TNT、NBA TV 等海外 24 小時體育電視頻道與球隊台，畫質高清且全天不斷流、訊號極度穩定。該線路屬於跨產品聯動權益——當你同時訂閱了我們的「全球體育頻道（IPTV）」產品後，單場比賽介面中對上的比賽就會自動多出 channels 電視台中繼列表。'
      ),
    },
  ],
}

const iptvRegionExtras: Record<string, Copy> = {
  MX: zh('墨西哥', 'Mexico', '墨西哥'),
  ZA: zh('南非', 'South Africa', '南非'),
}

const iptvAllChannels = iptvChannelsCatalog.groups.flatMap((group) =>
  group.channels.map((channel) => ({
    id: channel.id,
    name: channel.name,
    logo: channel.logo,
  }))
)

const iptvFeaturedIds = [
  'espn',
  'sky-sports-main-event',
  'nba-tv',
  'nfl-network',
  'bbc-one',
  'fox-sports-1',
  'tnt-sports-1',
  'eurosport-1',
  'mlb-network',
  'nhl-network',
  'dazn-1',
  'bein-sports',
  'golf-channel',
  'tennis-channel',
  'tsn-1',
  'sportsnet-one',
  'sky-sports-premier-league',
  'fox-cricket',
] as const

export const iptvChannelData = {
  channelCount: iptvAllChannels.length,
  featuredChannels: iptvFeaturedIds
    .map((id) => iptvAllChannels.find((channel) => channel.id === id))
    .filter((channel): channel is (typeof iptvAllChannels)[number] => Boolean(channel)),
  coverageGroups: iptvChannelsCatalog.groups.map((group) => ({
    tag: group.code === 'GB' ? 'UK' : group.code,
    region:
      group.code in iptvRegionExtras
        ? iptvRegionExtras[group.code]
        : zh(group.regionZh, group.regionEn, group.regionTw),
    channels: group.channels.map((channel) => ({
      id: channel.id,
      name: channel.name,
      logo: channel.logo,
    })),
  })),
  coverageNote: zh(
    '没有定制需求时默认开通全部频道。如需额外频道，可与我们确认是否有资源可以添加。',
    'The full channel list is enabled by default. Extra channels can be checked with us if you need them.',
    '沒有定制需求時預設開通全部頻道。如需額外頻道，可與我們確認是否有資源可以添加。'
  ),
  scheduleSports: [
    zh('足球', 'Football', '足球'),
    zh('篮球（NBA / WNBA）', 'Basketball (NBA / WNBA)', '籃球（NBA / WNBA）'),
    zh('棒球', 'Baseball', '棒球'),
    zh('NFL', 'NFL', 'NFL'),
    zh('板球', 'Cricket', '板球'),
    zh('斯诺克与台球', 'Snooker & Billiards', '斯諾克與撞球'),
    zh('网球', 'Tennis', '網球'),
    zh('英式橄榄球', 'Rugby', '英式橄欖球'),
    zh('高尔夫', 'Golf', '高爾夫'),
    zh('MotoGP', 'MotoGP', 'MotoGP'),
    zh('赛车', 'Motorsport', '賽車'),
    zh('赛马', 'Horse Racing', '賽馬'),
    zh('冬季运动', 'Winter Sports', '冬季運動'),
    zh('田径', 'Athletics', '田徑'),
    zh('自行车', 'Cycling', '自行車'),
  ],
  apis: [
    {
      name: zh('频道列表', 'Channel List', '頻道列表'),
      endpoint: 'GET /v1/iptv/channels',
      purpose: zh(
        '返回该客户可播的电视频道，含名称、台标路径和国家，用来做频道目录。台标是相对路径，拼到客户自己的 Bunny 播放域名上即可显示（例如 https://播放域名/logos/espn.png）。',
        'Returns the TV channels enabled for your account, including name, logo path, and country code for building your channel directory. Prefix the relative logo path with your Bunny playback domain (e.g., https://your-domain/logos/espn.png).',
        '回傳該客戶可播的電視頻道，含名稱、台標路徑和國家，用來做頻道目錄。台標是相對路徑，拼到客戶自己的 Bunny 播放域名上即可顯示（例如 https://播放域名/logos/espn.png）。'
      ),
    },
    {
      name: zh('节目表', 'Program Guide', '節目表'),
      endpoint: 'GET /v1/iptv/schedule',
      purpose: zh(
        '不带日期时返回未来约一个月每天有多少场；带上日期后返回当天节目（按北京时间自然日计算，已结束场次不返回）以及每场对应的播出频道 id，观众从节目表点进去就能换地址播放。',
        'Without a date, returns daily event counts for roughly the next month. With a date (UTC+8 calendar day, excluding finished events), returns that day’s programs and their broadcast channel IDs so viewers can click straight in to watch.',
        '不帶日期時回傳未來約一個月每天有多少場；帶上日期後回傳當天節目（按北京時間自然日計算，已結束場次不回傳）以及每場對應的播出頻道 id，觀眾從節目表點進去就能換地址播放。'
      ),
    },
    {
      name: zh('播放链接', 'Playback URL', '播放連結'),
      endpoint: 'GET /v1/iptv/play',
      purpose: zh(
        '用频道 id 换一条带有效期的 HLS 播放地址。观众打开频道时由你的服务端现签，观众只打开返回的播放地址；过期后用同一个 id 再换一次。',
        'Exchanges a channel ID for a time-limited HLS playback URL. Called on the fly by your server when a viewer opens a channel; when expired, exchange the same ID again.',
        '用頻道 id 換一條帶有效期的 HLS 播放地址。觀眾打開頻道時由你的服務端現簽，觀眾只打開回傳的播放地址；過期後用同一個 id 再換一次。'
      ),
    },
  ],
  faqs: [
    {
      q: zh('全球体育频道和「赛事直播线路」有什么区别？怎么配合使用？', 'How does Global Sports Channels differ from Live Match Lines, and how do they work together?', '全球體育頻道和「賽事直播線路」有什麼區別？怎麼配合使用？'),
      a: zh(
        '「赛事直播线路」是按单场比赛在开赛前才进流的比赛信号；而「全球体育频道」是 24 小时全天播出的线性体育台与综合台（如 Sky Sports、ESPN、TNT Sports、NBC、FOX 等），观众停在一个台上连续收看，信号更适合长时间挂机观看。如果你同时开通了这两项产品，在 Streams 或 Push Streams 单场比赛接口里对上的比赛，会自动带回该场比赛对应的电视频道 id，观众既能看单场流，也能一键切到对应的海外体育台。',
        'Live Match Lines provides single-fixture feeds that go live shortly before kickoff, whereas Global Sports Channels delivers 24/7 linear networks (Sky Sports, ESPN, TNT Sports, NBC, FOX) built for continuous tune-in. When you subscribe to both, matched fixtures in Streams or Push Streams automatically include the corresponding broadcast channel IDs.',
        '「賽事直播線路」是按單場比賽在開賽前才進流的比賽訊號；而「全球體育頻道」是 24 小時全天播出的線性體育台與綜合台（如 Sky Sports、ESPN、TNT Sports、NBC、FOX 等），觀眾停在一個台上連續收看，訊號更適合長時間掛機觀看。如果你同時開通了這兩項產品，在 Streams 或 Push Streams 單場比賽介面裡對上的比賽，會自動帶回該場比賽對應的電視頻道 id。'
      ),
    },
    {
      q: zh('为何仅支持 CDN 方式对接？支持哪些 CDN 服务商？', 'Why is CDN the only integration method? Which CDN providers are supported?', '為何僅支援 CDN 方式對接？支援哪些 CDN 服務商？'),
      a: zh(
        '我们的源站在美国，支持所有在欧美拥有良好节点的 CDN，例如 Bunny、Gcore、Cloudflare。美国节点负责从源站拉流，欧美节点负责把画面分发给当地观众。频道是 24 小时不间断播出的。RTMP 推流是一条长期不断开的连接，网络抖动、超时或对端重启都会把这条频道打断，要等连接重建后观众才能续看；上百路频道全天挂着，这种中断会不断出现。单场比赛可以用推流，是因为一场结束就能重新接入。CDN 拉流则是按几秒一段的 HLS 去取：某一段没取到，下一段会再拉，播放器本身也有缓冲，短暂抖动不会把频道整路打掉。观众变多时，放大发生在 CDN 边缘节点，而不是再多挂一路推流。',
        'Our origin is in the United States. Any CDN with solid nodes in Europe and the US is supported, including Bunny, Gcore, and Cloudflare. A US node pulls from the origin, and EU and US edges deliver to viewers nearby. These channels run 24 hours without a break. RTMP push is one long-lived connection: a timeout, jitter, or restart drops that channel until the session is rebuilt. With a hundred channels up all day, those drops keep happening. A single match can use push because the stream can start again at the next fixture. CDN delivery pulls short HLS segments instead. If one segment fails, the next pull retries, and the player is already buffering, so a brief hiccup does not take the channel down. When the audience grows, scale happens at the CDN edge rather than by adding another always-on push.',
        '我們的源站在美國，支援所有在歐美擁有良好節點的 CDN，例如 Bunny、Gcore、Cloudflare。美國節點負責從源站拉流，歐美節點負責把畫面分發給當地觀眾。頻道是 24 小時不間斷播出的。RTMP 推流是一條長期不斷開的連線，網路抖動、逾時或對端重啟都會把這條頻道打斷，要等連線重建後觀眾才能續看；上百路頻道全天掛著，這種中斷會不斷出現。單場比賽可以用推流，是因為一場結束就能重新接入。CDN 拉流則是按幾秒一段的 HLS 去取：某一段沒取到，下一段會再拉，播放器本身也有緩衝，短暫抖動不會把頻道整路打掉。觀眾變多時，放大發生在 CDN 邊緣節點，而不是再多掛一路推流。'
      ),
    },
    {
      q: zh('节目表接口覆盖哪些运动？包含足球、篮球、NBA、棒球和 NFL 吗？', 'Which sports does the Program Guide API cover? Does it include football, basketball, NBA, baseball, and NFL?', '節目表介面覆蓋哪些運動？包含足球、籃球、NBA、棒球和 NFL 嗎？'),
      a: zh(
        '包含。节目表接口覆盖足球、篮球（NBA / WNBA）、棒球、NFL、板球、斯诺克与台球、网球、英式橄榄球、高尔夫、MotoGP、赛车、赛马、冬季运动、田径、自行车等项目。一场节目会附带对应的播出频道 id，观众可从节目表点进去直接换地址收看。另请注意：节目表是播出安排，不包含实时比分、历史赛果和积分榜。',
        'Yes. The Program Guide API covers Football, Basketball (NBA / WNBA), Baseball, NFL, Cricket, Snooker & Billiards, Tennis, Rugby, Golf, MotoGP, Motorsport, Horse Racing, Winter Sports, Athletics, and Cycling. Each program entry includes its broadcast channel ID so viewers can click straight in to watch. Note that the guide is a broadcast schedule only and does not include live scores, historical results, or standings.',
        '包含。節目表介面覆蓋足球、籃球（NBA / WNBA）、棒球、NFL、板球、斯諾克與撞球、網球、英式橄欖球、高爾夫、MotoGP、賽車、賽馬、冬季運動、田徑、自行車等項目。一場節目會附帶對應的播出頻道 id，觀眾可從節目表點進去直接換地址收看。另請注意：節目表是播出安排，不包含即時比分、歷史賽果和積分榜。'
      ),
    },
    {
      q: zh('播放地址和台标图片是怎么加载的？商户密钥会暴露给前端观众吗？', 'How are playback URLs and channel logos loaded, and are merchant keys exposed to viewers?', '播放地址和台標圖片是怎麼載入的？商戶金鑰會暴露給前端觀眾嗎？'),
      a: zh(
        '三个接口都使用开通时的同一把商户 auth，全部由你的服务端调用，商户密钥和签名密钥绝不会进到观众页面。观众打开某个频道时，你的服务端用频道 id 实时换取一条带有效期的 HLS 播放地址交给前端播放器；频道列表接口返回的台标只是相对路径（如 /logos/espn.png），直接拼在你自己的 Bunny 播放域名后面（如 https://播放域名/logos/espn.png）即可安全加载。',
        'All three APIs share your single merchant auth key and are called strictly from your server — merchant and signing keys never reach the browser or app. When a viewer opens a channel, your server exchanges the channel ID for a time-limited HLS URL. Channel logos are returned as relative paths (e.g., /logos/espn.png) that you prefix with your own Bunny playback domain.',
        '三個介面都使用開通時的同一把商戶 auth，全部由你的服務端呼叫，商戶金鑰和簽名金鑰絕不會進到觀眾頁面。觀眾打開某個頻道時，你的服務端用頻道 id 即時換取一條帶有效期的 HLS 播放地址交給前端播放器；頻道列表介面回傳的台標只是相對路徑（如 /logos/espn.png），直接拼在你自己的 Bunny 播放域名後面（如 https://播放域名/logos/espn.png）即可安全載入。'
      ),
    },
    {
      q: zh('每个客户开通的频道列表是一样的吗？', 'Does every customer get the same channel list?', '每個客戶開通的頻道列表是一樣的嗎？'),
      a: zh(
        '没有定制需求时，默认开通全部频道。如果对某些频道有额外需要，可以和我们确认是否有资源可以添加。',
        'Without a custom request, every account is enabled for the full channel list. If you need extra channels, we can check whether the resource is available to add.',
        '沒有定制需求時，預設開通全部頻道。如果對某些頻道有額外需要，可以和我們確認是否有資源可以添加。'
      ),
    },
  ],
}

export const assistantBotData = {
  faqs: [
    {
      q: zh('机器人目前支持哪些球类？有网球、棒球或其他项目吗？', 'Which sports does the bot support? Tennis, baseball, or others?', '機器人目前支援哪些球類？有網球、棒球或其他項目嗎？'),
      a: zh(
        '目前仅支持足球与篮球赛程取流，暂不开放网球、棒球、冰球、电竞等其他球类。若你的工作室主要解说足篮赛事，可直接开通使用；其他球类需求请选用「赛事直播线路」接口产品，或联系客户经理确认后续计划。',
        'The bot currently supports football and basketball fixtures only — tennis, baseball, ice hockey, esports, and other sports are not available. If your desk mainly calls football and basketball, you can subscribe now. For other sports, use Live Match Lines API or ask your account manager about the roadmap.',
        '目前僅支援足球與籃球賽程取流，暫不開放網球、棒球、冰球、電競等其他球類。若你的工作室主要解說足籃賽事，可直接開通使用；其他球類需求請選用「賽事直播線路」介面產品，或聯繫客戶經理確認後續計畫。'
      ),
    },
    {
      q: zh('支持哪些聊天软件建群？后续还能拓展吗？', 'Which chat platforms are supported, and can more be added later?', '支援哪些聊天軟體建群？後續還能拓展嗎？'),
      a: zh(
        '目前标准支持 Telegram 群与 Lark 群。付费开通后我们会拉一个与机器人的专属群，团队成员在群内发指令即可取流。后续如有客户需要，也可按需拓展其他海外即时通讯应用。',
        'Telegram and Lark groups are supported by default. After payment, we create your exclusive bot group so hosts can pull links via chat commands. Other overseas chat apps can be added later when a customer needs them.',
        '目前標準支援 Telegram 群與 Lark 群。付費開通後我們會拉一個與機器人的專屬群，團隊成員在群內發指令即可取流。後續如有客戶需要，也可按需拓展其他海外即時通訊應用。'
      ),
    },
    {
      q: zh('拿到直播链接后怎么播放？为什么不能直接在浏览器里点开？', 'How do we play the stream URL, and why shouldn’t we open it in a browser?', '拿到直播連結後怎麼播放？為什麼不能直接在瀏覽器裡點開？'),
      a: zh(
        '机器人返回的专属直播链接（如 http://obs1.../xxxx）专为推流软件设计，必须在 OBS Studio 内新建「媒体源（Media Source）」，取消勾选本地文件并粘贴链接播放，正常约 5–10 秒即可加载出高清画面。请勿直接在浏览器中点击打开——一方面浏览器不支持部分直播封装或会触发防盗链，另一方面浏览器打开也会额外占用你当前套餐的连接 IP 名额。',
        'Stream links returned by the bot are engineered for broadcast encoders and must be added in OBS Studio as a "Media Source" (uncheck Local File and paste the URL; video appears in 5–10 seconds). Do not open the URL directly in a browser — browsers may fail to decode the stream or trigger anti-leech rules, and will also consume one of your concurrent IP seats.',
        '機器人回傳的專屬直播連結（如 http://obs1.../xxxx）專為推流軟體設計，必須在 OBS Studio 內新建「媒體源（Media Source）」，取消勾選本地檔案並貼上連結播放，正常約 5–10 秒即可載入出高清畫面。請勿直接在瀏覽器中點擊打開——一方面瀏覽器不支援部分直播封裝或會觸發防盜鏈，另一方面瀏覽器打開也會額外佔用你目前套餐的連線 IP 名額。'
      ),
    },
    {
      q: zh('群里返回的多条线路，哪些是稳定流？哪些是灾备流？', 'Which returned lines are the stable feeds, and which are backups?', '群裡回傳的多條線路，哪些是穩定流？哪些是災備流？'),
      a: zh(
        '稳定可播的主力线路是「🛰️ 卫星源」与「🎤 赛场原声（无解说原音）」：卫星源画质高清、延迟低，适合重点解说；赛场原声是球场原音无解说，方便主播自己配音。网络源、南亚高清及第三方链接属于覆盖与灾备，用于扩大联赛覆盖面，并在主力线路异常时兜底。群内回复 666 后，赛程仍按卫星源（未来 12 小时）与网络源（未来 3 小时）分块展示；回复序号时会按该场实际可用线路一并返回。',
        'The stable primary feeds are Satellite and Raw Feed (stadium audio, no commentary): Satellite is low-latency 1080p for marquee calls, while Raw Feed lets hosts add their own commentary. Web, South Asia HD, and third-party links are coverage and disaster-recovery backups. After 666, fixtures are still grouped into Satellite (next 12h) and Web (next 3h); replying with a match number returns every available line for that fixture.',
        '穩定可播的主力線路是「🛰️ 衛星源」與「🎤 賽場原聲（無解說原音）」：衛星源畫質高清、延遲低，適合重點解說；賽場原聲是球場原音無解說，方便主播自己配音。網路源、南亞高清及第三方連結屬於覆蓋與災備，用於擴大聯賽覆蓋面，並在主力線路異常時兜底。群內回覆 666 後，賽程仍按衛星源（未來 12 小時）與網路源（未來 3 小時）分塊展示；回覆序號時會按該場實際可用線路一併回傳。'
      ),
    },
    {
      q: zh('如果我想播的联赛没有出现在 666 列表里怎么办？', 'What if the league we want to call is not in the 666 schedule list?', '如果我想播的聯賽沒有出現在 666 列表裡怎麼辦？'),
      a: zh(
        '请先确认该联赛属于足球或篮球——机器人目前仅支持这两类球类。在足篮范围内，比赛列表基于预设「联赛白名单」生成，以防群消息被次级场次刷屏。若你长期关注的足篮联赛未出现，可在群内回复 add 自助添加，或联系管理员核实资源后加入白名单，后续相关赛程便会自动显示。',
        'First confirm the league is football or basketball — the bot only supports these two sports. Within that scope, fixtures follow a preset League Allowlist so chat isn’t flooded. If a football or basketball league you cover is missing, reply "add" or ask the admin to verify and whitelist it; upcoming matches will then appear automatically.',
        '請先確認該聯賽屬於足球或籃球——機器人目前僅支援這兩類球類。在足籃範圍內，比賽列表基於預設「聯賽白名單」產生，以防群訊息被次級場次刷屏。若你長期關注的足籃聯賽未出現，可在群內回覆 add 自助添加，或聯繫管理員核實資源後加入白名單，後續相關賽程便會自動顯示。'
      ),
    },
    {
      q: zh('一条直播链接可以给多少个主播同时用？为什么提示不能切 VPN 或外传？', 'How many streamers can use one link at the same time, and why are VPN switching and sharing restricted?', '一條直播連結可以給多少個主播同時用？為什麼提示不能切 VPN 或外傳？'),
      a: zh(
        '每条直播链接均设有「最大连接 IP 数」限制（具体数量根据你购买的套餐档位设定）。请勿超额多人共用同一条链接，也不要在使用过程中开启或频繁切换多个 VPN 节点，否则短时间内产生多个不同 IP 会占满连接数并导致无法播放。如果需要更多主播同时使用同一场比赛链接，可随时联系管理员升级套餐名额。另请注意：所有链接均带有实时监控，严禁拉流转推、对外分享或传播至群外，违规将触发自动拦截、机器人退群并终止服务。',
        'Each stream URL enforces a maximum concurrent IP limit based on your subscribed plan. Do not exceed your seat limit or switch across multiple VPN nodes while connected, as multiple IPs will exhaust your quota and block playback. If your studio needs more hosts on the same match, contact the admin to upgrade your plan seats. All links are actively monitored — restreaming or sharing outside the group will trigger automatic blocking, bot removal, and service termination.',
        '每條直播連結均設有「最大連線 IP 數」限制（具體數量根據你購買的套餐檔位設定）。請勿超額多人共用同一條連結，也不要在使用過程中開啟或頻繁切換多個 VPN 節點，否則短時間內產生多個不同 IP 會佔滿連線數並導致無法播放。如果需要更多主播同時使用同一場比賽連結，可隨時聯繫管理員升級套餐名額。另請注意：所有連結均帶有即時監控，嚴禁拉流轉推、對外分享或傳播至群外，違規將觸發自動攔截、機器人退群並終止服務。'
      ),
    },
  ],
}

export const faq: { q: Copy; a: Copy }[] = [
  {
    q: zh('你们卖的是什么？', 'What do you sell?', '你們賣的是什麼？'),
    a: zh(
      '三块产品。赛事直播线路在开赛前把比赛接到网站或云：播放链接由我们分发，或用 RTMP 推进你自己的云。全球体育频道让用户换台看 ESPN、Sky 这类一直开着的台。OBS直播流机器人把直播流发到主播的 Telegram，放进 OBS 就能解说。',
      'Three products. Live Match Lines connects the match to your site or cloud before kickoff: a playback link we deliver, or RTMP into your own cloud. Global Sports Channels lets viewers change to networks that stay on, such as ESPN and Sky. OBS Streamer Bot sends the line to a host’s Telegram so they can drop it into OBS.',
      '三塊產品。賽事直播線路在開賽前把比賽接到網站或雲：播放連結由我們分發，或用 RTMP 推進你自己的雲。全球體育頻道讓使用者換台看 ESPN、Sky 這類一直開著的台。OBS直播流機器人把直播流發到主播的 Telegram，放進 OBS 就能解說。'
    ),
  },
  {
    q: zh('直播链接和推流怎么选？', 'How do I choose between playback links and push?', '直播連結和推流怎麼選？'),
    a: zh(
      '看观众的流量由谁承担。没有自建分发，选直播链接，流量包预充给我们。已经有播放域名和 CDN，选推流，流量直接付给你的云厂商。两种只选一种。',
      'Decide who pays for viewer traffic. Without your own delivery network, choose playback links and prepay us. If you already have a playback domain and CDN, choose push and pay your cloud provider. Pick one.',
      '看觀眾的流量由誰承擔。沒有自建分發，選直播連結，流量包預充給我們。已經有播放域名和 CDN，選推流，流量直接付給你的雲廠商。兩種只選一種。'
    ),
  },
  {
    q: zh('有没有赛程和赛果 API？', 'Do you provide fixtures and results?', '有沒有賽程和賽果 API？'),
    a: zh(
      '没有。线路接口里的队名、比分和状态只覆盖未来 24 小时，用来辨认这条线是哪场比赛，不能当作数据产品。赛程请先向数据商采购，再和我们对赛事 ID。',
      'No. Team names, scores, and status on the line API cover the next 24 hours only, so you can tell which match a line is. Buy fixtures from a data provider, then map their IDs to our lines.',
      '沒有。線路介面裡的隊名、比分和狀態只覆蓋未來 24 小時，用來辨認這條線是哪場比賽，不能當作資料產品。賽程請先向資料商採購，再和我們對賽事 ID。'
    ),
  },
  {
    q: zh('解说是什么语言？', 'What language is the commentary?', '解說是什麼語言？'),
    a: zh(
      '转播原声。泰超是泰语，日职联是日语，英超和 NBA 默认英文。赛场原声（无解说）、中文、台湾、韩国和南亚线路需要另外开通。本地语言解说需要你自己的主播。',
      'The original broadcast. Thai League is Thai, J-League is Japanese, and the Premier League and NBA default to English. Raw Feed (no commentary), Chinese, Taiwan, Korea, and South Asia lines are opened separately. Local-language commentary is your own talent.',
      '轉播原聲。泰超是泰語，日職聯是日語，英超和 NBA 預設英文。賽場原聲（無解說）、中文、台灣、韓國和南亞線路需要另外開通。本地語言解說需要你自己的主播。'
    ),
  },
  {
    q: zh('价格怎么算？为什么不在官网直接标价？', 'How does pricing work, and why is it not listed on the site?', '價格怎麼算？為什麼不在官網直接標價？'),
    a: zh(
      '费用会根据你要接的产品（赛事直播线路、全球体育频道、OBS直播流机器人）、覆盖的球类范围，以及是否需要赛场原声、中文、台湾、韩国、南亚等定制线路而有较大差异。留下联系方式并说明你的场景，我们会按实际需求给出报价。',
      'Pricing varies significantly by product (Live Match Lines, Global Sports Channels, OBS Streamer Bot), the sports you cover, and whether you need custom lines such as Raw Feed, Chinese, Taiwan, Korea, or South Asia feeds. Leave your contact details and use case to get an exact quote.',
      '費用會根據你要接的產品（賽事直播線路、全球體育頻道、OBS直播流機器人）、覆蓋的球類範圍，以及是否需要賽場原聲、中文、台灣、韓國、南亞等定制線路而有較大差異。留下聯繫方式並說明你的場景，我們會按實際需求給出報價。'
    ),
  },
  {
    q: zh('测试怎么开始？', 'How does a trial start?', '測試怎麼開始？'),
    a: zh(
      '价格和接入说明在页面上。看过之后填写测试表单，我们开通专属测试页，里面是正在播出和接下来可能有线的比赛。推流配置和赛事匹配在付费后开通。',
      'The price and the integration notes are on the site. After you have read them, send the trial form. We open a private test page of matches on air and matches that may get a line. Push setup and match mapping start after payment.',
      '價格和接入說明在頁面上。看過之後填寫測試表單，我們開通專屬測試頁，裡面是正在播出和接下來可能有線的比賽。推流設定和賽事匹配在付費後開通。'
    ),
  },
  {
    q: zh('全球体育频道和单场直播是什么关系？', 'How does Global Sports Channels relate to a single match?', '全球體育頻道和單場直播是什麼關係？'),
    a: zh(
      '单场仍用直播链接或推流。全球体育频道是 24 小时频道，播放走 Bunny。未开通时，比赛对象里不会出现频道字段。',
      'A single match still uses playback links or push. Global Sports Channels is the 24-hour channel product, delivered on Bunny. Until it is enabled, matches do not include a channels field.',
      '單場仍用直播連結或推流。全球體育頻道是 24 小時頻道，播放走 Bunny。未開通時，比賽物件裡不會出現頻道欄位。'
    ),
  },
  {
    q: zh('如何给画面加水印？', 'How do I add a watermark?', '如何給畫面加浮水印？'),
    a: zh(
      '放在播放器上层。云端转码压制水印按分钟计费，场次多的时候费用会很高。',
      'Place it above the player. Burning a watermark in the cloud is billed per minute and gets expensive across a full slate.',
      '放在播放器上層。雲端轉碼壓制浮水印按分鐘計費，場次多的時候費用會很高。'
    ),
  },
  {
    q: zh('已有数据商，怎么和直播对上？', 'We already have a data provider. How does mapping work?', '已有資料商，怎麼和直播對上？'),
    a: zh(
      '主流数据商如果已经匹配过，接口可以直接返回对方的赛事 ID。其他数据商只要提供未来至少 24 小时的赛程接口，我们可以用开赛时间、队名、联赛名和赛事 ID 做匹配。',
      'If we already map your provider, the API can return their match ID. For another provider, give us a fixtures feed at least 24 hours ahead with start time, team names, competition, and match ID.',
      '主流資料商如果已經匹配過，介面可以直接返回對方的賽事 ID。其他資料商只要提供未來至少 24 小時的賽程介面，我們可以用開賽時間、隊名、聯賽名和賽事 ID 做匹配。'
    ),
  },
  {
    q: zh('OBS直播流机器人能否代替赛事直播线路？', 'Can OBS Streamer Bot replace Live Match Lines?', 'OBS直播流機器人能否代替賽事直播線路？'),
    a: zh(
      '不能。机器人把流发给主播，供 OBS 开播。网站和 App 里的观众要看，需要赛事直播线路里的播放链接或 RTMP 推流。',
      'No. The bot sends the line to a host for OBS. Viewers inside a site or app need a playback link or RTMP push from Live Match Lines.',
      '不能。機器人把流發給主播，供 OBS 開播。網站和 App 裡的觀眾要看，需要賽事直播線路裡的播放連結或 RTMP 推流。'
    ),
  },
]

export const productMenu = products.filter((item) => item.slug !== 'push')

export const homeOffers = [
  {
    id: 'match',
    audience: zh('赛事运营', 'Event operations', '賽事營運'),
    name: zh('赛事直播线路', 'Live Match Lines', '賽事直播線路'),
    title: zh('赛事直播线路', 'Live Match Lines', '賽事直播線路'),
    lede: zh(
      '观众已经在你的赛程页上。开赛前，这场比赛就在那里播：播放链接直接进你的播放器，也可以用 RTMP 推进你自己的云。',
      'Viewers are already on your fixture page. Before kickoff the match plays right there: a playback link into your player, or RTMP into your own cloud.',
      '觀眾已經在你的賽程頁上。開賽前，這場比賽就在那裡播：播放連結直接進你的播放器，也可以用 RTMP 推進你自己的雲。'
    ),
    points: [
      zh('热门比赛开赛前就有画面，一场可以备好几条线', 'Major matches show a picture before kickoff, with several lines on one match', '熱門比賽開賽前就有畫面，一場可以備好幾條線'),
      zh('观众留在你的产品里看，不用跳到别的网站', 'Viewers stay in your product. They never leave for another site', '觀眾留在你的產品裡看，不用跳到別的網站'),
      zh('支持 API 返回播放链接，也可以 RTMP 推流到你的云服务', 'Either the API returns a playback link, or we push RTMP into your cloud', '支援 API 回傳播放連結，也可以 RTMP 推流到你的雲端服務'),
    ],
    links: [
      { href: '/products/streams', label: zh('播放链接', 'Playback links', '播放連結') },
      { href: '/products/push', label: zh('RTMP 推流', 'RTMP push', 'RTMP 推流') },
    ],
    detailHref: '/products/streams',
  },
  {
    id: 'iptv',
    audience: zh('电视盒子', 'TV boxes', '電視盒子'),
    name: zh('全球体育频道', 'Global Sports Channels', '全球體育頻道'),
    title: zh('全球体育频道', 'Global Sports Channels', '全球體育頻道'),
    lede: zh(
      'ESPN、Sky Sports、TNT、beIN Sports、Fox、SportsNet、TSN 等上百个主流体育电视台，涵盖各类赛事。',
      'ESPN, Sky Sports, TNT, beIN Sports, Fox, SportsNet, TSN, and hundreds of other major sports networks, covering every kind of competition.',
      'ESPN、Sky Sports、TNT、beIN Sports、Fox、SportsNet、TSN 等上百個主流體育電視台，涵蓋各類賽事。'
    ),
    points: [
      zh('24 小时欧美主流体育台，高清流畅，不断流', 'Mainstream European and US sports networks, 24 hours a day, HD and steady', '24 小時歐美主流體育台，高清流暢，不斷流'),
      zh('提供赛事节目表接口供你调用，重要赛事全包含', 'A schedule API you can call, with the major fixtures covered', '提供賽事節目表介面供你呼叫，重要賽事全包含'),
      zh('上百个体育频道，部署在你自己的 CDN 上给观众看', 'Hundreds of sports channels, delivered from your own CDN', '上百個體育頻道，部署在你自己的 CDN 上給觀眾看'),
    ],
    links: [{ href: '/products/iptv', label: zh('了解这项', 'See this', '了解這項') }],
    detailHref: '/products/iptv',
  },
  {
    id: 'assistant',
    audience: zh('体育内容创作者', 'Sports creators', '體育內容創作者'),
    name: zh('OBS直播流机器人', 'OBS Streamer Bot', 'OBS直播流機器人'),
    title: zh('OBS直播流机器人', 'OBS Streamer Bot', 'OBS直播流機器人'),
    lede: zh(
      '面向体育内容创作者的产品，不用做任何技术对接。加入专属群组后，机器人 24 小时在线，直播链接在群里自助获取。',
      'A product for sports content creators, with no integration work at all. Join a dedicated group and the bot stays on around the clock. You pull the live link yourself, inside the group.',
      '面向體育內容創作者的產品，不用做任何技術對接。加入專屬群組後，機器人 24 小時在線，直播連結在群組裡自助取得。'
    ),
    points: [
      zh('不用赛前到处找直播链接，一个群机器人就解决', 'No hunting for live links before kickoff. One bot in the group covers it', '不用賽前到處找直播連結，一個群組機器人就解決'),
      zh('同场比赛提供多条线路，优质线路会标出来，一眼就能看到', 'Several lines per match, with the better ones marked so you spot them at a glance', '同場比賽提供多條線路，優質線路會標出來，一眼就能看到'),
      zh('复制到 OBS 作为媒体源播放，就可以开始解说', 'Paste it into OBS as a media source and start calling', '複製到 OBS 作為媒體來源播放，就可以開始解說'),
    ],
    links: [{ href: '/products/assistant', label: zh('了解这项', 'See this', '了解這項') }],
    detailHref: '/products/assistant',
  },
]

export const home = {
  title: zh('全球体育赛事直播源与频道服务', 'Global live sports feeds and TV channels', '全球體育賽事直播源與頻道服務'),
  titleLines: zhLines(
    ['全球体育赛事', '直播源与频道服务'],
    ['Global live sports feeds', 'and TV channels'],
    ['全球體育賽事', '直播源與頻道服務']
  ),
  lede: zh(
    '覆盖 23+ 运动与百余个欧美主流体育台。按单场接入你的网站与 App、整台接入电视盒子，或进群取流放进 OBS 开播。',
    'Over 23 sports and 100+ European and US sports networks. Connect single matches to your site or app, carry full channels on TV boxes, or pull live links in the group for OBS.',
    '覆蓋 23+ 運動與百餘個歐美主流體育台。按單場接入你的網站與 App、整台接入電視盒子，或進群取流放進 OBS 開播。'
  ),
  heroKicker: zh('2018 年至今 · 赛事线路持续交付', 'Match lines, continuously since 2018', '2018 年至今 · 賽事線路持續交付'),
  heroBoardTitle: zh('3大体育直播场景产品', '3 products for sports streaming scenarios', '3大體育直播場景產品'),
  heroBoardNote: zh('开发文档与接口调试在站内直接开放。留资料获取报价，认可后开通专属测试页。', 'Docs and live API debugging are open on the site. Leave your contact for a quote, then we open your private test page.', '開發文件與介面調試在站內直接開放。留資料取得報價，認可後開通專屬測試頁。'),
  heroPaths: [
    {
      href: '/products/streams',
      name: zh('赛事直播线路', 'Live Match Lines', '賽事直播線路'),
      detail: zh('开赛前接到网站、App 或你自己的云', 'Into your site, app, or cloud before kickoff', '開賽前接到網站、App 或你自己的雲'),
    },
    {
      href: '/products/iptv',
      name: zh('全球体育频道', 'Global Sports Channels', '全球體育頻道'),
      detail: zh('换台看一直开着的体育台', 'Change channel on networks that stay on', '換台看一直開著的體育台'),
    },
    {
      href: '/products/assistant',
      name: zh('OBS直播流机器人', 'OBS Streamer Bot', 'OBS直播流機器人'),
      detail: zh('进群自助取直播链接，丢进 OBS 就能播', 'Pull the link in the group, drop it into OBS', '進群自助取直播連結，丟進 OBS 就能播'),
    },
  ],
  more: zh('看三款产品', 'See the three products', '看三款產品'),
  whyTitle: zh('为什么选 SportLive API', 'Why SportLive API', '為什麼選 SportLive API'),
  whyLede: zh(
    '只做赛事直播这一件事。怎么播、线路怎么配，都从这里来。',
    'Live sports is the whole product. How it plays, and how the lines route, follow from that.',
    '只做賽事直播這一件事。怎麼播、線路怎麼配，都從這裡來。'
  ),
  reasons: [
    {
      title: zh('专注在赛事直播领域的服务商', 'A provider focused on live sports', '專注在賽事直播領域的服務商'),
      body: zh(
        '我们只做赛事直播流的采集、分发与播放对接。赛程、比分和数据接口仍由你的数据商提供，精力和资源集中在一层，线路冗余和对接深度才有保障。',
        'We acquire, deliver, and integrate the live stream, nothing more. Fixtures, scores, and data feeds stay with your data provider. With effort and resources on that one layer, line redundancy and integration depth hold up.',
        '我們只做賽事直播流的採集、分發與播放對接。賽程、比分和資料介面仍由你的資料商提供，精力和資源集中在一層，線路冗餘和對接深度才有保障。'
      ),
    },
    {
      title: zh('面向多种场景的直播解决方案', 'A live solution for every scenario', '面向多種場景的直播解決方案'),
      body: zh(
        '需要为你的赛程提供直播，就对接赛事直播线路。需要 24 小时的体育台，就接全球体育频道。主播团队没有研发，直接用 OBS直播流机器人。',
        'Live matches on your fixture pages: Live Match Lines. A 24-hour sports channel: Global Sports Channels. A commentary team with no engineers: OBS Streamer Bot.',
        '需要為你的賽程提供直播，就對接賽事直播線路。需要 24 小時的體育台，就接全球體育頻道。主播團隊沒有研發，直接用 OBS直播流機器人。'
      ),
    },
    {
      title: zh('根据目标市场匹配本地化线路', 'Localized lines for your market', '根據目標市場匹配本地化線路'),
      body: zh(
        '热门比赛有国际高清、赛场原声、中文、台湾、韩国、南亚等多种线路可选。面对不同的目标市场，我们配备对应的线路，线路补全不用再找第二家。',
        'A major match ships with several lines: Global HD, Raw Feed (stadium audio), Chinese, Taiwan, Korea, and South Asia feeds. Each target market gets the lines that fit it, and you do not add a second provider to fill gaps.',
        '熱門比賽有國際高清、賽場原聲、中文、台灣、韓國、南亞等多種線路可選。面對不同的目標市場，我們配備對應的線路，線路補全不用再找第二家。'
      ),
    },
    {
      title: zh('覆盖超过23种不同运动类目', 'Over 23 sports categories', '覆蓋超過23種不同運動類目'),
      body: zh(
        '足球、篮球、棒球、冰球、网球、赛车、电竞、排球、赛马、板球、斯诺克、高尔夫、摔跤、格斗、橄榄球、羽毛球等都在范围内。你要接的运动，基本都能在这里找到。',
        'Football, basketball, baseball, ice hockey, tennis, motorsport, esports, volleyball, horse racing, cricket, snooker, golf, wrestling, combat sports, American football, and badminton are all in range. The sport you want to carry is usually already here.',
        '足球、籃球、棒球、冰球、網球、賽車、電競、排球、賽馬、板球、斯諾克、高爾夫、摔角、格鬥、美式足球、羽毛球等都在範圍內。你要接的運動，基本都能在這裡找到。'
      ),
    },
  ],
  offersEyebrow: zh('提供哪些服务', 'What we deliver', '提供哪些服務'),
  offersDetail: zh('了解产品详情', 'See full product details', '了解產品詳情'),
  offersTitle: zh('三种产品服务能力，助力体育内容传播', 'Three product capabilities, built for sports content', '三種產品服務能力，助力體育內容傳播'),
  offersLede: zh(
    '网站或 App 里要播单场比赛，选赛事直播线路。要让用户换台看 24 小时体育台，选全球体育频道。主播在 OBS 里解说，用 OBS直播流机器人。',
    'A single match in your site or app: Live Match Lines. A 24-hour sports TV product your viewers switch to: Global Sports Channels. A host calling games in OBS: OBS Streamer Bot.',
    '網站或 App 裡要播單場比賽，選賽事直播線路。要讓使用者換台看 24 小時體育台，選全球體育頻道。主播在 OBS 裡解說，用 OBS直播流機器人。'
  ),
  flowTitle: zh('对接流程', 'How onboarding works', '對接流程'),
  flow: [
    {
      title: zh('确认使用场景', 'Confirm your use case', '確認使用場景'),
      body: zh(
        '先看网站上的产品介绍，对照你手上的业务是网站、App、电视盒子，还是 OBS 解说。不明白的地方可以直接问站内客服，几分钟就能定下接哪一款。',
        'Check the product pages against what you run: a site, an app, a TV box, or OBS commentary. Ask our on-site assistant if anything is unclear — you can settle on the right product in minutes.',
        '先看網站上的產品介紹，對照你手上的業務是網站、App、電視盒子，還是 OBS 解說。不明白的地方可以直接問站內客服，幾分鐘就能定下接哪一款。'
      ),
    },
    {
      title: zh('自助技术评估', 'Self-serve technical review', '自助技術評估'),
      body: zh(
        '开发文档和接口在线调试都在官网直接开放，不用申请。技术团队可以先用测试 Key 在线调用接口、查看返回参数和数据结构，内部确认能接再往下走。',
        'Developer docs and interactive API debugging are open on the site — no request needed. Your engineers can call the API with a test key and inspect response fields before moving forward.',
        '開發文件和介面線上調試都在官網直接開放，不用申請。技術團隊可以先用測試 Key 線上呼叫介面、查看返回參數和資料結構，內部確認能接再往下走。'
      ),
    },
    {
      title: zh('获取报价与测试', 'Get a quote and trial', '取得報價與測試'),
      body: zh(
        '费用与你要接的产品、运动范围及是否需要定制线路有关。提交表单留下联系方式，我们先按你的需求给出报价；认可报价后，为你开通专属测试页，直接看正在播的比赛画面。',
        'Pricing depends on the product, sports scope, and any custom lines. Submit the form with your contact details to get a tailored quote. Once you accept it, we open a private test page showing live matches on air.',
        '費用與你要接的產品、運動範圍及是否需要定制線路有關。提交表單留下聯繫方式，我們先按你的需求給出報價；認可報價後，為你開通專屬測試頁，直接看正在播的比賽畫面。'
      ),
    },
    {
      title: zh('正式开通', 'Go live', '正式開通'),
      body: zh(
        '测试满意后，付费开通正式配置，把线路接入你的生产环境。上线后的对接和线路问题，全程在专属对接群里跟进。',
        'When the trial meets your expectations, pay to enable the production setup and connect the lines to your live environment. Post-launch integration and line support continue in your dedicated group.',
        '測試滿意後，付費開通正式設定，把線路接入你的生產環境。上線後的對接和線路問題，全程在專屬對接群裡跟進。'
      ),
    },
  ],
  statsTitle: zh('覆盖能力', 'Coverage', '覆蓋能力'),
  stats: [
    { value: zh('23+', '23+', '23+'), label: zh('运动品类', 'Sports', '運動品類') },
    { value: zh('100+', '100+', '100+'), label: zh('24 小时体育频道', '24-hour sports channels', '24 小時體育頻道') },
    { value: zh('800+', '800+', '800+'), label: zh('覆盖联赛', 'Competitions covered', '覆蓋聯賽') },
    { value: zh('400+', '400+', '400+'), label: zh('日均直播赛事', 'Matches live per day', '日均直播賽事') },
    { value: zh('100万+', '1M+', '100萬+'), label: zh('日触达用户 IP', 'Viewer IPs per day', '日觸達使用者 IP') },
  ],
  coverageTitle: zh('重点联赛', 'Leagues viewers ask for', '重點聯賽'),
  coverageLink: zh('查看直播预览', 'See live preview', '查看直播預覽'),
  ctaTitle: zh('有问题，直接问我们', 'Ask us anytime', '有問題，直接問我們'),
  ctaBody: zh(
    '不用先把需求想完整。说一下你在做网站、电视，还是体育内容创作，留下 Telegram 或 WhatsApp，我们给你对应的方案和报价，合适再开专属测试页。',
    'You do not need a finished brief. Tell us whether it is a site, a TV product, or sports content, and leave your Telegram or WhatsApp. We reply with the matching plan and quote, then open your private test page.',
    '不用先把需求想完整。說一下你在做網站、電視，還是體育內容創作，留下 Telegram 或 WhatsApp，我們給你對應的方案和報價，合適再開專屬測試頁。'
  ),
}

export const coveragePage = {
  title: zh('直播预览', 'Live Preview', '直播預覽'),
  lede: zh(
    '英超、西甲、意甲、德甲、法甲、欧冠、NBA、MLB、NHL、IPL、F1、英雄联盟都在线路范围内。接口按运动类型返回未来 24 小时的比赛和当前可播线路。某一天有没有具体一场，以测试页为准。',
    'Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Champions League, NBA, MLB, NHL, IPL, F1, and League of Legends are in range. The API returns the next 24 hours of matches and the lines that can play now, by sport. Whether a specific match is on today is confirmed on the test page.',
    '英超、西甲、義甲、德甲、法甲、歐冠、NBA、MLB、NHL、IPL、F1、英雄聯盟都在線路範圍內。介面按運動類型返回未來 24 小時的比賽和目前可播線路。某一天有沒有具體一場，以測試頁為準。'
  ),
  leaguesTitle: zh('热门赛事', 'Competitions viewers ask for', '熱門賽事'),
  leagues: [
    zh('英超', 'Premier League', '英超'),
    zh('西甲', 'La Liga', '西甲'),
    zh('意甲', 'Serie A', '義甲'),
    zh('德甲', 'Bundesliga', '德甲'),
    zh('法甲', 'Ligue 1', '法甲'),
    zh('美职联', 'MLS', '美職聯'),
    zh('墨超', 'Liga MX', '墨超'),
    zh('沙特联', 'Saudi Pro League', '沙特聯'),
    zh('欧冠', 'Champions League', '歐冠'),
    zh('欧联', 'Europa League', '歐聯'),
    zh('欧协联', 'Conference League', '歐協聯'),
    zh('解放者杯', 'Copa Libertadores', '解放者杯'),
    zh('英冠', 'Championship', '英冠'),
    zh('NFL', 'NFL', 'NFL'),
    zh('NCAAF', 'NCAAF', 'NCAAF'),
    zh('NBA', 'NBA', 'NBA'),
    zh('WNBA', 'WNBA', 'WNBA'),
    zh('MLB', 'MLB', 'MLB'),
    zh('NHL', 'NHL', 'NHL'),
    zh('ATP', 'ATP', 'ATP'),
    zh('WTA', 'WTA', 'WTA'),
    zh('PGA', 'PGA Tour', 'PGA'),
    zh('欧巡赛', 'DP World Tour', '歐巡賽'),
    zh('LPGA', 'LPGA', 'LPGA'),
    zh('板球测试赛', 'Test Cricket', '板球測試賽'),
    zh('T20国际赛', 'T20 Internationals', 'T20國際賽'),
    zh('IPL', 'IPL', 'IPL'),
    zh('F1', 'F1', 'F1'),
    zh('MotoGP', 'MotoGP', 'MotoGP'),
    zh('世界超摩', 'World SBK', '世界超摩'),
    zh('UCI世界巡回赛', 'UCI World Tour', 'UCI世界巡迴賽'),
    zh('UFC', 'UFC', 'UFC'),
    zh('高山滑雪', 'Alpine Skiing', '高山滑雪'),
    zh('英雄联盟', 'League of Legends', '英雄聯盟'),
    zh('CS', 'CS', 'CS'),
    zh('王者荣耀', 'Honor of Kings', '王者榮耀'),
    zh('Dota 2', 'Dota 2', 'Dota 2'),
  ],
  sportsTitle: zh('运动项目', 'Sports', '運動項目'),
  linesTitle: zh('线路类型', 'Line types', '線路類型'),
  lineName: zh('线路', 'Line', '線路'),
  quality: zh('画质与进流', 'Quality and lead time', '畫質與進流'),
  cover: zh('覆盖', 'Coverage', '覆蓋'),
  access: zh('是否默认', 'Default access', '是否預設'),
  note: zh(
    '赛车、格斗和摔跤按赛事名称返回，没有主队和客队。电竞只支持英雄联盟、CS、王者荣耀和 Dota 2。',
    'Motorsport, combat sports, and wrestling come back as event names, without home and away teams. Esports covers League of Legends, CS, Honor of Kings, and Dota 2.',
    '賽車、格鬥和摔跤按賽事名稱返回，沒有主隊和客隊。電競只支援英雄聯盟、CS、王者榮耀和 Dota 2。'
  ),
}

export const docsPage = {
  title: zh('接口文档与在线调试', 'API Docs & Live Playground', '介面文件與在線調試'),
  lede: zh(
    '基于《SLA 服务介绍及对接文档 v2.6》构建。已内置演示密钥，你的研发团队可直接在左侧目录切换调试单场赛事直播接口（streams / push-streams）与全球体育频道 IPTV 三个接口（channels / play / schedule），实时验看 JSON 字段结构与状态码。',
    'Built from the SLA Integration Guide v2.6. With a built-in demo key, your engineers can switch between single-match APIs (streams / push-streams) and the three Global Sports Channels IPTV APIs (channels / play / schedule) to inspect live JSON schemas and status codes.',
    '基於《SLA 服務介紹及對接文件 v2.6》建構。已內建演示金鑰，你的研發團隊可直接在左側目錄切換調試單場賽事直播介面（streams / push-streams）與全球體育頻道 IPTV 三個介面（channels / play / schedule），即時驗看 JSON 欄位結構與狀態碼。'
  ),
  blocks: [
    {
      title: zh('先选一种单场接入', 'Choose one single-match path', '先選一種單場接入'),
      body: zh(
        '直播链接：GET /lives/streams，返回可播放的地址。推流：GET /lives/push-streams，返回 appName 和 streamName。两个接口都建议 30 秒拉一次。',
        'Playback links: GET /lives/streams returns playable URLs. Push: GET /lives/push-streams returns appName and streamName. Poll either about every 30 seconds.',
        '直播連結：GET /lives/streams，返回可播放的地址。推流：GET /lives/push-streams，返回 appName 和 streamName。兩個介面都建議 30 秒拉一次。'
      ),
    },
    {
      title: zh('全球体育频道单独换地址', 'Global Sports Channels signs its own URL', '全球體育頻道單獨換地址'),
      body: zh(
        '频道目录和播放地址在 iptv.sla.homes，由你的服务端调用。观众只打开返回的 url。未开通这项服务时，比赛里没有 channels 字段。',
        'The channel list and playback URL live on iptv.sla.homes and are called by your server. The viewer only opens the returned URL. Without this service, matches have no channels field.',
        '頻道目錄和播放地址在 iptv.sla.homes，由你的服務端呼叫。觀眾只打開返回的 url。未開通這項服務時，比賽裡沒有 channels 欄位。'
      ),
    },
    {
      title: zh('赛程不要用线路接口来建', 'Do not build fixtures from the line API', '賽程不要用線路介面來建'),
      body: zh(
        '线路接口只看未来 24 小时，比分也不是专业比分源。先有自己的赛程，再做赛事匹配。',
        'The line API looks 24 hours ahead, and its scores are not a professional data feed. Start with your own fixtures, then map them.',
        '線路介面只看未來 24 小時，比分也不是專業比分源。先有自己的賽程，再做賽事匹配。'
      ),
    },
    {
      title: zh('防盗链要在上线前做完', 'Turn on hotlink protection before launch', '防盜鏈要在上線前做完'),
      body: zh(
        '直播链接需要你的域名白名单、投放地区，以及短时有效的播放地址。推流则把这些防护做在你自己的播放域名上。',
        'Playback links need your domain allowlist, target regions, and short-lived URLs. With push delivery, put that protection on your own playback domain.',
        '直播連結需要你的域名白名單、投放地區，以及短時有效的播放地址。推流則把這些防護做在你自己的播放域名上。'
      ),
    },
  ],
}

export const aboutPage = {
  title: zh('关于 SportLive API', 'About SportLive API', '關於 SportLive API'),
  lede: zh(
    '我们从 2018 年开始做体育赛事的直播线路，服务需要把比赛画面放进自己产品的团队。',
    'We have supplied sports match lines since 2018, for teams that need the picture inside their own product.',
    '我們從 2018 年開始做體育賽事的直播線路，服務需要把比賽畫面放進自己產品的團隊。'
  ),
  body: [
    zh(
      '团队里有人做过直播吧、Onefootball 和 SportRadar 的体育产品。日常工作是采集线路、保持推流，以及把线路和客户的赛程对上。',
      'People on the team have worked on sports products at Zhibo8, Onefootball, and SportRadar. The day-to-day work is acquiring lines, keeping them on air, and mapping them to a customer’s fixtures.',
      '團隊裡有人做過直播吧、Onefootball 和 SportRadar 的體育產品。日常工作是採集線路、保持推流，以及把線路和客戶的賽程對上。'
    ),
    zh(
      '三块产品：赛事直播线路、全球体育频道、OBS直播流机器人。比赛接到你的产品里，体育台换着看，或者把直播流发给主播。',
      'Three products: Live Match Lines, Global Sports Channels, and OBS Streamer Bot. Put the match in your product, tune sports channels, or send the line to a host.',
      '三塊產品：賽事直播線路、全球體育頻道、OBS直播流機器人。比賽接到你的產品裡，體育台換著看，或者把直播流發給主播。'
    ),
  ],
  points: [
    zh('2018 年起到现在，一直在做赛事线路', 'Match lines, continuously since 2018', '2018 年起到現在，一直在做賽事線路'),
    zh('成员背景包括直播吧、Onefootball、SportRadar', 'Backgrounds include Zhibo8, Onefootball, and SportRadar', '成員背景包括直播吧、Onefootball、SportRadar'),
    zh('只做直播线路，不做赛程赛果数据', 'Live lines only. Not a fixtures and results vendor', '只做直播線路，不做賽程賽果資料'),
  ],
}

export const customersPage = {
  title: zh('客户案例', 'Customer Showcases', '客戶案例'),
  lede: zh(
    '看看不同形态的体育产品接入后是什么样子：从即时比分直播网站、海外 24 小时体育电视，到足球篮球主播解说工作室。',
    'See how different sports products look in production — from live-score streaming sites and 24/7 overseas sports TV to football and basketball commentary studios.',
    '看看不同形態的體育產品接入後是什麼樣子：從即時比分直播網站、海外 24 小時體育電視，到足球籃球主播解說工作室。'
  ),
  situation: zh('核心能力 01', 'Capability 01', '核心能力 01'),
  choice: zh('核心能力 02', 'Capability 02', '核心能力 02'),
  outcome: zh('核心能力 03', 'Capability 03', '核心能力 03'),
}

export const contactPage = {
  title: zh('申请测试与报价', 'Request a trial and a quote', '申請測試與報價'),
  lede: zh(
    '留下邮箱和 Telegram 或 WhatsApp，说一下你在做网站、电视，还是体育内容创作。我们先给报价，你觉得合适，再开通专属测试页。',
    'Leave an email and your Telegram or WhatsApp, and tell us whether it is a site, a TV product, or sports content. We send the quote first, then open your private test page.',
    '留下郵箱和 Telegram 或 WhatsApp，說一下你在做網站、電視，還是體育內容創作。我們先給報價，你覺得合適，再開通專屬測試頁。'
  ),
}

export function productBySlug(slug: string) {
  return products.find((item) => item.slug === slug)
}

export function solutionBySlug(slug: string) {
  return solutions.find((item) => item.slug === slug)
}
