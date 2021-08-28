export const stages = [
  'stage0',
  'stage1',
  'stage2',
  'stage3',
  'stage4',
  'inactive'
] as const

export type Stage = typeof stages[number]
export type ActiveStage = Exclude<Stage, 'inactive'>

export interface Proposal {
  type: 'ecma262' | 'ecma402' | 'inactive'
  titleHtml: string
  championsHtml: string
  stars?: number
  link?: string
  source?: string
  authorsHtml?: string
  rationaleHtml?: string
  meetingNotesHtml?: string
  lastPresentedHtml?: string
  expectedPublicationYearHtml?: string
}

export type ProposalsByStage = Record<Stage, Proposal[]>

export interface Specification {
  name: string
  alias: string
  specLink: string
  featureSetLink: string
  summary: string
}
