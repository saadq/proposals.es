import Link from 'next/link'
import styled from 'styled-components'
import { SanitizedHtml } from '../common/SanitizedHtml'
import { Proposal, Stage } from '../../types'
import { StarIcon } from '../common/icons/StarIcon'
import { FC, memo } from 'react'

const CardLink = styled.a`
  color: ${({ theme }) => theme.colors.foreground};
  text-decoration: none;
  background: ${({ theme }) => theme.colors.card};
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: ${({ theme }) => theme.borders.card};
  border-radius: 4px;
  padding: 2rem 2rem;
  justify-content: center;
  align-items: center;
  display: flex;
  max-width: 25rem;
  flex: 1 0 calc(25% - 4rem); /* 5 columns - padding */
  transition: background-color 0.4s ease, color 0.4s ease;
  position: relative;

  .feather-star {
    transition: fill 0.4s ease;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.black};

    .feather-star {
      fill: ${({ theme }) => theme.colors.black};
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
