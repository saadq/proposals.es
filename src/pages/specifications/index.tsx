import { GetStaticProps } from 'next'
import { Specification } from '../../components/specifications'
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
    <>
      {specifications.map((specification) => (
        <Specification specification={specification} key={specification.name} />
      ))}
    </>
  )
}
