import { useEffect, useMemo } from 'react'
import marked from 'marked'
import styled from 'styled-components'
import { SanitizedHtml } from '../common'

const Article = styled.article`
  max-width: 80%;
`

interface Props {
  readme: string
  baseUrl: string
}

export function Readme({ readme, baseUrl }: Props) {
  useEffect(() => {
    import('highlight.js').then((hljs) => {
      hljs.default.highlightAll()
    })
  }, [])

  const html = useMemo(() => marked(readme, { baseUrl }), [readme, baseUrl])

  return (
    <Article>
      <SanitizedHtml className="markdown-body" html={html} />
    </Article>
  )
}
