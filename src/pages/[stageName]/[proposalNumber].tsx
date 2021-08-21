import { GetStaticPaths, GetStaticProps } from 'next'
import type { ParsedUrlQuery } from 'querystring'
import { Proposal, Stage, stages } from '../../types'
import { getAllProposalsByStage } from '../../api/getAllProposalsByStage'
import { ProposalDetails } from '../../components/proposals/ProposalDetails'
import { getReadmeForProposal } from '../../api/getReadmeForProposal'

interface Props {
  stageName: Stage
  proposal: Proposal
  readme: string
}

interface Params extends ParsedUrlQuery {
  stageName: Stage
  proposalNumber: string
}

interface Path {
  params: Params
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params
}) => {
  const { stageName, proposalNumber } = params ?? {}
  const allProposalsByStage = await getAllProposalsByStage()
  const proposals = allProposalsByStage[stageName as Stage]
  const proposal = proposals[Number(proposalNumber)]
  const readme = await getReadmeForProposal(proposal)

  return {
    props: {
      stageName: stageName as Stage,
      proposal,
      readme
    },
    revalidate: 10
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async (context) => {
  const allProposalsByStage = await getAllProposalsByStage()

  const paths = stages.reduce((paths, stage) => {
    const proposals = allProposalsByStage[stage]
    const proposalPaths = proposals.map((_, i) => ({
      params: {
        stageName: stage,
        proposalNumber: i.toString()
      }
    }))

    return [...paths, ...proposalPaths]
  }, [] as Path[])

  return {
    paths,
    fallback: false
  }
}

export default function ProposalDetailsPage({
  proposal,
  stageName,
  readme
}: Props) {
  return (
    <ProposalDetails proposal={proposal} stage={stageName} readme={readme} />
  )
}
