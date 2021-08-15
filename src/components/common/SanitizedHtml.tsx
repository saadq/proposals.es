import { sanitize } from 'isomorphic-dompurify'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
`

interface Props {
  html?: string
}

export function SanitizedHtml({ html }: Props) {
  if (!html) {
    return null
  }

  return (
    <Wrapper
      dangerouslySetInnerHTML={{
        __html: sanitize(html)
      }}
    />
  )
}
