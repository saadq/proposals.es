import { useState } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getAllChampions } from '../../api/getAllChampions'
import { ChampionList } from '../../components/champions'
import { PageContainer, Breadcrumbs, SearchBar, Heading } from '../../components/common'
import { SimplifiedChampion } from '../../types'

interface Props {
  champions: SimplifiedChampion[]
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const champions = await getAllChampions()

  const simplifiedChampions: SimplifiedChampion[] = champions.map((champion) => ({
    name: champion.name,
    proposalCount: champion.proposals.length
  }))

  return {
    props: {
      champions: simplifiedChampions
    }
  }
}

export default function ChampionsPage({ champions }: Props) {
  const [searchQuery, setSearchQuery] = useState('')

  const championsToShow = champions
    .sort((a, b) => b.proposalCount - a.proposalCount)
    .filter((champion) =>
      !searchQuery || searchQuery.length < 2
        ? true
        : champion.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const breadcrumbs = [
    {
      label: 'Home',
      link: '/'
    },
    {
      label: 'Champions',
      link: '/champions'
    }
  ]

  return (
    <>
      <Head>
        <title>ECMAScript Champions</title>
        <meta
          name="description"
          content="These are all the champions/authors of ECMAScript Proposals"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer width="80%" mobileWidth="90%" maxWidth="1000px" margin="0 auto">
        <Breadcrumbs crumbs={breadcrumbs} />
        <Heading>Champions</Heading>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search for champions..."
          debounceRate={0}
        />
        <ChampionList champions={championsToShow} />
      </PageContainer>
    </>
  )
}
