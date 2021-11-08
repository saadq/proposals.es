import { load } from 'cheerio'
import { ActiveStage, Stage } from '../types'
import { avoidRateLimit } from '../utils/avoidRateLimit'

const selectorsByStage: Record<ActiveStage, string> = {
  stage0: 'h4[id^="stage-0"]',
  stage1: 'h4[id^="stage-1"]',
  stage2: 'h4[id^="stage-2"]',
  stage3: 'h4[id^="stage-3"]',
  stage4: 'h4[id^="stage-4"]'
}

export async function getStageDetails(stage: Stage): Promise<string> {
  await avoidRateLimit()

  if (stage === 'inactive') {
    return 'Inactive proposals are proposals that at one point were presented to the committee but were subsequently abandoned, withdrawn, or rejected.'
  }

  const endpoint = 'https://2ality.com/2015/11/tc39-process.html'
  const response = await fetch(endpoint)
  const html = await response.text()
  const $ = load(html)
  const startSelector = selectorsByStage[stage]
  const endSelector = stage === 'stage4' ? 'h2' : 'h4'
  const stageDetailsHtml = $(startSelector).nextUntil(endSelector).toString()

  return stageDetailsHtml
}
