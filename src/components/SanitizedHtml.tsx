import { sanitize } from 'isomorphic-dompurify'

interface Props {
  html?: string
}

export function SanitizedHtml({ html }: Props) {
  if (!html) {
    return null
  }

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: sanitize(html)
      }}
    />
  )
}
