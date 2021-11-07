import { Heading, Container } from '../../components/common'
import { Disclaimer } from '../../components/common/Disclaimer'
import { StageList } from '../../components/stages/StageList'
import { allStages } from '../../types'

export default function StagesPage() {
  return (
    <Container width="80%" margin="0 auto">
      <Heading>Stages</Heading>
      <StageList stages={[...allStages].reverse()}>hello</StageList>
      <Disclaimer>
        These descriptions are gathered from{' '}
        <a href="https://github.com/tc39/proposals">tc39/proposals on GitHub</a> and the
        official <a href="https://tc39.es/process-document/">TC39 process document.</a>
      </Disclaimer>
    </Container>
  )
}
