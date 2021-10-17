import marked from 'marked'
import { CheerioAPI, load } from 'cheerio'
import { ActiveStage, Proposal, ProposalsByStage, Stage, stages } from '../types'
import { ReadmesByStage, ResponseKey } from '../types/response'

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

export function parseProposalsFromReadmes(
  allReadmesByStage: ReadmesByStage
): ProposalsByStage {
  return stages.reduce((proposalsByStage, stage) => {
    if (stage === 'inactive') {
      return {
        ...proposalsByStage,
        inactive: parseReadme(allReadmesByStage.inactive, stage)
      }
    }

    const ecma262Readme = allReadmesByStage[stageKeyMap[stage]]
    const ecma402Readme = allReadmesByStage[i18nStageKeyMap[stage]]

    const proposals = [
      ...parseReadme(ecma262Readme, stage),
      ...parseReadme(ecma402Readme, stage, true)
    ]

    return {
      ...proposalsByStage,
      [stage]: proposals
    }
  }, {}) as ProposalsByStage
}

function parseReadme(readme: string, stage: Stage, isI18n?: boolean): Proposal[] {
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
        const title = getTextListFromCell($, titleHtml)[0]
        const champions = getTextListFromCell($, championsHtml)

        const proposal: Proposal = {
          type: 'inactive',
          link: proposalLink.attr('href') ?? '',
          titleHtml: hasLink ? (proposalLink.html() as string) : titleHtml ?? '',
          title,
          champions,
          rationaleHtml
        }

        return proposal
      }

      const title = getTextListFromCell($, colVals[0])[0]
      const authors = getTextListFromCell($, colVals[1]).filter(Boolean)
      const champions = getTextListFromCell($, colVals[2]).filter(Boolean)

      const proposal: Proposal = {
        type: isI18n ? 'ecma402' : 'ecma262',
        link: proposalLink.attr('href') ?? '',
        titleHtml: hasLink ? (proposalLink.html() as string) : colVals[0] ?? '',
        title,
        authors,
        champions
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

function getTextListFromCell($: CheerioAPI, cell: string) {
  return cell.split('<br>').map((item) => $(item).text() || item)
}
