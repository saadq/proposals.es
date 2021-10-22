import { GetStaticProps } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { getProposalsForStages } from '../../api/getProposalsForStages'
import { allStages } from '../../types'

interface Props {
  championNames: string[]
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const proposalsByStage = await getProposalsForStages({ stages: allStages })
  const flattenedProposals = Object.values(proposalsByStage).flat()
  const championNames = flattenedProposals
    .map((proposal) => [...proposal.champions, ...(proposal.authors ?? [])])
    .flat()
  const dedupedChampionNames = [...new Set(championNames)]

  return {
    props: {
      championNames: dedupedChampionNames
    }
  }
}

export default function ChampionsPage({ championNames }: Props) {
  return (
    <>
      <Head>
        <title>{championNames} Proposals</title>
        <meta
          name="description"
          content="These are all the champions/authors of EcmaScript Proposals"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        {championNames.map((name) => (
          <li key={name}>
            <Link href={`/champions/${encodeURIComponent(name)}`} passHref>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
