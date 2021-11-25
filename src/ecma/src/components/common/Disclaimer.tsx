import styled from 'styled-components'

interface Props {
  margin?: string
  padding?: string
}

export const Disclaimer = styled.small<Props>`
  display: inline-block;
  margin: ${({ margin }) => margin ?? '0'};
  padding: ${({ margin }) => margin ?? '0'};
  font-style: italic;
`
