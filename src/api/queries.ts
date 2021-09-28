import { Proposal } from '../types'
import {
  getGitHubDetails,
  getGithubProposalKey,
  isGithubProposal
} from '../utils/github'

export const getReadmesByStageQuery = `
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

export function buildGetStarsQuery(allProposals: Proposal[]): string {
  const getStarsQuery = `
    query {
      ${allProposals.filter(isGithubProposal).map((proposal) => {
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
      })}
    }
  `

  return getStarsQuery
}
