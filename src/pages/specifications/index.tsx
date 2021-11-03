import { GetStaticProps } from 'next'
import styled from 'styled-components'
import { getSpecifications } from '../../api/getSpecifications'
import { Specification as SpecificationType } from '../../types'

const Header = styled.header`
  background: ${({ theme }) => theme.colors.primary};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.foreground};
`

const Specification = styled.section`
  margin: 2rem 0;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 10px 10px #e7f0f3;
  color: ${({ theme }) => theme.colors.foreground};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;

  &:first-of-type {
    margin-top: 0;
  }
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
    color: ${({ theme }) => theme.colors.foreground};
    font-weight: 500;
  }
`

const Summary = styled.div`
  padding: 2rem;
  line-height: 2;
  color: ${({ theme }) => theme.colors.foreground};
  font-family: Nunito;
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
  const oneHourInSeconds = 1 * 60 * 60

  return {
    props: { specifications },
    revalidate: oneHourInSeconds
  }
}

export default function SpecificationsPage({ specifications }: Props) {
  return (
    <>
      {specifications.map((spec) => (
        <Specification key={spec.name}>
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
        </Specification>
      ))}
    </>
  )
}
