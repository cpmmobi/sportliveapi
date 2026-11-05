import type { Metadata } from 'next'
import MainLayout from '@/components/layout/main-layout'
import { CoverageTabs } from '@/components/preview/coverage-tabs'
import { CtaBand, Mark } from '@/components/site/shell'
import { coveragePage, iptvChannelData } from '@/content/site'
import { pageMeta } from '@/lib/meta'
import { tx } from '@/lib/locale'
import { getStreamsPreview } from '@/lib/streams-preview'
import { fetchIptvSchedule } from '@/lib/iptv-schedule'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return pageMeta(params.locale, '/coverage', tx(params.locale, coveragePage.title), tx(params.locale, coveragePage.lede))
}

export default async function CoveragePage({
  params,
  searchParams,
}: {
  params: { locale: string }
  searchParams: { tab?: string }
}) {
  const locale = params.locale
  const [streamsPreview, initialSchedule] = await Promise.all([getStreamsPreview(), fetchIptvSchedule()])

  return (
    <MainLayout>
      <section className="border-b border-brand-line bg-brand-paper pt-10 lg:pt-14">
        <div className="container-custom">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
            <Mark />
            <span>SPORTLIVE API · LIVE PREVIEW</span>
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">{tx(locale, coveragePage.title)}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-muted">{tx(locale, coveragePage.lede)}</p>
        </div>
      </section>
      <CoverageTabs
        locale={locale}
        initialTab={searchParams.tab === 'channels' ? 'channels' : 'streams'}
        streamsPreview={streamsPreview}
        channelGroups={iptvChannelData.coverageGroups.map((group) => ({
          tag: group.tag,
          region: tx(locale, group.region),
          channels: group.channels,
        }))}
        initialSchedule={initialSchedule}
      />
      <CtaBand locale={locale} />
    </MainLayout>
  )
}
