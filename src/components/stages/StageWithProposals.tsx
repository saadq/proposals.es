import { useCallback, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { ProposalCard } from '../proposals/ProposalCard'
import { Proposal, Stage } from '../../types'
import { formatStageName } from '../../utils/formatStageName'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const Card = styled.div<{ isExpanded: boolean }>`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.stageCard};
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: ${({ theme }) => theme.borders.card};
  border-radius: 4px;
  max-height: ${({ isExpanded }) => (isExpanded ? document.body.scrollHeight : '32rem')};
`

const Heading = styled.h2`
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.heading};
  cursor: pointer;
  text-decoration: underline;
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0;
  padding: 1.5rem 2.5rem;
  transition: color 0.2s ease-in-out;
  scroll-margin: 1rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const ProposalsContainer = styled.div<{ layout?: 'horizontal' | 'vertical' }>`
  padding: 1.5rem 2.5rem;
  gap: 2rem;
  flex: 1;
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
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

interface Props {
  stage: Stage
  proposals: Proposal[]
  searchQuery?: string
  layout?: 'horizontal' | 'vertical'
}

export function StageWithProposals({ stage, proposals, searchQuery, layout }: Props) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleExpandClick = useCallback(() => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded)
  }, [])

  const proposalsToShow = proposals
    .sort((a, b) => (b?.stars ?? 0) - (a?.stars ?? 0))
    .filter((proposal) =>
      !searchQuery || searchQuery.trim().length < 1
        ? true
        : proposal.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
    )

  return proposalsToShow.length === 0 ? null : (
    <Card isExpanded={isExpanded || !!searchQuery?.trim()}>
      <Link href={`/stages/${stage}`} passHref>
        <a>
          <Heading>{formatStageName(stage)}</Heading>
        </a>
      </Link>
      <ProposalsContainer layout={layout}>
        {proposalsToShow.map((proposal, i) => (
          <ProposalCard
            stage={stage}
            proposal={proposal}
            key={proposal.title}
            layout={layout}
          />
        ))}
      </ProposalsContainer>
      {!searchQuery?.trim() ? (
        <ExpanderButton onClick={handleExpandClick}>
          {isExpanded ? <FaChevronUp size={24} /> : <FaChevronDown size={24} />}
        </ExpanderButton>
      ) : null}
    </Card>
  )
}
