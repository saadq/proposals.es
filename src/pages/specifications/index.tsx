import { GetStaticProps } from 'next'
import { Specification } from '../../components/specifications'
import { Breadcrumbs, Col, Container, Heading } from '../../components/common'
import { getSpecifications } from '../../api/getSpecifications'
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
    <Container width="80%" maxWidth="1000px" margin="0 auto">
      <Breadcrumbs crumbs={breadcrumbs} />
      <Heading margin="0 0 2rem 0">ECMAScript Specifications</Heading>
      <Col gap="3rem">
        {specifications.map((specification) => (
          <Specification specification={specification} key={specification.name} />
        ))}
      </Col>
    </Container>
  )
}
