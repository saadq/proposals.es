import { useCallback, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import Link from 'next/link'
import styled from 'styled-components'
import { ProposalCard } from '../proposals/ProposalCard'
import { Proposal, Stage } from '../../types'
import { formatStageName } from '../../utils/formatStageName'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const Card = styled.div<{ isExpanded: boolean }>`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.stageCard};
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: ${({ theme }) => theme.borders.card};
  border-radius: 4px;
  max-height: ${({ isExpanded }) => (isExpanded ? 'initial' : '32rem')};
`

const StickyContainer = styled.div`
  @media (max-width: 768px) {
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 999;
    background: ${({ theme }) => theme.colors.stageCard};
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
  color: ${({ theme }) => theme.colors.foreground};
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
    display: ${({ isExpanded }) => (isExpanded ? 'flex' : 'none')};
    flex-direction: column;
  }
`

const ExpanderButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.foreground};
  border-radius: 50px;
  color: ${({ theme }) => theme.colors.foreground};
  align-self: center;
  margin: 2.5rem 0;
  padding: 0.5rem;
  cursor: pointer;
  transition: 0.4s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.black};

    svg {
      fill: ${({ theme }) => theme.colors.black};
    }
  }

  svg {
    padding: 0;
  }
`

const DesktopExpanderButton = styled(ExpanderButton)`
  @media (max-width: 768px) {
    display: none;
  }
`

const MobileExpanderButton = styled(ExpanderButton)`
  @media (min-width: 768px) {
    display: none;
  }
`

interface Props {
  stage: Stage
  proposals: Proposal[]
  searchQuery?: string
  layout?: 'horizontal' | 'vertical'
}

export function StageWithProposals({ stage, proposals, searchQuery, layout }: Props) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isMobile = !!useMediaQuery('(max-width: 768px)')
  const isDesktop = !isMobile

  const handleExpandClick = useCallback(() => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded)
  }, [])

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
          <MobileExpanderButton>
            {isExpanded ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
          </MobileExpanderButton>
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
        <DesktopExpanderButton onClick={handleExpandClick}>
          {isExpanded ? <FaChevronUp size={24} /> : <FaChevronDown size={24} />}
        </DesktopExpanderButton>
      ) : null}
    </Card>
  )
}
