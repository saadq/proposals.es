import { Fragment, useState } from 'react'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { PageContainer, Col, SearchBar, Heading, Spinner } from '../components/common'
import { getProposalsForStages } from '../api/getProposalsForStages'
import { ProposalsByStage, allStages } from '../types'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { ProposalList, LayoutPicker } from '../components/proposals'
import { formatStageName } from '../utils/formatStageName'
import { Expander } from '../components/common/Expander'

const DynamicStageWithProposals = dynamic(async () => {
  const { StageWithProposals } = await import('../components/stages/StageWithProposals')
  return StageWithProposals
})

interface Props {
  proposals: ProposalsByStage
}

export const getStaticProps: GetStaticProps = async () => {
  const proposals = await getProposalsForStages({
    stages: allStages,
    includeRepoDetails: true
  })

  return {
    props: { proposals },
    revalidate: 1 * 60 * 60 // Revalidate every once per hour
  }
}

export default function ProposalsPage({ proposals }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal')
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isDesktop = !isMobile && isMobile != null

  return (
    <>
      <Head>
        <title>ECMAScript Proposals</title>
        <meta name="description" content="ECMAScript proposals for all stages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer
        layout="column"
        gap={isDesktop ? '3rem' : '1.25rem'}
        width="95%"
        mobileWidth="95%"
        margin="0 auto"
      >
        {isMobile ? <Heading margin="0">Proposals</Heading> : null}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search for proposals..."
          width="50rem"
        />
        {isDesktop ? <LayoutPicker layout={layout} setLayout={setLayout} /> : null}
        {isMobile == null && isDesktop == null ? (
          <Spinner />
        ) : (
          <Col gap={isDesktop ? '3rem' : '1rem'} margin="0">
            {allStages.map((stage) =>
              isDesktop ? (
                <DynamicStageWithProposals
                  key={stage}
                  stage={stage}
                  proposals={proposals[stage]}
                  searchQuery={searchQuery}
                  layout={layout}
                />
              ) : isMobile ? (
                <Expander
                  key={stage}
                  sticky
                  heading={formatStageName(stage)}
                  searchQuery={searchQuery}
                >
                  <ProposalList
                    cardWidth="85%"
                    proposals={proposals[stage]}
                    searchQuery={searchQuery}
                    badges={['stars']}
                  />
                </Expander>
              ) : null
            )}
          </Col>
        )}
      </PageContainer>
    </>
  )
}
