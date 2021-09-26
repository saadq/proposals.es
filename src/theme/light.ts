import { Theme } from 'styled-components'
import { darkTheme } from './dark'

const white = '#FFFFFF'
const gray = '#F4F6FB'
const black = '#000000'
const pink = '#DB83DD'

// TODO – Add colors for light theme
export const lightTheme: Theme = {
  ...darkTheme,
  colors: {
    white,
    black,
    gray,
    pink,
    background: gray,
    foreground: black,
    primary: pink,
    header: white,
    card: '',
    footer: ''
  }
}
