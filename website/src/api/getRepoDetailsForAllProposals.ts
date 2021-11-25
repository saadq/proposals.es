import { ProposalsByStage } from '../types'
import { GetRepoDetailsResponse as GetRepoDetailsResponse } from '../types/response'
import { avoidRateLimit } from '../utils/avoidRateLimit'
import { GithubProposalKey, request } from '../utils/github'
import { buildGetRepoDetailsQuery } from './queries'

interface RepoDetails {
  stars: number
  defaultBranch: string
}

type RepoDetailsByProposal = Record<GithubProposalKey, RepoDetails>

export async function getRepoDetailsForAllProposals(
  proposalsByStage: Partial<ProposalsByStage>
): Promise<RepoDetailsByProposal> {
  await avoidRateLimit()

  const flattenedProposals = Object.values(proposalsByStage).flat()
  const getRepoDetailsQuery = buildGetRepoDetailsQuery(flattenedProposals)
  const repoDetailsResponse = (await request(
    getRepoDetailsQuery
  )) as GetRepoDetailsResponse

  const repoDetailsByProposal = Object.entries(repoDetailsResponse).reduce(
    (repoDetailsByProposal, [proposalKey, response]) => ({
      ...repoDetailsByProposal,
      [proposalKey]: {
        stars: response.stargazerCount,
        defaultBranch: response.defaultBranchRef.name
      }
    }),
    {} as RepoDetailsByProposal
  )

  return repoDetailsByProposal
}
