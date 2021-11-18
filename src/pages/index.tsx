import { Fragment, useState } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { PageContainer, Col, SearchBar } from '../components/common'
import { getProposalsForStages } from '../api/getProposalsForStages'
import { ProposalsByStage, allStages } from '../types'
import { StageWithProposals } from '../components/proposals'

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
    revalidate: 1 * 60 * 60 * 24 // Revalidate once per day
  }
}

export default function ProposalsPage({ proposals }: Props) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <Head>
        <title>ECMAScript Proposals</title>
        <meta
          name="description"
          content="Browse ECMAScript/JavaScript proposals, champions, and more."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer
        layout="column"
        gap="3rem"
        width="95%"
        mobileWidth="95%"
        margin="0 auto"
      >
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search for proposals..."
          width="50rem"
        />
        <Col gap="3rem" margin="0">
          {allStages.map((stage) => (
            <StageWithProposals
              key={stage}
              stage={stage}
              proposals={proposals[stage]}
              searchQuery={searchQuery}
            />
          ))}
        </Col>
      </PageContainer>
    </>
  )
}
