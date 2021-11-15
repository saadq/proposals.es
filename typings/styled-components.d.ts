import 'styled-components'

declare module 'styled-components' {
  export interface Theme {
    name: 'light' | 'dark'
    sizes: {
      gutter: string
      headerHeight: string
      footerHeight: string
    }
    colors: {
      white: string
      black: string
      gray?: string
      yellow: string
      background: string
      foreground: string
      primary: string
      header: string
      heading: string
      headingBanner: string
      headingBannerText: string
      card: string
      badge: string
      badgeText: string
      footer: string
      searchBar: string
      mobileMenu: string
    }
    shadows: {
      header: string
      card: string
      searchBar: string
      searchBarFocused: string
    }
    borders: {
      card: string
      searchBar: string
    }
  }

  export interface DefaultTheme extends Theme {}
}
