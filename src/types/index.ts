import { ChampionedProposal } from '../api/getAllChampions'

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
export type ProposalType = 'ecma-262' | 'ecma-402' | 'inactive'

export interface Proposal {
  stage: Stage
  type: ProposalType
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

export interface Champion {
  name: string
  proposals: ChampionedProposal[]
}

export interface SimplifiedChampion extends Omit<Champion, 'proposals'> {
  proposalCount: number
}

export interface Specification {
  name: string
  alias: string
  specLink: string
  summary?: string
  featureSetLink?: string
}
