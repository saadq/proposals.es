import { Fragment } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import type { ParsedUrlQuery } from 'querystring'
import { getProposalsForStages } from '../../api/getProposalsForStages'
import { ProposalCard } from '../../components/proposals'
import { Row } from '../../components/common'
import { allStages, Proposal } from '../../types'

interface ChampionedProposal extends Proposal {
  isAuthor: boolean
  isChampion: boolean
}

interface Props {
  championName: string
  championedProposals: ChampionedProposal[]
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

  const championedProposals = flattenedProposals.reduce(
    (championedProposals, proposal) => {
      const isChampion = proposal.champions.includes(championName)
      const isAuthor = proposal.authors?.includes(championName) ?? false
      return isChampion || isAuthor
        ? [...championedProposals, { ...proposal, isAuthor, isChampion }]
        : championedProposals
    },
    [] as ChampionedProposal[]
  )

  const sortedProposals = championedProposals.sort((a, b) => {
    if (a.isChampion && a.isAuthor) {
      return -1
    }

    if (a.isAuthor && !b.isAuthor) {
      return -1
    }

    return 0
  })

  return {
    props: {
      championName,
      championedProposals: sortedProposals
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

export default function ChampionPage({ championName, championedProposals }: Props) {
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
        <Row>
          {championedProposals.map((proposal, index) => (
            <Fragment key={proposal.title}>
              {proposal.isAuthor ? <p>author</p> : null}
              {proposal.isChampion ? <p>champion</p> : null}
              <ProposalCard
                key={proposal.title}
                proposal={proposal}
                index={index}
                stage="inactive"
              />
            </Fragment>
          ))}
        </Row>
      </>
    </>
  )
}
