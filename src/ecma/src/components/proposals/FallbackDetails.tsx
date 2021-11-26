import styled from 'styled-components'
import { Proposal } from '../../types'
import { SanitizedHtml, Heading } from '../common'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 1rem;

  h1 {
    margin: 0;
    font-size: 2.5rem;
  }
`

interface Props {
  proposal: Proposal
}

export function FallbackDetails({ proposal }: Props) {
  return (
    <Wrapper>
      <Heading>
        <SanitizedHtml html={proposal.titleHtml} />
      </Heading>
      {proposal.link ? (
        <p>
          This proposal is not on GitHub. You can view the proposal directly{' '}
          <a href={proposal.link}>here</a> if the iframe fails to load.
        </p>
      ) : (
        <p>This proposal currently is not available on GitHub or anywhere else.</p>
      )}
    </Wrapper>
  )
}
