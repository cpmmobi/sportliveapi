'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import type { IptvSchedulePayload } from '@/lib/iptv-schedule'

export type ChannelGroup = {
  tag: string
  region: string
  channels: { id: string; name: string; logo: string }[]
}

const COPY = {
  zh: {
    channelsStat: '已接入线性体育与综合台',
    regionsStat: '覆盖国家与地区',
    guideDaysStat: '节目单预览天数',
    guideMatchesStat: '近 5 天待播赛事数',
    subTabChannels: '频道目录 (100+ 频道)',
    subTabGuide: '近期节目单 (今日 + 未来 4 天)',
    searchChannelPlaceholder: '搜索频道名称（如：ESPN、Sky Sports、TNT、NBA TV）...',
    allRegions: '全部地区',
    channelUnit: '个频道',
    guideIntro: '点选日期查看当天各频道的赛事转播安排。每场赛事右侧均列出对应的播出电视频道：',
    timeCol: '北京时间 (UTC+8)',
    leagueCol: '联赛 / 赛事',
    eventCol: '对阵 / 节目名称',
    channelsCol: '播出频道',
    trialCol: '测试',
    liveNow: '播出中',
    applyTrial: '申请频道测试',
    emptyChannels: '没有找到匹配的频道，试试清空搜索或切换地区。',
    emptyGuide: '该日期暂无节目排期。',
    loadingDate: '正在加载当日节目单...',
    matchesCount: '场',
  },
  en: {
    channelsStat: 'Linear Sports & Broadcast Channels',
    regionsStat: 'Countries & Regions',
    guideDaysStat: 'Preview Guide Window',
    guideMatchesStat: 'Broadcasts (Next 5 Days)',
    subTabChannels: 'Channel Directory (100+)',
    subTabGuide: 'Program Guide (Today + Next 4 Days)',
    searchChannelPlaceholder: 'Search channel name (e.g., ESPN, Sky Sports, TNT, NBA TV)...',
    allRegions: 'All Regions',
    channelUnit: 'channels',
    guideIntro: 'Select a date to inspect scheduled broadcasts and the corresponding TV channels airing each fixture:',
    timeCol: 'Time (UTC+8)',
    leagueCol: 'Competition',
    eventCol: 'Fixture / Program',
    channelsCol: 'Airing Channels',
    trialCol: 'Trial',
    liveNow: 'ON AIR',
    applyTrial: 'Request Trial',
    emptyChannels: 'No channels match your search.',
    emptyGuide: 'No scheduled broadcasts for this date.',
    loadingDate: 'Loading schedule...',
    matchesCount: 'events',
  },
  'zh-TW': {
    channelsStat: '已接入線性體育與綜合台',
    regionsStat: '覆蓋國家與地區',
    guideDaysStat: '節目單預覽天數',
    guideMatchesStat: '近 5 天待播賽事數',
    subTabChannels: '頻道目錄 (100+ 頻道)',
    subTabGuide: '近期節目單 (今日 + 未來 4 天)',
    searchChannelPlaceholder: '搜尋頻道名稱（如：ESPN、Sky Sports、TNT、NBA TV）...',
    allRegions: '全部地區',
    channelUnit: '個頻道',
    guideIntro: '點選日期查看當天各頻道的賽事轉播安排。每場賽事右側均列出對應的播出電視頻道：',
    timeCol: '北京時間 (UTC+8)',
    leagueCol: '聯賽 / 賽事',
    eventCol: '對陣 / 節目名稱',
    channelsCol: '播出頻道',
    trialCol: '測試',
    liveNow: '播出中',
    applyTrial: '申請頻道測試',
    emptyChannels: '沒有找到匹配的頻道，試試清空搜尋或切換地區。',
    emptyGuide: '該日期暫無節目排期。',
    loadingDate: '正在載入當日節目單...',
    matchesCount: '場',
  },
} as const

function copyFor(locale: string) {
  if (locale === 'en') return COPY.en
  if (locale === 'zh-TW') return COPY['zh-TW']
  return COPY.zh
}

function formatUtc8Time(unixSec: number) {
  if (!unixSec) return '—'
  const d = new Date((unixSec + 8 * 3600) * 1000)
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(d.getUTCDate()).padStart(2, '0')
  const hh = String(d.getUTCHours()).padStart(2, '0')
  const mi = String(d.getUTCMinutes()).padStart(2, '0')
  return `${mm}/${dd} ${hh}:${mi}`
}

function shortDayLabel(dateStr: string) {
  // "2026-11-04" -> "11/04"
  const parts = dateStr.split('-')
  return parts.length === 3 ? `${parts[1]}/${parts[2]}` : dateStr
}

export function ChannelsPreviewBoard({
  locale,
  groups,
  initialSchedule,
}: {
  locale: string
  groups: ChannelGroup[]
  initialSchedule: IptvSchedulePayload
}) {
  const t = copyFor(locale)
  const [subTab, setSubTab] = useState<'channels' | 'guide'>('channels')
  const [regionFilter, setRegionFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [schedule, setSchedule] = useState<IptvSchedulePayload>(initialSchedule)
  const [loadingDate, setLoadingDate] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('view') === 'guide') {
      setSubTab('guide')
    }
  }, [])

  function switchSubTab(next: 'channels' | 'guide') {
    setSubTab(next)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.set('tab', 'channels')
      if (next === 'guide') {
        url.searchParams.set('view', 'guide')
      } else {
        url.searchParams.delete('view')
      }
      window.history.replaceState({}, '', url.pathname + url.search)
    }
  }

  const visibleDays = useMemo(() => schedule.days.slice(0, 5), [schedule.days])

  const totalMatchesInGuide = useMemo(
    () => visibleDays.reduce((sum, d) => sum + d.count, 0),
    [visibleDays]
  )

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase()
    return groups
      .filter((g) => regionFilter === 'all' || g.tag === regionFilter)
      .map((g) => ({
        ...g,
        channels: q ? g.channels.filter((ch) => ch.name.toLowerCase().includes(q) || ch.id.toLowerCase().includes(q)) : g.channels,
      }))
      .filter((g) => g.channels.length > 0)
  }, [groups, regionFilter, query])

  async function selectDate(date: string) {
    if (date === schedule.date) return
    setLoadingDate(true)
    try {
      const res = await fetch(`/api/preview/iptv-schedule?date=${encodeURIComponent(date)}`, { cache: 'no-store' })
      if (!res.ok) return
      const next = (await res.json()) as IptvSchedulePayload
      setSchedule(next)
    } finally {
      setLoadingDate(false)
    }
  }

  return (
    <div>
      {/* 1. Stats bar */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="border border-brand-line border-l-4 border-l-brand-primary bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-brand-muted">{t.channelsStat}</p>
          <p className="mt-1.5 text-2xl font-bold tabular-nums text-brand-primary sm:text-3xl">100+</p>
        </div>

        <div className="border border-brand-line border-l-4 border-l-brand-ink bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-brand-muted">{t.regionsStat}</p>
          <p className="mt-1.5 text-2xl font-bold tabular-nums text-brand-ink sm:text-3xl">{groups.length}</p>
        </div>

        <div className="border border-brand-line border-l-4 border-l-brand-ink bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-brand-muted">{t.guideDaysStat}</p>
          <p className="mt-1.5 text-2xl font-bold tabular-nums text-brand-ink sm:text-3xl">
            {visibleDays.length || 5}
          </p>
        </div>

        <div className="border border-brand-line border-l-4 border-l-brand-primary bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-brand-muted">{t.guideMatchesStat}</p>
          <p className="mt-1.5 text-2xl font-bold tabular-nums text-brand-ink sm:text-3xl">
            {totalMatchesInGuide || '—'}
          </p>
        </div>
      </div>

      {/* 2. Sub-tab switcher: Channel Directory vs Program Guide */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-brand-line pb-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => switchSubTab('channels')}
            className={`px-4 py-2 text-xs font-bold transition-colors sm:text-sm ${
              subTab === 'channels'
                ? 'bg-brand-primary text-white shadow-[2px_2px_0_0_#141414]'
                : 'border border-brand-line bg-white text-brand-ink hover:border-brand-primary hover:text-brand-primary'
            }`}
          >
            📺 {t.subTabChannels}
          </button>

          <button
            type="button"
            onClick={() => switchSubTab('guide')}
            className={`px-4 py-2 text-xs font-bold transition-colors sm:text-sm ${
              subTab === 'guide'
                ? 'bg-brand-primary text-white shadow-[2px_2px_0_0_#141414]'
                : 'border border-brand-line bg-white text-brand-ink hover:border-brand-primary hover:text-brand-primary'
            }`}
          >
            📅 {t.subTabGuide}
          </button>
        </div>

        <Link
          href={`/${locale}/contact`}
          className="text-xs font-bold text-brand-primary hover:underline sm:text-sm"
        >
          {t.applyTrial} →
        </Link>
      </div>

      {subTab === 'channels' ? (
        <div className="mt-4">
          {/* Search & region filter */}
          <div className="flex flex-col gap-3 border border-brand-line bg-white p-3.5 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-md flex-1">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.searchChannelPlaceholder}
                className="w-full border border-brand-line bg-brand-paper/40 px-3 py-1.5 text-sm text-brand-ink placeholder:text-brand-muted focus:border-brand-primary focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => setRegionFilter('all')}
                className={`px-2.5 py-1 font-semibold ${
                  regionFilter === 'all'
                    ? 'bg-brand-ink text-white'
                    : 'bg-brand-paper text-brand-muted hover:text-brand-ink'
                }`}
              >
                {t.allRegions}
              </button>
              {groups.map((g) => (
                <button
                  key={g.tag}
                  type="button"
                  onClick={() => setRegionFilter(g.tag === regionFilter ? 'all' : g.tag)}
                  className={`px-2.5 py-1 font-semibold ${
                    regionFilter === g.tag
                      ? 'bg-brand-primary text-white'
                      : 'bg-brand-paper text-brand-ink hover:text-brand-primary'
                  }`}
                >
                  {g.region} <span className="opacity-70">({g.channels.length})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Region channel cards */}
          {filteredGroups.length === 0 ? (
            <div className="mt-4 border border-brand-line bg-white py-12 text-center text-sm text-brand-muted">
              {t.emptyChannels}
            </div>
          ) : (
            <div className="mt-4 space-y-5">
              {filteredGroups.map((group, idx) => (
                <article
                  key={group.tag}
                  className={`border border-brand-line bg-white p-5 shadow-sm sm:p-6 ${
                    idx % 2 === 0 ? 'border-l-4 border-l-brand-primary' : 'border-l-4 border-l-brand-ink'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-line pb-3.5">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex h-5 -skew-x-[10deg] items-center px-2.5 text-[11px] font-bold text-white ${
                          idx % 2 === 0 ? 'bg-brand-primary' : 'bg-brand-ink'
                        }`}
                      >
                        <span className="skew-x-[10deg]">{group.tag}</span>
                      </span>
                      <h3 className="text-base font-bold text-brand-ink sm:text-lg">{group.region}</h3>
                    </div>
                    <span className="text-xs font-medium text-brand-muted">
                      {group.channels.length} {t.channelUnit}
                    </span>
                  </div>

                  <ul className="mt-4 grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                    {group.channels.map((ch) => (
                      <li
                        key={ch.id}
                        className="group flex flex-col items-center gap-2 border border-brand-line bg-brand-paper/30 px-2 py-3 transition-colors hover:border-brand-primary hover:bg-brand-tint/35"
                        title={ch.name}
                      >
                        <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-brand-line">
                          <img
                            src={ch.logo}
                            alt={ch.name}
                            className="h-full w-full scale-[1.22] object-cover"
                            loading="lazy"
                          />
                        </span>
                        <span className="w-full truncate text-center text-[11px] font-semibold leading-4 text-brand-ink">
                          {ch.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-xs leading-6 text-brand-muted sm:text-sm">{t.guideIntro}</p>

          {/* Date selector pills (today + next 4 days) */}
          {visibleDays.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5 border border-brand-line bg-white p-3">
              {visibleDays.map((d) => {
                const active = d.date === schedule.date
                return (
                  <button
                    key={d.date}
                    type="button"
                    onClick={() => selectDate(d.date)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold transition-colors ${
                      active
                        ? 'bg-brand-primary text-white'
                        : 'bg-brand-paper text-brand-ink hover:border-brand-primary hover:text-brand-primary'
                    }`}
                  >
                    <span>{shortDayLabel(d.date)}</span>
                    <span className={`text-[11px] font-normal ${active ? 'text-white/85' : 'text-brand-muted'}`}>
                      ({d.count}{t.matchesCount})
                    </span>
                    {d.live > 0 && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    )}
                  </button>
                )
              })}
            </div>
          )}

          {/* Program guide table */}
          <div className="mt-4 overflow-x-auto border border-brand-line bg-white shadow-sm">
            {loadingDate ? (
              <div className="py-12 text-center text-sm text-brand-muted">{t.loadingDate}</div>
            ) : schedule.groups.length === 0 ? (
              <div className="py-12 text-center text-sm text-brand-muted">{t.emptyGuide}</div>
            ) : (
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-brand-paper text-xs font-bold text-brand-muted">
                  <tr>
                    <th className="whitespace-nowrap border-b border-brand-line px-3 py-3">{t.timeCol}</th>
                    <th className="whitespace-nowrap border-b border-brand-line px-3 py-3">{t.leagueCol}</th>
                    <th className="border-b border-brand-line px-3 py-3">{t.eventCol}</th>
                    <th className="border-b border-brand-line px-3 py-3">{t.channelsCol}</th>
                    <th className="whitespace-nowrap border-b border-brand-line px-3 py-3 text-right">{t.trialCol}</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.groups.flatMap((group) =>
                    group.matches.map((match, idx) => (
                      <tr
                        key={`${group.league}-${match.name}-${match.startAt}-${idx}`}
                        className="border-b border-brand-line last:border-b-0 hover:bg-brand-tint/25"
                      >
                        <td className="whitespace-nowrap px-3 py-3 text-xs font-medium tabular-nums text-brand-ink">
                          <div className="flex items-center gap-2">
                            <span>{formatUtc8Time(match.startAt)}</span>
                            {match.live && (
                              <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                {t.liveNow}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="max-w-[12rem] truncate px-3 py-3 text-xs font-bold text-brand-ink" title={group.league}>
                          {group.league}
                        </td>

                        <td className="px-3 py-3 text-xs font-semibold text-brand-ink sm:text-sm">
                          {match.home && match.away ? `${match.home} vs ${match.away}` : match.name}
                        </td>

                        <td className="px-3 py-2.5">
                          <div className="flex flex-wrap gap-1.5">
                            {match.channels.map((ch) => (
                              <span
                                key={ch.id}
                                className="inline-flex items-center gap-1.5 rounded-full border border-brand-line bg-brand-paper/50 py-0.5 pl-1 pr-2.5 text-xs font-semibold text-brand-ink"
                              >
                                {ch.logo && (
                                  <span className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-brand-line">
                                    <img src={ch.logo} alt={ch.name} className="h-full w-full scale-[1.2] object-cover" />
                                  </span>
                                )}
                                <span>{ch.name}</span>
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-3 py-2.5 text-right text-xs">
                          <Link
                            href={`/${locale}/contact`}
                            className="inline-flex items-center rounded border border-brand-primary/30 bg-brand-tint/40 px-2.5 py-1 font-semibold text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
                          >
                            {t.applyTrial}
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
