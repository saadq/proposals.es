import type { AppProps } from 'next/app'
import styled, { ThemeProvider } from 'styled-components'
import { Header, Footer, GlobalStyle } from '../components/common'
import { lightTheme } from '../theme'

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
  const theme = lightTheme // TODO – Don't hardcode this

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Page>
        <Header />
        <Main>
          <Component {...pageProps} />
        </Main>
        <Footer />
      </Page>
    </ThemeProvider>
  )
}
