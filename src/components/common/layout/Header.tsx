import Link from 'next/link'
import styled, { Theme } from 'styled-components'
import { GoThreeBars as MenuIcon, GoX as CloseIcon } from 'react-icons/go'
import { Logo } from '../icons/Logo'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { Navigation } from './Navigation'
import { useRouter } from 'next/router'

const StyledHeader = styled.header`
  background: ${({ theme }) => theme.colors.header};
  width: 100%;
  height: ${({ theme }) => theme.sizes.headerHeight};
  box-shadow: ${({ theme }) => theme.shadows.header};

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 ${({ theme }) => theme.sizes.gutter};
  height: 100%;
`

const scrollDisabledClass = 'scroll-disabled'

interface Props {
  theme: Theme
  setTheme: Dispatch<SetStateAction<Theme>>
}

export function Header({ theme, setTheme }: Props) {
  const { route } = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const handleMenuClick = useCallback(() => {
    setIsMenuOpen((currIsMenuOpen) => !currIsMenuOpen)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [route])

  useEffect(() => {
    if (!isMobile) {
      return
    }
    isMenuOpen
      ? document.body.classList.add(scrollDisabledClass)
      : document.body.classList.remove(scrollDisabledClass)
  }, [isMobile, isMenuOpen])

  return (
    <StyledHeader>
      <Container>
        <Link href="/" passHref>
          <a>
            <Logo width={175} />
          </a>
        </Link>
        {isMobile && (
          <div onClick={handleMenuClick}>
            {isMenuOpen ? <CloseIcon size="1.75rem" /> : <MenuIcon size="1.75rem" />}
          </div>
        )}
        {(isMobile === false || (isMobile && isMenuOpen)) && (
          <Navigation theme={theme} setTheme={setTheme} />
        )}
      </Container>
    </StyledHeader>
  )
}
