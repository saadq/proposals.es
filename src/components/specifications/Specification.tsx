import { GetStaticProps } from 'next'
import styled from 'styled-components'
import { getSpecifications } from '../../api/specifications'
import { Specification as SpecificationType } from '../../types'

const Container = styled.section`
  margin: 2rem 0;
  padding-bottom: 1rem;
  background: #1b1c20;
  box-shadow: 0px 4px 4px #000000;
  border: 1px solid black;
`

const Header = styled.header`
  background: #161618;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.foreground};
`

const Heading = styled.h1`
  font-size: 1.5rem;

  @media screen and (max-width: 500px) {
    font-size: 1.25rem;
  }
`

const Alias = styled.span`
  font-weight: normal;
`

const Links = styled.ul`
  display: flex;
  padding: 0;
  list-style-type: none;

  @media screen and (max-width: 500px) {
    font-size: 0.75rem;
  }

  li {
    margin-right: 1rem;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Summary = styled.div`
  padding: 0 2rem;
  line-height: 2;
  color: #c1c3cb;
  font-family: Averta;
  font-weight: normal;

  @media screen and (max-width: 500px) {
    font-size: 0.75rem;
  }
`

interface Props {
  specifications: SpecificationType[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const specifications = await getSpecifications()

  return {
    props: { specifications }
  }
}

export function Specification({ specifications }: Props) {
  return (
    <>
      {specifications.map((spec) => (
        <Container key={spec.name}>
          <Header>
            <Heading>
              {spec.name} <Alias>({spec.alias})</Alias>
            </Heading>
            <Links>
              <li>
                <a href={spec.featureSetLink}>Feature set</a>
              </li>
              <li>
                <a href={spec.specLink}>Spec</a>
              </li>
            </Links>
          </Header>
          <Summary dangerouslySetInnerHTML={{ __html: spec.summary }} />
        </Container>
      ))}
    </>
  )
}
