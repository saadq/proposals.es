import { ProposalsByStage } from '../types'
import { GetStarsResponse } from '../types/response'
import { avoidRateLimit } from '../utils/avoidRateLimit'
import { GithubProposalKey, request } from '../utils/github'
import { buildGetStarsQuery } from './queries'

type StarsByProposal = Record<GithubProposalKey, number>

export async function getProposalsWithStars(
  proposalsByStage: ProposalsByStage
): Promise<StarsByProposal> {
  await avoidRateLimit()

  const allProposals = Object.values(proposalsByStage).flat()
  const getStarsQuery = buildGetStarsQuery(allProposals)
  const starsResponse = (await request(getStarsQuery)) as GetStarsResponse

  const starsByProposal = Object.entries(starsResponse).reduce(
    (starsByProposal, [proposalKey, response]) => ({
      ...starsByProposal,
      [proposalKey]: response.stargazerCount
    }),
    {} as StarsByProposal
  )

  return starsByProposal
}
