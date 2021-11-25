import { sanitize } from 'isomorphic-dompurify'
import styled from 'styled-components'

interface Props {
  html?: string
  className?: string
  padding?: string
  margin?: string
}

const Wrapper = styled.div<Omit<Props, 'className' | 'html'>>`
  overflow: hidden;
  word-wrap: break-word;
  margin: ${({ margin }) => margin ?? '0'};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-weight: bold;
  }

  ul {
    list-style-type: disc;
    padding: 0 2.5rem;
  }

  sub {
    vertical-align: top;
    font-size: 1rem;
  }
`

export function SanitizedHtml({ html, className, padding, margin }: Props) {
  if (!html) {
    return null
  }

  return (
    <Wrapper
      className={className}
      padding={padding}
      margin={margin}
      dangerouslySetInnerHTML={{
        __html: sanitize(html)
      }}
    />
  )
}
