import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Header, Footer, GlobalStyle } from '../components/common'
import { ExpandedStagesProvider } from '../hooks/useExpandedStages'
import { usePreferredTheme } from '../hooks/usePreferredTheme'
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
  const [theme, setTheme] = usePreferredTheme()
  const [expandedStages, setExpandedStages] = useState<Stage[]>([])

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Page>
          <Header theme={theme} setTheme={setTheme} />
          <Main>
            <ExpandedStagesProvider value={{ expandedStages, setExpandedStages }}>
              <Component {...pageProps} />
            </ExpandedStagesProvider>
          </Main>
          <Footer />
        </Page>
      </ThemeProvider>
    </>
  )
}
