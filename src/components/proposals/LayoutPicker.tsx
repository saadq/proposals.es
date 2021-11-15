import { Dispatch, SetStateAction, useCallback } from 'react'
import { CgScrollH, CgScrollV } from 'react-icons/cg'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-self: flex-start;
  margin: 0 auto;
`

const LayoutIcon = styled.div<{ isActive: boolean }>`
  padding: 1rem;
  display: flex;
  gap: 0.25rem;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border: ${({ theme }) => theme.borders.layoutIcon};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.primary : theme.colors.foreground};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};

    span {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  span {
    color: ${({ isActive, theme }) =>
      isActive ? theme.colors.primary : theme.colors.foreground};
    text-decoration: ${({ isActive }) => (isActive ? 'underline' : 'none')};
  }

  svg {
    fill: ${({ isActive, theme }) =>
      isActive ? theme.colors.primary : theme.colors.foreground};
  }

  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-right: none;
  }

  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`

interface Props {
  layout: 'horizontal' | 'vertical'
  setLayout: Dispatch<SetStateAction<'horizontal' | 'vertical'>>
}

export function LayoutPicker({ layout, setLayout }: Props) {
  const setHorizontalLayout = useCallback(() => {
    setLayout('horizontal')
  }, [setLayout])

  const setVerticalLayout = useCallback(() => {
    setLayout('vertical')
  }, [setLayout])

  return (
    <Container>
      <LayoutIcon isActive={layout === 'horizontal'} onClick={setHorizontalLayout}>
        <CgScrollH size={24} />
        <span>Horizontal</span>
      </LayoutIcon>
      <LayoutIcon isActive={layout === 'vertical'} onClick={setVerticalLayout}>
        <CgScrollV size={24} />
        <span>Vertical</span>
      </LayoutIcon>
    </Container>
  )
}
