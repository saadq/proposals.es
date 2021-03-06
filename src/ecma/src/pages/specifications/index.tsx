import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getSpecifications } from '../../api/getSpecifications'
import { Breadcrumbs, Col, PageContainer, Heading } from '../../components/common'
import { Specification } from '../../components/specifications'
import { Specification as SpecificationType } from '../../types'

interface Props {
  specifications: SpecificationType[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const specifications = await getSpecifications()
  const oneHourInSeconds = 1 * 60 * 60

  return {
    props: { specifications },
    revalidate: oneHourInSeconds
  }
}

export default function SpecificationsPage({ specifications }: Props) {
  const breadcrumbs = [
    {
      label: 'Home',
      link: '/'
    },
    {
      label: 'Specifications',
      link: '/specifications'
    }
  ]

  return (
    <>
      <Head>
        <title>ECMAScript Specifications</title>
        <meta
          name="description"
          content="Specifications the ECMAScript 2021 general-purpose programming language."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer width="80%" mobileWidth="95%" maxWidth="1000px" margin="0 auto">
        <Breadcrumbs crumbs={breadcrumbs} />
        <Heading margin="0 0 2rem 0">ECMAScript Specifications</Heading>
        <Col gap="3rem">
          {specifications.map((specification) => (
            <Specification specification={specification} key={specification.name} />
          ))}
        </Col>
      </PageContainer>
    </>
  )
}
