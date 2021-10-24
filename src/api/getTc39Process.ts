import { load } from 'cheerio'
import { ActiveStage, Stage } from '../types'
import { avoidRateLimit } from '../utils/avoidRateLimit'

export interface StageProcess {
  stage: Stage
  purpose: string
  entranceCriteria: string
  acceptanceSignifies: string
  specQuality: string
  postAcceptanceChangesExpected: string
  implementationTypesExpected: string
}

type ProcessByStage = Record<ActiveStage, StageProcess>

export interface Tc39Process {
  processLink: string
  summaryParagraphs: string[]
  processByStage: Record<ActiveStage, StageProcess>
}

export async function getTc39Process(): Promise<Tc39Process> {
  await avoidRateLimit()

  const endpoint = 'https://tc39.es/process-document/'
  const response = await fetch(endpoint)
  const html = await response.text()
  const $ = load(html)

  const summaryParagraphs = $('h1')
    .nextUntil('table', 'p')
    .map((_, el) => $(el).html())
    .toArray()

  const table = $('table')
  const rows = $('tbody tr', table)

  const processes: StageProcess[] = rows
    .map((_, element) => {
      const row = $(element, rows)
      const cols = $('td', row)
      const colVals = cols.map((_, element) => $(element, cols).html())
      const [
        stageNum,
        purpose,
        entranceCriteria,
        acceptanceSignifies,
        specQuality,
        postAcceptanceChangesExpected,
        implementationTypesExpected
      ] = colVals

      const stage = `stage${stageNum.slice(0, stageNum.indexOf('\n'))}` as Stage

      const detailsByStage: StageProcess = {
        stage,
        purpose,
        entranceCriteria,
        acceptanceSignifies,
        specQuality,
        postAcceptanceChangesExpected,
        implementationTypesExpected
      }

      return detailsByStage
    })
    .toArray()

  const processByStage = processes.reduce(
    (processesByStage, process) => ({
      ...processesByStage,
      [process.stage]: process
    }),
    {} as ProcessByStage
  )

  const tc39Process: Tc39Process = {
    summaryParagraphs,
    processLink: endpoint,
    processByStage
  }

  return tc39Process
}
