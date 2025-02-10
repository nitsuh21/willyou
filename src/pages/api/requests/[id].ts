import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { id } = req.query

    if (typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid request ID' })
    }

    const request = await prisma.request.findUnique({
      where: { id }
    })

    if (!request) {
      return res.status(404).json({ message: 'Request not found' })
    }

    res.status(200).json(request)
  } catch (error: any) {
    console.error('Failed to get request:', error)
    res.status(500).json({ message: error.message })
  }
}
