import { useState } from 'react'

interface Params<T> {
  key: string
  defaultValue?: T
}

export function useLocalStorage<T>({ key, defaultValue }: Params<T>) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      const value = item ? JSON.parse(item) : defaultValue
      return value
    } catch (err) {
      return defaultValue
    }
  })

  const setValueInStorage = (newValue: T) => {
    try {
      const item = JSON.stringify(newValue)
      window.localStorage.setItem(key, item)
    } catch (err) {
      console.error(err)
    }
    setValue(newValue)
  }

  return [value, setValueInStorage]
}
