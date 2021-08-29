import { Proposal } from '../types'
import { graphql } from '@octokit/graphql'

export type GithubProposalKey = `${string}__${string}`

export async function request(query: string): Promise<unknown> {
  return graphql(query, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      'User-Agent': 'proposals.es'
    }
  })
}

export function getGitHubDetails(proposal: Proposal) {
  const url = new URL(proposal.link as string)
  const [, owner, repo, , ref, ...paths] = url.pathname.split('/')

  return { owner, repo, ref, paths }
}

export function getGithubProposalKey(proposal: Proposal): GithubProposalKey {
  const { owner, repo } = getGitHubDetails(proposal)
  const validRepoName = repo.replace(/-|\./g, '_') // GraphQL aliases cannot contain `-` or `.`

  return `${owner}__${validRepoName}`
}

export function isGithubProposal(proposal: Proposal): boolean {
  return proposal.link?.includes('github.com') ?? false
}
