import Link from 'next/link'
import styled from 'styled-components'

const ChampionLink = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  margin: 2rem auto;
  background: var(--stage-card-color);
  box-shadow: var(--card-shadow);
  border: var(--card-border);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.4s ease;
  font-weight: 800;
  color: var(--foreground);
  text-decoration: none;

  &:hover {
    background: var(--primary);
    color: var(--black);

    .feather-star {
      fill: var(--foreground);
    }
  }
`

const ChampionName = styled.span``

const ProposalCountBadge = styled.div``

interface Props {
  name: string
  proposalCount: number
}

export function ChampionCard({ name, proposalCount }: Props) {
  return (
    <Link href={`/champions/${encodeURIComponent(name)}`} passHref>
      <ChampionLink>
        <ChampionName>{name}</ChampionName>
        <ProposalCountBadge>
          {proposalCount} {proposalCount === 1 ? 'Proposal' : 'Proposals'}
        </ProposalCountBadge>
      </ChampionLink>
    </Link>
  )
}
