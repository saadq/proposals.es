import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Header, Footer, GlobalStyle } from '../components/common'
import { darkTheme, lightTheme } from '../theme'

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
  const [theme, setTheme] = useState(lightTheme)

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme(darkTheme)
    } else {
      setTheme(lightTheme)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Page>
        <Header theme={theme} setTheme={setTheme} />
        <Main>
          <Component {...pageProps} />
        </Main>
        <Footer />
      </Page>
    </ThemeProvider>
  )
}
