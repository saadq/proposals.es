import type { NextApiRequest, NextApiResponse } from 'next'
import { getProposals } from '../../api/github'
import { ProposalsByStage } from '../../types'

interface Data {
  proposals: ProposalsByStage
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const proposals = await getProposals()
    res.status(200).json({ proposals })
  } catch (err) {
    res.status(500)
  }
}
