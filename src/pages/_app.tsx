import { useState } from 'react'
import type { AppProps } from 'next/app'
import styled from 'styled-components'
import { Header, Footer, GlobalStyle } from '../components/common'
import { ExpandedStagesProvider } from '../hooks/useExpandedStages'
import { Stage } from '../types'

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
  const [expandedStages, setExpandedStages] = useState<Stage[]>([])

  return (
    <>
      <GlobalStyle />
      <Page>
        <Header />
        <Main>
          <ExpandedStagesProvider value={{ expandedStages, setExpandedStages }}>
            <Component {...pageProps} />
          </ExpandedStagesProvider>
        </Main>
        <Footer />
      </Page>
    </>
  )
}
