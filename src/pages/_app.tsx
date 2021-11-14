import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import styled, { Theme, ThemeProvider } from 'styled-components'
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

const themeKey = '@proposals.es/theme'

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState(lightTheme)

  useEffect(() => {
    let preferredThemeName: Theme['name'] | void

    try {
      const item = window.localStorage.getItem(themeKey)
      if (item) {
        preferredThemeName = item as Theme['name']
      }
    } catch (error) {}

    if (!preferredThemeName) {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        preferredThemeName = 'dark'
      } else {
        preferredThemeName = 'light'
      }
    }

    setTheme(preferredThemeName === 'dark' ? darkTheme : lightTheme)
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(themeKey, theme.name)
    } catch (error) {}
  }, [theme])

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
