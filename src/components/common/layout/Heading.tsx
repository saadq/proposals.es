import { ReactNode } from 'react'
import styled, { AnyStyledComponent } from 'styled-components'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

interface Props {
  children: ReactNode
  level?: HeadingLevel
  fontSize?: string
  fontWeight?: string | number
  margin?: string
}

const HeadingText = styled.h1<Omit<Props, 'children' | 'level'>>`
  font-size: ${({ fontSize }) => fontSize ?? '2rem'};
  font-weight: ${({ fontWeight }) => fontWeight ?? 'bold'};
  margin: ${({ margin }) => margin ?? '0'};
`

export function Heading({ level = 1, children, ...styleProps }: Props) {
  const headingComponent = `h${level}` as AnyStyledComponent
  return (
    <HeadingText as={headingComponent} {...styleProps}>
      {children}
    </HeadingText>
  )
}
