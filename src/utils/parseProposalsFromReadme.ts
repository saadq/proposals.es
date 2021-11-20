import { CheerioAPI, load } from 'cheerio'
import marked from 'marked'
import { ActiveStage, Proposal, ProposalsByStage, Stage } from '../types'
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

// Some of the proposals have different variations for the same champion name in the readmes.
const championNameMap: Record<string, string> = {
  'Frank Tang': 'Frank Yung-Fong Tang',
  FrankYFTang: 'Frank Yung-Fong Tang',
  'Lars Hansen': 'Lars T Hansen',
  'Mark Miller': 'Mark S. Miller',
  'Sebastian Markbage': 'Sebastian Markbåge'
}

export function parseProposalsFromReadmes(
  stages: readonly Stage[],
  allReadmesByStage: Partial<ReadmesByStage>
): Partial<ProposalsByStage> {
  return stages.reduce((proposalsByStage, stage) => {
    if (stage === 'inactive') {
      return {
        ...proposalsByStage,
        inactive: parseReadme(allReadmesByStage.inactive as string, stage)
      }
    }

    const ecma262Readme = allReadmesByStage[stageKeyMap[stage]]
    const ecma402Readme = allReadmesByStage[i18nStageKeyMap[stage]]

    const proposals = [
      ...parseReadme(ecma262Readme as string, stage),
      ...parseReadme(ecma402Readme as string, stage, true)
    ]

    return {
      ...proposalsByStage,
      [stage]: proposals
    }
  }, {}) as Partial<ProposalsByStage>
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
        const title = getProposalTitle($, titleHtml)
        const champions = getChampionNames($, championsHtml)

        const proposal: Proposal = {
          stage,
          type: 'inactive',
          link: proposalLink.attr('href') ?? '',
          titleHtml: hasLink ? (proposalLink.html() as string) : titleHtml ?? '',
          title,
          champions,
          rationaleHtml
        }

        return proposal
      }

      const title = getProposalTitle($, colVals[0])
      const authors = getChampionNames($, colVals[1])
      const champions = getChampionNames($, colVals[2])

      const proposal: Proposal = {
        stage,
        type: isI18n ? 'ecma-402' : 'ecma-262',
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

function getProposalTitle($: CheerioAPI, cell: string) {
  const titleList = getTextListFromCell($, cell, parseProposalTitleText)
  return titleList[0]
}

function getChampionNames($: CheerioAPI, cell: string) {
  const championNames = getTextListFromCell($, cell, parseChampionText)
  const normalizedChampionNames = championNames.map(
    (championName) => championNameMap[championName] ?? championName
  )
  return normalizedChampionNames
}

function getTextListFromCell(
  $: CheerioAPI,
  cell: string,
  mapper: ($: CheerioAPI, item: string) => string | string[]
) {
  return cell
    .split('<br>')
    .map((item: string) => mapper($, item))
    .filter(Boolean)
    .flat()
}

function parseProposalTitleText($: CheerioAPI, item: string) {
  const text = $(item).text() || item
  return text.replace(/&nbsp;/gi, '').trim()
}

function parseChampionText($: CheerioAPI, item: string) {
  const text = ($(item).text() || item).replace(/&nbsp;/gi, '').trim()
  const textWithoutParens = text.includes('(') ? text.slice(0, text.indexOf('(')) : text
  const textList = textWithoutParens.includes(',')
    ? textWithoutParens.split(',').map((text) => text.trim())
    : textWithoutParens.trim()

  return textList
}
