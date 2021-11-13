import styled from 'styled-components'
import { Heading } from '../common'
import { Specification as SpecificationType } from '../../types'

const Wrapper = styled.section`
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 10px 10px #e7f0f3;
  color: ${({ theme }) => theme.colors.foreground};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;

  &:first-of-type {
    margin-top: 0;
  }
`

const Header = styled.header`
  padding: 0 2rem;
  background: ${({ theme }) => theme.colors.primary};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Alias = styled.span`
  font-weight: normal;
`

const Links = styled.ul`
  display: flex;
  gap: 1rem;

  @media screen and (max-width: 500px) {
    font-size: 0.75rem;
    gap: 0.5rem;
  }

  a {
    color: ${({ theme }) => theme.colors.white};
    font-weight: bold;
    padding: 0.25rem 1rem;
    border: 1px solid ${({ theme }) => theme.colors.black};
    border-radius: 4px;
    text-decoration: none;
    background: ${({ theme }) => theme.colors.black};
    transition: 0.4s ease;

    @media (max-width: 768px) {
      padding: 0.35rem;
    }

    &:hover {
      color: ${({ theme }) => theme.colors.black};
      background: ${({ theme }) => theme.colors.white};
      border-color: ${({ theme }) => theme.colors.white};
    }
  }
`

const Summary = styled.div`
  padding: 1.5rem;

  line-height: 2;
  color: ${({ theme }) => theme.colors.foreground};
  font-family: Varela Round;
  font-weight: normal;

  @media screen and (max-width: 500px) {
    font-size: 0.75rem;
  }
`

interface Props {
  specification: SpecificationType
}

export function Specification({ specification }: Props) {
  return (
    <Wrapper key={specification.name}>
      <Header>
        <Heading level={2} fontSize="1.5rem" margin="1rem 0">
          {specification.name} <Alias>({specification.alias})</Alias>
        </Heading>
        <Links>
          {specification.featureSetLink ? (
            <li>
              <a href={specification.featureSetLink}>Feature set</a>
            </li>
          ) : null}
          <li>
            <a href={specification.specLink}>Spec</a>
          </li>
        </Links>
      </Header>
      <Summary dangerouslySetInnerHTML={{ __html: specification.summary as string }} />
    </Wrapper>
  )
}
