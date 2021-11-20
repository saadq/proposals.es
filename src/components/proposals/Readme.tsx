import styled from 'styled-components'
import { useMount } from '../../hooks/useMount'
import { SanitizedHtml } from '../common'

const Article = styled.article`
  display: flex;
  flex: 1;
  max-width: 80%;
  box-shadow: var(--card-shadow);
  border: var(--card-border);

  .markdown-body {
    flex: 1;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 0 auto;
  }
`

interface Props {
  readmeHtml: string
}

export function Readme({ readmeHtml }: Props) {
  useMount(() => {
    import('highlight.js').then((hljs) => {
      hljs.default.highlightAll()
    })
  })

  return (
    <Article>
      <SanitizedHtml className="markdown-body" html={readmeHtml} />
    </Article>
  )
}
