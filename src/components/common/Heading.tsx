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

function getDefaultFontSize(level?: HeadingLevel) {
  switch (level) {
    case 1:
    default:
      return '2rem'
    case 2:
      return '1.35rem'
    case 3:
      return '1.25rem'
    case 4:
      return '1.15rem'
    case 5:
      return '1.05rem'
    case 6:
      return '1rem'
  }
}

function getMobileFontSize(level?: HeadingLevel) {
  switch (level) {
    case 1:
    default:
      return '1.5rem'
    case 2:
      return '1.15rem'
    case 3:
      return '1.3rem'
    case 4:
      return '.7rem'
    case 5:
      return '.6rem'
    case 6:
      return '.55rem'
  }
}

const HeadingText = styled.h1<Omit<Props, 'children'>>`
  font-size: ${({ fontSize, level }) => fontSize ?? getDefaultFontSize(level)};
  font-weight: ${({ fontWeight }) => fontWeight ?? 'bold'};
  margin: ${({ margin, level }) => margin ?? (level === 1 ? '1rem 0' : 'initial')};

  @media (max-width: 768px) {
    font-size: ${({ level }) => getMobileFontSize(level)};
  }
`

export function Heading({ level = 1, children, ...styleProps }: Props) {
  const headingComponent = `h${level}` as AnyStyledComponent
  return (
    <HeadingText as={headingComponent} level={level} {...styleProps}>
      {children}
    </HeadingText>
  )
}
