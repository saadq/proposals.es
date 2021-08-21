import styled from 'styled-components'
import { SanitizedHtml } from '../common/SanitizedHtml'
import { Proposal, Stage } from '../../types'

const Container = styled.section`
  font-size: 1rem;
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
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
      <h1>
        <SanitizedHtml html={proposal.titleHtml} />
      </h1>
      <h2>Stage: {stage}</h2>
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
      <hr />
      {readme && <SanitizedHtml html={readme} />}
    </Container>
  )
}
