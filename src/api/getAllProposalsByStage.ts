import { graphql } from '@octokit/graphql'
import marked from 'marked'
import { load } from 'cheerio'
import {
  ActiveStage,
  Proposal,
  ProposalsByStage,
  Stage,
  stages
} from '../types'

interface ReadmeResponse {
  object: {
    text: string
  }
}

interface GitHubResponse {
  stage0: ReadmeResponse
  stage1: ReadmeResponse
  stage2And3: ReadmeResponse
  stage4: ReadmeResponse
  i18nStage0: ReadmeResponse
  i18nStage1And2And3: ReadmeResponse
  i18nStage4: ReadmeResponse
  inactive: ReadmeResponse
}

type ResponseKey = keyof GitHubResponse
type ReadmesByStage = Record<ResponseKey, string>

interface GitHubStargazerResponse {
  [key: string]: {
    stargazerCount: number
  }
}

type StarsByProposal = Record<string, number>

const stageKeyMap: Record<ActiveStage, ResponseKey> = {
  stage0: 'stage0',
  stage1: 'stage1',
  stage2: 'stage2And3',
  stage3: 'stage2And3',
  stage4: 'stage4'
}

const i18nStageKeyMap: Record<ActiveStage, ResponseKey> = {
  stage0: 'i18nStage0',
  stage1: 'i18nStage1And2And3',
  stage2: 'i18nStage1And2And3',
  stage3: 'i18nStage1And2And3',
  stage4: 'i18nStage4'
}

export async function getAllProposalsByStage(): Promise<ProposalsByStage> {
  const getReadmesByStage = `
    query {
      inactive: repository(owner: "tc39", name: "proposals") {
        object(expression: "master:inactive-proposals.md") {
          ... on Blob {
            text
          }
        }
      }

      stage0: repository(owner: "tc39", name: "proposals") {
        object(expression: "master:stage-0-proposals.md") {
          ... on Blob {
            text
          }
        }
      }

      stage1: repository(owner: "tc39", name: "proposals") {
        object(expression: "master:stage-1-proposals.md") {
          ... on Blob {
            text
          }
        }
      }

      stage2And3: repository(owner: "tc39", name: "proposals") {
        object(expression: "master:README.md") {
          ... on Blob {
            text
          }
        }
      }

      stage4: repository(owner: "tc39", name: "proposals") {
        object(expression: "master:finished-proposals.md") {
          ... on Blob {
            text
          }
        }
      }

      i18nStage0: repository(owner: "tc39", name: "proposals") {
        object(expression: "master:ecma402/stage-0-proposals.md") {
          ... on Blob {
            text
          }
        }
      }
      
      i18nStage1And2And3: repository(owner: "tc39", name: "proposals") {
        object(expression: "master:ecma402/README.md") {
          ... on Blob {
            text
          }
        }
      }
      
      i18nStage4: repository(owner: "tc39", name: "proposals") {
        object(expression: "master:ecma402/finished-proposals.md") {
          ... on Blob {
            text
          }
        }
      }  
    }
  `

  const response: GitHubResponse = await graphql(getReadmesByStage, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`
    }
  })

  const readmesByStage = Object.entries(response).reduce(
    (readmesByStage, [responseKey, readmeResponse]) => ({
      ...readmesByStage,
      [responseKey]: (readmeResponse as ReadmeResponse).object.text
    }),
    {}
  ) as ReadmesByStage

  const proposals: ProposalsByStage = getAllProposalsFromReadmes(readmesByStage)
  const proposalsWithStars = await getProposalsWithStars(proposals)

  return proposalsWithStars
}

function getAllProposalsFromReadmes(
  allReadmesByStage: ReadmesByStage
): ProposalsByStage {
  return stages.reduce((proposalsByStage, stage) => {
    if (stage === 'inactive') {
      return {
        ...proposalsByStage,
        inactive: getProposalsFromReadme(allReadmesByStage.inactive, stage)
      }
    }

    const ecma262Readme = allReadmesByStage[stageKeyMap[stage]]
    const ecma402Readme = allReadmesByStage[i18nStageKeyMap[stage]]

    const proposals = [
      ...getProposalsFromReadme(ecma262Readme, stage),
      ...getProposalsFromReadme(ecma402Readme, stage, true)
    ]

    return {
      ...proposalsByStage,
      [stage]: proposals
    }
  }, {}) as ProposalsByStage
}

function getProposalsFromReadme(
  readme: string,
  stage: Stage,
  isI18n?: boolean
): Proposal[] {
  const html = marked(readme)
  const $ = load(html)
  const tableNumber = getTableNumberForStage(stage, isI18n)
  const rows = $(`table:nth-of-type(${tableNumber}) tbody tr`)

  const proposals = rows
    .map((_, element) => {
      const row = $(element, rows)
      const cols = $('td', row)
      const colVals = cols.map((_, element) => $(element, cols).html())
      const proposalLink = $(colVals[0], cols)
      const hasLink = proposalLink.attr('href')

      if (stage === 'inactive') {
        const [titleHtml, championsHtml, rationaleHtml] = colVals

        const proposal: Proposal = {
          type: 'inactive',
          link: proposalLink.attr('href') ?? '',
          titleHtml: hasLink
            ? (proposalLink.html() as string)
            : titleHtml ?? '',
          championsHtml,
          rationaleHtml
        }

        return proposal
      }

      const proposal: Proposal = {
        type: isI18n ? 'ecma402' : 'ecma262',
        link: proposalLink.attr('href') ?? '',
        titleHtml: hasLink ? (proposalLink.html() as string) : colVals[0] ?? '',
        authorsHtml: colVals[1],
        championsHtml: colVals[2]
      }

      if (stage === 'stage4') {
        proposal.meetingNotesHtml = colVals[3]
        proposal.expectedPublicationYearHtml = colVals[4]
      } else if (!isI18n || (isI18n && stage !== 'stage0')) {
        const lastPresentedColIndex = !isI18n && stage === 'stage3' ? 4 : 3
        proposal.lastPresentedHtml = colVals[lastPresentedColIndex]
      }

      return proposal
    })
    .toArray()

  return proposals
}

function getTableNumberForStage(stage: Stage, isI18n?: boolean) {
  if (isI18n) {
    return stage === 'stage1' ? 3 : stage === 'stage2' ? 2 : 1
  }

  return stage === 'stage2' ? 2 : 1
}

async function getProposalsWithStars(proposalsByStage: ProposalsByStage) {
  const allProposals = Object.values(proposalsByStage).flat()

  const query = `
    query {
      ${allProposals.filter(isGithubProposal).map((proposal) => {
        const { owner, repoName } = getGitHubDetails(proposal)
        const proposalKey = getProposalKey(proposal)
        return `
          ${proposalKey}: repository(owner: "${owner}", name: "${repoName}") {
            stargazerCount
          }
        `
      })}
    }
  `

  const stargazerResponse: GitHubStargazerResponse = await graphql(query, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`
    }
  })

  const starsByProposal = Object.entries(stargazerResponse).reduce(
    (starsByProposal, [name, response]) => ({
      ...starsByProposal,
      [name]: response.stargazerCount
    }),
    {} as StarsByProposal
  )

  const proposalsWithStars = Object.entries(proposalsByStage).reduce(
    (proposalsWithStars, [stage, proposals]) => ({
      ...proposalsWithStars,
      [stage]: proposals.map((proposal) =>
        isGithubProposal(proposal)
          ? { ...proposal, stars: starsByProposal[getProposalKey(proposal)] }
          : proposal
      )
    }),
    {} as ProposalsByStage
  )

  return proposalsWithStars
}

function getGitHubDetails(proposal: Proposal) {
  const url = new URL(proposal.link as string)
  const [, owner, repoName] = url.pathname.split('/')

  return { owner, repoName }
}

function getProposalKey(proposal: Proposal) {
  const { owner, repoName } = getGitHubDetails(proposal)
  const repoNameWithoutInvalidChars = repoName.replace(/-|\./g, '_')

  return `${owner}__${repoNameWithoutInvalidChars}`
}

function isGithubProposal(proposal: Proposal) {
  return proposal.link?.includes('github.com')
}
