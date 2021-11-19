import { createGlobalStyle, css } from 'styled-components'
import { markdownLightTheme, markdownDarkTheme } from '../../../utils/markdownStyles'

const baseThemeVars = css`
  --gutter-width: 2%;
  --header-height: 115px;
  --footer-height: 50px;
  --primary: #ff8d11;
`

const lightThemeVars = css`
  --white: #fff;
  --black: #000;
  --gray: #f4f6fb;
  --background: var(--gray);
  --foreground: var(--black);
  --header-color: var(--white);
  --heading-color: var(--black);
  --heading-banner-color: #34373a;
  --heading-banner-text-color: var(--gray);
  --card-color: var(--white);
  --stage-card-color: var(--white);
  --badge-color: var(--black);
  --badge-text-color: var(--white);
  --search-bar-color: var(--white);
  --mobile-menu-color: var(--white);
  --layout-icon-hover-color: var(--black);
  --layout-icon-hover-text-color: var(--white);
  --sidebar-card-color: var(--white);

  --header-shadow: 0px 4px 24px rgba(55, 81, 104, 0.1);
  --card-shadow: 0px 8px 10px #e7f0f3;
  --search-bar-shadow: 0px 8px 10px #e7f0f3;
  --search-bar-focused-shadow: 0px 8px 10px #d7dee1;

  --card-border: 1px solid #e7f0f3;
  --search-bar-border: 1px solid #f4f6fb;
  --layout-icon-border: 1px solid var(--black);
`

const darkThemeVars = css`
  --background: black;
  --foreground: white;
  --white: #d0d0d0;
  --black: #0f1013;
  --gray: #1b1c20;
  --dark-gray: #15161a;
  --background: var(--black);
  --foreground: var(--white);
  --header-color: #0d0d10;
  --heading-color: #fff;
  --heading-banner-color: #272930;
  --heading-banner-text-color: var(--white);
  --card-color: var(--dark-gray);
  --stage-card-color: var(--black);
  --badge-color: #000;
  --badge-text-color: var(--white);
  --search-bar-color: #1b1c20;
  --mobile-menu-color: var(--black);
  --layout-icon-hover-color: var(--white);
  --layout-icon-hover-text-color: var(--black);
  --footer-color: var(--black);

  --header-shadow: 0px 4px 24px rgba(0, 0, 0, 0.5);
  --card-shadow: 0px 2px 4px black;
  --search-bar-shadow: 0px 2px 2px black;
  --search-bar-focused-shadow: 0px 4px 4px black;

  --card-border: 1px solid black;
  --search-bar-border: 1px solid black;
  --layout-icon-border: 1px solid white;
`

export const GlobalStyle = createGlobalStyle`
  :root {
    ${baseThemeVars}
  }

  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-size: 1rem;
    font-variant-ligatures: none;
  }

  body {
    background: var(--background);
    color: var(--foreground);
  }

  
  body.light {
    ${lightThemeVars}
    ${markdownLightTheme}
  }

  body.dark {
    ${darkThemeVars}
    ${markdownDarkTheme}
  }

  .scroll-disabled {
    overflow: hidden;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  svg.octicon {
    display: none;
  }

  *:focus, a:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--primary);
  }

  .markdown-body .highlight pre,
  .markdown-body pre {
    padding: 16px;
  }
`
