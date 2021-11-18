import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'
export type ThemeHook = [Theme, () => void]

export function useTheme(): ThemeHook {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const currTheme = document.body.className as Theme
    setTheme(currTheme)
  }, [])

  useEffect(() => {
    document.body.className = theme
    try {
      localStorage.setItem('theme', theme)
    } catch (err) {}
  }, [theme])

  const toggleTheme = useCallback(() => {
    const newTheme = document.body.className === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }, [])

  return [theme, toggleTheme]
}
