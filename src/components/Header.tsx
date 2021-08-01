import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import { Logo } from './Logo'

const StyledHeader = styled.header`
  background: ${({ theme }) => theme.colors.header};
  width: ${({ theme }) => theme.sizes.header.width};
  height: ${({ theme }) => theme.sizes.header.height};
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 90%;
  height: 100%;
`

const NavLink = styled.a<{ activeRoute: string }>`
  color: ${({ theme }) => theme.colors.foreground};
  margin: 0 1rem;
  text-decoration: ${(props) =>
    props.activeRoute === props.href ? 'underline' : 'none'};
`

export function Header() {
  const { route } = useRouter()

  return (
    <StyledHeader>
      <Container>
        <Link href="/" passHref>
          <a>
            <Logo width={200} />
          </a>
        </Link>
        <nav>
          <Link href="/" passHref>
            <NavLink activeRoute={route}>Proposals</NavLink>
          </Link>
          <Link href="/specifications" passHref>
            <NavLink activeRoute={route}>Specifications</NavLink>
          </Link>
        </nav>
      </Container>
    </StyledHeader>
  )
}
