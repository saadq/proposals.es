import 'styled-components'

declare module 'styled-components' {
  export interface Theme {
    sizes: {
      header: {
        width: string
        height: string
      }
      footer: {
        width: string
        height: string
      }
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
