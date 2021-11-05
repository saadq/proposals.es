import { sanitize } from 'isomorphic-dompurify'
import styled from 'styled-components'

interface Props {
  html?: string
  className?: string
}

const Wrapper = styled.div`
  overflow: hidden;
  word-wrap: break-word;
`

export function SanitizedHtml({ html, className }: Props) {
  if (!html) {
    return null
  }

  return (
    <Wrapper
      className={className}
      dangerouslySetInnerHTML={{
        __html: sanitize(html)
      }}
    />
  )
}
