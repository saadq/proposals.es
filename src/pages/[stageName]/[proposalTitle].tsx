import { GetStaticPaths, GetStaticProps } from 'next'
import type { ParsedUrlQuery } from 'querystring'
import { Proposal, Stage, allStages } from '../../types'
import { getProposalsForStages } from '../../api/getAllProposalsByStage'
import { ProposalDetails } from '../../components/proposals/ProposalDetails'
import { getReadmeForProposal } from '../../api/getReadmeForProposal'

interface Props {
  stageName: Stage
  proposal: Proposal
  readme: string
}

interface Params extends ParsedUrlQuery {
  stageName: Stage
  proposalTitle: string
}

interface Path {
  params: Params
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const { stageName, proposalTitle } = params ?? {}
  const proposalsByStage = await getProposalsForStages([stageName as Stage])
  const proposals = proposalsByStage[stageName as Stage]

  const proposal = proposals.find(
    (proposal) => proposal.title === proposalTitle
  ) as Proposal

  const readme = await getReadmeForProposal(proposal)

  return {
    props: {
      stageName: stageName as Stage,
      proposal,
      readme
    }
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async (context) => {
  const allProposalsByStage = await getProposalsForStages(allStages)

  const paths = allStages.reduce((paths, stageName) => {
    const proposals = allProposalsByStage[stageName]
    const proposalPaths = proposals.map((proposal) => ({
      params: {
        stageName: stageName,
        proposalTitle: proposal.title
      }
    }))

    return [...paths, ...proposalPaths]
  }, [] as Path[])

  return {
    paths,
    fallback: false
  }
}

export default function ProposalDetailsPage({ proposal, stageName, readme }: Props) {
  return <ProposalDetails proposal={proposal} stage={stageName} readme={readme} />
}
