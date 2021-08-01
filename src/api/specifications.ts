import { load } from 'cheerio'
import { Specification } from '../types'

type SpecificationWithoutSummary = Omit<Specification, 'summary'>

const initialSpecifications: SpecificationWithoutSummary[] = [
  {
    name: 'es2015',
    alias: 'ES6',
    specLink: 'https://262.ecma-international.org/6.0',
    featureSetLink: 'http://es6-features.org'
  },
  {
    name: 'es2016',
    alias: 'ES7',
    specLink: 'https://262.ecma-international.org/7.0',
    featureSetLink: 'https://2ality.com/2016/01/ecmascript-2016.html'
  },
  {
    name: 'es2017',
    alias: 'ES8',
    specLink: 'https://262.ecma-international.org/8.0',
    featureSetLink: 'https://2ality.com/2016/02/ecmascript-2017.html'
  },
  {
    name: 'es2018',
    alias: 'ES9',
    specLink: 'https://262.ecma-international.org/9.0',
    featureSetLink: 'https://2ality.com/2017/02/ecmascript-2018.html'
  },
  {
    name: 'es2019',
    alias: 'ES10',
    specLink: 'https://262.ecma-international.org/10.0',
    featureSetLink: 'https://2ality.com/2018/02/ecmascript-2019.html'
  },
  {
    name: 'es2020',
    alias: 'ES11',
    specLink: 'https://262.ecma-international.org/11.0',
    featureSetLink: 'https://2ality.com/2019/12/ecmascript-2020.html'
  },
  {
    name: 'es2021',
    alias: 'ES12',
    specLink: 'https://262.ecma-international.org/12.0',
    featureSetLink: 'https://2ality.com/2020/09/ecmascript-2021.html'
  }
]

export async function getSpecifications(): Promise<Specification[]> {
  const allSummaries = await getAllSummaries()

  const specifications: Specification[] = initialSpecifications.map(
    (spec, i) => ({
      ...spec,
      summary: allSummaries[i]
    })
  )

  return specifications
}

async function getAllSummaries(): Promise<string[]> {
  const endpoint = 'https://tc39.es/ecma262/'
  const response = await fetch(endpoint)
  const html = await response.text()
  const $ = load(html)
  const $ctx = $('#sec-intro')
  const $paragraphElements = $('p', $ctx).map((_, el) => $(el, $ctx).text())
  const paragraphs = Array.from($paragraphElements)

  const indexOfFirstSummary = paragraphs.findIndex((p) =>
    p.startsWith('Focused development of the sixth edition')
  )

  const indexOfFirstNonSummary = paragraphs.findIndex((p) =>
    p.startsWith('Dozens of individuals representing many organizations')
  )

  const summaries = paragraphs.slice(
    indexOfFirstSummary,
    indexOfFirstNonSummary
  )

  return summaries
}
