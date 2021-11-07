import { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import type { ParsedUrlQuery } from 'querystring'
import {
  Container,
  Breadcrumbs,
  SearchBar,
  Heading,
  SanitizedHtml
} from '../../components/common'
import { ProposalList } from '../../components/proposals'
import { getProposalsForStages } from '../../api/getProposalsForStages'
import { formatStageName } from '../../utils/formatStageName'
import { Proposal, Stage, allStages, ActiveStage } from '../../types'
import { getStageDetails } from '../../api/getStageDetails'
import { Disclaimer } from '../../components/common/Disclaimer'

interface Props {
  stageName: Stage
  proposals: Proposal[]
  stageDetailsHtml: string
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
  const proposalsForStage = proposalsByStage[stageName] as Proposal[]
  const stageDetailsHtml = await getStageDetails(stageName)

  return {
    props: {
      stageName,
      stageDetailsHtml,
      proposals: proposalsForStage
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

const blogPostAnchorsByStage: Record<ActiveStage, string> = {
  stage0: 'stage-1%3A-strawman',
  stage1: 'stage-1%3A-proposal',
  stage2: 'stage-2%3A-draft',
  stage3: 'stage-3%3A-candidate',
  stage4: 'stage-4%3A-finished'
}

export default function StagesPage({ stageName, stageDetailsHtml, proposals }: Props) {
  const [searchQuery, setSearchQuery] = useState('')

  const breadcrumbs = [
    {
      label: 'Home',
      link: '/'
    },
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
    <Container width="80%" maxWidth="1000px" margin="0 auto">
      <Breadcrumbs crumbs={breadcrumbs} />
      <Heading>{formatStageName(stageName)}</Heading>
      {stageName === 'inactive' ? (
        <p>
          Inactive proposals are proposals that at one point were presented to the
          committee but were subsequently abandoned, withdrawn, or rejected.
        </p>
      ) : (
        <>
          <SanitizedHtml html={stageDetailsHtml} margin="1rem 0" />
          <Disclaimer margin="0 0 1rem 0">
            These stage details are taken from{' '}
            <a
              href={`https://2ality.com/2015/11/tc39-process.html#${
                blogPostAnchorsByStage[stageName as ActiveStage]
              }`}
            >
              Dr. Axel Rauschmayer&apos;s blog post.
            </a>{' '}
            You can read more about the TC39 process in their official{' '}
            <a href="https://tc39.es/process-document/">process document</a>.
          </Disclaimer>
        </>
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
