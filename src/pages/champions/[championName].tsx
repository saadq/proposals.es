import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import type { ParsedUrlQuery } from 'querystring'
import styled from 'styled-components'
import { getProposalsForStages } from '../../api/getProposalsForStages'
import { ProposalCard } from '../../components/proposals/ProposalCard'
import { allStages, Proposal } from '../../types'

interface Props {
  championName: string
  authoredProposals: Proposal[]
  championedProposals: Proposal[]
}

interface Params extends ParsedUrlQuery {
  championName: string
}

interface StaticPath {
  params: Params
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const championName = params?.championName as string
  const proposalsByStage = await getProposalsForStages({ stages: allStages })
  const flattenedProposals = Object.values(proposalsByStage).flat()

  const { authoredProposals, championedProposals } = flattenedProposals.reduce(
    ({ authoredProposals, championedProposals }, proposal) => {
      if (proposal.authors?.includes(championName)) {
        authoredProposals.push(proposal)
      }

      if (proposal.champions?.includes(championName)) {
        championedProposals.push(proposal)
      }

      return {
        authoredProposals,
        championedProposals
      }
    },
    {
      authoredProposals: [] as Proposal[],
      championedProposals: [] as Proposal[]
    }
  )

  return {
    props: {
      championName,
      championedProposals,
      authoredProposals
    }
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const proposalsByStage = await getProposalsForStages({ stages: allStages })
  const flattenedProposals = Object.values(proposalsByStage).flat()
  const championNames = flattenedProposals
    .map((proposal) => [...proposal.champions, ...(proposal.authors ?? [])])
    .flat()
  const dedupedChampionNames = [...new Set(championNames)]
  const paths: StaticPath[] = dedupedChampionNames.map((championName) => ({
    params: {
      championName
    }
  }))

  return {
    paths,
    fallback: false
  }
}

const ProposalRow = styled.div`
  display: flex;
`

export default function ChampionPage({
  championName,
  authoredProposals,
  championedProposals
}: Props) {
  return (
    <>
      <Head>
        <title>{championName} Proposals</title>
        <meta
          name="description"
          content={`These are the proposals championed or authored by ${championName}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <h1>{championName}</h1>
        <ProposalRow>
          {authoredProposals.map((proposal, index) => (
            <ProposalCard
              key={proposal.title}
              proposal={proposal}
              index={index}
              stage="inactive"
            />
          ))}
        </ProposalRow>
        <ProposalRow>
          {championedProposals.map((proposal, index) => (
            <ProposalCard
              key={proposal.title}
              proposal={proposal}
              index={index}
              stage="inactive"
            />
          ))}
        </ProposalRow>
      </>
    </>
  )
}
