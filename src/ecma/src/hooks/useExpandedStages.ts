import { createContext, Dispatch, SetStateAction, useContext } from 'react'
import { Stage } from '../types'

interface ExpandedStagesContext {
  expandedStages: Stage[]
  setExpandedStages: Dispatch<SetStateAction<Stage[]>>
}

const ExpandedStages = createContext<ExpandedStagesContext>({
  expandedStages: [],
  setExpandedStages: () => {}
})

export const ExpandedStagesProvider = ExpandedStages.Provider

export function useExpandedStages() {
  const { expandedStages, setExpandedStages } = useContext(ExpandedStages)
  return { expandedStages, setExpandedStages }
}
