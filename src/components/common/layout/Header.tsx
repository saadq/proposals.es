import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import { Logo } from '../icons/Logo'

const StyledHeader = styled.header`
  background: ${({ theme }) => theme.colors.header};
  width: 100%;
  height: ${({ theme }) => theme.sizes.headerHeight};
  box-shadow: 0px 4px 24px rgba(55, 81, 104, 0.1);
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 ${({ theme }) => theme.sizes.gutter};
  height: 100%;
`

const Nav = styled.nav`
  @media screen and (max-width: 500px) {
    display: none;
  }
`

const NavLink = styled.a<{ isActive: boolean }>`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 1rem;
  text-decoration: ${({ isActive }) => (isActive ? 'underline' : 'none')};
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};

  &:hover {
    text-decoration: underline;
  }
`

export function Header() {
  const { route } = useRouter()

  return (
    <StyledHeader>
      <Container>
        <Link href="/" passHref>
          <a>
            <Logo width={175} />
          </a>
        </Link>
        <Nav>
          <Link href="/" passHref>
            <NavLink isActive={route === '/' || route.startsWith('/proposals')}>
              Proposals
            </NavLink>
          </Link>
          <Link href="/champions" passHref>
            <NavLink isActive={route.startsWith('/champions')}>Champions</NavLink>
          </Link>
          <Link href="/specifications" passHref>
            <NavLink isActive={route.startsWith('/specifications')}>
              Specifications
            </NavLink>
          </Link>
        </Nav>
      </Container>
    </StyledHeader>
  )
}
