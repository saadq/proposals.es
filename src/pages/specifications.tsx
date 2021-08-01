import { GetStaticProps } from 'next'
import { getSpecifications } from '../api/ecma'
import { Specification } from '../types'

interface Props {
  specifications: Specification[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const specifications = await getSpecifications()

  return {
    props: { specifications }
  }
}

export default function Specifications({ specifications }: Props) {
  console.log({ specifications })
  return <p>Specifications</p>
}
