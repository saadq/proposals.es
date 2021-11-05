import marked from 'marked'
import { useEffect } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import type { ParsedUrlQuery } from 'querystring'
import { getReadmeBaseUrl, isGithubProposal } from '../../utils/github'
import { Proposal, allStages } from '../../types'
import { DetailsSidebar } from '../../components/proposals'
import { Breadcrumbs, SanitizedHtml, Container, Row } from '../../components/common'
import { getProposalsForStages } from '../../api/getProposalsForStages'
import { getReadmeForProposal } from '../../api/getReadmeForProposal'
import { getRepoDetailsForProposal } from '../../api/getRepoDetailsForProposal'
import { FallbackDetails } from '../../components/proposals/FallbackDetails'

interface Props {
  proposal: Proposal
  readme: string
}

interface Params extends ParsedUrlQuery {
  proposalTitle: string
}

interface Path {
  params: Params
}

export const getStaticProps: GetStaticProps<Partial<Props>, Params> = async ({
  params
}) => {
  const proposalTitle = params?.proposalTitle as string
  const proposalsByStage = await getProposalsForStages({ stages: allStages })
  const proposals = Object.values(proposalsByStage).flat()
  const proposal = proposals.find(
    (p) => p.title === decodeURIComponent(proposalTitle)
  ) as Proposal

  if (!proposal) {
    return {
      redirect: { destination: '/404' },
      props: {}
    }
  }

  const readme = await getReadmeForProposal(proposal)

  const proposalWithRepoDetails = isGithubProposal(proposal)
    ? { ...proposal, ...(await getRepoDetailsForProposal(proposal)) }
    : proposal

  return {
    props: {
      proposal: proposalWithRepoDetails,
      readme
    }
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const allProposalsByStage = await getProposalsForStages({ stages: allStages })

  const paths = allStages.reduce((paths, stageName) => {
    const proposals = allProposalsByStage[stageName] as Proposal[]
    const proposalPaths = proposals.map((proposal) => ({
      params: {
        stageName: stageName,
        proposalTitle: encodeURIComponent(proposal.title)
      }
    }))

    return [...paths, ...proposalPaths]
  }, [] as Path[])

  return {
    paths,
    fallback: 'blocking'
  }
}

export default function ProposalDetailsPage({ proposal, readme }: Props) {
  useEffect(() => {
    async function highlightReadme() {
      const hljs = await import('highlight.js')
      hljs.default.highlightAll()
    }

    if (readme) {
      highlightReadme()
    }
  }, [readme])

  const breadcrumbs = [
    {
      link: '/',
      label: 'Proposals'
    },
    {
      link: `/proposals/${encodeURIComponent(proposal.title)}`,
      label: proposal.titleHtml,
      isHtml: true
    }
  ]

  return (
    <Container width="1600px" maxWidth="100%" margin="0 auto">
      <Breadcrumbs crumbs={breadcrumbs} />
      {!isGithubProposal(proposal) && <FallbackDetails proposal={proposal} />}
      <Row gap="2rem">
        {readme ? (
          <article>
            <SanitizedHtml
              className="markdown-body"
              html={marked(readme, {
                baseUrl: getReadmeBaseUrl(proposal)
              })}
            />
          </article>
        ) : (
          <iframe
            src={proposal.link}
            style={{
              border: 'none',
              width: '100%',
              height: '100vh'
            }}
          />
        )}
        <DetailsSidebar proposal={proposal} />
      </Row>
    </Container>
  )
}
