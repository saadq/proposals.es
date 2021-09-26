import styled from 'styled-components'
import { ProposalCard } from './ProposalCard'
import { Proposal, Stage } from '../../types'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  height: 25rem;
  box-shadow: 0px 2px 8px #e7f0f3;
`

const Heading = styled.h2`
  color: ${({ theme }) => theme.colors.black};
  font-size: 1.25rem;
  font-weight: 800;
  background: ${({ theme }) => theme.colors.card};
  margin: 0;
  padding: 1.5rem 2.5rem;
`

const ProposalsContainer = styled.div`
  padding: 1.5rem 2.5rem;
  gap: 2rem;
  flex: 1;
  display: flex;
  overflow: scroll;
`

function formatStageName(stageName: Stage) {
  if (stageName === 'inactive') {
    return 'Inactive'
  }

  if (stageName === 'stage4') {
    return 'Stage 4 (Finished)'
  }

  return `Stage ${stageName.split('stage')[1]}`
}

interface Props {
  stage: Stage
  proposals: Proposal[]
  searchQuery: string
}

export function StageCard({ stage, proposals, searchQuery }: Props) {
  const proposalsToShow = proposals
    .sort((a, b) => (b?.stars ?? 0) - (a?.stars ?? 0))
    .filter((proposal) =>
      searchQuery.length < 2
        ? true
        : proposal.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

  return proposalsToShow.length === 0 ? null : (
    <Card>
      <Heading>{formatStageName(stage)}</Heading>
      <ProposalsContainer>
        {proposals
          .sort((a, b) => (b?.stars ?? 0) - (a?.stars ?? 0))
          .filter((proposal) =>
            searchQuery.length < 2
              ? true
              : proposal.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((proposal, i) => (
            <ProposalCard
              stage={stage}
              proposal={proposal}
              index={i}
              key={`${stage}-proposal-${i}`}
            />
          ))}
      </ProposalsContainer>
    </Card>
  )
}
