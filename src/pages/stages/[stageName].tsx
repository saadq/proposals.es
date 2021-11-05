import { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import styled from 'styled-components'
import type { ParsedUrlQuery } from 'querystring'
import { Breadcrumbs, SearchBar } from '../../components/common'
import { ProposalList } from '../../components/proposals'
import { getProposalsForStages } from '../../api/getProposalsForStages'
import { getTc39Process, Tc39Process } from '../../api/getTc39Process'
import { formatStageName } from '../../utils/format'
import { Proposal, Stage, allStages } from '../../types'

interface Props {
  stageName: Stage
  proposals: Proposal[]
  tc39Process: Tc39Process
}

interface Params extends ParsedUrlQuery {
  stageName: Stage
}

interface Path {
  params: Params
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const stageName = params?.stageName as Stage
  const proposalsByStage = await getProposalsForStages({
    stages: [stageName],
    includeRepoDetails: true
  })

  const tc39Process = await getTc39Process()

  return {
    props: {
      stageName: stageName as Stage,
      proposals: proposalsByStage[stageName] as Proposal[],
      tc39Process: tc39Process
    }
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const stagePaths: Path[] = allStages.map((stageName) => ({
    params: {
      stageName
    }
  }))

  return {
    paths: stagePaths,
    fallback: false
  }
}

const Container = styled.div`
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
`

const Heading = styled.h1`
  margin-bottom: 2rem;
`

export default function StagesPage({ stageName, proposals }: Props) {
  const [searchQuery, setSearchQuery] = useState('')

  const breadcrumbs = [
    {
      label: 'Stages',
      link: '/stages'
    },
    {
      label: formatStageName(stageName),
      link: `/stages/${stageName}`
    }
  ]

  return (
    <Container>
      <Breadcrumbs crumbs={breadcrumbs} />
      <Heading>{formatStageName(stageName)} Proposals</Heading>
      {stageName === 'inactive' && (
        <p>
          Inactive proposals are proposals that at one point were presented to the
          committee but were subsequently abandoned, withdrawn, or rejected.
        </p>
      )}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder={`Search for proposals... (${proposals.length} total)`}
      />
      <ProposalList
        proposals={proposals}
        badges={['stars', 'repo']}
        searchQuery={searchQuery}
      />
    </Container>
  )
}
