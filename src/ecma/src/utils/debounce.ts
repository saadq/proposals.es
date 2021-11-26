type TimeoutId = ReturnType<typeof setTimeout>

export function debounce<T>(fn: (...args: T[]) => void, ms: number = 100) {
  let timeoutId: TimeoutId

  return function (this: unknown, ...args: T[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.call(this, ...args), ms)
  }
}
