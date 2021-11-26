import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Header } from '@proposals.es/ui'
import { hello } from '@proposals.es/utils'

interface Props {
  pageName: string
}

export const getStaticProps: GetStaticProps = async () => {
  const pageName = 'WASM'

  return {
    props: { pageName }
  }
}

export default function HomePage({ pageName }: Props) {
  hello()
  return (
    <>
      <Head>
        <title>{pageName}</title>
        <meta name="description" content="Browse WASM proposals, champions, and more." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Coming soon 🔥</h1>
      <Header>Header rendered from common @proposals.es/ui package</Header>
    </>
  )
}
