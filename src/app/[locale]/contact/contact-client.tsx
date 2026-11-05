'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import MainLayout from '@/components/layout/main-layout'
import SimpleContactForm from '@/components/contact/simple-contact-form'
import { usePathname } from 'next/navigation'
import { Mark } from '@/components/site/shell'

function l(locale: string, zh: string, en: string, tw?: string) {
  if (locale === 'zh') return zh
  if (locale === 'zh-TW') return tw || zh
  return en
}

export default function ContactClientPage() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'en'
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const onlyObsSelected = selectedProducts.length === 1 && selectedProducts[0] === 'obs_streaming'

  const steps = onlyObsSelected
    ? [
        {
          num: '01',
          title: l(
            locale,
            '选择最大同时播流人数并留资',
            'Select concurrent streamers & contact',
            '選擇最大同時播流人數並留資'
          ),
          desc: l(
            locale,
            '勾选同时开播人数，留下你的 Telegram、WhatsApp 或工作邮箱。',
            'Pick your max concurrent streamers and leave your Telegram, WhatsApp, or email.',
            '勾選同時開播人數，留下你的 Telegram、WhatsApp 或工作信箱。'
          ),
        },
        {
          num: '02',
          title: l(
            locale,
            '2–4 小时内拉群与确认报价',
            '1-on-1 group & pricing in 2–4h',
            '2–4 小時內拉群與確認報價'
          ),
          desc: l(
            locale,
            '专人与你建联，按主播同时开播规模提供对应套餐报价。',
            'We reach out within 2–4 hours with pricing matched to your streamer concurrency.',
            '專人與你建聯，按主播同時開播規模提供對應套餐報價。'
          ),
        },
        {
          num: '03',
          title: l(
            locale,
            '拉群接入机器人，指令查流开播',
            'Bot setup in group & go live on OBS',
            '拉群接入機器人，指令查流開播'
          ),
          desc: l(
            locale,
            '将机器人拉入你的 Telegram / Lark 群并开通权限，主播发指令即可秒拿流地址贴进 OBS 开播。',
            'Add the bot to your Telegram or Lark group — hosts query live feeds via chat commands and paste straight into OBS.',
            '將機器人拉入你的 Telegram / Lark 群並開通權限，主播發指令即可秒拿流地址貼進 OBS 開播。'
          ),
        },
      ]
    : [
        {
          num: '01',
          title: l(
            locale,
            '勾选感兴趣的服务与联系方式',
            'Select services & leave your contact',
            '勾選感興趣的服務與聯繫方式'
          ),
          desc: l(
            locale,
            '选择你要接入的产品，留下 Telegram、WhatsApp 或工作邮箱。',
            'Pick the products you need and leave your Telegram, WhatsApp, or work email.',
            '選擇你要接入的產品，留下 Telegram、WhatsApp 或工作信箱。'
          ),
        },
        {
          num: '02',
          title: l(
            locale,
            '2–4 小时内拉群与报价',
            '1-on-1 channel & quote in 2–4h',
            '2–4 小時內拉群與報價'
          ),
          desc: l(
            locale,
            '专人建联，确认接入方式并提供对应套餐报价。',
            'We reach out within 2–4 hours to confirm delivery mode and pricing.',
            '專人建聯，確認接入方式並提供對應套餐報價。'
          ),
        },
        {
          num: '03',
          title: l(
            locale,
            '配置白名单 / 开通服务',
            'Allowlist setup & same-day activation',
            '配置白名單 / 開通服務'
          ),
          desc: l(
            locale,
            '按目标地区配置防盗链与 CDN 节点（或拉群开通机器人），最快当天上线。',
            'Configure geo-allowlists and CDN routing (or activate your group bot), and go live the same day.',
            '按目標地區配置防盜鏈與 CDN 節點（或拉群開通機器人），最快當天上線。'
          ),
        },
      ]

  return (
    <MainLayout>
      <section className="border-b border-brand-line bg-brand-paper py-10 lg:py-12">
        <div className="container-custom">
          <div className="grid items-start gap-7 lg:grid-cols-12 lg:gap-8">
            {/* LEFT COLUMN: Clean, scannable 4-col sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
                <Mark />
                <span>SPORTLIVE API</span>
              </p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">
                {l(
                  locale,
                  '获取方案、报价与测试权限',
                  'Get Your Plan, Quote & Trial Access',
                  '取得方案、報價與測試權限'
                )}
              </h1>
              <p className="mt-2 text-xs leading-5 text-brand-muted sm:text-sm">
                {l(
                  locale,
                  '服务比分直播站、体育 App、海外 IPTV 与足篮球主播团队。',
                  'For live-score sites, sports apps, OTT/IPTV services, and football/basketball creator teams.',
                  '服務比分直播站、體育 App、海外 IPTV 與足籃球主播團隊。'
                )}
              </p>

              {/* 3-Step Onboarding + Compact Tags in ONE card */}
              <div className="mt-5 border border-brand-line border-t-4 border-t-brand-ink bg-white p-5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-brand-primary">
                  {onlyObsSelected
                    ? l(locale, 'OBS 机器人开通流程（最快当天开播）', 'OBS BOT ONBOARDING', 'OBS 機器人開通流程（最快當天開播）')
                    : l(locale, '对接流程（最快当天上线）', 'ONBOARDING PROCESS', '對接流程（最快當天上線）')}
                </p>
                <ol className="mt-3.5 divide-y divide-brand-line">
                  {steps.map((s) => (
                    <li key={s.num} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-5 w-6 shrink-0 -skew-x-[10deg] items-center justify-center bg-brand-primary font-mono text-[11px] font-bold text-white">
                          {s.num}
                        </span>
                        <div>
                          <h2 className="text-xs font-bold text-brand-ink">{s.title}</h2>
                          <p className="mt-0.5 text-[11px] leading-4 text-brand-muted">{s.desc}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-4 border-t border-brand-line pt-3.5 text-[11px] leading-5 text-brand-muted">
                  <div>
                    <strong className="text-brand-ink">{l(locale, '加密结算：', 'Billing: ', '加密結算：')}</strong>
                    {l(locale, '支持 USDT / USDC / BTC，保护商户隐私', 'USDT / USDC / BTC supported', '支援 USDT / USDC / BTC，保護商戶隱私')}
                  </div>
                  <div className="mt-1">
                    <strong className="text-brand-ink">{l(locale, '服务对象：', 'Scope: ', '服務對象：')}</strong>
                    {l(locale, '面向 B2B 平台与体育主播合作，不向个人看球观众售卖', 'For B2B platforms & streamers only', '面向 B2B 平台與體育主播合作，不向個人看球觀眾售賣')}
                  </div>
                </div>
              </div>

              {/* Quick self-service links */}
              <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border border-brand-line bg-white px-4 py-2.5 text-xs">
                <span className="text-brand-muted">
                  {l(locale, '想先看画面或调试接口？', 'Test feeds or APIs first?', '想先看畫面或調試介面？')}
                </span>
                <div className="flex items-center gap-3 font-bold text-brand-primary">
                  <Link href={`/${locale}/coverage`} className="hover:underline">
                    {l(locale, '直播预览 →', 'Live Preview →', '直播預覽 →')}
                  </Link>
                  <Link href={`/${locale}/docs`} className="hover:underline">
                    {l(locale, 'API 调试 →', 'API Playground →', 'API 調試 →')}
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: 8-col Lead Form */}
            <div className="lg:col-span-8">
              <SimpleContactForm
                locale={locale}
                onProductsChange={setSelectedProducts}
              />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
