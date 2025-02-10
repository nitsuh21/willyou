import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { supabase } from '../../../lib/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { id } = req.query
    const { response } = req.body

    if (typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid request ID' })
    }

    // Update request in database using Prisma
    const updatedRequest = await prisma.request.update({
      where: { id },
      data: {
        response,
        respondedAt: new Date(),
        status: 'RESPONDED'
      }
    })

    // Use Supabase for real-time updates
    const { error } = await supabase
      .from('requests')
      .update({ 
        response, 
        responded_at: new Date().toISOString(),
        status: 'RESPONDED'
      })
      .eq('id', id)

    if (error) {
      console.error('Supabase sync error:', error)
      // Don't fail the request if real-time sync fails
    }

    res.status(200).json(updatedRequest)
  } catch (error: any) {
    console.error('Failed to update response:', error)
    res.status(500).json({ message: error.message })
  }
}
