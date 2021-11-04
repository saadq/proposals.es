import { Proposal, Stage } from '../types'

export function formatStageName(stageName: Stage) {
  if (stageName === 'inactive') {
    return 'Inactive'
  }

  if (stageName === 'stage4') {
    return 'Stage 4 (Finished)'
  }

  return `Stage ${stageName.split('stage')[1]}`
}

export function formatProposalType(type: Proposal['type']) {
  if (type === 'ecma262') {
    return 'ECMA-262'
  }

  if (type === 'ecma402') {
    return 'ECMA-402'
  }

  return 'Inactive'
}
