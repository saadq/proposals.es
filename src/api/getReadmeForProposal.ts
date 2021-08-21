import { Octokit, RestEndpointMethodTypes } from '@octokit/rest'
import { Proposal } from '../types'

type GetReadmeParams =
  RestEndpointMethodTypes['repos']['getReadme']['parameters']

type GetContentParams =
  RestEndpointMethodTypes['repos']['getContent']['parameters']

type Params = GetReadmeParams | GetContentParams

interface GitHubFile {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string | null
  type: string
  _links: unknown[]
}

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

  try {
    const response = link.endsWith('.md')
      ? await octokit.repos.getContent(params as GetContentParams)
      : await octokit.repos.getReadme(params as GetReadmeParams)
    return response.data as unknown as string
  } catch (err) {
    return getMarkdownFileFromRepo(params)
  }
}

async function getMarkdownFileFromRepo(params: Params): Promise<string> {
  const getContentResponse = await octokit.repos.getContent(
    params as GetContentParams
  )
  const files = getContentResponse.data as unknown as GitHubFile[]
  const markdownFile = files.find((file) => file.name.endsWith('.md'))

  if (!markdownFile) {
    return ''
  }

  const getMarkdownFileResponse = await octokit.request({
    url: markdownFile.url,
    mediaType: {
      format: 'html'
    }
  })

  const readme = getMarkdownFileResponse.data as unknown as string

  return readme
}
