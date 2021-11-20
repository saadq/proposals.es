import { useCallback } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import Link from 'next/link'
import styled from 'styled-components'
import { useExpandedStages } from '../../hooks/useExpandedStages'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { Proposal, Stage } from '../../types'
import { formatStageName } from '../../utils/formatStageName'
import { ProposalCard } from '../proposals/ProposalCard'

const Card = styled.div<{ isExpanded: boolean }>`
  display: flex;
  flex-direction: column;
  background: var(--stage-card-color);
  box-shadow: var(--card-shadow);
  border: var(--card-border);
  border-radius: 4px;
  max-height: ${({ isExpanded }) => (isExpanded ? 'initial' : '32rem')};
`

const StickyContainer = styled.div`
  @media (max-width: 768px) {
    z-index: 5;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 5;
    background: var(--stage-card-color);
    text-align: center;
    gap: 3rem;
  }
`

const StageHeading = styled.h2`
  padding: 1.5rem 2.5rem;
  margin: 0;

  @media (max-width: 768px) {
    padding: 0;
  }
`

const HeadingLink = styled.a`
  font-size: 0.85rem;
  color: var(--foreground);
`

const ProposalsContainer = styled.div<{ isExpanded?: boolean }>`
  padding: 1.5rem 2.5rem;
  gap: 2rem;
  flex: 1;
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    padding: 1.5rem;
    flex-direction: column;
    flex-wrap: nowrap;
    max-height: ${({ isExpanded }) => (isExpanded ? 'initial' : '0')};
    padding: ${({ isExpanded }) => (isExpanded ? '1.5rem' : '0')};
  }
`

const ExpanderButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: 2px solid var(--foreground);
  border-radius: 50px;
  color: var(--foreground);
  align-self: center;
  margin: 2.5rem 0;
  padding: 0.5rem;
  cursor: pointer;
  transition: 0.4s ease;

  &:hover {
    background: var(--primary);
    border-color: var(--black);

    svg {
      fill: var(--black);
    }
  }

  svg {
    padding: 0;
  }
`

interface Props {
  stage: Stage
  proposals: Proposal[]
  searchQuery?: string
  layout?: 'horizontal' | 'vertical'
}

export function StageWithProposals({ stage, proposals, searchQuery, layout }: Props) {
  const { expandedStages, setExpandedStages } = useExpandedStages()
  const isExpanded = expandedStages.includes(stage) || !!searchQuery?.trim()
  const isMobile = !!useMediaQuery('(max-width: 768px)')
  const isDesktop = !isMobile

  const handleExpandClick = useCallback(() => {
    setExpandedStages((prevExpandedStages) => {
      if (prevExpandedStages.includes(stage)) {
        return expandedStages.filter((currStage) => currStage !== stage)
      } else {
        return [...prevExpandedStages, stage]
      }
    })
  }, [expandedStages, setExpandedStages, stage])

  const handleMobileClick = useCallback(() => {
    if (isMobile) {
      handleExpandClick()
    }
  }, [isMobile, handleExpandClick])

  const proposalsToShow = proposals
    .sort((a, b) => (b?.stars ?? 0) - (a?.stars ?? 0))
    .filter((proposal) =>
      !searchQuery || searchQuery.trim().length < 1
        ? true
        : proposal.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
    )

  return proposalsToShow.length === 0 ? null : (
    <Card isExpanded={isExpanded || !!searchQuery?.trim()}>
      <StickyContainer onClick={handleMobileClick}>
        <Link href={`/stages/${stage}`} passHref>
          <HeadingLink>
            <StageHeading>{formatStageName(stage)}</StageHeading>
          </HeadingLink>
        </Link>
        {isMobile ? (
          <ExpanderButton>
            {isExpanded ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
          </ExpanderButton>
        ) : null}
      </StickyContainer>
      <ProposalsContainer isExpanded={isExpanded}>
        {proposalsToShow.map((proposal, i) => (
          <ProposalCard
            stage={stage}
            proposal={proposal}
            key={proposal.title}
            layout={layout}
          />
        ))}
      </ProposalsContainer>
      {isDesktop && !searchQuery?.trim() ? (
        <ExpanderButton onClick={handleExpandClick}>
          {isExpanded ? <FaChevronUp size={24} /> : <FaChevronDown size={24} />}
        </ExpanderButton>
      ) : null}
    </Card>
  )
}
