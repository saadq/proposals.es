import { createGlobalStyle } from 'styled-components'

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

  .scroll-disabled {
    overflow: hidden
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  svg.octicon {
    display: none;
  }

  a:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary};
  }

  .markdown-body .highlight pre,
  .markdown-body pre {
    padding: 16px;
  }
`
