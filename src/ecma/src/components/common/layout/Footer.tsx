import styled from 'styled-components'

const StyledFooter = styled.footer`
  width: 95%;
  height: var(--footer-height);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  padding: 3rem 0;
  margin: 0 auto;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;

  a {
    color: var(--primary);

    &:hover {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
`

const Links = styled.p`
  display: flex;
  gap: 0.5rem;
`

export function Footer() {
  return (
    <StyledFooter>
      <Container>
        <Links>
          <span>
            © 2021 <a href="https://saadq.com">Saad Quadri</a>
          </span>
        </Links>
        <p>This site is not affiliated with TC39 or Ecma International.</p>
      </Container>
    </StyledFooter>
  )
}
