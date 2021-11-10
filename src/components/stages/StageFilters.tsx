import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { allStages, Stage } from '../../types'
import { formatStageName } from '../../utils/formatStageName'

const Container = styled.div`
  display: flex;
  border: 1px solid black;
  justify-content: space-between;
  border-radius: 24px;
  height: 44px;
`

const Button = styled.button<{ isActive: boolean }>`
  flex: 1;
  background: none;
  border: none;
  padding: 0 1rem;
  font-weight: bold;
  cursor: pointer;
  border-right: 1px solid black;

  background: ${({ theme, isActive }) => (isActive ? theme.colors.primary : 'none')};

  &:first-child {
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
  }

  &:last-child {
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
    border: none;
  }
`

interface Props {
  stageFilters: Stage[]
  setStageFilters: Dispatch<SetStateAction<Stage[]>>
}

export function StageFilters({ stageFilters, setStageFilters }: Props) {
  return (
    <Container>
      {allStages
        .slice()
        .reverse()
        .map((stage) => (
          <Button isActive={stageFilters.includes(stage)} key={stage}>
            {formatStageName(stage, { small: true })}
          </Button>
        ))}
    </Container>
  )
}
