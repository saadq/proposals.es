import Link from 'next/link'
import styled from 'styled-components'
import { SanitizedHtml } from '../common/SanitizedHtml'
import { Proposal, Stage } from '../../types'

const Container = styled.section`
  font-size: 1rem;
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
`

const BackLink = styled.a`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.black};
  border: 0;
  border-radius: 3px;
  padding: 1rem 1.5rem;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  font-size: 0.85rem;
  display: inline-block;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

interface Props {
  proposal: Proposal
  stage: Stage
  readme: string
}

export function ProposalDetails({ proposal, stage, readme }: Props) {
  return (
    <Container>
      <Link href="/" passHref>
        <BackLink>Go Back</BackLink>
      </Link>
      <>
        <h3>Authors:</h3>
        {proposal.authors?.join(', ')}
      </>
      <>
        <h3>Champions:</h3>
        {proposal.champions?.join(', ')}
      </>
      {readme ? (
        <>
          <p>
            <a href={proposal.link}>View proposal</a>
          </p>
          <SanitizedHtml html={readme} />
        </>
      ) : (
        <>
          <h1>
            <SanitizedHtml html={proposal.titleHtml} />
          </h1>
          <h2>Stage: {stage}</h2>
          {proposal.lastPresentedHtml && (
            <Row>
              <p>Last presented:</p>
              <SanitizedHtml html={proposal.lastPresentedHtml} />
            </Row>
          )}
          {proposal.rationaleHtml && (
            <Row>
              <p>Rationale:</p>
              <SanitizedHtml html={proposal.rationaleHtml} />
            </Row>
          )}
          <p>
            <a href={proposal.link}>View proposal</a>
          </p>
        </>
      )}
    </Container>
  )
}
