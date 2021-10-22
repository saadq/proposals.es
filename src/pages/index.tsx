import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => ({
  redirect: {
    destination: '/proposals',
    permanent: true
  }
})

export default function HomePage() {
  return null
}
