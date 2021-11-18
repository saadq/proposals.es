import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Theme } from 'styled-components'
import { darkTheme, lightTheme } from '../theme'

const themeKey = '@proposals.es/theme'

export function usePreferredTheme(): [Theme, Dispatch<SetStateAction<Theme>>] {
  const [theme, setTheme] = useState(lightTheme)

  useEffect(() => {
    let preferredThemeName: Theme['name'] | void

    try {
      const item = window.localStorage.getItem(themeKey)
      if (item) {
        preferredThemeName = item as Theme['name']
      }
    } catch (error) {}

    if (!preferredThemeName) {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        preferredThemeName = 'dark'
      } else {
        preferredThemeName = 'light'
      }
    }

    setTheme(preferredThemeName === 'dark' ? darkTheme : lightTheme)
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(themeKey, theme.name)
    } catch (error) {}
  }, [theme])

  return [theme, setTheme]
}
