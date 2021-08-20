import { GetStaticPaths, GetStaticProps } from 'next'
import styled from 'styled-components'
import type { ParsedUrlQuery } from 'querystring'
import { Proposal, Stage, stages } from '../../types'
import { getAllProposalsByStage } from '../../api/proposals'
import { SanitizedHtml } from '../../components/common/SanitizedHtml'

const Container = styled.section`
  font-size: 1rem;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

interface Props {
  stageName: Stage
  proposal: Proposal
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

  return {
    props: {
      proposal,
      stageName: stageName as Stage
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

export default function ProposalDetailsPage({ proposal, stageName }: Props) {
  console.log({ proposal })
  return (
    <Container>
      <h1>
        <SanitizedHtml html={proposal.titleHtml} />
      </h1>
      <h2>Stage: {stageName}</h2>
      <p>
        <a href={proposal.link}>View proposal</a>
      </p>
      <>
        <h3>Authors:</h3>
        <SanitizedHtml html={proposal.authorsHtml} />
      </>
      <>
        <h3>Champions:</h3>
        <SanitizedHtml html={proposal.championsHtml} />
      </>
      {proposal.lastPresentedHtml && (
        <Row>
          <p>Last presented:</p>
          <SanitizedHtml html={proposal.lastPresentedHtml} />
        </Row>
      )}
    </Container>
  )
}
