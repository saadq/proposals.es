import { allStages, Proposal } from '../types'
import { getProposalsForStages } from './getProposalsForStages'

export interface ChampionedProposal extends Proposal {
  isAuthor: boolean
  isChampion: boolean
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

  const proposalsByChampion: ProposalsByChampion = dedupedChampionNames.reduce(
    (proposalsByChampion, championName) => {
      const championedProposals = allProposals.reduce((championedProposals, proposal) => {
        const isChampion = proposal.champions.includes(championName)
        const isAuthor = proposal.authors?.includes(championName) ?? false
        return isChampion || isAuthor
          ? [...championedProposals, { ...proposal, isAuthor, isChampion }]
          : championedProposals
      }, [] as ChampionedProposal[])

      const sortedProposals = championedProposals.sort((a, b) =>
        (a.isChampion && a.isAuthor) || (a.isAuthor && !b.isAuthor) ? -1 : 0
      )

      return {
        ...proposalsByChampion,
        [championName]: sortedProposals
      }
    },
    {}
  )

  const championDetails: Champion[] = dedupedChampionNames.map((championName) => ({
    name: championName,
    proposals: proposalsByChampion[championName]
  }))

  return championDetails
}
