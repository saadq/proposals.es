import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import { Logo } from './Logo'

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

const NavLink = styled.a<{ activeRoute: string }>`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 1rem;
  text-decoration: ${(props) =>
    props.activeRoute === props.href ? 'underline' : 'none'};
  font-weight: ${(props) => (props.activeRoute === props.href ? 'bold' : 'normal')};
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
            <NavLink activeRoute={route}>Proposals</NavLink>
          </Link>
          <Link href="/specifications" passHref>
            <NavLink activeRoute={route}>Specifications</NavLink>
          </Link>
        </Nav>
      </Container>
    </StyledHeader>
  )
}
