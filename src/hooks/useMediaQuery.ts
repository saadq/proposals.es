import { useEffect, useState } from 'react'

export const useMediaQuery = (mediaQuery: string): boolean => {
  const [isMatch, setIsMatch] = useState(false)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery)
    const documentChangeHandler = () => setIsMatch(!!mediaQueryList.matches)

    try {
      mediaQueryList.addEventListener('change', documentChangeHandler)
    } catch (e) {
      mediaQueryList.addListener(documentChangeHandler) // Safari edge case
    }

    documentChangeHandler()

    return () => {
      try {
        mediaQueryList.removeEventListener('change', documentChangeHandler)
      } catch (e) {
        mediaQueryList.removeListener(documentChangeHandler) // Safari edge case
      }
    }
  }, [mediaQuery])

  return isMatch
}
