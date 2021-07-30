import { graphql } from '@octokit/graphql'
import { Lexer, Tokens, Token } from 'marked'
import { Proposal, ProposalsByStage, Stage } from '../types'

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
}

export async function getProposals(): Promise<ProposalsByStage> {
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
    }
  `

  const readmesByStage: GitHubResponse = await graphql(getReadmesByStage, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`
    }
  })

  const proposalsByStage = getProposalsByStage(readmesByStage)

  return proposalsByStage
}

function getProposalsByStage(readmesByStage: GitHubResponse): ProposalsByStage {
  const stages: Stage[] = ['stage0', 'stage1', 'stage2', 'stage3', 'stage4']

  return stages.reduce((proposalsByStage, stage) => {
    const stageReadmeKey: keyof GitHubResponse =
      stage === 'stage2' || stage === 'stage3' ? 'stage2And3' : stage

    const readme = readmesByStage[stageReadmeKey].object.text
    const lexer = new Lexer()
    const tokens = lexer.lex(readme)
    const tables = tokens.filter((token) => token.type === 'table')
    const table = (stage === 'stage2' ? tables[1] : tables[0]) as Tokens.Table
    const rows = table.tokens.cells

    const proposals = rows
      .map((row) => getProposalFromTableRow(row, stage))
      .filter((row) => row != null)

    return {
      ...proposalsByStage,
      [stage]: proposals
    }
  }, {}) as ProposalsByStage
}

function getProposalFromTableRow(row: Token[][], stage: Stage) {
  const [linksCol, authorsCol, championsCol, ...rest] = row

  const linkTokens = linksCol.filter(
    (col) => col.type === 'link'
  ) as Tokens.Link[]

  const authorTokens = authorsCol.filter(
    (col) => col.type === 'text'
  ) as Tokens.Text[]

  const championTokens = championsCol.filter(
    (col) => col.type === 'text'
  ) as Tokens.Text[]

  if (
    linkTokens.length === 0 ||
    authorTokens.length === 0 ||
    championTokens.length === 0
  ) {
    return null
  }

  const { text: name, href: link } = linkTokens[0]
  const authors = authorTokens.map((token) => token.text)
  const champions = championTokens.map((token) => token.text)

  const proposal: Proposal = {
    name,
    link,
    authors,
    champions
  }

  if (stage !== 'stage4') {
    const lastPresentedDateIndex = stage === 'stage3' ? 1 : 0

    const lastPresentedDate = rest[lastPresentedDateIndex].find(
      (token) => token.type === 'link'
    ) as Tokens.Link

    if (lastPresentedDate) {
      proposal.lastPresented = {
        date: lastPresentedDate.text,
        link: lastPresentedDate.href
      }
    }
  }

  return proposal
}
