import styled from 'styled-components'
import { Proposal } from '../../types'
import { SanitizedHtml } from '../common/SanitizedHtml'
import { StarIcon } from '../common/StarIcon'
import { SearchBar } from '../common/SearchBar'
import { isGithubProposal } from '../../utils/github'
import { GitHubIcon } from '../common/GitHubIcon'

const List = styled.ul`
  padding: 0;
`

const ListItem = styled.li`
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

  code {
    font-size: 0.95rem;
    font-weight: 600;
  }

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
  align-items: center;
  gap: 0.25rem;

  .feather-star {
    transition: fill 0.4s ease;
  }

  span {
    font-size: 0.8rem;
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
      !searchQuery || searchQuery.length < 2
        ? true
        : proposal.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

  return (
    <>
      <List>
        {proposalsToShow.map((proposal) => (
          <ListItem key={proposal.title}>
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
                  href={proposal.link}
                  target="_blank"
                  style={{ margin: 0, padding: 0 }}
                >
                  <GitHubIcon />
                </RepoLink>
              )}
            </Badges>
          </ListItem>
        ))}
      </List>
    </>
  )
}
