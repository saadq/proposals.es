import type { AppProps } from 'next/app'
import styled, { ThemeProvider } from 'styled-components'
import { Header } from '../components/common/Header'
import { Footer } from '../components/common/Footer'
import { GlobalStyle } from '../components/common/GlobalStyle'
import { lightTheme } from '../theme'

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 1;
  margin: 3rem ${({ theme }) => theme.sizes.gutter};
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
