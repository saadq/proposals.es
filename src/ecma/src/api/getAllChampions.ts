import { allStages, Proposal } from '../types'
import { getProposalsForStages } from './getProposalsForStages'

export interface ChampionedProposal extends Proposal {
  isAuthor?: boolean
  isChampion?: boolean
}

export interface Champion {
  name: string
  proposals: ChampionedProposal[]
}

export type ProposalsByChampion = Record<string, ChampionedProposal[]>

export async function getAllChampions(): Promise<Champion[]> {
  const allProposalsByStage = await getProposalsForStages({ stages: allStages })
  const allProposals = Object.values(allProposalsByStage).flat()

  const championNames = allProposals
    .map((proposal) => [...proposal.champions, ...(proposal.authors ?? [])])
    .flat()

  const dedupedChampionNames = [...new Set(championNames)]

  const champions = dedupedChampionNames.reduce(
    (champions, championName) => [
      ...champions,
      {
        name: championName,
        proposals: getProposalsForChampion(championName, allProposals)
      }
    ],
    [] as Champion[]
  )

  return champions
}

function getProposalsForChampion(championName: string, allProposals: Proposal[]) {
  const proposalsForChampion = allProposals.reduce((proposalsForChampion, proposal) => {
    const isChampion = proposal.champions.includes(championName)
    const isAuthor = proposal.authors?.includes(championName) ?? false

    return isAuthor || isChampion
      ? [...proposalsForChampion, { ...proposal, isAuthor, isChampion }]
      : proposalsForChampion
  }, [] as ChampionedProposal[])

  const sortedProposals = proposalsForChampion.sort((a, b) =>
    (a.isChampion && a.isAuthor) || (a.isAuthor && !b.isAuthor) ? -1 : 0
  )

  return sortedProposals
}
