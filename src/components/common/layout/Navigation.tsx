import { useRouter } from 'next/router'
import Link from 'next/link'
import styled, { Theme } from 'styled-components'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { darkTheme, lightTheme } from '../../../theme'

const Nav = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: ${({ theme }) => theme.sizes.headerHeight};
    left: 0;
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.mobileMenu};
    z-index: 999;
    width: 100vw;
    min-height: 100vh;
  }
`

const NavLink = styled.a<{ isActive: boolean }>`
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.primary : theme.colors.foreground};
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
    background: ${({ theme }) => theme.colors.background};
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
    fill: ${({ theme }) => theme.colors.foreground};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    svg {
      fill: ${({ theme }) => theme.colors.foreground};
    }
  }

  @media (max-width: 768px) {
    align-self: center;
    margin-top: 2rem;
  }
`

interface Props {
  theme: Theme
  setTheme: Dispatch<SetStateAction<Theme>>
}

export function Navigation({ theme, setTheme }: Props) {
  const { route } = useRouter()

  const toggleTheme = useCallback(() => {
    const newTheme = theme.name === 'dark' ? lightTheme : darkTheme
    setTheme(newTheme)
  }, [theme.name, setTheme])

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
        {theme.name === 'dark' ? <FaSun size={24} /> : <FaMoon size={24} />}
      </ThemeToggler>
    </Nav>
  )
}
