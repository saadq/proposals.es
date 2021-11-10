import Link from 'next/link'
import styled from 'styled-components'
import { SanitizedHtml } from '../common/SanitizedHtml'
import { StarIcon } from '../common/icons/StarIcon'
import { ChampionedProposal } from '../../api/getAllChampions'
import { AwardIcon, PenIcon } from '../common/'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const ProposalLink = styled.a`
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

const Badges = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`

const Badge = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.25rem;

  span {
    font-size: 0.9rem;
  }
`

const ChampionBadge = styled(Badge)`
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;

  @media (max-width: 768px) {
    display: none;
  }
`

const StarsBadge = styled(Badge)`
  .feather-star {
    transition: fill 0.4s ease;
    align-self: center;
  }
`

type Badge = 'stars' | 'author' | 'champion'

interface Props {
  proposals: ChampionedProposal[]
  badges?: Badge[]
  searchQuery?: string
}

export function ProposalList({ proposals, badges, searchQuery }: Props) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isDesktop = !isMobile && isMobile != null

  const proposalsToShow = proposals
    .sort((a, b) => (b?.stars ?? 0) - (a?.stars ?? 0))
    .filter((proposal) =>
      !searchQuery || searchQuery.trim().length < 1
        ? true
        : proposal.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

  return (
    <>
      <ul>
        {proposalsToShow.map((proposal) => (
          <li key={proposal.title}>
            <Link href={`/proposals/${encodeURIComponent(proposal.title)}`} passHref>
              <ProposalLink>
                <SanitizedHtml html={proposal.titleHtml} />
                <Badges>
                  {isDesktop && badges?.includes('author') && proposal.isAuthor ? (
                    <ChampionBadge>
                      <PenIcon />
                      <span>Author</span>
                    </ChampionBadge>
                  ) : null}
                  {isDesktop && badges?.includes('champion') && proposal.isChampion ? (
                    <ChampionBadge>
                      <AwardIcon />
                      <span>Champion</span>
                    </ChampionBadge>
                  ) : null}
                  {badges?.includes('stars') && proposal.stars != null ? (
                    <StarsBadge>
                      <StarIcon />
                      <span>{proposal.stars}</span>
                    </StarsBadge>
                  ) : null}
                </Badges>
              </ProposalLink>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
