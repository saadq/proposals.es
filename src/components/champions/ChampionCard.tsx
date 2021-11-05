import Link from 'next/link'
import styled from 'styled-components'

const ChampionLink = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  margin: 2rem auto;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.4s ease;
  box-shadow: 0px 8px 10px #e7f0f3;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.foreground};
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};

    .feather-star {
      fill: ${({ theme }) => theme.colors.foreground};
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
