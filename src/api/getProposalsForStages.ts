import { getRepoDetailsByProposal } from './getRepoDetailsByProposal'
import { ProposalsByStage, Stage } from '../types'
import { buildGetReadmesForStagesQuery } from './queries'
import { avoidRateLimit } from '../utils/avoidRateLimit'
import { parseProposalsFromReadmes } from '../utils/parseReadme'
import { getGithubProposalKey, isGithubProposal, request } from '../utils/github'
import { GitHubResponse, ReadmeResponse, ReadmesByStage } from '../types/response'

/**
 * Retrieves all of the proposals from each of the ecma262 and ecma402
 * readmes for the given stages.
 */
export async function getProposalsForStages(
  stages: readonly Stage[]
): Promise<ProposalsByStage> {
  await avoidRateLimit()

  const getReadmesForStagesQuery = buildGetReadmesForStagesQuery(stages)
  const response = (await request(getReadmesForStagesQuery)) as GitHubResponse

  const readmesByStage = Object.entries(response).reduce(
    (readmesByStage, [responseKey, readmeResponse]) => ({
      ...readmesByStage,
      [responseKey]: (readmeResponse as ReadmeResponse).object.text
    }),
    {}
  ) as Partial<ReadmesByStage>

  const proposals = parseProposalsFromReadmes(stages, readmesByStage)
  const repoDetailsByProposal = await getRepoDetailsByProposal(proposals)

  const proposalsWithRepoDetails = Object.entries(proposals).reduce(
    (proposalsWithRepoDetails, [stage, proposals]) => ({
      ...proposalsWithRepoDetails,
      [stage]: proposals.map((proposal) =>
        isGithubProposal(proposal)
          ? {
              ...proposal,
              stars: repoDetailsByProposal[getGithubProposalKey(proposal)].stars,
              defaultBranch:
                repoDetailsByProposal[getGithubProposalKey(proposal)].defaultBranch
            }
          : proposal
      )
    }),
    {} as ProposalsByStage
  )

  return proposalsWithRepoDetails
}
