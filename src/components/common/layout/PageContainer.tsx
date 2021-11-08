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

export const PageContainer = styled.section<Props>`
  font-size: 1rem;
  width: ${({ width }) => width ?? '80%'};
  min-width: ${({ minWidth }) => minWidth ?? 'auto'};
  max-width: ${({ maxWidth }) => maxWidth ?? 'initial'};
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

  @media (max-width: 1024px) {
    width: 90%;
  }
`
