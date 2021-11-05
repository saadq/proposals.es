import styled from 'styled-components'

interface Props {
  gap?: string
}

export const Row = styled.div<Props>`
  display: flex;
  flex-direction: row;
  gap: ${({ gap }) => gap ?? 0};
`
