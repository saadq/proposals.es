import { Theme } from 'styled-components'

const white = '#d0d0d0'
const gray = '#1B1D23'
const darkGray = '#15161B'
const black = '#0F1013'
const yellow = '#FCB500'

export const darkTheme: Theme = {
  sizes: {
    gutter: '2%',
    headerHeight: '115px',
    footerHeight: '50px'
  },
  colors: {
    background: '#131418',
    foreground: white,
    primary: yellow,
    header: black,
    card: '#1B1C20',
    footer: black
  }
}
