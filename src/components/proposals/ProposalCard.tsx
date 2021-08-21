import Link from 'next/link'
import styled from 'styled-components'
import { SanitizedHtml } from '../common/SanitizedHtml'
import { Proposal, Stage } from '../../types'

const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.foreground};
  text-decoration: none;
`

const Card = styled.div<{ type: Proposal['type'] }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #393c48;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  width: 100%;
  cursor: pointer;
  transition: background color 0.4s ease;
  transition-property: color, background-color;
  transition-duration: 0.4s;
  transition-timing-function: ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: black;
  }

  &:last-child {
    margin-bottom: 1rem;
  }

  code {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

interface Props {
  stage: Stage
  proposal: Proposal
  index: number
}

export function ProposalCard({ stage, proposal, index }: Props) {
  const { type } = proposal

  // TODO: Remove this when the multi-proposal edge case is handled.
  // Some proposals in the readmes can have multiple proposals in a single column (e.g. "Class Fields")
  if (proposal.titleHtml.includes('Class Fields')) {
    return null
  }

  return (
    <Link
      passHref
      href={`/${stage}/${index}`}
      key={`${stage}-proposal-${index}`}
    >
      <StyledLink>
        <Card type={type}>
          <SanitizedHtml html={proposal.titleHtml} />
        </Card>
      </StyledLink>
    </Link>
  )
}
