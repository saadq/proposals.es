import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { GlobalStyle } from '../components/GlobalStyle'
import { darkTheme } from '../theme'

function App({ Component, pageProps }: AppProps) {
  const theme = darkTheme // TODO – Don't hardcode this

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </ThemeProvider>
  )
}

export default App
