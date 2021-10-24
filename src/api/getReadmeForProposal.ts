import { Octokit, RestEndpointMethodTypes } from '@octokit/rest'
import { Proposal } from '../types'
import { avoidRateLimit } from '../utils/avoidRateLimit'
import { getGitHubDetails, isGithubProposal } from '../utils/github'

type GetReadmeParams = RestEndpointMethodTypes['repos']['getReadme']['parameters']

type GetContentParams = RestEndpointMethodTypes['repos']['getContent']['parameters']

type Params = GetReadmeParams | GetContentParams

interface GitHubFile {
  name: string
  url: string
  [key: string]: unknown
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  userAgent: 'proposals.es'
})

const mediaType = {
  format: 'raw'
}

export async function getReadmeForProposal(proposal: Proposal): Promise<string> {
  await avoidRateLimit()

  if (!isGithubProposal(proposal)) {
    return ''
  }

  const { owner, repo, ref, paths } = getGitHubDetails(proposal)
  const path = paths.join('/')

  const params: Params = {
    owner,
    repo,
    ref,
    path,
    mediaType
  }

  try {
    const response = proposal.link?.endsWith('.md')
      ? await octokit.repos.getContent(params as GetContentParams)
      : await octokit.repos.getReadme(params as GetReadmeParams)
    return response.data as unknown as string
  } catch (err) {
    return getMarkdownFileFromRepo(params)
  }
}

async function getMarkdownFileFromRepo(params: Params): Promise<string> {
  const getContentResponse = await octokit.repos.getContent(params as GetContentParams)
  const files = getContentResponse.data as GitHubFile[]
  const markdownFile = files.find((file) => file.name.endsWith('.md'))

  if (!markdownFile) {
    return ''
  }

  const getMarkdownFileResponse = await octokit.request({
    url: markdownFile.url,
    mediaType
  })

  const readme = getMarkdownFileResponse.data as unknown as string

  return readme
}
