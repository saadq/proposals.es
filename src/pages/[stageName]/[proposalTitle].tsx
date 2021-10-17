import { GetStaticPaths, GetStaticProps } from 'next'
import type { ParsedUrlQuery } from 'querystring'
import { Proposal, Stage, allStages } from '../../types'
import { getProposalsForStages } from '../../api/getProposalsForStages'
import { ProposalDetails } from '../../components/proposals/ProposalDetails'
import { getReadmeForProposal } from '../../api/getReadmeForProposal'
import { getRepoDetailsForProposal } from '../../api/getRepoDetailsForProposal'
import { isGithubProposal } from '../../utils/github'

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
  const stageName = params?.stageName as Stage
  const proposalTitle = params?.proposalTitle as string
  const proposalsByStage = await getProposalsForStages({ stages: [stageName] })
  const proposals = proposalsByStage[stageName] as Proposal[]
  const proposal = proposals.find((p) => p.title === proposalTitle) as Proposal
  const readme = await getReadmeForProposal(proposal)

  const proposalWithRepoDetails = isGithubProposal(proposal)
    ? { ...proposal, ...(await getRepoDetailsForProposal(proposal)) }
    : proposal

  return {
    props: {
      stageName: stageName as Stage,
      proposal: proposalWithRepoDetails,
      readme
    }
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const allProposalsByStage = await getProposalsForStages({
    stages: allStages,
    includeRepoDetails: true
  })

  const paths = allStages.reduce((paths, stageName) => {
    const proposals = allProposalsByStage[stageName] as Proposal[]
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
