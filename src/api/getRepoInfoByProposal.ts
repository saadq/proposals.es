import { ProposalsByStage } from '../types'
import { GetRepoInfoResponse } from '../types/response'
import { avoidRateLimit } from '../utils/avoidRateLimit'
import { GithubProposalKey, request } from '../utils/github'
import { buildGetStarsQuery } from './queries'

interface RepoInfo {
  stars: number
  defaultBranch: string
}

type RepoInfoByProposal = Record<GithubProposalKey, RepoInfo>

export async function getRepoInfoByProposal(
  proposalsByStage: ProposalsByStage
): Promise<RepoInfoByProposal> {
  await avoidRateLimit()

  const allProposals = Object.values(proposalsByStage).flat()
  const getStarsQuery = buildGetStarsQuery(allProposals)
  const repoInfoResponse = (await request(getStarsQuery)) as GetRepoInfoResponse

  const starsByProposal = Object.entries(repoInfoResponse).reduce(
    (starsByProposal, [proposalKey, response]) => ({
      ...starsByProposal,
      [proposalKey]: {
        stars: response.stargazerCount,
        defaultBranch: response.defaultBranchRef.name
      }
    }),
    {} as RepoInfoByProposal
  )

  return starsByProposal
}
