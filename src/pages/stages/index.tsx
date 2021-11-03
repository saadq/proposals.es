import { GetStaticProps } from 'next'
import { Fragment } from 'react'
import styled from 'styled-components'
import { getTc39Process, Tc39Process } from '../../api/getTc39Process'
import { SanitizedHtml } from '../../components/common/SanitizedHtml'

interface Props {
  tc39Process: Tc39Process
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const tc39Process = await getTc39Process()

  return {
    props: {
      tc39Process
    }
  }
}

const SummaryParagraph = styled(SanitizedHtml)`
  margin: 1rem 0;

  &:first-child {
    margin: 0;
  }
`

export default function StagesPage({ tc39Process }: Props) {
  return (
    <>
      <h1>The TC39 Process</h1>
      {tc39Process.summaryParagraphs.map((paragraph, i) => (
        <SummaryParagraph key={`process-summary-paragraph-${i}`} html={paragraph} />
      ))}
      {Object.entries(tc39Process.processByStage).map(([stage, process]) => (
        <Fragment key={stage}>
          <SanitizedHtml html={process.purpose} />
          <SanitizedHtml html={process.entranceCriteria} />
          <SanitizedHtml html={process.acceptanceSignifies} />
          <SanitizedHtml html={process.specQuality} />
          <SanitizedHtml html={process.postAcceptanceChangesExpected} />
          <SanitizedHtml html={process.implementationTypesExpected} />
        </Fragment>
      ))}
    </>
  )
}
