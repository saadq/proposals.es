import { GetStaticPaths, GetStaticProps } from 'next'
import styled from 'styled-components'
import type { ParsedUrlQuery } from 'querystring'
import { StageCard } from '../../components/proposals/StageCard'
import { Proposal, Stage, allStages } from '../../types'
import { getProposalsForStages } from '../../api/getProposalsForStages'
import { getTc39Process, Tc39Process } from '../../api/getTc39Process'
import { SanitizedHtml } from '../../components/common/SanitizedHtml'
import { Breadcrumbs } from '../../components/common/Breadcrumbs'
import { formatStageName } from '../../utils/formatStageName'

interface Props {
  stageName: Stage
  proposals: Proposal[]
  tc39Process: Tc39Process
}

interface Params extends ParsedUrlQuery {
  stageName: Stage
}

interface Path {
  params: Params
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const stageName = params?.stageName as Stage
  const proposalsByStage = await getProposalsForStages({
    stages: [stageName],
    includeRepoDetails: true
  })

  const tc39Process = await getTc39Process()

  return {
    props: {
      stageName: stageName as Stage,
      proposals: proposalsByStage[stageName] as Proposal[],
      tc39Process: tc39Process
    }
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const stagePaths: Path[] = allStages.map((stageName) => ({
    params: {
      stageName
    }
  }))

  return {
    paths: stagePaths,
    fallback: false
  }
}

const SummaryParagraph = styled(SanitizedHtml)`
  margin: 1rem 0;

  &:first-child {
    margin: 0;
  }
`

export default function StagesPage({ stageName, proposals, tc39Process }: Props) {
  const breadcrumbs = [
    {
      label: 'Stages',
      link: '/stages'
    },
    {
      label: formatStageName(stageName),
      link: `/stages/${stageName}`
    }
  ]

  return (
    <>
      <Breadcrumbs crumbs={breadcrumbs} />
      {tc39Process.summaryParagraphs.map((paragraph, i) => (
        <SummaryParagraph key={`process-summary-paragraph-${i}`} html={paragraph} />
      ))}
      <StageCard stage={stageName} proposals={proposals} />
    </>
  )
}
