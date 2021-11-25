export function avoidRateLimit(ms: number = 1000) {
  if (!process.env.IS_BUILD) {
    return
  }

  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
