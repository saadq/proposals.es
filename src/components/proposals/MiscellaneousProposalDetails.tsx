import Link from 'next/link'
import styled from 'styled-components'
import { SanitizedHtml } from '../common/SanitizedHtml'
import { Proposal } from '../../types'

const Details = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 4px;
  padding: 1rem 3rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primary};
`

const FallbackTitle = styled.h1`
  margin: 0;
`

const TagHeading = styled.h3`
  font-size: 0.8rem;
  margin: 0;
`

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
`

const Tag = styled.div`
  border-radius: 4px;
  background: #d6cbff;
  padding: 0.25rem 0.5rem;
  font-size: 0.65rem;
`

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.5rem;

  &:first-child {
    margin-top: 0;
  }
`

interface Props {
  proposal: Proposal
}

export function MiscellaneousProposalDetails({ proposal }: Props) {
  return (
    <>
      <FallbackTitle></FallbackTitle>
      <Details>
        <DetailRow>
          <TagHeading>Champions:</TagHeading>
          <TagList>
            {proposal.champions?.map((champion) => (
              <Tag key={champion}>
                <Link href={`/champions/${champion}`} passHref>
                  <a>{champion}</a>
                </Link>
              </Tag>
            ))}
          </TagList>
        </DetailRow>
        {proposal.authors?.length ? (
          <DetailRow>
            <TagHeading>Authors:</TagHeading>
            <TagList>
              {proposal.authors.map((author) => (
                <Tag key={author}>
                  <Link href={`/champions/${author}`} passHref>
                    <a>{author}</a>
                  </Link>
                </Tag>
              ))}
            </TagList>
          </DetailRow>
        ) : null}
        {proposal.lastPresentedHtml && (
          <DetailRow>
            <TagHeading>Last presented:</TagHeading>
            <SanitizedHtml html={proposal.lastPresentedHtml} />
          </DetailRow>
        )}
        {proposal.rationaleHtml && (
          <DetailRow>
            <TagHeading>Rationale:</TagHeading>
            <SanitizedHtml html={proposal.rationaleHtml} />
          </DetailRow>
        )}
      </Details>
    </>
  )
}
