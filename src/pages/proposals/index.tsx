import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/',
    permanent: true
  }
})

export default function ProposalsPage() {
  return null
}
