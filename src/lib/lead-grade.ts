export type LeadGrade = 'A' | 'B' | 'C'

export interface LeadGradeResult {
  grade: LeadGrade
  /** First line of the Feishu notice. */
  headline: string
  /** What to do with this lead. */
  nextStep: string
  reason: string
}

const NEAR_TERM = new Set(['live_traffic', 'ready_soon'])

/**
 * Grade a simple-form lead.
 * Sport count only counts when match lines were selected. OBS-only auto sports are ignored.
 */
export function gradeLead(input: {
  useCase: string
  projectStage?: string
  sportsInterests?: string[]
}): LeadGradeResult {
  const products = (input.useCase || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
  const hasLines = products.includes('website_app')
  const hasIptv = products.includes('iptv')
  const hasObs = products.includes('obs_streaming')
  const onlyObs = products.length === 1 && hasObs
  const allThree = hasLines && hasIptv && hasObs
  const sportCount = hasLines ? (input.sportsInterests || []).length : 0
  const stage = input.projectStage || ''

  if (onlyObs) {
    return result('A', '只选了 OBS')
  }

  if (stage === 'evaluating') {
    return result('C', '立项筹备')
  }

  if (NEAR_TERM.has(stage)) {
    if (hasLines && sportCount >= 4) {
      return result('B', `已上线或 2–4 周内上线，球类 ${sportCount} 个`)
    }
    return result(
      'A',
      hasLines ? `已上线或 2–4 周内上线，球类 ${sportCount} 个` : '已上线或 2–4 周内上线，没有选赛事线路'
    )
  }

  if (stage === 'in_development') {
    if (allThree || (hasLines && sportCount >= 4)) {
      const parts = ['研发中']
      if (sportCount >= 4) parts.push(`球类 ${sportCount} 个`)
      if (allThree) parts.push('三块产品全选')
      return result('C', parts.join('，'))
    }
    return result('B', '研发中，范围还比较集中')
  }

  return result('B', '项目阶段未识别')
}

function result(grade: LeadGrade, reason: string): LeadGradeResult {
  if (grade === 'A') {
    return {
      grade,
      reason,
      headline: `🟢 A 类 · 当天联系，报价草稿看过再发（${reason}）`,
      nextStep: '🚀 当天、新加坡时间（UTC+8）10:30–20:30 内联系。先出报价草稿，看过再发给客户。',
    }
  }
  if (grade === 'B') {
    return {
      grade,
      reason,
      headline: `🟡 B 类 · 不发报价单，回起步价和两个问题（${reason}）`,
      nextStep:
        '🟡 先不要发报价单。回起步价，并问：1. 这个网址是你自己的网站，还是你想做成类似的产品？ 2. 最先要上的是哪 1 到 3 个球类？如果只要频道，直接说频道。答上来再升为 A 类。',
    }
  }
  return {
    grade,
    reason,
    headline: `⚪ C 类 · 只发自动确认邮件，先不联系（${reason}）`,
    nextStep: '⚪ 只发了自动确认邮件，先不要联系。',
  }
}
