import { useCallback, useEffect, useState } from 'react'
import { useMount } from './useMount'

export type Theme = 'light' | 'dark'
export type ThemeHook = [Theme, () => void]

export function useTheme(): ThemeHook {
  const [theme, setTheme] = useState<Theme>('light')

  useMount(() => {
    const currTheme = document.body.classList.contains('light') ? 'light' : 'dark'
    setTheme(currTheme)
  })

  useEffect(() => {
    const prevTheme = theme === 'light' ? 'dark' : 'light'
    document.body.classList.remove(prevTheme)
    document.body.classList.add(theme)
    try {
      localStorage.setItem('theme', theme)
    } catch (err) {}
  }, [theme])

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }, [theme])

  return [theme, toggleTheme]
}
