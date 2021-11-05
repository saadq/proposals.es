import styled from 'styled-components'

interface Props {
  gap?: string
}

export const Col = styled.div<Props>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap ?? 0};
`
