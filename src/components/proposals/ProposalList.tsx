import Link from 'next/link'
import styled from 'styled-components'
import { Proposal } from '../../types'
import { SanitizedHtml } from '../common/SanitizedHtml'
import { StarIcon } from '../common/StarIcon'
import { isGithubProposal } from '../../utils/github'
import { GitHubIcon } from '../common/GitHubIcon'
import { useCallback } from 'react'

const List = styled.ul`
  padding: 0;
  list-style-type: none;
`

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

const StarsBadge = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.25rem;

  .feather-star {
    transition: fill 0.4s ease;
    align-self: center;
  }

  span {
    font-size: 0.9rem;
  }
`

const RepoLink = styled.a`
  display: flex;
  align-items: center;

  .feather-github {
    fill: ${({ theme }) => theme.colors.foreground};
    stroke: none;
  }
`

type Badge = 'stars' | 'author' | 'repo'

interface Props {
  proposals: Proposal[]
  badges?: Badge[]
  searchQuery?: string
}

export function ProposalList({ proposals, badges, searchQuery }: Props) {
  const proposalsToShow = proposals
    .sort((a, b) => (b?.stars ?? 0) - (a?.stars ?? 0))
    .filter((proposal) =>
      !searchQuery || searchQuery.trim().length < 1
        ? true
        : proposal.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const handleRepoClick = useCallback((repoLink: string) => {
    document.location.href = repoLink
  }, [])

  return (
    <>
      <List>
        {proposalsToShow.map((proposal) => (
          <li key={proposal.title}>
            <Link href={`/proposals/${encodeURIComponent(proposal.title)}`} passHref>
              <ProposalLink>
                <SanitizedHtml html={proposal.titleHtml} />
                <Badges>
                  {badges?.includes('stars') && proposal.stars != null && (
                    <StarsBadge>
                      <StarIcon />
                      <span>{proposal.stars}</span>
                    </StarsBadge>
                  )}
                  {badges?.includes('repo') && isGithubProposal(proposal) && (
                    <RepoLink
                      onClick={() => handleRepoClick(proposal.link as string)}
                      href={proposal.link}
                      target="_blank"
                      style={{ margin: 0, padding: 0 }}
                    >
                      <GitHubIcon />
                    </RepoLink>
                  )}
                </Badges>
              </ProposalLink>
            </Link>
          </li>
        ))}
      </List>
    </>
  )
}
