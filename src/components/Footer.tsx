import styled from 'styled-components'

const StyledFooter = styled.footer`
  background: ${({ theme }) => theme.colors.footer};
  width: 100%;
  height: ${({ theme }) => theme.sizes.footerHeight};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 ${({ theme }) => theme.sizes.gutter};
  width: 100%;
  height: 100%;
  opacity: 0.5;
`

export function Footer() {
  return (
    <StyledFooter>
      <Container>
        <p>© 2021 Saad Quadri</p>
        <p>This site is not affiliated with TC39 or Ecma International.</p>
      </Container>
    </StyledFooter>
  )
}
