import { ReactElement, ReactNode, useCallback, useEffect, useState } from 'react'
import { GoChevronDown, GoChevronUp } from 'react-icons/go'
import styled, { css } from 'styled-components'

const HeadingText = styled.h1<{ isExpanded?: boolean; sticky?: boolean }>`
  position: ${({ sticky }) => (sticky ? 'sticky' : 'initial')};
  top: ${({ sticky }) => (sticky ? '0' : 'initial')};
  font-size: 1.5rem;
  color: ${({ isExpanded, theme }) => (isExpanded ? theme.colors.primary : 'black')};
  text-decoration: ${({ isExpanded }) => (isExpanded ? 'underline' : 'none')};
  font-weight: 800;
  margin: 0;
  border: 1 px solid orange;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 2rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;

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
  icon: ReactElement
  children: ReactNode
  searchQuery?: string
  sticky?: boolean
}

export function Expander({ heading, sticky, searchQuery, children }: Props) {
  const [isExpanded, setIsExpanded] = useState(searchQuery?.trim() !== '')

  useEffect(() => {
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
    <>
      <HeadingText isExpanded={isExpanded} onClick={handleExpanderClick} sticky={sticky}>
        {heading}
        {isExpanded ? <GoChevronUp size={24} /> : <GoChevronDown size={24} />}
      </HeadingText>
      <Content isExpanded={isExpanded}>{children}</Content>
    </>
  )
}
