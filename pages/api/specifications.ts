import type { NextApiRequest, NextApiResponse } from 'next'

interface Specification {}

interface Data {
  specifications: Specification[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ specifications: [] })
}
