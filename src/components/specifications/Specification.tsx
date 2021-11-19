import styled from 'styled-components'
import { Specification as SpecificationType } from '../../types'

const Wrapper = styled.section`
  background: var(--card-color);
  box-shadow: var(--card-shadow);
  border: 1px solid var(--card-border);
  border-radius: 4px;

  &:first-of-type {
    margin-top: 0;
  }
`

const Header = styled.header`
  padding: 0 2rem;
  background: var(--heading-banner-color);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SpecHeading = styled.h2`
  color: var(--heading-banner-text-color);
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
    font-weight: bold;
    padding: 0.25rem 1rem;
    border-radius: 4px;
    text-decoration: none;
    background: var(--badge-color);
    color: var(--badge-text-color);
    transition: 0.4s ease;

    @media (max-width: 768px) {
      padding: 0.35rem;
    }

    &:hover {
      color: var(--black);
      background: var(--white);
    }
  }
`

const Summary = styled.div`
  padding: 1.5rem;

  line-height: 2;
  color: var(--foreground);
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
        <SpecHeading level={2} fontSize="1.5rem" fontWeight="800" margin="1rem 0">
          {specification.name} <Alias>({specification.alias})</Alias>
        </SpecHeading>
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
