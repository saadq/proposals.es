import { GetStaticProps } from 'next'
import { SanitizedHtml, Heading, Container } from '../../components/common'
import { StageList } from '../../components/stages/StageList'
import { getTc39Process } from '../../api/getTc39Process'
import { allStages } from '../../types'
import { Disclaimer } from '../../components/common/Disclaimer'

interface Props {
  processHtml: string
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const processHtml = await getTc39Process()

  return {
    props: {
      processHtml
    }
  }
}

export default function StagesPage({ processHtml }: Props) {
  return (
    <Container width="100%" margin="0 auto">
      <Heading>Proposal Stages</Heading>
      <StageList stages={[...allStages].reverse()}>hello</StageList>
      <Disclaimer margin="1rem 0 0 0">
        The below process is taken from the official{' '}
        <a href="https://tc39.es/process-document/">TC39 process document</a>.
      </Disclaimer>
      <SanitizedHtml html={processHtml} margin="2rem 0" />
    </Container>
  )
}
