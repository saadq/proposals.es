import { useMemo } from 'react'
import marked from 'marked'
import styled from 'styled-components'
import { SanitizedHtml } from '../common'
import { useMount } from '../../hooks/useMount'

const Article = styled.article`
  flex: 1;
  max-width: 80%;
  box-shadow: var(--card-shadow);
  border: var(--card-border);

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 0 auto;
  }
`

interface Props {
  readme: string
  baseUrl: string
}

export function Readme({ readme, baseUrl }: Props) {
  useMount(() => {
    import('highlight.js').then((hljs) => {
      hljs.default.highlightAll()
    })
  })

  const html = useMemo(() => marked(readme, { baseUrl }), [readme, baseUrl])

  return (
    <Article>
      <SanitizedHtml className="markdown-body" html={html} />
    </Article>
  )
}
