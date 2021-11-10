import Link from 'next/link'
import styled from 'styled-components'
import { SanitizedHtml, StarIcon, GitHubIcon, Heading } from '../common'
import { formatStageName } from '../../utils/formatStageName'
import { Proposal } from '../../types'
import { getGitHubDetails, isGithubProposal } from '../../utils/github'
import { Expander } from '../common/layout/Expander'

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 20%;
  align-self: flex-start;
  width: 100%;
`

const DetailCard = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
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

export function DetailsExpander({ proposal }: Props) {
  const githubDetails = isGithubProposal(proposal) ? getGitHubDetails(proposal) : null

  return (
    <Sidebar>
      <Expander heading="Proposal">
        <DetailCard>
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
      </Expander>
      {isGithubProposal(proposal) ? (
        <Expander heading="GitHub">
          <DetailCard>
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
        </Expander>
      ) : null}
      {proposal.authors?.length && (
        <Expander heading="Authors">
          <DetailCard>
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
        </Expander>
      )}
      <Expander heading="Champions">
        <DetailCard>
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
      </Expander>
      {proposal.lastPresentedHtml && (
        <Expander heading="Last presented">
          <DetailCard>
            <SanitizedHtml html={proposal.lastPresentedHtml} />
          </DetailCard>
        </Expander>
      )}
    </Sidebar>
  )
}
