import type { NextApiRequest, NextApiResponse } from 'next'

interface Proposal {}

interface Data {
  proposals: Proposal[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ proposals: [] })
}
