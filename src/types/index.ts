export type Stage = 'stage0' | 'stage1' | 'stage2' | 'stage3' | 'stage4'

export interface Proposal {
  name: string
  link: string
  authors: string[]
  champions: string[]
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
