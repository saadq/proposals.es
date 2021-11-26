import { ReactNode, useCallback, useEffect, useState } from 'react'
import { GoChevronDown, GoChevronUp } from 'react-icons/go'
import styled, { css } from 'styled-components'

const HeadingText = styled.h1<{ isExpanded?: boolean; sticky?: boolean }>`
  position: ${({ sticky }) => (sticky ? 'sticky' : 'initial')};
  top: ${({ sticky }) => (sticky ? '10px' : 'initial')};
  font-size: 1.5rem;
  color: ${({ isExpanded }) => (isExpanded ? 'var(--primary)' : 'var(--foreground)')};
  text-decoration: ${({ isExpanded }) => (isExpanded ? 'underline' : 'none')};
  font-weight: 800;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background: var(--stage-card-color);
  border: var(--card-border);
  box-shadow: var(--card-shadow);
  border-radius: 4px;

  ${({ sticky }) =>
    sticky
      ? css`
          &:nth-of-type(1) {
            z-index: 10;
          }

          &:nth-of-type(2) {
            z-index: 20;
          }

          &:nth-of-type(3) {
            z-index: 30;
          }

          &:nth-of-type(4) {
            z-index: 40;
          }

          &:nth-of-type(5) {
            z-index: 50;
          }

          &:nth-of-type(6) {
            z-index: 60;
          }
        `
      : ''}

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const Content = styled.div<{ isExpanded: boolean }>`
  max-height: ${({ isExpanded }) => (isExpanded ? document.body.scrollHeight : '0')};
  overflow: hidden;
  transition: max-height 0.4s ease-in;
`

interface Props {
  heading: string
  children: ReactNode
  searchQuery?: string
  sticky?: boolean
}

export function Expander({ heading, sticky, searchQuery, children }: Props) {
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (searchQuery == null) {
      return
    }

    if (searchQuery?.trim() !== '') {
      setIsExpanded(true)
    } else {
      setIsExpanded(false)
    }
  }, [searchQuery])

  const handleExpanderClick = useCallback(() => {
    setIsExpanded((isExpanded) => !isExpanded)
  }, [])

  return (
    <div>
      <HeadingText isExpanded={isExpanded} onClick={handleExpanderClick} sticky={sticky}>
        {heading}
        {isExpanded ? <GoChevronUp size={24} /> : <GoChevronDown size={24} />}
      </HeadingText>
      <Content isExpanded={isExpanded}>{children}</Content>
    </div>
  )
}
