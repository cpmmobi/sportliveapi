import type { Metadata } from 'next'
import MainLayout from '@/components/layout/main-layout'
import FaqClient from '@/components/site/faq-client'
import { CtaBand, Mark } from '@/components/site/shell'
import { pageMeta } from '@/lib/meta'
import { tx } from '@/lib/locale'

const title = {
  zh: '常见问题',
  en: 'Frequently Asked Questions',
  'zh-TW': '常見問題',
}
const lede = {
  zh: '合作前最常确认的 6 件事：产品怎么选、版权与合规边界、数据范围、计费逻辑、如何测试上线及加密结算。单款产品的技术细节请见各产品页底部。',
  en: 'The 6 questions to settle before working together: product selection, copyright & compliance scope, data boundaries, pricing logic, trial onboarding, and crypto billing.',
  'zh-TW': '合作前最常確認的 6 件事：產品怎麼選、版權與合規邊界、資料範圍、計費邏輯、如何測試上線及加密結算。單款產品的技術細節請見各產品頁底部。',
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return pageMeta(params.locale, '/faq', tx(params.locale, title), tx(params.locale, lede))
}

export default function FaqPage({ params }: { params: { locale: string } }) {
  const locale = params.locale
  return (
    <MainLayout>
      <section className="border-b border-brand-line bg-brand-paper py-10 lg:py-14">
        <div className="container-custom">
          <div className="mb-8">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
              <Mark />
              <span>SPORTLIVE API · FAQ</span>
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              {tx(locale, title)}
            </h1>
            <p className="mt-3 max-w-2xl text-xs leading-6 text-brand-muted sm:text-sm">
              {tx(locale, lede)}
            </p>
          </div>

          <FaqClient locale={locale} />
        </div>
      </section>
      <CtaBand locale={locale} />
    </MainLayout>
  )
}
