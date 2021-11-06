import { createGlobalStyle } from 'styled-components'
import { markdownStyles } from '../../../theme/markdown'
import 'highlight.js/styles/github.css'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-size: 1rem;
    font-variant-ligatures: none;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  svg.octicon {
    display: none;
  }

  ${markdownStyles}
`
