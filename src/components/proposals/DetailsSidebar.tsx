import Link from 'next/link'
import styled from 'styled-components'
import { SanitizedHtml, Heading } from '../common'
import { StarIcon } from '../common/StarIcon'
import { GitHubIcon } from '../common/GitHubIcon'
import { formatStageName } from '../../utils/formatStageName'
import { Proposal } from '../../types'
import { getGitHubDetails, isGithubProposal } from '../../utils/github'

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 15%;
  align-self: flex-start;
`

const DetailCard = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--card-color);
  border: var(--card-border);
  box-shadow: var(--card-shadow);
  padding: 1rem;

  h2,
  h3 {
    margin: 0 0 1rem 0;
  }

  h3 {
    font-size: 1rem;
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`

const InfoRow = styled(Row)`
  align-items: center;
  gap: 0.5rem;
`

const IconCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const ChampionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ChampionName = styled.a`
  padding: 0.25rem 1rem;
  color: white;
  background: black;
  border-radius: 4px;
  font-size: 0.85rem;
  align-self: flex-start;
  text-decoration: none;
  transition: 0.4s ease;

  &:hover {
    background: var(--primary);
    color: var(--black);
  }
`

interface Props {
  proposal: Proposal
}

export function DetailsSidebar({ proposal }: Props) {
  const githubDetails = isGithubProposal(proposal) ? getGitHubDetails(proposal) : null

  return (
    <Sidebar>
      <DetailCard>
        <Heading level={2}>Proposal</Heading>
        <Heading level={3}>{formatStageName(proposal.stage)}</Heading>
        {proposal.type !== 'inactive' ? (
          <InfoRow>
            <Heading level={3}>
              <a
                href={`https://www.ecma-international.org/publications-and-standards/standards/${proposal.type}/`}
              >
                {proposal.type.toUpperCase()}
              </a>
            </Heading>
          </InfoRow>
        ) : null}
      </DetailCard>
      {isGithubProposal(proposal) ? (
        <DetailCard>
          <Heading level={2}>GitHub</Heading>
          <IconCol>
            <InfoRow>
              <StarIcon />
              <span>{proposal.stars}</span>
            </InfoRow>
            <InfoRow>
              <GitHubIcon />
              <Link href={proposal.link as string} passHref>
                <a>
                  {githubDetails?.owner}/{githubDetails?.repo}
                </a>
              </Link>
            </InfoRow>
          </IconCol>
        </DetailCard>
      ) : null}
      {proposal.authors?.length && (
        <DetailCard>
          <Heading level={2}>Authors</Heading>
          <ChampionList>
            {proposal.authors?.map((author) => (
              <li key={author}>
                <Link href={`/champions/${encodeURIComponent(author)}`} passHref>
                  <ChampionName key={author}>{author}</ChampionName>
                </Link>
              </li>
            ))}
          </ChampionList>
        </DetailCard>
      )}
      <DetailCard>
        <Heading level={2}>Champions</Heading>
        <ChampionList>
          {proposal.champions.map((champion) => (
            <li key={champion}>
              <Link
                href={`/champions/${encodeURIComponent(champion)}`}
                passHref
                key={champion}
              >
                <ChampionName key={champion}>{champion}</ChampionName>
              </Link>
            </li>
          ))}
        </ChampionList>
      </DetailCard>
      {proposal.lastPresentedHtml && (
        <DetailCard>
          <Heading level={2}>Last presented</Heading>
          <SanitizedHtml html={proposal.lastPresentedHtml} />
        </DetailCard>
      )}
    </Sidebar>
  )
}
