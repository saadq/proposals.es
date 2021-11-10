import styled from 'styled-components'

interface Props {
  layout?: 'row' | 'column'
  gap?: string
}

export const Flex = styled.div<Props>`
  display: flex;
  flex-direction: ${({ layout }) => layout ?? 'row'};
  gap: ${({ gap }) => gap ?? 0};
`
