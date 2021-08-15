import styled from 'styled-components'
import { SanitizedHtml } from '../common/SanitizedHtml'
import { Proposal } from '../../types'

const Card = styled.div<{ type: Proposal['type'] }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #393c48;
  margin: 0 auto;
  text-align: center;
  width: 100%;

  &:last-child {
    margin-bottom: 1rem;
  }

  code {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  a {
    color: ${({ theme }) => theme.colors.foreground};
    text-decoration: none;
  }
`

interface Props {
  proposal: Proposal
}

export function ProposalCard({ proposal }: Props) {
  const { type } = proposal

  return (
    <Card type={type}>
      <SanitizedHtml html={proposal.proposalHtml} />
    </Card>
  )
}
