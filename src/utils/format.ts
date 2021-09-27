import { Stage } from '../types'

export function formatStageName(stageName: Stage) {
  if (stageName === 'inactive') {
    return 'Inactive'
  }

  if (stageName === 'stage4') {
    return 'Stage 4 (Finished)'
  }

  return `Stage ${stageName.split('stage')[1]}`
}
