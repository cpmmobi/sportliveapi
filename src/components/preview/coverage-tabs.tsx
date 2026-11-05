'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Mark } from '@/components/site/shell'
import type { StreamsPreview } from '@/lib/streams-preview'
import type { IptvSchedulePayload } from '@/lib/iptv-schedule'
import { StreamsPreviewBoard } from './streams-preview'
import { ChannelsPreviewBoard, type ChannelGroup } from './channels-preview'

const COPY = {
  zh: {
    tabStreams: '01 · 赛事直播线路',
    tabStreamsSub: '实时在播赛程与画面抓拍',
    tabChannels: '02 · 全球体育频道',
    tabChannelsSub: '100+ 频道目录与未来一个月节目单',
    streamsTitle: '赛事直播线路 · 实时赛程与抓拍',
    streamsDesc:
      '因页面篇幅有限，此处仅展示当前正在直播且已出画面的场次。其他球类或热门联赛若未显示，是因为当前时段尚未开赛（开赛前将自动进流并在此展示；实际接口支持拉取未来 24 小时完整赛程）。',
    streamsProductLink: '查看赛事直播线路产品说明 →',
    channelsTitle: '全球体育频道 · 频道目录与节目单预览',
    channelsDesc:
      '覆盖英国、美国、加拿大、新西兰、澳大利亚等地 100+ 线性体育台与综合台（24 小时不间断播出），并同步提供未来约一个月的赛事播出节目表。',
    channelsProductLink: '查看全球体育频道产品说明 →',
  },
  en: {
    tabStreams: '01 · Live Match Lines',
    tabStreamsSub: 'Live matches & real-time frame captures',
    tabChannels: '02 · Global Sports Channels',
    tabChannelsSub: '100+ channel directory & 30-day program guide',
    streamsTitle: 'Live Match Lines · Schedule & Frame Captures',
    streamsDesc:
      'To keep this page concise, only matches currently on air with live video frames are listed here. If a sport or major league shows 0 matches, it simply has no fixtures kicking off in this time window (streams go live automatically before kickoff; the API itself returns the full 24-hour schedule).',
    streamsProductLink: 'View Live Match Lines product details →',
    channelsTitle: 'Global Sports Channels · Directory & Program Guide',
    channelsDesc:
      '100+ 24/7 linear sports and broadcast networks across the UK, US, Canada, New Zealand, and Australia, complete with an upcoming ~30-day broadcast program guide.',
    channelsProductLink: 'View Global Sports Channels product details →',
  },
  'zh-TW': {
    tabStreams: '01 · 賽事直播線路',
    tabStreamsSub: '即時在播賽程與畫面抓拍',
    tabChannels: '02 · 全球體育頻道',
    tabChannelsSub: '100+ 頻道目錄與未來一個月節目單',
    streamsTitle: '賽事直播線路 · 即時賽程與抓拍',
    streamsDesc:
      '因頁面篇幅有限，此處僅展示目前正在直播且已出畫面的場次。其他球類或熱門聯賽若未顯示，是因為目前時段尚未開賽（開賽前將自動進流並在此展示；實際介面支援拉取未來 24 小時完整賽程）。',
    streamsProductLink: '查看賽事直播線路產品說明 →',
    channelsTitle: '全球體育頻道 · 頻道目錄與節目單預覽',
    channelsDesc:
      '覆蓋英國、美國、加拿大、紐西蘭、澳洲等地 100+ 線性體育台與綜合台（24 小時不間斷播出），並同步提供未來約一個月的賽事播出節目表。',
    channelsProductLink: '查看全球體育頻道產品說明 →',
  },
} as const

function copyFor(locale: string) {
  if (locale === 'en') return COPY.en
  if (locale === 'zh-TW') return COPY['zh-TW']
  return COPY.zh
}

export function CoverageTabs({
  locale,
  initialTab,
  streamsPreview,
  channelGroups,
  initialSchedule,
}: {
  locale: string
  initialTab: 'streams' | 'channels'
  streamsPreview: StreamsPreview
  channelGroups: ChannelGroup[]
  initialSchedule: IptvSchedulePayload
}) {
  const t = copyFor(locale)
  const [tab, setTab] = useState<'streams' | 'channels'>(initialTab)

  function switchTab(next: 'streams' | 'channels') {
    setTab(next)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      if (next === 'channels') {
        url.searchParams.set('tab', 'channels')
      } else {
        url.searchParams.delete('tab')
        url.searchParams.delete('view')
      }
      window.history.replaceState({}, '', url.pathname + url.search)
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash.replace('#', '')
    const params = new URLSearchParams(window.location.search)
    if (hash === 'channels' || params.get('tab') === 'channels') {
      setTab('channels')
    } else if (hash === 'streams' || params.get('tab') === 'streams') {
      setTab('streams')
    }
  }, [])

  return (
    <section className="border-b border-brand-line bg-brand-paper">
      <div className="container-custom py-10 lg:py-14">
        {/* Top Module Switcher Tabs */}
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => switchTab('streams')}
            className={`group flex items-center justify-between border p-4 text-left transition-all sm:p-5 ${
              tab === 'streams'
                ? 'border-2 border-brand-primary bg-white shadow-[4px_4px_0_0_#FC0078]'
                : 'border-brand-line bg-white/75 hover:border-brand-ink hover:bg-white'
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-base font-bold text-brand-ink sm:text-lg">{t.tabStreams}</span>
              </div>
              <p className="mt-1 text-xs text-brand-muted">{t.tabStreamsSub}</p>
            </div>
            <span
              className={`inline-flex h-7 w-7 items-center justify-center text-xs font-bold ${
                tab === 'streams' ? 'bg-brand-primary text-white' : 'bg-brand-paper text-brand-muted'
              }`}
            >
              →
            </span>
          </button>

          <button
            type="button"
            onClick={() => switchTab('channels')}
            className={`group flex items-center justify-between border p-4 text-left transition-all sm:p-5 ${
              tab === 'channels'
                ? 'border-2 border-brand-primary bg-white shadow-[4px_4px_0_0_#FC0078]'
                : 'border-brand-line bg-white/75 hover:border-brand-ink hover:bg-white'
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-primary" />
                <span className="text-base font-bold text-brand-ink sm:text-lg">{t.tabChannels}</span>
              </div>
              <p className="mt-1 text-xs text-brand-muted">{t.tabChannelsSub}</p>
            </div>
            <span
              className={`inline-flex h-7 w-7 items-center justify-center text-xs font-bold ${
                tab === 'channels' ? 'bg-brand-primary text-white' : 'bg-brand-paper text-brand-muted'
              }`}
            >
              →
            </span>
          </button>
        </div>

        {/* Active Module Content */}
        {tab === 'streams' ? (
          <div className="mt-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
                  <Mark />
                  <span>LIVE MATCH LINES</span>
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{t.streamsTitle}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-brand-muted">{t.streamsDesc}</p>
              </div>
              <Link
                href={`/${locale}/products/streams`}
                className="shrink-0 text-xs font-bold text-brand-primary hover:underline sm:text-sm"
              >
                {t.streamsProductLink}
              </Link>
            </div>

            <div className="mt-6">
              <StreamsPreviewBoard locale={locale} initial={streamsPreview} />
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
                  <Mark />
                  <span>GLOBAL SPORTS CHANNELS</span>
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{t.channelsTitle}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-brand-muted">{t.channelsDesc}</p>
              </div>
              <Link
                href={`/${locale}/products/iptv`}
                className="shrink-0 text-xs font-bold text-brand-primary hover:underline sm:text-sm"
              >
                {t.channelsProductLink}
              </Link>
            </div>

            <div className="mt-6">
              <ChannelsPreviewBoard
                locale={locale}
                groups={channelGroups}
                initialSchedule={initialSchedule}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
