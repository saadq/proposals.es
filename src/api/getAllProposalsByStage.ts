import { getProposalsWithStars } from './getStarsByProposal'
import { ProposalsByStage } from '../types'
import { getReadmesByStageQuery } from './queries'
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

  const response = (await request(getReadmesByStageQuery)) as GitHubResponse

  const readmesByStage = Object.entries(response).reduce(
    (readmesByStage, [responseKey, readmeResponse]) => ({
      ...readmesByStage,
      [responseKey]: (readmeResponse as ReadmeResponse).object.text
    }),
    {}
  ) as ReadmesByStage

  const proposals = parseProposalsFromReadmes(readmesByStage)
  const starsByProposal = await getProposalsWithStars(proposals)

  const proposalsWithStars = Object.entries(proposals).reduce(
    (proposalsWithStars, [stage, proposals]) => ({
      ...proposalsWithStars,
      [stage]: proposals.map((proposal) =>
        isGithubProposal(proposal)
          ? {
              ...proposal,
              stars: starsByProposal[getGithubProposalKey(proposal)]
            }
          : proposal
      )
    }),
    {} as ProposalsByStage
  )

  return proposalsWithStars
}
