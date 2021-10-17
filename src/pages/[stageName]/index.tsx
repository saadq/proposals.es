import { GetStaticPaths, GetStaticProps } from 'next'
import type { ParsedUrlQuery } from 'querystring'
import { StageCard } from '../../components/proposals/StageCard'
import { Proposal, Stage, allStages } from '../../types'
import { getProposalsForStages } from '../../api/getProposalsForStages'

interface Props {
  stageName: Stage
  proposals: Proposal[]
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

  return {
    props: {
      stageName: stageName as Stage,
      proposals: proposalsByStage[stageName] as Proposal[]
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

export default function ProposalDetailsPage({ stageName, proposals }: Props) {
  return <StageCard stage={stageName} proposals={proposals} />
}
