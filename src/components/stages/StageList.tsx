import { ReactNode } from 'react'
import styled from 'styled-components'
import { Stage } from '../../types'
import { formatStageName } from '../../utils/formatStageName'

export const List = styled.ul`
  display: flex;
  gap: 2rem;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
`

const StageLink = styled.a`
  display: flex;
  background: white;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background: black;
  color: ${({ theme }) => theme.colors.white};
  padding: 2rem 1rem;
  text-align: center;
  box-shadow: 0px 2px 8px #e7f0f3;
  transition: 0.4s ease;
  border-radius: 4px;
  font-weight: bold;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: black;
  }
`

interface Props {
  stages: Stage[]
  children: ReactNode
}

export function StageList({ stages }: Props) {
  return (
    <List>
      {stages.map((stage) => (
        <li key={stage}>
          <StageLink href={`/stages/${stage}`}>{formatStageName(stage)}</StageLink>
        </li>
      ))}
    </List>
  )
}
