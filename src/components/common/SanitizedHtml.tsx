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

  table {
    background: white;
    box-shadow: 0px 4px 24px rgb(55 81 104 / 10%);
    overflow: scroll;
    border-collapse: collapse;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    box-shadow: 0px 2px 8px #e7f0f3;

    thead {
      background: #efefef;
      text-align: center;
    }

    tbody,
    th,
    tr,
    td {
      overflow: scroll;
    }

    td {
      border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
    }

    td,
    th {
      text-align: center;
      padding: 1rem;
    }

    caption {
      background: white;
      padding: 1rem;
      background: black;
      color: white;
    }
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
