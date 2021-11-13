import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'

const Nav = styled.nav`
  @media (max-width: 768px) {
    position: fixed;
    top: ${({ theme }) => theme.sizes.headerHeight};
    left: 0;
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.75);
    z-index: 999;
    width: 100vw;
    min-height: 100vh;
  }
`

const NavLink = styled.a<{ isActive: boolean }>`
  color: ${({ theme }) => theme.colors.primary};
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.primary : theme.colors.black};
  margin: 0 1rem;
  text-decoration: none;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  font-size: 1.1rem;

  @media (max-width: 768px) {
    margin: 0;
    padding: 2rem 1rem;
    border-bottom: 1px solid black;
    width: 100%;
    font-size: 1.5rem;
    background: ${({ theme }) => theme.colors.white};
    color: black;
  }

  &:hover {
    text-decoration: underline;
  }
`

export function Navigation() {
  const { route } = useRouter()

  return (
    <Nav>
      <Link href="/" passHref>
        <NavLink isActive={route === '/' || route.startsWith('/proposals')}>
          Proposals
        </NavLink>
      </Link>
      <Link href="/stages" passHref>
        <NavLink isActive={route.startsWith('/stages')}>Stages</NavLink>
      </Link>
      <Link href="/champions" passHref>
        <NavLink isActive={route.startsWith('/champions')}>Champions</NavLink>
      </Link>
      <Link href="/specifications" passHref>
        <NavLink isActive={route.startsWith('/specifications')}>Specifications</NavLink>
      </Link>
    </Nav>
  )
}
