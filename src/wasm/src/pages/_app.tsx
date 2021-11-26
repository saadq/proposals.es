import type { AppProps } from 'next/app'
import styled from 'styled-components'

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 1;
  margin: 3rem 0;
`

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Page>
        <Main>
          <Component {...pageProps} />
        </Main>
      </Page>
    </>
  )
}
