import { ReactNode, useState } from 'react'
import styled from 'styled-components'
import { Heading } from '.'

const Wrapper = styled.section`
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 10px 10px #e7f0f3;
  color: ${({ theme }) => theme.colors.foreground};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;

  &:first-of-type {
    margin-top: 0;
  }
`

const Header = styled.header`
  padding: 0 2rem;
  background: ${({ theme }) => theme.colors.primary};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Content = styled.div<{ isExpanded: boolean }>`
  padding: 0 18px;
  overflow: hidden;
  max-height: ${(props) => (props.isExpanded ? '1000px' : '0')};
  line-height: 2;
  color: ${({ theme }) => theme.colors.foreground};
  font-family: Varela Round;
  font-weight: normal;

  @media screen and (max-width: 500px) {
    font-size: 0.75rem;
  }
`

interface Props {
  heading: string
  children: ReactNode
}

export function Expander({ heading, children }: Props) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleExpand = () => {
    setIsExpanded((currIsExpanded) => !currIsExpanded)
  }

  return (
    <Wrapper>
      <Header onClick={handleExpand}>
        <Heading level={2} fontSize="0.15rem" margin="0.5rem 0">
          {heading}
        </Heading>
        <span>{isExpanded ? '<' : '>'}</span>
      </Header>
      <Content isExpanded={isExpanded}>{children}</Content>
    </Wrapper>
  )
}
