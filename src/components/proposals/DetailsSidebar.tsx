import Link from 'next/link'
import styled from 'styled-components'
import { SanitizedHtml, StarIcon, GitHubIcon } from '../common'
import { formatProposalType, formatStageName } from '../../utils/format'
import { Proposal } from '../../types'
import { getGitHubDetails, isGithubProposal } from '../../utils/github'

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 20%;
`

const DetailCard = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid #e7f0f3;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
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
  list-style-type: none;
  padding: 0;
  margin: 0;
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
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.black};
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
        <h2>Proposal</h2>
        <h3>{formatStageName(proposal.stage)}</h3>
        {proposal.type !== 'inactive' && (
          <InfoRow>
            <h3>{formatProposalType(proposal.type)}</h3>
          </InfoRow>
        )}
      </DetailCard>
      {isGithubProposal(proposal) && (
        <DetailCard>
          <h2>GitHub</h2>
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
      )}
      {proposal.authors?.length && (
        <DetailCard>
          <h2>Authors</h2>
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
        <h2>Champions</h2>
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
          <h2>Last presented</h2>
          <SanitizedHtml html={proposal.lastPresentedHtml} />
        </DetailCard>
      )}
    </Sidebar>
  )
}
