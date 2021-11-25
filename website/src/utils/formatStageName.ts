import { Stage } from '../types'

export function formatStageName(stageName: Stage) {
  switch (stageName) {
    case 'inactive':
      return 'Inactive (Withdrawn)'

    case 'stage0':
      return 'Stage 0 (Strawperson)'

    case 'stage1':
      return 'Stage 1 (Proposal)'

    case 'stage2':
      return 'Stage 2 (Draft)'

    case 'stage3':
      return 'Stage 3 (Candidate)'

    case 'stage4':
      return 'Stage 4 (Finished)'
  }
}
