import { SimplifiedChampion } from '../../types'
import { ChampionCard } from '.'

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
