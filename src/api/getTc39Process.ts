import { load } from 'cheerio'
import { avoidRateLimit } from '../utils/avoidRateLimit'

export async function getTc39Process(): Promise<string> {
  await avoidRateLimit()

  const endpoint = 'https://tc39.es/process-document/'
  const response = await fetch(endpoint)
  const html = await response.text()
  const $ = load(html)
  const processHtml = $.html().toString()

  return processHtml
}
