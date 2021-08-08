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

export async function getProposalsByStage(): Promise<ProposalsByStage> {
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

  const proposals: ProposalsByStage = getProposalsFromReadmes(readmesByStage)

  return proposals
}

function getProposalsFromReadmes(
  allReadmesByStage: ReadmesByStage
): ProposalsByStage {
  return stages.reduce((proposalsByStage, stage) => {
    if (stage === 'inactive') {
      return {
        ...proposalsByStage,
        inactive: getInactiveProposals(allReadmesByStage.inactive)
      }
    }

    const ecma262Readme = allReadmesByStage[stageKeyMap[stage]]
    const ecma402Readme = allReadmesByStage[i18nStageKeyMap[stage]]

    const proposals = [
      ...getEcma262ProposalsForStage(ecma262Readme, stage),
      ...getEcma402ProposalsForStage(ecma402Readme, stage)
    ]

    return {
      ...proposalsByStage,
      [stage]: proposals
    }
  }, {}) as ProposalsByStage
}

function getInactiveProposals(readme: string): Proposal[] {
  const html = marked(readme)
  const $ = load(html)
  const rows = $('tbody tr')

  return rows
    .map((_, element) => {
      const row = $(element, rows)
      const cols = $('td', row)
      const [proposalHtml, championsHtml, rationaleHtml] = cols.map(
        (_, element) => $(element, cols).html()
      )

      const proposal: Proposal = {
        type: 'inactive',
        proposalHtml,
        championsHtml,
        rationaleHtml
      }

      return proposal
    })
    .toArray()
}

function getEcma262ProposalsForStage(readme: string, stage: Stage): Proposal[] {
  const html = marked(readme)
  const $ = load(html)
  const tableIndex = stage === 'stage2' ? 2 : 1
  const rows = $(`table:nth-of-type(${tableIndex}) tbody tr`)

  const proposals = rows
    .map((_, element) => {
      const row = $(element, rows)
      const cols = $('td', row)
      const colVals = cols.map((_, element) => $(element, cols).html())

      const proposal: Proposal = {
        type: 'ecma262',
        proposalHtml: colVals[0],
        authorsHtml: colVals[1],
        championsHtml: colVals[2]
      }

      if (stage !== 'stage4') {
        const lastPresentedIndex = stage === 'stage3' ? 4 : 3
        proposal.lastPresentedHtml = colVals[lastPresentedIndex]
      } else {
        proposal.meetingNotesHtml = colVals[3]
        proposal.expectedPublicationYearHtml = colVals[4]
      }

      return proposal
    })
    .toArray()

  return proposals
}

function getEcma402ProposalsForStage(readme: string, stage: Stage): Proposal[] {
  const html = marked(readme)
  const $ = load(html)
  const tableIndex = stage === 'stage1' ? 3 : stage === 'stage2' ? 2 : 1
  const rows = $(`table:nth-of-type(${tableIndex}) tbody tr`)

  const proposals = rows
    .map((_, element) => {
      const row = $(element, rows)
      const cols = $('td', row)
      const colVals = cols.map((_, element) => $(element, cols).html())

      const proposal: Proposal = {
        type: 'ecma402',
        proposalHtml: colVals[0],
        authorsHtml: colVals[1],
        championsHtml: colVals[2]
      }

      if (stage === 'stage1' || stage === 'stage2' || stage === 'stage3') {
        proposal.lastPresentedHtml = colVals[3]
      }

      if (stage === 'stage4') {
        proposal.meetingNotesHtml = colVals[3]
        proposal.expectedPublicationYearHtml = colVals[4]
      }

      return proposal
    })
    .toArray()

  return proposals
}
