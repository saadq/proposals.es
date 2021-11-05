import styled from 'styled-components'

interface Props {
  gap?: string
  wrap?: boolean
}

export const Row = styled.div<Props>`
  display: flex;
  flex-direction: row;
  gap: ${({ gap }) => gap ?? 0};
  flex-wrap: ${({ wrap }) => (wrap ? 'wrap' : 'initial')};
`
