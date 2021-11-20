import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import marked from 'marked'
import type { ParsedUrlQuery } from 'querystring'
import { getProposalsForStages } from '../../api/getProposalsForStages'
import { getReadmeForProposal } from '../../api/getReadmeForProposal'
import { getRepoDetailsForProposal } from '../../api/getRepoDetailsForProposal'
import { Breadcrumbs, PageContainer, Flex } from '../../components/common'
import { DetailsSidebar } from '../../components/proposals'
import { DetailsExpander } from '../../components/proposals/DetailsExpander'
import { FallbackDetails } from '../../components/proposals/FallbackDetails'
import { Readme } from '../../components/proposals/Readme'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { Proposal, allStages } from '../../types'
import { getReadmeBaseUrl, isGithubProposal } from '../../utils/github'
import { GlobalMarkdownStyles } from '../../utils/markdownStyles'

interface Props {
  proposal: Proposal
  readmeHtml: string
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

  const baseUrl = getReadmeBaseUrl(proposal)
  const readmeMarkdown = await getReadmeForProposal(proposal)
  const readmeHtml = marked(readmeMarkdown, { baseUrl })

  const proposalWithRepoDetails = isGithubProposal(proposal)
    ? { ...proposal, ...(await getRepoDetailsForProposal(proposal)) }
    : proposal

  return {
    props: {
      proposal: proposalWithRepoDetails,
      readmeHtml
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

export default function ProposalDetailsPage({ proposal, readmeHtml }: Props) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isDesktop = !isMobile && isMobile != null

  const breadcrumbs = [
    {
      link: '/',
      label: 'Home'
    },
    {
      link: `/proposals/${encodeURIComponent(proposal.title)}`,
      label: proposal.titleHtml,
      isHtml: true
    }
  ]

  return (
    <>
      <Head>
        <title>{proposal.title} details</title>
        <meta name="description" content={`Proposal details for ${proposal.title}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <GlobalMarkdownStyles />
        <PageContainer width="95%" mobileWidth="95%" maxWidth="100%" margin="0 auto">
          <Breadcrumbs crumbs={breadcrumbs} />
          {!isGithubProposal(proposal) && <FallbackDetails proposal={proposal} />}
          <Flex layout={isDesktop ? 'row' : 'column'} gap="2rem">
            {isMobile ? <DetailsExpander proposal={proposal} /> : null}
            {readmeHtml ? (
              <Readme readmeHtml={readmeHtml} />
            ) : proposal.link ? (
              <iframe
                src={proposal.link}
                style={{
                  border: 'none',
                  width: '100%',
                  height: '100vh'
                }}
              />
            ) : null}
            {isDesktop ? <DetailsSidebar proposal={proposal} /> : null}
          </Flex>
        </PageContainer>
      </>
    </>
  )
}
