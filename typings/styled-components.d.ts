import 'styled-components'

declare module 'styled-components' {
  export interface Theme {
    sizes: {
      gutter: string
      headerHeight: string
      footerHeight: string
    }
    colors: {
      white: string
      gray: string
      black: string
      pink: string
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
