import { Proposal, Stage } from '../types'
import { ResponseKey } from '../types/response'
import { getGitHubDetails, getGithubProposalKey, isGithubProposal } from '../utils/github'

interface GithubRepoQueryParams {
  alias: string
  owner: string
  name: string
  branch: string
  pathToProposals: string
}

interface CreateProposalsFragmentParams {
  alias: ResponseKey
  pathToProposals: string
  branch?: string
}

function createRepoFragment({
  alias,
  owner,
  name,
  branch,
  pathToProposals
}: GithubRepoQueryParams) {
  return `
    ${alias}: repository(owner: "${owner}", name: "${name}") {
      object(expression: "${branch}:${pathToProposals}") {
        ... on Blob {
          text
        }
      }
    }
  `
}

function createProposalsFragment({
  alias,
  pathToProposals
}: CreateProposalsFragmentParams) {
  return createRepoFragment({
    alias,
    pathToProposals,
    owner: 'tc39',
    name: 'proposals',
    branch: 'master'
  })
}

const inactiveFragment = createProposalsFragment({
  alias: 'inactive',
  pathToProposals: 'inactive-proposals.md'
})

const stage0Fragment = createProposalsFragment({
  alias: 'stage0',
  pathToProposals: 'stage-0-proposals.md'
})

const stage1Fragment = createProposalsFragment({
  alias: 'stage1',
  pathToProposals: 'stage-1-proposals.md'
})

const stage2And3Fragment = createProposalsFragment({
  alias: 'stage2And3',
  pathToProposals: 'README.md'
})

const stage4Fragment = createProposalsFragment({
  alias: 'stage4',
  pathToProposals: 'finished-proposals.md'
})

const i18nStage0Fragment = createProposalsFragment({
  alias: 'i18nStage0',
  pathToProposals: 'ecma402/stage-0-proposals.md'
})

const i18nStage1And2And3Fragment = createProposalsFragment({
  alias: 'i18nStage1And2And3',
  pathToProposals: 'ecma402/README.md'
})

const i18nStage4Fragment = createProposalsFragment({
  alias: 'i18nStage4',
  pathToProposals: 'ecma402/finished-proposals.md'
})

const queryFragmentsByStage: Record<Stage, string[]> = {
  inactive: [inactiveFragment],
  stage0: [stage0Fragment, i18nStage0Fragment],
  stage1: [stage1Fragment, i18nStage1And2And3Fragment],
  stage2: [stage2And3Fragment, i18nStage1And2And3Fragment],
  stage3: [stage2And3Fragment, i18nStage1And2And3Fragment],
  stage4: [stage4Fragment, i18nStage4Fragment]
}

function buildProposalsQuery(stages: readonly Stage[]) {
  return `
    query {
      ${stages.map((stage) => queryFragmentsByStage[stage]).join('\n')}
    }
  `
}

export function buildGetReadmesForStagesQuery(stages: readonly Stage[]) {
  return buildProposalsQuery(stages)
}

export function buildGetRepoDetailsQuery(allProposals: Proposal[]): string {
  const getStarsQuery = `
    query {
      ${allProposals
        .filter(isGithubProposal)
        .map((proposal) => {
          const { owner, repo } = getGitHubDetails(proposal)
          const proposalAlias = getGithubProposalKey(proposal)
          return `
            ${proposalAlias}: repository(owner: "${owner}", name: "${repo}") {
              stargazerCount
              defaultBranchRef {
                name
              }
            }
          `
        })
        .join('\n')}
    }
  `

  return getStarsQuery
}
