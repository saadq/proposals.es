import Link from 'next/link'
import styled from 'styled-components'
import { ProposalCard } from '../proposals/ProposalCard'
import { Proposal, Stage } from '../../types'
import { formatStageName } from '../../utils/formatStageName'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.stageCard};
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: ${({ theme }) => theme.borders.card};
  border-radius: 4px;
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

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const ProposalsContainer = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.5rem 2.5rem;
  gap: 2rem;
  flex: 1;
  display: flex;
  overflow: scroll;
`

interface Props {
  stage: Stage
  proposals: Proposal[]
  searchQuery?: string
}

export function StageWithProposals({ stage, proposals, searchQuery }: Props) {
  const proposalsToShow = proposals
    .sort((a, b) => (b?.stars ?? 0) - (a?.stars ?? 0))
    .filter((proposal) =>
      !searchQuery || searchQuery.trim().length < 1
        ? true
        : proposal.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
    )

  return proposalsToShow.length === 0 ? null : (
    <Card>
      <Link href={`/stages/${stage}`} passHref>
        <a>
          <Heading>{formatStageName(stage)}</Heading>
        </a>
      </Link>
      <ProposalsContainer>
        {proposalsToShow.map((proposal, i) => (
          <ProposalCard
            stage={stage}
            proposal={proposal}
            index={i}
            key={proposal.title}
          />
        ))}
      </ProposalsContainer>
    </Card>
  )
}
