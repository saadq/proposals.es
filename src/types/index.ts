export const stages = [
  'stage0',
  'stage1',
  'stage2',
  'stage3',
  'stage4',
  'inactive'
] as const

export type Stage = typeof stages[number]

export interface Proposal {
  type: 'ecma262' | 'ecma402' | 'inactive'
  name: string
  champions: string[]
  link?: string
  authors?: string[]
  rationale?: string
  meetingNotes?: {
    date: string
    link: string
  }
  lastPresented?: {
    date: string
    link: string
  }
  expectedPublicationYear?: string
}

export type ProposalsByStage = Record<Stage, Proposal[]>

export interface Specification {
  name: string
  alias: string
  specLink: string
  featureSetLink: string
  summary: string
}
