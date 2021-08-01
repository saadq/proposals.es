import styled from 'styled-components'

const StyledHeader = styled.header`
  position: fixed;
  background: black;
  width: 100vw;
  height: 3rem;
`

const Nav = styled.nav``

export function Header() {
  return (
    <StyledHeader>
      <Nav>nav</Nav>
    </StyledHeader>
  )
}
