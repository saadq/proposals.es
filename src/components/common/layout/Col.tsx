import styled from 'styled-components'

interface Props {
  gap?: string
  margin?: string
}

export const Col = styled.div<Props>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap ?? 0};
  margin: ${({ margin }) => margin ?? 0};
`
