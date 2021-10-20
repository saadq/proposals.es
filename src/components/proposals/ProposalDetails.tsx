import marked from 'marked'
import styled from 'styled-components'
import { SanitizedHtml } from '../common/SanitizedHtml'
import { Breadcrumbs } from '../common/Breadcrumbs'
import { Proposal, Stage } from '../../types'
import { getReadmeBaseUrl, isGithubProposal } from '../../utils/github'
import { useEffect } from 'react'

const Container = styled.section`
  font-size: 1rem;
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
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
  stage: Stage
  readme: string
}

export function ProposalDetails({ proposal, stage, readme }: Props) {
  useEffect(() => {
    if (readme) {
      import('highlight.js').then((hljs) => {
        hljs.default.highlightAll()
      })
    }
  }, [readme])

  console.log({ proposal })

  return (
    <>
      <Container>
        <Breadcrumbs stageName={stage} proposal={proposal} />
        <Details>
          {!isGithubProposal(proposal) && (
            <>
              <FallbackTitle>
                <SanitizedHtml html={proposal.titleHtml} />
              </FallbackTitle>
              {proposal.link ? (
                <p>
                  This proposal is not on GitHub. You can view the proposal directly{' '}
                  <a href={proposal.link}>here</a> if the iframe fails to load.
                </p>
              ) : (
                <p>
                  This proposal currently is not available on GitHub or anywhere else.
                </p>
              )}
              <DetailRow>
                <TagHeading>Champions:</TagHeading>
                <TagList>
                  {proposal.champions?.map((champion) => (
                    <Tag key={champion}>{champion}</Tag>
                  ))}
                </TagList>
              </DetailRow>
              {proposal.authors?.length ? (
                <DetailRow>
                  <TagHeading>Authors:</TagHeading>
                  <TagList>
                    {proposal.authors.map((author) => (
                      <Tag key={author}>{author}</Tag>
                    ))}
                  </TagList>
                </DetailRow>
              ) : null}
              <iframe
                src={proposal.link}
                style={{
                  border: 'none',
                  marginTop: '2rem',
                  width: '100%',
                  height: '100vh'
                }}
              />
            </>
          )}
          {isGithubProposal(proposal) && (
            <>
              {proposal.authors?.length && (
                <DetailRow>
                  <TagHeading>Authors:</TagHeading>
                  <TagList>
                    {proposal.authors.map((author) => (
                      <Tag key={author}>{author}</Tag>
                    ))}
                  </TagList>
                </DetailRow>
              )}
              <DetailRow>
                <TagHeading>Champions:</TagHeading>
                <TagList>
                  {proposal.champions?.map((champion) => (
                    <Tag key={champion}>{champion}</Tag>
                  ))}
                </TagList>
              </DetailRow>
            </>
          )}
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
        {readme ? (
          <SanitizedHtml
            className="markdown-body"
            html={marked(readme, {
              baseUrl: getReadmeBaseUrl(proposal)
            })}
          />
        ) : null}
      </Container>
    </>
  )
}
