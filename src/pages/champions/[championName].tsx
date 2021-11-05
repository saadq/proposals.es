import { Fragment } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import type { ParsedUrlQuery } from 'querystring'
import { Champion } from '../../types'
import { getAllChampions } from '../../api/getAllChampions'
import { ProposalList } from '../../components/proposals'
import { Breadcrumbs, Container } from '../../components/common'
import { Heading } from '../../components/common/layout/Heading'

interface Props {
  champion: Champion
}

interface Params extends ParsedUrlQuery {
  championName: string
}

interface StaticPath {
  params: Params
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const championName = params?.championName as string
  const allChampions = await getAllChampions()
  const champion = allChampions.find(
    (champion) => champion.name === championName
  ) as Champion

  return {
    props: {
      champion
    }
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const allChampions = await getAllChampions()
  const championNames = allChampions.map((champion) => champion.name)
  const paths: StaticPath[] = championNames.map((championName) => ({
    params: {
      championName
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export default function ChampionPage({ champion }: Props) {
  const breadcrumbs = [
    {
      label: 'Home',
      link: '/'
    },
    {
      label: 'Champions',
      link: '/champions'
    },
    {
      label: champion.name,
      link: `/champions/${champion.name}`
    }
  ]

  return (
    <>
      <Head>
        <title>{champion.name} Proposals</title>
        <meta
          name="description"
          content={`These are the proposals championed or authored by ${champion.name}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container width="80%" max-width="1000px" margin="0 auto">
        <Breadcrumbs crumbs={breadcrumbs} />
        <Heading>{champion.name}</Heading>
        <Heading level={2} fontSize="1.25rem">
          {champion.proposals.length} Proposals
        </Heading>
        <ProposalList proposals={champion.proposals} badges={['author', 'champion']} />
      </Container>
    </>
  )
}
