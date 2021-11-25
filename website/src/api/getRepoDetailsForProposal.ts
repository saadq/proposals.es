import { Proposal } from '../types'
import { GetRepoDetailsResponse as GetRepoDetailsResponse } from '../types/response'
import { avoidRateLimit } from '../utils/avoidRateLimit'
import { getGithubProposalKey, request } from '../utils/github'
import { buildGetRepoDetailsQuery } from './queries'

interface RepoDetails {
  stars: number
  defaultBranch: string
}

export async function getRepoDetailsForProposal(
  proposal: Proposal
): Promise<RepoDetails> {
  await avoidRateLimit()

  const getRepoDetailsQuery = buildGetRepoDetailsQuery([proposal])
  const response = (await request(getRepoDetailsQuery)) as GetRepoDetailsResponse
  const proposalKey = getGithubProposalKey(proposal)
  const details = response[proposalKey]

  return {
    stars: details.stargazerCount,
    defaultBranch: details.defaultBranchRef.name
  }
}
