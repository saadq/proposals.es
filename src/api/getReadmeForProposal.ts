import { Octokit, RestEndpointMethodTypes } from '@octokit/rest'
import { Proposal } from '../types'

type GetReadmeParams =
  RestEndpointMethodTypes['repos']['getReadme']['parameters']

type GetContentParams =
  RestEndpointMethodTypes['repos']['getContent']['parameters']

type Params = GetReadmeParams | GetContentParams

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  userAgent: 'proposals.es'
})

export async function getReadmeForProposal({
  link
}: Proposal): Promise<string> {
  if (!link?.includes('github.com')) {
    return ''
  }

  const url = new URL(link as string)
  const [, owner, repo, , ref, ...paths] = url.pathname.split('/')
  const path = paths.join('/')

  const params: Params = {
    owner,
    repo,
    path,
    ref,
    mediaType: {
      format: 'html'
    }
  }

  const response = link.endsWith('.md')
    ? await octokit.repos.getContent(params as GetContentParams)
    : await octokit.repos.getReadme(params as GetReadmeParams)

  const readme = response.data as unknown as string

  return readme
}
