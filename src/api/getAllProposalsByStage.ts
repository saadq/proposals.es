import { getRepoInfoByProposal } from './getRepoInfoByProposal'
import { ProposalsByStage } from '../types'
import { getReadmesForAllStagesQuery } from './queries'
import { avoidRateLimit } from '../utils/avoidRateLimit'
import { parseProposalsFromReadmes } from '../utils/parseReadme'
import {
  getGithubProposalKey,
  isGithubProposal,
  request
} from '../utils/github'
import {
  GitHubResponse,
  ReadmeResponse,
  ReadmesByStage
} from '../types/response'

export async function getAllProposalsByStage(): Promise<ProposalsByStage> {
  await avoidRateLimit()

  const response = (await request(
    getReadmesForAllStagesQuery
  )) as GitHubResponse

  const readmesByStage = Object.entries(response).reduce(
    (readmesByStage, [responseKey, readmeResponse]) => ({
      ...readmesByStage,
      [responseKey]: (readmeResponse as ReadmeResponse).object.text
    }),
    {}
  ) as ReadmesByStage

  const proposals = parseProposalsFromReadmes(readmesByStage)
  const repoInfoByProposal = await getRepoInfoByProposal(proposals)

  const proposalsWithRepoDetails = Object.entries(proposals).reduce(
    (proposalsWithRepoInfo, [stage, proposals]) => ({
      ...proposalsWithRepoInfo,
      [stage]: proposals.map((proposal) =>
        isGithubProposal(proposal)
          ? {
              ...proposal,
              stars: repoInfoByProposal[getGithubProposalKey(proposal)].stars,
              defaultBranch:
                repoInfoByProposal[getGithubProposalKey(proposal)].defaultBranch
            }
          : proposal
      )
    }),
    {} as ProposalsByStage
  )

  return proposalsWithRepoDetails
}
