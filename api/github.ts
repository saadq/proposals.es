import { Lexer } from 'marked'

const lexer = new Lexer()

function parseReadme(readme: string) {
  const tokens = lexer.lex(readme)
  console.log({ tokens })
  return []
}

export async function getProposals() {
  const endpoint = 'https://api.github.com/repos/tc39/proposals/readme'

  const request = {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.VERSION.raw'
    }
  }

  const response = await fetch(endpoint, request)
  const rawReadme = await response.text()
  const proposals = parseReadme(rawReadme)

  return proposals
}
