import Link from 'next/link'
import styled from 'styled-components'
import { GoThreeBars as MenuIcon, GoX as CloseIcon } from 'react-icons/go'
import { Logo } from '../Logo'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { useCallback, useEffect, useState } from 'react'
import { Navigation } from './Navigation'
import { useRouter } from 'next/router'

const StyledHeader = styled.header`
  background: var(--header-color);
  width: 100%;
  height: var(--header-height);
  box-shadow: var(--header-shadow);

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 var(--gutter-width);
  height: 100%;
`

const LogoLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`

const scrollDisabledClass = 'scroll-disabled'

export function Header() {
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
    if (isMobile && isMenuOpen) {
      document.body.classList.add(scrollDisabledClass)
    } else {
      document.body.classList.remove(scrollDisabledClass)
    }
  }, [isMenuOpen, isMobile])

  return (
    <StyledHeader>
      <Container>
        <Link href="/" passHref>
          <LogoLink>
            <Logo width={175} />
          </LogoLink>
        </Link>
        {isMobile && (
          <div onClick={handleMenuClick}>
            {isMenuOpen ? <CloseIcon size="1.75rem" /> : <MenuIcon size="1.75rem" />}
          </div>
        )}
        {(isMobile === false || (isMobile && isMenuOpen)) && <Navigation />}
      </Container>
    </StyledHeader>
  )
}
