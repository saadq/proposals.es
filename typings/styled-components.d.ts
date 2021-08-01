import 'styled-components'

declare module 'styled-components' {
  export interface Theme {
    sizes: {
      gutter: string
      headerHeight: string
      footerHeight: string
    }
    colors: {
      background: string
      foreground: string
      primary: string
      header: string
      card: string
      footer: string
    }
  }

  export interface DefaultTheme extends Theme {}
}
