/**
 * When statically building each page, we need to add a
 * delay to avoid the secondary GitHub rate limits.
 *
 * https://docs.github.com/en/rest/overview/resources-in-the-rest-api#secondary-rate-limits
 */
export async function avoidRateLimit() {
  if (process.env.NODE_ENV === 'production') {
    await sleep()
  }
}

function sleep(ms = 20000) {
  return new Promise((res) => setTimeout(res, ms))
}
