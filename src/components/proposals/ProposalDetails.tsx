import { SanitizedHtml } from '../common/SanitizedHtml'
import { Proposal } from '../../types'

interface Props {
  proposal: Proposal
}

export default function ProposalDetailsPage({ proposal }: Props) {
  return (
    <div>
      <h1>
        <SanitizedHtml html={proposal.titleHtml} />
      </h1>
      <h2>{proposal.type}</h2>
      <p>
        <SanitizedHtml html={proposal.link} />
      </p>
      <p>
        <SanitizedHtml html={proposal.authorsHtml} />
      </p>
      <p>
        <SanitizedHtml html={proposal.championsHtml} />
      </p>
      <p
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        Last presented: <SanitizedHtml html={proposal.lastPresentedHtml} />
      </p>
    </div>
  )
}
