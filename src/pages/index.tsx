import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/proposals',
    permanent: true
  }
})

export default function HomePage() {
  return null
}
