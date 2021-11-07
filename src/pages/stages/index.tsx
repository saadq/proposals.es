import { Heading, Container } from '../../components/common'
import { StageList } from '../../components/stages/StageList'
import { allStages } from '../../types'

export default function StagesPage() {
  return (
    <Container width="80%" margin="0 auto">
      <Heading>Stages</Heading>
      <StageList stages={[...allStages].reverse()}>hello</StageList>
    </Container>
  )
}
