import { GetStaticPaths, GetStaticProps } from 'next'
import type { ParsedUrlQuery } from 'querystring'
import { Proposal, allStages } from '../../types'
import { getProposalsForStages } from '../../api/getProposalsForStages'
import { ProposalDetails } from '../../components/proposals/ProposalDetails'
import { getReadmeForProposal } from '../../api/getReadmeForProposal'
import { getRepoDetailsForProposal } from '../../api/getRepoDetailsForProposal'
import { isGithubProposal } from '../../utils/github'

interface Props {
  proposal: Proposal
  readme: string
}

interface Params extends ParsedUrlQuery {
  proposalTitle: string
}

interface Path {
  params: Params
}

export const getStaticProps: GetStaticProps<Partial<Props>, Params> = async ({
  params
}) => {
  const proposalTitle = params?.proposalTitle as string
  const proposalsByStage = await getProposalsForStages({ stages: allStages })
  const proposals = Object.values(proposalsByStage).flat()
  const proposal = proposals.find((p) => p.title === proposalTitle) as Proposal

  if (!proposal) {
    return {
      redirect: { destination: '/404' },
      props: {}
    }
  }

  const readme = await getReadmeForProposal(proposal)

  const proposalWithRepoDetails = isGithubProposal(proposal)
    ? { ...proposal, ...(await getRepoDetailsForProposal(proposal)) }
    : proposal

  return {
    props: {
      proposal: proposalWithRepoDetails,
      readme
    }
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const allProposalsByStage = await getProposalsForStages({ stages: allStages })

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
    fallback: 'blocking'
  }
}

export default function ProposalDetailsPage({ proposal, readme }: Props) {
  return <ProposalDetails proposal={proposal} readme={readme} />
}
