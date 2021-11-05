import styled, { css } from 'styled-components'

interface Props {
  width?: string
  maxWidth?: string
  minWidth?: string
  margin?: string
  padding?: string
  layout?: 'row' | 'column'
  gap?: string
}

export const Container = styled.section<Props>`
  font-size: 1rem;
  width: ${({ width }) => width ?? '100%'};
  min-width: ${({ minWidth }) => minWidth ?? 'auto'};
  max-width: ${({ maxWidth }) => maxWidth ?? 'auto'};
  margin: ${({ margin }) => margin ?? '0'};
  padding: ${({ padding }) => padding ?? '0'};
  ${({ layout, gap }) =>
    layout == null
      ? ''
      : css`
          display: flex;
          flex-direction: ${layout};
          gap: ${gap ?? '0'};
        `}
`
