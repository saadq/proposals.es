export const allStages = [
  'stage4',
  'stage3',
  'stage2',
  'stage1',
  'stage0',
  'inactive'
] as const

export type Stage = typeof allStages[number]
export type ActiveStage = Exclude<Stage, 'inactive'>

export interface Proposal {
  type: 'ecma262' | 'ecma402' | 'inactive'
  title: string
  titleHtml: string
  champions: string[]
  authors?: string[]
  stars?: number
  defaultBranch?: string
  link?: string
  source?: string
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
