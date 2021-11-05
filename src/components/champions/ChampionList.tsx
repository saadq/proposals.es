import { ChampionCard } from '.'
import { SimplifiedChampion } from '../../types'

interface Props {
  champions: SimplifiedChampion[]
}

export function ChampionList({ champions }: Props) {
  return (
    <ul>
      {champions.map((champion) => (
        <li key={champion.name}>
          <ChampionCard {...champion} />
        </li>
      ))}
    </ul>
  )
}
