import Link from 'next/link'
import styled from 'styled-components'
import { SanitizedHtml } from '../common/SanitizedHtml'
import { Proposal, Stage } from '../../types'
import { StarIcon } from '../common/StarIcon'
import { FC, memo } from 'react'

const CardLink = styled.a`
  color: var(--foreground);
  text-decoration: none;
  background: var(--card-color);
  box-shadow: var(--card-shadow);
  border: var(--card-border);
  border-radius: 4px;
  padding: 2rem 2rem;
  justify-content: center;
  align-items: center;
  display: flex;
  max-width: 25rem;
  flex: 1 0 calc(25% - 4rem); /* 5 columns - padding */
  transition: background-color 0.4s ease, color 0.4s ease;
  position: relative;

  @media (max-width: 768px) {
    max-width: initial;
  }

  svg {
    transition: fill 0.4s ease;
  }

  &:hover {
    background: var(--primary);
    border: 1px solid var(--primary);
    color: var(--black);

    svg {
      fill: var(--black);
    }
  }
`

const CardContent = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-overflow: ellipsis;
  overflow: visible;
  cursor: pointer;
  min-width: 8rem;
  font-weight: bold;

  code {
    font-size: 0.95rem;
  }
`

const Stars = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    fill: var(--primary);
  }
`

const StarsCount = styled.span`
  font-size: 0.8rem;
`

const ProposalTitle = styled.strong`
  word-break: break-all;
`

// Handle weird edge case proposals that are just big blobs of text/placeholders/combinations of proposals
// TODO: Split combined proposals (the Class Fields proposal card) into individual proposals
const nonsenseProposals = ['Annex B', '(repo link TBD)', 'Class Fields (']

interface Props {
  stage: Stage
  proposal: Proposal
  layout?: 'horizontal' | 'vertical'
}

export const ProposalCard: FC<Props> = memo(({ stage, proposal, layout }) => {
  if (nonsenseProposals.some((badProposal) => proposal.title.includes(badProposal))) {
    return null
  }

  return (
    <Link
      passHref
      href={`/proposals/${encodeURIComponent(proposal.title)}`}
      key={`${proposal.title}-link`}
    >
      <CardLink>
        <CardContent>
          <ProposalTitle>
            <SanitizedHtml html={proposal.titleHtml} />
          </ProposalTitle>
          {proposal.stars != null ? (
            <Stars>
              <StarIcon />
              <StarsCount>{proposal.stars}</StarsCount>
            </Stars>
          ) : null}
        </CardContent>
      </CardLink>
    </Link>
  )
})
