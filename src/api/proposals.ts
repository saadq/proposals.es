import { graphql } from '@octokit/graphql'
import { Lexer, Tokens, Token } from 'marked'
import { Proposal, ProposalsByStage, Stage, stages } from '../types'

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

interface GetProposalsFromReadme {
  readme: string
  stage: Stage
  key: ResponseKey
}

interface GetProposalFromRow {
  row: Token[][]
  stage: Stage
  key: ResponseKey
}

const stageKeyMap: Record<Stage, ResponseKey> = {
  inactive: 'inactive',
  stage0: 'stage0',
  stage1: 'stage1',
  stage2: 'stage2And3',
  stage3: 'stage2And3',
  stage4: 'stage4'
}

const i18nStageKeyMap: Record<Stage, ResponseKey> = {
  inactive: 'inactive',
  stage0: 'i18nStage0',
  stage1: 'i18nStage1And2And3',
  stage2: 'i18nStage1And2And3',
  stage3: 'i18nStage1And2And3',
  stage4: 'i18nStage4'
}

export async function getProposalsByStage(): Promise<ProposalsByStage> {
  const getReadmesByStage = `
    query {
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
      
      inactive: repository(owner: "tc39", name: "proposals") {
        object(expression: "master:inactive-proposals.md") {
          ... on Blob {
            text
          }
        }
      }
    }
  `

  const readmesByStage: GitHubResponse = await graphql(getReadmesByStage, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`
    }
  })

  const proposalsByStage = getProposalsFromReadmesByStage(readmesByStage)

  return proposalsByStage
}

function getProposalsFromReadmesByStage(
  allReadmesByStage: GitHubResponse
): ProposalsByStage {
  return stages.reduce((proposalsByStage, stage) => {
    if (stage === 'inactive') {
      const inactiveProposalsKey = 'inactive'
      const inactiveReadme = allReadmesByStage[inactiveProposalsKey].object.text
      const inactiveProposals = getProposalsFromReadme({
        readme: inactiveReadme,
        key: inactiveProposalsKey,
        stage
      })

      return {
        ...proposalsByStage,
        inactive: inactiveProposals
      }
    }

    const proposalsKey = stageKeyMap[stage]
    const proposalsReadme = allReadmesByStage[proposalsKey].object.text
    const ecma262Proposals = getProposalsFromReadme({
      readme: proposalsReadme,
      key: proposalsKey,
      stage
    })

    const i18nProposalsKey = i18nStageKeyMap[stage]
    const i18nProposalsReadme = allReadmesByStage[i18nProposalsKey].object.text
    const ecma402Proposals = getProposalsFromReadme({
      readme: i18nProposalsReadme,
      key: i18nProposalsKey,
      stage
    })

    return {
      ...proposalsByStage,
      [stage]: [...ecma262Proposals, ...ecma402Proposals]
    }
  }, {}) as ProposalsByStage
}

function getProposalsFromReadme({
  readme,
  key,
  stage
}: GetProposalsFromReadme) {
  const lexer = new Lexer()
  const tokens = lexer.lex(readme)
  const proposalTables = tokens.filter((token) => token.type === 'table')
  let tableIndex = 0

  // Some READMEs have multiple proposal tables, so
  // we need to pick the right table for the stage.
  if (key.startsWith('i18n') && stage === 'stage1') {
    tableIndex = 2
  } else if (stage === 'stage2') {
    tableIndex = 1
  }

  const table = proposalTables[tableIndex] as Tokens.Table
  const rows = table.tokens.cells

  const proposals = rows
    .map((row) =>
      key === 'inactive'
        ? getInactiveProposalFromRow(row)
        : getProposalFromRow({ row, stage, key })
    )
    .filter((row) => row != null)

  return proposals
}

function getProposalFromRow({ row, stage, key }: GetProposalFromRow) {
  const [proposalCol, authorsCol, championsCol, ...rest] = row

  const proposalLinkTokens = proposalCol.find(
    (col) => col.type === 'link'
  ) as Tokens.Link

  const proposalTextToken = proposalCol.find(
    (col) => col.type === 'text'
  ) as Tokens.Text

  const proposalToken = proposalLinkTokens ?? proposalTextToken

  const authorTokens = authorsCol.filter(
    (col) => col.type === 'text'
  ) as Tokens.Text[]

  const championTokens = championsCol.filter(
    (col) => col.type === 'text'
  ) as Tokens.Text[]

  const isEcma402 = key.startsWith('i18n')
  const type = isEcma402 ? 'ecma402' : 'ecma262'
  const authors = authorTokens.map((token) => token.text)
  const champions = championTokens.map((token) => token.text)

  const name = proposalLinkTokens
    ? proposalToken.text
    : proposalCol.map((col) => (col as Tokens.Text).text).join('')

  const proposal: Proposal = {
    type,
    name,
    authors,
    champions
  }

  if (proposalLinkTokens) {
    proposal.link = proposalToken.href
  }

  if (
    (!isEcma402 && stage !== 'stage4') ||
    (isEcma402 && stage !== 'stage0' && stage !== 'stage4')
  ) {
    const lastPresentedDateIndex = stage === 'stage3' ? 1 : 0

    const lastPresentedDate = rest[lastPresentedDateIndex]?.find(
      (token) => token.type === 'link'
    ) as Tokens.Link

    if (lastPresentedDate) {
      proposal.lastPresented = {
        date: lastPresentedDate.text,
        link: lastPresentedDate.href
      }
    }
  }

  if (stage === 'stage4') {
    const meetingNotes = rest[0].find(
      (token) => token.type === 'link'
    ) as Tokens.Link

    if (meetingNotes) {
      proposal.meetingNotes = {
        date: meetingNotes.text,
        link: meetingNotes.href
      }
    }

    const expectedPublicationYear = rest[1].find(
      (token) => token.type === 'text'
    ) as Tokens.Text

    proposal.expectedPublicationYear = expectedPublicationYear.text
  }

  return proposal
}

function getInactiveProposalFromRow(row: Token[][]) {
  const [proposalCol, championsCol, rationaleCol] = row

  const proposalLinkTokens = proposalCol.find(
    (col) => col.type === 'link'
  ) as Tokens.Link

  const proposalTextToken = proposalCol.find(
    (col) => col.type === 'text'
  ) as Tokens.Text

  const proposalToken = proposalLinkTokens ?? proposalTextToken

  const championTokens = championsCol.filter(
    (col) => col.type === 'text'
  ) as Tokens.Text[]

  const rationaleToken = rationaleCol.find(
    (col) => col.type === 'text'
  ) as Tokens.Text

  const type = 'inactive'
  const champions = championTokens.map((token) => token.text)
  const rationale = rationaleToken.text

  const name = proposalLinkTokens
    ? proposalToken.text
    : proposalCol.map((col) => (col as Tokens.Text).text).join('')

  const proposal: Proposal = {
    type,
    name,
    champions,
    rationale
  }

  if (proposalLinkTokens) {
    proposal.link = proposalToken.href
  }

  return proposal
}
