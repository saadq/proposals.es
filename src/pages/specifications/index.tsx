import { GetStaticProps } from 'next'
import { Specification } from '../../components/specifications'
import { Col, Container, Heading } from '../../components/common'
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
  return (
    <Container width="80%" maxWidth="1000px" margin="0 auto">
      <Heading margin="0 0 2rem 0">ECMAScript Specifications</Heading>
      <Col gap="3rem">
        {specifications.map((specification) => (
          <Specification specification={specification} key={specification.name} />
        ))}
      </Col>
    </Container>
  )
}
