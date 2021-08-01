import type { AppProps } from 'next/app'
import styled, { ThemeProvider } from 'styled-components'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { GlobalStyle } from '../components/GlobalStyle'
import { darkTheme } from '../theme'

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 1;
  margin: 0 ${({ theme }) => theme.sizes.gutter};
`

function App({ Component, pageProps }: AppProps) {
  const theme = darkTheme // TODO – Don't hardcode this

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

export default App
