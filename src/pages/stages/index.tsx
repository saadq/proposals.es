import { Fragment } from 'react'
import { GetStaticProps } from 'next'
import { SanitizedHtml } from '../../components/common'
import { getTc39Process, Tc39Process } from '../../api/getTc39Process'

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

export default function StagesPage({ tc39Process }: Props) {
  return (
    <>
      <h1>The TC39 Process</h1>
      {tc39Process.summaryParagraphs.map((paragraph, i) => (
        <SanitizedHtml key={`process-summary-paragraph-${i}`} html={paragraph} />
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
