import { createGlobalStyle } from 'styled-components'
import { markdownStyles } from '../../theme/markdown'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-size: 1rem;
  }

  h1 {
    margin: 0;
    padding: 0;
  }
  
  code {
    font-family: Fira Code, monospace;
  }

  sub {
    vertical-align: top;
    font-size: 1rem;
  }

  svg.octicon {
    display: none;
  }

  ${markdownStyles}
`
