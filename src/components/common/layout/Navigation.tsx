import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '../../../hooks/useTheme'

const Nav = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: var(--header-height);
    left: 0;
    display: flex;
    flex-direction: column;
    background: var(--mobile-menu-color);
    z-index: 10;
    width: 100vw;
    min-height: 100vh;
  }
`

const NavLink = styled.a<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? 'var(--primary)' : 'var(--foreground)')};
  margin: 0 1rem;
  text-decoration: none;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  font-size: 1.1rem;
  padding: 5px;

  @media (max-width: 768px) {
    margin: 0;
    padding: 2rem 1rem;
    border-bottom: 1px solid black;
    width: 100%;
    font-size: 1.5rem;
    background: var(--background);
  }

  &:hover {
    text-decoration: underline;
  }
`

const ThemeToggler = styled.button`
  border: none;
  border-radius: 4px;
  background: transparent;
  outline: none;
  cursor: pointer;
  padding: 0.7rem;

  svg {
    fill: var(--foreground);
  }

  &:hover {
    background: var(--background);
    svg {
      fill: var(--foreground);
    }
  }

  @media (max-width: 768px) {
    align-self: center;
    margin-top: 2rem;
  }
`

export function Navigation() {
  const [theme, toggleTheme] = useTheme()
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
      <NavLink isActive={false} href="https://github.com/saadq/proposals.es">
        GitHub
      </NavLink>
      <ThemeToggler onClick={toggleTheme}>
        {theme === 'dark' ? <FaSun size={24} /> : <FaMoon size={24} />}
      </ThemeToggler>
    </Nav>
  )
}
